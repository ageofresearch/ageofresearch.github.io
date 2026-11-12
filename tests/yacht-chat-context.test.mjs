import test from 'node:test';
import { interactionResponse, textEvents } from './yacht-chat-interactions-fixtures.mjs';
import assert from 'node:assert/strict';
import { answerQuestion } from '../site/tidewater-rocha/luz-de-mar-chat/assistant.js';
import { contextFacts, contextText, PROJECT_SOURCE } from '../site/tidewater-rocha/luz-de-mar-chat/context.js';

test('missing maintenance records never turn into a current zero-overdue claim', async () => {
  const result = await answerQuestion('¿Hay tareas vencidas hoy?');
  assert.match(result.answer, /No tengo esos registros actuales conectados/);
  assert.match(result.answer, /Un dato vacío no demuestra/);
  assert.doesNotMatch(result.answer, /0 tareas vencidas|ninguna tarea vencida/i);
  assert.equal(result.mode, 'local');
  assert.equal(result.sources[0].url, 'https://ageofresearch.github.io/tidewater-rocha/publication.json');
});

test('purchase and installation do not close a starting failure or authorize sailing', async () => {
  const result = await answerQuestion('Ya compré e instalé la batería, ¿podemos salir?');
  assert.match(result.answer, /no cierra por sí solo la avería/);
  assert.match(result.answer, /prueba posterior y aceptación/);
  assert.match(result.answer, /falta información actual/i);
  assert.match(result.answer, /capitán/);
});

test('a battery mention does not produce an invented compatible reference', async () => {
  const result = await answerQuestion('¿Qué batería del almacén sirve para el arranque?');
  assert.match(result.answer, /No conozco la referencia instalada/);
  assert.match(result.answer, /comprobar compatibilidad/);
  assert.doesNotMatch(result.answer, /\d+\s*(V|Ah)\b|SIM-/);
});

test('no departure approval is inferred from unknown technical status', async () => {
  const result = await answerQuestion('¿El yate está listo para navegar mañana?');
  assert.match(result.answer, /información insuficiente/);
  assert.match(result.answer, /No autoriza la navegación/i);
  assert.doesNotMatch(result.answer, /puedes salir|está autorizado/i);
});

test('unknown technical particulars are acknowledged rather than invented', async () => {
  const result = await answerQuestion('¿Cuál es el número de serie del radar?');
  assert.match(result.answer, /No encuentro ese dato/);
  assert.match(result.answer, /hace falta su fuente, fecha y verificación/);
  assert.doesNotMatch(result.answer, /Garmin|Raymarine|Furuno/);
});

test('estimated opportunity and confirmed benefit remain distinct without private costs', async () => {
  const result = await answerQuestion('¿Qué ahorro está demostrado y qué pasa con la varada?');
  assert.match(result.answer, /no puedo atribuirle una cifra de ahorro/);
  assert.match(result.answer, /Una oportunidad estimada no es un beneficio ya conseguido/);
  assert.match(result.answer, /resultado negativo/);
  assert.doesNotMatch(result.answer, /\d+[\d.,]*\s*(USD|euros|dólares)/);
});

test('a short follow-up preserves the preceding topic', async () => {
  const result = await answerQuestion('¿Y cuánto?', { history: [
    { role: 'user', content: '¿Cómo ahorrar dinero con la varada?' },
    { role: 'assistant', content: 'Hay que comparar las alternativas.', topic: 'savings' },
  ] });
  assert.equal(result.topic, 'savings');
  assert.match(result.answer, /no puedo atribuirle una cifra/);
});

test('an explicit new topic overrides the preceding answer', async () => {
  const result = await answerQuestion('¿Y cómo integramos los sensores?', { history: [
    { role: 'assistant', content: 'Orientación sobre costes.', topic: 'savings' },
  ] });
  assert.equal(result.topic, 'integration');
  assert.match(result.answer, /no está conectado a sensores/);
});

test('route changes require review and the scene is not a forecast', async () => {
  const result = await answerQuestion('¿Qué pasa si cambia la ruta o el horario y el clima?');
  assert.match(result.answer, /no es evidencia meteorológica/);
  assert.match(result.answer, /exige revisar las evidencias afectadas/);
  assert.match(result.answer, /No se inventan límites de viento/);
});

test('absent, stale and duplicated signals do not become valid assurance', async () => {
  const result = await answerQuestion('¿Qué pasa con los datos si no hay Internet?');
  assert.match(result.answer, /Un dato ausente no es cero/);
  assert.match(result.answer, /uno antiguo no mantiene un indicador verde/);
  assert.match(result.answer, /Dos pantallas del mismo sensor no son verificaciones independientes/);
});

test('a visible scene section is not a real GPS location', async () => {
  const result = await answerQuestion('¿Dónde estoy?', { viewContext: 'Zona de demostración' });
  assert.match(result.answer, /Zona de demostración/);
  assert.match(result.answer, /no una posición GPS/);
});

