import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';
import { D as Vector3 } from '../site/tidewater-rocha/assets/Frame-CNet77I0.js';
import { A as Group } from '../site/tidewater-rocha/assets/common-HBn3Movl.js';
import { createSternFeatures, l as yacht } from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { createDaylight, compartment } from '../site/tidewater-rocha/mobile/yacht-daylight.js';
import { lightMatrix } from '../site/tidewater-rocha/mobile/daylight-shadow.js';
import probes from '../site/tidewater-rocha/mobile/daylight-probes.js';
const group = new Group();
group.rotation.y = Math.PI / 2;
const reference = new Vector3(1, 1, 0).normalize();
test('sun angles use the yacht axes and restore exactly through a session', () => {
  const items = new Map(),
    storage = { setItem: (k, v) => items.set(k, v), getItem: (k) => items.get(k) };
  const light = createDaylight(reference, group, storage);
  assert.ok(light.world.distanceTo(reference) < 1e-6);
  const initial = light.state;
  light.set(90, 5);
  assert.ok(light.direction.x < -0.99);
  assert.ok(Math.abs(light.direction.z) < 1e-6);
  const previous = light.revision;
  light.set(450, 5);
  assert.equal(light.revision, previous);
  light.set(-90, 200);
  assert.ok(light.direction.y > 0.99999);
  assert.deepEqual(createDaylight(reference, group, storage).state, { azimuth: 270, elevation: 90 });
  light.reset();
  assert.deepEqual(light.state, initial);
});
test('bounce is compartment-specific, changes with the sun, and is continuous across north', () => {
  const id = compartment(12, 0.3, 4.7),
    cabin = compartment(15, 1.5, 2.8);
  assert.equal(probes[id - 1].id, 'MD_R02');
  assert.equal(probes[cabin - 1].id, 'LD_R03');
  const light = createDaylight(reference, group);
  const sample = (a) => {
    light.set(a, 12);
    return Array.from(light.irradiance.subarray(id * 4, id * 4 + 3));
  };
  assert.notDeepEqual(sample(90), sample(270));
  const a = sample(359.99);
  sample(0.01).forEach((v, i) => assert.ok(Math.abs(v - a[i]) < 0.0001));
  for (const p of probes) {
    assert.equal(p.rgb.length, 72);
    assert.equal(p.reflection.length, 24);
  }
});
test('the orthographic shadow fit includes the whole yacht even with overhead sun', () => {
  const light = createDaylight(reference, group),
    m = new Float32Array(16);
  for (const a of [0, 75, 180, 270, 360])
    for (const h of [5, 45, 90]) {
      light.set(a, h);
      lightMatrix(light.direction, a, m);
      for (const x of [-4, 4])
        for (const y of [-2.01, 11.45])
          for (const z of [-22, 18]) {
            const coord = (r) => m[r] * x + m[4 + r] * y + m[8 + r] * z + m[12 + r];
            assert.ok(Math.abs(coord(0)) <= 1 && Math.abs(coord(1)) <= 1 && coord(2) >= 0 && coord(2) <= 1);
          }
    }
});
test('every mobile profile has sky as its only surrounding geometry', async () => {
  const m = JSON.parse(
    await readFile(new URL('../site/tidewater-rocha/mobile/guest-access.json', import.meta.url)),
  );
  for (const p of Object.values(m.profiles)) {
    assert.ok(p.audit.some((a) => a.id.endsWith('/Daylight-sky') && a.triangles > 0));
    assert.ok(!p.audit.some((a) => /Rocha-(lake|sky|offshore|distant|wooded|lakeside)/.test(a.id)));
    assert.ok(p.triangles <= 25000);
    assert.equal(p.batches.length, 2);
  }
});

