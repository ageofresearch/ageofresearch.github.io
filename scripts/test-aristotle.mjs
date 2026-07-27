import assert from "node:assert/strict";

import {
  ARISTOTLE_SUCCESS_INDEX_URL,
  CHATGPT_SHARE_RETRY_DELAYS_MS,
  CHATGPT_TRANSCRIPT_LIMIT,
  MAX_AUTOMATIC_CONTINUATIONS,
  createStatusSnapshot,
  getCheckpointFingerprint,
  getContinuationPolicy,
  getChatGPTShareApiUrl,
  getDashboardUrl,
  getErrorMessage,
  getPollDelay,
  getStatus,
  isRecoverableCheckpoint,
  looksLikeChatGPTShareUrl,
  parseChatGPTShareUrl,
  reconcileContinuationAttempt,
  recordCheckpointObservation,
  shouldRetryChatGPTShareStatus,
  validateImportedChatGPTConversation,
  validateArchiveToken,
  validateKey,
  validateSuccessIndex,
} from "../site/assets/aristotle-core.mjs";

assert.deepEqual(CHATGPT_SHARE_RETRY_DELAYS_MS, [0, 1_000, 3_000]);
assert.equal(MAX_AUTOMATIC_CONTINUATIONS, 3);
for (const status of [408, 425, 429, 500, 502, 503, 504]) {
  assert.equal(shouldRetryChatGPTShareStatus(status), true);
}
for (const status of [0, 400, 401, 403, 404, 413, 422]) {
  assert.equal(shouldRetryChatGPTShareStatus(status), false);
}

assert.equal(validateKey("unprefixed-key-value"), "");
assert.equal(validateKey("x".repeat(512)), "");
assert.match(validateKey("x".repeat(513)), /at most 512/);
assert.match(validateKey("key with space"), /no whitespace/);
assert.match(validateKey("key\nvalue"), /no whitespace/);

assert.equal(getPollDelay(0), 10_000);
assert.equal(getPollDelay(5), 10_000);
assert.equal(getPollDelay(6), 30_000);
assert.equal(getPollDelay(15), 30_000);
assert.equal(getPollDelay(16), 60_000);
assert.equal(getPollDelay(1_000), 60_000);

assert.equal(getStatus({ projectStatus: 1 }, { initial: true }), "submitted");
assert.equal(getStatus({ projectStatus: 1 }), "running");
assert.equal(getStatus({ projectStatus: 2 }), "idle");
assert.equal(getStatus({ projectStatus: "1" }), "running");
assert.equal(
  getStatus({ projectStatus: 1, taskStatus: "Queued" }),
  "queued",
);
assert.equal(
  isRecoverableCheckpoint({
    terminal: true,
    taskStatus: "COMPLETE_WITH_ERRORS",
  }),
  true,
);
assert.equal(
  isRecoverableCheckpoint({
    terminal: true,
    taskStatus: "OUT_OF_BUDGET",
  }),
  true,
);
assert.equal(
  isRecoverableCheckpoint({ terminal: true, taskStatus: "COMPLETE" }),
  false,
);
assert.equal(
  isRecoverableCheckpoint({ terminal: true, taskStatus: "FAILED" }),
  false,
);

