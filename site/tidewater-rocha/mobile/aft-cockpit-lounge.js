import {chaiseTowardStair} from './aft-cockpit-joins.js?v=1';

export const cockpitSoleFinish = 75;
export const cockpitLacquerFinish = 76;
export const cockpitAftGlassFinish = 52;
export const cockpitPortalFinish = 78;
export const cockpitUpholsteryFinish = 79;

// Main-deck coordinates. Match the service enclosure to the existing stair
// and glazing rather than putting a second plane in front of the glass.
export const cockpitLocker = {
  door:[6.870,4.002,7.695,5.418],
  switchX:6.59,
  switchZ:[4.471,4.593],
  wallEnd:8.427,
};

export const cockpitLoungeWGSL = /* wgsl */ `
fn cockpitLoungeLocal(pos:vec3f)->vec3f{
  return vec3f((pos.z+17.615)/.9786111111,pos.x/.9828947368,pos.y+2.01);
}
fn cockpitLoungeRadiance(p:vec3f,ray:vec3f,rough:f32)->vec3f{
  let d=vec3f(ray.z/.9786111111,ray.x/.9828947368,ray.y);
  let edge=.018+rough*.12;
  let horizon=smoothstep(-edge,edge,ray.y);
  let sky=yachtDaySky(ray,frame.sun.xyz,false);
  var light=mix(vec3f(.065,.121,.172),sky*vec3f(.82,.88,.96),horizon);
  var nearest=40.;
  let tz=aftStairSafe(d.z);
  let floorT=(3.95-p.z)/tz;
  let floor=p+floorT*d;
  if(floorT>.009 && floorT<nearest && aftStairInside(floor.xy,vec4f(2.40,-3.68,8.45,3.54))){
    nearest=floorT;
    let span=1.-smoothstep(.13,1.90,rough*floorT);
    let grain=(.81+.19*sin(floor.y*86.))*span+(1.-span)*.86;
    light=vec3f(.208,.131,.076)*grain;
  }
  let roofT=(5.88-p.z)/tz;
  let roof=p+roofT*d;
  if(roofT>.009 && roofT<nearest && aftStairInside(roof.xy,vec4f(3.37,-3.37,8.50,3.48)) &&
     !aftStairInside(roof.xy,vec4f(5.70,1.96,8.07,2.71))){
    nearest=roofT;
    let highlight=1.-smoothstep(.04,.16,abs(roof.x-8.41));
    light=vec3f(.218,.220,.223)+highlight*vec3f(.092,.095,.101);
  }
  let seatT=(${1.08+chaiseTowardStair}-p.y)/aftStairSafe(d.y);
  let cushion=p+seatT*d;
  if(seatT>.008 && seatT<nearest && d.y<0. && cushion.x>6.01 && cushion.x<8.06 &&
     cushion.z>4.025 && cushion.z<4.664){
    // A bounded reflection of the cushion assembly. The upholstered seat
    // occludes the floor, and the inset back only occupies the forward end.
    let seat=(cushion.xz-vec2f(7.036,4.194))/vec2f(1.009,.161);
    let back=(cushion.xz-vec2f(7.36,4.476))/vec2f(.64,.174);
    let blend=.04+rough*.64;
    let cover=1.-smoothstep(.94,1.+blend,min(dot(seat,seat),dot(back,back)));
    light=mix(light,vec3f(.155,.152,.157),cover);
    if(cover>.5){nearest=seatT;}
  }
  let panelT=(8.43-p.x)/aftStairSafe(d.x);
  let panel=p+panelT*d;
  if(panelT>.018 && panelT<nearest && aftStairInside(panel.yz,vec4f(-3.00,3.96,1.378,5.88))){
    let door=1.-smoothstep(.65,.76,abs(panel.y-.09));
    let trim=1.-smoothstep(.013,.060,min(abs(panel.y-.748),abs(panel.y-1.378)));
    light=mix(vec3f(.026,.032,.040),vec3f(.240,.170,.119),door)+vec3f(.24)*trim;
  }
  return light*(.64+.36*smoothstep(-.02,.25,frame.sun.y));
}

@diagnostic(off,derivative_uniformity)
fn cockpitLoungeCoat(pos:vec3f,n:vec3f,rough:f32,lit:f32,frameMetal:bool)->vec3f{
  let p=cockpitLoungeLocal(pos);
  let eye=normalize(frame.eye.xyz-pos);
  let face=abs(dot(n,eye));
  let edge=1.-clamp(face,0.,1.);
  let ray=reflect(-eye,n);
  let reflected=cockpitLoungeRadiance(p,ray,rough);
  let width=.001+rough*rough*.12;
  let lobe=width/(width+1.-max(0.,dot(ray,frame.sun.xyz)));
  let sun=.78*lobe*lobe*lit*max(0.,dot(n,frame.sun.xyz));
  if(frameMetal){
    let seam=min(min(abs(p.y-.728),abs(p.y-1.365)),min(abs(p.y+.554),abs(p.y+2.970)));
    let track=min(abs(p.z-3.957),abs(p.z-5.847));
    let rail=1.-smoothstep(.007,.019,track);
    let bevel=1.-smoothstep(.002,.009,abs(seam-.006));
    let metal=select(.16+.75*max(rail,bevel),.74,p.x<8.37);
    return (.016+reflected*metal)+vec3f(.94,.89,.82)*sun;
  }
  let door=vec4f(${cockpitLocker.door.join(',')});
  let box=abs(p.xz-(door.xy+door.zw)*.5)-(door.zw-door.xy)*.5;
  let doorDistance=length(max(box,vec2f(0.)))+min(max(box.x,box.y),0.);
  let aa=clamp(length(fwidth(p.xz))*.55,.001,.016);
  let gap=1.-smoothstep(.0015,.0025+aa,abs(doorDistance));
  let lip=1.-smoothstep(.0015,.0045+aa,abs(doorDistance-.006));
  let fiber=(.985+.015*sin(p.x*117.+.6*sin(p.z*4.)));
  return (vec3f(.0076,.0072,.0079)+reflected*(.068+.26*edge*edge*edge))*
    (fiber-.39*gap+.16*lip)+vec3f(.94,.90,.80)*sun;
}
`;
