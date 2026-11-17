import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fixture,travel} from './yacht-saloon-fixture.mjs';
import {buildSun} from '../scripts/build-yacht-sun.mjs';
import {decodeUpper,connectUpper} from '../site/tidewater-rocha/mobile/upper-terrace.js';
import {decodeSun,connectSun,loadSun,restoreSunHandoff} from '../site/tidewater-rocha/mobile/sun-deck.js';
import {buildYachtGeometry,i as Walk,l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import {renderedParts} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {indexFootprints} from '../site/tidewater-rocha/mobile/terrace-geometry.js';
import {nextProfile} from '../site/tidewater-rocha/mobile/main-saloon.js';
const root=new URL('../site/tidewater-rocha/',import.meta.url),array=b=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);
const manifest=JSON.parse(await readFile(new URL('mobile/sun-deck.json',root))),binary=await readFile(new URL('mobile/sun-deck.bin',root)),sun=decodeSun(manifest,array(binary));
const upper=decodeUpper(JSON.parse(await readFile(new URL('mobile/upper-terrace.json',root))),array(await readFile(new URL('mobile/upper-terrace.bin',root))));
const data=JSON.parse(await readFile(new URL('rocha/luz-de-mar/model.json',root))),bytes=await readFile(new URL('rocha/luz-de-mar/model.bin',root));
function full() {
  const asset={data,binary:array(bytes),nav:Object.fromEntries(Object.entries(data.nav).map(([id,n])=>[id,{...n,bits:Uint8Array.from(atob(n.mask),c=>c.charCodeAt(0))}]))};
  const model=buildYachtGeometry(asset,0,{mtuEngines:false,seaStrainers:false});model.asset=asset;model.group.userData={yacht:basis};
  const walk=new Walk({camera:{position:model.group.position.clone()},player:{position:model.group.position.clone()}},model,{document:null});return {model,walk};
}
const center=s=>[0,1].map(k=>{const ps=s.polygons.flat().map(p=>p[k]);return(Math.min(...ps)+Math.max(...ps))/2;});

test('sun assets reproduce the shared furniture, guards, supports and three bounded profiles',async()=>{
  const result=await buildSun();assert.deepEqual(result.manifest,manifest);assert.deepEqual(result.binary,binary);
  for(const [name,p]of Object.entries(sun.profiles)) {
    assert.ok(p.triangles<=25000,name);assert.equal(p.batches.length,2);assert.equal(p.triangles,p.batches.reduce((n,b)=>n+b.indices.length/3,0));
    for(const batch of p.batches)assert.equal(new Set(batch.indices).size,batch.attributes.position.length/3,'No unreferenced uploaded vertices');
    const sd=p.audit.filter(p=>p.id.startsWith('SD'));assert.equal(new Set(sd.map(p=>p.id)).size,sd.length,'No partial SD slab or repeated stair assembly');
  }
  assert.ok(Object.values(sun.profiles).reduce((n,p)=>n+p.geometryBytes,0)<9*1024*1024);
  const supports=Object.values(sun.profiles).map(p=>p.audit.filter(a=>a.support||a.stair).map(a=>[a.id,a.triangles,a.error]));
  for(const s of supports)assert.deepEqual(s,supports[0]);
  const {model}=full();try {
    const parts=renderedParts(model);
    for(const p of manifest.parts.filter(p=>p.role!=='floor')) {
      const source=parts.find(s=>s.id===p.id);assert.ok(source,p.id);
      assert.deepEqual(Array.from(new Float32Array(array(binary),p.vertices.offset,p.vertices.length)),Array.from(Float32Array.from(source.vertices)));
      assert.deepEqual(p.bounds,source.bounds);
    }
    assert.equal(manifest.parts.filter(p=>p.role==='floor').length,1);
    const stair=parts.filter(p=>p.semanticParent==='stairs/sun');assert.equal(stair.length,46);
    assert.deepEqual(manifest.parts.filter(p=>p.role==='stair').map(p=>p.id).sort(),stair.map(p=>p.id).sort(),
      'The SD flight is tagged UD in the shared model, but every visible assembly must be extracted');
    for(const profile of Object.values(sun.profiles))for(const p of stair)assert.ok(profile.audit.some(a=>a.id===p.id&&a.triangles>0));
    assert.ok(manifest.parts.some(p=>p.glass));assert.ok(manifest.parts.some(p=>p.feature==='white upper equipment hardtop'));
    for(const s of data.meshes.filter(p=>p.deck==='SD'&&p.category==='Furniture'))assert.ok(manifest.parts.some(p=>p.sourceID===s.id),s.id);
    assert.deepEqual(sun.floor,model.sunDeckFloor.floor);
    const support=indexFootprints(sun.floor.map(polygon=>({polygon})));
    const legs=parts.filter(p=>/^raked hardtop support /.test(p.feature||''));assert.equal(legs.length,2);
    for(const p of legs)for(let i=0;i<p.vertices.length;i+=6)if(p.vertices[i+2]<=8.205)
      assert.ok(support(p.vertices[i],p.vertices[i+1],.002),'Hardtop foot must rest on the SD slab');

    assert.deepEqual(sun.flight.surfaces,model.stairInventory.flights.find(f=>f.id==='sun').surfaces);
  }finally{model.dispose();}
});

