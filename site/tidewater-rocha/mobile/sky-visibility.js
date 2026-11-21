// The sky rotates when the sun moves. Keep its original indexed triangles and
// clip them against the current camera, independently of stationary hull coverage.
export function prepareSkyVisibility(vertices) {
  const layers = new Int16Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 2);
  const positions = new Float32Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 4);
  const ids = [], directions = [], outside = new Uint8Array(vertices.length / 32);
  for (let i = 0; i < outside.length; i++) {
    if (layers[i * 16 + 14] !== -2) continue;
    const x = positions[i * 8] / .98289474, y = positions[i * 8 + 1] + 2.01, z = positions[i * 8 + 2] / .97861111;
    const length = Math.hypot(x, y, z);
    directions.push(x / length, y / length, z / length);
    ids.push(i);
  }
  return function filterSky(indices, start, end, frame, width, height, output) {
    const sx = frame[20], sy = frame[21], sz = frame[22];
    const norm = Math.hypot(frame[23], frame[19]), ex = frame[23] / norm, ez = frame[19] / norm;
    for (let i = 0; i < ids.length; i++) {
      const u = directions[3*i], h = directions[3*i+1], v = directions[3*i+2];
      const x = frame[16] + 120 * (ex*u + sx*h - ez*sy*v);
      const y = frame[17] + 120 * (sy*h + (ez*sx-ex*sz)*v);
      const z = frame[18] + 120 * (ez*u + sz*h + ex*sy*v);
      const X = frame[0]*x + frame[4]*y + frame[8]*z + frame[12];
      const Y = frame[1]*x + frame[5]*y + frame[9]*z + frame[13];
      const W = frame[3]*x + frame[7]*y + frame[11]*z + frame[15];
      // Homogeneous side planes also handle faces that cross the eye plane.
      // Leave two pixels plus a clip-space margin for float32 and MSAA.
      const px = Math.abs(W)*4/width + .02, py = Math.abs(W)*4/height + .02;
      outside[ids[i]] = (X < -W-px ? 1 : 0) | (X > W+px ? 2 : 0) |
        (Y < -W-py ? 4 : 0) | (Y > W+py ? 8 : 0);
    }
    let length = 0;
    for (let i = start; i < end; i += 3) {
      const a = indices[i], b = indices[i+1], c = indices[i+2];
      if (outside[a] & outside[b] & outside[c]) continue;
      output[length++] = a;
      output[length++] = b;
      output[length++] = c;
    }
    return length;
  };
}
