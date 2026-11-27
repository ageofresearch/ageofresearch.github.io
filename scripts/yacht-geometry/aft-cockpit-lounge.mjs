import { o as ShapeUtils } from '../../site/tidewater-rocha/assets/Materials-CAztm2ge.js';
import {chaiseTowardStair} from '../../site/tidewater-rocha/mobile/aft-cockpit-joins.js';
import {cockpitLocker,cockpitLacquerFinish,cockpitAftGlassFinish,cockpitPortalFinish,cockpitUpholsteryFinish} from '../../site/tidewater-rocha/mobile/aft-cockpit-lounge.js';

const unit=([x,y,z])=>{const d=Math.hypot(x,y,z);return [x/d,y/d,z/d];};
const sub=(a,b)=>a.map((x,i)=>x-b[i]);
const cross=([x,y,z],[u,v,w])=>[y*w-z*v,z*u-x*w,x*v-y*u];
const mesh=()=>({vertices:[],indices:[]});
function point(g,p,n){g.vertices.push(...p,...n);return g.vertices.length/6-1;}
function quad(g,a,b,c,d){
  const n=unit(cross(sub(b,a),sub(c,a)));
  const at=point(g,a,n);
  for(const p of [b,c,d])point(g,p,n);
  g.indices.push(at,at+1,at+2,at,at+2,at+3);
}
function fitted(part,g,finish,feature=part.feature,suffix){
  const bounds=[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity];
  for(let i=0;i<g.vertices.length;i+=6)for(let k=0;k<3;k++){
    bounds[k]=Math.min(bounds[k],g.vertices[i+k]);
    bounds[k+3]=Math.max(bounds[k+3],g.vertices[i+k]);
  }
  return {...part,...g,bounds,feature,finish,id:suffix?`${part.id}/${suffix}`:part.id,
    triangles:g.indices.length/3};
}

// Contour points run counterclockwise. The waist is narrower on the
// exposed front edge and the aft end projects farther into the cockpit.
const seatOutline=[
  [6.142,1.012],[6.104,.795],[6.148,.580],[6.270,.450],[6.464,.419],
  [6.715,.479],[6.989,.570],[7.273,.576],[7.573,.507],[7.837,.493],
  [8.017,.591],[8.075,.774],[8.031,.966],[7.913,1.111],[7.684,1.207],
  [7.335,1.239],[6.891,1.214],[6.555,1.176],[6.288,1.133],
];
const backOutline=[
  [6.602,1.002],[6.650,.919],[6.835,.892],[7.200,.926],[7.573,.945],
  [7.810,.870],[7.932,.867],[7.985,.921],[7.961,1.035],[7.834,1.137],
  [7.560,1.195],[7.202,1.206],[6.848,1.170],[6.652,1.101],
];
function loft(outline,center,rows,closedBottom=false){
  const g=mesh(),count=outline.length;
  for(const [r,[sx,sy,height,nz]] of rows.entries()){
    for(const [i,[x,y]] of outline.entries()){
      const a=outline[(i+count-1)%count],b=outline[(i+1)%count];
      const normal=unit([b[1]-a[1],a[0]-b[0],Math.hypot(b[0]-a[0],b[1]-a[1])*nz]);
      const z=typeof height==='function'?height(x,y):height;
      point(g,[center[0]+(x-center[0])*sx,center[1]+(y-center[1])*sy,z],normal);
      if(r){
        const j=(i+1)%count,A=(r-1)*count+i,B=(r-1)*count+j,C=r*count+i,D=r*count+j;
        g.indices.push(A,B,C,B,D,C);
      }
    }
  }
  const caps=ShapeUtils.triangulateShape(outline.map(([x,y])=>({x,y})),[]);
  const top=(rows.length-1)*count;
  for(const [a,b,c] of caps){
    g.indices.push(top+a,top+b,top+c);
    if(closedBottom)g.indices.push(a,c,b);
  }
  return g;
}

