import assert from "node:assert/strict";

import {
  getDashboardUrl,
  getErrorMessage,
  getPollDelay,
  getStatus,
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

console.log("Aristotle behavior tests passed.");
