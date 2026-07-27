# Verification — NEXUS CODE v5

NEXUS CODE v5 was verified in GitHub Actions on July 27, 2026, using a clean Ubuntu runner and Node.js 24.

## Required clean gate

```bash
rm -rf node_modules dist
npm ci
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npm audit --omit=dev
npm run test:e2e
rm -rf dist
VITE_BASE_PATH=/nexus-code-v5/ npm run build
```

The permanent workflows run the same dependency-backed checks with the repository subpath configured for GitHub Pages.

## Verified results

- `npm ci`: passed on a clean GitHub-hosted runner.
- `npm audit --omit=dev`: passed with exit code 0.
- `npm run typecheck`: passed with zero TypeScript errors.
- `npm run lint`: passed with zero ESLint warnings or errors.
- `npm run format:check`: passed with no formatting differences.
- `npm run test`: passed all 80 Vitest tests.
- `npm run build`: passed, including content validation, type checking, Vite production output, and static-output verification.
- `VITE_BASE_PATH=/nexus-code-v5/ npm run build`: passed through the repository-subpath production workflow.
- `npm run test:e2e`: passed all 8 static deployment and route smoke checks.
- Content validation: passed with 506 stable IDs across 46 content files and no duplicate IDs.

The quality gate also verified the corrected generated task identifiers while preserving every released v4 identifier.

## GitHub Pages status

The application builds successfully for `/nexus-code-v5/`, and the Pages artifact upload succeeds. Public deployment is waiting for the one-time repository setting:

1. Open **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Rerun **Deploy NEXUS to GitHub Pages**.

The standard `GITHUB_TOKEN` cannot perform this first repository-administration action. Temporary repair workflows were removed after confirming the permission boundary.

Expected public URL after activation:

```text
https://markofornoliak.github.io/nexus-code-v5/
```

The permanent live-site smoke workflow runs only after a successful deployment and verifies the HTML shell plus the generated JavaScript and CSS assets.

## Browser verification targets

After Pages activation, verify the landing page, onboarding, tracks, Atlas, visual laboratory, one lesson from every track, one project, profile import/export, mobile navigation, unavailable-runtime states, light and dark themes, reduced motion, minimal mode, and immersive mode. The automated suite already covers route rendering, navigation, workspace states, progress persistence, storage migration, content integrity, recommendations, validation, and critical accessibility interactions.
