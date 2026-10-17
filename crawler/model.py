import re
from urllib.parse import urlparse

# Higher wins when the same code repo is published in several places.
KIND_RANK = {"official": 3, "nethforge": 2, "community": 1}

MIN_ABOUT = 60
PLACEHOLDER_OWNERS = {"author", "owner", "user", "your-org"}
# Categories the NS8 Software Center knows (ns8-core software_center.app_categories).
STANDARD_CATEGORIES = {"core", "development", "collaboration", "system_administration", "office", "documentation",
                       "database", "storage", "monitoring", "web", "communication", "security", "multimedia"}

# Authors pick category names freely, so fold the synonyms seen in the wild.
CATEGORY_ALIASES = {"system": "system_administration", "audio": "multimedia", "financial": "accounting",
                    "vector-search": "ai", "surveys": "productivity"}


def version_key(tag):
    """Sort key for tags like 1.2.3, v1.2.3-testing.4 or 0.0.40-alpha."""
    tag = tag.lstrip("vV")
    main, _, pre = tag.partition("-")
    nums = tuple(int(n) for n in re.findall(r"\d+", main)[:4])
    pre_nums = tuple(int(n) for n in re.findall(r"\d+", pre))
    # A final release sorts after any prerelease of the same number.
    return nums, 0 if pre else 1, pre_nums


def split_versions(tags_with_flag):
    """Take [(tag, testing)] newest first and return (stable, testing)."""
    stable = next((t for t, testing in tags_with_flag if not testing), None)
    testing = None
    for tag, is_testing in tags_with_flag:
        if tag == stable:
            break
        if is_testing:
            testing = tag
            break
    return stable, testing


def normalize_code_url(url):
    if not url:
        return None
    p = urlparse(url.strip())
    parts = [s for s in p.path.split("/") if s][:2]
    if len(parts) < 2:
        return None
    name = parts[1].removesuffix(".git")
    return f"https://{p.netloc.lower()}/{parts[0]}/{name}"


def github_full_name(code_url):
    if code_url and code_url.startswith("https://github.com/"):
        return code_url.removeprefix("https://github.com/")
    return None


# Text copied from the module template or about the repo itself, not about the app.
BOILERPLATE = re.compile(r"template module|kickstart|start a new module|install via|software center|"
                         r"add(ing)? (my|the) repo|this repository|output of the command|name your repo|"
                         r"browse to|fqdn|password|login|add-module|runagent|configure-module|"
                         r"proof of concept|dismissed|workflows?|piler-server", re.I)


def is_useful_about(text):
    return bool(text) and len(text) >= MIN_ABOUT and not BOILERPLATE.search(text)


def readme_excerpt(text):
    """First real paragraph of a README, without headings, badges or code."""
    if not text:
        return None
    in_code = False
    para = []
    seen_title = False
    for line in text.splitlines() + [""]:
        s = line.strip()
        # Only the intro under the title describes the app; later sections are setup notes.
        if s.startswith("#"):
            if seen_title and not s.startswith("# "):
                break
            seen_title = True
        if s.startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        noise = s.startswith(("#", "[![", "![", "<", "|", "---", "===", ">", "- ", "* ", "+ ")) or re.match(r"\d+\. ", s)
        if s and not noise:
            para.append(s)
            continue
        if para:
            candidate = " ".join(para)
            candidate = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", candidate)
            candidate = re.sub(r"[*_`]{1,2}", "", candidate)
            if is_useful_about(candidate):
                return candidate[:400].rsplit(" ", 1)[0] + "…" if len(candidate) > 400 else candidate
            para = []
    return None


