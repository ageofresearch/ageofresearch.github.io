import {
  ARISTOTLE_PROXY_URL,
  CHATGPT_SHARE_RETRY_DELAYS_MS,
  CHATGPT_SHARE_RESPONSE_MAX_BYTES,
  CHATGPT_TRANSCRIPT_LIMIT,
  KEY_HEADER_NAME,
  PROJECT_ID_PATTERN,
  PROMPT_LIMIT,
  SUCCESS_STATUSES,
  TERMINAL_STATUSES,
  createStatusSnapshot,
  getChatGPTShareApiUrl,
  getDashboardUrl,
  getErrorMessage,
  getPollDelay,
  getStatus,
  looksLikeChatGPTShareUrl,
  parseChatGPTShareUrl,
  shouldRetryChatGPTShareStatus,
  validateImportedChatGPTConversation,
  validateArchiveToken,
  validateKey,
} from "./aristotle-core.mjs?build=20260726-public-archive";

(() => {
  "use strict";

  const KEY_STORAGE_NAME = "formagization.aristotle.apiKey";
  const PROJECT_STORAGE_NAME = "formagization.aristotle.activeProjectId";
  const SUBMISSION_STORAGE_NAME =
    "formagization.aristotle.pendingSubmission";
  const STATUS_HISTORY_STORAGE_NAME =
    "formagization.aristotle.statusHistory";

  const form = document.querySelector("[data-aristotle-form]");
  if (!(form instanceof HTMLFormElement)) return;

  const keyInput = form.querySelector("[data-aristotle-key]");
  const promptInput = form.querySelector("[data-aristotle-prompt]");
  const keyToggle = form.querySelector("[data-key-toggle]");
  const keyForget = form.querySelector("[data-key-forget]");
  const promptCount = form.querySelector("[data-prompt-count]");
  const promptLimitStatus = form.querySelector("[data-prompt-limit-status]");
  const submitButton = form.querySelector("[data-submit-button]");
  const submitLabel = form.querySelector("[data-submit-label]");
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
  const archiveLink = document.querySelector("[data-archive-link]");
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
    !(submitLabel instanceof HTMLElement) ||
    !(downloadButton instanceof HTMLButtonElement)
  ) {
    return;
  }

  let activeProjectId = "";
  let pollCount = 0;
  let pollTimer = 0;
  let requestInFlight = false;
  let shareImportInFlight = false;
  let shareImportPromise = null;
  let promptMode = "text";
  let promptLocked = false;
  let importedShareSource = null;
  let submitLoading = false;
  let submitLoadingLabel = "";
  let lastProjectData = null;
  let pendingPrompt = "";
  let pendingSource = null;
  let archiveToken = "";
  let statusHistory = [];
  let archiveInFlight = false;
  let archiveComplete = false;
  let archiveRetryTimer = 0;
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

  const readPendingSubmission = () => {
    try {
      const raw = window.sessionStorage.getItem(SUBMISSION_STORAGE_NAME);
      if (!raw) return null;
      const value = JSON.parse(raw);
      if (
        !value ||
        typeof value !== "object" ||
        value.projectId !== activeProjectId ||
        typeof value.prompt !== "string" ||
        !value.prompt ||
        !validateArchiveToken(value.archiveToken) ||
        (
          value.source !== null &&
          (
            typeof value.source !== "object" ||
            Array.isArray(value.source)
          )
        )
      ) {
        window.sessionStorage.removeItem(SUBMISSION_STORAGE_NAME);
        return null;
      }
      return value;
    } catch {
      return null;
    }
  };

  const storePendingSubmission = () => {
    try {
      window.sessionStorage.setItem(
        SUBMISSION_STORAGE_NAME,
        JSON.stringify({
          projectId: activeProjectId,
          prompt: pendingPrompt,
          source: pendingSource,
          archiveToken,
        }),
      );
      return true;
    } catch {
      return false;
    }
  };

  const readStatusHistory = () => {
    try {
      const raw = window.sessionStorage.getItem(STATUS_HISTORY_STORAGE_NAME);
      const value = raw ? JSON.parse(raw) : [];
      return Array.isArray(value) ? value.slice(-500) : [];
    } catch {
      return [];
    }
  };

  const storeStatusHistory = () => {
    try {
      window.sessionStorage.setItem(
        STATUS_HISTORY_STORAGE_NAME,
        JSON.stringify(statusHistory.slice(-500)),
      );
    } catch {
      // The in-memory history is still exported if tab storage is unavailable.
    }
  };

  const clearPendingSubmission = () => {
    pendingPrompt = "";
    pendingSource = null;
    archiveToken = "";
    statusHistory = [];
    try {
      window.sessionStorage.removeItem(SUBMISSION_STORAGE_NAME);
      window.sessionStorage.removeItem(STATUS_HISTORY_STORAGE_NAME);
    } catch {
      // The in-memory copy has already been cleared.
    }
  };

  const setFormStatus = (message, kind = "") => {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.classList.toggle("is-error", kind === "error");
    formStatus.classList.toggle("is-success", kind === "success");
  };

  const announceProject = (message) => {
    if (projectAnnouncement && projectAnnouncement.textContent !== message) {
      projectAnnouncement.textContent = message;
    }
  };

  const setPromptCount = () => {
    const length = Array.from(promptInput.value).length;
    const limit = promptLocked ? CHATGPT_TRANSCRIPT_LIMIT : PROMPT_LIMIT;
    if (promptCount) {
      promptCount.textContent =
        `${length.toLocaleString("en-US")} / ${limit.toLocaleString("en-US")}`;
      promptCount.classList.toggle("is-over-limit", length > limit);
    }
    promptInput.setAttribute("aria-invalid", String(length > limit));
  };

  const updateSubmitLabel = () => {
    if (submitLoading) {
      submitLabel.textContent = submitLoadingLabel;
      return;
    }
    submitLabel.textContent =
      promptMode === "link" ? "Send Link" : "Submit to Aristotle";
  };

  const setPromptMode = (mode) => {
    promptMode = mode;
    submitButton.dataset.submitMode = mode;
    updateSubmitLabel();
  };

  const setSubmitLoading = (loading, label = "") => {
    submitLoading = loading;
    submitLoadingLabel = loading ? label : "";
    submitButton.dataset.loading = String(loading);
    submitButton.setAttribute("aria-busy", String(loading));
    updateSubmitLabel();
  };

  const syncPromptMode = () => {
    if (promptLocked || shareImportInFlight) return;
    setPromptMode(parseChatGPTShareUrl(promptInput.value) ? "link" : "text");
  };

  const updateSubmitAvailability = () => {
    submitButton.disabled = requestInFlight || shareImportInFlight;
  };

  const readLimitedShareResponse = async (response) => {
    if (!response.body || typeof response.body.getReader !== "function") {
      throw new Error(
        "This browser cannot safely read the shared conversation response.",
      );
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let receivedBytes = 0;
    let text = "";
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        receivedBytes += value.byteLength;
        if (receivedBytes > CHATGPT_SHARE_RESPONSE_MAX_BYTES) {
          await reader.cancel();
          throw new Error("The shared conversation is too large to import.");
        }
        text += decoder.decode(value, { stream: true });
      }
      text += decoder.decode();
      return text;
    } finally {
      reader.releaseLock();
    }
  };

  const fetchPublicChatGPTShare = async (sharedLink, onRetry) => {
    const apiUrl = getChatGPTShareApiUrl(sharedLink);

    for (
      let attempt = 0;
      attempt < CHATGPT_SHARE_RETRY_DELAYS_MS.length;
      attempt += 1
    ) {
      if (CHATGPT_SHARE_RETRY_DELAYS_MS[attempt] > 0) {
        onRetry?.(attempt + 1, CHATGPT_SHARE_RETRY_DELAYS_MS.length);
        await new Promise((resolve) =>
          window.setTimeout(
            resolve,
            CHATGPT_SHARE_RETRY_DELAYS_MS[attempt],
          )
        );
      }

      let response;
      try {
        response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: sharedLink.url }),
          cache: "no-store",
          credentials: "omit",
          referrerPolicy: "no-referrer",
        });
      } catch {
        if (attempt + 1 < CHATGPT_SHARE_RETRY_DELAYS_MS.length) continue;
        throw new Error(
          "The public conversation reader is temporarily unreachable after automatic retries.",
        );
      }

      let finalUrl = null;
      try {
        finalUrl = new URL(response.url);
      } catch {
        // The response is rejected below.
      }
      const isExpectedJson =
        finalUrl?.protocol === "https:" &&
        finalUrl.href === apiUrl &&
        /^application\/json(?:;|$)/i.test(
          response.headers.get("content-type") ?? "",
        );
      if (!response.ok || !isExpectedJson) {
        let upstreamMessage = "";
        try {
          const errorPayload = await response.json();
          upstreamMessage =
            typeof errorPayload?.error?.message === "string"
              ? errorPayload.error.message
              : "";
        } catch {
          // The safe fallback below intentionally ignores unreadable details.
        }
        if (
          shouldRetryChatGPTShareStatus(response.status) &&
          attempt + 1 < CHATGPT_SHARE_RETRY_DELAYS_MS.length
        ) {
          continue;
        }
        throw new Error(
          upstreamMessage ||
            `The complete public ChatGPT conversation could not be imported${
              response.status ? ` (${response.status})` : ""
            }.`,
        );
      }

      const declaredLength = Number(
        response.headers.get("content-length") ?? 0,
      );
      if (
        Number.isFinite(declaredLength) &&
        declaredLength > CHATGPT_SHARE_RESPONSE_MAX_BYTES
      ) {
        await response.body?.cancel?.();
        throw new Error("The shared conversation is too large to import.");
      }
      const responseText = await readLimitedShareResponse(response);
      let payload;
      try {
        payload = JSON.parse(responseText);
      } catch {
        throw new Error(
          "The complete public conversation response was unreadable.",
        );
      }
      return validateImportedChatGPTConversation(payload, sharedLink);
    }

    throw new Error(
      "The public conversation reader is temporarily unreachable after automatic retries.",
    );
  };

  const importChatGPTShare = (sharedLink) => {
    if (shareImportPromise) return shareImportPromise;

    shareImportInFlight = true;
    promptInput.readOnly = true;
    promptInput.setAttribute("aria-busy", "true");
    setSubmitLoading(true, "Loading conversation…");
    updateSubmitAvailability();
    setFormStatus("Loading and checking the complete public conversation…");

    shareImportPromise = (async () => {
      try {
        const conversation = await fetchPublicChatGPTShare(
          sharedLink,
          (attempt, total) => {
            setFormStatus(
              `The public reader was temporarily unavailable. Retrying automatically (${attempt}/${total})…`,
            );
          },
        );
        promptInput.value = conversation.text;
        promptLocked = true;
        importedShareSource = {
          kind: "chatgpt-share",
          url: conversation.sourceUrl,
          title: conversation.title,
          sourceSha256: conversation.sourceSha256,
          complete: true,
          importToken: conversation.importToken,
          turnCount: conversation.turnCount,
          personTurnCount: conversation.personTurnCount,
          llmTurnCount: conversation.llmTurnCount,
          attachmentCount: conversation.attachmentCount,
          characters: conversation.characters,
          branchNodeCount: conversation.branchNodeCount,
          retrievalMethod: conversation.retrievalMethod,
          importerVersion: conversation.importerVersion,
        };
        promptInput.maxLength = CHATGPT_TRANSCRIPT_LIMIT;
        promptInput.dataset.locked = "true";
        promptInput.setAttribute("aria-readonly", "true");
        promptInput.scrollTop = 0;
        setPromptMode("imported");
        setPromptCount();
        const attachmentNote = conversation.attachmentCount
          ? ` ${conversation.attachmentCount} uploaded file name${
              conversation.attachmentCount === 1 ? " was" : "s were"
            } recorded; attachment contents are not included.`
          : "";
        setFormStatus(
          `Complete conversation imported and locked: ${conversation.turnCount} turns · ${conversation.personTurnCount} person · ${conversation.llmTurnCount} LLM · ${conversation.characters.toLocaleString("en-US")} characters.${attachmentNote} Scroll to review it, then submit.`,
          "success",
        );
        return conversation;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "The public ChatGPT conversation could not be imported.";
        const safetyNote = /nothing was sent to aristotle/iu.test(message)
          ? ""
          : " Nothing was sent to Aristotle.";
        setFormStatus(`${message}${safetyNote}`, "error");
        throw error;
      } finally {
        shareImportInFlight = false;
        shareImportPromise = null;
        promptInput.readOnly = promptLocked;
        promptInput.removeAttribute("aria-busy");
        setSubmitLoading(false);
        if (!promptLocked) {
          importedShareSource = null;
          promptInput.maxLength = PROMPT_LIMIT;
          promptInput.removeAttribute("aria-readonly");
          delete promptInput.dataset.locked;
          syncPromptMode();
        }
        updateSubmitAvailability();
      }
    })();

    return shareImportPromise;
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
    const snapshot = createStatusSnapshot(payload);
    const previous = statusHistory.at(-1);
    if (
      !previous ||
      previous.projectStatus !== snapshot.projectStatus ||
      previous.taskStatus !== snapshot.taskStatus ||
      previous.percentComplete !== snapshot.percentComplete ||
      previous.outputSummary !== snapshot.outputSummary
    ) {
      statusHistory.push(snapshot);
      statusHistory = statusHistory.slice(-500);
      storeStatusHistory();
    }

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
    announceProject(
      `Project ${displayStatus(status)}. Completion ${
        percent === null ? "not reported" : `${percent}%`
      }.${canDownload ? " The result is ready to download." : ""}`,
    );
    if (payload?.terminal === true || TERMINAL_STATUSES.has(status)) {
      clearPolling();
      if (pollingNote) {
        pollingNote.textContent =
          archiveComplete
            ? "Saved in the public GitHub archive."
            : "Terminal state reached. Saving the public archive…";
      }
      if (canDownload || SUCCESS_STATUSES.has(status)) {
        setFormStatus(
          "Aristotle reports that the project is complete. Saving its public GitHub record…",
          "success",
        );
      } else {
        setFormStatus(
          `The project reached “${displayStatus(status)}”. Saving its failure record to GitHub…`,
          "error",
        );
      }
      void archiveSubmission(payload);
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
    updateSubmitAvailability();
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
      updateSubmitAvailability();
      schedulePoll();
    }
  };

  const scheduleArchiveRetry = (payload) => {
    if (archiveRetryTimer) window.clearTimeout(archiveRetryTimer);
    archiveRetryTimer = window.setTimeout(() => {
      archiveRetryTimer = 0;
      void archiveSubmission(payload);
    }, 15_000);
  };

  const archiveSubmission = async (terminalPayload) => {
    if (
      archiveComplete ||
      archiveInFlight ||
      !activeProjectId ||
      !pendingPrompt ||
      !validateArchiveToken(archiveToken)
    ) {
      if (
        !archiveComplete &&
        !archiveInFlight &&
        activeProjectId &&
        (!pendingPrompt || !validateArchiveToken(archiveToken))
      ) {
        setFormStatus(
          "The project finished, but this tab no longer has the authenticated submission needed to create its public archive record.",
          "error",
        );
      }
      return;
    }
    const key = keyInput.value;
    const keyError = validateKey(key);
    if (keyError) {
      setFormStatus(
        "The project finished. Re-enter the Aristotle API key so its public archive can be saved.",
        "error",
      );
      return;
    }

    archiveInFlight = true;
    if (pollingNote) pollingNote.textContent = "Saving files to the public GitHub archive…";
    try {
      const response = await fetch(
        `${ARISTOTLE_PROXY_URL}/api/projects/${encodeURIComponent(activeProjectId)}/archive`,
        {
          method: "POST",
          headers: {
            [KEY_HEADER_NAME]: key,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: pendingPrompt,
            source: pendingSource,
            archiveToken,
            statusHistory,
          }),
          cache: "no-store",
          credentials: "omit",
          referrerPolicy: "no-referrer",
        },
      );
      let payload = null;
      try {
        payload = await response.json();
      } catch {
        // A normalized error is shown below.
      }
      if (!response.ok) {
        const code = payload?.error?.code;
        const message =
          typeof payload?.error?.message === "string"
            ? payload.error.message
            : getErrorMessage(response.status, payload, "archive");
        if (
          code === "archive_result_pending" ||
          response.status === 409 ||
          response.status >= 500
        ) {
          setFormStatus(
            `${message} Retrying automatically while this page remains open.`,
            "error",
          );
          if (pollingNote) {
            pollingNote.textContent =
              "Public archive save will retry in 15 seconds.";
          }
          scheduleArchiveRetry(terminalPayload);
          return;
        }
        throw new Error(message);
      }

      const archived = payload?.archive;
      if (
        !archived ||
        typeof archived !== "object" ||
        !["saved", "already-saved"].includes(archived.state) ||
        !["success", "failure"].includes(archived.classification) ||
        typeof archived.repositoryUrl !== "string" ||
        !archived.repositoryUrl.startsWith(
          "https://github.com/ageofresearch/ageofresearch.github.io/tree/main/submissions/",
        )
      ) {
        throw new Error("The public archive returned an unreadable response.");
      }
      archiveComplete = true;
      if (archiveLink instanceof HTMLAnchorElement) {
        archiveLink.href = archived.repositoryUrl;
        archiveLink.hidden = false;
      }
      clearPendingSubmission();
      const isSuccess = archived.classification === "success";
      setFormStatus(
        isSuccess
          ? "Completed and saved in the public GitHub success archive."
          : "The failed run and its available evidence were saved in the GitHub failure archive.",
        isSuccess ? "success" : "error",
      );
      if (pollingNote) {
        pollingNote.textContent =
          isSuccess
            ? "Saved publicly and added to Successful runs."
            : "Saved publicly in the failure folder; it is not listed on the webpage.";
      }
      announceProject(
        isSuccess
          ? "Successful project saved in the public GitHub archive."
          : "Failed project saved in the public GitHub archive.",
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "The completed submission could not be saved to GitHub.";
      setFormStatus(message, "error");
      if (pollingNote) pollingNote.textContent = message;
    } finally {
      archiveInFlight = false;
      void terminalPayload;
    }
  };

  keyInput.value = readStoredKey();
  activeProjectId = readStoredProjectId();
  const storedSubmission = readPendingSubmission();
  if (storedSubmission) {
    pendingPrompt = storedSubmission.prompt;
    pendingSource = storedSubmission.source;
    archiveToken = storedSubmission.archiveToken;
    statusHistory = readStatusHistory();
  }
  promptInput.maxLength = PROMPT_LIMIT;
  setPromptCount();
  syncPromptMode();
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

  promptInput.addEventListener("input", () => {
    setPromptCount();
    syncPromptMode();
  });
  promptInput.addEventListener("paste", (event) => {
    const pastedText = event.clipboardData?.getData("text") ?? "";
    const selectionStart = promptInput.selectionStart ?? 0;
    const selectionEnd = promptInput.selectionEnd ?? selectionStart;
    const nextValue =
      promptInput.value.slice(0, selectionStart) +
      pastedText +
      promptInput.value.slice(selectionEnd);
    if (Array.from(nextValue).length > PROMPT_LIMIT) {
      event.preventDefault();
      if (promptLimitStatus) {
        promptLimitStatus.textContent = "Paste rejected: the request would exceed 100,000 characters.";
      }
      setFormStatus("The request was not pasted because it would exceed 100,000 characters.", "error");
      return;
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (requestInFlight || shareImportInFlight) return;

    const key = keyInput.value;
    const prompt = promptInput.value;
    const sharedLink = parseChatGPTShareUrl(prompt);
    if (!promptLocked && sharedLink && promptMode !== "link") {
      setPromptMode("link");
    }
    if (!promptLocked && promptMode === "link") {
      if (!sharedLink) {
        syncPromptMode();
        setFormStatus(
          "Enter one complete public ChatGPT Share link without query parameters or fragments.",
          "error",
        );
        promptInput.focus();
        return;
      }
      try {
        await importChatGPTShare(sharedLink);
      } catch {
        // The import function reports a safe, user-facing error.
      }
      return;
    } else if (looksLikeChatGPTShareUrl(prompt)) {
      setFormStatus(
        "Enter a complete public ChatGPT Share link without query parameters or fragments.",
        "error",
      );
      promptInput.focus();
      return;
    }

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
    const activePromptLimit = promptLocked
      ? CHATGPT_TRANSCRIPT_LIMIT
      : PROMPT_LIMIT;
    if (Array.from(prompt).length > activePromptLimit) {
      setFormStatus(
        `The request exceeds the ${activePromptLimit.toLocaleString("en-US")}-character limit. Nothing was submitted.`,
        "error",
      );
      promptInput.focus();
      return;
    }
    if (promptLocked && !importedShareSource) {
      setFormStatus(
        "The imported conversation lost its source metadata. Reload the page and import the link again.",
        "error",
      );
      return;
    }

    storeKey(key);
    clearPolling();
    pollCount = 0;
    requestInFlight = true;
    setSubmitLoading(true, "Submitting…");
    updateSubmitAvailability();
    setFormStatus("Submitting the project to Aristotle…");

    try {
      const requestBody = promptLocked
        ? { prompt, source: importedShareSource }
        : { prompt };
      const response = await fetch(`${ARISTOTLE_PROXY_URL}/api/projects`, {
        method: "POST",
        headers: {
          [KEY_HEADER_NAME]: key,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
      if (!validateArchiveToken(payload?.archiveToken)) {
        throw new Error(
          "The project was accepted, but its public archive proof was missing. Keep the Harmonic project ID before retrying.",
        );
      }
      pendingPrompt = prompt;
      pendingSource = promptLocked ? importedShareSource : null;
      archiveToken = payload.archiveToken;
      statusHistory = [];
      storeProjectId(projectId);
      if (!storePendingSubmission()) {
        setFormStatus(
          "Project accepted, but this browser could not retain the public archive material for the duration of the run.",
          "error",
        );
      }
      storeStatusHistory();
      setWorkspaceView("progress", { focus: narrowWorkspace.matches });
      updateProjectPanel(payload, { initial: true });
      if (payload?.terminal !== true && !TERMINAL_STATUSES.has(getStatus(payload))) {
        setFormStatus("Project accepted. Progress will refresh while this page is visible.", "success");
      }
    } catch (error) {
      setFormStatus(error instanceof Error ? error.message : "The project could not be submitted.", "error");
    } finally {
      requestInFlight = false;
      setSubmitLoading(false);
      updateSubmitAvailability();
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
    updateSubmitAvailability();
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
      announceProject("Result archive downloaded.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "The result archive could not be downloaded.";
      setFormStatus(message, "error");
      if (pollingNote) pollingNote.textContent = message;
      announceProject(message);
    } finally {
      requestInFlight = false;
      updateSubmitAvailability();
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
