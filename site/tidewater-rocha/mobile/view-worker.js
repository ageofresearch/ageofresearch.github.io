import {filterView} from './view-volume.js?v=1';
let vertices, profiles, glazing, masks;
self.onmessage = ({data}) => {
  if (data.vertices) {
    ({vertices, profiles, glazing} = data);
    for(const g of Object.values(glazing))g.masks=new Uint8Array(g.vertices.length/32);
    masks = new Uint8Array(vertices.length / 32);
    self.postMessage(null);
    return;
  }
  const {profile, first, count, planes, eye} = data;
  const {output, length} = filterView(vertices, profiles[profile], first, count, planes, masks, eye);
  // Glazing keeps the original blend order. Only off-screen faces can drop.
  const g=glazing[profile], glass=filterView(g.vertices,g.indices,0,g.indices.length,planes,g.masks);
  glass.trimmed=glass.length<g.indices.length;
  self.postMessage({output, length, glass}, [output.buffer,glass.output.buffer]);
};
