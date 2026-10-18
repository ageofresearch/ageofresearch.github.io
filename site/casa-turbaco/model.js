import * as T from './tidewater/engine/index.js';
import {standard} from './tidewater/materials/Materials.js';
import {Vegetation} from './tidewater/world/Vegetation.js';
import {mulberry32} from './tidewater/util/Noise.js';

export const S=12.42;
export const pt=(x,z)=>[(x-521.16)/S,(z-292.5)/S];
const C={wall:0xeee0bf,floor:0xe8dac0,stone:0xb6ac91,wood:0x755136,terracotta:0xc27e60,cream:0xf5e9cd,green:0x627b5d,linen:0xd7c6a6,metal:0x3e4941,teal:0x4d8e83};

export function polygonGeo(points,y){
 const g=new T.BufferGeometry(),p=[],n=[],uv=[],idx=[];
 for(const [x,z] of points){p.push(x,y,z);n.push(0,1,0);uv.push(x,z)}
 const ids=points.map((_,i)=>i);const cross=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
 let area=0;for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];area+=a[0]*b[1]-b[0]*a[1]}
 if(area<0)ids.reverse();
 let guard=0;while(ids.length>2&&guard++<1000){let found=false;for(let i=0;i<ids.length;i++){
  const a=ids[(i+ids.length-1)%ids.length],b=ids[i],c=ids[(i+1)%ids.length];if(cross(points[a],points[b],points[c])<1e-8)continue;
  let inside=false;for(const d of ids)if(d!==a&&d!==b&&d!==c){const q=points[d];if(cross(points[a],points[b],q)>=0&&cross(points[b],points[c],q)>=0&&cross(points[c],points[a],q)>=0){inside=true;break}}
  if(!inside){idx.push(a,c,b);ids.splice(i,1);found=true;break}
 }if(!found)break;}
 g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('normal',new T.Float32BufferAttribute(n,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);return g;
}

