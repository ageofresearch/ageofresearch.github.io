import { equipment, locateEquipment } from './equipment.js';
import { planRoute, trackFor } from './tour-route.js';

const smooth = t => t * t * (3 - 2 * t);
const angle = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));
const clamp = (n, low, high) => Math.max(low, Math.min(high, n));

function worldEye(walk, p) {
  const { group } = walk.model;
  const basis = group.userData.yacht;
  const local = walk.app.camera.position.clone().set(p.y * basis.sy, p.h + walk.eyeHeight - basis.seaReference,
    p.x * basis.sx - basis.length / 2);
  return group.localToWorld(local);
}

function snapshot(walk) {
  const { nav, app } = walk;
  return {
    deck: nav.deck, room: nav.room, stair: nav.stair && { ...nav.stair }, position: [...nav.position],
    elevation: nav.elevation, yaw: walk.yaw, pitch: walk.pitch, camera: app.camera.position.clone(),
    exteriorOpen: walk.model.serviceAccess?.door.open, interiorOpen: walk.model.machinery?.door.open,
  };
}

function restoreDoors(walk, origin) {
  const pos = walk.nav.position;
  if (origin.exteriorOpen === false) walk.model.setServiceEntrance(false, pos);
  if (origin.interiorOpen === false) walk.model.setServiceDoor(false, pos);
}

export function createEquipmentTour(chatRoot) {
  let current = null;
  function stop() {
    const s = current;
    if (!s) return;
    current = null;
    cancelAnimationFrame(s.frame);
    s.listeners.abort();
    s.panel.remove();
    restoreDoors(s.walk, s.origin);
  }

  function start(id) {
    const app = window.__app;
    const view = locateEquipment(app, equipment.find(part => part.id === id));
    if (!view || !app.yachtWalk.active) return false;
    stop();
    const walk = app.yachtWalk, nav = walk.nav;
    const origin = snapshot(walk);
    walk.model.setServiceEntrance?.(true);
    walk.model.setServiceDoor?.(true);
    let path;
    try { path = planRoute(walk, view.room, view.entry.eye); }
    finally { if (!path) restoreDoors(walk, origin); }
    if (!path) return false;

    const track = trackFor(path);
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
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
    const session = current = { walk, origin, listeners, panel, frame: 0 };
    const startEye = worldEye(walk, path[0]);
    const verticalOffset = origin.camera.y - startEye.y;
    let distance = 0, startAt = 0, elapsed = 0, lastTime, returning = false;
    const seconds = len => Math.max(1.4, len / (reduced ? 1.8 : 2.6));
    function frame(now) {
      if (current !== session) return;
      try {
        // Do not jump ahead on a late frame or when resuming a background tab.
        const dt = clamp((now - (lastTime ?? now)) / 1000, 0, 0.05);
        lastTime = now;
        const goal = returning ? 0 : track.length;
        const progress = Math.min(1, (elapsed += dt) / seconds(Math.abs(goal - startAt)));
        distance = startAt + (goal - startAt) * smooth(progress);
        if (dt > 0) {
          const p = track.sample(distance);
          const end = progress === 1;
          const atOrigin = end && returning;
          nav.position = [p.x, p.y];
          nav.deck = atOrigin ? origin.deck : p.deck;
          nav.stair = atOrigin ? origin.stair : p.route ? { route: p.route, d: p.d } : null;
          nav.elevation = p.h + verticalOffset * (1 - smooth(Math.min(1, distance / 0.9)));
          walk.applyPosition();
          if (end) nav.room = returning ? origin.room : view.room;
          const lookAhead = track.sample(clamp(distance + (returning ? -1 : 1) * 1.2, 0, track.length));
          const gaze = worldEye(walk, lookAhead).sub(app.camera.position);
          const yawOf = v => Math.atan2(-v.x, -v.z);
          const pitchOf = v => clamp(Math.atan2(v.y, Math.hypot(v.x, v.z)), -1.35, 1.35);
          const finalLook = view.target.clone().sub(app.camera.position);
          const finalYaw = returning ? origin.yaw : yawOf(finalLook);
          const finalPitch = returning ? origin.pitch : pitchOf(finalLook);
          const blend = smooth(1 - Math.min(1, Math.abs(goal - distance) / 1.7));
          const heading = end ? finalYaw : yawOf(gaze) + angle(yawOf(gaze), finalYaw) * blend;
          const tilt = end ? finalPitch : pitchOf(gaze) + (finalPitch - pitchOf(gaze)) * blend;
          const rate = reduced ? 1.35 : 2.25;
          const easeAngle = error => clamp(error * (1 - Math.exp(-5 * dt)), -rate * dt, rate * dt);
          walk.yaw += easeAngle(angle(walk.yaw, heading));
          walk.pitch += easeAngle(tilt - walk.pitch);
          app.camera.rotation.set(walk.pitch, walk.yaw, 0, 'YXZ');
          walk.controls?.syncLocation();
          if (end && Math.abs(angle(walk.yaw, heading)) + Math.abs(walk.pitch - tilt) < 0.001) {
            if (returning) {
              nav.elevation = origin.elevation;
              stop();
            }
            return;
          }
        }
        session.frame = requestAnimationFrame(frame);
      } catch { stop(); }
    }

    function goBack() {
      if (returning) return;
      cancelAnimationFrame(session.frame);
      if (distance === 0 && elapsed === 0) { stop(); return; }
      returning = true; startAt = distance; elapsed = 0; lastTime = undefined;
      back.disabled = true;
      session.frame = requestAnimationFrame(frame);
    }
    walk.controls?.clearInput();
    document.body.append(panel);
    const opts = { capture: true, signal: listeners.signal };
    window.addEventListener('pointerdown', event => {
      const path = event.composedPath();
      if (!path.includes(chatRoot) && !path.includes(panel)) stop();
    }, opts);
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !event.composedPath().includes(chatRoot)) {
        event.preventDefault(); event.stopImmediatePropagation(); goBack();
      }
    }, opts);
    // Movement keys reach the renderer and cancel the tour only when chat lets them bubble.
    window.addEventListener('keydown', event => {
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) stop();
    }, { signal: listeners.signal });
    back.addEventListener('click', goBack, { signal: listeners.signal });
    window.addEventListener('pagehide', stop, { signal: listeners.signal });
    session.frame = requestAnimationFrame(frame);
    return true;
  }
  return { start, stop };
}
