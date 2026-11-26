import { readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { MeshoptSimplifier as simplify } from './node_modules/meshoptimizer/index.js';
import {
  buildYachtGeometry, createBoarding, createSternFeatures, l as basis,
} from '../../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { renderedParts } from '../../site/tidewater-rocha/mobile/stair-surfaces.js';
import { normalizeRenderedPart } from '../build-yacht-saloon.mjs';
import { gangwayTeak } from '../../site/tidewater-rocha/mobile/gangway-finish.js';
import { buildTree, ray } from './daylight-transfer.mjs';

const root = new URL('../../site/tidewater-rocha/', import.meta.url);
const data = JSON.parse(await readFile(new URL('rocha/luz-de-mar/model.json', root)));
const bytes = await readFile(new URL('rocha/luz-de-mar/model.bin', root));
const asset = { data, binary: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) };
await simplify.ready;
const model = buildYachtGeometry(asset, 0, { mtuEngines: false, seaStrainers: false });
model.asset = asset;
const stern = createSternFeatures({ mobile: true }).parts;
const boarding = createBoarding(model, null, { gangwayOnly: true, includeLanding: true });

const sternSurface = /^(full width|transom (?:port|starboard)|port stair (?:landing|sponson|recessed|inboard|moulded)|beach club (?:aft-facing|warm timber|central satin|swept jamb|timber soffit|canopy|dark rolled)|starboard upper landing|aft teak floor)/;
const boardingSurface = /(?:teak inset|teak boarding landing|teak cockpit threshold|teak landing lip|timber border)/;
const hull = renderedParts(model).filter(({ id, feature }) => id.includes('stair-opening') ||
  /^cockpit ceiling (satin panel field|rounded exterior fascia|moulded stair reveal)$/.test(feature || '') ||
  id.startsWith('MD/boarding-route/') && /coaming|recess lower ledge/.test(feature) ||
  id.startsWith('MD/transom/retained-hull'));
const parts = [...hull, ...stern.filter(p => sternSurface.test(p.feature)),
  ...boarding.parts.filter(p => boardingSurface.test(p.feature))];
const volume = [[-5, -4.15, basis.seaReference], [8, 4.15, 6.3]];
const toLocal = ([x, y, z]) => [y * basis.sy, z - basis.seaReference, x * basis.sx - basis.length / 2];
const minus = (a, b) => a.map((v, k) => v - b[k]);
const byteToLinear = shift => {
  const c = shift / 255;
  return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
};

const faces = [];
for (const source of parts) {
  const part = normalizeRenderedPart(source, model);
  if (part.glass || !part.indices.length) continue;
  const positions = Float32Array.from(part.vertices.filter((_, i) => i % 6 < 3));
  const point = index => Array.from(positions.subarray(index * 3, index * 3 + 3));
  const indices = [];
  for (let i = 0; i < part.indices.length; i += 3) {
    const tri = part.indices.slice(i, i + 3);
    const vertices = tri.map(point);
    if (volume[0].some((low, axis) => vertices.every(p => p[axis] < low) ||
      vertices.every(p => p[axis] > volume[1][axis]))) continue;
    indices.push(...tri);
  }
  if (!indices.length) continue;
  const weld = simplify.generatePositionRemap(positions, 3);
  const [reduced] = simplify.simplify(Uint32Array.from(indices, i => weld[i]), positions, 3,
    Math.min(indices.length, Math.max(48, Math.floor(indices.length * .35 / 3) * 3)), .025,
    ['ErrorAbsolute', 'Permissive']);
  const color = [16, 8, 0].map(n => byteToLinear((part.finish[0] >> n) & 255));
  for (let i = 0; i < reduced.length; i += 3) {
    const [a, b, c] = Array.from(reduced.slice(i, i + 3), index => toLocal(point(index)));
    const lo = a.map((value, k) => Math.min(value, b[k], c[k]));
    const hi = a.map((value, k) => Math.max(value, b[k], c[k]));
    faces.push({ a, u: minus(b, a), v: minus(c, a), lo, hi, center: a.map((v, k) => (v + b[k] + c[k]) / 3), color });
  }
}

// Store the first triangle's linear albedo, normal and distance at every
// direction. Adjacent stations supply continuous parallax along the panels.
const size = 36;
const stations = 13;
const stationPoints = [];
for (const side of [-1, 1]) for (let section = 0; section < 3; section++) {
  const [first, last] = gangwayTeak.breaks.slice(section, section + 2);
  const channel = boarding.parts.find(p => p.feature === `section ${section + 1} inset side channel ${side}`);
  const lateral = side < 0 ? channel.bounds[1] : channel.bounds[4];
  for (let i = 0; i < stations; i++) {
    const x = first + (last - first) * i / (stations - 1);
    stationPoints.push(toLocal([x, lateral, boarding.height(x) - .078]));
  }
}
const tree = buildTree(faces);
const direction = (x, z) => {
  const y = 1 - Math.abs(x) - Math.abs(z);
  if (y < 0) {
    [x, z] = [(1 - Math.abs(z)) * Math.sign(x), (1 - Math.abs(x)) * Math.sign(z)];
  }
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
};
const raysPerStation = size * size;
const atlasBytes = stationPoints.length * raysPerStation * 4;
const packed = new Uint8Array(atlasBytes * 2);
const byte = value => Math.round(255 * Math.max(0, Math.min(1, value)));
for (const [station, origin] of stationPoints.entries()) {
  for (let z = 0; z < size; z++) for (let x = 0; x < size; x++) {
    const offset = (station * raysPerStation + z * size + x) * 4;
    const dir = direction(2 * (x + .5) / size - 1, 2 * (z + .5) / size - 1);
    const reach = dir[1] < 0 ? Math.min(40, origin[1] / -dir[1]) : 40;
    const hit = ray(tree, origin, dir, reach);
    if (!hit) {
      packed.set([128, 128, 128, 0], atlasBytes + offset);
      continue;
    }
    const { color, u, v } = hit.face;
    const axis = [u[1]*v[2]-u[2]*v[1], u[2]*v[0]-u[0]*v[2], u[0]*v[1]-u[1]*v[0]];
    const flip = dir.reduce((d, value, i) => d + value * axis[i], 0) > 0 ? -1 : 1;
    const normal = axis.map(value => flip * value / Math.hypot(...axis));
    const distance = Math.hypot(...minus(hit.point, origin));
    packed.set([...color.map(byte), 255], offset);
    packed.set([...normal.map(n => byte(.5 + .5*n)), Math.max(1, byte(Math.log1p(distance) / Math.log(41)))],
      atlasBytes + offset);
  }
}
if (!faces.length || packed.byteLength > 840 * 1024) throw Error('Invalid sleeve reflection scene size');
const bands = stationPoints.filter((_, i) => i % stations === 0).map((p, i) => {
  const end = stationPoints[(i + 1) * stations - 1];
  return [p[0], p[1], end[1], p[2]].map(x => Number(x.toFixed(7)));
});
const output = new URL('mobile/sleeve-reflection-data.js', root);
const contents = '// Generated by scripts/yacht-geometry/bake-sleeve-reflections.mjs.\n' +
  'export const layout = ' + JSON.stringify({ size, stations, bands }) + ';\n' +
  'export default ' + JSON.stringify(gzipSync(packed).toString('base64')) + ';\n';
if (process.argv.includes('--check')) {
  if (await readFile(output, 'utf8') !== contents) throw Error('Sleeve reflection scene needs rebuilding');
} else {
  await writeFile(output, contents);
}
console.log(faces.length, 'reflection triangles;', packed.byteLength, 'GPU bytes');
