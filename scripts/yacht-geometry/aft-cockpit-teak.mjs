import {aftCockpitTreads} from '../../site/tidewater-rocha/mobile/aft-cockpit-stair.js';
import {aftTeakFinish, plinthCorner} from '../../site/tidewater-rocha/mobile/aft-cockpit-teak.js';

// Replace the two overlapping desktop slabs with one finished cap on mobile.
// The plated risers, walking surface inventory and cheek fittings use the
// same tread bounds as before.
export function mobileAftTeak(parts) {
  return parts.flatMap(part => {
    const tread = part.feature?.match(/^tread (\d+) (timber border|pale inset)$/);
    if (!tread || !part.id.startsWith('MD_STA_013/')) return [part];
    if (tread[2] === 'pale inset') return [];
    const number = Number(tread[1]);
    const board = aftCockpitTreads[number - 1];
    const {front, back, left, right, top, thickness} = board;
    const threshold = number === aftCockpitTreads.length;
    const radius = threshold ? .002 : number === 1 ? .008 : .006;
    const roll = [.0, Math.PI / 4, Math.PI / 2];
    const rings = [{z: top - thickness, inset: 0, up: 0, out: 1},
      ...roll.map(a => ({z: top - radius + radius * Math.sin(a),
        inset: radius * (1 - Math.cos(a)), up: Math.sin(a), out: Math.cos(a)}))];
    const outline = ({inset}) => {
      const lo = left + inset, hi = right - inset;
      const near = front + inset, far = back - inset;
      if (number !== 1) return [[near, lo], [far, lo], [far, hi], [near, hi]];
      const arc = (y, start) => Array.from({length: 5}, (_, i) => {
        const a = (start + i) * Math.PI / 8;
        const r = plinthCorner - inset;
        return [front + plinthCorner + r * Math.cos(a), y + r * Math.sin(a)];
      });
      return [...arc(left + plinthCorner, 8), [far, lo], [far, hi], ...arc(right - plinthCorner, 4)];
    };
    const vertices = [], indices = [], profiles = rings.map(outline);
    const vertex = (p, z, normal) => {
      vertices.push(...p, z, ...normal);
      return vertices.length / 6 - 1;
    };
    const points = profiles[0];
    for (let i = 0; i < points.length; i++) {
      const next = (i + 1) % points.length;
      const [x, y] = points[i], [X, Y] = points[next];
      const length = Math.hypot(X - x, Y - y);
      const edge = [(Y - y) / length, (x - X) / length];
      const outward = j => {
        if (number !== 1) return edge;
        const [px, py] = points[j];
        if (j === 5 || j === 6) return edge;
        const cy = py < (left + right) / 2 ? left + plinthCorner : right - plinthCorner;
        return [(px - front - plinthCorner) / plinthCorner, (py - cy) / plinthCorner];
      };
      const strip = rings.map(({z, up, out}, k) => [i, next].map(j => {
        const [nx, ny] = outward(j);
        return vertex(profiles[k][j], z, [nx * out, ny * out, up]);
      }));
      for (let k = 1; k < rings.length; k++) {
        const [a, b] = strip[k - 1], [c, d] = strip[k];
        indices.push(a, b, d, a, d, c);
      }
    }
    for (const [k, up] of [[0, -1], [rings.length - 1, 1]]) {
      const ids = profiles[k].map(p => vertex(p, rings[k].z, [0, 0, up]));
      for (let i = 1; i + 1 < ids.length; i++) {
        if (up > 0) indices.push(ids[0], ids[i], ids[i + 1]);
        else indices.push(ids[0], ids[i + 1], ids[i]);
      }
    }
    return [{...part, vertices, indices, bounds: [front, left, top - thickness, back, right, top],
      finish: [0xbdac9a, .67, 0, aftTeakFinish]}];
  });
}
