import { orderOpaqueTriangles } from './opaque-order.mjs';
import { l as basis } from '../../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';

export function detailError(part, error, profile) {
  const name = part.feature || part.name || '';
  if (part.context) return 0;
  // These deck fragments are also the visible ceiling of the main deck.
  if (profile === 'exterior' && part.id.startsWith('UD_DCK_001/stairs/stair-opening'))
    return Math.min(error, 0.012);
  if (
    part.id.startsWith('boarding/owner/') &&
    /handrail|handhold|upright|gate frame|gate polished/.test(name)
  ) {
    return Math.min(error, 0.003);
  }
  if (/director chair/.test(name)) return 0;
  if (/cockpit transverse|cockpit port chaise|cockpit wet bar|cockpit grey counter/.test(name))
    return Math.min(error, 0.006);
  if (/^MD_SOF_0(?:07|08|09|10)\//.test(part.id)) return Math.min(error, 0.009);
  if (/rounded recessed coffer|gloss red organic lampshade/.test(name)) return Math.min(error, 0.014);
  if (/full width .*swim platform|transom full width ivory|covered aft seating behind transom/.test(name))
    return Math.min(error, 0.014);
  return error;
}

// The visitor can look in any direction. Only the eye height differs by route,
// including stair approaches, camera easing and the close-up boarding camera.
const heights = { exterior: [3.3, 5.85], upper: [5, 8], sun: [7, 10.5], bow: [6, 8], guest: [2.7, 6] };
const start = -6 * basis.sx - basis.length / 2,
  step = basis.sx,
  bands = 42;

function faceNormal(position, a, b, c) {
  const ux = position[b] - position[a],
    uy = position[b + 1] - position[a + 1],
    uz = position[b + 2] - position[a + 2];
  const vx = position[c] - position[a],
    vy = position[c + 1] - position[a + 1],
    vz = position[c + 2] - position[a + 2];
  return [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx];
}

// In GPU-local coordinates z runs along the boat. The maximum plane distance
// over the eye box is linear in z. A front-facing triangle is therefore visible
// in a prefix, a suffix, every band, or none. Sorting these four cases lets each
// band use one contiguous draw; neighboring bands share their original faces.
function opaqueRanges(position, indices, profile) {
  const [low, high] = heights[profile],
    groups = Array.from({ length: 2 * bands - 1 }, () => []);
  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i] * 3,
      b = indices[i + 1] * 3,
      c = indices[i + 2] * 3;
    const [nx, ny, nz] = faceNormal(position, a, b, c);
    const lateral = nx >= 0 ? 4.5 : -4.5,
      vertical = (ny >= 0 ? high : low) - basis.seaReference;
    const margin = 0.02 * Math.hypot(nx, ny, nz);
    const distance =
      nx * (lateral - position[a]) + ny * (vertical - position[a + 1]) - nz * position[a + 2] + margin;
    let first = 0,
      last = bands - 1;
    // Use the forward end of the box for a positive normal and the aft end
    // for a negative one. Equality retains the face on both sides of a join.
    if (nz > 0) first = Math.max(0, Math.ceil((-distance / nz - start) / step) - 1);
    else if (nz < 0) last = Math.min(last, Math.floor((-distance / nz - start) / step));
    else if (distance < 0) continue;
    if (first > last) continue;
    const key = first > 0 ? bands - 1 + first : last;
    groups[key].push(indices[i], indices[i + 1], indices[i + 2]);
  }
  let count = 0;
  const offsets = groups.map((g) => {
    const from = count;
    count += g.length;
    return from;
  });
  offsets.push(count);
  const ranges = Array.from({ length: bands }, (_, i) => [offsets[i], offsets[bands + i] - offsets[i]]);
  return { indices: groups.flat(), ranges };
}

