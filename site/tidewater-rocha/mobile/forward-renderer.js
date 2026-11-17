import {createFinishPatterns} from './finish-patterns.js?v=guest-access-1';
import { nextProfile } from './main-saloon.js?v=guest-access-1';

// The boarding assembly uses one opaque batch and a single glazing batch. Both
// share the same transform, depth attachment and multisampled render pass.
const shader = `
struct Frame {
  clipFromLocal: mat4x4f,
  eyeLocal: vec4f,
  sunLocal: vec4f,
}
@group(0) @binding(0) var<uniform> frame: Frame;
@group(0) @binding(1) var patternSampler: sampler;
@group(0) @binding(2) var patterns: texture_2d_array<f32>;
@group(0) @binding(3) var teak: texture_2d<f32>;
struct Vertex {
  @builtin(position) clip: vec4f,
  @location(0) color: vec3f,
  @location(1) uv: vec2f,
  @location(2) @interpolate(flat) layer: i32,
}
@vertex fn vertex(@location(0) position: vec3f, @location(1) normal: vec3f,
                  @location(2) albedo: vec3f, @location(3) surface: vec4f) -> Vertex {
  var out: Vertex;
  out.clip = frame.clipFromLocal * vec4f(position, 1);
  let n = normalize(normal);
  let boarding=surface.z>=37. && surface.z<=42.;
  let roughness=select(surface.x,.8,boarding);let metalness=select(surface.y,0.,boarding);
  let light = frame.sunLocal.xyz;
  let eye = normalize(frame.eyeLocal.xyz - position);
  let hemi = mix(vec3f(.19,.16,.13), vec3f(.62,.67,.73), n.y*.5+.5);
  let diffuse = max(dot(n, light), 0.);
  let gloss = pow(max(dot(n, normalize(eye+light)), 0.), mix(68., 10., roughness));
  let reflection = reflect(-eye, n);
  let reflectedLight = mix(vec3f(.095,.087,.077), vec3f(.71,.75,.79),
                           smoothstep(-.16,.25,reflection.y));
  let finish = select(albedo, vec3f(.72,.69,.61), surface.z == 9.);
  let indirect = select(vec3f(0), vec3f(.23,.22,.20), surface.z == 9.);
  let lit = finish * ((hemi + diffuse * vec3f(.82,.72,.59)) * surface.w + indirect);
  out.color = mix(lit, albedo * reflectedLight, metalness)
              + gloss * (.08 + metalness*.65);
  out.color = toSrgb(out.color);
  let local=vec2f((position.z+17.615)/(35.23/36.), position.x/(7.47/7.6));
  let finishUV=vec2f(position.x+position.y*.73, position.z+position.y*.51);
  out.layer=-1;out.uv=vec2f(0);
  if(surface.z==2.){out.layer=1;out.uv=finishUV*vec2f(310.,37.)/6.2831853;}
  else if(surface.z==3.){out.layer=2;out.uv=finishUV*vec2f(430.,410.)/6.2831853;}
  else if(surface.z==1.){out.layer=0;out.uv=vec2f(local.x/2.15,(local.y/.105+64.)/128.);}
  else if(surface.z==7.){
    var center=vec2f(22.354615,-.05067);
    if(local.y>.9){center=vec2f(22.03368,1.21617);}else if(local.y>.25){center=vec2f(22.27016,.59119);}
    else if(local.y< -1.){center=vec2f(21.949225,-1.31751);}else if(local.y< -.35){center=vec2f(22.18570,-.69254);}
    out.layer=3;out.uv=vec2f((local.y-center.y)/.48+.5,((local.x-center.x)*.659983+(position.y+2.01-7.01)*.75128)/.36+.5);
  }
  else if(boarding){out.layer=4;out.uv=surface.xy;}
  return out;
}
fn toSrgb(linear: vec3f) -> vec3f {
  let c=clamp(linear,vec3f(0),vec3f(1));
  let s1=sqrt(c);let s2=sqrt(s1);let s3=sqrt(s2);
  return select(.662002687*s1+.684122060*s2-.323583601*s3-.022541147*c,
                12.92*c,c<=vec3f(.0031308));
}
@diagnostic(off, derivative_uniformity)
@fragment fn fragment(in: Vertex) -> @location(0) vec4f {
  if(in.layer<0){return vec4f(in.color,1.);}
  if(in.layer==3){
    let instrument=textureSample(patterns,patternSampler,in.uv,2).rg;
    return vec4f(vec3f(.022,.058,.071)+instrument.r*vec3f(.075,.22,.15)+instrument.g*vec3f(.31,.38,.25),1.);
  }
  var factor=1.;
  if(in.layer==0){factor=textureSample(teak,patternSampler,in.uv).r*1.1;}
  else {let encoded=textureSample(patterns,patternSampler,in.uv,in.layer-1).rg;
    factor=dot(encoded,vec2f(65280./65535.,255./65535.))*1.1;}

  return vec4f(clamp((in.color+.055)*factor-.055,vec3f(0),vec3f(1)),1.);
}
struct GlassVertex {
  @builtin(position) clip: vec4f,
  @location(0) rgba: vec4f,
}
@vertex fn glassVertex(@location(0) position: vec3f, @location(1) normal: vec3f,
                       @location(2) tint: vec3f, @location(3) surface: vec4f) -> GlassVertex {
  let eye = normalize(frame.eyeLocal.xyz-position);
  let n = normalize(normal);
  let grazing = pow(1.-clamp(abs(dot(n,eye)),0.,1.),5.);
  let sky = smoothstep(-.16,.25,reflect(-eye,n).y);
  let glassColor = tint*mix(vec3f(.62,.64,.67),vec3f(.91,.94,.98),sky);
  return GlassVertex(frame.clipFromLocal*vec4f(position,1.),vec4f(glassColor,select(.06+.30*grazing,.66+.22*grazing,surface.z<26.5)));
}
@fragment fn glassFragment(in: GlassVertex) -> @location(0) vec4f {
  return in.rgba;
}`;

