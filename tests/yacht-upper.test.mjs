import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fixture,travel} from './yacht-saloon-fixture.mjs';
import {buildUpper} from '../scripts/build-yacht-upper.mjs';
import {buildYachtGeometry,i as Walk,l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import {renderedParts} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {decodeUpper,connectUpper,loadUpper,restoreUpperHandoff} from '../site/tidewater-rocha/mobile/upper-terrace.js';
import {topTriangles,onSurface} from '../site/tidewater-rocha/mobile/stern-access.js';
import {nextProfile} from '../site/tidewater-rocha/mobile/main-saloon.js';
const root=new URL('../site/tidewater-rocha/',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('mobile/upper-terrace.json',root)));
const binary=await readFile(new URL('mobile/upper-terrace.bin',root));
const buffer=binary.buffer.slice(binary.byteOffset,binary.byteOffset+binary.byteLength);
const upper=decodeUpper(manifest,buffer);
function fullFixture() {
  return Promise.all(['model.json','model.bin'].map(p=>readFile(new URL('rocha/luz-de-mar/'+p,root)))).then(([j,b])=>{
    const data=JSON.parse(j),asset={data,binary:b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),
      nav:Object.fromEntries(Object.entries(data.nav).map(([k,n])=>[k,{...n,bits:Uint8Array.from(atob(n.mask),c=>c.charCodeAt(0))}]))};
    const model=buildYachtGeometry(asset,0,{mtuEngines:false,seaStrainers:false});model.asset=asset;model.group.userData={yacht:basis};
    return {model,walk:new Walk({camera:{position:model.group.position.clone()},player:{position:model.group.position.clone()}},model,{document:null})};
  });
}

test('two reproducible profiles preserve final furniture and stair supports within budget',async()=>{
  const result=await buildUpper();assert.deepEqual(result.manifest,manifest);assert.deepEqual(result.binary,binary);
  for(const p of Object.values(upper.profiles)) {
    assert.ok(p.triangles<=25000);assert.equal(p.batches.length,2);
    assert.equal(p.triangles,Math.max(...p.batches[0].ranges.map(([,count])=>(count+p.batches[1].indices.length)/3)));
  }
  const supports=Object.values(upper.profiles).map(p=>p.audit.filter(a=>a.stair||a.support).map(a=>[a.id,a.triangles,a.error]));
  assert.equal(supports.length,2);
  assert.deepEqual(supports[0],supports[1]);
  const {model}=await fullFixture();
  try {
    const final=renderedParts(model);
    for(const p of manifest.parts.filter(p=>p.role==='furniture')) {
      const source=final.find(q=>q.id===p.id);assert.ok(source,p.id);
      assert.deepEqual(Array.from(new Float32Array(buffer,p.vertices.offset,p.vertices.length)),Array.from(Float32Array.from(source.vertices)));
      assert.deepEqual(Array.from(new Uint32Array(buffer,p.indices.offset,p.indices.length)),Array.from(source.indices));
      assert.deepEqual(p.bounds,source.bounds);
    }
    assert.equal(manifest.parts.filter(p=>p.feature?.startsWith('upper club chair recessed foot')).length,2);
    assert.ok(!manifest.parts.some(p=>p.feature?.startsWith('exterior dining chair')));
    assert.equal(manifest.parts.filter(p=>p.sourceID==='UD_FUR_001').length,6);
    assert.ok(!manifest.parts.some(p=>/UD_FUR_00[234]|UD_SOF/.test(p.sourceID)));
    assert.deepEqual(manifest.flight.surfaces,model.stairInventory.flights.find(f=>f.id==='aft').surfaces);
    assert.ok(manifest.parts.filter(p=>p.role==='floor').every(p=>p.bounds[0]>=8.5&& (p.bounds[1]>=3.13-1e-6||p.bounds[4]<=-3.13+1e-6)), 'Only missing side strips supplement the existing shared floor/ceiling');
  }finally{model.dispose();}
});

