import {MeshoptSimplifier} from './yacht-geometry/node_modules/meshoptimizer/index.js';
import {aftOpeningGuardForMain} from './yacht-geometry/aft-cockpit-opening.mjs';
import {extractMainDeck} from './yacht-geometry/main-deck.mjs';
import {portCabin,cabinWalk} from '../site/tidewater-rocha/mobile/port-guest-cabin.js';
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
  const result=await buildBridgeAccess({profileNames:['exterior','upper','sun','bow','guest','main'],
    lod(p,context) {
      if(/flagpole|Panama flag cloth/.test(p.feature||''))return {error:0};
      if(p.role==='fore-stair')return ['main','bow','upper'].includes(context.profile)?{error:0}:{omit:true,reason:'Forward passage outside this deck view'};
      if(p.role==='stair-sightline')return context.profile==='guest'?{error:0}:{omit:true,reason:'Covered by the main deck outside the guest stair'};
      if(p.role==='service-bulkhead'||p.role==='stairwell-lining')return {error:0};
      if(p.role==='passage-floor')return {error:.014};
      if(context.profile==='main' && /^port mooring (?:polished support|socket |circular catch|satin upper coaming|broad end bracket)|^integrated mooring recess lower ledge/.test(p.feature))
        return {error:.014};
      if(p.role==='main-side-guard'||/^MD\/boarding-route\/[2-5]$/.test(p.id)||
        context.profile==='main'&&p.id.startsWith('MD/boarding-route/'))return {error:0};
      if(context.profile==='main' && /^UD_DCK_001\/video\/(?:connected-stairwell|stairwell-guard-posts)/.test(p.id)){
        // Draw the outboard side through the cut from the main deck. The
        // inboard side is hidden behind the broad return around the socket.
        return {error:0,geometry:aftOpeningGuardForMain(p)};
      }
      if(context.profile==='main'){
        if(p.context)return {error:0};
        if(p.role==='main-deck' && /salon (curved boucle module|lounge chair)/.test(p.feature))return {error:.004};
        if(p.feature==='suite single shaped navy carpet'||p.feature?.startsWith('suite cobalt writing chair '))return {error:0};
        if(/^suite (continuous navy welt|low warm berth trim)$/.test(p.feature))return {error:.002};
        if(p.role==='main-deck')return {error:p.glass?0:p.bounds[0]>=17.7?.004:.014};
        if(p.role==='guest-stair'||p.role==='bridge-stair-context')return {error:.012};
        if(p.role==='guest-boundary'||p.role==='guest-floor')return {error:.035};
        if(p.id.endsWith('/saloon')&&['roof','floor'].includes(p.role))return {error:.014};
        // This flat field carries the boards and foot joints analytically.
        // Allow its lighting mesh to absorb the changed chaise contact bake.
        if(p.role==='floor'&&p.id.endsWith('/cockpit-teak'))return {error:.057};
        if(p.bounds[3]<=8.50001&&p.bounds[2]<6)return {error:.045};
        return {omit:true,reason:'Covered by the main deck extraction or outside the main deck sightline'};
      }
      if(p.role==='main-deck')return {omit:true,reason:'Resident main-deck profile'};
      // Through the aft glass or up the guest stair the rolled upholstery is
      // small on screen. Reduce each pad separately, retaining its placement,
      // smooth normals and original vertices; the close main profile is above.
      if(['exterior','guest'].includes(context.profile)&&p.feature?.includes('diningWrap')){
        const [indices]=MeshoptSimplifier.simplify(Uint32Array.from(p.indices),
          Float32Array.from(p.vertices),6,Math.floor(p.indices.length*.36/3)*3,.024,
          ['ErrorAbsolute','Permissive']);
        return {error:0,geometry:{...p,indices:Array.from(indices)}};
      }
      const guest=p.role?.startsWith('guest-'),flight=p.semanticParent==='stairs/guest';
      if(context.profile==='guest') {
        // Upper-deck furniture is above two solid ceilings from this profile.
        if(/^(UD|SD)_(FUR|SOF|SAN|EQU)_/.test(p.sourceID||p.anchor||p.id))
          return {omit:true,reason:'Upper-deck furnishings above the enclosed guest stair and cabin'};
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
    extend({model,lowerParts,parts}) {
      // Complete source guards replace the previous top-only extraction.
      for(let i=parts.length-1;i>=0;i--)if(parts[i].role==='access-guest-guard')parts.splice(i,1);
      const additions=[],final=renderedParts(model);
      // The cockpit package stops at x=8.5. Restore the full port bulwark
      // and its cap to x=11.6 before drawing the rail seated on them.
      const coamings=new Map(final.filter(p=>p.id.startsWith('MD/boarding-route/')).map(p=>[p.id,p]));
      for(const [index,part] of lowerParts.entries()){
        const source=coamings.get(part.id);
        if(source&&part.bounds[3]<source.bounds[3]-.001)
          lowerParts[index]={...normalizeRenderedPart(source,model),role:part.role,sourceID:part.sourceID};
      }
      const add=(source,role,box,suffix='')=>{
        const p=normalizeRenderedPart(source,model),g=box?clipGeometry(p,box):{vertices:Array.from(p.vertices),indices:Array.from(p.indices)};
        if(!g.indices.length)return;
        const part={...p,...g,id:p.id+'/guest-access'+suffix,sourceID:p.anchor||p.id.split('/')[0],role,bounds:boundsOf(g.vertices)};
        if(role==='guest-boundary'||role==='guest-ceiling'||role==='guest-finish'){
          // Broad uniform wall triangles cannot interpolate a local lamp wash.
          // Subdivide just the distributor envelope, keeping its collision mesh.
          if(/^LD_PAR_0(?:27|28)\/guest-access$/.test(part.id)){
            const inward=part.id.startsWith('LD_PAR_027')?-1:1;
            const keep=[],facing=[];
            for(let i=0;i<part.indices.length;i+=3){
              const face=part.indices.slice(i,i+3);
              (face.every(k=>part.vertices[k*6+4]*inward>.9)?facing:keep).push(...face);
            }
            const refined=subdivide({...part,indices:facing},.73),base=part.vertices.length/6;
            part.vertices=part.vertices.concat(refined.vertices);
            part.indices=keep.concat(refined.indices.map(k=>k+base));
          }
          part.light=[];
          for(let i=0;i<part.vertices.length;i+=6){
            const [x,y,z]=part.vertices.slice(i,i+3);
            const lamp=Math.min(...[13.97,15.27,16.57].map(l=>(x-l)**2))+(y+.10)**2;
            const near=Math.exp(-lamp/.48),height=Math.min(1,Math.max(0,(z-1.55)/2.28));
            part.light.push(.72+.31*height+.48*near*(.32+.68*height));
          }
        }else if(role==='guest-cabin'){
          part.light=Array.from({length:part.vertices.length/6},(_,k)=>{
            const y=part.vertices[k*6+1],z=part.vertices[k*6+2];
            if(part.materialID==='M107')return 1.32;
            return .84+.14*Math.max(0,Math.min(1,(y-.45)/3))+.06*Math.min(1,(z-1.55)/2.2);
          });
        }else part.light=Array(part.vertices.length/6).fill(.7);
        part.surfaceTypes=Array.from({length:part.vertices.length/6},(_,i)=>{
          const nz=part.vertices[i*6+5];
          const slab=part.sourceID==='MD_DCK_001'&&['guest-ceiling','guest-cabin','stair-sightline'].includes(role);
          return slab&&nz<-.5?9:part.finish?.[3]??0;
        });
        additions.push(part);
      };
      for(const p of final) {
        const id=p.anchor||p.id.split('/')[0];
        const cabinFurniture=/^LD_(FUR_00[1-4]|SOF_00[1-3])$/.test(id);
        // Complete the main-deck envelope that stays visible above the curved
        // parapet. Earlier saloon and bridge packages own the opposite
        // halves of these cuts at x=17.91 and y=-.30 respectively.
        if (/^MD_PAR_00[23]$/.test(id))
          add(p,'stair-sightline',[17.91,-4,3.81,22.4,4,5.88]);
        else if(p.feature==='corridor return wall')
          add(p,'stair-sightline',[17.91,-4,3.81,22.4,-.3,5.88]);
        else if (/^MD_(PAR_01[02]|EQU_002)$/.test(id))
          add(p,'stair-sightline');
        if(cabinFurniture||p.feature?.startsWith('port cabin '))add(p,'guest-cabin');
        else if(/^HULL_GLA_00[12]$/.test(id))add(p,'guest-cabin',[14.30,3.60,2.40,17.82,3.81,3.21]);
        else if(p.feature?.startsWith('lower lobby '))add(p,'guest-finish');
        else if(p.semanticParent==='stairs/guest')add(p,'guest-stair');
        else if(id==='LD_DCK_001'){
          add(p,'guest-floor',[13.17,-2.26,1.429,19.8,.65,1.551]);
          add(p,'guest-cabin',[14.26,.65,1.429,17.86,3.61,1.551],'-cabin');
        }

        else if(/^LD_PAR_00[5-9]$/.test(id))add(p,'guest-cabin');
        else if(p.deck==='LD'&&/^LD_(PAR|GLA)_/.test(id))add(p,'guest-boundary',[13.17,-2.26,1.55,19.8,.65,3.831]);
        else if(id==='LD_MAC_001')add(p,'guest-boundary',[13.15,-.75,1.55,13.35,.65,3.831]);
        else if(id==='MD_DCK_001') {
          // Reuse the bridge floor and guest ceiling, filling only their missing
          // perimeter and the Float32 underside clipped off the bridge floor.
          add(p,'stair-sightline',[17.83,-3.02,3.829,19.72,-2.26,3.951],'-outboard');
          add(p,'stair-sightline',[19.72,-3.02,3.829,22.4,1.85,3.951],'-forward');
          add(p,'guest-ceiling',[17.83,-2.26,3.829,19.72,-.3,3.951]);
          // Earlier MD extraction starts at 3.83, just above the Float32
          // underside (3.8299999237), and contains no bottom faces. Recover
          // only that missing source surface, without a second MD floor.
          const indices=[];
          for(let i=0;i<p.indices.length;i+=3) {
            const face=Array.from(p.indices.slice(i,i+3));
            if(face.every(k=>Math.abs(p.vertices[k*6+2]-3.83)<.002&&p.vertices[k*6+5]<-.5))indices.push(...face);
          }
          add({...p,indices},'stair-sightline',[17.83,-.3,3.829,19.72,.65,3.831],'-bridge-underside');
          add({...p,indices},'stair-sightline',[17.86,.65,3.829,19.72,1.85,3.831],'-bridge-inboard');
          add({...p,indices},'guest-cabin',[14.26,.65,3.829,17.86,3.61,3.831],'-cabin');
          add({...p,indices},'guest-ceiling',[13.17,-2.26,3.829,17.83,.65,3.831],'-underside');
        }
      }
      parts.push(...additions,...extractMainDeck(model));
      const physical=model.guestFloor,flight=model.stairInventory.flights.find(f=>f.id==='guest');
      return {mainDeck:model.mainDeck,version:'owner-writing-chair-1',room:guestRoom,cabin:portCabin,cabinRoute:cabinWalk,landings:guestLandings,domains:guestDomains,guestPartIDs:additions.map(p=>p.id),
        accessPartIDs:parts.filter(p=>p.role?.startsWith('access-')).map(p=>p.id),
        route:[...guestApproach,...flight.route.path.toReversed(),guestLandings.lower,[16.8,-.1],[13.7,-.1]],
        floor:physical.floor,collisionFootprints:compact(physical.collisionFootprints),
        flight:{route:flight.route,surfaces:flight.surfaces,treadCount:flight.treadCount,riseCount:flight.riseCount,
          obstacles:flight.surfaces.map(s=>({height:s.height,footprints:compact(flight.clearance.footprints(s.height))}))},
        evidence:'VRCloud Grande 36M main-deck and port guest cabin stations; fittings and passage alignments estimated against the existing model. Unseen compartments and lower-deck forward passages remain pending.'};
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
