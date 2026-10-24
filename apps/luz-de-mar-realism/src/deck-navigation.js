import {RoomNavigation,SX,SY} from './navigation.js';
export function inside(x,y,polygon){let hit=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const a=polygon[i],b=polygon[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;}
export class DeckNavigation {
 constructor(layout,saloon,{available=()=>true,onBoundary=()=>{},onZone=()=>{}}={}){Object.assign(this,{layout,available,onBoundary,onZone});this.saloon=new RoomNavigation(saloon);this.isolated=new Map();this.meta=saloon;this.radius=layout.radius;this.regions=layout.regions;this.position=[...saloon.room.spawn.slice(0,2)];this.zone='saloon';this.elevation=saloon.floor;}
 addIsolated(meta){this.isolated.set(meta.id,new RoomNavigation(meta));}
 eyeHeightAt(x,y){return this.isolated.get(this.zone)?.eyeHeightAt(x,y)??this.meta.camera?.eyeHeight??1.62;}
 get openRegister(){return this.isolated.get(this.zone)?.openRegister||false;}
 set openRegister(value){const room=this.isolated.get(this.zone);if(room)room.openRegister=!!value;}
 floors(x,y){
  const isolated=this.isolated.get(this.zone);if(isolated)return isolated.safe(x,y)?[{zone:this.zone,z:isolated.meta.floor}]:[];
  const candidates=this.regions.filter(r=>inside(x,y,r.polygon)).map(r=>({zone:r.zone,z:r.height.z0+(x-r.height.x0)*r.height.slope}));
  if(this.saloon.safe(x,y)||(x>=8.40&&x<=9.05&&Math.abs(y)<.68))candidates.push({zone:'saloon',z:3.95});return candidates;
 }
 footprint(x,y,z){
  const isolated=this.isolated.get(this.zone);if(isolated)return Math.abs(z-isolated.meta.floor)<.01&&isolated.safe(x,y);
  // The circular foot can span two adjacent regions: testing each rectangle
  // independently would leave an artificial gap at every portal.
  if(Math.abs(z-3.95)<.01&&this.saloon.safe(x,y))return true;
  for(let i=0;i<16;i++){const angle=i*Math.PI/8,a=x+Math.cos(angle)*this.radius/SX,b=y+Math.sin(angle)*this.radius/SY;if(!this.floors(a,b).some(f=>Math.abs(f.z-z)<.20))return false;}
  const rr=this.radius;for(const o of this.layout.obstacles){const[a,b,c,d]=o.bounds,dx=Math.max(a-x,0,x-c)*SX,dy=Math.max(b-y,0,y-d)*SY;if(Math.hypot(dx,dy)<rr&&this.floors(x,y).some(f=>f.zone===o.zone&&Math.abs(f.z-z)<.2))return false;}return true;
 }
 candidate(x,y,{ignoreAvailability=false,fromHeight=this.elevation}={}){
  const floors=this.floors(x,y).filter(f=>Math.abs(f.z-fromHeight)<.21).sort((a,b)=>b.z-a.z||(a.zone===this.zone?-1:1));
  for(const f of floors){if(!this.footprint(x,y,f.z))continue;if(!ignoreAvailability&&!this.available(f.zone)){this.onBoundary(f.zone);return null;}return f;}return null;
 }
 safe(x,y){return!!this.candidate(x,y);}
 setZone(id,position){
  const previous=this.zone;this.zone=id;
  const p=position.slice(0,2),floors=this.floors(...p).filter(f=>f.zone===id).sort((a,b)=>b.z-a.z);
  if(!floors.length||!this.footprint(...p,floors[0].z)){this.zone=previous;throw new Error('El punto de entrada no está libre: '+id);}
  this.zone=id;this.position=p;this.elevation=floors[0].z;this.onZone(id);
 }
 nearest(x,y){if(this.safe(x,y))return[x,y];let best=null;for(let ring=1;ring<60&&!best;ring++)for(let i=0;i<32;i++){const a=x+Math.cos(i*Math.PI/16)*ring*.05,b=y+Math.sin(i*Math.PI/16)*ring*.05;if(this.safe(a,b)){best=[a,b];break;}}if(!best)throw new Error('No hay suelo libre cerca');return best;}
 move(dx,dy){const steps=Math.max(1,Math.ceil(Math.hypot(dx*SX,dy*SY)/.02));for(let i=0;i<steps;i++){const[x,y]=this.position,a=x+dx/steps,b=y+dy/steps;for(const p of[[a,b],[a,y],[x,b]]){const f=this.candidate(...p);if(!f)continue;this.position=p;this.elevation=f.z;if(this.zone!==f.zone){this.zone=f.zone;this.onZone(f.zone);}break;}}return this.position;}
}
