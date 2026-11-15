import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildYachtGeometry } from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { buildSaloon } from '../scripts/build-yacht-saloon.mjs';
import { nextProfile,decodeSaloon,connectSaloon,loadSaloon } from '../site/tidewater-rocha/mobile/main-saloon.js';
import { moveAlongRoute,routeSegments } from '../site/tidewater-rocha/mobile/aft-terrace.js';
import { fixture,travel,saloon,saloonManifest,saloonBuffer } from './yacht-saloon-fixture.mjs';

test('both reproducible profiles include the whole saloon and respect the mobile budget',async()=>{
  const generated=await buildSaloon();
  assert.deepEqual(generated.manifest,saloonManifest);
  assert.deepEqual(generated.binary,saloonBuffer);
  assert.ok(saloonBuffer.byteLength<5*1024*1024);
  const ids=saloon.parts.map(p=>p.id);
  assert.equal(new Set(ids).size,ids.length);
  assert.ok(saloon.parts.every(p=>p.bounds[0]>=8.5-1e-5 && p.bounds[3]<=17.91+1e-5));
  for(const id of ['MD_FUR_014','MD_FUR_016','MD_FUR_018','MD_FUR_019','MD_FUR_023','MD_SOF_007','MD_SOF_008','MD_SOF_009','MD_SOF_010'])
    assert.ok(saloon.parts.some(p=>p.sourceID===id),id);
  for(const p of Object.values(saloon.profiles)) {
    assert.equal(p.batches.length,2);assert.ok(p.triangles<=25000);
    assert.ok(p.geometryBytes<3*1024*1024);
  }
  for(const [index,item] of saloonManifest.profiles.exterior.audit.entries()) {
    if(!item.shared&&!item.support)continue;
    assert.deepEqual(item,saloonManifest.profiles.interior.audit[index]);
    if(item.support)assert.equal(item.sourceTriangles,item.triangles);
  }
  const root=new URL('../site/tidewater-rocha/rocha/luz-de-mar/',import.meta.url);
  const data=JSON.parse(await readFile(new URL('model.json',root))),bin=await readFile(new URL('model.bin',root));
  const full=buildYachtGeometry({data,binary:bin.buffer.slice(bin.byteOffset,bin.byteOffset+bin.byteLength)},0,{mtuEngines:false,seaStrainers:false});
  const buffer=saloonBuffer.buffer.slice(saloonBuffer.byteOffset,saloonBuffer.byteOffset+saloonBuffer.byteLength);
  try {
    for(const p of saloon.parts.filter(p=>p.role==='furniture')) {
      const source=full.interiorDetail.objects.find(s=>s.id===p.id);
      assert.ok(source,p.id);
      assert.deepEqual(new Float32Array(buffer,p.vertices.offset,p.vertices.length),Float32Array.from(source.vertices),p.id+' pose');
      assert.deepEqual(new Uint32Array(buffer,p.indices.offset,p.indices.length),Uint32Array.from(source.indices),p.id+' topology');
      assert.deepEqual(p.finish,source.finish,p.id+' finish');
    }
  }finally{full.dispose();}
});

test('native walking crosses the door, reaches both seating areas and returns at 12/40/60 Hz',()=>{
  for(const hz of [12,40,60]) {
    const f=fixture(),{nav}=f.walk;
    try {
      const route=f.model.boarding.route,length=routeSegments(route).length;
      assert.deepEqual(f.model.boarding.arrivalLook,[12.3,0,4.7]);
      assert.ok(moveAlongRoute(nav,route,0,length));
      assert.ok(Math.hypot(nav.position[0]-10,nav.position[1]-.1)<.001);assert.equal(nav.location().id,'MD_R02');
      // Side aisle around the sofas, then between the forward chairs and table.
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
    for(const p of [[8.44,-1],[8.44,1],[12,1],[12,-1],[11.95,.35],[15.9,0],[15.2,1.1],[12,3],[12,-3],[18,0],[9.2,2.8]])
      assert.equal(nav.floorSafe(...p),false,'Solid or unsupported point '+p);
    nav.enterRoom('MD_R01');travel(nav,[[6.2,.8],[7.4,-.4],[7.4,-.9],[7.1,-1.2],[5.8,-1.2],[4,-3],[2.7,-3.03],[.35,-3.03],[.35,0]]);
    assert.equal(nav.deck,'SP');assert.equal(nav.elevation,2.84);
    assert.equal(nav.floorSafe(.4,3.1,'SP'),false,'Port stair remains blocked');
    travel(nav,[[.35,-3.03],[2.7,-3.03]]);assert.equal(nav.deck,'MD');
  }finally{f.dispose();}
});

test('profiles use hysteresis and unloaded/failed saloon stays safely outside',async()=>{
  let p='exterior';
  for(const x of [8.3,8.8,9.2])assert.equal(p=nextProfile(p,x),'exterior');
  assert.equal(p=nextProfile(p,9.21),'interior');
  for(const x of [9.1,8.5,8])assert.equal(p=nextProfile(p,x),'interior');
  assert.equal(nextProfile(p,7.99),'exterior');assert.equal(nextProfile(p,9.5,'SP'),'exterior');
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
