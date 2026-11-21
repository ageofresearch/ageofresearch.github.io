import {filterView} from './view-volume.js?v=1';
let vertices, profiles, masks;
self.onmessage = ({data}) => {
  if (data.vertices) {
    ({vertices, profiles} = data);
    masks = new Uint8Array(vertices.length / 32);
    self.postMessage(null);
    return;
  }
  const {profile, first, count, planes, eye} = data;
  const {output, length} = filterView(vertices, profiles[profile], first, count, planes, masks, eye);
  self.postMessage({output, length}, [output.buffer]);
};
