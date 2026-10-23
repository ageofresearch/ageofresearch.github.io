import fs from'node:fs/promises';import path from'node:path';import crypto from'node:crypto';
import{prune,reorder}from'@gltf-transform/functions';import{EXTMeshoptCompression}from'@gltf-transform/extensions';import{MeshoptEncoder}from'meshoptimizer';
// Separate the original right installation without re-exporting or altering the
// retained yacht. All vertex attributes and texture payloads come from R11.
export async function partitionRightPublished(io,R,W,output,binding){
 const legacy=JSON.parse(await fs.readFile(path.join(R,'tools/left-engine-legacy-parts.json')));legacy.id='MTU/installation/starboard-beds';legacy.webBounds=legacy.webBounds.map(([lo,hi])=>[[-hi[0],lo[1],lo[2]],[-lo[0],hi[1],hi[2]]]);
 const isLegacyBed=(id,vertices)=>id===legacy.sourceID&&legacy.webBounds.some(([lo,hi])=>vertices.every(v=>v.every((x,k)=>x>=lo[k]-legacy.tolerance&&x<=hi[k]+legacy.tolerance)));
 const source=JSON.parse(await fs.readFile(path.join(R,'work/machinery-r11/snapshot/machinery.json'))),bytes=await fs.readFile(path.join(R,'work/machinery-r11/snapshot/machinery.bin')),v=new Float32Array(bytes.buffer,bytes.byteOffset,source.vertices*11),idx=new Uint32Array(bytes.buffer,bytes.byteOffset+source.vertexBytes,source.triangles*3),part=new Uint32Array(bytes.buffer,bytes.byteOffset+source.vertexBytes+source.indexBytes,source.triangles),removed=new Set(binding.replacedIDs),keys=new Map(),key=vertices=>vertices.map(x=>x.join(',')).sort().join('|');
 removed.add(legacy.id);let legacyTriangles=0;
 for(let t=0;t<source.triangles;t++){const vertices=Array.from(idx.subarray(t*3,t*3+3),i=>Array.from(v.subarray(i*11,i*11+3))),k=key(vertices),originalID=source.parts[part[t]].id,id=isLegacyBed(originalID,vertices)?legacy.id:originalID,old=keys.get(k);if(id===legacy.id)legacyTriangles++;if(old&&removed.has(old)!==removed.has(id))throw Error('Ambiguous component triangle '+id);keys.set(k,id);}
 if(legacyTriangles!==legacy.triangles)throw Error('The original starboard bed geometry changed; review the replacement bounds');
 const doc=await io.read(path.join(W,'baseline-site/assets/machinery/room.glb'));let replacedTriangles=0;
 for(const node of [...doc.getRoot().listNodes()]){const mesh=node.getMesh();if(!mesh||node.getExtras().variant==='left-r11')continue;const fallbackMesh=doc.createMesh('R11 fallback | right installation'),componentIDs=new Set();
  for(const p of [...mesh.listPrimitives()]){const pos=p.getAttribute('POSITION'),indices=p.getIndices().getArray(),keep=[],drop=[];
   for(let j=0;j<indices.length;j+=3){const tri=Array.from(indices.subarray(j,j+3)),id=keys.get(key(tri.map(i=>pos.getElement(i,[]))));if(!id)throw Error('Unmatched original triangle');(removed.has(id)?drop:keep).push(...tri);if(removed.has(id))componentIDs.add(id);}
   if(!drop.length)continue;replacedTriangles+=drop.length/3;const copy=p.clone(),accessor=p.getIndices();copy.setIndices(doc.createAccessor().setType('SCALAR').setArray(new Uint32Array(drop)).setBuffer(accessor.getBuffer()));fallbackMesh.addPrimitive(copy);
   if(keep.length)p.setIndices(doc.createAccessor().setType('SCALAR').setArray(new Uint32Array(keep)).setBuffer(accessor.getBuffer()));else mesh.removePrimitive(p);
  }
  if(fallbackMesh.listPrimitives().length){const fallback=doc.createNode('R11 fallback | right installation').setMesh(fallbackMesh).setMatrix(node.getMatrix()).setExtras({...node.getExtras(),variant:'right-r11',sourceIDs:JSON.stringify([...componentIDs])});for(const scene of doc.getRoot().listScenes())if(scene.listChildren().includes(node))scene.addChild(fallback);const old=node.getExtras();node.setExtras({...old,variant:'context',sourceIDs:JSON.stringify(JSON.parse(old.sourceIDs).filter(id=>!removed.has(id)))});}
  else fallbackMesh.dispose();
 }
 await doc.transform(prune({keepAttributes:true}),reorder({encoder:MeshoptEncoder,target:'size'}));doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});await io.write(output,doc);const result=await fs.readFile(output);return{asset:path.basename(output),sha256:crypto.createHash('sha256').update(result).digest('hex'),bytes:result.length,triangles:source.triangles,replacedTriangles,legacyBeds:{id:legacy.id,triangles:legacyTriangles,webBounds:legacy.webBounds}};
}
