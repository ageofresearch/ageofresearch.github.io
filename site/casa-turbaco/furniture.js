import * as T from './tidewater/engine/index.js';

export function createFurniture({add,materials,root}){
 const records={beds:[],chairs:[],tables:[],sofas:[],desks:[],loungers:[]},nightstands=[];
 const point=(x,z,a,p)=>[x+Math.cos(a)*p[0]+Math.sin(a)*p[2],p[1],z-Math.sin(a)*p[0]+Math.cos(a)*p[2]];
 function metricUV(g){
  const p=g.attributes.position,n=g.attributes.normal,uv=new Float32Array(p.count*2);
  for(let i=0;i<p.count;i++){
   const nx=Math.abs(n.getX(i)),ny=Math.abs(n.getY(i)),nz=Math.abs(n.getZ(i));
   uv[i*2]=ny>.65?p.getX(i):nx>nz?p.getZ(i):p.getX(i);
   uv[i*2+1]=ny>.65?p.getZ(i):p.getY(i);
  }
  g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));
 }
 const place=(geometry,x,z,a,key,keepUV=false)=>{if(!keepUV)metricUV(geometry);geometry.rotateY(a);geometry.translate(x,0,z);add(geometry,key,root)};
 function rounded(x,z,a,center,size,key,r=.035){const g=new T.RoundedBoxGeometry(...size,2,r);g.translate(...center);place(T.mergeVertices(g),x,z,a,key);}
 function box(x,z,a,center,size,key){const g=new T.BoxGeometry(...size);g.translate(...center);place(g,x,z,a,key);}
 function rod(x,z,a,p,q,r,key,r2=r){const start=new T.Vector3(...p),end=new T.Vector3(...q),delta=end.clone().sub(start),length=delta.length();const g=new T.CylinderGeometry(r2,r,length,12),uv=g.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)*Math.PI*2*r,uv.getY(i)*length);g.applyMatrix4(new T.Matrix4().makeRotationFromQuaternion(new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize())));g.translate(...start.add(end).multiplyScalar(.5));place(g,x,z,a,key,true);}
 function puff(x,z,a,center,size,key,{tilt=0,roll=0,seed=0,piping=true,vertical=false}={}){
  const g=new T.SphereGeometry(1,32,20),p=g.attributes.position,n=g.attributes.normal,uv=g.attributes.uv;
  const signed=(v,e)=>Math.sign(v)*Math.abs(v)**e;
  for(let i=0;i<p.count;i++){
   const sx=p.getX(i),sy=p.getY(i),sz=p.getZ(i),ex=.42,ey=.72,ez=.42;
   const fold=.003*Math.sin(sx*15+sz*9+seed)*Math.abs(sx*sz);
   p.setXYZ(i,signed(sx,ex)*size[0]/2,signed(sy,ey)*size[1]/2+fold,signed(sz,ez)*size[2]/2);
   const normal=new T.Vector3(signed(sx,2-ex)/size[0],signed(sy,2-ey)/size[1],signed(sz,2-ez)/size[2]).normalize();n.setXYZ(i,normal.x,normal.y,normal.z);
   uv.setXY(i,uv.getX(i)*2*(size[0]+size[2]),uv.getY(i)*(Math.max(size[0],size[2])+size[1]));
  }
  g.rotateX(tilt);g.rotateZ(roll);g.translate(...center);place(g,x,z,a,key,true);
  if(piping){
   const points=Array.from({length:48},(_,i)=>{const t=i/48*Math.PI*2,c=Math.cos(t),s=Math.sin(t);return vertical?new T.Vector3(signed(c,.42)*size[0]*.49,signed(s,.42)*size[1]*.49,-size[2]*.10):new T.Vector3(signed(c,.42)*size[0]*.495,0,signed(s,.42)*size[2]*.495)});
   const edge=new T.TubeGeometry(new T.CatmullRomCurve3(points,true),64,.0022,5,true);edge.rotateX(tilt);edge.rotateZ(roll);edge.translate(...center);place(edge,x,z,a,key);
  }
 }
 function seam(x,z,a,w,d,y,key='seam',radius=.003){const points=[];for(let i=0;i<48;i++){const t=i/48*Math.PI*2,c=Math.cos(t),s=Math.sin(t);points.push(new T.Vector3(Math.sign(c)*Math.abs(c)**.28*w/2,y,Math.sign(s)*Math.abs(s)**.28*d/2));}const g=new T.TubeGeometry(new T.CatmullRomCurve3(points,true),64,radius,5,true);place(g,x,z,a,key);}
 function panel(x,z,a,width,height,base,key,offset=0){
  const g=T.mergeVertices(new T.RoundedBoxGeometry(width,height,.035,5,.016)),p=g.attributes.position,n=g.attributes.normal,uv=g.attributes.uv,half=width/2;
  for(let i=0;i<p.count;i++){
   const px=p.getX(i),py=p.getY(i),pz=p.getZ(i),s=px/half;
   const dy=-.05*px/(half*half),dz=-.17*px/(half*half),lean=.055/height;
   const normal=new T.Vector3(n.getX(i)-dy*n.getY(i)+(dy*lean-dz)*n.getZ(i),n.getY(i)-lean*n.getZ(i),n.getZ(i)).normalize();
   p.setXYZ(i,px,base+height/2+py-.025*s*s,pz+.245-.085*s*s+(py/height+.5)*.055+offset);n.setXYZ(i,normal.x,normal.y,normal.z);uv.setXY(i,py,px);
  }
  place(g,x,z,a,key,true);
 }
 function chair(x,z,a=0,{floor=.13,outdoor=false,table=null}={}){
  const fabric=outdoor?'fabricOlive':'fabricSand';
  // Slim splayed legs, under-seat joinery and an open, sculpted curved back.
  for(const sx of [-1,1])for(const sz of [-1,1]){
   rod(x,z,a,[sx*.24,floor+.008,sz*.235],[sx*.185,floor+.40,sz*.175],.019,'oak',.026);
   rod(x,z,a,[sx*.24,floor+.001,sz*.235],[sx*.24,floor+.010,sz*.235],.020,'felt');
  }
  for(const sx of [-1,1]){
   rounded(x,z,a,[sx*.185,floor+.37,0],[.033,.065,.39],'oak',.012);
   rod(x,z,a,[sx*.185,floor+.40,.175],[sx*.22,floor+.76,.182],.024,'oak',.020);
   rod(x,z,a,[sx*.212,floor+.388,-.18],[sx*.216,floor+.388,-.18],.004,'brass');
  }
  rounded(x,z,a,[0,floor+.396,0],[.50,.055,.49],'oak',.025);
  puff(x,z,a,[0,floor+.446,-.012],[.475,.083,.46],fabric,{piping:true});
  panel(x,z,a,.54,.235,floor+.565,'oak');
  if(outdoor)panel(x,z,a,.44,.155,floor+.602,'cane',-.023);
  records.chairs.push({x,z,angle:a,width:.54,depth:.59,seatHeight:floor+.4875,table});
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
  g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();place(g,x,z,a,throwLayer?'fabricClay':'fabricIvory',true);
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
   puff(x,z,a,[xx,.747,-.69],[pillowWidth,.19,.43],'fabricIvory',{seed:xx+z,tilt:-.05});
  }
  mattressDuvet(x,z,a,w,true);
  for(const xx of [-w/2-.25,w/2+.25]){
   const p=point(x,z,a,[xx,.13,-.76]);if(nightstands.some(q=>Math.hypot(p[0]-q[0],p[2]-q[2])<.38))continue;nightstands.push(p);
   rounded(x,z,a,[xx,.395,-.76],[.37,.43,.41],'oak',.022);
   for(const y of [.30,.49]){
    rounded(x,z,a,[xx,y,-.548],[.33,.175,.018],'oak',.008);
    rod(x,z,a,[xx-.048,y+.012,-.531],[xx+.048,y+.012,-.531],.005,'brass');
   }
   rounded(x,z,a,[xx,.62,-.76],[.39,.04,.43],'travertine',.015);
   if(xx<0)tableLamp(x,z,a,[xx,.64,-.79]);else book(x,z,a,[xx,.645,-.77],.22,.027,'bookOlive');
  }
  records.beds.push({x,z,angle:a,width:w,length:2.15});
 }
 function ovalTop(x,z,rx,rz,y,height,key){
  // One continuous rounded edge, rather than overlapping cylinders and rings.
  const b=y-height/2,t=y+height/2,r=Math.min(.016,height*.24),inset=r/Math.min(rx,rz);
  const profile=[[0,b],[1-inset,b],[1-inset*.3,b+r*.25],[1,b+r],[1,t-r],[1-inset*.3,t-r*.25],[1-inset,t],[0,t]].map(p=>new T.Vector2(...p));
  const g=new T.LatheGeometry(profile,80);g.scale(rx,1,rz);g.translate(0,0,0);place(g,x,z,0,key);
 }
 function vessel(x,z,a,p,profile,key,scale=1){
  const g=new T.LatheGeometry(profile.map(([r,y])=>new T.Vector2(r*scale,y*scale)),40);g.translate(...p);place(g,x,z,a,key);
 }
 function vase(x,z,a,p,key='ceramicClay',scale=1){
  vessel(x,z,a,p,[[0,0],[.065,0],[.075,.016],[.100,.06],[.105,.13],[.079,.20],[.045,.245],[.044,.28],[.033,.282],[.032,.25],[.067,.195],[.090,.13],[.084,.065],[.053,.022],[0,.022]],key,scale);
 }
 function bowl(x,z,a,p,key='ceramicCream',scale=1){
  vessel(x,z,a,p,[[0,0],[.065,0],[.075,.012],[.135,.038],[.16,.075],[.161,.084],[.151,.087],[.137,.066],[.116,.043],[.062,.020],[0,.020]],key,scale);
 }
 function book(x,z,a,p,width=.30,height=.045,key='bookClay'){
  const depth=width*.73;
  rounded(x,z,a,[p[0],p[1]+height/2,p[2]],[width-.006,height-.009,depth-.009],'paper',.003);
  for(const y of [p[1]+.002,p[1]+height-.002])rounded(x,z,a,[p[0],y,p[2]],[width,.004,depth],key,.002);
  rounded(x,z,a,[p[0]-width/2+.003,p[1]+height/2,p[2]],[.007,height,depth],key,.003);
 }
 function tableLamp(x,z,a,p){
  vessel(x,z,a,p,[[0,0],[.073,0],[.080,.012],[.072,.075],[.041,.14],[.027,.16],[0,.16]],'ceramicCream');
  rod(x,z,a,[p[0],p[1]+.14,p[2]],[p[0],p[1]+.34,p[2]],.009,'brass');
  const g=new T.CylinderGeometry(.105,.16,.20,40,1,true);g.translate(p[0],p[1]+.32,p[2]);place(g,x,z,a,'fabricIvory');
  for(const [r,y] of [[.105,p[1]+.42],[.16,p[1]+.22]]){const edge=new T.TorusGeometry(r,.003,5,40);edge.rotateX(Math.PI/2);edge.translate(p[0],y,p[2]);place(edge,x,z,a,'seam');}
 }
 function sprigs(x,z,a,p){
  for(let k=0;k<3;k++){
   const dx=(k-1)*.075,dz=Math.sin(k*2.4)*.055,top=[p[0]+dx,p[1]+.36+k*.035,p[2]+dz];
   rod(x,z,a,p,top,.0025,'wood');
   for(let j=1;j<=4;j++)for(const side of [-1,1]){
    const t=.22+j*.14,g=new T.SphereGeometry(1,10,6);g.scale(.025,.006,.065);g.rotateX(-.45);g.rotateY(side*.65+k);
    g.translate(p[0]+dx*t+side*.025,p[1]+(top[1]-p[1])*t,p[2]+dz*t);place(g,x,z,a,'fabricOlive');
   }
  }
 }
 function dining(x,z){
  const rx=1.01,rz=1.70;ovalTop(x,z,rx,rz,.875,.075,'oakTop');
  for(const dz of [-.65,.65]){
   const g=new T.CylinderGeometry(.205,.245,.65,40);g.translate(0,.49,dz);place(g,x,z,0,'oak');
   for(let i=0;i<32;i++){const a=i/32*Math.PI*2;rod(x,z,0,[Math.cos(a)*.245,.18,dz+Math.sin(a)*.245],[Math.cos(a)*.205,.815,dz+Math.sin(a)*.205],.009,'oak');}
  }
  for(const sx of [-1,1])for(const dz of [-.92,0,.92])chair(x+sx*1.31,z+dz,sx*Math.PI/2,{table:'dining'});
  chair(x,z-2.04,Math.PI,{table:'dining'});chair(x,z+2.04,0,{table:'dining'});
  vase(x,z,0,[.04,.913,-.20],'ceramicOlive',1.10);sprigs(x,z,0,[.04,1.17,-.20]);
  bowl(x,z,0,[-.18,.914,.30],'ceramicCream',1.15);
  book(x,z,.06,[.18,.914,.72],.32,.035,'bookClay');
  records.tables.push({id:'dining',x,z,rx,rz,top:.9125});
 }
 function outdoorTable(x,z){
  ovalTop(x,z,.55,.55,.855,.065,'travertine');rod(x,z,0,[0,.17,0],[0,.83,0],.07,'metal');
  for(let i=0;i<4;i++){const a=i*Math.PI/2;rod(x,z,0,[0,.20,0],[Math.sin(a)*.34,.15,Math.cos(a)*.34],.026,'metal');chair(x+Math.sin(a)*.96,z+Math.cos(a)*.96,a,{outdoor:true,table:'outdoor'});}
  records.tables.push({id:'outdoor',x,z,rx:.55,rz:.55,top:.8875});
  vase(x,z,0,[0,.888,0],'ceramicClay',.62);
 }
 function sofa(x,z,width=2.5,a=0){
  for(const sx of [-1,1])for(const sz of [-1,1])rod(x,z,a,[sx*(width/2-.15),.13,sz*.30],[sx*(width/2-.18),.29,sz*.29],.025,'oak',.032);
  rounded(x,z,a,[0,.295,0],[width-.04,.075,.86],'oak',.025);
  rounded(x,z,a,[0,.35,0],[width,.14,.87],'fabricSand',.055);
  rounded(x,z,a,[0,.70,.36],[width-.05,.65,.20],'fabricSand',.08);
  for(const sx of [-1,1])rounded(x,z,a,[sx*(width/2-.11),.59,-.025],[.22,.48,.94],'fabricSand',.08);
  const seats=Math.round(width/.8),sw=(width-.49)/seats;
  for(let i=0;i<seats;i++){
   const xx=(i-(seats-1)/2)*sw;
   puff(x,z,a,[xx,.4875,-.065],[sw-.025,.205,.70],'fabricIvory',{seed:i+x});
   puff(x,z,a,[xx,.79,.253],[sw-.026,.47,.205],'fabricSand',{tilt:.17,vertical:true,seed:i+z});
  }
  for(const sx of [-1,1])puff(x,z,a,[sx*(width/2-.39),.755,.033],[.365,.385,.16],sx<0?'fabricOlive':'fabricClay',{tilt:.25,roll:sx*.17,vertical:true,seed:x+sx});
  records.sofas.push({x,z,angle:a,width,depth:.99,seatHeight:.59});
 }
 function coffeeTables(x,z){
  ovalTop(x-.18,z+.08,.72,.48,.506,.058,'oakTop');
  for(const [dx,dz] of [[-.50,-.20],[.30,-.20],[-.50,.36],[.30,.36]])rod(x,z,0,[dx,.13,dz],[dx*.94,.476,dz*.94],.030,'oak',.041);
  ovalTop(x+.61,z-.32,.36,.32,.466,.066,'travertine');
  vessel(x,z,0,[.61,.13,-.32],[[0,0],[.20,0],[.205,.015],[.17,.29],[.15,.303],[0,.303]],'travertine');
  book(x,z,.08,[-.36,.536,.08],.34,.046,'bookOlive');book(x,z,-.06,[-.36,.584,.08],.28,.035,'bookClay');
  bowl(x,z,0,[.11,.536,.08],'ceramicCream');vase(x,z,0,[.61,.50,-.32],'ceramicClay',.80);
 }
 function occasionalTable(x,z){
  ovalTop(x,z,.35,.35,.505,.05,'oakTop');
  vessel(x,z,0,[0,.13,0],[[0,0],[.23,0],[.23,.018],[.12,.045],[.10,.35],[0,.35]],'oak');
  bowl(x,z,0,[0,.531,0],'ceramicCream',.8);
 }
 function desk(x,z){
  const a=-Math.PI/2,w=1.9;
  rounded(x,z,a,[0,.85,0],[w,.065,.70],'oakTop',.02);
  for(const sx of [-1,1])for(const sz of [-1,1])rod(x,z,a,[sx*.84,.13,sz*.26],[sx*.81,.82,sz*.25],.025,'oak',.034);
  rounded(x,z,a,[-.57,.59,.025],[.43,.44,.54],'oak',.016);
  for(let i=0;i<2;i++){const yy=.49+i*.205;rounded(x,z,a,[-.57,yy,-.25],[.385,.185,.020],'oak',.008);rod(x,z,a,[-.62,yy+.02,-.269],[-.52,yy+.02,-.269],.005,'brass');}
  rounded(x,z,a,[.28,.891,.06],[.42,.015,.29],'metal',.008);
  const display=T.mergeVertices(new T.RoundedBoxGeometry(.42,.27,.014,2,.006));display.rotateX(-.17);display.translate(.28,1.025,.185);place(display,x,z,a,'metal');
  const screen=T.mergeVertices(new T.RoundedBoxGeometry(.393,.241,.003,2,.002));screen.rotateX(-.17);screen.translate(.28,1.025,.175);place(screen,x,z,a,'screen');
  book(x,z,a,[-.26,.885,-.08],.27,.026,'bookClay');vase(x,z,a,[.70,.884,.20],'ceramicOlive',.55);
  records.desks.push({x,z,angle:a,width:w,depth:.70,top:.8825});
 }
 function lounger(x,z,a=Math.PI/2){
  for(const sx of [-1,1])for(const dz of [-.66,.66])rod(x,z,a,[sx*.30,.13,dz],[sx*.28,.40,dz],.026,'oak',.032);
  for(const sx of [-1,1])rounded(x,z,a,[sx*.32,.39,0],[.055,.08,1.96],'oak',.017);
  for(let i=0;i<14;i++)rounded(x,z,a,[0,.416,-.88+i*.135],[.65,.032,.11],'oak',.009);
  puff(x,z,a,[0,.488,.32],[.63,.12,1.06],'fabricIvory',{piping:true});
  const back=T.mergeVertices(new T.RoundedBoxGeometry(.65,.055,.84,2,.02));back.rotateX(.40);back.translate(0,.597,-.56);place(back,x,z,a,'oak');
  puff(x,z,a,[0,.649,-.57],[.63,.12,.81],'fabricIvory',{tilt:.40});
  puff(x,z,a,[0,.79,-.80],[.45,.14,.25],'fabricOlive',{tilt:.35});
  records.loungers.push({x,z,angle:a,width:.70,length:1.96});
 }
 function armchair(x,z,a=0,key='fabricClay'){
  for(const sx of [-1,1])for(const sz of [-1,1])rod(x,z,a,[sx*.29,.13,sz*.26],[sx*.265,.37,sz*.245],.026,'oak',.032);
  rounded(x,z,a,[0,.35,0],[.73,.14,.68],'oak',.045);
  puff(x,z,a,[0,.48,-.025],[.67,.19,.59],key);
  puff(x,z,a,[0,.75,.235],[.72,.53,.17],key,{tilt:.15,vertical:true});
  for(const sx of [-1,1])rounded(x,z,a,[sx*.33,.62,.015],[.14,.33,.62],key,.065);
 }
 function cabinetRun(x,z,length,depth,a=0){
  rounded(x,z,a,[0,.18,.02],[length-.09,.10,depth-.10],'wood',.009);
  rounded(x,z,a,[0,.59,0],[length,.72,depth],'oak',.012);
  rounded(x,z,a,[0,.985,0],[length+.045,.05,depth+.045],'travertine',.012);
  const count=Math.ceil(length/.58),w=length/count;
  for(let i=0;i<count;i++){
   const xx=(i-(count-1)/2)*w,drawers=i%3===0?3:1,h=.67/drawers;
   for(let j=0;j<drawers;j++){
    const yy=.255+h*(j+.5);
    rounded(x,z,a,[xx,yy,-depth/2-.009],[w-.006,h-.006,.020],'oak',.006);
    rod(x,z,a,[xx-.055,yy+h/2-.045,-depth/2-.031],[xx+.055,yy+h/2-.045,-depth/2-.031],.0045,'brass');
   }
  }
 }
 function refrigerator(x,z,a=Math.PI/2){
  rounded(x,z,a,[0,1.1,0],[.75,1.95,.78],'appliance',.028);
  for(const [y,h] of [[.55,.72],[1.48,1.10]]){
   rounded(x,z,a,[0,y,-.403],[.706,h,.030],'appliance',.015);
   const lo=y-h*.32,hi=y+h*.32;
   for(const yy of [lo,hi])rod(x,z,a,[-.26,yy,-.422],[-.26,yy,-.465],.008,'metal');
   rod(x,z,a,[-.26,lo,-.465],[-.26,hi,-.465],.011,'metal');
  }
 }
 return {bed,chair,dining,outdoorTable,sofa,coffeeTables,occasionalTable,desk,lounger,armchair,cabinetRun,refrigerator,records};
}
