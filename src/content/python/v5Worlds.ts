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

export const pythonTypecraftWorld: CurriculumWorldSpec = {
  id: "python-typecraft-observatory",
  title: "Typecraft Observatory",
  subtitle: "Reason about Python programs before they run",
  description:
    "Type hints, protocols, dataclasses, validators, debugging discipline, and tests make Python systems easier to inspect inside the archive.",
  landmark: "The Static Lens Array",
  accent: "violet",
  lessons: [
    lesson({
      id: "python-type-hints-basics",
      title: "Annotated Signals",
      subtitle: "Use type hints as executable design notes",
      objectives: [
        "Annotate function parameters and return values",
        "Separate runtime behavior from static documentation",
        "Read type hints as a collaboration contract",
      ],
      conceptHeading: "A type hint names the shape a value is expected to have",
      explanation: [
        "Python type hints do not change ordinary runtime execution in the browser, but they make intent visible to humans and static tools. A precise annotation can prevent ambiguous function contracts.",
        "Treat annotations as a map of allowed values: they should describe inputs, return values, and the boundary between two pieces of code.",
      ],
      bullets: [
        "Write parameter annotations after the parameter name.",
        "Write the return annotation after -> before the colon.",
        "Keep hints honest when a function may return None.",
      ],
      syntax: "def normalize(name: str) -> str:",
      example: {
        title: "Typed coordinate formatter",
        description:
          "The annotations explain the expected inputs while the function still runs normally.",
        code: 'def coordinate(sector: int, fragment: int) -> str:\n    return f"NX-{sector:02d}:{fragment:02d}"\n\nprint(coordinate(3, 7))',
        output: "NX-03:07",
      },
      fieldNote:
        "A hint that says too little is noise; a hint that says exactly what the boundary expects is instrumentation.",
      mistakes: [
        "Expecting a type hint to automatically validate user input.",
        "Annotating everything as any-shaped text instead of using real types.",
        "Forgetting that a function returning nothing should be read as returning None.",
      ],
      tasks: [
        {
          id: "python-type-hints-format",
          title: "Format a typed beacon",
          description:
            "Write a function label(name: str, level: int) -> str and print Prism@5.",
          expectedBehavior: "Print Prism@5.",
          starterCode:
            '# Define label with parameter and return annotations\n\nprint(label("Prism", 5))',
          expected: "Prism@5",
          hints: [
            "The function needs two annotated parameters.",
            "The return annotation belongs before the colon.",
            "Return an f-string that combines name and level.",
          ],
        },
        {
          id: "python-type-hints-none",
          title: "Return an optional marker",
          description:
            "Write first_positive(values: list[int]) -> int | None and print its result for [-3, 0, 8].",
          expectedBehavior: "Print 8.",
          starterCode:
            "def first_positive(values: list[int]) -> int | None:\n    # Return the first positive integer, or None\n    pass\n\nprint(first_positive([-3, 0, 8]))",
          expected: "8",
          hints: [
            "Loop through the values in order.",
            "Return the first value greater than zero.",
            "Return None after the loop when nothing matched.",
          ],
        },
      ],
      bonus: {
        id: "python-type-hints-bonus",
        title: "Typed intake decoder",
        description:
          "Read two lines, convert the second to int, call a typed function, and print Beacon:42.",
        expectedBehavior: "For Beacon and 42 print Beacon:42.",
        starterCode:
          "name = input()\nraw = input()\n# Build a typed formatter and call it\n",
        expected: "Beacon:42",
        defaultInput: "Beacon\n42",
        hints: [
          "Convert raw with int(raw).",
          "Use a function with name: str and value: int.",
          'Return f"{name}:{value}" from the function.',
        ],
        discoveryText: "The Static Lens Array starts recording explicit contracts.",
      },
    }),
    lesson({
      id: "python-dataclasses-records-v5",
      title: "Dataclass Specimens",
      subtitle: "Model small records without repetitive boilerplate",
      objectives: [
        "Create a dataclass with typed fields",
        "Instantiate record-like objects",
        "Compute derived text from stored attributes",
      ],
      conceptHeading: "A dataclass turns a small record definition into a usable class",
      explanation: [
        "The dataclasses module creates an initializer and readable representation for classes that mainly store data. It keeps the model explicit without writing boilerplate constructors.",
        "Dataclasses are useful for records, messages, configuration fragments, and small domain objects that need names and typed fields.",
      ],
      bullets: [
        "Import dataclass from dataclasses.",
        "Decorate the class with @dataclass.",
        "Declare each field with a type annotation.",
      ],
      syntax: "@dataclass\nclass Fragment:\n    name: str\n    energy: int",
      example: {
        title: "Store one recovered relic",
        description: "The dataclass constructor is generated from the fields.",
        code: 'from dataclasses import dataclass\n\n@dataclass\nclass Relic:\n    name: str\n    energy: int\n\nrelic = Relic("Prism", 88)\nprint(f"{relic.name}:{relic.energy}")',
        output: "Prism:88",
      },
      fieldNote:
        "A dataclass is still a class. Add methods when behavior belongs with the record.",
      mistakes: [
        "Forgetting the @dataclass decorator.",
        "Putting commas after field lines as if defining a tuple.",
        "Using a dataclass for behavior-heavy objects that need stronger invariants.",
      ],
      tasks: [
        {
          id: "python-dataclasses-basic",
          title: "Create a fragment record",
          description: "Create Fragment with name and energy fields, then print Arc:64.",
          expectedBehavior: "Print Arc:64.",
          starterCode:
            'from dataclasses import dataclass\n\n# Define Fragment\n\nfragment = Fragment("Arc", 64)\nprint(f"{fragment.name}:{fragment.energy}")',
          expected: "Arc:64",
          hints: [
            "Decorate the class with @dataclass.",
            "The fields are name: str and energy: int.",
            "Do not write a manual __init__ for this task.",
          ],
        },
        {
          id: "python-dataclasses-method",
          title: "Add a record method",
          description: "Add a label method to Sensor that returns north/ready.",
          expectedBehavior: "Print north/ready.",
          starterCode:
            'from dataclasses import dataclass\n\n@dataclass\nclass Sensor:\n    zone: str\n    status: str\n\n    # Add label(self)\n\nsensor = Sensor("north", "ready")\nprint(sensor.label())',
          expected: "north/ready",
          hints: [
            "A method inside a class receives self.",
            "Access fields as self.zone and self.status.",
            "Return a slash-separated f-string.",
          ],
        },
      ],
      bonus: {
        id: "python-dataclasses-bonus",
        title: "Sort recovered nodes",
        description:
          "Create Node records from three pairs and print their names ordered by energy descending.",
        expectedBehavior: "Print beta alpha gamma.",
        starterCode:
          'from dataclasses import dataclass\n\n# Define Node(name: str, energy: int)\nraw = [("alpha", 7), ("beta", 9), ("gamma", 3)]\n# Build, sort, and report\n',
        expected: "beta alpha gamma",
        hints: [
          "Build a list of Node instances from raw.",
          "Use sorted with key=lambda node: node.energy.",
          "Set reverse=True and join node.name values.",
        ],
        discoveryText:
          "Records in the observatory now carry stable identity and measurable strength.",
      },
    }),
    lesson({
      id: "python-protocol-thinking",
      title: "Protocol Thinking",
      subtitle: "Design around behavior instead of concrete classes",
      objectives: [
        "Recognize duck typing as behavior-based design",
        "Write functions that depend on a small interface",
        "Use naming to document the required behavior",
      ],
      conceptHeading: "Python often cares about what an object can do",
      explanation: [
        "A function does not always need a specific class. It may only require that a value has a particular method or supports iteration, length, addition, or another small behavior.",
        "This behavior-first approach makes code flexible, but it also increases the responsibility to name requirements clearly and fail predictably.",
      ],
      bullets: [
        "Accept the smallest behavior your algorithm needs.",
        "Prefer explicit helper names over mysterious object access.",
        "Test with more than one compatible object shape.",
      ],
      syntax: "def total_length(items):\n    return sum(len(item) for item in items)",
      example: {
        title: "Measure any sequence of labels",
        description: "The function accepts a list or tuple because both are iterable.",
        code: 'def total_length(labels):\n    return sum(len(label) for label in labels)\n\nprint(total_length(["arc", "prism"]))',
        output: "8",
      },
      fieldNote:
        "A flexible boundary is strong only when the expected behavior is visible in the function name and tests.",
      mistakes: [
        "Requiring a concrete type when iteration would be enough.",
        "Calling methods that were never part of the stated contract.",
        "Returning inconsistent types from different branches.",
      ],
      tasks: [
        {
          id: "python-protocol-thinking-total",
          title: "Count label strength",
          description:
            "Write total_label_length(labels) and print 10 for the provided tuple.",
          expectedBehavior: "Print 10.",
          starterCode:
            'def total_label_length(labels):\n    # Sum lengths without caring whether labels is a list or tuple\n    pass\n\nprint(total_label_length(("ion", "beacon", "x")))',
          expected: "10",
          hints: [
            "Iterate directly over labels.",
            "len(label) gives each label length.",
            "sum(...) can combine a generator expression.",
          ],
        },
        {
          id: "python-protocol-thinking-reader",
          title: "Read from a small interface",
          description: "Call .read() on the supplied object and uppercase the result.",
          expectedBehavior: "Print SIGNAL.",
          starterCode:
            'class Buffer:\n    def read(self):\n        return "signal"\n\ndef decode(source):\n    # Depend only on source.read()\n    pass\n\nprint(decode(Buffer()))',
          expected: "SIGNAL",
          hints: [
            "Call source.read().",
            "The returned string has upper().",
            "Return the transformed string from decode.",
          ],
        },
      ],
      bonus: {
        id: "python-protocol-thinking-bonus",
        title: "Format any named object",
        description:
          "Write describe(item) that uses item.name and item.energy for the provided object.",
        expectedBehavior: "Print Coil=12.",
        starterCode:
          'class Relic:\n    name = "Coil"\n    energy = 12\n\n# Describe any object with name and energy attributes\n',
        expected: "Coil=12",
        hints: [
          "The function does not need to check the concrete class.",
          "Access attributes with item.name and item.energy.",
          "Print describe(Relic()).",
        ],
        discoveryText:
          "The archive can now accept compatible instruments instead of one fixed shell.",
      },
    }),
    lesson({
      id: "python-pytest-style-checks",
      title: "Executable Expectations",
      subtitle: "Write tiny test functions before trusting a helper",
      objectives: [
        "Express expected behavior with assert",
        "Test normal and edge cases",
        "Keep tests deterministic and small",
      ],
      conceptHeading: "A test is a small executable claim about behavior",
      explanation: [
        "In browser lessons we can use plain assert statements to model the discipline behind larger testing tools. An assert documents the input, the expected result, and the condition that must remain true.",
        "Good tests cover at least one ordinary path and one boundary or edge case. They should be fast, deterministic, and focused on behavior rather than implementation details.",
      ],
      bullets: [
        "Write the expected result explicitly.",
        "Test the smallest useful unit.",
        "Name the scenario the test protects.",
      ],
      syntax: 'assert normalize(" nx ") == "NX"',
      example: {
        title: "Protect a normalizer",
        description: "Two assertions guard whitespace and casing behavior.",
        code: 'def normalize(label):\n    return label.strip().upper()\n\nassert normalize(" nx ") == "NX"\nassert normalize("Prism") == "PRISM"\nprint("tests passed")',
        output: "tests passed",
      },
      fieldNote:
        "A failing assert is a useful instrument reading: it tells you which assumption stopped being true.",
      mistakes: [
        "Only testing the exact input from the assignment prompt.",
        "Testing print formatting when the helper should return a value.",
        "Using random data without controlling the expected result.",
      ],
      tasks: [
        {
          id: "python-pytest-style-checks-normalize",
          title: "Assert a normalizer",
          description:
            "Implement normalize and include two asserts before printing verified.",
          expectedBehavior: "Print verified.",
          starterCode:
            'def normalize(label):\n    # Strip spaces and uppercase\n    pass\n\n# Add two assert statements\nprint("verified")',
          expected: "verified",
          hints: [
            "Return label.strip().upper().",
            'Assert normalize(" nx ") == "NX".',
            'A second assert can check normalize("arc") == "ARC".',
          ],
        },
        {
          id: "python-pytest-style-checks-edge",
          title: "Test an empty reading",
          description:
            "Write is_blank(text) and assert that spaces are blank but X is not.",
          expectedBehavior: "Print edge safe.",
          starterCode:
            'def is_blank(text):\n    # True when stripping leaves no characters\n    pass\n\n# Protect both edge and normal paths\nprint("edge safe")',
          expected: "edge safe",
          hints: [
            "Use text.strip() to remove whitespace.",
            "Compare the stripped string to an empty string.",
            'Use assert is_blank("   ") and assert not is_blank("X").',
          ],
        },
      ],
      bonus: {
        id: "python-pytest-style-checks-bonus",
        title: "Test a threshold gate",
        description: "Implement is_ready(energy) and assert 50 is ready while 49 is not.",
        expectedBehavior: "Print gate protected.",
        starterCode: "# Implement and test is_ready\n",
        expected: "gate protected",
        hints: [
          "The function should return energy >= 50.",
          "Assert is_ready(50).",
          "Assert not is_ready(49), then print the required line.",
        ],
        discoveryText:
          "The observatory no longer trusts a helper without a behavioral witness.",
      },
    }),
    lesson({
      id: "python-debugging-invariants",
      title: "Invariant Beacons",
      subtitle: "Debug loops by protecting what must remain true",
      objectives: [
        "Define an invariant for a loop",
        "Use assertions to catch impossible state",
        "Separate debugging checks from user output",
      ],
      conceptHeading:
        "An invariant is a condition that should remain true during execution",
      explanation: [
        "When a loop transforms state, some facts should remain valid: counts stay non-negative, totals equal the sum of processed values, or indexes remain inside bounds. Naming those facts gives debugging direction.",
        "Assertions can guard invariants during development. They are not a replacement for user-facing error handling, but they make broken assumptions visible while you build.",
      ],
      bullets: [
        "State the invariant in plain language first.",
        "Assert it near the state transition.",
        "Keep final program output clean and predictable.",
      ],
      syntax: 'assert total >= 0, "total cannot be negative"',
      example: {
        title: "Guard a running count",
        description: "The assertion documents that processed items cannot be negative.",
        code: 'processed = 0\nfor item in ["a", "b", "c"]:\n    processed += 1\n    assert processed >= 0\nprint(processed)',
        output: "3",
      },
      fieldNote:
        "A good invariant is specific enough to fail near the bug, not ten steps later.",
      mistakes: [
        "Asserting the final answer only, after all useful context is gone.",
        "Leaving noisy debugging prints in exact-output tasks.",
        "Using assertions to validate user input instead of handling it deliberately.",
      ],
      tasks: [
        {
          id: "python-debugging-invariants-count",
          title: "Protect a count",
          description:
            "Count positive numbers and assert the count never becomes negative.",
          expectedBehavior: "Print 3.",
          starterCode:
            "values = [-1, 4, 0, 6, 9]\ncount = 0\nfor value in values:\n    # Count positives and protect the invariant\n    pass\nprint(count)",
          expected: "3",
          hints: [
            "Only increment when value > 0.",
            "After the branch, assert count >= 0.",
            "Do not print inside the loop.",
          ],
        },
        {
          id: "python-debugging-invariants-total",
          title: "Protect a total",
          description:
            "Add readings and assert total equals the sum of already processed values.",
          expectedBehavior: "Print 12.",
          starterCode:
            "readings = [3, 4, 5]\ntotal = 0\nseen = []\nfor reading in readings:\n    # Update total and seen, then assert the invariant\n    pass\nprint(total)",
          expected: "12",
          hints: [
            "Append reading to seen after adding it.",
            "sum(seen) should equal total.",
            "The assert is not part of visible output.",
          ],
        },
      ],
      bonus: {
        id: "python-debugging-invariants-bonus",
        title: "Validate balanced inventory",
        description: "Process changes and assert stock never drops below zero.",
        expectedBehavior: "Print STOCK=4.",
        starterCode:
          "stock = 2\nchanges = [5, -1, -2]\n# Apply changes with an invariant check\n",
        expected: "STOCK=4",
        hints: [
          "Update stock once per change.",
          "Assert stock >= 0 after each update.",
          "Print the final label with an f-string.",
        ],
        discoveryText:
          "The debugging beacons now identify impossible state transitions early.",
      },
    }),
    lesson({
      id: "python-standard-library-paths",
      title: "Path Cartography",
      subtitle: "Use pathlib to describe files without OS-specific string tricks",
      objectives: [
        "Create Path objects",
        "Combine path fragments safely",
        "Extract names, suffixes, and parent paths",
      ],
      conceptHeading: "pathlib represents paths as structured objects",
      explanation: [
        "Path strings differ between operating systems. pathlib lets a program describe file locations with objects that know how to join fragments and expose parts such as names and suffixes.",
        "In Pyodide lessons we avoid unsupported host-file assumptions, but pathlib is still valuable for manipulating path-like data and building portable project logic.",
      ],
      bullets: [
        "Import Path from pathlib.",
        "Use / to join path fragments.",
        "Use .name, .stem, .suffix, and .parent to inspect a path.",
      ],
      syntax: 'from pathlib import Path\npath = Path("archive") / "signal.txt"',
      example: {
        title: "Inspect a project file path",
        description: "Path parts are available without manual splitting.",
        code: 'from pathlib import Path\npath = Path("archive") / "sector" / "signal.txt"\nprint(path.name)\nprint(path.suffix)',
        output: "signal.txt\n.txt",
      },
      fieldNote:
        "A portable path expression is a small architecture decision: it avoids baking one computer's separator into the program.",
      mistakes: [
        "Using string concatenation to join path fragments.",
        "Assuming a browser lesson can access arbitrary local files.",
        "Confusing a path object with the file contents it may point to.",
      ],
      tasks: [
        {
          id: "python-standard-library-paths-name",
          title: "Extract a file name",
          description:
            "Use pathlib to print signal.json from archive/sector/signal.json.",
          expectedBehavior: "Print signal.json.",
          starterCode:
            'from pathlib import Path\npath = Path("archive") / "sector" / "signal.json"\n# Print the file name\n',
          expected: "signal.json",
          hints: [
            "The path object has a .name property.",
            "Do not split on a slash manually.",
            "print(path.name) is enough.",
          ],
        },
        {
          id: "python-standard-library-paths-suffix",
          title: "Report a route suffix",
          description: "Create data/relics.csv with Path and print relics|.csv.",
          expectedBehavior: "Print relics|.csv.",
          starterCode:
            "from pathlib import Path\n# Build a path object for data/relics.csv\n",
          expected: "relics|.csv",
          hints: [
            'Use Path("data") / "relics.csv".',
            ".stem gives relics.",
            ".suffix gives .csv.",
          ],
        },
      ],
      bonus: {
        id: "python-standard-library-paths-bonus",
        title: "Normalize archive inputs",
        description: "Read a path string and print NAME=<name> and EXT=<suffix>.",
        expectedBehavior: "For logs/field/report.md print NAME=report.md and EXT=.md.",
        starterCode: "from pathlib import Path\nraw = input()\n# Inspect the path\n",
        expected: "NAME=report.md\nEXT=.md",
        defaultInput: "logs/field/report.md",
        hints: [
          "Wrap raw with Path(raw).",
          "Use .name for the full filename.",
          "Use .suffix for the extension.",
        ],
        discoveryText:
          "The archive can now parse routes without assuming one host operating system.",
      },
    }),
  ],
};

