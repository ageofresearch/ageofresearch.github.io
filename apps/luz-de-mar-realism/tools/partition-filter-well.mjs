// Cut only the existing service well and its removable checkerplate. Retain
// complete original faces as a reversible loading fallback.
import{prune}from'@gltf-transform/functions';
import fs from 'node:fs/promises';import path from 'node:path';import crypto from 'node:crypto';
import {NodeIO,Accessor}from'@gltf-transform/core';import{ALL_EXTENSIONS,EXTMeshoptCompression}from'@gltf-transform/extensions';import{MeshoptDecoder,MeshoptEncoder}from'meshoptimizer';import{Matrix4,Matrix3,Vector3}from'three';
const R=path.resolve(import.meta.dirname,'..'),W=process.env.FILTER_WELL_WORK||'/tmp/ldm-filter-well-r01',SX=35.23/36,SY=7.47/7.6,rect=[11.05,-.49,12.75,.49],key=q=>q.map(p=>p.map(v=>Math.round(v*1e5)/1e5).join(',')).sort().join('|');
await Promise.all([MeshoptDecoder.ready,MeshoptEncoder.ready]);const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.decoder':MeshoptDecoder,'meshopt.encoder':MeshoptEncoder}),d=await io.read(W+'/baseline/room.glb');
const meta=JSON.parse(await fs.readFile(R+'/work/machinery-r11/snapshot/machinery.json')),blob=await fs.readFile(R+'/work/machinery-r11/snapshot/machinery.bin'),v=new Float32Array(blob.buffer,blob.byteOffset,meta.vertices*11),ix=new Uint32Array(blob.buffer,blob.byteOffset+meta.vertexBytes,meta.triangles*3),ids=new Uint32Array(blob.buffer,blob.byteOffset+meta.vertexBytes+meta.indexBytes,meta.triangles),owners=new Map();
for(let i=0;i<ids.length;i++)owners.set(key(Array.from(ix.slice(i*3,i*3+3),j=>Array.from(v.slice(j*11,j*11+3)))),meta.parts[ids[i]]);
function mix(a,b,t){return Object.fromEntries(Object.keys(a).map(k=>[k,a[k].map((v,i)=>v+(b[k][i]-v)*t)]));}
function split(poly,axis,edge){let inside=[],outside=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],da=a.POSITION[axis]-edge,db=b.POSITION[axis]-edge;(da>=0?inside:outside).push(a);if((da<0)!==(db<0)){const c=mix(a,b,da/(da-db));inside.push(c);outside.push(c);}}return[inside,outside];}
function cut(poly,rect){let rest=poly,out=[];for(const[axis,edge,positive]of[[2,rect[0]*SX-17.615,true],[2,rect[2]*SX-17.615,false],[0,rect[1]*SY,true],[0,rect[3]*SY,false]]){if(rest.length<3)break;const[a,b]=split(rest,axis,edge);out.push(positive?b:a);rest=positive?a:b;}return{inside:rest,outside:out.filter(p=>p.length>=3)};}
function area(p){const a=new Vector3(...p[0].POSITION);return p.slice(1,-1).reduce((s,b,i)=>s+new Vector3(...b.POSITION).sub(a).cross(new Vector3(...p[i+2].POSITION).sub(a)).length()/2,0);}
const report={register:rect,affectedSourceTriangles:0,bySource:{},retainedSourceTriangles:0,clippedTriangles:0,registerTriangles:0};
for(const node of [...d.getRoot().listNodes()]){
 if(!node.getMesh()||['left-r11','right-r11','electrical-r11','bulkhead-r11'].includes(node.getExtras().variant))continue;
 const mesh=node.getMesh(),matrix=new Matrix4().fromArray(node.getWorldMatrix()),nm=new Matrix3().getNormalMatrix(matrix),groups=new Map();
 for(const p of [...mesh.listPrimitives()]){
  const idx=p.getIndices().getArray(),pos=p.getAttribute('POSITION'),keep=[],legacy=[];
  function emit(variant,poly){if(poly.length<3||area(poly)<1e-12)return;const id=variant+':'+p.getMaterial().getName();if(!groups.has(id))groups.set(id,{variant,material:p.getMaterial(),corners:[]});const target=groups.get(id).corners;for(let j=1;j<poly.length-1;j++)target.push(poly[0],poly[j],poly[j+1]);}
  for(let k=0;k<idx.length;k+=3){const ind=Array.from(idx.slice(k,k+3)),points=ind.map(j=>new Vector3(...pos.getElement(j,[])).applyMatrix4(matrix).toArray()),part=owners.get(key(points));
   const floor=part&&/fitted normal-state checkerplate walkway|flush fitted-panel fasteners/.test(part.feature),well=part?.id==='SeaStrainers/well-and-pipes'||part?.id==='LD_R02/machinery/bilge/0';
   if((!floor&&!well)||node.getExtras().dynamic==='register'){keep.push(...ind);report.retainedSourceTriangles++;continue;}
   const corners=ind.map((j,i)=>Object.fromEntries(p.listSemantics().map(name=>{const a=p.getAttribute(name);let value=a.getElement(j,[]);if(name==='POSITION')value=points[i];if(name==='NORMAL')value=new Vector3(...value).applyNormalMatrix(nm).toArray();return[name,value];}))),pieces=cut(corners,part.id==='SeaStrainers/well-and-pipes'?[11.00,-.55,12.80,.55]:rect);
   if(pieces.inside.length<3||area(pieces.inside)<1e-12){keep.push(...ind);report.retainedSourceTriangles++;continue;}
   report.affectedSourceTriangles++;report.bySource[part.id]=(report.bySource[part.id]||0)+1;legacy.push(...ind);
   for(const poly of pieces.outside)emit('filter-well-context',poly);
   if(floor)emit('filter-well-register',pieces.inside);
  }
  if(legacy.length){const old=p.clone().setIndices(d.createAccessor().setType('SCALAR').setArray(new Uint32Array(legacy)).setBuffer(p.getIndices().getBuffer())),n=d.createNode('filter-well-legacy').setMesh(d.createMesh('filter-well-legacy').addPrimitive(old)).setMatrix(node.getWorldMatrix()).setExtras({...node.getExtras(),variant:'filter-well-legacy',filterWellPartition:true});for(const scene of d.getRoot().listScenes())scene.addChild(n);}
  if(keep.length)p.setIndices(d.createAccessor().setType('SCALAR').setArray(new Uint32Array(keep)).setBuffer(p.getIndices().getBuffer()));else mesh.removePrimitive(p);
 }
 for(const {variant,material,corners}of groups.values()){
  const primitive=d.createPrimitive().setMaterial(material),buffer=d.getRoot().listBuffers()[0];
  for(const name of Object.keys(corners[0])){const size=corners[0][name].length,values=corners.flatMap(c=>c[name]);primitive.setAttribute(name,d.createAccessor().setType(size===1?'SCALAR':'VEC'+size).setArray(new Float32Array(values)).setBuffer(buffer));}
  primitive.setIndices(d.createAccessor().setType('SCALAR').setArray(Uint32Array.from({length:corners.length},(_,i)=>i)).setBuffer(buffer));const n=d.createNode(variant).setMesh(d.createMesh(variant).addPrimitive(primitive)).setExtras({...node.getExtras(),variant,filterWellPartition:true});for(const scene of d.getRoot().listScenes())scene.addChild(n);
  if(variant==='filter-well-context')report.clippedTriangles+=corners.length/3;if(variant==='filter-well-register')report.registerTriangles+=corners.length/3;
 }
}
if(!report.bySource['SeaStrainers/well-and-pipes']||!report.registerTriangles)throw Error('Incomplete well partition');
await d.transform(prune({keepAttributes:true}));d.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});await io.write(W+'/room.glb',d);report.sourceSHA256=crypto.createHash('sha256').update(await fs.readFile(W+'/baseline/room.glb')).digest('hex');report.sha256=crypto.createHash('sha256').update(await fs.readFile(W+'/room.glb')).digest('hex');await fs.writeFile(W+'/partition.json',JSON.stringify(report,null,2)+'\n');console.log(report);
