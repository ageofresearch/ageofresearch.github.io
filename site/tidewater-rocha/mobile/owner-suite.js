// Suite finishes are registered to the port and starboard Master Cabin
// panoramas. Keep the bed footprint and the two existing routes to the head.
export function furnishOwnerSuite({add,remove,box,slab,outline,circle}){
  const suite='MD_FUR_041';
  const put=(anchor,geometry,material,name)=>add(anchor,geometry,material,'suite '+name);
  const fit=(anchor,b,mat,name,r=0)=>put(anchor,box(b,r),mat,name);
  const center=.018;
  function round(anchor,x,y,w,d,b,t,mat,name){
    put(anchor,slab(outline(x,y,w,d,Math.min(w,d)*.49),b,t,0),mat,name);
  }
  remove(suite,p=>!/speaker/.test(p.feature||''));
  for(const id of ['MD_SOF_011','MD_SOF_012','MD_SOF_013','MD_FUR_042','MD_FUR_043','MD_FUR_050'])remove(id);

  fit(suite,[24.11,-.85,3.95,25.91,.88,4.050],'M18','recessed berth plinth',.037);
  const berthRim=outline(25,center,1.948,1.893,.096);
  // Use one contour for the gold band and dark welt. Each ring owns its side
  // faces. The two rings share a horizontal edge with no overlapping caps.
  const trim=(bottom,top,material,name)=>{
    const vertices=[],indices=[];
    for(let i=0;i<berthRim.length;i++){
      const p=berthRim[i],q=berthRim[(i+1)%berthRim.length];
      const dx=q[0]-p[0],dy=q[1]-p[1],len=Math.hypot(dx,dy),base=vertices.length/6;
      for(const [r,z] of [[p,bottom],[q,bottom],[p,top],[q,top]])vertices.push(...r,z,dy/len,-dx/len,0);
      indices.push(base,base+1,base+2,base+2,base+1,base+3);
    }
    put(suite,{vertices,indices},material,name);
  };
  // The closed lower support and duvet seal the stack behind the trim.
  fit(suite,[24.104,-.871,4.047,25.926,.901,4.218],'M18','berth support behind welt');
  trim(4.082,4.099,'M21','slim warm berth trim');
  trim(4.099,4.238,'M18','upholstered lower berth');
  fit(suite,[24.08,-.910,4.208,25.946,.947,4.493],'M13','rounded linen duvet',.068);
  fit(suite,[23.992,-1.052,4.232,24.160,1.087,5.015],'M16','curved padded headboard',.074);
  for(const [i,y] of [-.427,.45].entries()){
    const anchor=i?'MD_SOF_012':'MD_SOF_013';
    fit(anchor,[24.17,y-.382,4.489,24.560,y+.382,4.619],'M13','sleeping pillow '+i,.061);
    const pillow=box([24.42,y-.195,4.530,24.662,y+.195,4.710],.067);
    // Tilt the scatter pillows back into the bedding.
    for(let j=0;j<pillow.vertices.length;j+=6){
      const a=pillow.vertices[j]-24.54,b=pillow.vertices[j+2]-4.53;
      const nx=pillow.vertices[j+3],nz=pillow.vertices[j+5],c=.87462,s=.48481;
      pillow.vertices[j]=24.54+c*a-s*b;pillow.vertices[j+2]=4.53+s*a+c*b;
      pillow.vertices[j+3]=c*nx-s*nz;pillow.vertices[j+5]=s*nx+c*nz;
    }
    put(anchor,pillow,'M117','warm scatter pillow '+i);
  }

  // Lay the pale cabin boards inside the partitions and window sills.
  put(suite,slab([[22.661,-2.51],[25.08,-2.51],[27.164,-2.47],
    [27.164,2.46],[25.08,2.52],[22.661,2.52]],3.9504,3.951,0),'M118','pale oak sole');

  // The coverlet follows the crown of the duvet and bends around both edges.
  const halfDrape=[[0,4.512],[.22,4.512],[.44,4.512],[.66,4.512],[.855,4.515],
    [.908,4.504],[.940,4.462],[.953,4.388],[.955,4.310]];
  const across=halfDrape.slice(1).reverse().map(([y,z])=>[-y,z]).concat(halfDrape);
  const along=[25.25,25.36,25.56,25.73,25.853];
  const vertices=[],indices=[];
  function cloth(x,[u,height]){
    const edge=Math.max(0,Math.abs(u)-.66)/.292;
    const fold=Math.sin(x*30+u*33)+.35*Math.cos(x*62-u*46);
    return [x+.024*u*u+edge*.005*fold,center+u+.007*edge*fold,height+.006*fold];
  }
  for(let i=0;i<along.length;i++)for(let j=0;j<across.length;j++){
    const point=cloth(along[i],across[j]);
    const a=cloth(along[Math.max(0,i-1)],across[j]),b=cloth(along[Math.min(along.length-1,i+1)],across[j]);
    const c=cloth(along[i],across[Math.max(0,j-1)]),d=cloth(along[i],across[Math.min(across.length-1,j+1)]);
    const [ux,uy,uz]=b.map((v,k)=>v-a[k]),[vx,vy,vz]=d.map((v,k)=>v-c[k]);
    const normal=[uy*vz-uz*vy,uz*vx-ux*vz,ux*vy-uy*vx],len=Math.hypot(...normal);
    vertices.push(...point,...normal.map(v=>v/len));
  }
  for(let i=0;i<along.length-1;i++)for(let j=0;j<across.length-1;j++){
    const a=i*across.length+j,b=a+across.length;
    indices.push(a,b,a+1,b,b+1,a+1);
  }
  put(suite,{vertices,indices},'M111','draped gray coverlet');

  // One textile surface. The curved cut-in keeps the lounge-side floor visible.
  const rug=[];
  for(let i=0;i<48;i++){
    const a=i*Math.PI/24,y=Math.sin(a)*1.61;
    const scoop=.54*Math.exp(-((y+1.13)**2)/.13)*Math.max(0,Math.cos(a));
    rug.push([24.91+1.71*Math.cos(a)-scoop,y+.04]);
  }
  put(suite,slab(rug,3.951,3.960,0),'M95','single shaped navy carpet');

  // Rounded textile panels, a warm accent and inlaid dark joints run behind
  // the berth. The central backing leaves the walks beside the nightstands open.
  const bounds=[-1.51,-1.26,-.88,-.46,-.02,.43,.87,1.27,1.57];
  fit(suite,[23.90,-1.51,3.952,23.922,1.57,5.798],'M18','headwall dark joints');
  for(let i=0;i<bounds.length-1;i++){
    const y=bounds[i]+.008,Y=bounds[i+1]-.008;
    fit(suite,[23.91,y,3.967,23.961,Y,5.793],i===1?'M96':'M16','lined headwall panel '+i);
  }
  for(const [id,y] of [['MD_FUR_042',1.322],['MD_FUR_043',-1.265]]){
    round(id,24.032,y,.456,.456,3.95,4.104,'M08','bedside recessed base '+id);
    round(id,24.032,y,.485,.489,4.104,4.374,'M20','rounded bedside cabinet '+id);
    round(id,24.032,y,.493,.497,4.374,4.402,'M21','brushed bedside rim '+id);
    round(id,24.032,y,.471,.473,4.402,4.432,'M17','ivory bedside top '+id);
    fit(id,[23.973,y-.037,4.558,24.024,y+.037,4.934],'M21','sconce brass mount '+id,.023);
    fit(id,[24.022,y-.024,4.67,24.055,y+.024,4.822],'M99','warm sconce lens '+id,.012);
  }
  round('MD_FUR_050',25.052,2.260,.404,.418,3.95,4.12,'M18','smoked drum base');
  round('MD_FUR_050',25.052,2.260,.437,.451,4.12,4.414,'M26','smoked drum body');
  round('MD_FUR_050',25.052,2.260,.448,.462,4.414,4.432,'M21','smoked drum brass band');
  round('MD_FUR_050',25.052,2.260,.453,.467,4.432,4.455,'M18','inset smoked top');

  fit(suite,[26.76,1.15,3.96,27.12,2.32,4.756],'M17','ivory forward vanity',.075);
  fit(suite,[26.72,1.15,4.756,27.132,2.32,4.798],'M37','rounded vanity ledge',.029);
  fit(suite,[26.747,1.28,4.615,26.760,2.23,4.738],'M96','vanity walnut drawer');
  fit(suite,[27.127,1.16,4.95,27.163,2.31,5.726],'M18','vanity mirror surround',.012);
  fit(suite,[27.121,1.185,4.98,27.127,2.285,5.700],'M20','vanity mirror face');
  for(const side of [-1,1]){
    const y=side*1.46;
    fit(suite,[23.89,y-.025,4.64,23.931,y+.025,5.245],'M21','vertical brass accent '+side,.016);
    fit(suite,[23.929,y-.013,4.815,23.947,y+.013,5.081],'M99','vertical accent lens '+side,.009);
  }
  round(suite,26.40,-2.145,1.062,.570,4.65,4.697,'M37','window writing surface');
  for(const x of [25.99,26.81]){
    fit(suite,[x,-2.252,3.95,x+.037,-2.215,4.65],'M18','slender writing desk leg '+x);
  }
  fit(suite,[26.738,-2.329,4.696,26.762,-2.303,5.076],'M19','desk lamp stem');
  put(suite,slab(circle(26.75,-2.312,.112,12),5.063,5.085,0),'M99','desk lamp diffuser');
  const shade=slab(circle(26.75,-2.312,.114,12),5.085,5.238,0);
  for(let i=0;i<shade.vertices.length;i+=6){
    const t=(shade.vertices[i+2]-5.085)/.153,scale=1-.67*t;
    shade.vertices[i]=26.75+(shade.vertices[i]-26.75)*scale;
    shade.vertices[i+1]=-2.312+(shade.vertices[i+1]+2.312)*scale;
    const x=shade.vertices[i+3],y=shade.vertices[i+4],z=shade.vertices[i+5]+Math.hypot(x,y)*.50;
    const n=Math.hypot(x,y,z);shade.vertices[i+3]=x/n;shade.vertices[i+4]=y/n;shade.vertices[i+5]=z/n;
  }
  put(suite,shade,'M37','tapered desk lamp shade');

  // Dark rebates and an ivory inner sill follow the original glazing.
  for(const [id,x,X,y,side] of [
    ['MD_GLA_008',22.65,25,2.82,1],['MD_GLA_009',25.10,27.16,2.57,1],
    ['MD_GLA_014',22.65,25,-2.82,-1],['MD_GLA_015',25.10,27.16,-2.57,-1]
  ]){
    remove(id,p=>/window reveal|gasket and sill/.test(p.feature||''));
    const strip=(a,A,b,B,d,D,m,name)=>{
      const y0=y-side*d,y1=y-side*D;
      fit(id,[a,Math.min(y0,y1),b,A,Math.max(y0,y1),B],m,name+' '+id);
    };
    // The forward port sill is shallow, leaving the chair upholstery clear.
    const sillDepth=id==='MD_GLA_009'?.038:.125;
    strip(x,X,4.200,4.257,.007,sillDepth,'M107','window sill');
    strip(x,X,4.255,4.279,.004,.033,'M18','bottom window gasket');
    strip(x,X,5.747,5.782,.002,.056,'M18','top window gasket');
    for(const [edge,a] of [[x,x+.039],[X-.039,X]])
      strip(edge,a,4.279,5.747,.002,.053,'M18','side window gasket '+edge);
    strip(x,X,5.782,5.821,.005,.108,'M107','window header');
  }

  // Connect the perimeter ceiling to a recessed coffer using an annulus.
  // Every vertex has the same radial correspondence across the three bands.
  const ceiling={x:24.98,y:0,minX:22.661,maxX:27.163,minY:-2.518,maxY:2.535};
  const angles=Array.from({length:24},(_,i)=>i*Math.PI/12);
  for(const x of [ceiling.minX,ceiling.maxX])for(const y of [ceiling.minY,ceiling.maxY]){
    angles.push((Math.atan2(y,x-ceiling.x)+2*Math.PI)%(2*Math.PI));
  }
  angles.sort((a,b)=>a-b);
  const rings=angles.map(a=>{
    const u=Math.cos(a),v=Math.sin(a);
    const radialX=Math.abs(u)<1e-9?Infinity:(u>0?ceiling.maxX-ceiling.x:ceiling.minX-ceiling.x)/u;
    const radialY=Math.abs(v)<1e-9?Infinity:(v>0?ceiling.maxY:ceiling.minY)/v;
    const radius=Math.min(radialX,radialY);
    return [[ceiling.x+radius*u,radius*v,5.801],[ceiling.x+1.47*u,1.59*v,5.801],
      [ceiling.x+1.435*u,1.555*v,5.821],[ceiling.x+1.419*u,1.539*v,5.839]];
  });
  for(let band=0;band<3;band++){
    const vertices=[],indices=[];
    for(let i=0;i<rings.length;i++){
      const p=rings[i],q=rings[(i+1)%rings.length];
      const a=p[band],b=p[band+1],c=q[band],d=q[band+1];
      const [ux,uy,uz]=b.map((v,k)=>v-a[k]),[vx,vy,vz]=c.map((v,k)=>v-a[k]);
      const n=[uy*vz-uz*vy,uz*vx-ux*vz,ux*vy-uy*vx],length=Math.hypot(...n);
      const next=vertices.length/6;
      for(const point of [a,b,c,d])vertices.push(...point,...n.map(v=>v/length));
      indices.push(next,next+1,next+2,next+2,next+1,next+3);
    }
    put(suite,{vertices,indices},band===2?'M32':'M107','coffer band '+band);
  }
  put(suite,slab(rings.map(r=>r[3].slice(0,2)),5.839,5.855,0),'M107','recessed coffer field');
}
