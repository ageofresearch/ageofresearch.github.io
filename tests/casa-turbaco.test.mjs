import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as T from '../site/casa-turbaco/tidewater/engine/index.js';
import {ShaderModule} from '../site/casa-turbaco/tidewater/engine/gpu/Shader.js';
import {SolidUnion} from '../site/casa-turbaco/solids.js';
import {buildHouse} from '../site/casa-turbaco/model.js';
import {ScenePointerControls} from '../site/casa-turbaco/camera-controls.js';
function area(geometry){const p=geometry.attributes.position,idx=geometry.index.array;let sum=0;for(let i=0;i<idx.length;i+=3){const a=new T.Vector3().fromBufferAttribute(p,idx[i]),b=new T.Vector3().fromBufferAttribute(p,idx[i+1]),c=new T.Vector3().fromBufferAttribute(p,idx[i+2]);sum+=b.sub(a).cross(c.sub(a)).length()/2}return sum}
const data=JSON.parse(fs.readFileSync(new URL('../site/casa-turbaco/plan-data.json',import.meta.url)));
let house;function model(){return house??=buildHouse(new T.Scene(),data,{module:new ShaderModule({name:'qaSky',code:''})},{add(){}})}
test('overlapping slabs expose a single closed boundary, including different materials',()=>{
 const union=new SolidUnion(),group=new T.Group();union.add([0,0,0],[2,2,2],{id:1},group);union.add([1,0,0],[2,2,2],{id:2},group);
 const meshes=union.build();assert(Math.abs(meshes.reduce((n,m)=>n+area(m.geometry),0)-32)<1e-5);
 const triangles=new Set();for(const {geometry:g} of meshes){const p=g.attributes.position,idx=g.index.array;for(let i=0;i<idx.length;i+=3){const q=[0,1,2].map(k=>new T.Vector3().fromBufferAttribute(p,idx[i+k]));const key=q.map(p=>p.toArray().join(',')).sort().join('|');assert(!triangles.has(key));triangles.add(key);const n=new T.Vector3().fromBufferAttribute(g.attributes.normal,idx[i]);assert(q[1].clone().sub(q[0]).cross(q[2].clone().sub(q[0])).dot(n)>0)}}
});
test('door openings remain open when adjacent walls are unioned',()=>{
 const u=new SolidUnion(),g=new T.Group(),m={id:1};u.add([-.65,1.25,0],[.2,2.5,.14],m,g);u.add([.65,1.25,0],[.2,2.5,.14],m,g);u.add([0,2.35,0],[1.5,.3,.14],m,g);
 for(const {geometry} of u.build()){const p=geometry.attributes.position;for(let i=0;i<p.count;i++)assert(!(Math.abs(p.getX(i))<.5&&p.getY(i)<2.1));}
});
test('all 24 rooms retain their footprints and every model vertex is finite',()=>{
 assert.equal(data.rooms.length,24);const h=model();assert.equal(data.constructionHeight,2.7);
 h.root.traverse(o=>{if(o.isMesh){assert(o.geometry.index);for(const v of o.geometry.attributes.position.array)assert(Number.isFinite(v))}});
 assert(h.surfaceAudit.architecture.overlappingCells>0);assert(h.surfaceAudit.roofs.overlappingCells>0);
 const unique=new Set();h.roofs.traverse(o=>{if(!o.isMesh)return;const p=o.geometry.attributes.position,idx=o.geometry.index.array;for(let i=0;i<idx.length;i+=3){const key=[0,1,2].map(k=>new T.Vector3().fromBufferAttribute(p,idx[i+k]).toArray().map(n=>n.toFixed(4)).join(',')).sort().join('|');assert(!unique.has(key),'duplicate roof triangle');unique.add(key)}});
});
test('beds fit within their bedrooms and dining chairs face the table without intersecting it',()=>{
 const h=model();assert.equal(h.furniture.beds.length,10);
 for(const b of h.furniture.beds){const room=data.rooms.find(r=>b.x>r.rect[0]&&b.x<r.rect[2]&&b.z>r.rect[1]&&b.z<r.rect[3]);assert(room);for(const dx of [-b.width/2,b.width/2])for(const dz of [-b.length/2,b.length/2]){const x=b.x+Math.cos(b.angle)*dx+Math.sin(b.angle)*dz,z=b.z-Math.sin(b.angle)*dx+Math.cos(b.angle)*dz;assert(x>room.rect[0]-.015&&x<room.rect[2]+.015&&z>room.rect[1]-.015&&z<room.rect[3]+.015,room.name)}}
 for(const table of h.furniture.tables){const chairs=h.furniture.chairs.filter(c=>c.table===table.id);assert.equal(chairs.length,table.id==='dining'?8:4);for(const c of chairs){const dx=c.x-table.x,dz=c.z-table.z;assert(Math.sin(c.angle)*dx+Math.cos(c.angle)*dz>0);assert(table.top-c.seatHeight>.24&&table.top-c.seatHeight<.35);for(let u=-.25;u<=.25;u+=.05)for(let v=-.245;v<=.245;v+=.05){const x=dx+Math.cos(c.angle)*u+Math.sin(c.angle)*v,z=dz-Math.sin(c.angle)*u+Math.cos(c.angle)*v;assert(x*x/table.rx**2+z*z/table.rz**2>1,'chair intersects tabletop')}}}
});
class Canvas extends EventTarget{style={};setPointerCapture(){}}
function send(c,type,values){const e=new Event(type);Object.assign(e,{pointerType:'mouse',pointerId:1,clientX:100,clientY:100,...values});c.dispatchEvent(e)}
test('moving the mouse without clicking turns orbit and walking cameras; UI and pause block it',()=>{
 const canvas=new Canvas(),input={look:{x:0,y:0}},state={mode:'orbit',orbit:{az:0,el:.5,distance:40}};let blocked=false;
 const controls=new ScenePointerControls({canvas,input,state,isBlocked:()=>blocked});send(canvas,'pointerenter',{});send(canvas,'pointermove',{clientX:140});assert(state.orbit.az<0);
 state.mode='walk';send(canvas,'pointermove',{clientX:160,clientY:120});assert.equal(input.look.x,20);assert.equal(input.look.y,20);
 controls.setEnabled(false);send(canvas,'pointermove',{clientX:220});assert.equal(input.look.x,0);
 controls.setEnabled(true);blocked=true;send(canvas,'pointermove',{clientX:300});assert.equal(input.look.x,0);
 blocked=false;send(canvas,'pointermove',{clientX:320});assert.equal(input.look.x,0);send(canvas,'pointermove',{clientX:330});assert.equal(input.look.x,10);
});
test('touch still supports drag and pinch without changing mouse hover behavior',()=>{
 const canvas=new Canvas(),input={look:{x:0,y:0}},state={mode:'orbit',orbit:{az:0,el:.5,distance:40}};new ScenePointerControls({canvas,input,state});
 send(canvas,'pointerdown',{pointerType:'touch',clientX:100});send(canvas,'pointermove',{pointerType:'touch',clientX:130});assert(state.orbit.az<0);
 send(canvas,'pointerdown',{pointerType:'touch',pointerId:2,clientX:200});send(canvas,'pointermove',{pointerType:'touch',pointerId:2,clientX:250});assert(state.orbit.distance<40);
});
