// Exact convex boundary union of the four existing pedestal parts. Attributes
// are transferred from the production triangles; all unrelated indices survive.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {NodeIO,Accessor} from '@gltf-transform/core';
import {ALL_EXTENSIONS,EXTMeshoptCompression} from '@gltf-transform/extensions';
import {MeshoptDecoder,MeshoptEncoder} from 'meshoptimizer';
import {Vector3,Matrix4,Matrix3,Triangle,FloatType} from 'three';
import {EXRLoader} from 'three/addons/loaders/EXRLoader.js';
const W=process.env.PEDESTAL_WORK||'/tmp/ldm-pedestal-r01';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
await Promise.all([MeshoptDecoder.ready,MeshoptEncoder.ready]);
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.decoder':MeshoptDecoder,'meshopt.encoder':MeshoptEncoder});
const input=await fs.readFile(path.join(W,'baseline/electrical.glb')),doc=await io.readBinary(input);
const parts=JSON.parse(await fs.readFile(path.join(W,'source-parts.json'))).sort((a,b)=>Number(b.name.endsWith('upper plate'))-Number(a.name.endsWith('upper plate')));
const v=p=>new Vector3(...p),eps=1e-6;
const source=[];
for(const [part,item]of parts.entries()){
 item.points=item.positions.map(p=>new Vector3(p[0],p[2],-p[1]));item.planes=[];
 for(const ix of item.triangles){const q=ix.map(i=>item.points[i]),t=new Triangle(...q),n=t.getNormal(new Vector3()),c=n.dot(q[0]);
  if(!item.planes.some(p=>p.n.dot(n)>1-1e-10&&Math.abs(p.c-c)<eps))item.planes.push({n,c});

 }
 assert(item.points.every(x=>item.planes.every(p=>p.n.dot(x)-p.c<eps)),'Source part must be convex and outward wound');
}
const originals=[],removed=new Map();
for(const node of doc.getRoot().listNodes())for(const primitive of node.getMesh()?.listPrimitives()||[]){
 if(primitive.getMaterial().getName()!=='EVR | paint')continue;
 const matrix=new Matrix4().fromArray(node.getWorldMatrix()),nm=new Matrix3().getNormalMatrix(matrix),pos=primitive.getAttribute('POSITION'),ix=primitive.getIndices().getArray();
 for(let k=0;k<ix.length;k+=3){const ids=Array.from(ix.slice(k,k+3)),q=ids.map(i=>v(pos.getElement(i,[])).applyMatrix4(matrix));
  if(!q.every(p=>Math.abs(p.x)<.89&&p.y>-.42&&p.y<-.23&&p.z>-10.49&&p.z<-9.79))continue;
  const matches=[];for(const [part,item]of parts.entries()){
   const points=q.map(x=>item.points.reduce((best,p)=>x.distanceTo(p)<x.distanceTo(best)?p:best,item.points[0]));
   const distance=Math.max(...q.map((x,j)=>x.distanceTo(points[j])));if(distance<.0002)matches.push({part,points,distance});
  }
  if(!matches.length)continue;assert.equal(matches.length,1,'Ambiguous pedestal source ownership');
  const m=matches[0],s={part:m.part,q:m.points,t:new Triangle(...m.points),attributes:{}};source.push(s);
  for(const semantic of primitive.listSemantics()){
   const a=primitive.getAttribute(semantic);s.attributes[semantic]=ids.map(i=>a.getElement(i,[]));
  }
  s.attributes.POSITION=s.q.map(x=>x.toArray());s.attributes.NORMAL=s.attributes.NORMAL.map(n=>v(n).applyNormalMatrix(nm).toArray());
  s.runtime=q;originals.push({node,primitive,k,source:source.length-1});if(!removed.has(primitive))removed.set(primitive,new Set());removed.get(primitive).add(k);
 }
}
assert.equal(originals.length,176);assert(source.every(s=>s.attributes));assert.equal(removed.size,1);
const [parentPrimitive]=removed.keys(),parentNode=originals[0].node;
await fs.writeFile(path.join(W,'source-triangles.json'),JSON.stringify(source.map(s=>({part:s.part,points:s.q.map(v=>v.toArray())}))));
if(process.argv.includes('--extract')){console.log('EXTRACTED',source.length);process.exit(0);}
const union=JSON.parse(await fs.readFile(path.join(W,'union.json')));
const faces=union.faces.map(f=>({source:f.source,points:f.points.map(v)}));
assert(union.closed && union.boundaryEdges===0 && union.nonmanifoldEdges===0);
// Boolean ownership at coplanar contacts is arbitrary. The visible top must
// inherit the plate's continuous atlas, never the hidden side-cap irradiance.
const tops=source.map((s,i)=>({s,i})).filter(({s})=>s.part===0&&s.q.every(p=>Math.abs(p.y+.232)<eps));
assert.equal(tops.length,2);
for(const {s}of tops)for(const p of s.q){const values=tops.map(({s:t})=>{const w=t.t.getBarycoord(p,new Vector3()).toArray();return t.attributes.TEXCOORD_1[0].map((_,k)=>w.reduce((sum,v,i)=>sum+v*t.attributes.TEXCOORD_1[i][k],0));});assert(Math.max(...values[0].map((v,i)=>Math.abs(v-values[1][i])))<2e-6,'Plate UV chart must be continuous');}
for(const f of faces)if(f.points.every(p=>Math.abs(p.y+.232)<eps)){
 const center=f.points.reduce((sum,p)=>sum.add(p),new Vector3()).multiplyScalar(1/3);
 f.source=tops.map(({s,i})=>({i,inside:Math.min(...s.t.getBarycoord(center,new Vector3()).toArray())})).sort((a,b)=>b.inside-a.inside)[0].i;
}
const attributes=Object.fromEntries(Object.keys(source[0].attributes).map(n=>[n,[]]));
for(const f of faces){const s=source[f.source];for(const x of f.points){const weights=s.t.getBarycoord(x,new Vector3()).toArray();for(const [name,out]of Object.entries(attributes)){
 let value=name==='POSITION'?x.toArray():s.attributes[name][0].map((_,i)=>s.attributes[name].reduce((sum,row,j)=>sum+weights[j]*row[i],0));
 if(name==='NORMAL')value=v(value).normalize().toArray();
 if(name==='_IRRADIANCE'){assert(value.every(x=>x>=-1e-4),'Unexpected transport extrapolation');value=value.map(x=>Math.max(0,x));}
 if(['_BAKE_MODE','_GENERATOR_ID','_CLEARANCE_ID'].includes(name)){assert(s.attributes[name].every(row=>row[0]===s.attributes[name][0][0]));value=s.attributes[name][0];}
 out.push(...value);
}}}
// A submicrometre Boolean sliver can collapse in float32 UV1 although its
// physical triangle remains valid. Transfer the existing atlas at its corners
// to the already-supported micro-lighting path instead of changing geometry.
let atlas=null,microTransfers=0;
for(let i=0;i<faces.length;i++){
 const uv=Array.from({length:3},(_,j)=>attributes.TEXCOORD_1.slice((i*3+j)*2,(i*3+j)*2+2).map(Math.fround));
 const area=Math.abs((uv[1][0]-uv[0][0])*(uv[2][1]-uv[0][1])-(uv[1][1]-uv[0][1])*(uv[2][0]-uv[0][0]));if(area!==0)continue;
 if(!atlas){const bytes=await fs.readFile(path.resolve(import.meta.dirname,'../public/assets/machinery/electrical-vr-r01/electrical-irradiance.exr'));atlas=new EXRLoader().setDataType(FloatType).parse(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));}
 for(let j=0;j<3;j++){const k=i*3+j,u=attributes.TEXCOORD_1[k*2],v=attributes.TEXCOORD_1[k*2+1],x=u*atlas.width-.5,y=(1-v)*atlas.height-.5,ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;
  for(let c=0;c<3;c++){let value=0;for(let dy=0;dy<2;dy++)for(let dx=0;dx<2;dx++){const px=Math.max(0,Math.min(atlas.width-1,ix+dx)),py=Math.max(0,Math.min(atlas.height-1,iy+dy));value+=atlas.data[(py*atlas.width+px)*4+c]*(dx?fx:1-fx)*(dy?fy:1-fy);}attributes._IRRADIANCE[k*3+c]=value;}
  attributes._BAKE_MODE[k]=1;attributes.TEXCOORD_1[k*2]=0;attributes.TEXCOORD_1[k*2+1]=1;
 }microTransfers++;
}
// A separate identity-transform primitive prevents quantization of the union
// from collapsing the corrected joints; meshopt still compresses its buffers.
const mesh=doc.createMesh('Pedestal boundary union'),patch=doc.createPrimitive().setMaterial(parentPrimitive.getMaterial()),buffer=doc.getRoot().listBuffers()[0];mesh.addPrimitive(patch);
for(const [name,values]of Object.entries(attributes)){const size=parentPrimitive.getAttribute(name).getElementSize(),type=size===1?Accessor.Type.SCALAR:'VEC'+size;patch.setAttribute(name,doc.createAccessor('pedestal '+name).setType(type).setArray(new Float32Array(values)).setBuffer(buffer));}
patch.setIndices(doc.createAccessor().setType(Accessor.Type.SCALAR).setArray(Uint32Array.from({length:faces.length*3},(_,i)=>i)).setBuffer(buffer));
const patchNode=doc.createNode('EVR installed | pedestal boundary union').setMesh(mesh).setExtras({componentID:'EVR/vented-pedestal-union',repair:'pedestal-r01'});for(const scene of doc.getRoot().listScenes())scene.addChild(patchNode);
for(const [primitive,rem]of removed){const ix=primitive.getIndices().getArray(),out=[];for(let k=0;k<ix.length;k+=3)if(!rem.has(k))out.push(ix[k],ix[k+1],ix[k+2]);primitive.setIndices(doc.createAccessor().setType(Accessor.Type.SCALAR).setArray(new ix.constructor(out)).setBuffer(buffer));}
doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});
const output=await io.writeBinary(doc);await fs.writeFile(path.join(W,'electrical.glb'),output);
await fs.writeFile(path.join(W,'pedestal-patch.json'),JSON.stringify({attributes,triangles:faces.length,sourceParts:parts.map(p=>p.name),sourceTriangles:originals.map(o=>source[o.source].q.map(p=>p.toArray())),facesSource:faces.map(f=>source[f.source].part),removedOffsets:originals.map(o=>o.k),node:parentNode.getName(),material:parentPrimitive.getMaterial().getName()}));
const proof={version:1,id:'pedestal-r01',sourceSHA256:sha(input),runtimeSHA256:sha(output),removedTriangles:originals.length,unionTriangles:faces.length,triangles:178280-originals.length+faces.length,microAtlasTransfers:microTransfers,method:'Boundary union of four existing convex bevelled parts; plate owns coincident faces; barycentric physical UVs, lightmap UVs, normals and corner irradiance; untouched primitives retain original buffers.',lighting:'Existing exterior lighting retained; collapsed float32 micro UVs sample the existing atlas at their corners; no new atlas/probe.',parts:parts.map(p=>p.name)};
await fs.writeFile(path.join(W,'repair.json'),JSON.stringify(proof,null,2)+'\n');console.log(JSON.stringify(proof,null,2));