export function buildHouse(scene,data,sky,lights){
 const root=new T.Group(),roofs=new T.Group(),wallsGroup=new T.Group();root.name='Casa Turbaco · plano vectorial';roofs.name='Cubiertas · altura exterior 2.70m';wallsGroup.name='Muros';scene.add(root);root.add(roofs,wallsGroup);
 const batches=new Map(),materials={};let parts=0;
 const mat=(key,color,rough=.82)=>materials[key]??=(standard({name:'Turbaco · '+key,color,roughness:rough}));
 for(const [k,c] of Object.entries(C))mat(k,c);
 materials.wall.surface=`let q=floor(in.P*180.0);let noise=fract(sin(dot(q,vec3f(12.1,31.7,17.3)))*43758.5);s.albedo*=.97+noise*.06;s.roughness=.91;`;
 materials.stone.surface=`let uv=in.P.xz;let row=floor(uv.y*2.0);let cell=fract(uv*vec2f(1.0,2.0)+vec2f(row*.5,0.0));let joint=step(.025,cell.x)*step(.035,cell.y);let v=fract(sin(dot(floor(uv*vec2f(1.0,2.0)),vec2f(12.9,78.2)))*43758.5);s.albedo*=mix(.66,.92+v*.13,joint);`;
 materials.wood.surface=`s.albedo*=.88+.12*sin(in.P.x*71.0+sin(in.P.z*2.1)*2.0);s.roughness=.76;`;
 mat('roof',0xe4d1ac).surface=`let q=in.P.xz;let f=fract(q*vec2f(2.3,1.3));s.albedo*=.97+.03*sin(q.x*32.0);s.albedo*=.95+.05*step(.012,f.x)*step(.012,f.y);`;
 mat('lawn',0x667b3e).surface=`let p=in.P.xz;let n=sin(p.x*.81+sin(p.y*.73))*sin(p.y*.6);let q=floor(p*50.0);let v=fract(sin(dot(q,vec2f(12.8,78.2)))*43758.5);s.albedo*=.88+n*.12+v*.13;s.roughness=1.0;`;
 mat('earth',0x596c3c).surface=`let p=in.P.xz;s.albedo*=.93+.07*sin(p.x*.13)*sin(p.y*.1);`;
 const glass=materials.glass=standard({name:'Vidrio del jardín',color:0x7da6a0,roughness:.12,metalness:.25,transparent:true,opacity:.25,depthWrite:false});
 function add(geo,key,group=root){const material=typeof key==='string'?materials[key]:key;const tag=(group===roofs?'roof':group===wallsGroup?'wall':'root')+':'+material.id;
  if(!batches.has(tag))batches.set(tag,{material,group,geos:[]});batches.get(tag).geos.push(geo);parts++;}
 function box(x,y,z,w,h,d,key='wall',group=root,angle=0){if(w<=0||h<=0||d<=0)return;const geo=new T.BoxGeometry(w,h,d);if(angle)geo.rotateY(angle);geo.translate(x,y,z);add(geo,key,group)}
 function cyl(x,y,z,r,h,key='wood',r2=r,group=root){const g=new T.CylinderGeometry(r2,r,h,16);g.translate(x,y,z);add(g,key,group)}
 function ball(x,y,z,rx,ry,rz,key='linen'){const g=new T.SphereGeometry(1,12,8);g.scale(rx,ry,rz);g.translate(x,y,z);add(g,key)}
 function rect(a,b,c,d,y=.07,key='floor',h=.12,group=root){const p=pt(a,b),q=pt(c,d);box((p[0]+q[0])/2,y,(p[1]+q[1])/2,q[0]-p[0],h,q[1]-p[1],key,group)}
 function segment(a,b,y,h,width,key='wall',group=root){const dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz);box((a[0]+b[0])/2,y,(a[1]+b[1])/2,len,h,width,key,group,-Math.atan2(dz,dx))}
 function beam(a,b,y,h,w,key='wood',group=root){segment(pt(...a),pt(...b),y,h,w,key,group)}
 box(0,-.17,0,50,.3,50,'lawn');box(0,-.39,0,800,.15,800,'earth');
 // Surveyed lot outline within the square world.
 for(let i=0;i<data.boundary.length;i++)segment(data.boundary[i],data.boundary[(i+1)%data.boundary.length],.035,.07,.09,'stone');
 for(const room of data.rooms){const [x0,z0,x1,z1]=room.rect;box((x0+x1)/2,.065,(z0+z1)/2,x1-x0,.13,z1-z0,room.kind==='servicio'?'stone':'floor');
  if(room.id!=='gas'){box((x0+x1)/2,2.62,(z0+z1)/2,x1-x0+.24,.16,z1-z0+.24,'roof',roofs);}
 }
 // Covered corridors, front balcony, entrance and pool terrace.
 rect(440.76,226.22,459.4,353.12);rect(582.6,225,599.64,294.26);rect(561.54,294.26,580.08,379.22);
 rect(426.36,354.62,497.04,377.6);rect(388.8,442.1,463.74,462.86,.09,'floor');
 rect(438.42,464.36,517.8,488.36,.045,'stone',.09);
 rect(479.4,201.62,560.1,230.96,.075,'terracotta');rect(518.4,230.96,560.1,288.8,.075,'terracotta');
 rect(467.04,230.96,477.6,353.12,.065,'stone');rect(535.5,288.8,560.1,353.12,.065,'stone');rect(477.6,322.5,535.5,353.12,.065,'stone');
 rect(460.8,230.96,467.04,353.12,.1,'earth');rect(560.1,201.62,581.1,292.82,.045,'earth');
 rect(567.06,430.64,629.58,563.6,-.025,'stone',.05);rect(460,488.36,477.06,567,-.015,'stone',.05);
 // Pavers run from the courtyard to the detached BBQ.
 for(let y=94;y<201;y+=6.3)rect(580,y,590,y+3,.055,'stone',.08);
 for(let x=497;x<578;x+=6.5)rect(x,181,x+3,191,.045,'stone',.08);
 for(let x=442;x<518;x+=8)rect(x,483,x+7.5,486,.1,'floor',.05);
 // Exact paired orange strokes define the walls. Tall window openings are interpreted.
 const collision=[];const wallKeys=new Set();
 for(const w of data.walls){const a=w.a,b=w.b,len=Math.hypot(b[0]-a[0],b[1]-a[1]);const key=[...a,...b].map(v=>v.toFixed(2)).join(',');if(wallKeys.has(key))continue;wallKeys.add(key);
  const mid=[(a[0]+b[0])/2,(a[1]+b[1])/2];const pdf=[mid[0]*S+521.16,mid[1]*S+292.5];const thick=Math.max(.115,w.thickness);
  if(w.low){segment(a,b,.24,.36,thick,'wall');continue}
  collision.push({a,b,width:thick});
  const window=len>2.6&&((pdf[0]<407&&pdf[1]>162&&pdf[1]<441)||(pdf[0]>648&&pdf[1]>134&&pdf[1]<294)||(pdf[1]>439&&pdf[0]<428));
  if(window){const d=[(b[0]-a[0])/len,(b[1]-a[1])/len],wa=[a[0]+d[0]*.38,a[1]+d[1]*.38],wb=[b[0]-d[0]*.38,b[1]-d[1]*.38];
   segment(a,b,.49,.74,thick,'wall',wallsGroup);segment(a,b,2.465,.23,thick,'wall',wallsGroup);segment(a,wa,1.34,2.44,thick,'wall',wallsGroup);segment(wb,b,1.34,2.44,thick,'wall',wallsGroup);
   segment(wa,wb,1.6,1.45,.025,'glass');segment(wa,wb,.89,.05,.16,'wood');segment(wa,wb,2.33,.05,.16,'wood');
   for(const p of [wa,wb,mid])box(p[0],1.6,p[1],.045,1.5,.045,'wood');
  }else segment(a,b,1.35,2.46,thick,'wall',wallsGroup);
 }
 // Canopies at the corridors stay at exactly the same 2.70 m construction height.
 rect(440.76,224.72,459.4,353.12,2.62,'roof',.16,roofs);rect(582.6,224.9,599.64,294.26,2.62,'roof',.16,roofs);
 rect(561.54,294.26,580.08,379.22,2.62,'roof',.16,roofs);
 // Glazed openings at the social courtyard and folding timber screens.
 for(let x=430;x<492;x+=10){const [a,b]=pt(x,354.62);box(a,1.35,b,.045,2.44,.07,'wood');}
 for(let x=432;x<490;x+=4)beam([x,354],[x,365],2.45,.055,.045,'wood');
 // Low pergola over the social terrace, with genuinely open slats.
 for(const [x,z] of [[482,205],[557,205],[557,228],[522,282],[557,282]]){const p=pt(x,z);box(p[0],1.35,p[1],.13,2.7,.13,'wood',roofs);}
 for(let x=482;x<558;x+=3)beam([x,204],[x,229],2.65,.1,.055,'wood',roofs);
 for(let z=232;z<283;z+=3)beam([520,z],[558,z],2.65,.1,.055,'wood',roofs);
 beam([482,204],[558,204],2.54,.14,.14,'wood',roofs);beam([482,229],[558,229],2.54,.14,.14,'wood',roofs);beam([558,204],[558,284],2.54,.14,.14,'wood',roofs);
 // Basin and L-shaped water; the shape is traced directly from the plan.
 add(polygonGeo(data.pool,.015),'teal');
 const poolMat=standard({name:'Piscina · agua tropical',color:0x359f9a,roughness:.15,metalness:.05,modules:[sky.module]});
 poolMat.surface=`let p=in.P.xz;let t=frame.time;let nx=sin(p.x*5.0+p.y*2.0+t*.8)*.045+sin(p.x*11.0-p.y*7.0+t*1.1)*.018;let nz=cos(p.y*5.3+p.x*1.5+t*.7)*.045;s.normal=normalize(vec3f(nx,1.0,nz));let V=normalize(frame.cameraPos-in.P);let R=reflect(-V,s.normal);let F=.025+.65*pow(1.0-max(dot(V,s.normal),0.0),5.0);let reflected=skyRadianceWithClouds(R,false);let caustic=pow(max(0.0,sin(p.x*7.0+sin(p.y*5.0+t*.7))*sin(p.y*8.0+sin(p.x*4.0-t*.6))),12.0);let grid=fract(p*5.0);s.albedo=vec3f(.025,.27,.25)*(1.0+.2*step(.03,grid.x)*step(.03,grid.y));s.emissive=reflected*F+vec3f(.03,.09,.07)*caustic;s.roughness=.13;`;
 add(polygonGeo(data.pool,.115),poolMat);
 for(let i=0;i<data.pool.length;i++){const a=data.pool[i],b=data.pool[(i+1)%data.pool.length];segment(a,b,.14,.18,.17,'cream');}
 // Jacuzzi in its original position.
 const jp=pt(532,262);box(jp[0],.26,jp[1],2.18,.42,2.18,'stone');box(jp[0],.485,jp[1],1.82,.04,1.82,'teal');
 for(const [dx,dz] of [[-.83,0],[.83,0],[0,-.83],[0,.83]])box(jp[0]+dx,.5,jp[1]+dz,dx===0?1.8:.18,.12,dz===0?1.8:.18,'cream');
 const bubbleMat=mat('bubble',0xc6e2d3,.2);for(let i=0;i<16;i++){const a=i*2.4;cyl(jp[0]+Math.cos(a)*.6,.516,jp[1]+Math.sin(a)*.6,.035,.006,bubbleMat);}

 function bed(px,pz,double=false,turn=0){const [x,z]=pt(px,pz),w=double?1.8:.92,h=2.06;
  const local=(dx,dy,dz,bw,bh,bd,k)=>box(x+Math.cos(turn)*dx+Math.sin(turn)*dz,dy,z-Math.sin(turn)*dx+Math.cos(turn)*dz,bw,bh,bd,k,root,turn);
  local(0,.3,0,w+.06,.3,h+.08,'wood');local(0,.52,0,w,.22,h,'cream');local(0,.67,.32,w,.09,1.25,'linen');local(0,.74,.61,w+.015,.045,.43,'terracotta');local(0,.7,-.64,w*.82,.14,.42,'cream');local(0,.75,-1.07,w+.13,1.25,.08,'wood');
  for(const dx of [-w/2-.32,w/2+.32]){local(dx,.4,-.7,.45,.62,.42,'wood');}
 }
 bed(423,191,true,-Math.PI/2);for(const z of [237,254])bed(402,z,false,-Math.PI/2);for(const x of [402,421])bed(x,320,false);for(const z of [187,206])bed(635,z,false,Math.PI/2);for(const x of [621,639])bed(x,268,false);bed(598,365,false,Math.PI/2);
 function chair(x,z,angle=0,k='wood'){box(x,.48,z,.49,.1,.52,k,root,angle);box(x+Math.sin(angle)*.23,.84,z+Math.cos(angle)*.23,.5,.66,.08,k,root,angle);for(const dx of [-.18,.18])for(const dz of [-.18,.18])box(x+dx,.26,z+dz,.045,.45,.045,'wood');box(x,.55,z,.43,.08,.44,'linen',root,angle);}
 function sofa(px,pz,w=2.5,angle=0,k='linen'){const [x,z]=pt(px,pz);box(x,.38,z,w,.5,.86,'wood',root,angle);box(x,.66,z,w-.1,.22,.79,k,root,angle);box(x+Math.sin(angle)*.35,.87,z+Math.cos(angle)*.35,w,.65,.18,k,root,angle);for(const s of [-1,1]){box(x+Math.cos(angle)*s*(w/2-.09),.76,z-Math.sin(angle)*s*(w/2-.09),.18,.48,.9,k,root,angle);}}
 sofa(461,365,2.8,Math.PI);sofa(461,408,2.8);sofa(441,386,2.35,Math.PI/2);sofa(485,386,2.35,-Math.PI/2);
 const center=pt(461,386);box(center[0],.35,center[1],1.35,.4,1.35,'wood');box(center[0],.58,center[1],1.4,.06,1.4,'stone');cyl(center[0],.65,center[1],.2,.1,'terracotta');
 rect(436,364,487,415,.137,'green',.012);
 sofa(410,385,2.4);const desk=pt(388,369);box(desk[0],.85,desk[1],.7,.09,1.9,'wood');chair(desk[0]+.65,desk[1],Math.PI/2);
 sofa(408,429,2.4,.5);const tv=pt(381,418);box(tv[0],1.2,tv[1],.1,.85,1.5,'metal');
 const dining=pt(522,414);ball(dining[0],.91,dining[1],1.02,.06,1.8,'wood');box(dining[0],.5,dining[1],.5,.78,1.15,'wood');for(let i=0;i<8;i++){const a=i*Math.PI/4;chair(dining[0]+Math.cos(a)*1.3,dining[1]+Math.sin(a)*2.05,-a+Math.PI/2);}
 cyl(dining[0],1.02,dining[1],.22,.15,'stone');
 // Outdoor lounge furniture.
 for(const z of [342,366]){const p=pt(547,z);box(p[0],.32,p[1],1.6,.2,.65,'wood');box(p[0]-.5,.55,p[1],.45,.12,.65,'linen',root,.15);box(p[0],.46,p[1],1.4,.06,.6,'cream');}
 const table=pt(523,344);cyl(table[0],.73,table[1],.52,.08,'cream');cyl(table[0],.42,table[1],.08,.55,'wood');for(let i=0;i<4;i++){const a=i*Math.PI/2;chair(table[0]+Math.cos(a)*.83,table[1]+Math.sin(a)*.83,-a+Math.PI/2);}
 // Kitchen, island and service storage.
 rect(558,419,614,428,.53,'wood',.86);rect(558,418,614,429,.985,'cream',.05);rect(617,386,627,428,.53,'wood',.86);rect(616,386,628,429,.985,'cream',.05);rect(566,391,592,403,.53,'wood',.86);rect(565,390,593,404,.985,'cream',.05);
 const hob=pt(584,424);box(hob[0],1.02,hob[1],.75,.025,.53,'metal');for(const x of [-.19,.19])for(const z of [-.14,.14])cyl(hob[0]+x,1.04,hob[1]+z,.095,.01,'metal');
 const fridge=pt(624,383);box(fridge[0],1.1,fridge[1],.75,1.95,.78,'metal');
 for(const r of data.rooms.filter(r=>r.id.startsWith('bano'))){const [a,b,c,d]=r.rect;cyl(a+.45,.41,b+.43,.22,.58,'cream');ball(a+.45,.74,b+.58,.25,.08,.34,'cream');box(c-.46,.72,d-.36,.65,.12,.48,'wood');ball(c-.46,.82,d-.36,.22,.09,.16,'cream');box(c-.07,1.4,d-.6,.03,.8,.6,'teal');}
 const estar=pt(611,319);for(let i=0;i<3;i++){const a=i*2.1;ball(estar[0]+Math.cos(a)*.8,.55,estar[1]+Math.sin(a)*.8,.38,.35,.38,'terracotta');}cyl(estar[0],.42,estar[1],.35,.08,'wood');
 // Gym equipment: treadmill, bike, weight bench and free weights.
 const gym=pt(625,154);box(gym[0],.25,gym[1],.85,.24,1.65,'metal');box(gym[0],.4,gym[1],.64,.04,1.4,'green');box(gym[0],1.18,gym[1]-.65,.7,.08,.13,'metal');for(const s of [-1,1])box(gym[0]+s*.34,.8,gym[1]-.65,.045,.8,.045,'metal');
 const bench=pt(615,142);box(bench[0],.55,bench[1],.48,.18,1.25,'linen');for(const dz of [-.45,.45])box(bench[0],.3,bench[1]+dz,.5,.5,.06,'metal');
 const bike=pt(638,166);cyl(bike[0],.48,bike[1],.29,.11,'metal');box(bike[0],.88,bike[1],.12,.8,.06,'metal');box(bike[0],1.24,bike[1]+.28,.4,.1,.25,'linen');
 // BBQ shelter, worktop and grill.
 rect(543,68,587,76,.51,'stone',.86);rect(542,67,588,77,.97,'cream',.05);const grill=pt(570,72);box(grill[0],1.02,grill[1],1.2,.08,.58,'metal');for(let x=-.5;x<=.5;x+=.09)box(grill[0]+x,1.08,grill[1],.018,.02,.55,'metal');
 for(const [x,z] of [[541,67],[588,67],[541,88],[588,88]]){const p=pt(x,z);box(p[0],1.35,p[1],.13,2.7,.13,'wood');}
 // Car silhouettes fit the two parking spaces shown in the PDF.
 for(const z of [471,531]){const [x,y]=pt(583,z);box(x,.63,y,1.77,.7,4.15,'cream');box(x,1.13,y-.05,1.58,.45,2.1,'cream');box(x,1.16,y-.95,1.48,.38,.055,'teal');box(x,1.16,y+.98,1.48,.38,.055,'teal');for(const dx of [-.85,.85])for(const dz of [-1.25,1.25]){const g=new T.CylinderGeometry(.3,.3,.17,16);g.rotateZ(Math.PI/2);g.translate(x+dx,.35,y+dz);add(g,'metal');}}
 // Garden lights glow after sunset, with local illumination from Tidewater.
 const lamps=[];for(const [px,pz] of [[469,496],[469,538],[590,106],[590,150],[468,240],[468,290],[558,311],[551,359],[414,444],[628,446]]){const [x,z]=pt(px,pz);box(x,.4,z,.09,.7,.09,'metal');const lm=standard({name:'Luz del jardín',color:0xe4cf99,emissive:0xffd9a0,emissiveIntensity:.02});box(x,.78,z,.13,.12,.13,lm);lamps.push(lm);lights.add({position:new T.Vector3(x,.85,z),color:new T.Color(1,.72,.42),intensity:1.1,range:5,kind:'pathLight'});}
 for(const r of data.rooms.filter(r=>r.kind!=='exterior')){const [a,b,c,d]=r.rect;lights.add({position:new T.Vector3((a+c)/2,2.25,(b+d)/2),color:new T.Color(1,.78,.5),intensity:.55,range:6,kind:'window'});}
 for(const {material,group,geos} of batches.values()){const geo=T.mergeGeometries(geos);if(!geo)throw Error('No se pudo unir geometría: '+material.name);geo.computeBoundingSphere();geo.computeBoundingBox();const mesh=new T.Mesh(geo,material);mesh.name=material.name;mesh.castShadow=material!==glass&&material!==poolMat;mesh.receiveShadow=true;mesh.staticVelocity=true;mesh.shadowStatic=true;if(material===glass)mesh.layers.set(2);group.add(mesh);}
 root.updateMatrixWorld(true);
 return {root,roofs,wallsGroup,collision,lamps,parts,pool:data.pool,materials};
}

