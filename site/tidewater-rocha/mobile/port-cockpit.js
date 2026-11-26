import {portMooring,starboardMooring} from './cockpit-fittings.js?v=stbd-cockpit-1';

const gelcoat = {finish:[0x8995ac,.29,.13,4]};
const satin = {finish:[0x7d8290,.31,.20,4]};
const steel = {finish:[0xd0d6df,.12,1,65]};
const teak = {finish:[0x9e9898,.79,0,1]};
const edging = {finish:[0xa49a92,.76,0,1]};
const seam = {finish:[0x2b292b,.74,0,0]};
const rect = (a,b,c,d) => [[a,b],[c,b],[c,d],[a,d]];

export function buildPortMooringCoaming(add,{extrude,face,post}) {
  const {start,end,inner,outer,sill}=portMooring;
  const mould=(mesh,name,finish=gelcoat)=>add(mesh,'M89',name,finish);
  const deck=(loop,z)=>face(loop,(x,y)=>({point:[x,y,z],normal:[0,0,1]}));
  const panel=(loop,y)=>face(loop,(x,z)=>({point:[x,y,z],normal:[0,-1,0]}));
  // The inboard return curves into the landing, with a distinct rolled lip
  // around the teak shelf. The upper cover carries no raised tubular guard.
  const shell=[[2.34,3.52],[2.46,3.42],[2.68,3.348],[2.96,3.34],[3.12,3.33],[3.25,inner],
    [end-.24,inner],[end-.09,3.30],[end,3.41],[end,outer],[2.54,outer],[2.34,3.73]];
  const field=[[3.17,3.47],[3.23,3.38],[3.28,3.33],[3.37,3.316],
    [end-.26,3.316],[end-.13,3.35],[end-.052,3.43],[end-.052,3.752],[3.17,3.752]];
  const sillAt=x=>sill-.15*Math.max(0,(3.12-x)/.78);
  const base=extrude(shell,3.95,sill-.01,.025);
  for(let i=0;i<base.vertices.length;i+=6){
    const section=(base.vertices[i+2]-3.95)/(sill-.01-3.95);
    base.vertices[i+2]+=section*(sillAt(base.vertices[i])-sill);
  }
  mould(base,'integrated mooring recess lower ledge');
  const split=3.12;
  const rearCap=shell.slice(0,5).concat([[split,outer],...shell.slice(-2)]);
  mould(face(rearCap,(x,y)=>({point:[x,y,sillAt(x)],normal:[-.189,0,1]})),
    'port mooring stern return cap');
  const rim=face([shell[4],...shell.slice(5,-2),[split,outer]],
    (x,y)=>({point:[x,y,sill],normal:[0,0,1]}),[field]);
  mould(rim,'port mooring shelf lip');
  add(deck(field,sill),'M100','port mooring shelf teak',teak);
  const lid=rect(3.613,4.008,4.34,4.302);
  const lidInset=rect(3.622,4.016,4.332,4.294);
  add(panel(lid,inner-.026),'M47','port mooring lower hatch seam',seam);
  mould(panel(lidInset,inner-.028),'port mooring lower flush hatch',{finish:[0x7c889c,.35,.11,4]});
  const sockets=[[5.11,4.006],[5.37,4.006],[5.35,4.113],[5.14,4.113]];
  mould(panel(sockets,inner-.026),'port mooring recessed socket surround',{finish:[0x414853,.36,.12,4]});
  for(const [x,color] of [[5.20,0x8f211a],[5.29,0x202329]]){
    add(post([x,inner-.023,4.059],[x,inner-.031,4.059],.034,.032,10),'M19','port mooring socket rim '+x,steel);
    add(post([x,inner-.032,4.059],[x,inner-.034,4.059],.024,.024,10),'M47',
      'port mooring socket centre '+x,{finish:[color,.38,0,0]});
  }

  const upper=[[2.34,3.47],[2.45,3.35],[2.58,3.30],[end-.02,3.30],
    [end+.05,3.35],[end+.05,3.75],[2.56,3.75],[2.38,3.66]];
  const cover=extrude(upper,4.658,4.964,.022);
  for(let i=0;i<cover.vertices.length;i+=6){
    const t=Math.max(0,(2.64-cover.vertices[i])/.30);
    cover.vertices[i+2]+=t*(.105-(cover.vertices[i+2]-4.658)*.47);
  }
  mould(cover,'port mooring satin upper coaming',satin);
  for(const [a,c] of [[3.065,3.49],[3.90,5.39]]){
    add(panel(rect(a,4.686,c,4.921),3.298),'M47','port mooring cover reveal '+a,seam);
    mould(panel(rect(a+.006,4.693,c-.006,4.914),3.297),
      'port mooring flush upper cover '+a,{finish:[0x606879,.37,.10,4]});
  }
  // Small control plate seen above the broad end bracket. The markings
  // occupy a single group and stay flush against the plate.
  add(panel(rect(2.65,4.704,2.77,4.887),3.296),'M19','port mooring perforated plate',steel);
  for(let row=0;row<4;row++)for(let column=0;column<3;column++){
    const x=2.674+column*.033,z=4.733+row*.042;
    add(panel(rect(x-.006,z-.005,x+.006,z+.005),3.295),'M47','port mooring plate mark '+row+' '+column,seam);
  }
  add(post([2.827,3.299,4.744],[2.827,3.291,4.744],.013,.013,8),'M19','port mooring circular catch',steel);
  add(extrude([[2.53,3.46],[2.70,3.37],[2.70,3.59],[2.54,3.64]],4.13,4.729,.018),
    'M19','port mooring broad end bracket',steel);
  for(const [x,z] of [[2.90,4.255],[3.25,sill],[3.86,sill],[4.63,sill],[5.40,sill]]){
    add(post([x,3.68,z],[x,3.68,4.669],.024,.025,10),'M19','port mooring polished support '+x,steel);
  }
  // The covering board follows the rounded body, with a narrow caulk seam
  // outside it. These faces sit above the scored field of the cockpit sole.
  const rimWalk=[[3.00,3.24],[3.11,3.18],[3.29,3.15],[5.33,3.15],[5.55,3.24],
    [5.58,3.40],[5.48,3.46],[5.33,3.25],[3.29,3.252],[3.17,3.29],[3.04,3.36]];
  add(deck(rimWalk,3.954),'M43','port mooring curved sole margin',edging);
}

