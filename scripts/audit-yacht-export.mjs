// Export submitted mesh ranges, not a deduplicated list of source IDs.
// This is an offline audit; the public viewer never downloads this geometry.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {gzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';

const site=resolve(process.env.YACHT_SITE||'site/tidewater-rocha');
const out=resolve(process.argv[2]||'/tmp/yacht-spatial-audit/current');
const {o:buildFull,l:basis,i:Walk}=await import(pathToFileURL(site+'/assets/RochaYachtState-P5KwIGIl.js'));
const buffer=await readFile(site+'/rocha/luz-de-mar/model.bin');
const data=JSON.parse(await readFile(site+'/rocha/luz-de-mar/model.json'));
const world=JSON.parse(await readFile(site+'/rocha/luz-de-mar/berth.json'));
const nav=Object.fromEntries(Object.entries(data.nav).map(([id,n])=>[id,{...n,bits:Uint8Array.from(atob(n.mask),c=>c.charCodeAt(0))}]));
const model=buildFull(world,{data,nav,binary:buffer.buffer.slice(buffer.byteOffset,buffer.byteOffset+buffer.byteLength)});
for(const controller of [model.mtu,model.strainers].filter(Boolean)){
  controller.fetcher=async url=>new Response(await readFile(resolve(site,String(url).split('?')[0])));
  if(!await controller.loadExterior())throw Error('Equipment preparation: '+controller.state.error);
}
const walk=new Walk({camera:{position:model.group.position.clone()},player:{position:model.group.position.clone()}},model,{document:null});
model.group.updateWorldMatrix(true,true);
const inverse=model.group.matrixWorld.clone().invert();
const metadata=new Map(data.meshes.map(p=>[p.id,p]));
for(const collection of [model.interiorDetail?.objects,model.interiorDetail?.additions,
  [...model.interiorDetail.replacements.values()].flat(),model.exterior?.parts,
  model.machinery?.parts,model.serviceAccess?.parts,model.upperEquipment?.parts,
  model.transom?.parts,model.boarding?.parts])
  for(const p of collection||[])metadata.set(p.id,{...metadata.get(p.id),...p});
