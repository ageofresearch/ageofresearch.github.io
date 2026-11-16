import {renderedParts,surfaceTriangles,obstacles} from './stair-surfaces.js?v=gangway-teak-1';
import {supportedFloor} from './sun-deck-geometry.js?v=gangway-teak-1';
import {convexHull,distanceToFootprint} from './terrace-geometry.js?v=gangway-teak-1';

export const bridgeRoom={id:'UD_R03',deck:'UD',name:'Puente de mando',displayName:'Puente de mando',
  spawn:[20.5,0,7.6],look:[23.2,0,7.1]};
// Existing room finish bounds, not a second floor or a surveyed enclosure.
export const bridgeFinishBounds={start:19.53379,end:23.70591,minY:-2.09451,maxY:2.07762};
export const bridgeRoute=[[17.2,0],[17.2,1.7],[20.5,1.7],[20.5,0]];
export function prepareBridgeFloor({floor,collisionFootprints,domains}) {
  const physical=supportedFloor(floor,collisionFootprints);
  const contains=(x,y)=>domains.some(p=>distanceToFootprint(x,y,p)<1e-7);
  const safe=supportedFloor(domains,[]);
  return {contains,floorSafe:(x,y,r=.14)=>physical(x,y,r),mobileSafe:(x,y,r=.14)=>safe(x,y,r)&&physical(x,y,r)};
}
export function describeBridgeFloor(model) {
  const parts=renderedParts(model),glass=parts.filter(p=>/^UD_GLA_00[5-9]$|^UD_GLA_01[0-2]$/.test(p.anchor||p.id));
  if(glass.length!==8)throw Error('Incomplete bridge glazing');
  const perimeter=convexHull(glass.flatMap(p=>Array.from({length:p.vertices.length/6},(_,i)=>[p.vertices[i*6],p.vertices[i*6+1]])));
  // Connect the ends of the existing side glazing without opening the exterior
  // side decks. Glass and the stair well still provide their physical collision.
  const domains=[perimeter,[[18.3,-2.5224],[19.85,-2.19644],[19.85,2.01065],[18.3,2.116]]];
  const floor=parts.filter(p=>(p.anchor||p.id.split('/')[0])==='UD_DCK_001').flatMap(p=>surfaceTriangles(p,6,.002));
  const collisionFootprints=obstacles(parts,new Set(),[18,-2.8,6,24,2.5,7.65],{includeVerticalFaces:true}).footprints(6);
  return {floor,collisionFootprints,domains,...prepareBridgeFloor({floor,collisionFootprints,domains})};
}
export function configureBridgeFloor(nav,model) {
  const bridge=describeBridgeFloor(model),previous=nav.floorSafe.bind(nav);
  const flight=model.stairInventory.flights.find(f=>f.id==='bridge');
  // At the full yacht's stair mouth the body can straddle the last tread and
  // landing. Reuse the existing flight's support/clearance there; the mobile
  // floor deliberately does not install that flight or open its stair well.
  const landingSafe=(x,y)=>flight?.safe(x,y,nav.radius,flight.riseCount)?.index===flight.riseCount;
  nav.floorSafe=(x,y,deck=nav.deck)=>deck==='UD'&&bridge.contains(x,y)?
    (bridge.floorSafe(x,y,nav.radius)||landingSafe(x,y)):previous(x,y,deck);
  model.bridgeFloor=bridge;
  model.asset.data={...model.asset.data,rooms:model.asset.data.rooms.map(r=>r.id===bridgeRoom.id?{...r,...bridgeRoom}:r)};
}
