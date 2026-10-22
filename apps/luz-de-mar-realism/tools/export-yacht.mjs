// Capture evaluated current-yacht geometry without changing its source files.
import {readFileSync,writeFileSync,mkdirSync,cpSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
const source=resolve(process.argv[2]||'/workspace/tidewater-rocha'),out=resolve(process.argv[3]||'work/snapshot');mkdirSync(out,{recursive:true});
const load=p=>import(pathToFileURL(resolve(source,'app/src',p)).href);
const {validateLuzDeMarAsset,luzSourcePoint,luzPoint,LUZ_DE_MAR}=await load('world/yacht/LuzDeMar.js');
const {createEntranceYacht}=await load('world/rocha/RochaEntranceYacht.js');
const {LuzDeMarNavigation}=await load('world/yacht/LuzDeMarWalk.js');
const {Vector3}=await load('engine/index.js');
const {MTU_INSTALLATION}=await load('world/yacht/LuzDeMarMtu.js');
const {SEA_STRAINER_INSTALLATION}=await load('world/yacht/LuzDeMarSeaStrainers.js');
const dir=resolve(source,'app/public'),raw=readFileSync(resolve(dir,'rocha/luz-de-mar/model.bin'));
const data=JSON.parse(readFileSync(resolve(dir,'rocha/luz-de-mar/model.json'))),asset=validateLuzDeMarAsset(data,raw.buffer.slice(raw.byteOffset,raw.byteOffset+raw.byteLength));
const fetcher=async url=>new Response(readFileSync(resolve(dir,url.replace(/^\.\//,''))));
const m=createEntranceYacht(JSON.parse(readFileSync(resolve(dir,'rocha/rocha-data.json'))),asset,{mtuOptions:{fetcher},seaStrainerOptions:{fetcher}});
if(!await m.mtu.loadExterior()||!await m.strainers.loadExterior())throw Error('Incomplete machinery snapshot');
const records=[...m.machinery.parts,...m.interiorDetail.objects,...(m.exterior?.additions||[])],byId=new Map(records.filter(p=>p.id).map(p=>[p.id,p]));
const omitted=new Set([...m.indexOmissions.owners.values()].flatMap(x=>[...x]));
const panels=new Set(m.machinery.seaStrainerAccess.panelIds),doors=new Set(m.machinery.parts.filter(p=>p.serviceDoorLeaf).map(p=>p.id));
const specs=[{id:'saloon',sourceID:'MD_R02',label:'Salón',bounds:[8.30,-3.35,3.72,18.08,3.35,6.02],walkBounds:[8.60,-2.48,17.72,2.64],floor:3.95},
 {id:'machinery',sourceID:'LD_R02',label:'Cuarto de máquinas',bounds:[6.25,-3.36,.55,13.48,3.36,3.94],walkBounds:[6.82,-3.14,13.12,3.14],floor:1.58}];
function surface(c,s,p,glass){
 let pattern=Math.round(s[2]||0),color=c.slice(),rough=s[0],metal=s[1];
 if(pattern===17){pattern=p[2]>3.9&&p[2]<4?'wood-floor':0;if(pattern==='wood-floor'){color=[.474,.392,.275];rough=.48;}}
 if(pattern===9){color=[.815,.791,.721];rough=.65;}
 let family=glass?'glass':typeof pattern==='string'?'wood':metal>.45?'metal':[1,2,10,16,36].includes(pattern)?'wood':[3,6,11,13,20,21].includes(pattern)?'fabric':[23,35].includes(pattern)?'checker':[24,30,34].includes(pattern)?'insulation':[15,31].includes(pattern)?'rubber':'paint';
 return{family,color,rough,metal,pattern,glass,emission:pattern===25?.6:pattern===8?.15:0};
}
function clip(poly,axis,value,greater){const result=[];for(let k=0;k<poly.length;k++){const a=poly[k],b=poly[(k+1)%poly.length],ia=greater?a[axis]>=value:a[axis]<=value,ib=greater?b[axis]>=value:b[axis]<=value;if(ia)result.push(a);if(ia!==ib){const t=(value-a[axis])/(b[axis]-a[axis]);result.push(a.map((v,j)=>v+(b[j]-v)*t));}}return result;}
const info={version:1,source:'Current Luz de Mar / tidewater-rocha',sourcePublishedCommit:'36624f2403cfd27b7c7406514727c773dd7d3dfc',sourceModelSHA256:createHash('sha256').update(raw).digest('hex'),units:'physical metres',sourceAxes:'X forward, Y port, Z up',normalization:{sx:LUZ_DE_MAR.sx,sy:LUZ_DE_MAR.sy,seaReference:2.01,length:35.23},mtu:MTU_INSTALLATION,filters:SEA_STRAINER_INSTALLATION,rooms:[]};
for(const spec of specs){
 const room=spec.id==='machinery'?m.machinery.navigation.room:data.rooms.find(x=>x.id===spec.sourceID),v=[],indices=[],faceRecords=[],parts=[],partMap=new Map(),recipes=[],recipeMap=new Map(),weld=new Map();
 const low=luzPoint(spec.bounds.slice(0,3)),high=luzPoint(spec.bounds.slice(3)),box=[low.x,low.y,low.z,high.x,high.y,high.z];
 function partIndex(id,feature,recipe,dynamic,atlas){const key=[id,recipe,dynamic].join('|');if(!partMap.has(key)){partMap.set(key,parts.length);parts.push({id,feature,recipe,dynamic,atlas});}return partMap.get(key);}
 function emit(poly,description,recipe){
  const key=JSON.stringify(recipe);if(!recipeMap.has(key)){recipeMap.set(key,recipes.length);recipes.push(recipe);}const ri=recipeMap.get(key);
  const pi=partIndex(description.id,description.feature,ri,description.dynamic,description.atlas);
  for(let j=1;j<poly.length-1;j++){
   for(const a of[poly[0],poly[j],poly[j+1]]){const n=Math.hypot(a[3],a[4],a[5])||1,values=[...a.slice(0,3),a[3]/n,a[4]/n,a[5]/n,...recipe.color,recipe.rough,recipe.metal],wk=pi+'|'+values.map(x=>Math.round(x*1e6)).join(',');if(!weld.has(wk)){weld.set(wk,v.length/11);v.push(...values);}indices.push(weld.get(wk));}faceRecords.push(pi);
  }
 }
 function capture(mesh,{native=false,idOverride=null,atlasOverride=null}={}){
  const g=mesh.geometry,p=g.attributes.position.array,n=g.attributes.normal.array,c=g.attributes.color.array,s=g.attributes.aSurface?.array||g.attributes.aMtuSurface?.array||g.attributes.aSeaSurface?.array,ss=g.attributes.aSurface?4:2;
  const original=m.indexOmissions.originals.get(mesh)?.array||g.index.array;
  const objectRanges=m.objectRanges.filter(r=>mesh.name==='Luz de Mar · '+r.batch).sort((a,b)=>a.start-b.start),componentRanges=m.componentRanges.filter(r=>mesh.name==='Luz de Mar · '+r.batch).sort((a,b)=>a.start-b.start);let oi=0,ci=0;
  for(let t=0;t<original.length;t+=3){
   while(oi<objectRanges.length&&objectRanges[oi].start+objectRanges[oi].count<=t)oi++;while(ci<componentRanges.length&&componentRanges[ci].start+componentRanges[ci].count<=t)ci++;
   const ro=objectRanges[oi],rc=componentRanges[ci],range=ro&&ro.start<=t?ro:rc&&rc.start<=t?rc:null,id=idOverride||range?.id||mesh.name;
   if(omitted.has(id))continue;const record=byId.get(id)||data.meshes.find(x=>x.id===id),dynamic=panels.has(id)?'register':doors.has(id)?'door':null;
   const tri=Array.from(original.slice(t,t+3),i=>[p[i*3],p[i*3+1],p[i*3+2],n[i*3],n[i*3+1],n[i*3+2],c[i*3],c[i*3+1],c[i*3+2],s?.[i*ss]??.5,s?.[i*ss+1]??0,s?.[i*ss+2]??0]);
   if([0,1,2].some(a=>tri.every(x=>x[a]<box[a])||tri.every(x=>x[a]>box[a+3])))continue;
   let poly=tri;for(let a=0;a<3&&poly.length;a++){poly=clip(poly,a,box[a],true);if(poly.length)poly=clip(poly,a,box[a+3],false);}if(poly.length<3)continue;
   const q=luzSourcePoint(new Vector3(...tri[0].slice(0,3))),recipe=surface(tri[0].slice(6,9),[tri[0][9],tri[0][10],tri[0][11]],q,mesh.material.transparent);
   const structure=['Hull','Decks','Partitions','Superstructure','Stairs'].includes(record?.category)||['lining','guest-boundary','floor','bilge','service-threshold'].includes(record?.system)||record?.permanentStructure;
   emit(poly,{id,feature:record?.feature||record?.name||id,dynamic,atlas:dynamic||recipe.glass||recipe.emission?'none':atlasOverride|| (structure?'architecture':'furniture')},recipe);
  }
 }
 for(const mesh of m.meshes)capture(mesh);
 if(spec.id==='machinery'){capture(m.mtu.fitting,{idOverride:'MTU/installation',atlasOverride:'furniture'});capture(m.strainers.fitting,{idOverride:'SeaStrainers/well-and-pipes',atlasOverride:'architecture'});}
 const float=new Float32Array(v),ix=new Uint32Array(indices),faces=new Uint32Array(faceRecords),blob=Buffer.concat([Buffer.from(float.buffer),Buffer.from(ix.buffer),Buffer.from(faces.buffer)]);
 writeFileSync(resolve(out,spec.id+'.bin'),blob);
 const step=.04,[x0,y0,x1,y1]=spec.walkBounds,nx=Math.ceil((x1-x0)/step)+1,ny=Math.ceil((y1-y0)/step)+1,bits=Buffer.alloc(Math.ceil(nx*ny/8)),nav=new LuzDeMarNavigation(asset,{exterior:m.navigation,boarding:m.boarding,machinery:m.machinery.navigation,service:m.serviceAccess});nav.enterRoom(spec.sourceID);
 let safeCells=0;for(let iy=0;iy<ny;iy++)for(let ix=0;ix<nx;ix++){const x=x0+ix*step,y=y0+iy*step;if([[0,0],[.02,0],[-.02,0],[0,.02],[0,-.02]].every(([dx,dy])=>nav.floorSafe(x+dx,y+dy,room.deck))){const k=iy*nx+ix;bits[k>>3]|=1<<(k&7);safeCells++;}}
 const meta={...spec,room,units:'physical metres',binary:spec.id+'.bin',vertices:v.length/11,triangles:indices.length/3,vertexBytes:float.byteLength,indexBytes:ix.byteLength,sha256:createHash('sha256').update(blob).digest('hex'),parts,recipes,navigation:{x0,y0,step,nx,ny,mask:bits.toString('base64'),radius:.14,safeCells},door:spec.id==='machinery'?m.machinery.door:null};
 writeFileSync(resolve(out,spec.id+'.json'),JSON.stringify(meta));info.rooms.push({id:spec.id,sourceID:spec.sourceID,triangles:meta.triangles,vertices:meta.vertices,sha256:meta.sha256});console.log(spec.id,meta.triangles,'triangles',safeCells,'safe navigation cells');
}
for(const name of['mtu-r03','sea-strainers']){const dst=resolve(out,'mechanics',name);mkdirSync(dst,{recursive:true});for(const f of['exterior.json','exterior.bin.gz','inspection.json','inspection.bin.gz',...(name==='sea-strainers'?['motion.json']:[]),'MODEL-BASIS.md','native-verification.json'])cpSync(resolve(dir,'rocha/luz-de-mar',name,f),resolve(dst,f));}
writeFileSync(resolve(out,'snapshot.json'),JSON.stringify(info,null,2)+'\n');m.dispose();console.log('Snapshot complete',out);
