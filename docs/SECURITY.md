# Security — NEXUS CODE v5

NEXUS CODE runs learner code in the browser and therefore uses isolation, limits, and honest documentation rather than claiming perfect containment.

## Execution isolation

Python runs inside a Pyodide Web Worker. JavaScript runs inside a dedicated Web Worker. HTML/CSS previews render in a sandboxed iframe. Java and C++ tasks use structural validation and do not execute native code in the browser.

## Sandboxed preview

The HTML/CSS preview keeps restrictive iframe sandboxing. The application must not grant unnecessary permissions or render preview output directly into the main React tree.

## Imported data

Progress import must be parsed through schema validation. Malformed or partial data must not reset unrelated progress. Size limits should be kept small enough for localStorage reliability.

## Output handling

Runtime output is rendered as text. Untrusted learner output must not be inserted through unsafe HTML. Long output is bounded by runtime services where supported.

## Worker messages

Worker message handlers should validate message shape and status before updating UI state. Worker crashes and timeouts should leave the UI recoverable.

## Residual limitations

Browser isolation reduces risk but does not make arbitrary user code perfectly safe. Pyodide assets may be loaded from runtime distribution URLs depending on browser cache and deployment setup. Java and C++ code should be compiled in local native toolchains for full security and compiler diagnostics.
