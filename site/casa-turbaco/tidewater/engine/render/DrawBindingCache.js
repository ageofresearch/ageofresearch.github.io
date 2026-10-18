/** Per drawItems invocation only. Never carry state across a render pass or callback. */
export class DrawBindingCache {
  constructor(pass) {
    this.pass = pass;
    this.vertices = [];
    this.indexBuffer = null;
    this.indexFormat = null;
    this.drawGroup = null;
    this.drawOffset = -1;
    this.offsets = new Uint32Array(1);
  }
  bindObject(group, offset) {
    if (group === this.drawGroup && offset === this.drawOffset) return;
    this.offsets[0] = offset;
    this.pass.setBindGroup(2, group, this.offsets, 0, 1);
    this.drawGroup = group;
    this.drawOffset = offset;
  }
  bindVertex(slot, buffer) {
    if (this.vertices[slot] === buffer) return;
    this.pass.setVertexBuffer(slot, buffer);
    this.vertices[slot] = buffer;
  }
  bindIndex(buffer, format) {
    if (this.indexBuffer === buffer && this.indexFormat === format) return;
    this.pass.setIndexBuffer(buffer, format);
    this.indexBuffer = buffer;
    this.indexFormat = format;
  }
}
