import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {buildSun} from './build-yacht-sun.mjs';
import {boundsOf,normalizeRenderedPart} from './build-yacht-saloon.mjs';
import {clipGeometry,subdivide,contactShade} from './build-yacht-terrace.mjs';
import {renderedParts} from '../site/tidewater-rocha/mobile/stair-surfaces.js';
import {interiorLimits,interiorRoom,interiorFinishBounds} from '../site/tidewater-rocha/mobile/upper-interior-geometry.js';

const root=new URL('../site/tidewater-rocha/mobile/',import.meta.url);
export async function buildUpperInterior({extend,profileNames,lod=(p,{profile,near,error,support,stair})=>({error:profile==='interior'&&near&&!support&&!stair&&!p.glass?Math.max(error,.013):error})}={}) {
  return buildSun({lod,profileNames,extend({model,lowerParts,parts}) {
    const final=renderedParts(model),additions=[],existing=new Set([...lowerParts,...parts].map(p=>p.id));
    const add=(source,role,box=null)=>{
      const p=normalizeRenderedPart(source,model),g=box?clipGeometry(p,box):p;
      if(!g.indices.length)return;
      const id=box?p.id+'/upper-interior':p.id;
      if(existing.has(id))throw Error('Duplicate interior component '+id);existing.add(id);
      const result={...p,...g,id,sourceID:p.anchor||p.id.split('/')[0],role,bounds:boundsOf(g.vertices)};
      if(role==='interior-floor')Object.assign(result,subdivide(result,.65));
      additions.push(result);
    };
    for(const p of final) {
      const anchor=p.anchor||p.id.split('/')[0];
      if(['UD_GLA_003','UD_GLA_004','UD_PAR_001','UD_FUR_037'].includes(anchor))
        add(p,anchor==='UD_FUR_037'?'interior-furniture':p.glass||p.category==='Glazing'?'interior-glazing':'interior-boundary');
      else if(anchor==='UD_SUP_001')add(p,'interior-roof',[14.25,-2.55,7.65,18.72,2.14,7.81]);
      else if(anchor==='UD_DCK_001'&&p.bounds[2]<6&&p.bounds[5]<=6.001)
        add(p,'interior-floor',[17.91,-2.55,5.87,18.72,2.14,6.001]);
      else if(anchor==='UD_DCK_001'&&p.bounds[2]>7.65&&p.bounds[3]>14.25&&p.bounds[0]<18.72)
        add(p,'interior-fixture',[14.25,-2.55,6,18.72,2.14,7.81]);
    }
    const physical=model.upperInteriorFloor,contact=physical.collisionFootprints.filter(p=>p.id==='UD_FUR_037');
    for(const p of [...lowerParts,...additions]) {
      const added=additions.includes(p),floor=['roof','floor','interior-floor'].includes(p.role)&&p.bounds[2]<6&&p.bounds[5]>=5.999;
      if(!added&&!floor)continue;
      p.light=Array.from(p.light||Array(p.vertices.length/6).fill(.85));
      p.surfaceTypes=Array.from(p.surfaceTypes||Array(p.vertices.length/6).fill(p.finish[3]));
      for(let i=0;i<p.vertices.length;i+=6) {
        const [x,y,z,,,nz]=p.vertices.slice(i,i+6);
        if(floor&&z>5.998&&nz>.5) {
          // One slab, two existing finishes. The final builder splits triangles
          // at the doorway/window planes after LOD, keeping the joint exact.
          p.surfaceTypes[i/6]=28;
          const b=interiorFinishBounds;
          if(x>=b.start&&x<=b.end&&y>=b.minY&&y<=b.maxY)
            p.light[i/6]=(.7+.12*Math.min(1,Math.abs(y)/2.5))*contactShade(x,y,contact);
        }else if(p.role==='interior-roof'&&nz<-.5){p.light[i/6]=.82;p.surfaceTypes[i/6]=9;}
      }
    }
    parts.push(...additions);
    const compact=polygons=>[...new Map(polygons.map(({polygon})=>[JSON.stringify(polygon),{polygon}])).values()];
    return {version:'gangway-teak-1',room:{...model.asset.data.rooms.find(r=>r.id==='UD_R02'),...interiorRoom},
      floor:physical.floor,collisionFootprints:compact(physical.collisionFootprints),limits:interiorLimits,
      interiorPartIDs:additions.map(p=>p.id),evidence:'Current shared layout; flush threshold is a model circulation correction',
      ...extend?.({model,lowerParts,parts})};
  }});
}
if(process.argv[1]===fileURLToPath(import.meta.url)) {
  const {manifest,binary}=await buildUpperInterior();
  await writeFile(new URL('upper-interior.json',root),JSON.stringify(manifest));
  await writeFile(new URL('upper-interior.bin',root),binary);
  console.log(manifest.interiorPartIDs.length,'interior parts',binary.length,'bytes');
}
