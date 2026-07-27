# GitHub Publishing — NEXUS CODE v5

The project is compatible with GitHub Pages static hosting and repository subpaths.

## Local production build

```bash
npm ci
npm run build
```

## Repository subpath build

```bash
rm -rf dist
VITE_BASE_PATH=/nexus-code-v5/ npm run build
```

## One-time repository activation

Before the first deployment, an administrator must open **Settings → Pages** and select **GitHub Actions** under **Build and deployment → Source**. GitHub requires this repository-level publishing-source selection before `actions/configure-pages` can read the Pages site configuration.

The standard workflow token cannot perform that first administrative activation. The `enablement` option in `actions/configure-pages` requires a separate personal token or GitHub App token with both Pages write and repository administration write permissions. Do not store such a token in the repository merely to avoid the one-time settings action.

After activation, either push to `main` or run **Deploy NEXUS to GitHub Pages** from the Actions tab. The expected project URL is:

```text
https://markofornoliak.github.io/nexus-code-v5/
```

## GitHub Pages requirements

- Keep `public/.nojekyll`.
- Use hash navigation for internal routes.
- Do not require server-side route rewrites.
- Keep worker and manifest assets inside the built static output.
- Use `npm ci` in CI for deterministic installs.
- Build with `VITE_BASE_PATH=/${{ github.event.repository.name }}/` in the deployment workflow.
- Upload only the verified `dist` directory as the Pages artifact.

## Workflow expectations

The permanent workflows are:

- `.github/workflows/ci.yml` — dependency installation, production audit, type checking, linting, formatting verification, tests, repository-subpath production build, and static smoke checks.
- `.github/workflows/deploy.yml` — repeats the release gate, uploads the verified Pages artifact, and deploys it through the protected `github-pages` environment.

## Troubleshooting

### Configure Pages fails before dependency installation

The Pages publishing source has not been activated. Select **GitHub Actions** in **Settings → Pages**, then rerun the failed deployment.

### The application loads but assets return 404

Confirm that `VITE_BASE_PATH` contains the repository name with leading and trailing slashes:

```text
/nexus-code-v5/
```

### A hash route does not survive refresh

Verify that navigation remains hash-based and that no server-side rewrite dependency was introduced.
