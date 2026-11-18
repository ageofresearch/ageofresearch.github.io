import {renderedParts,surfaceTriangles,obstacles} from './stair-surfaces.js?v=tour-fidelity-1';
import {supportedFloor} from './sun-deck-geometry.js?v=gangway-teak-1';

export const guestRoom={id:'LD_R11',deck:'LD',name:'Distribuidor inferior de popa',displayName:'Distribuidor inferior de popa',
  spawn:[16.8,-.1,3.15],look:[14.5,-.1,3],bbox:[13.34178,-.55668,17.545,.35256],label:[15.7,-.1],
  type:'Interior circulation',status:'T/I',source:'Provisional shared model'};
export const guestLandings={lower:[17.210263340389897,-.0167544467966324],upper:[17.2,-1.42]};
export const guestApproach=[[14.4,0],[14.7,-1.3],[15.15,-1.6],[15.8,-1.8],[17.2,-1.6],[17.2,-1.4],[17.2,-1.42]];
// The forward edge is the actual lower portal plane, not an x-only room box.
export const guestDomains=[[[13.34178,-.55668],[17.241106666666665,-.55668],
  [17.544186666666665,.35256],[13.34178,.35256]]];
export const inGuest=(x,y)=>x>=13.34178&&y>=-.55668&&y<=.35256&&x<=17.4+(y+.08)/3+1e-7;
export const guestPortalDistance=(x,y)=>Math.hypot(x-17.4,y-Math.max(-1.8,Math.min(-1.04,y)));
export const guestProfileDomain=(x,y,current)=>guestPortalDistance(x,y)<=(current==='guest'?1:.6);

export function prepareGuestFloor({floor,collisionFootprints}) {
  const physical=supportedFloor(floor,collisionFootprints);
  // Do not erode the open portal connecting two real support surfaces. Only
  // the three pending-area boundaries contain the entire body radius.
  const limitSafe=(x,y,r=.14)=>inGuest(x,y)&&x-r>=13.34178&&y-r>=-.55668&&y+r<=.35256;
  return {floorSafe:physical,limitSafe,contains:inGuest};
}
export function describeGuestFloor(model) {
  const parts=renderedParts(model);
  const floor=parts.filter(p=>(p.anchor||p.id.split('/')[0])==='LD_DCK_001')
    .flatMap(p=>surfaceTriangles(p,1.55,.002));
  const collisionFootprints=obstacles(parts,new Set(),[13.15,-2.3,1.55,19.8,.65,3.2],{includeVerticalFaces:true}).footprints(1.55);
  return {floor,collisionFootprints,domains:guestDomains,...prepareGuestFloor({floor,collisionFootprints})};
}
export function configureGuestFloor(nav,model) {
  const guest=describeGuestFloor(model),floor=nav.floorSafe.bind(nav),location=nav.location.bind(nav),nearest=nav.nearest.bind(nav);
  const flight=model.stairInventory.flights.find(f=>f.id==='guest');
  nav.floorSafe=(x,y,deck=nav.deck)=>deck==='LD'&&inGuest(x,y)?
    guest.floorSafe(x,y,nav.radius)||flight.safe(x,y,nav.radius,0)?.index===0:
    deck==='MD'&&flight.safe(x,y,nav.radius,14)?.index===14?true:floor(x,y,deck);
  nav.location=()=>nav.deck==='LD'&&!nav.stair&&inGuest(...nav.position)?guestRoom:location();
  nav.nearest=(x,y,deck=nav.deck)=>deck==='LD'&&inGuest(x,y)?guestRoom.spawn.slice(0,2):nearest(x,y,deck);
  model.guestFloor=guest;
  // Keep the full viewer's original forward-passage name and extent. Only
  // the local location override and the shared safe destination change.
  model.asset.data={...model.asset.data,rooms:model.asset.data.rooms.map(r=>r.id===guestRoom.id?
    {...r,spawn:guestRoom.spawn,look:guestRoom.look}:r)};
}