def make_variant(meta, *, app_id, forge, kind, versions, asset_base=None, code_url=None):
    docs = meta.get("docs") or {}
    # The discovered repo is more reliable than a metadata link left from the template.
    declared = normalize_code_url(docs.get("code_url"))
    if declared and declared.split("/")[3] in PLACEHOLDER_OWNERS:
        declared = None
    code_url = normalize_code_url(code_url) or declared
    stable, testing = split_versions(versions)
    labels = {}
    for v in meta.get("versions") or []:
        if v.get("tag") == (stable or testing):
            labels = v.get("labels") or {}

    def asset(path):
        if not path:
            return None
        if path.startswith("http") or not asset_base:
            return path if path.startswith("http") else None
        return f"{asset_base}{app_id}/{path}"

    owner = github_full_name(code_url)
    developer = owner.split("/")[0] if owner else (code_url.split("/")[3] if code_url else forge["id"])
    description = meta.get("description") or {}
    if isinstance(description, str):
        description = {"en": description}
    name = meta.get("name") or app_id
    if name.islower():
        name = name.capitalize()

    return {
        "module_id": app_id,
        "forges": [forge["id"]],
        "kind": kind,
        "developer": developer,
        "name": name,
        "description": {k: v for k, v in description.items() if v},
        "about": None,
        "authors": [a.get("name") for a in meta.get("authors") or [] if a.get("name")],
        "categories": sorted({CATEGORY_ALIASES.get(c.lower(), c.lower()) for c in meta.get("categories") or []}),
        "code_url": code_url,
        "docs": {k: v for k, v in docs.items() if v and k != "code_url"},
        "logo": asset(meta.get("logo")),
        "screenshots": [s for s in (asset(p) for p in meta.get("screenshots") or []) if s],
        "versions": [{"tag": t, "testing": f} for t, f in versions[:15]],
        "stable": stable,
        "testing": testing,
        "min_core": labels.get("org.nethserver.min-core"),
        "source": meta.get("source"),
        "stars": None,
        "pushed_at": None,
        "archived": False,
    }


class Catalog:
    def __init__(self, aliases=None):
        self.aliases = aliases or {}
        self.apps = {}
        self.gitlab_projects = {}

    def add(self, app_id, variant):
        app_id = self.aliases.get(app_id, app_id)
        variants = self.apps.setdefault(app_id, [])
        key = variant["code_url"]
        for existing in variants:
            same_repo = key and existing["code_url"] == key
            same_forge = not key and not existing["code_url"] and existing["forges"] == variant["forges"]
            if same_repo or same_forge:
                self._merge(existing, variant)
                return
        variants.append(variant)

    def has_code_url(self, code_url):
        return any(v["code_url"] == code_url for vs in self.apps.values() for v in vs)

    @staticmethod
    def _merge(into, other):
        for f in other["forges"]:
            if f not in into["forges"]:
                into["forges"].append(f)
        if KIND_RANK[other["kind"]] > KIND_RANK[into["kind"]]:
            into["kind"] = other["kind"]
        # Keep the newest published version among the places it is published.
        if other["stable"] and (not into["stable"] or version_key(other["stable"]) > version_key(into["stable"])):
            for k in ("versions", "stable", "testing", "min_core"):
                into[k] = other[k]
        for k in ("logo", "source"):
            into[k] = into[k] or other[k]
        into["screenshots"] = into["screenshots"] or other["screenshots"]
        for lang, text in other["description"].items():
            into["description"].setdefault(lang, text)

    def variants(self):
        for vs in self.apps.values():
            yield from vs

    def to_json(self):
        apps = []
        for app_id, variants in sorted(self.apps.items()):
            variants.sort(key=lambda v: (-KIND_RANK[v["kind"]], -(v["stars"] or 0), v["developer"].lower()))
            categories = sorted({c for v in variants for c in v["categories"]})
            apps.append({
                "id": app_id,
                "categories": categories,
                "official": any(v["kind"] == "official" for v in variants),
                "stars": sum(v["stars"] or 0 for v in variants),
                "variants": variants,
            })
        return apps


def compliance(v, repo):
    """Recommended practices, see "Get your app listed" in README.md."""
    desc = v["description"].get("en", "")
    docs = v["docs"]
    return {
        "topic": "ns8" in ((repo or {}).get("topics") or []),
        "categories": bool(v["categories"]) and all(c in STANDARD_CATEGORIES for c in v["categories"]),
        "logo": bool(v["logo"]),
        "screenshots": bool(v["screenshots"]),
        "description": len(desc) >= MIN_ABOUT,
        "translations": len(v["description"]) > 1,
        "docs": bool(docs.get("documentation_url")) and bool(docs.get("bug_url")),
        "min_core": bool(v["min_core"]),
        "license": bool((repo or {}).get("license")),
    }
