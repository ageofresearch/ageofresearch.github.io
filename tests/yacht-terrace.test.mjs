import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildTerrace, clipGeometry, contactShade, containsTriangle } from '../scripts/build-yacht-terrace.mjs';
import {cockpitOverheadFinish} from '../site/tidewater-rocha/mobile/cockpit-overhead.js';
import {aftTeakFinish} from '../site/tidewater-rocha/mobile/aft-cockpit-teak.js';
import {aftCheekFinish,aftCheekToeFinish,aftHandrailFinish} from '../site/tidewater-rocha/mobile/aft-cockpit-cheeks.js';
import {aftCockpitTreads} from '../site/tidewater-rocha/mobile/aft-cockpit-stair.js';
import { connectTerrace, moveAlongRoute, routeSegments, routePoint } from '../site/tidewater-rocha/mobile/aft-terrace.js';
import { convexHull, distanceToFootprint, indexFootprints } from '../site/tidewater-rocha/mobile/terrace-geometry.js';
import { crossing } from '../site/tidewater-rocha/mobile/pasarela.js';
import { placeOnRoute } from '../site/tidewater-rocha/mobile/frame-benchmark.js';
import { buildYachtGeometry, createBoarding, createSternFeatures, createFinishes, i as Walk, l as basis } from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { A as Group } from '../site/tidewater-rocha/assets/common-HBn3Movl.js';

