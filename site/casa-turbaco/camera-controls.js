// Tidewater captures the pointer on a scene click. Its Input collects relative
// movementX/Y, so looking continues past the screen edges with no button held.
// Keep that mouse path intact; adapt orbiting and touch to the same look buffer.
export class ScenePointerControls {
 constructor({canvas,input,state,isBlocked=()=>false,onInteract=()=>{},onLockChange=()=>{},onLockError=()=>{}}){
  Object.assign(this,{canvas,input,state,isBlocked,onInteract,onLockChange,onLockError});
  this.document=canvas.ownerDocument;this.pointers=new Map();this.pinch=0;this.pointerType='mouse';
  canvas.style.touchAction='none';
  canvas.addEventListener('click',e=>{if(e.button===0&&this.pointerType==='mouse')this.requestLock()});
  canvas.addEventListener('pointerdown',e=>{
   this.pointerType=e.pointerType;
   if(e.pointerType==='mouse'||this.isBlocked()||this.state.mode==='top')return;
   this.pointers.set(e.pointerId,[e.clientX,e.clientY]);canvas.setPointerCapture?.(e.pointerId);this.onInteract();
   if(this.pointers.size===2){const [a,b]=this.pointers.values();this.pinch=Math.hypot(a[0]-b[0],a[1]-b[1]);}
  });
  canvas.addEventListener('pointermove',e=>this.moveTouch(e));
  const up=e=>{this.pointers.delete(e.pointerId);if(this.pointers.size<2)this.pinch=0};
  canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
  this.document.addEventListener('pointerlockchange',()=>{this.clearInput();this.onLockChange(this.locked)});
  this.document.addEventListener('pointerlockerror',()=>this.onLockError());
  this.document.addEventListener('visibilitychange',()=>{if(this.document.hidden)this.release()});
  this.document.defaultView.addEventListener('blur',()=>this.release());
 }
 get locked(){return this.document.pointerLockElement===this.canvas}
 clearInput(){
  this.input.consumeLook();this.input.keys.clear();this.input.pressed.clear();
  this.input.mouseDown=false;this.input.rightDown=false;this.pointers.clear();this.pinch=0;
 }
 requestLock(){
  if(this.isBlocked()||this.state.mode==='top'||this.locked)return;
  if(!this.canvas.requestPointerLock){this.onLockError();return;}
  this.clearInput();this.canvas.focus({preventScroll:true});this.onInteract();
  this.input.requestLock();
 }
 release(){this.clearInput();if(this.locked)this.document.exitPointerLock()}
 update(){
  const blocked=this.isBlocked()||this.state.mode==='top';
  this.input.enabled=!blocked;
  if(blocked){this.release();return;}
  if(this.input.look.x||this.input.look.y)this.onInteract();
  if(this.state.mode==='orbit'){
   // Same sensitivity and direction as Tidewater's third-person orbit camera.
   const look=this.input.consumeLook(),o=this.state.orbit;
   o.az-=look.x*.003;o.el=Math.max(.08,Math.min(1.48,o.el+look.y*.003));
  }
  // Walking uses the unmodified Tidewater FlyCamera (0.0022 rad per pixel).
 }
 moveTouch(e){
  if(e.pointerType==='mouse'||this.isBlocked()||this.state.mode==='top')return;
  const old=this.pointers.get(e.pointerId);if(!old)return;
  const dx=e.clientX-old[0],dy=e.clientY-old[1];this.pointers.set(e.pointerId,[e.clientX,e.clientY]);
  if(this.pointers.size===2){
   const [a,b]=this.pointers.values(),distance=Math.hypot(a[0]-b[0],a[1]-b[1]);
   if(this.state.mode==='orbit'&&this.pinch&&distance>1)this.state.orbit.distance=Math.max(5,Math.min(80,this.state.orbit.distance*this.pinch/distance));
   this.pinch=distance;return;
  }
  this.input.look.x+=dx;this.input.look.y+=dy;
 }
}
