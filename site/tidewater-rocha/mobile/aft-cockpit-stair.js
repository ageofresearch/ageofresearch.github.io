// Cockpit (Port) shows nine intermediate noses and the flush Upperdeck Port
// threshold. Coordinates are fitted to the panoramas at the model's deck heights.
const centre = 2.28;
const width = .74;
const noses = [5.92, 6.23, 6.459, 6.688, 6.915, 7.142, 7.37, 7.597, 7.824, 8.05];
export const aftCockpitHeights = Object.freeze([3.95, 4.129, 4.349, 4.567, 4.78, 4.99, 5.198, 5.401, 5.602, 5.802, 6]);
export const aftCockpitStair = Object.freeze({
  path: Object.freeze([[noses[0], centre], [noses.at(-1), centre]].map(Object.freeze)),
  width, rises: noses.length, railOffset: width / 2 + .032,
});
export const aftCockpitGuard = Object.freeze({
  aft: 5.02, fore: 8.22, floor: 6, middle: 6.48, top: 6.93,
  sides: Object.freeze([1.64, 2.78]), posts: Object.freeze([5.12, 6.15, 7.2, 8.22]),
});
export const aftStairMirrorFinish = 68;
export const aftCockpitTreads = Object.freeze(noses.map((nose, index) => {
  const threshold = index === noses.length - 1;
  return Object.freeze({front: threshold ? nose - .028 : nose,
    back: threshold ? nose : noses[index + 1] + (index ? .005 : .004),
    top: aftCockpitHeights[index + 1], thickness: threshold ? .038 : index ? .037 : .043,
    left: index ? centre - width / 2 : 1.90, right: index ? centre + width / 2 : 2.84});
}));

// The reflected grain in the lower panels and the interrupted reflections in
// the upper panels both terminate at the side folds in the VR. Keep the fine
// reveal below each board while backing the apparent openings with real faces.
const setbacks = [.028, .028, .034, .044, .038, .032, .027, .024, .008];
export const aftCockpitRisers = Object.freeze(aftCockpitTreads.slice(1).map((board, index) => Object.freeze({
  front: board.front + setbacks[index], bottom: aftCockpitHeights[index + 1] + .003,
  top: board.top - board.thickness - .004, left: board.left + .004, right: board.right - .004,
})));

const vr = 'https://vrcloud.com/?pv=1667308298';
const dark = [0x25232a, .21, .62, 5];
const polished = [0x25232a, .13, .66, aftStairMirrorFinish];
const wood = [0xb88d63, .63, 0, 2];
const teak = [0xb99b79, .72, 0, 1];
const rectangle = (x, end, span) => [[x, centre - span / 2], [end, centre - span / 2],
  [end, centre + span / 2], [x, centre + span / 2]];

// The plinth has two rounded front corners and a straight rear edge under
// the cheeks. The inlay around the plinth follows the same outline.
export function cockpitPlinthOutline(x, end, y, span, radius) {
  const edge = [y - span / 2, y + span / 2];
  const points = side => Array.from({length: 6}, (_, i) => {
    const a = (side * 5 + i) * Math.PI / 10;
    return [x + radius - radius * Math.sin(a), edge[side] + (side ? -1 : 1) * radius - radius * Math.cos(a)];
  });
  return [...points(0).reverse(), [end, edge[0]], [end, edge[1]], ...points(1).reverse()];
}

export function buildAftCockpitStair({slab, box, merge, cheek, rail, post, railPath, part}) {
  const pieces = [];
  const add = (geometry, material, feature, finish, extra) => {
    pieces.push(part(geometry, material, feature, {reference: vr,
      evidence: 'Cockpit (Port) and Upperdeck Port rectilinear views; estimated scale',
      ...(finish ? {finish} : {}), ...extra}));
  };
  const addTimber = (shape, top, number, thickness) => {
    add(slab(shape, top - thickness, top, .003), 'M43', `tread ${number} timber border`, wood);
    // A nearly flush inset keeps the end grain on the nose and the plank
    // pattern on the horizontal face. Its footprint remains inside the board.
    const xs = shape.map(p => p[0]), ys = shape.map(p => p[1]);
    const x = (Math.min(...xs) + Math.max(...xs)) / 2;
    const y = (Math.min(...ys) + Math.max(...ys)) / 2;
    const inset = shape.map(([a, b]) => [x + (a - x) * .86, y + (b - y) * .89]);
    add(slab(inset, top - .0025, top + .0002, 0), 'M42', `tread ${number} pale inset`, teak);
  };
  // The enclosed service flight shares the space below the inboard cheek.
  // Keep the broadened nose on the cockpit side of its head clearance.
  const first = cockpitPlinthOutline(noses[0], noses[1] + .004, 2.37, .94, .111);
  const plinth = cockpitPlinthOutline(noses[0] + .025, noses[1] + .006, 2.37, .89, .096);
  add(slab(plinth, aftCockpitHeights[0], aftCockpitHeights[1] - .042, .003), 'M47', 'first rounded stair plinth', polished);
  addTimber(first, aftCockpitHeights[1] - .0002, 1, .043);

  for (let i = 1; i < noses.length - 1; i++) {
    const board = aftCockpitTreads[i];
    addTimber(rectangle(board.front, board.back, width), board.top - .0002, i + 1, board.thickness);
  }

  const threshold = noses.at(-1);
  // Join the upper deck edge without laying a second surface over the deck.
  addTimber(rectangle(threshold - .028, threshold, width), aftCockpitHeights.at(-1) - .0002, noses.length, .038);

  const cleats = [];
  for (const [index, panel] of aftCockpitRisers.entries()) {
    const board = aftCockpitTreads[index + 1];
    const {front, bottom, top, left, right} = panel;
    add(box([front, left, bottom, front + .008, right, top], 0), 'M47',
      `tread ${index + 2} polished riser`, polished);
    // The folded returns overlap both the inner edge of the cheek and the
    // underside of the tread. Their small exposed lips follow the fastenings
    // visible at each end of the dark panel.
    for (const [lo, hi] of [[board.left - .002, left + .008], [right - .008, board.right + .002]]) {
      cleats.push(box([front - .005, lo, bottom + .005, front + .012, hi, board.top - board.thickness + .001], 0));
    }
  }
  add(merge(cleats), 'M19', 'aft stair folded end seats', [0x757780, .21, .86, 5]);

  const profile = [[noses[1] - .018, 4.075, 4.47], [noses[1] + .10, 4.13, 4.68],
    [7.77, 5.52, 5.96], [threshold, 5.84, 6]];
  const sections = profile.map(([x]) => ({x, y: centre, n: [0, 1]}));
  for (const side of [-1, 1]) {
    add(cheek(sections, side, width, p => profile.find(s => s[0] === p.x)[1],
      p => profile.find(s => s[0] === p.x)[2], .076, [5.88, 6]), 'M47', `gloss black stair cheek ${side}`, dark);
    const path = railPath(side);
    add(rail(path, .022, 8, {startCap: true, endCap: false}), 'M19', `polished handrail ${side}`,
      null, {railPath: path, railRadius: .022});
    const y = centre + side * aftCockpitStair.railOffset;
    const postMesh = post([noses[1] - .018, y, 4.18], [noses[1] - .018, y, 4.88], .014);
    add(postMesh, 'M19', `slender handrail posts ${side}`);
  }
  return pieces;
}
