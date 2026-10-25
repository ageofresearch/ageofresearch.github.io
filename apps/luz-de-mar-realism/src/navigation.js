import {Vector3,Euler} from 'three';
export const SX=35.23/36,SY=7.47/7.6;
export const sourcePoint=p=>new Vector3(p[1]*SY,p[2]-2.01,p[0]*SX-17.615);
export const toSource=p=>[(p.z+17.615)/SX,p.x/SY,p.y+2.01];
export const register=[11.45,-.49,12.59,.49];
export function inRegister(x,y,r=.14,rect=register){return x>rect[0]-r&&x<rect[2]+r&&y>rect[1]-r&&y<rect[3]+r;}
export class RoomNavigation{
 constructor(meta){this.meta=meta;this.grid=meta.navigation;this.bits=Uint8Array.from(atob(this.grid.mask),c=>c.charCodeAt(0));this.openBits=meta.openDoorNavigation?Uint8Array.from(atob(meta.openDoorNavigation.mask),c=>c.charCodeAt(0)):null;this.doorOpen=false;this.openRegister=false;this.position=this.nearest(...meta.room.spawn);}
 safe(x,y){if(this.openRegister&&inRegister(x,y,.14,this.register||register))return false;const g=this.grid,fx=(x-g.x0)/g.step,fy=(y-g.y0)/g.step;
  const bits=this.doorOpen&&this.openBits?this.openBits:this.bits;return [...new Set([Math.floor(fx),Math.ceil(fx)])].every(ix=>[...new Set([Math.floor(fy),Math.ceil(fy)])].every(iy=>{const k=iy*g.nx+ix;return ix>=0&&iy>=0&&ix<g.nx&&iy<g.ny&&!!(bits[k>>3]&(1<<(k&7)));}));}
 nearest(x,y){if(this.safe(x,y))return[x,y];let best=Infinity,p;const g=this.grid;for(let iy=0;iy<g.ny;iy++)for(let ix=0;ix<g.nx;ix++){const a=g.x0+ix*g.step,b=g.y0+iy*g.step,d=(a-x)**2+(b-y)**2;if(d<best&&this.safe(a,b)){best=d;p=[a,b];}}if(!p)throw Error('No hay suelo disponible');return p;}
 move(dx,dy){const steps=Math.max(1,Math.ceil(Math.hypot(dx,dy)/.02));for(let i=0;i<steps;i++){const[x,y]=this.position,a=x+dx/steps,b=y+dy/steps;if(this.safe(a,b))this.position=[a,b];else if(this.safe(a,y))this.position=[a,y];else if(this.safe(x,b))this.position=[x,b];}return this.position;}
 eyeHeightAt(x,y){const h=this.headroom;if(!h)return this.meta.camera?.eyeHeight??1.62;const g=this.grid,fx=Math.max(0,Math.min(g.nx-1,(x-g.x0)/g.step)),fy=Math.max(0,Math.min(g.ny-1,(y-g.y0)/g.step)),ix=Math.floor(fx),iy=Math.floor(fy),ax=fx-ix,ay=fy-iy,sample=(a,b)=>h.values[Math.min(g.ny-1,b)*g.nx+Math.min(g.nx-1,a)]/255;const t=(1-ay)*((1-ax)*sample(ix,iy)+ax*sample(ix+1,iy))+ay*((1-ax)*sample(ix,iy+1)+ax*sample(ix+1,iy+1));return h.minimumEyeHeight+t*(h.maximumEyeHeight-h.minimumEyeHeight);}
}
export class WalkingControls{
 constructor(app){this.app=app;this.keys=new Set();this.disposers=[];this.yaw=0;this.pitch=0;const canvas=app.renderer.domElement;let pointer=null,last=[0,0];
  const on=(el,k,fn,o)=>{el.addEventListener(k,fn,o);this.disposers.push(()=>el.removeEventListener(k,fn,o));};
  on(window,'keydown',e=>{if(app.deckMap?.open)return;if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)||e.ctrlKey||e.metaKey||e.altKey)return;if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'].includes(e.code)){e.preventDefault();this.keys.add(e.code);app.invalidate(true);}if(e.code==='KeyE'&&!e.repeat)app.toggleDoor();});
  on(window,'keyup',e=>this.keys.delete(e.code));on(window,'blur',()=>this.clear());
  on(canvas,'pointerdown',e=>{pointer=e.pointerId;last=[e.clientX,e.clientY];canvas.setPointerCapture(pointer);});
  on(canvas,'pointermove',e=>{if(e.pointerId!==pointer)return;this.yaw-=(e.clientX-last[0])*.0022;this.pitch=Math.max(-1.35,Math.min(1.35,this.pitch-(e.clientY-last[1])*.0022));last=[e.clientX,e.clientY];this.apply();app.invalidate(true);});
  on(canvas,'pointerup',()=>pointer=null);on(canvas,'pointercancel',()=>pointer=null);
  for(const b of document.querySelectorAll('[data-move]')){const key=b.dataset.move;on(b,'pointerdown',e=>{e.preventDefault();this.keys.add(key);b.setPointerCapture(e.pointerId);app.invalidate(true);});for(const k of['pointerup','pointercancel','lostpointercapture'])on(b,k,()=>this.keys.delete(key));}
 }
 clear(){this.keys.clear();}
 bind(meta,nav=null){this.nav=nav||new RoomNavigation(meta);if(nav)nav.meta=meta;this.focus(meta.room.spawn,meta.room.look,false);}
 focus(position,target,move=true){if(move)this.nav.position=this.nav.nearest(...position);this.apply();const c=this.app.camera;c.lookAt(sourcePoint(target));const e=new Euler().setFromQuaternion(c.quaternion,'YXZ');this.yaw=e.y;this.pitch=e.x;this.clear();this.apply();this.app.invalidate();}
 apply(){if(!this.nav)return;const p=this.nav.position,eye=this.nav.eyeHeightAt?.(...p)??this.nav.meta.camera?.eyeHeight??1.62;this.app.camera.position.copy(sourcePoint([p[0],p[1],(this.nav.elevation??this.nav.meta.floor)+eye]));this.app.camera.rotation.set(this.pitch,this.yaw,0,'YXZ');}
 update(dt){if(!this.nav||this.app.loading||this.app.deckMap?.open||document.hidden)return false;const k=this.keys,f=Number(k.has('KeyW')||k.has('ArrowUp'))-Number(k.has('KeyS')||k.has('ArrowDown')),r=Number(k.has('KeyD')||k.has('ArrowRight'))-Number(k.has('KeyA')||k.has('ArrowLeft')),len=Math.hypot(f,r);if(!len)return false;const speed=(k.has('ShiftLeft')||k.has('ShiftRight')?2.6:1.4)*Math.min(.05,dt)/len;const dx=(-Math.sin(this.yaw)*f+Math.cos(this.yaw)*r)*speed,dz=(-Math.cos(this.yaw)*f-Math.sin(this.yaw)*r)*speed;this.nav.move(dz/SX,dx/SY);this.apply();this.app.preloadNear?.();return true;}
 dispose(){for(const d of this.disposers)d();}
}
