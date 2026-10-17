from urllib.parse import quote


class GitLab:
    """Minimal reader for app source code hosted on a GitLab instance."""

    def __init__(self, http, host="gitlab.com"):
        self.http = http
        self.api = f"https://{host}/api/v4"
        self.host = host

    def _project_url(self, project):
        return f"{self.api}/projects/{quote(project, safe='')}"

    def project(self, project):
        data = self.http.get(self._project_url(project))
        if not data:
            return None
        return {
            "html_url": data["web_url"],
            "stargazers_count": data.get("star_count", 0),
            "pushed_at": data.get("last_activity_at"),
            "archived": data.get("archived", False),
            "description": data.get("description"),
            "default_branch": data.get("default_branch", "main"),
            "owner": project.split("/")[0],
        }

    def file(self, project, ref, path, as_json=True):
        url = f"{self._project_url(project)}/repository/files/{quote(path, safe='')}/raw"
        return self.http.get(url, {"ref": ref}, as_json=as_json)

    def readme(self, project, ref):
        return self.file(project, ref, "README.md", as_json=False)
