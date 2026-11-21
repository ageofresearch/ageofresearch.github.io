// The four sample locations are specified by WebGPU §23.2.5. The precision
// of projected vertices is separate. Render small triangles at many slopes
// and pixel phases before selecting a bound for CPU coverage tests.
const offsets = [[.375,.125],[.875,.375],[.125,.625],[.625,.875]];
const size = 128, cell = 4;
function probeGeometry() {
  let seed = 739421;
  const random = () => ((seed = (Math.imul(seed,1664525) + 1013904223) >>> 0) / 4294967296);
  const positions = new Float32Array(size * size / (cell * cell) * 6);
  for (let y = 0, i = 0; y < size; y += cell) for (let x = 0; x < size; x += cell) {
    const sample = offsets[(i / 6) % 4], cx = x + 1 + sample[0], cy = y + 1 + sample[1];
    const angle = random() * Math.PI * 2, dx = Math.cos(angle), dy = Math.sin(angle);
    // One long edge passes close to a real sample. Avoid exact half-grid ties.
    const delta = (random() - .5) * .11, ax = cx - dy * delta, ay = cy + dx * delta;
    const before = .43 + .5 * random(), after = .43 + .5 * random();
    for (const [px, py] of [[ax - dx*before, ay - dy*before], [ax + dx*after, ay + dy*after],
      [ax - dy*.86, ay + dx*.86]]) {
      positions[i++] = 2 * px / size - 1;
      positions[i++] = 1 - 2 * py / size;
    }
  }
  return positions;
}
function assess(positions, pixels) {
  // Require agreement across the entire target and adequate evidence on
  // both axes. Several finer grids may be indistinguishable in one probe.
  const grids = [8, 16, 32, 64, 128, 256, 512, 4096, Infinity];
  const candidates = grids.map(grid => ({grid, differences:0, horizontal:0, vertical:0}));
  for (let base = 0; base < positions.length; base += 6) {
    const index = base / 6, x0 = index % (size / cell) * cell, y0 = Math.floor(index / (size / cell)) * cell;
    const pts = [0,2,4].map(i => [(positions[base+i]+1)*size/2, (1-positions[base+i+1])*size/2]);
    for (const c of candidates) {
      if(c.horizontal>=4 && c.vertical>=4) continue;
      const snap = v => Number.isFinite(c.grid) ? Math.round(v * c.grid) / c.grid : v;
      const v = pts.map(p => p.map(snap));
      for (let y = y0; y < y0+cell; y++) for (let x = x0; x < x0+cell; x++) {
        const at = (y*size+x)*4;
        for (let k=0;k<4;k++) {
          const px=x+offsets[k][0], py=y+offsets[k][1];
          let boundary=false, inside=true;
          for(let j=0;j<3;j++){
            const [ax,ay]=v[j], [bx,by]=v[(j+1)%3];
            const d=(bx-ax)*(py-ay)-(by-ay)*(px-ax);
            if(Math.abs(d)<1e-8)boundary=true;
            if(d<0)inside=false;
          }
          if(!boundary && inside!==(pixels[at+k]>32)){
            c.differences++;
            if(Math.abs(pts[1][0]-pts[0][0])>Math.abs(pts[1][1]-pts[0][1]))c.horizontal++;
            else c.vertical++;
          }
        }
      }
    }
  }
  const incompatible = candidates[0];
  if(incompatible.horizontal<4 || incompatible.vertical<4) return 0;
  const valid=candidates.filter(c=>c.differences===0);
  if(valid.length===1 && valid[0].grid===16 &&
      candidates.slice(2).every(c=>c.horizontal>=4 && c.vertical>=4)) return 16;
  return valid.some(c=>c.grid>=16) ? 1 : 0;
}
export async function measureRasterPrecision(device) {
  device.pushErrorScope('out-of-memory');
  device.pushErrorScope('validation');
  const buffers=[], textures=[];
  let precision=0;
  try {
    const format='rgba8unorm', positions=probeGeometry();
    const module=device.createShaderModule({label:'Four-sample coverage calibration',code:`
      @vertex fn vertex(@location(0) p:vec2f)->@builtin(position) vec4f {return vec4f(p,0,1);}
      @fragment fn fragment(@builtin(sample_index) sample:u32)->@location(0) vec4f {
        var v=vec4f(0);v[sample]=1.;return v;
      }`});
    const pipeline=await device.createRenderPipelineAsync({layout:'auto',multisample:{count:4},
      vertex:{module,entryPoint:'vertex',buffers:[{arrayStride:8,attributes:[{shaderLocation:0,offset:0,format:'float32x2'}]}]},
      fragment:{module,entryPoint:'fragment',targets:[{format}]}});
    const vertices=device.createBuffer({size:positions.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:true});
    buffers.push(vertices);new Float32Array(vertices.getMappedRange()).set(positions);vertices.unmap();
    const ms=device.createTexture({size:[size,size],format,sampleCount:4,usage:GPUTextureUsage.RENDER_ATTACHMENT});textures.push(ms);
    const target=device.createTexture({size:[size,size],format,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC});textures.push(target);
    const read=device.createBuffer({size:size*size*4,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});buffers.push(read);
    const encoder=device.createCommandEncoder(), pass=encoder.beginRenderPass({colorAttachments:[{view:ms.createView(),
      resolveTarget:target.createView(),loadOp:'clear',storeOp:'discard',clearValue:[0,0,0,0]}]});
    pass.setPipeline(pipeline);pass.setVertexBuffer(0,vertices);pass.draw(positions.length/2);pass.end();
    encoder.copyTextureToBuffer({texture:target},{buffer:read,bytesPerRow:size*4},[size,size]);
    device.queue.submit([encoder.finish()]);await read.mapAsync(GPUMapMode.READ);
    precision=assess(positions,new Uint8Array(read.getMappedRange()));
  }catch{precision=0;}
  finally{for(const r of buffers)r.destroy();for(const r of textures)r.destroy();}
  const validation=await device.popErrorScope(), memory=await device.popErrorScope();
  return validation || memory ? 0 : precision;
}
