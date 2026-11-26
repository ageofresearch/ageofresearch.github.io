import {portSideLights,portSideSoffit} from './side-deck-layout.js?v=port-passage-vr-1';

export const portSideGlassCode = 54;
const sillIDs = ['MD_SUP_003','MD_SUP_005','MD_SUP_007'];
const beamIDs = ['MD_SUP_004','MD_SUP_006','MD_SUP_008'];
const ends = [11.60,15.05,17.95,20.50];
const portEdge = [3.075,3.095,3.125,3.135];

function front(x,X,y,Y,z,Z) {
  const n = (y-Y)/(X-x), scale = 1/Math.hypot(n,1);
  const vertices = [[x,y,z],[x,y,Z],[X,Y,Z],[X,Y,z]]
    .flatMap(point => [...point,n*scale,scale,0]);
  return {vertices,indices:[0,1,2,0,2,3]};
}

function faces(g,keep) {
  const remap=new Map(),vertices=[],indices=[];
  for(let i=0;i<g.indices.length;i+=3){
    const ids=g.indices.slice(i,i+3);
    if(!keep(g.vertices.slice(6*ids[0]+3,6*ids[0]+6)))continue;
    for(const id of ids){
      if(!remap.has(id)){
        remap.set(id,vertices.length/6);
        vertices.push(...g.vertices.slice(id*6,id*6+6));
      }
      indices.push(remap.get(id));
    }
  }
  return {vertices,indices};
}

function splitPolygon(polygon,axis,value,direction) {
  const inside=[],outside=[];
  for(let i=0;i<polygon.length;i++){
    const p=polygon[i],q=polygon[(i+1)%polygon.length];
    const a=direction*(p[axis]-value),b=direction*(q[axis]-value);
    (a>=0?inside:outside).push(p);
    if((a>=0)===(b>=0))continue;
    const corner=p.map((v,k)=>v+(q[k]-v)*a/(a-b));
    inside.push(corner);outside.push(corner);
  }
  return [inside,outside];
}

function emit(target,polygon) {
  if(polygon.length<3)return;
  const root=target.vertices.length/6;
  target.vertices.push(...polygon.flat());
  for(let i=1;i+1<polygon.length;i++){
    const a=polygon[i].map((v,k)=>v-polygon[0][k]),b=polygon[i+1].map((v,k)=>v-polygon[0][k]);
    if(Math.hypot(a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0])>1e-10)
      target.indices.push(root,root+i,root+i+1);
  }
}

function partitionSoffit(part) {
  const {start,end,inboard,z}=portSideSoffit;
  const rest={vertices:Array.from(part.vertices),indices:[]};
  const lining={vertices:[],indices:[]};
  for(let i=0;i<part.indices.length;i+=3){
    const indices=Array.from(part.indices.slice(i,i+3));
    const triangle=indices.map(k=>Array.from(part.vertices.slice(6*k,6*k+6)));
    if(!triangle.every(v=>Math.abs(v[2]-z)<.001&&v[5]<-.98)||
      !triangle.some(v=>v[1]>inboard)||!triangle.some(v=>v[0]>start)||!triangle.some(v=>v[0]<end)){
      rest.indices.push(...indices);
      continue;
    }
    let polygon=triangle;
    for(const [axis,level,direction] of [[0,start,1],[0,end,-1],[1,inboard,1]]){
      const [inside,outside]=splitPolygon(polygon,axis,level,direction);
      emit(rest,outside);polygon=inside;
    }
    emit(lining,polygon);
  }
  return {rest,lining};
}

export function finishPortSideWall({source,parts,box,replace,add,addSoffit,tint}) {
  // Preserve the original inner reveals and the existing physical openings.
  for(const part of parts){
    const reveal=/^MD_GLA_00[5-7]$/.test(part.anchor)&&part.feature==='coated brown inner window reveal';
    const portReturn=part.feature==='gloss figured portal return'&&part.bounds[4]>3.02&&part.bounds[1]>2.;
    if(reveal||portReturn)
      tint(part,'M47');
  }
  for(const [i,anchor] of sillIDs.entries()){
    const [,,z,,,Z]=source.get(anchor).bbox, x=ends[i],X=ends[i+1];
    const y=portEdge[i],Y=portEdge[i+1];
    // Faces touching the deck and the next sill segment are internal.
    const shell=faces(box([x,y-.125,z,X,y,Z],0),
      ([nx,ny,nz])=>ny<.5&&nz>-.5&&
        (Math.abs(nx)<.5||(i===0&&nx<0)||(i===sillIDs.length-1&&nx>0)));
    for(let k=0;k<shell.vertices.length;k+=6)
      shell.vertices[k+1]+=(Y-y)*(shell.vertices[k]-x)/(X-x);
    // The lip and the light occupy adjacent surfaces of the same sill.
    replace(anchor,[
      [shell,'M47','port passage lower frame'],
      [front(x,X,y,Y,z,z+.020),'M47','port passage recessed toe'],
      [front(x,X,y,Y,z+.020,z+.036),'M99','port passage warm sill light'],
      [front(x,X,y,Y,z+.036,Z),'M47','port passage lower frame face'],
    ]);
  }
  for(const anchor of beamIDs){
    const b=source.get(anchor).bbox;
    replace(anchor,[[faces(box(b,0),([,,nz])=>nz<.5),'M47','port passage upper frame']]);
  }
  const deck=parts.find(p=>p.id==='UD_DCK_001/stairs/stair-opening');
  if(deck){
    const {rest,lining}=partitionSoffit(deck);
    Object.assign(deck,rest);
    if(lining.indices.length)addSoffit(lining,'M60','port passage ivory soffit');
  }
  const fixtures={vertices:[],indices:[]};
  for(const x of portSideLights){
    const root=fixtures.vertices.length/6;
    for(let j=0;j<4;j++){
      const a=(j+.5)*Math.PI/2;
      fixtures.vertices.push(x+.026*Math.cos(a),portSideSoffit.lightY+.023*Math.sin(a),portSideSoffit.z-.003,0,0,-1);
    }
    fixtures.indices.push(root,root+2,root+1,root,root+3,root+2);
  }
  add('UD_DCK_001',fixtures,'M99','port passage recessed downlights',false);

  // The forward return belongs to the cabin face. Its outer face stays
  // within the sill envelope so it does not take width from the route.
  add('MD_SUP_008',front(18,18.63,3.096,3.096,4.24,5.8),'M47','port passage forward return',false);
  add('MD_SUP_008',front(18.035,18.595,3.098,3.098,4.268,4.79),'M38','port passage forward access panel',false);
  add('MD_SUP_008',front(18.08,18.17,3.102,3.102,4.675,4.700),'M19','port passage forward latch',false);
}
