import {cabinDoor,cabinBounds,portCabin} from './port-guest-cabin.js?v=port-guest-1';
import {renderedParts,surfaceTriangles,obstacles} from './stair-surfaces.js?v=port-guest-1';
import {supportedFloor} from './sun-deck-geometry.js?v=port-guest-1';

export const guestRoom={id:'LD_R11',deck:'LD',name:'Distribuidor inferior de popa',displayName:'Distribuidor inferior de popa',
  spawn:[16.8,-.1,3.15],look:[14.5,-.1,3],bbox:[13.34178,-.55668,17.545,.35256],label:[15.7,-.1],
  type:'Interior circulation',status:'T/I',source:'Provisional shared model'};
export const guestLandings={lower:[17.210263340389897,-.0167544467966324],upper:[17.2,-1.42]};
export const guestApproach=[[14.4,0],[14.7,-1.3],[15.15,-1.6],[15.8,-1.8],[17.2,-1.6],[17.2,-1.4],[17.2,-1.42]];
// Use the width of the upper stair portal for the prepared-visibility strip
// around its main-deck approach.
const approachRadius=.76/2;
const approachX=guestApproach.map(([x])=>x),approachY=guestApproach.map(([,y])=>y);
const approachBounds=[Math.min(...approachX)-approachRadius,Math.min(...approachY)-approachRadius,
  Math.max(...approachX)+approachRadius,Math.max(...approachY)+approachRadius];
export function onGuestApproach(x,y) {
  if(x<approachBounds[0]||y<approachBounds[1]||x>approachBounds[2]||y>approachBounds[3])return false;
  for(let i=1;i<guestApproach.length;i++){
    const [ax,ay]=guestApproach[i-1],[bx,by]=guestApproach[i];
    const dx=bx-ax,dy=by-ay;
    const along=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy)));
    if((x-ax-along*dx)**2+(y-ay-along*dy)**2<=approachRadius*approachRadius)return true;
  }
  return false;
}
// The lower stair portal is oblique. Its shared edge must admit a whole
// visitor, as must the connection from the distributor through both jambs.
const [aft,inner,forward,outer]=cabinBounds;
export const guestDomains=[
  [[13.34178,-.55668],[17.241106666666665,-.55668],[17.544186666666665,.35256],[13.34178,.35256]],
  [[cabinDoor.aft,.29],[cabinDoor.forward,.29],[cabinDoor.forward,inner],[cabinDoor.aft,inner]],
  [[aft,inner],[forward,inner],[forward,outer],[aft,outer]]
];
export const inGuest=(x,y)=>x>=13.34178&&y>=-.55668&&y<=.35256&&x<=17.4+(y+.08)/3+1e-7;
const inCabin=(x,y)=>x>=aft&&x<=forward&&y>=inner&&y<=outer;
const inDoor=(x,y,r=0)=>x>=cabinDoor.aft+r&&x<=cabinDoor.forward-r&&y>=0&&y<=inner+.30;
export const lowerRoomAt=(x,y)=>inCabin(x,y)||inDoor(x,y)&&y>.37?portCabin:guestRoom;
const inGuestArea=(x,y)=>inGuest(x,y)||inCabin(x,y)||inDoor(x,y);
export const guestPortalDistance=(x,y)=>Math.hypot(x-17.4,y-Math.max(-1.8,Math.min(-1.04,y)));
export const guestProfileDomain=(x,y,current)=>guestPortalDistance(x,y)<=(current==='guest'?1:.6);

export function prepareGuestFloor({floor,collisionFootprints}) {
  const physical=supportedFloor(floor,collisionFootprints);
  // Do not erode the open portal connecting two real support surfaces. Only
  // the exterior boundaries and doorway jambs contain the entire body radius.
  const limitSafe=(x,y,r=.14)=>inDoor(x,y,r)||
    inGuest(x,y)&&x-r>=13.34178&&y-r>=-.55668&&y+r<=.35256||
    inCabin(x,y)&&x-r>=aft&&x+r<=forward&&y-r>=inner&&y+r<=outer;
  return {floorSafe:physical,limitSafe,contains:inGuestArea};
}
export function describeGuestFloor(model) {
  const parts=renderedParts(model);
  const floor=parts.filter(p=>(p.anchor||p.id.split('/')[0])==='LD_DCK_001')
    .flatMap(p=>surfaceTriangles(p,1.55,.002));
  const collisionFootprints=obstacles(parts,new Set(),[13.15,-2.3,1.55,19.8,3.69,3.2],{includeVerticalFaces:true}).footprints(1.55);
  return {floor,collisionFootprints,domains:guestDomains,...prepareGuestFloor({floor,collisionFootprints})};
}
export function configureGuestFloor(nav,model) {
  const guest=describeGuestFloor(model),floor=nav.floorSafe.bind(nav),location=nav.location.bind(nav),nearest=nav.nearest.bind(nav);
  const flight=model.stairInventory.flights.find(f=>f.id==='guest');
  nav.floorSafe=(x,y,deck=nav.deck)=>deck==='LD'&&inGuestArea(x,y)?
    guest.floorSafe(x,y,nav.radius)||flight.safe(x,y,nav.radius,0)?.index===0:
    deck==='MD'&&flight.safe(x,y,nav.radius,14)?.index===14?true:floor(x,y,deck);
  nav.location=()=>nav.deck==='LD'&&!nav.stair&&inGuestArea(...nav.position)?lowerRoomAt(...nav.position):location();
  nav.nearest=(x,y,deck=nav.deck)=>deck==='LD'&&inGuestArea(x,y)?lowerRoomAt(x,y).spawn.slice(0,2):nearest(x,y,deck);
  model.guestFloor=guest;
  // Keep the full viewer's original forward-passage name and extent. Only
  // the local location override and the shared safe destination change.
  model.asset.data={...model.asset.data,rooms:model.asset.data.rooms.map(r=>r.id===guestRoom.id?
    {...r,spawn:guestRoom.spawn,look:guestRoom.look}:r.id===portCabin.id?{...r,...portCabin}:r)};
}
