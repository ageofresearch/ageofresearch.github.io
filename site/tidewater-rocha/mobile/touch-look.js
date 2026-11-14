// One Euro filtering followed by radial spatial hysteresis, in CSS pixels.
// Equations/tuning: Casiez, Roussel & Vogel (CHI 2012), https://gery.casiez.net/1euro/
// Original implementation here; no timers, prediction or release inertia.
export const TOUCH_LOOK_GAIN = 4;
export const TOUCH_LOOK_DEFAULTS = Object.freeze({
  radius: 1.5,
  minCutoff: 6, // Hz: a short settling time at slow speeds.
  beta: 0.08, // 1/CSS pixel: raise the cutoff during deliberate fast swipes.
  derivativeCutoff: 1,
});

const alpha = (cutoff, dt) => 1 / (1 + 1 / (2 * Math.PI * cutoff * dt));

export class TouchLookFilter {
  constructor(options = {}) {
    this.options = { ...TOUCH_LOOK_DEFAULTS, ...options };
    const { radius, minCutoff, beta, derivativeCutoff } = this.options;
    if (![radius, minCutoff, beta, derivativeCutoff].every(Number.isFinite) ||
        radius < 0 || minCutoff <= 0 || beta < 0 || derivativeCutoff <= 0) {
      throw new RangeError('Invalid touch look filter parameters');
    }
    this.reset();
  }

  reset() { this.state = null; }

  begin(x, y, timeMs) {
    this.reset();
    if ([x, y, timeMs].every(Number.isFinite)) {
      this.state = { rawX:x, rawY:y, x, y, anchorX:x, anchorY:y, vx:0, vy:0, timeMs };
    }
  }

  move(x, y, timeMs) {
    const s = this.state;
    if (!s || ![x, y, timeMs].every(Number.isFinite) || timeMs <= s.timeMs) return { x:0, y:0 };
    const dt = (timeMs - s.timeMs) / 1000;
    const { radius, minCutoff, beta, derivativeCutoff } = this.options;
    const da = alpha(derivativeCutoff, dt);
    s.vx += da * ((x - s.rawX) / dt - s.vx);
    s.vy += da * ((y - s.rawY) / dt - s.vy);
    // One shared cutoff preserves direction when moving diagonally.
    const a = alpha(minCutoff + beta * Math.hypot(s.vx, s.vy), dt);
    s.x += a * (x - s.x);
    s.y += a * (y - s.y);
    s.rawX = x; s.rawY = y; s.timeMs = timeMs;

    const dx = s.x - s.anchorX, dy = s.y - s.anchorY;
    const distance = Math.hypot(dx, dy);
    if (distance <= radius) return { x:0, y:0 };
    // Keep the accepted anchor inside a disk around the filtered position.
    // Discard only the margin, not the whole event: subpixel steps accumulate,
    // crossing the boundary causes no jump, and the margin follows every stop.
    const excess = (distance - radius) / distance;
    const delta = { x:dx * excess, y:dy * excess };
    s.anchorX += delta.x; s.anchorY += delta.y;
    return delta;
  }
}

export function createTouchLook(controls) {
  const { walk } = controls;
  const canvas = walk.app.engine.domElement;
  const filter = new TouchLookFilter();
  let pointer = null;
  function reset() {
    const previous = pointer;
    pointer = null;
    walk.drag = null;
    filter.reset();
    if (previous !== null && canvas.hasPointerCapture(previous)) canvas.releasePointerCapture(previous);
  }
  controls.listen(canvas, 'pointerdown', event => {
    if (!walk.active || controls.open || event.pointerType !== 'touch' || pointer !== null) return;
    event.preventDefault();
    pointer = event.pointerId;
    walk.drag = [pointer, event.clientX, event.clientY];
    filter.begin(event.clientX, event.clientY, event.timeStamp);
    try { canvas.setPointerCapture(pointer); } catch { /* Detached/cancelled pointer. */ }
  }, { passive:false });
  controls.listen(canvas, 'pointermove', event => {
    if (event.pointerId !== pointer) return;
    if (!walk.active || controls.open) { reset(); return; }
    event.preventDefault();
    const samples = event.getCoalescedEvents?.();
    const look = walk.app.input.look;
    for (const sample of samples?.length ? samples : [event]) {
      const delta = filter.move(sample.clientX, sample.clientY, sample.timeStamp);
      look.x += delta.x * TOUCH_LOOK_GAIN;
      look.y += delta.y * TOUCH_LOOK_GAIN;
    }
    walk.drag = [pointer, event.clientX, event.clientY];
  }, { passive:false });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    controls.listen(canvas, type, event => { if (event.pointerId === pointer) reset(); });
  }
  // The controls owner already clears input on blur, hidden tabs, menus and exit,
  // and removes these listeners on disposal.
  return { reset };
}