function cushion(cx,cy,cz,width,height,depth,lean){
  const shape=[[.85,-.86],[.99,-.42],[.99,.52],[.70,.90],[-.68,.91],[-1,.47],[-1,-.47],[-.72,-.91]];
  const g=mesh(),n=shape.length;
  for(const [layer,[scale,offset,side]] of [[.81,-1,-1],[1.,0,0],[.81,1,1]].entries()){
    for(const [i,[u,v]] of shape.entries()){
      const normal=unit([u,side,v]);
      point(g,[cx+u*width*.5*scale,cy+offset*depth*.5+v*lean,cz+v*height*.5*scale],normal);
      if(layer){
        const j=(i+1)%n,A=(layer-1)*n+i,B=(layer-1)*n+j,C=layer*n+i,D=layer*n+j;
        g.indices.push(A,C,B,B,C,D);
      }
    }
  }
  for(let i=1;i<n-1;i++)g.indices.push(0,i,i+1,n*2,n*2+i+1,n*2+i);
  return g;
}

function seatPart(part,g,finish,feature,suffix){
  for(let i=1;i<g.vertices.length;i+=6)g.vertices[i]+=chaiseTowardStair;
  return fitted(part,g,finish,feature,suffix);
}

export function mobileCockpitChaise(parts){
  return parts.flatMap(part=>{
    if(part.feature==='cockpit port chaise seat'){
      const center=[7.045,.831];
      const sole=loft(seatOutline,center,[[.90,.85,3.961,-.30],[.987,.98,4.044,.44]]);
      const seat=loft(seatOutline,center,[[.978,.963,4.044,-.69],[1.,1.,4.154,0],[.938,.914,4.342,1.24]]);
      return [
        seatPart(part,seat,[0xc5c3c7,.84,0,cockpitUpholsteryFinish]),
        seatPart(part,sole,[0x77717b,.35,.21,5],'cockpit port chaise recessed plinth','plinth'),
      ];
    }
    if(part.feature!=='cockpit port chaise back')return [part];
    const center=[7.320,1.063];
    const crown=x=>4.629-.129*Math.max(0,(6.99-x)/.39)**1.35-.055*Math.max(0,(x-7.76)/.23)**1.3;
    const back=loft(backOutline,center,[[1.,.97,4.270,-.38],[1.,1.,x=>crown(x)-.059,.04],[.936,.74,crown,1.15]]);
    const pillows=[
      ['amber',7.623,.949,4.529,.385,.233,.152,.029,0xc99132],
      ['blue',7.506,.891,4.463,.330,.204,.132,.030,0x7a92af],
      ['ivory',7.237,.917,4.424,.345,.145,.124,.027,0xe6e1d8],
    ].map(([name,x,y,z,w,h,d,lean,color])=>seatPart(part,cushion(x,y,z,w,h,d,lean),
      [color,.88,0,cockpitUpholsteryFinish],`cockpit port chaise ${name} cushion`,name));
    return [seatPart(part,back,[0xc2c2c5,.86,0,cockpitUpholsteryFinish]),...pillows];
  });
}

const lacquer=[0x1c1b22,.115,0,cockpitLacquerFinish];
const wall=[
  [5.963,1.770,1.785,4.139],[6.189,1.499,1.768,4.338],
  [6.584,1.339,1.749,4.722],[7.728,1.313,1.760,5.777],
  [7.892,1.300,1.771,5.879],[8.085,1.296,1.653,5.879],
  [8.266,1.317,1.495,5.879],[cockpitLocker.wallEnd,1.365,1.365,5.879],
];

function faceY(x,z){
  const i=wall.findIndex(([station])=>station>=x);
  const [x0,base,head,top]=wall[i-1];
  const [x1,endBase,endHead,endTop]=wall[i];
  const t=(x-x0)/(x1-x0);
  const up=z-3.95;
  if(up<=(endTop-3.95)*t)
    return base+(endBase-base)*t+(endHead-endBase)*up/(endTop-3.95);
  return base+(endHead-base)*t+(head-base)*(up-(endTop-3.95)*t)/(top-3.95);
}