export async function createForwardRenderer(app, sun) {
  const { device, format } = app.gpu;
  const model = app.entranceYacht;
  const attributes = ['position', 'normal', 'color', 'aSurface'];
  const blend = {
    color:{srcFactor:'src-alpha',dstFactor:'one-minus-src-alpha'},
    alpha:{srcFactor:'one',dstFactor:'one-minus-src-alpha'},
  };
  const module = device.createShaderModule({label:'Gangway finishes', code:shader});
  const bindLayout = device.createBindGroupLayout({entries:[
    {binding:0, visibility:GPUShaderStage.VERTEX, buffer:{type:'uniform'}},
    {binding:1, visibility:GPUShaderStage.FRAGMENT, sampler:{type:'filtering'}},
    {binding:2, visibility:GPUShaderStage.FRAGMENT, texture:{sampleType:'float',viewDimension:'2d-array'}},
    {binding:3, visibility:GPUShaderStage.FRAGMENT, texture:{sampleType:'float'}},
  ]});
  const layout = device.createPipelineLayout({bindGroupLayouts:[bindLayout]});
  function makePipeline(count, glass) {
    const names = attributes;
    return device.createRenderPipelineAsync({
      label:(glass ? 'Boarding glass ' : 'Boarding finishes ')+count+'×', layout, multisample:{count},
      vertex:{module,entryPoint:glass ? 'glassVertex' : 'vertex',buffers:names.map((name,index) => {
        const n = model.meshes[0].geometry.attributes[name].itemSize;
        return {arrayStride:n*4, attributes:[{shaderLocation:index,offset:0,format:'float32x'+n}]};
      })},
      fragment:{module,entryPoint:glass ? 'glassFragment' : 'fragment',targets:[{format,blend:glass ? blend : undefined}]},
      // The gate is a closed beveled pane, so its outward faces cover both viewing sides.
      primitive:{topology:'triangle-list',cullMode:'back'},
      depthStencil:{format:'depth24plus',depthWriteEnabled:!glass,depthCompare:'greater'},
    });
  }
  function makePipelines(count) {
    return Promise.all(model.meshes.map(mesh => makePipeline(count,mesh.material.transparent)));
  }
  const [single, smooth] = await Promise.all([makePipelines(1), makePipelines(4).catch(error => {
    console.warn('Gangway MSAA unavailable', error);
    return null;
  })]);
  let samples = smooth ? 4 : 1;
  function upload(array, usage) {
    const buffer = device.createBuffer({size:Math.ceil(array.byteLength/4)*4,usage,mappedAtCreation:true});
    new Uint8Array(buffer.getMappedRange()).set(new Uint8Array(array.buffer,array.byteOffset,array.byteLength));
    buffer.unmap();
    return buffer;
  }
  let batches = model.meshes.map(mesh => {
    const geom = mesh.geometry;
    const names = attributes;
    return {
      vertices:names.map(name => upload(geom.attributes[name].array,GPUBufferUsage.VERTEX)),
      indices:upload(geom.index.array,GPUBufferUsage.INDEX),
      indexFormat:geom.index.array instanceof Uint32Array ? 'uint32' : 'uint16',
      count:geom.index.count,
    };
  });
  let profiles=null, activeProfile='exterior', disposed=false;
  const destroy=batches=>batches.forEach(batch=>{
    batch.vertices.forEach(buffer=>buffer.destroy());batch.indices.destroy();
  });
  function selectProfile(name) {
    if(!profiles)return;
    activeProfile=name;batches=profiles[name].batches;
    Object.assign(model.stats,{triangles:profiles[name].triangles,geometryBytes:profiles[name].geometryBytes,
      residentGeometryBytes:Object.values(profiles).reduce((n,p)=>n+p.geometryBytes,0),profile:name});
  }
  const frame = new Float32Array(24);
  const uniform = device.createBuffer({size:frame.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});
  const finishes=createFinishPatterns(device);
  const bindings = device.createBindGroup({layout:bindLayout,entries:[{binding:0,resource:{buffer:uniform}},
    {binding:1,resource:finishes.sampler},{binding:2,resource:finishes.view},{binding:3,resource:finishes.teak.createView()}]});
  model.stats.finishTextureBytes=finishes.bytes;
  model.stats.materialTextures=2;
  const mesh = model.boarding.group;
  mesh.updateWorldMatrix(true,false);
  const localFromWorld = mesh.matrixWorld.clone().invert();
  const clip = mesh.matrixWorld.clone();
  const eye = app.camera.position.clone();
  sun.clone().transformDirection(localFromWorld).toArray(frame,20);
  let depth, depthView, color, colorView;
  return {
    get activeProfile() { return activeProfile; },
    async installProfiles(source,{prepare=false,activate=()=>{}}={}) {
      if(disposed)throw Error('Renderer disposed');
      const uploaded={};
      device.pushErrorScope('out-of-memory');device.pushErrorScope('validation');
      let failure;
      try {
        for(const [name,p] of Object.entries(source)) {
          const result=uploaded[name]={...p,batches:[]};
          for(const b of p.batches) {
            const batch={vertices:[],indices:null,indexFormat:'uint32',count:b.indices.length};
            result.batches.push(batch);
            for(const name of attributes)batch.vertices.push(upload(b.attributes[name],GPUBufferUsage.VERTEX));
            batch.indices=upload(b.indices,GPUBufferUsage.INDEX);
          }
        }
      }catch(error){failure=error;}
      const validation=await device.popErrorScope(),memory=await device.popErrorScope();
      if(failure||validation||memory||disposed) {
        Object.values(uploaded).forEach(p=>p.batches.forEach(b=>{
          b.vertices.forEach(v=>v.destroy());b.indices?.destroy();
        }));
        throw failure||validation||memory||Error('Renderer disposed');
      }
      const previous={profiles,batches,name:activeProfile,stats:{...model.stats}};
      profiles=uploaded;selectProfile(uploaded[previous.name]?previous.name:'exterior');
      try {
        if(prepare) {
          device.pushErrorScope('out-of-memory');device.pushErrorScope('validation');
          let error;try{await this.prepareProfiles();}catch(e){error=e;}
          const invalid=await device.popErrorScope(),memory=await device.popErrorScope();
          if(error||invalid||memory||disposed)throw error||invalid||memory||Error('Renderer disposed');
        }
        activate();
      }catch(error){
        Object.values(uploaded).forEach(p=>destroy(p.batches));
        if(disposed){if(previous.profiles)Object.values(previous.profiles).forEach(p=>destroy(p.batches));else destroy(previous.batches);profiles=null;batches=[];}
        else {profiles=previous.profiles;batches=previous.batches;activeProfile=previous.name;Object.assign(model.stats,previous.stats);}
        throw error;
      }
      if(previous.profiles)Object.values(previous.profiles).forEach(p=>destroy(p.batches));else destroy(previous.batches);
    },
    get samples() { return samples; },
    get canSmooth() { return Boolean(smooth); },
    setSamples(value) { samples = value === 4 && smooth ? 4 : 1; },
    async prepareProfiles() {
      if(!profiles||disposed)return;
      // Exercise the actual buffers and pipelines offscreen before enabling a
      // new route. Do not change the visitor's pose or flash a different deck.
      const previous=activeProfile;
      const target=device.createTexture({label:'Walk preparation',format,
        size:[app.engine.width,app.engine.height],usage:GPUTextureUsage.RENDER_ATTACHMENT});
      try {
        for(const name of Object.keys(profiles)) {
          if(disposed)return;
          app.gpu.beginFrame();this.render(name,target.createView());app.gpu.submit();
          await app.gpu.queue.onSubmittedWorkDone();
        }
      } finally { target.destroy();if(!disposed)selectProfile(previous); }
    },
    render(preparingProfile=null,target=null) {
      const {engine, gpu, camera} = app;
      if(profiles) {
        const nav=app.yachtWalk.nav,guest=app.entranceYacht.guestAccess;
        const guestApproach=!!guest&&(nav.deck==='LD'||nav.deck==='MD'&&guest.profileContains(...nav.position,activeProfile)&&nav.floorSafe(...nav.position,'MD'));
        const name=preparingProfile??nextProfile(activeProfile,nav.position[0],nav.deck,nav.stair?.route.id,!!app.entranceYacht.bow?.contains(...nav.position),!!app.entranceYacht.bridgeAccess?.profileContains(...nav.position),guestApproach);
        if(name!==activeProfile)selectProfile(name);
      }
      if (depth?.width !== engine.width || depth.height !== engine.height || depth.sampleCount !== samples) {
        depth?.destroy();
        color?.destroy();
        const attachment = {size:[engine.width,engine.height],sampleCount:samples,usage:GPUTextureUsage.RENDER_ATTACHMENT};
        depth = device.createTexture({...attachment,label:'Gangway depth',format:'depth24plus'});
        depthView = depth.createView();
        color = samples > 1 ? device.createTexture({...attachment,label:'Gangway multisample color',format}) : null;
        colorView = color?.createView();
      }
      camera.updateMatrixWorld();
      clip.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse).multiply(mesh.matrixWorld).toArray(frame);
      eye.copy(camera.position).applyMatrix4(localFromWorld).toArray(frame,16);
      gpu.queue.writeBuffer(uniform,0,frame);
      const screen = target??engine.currentTexture().createView();
      const pass = gpu.getEncoder().beginRenderPass({
        label:'Gangway to screen',
        colorAttachments:[{view:colorView ?? screen,resolveTarget:colorView ? screen : undefined,
          loadOp:'clear',storeOp:colorView ? 'discard' : 'store',
          clearValue:{r:.64,g:.60,b:.53,a:1}}],
        depthStencilAttachment:{view:depthView,depthClearValue:0,depthLoadOp:'clear',depthStoreOp:'discard'},
      });
      pass.setBindGroup(0,bindings);
      const pipelines = samples === 4 ? smooth : single;
      for (let i=0; i<batches.length; i++) {
        const batch = batches[i];
        pass.setPipeline(pipelines[i]);
        batch.vertices.forEach((buffer,index) => pass.setVertexBuffer(index,buffer));
        pass.setIndexBuffer(batch.indices,batch.indexFormat);
        pass.drawIndexed(batch.count);
      }
      pass.end();
    },
    dispose() {
      disposed=true;
      if(profiles)Object.values(profiles).forEach(p=>destroy(p.batches));else destroy(batches);
      uniform.destroy(); finishes.texture.destroy(); finishes.teak.destroy(); depth?.destroy(); color?.destroy();
    },
  };
}
