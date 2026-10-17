# NS8 App Index

A catalog of every NethServer 8 application published in a software repository, official and community, rebuilt every night.

You can search apps, browse them by category, repository or developer, and compare the variants when several developers publish the same software. Each app page shows its stable version, how to install it from the Software Center, and a quality score.

## Get your app listed

The index lists what an administrator can install from the NS8 Software Center, so an app appears only when it is published in a software repository. A module that exists only as a source repository is not listed.

### Requirements

1. **Publish the app in a software repository.** A software repository serves `ns8/updates/repodata.json`, built by [ns8-repomd](https://github.com/NethServer/ns8-repomd) from one folder per app. The usual way is to fork [ns8-nethforge](https://github.com/NethServer/ns8-nethforge), add your app folder, and let its workflow publish the `repomd` branch.
2. **Make the repository findable.** One of these is enough:
   - a fork of `NethServer/ns8-nethforge`,
   - a public GitHub repository with `ns8` in its name or the `ns8` topic, serving `ns8/updates/repodata.json` on its default branch or on a `repomd` branch,
   - an entry in `sources.yml`, for a repository hosted anywhere else (GitLab Pages, your own web server). Open a pull request.
3. **Publish at least one of your own apps.** A fork that only republishes NethForge apps is skipped.

Each app folder needs a `metadata.json` with real values, as created by [ns8-kickstart](https://github.com/NethServer/ns8-kickstart):

```json
{
  "name": "myapp",
  "description": {
    "en": "Self-hosted photo library with face recognition and mobile backup."
  },
  "categories": ["multimedia"],
  "authors": [{ "name": "Jane Doe", "email": "jane@example.org" }],
  "docs": {
    "documentation_url": "https://github.com/jane/ns8-myapp#readme",
    "bug_url": "https://github.com/jane/ns8-myapp/issues",
    "code_url": "https://github.com/jane/ns8-myapp"
  },
  "source": "ghcr.io/jane/myapp"
}
```

Versions come from the image tags that `createrepo.py` writes into `repodata.json`. Use semantic versioning: `1.0.0` for a stable release, `1.0.0-testing.1` for a testing one.

### Quality score

Each app page shows a score out of 9. Each point makes the entry more useful, and the "Best quality" sort ranks apps by this score.

| Check | How to get it |
| --- | --- |
| GitHub topic `ns8` | Add it to the source code repository in its settings. |
| Standard categories | Use the categories the Software Center knows: `collaboration`, `communication`, `core`, `database`, `development`, `documentation`, `monitoring`, `multimedia`, `office`, `security`, `storage`, `system_administration`, `web`. Other names split the category filter. |
| Logo | A `logo.png` next to `metadata.json`. |
| Screenshots | PNG files in a `screenshots/` folder next to `metadata.json`. |
| Description of 60+ characters | Say what the software does for the user, not that it is "an NS8 module". When the description is too short, the index falls back to the GitHub repository description, then to the first paragraph of the README. |
| Translated description | Add `fr`, `it`, `de` or `es` next to `en` in `description`. The site shows the visitor's language when it exists. |
| Documentation and bug links | Fill `documentation_url` and `bug_url` in `docs`. |
| Minimum core label | Set `org.nethserver.min-core` in `build-images.sh`, so users know which core version the app needs. |
| License file | A `LICENSE` file that GitHub detects in the source code repository. |

Stars and the last update date come from the repository named in `code_url`, on GitHub or GitLab. Archived source repositories stay listed with an "archived" badge.

### Same software, several developers

Apps are grouped by module id, so `lamp` from NethForge and `lamp` from another repository appear on one page, side by side. When two developers package the same software under different ids, for instance `kuma` and `uptime-kuma`, add an alias in `sources.yml` to group them.

### `sources.yml`

```yaml
forges:
  - id: someone
    url: https://example.org/ns8/updates/
  - id: other
    github: owner/ns8-repo
exclude_repos:
  - owner/ns8-not-a-repository
aliases:
  uptime-kuma: kuma
```

## Where the data comes from

The crawler reads the official NS8 repository, NethForge, every fork of `NethServer/ns8-nethforge` that publishes its own apps, any other GitHub repository serving `ns8/updates/repodata.json`, and the repositories listed in `sources.yml`. GitHub repositories are found by name and by the `ns8` topic.

`repodata.json` already holds names, descriptions, categories, logos, screenshots and versions. The crawler adds stars, last activity and license from each app's source code repository.

## Run it locally

```sh
pip install -r requirements.txt
python crawler/crawl.py --cache   # uses `gh auth token` when GITHUB_TOKEN is unset
python -m http.server -d docs
```

`--cache` stores HTTP answers in `.cache/` so you can rerun quickly. Delete that directory to fetch fresh data.

The GitHub Action in `.github/workflows/crawl.yml` runs the crawler every night and commits `docs/catalog.json` when it changes. GitHub Pages serves the `docs/` folder.
