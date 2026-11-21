// Rebuild after the final walking package. Only this offline step needs C++17.
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { readFile, writeFile, mkdtemp, rm, rename } from 'node:fs/promises';
import { tmpdir, availableParallelism } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { gzipSync } from 'node:zlib';
import { loadDeckLight, prepareOpaque, packRenderVertices } from '../site/tidewater-rocha/mobile/prepare-light.js';
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
  // Level walking in the main deck, upper interior and guest accommodation.
  // Sloping approaches and stairs always use the general camera filter.
  for (const [profile, height] of [['exterior', 3.54], ['upper', 5.59], ['guest', 1.14]]) {
    for (const view of manifest.profiles[profile].batches[0].views) {
      const [x, y, z, X, Y, Z] = view.box;
      if (height < y || height > Y || z < -14) continue;
      // The shortest prefix is present at every lens width that selects this sightline.
      const count = view.prefixes?.[0]?.count ?? view.count;
      const faces = Uint32Array.from(indices[profile].subarray(view.first, view.first + count));
      const meshFile = join(temp, profile + '-' + view.first);
      const shape = new Uint32Array([packed.length / 32, count]);
      await writeFile(meshFile, Buffer.concat([bytes(shape), bytes(packed), bytes(faces)]));
      const nx = Math.ceil((X - x) / .22), nz = Math.ceil((Z - z) / .22);
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
  }
  let cursor = 0;
  async function worker() {
    while (cursor < jobs.length) await jobs[cursor++]();
  }
  const results = await Promise.allSettled(Array.from({length:Math.min(4, availableParallelism())}, worker));
  for (const result of results) if (result.status === 'rejected') throw result.reason;
  const usedProfiles = new Set(regions.map(r => r.profile));
  const hashes = Object.fromEntries(Object.entries(indices).filter(([name]) => usedProfiles.has(name)).map(([name, list]) => [name, digest(list)]));
  const header = Buffer.from(JSON.stringify({version:1, vertices:digest(packed), indices:hashes, regions}));
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
