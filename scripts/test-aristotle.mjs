import assert from "node:assert/strict";

import {
  extractChatGPTConversation,
  getChatGPTShareRelayUrl,
  getDashboardUrl,
  getErrorMessage,
  getPollDelay,
  getStatus,
  looksLikeChatGPTShareUrl,
  parseChatGPTShareUrl,
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
  getChatGPTShareRelayUrl(sharedLink),
  "https://r.jina.ai/https://chatgpt.com/share/6a61ff8e-ad64-83ea-9c46-9c238d377044",
);
assert.equal(
  parseChatGPTShareUrl(
    "Please formalize https://chatgpt.com/share/6a61ff8e-ad64-83ea-9c46-9c238d377044",
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

const importedConversation = extractChatGPTConversation(`
Title: Check out this chat
URL Source: https://chatgpt.com/share/example
Markdown Content:

This is a copy of a shared ChatGPT conversation

#### ChatGPT said:

Worked for 4m 36s

Complete proof bundle · Proof manuscript PDF · LaTeX source · Verification output

I will first state the candidate theorem.

$$x^2 \\geq 0$$

Sources

#### You said:

Try to disprove it before formalizing it.

#### ChatGPT said:

The counterexample search found no contradiction.

ChatGPT is AI and can make mistakes.
Voice
[Audio 1](https://example.invalid/audio)
`);
assert.equal(importedConversation.turnCount, 3);
assert.equal(importedConversation.personTurnCount, 1);
assert.equal(importedConversation.llmTurnCount, 2);
assert.equal(
  importedConversation.text,
  [
    "LLM:\nI will first state the candidate theorem.\n\n$$x^2 \\geq 0$$",
    "PERSON:\nTry to disprove it before formalizing it.",
    "LLM:\nThe counterexample search found no contradiction.",
  ].join("\n\n"),
);
assert.equal(importedConversation.text.includes("Title:"), false);
assert.equal(importedConversation.text.includes("Worked for"), false);
assert.equal(importedConversation.text.includes("Complete proof bundle"), false);
assert.equal(importedConversation.text.includes("Sources"), false);
assert.equal(importedConversation.text.includes("ChatGPT is AI"), false);
assert.equal(importedConversation.text.includes("Audio 1"), false);

const spanishMarkers = extractChatGPTConversation(`
#### Tú dijiste:
Demuestra el lema.
#### ChatGPT dijo:
Comencemos por las definiciones.
`);
assert.equal(
  spanishMarkers.text,
  "PERSON:\nDemuestra el lema.\n\nLLM:\nComencemos por las definiciones.",
);
assert.equal(
  extractChatGPTConversation(`
#### ChatGPT said:
Proof idea · Let x be the proposed witness.
`).text,
  "LLM:\nProof idea · Let x be the proposed witness.",
);
assert.equal(
  extractChatGPTConversation(`
#### You said:
Please formalize the following bibliography.

Sources
`).text,
  "PERSON:\nPlease formalize the following bibliography.\n\nSources",
);
const fencedRoleHeading = extractChatGPTConversation(`
#### ChatGPT said:
Here is a quoted transcript:
\`\`\`markdown
#### You said:
This heading is quoted, not a new turn.
\`\`\`
#### You said:
This is the actual next turn.
`);
assert.equal(fencedRoleHeading.turnCount, 2);
assert.equal(
  fencedRoleHeading.text,
  [
    "LLM:\nHere is a quoted transcript:\n```markdown\n#### You said:\nThis heading is quoted, not a new turn.\n```",
    "PERSON:\nThis is the actual next turn.",
  ].join("\n\n"),
);
assert.throws(
  () =>
    extractChatGPTConversation(`
#### ChatGPT said:
First assistant turn.
#### You said:
A quoted heading outside a code fence.
#### You said:
The real person turn.
`),
  /ambiguous speaker sequence/,
);
assert.throws(
  () => extractChatGPTConversation("Markdown Content:\nOnly selected text."),
  /does not expose a readable conversation transcript/,
);
assert.throws(
  () =>
    extractChatGPTConversation(
      `#### You said:\n${"x".repeat(30)}`,
      { maxChars: 20 },
    ),
  /Nothing was truncated/,
);
assert.throws(
  () => extractChatGPTConversation("#### You said:\nunsafe\u0000text"),
  /empty, unsafe, or too large/,
);

console.log("Aristotle behavior tests passed.");
