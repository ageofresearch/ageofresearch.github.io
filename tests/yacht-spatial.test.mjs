import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {buildYachtGeometry,i as Walk,l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import {renderedParts,surfaceTriangles} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {indexFootprints} from '../site/tidewater-rocha/mobile/terrace-geometry.js';
import {correctSpatialAssemblies} from '../site/tidewater-rocha/mobile/spatial-corrections.js';
const root=new URL('../site/tidewater-rocha/',import.meta.url);
const data=JSON.parse(await readFile(new URL('rocha/luz-de-mar/model.json',root))),buffer=await readFile(new URL('rocha/luz-de-mar/model.bin',root));
const asset={data,binary:buffer.buffer.slice(buffer.byteOffset,buffer.byteOffset+buffer.byteLength),
  nav:Object.fromEntries(Object.entries(data.nav).map(([id,n])=>[id,{...n,bits:Uint8Array.from(atob(n.mask),c=>c.charCodeAt(0))}]))};
const before=buildYachtGeometry(asset,0,{mtuEngines:false,seaStrainers:false,spatialCorrections:false});
const after=buildYachtGeometry(asset,0,{mtuEngines:false,seaStrainers:false});
const oldParts=renderedParts(before),parts=renderedParts(after);
const center=p=>[0,1,2].map(k=>(p.bounds[k]+p.bounds[k+3])/2);
const byID=(ps,id)=>ps.find(p=>p.id===id);
test.after(()=>{before.dispose();after.dispose();});

test('the actual bow plinth contacts fail before the correction and fit the unchanged slab afterward',()=>{
  const floor=parts.filter(p=>(p.anchor||p.id)==='UD_DCK_001').flatMap(p=>surfaceTriangles(p,6,.002));
  const supported=indexFootprints(floor.map(polygon=>({polygon})));
  for(const id of ['UD_FUR_053','UD_FUR_055']){
    const low=p=>Array.from({length:p.vertices.length/6},(_,i)=>p.vertices.slice(i*6,i*6+3)).filter(v=>Math.abs(v[2]-6)<.001);
    assert.ok(low(byID(oldParts,id)).some(v=>!supported(v[0],v[1],1e-6)),id+' must reproduce the original defect');
    assert.ok(low(byID(parts,id)).every(v=>supported(v[0],v[1],1e-6)),id+' loses a load contact');
  }
  const a=parts.find(p=>p.id==='UD_DCK_001/stairs/stair-opening'),b=oldParts.find(p=>p.id===a.id);
  assert.deepEqual(a.vertices,b.vertices,'Do not grow the deck to conceal an unsupported chair');
});

test('the upper club chairs stand on two deck-mounted feet and leave a central passage',()=>{
  const feet=parts.filter(p=>p.feature?.startsWith('upper club chair recessed foot'));
  assert.equal(feet.length,2);
  assert.ok(feet.every(p=>p.bounds[2]===6));
  assert.ok(feet.some(p=>p.bounds[4]<-.14)&&feet.some(p=>p.bounds[1]>0));
  assert.ok(!parts.some(p=>/^exterior dining (chair|square table)/.test(p.feature||'')));
});

test('grounded assemblies retain their geometry and child relationships, and corrections apply once',()=>{
  const records=after.interiorDetail.spatialCorrections;
  const reshaped=new Set(records.filter(r=>r.action==='fit-recess').flatMap(r=>r.parts));
  for(const r of records){
    if(r.action==='remove-duplicate'){
      for(const id of r.parts)assert.ok(!byID(parts,id),'Duplicate survives: '+id);
      assert.ok(byID(parts,r.owner),'Owning surface was removed');continue;
    }
    for(const id of r.parts){
      if(reshaped.has(id))continue;
      const a=byID(parts,id),b=byID(oldParts,id);assert.ok(a&&b,id);
      assert.equal(a.indices.length,b.indices.length,id);
      // A rigid correction preserves each triangle edge, including every child.
      for(let i=0;i<a.indices.length;i+=3)for(let j=0;j<3;j++){
        const ia=a.indices[i+j]*6,ib=a.indices[i+(j+1)%3]*6;
        const la=Math.hypot(...[0,1,2].map(k=>a.vertices[ia+k]-a.vertices[ib+k]));
        const lb=Math.hypot(...[0,1,2].map(k=>b.vertices[ia+k]-b.vertices[ib+k]));
        assert.ok(Math.abs(la-lb)<1e-5,id+' was scaled or deformed');
      }
    }
    if(/^(cockpit-|upper-)/.test(r.id))assert.ok(Math.abs(r.after[2]-(r.id.startsWith('cockpit-')?3.95:6))<1e-7,r.id);
  }
  const vertices=JSON.stringify(parts.filter(p=>p.spatialCorrection).map(p=>p.vertices));
  correctSpatialAssemblies(after.interiorDetail,after.exterior,asset,{});
  assert.equal(JSON.stringify(renderedParts(after).filter(p=>p.spatialCorrection).map(p=>p.vertices)),vertices);
});

test('corrected full-view furniture has prepared collision fields and preserves the stair inventory',()=>{
  after.group.userData={yacht:basis};
  const walk=new Walk({camera:{position:after.group.position}},after,{document:null});
  assert.equal(after.correctedFurnitureFields.length,3);
  for(const [deck,x,y]of [['UD',12.03,-1.18],['UD',12.03,.44],['MD',25.72,2.21],['LD',30.05,1.13]])
    assert.equal(walk.nav.floorSafe(x,y,deck),false,`${deck} ${x},${y}`);
  assert.deepEqual(after.stairInventory.flights.map(f=>[f.id,f.treadCount,f.riseCount]),
    [['guest',13,14],['bridge',11,12],['aft',9,10],['sun',13,14],['service',12,13],['starboard-fore',13,14]]);
});

test('every active mobile profile retains corrected load-contact heights',async()=>{
  const manifest=JSON.parse(await readFile(new URL('mobile/bridge-access.json',root)));
  for(const [name,p]of Object.entries(manifest.profiles)){
    assert.ok(p.triangles<=25000,name);assert.equal(p.batches.length,2);
    const changed=p.audit.filter(a=>a.correction);assert.ok(changed.length>20,name);
    for(const a of changed){
      const z=a.sourceBounds[2];
      if([3.95,6].some(h=>Math.abs(z-h)<.001))assert.ok(Math.abs(a.renderedBounds[2]-z)<=.001,
        `${name}: ${a.id} floats after simplification by ${a.renderedBounds[2]-z}`);
    }
  }
});


test('galley basin is visible through a fitted recess without changing the cabinet envelope',()=>{
  const bodies=parts.filter(p=>p.anchor==='MD_FUR_035'&&['rounded joinery body','thin fitted top'].includes(p.feature));
  const bowl=parts.find(p=>p.anchor==='MD_SAN_004'&&p.feature==='recessed basin bowl'),[x,y]=center(bowl);
  assert.ok(Math.abs(bowl.bounds[5]-4.85)<1e-7);
  for(const body of bodies){
    assert.ok(body.indices.length>0);
    const edges=new Map(),point=i=>body.vertices.slice(i*6,i*6+3).map(n=>n.toFixed(6)).join(',');
    for(let i=0;i<body.indices.length;i+=3)for(let j=0;j<3;j++){
      const key=[point(body.indices[i+j]),point(body.indices[i+(j+1)%3])].sort().join('|');
      edges.set(key,(edges.get(key)||0)+1);
    }
    assert.ok([...edges.values()].every(n=>n===2),'Recess must remain a closed surface without T junctions');
    const faces=surfaceTriangles(body,body.bounds[5],.00001);
    assert.equal(indexFootprints(faces.map(polygon=>({polygon})))(x,y,1e-6),false,'Counter still covers the basin');
    const old=oldParts.find(p=>p.id===body.id);
    for(const k of [0,2,3,5])assert.ok(Math.abs(old.bounds[k]-body.bounds[k])<1e-6,'Outer cabinet size changed');
    assert.ok(Math.abs((old.bounds[4]-old.bounds[1])-(body.bounds[4]-body.bounds[1]))<1e-6);
  }
  for(const finish of parts.filter(p=>p.feature?.startsWith('galley dark stone worktop'))){
    const top=surfaceTriangles(finish,finish.bounds[5],.00001);
    assert.equal(indexFootprints(top.map(polygon=>({polygon})))(x,y,1e-6),false,'Galley finish hides sink');
  }
  assert.ok(!parts.some(p=>p.anchor==='MD_FUR_037'),'Buried duplicate cabinet remains');
});

test('chair backs and headrests face the photographed fixtures and open deck',()=>{
  const named=label=>parts.filter(p=>p.feature?.startsWith(label));
  function highEdge(chunks,axis){
    const vertices=chunks.flatMap(p=>Array.from({length:p.vertices.length/6},(_,i)=>p.vertices.slice(i*6,i*6+3)));
    const top=Math.max(...vertices.map(v=>v[2]));
    const edge=vertices.filter(v=>v[2]>top-.04);
    return edge.reduce((sum,v)=>sum+v[axis],0)/edge.length;
  }
  for(const i of [0,1]){
    const club=named('upper club chair '+i+' ');
    assert.ok(club.length>=2 && highEdge(club,0)>12.26,'Club chair should open aft');
  }
  for(const n of ['001','003']){
    const pads=named('solarium reclining lounger').filter(p=>p.anchor==='SD_SOF_'+n);
    assert.ok(pads.length>=2 && highEdge(pads,0)>12.60,'Sunbed head should face the bar');
  }
  const helm=named('helm chair captainPads'),hardware=named('helm chair captainHardware');
  assert.ok(highEdge(helm,0)<21 && helm.every(p=>p.materialID==='M109'));
  assert.ok(hardware.length>=3 && Math.min(...hardware.map(p=>p.bounds[2]))<6.01);
  const writing=named('suite cobalt writing chair '),desk=named('suite window writing surface')[0];
  const seat=named('suite cobalt writing chair seat')[0],roll=named('suite cobalt writing chair bolster')[0];
  const feet=writing.filter(p=>p.feature.endsWith('support'));
  assert.equal(writing.length,4);
  assert.ok(writing.every(p=>p.materialID==='M126'&&p.vertices.every(Number.isFinite)));
  assert.ok(highEdge([roll],1)>center(seat)[1],'The low bolster is on the cabin side');
  assert.ok(Math.abs(center(desk)[0]-center(seat)[0])<.04);
  assert.ok(roll.bounds[5]-seat.bounds[5]<.10,'The bolster remains low above the seat');
  assert.equal(feet.length,2);
  for(const foot of feet){
    assert.ok(foot.bounds[2]>=3.95&&foot.bounds[2]<=3.956&&foot.bounds[5]>seat.bounds[2]);
    assert.ok(foot.bounds[4]-foot.bounds[1]>.30,'Each upholstered support is a full-depth panel');
  }
  assert.ok(!parts.some(p=>p.anchor==='MD_FUR_053'),'Occasional table intersects the writing stool');
});