const root = new URL('../site/tidewater-rocha/mobile/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('aft-terrace.json', root)));

test('the mobile port handrail has a closed beveled section, two bends and a low return',async()=>{
  const part=manifest.parts.find(p=>p.feature==='polished handrail 1');
  assert.equal(part.finish[3],aftHandrailFinish);
  assert.ok(!manifest.parts.some(p=>p.feature==='slender handrail posts 1'));
  assert.ok(manifest.parts.some(p=>p.feature==='slender handrail posts -1'));
  const binary=await readFile(new URL('aft-terrace.bin',root));
  const vertices=new Float32Array(binary.buffer,binary.byteOffset+part.vertices.offset,part.vertices.length);
  const indices=new Uint32Array(binary.buffer,binary.byteOffset+part.indices.offset,part.indices.length);
  const rows=Array.from({length:vertices.length/6},(_,i)=>vertices.subarray(i*6,i*6+6));
  const first=rows.filter(v=>v[2]>5.14&&v[2]<5.17&&v[0]<6.315);
  assert.ok(first.length>0,'A straight upright enters the bottom tangent');
  assert.ok(first.some(v=>Math.abs(v[3])>.99)&&first.some(v=>Math.abs(v[4])>.99),
    'Wide and narrow faces have distinct planar normals');
  assert.ok(rows.some(v=>v[2]>5.19&&v[2]<5.23&&Math.abs(v[3])>.25&&Math.abs(v[5])>.25),
    'The elbow rolls the planar face into the incline');
  const returns=rows.filter(v=>v[0]>7.70);
  assert.ok(returns.length && returns.every(v=>v[2]>5.83&&v[2]<5.86));
  assert.ok(part.bounds[5]<5.90,'The rail never joins the upper guard');
  for(let i=0;i<indices.length;i+=3){
    const [a,b,c]=Array.from(indices.subarray(i,i+3),k=>rows[k]);
    const [x,y,z]=Array.from(a.subarray(0,3),(v,k)=>b[k]-v);
    const [X,Y,Z]=Array.from(a.subarray(0,3),(v,k)=>c[k]-v);
    const n=[y*Z-z*Y,z*X-x*Z,x*Y-y*X];
    assert.ok(n.reduce((sum,v,k)=>sum+v*(a[k+3]+b[k+3]+c[k+3]),0)>0);
  }
});

test('both mobile stair stringers have asymmetric solid profiles and supported polished toes', async () => {
  const binary=await readFile(new URL('aft-terrace.bin',root));
  const left=manifest.parts.find(p=>p.feature==='gloss black stair cheek 1');
  const right=manifest.parts.find(p=>p.feature==='gloss black stair cheek -1');
  assert.equal(left.finish[3],aftCheekFinish);
  assert.equal(right.finish[3],aftCheekFinish);
  assert.ok(right.bounds[4]-right.bounds[1]>left.bounds[4]-left.bounds[1]);
  assert.ok(Math.abs(left.bounds[1]-aftCockpitTreads[1].right)<1e-9);
  assert.ok(Math.abs(right.bounds[4]-aftCockpitTreads[1].left)<1e-9);
  assert.ok(left.bounds[0]<aftCockpitTreads[0].back && left.bounds[2]<aftCockpitTreads[0].top);
  assert.equal(right.bounds[2],3.95);
  assert.deepEqual([left.bounds[5],right.bounds[5]],[6,6]);
  const toes=manifest.parts.filter(p=>p.finish?.[3]===aftCheekToeFinish);
  assert.equal(toes.length,2);
  const span=p=>p.bounds[3]-p.bounds[0];
  assert.ok(span(toes.find(p=>p.id.startsWith(left.id)))>span(toes.find(p=>p.id.startsWith(right.id))));
  for(const part of [left,right,...toes]) {
    const v=new Float32Array(binary.buffer,binary.byteOffset+part.vertices.offset,part.vertices.length);
    const indices=new Uint32Array(binary.buffer,binary.byteOffset+part.indices.offset,part.indices.length);
    for(let i=0;i<indices.length;i+=3){
      const [a,b,c]=Array.from(indices.subarray(i,i+3),k=>v.subarray(k*6,k*6+6));
      const [x,y,z]=Array.from(a.subarray(0,3),(n,k)=>b[k]-n);
      const [X,Y,Z]=Array.from(a.subarray(0,3),(n,k)=>c[k]-n);
      const face=[y*Z-z*Y,z*X-x*Z,x*Y-y*X];
      assert.ok(face.reduce((sum,n,k)=>sum+n*(a[k+3]+b[k+3]+c[k+3]),0)>0,part.feature);
    }
  }
  const cap=manifest.parts.find(p=>p.id==='LD/service-route/45/cockpit-capping');
  assert.ok(cap.bounds[2]>=3.95&&cap.bounds[5]<4.0,'The service cover stays closed and low at the foot');
  const seam=manifest.parts.find(p=>p.feature==='cockpit teak return below the inboard stringer foot');
  assert.ok(seam.bounds[2]===3.946 && seam.bounds[1]<1.91 && seam.bounds[4]>2.07,
    'The recessed cover straddles the gap below the rounded margin');
});

test('mobile teak caps keep a single walkable top and a genuinely rounded nose', async () => {
  const binary=await readFile(new URL('aft-terrace.bin',root));
  const caps=manifest.parts.filter(p=>p.finish?.[3]===aftTeakFinish);
  assert.equal(caps.length,aftCockpitTreads.length);
  assert.ok(!manifest.parts.some(p=>p.role==='stairs' && /pale inset$/.test(p.feature)));
  for(const [i,cap] of caps.entries()) {
    const {front,back,left,right,top,thickness}=aftCockpitTreads[i];
    const vertices=new Float32Array(binary.buffer,binary.byteOffset+cap.vertices.offset,cap.vertices.length);
    const indices=new Uint32Array(binary.buffer,binary.byteOffset+cap.indices.offset,cap.indices.length);
    const hits=[];
    const near=[];
    const y=left+(right-left)*.38;
    for(let j=0;j<indices.length;j+=3) {
      const face=Array.from(indices.subarray(j,j+3),k=>vertices.subarray(k*6,k*6+6));
      if(face.every(p=>p[5]>.99)&&containsTriangle(front+(back-front)*.46,y,face))hits.push(face[0][2]);
      near.push(...face.filter(p=>p[0]<front+.009&&p[3]<-.4&&p[5]>.4));
    }
    assert.equal(hits.length,1,cap.feature);
    assert.ok(Math.abs(hits[0]-top)<.000001,cap.feature);
    assert.ok(Math.abs(cap.bounds[2]-(top-thickness))<.000001,cap.feature);
    assert.ok(near.length,`${cap.feature}: interpolated normal on the nose radius`);
  }
});

test('the cockpit lining keeps a real stair aperture and seats the meshed fittings', async () => {
  const packed=await readFile(new URL('aft-terrace.bin',root));
  const ceiling=manifest.parts.filter(p=>p.feature.startsWith('cockpit ceiling '));
  const find=feature=>ceiling.find(p=>p.feature==='cockpit ceiling '+feature);
  const mesh=part=>{
    const vertices=new Float32Array(packed.buffer,packed.byteOffset+part.vertices.offset,part.vertices.length);
    const indices=new Uint32Array(packed.buffer,packed.byteOffset+part.indices.offset,part.indices.length);
    return Array.from({length:indices.length/3},(_,i)=>Array.from(indices.slice(3*i,3*i+3),k=>vertices.slice(k*6,k*6+3)));
  };
  const face=find('satin panel field');
  assert.equal(face.finish[3],cockpitOverheadFinish);
  const panels=mesh(face);
  for(const [x,y] of [[5.55,2.10],[7.92,2.55],[5.13,1.70]])
    assert.ok(!panels.some(t=>containsTriangle(x,y,t)), 'Stair aperture '+[x,y]);
  for(const [x,y] of [[5.55,0],[7.92,2.97],[8.499,3.36]])
    assert.equal(panels.some(t=>containsTriangle(x,y,t)),true,'Lining '+[x,y]);
  assert.equal(ceiling.filter(p=>/warm lens [12]$/.test(p.feature)&&p.finish[3]===48).length,2);
  for(const i of [1,2]) {
    assert.equal(find('polished column collar '+i).bounds[5],5.88);
    assert.equal(find('polished column collar '+i).bounds[2],5.87);
  }
  const column=find('port support column');
  assert.deepEqual([column.bounds[2],column.bounds[5]],[3.95,5.87]);
  assert.ok(manifest.collisionFootprints.some(p=>p.id===column.id));
});

function walkingModel() {
  const group = new Group(); group.userData = { yacht:basis };
  const model = {group};
  const materials = createFinishes(0,true,true,true,true);
  const boarding = model.boarding = createBoarding(model,null,{gangwayOnly:true,includeLanding:true,materials});
  boarding.room.spawn = [boarding.start+.18,boarding.y,boarding.height(boarding.start+.18)+1.6];
  const terrace = structuredClone(manifest);
  connectTerrace(boarding,terrace);
  model.asset = {data:{rooms:[terrace.room],levels:{MD:3.95}}};
  const walk = new Walk({camera:{position:group.position}},model,{document:null});
  walk.nav.routes=[];
  walk.nav.floorSafe=(x,y,deck=walk.nav.deck)=>deck==='MD' && boarding.safe(x,y,walk.nav.radius);
  walk.nav.enterRoom('boarding');
  return {walk,boarding,dispose(){boarding.dispose();materials.opaque.dispose();materials.glass.dispose();}};
}

test('published furnishings reproduce the source geometry and stay inside the mobile budget', async () => {
  const generated = await buildTerrace();
  assert.deepEqual(generated.manifest,manifest);
  assert.deepEqual(generated.binary,await readFile(new URL('aft-terrace.bin',root)));
  assert.ok(generated.binary.length<=1.25*1024*1024);
  const landingBorders = manifest.parts.filter(p=>p.role==='deck-trim');
  assert.deepEqual(landingBorders.map(p=>p.feature).sort(), [
    'port mooring curved sole margin','shaped teak landing inboard caulk border','teak passage outer margin border',
  ]);
  for (const part of manifest.parts) {
    const isLandingBorder=part.role==='deck-trim';
    const portMooring = /^port mooring|integrated mooring recess/.test(part.feature);
    assert.ok(part.bounds[0]>=(portMooring?2.31:isLandingBorder?2.46:3.2)-1e-6 && part.bounds[3]<=8.5+1e-6,part.feature);
    if (isLandingBorder) {
      const level=portMooring?3.954:3.956;
      assert.deepEqual([part.bounds[2],part.bounds[5]],[level,level]);
    }
  }
  assert.ok(manifest.parts.some(p=>p.role==='roof'));
  assert.ok(manifest.parts.some(p=>p.role==='enclosure'));
  assert.ok(manifest.parts.some(p=>p.glass));
  const furnishings=manifest.parts.filter(p=>p.role==='furniture');
  assert.equal(furnishings.length,51);
  assert.deepEqual([...new Set(furnishings.map(p=>p.groupID))].sort(),['chair-1','chair-2','chair-3','chair-4','chair-5','chair-6','dining-table','port-chaise','wet-bar']);
  assert.ok(!manifest.parts.some(p=>/MD_SAN_|covered-aft-seating|oval-table/.test(p.id)));
  assert.ok(manifest.floor.every(([a,b,c])=>Math.abs((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]))>1e-10),'Degenerate faces must not open navigation holes');
  const lights=manifest.parts.flatMap(p=>Array.from(new Float32Array(generated.binary.buffer,generated.binary.byteOffset+p.light.offset,p.light.length)));
  assert.ok(Math.min(...lights)<.6 && Math.max(...lights)>.95);
  const bytes=generated.binary.buffer.slice(generated.binary.byteOffset,generated.binary.byteOffset+generated.binary.byteLength);
  const decode=part=>({...part,vertices:new Float32Array(bytes,part.vertices.offset,part.vertices.length),
    indices:Array.from(new Uint32Array(bytes,part.indices.offset,part.indices.length))});
  const data=JSON.parse(await readFile(new URL('../rocha/luz-de-mar/model.json',root)));
  const sourceBuffer=await readFile(new URL('../rocha/luz-de-mar/model.bin',root));
  const source=buildYachtGeometry({data,binary:sourceBuffer.buffer.slice(sourceBuffer.byteOffset,sourceBuffer.byteOffset+sourceBuffer.byteLength)},0,{mtuEngines:false,seaStrainers:false});
  try {
    const blocked=source.navigation.wetBarBlocked;
    assert.ok(blocked(6.87,-2.066,.14),'The full-yacht visitor cannot enter the cabinet');
    for(let step=0;step<=40;step++) {
      const t=step/40;
      assert.equal(blocked(7.4-.8*t,-2.5-.6*t,.14),false,'The starboard stair approach clears the service face');
    }
    for(const part of furnishings) {
      const original=source.exterior.parts.find(p=>p.id===part.id);
      assert.ok(original,part.id);
      assert.deepEqual(decode(part).vertices,Float32Array.from(original.vertices));
      assert.deepEqual(decode(part).indices,original.indices);
      assert.deepEqual(part.finish,original.finish);
      assert.deepEqual(part.bounds,original.bounds);
    }
  } finally {source.dispose();}
  const group=new Group(), materials=createFinishes(0,true,true,true,true);
  const boarding=createBoarding({group},null,{gangwayOnly:true,includeLanding:true,materials,
    terraceParts:manifest.parts.map(decode),sternParts:createSternFeatures().parts});
  assert.equal(boarding.meshes.length,2);
  assert.ok(boarding.stats.triangles<=25000,JSON.stringify(boarding.stats));
  boarding.dispose(); materials.opaque.dispose(); materials.glass.dispose();
  const bar=feature=>decode(furnishings.find(p=>p.feature===feature));
  const worktop=bar('cockpit wet bar inset white worktop');
  const drain=bar('cockpit wet bar dark circular drain');
  const lid=bar('cockpit wet bar flush service lid');
  const x=(drain.bounds[0]+drain.bounds[3])/2, y=(drain.bounds[1]+drain.bounds[4])/2;
  assert.equal(verticalHits(worktop,x,y).length,0,'The tray leaves the sink cavity open below its own lid');
  assert.ok(verticalHits(lid,x,y).some(z=>Math.abs(z-4.9615)<.001));
  const body=bar('rounded molded cockpit wet bar');
  assert.equal(verticalHits(body,x,y).length,0,'The casing has no cap cutting across the hidden basin');
  const post=bar('cockpit polished support post above wet bar');
  const seat=bar('cockpit wet bar polished column seat');
  assert.equal(post.bounds[2],seat.bounds[5]);
  assert.ok(verticalHits(worktop,(post.bounds[0]+post.bounds[3])/2,(post.bounds[1]+post.bounds[4])/2)
    .some(z=>Math.abs(z-seat.bounds[2])<.002),'The column bears on the worktop outside the sink');

  const rim=bar('cockpit wet bar rolled tray rim');
  const shelf=bar('cockpit wet bar raised shelf white edge');
  assert.ok(rim.bounds[5]>worktop.bounds[5]+.015);
  assert.ok(shelf.bounds[2]>worktop.bounds[5]+.19);
  assert.ok(shelf.bounds[5]-shelf.bounds[2]<.032);
  for(const i of [1,2]){
    const support=bar('cockpit wet bar swept shelf support '+i);
    assert.ok(support.bounds[2]<=worktop.bounds[5] && support.bounds[5]>=shelf.bounds[2]);
  }
  assert.ok(bar('cockpit wet bar curved service-door reveal').bounds[5]>4.8);
  const toe=bar('cockpit wet bar recessed warm toe');
  assert.ok(toe.bounds[2]<3.955 && toe.bounds[5]>body.bounds[2]);

});

