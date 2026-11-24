import encoded from './owner-contact-data.js?v=owner-contact-1';
export { ownerContactBounds, ownerContactSize, ownerContactWGSL } from './owner-contact-layout.js?v=owner-contact-1';
import { ownerContactSize } from './owner-contact-layout.js?v=owner-contact-1';

export function decodeOwnerContact() {
  const runs = atob(encoded), texels = new Uint8Array(ownerContactSize ** 2);
  let offset = 0;
  for (let i = 0; i < runs.length; i += 2) {
    const end = offset + runs.charCodeAt(i);
    texels.fill(runs.charCodeAt(i + 1), offset, end);
    offset = end;
  }
  if (offset !== texels.length) throw Error('Incomplete suite contact map');
  return texels;
}

export function uploadOwnerContact(device) {
  const data = decodeOwnerContact();
  const texture = device.createTexture({
    label: 'Owner suite floor contact', format: 'r8unorm',
    size: [ownerContactSize, ownerContactSize],
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
  });
  try {
    device.queue.writeTexture({ texture }, data, { bytesPerRow: ownerContactSize },
      [ownerContactSize, ownerContactSize]);
    return texture;
  } catch (error) {
    texture.destroy();
    throw error;
  }
}
