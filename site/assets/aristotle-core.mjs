export const ARISTOTLE_PROXY_URL =
  "https://formagization-aristotle-proxy.ageofresearch.chatgpt.site";
export const KEY_HEADER_NAME = "X-Formagization-Aristotle-Key";
export const PROMPT_LIMIT = 100_000;
export const CHATGPT_TRANSCRIPT_LIMIT = 2_000_000;
export const CHATGPT_SHARE_RESPONSE_MAX_BYTES = 2_100_000;
export const CHATGPT_SHARE_RETRY_DELAYS_MS = Object.freeze([0, 1_000, 3_000]);
export const PROJECT_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
const CHATGPT_SHARE_TRANSIENT_STATUSES = new Set([
  408,
  425,
  429,
  500,
  502,
  503,
  504,
]);

export const TERMINAL_STATUSES = new Set([
  "completed",
  "complete",
  "succeeded",
  "success",
  "failed",
  "error",
  "cancelled",
  "canceled",
]);

export const SUCCESS_STATUSES = new Set([
  "completed",
  "complete",
  "succeeded",
  "success",
]);

export function validateKey(key) {
  if (!key) return "Enter your Aristotle API key.";
  if (key.length > 512 || /\s/u.test(key)) {
    return "The API key must be at most 512 characters and contain no whitespace.";
  }
  return "";
}

export function parseChatGPTShareUrl(value) {
  const candidate = String(value ?? "").trim();
  if (!candidate || /\s/u.test(candidate)) return null;

  let url;
  try {
    url = new URL(candidate);
  } catch {
    return null;
  }

  const match = url.pathname.match(/^\/share\/([A-Za-z0-9_-]{8,120})\/?$/);
  if (
    url.protocol !== "https:" ||
    url.hostname.toLowerCase() !== "chatgpt.com" ||
    url.username ||
    url.password ||
    url.port ||
    url.search ||
    url.hash ||
    !match
  ) {
    return null;
  }

  return {
    id: match[1],
    url: `https://chatgpt.com/share/${encodeURIComponent(match[1])}`,
  };
}

export function looksLikeChatGPTShareUrl(value) {
  const candidate = String(value ?? "").trim();
  if (!candidate || /\s/u.test(candidate)) return false;

  let url;
  try {
    url = new URL(candidate);
  } catch {
    return false;
  }
  return (
    url.hostname.toLowerCase() === "chatgpt.com" &&
    /^\/share(?:\/|$)/i.test(url.pathname)
  );
}

export function getChatGPTShareApiUrl(sharedLink) {
  if (
    !sharedLink ||
    typeof sharedLink.url !== "string" ||
    !parseChatGPTShareUrl(sharedLink.url)
  ) {
    throw new Error("Enter a valid public ChatGPT Share link.");
  }
  return `${ARISTOTLE_PROXY_URL}/api/chatgpt-share`;
}

export function shouldRetryChatGPTShareStatus(status) {
  return CHATGPT_SHARE_TRANSIENT_STATUSES.has(status);
}

