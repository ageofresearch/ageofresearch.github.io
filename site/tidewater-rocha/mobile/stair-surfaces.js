import {configureAccessFloor} from './bridge-access-geometry.js?v=tour-fidelity-1';
import {configureGuestFloor} from './guest-access-geometry.js?v=tour-fidelity-1';
import {configureBowFloor} from './bow-geometry.js?v=tour-fidelity-1';
import {configureInteriorFloor} from './upper-interior-geometry.js?v=tour-fidelity-1';
import {configureBridgeFloor} from './bridge-geometry.js?v=tour-fidelity-1';
import {describeSunFloor,supportedFloor} from './sun-deck-geometry.js?v=tour-fidelity-1';
import { convexHull, distanceToFootprint, indexFootprints } from './terrace-geometry.js?v=tour-fidelity-1';

// Source coordinates throughout. Display normalization is applied only by the renderer.
// A small joint allowance covers the modeled bevels, never an invented landing.
const JOINT = .008, EPS = 1e-7;
const inside = (x,y,polygons) => polygons.some(p=>distanceToFootprint(x,y,p)<=JOINT);
const ring = Array.from({length:32},(_,i)=>[Math.cos(i*Math.PI/16),Math.sin(i*Math.PI/16)]);
const bounds = points => [0,1,2].map(k=>Math.min(...points.map(p=>p[k])))
  .concat([0,1,2].map(k=>Math.max(...points.map(p=>p[k]))));

function clipPolygon(polygon,distance) {
  const output=[];
  for(let i=0;i<polygon.length;i++) {
    const a=polygon[i],b=polygon[(i+1)%polygon.length],da=distance(a),db=distance(b);
    if(da>=-EPS)output.push(a);
    if((da>=0)!==(db>=0))output.push(a.map((v,k)=>v+(b[k]-v)*da/(da-db)));
  }
  return output;
}
function landingPolygons(polygons,route,end,halfPlane=true) {
  const p=end?route.path.at(-1):route.path[0],q=end?route.path.at(-2):route.path[1];
  return polygons.map(polygon=>{
    let result=polygon;
    for(const k of [0,1])for(const sign of [-1,1])result=clipPolygon(result,v=>.8-sign*(v[k]-p[k]));
    if(halfPlane)result=clipPolygon(result,v=>(v[0]-p[0])*(p[0]-q[0])+(v[1]-p[1])*(p[1]-q[1]));
    return convexHull(result);
  }).filter(p=>p.length>=3);
}

export function surfaceTriangles(part, height=part.bounds[5], tolerance=.00001) {
  const result=[];
  for(let i=0;i<part.indices.length;i+=3) {
    const vertices=Array.from(part.indices.slice(i,i+3),k=>Array.from(part.vertices.slice(k*6,k*6+6)));
    const [a,b,c]=vertices, up=(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
    if(up>1e-12 && vertices.every(v=>Math.abs(v[2]-height)<=tolerance)) {
      const polygon=convexHull(vertices.map(v=>v.slice(0,2)));
      if(polygon.length>=3)result.push(polygon);
    }
  }
  return result;
}

function project(route,x,y) {
  let result;
  for(let i=1;i<route.path.length;i++) {
    const a=route.path[i-1], b=route.path[i], dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);
    const t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(length*length)));
    const distance=Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy);
    if(!result || distance<result.distance)result={distance,d:route.distances[i-1]+t*length};
  }
  return result;
}

function clip(vertices,height,above) {
  const output=[];
  for(let i=0;i<vertices.length;i++) {
    const a=vertices[i],b=vertices[(i+1)%vertices.length];
    const ia=above?a[2]>=height:a[2]<=height,ib=above?b[2]>=height:b[2]<=height;
    if(ia)output.push(a);
    if(ia!==ib) {const t=(height-a[2])/(b[2]-a[2]);output.push(a.map((v,k)=>v+(b[k]-v)*t));}
  }
  return output;
}

