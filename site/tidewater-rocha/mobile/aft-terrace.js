import { indexFootprints } from './terrace-geometry.js?v=chair-fidelity-1';

const version = 'vr-detail-1';

export async function loadTerrace() {
  const responses = await Promise.all(['json', 'bin'].map(extension => fetch(new URL(`./aft-terrace.${extension}?v=${version}&geometry=cockpit-joins-v1`, import.meta.url))));
  if (responses.some(response => !response.ok)) throw Error('No se pudo cargar la terraza de popa');
  const [manifest, buffer] = await Promise.all([responses[0].json(), responses[1].arrayBuffer()]);
  if (manifest.version !== version) throw Error('Actualiza la página para cargar la terraza');
  const parts = manifest.parts.map(part => {
    const result = { ...part };
    for (const key of ['vertices', 'indices', 'light', 'surfaceTypes']) {
      const Type = key === 'indices' ? Uint32Array : Float32Array;
      const values = new Type(buffer, part[key].offset, part[key].length);
      result[key] = key === 'indices' ? Array.from(values) : values;
    }
    return result;
  });
  return { ...manifest, parts };
}

function onTriangle(x, y, [a, b, c]) {
  if (Math.abs((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])) < 1e-10) return false;
  const cross = (p, q) => (q[0] - p[0]) * (y - p[1]) - (q[1] - p[1]) * (x - p[0]);
  const s = [cross(a,b), cross(b,c), cross(c,a)];
  return s.every(v => v >= -1e-7) || s.every(v => v <= 1e-7);
}

export function connectTerrace(boarding, terrace, sternFloor = [], saloon = null) {
  const onBoarding = boarding.baseSafe ||= boarding.safe;
  const { end, y, layout } = boarding;
  const hitsFootprint=indexFootprints(terrace.collisionFootprints.concat(saloon?.collisionFootprints||[]));
  const obstacles = terrace.blockers.concat(terrace.parts
    .filter(part => (saloon ? ['boundary'] : ['boundary', 'frame', 'glazing']).includes(part.role))
    .map(({ bounds: b }) => [b[0],b[1],b[3],b[4]]));
  for (const part of boarding.parts || []) {
    if (!/^(?:port|starboard) cockpit seat swept gelcoat arm$|^starboard mooring (?:cabinet|molded stair return)$/.test(part.feature)) continue;
    const [x,y,,X,Y]=part.bounds;
    obstacles.push([x,y,X,Y]);
  }
  const cells = new Map();
  for (const t of [...terrace.floor, ...sternFloor, ...(saloon?.floor||[])]) {
    const xs=t.map(p=>p[0]), ys=t.map(p=>p[1]);
    for(let x=Math.floor(Math.min(...xs)*2);x<=Math.floor(Math.max(...xs)*2);x++)
      for(let y=Math.floor(Math.min(...ys)*2);y<=Math.floor(Math.max(...ys)*2);y++) {
        const key=x+','+y;
        if(!cells.has(key))cells.set(key,[]);
        cells.get(key).push(t);
      }
  }
  const pointOnFloor = (x, y) =>
    (x <= (saloon?.navigationEnd??8.4) && y >= -3.35 && y <= 3.45 &&
      (cells.get(Math.floor(x*2)+','+Math.floor(y*2)) || []).some(triangle => onTriangle(x,y,triangle))) ||
    sternFloor.some(triangle => onTriangle(x,y,triangle));
  // Test the union before applying body clearance, so the shared landing seam
  // stays walkable. Dense circumference probes also catch diagonal deck edges.
  boarding.safe = (x, across, radius = .14) => {
    if (x >= end-radius && x <= layout.gateEnd+radius &&
      Math.abs(across-(y-layout.railOffset)) <= radius+.025) return false;
    if (obstacles.some(b => x > b[0]-radius && x < b[2]+radius && across > b[1]-radius && across < b[3]+radius)) return false;
    if (hitsFootprint(x,across,radius)) return false;
    for (let i=0; i<16; i++) {
      const angle = i * Math.PI / 8;
      const px = x + radius * Math.cos(angle), py = across + radius * Math.sin(angle);
      if (!onBoarding(px,py,0) && !pointOnFloor(px,py)) return false;
    }
    return onBoarding(x,across,0) || pointOnFloor(x,across);
  };
  boarding.route = [boarding.room.spawn.slice(0,2), [3.65,3.1], [4.56,3.1], [4.59,1.21],
    [5.68,1.04], [5.78,.84], [5.80,.34], [6.18,.19], [7.90,.10], [8.18,.10]];
  if(saloon)boarding.route.push([9.2,.1],[10,.1]);
  boarding.walkEnd = boarding.route.at(-1)[0];
  boarding.arrivalLook = saloon ? [12.3,0,4.7] : [5.5,0,4.85];
  terrace.room = { ...terrace.room, name: 'Terraza de popa', displayName: 'Terraza de popa', spawn: [6.68,0,5.55], look: [8.45,.1,5.2] };
  return terrace;
}

export function routeSegments(route) {
  let length = 0;
  const segments = route.slice(1).map((b,i) => {
    const a = route[i], distance = Math.hypot(b[0]-a[0],b[1]-a[1]);
    const segment = { a,b,start:length,distance }; length += distance;
    return segment;
  });
  return { segments, length };
}

export function routePoint(route, distance) {
  const { segments, length } = routeSegments(route);
  distance = Math.max(0,Math.min(length,distance));
  const s = segments.find(s => s.start+s.distance >= distance) || segments.at(-1);
  const t = (distance-s.start)/s.distance;
  return { point:s.a.map((v,i) => v+(s.b[i]-v)*t), direction:s.b.map((v,i)=>(v-s.a[i])/s.distance) };
}

export function moveAlongRoute(nav, route, from, to) {
  const { segments } = routeSegments(route);
  const stops = segments.map(s => s.start).filter(d => d > Math.min(from,to) && d < Math.max(from,to));
  if(to < from) stops.reverse();
  stops.push(to);
  for(const distance of stops) {
    const {point} = routePoint(route,distance);
    nav.move(point[0]-nav.position[0],point[1]-nav.position[1]);
    if(Math.hypot(point[0]-nav.position[0],point[1]-nav.position[1])>.025)return false;
  }
  return true;
}

// Rejoin from any reachable point, without driving through stairs or furniture.
export function nearestRoutePoint(boarding, nav) {
  const { segments } = routeSegments(boarding.route);
  const candidates = segments.map(s => {
    const [x,y] = nav.position;
    const dx=s.b[0]-s.a[0], dy=s.b[1]-s.a[1];
    const t=Math.max(0,Math.min(1,((x-s.a[0])*dx+(y-s.a[1])*dy)/(s.distance*s.distance)));
    const point=[s.a[0]+dx*t,s.a[1]+dy*t];
    return { point, distance:s.start+s.distance*t, separation:Math.hypot(point[0]-x,point[1]-y) };
  }).sort((a,b)=>a.separation-b.separation);
  return candidates.find(({point,separation}) => {
    const count=Math.max(1,Math.ceil(separation/.05));
    for(let i=1;i<=count;i++) if(!boarding.safe(...point.map((v,k)=>nav.position[k]+(v-nav.position[k])*i/count),nav.radius))return false;
    return true;
  });
}
