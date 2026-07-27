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

export const cppV5World: CurriculumWorldSpec = {
  id: "ownership-forge",
  title: "Ownership Forge",
  subtitle: "Modern C++ source architecture with explicit lifetime contracts",
  description: "Const correctness, RAII, smart pointers, move semantics, templates, and ownership capstones expand C++ without claiming unavailable native execution.",
  landmark: "The Lifetime Furnace",
  accent: "lime",
  lessons: [
    lesson({
      id: "cpp-const-correctness-v5",
      title: "Const-Correct Interfaces",
      subtitle: "Protect values through read-only contracts",
      objectives: ["Use const references for input parameters", "Mark observer methods const", "Avoid unnecessary copies"],
      conceptHeading: "Const correctness communicates which code may modify state",
      explanation: ["C++ APIs become easier to reason about when read-only inputs are passed as const references and observer methods are marked const. This preserves value semantics without accidental mutation.", "Structural validation can inspect signatures and const placement, while a native compiler remains the authority for full C++ diagnostics."],
      bullets: ["Use const std::string& for read-only string parameters.", "Mark getters as const.", "Return values deliberately."],
      syntax: "std::string label(const std::string& name) const;",
      example: {
        title: "Read-only parameter",
        description: "The function can read name without copying or modifying it.",
        code: "std::string format(const std::string& name) {\n    return \"NX-\" + name;\n}",
        output: "",
      },
      fieldNote: "Const is a design signal as much as a compiler rule.",
      mistakes: ["Passing large objects by value by habit.", "Forgetting const on observer methods.", "Using const_cast to escape a poor interface."],
      tasks: [
        { id: "cpp-const-correctness-v5-param", title: "Use a const reference parameter", description: "Declare format taking const std::string& name.", expectedBehavior: "Source contains const std::string& parameter.", starterCode: "#include <string>\n// Declare format\n", expected: "format\\s*\\(\\s*const\\s+std::string\\s*&\\s*name\\s*\\)", hints: ["The const comes before std::string.", "Use & to pass by reference.", "The parameter name is name."] },
        { id: "cpp-const-correctness-v5-method", title: "Mark getter const", description: "Create a class Signal with getEnergy() const.", expectedBehavior: "Source contains getEnergy method marked const.", starterCode: "class Signal {\n    int energy;\npublic:\n    // Add observer\n};", expected: "int\\s+getEnergy\\s*\\(\\s*\\)\\s*const", hints: ["Observer methods do not change the object.", "Place const after the parameter list.", "Return the energy field."] },
      ],
      bonus: { id: "cpp-const-correctness-v5-bonus", title: "Const vector report", description: "Declare total taking const std::vector<int>& readings.", expectedBehavior: "Source contains const vector reference.", starterCode: "#include <vector>\n// Declare total\n", expected: "total\\s*\\(\\s*const\\s+std::vector\\s*<\\s*int\\s*>\\s*&\\s*readings\\s*\\)", hints: ["Use const std::vector<int>&.", "The parameter name is readings.", "Return type can be int."], discoveryText: "The memory engine now marks read-only pathways explicitly." },
    }),
    lesson({
      id: "cpp-raii-ownership-v5",
      title: "RAII Ownership Shells",
      subtitle: "Tie resource lifetime to object lifetime",
      objectives: ["Explain RAII ownership", "Use constructors and destructors for lifecycle boundaries", "Avoid manual lifetime leaks in design"],
      conceptHeading: "RAII puts acquisition and release inside object lifetime",
      explanation: ["Resource Acquisition Is Initialization means a resource is acquired by an object and released when that object is destroyed. This pattern underpins safe C++ resource management.", "In modern C++, standard containers and smart pointers are common RAII tools; manual new/delete should be exceptional and justified."],
      bullets: ["Acquire in constructors or factory functions.", "Release in destructors when owning raw resources.", "Prefer standard RAII types."],
      syntax: "class Handle { public: Handle(); ~Handle(); };",
      example: {
        title: "Lifecycle skeleton",
        description: "The destructor is the release boundary.",
        code: "class Session {\npublic:\n    Session();\n    ~Session();\n};",
        output: "",
      },
      fieldNote: "RAII is architectural: it says exactly who owns cleanup.",
      mistakes: ["Allocating with new without a clear owner.", "Writing a destructor for objects that standard containers already manage.", "Copying owning objects without defining copy behavior."],
      tasks: [
        { id: "cpp-raii-ownership-v5-destructor", title: "Add lifecycle boundaries", description: "Create Session with constructor and destructor declarations.", expectedBehavior: "Source contains Session() and ~Session().", starterCode: "class Session {\npublic:\n    // Add constructor and destructor\n};", expected: "Session\\s*\\(\\s*\\)[\\s\\S]*~\\s*Session\\s*\\(\\s*\\)", hints: ["The constructor has the class name.", "The destructor starts with ~.", "Both declarations belong under public."] },
        { id: "cpp-raii-ownership-v5-no-copy", title: "Disable copying for an owner", description: "Delete copy constructor and copy assignment for UniqueHandle.", expectedBehavior: "Source contains deleted copy operations.", starterCode: "class UniqueHandle {\npublic:\n    // Delete copy operations\n};", expected: "UniqueHandle\\s*\\(\\s*const\\s+UniqueHandle\\s*&\\s*\\)\\s*=\\s*delete[\\s\\S]*operator\\s*=\\s*\\(\\s*const\\s+UniqueHandle\\s*&\\s*\\)\\s*=\\s*delete", hints: ["The copy constructor takes const UniqueHandle&.", "The assignment operator also takes const UniqueHandle&.", "Use = delete for both."] },
      ],
      bonus: { id: "cpp-raii-ownership-v5-bonus", title: "Prefer vector ownership", description: "Declare a class Archive that owns std::vector<int> readings.", expectedBehavior: "Source contains vector member instead of raw pointer.", starterCode: "#include <vector>\nclass Archive {\n    // Own readings safely\n};", expected: "std::vector\\s*<\\s*int\\s*>\\s+readings", hints: ["Use std::vector<int> as a member.", "Avoid int* for this task.", "The vector manages its own memory."], discoveryText: "The C++ track now centers lifetime as a design boundary." },
    }),
    lesson({
      id: "cpp-smart-pointers-v5",
      title: "Smart Pointer Topology",
      subtitle: "Represent ownership with unique_ptr and shared_ptr",
      objectives: ["Choose unique ownership for exclusive resources", "Recognize shared ownership tradeoffs", "Use make_unique-style construction"],
      conceptHeading: "Smart pointers encode ownership in the type system",
      explanation: ["std::unique_ptr represents exclusive ownership and transfers through moves. std::shared_ptr represents shared ownership with reference counting, which is useful but should not be the default.", "Use smart pointers to make ownership visible instead of hiding it in comments."],
      bullets: ["Prefer unique_ptr for single ownership.", "Use make_unique where available.", "Use shared_ptr only when ownership is genuinely shared."],
      syntax: "std::unique_ptr<Node> node;",
      example: {
        title: "Unique pointer member",
        description: "The member says this object owns one Node.",
        code: "#include <memory>\nstruct Node {};\nstd::unique_ptr<Node> node;",
        output: "",
      },
      fieldNote: "Structural checks look for ownership signals; native compilation remains required for full template validation.",
      mistakes: ["Using shared_ptr because it feels convenient.", "Copying unique_ptr instead of moving it.", "Combining raw owning pointers with unclear cleanup."],
      tasks: [
        { id: "cpp-smart-pointers-v5-unique-member", title: "Declare unique ownership", description: "Add std::unique_ptr<Node> child to Node.", expectedBehavior: "Source contains unique_ptr<Node> child.", starterCode: "#include <memory>\nstruct Node {\n    // Add owned child\n};", expected: "std::unique_ptr\\s*<\\s*Node\\s*>\\s+child", hints: ["Include <memory>.", "Use std::unique_ptr<Node>.", "Name the member child."] },
        { id: "cpp-smart-pointers-v5-make-unique", title: "Construct with make_unique", description: "Create auto node = std::make_unique<Node>();", expectedBehavior: "Source contains make_unique<Node>().", starterCode: "#include <memory>\nstruct Node {};\nvoid build() {\n    // Construct a node\n}", expected: "std::make_unique\\s*<\\s*Node\\s*>\\s*\\(", hints: ["Use std::make_unique.", "The template argument is Node.", "Store the result in a variable."] },
      ],
      bonus: { id: "cpp-smart-pointers-v5-bonus", title: "Show shared ownership deliberately", description: "Declare std::shared_ptr<Signal> only for a shared registry entry.", expectedBehavior: "Source contains shared_ptr<Signal>.", starterCode: "#include <memory>\nstruct Signal {};\nstruct Registry {\n    // Add shared entry\n};", expected: "std::shared_ptr\\s*<\\s*Signal\\s*>", hints: ["Use std::shared_ptr only because the prompt asks for shared registry ownership.", "Include <memory>.", "Name the member clearly."], discoveryText: "Ownership now appears in source types instead of hidden comments." },
    }),
    lesson({
      id: "cpp-move-semantics-v5",
      title: "Move Semantics Corridors",
      subtitle: "Transfer ownership without copying",
      objectives: ["Recognize std::move as an explicit transfer", "Declare move constructor shape", "Avoid using moved-from values as if unchanged"],
      conceptHeading: "Move semantics let resources transfer from one object to another",
      explanation: ["Moving is useful when copying would be expensive or impossible, especially for owning objects. std::move does not move by itself; it casts a value so a move operation may be selected.", "Moved-from objects remain valid but unspecified, so code should not depend on their previous contents."],
      bullets: ["Use std::move to request transfer.", "Declare move operations with && parameters.", "Leave moved-from objects in a safe state."],
      syntax: "Owner(Owner&& other) noexcept;",
      example: {
        title: "Move constructor shape",
        description: "The rvalue-reference parameter identifies move construction.",
        code: "class Owner {\npublic:\n    Owner(Owner&& other) noexcept;\n};",
        output: "",
      },
      fieldNote: "Move semantics are about ownership clarity, not faster-looking syntax.",
      mistakes: ["Calling std::move and then using the old value as if unchanged.", "Forgetting noexcept on move operations used by containers.", "Writing move operations when standard members already handle ownership."],
      tasks: [
        { id: "cpp-move-semantics-v5-constructor", title: "Declare a move constructor", description: "Declare Buffer(Buffer&& other) noexcept.", expectedBehavior: "Source contains move constructor with noexcept.", starterCode: "class Buffer {\npublic:\n    // Add move constructor declaration\n};", expected: "Buffer\\s*\\(\\s*Buffer\\s*&&\\s*other\\s*\\)\\s*noexcept", hints: ["Use Buffer&& other.", "Place noexcept after the parameter list.", "This is a declaration shape task."] },
        { id: "cpp-move-semantics-v5-stdmove", title: "Use std::move for transfer", description: "Assign target = std::move(source);.", expectedBehavior: "Source contains std::move(source).", starterCode: "#include <utility>\nvoid transfer() {\n    Buffer source;\n    Buffer target;\n    // Transfer source into target\n}", expected: "target\\s*=\\s*std::move\\s*\\(\\s*source\\s*\\)", hints: ["Include <utility>.", "std::move receives source.", "Assign the result to target."] },
      ],
      bonus: { id: "cpp-move-semantics-v5-bonus", title: "Delete copy and allow move", description: "For UniqueBuffer, delete copy constructor and declare move constructor.", expectedBehavior: "Source contains deleted copy and move constructor.", starterCode: "class UniqueBuffer {\npublic:\n    // Ownership operations\n};", expected: "UniqueBuffer\\s*\\(\\s*const\\s+UniqueBuffer\\s*&\\s*\\)\\s*=\\s*delete[\\s\\S]*UniqueBuffer\\s*\\(\\s*UniqueBuffer\\s*&&\\s*other\\s*\\)\\s*noexcept", hints: ["Delete the const-reference copy constructor.", "Declare a move constructor with &&.", "Add noexcept to the move constructor."], discoveryText: "The memory engine can now describe transfer rather than accidental copying." },
    }),
    lesson({
      id: "cpp-template-algorithms-v5",
      title: "Template Algorithm Patterns",
      subtitle: "Write generic behavior around iterators",
      objectives: ["Recognize template function declarations", "Use iterator-like ranges", "Prefer standard algorithms when available"],
      conceptHeading: "Templates let C++ express algorithms over multiple compatible types",
      explanation: ["A template function can operate on different types while preserving compile-time type checking. The standard library builds many algorithms around iterator ranges for this reason.", "Generic code should state minimal requirements clearly and avoid assuming more operations than necessary."],
      bullets: ["Declare template parameters before the function.", "Accept iterator pairs for ranges.", "Use standard algorithms for established patterns."],
      syntax: "template <typename It> int count_items(It first, It last);",
      example: {
        title: "Template declaration",
        description: "The function can accept different iterator types.",
        code: "template <typename It>\nint count_items(It first, It last);",
        output: "",
      },
      fieldNote: "Structural validation checks generic shape, not instantiation behavior.",
      mistakes: ["Writing templates that assume hidden concrete types.", "Using raw loops when a standard algorithm communicates intent better.", "Forgetting that templates are checked when instantiated."],
      tasks: [
        { id: "cpp-template-algorithms-v5-template", title: "Declare a template function", description: "Declare template <typename T> T identity(T value).", expectedBehavior: "Source contains template and identity signature.", starterCode: "// Declare generic identity\n", expected: "template\\s*<\\s*typename\\s+T\\s*>[\\s\\S]*T\\s+identity\\s*\\(\\s*T\\s+value\\s*\\)", hints: ["Write the template line first.", "Return type is T.", "Parameter type is T."] },
        { id: "cpp-template-algorithms-v5-iterator", title: "Accept iterator pair", description: "Declare count_items(It first, It last).", expectedBehavior: "Source contains typename It and iterator pair parameters.", starterCode: "// Declare iterator-based count_items\n", expected: "template\\s*<\\s*typename\\s+It\\s*>[\\s\\S]*count_items\\s*\\(\\s*It\\s+first\\s*,\\s*It\\s+last\\s*\\)", hints: ["Use template <typename It>.", "Both parameters have type It.", "Name them first and last."] },
      ],
      bonus: { id: "cpp-template-algorithms-v5-bonus", title: "Use std::count_if shape", description: "Include an expression that calls std::count_if(first, last, predicate).", expectedBehavior: "Source contains std::count_if call.", starterCode: "#include <algorithm>\n// Use count_if in a generic helper\n", expected: "std::count_if\\s*\\(\\s*first\\s*,\\s*last\\s*,", hints: ["Include <algorithm>.", "The first arguments are first and last.", "The third argument is a predicate."], discoveryText: "The C++ path now reaches generic algorithm design." },
    }),
    lesson({
      id: "cpp-ownership-capstone-v5",
      title: "Ownership Capstone Skeleton",
      subtitle: "Design a small graph with explicit lifetime rules",
      objectives: ["Represent nodes with unique ownership", "Prevent accidental copies", "Document traversal without unsafe lifetime shortcuts"],
      conceptHeading: "A C++ capstone should make ownership and traversal contracts visible",
      explanation: ["A graph-like project can quickly become unsafe if ownership is unclear. This capstone skeleton uses explicit containers, smart pointers, deleted copy operations, and traversal signatures to show the architecture before native compilation.", "The browser validates source structure honestly; a local C++ compiler remains required for executable behavior."],
      bullets: ["Use containers or smart pointers for ownership.", "Delete copying when an object uniquely owns resources.", "Keep traversal parameters const when read-only."],
      syntax: "std::vector<std::unique_ptr<Node>> nodes;",
      example: {
        title: "Owned node collection",
        description: "The vector owns unique node pointers.",
        code: "#include <memory>\n#include <vector>\nstruct Node {};\nstd::vector<std::unique_ptr<Node>> nodes;",
        output: "",
      },
      fieldNote: "Ownership is the acceptance criterion: every resource should have a visible owner.",
      mistakes: ["Using raw Node* as the owning container element.", "Allowing accidental copies of owning graph objects.", "Traversing through mutable references when reading is enough."],
      tasks: [
        { id: "cpp-ownership-capstone-v5-owned-nodes", title: "Own graph nodes", description: "Declare Graph with vector<unique_ptr<Node>> nodes.", expectedBehavior: "Source contains vector of unique_ptr<Node>.", starterCode: "#include <memory>\n#include <vector>\nstruct Node {};\nclass Graph {\n    // Own nodes\n};", expected: "std::vector\\s*<\\s*std::unique_ptr\\s*<\\s*Node\\s*>\\s*>\\s+nodes", hints: ["Use std::vector as the collection.", "Use std::unique_ptr<Node> as the element type.", "Name the member nodes."] },
        { id: "cpp-ownership-capstone-v5-no-copy", title: "Prevent graph copy", description: "Delete Graph copy constructor and copy assignment.", expectedBehavior: "Source contains deleted copy operations.", starterCode: "class Graph {\npublic:\n    // Delete copying\n};", expected: "Graph\\s*\\(\\s*const\\s+Graph\\s*&\\s*\\)\\s*=\\s*delete[\\s\\S]*operator\\s*=\\s*\\(\\s*const\\s+Graph\\s*&\\s*\\)\\s*=\\s*delete", hints: ["Copy constructor takes const Graph&.", "Assignment operator takes const Graph&.", "Both use = delete."] },
      ],
      bonus: { id: "cpp-ownership-capstone-v5-bonus", title: "Traversal read contract", description: "Declare visitAll(const Graph& graph).", expectedBehavior: "Source contains const Graph& traversal parameter.", starterCode: "class Graph {};\n// Declare read-only traversal\n", expected: "visitAll\\s*\\(\\s*const\\s+Graph\\s*&\\s*graph\\s*\\)", hints: ["Use const Graph&.", "Name the parameter graph.", "The function may return void."], discoveryText: "The C++ track now ends with ownership-aware project architecture." },
    })
  ],
};
