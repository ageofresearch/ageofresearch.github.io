import {starboardMooring as station} from './cockpit-fittings.js?v=stbd-cockpit-1';

const gelcoat = {finish:[0x939daf,.28,.17,4]};
const satin = {finish:[0x969da9,.31,.21,4]};
const panelFinish = {finish:[0x858e9f,.32,.15,4]};
const steel = {finish:[0xd0d6df,.12,1,65]};
const teak = {finish:[0xa39a94,.78,0,1]};
const seam = {finish:[0x313037,.75,0,0]};
const rectangle = (x,z,X,Z) => [[x,z],[X,z],[X,Z],[x,Z]];
const starboard = points => points.map(([x,y]) => [x,-y]);

export function buildStarboardMooring(add,{extrude,face,post,pipe}) {
  const {start,end,inner,outer,sill,axis,fascia,dockside,drum,forward}=station;
  const body = (points,z,Z,r) => extrude(starboard(points),z,Z,r);
  const horizontal = (points,level) =>
    face(starboard(points),(x,y)=>({point:[x,y,level(x)],normal:[0,0,1]}));
  const panel = (points,y) => {
    const mesh=face(points,(x,z)=>({point:[x,-y,z],normal:[0,1,0]}));
    for(let i=0;i<mesh.indices.length;i+=3)
      [mesh.indices[i+1],mesh.indices[i+2]]=[mesh.indices[i+2],mesh.indices[i+1]];
    return mesh;
  };
  const disk = (x,z,y,r) => panel(Array.from({length:8},(_,i)=>{
    const a=i*Math.PI/4;
    return [x+r*Math.cos(a),z+r*Math.sin(a)];
  }),y);
  const skin = (mesh,name,finish=gelcoat) => add(mesh,'M89','starboard mooring '+name,finish);
  const chrome = (mesh,name) => add(mesh,'M19',name,steel);
  const openPost = (base,top,r,R,sides) => {
    const mesh=post(base,top,r,R,sides);
    mesh.indices.length=sides*6;
    mesh.vertices.length=sides*12;
    return mesh;
  };

  // The solid cabinet has one rounded return to the stair landing and an
  // inset shelf. The rail opening runs above it between the polished posts.
  const mainShell=[[start,3.43],[start+.11,3.413],[start+.26,inner],[end-.26,inner],
    [end-.095,3.41],[end,3.43],[end,outer],[start,outer]];
  const heel=[[2.46,3.57],[2.60,3.47],[2.80,3.43],[start,3.43],[start,outer],[2.46,3.72]];
  skin(body(mainShell,3.95,sill,.032),'cabinet');
  const returnCap=x=>sill-(start-x)*.14/(start-2.46);
  const returnShell=body(heel,3.95,sill,0);
  for(let i=0;i<returnShell.vertices.length;i+=6){
    const [x,,z]=returnShell.vertices.slice(i,i+3);
    returnShell.vertices[i+2]+=(z-3.95)/(sill-3.95)*(returnCap(x)-sill);
  }
  skin(returnShell,'molded stair return');

  const field=[[start+.09,3.459],[start+.16,3.44],[start+.28,inner+.039],[end-.24,inner+.039],
    [end-.12,3.44],[end-.055,3.45],[end-.055,outer-.036],[start+.09,outer-.036]];
  // The timber sits just above the cabinet cap, inside the rounded shoulder.
  add(horizontal(field,()=>sill+.001),'M100','starboard mooring inset teak shelf',teak);
  const faceY=inner-.002;
  add(panel(rectangle(3.65,4.012,4.97,4.293),faceY),'M47','starboard mooring lower hatch reveal',seam);
  skin(panel(rectangle(3.657,4.019,4.963,4.286),faceY-.001),'flush lower hatch',panelFinish);
  add(panel([[5.38,4.008],[5.67,4.008],[5.64,4.102],[5.41,4.102]],faceY-.002),
    'M47','starboard mooring socket recess',seam);
  for(const [x,color] of [[5.47,0x8f2820],[5.56,0x161b21]]){
    chrome(disk(x,4.053,faceY-.008,.031),'starboard mooring socket bezel '+x);
    add(disk(x,4.053,faceY-.009,.023),'M47',
      'starboard mooring socket '+x,{finish:[color,.39,0,0]});
  }

  const high=[[2.85,fascia],[end-.03,fascia],[end,3.576],[end,3.74],[2.85,3.74]];
  skin(body(high,4.647,4.974,.018),'satin upper fascia',satin);
  // The real aft cap tapers out into a polished bracket beside the stair.
  const tip=body([[2.38,3.602],[2.59,3.561],[2.85,fascia],[2.85,3.74],[2.56,3.74],[2.42,3.686]],4.647,4.974,.016);
  for(let i=0;i<tip.vertices.length;i+=6){
    const [x,,z]=tip.vertices.slice(i,i+3);
    tip.vertices[i+2]+=(2.85-x)/.47*(4.962-z)*.63;
  }
  chrome(tip,'starboard mooring polished aft nose');
  chrome(body([[2.56,3.52],[2.76,3.43],[2.79,3.67],[2.58,3.70]],4.25,4.825,.014),
    'starboard mooring tapered end bracket');
  for(const [a,b] of [[2.98,3.48],[3.86,5.71]]){
    add(panel(rectangle(a,4.679,b,4.944),fascia-.002),'M47','starboard mooring upper cover reveal '+a,seam);
    skin(panel(rectangle(a+.006,4.686,b-.006,4.938),fascia-.003),'flush upper cover '+a,panelFinish);
  }
  chrome(disk(2.765,4.789,fascia+.003,.017),'starboard mooring round catch');
  skin(body([[2.73,3.685],[end,3.685],[end,3.755],[2.73,3.755]],sill+.008,sill+.04,.006),
    'outer lower window sill',satin);
  for(const x of [3.06,3.66,4.44,5.23,5.79])
    chrome(openPost([x,-3.68,sill+.025],[x,-3.68,4.661],.021,.024,6),'starboard mooring polished support '+x);

  const oval=(x,rx,ry)=>Array.from({length:10},(_,i)=>{
    const a=i*Math.PI/5;
    return [x+rx*Math.cos(a),axis+ry*Math.sin(a)];
  });
  for(const [x,suffix] of [[dockside,'-1'],[forward,'forward -1']]){
    chrome(body(oval(x,.208,.10),sill+.001,sill+.036,0),'cockpit cleat sole '+suffix);
    const shape=[[-.154,.246],[-.125,.160],[-.104,.083],[-.071,.071],[.071,.071],[.104,.083],[.125,.160],[.154,.246]];
    chrome(pipe(shape.map(([dx,z])=>[x+dx,-axis,sill+z]),.044,8,{startCap:false,endCap:false}),'starboard mooring cast twin horn '+suffix);
    for(const sign of [-1,1]){
      const cx=x+sign*.154;
      const crown=post([cx,-axis,sill+.241],[cx,-axis,sill+.265],.048,.052,10);
      for(let i=0;i<crown.vertices.length;i+=6){
        crown.vertices[i]=cx+(crown.vertices[i]-cx)*1.28;
        const nx=crown.vertices[i+3]/1.28,ny=crown.vertices[i+4],nz=crown.vertices[i+5];
        const d=Math.hypot(nx,ny,nz);
        crown.vertices.splice(i+3,3,nx/d,ny/d,nz/d);
      }
      chrome(crown,'starboard mooring oval horn head '+suffix+' '+sign);
    }
  }
  add(openPost([drum,-axis,sill-.001],[drum,-axis,sill+.008],.132,.132,12),'M47','starboard mooring capstan gasket',seam);
  chrome(openPost([drum,-axis,sill+.008],[drum,-axis,sill+.036],.131,.128,12),'cockpit mooring drum foot -1');
  chrome(openPost([drum,-axis,sill+.036],[drum,-axis,sill+.091],.128,.086,12),'starboard mooring capstan flared skirt');
  chrome(openPost([drum,-axis,sill+.087],[drum,-axis,sill+.233],.078,.076,12),'cockpit mooring drum -1');
  chrome(post([drum,-axis,sill+.229],[drum,-axis,sill+.249],.091,.099,12),'cockpit mooring drum crown -1');

  const margin=[[start-.15,3.27],[start+.18,3.17],[start+.37,3.153],[end-.30,3.153],[end-.10,3.23],[end-.02,3.33],
    [end-.138,3.329],[end-.31,3.264],[start+.39,3.26],[start+.195,3.275],[start-.13,3.368]];
  add(horizontal(margin,()=>3.956),'M43','starboard mooring curved sole margin',teak);
}

