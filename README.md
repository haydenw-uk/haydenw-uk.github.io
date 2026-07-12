# haydenw-uk.github.io

The landing page for [haydenwilliams.dev](https://www.haydenwilliams.dev) and Hayden's public mini projects.

## How the project list stays current

The page reads `projects.json`. The `Refresh project index` GitHub Actions workflow rebuilds that file every six hours by querying the public repositories owned by `haydenw-uk` and keeping repositories that have GitHub Pages enabled.

This means a new GitHub Pages mini project appears in the navigation automatically after the next scheduled refresh. The workflow can also be run manually from the **Actions** tab with **Run workflow**.

## Deployment

In the repository's **Settings → Pages**, select **Deploy from a branch**, choose `main`, and use the `/ (root)` folder. The site will then be available at `https://haydenw-uk.github.io/`.
