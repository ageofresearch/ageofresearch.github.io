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
      damageTarget: { type: 'string', enum: ['none', ...equipment.map(part => part.id)] },
    },
    required: ['answer', 'damageTarget'],
  },
};
export const damageInstructions = [
  'Devuelve answer y damageTarget. Usa damageTarget solo si en este turno el usuario reporta un daño presente o pregunta por un daño reportado y tu respuesta identifica inequívocamente un único equipo del catálogo.',
  'Usa none para hipótesis, negaciones, averías reparadas, preguntas generales, citas, varios equipos o un equipo sin vista. Una orden de mover la cámara por sí sola no es un reporte.',
  'Si dice «un motor» sin identificar cuál, pregunta cuál en answer y usa none. No deduzcas babor solo porque sea el único motor del catálogo. No sustituyas una pieza desconocida por otra.',
  'Catálogo: ' + equipment.map(part => part.id + ' = ' + part.name).join(', '),
].join('\n');

// The schema has just two string properties. Decode only the answer string as
// it streams, retaining incomplete escape sequences until the next SSE chunk.
export function streamingAnswer(json) {
  const header = /^\s*\{\s*(?:"damageTarget"\s*:\s*"[\w-]+"\s*,\s*)?"answer"\s*:\s*"/.exec(json);
  if (!header) return '';
  const fragment = /^(?:[^"\\\x00-\x1f]|\\(?:["\\/bfnrt]|u[\da-fA-F]{4}))*/.exec(json.slice(header[0].length))[0];
  return JSON.parse('"' + fragment + '"').replace(/[\uD800-\uDBFF]$/, '');
}
