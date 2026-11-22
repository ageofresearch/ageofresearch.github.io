import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fixture,travel} from './yacht-saloon-fixture.mjs';
import {buildBridgeAccess} from '../scripts/build-yacht-bridge-access.mjs';
import {decodeUpper,connectUpper} from '../site/tidewater-rocha/mobile/upper-terrace.js';
import {decodeSun,connectSun} from '../site/tidewater-rocha/mobile/sun-deck.js';
import {decodeUpperInterior,connectUpperInterior} from '../site/tidewater-rocha/mobile/upper-interior.js';
import {decodeBridge,connectBridge} from '../site/tidewater-rocha/mobile/bridge-helm.js';
import {decodeBow,connectBow} from '../site/tidewater-rocha/mobile/bow-deck.js';
import {decodeBridgeAccess,connectBridgeAccess,loadBridgeAccess,restoreBridgeAccessHandoff} from '../site/tidewater-rocha/mobile/bridge-access.js';
import {accessRoom,accessRoute} from '../site/tidewater-rocha/mobile/bridge-access-geometry.js';
import {nextProfile} from '../site/tidewater-rocha/mobile/main-saloon.js';
import {renderedParts,surfaceTriangles} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {supportedFloor} from '../site/tidewater-rocha/mobile/sun-deck-geometry.js';
import {buildYachtGeometry,i as Walk,l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
const root=new URL('../site/tidewater-rocha/',import.meta.url),array=b=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);
async function load(name,decode){const manifest=JSON.parse(await readFile(new URL('mobile/'+name+'.json',root))),binary=await readFile(new URL('mobile/'+name+'.bin',root));return {manifest,binary,decoded:decode(manifest,array(binary))};}
const {manifest,binary,decoded:access}=await load('bridge-access',decodeBridgeAccess);
const stages=await Promise.all([['upper-terrace',decodeUpper,connectUpper],['sun-deck',decodeSun,connectSun],['upper-interior',decodeUpperInterior,connectUpperInterior],['bridge-helm',decodeBridge,connectBridge],['bow-deck',decodeBow,connectBow]].map(async([name,decode,connect])=>({...(await load(name,decode)),connect})));
function mobile(ready=true){const f=fixture();for(const s of stages)s.connect(f.walk,s.decoded);if(ready)connectBridgeAccess(f.walk,access);return f;}
async function full(){
 const data=JSON.parse(await readFile(new URL('rocha/luz-de-mar/model.json',root))),b=await readFile(new URL('rocha/luz-de-mar/model.bin',root));
 const asset={data,binary:array(b),nav:Object.fromEntries(Object.entries(data.nav).map(([id,n])=>[id,{...n,bits:Uint8Array.from(atob(n.mask),c=>c.charCodeAt(0))}]))};
 const model=buildYachtGeometry(asset,0,{mtuEngines:false,seaStrainers:false});model.asset=asset;model.group.userData={yacht:basis};
 const walk=new Walk({camera:{position:model.group.position.clone()},player:{position:model.group.position.clone()}},model,{document:null});return {model,walk};
}
test('access build is reproducible, bounded and matches the shared support and collision geometry',async()=>{
 const built=await buildBridgeAccess();assert.deepEqual(built.manifest,manifest);assert.deepEqual(built.binary,binary);
 for(const p of Object.values(access.profiles)){
  assert.ok(p.triangles<=25000);assert.equal(p.batches.length,2);
  for(const a of p.audit.filter(a=>a.support||manifest.accessPartIDs.includes(a.id)))assert.equal(a.triangles,a.sourceTriangles,a.id);
  for(const b of p.batches)assert.equal(new Set(b.indices).size,b.attributes.position.length/3);
 }
 const {model,walk}=await full();try{
  assert.deepEqual(access.floor,model.bridgeAccessFloor.floor);
  const shared=model.stairInventory.flights.find(f=>f.id==='bridge');assert.deepEqual(access.flight.surfaces,shared.surfaces);
  assert.equal(walk.nav.floorSafe(18.5,1.82,'MD'),false,'The old galley mask cannot bypass the recessed wall from its far side');
  const parts=renderedParts(model),wall=parts.find(p=>p.feature==='recessed galley partition');
  assert.ok(wall);assert.deepEqual(wall.bounds,[18,1.38887,3.95,19.63299,1.71887,5.86]);
  const triangles=new Set();for(let i=0;i<wall.indices.length;i+=3){const t=wall.indices.slice(i,i+3).map(k=>wall.vertices.slice(k*6,k*6+3).join(',')).sort().join(';');assert.ok(!triangles.has(t));triangles.add(t);}
  const skirts=parts.filter(p=>p.anchor==='MD_PAR_001'&&p.feature?.startsWith('galley jamb skirting'));assert.equal(skirts.length,2);assert.ok(skirts.every(p=>p.bounds[1]>=.68));
  const plate=parts.find(p=>p.id==='MD_PAR_001/002');assert.ok(plate.bounds[1]>.83&&plate.bounds[4]<.86);
  const added=manifest.parts.filter(p=>p.role==='access-floor').map(p=>({...p,vertices:new Float32Array(array(binary),p.vertices.offset,p.vertices.length),indices:new Uint32Array(array(binary),p.indices.offset,p.indices.length)}));
  const floor=supportedFloor(added.flatMap(p=>surfaceTriangles(p,3.95,.002)),[]);assert.ok(floor(18.5,1.35));assert.ok(!floor(17.5,.2));
  assert.equal(shared.treadCount,11);assert.equal(shared.riseCount,12);
  for(const s of shared.surfaces)assert.ok(Math.abs(s.height-(3.95+s.index*2.05/12))<1e-5);
 }finally{model.dispose();}
});
test('complete saloon approach, stair, sofa turn and return work at 12/40/60 Hz in both models',async()=>{
 const f=mobile(),g=await full();try{
  for(const {walk} of [f,g])for(const hz of [12,40,60]){
   const n=walk.nav;n.enterRoom('MD_R02');n.position=accessRoute[0].slice();n.elevation=3.95;n.stair=null;
   travel(n,accessRoute.slice(1),hz);assert.equal(n.deck,'UD');assert.equal(n.elevation,6);assert.equal(n.stair,null);
   travel(n,accessRoute.toReversed().slice(1),hz);assert.equal(n.deck,'MD');assert.equal(n.elevation,3.95);assert.equal(n.stair,null);
   const flight=n.stairFlights.get('bridge');assert.equal(flight.clearance.preparedHeights,13);
   for(const s of flight.surfaces.filter(s=>s.kind==='tread')){
    const pts=s.polygons.flat(),point=[0,1].map(k=>(Math.min(...pts.map(p=>p[k]))+Math.max(...pts.map(p=>p[k])))/2);
    n.deck='MD';n.position=point;n.elevation=s.height;n.stair={route:flight.route,surfaceIndex:s.index,d:0};
    n.move(0,0);assert.equal(n.elevation,s.height);assert.ok(n.safe(...point));
    for(const delta of [[.01,.01],[-.01,-.01],[-.01,.01],[.01,-.01]]){travel(n,[point.map((v,i)=>v+delta[i]),point],hz);}
   }
   assert.equal(flight.clearance.preparedHeights,13);
  }
  assert.equal(f.walk.nav.routes.length,4);assert.ok(!f.walk.nav.routes.some(r=>r.id==='guest'));
  f.walk.nav.enterRoom('MD_R07');assert.deepEqual(f.walk.nav.position,[18.5,1.35]);assert.equal(f.walk.nav.location().displayName,'Vestíbulo interior');
 }finally{f.dispose();g.model.dispose();}
});
test('walls, guest well and pending rooms stay solid; the former lower obstruction is clear',()=>{
 const f=mobile();try{
  const n=f.walk.nav;for(const p of [[18.75,1.35],[18.5,1.35],[19.16,1.35]])assert.ok(n.floorSafe(...p,'MD'),String(p));
  for(const p of [[18.75,1.245],[18.5,1.6],[18.15,1.45],[18.7,.5],[17.99,-1.42],[19.65,.2],[20,.2],[18.5,2.3],[21,-2.5]])assert.equal(n.floorSafe(...p,'MD'),false,String(p));
  n.enterRoom('MD_R07');n.move(0,-.01);assert.equal(n.stair,null,'Crossing the lower landing must not enter the flight');
  assert.equal(n.floorSafe(20,-1.8,'UD'),false,'Sofa must not move to make the exit fit');
  const flight=n.stairFlights.get('bridge');assert.equal(flight.safe(18.74,.5,.14,3),null);
 }finally{f.dispose();}
});
test('handoff preserves every rendered step and uses the nearest valid landing on invalid saved poses',async()=>{
 const {model,walk}=await full();try{
  const f=walk.nav.stairFlights.get('bridge');
  for(const s of f.surfaces.filter(s=>s.kind==='tread')){
   const pts=s.polygons.flat(),position=[0,1].map(k=>(Math.min(...pts.map(p=>p[k]))+Math.max(...pts.map(p=>p[k])))/2);
   restoreBridgeAccessHandoff(walk,{deck:'MD',stair:'bridge',position,elevation:s.height});
   assert.equal(walk.nav.stair.surfaceIndex,s.index);assert.deepEqual(walk.nav.position,position);assert.equal(walk.nav.elevation,s.height);
  }
  for(const [elevation,deck,position]of [[4,'MD',[18.5,1.35]],[5.9,'UD',[19.16,-1.8]]]){
   restoreBridgeAccessHandoff(walk,{deck:'MD',stair:'bridge',position:[100,100],elevation});assert.equal(walk.nav.deck,deck);assert.deepEqual(walk.nav.position,position);
  }
 }finally{model.dispose();}
});
test('preparation rejects partial packages; retries are idempotent and profile transitions have hysteresis',async()=>{
 const f=mobile(false);try{
  assert.ok(!f.walk.nav.floorSafe(18.5,1.35,'MD'));assert.ok(f.walk.nav.floorSafe(26.8,0,'UD'));
  await assert.rejects(loadBridgeAccess({fetcher:async()=>({ok:false})}));
  await assert.rejects(loadBridgeAccess({timeoutMs:5,fetcher:(_,o)=>new Promise((_,reject)=>o.signal.addEventListener('abort',()=>reject(Error('timeout'))))}));
  assert.throws(()=>decodeBridgeAccess(manifest,new ArrayBuffer(12)));
  for(const change of [m=>m.flight.surfaces.pop(),m=>delete m.flight.surfaces[6].height,m=>m.flight.route.path[1][1]-=1,m=>m.flight.obstacles.pop(),m=>m.flight.obstacles[0].footprints[0].polygon[0][0]=NaN]){
   const m=structuredClone(manifest);change(m);assert.throws(()=>decodeBridgeAccess(m,array(binary)));
  }
  connectBridgeAccess(f.walk,access);connectBridgeAccess(f.walk,access);assert.equal(f.model.asset.data.rooms.filter(r=>r.id==='MD_R07').length,1);
  assert.equal(f.walk.nav.routes.filter(r=>r.id==='bridge').length,1);
  assert.equal(nextProfile('exterior',17.5,'MD',null,false,true),'exterior');assert.equal(nextProfile('exterior',17.51,'MD',null,false,true),'upper');
  assert.equal(nextProfile('upper',17.1,'MD',null,false,true),'upper');assert.equal(nextProfile('upper',17.09,'MD',null,false,true),'exterior');
  assert.equal(nextProfile('exterior',19.16,'MD','bridge'),'upper');assert.equal(nextProfile('upper',19,'UD','sun'),'sun');
 }finally{f.dispose();}
});
