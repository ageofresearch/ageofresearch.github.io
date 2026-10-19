import assert from 'node:assert/strict';
import {trackAllocations,lightingMemory,installDiagnostics} from '../site/marina-casa-de-campo/assets/marina-diagnostics-v3.mjs';

function fakeGL(){
 const gl={};let enumValue=100;
 for(const name of ['TEXTURE0','TEXTURE_2D','TEXTURE_CUBE_MAP','TEXTURE_3D','TEXTURE_2D_ARRAY','ARRAY_BUFFER','RENDERBUFFER','RGBA8','RGBA16F','DEPTH_COMPONENT24'])gl[name]=enumValue++;
 gl.TEXTURE_CUBE_MAP_POSITIVE_X=1000;gl.TEXTURE_CUBE_MAP_NEGATIVE_Z=1005;
 for(const name of ['activeTexture','bindTexture','deleteTexture','texStorage2D','texStorage3D','texImage2D','texImage3D','generateMipmap','bindBuffer','bufferData','deleteBuffer','bindRenderbuffer','renderbufferStorage','renderbufferStorageMultisample','deleteRenderbuffer'])gl[name]=function(){assert.equal(this,gl);return 'native-result'};
 return gl;
}
const gl=fakeGL(),audit=trackAllocations(gl);
const texture={},buffer={},renderbuffer={};
assert.equal(gl.bindTexture(gl.TEXTURE_2D,texture),'native-result');
gl.texStorage2D(gl.TEXTURE_2D,3,gl.RGBA8,4,4);
assert.equal(audit.snapshot().textureBytes,(16+4+1)*4);
gl.generateMipmap(gl.TEXTURE_2D);
assert.equal(audit.snapshot().textureBytes,84,'Immutable storage must not count generated mipmaps twice');
gl.bindRenderbuffer(gl.RENDERBUFFER,renderbuffer);
gl.renderbufferStorageMultisample(gl.RENDERBUFFER,4,gl.RGBA16F,100,50);
assert.equal(audit.snapshot().renderbufferBytes,100*50*8*4);
gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT24,10,10);
assert.equal(audit.snapshot().renderbufferBytes,400,'Resizing replaces storage');
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,new Uint16Array(20),0,3,0);
assert.equal(audit.snapshot().bufferBytes,34,'Length zero means all remaining elements');
gl.bufferData(gl.ARRAY_BUFFER,new Uint16Array(20),0,3,5);
assert.equal(audit.snapshot().bufferBytes,10);
gl.deleteBuffer(buffer);gl.deleteTexture(texture);gl.deleteRenderbuffer(renderbuffer);
assert.equal(audit.snapshot().totalBytes,0,'Deletion must release all accounted payload');

const cube={};gl.bindTexture(gl.TEXTURE_CUBE_MAP,cube);
for(let face=0;face<6;face++)gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X+face,0,gl.RGBA8,4,4,0,0,0,null);
gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
assert.equal(audit.snapshot().textureBytes,6*(16+4+1)*4);
gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
assert.equal(audit.snapshot().textureBytes,504,'Repeated mip generation replaces the same levels');
gl.deleteTexture(cube);

gl.bindTexture(gl.TEXTURE_3D,{});gl.texStorage3D(gl.TEXTURE_3D,3,gl.RGBA16F,4,4,4);
assert.equal(audit.snapshot().textureBytes,(64+8+1)*8);
gl.bindTexture(gl.TEXTURE_2D_ARRAY,{});gl.texStorage3D(gl.TEXTURE_2D_ARRAY,3,gl.RGBA8,4,4,3);
assert.equal(audit.snapshot().textureBytes,(64+8+1)*8+(16+4+1)*3*4);
assert.equal(audit.snapshot().trackingErrors,0);
audit.reset();assert.equal(audit.snapshot().totalBytes,0,'Context loss clears accounted resources');
gl.bindTexture(gl.TEXTURE_2D,{});gl.texStorage2D(gl.TEXTURE_2D,1,99999,4,4);
assert.equal(audit.snapshot().unknownFormatObjects,1,'Unsupported formats must be disclosed');

const data=new Uint16Array(1024),old=new Uint16Array(2048);
const active={image:{data},userData:{parity_path:'active'}},stale={image:{data:old},userData:{parity_path:'old'}};
const a={lightMap:active},b={lightMap:null},properties=new Map([[a,{uniforms:{lightMap:{value:active}}}],[b,{uniforms:{lightMap:{value:stale}}}]]);
const app={engine:{glRenderer:{properties:{get:m=>properties.get(m)}}},yacht:{root:{traverse:visit=>{visit({isMesh:true,material:[a,b]})}},runtime:{appearance:{report:()=>({residentLightmaps:8,lightmapBytes:8192})}}}};
const first=lightingMemory(app);assert.equal(first.visibleModelReachableArrayBytes,data.byteLength+old.byteLength);assert.equal(first.visibleModelStaleArrayBytes,old.byteLength);assert.equal(first.visibleModelStaleTextures,1);
stale.image.data=null;assert.equal(lightingMemory(app).visibleModelStaleArrayBytes,0);
assert.equal(installDiagnostics({location:{search:''}}),null,'Ordinary visits must not instrument or mount UI');
console.log('Marina diagnostics passed: allocation formats, mips, resize/deletion, context reset, unknown formats, retained CPU arrays, and opt-in isolation.');
