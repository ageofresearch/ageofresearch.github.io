// One resolved, narrow-range half-float attachment supplies coverage evidence.
// Allocate on resize and reuse the same readback buffer across all settled views.
export function createVisibilityTarget(device, width, height) {
  const stride = Math.ceil((width * 8) / 256) * 256;
  // Bound auxiliary memory independently of the native yacht resolution.
  if (width * height > 1500000 || stride * height > device.limits.maxBufferSize) return null;
  const info = { size: [width, height], format: 'rgba16float' };
  let msaa,
    resolved,
    readback,
    pending = Promise.resolve(),
    busy = false,
    disposed = false;
  function dispose() {
    disposed = true;
    msaa?.destroy();
    resolved?.destroy();
    readback?.destroy();
  }
  try {
    msaa = device.createTexture({
      ...info,
      label: 'Yacht sample tags',
      sampleCount: 4,
      usage: GPUTextureUsage.RENDER_ATTACHMENT | (GPUTextureUsage.TRANSIENT_ATTACHMENT ?? 0),
    });
    resolved = device.createTexture({
      ...info,
      label: 'Resolved yacht sample tags',
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
    });
    readback = device.createBuffer({
      label: 'Yacht visibility readback',
      size: stride * height,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });
    const attachment = {
      view: msaa.createView(),
      resolveTarget: resolved.createView(),
      loadOp: 'clear',
      storeOp: 'discard',
      clearValue: [0, 0, 0, 0],
    };
    return {
      attachment,
      dispose,
      get pending() { return pending; },
      get busy() {
        return busy;
      },
      read(encoder, consume) {
        busy = true;
        encoder.copyTextureToBuffer({ texture: resolved }, { buffer: readback, bytesPerRow: stride }, [
          width,
          height,
        ]);
        // The enclosing frame submits synchronously. Map only after submission.
        pending=Promise.resolve().then(async () => {
          try {
            if (disposed) return;
            await readback.mapAsync(GPUMapMode.READ);
            if (disposed) return;
            const pixels = new Uint16Array(readback.getMappedRange()).slice();
            readback.unmap();
            consume(pixels, width, height, stride);
          } catch {
            /* The ordinary index list is always usable. */
          } finally {
            busy = false;
          }
        });
      },
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
