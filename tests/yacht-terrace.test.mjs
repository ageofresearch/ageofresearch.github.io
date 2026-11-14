import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildTerrace, clipGeometry, contactShade } from '../scripts/build-yacht-terrace.mjs';
import { connectTerrace, moveAlongRoute, routeSegments, routePoint } from '../site/tidewater-rocha/mobile/aft-terrace.js';
import { convexHull, distanceToFootprint, indexFootprints } from '../site/tidewater-rocha/mobile/terrace-geometry.js';
import { crossing } from '../site/tidewater-rocha/mobile/pasarela.js';
import { placeOnRoute } from '../site/tidewater-rocha/mobile/frame-benchmark.js';
import { buildYachtGeometry, createBoarding, createSternFeatures, createFinishes, i as Walk, l as basis } from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { A as Group } from '../site/tidewater-rocha/assets/common-HBn3Movl.js';

const root = new URL('../site/tidewater-rocha/mobile/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('aft-terrace.json', root)));

function walkingModel() {
  const group = new Group(); group.userData = { yacht:basis };
  const model = {group};
  const materials = createFinishes(0,true,true,true,true);
  const boarding = model.boarding = createBoarding(model,null,{gangwayOnly:true,includeLanding:true,materials});
  boarding.room.spawn = [boarding.start+.18,boarding.y,boarding.height(boarding.start+.18)+1.6];
  const terrace = structuredClone(manifest);
  connectTerrace(boarding,terrace);
  model.asset = {data:{rooms:[terrace.room],levels:{MD:3.95}}};
  const walk = new Walk({camera:{position:group.position}},model,{document:null});
  walk.nav.routes=[];
  walk.nav.floorSafe=(x,y,deck=walk.nav.deck)=>deck==='MD' && boarding.safe(x,y,walk.nav.radius);
  walk.nav.enterRoom('boarding');
  return {walk,boarding,dispose(){boarding.dispose();materials.opaque.dispose();materials.glass.dispose();}};
}

test('published furnishings reproduce the source geometry and stay inside the mobile budget', async () => {
  const generated = await buildTerrace();
  assert.deepEqual(generated.manifest,manifest);
  assert.deepEqual(generated.binary,await readFile(new URL('aft-terrace.bin',root)));
  assert.ok(generated.binary.length<=1.25*1024*1024);
  assert.ok(manifest.parts.every(p=>p.bounds[0]>=3.2-1e-6 && p.bounds[3]<=8.5+1e-6));
  assert.ok(manifest.parts.some(p=>p.role==='roof'));
  assert.ok(manifest.parts.some(p=>p.role==='enclosure'));
  assert.ok(manifest.parts.some(p=>p.glass));
  const furnishings=manifest.parts.filter(p=>p.role==='furniture');
  assert.equal(furnishings.length,25);
  assert.deepEqual([...new Set(furnishings.map(p=>p.groupID))].sort(),['chair-1','chair-2','chair-3','pouf','wet-bar']);
  assert.ok(!manifest.parts.some(p=>/MD_SAN_|covered-aft-seating|oval-table/.test(p.id)));
  assert.ok(manifest.floor.every(([a,b,c])=>Math.abs((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]))>1e-10),'Degenerate faces must not open navigation holes');
  const lights=manifest.parts.flatMap(p=>Array.from(new Float32Array(generated.binary.buffer,generated.binary.byteOffset+p.light.offset,p.light.length)));
  assert.ok(Math.min(...lights)<.6 && Math.max(...lights)>.95);
  const bytes=generated.binary.buffer.slice(generated.binary.byteOffset,generated.binary.byteOffset+generated.binary.byteLength);
  const decode=part=>({...part,vertices:new Float32Array(bytes,part.vertices.offset,part.vertices.length),
    indices:Array.from(new Uint32Array(bytes,part.indices.offset,part.indices.length))});
  const data=JSON.parse(await readFile(new URL('../rocha/luz-de-mar/model.json',root)));
  const sourceBuffer=await readFile(new URL('../rocha/luz-de-mar/model.bin',root));
  const source=buildYachtGeometry({data,binary:sourceBuffer.buffer.slice(sourceBuffer.byteOffset,sourceBuffer.byteOffset+sourceBuffer.byteLength)},0,{mtuEngines:false,seaStrainers:false});
  try {
    for(const part of furnishings) {
      const original=source.exterior.parts.find(p=>p.id===part.id);
      assert.ok(original,part.id);
      assert.deepEqual(decode(part).vertices,Float32Array.from(original.vertices));
      assert.deepEqual(decode(part).indices,original.indices);
      assert.deepEqual(part.finish,original.finish);
      assert.deepEqual(part.bounds,original.bounds);
    }
  } finally {source.dispose();}
  const group=new Group(), materials=createFinishes(0,true,true,true,true);
  const boarding=createBoarding({group},null,{gangwayOnly:true,includeLanding:true,materials,
    terraceParts:manifest.parts.map(decode),sternParts:createSternFeatures().parts});
  assert.equal(boarding.meshes.length,2);
  assert.ok(boarding.stats.triangles<=25000,JSON.stringify(boarding.stats));
  boarding.dispose(); materials.opaque.dispose(); materials.glass.dispose();
  // The counter must still have the source sink opening, not a cap over the basin.
  const counter=decode(furnishings.find(p=>p.feature==='cockpit grey counter with pale edge'));
  const covers=(a,b,c)=>{
    const s=[a,b,c].map((p,i)=>{const q=[a,b,c][(i+1)%3];return(q[0]-p[0])*(-1.98-p[1])-(q[1]-p[1])*(6.48-p[0]);});
    return s.every(v=>v>=0)||s.every(v=>v<=0);
  };
  for(let i=0;i<counter.indices.length;i+=3) {
    const t=counter.indices.slice(i,i+3).map(k=>counter.vertices.slice(k*6,k*6+6));
    if(t.every(v=>v[5]>.5))assert.equal(covers(...t),false,'The sink must stay open');
  }
});