test('mobile upper route supports every tread, stops, reversals, diagonals and both landings at 12/40/60 Hz',()=>{
  const {model,walk,dispose}=fixture();
  try {
    const nav=walk.nav,controller=nav.tryStep;connectUpper(walk,upper);
    assert.equal(nav.tryStep,controller,'Adding a flight must not nest controllers');
    const f=model.upper.flight,route=f.route;
    const path=[[6.68,0],[5.82,.30],[5.78,.84],[5.68,1.04],[4.9,1.2],[4.4,1.7],[4.7,2.28],[5.72,2.28],...route.path,[8.35,2.28],[9.9,1.5],[10.2,1.5],[10.25,-.40],[13.8,-.40],[13.8,.1]];
    for(const hz of [12,40,60]) {
      nav.deck='MD';nav.position=path[0].slice();nav.elevation=3.95;nav.stair=null;
      travel(nav,path.slice(1),hz);assert.equal(nav.deck,'UD');assert.equal(nav.elevation,6);assert.equal(nav.stair,null);
      travel(nav,path.toReversed().slice(1),hz);assert.equal(nav.deck,'MD');assert.equal(nav.elevation,3.95);assert.equal(nav.stair,null);
      for(const s of f.surfaces.filter(s=>s.kind==='tread')) {
        const points=s.polygons.flat(),point=[0,1].map(k=>(Math.min(...points.map(p=>p[k]))+Math.max(...points.map(p=>p[k])))/2);
        nav.deck='MD';nav.position=point.slice();nav.elevation=s.height;nav.stair={route,surfaceIndex:s.index,d:0};
        assert.ok(nav.safe(...point));nav.move(0,0);assert.equal(nav.elevation,s.height);
        for(const [dx,dy]of [[.003,.003],[-.003,.003],[-.003,-.003],[.003,-.003]]) {
          assert.ok(nav.tryStep(point[0]+dx,point[1]+dy));assert.ok(nav.tryStep(...point));
        }
        assert.equal(nextProfile('exterior',point[0],nav.deck,nav.stair.route.id),'upper');
      }
    }
    const n=nav.routes.length;connectUpper(walk,upper);assert.equal(nav.routes.length,n);assert.equal(nav.tryStep,controller);
  }finally{dispose();}
});

test('the port stair approach has one continuous teak surface in both viewers',async()=>{
  const mobile=fixture(),full=await fullFixture();
  try {
    connectUpper(mobile.walk,upper);
    const md=full.model.interiorDetail.replacements.get('MD_DCK_001');
    const packed=mobile.model.terrace.parts.filter(p=>p.role==='floor');
    for (const parts of [md,packed]) {
      const margin=parts.find(p=>p.feature==='inlaid teak cockpit stair margin');
      const deck=parts.filter(p=>p!==margin).flatMap(p=>topTriangles(p,3.95));
      const border=topTriangles(margin,3.95);
      for (const [x,y] of [[4.91,1.47],[5.15,1.8],[5.2,2.04],[5.32,2.21]]) {
        assert.ok(onSurface(x,y,deck),'Missing teak at '+[x,y]);
        assert.equal(onSurface(x,y,border),false);
      }
      for (const [x,y] of [[5.89,2.28],[6.01,2.78],[6.24,2.83]]) {
        assert.ok(onSurface(x,y,border),'Missing rounded margin at '+[x,y]);
        assert.equal(onSurface(x,y,deck),false,'Stacked floor under margin');
      }
      assert.equal(onSurface(5.9,1.50,deck),false,'The rising service enclosure owns this area');
    }
    for (const [viewer,{walk}] of Object.entries({mobile,full})) {
      for (const [x,y] of [[4.94,1.79],[5.10,1.96],[5.18,2.04]])
        assert.ok(walk.nav.floorSafe(x,y,'MD'),viewer+' approach must support the body at '+[x,y]);
      assert.equal(walk.nav.floorSafe(5.64,2.08,'MD'),false,'Body clearance at the rising service housing');
    }
    const nav=mobile.walk.nav;
    const path=[[-4.3,3.1],[2.1,3.1],[3.65,3.1],[4.56,3.1],[4.59,2.40],
      [4.75,2.10],[5.10,1.96],[5.18,2.04],[5.24,2.28],
      ...upper.flight.route.path,[8.35,2.28],[9.9,1.5]];
    for(const hz of [12,40,60]){
      nav.enterRoom('boarding');travel(nav,path,hz);
      assert.equal(nav.deck,'UD');assert.equal(nav.elevation,6);
      travel(nav,path.toReversed(),hz);
      assert.equal(nav.deck,'MD');assert.ok(Math.abs(nav.elevation-mobile.model.boarding.height(-4.3))<1e-5);
      const fullNav=full.walk.nav, fromCockpit=path.slice(4);
      fullNav.deck='MD';fullNav.position=fromCockpit[0].slice();fullNav.elevation=3.95;fullNav.stair=null;
      travel(fullNav,fromCockpit,hz);
      assert.equal(fullNav.deck,'UD');assert.equal(fullNav.elevation,6);
      travel(fullNav,fromCockpit.toReversed(),hz);
      assert.equal(fullNav.deck,'MD');assert.equal(fullNav.elevation,3.95);
    }
  } finally {mobile.dispose();full.model.dispose();}
});

