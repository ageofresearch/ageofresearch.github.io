// Coordinates follow the deployed teak panels, from the free end to the yacht.
// The Beach Club faces the inboard rail (-1). The near telescopic beam hides
// several feet of the outboard rail (+1). Values describe the fitted model.
const sides = [
  {
    side: -1,
    segments: [
      { start: -4.19, end: 0.63, height: 0.99, turn: [0.04, 0, 0.022] },
      { start: 0.57, end: 2.25, height: 0.91, turn: [0, 0.046, 0.064] },
    ],
    // Foot, longitudinal displacement at the two knees and at the grip.
    posts: [
      [-4.27, 0.13, 0.15, 0.23],
      [-2.01, 0, 0, 0],
      [-0.73, -0.07, 0.08, 0.10],
      [0.28, -0.10, 0.04, 0.05],
      [1.11, -0.09, 0.05, 0.05],
      [2.07, -0.08, 0.02, 0.02],
    ],
  },
  {
    side: 1,
    segments: [
      { start: -4.16, end: 0.58, height: 0.94, turn: [0.038, 0, 0.019] },
      { start: 0.61, end: 2.21, height: 0.99, turn: [0, 0.041, 0.058] },
    ],
    posts: [
      [-4.24, 0.115, 0.13, 0.22],
      [-2.00, 0, 0, 0],
      [-0.82, -0.13, -0.14, -0.12],
      [0.27, -0.12, -0.12, -0.12],
      [1.06, -0.05, -0.08, -0.075],
      [1.98, -0.10, -0.09, -0.07],
    ],
  },
];

const polished = [0xd0d6db, 0.12, 1, 5];
const sockets = [0xa7adb2, 0.28, 0.97, 5];

export function makeGangwayRails({ layout, panels, height, tube, bend, cylinder, add, paths, radialSegments = 8 }) {
  const offsets = [0.429, 0.441, 0.453];
  const grips = [0.016, 0.014];
  const openEnds = { startCap: false, endCap: false };
  for (const { side, segments, posts } of sides) {
    const railY = (offset) => layout.y + side * offset;
    const gripPoint = (x, section) => [
      x, railY(section ? 0.452 : 0.436), height(x) + segments[section].height,
    ];
    for (const [section, { start, end, turn }] of segments.entries()) {
      const [tipLength, endLength, drop] = turn;
      const main = [gripPoint(start + tipLength, section), gripPoint(end - endLength, section)];
      if (tipLength) main.unshift([start, main[0][1], height(start) + segments[section].height - drop]);
      if (endLength) main.push([end, main[1][1], height(end) + segments[section].height - drop]);
      const points = bend(main, 0.034, 2);
      add(tube(points, grips[section], radialSegments), 'M19', `gangway top handrail ${side} ${section}`, { finish: polished });
      paths.push({ id: `gangway/${side}/${section}`, side, points });
    }
    for (const [station, [x, low, high, lean]] of posts.entries()) {
      const section = station < 4 ? 0 : 1;
      const panel = x < panels[1] ? 0 : x < panels[2] ? 1 : 2;
      const y = railY(offsets[panel]), deck = height(x) - 0.003;
      const top = gripPoint(x + lean, section);
      const foot = [x, y, deck - 0.010];
      const radius = station === 0 && side < 0 ? 0.014 : side < 0 ? 0.0125 : 0.0115;
      // The welded ends lie inside the grip and the tapered seat respectively.
      const spine = low === 0 && high === 0 ? [foot, top] : bend([
        foot, [x + low, y, deck + (station === 0 ? 0.22 : 0.24)],
        [x + high, top[1], deck + (station === 0 ? 0.46 : 0.51)], top,
      ], 0.043, 1);
      add(tube(spine, radius, radialSegments, openEnds), 'M19', `gangway ${side} upright ${station}`, { finish: polished });
      const seat = cylinder([x, y, deck - 0.008], [x, y, deck + 0.014], 0.021, radius + 0.002, 6);
      const light = Array.from({ length: seat.vertices.length / 6 }, (_, i) =>
        seat.vertices[i * 6 + 2] < deck ? 0.62 : 0.93);
      add(seat, 'M19', `gangway ${side} seated socket ${station}`, { finish: sockets, light });
    }
  }
}
