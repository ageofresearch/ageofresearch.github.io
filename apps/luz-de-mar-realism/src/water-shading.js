// Match the existing, licensed coastal panorama in the distance. The fixed
// near-water normals still provide local reflections and receive yacht shadows.
export function blendCoastalWater(material,panorama){
 material.onBeforeCompile=shader=>{
  shader.uniforms.uCoastalPanorama={value:panorama};shader.vertexShader='varying vec3 vCoastalWorld;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nvCoastalWorld=(modelMatrix*vec4(transformed,1.)).xyz;');shader.fragmentShader='varying vec3 vCoastalWorld;uniform sampler2D uCoastalPanorama;\n'+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <tonemapping_fragment>',`#include <tonemapping_fragment>
   float coastBlend=smoothstep(35.,120.,length(vCoastalWorld.xz-cameraPosition.xz));
   vec3 coastRay=normalize(vCoastalWorld-cameraPosition);
   vec2 coastUv=vec2(atan(coastRay.z,coastRay.x)*.159154943+.5,asin(clamp(coastRay.y,-1.,1.))*.318309886+.5);
   gl_FragColor.rgb=mix(gl_FragColor.rgb,texture2D(uCoastalPanorama,coastUv).rgb,coastBlend);`);
 };material.customProgramCacheKey=()=> 'luz-static-coastal-water-v1';
}
