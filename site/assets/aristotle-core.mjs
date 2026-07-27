export const ARISTOTLE_PROXY_URL =
  "https://formagization-aristotle-proxy.ageofresearch.chatgpt.site";
export const ARISTOTLE_SUCCESS_INDEX_URL =
  "https://raw.githubusercontent.com/ageofresearch/ageofresearch.github.io/main/submissions/successes/index.json";
export const KEY_HEADER_NAME = "X-Formagization-Aristotle-Key";
export const PROMPT_LIMIT = 100_000;
export const CHATGPT_TRANSCRIPT_LIMIT = 2_000_000;
export const CHATGPT_SHARE_RESPONSE_MAX_BYTES = 2_100_000;
export const CHATGPT_SHARE_RETRY_DELAYS_MS = Object.freeze([0, 1_000, 3_000]);
export const PROJECT_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
export const ARCHIVE_TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;
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
  "complete_with_errors",
  "out_of_budget",
  "failed",
  "error",
  "cancelled",
  "canceled",
]);

export const RECOVERABLE_CHECKPOINT_STATUSES = new Set([
  "complete_with_errors",
  "out_of_budget",
]);

export const SUCCESS_STATUSES = new Set([
  "completed",
  "complete",
  "succeeded",
  "success",
]);

export function normalizeAutoContinuationState(paused, reason) {
  const normalizedPaused = paused === undefined ? false : paused;
  const normalizedReason = reason === undefined ? "" : reason;
  if (
    typeof normalizedPaused !== "boolean" ||
    typeof normalizedReason !== "string" ||
    !["", "user", "automatic-limit", "no-progress"].includes(
      normalizedReason,
    )
  ) {
    return null;
  }
  const shouldPause = normalizedPaused || normalizedReason !== "";
  return {
    paused: shouldPause,
    reason: shouldPause ? "user" : "",
  };
}

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

export function isRecoverableCheckpoint(payload) {
  return RECOVERABLE_CHECKPOINT_STATUSES.has(getStatus(payload));
}

export function getTaskId(payload) {
  const value =
    payload?.taskId ??
    payload?.task_id ??
    payload?.latestTask?.taskId ??
    payload?.latestTask?.agent_task_id ??
    payload?.latestTask?.task_id ??
    payload?.latest_task?.taskId ??
    payload?.latest_task?.agent_task_id ??
    payload?.latest_task?.task_id ??
    payload?.task?.taskId ??
    payload?.task?.agent_task_id ??
    payload?.task?.task_id;
  return typeof value === "string" && PROJECT_ID_PATTERN.test(value)
    ? value
    : "";
}

export function getCheckpointFingerprint(payload) {
  if (!isRecoverableCheckpoint(payload)) return "";
  const summary =
    payload?.outputSummary ??
    payload?.output_summary ??
    payload?.summary ??
    payload?.latestTask?.outputSummary ??
    payload?.latestTask?.output_summary ??
    payload?.latest_task?.outputSummary ??
    payload?.latest_task?.output_summary ??
    payload?.task?.outputSummary ??
    payload?.task?.output_summary ??
    "";
  return String(summary)
    .normalize("NFKC")
    .replace(/\s+/gu, " ")
    .trim()
    .toLowerCase()
    .slice(0, 10_000);
}

export function recordCheckpointObservation(observations, payload) {
  const current = Array.isArray(observations)
    ? observations.filter(
        (entry) =>
          entry &&
          typeof entry === "object" &&
          typeof entry.taskId === "string" &&
          PROJECT_ID_PATTERN.test(entry.taskId) &&
          typeof entry.fingerprint === "string",
      )
    : [];
  const taskId = getTaskId(payload);
  const fingerprint = getCheckpointFingerprint(payload);
  if (!taskId || !fingerprint || current.some((entry) => entry.taskId === taskId)) {
    return current.slice(-50);
  }
  return [...current, { taskId, fingerprint }].slice(-50);
}

export function getContinuationPolicy({
  payload,
  autoContinuationPaused = false,
} = {}) {
  const status = getStatus(payload);
  if (SUCCESS_STATUSES.has(status)) {
    return { action: "final-success", reason: "complete" };
  }
  if (
    TERMINAL_STATUSES.has(status) &&
    !RECOVERABLE_CHECKPOINT_STATUSES.has(status)
  ) {
    return { action: "final-failure", reason: status };
  }
  if (!RECOVERABLE_CHECKPOINT_STATUSES.has(status)) {
    return { action: "poll", reason: status };
  }
  if (autoContinuationPaused) {
    return { action: "manual", reason: "paused" };
  }
  return { action: "auto-continue", reason: "checkpoint" };
}

