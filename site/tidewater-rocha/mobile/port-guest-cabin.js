// Door jambs are the ends of the two cabin-side partition meshes. All values
// below are provisional Rocha coordinates, fitted to the Port Double Guest Cabin.
export const cabinDoor = {aft:16.01, forward:16.96, head:3.57};
export const cabinBounds = [14.3067,.42679,17.81379,3.56276];
export const portCabin = {
  id:'LD_R03', deck:'LD', name:'Camarote de invitados de popa · Babor',
  displayName:'Camarote de invitados de popa · Babor', bbox:cabinBounds,
  spawn:[17.04,1.02,3.15], look:[15.85,2.98,2.45], label:[16.06,1.99],
  source:'VRCloud Port Double Guest Cabin and provisional shared model', status:'T/I'
};
export const cabinWalk = [[16.48,-.1],[16.48,.88],[17.04,1.02],[17.04,2.48]];

export function furnishPortCabin({add,remove,source,box,slab,outline,fit,circle}) {
  const wall='LD_PAR_027', bounds=source.get(wall).bbox;
  const [x,y,z,X,Y,Z]=bounds;
  remove(wall);
  const panel=(anchor,b,finish,name,radius=0)=>add(anchor,box(b,radius),finish,'port cabin '+name);
  for(const [a,b,end] of [[x,cabinDoor.aft,'aft'],[cabinDoor.forward,X,'forward']]) {
    panel(wall,[a,y,z,b,Y,Z],'M06','corridor wall '+end);
    for(const side of [y-.004,Y])panel(wall,[a,side,z+.008,b,side+.004,z+.047],'M08','skirting '+end+' '+side);
  }
  panel(wall,[cabinDoor.aft,y,cabinDoor.head,cabinDoor.forward,.47,Z],'M06','door lintel');
  for(const [a,end] of [[cabinDoor.aft,'aft'],[cabinDoor.forward-.018,'forward']])
    panel(wall,[a,y-.004,z,a+.018,.477,cabinDoor.head],'M96','door lining '+end);
  panel(wall,[cabinDoor.aft,y-.004,cabinDoor.head-.018,cabinDoor.forward,.477,cabinDoor.head],'M96','door head lining');
  panel(wall,[cabinDoor.aft,.325,1.555,cabinDoor.forward,.446,1.561],'M08','flush threshold');

  // The perimeter is circular after the hull's separate length and beam scales.
  const carpetRim=circle(16.06,1.9855,1.48,96);
  add('LD_DCK_001',slab(carpetRim,1.55,1.559,0),'M95','port cabin blue pile carpet');

  // The source partitions stop below the deck slab. The fitted soffit and
  // perimeter fascia close that joint in both renderers, including at the door.
  panel('LD_PAR_005',[14.30,3.515,3.74,17.82,3.57,3.825],'M06','outboard soffit fascia');
  for(const u of [14.30,17.77])
    panel('LD_PAR_006',[u,.385,3.74,u+.045,3.55,3.825],'M06','transverse soffit fascia '+u);
  panel(wall,[14.30,.387,3.65,17.82,.45,3.825],'M06','inboard soffit fascia');
  panel('LD_PAR_005',[14.307,.405,3.783,17.81,3.545,3.807],'M107','fitted overhead');
  panel('LD_FUR_001',[14.94,3.211,2.60,16.77,3.225,2.634],'M99','headboard light reveal');

  for(const [i,cx] of [15.47,16.29].entries())
    fit(i?'LD_SOF_003':'LD_SOF_002','scatter',[cx-.226,2.755,2.10,cx+.226,3.035,2.36],'M106','port cabin champagne cushion '+i);
  remove('LD_SOF_001',p=>p.feature?.includes('folded coverlet'));
  // Rows follow the duvet over the foot, crest and top. Vary both the edge
  // and the folds along its width so the runner drapes onto the mattress.
  const folds={vertices:[],indices:[]},rows=[[1.279,1.928],[1.278,2.006],[1.296,2.085],[1.39,2.119],[1.61,2.119],[1.86,2.122],[2.11,2.119]];
  for(const [j,[y0,z0]] of rows.entries())for(let i=0;i<=14;i++){
    const t=i/14,wave=Math.sin(5*Math.PI*t+.38*j),hanging=j<2;
    const u=15.14+1.32*t+.04*(j/6-.5),v=y0+Math.min(1,j/4)*.047*t+.007*wave+(j===6?.04*Math.sin(3*t):0);
    const nx=-.035*Math.cos(5*Math.PI*t+.38*j),ny=j<2?-1:j===2?-.65:j===3?-.13:0,nz=j<2?.04:1,len=Math.hypot(nx,ny,nz);
    folds.vertices.push(u,v,z0+.01*wave+(hanging?.018*Math.sin(9*t):0),nx/len,ny/len,nz/len);
    if(i&&j){const k=j*15+i;folds.indices.push(k-16,k-15,k,k-16,k,k-1);}
  }
  add('LD_SOF_001',folds,'M105','port cabin draped mauve throw');

  // Pale dressing seat and an oval mirror on the bath partition at the foot of
  // the berth. Rotate a shallow elliptical slab from horizontal to vertical.
  const dressing='LD_PAR_007';
  const ellipse=(cx,cy,cz,w,h,depth,mat,name)=>{
    const ring=Array.from({length:40},(_,i)=>[w*.5*Math.cos(i*Math.PI/20),h*.5*Math.sin(i*Math.PI/20)]);
    const g=slab(ring,0,depth,0);
    for(let i=0;i<g.vertices.length;i+=6){
      const [a,b,c,na,nb,nc]=g.vertices.slice(i,i+6);
      g.vertices.splice(i,6,cx+c,cy+a,cz+b,nc,na,nb);
    }
    add(dressing,g,mat,'port cabin '+name);
  };
  ellipse(14.35,1.10,2.94,.77,1.09,.018,'M99','oval mirror light reveal');
  ellipse(14.369,1.10,2.94,.736,1.052,.008,'M20','oval mirror polished face');
  const pad=(b,r,mat,name)=>add(dressing,slab(outline((b[0]+b[3])/2,(b[1]+b[4])/2,b[3]-b[0],b[4]-b[1],r),b[2],b[5],.015),mat,'port cabin '+name);
  pad([14.36,.53,1.56,14.77,1.50,1.88],.16,'M18','dressing seat recessed base');
  pad([14.36,.50,1.85,14.87,1.53,2.00],.18,'M39','curved upholstered dressing seat');
  pad([14.36,.53,1.96,14.49,1.47,2.17],.06,'M39','dressing seat back');
  pad([14.36,1.39,2.10,14.73,1.80,2.14],.16,'M17','oval dressing shelf');

  // Warm wood and dark edging frame the two existing hull-window openings.
  for(const [a,b] of [[14.40,15.10],[15.60,17.70]]) {
    for(const [h,edge] of [[2.412,'sill'],[3.174,'head']])
      panel('LD_PAR_005',[a-.018,3.488,h,b+.018,3.513,h+.034],'M96','window '+edge+' '+a);
    for(const u of [a-.015,b-.012])
      panel('LD_PAR_005',[u,3.488,2.446,u+.027,3.513,3.174],'M96','window jamb '+u);
  }
  for(const [u,v] of [[14.77,.96],[17.10,1.10],[17.06,2.75]]) {
    add('LD_DCK_001',slab(outline(u,v,.073,.073,.035),3.777,3.784,0),'M99','port cabin recessed downlight '+u);
  }
}
