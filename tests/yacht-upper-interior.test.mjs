import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fixture,travel} from './yacht-saloon-fixture.mjs';
import {buildUpperInterior} from '../scripts/build-yacht-upper-interior.mjs';
import {decodeUpper,connectUpper} from '../site/tidewater-rocha/mobile/upper-terrace.js';
import {decodeSun,connectSun} from '../site/tidewater-rocha/mobile/sun-deck.js';
import {decodeUpperInterior,connectUpperInterior,loadUpperInterior,restoreUpperInteriorHandoff} from '../site/tidewater-rocha/mobile/upper-interior.js';
import {interiorLimits,interiorRoom} from '../site/tidewater-rocha/mobile/upper-interior-geometry.js';
import {buildYachtGeometry,i as Walk,l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import {renderedParts} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {nextProfile} from '../site/tidewater-rocha/mobile/main-saloon.js';
const root=new URL('../site/tidewater-rocha/',import.meta.url),array=b=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);
async function load(name,decode){const j=JSON.parse(await readFile(new URL('mobile/'+name+'.json',root))),b=await readFile(new URL('mobile/'+name+'.bin',root));return {manifest:j,binary:b,decoded:decode(j,array(b))};}
const {manifest,binary,decoded:interior}=await load('upper-interior',decodeUpperInterior);
const {decoded:upper}=await load('upper-terrace',decodeUpper),{decoded:sun}=await load('sun-deck',decodeSun);
function mobile(ready=true){const f=fixture();connectUpper(f.walk,upper);connectSun(f.walk,sun);if(ready)connectUpperInterior(f.walk,interior);return f;}
async function full(){
  const data=JSON.parse(await readFile(new URL('rocha/luz-de-mar/model.json',root))),b=await readFile(new URL('rocha/luz-de-mar/model.bin',root));
  const asset={data,binary:array(b),nav:Object.fromEntries(Object.entries(data.nav).map(([id,n])=>[id,{...n,bits:Uint8Array.from(atob(n.mask),c=>c.charCodeAt(0))}]))};
  const model=buildYachtGeometry(asset,0,{mtuEngines:false,seaStrainers:false});model.asset=asset;model.group.userData={yacht:basis};
  const walk=new Walk({camera:{position:model.group.position.clone()},player:{position:model.group.position.clone()}},model,{document:null});return {model,walk};
}
const route=[[13.8,0],[14.0,0],[14.21,0],[14.5,0],[14.8,0],[16,0],[17.4,0],[18.3,0],[18.3,-1.9]];

test('upper interior reproduces three bounded profiles and final shared assemblies without old dining proxies',async()=>{
  const result=await buildUpperInterior();assert.deepEqual(result.manifest,manifest);assert.deepEqual(result.binary,binary);
  const duplicates=a=>{const counts=new Map();for(const p of a)counts.set(p.id,(counts.get(p.id)||0)+1);return [...counts].filter(([,n])=>n>1);};
  for(const [name,p] of Object.entries(interior.profiles)){
    assert.equal(p.batches.length,2);assert.ok(p.triangles<=25000);assert.equal(p.triangles,p.batches.reduce((n,b)=>n+b.indices.length/3,0));
    // The two adjacent MD floor fragments already share their source ID.
    assert.deepEqual(duplicates(p.audit),duplicates(sun.profiles[name].audit),'No newly duplicated assembly');
    for(const b of p.batches)assert.equal(new Set(b.indices).size,b.attributes.position.length/3);
    assert.ok(!p.audit.some(a=>/^UD_(SOF_00[7-9]|SOF_01[0-6]|FUR_0(1[7-9]|2[0-9]|3[0-6]))(?:\/|$)/.test(a.id)),'Consumed dining chairs must stay absent');
    assert.equal(p.audit.filter(a=>a.id.startsWith('UD_FUR_016/photo-layout/')).length,22,'Keep the current exterior dining assembly');
    for(const id of ['UD_GLA_001','UD_GLA_002','UD_GLA_003','UD_GLA_004'])assert.ok(p.audit.some(a=>a.id===id&&a.triangles===12),'Retain original glass panel '+id);
  }
  assert.ok(Object.values(interior.profiles).reduce((n,p)=>n+p.geometryBytes,0)<9*1024*1024);
  const {model}=await full();try {
    const parts=renderedParts(model),own=manifest.parts.filter(p=>manifest.interiorPartIDs.includes(p.id));assert.equal(own.length,18);
    for(const id of ['UD_FUR_037','UD_GLA_003','UD_GLA_004','UD_PAR_001']){
      const p=own.find(p=>p.id===id),source=parts.find(p=>p.id===id);assert.ok(p,id);
      assert.deepEqual(Array.from(new Float32Array(array(binary),p.vertices.offset,p.vertices.length)),Array.from(Float32Array.from(source.vertices)));
      assert.deepEqual(Array.from(new Uint32Array(array(binary),p.indices.offset,p.indices.length)),Array.from(source.indices));
    }
    assert.ok(own.filter(p=>p.role==='interior-floor').every(p=>p.bounds[0]>=17.91-1e-7),'Existing MD ceiling owns the rest of the floor');
    assert.ok(own.filter(p=>p.role==='interior-roof').every(p=>p.bounds[0]>=14.25-1e-7),'Existing terrace extraction owns the aft roof strip');
    assert.deepEqual(interior.floor,model.upperInteriorFloor.floor);
    const frame=parts.find(p=>p.feature==='upper saloon dark sliding door framing');
    for(let i=0;i<frame.indices.length;i+=3){const ps=frame.indices.slice(i,i+3).map(k=>frame.vertices.slice(k*6,k*6+3));
      assert.ok(!ps.every(v=>Math.abs(v[1])<.29&&v[2]>6&&v[2]<6.04),'No raised track crosses the clear opening');}
  }finally{model.dispose();}
});

