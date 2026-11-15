import {renderedParts,surfaceTriangles,obstacles} from './stair-surfaces.js?v=upper-interior-1';
import {supportedFloor} from './sun-deck-geometry.js?v=upper-interior-1';

// Display coordinates from the current shared model, not surveyed dimensions.
export const interiorLimits={start:13.8,end:18.63233,minY:-2.5224,maxY:2.116};
export const interiorRoom={id:'UD_R02',deck:'UD',name:'Interior superior',displayName:'Interior superior',
  spawn:[14.8,0,7.6],look:[18.3,0,7.1]};
export function inUpperInterior(x,y) {
  return x>=interiorLimits.start&&x<=interiorLimits.end&&y>=interiorLimits.minY&&y<=interiorLimits.maxY;
}
export function prepareInteriorFloor({floor,collisionFootprints}) {
  const safe=supportedFloor(floor,collisionFootprints);
  const floorSafe=(x,y,r=.14)=>safe(x,y,r);
  const mobileSafe=(x,y,r=.14)=>x-r>=interiorLimits.start&&x+r<=interiorLimits.end&&
    y-r>=interiorLimits.minY&&y+r<=interiorLimits.maxY&&floorSafe(x,y,r);
  return {floorSafe,mobileSafe};
}
export function describeUpperInterior(model) {
  const parts=renderedParts(model);
  const floor=parts.filter(p=>(p.anchor||p.id.split('/')[0])==='UD_DCK_001').flatMap(p=>surfaceTriangles(p,6,.002));
  const clearance=obstacles(parts,new Set(),[13.6,-2.8,6,19,2.4,7.65]);
  const collisionFootprints=clearance.footprints(6);
  return {floor,collisionFootprints,...prepareInteriorFloor({floor,collisionFootprints})};
}
export function configureInteriorFloor(nav,model) {
  const interior=describeUpperInterior(model),previous=nav.floorSafe.bind(nav);
  // Discard stale R03 furniture masks only in the new room. The full yacht
  // keeps its bridge circulation beyond the mobile extraction boundary.
  nav.floorSafe=(x,y,deck=nav.deck)=>deck==='UD'&&inUpperInterior(x,y)?interior.floorSafe(x,y,nav.radius):previous(x,y,deck);
  model.upperInteriorFloor=interior;
  model.asset.data={...model.asset.data,rooms:model.asset.data.rooms.map(r=>r.id==='UD_R02'?{...r,...interiorRoom}:r)};
}
