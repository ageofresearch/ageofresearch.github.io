// Keep the assistant outside the immutable renderer bundles.
const parameters = new URLSearchParams(location.search);
if (parameters.get('world') === 'rocha' && !parameters.has('bench')) {
  let suspended = null;
  let retry = null;
  let opened = false;
  function clearInput(input) {
    input.keys?.clear();
    input.pressed?.clear();
    input.mouseDown = input.rightDown = false;
    if (input.look) input.look.x = input.look.y = 0;
    input.wheel = 0;
  }
  function restoreInput() {
    clearTimeout(retry);
    retry = null;
    if (suspended) {
      clearInput(suspended.input);
      suspended.input.enabled = suspended.enabled;
      suspended = null;
    }
  }
  function suspendInput() {
    if (!opened) return;
    const input = window.__app?.input;
    if (!input) {
      retry = setTimeout(suspendInput, 100);
      return;
    }
    if (suspended?.input === input) return;
    restoreInput();
    suspended = { input, enabled: input.enabled };
    clearInput(input);
    input.enabled = false;
  }
  window.addEventListener('luz-de-mar-chat:visibility', event => {
    opened = Boolean(event.detail?.open);
    if (opened) suspendInput();
    else restoreInput();
  });
  window.addEventListener('pagehide', restoreInput);
  function showLoadFailure(report) {
    const box = document.createElement('section');
    box.setAttribute('aria-label', 'Error al cargar el chat');
    box.style.cssText = 'position:fixed;right:12px;bottom:96px;z-index:2147482001;width:min(360px,calc(100vw - 24px));max-height:70vh;overflow:auto;padding:16px;border-radius:14px;background:#f8f7f2;color:#10292f;font:13px/1.5 system-ui;box-shadow:0 8px 40px #0005;pointer-events:auto';
    const message = document.createElement('p');
    message.textContent = 'No se pudo cargar el chat. Copia este diagnóstico para revisar el fallo.';
    const field = document.createElement('textarea');
    field.readOnly = true;
    field.setAttribute('aria-label', 'Diagnóstico de carga del chat');
    field.style.cssText = 'width:100%;height:140px;font:11px/1.5 monospace';
    field.value = report();
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.textContent = 'Copiar diagnóstico';
    copy.addEventListener('click', async () => {
      field.value = report();
      try {
        await navigator.clipboard.writeText(field.value);
        message.textContent = 'Diagnóstico copiado. Pégalo en la conversación de ChatGPT.';
      } catch {
        field.focus();
        field.select();
        message.textContent = 'Selecciona y copia el informe manualmente.';
      }
    });
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Cerrar';
    close.addEventListener('click', () => {
      opened = false;
      restoreInput();
      box.remove();
    });
    for (const name of ['keydown', 'keyup', 'keypress', 'pointerdown', 'click', 'wheel']) box.addEventListener(name, event => event.stopPropagation());
    box.append(message, field, copy, close);
    document.body.append(box);
    opened = true;
    suspendInput();
  }
  async function loadChat() {
    let diagnostics;
    try {
      const module = await import('./diagnostics.js');
      diagnostics = module.diagnostics;
      module.installGlobalDiagnostics(window);
    } catch {
      showLoadFailure(() => JSON.stringify({ build: '2026-11-11-sse-errors-5', failureCode: 'diagnostics_import', stage: 'bootstrap_import' }, null, 2));
      return;
    }
    const trace = diagnostics.start('bootstrap');
    trace.stage('bootstrap_import');
    try {
      await import('./chat.js');
      trace.finish();
    } catch (error) {
      trace.fail('bootstrap_import', error);
      showLoadFailure(() => diagnostics.report());
    }
  }
  loadChat().catch(() => console.warn('[Luz de Mar] Falló la vista de diagnóstico de carga.'));
}
