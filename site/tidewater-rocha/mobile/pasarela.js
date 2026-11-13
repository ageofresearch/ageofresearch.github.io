import { createBenchmark } from './frame-benchmark.js?v=stern-landing-1';

// The iframe owns the world, camera, lighting and native walking controls.
export function crossing(walk) {
  const boarding = walk.model.boarding;
  const nav = walk.nav;
  const [along, across] = nav.position;
  if (nav.deck !== boarding.room.deck || !boarding.safe(along, across, nav.radius)) return null;
  const start = boarding.room.spawn[0];
  const end = boarding.walkEnd ?? boarding.end;
  const target = along >= end - .04 ? start : end;
  const direction = Math.sign(target - along);
  return function advance(seconds) {
    const [x, y] = nav.position;
    if (direction * (target - x) <= .002) return false;
    const step = Math.min(Math.abs(target - x), Math.min(.075, seconds) * 1.12);
    if (step <= 0) return true;
    nav.move(direction * step, Math.max(-step, Math.min(step, boarding.y - y)));
    return Math.abs(nav.position[0] - x) > .00001 && direction * (target - nav.position[0]) > .002;
  };
}

function crossLabel(walk) {
  return walk && walk.nav.position[0] >= walk.model.boarding.walkEnd-.04
    ? 'Regresar por la pasarela' : 'Caminar hasta popa';
}

