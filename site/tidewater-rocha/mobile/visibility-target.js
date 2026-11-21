import {coverageWords} from './sample-visibility.js?v=3';

// Read each hardware sample before resolve, including subpixel fittings at
// 4× MSAA. The blue channel distinguishes vertex zero from the clear color.
const signature = 0x59414348;
export async function prepareVisibilityPipeline(device) {
  const module = device.createShaderModule({label:'Read yacht sample coverage', code:`
    @group(0) @binding(0) var source: texture_multisampled_2d<f32>;
    @group(0) @binding(1) var<storage,read_write> winners: array<atomic<u32>>;
    fn sampleTag(pixel:vec2i, sample:i32) -> u32 {
      let bytes = vec3u(round(textureLoad(source, pixel, sample).rgb * 255.));
      return select(0u, 1u + bytes.x + (bytes.y << 8u), bytes.z != 0u);
    }
    fn mark(tag:u32) {
      if (tag != 0u) {
        let vertex = tag - 1u;
        atomicOr(&winners[vertex >> 5u], 1u << (vertex & 31u));
      }
    }
    @compute @workgroup_size(8,8)
    fn collect(@builtin(global_invocation_id) id:vec3u) {
      if (any(id.xy >= textureDimensions(source))) { return; }
      if (all(id.xy == vec2u(0u))) { atomicStore(&winners[${coverageWords}u], ${signature}u); }
      let pixel = vec2i(id.xy);
      let a = sampleTag(pixel, 0);
      let b = sampleTag(pixel, 1);
      let c = sampleTag(pixel, 2);
      let d = sampleTag(pixel, 3);
      // The first pixel in each workgroup starts a fresh horizontal run.
      var previous = 0u;
      if (id.x % 8u != 0u) { previous = sampleTag(pixel - vec2i(1,0), 0); }
      if (a != previous) { mark(a); }
      if (b != a && b != previous) { mark(b); }
      if (c != a && c != b && c != previous) { mark(c); }
      if (d != a && d != b && d != c && d != previous) { mark(d); }
    }`});
  return device.createComputePipelineAsync({label:'Collect winning yacht vertices',
    layout:'auto', compute:{module, entryPoint:'collect'}});
}

export function createVisibilityTarget(device, width, height, pipeline) {
  if (width * height > 1500000) return null;
  const bytes = (coverageWords + 1) * 4;
  let samples, winners, readback, busy = false, disposed = false;
  let pending = Promise.resolve();
  function dispose() {
    disposed = true;
    samples?.destroy();
    winners?.destroy();
    readback?.destroy();
  }
  try {
    samples = device.createTexture({label:'Yacht sample tags', size:[width,height],
      format:'rgba8unorm', sampleCount:4, usage:GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING});
    winners = device.createBuffer({label:'Yacht vertex coverage', size:bytes,
      usage:GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST});
    readback = device.createBuffer({label:'Yacht visibility readback', size:bytes,
      usage:GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST});
    const view = samples.createView();
    const bindings = device.createBindGroup({layout:pipeline.getBindGroupLayout(0),
      entries:[{binding:0,resource:view},{binding:1,resource:{buffer:winners}}]});
    return {
      attachment:{view, loadOp:'clear', storeOp:'store', clearValue:[0,0,0,0]},
      dispose,
      get pending() { return pending; },
      get busy() { return busy; },
      read(encoder, consume) {
        busy = true;
        encoder.clearBuffer(winners);
        const pass = encoder.beginComputePass({label:'Collect settled yacht coverage'});
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bindings);
        pass.dispatchWorkgroups(Math.ceil(width / 8), Math.ceil(height / 8));
        pass.end();
        encoder.copyBufferToBuffer(winners, 0, readback, 0, bytes);
        // The frame submits synchronously. An incomplete read leaves the
        // ordinary camera draw available.
        pending = Promise.resolve().then(async () => {
          try {
            if (disposed) return;
            await readback.mapAsync(GPUMapMode.READ);
            if (disposed) return;
            const result = new Uint32Array(readback.getMappedRange());
            const bits = result[coverageWords] === signature ? result.slice(0, coverageWords) : null;
            readback.unmap();
            if (bits) consume(bits, width, height);
          } catch {
            // Device loss and disposal can cancel a pending mapping.
          } finally {
            busy = false;
          }
        });
      },
    };
  } catch {
    dispose();
    return null;
  }
}
