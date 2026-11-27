import { aftLanding, aftLandingGuard } from '../../site/tidewater-rocha/mobile/aft-cockpit-joins.js';
import { aftCockpitGuard } from '../../site/tidewater-rocha/mobile/aft-cockpit-stair.js';
import { aftOpeningFinish } from '../../site/tidewater-rocha/mobile/aft-cockpit-opening.js';

const chrome=[0xbac5cf,.105,.94,aftOpeningFinish];

export function mobileAftLandingGuard(part){
  if(!/^UD_DCK_001\/video\/(?:connected-stairwell|stairwell-guard-posts)/.test(part.id))return part;
  const upper=part.feature==='connected stairwell guard top';
  const mid=part.feature==='connected stairwell intermediate';
  const {sourceSides,sides,station,top,middle}=aftLandingGuard;
  const width=(sides[1]-sides[0])/(sourceSides[1]-sourceSides[0]);
  const span=(station(aftCockpitGuard.aft+1)-station(aftCockpitGuard.aft));
  const thickness=upper?aftLandingGuard.topHeightScale:mid?aftLandingGuard.midHeightScale:1;
  const center=upper?top:middle;
  const vertices=[],bounds=[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity];
  for(let i=0;i<part.vertices.length;i+=6){
    const [x,y,z,nx,ny,nz]=part.vertices.slice(i,i+6);
    const pos=[station(x),sides[0]+(y-sourceSides[0])*width,center+(z-center)*thickness];
    const normal=[nx/span,ny/width,nz/thickness], length=Math.hypot(...normal);
    vertices.push(...pos,...normal.map(n=>n/length));
    for(let k=0;k<3;k++){
      bounds[k]=Math.min(bounds[k],pos[k]);
      bounds[k+3]=Math.max(bounds[k+3],pos[k]);
    }
  }
  return {...part,vertices,bounds,finish:chrome};
}

export function aftLandingPlates(){
  const {aft,forward,edge,metalOutside}=aftLanding;
  const plate=(name,lo,hi,start=aft,end=forward)=>{
    const z=6.0025;
    return {id:`UD_DCK_001/mobile-aft-landing/${name}`,anchor:'UD_DCK_001',
      feature:`aft landing polished ${name} saddle`,materialID:'M19',finish:chrome,
      bounds:[start,lo,z,end,hi,z],
      vertices:[[start,lo],[end,lo],[end,hi],[start,hi]].flatMap(p=>[...p,z,0,0,1]),
      indices:[0,1,2,0,2,3]};
  };
  return [
    plate('inboard',metalOutside[0],edge[0]),
    plate('port',edge[1],metalOutside[1]),
    plate('aft',edge[0],edge[1],aft-.077,5.10),
  ];
}
