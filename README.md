# haydenw-uk.github.io

The Projects Labs area for Hayden Williams's experimental project showcases and websites.

## How the project list stays current
The page reads `projects.json`. The `Refresh project index` GitHub Actions workflow rebuilds that file every six hours by querying repositories owned by `haydenw-uk` and keeping repositories that have GitHub Pages enabled.

This means a new public GitHub Pages project showcases/websites appears in the navigation automatically after the next scheduled refresh. Existing entries are retained when GitHub does not expose their backing repository publicly, which keeps public Pages sites such as Money Mission in the index.