// Visitors on the gangway and inside the upper interior occupy small boxes.
// The low prefix is sufficient whenever the entire frustum points down (Y)
// or aft (Z), respectively. Sort the surviving opaque cover front-to-back.
const longitudinal = (x) => x * basis.sx - basis.length / 2;
const viewBoxes = {
  exterior: {
    axis: 1,
    box: [
      2.4 * basis.sy,
      3.3 - basis.seaReference,
      longitudinal(-4.7),
      3.85 * basis.sy,
      5.85 - basis.seaReference,
      longitudinal(2.65),
    ],
    eye: [3.1 * basis.sy, 5.15 - basis.seaReference, longitudinal(-1.7)],
  },
  upper: {
    axis: 2,
    box: [
      -1.8 * basis.sy,
      7.2 - basis.seaReference,
      longitudinal(13),
      1.8 * basis.sy,
      8 - basis.seaReference,
      longitudinal(18.65),
    ],
    eye: [0, 7.6 - basis.seaReference, longitudinal(15.5)],
  },
};

function localDraw(positions, indices, { axis, box, eye }) {
  const low = [],
    high = [];
  for (let i = 0; i < indices.length; i += 3) {
    const [ia, ib, ic] = indices.subarray(i, i + 3);
    const a = ia * 3,
      b = ib * 3,
      c = ic * 3;
    const [nx, ny, nz] = faceNormal(positions, a, b, c);
    const far =
      nx * (box[nx >= 0 ? 3 : 0] - positions[a]) +
      ny * (box[ny >= 0 ? 4 : 1] - positions[a + 1]) +
      nz * (box[nz >= 0 ? 5 : 2] - positions[a + 2]);
    if (far < -0.02 * Math.hypot(nx, ny, nz)) continue;
    const below =
      Math.min(positions[a + axis], positions[b + axis], positions[c + axis]) <= box[axis + 3] + 0.02;
    (below ? low : high).push(ia, ib, ic);
  }
  const sorted = (list) =>
    Array.from(orderOpaqueTriangles(positions, Uint32Array.from(list), eye, 0.25, true));
  return { axis, box, lowCount: low.length, indices: sorted(low).concat(sorted(high)) };
}

export function packWalkProfile(boarding, profile, audit, store) {
  let geometryBytes = 0;
  const batches = boarding.meshes.map((mesh) => {
    const geometry = mesh.geometry,
      glass = mesh.material.transparent;
    const submission = glass
      ? { indices: geometry.index.array }
      : opaqueRanges(geometry.attributes.position.array, geometry.index.array, profile);
    let localView;
    if (!glass && viewBoxes[profile]) {
      const view = localDraw(geometry.attributes.position.array, geometry.index.array, viewBoxes[profile]);
      localView = {
        axis: view.axis,
        box: view.box,
        first: submission.indices.length,
        count: view.indices.length,
        lowCount: view.lowCount,
      };
      submission.indices = submission.indices.concat(view.indices);
    }
    // Compact once over the union. The ranges reference the same vertices and
    // indices even when the camera moves across a band boundary.
    const vertexIds = [...new Set(submission.indices)],
      remap = new Map(vertexIds.map((id, i) => [id, i]));
    const attributes = {};
    for (const [name, attribute] of Object.entries(geometry.attributes)) {
      const { itemSize, array } = attribute,
        packed = new Float32Array(vertexIds.length * itemSize);
      vertexIds.forEach((id, i) =>
        packed.set(array.subarray(id * itemSize, (id + 1) * itemSize), i * itemSize),
      );
      attributes[name] = { ...store(packed), itemSize };
      geometryBytes += packed.byteLength;
    }
    const Type = vertexIds.length <= 65536 ? Uint16Array : Uint32Array;
    const packed = Type.from(submission.indices, (id) => remap.get(id));
    // Attributes and subsequent descriptors begin on four-byte boundaries.
    const padded = packed.byteLength % 4 ? new Type(packed.length + 1) : packed;
    if (padded !== packed) padded.set(packed);
    const indices = {
      ...store(padded, Type),
      length: packed.length,
      format: Type === Uint16Array ? 'uint16' : 'uint32',
    };
    geometryBytes += packed.byteLength;
    return {
      glass,
      attributes,
      indices,
      ...(localView && { localView }),
      ...(submission.ranges && { ranges: submission.ranges }),
    };
  });
  const [opaque, glass] = batches;
  const triangles =
    (glass.indices.length +
      Math.max(opaque.localView?.count ?? 0, ...opaque.ranges.map(([, count]) => count))) /
    3;
  return { batches, triangles, geometryBytes, audit, visibility: { start, step } };
}
