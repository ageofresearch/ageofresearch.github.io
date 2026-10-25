import test from 'node:test';import assert from 'node:assert/strict';import path from 'node:path';
import {NodeIO}from'@gltf-transform/core';import{ALL_EXTENSIONS}from'@gltf-transform/extensions';import{MeshoptDecoder}from'meshoptimizer';import{Vector3,Matrix4,Triangle}from'three';
test('both pedestal edge strips have exactly one outward top surface after compression',async()=>{
 await MeshoptDecoder.ready;const d=await new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.decoder':MeshoptDecoder}).read(path.resolve(import.meta.dirname,'../public/assets/machinery/electrical-vr-r01/electrical.glb')),tops=[];
 for(const n of d.getRoot().listNodes())for(const p of n.getMesh()?.listPrimitives()||[]){
  if(p.getMaterial().getName()!=='EVR | paint')continue;const mx=new Matrix4().fromArray(n.getWorldMatrix()),pos=p.getAttribute('POSITION'),ix=p.getIndices().getArray();
  for(let i=0;i<ix.length;i+=3){const v=Array.from(ix.slice(i,i+3),j=>new Vector3(...pos.getElement(j,[])).applyMatrix4(mx));if(!v.every(v=>Math.abs(v.y+.232)<.0001&&Math.abs(v.x)<.89&&v.z<-9.79&&v.z>-10.49))continue;const t=new Triangle(...v);if(t.getNormal(new Vector3()).y>.9999)tops.push(t);}
 }
 assert(tops.length>0);
 for(const side of[-1,1])for(let i=0;i<41;i++){
  const point=new Vector3(side*.845123,-.232,-9.86-i*.01417);const owners=tops.filter(t=>{const w=t.getBarycoord(point,new Vector3());return Math.min(w.x,w.y,w.z)>1e-7;});assert.equal(owners.length,1,`Visible strip ${side}/${i} must not have competing depth surfaces`);
 }
});
