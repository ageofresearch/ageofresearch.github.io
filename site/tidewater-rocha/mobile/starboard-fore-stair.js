// The Grande 36M donor has thirteen intermediate teak treads between two
// landings. Register that flight to the clear strip beside the Rocha glazing.
export const foreStair={x:18.78,y:-3.397,run:.15,width:.438,lower:3.95,upper:6,count:13};
const {x,y,run,width,lower,upper,count}=foreStair;
const end=x+count*run,inner=y+width/2,outer=y-width/2;
const rect=(l,b,r,t)=>[[l,b],[r,b],[r,t],[l,t]];
export const foreAperture=rect(x-.26,outer-.038,end,inner+.004);
const height=i=>lower+(upper-lower)*i/(count+1);

export function furnishForeStair({add,box}){
  const part=(g,mat,label)=>add('MD_SUP_007',g,mat,'forward side stair '+label,false);
  for(let i=1;i<=count;i++){
    const front=x+(i-1)*run,top=height(i);
    part(box([front,outer,top-.047,front+run,inner,top],.004),'M43','tread '+i);
  }
  // Parallelogram prisms retain vertical end faces and flush upper/lower
  // bearing faces. Inclined side normals follow the incline of the stringer.
  function incline(x0,x1,y0,y1,z0,z1,depth,mat,label){
    const g=box([x0,y0,z0-depth,x1,y1,z0],0),slope=(z1-z0)/(x1-x0);
    for(let i=0;i<g.vertices.length;i+=6){
      g.vertices[i+2]+=(g.vertices[i]-x0)*slope;
      const nx=g.vertices[i+3]-slope*g.vertices[i+5],ny=g.vertices[i+4],nz=g.vertices[i+5];
      const n=Math.hypot(nx,ny,nz);g.vertices[i+3]=nx/n;g.vertices[i+4]=ny/n;g.vertices[i+5]=nz/n;
    }
    part(g,mat,label);
  }
  for(const [side,edge] of [['inboard',inner],['outboard',outer]]){
    incline(x,end,edge-.014,edge+.014,lower+.085,upper-.061,.105,'M47',side+' stringer');
    incline(x,end,edge-.018,edge+.018,lower+.90,upper+.90,.034,'M19',side+' handrail');
    for(const [i,along] of [x+.02,x+6.5*run,end-.02].entries()){
      const h=lower+(along-x)/(end-x)*(upper-lower);
      part(box([along-.012,edge-.012,h+.02,along+.012,edge+.012,h+.89],0),'M19',side+' upright '+i);
    }
  }
  // Trim the exposed inboard core of the upper deck and guard its approach.
  part(box([x-.26,inner+.004,5.88,end,inner+.017,6],0),'M113','deck cut lining');
  part(box([x-.26,inner-.015,6.82,end,inner+.009,6.85],0),'M19','upper guard');
  for(const xx of [x-.25,x+.76,end-.02]){
    part(box([xx,inner-.014,6,xx+.018,inner+.004,6.82],0),'M19','upper guard post '+xx);
  }
}

export function foreFlightDefinition(){
  const path=[[x,y],[end+.20,y],[end+.20,inner+.22]];
  const distances=[0,path[1][0]-path[0][0],path[1][0]-path[0][0]+path[2][1]-y];
  const route={id:'starboard-fore',name:'Escalera exterior de estribor',lower:'MD',upper:'UD',
    path,distances,length:distances[2],width,steps:count};
  const steps=Array.from({length:count},(_,i)=>({id:route.id+'/'+(i+1),height:height(i+1),
    polygons:[rect(x+i*run,outer,x+(i+1)*run,inner)]}));
  return {route,steps,landings:{lower:[rect(x-.47,outer,x,inner)],
    upper:[rect(end,outer,end+.43,inner+.53)]}};
}
