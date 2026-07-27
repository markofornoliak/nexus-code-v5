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

export const cppPerformanceWorld: CurriculumWorldSpec = {
  id: "cpp-performance-systems",
  title: "Performance Systems Range",
  subtitle: "Data layout, error contracts, and measurement-driven optimization",
  description:
    "Design native systems around predictable memory access, explicit failure paths, and profiling evidence instead of premature micro-optimizations.",
  landmark: "The Latency Observatory",
  accent: "amber",
  lessons: [
    {
      id: "cpp-cache-aware-data",
      title: "Cache-Aware Data Layout",
      subtitle: "Choose contiguous storage for predictable traversal",
      objectives: [
        "Recognize the locality benefits of contiguous containers",
        "Separate hot data from rarely used metadata",
        "Use const references during read-only traversal",
      ],
      conceptHeading: "Performance often begins with how data is arranged in memory",
      explanation: [
        "Processors load memory in cache lines. Traversing contiguous values such as std::vector elements usually provides more predictable locality than chasing unrelated heap allocations.",
        "Data-oriented design asks which fields are accessed together and keeps frequently traversed data compact.",
      ],
      bullets: [
        "Prefer contiguous containers for sequential traversal.",
        "Pass large read-only containers by const reference.",
        "Measure before replacing clear code with specialized layouts.",
      ],
      syntax: "double sum(const std::vector<double>& values);",
      example: {
        title: "Read-only contiguous traversal",
        description: "The function avoids copying the vector.",
        code: "double sum(const std::vector<double>& values) {\n  double total = 0.0;\n  for (double value : values) total += value;\n  return total;\n}",
      },
      fieldNote:
        "NEXUS validates source structure; use a native compiler and profiler to confirm real performance on your target hardware.",
      mistakes: [
        "Copying large containers into helper functions.",
        "Assuming linked structures are faster because insertion is cheap.",
        "Optimizing layout without measuring the actual workload.",
      ],
      tasks: [
        task(
          "cpp-cache-aware-data-vector",
          "Declare contiguous samples",
          "Create std::vector<double> samples and reserve capacity before filling it.",
          "The source contains vector storage and reserve().",
          "#include <vector>\n\nint main() {\n  // Create storage for 1024 samples\n}\n",
          "std::vector\\s*<\\s*double\\s*>\\s+samples[\\s\\S]*samples\\.reserve\\s*\\(\\s*1024\\s*\\)",
          [
            "Use std::vector<double>.",
            "Name the variable samples.",
            "Call samples.reserve(1024).",
          ],
        ),
        task(
          "cpp-cache-aware-data-const-ref",
          "Traverse by const reference",
          "Declare sum that accepts const std::vector<double>& values.",
          "The function uses a const reference parameter.",
          "#include <vector>\n\n// Declare a read-only sum function\n",
          "double\\s+sum\\s*\\(\\s*const\\s+std::vector\\s*<\\s*double\\s*>\\s*&\\s*values\\s*\\)",
          [
            "Return double.",
            "Use const before std::vector.",
            "Use & after the vector type.",
          ],
        ),
      ],
      bonusTask: bonus(
        "cpp-cache-aware-data-bonus",
        "Separate hot sample values",
        "Define SampleBlock with std::vector<float> values and a separate std::string label.",
        "The structure separates numeric storage and metadata.",
        "#include <string>\n#include <vector>\n\nstruct SampleBlock {\n  // Add hot values and metadata\n};\n",
        "struct\\s+SampleBlock[\\s\\S]*std::vector\\s*<\\s*float\\s*>\\s+values[\\s\\S]*std::string\\s+label",
        [
          "Use a vector for numeric values.",
          "Keep the label as a separate field.",
          "Use the requested field names.",
        ],
        "The Latency Observatory now distinguishes hot traversal data from descriptive metadata.",
      ),
    },
    {
      id: "cpp-error-contracts",
      title: "Explicit Error Contracts",
      subtitle: "Represent expected failure without hidden sentinel values",
      objectives: [
        "Use std::optional for expected absence",
        "Reserve exceptions for exceptional control paths",
        "Mark non-mutating queries const",
      ],
      conceptHeading: "A function signature should reveal how failure is represented",
      explanation: [
        "Returning -1, null pointers, or empty strings can hide whether a value is genuinely absent or accidentally invalid. std::optional makes expected absence part of the type.",
        "Exceptions remain useful for failures that cannot be handled locally, but routine lookup misses often deserve an explicit result type.",
      ],
      bullets: [
        "Use optional when absence is a normal outcome.",
        "Avoid magic sentinel values.",
        "Make read-only lookup functions const.",
      ],
      syntax: "std::optional<Node> find(std::string_view id) const;",
      example: {
        title: "Optional lookup result",
        description: "The caller must acknowledge the missing case.",
        code: "std::optional<int> findScore(bool exists) {\n  if (!exists) return std::nullopt;\n  return 42;\n}",
      },
      fieldNote:
        "Choose the error model that matches the domain frequency and recovery path, then keep it consistent across related APIs.",
      mistakes: [
        "Returning a magic number that could also be valid data.",
        "Throwing exceptions for every expected lookup miss.",
        "Forgetting const on a query that does not mutate state.",
      ],
      tasks: [
        task(
          "cpp-error-contracts-optional",
          "Declare an optional lookup",
          "Declare std::optional<int> findScore(const std::string& id).",
          "The source contains the optional return contract.",
          "#include <optional>\n#include <string>\n\n// Declare the lookup\n",
          "std::optional\\s*<\\s*int\\s*>\\s+findScore\\s*\\(\\s*const\\s+std::string\\s*&\\s*id\\s*\\)",
          [
            "Include <optional>.",
            "Return std::optional<int>.",
            "Accept id by const reference.",
          ],
        ),
        task(
          "cpp-error-contracts-nullopt",
          "Return explicit absence",
          "Return std::nullopt when found is false.",
          "The source contains an explicit nullopt branch.",
          "#include <optional>\n\nstd::optional<int> load(bool found) {\n  // Return no value when not found\n}\n",
          "if\\s*\\(\\s*!?found\\s*\\)[\\s\\S]*return\\s+std::nullopt",
          [
            "Check the found flag.",
            "Use return std::nullopt.",
            "Return an integer on the other path.",
          ],
        ),
      ],
      bonusTask: bonus(
        "cpp-error-contracts-bonus",
        "Create a const query",
        "Declare Repository::find as a const method returning std::optional<int>.",
        "The method signature is const and optional-based.",
        "#include <optional>\n\nclass Repository {\npublic:\n  // Declare find\n};\n",
        "std::optional\\s*<\\s*int\\s*>\\s+find\\s*\\([^)]*\\)\\s*const\\s*;",
        [
          "Place const after the parameter list.",
          "Return std::optional<int>.",
          "End the declaration with a semicolon.",
        ],
        "The native API now communicates routine absence without ambiguous sentinels.",
      ),
    },
    {
      id: "cpp-profiling-workflow",
      title: "Profiling Workflow",
      subtitle: "Optimize from measurements and preserve a clear baseline",
      objectives: [
        "Define a repeatable benchmark boundary",
        "Measure elapsed time with std::chrono",
        "Compare changes against a stable baseline",
      ],
      conceptHeading: "Optimization starts with a reproducible measurement",
      explanation: [
        "A benchmark should isolate the operation under study, use representative data, and repeat enough work to reduce noise. One timing result is not a performance conclusion.",
        "The goal is to compare a change against a known baseline while checking that behavior remains correct.",
      ],
      bullets: [
        "Measure representative work, not setup noise.",
        "Use steady_clock for elapsed time.",
        "Keep correctness checks beside performance checks.",
      ],
      syntax: "auto start = std::chrono::steady_clock::now();",
      example: {
        title: "Measure an elapsed interval",
        description: "steady_clock is intended for monotonic elapsed timing.",
        code: "auto start = std::chrono::steady_clock::now();\nrunWork();\nauto end = std::chrono::steady_clock::now();\nauto elapsed = std::chrono::duration_cast<std::chrono::microseconds>(end - start);",
      },
      fieldNote:
        "A benchmark is evidence only for its workload, compiler settings, hardware, and measurement method.",
      mistakes: [
        "Timing debug builds and generalizing the result.",
        "Including unrelated setup in the measured region.",
        "Removing correctness checks to make a benchmark faster.",
      ],
      tasks: [
        task(
          "cpp-profiling-workflow-clock",
          "Create a steady clock boundary",
          "Capture start and end with std::chrono::steady_clock::now().",
          "The source contains both steady-clock measurements.",
          "#include <chrono>\n\nint main() {\n  // Capture start, run work, and capture end\n}\n",
          "auto\\s+start\\s*=\\s*std::chrono::steady_clock::now\\s*\\(\\s*\\)[\\s\\S]*auto\\s+end\\s*=\\s*std::chrono::steady_clock::now\\s*\\(\\s*\\)",
          [
            "Include <chrono>.",
            "Use steady_clock::now() twice.",
            "Name the variables start and end.",
          ],
        ),
        task(
          "cpp-profiling-workflow-duration",
          "Convert an elapsed duration",
          "Use duration_cast<std::chrono::microseconds>(end - start).",
          "The source contains the requested duration cast.",
          "// start and end are steady_clock time points\n// Convert the elapsed interval\n",
          "std::chrono::duration_cast\\s*<\\s*std::chrono::microseconds\\s*>\\s*\\(\\s*end\\s*-\\s*start\\s*\\)",
          [
            "Use std::chrono::duration_cast.",
            "Choose std::chrono::microseconds.",
            "Cast end - start.",
          ],
        ),
      ],
      bonusTask: bonus(
        "cpp-profiling-workflow-bonus",
        "Preserve a benchmark result",
        "Define BenchmarkResult with microseconds and checksum fields.",
        "The source stores both timing and correctness evidence.",
        "struct BenchmarkResult {\n  // Add measurement and checksum fields\n};\n",
        "struct\\s+BenchmarkResult[\\s\\S]*(?:long\\s+long|std::int64_t)\\s+microseconds[\\s\\S]*(?:long\\s+long|std::uint64_t|std::size_t)\\s+checksum",
        [
          "Store microseconds as an integer type.",
          "Store a checksum separately.",
          "Use the requested field names.",
        ],
        "The observatory now records performance and correctness in the same benchmark result.",
      ),
    },
  ],
};
