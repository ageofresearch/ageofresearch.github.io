// Find solid rectangles inside tessellated decks and bulkheads. A cell must
// contain a covered point and have no boundary crossing. Shared edges cancel
// only when their coordinates agree and the two faces have opposite edge order.
const planes = [
    [1, 2],
    [2, 0],
    [0, 1],
  ],
  pitch = 0.2;
function largest(cells, w, h) {
  const heights = new Int32Array(w + 1);
  let best = null,
    area = 0;
  for (let y = 0; y < h; y++) {
    const stack = [];
    for (let x = 0; x <= w; x++) {
      heights[x] = x < w && cells[y * w + x] ? heights[x] + 1 : 0;
      while (stack.length && heights[stack.at(-1)] > heights[x]) {
        const height = heights[stack.pop()],
          left = (stack.at(-1) ?? -1) + 1,
          size = (x - left) * height;
        if (size > area) {
          area = size;
          best = [left, y + 1 - height, x, y + 1];
        }
      }
      stack.push(x);
    }
  }
  return area * pitch * pitch >= 0.6 ? best : null;
}
export function planarOccluders(faces) {
  const groups = new Map(),
    result = [];
  for (const f of faces) {
    if (f.background) continue;
    for (let axis = 0; axis < 3; axis++) {
      const level = f.v[0][axis];
      if (!f.v.every((v) => Math.abs(v[axis] - level) < 1e-6)) continue;
      const [j, k] = planes[axis],
        normal = Math.sign(f.n[axis]);
      if (Math.abs(f.n[axis]) < 1e-7) continue;
      const key = [axis, normal, Math.round(level * 1e5)].join(',');
      const group = groups.get(key) ?? { level, axis, j, k, normal, tri: [], area: 0 };
      group.tri.push(f.v.map((v) => [v[j], v[k]]));
      group.area += Math.abs(f.n[axis]) * 0.5;
      groups.set(key, group);
    }
  }
  for (const { tri, area, axis, j, k, normal, level } of groups.values()) {
    if (area < 1.4) continue;
    const edges = new Map();
    let x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;
    const key = (p) => Math.round(p[0] * 1e5) + ',' + Math.round(p[1] * 1e5);
    for (const v of tri)
      for (let i = 0; i < 3; i++) {
        const a = v[i],
          b = v[(i + 1) % 3],
          u = key(a),
          t = key(b),
          sign = u < t ? 1 : -1,
          id = u < t ? u + '/' + t : t + '/' + u;
        const edge = edges.get(id) ?? { a, b, balance: 0 };
        edge.balance += sign;
        edges.set(id, edge);
        x0 = Math.min(x0, a[0]);
        x1 = Math.max(x1, a[0]);
        y0 = Math.min(y0, a[1]);
        y1 = Math.max(y1, a[1]);
      }
    const w = Math.ceil((x1 - x0) / pitch),
      h = Math.ceil((y1 - y0) / pitch);
    if (!w || !h) continue;
    const cells = new Uint8Array(w * h);
    function bounds(vertices, visit, margin = 0) {
      const x = vertices.map((p) => (p[0] - x0) / pitch),
        y = vertices.map((p) => (p[1] - y0) / pitch);
      const left = Math.max(0, Math.floor(Math.min(...x) - margin)),
        right = Math.min(w - 1, Math.floor(Math.max(...x) + margin));
      const top = Math.max(0, Math.floor(Math.min(...y) - margin)),
        bottom = Math.min(h - 1, Math.floor(Math.max(...y) + margin));
      for (let row = top; row <= bottom; row++) for (let col = left; col <= right; col++) visit(col, row);
    }
    for (const v of tri)
      bounds(v, (x, y) => {
        if (cells[y * w + x]) return;
        const px = x0 + (x + 0.5) * pitch,
          py = y0 + (y + 0.5) * pitch;
        if (
          v.every((a, i) => {
            const b = v[(i + 1) % 3];
            return normal * ((b[0] - a[0]) * (py - a[1]) - (b[1] - a[1]) * (px - a[0])) >= 0;
          })
        )
          cells[y * w + x] = 1;
      });
    for (const { a, b, balance } of edges.values())
      if (balance) {
        const dx = b[0] - a[0],
          dy = b[1] - a[1],
          radius = (Math.abs(dx) + Math.abs(dy)) * (pitch * 0.5 + 0.0001);
        bounds(
          [a, b],
          (x, y) => {
            const px = x0 + (x + 0.5) * pitch,
              py = y0 + (y + 0.5) * pitch;
            if (Math.abs(dx * (py - a[1]) - dy * (px - a[0])) <= radius) cells[y * w + x] = 0;
          },
          0.001,
        );
      }
    for (let at = 0; at < 16; at++) {
      const box = largest(cells, w, h);
      if (!box) break;
      const [a, b, c, d] = box,
        lo = [0, 0, 0],
        hi = [0, 0, 0];
      lo[axis] = hi[axis] = level;
      lo[j] = x0 + pitch * a;
      hi[j] = x0 + pitch * c;
      lo[k] = y0 + pitch * b;
      hi[k] = y0 + pitch * d;
      result.push({ axis, j, k, lo, hi, normal });
      for (let row = b; row < d; row++) cells.fill(0, row * w + a, row * w + c);
    }
  }
  return result;
}
