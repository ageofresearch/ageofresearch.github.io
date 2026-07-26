import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, normalize, relative, resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");
const siteRoot = join(repositoryRoot, "site");
const projectBase = "/formagization/";

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function resolveSiteTarget(page, rawTarget) {
  if (
    rawTarget.startsWith("#") ||
    rawTarget.startsWith("mailto:") ||
    rawTarget.startsWith("https://") ||
    rawTarget.startsWith("http://") ||
    rawTarget.startsWith("data:")
  ) {
    return null;
  }

  const targetWithoutFragment = rawTarget.split("#", 1)[0].split("?", 1)[0];
  if (!targetWithoutFragment) return null;

  let target;
  if (targetWithoutFragment.startsWith(projectBase)) {
    target = join(siteRoot, targetWithoutFragment.slice(projectBase.length));
  } else if (targetWithoutFragment.startsWith("/")) {
    throw new Error(
      `${relative(repositoryRoot, page)} uses an unexpected root URL: ${rawTarget}`,
    );
  } else {
    target = resolve(dirname(page), targetWithoutFragment);
  }

  const normalizedTarget = normalize(target);
  if (!normalizedTarget.startsWith(siteRoot)) {
    throw new Error(
      `${relative(repositoryRoot, page)} escapes the published site: ${rawTarget}`,
    );
  }

  if (existsSync(normalizedTarget) && statSync(normalizedTarget).isDirectory()) {
    return join(normalizedTarget, "index.html");
  }
  return normalizedTarget;
}

if (!existsSync(siteRoot)) {
  throw new Error("site/ does not exist");
}

const files = walk(siteRoot);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const failures = [];

for (const page of htmlFiles) {
  const source = readFileSync(page, "utf8");
  const references = source.matchAll(/\b(?:href|src)="([^"]+)"/g);

  for (const [, rawTarget] of references) {
    try {
      const target = resolveSiteTarget(page, rawTarget);
      if (target && !existsSync(target)) {
        failures.push(
          `${relative(repositoryRoot, page)} → missing ${relative(repositoryRoot, target)}`,
        );
      }
    } catch (error) {
      failures.push(error.message);
    }
  }
}

const requiredFiles = [
  "index.html",
  "404.html",
  ".nojekyll",
  "assets/site.css",
  "assets/site.js",
  "formalizations/index.html",
  "formalizations/fixed-perimeter-partitions/index.html",
  "standards/index.html",
  "review/index.html",
];

for (const path of requiredFiles) {
  if (!existsSync(join(siteRoot, path))) failures.push(`Missing required file: site/${path}`);
}

if (failures.length > 0) {
  console.error("Site validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Site validation passed: ${htmlFiles.length} HTML pages, ${files.length} files.`);
}
