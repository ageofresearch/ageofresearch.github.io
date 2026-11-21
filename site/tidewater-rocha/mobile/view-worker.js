import {filterSamples} from './sample-visibility.js?v=1';
import {filterView} from './view-volume.js?v=2';
let vertices, profiles, glazing, masks;
self.onmessage = ({data}) => {
  if (data.vertices) {
    ({vertices, profiles, glazing} = data);
    for(const g of Object.values(glazing))g.masks=new Uint8Array(g.vertices.length/32);
    masks = new Uint8Array(vertices.length / 32);
    self.postMessage(null);
    return;
  }
  if(data.pixels){
    const {pixels,width,height,stride,profile,first,count,clip,key}=data;
    const result=filterSamples(pixels,width,height,stride,vertices,profiles[profile],first,count,clip);
    self.postMessage({...result,key},[result.output.buffer]);return;
  }
  const {profile, first, count, planes, eye} = data;
  const slots = data.trackFaces ? new Uint32Array(count / 3) : null;
  const sky = data.basis && {basis:data.basis, runs:[]};
  const {output, length} = filterView(vertices, profiles[profile], first, count, planes, masks, eye, slots, sky);
  // Glazing keeps the original blend order. Only off-screen faces can drop.
  const g=glazing[profile], glass=filterView(g.vertices,g.indices,0,g.indices.length,planes,g.masks);
  glass.trimmed=glass.length<g.indices.length;
  const transfer = [output.buffer, glass.output.buffer];
  if (slots) transfer.push(slots.buffer);
  self.postMessage({output, length, glass, slots, skyRuns:sky?.runs}, transfer);
};
