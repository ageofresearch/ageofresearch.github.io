import { planarOccluders } from './planar-occluders.mjs';

// Source coordinates and edge keys stay exact. A narrow opening between
// separate pieces of a bulkhead must survive the planar union.
export function roomPanels(vertices, indices) {
  const positions = new Float32Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 4);
  const layers = new Int16Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 2);
  const points = Array.from({ length: vertices.byteLength / 32 }, (_, i) =>
    Array.from(positions.subarray(8 * i, 8 * i + 3)));
  const faces = [];
  for (let i = 0; i < indices.length; i += 3) {
    const ids = [indices[i], indices[i + 1], indices[i + 2]];
    if (ids.some(id => layers[id * 16 + 14] === -2)) continue;
    const v = ids.map(id => points[id]);
    const u = v[1].map((x, k) => x - v[0][k]);
    const w = v[2].map((x, k) => x - v[0][k]);
    faces.push({ v, n: [u[1]*w[2] - u[2]*w[1], u[2]*w[0] - u[0]*w[2], u[0]*w[1] - u[1]*w[0]] });
  }
  return Float64Array.from(planarOccluders(faces, true).flatMap(({ axis, j, k, normal, lo, hi }) =>
    [axis, normal, lo[axis], lo[j], hi[j], lo[k], hi[k]]));
}
