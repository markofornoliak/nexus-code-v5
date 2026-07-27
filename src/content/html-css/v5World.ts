import type { BonusTask, Task } from "../../types";
import type { CurriculumLessonSpec, CurriculumWorldSpec } from "../_shared/defineLesson";
import { patternBonus, patternTask } from "../_shared/taskBuilders";


interface V5Task {
  id: string;
  title: string;
  description: string;
  expectedBehavior: string;
  starterCode: string;
  expected: string;
  hints: [string, string, string];
  defaultInput?: string;
}

interface V5Lesson {
  id: string;
  title: string;
  subtitle: string;
  objectives: [string, string, string];
  conceptHeading: string;
  explanation: [string, string];
  bullets: [string, string, string];
  syntax: string;
  example: CurriculumLessonSpec["example"];
  fieldNote: string;
  mistakes: [string, string, string];
  tasks: [V5Task, V5Task];
  bonus: V5Task & { discoveryText: string };
}

function task(spec: V5Task): Task {

  return patternTask(
    {
      id: spec.id,
      title: spec.title,
      description: spec.description,
      expectedBehavior: spec.expectedBehavior,
      starterCode: spec.starterCode,
      hints: spec.hints,
      ...(spec.defaultInput ? { defaultInput: spec.defaultInput } : {}),
    },
    spec.expected,
    "ims",
  );
}

function bonus(spec: V5Task & { discoveryText: string }): BonusTask {
  return patternBonus(
    {
      id: spec.id,
      title: spec.title,
      description: spec.description,
      expectedBehavior: spec.expectedBehavior,
      starterCode: spec.starterCode,
      hints: spec.hints,
      ...(spec.defaultInput ? { defaultInput: spec.defaultInput } : {}),
    },
    spec.expected,
    spec.discoveryText,
    "ims",
  );
}

function lesson(spec: V5Lesson): CurriculumLessonSpec {
  return {
    id: spec.id,
    title: spec.title,
    subtitle: spec.subtitle,
    objectives: spec.objectives,
    conceptHeading: spec.conceptHeading,
    explanation: spec.explanation,
    bullets: spec.bullets,
    syntax: spec.syntax,
    example: spec.example,
    fieldNote: spec.fieldNote,
    mistakes: spec.mistakes,
    tasks: [task(spec.tasks[0]), task(spec.tasks[1])],
    bonusTask: bonus(spec.bonus),
    durationMinutes: 28,
  };
}