test('upper boundaries retain furniture, overhead clearance, closed solarium and blocked port swim access',()=>{
  const f=fixture();connectUpper(f.walk,upper);const nav=f.walk.nav;
  try {
    for(const p of [[8.35,2.21],[9.9,1.5],[13.8,.1]])assert.ok(nav.floorSafe(...p,'UD'));
    for(const p of [[8.9,-.5],[6.1,0],[8,-2.4],[12.1,-.8],[14.15,.1],[14.3,0],[6.5,3.7],[11.65,2.7],[13.8,1.5]])assert.equal(nav.floorSafe(...p,'UD'),false,p.toString());
    assert.equal(nav.floorSafe(1.4,3.03,'SP'),false);
    assert.equal(nav.routes.some(r=>r.id==='sun'||r.id==='port-swim'),false);
    nav.deck='MD';nav.position=[6.06,2.28];nav.elevation=upper.flight.surfaces[1].height;nav.stair={route:f.model.upper.flight.route,surfaceIndex:1,d:.1};
    assert.equal(nav.tryStep(6.53,2.28),false,'Cannot skip treads');
    assert.equal(f.model.upper.flight.safe(6.24,2.60,.14,2),null,'Rail stays solid');
    nav.stair=null;nav.enterRoom('UD_R01');assert.ok(nav.floorSafe(...nav.position));assert.equal(nav.elevation,6);
    nav.enterRoom('swim-platform');travel(nav,[[.35,-3.03],[.52,-3.03],[2.6,-3.03],[3,-3.03]]);assert.equal(nav.deck,'MD');
  }finally{f.dispose();}
});

test('failed, timed out or corrupt upper assets leave lower navigation usable; ready retry enables only UD',async()=>{
  const f=fixture();
  try {
    assert.equal(f.walk.nav.floorSafe(8.35,2.21,'UD'),false);assert.equal(f.walk.nav.routes.length,1);
    await assert.rejects(loadUpper({fetcher:async()=>({ok:false})}));
    await assert.rejects(loadUpper({timeoutMs:5,fetcher:(_,options)=>new Promise((resolve,reject)=>options.signal.addEventListener('abort',()=>reject(Error('aborted'))))}));
    assert.ok(f.walk.nav.floorSafe(9.2,0,'MD'));assert.equal(f.walk.nav.routes.length,1);
    const broken=structuredClone(manifest);broken.flight.surfaces[5].height=7;assert.throws(()=>decodeUpper(broken,buffer));
    const loaded=await loadUpper({fetcher:async url=>({ok:true,json:async()=>manifest,arrayBuffer:async()=>buffer})});
    connectUpper(f.walk,loaded);assert.equal(f.walk.nav.routes.length,2);assert.ok(f.walk.nav.floorSafe(8.35,2.21,'UD'));
  }finally{f.dispose();}
});

test('complete-yacht handoff preserves UD and each actual tread, with nearest-landing fallback',async()=>{
  const {model,walk}=await fullFixture();
  try {
    restoreUpperHandoff(walk,{deck:'UD',position:[8.35,2.21],elevation:6});
    assert.deepEqual(walk.nav.position,[8.35,2.21]);assert.equal(walk.nav.deck,'UD');assert.equal(walk.nav.elevation,6);
    for(const s of manifest.flight.surfaces.slice(1,-1)) {
      const pts=s.polygons.flat(),position=[0,1].map(k=>(Math.min(...pts.map(p=>p[k]))+Math.max(...pts.map(p=>p[k])))/2);
      restoreUpperHandoff(walk,{deck:'MD',stair:'aft',position,elevation:s.height});
      assert.deepEqual(walk.nav.position,position);assert.equal(walk.nav.stair?.surfaceIndex,s.index);assert.equal(walk.nav.elevation,s.height);
    }
    for(const [elevation,deck,position]of [[4.1,'MD',[5.28,2.28]],[5.9,'UD',[8.35,2.28]]]) {
      restoreUpperHandoff(walk,{deck:'MD',stair:'aft',position:[100,100],elevation});
      assert.equal(walk.nav.deck,deck);assert.equal(walk.nav.stair,null);
      assert.ok(Math.hypot(...walk.nav.position.map((v,k)=>v-position[k]))<1e-9);
    }
  }finally{model.dispose();}
});
