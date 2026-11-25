export const portStairGelcoat = { finish: [0x7f8bac, .29, .16, 4] };
const silverGelcoat = { finish: [0xb4b9c7, .33, .09, 4] };
const shadowedGelcoat = { finish: [0x60698f, .29, .16, 4] };
const riserGelcoat = { finish: [0x89868d, .34, .11, 4] };
const teak = { finish: [0x99969e, .77, 0, 1] };
const nosing = { finish: [0x805b49, .66, 0, 1] };
const seam = { finish: [0x262422, .8, 0, 0] };

// Join equal-length profiles, accumulating area-weighted normals across the
// roundovers. Keep the deck, risers and other sharp material edges separate.
function skin(profiles) {
  const width = profiles[0].length;
  const vertices = profiles.flatMap(row => row.flatMap(p => [...p, 0, 0, 0]));
  const indices = [];
  for (let row = 0; row < profiles.length - 1; row++) {
    for (let col = 0; col < width - 1; col++) {
      const a = row * width + col, b = a + 1;
      indices.push(a, b, a + width, b, b + width, a + width);
    }
  }
  for (let i = 0; i < indices.length; i += 3) {
    const [a, b, c] = indices.slice(i, i + 3).map(n => n * 6);
    const [x, y, z] = [0, 1, 2].map(k => vertices[b + k] - vertices[a + k]);
    const [u, v, w] = [0, 1, 2].map(k => vertices[c + k] - vertices[a + k]);
    const normal = [y * w - z * v, z * u - x * w, x * v - y * u];
    for (const k of [a, b, c]) normal.forEach((n, j) => { vertices[k + 3 + j] += n; });
  }
  for (let i = 3; i < vertices.length; i += 6) {
    const length = Math.hypot(...vertices.slice(i, i + 3));
    for (let k = 0; k < 3; k++) vertices[i + k] /= length;
  }
  return { vertices, indices };
}

function clipAtY(loop, edge, keepBelow) {
  const result = [];
  for (let i = 0; i < loop.length; i++) {
    const [x, y] = loop[i];
    const [u, v] = loop[(i + 1) % loop.length];
    if ((y < edge) === keepBelow) result.push([x, y]);
    if ((y < edge) !== (v < edge)) result.push([x + (u - x) * (edge - y) / (v - y), edge]);
  }
  return result;
}