const firstCheckpoint = {
  terminal: true,
  taskId: "task_checkpoint_1",
  taskStatus: "COMPLETE_WITH_ERRORS",
  outputSummary: "  Remaining: prove theorem Foo.  ",
};
const repeatedCheckpoint = {
  terminal: true,
  taskId: "task_checkpoint_2",
  taskStatus: "COMPLETE_WITH_ERRORS",
  outputSummary: "Remaining:   prove theorem Foo.",
};
const changedCheckpoint = {
  terminal: true,
  taskId: "task_checkpoint_3",
  taskStatus: "OUT_OF_BUDGET",
  outputSummary: "Foo is proved; Bar remains.",
};
assert.equal(
  getCheckpointFingerprint(firstCheckpoint),
  "remaining: prove theorem foo.",
);
const oneCheckpointObservation = recordCheckpointObservation(
  [],
  firstCheckpoint,
);
assert.equal(oneCheckpointObservation.length, 1);
assert.deepEqual(
  recordCheckpointObservation(oneCheckpointObservation, firstCheckpoint),
  oneCheckpointObservation,
);
const twoCheckpointObservations = recordCheckpointObservation(
  oneCheckpointObservation,
  repeatedCheckpoint,
);
assert.deepEqual(
  getContinuationPolicy({
    payload: firstCheckpoint,
    automaticContinuationCount: 0,
    autoContinuationPaused: false,
    checkpointObservations: oneCheckpointObservation,
  }),
  { action: "auto-continue", reason: "checkpoint" },
);
assert.deepEqual(
  getContinuationPolicy({
    payload: repeatedCheckpoint,
    automaticContinuationCount: 1,
    autoContinuationPaused: false,
    checkpointObservations: twoCheckpointObservations,
  }),
  { action: "manual", reason: "no-progress" },
);
assert.deepEqual(
  getContinuationPolicy({
    payload: changedCheckpoint,
    automaticContinuationCount: MAX_AUTOMATIC_CONTINUATIONS,
    autoContinuationPaused: false,
    checkpointObservations: recordCheckpointObservation(
      twoCheckpointObservations,
      changedCheckpoint,
    ),
  }),
  { action: "manual", reason: "automatic-limit" },
);
assert.deepEqual(
  getContinuationPolicy({
    payload: changedCheckpoint,
    automaticContinuationCount: 1,
    autoContinuationPaused: true,
    checkpointObservations: [],
  }),
  { action: "manual", reason: "paused" },
);
assert.deepEqual(
  getContinuationPolicy({ payload: { taskStatus: "COMPLETE" } }),
  { action: "final-success", reason: "complete" },
);
assert.deepEqual(
  getContinuationPolicy({ payload: { taskStatus: "FAILED" } }),
  { action: "final-failure", reason: "failed" },
);
assert.deepEqual(
  getContinuationPolicy({ payload: { taskStatus: "IN_PROGRESS" } }),
  { action: "poll", reason: "in_progress" },
);
assert.deepEqual(
  reconcileContinuationAttempt({
    pendingAttempt: {
      previousTaskId: "task_checkpoint_1",
      manual: false,
    },
    payload: {
      taskId: "task_followup_1",
      taskStatus: "QUEUED",
    },
    continuationPassCount: 0,
    automaticContinuationCount: 0,
    continuedCheckpointTaskIds: [],
  }),
  {
    advanced: true,
    pendingAttempt: null,
    continuationPassCount: 1,
    automaticContinuationCount: 1,
    continuedCheckpointTaskIds: ["task_checkpoint_1"],
  },
);
assert.deepEqual(
  reconcileContinuationAttempt({
    pendingAttempt: {
      previousTaskId: "task_checkpoint_1",
      manual: true,
    },
    payload: firstCheckpoint,
    continuationPassCount: 1,
    automaticContinuationCount: 1,
    continuedCheckpointTaskIds: ["task_older_1"],
  }),
  {
    advanced: false,
    pendingAttempt: {
      previousTaskId: "task_checkpoint_1",
      manual: true,
    },
    continuationPassCount: 1,
    automaticContinuationCount: 1,
    continuedCheckpointTaskIds: ["task_older_1"],
  },
);

assert.equal(
  getDashboardUrl({
    dashboardUrl: "https://aristotle.harmonic.fun/projects/example",
  }),
  "https://aristotle.harmonic.fun/projects/example",
);
assert.equal(
  getDashboardUrl({
    dashboardUrl: "https://aristotle.harmonic.fun.attacker.example/project",
  }),
  "",
);
assert.equal(
  getDashboardUrl({
    dashboardUrl: "http://aristotle.harmonic.fun/project",
  }),
  "",
);

assert.equal(
  getErrorMessage(
    409,
    { error: { code: "result_unavailable" } },
    "download",
  ),
  "The result archive is not available yet.",
);
assert.match(
  getErrorMessage(409, { error: { code: "concurrency_limit" } }, "submit"),
  /concurrency limit/,
);
assert.match(
  getErrorMessage(503, { error: { code: "archive_upstream_error" } }, "archive"),
  /GitHub archive/,
);
assert.match(
  getErrorMessage(
    409,
    { error: { code: "stale_continuation" } },
    "continue",
  ),
  /different task/,
);
assert.match(
  getErrorMessage(
    409,
    { error: { code: "project_task_running" } },
    "continue",
  ),
  /running task/,
);
assert.match(
  getErrorMessage(
    409,
    { error: { code: "not_resumable" } },
    "continue",
  ),
  /not a resumable checkpoint/,
);
assert.equal(validateArchiveToken("a".repeat(43)), true);
assert.equal(validateArchiveToken("a".repeat(42)), false);
assert.equal(
  ARISTOTLE_SUCCESS_INDEX_URL,
  "https://raw.githubusercontent.com/ageofresearch/ageofresearch.github.io/main/submissions/successes/index.json",
);

