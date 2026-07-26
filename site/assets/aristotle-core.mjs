export const ARISTOTLE_PROXY_URL =
  "https://formagization-aristotle-proxy.ageofresearch.chatgpt.site";
export const KEY_HEADER_NAME = "X-Formagization-Aristotle-Key";
export const PROMPT_LIMIT = 100_000;
export const CHATGPT_SHARE_RELAY_ORIGIN = "https://r.jina.ai";
export const CHATGPT_SHARE_MAX_BYTES = 750_000;
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

export function parseChatGPTShareUrl(value) {
  let url;
  try {
    url = new URL(String(value ?? "").trim());
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
  let url;
  try {
    url = new URL(String(value ?? "").trim());
  } catch {
    return false;
  }
  return (
    url.hostname.toLowerCase() === "chatgpt.com" &&
    /^\/share(?:\/|$)/i.test(url.pathname)
  );
}

export function getChatGPTShareRelayUrl(sharedLink) {
  if (
    !sharedLink ||
    typeof sharedLink.url !== "string" ||
    !parseChatGPTShareUrl(sharedLink.url)
  ) {
    throw new Error("Enter a valid public ChatGPT Share link.");
  }
  return `${CHATGPT_SHARE_RELAY_ORIGIN}/${sharedLink.url}`;
}

function cleanSharedTurn(value, role) {
  let text = String(value ?? "").trim();
  if (role !== "llm") return text;

  text = text
    .replace(/^\s*(?:·\s*){3,}\n+/u, "")
    .replace(/^\s*Worked for [^\n]+\n+/i, "")
    .trimStart();

  const actionKeyword =
    /\b(?:download|proof|bundle|manuscript|pdf|latex|source|verifier|verification|output|audit|diff)\b/i;
  while (text) {
    const lineEnd = text.indexOf("\n");
    const firstLine = lineEnd >= 0 ? text.slice(0, lineEnd) : text;
    const segments = firstLine
      .split(/[·•]/)
      .map((segment) => segment.trim())
      .filter(Boolean);
    if (
      segments.length < 3 ||
      segments.some((segment) => !actionKeyword.test(segment))
    ) {
      break;
    }
    text = (lineEnd >= 0 ? text.slice(lineEnd + 1) : "").trimStart();
  }

  return text
    .replace(/\n+\s*ChatGPT is AI and can make mistakes\.[\s\S]*$/i, "")
    .replace(/\n+\s*Sources\s*$/i, "")
    .trim();
}

function findConversationMarkers(markdown) {
  const markerPattern =
    /^####[ \t]+(You said|Tú dijiste|Tu dijiste|Dijiste|ChatGPT said|ChatGPT dijo):[ \t]*$/i;
  const markers = [];
  let offset = 0;
  let fenceCharacter = "";

  for (const lineWithEnding of markdown.match(/[^\n]*(?:\n|$)/g) ?? []) {
    if (!lineWithEnding) continue;
    const line = lineWithEnding.replace(/\r?\n$/, "");
    const trimmed = line.trim();
    const fence = trimmed.match(/^(`{3,}|~{3,})/);
    if (fence) {
      const character = fence[1][0];
      if (!fenceCharacter) fenceCharacter = character;
      else if (fenceCharacter === character) fenceCharacter = "";
      offset += lineWithEnding.length;
      continue;
    }

    if (!fenceCharacter) {
      const marker = line.match(markerPattern);
      if (marker) {
        markers.push({
          index: offset,
          length: line.length,
          role: /^ChatGPT/i.test(marker[1]) ? "llm" : "person",
        });
      }
    }
    offset += lineWithEnding.length;
  }

  for (let index = 1; index < markers.length; index += 1) {
    if (markers[index - 1].role === markers[index].role) {
      throw new Error(
        "The shared page has an ambiguous speaker sequence. Paste the copied conversation text instead.",
      );
    }
  }
  return markers;
}

export function extractChatGPTConversation(markdown, { maxChars = PROMPT_LIMIT } = {}) {
  if (
    typeof markdown !== "string" ||
    !markdown ||
    markdown.length > CHATGPT_SHARE_MAX_BYTES ||
    markdown.includes("\u0000")
  ) {
    throw new Error("The public ChatGPT conversation is empty, unsafe, or too large.");
  }

  const markers = findConversationMarkers(markdown);
  if (markers.length === 0) {
    throw new Error(
      "This shared page does not expose a readable conversation transcript.",
    );
  }

  const turns = [];
  for (let index = 0; index < markers.length; index += 1) {
    const marker = markers[index];
    const nextMarker = markers[index + 1];
    const start = marker.index + marker.length;
    const end = nextMarker ? nextMarker.index : markdown.length;
    const text = cleanSharedTurn(markdown.slice(start, end), marker.role);
    if (!text) continue;
    turns.push({
      role: marker.role,
      text,
    });
  }

  if (turns.length === 0) {
    throw new Error(
      "This shared page does not expose any readable conversation turns.",
    );
  }

  const text = turns
    .map((turn) => `${turn.role === "person" ? "PERSON" : "LLM"}:\n${turn.text}`)
    .join("\n\n");
  const characterLimit = Math.max(1, Math.min(PROMPT_LIMIT, Number(maxChars) || PROMPT_LIMIT));
  if (text.length > characterLimit) {
    throw new Error(
      `The imported conversation contains ${text.length.toLocaleString("en-US")} characters and exceeds the ${characterLimit.toLocaleString("en-US")}-character request limit. Nothing was truncated.`,
    );
  }

  return {
    text,
    turns,
    turnCount: turns.length,
    personTurnCount: turns.filter((turn) => turn.role === "person").length,
    llmTurnCount: turns.filter((turn) => turn.role === "llm").length,
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
