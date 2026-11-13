const resolutionPhases = [{scale:1, label:'Completa'}, {scale:.5, label:'Reducida'}];
const warmupMs = 2000;
const durationMs = 60000;

export function frameResult(intervals, width, height) {
  const total = intervals.reduce((sum, ms) => sum + ms, 0);
  const ordered = [...intervals].sort((a,b) => a-b);
  return {
    width, height, fps:1000 * intervals.length / total,
    p95:ordered[Math.ceil(ordered.length*.95)-1],
    onTime:100 * intervals.filter(ms => ms <= 25).length / intervals.length,
  };
}

// Time drives the camera so slower devices travel exactly the same path. The
// native navigation applies the gangway bounds, slope, and eye height.
export function placeOnRoute(walk, seconds, initialYaw) {
  const boarding = walk.model.boarding;
  const [start, y] = boarding.room.spawn;
  const phase = seconds * Math.PI / 6;
  const x = start + (boarding.walkEnd-start) * (.5-.5*Math.cos(phase));
  walk.nav.move(x-walk.nav.position[0], y-walk.nav.position[1]);
  walk.yaw = initialYaw + Math.PI * (.5-.5*Math.tanh(3*Math.sin(phase+.24)));
}

export function createBenchmark(app, report) {
  let run;
  const walk = app.yachtWalk;
  const engine = app.engine;
  function setupPhase() {
    const r = run;
    const phase = r.phases[r.index];
    if (engine.renderScale !== phase.scale) engine.setRenderScale(phase.scale);
    app.gangwayRenderer?.setSamples(phase.samples);
    r.width = engine.width;
    r.height = engine.height;
    walk.enterRoom('boarding');
    walk.controls?.clearInput();
    r.heading = walk.yaw;
    r.warmStart = undefined;
    r.start = undefined;
    r.previous = undefined;
    r.intervals = [];
    r.remaining = -1;
    report({state:'warmup', phase:r.phases[r.index].label, width:r.width, height:r.height});
  }
  function end(state) {
    if (!run) return;
    const r = run;
    run = undefined;
    if (app.gangwayOnly) {
      if (engine.renderScale !== r.originalScale) engine.setRenderScale(r.originalScale);
      app.gangwayRenderer?.setSamples(r.originalSamples);
      walk.enterRoom('boarding');
    }
    report({state});
  }
  return {
    get active() { return Boolean(run); },
    get mode() { return run?.mode; },
    start(mode = 'resolution') {
      if (run || !app.gangwayOnly || !walk.active || walk.controls?.open) return;
      if (mode === 'edges' && !app.gangwayRenderer?.canSmooth) return;
      const originalScale = engine.renderScale;
      const originalSamples = app.gangwayRenderer?.samples ?? 1;
      const phases = mode === 'edges'
        ? [{scale:originalScale, samples:1, label:'Sin suavizado'}, {scale:originalScale, samples:4, label:'MSAA 4×'}]
        : resolutionPhases.map(phase => ({...phase, samples:originalSamples}));
      run = {index:0, mode, phases, originalScale, originalSamples};
      report({state:'start'});
      setupPhase();
    },
    cancel() { end('cancelled'); },
    beforeFrame(now) {
      const r = run;
      if (!r) return;
      if (engine.width !== r.width || engine.height !== r.height || walk.controls?.open || !walk.active) {
        end('cancelled'); return;
      }
      r.warmStart ??= now;
      if (now-r.warmStart < warmupMs) return;
      r.start ??= now;
      const elapsed = now-r.start;
      placeOnRoute(walk, Math.min(elapsed,durationMs)/1000, r.heading);
      const remaining = Math.max(0,Math.ceil((durationMs-elapsed)/1000));
      if (remaining !== r.remaining) {
        r.remaining = remaining;
        report({state:'measuring',phase:r.phases[r.index].label,remaining});
      }
    },
    submitted(now) {
      const r = run;
      if (!r || r.start === undefined) return;
      if (r.previous !== undefined) r.intervals.push(now-r.previous);
      r.previous = now;
      if (now-r.start < durationMs) return;
      report({state:'result',phase:r.phases[r.index].label,...frameResult(r.intervals,r.width,r.height)});
      if (++r.index === r.phases.length) end('done');
      else setupPhase();
    },
  };
}
