# NS8 App Index

A catalog of every NethServer 8 application published in a software repository, official and community, rebuilt every night.

You can search apps by name, description or developer, browse them by category or repository, and compare the variants when several developers publish the same software. Each app page shows its stable version, how to install it from the Software Center, and a quality score.

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

Each app page shows a score out of 9, with a "How to improve" link to this section. The score is not a judgment of the software. It only measures how complete the listing is, so administrators can choose with confidence. The "Best quality" sort ranks apps by this score.

Every check is computed by the crawler from public data. You fix each one in your own repositories, and the new score appears after the next nightly crawl.

| Check | Passes when | How to fix it |
| --- | --- | --- |
| GitHub topic `ns8` | The source code repository (the one in `docs.code_url`) has the `ns8` topic. | GitHub: repository page, gear icon next to "About", add `ns8` to Topics. GitLab: Settings › General › Topics. |
| Standard categories | `categories` is not empty and every entry is one of the Software Center categories: `collaboration`, `communication`, `core`, `database`, `development`, `documentation`, `monitoring`, `multimedia`, `office`, `security`, `storage`, `system_administration`, `web`. | Replace custom names in `metadata.json`. Names are compared in lowercase, and a few common synonyms are folded (`system` becomes `system_administration`, `audio` becomes `multimedia`). |
| Logo | The app has a logo in `repodata.json`. | Put a `logo.png` next to `metadata.json` in your software repository. `createrepo.py` picks it up. |
| Screenshots | The app has at least one screenshot in `repodata.json`. | Put PNG files in a `screenshots/` folder next to `metadata.json`. |
| Description of 60+ characters | The English description in `metadata.json` (`description.en`) is at least 60 characters long. | Write one or two sentences that say what the software does for the user. "NS8 module for Foo" does not help. The site may show a longer text taken from your GitHub description or README when yours is short, but only `description.en` counts for the score. |
| Translated description | `description` has at least one language besides `en`. | Add `fr`, `it`, `de`, `es` or any other language. Visitors see their own language when it exists. |
| Documentation and bug links | Both `docs.documentation_url` and `docs.bug_url` are set. | Fill both in `metadata.json`. Your README and your issue tracker are fine targets. |
| Minimum core label | The image of the version shown (stable, or testing when there is no stable) has the `org.nethserver.min-core` label. | Add `--label="org.nethserver.min-core=3.x.y"` in `build-images.sh` and publish a new release. |
| License file | GitHub or GitLab detects a license in the source code repository. | Add a `LICENSE` file with a standard license text at the root of the repository. |

When `docs.code_url` is missing or points to a repository the crawler cannot read, the topic and license checks fail, and stars and dates stay empty. Make sure `code_url` points to the public repository of the module.

### Badges

| Badge | Shown when | How to remove it |
| --- | --- | --- |
| Official | The app comes from the default NS8 repository. | It cannot be added to a community app. |
| testing (orange version) | The app has a pre-release newer than its stable release, or no stable release at all. A version with any semver suffix (`-testing.1`, `-dev.2`, `-rc1`) is a pre-release. | Publish a stable release without a suffix, such as `1.2.0`. |
| unmaintained | The stable release is more than a year old and no testing release came after it. The release date is the GitHub release of the stable tag, or the date of the tagged commit when there is no GitHub release. | Publish a new stable release, or a testing release that shows work is going on. A git tag must match the version in `repodata.json` for the date to be read. Apps whose code is not on GitHub never get this badge. |
| archived | The source code repository is archived on GitHub or GitLab. | Unarchive it, or point `docs.code_url` to the repository where the work continues. |
| Runs as root | The image has `org.nethserver.rootfull=1`. | This is information, not a penalty. It goes away only if the module becomes rootless. |
| N variants | Several repositories publish an app with the same module id. | Nothing to fix. Users compare the variants on the app page. |

### Install instructions

The app page tells users how to add your repository in the Software Center. It shows the URL announced by your repository, taken from the `CNAME` file of the published branch, and the raw GitHub URL of that branch as an alternative. When there is no `CNAME`, only the raw URL is shown. If your custom domain stops serving `ns8/updates/repodata.json`, users can still use the alternative.

### My app is not listed

Check these points, in order:

1. The software repository serves `ns8/updates/repodata.json` and your app is in it.
2. If the repository is a fork of `NethServer/ns8-nethforge`, at least one app in it has a `docs.code_url` owned by the same GitHub account as the fork. A fork whose apps all point to other accounts is treated as a copy of NethForge.
3. If the repository is not a fork, it is public, has `ns8` in its name or the `ns8` topic, and serves `repodata.json` on its default branch or on a `repomd` branch.
4. The repository is not hosted under the `NethServer` or `nethesis` organizations, whose apps already come from the official repository.
5. The module id is not in `exclude_apps`. System modules installed with the core (`core`, `traefik`, `loki`, `metrics`, `ldapproxy`) are not listed as apps.
6. Wait for the next nightly crawl, or ask for a manual run.

If none of this helps, open an issue in this repository with the URL of your software repository.

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
exclude_apps:
  - core      # system modules installed with the core are not apps
aliases:
  uptime-kuma: kuma
```

## Where the data comes from

The crawler reads the official NS8 repository, NethForge, every fork of `NethServer/ns8-nethforge` that publishes its own apps, any other GitHub repository serving `ns8/updates/repodata.json`, and the repositories listed in `sources.yml`. GitHub repositories are found by name and by the `ns8` topic.

`repodata.json` already holds names, descriptions, categories, logos, screenshots, versions and image labels. The crawler adds stars, last activity, license, topics and release dates from each app's source code repository, on GitHub or GitLab.

The app page also shows technical details read from the image labels: whether the module runs as root, the container images, the permissions it asks for, the ports it reserves and its volumes.

## Run it locally

```sh
pip install -r requirements.txt
python crawler/crawl.py --cache   # uses `gh auth token` when GITHUB_TOKEN is unset
python -m http.server -d docs
```

`--cache` stores HTTP answers in `.cache/` so you can rerun quickly. Delete that directory to fetch fresh data.

The GitHub Action in `.github/workflows/crawl.yml` runs the crawler every night, commits `docs/catalog.json` when it changes, and deploys the `docs/` folder to GitHub Pages.
