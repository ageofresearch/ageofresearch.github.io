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

// Inside face of the guest stairwell, measured in the model's deck coordinates.
// Return the lining to the two existing lower-deck partitions. The aft end
// stays open at both landings. The rounded forward corner is under solid deck.
export function guestStairwellLining(opening, forward, portPartition, starboardPartition, floor, soffit, extrude) {
  const [, starboard, , port] = opening;
  const side = portPartition[1], thickness = portPartition[4] - side;
  const radius = (side - port) * .75;
  const cx = forward - radius, cy = side - radius;
  function edge(offset) {
    const r = radius + offset;
    const points = [[portPartition[3], side + offset]];
    for (let i = 0; i <= 6; i++) {
      const angle = Math.PI / 2 * (1 - i / 6);
      points.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
    }
    const y = starboard - .035 - offset;
    points.push([forward + offset, y], [starboardPartition[3], y]);
    return points;
  }
  return extrude([...edge(0), ...edge(thickness).reverse()], floor, soffit);
}
