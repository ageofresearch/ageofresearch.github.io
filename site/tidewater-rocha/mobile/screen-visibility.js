import {measureRasterPrecision} from './raster-precision.js?v=1';

const maxPixels = 1_000_000, maxDimension = 1800;
const maxTiles = Math.ceil(maxPixels / 64) + 2 * Math.ceil(maxDimension / 8) + 1;

export async function loadScreenVisibility(device, signal) {
  try {
    const timeout = AbortSignal.timeout(10000);
    const response = await fetch(new URL('./screen-visibility.wasm?v=2', import.meta.url),
      {signal: signal ? AbortSignal.any([signal, timeout]) : timeout});
    if (!response.ok) return null;
    const [module, precision] = await Promise.allSettled([
      response.arrayBuffer().then(bytes => WebAssembly.compile(bytes)), measureRasterPrecision(device),
    ]);
    if (module.status !== 'fulfilled' || precision.status !== 'fulfilled' || !precision.value) return null;
    return {module:module.value, precision:precision.value};
  } catch {
    return null;
  }
}

export function usableScreen(width, height, samples, projection) {
  // The occlusion proof uses inverse view depth and the renderer's reversed-Z
  // perspective projection. Keep unusual lenses and clip planes on the original path.
  const near = projection[14] / (1 + projection[10]);
  const farInverse = projection[10] / projection[14];
  return samples === 4 && width >= 300 && height >= 300 && width <= maxDimension &&
    height <= maxDimension && width * height <= maxPixels &&
    projection[2] === 0 && projection[6] === 0 && projection[3] === 0 && projection[7] === 0 &&
    projection[11] === -1 && projection[15] === 0 && near >= .01 && near <= .06 &&
    farInverse >= 0 && farInverse < 1/81;
}

export function prepareScreenVisibility(config, vertices, maxBytes) {
  const vertexCount = vertices.byteLength / 32;
  if (!config || vertexCount > 65536) return null;
  try {
    const wasm = new WebAssembly.Instance(config.module).exports;
    // All heap storage is allocated before the walking route opens. The module
    // has no allocator or imports; its static data lives in the first page.
    let cursor = 65536;
    function reserve(bytes) {
      const address = cursor;
      cursor += Math.ceil(bytes / 16) * 16;
      return address;
    }
    const source = reserve(vertexCount * 16), unique = reserve(vertexCount * 2), seen = reserve(vertexCount);
    const indices = reserve(maxBytes), result = reserve(maxBytes + 4), clip = reserve(64);
    const projected = reserve(vertexCount * 16), grid = reserve(vertexCount * 16), tiles = reserve(maxTiles * 12);
    const memory = wasm.memory;
    const extra = cursor - memory.buffer.byteLength;
    if (extra > 0) memory.grow(Math.ceil(extra / 65536));
    const packed = new Uint32Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 4);
    const layers = new Int16Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 2);
    const positions = new Uint32Array(memory.buffer, source, vertexCount * 4);
    for (let i = 0; i < vertexCount; i++) {
      positions[4*i] = packed[8*i]; positions[4*i+1] = packed[8*i+1]; positions[4*i+2] = packed[8*i+2];
      const layer = layers[16*i+14];
      positions[4*i+3] = Number(layer === -2 || layer === -4);
    }
    const input = new Uint16Array(memory.buffer, indices, maxBytes / 2);
    const output = new Uint16Array(memory.buffer, result, maxBytes / 2 + 2);
    const matrix = new Float32Array(memory.buffer, clip, 16);
    let used = 0, lastWidth = 0, lastHeight = 0, lastDepthTest;
    return {
      output,
      filter(list, count, frame, width, height, rebuild, depthTest=true) {
        if (!rebuild && width === lastWidth && height === lastHeight && depthTest === lastDepthTest) {
          let same = true;
          for (let i = 0; i < 16 && same; i++) same = matrix[i] === frame[i];
          if (same) return null;
        }
        lastWidth = width; lastHeight = height; lastDepthTest = depthTest;
        for (let i = 0; i < 16; i++) matrix[i] = frame[i];
        if (rebuild) {
          input.set(list.subarray(0, count));
          used = wasm.collectVertices(indices, count, unique, seen, vertexCount);
        }
        return wasm.filter(source, unique, used, indices, count, clip, projected, grid, tiles,
          result, width, height, config.precision, depthTest);
      },
    };
  } catch {
    return null;
  }
}
