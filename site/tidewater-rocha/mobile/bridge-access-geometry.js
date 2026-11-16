import {renderedParts,surfaceTriangles,obstacles} from './stair-surfaces.js?v=gangway-teak-1';
import {supportedFloor} from './sun-deck-geometry.js?v=gangway-teak-1';

export const accessRoom={id:'MD_R07',deck:'MD',name:'Vestíbulo interior',displayName:'Vestíbulo interior',
  spawn:[18.5,1.35,5.55],look:[19.16,1.1,5.2],bbox:[17.65,-.05,19.7,1.8],label:[18.5,1.35],
  type:'Interior circulation',status:'T/I',source:'Provisional shared model'};
export const accessRoute=[[17,.2],[18.35,.2],[18.5,1.35],[19.16,1.35],[19.16,1.15],
  [19.16,1.1],[19.16,-1.62],[19.16,-1.8],[19.78,-1.8],[19.78,-1.25],[20.5,-1.25],[20.5,0]];
export const accessDomains=[[[17.65,-.05],[19.7,-.05],[19.7,1.8],[17.65,1.8]]];
export const inAccess=(x,y)=>x>=17.65&&x<=19.7&&y>=-.05&&y<=1.8;
export const accessProfileDomain=(x,y)=>x>=17.1&&x<=19.7&&y>=-.05&&y<=1.8;

// One watertight concave solid, preserving the original ends and wall thickness.
// These are model circulation adjustments, not measured boat dimensions.
export const recessedPartition=[[18,1.38887],[18.2,1.38887],[18.2,1.63887],[19.5,1.63887],
  [19.5,1.38887],[19.63299,1.38887],[19.63299,1.46887],[19.58,1.46887],
  [19.58,1.71887],[18.12,1.71887],[18.12,1.46887],[18,1.46887]];
export function refineBridgeAccess(detail,asset,{box,slab,bounds,materials}) {
  if(!detail)return;
  const make=(g,feature,material='M06',extra={})=>({...g,id:'MD_PAR_004/access/'+feature.replaceAll(' ','-'),
    anchor:'MD_PAR_004',sourceIDs:['MD_PAR_004'],deck:'MD',interior:true,category:'Partitions',
    semanticParent:accessRoom.id,feature,materialID:material,finish:materials[material],bounds:bounds(g),
    evidence:'Provisional model; approved local galley partition recess',...extra});
  detail.replacements.set('MD_PAR_004',[make(slab(recessedPartition,3.95,5.86,0),'recessed galley partition')]);
  const oldSkirts=detail.additions.filter(p=>p.anchor==='MD_PAR_004');
  detail.additions=detail.additions.filter(p=>p.anchor!=='MD_PAR_004');
  // Continuous strips follow both faces, with mitred returns at each corner.
  for(const [side,path]of [['front',recessedPartition.slice(0,6)],['back',recessedPartition.slice(6)]]){
    const normals=path.slice(1).map((p,i)=>{const a=path[i],d=Math.hypot(p[0]-a[0],p[1]-a[1]);return [(p[1]-a[1])/d,-(p[0]-a[0])/d];});
    const outer=path.map((p,i)=>{const a=normals[Math.max(0,i-1)],b=normals[Math.min(i,normals.length-1)],den=1+a[0]*b[0]+a[1]*b[1];return p.map((v,k)=>v+.003*(a[k]+b[k])/den);});
    const old=oldSkirts[side==='front'?0:1];
    detail.additions.push(make(slab([...path,...outer.toReversed()],3.958,3.995,0),side+' recessed skirting',old?.materialID||'M06',old?.finish?{finish:old.finish}:{}));
  }
  for(const p of detail.additions.filter(p=>p.anchor==='MD_PAR_001')) {
    if(/\/00[01]$/.test(p.id)){
      const b=p.bounds.slice();b[1]=Math.max(.68,b[1]);Object.assign(p,box(b,0));p.bounds=b;
    }else if(/\/002$/.test(p.id)){
      p.vertices=Array.from(p.vertices);for(let i=1;i<p.vertices.length;i+=6)p.vertices[i]+=.29;
      p.bounds=bounds(p);
    }
  }
  detail.objects=[...detail.replacements.values()].flat().concat(detail.additions);
}

export function prepareAccessFloor({floor,collisionFootprints}) {
  const physical=supportedFloor(floor,collisionFootprints);
  // The aft edge joins the existing saloon slab; the other three sides are
  // pending-area limits and must contain the entire body, not just its centre.
  const limitSafe=(x,y,r=.14)=>x+r<=19.7&&y-r>=-.05&&y+r<=1.8;
  return {floorSafe:physical,limitSafe,contains:inAccess};
}
export function describeAccessFloor(model) {
  const parts=renderedParts(model),floor=parts.filter(p=>(p.anchor||p.id.split('/')[0])==='MD_DCK_001').flatMap(p=>surfaceTriangles(p,3.95,.002));
  const collisionFootprints=obstacles(parts,new Set(),[16.9,-.3,3.95,19.9,2,5.6],{includeVerticalFaces:true}).footprints(3.95);
  return {floor,collisionFootprints,domains:accessDomains,...prepareAccessFloor({floor,collisionFootprints})};
}
export function configureAccessFloor(nav,model) {
  const access=describeAccessFloor(model),floor=nav.floorSafe.bind(nav),location=nav.location.bind(nav),nearest=nav.nearest.bind(nav);
  const flight=model.stairInventory.flights.find(f=>f.id==='bridge');
  // Include the galley-facing body margin of the moved wall in the full yacht.
  // Its former raster mask still describes the original straight partition.
  const changedWall=(x,y)=>x>=17.85&&x<=19.79&&y>=1.23&&y<=1.87;
  nav.floorSafe=(x,y,deck=nav.deck)=>deck==='MD'&&(inAccess(x,y)||changedWall(x,y))?
    access.floorSafe(x,y,nav.radius)||flight?.safe(x,y,nav.radius,0)?.index===0:floor(x,y,deck);
  nav.location=()=>nav.deck==='MD'&&!nav.stair&&inAccess(...nav.position)?accessRoom:location();
  nav.nearest=(x,y,deck=nav.deck)=>deck==='MD'&&inAccess(x,y)?accessRoom.spawn.slice(0,2):nearest(x,y,deck);
  model.bridgeAccessFloor=access;
  model.asset.data={...model.asset.data,rooms:[...model.asset.data.rooms.filter(r=>r.id!==accessRoom.id),accessRoom]};
}
