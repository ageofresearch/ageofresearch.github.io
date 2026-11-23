import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {buildBridge} from './build-yacht-bridge.mjs';
import {boundsOf,normalizeRenderedPart} from './build-yacht-saloon.mjs';
import {clipGeometry,contactShade} from './build-yacht-terrace.mjs';
import {renderedParts} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {bowRoom,bowEnd,bowRoute} from '../site/tidewater-rocha/mobile/bow-geometry.js';

export function bowLOD(p,{near,error,support,stair,profile}) {
  if(support||stair||p.glass)return {error};
  const b=p.bounds,name=p.feature||'',id=p.sourceID||p.anchor||p.id;
  const guard=name.startsWith('bow guard');
  if(guard)return {omit:/ post /.test(name)&&profile!=='bow'&&(profile!=='upper'||b[0]>18),error:.025,reason:'Distant guard posts; continuous coaming, glass and rail retained'};
  // These items are occluded by the solid UD/SD slabs from the bow route.
  const hiddenBelow=profile==='bow'&&/^MD_(FUR|SOF|SAN)_/.test(id)&&b[0]>=8.5&&b[5]<5.88;
  const hiddenTap=profile!=='sun'&&id==='SD_SAN_003';
  const reverseTransom=profile!=='exterior'&&/lettering|emblem|registry/.test(name);
  const distant=!near||p.role==='forward-context'&&!['upper','bow'].includes(profile);
  const decoration=/seam|stitch|screw|button|perforation|piping/.test(name)||
    p.role==='bridge-furniture'&&(/wheel|throttle|footrest|open polished helm|display|instrument bank|settee base/.test(name)||id==='UD_SOF_017');
  const hiddenForward=['exterior','interior'].includes(profile)&&p.role==='forward-context'&&/^UD_(FUR|SOF|EQU)_/.test(id);
  const omit=hiddenBelow||hiddenTap||reverseTransom||hiddenForward||distant&&decoration;
  return {omit,reason:hiddenBelow?'MD furniture occluded by the UD slab':hiddenTap?'Sun-deck tap above the solid slab':reverseTransom?'Reverse-facing transom lettering':hiddenForward?'Distant forward furnishings':'Distant finish detail',error:near&&name==='polished helm wheel rim'?0:distant?.4:
    profile==='bow'&&p.role==='forward-context'?.018:p.role?.startsWith('bridge-')?.012:profile==='exterior'?error:near&&profile==='upper'?.04:near?.014:error};
}

export async function buildBow({extend,lod,profileNames}={}) {
  return buildBridge({profileNames:profileNames||['exterior','upper','sun','bow'],
    lod:lod||bowLOD,
    extend({model,lowerParts,parts}) {
      const final=renderedParts(model),additions=[];
      for(const source of final) {
        if(source.feature?.startsWith('bow guard'))additions.push({...normalizeRenderedPart(source,model),role:'bow-guard',sourceID:source.anchor});
        if((source.anchor||source.id.split('/')[0])!=='UD_DCK_001'||source.bounds[2]>=6||source.bounds[5]>6.001)continue;
        const p=normalizeRenderedPart(source,model);
        for(const [label,box]of [['aft',[14.25,-3.8,5.87,17.91,-3.13,6.001]],['forward',[17.91,-3.8,5.87,18.72,-2.55,6.001]]]){
          const g=clipGeometry(p,box);if(!g.indices.length)continue;
          additions.push({...p,...g,id:p.id+'/bow-'+label,sourceID:'UD_DCK_001',role:'bow-floor',bounds:boundsOf(g.vertices)});
        }
      }
      const physical=model.bowFloor,contact=physical.collisionFootprints.filter(p=>/UD_(FUR|SOF)/.test(p.id));
      for(const p of [...parts,...additions]) {
        if(!additions.includes(p)&&p.role!=='bridge-floor')continue;
        p.light=Array.from(p.light||Array(p.vertices.length/6).fill(.96));
        p.surfaceTypes=Array.from(p.surfaceTypes||Array(p.vertices.length/6).fill(p.finish?.[3]??0));
        for(let i=0;i<p.vertices.length;i+=6){const [x,y,z,,,nz]=p.vertices.slice(i,i+6);
          if(z>5.998&&z<6.002&&nz>.5&&(p.role==='bow-floor'||physical.contains(x,y))){
            p.light[i/6]=.96*contactShade(x,y,contact);p.surfaceTypes[i/6]=1;
          }
        }
      }
      parts.push(...additions);
      const compact=[...new Map(physical.collisionFootprints.map(({polygon})=>[JSON.stringify(polygon),{polygon}])).values()];
      return {version:'stern-flag-region-1',room:{...model.asset.data.rooms.find(r=>r.id===bowRoom.id),...bowRoom},
        floor:physical.floor,collisionFootprints:compact,domains:physical.domains,navigationEnd:bowEnd,route:bowRoute,
        bowPartIDs:additions.map(p=>p.id),evidence:'Provisional starboard access and forward lounge; narrow bow and port connection remain pending',...extend?.({model,lowerParts,parts})};
    }
  });
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
  const {manifest,binary}=await buildBow(),root=new URL('../site/tidewater-rocha/mobile/',import.meta.url);
  await writeFile(new URL('bow-deck.json',root),JSON.stringify(manifest));
  await writeFile(new URL('bow-deck.bin',root),binary);
  console.log(manifest.bowPartIDs.length,'bow parts',binary.length,'bytes');
}
