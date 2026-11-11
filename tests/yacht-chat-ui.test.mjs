import test from 'node:test';
import assert from 'node:assert/strict';
import { diagnostics, CHAT_BUILD } from '../site/tidewater-rocha/luz-de-mar-chat/diagnostics.js';

// Deliberately small DOM contract simulation. These tests import the real chat,
// assistant and Gemini client; they do not claim browser or visual validation.
const FAKE_KEY = 'AIza_TEST_ONLY_DO_NOT_USE_012345678901234';
const NEXT_FAKE_KEY = 'AIza_TEST_ONLY_REPLACEMENT_012345678901234';
const MODEL = 'gemini-3.8-flash';
let moduleSequence = 0;

class UIEvent {
  constructor(type, options = {}) {
    Object.assign(this, { type, bubbles: true, cancelable: true, defaultPrevented: false }, options);
  }
  preventDefault() { if (this.cancelable) this.defaultPrevented = true; }
  stopPropagation() { this.stopped = true; }
  stopImmediatePropagation() { this.immediate = this.stopped = true; }
}

class Target {
  constructor() { this.listeners = new Map(); }
  addEventListener(type, callback, options = {}) {
    const values = this.listeners.get(type) || [];
    values.push({ callback, capture: options === true || Boolean(options.capture), once: Boolean(options.once) });
    this.listeners.set(type, values);
  }
  removeEventListener(type, callback) {
    this.listeners.set(type, (this.listeners.get(type) || []).filter(item => item.callback !== callback));
  }
  dispatchEvent(event) {
    event.target ||= this;
    const path = [this];
    for (let node = this.parentNode; node; node = node.parentNode) path.push(node);
    const invoke = (node, capture) => {
      event.currentTarget = node;
      for (const item of [...(node.listeners.get(event.type) || [])]) {
        if (item.capture !== capture) continue;
        item.callback.call(node, event);
        if (item.once) node.removeEventListener(event.type, item.callback);
        if (event.immediate) break;
      }
    };
    for (const node of [...path].reverse()) {
      invoke(node, true);
      if (event.stopped) return !event.defaultPrevented;
    }
    for (const node of path) {
      invoke(node, false);
      if (event.stopped || !event.bubbles) break;
    }
    return !event.defaultPrevented;
  }
}

function descendants(node) { return node.children.flatMap(child => [child, ...descendants(child)]); }
function dataName(name) { return name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()); }

class Element extends Target {
  constructor(tag, document) {
    super();
    this.ownerDocument = document;
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.dataset = {};
    this.style = {};
    this.attributes = new Map();
    this.className = this.id = this.value = this._text = '';
    this.hidden = this.disabled = false;
    this.scrollHeight = 80;
    this.classList = {
      add: (...names) => this._classes([...new Set([...this.className.split(/\s+/).filter(Boolean), ...names])]),
      remove: (...names) => this._classes(this.className.split(/\s+/).filter(name => !names.includes(name))),
      contains: name => this.className.split(/\s+/).includes(name),
      toggle: (name, force) => {
        const enabled = force === undefined ? !this.classList.contains(name) : Boolean(force);
        this.classList[enabled ? 'add' : 'remove'](name);
        return enabled;
      },
    };
  }
  _classes(names) { this.className = names.join(' '); }
  set textContent(value) { this._text = String(value); this.replaceChildren(); }
  get textContent() { return this._text + this.children.map(child => child.textContent).join(''); }
  get innerText() { return this.textContent; }
  get isConnected() {
    for (let node = this; node; node = node.parentNode) if (node === this.ownerDocument) return true;
    return false;
  }
  setAttribute(name, value) {
    this.attributes.set(name, String(value));
    if (name === 'id') this.id = String(value);
    if (name === 'class') this.className = String(value);
    if (name === 'hidden') this.hidden = true;
    if (name === 'disabled') this.disabled = true;
    if (name.startsWith('data-')) this.dataset[dataName(name.slice(5))] = String(value);
  }
  getAttribute(name) {
    if (name === 'id') return this.id || null;
    if (name === 'class') return this.className || null;
    if (name.startsWith('data-')) return this.dataset[dataName(name.slice(5))] ?? null;
    return this.attributes.get(name) ?? null;
  }
  hasAttribute(name) { return this.getAttribute(name) !== null; }
  removeAttribute(name) {
    this.attributes.delete(name);
    if (name === 'hidden') this.hidden = false;
    if (name === 'disabled') this.disabled = false;
  }
  append(...children) {
    for (const child of children) {
      child.remove?.();
      this.children.push(child);
      child.parentNode = this;
    }
  }
  appendChild(child) { this.append(child); return child; }
  replaceChildren(...children) {
    for (const child of this.children) child.parentNode = null;
    this.children = [];
    this.append(...children);
  }
  remove() {
    if (this.parentNode) this.parentNode.children = this.parentNode.children.filter(child => child !== this);
    this.parentNode = null;
  }
  matches(selector) {
    if (selector.includes(',')) return selector.split(',').some(part => this.matches(part.trim()));
    if (selector.startsWith('#')) return this.id === selector.slice(1);
    if (selector.startsWith('.')) return this.classList.contains(selector.slice(1));
    const match = selector.match(/^([\w-]+)?(?:\[([^=\]]+)(?:=["']?([^"'\]]*)["']?)?\])?$/);
    if (!match) throw new Error('Extend the DOM test selector adapter for: ' + selector);
    if (match[1] && this.tagName !== match[1].toUpperCase()) return false;
    if (!match[2]) return true;
    const value = this.getAttribute(match[2]);
    return match[3] === undefined ? value !== null : value === match[3];
  }
  querySelectorAll(selector) { return descendants(this).filter(child => child.matches(selector)); }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  closest(selector) {
    for (let node = this; node instanceof Element; node = node.parentNode) if (node.matches(selector)) return node;
    return null;
  }
  focus() { this.ownerDocument.activeElement = this; }
  getClientRects() { return visible(this) ? [{}] : []; }
  scrollIntoView() {}
}