// The deployed port gangway passes above the port swim stair in the user's
// Beach Club reference. It is a configuration constraint, not a reason to
// invent an outboard bridge and cut the yacht's coamings.
test('boarding preserves the reference alignment, landing and closed lower-deck route',()=>{
  const {walk,boarding,dispose}=walkingModel();
  try {
    assert.equal(boarding.y,3.1);
    assert.equal(boarding.safe(0,3.1),true);
    assert.equal(boarding.safe(0,4.25),false,'No invented outboard walkway');
    const landing=boarding.parts.find(p=>p.feature==='widened upper teak boarding landing');
    assert.ok(landing.bounds[4]<3.6,'The landing must join the existing deck footprint');
    const stern=createSternFeatures();
    const coamings=stern.parts.filter(p=>/swept outer stair coaming/.test(p.feature));
    assert.equal(coamings.length,2);
    assert.equal(coamings[0].bounds[5],coamings[1].bounds[5],'Keep both original swept coamings intact');
    assert.deepEqual(walk.nav.routes,[],'The mobile view must not create a descent through the deployed gangway');
    assert.equal(walk.nav.floorSafe(1.5,3.1,'LD'),false);
    assert.equal(boarding.parts.filter(p=>p.feature==='landing mounted post 1 2.3').length,0);
  }finally{dispose();}
});

test('chair and cloth clear their neighbours and upper stair rails retain the complete source height',async()=>{
  const bench=createSternFeatures().parts.find(p=>p.feature==='covered aft seating behind transom');
  const chair=manifest.parts.filter(p=>p.groupID==='chair-1');
  assert.ok(Math.min(...chair.map(p=>p.bounds[0]))-bench.bounds[3]>.05,'Chair 1 must clear the bench by at least 5 cm');
  const pouf=manifest.parts.filter(p=>p.groupID==='pouf');
  const cloth=pouf.find(p=>/cloth/.test(p.feature));
  assert.ok(cloth.bounds[2]-Math.max(...pouf.filter(p=>p!==cloth).map(p=>p.bounds[5]))>.003,'Cloth must sit above the cushion');
  const data=JSON.parse(await readFile(new URL('../rocha/luz-de-mar/model.json',root)));
  const buffer=await readFile(new URL('../rocha/luz-de-mar/model.bin',root));
  const source=buildYachtGeometry({data,binary:buffer.buffer.slice(buffer.byteOffset,buffer.byteOffset+buffer.byteLength)},0,{mtuEngines:false,seaStrainers:false});
  try {
    const rails=source.interiorDetail.replacements.get('MD_STA_013').filter(p=>/handrail|post/.test(p.feature));
    assert.ok(rails.length>=2);
    for(const rail of rails) {
      const mobile=manifest.parts.find(p=>p.id===rail.id);
      assert.ok(mobile,rail.feature);
      assert.ok(Math.abs(mobile.bounds[5]-rail.bounds[5])<1e-6,`Do not cut the top of ${rail.feature}`);
    }
  }finally{source.dispose();}
});

test('rotated furniture footprints retain their open corners and body clearance',()=>{
  const polygon=convexHull([[0,1],[1,0],[2,1],[1,2],[1,1],[0,1]]);
  const hit=indexFootprints([{polygon}]);
  assert.equal(hit(.05,.05,.14),false,'Do not replace the rotated chair with its enclosing box');
  assert.equal(hit(1,1,.14),true);
  assert.equal(hit(1,-.1,.14),true);
  assert.equal(hit(1,-.2,.14),false);
  assert.equal(distanceToFootprint(0,0,[[0,0],[1,1]]),Infinity);
});

