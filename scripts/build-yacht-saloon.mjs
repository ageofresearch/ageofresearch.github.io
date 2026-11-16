// Offline extraction: mobile downloads two ready-to-draw profiles, never the
// complete yacht. Install tooling with npm ci --prefix scripts/yacht-geometry.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { MeshoptSimplifier } from './yacht-geometry/node_modules/meshoptimizer/index.js';
import { buildYachtGeometry, createBoarding, createSternFeatures, createFinishes } from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import { A as Group } from '../site/tidewater-rocha/assets/common-HBn3Movl.js';
import { clipGeometry, subdivide, contactShade } from './build-yacht-terrace.mjs';
import { convexHull } from '../site/tidewater-rocha/mobile/terrace-geometry.js';

const root = new URL('../site/tidewater-rocha/', import.meta.url);
const version = 'bridge-access-1';
export const boundsOf = vertices => {
  const b = [Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity];
  for (let i=0;i<vertices.length;i+=6) for(let k=0;k<3;k++) {
    b[k]=Math.min(b[k],vertices[i+k]);b[k+3]=Math.max(b[k+3],vertices[i+k]);
  }
  return b;
};
// Rendered source proxies can still carry typed arrays and batch-only materials.
// Normalize them before clipping; TypedArray.map cannot return vertex arrays.
export function normalizeRenderedPart(source,model) {
  const p={...source,feature:source.feature||source.name,vertices:Array.from(source.vertices),indices:Array.from(source.indices)};
  if(!p.finish&&!p.materialID) {
    const range=model.componentRanges.find(r=>r.id===p.id),mesh=model.meshes.find(m=>m.name==='Luz de Mar · '+range?.batch);
    if(!mesh)throw Error('No final material for '+p.id);
    const index=mesh.geometry.index.array[range.start],color=mesh.geometry.attributes.color.array.slice(index*3,index*3+3);
    const surface=mesh.geometry.attributes.aSurface.array.slice(index*4,index*4+3);
    const srgb=x=>Math.round(255*(x<=.0031308?12.92*x:1.055*Math.pow(x,1/2.4)-.055));
    p.finish=[color.reduce((n,c)=>n*256+srgb(c),0),...surface];
  }
  p.glass=!!p.glass||p.category==='Glazing';p.smokedGlass=p.smokedGlass??p.category==='Glazing';
  return p;
}
function decode(manifest, buffer) {
  return manifest.parts.map(part => {
    const result={...part};
    for(const key of ['vertices','indices','light','surfaceTypes']) {
      const Type=key==='indices'?Uint32Array:Float32Array;
      result[key]=Array.from(new Type(buffer,part[key].offset,part[key].length));
    }
    return result;
  });
}
function floorTriangles(part) {
  const result=[];
  for(let i=0;i<part.indices.length;i+=3) {
    const t=part.indices.slice(i,i+3).map(k=>part.vertices.slice(k*6,k*6+6));
    if(t.every(v=>Math.abs(v[2]-3.95)<.002&&v[5]>.5))result.push(t.map(v=>v.slice(0,2)));
  }
  return result;
}

// Weld identical attributes before simplifying. Do not move any vertices or
// drop components; silhouettes, material boundaries and deck edges stay intact.
export function simplify(part, error, flags=[]) {
  if(part.indices.length<=72 || error===0)return part;
  const vertices=[], light=[], surfaceTypes=[], remap=[], keys=new Map();
  for(let i=0;i<part.vertices.length;i+=6) {
    const row=Array.from(part.vertices.slice(i,i+6));
    const l=part.light?.[i/6]??.96, type=part.surfaceTypes?.[i/6]??part.finish?.[3]??0;
    const key=[...row,l,type].map(n=>n.toFixed(6)).join(',');
    let index=keys.get(key);
    if(index===undefined){index=light.length;keys.set(key,index);vertices.push(...row);light.push(l);surfaceTypes.push(type);}
    remap.push(index);
  }
  const indices=Uint32Array.from(part.indices,i=>remap[i]);
  const attrs=Float32Array.from(light.flatMap((l,i)=>[...vertices.slice(i*6+3,i*6+6),l]));
  const [reduced,actualError]=MeshoptSimplifier.simplifyWithAttributes(indices,Float32Array.from(vertices),6,
    attrs,4,[.15,.15,.15,.5],null,Math.max(36,Math.floor(indices.length*.12/3)*3),error,
    ['ErrorAbsolute','LockBorder',...flags]);
  return {...part,vertices,indices:Array.from(reduced),light,surfaceTypes,lodError:actualError};
}

