// DOM-only movement control. Rendering and collision detection stay in YachtWalk.
const DEAD_ZONE = 0.12;

export function analogVector(vector) {
  const length = Math.hypot(vector.x, vector.y);
  if (!Number.isFinite(length) || length <= DEAD_ZONE) return { x: 0, y: 0 };
  const speed = (Math.min(1, length) - DEAD_ZONE) / (1 - DEAD_ZONE);
  return { x: vector.x / length * speed, y: vector.y / length * speed };
}

export function createWalkJoystick(controls) {
  const { walk, doc, root } = controls;
  const win = doc.defaultView;
  const media = win.matchMedia('(pointer: coarse), (max-width: 600px)');
  let manager, zone, disposed = false, loading = false, pointer = null;
  const zero = () => {
    walk.touchMove.x = walk.touchMove.y = 0;
    zone?.classList.remove('is-active');
  };
  function reset() {
    zero();
    // Ending the library gesture also prevents an old finger resuming after a menu.
    if (manager) for (const stick of [...manager.actives.values()]) stick.end();
    if (pointer !== null && zone?.hasPointerCapture(pointer)) zone.releasePointerCapture(pointer);
    pointer = null;
  }
  async function mount() {
    if (disposed || loading || manager || !media.matches) return;
    loading = true;
    try {
      // Lazy import: the vendor expects a browser. Geometry tools also import YachtWalk in Node.
      const { create } = await import('./vendor/nipplejs-1.0.4.js');
      if (disposed) return;
      const previous = root.querySelector('.luz-move');
      zone = doc.createElement('div');
      zone.className = 'luz-stick';
      zone.setAttribute('role', 'group');
      zone.setAttribute('aria-label', 'Joystick para caminar. Arrastra en la dirección deseada.');
      const style = doc.createElement('style');
      style.textContent = `
        .luz-stick{display:none;position:fixed;left:max(10px,env(safe-area-inset-left));bottom:calc(88px + env(safe-area-inset-bottom));width:140px;height:140px;pointer-events:auto;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
        .luz-stick .back{box-sizing:border-box;border:1px solid #e6d6b580;box-shadow:inset 0 0 0 7px #15262e33,0 3px 14px #0002}
        .luz-stick .front{box-sizing:border-box;border:1px solid #f9edcfbb;box-shadow:0 2px 9px #0005}
        .luz-stick.is-active .back{border-color:#f9edcfc0}
        @media(pointer:coarse),(max-width:600px){.luz-stick{display:block}}
        @media(max-height:440px){.luz-stick{bottom:calc(64px + env(safe-area-inset-bottom))}}
      `;
      zone.append(style);
      previous.after(zone);
      controls.listen(zone, 'contextmenu', event => event.preventDefault());
      controls.listen(zone, 'pointerdown', event => {
        if (!walk.active || controls.open || pointer !== null || event.button !== 0) {
          event.preventDefault(); event.stopImmediatePropagation(); return;
        }
        pointer = event.pointerId;
        zone.setPointerCapture(pointer);
      });
      controls.listen(zone, 'lostpointercapture', event => {
        if (event.pointerId === pointer) reset();
      });
      manager = create({
        zone, mode: 'static', position: { left: '50%', top: '50%' },
        size: 112, threshold: DEAD_ZONE, restOpacity: 0.72, fadeTime: 120,
        color: { back: '#142b36a8', front: 'linear-gradient(145deg,#e9dec2,#9b8969)' },
      });
      manager.on('move', event => {
        if (!walk.active || controls.open) return zero();
        Object.assign(walk.touchMove, analogVector(event.data.vector));
        zone.classList.add('is-active');
      });
      manager.on('end', zero);
      previous.remove();
      refresh();
    } catch (error) {
      // Keep the existing accessible buttons if the local module cannot load.
      manager?.destroy(); manager = null;
      zone?.remove(); zone = null;
      console.error('No se pudo iniciar el joystick del yate', error);
    } finally { loading = false; }
  }
  function refresh() {
    if (disposed) return;
    manager?.reposition();
    void mount();
  }
  controls.listen(win, 'resize', () => { reset(); refresh(); });
  controls.listen(media, 'change', () => { reset(); refresh(); });
  void mount();
  return {
    reset,
    refresh,
    dispose() { disposed = true; reset(); manager?.destroy(); zone?.remove(); },
  };
}
