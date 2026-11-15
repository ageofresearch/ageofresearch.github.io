import {renderedParts,surfaceTriangles,obstacles} from './stair-surfaces.js?v=bow-deck-1';
import {supportedFloor,boundary} from './sun-deck-geometry.js?v=bow-deck-1';
import {indexFootprints} from './terrace-geometry.js?v=bow-deck-1';

export const bowRoom={id:'UD_R04',deck:'UD',name:'Estar de proa',displayName:'Estar de proa',
  spawn:[26.8,0,7.6],look:[28.7,0,6.8]};
export const bowEnd=29.4;
export const bowRoute=[[11,-2.5],[11.2,-3],[18.5,-3],[22.5,-2.7],[24,-2.65],[26.8,-2.3],[26.8,0]];
// Limits of this delivery, not invented walls. Actual slab and body clearance
// determine support inside these domains; the port passage remains pending.
export const bowDomains=[[[10.6,-4],[14.25,-4],[14.25,-2.1],[10.6,-2.1]],
  [[14.25,-4],[18.72,-4],[18.72,-2.55],[14.25,-2.55]],
  [[18.72,-4],[22.3,-4],[22.3,-2.1],[18.72,-2.55]],
  [[22.3,-4],[23.73,-4],[23.73,-1.55],[22.3,-2.1]],
  [[23.73,-4],[bowEnd,-4],[bowEnd,4],[23.73,4]]];
export function prepareBowFloor({floor,collisionFootprints,domains=bowDomains}) {
  const floorSafe=supportedFloor(floor,collisionFootprints),domainSafe=supportedFloor(domains,[]);
  const contains=indexFootprints(domains.map(polygon=>({polygon}))),hits=indexFootprints(collisionFootprints);
  return {contains:(x,y)=>contains(x,y,1e-7),floorSafe,clearanceSafe:(x,y,r=.14)=>!hits(x,y,r),
    mobileSafe:(x,y,r=.14)=>domainSafe(x,y,r)&&floorSafe(x,y,r)};
}
export function describeBowFloor(model) {
  const parts=renderedParts(model),floor=parts.filter(p=>(p.anchor||p.id.split('/')[0])==='UD_DCK_001')
    .flatMap(p=>surfaceTriangles(p,6,.002));
  const collisionFootprints=obstacles(parts,new Set(),[10.4,-4,6,29.6,4,7.65],{includeVerticalFaces:true}).footprints(6);
  const data={floor,collisionFootprints,domains:bowDomains};return {...data,...prepareBowFloor(data)};
}
export function configureBowFloor(nav,model) {
  if(!model.exterior?.bowDeck)return;
  const bow=describeBowFloor(model),previous=nav.floorSafe.bind(nav),location=nav.location.bind(nav),nearest=nav.nearest.bind(nav);
  nav.floorSafe=(x,y,deck=nav.deck)=>deck==='UD'&&bow.contains(x,y)?bow.floorSafe(x,y,nav.radius):previous(x,y,deck);
  nav.location=()=>nav.deck==='UD'&&!nav.stair&&bow.contains(...nav.position)?bowRoom:location();
  nav.nearest=(x,y,deck=nav.deck)=>deck==='UD'&&bow.contains(x,y)?bowRoom.spawn.slice(0,2):nearest(x,y,deck);
  model.bowFloor=bow;
  model.asset.data={...model.asset.data,rooms:model.asset.data.rooms.map(r=>r.id===bowRoom.id?{...r,...bowRoom}:r)};
}

