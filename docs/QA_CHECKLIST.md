# QA Checklist — NEXUS CODE v5

## Core routes

Verify `#/`, `#/onboarding`, `#/tracks`, `#/tracks/python`, `#/atlas`, `#/lab`, `#/projects`, `#/profile`, and representative lesson routes for Python, JavaScript, HTML/CSS, Java, and C++.

## Responsive viewports

Check 320x568, 375x812, 430x932, 768x1024, 1024x768, 1280x800, 1440x900, and 1920x1080. Confirm no horizontal page scroll, clipped controls, unreadable labels, or hover-only critical actions.

## Runtime flows

Run one Python task, one JavaScript task, one HTML/CSS preview, one Java structural task, and one C++ structural task. Confirm output, validation, hints, reset, saved drafts, and failure feedback.

## Progress flows

Complete a task, complete a bonus, bookmark a lesson, finish a project milestone, change weekly goal, export progress, import progress, reload the app, and verify persistence.

## Accessibility

Check semantic landmarks, heading order, labels, focus states, skip navigation, keyboard navigation, touch targets, reduced motion, high-contrast readability, and screen-reader friendly status text.

## Deployment

Build with the default base path and with `VITE_BASE_PATH=/nexus-code-v5/`. Verify static assets, worker references, manifest, `.nojekyll`, hash navigation, and direct refresh behavior.
