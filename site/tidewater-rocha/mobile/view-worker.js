import {filterSamples} from './sample-visibility.js?v=1';
import {hideOccluded} from './view-occlusion.js?v=1';
import {filterView, viewRadius} from './view-volume.js?v=1';
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
  const {output, length:visible} = filterView(vertices, profiles[profile], first, count, planes, masks, eye);
  const length=hideOccluded(vertices,output,visible,data.camera,viewRadius,data.nearReach,data.pixelAngle);
  // Glazing keeps the original blend order. Only off-screen faces can drop.
  const g=glazing[profile], glass=filterView(g.vertices,g.indices,0,g.indices.length,planes,g.masks);
  glass.trimmed=glass.length<g.indices.length;
  self.postMessage({output, length, glass}, [output.buffer,glass.output.buffer]);
};
