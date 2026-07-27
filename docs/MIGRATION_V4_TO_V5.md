# Migration — v4 to v5

v5 introduces storage schema version 6. The migration is intentionally small and non-destructive.

## Added fields

- `projectProgress`: local completion state for project milestones.
- `preferences.onboardingCompleted`
- `preferences.experienceLevel`
- `preferences.primaryGoal`
- `preferences.preferredTrackId`

## Preserved fields

The migration preserves existing completed tasks, completed lessons, completed bonus tasks, XP, level, achievements, streak history, activity, bookmarks, preferences, saved drafts, and profile information.

## Failure handling

`src/services/storage/schema.ts` parses stored values defensively. Missing fields receive defaults. Malformed nested records are skipped rather than resetting the whole profile. Import/export compatibility remains source-compatible with the stored application state envelope.

## Tests

`src/services/storage/storage.test.ts` covers schema version defaults. `src/features/progress/progressReducer.test.ts` covers onboarding and idempotent project milestone XP.
