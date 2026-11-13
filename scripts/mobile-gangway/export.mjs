// Offline extraction from the same published scene builder used by play.html.
// Run from a full checkout with: node scripts/mobile-gangway/export.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve, join, basename } from 'node:path';
import { gzipSync } from 'node:zlib';

const site = fileURLToPath(new URL('../../site/tidewater-rocha/', import.meta.url));
const bundles = process.argv[2] || join(site, 'assets');
const data = process.argv[3] || join(site, 'rocha/luz-de-mar');
const { u: load, o: build } = await import(pathToFileURL(resolve(bundles, 'RochaYachtState-P5KwIGIl.js')));
const model = build(JSON.parse(await readFile(join(data, 'berth.json'))),
  await load(async url => new Response(await readFile(join(data, basename(url))))));
const basis = model.group.userData.yacht;
const boarding = model.boarding;
const buckets = new Map();
function finish(code, metal, glass) {
  if (glass) return 'glass';
  if ([1, 2, 9, 17, 36].includes(code)) return 'teak';
  if (metal > 0.5) return 'steel';
  if ([3, 21].includes(code)) return 'fabric';
  return 'paint';
}
model.group.traverse(mesh => {
  if (!mesh.geometry || mesh.userData.luzInterior) return;
  const {position, normal, color, aSurface} = mesh.geometry.attributes;
  const source = mesh.geometry.index.array;
  const glass = mesh.material.name.includes('glazing');
  const localIndices = new Map();
  for (const vertex of source) {
    let record = localIndices.get(vertex);
    if (!record) {
      const key = finish(aSurface.array[vertex*4+2], aSurface.array[vertex*4+1], glass);
      if (!buckets.has(key)) buckets.set(key, { vertices: [], indices: [] });
      const bucket = buckets.get(key);
      record = { bucket, index: bucket.vertices.length };
      const at = vertex * 3;
      const p = position.array.subarray(at, at+3);
      const n = normal.array.subarray(at, at+3);
      const c = color.array.subarray(at, at+3);
      bucket.vertices.push([...p, ...n, ...c, aSurface.array[vertex*4+3]]);
      localIndices.set(vertex, record);
    }
    record.bucket.indices.push(record.index);
  }
});
// One local-space indexed buffer per finish; position millimeters, normals snorm8,
// linear vertex color and authored ambient occlusion unorm8. Aligned 16-byte stride.
const chunks = [], groups = [];
let offset = 0;
for (const [name, {vertices, indices}] of buckets) {
  if (vertices.length > 65535 || indices.length % 3) throw Error('Invalid geometry bucket: ' + name);
  const attribute = Buffer.alloc(vertices.length * 16);
  vertices.forEach((v, i) => {
    for (let axis = 0; axis < 3; axis++) {
      // Signed int16 at 2 mm resolution covers the entire approach and yacht.
      attribute.writeInt16LE(Math.round(v[axis] * 500), i*16 + axis*2);
      attribute.writeInt8(Math.round(Math.max(-1, Math.min(1, v[axis+3])) * 127), i*16 + 6+axis);
      attribute.writeUInt8(Math.round(Math.min(1, v[axis+6]) * 255), i*16 + 9+axis);
    }
    attribute.writeUInt8(Math.round(Math.min(1, v[9]) * 255), i*16 + 12);
  });
  const index = Buffer.from(Uint16Array.from(indices).buffer);
  groups.push({name, offset, vertices: vertices.length, indices: indices.length});
  chunks.push(attribute, index);
  offset += attribute.length + index.length;
}
const layout = boarding.layout;
const along = x => x * basis.sx - basis.length/2;
const zProfile = [boarding.shore, layout.start, layout.end, layout.stepX, layout.gateEnd];
const meta = {
  version: 1, groups, navigation: {
    center: layout.y * basis.sy, halfWidth: (layout.width / 2 - 0.13) * basis.sy,
    start: along(layout.start - 4.6), min: along(boarding.shore + 0.6), max: along(layout.gateEnd - 0.12),
    heights: zProfile.map(x => [along(x), boarding.height(x) - basis.seaReference]),
    stern: along(layout.end),
  }
};
const header = Buffer.from(JSON.stringify(meta));
const size = Buffer.alloc(4); size.writeUInt32LE(header.length);
const file = gzipSync(Buffer.concat([size, header, ...chunks]), {level: 9});
await writeFile(join(site, 'mobile/gangway.bin.gz'), file);
console.log(meta.navigation, groups.map(g => [g.name, g.indices/3]), file.length);
