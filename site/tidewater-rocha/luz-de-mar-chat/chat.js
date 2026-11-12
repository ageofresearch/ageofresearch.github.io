import { createEquipmentTour } from './camera-tour.js';
import { answerQuestion } from './assistant.js';
import { GEMINI_MODEL, DEFAULT_THINKING_LEVEL, THINKING_LEVELS, checkGeminiConnection, testGeminiGeneration } from './gemini.js';
import { CHAT_BUILD, diagnostics, installGlobalDiagnostics } from './diagnostics.js';

const ROOT_ID = 'ldm-chat-widget';
const MAX_MESSAGE = 2000;
const MAX_ANSWER = 12000;
const MAX_HISTORY = 8;
const WALK_KEYS = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ShiftLeft', 'ShiftRight']);

function canWalkFromChat(event) {
  return WALK_KEYS.has(event.code) && !event.ctrlKey && !event.metaKey && !event.altKey &&
    !event.isComposing && !event.target.isContentEditable && !event.target.closest('textarea,input,select');
}

const ALLOWED_HOSTS = new Set([
  'azimutyachts.com', 'www.azimutyachts.com',
  'mtu-solutions.com', 'www.mtu-solutions.com', 'nmea.org', 'www.nmea.org',
  'imo.org', 'www.imo.org', 'ageofresearch.github.io',
]);

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderAnswer(target, value) {
  const text = clipped(value, MAX_ANSWER);
  target.textContent = '';
  let offset = 0;
  // Keep code spans and escaped asterisks literal. Only paired ** delimiters produce markup.
  const tokens = /(`+)[\s\S]*?\1|\\\*|\*\*(?!\s)([\s\S]+?)(?<!\s)\*\*/g;
  for (const match of text.matchAll(tokens)) {
    target.append(text.slice(offset, match.index));
    if (match[2] !== undefined) target.append(el('strong', '', match[2]));
    else target.append(match[0]);
    offset = match.index + match[0].length;
  }
  target.append(text.slice(offset));
}

function sourceURL(value) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password &&
      ALLOWED_HOSTS.has(url.hostname) ? url.href : null;
  } catch { return null; }
}

function configuredEndpoint() {
  const script = Array.from(document.querySelectorAll('script[src]'))
    .find(node => node.src === import.meta.url || node.hasAttribute('data-yacht-chat'));
  return script?.dataset.endpoint?.trim() ||
    document.querySelector('meta[name="yacht-chat-endpoint"]')?.content?.trim() || undefined;
}

function viewContext() {
  const controls = document.querySelector('[aria-label="Controles del yate"]');
  if (!controls || !controls.getClientRects().length) return '';
  return (controls.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 320);
}

function clipped(value, limit = MAX_MESSAGE) {
  const text = String(value || '');
  return text.length > limit ? text.slice(0, limit - 1) + '…' : text;
}

function boundedHistory(question, history, context) {
  const result = history.slice(-MAX_HISTORY).map(message => ({
    role: message.role, content: clipped(message.content),
    ...(message.topic ? { topic: String(message.topic).slice(0, 80) } : {}),
  }));
  // Leave room for the question, view label, and JSON envelope under 16 KiB.
  const bytes = value => new TextEncoder().encode(JSON.stringify(value)).length;
  while (result.length && bytes({ question, history: result, viewContext: context }) > 14000) {
    result.splice(0, Math.min(2, result.length));
  }
  return result;
}

function installStyles() {
  if (document.querySelector('link[data-ldm-chat-style]')) return;
  const link = el('link');
  link.rel = 'stylesheet';
  link.href = new URL('./chat.css?v=open-tour-1', import.meta.url).href;
  link.dataset.ldmChatStyle = '';
  document.head.append(link);
}

/** Read-only conversation widget. It never changes equipment or approves a voyage. */
export function mountYachtChat({ endpoint = configuredEndpoint(), mountPoint = document.body } = {}) {
  const existing = document.getElementById(ROOT_ID);
  if (existing) return existing.__ldmChat;
  installGlobalDiagnostics(window);
  installStyles();

  let focusTimer = null;
  function cancelFocus() {
    clearTimeout(focusTimer);
    tour.stop();
  }
  const history = [];
  let geminiApiKey = '';
  let connectionVersion = 0;
  let requestController = null;
  let pending = false, opened = false, disposed = false;
  let previousFocus = null, failed = null;
  const root = el('section', 'ldm-chat');
  root.id = ROOT_ID;
  const tour = createEquipmentTour(root);
  root.lang = 'es';
  root.setAttribute('aria-label', 'Asistente de consulta de Luz de Mar');

  const launcher = el('button', 'ldm-chat-launcher');
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Abrir chat de Luz de Mar');
  launcher.setAttribute('aria-expanded', 'false');
  launcher.setAttribute('aria-controls', 'ldm-chat-panel');
  const icon = el('span', 'ldm-chat-launch-icon', '✦');
  icon.setAttribute('aria-hidden', 'true');
  const launchText = el('span', 'ldm-chat-launch-text');
  launchText.append(el('strong', '', 'Luz de Mar'), el('span', '', 'Chat del yate'));
  const arrow = el('span', 'ldm-chat-launch-arrow', '↗');
  arrow.setAttribute('aria-hidden', 'true');
  launcher.append(icon, launchText, arrow);

  const panel = el('section', 'ldm-chat-panel');
  panel.id = 'ldm-chat-panel';
  panel.hidden = true;
  panel.tabIndex = -1;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Chat del yate Luz de Mar');

  const header = el('header', 'ldm-chat-header');
  const brand = el('div', 'ldm-chat-brand');
  const mark = el('span', 'ldm-chat-mark', 'L');
  mark.setAttribute('aria-hidden', 'true');
  const heading = el('div');
  heading.append(el('p', 'ldm-chat-eyebrow', 'CHAT DEL YATE'), el('h2', 'ldm-chat-title', 'Luz de Mar'));
  brand.append(mark, heading);
  const actions = el('div', 'ldm-chat-actions');
  const clear = el('button', 'ldm-chat-icon-button', '↺');
  clear.type = 'button';
  clear.title = 'Nueva conversación';
  clear.setAttribute('aria-label', 'Limpiar la conversación');
  const minimize = el('button', 'ldm-chat-icon-button ldm-chat-close', '−');
  minimize.type = 'button';
  minimize.title = 'Minimizar chat';
  minimize.setAttribute('aria-label', 'Minimizar chat');
  actions.append(clear, minimize);
  header.append(brand, actions);

  const modeRow = el('div', 'ldm-chat-context');
  const mode = el('span', 'ldm-chat-mode', endpoint ? 'Por consultar' : '');
  mode.dataset.mode = 'local';
  modeRow.hidden = !endpoint;
  modeRow.append(mode);

  const connection = el('section', 'ldm-chat-connection');
  connection.setAttribute('aria-label', 'Conexión con Gemini');
  const connectionTitle = el('div', 'ldm-chat-connection-title');
  connectionTitle.append(el('strong', '', 'Gemini'), el('code', '', GEMINI_MODEL));
  const keyStatus = el('p', 'ldm-chat-key-status');
  keyStatus.setAttribute('role', 'status');
  keyStatus.setAttribute('aria-live', 'polite');
  const keyForm = el('form', 'ldm-chat-key-form');
  const keyLabel = el('label', 'ldm-chat-sr-only', 'Clave API de Gemini');
  keyLabel.htmlFor = 'ldm-gemini-key';
  const keyField = el('textarea', 'ldm-chat-key');
  keyField.id = 'ldm-gemini-key';
  keyField.rows = 2;
  keyField.maxLength = 512;
  keyField.placeholder = 'Pega aquí tu API key de Gemini';
  keyField.autocomplete = 'off';
  keyField.spellcheck = false;
  keyField.setAttribute('autocapitalize', 'off');
  keyField.setAttribute('autocorrect', 'off');
  const keyActions = el('div', 'ldm-chat-key-actions');
  const useKey = el('button', 'ldm-chat-key-use', 'Usar Gemini');
  useKey.type = 'submit';
  useKey.disabled = true;
  const cancelKey = el('button', 'ldm-chat-key-action', 'Cancelar cambio');
  cancelKey.type = 'button';
  cancelKey.hidden = true;
  keyActions.append(useKey, cancelKey);
  keyForm.append(keyLabel, keyField, keyActions);
  const keyConnected = el('div', 'ldm-chat-key-connected');
  keyConnected.hidden = true;
  const changeKey = el('button', 'ldm-chat-key-action', 'Cambiar clave');
  changeKey.type = 'button';
  const disconnectKey = el('button', 'ldm-chat-key-action', 'Desconectar Gemini');
  disconnectKey.type = 'button';
  const checkConnection = el('button', 'ldm-chat-key-action', 'Comprobar conexión');
  checkConnection.type = 'button';
  const testGeneration = el('button', 'ldm-chat-key-action', 'Probar respuesta breve');
  testGeneration.type = 'button';
  testGeneration.hidden = true;
  const generationNote = el('p', 'ldm-chat-key-note', 'Prueba de hasta 30 s sin contexto del yate. Usa la API y puede consumir tokens.');
  generationNote.hidden = true;
  const reasoningRow = el('div', 'ldm-chat-reasoning');
  const reasoningLabel = el('label', '', 'Razonamiento');
  const reasoningSelect = el('select', '');
  reasoningLabel.htmlFor = reasoningSelect.id = 'ldm-gemini-thinking';
  for (const [value, title] of Object.entries(THINKING_LEVELS)) {
    const option = el('option', '', title);
    option.value = value;
    reasoningSelect.append(option);
  }
  reasoningSelect.value = DEFAULT_THINKING_LEVEL;
  reasoningRow.append(reasoningLabel, reasoningSelect);
  keyConnected.append(connectionTitle, reasoningRow);
  connection.append(keyStatus, keyForm, keyConnected);

  const diagnosticPanel = el('details', 'ldm-chat-diagnostics');
  diagnosticPanel.hidden = true;
  diagnosticPanel.append(el('summary', '', 'Diagnóstico del chat'));
  const diagnosticNote = el('p', 'ldm-chat-key-note', 'Este informe contiene etapas, tiempos y códigos; no incluye tu clave ni los mensajes. Se conserva solo en esta pestaña.');
  const diagnosticField = el('textarea', 'ldm-chat-diagnostic-report');
  diagnosticField.readOnly = true;
  diagnosticField.rows = 8;
  diagnosticField.setAttribute('aria-label', 'Informe de diagnóstico sin clave ni mensajes');
  const diagnosticActions = el('div', 'ldm-chat-key-actions');
  const copyDiagnostic = el('button', 'ldm-chat-key-action', 'Copiar diagnóstico');
  copyDiagnostic.type = 'button';
  const refreshDiagnostic = el('button', 'ldm-chat-key-action', 'Actualizar informe');
  refreshDiagnostic.type = 'button';
  const diagnosticStatus = el('p', 'ldm-chat-key-note');
  diagnosticStatus.setAttribute('role', 'status');
  diagnosticActions.append(changeKey, disconnectKey, checkConnection, copyDiagnostic, refreshDiagnostic);
  diagnosticPanel.append(diagnosticNote, diagnosticField, diagnosticActions, generationNote, testGeneration, diagnosticStatus, el('code', 'ldm-chat-diagnostic-build', CHAT_BUILD));
  function refreshReport() {
    try { diagnosticField.value = diagnostics.report(); }
    catch (error) {
      const trace = diagnostics.start('runtime');
      trace.stage('diagnostic_render');
      trace.fail('diagnostic_render', error);
      diagnosticStatus.textContent = 'No se pudo mostrar el informe. El fallo quedó registrado.';
    }
  }
  diagnosticPanel.addEventListener('toggle', refreshReport);
  refreshDiagnostic.addEventListener('click', refreshReport);
  copyDiagnostic.addEventListener('click', async () => {
    refreshReport();
    try {
      if (!globalThis.navigator?.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(diagnosticField.value);
      diagnosticStatus.textContent = 'Diagnóstico copiado. Puedes compartirlo para revisar el fallo.';
    } catch (error) {
      const trace = diagnostics.start('runtime');
      trace.stage('diagnostic_copy');
      trace.fail('diagnostic_copy', error);
      refreshReport();
      diagnosticField.focus();
      diagnosticField.select?.();
      diagnosticStatus.textContent = 'No se pudo copiar automáticamente. Selecciona el informe y cópialo manualmente.';
    }
  });

  const log = el('div', 'ldm-chat-log');
  log.setAttribute('role', 'log');
  log.setAttribute('aria-label', 'Mensajes de la conversación');
  log.setAttribute('aria-live', 'polite');
  log.setAttribute('aria-relevant', 'additions');
  log.tabIndex = 0;

  const status = el('p', 'ldm-chat-status');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.hidden = true;

  const form = el('form', 'ldm-chat-form');
  const fieldLabel = el('label', 'ldm-chat-sr-only', 'Tu pregunta sobre Luz de Mar');
  fieldLabel.htmlFor = 'ldm-chat-question';
  const field = el('textarea', 'ldm-chat-input');
  field.id = 'ldm-chat-question';
  field.name = 'question';
  field.rows = 2;
  field.maxLength = MAX_MESSAGE;
  field.placeholder = 'Pregunta sobre el yate…';
  const send = el('button', 'ldm-chat-send', '↑');
  send.type = 'submit';
  send.disabled = true;
  send.setAttribute('aria-label', 'Enviar pregunta');
  const inputRow = el('div', 'ldm-chat-input-row');
  inputRow.append(fieldLabel, field, send);
  const cancelRequest = el('button', 'ldm-chat-key-action ldm-chat-cancel', 'Cancelar consulta');
  cancelRequest.type = 'button';
  cancelRequest.hidden = true;
  cancelRequest.addEventListener('click', () => {
    cancelRequest.disabled = true;
    requestController?.abort('user');
  });
  form.append(inputRow, cancelRequest);
  panel.append(header, modeRow, connection, diagnosticPanel, log, status, form);
  root.append(panel, launcher);
  mountPoint.append(root);

  function scrollToLatest() { log.scrollTop = log.scrollHeight; }
  function remember(message) {
    history.push({ ...message, content: clipped(message.content) });
    if (history.length > MAX_HISTORY) history.splice(0, history.length - MAX_HISTORY);
  }

  function addMessage(role, text, sources = []) {
    const row = el('article', 'ldm-chat-message ldm-chat-message-' + role);
    const body = el('div', 'ldm-chat-message-text');
    if (role === 'assistant') renderAnswer(body, text);
    else body.textContent = clipped(text, MAX_MESSAGE);
    row.append(
      el('p', 'ldm-chat-message-label', role === 'user' ? 'Tú' : 'Luz de Mar'),
      body,
    );
    if (Array.isArray(sources) && sources.length) {
      const details = el('details', 'ldm-chat-sources');
      details.append(el('summary', '', 'Ver contexto utilizado'));
      const list = el('ul');
      for (const source of sources.slice(0, 8)) {
        const title = typeof source === 'string' ? source : source?.title || source?.label || 'Contexto del proyecto';
        const item = el('li');
        const href = sourceURL(source?.url);
        if (href) {
          const link = el('a', '', String(title).slice(0, 240));
          link.href = href;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          item.append(link);
        } else item.textContent = String(title).slice(0, 240);
        list.append(item);
      }
      details.append(list);
      row.append(details);
    }
    log.append(row);
    scrollToLatest();
    return row;
  }

  function setPending(value) {
    pending = value;
    clear.disabled = value;
    keyField.disabled = value;
    reasoningSelect.disabled = value;
    useKey.disabled = value || !keyField.value.trim();
    changeKey.disabled = disconnectKey.disabled = cancelKey.disabled = checkConnection.disabled = testGeneration.disabled = value;
    send.disabled = value || !field.value.trim();
    log.setAttribute('aria-busy', String(value));
    for (const button of log.querySelectorAll('button')) button.disabled = value;
    status.hidden = !value;
    status.textContent = value ? (geminiApiKey ? 'Consultando Gemini…' : 'Consultando el contexto del yate…') : '';
    cancelRequest.hidden = !value || !geminiApiKey;
    cancelRequest.disabled = !value;
    send.textContent = value ? '···' : '↑';
    send.setAttribute('aria-label', value ? 'Consulta en curso' : 'Enviar pregunta');
  }

  async function sendQuestion(rawQuestion, options = {}) {
    if (pending || disposed) return;
    const trace = diagnostics.start(geminiApiKey ? 'gemini' : endpoint ? 'server' : 'local');
    try { await sendQuestionInner(rawQuestion, options, trace); }
    catch (error) {
      trace.fail('chat_unexpected', error);
      try {
        requestController?.abort('external');
        if (!disposed) setPending(false);
        status.hidden = false;
        status.textContent = 'Ocurrió un error en el chat. Vuelve a intentarlo.';
      } catch (viewError) {
        trace.stage('ui_error');
        trace.fail('chat_unexpected', viewError);
      }
    } finally { refreshReport(); }
  }

  async function sendQuestionInner(rawQuestion, { retry = false } = {}, trace) {
    trace.stage('ui_prepare');
    const question = String(rawQuestion || '').trim().slice(0, MAX_MESSAGE);
    if (!question || pending || disposed) { trace.finish('skipped'); return; }
    if (geminiApiKey && question.includes(geminiApiKey)) {
      field.value = '';
      send.disabled = true;
      status.hidden = false;
      status.textContent = 'La pregunta contiene tu clave. Escríbela solo en el campo de conexión de Gemini.';
      trace.fail('chat_key_in_question');
      return;
    }
    clearTimeout(focusTimer);
    trace.stage('ui_context');
    const context = viewContext();
    const prior = history.map(message => ({ ...message }));
    trace.update({ historyMessages: prior.length });
    trace.stage('ui_message');
    if (!retry) {
      failed?.row.remove();
      failed = null;
      addMessage('user', question);
      remember({ role: 'user', content: question });
      field.value = '';
      field.style.height = '';
      if (document.activeElement === field || document.activeElement === send) log.focus({ preventScroll: true });
    }
    setPending(true);
    const requestVersion = connectionVersion;
    const controller = new AbortController();
    requestController = controller;
    let partial = null, accepted = false;
    const waiting = geminiApiKey ? setTimeout(() => {
      if (pending && requestVersion === connectionVersion && !partial) {
        status.textContent = accepted ? 'Google aceptó la consulta y sigue procesándola. Puedes esperar o cancelar.' : 'Esperando la respuesta de Google. Puedes esperar o cancelar la consulta.';
      }
    }, 15000) : null;
    try {
      trace.stage('ui_dispatch');
      const result = await answerQuestion(question, {
        history: boundedHistory(question, retry ? prior.slice(0, -1) : prior, context),
        viewContext: context,
        endpoint,
        geminiApiKey,
        equipmentFocus: Boolean(window.__app?.yachtWalk),
        thinkingLevel: reasoningSelect.value,
        signal: controller.signal,
        trace,
        onState(state) {
          if (disposed || controller.signal.aborted || requestVersion !== connectionVersion) return;
          if (state === 'accepted') {
            accepted = true;
            status.textContent = 'Google aceptó la consulta. Preparando la respuesta…';
          } else if (state === 'keepalive' && !accepted && !partial) {
            status.textContent = 'El flujo sigue abierto, pero todavía no llegan eventos de generación.';
          }
        },
        onText(text) {
          if (disposed || controller.signal.aborted || requestVersion !== connectionVersion) return;
          if (!partial) partial = addMessage('assistant', '');
          renderAnswer(partial.querySelector('.ldm-chat-message-text'), text);
          status.textContent = 'Recibiendo la respuesta de Gemini…';
          scrollToLatest();
        },
      });
      if (disposed || controller.signal.aborted || requestVersion !== connectionVersion) return;
      if (!result || typeof result.answer !== 'string' || !result.answer.trim()) {
        throw new Error('No se recibió una respuesta. Puedes volver a intentarlo.');
      }
      trace.stage('ui_complete');
      failed?.row.remove();
      failed = null;
      partial?.remove();
      const text = clipped(result.answer.trim(), MAX_ANSWER);
      addMessage('assistant', text, result.sources);
      remember({ role: 'assistant', content: text, ...(result.topic ? { topic: result.topic } : {}) });
      mode.textContent = result.mode === 'gemini' ? 'Gemini 4 Hydrogen' : result.mode === 'ai' ? 'IA conectada' : '';
      modeRow.hidden = !mode.textContent;
      mode.dataset.mode = ['gemini', 'ai'].includes(result.mode) ? 'ai' : 'local';
      if (result.mode === 'gemini') keyStatus.textContent = 'Gemini respondió · clave en esta pestaña';
      trace.finish();
      if (opened && result.damageTarget) {
        focusTimer = setTimeout(() => {
          if (!opened || disposed || requestVersion !== connectionVersion) return;
          if (!tour.start(result.damageTarget)) {
            status.hidden = false;
            status.textContent = 'No se encontró un recorrido transitable desde esta vista hasta la pieza.';
          }
        }, 900);
      }
    } catch (error) {
      if (disposed || requestVersion !== connectionVersion) return;
      trace.fail(error?.code || 'chat_unexpected', error);
      trace.stage('ui_error');
      if (error?.code !== 'gemini_cancelled' && (geminiApiKey || endpoint)) {
        mode.textContent = geminiApiKey ? 'Gemini · revisa la conexión' : 'Conexión pendiente';
        modeRow.hidden = false;
        mode.dataset.mode = 'error';
      }
      const row = el('div', 'ldm-chat-error');
      row.setAttribute('role', 'alert');
      const errorMessage = error instanceof Error ? error.message : 'No se pudo completar la consulta.';
      row.append(el('p', '', clipped(geminiApiKey ? errorMessage.split(geminiApiKey).join('[clave oculta]') : errorMessage)));
      const retryButton = el('button', 'ldm-chat-retry', 'Volver a intentar');
      retryButton.type = 'button';
      retryButton.addEventListener('click', () => sendQuestion(question, { retry: true }));
      row.append(retryButton);
      failed?.row.remove();
      failed = { question, row };
      log.append(row);
      scrollToLatest();
    } finally {
      trace.stage('ui_finally');
      clearTimeout(waiting);
      partial?.remove();
      if (requestController === controller) requestController = null;
      if (!disposed) setPending(false);
    }
  }

  function notifyVisibility() {
    window.dispatchEvent(new CustomEvent('luz-de-mar-chat:visibility', { detail: { open: opened } }));
  }
  function open() {
    if (disposed || opened) return;
    previousFocus = document.activeElement;
    opened = true;
    panel.hidden = false;
    root.classList.add('is-open');
    launcher.setAttribute('aria-expanded', 'true');
    launcher.setAttribute('aria-label', 'Minimizar chat de Luz de Mar');
    try { document.exitPointerLock?.(); } catch { /* Unsupported pointer lock does not block chat. */ }
    notifyVisibility();
    panel.focus({ preventScroll: true });
    scrollToLatest();
  }
  function close() {
    if (!opened) return;
    clearTimeout(focusTimer);
    opened = false;
    keyField.value = '';
    useKey.disabled = true;
    panel.hidden = true;
    root.classList.remove('is-open');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', 'Abrir chat de Luz de Mar');
    notifyVisibility();
    if (previousFocus?.isConnected && previousFocus !== document.body) previousFocus.focus({ preventScroll: true });
    else launcher.focus({ preventScroll: true });
  }

  function resetGemini(event) {
    cancelFocus();
    connectionVersion += 1;
    requestController?.abort(event?.type === 'pagehide' ? 'pagehide' : event === 'destroy' ? 'destroy' : 'disconnect');
    geminiApiKey = '';
    keyField.value = '';
    keyForm.hidden = false;
    keyConnected.hidden = true;
    testGeneration.hidden = generationNote.hidden = true;
    cancelKey.hidden = true;
    useKey.disabled = true;
    mode.textContent = endpoint ? 'Por consultar' : '';
    modeRow.hidden = !endpoint;
    mode.dataset.mode = 'local';
    keyStatus.textContent = '';
  }
  keyField.addEventListener('input', () => {
    useKey.disabled = pending || !keyField.value.trim();
  });
  keyForm.addEventListener('submit', event => {
    event.preventDefault();
    if (pending || disposed) return;
    const trace = diagnostics.start('configuration');
    trace.stage('validate_input');
    const candidate = keyField.value.trim();
    if (candidate.length < 8 || candidate.length > 512 || /[\s\u0000-\u001f\u007f]/.test(candidate)) {
      keyStatus.textContent = 'Revisa la clave: entre 8 y 512 caracteres, sin espacios ni saltos de línea.';
      trace.fail('gemini_key');
      refreshReport();
      return;
    }
    geminiApiKey = candidate;
    keyField.value = '';
    keyForm.hidden = true;
    keyConnected.hidden = false;
    testGeneration.hidden = generationNote.hidden = false;
    cancelKey.hidden = false;
    useKey.disabled = true;
    keyStatus.textContent = 'Clave cargada en esta pestaña · pendiente de consultar';
    mode.textContent = 'Gemini configurado';
    modeRow.hidden = false;
    mode.dataset.mode = 'configured';
    field.focus({ preventScroll: true });
    trace.finish();
    refreshReport();
  });
  changeKey.addEventListener('click', () => {
    if (pending) return;
    keyField.value = '';
    keyForm.hidden = false;
    keyConnected.hidden = true;
    testGeneration.hidden = generationNote.hidden = true;
    useKey.disabled = true;
    cancelKey.hidden = !geminiApiKey;
    keyField.focus({ preventScroll: true });
  });
  cancelKey.addEventListener('click', () => {
    if (pending) return;
    keyField.value = '';
    keyForm.hidden = true;
    keyConnected.hidden = false;
    testGeneration.hidden = generationNote.hidden = false;
    field.focus({ preventScroll: true });
  });
  disconnectKey.addEventListener('click', () => {
    if (!pending) resetGemini();
  });
  checkConnection.addEventListener('click', async () => {
    if (pending || disposed || !geminiApiKey) return;
    const version = connectionVersion;
    const controller = new AbortController();
    requestController = controller;
    let notice = '';
    setPending(true);
    status.textContent = 'Comprobando acceso a Google y datos del modelo, sin iniciar una generación…';
    try {
      const results = await checkGeminiConnection({ apiKey: geminiApiKey, signal: controller.signal });
      if (disposed || version !== connectionVersion) return;
      const publicResult = results.find(result => result.kind === 'public');
      const modelResult = results.find(result => result.kind === 'model');
      const label = result => result.httpStatus !== null ? 'HTTP ' + result.httpStatus
        : result.code === 'gemini_cancelled' ? 'cancelada' : result.code === 'gemini_timeout' ? 'sin respuesta dentro del plazo' : 'sin respuesta HTTP';
      notice = 'Acceso público: ' + label(publicResult) + '. Datos del modelo: ' + label(modelResult) + '. ';
      if (controller.signal.aborted) notice = 'Comprobación cancelada.';
      else if (modelResult.ok) {
        notice += 'Google respondió a la consulta del modelo. Prueba ahora una pregunta.';
        keyStatus.textContent = 'Datos del modelo recibidos · generación pendiente de comprobar';
      } else {
        notice += modelResult.message + ' Copia el diagnóstico para revisar el resultado.';
        keyStatus.textContent = 'La comprobación encontró un problema · abre el diagnóstico';
      }
    } catch (error) {
      const trace = diagnostics.start('runtime');
      trace.stage('ui_error');
      trace.fail('chat_unexpected', error);
      notice = 'No se pudo mostrar la comprobación. Abre el diagnóstico del chat.';
    } finally {
      if (requestController === controller) requestController = null;
      if (!disposed) {
        setPending(false);
        if (notice && version === connectionVersion) { status.hidden = false; status.textContent = notice; }
      }
      refreshReport();
    }
  });
  testGeneration.addEventListener('click', async () => {
    if (pending || disposed || !geminiApiKey) return;
    const version = connectionVersion;
    const controller = new AbortController();
    let notice = '', accepted = false;
    requestController = controller;
    try {
      setPending(true);
      status.textContent = 'Probando una respuesta breve sin contexto del yate…';
      await testGeminiGeneration({
        apiKey: geminiApiKey, thinkingLevel: reasoningSelect.value, signal: controller.signal,
        onState(state) {
          if (disposed || controller.signal.aborted || version !== connectionVersion) return;
          if (state === 'accepted') {
            accepted = true;
            status.textContent = 'Google aceptó la prueba breve. Esperando su respuesta…';
          } else if (state === 'keepalive' && !accepted) {
            status.textContent = 'El flujo sigue abierto, pero todavía no llegan eventos de generación.';
          }
        },
      });
      if (!disposed && version === connectionVersion) {
        notice = 'Google completó la respuesta breve. Una pregunta comprobará ahora la conversación con el contexto del yate.';
        keyStatus.textContent = 'Google generó texto en la prueba breve';
      }
    } catch (error) {
      if (!disposed && version === connectionVersion) {
        notice = typeof error?.code === 'string' && error.code.startsWith('gemini_') && error instanceof Error
          ? error.message : 'No se pudo completar la prueba breve. Abre el diagnóstico del chat.';
        keyStatus.textContent = error?.code === 'gemini_cancelled' ? 'Prueba breve cancelada · clave en esta pestaña' : 'La prueba breve falló · abre el diagnóstico';
      }
    } finally {
      if (requestController === controller) requestController = null;
      if (!disposed) {
        setPending(false);
        if (notice && version === connectionVersion) { status.hidden = false; status.textContent = notice; }
      }
      refreshReport();
    }
  });
  window.addEventListener('pagehide', resetGemini);

  launcher.addEventListener('click', () => opened ? close() : open());
  minimize.addEventListener('click', close);
  clear.addEventListener('click', () => {
    if (pending) return;
    cancelFocus();
    history.length = 0;
    failed = null;
    log.replaceChildren();
    field.value = '';
    field.style.height = '';
    send.disabled = true;
    field.focus({ preventScroll: true });
  });
  field.addEventListener('input', () => {
    send.disabled = pending || !field.value.trim();
    field.style.height = 'auto';
    field.style.height = Math.min(field.scrollHeight, 108) + 'px';
  });
  field.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing && event.keyCode !== 229) {
      event.preventDefault();
      if (!pending) sendQuestion(field.value);
    }
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    sendQuestion(field.value);
  });
  root.addEventListener('focusin', event => {
    if (event.target.isContentEditable || event.target.closest('textarea,input,select')) {
      // A walk key may still be held when the user starts editing.
      const input = window.__app?.input;
      input?.keys?.clear();
      input?.pressed?.clear();
    }
  });
  function focusScene(event) {
    if (opened && event.target === window.__app?.engine?.domElement && document.activeElement?.closest('#' + ROOT_ID)) {
      document.activeElement.blur();
    }
  }
  document.addEventListener('pointerdown', focusScene, true);
  root.addEventListener('keydown', event => {
    if (canWalkFromChat(event)) return;
    if (event.key === 'Escape' && opened) {
      event.preventDefault();
      close();
    }
    event.stopPropagation();
  });
  root.addEventListener('keyup', event => {
    if (!canWalkFromChat(event) && !window.__app?.input?.keys?.has(event.code)) event.stopPropagation();
  });
  for (const name of ['keypress', 'pointerdown', 'pointerup', 'pointermove', 'mousedown', 'mouseup', 'mousemove', 'click', 'dblclick', 'contextmenu', 'touchstart', 'touchmove', 'touchend', 'wheel']) {
    root.addEventListener(name, event => event.stopPropagation(), { passive: name === 'wheel' || name.startsWith('touch') });
  }

  const api = {
    root, open, close, sendQuestion,
    destroy() {
      if (opened) close();
      resetGemini('destroy');
      window.removeEventListener('pagehide', resetGemini);
      document.removeEventListener('pointerdown', focusScene, true);
      disposed = true;
      root.remove();
    },
  };
  root.__ldmChat = api;
  return api;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => mountYachtChat(), { once: true });
  } else mountYachtChat();
}

