export const ARISTOTLE_PROXY_URL =
  "https://formagization-aristotle-proxy.ageofresearch.chatgpt.site";
export const KEY_HEADER_NAME = "X-Formagization-Aristotle-Key";
export const PROMPT_LIMIT = 100_000;
export const PROJECT_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;

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
