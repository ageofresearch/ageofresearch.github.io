import assert from "node:assert/strict";

import {
  CHATGPT_TRANSCRIPT_LIMIT,
  getChatGPTShareApiUrl,
  getDashboardUrl,
  getErrorMessage,
  getPollDelay,
  getStatus,
  looksLikeChatGPTShareUrl,
  parseChatGPTShareUrl,
  validateImportedChatGPTConversation,
  validateKey,
} from "../site/assets/aristotle-core.mjs";

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
