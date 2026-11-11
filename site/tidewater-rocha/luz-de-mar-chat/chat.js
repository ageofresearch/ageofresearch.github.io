import { answerQuestion } from './assistant.js';

const ROOT_ID = 'ldm-chat-widget';
const MAX_MESSAGE = 2000;
const MAX_ANSWER = 12000;
const MAX_HISTORY = 8;
const ALLOWED_HOSTS = new Set([
  'azimutyachts.com', 'www.azimutyachts.com',
  'mtu-solutions.com', 'www.mtu-solutions.com', 'nmea.org', 'www.nmea.org',
  'imo.org', 'www.imo.org', 'ageofresearch.github.io',
]);
const QUESTIONS = ['¿Qué falta para salir?', '¿Cómo ahorrar?', '¿Qué sabemos del yate?'];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
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
  link.href = new URL('./chat.css', import.meta.url).href;
  link.dataset.ldmChatStyle = '';
  document.head.append(link);
}

/** Read-only conversation widget. It never changes equipment or approves a voyage. */
export function mountYachtChat({ endpoint = configuredEndpoint(), mountPoint = document.body } = {}) {
  const existing = document.getElementById(ROOT_ID);
  if (existing) return existing.__ldmChat;
  installStyles();

  const history = [];
  let pending = false, opened = false, disposed = false;
  let previousFocus = null, failed = null;
  const root = el('section', 'ldm-chat');
  root.id = ROOT_ID;
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
  panel.setAttribute('aria-describedby', 'ldm-chat-scope');

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

  const context = el('div', 'ldm-chat-context');
  const mode = el('span', 'ldm-chat-mode', endpoint ? 'Por consultar' : 'Orientación local');
  mode.dataset.mode = 'local';
  context.append(mode, el('span', 'ldm-chat-context-label', 'Documentación del yate · Sin datos en tiempo real'));

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
  field.setAttribute('aria-describedby', 'ldm-chat-input-help ldm-chat-scope');
  const send = el('button', 'ldm-chat-send', '↑');
  send.type = 'submit';
  send.disabled = true;
  send.setAttribute('aria-label', 'Enviar pregunta');
  const inputRow = el('div', 'ldm-chat-input-row');
  inputRow.append(fieldLabel, field, send);
  const help = el('p', 'ldm-chat-input-help', 'Enter para enviar · Mayús + Enter para otra línea');
  help.id = 'ldm-chat-input-help';
  const scope = el('p', 'ldm-chat-scope', 'Modelo y orientación local, sin telemetría. La salida la autoriza el capitán.');
  scope.id = 'ldm-chat-scope';
  form.append(inputRow, help, scope);
  panel.append(header, context, log, status, form);
  root.append(panel, launcher);
  mountPoint.append(root);

  function scrollToLatest() { log.scrollTop = log.scrollHeight; }
  function remember(message) {
    history.push({ ...message, content: clipped(message.content) });
    if (history.length > MAX_HISTORY) history.splice(0, history.length - MAX_HISTORY);
  }

  function addMessage(role, text, sources = []) {
    const row = el('article', 'ldm-chat-message ldm-chat-message-' + role);
    row.append(
      el('p', 'ldm-chat-message-label', role === 'user' ? 'Tú' : 'Luz de Mar'),
      el('div', 'ldm-chat-message-text', clipped(text, role === 'assistant' ? MAX_ANSWER : MAX_MESSAGE)),
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

  function welcome() {
    const row = addMessage('assistant', 'Conoce tu yate, entiende los pendientes y prepara mejores decisiones. ¿Qué quieres consultar sobre Luz de Mar?');
    const suggestions = el('div', 'ldm-chat-suggestions');
    suggestions.setAttribute('aria-label', 'Preguntas sugeridas');
    for (const question of QUESTIONS) {
      const button = el('button', 'ldm-chat-suggestion', question);
      button.type = 'button';
      button.addEventListener('click', () => sendQuestion(question));
      suggestions.append(button);
    }
    row.append(suggestions);
  }

  function setPending(value) {
    pending = value;
    clear.disabled = value;
    send.disabled = value || !field.value.trim();
    log.setAttribute('aria-busy', String(value));
    for (const button of log.querySelectorAll('button')) button.disabled = value;
    status.hidden = !value;
    status.textContent = value ? 'Consultando el contexto del yate…' : '';
    send.textContent = value ? '···' : '↑';
    send.setAttribute('aria-label', value ? 'Consulta en curso' : 'Enviar pregunta');
  }

  async function sendQuestion(rawQuestion, { retry = false } = {}) {
    const question = String(rawQuestion || '').trim().slice(0, MAX_MESSAGE);
    if (!question || pending || disposed) return;
    const context = viewContext();
    const prior = history.map(message => ({ ...message }));
    if (!retry) {
      failed?.row.remove();
      failed = null;
      addMessage('user', question);
      remember({ role: 'user', content: question });
      field.value = '';
      field.style.height = '';
    }
    setPending(true);
    try {
      const result = await answerQuestion(question, {
        history: boundedHistory(question, retry ? prior.slice(0, -1) : prior, context),
        viewContext: context,
        endpoint,
      });
      if (disposed) return;
      if (!result || typeof result.answer !== 'string' || !result.answer.trim()) {
        throw new Error('No se recibió una respuesta. Puedes volver a intentarlo.');
      }
      failed?.row.remove();
      failed = null;
      const text = clipped(result.answer.trim(), MAX_ANSWER);
      addMessage('assistant', text, result.sources);
      remember({ role: 'assistant', content: text, ...(result.topic ? { topic: result.topic } : {}) });
      mode.textContent = result.mode === 'ai' ? 'IA conectada' : 'Orientación local';
      mode.dataset.mode = result.mode === 'ai' ? 'ai' : 'local';
    } catch (error) {
      if (disposed) return;
      if (endpoint) {
        mode.textContent = 'Conexión pendiente';
        mode.dataset.mode = 'error';
      }
      const row = el('div', 'ldm-chat-error');
      row.setAttribute('role', 'alert');
      row.append(el('p', '', clipped(error instanceof Error ? error.message : 'No se pudo completar la consulta.')));
      const retryButton = el('button', 'ldm-chat-retry', 'Volver a intentar');
      retryButton.type = 'button';
      retryButton.addEventListener('click', () => sendQuestion(question, { retry: true }));
      row.append(retryButton);
      failed?.row.remove();
      failed = { question, row };
      log.append(row);
      scrollToLatest();
    } finally {
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
    field.focus({ preventScroll: true });
    scrollToLatest();
  }
  function close() {
    if (!opened) return;
    opened = false;
    panel.hidden = true;
    root.classList.remove('is-open');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', 'Abrir chat de Luz de Mar');
    notifyVisibility();
    if (previousFocus?.isConnected && previousFocus !== document.body) previousFocus.focus({ preventScroll: true });
    else launcher.focus({ preventScroll: true });
  }

  launcher.addEventListener('click', () => opened ? close() : open());
  minimize.addEventListener('click', close);
  clear.addEventListener('click', () => {
    if (pending) return;
    history.length = 0;
    failed = null;
    log.replaceChildren();
    field.value = '';
    field.style.height = '';
    send.disabled = true;
    welcome();
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
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape' && opened) {
      event.preventDefault();
      close();
    }
    event.stopPropagation();
  });
  for (const name of ['keyup', 'keypress', 'pointerdown', 'pointerup', 'pointermove', 'mousedown', 'mouseup', 'mousemove', 'click', 'dblclick', 'contextmenu', 'touchstart', 'touchmove', 'touchend', 'wheel']) {
    root.addEventListener(name, event => event.stopPropagation(), { passive: name === 'wheel' || name.startsWith('touch') });
  }

  welcome();
  const api = {
    root, open, close, sendQuestion,
    destroy() {
      if (opened) close();
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