export function validateImportedChatGPTConversation(payload, sharedLink) {
  if (
    !payload ||
    typeof payload !== "object" ||
    Array.isArray(payload) ||
    !sharedLink ||
    payload.complete !== true ||
    payload.completeness !== "selected-public-branch" ||
    payload.sourceUrl !== sharedLink.url ||
    typeof payload.text !== "string" ||
    !payload.text ||
    payload.text.includes("\u0000") ||
    Array.from(payload.text).length > CHATGPT_TRANSCRIPT_LIMIT ||
    typeof payload.title !== "string" ||
    !payload.title.trim() ||
    Array.from(payload.title).length > 240 ||
    typeof payload.sourceSha256 !== "string" ||
    !/^sha256:[a-f0-9]{64}$/.test(payload.sourceSha256) ||
    typeof payload.importToken !== "string" ||
    !/^[A-Za-z0-9_-]{43}$/.test(payload.importToken)
  ) {
    throw new Error(
      "The complete public conversation response was malformed or incomplete.",
    );
  }

  const integerFields = [
    "turnCount",
    "personTurnCount",
    "llmTurnCount",
    "attachmentCount",
    "characters",
    "branchNodeCount",
  ];
  if (
    integerFields.some(
      (field) =>
        !Number.isSafeInteger(payload[field]) ||
        payload[field] < 0,
    ) ||
    payload.turnCount < 1 ||
    payload.personTurnCount + payload.llmTurnCount !== payload.turnCount ||
    payload.characters !== Array.from(payload.text).length
  ) {
    throw new Error(
      "The complete public conversation response failed its completeness checks.",
    );
  }

  return {
    title: payload.title.trim(),
    sourceUrl: payload.sourceUrl,
    text: payload.text,
    turnCount: payload.turnCount,
    personTurnCount: payload.personTurnCount,
    llmTurnCount: payload.llmTurnCount,
    attachmentCount: payload.attachmentCount,
    characters: payload.characters,
    branchNodeCount: payload.branchNodeCount,
    complete: true,
    completeness: "selected-public-branch",
    sourceSha256: payload.sourceSha256,
    importToken: payload.importToken,
    retrievalMethod:
      typeof payload.retrievalMethod === "string"
        ? payload.retrievalMethod
        : "complete-public-branch",
    importerVersion:
      typeof payload.importerVersion === "string"
        ? payload.importerVersion
        : "unknown",
  };
}

export function normalizeStatus(value) {
  return typeof value === "string" && value.trim()
    ? value.trim().toLowerCase()
    : "unknown";
}

export function getStatus(payload, { initial = false } = {}) {
  const taskStatus =
    payload?.taskStatus ??
    payload?.task_status ??
    payload?.latestTask?.status ??
    payload?.latest_task?.status ??
    payload?.task?.status;
  if (taskStatus !== undefined && taskStatus !== null) return normalizeStatus(taskStatus);

  const projectStatus =
    payload?.projectStatus ??
    payload?.project_status ??
    payload?.project?.status ??
    payload?.status;
  if (projectStatus === 1 || projectStatus === "1") return initial ? "submitted" : "running";
  if (projectStatus === 2 || projectStatus === "2") return "idle";
  return normalizeStatus(projectStatus);
}

export function getPollDelay(attemptCount) {
  if (attemptCount < 6) return 10_000;
  if (attemptCount < 16) return 30_000;
  return 60_000;
}

export function getDashboardUrl(payload) {
  const value =
    payload?.dashboardUrl ??
    payload?.dashboard_url ??
    payload?.harmonicDashboardUrl ??
    payload?.harmonic_dashboard_url ??
    payload?.project?.dashboardUrl ??
    payload?.project?.dashboard_url;
  if (typeof value !== "string") return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      url.hostname === "aristotle.harmonic.fun" &&
      url.port === ""
      ? url.href
      : "";
  } catch {
    return "";
  }
}

export function getErrorMessage(status, payload, action) {
  const code = normalizeStatus(payload?.code ?? payload?.error?.code);
  if (status === 401 || status === 403 || code.includes("invalid_key")) {
    return "Aristotle rejected the API key. Check it and try again.";
  }
  if (
    action === "download" &&
    (status === 404 || code.includes("result_unavailable"))
  ) {
    return "The result archive is not available yet.";
  }
  if (status === 409 || status === 429 || code.includes("concurrency")) {
    return "Aristotle’s concurrency limit is currently reached. Try again after an active project finishes.";
  }
  if (status === 408 || status === 504 || code.includes("timeout")) {
    return "Aristotle did not respond in time. The project may still be running; try refreshing its status.";
  }
  if (status >= 500) {
    return "The Aristotle service is temporarily unavailable. Please try again.";
  }
  return action === "submit"
    ? "The project could not be submitted."
    : action === "download"
      ? "The result archive could not be downloaded."
      : "The project status could not be refreshed.";
}
