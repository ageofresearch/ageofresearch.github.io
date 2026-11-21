// Key the final GPU input, including the per-profile shadow receiver flag.
// Preserve triangle order and each profile's existing draw offsets.
export function sharedVertices(capacity) {
  const packed = new Uint8Array(capacity * 32);
  const ids = new Map();
  return {
    remap(bytes, indices) {
      const words = new Uint16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 2);
      const local = new Uint32Array(bytes.length / 32);
      for (let i = 0; i < local.length; i++) {
        const key = String.fromCharCode(...words.subarray(i * 16, i * 16 + 16));
        let id = ids.get(key);
        if (id === undefined) {
          id = ids.size;
          ids.set(key, id);
          packed.set(bytes.subarray(i * 32, i * 32 + 32), id * 32);
        }
        local[i] = id;
      }
      const Index = ids.size <= 65536 ? Uint16Array : Uint32Array;
      return Index.from(indices, i => local[i]);
    },
    finish() {
      const result = packed.slice(0, ids.size * 32);
      ids.clear();
      return result;
    },
  };
}
