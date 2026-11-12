import { contextFacts, PROJECT_SOURCE } from './context.js';
import { geminiAnswer } from './gemini.js';

const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
const topics = new Map(contextFacts.map(fact => [fact.id, fact]));
const FOLLOW_UP = /^(y\s+)?(cuanto|cuanta|cuantos|cuantas|por que|como|y eso|eso|explica|explicame|mas detalle|dime mas|continua)(\s|$)/;
const SNAPSHOT_NOTE = 'Consulta local · documentación pública del modelo. Sin PMS operativo ni sensores conectados.';

function topicScores(question) {
  const padded = ' ' + normalize(question) + ' ';
  return contextFacts.map(fact => ({
    fact,
    score: fact.keywords.reduce((score, keyword) => {
      const phrase = normalize(keyword);
      return score + (padded.includes(' ' + phrase + ' ') ? (phrase.includes(' ') ? 4 : 2) : 0);
    }, 0),
  })).filter(result => result.score > 0).sort((a, b) => b.score - a.score);
}

function previousTopic(history) {
  for (let i = history.length - 1; i >= 0; i--) {
    const message = history[i];
    if (topics.has(message.topic)) return topics.get(message.topic);
    if (message.role === 'user') {
      const scores = topicScores(message.content ?? message.text);
      if (scores.length) return scores[0].fact;
    }
  }
  return null;
}

function unknownAnswer() {
  return {
    answer: 'No encuentro ese dato en el contexto disponible de Luz de Mar. Esta consulta local busca información del proyecto; no es un modelo de IA general ni consulta sensores, manuales adjuntos o Internet.\n\nSi buscas un dato actual del yate, hace falta su fuente, fecha y verificación. Puedo orientarte sobre mantenimiento, preparación de salidas, diagnóstico de baterías, comparación de costes e integración de sistemas. ¿Con cuál de esos temas está relacionada tu pregunta?',
    sources: [PROJECT_SOURCE], mode: 'local', topic: null,
  };
}

function localAnswer(question, { history = [], viewContext = '' } = {}) {
  const query = normalize(question);
  const scores = topicScores(question);
  let fact = scores[0]?.fact;
  if (FOLLOW_UP.test(query) && !fact) fact = previousTopic(history);
  // A named failure is more specific than a general request to buy or depart.
  if (/\b(bateria|baterias|arranque)\b/.test(query)) fact = topics.get('battery');

  if (/^(hola|buenos dias|buenas tardes|buenas noches|gracias|buenas)$/.test(query)) {
    return { answer: 'Hola. Puedo ayudarte a consultar el contexto de Luz de Mar: mantenimiento, preparación de salidas, repuestos, ahorro e integración de sistemas. La orientación local contiene reglas generales de consulta. El expediente privado y las lecturas actuales del barco no están conectados.\n\nPuedes preguntar «¿qué falta para salir?», «¿por qué no basta comprar una batería?» o «¿cómo demostrar un ahorro?».', sources: [PROJECT_SOURCE], mode: 'local', topic: null };
  }

  if (/donde estoy|que zona|que parte (del|de) yate/.test(query) && viewContext) {
    return { answer: 'La interfaz muestra esta ubicación o sección: ' + String(viewContext).slice(0, 500) + '.\n\nEs el contexto visible de la escena; no una posición GPS ni una inspección del equipo. No dispongo del estado real de los sistemas de esa zona.', sources: [PROJECT_SOURCE], mode: 'local', topic: null };
  }

  if (/\b(numero de serie|serie real|modelo del radar|marca del radar|temperatura actual|posicion gps actual)\b/.test(query)) return unknownAnswer();
  if (!fact) return unknownAnswer();

  let answer = SNAPSHOT_NOTE + '\n\n' + fact.answer;
  if (fact.id !== 'departure' && /\b(salir|navegar|salida|listo)\b/.test(query)) {
    answer += '\n\nSobre la salida: falta información actual para confirmarla. Resolver este punto no verifica automáticamente los demás requisitos del viaje ni sustituye la autorización del capitán.';
  }
  return { answer, sources: fact.sources || [PROJECT_SOURCE], mode: 'local', topic: fact.id };
}

function endpointUrl(endpoint) {
  const page = typeof location !== 'undefined' ? location : { href: 'http://localhost/', origin: 'http://localhost' };
  const url = new URL(endpoint, page.href);
  if (url.username || url.password || !['https:', 'http:'].includes(url.protocol) || (url.protocol !== 'https:' && url.origin !== page.origin)) {
    throw new Error('La conexión de IA requiere HTTPS o un servidor del mismo sitio.');
  }
  return url.href;
}

function boundedHistory(history, question) {
  const messages = (Array.isArray(history) ? history : [])
    .filter(message => ['user', 'assistant'].includes(message?.role)).slice(-8)
    .map(message => ({ role: message.role, content: String(message.content ?? message.text ?? '').slice(0, 1200), ...(topics.has(message.topic) ? { topic: message.topic } : {}) }))
    .filter(message => message.content.trim());
  if (messages.at(-1)?.role === 'user' && messages.at(-1).content.trim() === question) messages.pop();
  return messages;
}

function requestBody(question, history, viewContext) {
  const payload = {
    question,
    history: boundedHistory(history, question).map(({ role, content }) => ({ role, content })),
    viewContext: String(viewContext ?? '').slice(0, 700),
  };
  const encoder = new TextEncoder();
  while (payload.history.length && encoder.encode(JSON.stringify(payload)).byteLength > 14000) payload.history.shift();
  return JSON.stringify(payload);
}

async function connectedAnswer(question, { history = [], viewContext = '', endpoint }) {
  const url = endpointUrl(endpoint);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: requestBody(question, history, viewContext),
      signal: controller.signal,
      credentials: 'omit',
    });
    if (!response.ok) {
      if (response.status === 429) throw new Error('El chat está recibiendo demasiadas consultas. Espera un momento y vuelve a intentar.');
      if (response.status === 503) throw new Error('La conexión de IA no está disponible. Puedes volver a intentar o usar la consulta local del proyecto.');
      throw new Error('No se pudo obtener una respuesta de IA. Vuelve a intentar; no se ha sustituido por una respuesta local.');
    }
    const payload = await response.json();
    if (typeof payload.answer !== 'string' || !payload.answer.trim() || payload.mode !== 'ai') throw new Error('El servicio no devolvió una respuesta de IA válida.');
    // The approved knowledge base has one source; model-produced links are not trusted.
    return { answer: payload.answer.trim().slice(0, 16000), sources: [PROJECT_SOURCE], mode: 'ai', topic: null };
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('La consulta de IA tardó demasiado. Puedes volver a intentar.');
    if (error instanceof TypeError) throw new Error('No se pudo conectar con el chat de IA. Revisa la conexión y vuelve a intentar.');
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function answerQuestion(question, options = {}) {
  const text = String(question ?? '').trim();
  if (!text) throw new Error('Escribe una pregunta sobre Luz de Mar.');
  if (text.length > 2000) throw new Error('La pregunta debe tener como máximo 2.000 caracteres.');
  if (options.geminiApiKey) return geminiAnswer(text, {
    apiKey: options.geminiApiKey, thinkingLevel: options.thinkingLevel, history: options.history, viewContext: options.viewContext,
    signal: options.signal, onText: options.onText, onState: options.onState, trace: options.trace,
  });
  if (options.endpoint) return connectedAnswer(text, options);
  return localAnswer(text, { ...options, history: boundedHistory(options.history, text) });
}

