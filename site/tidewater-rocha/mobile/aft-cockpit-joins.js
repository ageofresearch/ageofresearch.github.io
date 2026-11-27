import { aftCockpitGuard } from './aft-cockpit-stair.js?v=cockpit-risers-v1';

export const aftFootMarginFinish = 80;
export const aftUpperDeckFinish = 81;
export const cockpitPlankPitch = .077;
export const upperPlankPitch = .083;
export const chaiseTowardStair = .108;

const shoe = [5.945,2.37,.445,.096];
const inlay = [5.858,2.37,.532,.173];
export const aftLanding = {
  aft:5.095, forward:8.253, boardEnd:8.169, miterEnd:8.303,
  edge:[1.68,2.74], metalOutside:[1.529,2.888],
};
const {aft,fore,sides,middle,top,floor,posts}=aftCockpitGuard;
const station=x=>fore+(x-fore)*(fore-aftLanding.aft)/(fore-aft);
export const aftLandingGuard = {
  aft:aftLanding.aft, fore, sides:[1.613,2.807], middle, top, floor,
  posts:posts.map(station), topHeightScale:.67, midHeightScale:.76,
  sourceSides:sides, station,
};

export const aftJoinsWGSL = /* wgsl */ `
fn aftNoseDistance(p:vec2f,profile:vec4f)->f32{
  let q=vec2f(profile.x+profile.w-p.x,abs(p.y-profile.y)-profile.z+profile.w);
  return length(max(q,vec2f(0.)))+min(0.,max(q.x,q.y))-profile.w;
}

fn aftFootWood(p:vec2f,stock:f32,margin:bool,pixel:f32)->f32{
  if(p.x<5.71 || p.x>6.42 || p.y<1.64 || p.y>3.02){return stock;}
  let aa=clamp(pixel*.55,.00065,.012);
  let rim=aftNoseDistance(p,vec4f(${inlay.join(',')}));
  let plinth=aftNoseDistance(p,vec4f(${shoe.join(',')}));
  let visible=(1.-smoothstep(6.23,6.33,p.x));
  // Long deck planks stop at the swept margin; the bent board is continuous.
  let border=(1.-smoothstep(-.001,.004+aa,rim))*visible;
  let grain=.039*sin(plinth*249.+sin(p.x*23.))+.031*sin(plinth*526.);
  let bent=.97+grain;
  let wood=mix(stock,bent,select(border,1.,margin));
  let outerCut=(1.-smoothstep(.0011,.0019+aa,abs(rim)))*visible;
  let edgeCut=(1.-smoothstep(.0012,.0021+aa,abs(plinth)))*visible;
  // The little diagonal end cuts lead away from the two low cheek shoes.
  let u=vec2f(p.x,abs(p.y-2.37));
  let miter=aftTeakSegment(u,vec2f(6.174,.373),vec2f(6.253,.531));
  let innerMiter=aftTeakSegment(p,vec2f(6.178,1.772),vec2f(6.277,1.701));
  let crossCut=1.-smoothstep(.001,.002+aa,min(miter,innerMiter));
  let contact=.24*(1.-smoothstep(.004,.041,max(0.,plinth)))*visible;
  return wood*(1.-.61*max(max(outerCut,edgeCut),crossCut))*(1.-contact);
}

fn aftUpperLipping(p:vec2f)->f32{
  let ends=smoothstep(4.99,5.19,p.x)*(1.-smoothstep(8.29,8.49,p.x));
  let sides=smoothstep(1.40,1.54,p.y)*(1.-smoothstep(2.87,3.04,p.y));
  return ends*sides;
}

fn aftUpperWood(p:vec2f,stock:f32,pixel:f32)->f32{
  if(p.x<4.98 || p.x>8.49 || p.y<1.40 || p.y>3.04){return stock;}
  let aa=clamp(pixel*.55,.00065,.013);
  let inside=smoothstep(1.68-aa,1.68+aa,p.y)*(1.-smoothstep(2.74-aa,2.74+aa,p.y));
  let front=(1.-smoothstep(${aftLanding.boardEnd}-aa,${aftLanding.boardEnd}+aa,p.x))*smoothstep(8.048-aa,8.05+aa,p.x);
  let shoulder=min(
    aftTeakSegment(p,vec2f(${aftLanding.boardEnd},1.68),vec2f(${aftLanding.miterEnd},1.529)),
    aftTeakSegment(p,vec2f(${aftLanding.boardEnd},2.74),vec2f(${aftLanding.miterEnd},2.888)));
  let transverse=max(abs(p.x-${aftLanding.boardEnd}),max(1.68-p.y,p.y-2.74));
  let plated=max(abs(p.x-${aftLanding.forward}),max(abs(p.y-1.604)-.076,0.));
  let portEnd=max(abs(p.x-${aftLanding.forward}),max(abs(p.y-2.814)-.074,0.));
  let line=1.-smoothstep(.0012,.0022+aa,min(min(transverse,shoulder),min(plated,portEnd)));
  let band=front*inside;
  let acrossGrain=.957+.033*sin(p.x*407.+sin(p.y*13.));
  return mix(stock,acrossGrain,band)*(1.-.61*line);
}
`;
