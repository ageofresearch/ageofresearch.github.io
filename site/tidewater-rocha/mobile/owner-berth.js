// Registered to the downward Master Cabin and Master Cabin - Port
// panoramas. Coordinates fit the existing deck and berth in the Rocha model.
const center=.018;
const rugControls=[
  [24.24492,-0.90463],[24.35942,-1.18322],[24.51665,-1.20045],
  [24.75638,-1.28920],[24.94781,-1.44324],[25.05850,-1.61218],
  [25.11816,-1.80446],[25.12594,-1.95269],[25.35773,-1.95084],
  [25.59631,-1.85390],[25.81067,-1.67888],[25.99921,-1.41824],
  [26.15469,-1.07872],[26.37134,-0.70410],[26.67500,-0.37876],
  [26.68925,0.20478],[26.64040,0.56416],[26.55655,0.90139],
  [26.44640,1.19043],[26.30682,1.47292],[26.14636,1.71498],
  [25.94435,1.92058],[25.70327,2.06845],[25.49166,2.12379],
  [25.21932,2.10784],[24.94939,1.99306],[24.70697,1.78593],
  [24.50312,1.51297],[24.36950,1.22781],[24.26100,1.00100],
  [24.21100,0.71800],[24.18500,0.22000],[24.17800,-0.42600],
];

// Centripetal knots have a shared tangent on both sides of each join. Shorten
// the tangent at the point where the photographed starboard recess returns.
export function ownerRugOutline(){
  const n=rugControls.length;
  const spans=rugControls.map(([x,y],i)=>{
    const [X,Y]=rugControls[(i+1)%n];
    return Math.sqrt(Math.hypot(X-x,Y-y));
  });
  const tangents=rugControls.map((p,i)=>{
    const before=(i+n-1)%n,after=(i+1)%n,arrival=spans[before],departure=spans[i];
    const scale=i===7?.11:1;
    return p.map((v,k)=>scale*((v-rugControls[before][k])*departure/arrival+
      (rugControls[after][k]-v)*arrival/departure)/(arrival+departure));
  });
  const edge=[];
  for(let i=0;i<n;i++){
    const j=(i+1)%n,p=rugControls[i],q=rugControls[j],span=spans[i];
    function curve(t){
      const t2=t*t,t3=t2*t;
      return p.map((v,k)=>(2*t3-3*t2+1)*v+(t3-2*t2+t)*span*tangents[i][k]
        +(3*t2-2*t3)*q[k]+(t3-t2)*span*tangents[j][k]);
    }
    function tessellate(t0,a,t1,b){
      const step=t1-t0,dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy);
      const middle=curve(t0+step/2);
      // Test both quarter points as well, including S bends whose midpoint
      // happens to lie on the chord. The tolerance is in model units.
      const distance=([x,y])=>Math.abs(dx*(y-a[1])-dy*(x-a[0]))/length;
      const deviation=Math.max(distance(curve(t0+step/4)),distance(middle),distance(curve(t1-step/4)));
      if(deviation>.0008||length>.120){
        const mid=(t0+t1)/2;
        tessellate(t0,a,mid,middle);tessellate(mid,middle,t1,b);
      }else edge.push(a);
    }
    tessellate(0,p,1,q);
  }
  return edge;
}

function fabric(rows,closed=false,cap=false){
  const points=rows.flat(),width=rows[0].length,indices=[];
  for(let i=0;i<rows.length-1;i++)for(let j=0;j<width-Number(!closed);j++){
    const a=i*width+j,b=i*width+(j+1)%width;
    indices.push(a,b,a+width,b,b+width,a+width);
  }
  if(cap){
    const last=(rows.length-1)*width,top=rows.at(-1).reduce((sum,p)=>sum.map((x,k)=>x+p[k]/width),[0,0,0]);
    const crown=points.length;points.push(top);
    for(let i=0;i<width;i++)indices.push(last+i,last+(i+1)%width,crown);
  }
  const normals=points.map(()=>[0,0,0]);
  for(let i=0;i<indices.length;i+=3){
    const [a,b,c]=indices.slice(i,i+3),u=points[b].map((v,k)=>v-points[a][k]),v=points[c].map((n,k)=>n-points[a][k]);
    const n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
    for(const id of [a,b,c])for(let k=0;k<3;k++)normals[id][k]+=n[k];
  }
  return {vertices:points.flatMap((p,i)=>[...p,...normals[i].map(v=>v/Math.hypot(...normals[i]))]),indices};
}