export function reconcileContinuationAttempt({
  pendingAttempt = null,
  payload,
  continuationPassCount = 0,
  automaticContinuationCount = 0,
  continuedCheckpointTaskIds = [],
} = {}) {
  const currentTaskId = getTaskId(payload);
  if (
    !pendingAttempt ||
    typeof pendingAttempt !== "object" ||
    typeof pendingAttempt.previousTaskId !== "string" ||
    typeof pendingAttempt.manual !== "boolean" ||
    !currentTaskId ||
    currentTaskId === pendingAttempt.previousTaskId
  ) {
    return {
      advanced: false,
      pendingAttempt,
      continuationPassCount,
      automaticContinuationCount,
      continuedCheckpointTaskIds,
    };
  }
  return {
    advanced: true,
    pendingAttempt: null,
    continuationPassCount: continuationPassCount + 1,
    automaticContinuationCount:
      automaticContinuationCount + (pendingAttempt.manual ? 0 : 1),
    continuedCheckpointTaskIds: [
      ...new Set([
        ...continuedCheckpointTaskIds,
        pendingAttempt.previousTaskId,
      ]),
    ].slice(-500),
  };
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
  if (action === "continue" && code.includes("stale_continuation")) {
    return "The project advanced to a different task before this continuation was accepted.";
  }
  if (
    action === "continue" &&
    (
      code.includes("project_not_idle") ||
      code.includes("project_task_running")
    )
  ) {
    return "The project already has a running task.";
  }
  if (action === "continue" && code.includes("already_complete")) {
    return "The project is already complete.";
  }
  if (action === "continue" && code.includes("not_resumable")) {
    return "The latest task is not a resumable checkpoint.";
  }
  if (status === 409 || status === 429 || code.includes("concurrency")) {
    return "Aristotle’s concurrency limit is currently reached. Try again after an active project finishes.";
  }
  if (status === 408 || status === 504 || code.includes("timeout")) {
    return "Aristotle did not respond in time. The project may still be running; try refreshing its status.";
  }
  if (status >= 500) {
    return action === "archive"
      ? "The public GitHub archive is temporarily unavailable. The page will retry while it remains open."
      : "The Aristotle service is temporarily unavailable. Please try again.";
  }
  return action === "submit"
    ? "The project could not be submitted."
    : action === "download"
      ? "The result archive could not be downloaded."
      : action === "archive"
        ? "The completed submission could not be saved to the public GitHub archive."
        : action === "continue"
          ? "The project could not be continued."
          : "The project status could not be refreshed.";
}

export function createStatusSnapshot(payload, observedAt = new Date().toISOString()) {
  const percent = payload?.percentComplete;
  return {
    observedAt,
    projectStatus:
      typeof payload?.projectStatus === "string" ||
      typeof payload?.projectStatus === "number"
        ? payload.projectStatus
        : null,
    taskId: typeof payload?.taskId === "string" ? payload.taskId : null,
    taskStatus:
      typeof payload?.taskStatus === "string" ? payload.taskStatus : null,
    percentComplete:
      typeof percent === "number" && Number.isFinite(percent)
        ? Math.min(100, Math.max(0, percent))
        : null,
    outputSummary:
      typeof payload?.outputSummary === "string"
        ? payload.outputSummary.slice(0, 10_000)
        : null,
    projectUpdatedAt:
      typeof payload?.updatedAt === "string" ? payload.updatedAt : null,
    taskUpdatedAt:
      typeof payload?.taskUpdatedAt === "string"
        ? payload.taskUpdatedAt
        : null,
  };
}

export function validateArchiveToken(value) {
  return typeof value === "string" && ARCHIVE_TOKEN_PATTERN.test(value);
}

export function validateSuccessIndex(payload) {
  if (
    !payload ||
    typeof payload !== "object" ||
    Array.isArray(payload) ||
    payload.schemaVersion !== "formagization.aristotle-success-index/v1" ||
    !Array.isArray(payload.items)
  ) {
    throw new Error("The public success index is unreadable.");
  }
  return payload.items.map((item) => {
    if (
      !item ||
      typeof item !== "object" ||
      Array.isArray(item) ||
      typeof item.projectId !== "string" ||
      !PROJECT_ID_PATTERN.test(item.projectId) ||
      typeof item.title !== "string" ||
      typeof item.taskStatus !== "string" ||
      typeof item.archivedAt !== "string" ||
      typeof item.sourceKind !== "string" ||
      typeof item.repositoryUrl !== "string" ||
      !item.repositoryUrl.startsWith(
        "https://github.com/ageofresearch/ageofresearch.github.io/tree/main/submissions/successes/",
      ) ||
      (
        item.resultUrl !== null &&
        (
          typeof item.resultUrl !== "string" ||
          !item.resultUrl.startsWith(
            "https://github.com/ageofresearch/ageofresearch.github.io/raw/main/submissions/successes/",
          )
        )
      )
    ) {
      throw new Error("The public success index contains an invalid record.");
    }
    return {
      projectId: item.projectId,
      title: item.title.trim() || "Untitled mathematical request",
      taskStatus: item.taskStatus,
      submittedAt:
        typeof item.submittedAt === "string" ? item.submittedAt : null,
      completedAt:
        typeof item.completedAt === "string" ? item.completedAt : null,
      archivedAt: item.archivedAt,
      sourceKind: item.sourceKind,
      outputSummary:
        typeof item.outputSummary === "string" ? item.outputSummary : null,
      repositoryUrl: item.repositoryUrl,
      resultUrl: item.resultUrl,
    };
  });
}
