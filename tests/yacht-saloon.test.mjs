import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildYachtGeometry, l as basis } from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { clipGeometry } from '../scripts/build-yacht-terrace.mjs';
import { convexHull, distanceToFootprint } from '../site/tidewater-rocha/mobile/terrace-geometry.js';
import { buildSaloon } from '../scripts/build-yacht-saloon.mjs';
import { nextProfile,decodeSaloon,connectSaloon,loadSaloon } from '../site/tidewater-rocha/mobile/main-saloon.js';
import { moveAlongRoute,routeSegments } from '../site/tidewater-rocha/mobile/aft-terrace.js';
import { fixture,travel,saloon,saloonManifest,saloonBuffer } from './yacht-saloon-fixture.mjs';

test('the shared deck profile includes the whole saloon and is reproducible and respects the mobile budget',async()=>{
  const generated=await buildSaloon();
  assert.deepEqual(generated.manifest,saloonManifest);
  assert.deepEqual(generated.binary,saloonBuffer);
  assert.ok(saloonBuffer.byteLength<5*1024*1024);
  const ids=saloon.parts.map(p=>p.id);
  assert.equal(new Set(ids).size,ids.length);
  // The guest stairwell is visible through the forward portal beyond the saloon.
  assert.ok(saloon.parts.filter(p=>p.role!=='stairwell-lining').every(p=>p.bounds[0]>=8.5-1e-5 && p.bounds[3]<=17.91+1e-5));
  for(const id of ['MD_FUR_014','MD_FUR_016','MD_FUR_018','MD_FUR_019','MD_FUR_023','MD_SOF_007','MD_SOF_008','MD_SOF_009','MD_SOF_010'])
    assert.ok(saloon.parts.some(p=>p.sourceID===id),id);
  const pedestals=saloon.parts.filter(p=>p.feature.startsWith('dining pedestal'));
  const top=saloon.parts.find(p=>p.feature==='dark dining tabletop');
  const rim=saloon.parts.find(p=>p.feature==='rounded dining table edge');
  assert.equal(pedestals.length,2);
  for(const pedestal of pedestals)assert.equal(pedestal.bounds[5],rim.bounds[2]);
  assert.equal(rim.bounds[5],top.bounds[2]);
  assert.ok(top.bounds[5]-3.95>.70);
  assert.ok(top.bounds[4]-top.bounds[1]>1.75*(top.bounds[3]-top.bounds[0]));
  assert.equal(top.materialID,'M40');
  assert.ok(!saloon.parts.some(p=>['MD_FUR_032','MD_FUR_033'].includes(p.sourceID)));
  for(const p of Object.values(saloon.profiles)) {
    assert.equal(p.batches.length,2);assert.ok(p.triangles<=25000);
    assert.ok(p.geometryBytes<3*1024*1024);
  }
  assert.deepEqual(Object.keys(saloon.profiles),['exterior']);
  for(const item of saloonManifest.profiles.exterior.audit.filter(p=>p.support))
    assert.equal(item.sourceTriangles,item.triangles);
  const root=new URL('../site/tidewater-rocha/rocha/luz-de-mar/',import.meta.url);
  const data=JSON.parse(await readFile(new URL('model.json',root))),bin=await readFile(new URL('model.bin',root));
  const full=buildYachtGeometry({data,binary:bin.buffer.slice(bin.byteOffset,bin.byteOffset+bin.byteLength)},0,{mtuEngines:false,seaStrainers:false});
  const buffer=saloonBuffer.buffer.slice(saloonBuffer.byteOffset,saloonBuffer.byteOffset+saloonBuffer.byteLength);
  try {
    const geometry=p=>({
      vertices:Array.from(new Float32Array(buffer,p.vertices.offset,p.vertices.length)),
      indices:Array.from(new Uint32Array(buffer,p.indices.offset,p.indices.length))
    });
    const coords=flat=>Array.from({length:flat.length/6},(_,i)=>flat.slice(6*i,6*i+2));
    const plan=convexHull(coords(geometry(rim).vertices));
    const shells=saloon.parts.filter(p=>p.feature==='rounded wraparound shell and arms');
    assert.equal(shells.length,4);
    for(const shell of shells){
      const band=clipGeometry(geometry(shell),[...rim.bounds.slice(0,3),...rim.bounds.slice(3,5),top.bounds[5]]);
      for(const [x,y] of coords(band.vertices))
        assert.ok(distanceToFootprint(x,y,plan)>0,'Dining table intersects '+shell.id);
    }
    for(const p of saloon.parts.filter(p=>p.role==='furniture')) {
      const source=full.interiorDetail.objects.find(s=>s.id===p.id);
      assert.ok(source,p.id);
      assert.deepEqual(new Float32Array(buffer,p.vertices.offset,p.vertices.length),Float32Array.from(source.vertices),p.id+' pose');
      assert.deepEqual(new Uint32Array(buffer,p.indices.offset,p.indices.length),Uint32Array.from(source.indices),p.id+' topology');
      assert.deepEqual(p.finish,source.finish,p.id+' finish');
    }
  }finally{full.dispose();}
});

