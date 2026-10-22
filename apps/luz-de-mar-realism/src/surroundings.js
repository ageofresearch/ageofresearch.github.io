import {Group,Mesh,BoxGeometry,MeshStandardMaterial} from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {sourcePoint,SX,SY} from './navigation.js';
import {applyRoomShading} from './shading.js';
// The side walkway and guardrails are visible through the tour's side windows.
// Their dimensions are inferred; these silhouettes are outside the walking area.
export function surroundings(room){
 const root=new Group();root.name='MD_R02 | Referenced window surroundings';const buckets={paint:[],metal:[],glass:[]};
 const box=(kind,c,d)=>{const g=new BoxGeometry(d[1]*SY,d[2],d[0]*SX);const p=sourcePoint(c);g.translate(p.x,p.y,p.z);buckets[kind].push(g);};
 for(const s of[-1,1]){
  box('paint',[13.2,s*3.10,3.91],[9.2,.91,.07]);box('paint',[13.2,s*3.55,4.12],[9.2,.10,.43]);box('metal',[13.2,s*3.55,4.99],[9.2,.055,.035]);box('metal',[13.2,s*3.55,4.41],[9.2,.025,.02]);
  for(const x of[8.72,11.0,13.3,15.6,17.7])box('metal',[x,s*3.55,4.46],[.045,.045,1.03]);
  box('glass',[13.2,s*3.55,4.68],[9.1,.01,.53]);
 }
 for(const[k,gs]of Object.entries(buckets)){
  const m=new MeshStandardMaterial(k==='metal'?{color:0x303b3e,metalness:.75,roughness:.25}:k==='glass'?{color:0x526871,transparent:true,opacity:.12,roughness:.12,depthWrite:false}:{color:0xdedbcf,roughness:.48});applyRoomShading(m,room);const mesh=new Mesh(mergeGeometries(gs),m);for(const g of gs)g.dispose();mesh.castShadow=k!=='glass';mesh.receiveShadow=true;mesh.userData={sourceIDs:['MD_R02/OBS/A09/window-surroundings'],dimensionStatus:'image-estimated'};root.add(mesh);
 }return root;
}
