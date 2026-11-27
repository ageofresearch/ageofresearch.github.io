// The manifest and mesh can progress at different rates. Give each transfer
// its own inactivity deadline, starting before its response headers arrive.
async function readFile(url, format, controller, fetcher, timeoutMs, cache) {
  let timer;
  function progress() {
    clearTimeout(timer);
    timer = setTimeout(() => controller.abort(new DOMException('Descarga detenida', 'TimeoutError')), timeoutMs);
  }
  progress();
  try {
    const response = await fetcher(url, {signal: controller.signal, cache});
    if (!response.ok) throw Error(`No se pudo descargar ${url.pathname.split('/').pop()} (HTTP ${response.status})`);
    progress();
    if (!response.body) return await response[format]();
    const stream = response.body.pipeThrough(new TransformStream({
      transform(chunk, sink) {
        if (chunk.byteLength) progress();
        sink.enqueue(chunk);
      }
    }), {signal: controller.signal});
    return await new Response(stream)[format]();
  } finally {
    clearTimeout(timer);
  }
}

export async function loadZone(name, version, decode, {
  signal, fetcher = globalThis.fetch.bind(globalThis), timeoutMs = 45000
} = {}) {
  async function attempt(cache) {
    if (signal?.aborted) throw signal.reason ?? new DOMException('Carga cancelada', 'AbortError');
    const controller = new AbortController();
    const abort = () => controller.abort(signal.reason);
    signal?.addEventListener('abort', abort, {once: true});
    try {
      const file = (ext, format) => readFile(new URL(`./${name}.${ext}?v=${version}&geometry=cockpit-column-v1`, import.meta.url),
        format, controller, fetcher, timeoutMs, cache);
      const [manifest, mesh] = await Promise.all([file('json', 'json'), file('bin', 'arrayBuffer')]);
      return decode(manifest, mesh);
    } finally {
      signal?.removeEventListener('abort', abort);
      controller.abort();
    }
  }
  try {
    return await attempt('default');
  } catch (error) {
    if (signal?.aborted) throw error;
    // Replace both cached responses together after an interruption or a
    // mismatched pair. The mesh decoder runs before anything is activated.
    return attempt('reload');
  }
}
