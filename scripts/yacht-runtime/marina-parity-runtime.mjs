import * as THREE from 'three';
import {MeshBVH,ExtendedTriangle,acceleratedRaycast} from 'three-mesh-bvh';
import {init,importNavMesh,NavMeshQuery} from '@recast-navigation/core';
import {createParityAppearance} from './parity-appearance.mjs';
import {installMarinaParityOutput} from './marina-parity-output.mjs';

export async function attachRuntime(app,yacht,model,base){
 if(!THREE.Mesh.prototype.intersectsFrustum)THREE.Mesh.prototype.intersectsFrustum=function(f){return f.intersectsObject(this);};
 if(!THREE.Matrix4.prototype.determinantAffine)THREE.Matrix4.prototype.determinantAffine=THREE.Matrix4.prototype.determinant;
 await init();
 const [bytes,audit,opened,stairs,manifest,poses]=await Promise.all([
  fetch(new URL('navigation/yacht-navmesh.bin',base)).then(r=>r.arrayBuffer()),fetch(new URL('navigation/ROUTE-AUDIT.json',base)).then(r=>r.json()),
  fetch(new URL('navigation/ROUTE-AUDIT-open.json',base)).then(r=>r.json()),fetch(new URL('navigation/STAIR-ROUTE-AUDIT.json',base)).then(r=>r.json()),
  fetch(new URL('asset.json',base)).then(r=>r.json()),fetch(new URL('CAMERAS.json',base)).then(r=>r.json())
 ]);
 if([audit.source_sha256,opened.source_sha256,stairs.native_sha256].some(s=>s!==manifest.native_sha256))throw Error('Yacht model/navigation versions differ');
 const {navMesh}=importNavMesh(new Uint8Array(bytes)),query=new NavMeshQuery(navMesh),root=yacht.root,input=app.navigation.input,camera=app.walkCamera;
 const movers=[],moving=[],fixed=[],q=new THREE.Quaternion(),inverse=new THREE.Matrix4(),segment=new THREE.Line3(),worldSegment=new THREE.Line3(),bounds=new THREE.Box3(),triangle=new ExtendedTriangle(),pa=new THREE.Vector3(),pb=new THREE.Vector3();
 const eye=1.45,radius=.14,height=1.7;let ref=0,blocked=0,moved=0,auditMode=false,appearance=null,output=null,appearancePromise=Promise.resolve(),appearanceDirty=false,appearanceBusy=false,appearanceProbe=false,lastLightPosition=new THREE.Vector3(Infinity,Infinity,Infinity);
 model.traverse(o=>{const d=o.userData;if(d.operable_door||d.operable_slide||d.operable_fixture){const m={object:o,original:o.quaternion.clone(),initial:d.default_open?1:0,fraction:d.default_open?1:0,target:d.default_open?1:0,meshes:[]};o.traverse(c=>{if(c.isMesh){m.meshes.push(c);moving.push(c);}});movers.push(m);}});
 model.traverse(o=>{if(o.isMesh){if(!o.geometry.boundsTree)o.geometry.boundsTree=new MeshBVH(o.geometry);o.raycast=acceleratedRaycast;if(!moving.includes(o))fixed.push(o);}});
 const ray=new THREE.Raycaster();ray.firstHitOnly=true;
 const localPoint=p=>root.worldToLocal(p.clone()),worldPoint=p=>root.localToWorld(p.clone());
 const foot=()=>{const p=yacht.controlState().local.clone();p.y-=eye;return p;};
 function capsuleBlocked(position,meshes=moving){
  worldSegment.start.copy(worldPoint(position.clone().add(new THREE.Vector3(0,radius,0))));worldSegment.end.copy(worldPoint(position.clone().add(new THREE.Vector3(0,height-radius,0))));
  for(const mesh of meshes){
   inverse.copy(mesh.matrixWorld).invert();segment.copy(worldSegment);segment.start.applyMatrix4(inverse);segment.end.applyMatrix4(inverse);const scale=new THREE.Vector3().setFromMatrixScale(inverse),r=radius*Math.max(scale.x,scale.y,scale.z);
   bounds.makeEmpty().expandByPoint(segment.start).expandByPoint(segment.end).expandByScalar(r);
   if(mesh.geometry.boundsTree.shapecast({intersectsBounds:b=>b.intersectsBox(bounds),intersectsTriangle:t=>{triangle.copy(t);triangle.a.applyMatrix4(mesh.matrixWorld);triangle.b.applyMatrix4(mesh.matrixWorld);triangle.c.applyMatrix4(mesh.matrixWorld);triangle.needsUpdate=true;return triangle.closestPointToSegment(worldSegment,pa,pb)<radius-.001;}}))return mesh.name;
  }return null;
 }
 function floor(position){
  ray.set(worldPoint(position.clone().add(new THREE.Vector3(0,.25,0))),new THREE.Vector3(0,-1,0));ray.far=.55;
  for(const hit of ray.intersectObjects(fixed,false)){const y=localPoint(hit.point).y;if(Math.abs(y-position.y)<.225)return y;}return position.y;
 }
 function snap(){const p=foot(),hit=query.findNearestPoly(p,{halfExtents:{x:.3,y:.25,z:.3}});if(!hit.success)throw Error('No walkable yacht destination');ref=hit.nearestRef;return p;}
 function move(dx,dz){
  if(!ref)snap();let p=foot(),changed=false;
  for(let i=0,n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.035));i<n;i++){
   const hit=query.moveAlongSurface(ref,p,{x:p.x+dx/n,y:p.y,z:p.z+dz/n},{maxVisitedSize:64});if(!hit.success)break;
   const nextRef=hit.visited.at(-1)||ref,h=query.getPolyHeight(nextRef,hit.resultPosition),next=new THREE.Vector3(hit.resultPosition.x,h.success?h.height:hit.resultPosition.y,hit.resultPosition.z);next.y=floor(next);
   if(capsuleBlocked(next)||Math.abs(next.y-p.y)>.225){blocked++;break;}changed||=p.distanceToSquared(next)>1e-9;p=next;ref=nextRef;moved++;
  }
  const state=yacht.controlState();state.local.copy(p).add(new THREE.Vector3(0,eye,0));yacht.controlPose(state.heading,state.pitch);return changed;
 }
 function applyMover(m,fraction){
  const d=m.object.userData;m.fraction=fraction;
  if(d.operable_slide)m.object.position.z=-(d.closed_y+(d.open_y-d.closed_y)*fraction);
  else{const a=d.operable_door?d.closed_rotation_z:d.closed_angle,b=d.operable_door?d.open_rotation_z:d.open_angle,axis=d.operable_door?'Z':d.rotation_axis,v=axis==='X'?new THREE.Vector3(1,0,0):axis==='Y'?new THREE.Vector3(0,0,-1):new THREE.Vector3(0,1,0);q.setFromAxisAngle(v,(b-a)*(fraction-m.initial));m.object.quaternion.copy(m.original).premultiply(q);}
  m.object.updateWorldMatrix(true,true);
 }
 const norm=s=>s.toLowerCase().replace(/[^a-z0-9]/g,'');
 function nearest(){
  camera.updateMatrixWorld(true);
  ray.setFromCamera(new THREE.Vector2(0,0),camera);ray.far=2.2;
  for(const hit of ray.intersectObject(model,true)){
   for(let o=hit.object;o;o=o.parent){const m=movers.find(m=>m.object===o);if(m)return m;}
   const material=Array.isArray(hit.object.material)?hit.object.material[hit.face.materialIndex]:hit.object.material;if(!material.transparent&&!(material.transmission>.1))return null;
  }return null;
 }
 function toggle(name){const m=name?movers.find(m=>norm(m.object.name)===norm(name)):nearest();if(m)m.target=1-m.target;return m?.object.name||null;}
 function aim(name){const m=movers.find(m=>norm(m.object.name)===norm(name));if(!m)throw Error('Unknown fixture '+name);const target=localPoint(new THREE.Box3().setFromObject(m.object).getCenter(new THREE.Vector3())),state=yacht.controlState(),direction=target.clone().sub(state.local);yacht.controlPose(Math.atan2(direction.x,-direction.z),Math.asin(direction.y/direction.length()));return {nearest:nearest()?.object.name||null,distance:direction.length()};}
 function tick(dt){
  let changed=false;
  for(const m of movers)if(Math.abs(m.fraction-m.target)>.0001){let amount=Math.min(Math.abs(m.target-m.fraction),Math.min(dt,2)*.8);while(amount>.000001){const old=m.fraction,step=Math.min(amount,.025);applyMover(m,old+Math.sign(m.target-old)*step);if(yacht.inside&&capsuleBlocked(foot(),m.meshes)){applyMover(m,old);m.target=old;break;}amount-=step;}changed||=Math.abs(m.fraction-m.target)<.0001;}
  if(changed)requestAppearance(true);
 }
 function update(dt){
  if(input.hit('KeyE')){yacht.leave();input.endFrame();return;}
  if(input.hit('KeyR'))toggle();
  const state=yacht.controlState(),look=input.consumeLook();state.heading+=look.x*.0025;state.pitch=Math.max(-1.35,Math.min(1.35,state.pitch-look.y*.0025));
  const forward=Number(input.down('KeyW')||input.down('ArrowUp'))-Number(input.down('KeyS')||input.down('ArrowDown')),side=Number(input.down('KeyD')||input.down('ArrowRight'))-Number(input.down('KeyA')||input.down('ArrowLeft')),n=Math.hypot(forward,side)||1,speed=(input.down('ShiftLeft')||input.down('ShiftRight')?2.2:1.15)*Math.min(dt,.05);
  yacht.controlPose(state.heading,state.pitch);
  const dx=(Math.sin(state.heading)*forward+Math.cos(state.heading)*side)/n*speed,dz=(-Math.cos(state.heading)*forward+Math.sin(state.heading)*side)/n*speed;
  if(yacht.fly){state.local.x=Math.max(-18,Math.min(17.7,state.local.x+dx));state.local.z=Math.max(-3.8,Math.min(3.8,state.local.z+dz));state.local.y=Math.max(.6,Math.min(16,state.local.y+(Number(input.down('Space'))-Number(input.down('KeyC')))*speed));yacht.controlPose(state.heading,state.pitch);}
  else if(dx||dz)move(dx,dz);
  input.endFrame();
  requestAppearance(false);
 }
 function allOpen(){for(const m of movers)if(m.object.userData.operable_door||m.object.userData.operable_slide){m.target=1;applyMover(m,1);}}
 function walkAudit(){
  allOpen();const results=[];
  for(const route of opened.routes){yacht.go(route.from);const start=opened.destinations[route.from].nearest.nearestPoint,state=yacht.controlState();state.local.set(start.x,start.y+eye,start.z);snap();
   for(const target of route.path||[])move(target.x-foot().x,target.z-foot().z);
   const goal=opened.destinations[route.to].nearest.nearestPoint,error=foot().distanceTo(new THREE.Vector3(goal.x,goal.y,goal.z));results.push({from:route.from,to:route.to,error,passed:error<.2});}
  return results;
 }
 function walkStairAudit(){
  allOpen();const results=[];
  for(const flight of stairs.flights){const start=flight.waypoints[0].nearest,goal=flight.waypoints.at(-1).nearest,state=yacht.controlState();state.local.set(start.x,start.y+eye,start.z);snap();
   for(const part of flight.segments)for(const target of part.path||[])move(target.x-foot().x,target.z-foot().z);
   const error=foot().distanceTo(new THREE.Vector3(goal.x,goal.y,goal.z));results.push({flight:flight.id,error,passed:error<.2});}
  return results;
 }
 let reflectionScene=null,canonicalCamera=null,reflectionPairs=[];
 function syncReflection(){for(const {source,target}of reflectionPairs){target.position.copy(source.position);target.quaternion.copy(source.quaternion);target.scale.copy(source.scale);target.visible=source.visible;}reflectionScene.updateMatrixWorld(true);}
 // The retained renderer owns transmission targets by camera id. Reuse each
 // transformed camera so moving past a mirror cannot allocate a new target
 // every frame.
 const nativeCameras=new WeakMap();
 function toNativeCamera(source){let target=nativeCameras.get(source);if(!target){target=new THREE.PerspectiveCamera();nativeCameras.set(source,target);}target.copy(source);target.position.copy(localPoint(source.position));target.quaternion.copy(root.getWorldQuaternion(new THREE.Quaternion()).invert()).multiply(source.quaternion);target.updateMatrixWorld(true);return target;}
 function requestAppearance(force,probe=true){
  if(!appearance||auditMode)return appearancePromise;
  const p=localPoint((app.camera||camera).position);if(!force&&p.distanceTo(lastLightPosition)<1)return appearancePromise;
  appearanceDirty=true;appearanceProbe ||= probe;if(appearanceBusy)return appearancePromise;appearanceBusy=true;
  appearancePromise=(async()=>{while(appearanceDirty){appearanceDirty=false;const makeProbe=appearanceProbe;appearanceProbe=false;const c=toNativeCamera(app.camera||camera);syncReflection();await appearance.prepareView(c);
   const r=app.engine.glRenderer,tone=r.toneMapping,color=r.outputColorSpace,target=r.getRenderTarget();
   try{if(makeProbe)appearance.prepareReflection(reflectionScene,c,c.position.toArray().map(x=>x.toFixed(2)).join(',')+movers.map(m=>m.fraction.toFixed(2)).join(','));}finally{r.toneMapping=tone;r.outputColorSpace=color;r.setRenderTarget(target);}
   lastLightPosition.copy(c.position);
  }})().catch(e=>{runtime.appearanceError=String(e);console.error(e);}).finally(()=>appearanceBusy=false);return appearancePromise;
 }
 const runtime={tick,update,toggle,aim,move,allOpen,walkAudit,walkStairAudit,get auditMode(){return auditMode},onGo(){snap();requestAppearance(true);},onOutside(){requestAppearance(true);},whenAppearanceReady:()=>appearancePromise,setAuditMode(value){auditMode=value;},report:()=>({source:manifest.native_sha256,asset:manifest.glb_sha256,foot:foot().toArray(),movers:movers.map(m=>({name:m.object.name,fraction:m.fraction,target:m.target})),blocked,moved,auditMode,appearance:appearance?.report(),output:output?.report(),appearanceError:runtime.appearanceError})};
 // Exterior startup uses the native world reflection. Interior movement and
 // fitted-camera inspection refresh the local room reflection as needed.
 runtime.installAppearance=async({initial=false}={})=>{
  if(appearance)return output.report();
  root.updateMatrixWorld(true);appearance=await createParityAppearance(app.engine.glRenderer,base,{directSpecular:false,materialCorrections:true});
  const canonical=model.clone(true),materialMap=new Map(),actual=[],copies=[];model.traverse(o=>actual.push(o));canonical.traverse(o=>copies.push(o));reflectionPairs=actual.map((source,i)=>({source,target:copies[i]}));
  canonical.traverse(o=>{if(!o.isMesh)return;o.raycast=acceleratedRaycast;const materials=Array.isArray(o.material)?o.material:[o.material];const mapped=materials.map(m=>{if(!materialMap.has(m))materialMap.set(m,m.clone());return materialMap.get(m);});o.material=Array.isArray(o.material)?mapped:mapped[0];});
  reflectionScene=new THREE.Scene();reflectionScene.add(canonical);reflectionScene.environment=appearance.environment;reflectionScene.background=appearance.world;
  await appearance.apply(canonical);appearance.bindMaterials([...materialMap].map(([target,source])=>({source,target})),root.rotation.y);appearance.setProbeRoot(model);
  // Mirror renders run sequentially. Share only their temporary transmission
  // camera/target; every Reflector retains its own persistent image target.
  // Keep the async view/probe camera separate from this scratch camera.
  const sharedMirrorCamera=new THREE.PerspectiveCamera();
  appearance.addMirrors(root,(s,c)=>{syncReflection();return {scene:reflectionScene,camera:sharedMirrorCamera.copy(toNativeCamera(c))};});
  output=installMarinaParityOutput(app,root,appearance);runtime.appearance=appearance;runtime.output=output;
  const render=app.render.bind(app);app.render=()=>{appearance.updateMirrors(app.camera||camera);return render();};
  await requestAppearance(true,!initial);
  if(runtime.appearanceError)throw Error(runtime.appearanceError);
  return output.report();
 };
 runtime.photo=async id=>{
  const p=poses.find(p=>p.id===id);if(!p)throw Error('Unknown native camera '+id);
  for(const m of movers){m.target=m.initial;applyMover(m,m.initial);}
  for(const [name,state]of Object.entries(p.states)){const m=movers.find(m=>norm(m.object.name)===norm(name));if(!m)throw Error('Missing native photo fixture '+name);const f=typeof state==='object'?state.fraction:state==='closed'?0:1;m.target=f;applyMover(m,f);}
  app.engine.stop();app.navigation.mode='inspect';app.camera=camera;camera.position.copy(worldPoint(new THREE.Vector3().fromArray(p.position)));camera.quaternion.copy(root.getWorldQuaternion(new THREE.Quaternion())).multiply(new THREE.Quaternion().fromArray(p.quaternion));camera.fov=p.fov;camera.near=.025;camera.far=2000;camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
  if(!appearance)await runtime.installAppearance();else await requestAppearance(true);app.render();return {id,source:manifest.native_sha256};
 };
 runtime.probe=(x,y)=>{
  camera.updateMatrixWorld(true);const ray=new THREE.Raycaster();ray.firstHitOnly=true;ray.setFromCamera(new THREE.Vector2(x,y),camera);
  return ray.intersectObject(model,true).slice(0,4).map(h=>{const m=Array.isArray(h.object.material)?h.object.material[h.face.materialIndex]:h.object.material;let lightSample=null;if(m.lightMap&&h.uv1){const im=m.lightMap.image,i=(Math.min(im.height-1,Math.max(0,Math.floor(h.uv1.y*im.height)))*im.width+Math.min(im.width-1,Math.max(0,Math.floor(h.uv1.x*im.width))))*4;lightSample=Array.from(im.data.slice(i,i+3),v=>im.data instanceof Uint16Array?THREE.DataUtils.fromHalfFloat(v):v);}return {object:h.object.name,material:m.name,nativeMaterial:m.userData.parity_native_material,color:m.color?.toArray(),roughness:m.roughness,metalness:m.metalness,envMapIntensity:m.envMapIntensity,normalScale:m.normalScale?.toArray(),normalMap:!!m.normalMap,lightMap:m.lightMap?.userData.parity_path||null,lightmapChannel:m.lightMap?.channel,lightSample,uv1:h.uv1?.toArray(),frontFacing:h.face.normal.clone().transformDirection(h.object.matrixWorld).dot(ray.ray.direction)<0};});
 };
 return runtime;
}
