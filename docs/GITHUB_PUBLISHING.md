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

## GitHub Pages requirements

- Keep `public/.nojekyll`.
- Use hash navigation for internal routes.
- Do not require server-side route rewrites.
- Keep worker and manifest assets inside the built static output.
- Use `npm ci` in CI for deterministic installs.

## Workflow expectations

The deployment workflow should run type checking, linting, formatting verification, tests, production build, build verification, and production dependency audit before publishing from `main`.
