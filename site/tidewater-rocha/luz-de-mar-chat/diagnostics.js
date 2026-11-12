export const CHAT_BUILD = '2026-11-12-flash-lite-6';
const STAGES = new Set([
  'start', 'bootstrap_import', 'runtime_error', 'unhandled_rejection', 'resource_error', 'security_policy',
  'validate_input', 'build_request', 'wait_response_headers', 'response_headers', 'read_error_body',
  'stream_read', 'first_byte', 'parse_stream_event', 'first_event', 'first_text', 'stream_eof',
  'provider_complete', 'ui_prepare', 'ui_context', 'ui_message', 'ui_dispatch', 'ui_stream_render',
  'ui_complete', 'ui_error', 'ui_finally', 'diagnostic_render', 'diagnostic_copy',
  'read_model_metadata', 'provider_accepted', 'ui_state_render',
]);
const CODES = new Set([
  'gemini_question', 'gemini_key', 'gemini_request', 'gemini_model', 'gemini_quota', 'gemini_billing',
  'gemini_unavailable', 'gemini_response', 'gemini_blocked', 'gemini_incomplete', 'gemini_network',
  'gemini_timeout', 'gemini_cancelled', 'gemini_content_type', 'gemini_stream_json',
  'gemini_stream_schema', 'gemini_stream_read', 'gemini_render', 'chat_unexpected', 'chat_key_in_question',
  'chat_runtime', 'chat_rejection', 'chat_resource', 'chat_csp', 'bootstrap_import',
  'diagnostic_copy', 'diagnostic_render',
  'gemini_probe_response',
  'gemini_keepalive_timeout',
]);
const ENUMS = {
  interactionEvent: ['interaction.created', 'interaction.status_update', 'step.start', 'step.delta', 'step.stop', 'interaction.completed', 'error', 'other'],
  interactionStatus: ['in_progress', 'completed', 'failed', 'cancelled', 'incomplete', 'requires_action', 'requires_continuation', 'unknown'],
  interactionErrorCode: ['invalid_request', 'failed_precondition', 'parameter_unknown', 'authentication', 'payment_required', 'permission_denied', 'not_found', 'model_not_found', 'out_of_range', 'rate_limit_exceeded', 'quota_exceeded', 'too_many_requests', 'cancelled', 'api_error', 'unimplemented', 'service_unavailable', 'deadline_exceeded', 'gateway_timeout', 'safety', 'recitation', 'language', 'prohibited_content', 'spii', 'blocklist', 'image_safety', 'image_prohibited_content', 'image_recitation', 'image_other', 'content_blocked', 'unknown'],
  requestMethod: ['GET', 'POST', 'unknown'],
  requestKind: ['public_discovery', 'model_metadata', 'generation_stream', 'generation_probe', 'unknown'],
  contentType: ['text/event-stream', 'application/json', 'text/html', 'other', 'missing'],
  responseType: ['basic', 'cors', 'default', 'opaque', 'opaqueredirect', 'error'],
  providerStatus: ['INVALID_ARGUMENT', 'FAILED_PRECONDITION', 'PERMISSION_DENIED', 'UNAUTHENTICATED',
    'NOT_FOUND', 'RESOURCE_EXHAUSTED', 'CANCELLED', 'INTERNAL', 'UNAVAILABLE', 'DEADLINE_EXCEEDED', 'UNKNOWN'],
  providerReason: ['API_KEY_INVALID', 'API_KEY_EXPIRED', 'API_KEY_NOT_FOUND', 'API_KEY_LEAKED',
    'API_KEY_HTTP_REFERRER_BLOCKED', 'API_KEY_IP_ADDRESS_BLOCKED', 'API_KEY_SERVICE_BLOCKED',
    'API_KEY_SERVICE_DISABLED', 'SERVICE_DISABLED', 'BILLING_DISABLED', 'BILLING_NOT_ACTIVE',
    'CONSUMER_INVALID', 'RATE_LIMIT_EXCEEDED', 'RESOURCE_QUOTA_EXCEEDED', 'ACCESS_TOKEN_SCOPE_INSUFFICIENT', 'OTHER'],
  finishReason: ['STOP', 'MAX_TOKENS', 'SAFETY', 'RECITATION', 'LANGUAGE', 'OTHER', 'BLOCKLIST',
    'PROHIBITED_CONTENT', 'SPII', 'MALFORMED_FUNCTION_CALL', 'UNEXPECTED_TOOL_CALL', 'MALFORMED_RESPONSE', 'UNKNOWN'],
  blockReason: ['SAFETY', 'OTHER', 'BLOCKLIST', 'PROHIBITED_CONTENT', 'IMAGE_SAFETY', 'UNKNOWN'],
  cancellationSource: ['user', 'pagehide', 'destroy', 'disconnect', 'external'],
  directive: ['connect-src', 'script-src', 'script-src-elem', 'style-src', 'style-src-elem', 'other'],
  resource: ['gemini_api', 'chat_script', 'chat_style', 'unknown'],
  errorBody: ['parsed', 'unreadable', 'invalid_json', 'too_large', 'timed_out', 'no_error_event', 'not_json'],
  errorFormat: ['json', 'sse', 'unsupported'],
  providerHint: ['API_KEY', 'HTTP_REFERRER', 'BILLING', 'PROJECT_VERIFICATION', 'REGION', 'QUOTA', 'REQUEST_PARAMETER', 'MODEL', 'CAPACITY', 'UNKNOWN'],
  requestField: ['thinkingConfig', 'thinkingLevel', 'maxOutputTokens', 'responseMimeType', 'systemInstruction', 'contents', 'UNKNOWN'],
};
const NUMBERS = new Set([
  'httpStatus', 'providerHttpCode', 'deadlineMs', 'bytesReceived', 'chunksReceived', 'eventsReceived', 'textChars',
  'firstByteMs', 'firstEventMs', 'firstTextMs', 'lastDataMs', 'retryAfterSeconds', 'requestBytes',
  'historyMessages', 'errorBytes', 'acceptedMs', 'totalInputTokens', 'totalOutputTokens', 'thoughtTokens', 'totalTokens',
  'commentLines', 'dataLines', 'eventLines', 'unknownLines', 'emptyLines', 'pendingBufferChars', 'dataChars',
]);

