// Rebuild after the final walking package. Only this offline step needs C++17.
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { readFile, writeFile, mkdtemp, rm, rename } from 'node:fs/promises';
import { tmpdir, availableParallelism } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { gzipSync } from 'node:zlib';
import { createSternFeatures, l as yacht } from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { loadDeckLight, prepareOpaque, packRenderVertices } from '../site/tidewater-rocha/mobile/prepare-light.js';
import { accessProfileBounds, accessRoom } from '../site/tidewater-rocha/mobile/bridge-access-geometry.js';
import { sharedVertices } from '../site/tidewater-rocha/mobile/shared-vertices.js';

const exec = promisify(execFile);
const mobile = fileURLToPath(new URL('../site/tidewater-rocha/mobile/', import.meta.url));
const compilerSource = fileURLToPath(new URL('./yacht-geometry/room-visibility.cpp', import.meta.url));
const bytes = a => Buffer.from(a.buffer, a.byteOffset, a.byteLength);
const digest = a => createHash('sha256').update(bytes(a)).digest('hex');
const output = process.argv[2] || join(mobile, 'room-visibility.bin');
const temp = await mkdtemp(join(tmpdir(), 'yacht-room-visibility-'));
try {
  const compiler = join(temp, 'bake');
  await exec(process.env.CXX || 'c++', ['-std=c++17', '-O3', compilerSource, '-o', compiler]);
  const manifest = JSON.parse(await readFile(join(mobile, 'guest-access.json')));
  const buffer = await readFile(join(mobile, 'guest-access.bin')), light = await loadDeckLight();
  const capacity = Object.values(manifest.profiles).reduce((n, p) => n + p.batches[0].attributes.position.length / 3, 0);
  const table = sharedVertices(capacity), indices = {};
  for (const [name, profile] of Object.entries(manifest.profiles)) {
    const batch = profile.batches[0], attributes = {};
    for (const [key, attr] of Object.entries(batch.attributes))
      attributes[key] = new Float32Array(buffer.buffer, buffer.byteOffset + attr.offset, attr.length);
    const Index = batch.indices.format === 'uint32' ? Uint32Array : Uint16Array;
    const list = new Index(buffer.buffer, buffer.byteOffset + batch.indices.offset, batch.indices.length);
    indices[name] = table.remap(packRenderVertices(prepareOpaque(attributes, light, list)), list);
  }
  const packed = table.finish(), regions = [], blocks = [], jobs = [];
  let total = 0;
  const platformEye = createSternFeatures().access.starboard.room.spawn[2] - yacht.seaReference;
  const views = [];
  for (const [profile, deckEye] of [['exterior', 3.54], ['upper', 5.59], ['guest', 1.14], ['bow', 5.59]]) {
    for (const view of manifest.profiles[profile].batches[0].views) {
      const [, y, z, , Y] = view.box;
      const platform = profile === 'exterior' && platformEye >= y && platformEye <= Y;
      if (z < -14 && !platform || profile === 'bow' && view.sign !== -1) continue;
      const height = platform ? platformEye : deckEye;
      if (height < y || height > Y) continue;
      // The shortest prefix is present at every lens width for this sightline.
      views.push({...view, profile, height, count:view.prefixes?.[0]?.count ?? view.count,
        spacing:platform ? .16 : profile === 'bow' ? .24 : .22});
    }
  }
  // The bridge and its lower lobby share the upper profile. Outside a prepared
  // sightline the renderer selects a longitudinal band, including when looking
  // aft down the yacht. Certify against the exact indices of each such band.
  const helm = JSON.parse(await readFile(join(mobile, 'bridge-helm.json'))).room;
  const upper = manifest.profiles.upper, {start, step} = upper.visibility;
  for (const [bounds, eye] of [[helm.bbox, helm.spawn[2]], [accessProfileBounds, accessRoom.spawn[2]]]) {
    const [aft, left, fore, right] = bounds, height = eye - yacht.seaReference;
    for (const [band, [first, count]] of upper.batches[0].ranges.entries()) {
      const z = Math.max(start + band * step, aft * yacht.sx - yacht.length / 2);
      const Z = Math.min(start + (band + 1) * step, fore * yacht.sx - yacht.length / 2);
      if (Z <= z) continue;
      views.push({profile:'upper', first, count, sign:-1, height, spacing:.24,
        box:[left * yacht.sy, height, z, right * yacht.sy, height, Z]});
    }
  }
  for (const [id, view] of views.entries()) {
    const {profile, height, count, spacing} = view;
    const [x, , z, X, , Z] = view.box;
    const faces = Uint32Array.from(indices[profile].subarray(view.first, view.first + count));
    const meshFile = join(temp, 'mesh-' + id);
    const shape = new Uint32Array([packed.length / 32, count]);
    await writeFile(meshFile, Buffer.concat([bytes(shape), bytes(packed), bytes(faces)]));
    const nx = Math.ceil((X - x) / spacing), nz = Math.ceil((Z - z) / spacing);
    const dx = (X - x) / nx, dz = (Z - z) / nz, halfHeight = .028;
    const radius = Math.hypot(dx / 2, dz / 2, halfHeight) + .025;
    const stride = Math.ceil(count / 24), block = Buffer.alloc(nx * nz * stride);
    regions.push({profile, first:view.first, count, box:[x, height-halfHeight, z, X, height+halfHeight, Z],
      nx, nz, offset:total});
    total += block.length;
    blocks.push(block);
    for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
      const cell = j * nx + i;
      jobs.push(async () => {
        const mask = meshFile + '-' + cell;
        await exec(compiler, [meshFile, radius, view.sign || 1, x + (i + .5) * dx, height, z + (j + .5) * dz, mask].map(String));
        const data = await readFile(mask);
        if (data.length !== stride) throw Error('Incomplete generated mask');
        data.copy(block, cell * stride);
        await rm(mask);
      });
    }
  }
  let cursor = 0;
  async function worker() {
    while (cursor < jobs.length) await jobs[cursor++]();
  }
  const results = await Promise.allSettled(Array.from({length:Math.min(4, availableParallelism())}, worker));
  for (const result of results) if (result.status === 'rejected') throw result.reason;
  const usedProfiles = new Set(regions.map(r => r.profile));
  const hashes = Object.fromEntries(Object.entries(indices).filter(([name]) => usedProfiles.has(name)).map(([name, list]) => [name, digest(list)]));
  // Adjacent camera cells usually differ by just a few faces. Encode against
  // the previous row (or the previous cell in the first row) before gzip.
  for (const [i, block] of blocks.entries()) {
    const {nx, count} = regions[i], stride = Math.ceil(count / 24), rowBytes = nx * stride;
    for (let j = block.length - 1; j >= stride; j--)
      block[j] ^= block[j - (j < rowBytes ? stride : rowBytes)];
  }
  const header = Buffer.from(JSON.stringify({version:2, vertices:digest(packed), indices:hashes, regions}));
  const prefix = Buffer.alloc(4);
  prefix.writeUInt32LE(header.length);
  const compressed = gzipSync(Buffer.concat([prefix, header, ...blocks]), {level:9});
  const staged = output + '.' + process.pid + '.tmp';
  try {
    await writeFile(staged, compressed);
    await rename(staged, output);
  } finally {
    await rm(staged, {force:true});
  }
  console.log(jobs.length + ' eye cells, ' + compressed.length + ' bytes');
} finally {
  await rm(temp, {recursive:true, force:true});
}
