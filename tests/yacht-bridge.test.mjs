import {splitFinishBoundaries} from '../scripts/yacht-geometry/finish-boundaries.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fixture,travel} from './yacht-saloon-fixture.mjs';
import {buildBridge} from '../scripts/build-yacht-bridge.mjs';
import {decodeUpper,connectUpper} from '../site/tidewater-rocha/mobile/upper-terrace.js';
import {decodeSun,connectSun} from '../site/tidewater-rocha/mobile/sun-deck.js';
import {decodeUpperInterior,connectUpperInterior} from '../site/tidewater-rocha/mobile/upper-interior.js';
import {decodeBridge,connectBridge,loadBridge,restoreBridgeHandoff} from '../site/tidewater-rocha/mobile/bridge-helm.js';
import {bridgeRoom,bridgeRoute} from '../site/tidewater-rocha/mobile/bridge-geometry.js';
import {buildYachtGeometry,i as Walk,l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import {renderedParts} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {finishPatternMips,teakPatternMips} from '../site/tidewater-rocha/mobile/finish-patterns.js';
const root=new URL('../site/tidewater-rocha/',import.meta.url),array=b=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);
async function load(name,decode){const j=JSON.parse(await readFile(new URL('mobile/'+name+'.json',root))),b=await readFile(new URL('mobile/'+name+'.bin',root));return {manifest:j,binary:b,decoded:decode(j,array(b))};}
const {manifest,binary,decoded:bridge}=await load('bridge-helm',decodeBridge);
const {decoded:upper}=await load('upper-terrace',decodeUpper),{decoded:sun}=await load('sun-deck',decodeSun),{decoded:interior}=await load('upper-interior',decodeUpperInterior);
function mobile(ready=true){const f=fixture();connectUpper(f.walk,upper);connectSun(f.walk,sun);connectUpperInterior(f.walk,interior);if(ready)connectBridge(f.walk,bridge);return f;}
async function full(){
 const data=JSON.parse(await readFile(new URL('rocha/luz-de-mar/model.json',root))),b=await readFile(new URL('rocha/luz-de-mar/model.bin',root));
 const asset={data,binary:array(b),nav:Object.fromEntries(Object.entries(data.nav).map(([id,n])=>[id,{...n,bits:Uint8Array.from(atob(n.mask),c=>c.charCodeAt(0))}]))};
 const model=buildYachtGeometry(asset,0,{mtuEngines:false,seaStrainers:false});model.asset=asset;model.group.userData={yacht:basis};
 const walk=new Walk({camera:{position:model.group.position.clone()},player:{position:model.group.position.clone()}},model,{document:null});return {model,walk};
}
test('bridge package reproduces the shared helm, windshield and visible bow within all four budgets',async()=>{
 const result=await buildBridge();assert.deepEqual(result.manifest,manifest);assert.deepEqual(result.binary,binary);
 for(const [name,p]of Object.entries(bridge.profiles)){
  assert.equal(p.batches.length,2);assert.ok(p.triangles<=25000);assert.ok(p.audit.some(a=>a.id.startsWith('UD_FUR_038/')));
  for(let i=5;i<=12;i++)assert.ok(p.audit.some(a=>a.id==='UD_GLA_'+String(i).padStart(3,'0')&&a.triangles===12));
  assert.ok(p.audit.some(a=>a.id.includes('UD_DCK_001')&&a.id.endsWith('/bridge-helm')));
  if(['upper','sun'].includes(name))assert.ok(p.audit.some(a=>a.id.startsWith('UD_SOF_023')&&a.triangles>0));
  for(const b of p.batches){assert.equal(new Set(b.indices).size,b.attributes.position.length/3);assert.ok(!Array.from(b.attributes.aSurface).some((v,i)=>i%4===2&&(v===28||v===29)), 'Floor finishes must be resolved before drawing');}
 }
 const {model}=await full();try{
  const parts=renderedParts(model),own=manifest.parts.filter(p=>manifest.bridgePartIDs.includes(p.id));
  for(const p of own.filter(p=>!p.id.endsWith('/bridge-helm'))){
   const source=parts.find(s=>s.id===p.id);assert.ok(source,p.id);
   assert.deepEqual(Array.from(new Float32Array(array(binary),p.vertices.offset,p.vertices.length)),Array.from(Float32Array.from(source.vertices)),p.id);
  }
  assert.ok(own.filter(p=>p.role==='bridge-floor').every(p=>p.bounds[0]>=18.72-1e-7));
  assert.deepEqual(bridge.floor,model.bridgeFloor.floor);
 }finally{model.dispose();}
});
test('display-fitted service furniture no longer creates phantom obstacles on the bridge floor',async()=>{
 const {model,walk}=await full();try{
  const parts=renderedParts(model);
  for(const id of ['MD_EQU_002','MD_FUR_038','MD_FUR_039']){
   const fitted=parts.filter(p=>(p.anchor||p.id)===id);assert.ok(fitted.length);
   for(const p of fitted){assert.equal(p.displayFit,'service-ceiling-fit-1');assert.ok(p.bounds[5]<5.88);
    assert.ok(Math.max(...p.vertices.filter((_,i)=>i%6===2))<5.88);}
  }
  assert.ok(walk.nav.floorSafe(20,1,'UD'));assert.ok(walk.nav.floorSafe(20.5,.8,'UD'));
 }finally{model.dispose();}
});
test('bridge entry/return, diagonal turns and stopped reversals work at 12/40/60 Hz in mobile and full yacht',async()=>{
 const f=mobile(),g=await full();try{
  for(const n of [f.walk.nav,g.walk.nav])for(const hz of [12,40,60]){
   n.enterRoom('UD_R02');n.position=bridgeRoute[0].slice();n.elevation=6;
   travel(n,bridgeRoute.slice(1),hz);n.move(0,0);assert.equal(n.stair,null);assert.equal(n.elevation,6);
   travel(n,[[20.5,.7],[20.7,1.5],[20.5,1.7],[19.9,1.7]],hz);
   travel(n,[[20.5,1.7],[20.5,0]],hz);travel(n,bridgeRoute.toReversed().slice(1),hz);
  }
  f.walk.nav.enterRoom('UD_R03');assert.deepEqual(f.walk.nav.position,[20.5,0]);assert.equal(f.walk.nav.location().displayName,'Puente de mando');
  assert.equal(f.walk.nav.routes.length,3);assert.equal(f.walk.nav.routes.some(r=>r.id==='bridge'),false);
  connectBridge(f.walk,bridge);assert.equal(f.model.asset.data.rooms.filter(r=>r.id==='UD_R03').length,1);
 }finally{f.dispose();g.model.dispose();}
});
test('windshield, furniture, stair well and forward limits stay solid; full handoff preserves valid poses',async()=>{
 const f=mobile(),g=await full();try{
  for(const p of [[21,1.93],[21,-2.09],[20.9,0],[20.4,-1.7],[22.3,0],[19.16,0],[25,0],[19.2,2.4]])assert.equal(f.walk.nav.floorSafe(...p,'UD'),false,p.toString());
  for(const p of [[19.6,1.7],[20.5,0],[20.5,-.8],[21.35,-.5]]){
   assert.ok(f.walk.nav.floorSafe(...p,'UD'),p.toString());restoreBridgeHandoff(g.walk,{deck:'UD',position:p});assert.deepEqual(g.walk.nav.position,p);assert.equal(g.walk.nav.elevation,6);
  }
  restoreBridgeHandoff(g.walk,{deck:'UD',position:[100,100]});assert.deepEqual(g.walk.nav.position,bridgeRoom.spawn.slice(0,2));
  assert.ok(g.walk.nav.routes.some(r=>r.id==='bridge'));
 }finally{f.dispose();g.model.dispose();}
});
test('bridge network/corrupt data failures preserve the interior and retries register one room',async()=>{
 const f=mobile(false);try{
  assert.equal(f.walk.nav.floorSafe(20.5,0,'UD'),false);assert.ok(f.walk.nav.floorSafe(15,0,'UD'));
  await assert.rejects(loadBridge({fetcher:async()=>({ok:false})}));
  await assert.rejects(loadBridge({timeoutMs:5,fetcher:(_,o)=>new Promise((_,reject)=>o.signal.addEventListener('abort',()=>reject(Error('timeout'))))}));
  assert.throws(()=>decodeBridge(manifest,new ArrayBuffer(12)));const broken=structuredClone(manifest);broken.domains[0][0][0]=NaN;assert.throws(()=>decodeBridge(broken,array(binary)));
  connectBridge(f.walk,await loadBridge({fetcher:async()=>({ok:true,json:async()=>manifest,arrayBuffer:async()=>array(binary)})}));assert.ok(f.walk.nav.floorSafe(20.5,0,'UD'));
 }finally{f.dispose();}
});
test('prepared pattern pyramid is periodic, bounded and averages to a neutral subpixel finish',()=>{
 const mips=finishPatternMips();assert.equal(mips.length,9);assert.equal(mips.reduce((n,m)=>n+m.data.byteLength,0),349524);
 for(let i=0;i<4;i+=2)assert.ok(Math.abs((mips.at(-1).data[i]*256+mips.at(-1).data[i+1])/65535*1.1-1)<.00003);assert.ok(Math.abs(mips[0].data[0]-mips[0].data[510])<15);
});

