import { planarOccluders } from './planar-occluders.mjs';
// Prove that a caster cannot be the first sun-facing surface anywhere within
// an angular cell. Open sheets remain two-sided. The proof never uses the camera.
export const azimuthCells = 16,
  elevationCells = 4;
const sub = (a, b) => a.map((x, k) => x - b[k]);
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const length = (a) => Math.hypot(...a);
const radians = Math.PI / 180;
function direction(az, el) {
  const a = az * radians,
    h = el * radians;
  return [-Math.sin(a) * Math.cos(h), Math.sin(h), Math.cos(a) * Math.cos(h)];
}

// At a fixed elevation the horizontal component follows a circular arc.
// Its endpoints and their tangent intersection enclose the whole arc. Every
// intermediate elevation is a positive combination of its two boundary rays.
function sectorDirections(azimuth, elevation, da, dh) {
  const rays = [];
  for (const h of [elevation - dh / 2, elevation + dh / 2]) {
    rays.push(direction(azimuth - da / 2, h), direction(azimuth + da / 2, h));
    const tangent = direction(azimuth, h);
    const scale = 1 / Math.cos(da * radians / 2);
    rays.push([tangent[0] * scale, tangent[1], tangent[2] * scale]);
  }
  return rays;
}

function shadowVolume(face, rays) {
  const sign = Math.sign(dot(face.n, rays[0]));
  if (!rays.every(ray => sign * dot(face.n, ray) > .003 * face.area)) return null;
  // A 512-square texel spans less than .10 model units on either axis of
  // the fitted shadow camera. Leave room for slope bias and depth rounding.
  const planes = [[...face.n.map(x => -sign * x), sign * dot(face.n, face.v[0]) - .13 * face.area]];
  for (const [i, corner] of face.v.entries()) {
    const edge = sub(face.v[(i + 1) % face.v.length], corner);
    for (const ray of rays) {
      const normal = cross(ray, edge).map(x => sign * x);
      planes.push([...normal, -dot(normal, corner) - .002 * length(edge)]);
    }
  }
  return planes;
}

