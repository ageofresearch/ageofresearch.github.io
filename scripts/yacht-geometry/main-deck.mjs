import {renderedParts} from '../../site/tidewater-rocha/mobile/stair-surfaces.js';
import {normalizeRenderedPart,boundsOf} from '../build-yacht-saloon.mjs';
import {clipGeometry} from '../build-yacht-terrace.mjs';

export function extractMainDeck(model) {
  const parts=[];
  const aft=8.5,end=29.55;
  for(const source of renderedParts(model)){
    const anchor=source.anchor||source.id.split('/')[0],b=source.bounds;
    if(source.feature?.startsWith('forward side stair ')){
      parts.push({...normalizeRenderedPart(source,model),sourceID:anchor,role:'fore-stair'});
      continue;
    }
    if(source.feature?.startsWith('side deck ')){
      parts.push({...normalizeRenderedPart(source,model),sourceID:anchor,role:'main-side-guard'});
      continue;
    }
    // The cockpit extraction already supplies the whole boarding coaming and cap.
    if(source.id.startsWith('MD/boarding-route/'))continue;
    if(!b||b[3]<=aft||b[0]>end||b[5]<3.81||b[2]>6.03||
      !/^(MD_|UD_DCK|HULL_)/.test(anchor)||source.semanticParent==='stairs/bridge'||
      ['Cold_water','Hot_water','Drainage'].includes(source.category))continue;
    const part=normalizeRenderedPart(source,model);
    function add(x,y,X,Y,suffix='',role='main-deck'){
      const mesh=clipGeometry(part,[x,y,3.81,X,Y,6.03]);
      if(mesh.indices.length)parts.push({...part,...mesh,id:part.id+'/main-deck'+suffix,role,sourceID:anchor,bounds:boundsOf(mesh.vertices)});
    }
    // The prepared cockpit ends at 8.5. Keep its floor and overhead in full.
    // The prepared saloon slabs have different widths and forward ends.
    if(anchor==='MD_DCK_001'&&source.feature?.startsWith('stair opening')){
      add(aft,-4,22.4,-3.02,'-starboard','passage-floor');
      add(aft,3.02,22.4,4,'-port','passage-floor');
      add(17.83,-3.02,22.4,3.02);
      add(22.4,-4,end,4,'-forward');
    }else if(anchor==='UD_DCK_001'&&source.feature==='stair opening'){
      add(aft,-4,17.91,-3.13,'-starboard');
      add(aft,3.13,17.91,4,'-port');
      add(17.91,-4,end,4);
    }else add(aft,-4,end,4);
  }
  return parts;
}