test('tessellated floor occluders leave the central hatch open', async () => {
  const { planarOccluders } = await import('../scripts/yacht-geometry/planar-occluders.mjs');
  const faces = [];
  for (let x = 0; x < 8; x++)
    for (let y = 0; y < 8; y++) {
      if (x >= 3 && x < 5 && y >= 3 && y < 5) continue;
      const v = [
        [x, y, 0],
        [x + 1, y, 0],
        [x + 1, y + 1, 0],
        [x, y + 1, 0],
      ];
      for (const ids of [
        [0, 1, 2],
        [0, 2, 3],
      ])
        faces.push({ v: ids.map((i) => v[i]), n: [0, 0, 1] });
    }
  const rectangles = planarOccluders(faces);
  assert.ok(rectangles.some(({ lo, hi }) => hi[0] - lo[0] > 4));
  assert.ok(rectangles.every(({ lo, hi }) => hi[0] <= 3 || lo[0] >= 5 || hi[1] <= 3 || lo[1] >= 5));
});

test('the sector draw preserves the first shadow depth from the full caster mesh', async () => {
  const { decodeShadow } = await import('../site/tidewater-rocha/mobile/daylight-shadow.js');
  const bytes = await readFile(
    new URL('../site/tidewater-rocha/mobile/daylight-casters.bin', import.meta.url),
  );
  const data = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  const mesh = decodeShadow(data),
    [, n, count, stride] = new Uint32Array(data, 0, 4);
  const original = new (stride === 2 ? Uint16Array : Uint32Array)(data, 24 + 12 * n, count);
  const size = 64,
    transformed = new Float32Array(n * 3),
    matrix = new Float32Array(16);
  function depth(indices) {
    const pixels = new Float32Array(size * size).fill(1);
    for (let i = 0; i < indices.length; i += 3) {
      const a = indices[i] * 3,
        b = indices[i + 1] * 3,
        c = indices[i + 2] * 3;
      const ax = transformed[a],
        ay = transformed[a + 1],
        bx = transformed[b],
        by = transformed[b + 1],
        cx = transformed[c],
        cy = transformed[c + 1];
      const det = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy);
      if (Math.abs(det) < 1e-8) continue;
      const left = Math.max(0, Math.ceil(Math.min(ax, bx, cx))),
        right = Math.min(size - 1, Math.floor(Math.max(ax, bx, cx)));
      for (
        let y = Math.max(0, Math.ceil(Math.min(ay, by, cy)));
        y <= Math.min(size - 1, Math.floor(Math.max(ay, by, cy)));
        y++
      )
        for (let x = left; x <= right; x++) {
          const u = ((by - cy) * (x - cx) + (cx - bx) * (y - cy)) / det,
            v = ((cy - ay) * (x - cx) + (ax - cx) * (y - cy)) / det,
            w = 1 - u - v;
          if (Math.min(u, v, w) < -1e-7) continue;
          const j = y * size + x,
            z = u * transformed[a + 2] + v * transformed[b + 2] + w * transformed[c + 2];
          pixels[j] = Math.min(pixels[j], z);
        }
    }
    return pixels;
  }
  const light = createDaylight(reference, group);
  for (const azimuth of [0, 22.499, 22.501, 62, 117, 179.99, 225, 305, 359.99])
    for (const elevation of [5, 26.249, 26.251, 60, 89.9, 90]) {
      light.set(azimuth, elevation);
      lightMatrix(light.direction, azimuth, matrix);
      for (let k = 0; k < n; k++)
        for (let r = 0; r < 3; r++) {
          const z =
            matrix[r] * mesh.positions[k * 3] +
            matrix[r + 4] * mesh.positions[k * 3 + 1] +
            matrix[r + 8] * mesh.positions[k * 3 + 2] +
            matrix[12 + r];
          transformed[k * 3 + r] = r === 2 ? z : (z * 0.5 + 0.5) * size - (r === 0 ? 0.413 : 0.537);
        }
      const { first, count } = mesh.range(light.state);
      const before = depth(original),
        after = depth(mesh.indices.subarray(first, first + count));
      const error = before.reduce((m, v, j) => Math.max(m, Math.abs(v - after[j])), 0);
      assert.ok(error < 0.00001, 'Caster depth changed at ' + [azimuth, elevation, error]);
    }
});

