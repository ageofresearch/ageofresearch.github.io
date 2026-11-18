// Rigid, model-space corrections shared by full rendering and every extraction.
// These resolve physical inconsistencies; they are not surveyed boat positions.
export const spatialVersion='spatial-correction-1';
export const spatialRules=[
  ...[1,2,3,4].map(n=>({id:'cockpit-chair-'+n,feature:'director chair '+n+' ',floor:3.95,
    reason:'Seat the four frame feet on the existing cockpit deck'})),
  {id:'upper-coffee-table',anchors:['UD_FUR_005'],floor:6,reason:'Seat the pedestal on the upper deck; keep tabletop and bowl together'},
  {id:'bow-seat-port',anchors:['UD_FUR_053','UD_SOF_024','UD_FUR_054'],delta:[-.023146,-.109944,0],
    reason:'Minimum translation normal to the real deck edge, including a 1 mm joint; preserve seat, cushion and back'},
  {id:'bow-seat-starboard',anchors:['UD_FUR_055','UD_SOF_025','UD_FUR_056'],delta:[-.025497,.118591,0],
    reason:'Minimum translation normal to the real deck edge, including a 1 mm joint; preserve seat, cushion and back'},
  {id:'galley-sink-unit',anchors:['MD_FUR_035'],delta:[0,-.13379,0],
    reason:'Clear the inner face of the forward galley partition while preserving the outer cabinet envelope'},
  {id:'galley-basin-level',anchors:['MD_SAN_004','MD_SAN_006'],delta:[0,-.13379,.05],
    reason:'Align the existing basin rim and its faucet with the actual counter surface at 4.85'},
  ...['MD_FUR_038','MD_FUR_039'].map((anchor,i)=>({id:'galley-'+anchor,anchors:[anchor],delta:[.06357,0,0],
    angle:Math.PI,pivot:[20.00412,i? -1.35464:-.361855],
    reason:'Clear the partition and turn cabinet handles toward the room, preserving its ceiling display fit'})),
  {id:'galley-refrigerator',anchors:['MD_EQU_002'],delta:[.05957,0,0],
    reason:'Clear the same galley partition with the fitted refrigerator'},
  {id:'owner-port-armchair',anchors:['MD_SOF_016'],delta:[0,-.068,0],floor:3.95,
    reason:'Clear the window and sill with the complete armchair and seat its feet on the deck'},
  {id:'owner-port-side-table',anchors:['MD_FUR_050'],delta:[0,-.021,0],floor:3.95,
    reason:'Clear the glazing with the tabletop; move legs and decoration together'},
  {id:'helm-console',anchors:['UD_FUR_038'],delta:[0,-.072,0],floor:6,
    reason:'Clear the port glazing and seat the console body on the bridge floor'},
  {id:'helm-chair',anchors:['UD_SOF_017','UD_FUR_039','UD_FUR_040'],delta:[0,-.072,0],
    reason:'Keep the chair aligned with the corrected helm wheel'},
  {id:'day-head-wc',anchors:['MD_SAN_007','MD_SAN_008','MD_SAN_009'],delta:[-.26348,0,0],angle:-Math.PI/2,pivot:[22.1567,-2.93196],
    reason:'Provisional rigid fit: face the pan into the room and place the cistern against the side partition; translation alone intersects the service wall'},
  ...[['owner-port-wc','MD_SAN_013','MD_SAN_014','MD_SAN_015'],['owner-starboard-wc','MD_SAN_021','MD_SAN_022','MD_SAN_023']]
    .map(([id,...anchors])=>({id,anchors,delta:[-.009309,-.142277,0],reason:'Clear the sloping head partition with the complete WC assembly'})),
  ...[['forepeak-port-wc','LD_SAN_040','LD_SAN_041','LD_SAN_042'],['forepeak-starboard-wc','LD_SAN_048','LD_SAN_049','LD_SAN_050']]
    .map(([id,...anchors])=>({id,anchors,delta:[-.002417,-.032446,0],reason:'Clear the sloping forepeak partition with the complete WC assembly'})),
];
const boxOf=parts=>{
  const b=[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity];
  for(const p of parts)for(let i=0;i<p.vertices.length;i+=6)for(let k=0;k<3;k++){
    b[k]=Math.min(b[k],p.vertices[i+k]);b[k+3]=Math.max(b[k+3],p.vertices[i+k]);
  }
  return b;
};
export function correctSpatialAssemblies(detail,exterior,asset,{rawFinish,machinery}) {
  if(!detail||detail.spatialCorrections)return;
  const rawIDs=new Set(spatialRules.flatMap(r=>r.anchors||[]));
  for(const source of asset.data.meshes){
    if(!rawIDs.has(source.id)||detail.replacements.has(source.id)||exterior?.consumed.has(source.id))continue;
    detail.replacements.set(source.id,[{...source,anchor:source.id,sourceIDs:[source.id],
      feature:source.name,finish:rawFinish(source),bounds:source.bbox.slice(),
      vertices:Array.from(new Float32Array(asset.binary,source.vByte,source.vCount*6)),
      indices:Array.from(new Uint16Array(asset.binary,asset.data.vertexBytes+source.iByte,source.iCount))}]);
  }
  const parts=[...new Set([...detail.replacements.values()].flat().concat(detail.additions,exterior?.parts||[]))];
  const records=[];
  for(const rule of spatialRules){
    const selected=parts.filter(p=>rule.anchors?.includes(p.anchor)||rule.features?.includes(p.feature)||rule.feature&&p.feature?.startsWith(rule.feature));
    if(!selected.length)continue;
    const before=boxOf(selected),delta=(rule.delta||[0,0,0]).slice();
    if(rule.floor!==undefined)delta[2]+=rule.floor-before[2];
    const angle=rule.angle||0,[cx,cy]=rule.pivot||[0,0],c=Math.cos(angle),s=Math.sin(angle);
    for(const p of selected){
      p.vertices=Array.from(p.vertices);
      for(let i=0;i<p.vertices.length;i+=6){
        const x=p.vertices[i]-cx,y=p.vertices[i+1]-cy,nx=p.vertices[i+3],ny=p.vertices[i+4];
        p.vertices[i]=cx+c*x-s*y+delta[0];p.vertices[i+1]=cy+s*x+c*y+delta[1];p.vertices[i+2]+=delta[2];
        p.vertices[i+3]=c*nx-s*ny;p.vertices[i+4]=s*nx+c*ny;
      }
      p.bounds=boxOf([p]);p.spatialCorrection=rule.id;
    }
    records.push({id:rule.id,parts:selected.map(p=>p.id),before,after:boxOf(selected),delta,
      angle,pivot:rule.pivot||null,reason:rule.reason,evidence:'Provisional minimum physical correction; original boat placement unverified'});
  }
  // The source contains a second cabinet buried inside the larger galley unit,
  // with the basin below its uncut top. Keep the outer cabinet envelope, fit the
  // original basin and create its recess instead of concealing the bowl.
  const sink=parts.filter(p=>p.anchor==='MD_SAN_004'),rim=boxOf(sink);
  const hole=[rim[0],rim[1],rim[3],rim[4]],bottom=rim[2]-.001;
  const carved=parts.filter(p=>p.anchor==='MD_FUR_035'&&['rounded joinery body','thin fitted top'].includes(p.feature));
  if(carved.length&&sink.length){
    for(const p of carved)carveCounter(p,hole,p.feature==='rounded joinery body'?bottom:null);
    records.push({id:'galley-basin-recess',action:'fit-recess',parts:carved.map(p=>p.id),before:boxOf(carved),after:boxOf(carved),delta:[0,0,0],angle:0,
      reason:'Cut the overlapping cabinet top to the existing basin surround; retain the outer cabinet dimensions',evidence:'Confirmed hidden basin in the shared source assembly'});
    const buried=parts.filter(p=>p.anchor==='MD_FUR_037');
    detail.replacements.set('MD_FUR_037',[]);detail.additions=detail.additions.filter(p=>p.anchor!=='MD_FUR_037');
    records.push({id:'duplicate-galley-cabinet',action:'remove-duplicate',owner:'MD_FUR_035/004',parts:buried.map(p=>p.id),before:boxOf(buried),after:boxOf(buried),delta:[0,0,0],angle:0,
      reason:'Remove the smaller cabinet fully hidden inside the retained galley cabinet',evidence:'Exact containment in the source assembly'});
  }
  // Source corridor fragments duplicate volumes already owned by LD_PAR_010.
  // Keep that complete wall: this removes coincident surfaces, not a doorway.
  for(const id of ['LD_PAR_013','LD_PAR_014']){
    const source=asset.data.meshes.find(p=>p.id===id),owner=asset.data.meshes.find(p=>p.id==='LD_PAR_010');
    if(!source||!owner)continue;
    const removed=detail.additions.filter(p=>p.anchor===id&&/\/00[01]$/.test(p.id));
    detail.replacements.set(id,[]);
    detail.additions=detail.additions.filter(p=>!removed.includes(p));
    records.push({id:'duplicate-'+id,action:'remove-duplicate',owner:'LD_PAR_010',parts:[id,...removed.map(p=>p.id)],
      before:source.bbox.slice(),after:source.bbox.slice(),delta:[0,0,0],angle:0,pivot:null,
      reason:'Retain the complete owning wall and its skirting; remove contained duplicate wall and trim fragments',evidence:'Exact containment in the shared source model'});
  }
  if(machinery){
    const id='LD_R02/machinery/lining/4',owner='LD_R02/photo-layout/lining/0',old=machinery.parts.find(p=>p.id===id);
    if(old&&machinery.parts.some(p=>p.id===owner)){
      machinery.parts=machinery.parts.filter(p=>p.id!==id);
      records.push({id:'duplicate-machinery-lining',action:'remove-duplicate',owner,parts:[id],
        before:old.bounds.slice(),after:old.bounds.slice(),delta:[0,0,0],angle:0,pivot:null,
        reason:'The continuous manifold wall already owns the old doorway lintel volume',evidence:'Exact containment in the final machinery lining'});
    }
  }
  detail.objects=[...detail.replacements.values()].flat().concat(detail.additions);
  detail.spatialCorrections=records;
  if(exterior)exterior.spatialCorrections=records;
}

