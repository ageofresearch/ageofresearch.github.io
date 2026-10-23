import test from'node:test';import assert from'node:assert/strict';import fs from'node:fs';import path from'node:path';import crypto from'node:crypto';import{NodeIO}from'@gltf-transform/core';import{ALL_EXTENSIONS}from'@gltf-transform/extensions';import{MeshoptDecoder}from'meshoptimizer';
import {EXRLoader} from 'three/addons/loaders/EXRLoader.js';
const R=path.resolve(import.meta.dirname,'..'),W=path.join(R,'work/left-engine-r13'),A=path.join(R,'public/assets/mechanics/left-vr-r01'),read=p=>JSON.parse(fs.readFileSync(p)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),binding=read(path.join(A,'authoring.json')),spec=read(path.join(R,'public/assets/manifest.json')).mechanics.mtu.appearance.port;
await MeshoptDecoder.ready;const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.decoder':MeshoptDecoder});
function geometryHash(doc){const out=[];for(const mesh of doc.getRoot().listMeshes())for(const p of mesh.listPrimitives()){const attrs=['POSITION','NORMAL','TEXCOORD_0','TEXCOORD_1'].map(n=>p.getAttribute(n));assert.ok(attrs.every(Boolean));const ids=p.getIndices().getArray();for(let k=0;k<ids.length;k+=3){const v=Array.from(ids.subarray(k,k+3),i=>attrs.flatMap(a=>a.getElement(i,[])).join(','));out.push([v.join('|'),[v[1],v[2],v[0]].join('|'),[v[2],v[0],v[1]].join('|')].sort()[0]);}}return sha(out.sort().join('\n'));}
test('installed LOD exports retain physical positions, normals and both UV sets through compression',async()=>{
 for(const name of['walk','detail']){const [source,runtime]=await Promise.all([io.read(path.join(W,name+'-source.glb')),io.read(path.join(A,spec.lods[name].asset))]);assert.equal(geometryHash(source),geometryHash(runtime));const triangles=runtime.getRoot().listMeshes().reduce((n,m)=>n+m.listPrimitives().reduce((n,p)=>n+p.getIndices().getCount()/3,0),0);assert.equal(triangles,spec.lods[name].triangles);assert.ok(triangles<=(name==='walk'?220000:450000));assert.ok(runtime.getRoot().listTextures().every(t=>t.getMimeType()==='image/ktx2'));for(const node of runtime.getRoot().listNodes())assert.deepEqual(node.getMatrix(),spec.matrix);}
});
test('candidate assets bind their hashes and reject an unverified geometry or walking fit',()=>{
 assert.equal(binding.solidNormalsValidation.inwardSolids,0);assert.ok(binding.solidNormalsValidation.closedAuthoredSolids>0);assert.ok(binding.nativeShadingNormalsValidation.minimumFaceNormalDot>0);assert.ok(binding.nativeTopologyValidation.lightmapDegenerateTriangleFraction<.0001);
 for(const[name,expected]of Object.entries(spec.hashes))assert.equal(sha(fs.readFileSync(path.join(A,name))),expected);assert.equal(spec.previewQuery,'left-vr-grid-r13');assert.equal(sha(fs.readFileSync(path.join(W,'left-engine-master.blend'))),binding.masterSHA256);assert.equal(binding.gridFit.controls.length,24);assert.equal(binding.gridFit.anchorFitPassed,true);assert.ok(binding.gridDeformationValidation.minimumVertexJacobian>.015);assert.equal(binding.clearance.conflictsCount,0);assert.equal(binding.clearance.radiusMetres,.14);for(const c of binding.contours.contours){assert.ok(c.maxErrorPixels<40.96);assert.ok(c.heldOut.maxErrorPixels<40.96);}for(const p of binding.mountingInterfaces.engineBeds){assert.ok(Math.abs(p.footBaseSourceZ-1.484)<1e-5);assert.equal(p.gapMetres,0);}for(const name of['irradiance.exr','probe-0.exr','probe-1.exr'])assert.equal(fs.readFileSync(path.join(A,name)).readUInt32LE(0),20000630);
});
test('right-engine geometry and nominal MTU/filter samples retain their published bytes',()=>{
 for(const folder of['mtu-r03','sea-strainers'])for(const name of fs.readdirSync(path.join(R,'public/assets/mechanics',folder),{recursive:true})){const current=path.join(R,'public/assets/mechanics',folder,name);if(fs.statSync(current).isFile())assert.equal(sha(fs.readFileSync(current)),sha(fs.readFileSync(path.join(W,'baseline-site/assets/mechanics',folder,name))),folder+'/'+name);}
});
test('R13 records strict tile acceptance separately from legacy construction guards',()=>{
 const review=read(path.join(A,'tile-validation.json')),privateLedger=read(path.join(W,'review/tiles/inventory.json'));
 assert.equal(review.version,'left-vr-grid-r13');assert.deepEqual(review.camera,[9.15,0,3.18]);assert.equal(review.cubeSize,2048);
 assert.equal(review.privateInventorySHA256,sha(fs.readFileSync(path.join(W,'review/tiles/inventory.json'))));assert.equal(review.tileCount,privateLedger.tiles.length);
 assert.deepEqual(Object.keys(review.referenceAssets).sort(),['d','f','l']);assert.ok(privateLedger.tiles.every(t=>[32,64].includes(t.rect[2])&&t.rect[2]===t.rect[3]));
 for(const edge of review.heldOutEdges){assert.equal(edge.usedForFit,false);assert.equal(edge.passed,edge.p95Pixels<=6);}
 if(!review.accepted)assert.ok(spec.previewQuery,'An unaccepted exterior must remain opt-in');
 assert.ok(binding.probeEmitters.count>0);assert.match(binding.probeEmitters.visibility,/excluded from diffuse bake/);
 assert.ok(binding.diffuseSampling.gutterPixels>=2*binding.diffuseSampling.paddingPixels+2);
 assert.equal(binding.diffuseSampling.bakeResolution,4096);assert.equal(binding.diffuseSampling.runtimeResolution,2048);
 const bytes=fs.readFileSync(path.join(A,'irradiance.exr')),irradiance=new EXRLoader().parse(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));assert.equal(irradiance.width,2048);assert.equal(irradiance.height,2048);
});
test('partitioned room preserves every R11 face attribute and material without re-export',async()=>{
 const faceHash=doc=>{const faces=[];for(const node of doc.getRoot().listNodes()){const mesh=node.getMesh();if(!mesh)continue;for(const p of mesh.listPrimitives()){const names=p.listSemantics().sort(),attrs=names.map(n=>p.getAttribute(n)),ids=p.getIndices().getArray(),prefix=node.getMatrix().join(',')+'/'+p.getMaterial()?.getName()+'/'+names.join(',');for(let k=0;k<ids.length;k+=3){const v=Array.from(ids.subarray(k,k+3),i=>attrs.flatMap(a=>a.getElement(i,[])).join(','));faces.push(prefix+'/'+[v.join('|'),[v[1],v[2],v[0]].join('|'),[v[2],v[0],v[1]].join('|')].sort()[0]);}}}return sha(faces.sort().join('\n'));};
 const [original,current]=await Promise.all([io.read(path.join(W,'baseline/assets/machinery/room.glb')),io.read(path.join(R,'public/assets/machinery/room.glb'))]);assert.equal(faceHash(current),faceHash(original));
 const textures=d=>d.getRoot().listTextures().map(t=>sha(t.getImage())).sort();assert.deepEqual(textures(current),textures(original));
});
test('coplanar original port beds belong exclusively to the nominal fallback',async()=>{
 const legacy=read(path.join(R,'tools/left-engine-legacy-parts.json'));
 const doc=await io.read(path.join(R,'public/assets/machinery/room.glb'));
 const counts={portFallback:0,portContext:0,starboardContext:0,starboardFallback:0};
 for(const node of doc.getRoot().listNodes())for(const p of node.getMesh()?.listPrimitives()||[]){
  if(p.getMaterial()?.getName()!=='Machinery paint 44 | furniture')continue;
  const positions=p.getAttribute('POSITION'),indices=p.getIndices().getArray();
  for(let k=0;k<indices.length;k+=3){const vertices=Array.from(indices.subarray(k,k+3),i=>positions.getElement(i,[]));
   for(const side of['port','starboard'])if(legacy.webBounds.some(([lo,hi])=>vertices.every(v=>v.every((x,axis)=>{
    if(side==='starboard'&&axis===0)x=-x;return x>=lo[axis]-legacy.tolerance&&x<=hi[axis]+legacy.tolerance;
   }))))counts[side+(node.getExtras().variant==='left-r11'?'Fallback':'Context')]++;
  }
 }
 assert.deepEqual(counts,{portFallback:24,portContext:0,starboardContext:24,starboardFallback:0});
 const room=read(path.join(R,'public/assets/machinery/room.json'));
 assert.ok(room.partition.replacedIDs.includes(legacy.id));assert.ok(spec.replacedIDs.includes(legacy.id));
 assert.equal(room.partition.geometry.sha256,sha(fs.readFileSync(path.join(R,'public/assets/machinery/room.glb'))));
});
