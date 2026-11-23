// Offline only. Usage: node scripts/yacht-geometry/bake-tour-furniture.mjs <r110.glb>
// Bake small, welded furniture shells in donor coordinates. No donor atlas,
// compressed buffer or decoder enters either edition of the Rocha yacht.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {MeshoptDecoder,MeshoptSimplifier} from './node_modules/meshoptimizer/index.js';

const file=await readFile(process.argv[2]);
const digest=createHash('sha256').update(file).digest('hex');
if(digest!=='3a1bb6d1d7751aa1bef55fc834fafed83629ea24a8fc218b2fde8757bf90862d')throw Error('Expected the r110 lossless Grande 36M');
const size=file.readUInt32LE(12),g=JSON.parse(file.subarray(20,20+size)),bin=file.subarray(28+size);
await Promise.all([MeshoptDecoder.ready,MeshoptSimplifier.ready]);
const views=new Map();
function accessor(index){
  const a=g.accessors[index],v=g.bufferViews[a.bufferView],e=v.extensions?.EXT_meshopt_compression;
  if(!views.has(v)){
    if(!e)views.set(v,bin.subarray(v.byteOffset,v.byteOffset+v.byteLength));
    else {
      const bytes=Buffer.alloc(v.byteLength);
      MeshoptDecoder.decodeGltfBuffer(bytes,e.count,e.byteStride,bin.subarray(e.byteOffset,e.byteOffset+e.byteLength),e.mode,e.filter);
      views.set(v,bytes);
    }
  }
  const bytes=views.get(v),type={5122:['readInt16LE',2,32767],5123:['readUInt16LE',2,65535],5125:['readUInt32LE',4,4294967295],5120:['readInt8',1,127],5126:['readFloatLE',4,1]}[a.componentType];
  const dim={VEC3:3,SCALAR:1}[a.type],stride=v.byteStride||dim*type[1];
  return Array.from({length:a.count},(_,i)=>Array.from({length:dim},(_,k)=>{
    const n=bytes[type[0]]((a.byteOffset||0)+i*stride+k*type[1]);
    return a.normalized?Math.max(-1,n/type[2]):n;
  }));
}
// The pinned atlas batches have one uniformly scaled node each, with identity
// ancestors. Welding source UV splits before connectivity preserves each pad.
function pieces(mesh,primitive){
  const node=g.nodes.find(n=>n.mesh===mesh),p=g.meshes[mesh].primitives[primitive];
  if(node.rotation||node.matrix||node.scale.some(s=>s!==node.scale[0]))throw Error('Review donor transform');
  const xyz=accessor(p.attributes.POSITION).map(v=>v.map((x,k)=>x*node.scale[k]+node.translation[k]));
  const normals=accessor(p.attributes.NORMAL),indices=accessor(p.indices).flat();
  const parent=xyz.map((_,i)=>i),weld=new Map();
  function root(i){while(parent[i]!==i){parent[i]=parent[parent[i]];i=parent[i];}return i;}
  for(const [i,v] of xyz.entries()){
    const key=v.map(x=>Math.round(x*10000)).join(',');
    if(weld.has(key))parent[i]=weld.get(key);else weld.set(key,i);
  }
  for(let i=0;i<indices.length;i+=3){
    const a=root(indices[i]);parent[root(indices[i+1])]=a;parent[root(indices[i+2])]=a;
  }
  const groups=new Map();
  for(let i=0;i<indices.length;i+=3){const k=root(indices[i]);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(indices[i],indices[i+1],indices[i+2]);}
  return Array.from(groups.values(),faces=>{
    const ids=Array.from(new Set(faces)),bounds=[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity];
    for(const id of ids)xyz[id].forEach((x,k)=>{bounds[k]=Math.min(x,bounds[k]);bounds[k+3]=Math.max(x,bounds[k+3]);});
    return {ids,faces,xyz,normals,bounds};
  });
}
const catalog={};
function bake(name,mesh,primitive,select,maxFaces){
  const selected=pieces(mesh,primitive).filter(p=>select(p.bounds,p.faces.length/3));
  if(!selected.length)throw Error('Empty '+name);
  const allBounds=[0,1,2].map(k=>Math.min(...selected.map(p=>p.bounds[k])))
    .concat([3,4,5].map(k=>Math.max(...selected.map(p=>p.bounds[k]))));
  const encode=a=>Buffer.from(a.buffer).toString('base64');
  const entries=[];
  for(const {ids,faces,xyz,normals} of selected){
    const refs=new Map(ids.map((id,i)=>[id,i]));
    const pos=Float32Array.from(ids.flatMap(i=>xyz[i]));
    const smooth=Float32Array.from(ids.flatMap(i=>normals[i]));
    const [indices]=MeshoptSimplifier.simplifyWithAttributes(Uint32Array.from(faces,i=>refs.get(i)),pos,3,
      smooth,3,[.35,.35,.35],null,Math.min(maxFaces*3,faces.length),1,['Permissive']);
    const kept=Array.from(new Set(indices)),remap=new Map(kept.map((i,k)=>[i,k]));
    const data=[];
    for(const i of kept){
      const id=ids[i];for(let k=0;k<3;k++)data.push(Math.round((xyz[id][k]-allBounds[k])/(allBounds[k+3]-allBounds[k]||1)*32767));
      for(const n of normals[id])data.push(Math.round(n*32767));
    }
    entries.push([encode(Int16Array.from(data)),encode(Uint16Array.from(indices,i=>remap.get(i)))]);
  }
  catalog[name]={size:allBounds.slice(3).map((x,k)=>x-allBounds[k]),pieces:entries};
}
bake('scatter',159,6,(b,n)=>n===2496 && b[0]<-16,72);
bake('banquette',159,4,b=>b[0]>-14&&b[3]<-12.5,95);
bake('upperChair',161,4,b=>b[2]>.25,100);
bake('upperIsland',161,1,b=>b[0]<-9.5,65);
bake('skylounge',139,9,()=>true,116);
bake('salonSofa',133,9,(b,n)=>b[0]<-2.7 && ![4652,188].includes(n),132);
bake('salonChair',133,9,b=>b[0]<-4.90&&b[2]>1&&b[3]<-4.90,148);
// Preserve the rolled upholstery and the continuous three-metre back in close views.
bake('salonSofaClose',133,9,(b,n)=>b[0]<-2.7 && ![4652,188].includes(n),650);
bake('bowPort',163,1,b=>b[0]<9&&b[2]>0,96);
bake('sunLounger',164,0,b=>b[0]<-4.45&&b[2]>0,64);
bake('sunCorner',164,0,(b,n)=>n===4652,98);
const output=new URL('../../site/tidewater-rocha/mobile/tour-furniture-data.js',import.meta.url);
await writeFile(output,'// Generated from the pinned Grande 36M r110 by bake-tour-furniture.mjs.\nexport default '+JSON.stringify(catalog)+';\n');
