// The package retains its source geometry for navigation and recovery. Reuse
// its positions and index ranges when a rapid turn leaves the worker's frustum.
export function prepareImmediateView(positions, indices, sharedIds, packed) {
  const vertexCount = positions.length / 3;
  const masks = new Uint8Array(vertexCount);
  const layers = new Int16Array(packed.buffer, packed.byteOffset, packed.byteLength / 2);
  const sky = [];
  for (let vertex = 0; vertex < vertexCount; vertex++) {
    if (layers[16 * vertex + 14] === -2) sky.push(vertex);
  }

  return function filter(first, count, clip, width, height, bits, offset, prefixCount, output) {
    // Work in homogeneous coordinates, including triangles that cross the
    // eye plane. Two pixels and a clip-space margin protect viewport edges.
    const padX = 4 / width, padY = 4 / height;
    for (let vertex = 0, i = 0; vertex < vertexCount; vertex++, i += 3) {
      const x = positions[i], y = positions[i + 1], z = positions[i + 2];
      const w = clip[3] * x + clip[7] * y + clip[11] * z + clip[15];
      const sx = clip[0] * x + clip[4] * y + clip[8] * z + clip[12];
      const sy = clip[1] * x + clip[5] * y + clip[9] * z + clip[13];
      const marginX = Math.abs(w) * padX + .02, marginY = Math.abs(w) * padY + .02;
      masks[vertex] = (sx < -w - marginX ? 1 : 0) | (sx > w + marginX ? 2 : 0) |
        (sy < -w - marginY ? 4 : 0) | (sy > w + marginY ? 8 : 0);
    }
    // The shader moves these vertices with the sun and the visitor.
    for (const vertex of sky) masks[vertex] = 0;

    let length = 0;
    for (let i = 0; i < count; i += 3) {
      const face = i / 3;
      if (offset >= 0 && i < prefixCount && (bits[offset + (face >>> 3)] & (1 << (face & 7)))) continue;
      const a = indices[first + i], b = indices[first + i + 1], c = indices[first + i + 2];
      if (masks[a] & masks[b] & masks[c]) continue;
      output[length++] = sharedIds[a];
      output[length++] = sharedIds[b];
      output[length++] = sharedIds[c];
    }
    return length;
  };
}
