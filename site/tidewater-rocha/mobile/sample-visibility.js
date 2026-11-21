// Each MSAA sample stores the first four powers of its opaque vertex tag in
// F_251. All four 8-bit values and their four-sample averages are exact in
// binary16. Newton's identities recover a polynomial whose roots include
// every winning tag, even where four different faces share one pixel.
const prime = 251,
  tile = 8;
const halfTimesFour = new Uint16Array(0x6000);
for (let h = 0; h < halfTimesFour.length; h++) {
  const exp = (h >> 10) & 31;
  halfTimesFour[h] = Math.round((1024 + (h & 1023)) * 2 ** (exp - 23));
}
const mod = (n) => ((n % prime) + prime) % prime;
export function sampleRoots(a, b, c, d) {
  const x = mod(a * 63); // 4*63 = 1 modulo 251
  const xx = (x * x) % prime,
    xxx = (xx * x) % prime;
  if ((4 * xx) % prime === b && (4 * xxx) % prime === c && (4 * ((xxx * x) % prime)) % prime === d)
    return [x];
  const e2 = mod((a * a - b) * 126);
  const e3 = mod((e2 * a - a * b + c) * 84);
  const e4 = mod((e3 * a - e2 * b + a * c - d) * 63);
  const roots = [];
  for (let t = 0; t < prime; t++) if (mod((((t - a) * t + e2) * t - e3) * t + e4) === 0) roots.push(t);
  return roots;
}
export function filterSamples(pixels, width, height, stride, vertices, indices, first, count, clip) {
  const cols = Math.ceil(width / tile),
    rows = Math.ceil(height / tile);
  const bits = new Uint32Array(cols * rows * 8),
    cache = new Map();
  for (let y = 0; y < height; y++) {
    const row = Math.floor(y / tile) * cols;
    for (let x = 0; x < width; x++) {
      const i = (y * stride) / 2 + x * 4;
      const a = halfTimesFour[pixels[i]] % prime,
        b = halfTimesFour[pixels[i + 1]] % prime;
      const c = halfTimesFour[pixels[i + 2]] % prime,
        d = halfTimesFour[pixels[i + 3]] % prime;
      const key = ((a * prime + b) * prime + c) * prime + d;
      let roots = cache.get(key);
      if (!roots) {
        roots = sampleRoots(a, b, c, d);
        cache.set(key, roots);
      }
      const base = (row + Math.floor(x / tile)) * 8;
      for (const t of roots) bits[base + (t >>> 5)] |= 1 << (t & 31);
    }
  }
  const f = new Float32Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 4);
  const layer = new Int16Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 2);
  const xy = new Float64Array((vertices.length / 32) * 2),
    seen = new Uint8Array(vertices.length / 32);
  function project(v) {
    if (seen[v]) return;
    const x = f[v * 8],
      y = f[v * 8 + 1],
      z = f[v * 8 + 2];
    const w = clip[3] * x + clip[7] * y + clip[11] * z + clip[15];
    if (w < 0.05) xy[v * 2] = NaN;
    else {
      xy[v * 2] = (1 + (clip[0] * x + clip[4] * y + clip[8] * z + clip[12]) / w) * width * 0.5;
      xy[v * 2 + 1] = (1 - (clip[1] * x + clip[5] * y + clip[9] * z + clip[13]) / w) * height * 0.5;
    }
    seen[v] = 1;
  }
  function visible(a, b, c) {
    if (layer[a * 16 + 14] === -2) return true;
    project(a);
    project(b);
    project(c);
    const x0 = xy[a * 2],
      x1 = xy[b * 2],
      x2 = xy[c * 2];
    if (!Number.isFinite(x0 + x1 + x2)) return true;
    const y0 = xy[a * 2 + 1],
      y1 = xy[b * 2 + 1],
      y2 = xy[c * 2 + 1];
    const left = Math.max(0, Math.floor((Math.min(x0, x1, x2) - 2) / tile));
    const right = Math.min(cols - 1, Math.floor((Math.max(x0, x1, x2) + 2) / tile));
    const top = Math.max(0, Math.floor((Math.min(y0, y1, y2) - 2) / tile));
    const bottom = Math.min(rows - 1, Math.floor((Math.max(y0, y1, y2) + 2) / tile));
    const tag = a % prime,
      word = tag >>> 5,
      mask = 1 << (tag & 31);
    for (let j = top; j <= bottom; j++)
      for (let i = left; i <= right; i++) if (bits[(j * cols + i) * 8 + word] & mask) return true;
    return false;
  }
  const result = new indices.constructor(count + (indices.BYTES_PER_ELEMENT === 2 ? count % 2 : 0));
  let length = 0;
  for (let i = first; i < first + count; i += 3) {
    const a = indices[i],
      b = indices[i + 1],
      c = indices[i + 2];
    if (visible(a, b, c)) {
      result[length++] = a;
      result[length++] = b;
      result[length++] = c;
    }
  }
  return { output: result, length };
}
