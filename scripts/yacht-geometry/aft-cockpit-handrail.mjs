import {aftHandrailFinish} from '../../site/tidewater-rocha/mobile/aft-cockpit-cheeks.js';

// Port rail, as seen looking up from Cockpit (Port). The short forward run
// meets the edge of the stair opening below the independent upper-deck guard.
const centreY = 2.704;
const foot = [6.295, 4.558];
const knee = [6.295, 5.180];
const crest = [7.076, 5.844];
const end = [7.738, 5.844];
const width = .046;
const thickness = .019;
const chrome = [0xbcc5d2, .095, 0, aftHandrailFinish];

const unit = ([x,z]) => {const length=Math.hypot(x,z);return [x/length,z/length];};
const direction = (a,b) => unit([b[0]-a[0],b[1]-a[1]]);
const plus = (a,b,s) => [a[0]+b[0]*s,a[1]+b[1]*s];
const normal = ([x,z]) => [-z,x];
const rotate = ([x,z],angle) => [x*Math.cos(angle)-z*Math.sin(angle),x*Math.sin(angle)+z*Math.cos(angle)];

function fillet(a,b,c,radius,segments) {
  const incoming=direction(a,b), outgoing=direction(b,c);
  const turn=Math.atan2(incoming[0]*outgoing[1]-incoming[1]*outgoing[0],
    incoming[0]*outgoing[0]+incoming[1]*outgoing[1]);
  const start=plus(b,incoming,-radius*Math.tan(Math.abs(turn)/2));
  const centre=plus(start,normal(incoming),Math.sign(turn)*radius);
  const radial=[start[0]-centre[0],start[1]-centre[1]];
  return Array.from({length:segments+1},(_,i)=>{
    const angle=turn*i/segments;
    return {point:plus(centre,rotate(radial,angle),1),tangent:rotate(incoming,angle)};
  });
}

function sweep(mesh,stations,y,w,d,bevel) {
  const u=w/2, v=d/2;
  const section=[[-u+bevel,-v],[u-bevel,-v],[u,-v+bevel],[u,v-bevel],
    [u-bevel,v],[-u+bevel,v],[-u,v-bevel],[-u,-v+bevel]];
  const vertex=({point:[x,z],tangent},[across,height],[ny,nv],axial=0)=>{
    const [nx,nz]=normal(tangent);
    mesh.vertices.push(x+nx*height,y+across,z+nz*height,
      nx*nv+tangent[0]*axial,ny,nz*nv+tangent[1]*axial);
    return mesh.vertices.length/6-1;
  };
  for(const [i,a] of section.entries()){
    const b=section[(i+1)%section.length];
    const [dy,dv]=direction(a,b);
    const strip=stations.map(row=>[vertex(row,a,[dv,-dy]),vertex(row,b,[dv,-dy])]);
    for(let k=1;k<strip.length;k++){
      const [A,B]=strip[k-1], [C,D]=strip[k];
      mesh.indices.push(A,B,D,A,D,C);
    }
  }
  for(const axial of [-1,1]){
    const row=axial<0?stations[0]:stations.at(-1);
    const outline=axial<0?section.toReversed():section;
    const ids=outline.map(p=>vertex(row,p,[0,0],axial));
    for(let i=1;i<ids.length-1;i++)mesh.indices.push(ids[0],ids[i],ids[i+1]);
  }
}

export function mobileAftHandrail(parts) {
  return parts.flatMap(part=>{
    if(!part.id.startsWith('MD_STA_013/'))return [part];
    if(part.feature==='slender handrail posts 1')return [];
    if(part.feature!=='polished handrail 1')return [part];

    const mesh={vertices:[],indices:[]};
    const straight=(a,b)=>{const tangent=direction(a,b);return [{point:a,tangent},{point:b,tangent}];};
    sweep(mesh,[{point:foot,tangent:direction(foot,knee)},...fillet(foot,knee,crest,.048,4),
      ...fillet(knee,crest,end,.028,3),{point:end,tangent:direction(crest,end)}],centreY,width,thickness,.003);
    // The rounded toe laps the polished crown. The small upright at the
    // upper fold enters the port lip; its hidden fastening is not exposed.
    sweep(mesh,straight([foot[0],4.545],[foot[0],4.615]),centreY,.054,.026,.004);
    sweep(mesh,straight([7.096,5.833],[7.096,5.886]),2.724,.047,.031,.003);
    const bounds=[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity];
    for(let i=0;i<mesh.vertices.length;i+=6)for(let k=0;k<3;k++){
      bounds[k]=Math.min(bounds[k],mesh.vertices[i+k]);
      bounds[k+3]=Math.max(bounds[k+3],mesh.vertices[i+k]);
    }
    return [{...part,...mesh,bounds,finish:chrome,railPath:undefined,railRadius:undefined}];
  });
}
