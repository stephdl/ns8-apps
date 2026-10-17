"""Build docs/catalog.json from every NS8 software repository we can find."""
import argparse
import json
import logging
import sys
from datetime import datetime, timezone
from pathlib import Path

from concurrent.futures import ThreadPoolExecutor

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from crawler.model import (Catalog, MIN_ABOUT, compliance, github_full_name, is_useful_about, make_variant,
                           normalize_code_url, readme_excerpt, version_key)
from crawler.net import Http
from crawler.sources.github import GitHub
from crawler.sources.gitlab import GitLab

log = logging.getLogger("crawl")
ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "docs" / "catalog.json"
PROBE_WORKERS = 16


def forge_versions(app):
    # Semver: any pre-release suffix (-testing.1, -dev.2, -rc1) is not a stable release.
    versions = [(v["tag"], bool(v.get("testing")) or "-" in v["tag"]) for v in app.get("versions") or [] if v.get("tag")]
    # repodata.json does not guarantee any order.
    return sorted(versions, key=lambda v: version_key(v[0]), reverse=True)


def add_forge(catalog, forges, forge, repodata, kind):
    if not isinstance(repodata, list):
        log.warning("forge %s: no usable repodata.json", forge["id"])
        return
    forge["app_count"] = len(repodata)
    forges.append(forge)
    for app in repodata:
        if not app.get("id"):
            continue
        catalog.add(app["id"], make_variant(app, app_id=app["id"], forge=forge, kind=kind,
                                            versions=forge_versions(app), asset_base=forge["url"]))
    log.info("forge %s: %d apps", forge["id"], len(repodata))


def code_owner(app):
    url = normalize_code_url((app.get("docs") or {}).get("code_url"))
    return url.split("/")[3].lower() if url else None


def crawl_forges(cfg, gh, http, catalog, forges, candidates):
    for entry in cfg.get("official") or []:
        forge = {"id": entry["id"], "name": entry["name"], "url": entry["url"], "kind": "official", "repo": None}
        add_forge(catalog, forges, forge, http.get(f"{entry['url']}repodata.json"), "official")

    upstream = cfg["nethforge"]
    upstream_data = gh.forge_repodata(upstream)
    upstream_cname = (gh.raw(upstream, "repomd", "CNAME", as_json=False) or "").strip()
    forge = {"id": "nethforge", "name": "NethForge", "url": gh.forge_public_url(upstream),
             "kind": "nethforge", "repo": upstream}
    add_forge(catalog, forges, forge, upstream_data, "nethforge")

    for full_name in gh.forks(upstream):
        data = gh.forge_repodata(full_name)
        if not isinstance(data, list) or not data:
            continue
        owner = full_name.split("/")[0]
        # A fork publishing none of its owner's repos is an old copy of nethforge.
        if owner.lower() not in {code_owner(a) for a in data}:
            log.info("fork %s: publishes no repo of its own, skipped", full_name)
            continue
        forge = {"id": owner, "name": full_name, "url": gh.forge_public_url(full_name, upstream_cname=upstream_cname),
                 "kind": "community", "repo": full_name}
        add_forge(catalog, forges, forge, data, "community")

    # Forges started from scratch instead of forking nethforge.
    known = {f["repo"] for f in forges}
    with ThreadPoolExecutor(PROBE_WORKERS) as pool:
        refs = dict(zip(candidates, pool.map(gh.find_forge_ref, candidates)))
    found = [(n, ref, gh.forge_repodata(n, ref)) for n, ref in refs.items()
             if ref and n not in known and not (gh.repo(n) or {}).get("fork")]
    # Biggest first, so a stale copy left in another repo adds nothing new and is skipped.
    for full_name, ref, data in sorted(found, key=lambda f: -len(f[2])):
        owner = full_name.split("/")[0]
        if owner.lower() not in {code_owner(a) for a in data}:
            continue
        code_urls = {normalize_code_url((a.get("docs") or {}).get("code_url")) for a in data}
        if all(u and catalog.has_code_url(u) for u in code_urls):
            log.info("forge %s: every app already listed, skipped", full_name)
            continue
        forge_id = owner if owner not in {f["id"] for f in forges} else full_name
        forge = {"id": forge_id, "name": full_name, "url": gh.forge_public_url(full_name, ref, upstream_cname),
                 "kind": "community", "repo": full_name}
        add_forge(catalog, forges, forge, data, "community")

    for entry in cfg.get("forges") or []:
        if "github" in entry:
            data = gh.forge_repodata(entry["github"])
            url = gh.forge_public_url(entry["github"])
        else:
            url = entry["url"].rstrip("/") + "/"
            data = http.get(f"{url}repodata.json")
        forge = {"id": entry["id"], "name": entry.get("name", entry["id"]), "url": url,
                 "kind": "community", "repo": entry.get("github")}
        add_forge(catalog, forges, forge, data, "community")


