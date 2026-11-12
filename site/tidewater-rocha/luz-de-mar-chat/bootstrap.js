// Keep the assistant outside the immutable renderer bundles.
const parameters = new URLSearchParams(location.search);
if (parameters.get('world') === 'rocha' && !parameters.has('bench')) {
  function showLoadFailure() {
    const box = document.createElement('section');
    box.setAttribute('aria-label', 'Error al cargar el chat');
    box.style.cssText = 'position:fixed;right:12px;bottom:96px;z-index:2147482001;width:min(360px,calc(100vw - 24px));max-height:70vh;overflow:auto;padding:16px;border-radius:14px;background:#f8f7f2;color:#10292f;font:13px/1.5 system-ui;box-shadow:0 8px 40px #0005;pointer-events:auto';
    const message = document.createElement('p');
    message.textContent = 'No se pudo cargar el chat. Recarga la página para volver a intentarlo.';
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Cerrar';
    close.addEventListener('click', () => box.remove());
    for (const name of ['keydown', 'keyup', 'keypress', 'pointerdown', 'click', 'wheel']) box.addEventListener(name, event => event.stopPropagation());
    box.append(message, close);
    document.body.append(box);
  }
  async function loadChat() {
    let diagnostics;
    try {
      const module = await import('./diagnostics.js');
      diagnostics = module.diagnostics;
      module.installGlobalDiagnostics(window);
    } catch {
      console.warn('[Luz de Mar] diagnostics_import');
      showLoadFailure();
      return;
    }
    const trace = diagnostics.start('bootstrap');
    trace.stage('bootstrap_import');
    try {
      await import('./chat.js');
      trace.finish();
    } catch (error) {
      trace.fail('bootstrap_import', error);
      showLoadFailure();
    }
  }
  loadChat().catch(() => console.warn('[Luz de Mar] Falló la vista de diagnóstico de carga.'));
}
