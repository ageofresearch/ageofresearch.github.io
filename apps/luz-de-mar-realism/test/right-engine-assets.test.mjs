import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS} from '@gltf-transform/extensions';
import {MeshoptDecoder} from 'meshoptimizer';
import {EXRLoader} from 'three/addons/loaders/EXRLoader.js';
import {FloatType} from 'three';
const R=path.resolve(import.meta.dirname,'..'),W=path.join(R,'work/right-engine-r01'),A=path.join(R,'public/assets'),folder=path.join(A,'mechanics/right-vr-r01'),read=p=>JSON.parse(fs.readFileSync(p)),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const manifest=read(path.join(A,'manifest.json')),spec=manifest.mechanics.mtu.appearance.starboard;
await MeshoptDecoder.ready;
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.decoder':MeshoptDecoder});
function faces(doc){const values=[];for(const mesh of doc.getRoot().listMeshes())for(const p of mesh.listPrimitives()){const attrs=['POSITION','NORMAL','TEXCOORD_0','TEXCOORD_1'].map(n=>p.getAttribute(n));assert.ok(attrs.every(Boolean));const ids=p.getIndices().getArray();for(let k=0;k<ids.length;k+=3){const v=Array.from(ids.subarray(k,k+3),i=>attrs.flatMap(a=>a.getElement(i,[])).join(','));values.push([v.join('|'),[v[1],v[2],v[0]].join('|'),[v[2],v[0],v[1]].join('|')].sort()[0]);}}return sha(values.sort().join('\n'));}
test('right exterior preserves its bound Blender geometry and stays within both LOD budgets',async()=>{
 assert.equal(spec.side,'starboard');assert.equal(spec.previewQuery,'right-vr-r01');assert.equal(spec.fallbackVariant,'right-r11');assert.equal(spec.contextReflections,false);
 const binding=read(path.join(folder,'authoring.json'));assert.ok(binding.uv.degenerateTriangleFraction<.0001);assert.ok(binding.nativeShadingNormalsValidation.minimumFaceNormalDot>0);assert.deepEqual(binding.couplingSource,[9.72,-1.2,1.94]);assert.deepEqual(binding.lightmapUVBinding.layers,['UV0','UV1']);assert.equal(binding.lightmapUVBinding.authoringLayer,'UV1');assert.equal(binding.lightmapUVBinding.runtimeTexcoord,1);
 const reference=fs.readFileSync(path.join(W,'baked-uv-binding.f32'));assert.equal(sha(reference),binding.lightmapUVBinding.positionUVReferenceSHA256);const floats=new Float32Array(reference.buffer,reference.byteOffset,reference.length/4),uvByPosition=new Map();for(let i=0;i<floats.length;i+=5){const key=[...floats.subarray(i,i+3)].map(n=>n.toFixed(5)).join(',');if(!uvByPosition.has(key))uvByPosition.set(key,[]);uvByPosition.get(key).push([...floats.subarray(i+3,i+5)]);}
 assert.equal(sha(fs.readFileSync(path.join(W,'right-engine-master.blend'))),binding.masterSHA256);
 for(const name of ['walk','detail']){const [source,runtime]=await Promise.all([io.read(path.join(W,name+'-source.glb')),io.read(path.join(folder,spec.lods[name].asset))]);assert.equal(faces(source),faces(runtime));if(name==='detail')for(const mesh of runtime.getRoot().listMeshes())for(const primitive of mesh.listPrimitives()){const pos=primitive.getAttribute('POSITION'),uv=primitive.getAttribute('TEXCOORD_1');for(let i=0;i<pos.getCount();i++){const key=pos.getElement(i,[]).map(n=>n.toFixed(5)).join(','),actual=uv.getElement(i,[]);assert.ok(uvByPosition.get(key)?.some(expected=>Math.abs(expected[0]-actual[0])<2e-7&&Math.abs(expected[1]-actual[1])<2e-7),'Runtime UV1 must address the UV map actually baked at this surface position');}}assert.ok(runtime.getRoot().listTextures().every(t=>t.getMimeType()==='image/ktx2'));for(const node of runtime.getRoot().listNodes())assert.deepEqual(node.getMatrix(),spec.matrix);assert.ok(spec.lods[name].triangles<=(name==='walk'?220000:450000));}
 for(const [name,expected] of Object.entries(spec.hashes))assert.equal(sha(fs.readFileSync(path.join(folder,name))),expected,name);
 for(const [name,width,height] of [['irradiance.exr',2048,2048],['probe-0.exr',1024,512],['probe-1.exr',1024,512]]){const b=fs.readFileSync(path.join(folder,name)),im=new EXRLoader().setDataType(FloatType).parse(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));assert.equal(im.width,width);assert.equal(im.height,height);assert.ok(im.data.every(Number.isFinite));}
});
test('right integration retains every left exterior, nominal mechanism and filter byte',()=>{
 for(const sub of ['left-vr-r01','mtu-r03','sea-strainers'])for(const name of fs.readdirSync(path.join(A,'mechanics',sub),{recursive:true})){const p=path.join(A,'mechanics',sub,name);if(fs.statSync(p).isFile())assert.equal(sha(fs.readFileSync(p)),sha(fs.readFileSync(path.join(W,'baseline-site/assets/mechanics',sub,name))),sub+'/'+name);}
 const before=read(path.join(W,'baseline-site/assets/manifest.json')).mechanics.mtu.appearance.port,{previewAliases,...left}=manifest.mechanics.mtu.appearance.port;assert.deepEqual(left,before);assert.ok(previewAliases.includes('right-vr-r01'));
 const room=read(path.join(A,'machinery/room.json'));assert.equal(room.rightPartition.geometry.legacyBeds.triangles,24);assert.equal(room.rightPartition.geometry.replacedTriangles,5580);assert.equal(room.rightPartition.geometry.sha256,sha(fs.readFileSync(path.join(A,'machinery/room.glb'))));
});
