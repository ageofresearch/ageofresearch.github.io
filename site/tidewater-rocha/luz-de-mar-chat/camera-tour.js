import { equipment, locateEquipment } from './equipment.js';

const smooth = t => t * t * (3 - 2 * t);
const turn = (from, to, t) => from + t * Math.atan2(Math.sin(to - from), Math.cos(to - from));

function snapshot(walk) {
  const nav = walk.nav;
  return {
    active: walk.active, deck: nav.deck, room: nav.room, stair: nav.stair && { ...nav.stair },
    position: [...nav.position], elevation: nav.elevation, yaw: walk.yaw, pitch: walk.pitch,
  };
}

function restore(walk, origin) {
  if (!origin.active) { walk.leave(); return; }
  const { deck, room, stair, position, elevation, yaw, pitch } = origin;
  Object.assign(walk.nav, { deck, room, stair, position, elevation });
  walk.yaw = yaw;
  walk.pitch = pitch;
  walk.applyPosition();
  walk.app.camera.rotation.set(pitch, yaw, 0, 'YXZ');
  walk.model.updateVisibility(walk.app.camera, true);
  walk.controls?.syncLocation();
  walk.resetHistory();
}

function safePath(nav, from, to, deck) {
  const count = Math.max(1, Math.ceil(Math.hypot(to[0] - from[0], to[1] - from[1]) / 0.08));
  for (let step = 0; step <= count; step++) {
    const t = step / count;
    if (!nav.floorSafe(from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t, deck)) return false;
  }
  return true;
}

export function createEquipmentTour() {
  let current = null;
  function stop(undo = false) {
    const session = current;
    if (!session) return;
    current = null;
    cancelAnimationFrame(session.frame);
    session.listeners.abort();
    session.shade.remove();
    session.panel.remove();
    if (undo && session.entered) restore(session.walk, session.origin);
  }

  function start(id, minimize) {
    const app = window.__app;
    const view = locateEquipment(app, equipment.find(part => part.id === id));
    if (!view) return false;
    stop();
    const walk = app.yachtWalk;
    const { nav } = walk;
    const origin = snapshot(walk);
    const shade = document.createElement('div');
    shade.className = 'ldm-tour-shade';
    const panel = document.createElement('div');
    panel.className = 'ldm-tour-panel';
    const label = document.createElement('span');
    label.setAttribute('role', 'status');
    label.textContent = view.entry.name + ' · daño reportado';
    const back = document.createElement('button');
    back.type = 'button';
    back.textContent = 'Volver a la vista anterior';
    panel.append(label, back);
    const listeners = new AbortController();
    const session = current = { walk, origin, listeners, panel, shade, frame: 0, entered: false };
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const sameRoom = walk.active && nav.location()?.id === view.room.id && !nav.stair &&
      safePath(nav, origin.position, view.entry.eye, view.room.deck);
    const fade = !sameRoom && !reduced ? 260 : 0;
    const duration = reduced ? 0 : 1550;
    let from, yaw, pitch, started;
    function frame(now) {
      if (session !== current) return;
      try {
        started ??= now;
        const elapsed = now - started;
        if (elapsed < fade) {
          shade.style.opacity = String(smooth(elapsed / fade));
        } else {
          if (!session.entered) {
            if (!sameRoom && !walk.enterRoom(view.room.id)) { stop(); return; }
            session.entered = true;
            from = [...nav.position];
            if (!safePath(nav, from, view.entry.eye, view.room.deck)) { stop(true); return; }
            yaw = walk.yaw;
            pitch = walk.pitch;
          }
          const t = duration ? smooth(Math.min(1, (elapsed - fade) / duration)) : 1;
          const [x, y] = view.entry.eye;
          nav.position = [from[0] + t * (x - from[0]), from[1] + t * (y - from[1])];
          nav.elevation = nav.floorHeight(...nav.position);
          walk.applyPosition();
          const direction = view.target.clone().sub(app.camera.position);
          walk.yaw = turn(yaw, Math.atan2(-direction.x, -direction.z), t);
          const endPitch = Math.atan2(direction.y, Math.hypot(direction.x, direction.z));
          walk.pitch = pitch + (Math.max(-1.35, Math.min(1.35, endPitch)) - pitch) * t;
          app.camera.rotation.set(walk.pitch, walk.yaw, 0, 'YXZ');
          shade.style.opacity = fade ? String(1 - Math.min(1, (elapsed - fade) / fade)) : '0';
          if (t === 1) {
            shade.remove();
            walk.controls?.syncLocation();
            walk.resetHistory();
            return;
          }
        }
        session.frame = requestAnimationFrame(frame);
      } catch { stop(true); }
    }

    minimize();
    walk.controls?.clearInput();
    document.body.append(shade, panel);
    const opts = { capture: true, signal: listeners.signal };
    window.addEventListener('pointerdown', event => { if (!panel.contains(event.target)) stop(); }, opts);
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); stop(true); }
      else if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) stop();
    }, opts);
    back.addEventListener('click', () => stop(true), { signal: listeners.signal });
    window.addEventListener('pagehide', () => stop(), { signal: listeners.signal });
    session.frame = requestAnimationFrame(frame);
    return true;
  }
  return { start, stop };
}
