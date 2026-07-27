import type { CurriculumWorldSpec } from "../_shared/defineLesson";
import { patternBonus, patternTask } from "../_shared/taskBuilders";

const task = (
  id: string,
  title: string,
  description: string,
  expectedBehavior: string,
  starterCode: string,
  pattern: string,
  hints: string[],
) =>
  patternTask(
    { id, title, description, expectedBehavior, starterCode, hints },
    pattern,
    "is",
  );

const bonus = (
  id: string,
  title: string,
  description: string,
  expectedBehavior: string,
  starterCode: string,
  pattern: string,
  hints: string[],
  discoveryText: string,
) =>
  patternBonus(
    { id, title, description, expectedBehavior, starterCode, hints },
    pattern,
    discoveryText,
    "is",
  );

export const htmlCssInterfaceWorld: CurriculumWorldSpec = {
  id: "html-css-interface-systems",
  title: "Interface Systems Foundry",
  subtitle: "Content hierarchy, adaptive dashboards, and humane motion",
  description:
    "Design interfaces as systems of information, layout rules, and interaction feedback instead of isolated decorative components.",
  landmark: "The Adaptive Canvas",
  accent: "cyan",
  lessons: [
    {
      id: "html-css-content-hierarchy",
      title: "Content Hierarchy",
      subtitle: "Let document structure carry meaning before visual styling",
      objectives: [
        "Organize a page with semantic landmarks",
        "Create a meaningful heading hierarchy",
        "Keep actions close to the content they affect",
      ],
      conceptHeading: "Visual hierarchy begins with document hierarchy",
      explanation: [
        "A strong interface communicates its structure even before CSS loads. Landmarks, headings, lists, and labelled controls provide a reliable reading order for people and assistive technology.",
        "Styling should reinforce that structure rather than inventing a second, contradictory hierarchy.",
      ],
      bullets: [
        "Use one clear h1 for the page purpose.",
        "Group related controls inside labelled sections.",
        "Prefer semantic elements over anonymous div containers.",
      ],
      syntax:
        '<main><header><h1>Mission control</h1></header><section aria-labelledby="status">…</section></main>',
      example: {
        title: "A readable dashboard skeleton",
        description: "Landmarks and headings define the information architecture.",
        code: '<main>\n  <header><h1>Mission control</h1></header>\n  <section aria-labelledby="status">\n    <h2 id="status">System status</h2>\n  </section>\n</main>',
      },
      fieldNote:
        "When structure is correct, responsive layout and visual styling can evolve without rewriting the meaning of the page.",
      mistakes: [
        "Choosing heading levels for size instead of hierarchy.",
        "Using clickable div elements without keyboard behavior.",
        "Separating labels from the controls they describe.",
      ],
      tasks: [
        task(
          "html-css-content-hierarchy-landmarks",
          "Build semantic landmarks",
          "Create a header, main, section, h1, and h2 for a mission dashboard.",
          "The source contains the required semantic hierarchy.",
          "<!-- Build a semantic mission dashboard -->\n",
          "<header[\\s\\S]*<main[\\s\\S]*<h1[\\s\\S]*<section[\\s\\S]*<h2",
          [
            "Use semantic elements directly.",
            "Place h1 before the section h2.",
            "Keep the section inside main.",
          ],
        ),
        task(
          "html-css-content-hierarchy-form",
          "Label a control explicitly",
          "Create a visible label connected to an input with matching for and id values.",
          "The source contains a connected label and input.",
          "<form>\n  <!-- Add a labelled callsign input -->\n</form>\n",
          "<label[^>]*for=[\"']callsign[\"'][^>]*>[\\s\\S]*<input[^>]*id=[\"']callsign[\"']",
          [
            'Use for="callsign" on the label.',
            'Use id="callsign" on the input.',
            "Keep visible label text.",
          ],
        ),
      ],
      bonusTask: bonus(
        "html-css-content-hierarchy-bonus",
        "Create an accessible status region",
        "Add a section labelled by a heading and a polite live status paragraph.",
        "The source contains aria-labelledby and aria-live=polite.",
        "<section>\n  <h2>Deployment</h2>\n  <p>Waiting</p>\n</section>\n",
        "<section[^>]*aria-labelledby=[\"'][^\"']+[\"'][^>]*>[\\s\\S]*<h2[^>]*id=[\"'][^\"']+[\"'][^>]*>[\\s\\S]*<p[^>]*aria-live=[\"']polite[\"']",
        [
          "Give the h2 an id.",
          "Reference that id from aria-labelledby.",
          'Use aria-live="polite" on the status paragraph.',
        ],
        "The Adaptive Canvas now communicates changing status without stealing focus.",
      ),
    },
    {
      id: "html-css-adaptive-dashboards",
      title: "Adaptive Dashboards",
      subtitle: "Compose fluid panels that respond to their container",
      objectives: [
        "Create fluid grid columns with minmax",
        "Use container queries for component-level adaptation",
        "Protect narrow layouts from horizontal overflow",
      ],
      conceptHeading: "Responsive systems react to available space, not device labels",
      explanation: [
        "A dashboard should remain readable from narrow phones to wide monitors. Fluid tracks and container queries let components adapt where they are actually placed.",
        "The base layout should work before enhancement; wider space can then reveal denser composition without changing reading order.",
      ],
      bullets: [
        "Use minmax() for flexible grid tracks.",
        "Declare container-type on reusable panel wrappers.",
        "Avoid fixed widths that force page-level scrolling.",
      ],
      syntax:
        ".dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); }",
      example: {
        title: "Fluid card grid",
        description: "Cards wrap based on available space.",
        code: ".grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));\n  gap: 1rem;\n}",
      },
      fieldNote:
        "Container queries are most useful when a component may appear in multiple page regions with different widths.",
      mistakes: [
        "Using a fixed card width on small screens.",
        "Adding breakpoints for specific device names.",
        "Changing visual order in a way that harms reading order.",
      ],
      tasks: [
        task(
          "html-css-adaptive-dashboards-grid",
          "Build a fluid grid",
          "Create a grid using repeat(auto-fit, minmax(...)) and a gap.",
          "The CSS contains a fluid auto-fit grid.",
          ".dashboard {\n  /* Create a fluid panel grid */\n}\n",
          "grid-template-columns\\s*:\\s*repeat\\(auto-fit\\s*,\\s*minmax\\([\\s\\S]*?\\)\\s*\\)[\\s\\S]*gap\\s*:",
          [
            "Set display: grid.",
            "Use repeat(auto-fit, minmax(...)).",
            "Add a gap value.",
          ],
        ),
        task(
          "html-css-adaptive-dashboards-container",
          "Add container adaptation",
          "Declare a named inline-size container and a container query.",
          "The CSS contains container-type and @container.",
          ".panel-shell {\n  /* Establish the container */\n}\n\n/* Adapt .panel when space is available */\n",
          "container-type\\s*:\\s*inline-size[\\s\\S]*@container(?:\\s+[\\w-]+)?\\s*\\(",
          [
            "Use container-type: inline-size.",
            "Add an @container rule below.",
            "Change a child layout inside the query.",
          ],
        ),
      ],
      bonusTask: bonus(
        "html-css-adaptive-dashboards-bonus",
        "Protect long content",
        "Add min-width: 0 and overflow-wrap to a grid child.",
        "The CSS protects the child from horizontal overflow.",
        ".metric-card {\n  /* Protect long labels */\n}\n",
        "min-width\\s*:\\s*0[\\s\\S]*overflow-wrap\\s*:\\s*(?:anywhere|break-word)",
        [
          "Grid children may need min-width: 0.",
          "Use overflow-wrap: anywhere or break-word.",
          "Keep the rule on the child component.",
        ],
        "The dashboard now survives narrow containers and unexpectedly long content.",
      ),
    },
    {
      id: "html-css-humane-motion",
      title: "Humane Motion and Feedback",
      subtitle: "Use movement to explain state without excluding users",
      objectives: [
        "Animate meaningful state changes",
        "Provide focus-visible interaction feedback",
        "Respect reduced-motion preferences",
      ],
      conceptHeading: "Motion should explain change, not compete for attention",
      explanation: [
        "Transitions can show continuity between states, reinforce hierarchy, and make direct manipulation feel responsive. They should remain brief, interruptible, and tied to a user or system event.",
        "A reduced-motion strategy must remove non-essential travel and looping effects while keeping state changes understandable.",
      ],
      bullets: [
        "Animate opacity and transform when possible.",
        "Always provide visible keyboard focus.",
        "Disable or simplify motion under prefers-reduced-motion.",
      ],
      syntax:
        "@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms; } }",
      example: {
        title: "A restrained interaction transition",
        description: "The control moves slightly and preserves focus feedback.",
        code: ".control { transition: transform 180ms ease, background-color 180ms ease; }\n.control:hover { transform: translateY(-2px); }\n.control:focus-visible { outline: 3px solid currentColor; }",
      },
      fieldNote:
        "Reduced motion is not a second-class theme; it is a supported interaction mode that must communicate the same state changes.",
      mistakes: [
        "Looping decorative animation indefinitely.",
        "Removing outlines without a replacement focus style.",
        "Using movement as the only indication of state.",
      ],
      tasks: [
        task(
          "html-css-humane-motion-focus",
          "Create visible keyboard focus",
          "Add a :focus-visible rule with an outline and outline-offset.",
          "The CSS contains explicit focus-visible styling.",
          ".action {\n  border: 0;\n}\n\n/* Add keyboard focus */\n",
          ":focus-visible\\s*\\{[\\s\\S]*outline\\s*:[\\s\\S]*outline-offset\\s*:",
          [
            "Target .action:focus-visible.",
            "Use a visible outline.",
            "Add a positive outline-offset.",
          ],
        ),
        task(
          "html-css-humane-motion-reduced",
          "Respect reduced motion",
          "Add a prefers-reduced-motion media query that removes animation and transition duration.",
          "The CSS contains a reduced-motion strategy.",
          ".card {\n  transition: transform 220ms ease;\n}\n\n/* Add the accessibility override */\n",
          "@media\\s*\\(prefers-reduced-motion\\s*:\\s*reduce\\)[\\s\\S]*(?:animation-duration|animation)\\s*:[\\s\\S]*transition-duration\\s*:",
          [
            "Use @media (prefers-reduced-motion: reduce).",
            "Set animation-duration to a near-zero value or animation: none.",
            "Also neutralize transition duration.",
          ],
        ),
      ],
      bonusTask: bonus(
        "html-css-humane-motion-bonus",
        "Animate state, not decoration",
        "Create an .is-open state that changes opacity and transform with a transition.",
        "The CSS links transition properties to an explicit state class.",
        ".panel {\n  opacity: 0;\n  transform: translateY(8px);\n}\n\n/* Add transition and open state */\n",
        "\\.panel\\s*\\{[\\s\\S]*transition\\s*:[\\s\\S]*\\.panel\\.is-open\\s*\\{[\\s\\S]*opacity\\s*:\\s*1[\\s\\S]*transform\\s*:\\s*(?:none|translateY\\(0\\))",
        [
          "Add transition to .panel.",
          "Use .panel.is-open for the final state.",
          "Set opacity to 1 and remove the translation.",
        ],
        "The foundry now uses motion as an explanation of state, with an accessible fallback.",
      ),
    },
  ],
};
