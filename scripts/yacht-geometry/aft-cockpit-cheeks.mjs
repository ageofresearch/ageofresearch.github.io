import {cockpitSoleFinish} from '../../site/tidewater-rocha/mobile/aft-cockpit-lounge.js';
import {aftCheekFinish, aftCheekToeFinish} from '../../site/tidewater-rocha/mobile/aft-cockpit-cheeks.js';

// Each station gives x, underside, inner and outer crown heights, and width.
// Port is on the left in the view looking up the stair. The inboard crown is
// broader near the future column seat, and meets the lower casing at the sole.
const stations = {
  1: [
    [6.176,4.126,4.390,4.365,.094], [6.200,4.126,4.441,4.418,.117],
    [6.337,4.295,4.662,4.632,.135], [6.499,4.466,4.835,4.798,.137],
    [7.698,5.556,5.923,5.918,.124], [7.773,5.638,5.990,5.973,.117],
    [8.05,5.84,6,5.988,.108],
  ],
  '-1': [
    [6.186,3.950,4.345,4.319,.091], [6.221,3.950,4.416,4.386,.131],
    [6.389,4.283,4.621,4.584,.142], [6.566,4.468,4.827,4.779,.158],
    [7.683,5.537,5.913,5.885,.146], [7.786,5.645,5.985,5.968,.127],
    [8.05,5.84,6,5.985,.116],
  ],
};
const innerEdge = {1: 2.65, '-1': 1.91};
const lacquer = [0x171820,.14,0,aftCheekFinish];
const polished = [0x8396ad,.105,0,aftCheekToeFinish];
const difference = (a,b) => a.map((v,k)=>v-b[k]);
const cross = ([a,b,c],[x,y,z]) => [b*z-c*y,c*x-a*z,a*y-b*x];
const unit = v => {const d=Math.hypot(...v);return v.map(x=>x/d);};

export function mobileAftCheeks(parts) {
  return parts.flatMap(part => {
    const side = Number(part.feature?.match(/^gloss black stair cheek (-?1)$/)?.[1]);
    if (!side || !part.id.startsWith('MD_STA_013/')) return [part];
    const bevel = side > 0 ? .009 : .010;
    const sections = stations[side].map(([x,bottom,inner,outer,width]) => [
      [0,bottom+bevel], [0,inner-bevel], [bevel,inner], [width-bevel,outer],
      [width,outer-bevel], [width,bottom+bevel], [width-bevel,bottom], [bevel,bottom],
    ].map(([offset,z])=>[x,innerEdge[side]+side*offset,z]));
    const shell = {vertices:[],indices:[]}, toe = {vertices:[],indices:[]};
    const vertex = (mesh,p,n) => (mesh.vertices.push(...p,...n),mesh.vertices.length/6-1);
    for (let edge=0;edge<8;edge++) {
      const next=(edge+1)%8;
      const faces=sections.slice(1).map((row,i)=>[sections[i][edge],sections[i][next],row[next],row[edge]]);
      const normals=faces.map(([a,b,,d])=>unit(cross(difference(b,a),difference(d,a))).map(n=>-side*n));
      const at=(i,j)=>unit(normals[i].map((n,k)=>n+(normals[j]?.[k]??n)));
      for (const [i,face] of faces.entries()) {
        // The lower polished crown runs farther uphill on the port side.
        const isToe = edge>=1 && edge<=3 && (side>0 ? i===1 || i===2 : i===1);
        const mesh=isToe ? toe : shell;
        const ids=face.map((p,k)=>vertex(mesh,p,k<2?at(i,i-1):at(i,i+1)));
        const [a,b,c,d]=side>0?ids.toReversed():ids;
        mesh.indices.push(a,b,c,a,c,d);
      }
    }
    for (const end of [0,1]) {
      let row=sections[end?sections.length-1:0];
      if ((side>0)===Boolean(end)) row=row.toReversed();
      const ids=row.map(p=>vertex(shell,p,[end?1:-1,0,0]));
      for (let i=1;i<ids.length-1;i++) shell.indices.push(ids[0],ids[i],ids[i+1]);
    }
    return [
      {...part,...shell,bounds:meshBounds(shell.vertices),finish:lacquer},
      {...part,...toe,id:part.id+'/polished-toe',feature:`aft stair polished cheek toe ${side}`,
        bounds:meshBounds(toe.vertices),finish:polished},
    ];
  });
}

function meshBounds(vertices) {
  const b=[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity];
  for(let i=0;i<vertices.length;i+=6)for(let k=0;k<3;k++){
    b[k]=Math.min(b[k],vertices[i+k]);b[k+3]=Math.max(b[k+3],vertices[i+k]);
  }
  return b;
}

// The mobile walk sees only the exterior of the enclosed service stair. Fit
// that outer skin under the inboard cheek, with a shallow teak-covered foot
// and a taller return towards the saloon. Leave the tunnel lining in place.
export function mobileAftServiceSkin(part) {
  if (!/^cockpit stair exterior (cheek|capping)$/.test(part.feature)) return part;
  const sole=3.95;
  const vertices=Array.from(part.vertices);
  for(let i=0;i<vertices.length;i+=6){
    const [x,,z,nx,ny,nz]=vertices.slice(i,i+6);
    const rise=1.41;
    const t=Math.max(0,Math.min(1,(x-6.29)/rise));
    const height=.025+.975*t*t*(3-2*t);
    const slope=.975*6*t*(1-t)/rise*(z-sole);
    vertices[i+2]=sole+(z-sole)*height;
    const normal=unit([nx-slope*nz/height,ny,nz/height]);
    vertices.splice(i+3,3,...normal);
  }
  const bounds=meshBounds(vertices);
  const foot=part.feature.endsWith('capping') && bounds[3]<6.68;
  return {...part,vertices,bounds,finish:foot?[0xb08d6d,.71,0,cockpitSoleFinish]:lacquer};
}

// A shallow return closes the small joint between the rounded plinth margin
// and the service cover. Recess it below the adjacent deck's wear surface.
export const mobileAftFootReturn = {
  id:'MD_STA_013/mobile-service-cover-return',
  feature:'cockpit teak return below the inboard stringer foot',
  materialID:'M43',finish:[0xb08d6d,.71,0,cockpitSoleFinish],
  vertices:[[5.54,1.88],[6.26,1.88],[6.26,2.082],[5.54,2.082]].flatMap(p=>[...p,3.946,0,0,1]),
  indices:[0,1,2,0,2,3],
};
