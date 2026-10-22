import {Vector3} from 'three';
// Original implementation of room-local box projection and baked diffuse.
export function applyRoomShading(material,room,{baked=false}={}){
 const ceiling=material.name.startsWith('Ivory architectural enamel');
 const before=material.onBeforeCompile;
 material.onBeforeCompile=(shader,renderer)=>{
  before?.(shader,renderer);shader.uniforms.uRoomMin={value:new Vector3(...room.probeBounds.min)};shader.uniforms.uRoomMax={value:new Vector3(...room.probeBounds.max)};shader.uniforms.uRoomCenter={value:new Vector3(...room.probePosition)};
  const probes=room.environments||[room.environment],specs=room.probeSpecs||[{position:room.probePosition}];
  for(const[i,name]of ['A','B','C'].entries()){
   const index=Math.min(i,probes.length-1);shader.uniforms['uRoomProbe'+name]={value:probes[index].texture};shader.uniforms['uRoomPosition'+name]={value:new Vector3(...specs[index].position)};
  }
  shader.vertexShader='varying vec3 vRoomWorld;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nvRoomWorld=(modelMatrix*vec4(transformed,1.0)).xyz;');
  shader.fragmentShader='varying vec3 vRoomWorld;uniform vec3 uRoomMin,uRoomMax,uRoomCenter,uRoomPositionA,uRoomPositionB,uRoomPositionC;uniform sampler2D uRoomProbeA,uRoomProbeB,uRoomProbeC;\n'+shader.fragmentShader;
  // ShaderChunk expansion must happen before changing the probe lookup.
  const chunks=renderer.__roomShaderChunks;
  let env=chunks.envmap_physical_pars_fragment;
  env=`#if defined(USE_ENVMAP) && defined(ENVMAP_TYPE_CUBE_UV)
   vec3 roomProbeDirection(vec3 ray,float roughness,vec3 center){
    vec3 safeRay=mix(vec3(.00001),ray,greaterThan(abs(ray),vec3(.00001)));
    vec3 distances=(mix(uRoomMin,uRoomMax,greaterThan(ray,vec3(0.0)))-vRoomWorld)/safeRay;
    float distance=max(.001,min(distances.x,min(distances.y,distances.z)));
    vec3 localRay=normalize(vRoomWorld+ray*distance-center);
    return envMapRotation*normalize(mix(localRay,ray,roughness*roughness));
   }
   vec4 roomProbeRadiance(vec3 ray,float roughness){
    if(vRoomWorld.z<uRoomPositionB.z){
     float blend=smoothstep(uRoomPositionA.z,uRoomPositionB.z+.0001,vRoomWorld.z);
     return mix(textureCubeUV(uRoomProbeA,roomProbeDirection(ray,roughness,uRoomPositionA),roughness),textureCubeUV(uRoomProbeB,roomProbeDirection(ray,roughness,uRoomPositionB),roughness),blend);
    }
    float blend=smoothstep(uRoomPositionB.z,uRoomPositionC.z+.0001,vRoomWorld.z);
    return mix(textureCubeUV(uRoomProbeB,roomProbeDirection(ray,roughness,uRoomPositionB),roughness),textureCubeUV(uRoomProbeC,roomProbeDirection(ray,roughness,uRoomPositionC),roughness),blend);
   }
  #endif\n`+env.replace('textureCubeUV( envMap, envMapRotation * reflectVec, roughness )','roomProbeRadiance( reflectVec, roughness )');
  shader.fragmentShader=shader.fragmentShader.replace('#include <envmap_physical_pars_fragment>',env);
  if(baked){
   let maps=chunks.lights_fragment_maps;maps=maps.replace('iblIrradiance += getIBLIrradiance( geometryNormal );','// Fixed diffuse transport is supplied by the room atlas.');shader.fragmentShader=shader.fragmentShader.replace('#include <lights_fragment_maps>',maps);
  }
  if(ceiling){
   shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
    // Box-filter the millimetre panel joint across the pixel footprint. Long,
    // subpixel tube triangles produced depth artifacts in the saloon browser pass.
    vec2 roomMetres=vec2((vRoomWorld.z+17.615)/${35.23/36},vRoomWorld.x/${7.47/7.6});
    float panelX=min(min(abs(roomMetres.x-10.15),abs(roomMetres.x-11.95)),min(abs(roomMetres.x-13.8),abs(roomMetres.x-16.25)));
    float panelY=min(abs(roomMetres.y-1.4),abs(roomMetres.y+1.4));
    vec2 d=vec2(panelX,panelY),pixel=max(fwidth(roomMetres),vec2(.00001));
    vec2 coverage=max(vec2(0.),min(d+pixel*.5,vec2(.00045))-max(d-pixel*.5,vec2(-.00045)))/pixel;
    float panelJoint=max(coverage.x,coverage.y)*smoothstep(3.98,3.999,vRoomWorld.y);
    diffuseColor.rgb*=1.-.26*panelJoint;`);
  }
 };
 material.customProgramCacheKey=()=>`luz-room-v3-${baked}-${ceiling}`;
}
export function applyNativeFinish(material){
 const before=material.onBeforeCompile,key=material.customProgramCacheKey.bind(material);
 material.onBeforeCompile=(s,r)=>{before(s,r);s.vertexShader='attribute vec2 aFinish;varying vec2 vFinish;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvFinish=aFinish;');s.fragmentShader='varying vec2 vFinish;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor=clamp(vFinish.x,.04,1.0);').replace('#include <metalnessmap_fragment>','#include <metalnessmap_fragment>\nmetalnessFactor=clamp(vFinish.y,0.0,1.0);');};material.customProgramCacheKey=()=>key()+'-native';
}
