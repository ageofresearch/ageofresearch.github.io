export const viewRadius = 0.35;

// Four half-spaces bound a wider view. The extra space at the eye
// allows ordinary walking without rebuilding an index list every frame.
export function widenedView(clip) {
  const planes = new Float64Array(16);
  for (let side = 0; side < 4; side++) {
    const axis = side >> 1, sign = side % 2 ? -1 : 1, i = side * 4;
    for (let j = 0; j < 4; j++) planes[i+j] = 1.25 * clip[j*4+3] + sign * clip[j*4+axis];
    const norm = Math.hypot(planes[i], planes[i+1], planes[i+2]);
    for (let j = 0; j < 4; j++) planes[i+j] /= norm;
    planes[i+3] += viewRadius;
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

export function filterView(vertices, indices, first, count, planes, masks, eye) {
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
    if (eye && shorts[a*16+14] !== -2 && shorts[b*16+14] !== -2 && shorts[c*16+14] !== -2) {
      // The GPU back-face test has the same sign everywhere in the eye sphere
      // when its signed distance to the face plane exceeds the sphere radius.
      const x=floats[a*8], y=floats[a*8+1], z=floats[a*8+2];
      const ux=floats[b*8]-x, uy=floats[b*8+1]-y, uz=floats[b*8+2]-z;
      const vx=floats[c*8]-x, vy=floats[c*8+1]-y, vz=floats[c*8+2]-z;
      const nx=uy*vz-uz*vy, ny=uz*vx-ux*vz, nz=ux*vy-uy*vx;
      const facing=nx*(eye[0]-x)+ny*(eye[1]-y)+nz*(eye[2]-z);
      const area2=nx*nx+ny*ny+nz*nz;
      const edges=Math.max(ux*ux+uy*uy+uz*uz,vx*vx+vy*vy+vz*vz,(ux-vx)**2+(uy-vy)**2+(uz-vz)**2);
      const far2=(x-eye[0])**2+(y-eye[1])**2+(z-eye[2])**2+edges+1;
      // Subpixel slivers can acquire the opposite winding during rasterizer
      // snapping. Leave small and grazing faces to the hardware.
      if (facing<0 && facing*facing>(viewRadius+.02)**2*area2 &&
          facing*facing>.10*far2*area2 && area2>edges*far2*.000025) continue;
    }
    output[length++] = a;
    output[length++] = b;
    output[length++] = c;
  }
  return {output, length};
}
