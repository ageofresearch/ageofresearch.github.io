import * as T from './tidewater/engine/index.js';

export function createFurniture({add,materials,root}){
 const records={beds:[],chairs:[],tables:[]},nightstands=[];
 const point=(x,z,a,p)=>[x+Math.cos(a)*p[0]+Math.sin(a)*p[2],p[1],z-Math.sin(a)*p[0]+Math.cos(a)*p[2]];
 const place=(geometry,x,z,a,key)=>{geometry.rotateY(a);geometry.translate(x,0,z);add(geometry,key,root)};
 function rounded(x,z,a,center,size,key,r=.035){const g=new T.RoundedBoxGeometry(...size,2,r);g.translate(...center);place(T.mergeVertices(g),x,z,a,key);}
 function box(x,z,a,center,size,key){const g=new T.BoxGeometry(...size);g.translate(...center);place(g,x,z,a,key);}
 function rod(x,z,a,p,q,r,key,r2=r){const start=new T.Vector3(...p),end=new T.Vector3(...q),delta=end.clone().sub(start);const g=new T.CylinderGeometry(r2,r,delta.length(),12);g.applyMatrix4(new T.Matrix4().makeRotationFromQuaternion(new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize())));g.translate(...start.add(end).multiplyScalar(.5));place(g,x,z,a,key);}
 function seam(x,z,a,w,d,y,key='seam',radius=.003){const points=[];for(let i=0;i<48;i++){const t=i/48*Math.PI*2,c=Math.cos(t),s=Math.sin(t);points.push(new T.Vector3(Math.sign(c)*Math.abs(c)**.28*w/2,y,Math.sign(s)*Math.abs(s)**.28*d/2));}const g=new T.TubeGeometry(new T.CatmullRomCurve3(points,true),64,radius,5,true);place(g,x,z,a,key);}
 function panel(x,z,a,width,height,base,key,offset=0){
  const g=new T.BufferGeometry(),p=[],uv=[],ids=[],cols=18,rows=5;
  for(let side=0;side<2;side++)for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){
   const u=i/cols,v=j/rows,px=(u-.5)*width;
   p.push(px,base+v*height,.275-.105*(px/(width/2))**2+v*.055+offset+(side?-.022:.022));uv.push(u,v);
  }
  const count=(cols+1)*(rows+1);
  for(let side=0;side<2;side++)for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const a=side*count+j*(cols+1)+i,b=a+1,c=a+cols+2,d=c-1;ids.push(...(side?[a,d,b,b,d,c]:[a,b,d,b,c,d]));}
  for(let i=0;i<cols;i++)for(const row of [0,rows]){const a=row*(cols+1)+i,b=a+1;ids.push(a,b,a+count,b,b+count,a+count);}
  for(let j=0;j<rows;j++)for(const col of [0,cols]){const a=j*(cols+1)+col,b=a+cols+1;ids.push(a,a+count,b,b,a+count,b+count);}
  g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(ids);g.computeVertexNormals();place(g,x,z,a,key);
 }
 function chair(x,z,a=0,{floor=.13,outdoor=false,table=null}={}){
  const fabric=outdoor?'fabricOlive':'fabricSand';
  // All legs, rails, seat and back use the same local frame as the chair.
  for(const sx of [-1,1])for(const sz of [-1,1])rod(x,z,a,[sx*.245,floor+.025,sz*.235],[sx*.185,floor+.405,sz*.175],.026,'oak',.021);
  for(const sx of [-1,1]){rod(x,z,a,[sx*.19,floor+.36,-.19],[sx*.19,floor+.36,.20],.018,'oak');rod(x,z,a,[sx*.205,floor+.39,.195],[sx*.22,floor+.91,.235],.023,'oak',.019);}
  rounded(x,z,a,[0,floor+.388,0],[.5,.075,.5],'oak',.025);
  rounded(x,z,a,[0,floor+.452,-.012],[.475,.078,.46],fabric,.035);
  panel(x,z,a,.51,.35,floor+.59,'oak');panel(x,z,a,.43,.245,floor+.63,fabric,-.03);
  seam(x,z,a,.45,.43,floor+.485,'seam',.0025);
  records.chairs.push({x,z,angle:a,width:.54,depth:.59,seatHeight:floor+.491,table});
 }
 function mattressDuvet(x,z,a,width,throwLayer=false){
  const g=new T.BufferGeometry(),p=[],uv=[],idx=[],nx=32,nz=32;
  for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){
   const u=i/nx,v=j/nz,xx=(u-.5)*(width+.13),zz=throwLayer?.40+v*.46:-.28+v*1.43;
   const side=Math.max(0,(Math.abs(xx)-width/2+.045)/.11),foot=Math.max(0,(zz-.99)/.16);
   const fold=.006*Math.sin(xx*24+zz*5)+.004*Math.cos(xx*13-zz*11);
   const yy=.718+fold-.18*Math.min(1,side*side)-.17*Math.min(1,foot*foot)+(throwLayer?.018:0);
   p.push(xx,yy,zz);uv.push(xx,zz);
  }
  for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){const k=j*(nx+1)+i;idx.push(k,k+nx+1,k+1,k+1,k+nx+1,k+nx+2);}
  g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();place(g,x,z,a,throwLayer?'fabricClay':'fabricIvory');
 }
 function bed(x,z,double=false,a=0){
  const w=double?1.8:.95;
  for(const sx of [-1,1])for(const sz of [-1,1])rod(x,z,a,[sx*(w/2-.11),.13,sz*.85],[sx*(w/2-.11),.30,sz*.85],.04,'oak');
  rounded(x,z,a,[0,.337,0],[w+.10,.22,2.15],'oak',.035);
  rounded(x,z,a,[0,.528,0],[w,.25,2.04],'fabricIvory',.065);
  seam(x,z,a,w-.025,2.02,.615);seam(x,z,a,w-.025,2.02,.44);
  rounded(x,z,a,[0,.79,-1.10],[w+.21,1.12,.13],'oak',.055);
  const panels=double?6:3;
  for(let i=0;i<panels;i++)rounded(x,z,a,[(i-(panels-1)/2)*(w+.11)/panels,.82,-1.015],[(w+.11)/panels-.012,1.04,.105],'fabricSand',.04);
  mattressDuvet(x,z,a,w);
  const pillowWidth=double?.72:.73;
  for(const xx of double?[-.43,.43]:[0]){
   rounded(x,z,a,[xx,.747,-.69],[pillowWidth,.19,.43],'fabricIvory',.085);
   const g=new T.TubeGeometry(new T.CatmullRomCurve3(Array.from({length:40},(_,i)=>{const t=i/40*Math.PI*2,c=Math.cos(t),s=Math.sin(t);return new T.Vector3(xx+Math.sign(c)*Math.abs(c)**.4*(pillowWidth-.035)/2,.744,-.69+Math.sign(s)*Math.abs(s)**.4*.19)}),true),48,.0028,5,true);place(g,x,z,a,'seam');
  }
  mattressDuvet(x,z,a,w,true);
  for(const xx of [-w/2-.25,w/2+.25]){
   const p=point(x,z,a,[xx,.13,-.76]);if(nightstands.some(q=>Math.hypot(p[0]-q[0],p[2]-q[2])<.38))continue;nightstands.push(p);
   rounded(x,z,a,[xx,.395,-.76],[.37,.43,.41],'oak',.022);
   box(x,z,a,[xx,.40,-.547],[.32,.009,.008],'metal');
   box(x,z,a,[xx,.53,-.544],[.10,.012,.018],'metal');
   rounded(x,z,a,[xx,.62,-.76],[.39,.04,.43],'stone',.015);
  }
  records.beds.push({x,z,angle:a,width:w,length:2.15});
 }
 function ovalTop(x,z,rx,rz,y,height,key){
  const g=new T.CylinderGeometry(1,1,height,72,1);g.scale(rx,1,rz);g.translate(x,y,z);add(g,key,root);
  for(const dy of [-height/2+.008,height/2-.008]){const edge=new T.TorusGeometry(1,.009,6,72);edge.rotateX(Math.PI/2);edge.scale(rx,1,rz);edge.translate(x,y+dy,z);add(edge,key,root);}
 }
 function dining(x,z){
  const rx=1.01,rz=1.70;ovalTop(x,z,rx,rz,.875,.075,'oak');
  for(const dz of [-.65,.65]){
   const g=new T.CylinderGeometry(.205,.245,.65,32);g.translate(x,.49,z+dz);add(g,'oak',root);
   for(let i=0;i<24;i++){const a=i/24*Math.PI*2;rod(x,z,0,[Math.cos(a)*.213,.22,dz+Math.sin(a)*.213],[Math.cos(a)*.185,.80,dz+Math.sin(a)*.185],.008,'wood');}
  }
  for(const sx of [-1,1])for(const dz of [-.92,0,.92])chair(x+sx*1.31,z+dz,sx*Math.PI/2,{table:'dining'});
  chair(x,z-2.04,Math.PI,{table:'dining'});chair(x,z+2.04,0,{table:'dining'});
  records.tables.push({id:'dining',x,z,rx,rz,top:.9125});
 }
 function outdoorTable(x,z){
  ovalTop(x,z,.55,.55,.855,.065,'stone');rod(x,z,0,[0,.17,0],[0,.83,0],.07,'metal');
  for(let i=0;i<4;i++){const a=i*Math.PI/2;rod(x,z,0,[0,.20,0],[Math.sin(a)*.34,.15,Math.cos(a)*.34],.026,'metal');chair(x+Math.sin(a)*.96,z+Math.cos(a)*.96,a,{outdoor:true,table:'outdoor'});}
  records.tables.push({id:'outdoor',x,z,rx:.55,rz:.55,top:.8875});
 }
 function sofa(x,z,width=2.5,a=0){
  for(const sx of [-1,1])for(const sz of [-1,1])rod(x,z,a,[sx*(width/2-.15),.13,sz*.30],[sx*(width/2-.15),.30,sz*.30],.035,'oak');
  rounded(x,z,a,[0,.39,0],[width,.28,.88],'oak',.04);
  rounded(x,z,a,[0,.82,.36],[width,.75,.21],'fabricSand',.07);
  for(const sx of [-1,1])rounded(x,z,a,[sx*(width/2-.095),.69,0],[.19,.56,.91],'fabricSand',.065);
  const seats=Math.round(width/.8),sw=(width-.43)/seats;
  for(let i=0;i<seats;i++){const xx=(i-(seats-1)/2)*sw;rounded(x,z,a,[xx,.585,-.045],[sw-.016,.21,.70],'fabricIvory',.06);rounded(x,z,a,[xx,.87,.245],[sw-.025,.51,.16],'fabricSand',.065);}
  for(const sx of [-1,1])rounded(x,z,a,[sx*(width/2-.36),.83,.02],[.34,.34,.14],sx<0?'fabricOlive':'fabricClay',.065);
 }
 return {bed,chair,dining,outdoorTable,sofa,records};
}
