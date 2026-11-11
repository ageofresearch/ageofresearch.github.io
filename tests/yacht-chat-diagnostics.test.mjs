import test from 'node:test';
import assert from 'node:assert/strict';
import { CHAT_BUILD, createDiagnostics, diagnostics, installGlobalDiagnostics } from '../site/tidewater-rocha/luz-de-mar-chat/diagnostics.js';

const SECRET = 'AIza_TEST_ONLY_NEVER_LOG_THIS_0123456789';
const PRIVATE = 'PRIVATE QUESTION AND RESPONSE CONTENT';

test('diagnostics retain stage timings and numeric transport counters', () => {
  let time = 100;
  const log = createDiagnostics({ clock: () => time });
  const trace = log.start('gemini');
  trace.stage('wait_response_headers', { deadlineMs: 120000 });
  time += 45;
  trace.stage('response_headers', { httpStatus: 200, contentType: 'text/event-stream' });
  trace.update({ bytesReceived: 128, chunksReceived: 2, eventsReceived: 1 });
  time += 10;
  trace.finish();
  const report = log.snapshot().reports[0];
  assert.equal(log.snapshot().build, CHAT_BUILD);
  assert.equal(report.elapsedMs, 55);
  assert.equal(report.events.find(event => event.stage === 'response_headers').atMs, 45);
  assert.equal(report.metrics.bytesReceived, 128);
  assert.equal(report.state, 'success');
});

test('reports never serialize raw messages, payloads, headers, URLs, arbitrary exception strings or unknown fields', () => {
  const log = createDiagnostics();
  const trace = log.start(SECRET);
  trace.stage(SECRET, {
    apiKey: SECRET, question: PRIVATE, answer: PRIVATE, url: 'https://example.invalid/?key=' + SECRET,
    headers: { 'x-goog-api-key': SECRET }, body: PRIVATE, contentType: SECRET,
    providerReason: SECRET, finishReason: SECRET, httpStatus: SECRET,
  });
  const error = new Error(PRIVATE + SECRET);
  error.name = SECRET;
  error.stack = PRIVATE + '\n at https://ageofresearch.github.io/tidewater-rocha/luz-de-mar-chat/chat.js?key=' + SECRET + ':42:7';
  trace.fail(SECRET, error);
  const text = log.report();
  assert.equal(text.includes(SECRET), false);
  assert.equal(text.includes(PRIVATE), false);
  assert.equal(text.includes('x-goog-api-key'), false);
  const report = log.snapshot().reports[0];
  assert.equal(report.failureCode, 'chat_unexpected');
  assert.deepEqual(report.exception.frames, [{ file: 'chat.js', line: 42, column: 7 }]);
  assert.equal(report.exception.name, 'Unknown');
});

test('the original failure stage survives later UI handling and secondary failures stay visible', () => {
  const log = createDiagnostics();
  const trace = log.start('gemini');
  trace.stage('parse_stream_event');
  trace.fail('gemini_stream_json', new SyntaxError(SECRET));
  trace.stage('ui_error');
  trace.fail('chat_unexpected', new TypeError(PRIVATE));
  trace.stage('ui_finally');
  const report = log.snapshot().reports[0];
  assert.equal(report.failureStage, 'parse_stream_event');
  assert.equal(report.failureCode, 'gemini_stream_json');
  assert.equal(report.failures.length, 2);
  assert.equal(report.failures[1].stage, 'ui_error');
});

test('diagnostic history and events are bounded and can be cleared', () => {
  const log = createDiagnostics({ maxReports: 2 });
  for (let i = 0; i < 5; i++) {
    const trace = log.start();
    for (let j = 0; j < 80; j++) trace.fail('chat_unexpected');
  }
  assert.equal(log.snapshot().reports.length, 2);
  assert.ok(log.snapshot().reports.every(report => report.events.length <= 40 && report.failures.length <= 4));
  log.clear();
  assert.equal(log.snapshot().reports.length, 0);
});

test('scoped global catchers capture own runtime, rejected promise, resource and CSP failures without private data', () => {
  diagnostics.clear();
  const target = new EventTarget();
  installGlobalDiagnostics(target);
  installGlobalDiagnostics(target);
  const error = new Error(SECRET + PRIVATE);
  error.stack = 'Error: ' + SECRET + '\n at https://ageofresearch.github.io/tidewater-rocha/luz-de-mar-chat/gemini.js:50:3';
  const dispatch = (type, properties) => {
    const event = new Event(type, { cancelable: true });
    for (const [key, value] of Object.entries(properties)) Object.defineProperty(event, key, { value });
    target.dispatchEvent(event);
    assert.equal(event.defaultPrevented, false);
  };
  dispatch('error', { error });
  dispatch('unhandledrejection', { reason: error });
  dispatch('error', { target: { src: 'https://ageofresearch.github.io/tidewater-rocha/luz-de-mar-chat/chat.js?secret=' + SECRET } });
  dispatch('securitypolicyviolation', { blockedURI: 'https://generativelanguage.googleapis.com/?key=' + SECRET, effectiveDirective: 'connect-src' });
  dispatch('error', { error: new Error('Unrelated renderer issue'), filename: 'https://example.invalid/renderer.js' });
  const snapshot = JSON.parse(target.__luzDeMarDiagnostics.report());
  assert.deepEqual(snapshot.reports.map(report => report.failureCode), ['chat_runtime', 'chat_rejection', 'chat_resource', 'chat_csp']);
  assert.equal(snapshot.reports[3].metrics.resource, 'gemini_api');
  assert.equal(target.__luzDeMarDiagnostics.report().includes(SECRET), false);
  assert.equal(target.__luzDeMarDiagnostics.report().includes(PRIVATE), false);
});

test('untrusted exception getters cannot crash the exception recorder', () => {
  const log = createDiagnostics();
  const trace = log.start();
  const error = new Proxy({}, { get() { throw new Error(SECRET); } });
  assert.doesNotThrow(() => trace.fail('chat_runtime', error));
  assert.equal(log.report().includes(SECRET), false);
});