test('the sliding door, lounge seats and dining light have distinct physical footprints',()=>{
  const f=fixture();
  try{
    const pane=f.model.terrace.parts.find(p=>p.feature==='smoked aft saloon sliding panels');
    assert.ok(Math.abs(pane.bounds[1]+2.98)<.002);
    const nav=f.walk.nav;
    for(const y of [-2.70,-2,-1,.95])assert.equal(nav.floorSafe(8.44,y,'MD'),false);
    for(const y of [-.22,.10,.42])assert.equal(nav.floorSafe(8.44,y,'MD'),true);
    assert.ok(!saloon.parts.some(p=>['MD_FUR_015','MD_FUR_017'].includes(p.sourceID)));
    assert.ok(!saloon.collisionFootprints.some(p=>/^MD_FUR_0(?:15|17)\//.test(p.id)));
    assert.equal(saloon.parts.filter(p=>p.feature.startsWith('salon lounge chair')).length,4);
    const lens=saloon.parts.find(p=>p.feature==='restrained cove diffuser');
    const table=saloon.parts.find(p=>p.feature==='dark dining tabletop');
    for(const axis of [0,1]){
      const centre=b=>(b[axis]+b[axis+3])/2;
      assert.ok(Math.abs(centre(lens.bounds)-centre(table.bounds))<.001);
    }
    assert.equal(lens.materialID,'M99');
    assert.ok(lens.bounds[5]-lens.bounds[2]>.025);
  }finally{f.dispose();}
});

test('the blue rug around the main saloon coffee table has one circular outer edge in rendered space',()=>{
  const rugs=saloon.parts.filter(p=>p.sourceID==='MD_SOF_004');
  assert.equal(rugs.length,1,'The old outline and binding must both be removed');
  const [rug]=rugs;
  assert.equal(rug.materialID,'M95');
  const buffer=saloonBuffer.buffer.slice(saloonBuffer.byteOffset,saloonBuffer.byteOffset+saloonBuffer.byteLength);
  const vertices=new Float32Array(buffer,rug.vertices.offset,rug.vertices.length);
  const indices=new Uint32Array(buffer,rug.indices.offset,rug.indices.length);
  const angles=[],radius=2;
  // Original seating-group center, converted through the yacht's unequal hull scales.
  for(const k of new Set(indices)){
    if(vertices[k*6+5]<.999)continue;
    const x=(vertices[k*6]-12.15464)*basis.sx,y=(vertices[k*6+1]-.037115)*basis.sy;
    assert.ok(Math.abs(Math.hypot(x,y)-radius)<.00001);
    angles.push(Math.atan2(y,x));
  }
  angles.sort((a,b)=>a-b);
  assert.ok(angles.length>=3);
  angles.push(angles[0]+2*Math.PI);
  for(let i=1;i<angles.length;i++)
    assert.ok(radius*(1-Math.cos((angles[i]-angles[i-1])/2))<.0022,'Continuous circular perimeter');
  const drawn=saloonManifest.profiles.exterior.audit.find(p=>p.id===rug.id);
  assert.equal(drawn.triangles,indices.length/3,'Preserve the curve when packing the walking view');
});

test('the port service bulkhead closes the aft saloon sightline in the active main profile', async () => {
  const guest = JSON.parse(await readFile(new URL('../site/tidewater-rocha/mobile/guest-access.json', import.meta.url)));
  const walls = saloon.parts.filter(p => p.role === 'service-bulkhead');
  assert.equal(walls.filter(p => p.feature === 'profiled white service stair enclosure').length, 2);
  assert.ok(walls.some(p => p.feature === 'entry forward white tool wall'));
  for (const wall of walls) {
    const draw = guest.profiles.main.audit.find(p => p.id === wall.id);
    assert.ok(draw?.triangles > 0 && draw.triangles === draw.sourceTriangles, wall.id);
    assert.ok(saloon.collisionFootprints.some(p => p.id === wall.id), wall.id);
  }
});

test('native walking crosses the door, reaches both seating areas and returns at 12/40/60 Hz',()=>{
  for(const hz of [12,40,60]) {
    const f=fixture(),{nav}=f.walk;
    try {
      const route=f.model.boarding.route,length=routeSegments(route).length;
      assert.deepEqual(f.model.boarding.arrivalLook,[12.3,0,4.7]);
      assert.ok(moveAlongRoute(nav,route,0,length));
      assert.ok(Math.hypot(nav.position[0]-10,nav.position[1]-.1)<.001);assert.equal(nav.location().id,'MD_R02');
      // Side aisle around the sofas, then approach the aft edge of the dining table.
      const path=[[10,1.95],[14.4,1.95],[14.4,0],[14.8,0],[14.4,0],[14.4,1.95],[10,1.95],[10,.1]];
      travel(nav,path,hz);
      assert.equal(nav.elevation,3.95);
      for(const x of [8.25,8.44,8.5,8.75,9.2,10]) {
        travel(nav,[[x,.1],[x+.03,.13],[x,.1]],hz);
      }
      travel(nav,[[10,.1]],hz);
      assert.ok(moveAlongRoute(nav,route,length,0));
      assert.ok(Math.hypot(...nav.position.map((v,i)=>v-route[0][i]))<.001);
    }finally{f.dispose();}
  }
});

test('floor union closes the threshold without opening glazing, furniture, service stairs or deck edges',()=>{
  const f=fixture(),{nav}=f.walk;
  try {
    for(let x=8.15;x<=10;x+=.005)assert.ok(nav.floorSafe(x,.1),'Threshold at '+x);
    for(const p of [[8.44,-1],[8.44,1],[12,1],[12,-1],[11.95,-.2],[15.4,0],[15.9,0],[15.2,1.1],[12,3],[12,-3],[18,0],[9.2,2.8]])
      assert.equal(nav.floorSafe(...p),false,'Solid or unsupported point '+p);
    nav.enterRoom('MD_R01');travel(nav,[[7.4,-1.6],[7.4,-2.5],[6.6,-3.1],[4,-3.03],[2.7,-3.03],[.35,-3.03],[.35,0]]);
    assert.equal(nav.deck,'SP');assert.equal(nav.elevation,2.84);
    assert.equal(nav.floorSafe(.4,3.1,'SP'),false,'Port stair remains blocked');
    travel(nav,[[.35,-3.03],[2.7,-3.03]]);assert.equal(nav.deck,'MD');
  }finally{f.dispose();}
});

test('the main deck keeps one profile and missing saloon data keeps visitors safely outside',async()=>{
  for(const x of [8.3,8.8,9.2,9.21,9.1,8.5,8,7.99,10])
    assert.equal(nextProfile('exterior',x),'exterior');
  assert.equal(nextProfile('guest',9.5,'SP'),'exterior');
  const f=fixture({ready:false});
  try {
    assert.equal(f.walk.nav.floorSafe(9.2,0),false);
    await assert.rejects(loadSaloon({fetcher:async()=>({ok:false})}));
    await assert.rejects(loadSaloon({timeoutMs:5,fetcher:(_,{signal})=>new Promise((resolve,reject)=>{
      signal.addEventListener('abort',()=>reject(Error('Timed out')),{once:true});
    })}),/Timed out/);
    assert.equal(f.walk.nav.floorSafe(9.2,0),false);
    connectSaloon(f.walk,saloon);connectSaloon(f.walk,saloon);
    assert.equal(f.model.asset.data.rooms.filter(r=>r.id==='MD_R02').length,1);
    assert.equal(f.walk.nav.floorSafe(9.2,0),true);
    const invalid=structuredClone(saloonManifest);invalid.version='old';
    assert.throws(()=>decodeSaloon(invalid,saloonBuffer.buffer));
    assert.throws(()=>decodeSaloon(saloonManifest,new ArrayBuffer(8)));
  }finally{f.dispose();}
});
