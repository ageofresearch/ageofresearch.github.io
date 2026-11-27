import {aftCockpitGuard,aftCockpitRisers,aftCockpitTreads} from './aft-cockpit-stair.js?v=cockpit-risers-v1';
import {cockpitOverheadOpening,cockpitPortColumn} from './cockpit-overhead.js?v=cockpit-risers-v1';
import {portMooring} from './cockpit-fittings.js?v=wet-bar-vr-1';

const f=value=>value.toFixed(6);
const vec=values=>`vec${values.length}f(${values.map(f).join(',')})`;
const footprint=t=>vec([t.front,t.left,t.back,t.right]);
const woodBounds=aftCockpitTreads.map(footprint).join(',');
const woodLevels=aftCockpitTreads.map(t=>vec([t.top,t.top-t.thickness])).join(',');
const panelRows=[{bottom:3.95,top:4.087,left:1.925,right:2.815},...aftCockpitRisers]
  .map(t=>vec([t.bottom,t.top,t.left,t.right])).join(',');
// Local, opaque reflections. Rays intersect the receiving stair's own treads,
// teak sole, overhead opening and the nearby coaming and support in model space.
// Illumination and viewing direction are evaluated in the normal surface pass.
export function makeAftStairReflectionWGSL({
  treadSample = 'aftStairStock(hit,up,rough,distance)',
  treadCovers = 'aftStairInside(hit.xy,treads[i])',
  support = {xy:cockpitPortColumn,bottom:3.95,top:5.87,radius:.055},
  guard = aftCockpitGuard,
  panelShade = 'aftStairPanelShade(p)',
} = {}) {
  const tubes=[guard.middle,guard.top].flatMap((z,i)=>{
    const [a,b]=guard.sides, radius=i?.022:.012;
    return [...guard.sides.map(y=>[[guard.aft,y,z],[guard.fore,y,z],radius]),
      [[guard.aft,a,z],[guard.aft,b,z],radius]];
  }).concat(guard.sides.flatMap(y=>guard.posts.map(x=>[[x,y,guard.floor],[x,y,guard.top],.014])));
  const tubeStarts=tubes.map(([a,,r])=>vec([...a,r])).join(',');
  const tubeEnds=tubes.map(([,b])=>vec(b)).join(',');
  const radius=String(support.radius).replace(/^0\./,'.');
  return `
fn aftStairSafe(v:f32)->f32{
  return select(min(v,-.00001),max(v,.00001),v>=0.);
}
fn aftStairInside(p:vec2f,b:vec4f)->bool{
  return all(p>=b.xy)&&all(p<=b.zw);
}
fn aftStairStock(p:vec3f,up:bool,rough:f32,distance:f32)->vec3f{
  let plank=p.y/.105;
  let blur=clamp(rough*distance*.085,.018,.28);
  let joint=1.-smoothstep(.023,.033+blur,abs(plank-round(plank)));
  let grain=.95+.049*sin(p.x*36.+sin(p.y*307.)*1.12);
  return vec3f(.37,.255,.149)*(grain-.57*joint)*select(.24,.63,up);
}
fn aftStairPanelShade(p:vec3f)->f32{
  let panels=array<vec4f,${aftCockpitRisers.length+1}>(${panelRows});
  var shade=1.;
  for(var i=0;i<${aftCockpitRisers.length+1};i++){
    let row=panels[i];
    if(p.z>=row.x-.006 && p.z<=row.y+.007){
      let edge=min(p.y-row.z,row.w-p.y);
      let around=smoothstep(-.003,.039,edge);
      let underside=smoothstep(-.002,.026,row.y-p.z);
      let foot=smoothstep(-.003,.012,p.z-row.x);
      shade=(.39+.61*around)*(.58+.42*underside)*(.70+.30*foot);
      break;
    }
  }
  return shade;
}
fn aftStairTube(p:vec3f,axis:vec3f,origin:vec4f,end:vec3f)->vec4f{
  let span=end-origin.xyz;
  let along=normalize(span);
  let q=p-origin.xyz;
  let qAlong=dot(q,along);let rayAlong=dot(axis,along);
  let start=q-qAlong*along;
  let crossRay=axis-rayAlong*along;
  let a=max(.00001,dot(crossRay,crossRay));let b=dot(start,crossRay);
  let delta=b*b-a*(dot(start,start)-origin.w*origin.w);
  if(delta<0.){return vec4f(70.,0.,0.,0.);}
  let hit=(-b-sqrt(delta))/a;
  let station=qAlong+hit*rayAlong;
  if(hit<=.008 || station<0. || station>length(span)){return vec4f(70.,0.,0.,0.);}
  return vec4f(hit,normalize(start+hit*crossRay));
}
fn aftStairReflection(pos:vec3f,normal:vec3f,eye:vec3f,sun:vec3f,rough:f32,sunVisible:f32)->vec3f{
  let ray=reflect(-eye,normal);
  let p=vec3f((pos.z+17.615)/.9786111111,pos.x/.9828947368,pos.y+2.01);
  let axis=vec3f(ray.z/.9786111111,ray.x/.9828947368,ray.y);
  let denominZ=aftStairSafe(axis.z);let denominY=aftStairSafe(axis.y);
  let treads=array<vec4f,${aftCockpitTreads.length}>(${woodBounds});
  let levels=array<vec2f,${aftCockpitTreads.length}>(${woodLevels});
  let day=.58+.42*smoothstep(-.07,.24,sun.y);
  let horizon=.002+rough*.040;
  let waterPoint=p.xy+axis.xy*clamp((2.01-p.z)/denominZ,0.,55.);
  let ripple=1.+.075*sin(waterPoint.x*22.+sin(waterPoint.y*13.)*1.27)*(1.-smoothstep(-.16,-.04,ray.y));
  let water=vec3f(.036,.073,.107)*day*ripple;
  let sky=yachtDaySky(ray,sun,false)*vec3f(.38,.39,.45);
  var light=mix(water,sky,smoothstep(-horizon,horizon,ray.y));
  var nearest=60.;
  let t=(3.95-p.z)/denominZ;
  let deck=p+axis*max(0.,t);
  if(axis.z<0. && t>.006 && t<nearest && aftStairInside(deck.xy,vec4f(2.34,-3.46,8.50,3.42))){
    let exposure=mix(.40,1.,1.-smoothstep(2.48,3.2,deck.x));
    nearest=t;light=aftStairStock(deck,true,rough,t)*exposure;
  }
  let ceilingT=(5.88-p.z)/denominZ;
  let ceiling=p+axis*max(0.,ceilingT);
  let opening=${vec(cockpitOverheadOpening)}+vec4f(-.155,-.155,.155,.155);
  if(axis.z>0. && ceilingT>.006 && ceilingT<nearest &&
     aftStairInside(ceiling.xy,vec4f(3.33,-3.42,8.50,3.47)) && !aftStairInside(ceiling.xy,opening)){
    nearest=ceilingT;
    light=vec3f(.166,.177,.194)*(.68+.32*(1.-smoothstep(3.4,6.8,ceiling.x)));
  }
  let sideT=(${f(portMooring.inner)}-p.y)/denominY;
  let coaming=p+axis*max(0.,sideT);
  if(sideT>.006 && sideT<nearest && aftStairInside(coaming.xz,vec4f(${f(portMooring.start)},4.658,${f(portMooring.end)},4.964))){
    nearest=sideT;light=select(vec3f(.098,.110,.129),vec3f(.212,.239,.283),coaming.z>4.932);
  }
  let column=${vec(support.xy)};
  let rel=p.xy-column;
  let a=max(.0001,dot(axis.xy,axis.xy));let b=dot(rel,axis.xy);
  let det=b*b-a*(dot(rel,rel)-${radius}*${radius});
  let columnT=(-b-sqrt(max(0.,det)))/a;
  let columnZ=p.z+axis.z*columnT;
  if(det>=0. && columnT>.006 && columnT<nearest && columnZ>${support.bottom} && columnZ<${support.top}){
    let h=normalize(rel+columnT*axis.xy);
    nearest=columnT;light=mix(vec3f(.038,.059,.084),vec3f(.61,.69,.79),smoothstep(-.24,.62,h.y));
  }
  if(p.z>4.77 && axis.z>.04){
    let starts=array<vec4f,${tubes.length}>(${tubeStarts});
    let ends=array<vec3f,${tubes.length}>(${tubeEnds});
    let sunAxis=normalize(vec3f(sun.z/.9786111111,sun.x/.9828947368,sun.y));
    for(var i=0;i<${tubes.length};i++){
      let tube=aftStairTube(p,axis,starts[i],ends[i]);
      if(tube.x<nearest){
        let reflected=reflect(normalize(axis),tube.yzw);
        let strip=smoothstep(-.16,.11,reflected.z);
        let sunSpot=pow(max(0.,dot(reflected,sunAxis)),12.);
        nearest=tube.x;
        light=mix(vec3f(.021,.027,.038),vec3f(.62,.69,.76),strip)+vec3f(.22,.17,.12)*sunSpot;
      }
    }
  }
  for(var i=0;i<${aftCockpitTreads.length};i++){
    let up=axis.z<0.;let height=select(levels[i].y,levels[i].x,up);
    let distance=(height-p.z)/denominZ;
    let hit=p+axis*max(distance,0.);
    if(distance>.008 && distance<nearest && ${treadCovers}){
      nearest=distance;light=${treadSample};
    }
  }
  let grazing=pow(1.-clamp(abs(dot(eye,normal)),0.,1.),5.);
  let spread=.00025+rough*rough*.075;
  let solarLobe=spread/(spread+1.-max(0.,dot(ray,sun)));
  let incoming=vec3f(sun.z/.9786111111,sun.x/.9828947368,sun.y);
  let incomingT=(5.88-p.z)/aftStairSafe(incoming.z);
  let incomingHit=p.xy+incoming.xy*max(0.,incomingT);
  let covered=incomingT>.006 && incoming.z>0. &&
    aftStairInside(incomingHit,vec4f(3.33,-3.42,8.50,3.47)) && !aftStairInside(incomingHit,opening);
  let glint=sunVisible*select(1.,0.,covered)*max(0.,dot(normal,sun))*solarLobe*solarLobe;
  let neutral=vec3f(.009,.009,.012);
  let smoked=.42+.58*smoothstep(4.48,5.47,p.z);
  return (neutral+light*day*smoked*(.50+.37*grazing))*${panelShade}+vec3f(.92,.83,.70)*glint;
}
`;
}

export const aftStairReflectionWGSL = makeAftStairReflectionWGSL();