export const htmlCssV5World: CurriculumWorldSpec = {
  id: "adaptive-interface-studio",
  title: "Adaptive Interface Studio",
  subtitle: "Accessible, tokenized, and performance-aware UI construction",
  description: "Forms, container queries, design tokens, focus states, responsive assembly, and CSS performance hygiene turn markup skills into robust product surfaces.",
  landmark: "The Responsive Lens Studio",
  accent: "cyan",
  lessons: [
    lesson({
      id: "html-css-accessible-forms-v5",
      title: "Accessible Form Contracts",
      subtitle: "Labels, instructions, and error messages",
      objectives: ["Associate labels with controls", "Expose instructions before input", "Write error text that is not color-only"],
      conceptHeading: "A form is usable when every control has a clear accessible name",
      explanation: ["Labels and instructions make form controls understandable to keyboard, touch, and screen-reader users. A visual placeholder is not a durable label.", "Error messages should describe what to fix and remain connected to the field they explain."],
      bullets: ["Use label text for every input.", "Use aria-describedby for helper and error text.", "Do not rely on color alone for status."],
      syntax: "<label for=\"email\">Email</label>\n<input id=\"email\" aria-describedby=\"email-help\">",
      example: {
        title: "A labeled field",
        description: "The input has a visible label and helper text.",
        code: "<label for=\"signal\">Signal name</label>\n<input id=\"signal\" aria-describedby=\"signal-help\">\n<p id=\"signal-help\">Use 3 to 20 characters.</p>",
        output: "",
      },
      fieldNote: "Accessible markup is product infrastructure: it decides who can complete the task.",
      mistakes: ["Using only placeholder text as the label.", "Showing an error icon without text.", "Removing focus outlines for aesthetics."],
      tasks: [
        { id: "html-css-accessible-forms-v5-label", title: "Add a label contract", description: "Create a labeled email field with helper text.", expectedBehavior: "Source contains a label, matching input id, and aria-describedby.", starterCode: "<form>\n  <!-- Add an accessible email field -->\n</form>", expected: "<label[^>]+for=\"email\"[\\s\\S]*<input[^>]+id=\"email\"[\\s\\S]*aria-describedby=\"email-help\"", hints: ["The label for value must match the input id.", "The helper paragraph id can be email-help.", "The input should reference the helper with aria-describedby."] },
        { id: "html-css-accessible-forms-v5-error", title: "Expose an error message", description: "Add an invalid username input connected to an error paragraph.", expectedBehavior: "Source contains aria-invalid and an error description.", starterCode: "<form>\n  <label for=\"username\">Username</label>\n  <!-- Add input and error text -->\n</form>", expected: "aria-invalid=\"true\"[\\s\\S]*aria-describedby=\"username-error\"[\\s\\S]*id=\"username-error\"", hints: ["Set aria-invalid=\"true\" on the input.", "Connect the error with aria-describedby.", "Write text that explains the problem."] },
      ],
      bonus: { id: "html-css-accessible-forms-v5-bonus", title: "Fieldset grouping", description: "Group two radio buttons under one legend.", expectedBehavior: "Source contains fieldset, legend, and two radio inputs.", starterCode: "<form>\n  <!-- Build the grouped choice -->\n</form>", expected: "<fieldset[\\s\\S]*<legend[\\s\\S]*type=\"radio\"[\\s\\S]*type=\"radio\"", hints: ["Use fieldset for the group.", "Use legend for the group question.", "Each radio still needs a label."], discoveryText: "The responsive field now accepts forms that work beyond visual inspection." },
    }),
    lesson({
      id: "html-css-container-queries-v5",
      title: "Container Query Panels",
      subtitle: "Adapt components to their own space",
      objectives: ["Declare a query container", "Write @container rules", "Use component width instead of viewport assumptions"],
      conceptHeading: "A container query lets a component respond to its own available size",
      explanation: ["Viewport media queries describe the page. Container queries describe a component in context, which is useful for reusable cards and panels that may appear in different layouts.", "A component must opt in with container-type before @container rules can query it."],
      bullets: ["Set container-type: inline-size on the component wrapper.", "Use @container (min-width: ...).", "Keep the default style useful on narrow containers."],
      syntax: ".panel { container-type: inline-size; }\n@container (min-width: 32rem) { ... }",
      example: {
        title: "Responsive local panel",
        description: "The card changes layout when its own container is wide enough.",
        code: "<article class=\"panel\"><h2>Prism</h2><p>Ready</p></article>\n<style>\n.panel { container-type: inline-size; }\n@container (min-width: 30rem) { .panel { display: grid; grid-template-columns: 1fr auto; } }\n</style>",
        output: "",
      },
      fieldNote: "Container queries help design systems avoid one-size-fits-all card grids.",
      mistakes: ["Writing @container before declaring a container.", "Using container queries to hide essential content.", "Forgetting a readable default before the query applies."],
      tasks: [
        { id: "html-css-container-queries-v5-container", title: "Declare a component container", description: "Create a .module rule that opts into inline-size container queries.", expectedBehavior: "CSS contains container-type: inline-size.", starterCode: "<article class=\"module\">\n  <h2>Module</h2>\n</article>\n<style>\n.module {\n  /* opt in */\n}\n</style>", expected: "\\.module\\s*\\{[\\s\\S]*container-type\\s*:\\s*inline-size", hints: ["The property goes on .module.", "Use inline-size for width-like queries.", "Keep the declaration inside the style block."] },
        { id: "html-css-container-queries-v5-rule", title: "Add a wide container rule", description: "At 36rem, make .module use grid.", expectedBehavior: "CSS contains @container min-width and .module grid.", starterCode: "<article class=\"module\">\n  <h2>Module</h2><p>Ready</p>\n</article>\n<style>\n.module { container-type: inline-size; }\n/* Add the query */\n</style>", expected: "@container\\s*\\(\\s*min-width\\s*:\\s*36rem\\s*\\)[\\s\\S]*\\.module\\s*\\{[\\s\\S]*display\\s*:\\s*grid", hints: ["Use @container (min-width: 36rem).", "Inside the query, target .module.", "Set display: grid."] },
      ],
      bonus: { id: "html-css-container-queries-v5-bonus", title: "Component density shift", description: "Make .metric switch to two columns when its container is wide.", expectedBehavior: "CSS contains container query and grid-template-columns.", starterCode: "<section class=\"metric\"><strong>42</strong><span>Signal</span></section>\n<style>\n.metric { container-type: inline-size; }\n</style>", expected: "@container[\\s\\S]*\\.metric[\\s\\S]*grid-template-columns\\s*:\\s*[^;]+", hints: ["Add an @container rule.", "Set .metric to display: grid inside it.", "Declare grid-template-columns for the wide state."], discoveryText: "Component layout can now react to real local space, not only the viewport." },
    }),
    lesson({
      id: "html-css-design-tokens-v5",
      title: "Design Tokens",
      subtitle: "Use reusable values for color, spacing, and rhythm",
      objectives: ["Define custom properties", "Use tokens in component styles", "Separate semantic meaning from raw values"],
      conceptHeading: "A design token gives a reusable name to a design decision",
      explanation: ["Custom properties can store semantic values such as --space-panel or --color-surface. Components then use named decisions instead of scattering raw values.", "Tokens improve maintainability when their names describe purpose rather than a one-off appearance."],
      bullets: ["Declare global tokens in :root.", "Use var(--token-name) in components.", "Prefer semantic names over decorative names."],
      syntax: ":root { --space-panel: 1rem; }\n.card { padding: var(--space-panel); }",
      example: {
        title: "Tokenized card",
        description: "Spacing and color come from named values.",
        code: "<style>\n:root { --surface: #ffffff; --space-card: 1rem; }\n.card { background: var(--surface); padding: var(--space-card); }\n</style>",
        output: "",
      },
      fieldNote: "Tokens are not about fashion; they are an operational map of the interface.",
      mistakes: ["Creating tokens for values used once.", "Naming tokens by color appearance instead of role.", "Overriding tokens unpredictably deep in the cascade."],
      tasks: [
        { id: "html-css-design-tokens-v5-root", title: "Define two tokens", description: "Define --surface and --space-card in :root.", expectedBehavior: "CSS contains both custom properties.", starterCode: "<style>\n:root {\n  /* tokens */\n}\n</style>", expected: ":root\\s*\\{[\\s\\S]*--surface\\s*:[\\s\\S]*--space-card\\s*:", hints: ["Custom properties start with --.", "Put them inside :root.", "Give each one a value."] },
        { id: "html-css-design-tokens-v5-use", title: "Use card tokens", description: "Use --surface for background and --space-card for padding.", expectedBehavior: "CSS uses var(--surface) and var(--space-card).", starterCode: "<article class=\"card\">Signal</article>\n<style>\n:root { --surface: white; --space-card: 1rem; }\n.card {\n  /* use tokens */\n}\n</style>", expected: "background\\s*:\\s*var\\(--surface\\)[\\s\\S]*padding\\s*:\\s*var\\(--space-card\\)", hints: ["Use var(--surface).", "Use var(--space-card).", "The declarations belong in .card."] },
      ],
      bonus: { id: "html-css-design-tokens-v5-bonus", title: "State token", description: "Define --state-success and use it for a success badge border.", expectedBehavior: "CSS defines and uses --state-success.", starterCode: "<span class=\"badge\">Ready</span>\n<style>\n:root { }\n.badge { }\n</style>", expected: "--state-success\\s*:[\\s\\S]*border[^;]*var\\(--state-success\\)", hints: ["Add the token to :root.", "Set a border on .badge.", "Use var(--state-success) in the border value."], discoveryText: "The design system now has reusable semantic decisions." },
    }),
    lesson({
      id: "html-css-focus-motion-v5",
      title: "Focus and Motion Safety",
      subtitle: "Respect keyboards and reduced-motion preferences",
      objectives: ["Create visible focus states", "Use prefers-reduced-motion", "Avoid hover-only interaction"],
      conceptHeading: "Interaction states must work without a mouse and without forced motion",
      explanation: ["A polished interface is not complete if keyboard focus is invisible or essential information appears only on hover. Motion must also respect user preference and avoid blocking comprehension.", "CSS can provide focus-visible styles and reduce animation when the user requests less motion."],
      bullets: ["Use :focus-visible for keyboard focus.", "Use @media (prefers-reduced-motion: reduce).", "Keep hover enhancements optional."],
      syntax: ".button:focus-visible { outline: 2px solid currentColor; }",
      example: {
        title: "Reduced-motion transition",
        description: "The media query disables animation for motion-sensitive users.",
        code: "<style>\n.card { transition: transform 200ms ease; }\n@media (prefers-reduced-motion: reduce) { .card { transition: none; } }\n</style>",
        output: "",
      },
      fieldNote: "Focus and motion rules are not accessibility polish; they are core interaction behavior.",
      mistakes: ["Removing outline without a replacement.", "Hiding controls until hover.", "Using large motion for routine feedback."],
      tasks: [
        { id: "html-css-focus-motion-v5-focus", title: "Add a focus-visible ring", description: "Style .button:focus-visible with an outline.", expectedBehavior: "CSS contains .button:focus-visible and outline.", starterCode: "<button class=\"button\">Run</button>\n<style>\n/* Add keyboard focus style */\n</style>", expected: "\\.button:focus-visible\\s*\\{[\\s\\S]*outline\\s*:", hints: ["Target .button:focus-visible.", "Set an outline value.", "Do not remove focus styling."] },
        { id: "html-css-focus-motion-v5-reduce", title: "Respect reduced motion", description: "Disable .panel transition inside prefers-reduced-motion.", expectedBehavior: "CSS contains media query and transition: none.", starterCode: "<section class=\"panel\">Ready</section>\n<style>\n.panel { transition: transform 200ms ease; }\n/* Add reduced-motion override */\n</style>", expected: "@media\\s*\\(\\s*prefers-reduced-motion\\s*:\\s*reduce\\s*\\)[\\s\\S]*transition\\s*:\\s*none", hints: ["Use @media (prefers-reduced-motion: reduce).", "Inside it, target .panel.", "Set transition: none."] },
      ],
      bonus: { id: "html-css-focus-motion-v5-bonus", title: "Hover plus focus parity", description: "Apply the same transform to .card:hover and .card:focus-visible.", expectedBehavior: "CSS includes hover and focus-visible states.", starterCode: "<a class=\"card\" href=\"#\">Open</a>\n<style>\n.card { display: inline-block; }\n</style>", expected: "\\.card:hover[\\s\\S]*transform[\\s\\S]*\\.card:focus-visible[\\s\\S]*transform", hints: ["Write two selectors or a combined selector.", "Include :focus-visible, not only :hover.", "Use a modest transform."], discoveryText: "The interface now protects keyboard and motion preferences as first-class states." },
    }),
    lesson({
      id: "html-css-responsive-page-v5",
      title: "Responsive Page Assembly",
      subtitle: "Compose semantic sections into a real layout",
      objectives: ["Build landmark-based page structure", "Use grid and flexible spacing", "Keep content readable on narrow screens"],
      conceptHeading: "A responsive page is a hierarchy of content, not a collection of breakpoints",
      explanation: ["Good responsive layouts begin with semantic structure and readable defaults. Wider layouts can enhance the hierarchy with grid columns and richer spacing.", "The browser should never need horizontal page scrolling for ordinary text content."],
      bullets: ["Start with header, main, and section landmarks.", "Use max-width and fluid spacing.", "Add wide-layout grid only after the narrow layout works."],
      syntax: "main { width: min(100% - 2rem, 72rem); margin-inline: auto; }",
      example: {
        title: "Fluid page shell",
        description: "The width expression keeps side gutters on small screens.",
        code: "<style>\n.page { width: min(100% - 2rem, 72rem); margin-inline: auto; }\n.grid { display: grid; gap: 1rem; }\n@media (min-width: 48rem) { .grid { grid-template-columns: 2fr 1fr; } }\n</style>",
        output: "",
      },
      fieldNote: "Responsive work is finished only after narrow, zoomed, touch, and keyboard flows remain usable.",
      mistakes: ["Designing desktop first and squeezing content later.", "Using fixed widths that cause horizontal scrolling.", "Changing visual order in a way that harms reading order."],
      tasks: [
        { id: "html-css-responsive-page-v5-shell", title: "Create a fluid shell", description: "Write .page width with min() and auto inline margins.", expectedBehavior: "CSS contains width: min(...) and margin-inline: auto.", starterCode: "<main class=\"page\">\n  <h1>Archive</h1>\n</main>\n<style>\n.page {\n}\n</style>", expected: "width\\s*:\\s*min\\([^)]+\\)[\\s\\S]*margin-inline\\s*:\\s*auto", hints: ["Use width: min(100% - 2rem, 72rem).", "Use margin-inline: auto.", "Put both declarations inside .page."] },
        { id: "html-css-responsive-page-v5-grid", title: "Enhance at tablet width", description: "At 48rem, make .layout two columns.", expectedBehavior: "CSS contains media query and grid-template-columns.", starterCode: "<main class=\"layout\"><section>Main</section><aside>Side</aside></main>\n<style>\n.layout { display: grid; gap: 1rem; }\n</style>", expected: "@media\\s*\\(\\s*min-width\\s*:\\s*48rem\\s*\\)[\\s\\S]*\\.layout[\\s\\S]*grid-template-columns", hints: ["Use @media (min-width: 48rem).", "Target .layout inside the query.", "Set grid-template-columns to two tracks."] },
      ],
      bonus: { id: "html-css-responsive-page-v5-bonus", title: "Complete responsive card grid", description: "Create cards that start in one column and become auto-fit grid cards.", expectedBehavior: "CSS contains repeat(auto-fit, minmax(...)).", starterCode: "<section class=\"cards\"><article>One</article><article>Two</article></section>\n<style>\n.cards { display: grid; gap: 1rem; }\n</style>", expected: "repeat\\(\\s*auto-fit\\s*,\\s*minmax\\(", hints: ["Use grid-template-columns.", "repeat(auto-fit, minmax(16rem, 1fr)) is a useful pattern.", "Keep gap for both narrow and wide layouts."], discoveryText: "The web track now ends with a complete responsive page assembly pattern." },
    }),
    lesson({
      id: "html-css-performance-v5",
      title: "CSS Performance Hygiene",
      subtitle: "Keep styling predictable and cheap to render",
      objectives: ["Avoid uncontrolled expensive selectors", "Limit layout shifts", "Use containment where appropriate"],
      conceptHeading: "CSS performance is mostly about predictable scope and stable layout",
      explanation: ["Most CSS does not need micro-optimization. The high-value work is avoiding uncontrolled global selectors, reducing layout shifts, and keeping complex effects out of critical surfaces.", "Properties such as content-visibility and contain can help when used deliberately on isolated sections."],
      bullets: ["Prefer class selectors for components.", "Reserve heavy effects for meaningful states.", "Use containment only when the box is truly independent."],
      syntax: ".panel { content-visibility: auto; contain-intrinsic-size: 20rem; }",
      example: {
        title: "Lazy-render a long section",
        description: "The browser may skip rendering off-screen content until needed.",
        code: "<style>\n.long-section { content-visibility: auto; contain-intrinsic-size: 30rem; }\n</style>",
        output: "",
      },
      fieldNote: "Performance CSS should never make content inaccessible or invisible to assistive technology.",
      mistakes: ["Applying content-visibility to interactive content without testing.", "Using universal selectors for component internals.", "Animating layout properties for decorative effects."],
      tasks: [
        { id: "html-css-performance-v5-content-visibility", title: "Add section visibility hint", description: "Add content-visibility and contain-intrinsic-size to .archive-section.", expectedBehavior: "CSS contains both properties.", starterCode: "<section class=\"archive-section\">Large content</section>\n<style>\n.archive-section {\n}\n</style>", expected: "content-visibility\\s*:\\s*auto[\\s\\S]*contain-intrinsic-size\\s*:", hints: ["The value is content-visibility: auto.", "Add contain-intrinsic-size to reserve space.", "Use a realistic length for the intrinsic size."] },
        { id: "html-css-performance-v5-stable-image", title: "Reserve media space", description: "Style img to preserve aspect ratio and avoid overflow.", expectedBehavior: "CSS contains max-width and aspect-ratio.", starterCode: "<img class=\"preview\" src=\"preview.png\" alt=\"Preview\">\n<style>\n.preview {\n}\n</style>", expected: "max-width\\s*:\\s*100%[\\s\\S]*aspect-ratio\\s*:", hints: ["Set max-width: 100%.", "Add height: auto if useful.", "Set an aspect-ratio value to reserve layout space."] },
      ],
      bonus: { id: "html-css-performance-v5-bonus", title: "Scoped component selector", description: "Style only .module-card > h2 and avoid global h2 styling.", expectedBehavior: "CSS contains .module-card > h2 and does not need a global h2 rule.", starterCode: "<article class=\"module-card\"><h2>Signal</h2></article>\n<style>\n</style>", expected: "\\.module-card\\s*>\\s*h2\\s*\\{", hints: ["Use the component class first.", "Use the child combinator > for the heading.", "Do not style every h2 on the page."], discoveryText: "The web archive now treats CSS cost as part of design quality." },
    })
  ],
};