// Actual vertical triangle intersections distinguish projected overlap from
// two surfaces occupying the same volume.
function verticalHits(part,x,y) {
  const heights=[];
  for(let i=0;i<part.indices.length;i+=3) {
    const [a,b,c]=part.indices.slice(i,i+3).map(k=>part.vertices.slice(k*6,k*6+3));
    const det=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);
    if(Math.abs(det)<1e-10)continue;
    const u=((b[1]-c[1])*(x-c[0])+(c[0]-b[0])*(y-c[1]))/det;
    const v=((c[1]-a[1])*(x-c[0])+(a[0]-c[0])*(y-c[1]))/det;
    if(u>=-1e-8 && v>=-1e-8 && u+v<=1+1e-8)heights.push(u*a[2]+v*b[2]+(1-u-v)*c[2]);
  }
  return heights;
}

// The deployed port gangway passes above the port swim stair in the user's
// Beach Club reference. It is a configuration constraint, not a reason to
// invent an outboard bridge and cut the yacht's coamings.
test('boarding preserves the reference alignment, landing and closed lower-deck route',()=>{
  const {walk,boarding,dispose}=walkingModel();
  try {
    assert.equal(boarding.y,3.1);
    assert.equal(boarding.safe(0,3.1),true);
    assert.equal(boarding.safe(0,4.25),false,'No invented outboard walkway');
    const landing=boarding.parts.find(p=>p.feature==='widened upper teak boarding landing');
    assert.ok(landing.bounds[4]<3.6,'The landing must join the existing deck footprint');
    const stern=createSternFeatures({mobile:true});
    const coamings=stern.parts.filter(p=>/swept outer stair coaming/.test(p.feature));
    assert.equal(coamings.length,2);
    const originalStarboard=createSternFeatures().parts.find(p=>p.feature==='transom starboard swept outer stair coaming');
    assert.deepEqual(coamings.find(p=>p.feature===originalStarboard.feature),originalStarboard);
    assert.equal(boarding.height(boarding.end),boarding.layout.deckHeight,'Gangway arrival must meet the deck');
    const treads=stern.parts.filter(p=>/transom port teak tread/.test(p.feature));
    assert.equal(treads.length,6);
    let previous=2.84;
    for(const tread of treads) {
      const b=tread.bounds;
      assert.ok(b[5]>previous,'Port surfaces ascend from the raised sponson to the fixed arrival');
      previous=b[5];
      for(let ix=0;ix<9;ix++)for(let iy=0;iy<9;iy++) {
        const x=b[0]+.03+(b[3]-b[0]-.06)*ix/8,y=b[1]+.03+(b[4]-b[1]-.06)*iy/8;
        for(const part of boarding.parts.filter(p=>!p.context)) {
          if(x<part.bounds[0]||x>part.bounds[3]||y<part.bounds[1]||y>part.bounds[4])continue;
          const hits=verticalHits(part,x,y);
          assert.ok(hits.every(z=>z>b[5]+.015),`${tread.feature}: deployed gangway penetrates tread at ${x},${y}`);
        }
      }
    }
    assert.ok(Math.abs(3.95-previous-(3.95-2.84)/7)<1e-8);
    assert.deepEqual(walk.nav.routes,[],'The mobile view must not create a descent through the deployed gangway');
    assert.equal(walk.nav.floorSafe(1.5,3.1,'LD'),false);
    assert.equal(boarding.parts.filter(p=>p.feature==='landing mounted post 1 2.3').length,0);
  }finally{dispose();}
});

