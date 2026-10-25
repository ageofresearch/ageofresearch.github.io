import fs from'node:fs/promises';import path from'node:path';import{prune,reorder}from'@gltf-transform/functions';import{EXTMeshoptCompression}from'@gltf-transform/extensions';import{MeshoptEncoder}from'meshoptimizer';
const read=async p=>JSON.parse(await fs.readFile(p));
export async function partitionElectrical(io,R,baseline,output,binding){
// Partition the current published room. Every retained triangle keeps its
// original position, normals, UVs, material and texture bytes.
const source=await read(path.join(R,'work/machinery-r11/snapshot/machinery.json')),blob=await fs.readFile(path.join(R,'work/machinery-r11/snapshot/machinery.bin')),v=new Float32Array(blob.buffer,blob.byteOffset,source.vertices*11),idx=new Uint32Array(blob.buffer,blob.byteOffset+source.vertexBytes,source.triangles*3),part=new Uint32Array(blob.buffer,blob.byteOffset+source.vertexBytes+source.indexBytes,source.triangles),removed=new Set(binding.replacedIDs),keys=new Map(),key=vertices=>vertices.map(p=>p.map(x=>Math.round(x*1e5)/1e5).join(',')).sort().join('|');
for(let t=0;t<source.triangles;t++){
 const points=Array.from(idx.subarray(t*3,t*3+3),i=>Array.from(v.subarray(i*11,i*11+3))),k=key(points),id=source.parts[part[t]].id,old=keys.get(k);
 if(old&&removed.has(old)!==removed.has(id))throw Error('Ambiguous bulkhead source triangle '+id);keys.set(k,id);
}
const roomDoc=await io.read(path.join(baseline,'assets/machinery/room.glb'));let replacedTriangles=0;
for(const node of [...roomDoc.getRoot().listNodes()]){
 const mesh=node.getMesh();if(!mesh)continue;const fallback=roomDoc.createMesh('Original electrical fallback'),ids=new Set();
 for(const p of [...mesh.listPrimitives()]){
  const position=p.getAttribute('POSITION'),indices=p.getIndices().getArray(),keep=[],drop=[];
  for(let i=0;i<indices.length;i+=3){const tri=Array.from(indices.subarray(i,i+3)),id=keys.get(key(tri.map(j=>position.getElement(j,[]))));if(!id)throw Error('Unmatched retained source triangle');(removed.has(id)?drop:keep).push(...tri);if(removed.has(id))ids.add(id);}
  if(!drop.length)continue;replacedTriangles+=drop.length/3;const old=p.getIndices(),copy=p.clone();copy.setIndices(roomDoc.createAccessor().setType('SCALAR').setArray(new Uint32Array(drop)).setBuffer(old.getBuffer()));fallback.addPrimitive(copy);
  if(keep.length)p.setIndices(roomDoc.createAccessor().setType('SCALAR').setArray(new Uint32Array(keep)).setBuffer(old.getBuffer()));else mesh.removePrimitive(p);
 }
 if(fallback.listPrimitives().length){const extras=node.getExtras();if(extras.sourceIDs)node.setExtras({...extras,sourceIDs:JSON.stringify(JSON.parse(extras.sourceIDs).filter(id=>!ids.has(id)))});const next=roomDoc.createNode('Original electrical fallback').setMesh(fallback).setMatrix(node.getMatrix()).setExtras({...extras,variant:'electrical-r11',sourceIDs:JSON.stringify([...ids])});for(const scene of roomDoc.getRoot().listScenes())if(scene.listChildren().includes(node))scene.addChild(next);}else fallback.dispose();
}
await roomDoc.transform(prune({keepAttributes:true}),reorder({encoder:MeshoptEncoder,target:'size'}));roomDoc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});await io.write(output,roomDoc);

return{replacedTriangles};
}