function attachPilot(frame) {
  const panel = document.querySelector('#pilot');
  const button = document.querySelector('#cross');
  const reset = document.querySelector('#reset');
  const fps = document.querySelector('#fps');
  const resolution = document.querySelector('#resolution');
  let session;
  const bind = () => {
    session?.abort();
    const current = session = new AbortController();
    const options = {signal: current.signal};
    const view = frame.contentWindow;
    const doc = frame.contentDocument;
    panel.hidden = true;
    panel.open = false;
    let timer, animation = 0, advance, previous;
    function stop() {
      view.cancelAnimationFrame(animation);
      advance = null;
      previous = undefined;
      button.textContent = crossLabel(view.__app?.yachtWalk);
    }
    const cancel = () => { clearTimeout(timer); stop(); };
    current.signal.addEventListener('abort', cancel, {once:true});
    function ready() {
      // Fail closed if the native app navigates to a different world or full map.
      if (!doc || doc.URL === 'about:blank' || view.__mapsPublicStatus?.status === 'unsupported') return;
      const app = view.__app;
      if (!app?.startupStats) {
        timer = setTimeout(ready, 200);
        return;
      }
      if (!app.gangwayOnly || !app.yachtWalk?.model.boarding) return;
      const walk = app.yachtWalk;
      const nativeFps = doc.querySelector('#fps');
      const canvas = app.engine.domElement;
      const equipmentTour = () => Boolean(doc.querySelector('.ldm-tour-panel'));
      const scale = document.querySelector('#scale');
      const compare = document.querySelector('#compare');
      const edges = document.querySelector('#compareEdges');
      const smooth = document.querySelector('#smooth');
      const renderer = app.gangwayRenderer;
      const progress = document.querySelector('#progress');
      const results = document.querySelector('#results');
      function showReport(event) {
        switch (event.state) {
          case 'start': results.replaceChildren(); break;
          case 'warmup': progress.textContent = event.phase + ' · preparando ' + event.width + ' × ' + event.height; break;
          case 'measuring': progress.textContent = event.phase + ' · quedan ' + event.remaining + ' s'; break;
          case 'cancelled': progress.textContent = 'Prueba interrumpida'; break;
          case 'done': progress.textContent = 'Comparación terminada'; break;
          case 'result': {
            const row = document.createElement('li');
            row.textContent = event.phase + ' (' + event.width + ' × ' + event.height + ') · ' + event.fps.toFixed(1) +
              ' FPS de media · P95 ' + event.p95.toFixed(1) + ' ms · ' + Math.round(event.onTime) + ' % de cuadros en 25 ms o menos';
            results.append(row);
            break;
          }
        }
        stats();
      }
      const benchmark = app.gangwayBenchmark = createBenchmark(app, showReport);
      results.replaceChildren();
      progress.textContent = '';
      function stats() {
        fps.textContent = nativeFps?.textContent || '— FPS';
        resolution.textContent = canvas.width + ' × ' + canvas.height;
        const busy = equipmentTour();
        if (!advance) button.textContent = crossLabel(walk);
        button.disabled = benchmark.active || !advance && (!walk.active || !crossing(walk) || busy);
        reset.disabled = busy || benchmark.active;
        scale.value = String(app.engine.renderScale);
        scale.disabled = benchmark.active;
        smooth.checked = renderer.samples === 4;
        smooth.disabled = !renderer.canSmooth || benchmark.active;
        const unavailable = busy || !walk.active || walk.controls?.open;
        compare.disabled = unavailable || benchmark.mode === 'edges';
        edges.disabled = unavailable || !renderer.canSmooth || benchmark.mode === 'resolution';
        compare.textContent = benchmark.mode === 'resolution' ? 'Cancelar comparación' : 'Comparar FPS · 2 × 60 s';
        edges.textContent = benchmark.mode === 'edges' ? 'Cancelar comparación' : 'Comparar suavizado · 2 × 60 s';
      }
      function tick(now) {
        if (!advance || !walk.active || walk.controls?.open || equipmentTour() || doc.hidden) return stop();
        const seconds = previous === undefined ? 0 : (now - previous) / 1000;
        previous = now;
        const moving = advance(seconds);
        // The native render loop then applies the normal eye height, slope and pose.
        if (!moving) return stop();
        animation = view.requestAnimationFrame(tick);
      }
      function faceTravelDirection() {
        const boarding = walk.model.boarding;
        const sign = walk.nav.position[0] < (boarding.walkEnd ?? boarding.end) - .04 ? 1 : -1;
        const forward = app.camera.position.clone().set(0,0,sign).applyQuaternion(walk.model.group.quaternion);
        return Math.atan2(-forward.x,-forward.z);
      }
      button.addEventListener('click', () => {
        if (advance) return stop();
        if (equipmentTour()) return;
        advance = crossing(walk);
        if (!advance) return;
        const move = advance;
        let heading = faceTravelDirection();
        let arrived = false;
        advance = seconds => {
          const error = heading - walk.yaw;
          walk.yaw += Math.atan2(Math.sin(error), Math.cos(error)) * (1 - Math.exp(-3 * Math.min(.075, seconds)));
          if (arrived) {
            walk.pitch += (-.28-walk.pitch) * (1-Math.exp(-3*Math.min(.075, seconds)));
            return Math.abs(Math.atan2(Math.sin(error), Math.cos(error))) > .015;
          }
          if (!move(seconds)) {
            const boarding = walk.model.boarding;
            if (walk.nav.position[0] < boarding.walkEnd-.04) return false;
            arrived = true;
            heading = walk.yaw + Math.PI;
          }
          return true;
        };
        previous = undefined;
        button.textContent = 'Detener recorrido';
        animation = view.requestAnimationFrame(tick);
      },options);
      reset.addEventListener('click', () => {
        // The iframe's own equipment tour listens for pointer input to cancel.
        if (!equipmentTour()) walk.enterRoom('boarding');
        stop();
        stats();
      },options);
      scale.addEventListener('change', () => {
        app.engine.setRenderScale(Number(scale.value));
        stats();
      }, options);
      smooth.addEventListener('change', () => {
        renderer.setSamples(smooth.checked ? 4 : 1);
        stats();
      }, options);
      function compareWalks(mode) {
        stop();
        if (benchmark.active) benchmark.cancel();
        else if (!equipmentTour()) benchmark.start(mode);
      }
      compare.addEventListener('click', () => compareWalks('resolution'), options);
      edges.addEventListener('click', () => compareWalks('edges'), options);
      function interrupt() {
        stop(); benchmark.cancel();
      }
      current.signal.addEventListener('abort', () => {
        benchmark.cancel();
        delete app.gangwayBenchmark;
      }, {once:true});
      view.addEventListener('resize', () => benchmark.cancel(), options);
      doc.addEventListener('pointerdown', interrupt, {...options,capture:true});
      doc.addEventListener('keydown', interrupt, {...options,capture:true});
      doc.addEventListener('visibilitychange', interrupt, options);
      view.addEventListener('luz-de-mar:full-yacht', () => { panel.hidden = true; current.abort(); }, options);
      view.addEventListener('pagehide', () => { panel.hidden = true; current.abort(); }, options);
      panel.addEventListener('toggle', stats, options);
      const changes = new MutationObserver(() => {if (panel.open) stats();});
      if (nativeFps) changes.observe(nativeFps, {childList:true,characterData:true,subtree:true});
      current.signal.addEventListener('abort', () => changes.disconnect(), {once:true});
      panel.hidden = false;
      stats();
    }
    ready();
  };
  frame.addEventListener('load', bind);
  if (frame.contentDocument?.readyState === 'complete') bind();
}

if (typeof document !== 'undefined') attachPilot(document.querySelector('#yacht'));
