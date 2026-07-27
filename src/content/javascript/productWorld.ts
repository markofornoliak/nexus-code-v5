import type { CurriculumWorldSpec } from "../_shared/defineLesson";
import { outputBonus, outputTask } from "../_shared/taskBuilders";

const task = (
  id: string,
  title: string,
  description: string,
  expectedBehavior: string,
  starterCode: string,
  expected: string,
  hints: string[],
  defaultInput?: string,
) =>
  outputTask(
    {
      id,
      title,
      description,
      expectedBehavior,
      starterCode,
      hints,
      ...(defaultInput ? { defaultInput } : {}),
    },
    expected,
  );

const bonus = (
  id: string,
  title: string,
  description: string,
  expectedBehavior: string,
  starterCode: string,
  expected: string,
  hints: string[],
  discoveryText: string,
  defaultInput?: string,
) =>
  outputBonus(
    {
      id,
      title,
      description,
      expectedBehavior,
      starterCode,
      hints,
      ...(defaultInput ? { defaultInput } : {}),
    },
    expected,
    discoveryText,
  );

export const javascriptProductWorld: CurriculumWorldSpec = {
  id: "javascript-product-systems",
  title: "Product Systems Studio",
  subtitle: "State machines, validation contracts, and async coordination",
  description:
    "Model real interface behavior with explicit states, trustworthy input boundaries, and predictable asynchronous workflows.",
  landmark: "The Interaction Control Room",
  accent: "amber",
  lessons: [
    {
      id: "javascript-state-machines",
      title: "Finite State Machines",
      subtitle: "Make interface transitions explicit and testable",
      objectives: [
        "Represent a finite set of application states",
        "Validate transitions before changing state",
        "Separate transition logic from rendering",
      ],
      conceptHeading: "A state machine describes what can happen next",
      explanation: [
        "Complex interfaces often fail because any event can mutate any value. A finite state machine limits the system to named states and allowed transitions.",
        "When transitions are explicit, loading, success, empty, and failure behavior can be tested without a browser DOM.",
      ],
      bullets: [
        "Use a small vocabulary of named states.",
        "Reject transitions that are not in the transition table.",
        "Render from state instead of scattering UI flags.",
      ],
      syntax: "const transitions = { idle: ['loading'], loading: ['ready', 'error'] };",
      example: {
        title: "Move from loading to ready",
        description: "The transition table defines the legal path.",
        code: "const transitions = { loading: ['ready', 'error'] };\nconst next = transitions.loading.includes('ready') ? 'ready' : 'loading';\nconsole.log(next);",
        output: "ready",
      },
      fieldNote:
        "State machines reduce ambiguity: every visible mode has a name, and every change has a traceable event.",
      mistakes: [
        "Using booleans that permit impossible combinations.",
        "Changing state before validating the event.",
        "Mixing transition rules with DOM manipulation.",
      ],
      tasks: [
        task(
          "javascript-state-machines-transition",
          "Validate a transition",
          "Print ready when loading may transition to ready.",
          "Print ready.",
          "const transitions = { loading: ['ready', 'error'] };\nconst current = 'loading';\nconst requested = 'ready';\n// Validate and print the resulting state\n",
          "ready",
          [
            "Read transitions[current].",
            "Use includes(requested).",
            "Keep current when the transition is invalid.",
          ],
        ),
        task(
          "javascript-state-machines-reject",
          "Reject an impossible transition",
          "Keep ready when ready cannot transition directly to loading.",
          "Print ready.",
          "const transitions = { ready: ['editing'], editing: ['ready'] };\nconst current = 'ready';\nconst requested = 'loading';\n// Preserve state when the route is invalid\n",
          "ready",
          [
            "Use optional chaining or a fallback array.",
            "Check includes before changing state.",
            "Print the final state only.",
          ],
        ),
      ],
      bonusTask: bonus(
        "javascript-state-machines-bonus",
        "Process an event sequence",
        "Apply load, resolve, and edit events and print editing.",
        "Print editing.",
        "const eventToState = { load: 'loading', resolve: 'ready', edit: 'editing' };\nconst events = ['load', 'resolve', 'edit'];\nlet state = 'idle';\n// Apply the sequence\n",
        "editing",
        [
          "Loop over the events in order.",
          "Use eventToState[event].",
          "Assign the resulting state each time.",
        ],
        "The control room now models interface behavior as a visible transition path.",
      ),
    },
    {
      id: "javascript-validation-contracts",
      title: "Validation Contracts",
      subtitle: "Transform raw form data into trusted application values",
      objectives: [
        "Normalize raw input before validation",
        "Return structured validation results",
        "Keep error messages stable and actionable",
      ],
      conceptHeading:
        "Validation is a boundary between untrusted input and trusted state",
      explanation: [
        "Form values arrive as strings and may contain whitespace, missing fields, or unexpected formats. A validation contract should normalize those values and return a predictable result object.",
        "Structured results let the UI render errors without guessing what a thrown message means.",
      ],
      bullets: [
        "Normalize first, validate second.",
        "Return data and errors in a stable shape.",
        "Do not mutate the raw input object.",
      ],
      syntax: "return { ok: errors.length === 0, data, errors };",
      example: {
        title: "Validate one field",
        description: "The result object contains both status and normalized data.",
        code: "const raw = { name: '  Atlas ' };\nconst name = raw.name.trim();\nconsole.log(JSON.stringify({ ok: name.length > 0, name }));",
        output: '{"ok":true,"name":"Atlas"}',
      },
      fieldNote:
        "A validation function should be pure enough to test with representative input objects and edge cases.",
      mistakes: [
        "Displaying validation errors before normalizing whitespace.",
        "Returning unrelated result shapes for different failures.",
        "Mutating the object supplied by the caller.",
      ],
      tasks: [
        task(
          "javascript-validation-contracts-name",
          "Normalize a required name",
          "Trim the supplied name and print VALID:Atlas.",
          "Print VALID:Atlas.",
          "const raw = { name: '  Atlas  ' };\n// Normalize and validate\n",
          "VALID:Atlas",
          [
            "Use trim().",
            "Check that the normalized value is non-empty.",
            "Print VALID:<name>.",
          ],
        ),
        task(
          "javascript-validation-contracts-errors",
          "Return stable errors",
          "Validate an empty title and print REQUIRED.",
          "Print REQUIRED.",
          "function validateTitle(value) {\n  // Return { ok, error }\n}\n\nconst result = validateTitle('   ');\nconsole.log(result.error);\n",
          "REQUIRED",
          [
            "Trim the value inside the function.",
            "Return error: 'REQUIRED' for an empty value.",
            "Use a consistent object shape.",
          ],
        ),
      ],
      bonusTask: bonus(
        "javascript-validation-contracts-bonus",
        "Validate a numeric range",
        "Read a score and print OK when it is between 0 and 100, otherwise OUT_OF_RANGE.",
        "For 120 print OUT_OF_RANGE.",
        "const score = Number(input());\n// Validate the numeric boundary\n",
        "OUT_OF_RANGE",
        [
          "Use Number.isFinite(score).",
          "Check both lower and upper bounds.",
          "Print one stable status code.",
        ],
        "The studio now exposes a trustworthy input boundary for product state.",
        "120",
      ),
    },
    {
      id: "javascript-async-orchestration",
      title: "Async Orchestration",
      subtitle: "Coordinate independent work and preserve failure context",
      objectives: [
        "Choose between sequential and parallel awaits",
        "Aggregate deterministic async results",
        "Recover from rejected operations with useful context",
      ],
      conceptHeading: "Async orchestration is about dependency, not just syntax",
      explanation: [
        "Independent operations can run together with Promise.all, while dependent operations must remain sequential. The correct structure communicates which result relies on which earlier step.",
        "Error handling should preserve enough context for the caller to decide whether to retry, display a fallback, or stop.",
      ],
      bullets: [
        "Run independent work in parallel.",
        "Keep dependent work in explicit sequence.",
        "Convert failures into stable application outcomes.",
      ],
      syntax:
        "const [profile, missions] = await Promise.all([loadProfile(), loadMissions()]);",
      example: {
        title: "Combine two loaders",
        description: "Independent promises resolve into one ordered result array.",
        code: "const loadA = async () => 'A';\nconst loadB = async () => 'B';\nconst [a, b] = await Promise.all([loadA(), loadB()]);\nconsole.log(a + b);",
        output: "AB",
      },
      fieldNote:
        "Parallelism is useful only when operations are independent and their combined failure behavior is understood.",
      mistakes: [
        "Awaiting independent loaders one after another.",
        "Using Promise.all when later work depends on an earlier result.",
        "Catching an error and discarding all context.",
      ],
      tasks: [
        task(
          "javascript-async-orchestration-parallel",
          "Combine parallel results",
          "Run two async loaders with Promise.all and print PROFILE|MISSIONS.",
          "Print PROFILE|MISSIONS.",
          "const loadProfile = async () => 'PROFILE';\nconst loadMissions = async () => 'MISSIONS';\n// Load both and report\n",
          "PROFILE|MISSIONS",
          [
            "Use await Promise.all([...]).",
            "Destructure the two results.",
            "Join them with a vertical bar.",
          ],
        ),
        task(
          "javascript-async-orchestration-recovery",
          "Recover from a rejected loader",
          "Catch the rejection and print FALLBACK.",
          "Print FALLBACK.",
          "const load = async () => { throw new Error('offline'); };\n// Recover with a stable outcome\n",
          "FALLBACK",
          [
            "Wrap await load() in try/catch.",
            "Print FALLBACK inside catch.",
            "Do not rethrow for this task.",
          ],
        ),
      ],
      bonusTask: bonus(
        "javascript-async-orchestration-bonus",
        "Preserve failure context",
        "Catch a rejected operation and print ERROR:offline.",
        "Print ERROR:offline.",
        "const load = async () => { throw new Error('offline'); };\n// Preserve the error message\n",
        "ERROR:offline",
        ["Catch the error object.", "Read error.message.", "Prefix it with ERROR:."],
        "The Product Systems Studio can now coordinate work and explain why a load failed.",
      ),
    },
  ],
};
