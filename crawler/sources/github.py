import base64
import logging
import time

log = logging.getLogger(__name__)

API = "https://api.github.com"
RAW = "https://raw.githubusercontent.com"


class GitHub:
    def __init__(self, http):
        self.http = http
        self._repos = {}

    def _paged(self, path, params=None, key=None, max_pages=10, pause=0):
        items = []
        for page in range(1, max_pages + 1):
            data = self.http.get(f"{API}{path}", {**(params or {}), "per_page": 100, "page": page})
            if data is None:
                break
            batch = data[key] if key else data
            items.extend(batch)
            if len(batch) < 100:
                break
            time.sleep(pause)
        return items

    def forks(self, full_name):
        """All forks below full_name, forks of forks included."""
        found = []
        queue = [full_name]
        while queue:
            for fork in self._paged(f"/repos/{queue.pop()}/forks"):
                found.append(fork["full_name"])
                if fork.get("forks_count"):
                    queue.append(fork["full_name"])
        return found

    def repo(self, full_name):
        if full_name not in self._repos:
            self._repos[full_name] = self.http.get(f"{API}/repos/{full_name}")
        return self._repos[full_name]

    def raw(self, full_name, ref, path, as_json=True):
        return self.http.get(f"{RAW}/{full_name}/{ref}/{path}", as_json=as_json)

    def forge_repodata(self, full_name, ref="repomd"):
        return self.raw(full_name, ref, "ns8/updates/repodata.json")

    def find_forge_ref(self, full_name):
        """Branch serving ns8/updates/repodata.json, or None when the repo is not a forge."""
        repo = self.repo(full_name)
        if not repo:
            return None
        for ref in dict.fromkeys([repo["default_branch"], "repomd"]):
            if isinstance(self.forge_repodata(full_name, ref), list):
                return ref
        return None

    def forge_public_url(self, full_name, ref="repomd", upstream_cname=None):
        """URLs users can add in the Software Center: the developer's domain, then raw files on GitHub."""
        cname = (self.raw(full_name, ref, "CNAME", as_json=False) or "").strip()
        raw = f"{RAW}/{full_name}/{ref}/ns8/updates/"
        # Forks inherit nethforge's CNAME file without owning that domain.
        if cname and cname != upstream_cname:
            return f"https://{cname}/ns8/updates/", raw
        return raw, None

    def release_date(self, full_name, tag):
        """When the tag was released, from the GitHub release or else the tagged commit."""
        rel = self.http.get(f"{API}/repos/{full_name}/releases/tags/{tag}")
        if rel and rel.get("published_at"):
            return rel["published_at"]
        commit = self.http.get(f"{API}/repos/{full_name}/commits/{tag}")
        return ((commit or {}).get("commit") or {}).get("committer", {}).get("date")

    def find_candidates(self, exclude_orgs):
        """Repos that may be software repositories. Callers check for repodata.json to be sure."""
        excludes = " ".join(f"-org:{o}" for o in exclude_orgs)
        names = set()
        for q in (f"ns8 in:name fork:false {excludes}", f"topic:ns8 fork:false {excludes}"):
            for item in self._paged("/search/repositories", {"q": q}, key="items"):
                self._repos.setdefault(item["full_name"], item)
                names.add(item["full_name"])
        return sorted(names)

    def readme(self, full_name):
        data = self.http.get(f"{API}/repos/{full_name}/readme")
        if not data or data.get("encoding") != "base64":
            return None
        return base64.b64decode(data["content"]).decode("utf-8", "replace")
