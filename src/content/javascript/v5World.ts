import type { BonusTask, Task } from "../../types";
import type { CurriculumLessonSpec, CurriculumWorldSpec } from "../_shared/defineLesson";
import { outputBonus, outputTask } from "../_shared/taskBuilders";


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

  return outputTask(
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
  );
}

function bonus(spec: V5Task & { discoveryText: string }): BonusTask {
  return outputBonus(
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

export const javascriptV5World: CurriculumWorldSpec = {
  id: "browser-application-forge",
  title: "Browser Application Forge",
  subtitle: "From isolated logic to maintainable interactive applications",
  description: "Modules, DOM models, event queues, mock fetch flows, performance budgets, and state architecture prepare learners for real browser applications without unsafe main-window execution.",
  landmark: "The Safe Interaction Dock",
  accent: "amber",
  lessons: [
    lesson({
      id: "javascript-modules",
      title: "Module Boundaries",
      subtitle: "Export and import focused behavior",
      objectives: ["Explain why modules isolate names", "Use named exports in examples", "Design small public surfaces"],
      conceptHeading: "A module exposes only the names another file should use",
      explanation: ["Modern JavaScript applications are built from modules. A module keeps internal helpers private and exports the values that form its public contract.", "In the browser worker lessons we practice module thinking through code structure and deterministic output rather than directly creating multiple physical files."],
      bullets: ["Export only stable helpers.", "Name imported values by what they do.", "Avoid hidden global dependencies."],
      syntax: "export function formatSignal(value) { return `NX-${value}`; }",
      example: {
        title: "One explicit helper",
        description: "The exported helper is the public surface of the module.",
        code: "function formatSignal(value) {\n  return `NX-${value}`;\n}\nconsole.log(formatSignal(42));",
        output: "NX-42",
      },
      fieldNote: "A module boundary is an architecture decision, not a file-size decoration.",
      mistakes: ["Exporting every helper by habit.", "Depending on global variables inside a reusable helper.", "Creating circular dependencies that make order hard to reason about."],
      tasks: [
        { id: "javascript-modules-format", title: "Format a public helper", description: "Write formatSignal(value) and print NX-42.", expectedBehavior: "Print NX-42.", starterCode: "function formatSignal(value) {\n  // Return the public signal label\n}\n\nconsole.log(formatSignal(42));", expected: "NX-42", hints: ["Return a template literal.", "The value parameter should appear after NX-.", "The function should return, not print, the label."] },
        { id: "javascript-modules-private-helper", title: "Keep a helper focused", description: "Create normalize(text) and print PRISM.", expectedBehavior: "Print PRISM.", starterCode: "function normalize(text) {\n  // Trim and uppercase\n}\n\nconsole.log(normalize(\" prism \"));", expected: "PRISM", hints: ["Use text.trim().", "Then call toUpperCase().", "Return the transformed string."] },
      ],
      bonus: { id: "javascript-modules-bonus", title: "Compose two helpers", description: "Read one value, normalize it, wrap it as SIGNAL:<VALUE>.", expectedBehavior: "For prism print SIGNAL:PRISM.", starterCode: "const raw = input();\n// Compose small helpers\n", expected: "SIGNAL:PRISM", hints: ["One helper can normalize.", "Another helper can add the SIGNAL: prefix.", "Print the composed result."], discoveryText: "The Event Lattice begins separating public contracts from private machinery.", defaultInput: "prism" },
    }),
    lesson({
      id: "javascript-dom-model",
      title: "DOM Tree Model",
      subtitle: "Reason about document nodes without touching the app shell",
      objectives: ["Represent DOM-like nodes as objects", "Traverse child arrays", "Keep learner code away from the main application DOM"],
      conceptHeading: "The DOM is a tree of nodes with parent-child relationships",
      explanation: ["Real browser documents expose a DOM tree. For safety, NEXUS practices DOM reasoning with plain object models and sandboxed previews instead of allowing learner JavaScript to mutate the application shell.", "A DOM-like tree can be traversed recursively or iteratively to count elements, collect labels, and reason about hierarchy."],
      bullets: ["Represent each node with tag and children fields.", "Traverse children in a predictable order.", "Run actual previews in the sandboxed web track."],
      syntax: "const node = { tag: \"main\", children: [] };",
      example: {
        title: "Count child nodes",
        description: "The tree is a plain JavaScript object.",
        code: "const tree = { tag: \"main\", children: [{ tag: \"h1\", children: [] }] };\nconsole.log(tree.children.length);",
        output: "1",
      },
      fieldNote: "A model lets you learn structure safely before interacting with real browser APIs.",
      mistakes: ["Assuming learner worker code can access document.", "Forgetting that children is an array.", "Changing the tree while counting it accidentally."],
      tasks: [
        { id: "javascript-dom-model-count", title: "Count direct children", description: "Print the number of direct children in the supplied tree.", expectedBehavior: "Print 2.", starterCode: "const tree = { tag: \"main\", children: [{ tag: \"h1\", children: [] }, { tag: \"p\", children: [] }] };\n// Count direct children\n", expected: "2", hints: ["Use tree.children.", "Arrays have length.", "Print the length only."] },
        { id: "javascript-dom-model-tags", title: "List child tags", description: "Print h1,p for the direct children.", expectedBehavior: "Print h1,p.", starterCode: "const tree = { tag: \"main\", children: [{ tag: \"h1\", children: [] }, { tag: \"p\", children: [] }] };\n// List child tag names\n", expected: "h1,p", hints: ["Map children to child.tag.", "Use join with a comma.", "Print the joined string."] },
      ],
      bonus: { id: "javascript-dom-model-bonus", title: "Count all nodes", description: "Write countNodes(node) for a nested tree and print 4.", expectedBehavior: "Print 4.", starterCode: "const tree = { tag: \"main\", children: [{ tag: \"section\", children: [{ tag: \"h2\", children: [] }] }, { tag: \"p\", children: [] }] };\n// Count this node and every descendant\n", expected: "4", hints: ["Start with 1 for the current node.", "Recursively add counts for each child.", "reduce can combine child counts."], discoveryText: "DOM reasoning now has a safe structural practice model." },
    }),
    lesson({
      id: "javascript-events-queue",
      title: "Event Queue Simulator",
      subtitle: "Understand handlers as deferred responses",
      objectives: ["Represent events as queued records", "Process events in order", "Separate event data from handler behavior"],
      conceptHeading: "An event loop processes queued work after the current step completes",
      explanation: ["Browser events do not run because a button exists; they run when the browser dispatches an event to a registered handler. A queue model makes that ordering visible.", "In worker-safe lessons, we simulate event records and handlers deterministically so output can be validated."],
      bullets: ["Events are data records with a type.", "Handlers are functions selected by type.", "Processing order matters."],
      syntax: "for (const event of queue) handle(event);",
      example: {
        title: "Process two events",
        description: "Events are handled in insertion order.",
        code: "const queue = [{ type: \"click\" }, { type: \"submit\" }];\nfor (const event of queue) console.log(event.type);",
        output: "click\nsubmit",
      },
      fieldNote: "Events should explain causality: what happened, what handler ran, and what state changed.",
      mistakes: ["Calling a handler immediately when you meant to store it.", "Mutating the queue while iterating without a plan.", "Assuming asynchronous code always finishes in visual order."],
      tasks: [
        { id: "javascript-events-queue-order", title: "Process event order", description: "Print the event types in queue order separated by >.", expectedBehavior: "Print click>submit>resize.", starterCode: "const queue = [{ type: \"click\" }, { type: \"submit\" }, { type: \"resize\" }];\n// Report processing order\n", expected: "click>submit>resize", hints: ["Map events to event.type.", "Use join(\">\") on the result.", "Print once."] },
        { id: "javascript-events-queue-handlers", title: "Dispatch one handler", description: "Use a handlers object so a submit event prints saved.", expectedBehavior: "Print saved.", starterCode: "const event = { type: \"submit\" };\nconst handlers = {\n  submit() { return \"saved\"; }\n};\n// Dispatch by event.type\n", expected: "saved", hints: ["Look up handlers[event.type].", "Call the returned function.", "Print its return value."] },
      ],
      bonus: { id: "javascript-events-queue-bonus", title: "Count event types", description: "Count two click events and one submit event.", expectedBehavior: "Print click=2 submit=1.", starterCode: "const queue = [{ type: \"click\" }, { type: \"submit\" }, { type: \"click\" }];\n// Count event types\n", expected: "click=2 submit=1", hints: ["Use an object as a counter.", "Increment counts[event.type].", "Print the two labels in the requested order."], discoveryText: "The Event Lattice exposes temporal behavior without unsafe DOM access." },
    }),
    lesson({
      id: "javascript-async-fetch-model",
      title: "Deterministic Fetch Model",
      subtitle: "Practice network-shaped code with local mock data",
      objectives: ["Use async functions with await", "Model fetch results deterministically", "Handle rejected operations"],
      conceptHeading: "Asynchronous code waits for a future value without blocking the whole program",
      explanation: ["Real network calls are not deterministic enough for a static lesson. NEXUS uses mock async functions so learners can practice await, success paths, and failure paths safely.", "The structure is the same: call an async function, await its result, and recover from expected failures."],
      bullets: ["Mark the containing function async.", "Use await inside that function.", "Handle failures with try and catch."],
      syntax: "const data = await loadSignal();",
      example: {
        title: "Await a local promise",
        description: "The mock function resolves immediately but keeps async structure visible.",
        code: "async function loadSignal() { return \"ready\"; }\nconst value = await loadSignal();\nconsole.log(value);",
        output: "ready",
      },
      fieldNote: "A deterministic mock teaches control flow; production code still needs real network error handling.",
      mistakes: ["Using await outside a module or async context without support.", "Forgetting to return from an async helper.", "Treating rejected promises as ordinary return values."],
      tasks: [
        { id: "javascript-async-fetch-model-await", title: "Await a mock loader", description: "Await loadEnergy and print ENERGY=42.", expectedBehavior: "Print ENERGY=42.", starterCode: "async function loadEnergy() {\n  return 42;\n}\n// Await and report\n", expected: "ENERGY=42", hints: ["Top-level await is supported in this worker lesson.", "Store await loadEnergy() in a const.", "Print with a template literal."] },
        { id: "javascript-async-fetch-model-catch", title: "Catch a rejected loader", description: "Catch the failed load and print offline.", expectedBehavior: "Print offline.", starterCode: "async function loadSignal() {\n  throw new Error(\"network unavailable\");\n}\n// Recover from the expected failure\n", expected: "offline", hints: ["Use try/catch around await loadSignal().", "The catch block prints offline.", "Do not print the error stack."] },
      ],
      bonus: { id: "javascript-async-fetch-model-bonus", title: "Merge two async readings", description: "Await two loaders and print their sum.", expectedBehavior: "Print 15.", starterCode: "async function left() { return 7; }\nasync function right() { return 8; }\n// Await both readings\n", expected: "15", hints: ["Await left() and right().", "Add the two numbers.", "Print the sum."], discoveryText: "Async practice now works without pretending to call an external API." },
    }),
    lesson({
      id: "javascript-performance-budget",
      title: "Performance Budgets",
      subtitle: "Measure work before optimizing blindly",
      objectives: ["Count operations in small loops", "Recognize avoidable repeated work", "Use stable summaries instead of fake metrics"],
      conceptHeading: "A performance budget defines the amount of work a feature may spend",
      explanation: ["Browser applications feel fast when expensive work is kept away from initial interaction and repeated rendering. A budget gives the team a concrete limit to protect.", "In code exercises, operation counts can make repeated work visible before learners reach profiling tools."],
      bullets: ["Measure the work you can observe.", "Move repeated calculations out of loops when possible.", "Do not invent performance claims without evidence."],
      syntax: "let operations = 0;",
      example: {
        title: "Count loop work",
        description: "The counter makes the amount of iteration visible.",
        code: "let operations = 0;\nfor (const value of [1, 2, 3]) {\n  operations += 1;\n}\nconsole.log(operations);",
        output: "3",
      },
      fieldNote: "Optimization starts with a question: what work is repeated, and does the user pay for it?",
      mistakes: ["Optimizing code that is not on a meaningful path.", "Claiming speed improvements without measurement.", "Doing expensive work every render when a derived value can be reused."],
      tasks: [
        { id: "javascript-performance-budget-count", title: "Count transformations", description: "Double four values and count four operations.", expectedBehavior: "Print 2,4,6,8|ops=4.", starterCode: "const values = [1, 2, 3, 4];\nlet operations = 0;\n// Transform and count\n", expected: "2,4,6,8|ops=4", hints: ["Increment operations once per value.", "Push value * 2 into a result array.", "Join the result values with commas."] },
        { id: "javascript-performance-budget-cache", title: "Avoid repeated normalization", description: "Normalize the search query once and match two labels.", expectedBehavior: "Print prism.", starterCode: "const query = \" PR \";\nconst labels = [\"prism\", \"coil\"];\n// Normalize query once before filtering\n", expected: "prism", hints: ["Use query.trim().toLowerCase() once.", "Filter labels with startsWith.", "Print the matching labels joined by commas."] },
      ],
      bonus: { id: "javascript-performance-budget-bonus", title: "Budget report", description: "For five items and a budget of four, print OVER-BUDGET.", expectedBehavior: "Print OVER-BUDGET.", starterCode: "const items = [1, 2, 3, 4, 5];\nconst budget = 4;\n// Count item work and report budget state\n", expected: "OVER-BUDGET", hints: ["The work count can be items.length.", "Compare work to budget.", "Print OVER-BUDGET when work is greater."], discoveryText: "The Event Lattice now treats performance as an explicit product constraint." },
    }),
    lesson({
      id: "javascript-app-architecture",
      title: "Browser App Architecture",
      subtitle: "Separate state, update, and rendering decisions",
      objectives: ["Represent application state explicitly", "Write pure update functions", "Render summaries from state"],
      conceptHeading: "A maintainable app separates state transitions from presentation",
      explanation: ["Even a small browser app becomes easier to test when state is a plain object and updates are pure functions. Rendering can then read state without deciding business rules.", "This pattern mirrors the NEXUS local-first approach: persistent state, derived selectors, and UI components have different responsibilities."],
      bullets: ["Keep state serializable.", "Make update functions return new state.", "Keep render helpers deterministic."],
      syntax: "const nextState = reducer(state, action);",
      example: {
        title: "Update count state",
        description: "The update function returns a new object.",
        code: "function increment(state) {\n  return { ...state, count: state.count + 1 };\n}\nconsole.log(increment({ count: 1 }).count);",
        output: "2",
      },
      fieldNote: "Architecture is not ceremony when it makes behavior testable and recovery predictable.",
      mistakes: ["Mutating shared state in hidden places.", "Mixing input parsing, state changes, and output formatting in one block.", "Rendering from stale state after an update."],
      tasks: [
        { id: "javascript-app-architecture-update", title: "Pure state update", description: "Write addEnergy(state, amount) and print 45.", expectedBehavior: "Print 45.", starterCode: "function addEnergy(state, amount) {\n  // Return a new state object\n}\n\nconst next = addEnergy({ energy: 40 }, 5);\nconsole.log(next.energy);", expected: "45", hints: ["Use object spread.", "Set energy to state.energy + amount.", "Do not mutate the original state."] },
        { id: "javascript-app-architecture-render", title: "Render a deterministic summary", description: "Write render(state) and print Level 3 / 120 XP.", expectedBehavior: "Print Level 3 / 120 XP.", starterCode: "function render(state) {\n  // Return one summary string\n}\n\nconsole.log(render({ level: 3, xp: 120 }));", expected: "Level 3 / 120 XP", hints: ["Return a template literal.", "Read state.level and state.xp.", "Keep rendering separate from state mutation."] },
      ],
      bonus: { id: "javascript-app-architecture-bonus", title: "Reducer action", description: "Apply an add action to state and print 12.", expectedBehavior: "Print 12.", starterCode: "function reducer(state, action) {\n  // Support { type: \"add\", amount }\n}\n\nconsole.log(reducer({ count: 5 }, { type: \"add\", amount: 7 }).count);", expected: "12", hints: ["Check action.type.", "Return a new object for add.", "Return state for unknown actions."], discoveryText: "The JavaScript path now ends with a testable app architecture pattern." },
    })
  ],
};
