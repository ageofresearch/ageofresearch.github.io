// The source slab already contains a recess. Where it extends beyond the
// rectangular stair cut, the wall must meet the original edge of the slab.
export function guestStairwellFront(deck, opening, top) {
  const [, low, front, high] = opening, y = (low + high) / 2;
  let nearest = Infinity;
  for (let i = 0; i < deck.indices.length; i += 3) {
    const face = Array.from(deck.indices.slice(i, i + 3), index => deck.vertices.subarray(index * 6, index * 6 + 3));
    if (face.some(v => Math.abs(v[2] - top) > .0001)) continue;
    const xs = [];
    for (let j = 0; j < 3; j++) {
      const a = face[j], b = face[(j + 1) % 3];
      if ((a[1] < y) === (b[1] < y)) continue;
      xs.push(a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]));
    }
    if (xs.length && Math.max(...xs) >= front) nearest = Math.min(nearest, Math.max(front, Math.min(...xs)));
  }
  if (!Number.isFinite(nearest)) throw Error('Guest stairwell does not meet the forward slab');
  return nearest;
}

// At the forward edge the cut crosses a triangulation seam. Recover the
// entire supported interval from the uncut deck, oriented into the opening.
export function completeGuestForwardReveal(reveal, supported, front) {
  const onFront = (mesh, face) => face.every(i => Math.abs(mesh.vertices[6 * i] - front) < .00001);
  const indices = [];
  for (let i = 0; i < reveal.indices.length; i += 3) {
    const face = reveal.indices.slice(i, i + 3);
    if (!onFront(reveal, face)) indices.push(...face);
  }
  const vertices = reveal.vertices.slice();
  for (let i = 0; i < supported.indices.length; i += 3) {
    const face = supported.indices.slice(i, i + 3);
    if (!onFront(supported, face)) continue;
    const base = vertices.length / 6;
    for (const index of face) vertices.push(...supported.vertices.slice(index * 6, index * 6 + 6));
    indices.push(base, base + 2, base + 1);
  }
  return {vertices, indices};
}

// Both flights open aft. Follow the lower port partition round to the existing
// transverse bathroom wall, then use that wall up to the underside of the deck.
export function guestStairwellLining(opening, forward, portWall, aftWall, bathWall, tray, floor, soffit, extrude) {
  const side = portWall[1], thickness = portWall[4] - side;
  const radius = (side - opening[3]) * .75;
  const cx = forward - radius, cy = side - radius;
  function edge(offset) {
    const r = radius + offset;
    const points = [[portWall[3], side + offset]];
    for (let i = 0; i <= 6; i++) {
      const angle = Math.PI / 2 * (1 - i / 6);
      points.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
    }
    points.push([bathWall[offset ? 3 : 0], bathWall[4]]);
    return points;
  }
  const rectangle = (x, y, X, Y) => [[x,y],[X,y],[X,Y],[x,Y]];
  // The high flight passes over a shower. Fit the return at the outer edge
  // of its tray, between the two existing transverse bathroom partitions.
  const outer = Math.min(opening[1], tray[1]);
  return [
    ['guest stairwell lining', extrude([...edge(0), ...edge(thickness).reverse()], floor, soffit)],
    ['guest stairwell forward soffit', extrude(rectangle(bathWall[0], outer - thickness, bathWall[3], bathWall[4]), bathWall[5], soffit)],
    ['guest stairwell starboard return', extrude(rectangle(aftWall[3], outer - thickness, bathWall[0], outer), floor, soffit)]
  ];
}

// Close the curved parapets around the guest flight, including their sloping
// undersides, which are visible from the lower landing. Order each face in
// model coordinates so the same mesh works with single-sided materials.
export function guestStairParapet(path, side, width, lower, upper, thickness) {
  function section(p) {
    const point = (offset, z) => [p.x + side * offset * p.n[0], p.y + side * offset * p.n[1], z];
    const inner = width / 2, outer = inner + thickness;
    return [point(inner, lower(p)), point(inner, upper(p)), point(outer, upper(p)), point(outer, lower(p))];
  }
  return closedStrip(path.map(section), side);
}

// The straight upper arm crosses the adjacent service compartment. Seat
// its lining against the 85 mm tread undersides at their high ends. Stop
// at the tangent to the turn: the open lower treads overlook the lobby.
export function upperGuestStairLining(path, width, height) {
  const sections = path.slice(-2).map(p => {
    const top = height(p) - .085;
    const point = (side, z) => [p.x + side * width/2 * p.n[0], p.y + side * width/2 * p.n[1], z];
    return [point(-1, top-.06), point(-1, top), point(1, top), point(1, top-.06)];
  });
  return closedStrip(sections, 1);
}

function closedStrip(sections, side) {
  const vertices = [], indices = [];
  function face(a, b, c, d) {
    if (side < 0) [b, d] = [d, b];
    const ab = b.map((v, i) => v - a[i]), ac = c.map((v, i) => v - a[i]);
    const n = [ab[1]*ac[2] - ab[2]*ac[1], ab[2]*ac[0] - ab[0]*ac[2], ab[0]*ac[1] - ab[1]*ac[0]];
    const length = Math.hypot(...n);
    const normal = n.map(v => v / length), start = vertices.length / 6;
    for (const p of [a, b, c, d]) vertices.push(...p, ...normal);
    indices.push(start, start+1, start+2, start, start+2, start+3);
  }
  let previous = sections[0];
  face(...previous);
  for (const next of sections.slice(1)) {
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4;
      face(previous[i], next[i], next[j], previous[j]);
    }
    previous = next;
  }
  face(...previous.reverse());
  return {vertices, indices};
}
