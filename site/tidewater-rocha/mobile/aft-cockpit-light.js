import {aftCockpitRisers, aftCockpitTreads} from './aft-cockpit-stair.js?v=cockpit-risers-v1';
import {aftColumn} from './aft-cockpit-column.js?v=cockpit-column-v1';
import {aftLandingGuard} from './aft-cockpit-joins.js?v=1';
import {portMooring} from './cockpit-fittings.js?v=wet-bar-vr-1';

const {xy:column, bottom, ceiling, openingRadius} = aftColumn;
const posts = aftLandingGuard.posts.map(x => x.toFixed(4)).join(',');
const risers = [{bottom:3.95, top:4.087, left:1.925, right:2.815}, ...aftCockpitRisers];
const contacts = risers.map(({bottom,top,left,right}) => `vec4f(${bottom.toFixed(5)},${top.toFixed(5)},${left.toFixed(5)},${right.toFixed(5)})`);

export const aftCockpitLightWGSL = /* wgsl */ `
fn aftCockpitSpan(p:vec2f,bounds:vec4f,softness:f32)->f32{
  let distance=min(p-bounds.xy,bounds.zw-p);
  return smoothstep(-softness,softness,min(distance.x,distance.y));
}

fn aftCockpitAperture(p:vec2f,softness:f32)->f32{
  let q=abs(p-vec2f(6.884,2.349))-vec2f(1.014,.234);
  let distance=length(max(q,vec2f(0.)))+min(max(q.x,q.y),0.)-.16;
  return 1.-smoothstep(-softness,softness,distance);
}

fn aftCockpitSpread(rough:f32,t:f32)->f32{
  return clamp(.004+rough*rough*t*.32,.004,.16);
}

fn aftCockpitWoodBounce(p:vec2f,radius:f32,pitch:f32)->vec3f{
  let board=p.y/pitch;
  let caulk=1.-smoothstep(.0018,.0035+radius,abs(board-round(board))*pitch);
  let detail=1.-smoothstep(.007,.047,radius);
  let grain=.93+detail*(.035*sin(p.x*27.+sin(p.y*327.))+.052*sin(p.y*169.));
  return vec3f(.295,.200,.122)*(grain-.44*caulk*detail);
}

fn aftCockpitGlassBounce(p:vec3f,ray:vec3f,spread:f32)->vec3f{
  let edge=min(abs(p.y-.728),abs(p.y-1.365));
  let mullion=1.-smoothstep(.005,.017+spread,edge);
  let track=1.-smoothstep(.012,.033+spread,min(abs(p.z-3.957),abs(p.z-5.847)));
  let opening=aftCockpitSpan(p.yz,vec4f(.755,3.98,1.338,5.81),spread);
  let smoked=mix(vec3f(.024,.031,.044),vec3f(.074,.104,.132),smoothstep(-.22,.13,ray.y));
  let room=mix(vec3f(.169,.111,.069),vec3f(.127,.111,.096),smoothstep(4.34,5.68,p.z));
  let polished=vec3f(.56,.61,.68)*(.49+.51*smoothstep(-.20,.14,ray.y));
  return mix(mix(smoked,room,opening),polished,max(mullion,track)*.88);
}

// The strips on the upper deck can see the fixed guard directly above them.
fn aftCockpitGuardBounce(p:vec3f,ray:vec3f)->vec2f{
  let y=select(${aftLandingGuard.sides[0]},${aftLandingGuard.sides[1]},p.y>2.22);
  let a=${aftLandingGuard.aft};let b=${aftLandingGuard.fore};
  let middle=${aftLandingGuard.middle};let top=${aftLandingGuard.top};
  var hit=aftStairTube(p,ray,vec4f(a,y,top,.018),vec3f(b,y,top));
  let bar=aftStairTube(p,ray,vec4f(a,y,middle,.011),vec3f(b,y,middle));
  if(bar.x<hit.x){hit=bar;}
  let stations=array<f32,${aftLandingGuard.posts.length}>(${posts});
  for(var i=0;i<${aftLandingGuard.posts.length};i++){
    let upright=aftStairTube(p,ray,vec4f(stations[i],y,6.0025,.017),vec3f(stations[i],y,top));
    if(upright.x<hit.x){hit=upright;}
  }
  let bounce=reflect(normalize(ray),hit.yzw);
  return vec2f(hit.x,smoothstep(-.12,.13,bounce.z));
}

// Intersect the reflected ray with bounded pieces of the cockpit. The ray
// footprint softens their edges in the lacquer, while the chrome retains them.
fn aftCockpitBounce(p:vec3f,ray:vec3f,rough:f32,column:bool,saddle:bool)->vec3f{
  let d=vec3f(ray.z/.9786111111,ray.x/.9828947368,ray.y);
  let dz=aftStairSafe(d.z);
  let horizon=.009+rough*rough*.47;
  let waterT=clamp((2.01-p.z)/dz,0.,26.);
  let waterPoint=p.xy+waterT*d.xy;
  let ripple=1.+.084*sin(waterPoint.x*13.+sin(waterPoint.y*12.))*(1.-smoothstep(.11,.31,rough));
  let water=vec3f(.063,.120,.175)*ripple;
  let sky=yachtDaySky(ray,frame.sun.xyz,false)*vec3f(.72,.79,.92);
  var light=mix(water,sky,smoothstep(-horizon,horizon,ray.y));
  var nearest=48.;

  if(saddle && d.z>.035){
    let steel=aftCockpitGuardBounce(p,d);
    if(steel.x<nearest){
      nearest=steel.x;
      light=mix(vec3f(.018,.024,.033),vec3f(.52,.58,.66),steel.y);
    }
  }

  let upper=p.z>5.94;
  let deckT=(select(3.95,6.,upper)-p.z)/dz;
  let deck=p+deckT*d;
  if(d.z<0. && deckT>.008 && deckT<nearest){
    let spread=aftCockpitSpread(rough,deckT);
    let cover=aftCockpitSpan(deck.xy,vec4f(2.34,-3.46,8.50,3.50),spread);
    let aperture=select(0.,aftCockpitSpan(deck.xy,vec4f(5.10,1.68,8.05,2.74),spread),upper);
    let weight=cover*(1.-aperture);
    if(weight>.002){light=mix(light,aftCockpitWoodBounce(deck.xy,spread,select(.077,.105,upper)),weight);}
    if(weight>.5){nearest=deckT;}
  }

  let roofT=(${ceiling}-p.z)/dz;
  let roof=p+roofT*d;
  if(d.z>0. && roofT>.008 && roofT<nearest){
    let spread=aftCockpitSpread(rough,roofT);
    let roofBounds=vec4f(3.33,-3.42,8.50,3.47);
    let weight=aftCockpitSpan(roof.xy,roofBounds,spread)*(1.-aftCockpitAperture(roof.xy,spread));
    let header=1.-smoothstep(.020,.082+spread,abs(roof.x-8.43));
    let cornice=1.-smoothstep(.019,.073+spread,abs(roof.y-3.40));
    let trim=max(header,cornice)*(1.-smoothstep(.08,.29,rough));
    light=mix(light,vec3f(.166,.176,.194)+trim*vec3f(.30,.33,.37),weight);
    if(weight>.5){nearest=roofT;}
  }

  let glassT=(8.435-p.x)/aftStairSafe(d.x);
  let glass=p+glassT*d;
  if(d.x>0. && glassT>.014 && glassT<nearest){
    let spread=aftCockpitSpread(rough,glassT);
    let weight=aftCockpitSpan(glass.yz,vec4f(-2.98,3.96,2.98,5.87),spread);
    if(weight>.002){light=mix(light,aftCockpitGlassBounce(glass,ray,spread),weight);}
    if(weight>.5){nearest=glassT;}
  }

  let sideT=(${portMooring.inner}-p.y)/aftStairSafe(d.y);
  let side=p+sideT*d;
  if(d.y>0. && sideT>.008 && sideT<nearest){
    let spread=aftCockpitSpread(rough,sideT);
    let weight=aftCockpitSpan(side.xz,vec4f(${portMooring.start},4.13,${portMooring.end},4.963),spread);
    let rail=smoothstep(4.889-spread,4.929+spread,side.z);
    light=mix(light,mix(vec3f(.097,.119,.152),vec3f(.56,.61,.70),rail),weight);
    if(weight>.5){nearest=sideT;}
  }

  if(column){
    let baseT=(${bottom}+1.13*(p.x-${column[0]})+.33*(p.y-${column[1]})-p.z)/
      aftStairSafe(d.z-1.13*d.x-.33*d.y);
    let base=p+baseT*d;
    if(baseT>.008 && baseT<nearest){
      let weight=aftCockpitSpan(base.xy,vec4f(6.385,1.752,6.742,1.909),aftCockpitSpread(rough,baseT));
      light=mix(light,vec3f(.023,.029,.041),weight);
      if(weight>.5){nearest=baseT;}
    }
  }

  let towardsTreads=(p.y<=2.84 || d.y<0.) && (p.y>=1.90 || d.y>0.);
  if(abs(d.z)>.055 && towardsTreads && p.z<6.008){
    let upwards=d.z>0.;
    for(var i=0;i<${aftCockpitTreads.length};i++){
      let level=select(aftTeakLevels[i].x,aftTeakLevels[i].y,upwards);
      let t=(level-p.z)/dz;
      if(t>.016 && t<nearest){
        let timber=p+t*d;
        let spread=aftCockpitSpread(rough,t);
        let bounds=aftTeakBounds[i];
        let weight=aftCockpitSpan(timber.xy,bounds.xwzy,spread);
        if(weight>.001 && (i!=0 || aftTeakCovers(timber.xy,i,!upwards))){
          light=mix(light,aftCockpitWoodBounce(timber.xy-vec2f(0.,bounds.w),spread,.063)*select(1.10,.37,upwards),weight);
          if(weight>.5){nearest=t;}
        }
      }
    }
  }
  return light;
}

fn aftCockpitAnchor(p:vec3f)->f32{
  let shoe=p.z-${bottom}-1.13*(p.x-${column[0]})-.33*(p.y-${column[1]});
  return mix(.49,1.,smoothstep(-.003,.039,shoe));
}

fn aftCockpitCoat(pos:vec3f,n:vec3f,stockRoughness:f32,lit:f32,finish:i32)->vec3f{
  let p=cockpitLoungeLocal(pos);
  let eye=normalize(frame.eye.xyz-pos);
  let ray=reflect(-eye,n);
  let grazing=1.-clamp(abs(dot(n,eye)),0.,1.);
  let fresnel=grazing*grazing*grazing;
  let lacquer=finish==0;
  let column=finish==3;
  let saddle=finish==4;
  let collar=column && distance(p.xy,vec2f(${column.join(',')}))>.060 && p.z>${ceiling}-.012;
  // The existing bevel facets catch a tighter highlight than the large side.
  let bevel=smoothstep(.17,.43,abs(n.x))*(1.-smoothstep(.78,.98,abs(n.x)))*
    smoothstep(.27,.54,abs(n.y));
  let rough=select(clamp(stockRoughness,.068,.13),mix(.294,.19,bevel),lacquer);
  let reflected=aftCockpitBounce(p,ray,select(rough,.105,collar),column,saddle);
  let day=.62+.38*smoothstep(-.07,.24,frame.sun.y);
  let width=.0008+rough*rough*.19;
  let lobe=width/(width+1.-max(0.,dot(ray,frame.sun.xyz)));
  let solar=vec3f(.99,.91,.80)*lit*lobe*lobe*max(0.,dot(n,frame.sun.xyz));
  if(lacquer){
    let bright=(.153+.087*bevel)+fresnel*(.27+.10*bevel);
    let floor=mix(.56,1.,smoothstep(3.951,4.022,p.z));
    let socket=1.-smoothstep(.047,.095,distance(p.xy,vec2f(${column.join(',')})));
    let contact=mix(1.,aftCockpitAnchor(p),socket);
    return ((vec3f(.0065,.0073,.0095)+reflected*bright)*day+solar*(.31+.23*bevel))*min(floor,contact);
  }
  var contact=1.;
  if(column){
    let skin=distance(p.xy,vec2f(${column.join(',')}));
    let socket=(1.-smoothstep(.004,.021,abs(p.z-${ceiling})))*(1.-smoothstep(.061,${openingRadius},skin));
    contact=select(aftCockpitAnchor(p)*(1.-.25*socket),mix(.57,1.,smoothstep(.071,.086,skin)),collar);
  }else if(finish==2){
    let lower=distance(p.xz,vec2f(6.295,4.559));
    let upper=distance(p.xz,vec2f(7.096,5.881));
    contact=mix(.56,1.,smoothstep(.012,.060,min(lower,upper)));
  }
  let metal=select(.76,.94,column || saddle);
  return ((vec3f(.012,.015,.020)+reflected*(metal+.16*fresnel))*day+solar*(.64+.28*fresnel))*contact;
}

// The underside of one tread shades the backing panel above the next nose.
fn aftCockpitRiserContact(p:vec3f)->f32{
  let rows=array<vec4f,${contacts.length}>(${contacts.join(',')});
  for(var i=0;i<${contacts.length};i++){
    let r=rows[i];
    if(p.z>=r.x-.006 && p.z<=r.y+.007){
      let sides=smoothstep(-.005,.038,min(p.y-r.z,r.w-p.y));
      let umbra=smoothstep(-.003,.014,r.y-p.z);
      let penumbra=smoothstep(.010,.078,r.y-p.z);
      let nose=smoothstep(-.002,.014,p.z-r.x);
      return (.44+.56*sides)*(.41+.27*umbra+.32*penumbra)*(.69+.31*nose);
    }
  }
  return 1.;
}

fn aftCockpitTeakLight(p:vec3f,n:vec3f,eye:vec3f,index:i32,wood:vec3f,energy:f32,sunlit:f32)->vec3f{
  let plank=aftTeakBounds[index];
  let top=smoothstep(.49,.91,n.y);
  let edge=min(p.y-plank.w,plank.y-p.y);
  let cheek=mix(.64,1.,smoothstep(-.001,.038,edge));
  let underNext=smoothstep(-.004,.047,plank.z-p.x);
  let shadow=mix(.67,.94,underNext);
  let finished=mix(.85,1.,top);
  let ray=reflect(-eye,n);
  let width=mix(.102,.045,top);
  let lobe=width/(width+1.-max(0.,dot(ray,frame.sun.xyz)));
  let grazing=1.-abs(dot(eye,n));
  let satin=sunlit*lobe*lobe*max(0.,dot(n,frame.sun.xyz))*mix(.028,.072,top);
  let day=smoothstep(-.07,.22,frame.sun.y);
  let skylight=.018*day*grazing*grazing*top*smoothstep(.0,.62,ray.y);
  // Only the rounded front edge picks up this ambient sheen. The vertical
  // face stays shaded when the tread above it blocks the direct sun.
  let noseRoll=max(0.,-n.z)*max(0.,n.y)*(1.-top);
  let shadedNose=.032*day*noseRoll*(.47+.53*grazing)*(1.-.60*sunlit);
  return wood*energy*finished*cheek*mix(1.,shadow,top)+
    (vec3f(1.,.91,.81)*satin+vec3f(.78,.88,1.)*(skylight+shadedNose))*cheek;
}
`;