assert.deepEqual(
  createStatusSnapshot(
    {
      projectStatus: 2,
      taskId: "task_12345678",
      taskStatus: "COMPLETE",
      percentComplete: 100,
      outputSummary: "Finished.",
      updatedAt: "2026-07-26T12:00:00Z",
      taskUpdatedAt: "2026-07-26T12:00:01Z",
    },
    "2026-07-26T12:00:02Z",
  ),
  {
    observedAt: "2026-07-26T12:00:02Z",
    projectStatus: 2,
    taskId: "task_12345678",
    taskStatus: "COMPLETE",
    percentComplete: 100,
    outputSummary: "Finished.",
    projectUpdatedAt: "2026-07-26T12:00:00Z",
    taskUpdatedAt: "2026-07-26T12:00:01Z",
  },
);

const successIndexItems = validateSuccessIndex({
  schemaVersion: "formagization.aristotle-success-index/v1",
  generatedAt: "2026-07-26T12:00:03Z",
  items: [{
    projectId: "project_12345678",
    title: "A completed formalization",
    taskStatus: "COMPLETE",
    submittedAt: "2026-07-26T12:00:00Z",
    completedAt: "2026-07-26T12:00:01Z",
    archivedAt: "2026-07-26T12:00:03Z",
    sourceKind: "manual-text",
    outputSummary: "Finished.",
    repositoryUrl:
      "https://github.com/ageofresearch/ageofresearch.github.io/tree/main/submissions/successes/project_12345678",
    resultUrl:
      "https://github.com/ageofresearch/ageofresearch.github.io/raw/main/submissions/successes/project_12345678/result.tar.gz",
  }],
});
assert.equal(successIndexItems.length, 1);
assert.equal(successIndexItems[0].taskStatus, "COMPLETE");
assert.throws(
  () =>
    validateSuccessIndex({
      schemaVersion: "formagization.aristotle-success-index/v1",
      items: [{
        ...successIndexItems[0],
        repositoryUrl:
          "https://github.com/ageofresearch/ageofresearch.github.io/tree/main/submissions/failures/project_12345678",
      }],
    }),
  /invalid record/,
);

const sharedLink = parseChatGPTShareUrl(
  "  https://chatgpt.com/share/6a61ff8e-ad64-83ea-9c46-9c238d377044  ",
);
assert.deepEqual(sharedLink, {
  id: "6a61ff8e-ad64-83ea-9c46-9c238d377044",
  url: "https://chatgpt.com/share/6a61ff8e-ad64-83ea-9c46-9c238d377044",
});
assert.equal(
  getChatGPTShareApiUrl(sharedLink),
  "https://formagization-aristotle-proxy.ageofresearch.chatgpt.site/api/chatgpt-share",
);
assert.throws(
  () => getChatGPTShareApiUrl(null),
  /valid public ChatGPT Share link/,
);
assert.throws(
  () =>
    getChatGPTShareApiUrl({
      url: "https://chatgpt.com.evil.example/share/6a61ff8e-ad64-83ea-9c46-9c238d377044",
    }),
  /valid public ChatGPT Share link/,
);
assert.equal(
  parseChatGPTShareUrl(
    "Please formalize https://chatgpt.com/share/6a61ff8e-ad64-83ea-9c46-9c238d377044",
  ),
  null,
);
assert.equal(
  parseChatGPTShareUrl(
    "https://chatgpt.com/share/6a61ff8e-ad64-83ea-9c46-9c238d377044\nextra-text",
  ),
  null,
);
assert.equal(
  parseChatGPTShareUrl(
    "https://chatgpt.com/share/6a61ff8e-ad64-\t83ea-9c46-9c238d377044",
  ),
  null,
);
assert.equal(
  parseChatGPTShareUrl(
    "https://chatgpt.com/share/6a61ff8e-ad64-83ea-9c46-9c238d377044?utm_source=test",
  ),
  null,
);
assert.equal(
  parseChatGPTShareUrl(
    "https://chatgpt.com.evil.example/share/6a61ff8e-ad64-83ea-9c46-9c238d377044",
  ),
  null,
);
assert.equal(
  parseChatGPTShareUrl(
    "http://chatgpt.com/share/6a61ff8e-ad64-83ea-9c46-9c238d377044",
  ),
  null,
);
assert.equal(
  looksLikeChatGPTShareUrl(
    "https://chatgpt.com/share/6a61ff8e-ad64-83ea-9c46-9c238d377044?utm_source=test",
  ),
  true,
);
assert.equal(
  looksLikeChatGPTShareUrl(
    "Please formalize https://chatgpt.com/share/6a61ff8e-ad64-83ea-9c46-9c238d377044",
  ),
  false,
);

