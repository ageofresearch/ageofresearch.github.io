import {Group,Mesh,BufferGeometry,BufferAttribute,MeshPhysicalMaterial,MeshDepthMaterial,RGBADepthPacking,DoubleSide,DataTexture,RGBAFormat,FloatType,NearestFilter,Matrix4,Quaternion,Vector3,RectAreaLight,SpotLight,Color} from 'three';
import {RectAreaLightUniformsLib} from 'three/addons/lights/RectAreaLightUniformsLib.js';
import {applyRoomShading,applyNativeFinish} from './shading.js';
import {SX,SY,inRegister,sourcePoint} from './navigation.js';
import {assetURL} from './asset-version.js';
// Three.js r180 recreates LTC textures on every init; keep one renderer-wide set.
let areaLightUniformsReady=false;
export async function loadNative(kind,folder,signal){
 const response=await fetch(assetURL(`./assets/mechanics/${folder}/${kind}.json`),{signal});if(!response.ok)throw Error('No se pudo cargar la documentación de maquinaria');const meta=await response.json();
 if(meta.binary!==kind+'.bin.gz'||meta.byteLength>160*1024*1024)throw Error('Formato de maquinaria incompatible');
 const r=await fetch(assetURL(`./assets/mechanics/${folder}/${meta.binary}`),{signal});if(!r.ok)throw Error('No se pudo cargar la maquinaria');const raw=await new Response(r.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();signal?.throwIfAborted();if(raw.byteLength!==meta.byteLength)throw Error('Geometría incompleta');
 const hash=await crypto.subtle.digest('SHA-256',raw);if([...new Uint8Array(hash)].map(x=>x.toString(16).padStart(2,'0')).join('')!==meta.sha256)throw Error('La maquinaria no coincide con su registro');const arrays={};
 for(const[k,v]of Object.entries(meta.views)){if(!['u32','f32'].includes(v.type)||!Number.isSafeInteger(v.offset)||!Number.isSafeInteger(v.count)||v.count<0||v.offset%4||v.offset<0||v.offset+v.count*4>raw.byteLength)throw Error('Atributos incompatibles');arrays[k]=new(v.type==='u32'?Uint32Array:Float32Array)(raw,v.offset,v.count);}
 for(const[k,size]of[['position',3],['normal',3],['color',3],['surface',2]])if(arrays[k]?.length!==meta.vertices*size)throw Error('Atributo de maquinaria incompleto');
 if(arrays.indices?.length!==meta.triangles*3||arrays.indices.some(i=>i>=meta.vertices))throw Error('Índice de maquinaria incompatible');
 if(kind==='inspection'&&folder==='mtu-r03'&&(meta.animation?.frames!==240||meta.animation.fps!==30||meta.animation.duration!==8||meta.animation.channels>2048||arrays.motion?.length!==meta.vertices||arrays.morph?.length!==meta.vertices*3||arrays.morphNormal?.length!==meta.vertices*3||arrays.motion.some(i=>i<0||i>=meta.animation.channels||!Number.isInteger(i))))throw Error('Animación incompatible');
 return{meta,arrays,attributes:null};
}
export function nativeGeometry(asset,predicate=null){
 const a=asset.arrays,g=new BufferGeometry();if(!asset.attributes){asset.attributes={};for(const[k,name,size]of[['position','position',3],['normal','normal',3],['color','color',3],['surface','aFinish',2],['motion','aMotion',1],['morph','aMorph',3],['morphNormal','aMorphNormal',3]])if(a[k])asset.attributes[name]=new BufferAttribute(a[k],size);}
 for(const[k,v]of Object.entries(asset.attributes))g.setAttribute(k,v);
 let ids=a.indices;if(predicate){const selected=asset.meta.parts.filter(predicate),length=selected.reduce((n,p)=>n+p.count,0);ids=new Uint32Array(length);let offset=0;for(const p of selected){ids.set(a.indices.subarray(p.start,p.start+p.count),offset);offset+=p.count;}}
 g.setIndex(new BufferAttribute(ids,1));g.computeBoundingBox();g.computeBoundingSphere();return g;
}
export function samplePose(asset,time,out=new Float32Array(asset.meta.animation.channels*20)){
 const{channels,frames,fps}=asset.meta.animation,d=asset.arrays.poses,f=((time%8+8)%8)*fps,a=Math.floor(f)%frames,b=(a+1)%frames,t=f-Math.floor(f),p=new Vector3(),s=new Vector3(),q=new Quaternion(),qb=new Quaternion(),m=new Matrix4();
 for(let ch=0;ch<channels;ch++){const i=(a*channels+ch)*12,j=(b*channels+ch)*12,mix=k=>d[i+k]+(d[j+k]-d[i+k])*t;p.set(mix(0),mix(1),mix(2));s.set(mix(8),mix(9),mix(10));q.fromArray(d,i+4);qb.fromArray(d,j+4);q.slerp(qb,t);m.compose(p,q,s).toArray(out,ch*20);out[ch*20+16]=mix(11);}return out;
}
export function placement(meta,side){return new Matrix4().set(0,1,0,(side==='port'?1:-1)*meta.y*SY,0,0,1,meta.z-2.01,1,0,0,meta.x*SX-17.615,0,0,0,1);}
export function mtuDeformationGLSL(channels){return `attribute float aMotion;attribute vec3 aMorph;attribute vec3 aMorphNormal;uniform sampler2D uMtuPose;
 vec4 poseColumn(float col){return texture2D(uMtuPose,vec2((col+.5)/5.,(aMotion+.5)/${channels.toFixed(1)}));}
 mat4 nativePose(){return mat4(poseColumn(0.),poseColumn(1.),poseColumn(2.),poseColumn(3.));}
 vec3 nativePosition(){return(nativePose()*vec4(position+aMorph*poseColumn(4.).x,1.)).xyz;}
 vec3 nativeNormal(){mat3 p=mat3(nativePose());vec3 scales=vec3(dot(p[0],p[0]),dot(p[1],p[1]),dot(p[2],p[2]));return normalize(p*((normal+aMorphNormal*poseColumn(4.).x)/max(scales,vec3(.0000001))));}\n`;}
export function motionShader(material,texture,channels){
 const before=material.onBeforeCompile,key=material.customProgramCacheKey.bind(material);
 material.onBeforeCompile=(s,r)=>{before?.(s,r);s.uniforms.uMtuPose={value:texture};s.vertexShader=mtuDeformationGLSL(channels)+s.vertexShader;
  s.vertexShader=s.vertexShader.replace('#include <beginnormal_vertex>','#include <beginnormal_vertex>\nobjectNormal=nativeNormal();');
  s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ntransformed=nativePosition();');
 };material.customProgramCacheKey=()=>key()+'-mtu-palette-v1';
}
export class Machinery{
 constructor(app,room,manifest,signal){this.app=app;this.room=room;this.manifest=manifest;this.resources=[];this.roots={mtu:{},filter:{}};this.exteriors={};this.lids={};this.signal=new AbortController();this.externalSignal=signal;this.onAbort=()=>this.signal.abort();signal?.addEventListener('abort',this.onAbort,{once:true});if(signal?.aborted)this.signal.abort();this.disposed=false;this.active=false;this.request=0;this.mtu={selected:'port',cutaway:false,requestedCut:false,playing:false,time:0,loading:false,error:''};this.filters={selected:'port',accessOpen:false,progress:0,target:0,moving:false,dirty:false,loading:false,error:''};}
 material(){const m=new MeshPhysicalMaterial({vertexColors:true,roughness:.35,metalness:0,clearcoat:.13,clearcoatRoughness:.25,side:DoubleSide,envMap:this.room.environment.texture,envMapIntensity:.6});applyRoomShading(m,this.room);applyNativeFinish(m);this.resources.push(m);return m;}
 mesh(g,m){const o=new Mesh(g,m);o.castShadow=true;o.receiveShadow=true;return o;}
 root(type,side){const g=new Group();g.matrixAutoUpdate=false;g.matrix.copy(placement(this.manifest[type==='mtu'?'mtu':'filters'],side));this.room.root.add(g);this.roots[type][side]=g;return g;}
 async load(){
  const[mtu,filters]=await Promise.all([loadNative('exterior','mtu-r03',this.signal.signal),loadNative('exterior','sea-strainers',this.signal.signal)]);if(this.disposed)return;
  const mg=nativeGeometry(mtu),fg=nativeGeometry(filters,p=>p.role==='fixed'),lg=nativeGeometry(filters,p=>p.role==='lid'),mm=this.material(),fm=this.material();this.resources.push(mg,fg,lg);
  for(const side of['port','starboard']){const root=this.root('mtu',side),m=this.mesh(mg,mm);root.add(m);this.exteriors[side]=m;const f=this.root('filter',side);f.add(this.mesh(fg,fm));const lid=this.lids[side]=this.mesh(lg,fm);f.add(lid);}this.exteriorAssets={mtu,filters};this.configureDoor();this.configureLights();this.app.invalidate();
 }
 configureDoor(){const door=this.room.meta.door;if(!door)return;const pivot=this.doorPivot=new Group();pivot.position.copy(sourcePoint(door.hinge));this.room.root.add(pivot);for(const o of this.room.dynamic.door||[]){pivot.add(o);o.position.sub(pivot.position);}this.doorOpen=false;}
 configureLights(){if(!areaLightUniformsReady){RectAreaLightUniformsLib.init();areaLightUniformsReady=true;}const specs=this.room.meta.workLights,group=this.lights=new Group();group.name='Luz neutra de trabajo';const color=new Color(...specs.color);for(const s of specs.rectangles){const l=new RectAreaLight(color,s.intensity,s.width,s.height);l.position.set(...s.position);l.rotation.x=-Math.PI/2;group.add(l);}for(const s of specs.spots){const l=new SpotLight(color,s.intensity,8,.95,.85,2);l.position.copy(sourcePoint(s.sourcePosition));l.target.position.copy(sourcePoint(s.sourceTarget));l.castShadow=true;l.shadow.mapSize.setScalar(1024);l.shadow.camera.near=.08;l.shadow.camera.far=8;l.shadow.bias=-.00004;l.shadow.normalBias=.003;group.add(l,l.target);}this.room.root.add(group);}
 toggleDoor(){if(!this.active||!this.nav)return false;const d=this.room.meta.door,dist=Math.hypot((this.nav.position[0]-d.center[0])*SX,(this.nav.position[1]-d.center[1])*SY);if(dist>d.reach)return false;const inner=this.nav.isolated.get('machinery');if(this.doorOpen){inner.doorOpen=false;if(!inner.safe(...this.nav.position)){inner.doorOpen=true;this.app.inspectionNotice?.('Apártate del hueco para cerrar la puerta.');return false;}}else inner.doorOpen=true;this.doorOpen=!this.doorOpen;this.doorPivot.rotation.y=this.doorOpen?d.angle:0;this.sync();return true;}
 setActive(value,nav){this.active=value;if(nav)this.nav=nav;if(!value){this.pause();this.mtu.cutaway=this.mtu.requestedCut=false;this.resetFilters();this.doorOpen=false;if(this.doorPivot)this.doorPivot.rotation.y=0;const inner=this.nav?.isolated.get('machinery');if(inner)inner.doorOpen=false;}this.installed?.setActive(value);this.sync();}
 async loadMtu(){
  if(this.mtuAsset)return true;if(this.mtuPromise)return this.mtuController?.signal.aborted?this.mtuPromise.then(()=>this.loadMtu()):this.mtuPromise;this.mtu.loading=true;this.mtu.error='';this.app.syncUI();this.mtuController=new AbortController();const onAbort=()=>this.mtuController?.abort();this.signal.signal.addEventListener('abort',onAbort,{once:true});
  this.mtuPromise=(async()=>{try{const a=await loadNative('inspection','mtu-r03',this.mtuController.signal);if(this.disposed)return false;const channels=a.meta.animation.channels;if(channels>2048||a.arrays.poses.length!==240*channels*12)throw Error('Animación incompatible');this.mtuAsset=a;this.pose=samplePose(a,this.mtu.time);this.poseTexture=new DataTexture(this.pose,5,channels,RGBAFormat,FloatType);this.poseTexture.magFilter=this.poseTexture.minFilter=NearestFilter;this.poseTexture.generateMipmaps=false;this.poseTexture.needsUpdate=true;
   const g=nativeGeometry(a),m=this.material();motionShader(m,this.poseTexture,channels);const mesh=this.engine=this.mesh(g,m);mesh.frustumCulled=false;const depth=new MeshDepthMaterial({depthPacking:RGBADepthPacking,side:DoubleSide});motionShader(depth,this.poseTexture,channels);mesh.customDepthMaterial=depth;this.resources.push(g,depth,this.poseTexture);this.roots.mtu[this.mtu.selected].add(mesh);this.sync();return true;
  }catch(e){if(!this.disposed&&e.name!=='AbortError')this.mtu.error=e.message;return false;}finally{this.signal.signal.removeEventListener('abort',onAbort);this.mtu.loading=false;this.mtuPromise=null;if(!this.disposed){this.app.syncUI();this.app.invalidate();}}})();return this.mtuPromise;
 }
 async cut(value){this.mtu.requestedCut=!!value;this.mtu.playing=false;if(!value){this.request++;this.mtuController?.abort();this.mtu.cutaway=false;this.sync();return true;}if(!this.active){this.mtu.requestedCut=false;return false;}this.resetFilters();const req=++this.request;if(!await this.loadMtu()||this.disposed||req!==this.request||!this.active){if(req===this.request)this.mtu.requestedCut=false;this.app.syncUI();return false;}this.mtu.cutaway=true;this.sync();return true;}
 async play(){if(this.mtu.playing){this.mtu.playing=false;this.app.syncUI();return;}if(!await this.cut(true)||this.disposed||document.hidden)return;this.mtu.playing=true;this.app.syncUI();this.app.invalidate(true);}
 setTime(time){this.mtu.time=Math.max(0,Math.min(8,Number(time)||0));this.mtu.playing=false;if(this.pose){samplePose(this.mtuAsset,this.mtu.time,this.pose);this.poseTexture.needsUpdate=true;}this.sync();}
 selectMotor(side){if(!['port','starboard'].includes(side))return;this.mtu.selected=side;this.sync();}
 async loadFilters(){
  if(this.filterAsset)return true;if(this.filterPromise)return this.filterController?.signal.aborted?this.filterPromise.then(()=>this.loadFilters()):this.filterPromise;this.filters.loading=true;this.filters.error='';this.app.syncUI();this.filterController=new AbortController();const onAbort=()=>this.filterController?.abort();this.signal.signal.addEventListener('abort',onAbort,{once:true});
  this.filterPromise=(async()=>{try{const[a,response]=await Promise.all([loadNative('inspection','sea-strainers',this.filterController.signal),fetch(assetURL('./assets/mechanics/sea-strainers/motion.json'),{signal:this.filterController.signal})]);if(!response.ok)throw Error('No se pudo cargar el desmontaje');const motion=await response.json();if(motion.samples?.length!==121||motion.samples.some(p=>['lid','basket'].some(k=>p[k]?.length!==3||p[k].some(v=>!Number.isFinite(v)))))throw Error('Desmontaje incompatible');if(this.disposed)return false;this.filterAsset=a;this.filterMotion=motion;const clean=nativeGeometry(a,p=>p.role==='basket'&&p.variant==='clean'),dirty=nativeGeometry(a,p=>p.role==='basket'&&p.variant==='dirty'),m=this.material();this.resources.push(clean,dirty);this.basket=this.mesh(clean,m);this.fouling=this.mesh(dirty,m);this.sync();return true;
  }catch(e){if(!this.disposed&&e.name!=='AbortError')this.filters.error=e.message;return false;}finally{this.signal.signal.removeEventListener('abort',onAbort);this.filters.loading=false;this.filterPromise=null;if(!this.disposed){this.app.syncUI();this.app.invalidate();}}})();return this.filterPromise;
 }
 access(value){const f=this.filters;if(value&&(!this.active||!this.nav||inRegister(...this.nav.position))){this.app.inspectionNotice?.('Apártate del registro central antes de abrirlo.');return false;}f.accessOpen=!!value;if(value){this.mtu.playing=false;this.mtu.cutaway=this.mtu.requestedCut=false;this.mtuController?.abort();}else{this.request++;this.filterController?.abort();f.progress=f.target=0;f.moving=false;}const inner=this.nav?.isolated.get('machinery');if(inner)inner.openRegister=f.accessOpen;this.sync();return true;}
 async extract(target){const req=++this.request;if(!this.filters.accessOpen||!await this.loadFilters()||this.disposed||req!==this.request||document.hidden)return;this.filters.target=target;this.filters.moving=Math.abs(target-this.filters.progress)>1e-7;this.app.syncUI();this.app.invalidate(true);}
 progress(value){if(!this.filterMotion||!this.filters.accessOpen)return;this.request++;this.filters.progress=this.filters.target=Math.max(0,Math.min(1,Number(value)||0));this.filters.moving=false;this.sync();}
 resetFilters(){this.filters.dirty=false;this.access(false);}
 selectFilter(side){if(!['port','starboard'].includes(side))return;this.request++;this.filters.selected=side;this.filters.progress=this.filters.target=0;this.filters.moving=false;this.sync();}
 sync(){
  const m=this.mtu,f=this.filters;
  for(const side of['port','starboard'])if(this.exteriors[side])this.exteriors[side].visible=!(m.cutaway&&this.engine&&side===m.selected);
  if(this.engine){const root=this.roots.mtu[m.selected];if(this.engine.parent!==root)root.add(this.engine);this.engine.visible=this.active&&m.cutaway;}
  for(const obj of this.room.dynamic.register||[])obj.visible=!f.accessOpen;
  const frame=f.progress*120,a=Math.floor(frame),b=Math.min(120,a+1),t=frame-a,pose=role=>this.filterMotion?this.filterMotion.samples[a][role].map((v,k)=>v+(this.filterMotion.samples[b][role][k]-v)*t):[0,0,0];
  for(const side of['port','starboard'])if(this.lids[side])this.lids[side].position.fromArray(f.accessOpen&&side===f.selected?pose('lid'):[0,0,0]);
  for(const [obj,dirty]of[[this.basket,false],[this.fouling,true]])if(obj){const root=this.roots.filter[f.selected];if(obj.parent!==root)root.add(obj);obj.position.fromArray(pose('basket'));obj.visible=f.accessOpen&&f.progress>0&&(!dirty||f.dirty);}
  this.installed?.sync();if(!this.disposed){this.app.syncUI();this.app.invalidate(false,true);}
 }
 update(dt){if(this.disposed||!this.active||document.hidden)return false;this.installed?.update();let moving=false;if(this.mtu.playing&&this.pose){this.mtu.time=(this.mtu.time+Math.min(.1,dt))%8;samplePose(this.mtuAsset,this.mtu.time,this.pose);this.poseTexture.needsUpdate=true;moving=true;}const f=this.filters;if(f.moving){const d=f.target-f.progress;f.progress+=Math.sign(d)*Math.min(Math.abs(d),Math.min(.1,dt)/4);f.moving=Math.abs(f.target-f.progress)>1e-7;moving=true;}if(moving)this.sync();return moving;}
 pause(){this.request++;this.mtuController?.abort();this.filterController?.abort();this.mtu.playing=false;this.mtu.requestedCut=this.mtu.cutaway;this.filters.moving=false;this.filters.target=this.filters.progress;this.app.syncUI();}
 reset(){this.pause();this.mtu.selected='port';this.mtu.cutaway=this.mtu.requestedCut=false;this.setTime(0);this.filters.selected='port';this.resetFilters();this.doorOpen=false;if(this.doorPivot)this.doorPivot.rotation.y=0;const nav=this.nav?.isolated.get('machinery');if(nav)nav.doorOpen=false;this.sync();}
 get stats(){return{active:this.active,exteriorTrianglesPerEngine:this.exteriorAssets?.mtu.meta.triangles||0,installed:this.installed?.stats||null,inspectionLoaded:!!this.mtuAsset,filterInspectionLoaded:!!this.filterAsset,processingMechanics:this.active&&this.mtu.cutaway&&this.mtu.playing,poseTextureBytes:this.pose?.byteLength||0,motor:{...this.mtu},filters:{...this.filters},doorOpen:!!this.doorOpen};}
 dispose(){if(this.disposed)return;this.pause();this.resetFilters();this.disposed=true;this.installed?.dispose();this.signal.abort();this.externalSignal?.removeEventListener('abort',this.onAbort);for(const roots of Object.values(this.roots))for(const root of Object.values(roots))root.removeFromParent();this.lights?.traverse(o=>{if(o.isSpotLight)o.shadow.dispose();});this.lights?.removeFromParent();for(const r of this.resources)r.dispose();this.resources=[];this.mtuAsset=this.filterAsset=this.exteriorAssets=null;}
}
