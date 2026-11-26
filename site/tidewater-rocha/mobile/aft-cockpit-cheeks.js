import {cockpitOverheadOpening} from './cockpit-overhead.js?v=cockpit-ceiling-vr-1';
import {portMooring} from './cockpit-fittings.js?v=wet-bar-vr-1';
import {aftCockpitTreads} from './aft-cockpit-stair.js?v=cockpit-risers-v1';

export const aftCheekFinish = 70;
export const aftCheekToeFinish = 71;
export const aftHandrailFinish = 72;

// The faces alongside the treads are lacquered black. The approach sees
// mostly the shaded cockpit, except where a rake or a bevel looks outboard.
export const aftCheekWGSL = /* wgsl */ `
fn aftCheekReflection(pos:vec3f,n:vec3f,rough:f32,visible:f32,finish:i32)->vec3f{
  let eye=normalize(frame.eye.xyz-pos);
  let ray=reflect(-eye,n);
  let p=vec3f((pos.z+17.615)/.9786111111,pos.x/.9828947368,pos.y+2.01);
  let direction=vec3f(ray.z/.9786111111,ray.x/.9828947368,ray.y);
  let dz=aftStairSafe(direction.z);
  let day=.60+.40*smoothstep(-.07,.26,frame.sun.y);
  let horizon=.018+.19*rough;
  let water=vec3f(.066,.128,.176)*day;
  let sky=yachtDaySky(ray,frame.sun.xyz,false)*vec3f(.71,.77,.86);
  var light=mix(water,sky,smoothstep(-horizon,horizon,ray.y));
  var nearest=54.;
  let deckT=(3.95-p.z)/dz;
  let deck=p+direction*deckT;
  if(direction.z<0. && deckT>.008 && deckT<nearest && aftStairInside(deck.xy,vec4f(2.34,-3.46,8.50,3.40))){
    let grain=1.+.095*sin(deck.y*60.+sin(deck.x*11.)*.2)*(1.-smoothstep(.36,4.5,deckT));
    nearest=deckT;
    light=vec3f(.235,.171,.126)*grain;
  }
  let ceilingT=(5.88-p.z)/dz;
  let ceiling=p+direction*ceilingT;
  if(direction.z>0. && ceilingT>.009 && ceilingT<nearest &&
     aftStairInside(ceiling.xy,vec4f(3.33,-3.42,8.50,3.47)) &&
     !aftStairInside(ceiling.xy,vec4f(${cockpitOverheadOpening.join(',')}))){
    nearest=ceilingT;
    light=vec3f(.155,.169,.186);
  }
  let saloonT=(8.49-p.x)/aftStairSafe(direction.x);
  let saloon=p+direction*saloonT;
  if(saloonT>.008 && saloonT<nearest && aftStairInside(saloon.yz,vec4f(-2.98,3.98,2.98,5.87))){
    nearest=saloonT;
    light=mix(vec3f(.035,.047,.065),vec3f(.112,.146,.170),smoothstep(-.18,.10,ray.y));
  }
  let coamingT=(${portMooring.inner}-p.y)/aftStairSafe(direction.y);
  let coaming=p+direction*coamingT;
  if(coamingT>.008 && coamingT<nearest && aftStairInside(coaming.xz,vec4f(${portMooring.start},4.13,${portMooring.end},4.963))){
    nearest=coamingT;
    light=vec3f(.174,.197,.238);
  }
  let leavingTreads=(p.y>2.84 && direction.y>=0.) || (p.y<1.90 && direction.y<=0.);
  if(abs(dz)>.04 && !leavingTreads){
    for(var i=0;i<${aftCockpitTreads.length};i++){
      let up=direction.z<0.;
      let level=select(aftTeakLevels[i].y,aftTeakLevels[i].x,up);
      let t=(level-p.z)/dz;
      if(t>.012 && t<nearest){
        let timber=p+direction*t;
        if(aftTeakCovers(timber.xy,i,up)){
          light=aftTeakReflection(timber,up,rough,t,i);
          nearest=t;
        }
      }
    }
  }
  let edge=1.-clamp(dot(n,eye),0.,1.);
  let fresnel=pow(edge,5.);
  let facing=max(0.,dot(n,frame.sun.xyz));
  let width=.0019+rough*rough*.11;
  let sun=width/(width+1.-max(0.,dot(ray,frame.sun.xyz)));
  let lacquer=(vec3f(.009,.011,.015)+light*(.105+.32*fresnel))*day;
  let polished=(vec3f(.010,.014,.020)+light*(.50+.32*fresnel))*day;
  let chrome=(vec3f(.019,.021,.025)+light*(.79+.19*fresnel))*day;
  let glint=(select(.28,.53,finish==2)+.41*fresnel)*visible*facing*sun*sun;
  return select(select(lacquer,polished,finish==1),chrome,finish==2)+vec3f(1.,.89,.73)*glint;
}
`;
