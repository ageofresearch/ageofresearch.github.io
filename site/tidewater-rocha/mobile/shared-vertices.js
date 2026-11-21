// Key the final GPU input, including the per-profile shadow receiver flag.
// The hash chooses a slot. Equality still checks all 32 bytes.
export function sharedVertices(capacity) {
  const packed = new Uint32Array(capacity * 8);
  const slots = new Uint32Array(2 ** Math.ceil(Math.log2(Math.max(2, capacity * 2))));
  const mask = slots.length - 1;
  let count = 0;
  function intern(words, start) {
    let hash = 2166136261;
    for (let k = 0; k < 8; k++) hash = Math.imul(hash ^ words[start+k], 16777619);
    let slot = (hash ^ (hash >>> 16)) & mask;
    while (slots[slot]) {
      const id = slots[slot] - 1;
      let k = 0;
      while (k < 8 && packed[id*8+k] === words[start+k]) k++;
      if (k === 8) return id;
      slot = (slot + 1) & mask;
    }
    const id = count++;
    for (let k = 0; k < 8; k++) packed[id*8+k] = words[start+k];
    slots[slot] = id + 1;
    return id;
  }
  return {
    remap(bytes, indices) {
      const words = new Uint32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4);
      const local = new Uint32Array(bytes.length / 32);
      for (let i = 0; i < local.length; i++) local[i] = intern(words, i*8);
      const out = count <= 65536 ? new Uint16Array(indices.length) : new Uint32Array(indices.length);
      for (let i = 0; i < out.length; i++) out[i] = local[indices[i]];
      return out;
    },
    finish() {
      return new Uint8Array(packed.buffer.slice(0, count * 32));
    },
  };
}