class Document extends Target {
  constructor(window) {
    super();
    this.parentNode = window;
    this.readyState = 'loading'; // Avoid implicit mounting until the test explicitly calls the exported API.
    this.head = new Element('head', this);
    this.body = new Element('body', this);
    this.children = [this.head, this.body];
    this.head.parentNode = this.body.parentNode = this;
    this.activeElement = this.body;
  }
  createElement(tag) { return new Element(tag, this); }
  getElementById(id) { return descendants(this).find(node => node.id === id) || null; }
  querySelectorAll(selector) { return descendants(this).filter(node => node.matches(selector)); }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  exitPointerLock() {}
}

function visible(node) {
  for (let current = node; current; current = current.parentNode) if (current.hidden) return false;
  return true;
}

function button(ui, text, { visibleOnly = true } = {}) {
  const result = ui.document.querySelectorAll('button').find(node =>
    (node.textContent === text || node.getAttribute('aria-label') === text) && (!visibleOnly || visible(node)));
  assert.ok(result, 'Button exists: ' + text);
  return result;
}

function labelled(ui, labelText) {
  const label = ui.document.querySelectorAll('label').find(node => node.textContent === labelText);
  assert.ok(label, 'Label exists: ' + labelText);
  const field = ui.document.getElementById(label.htmlFor || label.getAttribute('for'));
  assert.ok(field, 'Label names a control: ' + labelText);
  return field;
}

function click(node) {
  if (node.disabled) return;
  const event = new UIEvent('click');
  node.dispatchEvent(event);
  if (!event.defaultPrevented && node.tagName === 'BUTTON' && node.type === 'submit') {
    node.closest('form')?.dispatchEvent(new UIEvent('submit'));
  }
}

function type(field, value) {
  field.value = value;
  field.dispatchEvent(new UIEvent('input'));
}

function assertNoDOMSecret(ui, ...secrets) {
  for (const node of descendants(ui.document)) {
    const strings = Object.entries(node).filter(([, value]) => typeof value === 'string').map(([, value]) => value);
    const material = JSON.stringify([strings, [...node.attributes], node.dataset]);
    for (const secret of secrets) assert.equal(material.includes(secret), false, 'Secret absent from DOM including hidden fields and attributes');
  }
}

const success = () => new Response('data: ' + JSON.stringify({ candidates: [{
  content: { role: 'model', parts: [{ text: 'Respuesta de Gemini de prueba.' }] }, finishReason: 'STOP',
}] }) + '\n\n', { status: 200, headers: { 'content-type': 'text/event-stream' } });

