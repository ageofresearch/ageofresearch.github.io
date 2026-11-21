// Reject a face only when one opaque triangle hides it from an entire ball of
// eye positions. Bins accelerate the search; they never establish occlusion.
const divisions = 32,
  extent = 1.5;
const bin = (slope) =>
  Math.max(0, Math.min(divisions - 1, Math.floor(((slope + extent) * divisions) / (2 * extent))));
const stride = 26;

export function hideOccluded(vertices, faces, count, camera, radius, nearReach, pixelAngle) {
  const floats = new Float32Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 4);
  const layers = new Int16Array(vertices.buffer, vertices.byteOffset, vertices.byteLength / 2);
  const projected = new Float64Array((vertices.length / 32) * 4);
  const blocks = new Float64Array((count / 3) * stride);
  const bins = Array.from({ length: divisions * divisions }, () => []);
  let used = 0;
  const eyeX = camera[12],
    eyeY = camera[13],
    eyeZ = camera[14];
  for (let i = 0; i < count; i++) {
    const id = faces[i],
      p = id * 4;
    if (projected[p + 3]) continue;
    const x = floats[id * 8] - eyeX,
      y = floats[id * 8 + 1] - eyeY,
      z = floats[id * 8 + 2] - eyeZ;
    projected[p] = x * camera[0] + y * camera[1] + z * camera[2];
    projected[p + 1] = x * camera[4] + y * camera[5] + z * camera[6];
    projected[p + 2] = -(x * camera[8] + y * camera[9] + z * camera[10]);
    projected[p + 3] = Math.hypot(x, y, z) + radius;
  }
  for (let i = 0; i < count; i += 3) {
    const a = faces[i] * 4,
      b = faces[i + 1] * 4,
      c = faces[i + 2] * 4;
    if (layers[faces[i] * 16 + 14] === -2) continue; // The sky moves with the light and eye.
    const x = projected[a],
      y = projected[a + 1],
      z = projected[a + 2];
    const u = projected[b] - x,
      v = projected[b + 1] - y,
      w = projected[b + 2] - z;
    const s = projected[c] - x,
      t = projected[c + 1] - y,
      h = projected[c + 2] - z;
    const nx = v * h - w * t,
      ny = w * s - u * h,
      nz = u * t - v * s,
      norm = Math.hypot(nx, ny, nz);
    const level = nx * x + ny * y + nz * z;
    // A front-facing blocker outside the entire near-clip sphere for every
    // eligible camera. Skip tiny blockers; they cannot certify wide coverage.
    if (norm < 0.001 || level <= (nearReach + radius + 0.003) * norm) continue;
    const bz = projected[b + 2],
      cz = projected[c + 2];
    if (Math.max(z, bz, cz) <= 0) continue;
    let x0 = 0,
      x1 = divisions - 1,
      y0 = 0,
      y1 = divisions - 1;
    if (Math.min(z, bz, cz) > 0) {
      const ax = x / z,
        bx = projected[b] / bz,
        cx = projected[c] / cz;
      const ay = y / z,
        by = projected[b + 1] / bz,
        cy = projected[c + 1] / cz;
      if (
        Math.min(ax, bx, cx) > extent ||
        Math.max(ax, bx, cx) < -extent ||
        Math.min(ay, by, cy) > extent ||
        Math.max(ay, by, cy) < -extent
      )
        continue;
      x0 = bin(Math.min(ax, bx, cx));
      x1 = bin(Math.max(ax, bx, cx));
      y0 = bin(Math.min(ay, by, cy));
      y1 = bin(Math.max(ay, by, cy));
    }
    const k = used * stride;
    blocks[k] = nx;
    blocks[k + 1] = ny;
    blocks[k + 2] = nz;
    blocks[k + 3] = level;
    blocks[k + 4] = norm;
    for (let side = 0; side < 3; side++) {
      const p = faces[i + side] * 4,
        q = faces[i + ((side + 1) % 3)] * 4,
        j = k + 5 + side * 7;
      const x = projected[p],
        y = projected[p + 1],
        z = projected[p + 2];
      const dx = projected[q] - x,
        dy = projected[q + 1] - y,
        dz = projected[q + 2] - z;
      const ex = y * dz - z * dy,
        ey = z * dx - x * dz,
        ez = x * dy - y * dx;
      blocks[j] = dx;
      blocks[j + 1] = dy;
      blocks[j + 2] = dz;
      blocks[j + 3] = ex;
      blocks[j + 4] = ey;
      blocks[j + 5] = ez;
      blocks[j + 6] = Math.hypot(ex, ey, ez) + radius * Math.hypot(dx, dy, dz);
    }
    for (let row = y0; row <= y1; row++)
      for (let col = x0; col <= x1; col++) bins[row * divisions + col].push(k);
    used++;
  }
  function covers(k, i) {
    const nx = blocks[k],
      ny = blocks[k + 1],
      nz = blocks[k + 2];
    for (let v = 0; v < 3; v++) {
      const p = faces[i + v] * 4,
        x = projected[p],
        y = projected[p + 1],
        z = projected[p + 2];
      // Allow for edge snapping and for depth extrapolation on clipped, grazing faces.
      const pad = projected[p + 3] * pixelAngle * 4 + 0.02;
      if (nx * x + ny * y + nz * z <= blocks[k + 3] + (pad + 0.035) * blocks[k + 4]) return false;
      for (let j = k + 5; j < k + stride; j += 7) {
        const ex = blocks[j + 3],
          ey = blocks[j + 4],
          ez = blocks[j + 5];
        const inward = ex * x + ey * y + ez * z - pad * blocks[j + 6];
        if (inward <= 0) return false;
        // det(P-E,Q-E,T-E) is affine in E. Its variation over the eye ball
        // is bounded by radius times |(Q-P) × (T-P)|.
        const dx = blocks[j],
          dy = blocks[j + 1],
          dz = blocks[j + 2];
        const a = ex + dy * z - dz * y,
          b = ey + dz * x - dx * z,
          c = ez + dx * y - dy * x;
        if (inward * inward <= radius * radius * (a * a + b * b + c * c)) return false;
      }
    }
    return true;
  }
  let length = 0;
  for (let i = 0; i < count; i += 3) {
    const a = faces[i] * 4,
      b = faces[i + 1] * 4,
      c = faces[i + 2] * 4;
    if (
      layers[faces[i] * 16 + 14] !== -2 &&
      Math.min(projected[a + 2], projected[b + 2], projected[c + 2]) > 0
    ) {
      const depth = projected[a + 2] + projected[b + 2] + projected[c + 2];
      const x = (projected[a] + projected[b] + projected[c]) / depth;
      const y = (projected[a + 1] + projected[b + 1] + projected[c + 1]) / depth;
      if (Math.abs(x) < extent && Math.abs(y) < extent) {
        let hidden = false;
        for (const k of bins[bin(y) * divisions + bin(x)])
          if (covers(k, i)) {
            hidden = true;
            break;
          }
        if (hidden) continue;
      }
    }
    faces[length++] = faces[i];
    faces[length++] = faces[i + 1];
    faces[length++] = faces[i + 2];
  }
  return length;
}
