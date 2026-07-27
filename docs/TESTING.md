# Testing — NEXUS CODE v5

## Commands

```bash
npm run typecheck
npm run lint
npm run format:check
npm run validate:content
npm run test
npm run build
npm run test:e2e
```

## Expanded coverage

v5 adds or updates tests for registry totals, navigation, onboarding/project routes, storage version defaults, onboarding reducer behavior, and project milestone idempotency.

## Content validation

`scripts/validate-content.mjs` checks stable content IDs, duplicate detection, required v5 worlds, validation metadata, hints, bonus coverage, and documentation placeholder markers.

## Static e2e smoke

`scripts/e2e-smoke.mjs` verifies route registration, GitHub Pages base-path support, `.nojekyll`, build script composition, and built output when `dist/index.html` exists. It is intentionally dependency-light so it can run in constrained CI mirrors.

## Manual coverage

The QA checklist covers runtime flows, mobile navigation, import/export, themes, reduced motion, visual modes, and representative language tracks.
