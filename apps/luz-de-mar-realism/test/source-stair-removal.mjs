// The R04 request intentionally deleted the service stair. R11 preservation
// guards must compare every retained face, rather than demand its return.
import fs from'node:fs';import path from'node:path';import assert from'node:assert/strict';
export const trianglePositionKey=points=>points.map(p=>p.join(',')).sort().join('|');
export function sourceStairRemoval(R,meta){
 if(meta.stairRemoval){const authorized=[67,68,...Array.from({length:47},(_,i)=>72+i),120,121,123,124,127,129,130,131].map(i=>'LD/service-route/'+i);assert.equal(meta.stairRemoval.version,4);assert.equal(meta.stairRemoval.removedTriangles,2042);assert.deepEqual([...meta.stairRemoval.sourceIDs].sort(),authorized.sort(),'Only the explicitly removed R04 service stair may be excluded');}
 const source=JSON.parse(fs.readFileSync(path.join(R,'work/machinery-r11/snapshot/machinery.json'))),b=fs.readFileSync(path.join(R,'work/machinery-r11/snapshot/machinery.bin')),v=new Float32Array(b.buffer,b.byteOffset,source.vertices*11),ix=new Uint32Array(b.buffer,b.byteOffset+source.vertexBytes,source.triangles*3),part=new Uint32Array(b.buffer,b.byteOffset+source.vertexBytes+source.indexBytes,source.triangles),removedIDs=new Set(meta.stairRemoval?.sourceIDs||[]),removedKeys=new Set(),retainedPositions=new Set();let removedTriangles=0;
 for(let t=0;t<source.triangles;t++){const points=Array.from(ix.subarray(t*3,t*3+3),i=>Array.from(v.subarray(i*11,i*11+3)));if(removedIDs.has(source.parts[part[t]].id)){removedKeys.add(trianglePositionKey(points));removedTriangles++;}else for(const p of points)retainedPositions.add(p.join(','));}
 return{removedKeys,retainedPositions,removedTriangles};
}