export function shadowVisibility(positions, indices) {
  const vertices = Array.from({ length: positions.length / 3 }, (_, i) =>
    Array.from(positions.subarray(i * 3, i * 3 + 3)),
  );
  const faces = [],
    edges = new Map(),
    parent = [];
  const root = (i) => {
    while (i !== parent[i]) {
      parent[i] = parent[parent[i]];
      i = parent[i];
    }
    return i;
  };
  for (let i = 0; i < indices.length; i += 3) {
    const id = i / 3,
      ids = Array.from(indices.subarray(i, i + 3)),
      v = ids.map((k) => vertices[k]);
    const n = cross(sub(v[1], v[0]), sub(v[2], v[0]));
    faces.push({ v, n, area: length(n) });
    parent.push(id);
    for (let k = 0; k < 3; k++) {
      const a = ids[k],
        b = ids[(k + 1) % 3],
        key = Math.min(a, b) * vertices.length + Math.max(a, b);
      const edge = edges.get(key) || { owner: id, count: 0, balance: 0 };
      parent[root(id)] = root(edge.owner);
      edge.count++;
      edge.balance += a < b ? 1 : -1;
      edges.set(key, edge);
    }
  }
  const open = new Set(),
    volume = new Float64Array(faces.length);
  for (const e of edges.values()) if (e.count !== 2 || e.balance !== 0) open.add(root(e.owner));
  faces.forEach((f, i) => {
    volume[root(i)] += dot(f.v[0], f.n);
  });
  const components = new Map();
  faces.forEach((f, i) => {
    const id = root(i);
    if (open.has(id)) return;
    const vertices = components.get(id) ?? new Set();
    f.v.forEach((v) => vertices.add(v));
    components.set(id, vertices);
  });
  // An edge-closed export can still fold through itself. Only a convex solid
  // guarantees a nearer front face along every incoming ray.
  faces.forEach((f, i) => {
    const id = root(i);
    if (open.has(id)) return;
    const sign = Math.sign(volume[id]),
      offset = dot(f.n, f.v[0]);
    const vertices = components.get(id);
    if (
      !sign ||
      vertices.size > 768 ||
      [...vertices].some((v) => sign * (dot(f.n, v) - offset) > 1e-7 * f.area)
    )
      open.add(id);
  });
  faces.forEach((f, i) => {
    f.outward = open.has(root(i)) ? 0 : Math.sign(volume[root(i)]);
  });
  const ranked = faces
    .filter((f) => f.area > 0.3)
    .sort((a, b) => b.area - a.area);
  const large = ranked.filter(f => f.area > 1.2).slice(0, 196);
  const candidates = ranked.slice(0, 800);
  for (const { axis, j, k, lo, hi, normal } of planarOccluders(faces)) {
    const corners = [
      [lo[j], lo[k]],
      [hi[j], lo[k]],
      [hi[j], hi[k]],
      [lo[j], hi[k]],
    ];
    const v = corners.map(([x, y]) => {
      const p = lo.slice();
      p[j] = x;
      p[k] = y;
      return p;
    });
    if (normal < 0) v.reverse();
    const n = [0, 0, 0];
    n[axis] = normal;
    const rectangle = { v, n, area: 1 };
    large.unshift(rectangle);
    candidates.unshift(rectangle);
  }
  const banks = Math.ceil((azimuthCells * elevationCells) / 32),
    mask = new Uint32Array(faces.length * banks);
  for (let j = 0; j < elevationCells; j++)
    for (let i = 0; i < azimuthCells; i++) {
      const da = 360 / azimuthCells,
        dh = 85 / elevationCells,
        az = (i + 0.5) * da,
        el = 5 + (j + 0.5) * dh;
      const sun = direction(az, el);
      const chord =
        Math.max(
          ...[-1, 1].flatMap((sa) =>
            [-1, 1].map((sh) => length(sub(direction(az + (sa * da) / 2, el + (sh * dh) / 2), sun))),
          ),
        ) + 1e-6;
      const rays = sectorDirections(az, el, da, dh);
      const volumes = candidates.map(face => shadowVolume(face, rays)).filter(Boolean);
      const blockers = [];
      for (const f of large) {
        const nd = dot(f.n, sun);
        if (Math.abs(nd) <= chord * f.area) continue;
        const sign = Math.sign(nd);
        const planes = f.v.map((v, k) => {
          const edge = sub(f.v[(k + 1) % f.v.length], v),
            normal = cross(sun, edge).map((x) => sign * x);
          // The distance to the edge, times its length, bounds the worst
          // change in this side-plane test as the sun moves within the cell.
          return { v, normal, edgeLength: length(edge) };
        });
        blockers.push({ v: f.v[0], n: f.n, sign, planes });
      }
      const cell = j * azimuthCells + i,
        word = cell >>> 5,
        bit = 1 << (cell & 31);
      for (let k = 0; k < faces.length; k++) {
        const f = faces[k];
        if (f.outward && f.outward * dot(f.n, sun) < -chord * f.area) continue;
        const hidden = blockers.some((b) => {
          if (!f.v.every((v) => b.sign * (dot(b.n, v) - dot(b.n, b.v)) < -0.0005)) return false;
          return b.planes.every((p) =>
            f.v.every((v) => {
              const dx = v[0] - p.v[0],
                dy = v[1] - p.v[1],
                dz = v[2] - p.v[2];
              const distance = p.normal[0] * dx + p.normal[1] * dy + p.normal[2] * dz;
              return (
                distance > 0.0001 &&
                distance * distance >
                  chord * chord * p.edgeLength * p.edgeLength * (dx * dx + dy * dy + dz * dz)
              );
            }),
          );
        });
        if (hidden) continue;
        // All three receiver vertices must be strictly inside every plane
        // of the same opaque blocker throughout the angular cell.
        const inside = volumes.some(planes => planes.every(p => f.v.every(v => dot(p, v) + p[3] > 0)));
        if (!inside) mask[k * banks + word] |= bit;
      }
    }
  return mask;
}