test('camera culling retains crossing triangles, face order and the eye-relative sky', async () => {
  const {widenedView,coversView,filterView}=await import('../site/tidewater-rocha/mobile/view-volume.js');
  const projection=[1,0,0,0, 0,1,0,0, 0,0,0,-1, 0,0,.1,0];
  const camera=[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
  const planes=widenedView(projection);
  assert.ok(coversView(planes,camera,projection));
  const inner=widenedView(projection,1.12), pan=camera.slice();
  const angle=.08;
  pan[0]=pan[10]=Math.cos(angle);pan[8]=Math.sin(angle);pan[2]=-pan[8];
  assert.ok(coversView(planes,pan,projection));
  assert.equal(coversView(inner,pan,projection),false);
  const shifted=camera.slice();shifted[12]=.15;
  assert.ok(coversView(planes,shifted,projection));
  shifted[12]=3;
  assert.equal(coversView(planes,shifted,projection),false);
  const wider=projection.slice();wider[0]=.6;
  assert.equal(coversView(planes,camera,wider),false);
  const asymmetric=projection.slice();asymmetric[8]=.7;
  assert.equal(coversView(planes,camera,asymmetric),false);
  const turned=camera.map((v,i)=>[0,10].includes(i)?-1:v);
  assert.equal(coversView(planes,turned,projection),false);
  const v=new Uint8Array(9*32),f=new Float32Array(v.buffer),s=new Int16Array(v.buffer);
  [[10,0,-1],[11,0,-1],[12,1,-1],[-9,0,-1],[8,0,-1],[0,8,-1],[15,0,-1],[16,0,-1],[15,1,-1]].forEach((p,i)=>f.set(p,i*8));
  for(const i of [6,7,8])s[i*16+14]=-2;
  const indices=new Uint16Array([2,1,0,3,4,5,0,1,2,6,7,8]);
  const {output,length}=filterView(v,indices,3,9,planes,new Uint8Array(9));
  assert.deepEqual([...output.subarray(0,length)],[3,4,5,6,7,8]);
});

test('shared vertices preserve every packed byte and widen indices above 65535',async()=>{
  const {sharedVertices}=await import('../site/tidewater-rocha/mobile/shared-vertices.js');
  const input=new Uint8Array(65537*32),words=new Uint32Array(input.buffer);
  for(let i=0;i<65537;i++)words[i*8]=i;
  const table=sharedVertices(65540);
  const first=table.remap(input.subarray(0,64),new Uint16Array([1,0,1]));
  const rest=table.remap(input,new Uint32Array([65536,1,0]));
  assert.ok(first instanceof Uint16Array && rest instanceof Uint32Array);
  assert.deepEqual([...first],[1,0,1]);assert.deepEqual([...rest],[65536,1,0]);
  const distinct=input.slice(0,32);distinct[28]=64;
  assert.equal(table.remap(distinct,[0])[0],65537);
  const all=table.finish();
  assert.deepEqual(all.subarray(0,input.length),input);
  assert.deepEqual(all.subarray(input.length),distinct);
});

test('resolved coverage signatures recover every distinct MSAA tag including collisions and empty samples', async()=>{
  const {sampleRoots}=await import('../site/tidewater-rocha/mobile/sample-visibility.js');
  let seed=107;
  const next=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)%251);
  for(let i=0;i<1200;i++){
    const a=next(),b=next();
    const tags=[a,i%3?a:b,i%3===1?b:next(),i%4?next():0];
    const sums=[1,2,3,4].map(n=>tags.reduce((s,t)=>s+t**n,0)%251);
    assert.deepEqual(sampleRoots(...sums),[...new Set(tags)].sort((x,y)=>x-y));
  }
});

