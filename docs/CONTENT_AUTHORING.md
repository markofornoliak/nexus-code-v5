# Content Authoring — NEXUS CODE v5

Authoring remains data-first. New content should be added as deterministic TypeScript definitions under `src/content` and then registered through the relevant track index.

## ID rules

- Never rename existing v4 IDs.
- New track, world, lesson, task, bonus, project, and milestone IDs must be stable and unique.
- Use lowercase kebab-case.
- Prefix project milestones with the project or track domain to avoid collisions.

## Lesson expectations

A complete lesson should usually contain motivation, objectives, explanation, an example, two required tasks, one bonus challenge, progressive hints, common mistakes, edge cases where relevant, validation feedback, and a summary.

## Validation types

Existing runtime-backed tasks use output comparison and starter code. Static-language tracks use source-structure and pattern validation. New Java and C++ lessons should remain explicit that NEXUS checks source structure, not compilation.

## Content validation

Run:

```bash
npm run validate:content
```

The script checks duplicate IDs, required v5 worlds, validation metadata, hints, bonus coverage, and documentation placeholder markers.

## Project authoring

Projects are defined as `LearningProject` objects in `src/content/projects.ts`. Each project must include:

- `id`
- `trackId`
- `title`
- `difficulty`
- `estimatedMinutes`
- `language`
- `summary`
- `outcomes`
- `architectureNotes`
- `milestones`

Each milestone must include acceptance criteria and may include starter files.
