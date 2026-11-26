import {cockpitPlinthOutline} from './aft-cockpit-stair.js?v=cockpit-stair-vr-1';

// The port service stair passes underneath the exterior cockpit stair.
export const serviceStairStraightEnd = 8.1;
const deckZ = 3.95;
const deckVertex = (x, y) => ({point: [x, y, deckZ], normal: [0, 0, 1]});
const rectangle = (x, y, X, Y) => [[x, y], [X, y], [X, Y], [x, Y]];

function faceVertices(part, indices) {
  return indices.map(index => part.vertices.slice(6 * index, 6 * index + 6));
}

function roofCrossing(roofs) {
  for (const roof of roofs) {
    for (let i = 0; i < roof.indices.length; i += 3) {
      const corners = faceVertices(roof, roof.indices.slice(i, i + 3));
      if (corners[0][5] <= 0) continue;
      for (let j = 0; j < 3; j++) {
        const a = corners[j], b = corners[(j + 1) % 3];
        if ((a[2] < deckZ) !== (b[2] < deckZ)) {
          return a[0] + (deckZ - a[2]) * (b[0] - a[0]) / (b[2] - a[2]);
        }
      }
    }
  }
  throw Error('Cockpit service ceiling does not meet the main deck');
}

function clipAtDeck(corners, above) {
  const result = [];
  for (let i = 0; i < corners.length; i++) {
    const a = corners[i], b = corners[(i + 1) % corners.length];
    if (above ? a[2] >= deckZ : a[2] <= deckZ) result.push(a);
    if ((a[2] - deckZ) * (b[2] - deckZ) < 0) {
      const t = (deckZ - a[2]) / (b[2] - a[2]);
      result.push(a.map((value, j) => value + t * (b[j] - value)));
    }
  }
  return result;
}

function appendFace(mesh, corners) {
  if (corners.length < 3) return;
  const offset = mesh.vertices.length / 6;
  for (const vertex of corners) mesh.vertices.push(...vertex);
  for (let j = 2; j < corners.length; j++) mesh.indices.push(offset, offset + j - 1, offset + j);
}

// The inner lip of the lower stair casing flares into the cockpit flight in
// the source model. Bring the lip in next to the first treads. Below the lip
// the footwell keeps the full width of the original service stair.
function fitServiceLip(corners) {
  return corners.map(vertex => {
    const [x, y, z, nx, ny, nz] = vertex;
    const weight = Math.max(0, Math.min(1, (x - 5.48) / .37, (7.12 - x) / .37, (z - deckZ + .10) / .13));
    if (!weight || y <= 1.80) return vertex;
    const fittedY = 1.80 + .30 * (y - 1.80);
    const normalScale = 1 - .70 * weight;
    const length = Math.hypot(nx, ny / normalScale, nz);
    return [x, y + weight * (fittedY - y), z, nx / length, ny / normalScale / length, nz / length];
  });
}

// The underside and inner walls belong to the white service lining. Split the
// outside at deck height for the timber cap and dark cheek visible above.
function splitCladding(part, straightStart, straightEnd, centreY) {
  const lining = {vertices: [], indices: []};
  const skin = {vertices: [], indices: []};
  const cap = {vertices: [], indices: []};
  const roof = part.feature === 'sloping white service stair ceiling';
  for (let i = 0; i < part.indices.length; i += 3) {
    const corners = faceVertices(part, part.indices.slice(i, i + 3));
    const [x, y, , nx, ny, nz] = corners[0];
    // Adjacent panels along the straight flight already share this cross section.
    if (roof && Math.abs(nx) > .999999 && x > straightStart + 1e-7 && x < straightEnd - 1e-7) continue;
    const outside = nz > .1 || (Math.abs(nz) < .1 && (roof || ny * (y - centreY) > 0));
    if (!outside || corners.some(v => v[0] > straightEnd + 1e-7) || corners.every(v => v[2] <= deckZ)) {
      appendFace(lining, fitServiceLip(corners));
    } else {
      appendFace(nz > .1 ? cap : skin, fitServiceLip(clipAtDeck(corners, true)));
      appendFace(lining, fitServiceLip(clipAtDeck(corners, false)));
    }
  }
  return {lining, skin, cap};
}