test('dining chairs fit the table and the opposite stair rails retain their source height',async()=>{
  const bench=createSternFeatures().parts.find(p=>p.feature==='covered aft seating behind transom');
  const chair=manifest.parts.filter(p=>p.groupID==='chair-1');
  assert.ok(Math.min(...chair.map(p=>p.bounds[0]))-bench.bounds[3]>.05,'Chair 1 must clear the bench by at least 5 cm');
  const table=manifest.parts.find(p=>p.feature==='cockpit transverse teak dining top');
  for(let n=1;n<=4;n++){
    const sling=manifest.parts.find(p=>p.feature==='director chair '+n+' canvas sling seat');
    const group=manifest.parts.filter(p=>p.groupID==='chair-'+n);
    const back=group.find(p=>p.feature.endsWith('canvas back'));
    const sides=group.find(p=>p.feature.endsWith('wrapped canvas legs and sides'));
    assert.ok(back.bounds[0] > (sling.bounds[0]+sling.bounds[3])/2,'Back must face the aisle');
    assert.ok(sling.bounds[0]<table.bounds[3] && sling.bounds[5]<table.bounds[2],'Seat tucks under the top');
    assert.ok(back.bounds[0]>table.bounds[3] && Math.abs(sides.bounds[2]-3.95)<1e-6);
    const cy=(back.bounds[1]+back.bounds[4])/2;
    const footprint=manifest.collisionFootprints.find(f=>f.id==='furniture/chair-'+n);
    assert.equal(indexFootprints([footprint])(5.25,cy,.14),true);
    assert.equal(indexFootprints([footprint])(5.60,cy,.14),false);
    assert.ok(sling.bounds[1]<table.bounds[4]&&sling.bounds[4]>table.bounds[1]);
  }
  for(const [n,side] of [[5,1],[6,-1]]){
    const group=manifest.parts.filter(p=>p.groupID==='chair-'+n);
    const back=group.find(p=>p.feature.endsWith('canvas back')).bounds;
    const seat=group.find(p=>p.feature.endsWith('sling seat')).bounds;
    const cx=(seat[0]+seat[3])/2,cy=(seat[1]+seat[4])/2;
    assert.ok(side*((back[1]+back[4])/2-cy)>.18);
    assert.ok(side>0?back[1]>table.bounds[4]:back[4]<table.bounds[1]);
    assert.ok(seat[5]<table.bounds[2]&&cx>table.bounds[0]&&cx<table.bounds[3]);
    const footprint=manifest.collisionFootprints.find(f=>f.id==='furniture/chair-'+n);
    assert.ok(indexFootprints([footprint])(cx,cy,.14));
  }
  const data=JSON.parse(await readFile(new URL('../rocha/luz-de-mar/model.json',root)));
  const buffer=await readFile(new URL('../rocha/luz-de-mar/model.bin',root));
  const source=buildYachtGeometry({data,binary:buffer.buffer.slice(buffer.byteOffset,buffer.byteOffset+buffer.byteLength)},0,{mtuEngines:false,seaStrainers:false});
  try {
    const rails=source.interiorDetail.replacements.get('MD_STA_013').filter(p=>/^(polished handrail|slender handrail posts) -1$/.test(p.feature));
    assert.equal(rails.length,2);
    for(const rail of rails) {
      const mobile=manifest.parts.find(p=>p.id===rail.id);
      assert.ok(mobile,rail.feature);
      assert.ok(Math.abs(mobile.bounds[5]-rail.bounds[5])<1e-6,`Do not cut the top of ${rail.feature}`);
    }
  }finally{source.dispose();}
});