export function renderedParts(model) {
  const detail=model.interiorDetail, replacements=detail.replacements;
  const parts=[...new Set([...replacements.values()].flat().concat(detail.additions,
    model.exterior?.parts||[],model.machinery?.parts||[],model.boarding?.parts||[]))];
  const {data,binary}=model.asset;
  for(const mesh of data.meshes) {
    if(replacements.has(mesh.id)||model.exterior?.consumed.has(mesh.id))continue;
    parts.push({...mesh,bounds:mesh.bbox,
      vertices:new Float32Array(binary,mesh.vByte,mesh.vCount*6),
      indices:new Uint16Array(binary,data.vertexBytes+mesh.iByte,mesh.iCount)});
  }
  const ids=new Set();
  return parts.filter(p=>{if(!p?.vertices||!p?.indices || p.id && ids.has(p.id))return false;if(p.id)ids.add(p.id);return true;}).map(p=>{
    p=p.bounds?p:{...p,bounds:p.bbox??bounds(Array.from({length:p.vertices.length/6},(_,i)=>Array.from(p.vertices.slice(i*6,i*6+3))))};
    // The full renderer fits these source objects below the UD slab. Extraction
    // and body/head collision must see that same final geometry, exactly once.
    const fit=model.displayFits?.get(p.anchor||p.id);
    if(!fit)return p;
    const vertices=Array.from(p.vertices),box=p.bounds.slice();
    for(let i=0;i<vertices.length;i+=6){
      vertices[i+2]=fit.base+(vertices[i+2]-fit.base)*fit.scale;
      vertices[i+5]/=fit.scale;
      const length=Math.hypot(...vertices.slice(i+3,i+6));
      if(length)for(let k=3;k<6;k++)vertices[i+k]/=length;
    }
    for(const k of [2,5])box[k]=fit.base+(box[k]-fit.base)*fit.scale;
    return {...p,vertices,bounds:box,displayFit:fit.version};
  });
}

// Remove only geometry occupying an already modeled stair volume. No new route,
// dimensions or photographic assumptions are introduced by these local cuts.
function subtractPrisms(part,prisms) {
  const vertices=[],indices=[];
  for(let i=0;i<part.indices.length;i+=3) {
    let polygons=[Array.from(part.indices.slice(i,i+3),k=>Array.from(part.vertices.slice(k*6,k*6+6)))];
    for(const {polygon,low,high} of prisms) {
      const planes=[v=>v[2]-low,v=>high-v[2],...polygon.map((a,i)=>{
        const b=polygon[(i+1)%polygon.length];return v=>(b[0]-a[0])*(v[1]-a[1])-(b[1]-a[1])*(v[0]-a[0]);
      })];
      const outside=[];
      for(let pending of polygons) {
        // A touching/coplanar triangle has no volume inside this prism. Keeping
        // it once also prevents exponential fragment growth at shared tread
        // edges when a collision copy is cut against individual support tops.
        if(planes.some(plane=>pending.every(v=>plane(v)<=EPS))) {outside.push(pending);continue;}
        for(const plane of planes) {
          const fragment=clipPolygon(pending,v=>-plane(v));
          if(fragment.length>=3)outside.push(fragment);
          pending=clipPolygon(pending,plane);
          if(pending.length<3)break;
        }
      }
      polygons=outside;
    }
    for(const polygon of polygons)for(let k=1;k<polygon.length-1;k++) {
      const tri=[polygon[0],polygon[k],polygon[k+1]],a=tri[1].map((v,k)=>v-tri[0][k]),b=tri[2].map((v,k)=>v-tri[0][k]);
      if(Math.hypot(a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0])<1e-10)continue;
      const base=vertices.length/6;tri.forEach(v=>vertices.push(...v));indices.push(base,base+1,base+2);
    }
  }
  const points=Array.from({length:vertices.length/6},(_,i)=>vertices.slice(i*6,i*6+3));
  Object.assign(part,{vertices,indices,bounds:bounds(points),triangles:indices.length/3});
}

