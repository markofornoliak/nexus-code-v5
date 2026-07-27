# NEXUS CODE v5 verification reference

This file supersedes the v4 verification note for the active project. The full v5 procedure and latest environment-specific results should be recorded in `docs/VERIFICATION_V5.md`.

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

## v5 source checks

The release adds `npm run validate:content` and `npm run test:e2e` to protect content registry integrity and static-hosting route readiness.
