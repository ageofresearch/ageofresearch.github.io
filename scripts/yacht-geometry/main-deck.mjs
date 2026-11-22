import {renderedParts} from '../../site/tidewater-rocha/mobile/stair-surfaces.js';
import {normalizeRenderedPart,boundsOf} from '../build-yacht-saloon.mjs';
import {clipGeometry} from '../build-yacht-terrace.mjs';

export function extractMainDeck(model) {
  const parts=[];
  const volume=[7.5,-4,3.81,29.55,4,6.03];
  for(const source of renderedParts(model)){
    const anchor=source.anchor||source.id.split('/')[0], b=source.bounds;
    if(source.feature?.startsWith('side deck ')){
      const part=normalizeRenderedPart(source,model);
      parts.push({...part,sourceID:anchor,role:'main-side-guard'});
      continue;
    }
    // The boarding assembly already owns these complete aft coamings.
    if(source.id.startsWith('MD/boarding-route/'))continue;
    if(!b||b[3]<volume[0]||b[0]>volume[3]||b[5]<volume[2]||b[2]>volume[5])continue;
    if(!/^(MD_|MD\/boarding-route|UD_DCK|HULL_)/.test(anchor)||['Cold_water','Hot_water','Drainage'].includes(source.category))continue;
    const part=normalizeRenderedPart(source,model);
    const mesh=clipGeometry(part,volume);
    if(!mesh.indices.length)continue;
    parts.push({...part,...mesh,id:part.id+'/main-deck',role:'main-deck',sourceID:anchor,bounds:boundsOf(mesh.vertices)});
  }
  return parts;
}
