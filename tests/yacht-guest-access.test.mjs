import test from 'node:test';
import assert from 'node:assert/strict';
import {mobile,full,manifest,binary,guest,array} from './yacht-guest-fixture.mjs';
import {saloonManifest,saloonBuffer,travel} from './yacht-saloon-fixture.mjs';
import {buildGuestAccess} from '../scripts/build-yacht-guest-access.mjs';
import {clipGeometry,containsTriangle} from '../scripts/build-yacht-terrace.mjs';
import {decodeGuestAccess,loadGuestAccess,connectGuestAccess,restoreGuestAccessHandoff} from '../site/tidewater-rocha/mobile/guest-access.js';
import {guestRoom,guestLandings,guestApproach,guestProfileDomain,onGuestApproach} from '../site/tidewater-rocha/mobile/guest-access-geometry.js';
import {nextProfile} from '../site/tidewater-rocha/mobile/main-saloon.js';
import {renderedParts,obstacles} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';

test('guest package is reproducible with six bounded profiles, exact supports and unique geometry ownership',async()=>{
  const built=await buildGuestAccess();assert.deepEqual(built.manifest,manifest);assert.deepEqual(built.binary,binary);
  assert.deepEqual(Object.keys(guest.profiles),['exterior','upper','sun','bow','guest','main']);
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
      if(!/sculpted ivory enclosure|upper flight underside lining/.test(p.feature))continue;
      const edges=new Map();
      for(let i=0;i<source.indices.length;i+=3){
        const [a,b,c]=Array.from(source.indices.slice(i,i+3),j=>source.vertices.slice(j*6,j*6+6));
        const u=b.slice(0,3).map((v,k)=>v-a[k]), v=c.slice(0,3).map((v,k)=>v-a[k]);
        const normal=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
        assert.ok(normal.reduce((n,x,k)=>n+x*a[3+k],0)>0,'Back-facing triangle in '+p.id);
        for(const [start,end] of [[a,b],[b,c],[c,a]]){
          const A=start.slice(0,3).join(','),B=end.slice(0,3).join(',');
          const key=A<B?A+';'+B:B+';'+A;
          edges.set(key,(edges.get(key)??0)+(A<B?1:-1));
        }
      }
      assert.ok([...edges.values()].every(n=>n===0),'Unclosed stair shell '+p.id);
    }
  } finally {g.model.dispose();}
});
test('the active guest draw keeps the stair enclosure, partitions and slab in front of the eye',()=>{
  const profile=guest.profiles.guest, batch=profile.batches[0], position=batch.attributes.position;
  const vertices=Array.from({length:position.length/3},(_,i)=>[
    (position[i*3+2]+basis.length/2)/basis.sx, position[i*3]/basis.sy, position[i*3+1]+basis.seaReference]);
  const sub=(a,b)=>a.map((v,k)=>v-b[k]);
  const cross=([x,y,z],[X,Y,Z])=>[y*Z-z*Y,z*X-x*Z,x*Y-y*X];
  const dot=(a,b)=>a.reduce((sum,v,i)=>sum+v*b[i],0);
  // Distances to the full model's first opaque surface, measured from tread
  // centres. Test the directional front faces actually submitted for that band.
  for(const [step,bearing,pitch,expected] of [
    [8,312,-24,.7936],[6,354,32,.6925],       // transverse return
    [10,252,24,1.4114],[8,264,24,1.7447],     // starboard partition
    [8,264,-24,1.4049],[2,48,40,.5245],       // both faces of the MD slab
    [6,54,8,1.1477],                         // equipment behind the doorway
    [9,198,-32,1.7702],[8,204,-24,1.8479],[11,204,-56,1.5764] // under upper arm
  ]){
    const surface=guest.flight.surfaces[step],points=surface.polygons.flat();
    const eye=[0,1].map(k=>(Math.min(...points.map(p=>p[k]))+Math.max(...points.map(p=>p[k])))/2);
    eye.push(surface.height+1.6);
    const h=bearing*Math.PI/180,t=pitch*Math.PI/180;
    const dir=[Math.cos(h)*Math.cos(t),Math.sin(h)*Math.cos(t),Math.sin(t)];
    const visibility=profile.visibility;
    const band=Math.floor((eye[0]*basis.sx-basis.length/2-visibility.start)/visibility.step);
    const [first,count]=batch.ranges[band+(eye[1]>0?visibility.lateralBands:0)];
    let nearest=Infinity;
    for(let i=first;i<first+count;i+=3){
      const a=vertices[batch.indices[i]], b=vertices[batch.indices[i+1]], c=vertices[batch.indices[i+2]];
      const ab=sub(b,a),ac=sub(c,a),p=cross(dir,ac),det=dot(ab,p);
      if(det<1e-8)continue;
      const origin=sub(eye,a),u=dot(origin,p);
      if(u<0||u>det)continue;
      const q=cross(origin,ab),v=dot(dir,q),depth=dot(ac,q)/det;
      if(v>=0&&u+v<=det&&depth>.025)nearest=Math.min(nearest,depth);
    }
    assert.ok(Math.abs(nearest-expected)<.003,`Step ${step}, view ${bearing}/${pitch}: ${nearest}, expected ${expected}`);
  }
});

