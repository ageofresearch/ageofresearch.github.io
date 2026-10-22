import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import sharp from 'sharp';
import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS,EXTMeshoptCompression,KHRTextureBasisu} from '@gltf-transform/extensions';
import {dedup,prune,reorder} from '@gltf-transform/functions';
import {MeshoptEncoder,MeshoptDecoder} from 'meshoptimizer';
const run=promisify(execFile),root=path.resolve(import.meta.dirname,'..'),assets=path.join(root,'public/assets'),cache=path.join(root,'work/ktx-cache');await fs.mkdir(cache,{recursive:true});await MeshoptEncoder.ready;await MeshoptDecoder.ready;
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder,'meshopt.decoder':MeshoptDecoder});const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
for(const id of ['saloon']){
 const dir=path.join(assets,id);let src=path.join(dir,'room-source.glb');try{await fs.access(src);}catch{src=path.join(root,'work',id+'-source.glb');}const doc=await io.read(src);for(const m of doc.getRoot().listMaterials()){const e=m.getExtras();if(e.baseColorFactor)m.setBaseColorFactor([...e.baseColorFactor,m.getBaseColorFactor()[3]]);if(e.roughnessFactor!==undefined)m.setRoughnessFactor(e.roughnessFactor);if(e.metallicFactor!==undefined)m.setMetallicFactor(e.metallicFactor);}const textures=doc.getRoot().listTextures();
 for(const tex of textures){
  const isColor=doc.getRoot().listMaterials().some(m=>m.getBaseColorTexture()===tex||m.getEmissiveTexture()===tex);let bytes=tex.getImage();const dimensions=await sharp(bytes).metadata();if(Math.max(dimensions.width,dimensions.height)>1024&&(!isColor||tex.getName().includes('boucle')))bytes=await sharp(bytes).resize({width:1024,height:1024,fit:'inside'}).png().toBuffer();const sha=hash(bytes)+(isColor?'-srgb':'-linear'),file=path.join(cache,sha+'.png'),out=path.join(cache,sha+'.ktx2');await fs.writeFile(file,bytes);
  try{await fs.access(out);}catch{console.log('KTX2',id,tex.getName(),sha.slice(0,8));await run(process.env.BASISU||'/tmp/luz-realism-basis/bin/basisu',['-file',file,'-output_file',out,'-uastc','-uastc_level','1','-uastc_rdo_l','1.0','-mipmap',isColor?'-srgb':'-linear','-max_threads','4'],{maxBuffer:2e6});}
  tex.setImage(await fs.readFile(out)).setMimeType('image/ktx2');
 }
 doc.createExtension(KHRTextureBasisu).setRequired(true);
 await doc.transform(dedup(),prune({keepAttributes:true}),reorder({encoder:MeshoptEncoder,target:'size'}));
 // Lossless entropy compression: retain Float32 positions and UVs, no quantization transform.
 doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});
 await io.write(path.join(dir,'room.glb'),doc);if(src.includes('public'))await fs.rename(src,path.join(root,'work',id+'-source.glb'));
 const source=JSON.parse(await fs.readFile(path.join(root,'work/snapshot',id+'.json'),'utf8')),authoring=JSON.parse(await fs.readFile(path.join(dir,'authoring.json'),'utf8'));
 const sx=35.23/36,sy=7.47/7.6,b=[8.5,-2.7,3.88,18.1,2.7,6.12];
 const authoredTriangles=doc.getRoot().listMeshes().reduce((n,m)=>n+m.listPrimitives().reduce((a,p)=>a+(p.getIndices()?.getCount()||p.getAttribute('POSITION').getCount())/3,0),0);const revisedNavigation=JSON.parse(await fs.readFile(path.join(root,'work/reference/navigation.json'),'utf8'));const components=JSON.parse(await fs.readFile(path.join(dir,'reference-components.json'),'utf8'));const presentationRoom={...source.room,spawn:[source.room.spawn[0],source.room.spawn[1],source.floor+1.55],look:[source.room.look[0],source.room.look[1],source.floor+1.55]};const meta={version:3,id,label:source.label,sourceID:source.sourceID,units:source.units,sourceSHA256:source.sha256,sourceTriangles:authoredTriangles,originalSourceTriangles:source.triangles,geometryBasis:authoring.replacementBasis,room:presentationRoom,camera:{eyeHeight:1.55,verticalFov:72},floor:source.floor,navigation:revisedNavigation,door:source.door,authoringRevision:authoring.revision,probes:authoring.probes,probePosition:authoring.probePosition,probeBounds:{min:[b[1]*sy,b[2]-2.01,b[0]*sx-17.615],max:[b[4]*sy,b[5]-2.01,b[3]*sx-17.615]},lighting:{fixed:true,ambient:'Two 2048 × 2048 linear HDR EXR atlases; full half-float precision, 64 MiB combined GPU storage',runtime:'Daylight directional sun',sun:{intensity:.55},fixtureReflections:'Static visible luminaires retained in local probes; no runtime lamp switching'},components};
 await fs.writeFile(path.join(dir,'room.json'),JSON.stringify(meta));console.log('Optimized',id,(await fs.stat(path.join(dir,'room.glb'))).size);
}
const snapshot=JSON.parse(await fs.readFile(path.join(root,'work/snapshot/snapshot.json'),'utf8'));delete snapshot.mtu;delete snapshot.filters;const rooms=[];for(const id of ['saloon']){const meta=JSON.parse(await fs.readFile(path.join(assets,id,'room.json'),'utf8'));const glb=await fs.readFile(path.join(assets,id,'room.glb'));rooms.push({id,sourceID:meta.sourceID,geometry:id+'/room.glb',metadata:id+'/room.json',triangles:meta.sourceTriangles,sha256:hash(glb),ambientAtlases:['architecture','furniture'].map(a=>id+'/ambient-'+a+'.exr'),probes:meta.probes?.map(p=>id+'/'+p.asset)});}await fs.writeFile(path.join(assets,'manifest.json'),JSON.stringify({...snapshot,version:'1.0.0-preview.7',scope:'Salón principal MD_R02 only',sourceSnapshotRooms:snapshot.rooms.filter(r=>r.id==='saloon'),rooms},null,2));
await fs.mkdir(path.join(root,'public/decoders'),{recursive:true});for(const file of ['basis_transcoder.js','basis_transcoder.wasm'])await fs.copyFile(path.join(root,'node_modules/three/examples/jsm/libs/basis',file),path.join(root,'public/decoders',file));
