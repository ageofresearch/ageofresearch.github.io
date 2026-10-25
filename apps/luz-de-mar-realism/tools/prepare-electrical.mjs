import{partitionElectrical}from'./partition-electrical.mjs';
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

const R=path.resolve(import.meta.dirname,'..'),W=path.resolve(process.env.ELECTRICAL_AUTHORING_WORK||path.join(R,'work/electrical-vr-r01')),A=path.join(R,'public/assets'),out=path.resolve(process.env.ELECTRICAL_OUTPUT_DIR||path.join(A,'machinery/electrical-vr-r01')),baseline=path.join(W,'baseline/luz-de-mar-realism'),run=promisify(execFile),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),read=async p=>JSON.parse(await fs.readFile(p));
await Promise.all([MeshoptEncoder.ready,MeshoptDecoder.ready]);
const binding=await read(path.join(W,'authoring.json')),lighting=await read(path.join(W,'lighting.json'));
if(binding.version>=2){for(const [name,item]of Object.entries(lighting.engineUVBindings||{}))item.originalGeometryUnchanged=['port','starboard'].includes(name);await fs.writeFile(path.join(W,'lighting.json'),JSON.stringify(lighting,null,2)+'\n');}
const geometryOnly=process.argv.includes('--geometry-only');
if(!geometryOnly&&binding.microUVRepair?.electricalAtlasRequiresRebake&&!binding.microUVRepair?.electricalAtlasRebaked)throw Error('Rebake the corrected electrical UV destination before activation');
if(!geometryOnly&&(!binding.masterSHA256||!lighting.probes))throw Error('Finish all Cycles lighting before preparing the candidate');
if(binding.uv.coverage<.4||binding.uv.degenerateTriangleFraction>=.0001)throw Error('Invalid bulkhead lightmap UVs');
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder,'meshopt.decoder':MeshoptDecoder});
const sourceBytes=await fs.readFile(path.join(W,'electrical-source.glb'));if(!geometryOnly&&sha(sourceBytes)!==binding.sourceGeometrySHA256)throw Error('The authored geometry changed after baking');
const doc=await io.readBinary(sourceBytes),cache=path.join(R,'work/ktx-cache');await fs.mkdir(cache,{recursive:true});
for(const p of doc.getRoot().listMeshes().flatMap(m=>m.listPrimitives()))if(!p.getAttribute('TEXCOORD_1'))throw Error('Exported surface lost its independent lightmap UV1');
for(const p of doc.getRoot().listMeshes().flatMap(m=>m.listPrimitives())){const uv=p.getAttribute('TEXCOORD_1'),mode=p.getAttribute('_BAKE_MODE');if(!mode||!p.getAttribute('_IRRADIANCE'))throw Error('Missing baked corner lighting');for(let i=0;i<mode.getCount();i++)if(mode.getScalar(i)===1&&uv.getElement(i,[]).some((v,c)=>v!==(c===0?0:1)))throw Error('Unused micro UVs can overwrite the atlas bake');}
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
 m.setExtras({...m.getExtras(),electricalMaterial:!m.getExtras().appearanceDoor,lightmap:m.getExtras().appearanceDoor?'none':'electrical'});if(m.getName().endsWith('| glass'))m.setAlphaMode('BLEND').setDoubleSided(true);
}
// Tiny but valid UV1 triangles on pressed edges can collapse under16-bit UV
// quantization. Keep the baked UV1 in float32; geometry remains meshopt-packed.
doc.createExtension(KHRTextureBasisu).setRequired(true);await doc.transform(dedup({propertyTypes:[PropertyType.ACCESSOR,PropertyType.TEXTURE]}),prune({keepAttributes:true}),quantize({pattern:binding.version>=2?/^(POSITION|NORMAL)$/:/^(POSITION|NORMAL|TEXCOORD_1)$/,quantizePosition:16,quantizeNormal:16,quantizeTexcoord:16}),reorder({encoder:MeshoptEncoder,target:'size'}));
doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});await io.write(path.join(out,'electrical.glb'),doc);
const triangles=doc.getRoot().listMeshes().reduce((n,m)=>n+m.listPrimitives().reduce((n,p)=>n+p.getIndices().getCount()/3,0),0);if(triangles>120000)throw Error('Bulkhead triangle budget exceeded');
if(geometryOnly){console.log('Geometry/material preparation only; no manifest or lighting activation',triangles,sha(sourceBytes));process.exit(0);}