test('the stairwell screens adjacent cabins from the forward saloon while leaving the flight open',async()=>{
  const eye=[17.547,-1.539,5.55],deck=3.95;
  // Intersections of sightlines from the reported 353.9°, −35.7° view
  // with the main-deck plane. They previously reached an adjacent cabin.
  const cabinRays=[[19.362,-.190],[18.645,-.216],[18.302,-.245]];
  function covers(part,xy) {
    const projected=[];
    for(let i=0;i<part.vertices.length;i+=6){
      const t=(eye[2]-deck)/(eye[2]-part.vertices[i+2]);
      projected.push([eye[0]+t*(part.vertices[i]-eye[0]),eye[1]+t*(part.vertices[i+1]-eye[1])]);
    }
    for(let i=0;i<part.indices.length;i+=3){
      const tri=Array.from(part.indices.slice(i,i+3),k=>projected[k]);
      if(containsTriangle(...xy,tri))return true;
    }
    return false;
  }
  const f=await full();
  try {
    const source=renderedParts(f.model).find(p=>p.feature==='guest stairwell lining');
    assert.ok(source);
    const part=saloonManifest.parts.find(p=>p.id===source.id),data=array(saloonBuffer);
    assert.ok(part);
    const packed={vertices:Array.from(new Float32Array(data,part.vertices.offset,part.vertices.length)),
      indices:Array.from(new Uint32Array(data,part.indices.offset,part.indices.length))};
    for(const mesh of [source,packed]){
      const aboveCabins=clipGeometry(mesh,[17,-3,2.5,20,1,6]);
      for(const xy of cabinRays)assert.ok(covers(aboveCabins,xy),'Unscreened cabin sightline '+xy);
      const aboveTread=clipGeometry(mesh,[17,-3,3.60,20,1,6]);
      assert.equal(covers(aboveTread,[18.17,-1.44]),false,'The wall must fall behind the upper treads');
    }
    const deck=renderedParts(f.model).find(p=>p.id==='MD_DCK_001/stairs/stair-opening');
    const fascia=[];
    for(let i=0;i<deck.indices.length;i+=3){
      const face=Array.from(deck.indices.slice(i,i+3),k=>deck.vertices.slice(k*6,k*6+6));
      if(face.every(v=>Math.abs(v[0]-19.58)<1e-5 && v[3]<-.99))fascia.push(face.map(v=>[v[1],v[2]]));
    }
    for(const y of [-1.84,-1.81,-1.76,-1.71,-1.60])for(const z of [3.84,3.89,3.94]){
      assert.ok(fascia.some(face=>containsTriangle(y,z,face)),'Missing forward reveal at '+[y,z]);
    }
    for(const name of ['main','guest']){
      const draw=manifest.profiles[name].audit.find(p=>p.id===part.id);
      assert.equal(draw?.triangles,source.indices.length/3);
    }
  }finally{f.model.dispose();}
});

test('the prepared approach includes the guest corridor and excludes the adjacent saloon',()=>{
  for(let i=1;i<guestApproach.length;i++) {
    const [ax,ay]=guestApproach[i-1],[bx,by]=guestApproach[i];
    assert.equal(onGuestApproach(ax,ay),true);
    assert.equal(onGuestApproach((ax+bx)/2,(ay+by)/2),true);
  }
  assert.equal(onGuestApproach(...guestApproach.at(-1)),true);
  for(const xy of [[6.7,0],[15.8,.1],[17.2,-.95],[17.2,-2.05]])assert.equal(onGuestApproach(...xy),false);
});

