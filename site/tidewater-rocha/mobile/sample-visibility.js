// Each MSAA sample stores the first four powers of its opaque vertex tag in
// F_251. All four 8-bit values and their four-sample averages are exact in
// binary16. Newton's identities recover a polynomial whose roots include
// every winning tag, even where four different faces share one pixel.
const prime = 251,
  tile = 8;
const invalidSum = 0xffff;
const halfTimesFour = new Uint16Array(65536).fill(invalidSum);
halfTimesFour[0] = 0;
for (let sum = 1; sum <= 4 * (prime - 1); sum++) {
  const value = sum / 4, exponent = Math.floor(Math.log2(value));
  const bits = (15 + exponent) * 1024 + (value / 2 ** exponent - 1) * 1024;
  halfTimesFour[bits] = sum;
}
const mod = (n) => ((n % prime) + prime) % prime;
// A pixel strictly inside a face resolves to its unmodified tag in the
// first channel. These pixels need neither polynomial decoding nor hashing.
const sameSample = new Uint16Array(prime * 3);
for (let t = 0; t < prime; t++) {
  let power = t;
  for (let i = 0; i < 3; i++) {
    power = (power * t) % prime;
    sameSample[t * 3 + i] = 4 * power;
  }
}
export function sampleRoots(a, b, c, d) {
  const x = mod(a * 63); // 4*63 = 1 modulo 251
  const xx = (x * x) % prime,
    xxx = (xx * x) % prime;
  if ((4 * xx) % prime === b && (4 * xxx) % prime === c && (4 * ((xxx * x) % prime)) % prime === d)
    return [x];
  const e2 = mod((a * a - b) * 126);
  const e3 = mod((e2 * a - a * b + c) * 84);
  const e4 = mod((e3 * a - e2 * b + a * c - d) * 63);
  return splitQuartic(mod(-a), e2, mod(-e3), e4);
}

// Divide out the roots we actually find. A malformed tuple can describe a
// polynomial with one real tag and an irreducible factor. In that case the
// whole tile has to retain its geometry.
const squareRoot = new Int16Array(prime).fill(-1);
for (let i = 0; i <= (prime - 1) / 2; i++) squareRoot[(i * i) % prime] = i;
function splitQuartic(a, b, c, d) {
  for (let t = 0; t < prime; t++) {
    const j = t + a, k = (j * t + b) % prime, l = (k * t + c) % prime;
    if ((l * t + d) % prime !== 0) continue;
    // Synthetic division leaves x³ + j x² + k x + l.
    for (let u = t; u < prime; u++) {
      const m = j + u, n = (m * u + k) % prime;
      if ((n * u + l) % prime !== 0) continue;
      const root = squareRoot[mod(m * m - 4 * n)];
      if (root < 0) return null;
      const v = mod((root - m) * 126), w = mod((-root - m) * 126);
      return [...new Set([t, u, v, w])].sort((x, y) => x - y);
    }
    return null;
  }
  return null;
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
      const a = halfTimesFour[pixels[i]], b = halfTimesFour[pixels[i + 1]];
      const c = halfTimesFour[pixels[i + 2]], d = halfTimesFour[pixels[i + 3]];
      const base = (row + Math.floor(x / tile)) * 8;
      const tag = a / 4;
      if (Number.isInteger(tag) && tag < prime && b === sameSample[tag * 3] &&
          c === sameSample[tag * 3 + 1] && d === sameSample[tag * 3 + 2]) {
        bits[base + (tag >>> 5)] |= 1 << (tag & 31);
        continue;
      }
      if ((a | b | c | d) === invalidSum) {
        bits.fill(0xffffffff, base, base + 8);
        continue;
      }
      const key = (((a % prime) * prime + b % prime) * prime + c % prime) * prime + d % prime;
      let roots = cache.get(key);
      if (roots === undefined) {
        roots = sampleRoots(a % prime, b % prime, c % prime, d % prime);
        cache.set(key, roots);
      }
      if (roots) {
        for (const t of roots) bits[base + (t >>> 5)] |= 1 << (t & 31);
      } else {
        bits.fill(0xffffffff, base, base + 8);
      }
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