export function repairStairIntersections(detail,exterior,asset) {
  if(!detail?.replacements)return;
  const parts=[...new Set([...detail.replacements.values()].flat().concat(detail.additions,exterior?.parts||[]))];
  const footprint=p=>convexHull(Array.from({length:p.vertices.length/6},(_,i)=>p.vertices.slice(i*6,i*6+2)));
  const service=parts.filter(p=>/^brown service tread /.test(p.feature||''));
  if(service.length) {
    const prisms=service.map(p=>({polygon:footprint(p),low:p.bounds[5],high:5.8}));
    for(const p of parts.filter(p=>/^(smoked aft saloon sliding panels|aft sliding glazing frames and mullions)$/.test(p.feature||'')))
      subtractPrisms(p,prisms);
  }
  const guest=parts.filter(p=>p.semanticParent==='stairs/guest' && /rounded timber edge/.test(p.feature));
  const mesh=asset.data.meshes.find(m=>m.id==='LD_GLA_002');
  if(guest.length && mesh) {
    const part={...mesh,anchor:mesh.id,materialID:'M30',glass:true,bounds:mesh.bbox,
      feature:'shower screen fitted below guest stair soffit',
      vertices:Array.from(new Float32Array(asset.binary,mesh.vByte,mesh.vCount*6)),
      indices:Array.from(new Uint16Array(asset.binary,asset.data.vertexBytes+mesh.iByte,mesh.iCount))};
    subtractPrisms(part,guest.map(p=>({polygon:footprint(p),low:p.bounds[2]-.005,high:asset.data.levels.MD})));
    detail.replacements.set(mesh.id,[part]);
  }
}

export function obstacles(parts,ownParts,box,{includeVerticalFaces=false}={}) {
  const triangles=[];
  for(const part of parts) {
    const b=part.bounds;
    if(!b || part.context || ownParts.has(part) || b[3]<box[0] || b[0]>box[3] || b[4]<box[1] || b[1]>box[4] ||
      b[5]<box[2] || b[2]>box[5])continue;
    // Schematic water traces, decals and planar stair references are not physical obstacles.
    if(['Stairs','Cold_water','Hot_water','Drainage'].includes(part.category) || /label|letter|seam|stitch|shadow|^D1 /.test(part.feature||''))continue;
    for(let i=0;i<part.indices.length;i+=3) {
      const vertices=Array.from(part.indices.slice(i,i+3),k=>Array.from(part.vertices.slice(k*6,k*6+3)));
      const tb=bounds(vertices);
      if(tb[3]<box[0]||tb[0]>box[3]||tb[4]<box[1]||tb[1]>box[4])continue;
      triangles.push({vertices,b:tb,id:part.id,name:part.feature||part.name,top:b[5],floor:/floor|landing|deck slab/.test(part.feature||part.name||'')||part.category==='Decks'});
    }
  }
  const cache=new Map();
  const clearance=(x,y,height,radius)=> {
    const key=height.toFixed(6);
    if(!cache.has(key)) {
      const footprints=[];
      for(const t of triangles) {
        const foot=height+(t.floor && t.top<=height+.19 ? .19 : .035);
        if(t.b[5]<=foot || t.b[2]>=height+1.65)continue;
        const projected=clip(clip(t.vertices,foot,true),height+1.65,false).map(p=>p.slice(0,2));
        let polygon=convexHull(projected);
        // A vertical wall projects to a segment, not an area. Give only these
        // degenerate projections a numerical thickness; body radius supplies
        // the actual clearance. Keep other stair callers' behavior unchanged.
        if(includeVerticalFaces&&polygon.length>0&&polygon.length<3)
          polygon=convexHull(projected.flatMap(([x,y])=>[[x-.00001,y-.00001],[x+.00001,y-.00001],[x+.00001,y+.00001],[x-.00001,y+.00001]]));
        if(polygon.length>=3)footprints.push({polygon,id:t.id,name:t.name});
      }
      const test=indexFootprints(footprints);test.footprints=footprints;cache.set(key,test);
    }
    return !cache.get(key)(x,y,radius);
  };
  clearance.footprints=height=>{clearance(0,0,height,0);return cache.get(height.toFixed(6)).footprints;};
  clearance.blockers=(x,y,height,radius)=>{clearance(x,y,height,radius);return [...new Set(cache.get(height.toFixed(6)).footprints.filter(p=>distanceToFootprint(x,y,p.polygon)<=radius).map(p=>p.id+": "+p.name))];};
  // Used to verify that traversing a prepared flight never builds another index.
  Object.defineProperty(clearance,'preparedHeights',{get:()=>cache.size});
  return clearance;
}

