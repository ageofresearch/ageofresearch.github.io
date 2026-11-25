// Two visibility queries per light path: probe → diffuse surface → sun.
// The BVH and material samples are offline only. Glazing is absent from the BVH.
const add = (p, d, t) => p.map((v, i) => v + d[i] * t);
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const sub = (a, b) => a.map((v, i) => v - b[i]);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export function buildTree(faces) {
  const lo = [Infinity, Infinity, Infinity],
    hi = lo.map((v) => -v);
  for (const f of faces)
    for (let i = 0; i < 3; i++) {
      lo[i] = Math.min(lo[i], f.lo[i]);
      hi[i] = Math.max(hi[i], f.hi[i]);
    }
  if (faces.length <= 12) return { lo, hi, faces };
  const widths = sub(hi, lo),
    axis = widths.indexOf(Math.max(...widths));
  faces.sort((a, b) => a.center[axis] - b.center[axis]);
  const mid = faces.length >> 1;
  return { lo, hi, left: buildTree(faces.slice(0, mid)), right: buildTree(faces.slice(mid)) };
}
export function ray(tree, origin, dir, limit = Infinity) {
  let distance = limit,
    face = null;
  function visit(n) {
    let near = 0.002,
      far = distance;
    for (let k = 0; k < 3; k++) {
      if (Math.abs(dir[k]) < 1e-8) {
        if (origin[k] < n.lo[k] || origin[k] > n.hi[k]) return;
        continue;
      }
      const a = (n.lo[k] - origin[k]) / dir[k],
        b = (n.hi[k] - origin[k]) / dir[k];
      near = Math.max(near, Math.min(a, b));
      far = Math.min(far, Math.max(a, b));
      if (far < near) return;
    }
    if (!n.faces) {
      visit(n.left);
      visit(n.right);
      return;
    }
    for (const f of n.faces) {
      const p = cross(dir, f.v),
        det = dot(f.u, p);
      if (Math.abs(det) < 1e-9) continue;
      const t = sub(origin, f.a),
        u = dot(t, p) / det;
      if (u < 0 || u > 1) continue;
      const q = cross(t, f.u),
        v = dot(dir, q) / det;
      if (v < 0 || v + u > 1) continue;
      const d = dot(f.v, q) / det;
      if (d > 0.002 && d < distance) {
        distance = d;
        face = f;
      }
    }
  }
  visit(tree);
  return face && { face, point: add(origin, dir, distance) };
}
export function traceFloorContact(triangles, bounds, height, size) {
  const faces = [];
  for (const [a, b, c] of triangles) {
    const u = sub(b, a), v = sub(c, a);
    if (Math.hypot(...cross(u, v)) < 1e-8) continue;
    faces.push({
      a, u, v,
      lo: a.map((value, axis) => Math.min(value, b[axis], c[axis])),
      hi: a.map((value, axis) => Math.max(value, b[axis], c[axis])),
      center: a.map((value, axis) => (value + b[axis] + c[axis]) / 3),
    });
  }
  if (!faces.length) throw Error('Missing suite contact casters');
  const tree = buildTree(faces), samples = 48, reach = .66;
  // A fixed cosine-weighted hemisphere gives stable footprints across texels.
  const directions = Array.from({ length: samples }, (_, i) => {
    const radius = Math.sqrt((i + .5) / samples), theta = i * 2.39996322972865;
    return [radius * Math.cos(theta), radius * Math.sin(theta), Math.sqrt(1 - radius * radius)];
  });
  const [x0, y0, x1, y1] = bounds, texels = new Uint8Array(size * size);
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const x = x0 + (col + .5) / size * (x1 - x0);
      const y = y0 + (row + .5) / size * (y1 - y0);
      const origin = [x, y, height];
      let occlusion = 0;
      for (const direction of directions) {
        const hit = ray(tree, origin, direction, reach);
        if (hit) {
          const distance = Math.hypot(hit.point[0] - x, hit.point[1] - y, hit.point[2] - height);
          const weight = 1 - distance / reach;
          occlusion += weight * weight;
        }
      }
      // Fade to unity at the perimeter, including the doorway to the head.
      const edge = Math.min(1, Math.min(x - x0, x1 - x, y - y0, y1 - y) / .10);
      const visibility = 1 - Math.min(.74, 1.22 * occlusion / samples) * edge;
      texels[row * size + col] = Math.round(255 * visibility);
    }
  }
  return texels;
}
const linear = (c) => {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
export function traceBounce(data, verts, ids, colors) {
  const faces = [];
  for (let i = 0; i < ids.length; i += 3) {
    const [a, b, c] = ids.slice(i, i + 3).map((id) => verts.slice(id * 3, id * 3 + 3));
    const u = sub(b, a),
      v = sub(c, a),
      n = cross(u, v),
      len = Math.hypot(...n);
    if (len < 1e-7) continue;
    const rgb = colors[i / 3];
    faces.push({
      a,
      u,
      v,
      n: n.map((x) => x / len),
      color: [rgb >> 16, (rgb >> 8) & 255, rgb & 255].map(linear),
      lo: a.map((x, k) => Math.min(x, b[k], c[k])),
      hi: a.map((x, k) => Math.max(x, b[k], c[k])),
      center: a.map((x, k) => (x + b[k] + c[k]) / 3),
    });
  }
  const tree = buildTree(faces),
    samples = 160;
  return data.rooms.map((room) => {
    const [x, y, X, Y] = room.bbox,
      z = data.levels[room.deck],
      ceiling = { LD: 3.83, MD: 5.88, UD: 8.08, SD: 11.4 }[room.deck];
    const lobes = Array.from({ length: 6 }, () => [0, 0, 0, 0, 0]);
    const table = Array.from({ length: 24 }, () => [0, 0, 0]);
    let sky = 0;
    const suns = table.map((_, i) => {
      const h = ([5, 45, 85][i >> 3] * Math.PI) / 180,
        a = ((i % 8) * Math.PI) / 4;
      return [Math.cos(a) * Math.cos(h), -Math.sin(a) * Math.cos(h), Math.sin(h)];
    });
    for (const wall of [0.27, 0.73]) {
      const origin = [x + (X - x) * wall, y + (Y - y) * 0.5, z + 1.28];
      for (let i = 0; i < samples; i++) {
        const h = ((i + 0.5) * 2) / samples - 1,
          len = Math.sqrt(1 - h * h),
          theta = i * 2.39996323;
        const dir = [len * Math.cos(theta), len * Math.sin(theta), h],
          hit = ray(tree, origin, dir);
        // Cosine-weighted broad reflections of the local fittings and sky.
        // Store axes in renderer order (beam, elevation, length).
        [dir[1], dir[2], dir[0]].forEach((axis, k) => {
          const l = lobes[k * 2 + Number(axis >= 0)],
            w = axis * axis;
          l[4] += w;
          if (hit) for (let c = 0; c < 3; c++) l[c] += w * hit.face.color[c];
          else l[3] += w;
        });
        if (!hit) {
          if (h > 0) sky += 2;
          continue;
        }
        const n = dot(hit.face.n, dir) > 0 ? hit.face.n.map((v) => -v) : hit.face.n;
        const point = add(hit.point, n, 0.008);
        suns.forEach((sun, j) => {
          const cosine = dot(n, sun);
          if (cosine <= 0 || ray(tree, point, sun)) return;
          for (let c = 0; c < 3; c++) table[j][c] += hit.face.color[c] * cosine;
        });
      }
    }
    return {
      id: room.id,
      box: [x, y, z - 0.035, X, Y, ceiling],
      sky: +(sky / (2 * samples)).toFixed(3),
      reflection: lobes.flatMap((l) => l.slice(0, 4).map((v) => Math.round((v / l[4]) * 255))),
      rgb: table.flat().map((v) => Math.round((v * 255) / (2 * samples))),
    };
  });
}