export function refineBowDeck(detail,exterior,asset,{box,slab,tube,bounds,materials}) {
  if(!detail||!exterior)return;
  const make=(anchor,g,material,feature,extra={})=>({...g,id:anchor+'/bow/'+feature.replaceAll(' ','-'),anchor,
    deck:'UD',interior:false,semanticParent:'bow-deck',sourceIDs:[anchor],materialID:material,
    finish:materials[material],feature,bounds:bounds(g),evidence:'Provisional model; inferred guards and upholstery',...extra});
  // Keep the source envelopes and positions, including all four sofa modules.
  for(const id of ['UD_FUR_051','UD_SOF_023','UD_FUR_052']) {
    const s=asset.data.meshes.find(p=>p.id===id),b=s.bbox,cushion=id!=='UD_FUR_051';
    const radius=Math.min(cushion?.045:.025,(b[3]-b[0])/5,(b[4]-b[1])/5,(b[5]-b[2])/3);
    detail.replacements.set(id,[make(id,box(b,radius),cushion?'M39':'M43',s.name.toLowerCase())]);
  }
  const floor=detail.replacements.get('UD_DCK_001').flatMap(p=>surfaceTriangles(p,6,.002));
  const edges=boundary(floor),support=indexFootprints(floor.map(polygon=>({polygon})));
  // The existing aft guard uses this radial inset. Reuse its exact endpoint.
  const join=asset.data.nav.UD.floor[0].exterior.slice(0,-1).filter(p=>p[0]<10.9&&p[1]<0)
    .map(([x,y])=>{const d=Math.hypot(7.1-x,y);return [x+(7.1-x)/d*.09,y-y/d*.09];})
    .sort((a,b)=>b[0]-a[0])[0];
  const lines=[];
  for(const [a,b] of edges) {
    const starboard=a[1]<-2&&b[1]<-2,port=a[1]>2&&b[1]>2;
    if(!starboard&&!port)continue;
    const min=starboard?join[0]:23.73,dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy);
    if(Math.abs(dx)<1e-6||Math.max(a[0],b[0])<=min||Math.min(a[0],b[0])>=bowEnd)continue;
    const normal=[-dy/len,dx/len],lo=Math.max(0,Math.min((min-a[0])/dx,(bowEnd-a[0])/dx)),hi=Math.min(1,Math.max((min-a[0])/dx,(bowEnd-a[0])/dx));
    if(hi<=lo)continue;
    const inward=p=>p.map((v,k)=>v+normal[k]*.075);
    let start=inward([a[0]+dx*lo,a[1]+dy*lo]),end=inward([a[0]+dx*hi,a[1]+dy*hi]);
    if(starboard){if(Math.abs(start[0]-join[0])<.02)start=join.slice();if(Math.abs(end[0]-join[0])<.02)end=join.slice();}
    // Keep the scope plane exact after the inward offset.
    for(const p of [start,end])if(p[0]>bowEnd)p[0]=bowEnd;
    lines.push({start,end,normal,side:starboard?'starboard':'port'});
  }
  // Join adjacent inset edges at one shared corner instead of leaving rail gaps.
  for(const a of lines)for(const b of lines)if(a!==b&&a.side===b.side&&Math.hypot(a.end[0]-b.start[0],a.end[1]-b.start[1])<.08){
    const p=a.end.map((v,k)=>(v+b.start[k])/2);a.end=p;b.start=p;
  }
  const guards=[],posts=new Set();let index=0;
  const add=(g,m,feature,extra={})=>{const p=make('UD_DCK_001',g,m,'bow guard '+feature,extra);guards.push(p);detail.additions.push(p);};
  for(const {start,end,normal,side} of lines) {
    const spans=Math.ceil(Math.hypot(end[0]-start[0],end[1]-start[1])/1.25);
    const cross=w=>[start.map((v,k)=>v+normal[k]*w),end.map((v,k)=>v+normal[k]*w),end.map((v,k)=>v-normal[k]*w),start.map((v,k)=>v-normal[k]*w)];
    if(!cross(.048).every(p=>support(...p,1e-6)))throw Error('Unsupported bow guard '+JSON.stringify([start,end]));
    const extra={guardSide:side,guardPath:[start,end]};
    // One continuous assembly per straight edge; posts do not split the slab
    // or glass into overlapping capped solids.
    add(slab(cross(.048),6.005,6.2,0),'M37',`${index} white coaming`,extra);
    add(slab(cross(.004),6.25,6.99,0),'M37',`${index} clear panel`,{...extra,glass:true});
    add(tube([...start,7.02],[...end,7.02],.018,.018,8),'M19',`${index} cap rail`,extra);
    for(let i=0;i<=spans;i++) {
      const p=start.map((v,k)=>v+(end[k]-v)*i/spans),key=p.map(v=>v.toFixed(5)).join(',');
      if(posts.has(key)||Math.hypot(p[0]-join[0],p[1]-join[1])<1e-5)continue;
      posts.add(key);add(tube([...p,6.08],[...p,7.02],.016,.016,6),'M19',`${index} post ${posts.size}`,extra);
    }
    index++;
  }

  detail.objects=[...detail.replacements.values()].flat().concat(detail.additions);
  exterior.bowDeck={version:'bow-deck-1',guards,join};
}
