import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { A as Group } from '../site/tidewater-rocha/assets/common-HBn3Movl.js';
import { createBoarding, createFinishes, createSternFeatures, l as basis } from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { decodeGuestAccess } from '../site/tidewater-rocha/mobile/guest-access.js';

const reference = JSON.parse(await readFile(new URL('./fixtures/yacht-gangway-vr-landmarks.json', import.meta.url)));
const { sleeve } = JSON.parse(await readFile(new URL('./fixtures/yacht-gangway-vr-steel.json', import.meta.url)));
const dot = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);

function camera({ xyz, heading, pitch, roll }, [w, h], fov) {
  const focal = h / 2 / Math.tan(fov * Math.PI / 360);
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

const projectRails = camera(reference.camera, reference.size, reference.panoView.verticalFov);
const canopy = createSternFeatures().parts.find(part => part.feature === 'beach club dark rolled canopy edge');
const landingTips = [
  { side: -1, section: 0, x: 1.30, y: 2.659 },
  { side: -1, section: 1, x: 2.62, y: 2.659 },
  { side: 1, section: 0, x: 1.31, y: 3.541 },
  { side: 1, section: 1, x: 2.91, y: 3.541 },
];

function checkCanopyHeight(vertices, { x, y, side, section }) {
  const local = vertices.filter(([xx, yy]) => Math.abs(xx - x) < .028 && Math.abs(yy - y) < .045);
  assert.ok(local.length >= 6, `Missing tip of gangway handrail ${side} ${section}`);
  const top = Math.max(...local.map(([, , z]) => z));
  assert.ok(Math.abs(top - canopy.bounds[5]) < .005,
    `Gangway handrail ${side} ${section} ends at ${top.toFixed(3)} m; the canopy is at ${canopy.bounds[5].toFixed(3)} m`);
}
const tipPose = sleeve.pose;
const tipDirection = tipPose.target.map((value, axis) =>
  (value - tipPose.xyz[axis]) * [basis.sx, basis.sy, 1][axis]);
const projectTip = camera({
  xyz: tipPose.xyz,
  heading: Math.atan2(tipDirection[1], tipDirection[0]),
  pitch: Math.atan2(tipDirection[2], Math.hypot(...tipDirection.slice(0, 2))),
  roll: tipPose.roll,
}, sleeve.size, tipPose.fov);

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

function outlines(parts, project = projectRails) {
  return new Map(parts.map(({ feature, vertices, indices }) => {
    const tris = [];
    for (let i = 0; i < indices.length; i += 3) {
      const triangle = Array.from(indices.slice(i, i + 3), index => {
        const offset = index * 6;
        return project(...vertices.slice(offset, offset + 3));
      });
      if (triangle.every(Boolean)) tris.push(triangle);
    }
    return [feature.slice('gangway '.length), tris];
  }));
}

function crossSection(triangles, axis, at) {
  const crossings = [];
  for (const triangle of triangles) {
    for (let i = 0; i < 3; i++) {
      const start = triangle[i], end = triangle[(i + 1) % 3];
      const span = end[axis] - start[axis];
      if (span === 0) continue;
      const t = (at - start[axis]) / span;
      if (t >= 0 && t <= 1) crossings.push(start[1 - axis] + (end[1 - axis] - start[1 - axis]) * t);
    }
  }
  return crossings;
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

function checkTip(triangles) {
  for (const [x, upper, lower] of sleeve.tipScans) {
    const ys = crossSection(triangles, 0, x);
    assert.ok(ys.length, `Missing tip at x=${x} in the Beach Club view`);
    assert.ok(Math.abs(Math.min(...ys) - upper) <= 7 && Math.abs(Math.max(...ys) - lower) <= 7,
      `Tip at x=${x} has edges ${Math.min(...ys)}, ${Math.max(...ys)} instead of ${upper}, ${lower}`);
  }
}

for (const mode of ['mobile', 'map']) {
  test(mode === 'mobile' ? 'mobile: every handrail tip ends at the top of the Beach Club canopy' :
    'map: the rail mesh reaches the VR silhouette and preserves its openings', () => {
    const group = new Group();
    group.userData.isolatedBerth = true;
    const materials = createFinishes(0, true, true, true, true);
    const boarding = createBoarding({ group }, null, { gangwayOnly: mode === 'mobile', includeLanding: true, materials });
    try {
      const visibleParts = boarding.parts.filter(p => /^gangway (?:top handrail|.* upright)/.test(p.feature));
      if (mode === 'mobile') {
        for (const tip of landingTips) {
          const { vertices } = visibleParts.find(p => p.feature === `gangway top handrail ${tip.side} ${tip.section}`);
          const points = Array.from({ length: vertices.length / 6 }, (_, i) => vertices.slice(i * 6, i * 6 + 3));
          checkCanopyHeight(points, tip);
        }
        const firstSection = boarding.parts.filter(p => /^(?:telescopic section|section) 1\b/.test(p.feature));
        checkTip([...outlines(firstSection, projectTip).values()].flat());
      } else {
        const shapes = outlines(visibleParts);
        checkLandmarks(part => shapes.get(part) ?? []);
        checkOpenings([...shapes.values()].flat());
      }
    } finally {
      boarding.dispose();
      materials.opaque.dispose();
      materials.glass.dispose();
    }
  });
}

test('every downloaded mobile profile retains the handrail tips at the canopy elevation', async () => {
  const zone = new URL('../site/tidewater-rocha/mobile/guest-access', import.meta.url);
  const manifest = JSON.parse(await readFile(new URL(zone.href + '.json')));
  const bytes = await readFile(new URL(zone.href + '.bin'));
  const { profiles } = decodeGuestAccess(manifest, bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  for (const profile of Object.values(profiles)) {
    const { indices, attributes: { position, aSurface } } = profile.batches[0];
    const rails = [];
    for (const i of new Set(indices)) {
      const [roughness, metalness, finish] = aSurface.subarray(i * 4, i * 4 + 3);
      if (Math.abs(roughness - .095) >= .0001 || metalness !== 1 || finish !== 5) continue;
      const [lateral, elevation, longitudinal] = position.subarray(i * 3, i * 3 + 3);
      rails.push([(longitudinal + basis.length / 2) / basis.sx, lateral / basis.sy, elevation + basis.seaReference]);
    }
    for (const tip of landingTips) checkCanopyHeight(rails, tip);
    assert.equal(profile.batches.length, 2);
    assert.ok(profile.triangles <= 25000);
  }

  // The nose calibration remains independent of the height of the rails.
  const { indices, attributes: { position } } = profiles.exterior.batches[0];
  const tipVertices = new Map();
  for (let i = 0; i < position.length / 3; i++) {
    const [lateral, elevation, longitudinal] = position.subarray(i * 3, i * 3 + 3);
    const x = (longitudinal + basis.length / 2) / basis.sx;
    const y = lateral / basis.sy;
    if (x >= -4.72 && x <= -2.88 && Math.abs(y - 3.1) < .49 && elevation > 1.89 && elevation < 2.275) {
      tipVertices.set(i, projectTip(x, y, elevation + basis.seaReference));
    }
  }
  const noseTriangles = [];
  for (let i = 0; i < indices.length; i += 3) {
    const [a, b, c] = indices.subarray(i, i + 3);
    if (tipVertices.has(a) && tipVertices.has(b) && tipVertices.has(c)) {
      noseTriangles.push([tipVertices.get(a), tipVertices.get(b), tipVertices.get(c)]);
    }
  }
  checkTip(noseTriangles);
});
