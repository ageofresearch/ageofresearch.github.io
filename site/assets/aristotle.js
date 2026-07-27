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
  getContinuationPolicy,
  getChatGPTShareApiUrl,
  getTaskId,
  getDashboardUrl,
  getErrorMessage,
  getPollDelay,
  getStatus,
  isRecoverableCheckpoint,
  looksLikeChatGPTShareUrl,
  normalizeAutoContinuationState,
  parseChatGPTShareUrl,
  reconcileContinuationAttempt,
  shouldRetryChatGPTShareStatus,
  recordCheckpointObservation,
  validateImportedChatGPTConversation,
  validateArchiveToken,
  validateKey,
} from "./aristotle-core.mjs?build=20260727-terminal-continue";
import {
  renderEquationPreview,
} from "./equation-preview.mjs?build=20260727-equation-preview";

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
  const promptSurface = form.querySelector("[data-prompt-surface]");
  const equationPreview = form.querySelector("[data-equation-preview]");
  const equationPreviewContent = form.querySelector(
    "[data-equation-preview-content]",
  );
  const equationPreviewToggle = form.querySelector(
    "[data-equation-preview-toggle]",
  );
  const equationPreviewLabel = form.querySelector(
    "[data-equation-preview-label]",
  );
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
  const continueButton = document.querySelector("[data-continue-button]");
  const autoContinueToggle = document.querySelector("[data-auto-continue-toggle]");
  const continuationDetail = document.querySelector("[data-continuation-detail]");
  const continuationPassOutput = document.querySelector("[data-continuation-pass]");
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
    !(promptSurface instanceof HTMLElement) ||
    !(equationPreview instanceof HTMLElement) ||
    !(equationPreviewContent instanceof HTMLElement) ||
    !(equationPreviewToggle instanceof HTMLButtonElement) ||
    !(equationPreviewLabel instanceof HTMLElement) ||
    !(submitButton instanceof HTMLButtonElement) ||
    !(submitLabel instanceof HTMLElement) ||
    !(downloadButton instanceof HTMLButtonElement) ||
    !(continueButton instanceof HTMLButtonElement) ||
    !(autoContinueToggle instanceof HTMLButtonElement)
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
  let continuationInFlight = false;
  let continuationRetryTimer = 0;
  let continuationPassCount = 0;
  let automaticContinuationCount = 0;
  let continuedCheckpointTaskIds = [];
  let checkpointObservations = [];
  let autoContinuationPaused = false;
  let autoContinuationStopReason = "";
  let pendingContinuationAttempt = null;
  let legacyArchiveRecovery = false;
  let activeWorkspaceView = "request";
  let equationPreviewRendered = false;
  let equationPreviewVisible = false;
  let promptSourceScrollTop = 0;
  let equationPreviewScrollTop = 0;

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
      const storedContinuationPassCount =
        value?.continuationPassCount === undefined
          ? 0
          : value.continuationPassCount;
      const storedCheckpointTaskIds =
        value?.continuedCheckpointTaskIds === undefined
          ? []
          : value.continuedCheckpointTaskIds;
      const storedAutomaticContinuationCount =
        value?.automaticContinuationCount === undefined
          ? 0
          : value.automaticContinuationCount;
      const storedCheckpointObservations =
        value?.checkpointObservations === undefined
          ? []
          : value.checkpointObservations;
      const storedLegacyRecovery = value?.legacyArchiveRecovery === true;
      const storedPendingContinuationAttempt =
        value?.pendingContinuationAttempt === undefined
          ? null
          : value.pendingContinuationAttempt;
      const storedAutoContinuationState = normalizeAutoContinuationState(
        value?.autoContinuationPaused,
        value?.autoContinuationStopReason,
      );
      if (
        !value ||
        typeof value !== "object" ||
        value.projectId !== activeProjectId ||
        (
          storedLegacyRecovery
            ? (
              value.prompt !== "" ||
              value.archiveToken !== "" ||
              value.source !== null
            )
            : (
              typeof value.prompt !== "string" ||
              !value.prompt ||
              !validateArchiveToken(value.archiveToken)
            )
        ) ||
        (
          value.source !== null &&
          (
            typeof value.source !== "object" ||
            Array.isArray(value.source)
          )
        ) ||
        !Number.isSafeInteger(storedContinuationPassCount) ||
        storedContinuationPassCount < 0 ||
        !Number.isSafeInteger(storedAutomaticContinuationCount) ||
        storedAutomaticContinuationCount < 0 ||
        storedAutomaticContinuationCount > storedContinuationPassCount ||
        !Array.isArray(storedCheckpointTaskIds) ||
        storedCheckpointTaskIds.length > 500 ||
        storedCheckpointTaskIds.some(
          (taskId) =>
            typeof taskId !== "string" ||
            !PROJECT_ID_PATTERN.test(taskId),
        ) ||
        !Array.isArray(storedCheckpointObservations) ||
        storedCheckpointObservations.length > 50 ||
        storedCheckpointObservations.some(
          (entry) =>
            !entry ||
            typeof entry !== "object" ||
            typeof entry.taskId !== "string" ||
            !PROJECT_ID_PATTERN.test(entry.taskId) ||
            typeof entry.fingerprint !== "string" ||
            Array.from(entry.fingerprint).length > 10_100,
        ) ||
        storedAutoContinuationState === null ||
        (
          storedPendingContinuationAttempt !== null &&
          (
            typeof storedPendingContinuationAttempt !== "object" ||
            Array.isArray(storedPendingContinuationAttempt) ||
            typeof storedPendingContinuationAttempt.previousTaskId !== "string" ||
            !PROJECT_ID_PATTERN.test(
              storedPendingContinuationAttempt.previousTaskId,
            ) ||
            typeof storedPendingContinuationAttempt.manual !== "boolean"
          )
        )
      ) {
        window.sessionStorage.removeItem(SUBMISSION_STORAGE_NAME);
        return null;
      }
      return {
        ...value,
        continuationPassCount: storedContinuationPassCount,
        automaticContinuationCount: storedAutomaticContinuationCount,
        continuedCheckpointTaskIds: storedCheckpointTaskIds,
        checkpointObservations: storedCheckpointObservations,
        autoContinuationPaused: storedAutoContinuationState.paused,
        autoContinuationStopReason: storedAutoContinuationState.reason,
        pendingContinuationAttempt: storedPendingContinuationAttempt,
        legacyArchiveRecovery: storedLegacyRecovery,
      };
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
          continuationPassCount,
          automaticContinuationCount,
          continuedCheckpointTaskIds: continuedCheckpointTaskIds.slice(-500),
          checkpointObservations: checkpointObservations.slice(-50),
          autoContinuationPaused,
          autoContinuationStopReason,
          pendingContinuationAttempt,
          legacyArchiveRecovery,
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
    continuationPassCount = 0;
    automaticContinuationCount = 0;
    continuedCheckpointTaskIds = [];
    checkpointObservations = [];
    autoContinuationPaused = false;
    autoContinuationStopReason = "";
    pendingContinuationAttempt = null;
    legacyArchiveRecovery = false;
    if (continuationRetryTimer) window.clearTimeout(continuationRetryTimer);
    continuationRetryTimer = 0;
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

  const updateEquationPreviewToggle = () => {
    equationPreviewToggle.setAttribute(
      "aria-pressed",
      String(equationPreviewVisible),
    );
    equationPreviewLabel.textContent = equationPreviewVisible
      ? "Show source"
      : "Preview equations";
  };

  const setEquationPreviewVisibility = (visible) => {
    if (visible && !equationPreviewRendered) return;

    if (visible) {
      promptSourceScrollTop = promptInput.scrollTop;
      promptInput.hidden = true;
      equationPreview.hidden = false;
      equationPreview.scrollTop = equationPreviewScrollTop;
    } else {
      equationPreviewScrollTop = equationPreview.scrollTop;
      equationPreview.hidden = true;
      promptInput.hidden = false;
      promptInput.scrollTop = promptSourceScrollTop;
    }
    equationPreviewVisible = visible;
    promptSurface.dataset.previewVisible = String(visible);
    updateEquationPreviewToggle();
  };

  const setEquationPreviewAvailable = (available) => {
    equationPreviewToggle.hidden = !available;
    promptSurface.dataset.previewAvailable = String(available);
    if (available) return;

    setEquationPreviewVisibility(false);
    equationPreviewContent.replaceChildren();
    equationPreviewRendered = false;
    promptSourceScrollTop = 0;
    equationPreviewScrollTop = 0;
  };

  const openEquationPreview = async () => {
    if (!promptLocked || equationPreviewToggle.hidden) return;
    if (equationPreviewRendered) {
      setEquationPreviewVisibility(true);
      return;
    }

    equationPreviewToggle.disabled = true;
    equationPreviewToggle.setAttribute("aria-busy", "true");
    equationPreviewLabel.textContent = "Formatting…";
    try {
      const result = await renderEquationPreview(
        equationPreviewContent,
        promptInput.value,
      );
      equationPreviewRendered = true;
      setEquationPreviewVisibility(true);

      const renderedLabel =
        `${result.renderedCount.toLocaleString("en-US")} equation${
          result.renderedCount === 1 ? "" : "s"
        }`;
      const fallbackLabel = result.failedCount
        ? ` ${result.failedCount.toLocaleString("en-US")} expression${
            result.failedCount === 1 ? "" : "s"
          } could not be typeset and remain as source text.`
        : "";
      const limitLabel = result.limited
        ? " Additional expressions remain as source text to keep this tab responsive."
        : "";
      setFormStatus(
        `${renderedLabel} formatted locally. The transcript submitted to Aristotle remains unchanged.${fallbackLabel}${limitLabel}`,
        "success",
      );
    } catch {
      setEquationPreviewVisibility(false);
      setFormStatus(
        "The local equation preview could not be opened. The imported transcript is unchanged and remains ready to submit.",
        "error",
      );
    } finally {
      equationPreviewToggle.disabled = false;
      equationPreviewToggle.removeAttribute("aria-busy");
      updateEquationPreviewToggle();
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
        setEquationPreviewAvailable(true);
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
          setEquationPreviewAvailable(false);
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

  const automaticPauseMessage = () => {
    return "Automatic continuation is paused. Continue manually or resume automatic continuation.";
  };

  const reconcilePendingContinuation = (payload) => {
    const reconciled = reconcileContinuationAttempt({
      pendingAttempt: pendingContinuationAttempt,
      payload,
      continuationPassCount,
      automaticContinuationCount,
      continuedCheckpointTaskIds,
    });
    if (!reconciled.advanced) return false;
    pendingContinuationAttempt = reconciled.pendingAttempt;
    continuationPassCount = reconciled.continuationPassCount;
    automaticContinuationCount =
      reconciled.automaticContinuationCount;
    continuedCheckpointTaskIds =
      reconciled.continuedCheckpointTaskIds;
    storePendingSubmission();
    return true;
  };

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
    reconcilePendingContinuation(payload);
    const status = getStatus(payload, { initial });
    const checkpoint = isRecoverableCheckpoint(payload);
    const taskId = getTaskId(payload);
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
    if (continuationDetail instanceof HTMLElement) {
      continuationDetail.hidden =
        continuationPassCount === 0 &&
        !checkpoint &&
        !continuationInFlight;
    }
    if (continuationPassOutput) {
      continuationPassOutput.textContent = continuationInFlight
        ? `Submitting follow-up ${continuationPassCount + 1}…`
        : `${continuationPassCount} total · ${automaticContinuationCount} automatic`;
    }

    if (dashboardLink instanceof HTMLAnchorElement) {
      dashboardLink.hidden = !dashboardUrl;
      if (dashboardUrl) dashboardLink.href = dashboardUrl;
      else dashboardLink.removeAttribute("href");
    }

    const canDownload =
      !checkpoint &&
      (
        payload?.canDownload === true ||
        payload?.can_download === true ||
        SUCCESS_STATUSES.has(status)
      );
    downloadButton.hidden = !canDownload;
    continueButton.hidden = !checkpoint || continuationInFlight;
    autoContinueToggle.hidden =
      !activeProjectId ||
      (
        (payload?.terminal === true || TERMINAL_STATUSES.has(status)) &&
        !checkpoint
      );
    autoContinueToggle.textContent = autoContinuationPaused
      ? "Resume automatic continuation"
      : "Pause automatic continuation";
    announceProject(
      `Project ${displayStatus(status)}. Completion ${
        percent === null ? "not reported" : `${percent}%`
      }.${canDownload ? " The result is ready to download." : ""}`,
    );
    if (checkpoint) {
      clearPolling();
      checkpointObservations = recordCheckpointObservation(
        checkpointObservations,
        payload,
      );
      const continuationPolicy = getContinuationPolicy({
        payload,
        autoContinuationPaused,
      });
      const pauseMessage = automaticPauseMessage();
      if (pollingNote) {
        pollingNote.textContent = autoContinuationPaused
          ? pauseMessage
          : "Checkpoint reached. Preparing the next continuation pass…";
      }
      setFormStatus(
        autoContinuationPaused
          ? pauseMessage
          : `Aristotle returned “${displayStatus(status)}”. Continuing automatically from the saved project files…`,
        autoContinuationPaused ? "error" : "",
      );
      if (
        taskId &&
        continuedCheckpointTaskIds.includes(taskId)
      ) {
        scheduleCheckpointRefresh();
      } else if (continuationPolicy.action === "auto-continue") {
        scheduleAutomaticContinuation(payload);
      }
      return;
    }
    if (payload?.terminal === true || TERMINAL_STATUSES.has(status)) {
      clearPolling();
      autoContinueToggle.hidden = true;
      continueButton.hidden = true;
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
      lastProjectData?.terminal === true ||
      TERMINAL_STATUSES.has(getStatus(lastProjectData))
    ) {
      return;
    }
    const delay = getPollDelay(pollCount);
    if (pollingNote) {
      pollingNote.textContent =
        `Next refresh in ${delay / 1000} seconds while this tab remains open.`;
    }
    pollTimer = window.setTimeout(pollStatus, delay);
  };

  const clearContinuationRetry = () => {
    if (continuationRetryTimer) {
      window.clearTimeout(continuationRetryTimer);
    }
    continuationRetryTimer = 0;
  };

  const scheduleCheckpointRefresh = () => {
    clearContinuationRetry();
    if (!activeProjectId) return;
    if (pollingNote) {
      pollingNote.textContent =
        "Waiting for the continued task to appear. Refreshing again in 10 seconds…";
    }
    continuationRetryTimer = window.setTimeout(() => {
      continuationRetryTimer = 0;
      void pollStatus();
    }, 10_000);
  };

  const scheduleAutomaticContinuation = (payload, delay = 500) => {
    clearContinuationRetry();
    const policy = getContinuationPolicy({
      payload,
      autoContinuationPaused,
    });
    if (
      !activeProjectId ||
      continuationInFlight ||
      policy.action !== "auto-continue"
    ) {
      return;
    }
    continuationRetryTimer = window.setTimeout(() => {
      continuationRetryTimer = 0;
      void continueProject(payload);
    }, delay);
  };

  const withContinuationDispatchLock = async (
    projectId,
    previousTaskId,
    dispatch,
  ) => {
    const locks = globalThis.navigator?.locks;
    if (!locks || typeof locks.request !== "function") {
      return { acquired: true, value: await dispatch() };
    }
    return locks.request(
      `formagization.aristotle.continue:${projectId}:${previousTaskId}`,
      { mode: "exclusive", ifAvailable: true },
      async (lock) =>
        lock
          ? { acquired: true, value: await dispatch() }
          : { acquired: false, value: null },
    );
  };

  const continueProject = async (checkpointPayload, { manual = false } = {}) => {
    if (!activeProjectId || continuationInFlight) return;
    const previousTaskId = getTaskId(checkpointPayload);
    if (!previousTaskId) {
      setFormStatus(
        "Aristotle returned a checkpoint without a valid task identifier, so it could not be continued safely.",
        "error",
      );
      continueButton.hidden = false;
      return;
    }
    if (
      continuedCheckpointTaskIds.includes(previousTaskId)
    ) {
      scheduleCheckpointRefresh();
      return;
    }
    if (requestInFlight) {
      if (manual) {
        setFormStatus(
          "Another status request is finishing. The checkpoint will refresh before any continuation is submitted.",
        );
        scheduleCheckpointRefresh();
      } else {
        scheduleAutomaticContinuation(checkpointPayload, 1_000);
      }
      return;
    }

    const key = keyInput.value;
    const keyError = validateKey(key);
    if (keyError) {
      setWorkspaceView("request");
      setFormStatus(
        "Re-enter your Aristotle API key to continue this checkpoint.",
        "error",
      );
      continueButton.hidden = false;
      keyInput.focus();
      return;
    }

    clearContinuationRetry();
    if (
      !pendingContinuationAttempt ||
      pendingContinuationAttempt.previousTaskId !== previousTaskId
    ) {
      pendingContinuationAttempt = { previousTaskId, manual };
      storePendingSubmission();
    }
    continuationInFlight = true;
    requestInFlight = true;
    continueButton.hidden = true;
    autoContinueToggle.hidden = false;
    updateSubmitAvailability();
    if (continuationDetail instanceof HTMLElement) continuationDetail.hidden = false;
    if (continuationPassOutput) {
      continuationPassOutput.textContent =
        `Submitting follow-up ${continuationPassCount + 1}…`;
    }
    if (projectState) {
      projectState.textContent = "Continuing";
      projectState.dataset.state = "running";
    }
    const continuationKind = manual ? "manual" : "automatic";
    setFormStatus(
      `Submitting ${continuationKind} continuation ${continuationPassCount + 1} to Aristotle…`,
    );
    if (pollingNote) {
      pollingNote.textContent =
        "Continuing from the current project files. Keep this tab open.";
    }

    let continuationAccepted = false;
    let continuationOutcomeUncertain = false;
    try {
      const lockedDispatch = await withContinuationDispatchLock(
        activeProjectId,
        previousTaskId,
        async () => {
          const response = await fetch(
            `${ARISTOTLE_PROXY_URL}/api/projects/${encodeURIComponent(activeProjectId)}/continue`,
            {
              method: "POST",
              headers: {
                [KEY_HEADER_NAME]: key,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ previousTaskId }),
              cache: "no-store",
              credentials: "omit",
              referrerPolicy: "no-referrer",
            },
          );
          return readJsonResponse(response, "continue");
        },
      );
      if (!lockedDispatch.acquired) {
        continuationOutcomeUncertain = true;
        setFormStatus(
          "Another tab is already continuing this checkpoint. Checking Aristotle’s authoritative status instead of submitting it twice.",
        );
        if (pollingNote) {
          pollingNote.textContent =
            "A continuation is already being dispatched from another tab. Status will refresh shortly.";
        }
        return;
      }
      const payload = lockedDispatch.value;
      if (payload?.continuationPending === true) {
        continuationOutcomeUncertain = true;
        setFormStatus(
          "This checkpoint already has a continuation reservation. Waiting for the new Aristotle task to appear.",
        );
        if (pollingNote) {
          pollingNote.textContent =
            "A continuation dispatch is already in progress. Status will refresh shortly.";
        }
        return;
      }
      const returnedProjectId = getProjectId(payload);
      if (returnedProjectId && returnedProjectId !== activeProjectId) {
        throw new Error("Aristotle returned a continuation for a different project.");
      }

      continuationAccepted = true;
      updateProjectPanel(payload);
      setFormStatus(
        `Continuation ${continuationPassCount} accepted. Progress will refresh automatically.`,
        "success",
      );
    } catch (error) {
      continuationOutcomeUncertain = true;
      const message =
        error instanceof Error
          ? error.message
          : "The project could not be continued.";
      setFormStatus(
        `${message} Checking Aristotle’s authoritative status before any retry.`,
        "error",
      );
      if (pollingNote) {
        pollingNote.textContent =
          "The continuation response was uncertain. Status will be checked again before retrying.";
      }
    } finally {
      continuationInFlight = false;
      requestInFlight = false;
      updateSubmitAvailability();
      if (continuationPassOutput) {
        continuationPassOutput.textContent =
          `${continuationPassCount} total · ${automaticContinuationCount} automatic`;
      }
      if (continuationOutcomeUncertain) {
        continueButton.hidden = false;
        scheduleCheckpointRefresh();
      } else if (
        isRecoverableCheckpoint(lastProjectData) &&
        !continuedCheckpointTaskIds.includes(getTaskId(lastProjectData))
      ) {
        continueButton.hidden = false;
        if (!autoContinuationPaused) {
          scheduleAutomaticContinuation(lastProjectData, 15_000);
        }
      } else if (continuationAccepted) {
        schedulePoll();
      }
    }
  };

  const pollStatus = async () => {
    clearPolling();
    if (!activeProjectId || requestInFlight) {
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
    let statusRefreshFailed = false;
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
      statusRefreshFailed = true;
      setFormStatus(error instanceof Error ? error.message : "The project status could not be refreshed.", "error");
      if (pollingNote) {
        pollingNote.textContent =
          "Status refresh failed; polling will retry while this tab remains open.";
      }
    } finally {
      requestInFlight = false;
      updateSubmitAvailability();
      if (
        statusRefreshFailed &&
        isRecoverableCheckpoint(lastProjectData)
      ) {
        scheduleCheckpointRefresh();
      } else if (!isRecoverableCheckpoint(lastProjectData)) {
        schedulePoll();
      }
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
    const hasCurrentArchiveProof =
      Boolean(pendingPrompt) && validateArchiveToken(archiveToken);
    const canRecoverLegacyArchive =
      legacyArchiveRecovery && !pendingPrompt && !archiveToken;
    if (
      archiveComplete ||
      archiveInFlight ||
      !activeProjectId ||
      (!hasCurrentArchiveProof && !canRecoverLegacyArchive)
    ) {
      if (
        !archiveComplete &&
        !archiveInFlight &&
        activeProjectId &&
        !hasCurrentArchiveProof &&
        !canRecoverLegacyArchive
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
            ...(canRecoverLegacyArchive
              ? { recoverLegacy: true }
              : {
                prompt: pendingPrompt,
                source: pendingSource,
                archiveToken,
              }),
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
    continuationPassCount = storedSubmission.continuationPassCount;
    automaticContinuationCount =
      storedSubmission.automaticContinuationCount;
    continuedCheckpointTaskIds =
      storedSubmission.continuedCheckpointTaskIds;
    checkpointObservations = storedSubmission.checkpointObservations;
    autoContinuationPaused = storedSubmission.autoContinuationPaused;
    autoContinuationStopReason =
      storedSubmission.autoContinuationStopReason;
    pendingContinuationAttempt =
      storedSubmission.pendingContinuationAttempt;
    legacyArchiveRecovery = storedSubmission.legacyArchiveRecovery;
  } else if (activeProjectId) {
    // Older releases discarded the prompt and archive proof after incorrectly
    // treating a resumable checkpoint as final. The proxy may recover that
    // already-public record after authenticating project access.
    legacyArchiveRecovery = true;
    storePendingSubmission();
  }
  promptInput.maxLength = PROMPT_LIMIT;
  setEquationPreviewAvailable(false);
  setPromptCount();
  syncPromptMode();
  if (activeProjectId) {
    setWorkspaceView("progress");
    updateProjectPanel(
      { projectId: activeProjectId, projectStatus: 1 },
      { initial: true },
    );
    if (!validateKey(keyInput.value)) {
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
    if (activeProjectId && !requestInFlight) pollStatus();
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
  equationPreviewToggle.addEventListener("click", () => {
    if (equationPreviewVisible) {
      setEquationPreviewVisibility(false);
      return;
    }
    void openEquationPreview();
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
      continuationPassCount = 0;
      automaticContinuationCount = 0;
      continuedCheckpointTaskIds = [];
      checkpointObservations = [];
      autoContinuationPaused = false;
      autoContinuationStopReason = "";
      pendingContinuationAttempt = null;
      legacyArchiveRecovery = false;
      clearContinuationRetry();
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
        setFormStatus(
          "Project accepted. Keep this tab open; progress and incomplete checkpoints will continue automatically.",
          "success",
        );
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

  continueButton.addEventListener("click", () => {
    if (!isRecoverableCheckpoint(lastProjectData)) return;
    clearContinuationRetry();
    void continueProject(lastProjectData, { manual: true });
  });

  autoContinueToggle.addEventListener("click", () => {
    autoContinuationPaused = !autoContinuationPaused;
    if (autoContinuationPaused) {
      autoContinuationStopReason = "user";
    } else {
      autoContinuationStopReason = "";
    }
    autoContinueToggle.textContent = autoContinuationPaused
      ? "Resume automatic continuation"
      : "Pause automatic continuation";
    storePendingSubmission();
    if (autoContinuationPaused) {
      clearContinuationRetry();
      if (isRecoverableCheckpoint(lastProjectData)) {
        continueButton.hidden = false;
      }
      setFormStatus(
        "Automatic continuation paused. The current Aristotle task is not cancelled.",
      );
      if (pollingNote) {
        pollingNote.textContent =
          "Automatic continuation is paused. Status checks continue for a running task.";
      }
      return;
    }

    setFormStatus(
      "Automatic continuation resumed without a fixed follow-up limit. Each task uses your Aristotle quota; press Pause automatic continuation whenever you want it to stop.",
      "success",
    );
    if (isRecoverableCheckpoint(lastProjectData)) {
      scheduleAutomaticContinuation(lastProjectData, 0);
    } else {
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
      if (pollingNote && activeProjectId) {
        pollingNote.textContent =
          "This tab remains active, but the browser may throttle background status checks.";
      }
      return;
    }
    if (!activeProjectId || requestInFlight) return;
    if (isRecoverableCheckpoint(lastProjectData)) {
      if (autoContinuationPaused) {
        continueButton.hidden = false;
      } else {
        scheduleAutomaticContinuation(lastProjectData, 0);
      }
    } else if (
      lastProjectData?.terminal !== true &&
      !TERMINAL_STATUSES.has(getStatus(lastProjectData))
    ) {
      void pollStatus();
    }
  });
})();
