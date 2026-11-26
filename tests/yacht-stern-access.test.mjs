import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createBoarding,createSternFeatures,createFinishes,i as Walk,l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import {A as Group} from '../site/tidewater-rocha/assets/common-HBn3Movl.js';
import {connectTerrace,moveAlongRoute,routeSegments} from '../site/tidewater-rocha/mobile/aft-terrace.js';
import {connectSternAccess,onSurface,topTriangles} from '../site/tidewater-rocha/mobile/stern-access.js';
import {configureCamera,configureWalk} from '../site/tidewater-rocha/mobile/gangway-scene.js';
import {crossing} from '../site/tidewater-rocha/mobile/pasarela.js';

const root=new URL('../site/tidewater-rocha/mobile/',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('aft-terrace.json',root)));
const bin=await readFile(new URL('aft-terrace.bin',root));
const buffer=bin.buffer.slice(bin.byteOffset,bin.byteOffset+bin.byteLength);

function fixture() {
  const group=new Group();group.userData={yacht:basis};
  const model={group}, transom=createSternFeatures({mobile:true});
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

test('the mobile projection keeps the requested field of view on rotation and resolution changes',()=>{
  const projectionUpdates=[];
  const camera={aspect:16/9,fov:62,updateProjectionMatrix(){projectionUpdates.push(this.fov);}};
  const onResize=[];
  const horizontalFov=()=>2*Math.atan(Math.tan(camera.fov*Math.PI/360)*camera.aspect)*180/Math.PI;
  configureCamera({camera,onResize});
  assert.ok(Math.abs(horizontalFov()-110)<1e-9);
  onResize[0]();
  assert.equal(projectionUpdates.length,1);
  camera.aspect=9/16;
  onResize[0]();
  assert.equal(camera.fov,75);
  camera.aspect=21/9;
  onResize[0]();
  assert.ok(Math.abs(horizontalFov()-110)<1e-9);
});

test('the mobile camera walks one third lower at both the deck and swim platform elevations',()=>{
  const {walk,model,dispose}=fixture();
  try {
    const camera=walk.app.camera.position=model.group.position.clone();
    const player=walk.app.player={position:camera.clone()};
    for(const room of ['boarding','swim-platform']){
      walk.nav.enterRoom(room);
      walk.applyPosition();
      const feet=walk.nav.elevation;
      const cameraZ=model.group.worldToLocal(camera.clone()).y+basis.seaReference;
      const playerZ=model.group.worldToLocal(player.position.clone()).y+basis.seaReference;
      assert.ok(Math.abs(cameraZ-feet-16/15)<1e-9);
      assert.ok(Math.abs(playerZ-feet)<1e-9);
    }
    const fullMapWalk=new Walk(walk.app,model,{document:null});
    assert.equal(fullMapWalk.eyeHeight,1.6);
  }finally{dispose();}
});

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

test('port stair recess meets the photographed centre section within half a grid cell',()=>{
  // Beach Club view B, 640 by 448, 56-degree horizontal field of view.
  // The basis maps source-model distances through the registered yacht scale.
  const eye=[-1.60911097,1.69767526,3.60964536];
  const right=[.39216688,-.90052088,0], up=[.03608886,.01585419,.99918960];
  const forward=[.89586965,.39356429,-.04025096];
  const lens=320/Math.tan(28*Math.PI/180);
  const face=createSternFeatures().parts.find(p=>p.feature==='port stair recessed kick face');
  const projected=[];
  for(let i=0;i<face.vertices.length;i+=6){
    const delta=eye.map((value,k)=>face.vertices[i+k]-value);
    const dot=axis=>axis.reduce((sum,value,k)=>sum+value*delta[k],0);
    const depth=dot(forward);
    assert.ok(depth>0);
    projected.push([320+lens*dot(right)/depth,224-lens*dot(up)/depth]);
  }
  const crossings=[];
  for(let i=0;i<face.indices.length;i+=3){
    const tri=face.indices.slice(i,i+3).map(index=>projected[index]);
    for(let j=0;j<3;j++){
      const a=tri[j],b=tri[(j+1)%3];
      if(Math.min(a[0],b[0])<=325 && 325<Math.max(a[0],b[0]))
        crossings.push(a[1]+(325-a[0])*(b[1]-a[1])/(b[0]-a[0]));
    }
  }
  assert.ok(crossings.length>=2);
  assert.ok(Math.abs(Math.min(...crossings)-275)<=16,'Upper edge at x=325');
  assert.ok(Math.abs(Math.max(...crossings)-290)<=16,'Lower edge at x=325');
});

test('water is exposed below the curved port landing and outside the platform walking edge',()=>{
  const {model,access,dispose}=fixture();
  try {
    const rim=model.transom.parts.find(p=>p.anchor==='MD_DCK_002');
    const water=model.boarding.parts.find(p=>p.feature==='Berth water surface');
    assert.ok(water.context && water.bounds[5]<access.lowerHeight);
    const wet=topTriangles(water), structural=topTriangles(rim);
    for (const [x,y] of [[-1.5,2.80],[-.45,2.70],[.15,2.65]]) {
      assert.ok(onSurface(x,y,wet),'Water visible outside the hull');
      assert.ok(!onSurface(x,y,structural) && !onSurface(x,y,access.platformFloor));
      assert.equal(access.platformSafe(x,y,.14),false);
    }
    assert.ok(!onSurface(18,0,wet),'The isolated water surface excludes the hull interior');
    assert.ok(access.platformSafe(-.45,2.15,.14));
    assert.ok(!access.platformSafe(-.45,2.35,.14),'Stop the body before it overhangs the water');
    assert.ok(access.platformSafe(.35,-3.03,.14),'Starboard arrival retains its platform');
  }finally{dispose();}
});

test('port lower landing, kick reveal and inset footwell form separate supported surfaces',()=>{
  const {model,access,dispose}=fixture();
  try {
    const part=name=>model.transom.parts.find(p=>p.feature===name);
    const plinth=part('transom port pale step 1');
    const bands=['perimeter lip','teak margin board']
      .map(name=>part('port stair landing '+name)).concat(part('transom port teak tread 1'),part('port stair landing field caulking'));
    const kick=part('port stair recessed kick face'), shell=part('transom port pale step 2');
    const well=part('transom port teak tread 2'), surround=part('port stair moulded footwell surround');
    const landingZ=plinth.bounds[5],footwellZ=well.bounds[5];
    assert.ok(access.lowerHeight<landingZ && landingZ<footwellZ);
    assert.equal(kick.bounds[2],landingZ);
    assert.ok(kick.bounds[5]>shell.bounds[2],'The moulding overlaps the recessed face in elevation');
    assert.ok(kick.bounds[0]>shell.bounds[0]+.04,'The kick is set back under the moulded nose');
    assert.equal(landingZ,3.04);
    assert.ok(plinth.bounds[0]<-.5 && plinth.bounds[2]<2.7,'The sponson projects aft and rounds down to its sole');
    const profile=Array.from({length:plinth.vertices.length/6},(_,i)=>plinth.vertices.slice(i*6,i*6+3));
    const aftAt=z=>Math.min(...profile.filter(point=>Math.abs(point[2]-z)<1e-8).map(point=>point[0]));
    assert.ok(aftAt(2.815)<aftAt(landingZ)-.17,'The front pushes out towards the water below the teak');
    assert.ok(aftAt(2.815)<aftAt(plinth.bounds[2])-.11,'The front returns smoothly at the sole');
    const inboard=part('port stair sponson inboard skin');
    assert.ok(inboard.bounds[1]>=2.44,'The flare leaves the inboard water gap open');
    assert.equal(shell.bounds[5],footwellZ);
    assert.equal(surround.bounds[5],footwellZ);
    assert.equal(topTriangles(plinth).length,0,'A second cap under the teak would flicker');
    assert.equal(topTriangles(shell).length,0);
    const top=bands.map(p=>topTriangles(p));
    for(const y of [2.72,2.91,3.10,3.27])for(let x=.33;x<.92;x+=.031)
      assert.equal(top.filter(faces=>onSurface(x,y,faces)).length,1,'Landing surface ownership at '+[x,y]);
    const seams=topTriangles(part('port stair landing field caulking'));
    for(let row=0;row<9;row++){
      const y=2.58+row*.104;
      assert.ok(onSurface(.8,y,seams),'Missing landing caulk at '+y);
      assert.ok(!onSurface(.8,y+.01,seams),'Caulk must remain within its narrow strip');
    }
    assert.ok(!top.some(faces=>onSurface(-.36,3.51,faces)),'Outboard aft corner follows the hull sweep');
    assert.ok(onSurface(1.38,3.03,topTriangles(well)));
    assert.ok(onSurface(1.074,3.03,topTriangles(surround)));
    assert.ok(!onSurface(1.38,3.03,topTriangles(surround)),'Well and collar have distinct surfaces');
    for(const riser of [shell,part('transom port pale step 3'),part('transom port pale step 4'),part('transom port pale step 5')]){
      const normals=Array.from({length:riser.vertices.length/6},(_,i)=>riser.vertices[i*6+3]);
      assert.ok(normals.every(x=>x<-.6),'Recess and riser faces must face aft with back-face culling');
    }
    const jamb=part('beach club swept jamb 1'),cover=part('port stair flush service cover');
    assert.ok(cover.bounds[1]>jamb.bounds[1] && cover.bounds[4]<jamb.bounds[4],'Cover is within its moulded jamb');
    const treads=Array.from({length:6},(_,i)=>part('transom port teak tread '+(i+1)));
    assert.ok(treads.every((p,i)=>p && (!i || p.bounds[5]>treads[i-1].bounds[5])));
    assert.ok(Math.abs(treads.at(-1).bounds[5]-access.treads.at(-1).height)<1e-8);
    assert.equal(access.platformSafe(.55,3.05,.14),false,'A visitor cannot walk inside the raised landing');
  }finally{dispose();}
});

test('the three gangway sleeves form a closed shell through both changes in section',()=>{
  const {model,dispose}=fixture();
  try{
    const edges=new Map(),triangles=new Set();
    const parts=model.boarding.parts.filter(p=>/nested frame|recessed underskin|inset side channel|underside collar/.test(p.feature));
    assert.equal(parts.length,17);
    for(const {vertices,indices} of parts){
      const points=Array.from({length:vertices.length/6},(_,i)=>vertices.slice(i*6,i*6+3).map(v=>v.toFixed(6)).join(','));
      for(let i=0;i<indices.length;i+=3){
        const corners=indices.slice(i,i+3).map(j=>points[j]);
        const key=[...corners].sort().join('|');
        assert.ok(!triangles.has(key),'Duplicate shell face '+key);
        triangles.add(key);
        for(let n=0;n<3;n++){
          const from=corners[n],to=corners[(n+1)%3],directed=from+'|'+to;
          assert.ok(!edges.has(directed),'Duplicate directed edge '+directed);
          edges.set(directed,to+'|'+from);
        }
      }
    }
    for(const opposite of edges.values())assert.ok(edges.has(opposite),'Unclosed sleeve edge '+opposite);
  }finally{dispose();}
});

test('the deployed beam, teak, and navigation share the dock to yacht slope',()=>{
  const {model,dispose}=fixture();
  try {
    const {boarding}=model, {start,end,y}=boarding.layout;
    assert.ok(boarding.height(start)>boarding.height(end));
    assert.equal(boarding.height(end),boarding.layout.deckHeight);
    for(let i=1;i<=3;i++){
      const panel=boarding.parts.find(p=>p.feature===`telescopic section ${i} teak inset`);
      const frame=boarding.parts.find(p=>p.feature===`telescopic section ${i} nested frame`);
      for(const x of [panel.bounds[0],panel.bounds[3]]){
        const at=[];
        for(let j=0;j<panel.vertices.length;j+=6)
          if(Math.abs(panel.vertices[j]-x)<1e-7)at.push(panel.vertices[j+2]);
        assert.ok(Math.abs(Math.max(...at)-boarding.height(x))<.007);
      }
      const liner=boarding.parts.find(p=>p.feature===`telescopic section ${i} recessed underskin`);
      assert.ok(liner.bounds[1]>frame.bounds[1] && liner.bounds[4]<frame.bounds[4]);
      const depth=(p)=>Math.min(...Array.from({length:p.vertices.length/6},(_,k)=>
        p.vertices[6*k+2]-boarding.height(p.vertices[6*k])));
      assert.ok(depth(liner)>depth(frame)+.02,'Panel must sit above both longitudinal stringers');
      assert.ok(frame.finish[1]>.5 && boarding.safe((panel.bounds[0]+panel.bounds[3])/2,y,.14));
    }
    assert.equal(boarding.parts.filter(p=>p.feature.includes('underside collar')).length,2);
  }finally{dispose();}
});

test('the port mooring fittings seat on the inset teak and leave a slot under the coaming',()=>{
  const {model,dispose}=fixture();
  try {
    const parts=[...model.terrace.parts,...model.transom.parts];
    const find=name=>parts.find(p=>p.feature===name);
    const shelf=find('port mooring shelf teak').bounds;
    const cover=find('port mooring satin upper coaming').bounds;
    assert.ok(cover[2]-shelf[5]>.27);
    assert.equal(parts.filter(p=>p.feature.startsWith('port mooring polished support ')).length,5);
    assert.equal(parts.filter(p=>p.feature.startsWith('port mooring flush upper cover ')).length,2);
    assert.equal(parts.filter(p=>p.feature.startsWith('port mooring socket centre ')).length,2);
    const fittings=[
      ['cockpit port cleat gasket 1','cockpit cleat sole 1'],
      ['cockpit port cleat gasket forward 1','cockpit cleat sole forward 1'],
      ['cockpit port drum seating gasket','cockpit mooring drum foot 1'],
    ];
    for(const [gasket,foot] of fittings){
      const b=find(gasket).bounds, mount=find(foot);
      assert.ok(b[2]<=shelf[5] && b[5]>=shelf[5]);
      assert.ok(b[0]>=shelf[0] && b[3]<=shelf[3] && b[1]>=shelf[1] && b[4]<=shelf[4]);
      assert.ok(Math.abs(mount.bounds[2]-b[5])<1e-5);
      assert.deepEqual(mount.finish.slice(1),[.12,1,65]);
    }
    for(const name of ['swept gelcoat arm','warm teak inset','soft grey cushion','polished return grip'])
      assert.ok(find('port cockpit seat '+name),name);
  } finally {dispose();}
});

test('the starboard mooring hardware is seated on the shelf and the stair passage stays clear',()=>{
  const {model,dispose}=fixture();
  try {
    const parts=model.transom.parts;
    const find=name=>parts.find(p=>p.feature===name);
    const shelf=find('starboard mooring inset teak shelf').bounds;
    const cover=find('starboard mooring satin upper fascia').bounds;
    assert.ok(cover[2]-shelf[5]>.27);
    assert.equal(parts.filter(p=>p.feature.startsWith('starboard mooring polished support ')).length,5);
    assert.equal(parts.filter(p=>p.feature.startsWith('starboard mooring flush upper cover ')).length,2);
    assert.equal(parts.filter(p=>p.feature.startsWith('starboard mooring socket bezel ')).length,2);
    // The inboard edges of the fitting heads are visible ahead of the fascia.
    for(const p of parts.filter(p=>/^starboard mooring oval horn head/.test(p.feature)))
      assert.ok(p.bounds[4]>cover[4]);
    const footings=['cockpit cleat sole -1','cockpit cleat sole forward -1','starboard mooring capstan gasket'];
    for(const name of footings){
      const b=find(name).bounds;
      assert.ok(b[2]<=shelf[5]+1e-6 && b[5]>=shelf[5]);
      assert.ok(b[0]>=shelf[0] && b[3]<=shelf[3] && b[1]>=shelf[1] && b[4]<=shelf[4]);
    }
    const foot=find('cockpit mooring drum foot -1');
    assert.equal(foot.bounds[2],find('starboard mooring capstan gasket').bounds[5]);
    for(const name of ['cockpit cleat sole -1','cockpit cleat sole forward -1','cockpit mooring drum foot -1'])
      assert.deepEqual(find(name).finish.slice(1),[.12,1,65]);
    const inlay=find('starboard cockpit seat inset teak').bounds;
    const support=find('starboard cockpit seat molded teak support').bounds;
    assert.ok(Math.abs(inlay[2]-support[5])<=.00101);
    assert.deepEqual([inlay[0],inlay[1],inlay[3],inlay[4]],[support[0],support[1],support[3],support[4]]);
    assert.ok(find('starboard cockpit seat polished return grip'));
    assert.ok(model.boarding.safe(2.82,-3.03,.14));
    assert.equal(model.boarding.safe(2.82,-2.38,.14),false);
    assert.equal(model.boarding.safe(4.02,-3.43,.14),false);
  } finally {dispose();}
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
    const seats=parts.filter(p=>p.feature.startsWith('swim platform sun chair seat'));
    const bases=parts.filter(p=>p.feature.startsWith('swim platform sun chair base'));
    assert.equal(bases.length,2);
    assert.equal(seats.length,2);
    for(const [i,seat] of seats.entries()){
      assert.equal(bases[i].bounds[2],access.lowerHeight);
      assert.equal(bases[i].bounds[5],seat.bounds[2]);
      assert.ok(Math.abs(seat.bounds[5]-3.024)<1e-6);
      const [x,y,,X,Y]=seat.bounds;
      assert.equal(access.platformSafe((x+X)/2,(y+Y)/2,.14),false);
    }
    assert.equal(parts.filter(p=>p.feature.startsWith('swim platform sun chair scatter')).length,2);
    assert.ok(parts.some(p=>p.feature==='swim platform stainless shower riser'));
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
  // All faces must point inward so the full sky survives back-face culling.
  for(let i=0;i<sky.indices.length;i+=3){
    const [a,b,c]=sky.indices.slice(i,i+3).map(k=>sky.vertices.slice(k*6,k*6+3));
    const u=b.map((x,k)=>x-a[k]),v=c.map((x,k)=>x-a[k]);
    const n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
    assert.ok(n[0]*(a[0]-18)+n[1]*a[1]+n[2]*a[2]<0);
  }
  const context={...sky,context:true,bounds:[-145,-145,-145,163,145,145]};
  assert.equal(obstacles([context],new Set(),[0,-8,1.55,30,8,3.2]).footprints(1.55).length,0);
});

test('the cockpit openings expose the mooring fittings in both registered VR views',()=>{
  const {model,dispose}=fixture();
  try {
    const parts=[...model.transom.parts,...model.terrace.parts,...model.boarding.parts.filter(p=>!p.context)];
    const minus=(a,b)=>a.map((v,i)=>v-b[i]);
    const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
    const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
    const unit=v=>v.map(n=>n/Math.hypot(...v));
    // Test nearest surfaces through the registered pixel, including the sill
    // and coaming. A fitting in the correct cell can still be behind a panel.
    function surfaceAt(eye,forward,hfov,x,y) {
      const right=unit(cross(forward,[0,0,1])),up=cross(right,forward);
      const lens=320/Math.tan(hfov*Math.PI/360);
      const direction=forward.map((v,i)=>(v+right[i]*(x+.5-320)/lens+up[i]*(224-y-.5)/lens)/[basis.sx,basis.sy,1][i]);
      let nearest=Infinity,feature=null;
      for(const part of parts){
        const point=index=>part.vertices.slice(6*index,6*index+3);
        for(let i=0;i<part.indices.length;i+=3){
          const a=point(part.indices[i]),ab=minus(point(part.indices[i+1]),a),ac=minus(point(part.indices[i+2]),a);
          const h=cross(direction,ac),det=dot(ab,h);
          if(Math.abs(det)<1e-10)continue;
          const s=minus(eye,a),u=dot(s,h)/det;
          if(u<0||u>1)continue;
          const q=cross(s,ab),v=dot(direction,q)/det;
          if(v<0||u+v>1)continue;
          const distance=dot(ac,q)/det;
          if(distance>.013 && distance<nearest){nearest=distance;feature=part.feature;}
        }
      }
      return feature;
    }
    const port=[[4.850025,1.354976,5.024169],[-.61472959,.54072586,-.57421518],84];
    const stbd=[[6.312899,-.901079,5.027842],[-.34789153,-.82028036,-.45399518],75];
    assert.equal(surfaceAt(...port,421,101),'cockpit cleat sole 1');
    assert.equal(surfaceAt(...port,529,103),'cockpit mooring drum 1');
    assert.equal(surfaceAt(...port,634,155),'cockpit cleat sole forward 1');
    assert.equal(surfaceAt(...stbd,379,116),'cockpit cleat sole forward -1');
    assert.equal(surfaceAt(...stbd,503,103),'cockpit cleat sole -1');
    assert.equal(surfaceAt(...stbd,445,92),'cockpit mooring drum -1');
    assert.equal(surfaceAt(...stbd,190,277),'rounded metallic cockpit wet bar');
    assert.match(surfaceAt(...stbd,241,277),/stair opening/);
  } finally {dispose();}
});