export function createFlight(route,levels,steps,landings,clearance=()=>true) {
  const lowerHeight=route.lowerHeight??levels[route.lower],upperHeight=levels[route.upper];
  const surfaces=[{id:route.id+'/lower',index:0,height:lowerHeight,polygons:landingPolygons(landings.lower,route,0),kind:'landing'},
    ...steps.map((s,i)=>({...s,index:i+1,kind:Math.abs(s.height-upperHeight)<EPS?'landing':'tread'}))];
  let upper=surfaces.at(-1);
  if(upper.kind==='landing')upper.polygons=[...upper.polygons,...landings.upper];
  else {upper={id:route.id+'/upper',index:surfaces.length,height:upperHeight,polygons:landings.upper,kind:'landing'};surfaces.push(upper);}
  const flight={id:route.id,route,surfaces,lowerHeight,upperHeight,
    treadCount:surfaces.filter(s=>s.kind==='tread').length,riseCount:surfaces.length-1,
    evidence:'model-only',clearance};
  // Build once, preserving each triangle and the existing joint tolerance. A
  // hull around the whole stair would incorrectly bridge holes and water edges.
  const support=indexFootprints(surfaces.flatMap(s=>s.polygons.map(polygon=>({polygon}))));
  const atSurface=surfaces.map(s=>indexFootprints(s.polygons.map(polygon=>({polygon}))));
  const valid=(i,x,y,radius)=>atSurface[i](x,y,JOINT) &&
    (radius===undefined || clearance(x,y,surfaces[i].height,radius));
  function findSurface(x,y,previous,radius) {
    // Retain the current surface on bevel seams, then prefer the highest
    // adjacent surface. No per-movement flattening, filtering or sorting.
    if(previous!==undefined && surfaces[previous] && valid(previous,x,y,radius))return surfaces[previous];
    const low=previous===undefined?0:Math.max(0,previous-1);
    const high=previous===undefined?surfaces.length-1:Math.min(surfaces.length-1,previous+1);
    for(let i=high;i>=low;i--)if(i!==previous && valid(i,x,y,radius))return surfaces[i];
  }
  flight.at=(x,y,previous)=>findSurface(x,y,previous);
  flight.safe=(x,y,radius,previous)=> {
    for(const [dx,dy] of ring)if(!support(x+radius*dx,y+radius*dy,JOINT))return null;
    return findSurface(x,y,previous,radius)??null;
  };
  return flight;
}

