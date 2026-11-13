// Stable IDs and bounds come from rocha/luz-de-mar/model.json. Eye positions use
// the same longitudinal/transverse coordinates as the yacht walking controller.
export const equipment = Object.freeze([
  { id: 'LD_MAC_001', name: 'Motor de babor', room: 'LD_R02', eye: [9.22, 0] },
]);

export function locateEquipment(app, entry) {
  const walk = app?.yachtWalk;
  if (!entry || !walk || !app.waterEnabled || app.terrainData?.surveyed) return null;
  const { model, nav } = walk;
  if (!model?.group?.userData?.yacht || !nav?.floorSafe) return null;
  const mesh = model.asset.data.meshes.find(mesh => mesh.id === entry.id);
  const room = model.asset.data.rooms.find(room => room.id === entry.room);
  if (!mesh || !room || !nav.floorSafe(...entry.eye, room.deck)) return null;
  const bounds = mesh.bbox;
  const basis = model.group.userData.yacht;
  if (!Array.isArray(bounds) || bounds.length !== 6 || !bounds.every(Number.isFinite)) return null;
  const [along, across, height] = bounds.slice(0, 3).map((value, i) => (value + bounds[i + 3]) / 2);
  const point = app.camera.position.clone().set(across * basis.sy, height - basis.seaReference, along * basis.sx - basis.length / 2);
  return { entry, room, target: model.group.localToWorld(point) };
}

export const damageFormat = {
  type: 'text', mime_type: 'application/json',
  schema: {
    type: 'object',
    properties: {
      answer: { type: 'string', description: 'Respuesta visible a la pregunta, en español.' },
      damageTarget: {
        type: 'string', enum: ['none', ...equipment.map(part => part.id)],
        description: 'ID del único equipo que answer identifica con una avería reportada sin cierre conocido. En los demás casos, none.',
      },
    },
    required: ['answer', 'damageTarget'],
  },
};
export const damageInstructions = [
  'Redacta answer según el contexto y el historial. A continuación elige damageTarget por lo que comunica esa respuesta, aunque la pregunta sea general o indirecta.',
  'Si answer informa de una avería reportada sin cierre conocido e identifica un solo equipo afectado, devuelve su ID del catálogo. Atribuir el reporte a su fuente, carecer de verificación a bordo o desconocer la pieza interna no invalida la identificación del equipo.',
  'Usa none si answer solo plantea una hipótesis, niega el daño, describe una avería ya reparada o menciona un equipo sin atribuirle una avería reportada. También usa none si hay varios equipos afectados, falta identificar el equipo o este no tiene vista en el catálogo.',
  'Ante un reporte nuevo y ambiguo, pide identificar el equipo y usa none. No asignes el único equipo del catálogo por descarte. Si el usuario pide solo texto o pide que no se mueva la cámara, usa none.',
  'Catálogo: ' + equipment.map(part => part.id + ' = ' + part.name).join(', '),
].join('\n');

// Only select candidates for a semantic review. A name match never starts a tour.
function searchable(text) {
  return ' ' + text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ').trim() + ' ';
}
export function mentionedEquipment(answer, catalog = equipment) {
  const words = searchable(answer);
  return catalog.filter(part => [part.name, ...(part.aliases || [])].some(name => words.includes(searchable(name))));
}

// The schema has just two string properties. Decode only the answer string as
// it streams, retaining incomplete escape sequences until the next SSE chunk.
export function streamingAnswer(json) {
  const header = /^\s*\{\s*(?:"damageTarget"\s*:\s*"[\w-]+"\s*,\s*)?"answer"\s*:\s*"/.exec(json);
  if (!header) return '';
  const fragment = /^(?:[^"\\\x00-\x1f]|\\(?:["\\/bfnrt]|u[\da-fA-F]{4}))*/.exec(json.slice(header[0].length))[0];
  return JSON.parse('"' + fragment + '"').replace(/[\uD800-\uDBFF]$/, '');
}
