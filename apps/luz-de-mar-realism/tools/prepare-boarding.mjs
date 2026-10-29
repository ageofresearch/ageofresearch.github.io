import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS,EXTMeshoptCompression,KHRTextureBasisu} from '@gltf-transform/extensions';
import {copyToDocument,unpartition,dedup,prune,reorder,join,simplify} from '@gltf-transform/functions';
import {MeshoptEncoder,MeshoptDecoder,MeshoptSimplifier} from 'meshoptimizer';
const R=path.resolve(import.meta.dirname,'..'),W=path.join(R,'work/boarding-vr-r01'),A=path.join(R,'public/assets');
await Promise.all([MeshoptEncoder.ready,MeshoptDecoder.ready,MeshoptSimplifier.ready]);
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder,'meshopt.decoder':MeshoptDecoder});
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const doc=await io.read(path.join(W,'beach-club-source.glb'));
const originals=await Promise.all(['beach-club','cockpit'].map(id=>io.read(path.join(W,'baseline',id,'room.glb'))));
const sources=new Map();for(const d of originals)for(const m of d.getRoot().listMaterials())if(!sources.has(m.getName()))sources.set(m.getName(),[d,m]);
const report=[];
for(const m of [...doc.getRoot().listMaterials()]){
 const name=m.getName(),e=m.getExtras();
 let match=sources.get(name);
 if(!match&&name==='BVR moulded transom grey')match=sources.get('Satin transom grey | beach-club');
 if(!match&&name==='BVR timber underside')match=sources.get('Pale oiled exterior timber | beach-club');
 if(!match&&name.startsWith('BVR'))match=[...sources.values()].find(([,s])=>s.getName().includes('black trim'));
 if(!match)throw Error('No compressed source material for '+name);
 const [origin,source]=match,clone=copyToDocument(doc,origin,[source]).get(source);clone.setName(name);
 if(name.startsWith('BVR')){if(e.baseColorFactor)clone.setBaseColorFactor([...e.baseColorFactor,1]);clone.setRoughnessFactor(e.roughnessFactor??.5).setMetallicFactor(e.metallicFactor??0);}
 clone.setExtras({...clone.getExtras(),...e,textureKeys:source.getExtras().textureKeys});
 for(const mesh of doc.getRoot().listMeshes())for(const p of mesh.listPrimitives())if(p.getMaterial()===m)p.setMaterial(clone);
 report.push({name,source:source.getName(),textureBytesReused:true});m.dispose();
}
// One shared texture payload, two explicit geometry branches. The default
// exterior remains available until the candidate passes visual acceptance.
for(const n of doc.getRoot().listScenes()[0].listChildren())n.setExtras({...n.getExtras(),boardingVariant:'candidate'});
const old=originals[0],oldRoots=old.getRoot().listScenes()[0].listChildren(),copied=copyToDocument(doc,old,oldRoots);
for(const n of oldRoots){const nn=copied.get(n);nn.setExtras({...nn.getExtras(),boardingVariant:'baseline'});doc.getRoot().listScenes()[0].addChild(nn);}
for(const m of old.getRoot().listMaterials()){const mm=copied.get(m);if(mm&&mm.getExtras().lightmap==='beach-club')mm.setExtras({...mm.getExtras(),lightmap:'beach-club-baseline'});}
await doc.transform(unpartition(),dedup(),prune({keepAttributes:true}),reorder({encoder:MeshoptEncoder,target:'size'}));doc.createExtension(KHRTextureBasisu).setRequired(true);doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});
await io.write(path.join(A,'beach-club/room.glb'),doc);
const lod=await io.read(path.join(W,'beach-club-source.glb')),palette={};
for(const m of [...lod.getRoot().listMaterials()]){
 const f=m.getExtras().family,c=m.getBaseColorFactor(),key=f==='glass'?'glass':f==='metal'?'metal':['teak','wood','flooroak'].includes(f)?'wood':Math.max(...c.slice(0,3))<.2?'dark':'paint';
 palette[key]??=lod.createMaterial('Distant '+key).setBaseColorFactor({glass:[.12,.20,.24,.18],metal:[.5,.55,.58,1],wood:[.49,.35,.21,1],dark:[.035,.045,.05,1],paint:[.73,.73,.69,1]}[key]).setRoughnessFactor(key==='metal'?.25:.65).setMetallicFactor(key==='metal'?.8:0).setAlphaMode(key==='glass'?'BLEND':'OPAQUE').setDoubleSided(key==='glass');
 for(const mesh of lod.getRoot().listMeshes())for(const p of mesh.listPrimitives())if(p.getMaterial()===m)p.setMaterial(palette[key]);m.dispose();
}
for(const n of lod.getRoot().listNodes())n.setExtras({});
await lod.transform(dedup(),prune(),join({keepNamed:false}),simplify({simplifier:MeshoptSimplifier,ratio:.18,error:.002,lockBorder:true}),prune(),reorder({encoder:MeshoptEncoder,target:'size'}));lod.createExtension(EXTMeshoptCompression).setRequired(true);await io.write(path.join(A,'beach-club/context.glb'),lod);
const tris=d=>d.getRoot().listMeshes().reduce((n,m)=>n+m.listPrimitives().reduce((a,p)=>a+(p.getIndices()?.getCount()??p.getAttribute('POSITION').getCount())/3,0),0);
const meta=JSON.parse(await fs.readFile(path.join(A,'beach-club/room.json')));meta.sourceTriangles=tris(doc);meta.boardingAppearance={version:'boarding-vr-r01',status:'candidate',fixed:true,walkable:true,geometrySHA256:hash(await fs.readFile(path.join(A,'beach-club/room.glb'))),evidence:'review/boarding-vr-r01/validation.json',dimensions:'Image-estimated; not surveyed',acceptance:'Pixel registration and independent correspondence pending'};
meta.boardingProfiles={candidate:{atlases:meta.atlases,probes:meta.probes},baseline:{atlases:meta.atlases.map(a=>({...a,key:'beach-club-baseline',asset:'ambient-beach-club-baseline.exr'})),probes:meta.probes.map(p=>({...p,asset:'probe-baseline.exr'})),boardingAppearance:null}};
meta.components=JSON.parse(await fs.readFile(path.join(W,'beach-club-components.json')));meta.probeBounds.max[0]=4.1;meta.probeBounds.max[1]=3.1;meta.probeBounds.min[2]=-20;
await fs.writeFile(path.join(A,'beach-club/room.json'),JSON.stringify(meta));
const manifest=JSON.parse(await fs.readFile(path.join(A,'manifest.json')));manifest.version='boarding-vr-r01';manifest.boarding={status:'candidate',room:'beach-club',fixed:true,walkable:true};const entry=manifest.rooms.find(r=>r.id==='beach-club');entry.sha256=meta.boardingAppearance.geometrySHA256;entry.triangles=meta.sourceTriangles;await fs.writeFile(path.join(A,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
await fs.writeFile(path.join(W,'packing.json'),JSON.stringify({triangles:tris(doc),proxyTriangles:tris(lod),materials:report},null,2));
console.log('Boarding packaged',tris(doc),'triangles;',tris(lod),'proxy triangles');
