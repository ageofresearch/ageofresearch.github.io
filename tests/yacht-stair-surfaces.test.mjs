import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {buildYachtGeometry,i as Walk,l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import {createFlight,restorableStair,restoreStairPosition} from '../site/tidewater-rocha/mobile/stair-surfaces.js';

const root=new URL('../site/tidewater-rocha/rocha/luz-de-mar/',import.meta.url);
const data=JSON.parse(await readFile(new URL('model.json',root)));
const bytes=await readFile(new URL('model.bin',root));
const asset={data,binary:bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),
  nav:Object.fromEntries(Object.entries(data.nav).map(([id,n])=>[id,{...n,bits:Uint8Array.from(atob(n.mask),c=>c.charCodeAt(0))}]))};
function fixture() {
  const model=buildYachtGeometry(asset,0,{mtuEngines:false,seaStrainers:false});
  model.asset=asset;model.group.userData={yacht:basis};
  const walk=new Walk({camera:{position:model.group.position}},model,{document:null});
  model.navigation.serviceAccess.door.open=true;
  return {model,nav:walk.nav,flights:model.stairInventory.flights};
}
function endpoint(route,end) {
  const a=end?route.path.at(-1):route.path[0],b=end?route.path.at(-2):route.path[1];
  const length=Math.hypot(a[0]-b[0],a[1]-b[1]),margin=route.id==='bridge'?.05:.2;
  return a.map((v,k)=>v+(v-b[k])*margin/length);
}
function travel(nav,points,hz,seen) {
  for(const point of points) {
    const start=[...nav.position],n=Math.max(1,Math.ceil(Math.hypot(point[0]-start[0],point[1]-start[1])*hz/1.12));
    for(let i=0;i<n;i++) {
      nav.move((point[0]-start[0])/n,(point[1]-start[1])/n);
      if(nav.stair) {
        seen.add(nav.stair.surfaceIndex);
        assert.ok(nav.safe(...nav.position),'A stopped visitor must have the same support as a moving visitor');
        const before=[...nav.position,nav.elevation];nav.move(0,0);
        assert.deepEqual(nav.position,before.slice(0,2));
        assert.ok(Math.abs(nav.elevation-before[2])<1e-8,'Stopping must not change height');
      }
    }
    assert.ok(Math.hypot(point[0]-nav.position[0],point[1]-nav.position[1])<.003,
      `Blocked ${nav.stair?.route.id}: ${nav.position} toward ${point}, h=${nav.elevation}`);
  }
}

test('inventory counts arrivals separately and derives the bridge and flared terrace from final geometry',()=>{
  const {model,flights}=fixture();
  try {
    assert.deepEqual(flights.map(f=>[f.id,f.treadCount,f.riseCount]),[
      ['guest',13,14],['bridge',11,12],['aft',11,12],['sun',13,14],['service',12,13]]);
    assert.equal(model.stairInventory.provisionalReferences.length,2);
    assert.ok(model.stairInventory.provisionalReferences.flatMap(r=>r.ids).every(id=>data.meshes.some(m=>m.id===id)));
    assert.ok(model.stairInventory.provisionalReferences.flatMap(r=>r.ids).every(id=>!flights.some(f=>f.route.sourceIDs.includes(id))));
    assert.ok(model.stairInventory.provisionalReferences.every(r=>r.ids.length===9 && r.kind==='flat-reference'));
    const bridge=flights.find(f=>f.id==='bridge'),aft=flights.find(f=>f.id==='aft');
    for(const s of bridge.surfaces.slice(1,4)) {
      assert.ok(s.polygons.flat().every(([x,y])=>x>18.7&&x<19.6&&y<1.11&&y>.41),
        'The terrace widening must never move bridge steps to y=2.21');
    }
    const ys=aft.surfaces[1].polygons.flat().map(p=>p[1]);
    assert.ok(Math.max(...ys)-Math.min(...ys)>1.15);
    assert.equal(aft.safe(5.51,2.51,.14,1),null,'A widened tread does not permit crossing its existing handrail');
  }finally{model.dispose();}
});

