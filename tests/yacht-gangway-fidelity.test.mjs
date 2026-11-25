import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { fixture } from './yacht-saloon-fixture.mjs';
import { decodeGuestAccess } from '../site/tidewater-rocha/mobile/guest-access.js';
import { l as basis } from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';

const root = new URL('../site/tidewater-rocha/mobile/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('guest-access.json', root)));
const binary = await readFile(new URL('guest-access.bin', root));
const buffer = binary.buffer.slice(binary.byteOffset, binary.byteOffset + binary.byteLength);

function face(vertices, indices, offset) {
  return Array.from(indices.subarray(offset, offset + 3), (id) =>
    Array.from(vertices.subarray(id * 3, id * 3 + 3)),
  );
}

// Keep the winding. A reversed face has the same positions, but disappears from the opposite side.
const key = (points) => points.flat().join(',');

test('every visible source face of the six folding chairs reaches its draw', () => {
  const { model, dispose } = fixture();
  try {
    const profile = decodeGuestAccess(manifest, buffer).profiles.exterior;
    const batch = profile.batches[0],
      { start, step } = profile.visibility;
    const actual = new Map();
    for (let i = 0; i < batch.indices.length; i += 3) {
      const signature = key(face(batch.attributes.position, batch.indices, i));
      if (!actual.has(signature)) actual.set(signature, []);
      actual.get(signature).push(i);
    }
    const geometry = model.boarding.meshes.find((mesh) => !mesh.material.transparent).geometry;
    const seen = [],
      reference = geometry.index.array;
    let offset = 0;
    for (const part of [...model.boarding.parts, ...model.terrace.parts, ...model.transom.parts].filter(
      (p) => !p.glass,
    )) {
      const end = offset + part.indices.length;
      if (/director-chair/.test(part.id)) {
        seen.push(part.id);
        for (let i = offset; i < end; i += 3) {
          const triangle = face(geometry.attributes.position.array, reference, i);
          const [a, b, c] = triangle;
          const u = b.map((x, k) => x - a[k]),
            v = c.map((x, k) => x - a[k]);
          const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
          const locations = actual.get(key(triangle)) || [];
          for (const [band, [first, count]] of batch.ranges.entries()) {
            const half=profile.visibility.lateralBands;
            const port=half&&band>=half;
            const eye = [
              n[0]>0?(half&&!port?0:4.5):(port?0:-4.5),
              (n[1] > 0 ? 5.85 : 3.3) - basis.seaReference,
              start + ((half?band%half:band) + Number(n[2] > 0)) * step,
            ];
            if (eye.reduce((d, x, k) => d + (x - a[k]) * n[k], 0) <= 0) continue;
            assert.ok(
              locations.some((at) => at >= first && at < first + count),
              part.id + ' lost a visible face in band ' + band,
            );
          }
        }
      }
      offset = end;
    }
    assert.equal(offset, reference.length);
    assert.ok(!model.boarding.parts.some(p=>/hanging guard line|rope collar/.test(p.feature)));
    assert.equal(seen.filter((id) => id.includes('director-chair')).length, 30);
  } finally {
    dispose();
  }
});

test('both mobile guard rails have a separate outer and inner grip and six supported uprights', () => {
  const { model, dispose } = fixture();
  try {
    const { parts, railPaths, layout, height } = model.boarding;
    for (const side of [-1, 1]) {
      const grips = railPaths.filter(p => p.id.startsWith(`gangway/${side}/`));
      const posts = parts.filter(p => p.feature.startsWith(`gangway ${side} upright `));
      assert.equal(grips.length, 2);
      assert.equal(posts.length, 6);
      assert.ok(grips[0].points[0][0] > layout.start);
      assert.ok(grips[1].points.at(-1)[0] < layout.gateEnd);
      assert.ok(grips[1].points.at(-1)[2] > layout.deckHeight + 1.15);
      const end = grips[0].points.at(-1), start = grips[1].points[0];
      assert.ok(Math.hypot(...end.map((value, axis) => value - start[axis])) > 0.045);
      assert.ok(posts.filter(p => p.bounds[3] - p.bounds[0] > 0.08).length >= 4);
      for (const post of posts) {
        const socket = parts.find(p => p.feature === post.feature.replace('upright', 'seated socket'));
        const x = (socket.bounds[0] + socket.bounds[3]) / 2;
        assert.ok(socket.bounds[2] < height(x) && height(x) < socket.bounds[5]);
        assert.ok(post.bounds[2] < socket.bounds[5] && post.bounds[5] > socket.bounds[2]);
        assert.ok(post.bounds[5] - post.bounds[2] > 0.86);
        assert.ok(post.finish[1] < socket.finish[1]);
      }
    }
  } finally {
    dispose();
  }
});

test('the chair weave occupies an atlas slice beyond the yacht deck', () => {
  const data=decodeGuestAccess(manifest,buffer);
  for(const profile of Object.values(data.profiles)){
    const attrs=profile.batches[0].attributes;
    const positions=attrs.position, surface=attrs.aSurface;
    for(let i=0;i<positions.length/3;i++){
      if(surface[i*4+2]===1)
        assert.ok(positions[i*3]/basis.sy/.105+64<112,'Deck enters the cockpit canvas atlas slice');
    }
  }
});

test('the packaged rails, gate, wet bar and saloon dining chairs retain their curved meshes', () => {
  const audit = manifest.profiles.exterior.audit;
  for (const [name, profile] of Object.entries(manifest.profiles)) {
    const rails = profile.audit.filter(part => /gangway-(?:top-handrail|-?1-(?:upright|seated-socket))/.test(part.id));
    assert.equal(rails.length, 28, name);
    assert.ok(rails.every(part => part.triangles > 0), name);
  }
  for (const [pattern, pieces, minTriangles] of [
    [/gangway-top-handrail/, 4, 48],
    [/open-inboard-rounded-boarding-gate-frame/, 1, 250],
    [/gate-polished-chevron/, 1, 48],
  ]) {
    const matches = audit.filter((p) => pattern.test(p.id));
    assert.equal(matches.length, pieces);
    assert.ok(matches.every((p) => p.triangles >= minTriangles));
  }
  const sleeves=audit.filter(p=>p.id.startsWith('boarding/owner/') &&
    /nested-frame|recessed-underskin|inset-side-channel|underside-collar/.test(p.id));
  assert.equal(sleeves.length,14);
  assert.ok(sleeves.every(p=>p.triangles===p.sourceTriangles),'The boarding profile must preserve the fitted shell');
  for (const n of ['007', '008', '009', '010']) {
    const shells = audit.filter((p) => p.id.startsWith('MD_SOF_' + n + '/') && p.sourceTriangles >= 100);
    assert.ok(shells.length && shells.every((p) => p.triangles > 0 && p.error <= 0.009));
  }
  const bar = audit.filter((p) => /cockpit-wet-bar|cockpit-grey-counter/.test(p.id));
  assert.ok(bar.length && bar.every((p) => p.triangles > 0 && p.error <= 0.006));
});

for (const name of ['exterior', 'upper'])
  test(name + ' local draw covers every visible face in its eye box', () => {
    const batch = decodeGuestAccess(manifest, buffer).profiles[name].batches[0];
    const { axis, box, first, count, lowCount } = batch.localView;
    const all = new Set(),
      low = new Set(),
      indices = batch.indices,
      vertices = batch.attributes.position;
    const indexedKey = (i) => indices.subarray(i, i + 3).join(',');
    for (let i = first; i < first + count; i += 3) {
      all.add(indexedKey(i));
      if (i < first + lowCount) low.add(indexedKey(i));
    }
    for (let i = 0; i < first; i += 3) {
      const [a, b, c] = face(vertices, indices, i);
      const u = b.map((x, k) => x - a[k]),
        v = c.map((x, k) => x - a[k]);
      const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
      const visible = [0, 1, 2].reduce((d, k) => d + n[k] * (box[k + (n[k] > 0 ? 3 : 0)] - a[k]), 0) > 0;
      if (!visible) continue;
      assert.ok(all.has(indexedKey(i)), 'Missing visible face in local draw');
      if (Math.min(a[axis], b[axis], c[axis]) <= box[axis + 3])
        assert.ok(low.has(indexedKey(i)), 'Missing face in directional draw');
    }
  });

test('incomplete, overlapping backwards or out-of-bounds draw windows fail before activation', () => {
  for (const change of [
    (v) => (v.lowCount = v.count + 3),
    (v) => (v.box[3] = v.box[0]),
    (v) => (v.count -= 3),
  ]) {
    const broken = structuredClone(manifest);
    change(broken.profiles.exterior.batches[0].localView);
    assert.throws(() => decodeGuestAccess(broken, buffer), /cubierta/);
  }
  for (const mutate of [
    (r) => (r[0][0] += 3),
    (r) => (r[1][0] = r[1][0] + r[1][1] + 3),
    (r) => (r.at(-1)[1] -= 3),
    (r) => (r.at(-1)[1] += 3),
  ]) {
    const broken = structuredClone(manifest);
    mutate(broken.profiles.exterior.batches[0].ranges);
    assert.throws(() => decodeGuestAccess(broken, buffer), /dibujo/);
  }
});

test('invalid directional windows cannot replace a working navigation package',()=>{
  for(const edit of [
    b=>{b.views[0].first+=3;}, b=>{b.views.at(-1).count-=3;},
    b=>{b.views[0].sign=2;}, b=>{b.views[0].box[5]=b.views[0].box[2];}, b=>{b.cone[0]=NaN;}, b=>{b.views.at(-1).cone=[2.8,-1,1.25];},
  ]){
    const broken=structuredClone(manifest);edit(broken.profiles.exterior.batches[0]);
    assert.throws(()=>decodeGuestAccess(broken,buffer),/cubierta|direccional|dibujo/);
  }
});