export function finishCockpitStairFoot(detail, serviceParts, straightCut, geometry) {
  const {replace, merge, subtract, surface} = geometry;
  const deckParts = detail.replacements.get('MD_DCK_001');
  const slab = deckParts.find(part => part.id.endsWith('/cockpit-teak')) ?? deckParts[0];
  const tread = detail.replacements.get('MD_STA_013').find(part => part.feature === 'tread 1 timber border');
  const [start, inner, end, outer] = straightCut;
  const roofs = serviceParts.filter(part => part.feature === 'sloping white service stair ceiling');
  const crossing = roofCrossing(roofs);
  const [x, y, , X, Y] = tread.bounds, margin = .062;
  const outline = cockpitPlinthOutline(x - margin, X + margin, (y + Y) / 2, Y - y + 2 * margin, .111 + margin);
  const approach = surface(rectangle(start, inner, crossing, outer), deckVertex);
  const exposed = rectangle(crossing, inner, end, outer);

  // Fill the portion of the deck that the fitted lip now clears. Its inner
  // edge rests on the service lining, clear of the lower stair's footwell.
  const returnAt = (x, y) => fitServiceLip([[x,y,deckZ,0,0,1]])[0][1];
  const returnXs = [crossing, 5.61, 5.97, 6.32, 6.68, 7.03, 7.12];
  const lidReturn = returnXs.slice(1).map((x, i) => {
    const startX = returnXs[i];
    return surface([[startX,returnAt(startX,outer)],[x,returnAt(x,outer)],[x,outer],[startX,outer]],deckVertex);
  });

  // Only partition horizontal deck triangles that can meet the inlaid margin.
  const local = [], retained = [];
  for (let i = 0; i < slab.indices.length; i += 3) {
    const face = slab.indices.slice(i, i + 3);
    const points = faceVertices(slab, face);
    const touches = points.every(v => Math.abs(v[2] - deckZ) < 1e-5 && v[5] > .5)
      && !points.every(v => v[0] < x - margin) && !points.every(v => v[0] > X + margin)
      && !points.every(v => v[1] < y - margin) && !points.every(v => v[1] > Y + margin);
    (touches ? local : retained).push(...face);
  }
  const field = subtract(merge([{vertices: slab.vertices, indices: local}, approach, ...lidReturn]), [outline]);
  replace(slab, merge([{vertices: slab.vertices, indices: retained}, field]));
  const rim = {...slab, id: slab.id + '/stair-foot-margin', feature: 'inlaid teak cockpit stair margin',
    materialID: 'M43', finish: [0xa48a6f, .75, 0, 2]};
  replace(rim, subtract(surface(outline, deckVertex), [exposed]));
  deckParts.push(rim);

  const walls = serviceParts.filter(part => part.feature === 'profiled white service stair enclosure');
  for (const part of [...roofs, ...walls]) {
    const {lining, skin, cap} = splitCladding(part, start, end, (inner + outer) / 2);
    replace(part, lining);
    for (const [name, mesh, material, finish] of [
      ['cheek', skin, 'M47', [0x25232a, .21, .62, 5]],
      ['capping', cap, 'M47', [0x25232a, .21, .62, 5]],
    ]) {
      if (!mesh.indices.length) continue;
      const exterior = {...part, id: part.id + '/cockpit-' + name, deck: 'MD', interior: false,
        feature: 'cockpit stair exterior ' + name, materialID: material, finish};
      replace(exterior, mesh);
      detail.additions.push(exterior);
      serviceParts.push(exterior);
    }
  }
  return crossing;
}
