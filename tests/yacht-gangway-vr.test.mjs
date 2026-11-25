import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { A as Group } from '../site/tidewater-rocha/assets/common-HBn3Movl.js';
import { createBoarding, createFinishes, l as basis } from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { decodeGuestAccess } from '../site/tidewater-rocha/mobile/guest-access.js';

const reference = JSON.parse(await readFile(new URL('./fixtures/yacht-gangway-vr-landmarks.json', import.meta.url)));
const dot = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);

function camera() {
  const { xyz, heading, pitch, roll } = reference.camera;
  const [w, h] = reference.size;
  const focal = h / 2 / Math.tan(reference.panoView.verticalFov * Math.PI / 360);
  const along = [Math.cos(heading), Math.sin(heading), 0];
  const right = [along[1], -along[0], 0];
  const up = along.map((v, i) => i === 2 ? Math.cos(pitch) : -v * Math.sin(pitch));
  const forward = along.map((v, i) => i === 2 ? Math.sin(pitch) : v * Math.cos(pitch));
  const u = right.map((v, i) => v * Math.cos(roll) + up[i] * Math.sin(roll));
  const v = up.map((n, i) => n * Math.cos(roll) - right[i] * Math.sin(roll));
  return (x, y, z) => {
    const p = [(x - xyz[0]) * basis.sx, (y - xyz[1]) * basis.sy, z - xyz[2]];
    const d = dot(p, forward);
    return [w / 2 + focal * dot(p, u) / d, h / 2 - focal * dot(p, v) / d];
  };
}

const side = ([x, y], [a, b], [c, d]) => (c - a) * (y - b) - (d - b) * (x - a);

function distanceToTriangle(p, triangle) {
  const values = triangle.map((a, i) => side(p, a, triangle[(i + 1) % 3]));
  if (values.every(v => v > 0) || values.every(v => v < 0)) return 0;
  return Math.min(...triangle.map(([x, y], i) => {
    const [xx, yy] = triangle[(i + 1) % 3], dx = xx - x, dy = yy - y;
    const t = Math.max(0, Math.min(1, ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy || 1)));
    return Math.hypot(p[0] - x - t * dx, p[1] - y - t * dy);
  }));
}

function outlines(parts) {
  const project = camera();
  return new Map(parts.map(({ feature, vertices, indices }) => {
    const tris = [];
    for (let i = 0; i < indices.length; i += 3) {
      tris.push(Array.from(indices.slice(i, i + 3), index => {
        const offset = index * 6;
        return project(...vertices.slice(offset, offset + 3));
      }));
    }
    return [feature.slice('gangway '.length), tris];
  }));
}

function measure(triangles, x, y) {
  return triangles.reduce((min, triangle) => Math.min(min, distanceToTriangle([x, y], triangle)), Infinity);
}

function checkLandmarks(select) {
  const offsets = [];
  for (const [part, label, x, y, tolerance] of reference.points) {
    const distance = measure(select(part), x, y);
    if (distance > tolerance) offsets.push(`${part} ${label}: ${distance.toFixed(1)} px (limit ${tolerance})`);
  }
  assert.deepEqual(offsets, []);
}

function checkOpenings(triangles) {
  for (const [label, x, y, margin] of reference.clear) {
    assert.ok(measure(triangles, x, y) >= margin, label);
  }
}

for (const mode of ['mobile', 'map']) {
  test(`${mode}: the actual rail mesh reaches the VR silhouette and preserves its openings`, () => {
    const group = new Group();
    group.userData.isolatedBerth = true;
    const materials = createFinishes(0, true, true, true, true);
    const boarding = createBoarding({ group }, null, { gangwayOnly: mode === 'mobile', includeLanding: true, materials });
    try {
      const visibleParts = boarding.parts.filter(p => /^gangway (?:top handrail|.* upright)/.test(p.feature));
      const shapes = outlines(visibleParts);
      checkLandmarks(part => shapes.get(part) ?? []);
      checkOpenings([...shapes.values()].flat());
    } finally {
      boarding.dispose();
      materials.opaque.dispose();
      materials.glass.dispose();
    }
  });
}

test('the downloaded mobile exterior profile preserves the reference through mesh optimization', async () => {
  const zone = new URL('../site/tidewater-rocha/mobile/guest-access', import.meta.url);
  const manifest = JSON.parse(await readFile(new URL(zone.href + '.json')));
  const bytes = await readFile(new URL(zone.href + '.bin'));
  const { profiles } = decodeGuestAccess(manifest, bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  const { indices, attributes: { position, aSurface } } = profiles.exterior.batches[0];
  const project = camera();
  const railVertices = new Map();
  for (let i = 0; i < position.length / 3; i++) {
    const [lateral, elevation, longitudinal] = position.subarray(i * 3, i * 3 + 3);
    const x = (longitudinal + basis.length / 2) / basis.sx;
    const y = lateral / basis.sy;
    const [roughness, metalness, finish] = aSurface.subarray(i * 4, i * 4 + 3);
    if (x >= -4.51 && x < 3 && Math.abs(Math.abs(y - 3.1) - .44) < .05 &&
        Math.abs(roughness - .095) < .0001 && metalness === 1 && finish === 5) {
      railVertices.set(i, project(x, y, elevation + basis.seaReference));
    }
  }
  const triangles = [];
  const seen = new Set();
  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i], b = indices[i + 1], c = indices[i + 2];
    if (!(railVertices.has(a) && railVertices.has(b) && railVertices.has(c))) continue;
    const key = [a, b, c].join(',');
    if (seen.has(key)) continue;
    seen.add(key);
    triangles.push([railVertices.get(a), railVertices.get(b), railVertices.get(c)]);
  }
  checkLandmarks(() => triangles);
  checkOpenings(triangles);
  assert.equal(profiles.exterior.batches.length, 2);
  assert.ok(profiles.exterior.triangles <= 25000);
});