export function makeVegetation(scene,data){
 const rand=mulberry32(7284),size=50,res=129,texel=size/(res-1);
 const terrain={size,res,texel,origin:-25,heights:new Float32Array(res*res),heightAt:()=>0,normalAt:(x,z,o)=>o.set(0,1,0)};
 const records=Object.fromEntries(['palms','trees','shrubs','youngPalms','ferns','bananas','monsteras','elephantEars','heliconias','strelitzias'].map(k=>[k,[]]));
 function plant(kind,x,z,H=1,s=1){const yaw=rand()*6.283;records[kind].push({x,y:-.035,z,H,s,sy:1,yaw,la:yaw,l:kind==='shrubs'?-1:kind==='trees'?1:.045,seed:rand(),qr:180});}
 // Main planting symbols follow the front garden and the rear garden in the plan.
 for(const [x,z,h] of [[429,530,7.8],[508,530,8.6],[380,470,7.1],[471,133,6],[478,163,7.5],[480,68,7.4],[605,61,8.4],[606,267,6.5],[629,162,8],[400,299,6]]){const p=pt(x,z);if(data.rooms.some(r=>p[0]>r.rect[0]-.8&&p[0]<r.rect[2]+.8&&p[1]>r.rect[1]-.8&&p[1]<r.rect[3]+.8))continue;plant('palms',...p,h,.8);}
 for(const [x,z,h] of [[440,43,6],[502,43,5.3],[620,35,5.8],[681,34,5.7],[681,83,5],[665,115,4.6],[661,199,4.6],[366,511,5]]){const p=pt(x,z);plant('trees',...p,h,.44+rand()*.1);}
 const occupied=(x,z,pad=0)=>data.rooms.some(r=>x>r.rect[0]-pad&&x<r.rect[2]+pad&&z>r.rect[1]-pad&&z<r.rect[3]+pad);
 function clear(x,z){if(occupied(x,z,.7))return false;const [px,py]=[x*S+521.16,z*S+292.5];if(px>435&&px<583&&py>174&&py<489)return false;if(px>561&&py>430)return false;if(px>455&&px<480&&py>480)return false;return true;}
 // Additional dense planting belongs to the 50 m map's margins, outside the building footprint.
 for(let i=0;i<25;i++){const side=i%3;const x=side===0?-21+rand()*4:side===1?19+rand()*4:-21+rand()*43;const z=side===2?-23+rand()*3:-22+rand()*45;if(clear(x,z)){plant(i%3===0?'palms':'trees',x,z,6+rand()*4,i%3===0?.78:.4+rand()*.18);}}
 for(let i=0;i<120;i++){const x=-24+rand()*48,z=-24+rand()*48;if(!clear(x,z))continue;plant('shrubs',x,z,1.2,.35+rand()*.35);if(i%3===0)plant('bananas',x+.7,z+.2,2,.5+rand()*.2);for(let j=0;j<3;j++)plant(['monsteras','ferns','elephantEars','heliconias','strelitzias'][Math.floor(rand()*5)],x+(rand()-.5)*1.8,z+(rand()-.5)*1.8,.02,.45+rand()*.35);}
 // Narrow courtyard planting beds, kept below sight lines.
 for(let y=239;y<353;y+=10){const p=pt(463.5,y);plant('shrubs',...p,.65,.28);plant('ferns',p[0],p[1]+.3,.02,.32);}
 for(let y=209;y<292;y+=12){const p=pt(567,y);plant('monsteras',...p,.02,.48);plant('shrubs',p[0]+.45,p[1],.7,.3);}
 const mr=128,mask=new Uint8Array(mr*mr*4);for(let j=0;j<mr;j++)for(let i=0;i<mr;i++){const x=(i+.5)/mr*50-25,z=(j+.5)/mr*50-25;if(clear(x,z)&&Math.abs(x)<24.5&&Math.abs(z)<24.5){const k=(j*mr+i)*4;mask[k+1]=(Math.abs(x)>16||z<-18)?95:20;mask[k+3]=35;}}
 const veg=new Vegetation({scene,terrain,records,grassMask:{data:mask,res:mr}});return {veg,records,terrain};
}