const{replacedTriangles}=await partitionElectrical(io,R,baseline,path.join(A,'machinery/room.glb'),binding);

const meta=await read(path.join(baseline,'assets/machinery/room.json')),navigation=await read(path.join(W,'navigation.json')),probes=lighting.probes.room;
const engineLighting=Object.fromEntries(['port','starboard'].map(side=>[side,{irradiance:side+'-irradiance.exr',probes}]));
const previousGeometry='../bulkhead-vr-r01/bulkhead.glb',runtimeFiles=['electrical.glb',previousGeometry,'electrical-irradiance.exr','bulkhead-irradiance.exr','port-irradiance.exr','starboard-irradiance.exr',...probes.map(p=>p.asset)],hashes={};
for(const name of runtimeFiles){const b=await fs.readFile(path.join(out,name));hashes[name]=sha(b);if(name.endsWith('.exr')){const image=new EXRLoader().setDataType(FloatType).parse(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));if(image.data.some(v=>!Number.isFinite(v)))throw Error('Invalid electrical HDR buffer '+name);}}
meta.electricalAppearance={version:binding.version>=3?3:2,id:binding.id||'electrical-vr-r01',label:'frente eléctrico',promoted:false,requires:'bulkhead-vr-r01',previewCamera:{position:[9.15,0,3.18],target:[7.8,-.12,2.8]},base:'./assets/machinery/electrical-vr-r01/',geometries:[{asset:'electrical.glb'},{asset:previousGeometry}],irradiances:{electrical:'electrical-irradiance.exr',bulkhead:'bulkhead-irradiance.exr'},probes,engineLighting,navigation,hashes,triangles,combinedTriangles:triangles+meta.bulkheadAppearance.triangles,matrix:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],fallbackVariants:['bulkhead-r11','electrical-r11'],fallbackComponents:binding.version>=2?['VR_ER/ochre-grid']:[],fallbackDynamic:binding.version>=2?['door']:[],replacedIDs:binding.replacedIDs,lightingNote:'One atomic combined profile: two static assemblies, four irradiance atlases and three shared local probes. Original engine geometry/materials and their UVs retained.'};
meta.electricalPartition={version:1,replacedTriangles,sourceAttributesRetained:true};
const partitionedHash=sha(await fs.readFile(path.join(A,'machinery/room.glb')));for(const name of['partition','rightPartition'])if(meta[name]?.geometry){meta[name].geometry.previousSHA256??=meta[name].geometry.sha256;meta[name].geometry.sha256=partitionedHash;meta[name].geometry.subsequentPartitions=['bulkhead-vr-r01','electrical-vr-r01'];}
await fs.writeFile(path.join(A,'machinery/room.json'),JSON.stringify(meta));
const manifest=await read(path.join(baseline,'assets/manifest.json'));manifest.version=binding.version>=3?'3.4.2-electrical-clearance-r03':binding.version>=2?'3.4.1-electrical-lower-r02':'3.4.0-electrical-vr-r01';manifest.rooms.find(r=>r.id==='machinery').sha256=partitionedHash;await fs.writeFile(path.join(A,'manifest.json'),JSON.stringify(manifest));
binding.runtimeGeometrySHA256=hashes['electrical.glb'];binding.replacedTriangles=replacedTriangles;binding.lighting=lighting;binding.sourceTextures??={};
await fs.writeFile(path.join(W,'authoring.json'),JSON.stringify(binding,null,2)+'\n');for(const name of['authoring.json','component-inventory.json',...(binding.version<3?['neutral-review.json']:[]),...(binding.version>=2?['input-authoring.json']:[]),...(binding.version===2?['lower-evidence.json']:[]),...(binding.version>=3?['clearance-evidence.json','casings.json']:[])]){const target=path.join(out,name),temporary=target+'.tmp';await fs.writeFile(temporary,await fs.readFile(path.join(W,name)));await fs.rename(temporary,target);}
if(binding.version>=3){await fs.copyFile(path.join(W,'evidence-frozen.json'),path.join(out,'evidence.json'));for(const n of['neutral-review.json','lower-evidence.json'])await fs.rm(path.join(out,n),{force:true});}
console.log('ELECTRICAL PREPARED',JSON.stringify({triangles,replacedTriangles,hashes,navigation:navigation.changes}));
