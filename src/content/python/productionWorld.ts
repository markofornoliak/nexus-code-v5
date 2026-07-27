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

export const pythonProductionWorld: CurriculumWorldSpec = {
  id: "python-production-automation",
  title: "Production Automation Bay",
  subtitle: "Configuration, observability, and command architecture",
  description:
    "Turn small scripts into dependable operational tools with explicit configuration, structured event records, and deterministic command routing.",
  landmark: "The Reliability Console",
  accent: "lime",
  lessons: [
    {
      id: "python-config-pipelines",
      title: "Configuration Pipelines",
      subtitle: "Normalize external settings before they reach core logic",
      objectives: [
        "Separate raw configuration from validated settings",
        "Apply defaults without hiding invalid values",
        "Create deterministic configuration summaries",
      ],
      conceptHeading: "Configuration is an input contract, not a bag of globals",
      explanation: [
        "Production scripts receive settings from users, environment variables, or files. Core logic becomes easier to test when those raw values are normalized once at the boundary.",
        "A configuration pipeline should convert types, apply documented defaults, and reject impossible values before work begins.",
      ],
      bullets: [
        "Normalize at the edge of the program.",
        "Keep defaults visible and intentional.",
        "Return a validated dictionary instead of mutating global state.",
      ],
      syntax:
        'def build_config(raw):\n    return {"retries": int(raw.get("retries", 3))}',
      example: {
        title: "Normalize retry settings",
        description: "The boundary converts text into a stable integer value.",
        code: "def build_config(raw):\n    retries = int(raw.get('retries', 3))\n    return {'retries': retries}\n\nprint(build_config({'retries': '5'})['retries'])",
        output: "5",
      },
      fieldNote:
        "When configuration is validated once, the rest of the program can operate on trusted values instead of repeating defensive checks.",
      mistakes: [
        "Reading environment-like values throughout the codebase.",
        "Silently replacing malformed values with defaults.",
        "Mixing configuration parsing with business logic.",
      ],
      tasks: [
        task(
          "python-config-pipelines-defaults",
          "Apply a visible default",
          "Write build_config(raw) so a missing timeout becomes 30 and print the result.",
          "Print 30.",
          "def build_config(raw):\n    # Return a dictionary with integer timeout\n    pass\n\nprint(build_config({})['timeout'])\n",
          "30",
          [
            "Use raw.get('timeout', 30).",
            "Convert the selected value with int().",
            "Return a new dictionary.",
          ],
        ),
        task(
          "python-config-pipelines-summary",
          "Summarize normalized settings",
          "Normalize mode and retries, then print MODE=SAFE RETRIES=4.",
          "Print MODE=SAFE RETRIES=4.",
          "raw = {'mode': ' safe ', 'retries': '4'}\n# Normalize and report\n",
          "MODE=SAFE RETRIES=4",
          [
            "Strip and uppercase the mode.",
            "Convert retries to int.",
            "Use one formatted string.",
          ],
        ),
      ],
      bonusTask: bonus(
        "python-config-pipelines-bonus",
        "Reject an invalid threshold",
        "Read a threshold and print ACCEPTED when it is from 1 to 100, otherwise REJECTED.",
        "For 120 print REJECTED.",
        "value = int(input())\n# Validate the configuration boundary\n",
        "REJECTED",
        [
          "Use a chained comparison.",
          "The accepted interval includes 1 and 100.",
          "Print one status word.",
        ],
        "The Reliability Console now blocks impossible configuration before execution.",
        "120",
      ),
    },
    {
      id: "python-structured-observability",
      title: "Structured Observability",
      subtitle: "Record events that humans and programs can inspect",
      objectives: [
        "Represent operational events as dictionaries",
        "Keep event fields stable across messages",
        "Aggregate event streams without parsing prose",
      ],
      conceptHeading: "Useful logs are structured records with predictable fields",
      explanation: [
        "Free-form print statements help during experiments, but production diagnostics become more reliable when every event uses the same keys such as level, component, and message.",
        "Structured records can be filtered, counted, exported, or rendered without fragile string parsing.",
      ],
      bullets: [
        "Use stable field names.",
        "Separate severity from the message text.",
        "Keep records serializable and deterministic.",
      ],
      syntax: 'event = {"level": "INFO", "component": "scanner", "message": "ready"}',
      example: {
        title: "Count error records",
        description: "The level field makes aggregation direct.",
        code: "events = [\n    {'level': 'INFO'},\n    {'level': 'ERROR'},\n    {'level': 'ERROR'},\n]\nprint(sum(event['level'] == 'ERROR' for event in events))",
        output: "2",
      },
      fieldNote:
        "Observability should explain what the system did without forcing investigators to reconstruct state from decorative messages.",
      mistakes: [
        "Changing field names between events.",
        "Embedding severity only inside message text.",
        "Logging secrets or unnecessary personal data.",
      ],
      tasks: [
        task(
          "python-structured-observability-count",
          "Count warning events",
          "Count records whose level is WARN and print WARNINGS=2.",
          "Print WARNINGS=2.",
          "events = [\n    {'level': 'INFO'},\n    {'level': 'WARN'},\n    {'level': 'WARN'},\n]\n# Count warnings\n",
          "WARNINGS=2",
          [
            "Use sum with a boolean expression.",
            "Compare event['level'] with 'WARN'.",
            "Format the final count once.",
          ],
        ),
        task(
          "python-structured-observability-components",
          "Summarize affected components",
          "Print sorted unique components as api,cache,worker.",
          "Print api,cache,worker.",
          "events = [\n    {'component': 'worker'},\n    {'component': 'api'},\n    {'component': 'cache'},\n    {'component': 'api'},\n]\n# Report unique components\n",
          "api,cache,worker",
          [
            "A set removes duplicates.",
            "sorted() produces deterministic order.",
            "Join the names with commas.",
          ],
        ),
      ],
      bonusTask: bonus(
        "python-structured-observability-bonus",
        "Build a compact event line",
        "Read level, component, and message on separate lines and print LEVEL|COMPONENT|message.",
        "For info, api, ready print INFO|API|ready.",
        "level = input()\ncomponent = input()\nmessage = input()\n# Build a stable event representation\n",
        "INFO|API|ready",
        [
          "Uppercase level and component.",
          "Keep the message unchanged.",
          "Join fields with vertical bars.",
        ],
        "The event stream is now compact, searchable, and machine-readable.",
        "info\napi\nready",
      ),
    },
    {
      id: "python-command-architecture",
      title: "Command Architecture",
      subtitle: "Route commands through small handlers instead of giant conditionals",
      objectives: [
        "Map command names to handler functions",
        "Return safe results for unknown commands",
        "Keep parsing separate from execution",
      ],
      conceptHeading: "A command table turns branching into an explicit interface",
      explanation: [
        "As a command-line tool grows, one long if/elif chain mixes parsing, validation, execution, and reporting. A handler table makes supported commands visible and individually testable.",
        "The dispatcher should normalize the command name, locate a handler, and return a controlled fallback when no route exists.",
      ],
      bullets: [
        "Handlers should accept clear inputs and return values.",
        "Normalize command names before lookup.",
        "Unknown commands must fail safely and predictably.",
      ],
      syntax:
        'handlers = {"status": show_status}\nresult = handlers.get(command, unknown)()',
      example: {
        title: "Dispatch one command",
        description: "The dictionary exposes the supported interface.",
        code: "def status():\n    return 'ONLINE'\n\nhandlers = {'status': status}\nprint(handlers['status']())",
        output: "ONLINE",
      },
      fieldNote:
        "A dispatcher should coordinate handlers, not absorb every rule that the handlers need to implement.",
      mistakes: [
        "Calling handlers while building the dictionary.",
        "Letting unknown commands raise an accidental KeyError.",
        "Mixing token parsing with command side effects.",
      ],
      tasks: [
        task(
          "python-command-architecture-dispatch",
          "Dispatch a status command",
          "Use a handler dictionary and print ONLINE for status.",
          "Print ONLINE.",
          "def status():\n    return 'ONLINE'\n\nhandlers = {'status': status}\ncommand = 'status'\n# Dispatch the command\n",
          "ONLINE",
          [
            "Store the function object, not status().",
            "Look up handlers[command].",
            "Call the selected function.",
          ],
        ),
        task(
          "python-command-architecture-fallback",
          "Handle an unknown command",
          "Dispatch reboot safely and print UNKNOWN.",
          "Print UNKNOWN.",
          "def status():\n    return 'ONLINE'\n\nhandlers = {'status': status}\ncommand = 'reboot'\n# Return a safe fallback\n",
          "UNKNOWN",
          [
            "Use handlers.get(command).",
            "Check whether a handler was found.",
            "Print UNKNOWN when it is missing.",
          ],
        ),
      ],
      bonusTask: bonus(
        "python-command-architecture-bonus",
        "Route a parameterized command",
        "Read a command and value. For echo and nexus print NEXUS; otherwise print UNKNOWN.",
        "For echo and nexus print NEXUS.",
        "command = input().strip().lower()\nvalue = input()\n# Route a command that receives one argument\n",
        "NEXUS",
        [
          "Define an echo(value) handler.",
          "Store it in a dictionary.",
          "Uppercase only inside the echo handler.",
        ],
        "The automation bay now exposes a small, testable command interface.",
        "echo\nnexus",
      ),
    },
  ],
};
