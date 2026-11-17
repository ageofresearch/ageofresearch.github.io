import test from 'node:test';
import assert from 'node:assert/strict';
import {mobile,full,manifest,binary,guest,array} from './yacht-guest-fixture.mjs';
import {travel} from './yacht-saloon-fixture.mjs';
import {buildGuestAccess} from '../scripts/build-yacht-guest-access.mjs';
import {containsTriangle} from '../scripts/build-yacht-terrace.mjs';
import {decodeGuestAccess,loadGuestAccess,connectGuestAccess,restoreGuestAccessHandoff} from '../site/tidewater-rocha/mobile/guest-access.js';
import {guestRoom,guestLandings,guestApproach,guestProfileDomain} from '../site/tidewater-rocha/mobile/guest-access-geometry.js';
import {nextProfile} from '../site/tidewater-rocha/mobile/main-saloon.js';
import {renderedParts,obstacles} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';

test('guest package is reproducible with six bounded profiles, exact supports and unique geometry ownership',async()=>{
  const built=await buildGuestAccess();assert.deepEqual(built.manifest,manifest);assert.deepEqual(built.binary,binary);
  assert.deepEqual(Object.keys(guest.profiles),['exterior','interior','upper','sun','bow','guest']);
  assert.equal(new Set(manifest.parts.map(p=>p.id)).size,manifest.parts.length);
  assert.ok(!manifest.parts.some(p=>p.role==='access-guest-guard'));
  const ceiling=manifest.parts.filter(p=>p.role==='guest-ceiling').flatMap(p=>{
    const vertices=new Float32Array(array(binary),p.vertices.offset,p.vertices.length),indices=new Uint32Array(array(binary),p.indices.offset,p.indices.length),faces=[];
    for(let i=0;i<indices.length;i+=3) {
      const face=Array.from(indices.slice(i,i+3),k=>Array.from(vertices.slice(k*6,k*6+6)));
      if(face.every(v=>v[5]<-.5&&Math.abs(v[2]-3.83)<.002))faces.push(face.map(v=>v.slice(0,2)));
    }return faces;
  });
  for(const point of [[13.7,-.1],[15,-.1],[16.8,-.1],[15,-.6],[15,.5]])assert.ok(ceiling.some(t=>containsTriangle(...point,t)),'Missing Float32 underside at '+point);
  const batch=guest.profiles.guest.batches[0],attrs=batch.attributes,types=[];
  for(let i=0;i<batch.indices.length;i+=3) {
    const ids=Array.from(batch.indices.slice(i,i+3)),face=ids.map(k=>[
      (attrs.position[k*3+2]+basis.length/2)/basis.sx,attrs.position[k*3]/basis.sy,attrs.position[k*3+1]+basis.seaReference]);
    if(face.every((v,k)=>Math.abs(v[2]-1.55)<.002&&attrs.normal[ids[k]*3+1]>.5)&&containsTriangle(16.8,-.1,face.map(v=>v.slice(0,2))))
      types.push(...ids.map(k=>attrs.aSurface[k*4+2]));
  }
  assert.ok(types.length>0);assert.ok(types.every(type=>type===1),'The LD timber floor keeps the shared plank material, not the saloon carpet');
  for(const [name,p] of Object.entries(guest.profiles)) {
    assert.ok(p.triangles<=25000);assert.equal(p.batches.length,2);
    for(const b of p.batches)assert.equal(new Set(b.indices).size,b.attributes.position.length/3);
    for(const a of p.audit.filter(a=>name==='guest'&&manifest.guestPartIDs.includes(a.id)))assert.equal(a.triangles,a.sourceTriangles,a.id);
  }
  const g=await full();try {
    assert.deepEqual(guest.floor,g.model.guestFloor.floor);
    const flight=g.model.stairInventory.flights.find(f=>f.id==='guest');assert.deepEqual(guest.flight.surfaces,flight.surfaces);
    assert.equal(flight.treadCount,13);assert.equal(flight.riseCount,14);
    const parts=renderedParts(g.model);
    for(const p of manifest.parts.filter(p=>p.role==='guest-stair')) {
      const source=parts.find(q=>q.id===p.id.replace(/\/guest-access$/,''));assert.ok(source);
      assert.deepEqual(p.bounds,source.bounds,'Stairs and guards keep their source position');
    }
  } finally {g.model.dispose();}
});
test('continuous saloon/stair/distributor returns, every tread, stops and diagonals at 12/40/60 Hz',async()=>{
  const f=mobile(),g=await full();try {
    for(const {walk} of [f,g])for(const hz of [12,40,60]) {
      const n=walk.nav,flight=n.stairFlights.get('guest');n.enterRoom('MD_R02');
      const saloon=[[9.2,0],[10.35,-1.9],[14.4,-1.85],[14.4,0]];
      travel(n,[...saloon,...guestApproach],hz);
      travel(n,[...flight.route.path.toReversed(),guestLandings.lower,[16.8,-.1],[13.7,-.1]],hz);
      assert.equal(n.deck,'LD');assert.equal(n.stair,null);assert.equal(n.elevation,1.55);
      travel(n,[[16.8,-.1],guestLandings.lower,...flight.route.path,guestLandings.upper],hz);
      assert.equal(n.deck,'MD');assert.equal(n.stair,null);assert.equal(n.elevation,3.95);
      travel(n,guestApproach.toReversed(),hz);
      travel(n,saloon.toReversed(),hz);
      for(const s of flight.surfaces.filter(s=>s.kind==='tread')) {
        const ps=s.polygons.flat(),p=[0,1].map(k=>(Math.min(...ps.map(p=>p[k]))+Math.max(...ps.map(p=>p[k])))/2);
        n.deck='LD';n.position=p;n.elevation=s.height;n.stair={route:flight.route,surfaceIndex:s.index,d:0};
        n.move(0,0);assert.equal(n.elevation,s.height);assert.ok(n.safe(...p));
        for(const delta of [[.003,.003],[-.003,-.003],[-.003,.003],[.003,-.003]])travel(n,[p.map((v,k)=>v+delta[k]),p],hz);
      }
      assert.equal(flight.clearance.preparedHeights,15);
    }
    assert.equal(f.walk.nav.routes.length,5);connectGuestAccess(f.walk,guest);assert.equal(f.walk.nav.routes.length,5);
    f.walk.nav.enterRoom('LD_R11');assert.deepEqual(f.walk.nav.position,[16.8,-.1]);assert.equal(f.walk.nav.elevation,1.55);
    assert.equal(f.walk.nav.location().displayName,guestRoom.displayName);assert.equal(f.model.asset.data.levels.SP,2.84);
  }finally{f.dispose();g.model.dispose();}
});
test('covered shower faces no longer block descent; exposed glazing and the stair enclosures remain solid',async()=>{
  const g=await full();try {
    const parts=renderedParts(g.model),flight=g.walk.nav.stairFlights.get('guest'),height=flight.surfaces[10].height;
    const screen=parts.find(p=>p.id==='LD_GLA_002');assert.ok(screen);
    const raw=obstacles([screen],new Set(),[16,-3,1.55,20,1,5],{includeVerticalFaces:true});
    assert.equal(raw(18.6244,-1.41512,height,.14),false,'The old projected screen reproduces the blocked transition');
    assert.equal(flight.clearance(18.6244,-1.41512,height,.14),true,'Only support-covered fragments are exempt');
    const exposed=flight.clearance.footprints(1.55).filter(p=>p.id==='LD_GLA_002');assert.ok(exposed.length>0,'The exposed screen cannot be disabled');
    const enclosure=flight.clearance.footprints(2.75).filter(p=>/enclosure/.test(p.name||''));assert.ok(enclosure.length>0);
    const physical=g.model.guestFloor.collisionFootprints.filter(p=>p.id==='LD_GLA_002');assert.ok(physical.length>0,'The screen remains solid from the lower floor');
  }finally{g.model.dispose();}
});
test('pending rooms, body margins and sideways approaches remain closed',()=>{
  const f=mobile();try {
    const n=f.walk.nav;
    for(const p of [[13.3,-.1],[14.7,1.7],[14.7,-2.3],[20,-.1],[18,-.1],[16,.25],[16,-.5]])assert.equal(n.floorSafe(...p,'LD'),false,String(p));
    for(const [deck,p] of [['LD',[17.1,-.1]],['MD',[17.1,-1.42]]]) {
      n.deck=deck;n.position=p.slice();n.stair=null;n.elevation=deck==='LD'?1.55:3.95;
      n.move(0,.01);assert.equal(n.stair,null,'A lateral crossing before the portal cannot capture the visitor');
    }
    assert.equal(n.floorSafe(18.5,1.82,'MD'),false);assert.equal(n.floorSafe(20,-1.8,'UD'),false);
  }finally{f.dispose();}
});
test('handoff restores every guest support and falls back by height without changing other levels',async()=>{
  const g=await full();try {
    const flight=g.walk.nav.stairFlights.get('guest');
    for(const s of flight.surfaces) {
      const ps=s.polygons.flat(),p=s.index===0?guestLandings.lower:s.index===14?guestLandings.upper:
        [0,1].map(k=>(Math.min(...ps.map(p=>p[k]))+Math.max(...ps.map(p=>p[k])))/2);
      restoreGuestAccessHandoff(g.walk,{deck:s.index===14?'MD':'LD',stair:s.kind==='tread'?'guest':null,position:p,elevation:s.height});
      assert.ok(Math.abs(g.walk.nav.elevation-s.height)<1e-8);assert.deepEqual(g.walk.nav.position,p);
      if(s.kind==='tread')assert.equal(g.walk.nav.stair.surfaceIndex,s.index);
    }
    for(const [elevation,deck,p] of [[1.8,'LD',guestLandings.lower],[3.8,'MD',guestLandings.upper]]) {
      restoreGuestAccessHandoff(g.walk,{deck:'LD',stair:'guest',position:[100,100],elevation});
      assert.equal(g.walk.nav.deck,deck);assert.deepEqual(g.walk.nav.position,p);assert.ok(g.walk.nav.safe(...p));
    }
  }finally{g.model.dispose();}
});
test('guest profile uses a bounded portal hysteresis and leaves every other route intact',()=>{
  assert.equal(guestProfileDomain(16.8,-1.42,'interior'),true);assert.equal(guestProfileDomain(16.6,-1.42,'interior'),false);
  assert.equal(guestProfileDomain(16.6,-1.42,'guest'),true);assert.equal(guestProfileDomain(16.39,-1.42,'guest'),false);
  assert.equal(guestProfileDomain(18.5,1.35,'interior'),false);
  assert.equal(nextProfile('interior',17.4,'MD','guest'),'guest');assert.equal(nextProfile('guest',16,'LD',null,false,false,true),'guest');
  assert.equal(nextProfile('guest',16,'MD'),'interior');assert.equal(nextProfile('guest',19,'MD','bridge'),'upper');
  assert.equal(nextProfile('guest',15,'UD','sun'),'sun');assert.equal(nextProfile('upper',20,'UD',null,true),'bow');
});
test('corrupt, stale and unavailable guest data are rejected before navigation is connected',async()=>{
  const f=mobile(false);try {
    assert.equal(f.model.guestAccess,undefined);assert.ok(!f.walk.nav.routes.some(r=>r.id==='guest'));
    assert.throws(()=>decodeGuestAccess({...manifest,version:'stale'},array(binary)));
    assert.throws(()=>decodeGuestAccess(manifest,new ArrayBuffer(12)));
    for(const mutate of [m=>m.flight.surfaces.splice(5,1),m=>m.flight.obstacles.splice(5,1),m=>m.domains[0][0][0]=NaN,m=>m.profiles.guest.triangles=25001,m=>m.room.spawn=null,m=>m.flight.route.path[0][0]=25]) {
      const m=structuredClone(manifest);mutate(m);assert.throws(()=>decodeGuestAccess(m,array(binary)));
    }
    await assert.rejects(loadGuestAccess({fetcher:async()=>({ok:false})}));
    assert.ok(!f.walk.nav.routes.some(r=>r.id==='guest'));assert.equal(f.walk.nav.floorSafe(16.8,-.1,'LD'),false);
  }finally{f.dispose();}
});
