// Four half-spaces bound a wider view. The extra half metre at the eye
// allows ordinary walking without rebuilding an index list every frame.
export function widenedView(clip) {
  const planes = new Float64Array(16);
  for (let side = 0; side < 4; side++) {
    const axis = side >> 1, sign = side % 2 ? -1 : 1, i = side * 4;
    for (let j = 0; j < 4; j++) planes[i+j] = 1.25 * clip[j*4+3] + sign * clip[j*4+axis];
    const norm = Math.hypot(planes[i], planes[i+1], planes[i+2]);
    for (let j = 0; j < 4; j++) planes[i+j] /= norm;
    planes[i+3] += 0.5;
  }
  return planes;
}

// A perspective frustum stays inside a half-space when its apex is inside
// and the least inward of its four corner rays points into the half-space.
export function coversView(planes, camera, p) {
  for (let i = 0; i < 16; i += 4) {
    const x = planes[i], y = planes[i+1], z = planes[i+2];
    const atEye = x*camera[12] + y*camera[13] + z*camera[14] + planes[i+3];
    const right = (x*camera[0] + y*camera[1] + z*camera[2]) / p[0];
    const up = (x*camera[4] + y*camera[5] + z*camera[6]) / p[5];
    const forward = -(x*camera[8] + y*camera[9] + z*camera[10]);
    if (!(atEye > 0.0001 && forward + right*p[8] + up*p[9] - Math.abs(right) - Math.abs(up) > 0.00001))
      return false;
  }
  return true;
}

export function filterView(vertices, indices, first, count, planes, masks) {
  const floats = new Float32Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 4);
  const shorts = new Int16Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 2);
  for (let v = 0; v < masks.length; v++) {
    // The shader moves the sky dome with the eye and the sun.
    if (shorts[v*16+14] === -2) { masks[v] = 0; continue; }
    const x = floats[v*8], y = floats[v*8+1], z = floats[v*8+2];
    let mask = 0;
    for (let i = 0; i < 4; i++) {
      const k = i*4;
      if (x*planes[k]+y*planes[k+1]+z*planes[k+2]+planes[k+3] < -0.001) mask |= 1 << i;
    }
    masks[v] = mask;
  }
  const output = new indices.constructor(count + (indices.BYTES_PER_ELEMENT === 2 ? count % 2 : 0));
  let length = 0;
  for (let i = first; i < first + count; i += 3) {
    const a = indices[i], b = indices[i+1], c = indices[i+2];
    if (masks[a] & masks[b] & masks[c]) continue;
    output[length++] = a;
    output[length++] = b;
    output[length++] = c;
  }
  return {output, length};
}