test('the aft port cabin keeps its fitted carpet and carpeted threshold',()=>{
  for(const [feature,footprint] of [
    ['port cabin blue pile carpet',[14.348,.446,17.772,3.525]],
    ['port cabin threshold carpet',[16.01,.325,16.96,.45]]
  ]){
    const part=manifest.parts.find(p=>p.feature===feature);
    assert.ok(part,feature);
    const [x,y,,X,Y]=part.bounds;
    assert.deepEqual([x,y,X,Y].map(v=>Number(v.toFixed(3))),footprint);
  }
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
      n.enterRoom('MD_R02');
      travel(n,[...saloon,...guestApproach,...flight.route.path.toReversed(),guestLandings.lower,...guest.cabinRoute],hz);
      assert.equal(n.location().id,'LD_R03');
      const atBed=n.position.slice();
      n.move(0,0);
      for(const offset of [-.018,.018])travel(n,[[atBed[0]+offset,atBed[1]-.035],atBed],hz);
      travel(n,[...guest.cabinRoute.toReversed(),guestLandings.lower,...flight.route.path,...guestApproach.toReversed(),...saloon.toReversed()],hz);
      assert.equal(n.deck,'MD');
      for(const point of [[15.8,.35],[16.05,.37],[16.91,.37],[15.85,2.1],[17.55,2],[14.45,1.05],[17.05,3.56]])
        assert.equal(n.floorSafe(...point,'LD'),false,'Blocked cabin furnishing or jamb '+point);
      n.enterRoom('LD_R03');assert.equal(n.location().id,'LD_R03');
      assert.deepEqual(n.position,guest.cabin.spawn.slice(0,2));
      for(const s of flight.surfaces.filter(s=>s.kind==='tread')) {
        const ps=s.polygons.flat(),p=[0,1].map(k=>(Math.min(...ps.map(p=>p[k]))+Math.max(...ps.map(p=>p[k])))/2);
        n.deck='LD';n.position=p;n.elevation=s.height;n.stair={route:flight.route,surfaceIndex:s.index,d:0};
        n.move(0,0);assert.equal(n.elevation,s.height);assert.ok(n.safe(...p));
        for(const delta of [[.003,.003],[-.003,-.003],[-.003,.003],[.003,-.003]])travel(n,[p.map((v,k)=>v+delta[k]),p],hz);
      }
      assert.equal(flight.clearance.preparedHeights,15);
    }
    assert.equal(f.walk.nav.routes.length,6);connectGuestAccess(f.walk,guest);assert.equal(f.walk.nav.routes.length,6);
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
    for(const p of [[13.3,-.1],[15.6,2.1],[14.7,-2.3],[20,-.1],[18,-.1],[16,.25],[16,-.5]])assert.equal(n.floorSafe(...p,'LD'),false,String(p));
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
  assert.equal(guestProfileDomain(16.8,-1.42,'exterior'),true);assert.equal(guestProfileDomain(16.6,-1.42,'exterior'),false);
  assert.equal(guestProfileDomain(16.6,-1.42,'guest'),true);assert.equal(guestProfileDomain(16.39,-1.42,'guest'),false);
  assert.equal(guestProfileDomain(18.5,1.35,'exterior'),false);
  assert.equal(nextProfile('exterior',17.4,'MD','guest'),'guest');assert.equal(nextProfile('guest',16,'LD',null,false,false,true),'guest');
  assert.equal(nextProfile('guest',16,'MD'),'exterior');assert.equal(nextProfile('guest',19,'MD','bridge'),'upper');
  for(const stair of ['aft','bridge'])assert.equal(nextProfile('guest',17.4,'MD',stair,false,false,true),'upper');
  assert.equal(nextProfile('guest',15,'UD','sun'),'sun');assert.equal(nextProfile('upper',20,'UD',null,true),'bow');
});
test('corrupt, stale and unavailable guest data are rejected before navigation is connected',async()=>{
  const f=mobile(false);try {
    assert.equal(f.model.guestAccess,undefined);assert.ok(!f.walk.nav.routes.some(r=>r.id==='guest'));
    assert.throws(()=>decodeGuestAccess({...manifest,version:'stale'},array(binary)));
    assert.throws(()=>decodeGuestAccess(manifest,new ArrayBuffer(12)));
    for(const mutate of [m=>m.mainDeck.floor=[],m=>m.mainDeck.collisionFootprints[0].polygon[0][0]=NaN,m=>delete m.profiles.main,m=>m.cabin=null,m=>m.cabinRoute.splice(1),m=>m.domains.pop(),m=>m.flight.surfaces.splice(5,1),m=>m.flight.obstacles.splice(5,1),m=>m.domains[0][0][0]=NaN,m=>m.profiles.guest.triangles=25001,m=>m.room.spawn=null,m=>m.flight.route.path[0][0]=25]) {
      const m=structuredClone(manifest);mutate(m);assert.throws(()=>decodeGuestAccess(m,array(binary)));
    }
    await assert.rejects(loadGuestAccess({fetcher:async()=>({ok:false})}));
    assert.ok(!f.walk.nav.routes.some(r=>r.id==='guest'));assert.equal(f.walk.nav.floorSafe(16.8,-.1,'LD'),false);
  }finally{f.dispose();}
});
