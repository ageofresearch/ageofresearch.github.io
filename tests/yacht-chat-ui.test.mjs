import test from 'node:test';
import assert from 'node:assert/strict';
import { diagnostics, CHAT_BUILD } from '../site/tidewater-rocha/luz-de-mar-chat/diagnostics.js';
import { created, modelStart, textDelta, stepStop, completion, encodeEvents, interactionResponse } from './yacht-chat-interactions-fixtures.mjs';

// Deliberately small DOM contract simulation. These tests import the real chat,
// assistant and Gemini client; they do not claim browser or visual validation.
const FAKE_KEY = 'AIza_TEST_ONLY_DO_NOT_USE_012345678901234';
const NEXT_FAKE_KEY = 'AIza_TEST_ONLY_REPLACEMENT_012345678901234';
const MODEL = 'gemini-4-hydrogen';
let moduleSequence = 0;

class UIEvent {
  constructor(type, options = {}) {
    Object.assign(this, { type, bubbles: true, cancelable: true, defaultPrevented: false }, options);
  }
  preventDefault() { if (this.cancelable) this.defaultPrevented = true; }
  composedPath() { return this.path || []; }
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
    event.path = path;
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
    for (const item of children) {
      const child = typeof item === 'string' ? new Element('#text', this.ownerDocument) : item;
      if (typeof item === 'string') child.textContent = item;
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
  focus() {
    if (this.ownerDocument.activeElement === this) return;
    this.ownerDocument.activeElement = this;
    this.dispatchEvent(new UIEvent('focusin'));
  }
  blur() { this.ownerDocument.activeElement = this.ownerDocument.body; }
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

const success = () => interactionResponse([created(), modelStart(), textDelta('Respuesta de Gemini de prueba.'), stepStop(), completion()]);

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

function openDiagnostics(ui) {
  const panel = ui.document.querySelector('.ldm-chat-diagnostics');
  panel.hidden = false; // Exercise internal tools without exposing them in the shipped UI.
  panel.open = true;
  panel.dispatchEvent(new UIEvent('toggle', { bubbles: false }));
}

test('opens with an empty conversation and an accessible key textarea', async () => {
  await withUI(async ui => {
    assert.equal(ui.document.querySelector('[role="log"]').children.length, 0);
    assert.equal(visible(ui.document.querySelector('.ldm-chat-context')), false);
    assert.equal(visible(ui.document.querySelector('.ldm-chat-connection-title')), false);
    assert.equal(ui.document.querySelector('.ldm-chat-key-status').textContent, '');
    assert.ok(visible(labelled(ui, 'Clave API de Gemini')));
    assert.ok(ui.document.querySelectorAll('label').some(label =>
      label.htmlFor === 'ldm-gemini-key' && label.classList.contains('ldm-chat-sr-only')));
    assert.doesNotMatch(ui.document.body.textContent, /Solo en memoria de esta pestaña|Preguntas sugeridas|Conoce tu yate/);
  });
});

test('opening and reading the chat permits WASD while editing isolates keys and releases held movement', async () => {
  await withUI(async ui => {
    const { document, window, api } = ui;
    const scene = document.createElement('canvas');
    document.body.append(scene);
    const input = { enabled: true, keys: new Set(), pressed: new Set() };
    window.__app = { input, engine: { domElement: scene } };
    window.addEventListener('keydown', e => { input.keys.add(e.code); input.pressed.add(e.code); });
    window.addEventListener('keyup', e => input.keys.delete(e.code));
    await import('../site/tidewater-rocha/luz-de-mar-chat/bootstrap.js?keyboard-test');
    await settle(() => JSON.parse(diagnostics.report()).reports.some(r => r.provider === 'bootstrap' && r.state === 'success'));
    api.close();
    api.open();
    const panel = document.getElementById('ldm-chat-panel');
    const composer = document.getElementById('ldm-chat-question');
    const log = document.querySelector('[role="log"]');
    const key = (type, code) => document.activeElement.dispatchEvent(new UIEvent(type, { code }));
    assert.equal(document.activeElement, panel);
    assert.equal(input.enabled, true);
    for (const code of ['KeyW', 'KeyA', 'KeyS', 'KeyD']) {
      key('keydown', code);
      assert.ok(input.keys.has(code));
      key('keyup', code);
      assert.ok(!input.keys.has(code));
    }
    key('keydown', 'KeyW');
    for (const control of [labelled(ui, 'Clave API de Gemini'), composer, labelled(ui, 'Razonamiento')]) {
      control.focus();
      assert.equal(input.keys.size, 0);
      assert.equal(input.pressed.size, 0);
      key('keydown', 'KeyA');
      assert.equal(input.keys.size, 0);
      key('keyup', 'KeyA');
    }
    composer.focus();
    type(composer, '¿Cómo se llama el yate?');
    await api.sendQuestion(composer.value);
    assert.equal(document.activeElement, log);
    key('keydown', 'KeyD');
    assert.ok(input.keys.has('KeyD'));
    composer.focus();
    type(composer, 'Borrador');
    scene.dispatchEvent(new UIEvent('pointerdown'));
    assert.equal(document.activeElement, document.body);
    key('keydown', 'KeyS');
    assert.ok(input.keys.has('KeyS'));
    key('keyup', 'KeyS');
    assert.equal(composer.value, 'Borrador');
    assert.ok(visible(panel));
    // A walk disabled by the scene itself must remain disabled.
    input.enabled = false;
    api.close();
    api.open();
    assert.equal(input.enabled, false);
  });
});

test('configuring Gemini clears the editor, makes no request, and stores no key in the DOM or storage', async () => {
  await withUI(async ui => {
    configure(ui);
    assert.ok(ui.document.body.textContent.includes(MODEL));
    assert.equal(visible(ui.document.querySelector('.ldm-chat-diagnostics')), false);
    for (const name of ['Cambiar clave', 'Desconectar Gemini', 'Comprobar conexión']) {
      assert.equal(visible(button(ui, name, { visibleOnly: false })), false);
    }
    assert.ok(visible(labelled(ui, 'Razonamiento')));
    assert.doesNotMatch(ui.document.body.textContent, /Enter para enviar|Modelo y orientación local, sin telemetría|Documentación del yate · Sin datos en tiempo real/);
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
      assert.equal(address.pathname, '/v1beta/interactions');
      assert.equal(address.searchParams.get('alt'), 'sse');
      assert.equal(address.search.includes(FAKE_KEY), false);
      assert.equal(address.searchParams.has('key'), false);
      assert.equal(new Headers(options.headers).get('x-goog-api-key'), FAKE_KEY);
      assert.equal(options.credentials, 'omit');
      assert.equal(String(options.body).includes(FAKE_KEY), false);
    }
    const payload = JSON.parse(ui.calls[1].options.body);
    assert.ok(JSON.stringify(payload.input).includes('Primera pregunta sobre mantenimiento'));
    assert.equal(payload.model, MODEL);
    assert.equal(payload.store, false);
    assertNoDOMSecret(ui, FAKE_KEY);
    assert.equal(ui.storageCalls.length, 0);
  }, { endpoint: 'https://example.invalid/must-not-receive-the-key' });
});

test('changing or cancelling a key makes no request, and replacing it affects only the next question', async () => {
  await withUI(async ui => {
    openDiagnostics(ui);
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
    openDiagnostics(ui);
    configure(ui);
    await ui.api.sendQuestion('Pregunta con Gemini');
    click(button(ui, 'Desconectar Gemini'));
    assert.equal(labelled(ui, 'Clave API de Gemini').value, '');
    await ui.api.sendQuestion('¿Qué es un PMS?');
    assert.equal(ui.calls.length, 1, 'A local follow-up sends no Gemini request');
    assert.equal(visible(ui.document.querySelector('.ldm-chat-context')), false);
    assertNoDOMSecret(ui, FAKE_KEY);
    assert.equal(ui.storageCalls.length, 0);
  });
});

test('Gemini configuration controls stay disabled during a request and become available when it settles', async () => {
  await withUI(async ui => {
    openDiagnostics(ui);
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
    assert.equal(ui.document.querySelector('[role="log"]').children.length, 0);
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
    assert.equal(ui.document.querySelector('.ldm-chat-key-status').textContent, '');
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
    feed.enqueue(new TextEncoder().encode(encodeEvents([created(), modelStart(), textDelta('BORRADOR INCOMPLETO')])));
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
    const encode = payload => new TextEncoder().encode(encodeEvents(payload));
    const request = ui.api.sendQuestion('Consulta en partes');
    feed.enqueue(encode([created(), modelStart(), textDelta('Respuesta progresiva ')]));
    await settle(() => ui.document.body.textContent.includes('Respuesta progresiva '));
    feed.enqueue(encode([textDelta('completa.'), stepStop(), completion()]));
    await request;
    assert.equal(ui.document.body.textContent.split('Respuesta progresiva completa.').length - 1, 1);
    assert.equal(visible(button(ui, 'Cancelar consulta', { visibleOnly: false })), false);
    ui.respond = success;
    await ui.api.sendQuestion('Seguimiento');
    const history = JSON.parse(ui.calls[1].options.body).input;
    assert.equal(history.filter(message => message.type === 'model_output' && message.content[0].text === 'Respuesta progresiva completa.').length, 1);
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});

test('streamed and completed Gemini answers render bold as text-safe strong elements', async () => {
  await withUI(async ui => {
    configure(ui);
    let feed;
    ui.respond = () => new Response(new ReadableStream({ start(controller) { feed = controller; } }));
    const request = ui.api.sendQuestion('Pregunta **literal**');
    const send = events => feed.enqueue(new TextEncoder().encode(encodeEvents(events)));
    send([created(), modelStart(), textDelta('Yate: **Luz de Mar*')]);
    await settle(() => ui.document.body.textContent.includes('Luz de Mar*'));
    send([textDelta('*. Motor: **babor**. <b>Texto</b>')]);
    const reply = () => ui.document.querySelector('.ldm-chat-message-assistant').querySelector('.ldm-chat-message-text');
    const verify = () => {
      assert.deepEqual(reply().querySelectorAll('strong').map(node => node.textContent), ['Luz de Mar', 'babor']);
      assert.equal(reply().textContent, 'Yate: Luz de Mar. Motor: babor. <b>Texto</b>');
      assert.equal(reply().querySelector('b'), null);
    };
    await settle(() => reply().querySelectorAll('strong').length === 2);
    verify();
    send([stepStop(), completion()]);
    await request;
    verify();
    assert.ok(ui.document.body.textContent.includes('Pregunta **literal**'));
  });
});

test('an error keeps diagnostics internal and retains the provider failure stage', async () => {
  await withUI(async ui => {
    configure(ui);
    const privateQuestion = 'PRIVATE QUESTION NOT FOR LOGS';
    ui.respond = () => new Response(JSON.stringify({ error: {
      code: 429, status: 'RESOURCE_EXHAUSTED', message: privateQuestion + FAKE_KEY,
    } }), { status: 429, headers: { 'content-type': 'application/json' } });
    await ui.api.sendQuestion(privateQuestion);
    assert.ok(visible(button(ui, 'Volver a intentar')));
    assert.ok(!ui.document.body.textContent.includes('Ver diagnóstico'));
    assert.equal(visible(ui.document.querySelector('.ldm-chat-diagnostics')), false);
    openDiagnostics(ui);
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

test('the connectivity button checks public access and model metadata without generating or adding chat history', async () => {
  await withUI(async ui => {
    openDiagnostics(ui);
    configure(ui);
    ui.respond = call => call.url.includes('$discovery') ? new Response('{}') : new Response(JSON.stringify({ name: 'models/' + MODEL, supportedGenerationMethods: ['generateContent'] }), { headers: { 'content-type': 'application/json' } });
    click(button(ui, 'Comprobar conexión'));
    await settle(() => ui.calls.length === 2 && ui.document.querySelector('[role="log"]').getAttribute('aria-busy') === 'false');
    assert.ok(ui.calls.every(call => call.options.method === 'GET' && call.options.body === undefined));
    assert.match(ui.document.body.textContent, /Datos del modelo: HTTP 200/);
    assert.match(ui.document.body.textContent, /generación pendiente de comprobar/);
    assert.equal(ui.document.body.textContent.includes('Gemini respondió'), false);
    ui.respond = success;
    await ui.api.sendQuestion('Primera pregunta tras la comprobación');
    assert.equal(ui.calls.length, 3);
    const sent = JSON.parse(ui.calls[2].options.body);
    assert.equal(sent.input.length, 1);
    assert.equal(sent.input[0].content[0].text, 'Primera pregunta tras la comprobación');
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});

test('a stalled connectivity check finishes after its short deadline, retains diagnostics and unlocks the chat', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  await withUI(async ui => {
    openDiagnostics(ui);
    configure(ui);
    ui.respond = () => new Promise(() => {});
    click(button(ui, 'Comprobar conexión'));
    assert.equal(ui.calls.length, 2);
    assert.equal(button(ui, 'Comprobar conexión').disabled, true);
    t.mock.timers.tick(10001);
    await settle(() => ui.document.querySelector('[role="log"]').getAttribute('aria-busy') === 'false');
    assert.match(ui.document.body.textContent, /sin respuesta dentro del plazo/);
    const reports = diagnostics.snapshot().reports.filter(report => report.provider.startsWith('connectivity_'));
    assert.equal(reports.length, 2);
    assert.ok(reports.every(report => report.failureCode === 'gemini_timeout' && report.failureStage === 'wait_response_headers'));
    assert.equal(button(ui, 'Comprobar conexión').disabled, false);
    ui.respond = success;
    await ui.api.sendQuestion('Nueva pregunta después de la prueba');
    assert.equal(new Headers(ui.calls[2].options.headers).get('x-goog-api-key'), FAKE_KEY);
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});

test('acceptance updates the UI before any answer text without adding an assistant response prematurely', async () => {
  await withUI(async ui => {
    configure(ui);
    let feed;
    ui.respond = () => new Response(new ReadableStream({ start(controller) { feed = controller; } }));
    const request = ui.api.sendQuestion('Pregunta que necesita procesarse');
    feed.enqueue(new TextEncoder().encode(encodeEvents(created())));
    await settle(() => ui.document.body.textContent.includes('Google aceptó la consulta'));
    assert.equal(diagnostics.snapshot().reports.at(-1).state, 'pending');
    assert.equal(ui.document.querySelectorAll('.ldm-chat-message-assistant').length, 0);
    feed.enqueue(new TextEncoder().encode(encodeEvents([modelStart(), textDelta('Respuesta confirmada.'), stepStop(), completion()])));
    await request;
    assert.equal(ui.document.body.textContent.split('Respuesta confirmada.').length - 1, 1);
    assert.equal(diagnostics.snapshot().reports.at(-1).state, 'success');
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});

test('a brief generation is explicit, sends one fixed prompt without yacht context, and preserves only the real conversation history', async () => {
  await withUI(async ui => {
    openDiagnostics(ui);
    assert.equal(visible(button(ui, 'Probar respuesta breve', { visibleOnly: false })), false);
    configure(ui);
    assert.equal(ui.calls.length, 0);
    const probeButton = button(ui, 'Probar respuesta breve');
    const noteText = 'Prueba de hasta 30 s sin contexto del yate. Usa la API y puede consumir tokens.';
    const note = descendants(ui.document).find(node => node.textContent === noteText);
    assert.ok(note && visible(note), 'The API usage note is visible before starting a generation');

    const privateQuestion = 'PRIVATE PREVIOUS QUESTION ABOUT THE YACHT';
    await ui.api.sendQuestion(privateQuestion);
    const log = ui.document.querySelector('[role="log"]');
    const previousLog = log.textContent;
    ui.respond = () => interactionResponse([created(), modelStart(), textDelta('PROBE_ONLY_RESPONSE'), stepStop(), completion()]);
    click(probeButton);
    await settle(() => ui.document.body.textContent.includes('Google completó la respuesta breve.'));
    assert.equal(ui.calls.length, 2, 'The explicit click adds exactly one generation request');
    const request = ui.calls[1];
    const body = JSON.parse(request.options.body);
    assert.equal(request.options.method, 'POST');
    assert.equal(new URL(request.url).pathname, '/v1beta/interactions');
    assert.equal(new Headers(request.options.headers).get('x-goog-api-key'), FAKE_KEY);
    assert.equal(request.url.includes(FAKE_KEY), false);
    assert.equal(request.options.body.includes(FAKE_KEY), false);
    assert.equal(body.model, MODEL);
    assert.equal(body.stream, true);
    assert.equal(body.store, false);
    assert.equal(body.system_instruction, undefined);
    assert.equal(body.previous_interaction_id, undefined);
    assert.equal(body.input, 'Responde únicamente OK.');
    assert.equal(request.options.body.includes(privateQuestion), false);
    assert.equal(request.options.body.includes('Luz de Mar'), false);
    assert.equal(log.textContent, previousLog, 'Probe prompts and responses never become conversation messages');
    const report = diagnostics.snapshot().reports.find(report => report.provider === 'generation_probe');
    assert.ok(report);
    assert.equal(report.state, 'success');
    assert.equal(report.metrics.requestKind, 'generation_probe');
    assert.equal(diagnostics.report().includes('PROBE_ONLY_RESPONSE'), false);

    click(button(ui, 'Cambiar clave'));
    assert.equal(visible(probeButton), false);
    click(button(ui, 'Cancelar cambio'));
    assert.equal(visible(probeButton), true);
    assert.equal(ui.calls.length, 2, 'Editing or restoring the configured key never invokes the probe');

    ui.respond = success;
    await ui.api.sendQuestion('NEXT REAL QUESTION');
    const history = JSON.parse(ui.calls[2].options.body).input;
    assert.equal(history.length, 3, 'The original conversation survives the probe');
    assert.ok(JSON.stringify(history).includes(privateQuestion));
    assert.equal(JSON.stringify(history).includes('Responde únicamente OK.'), false);
    assert.equal(JSON.stringify(history).includes('PROBE_ONLY_RESPONSE'), false);
    assertNoDOMSecret(ui, FAKE_KEY);
    assert.equal(ui.storageCalls.length, 0);
  });
});

test('a brief probe shows keepalive without claiming acceptance, blocks other requests, and can be cancelled', async () => {
  await withUI(async ui => {
    configure(ui);
    openDiagnostics(ui);
    let feed, cancelled = false;
    ui.respond = () => new Response(new ReadableStream({
      start(controller) { feed = controller; }, cancel() { cancelled = true; },
    }), { headers: { 'content-type': 'text/event-stream' } });
    const log = ui.document.querySelector('[role="log"]');
    const previousLog = log.textContent;
    click(button(ui, 'Probar respuesta breve'));
    assert.equal(ui.calls.length, 1);
    assert.equal(button(ui, 'Probar respuesta breve').disabled, true);
    assert.equal(button(ui, 'Comprobar conexión').disabled, true);
    assert.equal(button(ui, 'Cambiar clave').disabled, true);
    assert.equal(button(ui, 'Desconectar Gemini').disabled, true);
    click(button(ui, 'Probar respuesta breve'));
    await ui.api.sendQuestion('MUST NOT BE SENT WHILE PROBING');
    assert.equal(ui.calls.length, 1);
    feed.enqueue(new TextEncoder().encode(': keep-alive\n\n'));
    await settle(() => ui.document.body.textContent.includes('El flujo sigue abierto, pero todavía no llegan eventos de generación.'));
    assert.equal(ui.document.body.textContent.includes('Google aceptó la consulta'), false);
    click(button(ui, 'Copiar diagnóstico', { visibleOnly: false }));
    await settle(() => ui.copiedReports.length === 1);
    const report = JSON.parse(ui.copiedReports[0]).reports.find(report => report.provider === 'generation_probe');
    assert.equal(report.state, 'pending');
    assert.equal(report.metrics.commentLines, 1);
    assert.equal(report.metrics.dataLines, 0);
    assert.equal(ui.copiedReports[0].includes(FAKE_KEY), false);
    click(button(ui, 'Cancelar consulta'));
    await settle(() => log.getAttribute('aria-busy') === 'false');
    assert.equal(cancelled, true);
    assert.equal(ui.calls[0].options.signal.aborted, true);
    assert.equal(diagnostics.snapshot().reports.find(report => report.provider === 'generation_probe').state, 'cancelled');
    assert.equal(button(ui, 'Probar respuesta breve').disabled, false);
    assert.equal(log.textContent, previousLog);
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});

test('a heartbeat-only brief probe reaches its absolute deadline, retains the key and never enters chat history', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  await withUI(async ui => {
    configure(ui);
    openDiagnostics(ui);
    let feed, cancelled = false;
    ui.respond = () => new Response(new ReadableStream({
      start(controller) { feed = controller; }, cancel() { cancelled = true; },
    }), { headers: { 'content-type': 'text/event-stream' } });
    const log = ui.document.querySelector('[role="log"]');
    const previousLog = log.textContent;
    click(button(ui, 'Probar respuesta breve'));
    await settle(() => diagnostics.snapshot().reports.some(report => report.provider === 'generation_probe' && report.metrics.httpStatus === 200));
    t.mock.timers.tick(15000);
    feed.enqueue(new TextEncoder().encode(': keep-alive\n\n'));
    await settle(() => ui.document.body.textContent.includes('El flujo sigue abierto, pero todavía no llegan eventos de generación.'));
    t.mock.timers.tick(15001);
    await settle(() => log.getAttribute('aria-busy') === 'false');
    const report = diagnostics.snapshot().reports.find(report => report.provider === 'generation_probe');
    assert.equal(report.failureCode, 'gemini_keepalive_timeout');
    assert.equal(report.metrics.deadlineMs, 30000);
    assert.equal(report.metrics.commentLines, 1);
    assert.equal(report.metrics.eventsReceived || 0, 0);
    assert.equal(ui.calls.length, 1, 'Heartbeats never cause automatic retries');
    assert.equal(cancelled, true);
    assert.equal(log.textContent, previousLog);
    assert.equal(button(ui, 'Probar respuesta breve').disabled, false);
    ui.respond = success;
    await ui.api.sendQuestion('REAL QUESTION AFTER THE PROBE');
    assert.equal(new Headers(ui.calls[1].options.headers).get('x-goog-api-key'), FAKE_KEY);
    assert.equal(JSON.parse(ui.calls[1].options.body).input.length, 1);
    assertNoDOMSecret(ui, FAKE_KEY);
  });
});

test('an open HTTP 503 SSE error fails the brief probe safely and allows only a manual retry without adding chat history', async () => {
  await withUI(async ui => {
    configure(ui);
    openDiagnostics(ui);
    const previousQuestion = 'REAL QUESTION BEFORE THE SSE ERROR';
    await ui.api.sendQuestion(previousQuestion);
    const log = ui.document.querySelector('[role="log"]');
    const previousLog = log.textContent;
    const privateDetail = 'PRIVATE_PROVIDER_ERROR_DETAIL';
    let cancelled = false;
    ui.respond = () => new Response(new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('event: error\ndata: ' + JSON.stringify({
          error: { code: 'service_unavailable', status: 'UNAVAILABLE', message: 'Overloaded ' + privateDetail + ' ' + FAKE_KEY },
        }) + '\n\n'));
        // Keep the body open: recognizing the error must not depend on EOF.
      },
      cancel() { cancelled = true; },
    }), { status: 503, headers: { 'content-type': 'text/event-stream' } });
    click(button(ui, 'Probar respuesta breve'));
    await settle(() => log.getAttribute('aria-busy') === 'false');
    assert.equal(ui.calls.length, 2);
    assert.equal(cancelled, true, 'The reader is cancelled after the error event without waiting for EOF');
    const status = ui.document.querySelector('.ldm-chat-status');
    assert.equal(visible(status), true);
    assert.match(status.textContent, /no está disponible/);
    assert.doesNotMatch(ui.document.body.textContent, /Google completó la respuesta breve|Google generó texto en la prueba breve/);
    assert.equal(button(ui, 'Probar respuesta breve').disabled, false);
    assert.equal(button(ui, 'Comprobar conexión').disabled, false);
    assert.equal(button(ui, 'Cambiar clave').disabled, false);
    assert.equal(button(ui, 'Desconectar Gemini').disabled, false);
    assert.equal(log.textContent, previousLog);
    click(button(ui, 'Copiar diagnóstico', { visibleOnly: false }));
    await settle(() => ui.copiedReports.length === 1);
    const report = JSON.parse(ui.copiedReports[0]).reports.find(item => item.provider === 'generation_probe');
    assert.equal(report.state, 'failed');
    assert.equal(report.failureCode, 'gemini_unavailable');
    assert.equal(report.metrics.httpStatus, 503);
    assert.equal(report.metrics.errorFormat, 'sse');
    assert.equal(report.metrics.errorBody, 'parsed');
    assert.equal(report.metrics.providerHint, 'CAPACITY');
    assert.equal(report.metrics.interactionErrorCode, 'service_unavailable');
    assert.equal(ui.copiedReports[0].includes(FAKE_KEY), false);
    assert.equal(ui.copiedReports[0].includes(privateDetail), false);
    assert.equal(ui.copiedReports[0].includes('Overloaded'), false);
    assertNoDOMSecret(ui, FAKE_KEY, privateDetail);
    await settle();
    assert.equal(ui.calls.length, 2, 'An HTTP error never triggers an automatic generation retry');

    ui.respond = () => interactionResponse([created(), modelStart(), textDelta('PROBE_RETRY_ONLY_RESPONSE'), stepStop(), completion()]);
    click(button(ui, 'Probar respuesta breve'));
    await settle(() => ui.document.body.textContent.includes('Google completó la respuesta breve.'));
    assert.equal(ui.calls.length, 3, 'An explicit second click starts exactly one new probe');
    assert.equal(new Headers(ui.calls[2].options.headers).get('x-goog-api-key'), FAKE_KEY);
    assert.equal(log.textContent, previousLog);
    ui.respond = success;
    await ui.api.sendQuestion('REAL QUESTION AFTER THE SSE ERROR');
    const history = JSON.parse(ui.calls[3].options.body).input;
    assert.equal(history.length, 3);
    assert.ok(JSON.stringify(history).includes(previousQuestion));
    assert.doesNotMatch(JSON.stringify(history), /Responde únicamente OK\.|PROBE_RETRY_ONLY_RESPONSE|PRIVATE_PROVIDER_ERROR_DETAIL/);
    assertNoDOMSecret(ui, FAKE_KEY, privateDetail);
    assert.equal(ui.storageCalls.length, 0);
  });
});

test('reasoning selector applies each level to the next Gemini request', async () => {
  await withUI(async ui => {
    configure(ui);
    const selector = labelled(ui, 'Razonamiento');
    assert.ok(visible(selector));
    assert.equal(selector.value, 'low');
    assert.deepEqual(selector.children.map(option => option.value), ['low', 'medium', 'high', 'xhigh']);
    for (const level of ['low', 'medium', 'high', 'xhigh']) {
      selector.value = level;
      await ui.api.sendQuestion('¿Qué sabemos del motor de babor?');
      assert.equal(JSON.parse(ui.calls.at(-1).options.body).generation_config.thinking_level, level);
    }
    assert.equal(ui.calls.length, 4);
  });
});

test('a second question cancels the tour review without hiding the first answer or moving late', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  await withUI(async ui => {
    configure(ui);
    ui.window.__app = { yachtWalk: {} };
    let release, reviewSignal;
    ui.respond = ({ options }) => {
      const body = JSON.parse(options.body);
      if (body.response_format.schema.required.join() === 'damageTarget') {
        reviewSignal = options.signal;
        return new Promise(resolve => { release = () => resolve(interactionResponse([created(), modelStart(),
          textDelta('{"damageTarget":"LD_MAC_001"}'), stepStop(), completion()])); });
      }
      const answer = ui.calls.length === 1 ? 'El motor de babor tiene daños reportados.' : 'Puedes consultar el PMS.';
      return interactionResponse([created(), modelStart(), textDelta(JSON.stringify({ answer, damageTarget: 'none' })), stepStop(), completion()]);
    };
    await ui.api.sendQuestion('¿Alguna novedad?');
    assert.ok(release);
    const log = ui.document.querySelector('[role="log"]');
    assert.match(log.textContent, /daños reportados/);
    await ui.api.sendQuestion('¿Dónde está el registro?');
    assert.ok(reviewSignal.aborted);
    release();
    await settle();
    t.mock.timers.tick(1000);
    assert.equal(ui.calls.length, 3);
    assert.match(log.textContent, /Puedes consultar el PMS/);
    assert.ok(ui.document.querySelector('.ldm-chat-status').hidden);
    assert.ok(!ui.document.querySelector('.ldm-tour-panel'));
  });
});

test('a completed damage report starts a round trip while the chat stays open and usable', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  await withUI(async ui => {
    configure(ui);
    const frames = new Map();
    let nextFrame = 0;
    const vector = (x = 0, y = 0, z = 0) => ({
      x, y, z,
      clone() { return vector(this.x, this.y, this.z); },
      set(x, y, z) { Object.assign(this, { x, y, z }); return this; },
      sub(p) { return this.set(this.x - p.x, this.y - p.y, this.z - p.z); },
    });
    const camera = { position: vector(), rotation: { set() {} } };
    const deckRoom = { id: 'boarding', deck: 'MD' };
    const room = { id: 'LD_R02', deck: 'LD' };
    const model = {
      asset: { data: { levels: { MD: 4, LD: 1.58 }, rooms: [room], meshes: [{ id: 'LD_MAC_001', bbox: [9, 0.4, 1.7, 12.5, 1.6, 2.7] }] } },
      group: { userData: { yacht: { sx: 1, sy: 1, length: 35, seaReference: 2 } }, localToWorld: p => p },
      updateVisibility() {},
    };
    const stairs = { lower: 'LD', upper: 'MD', path: [[6, 0], [2, 0]], distances: [0, 4], length: 4 };
    const nav = { deck: 'MD', room: deckRoom, position: [0, 0], elevation: 4, asset: model.asset, routes: [stairs],
      location() { return this.room; }, floorHeight() { return this.asset.data.levels[this.deck]; }, floorSafe: () => true };
    const app = ui.window.__app = { camera, waterEnabled: true };
    const walk = app.yachtWalk = {
      app, model, nav, active: true, eyeHeight: 1.6, pitch: 0, yaw: 0, resetHistory() {},
      applyPosition() { camera.position.set(nav.position[1], nav.elevation - 0.4, nav.position[0] - 17.5); },
      enterRoom() { assert.fail('Tour must never teleport the camera to the next deck'); },
    };
    walk.applyPosition();
    const initial = camera.position.clone();
    ui.window.matchMedia = () => ({ matches: true });
    globalThis.requestAnimationFrame = fn => { frames.set(++nextFrame, fn); return nextFrame; };
    globalThis.cancelAnimationFrame = id => frames.delete(id);
    try {
      const marker = ui.document.createElement('script');
      marker.setAttribute('data-equipment-tour', '');
      ui.document.head.append(marker);
      delete app.yachtWalk; // The user can ask a question before the renderer finishes starting.
      const reported = 'Según el reporte del proyecto, se han reportado daños en el motor de babor de Luz de Mar, aunque no se especifica el componente afectado, la causa, la gravedad ni el estado de la reparación. Ten en cuenta que no tengo sensores ni comprobaciones actuales a bordo conectadas, y la escena 3D no refleja el estado técnico real del yate. ¿En qué te puedo ayudar?';
      let feed, reviews = 0;
      ui.respond = ({ options }) => {
        const body = JSON.parse(options.body);
        if (body.response_format?.schema.required.join() === 'damageTarget') {
          reviews++;
          assert.equal(JSON.parse(body.input).respuesta, reported);
          assert.equal(JSON.parse(body.input).pregunta, 'pasa algo');
          return interactionResponse([created(), modelStart(), textDelta('{"damageTarget":"LD_MAC_001"}'), stepStop(), completion()]);
        }
        assert.deepEqual(body.response_format.schema.required, ['answer', 'damageTarget']);
        return new Response(new ReadableStream({ start(controller) { feed = controller; } }));
      };
      for (const cancel of [true, false]) {
        const task = ui.api.sendQuestion('pasa algo');
        const answer = JSON.stringify({ answer: reported, damageTarget: 'none' });
        feed.enqueue(new TextEncoder().encode(encodeEvents([created(), modelStart(), textDelta(answer)])));
        await settle(() => ui.document.body.textContent.includes(reported));
        t.mock.timers.tick(1200);
        assert.equal(frames.size, 0);
        if (cancel) click(button(ui, 'Cancelar consulta'));
        else feed.enqueue(new TextEncoder().encode(encodeEvents([stepStop(), completion()])));
        await task;
        if (!cancel) await settle(() => diagnostics.snapshot().reports.some(r => r.provider === 'tour_review' && r.state === 'success'));
        t.mock.timers.tick(1000);
        assert.equal(frames.size, 0);
        if (!cancel) {
          app.yachtWalk = walk;
          t.mock.timers.tick(250);
          assert.equal(frames.size, 1);
        }
        assert.equal(reviews, cancel ? 0 : 1);
      }
      const chat = ui.document.getElementById('ldm-chat-panel');
      const input = ui.document.getElementById('ldm-chat-question');
      const launcher = ui.document.querySelector('.ldm-chat-launcher');
      const log = ui.document.querySelector('[role="log"]');
      assert.ok(visible(chat));
      assert.equal(launcher.getAttribute('aria-expanded'), 'true');
      assert.ok(log.textContent.includes(reported));
      let now = 1000;
      function tick() {
        const [id, cb] = frames.entries().next().value;
        frames.delete(id);
        cb(now);
        now += 16;
      }
      function finish() {
        const halfway = [];
        for (let i = 0; frames.size && i < 4000; i++) {
          const before = camera.position.clone(), yaw = walk.yaw;
          tick();
          assert.ok(Math.hypot(camera.position.x - before.x, camera.position.y - before.y, camera.position.z - before.z) < 0.09);
          assert.ok(Math.abs(walk.yaw - yaw) < 0.04);
          if (nav.stair) halfway.push(nav.elevation);
        }
        assert.equal(frames.size, 0);
        assert.ok(halfway.some(h => h > 2 && h < 3));
      }
      tick();
      assert.deepEqual(nav.position, [0, 0]);
      assert.equal(camera.position.y, initial.y);
      assert.equal(walk.yaw, 0);
      input.dispatchEvent(new UIEvent('pointerdown'));
      for (const code of ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowLeft']) {
        input.dispatchEvent(new UIEvent('keydown', { code }));
      }
      assert.equal(frames.size, 1, 'Interacting with the chat keeps the camera moving');
      tick();
      input.dispatchEvent(new UIEvent('keydown', { key: 'Escape' }));
      assert.ok(!visible(chat), 'Escape inside the chat minimizes it');
      assert.equal(frames.size, 1);
      launcher.dispatchEvent(new UIEvent('pointerdown'));
      click(launcher);
      assert.ok(visible(chat));
      assert.equal(frames.size, 1, 'Reopening the chat keeps the same tour');
      ui.respond = () => interactionResponse([created(), modelStart(),
        textDelta(JSON.stringify({ answer: 'Puedes consultar el PMS.', damageTarget: 'none' })), stepStop(), completion()]);
      await ui.api.sendQuestion('¿Dónde consulto el registro?');
      t.mock.timers.tick(1000);
      assert.equal(frames.size, 1, 'A follow-up without a new target preserves the active tour');
      assert.match(log.textContent, /Puedes consultar el PMS/);
      assert.ok(log.textContent.includes(reported));
      finish();
      assert.ok(visible(chat));
      assert.deepEqual(nav.position, [9.22, 0]);
      click(button(ui, 'Volver a la vista anterior'));
      finish();
      assert.deepEqual(walk.nav.position, [0, 0]);
      assert.equal(walk.nav.room, deckRoom);
      assert.ok(visible(chat));
      assert.equal(launcher.getAttribute('aria-expanded'), 'true');

      ui.respond = () => interactionResponse([created(), modelStart(),
        textDelta(JSON.stringify({ answer: 'Hay daños reportados en el motor de babor.', damageTarget: 'LD_MAC_001' })), stepStop(), completion()]);
      await ui.api.sendQuestion('Reporto otra avería del motor de babor.');
      t.mock.timers.tick(1000);
      assert.equal(frames.size, 1);
      log.focus();
      log.dispatchEvent(new UIEvent('keydown', { code: 'KeyW' }));
      assert.equal(frames.size, 0, 'Walking from the transcript takes control from the active tour');
      assert.ok(visible(chat));
    } finally {
      delete globalThis.requestAnimationFrame;
      delete globalThis.cancelAnimationFrame;
    }
  });
});
