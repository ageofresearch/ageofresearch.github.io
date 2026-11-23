export const saloonOval=(cx,cy,rx,ry,count)=>Array.from({length:count},(_,i)=>{
  const angle=2*Math.PI*i/count;
  return [cx+rx*Math.cos(angle),cy+ry*Math.sin(angle)];
});

// Apply the same jambs, leaves and overheads before either viewer extracts its meshes.
export function finishSaloonEntry(p,source,{bounds,box,materials}) {
  // The port end meets the service stair. At starboard the fixed light runs
  // all the way to the window jamb, leaving the side deck outside the glass.
  const pane=p.feature==='smoked aft saloon sliding panels';
  const frame=p.feature==='aft sliding glazing frames and mullions';
  if(pane||frame){
    const v=Array.from(p.vertices);
    for(let i=0;i<v.length;i+=6){
      const y=v[i+1];
      if(pane && y<-.5)v[i+1]=-.5+(y+.5)*(2.48/1.09588);
      if(frame && y<-1.55)v[i+1]-=1.38412;
      // Sink the lower rail into the deck at the open doorway.
      if(frame && v[i+2]<4.00)v[i+2]=3.95+(v[i+2]-3.95)*.09;
    }
    if(frame){
      const indices=Array.from(p.indices);
      // Shallow pulls on the two meeting stiles, clear of the walking aperture.
      for(const y of [-.55,.73]){
        const bar=box([8.375,y-.012,4.78,8.396,y+.012,5.08],0);
        for(const z of [4.78,5.058]){
          const mounting=box([8.396,y-.012,z,8.428,y+.012,z+.022],0);
          const start=bar.vertices.length/6;
          bar.indices.push(...mounting.indices.map(i=>i+start));bar.vertices.push(...mounting.vertices);
        }
        const offset=v.length/6;
        indices.push(...bar.indices.map(i=>i+offset));v.push(...bar.vertices);
      }
      p.indices=indices;p.triangles=indices.length/3;
    }
    p.vertices=v;p.bounds=bounds(p);p.assemblyEnvelope=p.bounds;
  }
  if(p.anchor==='MD_FUR_014' && p.feature==='restrained cove diffuser'){
    // The ceiling lens sits above the dining table visible beyond the sofa.
    const outer=saloonOval(15.96,0,.70,1.36,48),inner=saloonOval(15.96,0,.673,1.333,48);
    const vertices=[],indices=[];
    // The vertical lip remains visible at the grazing angle from the sofa.
    function strip(edgeA,zA,edgeB,zB,normal){
      const start=vertices.length/6;
      for(let i=0;i<outer.length;i++){
        const n=normal(i);
        vertices.push(...edgeA[i],zA,...n,...edgeB[i],zB,...n);
        const a=start+i*2,b=start+((i+1)%outer.length)*2;
        indices.push(a,a+1,b,b,a+1,b+1);
      }
    }
    const radial=(i,sign)=>{
      const a=i*2*Math.PI/outer.length,x=Math.cos(a)/.70,y=Math.sin(a)/1.36;
      const length=Math.hypot(x,y);
      return [sign*x/length,sign*y/length,0];
    };
    strip(outer,5.805,inner,5.805,()=>[0,0,-1]);
    strip(outer,5.836,outer,5.805,i=>radial(i,1));
    strip(inner,5.805,inner,5.836,i=>radial(i,-1));
    Object.assign(p,{vertices,indices,materialID:'M99',finish:materials.M99,triangles:indices.length/3});
    p.bounds=bounds(p);p.assemblyEnvelope=p.bounds;
  }
  if(p.anchor==='MD_FUR_014' && p.feature==='rounded recessed coffer'){
    const v=Array.from(p.vertices);
    for(let i=0;i<v.length;i+=6){
      v[i]=11.65+(v[i]-12.15)*.43;v[i+1]*=.53;
      v[i+2]=5.872+(v[i+2]-5.845)*.18;v[i+5]/=.18;
      v[i+3]/=.43;v[i+4]/=.53;
      const n=Math.hypot(...v.slice(i+3,i+6));
      for(let k=3;k<6;k++)v[i+k]/=n;
    }
    p.vertices=v;p.bounds=bounds(p);p.assemblyEnvelope=p.bounds;
  }
  const jamb=/^MD_GLA_0(?:0[4-6]|1[0-2])$/.test(p.anchor);
  if(jamb && ['coated brown inner window reveal','window gasket and sill track'].includes(p.feature)){
    const v=Array.from(p.vertices),b=p.bounds,vertical=b[3]-b[0]<.04;
    const aperture=source.get(p.anchor).bbox;
    for(let i=0;i<v.length;i+=6){
      if(vertical){
        const fixed=b[0]<aperture[0]+.01?b[0]:b[3];
        v[i]=fixed+(v[i]-fixed)*2.8;
        // Butt against the enlarged head and sill without coplanar overlap.
        const t=(v[i+2]-b[2])/(b[5]-b[2]);
        const bottom=aperture[2]+.018*2.4,top=aperture[5]-.025*2.4;
        v[i+2]=bottom+t*(top-bottom);
      }else{
        const fixed=p.feature.startsWith('window gasket')?b[2]:b[5];
        v[i+2]=fixed+(v[i+2]-fixed)*2.4;
      }
    }
    p.vertices=v;p.bounds=bounds(p);p.assemblyEnvelope=p.bounds;
  }
}
