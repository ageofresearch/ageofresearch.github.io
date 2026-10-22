// Bake the existing HDR irradiance into small proxy vertex attributes. Distant
// rooms keep their lighting through windows without loading full HDR atlases.
import fs from 'node:fs/promises';import path from 'node:path';import{NodeIO}from'@gltf-transform/core';import{ALL_EXTENSIONS,EXTMeshoptCompression}from'@gltf-transform/extensions';import{dedup,prune,join,simplify,reorder}from'@gltf-transform/functions';import{MeshoptEncoder,MeshoptDecoder,MeshoptSimplifier}from'meshoptimizer';import{EXRLoader}from'three/addons/loaders/EXRLoader.js';import{FloatType}from'three';
const R=path.resolve(import.meta.dirname,'..'),A=path.join(R,'public/assets');await Promise.all([MeshoptEncoder.ready,MeshoptDecoder.ready,MeshoptSimplifier.ready]);const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder,'meshopt.decoder':MeshoptDecoder}),exr=new EXRLoader().setDataType(FloatType);
const selected=process.argv.slice(2),sourceDir=process.env.PROXY_SOURCE_DIR||path.join(R,'work');
for(const id of(selected.length?selected:['saloon','cockpit','beach-club','port-side','starboard-side','bow','context'])){
 const doc=await io.read(path.join(sourceDir,id+'-source.glb')),buffer=doc.getRoot().listBuffers()[0],atlases=new Map(),palette=new Map();
 if(id!=='context'){const a=JSON.parse(await fs.readFile(path.join(A,id,'authoring.json')));for(const key of a.atlases){const b=await fs.readFile(path.join(A,id,'ambient-'+key+'.exr'));atlases.set(key,exr.parse(b.buffer.slice(b.byteOffset,b.byteOffset+b.length)));}}
 function sample(im,u,v,c){const x=Math.max(0,Math.min(im.width-1,u*(im.width-1))),y=Math.max(0,Math.min(im.height-1,(1-v)*(im.height-1))),x0=Math.floor(x),y0=Math.floor(y),x1=Math.min(im.width-1,x0+1),y1=Math.min(im.height-1,y0+1),a=x-x0,b=y-y0,get=(xx,yy)=>im.data[(yy*im.width+xx)*4+c];return Math.max(0,Math.min(16,(get(x0,y0)*(1-a)+get(x1,y0)*a)*(1-b)+(get(x0,y1)*(1-a)+get(x1,y1)*a)*b));}
 for(const mesh of doc.getRoot().listMeshes())for(const p of mesh.listPrimitives()){
  const m=p.getMaterial(),extra=m.getExtras(),base=extra.baseColorFactor||m.getBaseColorFactor().slice(0,3),alpha=m.getBaseColorFactor()[3],family=extra.family,kind=family==='glass'?'glass':family==='metal'?'metal':'paint';
  if(!palette.has(kind))palette.set(kind,doc.createMaterial('Lit distant '+kind).setBaseColorFactor([1,1,1,kind==='glass'?.16:1]).setRoughnessFactor(kind==='glass'?.09:kind==='metal'?.22:.5).setMetallicFactor(kind==='metal'?1:0).setAlphaMode(kind==='glass'?'BLEND':'OPAQUE').setDoubleSided(kind==='glass').setExtras({vertexAmbient:true,proxy:true}));
  const count=p.getAttribute('POSITION').getCount(),uv=p.getAttribute('TEXCOORD_1'),color=new Float32Array(count*3),ambient=new Float32Array(count*3),im=atlases.get(extra.lightmap);
  for(let i=0;i<count;i++)for(let c=0;c<3;c++){color[i*3+c]=base[c];ambient[i*3+c]=im?sample(im,uv.getArray()[i*2],uv.getArray()[i*2+1],c):[.23,.25,.27][c];}
  // Large planar charts have their darkest texels at the corners. Carry a
  // face-interior estimate into those coarse vertices, so a ceiling is not
  // interpolated from four occluded bevel corners after UV removal.
  if(im){const ix=p.getIndices().getArray(),pos=p.getAttribute('POSITION').getArray(),uvs=uv.getArray(),sum=new Float64Array(count*3),weight=new Float64Array(count);
   for(let k=0;k<ix.length;k+=3){const a=ix[k],b=ix[k+1],c=ix[k+2],u=[0,1,2].map(j=>pos[b*3+j]-pos[a*3+j]),v=[0,1,2].map(j=>pos[c*3+j]-pos[a*3+j]),area=.5*Math.hypot(u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]);if(area<.03)continue;const tu=(uvs[a*2]+uvs[b*2]+uvs[c*2])/3,tv=(uvs[a*2+1]+uvs[b*2+1]+uvs[c*2+1])/3;for(const i of[a,b,c]){weight[i]+=area;for(let channel=0;channel<3;channel++)sum[i*3+channel]+=sample(im,tu,tv,channel)*area;}}
   for(let i=0;i<count;i++)if(weight[i])for(let channel=0;channel<3;channel++)ambient[i*3+channel]=ambient[i*3+channel]*.15+sum[i*3+channel]/weight[i]*.85;
  }
  p.setAttribute('COLOR_0',doc.createAccessor('Proxy finish',buffer).setType('VEC3').setArray(color));p.setAttribute('_AMBIENT',doc.createAccessor('Baked proxy irradiance',buffer).setType('VEC3').setArray(ambient));p.setAttribute('TEXCOORD_0',null);p.setAttribute('TEXCOORD_1',null);p.setAttribute('TANGENT',null);p.setMaterial(palette.get(kind));
 }
 for(const n of doc.getRoot().listNodes())n.setExtras({proxy:true});for(const m of doc.getRoot().listMaterials())if(![...palette.values()].includes(m))m.dispose();
 await doc.transform(dedup(),prune({keepAttributes:true}),join({keepNamed:false}),simplify({simplifier:MeshoptSimplifier,ratio:.12,error:.003,lockBorder:true}),prune({keepAttributes:true}),reorder({encoder:MeshoptEncoder,target:'size'}));doc.createExtension(EXTMeshoptCompression).setRequired(true);await io.write(path.join(A,id,'context.glb'),doc);console.log('Lit proxy',id,(await fs.stat(path.join(A,id,'context.glb'))).size);
}
