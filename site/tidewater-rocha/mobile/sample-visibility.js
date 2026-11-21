// A shared provoking vertex or a collision in its low 16 bits keeps all
// corresponding triangles, in the order used for the original depth test.
export const coverageWords = 65536 / 32;

export function filterSamples(winners, vertices, indices, first, count) {
  const layers = new Int16Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 2);
  const padding = indices.BYTES_PER_ELEMENT === 2 ? count % 2 : 0;
  const output = new indices.constructor(count + padding);
  let length = 0, skyStart = 0;
  for (let i = first; i < first + count; i += 3) {
    const a = indices[i], tag = a & 0xffff;
    const sky = layers[a * 16 + 14] === -2;
    if (!sky && !(winners[tag >>> 5] & (1 << (tag & 31)))) continue;
    output[length++] = a;
    output[length++] = indices[i + 1];
    output[length++] = indices[i + 2];
    // The sky rotates when the sun moves at this camera pose.
    if (!sky) skyStart = length;
  }
  return {output, length, skyStart};
}
