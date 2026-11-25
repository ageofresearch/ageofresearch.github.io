// Fixed to the hull, independent of camera/profile culling. Clip depth increases
// away from the sun. A tight, rectangular fit preserves detail on narrow rails.
export function lightMatrix(sun, azimuth, out) {
  const a = (azimuth * Math.PI) / 180;
  const right = [Math.cos(a), 0, Math.sin(a)],
    up = [sun.y * right[2], sun.z * right[0] - sun.x * right[2], -sun.y * right[0]];
  const forward = [-sun.x, -sun.y, -sun.z],
    half = [5.1, 7.1, 23],
    center = [0, 4.72, -2];
  const extent = (v) => half.reduce((sum, h, i) => sum + h * Math.abs(v[i]), 0.2);
  const axes = [right, up, forward],
    scales = [1 / extent(right), 1 / extent(up), 0.5 / extent(forward)];
  for (let row = 0; row < 3; row++) {
    const v = axes[row],
      s = scales[row];
    for (let col = 0; col < 3; col++) out[col * 4 + row] = v[col] * s;
    out[12 + row] = (row === 2 ? 0.5 : 0) - s * v.reduce((sum, x, i) => sum + x * center[i], 0);
  }
  out[3] = out[7] = out[11] = 0;
  out[15] = 1;
}
// Expand the compact per-face visibility masks once during preparation.
export function decodeShadow(data) {
  if (data.byteLength < 24) throw Error('Geometría de sombra incompleta');
  const [magic, n, count, stride, azimuths, elevations] = new Uint32Array(data, 0, 6);
  const cells = azimuths * elevations,
    words = Math.ceil(cells / 32);
  const offset = 24 + 12 * n,
    maskOffset = Math.ceil((offset + count * stride) / 4) * 4;
  if (
    magic !== 0x594c4955 ||
    !n ||
    !count ||
    count % 3 ||
    ![2, 4].includes(stride) ||
    !cells ||
    cells > 128 ||
    maskOffset + (count / 3) * words * 4 !== data.byteLength
  )
    throw Error('Geometría de sombra inválida');
  const Index = stride === 2 ? Uint16Array : Uint32Array;
  const positions = new Float32Array(data, 24, n * 3),
    indices = new Index(data, offset, count);
  const mask = new Uint32Array(data, maskOffset),
    ranges = [];
  let total = 0;
  for (let cell = 0; cell < cells; cell++) {
    const first = total,
      word = cell >>> 5,
      bit = 1 << (cell & 31);
    for (let i = word; i < mask.length; i += words) if (mask[i] & bit) total += 3;
    ranges.push({ first, count: total - first });
  }
  const sorted = new Index(total);
  for (let cell = 0; cell < cells; cell++) {
    const word = cell >>> 5,
      bit = 1 << (cell & 31);
    let next = ranges[cell].first;
    for (let i = 0; i < count / 3; i++)
      if (mask[i * words + word] & bit) {
        sorted[next++] = indices[i * 3];
        sorted[next++] = indices[i * 3 + 1];
        sorted[next++] = indices[i * 3 + 2];
      }
  }
  function range({ azimuth, elevation }) {
    const i = Math.floor((azimuth * azimuths) / 360) % azimuths;
    const j = Math.min(elevations - 1, Math.floor(((elevation - 5) * elevations) / 85));
    return ranges[j * azimuths + i];
  }
  return { positions, indices: sorted, indexFormat: stride === 2 ? 'uint16' : 'uint32', range };
}
export async function createDaylightShadow(device, uniform, upload) {
  const response = await fetch(new URL('./daylight-casters.bin?v=vr-rails-2', import.meta.url));
  if (!response.ok) throw Error('No se pudo cargar la geometría de sombra');
  const { positions, indices: faces, indexFormat, range } = decodeShadow(await response.arrayBuffer());
  const module = device.createShaderModule({
    code: `
    struct Frame {clip:mat4x4f,eye:vec4f,sun:vec4f,light:mat4x4f}
    @group(0) @binding(0) var<uniform> frame:Frame;
    @vertex fn vs(@location(0) pos:vec3f)->@builtin(position) vec4f{return frame.light*vec4f(pos,1);}
  `,
  });
  const pipeline = await device.createRenderPipelineAsync({
    label: 'Yacht sun depth',
    layout: 'auto',
    vertex: {
      module,
      entryPoint: 'vs',
      buffers: [{ arrayStride: 12, attributes: [{ shaderLocation: 0, offset: 0, format: 'float32x3' }] }],
    },
    primitive: { topology: 'triangle-list', cullMode: 'none' },
    depthStencil: {
      format: 'depth16unorm',
      depthCompare: 'less',
      depthWriteEnabled: true,
      depthBias: 1,
      depthBiasSlopeScale: 1,
    },
  });
  const bind = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: { buffer: uniform } }],
  });
  const texture = device.createTexture({
    label: 'Cached yacht sun depth',
    size: [512, 512],
    format: 'depth16unorm',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  });
  const view = texture.createView(),
    sampler = device.createSampler({ compare: 'less-equal', magFilter: 'linear', minFilter: 'linear' });
  const vertices = upload(positions, GPUBufferUsage.VERTEX);
  const indices = upload(faces, GPUBufferUsage.INDEX);
  return {
    view,
    sampler,
    draw(encoder, sun) {
      const { first, count } = range(sun);
      const pass = encoder.beginRenderPass({
        label: 'Yacht moving sun',
        colorAttachments: [],
        depthStencilAttachment: { view, depthLoadOp: 'clear', depthStoreOp: 'store', depthClearValue: 1 },
      });
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, bind);
      pass.setVertexBuffer(0, vertices);
      pass.setIndexBuffer(indices, indexFormat);
      pass.drawIndexed(count, 1, first);
      pass.end();
    },
    dispose() {
      vertices.destroy();
      indices.destroy();
      texture.destroy();
    },
  };
}
