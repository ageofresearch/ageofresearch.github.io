import * as THREE from 'three';
import {RGBELoader} from 'three/addons/loaders/RGBELoader.js';
import {Reflector} from 'three/addons/objects/Reflector.js';

// Keep all calculations linear. Apply the actual Blender OCIO view/look once,
// after reflections and lighting, instead of applying a second display curve.
export async function createParityAppearance(renderer,base,options={}){
 const [config,lutBytes,world,bakes,mirrorData]=await Promise.all([
  fetch(new URL('COLOR-TRANSFORM.json',base)).then(r=>r.json()),
  fetch(new URL('blender-agx-medium-high.f16',base)).then(r=>r.arrayBuffer()),
  new RGBELoader().loadAsync(new URL('native-world.hdr',base).href),
  fetch(new URL('BAKES.json',base)).then(r=>r.json()),fetch(new URL('MIRRORS.json',base)).then(r=>r.json())
 ]);
 const lut=new THREE.Data3DTexture(new Uint16Array(lutBytes),config.size,config.size,config.size);
 lut.format=THREE.RGBFormat;lut.type=THREE.HalfFloatType;lut.minFilter=lut.magFilter=THREE.LinearFilter;lut.unpackAlignment=1;lut.needsUpdate=true;
 // WebGL2 portable 3D textures use RGBA; expand RGB input explicitly.
 const raw=new Uint16Array(lutBytes),rgba=new Uint16Array(config.size**3*4);
 for(let i=0;i<raw.length/3;i++){rgba[i*4]=raw[i*3];rgba[i*4+1]=raw[i*3+1];rgba[i*4+2]=raw[i*3+2];rgba[i*4+3]=0x3c00;}
 lut.image.data=rgba;lut.format=THREE.RGBAFormat;
 // The retained marina OutputPass uses GLSL 1 syntax. A tiled 2D copy provides
 // the same trilinear lookup without changing that renderer's shader language.
 const columns=8,rows=Math.ceil(config.size/columns),lutWidth=columns*config.size,lutHeight=rows*config.size,tiled=new Uint16Array(lutWidth*lutHeight*4);
 for(let b=0;b<config.size;b++)for(let g=0;g<config.size;g++){
  const from=(b*config.size+g)*config.size*4,to=((Math.floor(b/columns)*config.size+g)*lutWidth+(b%columns)*config.size)*4;
  tiled.set(rgba.subarray(from,from+config.size*4),to);
 }
 const lut2D=new THREE.DataTexture(tiled,lutWidth,lutHeight,THREE.RGBAFormat,THREE.HalfFloatType);lut2D.minFilter=lut2D.magFilter=THREE.LinearFilter;lut2D.needsUpdate=true;
 world.mapping=THREE.EquirectangularReflectionMapping;
 const pmrem=new THREE.PMREMGenerator(renderer),environment=pmrem.fromEquirectangular(world).texture;
 const target=new THREE.WebGLRenderTarget(600,600,{type:THREE.HalfFloatType,depthBuffer:true});
 const quadScene=new THREE.Scene(),quadCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
 const uniforms={source:{value:target.texture},colorLut:{value:lut},minEv:{value:config.min_ev},maxEv:{value:config.max_ev},lutSize:{value:config.size}};
 const display=new THREE.ShaderMaterial({uniforms,depthTest:false,depthWrite:false,
  vertexShader:'varying vec2 uv0;void main(){uv0=uv;gl_Position=vec4(position.xy,0.,1.);}',
  fragmentShader:'precision highp sampler3D;uniform sampler2D source;uniform sampler3D colorLut;uniform float minEv,maxEv,lutSize;varying vec2 uv0;void main(){vec3 c=texture2D(source,uv0).rgb;vec3 p=clamp((log2(max(c,vec3(1e-10)))-minEv)/(maxEv-minEv),0.,1.);p=(p*(lutSize-1.)+.5)/lutSize;gl_FragColor=vec4(texture(colorLut,p).rgb,1.);}'
 });
 quadScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),display));
 const maps=new Map(),sources=new Map(),materialPaths=new Map(),backUniforms=new Map(),targetMaterials=new Set(),mirrors=[],materials=new Set(),probeMeshes=[],cameraMeshes=[];let roomEnvironment=null,lastProbeKey=null,lastSceneStats={},coverage={},shaderHookCalls=0;
 const liveDetail=m=>options.materialCorrections&&/^Orange latch/.test(m.userData.parity_native_material||'');
 const finish={bakedNormalStrength:options.bakedNormalStrength??1,dielectricIntensity:options.dielectricIntensity??1};
 const normalSources=new Map(),normalScales=new Map();
 function applyFinish(m){
  m.envMapIntensity=m.metalness<.05&&!m.transparent&&!(m.transmission>0)?finish.dielectricIntensity:1;
  if(m.userData.parity_lightmap){
   if(m.normalMap&&!normalSources.has(m)){normalSources.set(m,m.normalMap);normalScales.set(m,m.normalScale.clone());}
   if(normalSources.has(m)){const map=finish.bakedNormalStrength===0?null:normalSources.get(m);if(m.normalMap!==map){m.normalMap=map;m.needsUpdate=true;}m.normalScale.copy(normalScales.get(m)).multiplyScalar(finish.bakedNormalStrength);}
  }
 }
 function setFinish(values){Object.assign(finish,values);for(const m of materials)applyFinish(m);}
 async function apply(root){
  root.updateMatrixWorld(true);
  root.traverse(o=>{if(o.isMesh){probeMeshes.push(o);cameraMeshes.push(o);for(const m of Array.isArray(o.material)?o.material:[o.material]){
   materials.add(m);
   if(m.userData.parity_lightmap&&!liveDetail(m)){
    const rawPath=m.userData.parity_lightmap,record=Object.values(bakes.batches).find(b=>b.light===rawPath||b.raw_light===rawPath||b.light_aliases?.includes(rawPath)),path=record?.light||rawPath;
    if(!sources.has(path))sources.set(path,{materials:new Set(),bounds:new THREE.Box3(),back:record?.back_light||null});
    if(record?.back_light)backUniforms.set(m,{value:null});
    const entry=sources.get(path);entry.materials.add(m);entry.bounds.union(new THREE.Box3().setFromObject(o));materialPaths.set(m,path);
   }
  }}});
  for(const m of materials){
   m.envMap=environment;m.envMapIntensity=1;m.envMapRotation.set(0,0,0);m.fog=false;
   if(m.userData.parity_lightmap&&!liveDetail(m)){
    m.lightMapIntensity=1;
    m.onBeforeCompile=shader=>{
     // Cycles DIFFUSE direct+indirect without colour contains diffuse outgoing
     // radiance for unit albedo. Preserve web specular highlights separately.
     const token='vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;';
     if(!shader.fragmentShader.includes(token))throw Error('Native lighting shader hook is unavailable');shaderHookCalls++;
     const back=backUniforms.get(m);
     if(back){shader.uniforms.nativeBackLight=back;shader.fragmentShader='uniform sampler2D nativeBackLight;\n'+shader.fragmentShader;}
     const cushion=options.materialCorrections&&/^(Pale (gold|blue)|Gold outdoor)(\.|$)/.test(m.userData.parity_native_material||'');
     const backface=options.materialCorrections&&!/atlas-03/.test(m.userData.parity_lightmap);
     const reverse=back?'if(!gl_FrontFacing){vec3 reverseLight=texture2D(nativeBackLight,vLightMapUv).rgb;nativeDiffuse=max(max(reverseLight.r,reverseLight.g),reverseLight.b)>1e-8?reverseLight*diffuseColor.rgb*(1.0-metalnessFactor):localDiffuse;}\n':backface?'if(!gl_FrontFacing)nativeDiffuse=localDiffuse;\n':'';
     const correction=options.materialCorrections?'\n#ifdef USE_ENVMAP\nvec3 localDiffuse=getIBLIrradiance('+(cushion?'nonPerturbedNormal':'geometryNormal')+')*BRDF_Lambert(diffuseColor.rgb)*(1.0-metalnessFactor);\n'+reverse+(cushion?'nativeDiffuse=mix(localDiffuse,nativeDiffuse,.25);\n':'')+'#endif\n':'';
     shader.fragmentShader=shader.fragmentShader.replace(token,
      '#ifdef USE_LIGHTMAP\n vec3 nativeDiffuse=texture2D(lightMap,vLightMapUv).rgb*diffuseColor.rgb*(1.0-metalnessFactor);\n'+correction+'reflectedLight.directDiffuse=vec3(0.0); reflectedLight.indirectDiffuse=nativeDiffuse;\n#endif\nvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;');
    };
    m.customProgramCacheKey=()=> 'native-diffuse-lightmap-v5-'+backUniforms.has(m)+'-'+!!options.materialCorrections+'-'+(options.materialCorrections&&/^(Pale (gold|blue)|Gold outdoor)(\.|$)/.test(m.userData.parity_native_material||''))+'-'+(options.materialCorrections&&!/atlas-03/.test(m.userData.parity_lightmap));
   }
   if(options.directSpecular===false){
    const before=m.onBeforeCompile.bind(m),key=m.customProgramCacheKey.bind(m);
    m.onBeforeCompile=(shader,...args)=>{before(shader,...args);shader.fragmentShader=shader.fragmentShader.replace('vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;','reflectedLight.directSpecular=vec3(0.0);\nvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;');};
    m.customProgramCacheKey=()=>key()+'-no-direct-specular';
   }
   for(const key of ['map','normalMap','roughnessMap'])if(m[key])m[key].anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
   applyFinish(m);
   m.needsUpdate=true;
  }
 }
 function bindMaterials(pairs,yaw=0){
  for(const {source,target}of pairs){
   target.onBeforeCompile=source.onBeforeCompile;target.customProgramCacheKey=source.customProgramCacheKey;
   target.envMap=environment;target.envMapIntensity=1;target.envMapRotation.set(0,-yaw,0);target.fog=false;target.needsUpdate=true;materials.add(target);targetMaterials.add(target);
   applyFinish(target);
   if(backUniforms.has(source))backUniforms.set(target,backUniforms.get(source));
   for(const entry of sources.values())if(entry.materials.has(source))entry.materials.add(target);
  }
 }
 function setProbeRoot(root){probeMeshes.length=0;root.traverse(o=>{if(o.isMesh)probeMeshes.push(o);});}
 async function prepareView(camera){
  // Prioritize surfaces the camera can actually see. Large shared structure
  // bounds can enclose the camera and otherwise crowd out local-room maps.
  camera.updateMatrixWorld(true);
  const hits=new Map(),ray=new THREE.Raycaster(),backfaces=new Map();ray.firstHitOnly=true;
  for(let y=0;y<11;y++)for(let x=0;x<11;x++){
   ray.setFromCamera(new THREE.Vector2((x/10-.5)*1.9,(y/10-.5)*1.9),camera);ray.far=120;
   for(const hit of ray.intersectObjects(cameraMeshes,false)){
    const m=Array.isArray(hit.object.material)?hit.object.material[hit.face.materialIndex]:hit.object.material,path=materialPaths.get(m);
    if(path){hits.set(path,(hits.get(path)||0)+1);const normal=hit.face.normal.clone().transformDirection(hit.object.matrixWorld);if(normal.dot(ray.ray.direction)>0)backfaces.set(m.userData.parity_native_material,(backfaces.get(m.userData.parity_native_material)||0)+1);}
    if(!m.transparent&&!(m.transmission>.1))break;
   }
  }
  const visible=[...hits].sort((a,b)=>b[1]-a[1]).map(([path])=>path),selected=visible.slice(0,16);
  const nearby=[...sources.entries()].map(([path,s])=>({path,s,score:s.bounds.distanceToPoint(camera.position)+.001*s.bounds.getCenter(new THREE.Vector3()).distanceTo(camera.position)})).sort((a,b)=>a.score-b.score);
  for(const {path}of nearby)if(selected.length<Math.max(8,Math.min(visible.length,16))&&!selected.includes(path))selected.push(path);
  const ranked=selected.map(path=>({path,s:sources.get(path)}));
  const active=new Set(ranked.flatMap(({path,s})=>s.back?[path,s.back]:[path]));
  await Promise.all([...active].map(async path=>{
   if(!maps.has(path)){const light=await new RGBELoader().loadAsync(new URL(path,base).href);light.flipY=false;light.channel=1;light.userData.parity_path=path;maps.set(path,light);}
  }));
  for(const {path,s}of ranked){
   for(const m of s.materials)if(m.lightMap!==maps.get(path)){m.lightMap=maps.get(path);m.needsUpdate=true;}
   for(const m of s.materials)if(backUniforms.has(m))backUniforms.get(m).value=maps.get(s.back);
  }
  for(const [path,texture] of maps)if(!active.has(path)){
   for(const m of sources.get(path)?.materials||[]){m.lightMap=null;m.needsUpdate=true;if(backUniforms.has(m))backUniforms.get(m).value=null;}
   texture.dispose();
   // Renderer uniforms can retain this texture after its materials are culled.
   // dispose() releases GPU storage, but leaves the decoded RAM array intact.
   // Evicted maps are loaded anew; keep CPU data only for the active set.
   texture.image.data=null;
   maps.delete(path);
  }
  coverage={visibleAtlases:[...hits].map(([path,samples])=>({path,samples})),visibleUnmapped:visible.filter(path=>!maps.has(path)),backFacingMaterials:[...backfaces]};
 }
 function addMirrors(scene,renderOverride){
  for(const d of mirrorData){
   const mirror=new Reflector(new THREE.PlaneGeometry(d.width,d.height),{textureWidth:512,textureHeight:512,multisample:0});
   mirror.name='Native reflection · '+d.source;mirror.userData.width=d.width;mirror.userData.height=d.height;mirror.position.fromArray(d.position);mirror.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3().fromArray(d.normal));
   mirror.material.uniforms.color.value.setRGB(.5,.5,.5);mirror.userData.normal=new THREE.Vector3().fromArray(d.normal);mirror.visible=false;scene.add(mirror);mirror.updateMatrixWorld(true);mirrors.push(mirror);
   if(renderOverride){
    const before=mirror.onBeforeRender.bind(mirror);
    mirror.onBeforeRender=(r,s,c,...args)=>{const render=r.render;r.render=function(scene,camera){
     // Redirect only this reflector's scene/camera pair. Environment-map and
     // PMREM conversions also call renderer.render internally; redirecting
     // those calls re-enters the yacht scene before conversion is cached.
     if(scene!==s||camera!==mirror.camera)return render.call(this,scene,camera);
     const mapped=renderOverride(scene,camera);return render.call(this,mapped.scene,mapped.camera);
    };try{return before(r,s,c,...args);}finally{r.render=render;}};
   }
  }
 }
 let cubeTarget=null,cube=null;
 function prepareReflection(scene,camera,key){
  if(key&&key===lastProbeKey)return;
  for(const mirror of mirrors)mirror.visible=false;
  for(const m of materials)m.envMap=environment;
  renderer.toneMapping=THREE.NoToneMapping;renderer.outputColorSpace=THREE.LinearSRGBColorSpace;
  // CubeCamera has six children. Recreating it for each room movement would
  // also leave six camera-keyed transmission targets in the retained renderer.
  if(!cubeTarget){cubeTarget=new THREE.WebGLCubeRenderTarget(128,{type:THREE.HalfFloatType});cube=new THREE.CubeCamera(.035,100,cubeTarget);}
  cube.position.copy(camera.position);cube.update(renderer,scene);
  roomEnvironment=pmrem.fromCubemap(cubeTarget.texture,roomEnvironment);
  for(const m of materials)m.envMap=roomEnvironment.texture;
  lastProbeKey=key;
 }
 function updateMirrors(camera){
  camera.updateMatrixWorld(true);
  const frustum=new THREE.Frustum().setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
  const candidates=[];
  for(const mirror of mirrors){
   mirror.visible=false;const center=mirror.getWorldPosition(new THREE.Vector3()),normal=mirror.userData.normal.clone().transformDirection(mirror.parent.matrixWorld),delta=camera.position.clone().sub(center),distance=delta.lengthSq();
   if(distance<36&&delta.dot(normal)>0&&frustum.intersectsObject(mirror)){
    let unobstructed=false;
    for(const [u,v]of [[0,0],[-.35,-.35],[-.35,.35],[.35,-.35],[.35,.35]]){
     const point=mirror.localToWorld(new THREE.Vector3(u*mirror.userData.width,v*mirror.userData.height,0)),direction=point.clone().sub(camera.position),length=direction.length();
     const ray=new THREE.Raycaster(camera.position,direction.normalize(),.01,length+.01);ray.firstHitOnly=true;
     const blocker=ray.intersectObjects(probeMeshes,false).find(h=>{const m=Array.isArray(h.object.material)?h.object.material[h.face.materialIndex]:h.object.material;return !m.transparent&&!(m.transmission>.1);});
     if(!blocker||blocker.distance>=length-.02){unobstructed=true;break;}
    }
    if(unobstructed){const area=mirror.userData.width*mirror.userData.height*delta.dot(normal)/Math.max(distance**1.5,.001);candidates.push({mirror,area});}
   }
  }
  // A vanity can have a broad mirror plus two narrow side mirrors. Selecting
  // only the nearest plane lets a side panel suppress the main reflection.
  for(const {mirror}of candidates.sort((a,b)=>b.area-a.area).slice(0,3))mirror.visible=true;
 }
 function render(scene,camera){
  updateMirrors(camera);
  const size=renderer.getDrawingBufferSize(new THREE.Vector2());if(target.width!==size.x||target.height!==size.y)target.setSize(size.x,size.y);
  renderer.toneMapping=THREE.NoToneMapping;renderer.outputColorSpace=THREE.LinearSRGBColorSpace;
  renderer.setRenderTarget(target);renderer.render(scene,camera);lastSceneStats={drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles};renderer.setRenderTarget(null);renderer.render(quadScene,quadCamera);
 }
 return {apply,bindMaterials,setProbeRoot,setFinish,render,updateMirrors,addMirrors,prepareView,prepareReflection,environment,world,config,lut,lut2D,report:()=>({finish:{...finish},shaderHookCalls,boundMaterials:targetMaterials.size,boundWithLightmap:[...targetMaterials].filter(m=>m.lightMap).length,residentLightmaps:maps.size,lightmapBytes:[...maps.values()].reduce((n,t)=>n+t.image.width*t.image.height*8,0),...coverage,...lastSceneStats})};
}
