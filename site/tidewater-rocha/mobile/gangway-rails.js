import { beachClubCanopyTop } from './beach-club.js?v=main-deck-complete-1';

// Source-space stations reconstructed from the Beach Club cube. The short
// grips extend slightly over the landing. The lower fixed guards are separate.
const sides = [
  {
    sign: -1,
    grips: [
      [[-4.49, 5.755, .014], [-4.40, 5.765, .018], [-2.84, 5.607, .018],
        [-1.08, 5.565, .0155], [.90, 5.490, .0135], [1.30, 5.484, .012]],
      [[1.025, 5.360, .014], [1.49, 5.354, .015], [2.20, 5.355, .014],
        [2.53, 5.354, .014], [2.62, 5.314, .0115]],
    ],
    // Foot X, intermediate [X, elevation] pairs, grip X.
    posts: [
      [-4.34, [[-4.32, 4.524], [-4.41, 4.909]], -4.365],
      [-2.90, [], -2.835],
      [-1.24, [[-1.22, 4.375], [-1.11, 4.718]], -1.08],
      [.58, [[.58, 4.299], [.84, 4.620]], .90],
      [1.36, [[1.29, 4.350], [1.33, 4.730]], 1.49],
      [2.13, [[2.08, 4.486], [2.08, 4.780]], 2.21],
    ],
  },
  {
    sign: 1,
    grips: [
      [[-4.478, 5.728, .013], [-4.39, 5.733, .016], [-2.84, 5.641, .016],
        [-1.07, 5.578, .0145], [.91, 5.477, .013], [1.31, 5.461, .012]],
      [[1.36, 5.533, .013], [1.83, 5.526, .014], [2.44, 5.478, .0135],
        [2.77, 5.456, .014], [2.91, 5.418, .011]],
    ],
    posts: [
      [-4.42, [[-4.49, 4.638], [-4.42, 4.903]], -4.35],
      [-2.93, [], -2.84],
      [-1.17, [[-1.02, 4.504], [-1.10, 4.673]], -1.07],
      [1.11, [[1.04, 4.377], [.84, 4.600]], .91],
      [2.06, [[1.95, 4.342], [1.80, 4.559]], 1.83],
      [2.27, [[2.26, 4.388], [2.31, 4.626]], 2.44],
    ],
  },
];
const polished = [0xd9dce1, 0.095, 1, 5];
const sockets = [0xaab1b7, 0.24, 0.97, 5];
const openEnds = { startCap: false, endCap: false };
// Small mobile refinements measured across the visible tube edges at Beach
// Club. The distant feet behind the telescopic beam retain their fitted seat.
const mobileCrossSections = {
  '-1': { gripLift: [.0115, .008], gripRadius: [1.18, 1.12], lean: [.004, -.006, .001, .014, .009, .003], radius: .018 },
  '1': { gripLift: [.012, -.006], gripRadius: [1.17, 1.14], lean: [.014, 0, .019, .026, .012, .007], radius: .0165 },
};

// Elevation corrections in metres from the leveled Beach Club panorama.
// The nose and the two telescopic seams locate the camera before measuring
// the steel. Grip offsets are at the exposed ends of each section. Retain
// the previous bends where the landing hardware covers the post.
const mobileElevations = {
  '-1': {
    grips: [[.062, .027], [.047, .023]],
    bends: [[-.027, -.011], [], [.002, .013], [.052, .062]],
  },
  '1': {
    grips: [[.032, .071], [.066, .103]],
    bends: [[.007, .014], [], [.008, .036], [.083, .087], [.120, .109], [.119, .120]],
  },
};

function elevationAt(stations, x) {
  const end = stations.findIndex(point => point[0] >= x);
  const right = end === -1 ? stations.length - 1 : Math.max(1, end);
  const a = stations[right - 1], b = stations[right];
  const fraction = (x - a[0]) / (b[0] - a[0]);
  return a[1] + (b[1] - a[1]) * fraction;
}

