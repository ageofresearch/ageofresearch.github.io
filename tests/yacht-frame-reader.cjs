// Read one unmodified production render pass; test-only GPU readback.
module.exports = (frame) => () =>
  frame.evaluate(async () => {
    const app = window.__app;
    const first = app.gpu.frame;
    return new Promise((resolve, reject) => {
      const original = app.frame;
      app.frame = function (dt) {
        if (app.gpu.frame - first < 16) return original(dt);
        app.frame = original;
        try {
          const gpu = app.gpu,
            engine = app.engine;
          const width = engine.width,
            height = engine.height;
          const image = gpu.device.createTexture({
            size: [width, height],
            format: app.gangwayOnly ? gpu.format : app.post.outputFormat,
            usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
          });
          const compact = app.gangwayOnly === true;
          const previous = compact ? engine.currentTexture : app.post.outputTexture;
          const passLabels = [];
          let indexedDraws = 0,
            indexedTriangles = 0;
          const draw = GPURenderPassEncoder.prototype.drawIndexed;
          GPURenderPassEncoder.prototype.drawIndexed = function (...args) {
            indexedDraws++;
            indexedTriangles += (args[0] / 3) * (args[1] ?? 1);
            return draw.apply(this, args);
          };
          let resolved = false;
          const originalRender = GPUCommandEncoder.prototype.beginRenderPass;
          const originalCompute = GPUCommandEncoder.prototype.beginComputePass;
          GPUCommandEncoder.prototype.beginRenderPass = function (desc) {
            passLabels.push(desc.label);
            resolved ||= Boolean(desc.colorAttachments[0]?.resolveTarget);
            return originalRender.call(this, desc);
          };
          GPUCommandEncoder.prototype.beginComputePass = function (desc) {
            passLabels.push('compute');
            return originalCompute.call(this, desc);
          };
          if (compact) engine.currentTexture = () => image;
          else app.post.outputTexture = { view: (options) => image.createView(options) };
          try {
            original(dt);
          } finally {
            if (compact) engine.currentTexture = previous;
            else app.post.outputTexture = previous;
            GPURenderPassEncoder.prototype.drawIndexed = draw;
            GPUCommandEncoder.prototype.beginRenderPass = originalRender;
            GPUCommandEncoder.prototype.beginComputePass = originalCompute;
          }
          // A later animation frame can submit only the moving flag region.
          // Capture the model counter for the same pass as the GPU draw calls.
          const reportedTriangles = compact ? app.entranceYacht.stats.triangles : null;
          const stride = Math.ceil((width * 4) / 256) * 256;
          const output = gpu.device.createBuffer({
            size: stride * height,
            usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
          });
          const encoder = gpu.device.createCommandEncoder();
          encoder.copyTextureToBuffer({ texture: image }, { buffer: output, bytesPerRow: stride }, [
            width,
            height,
          ]);
          gpu.queue.submit([encoder.finish()]);
          output.mapAsync(GPUMapMode.READ).then(() => {
            const data = new Uint8Array(output.getMappedRange());
            const bgra = image.format.startsWith('bgra');
            const segments = [];
            for (let y = 0; y < height; y++) {
              const row = data.slice(y * stride, y * stride + width * 4);
              if (bgra) for (let x = 0; x < row.length; x += 4) [row[x], row[x + 2]] = [row[x + 2], row[x]];
              segments.push(String.fromCharCode(...row));
            }
            output.unmap();
            output.destroy();
            image.destroy();
            resolve({
              pixels: btoa(segments.join('')),
              width,
              height,
              passLabels,
              resolved,
              reportedTriangles,
              indexedDraws,
              indexedTriangles,
            });
          }, reject);
        } catch (e) {
          reject(e);
        }
      };
    });
  });
