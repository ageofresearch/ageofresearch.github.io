// Bake only MD_R01 and its adjoining architecture. The phone never builds the full yacht.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { buildYachtGeometry } from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { convexHull, distanceToFootprint } from '../site/tidewater-rocha/mobile/terrace-geometry.js';

const root = new URL('../site/tidewater-rocha/', import.meta.url);
const boundsOf = vertices => [0, 1, 2].map(k => Math.min(...vertices.filter((_, i) => i % 6 === k)))
  .concat([0, 1, 2].map(k => Math.max(...vertices.filter((_, i) => i % 6 === k))));

// Clip triangles, interpolating normals; keep the source deck's real stair openings.
export function clipGeometry(source, bounds) {
  const vertices = [], indices = [];
  for (let i = 0; i < source.indices.length; i += 3) {
    let polygon = source.indices.slice(i, i + 3).map(index => source.vertices.slice(index * 6, index * 6 + 6));
    for (let k = 0; k < 6 && polygon.length; k++) {
      const axis = k % 3, sign = k < 3 ? 1 : -1, plane = bounds[k];
      const next = [];
      for (let j = 0; j < polygon.length; j++) {
        const a = polygon[j], b = polygon[(j + 1) % polygon.length];
        const da = sign * (a[axis] - plane), db = sign * (b[axis] - plane);
        if (da >= -1e-8) next.push(a);
        if ((da >= 0) !== (db >= 0)) {
          const t = da / (da - db);
          next.push(a.map((v, n) => v + (b[n] - v) * t));
        }
      }
      polygon = next;
    }
    for (let j = 1; j < polygon.length - 1; j++) {
      const triangle = [polygon[0], polygon[j], polygon[j + 1]];
      const u = triangle[1].slice(0,3).map((v,k)=>v-triangle[0][k]);
      const v = triangle[2].slice(0,3).map((v,k)=>v-triangle[0][k]);
      if (Math.hypot(u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]) < 1e-10) continue;
      const base = vertices.length / 6;
      for (const vertex of triangle) vertices.push(...vertex);
      indices.push(base, base + 1, base + 2);
    }
  }
  return { vertices, indices };
}

export function subdivide(source, maxEdge = .7) {
  const vertices = [], indices = [];
  function triangle(v) {
    const lengths = v.map((a, i) => Math.hypot(...a.slice(0, 3).map((n, k) => n - v[(i + 1) % 3][k])));
    const edge = lengths.indexOf(Math.max(...lengths));
    if (lengths[edge] > (typeof maxEdge === 'function' ? maxEdge(v) : maxEdge)) {
      const a = v[edge], b = v[(edge + 1) % 3], c = v[(edge + 2) % 3];
      const midpoint = a.map((n, k) => (n + b[k]) / 2);
      triangle([a, midpoint, c]); triangle([midpoint, b, c]);
    } else {
      const base = vertices.length / 6;
      for (const a of v) vertices.push(...a);
      indices.push(base, base + 1, base + 2);
    }
  }
  for (let i = 0; i < source.indices.length; i += 3)
    triangle(source.indices.slice(i, i + 3).map(index => source.vertices.slice(index * 6, index * 6 + 6)));
  return { vertices, indices };
}

function footprint(parts) {
  return convexHull(parts.flatMap(part => Array.from({length:part.vertices.length/6},
    (_,i) => part.vertices.slice(i*6,i*6+2))));
}

function furnitureGroup(part) {
  if (part.anchor === 'MD_FUR_003') return 'pouf';
  if (part.anchor === 'MD_FUR_008') return 'wet-bar';
  const chair = part.feature.match(/^director chair (\d) /);
  if (!chair) throw Error(`Unknown terrace chair: ${part.id}`);
  return 'chair-'+chair[1];
}

export function contactShade(x, y, footprints) {
  const distance=Math.min(...footprints.map(({polygon}) => distanceToFootprint(x,y,polygon)));
  const t=Math.min(1,distance/.3);
  return 1-.22*(1-t*t*(3-2*t));
}