test('coverage tiles retain every winner, near-plane triangles and sky while dropping absent tags', async () => {
  const {filterSamples, sampleRoots} = await import('../site/tidewater-rocha/mobile/sample-visibility.js');
  const width = 32, height = 8, stride = 512;
  const pixels = new Uint16Array(stride * height / 2);
  function half(value) {
    if (!value) return 0;
    const power = Math.floor(Math.log2(value));
    return (power + 15) * 1024 + (value / 2 ** power - 1) * 1024;
  }
  function write(x, y, tags) {
    for (let n = 1; n <= 4; n++)
      pixels[y * stride / 2 + 4 * x + n - 1] = half(tags.reduce((sum, tag) => sum + tag ** n % 251, 0) / 4);
  }
  write(4, 4, [1, 2, 3, 4]);
  write(14, 4, [5, 5, 5, 5]);
  // These sums describe x²(x²+1), which has only two of its four roots in F251.
  assert.equal(sampleRoots(0, 249, 0, 2), null);
  pixels.set([0, half(249 / 4), 0, half(2 / 4)], 4 * stride / 2 + 4 * 26);
  const vertices = new Uint8Array(14 * 32);
  const positions = new Float32Array(vertices.buffer), layers = new Int16Array(vertices.buffer);
  for (let i = 1; i <= 13; i++) {
    const x = i <= 4 ? 4 : i <= 7 ? 14 : 26;
    positions.set([2 * x / width - 1, 0, i === 9 ? 0 : -1], i * 8);
  }
  layers[10 * 16 + 14] = -2;
  const indices = Uint16Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].flatMap(i => [i, i, i]));
  const clip = [1,0,0,0, 0,1,0,0, 0,0,0,-1, 0,0,1,0];
  const {output, length} = filterSamples(pixels, width, height, stride, vertices, indices, 0, indices.length, clip);
  assert.deepEqual(Array.from(output.subarray(0, length)),
    [1, 2, 3, 4, 5, 8, 9, 10].flatMap(i => [i, i, i]));
});

test('walking masks respect the original sightline, cell boundaries and raster limits', async () => {
  const {roomCells, roomCellOffset, filterRoomCell} = await import('../site/tidewater-rocha/mobile/room-visibility.js');
  const indices = new Uint16Array([0,1,2, 3,4,5, 6,7,8, 9,10,11]);
  const regions = [{profile:'upper', first:0, count:9, box:[0,-.03,0,1,.03,1], nx:2, nz:1, offset:0}];
  const cells = roomCells({regions}, new Uint8Array([2,4]), {upper:indices});
  const group = cells.range('upper', 0, 12);
  assert.equal(cells.range('exterior', 0, 12), null);
  assert.equal(cells.range('upper', 0, 6), null);
  const camera = Array(16).fill(0), lens = Array(16).fill(0);
  lens[0] = 2.5; lens[5] = 1.66; lens[14] = .03; camera[14] = .5;
  assert.equal(roomCellOffset(group, camera, lens, 360, 540), 0);
  camera[12] = .5;
  assert.equal(roomCellOffset(group, camera, lens, 360, 540), 1);
  assert.equal(roomCellOffset(group, camera, lens, 180, 270), -1);
  lens[14] = .25;
  assert.equal(roomCellOffset(group, camera, lens, 360, 540), -1);
  lens[14] = .03; camera[13] = .04;
  assert.equal(roomCellOffset(group, camera, lens, 360, 540), -1);
  camera[13] = 0; camera[12] = 1;
  assert.equal(roomCellOffset(group, camera, lens, 360, 540), -1);
  // The frustum worker removed source face zero. Mask bits must still address
  // the remaining faces by their original slots, including the wider prefix.
  const list = indices.subarray(3), slots = new Uint32Array([1, 2, 3]);
  const output = new Uint16Array(list.length);
  for (const [offset, expected] of [[0,[6,7,8,9,10,11]], [1,[3,4,5,9,10,11]]]) {
    const length = filterRoomCell(cells.bits, offset, group.count, list, list.length, slots, output);
    assert.deepEqual([...output.subarray(0,length)], expected);
  }
  assert.throws(() => roomCells({regions}, new Uint8Array(1), {upper:indices}), /Incomplete/);
});

test('the shipped swim-platform cells cover the shared spawn and stop at the first riser', async () => {
  const path = new URL('../site/tidewater-rocha/mobile/room-visibility.bin', import.meta.url);
  const data = gunzipSync(await readFile(path));
  const header = JSON.parse(data.toString('utf8', 4, 4 + data.readUInt32LE(0)));
  const stairs = createSternFeatures().access.starboard;
  const [x, y, z] = stairs.room.spawn;
  const camera = [y * yacht.sy, z - yacht.seaReference, x * yacht.sx - yacht.length / 2];
  const region = header.regions.find(({ profile, box }) => profile === 'exterior' &&
    camera.every((value, i) => value >= box[i] && value < box[i + 3]));
  assert.ok(region, 'Missing platform walking mask');
  const firstRise = stairs.treads[0].height - stairs.lowerHeight;
  assert.ok(region.box[4] < camera[1] + firstRise);
});
