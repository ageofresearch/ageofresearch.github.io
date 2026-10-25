import fs from 'node:fs/promises';import assert from 'node:assert/strict';import crypto from 'node:crypto';
import {NodeIO} from '@gltf-transform/core';import {ALL_EXTENSIONS} from '@gltf-transform/extensions';import {MeshoptDecoder} from 'meshoptimizer';import {Vector3,Triangle} from 'three';
const W=process.env.PEDESTAL_WORK||'/tmp/ldm-pedestal-r01',read=async n=>JSON.parse(await fs.readFile(W+'/'+n)),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
await MeshoptDecoder.ready;const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.decoder':MeshoptDecoder});
const before=await io.read(W+'/baseline/electrical.glb'),after=await io.read(W+'/electrical.glb'),patch=await read('pedestal-patch.json'),repair=await read('repair.json');
let retained=0;for(const n of before.getRoot().listNodes()){
 const next=after.getRoot().listNodes().find(x=>x.getName()===n.getName());assert(next);assert.deepEqual(next.getWorldMatrix(),n.getWorldMatrix());
 for(const [pi,p]of (n.getMesh()?.listPrimitives()||[]).entries()){
  const q=next.getMesh().listPrimitives()[pi];assert.equal(q.getMaterial().getName(),p.getMaterial().getName());
  for(const name of p.listSemantics()){const a=p.getAttribute(name),b=q.getAttribute(name);assert.equal(a.getNormalized(),b.getNormalized());assert.equal(sha(Buffer.from(a.getArray().buffer,a.getArray().byteOffset,a.getArray().byteLength)),sha(Buffer.from(b.getArray().buffer,b.getArray().byteOffset,b.getArray().byteLength)),'Retained attribute changed '+name);}
  const a=Array.from(p.getIndices().getArray()),b=Array.from(q.getIndices().getArray()),rem=new Set(n.getName()===patch.node&&p.getMaterial().getName()===patch.material?patch.removedOffsets:[]);assert.deepEqual(b,a.filter((_,i)=>!rem.has(i-i%3)));retained+=b.length/3;
 }
}
assert.equal(retained,178280-176);
assert.deepEqual(before.getRoot().listTextures().map(t=>sha(t.getImage())),after.getRoot().listTextures().map(t=>sha(t.getImage())));
const p=after.getRoot().listNodes().find(n=>n.getExtras().componentID==='EVR/vented-pedestal-union').getMesh().listPrimitives()[0],pos=p.getAttribute('POSITION'),ix=p.getIndices().getArray(),tris=[];
for(let i=0;i<ix.length;i+=3){const v=Array.from(ix.slice(i,i+3),j=>new Vector3(...pos.getElement(j,[]))),t=new Triangle(...v);assert(t.getArea()>1e-13);tris.push({v,n:t.getNormal(new Vector3())});}
const cross=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
function intersection(a,b){if(cross(...b)<0)b=[...b].reverse();let out=a;for(let i=0;i<3;i++){const input=out;out=[];for(let j=0;j<input.length;j++){const s=input[j],e=input[(j+1)%input.length],ds=cross(b[i],b[(i+1)%3],s),de=cross(b[i],b[(i+1)%3],e);if(ds>=0)out.push(s);if((ds<0)!==(de<0)){const t=ds/(ds-de);out.push([s[0]+t*(e[0]-s[0]),s[1]+t*(e[1]-s[1])]);}}}return Math.abs(out.reduce((sum,a,i)=>{const b=out[(i+1)%out.length];return sum+a[0]*b[1]-a[1]*b[0];},0)/2);}
let tested=0,maxOverlap=0;for(let i=0;i<tris.length;i++)for(let j=i+1;j<tris.length;j++){
 const a=tris[i],b=tris[j];if(Math.abs(a.n.dot(b.n))<1-1e-7||b.v.some(p=>Math.abs(a.n.dot(p.clone().sub(a.v[0])))>2e-6))continue;
 const axis=a.n.toArray().map(Math.abs).indexOf(Math.max(...a.n.toArray().map(Math.abs))),project=p=>p.toArray().filter((_,i)=>i!==axis),area=intersection(a.v.map(project),b.v.map(project));tested++;maxOverlap=Math.max(maxOverlap,area);assert(area<1e-9,'Overlapping exported pedestal faces '+i+'/'+j+': '+area);
}
// Topology check on the actual compressed float32 mesh, independent of Blender.
const unique=[],ids=[];for(const t of tris)for(const v of t.v){let i=unique.findIndex(p=>p.distanceTo(v)<2e-6);if(i<0){i=unique.length;unique.push(v);}ids.push(i);}
const edges=new Map();for(let i=0;i<ids.length;i+=3){assert.equal(new Set(ids.slice(i,i+3)).size,3);for(let k=0;k<3;k++){const a=ids[i+k],b=ids[i+(k+1)%3],key=[a,b].sort((a,b)=>a-b).join(',');edges.set(key,(edges.get(key)||0)+1);}}
assert([...edges.values()].every(n=>n===2),'The decoded union must be a closed manifold');
const proof={pass:true,sourceSHA256:repair.sourceSHA256,runtimeSHA256:repair.runtimeSHA256,unchangedTriangles:retained,unchangedAttributeBuffers:true,unchangedTexturePayloads:true,unionTriangles:tris.length,closedManifold:true,edges:edges.size,coplanarPairsTested:tested,maximumOverlapAreaM2:maxOverlap,overlapToleranceM2:1e-9,topologyWeldToleranceMetres:2e-6};
await fs.writeFile(W+'/geometry-proof.json',JSON.stringify(proof,null,2)+'\n');console.log(JSON.stringify(proof,null,2));