export function describeFlights(model,routes) {
  const parts=renderedParts(model),levels=model.asset.data.levels;
  const flights=[];
  for(const route of routes) {
    const own=parts.filter(p=>p.semanticParent==='stairs/'+route.id || route.id==='service' &&
      /^(brown service tread|metal tread|white service riser|white stair underside closure)/.test(p.feature||''));
    const steps=[];
    for(let i=1;i<=route.steps;i++) {
      const tops=own.filter(p=>route.id==='service' ? p.feature===`brown service tread ${i}` :
        p.feature===`tread ${i} pale inset`||p.feature===`tread ${i} timber border`||p.feature===`tread ${i} rounded timber edge`);
      if(!tops.length)throw Error(`Missing rendered stair surface: ${route.id}/${i}`);
      const height=Math.max(...tops.map(p=>p.bounds[5]));
      steps.push({id:route.id+'/'+i,height,polygons:tops.flatMap(p=>surfaceTriangles(p,p.bounds[5],.025)),sourceIDs:tops.map(p=>p.id)});
    }
    const lowerHeight=route.lowerHeight??levels[route.lower],upperHeight=levels[route.upper];
    const allPoints=steps.flatMap(s=>s.polygons.flat().map(p=>[...p,s.height]));
    const box=bounds(allPoints);box[0]-=.8;box[1]-=.8;box[2]=lowerHeight;box[3]+=.8;box[4]+=.8;box[5]=upperHeight+1.65;
    const landings={lower:[],upper:[]};
    for(const [key,height,endpoint] of [['lower',lowerHeight,route.path[0]],['upper',upperHeight,route.path.at(-1)]]) {
      for(const part of parts) {
        const b=part.bounds;
        if(own.includes(part)||Math.abs(b[5]-height)>.01 || b[3]<endpoint[0]-.8 || b[0]>endpoint[0]+.8 ||
          b[4]<endpoint[1]-.8 || b[1]>endpoint[1]+.8)continue;
        if(part.category==='Stairs')continue;
        landings[key].push(...surfaceTriangles(part,height,.01));
      }
    }
    // Handrails remain obstacles; only the flight's own step structure is exempt.
    const structure=new Set(own.filter(p=>!/rail|baluster|handhold/.test(p.feature||'') &&
      !(route.id==='guest'&&/enclosure/.test(p.feature||''))));
    landings.upper=landingPolygons(landings.upper,route,1);
    // The fitted screen is below the guest stair. Its vertical faces under a
    // neighbouring, higher tread must not become a fictitious riser obstacle
    // when the visitor's circular footprint straddles two steps. Subtract only
    // the actual support triangles from this flight's collision copy. Exposed
    // screen faces, and the complete screen on the LD floor, remain solid.
    const collisionParts=route.id==='guest'?parts.map(p=>{
      if(p.id!=='LD_GLA_002'||p.feature!=='shower screen fitted below guest stair soffit')return p;
      const copy={...p,vertices:Array.from(p.vertices),indices:Array.from(p.indices)};
      subtractPrisms(copy,steps.flatMap(s=>s.polygons.map(polygon=>({polygon,low:p.bounds[2]-1,high:s.height}))));
      return copy;
    }):parts;
    const solidClearance=obstacles(collisionParts,structure,box,{includeVerticalFaces:['bridge','guest'].includes(route.id)});
    const clearance=(x,y,height,radius)=>solidClearance(x,y,height,radius) &&
      !(route.id==='service' && Math.abs(height-upperHeight)<EPS && model.navigation.serviceAccess.blocked(x,y,route.upper,radius));
    clearance.footprints=solidClearance.footprints;
    clearance.blockers=solidClearance.blockers;
    Object.defineProperty(clearance,'preparedHeights',{get:()=>solidClearance.preparedHeights});
    const flight=createFlight(route,levels,steps,landings,clearance);
    // Geometry clipping belongs to scene preparation, never nav.move(). Keep
    // the service door's live collision check separate from these static data.
    for(const surface of flight.surfaces)solidClearance(0,0,surface.height,0);
    flights.push(flight);
  }
  return {flights,provisionalReferences:[{ids:Array.from({length:9},(_,i)=>`MD_STA_${String(i+35).padStart(3,'0')}`),kind:'flat-reference'},
    {ids:Array.from({length:9},(_,i)=>`MD_STA_${String(i+44).padStart(3,'0')}`),kind:'flat-reference'}]};
}

