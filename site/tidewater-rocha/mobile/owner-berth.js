// Registered to the downward Master Cabin and Master Cabin - Port
// panoramas. Coordinates fit the existing deck and berth in the Rocha model.
const center=.018;
const rugControls=[
  [24.204,-.917],[24.346,-1.190],[24.511,-1.229],[24.747,-1.314],
  [24.939,-1.450],[25.039,-1.619],[25.100,-1.808],[25.115,-1.960],
  [25.362,-1.964],[25.599,-1.858],[25.801,-1.670],[25.958,-1.398],
  [26.133,-1.068],[26.380,-.713],[26.630,-.359],[26.706,.207],
  [26.679,.569],[26.595,.912],[26.480,1.207],[26.315,1.477],
  [26.138,1.708],[25.934,1.907],[25.693,2.041],[25.488,2.081],
  [25.232,2.062],[24.985,1.940],[24.741,1.750],[24.520,1.503],
  [24.366,1.226],[24.261,1.001],[24.211,.718],[24.185,.22],[24.178,-.426]
];

// Interpolate the traced edge with tangent continuity. The two ends of the
// starboard cut-in use bounded tangents to retain their observed shoulders.
export function ownerRugOutline(){
  const count=rugControls.length;
  return rugControls.flatMap((p,i)=>{
    const a=rugControls[(i+count-1)%count],q=rugControls[(i+1)%count],d=rugControls[(i+2)%count];
    return [0,1/3,2/3].map(t=>p.map((v,k)=>{
      const t2=t*t,t3=t2*t;
      const tangent=(q[k]-a[k])*(i===7?.19:.46),next=(d[k]-v)*(i===6?.19:.46);
      return (2*t3-3*t2+1)*v+(t3-2*t2+t)*tangent+(-2*t3+3*t2)*q[k]+(t3-t2)*next;
    }));
  });
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

export function furnishOwnerBerth(put,{box,slab,outline}){
  const bed='MD_FUR_041';
  const add=(g,m,label)=>put(bed,g,m,label);
  const face=(x,y,w,d,r)=>outline(x,y,w,d,r).flatMap((p,i,points)=>{
    const q=points[(i+1)%points.length],pieces=Math.max(1,Math.ceil(Math.hypot(q[0]-p[0],q[1]-p[1])/.19));
    return Array.from({length:pieces},(_,j)=>p.map((v,k)=>v+(q[k]-v)*j/pieces));
  });
  add(box([24.13,-.829,3.950,25.90,.867,4.066],.040),'M18','recessed berth plinth');
  const welt=outline(25.022,center,1.896,1.853,.104);
  add(slab(welt,4.058,4.094,0),'M121','low warm berth trim');
  add(slab(outline(25.021,center,1.922,1.887,.104),4.094,4.183,0),'M122','continuous navy welt');
  add(box([24.11,-.853,4.124,25.92,.895,4.321],.029),'M18','recessed mattress support');

  const perimeter=face(25.02,center,1.938,1.909,.121);
  const duvetRings=[
    [1.000,.993,4.175,.013],[1.008,1,4.224,.018],[.995,1.005,4.300,.022],
    [1.004,.998,4.413,.011],[.973,.978,4.479,.011],[.865,.907,4.500,.006],
    [.608,.68,4.510,.003],[.268,.32,4.515,.002]
  ];
  const linen=duvetRings.map(([sx,sy,height,depth],r)=>perimeter.map(([x,y],i)=>{
    const u=x-25.02,v=y-center,f=Math.cos(i*1.91)+.42*Math.cos(i*3.77+r*.73);
    const corner=Math.pow(Math.max(Math.abs(u),Math.abs(v)),4);
    return [25.02+sx*u+depth*f*u*.54,center+sy*v+depth*f*v*.61,height+depth*f*(.16+corner*.58)];
  }));
  add(fabric(linen,true,true),'M120','folded white duvet');

  const pillows=[[-.431,'MD_SOF_013'],[.460,'MD_SOF_012']];
  for(const [i,[y,anchor]] of pillows.entries()){
    for(const [scatter,cx,w,d,bottom,height,material] of [
      [false,24.365,.448,.824,4.479,.205,'M120'],[true,24.626,.278,.424,4.518,.235,'M117']
    ]){
      const ring=face(cx,y,w,d,scatter?.124:.152);
      const puff=[[.68,0],[.932,.12],[1,.34],[.97,.61],[.77,.84],[.41,1]];
      const vertices=puff.map(([size,z],row)=>ring.map(([x,v],j)=>{
        const u=size*(x-cx),s=size*(v-y),h=height*z;
        const fold=.011*Math.cos(Math.PI*(v-y)/d*2.2)*Math.cos(j*.71)*Math.sin(row*.68);
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

  add(slab(ownerRugOutline(),3.951,3.958,0),'M119','single shaped navy carpet');
}