export function buildPortMooringHardware(add,{extrude,outline,post,pipe}) {
  const {axis:y,sill,cleat,drum,forwardCleat}=portMooring;
  const metal=(shape,name)=>add(shape,'M19',name,steel);
  for(const [x,suffix] of [[cleat,'1'],[forwardCleat,'forward 1']]){
    const base=outline(x,y,.42,.205,.08);
    add(extrude(base,sill-.001,sill+.007,.005),'M47','cockpit port cleat gasket '+suffix,seam);
    metal(extrude(outline(x,y,.397,.184,.078),sill+.007,sill+.033,.012),'cockpit cleat sole '+suffix);
    const path=[[-.153,.261],[-.129,.195],[-.113,.099],[-.087,.073],[.087,.073],
      [.113,.099],[.129,.195],[.153,.261]].map(([u,z])=>[x+u,y,sill+z]);
    metal(pipe(path,.049,10),'cockpit port cast twin horn '+suffix);
    for(const sign of [-1,1]){
      metal(extrude(outline(x+sign*.154,y,.137,.109,.043),
        sill+.261,sill+.285,.010),'cockpit port cleat oval crown '+suffix+' '+sign);
    }
  }
  const x=drum;
  add(post([x,y,sill-.001],[x,y,sill+.007],.128,.128,14),'M47','cockpit port drum seating gasket',seam);
  metal(post([x,y,sill+.007],[x,y,sill+.032],.125,.126,14),'cockpit mooring drum foot 1');
  metal(post([x,y,sill+.032],[x,y,sill+.092],.124,.086,14),'cockpit port capstan flared base');
  metal(post([x,y,sill+.09],[x,y,sill+.226],.075,.077,14),'cockpit mooring drum 1');
  metal(post([x,y,sill+.223],[x,y,sill+.243],.089,.098,14),'cockpit mooring drum crown 1');
  metal(post([x,y,sill+.243],[x,y,sill+.245],.018,.018,10),'cockpit port capstan centre');
}