// All callers (safe, entry, motion and exit) share the same support/collision decision.
export function installFlightNavigation(nav,flights) {
  if(nav.stairFlights) {
    for(const flight of flights)nav.stairFlights.set(flight.id,flight);
    return;
  }
  const originalSafe=nav.safe.bind(nav), originalStep=nav.tryStep.bind(nav);
  const byID=new Map(flights.map(f=>[f.id,f]));
  nav.stairFlights=byID;
  const currentIndex=(flight)=>nav.stair.surfaceIndex??flight.surfaces.reduce((best,s)=>
    Math.abs(s.height-nav.elevation)<Math.abs(best.height-nav.elevation)?s:best).index;
  function candidate(flight,x,y,previous) {
    if(Math.hypot(x-nav.position[0],y-nav.position[1])>.04+EPS)return null;
    const surface=flight.safe(x,y,nav.radius,previous);
    if(!surface)return null;
    return {surface,d:project(flight.route,x,y).d};
  }
  nav.safe=(x,y,deck=nav.deck)=> {
    const flight=nav.stair && byID.get(nav.stair.route.id);
    return flight && deck===nav.deck ? !!candidate(flight,x,y,currentIndex(flight)) : originalSafe(x,y,deck);
  };
  nav.tryStep=(x,y)=> {
    if(nav.stair) {
      const flight=byID.get(nav.stair.route.id);
      if(!flight)return originalStep(x,y);
      const result=candidate(flight,x,y,currentIndex(flight));
      if(!result)return false;
      const {surface,d}=result;
      const end=surface.index===0?0:surface.index===flight.riseCount?1:-1;
      if(end>=0) {
        const deck=end?flight.route.upper:flight.route.lower;
        // Exit only beyond the actual route endpoint, on an existing safe deck.
        const path=flight.route.path, a=end?path.at(-2):path[1],b=end?path.at(-1):path[0];
        if((x-b[0])*(b[0]-a[0])+(y-b[1])*(b[1]-a[1])>=-EPS && nav.floorSafe(x,y,deck)) {
          nav.deck=deck;nav.position=[x,y];nav.elevation=nav.floorHeight(x,y);nav.stair=null;nav.room=nav.location();return true;
        }
      }
      nav.position=[x,y];nav.elevation=surface.height;nav.stair={...nav.stair,d,surfaceIndex:surface.index};return true;
    }
    for(const route of nav.routes) {
      const flight=byID.get(route.id);
      if(!flight)continue;
      const end=nav.deck===route.lower?0:nav.deck===route.upper?1:-1;
      if(end<0)continue;
      const path=route.path,endpoint=end?path.at(-1):path[0],neighbor=end?path.at(-2):path[1];
      if(route.id==='bridge'||route.id==='guest') {
        // Projection clamps the entire approach to station zero. Do not capture
        // someone crossing the wide lower landing sideways on their way out.
        const dx=neighbor[0]-endpoint[0],dy=neighbor[1]-endpoint[1],length=Math.hypot(dx,dy);
        if(((x-endpoint[0])*dx+(y-endpoint[1])*dy)/length<-.065)continue;
      }
      const direction=(x-nav.position[0])*(neighbor[0]-endpoint[0])+(y-nav.position[1])*(neighbor[1]-endpoint[1]);
      const station=project(route,x,y);
      if(direction<=EPS || Math.abs(station.d-(end?route.length:0))>.065)continue;
      const previous=end?flight.riseCount:0,result=candidate(flight,x,y,previous);
      if(!result)continue;
      nav.position=[x,y];nav.elevation=result.surface.height;nav.stair={route,d:result.d,surfaceIndex:result.surface.index};return true;
    }
    if(nav.routes.every(r=>byID.has(r.id))) {
      if(!nav.floorSafe(x,y))return false;
      nav.position=[x,y];nav.elevation=nav.floorHeight(x,y);return true;
    }
    // Registered routes must not fall through to the old width-based entry check.
    const routes=nav.routes;nav.routes=routes.filter(r=>!byID.has(r.id));
    try{return originalStep(x,y);}finally{nav.routes=routes;}
  };
}