const sourceByID=new Map(data.meshes.map(p=>[p.id,p]));
const parts=[],meshes=new Set();
function extract(mesh,start,count,id,indexOverride) {
  if(!count)return;
  const meta=metadata.get(id)||{},anchor=meta.anchor||meta.sourceID||id.split('/')[0];
  const source=sourceByID.get(anchor)||{},indices=indexOverride||mesh.geometry.index.array;
  const positions=mesh.geometry.attributes.position.array;
  const transform=inverse.clone().multiply(mesh.matrixWorld),v=mesh.position.clone();
  const vertices=[],faces=[],remap=new Map(),bounds=[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity];
  for(let i=start;i<start+count;i++){
    const old=indices[i];
    if(!remap.has(old)){
      v.fromArray(positions,old*3).applyMatrix4(transform);
      const p=[(v.z+basis.length/2)/basis.sx,v.x/basis.sy,v.y+basis.seaReference];
      remap.set(old,vertices.length);vertices.push(p);
      for(let k=0;k<3;k++){bounds[k]=Math.min(bounds[k],p[k]);bounds[k+3]=Math.max(bounds[k+3],p[k]);}
    }
    if((i-start)%3===0)faces.push([]);
    faces.at(-1).push(remap.get(old));
  }
  parts.push({key:String(parts.length),id,anchor,sourceIDs:meta.sourceIDs||[anchor],
    feature:meta.feature||meta.name||source.name||id,
    deck:meta.deck||source.deck||anchor.split('_')[0],category:meta.category||source.category||'',
    semanticParent:meta.semanticParent||'',groupID:meta.groupID||'',
    reference:meta.reference||'',evidence:meta.evidence||'',dimensionStatus:meta.dimensionStatus||'',
    batch:mesh.name,initiallyVisible:mesh.visible,interior:!!mesh.userData.luzInterior,
    bounds,vertices,faces});
}
for(const mesh of model.meshes){
  meshes.add(mesh);
  const original=model.indexOmissions?.originals.get(mesh)?.array||mesh.geometry.index.array;
  const omitted=new Set([...(model.indexOmissions?.owners.values()||[])].flatMap(ids=>[...ids]));
  const batch=mesh.name.replace('Luz de Mar · ',''),covered=new Uint8Array(original.length);
  const before=parts.length;
  for(const r of model.objectRanges.filter(r=>r.batch===batch)){
    if(covered.subarray(r.start,r.start+r.count).some(Boolean))throw Error('Overlapping range '+r.id);
    if(!omitted.has(r.id))extract(mesh,r.start,r.count,r.id,original);
    covered.fill(1,r.start,r.start+r.count);
  }
  for(const r of model.componentRanges.filter(r=>r.batch===batch)){
    let start=null;
    for(let i=r.start;i<=r.start+r.count;i+=3){
      if(i<r.start+r.count&&!covered[i]){if(start===null)start=i;}
      else if(start!==null){extract(mesh,start,i-start,r.id,original);covered.fill(1,start,i);start=null;}
    }
  }
  if(covered.some(n=>!n))throw Error('Unattributed submitted triangles: '+batch);
  if(parts.slice(before).reduce((n,p)=>n+p.faces.length*3,0)!==mesh.geometry.index.count)
    throw Error('Live index omission mismatch: '+batch);
}
for(const [kind,controller]of [['mtu',model.mtu],['strainers',model.strainers]]){
  if(!controller?.exteriorAsset)continue;
  const manifest=controller.exteriorAsset.meta;
  for(const side of ['port','starboard']){
    const root=controller.roots[side];
    for(const mesh of root.children.filter(p=>p.geometry)){
      meshes.add(mesh);let offset=0;
      const role=kind==='strainers'?(mesh===controller.lids[side]?'lid':'fixed'):null;
      const selected=manifest.parts.filter(p=>!role||p.role===role&&p.variant==='clean');
      for(const [i,p]of selected.entries()){
        const id=kind+'/'+side+'/'+i+'/'+p.name;
        metadata.set(id,{feature:p.name,deck:'LD',category:'Machinery',
          semanticParent:kind+'/'+side+'/'+(p.assembly||p.role),reference:manifest.evidence||manifest.dimensionStatus||'Equipment source asset; fitted installation'});
        extract(mesh,offset,p.count,id);offset+=p.count;
      }
      if(offset!==mesh.geometry.index.count)throw Error('Equipment range mismatch '+kind+'/'+role);
    }
  }
  if(controller.fitting){
    const id=kind+'/installation-fittings';metadata.set(id,{feature:id,deck:'LD',category:'Machinery',reference:'Fitted installation, not surveyed'});
    meshes.add(controller.fitting);extract(controller.fitting,0,controller.fitting.geometry.index.count,id);
  }
}
for(const mesh of model.boarding.meshes){
  meshes.add(mesh);let offset=0;
  for(const p of model.boarding.parts.filter(p=>!!p.glass===!!mesh.material.transparent)){
    extract(mesh,offset,p.indices.length,p.id);offset+=p.indices.length;
  }
  if(offset!==mesh.geometry.index.count)throw Error('Boarding range mismatch');
}
model.group.traverse(mesh=>{
  if(mesh.geometry?.index&&!meshes.has(mesh)){
    // Keep unexpected rendered geometry visible in the inventory, never drop it.
    extract(mesh,0,mesh.geometry.index.count,'unattributed/'+mesh.name);meshes.add(mesh);
  }
});
const inventory=parts.map(({vertices,faces,...p})=>({...p,triangles:faces.length,vertexCount:vertices.length}));
const sourceHash=createHash('sha256').update(await readFile(site+'/assets/RochaYachtState-P5KwIGIl.js')).digest('hex');
const generatorFiles={};
for(const file of ['assets/RochaYachtState-P5KwIGIl.js','mobile/spatial-corrections.js','mobile/stair-surfaces.js','rocha/luz-de-mar/model.json','rocha/luz-de-mar/model.bin']){
  try{generatorFiles[file]=createHash('sha256').update(await readFile(site+'/'+file)).digest('hex');}
  catch(error){if(error.code!=='ENOENT')throw error;}
}
const {createFlight}=await import(pathToFileURL(site+'/mobile/stair-surfaces.js'));
const {topTriangles}=await import(pathToFileURL(site+'/mobile/stern-access.js'));
const stern=model.transom.access.starboard;
const sternFlights=['starboard','port'].map(side=>{
  const treads=model.transom.parts.filter(p=>p.feature?.startsWith('transom '+side+' teak tread '));
  const route=side==='starboard'?stern.route:{...stern.route,id:'port-swim',path:stern.route.path.map(([x,y])=>[x,-y]),
    treadSections:stern.route.treadSections.map(section=>section.map(([x,y])=>[x,-y]))};
  const flight=createFlight(route,{...data.levels,SP:stern.lowerHeight},treads.map(p=>({id:p.id,height:p.bounds[5],polygons:topTriangles(p)})),
    {lower:stern.platformFloor,upper:stern.upperFloor});
  flight.availability=side==='port'?'Blocked while gangway is deployed':'Mobile access';
  return flight;
});
const baseline={version:'spatial-correction-1',sourceHash,basis,parts:parts.length,
  generatorFiles,
  release:JSON.parse(await readFile(site+'/mobile/bridge-access.json')).version,
  triangles:inventory.reduce((s,p)=>s+p.triangles,0),meshes:meshes.size,
  levels:data.levels,rooms:data.rooms,sources:data.sources,
  stairs:[...(walk.nav.stairFlights?.values()||[]),...sternFlights].map(f=>({id:f.id,route:f.route,surfaces:f.surfaces,availability:f.availability||'Existing full-yacht flight',
    treadCount:f.treadCount,riseCount:f.riseCount,lowerHeight:f.lowerHeight,upperHeight:f.upperHeight})),
  correctionRecords:model.spatialCorrections||model.interiorDetail?.spatialCorrections||[],
  inventory};
await mkdir(out,{recursive:true});
await writeFile(out+'/geometry.json.gz',gzipSync(JSON.stringify(parts)));
await writeFile(out+'/inventory.json',JSON.stringify(baseline));
console.log(JSON.stringify({out,parts:parts.length,triangles:baseline.triangles,meshes:meshes.size,
  unattributed:parts.filter(p=>p.id.startsWith('unattributed/')).map(p=>p.id)}));
model.dispose();