test('teak mipmaps preserve the board pattern and fit the prepared material budget',()=>{
 const levels=teakPatternMips();assert.equal(levels.length,13);assert.equal(levels[0].data.length,512*4096);
 assert.ok(levels.reduce((n,l)=>n+l.data.length,0)+349524<3.2e6);
 assert.ok(Math.abs(levels.at(-1).data[0]/255*1.1-1)<.003);
 const first=levels[0];
 for(const board of [30,64,80]){
  const x=220,edge=first.data[board*32*512+x],center=first.data[(board*32+16)*512+x];
  assert.ok(edge<center-15, 'Joints must remain visibly darker than the board centre');
 }
});

test('floor finish clipping preserves area, holes and exact boundaries without overlapping caps',()=>{
 const vertices=[0,0,6,0,0,1, 4,0,6,0,0,1, 4,3,6,0,0,1, 0,3,6,0,0,1];
 const source={vertices,indices:[0,1,2,0,2,3],surfaceTypes:[28,28,28,28],light:[.7,.8,.9,.8]};
 const b={start:1,end:3,minY:1,maxY:2},split=splitFinishBoundaries(source,{28:b});
 let inside=0,outside=0;
 for(let i=0;i<split.indices.length;i+=3){
  const ids=split.indices.slice(i,i+3),p=ids.map(id=>split.vertices.slice(id*6,id*6+3)),t=split.surfaceTypes[ids[0]];
  const area=Math.abs((p[1][0]-p[0][0])*(p[2][1]-p[0][1])-(p[2][0]-p[0][0])*(p[1][1]-p[0][1]))/2;
  assert.ok(p.every(v=>v[2]===6));
  const x=p.reduce((n,v)=>n+v[0],0)/3,y=p.reduce((n,v)=>n+v[1],0)/3;
  if(t===2){inside+=area;assert.ok(x>=1&&x<=3&&y>=1&&y<=2);}
  else {outside+=area;assert.ok(x<=1||x>=3||y<=1||y>=2);}
 }
 assert.ok(Math.abs(inside-2)<1e-10);assert.ok(Math.abs(outside-10)<1e-10);
 const holed={...source,indices:[0,1,2]};const cut=splitFinishBoundaries(holed,{28:b});
 for(let i=0;i<cut.vertices.length;i+=6)assert.ok(cut.vertices[i+1]<=.75*cut.vertices[i]+1e-10,'No material triangle may bridge the missing floor');
});
