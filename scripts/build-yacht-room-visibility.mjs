// Rebuild after the final walking package. Only this offline step needs C++17.
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { readFile, writeFile, mkdtemp, rm, rename } from 'node:fs/promises';
import { tmpdir, availableParallelism } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { gzipSync } from 'node:zlib';
import { boardingHeight, createSternFeatures, l as yacht } from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { loadDeckLight, prepareOpaque, packRenderVertices } from '../site/tidewater-rocha/mobile/prepare-light.js';
import { accessProfileBounds, accessRoom } from '../site/tidewater-rocha/mobile/bridge-access-geometry.js';
import { sharedVertices } from '../site/tidewater-rocha/mobile/shared-vertices.js';
import { roomPanels } from './yacht-geometry/room-panels.mjs';

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
  const boardingEye = z => boardingHeight((z + yacht.length / 2) / yacht.sx) + 1.6 - yacht.seaReference;
  const down = -2; // Vertical direction in the offline visibility compiler.
  const views = [];
  for (const [profile, deckEye] of [['main', 3.54], ['exterior', 3.54], ['upper', 5.59], ['guest', 1.14], ['bow', 5.59]]) {
    for (const view of manifest.profiles[profile].batches[0].views) {
      const [, y, z, , Y] = view.box;
      const platform = profile === 'exterior' && platformEye >= y && platformEye <= Y;
      const ramp = profile === 'exterior' && z < -14 && !platform;
      if (z < -14 && !platform && !ramp || profile === 'bow' && view.sign !== -1) continue;
      const height = platform ? platformEye : deckEye;
      if (!ramp && (height < y || height > Y)) continue;
      // The shortest prefix is present at every lens width for this sightline.
      const mainDeck = (profile === 'main' || profile === 'exterior') && !platform && view.sign === 1 && z >= -14 && z < -3;
      const cockpit = (profile === 'main' || profile === 'exterior') && !view.sign && z >= -14 && z < -9.5;
      // Unrestricted views from the boarding ramp include the hull below
      // the planks. A visitor in the cockpit can look in either direction.
      const directions = cockpit ? [1, -1] : ramp && !view.sign ? [1, down] : [view.sign || 1];
      // Through the terrace and saloon, a few centimetres of motion expose
      // different fittings past the door frames. The forward lobby is shorter.
      let spacing = profile === 'bow' ? .24 : .22;
      if (platform) spacing = .12;
      else if (ramp) spacing = .09;
      else if (cockpit) spacing = .16;
      else if (mainDeck) spacing = z < -9.5 ? .055 : z < -6 ? .085 : .15;
      views.push({...view, profile, height, mainDeck, platform, ramp, cockpit, directions, spacing,
        panels: mainDeck && z < -9.5,
        count:view.prefixes?.[0]?.count ?? view.count});
    }
  }
  // The bridge and its lower lobby share the upper profile. Outside a prepared
  // sightline the renderer selects a longitudinal band, including when looking
  // aft down the yacht. Certify against the exact indices of each such band.
  const helm = JSON.parse(await readFile(join(mobile, 'bridge-helm.json'))).room;
  const bridge = JSON.parse(await readFile(join(mobile, 'bridge-access.json')));
  const landings = bridge.flight.surfaces;
  function* bandsOver(profile,bounds){
    const deck=manifest.profiles[profile],{start,step,lateralBands}=deck.visibility;
    const [aft,left,fore,right]=bounds;
    for(const [index,[first,count]] of deck.batches[0].ranges.entries()){
      const band=lateralBands?index%lateralBands:index;
      const x=(lateralBands&&index>=lateralBands?Math.max(0,left):left)*yacht.sy;
      const X=(lateralBands&&index<lateralBands?Math.min(0,right):right)*yacht.sy;
      const z=Math.max(start+band*step,aft*yacht.sx-yacht.length/2);
      const Z=Math.min(start+(band+1)*step,fore*yacht.sx-yacht.length/2);
      if(X>x&&Z>z)yield {first,count,x,X,z,Z};
    }
  }
  for (const [roomBounds, eye, landing] of [
    [helm.bbox, helm.spawn[2], landings.at(-1)],
    [accessProfileBounds, accessRoom.spawn[2], landings[0]],
  ]) {
    const bounds = roomBounds.slice();
    for (const [x, y] of landing.polygons.flat()) {
      bounds[0] = Math.min(bounds[0], x); bounds[1] = Math.min(bounds[1], y);
      bounds[2] = Math.max(bounds[2], x); bounds[3] = Math.max(bounds[3], y);
    }
    const height=eye-yacht.seaReference;
    for(const {first,count,x,X,z,Z} of bandsOver('upper',bounds)){
      views.push({profile:'upper',first,count,sign:-1,height,spacing:.18,panels:true,box:[x,height,z,X,height,Z]});
    }
  }
  function addBands(profile,bounds,height,halfHeight,spacing,directions){
    for(const {first,count,x,X,z,Z} of bandsOver(profile,bounds)){
      views.push({profile,first,count,height,halfHeight,spacing,directions,panels:true,box:[x,height,z,X,height,Z]});
    }
  }
  for (const [profile, file] of [['upper', 'upper-terrace'], ['sun', 'sun-deck']]) {
    const bundle = JSON.parse(await readFile(join(mobile, file + '.json')));
    const route = bundle.flight.route.path;
    for (const surface of bundle.flight.surfaces) {
      const points = surface.polygons.flat();
      const x = points.map(p => p[0]), y = points.map(p => p[1]);
      const box = [Math.min(...x), Math.min(...y), Math.max(...x), Math.max(...y)];
      const cx = (box[0] + box[2]) / 2, cy = (box[1] + box[3]) / 2;
      // The bow-to-stern beam and its transverse counterpart cover both
      // directions along the closest segment of the real handrail turn.
      let axis = 1, nearest = Infinity;
      for (let i = 1; i < route.length; i++) {
        const [ax, ay] = route[i-1], dx = route[i][0] - ax, dy = route[i][1] - ay;
        const t = Math.max(0, Math.min(1, ((cx-ax)*dx + (cy-ay)*dy)/(dx*dx + dy*dy)));
        const distance = Math.hypot(cx - ax - t * dx, cy - ay - t * dy);
        if (distance < nearest) {
          nearest = distance;
          axis = Math.abs(dx) >= Math.abs(dy) ? 1 : 3;
        }
      }
      // Include camera easing between neighboring tread elevations. The
      // entire vertical interval is part of the offline occlusion proof.
      addBands(profile, box, surface.height + 1.6 - yacht.seaReference, .21, .15, [axis,-axis]);
    }
    // Cover level ground in both directions after the visitor leaves the flight.
    addBands(profile, bundle.room.bbox, bundle.room.spawn[2] - yacht.seaReference, .045, .20, [1,-1]);
  }
  // The galley doorway interrupts the forward sightline at the dining table.
  // Certify the ordinary lateral bands too, for turns and the aisle on either side.
  addBands('main', [13.9,-2.65,17.83,2.65], 3.54, .028, .23, [1,-1,3,-3]);
  for (const [id, view] of views.entries()) {
    const {profile, height, count, spacing} = view;
    const [x, y, z, X, Y, Z] = view.box;
    const faces = Uint32Array.from(indices[profile].subarray(view.first, view.first + count));
    const meshFile = join(temp, 'mesh-' + id);
    const shape = new Uint32Array([packed.length / 32, count]);
    const meshParts = [bytes(shape), bytes(packed), bytes(faces)];
    if (view.panels) {
      const panels = roomPanels(packed, faces);
      meshParts.push(bytes(Uint32Array.of(panels.length / 7)), bytes(panels));
    }
    await writeFile(meshFile, Buffer.concat(meshParts));
    const nx = Math.ceil((X - x) / spacing), nz = Math.ceil((Z - z) / spacing);
    const dx = (X - x) / nx, dz = (Z - z) / nz, halfHeight = view.halfHeight ?? .028;
    const heights = view.ramp ? Array.from({length:nz}, (_,j) =>
      [boardingEye(z+j*dz)-.04, boardingEye(z+(j+1)*dz)+.04]).flat() : null;
    const stride = Math.ceil(count / 24), block = Buffer.alloc(nx * nz * stride);
    regions.push({profile, first:view.first, count, box:[x, heights ? y : height-halfHeight, z, X, heights ? Y : height+halfHeight, Z],
      nx, nz, ...(heights && {heights}), offset:total});
    total += block.length;
    blocks.push(block);
    for (let j = 0; j < nz; j++) {
      const centre = heights ? (heights[2*j]+heights[2*j+1])/2 : height;
      const dy = heights ? (heights[2*j+1]-heights[2*j])/2 : halfHeight;
      const radius = Math.hypot(dx/2, dz/2, dy) + .025;
      const halfExtent = view.mainDeck || view.platform || view.ramp || view.cockpit || view.panels ? [dx/2, dy, dz/2] : [];
      for (let i = 0; i < nx; i++) {
        const cell = j * nx + i;
        jobs.push(async () => {
          const mask = meshFile + '-' + cell;
          const target = block.subarray(cell*stride, (cell+1)*stride);
          // Each bit is independently certified throughout this cell. A proof
          // along either beam is sufficient, including while the camera turns.
          for (const direction of view.directions ?? [view.sign]) {
            const eye = [x+(i+.5)*dx, centre, z+(j+.5)*dz];
            await exec(compiler, [meshFile, radius, direction, ...eye, mask, ...halfExtent].map(String));
            const data = await readFile(mask);
            if (data.length !== stride) throw Error('Incomplete generated mask');
            for (let k=0; k<stride; k++) target[k] |= data[k];
          }
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