export function buildMobilePortStair(add, { box, extrude, face, merge, pipe }) {
  const landingZ = 3.04, footwellZ = 3.32;
  const surface = (loop, z) => face(loop, (x, y) => ({ point: [x, y, z], normal: [0, 0, 1] }));
  const mould = (mesh, name, finish = portStairGelcoat) => add(mesh, 'M89', name, finish);

  // The aft sponson and the swim platform have separate skins. The straight
  // inboard edge runs parallel to the water gap in the platform outline.
  const rim = [[1.04, 2.44], [1.04, 3.61], [.66, 3.64], [.37, 3.61],
    [.12, 3.51], [-.075, 3.36], [-.275, 3.14], [-.455, 2.88], [-.55, 2.67], [-.54, 2.54]];
  const deck = [[1.04, 2.465], [1.04, 3.585], [.66, 3.614], [.376, 3.584],
    [.132, 3.487], [-.057, 3.342], [-.255, 3.121], [-.431, 2.868], [-.525, 2.666], [-.511, 2.56]];
  const field = [[1.04, 2.52], [1.04, 3.528], [.66, 3.555], [.39, 3.526],
    [.159, 3.434], [-.019, 3.297], [-.211, 3.082], [-.378, 2.838], [-.462, 2.653], [-.451, 2.615]];
  // The stern moulding bulges aft below the teak, then rounds into its sole.
  // Pin the inboard edge laterally so the flare leaves the water slot open.
  const ring = (z, rake, flare) => rim.map(([x, y]) =>
    [x + rake * (1.04 - x), y + flare * Math.max(0, y - 2.57), z]);
  const soleZ = 2.63;
  const sections = [ring(soleZ, -.045, .008), ring(2.70, -.119, .035),
    ring(2.815, -.137, .047), ring(2.951, -.086, .028), ring(landingZ, 0, 0)];
  // The water-facing roundover and the inboard face meet at the chine
  // visible in the Beach Club view, with the latter in the deck's shade.
  mould(skin(sections.map(row => row.slice(1))), 'transom port pale step 1', silverGelcoat);
  mould(skin(sections.map(row => [row.at(-1), row[0], row[1]])),
    'port stair sponson inboard skin', shadowedGelcoat);
  mould(face(sections[0].toReversed(), (x, y) =>
    ({ point: [x, y, soleZ], normal: [0, 0, -1] })), 'port stair sponson underside', shadowedGelcoat);
  const band = (outer, inner) => [...outer.slice(1), outer[0], inner[0], ...inner.slice(1).reverse()];
  mould(surface(band(rim, deck), landingZ), 'port stair landing perimeter lip');
  add(surface(band(deck, field), landingZ), 'M43', 'port stair landing teak margin board',
    { finish: [0x95929a, .72, 0, 0] });
  let rest = field;
  const boards = [], joints = [];
  for (let y = 2.58; y < 3.53; y += .104) {
    for (const [edge, surfaces] of [[y - .002, boards], [y + .002, joints]]) {
      surfaces.push(surface(clipAtY(rest, edge, true), landingZ));
      rest = clipAtY(rest, edge, false);
    }
  }
  boards.push(surface(rest, landingZ));
  add(merge(boards), 'M100', 'transom port teak tread 1', teak);
  add(merge(joints), 'M34', 'port stair landing field caulking', seam);

  // Round the J-shaped bottom of the stair aperture into the outer cheeks.
  // The dark riser is recessed beneath its projecting gelcoat lip.
  add(box([1.055, 2.45, landingZ, 1.12, 3.558, 3.115], 0),
    'M47', 'port stair recessed kick face', { finish: [0x101118, .48, 0, 0] });
  const lip = [[.985, 3.095], [.976, 3.13], [.99, 3.205], [1.019, 3.285], [1.043, footwellZ]];
  mould(skin(lip.map(([x, z]) => [[x, 3.539, z], [x, 2.438, z]])),
    'transom port pale step 2');
  const surround = [[1.043, 2.438], [1.043, 3.539], [1.475, 3.54], [1.475, 2.438]];
  const well = [[1.104, 2.57], [1.097, 2.727], [1.097, 3.289], [1.141, 3.407],
    [1.199, 3.449], [1.475, 3.453], [1.475, 2.57]];
  const reversedWell = [well[5], ...well.slice(0, 5).reverse(), well[6]];
  mould(surface([surround[3], ...surround.slice(0, 3), ...reversedWell], footwellZ),
    'port stair moulded footwell surround');
  add(surface(well, footwellZ), 'M100', 'transom port teak tread 2',
    { finish: [0x8d7066, .72, 0, 1] });

  const upperTreadZ = 3.95 - (3.95 - 2.84) / 7;
  const stations = [[1.438, 1.658, 3.438], [1.658, 1.892, 3.538],
    [1.892, 2.304, 3.62], [2.304, 2.34, upperTreadZ]];
  let previous = footwellZ;
  for (const [index, [start, end, z]] of stations.entries()) {
    const lower = 2.567, upper = 3.49, thickness = .022;
    mould(skin([
      [[start + .037, upper, previous], [start + .037, lower, previous]],
      [[start + .015, upper, previous + .028], [start + .015, lower, previous + .028]],
      [[start, upper, z - thickness], [start, lower, z - thickness]],
    ]), 'transom port pale step ' + (index + 3), riserGelcoat);
    const rear = end + (index < 3 ? .037 : 0);
    const loop = [[start + .001, lower], [rear, lower], [rear, upper], [start + .001, upper]];
    add(extrude(loop, z - thickness, z, 0), 'M100', 'transom port teak tread ' + (index + 3), nosing);
    previous = z;
  }

  // Sweep the water-facing cheek upwards, including the shallow shiny
  // recess. Its top and the metal grip stay outside the telescopic sleeves.
  const outer = [[.52, 3.577, 3.04, 3.056], [.84, 3.582, 3.04, 3.252],
    [1.22, 3.593, 3.09, 3.453], [1.63, 3.603, 3.26, 3.66],
    [1.99, 3.62, 3.39, 3.868], [2.36, 3.61, 3.68, 4.08], [2.87, 3.605, 3.9, 4.143]];
  mould(skin(outer.map(([x, y, low, high]) => [
    [x, y + .047, low], [x, y + .027, high - .023], [x, y, high],
    [x, y - .062, Math.min(high - .06, 3.605)], [x, y - .112, low],
  ])), 'transom port swept outer stair coaming');
  const mounts = outer.slice(1, 4).map(([x, y, , high]) => [
    x, y - .034, high + (Math.min(high - .06, 3.605) - high) * .034 / .062 + .009,
  ]);
  add(skin(mounts.map(([x, y, z]) => [[x, y + .044, z + .016], [x, y + .015, z - .023]])),
    'M47', 'port stair handhold inset', { finish: [0x414955, .43, .2, 4] });
  add(pipe(mounts, .013, 6), 'M19', 'outboard stair coaming cap rail 1',
    { finish: [0xc4cbd3, .16, 1, 5] });
  for (const [i, point] of [mounts[0], mounts.at(-1)].entries()) {
    const [x, y, z] = point;
    add(face([[-.018, -.02], [0, -.022], [.018, 0], [0, .02], [-.018, .014]],
      (dx, dz) => ({ point: [x + dx, y + .012, z + dz], normal: [0, -1, 0] })),
    'M19', 'port stair handhold support ' + i);
  }

  // Pair the side of the collar with the wider port jamb.
  const jamb = [[1.043, 2.438, footwellZ], [1.1, 2.5, 3.392],
    [1.26, 2.534, 3.54], [1.514, 2.547, 3.68], [1.88, 2.562, 3.805], [2.34, 2.56, 3.916]];
  mould(skin(jamb.toReversed().map(([x,y,z]) => [
    [x, y - .12, Math.max(landingZ, z - .193)], [x, y - .11, z - .044],
    [x, y - .046, z], [x, y + .032, z - .068],
    [x, y + .034, Math.max(landingZ, z - .192)],
  ])), 'port stair inboard moulded cheek');
}
