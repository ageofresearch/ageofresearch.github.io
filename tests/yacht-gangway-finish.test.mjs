import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import {
  gangwayTeak,
  gangwaySample,
  gangwayGrain,
  prepareBoardingFinish,
  resolvePartFinish,
} from '../site/tidewater-rocha/mobile/gangway-finish.js';
import {
  createBoarding,
  createFinishes,
  resolveYachtPartFinish,
} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { A as Group } from '../site/tidewater-rocha/assets/common-HBn3Movl.js';
import { simplify } from '../scripts/build-yacht-saloon.mjs';
import { compactGeometry } from '../scripts/build-yacht-sun.mjs';
import { finishPatternMips, teakPatternMips } from '../site/tidewater-rocha/mobile/finish-patterns.js';
import { MeshoptSimplifier } from '../scripts/yacht-geometry/node_modules/meshoptimizer/index.js';
await MeshoptSimplifier.ready;
const root = new URL('../site/tidewater-rocha/', import.meta.url);
const raw = {
  id: 'raw-teak',
  materialID: 'M42',
  vertices: [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  indices: [0, 1, 2],
};

test('raw material-only parts retain their pattern through compaction and simplification, including explicit zero', () => {
  assert.equal(raw.finish, undefined);
  assert.deepEqual(compactGeometry(raw).surfaceTypes, [1, 1, 1]);
  assert.deepEqual(compactGeometry({ ...raw, surfaceTypes: [0, 0, 0] }).surfaceTypes, [0, 0, 0]);
  const dense = { ...raw, indices: Array.from({ length: 30 }, () => raw.indices).flat() };
  assert.ok(simplify(dense, 0.01).surfaceTypes.every((t) => t === 1));
  assert.throws(() => compactGeometry({ ...raw, materialID: 'unknown' }), /Unknown yacht finish/);
  assert.throws(() => resolvePartFinish({ finish: [1, NaN, 0, 1] }, {}), /Unknown yacht finish/);
});

test('seven boards and six four-millimetre caulk seams fit every existing panel exactly', () => {
  const { width, boards, joint, woodWidth } = gangwayTeak,
    pitch = woodWidth + joint;
  assert.ok(Math.abs(boards * woodWidth + (boards - 1) * joint - width) < 1e-12);
  assert.ok(Math.abs(woodWidth - 0.10571428571428572) < 1e-12);
  for (let code = 37; code <= 39; code++) {
    for (let board = 0; board < 7; board++) {
      const y = 2.718 + board * pitch + woodWidth / 2;
      assert.equal(gangwaySample(0, y, code).board, board);
      assert.equal(gangwaySample(0, y, code).joint, false);
    }
    for (let k = 1; k <= 6; k++) {
      const centre = 2.718 + k * pitch - joint / 2;
      assert.equal(gangwaySample(0, centre, code).joint, true);
      for (const side of [-1, 1]) {
        assert.equal(gangwaySample(0, centre + side * 0.00199, code).joint, true);
        assert.equal(gangwaySample(0, centre + side * 0.00201, code).joint, false);
      }
    }
    // No invented end joints every 2.15 m; caulking depends only on board width.
    for (const x of [-4.4, -2.15, 0, 2.15]) assert.equal(gangwaySample(x, 3.1, code).joint, false);
  }
  for (const code of [40, 41]) assert.equal(gangwaySample(1, 3.1, code).joint, false);
  for (const y of [2.835, 2.94, 3.045, 3.15, 3.255, 3.36]) {
    assert.ok(gangwaySample(2.8, y, 42).distance < 1e-10, 'Landing seam shifted from its original grid');
    assert.equal(gangwaySample(2.8, y, 42).joint, true);
  }
});

test('boarding finish follows the approved deployed geometry and the independent teak panels', async () => {
  const baseline = JSON.parse(
    await readFile(new URL('./fixtures/yacht-gangway-geometry.json', import.meta.url)),
  );
  const materials = createFinishes(0, true, true, true, true),
    boarding = createBoarding({ group: new Group() }, null, {
      gangwayOnly: true,
      includeLanding: true,
      materials,
    });
  try {
    const retained=baseline.filter(p=>!/hanging-guard-line|rope-collar/.test(p.id));
    const hardware=boarding.parts.filter(p=>!p.context);
    assert.equal(hardware.length,retained.length);
    for (const part of hardware) {
      const old = baseline.find((p) => p.id === part.id);
      assert.ok(old, part.id);
      if(!/upright|seated socket/.test(part.feature))assert.equal(
        createHash('sha256')
          .update(JSON.stringify([part.vertices, part.indices, part.bounds]))
          .digest('hex'),
        old.geometrySHA256,
        part.id,
      );
      if (part.finish[3] >= 37 && part.finish[3] <= 42) {
        assert.deepEqual(part.finish.slice(0, 3), [part.finish[3]===42 ? 0x988b80 : 0xb69a73, 0.8, 0]);
      } else if(part.feature.endsWith('nested frame'))assert.deepEqual(part.finish,[0x262729,.67,0,0]);
      else if(part.feature.endsWith('recessed underskin') && part.materialID==='M47')assert.deepEqual(part.finish,[0x41464b,.60,0,0]);
      else assert.deepEqual(part.finish, resolveYachtPartFinish({ materialID: part.materialID }));
    }
    assert.equal(boarding.parts.filter((p) => p.finish[3] >= 37 && p.finish[3] <= 39).length, 3);
    assert.equal(boarding.parts.filter((p) => p.finish[3] >= 37 && p.finish[3] <= 42).length, 19);
    const pier = boarding.parts.find((p) => p.feature === 'fixed lake pier teak');
    if (pier) assert.equal(pier.finish[0], 0xa59b88);
    const lake = {
      id: 'boarding/owner/fixed-lake-pier-teak',
      feature: 'fixed lake pier teak',
      materialID: 'M42',
    };
    assert.deepEqual(
      prepareBoardingFinish(lake, { M42: [0xa59b88, 0.72, 0, 1] }).finish,
      [0xa59b88, 0.72, 0, 1],
    );
    const other = { id: 'MD/other', materialID: 'M42' };
    assert.equal(prepareBoardingFinish(other, { M42: [7, 0.7, 0, 1] }).finish[0], 7);
  } finally {
    boarding.dispose();
    materials.opaque.dispose();
    materials.glass.dispose();
  }
});

test('each fallback and active profile preserves the three boarding material identities within budget', async () => {
  for (const name of [
    'main-saloon',
    'upper-terrace',
    'sun-deck',
    'upper-interior',
    'bridge-helm',
    'bow-deck',
    'bridge-access',
    'guest-access',
  ]) {
    const manifest = JSON.parse(await readFile(new URL('mobile/' + name + '.json', root)));
    const buffer = await readFile(new URL('mobile/' + name + '.bin', root)),
      data = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    assert.equal(manifest.version, name==='main-saloon' ? 'guest-stairwell-1' : 'stern-flag-region-1');
    for (const [profile, p] of Object.entries(manifest.profiles)) {
      assert.ok(p.triangles <= 25000);
      assert.equal(p.batches.length, 2);
      const b = p.batches[0],
        attr = (n) => new Float32Array(data, b.attributes[n].offset, b.attributes[n].length);
      const positions = attr('position'),
        normal = attr('normal'),
        surface = attr('aSurface');
      const seen = new Set();
      for (let i = 0; i < positions.length / 3; i++) {
        const x = (positions[i * 3 + 2] + 17.615) / (35.23 / 36),
          y = positions[i * 3] / (7.47 / 7.6);
        if (x < -4.5 || x > 2.3 || y < 2.7179 || y > 3.4821 || normal[i * 3 + 1] < 0.95) continue;
        for (let panel = 0; panel < 3; panel++)
          if (
            [gangwayTeak.breaks[panel] + 0.022, gangwayTeak.breaks[panel + 1] - 0.022].some(
              (v) => Math.abs(v - x) < 1e-5,
            ) &&
            [2.718, 3.482].some((v) => Math.abs(v - y) < 1e-5)
          ) {
            assert.equal(surface[i * 4 + 2], 37 + panel, `${name}/${profile} lost panel ${panel + 1}`);
            const left = gangwayTeak.breaks[panel] + 0.022,
              right = gangwayTeak.breaks[panel + 1] - 0.022;
            const u = (x - left) / (right - left),
              expected = panel === 1 ? 1 - u : u;
            assert.ok(Math.abs(surface[i * 4] - expected * 0.75) < 1e-5, `${name}/${profile} lost panel U`);
            assert.ok(
              Math.abs(surface[i * 4 + 1] - (y - 2.718) / 0.764) < 1e-5,
              `${name}/${profile} lost panel V`,
            );
            seen.add(panel);
          }
      }
      assert.equal(seen.size, 3, `${name}/${profile}`);
    }
  }
});

test('boarding fibres are deterministic and mipmapped within 3.6 MB with repeatable room finishes', async () => {
  assert.ok(Math.abs(gangwayGrain(0.3, 0.7) - gangwayGrain(1.3, 1.7)) < 1e-10);
  const levels = finishPatternMips(),
    teak = teakPatternMips();
  assert.equal(
    levels.reduce((n, p) => n + p.data.length, 0),
    699048,
  );
  assert.ok(
    levels.reduce((n, p) => n + p.data.length, 0) + teak.reduce((n, p) => n + p.data.length, 0) < 3600000,
  );
  const last = levels.at(-1);
  const decode = (r, g) => Math.pow(((r * 256 + g) / 65535) * 1.1, 2.4);
  assert.ok(Math.abs(decode(last.data[6], last.data[7]) - 1) < 0.06);
  const first = levels[0],
    base = 256 * 256 * 6,
    wood = (0.764 - 6 * 0.004) / 7,
    pitch = wood + 0.004;
  for (let k = 1; k <= 6; k++) {
    const row = Math.floor(((k * pitch - 0.002) / 0.764) * 256),
      column = 100;
    const at = (y) => base + (y * 256 + column) * 2;
    const joint = at(row),
      centre = at(Math.floor((((k - 1) * pitch + wood / 2) / 0.764) * 256));
    assert.ok(
      decode(first.data[joint], first.data[joint + 1]) <
        decode(first.data[centre], first.data[centre + 1]) * 0.8,
      'Prepared caulk seam missing',
    );
  }
  const approved = JSON.parse(await readFile(new URL('./fixtures/yacht-finish-patterns.json', import.meta.url)));
  for (const [i, level] of levels.entries())
    assert.equal(
      createHash('sha256')
        .update(level.data.subarray(0, level.size * level.size * 6))
        .digest('hex'),
      approved[i],
    );
});
