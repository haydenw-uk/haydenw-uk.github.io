# haydenw-uk.github.io

The landing page for [haydenwilliams.dev](https://www.haydenwilliams.dev) and Hayden's public mini projects.

## How the project list stays current

The page reads `projects.json`. The `Refresh project index` GitHub Actions workflow rebuilds that file every six hours by querying repositories owned by `haydenw-uk` and keeping repositories that have GitHub Pages enabled.

This means a new public GitHub Pages mini project appears in the navigation automatically after the next scheduled refresh. Existing entries are retained when GitHub does not expose their backing repository publicly, which keeps public Pages sites such as Money Mission in the index.

For fully automatic discovery of Pages sites backed by private repositories, add a fine-grained GitHub token with read-only repository metadata access as an Actions secret named `PROJECT_INDEX_TOKEN`. The workflow will use it automatically when present.

## Deployment

In the repository's **Settings → Pages**, select **Deploy from a branch**, choose `main`, and use the `/ (root)` folder. The site will then be available at `https://haydenw-uk.github.io/`.