export function mobileCockpitEnclosure(parts){
  return parts.flatMap(part=>{
    if(part.id==='LD/service-route/124')return [{...part,finish:lacquer}];
    if(!part.id.includes('/cockpit-'))return [part];
    if(/^LD\/service-route\/(?:4[7-9]|5[0-2]|123|124)\/cockpit-(?:cheek|capping)$/.test(part.id) &&
       part.id!=='LD/service-route/124/cockpit-cheek')return [];
    if(part.id!=='LD/service-route/124/cockpit-cheek')return [part];
    const g=mesh(),returnLip=mesh();
    const shoe=wall.map(([x,base])=>[x,base,3.95]);
    const crown=wall.map(([x,,head,top])=>[x,head,top]);
    const normals=wall.map((_,i)=>{
      const previous=Math.max(0,i-1),next=Math.min(i+1,wall.length-1);
      const tangent=sub(shoe[next],shoe[previous]).map((v,k)=>v+sub(crown[next],crown[previous])[k]*.38);
      return unit(cross(tangent,sub(crown[i],shoe[i])));
    });
    for(let i=1;i<wall.length;i++){
      const at=point(g,shoe[i-1],normals[i-1]);
      point(g,shoe[i],normals[i]);point(g,crown[i],normals[i]);point(g,crown[i-1],normals[i-1]);
      g.indices.push(at,at+1,at+2,at,at+2,at+3);
      const [x,,head,top]=wall[i-1], [X,,Head,Top]=wall[i];
      // This polished return ties the panel into the underside of the stair.
      quad(returnLip,crown[i-1],crown[i],[X,Head+.054,Top],[x,head+.054,top]);
    }
    const [x,base,head,top]=wall[0];
    quad(g,[x,base,3.95],[x,head,top],[x,head+.054,top],[x,base+.054,3.95]);
    const casing=fitted(part,g,lacquer,
      'canted lacquered service locker under the aft stair');
    const switches=mesh(), buttons=mesh();
    for(const [row,z] of cockpitLocker.switchZ.entries()){
      const width=row?.174:.163,height=row?.053:.092,columns=3;
      const x=cockpitLocker.switchX;
      const left=x-width*.5,right=x+width*.5,bottom=z-height*.5,top=z+height*.5;
      const surface=(x,z)=>[x,faceY(x,z)-.006,z];
      quad(switches,surface(left,bottom),surface(right,bottom),surface(right,top),surface(left,top));
      for(const dz of row?[0]:[-.021,.021])for(let i=0;i<columns;i++){
        const bx=x+(i-1)*.053,bz=z+dz,by=faceY(bx,bz)-.008,rr=.011;
        const c=point(buttons,[bx,by-.004,bz],[0,-1,0]);
        const rim=Array.from({length:4},(_,j)=>{
          const a=(j+.5)*Math.PI/2,dx=Math.cos(a),up=Math.sin(a);
          return point(buttons,[bx+rr*dx,by,bz+rr*up],unit([dx,-1,up]));
        });
        for(let j=0;j<rim.length;j++)buttons.indices.push(c,rim[j],rim[(j+1)%rim.length]);
      }
    }
    return [
      casing,
      fitted(part,returnLip,[0x8c929e,.14,.72,cockpitPortalFinish],'polished edge on service locker','polished-edge'),
      fitted(part,switches,[0x947f64,.32,.41,0],'two bronze service control escutcheons','controls'),
      fitted(part,buttons,[0xc9c4bb,.21,.75,5],'polished service push buttons','buttons'),
    ];
  });
}

export function mobileCockpitPortal(part){
  if(part.feature==='smoked aft saloon sliding panels')
    return {...part,finish:[0x292930,.16,0,cockpitAftGlassFinish]};
  if(part.feature!=='aft sliding glazing frames and mullions')return part;
  const g={vertices:Array.from(part.vertices),indices:Array.from(part.indices)};
  // Both rails sit at the wear surface within the navigation allowance.
  for(const x of [8.420,8.439]){
    quad(g,[x,-.554,3.954],[x+.008,-.554,3.954],[x+.008,.748,3.954],[x,.748,3.954]);
  }
  return fitted(part,g,[0x343039,.13,.76,cockpitPortalFinish]);
}

export function mobileCockpitInterior(part){
  if(part.anchor==='MD_FUR_014' && part.feature==='small downlight diffuser')
    return {...part,finish:[0xffe8c8,.57,0,48]};
  return part;
}

export function mobileCockpitParts(parts){
  return mobileCockpitChaise(mobileCockpitEnclosure(parts)).map(mobileCockpitPortal);
}
