import { A as Group } from '../assets/common-HBn3Movl.js';
import {
  createBoarding, createFinishes, findBerth, l as yachtBasis,
} from '../assets/RochaYachtState-P5KwIGIl.js';

// The original boarding generator also builds a pier and a cockpit landing.
// Request only its telescopic sections, handrails, sockets and guard lines.
export function buildGangway(world) {
  const record = findBerth(world);
  const group = new Group();
  group.position.fromArray(record.position);
  group.rotation.y = record.yaw;
  group.userData = { yacht: yachtBasis, record };
  const materials = createFinishes(record.position[1], true, true, true, true);
  const model = { group, record };
  const lake = world.waterBodies.find(body => body.id === record.lakeId);
  const boarding = createBoarding(model, lake, { gangwayOnly: true, materials });
  const { start, end, y, width, height, layout } = boarding;
  const footClearance = .18;
  boarding.walkEnd = end - footClearance;
  boarding.safe = (x, across, radius = .14) =>
    x >= start + radius && x <= end - radius && Math.abs(across - y) <= width / 2 - radius;
  boarding.room = {
    ...boarding.room, name: 'Pasarela', displayName: 'Pasarela', spawn: [start + footClearance, y, height(start + footClearance) + 1.6],
    look: [end, y, height(end) + .95],
  };
  Object.assign(model, {
    boarding, meshes: boarding.meshes, stats: boarding.stats,
    asset: { data: { rooms: [], meshes: [], levels: { MD: layout.deckHeight } } },
    // All geometry in this view is static and always eligible for drawing.
    updateVisibility() {},
    dispose() {
      boarding.dispose();
      group.removeFromParent();
      materials.opaque.dispose();
      materials.glass.dispose();
    },
  });
  return model;
}

export function configureWalk(walk) {
  const { boarding } = walk.model;
  const nav = walk.nav;
  nav.routes = [];
  nav.floorSafe = (x, y, deck = nav.deck) => deck === boarding.room.deck && boarding.safe(x, y, nav.radius);
  nav.location = () => boarding.room;
  const controls = walk.controls;
  if (!controls) return;
  controls.sun.closest('label').hidden = true;
  for (const button of controls.root.querySelectorAll('[data-deck]')) {
    button.hidden = button.dataset.deck !== boarding.room.deck;
  }
  controls.root.querySelector('[data-nav-note]').textContent = 'La prueba muestra solo la pasarela de Luz de Mar.';
}

export function addFullYachtControl(app) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'luz-resume';
  button.textContent = 'Explorar el yate completo';
  const controls = app.yachtWalk.controls;
  controls.menu.querySelector('footer').append(button);
  button.addEventListener('click', async () => {
    button.disabled = true;
    button.textContent = 'Cargando el yate…';
    try { await app.loadFullYacht(); }
    catch {
      button.textContent = 'Reintentar cargar el yate';
      button.disabled = false;
    }
  });
}

// Count submitted scene frames over wall time. The engine clamps its simulation
// step to 100 ms, which would otherwise report at least 10 fps during slow frames.
export function createFrameMeter(label, doc = document) {
  let since, frames = 0;
  doc.addEventListener('visibilitychange', () => {
    since = undefined;
    frames = 0;
    label.textContent = '— fps';
  });
  return now => {
    if (doc.hidden) return;
    if (since === undefined) { since = now; return; }
    frames++;
    const elapsed = now - since;
    if (elapsed < 1000) return;
    label.textContent = (frames * 1000 / elapsed).toFixed(1) + ' fps';
    since = now;
    frames = 0;
  };
}