export function configureModelStairs(nav,model) {
  if(!model.interiorDetail || !model.asset?.binary)return;
  model.stairInventory=describeFlights(model,nav.routes);
  installFlightNavigation(nav,model.stairInventory.flights);
  configureCorrectedFurniture(nav,model);
  if(model.exterior?.transom){
    const parts=renderedParts(model), floor=parts.filter(p=>p.anchor==='MD_DCK_001').flatMap(p=>surfaceTriangles(p,3.95,.002));
    const clearance=obstacles(parts,new Set(),[3.78,-3.48,3.95,17.82,3.49,5.60],{includeVerticalFaces:true});
    const physical=supportedFloor(floor,clearance.footprints(3.95));
    const upperFloor=parts.filter(p=>p.anchor==='UD_DCK_001').flatMap(p=>surfaceTriangles(p,6,.002));
    const upperObstacles=obstacles(parts,new Set(),[9.9,-2.6,6,14.0,2.5,7.65],{includeVerticalFaces:true});
    const upper=supportedFloor(upperFloor,upperObstacles.footprints(6));
    const previous=nav.floorSafe.bind(nav);
    nav.floorSafe=(x,y,deck=nav.deck)=>deck==='UD'&&x>10.25&&x<13.78&&Math.abs(y)<1.8?upper(x,y,nav.radius):deck==='MD'&&x>=3.80&&x<=17.6&&
      (x<8.5?Math.abs(y)<3.44:y>=-2.14&&y<=2.14) ? physical(x,y,nav.radius) : previous(x,y,deck);
    model.asset.data={...model.asset.data,rooms:model.asset.data.rooms.map(r=>r.id==='MD_R01'?{...r,spawn:[6.68,0,5.55]}:r)};
  }
  configureInteriorFloor(nav,model);
  configureBridgeFloor(nav,model);
  configureAccessFloor(nav,model);
  configureGuestFloor(nav,model);
  configureBowFloor(nav,model);
  if(model.exterior?.sunDeck) {
    const sun=describeSunFloor(model),previous=nav.floorSafe.bind(nav);
    nav.floorSafe=(x,y,deck=nav.deck)=>deck==='SD'?sun.floorSafe(x,y,nav.radius):previous(x,y,deck);
    model.sunDeckFloor=sun;
  }
}

// The full viewer's source raster still contains the original furniture poses.
// Rebuild these local collision fields from final triangles during preparation,
// so moved furniture cannot leave an invisible obstacle or a walk-through solid.
function configureCorrectedFurniture(nav,model) {
  const records=model.interiorDetail.spatialCorrections;
  if(!records?.length)return;
  const parts=renderedParts(model),fields=[];
  for(const deck of ['LD','MD','UD']){
    const height=model.asset.data.levels[deck];
    const regions=records.filter(r=>r.parts.some(id=>id.startsWith(deck))).map(r=>[
      Math.min(r.before[0],r.after[0])-.3,Math.min(r.before[1],r.after[1])-.3,
      Math.max(r.before[3],r.after[3])+.3,Math.max(r.before[4],r.after[4])+.3]);
    if(!regions.length)continue;
    const floor=parts.filter(p=>(p.anchor||p.id.split('/')[0])===deck+'_DCK_001'||
      deck==='MD'&&/aft-teak-floor-following/.test(p.id)).flatMap(p=>surfaceTriangles(p,height,.002));
    const b=[Math.min(...regions.map(r=>r[0])),Math.min(...regions.map(r=>r[1])),height,
      Math.max(...regions.map(r=>r[2])),Math.max(...regions.map(r=>r[3])),height+1.65];
    const physical=supportedFloor(floor,obstacles(parts,new Set(),b,{includeVerticalFaces:true}).footprints(height));
    fields.push({deck,regions,physical});
  }
  const previous=nav.floorSafe.bind(nav);
  nav.floorSafe=(x,y,deck=nav.deck)=>{
    const field=fields.find(f=>f.deck===deck&&f.regions.some(r=>x>=r[0]&&y>=r[1]&&x<=r[2]&&y<=r[3]));
    return field?field.physical(x,y,nav.radius):previous(x,y,deck);
  };
  model.correctedFurnitureFields=fields;
}

function savedSurface(nav,route,state) {
  if(route.id!==state.stair || ![route.lower,route.upper].includes(state.deck))return null;
  const flight=nav.stairFlights?.get(route.id);
  if(!flight)return null;
  const surface=flight.surfaces.find(s=>Math.abs(s.height-state.elevation)<.01 && inside(...state.position,s.polygons));
  const safe=surface && flight.safe(...state.position,nav.radius,surface.index);
  return safe && Math.abs(safe.height-state.elevation)<.01 ? safe : null;
}
export function restorableStair(nav,route,state) {
  return !!savedSurface(nav,route,state);
}
export function restoreStairPosition(nav,route,state) {
  const surface=savedSurface(nav,route,state);
  if(!surface)throw Error('Cannot restore an unsupported stair position');
  nav.stair={route,d:project(route,...state.position).d,surfaceIndex:surface.index};
  nav.elevation=surface.height;
}
