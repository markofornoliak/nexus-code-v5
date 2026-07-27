# Architecture — NEXUS CODE v5

NEXUS CODE v5 remains a Vite, React 19, TypeScript, CodeMirror, Three.js, Worker, and Pyodide application. The architecture favors static deployment, local-first persistence, deterministic content data, and browser isolation over backend assumptions.

## Application shell

`src/app/App.tsx` registers the hash-compatible routes. The new v5 routes are `#/onboarding` and `#/projects`; all v4 routes remain present. `src/components/layout/AppShell.tsx` exposes learning, tracks, Atlas, lab, projects, and profile without server-side routing.

## Content layer

Curriculum data is still defined in `src/content`. v5 appends content rather than renaming legacy IDs:

- `src/content/python/v5Worlds.ts`
- `src/content/javascript/v5World.ts`
- `src/content/html-css/v5World.ts`
- `src/content/java/v5World.ts`
- `src/content/cpp/v5World.ts`
- `src/content/projects.ts`

`src/content/registry.test.ts` and `scripts/validate-content.mjs` protect counts, ID uniqueness, world registration, hints, validation metadata, and v5 expansion coverage.

## Progress state

The existing reducer model remains appropriate because persisted state is compact and deterministic. v5 adds project milestone progress and onboarding preferences through storage schema version 6. Runtime state, editor state, and persisted learner state remain separate.

Key files:

- `src/types/progress.ts`
- `src/types/projects.ts`
- `src/services/storage/schema.ts`
- `src/features/progress/progressReducer.ts`

## Storage

Small user state remains in localStorage. The schema migration from version 5 to version 6 adds `projectProgress` and onboarding preference fields while keeping completed tasks, lessons, bonuses, XP, achievements, streaks, bookmarks, drafts, and profile data intact.

## Runtime boundaries

Python and JavaScript execution stay in Web Workers. HTML/CSS preview remains sandboxed. Java and C++ validation is structural and source-based; the UI and documentation do not claim native compilation.

## Styling architecture

The former large stylesheet is preserved as `src/styles/legacy/v4-core.css` and wrapped by a new structure:

- `src/styles/base/reset.css`
- `src/styles/base/tokens.css`
- `src/styles/base/accessibility.css`
- `src/styles/components/v5-instruments.css`
- `src/styles/pages/onboarding.css`
- `src/styles/pages/projects.css`
- `src/styles/pages/v5-overrides.css`
- `src/styles/global.css`

The new cascade introduces semantic tokens and v5 page styles while maintaining visual compatibility with existing pages.

## Deployment

`vite.config.ts` uses `VITE_BASE_PATH` for repository-subpath deployment. `scripts/verify-build.mjs` checks static-output requirements, and `public/.nojekyll` is retained for GitHub Pages.
