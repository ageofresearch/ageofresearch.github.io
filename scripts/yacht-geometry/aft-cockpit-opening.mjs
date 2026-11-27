import { o as ShapeUtils } from '../../site/tidewater-rocha/assets/Materials-CAztm2ge.js';
import { aftCockpitGuard } from '../../site/tidewater-rocha/mobile/aft-cockpit-stair.js';
import { aftColumn } from '../../site/tidewater-rocha/mobile/aft-cockpit-column.js';
import { aftOpening, aftOpeningFinish } from '../../site/tidewater-rocha/mobile/aft-cockpit-opening.js';
import { cockpitOverheadOpening } from '../../site/tidewater-rocha/mobile/cockpit-overhead.js';

const {outline,underside,deck,portSegments,inboardSegments}=aftOpening;
const [minX,minY,maxX,maxY]=cockpitOverheadOpening;
const columnX=aftColumn.xy[0],columnY=aftColumn.xy[1];

// These points correspond to the lower outline, including the repeated
// corners of the rectangular cut at the deck. Their plan stays compatible
// with the existing walking surface, which ends at z=6.
const upper=[
  [maxX,maxY],[6.41,maxY],
  ...Array.from({length:portSegments+1},()=>[minX,maxY]),
  [minX,2.365],
  ...Array.from({length:inboardSegments+1},()=>[minX,minY]),
  [6.680,minY],[6.738,minY],[6.772,minY],[6.807,minY],[6.851,minY],
  [7.875,minY],[maxX,minY],
];

function fitted(part,vertices,indices,finish=part.finish){
  const bounds=[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity];
  for(let i=0;i<vertices.length;i+=6)for(let axis=0;axis<3;axis++){
    bounds[axis]=Math.min(bounds[axis],vertices[i+axis]);
    bounds[axis+3]=Math.max(bounds[axis+3],vertices[i+axis]);
  }
  return {...part,vertices,indices,bounds,triangles:indices.length/3,finish};
}

function lining(part,fascia){
  const perimeter=[];
  for(let i=0;fascia.vertices[i+2]===underside;i+=6)perimeter.push(fascia.vertices.slice(i,i+2));
  const socket=Array.from({length:16},(_,i)=>{
    const a=i*Math.PI/8;
    return [columnX+aftColumn.openingRadius*Math.cos(a),columnY+aftColumn.openingRadius*Math.sin(a)];
  });
  const loops=[perimeter,outline,socket].map(points=>points.map(([x,y])=>({x,y})));
  const indices=ShapeUtils.triangulateShape(loops[0],loops.slice(1)).flatMap(([a,b,c])=>[a,c,b]);
  const vertices=[...perimeter,...outline,...socket].flatMap(p=>[...p,underside,0,0,-1]);
  return fitted(part,vertices,indices);
}

function reveal(part){
  const vertices=[],indices=[];
  function face(a,b,c){
    const ab=b.map((n,i)=>n-a[i]),ac=c.map((n,i)=>n-a[i]);
    const n=[ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]];
    const l=Math.hypot(...n);
    if(l<1e-9)return;
    const start=vertices.length/6;
    const normal=n.map(v=>v/l);
    for(const p of [a,b,c])vertices.push(...p,...normal);
    indices.push(start,start+1,start+2);
  }
  for(let i=0;i<outline.length;i++){
    const next=(i+1)%outline.length;
    const a=[...outline[i],underside],b=[...outline[next],underside];
    const c=[...upper[i],deck],d=[...upper[next],deck];
    face(a,c,b);
    face(b,c,d);
  }
  return fitted(part,vertices,indices,[0x959ca9,.15,.86,aftOpeningFinish]);
}

function portCornice(part){
  const vertices=Array.from(part.vertices);
  for(let i=0;i<vertices.length;i+=6){
    const [x,y,z]=vertices.slice(i,i+3);
    if(x<=4.95||x>=8.5||y<3.02)continue;
    // Preserve the upper plank edge and the saloon join. Widen the underside
    // into the original fascia instead of moving the exterior deck outline.
    const sweep=Math.sin(Math.PI*(x-4.95)/3.55);
    vertices[i+1]+=.065*sweep*(deck-z)/(deck-underside);
  }
  return fitted(part,vertices,Array.from(part.indices));
}

export function mobileAftOpening(parts){
  const originalFascia=parts.find(p=>p.feature==='cockpit ceiling rounded exterior fascia');
  if(!originalFascia)return parts;
  const fascia=portCornice(originalFascia);
  return parts.flatMap(part=>{
    switch(part.feature){
      case 'cockpit ceiling rounded exterior fascia': return [fascia];
      case 'cockpit ceiling satin panel field': return [lining(part,fascia)];
      case 'cockpit ceiling moulded stair reveal': return [reveal(part)];
      case 'cockpit ceiling port ceiling return around socket':
      case 'cockpit ceiling moulded inboard socket reveal': return [];
      default: return [part];
    }
  });
}

// Reduced outboard guard seen through the aperture from the main deck.
// The ends sit behind the ceiling or the landing, outside this sightline.
export function aftOpeningGuardForMain(part){
  const {aft,fore,sides,middle,top,posts,floor}=aftCockpitGuard;
  const vertices=[],indices=[];
  function tube(a,b,radius,vertical){
    const sidesCount=vertical?4:6;
    const base=vertices.length/6;
    for(const center of [a,b])for(let i=0;i<sidesCount;i++){
      const angle=i*2*Math.PI/sidesCount+(vertical?Math.PI/4:0),c=Math.cos(angle),s=Math.sin(angle);
      const n=vertical?[c,s,0]:[0,c,s];
      vertices.push(...center.map((value,k)=>value+radius*n[k]),...n);
    }
    for(let i=0;i<sidesCount;i++){
      const a=base+i,b=base+(i+1)%sidesCount;
      indices.push(a,b,a+sidesCount,a+sidesCount,b,b+sidesCount);
    }
  }
  const y=sides[1];
  if(part.feature==='stairwell guard posts on solid deck'){
    for(const x of posts.slice(1))tube([x,y,floor],[x,y,top],.014*Math.SQRT2,true);
  }else{
    const upperRail=part.feature==='connected stairwell guard top';
    const [z,radius]=upperRail?[top,.022]:[middle,.012];
    tube([aft,y,z],[fore,y,z],radius,false);
  }
  return {...fitted(part,vertices,indices),light:Array(vertices.length/6).fill(.90),
    surfaceTypes:Array(vertices.length/6).fill(part.finish[3])};
}
