import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const CONTENT_DIR = join(ROOT, "src", "content");
const DOCS = ["README.md", "docs/CURRICULUM.md", "docs/CONTENT_AUTHORING.md"];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    const stat = statSync(path);
    return stat.isDirectory() ? walk(path) : [path];
  });
}

const files = walk(CONTENT_DIR).filter((file) => /\.ts$/.test(file));
const idEntries = [];

for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(/\bid:\s*["']([^"']+)["']/g)) {
    idEntries.push({ id: match[1], file });
  }
}

const byId = new Map();
for (const entry of idEntries) {
  const bucket = byId.get(entry.id) ?? [];
  bucket.push(entry.file.replace(ROOT, ""));
  byId.set(entry.id, bucket);
}

const duplicates = [...byId.entries()].filter(([, locations]) => locations.length > 1);
if (duplicates.length > 0) {
  console.error("Duplicate content ids detected:");
  for (const [id, locations] of duplicates) console.error(`- ${id}: ${locations.join(", ")}`);
  process.exit(1);
}

const contentText = files.map((file) => readFileSync(file, "utf8")).join("\n");
const requiredPatterns = [
  ["task validation", /validation\s*:/],
  ["progressive hints", /hints\s*:\s*\[/],
  ["bonus tasks", /bonusTask|bonus:/],
  ["Python v5 worlds", /python-typecraft-observatory[\s\S]*python-local-app-forge/],
  ["JavaScript v5 world", /browser-application-forge/],
  ["HTML/CSS v5 world", /adaptive-interface-studio/],
  ["Java v5 world", /java-architecture-vault/],
  ["C++ v5 world", /ownership-forge/],
];

const missing = requiredPatterns.filter(([, pattern]) => !pattern.test(contentText));
if (missing.length > 0) {
  console.error("Content registry validation failed:");
  for (const [label] of missing) console.error(`- Missing ${label}`);
  process.exit(1);
}

const forbidden = new RegExp(["TO" + "DO", "FIX" + "ME", "Coming" + " soon"].join("|"));
for (const relative of DOCS) {
  const text = readFileSync(join(ROOT, relative), "utf8");
  if (forbidden.test(text)) {
    console.error(`Forbidden placeholder marker found in ${relative}`);
    process.exit(1);
  }
}

const minIds = 430;
if (idEntries.length < minIds) {
  console.error(`Expected at least ${minIds} content ids after v5 expansion, found ${idEntries.length}.`);
  process.exit(1);
}

console.log(
  `Content validation passed: ${idEntries.length} stable ids, ${files.length} content files, no duplicate ids.`,
);
