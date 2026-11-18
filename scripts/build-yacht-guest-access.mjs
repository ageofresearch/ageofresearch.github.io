import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {buildBridgeAccess,accessLOD} from './build-yacht-bridge-access.mjs';
import {normalizeRenderedPart,boundsOf} from './build-yacht-saloon.mjs';
import {clipGeometry,subdivide} from './build-yacht-terrace.mjs';
import {renderedParts} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {guestRoom,guestLandings,guestDomains,guestApproach} from '../site/tidewater-rocha/mobile/guest-access-geometry.js';

const compact=rows=>[...new Map(rows.map(({polygon})=>[JSON.stringify(polygon),{polygon}])).values()];
export async function buildGuestAccess() {
  const covers=new Map();
  const result=await buildBridgeAccess({profileNames:['exterior','upper','sun','bow','guest'],
    lod(p,context) {
      const guest=p.role?.startsWith('guest-'),flight=p.semanticParent==='stairs/guest';
      if(context.profile==='guest') {
        if(guest||flight)return {error:0};
        // Retain the saloon entrance and vestibule around the profile portal.
        const near=p.bounds[3]>=15.8&&p.bounds[0]<=20&&p.bounds[2]<6;
        return accessLOD(p,{...context,profile:'interior',near,error:near?.012:.4});
      }
      if(flight) {
        if(/enclosure|handrail/.test(p.feature)) {
          if(!covers.has(p.id))covers.set(p.id,clipGeometry(p,[16.5,-2.3,3.83,19.8,.8,5.6]));
          return {error:0,geometry:covers.get(p.id)};
        }
        if(/^tread 14 /.test(p.feature))return {error:0};
        return {omit:true,reason:'Lower guest stair below the MD slab; full detail is resident in guest before the portal'};
      }
      if(guest&&p.role!=='guest-ceiling')return {omit:true,reason:'Lower distributor occluded by the MD slab outside the guest profile'};
      if(p.id.endsWith('-underside'))return {omit:true,reason:'Recovered MD underside is occluded from the other five walk domains'};
      if(p.role==='guest-ceiling')return {error:0};
      if(context.profile==='upper'&&p.feature==='three flush circular control markings')
        return {omit:true,reason:'Small printed cockpit control marks; control panel and cabinet remain'};
      return accessLOD(p,context);
    },
    extend({model,parts}) {
      // Complete source guards replace the previous top-only extraction.
      for(let i=parts.length-1;i>=0;i--)if(parts[i].role==='access-guest-guard')parts.splice(i,1);
      const additions=[],final=renderedParts(model);
      const add=(source,role,box,suffix='')=>{
        const p=normalizeRenderedPart(source,model),g=box?clipGeometry(p,box):{vertices:Array.from(p.vertices),indices:Array.from(p.indices)};
        if(!g.indices.length)return;
        const part={...p,...g,id:p.id+'/guest-access'+suffix,sourceID:p.anchor||p.id.split('/')[0],role,bounds:boundsOf(g.vertices)};
        if(role==='guest-boundary'||role==='guest-ceiling'||role==='guest-finish'){
          // Broad uniform wall triangles cannot interpolate a local lamp wash.
          // Subdivide just the distributor envelope, keeping its collision mesh.
          if(/^LD_PAR_0(?:27|28)\/guest-access$/.test(part.id)||part.feature?.includes('bookmatched door'))
            Object.assign(part,subdivide(part,.66));
          part.light=[];
          for(let i=0;i<part.vertices.length;i+=6){
            const [x,y,z]=part.vertices.slice(i,i+3);
            const lamp=Math.min(...[13.97,15.27,16.57].map(l=>(x-l)**2))+(y+.10)**2;
            const near=Math.exp(-lamp/.48),height=Math.min(1,Math.max(0,(z-1.55)/2.28));
            part.light.push(.72+.31*height+.48*near*(.32+.68*height));
          }
        }else part.light=Array(part.vertices.length/6).fill(.7);
        part.surfaceTypes=Array.from({length:part.vertices.length/6},(_,i)=>{
          const nz=part.vertices[i*6+5];
          return role==='guest-ceiling'&&nz<-.5?9:part.finish?.[3]??0;
        });
        additions.push(part);
      };
      for(const p of final) {
        const id=p.anchor||p.id.split('/')[0];
        if(p.feature?.startsWith('lower lobby '))add(p,'guest-finish');
        else if(p.semanticParent==='stairs/guest')add(p,'guest-stair');
        else if(id==='LD_DCK_001')add(p,'guest-floor',[13.17,-2.26,1.429,19.8,.65,1.551]);

        else if(p.deck==='LD'&&/^LD_(PAR|GLA)_/.test(id))add(p,'guest-boundary',[13.17,-2.26,1.55,19.8,.65,3.831]);
        else if(id==='LD_MAC_001')add(p,'guest-boundary',[13.15,-.75,1.55,13.35,.65,3.831]);
        else if(id==='MD_DCK_001') {
          add(p,'guest-ceiling',[17.83,-2.26,3.829,19.72,-.3,3.951]);
          // Earlier MD extraction starts at 3.83, just above the Float32
          // underside (3.8299999237), and contains no bottom faces. Recover
          // only that missing source surface, without a second MD floor.
          const indices=[];
          for(let i=0;i<p.indices.length;i+=3) {
            const face=Array.from(p.indices.slice(i,i+3));
            if(face.every(k=>Math.abs(p.vertices[k*6+2]-3.83)<.002&&p.vertices[k*6+5]<-.5))indices.push(...face);
          }
          add({...p,indices},'guest-ceiling',[13.17,-2.26,3.829,17.83,.65,3.831],'-underside');
        }
      }
      parts.push(...additions);
      const physical=model.guestFloor,flight=model.stairInventory.flights.find(f=>f.id==='guest');
      return {room:guestRoom,landings:guestLandings,domains:guestDomains,guestPartIDs:additions.map(p=>p.id),
        accessPartIDs:parts.filter(p=>p.role?.startsWith('access-')).map(p=>p.id),
        route:[...guestApproach,...flight.route.path.toReversed(),guestLandings.lower,[16.8,-.1],[13.7,-.1]],
        floor:physical.floor,collisionFootprints:compact(physical.collisionFootprints),
        flight:{route:flight.route,surfaces:flight.surfaces,treadCount:flight.treadCount,riseCount:flight.riseCount,
          obstacles:flight.surfaces.map(s=>({height:s.height,footprints:compact(flight.clearance.footprints(s.height))}))},
        evidence:'Provisional shared guest stair and aft distributor; cabins, forward passage and service access remain pending'};
    }
  });
  return result;
}
if(process.argv[1]===fileURLToPath(import.meta.url)) {
  const {manifest,binary}=await buildGuestAccess(),root=new URL('../site/tidewater-rocha/mobile/',import.meta.url);
  await writeFile(new URL('guest-access.json',root),JSON.stringify(manifest));
  await writeFile(new URL('guest-access.bin',root),binary);
  console.log(manifest.guestPartIDs.length,'guest access parts',binary.length,'bytes');
}