export function makeGangwayRails({ layout, height, tube, bend, cylinder, add, paths, radialSegments, mobile = false }) {
  for (const { sign, grips: referenceGrips, posts } of sides) {
    const y = layout.y + sign * 0.441;
    const sectionFit = mobile ? mobileCrossSections[sign] : null;
    const elevations = mobileElevations[sign];
    const fittedGrips = sectionFit ? referenceGrips.map((stations, section) => {
      const [startLift, endLift] = elevations.grips[section];
      const firstX = stations[0][0], run = stations.at(-1)[0] - firstX;
      return stations.map(([x, z, radius]) => {
        const lift = startLift + (endLift - startLift) * (x - firstX) / run;
        return [x, z + sectionFit.gripLift[section] + lift, radius * sectionFit.gripRadius[section]];
      });
    }) : referenceGrips;
    const grips = mobile ? fittedGrips.map(stations => {
      // Seat the upper edge of each landing tip at the Beach Club canopy
      // height while retaining the slope and the rounded return of its tube.
      const [, tipElevation, tipRadius] = stations.at(-1);
      const lowering = tipElevation + tipRadius - beachClubCanopyTop;
      return stations.map(([x, z, radius]) => [x, z - lowering, radius]);
    }) : fittedGrips;
    for (const [section, stations] of grips.entries()) {
      const points = stations.map(([x, z]) => [x, y, z]);
      const mesh = tube(points, 1, radialSegments);
      for (const [ring, point] of points.entries()) {
        const radius = stations[ring][2];
        for (let i = 0; i < radialSegments; i++) {
          const offset = (ring * radialSegments + i) * 6;
          for (let axis = 0; axis < 3; axis++)
            mesh.vertices[offset + axis] = point[axis] + mesh.vertices[offset + axis + 3] * radius;
        }
      }
      if (mobile) {
        // Round off the two exposed plugs inside the original cap fan.
        // Each tip follows the direction of the last segment.
        const capStart = points.length * radialSegments * 6;
        for (const [index, length] of [[0, .009], [1, .006]]) {
          const cap = capStart + index * 6;
          for (let axis = 0; axis < 3; axis++) mesh.vertices[cap + axis] += length * mesh.vertices[cap + axis + 3];
        }
      }
      const name = `gangway top handrail ${sign} ${section}`;
      add(mesh, 'M19', name, { finish: polished });
      paths.push({ id: `gangway/${sign}/${section}`, side: sign, points });
    }
    for (const [index, [x, knees, topX]] of posts.entries()) {
      const z = height(x);
      const radius = sectionFit?.radius ?? (sign === -1 ? 0.016 : 0.0135);
      const foot = [x, y, z - .015];
      const section = index < 4 ? 0 : 1;
      const lean = sectionFit?.lean[index] ?? 0;
      const top = [topX + lean, y, elevationAt(grips[section], topX + lean)];
      const bendLift = mobile ? elevations.bends[index] : null;
      const compression = mobile ?
        (top[2] - foot[2]) / (elevationAt(fittedGrips[section], top[0]) - foot[2]) : 1;
      const spine = [foot, ...knees.map(([x, z], knee) =>
        [x + lean, y, foot[2] + (z + (bendLift?.[knee] ?? 0) - foot[2]) * compression]), top];
      add(tube(bend(spine, .042, 1), radius, radialSegments, openEnds), 'M19',
        `gangway ${sign} upright ${index}`, { finish: polished });
      const seat = cylinder([x, y, z - .014], [x, y, z + .02], .024, radius + .002, 4);
      add(seat, 'M19', `gangway ${sign} seated socket ${index}`, {
        finish: sockets,
        light: Array.from({ length: seat.vertices.length / 6 }, (_, i) =>
          seat.vertices[i * 6 + 2] < z ? .62 : .93),
      });
    }
  }
}