// Subtract an internal rectangular recess, preserving the exterior silhouette.
// Split shared cut edges before closing them, so no T junction is left at a cap.
function carveCounter(part,hole,bottom) {
  const [x0,y0,x1,y1]=hole,[,,z0,,,z1]=part.bounds,low=bottom??z0;
  const polygons=[];
  const clip=(poly,axis,bound,above)=>{
    const out=[];
    for(let i=0;i<poly.length;i++){
      const a=poly[i],b=poly[(i+1)%poly.length],ia=above?a[axis]>=bound:a[axis]<=bound,ib=above?b[axis]>=bound:b[axis]<=bound;
      if(ia)out.push(a);
      if(ia!==ib){const t=(bound-a[axis])/(b[axis]-a[axis]);out.push(a.map((v,k)=>v+(b[k]-v)*t));}
    }return out;
  };
  for(let i=0;i<part.indices.length;i+=3){
    let poly=part.indices.slice(i,i+3).map(n=>part.vertices.slice(n*6,n*6+6));
    if(!poly.every(p=>Math.abs(p[2]-z1)<1e-7)&&!(bottom===null&&poly.every(p=>Math.abs(p[2]-z0)<1e-7))){polygons.push(poly);continue;}
    for(const [axis,bound,inside]of [[0,x0,true],[0,x1,false],[1,y0,true],[1,y1,false]]){
      const outside=clip(poly,axis,bound,!inside);if(outside.length>=3)polygons.push(outside);
      poly=clip(poly,axis,bound,inside);if(!poly.length)break;
    }
  }
  const cuts=[[x0,y0],[x1,y0],[x1,y1],[x0,y1],...polygons.flat().filter(v=>v[0]>=x0-1e-7&&v[0]<=x1+1e-7&&v[1]>=y0-1e-7&&v[1]<=y1+1e-7).map(v=>v.slice(0,2))];
  const boundary=[...new Map(cuts.map(v=>[v.map(n=>n.toFixed(8)).join(','),v])).values()]
    .sort((a,b)=>Math.atan2(a[1]-(y0+y1)/2,a[0]-(x0+x1)/2)-Math.atan2(b[1]-(y0+y1)/2,b[0]-(x0+x1)/2));
  const vertices=[],indices=[];
  const emit=poly=>{
    for(let j=1;j<poly.length-1;j++){
      const a=poly[0],b=poly[j],c=poly[j+1],u=b.map((v,k)=>v-a[k]),v=c.map((v,k)=>v-a[k]);
      if(Math.hypot(u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0])<1e-12)continue;
      const n=vertices.length/6;vertices.push(...a,...b,...c);indices.push(n,n+1,n+2);
    }
  };
  for(let i=0;i<boundary.length;i++){
    const a=boundary[i],b=boundary[(i+1)%boundary.length],dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy),normal=[-dy/length,dx/length,0];
    polygons.push([[...a,low,...normal],[...a,z1,...normal],[...b,z1,...normal],[...b,low,...normal]]);
  }
  if(bottom!==null)polygons.push(boundary.map(p=>[...p,low,0,0,1]));
  const all=[...new Map(polygons.flat().map(v=>[v.slice(0,3).map(n=>n.toFixed(8)).join(','),v])).values()];
  for(const poly of polygons){
    const split=[];
    for(let i=0;i<poly.length;i++){
      const a=poly[i],b=poly[(i+1)%poly.length],d=b.slice(0,3).map((v,k)=>v-a[k]),length2=d.reduce((n,v)=>n+v*v,0);split.push(a);
      if(length2<1e-14)continue;
      const cuts=new Map();
      for(const point of all){
        const t=d.reduce((n,v,k)=>n+v*(point[k]-a[k]),0)/length2;
        if(t<=1e-7||t>=1-1e-7)continue;
        if(Math.hypot(...d.map((v,k)=>a[k]+v*t-point[k]))<1e-7)cuts.set(t.toFixed(8),t);
      }
      for(const t of [...cuts.values()].sort((a,b)=>a-b))split.push(a.map((v,k)=>v+(b[k]-v)*t));
    }
    // A centre fan retains every subdivided boundary edge, including cuts
    // through an original triangle shared with an uncut neighbour.
    const center=split[0].map((_,k)=>split.reduce((n,p)=>n+p[k],0)/split.length);
    for(let i=0;i<split.length;i++)emit([center,split[i],split[(i+1)%split.length]]);
  }
  part.vertices=vertices;part.indices=indices;part.bounds=boxOf([part]);part.spatialCorrection='galley-basin-recess';
}