export async function buildSaloon() {
  await MeshoptSimplifier.ready;
  const [json,bin,terraceJSON,terraceBin]=await Promise.all([
    'rocha/luz-de-mar/model.json','rocha/luz-de-mar/model.bin','mobile/aft-terrace.json','mobile/aft-terrace.bin'
  ].map(path=>readFile(new URL(path,root))));
  const data=JSON.parse(json), binary=bin.buffer.slice(bin.byteOffset,bin.byteOffset+bin.byteLength);
  const model=buildYachtGeometry({data,binary},0,{mtuEngines:false,seaStrainers:false});
  const terrace=decode(JSON.parse(terraceJSON),terraceBin.buffer.slice(terraceBin.byteOffset,terraceBin.byteOffset+terraceBin.byteLength));
  const parts=[],seen=new Set();
  const region=[8.5,-3.13,3.83,17.91,3.13,6.01];
  function add(source,role,bounds=null) {
    if(seen.has(source.id))return;
    const geometry=bounds?clipGeometry(source,bounds):{vertices:Array.from(source.vertices),indices:Array.from(source.indices)};
    if(!geometry.indices.length)return;
    seen.add(source.id);
    parts.push({...source,...geometry,role,bounds:boundsOf(geometry.vertices),sourceID:source.anchor||source.id.split('/')[0]});
  }
  function original(source) {
    const range=model.componentRanges.find(r=>r.id===source.id);
    const mesh=model.meshes.find(m=>m.name==='Luz de Mar · '+range?.batch);
    const index=mesh?.geometry.index.array[range.start];
    const color=mesh?.geometry.attributes.color.array.slice(index*3,index*3+3);
    const surface=mesh?.geometry.attributes.aSurface.array.slice(index*4,index*4+3);
    const srgb=x=>Math.round(255*(x<=.0031308?12.92*x:1.055*Math.pow(x,1/2.4)-.055));
    const hex=color?color.reduce((n,c)=>n*256+srgb(c),0):15921645;
    return {...source,bounds:source.bbox,feature:source.name,
      vertices:Array.from(new Float32Array(binary,source.vByte,source.vCount*6)),
      indices:Array.from(new Uint16Array(binary,data.vertexBytes+source.iByte,source.iCount)),
      glass:source.category==='Glazing',smokedGlass:source.category==='Glazing',
      finish:[hex,...(surface||[.32,0,0])]};
  }
  const furnitureIDs=new Set(data.meshes.filter(s=>['Furniture','Soft_furnishing'].includes(s.category)).map(s=>s.id));
  const ids=new Set(model.sourceObjects.filter(s=>furnitureIDs.has(s.id)&&s.candidateRoomIDs?.includes('MD_R02')).map(s=>s.id));
  for(const source of data.meshes) {
    const furniture=ids.has(source.id)&&['Furniture','Soft_furnishing'].includes(source.category);
    const architecture=source.deck==='MD'&&['Superstructure','Partitions','Glazing'].includes(source.category)
      &&source.id!=='MD_GLA_001';
    if(!furniture&&!architecture)continue;
    const replacements=model.interiorDetail.replacements.get(source.id)??[original(source)];
    for(const part of replacements)add(part,furniture?'furniture':source.category==='Glazing'?'glazing':'boundary',furniture?null:region);
  }
  for(const part of model.interiorDetail.additions)if(ids.has(part.anchor))add(part,'furniture');
  for(const part of model.interiorDetail.replacements.get('MD_DCK_001'))
    add({...part,id:part.id+'/saloon'},'floor',[8.5,-3.02,3.83,17.83,3.02,3.96]);
  for(const part of model.interiorDetail.replacements.get('UD_DCK_001'))
    add({...part,id:part.id+'/saloon'},'roof',[8.5,-3.13,5.87,17.91,3.13,6.01]);
  // Retain the real walls of the service-stair enclosure beside the doorway.
  for(const part of model.interiorDetail.objects)
    if(/profiled white service stair enclosure|sloping white service stair ceiling|dark sidewall around D1/.test(part.feature))
      add({...part,id:part.id+'/saloon'},'boundary',region);

  const collisionFootprints=[];
  // The sliding panels and frame contain an actual doorway. Project each
  // body-height triangle, not the bounding box of the complete assembly.
  for(const part of terrace.filter(p=>['glazing','frame'].includes(p.role))) {
    const body=clipGeometry(part,[8,-4,4.015,8.6,4,5.60]);
    for(let i=0;i<body.indices.length;i+=3) {
      const points=body.indices.slice(i,i+3).map(k=>body.vertices.slice(k*6,k*6+2));
      const polygon=convexHull(points.flatMap(([x,y])=>[[x-.0001,y-.0001],[x+.0001,y-.0001],[x+.0001,y+.0001],[x-.0001,y+.0001]]));
      collisionFootprints.push({id:part.id+'/portal/'+i,polygon});
    }
  }
  for(const part of parts.filter(p=>!['floor','roof'].includes(p.role))) {
    const body=clipGeometry(part,[8.5,-3.13,4.015,17.91,3.13,5.60]);
    const polygon=convexHull(Array.from({length:body.vertices.length/6},(_,i)=>body.vertices.slice(i*6,i*6+2)));
    if(polygon.length>=3)collisionFootprints.push({id:part.id,polygon});
  }
  const furnitureFootprints=collisionFootprints.filter(f=>parts.some(p=>p.id===f.id&&p.role==='furniture'));
  for(const part of parts) {
    if(['floor','roof'].includes(part.role))Object.assign(part,subdivide(part,.65));
    part.light=[];part.surfaceTypes=[];
    for(let i=0;i<part.vertices.length;i+=6) {
      const [x,y,z,,,nz]=part.vertices.slice(i,i+6);
      const side=Math.min(1,Math.abs(y)/3), aft=Math.max(0,1-(x-8.5)/3);
      const contact=part.role==='floor'&&nz>.5?contactShade(x,y,furnitureFootprints):1;
      part.light.push((.54+.16*side+.12*aft)*contact);
      part.surfaceTypes.push(part.role==='floor'&&nz>.5?2:part.role==='roof'&&nz<-.5?9:part.finish?.[3]??0);
    }
  }
  const floor=parts.filter(p=>p.role==='floor').flatMap(floorTriangles);
  const room={...data.rooms.find(r=>r.id==='MD_R02'),name:'Salón principal',displayName:'Salón principal',
    spawn:[9.2,0,5.55],look:[12.2,0,4.9]};
  const chunks=[];let offset=0;
  function store(values,Type=Float32Array) {
    const a=Type.from(values), chunk=Buffer.from(a.buffer), descriptor={offset,length:a.length};
    chunks.push(chunk);offset+=chunk.length;return descriptor;
  }
  const packedParts=parts.map(part=>({id:part.id,sourceID:part.sourceID,role:part.role,feature:part.feature,
    bounds:part.bounds,finish:part.finish,materialID:part.materialID??null,glass:!!part.glass,
    vertices:store(part.vertices),indices:store(part.indices,Uint32Array)}));
  const profiles={};
  const materials=createFinishes(0,true,true,true,true);
  try {
    for(const profile of ['exterior','interior']) {
      const audit=[];
      const geometryTransform=part=>{
        const b=part.bounds||boundsOf(part.vertices);
        const shared=b[3]>=6.8&&b[0]<=10.2;
        const support=/teak tread|pale step|boarding landing|final riser/.test(part.feature||part.name||'');
        const near=profile==='exterior'?b[0]<10.2:b[3]>6.8;
        const error=support||part.glass?0:shared?.002:near?.004:.035;
        const result=simplify(part,error);
        audit.push({id:part.id,sourceTriangles:part.indices.length/3,triangles:result.indices.length/3,
          error:result.lodError||0,shared,support});
        return result;
      };
      const boarding=createBoarding({group:new Group()},null,{gangwayOnly:true,includeLanding:true,materials,
        sternParts:createSternFeatures().parts,terraceParts:[...terrace,...parts],geometryTransform});
      const batches=boarding.meshes.map(mesh=>{
        const attributes=Object.fromEntries(Object.entries(mesh.geometry.attributes)
          .map(([name,a])=>[name,{...store(a.array),itemSize:a.itemSize}]));
        return {glass:mesh.material.transparent,attributes,indices:store(mesh.geometry.index.array,Uint32Array)};
      });
      profiles[profile]={batches,triangles:boarding.stats.triangles,
        geometryBytes:batches.reduce((n,b)=>n+b.indices.length*4+Object.values(b.attributes).reduce((n,a)=>n+a.length*4,0),0),audit};
      boarding.dispose();
      if(profiles[profile].triangles>25000)throw Error(profile+' exceeds the 25,000 triangle budget');
    }
  }finally{materials.opaque.dispose();materials.glass.dispose();model.dispose();}
  const manifest={version,sourceSHA256:createHash('sha256').update(json).update(bin).digest('hex'),
    room,floor,collisionFootprints,parts:packedParts,profiles,
    transition:{enter:9.2,exit:8.0,shared:[6.8,10.2]},navigationEnd:17.83};
  return {manifest,binary:Buffer.concat(chunks),sources:{terrace,parts}};
}

if(process.argv[1]===fileURLToPath(import.meta.url)) {
  const result=await buildSaloon();
  for(const [name,p]of Object.entries(result.manifest.profiles))console.log(name,p.triangles,'triangles',p.geometryBytes,'GPU bytes');
  await writeFile(new URL('mobile/main-saloon.json',root),JSON.stringify(result.manifest));
  await writeFile(new URL('mobile/main-saloon.bin',root),result.binary);
  console.log(result.manifest.parts.length,'saloon parts',result.binary.length,'download bytes');
}
