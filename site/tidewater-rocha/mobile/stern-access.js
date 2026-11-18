import { convexHull, distanceToFootprint, indexFootprints } from './terrace-geometry.js?v=chair-fidelity-1';
import { createFlight, installFlightNavigation } from './stair-surfaces.js?v=chair-fidelity-1';

// Source coordinates: x toward the bow, y to port, z up. All access surfaces
// come from the same parts that are rendered in the full and isolated yacht.
export function topTriangles(part, height = part.bounds[5]) {
  const triangles = [];
  for (let i = 0; i < part.indices.length; i += 3) {
    const vertices = part.indices.slice(i, i + 3).map(index =>
      Array.from(part.vertices.slice(index * 6, index * 6 + 3)));
    if (vertices.every(v => Math.abs(v[2] - height) < 1e-6)) {
      const polygon = convexHull(vertices.map(v => v.slice(0, 2)));
      if (polygon.length >= 3) triangles.push(polygon);
    }
  }
  return triangles;
}

export function onSurface(x, y, polygons, joint = 1e-6) {
  return polygons.some(polygon => distanceToFootprint(x, y, polygon) <= joint);
}

export function describeSternAccess(parts) {
  const part = name => parts.find(p => p.feature === name);
  const upper = part('aft teak floor following transom rear skin');
  const platform = part('full width inset teak swim platform');
  const treads = Array.from({length:6}, (_, i) => {
    const tread = part(`transom starboard teak tread ${i + 1}`);
    const body = part(`transom starboard pale step ${i + 1}`);
    const [x0, y0, , x1, y1] = body.bounds;
    return {id:tread.id, height:tread.bounds[5], surface:topTriangles(tread),
      footprint:[[x0,y0],[x1,y0],[x1,y1],[x0,y1]], bounds:body.bounds};
  });
  const start = treads[0].bounds[0], end = treads.at(-1).bounds[3] + .26;
  const width = Math.min(...treads.map(t => t.bounds[4] - t.bounds[1]));
  const y = (treads[0].bounds[1] + treads[0].bounds[4]) / 2;
  const sections = treads.map(t => [[t.bounds[0],t.bounds[1]],[t.bounds[0],t.bounds[4]]]);
  const last = treads.at(-1).bounds;
  sections.push([[last[3],last[1]],[last[3],last[4]]], [[end,last[1]],[end,last[4]]]);
  const route = {id:'starboard-swim', name:'Escalera de estribor', lower:'SP', upper:'MD',
    path:[[start,y],[end,y]], width, sectionWidth:width, steps:7, inside:false,
    distances:[0,end-start], length:end-start, treadSections:sections,
    stepDistances:sections.map(section => section[0][0]-start), sourceIDs:treads.map(t => t.id)};
  return {starboard:{route, treads, upperFloor:topTriangles(upper), platformFloor:topTriangles(platform),
    upperHeight:upper.bounds[5], lowerHeight:platform.bounds[5],
    room:{id:'swim-platform', deck:'SP', name:'Plataforma de baño', displayName:'Plataforma de baño',
      spawn:[.35,-3.03,platform.bounds[5]+1.6], look:[1.8,-3.03,3.55]}}};
}

function clipHeight(vertices, height, above) {
  const result = [];
  for (let i=0; i<vertices.length; i++) {
    const a=vertices[i], b=vertices[(i+1)%vertices.length];
    const ia=above ? a[2]>=height : a[2]<=height, ib=above ? b[2]>=height : b[2]<=height;
    if (ia) result.push(a);
    if (ia !== ib) {
      const t=(height-a[2])/(b[2]-a[2]);
      result.push(a.map((v,k)=>v+(b[k]-v)*t));
    }
  }
  return result;
}

