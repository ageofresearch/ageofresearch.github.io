import test from 'node:test';
import assert from 'node:assert/strict';
import {Scene,DataTexture,FloatType,RGBAFormat,Mesh,BoxGeometry,MeshStandardMaterial} from 'three';
import {estimateGpuMemory} from '../src/resource-estimates.js';
test('resident estimate includes both right reflection probes and receiver without double-counting shared textures',()=>{
 const make=()=>new DataTexture(new Float32Array(4*2*4),4,2,RGBAFormat,FloatType),[a,b,irr,mask]=[make(),make(),make(),make()],scene=new Scene();scene.add(new Mesh(new BoxGeometry(),new MeshStandardMaterial({map:a,lightMap:irr})));
 const rooms=[{machinery:{installed:{targets:[{texture:a}],textures:[irr]},installedRight:{targets:[{texture:a},{texture:b}],textures:[irr,mask]}}}];
 assert.equal(estimateGpuMemory(scene,rooms).textureBytes,4*128);
 rooms[0].machinery.installedRight=null;assert.equal(estimateGpuMemory(scene,rooms).textureBytes,2*128);
});
