# Performance — NEXUS CODE v5

## Budgets

- Keep Pyodide outside the initial application bundle.
- Keep Three.js outside routes that do not need the visual laboratory.
- Preserve lazy page loading through React `lazy` and Suspense.
- Avoid unbounded activity, output, and draft growth.
- Keep CSS maintainable by splitting v5 tokens and page styles from the legacy layer.

## Implemented controls

- Route-level code splitting remains in `src/app/App.tsx`.
- CSS is split into base, component, page, legacy, and override layers.
- Content validation runs before production build to catch registry problems early.
- Project data is static TypeScript content and does not require runtime network calls.

## Measurement

Production bundle and gzip sizes are available after `npm run build`. Repository-subpath output should be verified with `VITE_BASE_PATH=/nexus-code-v5/ npm run build`.

## Remaining costs

Pyodide first-run loading remains the largest runtime cost when the browser cache is cold. CodeMirror language packages and Three.js are still significant chunks but remain appropriate for the product scope.