export function buildStarboardCockpitSeat(add,{extrude,face,pipe}) {
  const arm=[[2.61,2.09],[2.75,2.03],[3.03,2.05],[3.21,2.13],[3.30,2.24],[3.28,2.40],[3.16,2.48],[2.85,2.49],[2.69,2.41]];
  const body=(points,z,Z,r)=>extrude(starboard(points),z,Z,r);
  const cheek=body(arm,3.954,4.929,.036);
  for(let i=0;i<cheek.vertices.length;i+=6){
    const [x,y,z]=cheek.vertices.slice(i,i+3);
    const t=Math.max(0,(z-4.263)/.666);
    const slope=Math.max(0,(x-2.67)/.64);
    cheek.vertices[i]-=.21*t*slope;
    cheek.vertices[i+1]+=.10*t*Math.max(0,(-y-2.06)/.43);
    cheek.vertices[i+2]-=.145*t*slope;
  }
  add(cheek,'M89','starboard cockpit seat swept gelcoat arm',gelcoat);
  // A narrow sleeve reproduces the joint between the arm and its pedestal.
  // Its horizontal faces sit inside the mould and need no separate caps.
  const joint=arm.map(([x,y])=>[x+(x-2.96)*.055,y+(y-2.24)*.055]);
  const gasket=body(joint,4.235,4.255,0);
  gasket.indices.length=joint.length*6;
  gasket.vertices.length=joint.length*12;
  add(gasket,'M47','starboard cockpit seat arm gasket',seam);
  const inlay=[[2.753,1.64],[3.095,1.65],[3.294,1.76],[3.30,1.99],[3.17,2.145],[2.72,2.09]];
  const apron=body(inlay,4.065,4.305,0);
  apron.indices.length=inlay.length*6;
  apron.vertices.length=inlay.length*12;
  add(apron,'M89','starboard cockpit seat molded teak support',gelcoat);
  add(face(starboard(inlay),(x,y)=>({point:[x,y,4.306],normal:[0,0,1]})),
    'M43','starboard cockpit seat inset teak',{finish:[0xa28673,.63,.04,2]});
  const grip=[[2.66,2.325,4.841],[2.692,2.383,4.878],[2.75,2.422,4.908],
    [2.873,2.433,4.903],[2.974,2.44,4.859],[3.037,2.438,4.814],[3.061,2.422,4.771]];
  add(pipe(grip.map(([x,y,z])=>[x,-y,z]),.023,8),'M19','starboard cockpit seat polished return grip',steel);
  const trim=[[2.70,2.38],[2.86,2.50],[3.18,2.52],[3.34,2.45],[3.39,2.29],[3.36,1.71],
    [3.30,1.70],[3.32,2.28],[3.27,2.41],[3.16,2.455],[2.84,2.44],[2.72,2.34]];
  add(face(starboard(trim),(x,y)=>({point:[x,y,3.956],normal:[0,0,1]})),
    'M43','starboard cockpit seat curved sole margin',teak);
}