test('the aisle behind the four backs connects both ends of the dining table',()=>{
  const {boarding,dispose}=walkingModel();
  try {
    const points=[[4.55,1.17],[5.65,1.17],[5.65,-2.68],[4.55,-2.68]];
    for(let i=1;i<points.length;i++){
      for(let k=0;k<=100;k++){
        const p=points[i-1].map((a,j)=>a+(points[i][j]-a)*k/100);
        assert.ok(boarding.safe(...p,.14),'Dining aisle closed at '+p);
      }
    }
  }finally{dispose();}
});

test('the passage between the wet bar and chairs stays open in both directions',()=>{
  const {walk,dispose}=walkingModel();
  try {
    const route=[[6.68,0],[6.12,-.95],[5.63,-1.84],[5.66,-2.79],[6.60,-3.10]];
    walk.nav.enterRoom('MD_R01');
    const {length}=routeSegments(route);
    assert.ok(moveAlongRoute(walk.nav,route,0,length));
    assert.ok(moveAlongRoute(walk.nav,route,length,0));
    assert.ok(Math.hypot(...walk.nav.position.map((x,i)=>x-route[0][i]))<.001);
    assert.equal(walk.nav.elevation,3.95);
  } finally {dispose();}
});

test('rotated furniture footprints retain their open corners and body clearance',()=>{
  const polygon=convexHull([[0,1],[1,0],[2,1],[1,2],[1,1],[0,1]]);
  const hit=indexFootprints([{polygon}]);
  assert.equal(hit(.05,.05,.14),false,'Do not replace the rotated chair with its enclosing box');
  assert.equal(hit(1,1,.14),true);
  assert.equal(hit(1,-.1,.14),true);
  assert.equal(hit(1,-.2,.14),false);
  assert.equal(distanceToFootprint(0,0,[[0,0],[1,1]]),Infinity);
});

