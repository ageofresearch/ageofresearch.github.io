import { readFile } from 'node:fs/promises';
import { createBoarding,createSternFeatures,createFinishes,i as Walk,l as basis } from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { A as Group } from '../site/tidewater-rocha/assets/common-HBn3Movl.js';
import { connectTerrace } from '../site/tidewater-rocha/mobile/aft-terrace.js';
import { connectSternAccess } from '../site/tidewater-rocha/mobile/stern-access.js';
import { configureWalk } from '../site/tidewater-rocha/mobile/gangway-scene.js';
import { decodeSaloon,connectSaloon } from '../site/tidewater-rocha/mobile/main-saloon.js';

const root=new URL('../site/tidewater-rocha/mobile/',import.meta.url);
export const saloonManifest=JSON.parse(await readFile(new URL('main-saloon.json',root)));
export const saloonBuffer=await readFile(new URL('main-saloon.bin',root));
const arrayBuffer=b=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);
export const saloon=decodeSaloon(saloonManifest,arrayBuffer(saloonBuffer));
const terraceManifest=JSON.parse(await readFile(new URL('aft-terrace.json',root)));
const tb=arrayBuffer(await readFile(new URL('aft-terrace.bin',root)));

export function fixture({ready=true}={}) {
  const group=new Group();group.userData={yacht:basis};
  const model={group},transom=createSternFeatures(),terrace=structuredClone(terraceManifest);
  terrace.parts=terrace.parts.map(part=>{
    const result={...part};
    for(const key of ['vertices','indices','light','surfaceTypes']) {
      const Type=key==='indices'?Uint32Array:Float32Array;
      result[key]=Array.from(new Type(tb,part[key].offset,part[key].length));
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
  configureWalk(walk);
  if(ready)connectSaloon(walk,saloon);
  walk.nav.enterRoom('boarding');
  return {model,walk,dispose(){boarding.dispose();materials.opaque.dispose();materials.glass.dispose();}};
}

export function travel(nav,points,hz=40) {
  for(const point of points) {
    const delta=point.map((v,i)=>v-nav.position[i]),n=Math.max(1,Math.ceil(Math.hypot(...delta)*hz/1.12));
    for(let i=0;i<n;i++)nav.move(...delta.map(v=>v/n));
    if(Math.hypot(...point.map((v,i)=>v-nav.position[i]))>.002)
      throw Error(`Blocked toward ${point}: at ${nav.position}, height ${nav.elevation}`);
  }
}
