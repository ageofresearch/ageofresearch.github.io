// Extract the final shared yacht assemblies; only these ready-to-draw buffers reach mobile.
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {buildSaloon,boundsOf,simplify,normalizeRenderedPart} from './build-yacht-saloon.mjs';
import {clipGeometry,subdivide,contactShade} from './build-yacht-terrace.mjs';
import {buildYachtGeometry,createBoarding,createSternFeatures,createFinishes,i as Walk,l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import {A as Group} from '../site/tidewater-rocha/assets/common-HBn3Movl.js';
import {renderedParts,obstacles,surfaceTriangles} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
const root=new URL('../site/tidewater-rocha/',import.meta.url);
export async function buildUpper() {
  const lower=await buildSaloon(),json=await readFile(new URL('rocha/luz-de-mar/model.json',root));
  const data=JSON.parse(json),b=await readFile(new URL('rocha/luz-de-mar/model.bin',root));
  const asset={data,binary:b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),
    nav:Object.fromEntries(Object.entries(data.nav).map(([k,n])=>[k,{...n,bits:Uint8Array.from(atob(n.mask),c=>c.charCodeAt(0))}]))};
  const model=buildYachtGeometry(asset,0,{mtuEngines:false,seaStrainers:false});model.asset=asset;model.group.userData={yacht:basis};
  new Walk({camera:{position:model.group.position}},model,{document:null});
  const final=renderedParts(model),flight=model.stairInventory.flights.find(f=>f.id==='aft');
  const {terrace,parts:saloon}=lower.sources;
  for(let i=0;i<terrace.length;i++) {
    const p=final.find(p=>p.id===terrace[i].id&&p.semanticParent==='stairs/aft');
    if(p)terrace[i]={...p,role:'stairs',vertices:Array.from(p.vertices),indices:Array.from(p.indices)};
  }
  const existing=new Set([...terrace,...saloon].map(p=>p.id));
  const furniture=new Set(['UD_FUR_001','UD_FUR_005','UD_FUR_006','UD_FUR_016']);
  const parts=[];
  function add(p,role,box) {
    if(existing.has(p.id)||parts.some(q=>q.id===p.id))return;
    p=normalizeRenderedPart(p,model);
    const g=box?clipGeometry(p,box):{vertices:Array.from(p.vertices),indices:Array.from(p.indices)};
    if(!g.indices.length)return;
    parts.push({...p,...g,sourceID:p.anchor||p.id.split('/')[0],role,bounds:boundsOf(g.vertices)});
  }
  for(const p of final) {
    const anchor=p.anchor||p.id.split('/')[0];
    if(p.feature?.startsWith('solarium guard')||p.feature?.startsWith('bow guard'))continue;
    if(furniture.has(anchor))add(p,'furniture');
    else if(p.semanticParent==='stairs/aft')add(p,'stair');
    else if(anchor==='SD_STA_001')add(p,'closed-stair');
    else if(anchor==='UD_DCK_001') {
      // The slab/reveal below z=6 already exists as the MD roof in both slices.
      if(p.bounds[5]<=6.001)continue;
      add(p,'boundary',[3.2,-3.8,6.01,14.25,3.8,9.3]);
    }else if(['SD_DCK_001','UD_SUP_001','UD_GLA_001','UD_GLA_002'].includes(anchor))
      add(p,'boundary',[3.2,-3.8,6,14.25,3.8,9.3]);
  }
  // Extend only the missing side strips of the shared UD slab. Its MD ceiling
  // stays in place; adding a second complete floor would cause z-fighting.
  const slab=final.find(p=>(p.anchor||p.id.split('/')[0])==='UD_DCK_001' && p.bounds[2]<5.89&&p.bounds[3]>30);
  for(const [name,box] of [['port',[8.5,3.13,5.87,14.25,3.8,6.01]],['starboard',[8.5,-3.8,5.87,14.25,-3.13,6.01]]])
    add({...slab,id:slab.id+'/upper-'+name},'floor',box);
  const floorParts=[...terrace,...saloon,...parts].filter(p=>p.role==='roof'||p.role==='floor');
  const floor=floorParts.flatMap(p=>surfaceTriangles(p,6,.002));
  const physical=final.filter(p=>!p.feature?.startsWith('bow guard')&&!['Cold_water','Hot_water','Drainage','Stairs'].includes(p.category));
  const clearance=obstacles(physical,new Set(),[3.2,-3.8,6,14.25,3.8,7.65]);
  const collisionFootprints=clearance.footprints(6);
  const furnitureFootprints=collisionFootprints.filter(p=>parts.some(q=>q.id===p.id&&q.role==='furniture'));
  // A floor/ceiling has two independent lighting environments on the same mesh.
  for(const p of [...terrace,...saloon,...parts]) {
    const upperSurface=(p.role==='roof'||p.role==='floor')&&p.bounds[5]>=5.999&&p.bounds[2]<6;
    if(upperSurface && !p.light)Object.assign(p,subdivide(p,.65));
    p.light=Array.from(p.light||Array(p.vertices.length/6).fill(.96));
    p.surfaceTypes=Array.from(p.surfaceTypes||Array(p.vertices.length/6).fill(p.finish?.[3]??0));
    for(let i=0;i<p.vertices.length;i+=6) {
      const [x,y,z,,,nz]=p.vertices.slice(i,i+6);
      if(upperSurface&&z>5.998&&nz>.5) {
        const shade=x<10.65&&Math.abs(y)<2.8?.75:.94;
        p.light[i/6]=shade*contactShade(x,y,furnitureFootprints);p.surfaceTypes[i/6]=1;
      } else if(parts.includes(p)) {
        p.light[i/6]=p.role==='furniture'?.85:.9;
        if(p.sourceID==='SD_DCK_001'&&nz<-.5)p.surfaceTypes[i/6]=9;
      }
    }
  }
  const chunks=[];let offset=0;
  function store(values,Type=Float32Array){const a=Type.from(values),c=Buffer.from(a.buffer),d={offset,length:a.length};chunks.push(c);offset+=c.length;return d;}
  const packed=parts.map(p=>({id:p.id,sourceID:p.sourceID,feature:p.feature,role:p.role,bounds:p.bounds,finish:p.finish,
    vertices:store(p.vertices),indices:store(p.indices,Uint32Array)}));
  const profiles={},materials=createFinishes(0,true,true,true,true);
  try {
    for(const profile of ['exterior','interior','upper']) {
      const audit=[];
      const geometryTransform=p=>{
        const b=p.bounds||boundsOf(p.vertices),name=p.feature||p.name||'';
        const support=/teak tread|pale step|boarding landing|final riser|tread \d+ (pale inset|timber border|rounded timber edge)/.test(name);
        const stair=p.semanticParent==='stairs/aft'||p.id?.startsWith('MD_STA_013/');
        const near=profile==='upper'?b[5]>=5.88:profile==='interior'?b[3]>8.5&&b[2]<6:b[0]<8.5&&b[2]<6;
        const error=support||p.glass?0:stair?.004:near?.012:.08;
        const result=simplify(p,error);
        audit.push({id:p.id,sourceTriangles:p.indices.length/3,triangles:result.indices.length/3,error:result.lodError||0,support,stair});
        return result;
      };
      const boarding=createBoarding({group:new Group()},null,{gangwayOnly:true,includeLanding:true,materials,
        sternParts:createSternFeatures().parts,terraceParts:[...terrace,...saloon,...parts],geometryTransform});
      const batches=boarding.meshes.map(mesh=>({glass:mesh.material.transparent,
        attributes:Object.fromEntries(Object.entries(mesh.geometry.attributes).map(([name,a])=>[name,{...store(a.array),itemSize:a.itemSize}])),
        indices:store(mesh.geometry.index.array,Uint32Array)}));
      profiles[profile]={batches,triangles:boarding.stats.triangles,geometryBytes:batches.reduce((n,b)=>n+b.indices.length*4+Object.values(b.attributes).reduce((n,a)=>n+a.length*4,0),0),audit};
      boarding.dispose();
      console.log(profile,profiles[profile].triangles);
      if(profiles[profile].triangles>25000)throw Error(profile+' exceeds 25,000 triangles');
    }
  }finally{materials.opaque.dispose();materials.glass.dispose();model.dispose();}
  const compactFootprints=footprints=>[...new Map(footprints.map(({polygon})=>[JSON.stringify(polygon),{polygon}])).values()];
  const manifest={version:'spatial-correction-1',sourceSHA256:lower.manifest.sourceSHA256,parts:packed,profiles,floor,collisionFootprints:compactFootprints(collisionFootprints),
    room:{...data.rooms.find(r=>r.id==='UD_R01'),name:'Terraza superior',displayName:'Terraza superior',spawn:[8.35,2.21,7.6],look:[10.3,0,6.8]},
    navigationEnd:14.188,flight:{route:flight.route,surfaces:flight.surfaces,treadCount:flight.treadCount,riseCount:flight.riseCount,
      obstacles:flight.surfaces.map(s=>({height:s.height,footprints:compactFootprints(flight.clearance.footprints(s.height))}))}};
  return {manifest,binary:Buffer.concat(chunks),sources:{terrace,saloon,upper:parts}};
}
if(process.argv[1]===fileURLToPath(import.meta.url)) {
  const {manifest,binary}=await buildUpper();
  await writeFile(new URL('mobile/upper-terrace.json',root),JSON.stringify(manifest));
  await writeFile(new URL('mobile/upper-terrace.bin',root),binary);
  console.log(manifest.parts.length,'parts',binary.length,'download bytes');
}
