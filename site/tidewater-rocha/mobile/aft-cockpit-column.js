import { cockpitOverheadOpening } from './cockpit-overhead.js?v=cockpit-ceiling-vr-1';
import { portMooring } from './cockpit-fittings.js?v=wet-bar-vr-1';

export const aftColumnFinish = 73;
export const aftColumn = Object.freeze({
  xy: Object.freeze([6.536,1.851]), radius:.039, bottom:4.775, top:5.923,
  openingRadius:.087, ceiling:5.88,
});

export const aftColumnWGSL = /* wgsl */ `
fn aftColumnReflection(pos:vec3f,n:vec3f,rough:f32,lit:f32)->vec3f{
  let eye=normalize(frame.eye.xyz-pos);
  let ray=reflect(-eye,n);
  let p=vec3f((pos.z+17.615)/.9786111111,pos.x/.9828947368,pos.y+2.01);
  let d=vec3f(ray.z/.9786111111,ray.x/.9828947368,ray.y);
  let hz=.018+rough*.155;
  let day=.62+.38*smoothstep(-.07,.22,frame.sun.y);
  let outside=vec3f(.044,.086,.132)*(1.+.18*smoothstep(-.1,.05,ray.y));
  var light=mix(outside,yachtDaySky(ray,frame.sun.xyz,false)*vec3f(.80,.87,1.),smoothstep(-hz,hz,ray.y));
  var nearest=45.;
  let deckT=(3.95-p.z)/aftStairSafe(d.z);
  let deck=p+deckT*d;
  if(deckT>.006 && deckT<nearest && aftStairInside(deck.xy,vec4f(2.34,-3.35,8.50,3.53))){
    let plank=1.-smoothstep(.006,.018+rough*.018,abs(fract(deck.y/.104+.5)-.5)*.104);
    light=vec3f(.299,.233,.172)*(1.-.50*plank);
    nearest=deckT;
  }
  let roofT=(${aftColumn.ceiling}-p.z)/aftStairSafe(d.z);
  let roof=p+roofT*d;
  let inCut=aftStairInside(roof.xy,vec4f(${cockpitOverheadOpening.join(',')}));
  if(roofT>.006 && roofT<nearest && aftStairInside(roof.xy,vec4f(3.33,-3.42,8.50,3.47)) && !inCut){
    light=vec3f(.205,.224,.256);
    nearest=roofT;
  }
  let glassT=(8.49-p.x)/aftStairSafe(d.x);
  let glass=p+glassT*d;
  if(glassT>.006 && glassT<nearest && aftStairInside(glass.yz,vec4f(-2.99,3.96,2.99,5.87))){
    let opening=smoothstep(.49,.54,glass.y)*(1.-smoothstep(1.38,1.44,glass.y));
    let frameBand=1.-smoothstep(.012,.046,abs(glass.y-1.44));
    light=mix(vec3f(.035,.055,.082),vec3f(.37,.255,.157),opening)+frameBand*vec3f(.47,.48,.45);
    nearest=glassT;
  }
  let sideT=(${portMooring.inner}-p.y)/aftStairSafe(d.y);
  let side=p+sideT*d;
  if(sideT>.006 && sideT<nearest && aftStairInside(side.xz,vec4f(${portMooring.start},4.13,${portMooring.end},4.963))){
    let lip=smoothstep(4.866,4.925,side.z);
    light=mix(vec3f(.100,.135,.177),vec3f(.64,.70,.79),lip);
    nearest=sideT;
  }
  // Close to the shoe, the reflected ray runs into the black crown. The
  // bound follows the slope; the resulting split moves with the camera.
  let crownT=(4.775+1.13*(p.x-6.536)+.33*(p.y-1.851)-p.z)/aftStairSafe(d.z-1.13*d.x-.33*d.y);
  let crown=p+crownT*d;
  if(crownT>.007 && crownT<nearest && aftStairInside(crown.xy,vec4f(6.385,1.752,6.742,1.909))){
    light=mix(vec3f(.018,.025,.039),vec3f(.12,.151,.198),smoothstep(1.885,1.906,crown.y));
  }
  let grazing=pow(1.-clamp(dot(n,eye),0.,1.),5.);
  let width=.0015+rough*rough*.12;
  let sun=width/(width+1.-max(0.,dot(ray,frame.sun.xyz)));
  let direct=sun*sun*lit*max(0.,dot(frame.sun.xyz,n));
  return (vec3f(.010,.013,.018)+light*(.87+.13*grazing))*day+direct*vec3f(.94,.87,.78);
}
`;
