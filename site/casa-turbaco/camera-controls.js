// Mouse movement looks around immediately. Touch keeps drag/pinch semantics;
// moving over the interface never moves the camera behind it.
export class ScenePointerControls {
 constructor({canvas,input,state,isBlocked=()=>false,onInteract=()=>{},onPauseChange=()=>{}}){
  Object.assign(this,{canvas,input,state,isBlocked,onInteract,onPauseChange});this.pointers=new Map();this.lastMouse=null;this.pinch=0;this.enabled=true;
  input.externalLook=true;canvas.style.touchAction='none';
  canvas.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')this.lastMouse=[e.clientX,e.clientY]});
  canvas.addEventListener('pointerleave',()=>{this.lastMouse=null});
  canvas.addEventListener('pointerdown',e=>{
   if(this.isBlocked())return;
   if(e.pointerType==='mouse'){if(!this.enabled)this.setEnabled(true);this.lastMouse=[e.clientX,e.clientY];this.onInteract();return;}
   this.pointers.set(e.pointerId,[e.clientX,e.clientY]);canvas.setPointerCapture?.(e.pointerId);this.onInteract();
   if(this.pointers.size===2){const [a,b]=this.pointers.values();this.pinch=Math.hypot(a[0]-b[0],a[1]-b[1]);}
  });
  canvas.addEventListener('pointermove',e=>this.move(e));
  const up=e=>{this.pointers.delete(e.pointerId);if(this.pointers.size<2)this.pinch=0};
  canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
 }
 setEnabled(value){this.enabled=value;this.lastMouse=null;this.input.look.x=this.input.look.y=0;this.onPauseChange(value)}
 move(e){
  if(this.isBlocked()){this.lastMouse=null;return;}
  let dx=0,dy=0;
  if(e.pointerType==='mouse'){
   const previous=this.lastMouse;this.lastMouse=[e.clientX,e.clientY];
   if(!this.enabled||!previous)return;
   dx=this.input.locked?e.movementX:e.clientX-previous[0];dy=this.input.locked?e.movementY:e.clientY-previous[1];
  }else{
   const old=this.pointers.get(e.pointerId);if(!old)return;
   dx=e.clientX-old[0];dy=e.clientY-old[1];this.pointers.set(e.pointerId,[e.clientX,e.clientY]);
   if(this.pointers.size===2){const [a,b]=this.pointers.values(),distance=Math.hypot(a[0]-b[0],a[1]-b[1]);if(this.pinch&&distance>1)this.state.orbit.distance=Math.max(5,Math.min(80,this.state.orbit.distance*this.pinch/distance));this.pinch=distance;return;}
  }
  if(!Number.isFinite(dx)||!Number.isFinite(dy)||Math.abs(dx)+Math.abs(dy)<.1)return;
  if(this.state.mode==='top')return;
  this.onInteract();
  if(this.state.mode==='orbit'){const o=this.state.orbit;o.az-=dx*.004;o.el=Math.max(.08,Math.min(1.48,o.el+dy*.003));}
  else if(this.state.mode==='walk'){this.input.look.x+=dx;this.input.look.y+=dy;}
 }
}
