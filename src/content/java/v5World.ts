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

export const javaV5World: CurriculumWorldSpec = {
  id: "java-architecture-vault",
  title: "Java Architecture Vault",
  subtitle: "Java 8 object-oriented design with honest structural analysis",
  description: "Immutable objects, interfaces, generics, streams, exceptions, and capstone skeletons deepen the Java path without pretending browser compilation exists.",
  landmark: "The Object Vault",
  accent: "violet",
  lessons: [
    lesson({
      id: "java-immutable-objects-v5",
      title: "Immutable Object Contracts",
      subtitle: "Construct objects that cannot drift after creation",
      objectives: ["Use private final fields", "Initialize all fields in the constructor", "Expose state through getters without setters"],
      conceptHeading: "An immutable object keeps its observable state stable after construction",
      explanation: ["In Java 8, private final fields plus constructor validation can create simple immutable objects. This makes reasoning and testing easier because object state cannot change unexpectedly.", "Immutability is especially useful for value objects such as coordinates, identifiers, and configuration records."],
      bullets: ["Make fields private final.", "Validate constructor arguments before assignment.", "Do not add mutating setters."],
      syntax: "public final class Coordinate { private final int x; }",
      example: {
        title: "Immutable signal",
        description: "A final field is assigned once by the constructor.",
        code: "public final class Signal {\n  private final String name;\n  public Signal(String name) { this.name = name; }\n  public String getName() { return name; }\n}",
        output: "",
      },
      fieldNote: "Structural validation checks the source contract; compile with Java 8 locally for full compiler diagnostics.",
      mistakes: ["Leaving fields public.", "Adding setters to an intended value object.", "Forgetting to assign every final field in the constructor."],
      tasks: [
        { id: "java-immutable-objects-v5-fields", title: "Declare final fields", description: "Create a final Coordinate class with private final x and y int fields.", expectedBehavior: "Source contains final class and private final fields.", starterCode: "// Build the immutable Coordinate value object\n", expected: "final\\s+class\\s+Coordinate[\\s\\S]*private\\s+final\\s+int\\s+x[\\s\\S]*private\\s+final\\s+int\\s+y", hints: ["Use public final class Coordinate.", "Declare private final int x; and y;.", "Do not make fields public."] },
        { id: "java-immutable-objects-v5-constructor", title: "Initialize through constructor", description: "Add a constructor assigning x and y and getter methods.", expectedBehavior: "Source contains constructor assignments and getters.", starterCode: "public final class Coordinate {\n  private final int x;\n  private final int y;\n  // Add constructor and getters\n}", expected: "Coordinate\\s*\\(\\s*int\\s+x\\s*,\\s*int\\s+y\\s*\\)[\\s\\S]*this\\.x\\s*=\\s*x[\\s\\S]*this\\.y\\s*=\\s*y[\\s\\S]*int\\s+getX\\s*\\(", hints: ["The constructor name matches the class.", "Assign this.x and this.y.", "A getter returns the stored field."] },
      ],
      bonus: { id: "java-immutable-objects-v5-bonus", title: "Reject invalid energy", description: "In Signal constructor, throw IllegalArgumentException for negative energy.", expectedBehavior: "Source validates before assignment.", starterCode: "public final class Signal {\n  private final int energy;\n  // Add constructor validation\n}", expected: "if\\s*\\([^)]*energy\\s*<\\s*0[\\s\\S]*throw\\s+new\\s+IllegalArgumentException", hints: ["Check the constructor parameter.", "Throw IllegalArgumentException before assignment.", "Then assign this.energy = energy."], discoveryText: "The Java vault now protects value objects from state drift." },
    }),
    lesson({
      id: "java-interface-services-v5",
      title: "Interface Service Ports",
      subtitle: "Depend on behavior rather than concrete implementations",
      objectives: ["Define a small interface", "Implement it in a class", "Accept the interface as a dependency"],
      conceptHeading: "An interface names behavior a caller can rely on",
      explanation: ["Interfaces let Java code depend on a capability instead of a concrete class. This improves substitution and testability when a service can have more than one implementation.", "A small interface is better than a broad one because implementers have fewer methods to satisfy and callers know exactly what is required."],
      bullets: ["Use interface for the contract.", "Use implements in the concrete class.", "Accept the interface type in collaborators."],
      syntax: "interface Formatter { String format(String value); }",
      example: {
        title: "Formatting port",
        description: "The class implements the interface method.",
        code: "interface Formatter { String format(String value); }\nclass UpperFormatter implements Formatter {\n  public String format(String value) { return value.toUpperCase(); }\n}",
        output: "",
      },
      fieldNote: "Interface validation is structural here; Java compilation remains an honest external step.",
      mistakes: ["Making the interface too broad.", "Forgetting public on implemented interface methods.", "Depending on the concrete class in every caller."],
      tasks: [
        { id: "java-interface-services-v5-contract", title: "Define a formatter port", description: "Create interface Formatter with String format(String value).", expectedBehavior: "Source contains interface and method signature.", starterCode: "// Define the formatter contract\n", expected: "interface\\s+Formatter[\\s\\S]*String\\s+format\\s*\\(\\s*String\\s+value\\s*\\)", hints: ["Use the interface keyword.", "The method has no body inside the interface.", "Return type is String."] },
        { id: "java-interface-services-v5-implementation", title: "Implement uppercase formatter", description: "Create UpperFormatter implements Formatter and implement format.", expectedBehavior: "Source contains implements and public format method.", starterCode: "interface Formatter {\n  String format(String value);\n}\n\n// Implement UpperFormatter\n", expected: "class\\s+UpperFormatter\\s+implements\\s+Formatter[\\s\\S]*public\\s+String\\s+format\\s*\\(\\s*String\\s+value\\s*\\)", hints: ["Use implements Formatter.", "Implemented interface methods should be public.", "Return value.toUpperCase()."] },
      ],
      bonus: { id: "java-interface-services-v5-bonus", title: "Inject a formatter", description: "Create Reporter with a Formatter field supplied by constructor.", expectedBehavior: "Source contains Formatter field and constructor dependency.", starterCode: "interface Formatter { String format(String value); }\nclass Reporter {\n  // Store a formatter dependency\n}", expected: "private\\s+final\\s+Formatter\\s+formatter[\\s\\S]*Reporter\\s*\\(\\s*Formatter\\s+formatter\\s*\\)", hints: ["Use a private final field of type Formatter.", "The constructor parameter should also be Formatter.", "Assign this.formatter = formatter."], discoveryText: "The Java path now has explicit service ports for testable architecture." },
    }),
    lesson({
      id: "java-generics-repository-v5",
      title: "Generic Repository Patterns",
      subtitle: "Use type parameters for reusable containers",
      objectives: ["Declare a generic class", "Store typed collections", "Return values without casts"],
      conceptHeading: "Generics let one class preserve specific element types",
      explanation: ["A generic class such as Box<T> can hold different types while preserving compile-time type information. The user of Box<String> should not need a cast when retrieving a String.", "Java collections rely heavily on generics, so understanding type parameters is essential for safe APIs."],
      bullets: ["Declare the type parameter after the class name.", "Use T consistently for stored values.", "Prefer typed collections such as List<String>."],
      syntax: "class Box<T> { private T value; }",
      example: {
        title: "Generic box",
        description: "The same class can hold String or Integer values.",
        code: "class Box<T> {\n  private T value;\n  public Box(T value) { this.value = value; }\n  public T getValue() { return value; }\n}",
        output: "",
      },
      fieldNote: "Generics are static structure; source analysis checks the shape but does not compile bytecode.",
      mistakes: ["Using raw List without a type parameter.", "Returning Object from a generic container.", "Shadowing type names with confusing identifiers."],
      tasks: [
        { id: "java-generics-repository-v5-box", title: "Create a generic box", description: "Declare class Box<T> with private T value.", expectedBehavior: "Source contains generic class and T field.", starterCode: "// Build a generic Box\n", expected: "class\\s+Box\\s*<\\s*T\\s*>[\\s\\S]*private\\s+T\\s+value", hints: ["Put <T> after Box.", "Use private T value;.", "T is the placeholder type."] },
        { id: "java-generics-repository-v5-getter", title: "Return the generic value", description: "Add constructor and getValue returning T.", expectedBehavior: "Source contains constructor and T getValue method.", starterCode: "class Box<T> {\n  private T value;\n  // Add constructor and getter\n}", expected: "Box\\s*\\(\\s*T\\s+value\\s*\\)[\\s\\S]*this\\.value\\s*=\\s*value[\\s\\S]*T\\s+getValue\\s*\\(", hints: ["The constructor parameter type is T.", "Assign this.value.", "The getter return type is T."] },
      ],
      bonus: { id: "java-generics-repository-v5-bonus", title: "Typed list field", description: "Create Repository with private List<String> names initialized as ArrayList<>.", expectedBehavior: "Source contains typed List and ArrayList.", starterCode: "import java.util.*;\nclass Repository {\n  // Add typed collection field\n}", expected: "private\\s+[^;]*List\\s*<\\s*String\\s*>\\s+names[\\s\\S]*new\\s+ArrayList\\s*<\\s*>\\s*\\(", hints: ["Use List<String> for the field type.", "Use new ArrayList<>() for initialization.", "Keep the field private."], discoveryText: "The Java vault now models reusable typed containers." },
    }),
    lesson({
      id: "java-streams-java8-v5",
      title: "Java 8 Stream Pipelines",
      subtitle: "Filter, map, and collect collection data",
      objectives: ["Recognize stream pipeline stages", "Use filter and map shape", "Collect results into a list"],
      conceptHeading: "A stream pipeline describes staged transformation of collection values",
      explanation: ["Java 8 streams let a collection flow through filter, map, and collect operations. The code reads as a data transformation pipeline rather than a manual loop.", "Streams should remain understandable: if a pipeline hides too much logic, extract named helper methods."],
      bullets: ["Start with collection.stream().", "Use filter for selection.", "Use map for transformation and collect for results."],
      syntax: "names.stream().filter(name -> name.length() > 3).collect(Collectors.toList())",
      example: {
        title: "Filter names",
        description: "The pipeline keeps names longer than three characters.",
        code: "names.stream()\n  .filter(name -> name.length() > 3)\n  .collect(Collectors.toList());",
        output: "",
      },
      fieldNote: "This lesson validates Java 8 source structure; run locally for actual stream compiler checks.",
      mistakes: ["Forgetting to import Collectors.", "Using streams for side effects only.", "Making lambdas too complex to read."],
      tasks: [
        { id: "java-streams-java8-v5-filter", title: "Write a filter pipeline", description: "Use stream and filter to keep names longer than 3.", expectedBehavior: "Source contains stream, filter, and length check.", starterCode: "import java.util.*;\nimport java.util.stream.*;\nclass Signals {\n  List<String> active(List<String> names) {\n    // Return filtered names\n  }\n}", expected: "names\\.stream\\s*\\(\\s*\\)[\\s\\S]*filter\\s*\\([^)]*length\\s*\\(\\s*\\)\\s*>\\s*3[\\s\\S]*collect\\s*\\(\\s*Collectors\\.toList\\s*\\(\\s*\\)", hints: ["Start from names.stream().", "Use a lambda inside filter.", "End with collect(Collectors.toList())."] },
        { id: "java-streams-java8-v5-map", title: "Map to uppercase", description: "Use map to uppercase every name.", expectedBehavior: "Source contains map and toUpperCase.", starterCode: "import java.util.*;\nimport java.util.stream.*;\nclass Signals {\n  List<String> normalize(List<String> names) {\n    // Return uppercase names\n  }\n}", expected: "names\\.stream\\s*\\(\\s*\\)[\\s\\S]*map\\s*\\([^)]*toUpperCase\\s*\\(\\s*\\)[\\s\\S]*collect", hints: ["Use names.stream().", "Use map(name -> name.toUpperCase()).", "Collect the result into a list."] },
      ],
      bonus: { id: "java-streams-java8-v5-bonus", title: "Filter then map", description: "Keep names starting with p and uppercase them.", expectedBehavior: "Source contains filter, startsWith, map, and collect.", starterCode: "import java.util.*;\nimport java.util.stream.*;\nclass Signals {\n  List<String> prismOnly(List<String> names) {\n    // Filter and normalize\n  }\n}", expected: "filter\\s*\\([^)]*startsWith\\s*\\(\\s*\"p\"\\s*\\)[\\s\\S]*map\\s*\\([^)]*toUpperCase\\s*\\(\\s*\\)[\\s\\S]*collect", hints: ["Filter before map.", "Use startsWith(\"p\").", "Map remaining names to uppercase."], discoveryText: "The Java path now includes honest Java 8 stream reasoning." },
    }),
    lesson({
      id: "java-exception-boundaries-v5",
      title: "Exception Boundaries",
      subtitle: "Signal invalid state deliberately",
      objectives: ["Throw specific exceptions", "Catch expected failures narrowly", "Avoid swallowing programming errors"],
      conceptHeading: "Exceptions mark a boundary where normal flow cannot continue safely",
      explanation: ["Java methods should throw clear exceptions when preconditions are violated. Callers may catch expected exceptions at the boundary where recovery is possible.", "A broad catch hides defects. A focused exception communicates what actually failed."],
      bullets: ["Use IllegalArgumentException for invalid arguments.", "Keep try blocks small.", "Catch the narrow type you can recover from."],
      syntax: "if (value < 0) throw new IllegalArgumentException(\"value\");",
      example: {
        title: "Reject invalid energy",
        description: "The method fails before storing invalid state.",
        code: "if (energy < 0) {\n  throw new IllegalArgumentException(\"energy\");\n}",
        output: "",
      },
      fieldNote: "Structural validation confirms the exception boundary shape, not compiled bytecode.",
      mistakes: ["Catching Exception everywhere.", "Throwing NullPointerException manually for ordinary validation.", "Continuing after detecting invalid state."],
      tasks: [
        { id: "java-exception-boundaries-v5-throw", title: "Throw for negative energy", description: "Add an if branch that throws IllegalArgumentException when energy is negative.", expectedBehavior: "Source contains negative check and throw.", starterCode: "class Signal {\n  void setEnergy(int energy) {\n    // Validate energy\n  }\n}", expected: "if\\s*\\([^)]*energy\\s*<\\s*0[\\s\\S]*throw\\s+new\\s+IllegalArgumentException", hints: ["Check energy < 0.", "Throw inside the if block.", "Use IllegalArgumentException."] },
        { id: "java-exception-boundaries-v5-catch", title: "Catch a number format failure", description: "Catch NumberFormatException around Integer.parseInt.", expectedBehavior: "Source contains try/catch with NumberFormatException.", starterCode: "class Parser {\n  int parseOrZero(String raw) {\n    // Parse or recover with zero\n  }\n}", expected: "try\\s*\\{[\\s\\S]*Integer\\.parseInt\\s*\\([\\s\\S]*catch\\s*\\(\\s*NumberFormatException", hints: ["Put Integer.parseInt in the try block.", "Catch NumberFormatException specifically.", "Return 0 from the catch branch."] },
      ],
      bonus: { id: "java-exception-boundaries-v5-bonus", title: "Validate constructor argument", description: "Constructor rejects null name with IllegalArgumentException.", expectedBehavior: "Source checks name == null and throws.", starterCode: "class Relic {\n  private final String name;\n  Relic(String name) {\n    // Validate and assign\n  }\n}", expected: "if\\s*\\([^)]*name\\s*==\\s*null[\\s\\S]*throw\\s+new\\s+IllegalArgumentException", hints: ["Check for null before assignment.", "Throw IllegalArgumentException.", "Assign this.name only after validation."], discoveryText: "The Java vault now has explicit fault boundaries." },
    }),
    lesson({
      id: "java-oo-capstone-v5",
      title: "OO Capstone Skeleton",
      subtitle: "Layer a small console system honestly",
      objectives: ["Separate model and service classes", "Use interfaces for output formatting", "Design a testable object graph"],
      conceptHeading: "A small Java application is a collaboration between focused classes",
      explanation: ["A capstone architecture can be validated by its class boundaries even before browser-native compilation exists. Model classes hold state, services coordinate behavior, and interfaces define replaceable ports.", "This lesson asks for a source skeleton that would be compiled and tested in a Java 8 environment outside the browser."],
      bullets: ["Keep one responsibility per class.", "Depend on interfaces at service boundaries.", "Avoid static global state for domain logic."],
      syntax: "class InventoryService { private final Formatter formatter; }",
      example: {
        title: "Service dependency",
        description: "The service depends on an interface rather than a concrete formatter.",
        code: "interface Formatter { String format(String value); }\nclass InventoryService {\n  private final Formatter formatter;\n  InventoryService(Formatter formatter) { this.formatter = formatter; }\n}",
        output: "",
      },
      fieldNote: "The browser validates architecture shape honestly; compiler and runtime validation belong to your local Java toolchain.",
      mistakes: ["Putting every class responsibility into Main.", "Using public mutable fields across the domain.", "Pretending structural validation is full compilation."],
      tasks: [
        { id: "java-oo-capstone-v5-model-service", title: "Create model and service classes", description: "Define Relic model and InventoryService class.", expectedBehavior: "Source contains both class declarations.", starterCode: "// Create the capstone skeleton\n", expected: "class\\s+Relic[\\s\\S]*class\\s+InventoryService", hints: ["Create a Relic class for data.", "Create InventoryService for behavior.", "Keep them as separate classes."] },
        { id: "java-oo-capstone-v5-formatter-port", title: "Add formatter port", description: "Add Formatter interface and inject it into InventoryService.", expectedBehavior: "Source contains interface and constructor dependency.", starterCode: "// Add Formatter and InventoryService dependency\n", expected: "interface\\s+Formatter[\\s\\S]*class\\s+InventoryService[\\s\\S]*InventoryService\\s*\\(\\s*Formatter\\s+formatter\\s*\\)", hints: ["Define the interface first.", "Use Formatter as a constructor parameter.", "Store it in a field."] },
      ],
      bonus: { id: "java-oo-capstone-v5-bonus", title: "Capstone architecture skeleton", description: "Include Main, Relic, InventoryService, and Formatter names.", expectedBehavior: "Source contains the required capstone classes/interfaces.", starterCode: "// Build the object-oriented console capstone skeleton\n", expected: "class\\s+Main[\\s\\S]*class\\s+Relic[\\s\\S]*class\\s+InventoryService[\\s\\S]*interface\\s+Formatter", hints: ["Main is the entry class.", "Relic is the model class.", "InventoryService coordinates behavior and Formatter is a port."], discoveryText: "The Java track now ends in a layered console-system architecture." },
    })
  ],
};