test('every enabled full-yacht flight supports return trips, stops, reversals and diagonals at 12/40/60 Hz',()=>{
  const {model,nav,flights}=fixture();
  try {
    for(const hz of [12,40,60])for(const f of flights) {
      const route=f.route,lower=endpoint(route,0),upper=endpoint(route,1);
      const path=route.id==='service'?[...route.path.slice(0,12),[8.88,1.825],[8.88,2.35],[9,2.475]]:route.path;
      nav.deck=route.lower;nav.position=lower;nav.elevation=f.lowerHeight;nav.stair=null;
      assert.ok(nav.floorSafe(...lower));
      const seen=new Set();
      travel(nav,[...path,upper],hz,seen);
      assert.equal(nav.deck,route.upper);assert.equal(nav.stair,null);assert.equal(nav.elevation,f.upperHeight);
      travel(nav,[...path.toReversed(),lower],hz,seen);
      assert.equal(nav.deck,route.lower);assert.equal(nav.stair,null);assert.equal(nav.elevation,f.lowerHeight);
      for(let i=1;i<f.riseCount;i++)assert.ok(seen.has(i),`${route.id}: skipped surface ${i}`);
      // Probe every tread independently from its middle, including curved treads.
      for(const s of f.surfaces.filter(s=>s.kind==='tread')) {
        const p=s.polygons.flat(),point=[0,1].map(k=>(Math.min(...p.map(v=>v[k]))+Math.max(...p.map(v=>v[k])))/2);
        assert.ok(f.safe(...point,nav.radius,s.index),`${route.id}/${s.index}: no supported center`);
        nav.deck=route.lower;nav.position=point;nav.elevation=s.height;nav.stair={route,surfaceIndex:s.index,d:0};
        for(const delta of [[.003,.003],[-.003,-.003],[-.003,.003],[.003,-.003]]) {
          assert.ok(nav.tryStep(point[0]+delta[0],point[1]+delta[1]),`${route.id}/${s.index}: diagonal`);
          assert.ok(nav.tryStep(...point),`${route.id}/${s.index}: reversal`);
        }
      }
    }
  }finally{model.dispose();}
});

test('the eight service disagreements now agree, and walls, tools, ceilings and skipped steps remain blocked',()=>{
  const {model,nav,flights}=fixture();
  try {
    const f=flights.find(f=>f.id==='service'),route=f.route;
    for(const [index,x,y] of [[10,8.314,1.976],[10,8.386,1.529],[11,8.642,2.066],[11,8.948,1.514],
      [12,8.764,2.236],[12,9.226,1.939],[13,8.772,2.475],[13,9.228,2.475]]) {
      nav.deck='LD';nav.position=[x,y];nav.elevation=f.surfaces[index].height;nav.stair={route,surfaceIndex:index,d:0};
      assert.equal(nav.tryStep(x,y),nav.safe(x,y),`Contradictory result at ${x},${y}`);
    }
    assert.equal(f.safe(9.16,2.1,.14,12),null,'The head cannot pass through the existing stored tools');
    assert.equal(f.safe(5.8,1.35,.14,3),null,'Body cannot cross the service sidewall');
    assert.ok(f.safe(8.44,1.8,.14,10),'Glazing no longer crosses the modeled service enclosure');
    nav.position=[5.08,1.75];nav.elevation=f.surfaces[1].height;nav.stair={route,surfaceIndex:1,d:.18};
    assert.equal(nav.tryStep(5.8,1.75),false,'Cannot teleport over intermediate treads');
    assert.equal(restorableStair(nav,route,{stair:'service',deck:'LD',position:[9.16,2.1],elevation:f.surfaces[12].height}),false);
    const guest=flights.find(f=>f.id==='guest');
    const saved={stair:'guest',deck:'LD',position:[17.99,-1.42],elevation:guest.surfaces[13].height};
    assert.ok(restorableStair(nav,guest.route,saved));
    restoreStairPosition(nav,guest.route,saved);
    assert.equal(nav.stair.surfaceIndex,13);assert.equal(nav.elevation,saved.elevation);
    model.navigation.serviceAccess.door.open=false;
    assert.equal(f.safe(9,2.8,.14,f.riseCount),null,'Closing the service door updates collision without rebuilding the flight');
    model.navigation.serviceAccess.door.open=true;
    assert.ok(f.safe(9,2.8,.14,f.riseCount));
  }finally{model.dispose();}
});

test('a missing support surface cannot be replaced by the old centerline fallback',()=>{
  const route={id:'gap',lower:'L',upper:'U',path:[[0,0],[1,0]],distances:[0,1],length:1};
  const rect=(a,b)=>[[a,-.5],[b,-.5],[b,.5],[a,.5]];
  const f=createFlight(route,{L:0,U:.6},[{id:'1',height:.2,polygons:[rect(0,.3)]},
    {id:'2',height:.4,polygons:[rect(.5,.8)]}],{lower:[rect(-1,0)],upper:[rect(.8,2)]});
  assert.equal(f.safe(.4,0,.14,1),null);
  assert.equal(f.at(.6,0,0),undefined,'A point on a distant step is not reachable from the lower landing');
});
