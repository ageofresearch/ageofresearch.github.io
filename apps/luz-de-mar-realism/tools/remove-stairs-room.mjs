import fs from 'node:fs/promises';
import path from 'node:path';
import {prune,reorder} from '@gltf-transform/functions';
import {EXTMeshoptCompression} from '@gltf-transform/extensions';
import {MeshoptEncoder} from 'meshoptimizer';

// Permanent deletion in this independent viewer, including inactive fallback
// nodes. The original yacht subtree and the archived R03 assets are untouched.
export async function removeStairsRoom(io,R,baseline,output,binding){
 const source=JSON.parse(await fs.readFile(path.join(R,'work/machinery-r11/snapshot/machinery.json'))),blob=await fs.readFile(path.join(R,'work/machinery-r11/snapshot/machinery.bin'));
 const v=new Float32Array(blob.buffer,blob.byteOffset,source.vertices*11),ix=new Uint32Array(blob.buffer,blob.byteOffset+source.vertexBytes,source.triangles*3),parts=new Uint32Array(blob.buffer,blob.byteOffset+source.vertexBytes+source.indexBytes,source.triangles),removed=new Set(binding.removedSourceIDs),keys=new Set();
 const key=points=>points.map(p=>p.map(x=>Math.round(x*1e5)/1e5).join(',')).sort().join('|');
 for(let t=0;t<source.triangles;t++)if(removed.has(source.parts[parts[t]].id))keys.add(key(Array.from(ix.subarray(t*3,t*3+3),i=>Array.from(v.subarray(i*11,i*11+3)))));
 const doc=await io.read(path.join(baseline,'assets/machinery/room.glb'));let removedTriangles=0;
 for(const mesh of doc.getRoot().listMeshes())for(const p of [...mesh.listPrimitives()]){
  const pos=p.getAttribute('POSITION'),indices=p.getIndices(),array=indices.getArray(),keep=[];
  for(let i=0;i<array.length;i+=3){const tri=Array.from(array.subarray(i,i+3));if(keys.has(key(tri.map(j=>pos.getElement(j,[])))))removedTriangles++;else keep.push(...tri);}
  if(keep.length===array.length)continue;
  if(keep.length)p.setIndices(doc.createAccessor().setType('SCALAR').setArray(new Uint32Array(keep)).setBuffer(indices.getBuffer()));else mesh.removePrimitive(p);
 }
 for(const node of doc.getRoot().listNodes()){
  const extras=node.getExtras();if(extras.sourceIDs)node.setExtras({...extras,sourceIDs:JSON.stringify(JSON.parse(extras.sourceIDs).filter(id=>!removed.has(id)))});
 }
 if(!removedTriangles)throw Error('No source stairs found; refusing an empty correction');
 await doc.transform(prune({keepAttributes:true}),reorder({encoder:MeshoptEncoder,target:'size'}));
 doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});await io.write(output,doc);
 return {replacedTriangles:binding.replacedTriangles,removedTriangles};
}