test('generic server context contains no conversation link or financial history', () => {
  assert.ok(contextFacts.length >= 10);
  assert.match(contextText, /No incluye expediente privado/);
  assert.match(contextText, /El chat no autoriza salidas/);
  assert.equal(PROJECT_SOURCE.url, 'https://ageofresearch.github.io/tidewater-rocha/publication.json');
  assert.doesNotMatch(contextText, /chatgpt\.com\/|https:\/\/|USD|2026-10|SIM-SP-/);
});

test('scene context uses the public model and does not present it as a measured vessel', async () => {
  const result = await answerQuestion('¿Qué sabemos del yate?');
  assert.match(result.answer, /Luz de Mar.*Azimut 36 Metri/);
  assert.match(result.answer, /35,23 m/);
  assert.match(result.answer, /no son un levantamiento/);
  assert.match(result.answer, /No tengo el PMS operativo/);
});

test('sea strainer guidance keeps manufacturer and operating status unknown', async () => {
  const result = await answerQuestion('¿Dónde están los filtros de agua de mar?');
  assert.match(result.answer, /foso central, entre los motores/);
  assert.match(result.answer, /fabricante y modelo exactos no están identificados/);
  assert.match(result.answer, /No indican el estado actual/);
  assert.equal(result.sources[0].url, 'https://ageofresearch.github.io/tidewater-rocha/rocha/luz-de-mar/sea-strainers/');
});

test('empty or oversized questions fail before a network call', async () => {
  await assert.rejects(answerQuestion('   '), /Escribe una pregunta/);
  await assert.rejects(answerQuestion('a'.repeat(2001)), /2.000/);
});

test('insecure or credential-bearing endpoints are rejected', async () => {
  await assert.rejects(answerQuestion('¿Qué es el PMS?', { endpoint: 'http://example.com/chat' }), /requiere HTTPS/);
  await assert.rejects(answerQuestion('¿Qué es el PMS?', { endpoint: 'https://user:secret@example.com/chat' }), /requiere HTTPS/);
});

test('remote failures stay visible and never masquerade as a local success', async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async () => ({ ok: false, status: 503 });
    await assert.rejects(answerQuestion('¿Qué es el PMS?', { endpoint: 'https://example.com/chat' }), /IA no está disponible/);
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ answer: 'Orientación local.', mode: 'local' }) });
    await assert.rejects(answerQuestion('¿Qué es el PMS?', { endpoint: 'https://example.com/chat' }), /IA válida/);
  } finally { globalThis.fetch = originalFetch; }
});

test('UTF-8 request size is bounded, the question is preserved, and secrets are absent', async () => {
  const originalFetch = globalThis.fetch;
  let sent;
  try {
    globalThis.fetch = async (url, options) => {
      sent = options;
      return { ok: true, json: async () => ({ answer: 'Respuesta del servicio.', mode: 'ai' }) };
    };
    const question = '¿Qué datos faltan? ' + '🛥'.repeat(800);
    const result = await answerQuestion(question, {
      endpoint: 'https://example.com/chat',
      viewContext: 'Zona de demostración '.repeat(50),
      history: Array.from({ length: 20 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: '🛥'.repeat(1000) })),
    });
    const body = JSON.parse(sent.body);
    assert.equal(body.question, question);
    assert.ok(body.history.length <= 8);
    assert.ok(body.history.every(message => message.content.length <= 1200));
    assert.ok(new TextEncoder().encode(sent.body).byteLength <= 14000);
    assert.equal(result.mode, 'ai');
    assert.equal(sent.credentials, 'omit');
    assert.equal(Object.keys(sent.headers).some(key => /authorization|api.key/i.test(key)), false);
  } finally { globalThis.fetch = originalFetch; }
});

test('Gemini receives each damage question and the report, and its generated text is returned', async t => {
  const questions = ['Pasa algo?', 'Hay algun daño en el yate?', 'No hay algun daño en el motor, lee exhausivamente el contexto'];
  const history = [{ role: 'assistant', content: 'El contexto no incluye daños.' }];
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async (url, request) => {
    const body = JSON.parse(request.body);
    assert.equal(body.model, 'gemini-4-hydrogen');
    assert.match(body.system_instruction, /Se han reportado daños en el motor de babor/);
    assert.match(body.system_instruction, /qué pieza interna está dañada/);
    assert.doesNotMatch(body.system_instruction, /no especifica el componente afectado/i);
    assert.equal(body.input.at(-1).content[0].text, questions[calls]);
    calls++;
    return interactionResponse(textEvents('Respuesta del proveedor ' + calls));
  });
  for (const [index, question] of questions.entries()) {
    const result = await answerQuestion(question, { geminiApiKey: 'fixture-key', history });
    assert.equal(result.mode, 'gemini');
    assert.equal(result.answer, 'Respuesta del proveedor ' + (index + 1));
  }
  assert.equal(calls, questions.length);
});
