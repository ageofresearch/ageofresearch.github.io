// Plane convention: GPU-local X is port, Y is up and Z is forward.
// Bake conservative views for the platform and the two long directions of the
// outside bow passage, and the view aft from the cockpit aisle. Other positions, orientations and fields of view retain
// the ordinary all-direction draw for their longitudinal band.
const cells={
  exterior:[
    [-2.2,-3.55,4.30,.95,-1.85,4.56],[-2.2,-1.85,4.30,.95,-.35,4.56],
    [-2.2,-.35,4.30,.95,1.15,4.56],[-2.2,1.15,4.30,.95,3.55,4.56],
    [5.52,-2.42,4.95,7.90,1.26,5.68,-1,[2.8,4.8,1.25]],
    [8.55,-2.65,5.25,14.25,2.65,5.73,1],
    [13.9,-2.25,5.25,18.7,.55,5.73,[-1,1,0]],

  ],
  upper:[[13.7,-1.9,7.25,18.65,1.78,7.85,-1],[13.7,-1.9,7.25,18.65,1.78,7.85,1]],
  // Enclosed distributor and stair. Turns on the treads require all azimuths.
  guest:[[16.0,-1.95,5.00,19.4,-.90,5.72,[-1,1,0]],
    [17.7,-1.95,3.34,19.4,.20,5.00,[-1,1,0]],
    [13.3,-.75,2.92,17.35,.52,3.34,[-1,1,0]],
    [17.35,-.82,2.92,19.4,.20,3.55,[-1,1,0]],
    [14.34,.31,2.92,17.78,1.35,3.34,[-1,1,0]],
    [14.34,1.35,2.92,17.78,3.52,3.34,[-1,1,0]]],
  bow:[[13.75,-3.6,7.32,18.72,-2.55,7.85],[18.72,-3.52,7.32,23.6,-2.21,7.85],
    [23.6,-3.4,7.32,26.8,-1.9,7.85],[26.8,-2.5,7.32,29.4,2.5,7.85]],
};
const axes=[[1,2],[0,2],[0,1]];
const key=n=>Math.round(n*1e5);
function meshData(geometry) {
  const pos=geometry.attributes.position.array,surf=geometry.attributes.aSurface.array,idx=geometry.index.array;
  const points=Array.from({length:pos.length/3},(_,i)=>[pos[i*3],pos[i*3+1],pos[i*3+2]]);
  const faces=[],planes=new Map();
  for(let i=0;i<idx.length;i+=3){
    const ids=[idx[i],idx[i+1],idx[i+2]],v=ids.map(k=>points[k]);
    const [a,b,c]=v,u=b.map((x,k)=>x-a[k]),w=c.map((x,k)=>x-a[k]);
    const n=[u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0]];
    const len=Math.hypot(...n),kind=surf[ids[0]*4+2];
    const lo=a.map((x,k)=>Math.min(x,b[k],c[k])),hi=a.map((x,k)=>Math.max(x,b[k],c[k]));
    const background=[44,45,46,47,49].includes(kind);
    faces.push({ids,v,lo,hi,n,len,background});
    if(background||len<.55)continue;
    for(let axis=0;axis<3;axis++){
      if(hi[axis]-lo[axis]>1e-5)continue;
      const [j,k]=axes[axis],corners=v.map(p=>{
        if(Math.min(Math.abs(p[j]-lo[j]),Math.abs(p[j]-hi[j]))>1e-5||
           Math.min(Math.abs(p[k]-lo[k]),Math.abs(p[k]-hi[k]))>1e-5)return -1;
        return Number(p[j]>lo[j]+1e-5)+2*Number(p[k]>lo[k]+1e-5);
      });
      if(corners.includes(-1)||new Set(corners).size!==3)continue;
      const signature=[axis,Math.sign(n[axis]),...lo.map(key),...hi.map(key)].join(',');
      const r=planes.get(signature)??{axis,j,k,lo,hi,normal:Math.sign(n[axis]),missing:0};
      r.missing|=1<<[0,1,2,3].find(i=>!corners.includes(i));planes.set(signature,r);
    }
  }
  // Opposite missing corners prove that two real opaque faces cover the
  // entire rectangle; a shared edge or a bounding box alone is insufficient.
  const rectangles=[...planes.values()].filter(r=>(r.missing&9)===9||(r.missing&6)===6);
  return {faces,rectangles};
}
function shadowsFor(rectangles,box) {
  const result=[];
  for(const r of rectangles){
    const {axis,j,k,lo,hi,normal}=r,level=lo[axis];
    if(normal>0?box[axis]<level+.03:box[axis+3]>level-.03)continue;
    // Four side planes bound the cone behind the rectangle. For a fixed
    // vertex, the worst slope always occurs at an eye-box corner.
    const edges=[];
    for(const t of [j,k])for(const side of [-1,1]){
      const edge=(side<0?lo[t]:hi[t])-.015*side;
      let slope=Infinity;
      for(const eyeAxis of [box[axis],box[axis+3]])
        for(const eyeT of [box[t],box[t+3]])
          slope=Math.min(slope,side*(edge-eyeT)/Math.abs(eyeAxis-level));
      edges.push({t,side,edge,slope});
    }
    result.push({axis,level,normal,edges});
  }
  return result;
}
function occluded(f,shadows){
  return shadows.some(({axis,level,normal,edges})=>{
    if(normal>0?f.hi[axis]>=level-.015:f.lo[axis]<=level+.015)return false;
    return edges.every(({t,side,edge,slope})=>f.v.every(v=>
      side*(v[t]-edge)+.001 < slope*normal*(level-v[axis])));
  });
}
export const cone=[1.8,2.45,.95]; // horizontal, down, up tangents
export function sightlines(profile,geometry,basis){
  if(!cells[profile])return [];
  const {faces,rectangles}=meshData(geometry),result=[];
  for(const [x,y,z,X,Y,Z,direction,viewCone] of cells[profile]){
    const box=[y*basis.sy,z-basis.seaReference,x*basis.sx-basis.length/2,Y*basis.sy,Z-basis.seaReference,X*basis.sx-basis.length/2];
    const limits=viewCone??cone;
    const shadows=shadowsFor(rectangles,box);
    const possible=faces.filter(f=>{
      const d=f.n.reduce((s,n,k)=>s+n*(box[k+(n>0?3:0)]-f.v[0][k]),0);
      return d>=-.02*f.len&&!occluded(f,shadows);
    });
    const directions=Array.isArray(direction)?direction:direction!==undefined?[direction]:profile==='exterior'?[1]:[-1,1];
    for(const sign of directions){
      const visible=[];
      for(const f of possible){
        const front=sign*(sign>0?f.hi[2]-box[2]:f.lo[2]-box[5]);
        if(sign!==0&&(front<-.02||f.hi[0]-box[0]+limits[0]*front<-.02||box[3]-f.lo[0]+limits[0]*front<-.02||
            f.hi[1]-box[1]+limits[1]*front<-.02||box[4]-f.lo[1]+limits[2]*front<-.02))continue;
        const dist=Math.hypot(...[0,1,2].map(k=>Math.max(0,f.lo[k]-box[k+3],box[k]-f.hi[k])));
        visible.push({ids:f.ids,order:f.background?1e6:Math.floor(dist*4)});
      }
      visible.sort((a,b)=>a.order-b.order);
      result.push({box,sign,...(viewCone && {cone:viewCone}),indices:visible.flatMap(f=>f.ids)});
    }
  }
  return result;
}
