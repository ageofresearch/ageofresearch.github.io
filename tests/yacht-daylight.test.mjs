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
test('every mobile profile keeps the simple berth water and sky within the exterior budget', async () => {
  const m = JSON.parse(
    await readFile(new URL('../site/tidewater-rocha/mobile/guest-access.json', import.meta.url)),
  );
  for (const p of Object.values(m.profiles)) {
    assert.ok(p.audit.some((a) => a.id.endsWith('/Daylight-sky') && a.triangles > 0));
    assert.ok(p.audit.some((a) => a.id.endsWith('/Berth-water-surface') && a.triangles > 0));
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

test('opaque wall panels preserve narrow seams between coplanar pieces', async () => {
  const { roomPanels } = await import('../scripts/yacht-geometry/room-panels.mjs');
  // Both edges round to 2 at five decimal places, but light can pass between them.
  const seams = [2, Math.fround(2.000002)];
  const positions = [];
  const indices = [];
  for (const [lo, hi] of [[0, seams[0]], [seams[1], 4]]) {
    const first = positions.length;
    positions.push([lo, 0, 0], [hi, 0, 0], [hi, 4, 0], [lo, 4, 0]);
    indices.push(first, first+1, first+2, first, first+2, first+3);
  }
  const vertices = new Uint8Array(32 * positions.length);
  const xyz = new Float32Array(vertices.buffer);
  positions.forEach((v,i) => xyz.set(v, 8*i));
  const panels = roomPanels(vertices, indices);
  assert.ok(panels.length >= 14);
  for (let i=0; i<panels.length; i+=7) {
    assert.equal(panels[i], 2);
    assert.ok(panels[i+4] <= seams[0] || panels[i+3] >= seams[1]);
  }
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

test('a rapid turn applies the current eye cell and frustum before the worker replies', async () => {
  const {prepareImmediateView} = await import('../site/tidewater-rocha/mobile/immediate-view.js');
  const clip = [1,0,0,0, 0,1,0,0, 0,0,0,-1, 0,0,.1,0];
  const points = [
    [-4,0,-1],[-3,0,-1],[-3,1,-1], // Off the left of the viewport.
    [-3,1,1],[3,1,-2],[0,-2,-1],   // Crosses the eye plane and the viewport.
    [0,0,-2],[.1,0,-2],[0,.1,-2],
    [9,0,-1],[10,0,-1],[9,1,-1],    // The sky rotates into view separately.
  ];
  const packed = new Uint8Array(points.length * 32), layers = new Int16Array(packed.buffer);
  for (const id of [9,10,11]) layers[16*id+14] = -2;
  const local = Uint32Array.from(points.keys(), i => 70000+i);
  const indices = Uint16Array.of(2,1,0, ...points.keys());
  const filter = prepareImmediateView(Float32Array.from(points.flat()), indices, local, packed);
  const dst = new Uint32Array(12);
  const bytes = Uint8Array.of(0, 0b100);
  let size = filter(3, 12, clip, 360, 540, bytes, 1, 12, dst);
  assert.deepEqual([...dst.subarray(0,size)], [...local.slice(3,6), ...local.slice(9)]);
  // The same source range can be used in another room cell on the next frame.
  size = filter(3, 12, clip, 360, 540, null, -1, 0, dst);
  assert.deepEqual([...dst.subarray(0,size)], [...local.slice(3)]);
});

test('screen visibility retains a single covered MSAA sample and bounds a nearer opaque surface', async () => {
  const {prepareScreenVisibility, usableScreen} = await import('../site/tidewater-rocha/mobile/screen-visibility.js');
  const module = await WebAssembly.compile(await readFile(new URL('../site/tidewater-rocha/mobile/screen-visibility.wasm',import.meta.url)));
  const width=360, height=540, projection=Float32Array.of(1,0,0,0, 0,1,0,0, 0,0,.000075,-1, 0,0,.03,0);
  const triangles=[
    [[100,100],[200,100],[100,200],1],       // Near opaque triangle.
    [[110,110],[119,110],[110,119],2],       // Entirely inside its projection, farther away.
    [[110,110],[119,110],[110,119],.5],      // Same screen area, closer to the eye.
    [[250.01,150.01],[250.08,150.01],[250.01,150.08],1],
    [[250.25,150.75],[250.6,150.75],[250.25,151.1],1], // Covers sample 0.
    [[500,150],[502,150],[500,152],1],       // The last face belongs to the moving sky.
  ];
  const bytes=new Uint8Array(triangles.length*3*32), positions=new Float32Array(bytes.buffer), layers=new Int16Array(bytes.buffer);
  for(const [i,face] of triangles.entries()) for(let corner=0;corner<3;corner++){
    const id=i*3+corner,[x,y]=face[corner],w=face[3];
    positions.set([(x/width*2-1)*w,(y/height*2-1)*w,-w],id*8);
    if(i===5) layers[id*16+14]=-2;
  }
  const ids=Uint16Array.from({length:triangles.length*3},(_,i)=>i);
  assert.equal(usableScreen(width,height,4,projection),true);
  assert.equal(usableScreen(width,height,1,projection),false);
  assert.equal(usableScreen(2500,1200,4,projection),false);
  for(const precision of [1,16]){
    const glass={vertices:bytes,indices:Uint16Array.of(6,7,8,3,4,5,0,1,2)};
    const screen=prepareScreenVisibility({module,precision},bytes,ids.byteLength,glass);
    screen.filter(ids,3,projection,width,height,true);
    // The opaque panel hides the far pane. The near and coincident panes
    // keep their original blend order and cannot hide each other.
    const paneCount=screen.filterGlass();
    assert.deepEqual([...screen.glassOutput.subarray(0,paneCount)],[6,7,8,0,1,2]);
    const size=screen.filter(ids,ids.length,projection,width,height,true);
    assert.deepEqual([...screen.output.subarray(0,size)], [0,1,2,6,7,8,12,13,14,15,16,17]);
    assert.equal(screen.filter(ids,ids.length,projection,width,height,false),null);
    // The sample-only gangway keeps covered faces even behind another surface.
    const sampleCount=screen.filter(ids,ids.length,projection,width,height,false,false);
    assert.deepEqual([...screen.output.subarray(0,sampleCount)],[0,1,2,3,4,5,6,7,8,12,13,14,15,16,17]);
    // Rebuilding the source list at the same camera must invalidate the cached result.
    assert.equal(screen.filter(ids.subarray(3,6),3,projection,width,height,true),3);
    assert.deepEqual([...screen.output.subarray(0,3)], [3,4,5]);
  }
});

test('worker vertex blocks cover partial index sections and reset between sightlines', async () => {
  const {filterView, prepareViewSpans} = await import('../site/tidewater-rocha/mobile/view-volume.js');
  const indices = new Uint32Array(6150);
  const vertices = new Uint8Array(65540 * 32);
  const xyz = new Float32Array(vertices.buffer), layers = new Int16Array(vertices.buffer);
  // Include the high bit of a block word and vertices beyond the 16-bit index range.
  indices.set([992, 993, 994], 3069);
  indices.set([65536, 65537, 65538], 3072);
  indices.set([32, 33, 34], 6144);
  for (let i = 65536; i < 65539; i++) {
    xyz[8*i] = 2;
    layers[16*i+14] = -2;
  }
  const planes = new Float64Array([1,0,0,-1, -1,0,0,3, 0,1,0,1, 0,-1,0,1]);
  const spans = prepareViewSpans(indices, vertices.length / 32);
  const reusedMasks = new Uint8Array(vertices.length / 32).fill(255);
  for (const [first, count] of [[3069, 6], [6144, 3], [3072, 3], [3069, 6]]) {
    const check = (masks, selector) => {
      const slots = new Uint32Array(count/3), sky = {basis:[0,0,1,0,1], runs:[]};
      const {output, length} = filterView(vertices, indices, first, count, planes, masks, null, slots, sky, selector);
      return {indices:Array.from(output.subarray(0,length)), slots:Array.from(slots.subarray(0,length/3)), runs:sky.runs};
    };
    assert.deepEqual(check(reusedMasks, spans), check(new Uint8Array(reusedMasks.length), null));
  }
});

test('off-screen sky runs follow the sun and can be restored independently of room occlusion', async () => {
  const {widenedView, filterView} = await import('../site/tidewater-rocha/mobile/view-volume.js');
  const {filterRoomCell} = await import('../site/tidewater-rocha/mobile/room-visibility.js');
  const planes = widenedView([1,0,0,0, 0,1,0,0, 0,0,0,-1, 0,0,.1,0]);
  const bytes = new Uint8Array(12*32), positions = new Float32Array(bytes.buffer), finish = new Int16Array(bytes.buffer);
  // Two adjacent triangles sit behind this viewer, then one crosses the edge.
  const corners = [[0,0,2],[.1,0,2],[0,.1,2], [.1,0,2],[0,.1,2],[.1,.1,2],
    [-.1,0,-2],[3,0,-1],[.1,.2,-2], [-.1,-.1,-1],[.2,-.1,-1],[0,.2,-1]];
  for (const [i, [x,y,z]] of corners.entries()) {
    if (i < 9) { positions.set([x*.98289474, y-2.01, z*.97861111], i*8); finish[i*16+14] = -2; }
    else positions.set([x,y,z], i*8);
  }
  const indices = Uint16Array.from(corners.keys()), slots = new Uint32Array(4), compact = new Uint16Array(12);
  const sky = {basis:[0,0,1,0,1], runs:[]};
  const {output, length} = filterView(bytes, indices, 0, 12, planes, new Uint8Array(12), null, slots, sky);
  assert.deepEqual([...output], [...indices]);
  assert.deepEqual(sky.runs, [0,6]);
  const room = new Uint8Array([1<<3]);
  let count = filterRoomCell(room, 0, 12, output, length, slots, compact, sky.runs);
  assert.deepEqual([...compact.subarray(0,count)], [6,7,8]);
  count = filterRoomCell(room, 0, 12, output, length, slots, compact);
  assert.deepEqual([...compact.subarray(0,count)], [...indices.slice(0,9)]);
  count = filterRoomCell(null, -1, 0, output, length, null, compact, sky.runs);
  assert.deepEqual([...compact.subarray(0,count)], [...indices.slice(6)]);
  const turned = {basis:[0,0,1,0,-1], runs:[]};
  filterView(bytes, indices, 0, 12, planes, new Uint8Array(12), null, slots, turned);
  assert.deepEqual(turned.runs, [6,9]);
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

test('a settled view retains sample winners, tag collisions and the moving sky in draw order', async () => {
  const {coverageWords, filterSamples} = await import('../site/tidewater-rocha/mobile/sample-visibility.js');
  const winners = new Uint32Array(coverageWords);
  for (const id of [0, 31, 65535]) winners[id >>> 5] |= 1 << (id & 31);
  const vertices = new Uint8Array(65538 * 32);
  new Int16Array(vertices.buffer)[7 * 16 + 14] = -2;
  const indices = Uint32Array.of(
    31, 0, 0,     // Outside the active source range.
    251, 31, 0,   // Only the provoking vertex identifies the face.
    0, 1, 2,
    65536, 3, 4,  // Shares a tag with vertex zero.
    31, 5, 6,
    65535, 6, 5,
    7, 8, 9,      // Sky may turn back into view at the next sun angle.
    31, 0, 0
  );
  const {output, length, skyStart} = filterSamples(winners, vertices, indices, 3, 18);
  assert.deepEqual([...output.subarray(0, length)], [0,1,2, 65536,3,4, 31,5,6, 65535,6,5, 7,8,9]);
  assert.equal(skyStart, 12);
});

test('an empty coverage mask can retain just the sky and pad its 16-bit index upload', async () => {
  const {coverageWords, filterSamples} = await import('../site/tidewater-rocha/mobile/sample-visibility.js');
  const vertices = new Uint8Array(9 * 32);
  new Int16Array(vertices.buffer)[6 * 16 + 14] = -2;
  const {output, length, skyStart} = filterSamples(new Uint32Array(coverageWords), vertices,
    Uint16Array.of(0,1,2, 3,4,5, 6,7,8), 0, 9);
  assert.deepEqual([...output.subarray(0, length)], [6,7,8]);
  assert.equal(output.byteLength % 4, 0);
  assert.equal(skyStart, 0);
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

test('boarding visibility follows each longitudinal row of the slope and rejects malformed heights', async () => {
  const {roomCells, roomCellOffset} = await import('../site/tidewater-rocha/mobile/room-visibility.js');
  const region = {profile:'exterior', first:0, count:3, nx:1, nz:2, offset:0,
    box:[0,2,0,1,4,1], heights:[2.3,2.4,3.1,3.2]};
  const lists = {exterior:new Uint16Array(3)}, bits = Uint8Array.of(0,1);
  const cells = roomCells({regions:[region]}, bits, lists);
  const group = cells.range('exterior',0,3);
  const camera = new Float64Array(16), lens = new Float64Array(16);
  lens[0]=lens[5]=3; lens[14]=.02; camera[12]=.5;
  for (const [z, y, expected] of [[.25,2.35,0],[.25,3.15,-1],[.75,2.35,-1],[.75,3.15,1],[.75,3.201,-1]]) {
    camera[14]=z; camera[13]=y;
    assert.equal(roomCellOffset(group,camera,lens,360,540),expected);
  }
  for (const heights of [[2.3,2.4], [2.3,2.4,3.2,3.1], [2.3,NaN,3.1,3.2]]) {
    assert.throws(() => roomCells({regions:[{...region,heights}]},bits,lists), /boarding eye heights/);
  }
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

test('the resident main deck has baked visibility at the cockpit, saloon and guest stair approach', async () => {
  const dir = new URL('../site/tidewater-rocha/mobile/', import.meta.url);
  const data = gunzipSync(await readFile(new URL('room-visibility.bin', dir)));
  const header = JSON.parse(data.toString('utf8', 4, 4 + data.readUInt32LE(0)));
  const manifest = JSON.parse(await readFile(new URL('guest-access.json', dir)));
  const views = manifest.profiles.main.batches[0].views;
  for (const [x,y] of [[6.68,-.48], [9.55,0], [17.15,-1.42]]) {
    const eye = [y*yacht.sy, 5.55-yacht.seaReference, x*yacht.sx-yacht.length/2];
    assert.ok(header.regions.some(region => region.profile === 'main' &&
      eye.every((v,i) => region.box[i] <= v && v < region.box[i+3]) &&
      views.some(view => view.first === region.first && view.count >= region.count)), 'Missing main deck cell at '+[x,y]);
  }
  const {visibility, batches} = manifest.profiles.main;
  for (const side of [-1,1]) {
    const eye = [.74*side*yacht.sy, 5.55-yacht.seaReference, 14.4*yacht.sx-yacht.length/2];
    const band = Math.floor((eye[2]-visibility.start)/visibility.step) + (side>0 ? visibility.lateralBands : 0);
    const [first,count] = batches[0].ranges[band];
    assert.ok(header.regions.some(r => r.profile==='main' && r.first===first && r.count===count &&
      eye.every((v,k)=>v>=r.box[k] && v<r.box[k+3])), 'Missing all-direction dining aisle on side '+side);
  }
});

test('each aft and solarium stair tread has visibility data at its modeled camera height', async () => {
  const dir = new URL('../site/tidewater-rocha/mobile/', import.meta.url);
  const data = gunzipSync(await readFile(new URL('room-visibility.bin', dir)));
  const header = JSON.parse(data.toString('utf8', 4, 4 + data.readUInt32LE()));
  const manifest = JSON.parse(await readFile(new URL('guest-access.json', dir)));
  for (const [profile, file] of [['upper', 'upper-terrace'], ['sun', 'sun-deck']]) {
    const {flight} = JSON.parse(await readFile(new URL(file + '.json', dir)));
    const deck = manifest.profiles[profile];
    for (const {polygons, height, id} of flight.surfaces) {
      const points = polygons.flat();
      const centre = axis => {
        const values = points.map(p => p[axis]);
        return (Math.min(...values) + Math.max(...values)) / 2;
      };
      const x = centre(1) * yacht.sy, z = centre(0) * yacht.sx - yacht.length/2;
      const y = height + 1.6 - yacht.seaReference;
      const band = Math.floor((z - deck.visibility.start) / deck.visibility.step);
      const [first, count] = deck.batches[0].ranges[band+(x>0?(deck.visibility.lateralBands??0):0)];
      assert.ok(header.regions.some(r => r.profile === profile && first === r.first && count === r.count &&
        x >= r.box[0] && x < r.box[3] && y - .19 >= r.box[1] && y + .19 <= r.box[4] &&
        z >= r.box[2] && z < r.box[5]), 'Missing stair eye interval at ' + id);
    }
  }
});

test('rooms on different decks can share an index band and decode their camera rows independently', async () => {
  const {roomCells} = await import('../site/tidewater-rocha/mobile/room-visibility.js');
  const main = {profile:'upper', first:3, count:6, nx:2, nz:2, offset:0, box:[0,3,0,1,4,1]};
  const bridge = {...main, offset:4, box:[0,5,0,1,6,1]};
  const encoded = Uint8Array.of(1,3,5,10, 8,12,10,5);
  const cells = roomCells({version:2, regions:[main, bridge]}, encoded, {upper:new Uint16Array(9)});
  assert.deepEqual([...cells.bits], [1,2,4,8, 8,4,2,1]);
  const camera = new Float32Array(16);
  camera[12]=.4; camera[14]=.5;
  for (const [height, offset] of [[3.5,0], [4.5,undefined], [5.5,4]]) {
    camera[13]=height;
    assert.equal(cells.range('upper',3,6,camera)?.offset, offset);
  }
  camera[14]=1;
  assert.equal(cells.range('upper',3,6,camera), null);
});

test('a stationary camera restores sky triangles when the sun turns through its view', async () => {
  const {prepareSkyVisibility} = await import('../site/tidewater-rocha/mobile/sky-visibility.js');
  const packed = new Uint8Array(6 * 32);
  const pos = new Float32Array(packed.buffer), finish = new Int16Array(packed.buffer);
  const points = [[0,-.1,-1],[.1,-.1,-1],[0,.1,-1],[0,-.1,1],[-.1,-.1,1],[0,.1,1]];
  for(const [i,[x,y,z]] of points.entries()) {
    pos.set([x*.98289474,y-2.01,z*.97861111],8*i);
    finish[i*16+14]=-2;
  }
  const frame=new Float32Array(24);
  frame.set([1,0,0,0, 0,1,0,0, 0,0,0,-1, 0,0,.1,0]);
  frame[21]=1;
  const indices=Uint16Array.of(0,1,2,3,4,5), output=new Uint16Array(6);
  const filter=prepareSkyVisibility(packed);
  for(const [east,expected] of [[1,[0,1,2]],[-1,[3,4,5]],[1,[0,1,2]]]) {
    frame[23]=east;
    const count=filter(indices,0,indices.length,frame,360,540,output);
    assert.deepEqual([...output.subarray(0,count)],expected);
  }
});
