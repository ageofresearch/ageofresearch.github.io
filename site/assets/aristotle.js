import {
  ARISTOTLE_PROXY_URL,
  KEY_HEADER_NAME,
  PROJECT_ID_PATTERN,
  PROMPT_LIMIT,
  SUCCESS_STATUSES,
  TERMINAL_STATUSES,
  getDashboardUrl,
  getErrorMessage,
  getPollDelay,
  getStatus,
  validateKey,
} from "./aristotle-core.mjs";

(() => {
  "use strict";

  const KEY_STORAGE_NAME = "formagization.aristotle.apiKey";
  const PROJECT_STORAGE_NAME = "formagization.aristotle.activeProjectId";

  const form = document.querySelector("[data-aristotle-form]");
  if (!(form instanceof HTMLFormElement)) return;

  const keyInput = form.querySelector("[data-aristotle-key]");
  const promptInput = form.querySelector("[data-aristotle-prompt]");
  const keyToggle = form.querySelector("[data-key-toggle]");
  const keyForget = form.querySelector("[data-key-forget]");
  const promptCount = form.querySelector("[data-prompt-count]");
  const promptLimitStatus = form.querySelector("[data-prompt-limit-status]");
  const submitButton = form.querySelector("[data-submit-button]");
  const formStatus = form.querySelector("[data-form-status]");
  const projectPanel = document.querySelector("[data-project-panel]");
  const projectState = document.querySelector("[data-project-state]");
  const projectIdOutput = document.querySelector("[data-project-id]");
  const taskStatusOutput = document.querySelector("[data-task-status]");
  const projectPercent = document.querySelector("[data-project-percent]");
  const progressBar = document.querySelector("[data-progress-bar]");
  const projectSummary = document.querySelector("[data-project-summary]");
  const dashboardLink = document.querySelector("[data-dashboard-link]");
  const downloadButton = document.querySelector("[data-download-button]");
  const pollingNote = document.querySelector("[data-polling-note]");
  const projectAnnouncement = document.querySelector("[data-project-announcement]");
  const workspace = document.querySelector("[data-aristotle-workspace]");
  const workspacePanes = [...document.querySelectorAll("[data-aristotle-pane]")];
  const viewButtons = [...document.querySelectorAll("[data-aristotle-view]")];
  const narrowWorkspace = window.matchMedia("(max-width: 900px)");

  if (
    !(keyInput instanceof HTMLInputElement) ||
    !(promptInput instanceof HTMLTextAreaElement) ||
    !(submitButton instanceof HTMLButtonElement) ||
    !(downloadButton instanceof HTMLButtonElement)
  ) {
    return;
  }

  let activeProjectId = "";
  let pollCount = 0;
  let pollTimer = 0;
  let requestInFlight = false;
  let lastProjectData = null;
  let activeWorkspaceView = "request";

  const setWorkspaceView = (view, { focus = false } = {}) => {
    if (view !== "request" && view !== "progress") return;
    activeWorkspaceView = view;

    if (workspace instanceof HTMLElement) workspace.dataset.mobileView = view;
    for (const button of viewButtons) {
      if (!(button instanceof HTMLButtonElement)) continue;
      const isActive = button.dataset.aristotleView === view;
      button.setAttribute("aria-pressed", String(isActive));
      if (focus && isActive) button.focus();
    }

    for (const pane of workspacePanes) {
      if (!(pane instanceof HTMLElement)) continue;
      if (!narrowWorkspace.matches) {
        pane.hidden = false;
        pane.removeAttribute("aria-hidden");
        pane.removeAttribute("inert");
        continue;
      }
      const isInactive = pane.dataset.aristotlePane !== view;
      pane.hidden = isInactive;
      pane.setAttribute("aria-hidden", String(isInactive));
      pane.toggleAttribute("inert", isInactive);
    }
  };

  for (const button of viewButtons) {
    button.addEventListener("click", () => {
      setWorkspaceView(button.dataset.aristotleView, { focus: true });
    });
  }
  narrowWorkspace.addEventListener("change", () => setWorkspaceView(activeWorkspaceView));
  setWorkspaceView(activeWorkspaceView);

  const readStoredKey = () => {
    try {
      return window.sessionStorage.getItem(KEY_STORAGE_NAME) ?? "";
    } catch {
      return "";
    }
  };

  const storeKey = (key) => {
    try {
      window.sessionStorage.setItem(KEY_STORAGE_NAME, key);
      return true;
    } catch {
      return false;
    }
  };

  const forgetKey = () => {
    try {
      window.sessionStorage.removeItem(KEY_STORAGE_NAME);
    } catch {
      // The input is still cleared when browser storage is unavailable.
    }
  };

  const readStoredProjectId = () => {
    try {
      const projectId = window.sessionStorage.getItem(PROJECT_STORAGE_NAME) ?? "";
      if (PROJECT_ID_PATTERN.test(projectId)) return projectId;
      window.sessionStorage.removeItem(PROJECT_STORAGE_NAME);
    } catch {
      // An invalid or unavailable tab store simply disables refresh recovery.
    }
    return "";
  };

  const storeProjectId = (projectId) => {
    try {
      window.sessionStorage.setItem(PROJECT_STORAGE_NAME, projectId);
    } catch {
      // The in-memory project remains usable until this page is refreshed.
    }
  };

  const setFormStatus = (message, kind = "") => {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.classList.toggle("is-error", kind === "error");
    formStatus.classList.toggle("is-success", kind === "success");
  };

  const setPromptCount = () => {
    const length = promptInput.value.length;
    if (promptCount) {
      promptCount.textContent = `${length.toLocaleString("en-US")} / 100,000`;
      promptCount.classList.toggle("is-over-limit", length > PROMPT_LIMIT);
    }
    promptInput.setAttribute("aria-invalid", String(length > PROMPT_LIMIT));
  };

  const displayStatus = (value) =>
    value === "unknown"
      ? "Unknown"
      : value.replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase());

  const getProjectId = (payload) => {
    const value =
      payload?.projectId ??
      payload?.project_id ??
      payload?.id ??
      payload?.project?.projectId ??
      payload?.project?.project_id ??
      payload?.project?.id;
    return typeof value === "string" ? value : "";
  };

  const getPercent = (payload) => {
    const raw =
      payload?.percentage ??
      payload?.percent ??
      payload?.percentComplete ??
      payload?.percent_complete ??
      payload?.progressPercent ??
      payload?.progress_percent ??
      payload?.progress ??
      payload?.latestTask?.percentage ??
      payload?.latestTask?.progress ??
      payload?.latest_task?.percentage ??
      payload?.latest_task?.progress ??
      payload?.task?.percentage ??
      payload?.task?.progress;
    const numeric = typeof raw === "string" ? Number(raw.replace("%", "")) : Number(raw);
    if (!Number.isFinite(numeric)) return null;
    return Math.min(100, Math.max(0, Math.round(numeric)));
  };

  const getSummary = (payload) => {
    const value =
      payload?.outputSummary ??
      payload?.output_summary ??
      payload?.summary ??
      payload?.latestTask?.outputSummary ??
      payload?.latestTask?.output_summary ??
      payload?.latest_task?.outputSummary ??
      payload?.latest_task?.output_summary ??
      payload?.task?.outputSummary ??
      payload?.task?.output_summary;
    return typeof value === "string" && value.trim()
      ? value.trim()
      : "No output has been reported yet.";
  };

  const readJsonResponse = async (response, action) => {
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      if (response.ok) throw new Error("Aristotle returned a malformed response.");
    }
    if (!response.ok) throw new Error(getErrorMessage(response.status, payload, action));
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      throw new Error("Aristotle returned a malformed response.");
    }
    return payload;
  };

  const updateProjectPanel = (payload, { initial = false } = {}) => {
    lastProjectData = payload;
    const status = getStatus(payload, { initial });
    const percent = getPercent(payload);
    const dashboardUrl = getDashboardUrl(payload);

    if (workspace instanceof HTMLElement) workspace.dataset.hasProject = "true";
    if (projectPanel instanceof HTMLElement) projectPanel.hidden = false;
    if (projectIdOutput) projectIdOutput.textContent = activeProjectId || "—";
    if (taskStatusOutput) taskStatusOutput.textContent = displayStatus(status);
    if (projectState) {
      projectState.textContent = displayStatus(status);
      projectState.dataset.state = status;
    }
    if (projectPercent) projectPercent.textContent = percent === null ? "Not reported" : `${percent}%`;
    if (progressBar instanceof HTMLElement) progressBar.style.width = `${percent ?? 0}%`;
    if (projectSummary) projectSummary.textContent = getSummary(payload);

    if (dashboardLink instanceof HTMLAnchorElement) {
      dashboardLink.hidden = !dashboardUrl;
      if (dashboardUrl) dashboardLink.href = dashboardUrl;
      else dashboardLink.removeAttribute("href");
    }

    const canDownload =
      payload?.canDownload === true ||
      payload?.can_download === true ||
      SUCCESS_STATUSES.has(status);
    downloadButton.hidden = !canDownload;
    if (projectAnnouncement) {
      projectAnnouncement.textContent =
        `Project ${displayStatus(status)}. Completion ${
          percent === null ? "not reported" : `${percent}%`
        }.${canDownload ? " The result is ready to download." : ""}`;
    }
    if (payload?.terminal === true || TERMINAL_STATUSES.has(status)) {
      clearPolling();
      if (canDownload || SUCCESS_STATUSES.has(status)) {
        setFormStatus("Aristotle reports that the project is complete.", "success");
      } else {
        setFormStatus(`The project reached the terminal status “${displayStatus(status)}”.`, "error");
      }
    }
  };

  const clearPolling = () => {
    if (pollTimer) window.clearTimeout(pollTimer);
    pollTimer = 0;
  };

  const schedulePoll = () => {
    clearPolling();
    if (
      !activeProjectId ||
      document.hidden ||
      lastProjectData?.terminal === true ||
      TERMINAL_STATUSES.has(getStatus(lastProjectData))
    ) {
      return;
    }
    const delay = getPollDelay(pollCount);
    if (pollingNote) pollingNote.textContent = `Next refresh in ${delay / 1000} seconds while this page remains visible.`;
    pollTimer = window.setTimeout(pollStatus, delay);
  };

  const pollStatus = async () => {
    clearPolling();
    if (!activeProjectId || document.hidden || requestInFlight) {
      schedulePoll();
      return;
    }

    const key = keyInput.value;
    const keyError = validateKey(key);
    if (keyError) {
      if (pollingNote) pollingNote.textContent = "Polling paused until an API key is entered.";
      return;
    }

    requestInFlight = true;
    pollCount += 1;
    if (pollingNote) pollingNote.textContent = "Refreshing project status…";
    try {
      const response = await fetch(
        `${ARISTOTLE_PROXY_URL}/api/projects/${encodeURIComponent(activeProjectId)}/status`,
        {
          method: "GET",
          headers: { [KEY_HEADER_NAME]: key, Accept: "application/json" },
          cache: "no-store",
          credentials: "omit",
          referrerPolicy: "no-referrer",
        },
      );
      const payload = await readJsonResponse(response, "status");
      updateProjectPanel(payload);
    } catch (error) {
      setFormStatus(error instanceof Error ? error.message : "The project status could not be refreshed.", "error");
      if (pollingNote) pollingNote.textContent = "Status refresh failed; polling will retry while the page is visible.";
    } finally {
      requestInFlight = false;
      schedulePoll();
    }
  };

  keyInput.value = readStoredKey();
  activeProjectId = readStoredProjectId();
  setPromptCount();
  if (activeProjectId) {
    setWorkspaceView("progress");
    updateProjectPanel(
      { projectId: activeProjectId, projectStatus: 1 },
      { initial: true },
    );
    if (!validateKey(keyInput.value) && !document.hidden) {
      window.setTimeout(pollStatus, 0);
    } else if (pollingNote) {
      pollingNote.textContent = "Enter your API key to resume this project’s status checks.";
    }
  }

  keyInput.addEventListener("change", () => {
    const keyError = validateKey(keyInput.value);
    if (keyError) {
      setFormStatus(keyError, "error");
      return;
    }
    if (!storeKey(keyInput.value)) {
      setFormStatus("This browser blocked tab storage. The key will last only until the page is closed or refreshed.");
    } else {
      setFormStatus("API key retained for this tab only.");
    }
    if (activeProjectId && !document.hidden && !requestInFlight) pollStatus();
  });

  keyToggle?.addEventListener("click", () => {
    const reveal = keyInput.type === "password";
    keyInput.type = reveal ? "text" : "password";
    keyToggle.textContent = reveal ? "Hide" : "Show";
    keyToggle.setAttribute("aria-pressed", String(reveal));
  });

  keyForget?.addEventListener("click", () => {
    forgetKey();
    keyInput.value = "";
    keyInput.type = "password";
    if (keyToggle) {
      keyToggle.textContent = "Show";
      keyToggle.setAttribute("aria-pressed", "false");
    }
    clearPolling();
    setFormStatus("API key forgotten. Project polling is paused.");
    keyInput.focus();
  });

  promptInput.addEventListener("input", setPromptCount);
  promptInput.addEventListener("paste", (event) => {
    const pastedText = event.clipboardData?.getData("text") ?? "";
    const selectionLength = promptInput.selectionEnd - promptInput.selectionStart;
    if (promptInput.value.length - selectionLength + pastedText.length <= PROMPT_LIMIT) return;
    event.preventDefault();
    if (promptLimitStatus) {
      promptLimitStatus.textContent = "Paste rejected: the request would exceed 100,000 characters.";
    }
    setFormStatus("The request was not pasted because it would exceed 100,000 characters.", "error");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (requestInFlight) return;

    const key = keyInput.value;
    const prompt = promptInput.value;
    const keyError = validateKey(key);
    if (keyError) {
      setFormStatus(keyError, "error");
      keyInput.focus();
      return;
    }
    if (!prompt.trim()) {
      setFormStatus("Enter a mathematical request.", "error");
      promptInput.focus();
      return;
    }
    if (prompt.length > PROMPT_LIMIT) {
      setFormStatus("The request exceeds the 100,000-character limit. Nothing was submitted.", "error");
      promptInput.focus();
      return;
    }

    storeKey(key);
    clearPolling();
    pollCount = 0;
    requestInFlight = true;
    submitButton.disabled = true;
    setFormStatus("Submitting the project to Aristotle…");

    try {
      const response = await fetch(`${ARISTOTLE_PROXY_URL}/api/projects`, {
        method: "POST",
        headers: {
          [KEY_HEADER_NAME]: key,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
        cache: "no-store",
        credentials: "omit",
        referrerPolicy: "no-referrer",
      });
      const payload = await readJsonResponse(response, "submit");
      const projectId = getProjectId(payload);
      if (!PROJECT_ID_PATTERN.test(projectId)) {
        throw new Error("Aristotle returned a malformed project identifier.");
      }
      activeProjectId = projectId;
      storeProjectId(projectId);
      setWorkspaceView("progress", { focus: narrowWorkspace.matches });
      updateProjectPanel(payload, { initial: true });
      if (payload?.terminal !== true && !TERMINAL_STATUSES.has(getStatus(payload))) {
        setFormStatus("Project accepted. Progress will refresh while this page is visible.", "success");
      }
    } catch (error) {
      setFormStatus(error instanceof Error ? error.message : "The project could not be submitted.", "error");
    } finally {
      requestInFlight = false;
      submitButton.disabled = false;
      schedulePoll();
    }
  });

  downloadButton.addEventListener("click", async () => {
    if (!activeProjectId || requestInFlight) return;
    const key = keyInput.value;
    const keyError = validateKey(key);
    if (keyError) {
      setWorkspaceView("request");
      setFormStatus(keyError, "error");
      keyInput.focus();
      return;
    }

    requestInFlight = true;
    downloadButton.disabled = true;
    setFormStatus("Preparing the result archive…");
    if (pollingNote) pollingNote.textContent = "Preparing the result archive…";
    try {
      const response = await fetch(
        `${ARISTOTLE_PROXY_URL}/api/projects/${encodeURIComponent(activeProjectId)}/result`,
        {
          method: "GET",
          headers: { [KEY_HEADER_NAME]: key, Accept: "application/gzip, application/octet-stream" },
          cache: "no-store",
          credentials: "omit",
          referrerPolicy: "no-referrer",
        },
      );
      if (!response.ok) {
        let payload = null;
        try {
          payload = await response.json();
        } catch {
          // Error messages are deliberately normalized below.
        }
        throw new Error(getErrorMessage(response.status, payload, "download"));
      }

      const blob = await response.blob();
      const disposition = response.headers.get("Content-Disposition") ?? "";
      const match = disposition.match(/filename="?([^";]+)"?/i);
      const suggestedName = match?.[1]?.replace(/[^A-Za-z0-9._-]/g, "_");
      const filename = suggestedName?.endsWith(".tar.gz")
        ? suggestedName
        : `aristotle-${activeProjectId}.tar.gz`;
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      setFormStatus("Result archive downloaded.", "success");
      if (pollingNote) pollingNote.textContent = "Result archive downloaded.";
      if (projectAnnouncement) projectAnnouncement.textContent = "Result archive downloaded.";
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "The result archive could not be downloaded.";
      setFormStatus(message, "error");
      if (pollingNote) pollingNote.textContent = message;
      if (projectAnnouncement) projectAnnouncement.textContent = message;
    } finally {
      requestInFlight = false;
      downloadButton.disabled = false;
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearPolling();
      if (pollingNote && activeProjectId) pollingNote.textContent = "Polling paused while this page is hidden.";
      return;
    }
    if (
      activeProjectId &&
      lastProjectData?.terminal !== true &&
      !TERMINAL_STATUSES.has(getStatus(lastProjectData))
    ) {
      pollStatus();
    }
  });
})();
