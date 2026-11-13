// The boarding assembly uses one opaque batch and one pane of glazing. Both
// share the same transform, depth attachment and multisampled render pass.
const shader = `
struct Frame {
  clipFromLocal: mat4x4f,
  eyeLocal: vec4f,
  sunLocal: vec4f,
}
@group(0) @binding(0) var<uniform> frame: Frame;
struct Vertex {
  @builtin(position) clip: vec4f,
  @location(0) color: vec3f,
  @location(1) local: vec2f,
  @location(2) @interpolate(flat) surfaceType: f32,
}
@vertex fn vertex(@location(0) position: vec3f, @location(1) normal: vec3f,
                  @location(2) albedo: vec3f, @location(3) surface: vec4f) -> Vertex {
  var out: Vertex;
  out.clip = frame.clipFromLocal * vec4f(position, 1);
  let n = normalize(normal);
  let light = frame.sunLocal.xyz;
  let eye = normalize(frame.eyeLocal.xyz - position);
  let hemi = mix(vec3f(.19,.16,.13), vec3f(.62,.67,.73), n.y*.5+.5);
  let diffuse = max(dot(n, light), 0.);
  let gloss = pow(max(dot(n, normalize(eye+light)), 0.), mix(68., 10., surface.x));
  let reflection = reflect(-eye, n);
  let reflectedLight = mix(vec3f(.095,.087,.077), vec3f(.71,.75,.79),
                           smoothstep(-.16,.25,reflection.y));
  let lit = albedo * (hemi + diffuse * vec3f(.82,.72,.59)) * surface.w;
  out.color = mix(lit, albedo * reflectedLight, surface.y)
              + gloss * (.08 + surface.y*.65);
  out.local = vec2f((position.z+17.615)/(35.23/36.), position.x/(7.47/7.6));
  out.surfaceType = surface.z;
  return out;
}
@fragment fn fragment(in: Vertex) -> @location(0) vec4f {
  // Deck seams use the source finish's 105 mm spacing in yacht coordinates.
  let plank = in.local.y / .105;
  let edge = min(fract(plank), 1.-fract(plank));
  let footprint = max(fwidth(plank), .001);
  let seam = (1.-smoothstep(0., .035+footprint, edge)) *
             (1.-smoothstep(.12,.55,footprint));
  // Staggered end joints and board tint follow the original yacht's teak finish.
  let board = floor(plank);
  let endCoord = (in.local.x+fract(board*.618034)*1.7)/2.15;
  let endWidth = max(fwidth(in.local.x)/2.15, .0001);
  let endJoint = (1.-smoothstep(0.,.001+endWidth,min(fract(endCoord),1.-fract(endCoord)))) *
                 (1.-smoothstep(.12,.55,endWidth));
  let variation = 1.+(.97+.045*sin(board*17.17)-1.)*(1.-smoothstep(.12,.55,footprint));
  let wood = select(1., variation*(1.-.52*max(seam,.6*endJoint)), in.surfaceType==1.);
  let linear = clamp(in.color*wood, vec3f(0), vec3f(1));
  let srgb = select(1.055*pow(linear,vec3f(1./2.4))-.055, 12.92*linear, linear<=vec3f(.0031308));
  return vec4f(srgb,1.);
}
struct GlassVertex {
  @builtin(position) clip: vec4f,
  @location(0) rgba: vec4f,
}
@vertex fn glassVertex(@location(0) position: vec3f, @location(1) normal: vec3f,
                       @location(2) tint: vec3f) -> GlassVertex {
  let eye = normalize(frame.eyeLocal.xyz-position);
  let n = normalize(normal);
  let grazing = pow(1.-clamp(abs(dot(n,eye)),0.,1.),5.);
  let sky = smoothstep(-.16,.25,reflect(-eye,n).y);
  let glassColor = tint*mix(vec3f(.62,.64,.67),vec3f(.91,.94,.98),sky);
  return GlassVertex(frame.clipFromLocal*vec4f(position,1.),vec4f(glassColor,.06+.30*grazing));
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
  ]});
  const layout = device.createPipelineLayout({bindGroupLayouts:[bindLayout]});
  function makePipeline(count, glass) {
    const names = glass ? attributes.slice(0,3) : attributes;
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
  const batches = model.meshes.map(mesh => {
    const geom = mesh.geometry;
    const names = mesh.material.transparent ? attributes.slice(0,3) : attributes;
    return {
      vertices:names.map(name => upload(geom.attributes[name].array,GPUBufferUsage.VERTEX)),
      indices:upload(geom.index.array,GPUBufferUsage.INDEX),
      indexFormat:geom.index.array instanceof Uint32Array ? 'uint32' : 'uint16',
      count:geom.index.count,
    };
  });
  const frame = new Float32Array(24);
  const uniform = device.createBuffer({size:frame.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});
  const bindings = device.createBindGroup({layout:bindLayout,entries:[{binding:0,resource:{buffer:uniform}}]});
  const mesh = model.boarding.group;
  mesh.updateWorldMatrix(true,false);
  const localFromWorld = mesh.matrixWorld.clone().invert();
  const clip = mesh.matrixWorld.clone();
  const eye = app.camera.position.clone();
  sun.clone().transformDirection(localFromWorld).toArray(frame,20);
  let depth, depthView, color, colorView;
  return {
    get samples() { return samples; },
    get canSmooth() { return Boolean(smooth); },
    setSamples(value) { samples = value === 4 && smooth ? 4 : 1; },
    render() {
      const {engine, gpu, camera} = app;
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
      const screen = engine.currentTexture().createView();
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
      for (const batch of batches) {
        batch.vertices.forEach(buffer => buffer.destroy());
        batch.indices.destroy();
      }
      uniform.destroy(); depth?.destroy(); color?.destroy();
    },
  };
}