test('terrace/interior round trip, diagonal threshold passage, stops and reversals at 12/40/60 Hz',()=>{
  const f=mobile(),n=f.walk.nav,controller=n.tryStep;
  try{
    for(const hz of [12,40,60]){
      n.enterRoom('UD_R01');n.position=route[0].slice();travel(n,route.slice(1),hz);assert.equal(n.location().id,'UD_R02');
      travel(n,route.toReversed().slice(1),hz);
      for(const y of [-.1,0,.1]){
        n.position=[13.95,y];travel(n,[[14.21,-y],[14.5,y]],hz);n.move(0,0);assert.equal(n.elevation,6);
        travel(n,[[14.21,-y],[13.95,y]],hz);
      }
    }
    n.enterRoom('UD_R02');assert.deepEqual(n.position,interiorRoom.spawn.slice(0,2));assert.equal(n.location().name,'Interior superior');
    assert.equal(nextProfile('upper',14.1,'UD'),'upper');assert.equal(nextProfile('upper',17,'UD'),'upper');
    connectUpperInterior(f.walk,interior);assert.equal(n.tryStep,controller);assert.equal(n.routes.length,3);
    assert.equal(f.model.asset.data.rooms.filter(r=>r.id==='UD_R02').length,1);
  }finally{f.dispose();}
});

test('shared collision releases removed furniture but keeps glass, cabinet, bulkhead, headroom and extraction limits',async()=>{
  const f=mobile(),{model,walk}=await full();try{
    for(const p of [[14.21,0],[15,0],[16,-1],[17,0],[18.3,0]]){
      assert.ok(f.walk.nav.floorSafe(...p,'UD'),p.toString());assert.ok(walk.nav.floorSafe(...p,'UD'),p.toString());
    }
    for(const p of [[14.21,.5],[15,2.07],[15,-2.5],[18,1],[18.6,0],[18.65,-1.95],[19.16,-1.62],[13.85,1.5]])
      assert.equal(f.walk.nav.floorSafe(...p,'UD'),false,p.toString());
    for(const p of [[15,1.95],[15,2.07],[15,-2.4],[15,-2.5]]){
      assert.equal(f.walk.nav.floorSafe(...p,'UD'),false,'Body cannot overlap glass '+p);
      assert.equal(walk.nav.floorSafe(...p,'UD'),false,'Full yacht must retain vertical glass '+p);
    }
    for(const y of [1.7,-2.1]){
      for(const n of [f.walk.nav,walk.nav]){
        n.deck='UD';n.position=[15,y];n.elevation=6;n.stair=null;
        for(let i=0;i<100;i++)n.move(0,Math.sign(y)*.02);
        assert.ok(n.position[1]<1.916&&n.position[1]>-2.338,'Stop at the glass with body clearance');
      }
    }
    for(let x=14.1;x<interiorLimits.end-.15;x+=.13)for(let y=-2.3;y<=1.9;y+=.13)
      assert.equal(f.walk.nav.floorSafe(x,y,'UD'),walk.nav.floorSafe(x,y,'UD'),`${x},${y}`);
    assert.equal(f.walk.nav.routes.some(r=>r.id==='bridge'||r.id==='port-swim'),false);
    assert.equal(f.walk.nav.floorSafe(1.4,3.03,'SP'),false);
    assert.ok(f.walk.nav.floorSafe(14.6,-.3,'SD'));
  }finally{f.dispose();model.dispose();}
});

test('interior handoff preserves supported poses and falls back to its safe spawn',async()=>{
  const {model,walk}=await full();try{
    for(const position of route){restoreUpperInteriorHandoff(walk,{deck:'UD',position});assert.deepEqual(walk.nav.position,position);assert.equal(walk.nav.elevation,6);}
    for(const position of [[100,100],[18,1],[14.21,.5]]){
      restoreUpperInteriorHandoff(walk,{deck:'UD',position});assert.deepEqual(walk.nav.position,interiorRoom.spawn.slice(0,2));assert.equal(walk.nav.stair,null);
    }
  }finally{model.dispose();}
});

test('failed, slow or incomplete interior assets retain the existing route and retry installs only the new room',async()=>{
  const f=mobile(false);try{
    assert.equal(f.walk.nav.floorSafe(15,0,'UD'),false);
    await assert.rejects(loadUpperInterior({fetcher:async()=>({ok:false})}));
    await assert.rejects(loadUpperInterior({timeoutMs:5,fetcher:(_,o)=>new Promise((_,reject)=>o.signal.addEventListener('abort',()=>reject(Error('timeout'))))}));
    assert.throws(()=>decodeUpperInterior(manifest,new ArrayBuffer(12)));
    const broken=structuredClone(manifest);broken.floor[0][0][0]=NaN;assert.throws(()=>decodeUpperInterior(broken,array(binary)));
    assert.ok(f.walk.nav.floorSafe(14.6,-.3,'SD'));assert.equal(f.walk.nav.routes.length,3);
    const ready=await loadUpperInterior({fetcher:async()=>({ok:true,json:async()=>manifest,arrayBuffer:async()=>array(binary)})});
    connectUpperInterior(f.walk,ready);assert.ok(f.walk.nav.floorSafe(15,0,'UD'));assert.equal(f.walk.nav.routes.length,3);
  }finally{f.dispose();}
});
