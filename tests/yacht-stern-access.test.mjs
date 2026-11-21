import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createBoarding,createSternFeatures,createFinishes,i as Walk,l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import {A as Group} from '../site/tidewater-rocha/assets/common-HBn3Movl.js';
import {connectTerrace,moveAlongRoute,routeSegments} from '../site/tidewater-rocha/mobile/aft-terrace.js';
import {connectSternAccess,onSurface} from '../site/tidewater-rocha/mobile/stern-access.js';
import {configureWalk} from '../site/tidewater-rocha/mobile/gangway-scene.js';
import {crossing} from '../site/tidewater-rocha/mobile/pasarela.js';

const root=new URL('../site/tidewater-rocha/mobile/',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('aft-terrace.json',root)));
const bin=await readFile(new URL('aft-terrace.bin',root));
const buffer=bin.buffer.slice(bin.byteOffset,bin.byteOffset+bin.byteLength);

function fixture() {
  const group=new Group();group.userData={yacht:basis};
  const model={group}, transom=createSternFeatures();
  const terrace=structuredClone(manifest);
  terrace.parts=terrace.parts.map(part=>{
    const result={...part};
    for(const key of ['vertices','indices','light','surfaceTypes']) {
      const Type=key==='indices'?Uint32Array:Float32Array;
      result[key]=Array.from(new Type(buffer,part[key].offset,part[key].length));
    }
    return result;
  });
  const materials=createFinishes(0,true,true,true,true);
  const boarding=createBoarding(model,null,{gangwayOnly:true,includeLanding:true,materials,
    sternParts:transom.parts,terraceParts:terrace.parts});
  boarding.room.spawn=[boarding.start+.18,boarding.y,boarding.height(boarding.start+.18)+1.6];
  connectTerrace(boarding,terrace,transom.access.starboard.upperFloor);
  Object.assign(model,{boarding,terrace,transom,asset:{data:{rooms:[terrace.room,transom.access.starboard.room],
    levels:{MD:3.95,SP:2.84},meshes:[]}}});
  model.sternAccess=connectSternAccess(model);
  const walk=new Walk({camera:{position:group.position}},model,{document:null});
  configureWalk(walk);walk.nav.enterRoom('boarding');
  return {walk,model,access:model.sternAccess,dispose(){boarding.dispose();materials.opaque.dispose();materials.glass.dispose();}};
}

const approach=[[6.68,0],[7.4,-1.6],[7.4,-2.5],[6.6,-3.1],[4,-3.03],[4,-3.03],[2.7,-3.03]];

function travel(nav,points,hz=40) {
  for(const point of points) {
    const delta=point.map((v,i)=>v-nav.position[i]), n=Math.max(1,Math.ceil(Math.hypot(...delta)*hz/1.12));
    for(let i=0;i<n;i++)nav.move(...delta.map(v=>v/n));
    assert.ok(Math.hypot(...point.map((v,i)=>v-nav.position[i]))<.002,
      `Blocked toward ${point}: ${JSON.stringify({at:nav.position,height:nav.elevation,deck:nav.deck,stair:!!nav.stair})}`);
  }
}

test('the actual upper floor closes the 1.44-unit gap and meets tread six and the main deck',()=>{
  const {model,access,dispose}=fixture();
  try {
    for(let x=2.34;x<3.781;x+=.005)for(let y=-3.3;y<=-2.8;y+=.1)
      assert.ok(onSurface(x,y,access.upperFloor),`Missing deck at ${x},${y}`);
    for(let x=2.5;x<=4.2;x+=.005)assert.ok(model.boarding.safe(x,-3.03,.15),`Body clearance at ${x}`);
    assert.equal(access.upperHeight,3.95);assert.equal(access.lowerHeight,2.84);
    const rise=(3.95-2.84)/7;
    const heights=[2.84,...access.treads.map(t=>t.height),3.95];
    heights.slice(1).forEach((height,i)=>assert.ok(Math.abs(height-heights[i]-rise)<1e-8));
    const riser=model.transom.parts.find(p=>/final riser/.test(p.feature));
    assert.ok(riser.bounds[2]<access.treads.at(-1).height && riser.bounds[5]===3.83);
    assert.ok(model.boarding.stats.triangles<=25000);
    assert.equal(model.boarding.meshes.length,2);
  }finally{dispose();}
});