export function containsTriangle(x, y, triangle) {
  const [a, b, c] = triangle;
  if (Math.abs((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])) < 1e-10) return false;
  const cross = (p, q) => (q[0] - p[0]) * (y - p[1]) - (q[1] - p[1]) * (x - p[0]);
  const signs = [cross(a, b), cross(b, c), cross(c, a)];
  return signs.every(v => v >= -1e-7) || signs.every(v => v <= 1e-7);
}

function topTriangles(part, height) {
  const result = [];
  for (let i = 0; i < part.indices.length; i += 3) {
    const triangle = part.indices.slice(i, i + 3).map(index => part.vertices.slice(index * 6, index * 6 + 6));
    if (triangle.every(v => Math.abs(v[2] - height) < .002 && v[5] > .5)) result.push(triangle.map(v => v.slice(0, 2)));
  }
  return result;
}

export async function buildTerrace() {
  const [json, buffer] = await Promise.all(['model.json', 'model.bin'].map(name => readFile(new URL('rocha/luz-de-mar/' + name, root))));
  const data = JSON.parse(json);
  const model = buildYachtGeometry({ data, binary: buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) }, 0,
    { mtuEngines: false, seaStrainers: false });
  const parts = [];
  function add(source, bounds, role) {
    let geometry = clipGeometry(source, bounds);
    if (!geometry.indices.length) return;
    if (role === 'floor' || role === 'roof' || role === 'hull') geometry = subdivide(geometry);
    parts.push({ id: source.id, feature: source.feature, role, materialID: source.materialID,
      finish: source.finish, glass: !!source.glass, smokedGlass: !!source.glass,
      ...geometry, bounds: boundsOf(geometry.vertices) });
  }
  const replacements = model.interiorDetail.replacements;
  const region = [3.3, -3.8, 3.83, 8.5, 3.8, 6.12];
  for (const part of replacements.get('MD_DCK_001')) {
    // The existing boarding landing already owns this part of the deck.
    add(part, [3.3, -3.8, 3.83, 3.8, 2.48, 3.96], 'floor');
    add(part, [3.8, -3.8, 3.83, 8.5, 3.8, 3.96], 'floor');
  }
  for (const part of replacements.get('UD_DCK_001')) add(part, [3.2, -3.8, 5.87, 8.5, 3.8, 6.01], 'roof');
  for (const part of replacements.get('HULL_HUL_001')) add(part, region, 'hull');
  // Keep the visible stair assembly, including its upper rail returns. The
  // terrace ceiling's height is not a valid clipping plane for a handrail.
  for (const part of replacements.get('MD_STA_013')) add(part, [3.3,-3.8,3.83,8.5,3.8,7.05], 'stairs');
  for (const part of replacements.get('MD_GLA_001')) add(part, region, 'glazing');
  for (const part of model.exterior.parts) {
    if (part.feature === 'aft sliding glazing frames and mullions') add(part, region, 'frame');
    if (part.id.startsWith('MD/boarding-route/') && /coaming|bulwark|recess (lower ledge|polished support)|cap above/.test(part.feature)) add(part, region, 'boundary');
  }
  const service = [...model.interiorDetail.objects, ...model.machinery.parts];
  const seen = new Set();
  for (const part of service) {
    if (seen.has(part.id)) continue;
    seen.add(part.id);
    if (/profiled white service stair enclosure|sloping white service stair ceiling|dark sidewall around D1/.test(part.feature)) add(part, region, 'enclosure');
  }
  const furniture=model.exterior.parts.filter(part => ['MD_FUR_003','MD_FUR_007','MD_FUR_008'].includes(part.anchor));
  if (furniture.length !== 25 || new Set(furniture.map(p=>p.id)).size !== 25) throw Error('The source terrace furniture changed; review the selected assemblies');
  for (const source of furniture) {
    // These complete assemblies fit inside MD_R01: keep source topology and poses.
    parts.push({id:source.id, feature:source.feature, role:'furniture', groupID:furnitureGroup(source),
      sourceID:source.anchor, materialID:source.materialID, finish:source.finish, glass:false,
      vertices:source.vertices, indices:source.indices, bounds:source.bounds});
  }
  const furnitureFootprints=Object.entries(Object.groupBy(furniture,furnitureGroup))
    .map(([id,group])=>({id:'furniture/'+id,polygon:footprint(group)}));
  // The broad first-delivery stair box would close the actual passage beside
  // chair 3. Project only solid geometry at the walking body's height instead.
  const collisionFootprints=furnitureFootprints.concat(parts.filter(p=>['stairs','enclosure'].includes(p.role)).flatMap(part=>{
    const body=clipGeometry(part,[3,-4,4.04,9,4,5.65]);
    const polygon=footprint([body]);
    return polygon.length>=3 ? [{id:part.id,polygon}] : [];
  }));
  for (const part of parts.filter(p=>p.role==='floor')) {
    Object.assign(part,subdivide(part,triangle=>{
      if(!triangle.every(v=>v[5]>.5))return .7;
      const center=[0,1].map(k=>triangle.reduce((sum,v)=>sum+v[k],0)/3);
      const near=[...triangle,center].some(p=>furnitureFootprints.some(f=>distanceToFootprint(p[0],p[1],f.polygon)<.5));
      return near ? .23 : .7;
    }));
  }
  const floor = parts.filter(p => p.role === 'floor').flatMap(p => topTriangles(p, 3.95));
  const roof = parts.filter(p => p.role === 'roof').flatMap(p => topTriangles(p, 6));
  for (const part of parts) {
    part.light = []; part.surfaceTypes = [];
    for (let i = 0; i < part.vertices.length; i += 6) {
      const [x, y, z, , , nz] = part.vertices.slice(i, i + 6);
      // Static soft canopy occlusion, including its real opening. Five sky
      // samples retain edge light and warm indirect fill without a shadow pass.
      const reach = Math.max(0, 5.88 - z) * .18;
      const cover = z < 5.88 ? [[0,0],[-reach,0],[reach,0],[0,-reach],[0,reach]]
        .filter(([dx,dy]) => roof.some(t => containsTriangle(x + dx, y + dy, t))).length / 5 : 0;
      const contact=part.role==='floor' && nz>.5 ? contactShade(x,y,furnitureFootprints) : 1;
      part.light.push((.96 - .38 * cover)*contact);
      part.surfaceTypes.push(part.role === 'floor' && nz > .5 ? 1 : part.role === 'roof' && nz < -.5 ? 9 : part.finish[3]);
    }
  }
  const chunks = [];
  let offset = 0;
  const manifestParts = parts.map(part => {
    const meta = { ...part };
    for (const key of ['vertices', 'indices', 'light', 'surfaceTypes']) {
      const array = key === 'indices' ? Uint32Array.from(part[key]) : Float32Array.from(part[key]);
      const chunk = Buffer.from(array.buffer);
      meta[key] = { offset, length: array.length }; offset += chunk.length; chunks.push(chunk);
    }
    return meta;
  });
  model.dispose();
  return { binary: Buffer.concat(chunks), manifest: {
    version: 'gangway-teak-1', sourceSHA256: createHash('sha256').update(json).update(buffer).digest('hex'),
    room: data.rooms.find(r => r.id === 'MD_R01'), parts: manifestParts, floor,
    triangles: parts.reduce((sum, p) => sum + p.indices.length / 3, 0),
    // The upper/service stairs and the saloon are outside this first walkable zone.
    blockers: [[3.0,-2.3,4.17,2.3]], collisionFootprints,
  } };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { manifest, binary } = await buildTerrace();
  await writeFile(new URL('mobile/aft-terrace.json', root), JSON.stringify(manifest));
  await writeFile(new URL('mobile/aft-terrace.bin', root), binary);
  console.log(`${manifest.parts.length} terrace parts, ${manifest.triangles} triangles, ${binary.length} bytes`);
}