function fields(input = {}) {
  const result = {};
  for (const name of NUMBERS) {
    if (Number.isFinite(input[name]) && input[name] >= 0) result[name] = Math.min(1e9, Math.round(input[name]));
  }
  for (const [name, values] of Object.entries(ENUMS)) {
    if (input[name] !== undefined) result[name] = values.includes(input[name]) ? input[name] : values.at(-1);
  }
  if (typeof input.providerInstrumented === 'boolean') result.providerInstrumented = input.providerInstrumented;
  for (const name of ['modelMetadataReceived', 'generationSupported']) if (typeof input[name] === 'boolean') result[name] = input[name];
  return result;
}

export function ownFrames(error) {
  let stack = '';
  try { if (typeof error?.stack === 'string') stack = error.stack; } catch { return []; }
  return Array.from(stack.matchAll(/luz-de-mar-chat\/(bootstrap|chat|assistant|gemini|diagnostics)\.js(?:\?[^\s:)]*)?:(\d{1,7}):(\d{1,7})/g))
    .slice(0, 4).map(match => ({ file: match[1] + '.js', line: Number(match[2]), column: Number(match[3]) }));
}

function exception(error) {
  const names = ['Error', 'TypeError', 'SyntaxError', 'RangeError', 'ReferenceError', 'AbortError', 'TimeoutError'];
  try {
    const source = error?.cause || error;
    const frames = [...ownFrames(source), ...(source !== error ? ownFrames(error) : [])];
    return { name: names.includes(source?.name) ? source.name : 'Unknown', frames: frames.filter((frame, index) => frames.findIndex(other => other.file === frame.file && other.line === frame.line && other.column === frame.column) === index).slice(0, 4) };
  } catch { return { name: 'Unknown', frames: [] }; }
}

function environment() {
  return {
    online: typeof globalThis.navigator?.onLine === 'boolean' ? globalThis.navigator.onLine : null,
    secureContext: typeof globalThis.isSecureContext === 'boolean' ? globalThis.isSecureContext : null,
    fetch: typeof globalThis.fetch === 'function',
    streams: typeof globalThis.ReadableStream === 'function',
    abortController: typeof globalThis.AbortController === 'function',
    textDecoder: typeof globalThis.TextDecoder === 'function',
    visibility: typeof document !== 'undefined' && ['hidden', 'visible'].includes(document.visibilityState) ? document.visibilityState : 'unknown',
  };
}

