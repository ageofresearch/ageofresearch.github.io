// The iframe owns the world, camera, lighting and native walking controls.
export function crossing(walk) {
  const boarding = walk.model.boarding;
  const nav = walk.nav;
  const [along, across] = nav.position;
  if (nav.deck !== boarding.room.deck || !boarding.safe(along, across, nav.radius)) return null;
  const start = boarding.room.spawn[0];
  const end = boarding.walkEnd ?? boarding.end;
  const target = along >= end - .04 ? start : end;
  const direction = Math.sign(target - along);
  return function advance(seconds) {
    const [x, y] = nav.position;
    if (direction * (target - x) <= .002) return false;
    const step = Math.min(Math.abs(target - x), Math.min(.075, seconds) * 1.12);
    if (step <= 0) return true;
    nav.move(direction * step, Math.max(-step, Math.min(step, boarding.y - y)));
    return Math.abs(nav.position[0] - x) > .00001 && direction * (target - nav.position[0]) > .002;
  };
}

function attachPilot(frame) {
  const panel = document.querySelector('#pilot');
  const button = document.querySelector('#cross');
  const reset = document.querySelector('#reset');
  const fps = document.querySelector('#fps');
  const resolution = document.querySelector('#resolution');
  let session;
  const bind = () => {
    session?.abort();
    const current = session = new AbortController();
    const options = {signal: current.signal};
    const view = frame.contentWindow;
    const doc = frame.contentDocument;
    panel.hidden = true;
    panel.open = false;
    let timer, animation = 0, advance, previous;
    function stop() {
      view.cancelAnimationFrame(animation);
      advance = null;
      previous = undefined;
      button.textContent = 'Recorrer la pasarela';
    }
    const cancel = () => { clearTimeout(timer); stop(); };
    current.signal.addEventListener('abort', cancel, {once:true});
    function ready() {
      // Fail closed if the native app navigates to a different world or full map.
      if (!doc || doc.URL === 'about:blank' || view.__mapsPublicStatus?.status === 'unsupported') return;
      const app = view.__app;
      if (!app?.startupStats) {
        timer = setTimeout(ready, 200);
        return;
      }
      if (!app.gangwayOnly || !app.yachtWalk?.model.boarding) return;
      const walk = app.yachtWalk;
      const nativeFps = doc.querySelector('#fps');
      const canvas = app.engine.domElement;
      const equipmentTour = () => Boolean(doc.querySelector('.ldm-tour-panel'));
      function stats() {
        fps.textContent = nativeFps?.textContent || '— FPS';
        resolution.textContent = canvas.width + ' × ' + canvas.height;
        const busy = equipmentTour();
        button.disabled = !advance && (!walk.active || !crossing(walk) || busy);
        reset.disabled = busy;
      }
      function tick(now) {
        if (!advance || !walk.active || walk.controls?.open || equipmentTour() || doc.hidden) return stop();
        const seconds = previous === undefined ? 0 : (now - previous) / 1000;
        previous = now;
        const moving = advance(seconds);
        // The native render loop then applies the normal eye height, slope and pose.
        if (!moving) return stop();
        animation = view.requestAnimationFrame(tick);
      }
      function faceTravelDirection() {
        const boarding = walk.model.boarding;
        const sign = walk.nav.position[0] < (boarding.walkEnd ?? boarding.end) - .04 ? 1 : -1;
        const forward = app.camera.position.clone().set(0,0,sign).applyQuaternion(walk.model.group.quaternion);
        return Math.atan2(-forward.x,-forward.z);
      }
      button.addEventListener('click', () => {
        if (advance) return stop();
        if (equipmentTour()) return;
        advance = crossing(walk);
        if (!advance) return;
        const move = advance;
        const heading = faceTravelDirection();
        advance = seconds => {
          const error = heading - walk.yaw;
          walk.yaw += Math.atan2(Math.sin(error), Math.cos(error)) * (1 - Math.exp(-3 * Math.min(.075, seconds)));
          return move(seconds);
        };
        previous = undefined;
        button.textContent = 'Detener recorrido';
        animation = view.requestAnimationFrame(tick);
      },options);
      reset.addEventListener('click', () => {
        stop();
        // The iframe's own equipment tour listens for pointer input to cancel.
        if (!equipmentTour()) walk.enterRoom('boarding');
        stats();
      },options);
      doc.addEventListener('pointerdown', stop, {...options,capture:true});
      doc.addEventListener('keydown', stop, {...options,capture:true});
      doc.addEventListener('visibilitychange', stop, options);
      view.addEventListener('luz-de-mar:full-yacht', () => { panel.hidden = true; current.abort(); }, options);
      view.addEventListener('pagehide', () => { panel.hidden = true; current.abort(); }, options);
      panel.addEventListener('toggle', stats, options);
      const changes = new MutationObserver(() => {if (panel.open) stats();});
      if (nativeFps) changes.observe(nativeFps, {childList:true,characterData:true,subtree:true});
      current.signal.addEventListener('abort', () => changes.disconnect(), {once:true});
      panel.hidden = false;
      stats();
    }
    ready();
  };
  frame.addEventListener('load', bind);
  if (frame.contentDocument?.readyState === 'complete') bind();
}

if (typeof document !== 'undefined') attachPilot(document.querySelector('#yacht'));