test('native walking reaches the swim platform and returns, including reversing on every tread at 12/40/60 Hz',()=>{
  for(const hz of [12,40,60]) {
    const {walk,access,dispose}=fixture(), nav=walk.nav;
    try {
      nav.enterRoom('MD_R01');travel(nav,approach,hz);
      for(const tread of access.treads.toReversed()) {
        const x=(tread.bounds[0]+tread.bounds[3])/2;
        travel(nav,[[x,-3.03]],hz);
        assert.ok(Math.abs(nav.elevation-tread.height)<1e-7);
        const before=[...nav.position];nav.move(0,0);assert.deepEqual(nav.position,before);
        travel(nav,[[x+.035,-3.03],[x,-3.03]],hz);
        assert.equal(crossing(walk),null,'Guided MD route is unavailable mid-stair');
      }
      travel(nav,[[.35,-3.03],[.35,0]],hz);
      assert.equal(nav.deck,'SP');assert.equal(nav.stair,null);assert.equal(nav.elevation,2.84);
      assert.equal(nav.location().id,'swim-platform');assert.equal(crossing(walk),null);
      travel(nav,[[.35,-3.03],[2.7,-3.03]],hz);
      assert.equal(nav.deck,'MD');assert.equal(nav.stair,null);assert.equal(nav.elevation,3.95);
      travel(nav,approach.toReversed(),hz);
      nav.enterRoom('boarding');
      assert.ok(moveAlongRoute(nav,walk.model.boarding.route,0,routeSegments(walk.model.boarding.route).length));
    }finally{dispose();}
  }
});

test('platform, stair edges, transom and deployed port gangway stop the body at the correct level',()=>{
  const {walk,access,dispose}=fixture(), nav=walk.nav;
  try {
    nav.enterRoom('swim-platform');assert.deepEqual(nav.position,[.35,-3.03]);
    assert.equal(nav.floorSafe(.35,0,'LD'),false,'The platform is not the lower deck');
    for(const point of [[-2.12,0],[-1,.85],[-.89,0],[1.45,0],[2,-3.03],[.8,-2.5],[.4,3.1]])
      assert.equal(nav.floorSafe(...point,'SP'),false,`Blocked platform point ${point}`);
    travel(nav,[[.35,0],[1.15,.30],[.35,0],[.35,-3.03]]);
    for(let i=0;i<150;i++)nav.move(-.025,0);
    assert.ok(nav.position[0]>-2.06&&nav.position[0]<-1.6,'Stop at the extended platform edge');
    nav.enterRoom('swim-platform');travel(nav,[[1.5,-3.03]]);
    nav.move(0,-1);assert.ok(nav.position[1]>-3.31,'Stop at outer stair coaming');
    nav.move(0,2);assert.ok(nav.position[1]<-2.7,'Stop at transom and inner stair edge');
    assert.equal(access.stairSafe(1.5,-3.4,access.treads[3].height,.14),false);
    for(const y of [-3.23,-2.83]) {
      nav.enterRoom('MD_R01');nav.position=[3.5,y];
      assert.ok(nav.floorSafe(...nav.position));
      travel(nav,[[.35,y],[3.5,y]]);
      assert.equal(nav.deck,'MD');assert.equal(nav.stair,null);
    }
    nav.enterRoom('boarding');assert.equal(nav.stair,null);assert.equal(nav.deck,'MD');
    assert.ok(crossing(walk));
  }finally{dispose();}
});

test('Beach Club has an open central bay, supported platform chairs and a continuous shaded entrance',()=>{
  const {model,access,dispose}=fixture();
  try{
    const parts=model.transom.parts;
    assert.ok(!parts.some(p=>/rounded recessed field|roman serif lettering|PANAMA registry/.test(p.feature)));
    const canopy=parts.find(p=>p.feature==='beach club timber soffit');
    assert.ok(canopy.bounds[2]-access.lowerHeight>=1.65);
    assert.equal(parts.filter(p=>p.feature.startsWith('beach club flush locker')).length,2);
    assert.equal(parts.filter(p=>p.feature.startsWith('swim platform inclined sun chair back')).length,2);
    assert.equal(parts.filter(p=>p.feature.startsWith('outboard stair coaming cap rail')).length,2);
    for(const side of ['port','starboard'])
      assert.equal(parts.filter(p=>p.feature.startsWith('transom '+side+' teak tread')).length,6);
    for(let x=-.1;x<=1.15;x+=.025)assert.ok(access.platformSafe(x,.20,.14),'Entry blocked at '+x);
    assert.equal(access.platformSafe(1.72,.20,.14),false,'Divan cushions block the body');
    for(const part of parts)assert.ok(part.bounds.every(Number.isFinite)&&part.vertices.every(Number.isFinite),part.feature);
  }finally{dispose();}
});

test('the sky surrounds the yacht in every direction and contributes no walk obstacles',async()=>{
  const {yachtSky}=await import('../site/tidewater-rocha/mobile/yacht-sky.js');
  const {obstacles}=await import('../site/tidewater-rocha/mobile/stair-surfaces.js');
  const sky=yachtSky();
  assert.equal(sky.finish[3],47);
  assert.equal(sky.indices.length,36);
  const context={...sky,context:true,bounds:[-145,-145,-145,163,145,145]};
  assert.equal(obstacles([context],new Set(),[0,-8,1.55,30,8,3.2]).footprints(1.55).length,0);
});
