import { loadTerrace, connectTerrace } from './aft-terrace.js?v=bridge-access-1';
import { connectSternAccess, configureSternWalk } from './stern-access.js?v=bridge-access-1';
import { A as Group } from '../assets/common-HBn3Movl.js';
export { preloadSaloon } from './main-saloon.js?v=bridge-access-1';
import {
  createBoarding, createSternFeatures, createFinishes, findBerth, l as yachtBasis,
} from '../assets/RochaYachtState-P5KwIGIl.js';

// Reuse boarding and stern assemblies, plus the pre-extracted furnished terrace.
export async function buildGangway(world) {
  const terrace = await loadTerrace();
  const record = findBerth(world);
  const group = new Group();
  group.position.fromArray(record.position);
  group.rotation.y = record.yaw;
  group.userData = { yacht: yachtBasis, record };
  const materials = createFinishes(record.position[1], true, true, true, true);
  const model = { group, record };
  const lake = world.waterBodies.find(body => body.id === record.lakeId);
  const stern = createSternFeatures();
  const bounds = stern.nameBounds;
  const lettering = bounds.slice(0,3).map((min,i) => (min+bounds[i+3])/2);
  const boarding = createBoarding(model, lake, { gangwayOnly: true, includeLanding: true, sternParts: stern.parts, terraceParts: terrace.parts, materials });
  const { start, y, height, layout } = boarding;
  const footClearance = .18;
  boarding.room = {
    ...boarding.room, name: 'Pasarela', displayName: 'Pasarela', spawn: [start + footClearance, y, height(start + footClearance) + 1.6],
    look: lettering,
  };
  connectTerrace(boarding, terrace, stern.access.starboard.upperFloor);
  Object.assign(model, {
    transom:stern, terrace, boarding, meshes: boarding.meshes, stats: boarding.stats,
    asset: { data: { rooms: [terrace.room,stern.access.starboard.room], meshes: [],
      levels: { MD: layout.deckHeight, SP: stern.access.starboard.lowerHeight } } },
    // All geometry in this view is static and always eligible for drawing.
    updateVisibility() {},
    dispose() {
      boarding.dispose();
      group.removeFromParent();
      materials.opaque.dispose();
      materials.glass.dispose();
    },
  });
  model.sternAccess = connectSternAccess(model);
  return model;
}

export function configureWalk(walk) {
  configureSternWalk(walk);
  const controls = walk.controls;
  if (!controls) return;
  controls.sun.closest('label').hidden = true;
  for (const button of controls.root.querySelectorAll('[data-deck]')) {
    button.hidden = !['MD','SP'].includes(button.dataset.deck);
  }
  controls.root.querySelector('[data-nav-note]').textContent = 'Recorre la terraza y baja por la escalera de estribor hasta la plataforma de baño.';
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
  const reset=() => {
    since = undefined;
    frames = 0;
    label.textContent = '— fps';
  };
  doc.addEventListener('visibilitychange', reset);
  const meter=now => {
    if (doc.hidden) return;
    if (since === undefined) { since = now; return; }
    frames++;
    const elapsed = now - since;
    if (elapsed < 1000) return;
    label.textContent = (frames * 1000 / elapsed).toFixed(1) + ' fps';
    since = now;
    frames = 0;
  };
  meter.reset=reset;
  return meter;
}
