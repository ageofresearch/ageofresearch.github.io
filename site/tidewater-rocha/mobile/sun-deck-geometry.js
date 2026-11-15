// Shared source-coordinate additions. R03 placement is provisional, not a survey.
import {surfaceTriangles,obstacles,renderedParts} from './stair-surfaces.js?v=sun-deck-1';
import {indexFootprints} from './terrace-geometry.js?v=sun-deck-1';
const ring=Array.from({length:32},(_,i)=>[Math.cos(i*Math.PI/16),Math.sin(i*Math.PI/16)]);
export function supportedFloor(floor,footprints) {
  const support=indexFootprints(floor.map(polygon=>({polygon}))),hit=indexFootprints(footprints);
  return (x,y,r=.14)=>!hit(x,y,r)&&support(x,y,1e-6)&&ring.every(([a,b])=>support(x+a*r,y+b*r,1e-6));
}
export function describeSunFloor(model) {
  const parts=renderedParts(model),slab=parts.filter(p=>p.anchor==='SD_DCK_001'&&p.feature==='stair opening'),floor=slab.flatMap(p=>surfaceTriangles(p,8.2,.002));
  const clearance=obstacles(parts,new Set(),[10.5,-3,8.2,20.1,3.3,9.85]);
  const collisionFootprints=clearance.footprints(8.2);
  return {floor,collisionFootprints,floorSafe:supportedFloor(floor,collisionFootprints)};
}
// Splitting collinear edges handles the T junctions introduced by cutting the slab.
function boundary(floor) {
  const points=floor.flat(),support=indexFootprints(floor.map(polygon=>({polygon}))),seen=new Set(),result=[];
  for(const poly of floor)for(let i=0;i<poly.length;i++) {
    const a=poly[i],b=poly[(i+1)%poly.length],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy);
    if(len<1e-6)continue;
    const ts=[0,1];
    for(const p of points)if(Math.abs(dx*(p[1]-a[1])-dy*(p[0]-a[0]))<1e-6*len) {
      const t=((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(len*len);if(t>1e-6&&t<1-1e-6)ts.push(t);
    }
    const sorted=[...new Set(ts.map(t=>+t.toFixed(8)))].sort((a,b)=>a-b);
    for(let j=1;j<sorted.length;j++) {
      const start=[a[0]+dx*sorted[j-1],a[1]+dy*sorted[j-1]],end=[a[0]+dx*sorted[j],a[1]+dy*sorted[j]],mid=start.map((v,k)=>(v+end[k])/2),normal=[-dy/len,dx/len];
      const l=support(mid[0]+normal[0]*.002,mid[1]+normal[1]*.002,0),r=support(mid[0]-normal[0]*.002,mid[1]-normal[1]*.002,0);
      if(l===r)continue;
      const pair=l?[start,end]:[end,start],key=pair.flat().map(v=>v.toFixed(5)).join(',');
      if(!seen.has(key)){seen.add(key);result.push(pair);}
    }
  }
  // Merge collinear spans before constructing panels/posts; triangulation must
  // not decide the number of guard assemblies.
  let changed=true;
  while(changed){changed=false;outer:for(let i=0;i<result.length;i++)for(let j=0;j<result.length;j++)if(i!==j){
    const [a,b]=result[i],[c,d]=result[j];
    if(Math.hypot(b[0]-c[0],b[1]-c[1])<1e-5&&Math.abs((b[0]-a[0])*(d[1]-c[1])-(b[1]-a[1])*(d[0]-c[0]))<1e-5){result[i]=[a,d];result.splice(j,1);changed=true;break outer;}
  }}
  return result;
}
export function refineSunDeck(detail,exterior,asset,{box,slab,tube,pathTube,bounds,materials}) {
  if(!detail||!exterior)return;
  const sources=asset.data.meshes.filter(p=>p.deck==='SD'),byID=new Map(sources.map(p=>[p.id,p]));
  const make=(anchor,geometry,materialID,feature,extra={})=>({...geometry,id:anchor+'/sun/'+feature.replaceAll(' ','-'),anchor,
    sourceIDs:[anchor],deck:'SD',interior:false,feature,materialID,finish:materials[materialID],bounds:bounds(geometry),
    semanticParent:'SD_R01',evidence:'Provisional R03 layout; inferred finish and guards',...extra});
  for(const s of sources) {
    if(!['Furniture','Soft_furnishing'].includes(s.category)||s.id==='SD_FUR_007')continue;
    const b=s.bbox,cushion=s.category==='Soft_furnishing'||/back/.test(s.name),base=/plinth|base/.test(s.name);
    const radius=Math.min(cushion?.06:.025,(b[3]-b[0])/5,(b[4]-b[1])/5,(b[5]-b[2])/3);
    const material=cushion?'M39':base?'M43':s.id==='SD_FUR_008'?'M37':'M24';
    detail.replacements.set(s.id,[make(s.id,box(b,radius),material,s.name.toLowerCase())]);
  }
  // The table retains its oval source outline; only its material is reconciled.
  for(const id of ['SD_FUR_007','SD_SAN_001','SD_SAN_002','SD_SAN_003']) {
    const s=byID.get(id),geometry={vertices:Array.from(new Float32Array(asset.binary,s.vByte,s.vCount*6)),indices:Array.from(new Uint16Array(asset.binary,asset.data.vertexBytes+s.iByte,s.iCount))};
    detail.replacements.set(id,[make(id,geometry,id==='SD_SAN_003'?'M19':'M24',s.name.toLowerCase())]);
  }
  const floor=detail.replacements.get('SD_DCK_001').flatMap(p=>surfaceTriangles(p,8.2,.002));
  const edges=boundary(floor),support=indexFootprints(floor.map(polygon=>({polygon}))),guards=[];
  // The original equipment feet sat outside the narrowing SD slab. Retain
  // the roof connections and seat each lower foot on this actual surface.
  for(const part of exterior.parts.filter(p=>/^raked hardtop support /.test(p.feature||''))) {
    const sign=part.bounds[1]<0?-1:1;let foot=2.2;
    const seated=y=>ring.every(([a,b])=>support(18.96+a*.085,sign*y+b*.085,1e-6));
    while(foot>0&&!seated(foot))foot-=.01;
    if(!seated(foot))throw Error('No supported solarium hardtop foot');
    const geometry=pathTube([[18.96,sign*foot,8.2],[18.78,sign*(foot+(2.2-foot)*.35),8.65],
      [18.38,sign*2.2,9.6],[18.2,sign*2.2,10.3]],.085,8);
    Object.assign(part,geometry,{bounds:bounds(geometry),assemblyEnvelope:bounds(geometry),
      contact:'Lower foot seated inside the SD floor; roof connection retained',dimensionStatus:'model-fit, not surveyed'});
  }

  const inward=([a,b])=>{const d=Math.hypot(b[0]-a[0],b[1]-a[1]);return [-(b[1]-a[1])/d,(b[0]-a[0])/d];};
  const inset=(point,normal,other)=>{
    const n=other?inward(other):normal,denom=1+n[0]*normal[0]+n[1]*normal[1];
    return point.map((v,k)=>v+.07*(normal[k]+n[k])/Math.max(.1,denom));
  };
  let count=0;const posts=new Set();
  for(const [a,b]of edges) {
    const len=Math.hypot(b[0]-a[0],b[1]-a[1]),normal=[-(b[1]-a[1])/len,(b[0]-a[0])/len];
    // Keep the existing top tread/landing mouth clear. The rail of the flight
    // already protects this opening; never add a panel across its arrival.
    const startCorner=inset(a,normal,edges.find(e=>Math.hypot(e[1][0]-a[0],e[1][1]-a[1])<1e-5));
    const endCorner=inset(b,normal,edges.find(e=>Math.hypot(e[0][0]-b[0],e[0][1]-b[1])<1e-5));
    const spans=Math.ceil(len/1.25);
    for(let i=0;i<spans;i++) {
      let start=startCorner.map((v,k)=>v+(endCorner[k]-v)*i/spans),end=startCorner.map((v,k)=>v+(endCorner[k]-v)*(i+1)/spans);
      if(Math.abs(a[1]-1.02)<.003&&Math.abs(b[1]-1.02)<.003) {
        if(Math.min(start[0],end[0])>13.42)continue;
        if(Math.max(start[0],end[0])>13.42){const t=(13.42-start[0])/(end[0]-start[0]);const p=start.map((v,k)=>v+t*(end[k]-v));if(start[0]>end[0])start=p;else end=p;}
      }
      if(Math.hypot(end[0]-start[0],end[1]-start[1])<.035)continue;
      const cross=half=>[start.map((v,k)=>v+normal[k]*half),end.map((v,k)=>v+normal[k]*half),end.map((v,k)=>v-normal[k]*half),start.map((v,k)=>v-normal[k]*half)];
      if(!cross(.048).every(p=>support(...p,.001)))throw Error('Unsupported solarium guard '+JSON.stringify([start,end]));
      const add=(g,m,f,extra={})=>{const p=make('SD_DCK_001',g,m,`solarium guard ${count} ${f}`,extra);guards.push(p);detail.additions.push(p);};
      add(slab(cross(.048),8.205,8.4,0),'M37','white coaming');
      add(slab(cross(.004),8.45,9.19,0),'M37','clear panel',{glass:true});
      add(tube([...start,9.22],[...end,9.22],.018,.018,8),'M19','cap rail');
      for(const [j,p]of [start,end].entries()){const key=p.map(v=>v.toFixed(5)).join(',');if(!posts.has(key)){posts.add(key);add(tube([...p,8.3],[...p,9.22],.016,.016,6),'M19',`post ${j}`);}}
      count++;
    }
  }
  detail.objects=[...detail.replacements.values()].flat().concat(detail.additions);
  exterior.sunDeck={version:'sun-deck-1',guards};
}
