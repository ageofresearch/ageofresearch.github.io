import {surfaceHeight} from './deck-navigation.js';
const NS='http://www.w3.org/2000/svg';
const svgElement=(tag,attrs={})=>{const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);return e;};
const xy=([x,y])=>[24+(4-y)*31,42+(36-x)*13];
const ring=p=>p.map(v=>xy(v).join(',')).join(' ');
export function polygonsOnDeck(area,deck){
 if(area.id==='saloon'||!area.polygons.length)return[{polygon:[[area.sourceRoomBounds[0],area.sourceRoomBounds[1]],[area.sourceRoomBounds[2],area.sourceRoomBounds[1]],[area.sourceRoomBounds[2],area.sourceRoomBounds[3]],[area.sourceRoomBounds[0],area.sourceRoomBounds[3]]]}];
 // An upper landing must not project the entire main-deck passage onto UD.
 return area.polygons.filter(p=>area.deck===deck.id||Math.max(...p.polygon.map(([x,y])=>surfaceHeight(p.height,x,y)))>=deck.floor-.05);
}
export function initDeckMap({structure,app,onSelect,button,dialog}){
 let selected='MD',last='',follow=true;
 const title=dialog.querySelector('#deck-map-title'),tabs=dialog.querySelector('.deck-tabs'),view=dialog.querySelector('.deck-map-view'),list=dialog.querySelector('.deck-map-rooms'),location=dialog.querySelector('.deck-location'),close=dialog.querySelector('.deck-map-close');
 const areaDeck=id=>structure.areas.find(a=>a.id===id)?.deck||'MD';
 function draw(){
  last='';const deck=structure.decks.find(d=>d.id===selected);title.textContent=deck.label;
  tabs.replaceChildren();for(const d of structure.decks){const b=document.createElement('button');b.textContent=d.label;b.setAttribute('aria-pressed',String(d.id===selected));b.onclick=()=>{selected=d.id;follow=false;draw();};tabs.append(b);}
  const svg=svgElement('svg',{viewBox:'0 0 296 548',role:'img','aria-label':'Distribución de '+deck.label.toLowerCase()});
  const text=(label,x,y,css)=>{const e=svgElement('text',{x,y,class:css});e.textContent=label;svg.append(e);};
  for(const f of deck.outlines){const path=f.exterior.map((p,i)=>(i?'L':'M')+xy(p).join(' ')).join(' ')+' Z '+f.holes.map(h=>h.map((p,i)=>(i?'L':'M')+xy(p).join(' ')).join(' ')+' Z').join(' ');svg.append(svgElement('path',{d:path,'fill-rule':'evenodd',class:'deck-outline'}));}
  for(const room of deck.rooms){const[x,y,xx,yy]=room.bounds,p=xy([xx,yy]),q=xy([x,y]);const r=svgElement('rect',{x:p[0],y:p[1],width:q[0]-p[0],height:q[1]-p[1],rx:2,class:'source-room'});const t=svgElement('title');t.textContent=room.label;r.append(t);svg.append(r);}
  const areas=structure.areas.filter(a=>a.deck===selected||a.upperDeck===selected);
  for(const a of areas){const polys=polygonsOnDeck(a,deck),primary=a.deck===selected,g=svgElement('g',primary?{class:'map-area','data-zone':a.id,role:'button',tabindex:0,'aria-label':'Ir a '+a.label}:{class:'deck-stair'});
   for(const p of polys)g.append(svgElement('polygon',{points:ring(p.polygon)}));
   if(!primary){const t=svgElement('title');t.textContent='Escalera desde la cubierta principal';g.append(t);svg.append(g);continue;}
   const t=svgElement('title');t.textContent=a.label;g.append(t);const select=()=>{app.controls.clear();dialog.close();onSelect(a.id);};g.onclick=select;g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();}};svg.append(g);
  }
  for(const room of deck.rooms){const b=room.bounds,[x,y]=xy([(b[0]+b[2])/2,(b[1]+b[3])/2]);const label=room.label.replace(' · ','\n').split('\n')[0];text(label,x,y,'room-label');}
  text('PROA',148,23,'map-direction');text('POPA',148,538,'map-direction');text('Babor',46,520,'map-side');text('Estribor',247,520,'map-side');
  const marker=svgElement('circle',{id:'deck-you',r:5.5,class:'deck-you'});svg.append(marker);view.replaceChildren(svg);
  list.replaceChildren();for(const room of deck.rooms){const a=areas.find(a=>a.sourceID===room.id),item=document.createElement(a?'button':'a');item.textContent=room.label;if(a){item.onclick=()=>{dialog.close();onSelect(a.id);};item.dataset.zone=a.id;}else{const u=new URL(structure.original);u.searchParams.set('walk',room.id);item.href=u;item.target='_blank';item.rel='noopener';item.setAttribute('aria-label',room.label+' · ver en el yate original');const tag=document.createElement('small');tag.textContent='Yate original ↗';item.append(tag);}list.append(item);}
  for(const a of areas.filter(a=>!a.sourceID&&a.deck===selected)){const item=document.createElement('button');item.textContent=a.label;item.dataset.zone=a.id;item.onclick=()=>{dialog.close();onSelect(a.id);};list.append(item);}update();
 }
 function update(){if(!dialog.open||!app.nav)return;const n=app.nav,key=[n.zone,...n.position.map(v=>v.toFixed(2)),n.elevation.toFixed(2)].join('|');if(last===key)return;
  const deckId=n.elevation>5.7?'UD':areaDeck(n.zone);if(follow&&selected!==deckId){selected=deckId;draw();return;}last=key;
  const a=structure.areas.find(a=>a.id===n.zone),marker=dialog.querySelector('#deck-you'),p=xy(n.position);marker.setAttribute('cx',p[0]);marker.setAttribute('cy',p[1]);marker.hidden=selected!==deckId;marker.style.display=selected===deckId?'':'none';location.textContent='Estás en '+(a?.label||n.zone).toLowerCase();
  for(const el of dialog.querySelectorAll('[data-zone]'))el.classList.toggle('current-zone',el.dataset.zone===n.zone);
 }
 button.onclick=()=>{app.controls.clear();follow=true;selected=app.nav?areaDeck(app.nav.zone):'MD';dialog.showModal();draw();close.focus();};close.onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{app.controls.clear();button.focus();});
 return{update,get open(){return dialog.open;}};
}
