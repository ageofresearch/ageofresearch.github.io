import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fixture,travel} from './yacht-saloon-fixture.mjs';
import {buildBow} from '../scripts/build-yacht-bow.mjs';
import {decodeUpper,connectUpper} from '../site/tidewater-rocha/mobile/upper-terrace.js';
import {decodeSun,connectSun} from '../site/tidewater-rocha/mobile/sun-deck.js';
import {decodeUpperInterior,connectUpperInterior} from '../site/tidewater-rocha/mobile/upper-interior.js';
import {decodeBridge,connectBridge} from '../site/tidewater-rocha/mobile/bridge-helm.js';
import {decodeBow,connectBow,loadBow,restoreBowHandoff} from '../site/tidewater-rocha/mobile/bow-deck.js';
import {bowRoom,bowRoute,bowEnd} from '../site/tidewater-rocha/mobile/bow-geometry.js';
import {nextProfile} from '../site/tidewater-rocha/mobile/main-saloon.js';
import {buildYachtGeometry,i as Walk,l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import {renderedParts,surfaceTriangles} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {supportedFloor} from '../site/tidewater-rocha/mobile/sun-deck-geometry.js';
import {orderOpaqueTriangles} from '../scripts/yacht-geometry/opaque-order.mjs';
const root=new URL('../site/tidewater-rocha/',import.meta.url),array=b=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);
test('opaque depth ordering preserves every triangle and its winding',()=>{
 const positions=Float32Array.from([10,0,0,11,0,0,10,1,0,1,0,0,2,0,0,1,1,0]);
 const indices=Uint32Array.from([0,1,2,3,4,5,2,1,0]),before=indices.slice();
 const ordered=orderOpaqueTriangles(positions,indices,[0,0,0]);
 assert.deepEqual(Array.from(ordered),[3,4,5,0,1,2,2,1,0]);
 assert.deepEqual(indices,before);
 const triangles=a=>Array.from({length:a.length/3},(_,i)=>Array.from(a.slice(i*3,i*3+3)).join(',')).sort();
 assert.deepEqual(triangles(ordered),triangles(indices));
 assert.deepEqual(triangles(orderOpaqueTriangles(positions,indices,[0,0,0],.25,true)),triangles(indices));
});
async function load(name,decode){const manifest=JSON.parse(await readFile(new URL('mobile/'+name+'.json',root))),binary=await readFile(new URL('mobile/'+name+'.bin',root));return {manifest,binary,decoded:decode(manifest,array(binary))};}
const {manifest,binary,decoded:bow}=await load('bow-deck',decodeBow);
const {decoded:upper}=await load('upper-terrace',decodeUpper),{decoded:sun}=await load('sun-deck',decodeSun),
  {decoded:interior}=await load('upper-interior',decodeUpperInterior),{decoded:bridge}=await load('bridge-helm',decodeBridge);
