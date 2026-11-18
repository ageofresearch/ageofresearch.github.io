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

test('every visible source face of all 24 hanging cables, the three folding chairs and the pouf piping reaches its draw', () => {
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
      if (/hanging-guard-line|director-chair|pouf-perimeter-piping/.test(part.id)) {
        seen.push(part.id);
        for (let i = offset; i < end; i += 3) {
          const triangle = face(geometry.attributes.position.array, reference, i);
          const [a, b, c] = triangle;
          const u = b.map((x, k) => x - a[k]),
            v = c.map((x, k) => x - a[k]);
          const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
          const locations = actual.get(key(triangle)) || [];
          for (const [band, [first, count]] of batch.ranges.entries()) {
            const eye = [
              n[0] > 0 ? 4.5 : -4.5,
              (n[1] > 0 ? 5.85 : 3.3) - basis.seaReference,
              start + (band + Number(n[2] > 0)) * step,
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
    assert.equal(seen.filter((id) => id.includes('hanging-guard-line')).length, 24);
    assert.equal(seen.filter((id) => id.includes('director-chair')).length, 12);
    assert.equal(seen.filter((id) => id.includes('pouf-perimeter-piping')).length, 1);
  } finally {
    dispose();
  }
});

test('the packaged rails, gate, wet bar and four saloon armchairs retain their curved meshes', () => {
  const audit = manifest.profiles.exterior.audit;
  for (const [pattern, pieces, minTriangles] of [
    [/gangway-top-handrail/, 2, 96],
    [/open-inboard-rounded-boarding-gate-frame/, 1, 250],
    [/gate-polished-chevron/, 1, 48],
  ]) {
    const matches = audit.filter((p) => pattern.test(p.id));
    assert.equal(matches.length, pieces);
    assert.ok(matches.every((p) => p.triangles >= minTriangles));
  }
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
