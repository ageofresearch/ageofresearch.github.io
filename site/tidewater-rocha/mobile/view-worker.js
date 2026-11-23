import {filterSamples,patchGlass} from './sample-visibility.js?v=stern-flag-region-1';
import {filterView, prepareViewSpans} from './view-volume.js?v=stern-flag-1';
let vertices, profiles, glazing, masks, spans;
self.onmessage = ({data}) => {
  if (data.vertices) {
    ({vertices, profiles, glazing} = data);
    for(const g of Object.values(glazing))g.masks=new Uint8Array(g.vertices.length/32);
    masks = new Uint8Array(vertices.length / 32);
    spans = Object.fromEntries(Object.entries(profiles).map(([name, indices]) =>
      [name, prepareViewSpans(indices, masks.length)]));
    self.postMessage(null);
    return;
  }
  if(data.winners){
    const {winners,profile,first,count,key}=data;
    const source=data.candidates ?? profiles[profile];
    const start=data.candidates ? 0 : first, size=data.candidates ? source.length : count;
    const result=filterSamples(winners,vertices,source,start,size,data.windRect,data.clip);
    const transfer=[result.output.buffer];
    if(result.patch){
      const g=glazing[profile];
      result.patchGlass=patchGlass(g.vertices,g.indices,data.windRect,data.clip);
      transfer.push(result.patch.buffer,result.patchGlass.output.buffer);
    }
    self.postMessage({...result,key},transfer);return;
  }
  const {profile, first, count, planes, eye} = data;
  const slots = data.trackFaces ? new Uint32Array(count / 3) : null;
  const sky = data.basis && {basis:data.basis, runs:[]};
  const {output, length} = filterView(vertices, profiles[profile], first, count, planes, masks, eye, slots, sky, spans[profile]);
  // Glazing keeps the original blend order. Only off-screen faces can drop.
  const g=glazing[profile], glass=filterView(g.vertices,g.indices,0,g.indices.length,planes,g.masks);
  glass.trimmed=glass.length<g.indices.length;
  const transfer = [output.buffer, glass.output.buffer];
  if (slots) transfer.push(slots.buffer);
  self.postMessage({output, length, glass, slots, skyRuns:sky?.runs}, transfer);
};
