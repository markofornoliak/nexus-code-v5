# Design System — NEXUS CODE v5

The visual direction is a precision code observatory: archive plates, field instruments, calibrated panels, restrained motion, readable typography, and semantic status states.

## CSS layers

`src/styles/global.css` imports reset, tokens, accessibility, component, page, legacy, and v5 override layers. This keeps old pages stable while allowing v5 surfaces to use clearer tokens.

## Tokens

Core tokens are defined in `src/styles/base/tokens.css`:

- semantic surfaces
- ink and muted text colors
- signal and warning states
- spacing and radius values
- focus rings
- panel shadows
- motion duration and easing
- readable layout widths

## Accessibility

`src/styles/base/accessibility.css` standardizes skip links, visible focus, touch target sizing, reduced motion, and high-contrast adjustments.

## v5 components

`src/styles/components/v5-instruments.css` introduces observatory panels, section labels, metric rails, pill controls, and plate-like card treatments. `src/styles/pages/onboarding.css` and `src/styles/pages/projects.css` implement v5-specific layouts.
