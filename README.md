# NEXUS CODE v5.1

[![NEXUS quality gate](https://github.com/markofornoliak/nexus-code-v5/actions/workflows/ci.yml/badge.svg)](https://github.com/markofornoliak/nexus-code-v5/actions/workflows/ci.yml)

NEXUS CODE v5.1 is a browser-native, local-first programming education platform built as a living code observatory. It turns five programming languages into connected constellations of tracks, worlds, lessons, projects, a searchable Atlas, a visual laboratory, runtime-backed practice, and exportable progress without a required backend.

## What changed in v5.1

v5.1 expands the curriculum to 29 worlds and 141 lessons, grows the project forge to eight milestone-based systems, and introduces a substantially stronger interface layer for the landing page, track network, project dossiers, responsive states, and mastery presentation. Existing v4/v5 IDs and local progress remain compatible.

The release preserves all previously published IDs and progress. Python still runs through Pyodide in a Web Worker, JavaScript still runs in an isolated worker, HTML/CSS still renders in a sandboxed iframe, and Java/C++ lessons remain honest structural validation tasks rather than fake browser compilation.

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

- Landing observatory for new and returning learners
- Optional onboarding calibration at `#/onboarding`
- Track constellation overview at `#/tracks`
- Curriculum Atlas at `#/atlas`
- Lesson workspace at `#/learn/:trackId/:lessonId`
- Project forge at `#/projects`
- Visual laboratory at `#/lab`
- Profile, export, import, preferences, and progress analytics at `#/profile`

## Runtime model

NEXUS CODE is static-hosting compatible. User progress, preferences, drafts, bookmarks, and project milestone state are stored locally. Python runtime assets may require a first network load depending on Pyodide cache state. Java and C++ source exercises validate structure and required patterns; learners must use a native JDK or C++ toolchain for real compilation outside the browser.

## Deployment

The permanent GitHub Actions workflows validate every release and build the application for `/nexus-code-v5/`. GitHub Pages publishes to `https://markofornoliak.github.io/nexus-code-v5/`, followed by a live HTML, JavaScript, and CSS smoke check.

See `docs/GITHUB_PUBLISHING.md` for deployment and troubleshooting procedures.

## Documentation

Detailed implementation notes are in `docs/ARCHITECTURE.md`, `docs/CURRICULUM.md`, `docs/CONTENT_AUTHORING.md`, `docs/DESIGN_SYSTEM.md`, `docs/SECURITY.md`, `docs/TESTING.md`, `docs/PERFORMANCE.md`, `docs/MIGRATION_V4_TO_V5.md`, `docs/GITHUB_PUBLISHING.md`, and `docs/VERIFICATION_V5.md`.
