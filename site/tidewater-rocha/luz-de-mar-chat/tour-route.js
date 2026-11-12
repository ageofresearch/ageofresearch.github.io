// Plan in the walk controller's yacht-local coordinates. Floor samples use the
// same clearance as the player; only a modeled staircase connects two decks.
const GAP = 0.075;
const DIRECTIONS = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
const distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y, b.h - a.h);

class Frontier {
  values = [];
  push(item) {
    const heap = this.values;
    let i = heap.length;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (heap[parent].rank <= item.rank) break;
      heap[i] = heap[parent];
      i = parent;
    }
    heap[i] = item;
  }
  pop() {
    const heap = this.values, first = heap[0], last = heap.pop();
    if (!heap.length) return first;
    let i = 0;
    while (2 * i + 1 < heap.length) {
      let child = 2 * i + 1;
      if (child + 1 < heap.length && heap[child + 1].rank < heap[child].rank) child++;
      if (last.rank <= heap[child].rank) break;
      heap[i] = heap[child];
      i = child;
    }
    heap[i] = last;
    return first;
  }
}

export function planRoute(walk, room, eye, spacing = 0.18) {
  const nav = walk.nav;
  const levels = nav.asset.data.levels;
  const lanes = new Map(), nodes = new Map(), links = new Map();
  function point(deck, x, y) {
    let h = levels[deck];
    if (deck === 'MD' && nav.boarding?.safe(x, y, 0)) h = nav.boarding.height(x);
    if (deck === 'LD' && nav.machinery?.contains(x, y)) h = nav.machinery.floor;
    return { deck, x, y, h };
  }
  function clear(a, b) {
    if (a.deck !== b.deck) return false;
    const n = Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / GAP);
    for (let i = 1; i <= n; i++) {
      if (!nav.floorSafe(a.x + (b.x - a.x) * i / n, a.y + (b.y - a.y) * i / n, a.deck)) return false;
    }
    return true;
  }
  function cell(deck, i, j) {
    const id = deck + '/' + i + '/' + j;
    if (!nodes.has(id)) nodes.set(id, nav.floorSafe(i * spacing, j * spacing, deck) ? { ...point(deck, i * spacing, j * spacing), i, j } : null);
    return nodes.get(id);
  }
  function link(a, b, via = []) {
    if (!links.has(a)) links.set(a, []);
    links.get(a).push({ to: b, via });
  }
  function attach(p) {
    const i = Math.round(p.x / spacing), j = Math.round(p.y / spacing);
    for (let x = i - 1; x <= i + 1; x++) for (let y = j - 1; y <= j + 1; y++) {
      const c = cell(p.deck, x, y);
      if (c && clear(p, c)) { link(p, c); link(c, p); }
    }
  }
  const from = { ...point(nav.deck, ...nav.position), h: walk.cameraElevation ?? nav.elevation };
  const to = point(room.deck, ...eye);
  // Preserve gangway slopes and landings in the height profile even after
  // simplifying a long straight passage. Interpolate short floor transitions.
  function profile(path) {
    // Round floor turns only when the inside of the bend is also clear.
    // On narrow landings the validated walking line takes precedence.
    const rounded = [path[0]];
    for (let i = 1; i < path.length - 1; i++) {
      const a = path[i - 1], b = path[i], c = path[i + 1];
      const ab = distance(a, b), bc = distance(b, c);
      if (a.route || b.route || c.route || Math.min(ab, bc) < 0.1 || a.deck !== c.deck) {
        rounded.push(b); continue;
      }
      const radius = Math.min(0.36, ab / 3, bc / 3);
      const first = point(b.deck, b.x + (a.x - b.x) * radius / ab, b.y + (a.y - b.y) * radius / ab);
      const last = point(b.deck, b.x + (c.x - b.x) * radius / bc, b.y + (c.y - b.y) * radius / bc);
      const bend = [first];
      for (let k = 1; k <= 6; k++) {
        const t = k / 6, u = 1 - t;
        bend.push(point(b.deck, u*u*first.x + 2*t*u*b.x + t*t*last.x, u*u*first.y + 2*t*u*b.y + t*t*last.y));
      }
      if (bend.every((p, j) => clear(j ? bend[j - 1] : rounded.at(-1), p)) && clear(last, c)) rounded.push(...bend);
      else rounded.push(b);
    }
    rounded.push(path.at(-1));
    path = rounded;
    const result = [path[0]];
    for (let i = 1; i < path.length; i++) {
      const a = path[i - 1], b = path[i];
      if (a.deck === b.deck && !(a.route && a.route === b.route)) {
        const count = Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 0.45);
        for (let j = 1; j < count; j++) result.push(point(a.deck, a.x + (b.x - a.x) * j / count, a.y + (b.y - a.y) * j / count));
      }
      result.push(b);
    }
    return result;
  }
  if (!nav.stair && clear(from, to)) return profile([from, to]);
  attach(to);
  for (const route of nav.routes) {
    const low = route.lowerHeight ?? levels[route.lower];
    const path = route.path.map(([x, y], i) => {
      const d = route.distances[i];
      return { x, y, deck: i === route.path.length - 1 ? route.upper : route.lower,
        h: low + (levels[route.upper] - low) * d / route.length, route, d };
    });
    const first = path[0], last = path.at(-1);
    attach(first); attach(last);
    link(first, last, path.slice(1, -1)); link(last, first, path.slice(1, -1).reverse());
    lanes.set(route, path);
  }
  if (nav.stair && lanes.has(nav.stair.route)) {
    from.route = nav.stair.route;
    from.d = nav.stair.d;
    const path = lanes.get(from.route);
    link(from, path[0], path.slice(1, -1).filter(p => p.d < from.d).reverse());
    link(from, path.at(-1), path.slice(1, -1).filter(p => p.d > from.d));
  } else attach(from);

  const frontier = new Frontier(), costs = new Map([[from, 0]]), parents = new Map();
  frontier.push({ p: from, cost: 0, rank: distance(from, to) });
  while (frontier.values.length) {
    const { p, cost } = frontier.pop();
    if (cost !== costs.get(p)) continue;
    if (p === to) {
      const backwards = [to];
      let cursor = to;
      while (cursor !== from) {
        const { prev, via } = parents.get(cursor);
        backwards.push(...via.slice().reverse(), prev);
        cursor = prev;
      }
      const path = backwards.reverse();
      // Remove grid zigzags only when the entire shortcut is walkable.
      const result = [from];
      for (let i = 0; i < path.length - 1;) {
        let j = i + 1;
        if (!path[i].route) {
          while (j + 1 < path.length && !path[j].route && !path[j + 1].route && clear(path[i], path[j + 1])) j++;
        }
        result.push(path[j]); i = j;
      }
      return profile(result);
    }
    function offer(next, via) {
      const costNext = cost + (via.length ? Math.abs(next.d - p.d) : distance(p, next));
      if (costNext >= (costs.get(next) ?? Infinity)) return;
      costs.set(next, costNext); parents.set(next, { prev: p, via });
      frontier.push({ p: next, cost: costNext, rank: costNext + distance(next, to) });
    }
    for (const edge of links.get(p) || []) offer(edge.to, edge.via);
    if (p.i === undefined) continue;
    for (const [dx, dy] of DIRECTIONS) {
      const next = cell(p.deck, p.i + dx, p.j + dy);
      if (next && clear(p, next)) offer(next, []);
    }
  }
  // Some cabin thresholds are only connected at the original navigation grid resolution.
  return spacing > 0.1 ? planRoute(walk, room, eye, 0.1) : null;
}

export function trackFor(path) {
  let length = 0;
  const ends = [0];
  for (let i = 1; i < path.length; i++) { length += distance(path[i - 1], path[i]); ends.push(length); }
  function sample(d) {
    if (d <= 0) return path[0];
    if (d >= length) return path.at(-1);
    const i = ends.findIndex(end => end >= d);
    const a = path[i - 1], b = path[i], t = (d - ends[i - 1]) / (ends[i] - ends[i - 1]);
    const mix = (x, y) => x + (y - x) * t;
    const route = a.route && a.route === b.route ? a.route : null;
    return { deck: route ? route.lower : a.deck, x: mix(a.x, b.x), y: mix(a.y, b.y),
      h: mix(a.h, b.h), route, d: route ? mix(a.d, b.d) : 0 };
  }
  return { sample, length };
}