export function furnishOwnerBerth(put,{box,slab}){
  const bed='MD_FUR_041';
  const add=(g,m,label)=>put(bed,g,m,label);
  function face(x,y,w,d,r,arcSteps=5){
    const corners=[[1,1],[-1,1],[-1,-1],[1,-1]];
    const radius=Math.min(r,w/2,d/2);
    const rails=corners.flatMap(([a,b],i)=>Array.from({length:arcSteps+1},(_,j)=>{
      const t=(i+j/arcSteps)*Math.PI/2;
      return [x+a*(w/2-radius)+radius*Math.cos(t),y+b*(d/2-radius)+radius*Math.sin(t)];
    }));
    return rails.flatMap((p,i)=>{
      const q=rails[(i+1)%rails.length],count=Math.max(1,Math.ceil(Math.hypot(q[0]-p[0],q[1]-p[1])/.24));
      return Array.from({length:count},(_,j)=>p.map((v,k)=>v+(q[k]-v)*j/count));
    });
  }
  add(box([24.13,-.829,3.950,25.90,.867,4.066],.040),'M18','recessed berth plinth');
  const welt=face(25.022,center,1.896,1.853,.104);
  add(slab(welt,4.058,4.094,0),'M121','low warm berth trim');
  add(slab(face(25.021,center,1.922,1.887,.104),4.094,4.183,0),'M122','continuous navy welt');
  add(box([24.11,-.853,4.124,25.92,.895,4.321],.029),'M18','recessed mattress support');

  const perimeter=face(25.02,center,1.938,1.909,.121);
  const duvetRings=[
    [1.000,.993,4.175,.013],[1.008,1,4.224,.018],[.995,1.005,4.300,.022],
    [1.004,.998,4.413,.011],[.973,.978,4.479,.011],[.865,.907,4.500,.006],
    [.608,.68,4.510,.003],[.268,.32,4.515,.002]
  ];
  const linen=duvetRings.map(([sx,sy,height,depth],r)=>perimeter.map(([x,y])=>{
    const u=x-25.02,v=y-center,f=.68*Math.cos(14*u+11*v+r*.33)+.39*Math.cos(23*u-17*v+r*.52);
    const corner=Math.pow(Math.max(Math.abs(u),Math.abs(v)),4);
    return [25.02+sx*u+depth*f*u*.54,center+sy*v+depth*f*v*.61,height+depth*f*(.16+corner*.58)];
  }));
  add(fabric(linen,true,true),'M120','folded white duvet');

  const pillows=[[-.431,'MD_SOF_013'],[.460,'MD_SOF_012']];
  for(const [i,[y,anchor]] of pillows.entries()){
    for(const [scatter,cx,w,d,bottom,height,material] of [
      [false,24.365,.448,.824,4.479,.205,'M120'],[true,24.626,.278,.424,4.518,.235,'M117']
    ]){
      const ring=face(cx,y,w,d,scatter?.124:.152,4);
      const puff=[[.68,0],[.932,.12],[1,.34],[.97,.61],[.77,.84],[.41,1]];
      const vertices=puff.map(([size,z],row)=>ring.map(([x,v])=>{
        const u=size*(x-cx),s=size*(v-y),h=height*z;
        const fold=.011*Math.cos(Math.PI*(v-y)/d*2.2)*Math.cos(18*u-21*s)*Math.sin(row*.68);
        return [cx+u-(scatter?.54:.22)*h,y+s,bottom+h+.14*u+fold];
      }));
      put(anchor,fabric(vertices,true,true),material,(scatter?'gold scatter pillow ':'linen sleeping pillow ')+i);
    }
  }

  // In the VR the throw stops just short of the starboard edge and its port
  // end falls over the side, with a narrow fringe over the blue carpet.
  const profile=[[-.776,4.521],[-.56,4.523],[-.32,4.523],[-.11,4.526],
    [.13,4.527],[.36,4.524],[.57,4.524],[.73,4.523],[.845,4.519],
    [.907,4.521],[.954,4.497],[.982,4.427],[.990,4.344],[.994,4.270]];
  const lengths=Array.from({length:15},(_,i)=>25.188+i*.0488);
  function drape(x,[y,z]){
    const side=Math.max(0,y-.66)/.323,f=Math.sin(x*54)+.40*Math.cos(x*24+y*13);
    const edge=.031*Math.cos(y*2.5);
    return [x+edge,center+y+.010*f*side,z+.007*f*(.55+side)];
  }
  add(fabric(lengths.map(x=>profile.map(p=>drape(x,p)).reverse())),'M125','draped gray coverlet');

  const fringeVertices=[],fringeIndices=[];
  const end=profile.at(-1);
  for(let i=0;i<22;i++){
    const x=25.200+i*.0304,[u,y,z]=drape(x,end),tip=z-.047-.014*Math.cos(i*2.631),offset=fringeVertices.length/6;
    const width=.006+(.5+.5*Math.sin(i*4.11))*.005;
    fringeVertices.push(u-width,y,z,0,1,0,u+width,y,z,0,1,0,u+.004,y+.012,tip,0,1,0);
    fringeIndices.push(offset,offset+1,offset+2);
  }
  add({vertices:fringeVertices,indices:fringeIndices},'M124','ivory woven fringe');

  const edge=ownerRugOutline(),bottom=3.951,top=3.958;
  const cap=slab(edge,bottom,top,0),vertices=[],indices=[],crown=new Map();
  for(let i=0;i<cap.indices.length;i+=3){
    const triangle=cap.indices.slice(i,i+3);
    if(!triangle.every(j=>cap.vertices[j*6+5]>.9))continue;
    for(const j of triangle){
      const [x,y]=cap.vertices.slice(j*6,j*6+2),key=`${x}/${y}`;
      if(!crown.has(key)){
        crown.set(key,vertices.length/6);
        vertices.push(x,y,top,0,0,1);
      }
      indices.push(crown.get(key));
    }
  }
  // The sole covers the underside. Share the crown vertices with the side
  // so that the binding shades gently from the pile to the dark lower edge.
  const side=vertices.length/6,n=edge.length;
  for(const [i,[x,y]] of edge.entries()){
    const [a,b]=edge[(i+n-1)%n],[c,d]=edge[(i+1)%n];
    const arrival=Math.hypot(x-a,y-b),departure=Math.hypot(c-x,d-y);
    const nx=(y-b)/arrival+(d-y)/departure,ny=(a-x)/arrival+(x-c)/departure;
    const length=Math.hypot(nx,ny);
    vertices.push(x,y,bottom,nx/length,ny/length,0);
    const k=side+i,q=side+(i+1)%n,end=crown.get(`${c}/${d}`),start=crown.get(`${x}/${y}`);
    indices.push(k,q,end,k,end,start);
  }
  add({vertices,indices},'M119','single shaped navy carpet');
}
