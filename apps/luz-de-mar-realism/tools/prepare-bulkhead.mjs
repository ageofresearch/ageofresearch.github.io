import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {NodeIO,PropertyType} from '@gltf-transform/core';
import {ALL_EXTENSIONS,EXTMeshoptCompression,KHRTextureBasisu} from '@gltf-transform/extensions';
import {dedup,prune,reorder,quantize} from '@gltf-transform/functions';
import {MeshoptEncoder,MeshoptDecoder} from 'meshoptimizer';
import {EXRLoader} from 'three/addons/loaders/EXRLoader.js';
import {FloatType} from 'three';
import sharp from 'sharp';

const R=path.resolve(import.meta.dirname,'..'),W=path.join(R,'work/bulkhead-vr-r01'),A=path.join(R,'public/assets'),out=path.join(A,'machinery/bulkhead-vr-r01'),baseline=path.join(W,'baseline/site/luz-de-mar-realism'),run=promisify(execFile),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),read=async p=>JSON.parse(await fs.readFile(p));
await Promise.all([MeshoptEncoder.ready,MeshoptDecoder.ready]);
const binding=await read(path.join(W,'authoring.json')),lighting=await read(path.join(W,'lighting.json'));
const geometryOnly=process.argv.includes('--geometry-only');
if(!geometryOnly&&(!binding.masterSHA256||!lighting.probes))throw Error('Finish all Cycles lighting before preparing the candidate');
if(binding.uv.coverage<.4||binding.uv.degenerateTriangleFraction>=.0001)throw Error('Invalid bulkhead lightmap UVs');
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder,'meshopt.decoder':MeshoptDecoder});
const sourceBytes=await fs.readFile(path.join(W,'bulkhead-source.glb'));if(!geometryOnly&&sha(sourceBytes)!==binding.sourceGeometrySHA256)throw Error('The authored geometry changed after baking');
const doc=await io.readBinary(sourceBytes),cache=path.join(R,'work/ktx-cache');await fs.mkdir(cache,{recursive:true});
for(const p of doc.getRoot().listMeshes().flatMap(m=>m.listPrimitives()))if(!p.getAttribute('TEXCOORD_1'))throw Error('Exported surface lost its independent lightmap UV1');
for(const t of doc.getRoot().listTextures()){
 // Caption/LCD microvariation needs fewer texels. Their borders, readable text
 // and controls are geometry; architectural/equipment maps and HDR stay intact.
 if(/^(label|screen)-(color|orm)$/.test(t.getName()))t.setImage(await sharp(t.getImage()).resize(256,256).png().toBuffer());
 const color=doc.getRoot().listMaterials().some(m=>m.getBaseColorTexture()===t||m.getEmissiveTexture()===t),key=sha(t.getImage())+(color?'-srgb':'-linear'),input=path.join(cache,key+'.png'),output=path.join(cache,key+'.ktx2');
 await fs.writeFile(input,t.getImage());try{await fs.access(output);}catch{await run('/tmp/luz-realism-basis/bin/basisu',['-file',input,'-output_file',output,'-uastc','-uastc_level','2','-uastc_rdo_l','0.4','-mipmap',color?'-srgb':'-linear','-max_threads','4'],{maxBuffer:2e6});}
 t.setImage(await fs.readFile(output)).setMimeType('image/ktx2');
}
for(const m of doc.getRoot().listMaterials()){
 if(!m.getBaseColorTexture()||!m.getMetallicRoughnessTexture()||!m.getNormalTexture())throw Error('Missing owned material maps '+m.getName());
 if(m.getRoughnessFactor()!==1||m.getMetallicFactor()!==1)throw Error('A scalar is unexpectedly multiplying the authored ORM maps');
 m.setExtras({...m.getExtras(),bulkheadMaterial:true,lightmap:'bulkhead'});
}
doc.createExtension(KHRTextureBasisu).setRequired(true);await doc.transform(dedup({propertyTypes:[PropertyType.ACCESSOR,PropertyType.TEXTURE]}),prune({keepAttributes:true}),quantize({pattern:/^(POSITION|NORMAL|TEXCOORD_1)$/,quantizePosition:16,quantizeNormal:16,quantizeTexcoord:16}),reorder({encoder:MeshoptEncoder,target:'size'}));
doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});await io.write(path.join(out,'bulkhead.glb'),doc);
const triangles=doc.getRoot().listMeshes().reduce((n,m)=>n+m.listPrimitives().reduce((n,p)=>n+p.getIndices().getCount()/3,0),0);if(triangles>120000)throw Error('Bulkhead triangle budget exceeded');
if(geometryOnly){console.log('Geometry/material preparation only; no manifest or lighting activation',triangles,sha(sourceBytes));process.exit(0);}