// Clip before projection: a raked transom or overhead gangway must block the
// body at its actual height, not its entire 2-D bounding box.
function bodyObstacles(parts, height) {
  const footprints=[];
  for (const part of parts) {
    if(part.context)continue;
    const b=part.bounds;
    const name=part.feature || part.name;
    // Permit the last normal stair rise into its support floor, while retaining
    // shin-level collisions against the transom, rails and other solid objects.
    const foot=height+(b[5]<=height+.19 && /floor|landing final riser/.test(name) ? .19 : .035);
    if (b[5] <= foot || b[2] >= height+1.65 || b[0]>4.2 ||
      /transom starboard (pale step|teak tread)/.test(part.feature || part.name)) continue;
    const points=[];
    for (let i=0; i<part.indices.length; i+=3) {
      const triangle=part.indices.slice(i,i+3).map(index=>Array.from(part.vertices.slice(index*6,index*6+3)));
      points.push(...clipHeight(clipHeight(triangle,foot,true),height+1.65,false).map(p=>p.slice(0,2)));
    }
    const polygon=convexHull(points);
    if(polygon.length>=3)footprints.push({polygon});
  }
  return indexFootprints(footprints);
}

export function connectSternAccess(model) {
  const {boarding,transom,terrace}=model;
  const access=transom.access.starboard;
  const parts=[...transom.parts,...boarding.parts,...terrace.parts];
  const obstacles=new Map([access.lowerHeight,access.upperHeight,...access.treads.map(t=>t.height)]
    .map(height=>[height.toFixed(6),bodyObstacles(parts,height)]));
  const clearance=(x,y,height,radius)=>!obstacles.get(height.toFixed(6))(x,y,radius);
  const probes=(x,y,radius,test)=>test(x,y) && Array.from({length:16},(_,i)=>i*Math.PI/8)
    .every(angle=>test(x+radius*Math.cos(angle),y+radius*Math.sin(angle)));
  const lowerX=access.route.path[0][0];
  const underStair=indexFootprints(access.treads.map(t=>({polygon:t.footprint})));
  access.platformSafe=(x,y,radius=.14)=>
    // The stair itself is entered only through its lower endpoint.
    !(x>lowerX+1e-7 && underStair(x,y,radius)) &&
    clearance(x,y,access.lowerHeight,radius) &&
    probes(x,y,radius,(px,py)=>onSurface(px,py,access.platformFloor));
  const support=[...access.treads.map(t=>t.footprint),...access.upperFloor,...access.platformFloor];
  access.stairSafe=(x,y,height,radius=.14)=>
    clearance(x,y,height,radius) && probes(x,y,radius,(px,py)=>onSurface(px,py,support,.006));
  const deckSafe=boarding.safe;
  access.deckClearance=(x,y,radius=.14)=>clearance(x,y,access.upperHeight,radius);
  boarding.safe=(x,y,radius=.14)=>deckSafe(x,y,radius) && access.deckClearance(x,y,radius);
  return access;
}

export function configureSternWalk(walk) {
  const {boarding,terrace,sternAccess:access}=walk.model, nav=walk.nav;
  nav.routes=[access.route];
  nav.floorSafe=(x,y,deck=nav.deck)=>deck==='SP' ? access.platformSafe(x,y,nav.radius) :
    deck==='MD' && boarding.safe(x,y,nav.radius);
  const landing={id:'stern-landing',deck:'MD',name:'Desembarco de popa',displayName:'Desembarco de popa'};
  nav.location=()=>nav.deck==='SP' ? access.room : nav.position[0]<boarding.end ? boarding.room :
    nav.position[0]<3.8 ? landing : terrace.room;
  // Mobile assets deliberately have no full-yacht navigation grid.
  nav.nearest=(x,y,deck=nav.deck)=>{
    const rooms=[boarding.room,terrace.room,access.room].filter(room=>room.deck===deck && nav.floorSafe(...room.spawn.slice(0,2),deck));
    rooms.sort((a,b)=>Math.hypot(x-a.spawn[0],y-a.spawn[1])-Math.hypot(x-b.spawn[0],y-b.spawn[1]));
    if(!rooms.length)throw Error('No walkable floor on '+deck);
    return rooms[0].spawn.slice(0,2);
  };
  access.flight=createFlight(access.route,walk.model.asset.data.levels,
    access.treads.map(t=>({id:t.id,height:t.height,polygons:[t.footprint],sourceIDs:[t.id]})),
    {lower:access.platformFloor,upper:access.upperFloor},
    (x,y,height,radius)=>access.stairSafe(x,y,height,radius));
  installFlightNavigation(nav,[access.flight]);
}
