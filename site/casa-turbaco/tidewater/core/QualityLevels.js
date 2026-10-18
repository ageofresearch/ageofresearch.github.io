/** Diagnostic quality state and deterministic content selection; no GPU/DOM imports. */
export const FULL_QUALITY = Object.freeze({ atmosphere: 1, antiAliasing: 1, sceneDetail: 1 });
export const HALF_QUALITY = Object.freeze({ atmosphere: .5, antiAliasing: .5, sceneDetail: .5 });
export const QUALITY_LEVELS = Object.freeze([0, .05, .1, .2, .5, 1]);
export const QUALITY_LABELS = Object.freeze(['Off', '5%', '10%', '20%', 'Half (50%)', 'Full (100%)']);
export const qualityLabel = level => QUALITY_LABELS[QUALITY_LEVELS.indexOf(level)];
export const aaMethodForQuality = level => level === 1 ? 'taa' : level > 0 ? 'fxaa' : 'none';
// Matches the FXAA shader's per-direction edge walk, including its first sample.
export const fxaaSearchSteps = level => Math.max(1, Math.min(6, Math.ceil(12 * level)));
export const QUALITY_PARAMS = Object.freeze({ atmosphere: 'atmosphereQuality', antiAliasing: 'aaQuality', sceneDetail: 'detailQuality' });
export function validateQuality(partial) {
  if (!partial || typeof partial !== 'object' || Array.isArray(partial)) throw new TypeError('Quality levels must be an object');
  for (const [key, value] of Object.entries(partial)) {
    if (!Object.hasOwn(FULL_QUALITY, key) || !QUALITY_LEVELS.includes(value)) throw new TypeError('Quality levels accept only known keys and 0, 0.05, 0.1, 0.2, 0.5, or 1');
  }
  return partial;
}
export function qualityFromSearch(search) {
  const q = typeof search === 'string' ? new URLSearchParams(search) : search;
  const levels = { ...FULL_QUALITY };
  for (const [key, param] of Object.entries(QUALITY_PARAMS)) {
    if (q.has(param)) {
      const raw = q.get(param);
      if (!QUALITY_LEVELS.map(String).includes(raw)) throw new TypeError('Invalid ' + param);
      levels[key] = Number(raw);
    }
  }
  return levels;
}
export function createQualityRanks(count, seed = 0) {
  // Rank immutable IDs once. Every lower-density selection is a subset of the next level.
  const hash = i => { let x = (i + seed + 0x9e3779b9) | 0; x = Math.imul(x ^ (x >>> 16), 0x21f0aaad); x = Math.imul(x ^ (x >>> 15), 0x735a2d97); return (x ^ (x >>> 15)) >>> 0; };
  const ids = Array.from({ length: count }, (_, i) => i).sort((a, b) => hash(a) - hash(b) || a - b);
  const ranks = new Uint32Array(count);
  for (let i = 0; i < count; i++) ranks[ids[i]] = i;
  return ranks;
}
export function createHalfMask(count, seed = 0) {
  const ranks = createQualityRanks(count, seed), limit = Math.ceil(count / 2);
  const mask = Uint8Array.from(ranks, rank => rank < limit ? 1 : 0);
  return mask;
}
export function setQualityLevels(app, globals, partial) {
  validateQuality(partial);
  const next = { ...app.qualityLevels, ...partial };
  const previous = { ...app.qualityLevels };
  if (Object.keys(FULL_QUALITY).every(k => previous[k] === next[k])) return app.qualityLevels;
  Object.assign(app.qualityLevels, next);
  if (previous.atmosphere !== next.atmosphere) {
    globals.atmosphereQuality.value = next.atmosphere;
    if (app.clouds) {
      app.clouds.resolutionScale = app.settings.renderScale * Math.sqrt(next.atmosphere || 1);
      app.clouds.invalidate?.(); app.clouds.resetHistory?.();
    }
    if (app.haze) {
      app.haze.qualityLevel = next.atmosphere;
      app.haze._histValid = false;
      if (next.atmosphere > 0) app.haze.setSize(app.engine.canvas.width, app.engine.canvas.height);
    }
    app._qualityEnvironmentDirty = app._waterGroundDirty = true;
  }
  if (previous.antiAliasing !== next.antiAliasing) {
    globals.antiAliasingQuality.value = next.antiAliasing;
    app.post.aaMode = aaMethodForQuality(next.antiAliasing);
  }
  if (previous.sceneDetail !== next.sceneDetail) {
    app.vegetation?.setQualityLevel(next.sceneDetail);
    app.reef?.setQualityLevel(next.sceneDetail);
  }
  app.post.taau.restart(); app.post._hasPrev = false;
  if (app._fps) app._fps.acc = app._fps.n = app._fps.worst = 0;
  app.fps = 0;
  app.ui?.syncQualityLevels?.();
  return app.qualityLevels;
}