test('contact shading is soft, local and baked into the actual floor',async()=>{
  const footprint={polygon:[[0,0],[1,0],[1,1],[0,1]]};
  assert.equal(contactShade(.5,.5,[footprint]),.78);
  assert.ok(contactShade(1.15,.5,[footprint])>.78 && contactShade(1.15,.5,[footprint])<1);
  assert.equal(contactShade(1.4,.5,[footprint]),1);
  const b=await readFile(new URL('aft-terrace.bin',root));
  const samples=manifest.parts.filter(p=>p.role==='floor').flatMap(p=>Array.from(new Float32Array(b.buffer,b.byteOffset+p.light.offset,p.light.length)));
  assert.ok(Math.min(...samples)<.5,'Covered furniture must add contact occlusion to the canopy shade');
});

test('clipping interpolates crossings instead of keeping triangles beyond the zone', () => {
  const result=clipGeometry({vertices:[0,0,0,0,0,1,4,0,0,0,0,1,0,4,0,0,0,1],indices:[0,1,2]},[1,0,-1,2,4,1]);
  assert.ok(result.indices.length>=3);
  assert.ok(result.vertices.filter((_,i)=>i%6===0).every(x=>x>=1 && x<=2));
  assert.ok(result.vertices.filter((_,i)=>i%6===5).every(z=>z===1));
  assert.equal(clipGeometry({vertices:[0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],indices:[0,1,2]},[-1,-1,-1,1,1,1]).indices.length,0);
});

test('native navigation reaches the saloon threshold and returns without crossing glass, stairs, or deck edges', () => {
  const {walk,boarding,dispose}=walkingModel();
  try {
    const {length}=routeSegments(boarding.route);
    assert.ok(moveAlongRoute(walk.nav,boarding.route,0,length));
    assert.ok(Math.hypot(...walk.nav.position.map((v,i)=>v-boarding.route.at(-1)[i]))<.001);
    assert.equal(walk.nav.elevation,3.95);
    walk.nav.move(2,0);
    assert.ok(walk.nav.position[0]<=8.4-walk.nav.radius+.001);
    const forbidden=[[-5,3.1],[-2,2.3],[2.8,2.655],[4.0,0],[5.5,1.8],[8.35,-1],[6,-3.6],[9,0],[6,3.7],
      [5.5,-.1],[4.28,-1.45],[6.85,-.65],[4.58,.93],[6.5,-2]];
    for(const p of forbidden)assert.equal(boarding.safe(...p),false,`Must block ${p}`);
    walk.nav.position=boarding.route.at(-1).slice();
    assert.ok(moveAlongRoute(walk.nav,boarding.route,length,0));
    assert.ok(Math.hypot(...walk.nav.position.map((v,i)=>v-boarding.route[0][i]))<.001);
  } finally {dispose();}
});

test('the guided passage has extra clearance and the terrace spawn is reachable',()=>{
  const {walk,boarding,dispose}=walkingModel();
  try {
    const {length}=routeSegments(boarding.route);
    for(let d=0;d<=length;d+=.005) {
      const {point}=routePoint(boarding.route,d);
      assert.ok(boarding.safe(...point,.15),`15 cm clearance at ${point}`);
    }
    walk.nav.enterRoom('MD_R01');
    assert.deepEqual(walk.nav.position,[5.6,.8]);
    assert.equal(walk.nav.elevation,3.95);
    const before=walk.nav.position.slice();
    walk.nav.move(0,-1.5);
    assert.ok(walk.nav.position[1]>.28+walk.nav.radius,'Walking toward the puf must stop at its edge');
    assert.ok(walk.nav.position[1]<before[1]);
  } finally {dispose();}
});

test('guided walk can resume after a stop and the same benchmark route reaches the terrace at different frame rates', () => {
  const {walk,boarding,dispose}=walkingModel();
  try {
    let advance=crossing(walk);
    for(let i=0;i<180;i++)advance(1/60);
    advance=crossing(walk);
    let running=true;
    for(let i=0;i<1800 && running;i++)running=advance(1/60);
    assert.equal(running,false);
    assert.ok(walk.nav.position[0]>8.17 && Math.abs(walk.nav.position[1]-.1)<.01);
    advance=crossing(walk); running=true;
    for(let i=0;i<1800 && running;i++)running=advance(1/60);
    assert.ok(Math.abs(walk.nav.position[0]-boarding.room.spawn[0])<.01);
    for(const fps of [12,40,60]) {
      walk.nav.enterRoom('boarding');
      for(let i=0;i<=12*fps;i++)placeOnRoute(walk,i/fps,0);
      assert.ok(walk.nav.position[0]>8.17 && Math.abs(walk.nav.position[1]-.1)<.01,`${fps} FPS reaches terrace`);
      for(let i=12*fps;i<=24*fps;i++)placeOnRoute(walk,i/fps,0);
      assert.ok(Math.abs(walk.nav.position[0]-boarding.room.spawn[0])<.01,`${fps} FPS returns to the gangway`);
    }
  } finally {dispose();}
});
