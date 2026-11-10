import {readFileSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

const PAVING_PAIR_ORDER_SCHEMA = {
  schemaVersion: 1, method: 'four-phase-balanced-eight-pair-flip',
  globalIndex: 'block*20+sample', formula: '(i%2) XOR (floor(i/4)%2)',
  bit0: ['baseline', 'current'], bit1: ['current', 'baseline'],
  samples: 60, blocks: 3, samplesPerBlock: 20,
  expectedPerPhase: [7, 8], expectedPerBlockPerPhase: [2, 3],
  currentFirst: 30, baselineFirst: 30, maxOrderRun: 2,
};

function balancedPavingPairOrder(index) {
  assert.ok(Number.isSafeInteger(index) && index >= 0 && index < 60);
  const bit = (index % 2) ^ (Math.floor(index / 4) % 2);
  return bit ? ['current', 'baseline'] : ['baseline', 'current'];
}

function assertPavingPairOrderCoverage(blocks, declared = null) {
  assert.equal(blocks.length, 3);
  const phaseCounts = () => Array.from({length: 4}, (_, phase) => ({phase, currentFirst: 0, baselineFirst: 0}));
  const phases = phaseCounts(), records = []; let maxOrderRun = 0, run = 0, previous = null;
  for (let block = 0; block < 3; block++) {
    assert.equal(blocks[block].length, 20);
    const state = {block, currentFirst: 0, baselineFirst: 0, phases: phaseCounts()};
    for (let sample = 0; sample < 20; sample++) {
      const pair = blocks[block][sample], index = block * 20 + sample;
      assert.equal(pair.sample, index); assert.equal(pair.block, block);
      assert.deepEqual(pair.order, balancedPavingPairOrder(index), 'Incorrect global-index pair order');
      assert.deepEqual(pair.actualOrder, pair.order, 'Actual completed call order differs from planned order');
      const frame = pair.shadowSchedule.current.shadowFrameAfter;
      assert.ok(Number.isSafeInteger(frame) && frame >= 0);
      const phase = frame % 4, key = pair.actualOrder[0] === 'current' ? 'currentFirst' : 'baselineFirst';
      phases[phase][key]++; state.phases[phase][key]++; state[key]++;
      run = key === previous ? run + 1 : 1; maxOrderRun = Math.max(maxOrderRun, run); previous = key;
    }
    assert.equal(state.currentFirst, 10); assert.equal(state.baselineFirst, 10);
    for (const p of state.phases) assert.deepEqual([p.currentFirst, p.baselineFirst].sort((a, b) => a - b), [2, 3]);
    records.push(state);
  }
  for (const p of phases) assert.deepEqual([p.currentFirst, p.baselineFirst].sort((a, b) => a - b), [7, 8]);
  assert.equal(maxOrderRun, 2);
  const result = {schemaVersion: 1, currentFirst: 30, baselineFirst: 30, maxOrderRun, phases, blocks: records};
  if (declared !== null) assert.deepEqual(declared, result, 'Pair-order histogram differs from actual raw calls');
  return result;
}

// Evidence validation only: never changes clocks, caches, rendering or timings.
function validatePavingTimingV2(metadata, cases = metadata.performance) {
  assert.notEqual(metadata.diagnosticOnly, true); assert.notEqual(metadata.notAcceptance, true);
  const periods = [1, 2, 4];
  assert.deepEqual(metadata.shadowTiming, {
    schemaVersion: 2, clockOrigin: 100, periods,
    method: 'match-shadow-and-cloud-frame-before-every-timed-call',
    matrixEncoding: '3-column-major-mat4x4-f32le', initialViewportSchemaVersion: 1,
    pairOrder: PAVING_PAIR_ORDER_SCHEMA,
  }, 'Missing or obsolete matched shadow timing evidence');
  const start = {width: 1280, height: 900, devicePixelRatio: 1};
  const ready = {...start, sceneCssWidth: 936, sceneCssHeight: 800,
    renderWidth: 936, renderHeight: 800, cameraAspect: 936 / 800,
    cameraFov: 50, cameraNear: .12};
  const initial = {documentStart: start, beforeReadyResize: [], appReady: true, atReady: ready};
  assert.deepEqual(metadata.initialViewports, {schemaVersion: 1, current: initial, baseline: initial},
    'Both applications must initialize at the recorded viewport without earlier dimension changes');
  assert.equal(cases.length, 2);
  assert.deepEqual(cases.map(c => c.profile).sort(), ['desktop', 'narrow']);

  function schedule(s, settled) {
    assert.equal(s.matrixEncoding, '3-column-major-mat4x4-f32le');
    assert.ok(Array.isArray(s.matrixF32Bits) && s.matrixF32Bits.length === 48);
    const bytes = Buffer.alloc(192);
    s.matrixF32Bits.forEach((word, i) => {
      assert.ok(Number.isInteger(word) && word >= 0 && word <= 0xffffffff, 'Invalid GPU-F32 matrix word');
      bytes.writeUInt32LE(word, i * 4);
      assert.ok(Number.isFinite(bytes.readFloatLE(i * 4)), 'Nonfinite GPU-F32 shadow matrix');
    });
    assert.match(s.matrixF32Sha256, /^[a-f0-9]{64}$/);
    assert.equal(s.matrixF32Sha256, createHash('sha256').update(bytes).digest('hex'), 'Changed shadow matrix hash');
    for (const key of ['captureFrameBefore', 'captureFrameAfter', 'cloudFrameBefore', 'cloudFrameAfter',
      'shadowFrameBeforeSync', 'shadowFrameSynchronized', 'shadowFrameAfter', 'updateFrameBefore',
      'updateFrameAfter', 'dirtyMaskBefore', 'dirtyMaskAfter']) {
      assert.ok(Number.isSafeInteger(s[key]) && s[key] >= 0, 'Invalid shadow counter/state ' + key);
    }
    assert.ok(s.dirtyMaskBefore <= 7);
    assert.equal(s.captureFrameAfter, s.captureFrameBefore + 1);
    assert.equal(s.shadowFrameSynchronized, 100 + s.captureFrameBefore);
    assert.equal(s.cloudFrameBefore, s.shadowFrameSynchronized);
    assert.equal(s.updateFrameBefore, s.shadowFrameSynchronized);
    assert.equal(s.updateFrameAfter, s.updateFrameBefore + 1);
    assert.equal(s.shadowFrameAfter, s.updateFrameAfter);
    assert.equal(s.cloudFrameAfter, s.shadowFrameAfter);
    assert.equal(s.shadowFrameAfter, 100 + s.captureFrameAfter);
    assert.equal(s.updateCalls, 1);
    assert.deepEqual(s.periods, periods);
    assert.equal(s.cascadeCount, 3);
    for (const key of ['enabled', 'samplingEnabled', 'skipUnused']) assert.equal(s[key], true);
    for (const key of ['samplingEnabledBefore', 'sunMovedBefore']) assert.equal(typeof s[key], 'boolean');
    assert.equal(s.dirtyMaskAfter, 0);
    assert.equal(s.unmatchedOffsetBeforeSync, s.shadowFrameBeforeSync - s.shadowFrameSynchronized);
    assert.ok(Number.isSafeInteger(s.unmatchedOffsetBeforeSync));
    assert.ok(Array.isArray(s.sunDirection) && s.sunDirection.length === 3 && s.sunDirection.every(Number.isFinite));
    const expected = periods.flatMap((period, i) => s.sunMovedBefore || !s.samplingEnabledBefore ||
      (s.dirtyMaskBefore & (1 << i)) || (s.updateFrameAfter + i) % period === 0 ? [i] : []);
    assert.deepEqual(s.actualIndices, expected, 'Actual cascade indices disagree with the observed update');
    if (settled) {
      assert.equal(s.dirtyMaskBefore, 0);
      assert.equal(s.sunMovedBefore, false);
      assert.equal(s.samplingEnabledBefore, true);
      assert.equal(s.shadowFrameBeforeSync, s.shadowFrameSynchronized, 'Unrecorded settled shadow advancement');
      assert.equal(s.unmatchedOffsetBeforeSync, 0);
    }
  }
  function pair(current, baseline, settled) {
    schedule(current, settled); schedule(baseline, settled);
    for (const key of ['captureFrameBefore', 'captureFrameAfter', 'cloudFrameBefore', 'cloudFrameAfter',
      'shadowFrameSynchronized', 'shadowFrameAfter', 'updateFrameBefore', 'updateFrameAfter',
      'actualIndices', 'periods', 'cascadeCount', 'enabled', 'samplingEnabled', 'skipUnused', 'sunDirection']) {
      assert.deepEqual(current[key], baseline[key], 'Unmatched shadow pair ' + key);
    }
    if (settled) for (const key of ['matrixEncoding', 'matrixF32Bits', 'matrixF32Sha256',
      'shadowFrameBeforeSync', 'unmatchedOffsetBeforeSync', 'dirtyMaskBefore', 'dirtyMaskAfter',
      'sunMovedBefore', 'samplingEnabledBefore']) assert.deepEqual(current[key], baseline[key], 'Unmatched warm state ' + key);
  }
  function consecutive(previous, next) {
    assert.equal(next.captureFrameBefore, previous.captureFrameAfter, 'Skipped or duplicate capture frame');
    assert.equal(next.cloudFrameBefore, previous.cloudFrameAfter, 'Skipped or duplicate cloud frame');
    assert.equal(next.shadowFrameSynchronized, previous.shadowFrameAfter, 'Skipped or duplicate shadow frame');
    assert.equal(next.shadowFrameBeforeSync, previous.shadowFrameAfter, 'Unrecorded shadow update between frames');
    assert.deepEqual(next.sunDirection, previous.sunDirection, 'Changed timed sun direction');
    for (let i = 0; i < 3; i++) if (!next.actualIndices.includes(i)) {
      assert.deepEqual(next.matrixF32Bits.slice(i * 16, i * 16 + 16),
        previous.matrixF32Bits.slice(i * 16, i * 16 + 16), 'Unscheduled cascade matrix changed');
    }
  }
  for (const c of cases) {
    const versions = ['current', 'baseline'];
    assert.equal(c.samples, 60); assert.equal(c.blocks.length, 3);
    assert.ok(c.blocks.every(block => block.length === 20));
    for (const version of versions) {
      assert.equal(c.times[version].length, 60);
      assert.ok(c.times[version].every(n => Number.isFinite(n) && n > 0));
      assert.ok(c.cold[version].length >= 25 && c.cold[version].length <= 120);
      assert.ok(c.cold[version].every(n => Number.isFinite(n) && n > 0));
      assert.equal(c.cold.shadowSchedules[version].length, c.cold[version].length);
    }
    assert.equal(c.cold.current.length, c.cold.baseline.length);
    const quantile = (numbers, q) => {
      const a = [...numbers].sort((a, b) => a - b), index = (a.length - 1) * q, lo = Math.floor(index);
      return a[lo] + (a[Math.ceil(index)] - a[lo]) * (index - lo);
    };
    const median = quantile(c.times.current, .5) / quantile(c.times.baseline, .5);
    const p95 = quantile(c.times.current, .95) / quantile(c.times.baseline, .95);
    assert.ok(median <= 1.2 && p95 <= 1.25, 'Paving timing budget exceeded');
    assert.ok(Math.abs(median - c.medianRatio) < 1e-12 && Math.abs(p95 - c.p95Ratio) < 1e-12,
      'Reported ratios differ from raw timing arrays');
    const warm = c.cold.shadowSchedules;
    for (let i = 0; i < warm.current.length; i++) {
      pair(warm.current[i], warm.baseline[i], i === warm.current.length - 1);
      if (i) for (const version of versions) consecutive(warm[version][i - 1], warm[version][i]);
    }
    const previous = Object.fromEntries(versions.map(version => [version, warm[version].at(-1)]));
    const phases = [0, 0, 0, 0], updates = [0, 0, 0];
    c.blocks.forEach((block, blockIndex) => {
      const blockPhases = [0, 0, 0, 0];
      block.forEach((p, index) => {
        const sample = blockIndex * 20 + index;
        assert.equal(p.sample, sample); assert.equal(p.block, blockIndex);
        assert.deepEqual(p.order, balancedPavingPairOrder(sample));
        assert.deepEqual(p.actualOrder, p.order);
        pair(p.shadowSchedule.current, p.shadowSchedule.baseline, true);
        for (const version of versions) {
          assert.equal(p[version], c.times[version][sample], 'Raw sample differs from paired timing');
          consecutive(previous[version], p.shadowSchedule[version]); previous[version] = p.shadowSchedule[version];
        }
        const s = p.shadowSchedule.current, phase = s.shadowFrameAfter % 4;
        phases[phase]++; blockPhases[phase]++;
        for (const i of s.actualIndices) updates[i]++;
      });
      assert.deepEqual(blockPhases, [5, 5, 5, 5]);
    });
    assert.deepEqual(phases, [15, 15, 15, 15]); assert.deepEqual(updates, [60, 30, 15]);
    assert.deepEqual(c.shadowPhases, {phases, updateCounts: updates});
    assert.ok(c.pairOrderCoverage !== null && typeof c.pairOrderCoverage === 'object' &&
      Object.getPrototypeOf(c.pairOrderCoverage) === Object.prototype, 'Missing recorded pair-order histogram');
    assertPavingPairOrderCoverage(c.blocks, c.pairOrderCoverage);
    for (const [name, records] of [['initial', Object.fromEntries(versions.map(v => [v, warm[v].at(-1)]))],
      ['final', previous]]) {
      const inputs = c.sceneInputs[name];
      for (const key of ['time', 'cloudFrame', 'cloudTime', 'cloudWind', 'waterTime', 'near',
        'automaticExposure', 'shadowFrame', 'shadowPeriods', 'shadowCascadeCount']) assert.deepEqual(inputs.current[key], inputs.baseline[key]);
      assert.ok(inputs.current.camera.length === 3 && inputs.baseline.camera.length === 3 &&
        inputs.current.camera.every((v, i) => Number.isFinite(v) && Math.abs(v - inputs.baseline.camera[i]) < 1e-9));
      for (const version of versions) {
        const input = inputs[version], frame = records[version];
        assert.equal(input.automaticExposure, 1); assert.deepEqual(input.shadowPeriods, periods);
        assert.equal(input.shadowCascadeCount, 3); assert.equal(input.shadowFrame, input.cloudFrame);
        assert.equal(input.shadowFrame, frame.shadowFrameAfter); assert.equal(input.cloudFrame, frame.cloudFrameAfter);
      }
    }
  }
}

function validatePavingMaterialSharing(report, layoutSha256, sourceHashes) {
  const requiredSources = ['app/src/cotendo/RoadPaving.js', 'app/src/cotendo/RoadPavingMaterial.js',
    'app/src/cotendo/RoadPavingWorker.js', 'app/src/cotendo/RoadPavingProfile.js',
    'app/src/cotendo/RoadPavingMath.js', 'app/src/cotendo/RoadPavingBoundary.js',
    'app/src/cotendo/RoadPavingResidency.js', 'app/src/cotendo/RoadPavingSun.js',
    'app/src/cotendo/RoadPavingLighting.js', 'app/src/engine/render/SceneRenderer.js',
    'app/src/engine/render/MeshRenderer.js', 'app/src/paver/PaverMaterial.js',
    'app/src/paver/PaverGeometry.js', 'tools/cotendo/paving-material-sharing-gpu.mjs'];
  assert.equal(report.status, 'passed'); assert.equal(report.profile, 'cotendo-installed-6');
  assert.equal(report.installedAmplitudeM, .00075); assert.deepEqual(report.errors, []);
  for (const key of ['hdrPixelIdentity', 'gBufferPixelIdentity', 'mainDepthIdentity',
    'geometryIdentity', 'mainDepthUnchanged']) assert.equal(report[key], true, 'Material sharing ' + key);
  const fixtures = {
    inspection: [.45, 1.2, 1], 'ordinary-desktop': [1.4, 2.5, 1],
    'ordinary-narrow': [1.4, 2.5, 1], morph325: [.45, 3.25, 1], morph375: [.45, 3.75, 1],
    admission025: [.45, 1.2, .25, true], admission075: [.45, 1.2, .75, true],
    'building-occlusion': [1.4, 2.5, 1], 'layer-hidden': [1.4, 2.5, 1],
    'retired-readmitted-order': [1.4, 2.5, .75, true],
    'interleaved-domain-order': [1.4, 2.5, .75, true], 'shared-lighting-flags': [1.4, 2.5, 1],
  };
  assert.equal(report.caseCount, 12); assert.equal(report.cases.length, 12);
  assert.deepEqual(report.cases.map(c => c.name).sort(), Object.keys(fixtures).sort(), 'Missing or duplicate sharing case');
  for (const key of ['uniformReference', 'integratedObjectFade', 'independentOldSlotModel',
    'mainDepthBeforeAfter', 'noTimingAcceptance', 'coldReadinessAndOwnership', 'layerBypass', 'buildingOcclusion']) {
    assert.equal(report.controls[key], true, 'Missing sharing control ' + key);
  }
  assert.equal(report.controls.caseCount, 12); assert.equal(report.controls.ordinaryPieces, 320);
  assert.equal(report.controls.domainCount, 2); assert.equal(report.controls.slotReuseCount, 5);
  for (const c of report.cases) {
    const [eye, range, fade, mixed = false] = fixtures[c.name];
    assert.equal(c.eye ?? 1.4, eye); assert.equal(c.range ?? 2.5, range); assert.equal(c.fade, fade);
    assert.equal(c.mixed ?? false, mixed);
    const width = c.name === 'ordinary-narrow' ? 390 : 936, height = c.name === 'ordinary-narrow' ? 744 : 800;
    assert.equal(c.W ?? 936, width); assert.equal(c.H ?? 800, height);
    assert.equal(c.activeTiles, 10); assert.equal(c.pieces, 320);
    assert.equal(c.domainCount, ['interleaved-domain-order', 'shared-lighting-flags'].includes(c.name) ? 2 : 1);
    for (const key of ['hdrPixelIdentity', 'auxiliaryPixelIdentity', 'mainDepthIdentity', 'privateMainDepthUnchanged']) {
      assert.equal(c[key], true, 'Sharing case identity ' + c.name + '/' + key);
    }
    assert.deepEqual(c.changedBytes, [0, 0, 0, 0]);
    assert.equal(c.referenceHashes.length, 4); assert.equal(c.sharedHashes.length, 4);
    for (const digest of [...c.referenceHashes, ...c.sharedHashes]) assert.match(digest, /^[a-f0-9]{64}$/);
    assert.deepEqual(c.referenceHashes, c.sharedHashes, 'Sharing case buffers differ ' + c.name);
    assert.equal(c.perTileFades.length, 10);
    c.perTileFades.forEach((value, i) => assert.ok(Number.isFinite(value) &&
      Math.abs(value - (mixed ? fade * (i + 1) / 10 : fade)) < 1e-12, 'Wrong object fade ' + c.name));
    const a = c.referenceCounters, b = c.sharedCounters;
    for (const counters of [a, b]) {
      for (const key of ['pipelineSets', 'group1Sets', 'drawCalls', 'triangles']) {
        assert.ok(Number.isSafeInteger(counters[key]) && counters[key] >= 0);
      }
      assert.ok(counters.drawOrder.every(name => typeof name === 'string' && name.length));
      assert.equal(counters.drawOrder.length, counters.drawCalls);
      assert.ok(counters.pipelineSets <= counters.drawCalls && counters.group1Sets <= counters.drawCalls);
    }
    assert.deepEqual(a.drawOrder, b.drawOrder, 'Sharing changed actual draw order');
    assert.equal(a.drawCalls, b.drawCalls); assert.equal(a.triangles, b.triangles);
    if (c.name === 'layer-hidden') {
      for (const counters of [a, b]) assert.deepEqual(counters, {pipelineSets: 0, group1Sets: 0, drawCalls: 0, triangles: 0, drawOrder: []});
    } else assert.ok(a.drawCalls > 0 && a.triangles > 640, 'Vacuous material sharing fixture ' + c.name);
    assert.ok(Number.isInteger(c.nonblankPixels) && c.nonblankPixels > width * height * .1 && c.nonblankPixels <= width * height);
    if (c.capture) {
      assert.equal(c.capture.width, width); assert.equal(c.capture.height, height);
      assert.equal(c.capture.file, c.name + '-shared.png'); assert.match(c.capture.sha256, /^[a-f0-9]{64}$/);
    }
  }
  const ordinary = report.cases.find(c => c.name === 'ordinary-desktop');
  for (const key of ['pipelineSets', 'group1Sets']) {
    assert.equal(ordinary.referenceCounters[key], 11); assert.equal(ordinary.sharedCounters[key], 2);
  }
  assert.equal(ordinary.referenceCounters.drawCalls, 11);
  assert.deepEqual(report.switchReduction, {reference: ordinary.referenceCounters, shared: ordinary.sharedCounters});
  assert.ok(ordinary.capture);
  assert.notEqual(report.cases.find(c => c.name === 'admission025').sharedHashes[0],
    report.cases.find(c => c.name === 'admission075').sharedHashes[0], 'Object-fade control is vacuous');
  for (const name of ['building-occlusion', 'layer-hidden']) {
    const c = report.cases.find(c => c.name === name);
    assert.notEqual(c.sharedHashes[0], ordinary.sharedHashes[0], 'Vacuous ' + name + ' control');
  }
  const active = new Map(), free = [], snapshots = new Map(); let allocated = 0, reused = 0, retired = 0, admissions = 0;
  for (const event of report.oldSlotEvents) {
    assert.ok(typeof event.key === 'string' && event.key.length && Number.isSafeInteger(event.slot) && event.slot >= 0);
    if (event.event === 'admit') {
      assert.ok(!active.has(event.key) && ![...active.values()].includes(event.slot));
      const reuse = free.length > 0, slot = reuse ? free.pop() : allocated++;
      assert.equal(event.slot, slot, 'Reference slot admission did not follow LIFO');
      assert.equal(event.reused, reuse); reused += Number(reuse); active.set(event.key, slot);
      admissions++;
      if ([10, 13, 15].includes(admissions)) snapshots.set(admissions,
        [...active].sort((a, b) => a[1] - b[1]).map(([key]) => 'Paving relief ' + key));
    } else {
      assert.equal(event.event, 'retire'); assert.equal(active.get(event.key), event.slot);
      active.delete(event.key); free.push(event.slot); retired++;
    }
  }
  assert.equal(allocated, 10); assert.equal(active.size, 10); assert.equal(free.length, 0);
  assert.equal(reused, 5); assert.equal(retired, 5); assert.equal(report.controls.slotReuseCount, reused);
  for (const c of report.cases) {
    let expected = snapshots.get(['interleaved-domain-order', 'shared-lighting-flags'].includes(c.name) ? 15 :
      c.name === 'retired-readmitted-order' ? 13 : 10);
    if (c.name === 'ordinary-narrow') expected = expected.slice(0, 9);
    expected = c.name === 'layer-hidden' ? [] : ['Private continuous sealing sand', ...expected];
    assert.deepEqual(c.referenceCounters.drawOrder, expected, 'Reference draw order disagrees with independent LIFO slots');
    assert.deepEqual(c.sharedCounters.drawOrder, expected, 'Shared draw order disagrees with independent LIFO slots');
  }
  const disposal = report.disposal;
  assert.equal(disposal.oldModelLiveBefore, 10);
  assert.equal(disposal.activeBefore, 10); assert.equal(disposal.activeAfter, 0);
  assert.equal(disposal.workerTerminated, true); assert.equal(disposal.privateDepthDestroyed, true);
  for (const key of ['releasedVertexBuffers', 'releasedIndexBuffers']) assert.ok(Number.isSafeInteger(disposal[key]) && disposal[key] > 0);
  assert.ok(Number.isInteger(report.captureBytes) && report.captureBytes > 0 && report.captureBytes < 16 * 1024 * 1024);
  assert.equal(report.source.layoutSha256, layoutSha256, 'Stale sharing layout');
  for (const name of requiredSources) assert.match(report.source.files[name], /^[a-f0-9]{64}$/, 'Missing sharing source ' + name);
  for (const [name, digest] of Object.entries(report.source.files)) {
    assert.match(digest, /^[a-f0-9]{64}$/); assert.equal(digest, sourceHashes[name], 'Stale sharing source ' + name);
  }
}

const site=resolve(import.meta.dirname,'../site/sucre');
const read=name=>JSON.parse(readFileSync(join(site,name),'utf8'));
const hash=file=>createHash('sha256').update(readFileSync(file)).digest('hex');
const release=read('release.json'),data=read('data/catalog.json'),audit=read('data/audit.json'),acceptance=read('acceptance.json');
const rendering=read('data/render-audit.json');
const aa=read('data/aa-audit.json');
assert.equal(data.source.sha256,'b73e00aa1a198e63f98f8145bcabfc925f1b51c632aaf2a9060339e1b990573e','Unexpected source DWG fingerprint');
for(const source of [release.source,audit.source])assert.deepEqual(source,data.source,'Stale source metadata');
assert.equal(data.source.units,'m');assert.equal(data.source.revision,'V19-P3');assert.equal(data.source.engineCommit,'9d7394a1015545ad835cfc63407a762e6acfddde');
assert.equal(hash(join(site,'data/catalog.json')),audit.catalogSha256,'Stale catalog fingerprint');
for(const[name,expected]of Object.entries(release.files)){assert.ok(existsSync(join(site,name)),'Missing release file '+name);assert.equal(hash(join(site,name)),expected,'Changed or stale release file '+name);}
assert.equal(acceptance.status,'passed','WebGPU browser acceptance is required');assert.equal(acceptance.testedManifestSha256,hash(join(site,'release.json')),'Browser acceptance belongs to a different build');assert.equal(acceptance.source.sha256,data.source.sha256);
assert.equal(acceptance.authoringCommit,release.authoringCommit);assert.ok(acceptance.runtime.frames>12);assert.deepEqual(acceptance.runtime.errors,[]);
for(const prefix of ['WebGPU adapter','Selected 2D parcel','Visible nonblank','Lake water','Frame selected parcel','Surface stability','Anti-aliasing quality','Fly controls','Narrow layout','Accessible measured plan'])assert.ok(acceptance.checks.some(c=>c.startsWith(prefix)),'Missing browser acceptance scenario '+prefix);
assert.equal(acceptance.commercialFrame.feature,'CO088');assert.ok(acceptance.commercialFrame.bounds.every(n=>Math.abs(n)<.8));assert.ok(acceptance.commercialFrame.roofRGB[0]>40&&acceptance.commercialFrame.roofRGB[2]<acceptance.commercialFrame.roofRGB[0]*1.2,'Commercial frame was not visibly presented');
assert.equal(aa.status,'passed');assert.equal(aa.source.sha256,data.source.sha256);assert.equal(aa.source.catalogSha256,audit.catalogSha256);assert.deepEqual(aa.failures,[]);assert.deepEqual(aa.errors,[]);assert.equal(aa.strokes.missingCrossSections,0);assert.ok(aa.strokes.fixtures.length>=80);assert.ok(aa.strokes.aggregate.analyticRmse<aa.strokes.aggregate.hardRmse);assert.ok(aa.strokes.maxDisplacementRenderPx<=.5);assert.ok(aa.compositing.maxErrorLsb<=1);assert.equal(aa.compositing.joinInteriorHoles,0);assert.equal(aa.clipping.collapsedVisiblePixels,0);assert.equal(aa.performance.status,'passed');
for(const[name,digest]of Object.entries(aa.source.files))assert.equal(release.inputs[name],digest,'Stale anti-aliasing source fingerprint '+name);
assert.equal(aa.obliqueGround.status,'passed');assert.ok(aa.obliqueGround.fixtures.length>=8);assert.equal(aa.obliqueGround.missingCrossSections,0);assert.ok(aa.obliqueGround.maxDisplacementRenderPx<=.5);assert.ok(aa.obliqueGround.maxGroundCoverageLossPercent<=.1);assert.ok(aa.obliqueGround.maxGroundDifferenceLsb<=1);assert.equal(aa.obliqueGround.priorEndpointDepthControl.fixtureSensitivityPassed,true);assert.equal(aa.joinLighting.status,'passed');assert.equal(aa.joinLighting.fixtures.length,2);assert.ok(aa.joinLighting.frontFacingPixels>0);assert.equal(aa.joinLighting.backFacingPixels,0);
assert.equal(acceptance.antiAliasing.runtime.aa.lookupState,'ready');assert.equal(acceptance.antiAliasing.runtime.aa.effectiveMode,'smaa');assert.ok(acceptance.antiAliasing.runtime.aa.renderedFrames>12);assert.equal(acceptance.antiAliasing.runtime.scale,1);assert.equal(acceptance.antiAliasing.runtime.sharpen,.10);assert.equal(acceptance.antiAliasing.browser.status,'passed');assert.deepEqual(acceptance.antiAliasing.numeric.source,aa.source);assert.ok(acceptance.antiAliasing.flight.completedFrames>0);
const browserAA=acceptance.antiAliasing.browser;assert.deepEqual(browserAA.displayMatrix.map(r=>r.nativeDpr),[1,1.25,1.5,2,3]);assert.equal(browserAA.resize.largeCssViewport.quality.effectiveDensity,1);assert.equal(browserAA.resize.hardwareLimit.quality.hardwareLimited,true);assert.deepEqual(browserAA.resize.coalescedNoOp.assignments,{width:0,height:0});assert.equal(browserAA.resize.densityOnly.poseUnchanged,true);assert.deepEqual(browserAA.pageErrors,[]);
assert.deepEqual(browserAA.lookupCases.map(c=>c.mode),['success','missing','malformed','stall']);for(const c of browserAA.lookupCases){assert.equal(c.sessionStable,true);assert.equal(c.diagnostics.effectiveMode,c.mode==='success'?'smaa':'fxaa');if(c.mode!=='success')assert.ok(c.diagnostics.reason);}assert.ok(browserAA.lookupCases.find(c=>c.mode==='stall').settledMs<7000);
assert.equal(rendering.status,'passed');assert.equal(rendering.sourceSha256,data.source.sha256);assert.equal(rendering.catalogSha256,audit.catalogSha256);assert.equal(rendering.affectedFills,605);assert.equal(rendering.overlapPairs,694);assert.equal(rendering.pairs.length,694);assert.equal(rendering.gpuProbes.resolvable+rendering.gpuProbes.subpixel,694);assert.equal(rendering.gpuProbes.passedProbes,rendering.gpuProbes.resolvable);assert.ok(rendering.gpuProbes.samples>=3425);assert.deepEqual(rendering.gpuProbes.failures,[]);assert.deepEqual(rendering.gpuProbes.errors,[]);assert.deepEqual(rendering.structures.remainingExactDuplicates,[]);assert.equal(rendering.structures.removedEquivalentFaces,80);assert.equal(acceptance.surfaceStability.overlapPairs,694);assert.equal(acceptance.motion.length,9);assert.ok(acceptance.motion.every(f=>f.frames.length===3));
assert.equal(rendering.structures.removedGlazingFaces,1);assert.equal(rendering.coveredPavilionCaps.featureIds.length,6);assert.ok(rendering.lines.sharedSegments.length>0);
assert.ok(acceptance.motion.every(f=>f.poses.length===3&&f.poses.every((p,i)=>Math.abs(p.az-(.10+i*.22))<1e-9)),'Motion acceptance must exercise distinct camera views');
for(const[name,digest]of Object.entries(rendering.unchangedMeasurementExports))assert.equal(hash(join(site,'data',name)),digest,'Measured export changed '+name);
assert.equal(acceptance.mobileOverview.feature,'PROPERTY');assert.ok(acceptance.mobileOverview.bounds.every(n=>Math.abs(n)<.9),'Mobile overview clips the property');
const performanceRoutes=['overview','residential','commercial','inspection','middle','forward-flight'];
const percentile=(values,q)=>{assert.ok(values.every(v=>Number.isFinite(v)&&v>0));const a=[...values].sort((a,b)=>a-b),i=(a.length-1)*q,lo=Math.floor(i);return a[lo]+(a[Math.ceil(i)]-a[lo])*(i-lo);};
const paving=read('data/paving-layout.json'),pavingGPU=read('data/paving-audit.json'),pavingBrowser=acceptance.roadPaving;
assert.deepEqual(paving.targetFeatureIds,['COT_P3_CALZADA:road_pavement','COT_COL_COM_VIAS:commercial_drive']);assert.deepEqual(paving.dimensionsM,[.2,.1,.06]);assert.deepEqual(paving.jointRangeM,[.002,.004]);assert.equal(paving.tileSizeM,.816);assert.equal(paving.referenceAxes,13);assert.equal(paving.referenceSegments,17);assert.equal(paving.guides.length,23);assert.equal(paving.guides.filter(g=>!g.handle).length,6);
assert.equal(paving.source.dwgSha256,data.source.sha256);assert.equal(paving.source.catalogSha256,audit.catalogSha256);assert.equal(paving.source.materialSha256,release.inputs['app/src/paver/PaverMaterial.js']);assert.equal(paving.source.geometrySha256,release.inputs['app/src/paver/PaverGeometry.js']);
for(const row of paving.coverage){assert.equal(row.uncoveredAreaM2,0);assert.ok(Math.abs(row.coveredAreaM2-row.sourceAreaM2)<1e-7);}assert.ok(Math.abs(paving.coverage.reduce((n,r)=>n+r.coveredAreaM2,0)-12808.630008224192)<1e-6);
assert.equal(pavingGPU.filtering.status,'passed');assert.equal(pavingGPU.filtering.fixtures.length,10);assert.ok(pavingGPU.filtering.fixtures.every(f=>f.maxErrorLsb<=2&&Math.abs(f.meanErrorLsb)<.1));
assert.equal(pavingGPU.finishElision.status,'passed');assert.equal(pavingGPU.finishElision.fixtures.length,5);assert.ok(pavingGPU.finishElision.fixtures.every(f=>f.hdrPixelIdentity&&f.gBufferPixelIdentity));assert.equal(pavingGPU.overdrawElision.status,'passed');assert.equal(pavingGPU.overdrawElision.fixtures.length,15);assert.equal(new Set(pavingGPU.overdrawElision.fixtures.map(f=>f.eyeHeightM+'/'+f.admissionFraction)).size,15);assert.ok(pavingGPU.overdrawElision.fixtures.every(f=>f.hdrPixelIdentity&&f.gBufferPixelIdentity));assert.ok(pavingGPU.overdrawElision.sensitivityPixels>500);assert.equal(pavingGPU.status,'passed');assert.deepEqual(pavingGPU.errors,[]);assert.equal(pavingGPU.mainDepthUnchanged,true);assert.equal(pavingGPU.bypassWithoutNear,true);assert.equal(pavingGPU.buriedFacePixelIdentity,true);assert.ok(pavingGPU.discardedFixtureTriangles>0);assert.ok(pavingGPU.privateDepthCopies>=4);assert.equal(pavingGPU.source.layoutSha256,hash(join(site,'data/paving-layout.json')));for(const[name,digest]of Object.entries(pavingGPU.source.files))assert.equal(release.inputs[name],digest,'Stale paving source proof '+name);
assert.deepEqual(pavingBrowser.gpuErrors,[]);assert.equal(pavingBrowser.status,'passed');assert.equal(pavingBrowser.performancePassed,true);assert.equal(pavingBrowser.display.width,pavingBrowser.baselineDisplay.width);assert.equal(pavingBrowser.display.height,pavingBrowser.baselineDisplay.height);assert.ok(pavingBrowser.display.cssWidth>850);assert.ok(pavingBrowser.captures.every(c=>c.view==='3d'));for(const name of ['residential-close','mobile-close','desktop-after-benchmark'])assert.ok(pavingBrowser.captures.find(c=>c.name===name)?.pixels.redFraction>.01);assert.equal(pavingBrowser.domains.length,paving.domains.length);assert.deepEqual([...pavingBrowser.farDomains].sort(),paving.domains.map(d=>d.id).sort());assert.ok(pavingBrowser.captures.length>=paving.domains.length+paving.coverage.reduce((n,r)=>n+r.junctions.length,0)+7);for(const d of paving.domains)assert.ok(pavingBrowser.captures.some(c=>c.name==='domain-'+d.id));for(let i=0;i<paving.coverage.reduce((n,r)=>n+r.junctions.length,0);i++)assert.ok(pavingBrowser.captures.some(c=>c.name==='junction-'+i));assert.equal(pavingBrowser.performance.length,12);assert.deepEqual(pavingBrowser.performance.map(r=>r.profile+'/'+r.route).sort(),['desktop','narrow'].flatMap(profile=>performanceRoutes.map(route=>profile+'/'+route)).sort(),'Missing or duplicate paving performance case');assert.ok(pavingBrowser.flight.completedFrames>=12);assert.ok(Math.hypot(...pavingBrowser.flight.after.map((n,i)=>n-pavingBrowser.flight.before[i]))>1);
const appearance=read('data/paving-appearance-audit.json');assert.equal(appearance.status,'passed');assert.deepEqual(appearance.errors,[]);assert.equal(appearance.profile.version,'cotendo-installed-6');assert.equal(appearance.profile.level,.09);assert.equal(appearance.profile.bevelWidth,.0015);assert.equal(appearance.profile.bevelDepth,.0012);assert.equal(appearance.profile.sandInset,.002);assert.equal(appearance.profile.installedAmplitude,.00075);assert.equal(appearance.profile.installedLevels,4);const installedLifts=Array.from({length:appearance.profile.installedLevels},(_,i)=>-appearance.profile.installedAmplitude+i*2*appearance.profile.installedAmplitude/(appearance.profile.installedLevels-1));for(const[i,lift]of installedLifts.entries())assert.ok(Math.abs(lift-[-.00075,-.00025,.00025,.00075][i])<1e-12);assert.ok(Math.abs(installedLifts.reduce((sum,n)=>sum+n,0))<1e-12);assert.ok(appearance.parity.samples>=4096&&appearance.parity.maxHeightErrorM<=.00001&&appearance.parity.maxNormalAngleDeg<=2);assert.ok(appearance.raking.tiltFraction>=.9&&appearance.raking.medianLuminanceDifferenceLsb>=2);assert.ok(appearance.nonGrazingSpecularFraction>0&&appearance.nonGrazingSpecularFraction<.2);assert.equal(appearance.transitions.length,3);assert.ok(appearance.transitions.every(t=>t.pixels>1000&&t.meanDeltaE00<=3&&t.meanLuminanceDiscontinuity<=.03));assert.equal(appearance.source.layoutSha256,hash(join(site,'data/paving-layout.json')));for(const[name,digest]of Object.entries(appearance.source.files))assert.equal(release.inputs[name],digest,'Stale appearance source proof '+name);
const elision=read('data/paving-elision-audit.json');
assert.equal(elision.status,'passed');assert.equal(elision.profile,appearance.profile.version);assert.equal(elision.installedAmplitudeM,.00075);assert.deepEqual(elision.errors,[]);assert.equal(elision.mainDepthUnchanged,true);assert.equal(elision.crossMetreCell,true);assert.equal(elision.sourceEdgeWorldZ,1.033);assert.equal(elision.hole.length,4);assert.ok(elision.tile.pieces>0&&elision.tile.cuts>0&&elision.tile.maxOutsideM<=.0001);
assert.equal(elision.fixtures.length,10);assert.deepEqual(elision.fixtures.map(f=>f.name+'/'+f.admissionFraction).sort(),['along-x','along-z'].flatMap(name=>[.01,.25,.5,.75,1].map(fade=>name+'/'+fade)).sort());for(const f of elision.fixtures){assert.equal(f.eyeHeightM,.22);for(const key of ['hdrPixelIdentity','gBufferPixelIdentity','mainDepthIdentity'])assert.equal(f[key],true);}
assert.equal(elision.sensitivity.length,2);assert.deepEqual(elision.sensitivity.map(f=>f.name).sort(),['along-x','along-z']);assert.ok(elision.sensitivity.every(f=>f.missingNearControl&&f.changedPixels>100));assert.ok(elision.lowLiftSensitivityPixels>5&&elision.highLiftSensitivityPixels>5);assert.ok(elision.minimumNonblankPixels>elision.renderPixels*.1&&elision.privateDepthCopies>=40);
assert.deepEqual(elision.morph.map(f=>f.cameraRangeM).sort(),[3.25,3.75]);for(const f of elision.morph){assert.ok(f.morphVertices>0&&f.changedPixels>0);for(const key of ['changedPixelsWithNear','hdrPixelIdentity','gBufferPixelIdentity','mainDepthIdentity'])assert.equal(f[key],true);}
const geometrySpecialization=elision.geometrySpecialization;
assert.ok(geometrySpecialization&&Array.isArray(geometrySpecialization.fixtures),'Missing geometry specialization proof');assert.equal(geometrySpecialization.cases,12);assert.equal(geometrySpecialization.fixtures.length,12);
for(const key of ['hdrPixelIdentity','gBufferPixelIdentity','mainDepthIdentity'])assert.equal(geometrySpecialization[key],true,'Geometry specialization aggregate '+key);
const geometrySpecializationCases=['along-x','along-z'].flatMap(name=>[.01,.25,.5,.75,1].map(fade=>name+':admission-'+fade)).concat([3.25,3.75].map(range=>'morph:range-'+range)).sort();
assert.deepEqual(geometrySpecialization.fixtures.map(f=>f.caseId).sort(),geometrySpecializationCases,'Missing or duplicate geometry specialization case');
for(const f of geometrySpecialization.fixtures){
  for(const key of ['hdrPixelIdentity','gBufferPixelIdentity','mainDepthIdentity'])assert.equal(f[key],true,'Geometry specialization '+f.caseId+'/'+key);
  if(f.name==='morph'){assert.ok([3.25,3.75].includes(f.cameraRangeM));assert.equal(f.caseId,'morph:range-'+f.cameraRangeM);}
  else{assert.ok(['along-x','along-z'].includes(f.name));assert.ok([.01,.25,.5,.75,1].includes(f.admissionFraction));assert.equal(f.eyeHeightM,.22);assert.equal(f.caseId,f.name+':admission-'+f.admissionFraction);for(const p of [f.position,f.target])assert.ok(Array.isArray(p)&&p.length===3&&p.every(Number.isFinite));assert.equal(f.position[1],.22);}
}
assert.match(elision.source.files['tools/cotendo/paving-elision-gpu.mjs'],/^[a-f0-9]{64}$/);for(const[name,digest]of Object.entries(elision.source.files))assert.equal(release.inputs[name],digest,'Stale paving elision source '+name);
assert.match(release.files['data/paving-material-sharing-audit.json'],/^[a-f0-9]{64}$/,'Missing native material-sharing proof');
const sharing=read('data/paving-material-sharing-audit.json');validatePavingMaterialSharing(sharing,hash(join(site,'data/paving-layout.json')),release.inputs);
const lighting=read('data/paving-lighting-audit.json');
assert.equal(lighting.status,'passed');assert.equal(lighting.profile.id,'cotendo-dry-porous-1');assert.equal(lighting.profile.normalF0,.04);assert.equal(lighting.profile.defaultRoughness,.90);assert.deepEqual(lighting.profile.roughnessRange,[.86,.95]);assert.equal(lighting.profile.effectiveDirectF90,'specF90 * max(0.04, 1 - roughness)');assert.equal(lighting.profile.illustrative,true);assert.equal(lighting.f0,.04);assert.equal(lighting.roughnessPreserved,true);
assert.deepEqual(lighting.errors,[]);for(const proof of ['diffusePixelIdentity','environmentSpecularPixelIdentity','ambientPixelIdentity','albedoPixelIdentity','hooksPreserved'])assert.equal(lighting[proof],true,'Failed road lighting preservation '+proof);
assert.equal(lighting.grazing.viewElevationDeg,5);assert.ok(Math.abs(lighting.grazing.sunElevationDeg-27.063938)<.001);assert.ok(lighting.grazing.samples>=1000&&lighting.grazing.controlMeanDirectSpecular>0&&lighting.grazing.matteMeanDirectSpecular>.00001&&lighting.grazing.nonzero===true);assert.ok(lighting.grazing.meanDirectSpecularRatio>0&&lighting.grazing.meanDirectSpecularRatio<=.35);assert.ok(Math.abs(lighting.grazing.matteMeanDirectSpecular/lighting.grazing.controlMeanDirectSpecular-lighting.grazing.meanDirectSpecularRatio)<1e-12);
assert.equal(lighting.normal.viewElevationDeg,90);assert.equal(lighting.normal.sunElevationDeg,90);assert.ok(lighting.normal.controlMeanDirectSpecular>0&&lighting.normal.matteMeanDirectSpecular>0&&lighting.normal.meanDirectSpecularRatio>=.99&&lighting.normal.meanDirectSpecularRatio<=1.001);assert.ok(Math.abs(lighting.normal.matteMeanDirectSpecular/lighting.normal.controlMeanDirectSpecular-lighting.normal.meanDirectSpecularRatio)<1e-12);for(const name of ['diffuse','environment','ambient','roughness','albedo']){const original=lighting.captures[name+'-original'],matte=lighting.captures[name+'-matte'];assert.match(original.sha256,/^[a-f0-9]{64}$/);assert.equal(original.sha256,matte.sha256,'Changed native road lighting '+name);}for(const key of ['roughnessPixelIdentity','hookReplacementPreserved'])if(key in lighting)assert.equal(lighting[key],true);assert.equal(lighting.comparison.format,'rgba16float');
for(const name of ['app/src/cotendo/RoadPavingLighting.js','app/src/cotendo/RoadPavingProfile.js','app/src/cotendo/RoadPavingMaterial.js','app/src/engine/render/wgsl/lighting.js','app/src/engine/render/MeshShader.js','app/src/engine/render/Material.js','tools/cotendo/paving-lighting-gpu.mjs'])assert.match(lighting.source.files[name],/^[a-f0-9]{64}$/,'Missing native lighting source proof '+name);for(const[name,digest]of Object.entries(lighting.source.files))assert.equal(release.inputs[name],digest,'Stale native lighting source proof '+name);
const sun=read('data/paving-sun-audit.json');assert.equal(sun.status,'passed');assert.equal(sun.profile,appearance.profile.version);assert.equal(sun.ambientPixelIdentity,true);assert.deepEqual(sun.errors,[]);assert.equal(sun.fixtures.length,16);assert.equal(new Set(sun.fixtures.map(f=>f.pattern+'/'+f.sun.join(','))).size,16);assert.deepEqual([...new Set(sun.fixtures.map(f=>f.pattern))].sort(),['header-course','herringbone-90']);for(const f of sun.fixtures){assert.ok(Number.isFinite(f.mismatchFraction)&&f.mismatchFraction<=.01);assert.ok(f.probes>=300&&f.lit>=100&&f.probes>=f.shadowed+f.lit);assert.equal(f.mismatches/f.probes,f.mismatchFraction);}for(const pattern of ['herringbone-90','header-course']){const group=sun.fixtures.filter(f=>f.pattern===pattern);assert.equal(group.length,8);assert.ok(group.reduce((n,f)=>n+f.shadowed,0)>=20&&group.reduce((n,f)=>n+f.installedCast,0)>=10,'Missing installed-brick shadow corpus '+pattern);}const shadowFiltering=sun.filtering;assert.equal(shadowFiltering.fullThroughFootprintM,.0125);assert.equal(shadowFiltering.zeroAtFootprintM,.025);assert.equal(shadowFiltering.maxAllowedCoverageError,.15);assert.ok(shadowFiltering.hardLitSupportWitnesses>0);assert.ok(Number.isFinite(shadowFiltering.maxHardLitKernelCoverageError)&&shadowFiltering.maxHardLitKernelCoverageError>=0&&shadowFiltering.maxHardLitKernelCoverageError<=.15);assert.equal(shadowFiltering.fixtures.length,9);assert.deepEqual(shadowFiltering.fixtures.map(f=>f.footprintM+'/'+f.q.join(',')).sort(),[.00625,.0125,.02].flatMap(footprint=>[.499,.503,.505].map(z=>footprint+'/.51,'+z)).map(s=>s.replace('/.51,','/0.51,')).sort());for(const f of shadowFiltering.fixtures){assert.deepEqual(f.sun,[0,.12,1]);const t=Math.max(0,Math.min(1,(f.footprintM-.0125)/(.025-.0125))),resolved=1-t*t*(3-2*t);assert.ok(Math.abs(f.shortDimensionPixels-.1/f.footprintM)<1e-12);assert.ok(Math.abs(f.resolved-resolved)<1e-12);if(f.shortDimensionPixels>=8)assert.equal(f.resolved,1);assert.equal(f.kernel.taps,33);assert.ok(Number.isInteger(f.kernel.occluded)&&f.kernel.occluded>=0&&f.kernel.occluded<=33);assert.ok(Math.abs(f.kernel.coverage-f.kernel.occluded/33)<1e-12);assert.ok(Math.abs(f.expectedCoverage-f.kernel.coverage*f.resolved)<1e-12);assert.ok(f.actualCoverage>=0&&f.actualCoverage<=1);assert.ok(Math.abs(f.absoluteCoverageError-Math.abs(f.actualCoverage-f.expectedCoverage))<1e-12&&f.absoluteCoverageError<=.15);} for(const footprint of [.00625,.0125,.02])assert.ok(shadowFiltering.fixtures.some(f=>f.footprintM===footprint&&!f.hardCentreOccluded&&f.kernel.occluded>0),'Missing hard-lit shadow-support fixture'); const clipping=sun.sourceClipping;assert.equal(clipping.receiverWorld.length,2);assert.ok(clipping.receiverWorld.every((v,i)=>Math.abs(v-[.999,.75][i])<1e-12));assert.deepEqual(clipping.patternQ,[.578,.51]);assert.deepEqual(clipping.sun,[1,.055,0]);assert.equal(clipping.edgeWorldX,1.033);assert.equal(clipping.edgeAxis,'x');assert.equal(clipping.pattern,'herringbone-90');assert.ok(Math.abs(clipping.distanceM-.0339)<.000001);assert.ok(clipping.firstExternalOccluderM>.034&&clipping.firstExternalOccluderM<.04);assert.ok(clipping.unboundedVisibility>=0&&clipping.unboundedVisibility<.9);assert.ok(clipping.clippedVisibility>.999&&clipping.clippedVisibility<=1);assert.equal(clipping.crossMetreCell,true);for(const name of ['app/src/cotendo/RoadPavingMaterial.js','app/src/cotendo/RoadPavingSun.js','app/src/cotendo/RoadPavingProfile.js','app/src/cotendo/RoadPavingBoundary.js','app/src/cotendo/RoadPavingMath.js','tools/cotendo/paving-sun-gpu.mjs','tools/cotendo/paving-shadow-oracle.mjs'])assert.match(sun.source.files[name],/^[a-f0-9]{64}$/,'Missing native shadow source proof '+name);for(const[name,digest]of Object.entries(sun.source.files))assert.equal(release.inputs[name],digest,'Stale native shadow source proof '+name);
assert.equal(pavingBrowser.performanceEnvironments.length,6);assert.deepEqual(pavingBrowser.performanceEnvironments.map(e=>e.route).sort(),[...performanceRoutes].sort(),'Missing or duplicate timing environment');for(const e of pavingBrowser.performanceEnvironments){assert.equal(e.testedManifestSha256,acceptance.testedManifestSha256);assert.equal(e.videoRecording,false);assert.equal(e.fixture.name,e.route);if(e.route==='inspection'){assert.equal(e.fixture.eye,.45);assert.equal(e.fixture.range,1.2);assert.equal(e.fixture.targetPoint,true);}if(e.route==='forward-flight'){assert.equal(e.fixture.eye,1.4);assert.equal(e.fixture.range,20);}assert.ok(e.drivers.some(d=>d.status==='passed'));assert.equal(e.display.width,e.baselineDisplay.width);assert.equal(e.display.height,e.baselineDisplay.height);}
for(const environment of pavingBrowser.performanceEnvironments)validatePavingTimingV2(environment,pavingBrowser.performance.filter(c=>c.route===environment.route));
const browserAppearance=pavingBrowser.appearance;assert.equal(browserAppearance.status,'passed');assert.equal(browserAppearance.testedManifestSha256,acceptance.testedManifestSha256);assert.ok(browserAppearance.controls.length>=4);assert.equal(browserAppearance.production.automaticExposure,1);assert.equal(browserAppearance.production.haze,1);assert.equal(browserAppearance.production.scale,1);assert.ok(browserAppearance.coverage.length>=3);for(const c of browserAppearance.coverage)assert.ok(c.total>20&&c.fraction>=(c.profile==='narrow'?.85:.9),'Insufficient visible ready relief '+c.fixture);for(const name of ['albedo','roughness','normals','macroNormals','diffuse','directSpecular','environmentSpecular','beauty','unfogged'])assert.ok(browserAppearance.captures.some(c=>c.name==='diagnostic-'+name),'Missing diagnostic '+name);
const forward=pavingBrowser.forward;assert.deepEqual(acceptance.forward,forward,'Forward proof differs across browser report records');assert.equal(forward.capabilities.selfShadow,true);assert.equal(forward.capabilities.matte,true);assert.equal(forward.washOnly,false);assert.equal(forward.capabilities.shadowVisibility,true);assert.equal(forward.status,'passed');assert.equal(forward.captureOnly,false);assert.equal(forward.testedManifestSha256,acceptance.testedManifestSha256);assert.deepEqual(forward.failures,[]);assert.equal(forward.fixtures.length,8);assert.deepEqual(forward.fixtures.map(f=>f.road+'/'+f.profile+'/'+f.eye).sort(),paving.targetFeatureIds.flatMap(road=>['wide','narrow'].flatMap(profile=>[1.4,2.4].map(eye=>road+'/'+profile+'/'+eye))).sort(),'Missing or duplicate forward appearance fixture');for(const f of forward.fixtures){assert.ok(f.downwardPitchDegrees>0&&f.downwardPitchDegrees<=8);assert.equal(f.state.autoExposure,1);assert.equal(f.state.matte,true);assert.equal(f.state.frozen,false);assert.equal(f.state.near,.12);for(const mode of ['productionPipeline','unfogged']){assert.equal(f.acceptance[mode].passed,true,'Failed forward appearance '+f.name+'/'+mode);assert.deepEqual(f.acceptance[mode].failures,[]);if(f.acceptance[mode].filteringOnly)assert.ok(f.profile==='narrow'&&f.eye===2.4,'Unexpected filtering-only forward fixture');}for(const suffix of ['production','fixed-shadow-on','fixed-shadow-off','shadow-visibility','unfogged-shadow-on','unfogged-shadow-off'])assert.ok(forward.captures.some(c=>c.name===f.name+'-'+suffix),'Missing forward appearance capture '+f.name+'/'+suffix);}assert.equal(forward.captures.length,66);assert.equal(new Set(forward.captures.map(c=>c.file)).size,forward.captures.length);assert.equal(forward.motion.length,8);assert.ok(forward.motion.every(f=>f.eye===1.4&&f.automaticExposure===true));for(let i=0;i<8;i++)assert.ok(forward.captures.some(c=>c.name==='motion-'+String(i).padStart(2,'0')),'Missing forward motion capture '+i);for(const suffix of ['no-god-rays','no-flare'])assert.ok(forward.captures.some(c=>c.name==='residential-wide-eye1.4-'+suffix),'Missing forward wash counterfactual '+suffix);const wash=forward.washProbe,washSuffixes=['fixed-beauty','original-brdf','no-god-rays','no-flare','unfogged','diffuse','directSpecular','environmentSpecular'];assert.equal(wash.status,'captured-for-review');assert.deepEqual(wash.brdfComparison,{matteProduction:true,originalControl:false,otherConditionsMatched:true,matteCapture:'forward/toward-sun-fixed-beauty.png',originalCapture:'forward/toward-sun-original-brdf.png'});const {matte:matteSetting,...matteConditions}=wash.conditions['fixed-beauty'],{matte:originalSetting,...originalConditions}=wash.conditions['original-brdf'];assert.equal(matteSetting,true);assert.equal(originalSetting,false);assert.deepEqual(matteConditions,originalConditions,'BRDF wash controls differ in other conditions');assert.equal(matteConditions.haze,1);assert.equal(matteConditions.diagnostic,'beauty');assert.equal(matteConditions.automaticExposure,0);assert.equal(wash.cameraOverRoad,true);assert.ok(wash.sourceRoadSamples>=120);assert.equal(wash.downwardPitchDegrees,5.3);assert.equal(wash.near,.12);assert.ok(Math.abs(wash.position[1]-1.4)<1e-9);assert.deepEqual(wash.origin,[-21,-57.5876978337]);const sunXZ=[wash.sun[0],wash.sun[2]];assert.ok(wash.heading.reduce((sum,n,i)=>sum+n*sunXZ[i],0)/Math.hypot(...sunXZ)>.999999);assert.deepEqual([...wash.captures].sort(),washSuffixes.map(suffix=>'forward/toward-sun-'+suffix+'.png').sort());for(const suffix of washSuffixes)assert.ok(forward.captures.some(c=>c.name==='toward-sun-'+suffix),'Missing toward-sun wash capture '+suffix);for(const c of forward.captures){assert.match(c.file,/^forward\/[a-zA-Z0-9.-]+\.png$/);assert.match(c.sha256,/^[a-f0-9]{64}$/);}for(const profile of ['desktop','narrow'])for(const name of performanceRoutes){const route=pavingBrowser.performance.find(r=>r.route===name&&r.profile===profile);assert.ok(route,'Missing performance fixture '+profile+'/'+name);assert.ok(route.medianRatio<=1.2&&route.p95Ratio<=1.25,'Paving timing budget exceeded');assert.equal(route.samples,60);assert.equal(route.blocks.length,3);assert.ok(route.blocks.every(b=>b.length===20));assert.equal(route.targetSize[0],profile==='desktop'?pavingBrowser.display.width:390);assert.equal(route.targetSize[1],profile==='desktop'?pavingBrowser.display.height:744);assert.equal(route.times.current.length,60);assert.equal(route.times.baseline.length,60);for(const input of [route.sceneInputs.initial,route.sceneInputs.final]){for(const k of ['time','cloudFrame','cloudTime','cloudWind','waterTime','near','automaticExposure'])assert.deepEqual(input.current[k],input.baseline[k],'Mismatched timed scene input '+k);assert.ok(input.current.camera.every((v,i)=>Math.abs(v-input.baseline.camera[i])<1e-9));assert.equal(input.current.automaticExposure,1);}assert.ok(percentile(route.times.current,.5)/percentile(route.times.baseline,.5)<=1.2,'Median exceeds paving budget');assert.ok(percentile(route.times.current,.95)/percentile(route.times.baseline,.95)<=1.25,'p95 exceeds paving budget');}

for(const d of pavingBrowser.domains){assert.deepEqual(d.errors,[]);assert.ok(d.coverage.fraction>=.9);assert.ok(d.activeTiles<=32&&d.pieces<=1024&&d.triangles<=630000);assert.ok(d.geometryBytes+d.privateDepthBytes<=32*1024*1024);}
assert.deepEqual(pavingBrowser.mobile.errors,[]);assert.ok(pavingBrowser.mobile.activeTiles<=8&&pavingBrowser.mobile.pieces<=256&&pavingBrowser.mobile.triangles<=160000&&pavingBrowser.mobile.cacheTiles<=16);
assert.equal(acceptance.visualAcceptance.status,'passed');assert.equal(acceptance.visualAcceptance.authoringCommit,release.authoringCommit);assert.equal(acceptance.visualAcceptance.testedManifestSha256,acceptance.testedManifestSha256);for(const c of pavingBrowser.captures)assert.equal(acceptance.visualAcceptance.captureSha256[c.file],c.sha256,'Missing visual review '+c.name);
for(const c of browserAppearance.captures)assert.equal(acceptance.visualAcceptance.captureSha256[c.file],c.sha256,'Missing appearance review '+c.name);
for(const c of forward.captures)assert.equal(acceptance.visualAcceptance.captureSha256[c.file],c.sha256,'Missing forward appearance review '+c.name);
const preserved={'data/catalog.json':'aa50ff35a2cd3f6c033e6716c876a6b6d6e53b8cfd4d2c98c76ab2ff91d931fb','data/measurements.csv':'d93d2e9d2dbc1e661e674cd94da4cf4787e4a70e7f07749352a97ad2ddb9ea29','data/plan.svg':'0b4e38220ef5eaa4ee0386dfc2bc4df746fd175717f92a522e6b64261c300be4'};for(const[name,digest]of Object.entries(preserved))assert.equal(hash(join(site,name)),digest,'Measured export changed '+name);
const features=new Map(data.features.map(f=>[f.id,f]));assert.equal(features.size,data.features.length,'Duplicate feature IDs');
for(const pair of rendering.pairs)for(const id of pair.featureIds)assert.ok(features.has(id),'Unknown rendered overlap feature '+id);
assert.equal(audit.coverage.length,4775);assert.equal(new Set(audit.coverage.map(e=>e.handle)).size,4775);assert.deepEqual(audit.decode.missingEntities,[]);assert.deepEqual(audit.decode.customEntityClasses,[]);assert.equal(audit.decode.stats.unknownEntityCount,0);assert.equal(audit.decode.warningResolution.status,'resolved for drawable geometry');
const geometry=new Map(audit.coverage.filter(e=>['geometry','reference'].includes(e.classification)).map(e=>[e.handle,e]));let vertices=0,edges=0;
for(const record of audit.coverage){if(record.featureId)assert.ok(features.has(record.featureId),'Missing record '+record.featureId);}
for(const f of data.features){assert.ok(f.description&&f.name&&f.category);assert.equal(f.rings.length,f.components.length);for(const[ridx,r]of f.rings.entries()){assert.equal(geometry.get(r.handle)?.featureId,f.id);assert.ok(r.vertices.every(p=>p.length===2&&p.every(Number.isFinite)));vertices+=r.vertices.length;const points=r.vertices.length>1&&r.vertices[0].every((n,i)=>n===r.vertices.at(-1)[i])?r.vertices.slice(0,-1):r.vertices;const m=f.components[ridx];assert.equal(m.handle,r.handle);assert.equal(m.edgeLengthsM.length,r.closed?points.length:points.length-1);edges+=m.edgeLengthsM.length;for(let i=0;i<m.edgeLengthsM.length;i++)assert.ok(Math.abs(m.edgeLengthsM[i]-Math.hypot(points[i][0]-points[(i+1)%points.length][0],points[i][1]-points[(i+1)%points.length][1]))<1e-10,'Stale edge measurement '+r.handle);}}
const active=data.features.filter(f=>!f.reference);assert.equal(active.filter(f=>f.category==='Residential parcels').length,434);assert.equal(active.filter(f=>f.category==='Commercial parcels').length,89);assert.ok(features.has('AN04')&&features.has('AN05'));assert.equal(active.filter(f=>['COT_COL_COM_PARKING','COT_COL_ANCLA_PARKING'].includes(f.layer)).length,70);assert.equal(active.filter(f=>f.id==='PROPERTY').length,1);assert.equal(active.filter(f=>f.id==='LAKE').length,1);assert.equal(Number(features.get('LAKE').measurements.areaM2.toFixed(2)),2000);assert.equal(Number(features.get('PROPERTY').measurements.areaM2.toFixed(2)),100029.05);
for(const row of data.areaSchedule)assert.equal(Number(row.measuredM2.toFixed(2)),row.publishedM2);
for(const k of ['invalid','outsideProperty','parcelOverlaps'])assert.deepEqual(audit.topology[k],[]);assert.equal(audit.topology.partitionGapM2,0);assert.equal(audit.topology.partitionOutsideM2,0);assert.ok(Math.abs(audit.topology.partitionOverlapM2)<.00001);assert.ok(audit.precision.coordinateRoundTripMaxM<=.000001);assert.ok(audit.precision.float32LocalMaxM<=.0001);
const csv=readFileSync(join(site,'data/measurements.csv'),'utf8');assert.equal(csv.trimEnd().split(/\r?\n/).length,edges+1,'Missing CSV measurement rows');const svg=readFileSync(join(site,'data/plan.svg'),'utf8');assert.ok(svg.includes('<svg')&&svg.includes('<title'));assert.equal([...svg.matchAll(/data-feature-id=/g)].length,active.length,'Missing SVG feature records');
const html=readFileSync(join(site,'index.html'),'utf8');assert.ok(html.includes('welcome to sucre')&&html.includes('COTENDO')&&html.includes('noscript'));
console.log(`COTENDO validation passed: ${features.size} features, 4,775 source entities, ${vertices} original vertices, ${edges} edge measurements, verified WebGPU build.`);
