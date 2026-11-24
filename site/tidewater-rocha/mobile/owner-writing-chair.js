// The desk faces starboard. Longitudinal X runs along the bolster and the
// two upholstered supports sit beneath its ends.
const centreX = 26.40;

function loft(rings, first, last) {
  const points = rings.flat(), width = rings[0].length, indices = [];
  for (let row = 0; row < rings.length - 1; row++) {
    for (let side = 0; side < width; side++) {
      const a = row * width + side, b = row * width + (side + 1) % width;
      indices.push(a, b, a + width, b, b + width, a + width);
    }
  }
  if (first) {
    const pole = points.push(first) - 1;
    for (let i = 0; i < width; i++) indices.push(pole, (i + 1) % width, i);
  }
  if (last) {
    const pole = points.push(last) - 1, row = (rings.length - 1) * width;
    for (let i = 0; i < width; i++) indices.push(row + i, row + (i + 1) % width, pole);
  }
  const normals = points.map(() => [0, 0, 0]);
  for (let i = 0; i < indices.length; i += 3) {
    const ids = indices.slice(i, i + 3), [a, b, c] = ids.map(j => points[j]);
    const [ux, uy, uz] = b.map((value, j) => value - a[j]);
    const [vx, vy, vz] = c.map((value, j) => value - a[j]);
    const normal = [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx];
    for (const id of ids) for (let j = 0; j < 3; j++) normals[id][j] += normal[j];
  }
  return {vertices:points.flatMap((point, i) => {
    const normal = normals[i], length = Math.hypot(...normal);
    return [...point, ...normal.map(v => v / length)].map(v => Number(v.toFixed(10)));
  }), indices};
}

function roundedRing(x, y, z, width, depth, radius, steps) {
  return [[1, 1], [-1, 1], [-1, -1], [1, -1]].flatMap(([u, v], i) =>
    Array.from({length:steps}, (_, j) => {
      const angle = (i + j / (steps - 1)) * Math.PI / 2;
      return [x + u * (width - radius) + radius * Math.cos(angle),
        y + v * (depth - radius) + radius * Math.sin(angle), z];
    }));
}

export function ownerWritingChair() {
  const seatY = -1.742;
  // The slight inset between the seat and its lower padded band models the
  // upholstery join visible above the two supports.
  const seatProfile = [
    [4.254, .235, .220, .065], [4.279, .257, .245, .064], [4.300, .251, .241, .062],
    [4.355, .267, .254, .061], [4.400, .246, .232, .065],
  ];
  const seat = loft(seatProfile.map(row => roundedRing(centreX, seatY, ...row, 4)),
    [centreX, seatY, 4.250], [centreX, seatY, 4.414]);

  const rollY = -1.513, rollZ = 4.443;
  const roll = loft([[-.246, .70], [-.221, 1], [.221, 1], [.246, .70]].map(([x, scale]) =>
    Array.from({length:14}, (_, i) => {
      const angle = i * Math.PI / 7;
      return [centreX + x, rollY + .057 * scale * Math.cos(angle), rollZ + .054 * scale * Math.sin(angle)];
    })), [centreX - .254, rollY, rollZ], [centreX + .254, rollY, rollZ]);

  const supports = [-.193, .193].map(side => {
    const x = centreX + side, y = -1.738;
    const rings = [[3.951, .037, .158, .016], [3.971, .043, .174, .019], [4.286, .047, .177, .020]];
    // The cabin sole and the padded seat close the two ends of each support.
    return loft(rings.map(row => roundedRing(x, y, ...row, 3)));
  });
  return [seat, roll, ...supports];
}
