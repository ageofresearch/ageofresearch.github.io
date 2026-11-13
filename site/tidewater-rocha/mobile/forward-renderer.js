// The isolated gangway is one static opaque mesh. Transform and light its native
// vertex attributes directly; the one color attachment is the displayed canvas.
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
  out.local = position.xz;
  out.surfaceType = surface.z;
  return out;
}
@fragment fn fragment(in: Vertex) -> @location(0) vec4f {
  // Deck seams use the source finish's 105 mm spacing in yacht coordinates.
  let plank = in.local.x / (.105 * (7.47/7.6));
  let edge = min(fract(plank), 1.-fract(plank));
  let footprint = max(fwidth(plank), .001);
  let seam = (1.-smoothstep(0., .035+footprint, edge)) *
             (1.-smoothstep(.12,.55,footprint));
  let wood = select(1., 1.-.48*seam, in.surfaceType==1.);
  let linear = clamp(in.color*wood, vec3f(0), vec3f(1));
  let srgb = select(1.055*pow(linear,vec3f(1./2.4))-.055, 12.92*linear, linear<=vec3f(.0031308));
  return vec4f(srgb,1.);
}`;

export async function createForwardRenderer(app, sun) {
  const { device, format } = app.gpu;
  const mesh = app.entranceYacht.meshes[0];
  const geometry = mesh.geometry;
  const attributes = ['position', 'normal', 'color', 'aSurface'].map(name => geometry.attributes[name]);
  const module = device.createShaderModule({label:'Gangway finishes', code:shader});
  const pipeline = await device.createRenderPipelineAsync({
    label:'Gangway direct lighting', layout:'auto',
    vertex:{module,entryPoint:'vertex',buffers:attributes.map((a, index) => ({
      arrayStride:a.itemSize*4, attributes:[{shaderLocation:index,offset:0,format:'float32x'+a.itemSize}],
    }))},
    fragment:{module,entryPoint:'fragment',targets:[{format}]},
    primitive:{topology:'triangle-list',cullMode:'back'},
    depthStencil:{format:'depth24plus',depthWriteEnabled:true,depthCompare:'greater'},
  });
  function upload(array, usage) {
    const buffer = device.createBuffer({size:Math.ceil(array.byteLength/4)*4,usage,mappedAtCreation:true});
    new Uint8Array(buffer.getMappedRange()).set(new Uint8Array(array.buffer,array.byteOffset,array.byteLength));
    buffer.unmap();
    return buffer;
  }
  const vertices = attributes.map(a => upload(a.array,GPUBufferUsage.VERTEX));
  const indices = upload(geometry.index.array,GPUBufferUsage.INDEX);
  const indexFormat = geometry.index.array instanceof Uint32Array ? 'uint32' : 'uint16';
  const frame = new Float32Array(24);
  const uniform = device.createBuffer({size:frame.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});
  const bindings = device.createBindGroup({layout:pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:uniform}}]});
  mesh.updateWorldMatrix(true,false);
  const localFromWorld = mesh.matrixWorld.clone().invert();
  const clip = mesh.matrixWorld.clone();
  const eye = app.camera.position.clone();
  sun.clone().transformDirection(localFromWorld).toArray(frame,20);
  let depth, depthView;
  return {
    render() {
      const {engine, gpu, camera} = app;
      if (depth?.width !== engine.width || depth?.height !== engine.height) {
        depth?.destroy();
        depth = device.createTexture({label:'Gangway depth',size:[engine.width,engine.height],format:'depth24plus',usage:GPUTextureUsage.RENDER_ATTACHMENT});
        depthView = depth.createView();
      }
      camera.updateMatrixWorld();
      clip.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse).multiply(mesh.matrixWorld).toArray(frame);
      eye.copy(camera.position).applyMatrix4(localFromWorld).toArray(frame,16);
      gpu.queue.writeBuffer(uniform,0,frame);
      const pass = gpu.getEncoder().beginRenderPass({
        label:'Gangway to screen',
        colorAttachments:[{view:engine.currentTexture().createView(),loadOp:'clear',storeOp:'store',
          clearValue:{r:.64,g:.60,b:.53,a:1}}],
        depthStencilAttachment:{view:depthView,depthClearValue:0,depthLoadOp:'clear',depthStoreOp:'discard'},
      });
      pass.setPipeline(pipeline);
      pass.setBindGroup(0,bindings);
      vertices.forEach((buffer,index) => pass.setVertexBuffer(index,buffer));
      pass.setIndexBuffer(indices,indexFormat);
      pass.drawIndexed(geometry.index.count);
      pass.end();
    },
    dispose() {
      vertices.forEach(buffer => buffer.destroy());
      indices.destroy(); uniform.destroy(); depth?.destroy();
    },
  };
}