test('contact shading is soft, local and baked into the actual floor',async()=>{
  const footprint={polygon:[[0,0],[1,0],[1,1],[0,1]]};
  assert.equal(contactShade(.5,.5,[footprint]),.78);
  assert.ok(contactShade(1.15,.5,[footprint])>.78 && contactShade(1.15,.5,[footprint])<1);
  assert.equal(contactShade(1.4,.5,[footprint]),1);
  const b=await readFile(new URL('aft-terrace.bin',root));
  const samples=manifest.parts.filter(p=>p.role==='floor').flatMap(p=>Array.from(new Float32Array(b.buffer,b.byteOffset+p.light.offset,p.light.length)));
  assert.ok(Math.min(...samples)<.5,'Covered furniture must add contact occlusion to the canopy shade');
});

test('clipping interpolates crossings instead of keeping triangles beyond the zone', () => {
  const result=clipGeometry({vertices:[0,0,0,0,0,1,4,0,0,0,0,1,0,4,0,0,0,1],indices:[0,1,2]},[1,0,-1,2,4,1]);
  assert.ok(result.indices.length>=3);
  assert.ok(result.vertices.filter((_,i)=>i%6===0).every(x=>x>=1 && x<=2));
  assert.ok(result.vertices.filter((_,i)=>i%6===5).every(z=>z===1));
  assert.equal(clipGeometry({vertices:[0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],indices:[0,1,2]},[-1,-1,-1,1,1,1]).indices.length,0);
});