function mobile(ready=true){const f=fixture();connectUpper(f.walk,upper);connectSun(f.walk,sun);connectUpperInterior(f.walk,interior);connectBridge(f.walk,bridge);if(ready)connectBow(f.walk,bow);return f;}
async function full(){
 const data=JSON.parse(await readFile(new URL('rocha/luz-de-mar/model.json',root))),b=await readFile(new URL('rocha/luz-de-mar/model.bin',root));
 const asset={data,binary:array(b),nav:Object.fromEntries(Object.entries(data.nav).map(([id,n])=>[id,{...n,bits:Uint8Array.from(atob(n.mask),c=>c.charCodeAt(0))}]))};
 const model=buildYachtGeometry(asset,0,{mtuEngines:false,seaStrainers:false});model.asset=asset;model.group.userData={yacht:basis};
 const walk=new Walk({camera:{position:model.group.position.clone()},player:{position:model.group.position.clone()}},model,{document:null});return {model,walk};
}
test('bow package is reproducible with five compact profiles and exact shared additions',async()=>{
 const result=await buildBow();assert.deepEqual(result.manifest,manifest);assert.deepEqual(result.binary,binary);
 assert.deepEqual(Object.keys(bow.profiles),['exterior','interior','upper','sun','bow']);
 const duplicates=a=>a.filter((p,i)=>a.findIndex(q=>q.id===p.id)<i).map(p=>p.id).sort();
 for(const p of Object.values(bow.profiles)){
  assert.equal(p.batches.length,2);assert.ok(p.triangles<=25000);
  assert.deepEqual(duplicates(p.audit),duplicates(bridge.profiles.upper.audit),'No newly duplicated assemblies');
  for(const a of p.audit.filter(a=>a.support))assert.equal(a.triangles,a.sourceTriangles,a.id);
  for(const b of p.batches)assert.equal(new Set(b.indices).size,b.attributes.position.length/3);
 }
 const {model}=await full();try{
  const parts=renderedParts(model),own=manifest.parts.filter(p=>manifest.bowPartIDs.includes(p.id));
  for(const p of own.filter(p=>p.role==='bow-guard')){
   const source=parts.find(s=>s.id===p.id);assert.ok(source,p.id);
   assert.deepEqual(Array.from(new Float32Array(array(binary),p.vertices.offset,p.vertices.length)),Array.from(Float32Array.from(source.vertices)),p.id);
  }
  assert.deepEqual(bow.floor,model.bowFloor.floor);
  const fill=own.filter(p=>p.role==='bow-floor').map(p=>({...p,vertices:new Float32Array(array(binary),p.vertices.offset,p.vertices.length),indices:new Uint32Array(array(binary),p.indices.offset,p.indices.length)}));
  const filled=supportedFloor(fill.flatMap(p=>surfaceTriangles(p,6,.002)),[]);
  assert.ok(filled(16,-3.4));assert.ok(filled(18.3,-3));
  assert.ok(fill.every(p=>p.bounds[0]>=14.25&&p.bounds[3]<=18.72+1e-6));
  const support=supportedFloor(bow.floor,[]);
  for(const p of model.exterior.bowDeck.guards.filter(p=>/white coaming/.test(p.feature)))
   for(let i=0;i<p.vertices.length;i+=6)assert.ok(support(p.vertices[i],p.vertices[i+1],0),'Unsupported guard '+p.id);
  assert.ok(model.exterior.bowDeck.guards.some(p=>p.guardPath.some(v=>Math.hypot(...v.map((n,i)=>n-model.exterior.bowDeck.join[i]))<1e-8)));
  for(const id of ['UD_FUR_051','UD_SOF_023','UD_FUR_052']){
   const source=model.asset.data.meshes.find(p=>p.id===id),refined=parts.filter(p=>p.anchor===id);
   assert.ok(refined.length);for(const p of refined)for(let k=0;k<3;k++){assert.ok(p.bounds[k]>=source.bbox[k]-1e-6);assert.ok(p.bounds[k+3]<=source.bbox[k+3]+1e-6);}
  }
  for(const source of model.asset.data.meshes.filter(p=>/^UD_FUR_0(?:5[3-9]|60)$/.test(p.id))){
   assert.equal(model.interiorDetail.replacements.has(source.id),false,'Pending chair was changed');
  }
 }finally{model.dispose();}
});
test('starboard access and both sunpad sides work with stops and diagonals at 12/40/60 Hz',async()=>{
 const f=mobile(),g=await full();try{
  for(const n of [f.walk.nav,g.walk.nav])for(const hz of [12,40,60]){
   n.enterRoom('UD_R01');n.position=bowRoute[0].slice();n.elevation=6;n.stair=null;
   travel(n,bowRoute.slice(1),hz);n.move(0,0);
   for(const sign of [-1,1]){
    const side=[[27,sign*2],[28.7,sign*1.95],[29.1,sign*1.95]];
    travel(n,side,hz);n.move(0,0);travel(n,side.toReversed().slice(1).concat([[26.8,0]]),hz);
   }
   travel(n,[[26.6,.25],[26.8,0]],hz);travel(n,bowRoute.toReversed().slice(1),hz);
   assert.equal(n.stair,null);assert.equal(n.elevation,6);assert.equal(n.radius,.14);
  }
  f.walk.nav.enterRoom('UD_R04');assert.deepEqual(f.walk.nav.position,[26.8,0]);assert.equal(f.walk.nav.location().displayName,'Estar de proa');
  for(const p of [[18.5,-3],[22.5,-2.7]]){f.walk.nav.position=p;assert.equal(f.walk.nav.location().id,'UD_R04');}
  f.walk.nav.position=[20.5,0];assert.equal(f.walk.nav.location().id,'UD_R03');
  assert.equal(f.walk.nav.routes.length,3);assert.ok(!f.walk.nav.routes.some(r=>r.id==='bridge'));
 }finally{f.dispose();g.model.dispose();}
});
test('rails, glazing, furniture and pending limits block the body; handoff preserves valid exterior poses',async()=>{
 const f=mobile(),g=await full();try{
  for(const p of [[25,1.4],[28,0],[21,-2.09],[10.7,-3],[29.27,-1.95],[30,-1.1],[20,2.9],[14.5,3.1],[19.2,-1.5]])
   assert.equal(f.walk.nav.floorSafe(...p,'UD'),false,p.toString());
  for(const p of g.model.exterior.bowDeck.guards.filter(p=>/white coaming/.test(p.feature))){
   const a=p.guardPath[0],b=p.guardPath[1],mid=a.map((v,i)=>(v+b[i])/2);
   assert.equal(f.walk.nav.floorSafe(...mid,'UD'),false,'Old floor bypassed '+p.id);
  }
  for(const p of bowRoute){restoreBowHandoff(g.walk,{deck:'UD',position:p});assert.deepEqual(g.walk.nav.position,p);assert.equal(g.walk.nav.elevation,6);}
  restoreBowHandoff(g.walk,{deck:'UD',position:[100,100]});assert.deepEqual(g.walk.nav.position,bowRoom.spawn.slice(0,2));
  assert.equal(bow.navigationEnd,bowEnd);
 }finally{f.dispose();g.model.dispose();}
});
test('bow profile hysteresis stays outside and gives stairs priority',()=>{
 let p='upper';for(const x of [12.8,13.5,13.8])assert.equal(p=nextProfile(p,x,'UD',null,true),'upper');
 assert.equal(p=nextProfile(p,13.81,'UD',null,true),'bow');
 for(const x of [13.8,13.2,12.8])assert.equal(p=nextProfile(p,x,'UD',null,true),'bow');
 assert.equal(nextProfile(p,12.79,'UD',null,true),'upper');
 assert.equal(nextProfile(p,20.5,'UD',null,false),'upper');
 assert.equal(nextProfile(p,15,'UD','sun',true),'sun');assert.equal(nextProfile(p,15,'UD','aft',true),'upper');
 assert.equal(nextProfile(p,8.5,'MD'),'exterior');
});
test('failed bow packages retain the bridge and retries register a single destination',async()=>{
 const f=mobile(false);try{
  assert.ok(f.walk.nav.floorSafe(20.5,0,'UD'));assert.equal(f.walk.nav.floorSafe(26.8,0,'UD'),false);
  await assert.rejects(loadBow({fetcher:async()=>({ok:false})}));
  await assert.rejects(loadBow({timeoutMs:5,fetcher:(_,o)=>new Promise((_,reject)=>o.signal.addEventListener('abort',()=>reject(Error('timeout'))))}));
  assert.throws(()=>decodeBow(manifest,new ArrayBuffer(12)));
  const broken=structuredClone(manifest);broken.domains[0][0][0]=NaN;assert.throws(()=>decodeBow(broken,array(binary)));
  connectBow(f.walk,bow);connectBow(f.walk,bow);assert.equal(f.model.asset.data.rooms.filter(r=>r.id==='UD_R04').length,1);
 }finally{f.dispose();}
});
