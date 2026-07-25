import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const registryPath = path.join(root, "registry", "artifacts.json");
const allowedEvidence = new Set([
  "present",
  "pending",
  "author-run",
  "passed",
  "failed",
  "disputed",
  "not-reviewed",
  "not-independently-reviewed",
  "independently-reviewed",
  "not-reproduced",
  "reproduced",
  "not-assessed",
  "assessed"
]);
const requiredEvidence = [
  "source_capture",
  "clean_build",
  "kernel_checking",
  "semantic_alignment",
  "proof_assistant_review",
  "subject_matter_review",
  "independent_reproduction",
  "novelty"
];
const requiredArtifactFiles = [
  "README.md",
  "metadata.json",
  "STATEMENT_MAPPING.md",
  "PROOF_OVERVIEW.md",
  "REPRODUCIBILITY.md",
  "AI_DISCLOSURE.md",
  "CHANGELOG.md",
  "CITATION.cff",
  "references.bib"
];
const generatedNames = new Set([
  ".lake",
  ".elan",
  ".lean-tools",
  "node_modules",
  "__pycache__",
  "build",
  "dist",
  "result"
]);
const errors = [];

async function exists(file) {
  try {
    await lstat(file);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (generatedNames.has(entry.name) || entry.isSymbolicLink()) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else if (entry.isFile()) files.push(absolute);
  }
  return files;
}

function trackedFiles() {
  try {
    return execFileSync("git", ["ls-files", "-z"], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).split("\0").filter(Boolean);
  } catch {
    return [];
  }
}

function requireString(object, key, context) {
  if (typeof object?.[key] !== "string" || object[key].trim() === "") {
    errors.push(`${context}: missing non-empty string '${key}'`);
  }
}

function requireStringArray(value, context, { nonempty = true } = {}) {
  if (!Array.isArray(value) || (nonempty && value.length === 0) ||
      value.some(item => typeof item !== "string" || item.trim() === "")) {
    errors.push(`${context}: expected ${nonempty ? "a non-empty " : ""}array of strings`);
  }
}

function isSafeRelative(relative) {
  return typeof relative === "string" &&
    relative !== "" &&
    !path.isAbsolute(relative) &&
    !relative.split(/[\\/]/).includes("..");
}

function sameStringSet(left, right) {
  return Array.isArray(left) && Array.isArray(right) &&
    JSON.stringify([...new Set(left)].sort()) ===
      JSON.stringify([...new Set(right)].sort());
}

const tracked = trackedFiles();
for (const file of tracked) {
  if (file.split("/").some(segment => generatedNames.has(segment))) {
    errors.push(`repository: generated path is tracked: ${file}`);
  }
}

const registry = JSON.parse(await readFile(registryPath, "utf8"));
if (registry.schema_version !== 1) errors.push("registry: unsupported schema_version");
requireString(registry, "archive", "registry");
if (!Array.isArray(registry.artifacts)) errors.push("registry: artifacts must be an array");

