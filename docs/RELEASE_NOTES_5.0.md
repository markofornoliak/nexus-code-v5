# Release Notes — NEXUS CODE v5.0

NEXUS CODE v5 evolves the v4 spatial code archive into a deeper local-first learning observatory.

## Major additions

- Optional onboarding route with experience level, goal, preferred track, weekly target, visual mode, and reduced-motion preferences.
- Project forge route with five multi-milestone projects and local completion state.
- Storage schema version 6 with non-destructive migration from version 5.
- 36 new lessons across Python, JavaScript, HTML/CSS, Java, and C++.
- 6 new worlds, bringing the platform to 24 worlds and 126 lessons.
- Content validation script integrated into the build command.
- Static e2e smoke script for route and GitHub Pages readiness checks.
- Split CSS architecture with v5 tokens, accessibility styles, component styles, page styles, and legacy compatibility.

## Preserved behavior

All v4 track IDs, world IDs, lesson IDs, task IDs, bonus IDs, achievements, themes, saved drafts, bookmarks, and profile export/import behavior remain compatible.

## Honest runtime boundaries

Python and JavaScript remain executable in isolated browser workers. HTML/CSS preview remains sandboxed. Java and C++ validation remains structural and does not claim compilation.
