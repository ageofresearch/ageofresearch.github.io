import {foreFlightDefinition} from './starboard-fore-stair.js?v=vr-detail-1';
import {indexFootprints} from './terrace-geometry.js?v=chair-fidelity-1';
import {supportedFloor} from './sun-deck-geometry.js?v=port-guest-1';
import {createFlight,installFlightNavigation,surfaceTriangles,renderedParts,obstacles} from './stair-surfaces.js?v=port-guest-1';

// These are registration bounds in the Rocha model, estimated from the VR stations.
const stations=[
  ['MD_R10','Pasillo exterior de babor',[8.45,3.13,22.4,3.79],[12,3.4],[19,3.35]],
  ['MD_R11','Pasillo exterior de estribor',[8.45,-3.79,22.4,-3.13],[12,-3.4],[19,-3.35]],
  ['MD_R12','Ducha del propietario',[27.3,-2.39,28.35,-1.31],[27.9,-1.9],[27.52,-2.3]],
  ['MD_R09','Entrada de servicio',[21.01,.55,21.94,1.4],[21.07,.62],[21.91,.94]],
  ['MD_R06','Aseo de día',[20.42,-3.18,22.18,-2.17],[21.46,-2.39],[21,-2.96]],
  ['MD_R08','Cocina',[17.89,1.44,22.43,2.96],[20.54,1.97],[21.76,2.58]],
  ['MD_R04','Suite del propietario',[22.6,-2.62,27.17,2.67],[25.76,-1.4],[24.7,.1]],
  ['MD_R05','Baño del propietario',[27.17,-2.53,29.31,2.47],[27.75,1.5],[28.95,1.59]],
  ['MD_R03','Pasillo principal',[17.82,-2.96,22.6,2.99],[21.2,-.18],[22.9,-.12]],
];
export const mainRooms=stations.map(([id,name,bbox,xy,look])=>({
  id,deck:'MD',name,displayName:name,bbox,spawn:[...xy,5.55],look:[...look,id==='MD_R09'?4.52:4.93],label:xy
}));
export const onSideDeck=(x,y)=>x>=4.55 && x<=22.4 && (y>2.94||y < -3.10);
export function inMainDeck(x,y){
  return onSideDeck(x,y)||x>=17.4&&x<=17.84&&y>1.65&&y<2.66||x>=17.83&&x<=29.31&&Math.abs(y)<=3.79;
}
export function describeMainDeck(model) {
  const parts=renderedParts(model);
  const floor=parts.filter(p=>(p.anchor||p.id.split('/')[0])==='MD_DCK_001')
    .flatMap(p=>surfaceTriangles(p,3.95,.002)).filter(t=>t.some(([x])=>x>=4.35));
  const all=obstacles(parts,new Set(),[4.35,-4,3.95,29.5,4,5.60],{includeVerticalFaces:true}).footprints(3.95);
  const collisionFootprints=[...new Map(all.map(({polygon})=>[JSON.stringify(polygon),{polygon}])).values()];
  const {steps,landings}=foreFlightDefinition();
  const supports=new Set(parts.filter(p=>p.feature?.startsWith('forward side stair ')&&/tread| stringer/.test(p.feature)));
  const foreClearance=obstacles(parts,supports,[18.25,-3.9,3.95,21.48,-2.5,7.65],{includeVerticalFaces:true});
  const surfaces=[{height:3.95,polygons:landings.lower},...steps,{height:6,polygons:landings.upper}];
  const foreObstacles=surfaces.map(({height,polygons:support})=>{
    const xy=support.flat(),xs=xy.map(p=>p[0]),ys=xy.map(p=>p[1]);
    // The body centre must be on this surface first. Keep every obstacle
    // within a visitor radius plus joint tolerance of any point on the tread.
    const pad=.20,l=Math.min(...xs)-pad,r=Math.max(...xs)+pad,b=Math.min(...ys)-pad,t=Math.max(...ys)+pad;
    const polygons=foreClearance.footprints(height).map(p=>p.polygon).filter(poly=>
      !poly.every(p=>p[0]<l)&&!poly.every(p=>p[0]>r)&&!poly.every(p=>p[1]<b)&&!poly.every(p=>p[1]>t));
    return {height,polygons:[...new Map(polygons.map(p=>[JSON.stringify(p),p])).values()]};
  });
  return {floor,collisionFootprints,foreObstacles};
}
export function connectMainDeck(nav,model,data,controls) {
  const safe=data.floorSafe??supportedFloor(data.floor,data.collisionFootprints);
  const previousFloor=nav.floorSafe.bind(nav);
  const previousLocation=nav.location.bind(nav);
  const previousNearest=nav.nearest.bind(nav);
  const vestibule=(x,y)=>x>=17.65&&x<=19.7&&y>=-.05&&y<=1.8;
  const roomAt=(x,y)=>mainRooms.find(({bbox:[l,b,r,t]})=>x>=l&&x<=r&&y>=b&&y<=t);
  const inBounds=(x,y)=>x+nav.radius<=29.31&&(x+nav.radius<=22.4||Math.abs(y)<2.94);
  nav.floorSafe=(x,y,deck=nav.deck)=>{
    if(deck!=='MD'||!inMainDeck(x,y))return previousFloor(x,y,deck);
    return inBounds(x,y)&&(safe(x,y,nav.radius)||vestibule(x,y)&&previousFloor(x,y,deck));
  };
  nav.location=()=>{
    const [x,y]=nav.position;
    if(nav.deck==='MD'&&!nav.stair&&inMainDeck(x,y)&&!vestibule(x,y))
      return roomAt(x,y)??nav.passages.MD;
    return previousLocation();
  };
  nav.nearest=(x,y,deck=nav.deck)=>{
    if(deck==='MD'&&inMainDeck(x,y)){
      if(nav.floorSafe(x,y,deck))return [x,y];
      const room=roomAt(x,y);
      if(room)return room.spawn.slice(0,2);
    }
    return previousNearest(x,y,deck);
  };
  const ids=new Set(mainRooms.map(r=>r.id));
  model.asset.data={...model.asset.data,rooms:model.asset.data.rooms.filter(r=>!ids.has(r.id)).concat(mainRooms)};
  if(controls){
    controls.rooms=controls.rooms.filter(r=>!ids.has(r.id)).concat(mainRooms);
    controls.syncLocation();
    if(controls.open)controls.renderRooms();
  }
  if(!nav.routes.some(route=>route.id==='starboard-fore')){
    const {route,steps,landings}=foreFlightDefinition();
    const obstaclesByHeight=new Map(data.foreObstacles.map(({height,polygons})=>[
      height,indexFootprints(polygons.map(polygon=>({polygon})))
    ]));
    const clear=(x,y,height,radius)=>!obstaclesByHeight.get(height)(x,y,radius);
    const flight=createFlight(route,{MD:3.95,UD:6},steps,landings,clear);
    const deckSafe=nav.floorSafe.bind(nav);
    nav.floorSafe=(x,y,deck=nav.deck)=>{
      const endpoint=deck==='MD'?0:deck==='UD'?flight.riseCount:-1;
      if(endpoint>=0 && x>18.3 && x<21.2 && y> -3.64 && y< -2.65 &&
          flight.safe(x,y,nav.radius,endpoint)?.index===endpoint)return true;
      return deckSafe(x,y,deck);
    };
    nav.routes.push(route);
    installFlightNavigation(nav,[flight]);
  }
  model.mainDeck=data;
}