async function settle(check = () => true) {
  for (let i = 0; i < 40; i++) {
    await new Promise(resolve => setImmediate(resolve));
    if (check()) return;
  }
  assert.fail('The expected asynchronous UI state did not settle');
}

async function withUI(run, { endpoint } = {}) {
  diagnostics.clear();
  const previous = new Map();
  const window = new Target();
  const document = new Document(window);
  const storageCalls = [];
  const calls = [];
  const storage = Object.fromEntries(['getItem', 'setItem', 'removeItem', 'clear'].map(name => [name, (...args) => {
    storageCalls.push({ name, args });
    throw new Error('Storage is forbidden in the API-key UI test');
  }]));
  const copiedReports = [];
  const navigator = { onLine: true, clipboard: { writeText: async text => { copiedReports.push(text); } } };
  const ui = { window, document, calls, storageCalls, copiedReports, navigator, respond: success };
  const location = new URL('https://ageofresearch.github.io/tidewater-rocha/play.html?world=rocha');
  Object.assign(window, { document, location, localStorage: storage, sessionStorage: storage });
  const globals = {
    window, document, location, localStorage: storage, sessionStorage: storage, navigator,
    CustomEvent: class extends UIEvent { constructor(type, options = {}) { super(type, options); } },
    fetch: async (url, options) => {
      const call = { url: String(url), options };
      calls.push(call);
      return ui.respond(call);
    },
  };
  for (const [name, value] of Object.entries(globals)) {
    previous.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
    Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
  }
  try {
    const module = await import('../site/tidewater-rocha/luz-de-mar-chat/chat.js?ui-test=' + ++moduleSequence);
    ui.api = module.mountYachtChat({ endpoint });
    ui.api.open();
    await run(ui);
  } finally {
    ui.api?.destroy();
    for (const [name, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
  }
}

function configure(ui, key = FAKE_KEY) {
  const field = labelled(ui, 'Clave API de Gemini');
  assert.equal(field.tagName, 'TEXTAREA');
  assert.equal(visible(field), true);
  type(field, key);
  click(button(ui, 'Usar Gemini'));
  assert.equal(field.value, '', 'The key textarea is emptied immediately after configuration');
  assert.equal(visible(field), false, 'The key editor closes after configuration');
  return field;
}

test('configuring Gemini clears the editor, makes no request, and stores no key in the DOM or storage', async () => {
  await withUI(async ui => {
    configure(ui);
    assert.ok(ui.document.body.textContent.includes(MODEL));
    button(ui, 'Cambiar clave');
    button(ui, 'Desconectar Gemini');
    assert.equal(ui.calls.length, 0);
    assert.equal(ui.storageCalls.length, 0);
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});

test('sending uses the exact Gemini model and header, without putting the key in URLs, contents, history, or endpoint requests', async () => {
  await withUI(async ui => {
    configure(ui);
    await ui.api.sendQuestion('Primera pregunta sobre mantenimiento');
    await ui.api.sendQuestion('¿Y qué datos faltan?');
    assert.equal(ui.calls.length, 2);
    for (const { url, options } of ui.calls) {
      const address = new URL(url);
      assert.equal(address.hostname, 'generativelanguage.googleapis.com');
      assert.equal(address.pathname.endsWith('/models/' + MODEL + ':streamGenerateContent'), true);
      assert.equal(address.searchParams.get('alt'), 'sse');
      assert.equal(address.search.includes(FAKE_KEY), false);
      assert.equal(address.searchParams.has('key'), false);
      assert.equal(new Headers(options.headers).get('x-goog-api-key'), FAKE_KEY);
      assert.equal(options.credentials, 'omit');
      assert.equal(String(options.body).includes(FAKE_KEY), false);
    }
    const payload = JSON.parse(ui.calls[1].options.body);
    assert.ok(JSON.stringify(payload.contents).includes('Primera pregunta sobre mantenimiento'));
    assertNoDOMSecret(ui, FAKE_KEY);
    assert.equal(ui.storageCalls.length, 0);
  }, { endpoint: 'https://example.invalid/must-not-receive-the-key' });
});

test('changing or cancelling a key makes no request, and replacing it affects only the next question', async () => {
  await withUI(async ui => {
    configure(ui);
    click(button(ui, 'Cambiar clave'));
    assert.equal(labelled(ui, 'Clave API de Gemini').value, '');
    click(button(ui, 'Cancelar cambio'));
    assert.equal(ui.calls.length, 0);
    await ui.api.sendQuestion('Pregunta con la clave inicial');
    assert.equal(new Headers(ui.calls[0].options.headers).get('x-goog-api-key'), FAKE_KEY);
    click(button(ui, 'Cambiar clave'));
    configure(ui, NEXT_FAKE_KEY);
    assert.equal(ui.calls.length, 1);
    await ui.api.sendQuestion('Pregunta con la clave nueva');
    assert.equal(new Headers(ui.calls[1].options.headers).get('x-goog-api-key'), NEXT_FAKE_KEY);
    assertNoDOMSecret(ui, FAKE_KEY, NEXT_FAKE_KEY);
  });
});

test('disconnecting removes Gemini credentials and returns the next question to local orientation', async () => {
  await withUI(async ui => {
    configure(ui);
    await ui.api.sendQuestion('Pregunta con Gemini');
    click(button(ui, 'Desconectar Gemini'));
    assert.equal(labelled(ui, 'Clave API de Gemini').value, '');
    await ui.api.sendQuestion('¿Qué es un PMS?');
    assert.equal(ui.calls.length, 1, 'A local follow-up sends no Gemini request');
    assert.match(ui.document.body.textContent, /Orientación local/);
    assertNoDOMSecret(ui, FAKE_KEY);
    assert.equal(ui.storageCalls.length, 0);
  });
});

test('Gemini configuration controls stay disabled during a request and become available when it settles', async () => {
  await withUI(async ui => {
    configure(ui);
    let resolve;
    ui.respond = () => new Promise(done => { resolve = done; });
    const request = ui.api.sendQuestion('Consulta pendiente');
    await settle(() => ui.calls.length === 1);
    assert.equal(button(ui, 'Cambiar clave').disabled, true);
    assert.equal(button(ui, 'Desconectar Gemini').disabled, true);
    click(button(ui, 'Desconectar Gemini'));
    assert.equal(ui.calls.length, 1);
    resolve(success());
    await request;
    assert.equal(button(ui, 'Cambiar clave').disabled, false);
    assert.equal(button(ui, 'Desconectar Gemini').disabled, false);
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});

test('Enter respects composition and multiline input, isolates keyboard events, and never exposes an API error body', async () => {
  await withUI(async ui => {
    configure(ui);
    ui.respond = () => new Response(JSON.stringify({ error: { message: 'Private server detail ' + FAKE_KEY } }), {
      status: 404, headers: { 'content-type': 'application/json' },
    });
    let leakedKeys = 0;
    ui.window.addEventListener('keydown', () => leakedKeys++);
    const field = labelled(ui, 'Tu pregunta sobre Luz de Mar');
    type(field, '¿Qué falta para salir?');
    field.dispatchEvent(new UIEvent('keydown', { key: 'Enter', isComposing: true }));
    field.dispatchEvent(new UIEvent('keydown', { key: 'Enter', shiftKey: true }));
    assert.equal(ui.calls.length, 0);
    const event = new UIEvent('keydown', { key: 'Enter', shiftKey: false, isComposing: false });
    field.dispatchEvent(event);
    assert.equal(event.defaultPrevented, true);
    await settle(() => ui.calls.length === 1 && ui.document.querySelector('[role="log"]').getAttribute('aria-busy') === 'false');
    assert.equal(leakedKeys, 0, 'Typing never reaches the 3D window keyboard handlers');
    assert.equal(ui.document.body.textContent.includes('Private server detail'), false);
    assertNoDOMSecret(ui, FAKE_KEY);
    button(ui, 'Volver a intentar');
    assert.ok(ui.document.body.textContent.includes(MODEL));
    assert.equal(ui.calls.length, 1, 'A model error is not retried automatically or replaced with another model');
  });
});

test('a new conversation keeps the session key but clears prior messages from the next Gemini request', async () => {
  await withUI(async ui => {
    configure(ui);
    await ui.api.sendQuestion('MARCADOR HISTORIAL ANTERIOR');
    click(button(ui, 'Limpiar la conversación'));
    assert.equal(ui.calls.length, 1);
    await ui.api.sendQuestion('Nueva conversación de mantenimiento');
    assert.equal(new Headers(ui.calls[1].options.headers).get('x-goog-api-key'), FAKE_KEY);
    assert.equal(String(ui.calls[1].options.body).includes('MARCADOR HISTORIAL ANTERIOR'), false);
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});

test('pagehide forgets the session key and destroying an open widget releases visibility without new requests', async () => {
  await withUI(async ui => {
    configure(ui);
    const visibility = [];
    ui.window.addEventListener('luz-de-mar-chat:visibility', event => visibility.push(event.detail.open));
    ui.window.dispatchEvent(new UIEvent('pagehide', { bubbles: false }));
    await ui.api.sendQuestion('¿Qué es un PMS?');
    assert.equal(ui.calls.length, 0, 'The key is no longer used after pagehide');
    assertNoDOMSecret(ui, FAKE_KEY);
    ui.api.destroy();
    assert.equal(visibility.at(-1), false);
    assert.equal(ui.document.getElementById('ldm-chat-widget'), null);
    await ui.api.sendQuestion('No se envía tras destruir');
    assert.equal(ui.calls.length, 0);
  });
});

test('a pending Gemini reply cannot restore a connection cleared by pagehide', async () => {
  await withUI(async ui => {
    configure(ui);
    let resolve;
    ui.respond = () => new Promise(done => { resolve = done; });
    const request = ui.api.sendQuestion('Consulta antes de abandonar la página');
    await settle(() => ui.calls.length === 1);
    ui.window.dispatchEvent(new UIEvent('pagehide', { bubbles: false }));
    resolve(success());
    await request;
    assert.equal(ui.document.body.textContent.includes('Respuesta de Gemini de prueba.'), false);
    assert.equal(ui.document.body.textContent.includes('Gemini respondió'), false);
    assert.match(ui.document.body.textContent, /Sin clave · orientación local/);
    await ui.api.sendQuestion('¿Qué es un PMS?');
    assert.equal(ui.calls.length, 1);
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});

test('a slow streamed answer shows progress, can be cancelled, and never stores unfinished text in history', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  await withUI(async ui => {
    configure(ui);
    let feed, cancelled = false;
    const stream = new ReadableStream({ start(controller) { feed = controller; }, cancel() { cancelled = true; } });
    ui.respond = () => new Response(stream);
    const request = ui.api.sendQuestion('Consulta lenta de mantenimiento');
    t.mock.timers.tick(15001);
    assert.match(ui.document.body.textContent, /Esperando la respuesta de Google/);
    const partial = { candidates: [{ content: { parts: [{ text: 'BORRADOR INCOMPLETO' }] } }] };
    feed.enqueue(new TextEncoder().encode('data: ' + JSON.stringify(partial) + '\n\n'));
    await settle(() => ui.document.body.textContent.includes('BORRADOR INCOMPLETO'));
    assert.match(ui.document.body.textContent, /Recibiendo la respuesta/);
    click(button(ui, 'Cancelar consulta'));
    await request;
    assert.equal(cancelled, true);
    assert.equal(ui.document.body.textContent.includes('BORRADOR INCOMPLETO'), false);
    assert.match(ui.document.body.textContent, /Consulta cancelada/);
    ui.respond = success;
    await ui.api.sendQuestion('Una consulta nueva');
    assert.equal(ui.calls.length, 2);
    assert.equal(String(ui.calls[1].options.body).includes('BORRADOR INCOMPLETO'), false);
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});

test('a streamed answer is displayed progressively and committed to history only once it is complete', async () => {
  await withUI(async ui => {
    configure(ui);
    let feed;
    ui.respond = () => new Response(new ReadableStream({ start(controller) { feed = controller; } }));
    const encode = payload => new TextEncoder().encode('data: ' + JSON.stringify(payload) + '\n\n');
    const request = ui.api.sendQuestion('Consulta en partes');
    feed.enqueue(encode({ candidates: [{ content: { parts: [{ text: 'Respuesta progresiva ' }] } }] }));
    await settle(() => ui.document.body.textContent.includes('Respuesta progresiva '));
    feed.enqueue(encode({ candidates: [{ content: { parts: [{ text: 'completa.' }] }, finishReason: 'STOP' }] }));
    await request;
    assert.equal(ui.document.body.textContent.split('Respuesta progresiva completa.').length - 1, 1);
    assert.equal(visible(button(ui, 'Cancelar consulta', { visibleOnly: false })), false);
    ui.respond = success;
    await ui.api.sendQuestion('Seguimiento');
    const history = JSON.parse(ui.calls[1].options.body).contents;
    assert.equal(history.filter(message => message.role === 'model' && message.parts[0].text === 'Respuesta progresiva completa.').length, 1);
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});

test('an error exposes a copyable safe diagnostic retaining the provider failure stage', async () => {
  await withUI(async ui => {
    configure(ui);
    const privateQuestion = 'PRIVATE QUESTION NOT FOR LOGS';
    ui.respond = () => new Response(JSON.stringify({ error: {
      code: 429, status: 'RESOURCE_EXHAUSTED', message: privateQuestion + FAKE_KEY,
    } }), { status: 429, headers: { 'content-type': 'application/json' } });
    await ui.api.sendQuestion(privateQuestion);
    click(button(ui, 'Ver diagnóstico'));
    assert.equal(ui.document.querySelector('.ldm-chat-diagnostics').open, true);
    click(button(ui, 'Copiar diagnóstico'));
    await settle(() => ui.copiedReports.length === 1);
    const text = ui.copiedReports[0];
    const report = JSON.parse(text);
    assert.equal(report.build, CHAT_BUILD);
    assert.equal(report.reports.at(-1).failureStage, 'read_error_body');
    assert.equal(report.reports.at(-1).metrics.httpStatus, 429);
    assert.equal(report.reports.at(-1).metrics.providerStatus, 'RESOURCE_EXHAUSTED');
    assert.equal(text.includes(FAKE_KEY), false);
    assert.equal(text.includes(privateQuestion), false);
    assert.equal(ui.storageCalls.length, 0);
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});

test('diagnostics can be copied while a request is still waiting for headers', async () => {
  await withUI(async ui => {
    configure(ui);
    ui.respond = () => new Promise(() => {});
    const request = ui.api.sendQuestion('PRIVATE QUESTION');
    click(button(ui, 'Copiar diagnóstico', { visibleOnly: false }));
    await settle(() => ui.copiedReports.length === 1);
    const report = JSON.parse(ui.copiedReports[0]).reports.at(-1);
    assert.equal(report.state, 'pending');
    assert.equal(report.stage, 'wait_response_headers');
    assert.equal(report.metrics.httpStatus, undefined);
    click(button(ui, 'Cancelar consulta'));
    await request;
  });
});

test('clipboard failure leaves a selectable report and records only safe exception metadata', async () => {
  await withUI(async ui => {
    configure(ui);
    ui.navigator.clipboard.writeText = async () => { throw new Error(FAKE_KEY + ' PRIVATE CONTENT'); };
    click(button(ui, 'Copiar diagnóstico', { visibleOnly: false }));
    await settle(() => ui.document.body.textContent.includes('cópialo manualmente'));
    const field = ui.document.querySelector('.ldm-chat-diagnostic-report');
    assert.equal(field.readOnly, true);
    assert.equal(JSON.parse(field.value).reports.at(-1).failureCode, 'diagnostic_copy');
    assert.equal(field.value.includes('PRIVATE CONTENT'), false);
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});

test('an exception before sending a question is caught and reported as a UI context failure', async () => {
  await withUI(async ui => {
    configure(ui);
    const controls = ui.document.createElement('div');
    controls.setAttribute('aria-label', 'Controles del yate');
    controls.getClientRects = () => { throw new TypeError('PRIVATE CONTEXT ' + FAKE_KEY); };
    ui.document.body.append(controls);
    await ui.api.sendQuestion('PRIVATE QUESTION');
    assert.equal(ui.calls.length, 0);
    const report = diagnostics.snapshot().reports.at(-1);
    assert.equal(report.failureCode, 'chat_unexpected');
    assert.equal(report.failureStage, 'ui_context');
    assert.equal(report.exception.name, 'TypeError');
    assert.match(ui.document.body.textContent, /Ocurrió un error en el chat/);
    assert.equal(diagnostics.report().includes('PRIVATE CONTEXT'), false);
    assert.equal(diagnostics.report().includes('PRIVATE QUESTION'), false);
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});
