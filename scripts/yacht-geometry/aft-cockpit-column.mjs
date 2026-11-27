import { aftColumn, aftColumnFinish } from '../../site/tidewater-rocha/mobile/aft-cockpit-column.js';
import { cockpitOverheadFinish, cockpitOverheadOpening } from '../../site/tidewater-rocha/mobile/cockpit-overhead.js';

const [cx,cy]=aftColumn.xy;
const {bottom,top,ceiling,openingRadius,radius}=aftColumn;
const segments=16;
const circle=Array.from({length:segments},(_,i)=>[Math.cos(i*Math.PI/8),Math.sin(i*Math.PI/8)]);
const slope=[1.13,.33];
const steel=[0xc2c9d4,.10,0,aftColumnFinish];
const black=[0x10141c,.58,0,0];
const unit=v=>{const d=Math.hypot(...v);return v.map(n=>n/d);};
const mesh=()=>({vertices:[],indices:[]});
const point=(g,p,n)=>{g.vertices.push(...p,...n);return g.vertices.length/6-1;};

function quad(g,a,b,c,d,flip=false){
  g.indices.push(...(flip?[a,c,b,b,c,d]:[a,b,c,b,d,c]));
}

function revolved(profile,inside=false){
  const g=mesh();
  for(const [i,[r,z,tilt=0]] of profile.entries()){
    const [r0,z0]=profile[Math.max(0,i-1)];
    const [r1,z1]=profile[Math.min(i+1,profile.length-1)];
    const sign=inside?-1:1;
    for(const [j,[c,s]] of circle.entries()){
      const x=r*c,y=r*s;
      const nz=(r0-r1)*sign;
      const n=unit([(z1-z0)*c*sign-tilt*slope[0]*nz,(z1-z0)*s*sign-tilt*slope[1]*nz,nz]);
      point(g,[cx+x,cy+y,z+tilt*(x*slope[0]+y*slope[1])],n);
      if(i){
        const k=(j+1)%segments;
        quad(g,(i-1)*segments+j,(i-1)*segments+k,i*segments+j,i*segments+k,inside);
      }
    }
  }
  return g;
}

// Locally carry the inboard lip forward around the new socket. The original
// upper deck opening is the termination of the tapered reveal.
const oldEdge=cockpitOverheadOpening[1]-.155;
const lip=[[5.38,oldEdge],[5.72,1.68],[6.06,1.917],[6.34,1.969],[6.75,1.969],
  [7.13,1.921],[7.61,1.749],[7.82,oldEdge]];

function ceilingReturn(){
  const g=mesh(), n=[0,0,-1];
  const [left,right]=[lip[3][0],lip[4][0]], far=lip[3][1];
  const surround=circle.map(([c,s])=>{
    const scale=Math.max(Math.abs(c),Math.abs(s));
    const x=c<0?cx-left:right-cx;
    const y=s<0?cy-oldEdge:far-cy;
    return point(g,[cx+c*x/scale,cy+s*y/scale,ceiling],n);
  });
  const hole=circle.map(([c,s])=>point(g,[cx+c*openingRadius,cy+s*openingRadius,ceiling],n));
  for(let i=0;i<segments;i++){
    const k=(i+1)%segments;
    quad(g,hole[i],surround[i],hole[k],surround[k],true);
  }
  for(let i=0;i+1<lip.length;i++){
    if(i===3)continue;
    const [[x,y],[X,Y]]=lip.slice(i,i+2);
    const a=point(g,[x,oldEdge,ceiling],n), b=point(g,[X,oldEdge,ceiling],n);
    const c=point(g,[x,y,ceiling],n), d=point(g,[X,Y,ceiling],n);
    if(y===oldEdge)g.indices.push(a,d,b);
    else if(Y===oldEdge)g.indices.push(a,c,b);
    else quad(g,a,b,c,d,true);
  }
  return g;
}

function socketReveal(){
  const g=mesh();
  const height=[ceiling,5.938,6];
  const yAt=(y,i)=>[y,Math.max(oldEdge,y-.010),cockpitOverheadOpening[1]][i];
  for(let i=0;i+1<lip.length;i++){
    const [[x,y],[X,Y]]=lip.slice(i,i+2);
    for(let k=0;k<2;k++){
      const z=height[k], Z=height[k+1], a=yAt(y,k), b=yAt(Y,k), c=yAt(y,k+1), d=yAt(Y,k+1);
      const n=unit([-(b-a)/(X-x),1,-((c-a)+(d-b))/(2*(Z-z))]);
      quad(g,point(g,[x,a,z],n),point(g,[X,b,z],n),point(g,[x,c,Z],n),point(g,[X,d,Z],n),true);
    }
  }
  return g;
}

export function mobileAftColumn(parts){
  return parts.flatMap(part=>{
    if(part.id.startsWith('MD_STA_013/')&&/^(polished handrail|slender handrail posts) -1$/.test(part.feature))return [];
    if(part.feature==='cockpit ceiling polished column collar 1'||part.feature==='cockpit ceiling column socket 1')return [];
    if(part.feature!=='cockpit ceiling port support column')return [part];
    function fitted(g,name,finish,materialID,suffix){
      const bounds=[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity];
      for(let i=0;i<g.vertices.length;i+=6)for(let k=0;k<3;k++){
        bounds[k]=Math.min(bounds[k],g.vertices[i+k]);
        bounds[k+3]=Math.max(bounds[k+3],g.vertices[i+k]);
      }
      return {...part,...g,bounds,id:suffix?`${part.id}/${suffix}`:part.id,
        feature:`cockpit ceiling ${name}`,finish,materialID};
    }
    return [
      fitted(revolved([[.033,bottom-.005,1],[radius,bottom+.007,1],[radius,top]]),
        'port support column',steel,'M19'),
      fitted(revolved([[.049,bottom-.009,1],[.049,bottom-.002,1],[.038,bottom+.004,1]]),
        'inclined port column shoe',[0x222735,.25,.28,0],'M47','shoe'),
      fitted(revolved([[.073,5.887],[.078,5.877],[openingRadius,ceiling]]),
        'polished column collar 1',[0xc5cbd4,.17,0,aftColumnFinish],'M19','lip'),
      fitted(revolved([[.073,5.887],[.073,top],[.035,top]],true),
        'recessed port support well',black,'M60','recess'),
      fitted(ceilingReturn(),'port ceiling return around socket',[0xb7bdc7,.45,0,cockpitOverheadFinish],'M60','field'),
      fitted(socketReveal(),'moulded inboard socket reveal',[0xaeb6c4,.37,0,0],'M60','reveal'),
    ];
  });
}