test('native navigation reaches the saloon threshold and returns without crossing glass, stairs, or deck edges', () => {
  const {walk,boarding,dispose}=walkingModel();
  try {
    const {length}=routeSegments(boarding.route);
    assert.ok(moveAlongRoute(walk.nav,boarding.route,0,length));
    assert.ok(Math.hypot(...walk.nav.position.map((v,i)=>v-boarding.route.at(-1)[i]))<.001);
    assert.equal(walk.nav.elevation,3.95);
    walk.nav.move(2,0);
    assert.ok(walk.nav.position[0]<=8.4-walk.nav.radius+.001);
    const forbidden=[[-5,3.1],[-2,2.3],[2.8,2.655],[4.0,0],[5.5,1.8],[8.35,-1],[6,-3.6],[9,0],[6,3.7],
      [5.5,-.1],[4.28,-1.45],[7.1,.95],[4.58,.68],[6.5,-2]];
    for(const p of forbidden)assert.equal(boarding.safe(...p),false,`Must block ${p}`);
    walk.nav.position=boarding.route.at(-1).slice();
    assert.ok(moveAlongRoute(walk.nav,boarding.route,length,0));
    assert.ok(Math.hypot(...walk.nav.position.map((v,i)=>v-boarding.route[0][i]))<.001);
  } finally {dispose();}
});