const ids = new Set();
for (const record of registry.artifacts ?? []) {
  requireString(record, "id", "registry artifact");
  requireString(record, "title", `registry artifact ${record.id ?? "unknown"}`);
  requireString(record, "version", `registry artifact ${record.id ?? "unknown"}`);
  requireString(record, "path", `registry artifact ${record.id ?? "unknown"}`);
  requireStringArray(record.proof_systems, `${record.id} registry proof_systems`);
  requireStringArray(record.subjects, `${record.id} registry subjects`);

  if (ids.has(record.id)) errors.push(`registry: duplicate id '${record.id}'`);
  ids.add(record.id);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.id ?? "")) {
    errors.push(`registry: invalid artifact id '${record.id}'`);
  }

  if (!record.path?.startsWith("formalizations/") || !isSafeRelative(record.path)) {
    errors.push(`${record.id}: unsafe artifact path '${record.path}'`);
    continue;
  }

  const artifactDirectory = path.join(root, record.path);
  for (const required of requiredArtifactFiles) {
    if (!await exists(path.join(artifactDirectory, required))) {
      errors.push(`${record.id}: missing ${required}`);
    }
  }

  for (const dimension of requiredEvidence) {
    const state = record.evidence?.[dimension];
    if (!allowedEvidence.has(state)) {
      errors.push(`${record.id}: invalid or missing registry evidence.${dimension}`);
    }
  }

  const metadataPath = path.join(artifactDirectory, "metadata.json");
  if (!await exists(metadataPath)) continue;
  const metadata = JSON.parse(await readFile(metadataPath, "utf8"));

  if (metadata.schema_version !== 1) errors.push(`${record.id}: metadata schema_version must be 1`);
  if (metadata.id !== record.id) errors.push(`${record.id}: metadata id mismatch`);
  if (metadata.title !== record.title) errors.push(`${record.id}: registry title differs from metadata`);
  if (metadata.version !== record.version) errors.push(`${record.id}: registry version differs from metadata`);
  if (!/^[0-9]+\.[0-9]+\.[0-9]+$/.test(metadata.version ?? "")) {
    errors.push(`${record.id}: metadata version must use semantic versioning`);
  }
  if (!sameStringSet(metadata.subjects, record.subjects)) {
    errors.push(`${record.id}: registry subjects differ from metadata`);
  }

  requireString(metadata, "title", `${record.id} metadata`);
  requireString(metadata, "date", `${record.id} metadata`);
  requireString(metadata.maintainer, "github", `${record.id} maintainer`);
  requireStringArray(metadata.subjects, `${record.id} metadata subjects`);
  requireStringArray(metadata.keywords, `${record.id} metadata keywords`);

  if (!Array.isArray(metadata.sources) || metadata.sources.length === 0) {
    errors.push(`${record.id}: at least one source is required`);
  }
  for (const [index, source] of (metadata.sources ?? []).entries()) {
    const context = `${record.id} source ${index + 1}`;
    requireString(source, "role", context);
    requireString(source, "kind", context);
    requireString(source, "url", context);

    if (source.snapshot !== undefined) {
      if (!isSafeRelative(source.snapshot)) {
        errors.push(`${context}: unsafe snapshot path '${source.snapshot}'`);
      } else {
        const snapshotPath = path.join(artifactDirectory, source.snapshot);
        if (!await exists(snapshotPath)) {
          errors.push(`${context}: missing snapshot ${source.snapshot}`);
        } else {
          const normalized = (await readFile(snapshotPath, "utf8"))
            .replace(/\r\n/g, "\n")
            .trim();
          const digest = createHash("sha256").update(normalized).digest("hex");
          if (source.sha256 !== digest) {
            errors.push(`${context}: snapshot SHA-256 mismatch`);
          }
          if (source.normalized_characters !== normalized.length) {
            errors.push(`${context}: normalized character count mismatch`);
          }
        }
      }
    }
  }

  if (!Array.isArray(metadata.public_theorems) || metadata.public_theorems.length === 0) {
    errors.push(`${record.id}: at least one public theorem is required`);
  }
  for (const [index, theorem] of (metadata.public_theorems ?? []).entries()) {
    const context = `${record.id} public theorem ${index + 1}`;
    requireString(theorem, "declaration", context);
    requireString(theorem, "interpretation", context);
    requireString(theorem, "source_file", context);
  }

  requireString(metadata.formal_system, "name", `${record.id} formal system`);
  requireString(metadata.formal_system, "version", `${record.id} formal system`);
  requireString(metadata.formal_system, "build_command", `${record.id} formal system`);
  const projectRelative = metadata.formal_system?.project_directory;
  if (!isSafeRelative(projectRelative)) {
    errors.push(`${record.id}: invalid formal_system.project_directory`);
    continue;
  }
  if (!record.proof_systems?.includes(metadata.formal_system.name)) {
    errors.push(`${record.id}: registry proof_systems omits '${metadata.formal_system.name}'`);
  }

  const projectDirectory = path.join(artifactDirectory, projectRelative);
  if (!await exists(projectDirectory)) {
    errors.push(`${record.id}: missing project directory ${projectRelative}`);
    continue;
  }
  const projectFiles = await walk(projectDirectory);
  if (projectFiles.length === 0) errors.push(`${record.id}: project directory is empty`);

  const formalName = metadata.formal_system.name.toLowerCase();
  if (formalName.startsWith("lean")) {
    for (const required of ["lean-toolchain", "lakefile.toml", "lake-manifest.json"]) {
      if (!await exists(path.join(projectDirectory, required))) {
        errors.push(`${record.id}: missing pinned Lean project file ${required}`);
      }
    }

    const leanFiles = projectFiles.filter(file => file.endsWith(".lean"));
    if (leanFiles.length === 0) errors.push(`${record.id}: Lean project contains no .lean files`);
    const combinedLean = (await Promise.all(
      leanFiles.map(file => readFile(file, "utf8"))
    )).join("\n");

    const forbiddenLean = [
      [/\b(sorry|admit|sorryAx)\b/, "proof placeholder"],
      [/^\s*axiom\s+/m, "explicit local axiom"],
      [/^\s*unsafe\s+/m, "unsafe declaration"],
      [/^\s*opaque\s+/m, "explicit opaque declaration"]
    ];
    for (const [pattern, label] of forbiddenLean) {
      if (pattern.test(combinedLean)) errors.push(`${record.id}: Lean source contains ${label}`);
    }

    for (const theorem of metadata.public_theorems ?? []) {
      const sourceFile = path.join(artifactDirectory, theorem.source_file ?? "");
      if (!isSafeRelative(theorem.source_file) || !await exists(sourceFile)) {
        errors.push(`${record.id}: missing public theorem source file: ${theorem.source_file}`);
        continue;
      }
      const shortName = theorem.declaration?.split(".").at(-1);
      const source = await readFile(sourceFile, "utf8");
      if (!shortName || !new RegExp(`\\btheorem\\s+${shortName}\\b`).test(source)) {
        errors.push(`${record.id}: public theorem not found at recorded path: ${theorem.declaration}`);
      }
    }
  }

  if (typeof metadata.ai_assistance?.material !== "boolean") {
    errors.push(`${record.id}: ai_assistance.material must be boolean`);
  }
  requireString(
    metadata.ai_assistance,
    "accountable_human_maintainer",
    `${record.id} AI disclosure`
  );
  if (metadata.ai_assistance?.material) {
    requireString(metadata.ai_assistance, "provider", `${record.id} AI disclosure`);
    requireString(metadata.ai_assistance, "model", `${record.id} AI disclosure`);
    requireString(metadata.ai_assistance, "interface", `${record.id} AI disclosure`);
    requireStringArray(metadata.ai_assistance.scope, `${record.id} AI disclosure scope`);
  }

  requireString(
    metadata.trusted_computing_base,
    "kernel",
    `${record.id} trusted computing base`
  );
  requireStringArray(
    metadata.trusted_computing_base?.public_theorem_axioms,
    `${record.id} public theorem axioms`,
    { nonempty: false }
  );

  for (const dimension of requiredEvidence) {
    const state = metadata.evidence?.[dimension]?.state;
    if (!allowedEvidence.has(state)) {
      errors.push(`${record.id}: invalid or missing metadata evidence.${dimension}.state`);
    } else if (record.evidence?.[dimension] !== state) {
      errors.push(`${record.id}: registry and metadata evidence.${dimension} differ`);
    }
  }

  const releaseStatus = metadata.release?.status;
  if (!["pending", "released", "withdrawn"].includes(releaseStatus)) {
    errors.push(`${record.id}: invalid release.status`);
  }
  if (releaseStatus === "released") {
    requireString(metadata.release, "tag", `${record.id} release`);
    if (!/^[a-f0-9]{64}$/.test(metadata.release?.archive_sha256 ?? "")) {
      errors.push(`${record.id}: released artifact requires archive_sha256`);
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}

console.log(`Validated ${registry.artifacts.length} artifact(s).`);
