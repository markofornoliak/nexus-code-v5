import { existsSync, readFileSync } from "node:fs";

const checks = [];
function expect(label, condition) {
  checks.push({ label, condition });
  if (!condition) {
    console.error(`E2E smoke check failed: ${label}`);
    process.exitCode = 1;
  }
}

const app = readFileSync("src/app/App.tsx", "utf8");
const vite = readFileSync("vite.config.ts", "utf8");
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

expect("onboarding route is registered", app.includes('path="/onboarding"'));
expect("projects route is registered", app.includes('path="/projects"'));
expect(
  "lesson route remains registered",
  app.includes('path="/learn/:trackId/:lessonId"'),
);
expect("tracks route remains registered", app.includes('path="/tracks"'));
expect(
  "GitHub Pages base path is environment controlled",
  vite.includes("VITE_BASE_PATH"),
);
expect(
  "package exposes e2e script",
  packageJson.scripts?.["test:e2e"] === "node scripts/e2e-smoke.mjs",
);
expect(
  "content validation is part of build",
  packageJson.scripts?.build?.includes("validate:content"),
);
expect("public .nojekyll exists", existsSync("public/.nojekyll"));

if (existsSync("dist/index.html")) {
  const index = readFileSync("dist/index.html", "utf8");
  expect("built app contains module entry", /type="module"/.test(index));
  expect("built app links the web manifest", /manifest/.test(index));
} else {
  console.log(
    "dist/index.html not present; source-level static-hosting smoke checks completed before build.",
  );
}

if (process.exitCode) {
  console.error(
    `${checks.filter((check) => !check.condition).length} smoke check(s) failed.`,
  );
  process.exit(process.exitCode);
}

console.log(
  `E2E smoke checks passed: ${checks.length} static deployment and route checks.`,
);
