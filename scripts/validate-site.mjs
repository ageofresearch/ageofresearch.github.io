import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, normalize, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const repositoryRoot = resolve(import.meta.dirname, "..");
const siteRoot = join(repositoryRoot, "site");
const projectBase = "/";

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
  "assets/aristotle.js",
  "assets/aristotle-core.mjs",
  "aristotle/index.html",
  "formalizations/index.html",
  "formalizations/fixed-perimeter-partitions/index.html",
  "standards/index.html",
  "review/index.html",
];

for (const path of requiredFiles) {
  if (!existsSync(join(siteRoot, path))) failures.push(`Missing required file: site/${path}`);
}

const aristotlePage = readFileSync(join(siteRoot, "aristotle/index.html"), "utf8");
const aristotleScript = readFileSync(join(siteRoot, "assets/aristotle.js"), "utf8");
const aristotleCore = readFileSync(join(siteRoot, "assets/aristotle-core.mjs"), "utf8");
const siteStyles = readFileSync(join(siteRoot, "assets/site.css"), "utf8");
const sessionStorageWrites = [
  ...aristotleScript.matchAll(/sessionStorage\.setItem\(([^,\n]+)/g),
].map((match) => match[1].trim());
const proxyMatch = aristotleCore.match(
  /export const ARISTOTLE_PROXY_URL\s*=\s*"([^"]+)"/,
);
const configuredProxyUrl = proxyMatch?.[1] ?? "";
const expectedProxyUrl = process.env.EXPECTED_ARISTOTLE_PROXY_URL?.trim() ?? "";
const placeholderHostname = [
  "formagization-aristotle-proxy",
  "replace",
  "invalid",
].join(".");

let configuredProxy = null;
try {
  configuredProxy = new URL(configuredProxyUrl);
} catch {
  failures.push("Aristotle proxy constant must contain a valid absolute URL");
}

if (configuredProxy) {
  const isPlaceholder =
    configuredProxy.protocol === "https:" &&
    configuredProxy.hostname === placeholderHostname &&
    configuredProxy.pathname === "/";
  const isProduction =
    configuredProxy.protocol === "https:" &&
    configuredProxy.hostname.endsWith(".chatgpt.site") &&
    configuredProxy.username === "" &&
    configuredProxy.password === "" &&
    configuredProxy.port === "" &&
    configuredProxy.pathname === "/" &&
    configuredProxy.search === "" &&
    configuredProxy.hash === "";

  if (!isPlaceholder && !isProduction) {
    failures.push(
      "Aristotle proxy must be the undeployed placeholder or an HTTPS *.chatgpt.site origin",
    );
  }
  if (isPlaceholder && expectedProxyUrl) {
    failures.push(
      "Aristotle proxy still uses the placeholder while EXPECTED_ARISTOTLE_PROXY_URL is set",
    );
  }
  if (expectedProxyUrl && configuredProxyUrl !== expectedProxyUrl) {
    failures.push(
      "Aristotle proxy does not match EXPECTED_ARISTOTLE_PROXY_URL",
    );
  }
}

const aristotleRequirements = [
  [aristotlePage.includes('type="password"'), "Aristotle API key input must be masked"],
  [aristotlePage.includes('maxlength="100000"'), "Aristotle prompt must declare its 100,000-character limit"],
  [aristotlePage.includes("data-key-forget"), "Aristotle page must provide a Forget control"],
  [aristotlePage.includes("data-key-toggle"), "Aristotle page must provide a Show control"],
  [
    aristotlePage.includes('class="aristotle-document"') &&
      aristotlePage.includes("data-aristotle-workspace") &&
      aristotlePage.includes('data-aristotle-view="request"') &&
      aristotlePage.includes('data-aristotle-view="progress"'),
    "Aristotle page must retain its viewport-locked, two-view workspace",
  ],
  [
    siteStyles.includes("html.aristotle-document") &&
      siteStyles.includes('body[data-page="aristotle"]') &&
      siteStyles.includes("height: 100dvh") &&
      siteStyles.includes("overflow: hidden"),
    "Aristotle workspace must prevent document-level scrolling",
  ],
  [
    aristotleScript.includes('window.matchMedia("(max-width: 900px)")') &&
      aristotleScript.includes("pane.hidden = isInactive") &&
      aristotleScript.includes('setWorkspaceView("progress")'),
    "Aristotle mobile layout must switch between request and progress panes",
  ],
  [Boolean(proxyMatch), "Aristotle core must export one proxy URL constant"],
  [
    aristotleCore.includes('"X-Formagization-Aristotle-Key"'),
    "Aristotle requests must use the dedicated key header",
  ],
  [aristotleScript.includes("window.sessionStorage"), "Aristotle key must use tab-scoped sessionStorage"],
  [!aristotleScript.includes("localStorage"), "Aristotle script must not use persistent localStorage"],
  [!aristotleScript.includes("console."), "Aristotle script must not log sensitive workflow data"],
  [
    aristotleScript.includes("document.hidden") &&
      aristotleScript.includes('"visibilitychange"'),
    "Aristotle polling must pause when the page is hidden",
  ],
  [
    aristotleCore.includes("10_000") &&
      aristotleCore.includes("30_000") &&
      aristotleCore.includes("60_000"),
    "Aristotle polling must use the 10/30/60-second cadence",
  ],
  [
    sessionStorageWrites.length === 2 &&
      sessionStorageWrites.includes("KEY_STORAGE_NAME") &&
      sessionStorageWrites.includes("PROJECT_STORAGE_NAME"),
    "Aristotle tab storage writes must be limited to the key and active project identifier",
  ],
];

for (const [passes, message] of aristotleRequirements) {
  if (!passes) failures.push(message);
}

const aristotleTest = spawnSync(
  process.execPath,
  [join(repositoryRoot, "scripts/test-aristotle.mjs")],
  { encoding: "utf8" },
);
if (aristotleTest.status !== 0) {
  failures.push(
    `Aristotle behavior tests failed:\n${aristotleTest.stderr || aristotleTest.stdout}`,
  );
}

if (failures.length > 0) {
  console.error("Site validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Site validation passed: ${htmlFiles.length} HTML pages, ${files.length} files.`);
}
