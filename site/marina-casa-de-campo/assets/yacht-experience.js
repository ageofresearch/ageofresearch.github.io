import {GLTFLoader,Vector3,Group,Box3,PointLight,BufferGeometry,Float32BufferAttribute,Mesh,MeshStandardMaterial} from './MarinaApp-Yacht36m.js';
import {MeshoptDecoder} from './yacht-meshopt-decoder.mjs';
import {ROOMS,DECKS,clampRoom,blocksAt} from './yacht-navigation.js';

const ORIGIN=[228.10,0,120.0], YAW=1.876;
const $=id=>document.getElementById(id);
const v=a=>new Vector3().fromArray(a);
export function installYacht(app){
 const yacht={state:'loading',inside:false,room:null,fly:false,error:null,rooms:ROOMS};
 const nav=app.navigation,camera=app.walkCamera,input=nav.input,scene=app.renderer.scene;
 app.engine.canvas.tabIndex=0;
 app.engine.canvas.addEventListener('pointerdown',()=>app.engine.canvas.focus({preventScroll:true}));
 const root=new Group();root.name='Azimut Grande 36M · tour reconstruction';root.position.fromArray(ORIGIN);root.rotation.y=YAW;root.updateMatrixWorld(true);scene.add(root);
 yacht.root=root;
 function rampBox(name,corners,color){
  const indices=[0,2,1,0,3,2,4,5,6,4,6,7,0,1,5,0,5,4,3,7,6,3,6,2,0,4,7,0,7,3,1,2,6,1,6,5];
  const positions=indices.flatMap(i=>corners[i]);
  const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(positions,3));geometry.computeVertexNormals();
  const mesh=new Mesh(geometry,new MeshStandardMaterial({color,roughness:.52,metalness:.15}));mesh.name=name;mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);
 }
 function slopeBox(name,x0,x1,y0,y1,z0,z1,height,color){rampBox(name,[[x0,y0,z0],[x1,y1,z0],[x1,y1,z1],[x0,y0,z1],[x0,y0+height,z0],[x1,y1+height,z0],[x1,y1+height,z1],[x0,y0+height,z1]],color);}
 slopeBox('Boarding gangway · estimated marina installation',-21.3,-16.75,1.72,.76,-.48,.48,.08,0x96734b);
 for(const z of [-.50,.50]){
  slopeBox('Gangway handrail',-21.3,-16.75,2.55,1.59,z-.018,z+.018,.036,0xbcc8c8);
  for(let i=0;i<4;i++){const x=-21.3+i*4.55/3,y=1.8+(x+21.3)/4.55*(-.96);slopeBox('Gangway post',x-.018,x+.018,y,y,z-.018,z+.018,.76,0xbcc8c8);}
 }
 let model,metadata,meshes=[],roomColliders=[],saved=null,local=new Vector3(),heading=0,pitch=0;
 const original={setView:app.setView.bind(app),toggleMovement:app.toggleMovement.bind(app),update:nav.update.bind(nav),report:app.performanceReport.bind(app)};
 const panel=$('yacht-panel'),enter=$('enter-yacht'),deck=$('yacht-deck'),roomSelect=$('yacht-room'),info=$('yacht-info'),hint=$('boarding-hint');
 for(const d of DECKS)deck.add(new Option(d,d));
 function selectDeck(d){roomSelect.replaceChildren();for(const r of ROOMS.filter(r=>r.deck===d))roomSelect.add(new Option(r.label,r.id));}
 selectDeck(DECKS[0]);
 deck.onchange=()=>{selectDeck(deck.value);go(roomSelect.value);};roomSelect.onchange=()=>go(roomSelect.value);
 enter.onclick=()=>yacht.state==='error'?load():yacht.inside?leave():go('salon');
 $('yacht-outside').onclick=()=>outside();
 $('board-at-quay').onclick=()=>go('cockpit');
 $('yacht-room-reset').onclick=()=>go(yacht.room?.id||'salon');
 const lights=Array.from({length:3},()=>{const light=new PointLight(0xffead0,0,16,2);light.castShadow=false;root.add(light);return light;});
 function snapshot(){
  if(saved)return;
  saved={view:app.view,activeCamera:app.camera,position:camera.position.clone(),quaternion:camera.quaternion.clone(),fov:camera.fov,near:camera.near,
   mode:nav.mode,playerPosition:nav.player.position.clone(),yaw:nav.player.yaw,pitch:nav.player.pitch,
   flyPosition:nav.fly.position?.clone(),flyYaw:nav.fly.yaw,flyPitch:nav.fly.pitch,flySpeed:nav.fly.speed};
 }
 function localToWorld(p){return root.localToWorld(p.clone());}
 function release(){input.keys.clear();input.pressed.clear();input.consumeLook();nav.touchKeys.clear();document.exitPointerLock?.();}
 function pose(){
  camera.position.copy(localToWorld(local));
  const direction=new Vector3(Math.sin(heading)*Math.cos(pitch),Math.sin(pitch),-Math.cos(heading)*Math.cos(pitch)).applyQuaternion(root.quaternion);
  camera.lookAt(camera.position.clone().add(direction));
 }
 function visibility(){
  for(const m of meshes){
   const group=m.userData.yacht_collection||m.name;
   const key=Number(group.slice(0,2));
   m.visible=!yacht.inside||yacht.fly?key<30: key<5||yacht.room.group.some(prefix=>group.startsWith(prefix))||[21,22,23,24].includes(key);
   if(yacht.inside&&yacht.fly)m.visible=true;
  }
  for(const light of lights)light.intensity=0;
  if(yacht.inside&&!['cockpit','upper-aft','foredeck','sundeck'].includes(yacht.room.id)){
   const r=yacht.room,[x0,x1,z0,z1]=r.bounds,cy=r.floor+1.8;
   const positions=[[x0+(x1-x0)*.25,cy,(z0+z1)/2],[x0+(x1-x0)*.75,cy,(z0+z1)/2],[(x0+x1)/2,r.floor+1.8,local.z]];
   lights.forEach((l,i)=>{l.position.fromArray(positions[i]);l.intensity=i===2?2:8;l.distance=Math.max(4,x1-x0+2);});
  } else if(!yacht.inside) {
   lights[0].position.set(-5.5,4.7,0);lights[0].intensity=12;
   lights[1].position.set(7.5,4.7,0);lights[1].intensity=8;
   lights[2].position.set(-2,7.3,0);lights[2].intensity=10;
  }
  app.engine.glRenderer.shadowMap.needsUpdate=true;
 }
 function sync(){
  document.documentElement.dataset.yachtInside=String(yacht.inside);
  panel.dataset.inside=String(yacht.inside);enter.textContent=yacht.inside?'Return to quay':'Enter yacht';
  enter.setAttribute('aria-pressed',String(yacht.inside));
  for(const id of ['yacht-destinations','yacht-room-reset'])$(id).hidden=!yacht.inside;
  $('movement').textContent=yacht.inside?(yacht.fly?'Walk · F':'Fly · F'):(nav.mode==='walk'?'Fly · F':'Walk · F');
  info.textContent=yacht.inside?yacht.room.deck+' · '+yacht.room.label:'Azimut Grande 36M · moored at the main quay';
  $('yacht-control-hint').textContent=yacht.inside?'WASD move · drag to look · E return to quay. Use Deck and Room to pass between spaces.':'Use Enter yacht to explore the salon, cabins and decks.';
  for(const button of document.querySelectorAll('[data-view]'))button.setAttribute('aria-pressed',String(button.dataset.view===app.view));
 }
 function go(id){
  if(yacht.state!=='ready'){yacht.pending=id;return yacht.ready;}
  const r=ROOMS.find(r=>r.id===id)||ROOMS[1];snapshot();release();
  yacht.inside=true;yacht.fly=false;yacht.room=r;app.view='yacht-interior';app.camera=camera;nav.mode='walk';
  local.fromArray(r.position);const f=v(r.forward).normalize();heading=Math.atan2(f.x,-f.z);pitch=Math.asin(f.y);
  roomColliders=metadata.colliders.filter(c=>r.group.some(prefix=>c.group.startsWith(prefix)));
  // A conservative box may enclose the source camera; permit leaving it.
  roomColliders=roomColliders.filter(c=>!blocksAt([c],r,local.x,local.z));
  camera.near=.035;camera.fov=62;camera.updateProjectionMatrix();
  deck.value=r.deck;selectDeck(r.deck);roomSelect.value=r.id;
  pose();visibility();sync();app.render();return r;
 }
 function outside(){
  if(yacht.state!=='ready'){yacht.pending='outside';return yacht.ready;}
  snapshot();release();yacht.inside=false;yacht.room=null;yacht.fly=false;app.view='yacht';app.camera=camera;nav.mode='fly';nav.fly.enabled=true;
  const p=localToWorld(new Vector3(32,17,42)),target=localToWorld(new Vector3(0,4.3,0));
  camera.position.copy(p);camera.lookAt(target);camera.near=.08;camera.fov=48;camera.updateProjectionMatrix();
  nav.fly.setPose(camera.position,camera.rotation.y,camera.rotation.x);nav.fly.speed=8;nav.fly.velocity.set(0,0,0);
  visibility();sync();app.render();
 }
 function leave(restore=true){
  release();yacht.inside=false;yacht.room=null;yacht.fly=false;
  if(saved){camera.fov=saved.fov;camera.near=saved.near;camera.updateProjectionMatrix();nav.fly.speed=saved.flySpeed;}
  if(restore&&saved){
   const s=saved;app.view=s.view;app.camera=s.activeCamera;camera.position.copy(s.position);camera.quaternion.copy(s.quaternion);camera.fov=s.fov;camera.near=s.near;camera.updateProjectionMatrix();
   nav.player.position.copy(s.playerPosition);nav.player.velocity.set(0,0,0);nav.player.yaw=s.yaw;nav.player.pitch=s.pitch;nav.player._camY=null;
   nav.mode=s.mode;nav.fly.setPose(camera.position,camera.rotation.y,camera.rotation.x);nav.fly.speed=s.flySpeed;nav.fly.velocity.set(0,0,0);
  }
  saved=null;visibility();sync();app.render();
 }
 app.setView=function(view){
  if(view==='yacht')return outside();
  if(view==='salon'||ROOMS.some(r=>r.id===view))return go(view);
  if(yacht.inside||saved)leave(false);
  original.setView(view);sync();
 };
 app.toggleMovement=function(){
  if(!yacht.inside)return original.toggleMovement();
  yacht.fly=!yacht.fly;
  if(!yacht.fly)go(yacht.room.id);else{visibility();sync();}
 };
 nav.update=function(dt){
  if(!yacht.inside){
   const distance=camera.position.distanceTo(localToWorld(new Vector3(-21,3,0)));
   hint.hidden=yacht.state!=='ready'||distance>10||app.view==='yacht';
   if(input.hit('KeyE')&&distance<10){go('cockpit');input.endFrame();return;}
   return original.update(dt);
  }
  hint.hidden=true;
  if(input.hit('KeyE')){leave();input.endFrame();return;}
  const look=input.consumeLook();heading+=look.x*.0025;pitch=Math.max(-1.35,Math.min(1.35,pitch-look.y*.0025));
  let forward=Number(input.down('KeyW')||input.down('ArrowUp'))-Number(input.down('KeyS')||input.down('ArrowDown'));
  let side=Number(input.down('KeyD')||input.down('ArrowRight'))-Number(input.down('KeyA')||input.down('ArrowLeft'));
  const n=Math.hypot(forward,side)||1,speed=(input.down('ShiftLeft')||input.down('ShiftRight')?2.2:1.15)*Math.min(dt,.05);
  const dx=(Math.sin(heading)*forward+Math.cos(heading)*side)/n*speed,dz=(-Math.cos(heading)*forward+Math.sin(heading)*side)/n*speed;
  if(yacht.fly){local.x=Math.max(-18,Math.min(17.7,local.x+dx));local.z=Math.max(-3.8,Math.min(3.8,local.z+dz));local.y=Math.max(.6,Math.min(16,local.y+(Number(input.down('Space'))-Number(input.down('KeyC')))*speed));}
  else{
   const r=yacht.room,[x,z]=clampRoom(r,local.x+dx,local.z+dz);
   if(!blocksAt(roomColliders,r,x,local.z))local.x=x;
   if(!blocksAt(roomColliders,r,local.x,z))local.z=z;
  }
  pose();input.endFrame();
 };
 app.performanceReport=function(){return {...original.report(),yacht:yacht.report()};};
 yacht.go=go;yacht.outside=outside;yacht.leave=leave;
 yacht.report=()=>({state:yacht.state,inside:yacht.inside,room:yacht.room?.id||null,mode:yacht.fly?'fly':'walk',localPosition:local.toArray(),worldOrigin:ORIGIN,yaw:YAW,source:'Azimut_Grande_36M.blend',sourceTriangles:metadata?.source_triangles,meshBatches:meshes.length,accuracy:metadata?.accuracy,error:yacht.error});
 async function load(){
  yacht.state='loading';yacht.error=null;enter.disabled=true;enter.textContent='Loading yacht…';info.textContent='Preparing the yacht and its interiors…';
  try{
   const base=new URL('../marina/yacht/',import.meta.url);
   const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
   const [gltf,data]=await Promise.all([loader.loadAsync(new URL('grande-36m.glb',base).href),fetch(new URL('asset.json',base)).then(r=>{if(!r.ok)throw Error('Yacht metadata HTTP '+r.status);return r.json();})]);
   metadata=data;model=gltf.scene;model.name='Grande 36M · native geometry';root.add(model);root.updateMatrixWorld(true);
   model.traverse(o=>{if(!o.isMesh)return;meshes.push(o);const key=Number((o.userData.yacht_collection||o.name).slice(0,2));o.castShadow=key<5||[21,22,23,24].includes(key);o.receiveShadow=true;
    for(const m of Array.isArray(o.material)?o.material:[o.material]){m.envMap=app.renderer.sky;m.envMapIntensity=.45;m.envMapRotation.copy(scene.backgroundRotation);if(m.transparent){m.depthWrite=false;m.side=2;}
     for(const name of ['map','normalMap','roughnessMap'])if(m[name])m[name].anisotropy=Math.min(8,app.engine.glRenderer.capabilities.getMaxAnisotropy());}
   });
   yacht.modelBounds=new Box3().setFromObject(model).getSize(new Vector3()).toArray();
   visibility();await app.renderer.prepare(camera);yacht.state='ready';enter.disabled=false;sync();document.documentElement.dataset.yachtReady='true';
   const requested=new URLSearchParams(location.search).get('view');const dest=yacht.pending||(requested==='yacht'?'outside':ROOMS.some(r=>r.id===requested)?requested:null);
   if(dest==='outside')outside();else if(dest)go(dest);
   app.render();return yacht;
  }catch(error){yacht.state='error';yacht.error=error.message;enter.disabled=false;enter.textContent='Retry yacht';info.textContent='The marina is ready; the yacht could not load. '+error.message;console.error(error);document.documentElement.dataset.yachtReady='failed';return yacht;}
 }
 yacht.ready=load();return yacht;
}