assert.equal(CHATGPT_TRANSCRIPT_LIMIT, 2_000_000);

const transcriptTargetLength = 237_230;
const transcriptTurns = [];
for (let index = 1; index <= 51; index += 1) {
  transcriptTurns.push(`PERSON:\nQuestion ${index}`);
  transcriptTurns.push(`LLM:\nAnswer ${index}`);
}
transcriptTurns.push("PERSON:\nRepeat previous question");
transcriptTurns.push("PERSON:\nFinal follow-up");

let completeTranscript = transcriptTurns.join("\n\n");
assert.ok(completeTranscript.length < transcriptTargetLength);
transcriptTurns[1] += "x".repeat(
  transcriptTargetLength - Array.from(completeTranscript).length,
);
completeTranscript = transcriptTurns.join("\n\n");
assert.equal(Array.from(completeTranscript).length, transcriptTargetLength);

const completeConversationPayload = {
  title: "Jacobian Conjecture Counterexample",
  sourceUrl: sharedLink.url,
  text: completeTranscript,
  turnCount: 104,
  personTurnCount: 53,
  llmTurnCount: 51,
  attachmentCount: 1,
  characters: transcriptTargetLength,
  branchNodeCount: 354,
  complete: true,
  completeness: "selected-public-branch",
  sourceSha256: `sha256:${"a".repeat(64)}`,
  importToken: "b".repeat(43),
  retrievalMethod: "chatgpt-public-share-flat-payload",
  importerVersion: "formagization.chatgpt-share/v2",
};

const importedConversation = validateImportedChatGPTConversation(
  completeConversationPayload,
  sharedLink,
);
assert.equal(importedConversation.text, completeTranscript);
assert.equal(importedConversation.characters, transcriptTargetLength);
assert.equal(importedConversation.turnCount, 104);
assert.equal(importedConversation.personTurnCount, 53);
assert.equal(importedConversation.llmTurnCount, 51);
assert.equal(importedConversation.attachmentCount, 1);
assert.equal(importedConversation.branchNodeCount, 354);
assert.equal(importedConversation.complete, true);
assert.equal(
  importedConversation.completeness,
  "selected-public-branch",
);
assert.equal(
  importedConversation.sourceSha256,
  `sha256:${"a".repeat(64)}`,
);
assert.equal(importedConversation.importToken, "b".repeat(43));

assert.throws(
  () => validateImportedChatGPTConversation(null, sharedLink),
  /malformed or incomplete/,
);
assert.throws(
  () =>
    validateImportedChatGPTConversation(
      { ...completeConversationPayload, complete: false },
      sharedLink,
    ),
  /malformed or incomplete/,
);
assert.throws(
  () =>
    validateImportedChatGPTConversation(
      {
        ...completeConversationPayload,
        importToken: "not-a-valid-import-token",
      },
      sharedLink,
    ),
  /malformed or incomplete/,
);
assert.throws(
  () =>
    validateImportedChatGPTConversation(
      {
        ...completeConversationPayload,
        completeness: "rendered-markdown",
      },
      sharedLink,
    ),
  /malformed or incomplete/,
);
assert.throws(
  () =>
    validateImportedChatGPTConversation(
      {
        ...completeConversationPayload,
        sourceUrl:
          "https://chatgpt.com/share/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
      },
      sharedLink,
    ),
  /malformed or incomplete/,
);
assert.throws(
  () =>
    validateImportedChatGPTConversation(
      {
        ...completeConversationPayload,
        text: "x".repeat(CHATGPT_TRANSCRIPT_LIMIT + 1),
        characters: CHATGPT_TRANSCRIPT_LIMIT + 1,
      },
      sharedLink,
    ),
  /malformed or incomplete/,
);
assert.throws(
  () =>
    validateImportedChatGPTConversation(
      {
        ...completeConversationPayload,
        personTurnCount: 52,
      },
      sharedLink,
    ),
  /failed its completeness checks/,
);
assert.throws(
  () =>
    validateImportedChatGPTConversation(
      {
        ...completeConversationPayload,
        characters: transcriptTargetLength - 1,
      },
      sharedLink,
    ),
  /failed its completeness checks/,
);
assert.throws(
  () =>
    validateImportedChatGPTConversation(
      {
        ...completeConversationPayload,
        sourceSha256: "sha256:not-a-valid-digest",
      },
      sharedLink,
    ),
  /malformed or incomplete/,
);

console.log("Aristotle behavior tests passed.");
