import {detailError,packWalkProfile} from './yacht-geometry/profile-geometry.mjs';
import {splitFinishBoundaries} from './yacht-geometry/finish-boundaries.mjs';
import {orderOpaqueTriangles} from './yacht-geometry/opaque-order.mjs';
import {interiorFinishBounds} from '../site/tidewater-rocha/mobile/upper-interior-geometry.js';
import {bridgeFinishBounds} from '../site/tidewater-rocha/mobile/bridge-geometry.js';
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {buildUpper} from './build-yacht-upper.mjs';
import {boundsOf,mainDeckError,simplify,normalizeRenderedPart} from './build-yacht-saloon.mjs';
import {subdivide,contactShade} from './build-yacht-terrace.mjs';
import {buildYachtGeometry,createBoarding,createSternFeatures,createFinishes,resolveYachtPartFinish,i as Walk,l as basis} from '../site/tidewater-rocha/assets/RochaYachtState-P5KwIGIl.js';
import {A as Group} from '../site/tidewater-rocha/assets/common-HBn3Movl.js';
import {renderedParts} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
const root=new URL('../site/tidewater-rocha/',import.meta.url);
const compact=footprints=>[...new Map(footprints.map(({polygon})=>[JSON.stringify(polygon),{polygon}])).values()];
// LOD leaves unreferenced vertices behind. Compact every attribute together
// before upload; triangle order, positions, normals and lighting stay exact.
export function compactGeometry(part) {
  const finish=resolveYachtPartFinish(part);
  const remap=new Map(),vertices=[],light=[],surfaceTypes=[];
  const indices=Array.from(part.indices,index=>{
    if(!remap.has(index)){
      remap.set(index,vertices.length/6);vertices.push(...part.vertices.slice(index*6,index*6+6));
      light.push(part.light?.[index]??.96);surfaceTypes.push(part.surfaceTypes?.[index]??finish[3]);
    }
    return remap.get(index);
  });
  return {...part,vertices,indices,light,surfaceTypes};
}
export async function buildSun({extend,lod,profileNames=['exterior','upper','sun']}={}) {
  const lower=await buildUpper(),data=JSON.parse(await readFile(new URL('rocha/luz-de-mar/model.json',root))),b=await readFile(new URL('rocha/luz-de-mar/model.bin',root));
  const asset={data,binary:b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),nav:Object.fromEntries(Object.entries(data.nav).map(([k,n])=>[k,{...n,bits:Uint8Array.from(atob(n.mask),c=>c.charCodeAt(0))}]))};
  const model=buildYachtGeometry(asset,0,{mtuEngines:false,seaStrainers:false});model.asset=asset;model.group.userData={yacht:basis};
  new Walk({camera:{position:model.group.position}},model,{document:null});
  const final=renderedParts(model),flight=model.stairInventory.flights.find(f=>f.id==='sun');
  const corrected=new Map((model.interiorDetail.spatialCorrections||[]).flatMap(r=>r.parts.map(id=>[id,r.id])));
  // Replace the partial SD slab and stair with their complete shared assemblies.
  const lowerParts=Object.values(lower.sources).flat().filter(p=>!['SD_DCK_001','SD_STA_001'].includes(p.anchor||p.sourceID));
  const parts=final.filter(p=>(p.deck==='SD'||p.semanticParent==='stairs/sun')&&!['Cold_water','Hot_water','Drainage'].includes(p.category)).map(p=>({...normalizeRenderedPart(p,model),
    sourceID:p.anchor||p.id.split('/')[0],vertices:Array.from(p.vertices),indices:Array.from(p.indices),
    role:p.anchor==='SD_DCK_001'&&p.feature==='stair opening'?'floor':p.semanticParent==='stairs/sun'?'stair':p.feature?.startsWith('solarium guard')?'guard':p.semanticParent==='upper-equipment'?'equipment':'furniture'}));
  const collisionFootprints=compact(model.sunDeckFloor.collisionFootprints),floor=model.sunDeckFloor.floor;
  const furniture=parts.filter(p=>p.role==='furniture'),furnitureIDs=new Set(furniture.map(p=>p.id));
  const contact=model.sunDeckFloor.collisionFootprints.filter(p=>furnitureIDs.has(p.id));
  for(const p of parts) {
    if(p.role==='floor')Object.assign(p,subdivide(p,.65));
    p.light=[];p.surfaceTypes=[];
    for(let i=0;i<p.vertices.length;i+=6){const [x,y,z,,,nz]=p.vertices.slice(i,i+6);
      const covered=x>14.48&&x<19.82&&Math.abs(y)<2.37;
      p.light.push((covered?.77:.96)*(p.role==='floor'&&nz>.5?contactShade(x,y,contact):1));
      p.surfaceTypes.push(p.role==='floor'?(nz>.5?1:nz<-.5?9:0):p.finish?.[3]??0);
    }
  }
  const extension=extend?extend({model,lowerParts,parts}):{};
  const chunks=[];let offset=0;
  function store(values,Type=Float32Array){const a=Type.from(values),c=Buffer.from(a.buffer),d={offset,length:a.length};chunks.push(c);offset+=c.length;return d;}
  const packed=parts.map(p=>({id:p.id,sourceID:p.sourceID,feature:p.feature,role:p.role,bounds:p.bounds,finish:p.finish,glass:!!p.glass,
    vertices:store(p.vertices),indices:store(p.indices,Uint32Array)}));
  const profiles={},materials=createFinishes(0,true,true,true,true);
  try {
    for(const profile of profileNames) {
      const audit=[];
      const geometryTransform=p=>{
        const b=p.bounds||boundsOf(p.vertices),name=p.feature||p.name||'';
        const support=/teak tread|pale step|boarding landing|final riser|tread \d+ (pale inset|timber border|rounded timber edge)/.test(name);
        const stair=p.semanticParent?.startsWith('stairs/')||p.id?.startsWith('MD_STA_013/');
        const near=profile==='bow'?b[3]>=10.5&&b[2]>=5.87&&b[2]<7.7:profile==='sun'?b[5]>=8.08:profile==='upper'?b[5]>=5.88&&b[2]<8.08:b[2]<5.88;
        const error=support||p.glass?0:stair?.004:profile==='exterior'?mainDeckError(b):near?(profile==='upper'?.02:.012):.08;
        const choice=lod?.(p,{profile,near,error,support,stair})||{};
        const source=choice.geometry?{...p,...choice.geometry}:p;
        const reduced=choice.omit?{...p,indices:[]}:simplify(source,detailError(source,choice.error??error,profile),!support&&!stair&&!p.glass?['Permissive']:[]);
        const result=splitFinishBoundaries(reduced,{28:interiorFinishBounds,29:bridgeFinishBounds});
        const placement=corrected.has(p.id)&&result.indices.length?{
          correction:corrected.get(p.id),sourceBounds:b,
          renderedBounds:boundsOf([...new Set(result.indices)].flatMap(i=>result.vertices.slice(i*6,i*6+6)))}:{};
        audit.push({id:p.id,sourceTriangles:p.indices.length/3,triangles:result.indices.length/3,error:result.lodError||0,support,stair,...placement,...choice.omit&&choice.reason?{omission:choice.reason}:{}});return compactGeometry(result);
      };
      const boarding=createBoarding({group:new Group()},null,{gangwayOnly:true,includeLanding:true,materials,
        sternParts:createSternFeatures().parts,terraceParts:[...lowerParts,...parts],geometryTransform});
      if(profile==='upper'||profile==='guest'||profile==='exterior'||profile==='bow') {
        // The walks see several overlapping decks. Submit nearby opaque
        // surfaces first, so hidden patterned surfaces cost depth
        // tests instead of texture sampling. Ordering is baked, never per frame.
        const opaque=boarding.meshes.find(mesh=>!mesh.material.transparent).geometry;
        const guest=profile==='guest',bridgeAccess=!guest && Boolean(extension.accessPartIDs);
        const eye=profile==='exterior'?[0,4.8-basis.seaReference,1.6*basis.sx-basis.length/2]:
          profile==='bow'?[-2.6*basis.sy,7.6-basis.seaReference,22*basis.sx-basis.length/2]:guest?[-.1*basis.sy,3.15-basis.seaReference,16.8*basis.sx-basis.length/2]:
          bridgeAccess?[0,6.6-basis.seaReference,19*basis.sx-basis.length/2]:[0,7.6-basis.seaReference,15.5*basis.sx-basis.length/2];
        opaque.setIndex(Array.from(orderOpaqueTriangles(opaque.attributes.position.array,opaque.index.array,eye,
          guest||bridgeAccess? .25 : .5,Boolean(guest||bridgeAccess))));
      }
      profiles[profile]=packWalkProfile(boarding,profile,audit,store);
      boarding.dispose();console.log(profile,profiles[profile].triangles);

    }
  }finally{materials.opaque.dispose();materials.glass.dispose();model.dispose();}
  const over=Object.entries(profiles).filter(([,p])=>p.triangles>25000);
  if(over.length)throw Error(over.map(([id,p])=>id+': '+p.triangles).join(', ')+' exceeds 25,000 triangles');
  const manifest={version:'chair-fidelity-1',sourceSHA256:lower.manifest.sourceSHA256,profiles,parts:packed,floor,collisionFootprints,
    room:{...data.rooms.find(r=>r.id==='SD_R01'),name:'Solárium',displayName:'Solárium',spawn:[14.6,-.3,9.8],look:[17,0,9]},
    flight:{route:flight.route,surfaces:flight.surfaces,treadCount:flight.treadCount,riseCount:flight.riseCount,
      obstacles:flight.surfaces.map(s=>({height:s.height,footprints:compact(flight.clearance.footprints(s.height))}))},...extension};
  return {manifest,binary:Buffer.concat(chunks)};
}
if(process.argv[1]===fileURLToPath(import.meta.url)) {
  const {manifest,binary}=await buildSun();
  await writeFile(new URL('mobile/sun-deck.json',root),JSON.stringify(manifest));
  await writeFile(new URL('mobile/sun-deck.bin',root),binary);
  console.log(manifest.parts.length,'parts',binary.length,'bytes');
}