export function buildPortCockpitSeat(add,{extrude,outline,pipe,cushion,face}) {
  const arm=[[2.63,2.18],[2.73,2.10],[3.06,2.13],[3.22,2.20],[3.30,2.30],
    [3.27,2.42],[3.15,2.49],[2.91,2.50],[2.75,2.43]];
  const body=extrude(arm,3.97,4.92,.063);
  for(let i=0;i<body.vertices.length;i+=6){
    const [x,y,z]=body.vertices.slice(i,i+3);
    const t=Math.max(0,(z-4.04)/.88);
    body.vertices[i]-=(.11+.19*Math.max(0,(x-2.84)/.46))*t;
    body.vertices[i+1]-=.13*t*Math.max(0,(y-2.15)/.35);
    body.vertices[i+2]-=.14*t*Math.max(0,(x-2.85)/.45);
  }
  add(body,'M89','port cockpit seat swept gelcoat arm',gelcoat);
  const inlay=[[2.78,1.70],[3.18,1.70],[3.30,1.80],[3.29,2.10],[3.19,2.20],[2.76,2.11]];
  add(extrude(inlay,4.28,4.31,.012),'M43','port cockpit seat warm teak inset',{finish:[0x9f8478,.72,0,2]});
  add(cushion(outline(3.13,1.60,.75,.44,.16),4.28,4.51),
    'M91','port cockpit seat soft grey cushion',{finish:[0xd0d2db,.86,0,50]});
  add(pipe([[2.72,2.236,4.878],[2.74,2.251,4.927],[2.79,2.276,4.941],[2.94,2.284,4.925],
    [3.02,2.282,4.894],[3.07,2.280,4.851],[3.10,2.283,4.815]],.018,8),'M19',
    'port cockpit seat polished return grip',steel);
  add(face([[2.74,2.41],[2.90,2.53],[3.19,2.54],[3.31,2.46],[3.37,2.31],[3.34,1.76],
    [3.29,1.75],[3.31,2.30],[3.25,2.42],[3.16,2.48],[2.89,2.48],[2.76,2.38]],
    (x,y)=>({point:[x,y,3.956],normal:[0,0,1]})),'M43','port cockpit seat curved sole margin',edging);
}

// Local approach to the yacht's nearest broad reflecting surfaces. The
// polished castings use live normals, eye and sun, in the existing draw.
export const cockpitSteelWGSL = `
fn cockpitSteel(pos:vec3f, normal:vec3f, roughness:f32, lit:f32)->vec3f{
 let eye=normalize(frame.eye.xyz-pos);
 let ray=reflect(-eye,normal);
 let model=vec3f((pos.z+17.615)/.97861111,pos.x/.98289474,pos.y+2.01);
 let axis=vec3f(ray.z/.97861111,ray.x/.98289474,ray.y);
 let descent=max(.0001,-axis.z);
 let starboard=model.y<0.;
 let side=select(1.,-1.,starboard);
 let sill=select(${portMooring.sill},${starboardMooring.sill},starboard);
 let shelf=model+axis*(model.z-sill)/descent;
 let sole=model+axis*(model.z-3.95)/descent;
 let onShelf=axis.z<-.001 && model.z>sill &&
  shelf.x>select(${portMooring.start},${starboardMooring.start},starboard) &&
  shelf.x<select(${portMooring.end},${starboardMooring.end},starboard) &&
  shelf.y*side>select(${portMooring.inner},${starboardMooring.inner},starboard) &&
  shelf.y*side<${portMooring.outer};
 let onDeck=axis.z<-.001 && sole.x>2.32 && sole.x<8.5 && abs(sole.y)<3.25;
 let rising=max(.0001,axis.z);
 let underside=select(4.658,4.647,starboard);
 let cover=model+axis*(underside-model.z)/rising;
 let beneathCover=axis.z>.001 && model.z<underside && cover.x>2.36 &&
  cover.x<select(5.62,${starboardMooring.end},starboard) && cover.y*side>select(3.30,${starboardMooring.fascia},starboard) && cover.y*side<3.75;
 let water=mix(vec3f(.039,.076,.095),vec3f(.11,.19,.26),smoothstep(-.76,-.04,ray.y));
 let sky=yachtDaySky(ray,frame.sun.xyz,false);
 var radiance=mix(water*.52,sky*.87,smoothstep(-.045,.055,ray.y));
 if(onDeck){radiance=vec3f(.265,.229,.217);}
 if(onShelf){radiance=vec3f(.223,.199,.197);}
 if(beneathCover){radiance=vec3f(.12,.136,.165);}
 let edge=1.-clamp(abs(dot(normal,eye)),0.,1.);
 let incidence=max(0.,dot(normal,frame.sun.xyz));
 let spread=.0007+roughness*roughness*.16;
 let rayMatch=spread/(spread+1.-max(0.,dot(ray,frame.sun.xyz)));
 let sunlight=lit*incidence*rayMatch*rayMatch;
 return mix(vec3f(.58,.62,.68),vec3f(.98),pow(edge,5.))*radiance+
  sunlight*vec3f(.82,.75,.65);
}
`;
