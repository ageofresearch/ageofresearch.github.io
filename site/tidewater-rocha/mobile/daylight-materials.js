import { localReflections } from './yacht-daylight.js?v=yacht-daylight-1';
import { windowFill, windowSky } from './surface-lighting.js?v=surface-lighting-1';
// Diffuse light depends on the sun, material, normal and compartment. Most
// vertices repeat those inputs. Refresh each distinct result once when the sun
// moves, and leave only camera-dependent reflection and shadow visibility live.
// Reserve headroom while keeping more precision in the darker part of each
// linear light contribution. The vertex shader decodes both independently.
export const packedRadianceScale = 2;
const encode = x => Math.sqrt(x / packedRadianceScale) * 255;
const display = Float32Array.from({length:8193}, (_, i) => {
  const exposure = i / 4096;
  const v = Math.min(.83, exposure) + .54 * Math.max(0, Math.min(.3148, exposure - .83));
  return (v <= .0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - .055) * 255;
});
const displayByte = x => display[Math.min(8192, Math.round(x * 4096))];
const clothLayers = new Set([6, 20, 24]);
const recordSize = 19;
export function createMaterialPalette(device) {
  const existing = new Map(),
    records = [],
    vertices = [];
  let inputs,
    lit,
    vertexKeys,
    colors,
    storage,
    revision = -1;
  function register(bytes, positions, offset) {
    const signed = (c) => (bytes[offset + 12 + c] << 24) >> 24;
    const norm = Math.hypot(signed(0), signed(1), signed(2)) || 1;
    const nx = signed(0) / norm,
      ny = signed(1) / norm,
      nz = signed(2) / norm;
    const metal = bytes[offset + 30] / 255;
    const region = bytes[offset + 31];
    const rough = signed(3) / 127;
    // View-independent finishes can prepare both shadow endpoints just once.
    // Gloss and cloth still apply their live angular response in the vertex stage.
    const layer = (bytes[offset + 28] << 24) >> 24;
    const finish = layer >= 63 ? layer - 64 : layer;
    const cloth = clothLayers.has(finish);
    const dynamic = rough < .32 || metal > .05 || cloth || finish === 21 || finish === 22;
    const p = offset / 4;
    const window = region !== 0 && metal <= .05
      ? Math.round(255 * windowFill(positions[p], positions[p + 1], positions[p + 2], nx, ny, nz))
      : 0;
    let windowDirection = 0, windowStrength = 0;
    if (cloth) {
      const side = Math.min(.9, Math.max(-.9, positions[p] / 3));
      const left = localReflections[region * 24 + 3] * (1 - side);
      const right = localReflections[region * 24 + 7] * (1 + side);
      const x = 2.4 * (right - left), y = .08 + .4 * (left + right);
      windowDirection = Math.round((x / Math.hypot(x, y) * .5 + .5) * 255);
      windowStrength = Math.round(Math.min(1, (left + right) * 2.5) * 255);
    }
    const key = String.fromCharCode(
      ...bytes.subarray(offset + 12, offset + 20),
      bytes[offset + 30],
      region,
      window,
      Number(dynamic),
      windowDirection,
      windowStrength,
    );
    let index = existing.get(key);
    if (index !== undefined) return index;
    index = records.length;
    existing.set(key, index);
    const hemi = ny * 0.5 + 0.5;
    // Satin paint and varnish reflect a broad patch of the room. Prefilter the
    // six measured lobes with the material normal; polished fittings stay live.
    const broad = rough >= 0.32 && rough < 0.63 && metal <= 0.05;
    const diffuseReflection = [0, 0, 0];
    if (broad) {
      for (const [axis, v] of [nx, ny, nz].entries()) {
        const k = (region * 6 + 2 * axis + Number(v >= 0)) * 4;
        for (let c = 0; c < 3; c++)
          diffuseReflection[c] +=
            (v * v * 0.55 + 0.15) *
            (localReflections[k + c] * 0.86 + localReflections[k + 3] * [0.54, 0.67, 0.81][c]) *
            0.044 *
            (1 - rough);
      }
    }
    for (let c = 0; c < 3; c++) {
      diffuseReflection[c] += bytes[offset + 16 + c] * windowSky[c] * window / (255 * 255);
    }
    records.push([
      nx,
      ny,
      nz,
      region * 4,
      bytes[offset + 16] / 255,
      bytes[offset + 17] / 255,
      bytes[offset + 18] / 255,
      bytes[offset + 19] / 255,
      0.43 + 0.37 * hemi,
      0.35 + 0.48 * hemi,
      0.29 + 0.57 * hemi,
      1 - metal,
      hemi,
      ...diffuseReflection,
      Number(dynamic),
      windowDirection,
      windowStrength,
    ]);
    return index;
  }
  function append(bytes) {
    const offset = vertices.length * 8;
    const positions = new Float32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4);
    for (let i = 0; i < bytes.length; i += 32) vertices.push(register(bytes, positions, i));
    return offset;
  }
  function prepare() {
    inputs = new Float32Array(records.flat());
    lit = new Uint8ClampedArray(Math.max(1, records.length) * 8);
    for (let i = 0; i < records.length; i++) {
      lit[i * 8 + 3] = inputs[i * recordSize + 17];
      lit[i * 8 + 7] = inputs[i * recordSize + 18];
    }
    vertexKeys = Uint32Array.from(vertices);
    vertices.length = 0;
    colors = new Uint32Array(Math.max(1, vertexKeys.length) * 2);
    storage = device.createBuffer({
      label: 'Prepared yacht material lighting',
      size: colors.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    existing.clear();
    records.length = 0;
  }
  function update(light) {
    if (revision === light.revision) return;
    const { x, y, z } = light.direction,
      probe = light.irradiance;
    const t = Math.max(0, Math.min(1, (y - 0.09) / 0.56)),
      blend = t * t * (3 - 2 * t);
    const sun = [1.06 - 0.02 * blend, 0.73 + 0.25 * blend, 0.49 + 0.4 * blend];
    for (let k = 0, o = 0; k < inputs.length; k += recordSize, o += 8) {
      const nl = Math.max(0, inputs[k] * x + inputs[k + 1] * y + inputs[k + 2] * z);
      const r = inputs[k + 3],
        sky = probe[r + 3],
        metalDiffuse = inputs[k + 11];
      // The indoor sky factor is measured by the room bake. Indirect light
      // retains a diffuse floor for the sky and room surfaces outside its rays.
      const open = r === 0 ? 1 : Math.min(1, sky * 2.2);
      const local = 0.29 + 0.38 * inputs[k + 12];
      for (let c = 0; c < 3; c++) {
        const base = inputs[k + 4 + c];
        const skyFill = local + (inputs[k + 8 + c] - local) * open;
        const ambient = (
          base * (skyFill + 2.4 * probe[r + c]) * metalDiffuse + inputs[k + 13 + c]
        ) * inputs[k + 7];
        const direct = base * sun[c] * nl * metalDiffuse;
        if (inputs[k + 16]) {
          lit[o + c] = encode(ambient);
          lit[o + 4 + c] = encode(direct);
        } else {
          const shadow = displayByte(ambient);
          lit[o + c] = shadow;
          lit[o + 4 + c] = displayByte(ambient + direct) - shadow;
        }
      }
    }
    const packed = new Uint32Array(lit.buffer);
    for (let i = 0; i < vertexKeys.length; i++) {
      const src = vertexKeys[i] * 2;
      colors[i * 2] = packed[src];
      colors[i * 2 + 1] = packed[src + 1];
    }
    device.queue.writeBuffer(storage, 0, colors);
    revision = light.revision;
  }
  return {
    append,
    prepare,
    update,
    get storage() {
      return storage;
    },
    dispose() {
      storage?.destroy();
    },
  };
}
