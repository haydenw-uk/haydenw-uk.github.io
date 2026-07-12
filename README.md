# Project Lab

The Project Lab area for Hayden Williams's project showcases and websites.

It provides a direct link to [haydenwilliams.dev](https://www.haydenwilliams.dev) and an automatically maintained index of all Lab Projects.

## Project index

The page reads `projects.json`. The `Refresh project index` GitHub Actions workflow runs every six hours and can also be started manually.

The workflow:

* Finds repositories owned by `haydenw-uk` with GitHub Pages enabled
* Builds the project website URL and display metadata
* Records GitHub statistics such as stars, forks, open issues, language, and update time
* Keeps existing entries when GitHub does not expose the backing repository publicly
* Commits changes to `projects.json` only when the index changes

The Project Lab cycles through the generated data in the GitHub Signals panel. The project cards remain the primary navigation, with one click access to each website.

## Private Pages repositories

For fully automatic discovery of GitHub Pages sites backed by private repositories, add a fine-grained GitHub token with read-only repository metadata access as an Actions secret named `PROJECT_INDEX_TOKEN`.

The token must be able to read the relevant private repositories. The workflow uses it automatically when present and falls back to `GITHUB_TOKEN` when it is not.

## Local development

The site is a static HTML, CSS, and JavaScript project. Serve the directory locally to test `projects.json` loading:

```bash
python3 -m http.server 8765
```

Then open `http://localhost:8765/`.

## Deployment

In the repository's **Settings → Pages**, select **Deploy from a branch**, choose `main`, and use the `/ (root)` folder. The site will then be available at `https://haydenw-uk.github.io/`.
