import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {buildUpperInterior} from './build-yacht-upper-interior.mjs';
import {boundsOf,normalizeRenderedPart} from './build-yacht-saloon.mjs';
import {clipGeometry,subdivide,contactShade} from './build-yacht-terrace.mjs';
import {renderedParts} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {bridgeRoom} from '../site/tidewater-rocha/mobile/bridge-geometry.js';

export async function buildBridge({extend,lod,profileNames}={}) {
  return buildUpperInterior({profileNames,
    lod:lod||function(p,{near,error,support,stair,profile}) {
      if(support||stair||p.glass)return {error};
      if(p.semanticParent==='bow-deck'&&!p.feature?.startsWith('bow guard'))return {omit:['exterior','interior'].includes(profile),error:.08};
      if(near&&p.feature==='polished helm wheel rim')return {error:0};
      const distant=!near||p.role==='forward-context'&&profile!=='upper';
      const decoration=/seam|stitch|screw|button|perforation|piping/.test(p.feature||'')||
        p.role==='bridge-furniture'&&(/wheel|throttle|footrest|open polished helm|display|instrument bank|settee base/.test(p.feature||'')||p.sourceID==='UD_SOF_017');
      const hiddenForward=['exterior','interior'].includes(profile)&&p.role==='forward-context'&&/^UD_(FUR|SOF|EQU)_/.test(p.sourceID);
      return {omit:hiddenForward||distant&&decoration,error:distant?.4:p.role?.startsWith('bridge-')?.012:profile==='exterior'?error:near&&profile==='upper'?.04:near?.014:error};
    },
    extend({model,lowerParts,parts}) {
      const final=renderedParts(model),additions=[],existing=new Set([...lowerParts,...parts].map(p=>p.id));
      const add=(source,role,box=null)=>{
        const p=normalizeRenderedPart(source,model),g=box?clipGeometry(p,box):p;
        if(!g.indices.length)return;
        const id=box?p.id+'/bridge-helm':p.id;
        if(existing.has(id))return;existing.add(id);
        const result={...p,...g,id,role,sourceID:p.anchor||p.id.split('/')[0],bounds:boundsOf(g.vertices)};
        if(role==='bridge-floor')Object.assign(result,subdivide(result,.65));
        additions.push(result);
      };
      for(const p of final) {
        const anchor=p.anchor||p.id.split('/')[0];
        if(p.feature?.startsWith('bow guard'))continue;
        if(/^UD_(?:FUR_0(?:38|39|40|41|42)|SOF_01[78]|EQU_00[1-5]|GLA_00[5-9]|GLA_01[0-2])$/.test(anchor))add(p,'bridge-furniture');
        else if(p.semanticParent==='stairs/bridge')add(p,'bridge-stair-context');
        else if(p.deck==='UD'&&p.bounds[0]>=23.72&&!['Cold_water','Hot_water','Drainage','Stairs'].includes(p.category))add(p,'forward-context');
        else if(anchor==='UD_SUP_001')add(p,'bridge-roof',[18.72,-2.55,7.65,23.73,2.14,7.81]);
        else if(anchor==='UD_DCK_001'&&p.bounds[2]<6&&p.bounds[5]<=6.001)
          add(p,'bridge-floor',[18.72,-3.8,5.87,35.9,3.8,6.001]);
        else if(anchor==='UD_DCK_001'&&p.bounds[2]>7.65&&p.bounds[3]>18.72&&p.bounds[0]<23.73)
          add(p,'bridge-fixture',[18.72,-2.55,6,23.73,2.14,7.81]);
        else if(anchor==='HULL_HUL_001')add(p,'forward-context',[23.72,-3.8,4.9,36.01,3.8,6.01]);
        // Retain the existing reveal of the bridge stair opening, not a cap.
        else if(anchor==='UD_DCK_001'&&p.feature==='single white opening reveal')
          add(p,'bridge-boundary',[18.72,-2.55,5.87,23.73,2.14,7.65]);
      }
      const physical=model.bridgeFloor,contact=physical.collisionFootprints.filter(p=>/UD_(FUR|SOF)/.test(p.id));
      for(const p of additions) {
        p.light=[];p.surfaceTypes=[];
        for(let i=0;i<p.vertices.length;i+=6){const [x,y,z,,,nz]=p.vertices.slice(i,i+6);
          const floor=p.role==='bridge-floor'&&z>5.998&&nz>.5,inside=x<23.73;
          p.light.push(floor&&inside?(.72+.1*Math.min(1,Math.abs(y)/2.5))*contactShade(x,y,contact):p.role==='bridge-roof'?.82:inside?.85:.96);
          p.surfaceTypes.push(floor?29:p.role==='bridge-roof'&&nz<-.5?9:p.finish?.[3]??0);
        }
      }
      parts.push(...additions);
      const compact=[...new Map(physical.collisionFootprints.map(({polygon})=>[JSON.stringify(polygon),{polygon}])).values()];
      return {version:'stern-flag-region-1',room:{...model.asset.data.rooms.find(r=>r.id===bridgeRoom.id),...bridgeRoom},
        floor:physical.floor,collisionFootprints:compact,domains:physical.domains,
        bridgePartIDs:additions.map(p=>p.id),evidence:'Current provisional bridge and forward layout; forward deck and internal stair are visual context only',...extend?.({model,lowerParts,parts})};
    }
  });
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
  const {manifest,binary}=await buildBridge(),root=new URL('../site/tidewater-rocha/mobile/',import.meta.url);
  await writeFile(new URL('bridge-helm.json',root),JSON.stringify(manifest));
  await writeFile(new URL('bridge-helm.bin',root),binary);
  console.log(manifest.bridgePartIDs.length,'bridge/context parts',binary.length,'bytes');
}