/** Explicitly allowlisted metadata only: no arbitrary messages, bodies, headers, URLs or input strings. */
export function createDiagnostics({ clock = () => globalThis.performance?.now?.() ?? Date.now(), maxReports = 8 } = {}) {
  let sequence = 0;
  const limit = Number.isFinite(maxReports) ? Math.min(12, Math.max(1, maxReports)) : 8;
  const reports = [];
  function start(provider = 'runtime') {
    const started = clock();
    const report = {
      id: 'ldm-' + Date.now().toString(36) + '-' + (++sequence).toString(36),
      startedAt: new Date().toISOString(), provider: ['gemini', 'local', 'server', 'bootstrap', 'runtime', 'configuration', 'connectivity_public', 'connectivity_model', 'generation_probe'].includes(provider) ? provider : 'runtime',
      state: 'pending', stage: 'start', environment: environment(), metrics: provider === 'gemini' ? { providerInstrumented: false } : {}, events: [],
    };
    const seen = new Set();
    const elapsed = () => Math.max(0, Math.round(clock() - started));
    const event = (name, detail = {}) => {
      if (report.events.length >= 40) report.events.shift();
      report.events.push({ atMs: elapsed(), event: name, ...detail });
    };
    reports.push({ report, elapsed });
    while (reports.length > limit) reports.shift();
    return {
      elapsed,
      stage(name, detail = {}) {
        report.stage = STAGES.has(name) ? name : 'start';
        Object.assign(report.metrics, fields(detail));
        if (!seen.has(report.stage)) { seen.add(report.stage); event('stage', { stage: report.stage }); }
      },
      update(detail) { Object.assign(report.metrics, fields(detail)); },
      finish(state = 'success') {
        report.state = ['success', 'cancelled', 'skipped'].includes(state) ? state : 'success';
        report.durationMs = elapsed();
        event(report.state);
      },
      fail(code, error) {
        report.state = code === 'gemini_cancelled' ? 'cancelled' : 'failed';
        const safeCode = CODES.has(code) ? code : 'chat_unexpected';
        const detail = exception(error);
        report.failureCode ||= safeCode;
        report.failureStage ||= report.stage;
        report.exception ||= detail;
        report.failures ||= [];
        const previous = report.failures.at(-1);
        if (previous?.code !== safeCode || previous?.stage !== report.stage) {
          report.failures.push({ code: safeCode, stage: report.stage, atMs: elapsed(), exception: detail });
          if (report.failures.length > 4) report.failures.shift();
        }
        report.durationMs = elapsed();
        event('failure', { code: safeCode, stage: report.stage });
      },
    };
  }
  return {
    start,
    clear() { reports.length = 0; },
    snapshot() {
      return JSON.parse(JSON.stringify({
        build: CHAT_BUILD, generatedAt: new Date().toISOString(), model: 'gemini-3.5-flash-lite',
        transport: 'Interactions API SSE',
        browserLimit: 'Un fallo de fetch sin estado HTTP no permite distinguir por sí solo DNS, TLS, CORS, extensiones o bloqueo de red.',
        reports: reports.map(({ report, elapsed }) => ({ ...report, elapsedMs: report.durationMs ?? elapsed() })),
      }));
    },
    report() { return JSON.stringify(this.snapshot(), null, 2); },
  };
}

export const diagnostics = createDiagnostics();
const installed = new WeakSet();

export function installGlobalDiagnostics(target = globalThis.window) {
  if (!target || installed.has(target)) return;
  installed.add(target);
  const capture = (stage, code, error, detail = {}) => {
    const trace = diagnostics.start('runtime');
    trace.stage(stage, detail);
    trace.fail(code, error);
  };
  target.addEventListener('error', event => {
    const resource = event.target;
    const address = resource?.src || resource?.href || '';
    if (/\/luz-de-mar-chat\/(?:bootstrap|chat|assistant|gemini|diagnostics)\.js(?:[?#]|$)/.test(address) || /\/luz-de-mar-chat\/chat\.css(?:[?#]|$)/.test(address)) {
      capture('resource_error', 'chat_resource', null, { resource: address.includes('.css') ? 'chat_style' : 'chat_script' });
    } else if (ownFrames(event.error).length || /\/luz-de-mar-chat\/(?:bootstrap|chat|assistant|gemini|diagnostics)\.js(?:[?#]|$)/.test(event.filename || '')) {
      capture('runtime_error', 'chat_runtime', event.error);
    }
  }, true);
  target.addEventListener('unhandledrejection', event => {
    if (ownFrames(event.reason).length) capture('unhandled_rejection', 'chat_rejection', event.reason);
  });
  target.addEventListener('securitypolicyviolation', event => {
    let resource = '';
    try {
      const url = new URL(event.blockedURI);
      if (url.hostname === 'generativelanguage.googleapis.com') resource = 'gemini_api';
      else if (/\/luz-de-mar-chat\//.test(url.pathname)) resource = url.pathname.endsWith('.css') ? 'chat_style' : 'chat_script';
    } catch { /* Ignore inline and unrelated policy violations. */ }
    if (resource) capture('security_policy', 'chat_csp', null, { resource, directive: event.effectiveDirective });
  });
  target.__luzDeMarDiagnostics = Object.freeze({ report: () => diagnostics.report() });
}
