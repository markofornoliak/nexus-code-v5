# Verification — NEXUS CODE v5.1

NEXUS CODE v5.1 is verified through the permanent GitHub Actions quality gate on a clean Ubuntu runner with Node.js 24. The release preserves every published v4/v5 identifier while extending the product interface, curriculum, and project forge.

## Required clean gate

```bash
rm -rf node_modules dist
npm ci
npm audit --omit=dev
npm run typecheck
npm run lint
npm run format:check
npm run test
VITE_BASE_PATH=/nexus-code-v5/ npm run build
npm run test:e2e
```

## Release scope

- 29 curriculum worlds;
- 141 lessons;
- 282 required tasks;
- 141 bonus challenges;
- 8 milestone-based projects;
- 24 project milestones;
- 538 stable content identifiers across 51 content files;
- zero duplicate identifiers in source-level content validation.

The v5.1 release payload and its merged conflict overlay were reconstructed only after their SHA-256 checksums matched. Temporary transport files and release workflows are removed by the release commit before review. All new world accents use the existing typed design-token vocabulary, preserving theme compatibility. The redesigned landing module also keeps a zero-warning import surface after removing unused exploratory icons. Canonical Prettier output was applied to the complete release tree before the final gate.

## Quality signals

The permanent quality gate validates:

- deterministic dependency installation with `npm ci`;
- production dependency audit;
- TypeScript correctness;
- ESLint correctness;
- Prettier formatting;
- Vitest application, curriculum, migration, recommendation, and accessibility tests;
- repository-subpath production output for `/nexus-code-v5/`;
- static deployment and route smoke checks.

A release is merged only after every gate step succeeds.

## GitHub Pages

GitHub Pages is active at:

```text
https://markofornoliak.github.io/nexus-code-v5/
```

Merging v5.1 to `main` triggers the permanent deployment workflow. The post-deployment live smoke workflow then verifies the HTML shell and the generated JavaScript and CSS assets.

## Browser verification targets

Verify the redesigned landing observatory, track constellation, track detail pages, project dossiers, Atlas, visual laboratory, one lesson from every track, profile import/export, mobile navigation, unavailable-runtime states, light and dark themes, reduced motion, minimal mode, and immersive mode.
