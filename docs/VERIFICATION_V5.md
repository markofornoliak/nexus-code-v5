# Verification — NEXUS CODE v5

Verification was attempted in the sandbox environment on 2026-07-27.

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

## Results from this environment

`npm ci` could not complete because the configured package registry returned a production dependency tarball error:

```text
npm error code E503
npm error 503 Service Temporarily Unavailable - GET .../yocto-queue/-/yocto-queue-0.1.0.tgz
```

`npm audit --omit=dev` also could not complete because the same registry returned a 503 from the audit endpoint.

Because dependencies could not be installed, the downstream dependency-backed commands were not valid final quality signals in this sandbox. Their observed failures were missing-tool or missing-type failures caused by absent `node_modules`, not completed source checks.

## Source-level checks that completed

```bash
node scripts/validate-content.mjs
```

Result:

```text
Content validation passed: 506 stable ids, 46 content files, no duplicate ids.
```

```bash
node scripts/e2e-smoke.mjs
```

Result before a production build was available:

```text
dist/index.html not present; source-level static-hosting smoke checks completed before build.
E2E smoke checks passed: 8 static deployment and route checks.
```

## Dependency-backed commands observed after failed install

- `npm run typecheck`: failed because `@testing-library/jest-dom`, `vite/client`, and `vitest/globals` type definitions were unavailable without installed dependencies.
- `npm run lint`: failed because `eslint` was unavailable without installed dependencies.
- `npm run format:check`: failed because `prettier` was unavailable without installed dependencies.
- `npm run test`: failed because `vitest` was unavailable without installed dependencies.
- `npm run build`: ran `validate:content` successfully, then stopped at typecheck for the same missing dependency types.
- `VITE_BASE_PATH=/nexus-code-v5/ npm run build`: same result as the default build.

## Manual verification targets for a machine with registry access

Landing, onboarding, tracks, Atlas, visual laboratory, Python lesson, JavaScript lesson, HTML/CSS lesson, Java lesson, C++ lesson, projects, profile, import/export, mobile navigation, offline/runtime-unavailable states, light theme, dark theme, reduced motion, minimal visual mode, and immersive visual mode.
