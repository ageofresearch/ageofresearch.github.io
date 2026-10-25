// Verify that this correction deletes only the selected source stair faces.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS} from '@gltf-transform/extensions';
import {MeshoptDecoder} from 'meshoptimizer';
const R=path.resolve(import.meta.dirname,'..'),W=path.resolve(process.env.ELECTRICAL_AUTHORING_WORK||path.join(R,'work/electrical-no-stairs-r04')),P=path.join(R,'public/assets/machinery'),read=async p=>JSON.parse(await fs.readFile(p)),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
await MeshoptDecoder.ready;
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.decoder':MeshoptDecoder}),a=await read(path.join(W,'authoring.json')),source=await read(path.join(R,'work/machinery-r11/snapshot/machinery.json')),blob=await fs.readFile(path.join(R,'work/machinery-r11/snapshot/machinery.bin'));
const v=new Float32Array(blob.buffer,blob.byteOffset,source.vertices*11),ix=new Uint32Array(blob.buffer,blob.byteOffset+source.vertexBytes,source.triangles*3),part=new Uint32Array(blob.buffer,blob.byteOffset+source.vertexBytes+source.indexBytes,source.triangles),ids=new Set(a.removedSourceIDs),keys=new Set(),key=ps=>ps.map(p=>p.map(x=>Math.round(x*1e5)/1e5).join(',')).sort().join('|');
for(let t=0;t<source.triangles;t++)if(ids.has(source.parts[part[t]].id))keys.add(key(Array.from(ix.subarray(t*3,t*3+3),i=>Array.from(v.subarray(i*11,i*11+3)))));
function aggregate(doc,selection,allAttributes=false){let count=0,sum=0n;for(const mesh of doc.getRoot().listMeshes())for(const p of mesh.listPrimitives()){
 const names=allAttributes?p.listSemantics().sort():['POSITION','NORMAL','TEXCOORD_0','TEXCOORD_1'].filter(n=>p.getAttribute(n)),pos=p.getAttribute('POSITION'),ix=p.getIndices().getArray();
 for(let i=0;i<ix.length;i+=3){const tri=Array.from(ix.subarray(i,i+3)),removed=keys.has(key(tri.map(j=>pos.getElement(j,[]))));if(selection==='keep'&&removed||selection==='removed'&&!removed)continue;
 const v=tri.map(j=>names.map(n=>p.getAttribute(n).getElement(j,[]).join(',')).join('/')),k=[v.join('|'),[v[1],v[2],v[0]].join('|'),[v[2],v[0],v[1]].join('|')].sort()[0];sum=(sum+BigInt('0x'+sha(p.getMaterial().getName()+':'+k)))%(1n<<256n);count++;
 }}return{count,sum:sum.toString(16)};}
const before=await io.read(path.join(W,'baseline/luz-de-mar-realism/assets/machinery/room.glb')),after=await io.read(path.join(P,'room.glb')),retained=aggregate(before,'keep'),actual=aggregate(after),removed=aggregate(before,'removed');
if(JSON.stringify(retained)!==JSON.stringify(actual)||!removed.count||aggregate(after,'removed').count)throw Error('Unintended room change or retained stair geometry');
if(JSON.stringify(aggregate(before,'keep',true))!==JSON.stringify(aggregate(after,undefined,true)))throw Error('An additional retained vertex attribute changed');
const hero=await io.read(path.join(P,'electrical-vr-r01/electrical.glb'));for(const mesh of hero.getRoot().listMeshes())for(const p of mesh.listPrimitives()){
 const cls=p.getAttribute('_CLEARANCE_ID');if(cls)for(let i=0;i<cls.getCount();i++)if(cls.getScalar(i)!==1)throw Error('A replacement stair part remains');
}
const guard=await read(path.join(W,'baseline-hashes.json'));for(const[n,h]of Object.entries(guard.files))if(sha(await fs.readFile(path.join(R,n)))!==h)throw Error('Protected engine or mechanical asset changed '+n);
const originals=await read(path.join(R,'work/left-engine-r13/original-629.json'));if(Object.keys(originals).length!==629)throw Error('Incomplete original guard');for(const[n,h]of Object.entries(originals))if(sha(await fs.readFile(path.resolve(R,'../../site',n)))!==h)throw Error('Original yacht changed '+n);
const oldNav=await read(path.join(R,'work/electrical-clearance-r03/navigation.json')),nav=await read(path.join(W,'navigation.json'));
if(nav.headroom.lowCells!==0||!Buffer.from(nav.headroom.eyeHeights,'base64').every(v=>v===255))throw Error('Unexpected residual under-stair crouch field');
const proof={pass:true,version:a.id,removedSourceParts:ids.size,removedRoomTriangles:removed.count,removedReplacementTriangles:1650,retainedRoomTriangles:actual.count,retainedSourceAttributesUnchanged:true,roomTriangleAggregate:actual,removedServiceStairAggregate:removed,originalYachtFilesUnchanged:Object.keys(originals).length,protectedMechanicalFilesUnchanged:Object.keys(guard.files).length,electricalTriangles:a.triangles,headroom:{beforeLowCells:oldNav.headroom.lowCells,afterLowCells:nav.headroom.lowCells},relocated:false};
await fs.writeFile(path.join(W,'removal-proof.json'),JSON.stringify(proof,null,2)+'\n');
if(process.argv.includes('--update-fixture')){const file=path.join(R,'test/fixtures/electrical-baseline.json'),fixture=await read(file);fixture.removedServiceStairAggregate=removed;await fs.writeFile(file,JSON.stringify(fixture,null,2)+'\n');}
console.log('STAIR REMOVAL VERIFIED',JSON.stringify(proof));
