import hashlib
import json
import logging
import os
import subprocess
import time
from pathlib import Path

import requests

log = logging.getLogger(__name__)

CACHE_DIR = Path(__file__).resolve().parent.parent / ".cache"


def _github_token():
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if token:
        return token
    try:
        return subprocess.run(["gh", "auth", "token"], capture_output=True, text=True, check=True).stdout.strip()
    except (OSError, subprocess.CalledProcessError):
        log.warning("no GitHub token found, API limits will be very low")
        return None


class Http:
    def __init__(self, use_cache=False):
        self.use_cache = use_cache
        self.session = requests.Session()
        # Repo probing runs in parallel threads; match the pool to them.
        adapter = requests.adapters.HTTPAdapter(pool_connections=4, pool_maxsize=32)
        self.session.mount("https://", adapter)
        self.session.headers["User-Agent"] = "ns8-apps"
        self.gh_token = _github_token()
        self.calls = 0

    def _cache_path(self, key):
        return CACHE_DIR / hashlib.sha1(key.encode()).hexdigest()

    def get(self, url, params=None, headers=None, as_json=True):
        """Return the decoded body, or None on 404 and other client errors."""
        key = url + json.dumps(params or {}, sort_keys=True)
        path = self._cache_path(key)
        if self.use_cache and path.exists():
            body = path.read_text()
            if body == "":
                return None
            if not as_json:
                return body
            try:
                return json.loads(body)
            except ValueError:
                return None

        headers = dict(headers or {})
        if self.gh_token and url.startswith("https://api.github.com/"):
            headers["Authorization"] = f"Bearer {self.gh_token}"
        for attempt in range(3):
            self.calls += 1
            try:
                r = self.session.get(url, params=params, headers=headers, timeout=30)
            except requests.RequestException as e:
                log.warning("GET %s failed: %s", url, e)
                time.sleep(2 * (attempt + 1))
                continue
            # Secondary rate limits come back as 403 with a Retry-After header.
            if r.status_code in (403, 429) and "Retry-After" in r.headers:
                wait = int(r.headers["Retry-After"]) + 1
                log.info("rate limited on %s, sleeping %ss", url, wait)
                time.sleep(wait)
                continue
            if r.status_code >= 500:
                time.sleep(2 * (attempt + 1))
                continue
            break
        else:
            return None

        body = r.text if r.ok else ""
        if self.use_cache:
            CACHE_DIR.mkdir(exist_ok=True)
            path.write_text(body)
        if not r.ok:
            if r.status_code != 404:
                log.warning("GET %s -> %s", url, r.status_code)
            return None
        if not as_json:
            return body
        try:
            return r.json()
        except ValueError:
            log.warning("GET %s returned invalid JSON", url)
            return None