export const pythonCapstoneWorld: CurriculumWorldSpec = {
  id: "python-local-app-forge",
  title: "Local App Forge",
  subtitle: "Assemble browser-safe Python tools from tested pieces",
  description:
    "Command parsing, deterministic data processing, text serialization, small architectures, and capstone review turn fragments into complete local applications.",
  landmark: "The Application Furnace",
  accent: "amber",
  lessons: [
    lesson({
      id: "python-command-parser",
      title: "Command Parser",
      subtitle: "Turn text commands into structured actions",
      objectives: [
        "Split a command line into tokens",
        "Dispatch by command name",
        "Handle unknown commands predictably",
      ],
      conceptHeading: "A parser turns unstructured text into a deliberate action",
      explanation: [
        "Small local tools often begin with one line of user text. Splitting that text, selecting a command, and validating required arguments makes the program easier to extend.",
        "A command parser should produce stable outcomes for good input and clear feedback for unknown or incomplete input.",
      ],
      bullets: [
        "Normalize command names with lower().",
        "Check argument count before indexing.",
        "Keep output messages consistent.",
      ],
      syntax: "parts = input().split()\ncommand = parts[0].lower()",
      example: {
        title: "Decode one status command",
        description: "The command name selects a branch and the argument becomes data.",
        code: 'raw = "status prism"\nparts = raw.split()\nif parts[0] == "status":\n    print(f"STATUS {parts[1].upper()}")',
        output: "STATUS PRISM",
      },
      fieldNote:
        "Parsing is product design: every invalid input needs a humane, deterministic answer.",
      mistakes: [
        "Indexing parts[1] before checking that it exists.",
        "Treating uppercase and lowercase commands as different by accident.",
        "Returning inconsistent message formats across branches.",
      ],
      tasks: [
        {
          id: "python-command-parser-status",
          title: "Dispatch status",
          description: "Read a command. For status prism print STATUS:PRISM.",
          expectedBehavior: "Print STATUS:PRISM.",
          starterCode: "raw = input()\nparts = raw.split()\n# Decode status command\n",
          expected: "STATUS:PRISM",
          defaultInput: "status prism",
          hints: [
            "The command name is parts[0].lower().",
            "The target is parts[1].upper().",
            "Print only when the command is status for this task.",
          ],
        },
        {
          id: "python-command-parser-unknown",
          title: "Report unknown commands",
          description: "Read a command and print UNKNOWN when the command is not scan.",
          expectedBehavior: "For jump print UNKNOWN.",
          starterCode: "command = input().strip().lower()\n# Accept only scan\n",
          expected: "UNKNOWN",
          defaultInput: "jump",
          hints: [
            'Compare command to "scan".',
            "Use an else branch for the unknown case.",
            "The exact output is uppercase UNKNOWN.",
          ],
        },
      ],
      bonus: {
        id: "python-command-parser-bonus",
        title: "Add and list relics",
        description: "Process three commands, add names to a list, and list them sorted.",
        expectedBehavior: "For add prism, add coil, list print coil,prism.",
        starterCode:
          "commands = [input(), input(), input()]\nrelics = []\n# Process add/list commands\n",
        expected: "coil,prism",
        defaultInput: "add prism\nadd coil\nlist",
        hints: [
          "Loop through commands and split each command.",
          "Append the second token for add.",
          "When the command is list, print sorted relics joined by commas.",
        ],
        discoveryText:
          "The Application Furnace receives its first text-control interface.",
      },
    }),
    lesson({
      id: "python-json-lines",
      title: "JSON Line Signals",
      subtitle: "Serialize small records with the standard library",
      objectives: [
        "Use json.dumps for deterministic text output",
        "Use json.loads to recover structured data",
        "Keep serialized fields stable and explicit",
      ],
      conceptHeading: "JSON is a portable text format for simple data structures",
      explanation: [
        "The json module converts dictionaries, lists, strings, numbers, booleans, and null-like values to text and back. It is ideal for local exports and deterministic lesson data.",
        "Stable JSON output depends on stable field names and predictable ordering when the exact text matters.",
      ],
      bullets: [
        "Use json.dumps(data, sort_keys=True) for stable key ordering.",
        "Use json.loads(text) to parse JSON text.",
        "Do not serialize arbitrary objects without deciding their schema.",
      ],
      syntax: "import json\ntext = json.dumps(data, sort_keys=True)",
      example: {
        title: "Serialize a signal record",
        description: "sort_keys keeps exact output deterministic.",
        code: 'import json\nrecord = {"energy": 42, "name": "prism"}\nprint(json.dumps(record, sort_keys=True))',
        output: '{"energy": 42, "name": "prism"}',
      },
      fieldNote:
        "A serialized record is a contract with tomorrow's program. Name fields carefully.",
      mistakes: [
        "Using Python repr when a JSON string is required.",
        "Depending on accidental key order in exact-output tasks.",
        "Trying to dump unsupported objects instead of a plain dictionary.",
      ],
      tasks: [
        {
          id: "python-json-lines-dumps",
          title: "Serialize one record",
          description:
            "Create a dictionary with name prism and energy 42, then print stable JSON.",
          expectedBehavior: "Print JSON with energy before name.",
          starterCode: "import json\n# Create and serialize the record\n",
          expected: '{"energy": 42, "name": "prism"}',
          hints: [
            "Use a dict with keys name and energy.",
            "Pass sort_keys=True to json.dumps.",
            "Print the result of json.dumps.",
          ],
        },
        {
          id: "python-json-lines-loads",
          title: "Parse one record",
          description: "Parse the JSON string and print prism:42.",
          expectedBehavior: "Print prism:42.",
          starterCode:
            'import json\ntext = \'{"name": "prism", "energy": 42}\'\n# Parse and report\n',
          expected: "prism:42",
          hints: [
            "Use json.loads(text).",
            "The parsed value is a dictionary.",
            "Use an f-string with record['name'] and record['energy'].",
          ],
        },
      ],
      bonus: {
        id: "python-json-lines-bonus",
        title: "Serialize a batch summary",
        description: "Read two names and emit stable JSON with count and sorted names.",
        expectedBehavior:
          'For coil and prism print {"count": 2, "names": ["coil", "prism"]}.',
        starterCode:
          "import json\nnames = [input(), input()]\n# Create a stable summary\n",
        expected: '{"count": 2, "names": ["coil", "prism"]}',
        defaultInput: "coil\nprism",
        hints: [
          "Sort the names before placing them in the dictionary.",
          "Include count: len(names).",
          "Use json.dumps(summary, sort_keys=True).",
        ],
        discoveryText:
          "The local app can now export records without inventing a file server.",
      },
    }),
    lesson({
      id: "python-csv-pipeline",
      title: "CSV Intake Pipeline",
      subtitle: "Process tabular text with deterministic rules",
      objectives: [
        "Split CSV-like lines safely for simple data",
        "Convert numeric fields deliberately",
        "Aggregate rows into a summary",
      ],
      conceptHeading: "A small pipeline transforms raw rows into a reliable report",
      explanation: [
        "A data pipeline can be simple: read rows, split fields, validate or convert values, aggregate, and print a stable summary. The steps matter more than the amount of code.",
        "For production CSV edge cases, Python's csv module handles quoting rules. In this lesson the input is deliberately simple so the transformation remains visible.",
      ],
      bullets: [
        "Separate parsing from aggregation.",
        "Strip fields before converting numbers.",
        "Report exactly one final summary.",
      ],
      syntax: 'name, raw_energy = line.split(",")',
      example: {
        title: "Aggregate two readings",
        description: "Each row contributes one numeric energy value.",
        code: 'rows = ["a,2", "b,5"]\ntotal = 0\nfor row in rows:\n    name, raw = row.split(",")\n    total += int(raw)\nprint(total)',
        output: "7",
      },
      fieldNote: "A pipeline is easier to debug when each stage has a single job.",
      mistakes: [
        "Adding raw strings instead of converted integers.",
        "Printing intermediate debug lines in exact-output tasks.",
        "Ignoring whitespace around fields.",
      ],
      tasks: [
        {
          id: "python-csv-pipeline-total",
          title: "Sum energy rows",
          description: "Process three simple CSV rows and print TOTAL=12.",
          expectedBehavior: "Print TOTAL=12.",
          starterCode: 'rows = ["a,3", "b,4", "c,5"]\ntotal = 0\n# Parse and aggregate\n',
          expected: "TOTAL=12",
          hints: [
            "Loop over rows.",
            "Split each row into name and raw value.",
            "Add int(raw) to total and print once.",
          ],
        },
        {
          id: "python-csv-pipeline-filter",
          title: "Filter active rows",
          description: "Keep rows with status active and print their names joined by |.",
          expectedBehavior: "Print alpha|gamma.",
          starterCode:
            'rows = ["alpha,active", "beta,idle", "gamma,active"]\nactive = []\n# Collect active names\n',
          expected: "alpha|gamma",
          hints: [
            "Split each row into name and status.",
            'Append name only when status == "active".',
            'Use "|".join(active).',
          ],
        },
      ],
      bonus: {
        id: "python-csv-pipeline-bonus",
        title: "Find the strongest row",
        description:
          "Read three name,energy rows and print the name with highest energy.",
        expectedBehavior: "For alpha 5, beta 9, gamma 7 print beta.",
        starterCode: "rows = [input(), input(), input()]\n# Find the strongest row\n",
        expected: "beta",
        defaultInput: "alpha,5\nbeta,9\ngamma,7",
        hints: [
          "Track best_name and best_energy.",
          "Convert the energy field to int.",
          "Update when the new energy is greater than best_energy.",
        ],
        discoveryText: "The app forge can now summarize raw field tables.",
      },
    }),
    lesson({
      id: "python-mini-router",
      title: "Mini Application Router",
      subtitle: "Map command names to small functions",
      objectives: [
        "Store functions in a dictionary",
        "Dispatch a command without a long if chain",
        "Keep command handlers focused",
      ],
      conceptHeading: "A command router connects names to behavior",
      explanation: [
        "When commands grow, a dictionary of handlers can make the program easier to extend. Each handler remains a focused function and the router chooses which one to call.",
        "The router should still protect unknown commands and avoid calling a handler without the required inputs.",
      ],
      bullets: [
        "Define one function per command.",
        "Store functions in a dict keyed by command name.",
        "Look up the handler before calling it.",
      ],
      syntax: 'handlers = {"ping": ping}\nprint(handlers[command]())',
      example: {
        title: "Route a ping command",
        description:
          "The dictionary stores the function object, not the result of calling it.",
        code: 'def ping():\n    return "pong"\n\nhandlers = {"ping": ping}\ncommand = "ping"\nprint(handlers[command]())',
        output: "pong",
      },
      fieldNote:
        "A router is useful when it reduces branching, not when it hides simple logic behind indirection.",
      mistakes: [
        'Writing handlers = {"ping": ping()} and calling the function too early.',
        "Skipping the unknown-command branch.",
        "Making every handler mutate shared global state unnecessarily.",
      ],
      tasks: [
        {
          id: "python-mini-router-ping",
          title: "Route ping",
          description: "Use a handler dictionary so the ping command prints pong.",
          expectedBehavior: "Print pong.",
          starterCode:
            'def ping():\n    return "pong"\n\ncommand = "ping"\n# Build handlers and call the selected function\n',
          expected: "pong",
          hints: [
            "The dictionary value should be ping, not ping().",
            "Look up handlers[command].",
            "Call the returned function with ().",
          ],
        },
        {
          id: "python-mini-router-unknown",
          title: "Guard unknown routes",
          description:
            "Print offline when command is missing from the handlers dictionary.",
          expectedBehavior: "Print offline.",
          starterCode:
            'def scan():\n    return "scanning"\n\nhandlers = {"scan": scan}\ncommand = "jump"\n# Guard lookup before calling\n',
          expected: "offline",
          hints: [
            "Use if command in handlers.",
            "Call the handler only in the true branch.",
            "Print offline in the false branch.",
          ],
        },
      ],
      bonus: {
        id: "python-mini-router-bonus",
        title: "Two route report",
        description:
          "Route status and reset commands from input and print the selected response.",
        expectedBehavior: "For reset print RESET-OK.",
        starterCode:
          "command = input().strip().lower()\n# Define two handlers and route the command\n",
        expected: "RESET-OK",
        defaultInput: "reset",
        hints: [
          "Define status() and reset() functions.",
          "Use a handlers dictionary with both commands.",
          "Print UNKNOWN if the command is absent, though the sample is reset.",
        ],
        discoveryText: "The app forge now has a maintainable command dispatch surface.",
      },
    }),
    lesson({
      id: "python-capstone-text-adventure-core",
      title: "Capstone Core: Text Expedition",
      subtitle: "Model rooms, commands, and state in a browser-safe project",
      objectives: [
        "Represent a tiny world as dictionaries",
        "Move through state using commands",
        "Print deterministic acceptance-test output",
      ],
      conceptHeading: "A capstone combines data modeling, parsing, and state transitions",
      explanation: [
        "A text expedition is small enough for Pyodide but rich enough to require architecture. Rooms are data, commands are parsed input, and player location is state updated by rules.",
        "A good capstone acceptance test avoids randomness and host-file dependencies so the project remains reliable in a static browser app.",
      ],
      bullets: [
        "Keep the map as plain dictionaries.",
        "Keep command parsing separate from state updates.",
        "Print a stable final summary for validation.",
      ],
      syntax: 'rooms = {"atrium": {"east": "lab"}}',
      example: {
        title: "Move once through a room map",
        description: "The location changes only when a valid exit exists.",
        code: 'rooms = {"atrium": {"east": "lab"}, "lab": {}}\nlocation = "atrium"\ncommand = "east"\nlocation = rooms[location].get(command, location)\nprint(location)',
        output: "lab",
      },
      fieldNote:
        "Capstone code should read like a system: data, rules, interface, and tests are visible.",
      mistakes: [
        "Hard-coding only the sample command instead of using the map.",
        "Mutating the map when only the current location should change.",
        "Using random events that make acceptance tests unstable.",
      ],
      tasks: [
        {
          id: "python-capstone-text-adventure-core-move",
          title: "Move through two rooms",
          description:
            "Use the room map and commands east then north to finish at vault.",
          expectedBehavior: "Print vault.",
          starterCode:
            'rooms = {\n    "atrium": {"east": "lab"},\n    "lab": {"north": "vault"},\n    "vault": {},\n}\ncommands = ["east", "north"]\nlocation = "atrium"\n# Apply commands through the map\n',
          expected: "vault",
          hints: [
            "Loop over commands.",
            "Use rooms[location].get(command, location).",
            "Print the location after processing all commands.",
          ],
        },
        {
          id: "python-capstone-text-adventure-core-invalid",
          title: "Ignore invalid exits",
          description:
            "Apply west then east. Invalid west keeps the player in atrium before east moves to lab.",
          expectedBehavior: "Print lab.",
          starterCode:
            'rooms = {"atrium": {"east": "lab"}, "lab": {}}\ncommands = ["west", "east"]\nlocation = "atrium"\n# Invalid exits should not move the player\n',
          expected: "lab",
          hints: [
            "The dictionary get method can provide the current location as fallback.",
            "Do not create a new room called west.",
            "Print once after all commands.",
          ],
        },
      ],
      bonus: {
        id: "python-capstone-text-adventure-core-bonus",
        title: "Collect one relic",
        description:
          "Move to lab, collect the relic there, and print LOCATION=lab and RELICS=coil.",
        expectedBehavior: "Print two final summary lines.",
        starterCode:
          'rooms = {\n    "atrium": {"east": "lab", "item": None},\n    "lab": {"west": "atrium", "item": "coil"},\n}\nlocation = "atrium"\nrelics = []\ncommands = ["east", "take"]\n# Move and collect\n',
        expected: "LOCATION=lab\nRELICS=coil",
        hints: [
          "For directional commands, update location through the room map.",
          "For take, append the current room's item when it exists.",
          "Print the final location and comma-joined relics.",
        ],
        discoveryText: "A complete local-first Python capstone core is now operational.",
      },
    }),
    lesson({
      id: "python-capstone-review",
      title: "Capstone Review Console",
      subtitle: "Inspect a project against acceptance criteria",
      objectives: [
        "Convert requirements into checks",
        "Report pass and fail counts",
        "Keep review output clear and actionable",
      ],
      conceptHeading: "A review console translates requirements into visible evidence",
      explanation: [
        "A capstone is not finished because code exists. It is finished when the implementation satisfies concrete acceptance criteria and reports useful evidence when it does not.",
        "A local review console can run deterministic checks against functions or data and summarize the result without external services.",
      ],
      bullets: [
        "Write each criterion as a boolean check.",
        "Name what each check protects.",
        "Summarize counts and failing labels.",
      ],
      syntax: 'checks = [("moves east", location == "lab")]',
      example: {
        title: "Summarize two checks",
        description: "The report exposes both total pass count and failure labels.",
        code: 'checks = [("map exists", True), ("has exit", True)]\npassed = sum(1 for _, ok in checks if ok)\nprint(f"PASS={passed}/{len(checks)}")',
        output: "PASS=2/2",
      },
      fieldNote:
        "A review console is a teaching instrument: it tells the learner what to inspect next.",
      mistakes: [
        "Only checking that the program prints something.",
        "Hiding which requirement failed.",
        "Mixing review logic with random or time-dependent behavior.",
      ],
      tasks: [
        {
          id: "python-capstone-review-pass-count",
          title: "Count passing checks",
          description: "Given three checks, print PASS=2/3.",
          expectedBehavior: "Print PASS=2/3.",
          starterCode:
            'checks = [("map", True), ("movement", True), ("inventory", False)]\n# Count passing checks\n',
          expected: "PASS=2/3",
          hints: [
            "Each check is a pair of label and boolean.",
            "Sum 1 for each ok value that is true.",
            "len(checks) gives the denominator.",
          ],
        },
        {
          id: "python-capstone-review-failures",
          title: "Report failing labels",
          description: "Print the names of failed checks joined by commas.",
          expectedBehavior: "Print inventory,ending.",
          starterCode:
            'checks = [("map", True), ("inventory", False), ("ending", False)]\n# Collect failed labels\n',
          expected: "inventory,ending",
          hints: [
            "Keep labels where ok is false.",
            "A list comprehension is concise here.",
            "Join the failed labels with commas.",
          ],
        },
      ],
      bonus: {
        id: "python-capstone-review-bonus",
        title: "Acceptance report",
        description: "Print PASS=3/4 and FAIL=inventory for the supplied checks.",
        expectedBehavior: "Print two review lines.",
        starterCode:
          'checks = [("map", True), ("move", True), ("inventory", False), ("summary", True)]\n# Build the acceptance report\n',
        expected: "PASS=3/4\nFAIL=inventory",
        hints: [
          "Calculate pass count and failed labels separately.",
          "Use len(checks) for the total.",
          "Join failed labels even when there is only one.",
        ],
        discoveryText:
          "The learner can now finish a project with evidence instead of hope.",
      },
    }),
  ],
};
