export const viewRadius = 0.35;
const skyVertex = 16; // The low four bits encode the frustum planes.

// Four half-spaces bound a wider view. The extra space at the eye
// allows ordinary walking without rebuilding an index list every frame.
export function widenedView(clip, width = 1.25) {
  const planes = new Float64Array(16);
  for (let side = 0; side < 4; side++) {
    const axis = side >> 1, sign = side % 2 ? -1 : 1, i = side * 4;
    for (let j = 0; j < 4; j++) planes[i+j] = width * clip[j*4+3] + sign * clip[j*4+axis];
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

// Adjacent index ranges overlap across deck sightlines. Record which blocks of
// shared vertices each section can reference, once in the visibility worker.
const indicesPerSection = 3072;
const verticesPerBlock = 32;
export function prepareViewSpans(indices, vertexCount) {
  const words = Math.ceil(vertexCount / (32 * verticesPerBlock));
  const sections = new Uint32Array(Math.ceil(indices.length / indicesPerSection) * words);
  for (let start = 0; start < indices.length; start += indicesPerSection) {
    const end = Math.min(start + indicesPerSection, indices.length);
    const offset = start / indicesPerSection * words;
    for (let i = start; i < end; i++) {
      const block = Math.floor(indices[i] / verticesPerBlock);
      sections[offset + (block >>> 5)] |= 1 << (block & 31);
    }
  }
  const selected = new Uint32Array(words);
  return (first, count) => {
    selected.fill(0);
    const begin = Math.floor(first / indicesPerSection) * words;
    const end = Math.ceil((first + count) / indicesPerSection) * words;
    for (let offset = begin; offset < end; offset += words) {
      for (let w = 0; w < words; w++) selected[w] |= sections[offset + w];
    }
    return selected;
  };
}

export function filterView(vertices, indices, first, count, planes, masks, eye, slots, sky = null, spans = null) {
  const floats = new Float32Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 4);
  const shorts = new Int16Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 2);
  function projectVertices(begin, end) {
    for (let v = begin; v < end; v++) {
      // Sky vertices rotate with the sun and translate with the viewer. Only
      // angular half-spaces apply; the finite walking radius is irrelevant.
      if (shorts[v*16+14] === -2) {
        masks[v] = skyVertex;
        if (!sky) continue;
        const [ez, sx, sy, sz, ex] = sky.basis;
        const u = floats[v*8] / .98289474, h = floats[v*8+1] + 2.01, w = floats[v*8+2] / .97861111;
        const scale = Math.hypot(u, h, w);
        // The vertex shader uses east*u + sun*h + cross(east,sun)*w.
        const x = ex*u + sx*h - ez*sy*w;
        const y = sy*h + (ez*sx-ex*sz)*w;
        const z = ez*u + sz*h + ex*sy*w;
        for (let i = 0; i < 4; i++) {
          const k = 4*i;
          if (planes[k]*x + planes[k+1]*y + planes[k+2]*z < -.025*scale) masks[v] |= 1 << i;
        }
        continue;
      }
      const x = floats[v*8], y = floats[v*8+1], z = floats[v*8+2];
      let mask = 0;
      for (let i = 0; i < 4; i++) {
        const k = i*4;
        if (x*planes[k]+y*planes[k+1]+z*planes[k+2]+planes[k+3] < -0.001) mask |= 1 << i;
      }
      masks[v] = mask;
    }
  }
  if (spans) {
    const selected = spans(first, count);
    for (let block = 0; block * verticesPerBlock < masks.length; block++) {
      if (selected[block >>> 5] & (1 << (block & 31))) {
        const start = block * verticesPerBlock;
        projectVertices(start, Math.min(start + verticesPerBlock, masks.length));
      }
    }
  } else {
    projectVertices(0, masks.length);
  }
  const output = new indices.constructor(count + (indices.BYTES_PER_ELEMENT === 2 ? count % 2 : 0));
  let length = 0;
  for (let i = first; i < first + count; i += 3) {
    const a = indices[i], b = indices[i+1], c = indices[i+2];
    const outside = masks[a] & masks[b] & masks[c];
    if (outside & 15) {
      if (!((masks[a] | masks[b] | masks[c]) & skyVertex)) continue;
      if (outside & skyVertex) {
        // Keep the source indices so that a sun change can restore them immediately.
        const runs = sky.runs;
        if (runs.length && runs[runs.length-1] === length) runs[runs.length-1] += 3;
        else runs.push(length, length+3);
      }
    }
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
    if (slots) slots[length / 3] = (i - first) / 3;
    output[length++] = a;
    output[length++] = b;
    output[length++] = c;
  }
  return {output, length};
}
