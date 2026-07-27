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
  "assets/aristotle-successes.js",
  "assets/aristotle-core.mjs",
  "aristotle/index.html",
  "aristotle/successes/index.html",
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
const aristotleSuccessesScript = readFileSync(
  join(siteRoot, "assets/aristotle-successes.js"),
  "utf8",
);
const aristotleSuccessesPage = readFileSync(
  join(siteRoot, "aristotle/successes/index.html"),
  "utf8",
);
const aristotleCore = readFileSync(join(siteRoot, "assets/aristotle-core.mjs"), "utf8");
const siteStyles = readFileSync(join(siteRoot, "assets/site.css"), "utf8");
const shareImportCalls =
  aristotleScript.match(/importChatGPTShare\(sharedLink\)/g) ?? [];
const loadingStops =
  aristotleScript.match(/setSubmitLoading\(false\)/g) ?? [];
const sessionStorageWrites = [
  ...aristotleScript.matchAll(/sessionStorage\.setItem\(\s*([^,\n]+)/g),
].map((match) => match[1].trim());
const checkpointBranchStart = aristotleScript.indexOf("if (checkpoint) {");
const finalTerminalBranchStart = aristotleScript.indexOf(
  "if (payload?.terminal === true || TERMINAL_STATUSES.has(status))",
  checkpointBranchStart,
);
const checkpointBranch =
  checkpointBranchStart >= 0 && finalTerminalBranchStart > checkpointBranchStart
    ? aristotleScript.slice(checkpointBranchStart, finalTerminalBranchStart)
    : "";
const hasScrollablePrompt =
  /\.aristotle-form textarea\s*\{[\s\S]*?overflow:\s*auto\s*;/m.test(
    siteStyles,
  );
const hasLoadingSpinner =
  aristotlePage.includes('class="button-spinner"') &&
  siteStyles.includes('.button[data-loading="true"] .button-spinner') &&
  /\.button-spinner\s*\{[\s\S]*?animation\s*:/m.test(siteStyles) &&
  /@keyframes\s+[A-Za-z0-9_-]*spin[A-Za-z0-9_-]*\s*\{/i.test(siteStyles);
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
  [
    aristotlePage.includes('maxlength="100000"') &&
      aristotleCore.includes("export const PROMPT_LIMIT = 100_000") &&
      aristotleCore.includes(
        "export const CHATGPT_TRANSCRIPT_LIMIT = 2_000_000",
      ) &&
      aristotleScript.includes(
        "const limit = promptLocked ? CHATGPT_TRANSCRIPT_LIMIT : PROMPT_LIMIT",
      ) &&
      aristotleScript.includes(
        "promptInput.maxLength = CHATGPT_TRANSCRIPT_LIMIT",
      ) &&
      aristotleScript.includes("promptInput.maxLength = PROMPT_LIMIT") &&
      aristotleScript.includes(
        "const activePromptLimit = promptLocked",
      ),
    "Aristotle must keep the 100,000-character manual limit and switch complete imported transcripts to the 2,000,000-character limit without truncation",
  ],
  [aristotlePage.includes("data-key-forget"), "Aristotle page must provide a Forget control"],
  [aristotlePage.includes("data-key-toggle"), "Aristotle page must provide a Show control"],
  [
    aristotlePage.includes("data-submit-label") &&
      !aristotlePage.includes("data-share-import") &&
      !aristotlePage.includes("Test of link"),
    "Aristotle page must use one dynamic primary action without a separate link-test control",
  ],
  [
    aristotlePage.includes("standalone ChatGPT Share link") &&
      aristotlePage.includes("<strong>Send Link</strong>") &&
      aristotlePage.includes("<code>PERSON:</code>") &&
      aristotlePage.includes("<code>LLM:</code>") &&
      aristotlePage.includes("complete selected public branch") &&
      aristotlePage.includes("locks editing while preserving scroll") &&
      aristotlePage.includes("Uploaded-file contents are not included"),
    "Aristotle page must explain automatic link actions, complete-branch role labels, and the locked scrollable import",
  ],
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
  [
    !aristotleCore.includes("r.jina.ai") &&
      !aristotleScript.includes("r.jina.ai") &&
      !aristotleScript.includes('"X-Engine"') &&
      !aristotleScript.includes('"X-Respond-With"') &&
      aristotleCore.includes(
        'return `${ARISTOTLE_PROXY_URL}/api/chatgpt-share`',
      ) &&
      aristotleCore.includes("validateImportedChatGPTConversation") &&
      aristotleCore.includes('payload.complete !== true') &&
      aristotleCore.includes(
        'payload.completeness !== "selected-public-branch"',
      ) &&
      aristotleCore.includes("payload.sourceUrl !== sharedLink.url") &&
      aristotleCore.includes(
        '!/^[A-Za-z0-9_-]{43}$/.test(payload.importToken)',
      ) &&
      aristotleCore.includes(
        "export const CHATGPT_SHARE_RESPONSE_MAX_BYTES = 2_100_000",
      ) &&
      aristotleScript.includes("fetchPublicChatGPTShare") &&
      aristotleScript.includes('method: "POST"') &&
      aristotleScript.includes(
        "body: JSON.stringify({ url: sharedLink.url })",
      ) &&
      aristotleScript.includes('Accept: "application/json"') &&
      aristotleScript.includes('credentials: "omit"') &&
      aristotleScript.includes('referrerPolicy: "no-referrer"') &&
      aristotleScript.includes("response.body.getReader()") &&
      aristotleScript.includes(
        "receivedBytes > CHATGPT_SHARE_RESPONSE_MAX_BYTES",
      ),
    "ChatGPT Share imports must use the hidden, credential-free, size-limited complete selected-public-branch API instead of rendered Markdown",
  ],
  [
    !aristotleScript.includes("shareImportButton") &&
      aristotleScript.includes(
        'promptMode === "link" ? "Send Link" : "Submit to Aristotle"',
      ) &&
      aristotleScript.includes('promptInput.addEventListener("input"') &&
      aristotleScript.includes("parseChatGPTShareUrl(promptInput.value)") &&
      aristotleScript.includes('if (!promptLocked && promptMode === "link")') &&
      shareImportCalls.length === 1 &&
      aristotleScript.includes('promptInput.dataset.locked = "true"') &&
      aristotleScript.includes("promptInput.readOnly = promptLocked") &&
      aristotleScript.includes('setPromptMode("imported")'),
    "ChatGPT Share links must change the primary action, import on the first submit, lock the transcript, and restore the Aristotle action",
  ],
  [
    siteStyles.includes('textarea[data-locked="true"]') &&
      hasScrollablePrompt &&
      aristotleScript.includes("promptInput.scrollTop = 0") &&
      aristotleScript.includes(
        'promptInput.setAttribute("aria-readonly", "true")',
      ),
    "Imported ChatGPT transcripts must remain internally scrollable while read-only",
  ],
  [
    aristotleScript.includes(
      'setSubmitLoading(true, "Loading conversation…")',
    ) &&
      aristotleScript.includes('setSubmitLoading(true, "Submitting…")') &&
      aristotleScript.includes(
        'submitButton.dataset.loading = String(loading)',
      ) &&
      aristotleScript.includes(
        'submitButton.setAttribute("aria-busy", String(loading))',
      ) &&
      loadingStops.length >= 2 &&
      hasLoadingSpinner,
    "The primary action must show an accessible animated spinner during both complete-conversation import and Aristotle submission",
  ],
  [
    aristotleCore.includes(
      "export const CHATGPT_SHARE_RETRY_DELAYS_MS = Object.freeze([0, 1_000, 3_000])",
    ) &&
      aristotleCore.includes("shouldRetryChatGPTShareStatus") &&
      aristotleScript.includes(
        "attempt < CHATGPT_SHARE_RETRY_DELAYS_MS.length",
      ) &&
      aristotleScript.includes(
        "shouldRetryChatGPTShareStatus(response.status)",
      ) &&
      aristotleScript.includes(
        "The public reader was temporarily unavailable. Retrying automatically",
      ),
    "Transient ChatGPT Share failures must retry automatically while the loading state remains active",
  ],
  [aristotleScript.includes("window.sessionStorage"), "Aristotle key must use tab-scoped sessionStorage"],
  [!aristotleScript.includes("localStorage"), "Aristotle script must not use persistent localStorage"],
  [!aristotleScript.includes("console."), "Aristotle script must not log sensitive workflow data"],
  [
    aristotleScript.includes("document.hidden") &&
      aristotleScript.includes('"visibilitychange"') &&
      aristotleScript.includes(
        "the browser may throttle background status checks",
      ) &&
      !aristotleScript.includes("Polling paused while this page is hidden."),
    "Aristotle polling must remain scheduled in an open background tab while disclosing browser throttling",
  ],
  [
    aristotleCore.includes("10_000") &&
      aristotleCore.includes("30_000") &&
      aristotleCore.includes("60_000"),
    "Aristotle polling must use the 10/30/60-second cadence",
  ],
  [
    sessionStorageWrites.length === 4 &&
      sessionStorageWrites.includes("KEY_STORAGE_NAME") &&
      sessionStorageWrites.includes("PROJECT_STORAGE_NAME") &&
      sessionStorageWrites.includes("SUBMISSION_STORAGE_NAME") &&
      sessionStorageWrites.includes("STATUS_HISTORY_STORAGE_NAME"),
    "Aristotle tab storage must retain only the key, active project, authenticated pending submission, and sanitized status history",
  ],
  [
    aristotleCore.includes('"complete_with_errors"') &&
      aristotleCore.includes('"out_of_budget"') &&
      aristotleCore.includes("isRecoverableCheckpoint") &&
      aristotlePage.includes("data-continuation-detail") &&
      aristotlePage.includes("data-continuation-pass") &&
      aristotlePage.includes("data-continue-button") &&
      aristotlePage.includes("data-auto-continue-toggle") &&
      aristotlePage.includes("Every follow-up uses your Aristotle quota") &&
      aristotleScript.includes("/continue`") &&
      aristotleScript.includes("JSON.stringify({ previousTaskId })") &&
      aristotleScript.includes("continuedCheckpointTaskIds.includes") &&
      aristotleScript.includes("scheduleAutomaticContinuation") &&
      aristotleScript.includes("scheduleCheckpointRefresh") &&
      aristotleScript.includes("autoContinuationPaused") &&
      aristotleScript.includes("withContinuationDispatchLock") &&
      aristotleScript.includes("navigator?.locks") &&
      aristotleScript.includes("automaticContinuationCount") &&
      aristotleScript.includes("checkpointObservations") &&
      aristotleScript.includes("pendingContinuationAttempt") &&
      aristotleCore.includes("getContinuationPolicy") &&
      aristotleCore.includes("reconcileContinuationAttempt") &&
      aristotleCore.includes("normalizeAutoContinuationState") &&
      aristotleScript.includes("storedAutoContinuationState") &&
      aristotlePage.includes("There is no fixed follow-up limit") &&
      aristotleScript.includes("without a fixed follow-up limit") &&
      aristotleScript.includes("Continuation ${continuationPassCount} accepted") &&
      aristotleScript.includes("continuationPassCount,") &&
      aristotleScript.includes(
        "continuedCheckpointTaskIds: continuedCheckpointTaskIds.slice(-500)",
      ) &&
      checkpointBranch.includes("return;") &&
      !checkpointBranch.includes("archiveSubmission") &&
      !checkpointBranch.includes("clearPendingSubmission"),
    "Recoverable Aristotle checkpoints must continue automatically without an arbitrary pass cap, with duplicate guards, a visible pass count, pause control, manual fallback, quota disclosure, and tab recovery",
  ],
  [
    aristotlePage.includes("Requests and results are archived publicly") &&
      aristotlePage.includes("data-archive-link") &&
      aristotleScript.includes("/archive`") &&
      aristotleScript.includes("statusHistory") &&
      aristotleScript.includes("archiveToken") &&
      aristotleScript.includes("recoverLegacy: true") &&
      aristotleScript.includes("clearPendingSubmission()"),
    "Terminal projects must publish their prompt, status history, and available result through the authenticated archive endpoint",
  ],
  [
    aristotlePage.includes('href="./successes/"') &&
      aristotleSuccessesPage.includes("Successful runs.") &&
      aristotleSuccessesScript.includes("ARISTOTLE_SUCCESS_INDEX_URL") &&
      aristotleSuccessesScript.includes("validateSuccessIndex") &&
      !aristotleSuccessesScript.includes("submissions/failures") &&
      !aristotleSuccessesPage.includes("submissions/failures"),
    "The GitHub Pages archive must list successful records only",
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