test('the guided passage has extra clearance and the terrace spawn is reachable',()=>{
  const {walk,boarding,dispose}=walkingModel();
  try {
    const {length}=routeSegments(boarding.route);
    for(let d=0;d<=length;d+=.005) {
      const {point}=routePoint(boarding.route,d);
      assert.ok(boarding.safe(...point,.15),`15 cm clearance at ${point}`);
    }
    walk.nav.enterRoom('MD_R01');
    assert.deepEqual(walk.nav.position,[6.68,0]);
    assert.equal(walk.nav.elevation,3.95);
    const before=walk.nav.position.slice();
    walk.nav.move(0,-2.5);
    const bar=manifest.collisionFootprints.find(p=>p.id==='furniture/wet-bar');
    const clearance=distanceToFootprint(...walk.nav.position,bar.polygon);
    assert.ok(clearance>=walk.nav.radius-1e-6 && clearance<walk.nav.radius+.06,'Stop with body clearance at the curved cabinet');
    assert.ok(walk.nav.position[1]<before[1]);
  } finally {dispose();}
});

test('guided walk can resume after a stop and the same benchmark route reaches the terrace at different frame rates', () => {
  const {walk,boarding,dispose}=walkingModel();
  try {
    let advance=crossing(walk);
    for(let i=0;i<180;i++)advance(1/60);
    advance=crossing(walk);
    let running=true;
    for(let i=0;i<1800 && running;i++)running=advance(1/60);
    assert.equal(running,false);
    assert.ok(walk.nav.position[0]>8.17 && Math.abs(walk.nav.position[1]-.1)<.01);
    advance=crossing(walk); running=true;
    for(let i=0;i<1800 && running;i++)running=advance(1/60);
    assert.ok(Math.abs(walk.nav.position[0]-boarding.room.spawn[0])<.01);
    for(const fps of [12,40,60]) {
      walk.nav.enterRoom('boarding');
      for(let i=0;i<=12*fps;i++)placeOnRoute(walk,i/fps,0);
      assert.ok(walk.nav.position[0]>8.17 && Math.abs(walk.nav.position[1]-.1)<.01,`${fps} FPS reaches terrace`);
      for(let i=12*fps;i<=24*fps;i++)placeOnRoute(walk,i/fps,0);
      assert.ok(Math.abs(walk.nav.position[0]-boarding.room.spawn[0])<.01,`${fps} FPS returns to the gangway`);
    }
  } finally {dispose();}
});
