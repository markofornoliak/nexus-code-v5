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

export const javaDomainWorld: CurriculumWorldSpec = {
  id: "java-domain-architecture",
  title: "Domain Architecture Vault",
  subtitle: "Value objects, service boundaries, and testable wiring",
  description:
    "Design Java 8 applications around explicit domain rules, replaceable services, and small entry points that are ready for native compilation.",
  landmark: "The Contract Chamber",
  accent: "violet",
  lessons: [
    {
      id: "java-value-objects",
      title: "Value Objects",
      subtitle: "Protect domain meaning with immutable validated types",
      objectives: [
        "Use private final fields for immutable state",
        "Validate constructor arguments",
        "Implement value-based equality contracts",
      ],
      conceptHeading: "A value object represents meaning, not identity",
      explanation: [
        "Names, coordinates, money amounts, and identifiers often deserve dedicated types because their validation and formatting rules matter across the application.",
        "An immutable value object validates itself at construction and compares by contained values rather than object identity.",
      ],
      bullets: [
        "Make fields private final.",
        "Reject invalid construction immediately.",
        "Keep equals and hashCode consistent.",
      ],
      syntax: "public final class Callsign { private final String value; }",
      example: {
        title: "Immutable callsign skeleton",
        description: "The constructor owns the validation boundary.",
        code: "public final class Callsign {\n  private final String value;\n  public Callsign(String value) {\n    if (value == null || value.trim().isEmpty()) throw new IllegalArgumentException();\n    this.value = value.trim();\n  }\n  public String getValue() { return value; }\n}",
      },
      fieldNote:
        "NEXUS validates the source contract; compile the finished class with a local JDK to verify bytecode and runtime behavior.",
      mistakes: [
        "Adding a public setter to an immutable type.",
        "Accepting null and hoping callers remember the rule.",
        "Overriding equals without a compatible hashCode.",
      ],
      tasks: [
        task(
          "java-value-objects-immutable",
          "Define an immutable callsign",
          "Create final class Callsign with a private final String value and a getter.",
          "The source declares the immutable class contract.",
          "public final class Callsign {\n  // Add state, constructor, and getter\n}\n",
          "public\\s+final\\s+class\\s+Callsign[\\s\\S]*private\\s+final\\s+String\\s+value[\\s\\S]*public\\s+Callsign\\s*\\([\\s\\S]*public\\s+String\\s+getValue\\s*\\(",
          [
            "Keep the class final.",
            "Declare value as private final.",
            "Assign it in the constructor and expose only a getter.",
          ],
        ),
        task(
          "java-value-objects-validation",
          "Guard invalid construction",
          "Reject null or blank values with IllegalArgumentException.",
          "The constructor contains explicit null and blank validation.",
          "public final class Callsign {\n  private final String value;\n  public Callsign(String value) {\n    // Validate before assignment\n  }\n}\n",
          "value\\s*==\\s*null[\\s\\S]*(?:trim\\(\\)\\.isEmpty\\(\\)|isEmpty\\(\\))[\\s\\S]*throw\\s+new\\s+IllegalArgumentException",
          [
            "Check null before calling trim().",
            "Check whether the trimmed string is empty.",
            "Throw IllegalArgumentException before assignment.",
          ],
        ),
      ],
      bonusTask: bonus(
        "java-value-objects-bonus",
        "Implement value equality",
        "Add equals(Object) and hashCode() using the stored value.",
        "The source contains compatible equals and hashCode methods.",
        "public final class Callsign {\n  private final String value;\n  // Add equality methods\n}\n",
        "boolean\\s+equals\\s*\\(\\s*Object[\\s\\S]*int\\s+hashCode\\s*\\(",
        [
          "Override equals(Object other).",
          "Compare the contained value.",
          "Override hashCode using the same field.",
        ],
        "The Contract Chamber now recognizes equal domain values consistently.",
      ),
    },
    {
      id: "java-service-boundaries",
      title: "Service Boundaries",
      subtitle: "Separate domain decisions from infrastructure details",
      objectives: [
        "Define behavior through interfaces",
        "Inject dependencies through constructors",
        "Keep domain services independent of console output",
      ],
      conceptHeading: "A service boundary makes replaceable behavior explicit",
      explanation: [
        "Domain services should coordinate rules without depending directly on the console, filesystem, or a concrete database class. Interfaces describe the behavior that the domain needs.",
        "Constructor injection makes those dependencies visible and allows tests to supply small in-memory implementations.",
      ],
      bullets: [
        "Depend on interfaces at architectural boundaries.",
        "Store dependencies in private final fields.",
        "Return domain results instead of printing inside services.",
      ],
      syntax:
        "public MissionService(MissionRepository repository) { this.repository = repository; }",
      example: {
        title: "Repository port",
        description: "The service knows the contract, not the storage technology.",
        code: "interface MissionRepository { Mission findById(String id); }\nclass MissionService {\n  private final MissionRepository repository;\n  MissionService(MissionRepository repository) { this.repository = repository; }\n}",
      },
      fieldNote:
        "Interfaces are valuable when they express a real boundary or variation point, not when created mechanically for every class.",
      mistakes: [
        "Constructing concrete dependencies inside the service.",
        "Printing user-facing text from domain logic.",
        "Creating an interface with no meaningful boundary.",
      ],
      tasks: [
        task(
          "java-service-boundaries-interface",
          "Define a repository port",
          "Create MissionRepository with Mission findById(String id).",
          "The source contains the required interface method.",
          "public interface MissionRepository {\n  // Declare the lookup contract\n}\n",
          "interface\\s+MissionRepository[\\s\\S]*Mission\\s+findById\\s*\\(\\s*String\\s+id\\s*\\)",
          [
            "Use an interface declaration.",
            "Return Mission.",
            "Accept one String id parameter.",
          ],
        ),
        task(
          "java-service-boundaries-injection",
          "Inject the repository",
          "Create MissionService with a private final repository field and constructor assignment.",
          "The service contains constructor injection.",
          "public class MissionService {\n  // Add dependency and constructor\n}\n",
          "private\\s+final\\s+MissionRepository\\s+repository[\\s\\S]*public\\s+MissionService\\s*\\(\\s*MissionRepository\\s+repository\\s*\\)[\\s\\S]*this\\.repository\\s*=\\s*repository",
          [
            "Declare a private final field.",
            "Accept the interface in the constructor.",
            "Assign with this.repository = repository.",
          ],
        ),
      ],
      bonusTask: bonus(
        "java-service-boundaries-bonus",
        "Return an Optional result",
        "Change the repository lookup to Optional<Mission> and import java.util.Optional.",
        "The source contains the Optional-based contract.",
        "public interface MissionRepository {\n  // Return an optional mission\n}\n",
        "import\\s+java\\.util\\.Optional[\\s\\S]*Optional\\s*<\\s*Mission\\s*>\\s+findById",
        [
          "Import java.util.Optional.",
          "Use Optional<Mission> as the return type.",
          "Keep the same method name and parameter.",
        ],
        "The service boundary now communicates absence without returning null.",
      ),
    },
    {
      id: "java-composition-root",
      title: "Composition Root",
      subtitle: "Wire the application in one small entry point",
      objectives: [
        "Construct concrete dependencies in main",
        "Keep wiring separate from domain behavior",
        "Expose a testable application service",
      ],
      conceptHeading: "The composition root is the one place where concrete objects meet",
      explanation: [
        "Dependency injection does not require a framework. A small main method can construct infrastructure, pass it into services, and invoke one application operation.",
        "Keeping object construction at the edge prevents concrete dependencies from spreading through domain classes.",
      ],
      bullets: [
        "Build the object graph in one visible place.",
        "Keep main short and deterministic.",
        "Do not place business rules inside the entry point.",
      ],
      syntax:
        "MissionRepository repo = new InMemoryMissionRepository();\nMissionService service = new MissionService(repo);",
      example: {
        title: "Manual dependency wiring",
        description: "The entry point chooses concrete implementations.",
        code: "public class Main {\n  public static void main(String[] args) {\n    MissionRepository repository = new InMemoryMissionRepository();\n    MissionService service = new MissionService(repository);\n    service.run();\n  }\n}",
      },
      fieldNote:
        "A framework can automate wiring later, but the architectural principle remains: concrete choices belong at the application edge.",
      mistakes: [
        "Constructing repositories inside domain services.",
        "Putting validation and formatting logic directly in main.",
        "Using global mutable singletons as hidden dependencies.",
      ],
      tasks: [
        task(
          "java-composition-root-main",
          "Create the Java entry point",
          "Create Main with public static void main(String[] args).",
          "The source contains a valid Java entry-point signature.",
          "public class Main {\n  // Add the application entry point\n}\n",
          "public\\s+static\\s+void\\s+main\\s*\\(\\s*String\\s*\\[\\s*\\]\\s+args\\s*\\)",
          [
            "The method must be public static void.",
            "Use String[] args.",
            "Place it inside class Main.",
          ],
        ),
        task(
          "java-composition-root-wiring",
          "Wire repository and service",
          "Construct InMemoryMissionRepository and pass it to MissionService.",
          "The source contains explicit dependency wiring.",
          "public class Main {\n  public static void main(String[] args) {\n    // Build the object graph\n  }\n}\n",
          "MissionRepository\\s+\\w+\\s*=\\s*new\\s+InMemoryMissionRepository\\s*\\([\\s\\S]*new\\s+MissionService\\s*\\(\\s*\\w+\\s*\\)",
          [
            "Declare the variable using the interface type.",
            "Instantiate the in-memory implementation.",
            "Pass that variable into the service constructor.",
          ],
        ),
      ],
      bonusTask: bonus(
        "java-composition-root-bonus",
        "Keep output behind a presenter",
        "Define Presenter with void show(String text) and inject it into Main wiring.",
        "The source contains a presenter interface and concrete wiring.",
        "// Define a presentation boundary and wire it in Main\n",
        "interface\\s+Presenter[\\s\\S]*void\\s+show\\s*\\(\\s*String\\s+text\\s*\\)[\\s\\S]*new\\s+MissionService\\s*\\([\\s\\S]*Presenter",
        [
          "Create a Presenter interface.",
          "Declare show(String text).",
          "Make the presenter visible in the object graph.",
        ],
        "The application now has a clear composition root and replaceable output boundary.",
      ),
    },
  ],
};
