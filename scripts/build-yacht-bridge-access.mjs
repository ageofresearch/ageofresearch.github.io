import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {buildBow,bowLOD} from './build-yacht-bow.mjs';
import {normalizeRenderedPart,boundsOf} from './build-yacht-saloon.mjs';
import {clipGeometry} from './build-yacht-terrace.mjs';
import {renderedParts} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {accessRoom,accessRoute} from '../site/tidewater-rocha/mobile/bridge-access-geometry.js';

const compact=rows=>[...new Map(rows.map(({polygon})=>[JSON.stringify(polygon),{polygon}])).values()];
export function accessLOD(p,context) {
  if(p.role?.startsWith('access-')||p.semanticParent==='stairs/bridge')return {error:0};
  const name=p.feature||'',profile=context.profile;
  if(profile==='upper'&&p.role==='furniture'&&/^MD_/.test(p.sourceID||p.anchor||'')&&p.bounds[3]>=17.1&&p.bounds[2]<6)
    return bowLOD(p,{...context,profile:'interior',near:true});
  if(profile==='upper'&&/hood fine folded louver lips|folded dark cockpit cloth/.test(name))
    return {omit:true,reason:'Fine vent lips (vent banks retained) and distant folded cockpit cloth'};
  if(profile==='upper'&&/cockpit wet bar recessed|cockpit wet bar dark circular drain/.test(name))
    return {omit:true,reason:'Distant recessed cockpit basin interior, below the upper-deck sightline'};
  if(profile!=='upper'&&/louver|circular control markings|polished latch rim|shell-shaped bowl|shade reinforced perimeter tape/.test(name)||
    profile!=='sun'&&/narrow housing joint/.test(name)||
    ['upper','sun','bow'].includes(profile)&&/cockpit wet bar inset polished sink rim/.test(name))
    return {omit:true,reason:'Distant fittings: hood vents, control marks, latches, bowl, shade trim, satellite joints or cockpit sink rim; main volumes retained'};
  if(name==='polished helm wheel rim'&&profile==='upper')return {error:.012};
  return bowLOD(p,context);
}
export async function buildBridgeAccess({extend,lod=accessLOD,profileNames}={}) {
  const result=await buildBow({
    profileNames,lod,
    extend({model,lowerParts,parts}) {
      const existing=new Set([...lowerParts,...parts].map(p=>p.id)),additions=[];
      const add=(source,role,box)=>{
        const p=normalizeRenderedPart(source,model),g=clipGeometry(p,box);
        if(!g.indices.length)return;
        const result={...p,...g,id:p.id+'/bridge-access',sourceID:p.anchor||p.id.split('/')[0],role,bounds:boundsOf(g.vertices)};
        result.light=Array(result.vertices.length/6).fill(.72);
        result.surfaceTypes=Array.from({length:result.vertices.length/6},(_,i)=>role==='access-floor'&&result.vertices[i*6+5]>.5?2:result.finish?.[3]??0);
        additions.push(result);
      };
      for(const p of renderedParts(model)){
        const id=p.anchor||p.id.split('/')[0];
        if(id==='MD_DCK_001')add(p,'access-floor',[17.83,-.3,3.83,19.72,1.85,3.951]);
        else if(/^MD_PAR_/.test(id))add(p,'access-boundary',[existing.has(p.id)?17.91:17.1,-.3,3.83,19.75,2,5.861]);
        else if(p.semanticParent==='stairs/guest'&&/enclosure|handrail/.test(p.feature))
          add(p,'access-guest-guard',[17.1,-2,3.83,19.75,1.85,5.61]);
      }
      parts.push(...additions);
      const physical=model.bridgeAccessFloor,flight=model.stairInventory.flights.find(f=>f.id==='bridge');
      return {version:'vr-detail-1',room:accessRoom,route:accessRoute,
        floor:physical.floor,collisionFootprints:compact(physical.collisionFootprints),domains:physical.domains,
        accessPartIDs:additions.map(p=>p.id),
        flight:{route:flight.route,surfaces:flight.surfaces,treadCount:flight.treadCount,riseCount:flight.riseCount,
          obstacles:flight.surfaces.map(s=>({height:s.height,footprints:compact(flight.clearance.footprints(s.height))}))},
        evidence:'Approved provisional local galley partition recess; guest stair and service rooms remain outside the mobile route',...extend?.({model,lowerParts,parts})};
    }
  });
  return result;
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
  const {manifest,binary}=await buildBridgeAccess(),root=new URL('../site/tidewater-rocha/mobile/',import.meta.url);
  await writeFile(new URL('bridge-access.json',root),JSON.stringify(manifest));
  await writeFile(new URL('bridge-access.bin',root),binary);
  console.log(manifest.accessPartIDs.length,'access parts',binary.length,'bytes');
}
