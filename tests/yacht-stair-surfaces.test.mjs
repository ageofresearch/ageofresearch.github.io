import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {buildYachtGeometry,i as Walk,l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import {createFlight,restorableStair,restoreStairPosition} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {aftStairMirrorFinish} from '../site/tidewater-rocha/mobile/aft-cockpit-stair.js';

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

test('inventory counts arrivals separately and derives the revised cockpit run from final geometry',()=>{
  const {model,flights}=fixture();
  try {
    assert.deepEqual(flights.map(f=>[f.id,f.treadCount,f.riseCount]),[
      ['guest',13,14],['bridge',11,12],['aft',9,10],['sun',13,14],['service',12,13],['starboard-fore',13,14]]);
    for(const flight of flights)assert.equal(flight.clearance.preparedHeights,
      new Set(flight.surfaces.map(s=>s.height.toFixed(6))).size,
      flight.id+': collision construction must finish before the first movement');
    assert.equal(model.stairInventory.provisionalReferences.length,2);
    assert.ok(model.stairInventory.provisionalReferences.flatMap(r=>r.ids).every(id=>data.meshes.some(m=>m.id===id)));
    assert.ok(model.stairInventory.provisionalReferences.flatMap(r=>r.ids).every(id=>!flights.some(f=>f.route.sourceIDs.includes(id))));
    assert.ok(model.stairInventory.provisionalReferences.every(r=>r.ids.length===9 && r.kind==='flat-reference'));
    const bridge=flights.find(f=>f.id==='bridge'),aft=flights.find(f=>f.id==='aft');
    for(const s of bridge.surfaces.slice(1,4)) {
      assert.ok(s.polygons.flat().every(([x,y])=>x>18.7&&x<19.6&&y<1.11&&y>.41),
        'The terrace widening must never move bridge steps to y=2.21');
    }
    const parts=model.interiorDetail.replacements.get('MD_STA_013');
    const treads=parts.filter(p=>/timber border$/.test(p.feature));
    const width=p=>p.bounds[4]-p.bounds[1], depth=p=>p.bounds[3]-p.bounds[0];
    assert.equal(treads.length,10);
    assert.ok(Math.abs(width(treads[0])-.94)<1e-8,'Only the first tread flares at the plinth');
    assert.ok(treads.slice(1).every(p=>Math.abs(width(p)-.74)<1e-8));
    const centre=aft.route.path[0][1],toe=treads[0].bounds[0];
    assert.ok(aft.safe(toe+.03,centre,.14,1));
    assert.equal(aft.safe(toe+.02,centre+.50,.14,1),null,'The rounded corner does not support the whole body');
    assert.ok(depth(treads[0])>.3);
    assert.ok(treads.slice(1,-1).every(p=>depth(p)>.22 && depth(p)<.24));
    const threshold=treads.at(-1);
    assert.equal(threshold.bounds[3],aft.route.path.at(-1)[0]);
    const cheeks=parts.filter(p=>p.feature.startsWith('gloss black stair cheek'));
    assert.equal(cheeks.length,2);
    assert.ok(cheeks.every(p=>p.bounds[3]===threshold.bounds[3] && p.bounds[5]===aft.upperHeight),
      'Both cheeks meet the landing below the fixed upper railing');
    const risers=parts.filter(p=>/polished riser$/.test(p.feature));
    assert.equal(risers.length,9);
    assert.equal(parts.find(p=>p.feature==='first rounded stair plinth').finish[3],aftStairMirrorFinish);
    for(const [i,panel] of risers.entries()){
      const [x,y,z,X,Y,Z]=panel.bounds;
      const above=treads[i+1].bounds;
      assert.equal(panel.finish[3],aftStairMirrorFinish);
      assert.ok(above[0]<x && X<above[3],`Riser ${i+2} must fit under the teak nose`);
      assert.ok(Math.abs(z-(aft.surfaces[i+1].height+.003))<1e-8);
      assert.ok(above[2]-Z>.003 && above[2]-Z<.005,'Keep the fine upper reveal');
      assert.ok(Y-y>.72 && Z-z>.15,'The reflective face closes the centre of the interval');
    }
    const seats=parts.find(p=>p.feature==='aft stair folded end seats');
    for (const tread of treads.slice(1)) {
      for(const y of [tread.bounds[1],tread.bounds[4]]){
        assert.ok(seats.vertices.some((x,i)=>i%6===0 && x>tread.bounds[0] && x<tread.bounds[3] &&
          Math.abs(seats.vertices[i+1]-y)<.004 && Math.abs(seats.vertices[i+2]-tread.bounds[2])<.002),
        'Both folded seats connect to the underside of their tread');
      }
    }
    assert.equal(aft.surfaces.at(-1).height,6);
    assert.equal(aft.surfaces[0].height,3.95);
    assert.ok(aft.surfaces[1].height-aft.lowerHeight<.18);
    assert.ok(aft.surfaces.slice(2).every((s,i)=>s.height-aft.surfaces[i+1].height<.223));
    assert.equal(aft.safe(6.24,2.60,.14,2),null,'The lower rail stays solid');
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
      assert.equal(nav.deck,route.upper,`${route.id} upper landing at ${nav.position}, safe=${nav.floorSafe(...nav.position,route.upper)}`);assert.equal(nav.stair,null);assert.equal(nav.elevation,f.upperHeight);
      travel(nav,[...path.toReversed(),lower],hz,seen);
      assert.equal(nav.deck,route.lower);assert.equal(nav.stair,null);assert.equal(nav.elevation,f.lowerHeight);
      for(let i=1;i<f.riseCount;i++)assert.ok(seen.has(i),`${route.id}: skipped surface ${i}`);
      assert.equal(f.clearance.preparedHeights,new Set(f.surfaces.map(s=>s.height.toFixed(6))).size,
        'Walking may not create additional collision indices');
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
