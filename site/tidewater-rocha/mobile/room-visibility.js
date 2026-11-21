// Each bit identifies an opaque triangle hidden throughout an eye cell. Bits
// address the original sightline prefix, before the worker trims its frustum.
export function roomCells(header, bits, profiles) {
  const ranges = new Map();
  let extent = 0;
  for (const region of header.regions) {
    const { profile, first, count, box, nx, nz, offset } = region;
    if (!profiles[profile] || ![first, count, nx, nz, offset].every(Number.isSafeInteger) ||
        first < 0 || count <= 0 || first % 3 || count % 3 || first + count > profiles[profile].length ||
        nx <= 0 || nz <= 0 || offset !== extent || box.length !== 6 || !box.every(Number.isFinite) ||
        box.some((v, i) => i < 3 && v >= box[i + 3])) throw Error('Invalid yacht visibility cell');
    const stride = Math.ceil(count / 24);
    extent += nx * nz * stride;
    if (!Number.isSafeInteger(extent) || extent > bits.length) throw Error('Incomplete yacht visibility data');
    if (!ranges.has(profile)) ranges.set(profile, new Map());
    const group = ranges.get(profile);
    if (group.has(first)) throw Error('Duplicate yacht visibility range');
    group.set(first, { box, count, offset, nx, nz, stride });
  }
  if (extent !== bits.length) throw Error('Incorrect yacht visibility data size');
  return {
    bits,
    range(profile, first, count) {
      const region = ranges.get(profile)?.get(first);
      return region && count >= region.count ? region : null;
    },
  };
}

export function roomCellOffset(region, camera, projection, width, height) {
  if (!region) return -1;
  const { box, nx, nz, stride, offset } = region;
  const x = camera[12], y = camera[13], z = camera[14];
  if (x < box[0] || x >= box[3] || y < box[1] || y > box[4] || z < box[2] || z >= box[5]) return -1;
  // The bake allows subpixel rasterization error and a sphere around the
  // entire near plane. A wider lens or a smaller viewport uses the full list.
  const fx = projection[0], fy = projection[5];
  const near = projection[14] / (1 + projection[10]);
  const nearReach = near * Math.hypot(1, (1 + Math.abs(projection[8])) / fx, (1 + Math.abs(projection[9])) / fy);
  if (!(Math.min(width * fx, height * fy) >= 800 && near > 0 && nearReach <= .065)) return -1;
  const col = Math.min(nx - 1, Math.floor((x - box[0]) * nx / (box[3] - box[0])));
  const row = Math.min(nz - 1, Math.floor((z - box[2]) * nz / (box[5] - box[2])));
  return offset + (row * nx + col) * stride;
}

export function filterRoomCell(bits, offset, prefixCount, indices, length, slots, output) {
  let write = 0;
  for (let i = 0; i < length; i += 3) {
    const face = slots[i / 3];
    if (face * 3 < prefixCount && (bits[offset + (face >>> 3)] & (1 << (face & 7)))) continue;
    output[write++] = indices[i];
    output[write++] = indices[i + 1];
    output[write++] = indices[i + 2];
  }
  return write;
}

export async function loadRoomVisibility(vertices, profiles, signal) {
  try {
    const timeout = AbortSignal.timeout(10000);
    const response = await fetch(new URL('./room-visibility.bin?v=1', import.meta.url),
      {signal:signal ? AbortSignal.any([timeout, signal]) : timeout});
    if (!response.ok) return null;
    const raw = await new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
    const size = new DataView(raw).getUint32(0, true);
    const header = JSON.parse(new TextDecoder().decode(new Uint8Array(raw, 4, size)));
    if (header.version !== 1) return null;
    async function matches(data, expected) {
      if (!data) return false;
      const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', data));
      return Array.from(digest, v => v.toString(16).padStart(2, '0')).join('') === expected;
    }
    // Indices and positions must both belong to the exact geometry used to
    // prove occlusion. Stale or unavailable data leave ordinary drawing active.
    if (!await matches(vertices, header.vertices)) return null;
    const names = new Set(header.regions.map(r => r.profile));
    for (const name of names) if (!await matches(profiles[name], header.indices[name])) return null;
    return roomCells(header, new Uint8Array(raw, 4 + size), profiles);
  } catch {
    return null;
  }
}
