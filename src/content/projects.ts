import type { LearningProject } from "../types";

export const projects: LearningProject[] = [
  {
    id: "python-text-expedition",
    trackId: "python",
    title: "Python Text Expedition",
    subtitle: "A browser-safe command-line adventure core",
    difficulty: "capstone",
    estimatedMinutes: 95,
    language: "python",
    summary:
      "Build a deterministic text expedition with rooms, commands, inventory, acceptance checks, and JSON export without host-file assumptions.",
    outcomes: [
      "Model rooms and exits with dictionaries",
      "Parse command lines safely",
      "Write a review console for project acceptance criteria",
    ],
    architectureNotes: [
      "Keep map data, command parsing, and state updates in separate helpers.",
      "Use plain dictionaries and lists so the project runs inside Pyodide.",
      "Export progress as JSON text rather than writing to local files.",
    ],
    milestones: [
      {
        id: "python-expedition-model",
        title: "World model",
        objective: "Represent rooms, exits, item names, and the starting location.",
        acceptanceCriteria: [
          "At least three rooms are represented as data.",
          "Invalid exits leave the player in the current room.",
          "The model does not depend on random state or host files.",
        ],
        starterFiles: {
          "main.py": "rooms = {\n    'atrium': {'east': 'lab', 'item': None},\n    'lab': {'west': 'atrium', 'north': 'vault', 'item': 'coil'},\n    'vault': {'south': 'lab', 'item': 'prism'},\n}\nlocation = 'atrium'\n",
        },
      },
      {
        id: "python-expedition-commands",
        title: "Command parser",
        objective: "Parse move, take, inventory, and status commands deterministically.",
        acceptanceCriteria: [
          "Unknown commands return UNKNOWN.",
          "take collects only the current room item once.",
          "inventory prints sorted item names.",
        ],
        starterFiles: {
          "commands.py": "def parse(command):\n    return command.strip().lower().split()\n",
        },
      },
      {
        id: "python-expedition-review",
        title: "Acceptance review",
        objective: "Print PASS and FAIL lines from project checks.",
        acceptanceCriteria: [
          "Review output is stable across runs.",
          "Failures show requirement labels.",
          "All milestone checks are represented as booleans.",
        ],
        starterFiles: {
          "review.py": "checks = []\n# append (label, boolean) pairs and print the summary\n",
        },
      },
    ],
  },
  {
    id: "javascript-signal-dashboard",
    trackId: "javascript",
    title: "JavaScript Signal Dashboard",
    subtitle: "State, events, and deterministic async data",
    difficulty: "applied",
    estimatedMinutes: 80,
    language: "javascript",
    summary:
      "Create a worker-safe application model with state updates, event records, and mock async loaders before connecting the pattern to DOM previews.",
    outcomes: [
      "Separate state transitions from rendering summaries",
      "Process event queues in order",
      "Recover from deterministic async failures",
    ],
    architectureNotes: [
      "Do not access the main application DOM from learner JavaScript.",
      "Use pure functions for reducer-style state updates.",
      "Represent network data with local async mocks for reproducible tests.",
    ],
    milestones: [
      {
        id: "javascript-dashboard-state",
        title: "State reducer",
        objective: "Implement add, complete, and reset actions over serializable state.",
        acceptanceCriteria: [
          "Reducer returns new objects instead of mutating inputs.",
          "Unknown actions return the previous state.",
          "A render helper summarizes level and XP.",
        ],
        starterFiles: { "app.js": "function reducer(state, action) {\n  return state;\n}\n" },
      },
      {
        id: "javascript-dashboard-events",
        title: "Event queue",
        objective: "Dispatch queue records through handlers and summarize outcomes.",
        acceptanceCriteria: [
          "Events process in insertion order.",
          "Missing handlers produce a safe fallback.",
          "Handlers return text rather than printing hidden side effects.",
        ],
        starterFiles: { "events.js": "const handlers = {};\nconst queue = [];\n" },
      },
      {
        id: "javascript-dashboard-async",
        title: "Mock data loader",
        objective: "Load deterministic data with async helpers and recover from failures.",
        acceptanceCriteria: [
          "Success path awaits two local loaders.",
          "Failure path catches a rejected promise.",
          "No real network call is required for validation.",
        ],
        starterFiles: { "data.js": "async function loadSignals() { return []; }\n" },
      },
    ],
  },
  {
    id: "html-css-accessible-console",
    trackId: "html-css",
    title: "Accessible Responsive Console",
    subtitle: "Semantic HTML, tokenized CSS, and safe responsive behavior",
    difficulty: "applied",
    estimatedMinutes: 85,
    language: "html",
    summary:
      "Assemble a responsive console page with landmarks, form controls, container-aware panels, focus states, and reduced-motion CSS.",
    outcomes: [
      "Use semantic landmarks and labelled form controls",
      "Build responsive panels using tokens and container queries",
      "Protect keyboard and reduced-motion interactions",
    ],
    architectureNotes: [
      "Keep the preview inside the existing sandboxed iframe.",
      "Use CSS custom properties for semantic design decisions.",
      "Avoid hover-only controls and fixed widths that cause horizontal scrolling.",
    ],
    milestones: [
      {
        id: "html-console-structure",
        title: "Semantic shell",
        objective: "Create header, main, form, section, and aside landmarks with clear headings.",
        acceptanceCriteria: [
          "Every input has a visible label.",
          "Reading order matches the visual workflow.",
          "No placeholder acts as the only label.",
        ],
        starterFiles: { "index.html": "<main class=\"console\">\n  <h1>Signal console</h1>\n</main>\n" },
      },
      {
        id: "html-console-tokens",
        title: "Tokenized styling",
        objective: "Define surface, text, spacing, radius, and focus tokens.",
        acceptanceCriteria: [
          "Component CSS uses var(...) token references.",
          "Focus-visible state is explicit.",
          "Reduced-motion media query is present.",
        ],
        starterFiles: { "styles.css": ":root {\n  --surface: #fff;\n}\n" },
      },
      {
        id: "html-console-responsive",
        title: "Responsive composition",
        objective: "Use fluid shell width, grid enhancement, and container queries.",
        acceptanceCriteria: [
          "The default layout is usable at 320px.",
          "No fixed width causes horizontal page scroll.",
          "Wide layout improves hierarchy without changing reading order.",
        ],
        starterFiles: { "layout.css": ".page { width: min(100% - 2rem, 72rem); }\n" },
      },
    ],
  },
  {
    id: "java-inventory-console",
    trackId: "java",
    title: "Java Inventory Console Skeleton",
    subtitle: "Java 8 object boundaries for a small console system",
    difficulty: "capstone",
    estimatedMinutes: 100,
    language: "java",
    summary:
      "Design Java 8 source architecture for a testable inventory console using immutable models, service ports, generics, exceptions, and stream-shaped transformations.",
    outcomes: [
      "Separate model, service, formatter, and entry-point classes",
      "Use interfaces to keep formatting replaceable",
      "Document compiler-required work honestly outside the browser",
    ],
    architectureNotes: [
      "NEXUS validates source structure and does not pretend to compile Java.",
      "Use Java 8-compatible syntax only.",
      "Compile and run the final version in a local JDK 8+ environment.",
    ],
    milestones: [
      {
        id: "java-inventory-model",
        title: "Immutable model",
        objective: "Create Relic with private final fields, constructor validation, and getters.",
        acceptanceCriteria: [
          "Fields are private final.",
          "Constructor rejects invalid arguments.",
          "No mutating setters are present.",
        ],
        starterFiles: { "Relic.java": "public final class Relic {\n}\n" },
      },
      {
        id: "java-inventory-service",
        title: "Service layer",
        objective: "Create InventoryService with a typed collection and formatter dependency.",
        acceptanceCriteria: [
          "Formatter is an interface dependency.",
          "Collection fields use generics.",
          "Service methods do not rely on public mutable model fields.",
        ],
        starterFiles: { "InventoryService.java": "import java.util.*;\npublic class InventoryService {\n}\n" },
      },
      {
        id: "java-inventory-entry",
        title: "Console entry skeleton",
        objective: "Create Main that wires model, service, and formatter classes.",
        acceptanceCriteria: [
          "Main contains public static void main(String[] args).",
          "Object creation is visible and deterministic.",
          "No fake runtime output is claimed inside NEXUS.",
        ],
        starterFiles: { "Main.java": "public class Main {\n  public static void main(String[] args) {\n  }\n}\n" },
      },
    ],
  },
  {
    id: "cpp-ownership-graph",
    trackId: "cpp",
    title: "C++ Ownership Graph Skeleton",
    subtitle: "A native-project design focused on lifetime and ownership",
    difficulty: "capstone",
    estimatedMinutes: 105,
    language: "cpp",
    summary:
      "Design source structure for a graph-like C++ application with RAII, unique ownership, disabled copying, move-aware declarations, and const traversal contracts.",
    outcomes: [
      "Represent ownership with standard containers and smart pointers",
      "Prevent accidental copying of owning objects",
      "Document traversal APIs with const-correct signatures",
    ],
    architectureNotes: [
      "NEXUS performs structural validation only for C++ source tasks.",
      "Use a native C++17 compiler for full execution and sanitizer feedback.",
      "Avoid raw owning pointers in the project skeleton.",
    ],
    milestones: [
      {
        id: "cpp-graph-ownership",
        title: "Owned nodes",
        objective: "Store nodes as std::vector<std::unique_ptr<Node>>.",
        acceptanceCriteria: [
          "Ownership is visible in the member type.",
          "No raw owning Node* collection is used.",
          "Headers include memory and vector.",
        ],
        starterFiles: { "graph.hpp": "#include <memory>\n#include <vector>\nstruct Node {};\nclass Graph {};\n" },
      },
      {
        id: "cpp-graph-copy-move",
        title: "Copy and move boundaries",
        objective: "Delete copy operations and declare move operations deliberately.",
        acceptanceCriteria: [
          "Copy constructor is deleted.",
          "Copy assignment is deleted.",
          "Move constructor is declared noexcept when implemented.",
        ],
        starterFiles: { "graph.cpp": "class Graph {\npublic:\n};\n" },
      },
      {
        id: "cpp-graph-traversal",
        title: "Read-only traversal",
        objective: "Declare traversal helpers that accept const Graph& when they only inspect.",
        acceptanceCriteria: [
          "Read-only API uses const Graph&.",
          "Traversal does not mutate ownership containers.",
          "Native compilation is documented as the next verification step.",
        ],
        starterFiles: { "traversal.hpp": "class Graph;\nvoid visitAll(const Graph& graph);\n" },
      },
    ],
  },
];

export function getProject(projectId: string): LearningProject | undefined {
  return projects.find((project) => project.id === projectId);
}