def code_repo(gh, http, code_url):
    """GitHub-shaped repo info for the app's source code, on GitHub or GitLab."""
    full_name = github_full_name(code_url)
    if full_name:
        return gh.repo(full_name), lambda: gh.readme(full_name)
    if code_url and "gitlab" in code_url.split("/")[2]:
        host, path = code_url.split("/")[2], "/".join(code_url.split("/")[3:5])
        gl = GitLab(http, host)
        project = gl.project(path)
        return project, lambda: project and gl.readme(path, project["default_branch"])
    return None, lambda: None


def enrich(catalog, gh, http):
    """Stars and activity come from the code repo, plus a longer description when needed."""
    for v in catalog.variants():
        repo, readme = code_repo(gh, http, v["code_url"])
        v["checks"] = compliance(v, repo)
        if repo:
            v["stars"] = repo.get("stargazers_count", 0)
            v["pushed_at"] = repo.get("pushed_at")
            v["archived"] = repo.get("archived", False)
        full_name = github_full_name(v["code_url"])
        if full_name and v["stable"]:
            v["released_at"] = gh.release_date(full_name, v["stable"])

        base = v["description"].get("en") or next(iter(v["description"].values()), "")
        if len(base) >= MIN_ABOUT:
            continue
        candidates = [base, (repo or {}).get("description") or ""]
        if not any(is_useful_about(c) for c in candidates):
            candidates.append(readme_excerpt(readme()) or "")
        best = next((c for c in candidates if is_useful_about(c)), None)
        if best and best != base:
            v["about"] = best


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cache", action="store_true", help="reuse HTTP answers stored in .cache/")
    parser.add_argument("--output", type=Path, default=OUTPUT)
    parser.add_argument("--skip-discovery", action="store_true",
                        help="only read the official repository, NethForge, its forks and sources.yml")
    args = parser.parse_args()
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")

    cfg = yaml.safe_load((ROOT / "sources.yml").read_text())
    http = Http(use_cache=args.cache)
    gh = GitHub(http)
    catalog = Catalog(cfg.get("aliases"))
    forges = []

    excluded = {r.lower() for r in cfg.get("exclude_repos") or []}
    candidates = [] if args.skip_discovery else gh.find_candidates(cfg.get("exclude_orgs") or [])
    candidates = [n for n in candidates if n.lower() not in excluded]
    log.info("discovery: %d candidate repos", len(candidates))

    crawl_forges(cfg, gh, http, catalog, forges, candidates)
    enrich(catalog, gh, http)

    apps = catalog.to_json()
    previous = 0
    if args.output.exists():
        previous = len(json.loads(args.output.read_text()).get("apps", []))
    # A broken API run must not wipe the published catalog.
    if previous and len(apps) < previous / 2:
        log.error("only %d apps found against %d last time, keeping the old catalog", len(apps), previous)
        return 1

    args.output.write_text(json.dumps({
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "forges": forges,
        "apps": apps,
    }, ensure_ascii=False, indent=1) + "\n")
    log.info("wrote %d apps, %d variants, %d forges (%d HTTP calls) to %s",
             len(apps), sum(len(a["variants"]) for a in apps), len(forges), http.calls, args.output)
    return 0


if __name__ == "__main__":
    sys.exit(main())