test('terrace to sun round trips, each tread and landings work at 12/40/60 Hz without enabling other routes',()=>{
  const f=fixture();connectUpper(f.walk,upper);const controller=f.walk.nav.tryStep;connectSun(f.walk,sun);
  const nav=f.walk.nav,flight=f.model.sun.flight;
  try {
    assert.equal(nav.tryStep,controller);const approach=[[9.9,1.5],[10.4,1.5],[10.4,2.4],[10.9,2.7],[11.35,2.7]];
    const route=[...approach,...flight.route.path,[13.85,.7],[13.85,-.3],[14.6,-.3],[17.5,-.3],[18.9,0]];
    for(const hz of [12,40,60]) {
      nav.enterRoom('UD_R01');nav.position=approach[0].slice();travel(nav,route.slice(1),hz);assert.equal(nav.deck,'SD');assert.equal(nav.elevation,8.2);assert.equal(nav.stair,null);
      travel(nav,route.toReversed().slice(1),hz);assert.equal(nav.deck,'UD');assert.equal(nav.elevation,6);assert.equal(nav.stair,null);
      for(const s of flight.surfaces.slice(1,-1)) {
        const p=center(s);nav.deck='UD';nav.position=p.slice();nav.elevation=s.height;nav.stair={route:flight.route,surfaceIndex:s.index,d:0};
        assert.ok(nav.safe(...p));nav.move(0,0);assert.equal(nav.elevation,s.height);
        for(const [dx,dy]of [[.003,.003],[-.003,.003],[-.003,-.003],[.003,-.003]]){assert.ok(nav.tryStep(p[0]+dx,p[1]+dy));assert.ok(nav.tryStep(...p));}
        assert.equal(nextProfile('upper',p[0],nav.deck,'sun'),'sun');
      }
    }
    nav.stair=null;nav.enterRoom('SD_R01');assert.equal(nav.location().name,'Solárium');assert.ok(nav.floorSafe(...nav.position));
    for(const p of [[12,.5],[15,1.6],[15.5,-1],[17.7,1.4],[12,2],[10.8,0],[19.8,0],[16,2.45]])assert.equal(nav.floorSafe(...p,'SD'),false,p.join(','));
    assert.equal(nav.floorSafe(1.4,3.03,'SP'),false);assert.equal(nav.routes.some(r=>r.id==='port-swim'||r.id==='bridge'),false);
    connectSun(f.walk,sun);assert.equal(nav.routes.length,3);
  }finally{f.dispose();}
});

test('full yacht retains each sun tread and safe SD poses; invalid positions use supported landings',()=>{
  const {model,walk}=full();try {
    restoreSunHandoff(walk,{deck:'SD',position:[14.6,-.3],elevation:8.2});assert.deepEqual(walk.nav.position,[14.6,-.3]);assert.equal(walk.nav.elevation,8.2);
    for(const s of sun.flight.surfaces.slice(1,-1)){
      const position=center(s);restoreSunHandoff(walk,{deck:'UD',stair:'sun',position,elevation:s.height});
      assert.deepEqual(walk.nav.position,position);assert.equal(walk.nav.stair?.surfaceIndex,s.index);assert.equal(walk.nav.elevation,s.height);
    }
    for(const [elevation,deck]of [[6.2,'UD'],[8,'SD']]) {
      restoreSunHandoff(walk,{deck:'UD',stair:'sun',position:[100,100],elevation});
      assert.equal(walk.nav.deck,deck);assert.equal(walk.nav.stair,null);assert.ok(walk.nav.floorSafe(...walk.nav.position));
    }
    const f=fixture();connectUpper(f.walk,upper);connectSun(f.walk,sun);
    try{for(let x=10.8;x<=19.8;x+=.17)for(let y=-2.6;y<=2.6;y+=.17)assert.equal(f.walk.nav.floorSafe(x,y,'SD'),walk.nav.floorSafe(x,y,'SD'),`${x},${y}`);}finally{f.dispose();}
  }finally{model.dispose();}
});

test('network failure, timeout and corrupt stair/geometry cannot enable SD; retry can',async()=>{
  const f=fixture();connectUpper(f.walk,upper);try {
    await assert.rejects(loadSun({fetcher:async()=>({ok:false})}));
    await assert.rejects(loadSun({timeoutMs:5,fetcher:(_,o)=>new Promise((resolve,reject)=>o.signal.addEventListener('abort',()=>reject(Error('aborted'))))}));
    assert.equal(f.walk.nav.routes.length,2);assert.ok(f.walk.nav.floorSafe(8.35,2.21,'UD'));
    const broken=structuredClone(manifest);broken.flight.surfaces[7].height=8;assert.throws(()=>decodeSun(broken,array(binary)));
    assert.throws(()=>decodeSun(manifest,new ArrayBuffer(12)));
    const loaded=await loadSun({fetcher:async()=>({ok:true,json:async()=>manifest,arrayBuffer:async()=>array(binary)})});connectSun(f.walk,loaded);
    assert.equal(f.walk.nav.routes.length,3);assert.ok(f.walk.nav.floorSafe(14.6,-.3,'SD'));
  }finally{f.dispose();}
});