// Partition the current published room. Every retained triangle keeps its
// original position, normals, UVs, material and texture bytes.
const source=await read(path.join(R,'work/machinery-r11/snapshot/machinery.json')),blob=await fs.readFile(path.join(R,'work/machinery-r11/snapshot/machinery.bin')),v=new Float32Array(blob.buffer,blob.byteOffset,source.vertices*11),idx=new Uint32Array(blob.buffer,blob.byteOffset+source.vertexBytes,source.triangles*3),part=new Uint32Array(blob.buffer,blob.byteOffset+source.vertexBytes+source.indexBytes,source.triangles),removed=new Set(binding.replacedIDs),keys=new Map(),key=vertices=>vertices.map(p=>p.map(x=>Math.round(x*1e5)/1e5).join(',')).sort().join('|');
for(let t=0;t<source.triangles;t++){
 const points=Array.from(idx.subarray(t*3,t*3+3),i=>Array.from(v.subarray(i*11,i*11+3))),k=key(points),id=source.parts[part[t]].id,old=keys.get(k);
 if(old&&removed.has(old)!==removed.has(id))throw Error('Ambiguous bulkhead source triangle '+id);keys.set(k,id);
}
const roomDoc=await io.read(path.join(baseline,'assets/machinery/room.glb'));let replacedTriangles=0;
for(const node of [...roomDoc.getRoot().listNodes()]){
 const mesh=node.getMesh();if(!mesh)continue;const fallback=roomDoc.createMesh('Original bulkhead fallback'),ids=new Set();
 for(const p of [...mesh.listPrimitives()]){
  const position=p.getAttribute('POSITION'),indices=p.getIndices().getArray(),keep=[],drop=[];
  for(let i=0;i<indices.length;i+=3){const tri=Array.from(indices.subarray(i,i+3)),id=keys.get(key(tri.map(j=>position.getElement(j,[]))));if(!id)throw Error('Unmatched retained source triangle');(removed.has(id)?drop:keep).push(...tri);if(removed.has(id))ids.add(id);}
  if(!drop.length)continue;replacedTriangles+=drop.length/3;const old=p.getIndices(),copy=p.clone();copy.setIndices(roomDoc.createAccessor().setType('SCALAR').setArray(new Uint32Array(drop)).setBuffer(old.getBuffer()));fallback.addPrimitive(copy);
  if(keep.length)p.setIndices(roomDoc.createAccessor().setType('SCALAR').setArray(new Uint32Array(keep)).setBuffer(old.getBuffer()));else mesh.removePrimitive(p);
 }
 if(fallback.listPrimitives().length){const extras=node.getExtras();if(extras.sourceIDs)node.setExtras({...extras,sourceIDs:JSON.stringify(JSON.parse(extras.sourceIDs).filter(id=>!ids.has(id)))});const next=roomDoc.createNode('Original bulkhead fallback').setMesh(fallback).setMatrix(node.getMatrix()).setExtras({...extras,variant:'bulkhead-r11',sourceIDs:JSON.stringify([...ids])});for(const scene of roomDoc.getRoot().listScenes())if(scene.listChildren().includes(node))scene.addChild(next);}else fallback.dispose();
}
await roomDoc.transform(prune({keepAttributes:true}),reorder({encoder:MeshoptEncoder,target:'size'}));roomDoc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});await io.write(path.join(A,'machinery/room.glb'),roomDoc);

