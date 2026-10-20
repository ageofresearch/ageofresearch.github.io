import * as THREE from 'three';

// Add a yacht selection pass before the existing OutputPass. Keep its original
// ACES/sRGB code byte-for-byte for all non-yacht pixels, including the ball.
export function installMarinaParityOutput(app,yachtRoot,appearance){
 const composer=app.renderer.composer,output=composer.passes.find(p=>p.isOutputPass),renderer=app.engine.glRenderer;
 if(!output||!output.material.fragmentShader.includes('// color space'))throw Error('Unsupported marina output pipeline');
 const sceneTarget=composer.renderTarget2;
 sceneTarget.depthTexture=new THREE.DepthTexture(sceneTarget.width,sceneTarget.height,THREE.UnsignedIntType);sceneTarget.dispose();
 const maskTarget=new THREE.WebGLRenderTarget(app.engine.width,app.engine.height,{format:THREE.RedFormat,internalFormat:'R8',depthBuffer:true});
 // The retained marina uses an 8-bit scene buffer. Its clipped highlights are
 // part of the existing presentation, so keep that buffer and output intact.
 // A separate HDR scene sample supplies only the selected yacht pixels.
 const hdrTarget=new THREE.WebGLRenderTarget(app.engine.width,app.engine.height,{type:THREE.HalfFloatType,depthBuffer:true,samples:sceneTarget.samples});
 const maskScene=new THREE.Scene(),proxies=[];
 const mirrors=[];
 const yachtBounds=new THREE.Box3().setFromObject(yachtRoot).expandByScalar(1),frustum=new THREE.Frustum();let hdrVisible=false;
 const material=new THREE.ShaderMaterial({side:THREE.DoubleSide,depthTest:true,depthWrite:true,uniforms:{sceneDepth:{value:sceneTarget.depthTexture},resolution:{value:new THREE.Vector2(app.engine.width,app.engine.height)}},
  vertexShader:'void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
  fragmentShader:'uniform sampler2D sceneDepth;uniform vec2 resolution;void main(){float z=texture2D(sceneDepth,gl_FragCoord.xy/resolution).x;if(gl_FragCoord.z>z+0.0000005)discard;gl_FragColor=vec4(1.0);}'
 });
 const maskMaterials=new Map([[THREE.DoubleSide,material]]);
 yachtRoot.traverse(obj=>{
  if(obj.isReflector)mirrors.push(obj);
  if(!obj.isMesh)return;const m=Array.isArray(obj.material)?obj.material[0]:obj.material;
  if(m.opacity<.001)return;
  // Glass is part of the yacht: it can write scene depth and otherwise prevent
  // the opaque yacht behind it from receiving its display transform. Match each
  // source material's visible side, including thin surfaces viewed from below.
  if(!maskMaterials.has(m.side))maskMaterials.set(m.side,new THREE.ShaderMaterial({side:m.side,depthTest:true,depthWrite:true,uniforms:material.uniforms,vertexShader:material.vertexShader,fragmentShader:material.fragmentShader}));
  const proxy=new THREE.Mesh(obj.geometry,maskMaterials.get(m.side));proxy.matrixAutoUpdate=false;proxy.frustumCulled=obj.frustumCulled;maskScene.add(proxy);proxies.push({source:obj,proxy});
 });
 const pass={enabled:true,needsSwap:false,clear:false,renderToScreen:false,
  setSize(w,h){maskTarget.setSize(w,h);hdrTarget.setSize(w,h);material.uniforms.resolution.value.set(w,h);},
  render(r){
   const camera=app.camera||app.walkCamera;camera.updateMatrixWorld(true);frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));hdrVisible=frustum.intersectsBox(yachtBounds);
   if(!hdrVisible){const target=r.getRenderTarget(),color=r.getClearColor(new THREE.Color()).clone(),alpha=r.getClearAlpha();r.setRenderTarget(maskTarget);r.setClearColor(0,1);r.clear();r.setClearColor(color,alpha);r.setRenderTarget(target);return;}
   yachtRoot.updateWorldMatrix(true,true);
   for(const {source,proxy}of proxies){let visible=true;for(let o=source;o;o=o.parent)visible&&=o.visible;proxy.visible=visible;proxy.matrix.copy(source.matrixWorld);}
   const target=r.getRenderTarget(),color=r.getClearColor(new THREE.Color()).clone(),alpha=r.getClearAlpha();
   const autoShadow=r.shadowMap.autoUpdate,shadowUpdate=r.shadowMap.needsUpdate,tone=r.toneMapping,colorSpace=r.outputColorSpace;
   const callbacks=mirrors.map(m=>m.onBeforeRender);
   try{
    // The ordinary scene pass has already refreshed shadows and mirrors for
    // this camera. Reuse those textures in the HDR pass.
    r.shadowMap.autoUpdate=false;r.shadowMap.needsUpdate=false;
    mirrors.forEach(m=>m.onBeforeRender=()=>{});
    r.toneMapping=THREE.NoToneMapping;r.outputColorSpace=THREE.LinearSRGBColorSpace;
    r.setRenderTarget(hdrTarget);r.clear();r.render(app.renderer.scene,app.camera||app.walkCamera);
    r.setRenderTarget(maskTarget);r.setClearColor(0,1);r.clear();r.render(maskScene,app.camera||app.walkCamera);
   }finally{
    mirrors.forEach((m,i)=>m.onBeforeRender=callbacks[i]);
    r.shadowMap.autoUpdate=autoShadow;r.shadowMap.needsUpdate=shadowUpdate;r.toneMapping=tone;r.outputColorSpace=colorSpace;
    r.setClearColor(color,alpha);r.setRenderTarget(target);
   }
  },dispose(){maskTarget.dispose();hdrTarget.dispose();for(const m of maskMaterials.values())m.dispose();}
 };
 output.uniforms.parityEnabled={value:1};output.uniforms.parityMask={value:maskTarget.texture};output.uniforms.parityHdr={value:hdrTarget.texture};output.uniforms.parityLut={value:appearance.lut2D};output.uniforms.parityLutDims={value:new THREE.Vector2(appearance.lut2D.image.width,appearance.lut2D.image.height)};
 output.uniforms.parityMinEv={value:appearance.config.min_ev};output.uniforms.parityMaxEv={value:appearance.config.max_ev};output.uniforms.parityLutSize={value:appearance.config.size};
 output.material.fragmentShader=output.material.fragmentShader
  .replace('uniform sampler2D tDiffuse;', 'uniform sampler2D tDiffuse;uniform sampler2D parityMask;uniform sampler2D parityHdr;uniform sampler2D parityLut;uniform vec2 parityLutDims;uniform float parityEnabled,parityMinEv,parityMaxEv,parityLutSize;')
  .replace('// color space',`// The OCIO LUT already returns display encoded sRGB. Early return applies
   // it once to the yacht; the original marina display path follows unchanged.
   if(parityEnabled>.5&&texture2D(parityMask,vUv).r>.5){vec3 paritySource=texture2D(parityHdr,vUv).rgb;vec3 p=clamp((log2(max(paritySource,vec3(1e-10)))-parityMinEv)/(parityMaxEv-parityMinEv),0.,1.)*(parityLutSize-1.);float b0=floor(p.b),b1=min(b0+1.,parityLutSize-1.);vec2 a=(vec2(mod(b0,8.),floor(b0/8.))*parityLutSize+p.rg+.5)/parityLutDims;vec2 b=(vec2(mod(b1,8.),floor(b1/8.))*parityLutSize+p.rg+.5)/parityLutDims;gl_FragColor=vec4(mix(texture2D(parityLut,a).rgb,texture2D(parityLut,b).rgb,fract(p.b)),gl_FragColor.a);return;}
   // color space`);
 output.material.needsUpdate=true;composer.insertPass(pass,composer.passes.indexOf(output));
 return {pass,maskTarget,hdrTarget,setEnabled(value){output.uniforms.parityEnabled.value=value?1:0;},report:()=>({maskedMeshes:proxies.length,marinaOutputPreserved:true,marinaBufferType:sceneTarget.texture.type,yachtBufferType:hdrTarget.texture.type,hdrVisible})};
}
