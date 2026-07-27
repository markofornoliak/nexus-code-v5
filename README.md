# NEXUS CODE v5

NEXUS CODE v5 is a browser-native, local-first programming education platform built as a living code observatory. It keeps the v4 spatial archive metaphor and turns it into a clearer learning product: tracks, worlds, lessons, projects, a searchable Atlas, a visual laboratory, runtime-backed practice, and exportable progress without a required backend.

## What changed in v5

v5 expands the curriculum to 24 worlds and 126 lessons, adds a dedicated project forge with five capstone-style projects, introduces optional onboarding, migrates storage to schema version 6, and splits the previous monolithic stylesheet into token, base, component, page, and legacy compatibility layers.

The release preserves existing v4 IDs and progress. Python still runs through Pyodide in a Web Worker, JavaScript still runs in an isolated worker, HTML/CSS still renders in a sandboxed iframe, and Java/C++ lessons remain honest structural validation tasks rather than fake browser compilation.

## Requirements

- Node.js 20.19 or newer
- npm with access to the public package registry or a compatible internal mirror
- A modern Chromium, Firefox, or Safari browser for local development

## Commands

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run format:check
npm run validate:content
npm run test
npm run build
npm run test:e2e
npm audit --omit=dev
```

For GitHub Pages under a repository subpath:

```bash
VITE_BASE_PATH=/nexus-code-v5/ npm run build
```

## Application areas

- Landing dashboard for new and returning learners
- Optional onboarding calibration at `#/onboarding`
- Track overview at `#/tracks`
- Curriculum Atlas at `#/atlas`
- Lesson workspace at `#/learn/:trackId/:lessonId`
- Project forge at `#/projects`
- Visual laboratory at `#/lab`
- Profile, export, import, preferences, and progress analytics at `#/profile`

## Runtime model

NEXUS CODE is static-hosting compatible. User progress, preferences, drafts, bookmarks, and project milestone state are stored locally. Python runtime assets may require a first network load depending on Pyodide cache state. Java and C++ source exercises validate structure and required patterns; learners must use a native JDK or C++ toolchain for real compilation outside the browser.

## Documentation

Detailed implementation notes are in `docs/ARCHITECTURE.md`, `docs/CURRICULUM.md`, `docs/CONTENT_AUTHORING.md`, `docs/DESIGN_SYSTEM.md`, `docs/SECURITY.md`, `docs/TESTING.md`, `docs/PERFORMANCE.md`, `docs/MIGRATION_V4_TO_V5.md`, `docs/GITHUB_PUBLISHING.md`, and `docs/VERIFICATION_V5.md`.