const meta=await read(path.join(baseline,'assets/machinery/room.json')),rects=await read(path.join(W,'collision-rects.json')),g=meta.navigation;
function mask(base){const bits=Buffer.from(base,'base64');for(let iy=0;iy<g.ny;iy++)for(let ix=0;ix<g.nx;ix++){
 const k=iy*g.nx+ix;if(!(bits[k>>3]&(1<<(k&7))))continue;const x=g.x0+ix*g.step,y=g.y0+iy*g.step;
 if(rects.some(r=>x>r[0]-.14&&x<r[2]+.14&&y>r[1]-.14&&y<r[3]+.14))bits[k>>3]&=~(1<<(k&7));
}return bits.toString('base64');}
const navigation={mask:mask(g.mask),openMask:mask(meta.openDoorNavigation?.mask||g.mask),radius:.14,step:g.step};
// One renderer-wide set of three updated probes is shared by the room and both
// engines. Avoid seven simultaneous PMREM targets, which exceed the GPU budget.
const probes=lighting.probes.room;
const engineLighting=Object.fromEntries(['port','starboard'].map(side=>[side,{irradiance:side+'-irradiance.exr',probes}]));
const runtimeFiles=['bulkhead.glb','bulkhead-irradiance.exr','port-irradiance.exr','starboard-irradiance.exr',...probes.map(p=>p.asset)],hashes={};
for(const name of runtimeFiles){const b=await fs.readFile(path.join(out,name));hashes[name]=sha(b);if(name.endsWith('.exr')){const image=new EXRLoader().setDataType(FloatType).parse(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));if(image.data.some(v=>!Number.isFinite(v)))throw Error('Invalid HDR buffer '+name);}}
// Dedicated engine probes remain in authoring, rather than redundant Pages assets.
for(const side of ['port','starboard'])for(const p of lighting.probes[side]||[]){await fs.copyFile(path.join(out,p.asset),path.join(W,p.asset));await fs.unlink(path.join(out,p.asset));}
meta.bulkheadAppearance={version:1,promoted:false,base:'./assets/machinery/bulkhead-vr-r01/',geometry:'bulkhead.glb',irradiance:'bulkhead-irradiance.exr',probes,engineLighting,navigation,hashes,triangles,matrix:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],replacedIDs:binding.replacedIDs,lightingNote:'Three shared updated local probes; installed exteriors use new transport on their original UVs. Static probe limitation during nominal cutaway remains.'};
meta.bulkheadPartition={version:1,replacedTriangles,sourceAttributesRetained:true};await fs.writeFile(path.join(A,'machinery/room.json'),JSON.stringify(meta));
const partitionedHash=sha(await fs.readFile(path.join(A,'machinery/room.glb')));for(const key of['partition','rightPartition'])if(meta[key]?.geometry){meta[key].geometry.previousSHA256??=meta[key].geometry.sha256;meta[key].geometry.sha256=partitionedHash;meta[key].geometry.subsequentPartitions=['bulkhead-vr-r01'];}await fs.writeFile(path.join(A,'machinery/room.json'),JSON.stringify(meta));
const manifest=await read(path.join(baseline,'assets/manifest.json'));manifest.version='3.3.0-bulkhead-vr-r01';manifest.rooms.find(r=>r.id==='machinery').sha256=sha(await fs.readFile(path.join(A,'machinery/room.glb')));await fs.writeFile(path.join(A,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
await fs.copyFile(path.join(W,'component-inventory.json'),path.join(out,'component-inventory.json'));
const sourceTextures={};for(const name of await fs.readdir(path.join(W,'textures')))if(name.endsWith('.png'))sourceTextures[name]=sha(await fs.readFile(path.join(W,'textures',name)));
await fs.writeFile(path.join(out,'authoring.json'),JSON.stringify({...binding,sourceTextures,runtime:{triangles,replacedTriangles,hashes,sharedProbeCount:3,strictVisualAcceptance:false,quantization:{positionBits:16,normalBits:16,lightmapUVBits:16,physicalUV0Unchanged:true},captionAndScreenMicrovariationSize:256}},null,2)+'\n');
console.log('PREPARED BULKHEAD',triangles,'triangles; replaced',replacedTriangles,'; shared probes',probes.length);
