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
  import('./chat.js').catch(error => console.error('No se pudo cargar el chat de Luz de Mar.', error));
}
