(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e=globalThis.location?.search||``){let t=new URLSearchParams(e),n=t.has(`renderReference`),r=t.get(`world`)===`rocha`;return{reference:n,bindingReuse:r&&!n&&!t.has(`noRenderV2`)&&!t.has(`noBindingReuse`),framePacing:r&&!n&&!t.has(`noRenderV2`)&&!t.has(`noFramePacing`),compactTargets:!n&&!t.has(`noCompactSceneTargets`)&&(r||t.has(`compactSceneTargets`)),depthRotation:!n&&!t.has(`noDepthRotation`)&&(r||t.has(`depthRotation`)),tiledTAA:!n&&t.has(`tiledTAA`)&&!t.has(`noTiledTAA`)}}var t={device:null,queue:null,adapter:null,context:null,canvas:null,format:`bgra8unorm`,features:new Set,limits:null,hasTimestamp:!1,hasFloat32Filterable:!1,encoder:null,frame:0,samplers:null,_submitHooks:[],async init({canvas:e=null,requiredLimits:t={},headless:n=!1}={}){if(!navigator.gpu)throw Error(`WebGPU is not available in this browser.`);let r=await navigator.gpu.requestAdapter({powerPreference:`high-performance`});if(!r)throw Error(`No WebGPU adapter found.`);this.adapter=r;let i=r.limits,a={maxSampledTexturesPerShaderStage:32,maxSamplersPerShaderStage:16,maxStorageBuffersPerShaderStage:10,maxStorageTexturesPerShaderStage:8,maxComputeWorkgroupStorageSize:32768,maxColorAttachmentBytesPerSample:64,maxStorageBuffersInVertexStage:4,maxStorageBuffersInFragmentStage:8,maxStorageTexturesInFragmentStage:4,maxBindingsPerBindGroup:1e3,maxBufferSize:1073741824,maxStorageBufferBindingSize:536870912,...t},o={};for(let e in a)i[e]!==void 0&&(o[e]=Math.min(a[e],i[e]));let s=[`float32-filterable`,`timestamp-query`,`rg11b10ufloat-renderable`,`float32-blendable`,`shader-f16`,`clip-distances`].filter(e=>r.features.has(e));this.features=new Set(s),this.hasTimestamp=this.features.has(`timestamp-query`),this.hasFloat32Filterable=this.features.has(`float32-filterable`);let c=await r.requestDevice({requiredFeatures:s,requiredLimits:o});return this.device=c,this.queue=c.queue,this.limits=c.limits,c.lost.then(e=>console.error(`WebGPU device lost:`,e.message)),c.addEventListener&&c.addEventListener(`uncapturederror`,e=>console.error(`WebGPU:`,e.error.message.split(`
`).slice(0,6).join(`
`))),e&&!n&&(this.canvas=e,this.context=e.getContext(`webgpu`),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:c,format:this.format,alphaMode:`opaque`,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST})),this._createSamplers(),this},_createSamplers(){let e=this.device,t=t=>e.createSampler(t),n={magFilter:`linear`,minFilter:`linear`,mipmapFilter:`linear`};this.samplers={linearRepeat:t({...n,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`}),linearClamp:t({...n,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`,addressModeW:`clamp-to-edge`}),linearMirror:t({...n,addressModeU:`mirror-repeat`,addressModeV:`mirror-repeat`,addressModeW:`mirror-repeat`}),anisoRepeat:t({...n,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`,maxAnisotropy:8}),aniso4Repeat:t({...n,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`,maxAnisotropy:4}),anisoClamp:t({...n,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`,maxAnisotropy:8}),nearestClamp:t({magFilter:`nearest`,minFilter:`nearest`,mipmapFilter:`nearest`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`,addressModeW:`clamp-to-edge`}),nearestRepeat:t({magFilter:`nearest`,minFilter:`nearest`,mipmapFilter:`nearest`,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`}),shadow:t({magFilter:`linear`,minFilter:`linear`,compare:`less`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`})}},beginFrame(){return this.frame++,this.getEncoder()},getEncoder(){return this.encoder||=this.device.createCommandEncoder(),this.encoder},submit(){if(!this.encoder)return;let e=this._submitHooks;this._submitHooks=[];for(let t of e)t.before&&t.before(this.encoder);this.queue.submit([this.encoder.finish()]),this.encoder=null;for(let t of e)t.after&&t.after()},onSubmit(e,t){this._submitHooks.push({before:e,after:t})},_pending:new Set,syncCompiles:[],renderPipeline(e){return this._async(e,`render`)},computePipeline(e){return this._async(e,`compute`)},_async(e,t){let n={pipeline:null,label:e.label,desc:e,kind:t,failed:!1},r=Promise.resolve().then(()=>{if(!n.pipeline)return(t===`render`?this.device.createRenderPipelineAsync:this.device.createComputePipelineAsync).call(this.device,e).then(e=>{n.pipeline||=e,n.desc=null},t=>{n.failed=!0,console.error(`WebGPU: pipeline "${e.label}" failed: ${t.message.split(`
`).slice(0,6).join(`
`)}`)})}).finally(()=>this._pending.delete(r));return this._pending.add(r),n},ready(e){return e.pipeline||e.failed?e.pipeline:(this.syncCompiles.push(e.label),e.pipeline=e.kind===`render`?this.device.createRenderPipeline(e.desc):this.device.createComputePipeline(e.desc),e.pipeline)},async pipelinesReady(){for(;this._pending.size;)await Promise.all([...this._pending])},computePass(e,t,n){let r=this.getEncoder().beginComputePass({label:e,timestampWrites:n});t(r),r.end()}},n={r8unorm:{bytes:1,sample:`float`},rg8unorm:{bytes:2,sample:`float`},rgba8unorm:{bytes:4,sample:`float`},"rgba8unorm-srgb":{bytes:4,sample:`float`},bgra8unorm:{bytes:4,sample:`float`},r16float:{bytes:2,sample:`float`},rg16float:{bytes:4,sample:`float`},rgba16float:{bytes:8,sample:`float`},rg11b10ufloat:{bytes:4,sample:`float`},r32float:{bytes:4,sample:`unfilterable-float`},rg32float:{bytes:8,sample:`unfilterable-float`},rgba32float:{bytes:16,sample:`unfilterable-float`},r32uint:{bytes:4,sample:`uint`},rg32uint:{bytes:8,sample:`uint`},rgba32uint:{bytes:16,sample:`uint`},r32sint:{bytes:4,sample:`sint`},r8uint:{bytes:1,sample:`uint`},rgba8uint:{bytes:4,sample:`uint`},depth32float:{bytes:4,sample:`depth`},depth24plus:{bytes:4,sample:`depth`},"depth24plus-stencil8":{bytes:4,sample:`depth`}};function r(e){let t=n[e];if(!t)throw Error(`Unknown texture format `+e);return t}function i(e){let n=r(e).sample;return n===`unfilterable-float`&&t.hasFloat32Filterable?`float`:n}var a=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].includes(t)||n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].includes(t)}removeEventListener(e,t){let n=this._listeners&&this._listeners[e];if(n===void 0)return;let r=n.indexOf(t);r!==-1&&n.splice(r,1)}dispatchEvent(e){let t=this._listeners&&this._listeners[e.type];if(t!==void 0){e.target=this;for(let n of t.slice())n.call(this,e);e.target=null}}},o=class e{constructor(e=0,t=0,n=0,r=1){this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback=s}static slerpFlat(t,n,r,i,a,o,s){let c=new e().fromArray(r,i),l=new e().fromArray(a,o);c.slerp(l,s).toArray(t,n)}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new e(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}identity(){return this.set(0,0,0,1)}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos(n/2),s=Math.cos(r/2),c=Math.cos(i/2),l=Math.sin(n/2),u=Math.sin(r/2),d=Math.sin(i/2);switch(a){case`XYZ`:this._x=l*s*c+o*u*d,this._y=o*u*c-l*s*d,this._z=o*s*d+l*u*c,this._w=o*s*c-l*u*d;break;case`YXZ`:this._x=l*s*c+o*u*d,this._y=o*u*c-l*s*d,this._z=o*s*d-l*u*c,this._w=o*s*c+l*u*d;break;case`ZXY`:this._x=l*s*c-o*u*d,this._y=o*u*c+l*s*d,this._z=o*s*d+l*u*c,this._w=o*s*c-l*u*d;break;case`ZYX`:this._x=l*s*c-o*u*d,this._y=o*u*c+l*s*d,this._z=o*s*d-l*u*c,this._w=o*s*c+l*u*d;break;case`YZX`:this._x=l*s*c+o*u*d,this._y=o*u*c+l*s*d,this._z=o*s*d-l*u*c,this._w=o*s*c-l*u*d;break;case`XZY`:this._x=l*s*c-o*u*d,this._y=o*u*c-l*s*d,this._z=o*s*d+l*u*c,this._w=o*s*c+l*u*d;break;default:throw Error(`Quaternion.setFromEuler: unknown order `+a)}return t&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.x*t.x+e.y*t.y+e.z*t.z+1;return n<2**-52?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Math.max(-1,Math.min(1,this.dot(e)))))}rotateTowards(e,t){let n=this.angleTo(e);return n===0?this:this.slerp(e,Math.min(1,t/n))}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this.lengthSq())}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,i=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+i*e._z,s=e._x,c=e._y,l=e._z,u=e._w;if(o<0&&(s=-s,c=-c,l=-l,u=-u,o=-o),o>=1)return this;let d=1-o*o;if(d<=2**-52){let e=1-t;return this._w=e*a+t*u,this._x=e*n+t*s,this._y=e*r+t*c,this._z=e*i+t*l,this.normalize()}let f=Math.sqrt(d),p=Math.atan2(f,o),m=Math.sin((1-t)*p)/f,h=Math.sin(t*p)/f;return this._w=a*m+u*h,this._x=n*m+s*h,this._y=r*m+c*h,this._z=i*m+l*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this.set(e.getX(t),e.getY(t),e.getZ(t),e.getW(t))}_onChange(e){return this._onChangeCallback=e,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};function s(){}o.prototype.isQuaternion=!0;var c=new o,l=class e{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){return e===0?this.x=t:e===1?this.y=t:this.z=t,this}getComponent(e){return e===0?this.x:e===1?this.y:this.z}clone(){return new e(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}applyEuler(e){return this.applyQuaternion(c.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(c.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){let t=this.dot(e)/(e.lengthSq()||1);return this.addScaledVector(e,-t)}reflect(e){return this.addScaledVector(e,-2*this.dot(e))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(e)/t)))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.set(t,n,r)}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};l.prototype.isVector3=!0;var u=2001,d=new l,f=new l,p=new l,m=new l,h=new o,g=new l(1,1,1),_=new l,v=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)t[e]=n[e];return this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1)}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1)}extractRotation(e){let t=this.elements,n=e.elements,r=1/d.setFromMatrixColumn(e,0).length(),i=1/d.setFromMatrixColumn(e,1).length(),a=1/d.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){return this.compose(_,h.setFromEuler(e,!1),g)}makeRotationFromQuaternion(e){return this.compose(_,e,g)}lookAt(e,t,n){let r=this.elements;return m.subVectors(e,t),m.lengthSq()===0&&(m.z=1),m.normalize(),f.crossVectors(n,m),f.lengthSq()===0&&(Math.abs(n.z)===1?m.x+=1e-4:m.z+=1e-4,m.normalize(),f.crossVectors(n,m)),f.normalize(),p.crossVectors(m,f),r[0]=f.x,r[4]=p.x,r[8]=m.x,r[1]=f.y,r[5]=p.y,r[9]=m.y,r[2]=f.z,r[6]=p.z,r[10]=m.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],ee=r[3],te=r[7],N=r[11],ne=r[15];return i[0]=a*x+o*T+s*k+c*ee,i[4]=a*S+o*E+s*A+c*te,i[8]=a*C+o*D+s*j+c*N,i[12]=a*w+o*O+s*M+c*ne,i[1]=l*x+u*T+d*k+f*ee,i[5]=l*S+u*E+d*A+f*te,i[9]=l*C+u*D+d*j+f*N,i[13]=l*w+u*O+d*M+f*ne,i[2]=p*x+m*T+h*k+g*ee,i[6]=p*S+m*E+h*A+g*te,i[10]=p*C+m*D+h*j+g*N,i[14]=p*w+m*O+h*M+g*ne,i[3]=_*x+v*T+y*k+b*ee,i[7]=_*S+v*E+y*A+b*te,i[11]=_*C+v*D+y*j+b*N,i[15]=_*w+v*O+y*M+b*ne,this}multiplyScalar(e){let t=this.elements;for(let n=0;n<16;n++)t[n]*=e;return this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=d*g-f*h,v=u*g-f*m,y=u*h-d*m,b=l*g-f*p,x=l*h-d*p,S=l*m-u*p;return t*(o*_-s*v+c*y)-n*(a*_-s*b+c*x)+r*(a*v-o*b+c*S)-i*(a*y-o*x+s*S)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements;return t[0]*=e.x,t[4]*=e.y,t[8]*=e.z,t[1]*=e.x,t[5]*=e.y,t[9]*=e.z,t[2]*=e.x,t[6]*=e.y,t[10]*=e.z,t[3]*=e.x,t[7]*=e.y,t[11]*=e.z,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1)}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1)}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1)}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1)}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1)}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1)}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1)}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,i=Math.hypot(r[0],r[1],r[2]),a=Math.hypot(r[4],r[5],r[6]),o=Math.hypot(r[8],r[9],r[10]);this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14];let s=y.copy(this),c=s.elements,l=1/i,u=1/a,d=1/o;return c[0]*=l,c[1]*=l,c[2]*=l,c[4]*=u,c[5]*=u,c[6]*=u,c[8]*=d,c[9]*=d,c[10]*=d,t.setFromRotationMatrix(s),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,r,i,a,o=u,s=!0){let c=this.elements,l=2*i/(t-e),d=2*i/(n-r),f=(t+e)/(t-e),p=(n+r)/(n-r),m,h,g=a===1/0;if(s){if(o!==2001)throw Error(`Matrix4.makePerspective: reversed depth requires WebGPU clip space`);m=g?0:i/(a-i),h=g?i:a*i/(a-i)}else o===2001?(m=g?-1:-a/(a-i),h=g?-i:-a*i/(a-i)):(m=g?-1:-(a+i)/(a-i),h=g?-2*i:-2*a*i/(a-i));return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=h,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=u,s=!0){let c=this.elements,l=1/(t-e),d=1/(n-r),f=1/(a-i),p=(t+e)*l,m=(n+r)*d,h,g;return s?(h=a*f,g=f):o===2001?(h=-i*f,g=-f):(h=-(a+i)*f,g=-2*f),c[0]=2*l,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=g,c[14]=h,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){for(let t=0;t<16;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;for(let r=0;r<16;r++)e[t+r]=n[r];return e}};v.prototype.isMatrix4=!0;var y=new v,b=new v,x=new o,S=e=>Math.max(-1,Math.min(1,e)),C=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this._x=t,this._y=n,this._z=r,this._order=i,this._onChangeCallback=w}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new e(this._x,this._y,this._z,this._order)}copy(e){return this.set(e._x,e._y,e._z,e._order)}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10],p=.9999999;switch(t){case`XYZ`:this._y=Math.asin(S(o)),Math.abs(o)<p?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-S(l)),Math.abs(l)<p?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(S(d)),Math.abs(d)<p?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-S(u)),Math.abs(u)<p?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(S(s)),Math.abs(s)<p?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-S(a)),Math.abs(a)<p?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:throw Error(`Euler.setFromRotationMatrix: unknown order `+t)}return this._order=t,n&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return b.makeRotationFromQuaternion(e),this.setFromRotationMatrix(b,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return x.setFromEuler(this),this.setFromQuaternion(x,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};function w(){}C.DEFAULT_ORDER=`XYZ`,C.prototype.isEuler=!0;var T=class e{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1)}copy(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)t[e]=n[e];return this}clone(){return new e().fromArray(this.elements)}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10])}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;for(let n=0;n<9;n++)t[n]*=e;return this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}makeTranslation(e,t){return e.isVector2&&(t=e.y,e=e.x),this.set(1,0,e,0,1,t,0,0,1)}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1)}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1)}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1)}scale(e,t){return this.premultiply(E.makeScale(e,t))}rotate(e){return this.premultiply(E.makeRotation(-e))}translate(e,t){return this.premultiply(E.makeTranslation(e,t))}equals(e){for(let t=0;t<9;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){for(let n=0;n<9;n++)e[t+n]=this.elements[n];return e}};T.prototype.isMatrix3=!0;var E=new T,D=Math.PI/180,O=180/Math.PI,k=[];for(let e=0;e<256;e++)k[e]=(e<16?`0`:``)+e.toString(16);function A(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(k[e&255]+k[e>>8&255]+k[e>>16&255]+k[e>>24&255]+`-`+k[t&255]+k[t>>8&255]+`-`+k[t>>16&15|64]+k[t>>24&255]+`-`+k[n&63|128]+k[n>>8&255]+`-`+k[n>>16&255]+k[n>>24&255]+k[r&255]+k[r>>8&255]+k[r>>16&255]+k[r>>24&255]).toLowerCase()}var j=(e,t,n)=>Math.max(t,Math.min(n,e)),M=(e,t)=>(e%t+t)%t,ee=(e,t,n,r,i)=>r+(e-t)*(i-r)/(n-t),te=(e,t,n)=>e===t?0:(n-e)/(t-e),N=(e,t,n)=>(1-n)*e+n*t,ne=(e,t,n,r)=>N(e,t,1-Math.exp(-n*r)),re=(e,t=1)=>t-Math.abs(M(e,t*2)-t);function ie(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function ae(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}var oe=(e,t)=>e+Math.floor(Math.random()*(t-e+1)),se=(e,t)=>e+Math.random()*(t-e),ce=e=>e*(.5-Math.random()),le=1234567;function ue(e){e!==void 0&&(le=e);let t=le+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}var de=e=>e*D,fe=e=>e*O,pe=e=>!(e&e-1)&&e!==0,me=e=>2**Math.ceil(Math.log(e)/Math.LN2),he=e=>2**Math.floor(Math.log(e)/Math.LN2);function ge(e,t){switch(t.constructor){case Float32Array:case Float64Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:return e}}function _e(e,t){switch(t.constructor){case Float32Array:case Float64Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:return e}}var ve={normalize:_e,denormalize:ge,DEG2RAD:D,RAD2DEG:O,generateUUID:A,clamp:j,euclideanModulo:M,mapLinear:ee,inverseLerp:te,lerp:N,damp:ne,pingpong:re,smoothstep:ie,smootherstep:ae,randInt:oe,randFloat:se,randFloatSpread:ce,seededRandom:ue,degToRad:de,radToDeg:fe,isPowerOfTwo:pe,ceilPowerOfTwo:me,floorPowerOfTwo:he},ye=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},be=0,xe=new l,Se=new o,Ce=new v,we=new l,Te=new l,Ee=new l,De=new o,Oe=new l(1,0,0),ke=new l(0,1,0),Ae=new l(0,0,1),je={type:`added`},Me={type:`removed`},Ne={type:`childadded`,child:null},Pe={type:`childremoved`,child:null},Fe=class e extends a{constructor(){super(),Object.defineProperty(this,"id",{value:be++}),this.uuid=A(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new l,n=new C,r=new o,i=new l(1,1,1);n._onChange(()=>r.setFromEuler(n,!1)),r._onChange(()=>n.setFromQuaternion(r,void 0,!1)),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new v},normalMatrix:{value:new T}}),this.matrix=new v,this.matrixWorld=new v,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ye,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}onBeforeRender(){}onAfterRender(){}onBeforeShadow(){}onAfterShadow(){}dispose(){this.dispatchEvent({type:`dispose`})}applyMatrix4(e){return this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Se.setFromAxisAngle(e,t),this.quaternion.multiply(Se),this}rotateOnWorldAxis(e,t){return Se.setFromAxisAngle(e,t),this.quaternion.premultiply(Se),this}rotateX(e){return this.rotateOnAxis(Oe,e)}rotateY(e){return this.rotateOnAxis(ke,e)}rotateZ(e){return this.rotateOnAxis(Ae,e)}translateOnAxis(e,t){return xe.copy(e).applyQuaternion(this.quaternion),this.position.add(xe.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Oe,e)}translateY(e){return this.translateOnAxis(ke,e)}translateZ(e){return this.translateOnAxis(Ae,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ce.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?we.copy(e):we.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Te.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ce.lookAt(Te,we,this.up):Ce.lookAt(we,Te,this.up),this.quaternion.setFromRotationMatrix(Ce),r&&(Ce.extractRotation(r.matrixWorld),Se.setFromRotationMatrix(Ce),this.quaternion.premultiply(Se.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this||e&&e.isObject3D&&(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(je),Ne.child=e,this.dispatchEvent(Ne),Ne.child=null),this}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Me),Pe.child=e,this.dispatchEvent(Pe),Pe.child=null),this}removeFromParent(){return this.parent!==null&&this.parent.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ce.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ce.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ce),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(je),this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n of this.children){let r=n.getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);for(let r of this.children)r.getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Te,e,Ee),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Te,De,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(n===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(n.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].matrixWorldAutoUpdate===!0&&e[t].updateWorldMatrix(!1,!0)}}clone(e){return new this.constructor().copy(this,e)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,t.onBeforeRender!==e.prototype.onBeforeRender&&(this.onBeforeRender=t.onBeforeRender),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let e of t.children)this.add(e.clone());return this}};Fe.DEFAULT_UP=new l(0,1,0),Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0,Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,Fe.prototype.isObject3D=!0;var P=class e{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){return e===0?this.x=t:this.y=t,this}getComponent(e){return e===0?this.x:this.y}clone(){return new e(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(e)/t)))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};P.prototype.isVector2=!0;var Ie=new l,Le=new P,Re=new P,ze=class extends Fe{constructor(){super(),this.type=`Camera`,this.matrixWorldInverse=new v,this.projectionMatrix=new v,this.projectionMatrixInverse=new v,this.coordinateSystem=u,this.reversedDepth=!0}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this.reversedDepth=e.reversedDepth,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};ze.prototype.isCamera=!0;function Be(e,t,n,r,i,a,o){e.view===null&&(e.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1});let s=e.view;s.enabled=!0,s.fullWidth=t,s.fullHeight=n,s.offsetX=r,s.offsetY=i,s.width=a,s.height=o,e.updateProjectionMatrix()}var Ve=class extends ze{constructor(e=50,t=1,n=.1,r=2e3){super(),this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.infiniteFar=!1,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.infiniteFar=e.infiniteFar,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=O*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){return .5*this.getFilmHeight()/Math.tan(D*.5*this.fov)}getEffectiveFOV(){return O*2*Math.atan(Math.tan(D*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ie.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ie.x,Ie.y).multiplyScalar(-e/Ie.z),Ie.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ie.x,Ie.y).multiplyScalar(-e/Ie.z)}getViewSize(e,t){return this.getViewBounds(e,Le,Re),t.subVectors(Re,Le)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,Be(this,e,t,n,r,i,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(D*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(a!==null&&a.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth());let s=this.infiniteFar?1/0:this.far;this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,s,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}};Ve.prototype.isPerspectiveCamera=!0;var He=class extends ze{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){Be(this,e,t,n,r,i,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t,c=this.view;if(c!==null&&c.enabled){let e=(this.right-this.left)/c.fullWidth/this.zoom,t=(this.top-this.bottom)/c.fullHeight/this.zoom;i+=e*c.offsetX,a=i+e*c.width,o-=t*c.offsetY,s=o-t*c.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}};He.prototype.isOrthographicCamera=!0;var Ue=class extends Fe{constructor(){super(),this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new C,this.environmentIntensity=1,this.environmentRotation=new C,this.overrideMaterial=null}copy(e,t){return super.copy(e,t),this.background=e.background,this.environment=e.environment,this.fog=e.fog,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),this.environmentIntensity=e.environmentIntensity,this.overrideMaterial=e.overrideMaterial,this.matrixAutoUpdate=e.matrixAutoUpdate,this}};Ue.prototype.isScene=!0;var We=()=>typeof performance<`u`?performance.now():Date.now(),Ge=class{constructor(){this._startTime=We(),this._previousTime=0,this._currentTime=0,this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=()=>{e.hidden===!1&&this.reset()},e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=We()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?We():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}},Ke=class{constructor(e){this.pass=e,this.vertices=[],this.indexBuffer=null,this.indexFormat=null,this.drawGroup=null,this.drawOffset=-1,this.offsets=new Uint32Array(1)}bindObject(e,t){(e!==this.drawGroup||t!==this.drawOffset)&&(this.offsets[0]=t,this.pass.setBindGroup(2,e,this.offsets,0,1),this.drawGroup=e,this.drawOffset=t)}bindVertex(e,t){this.vertices[e]!==t&&(this.pass.setVertexBuffer(e,t),this.vertices[e]=t)}bindIndex(e,t){(this.indexBuffer!==e||this.indexFormat!==t)&&(this.pass.setIndexBuffer(e,t),this.indexBuffer=e,this.indexFormat=t)}},qe={f32:{size:4,align:4,n:1},i32:{size:4,align:4,n:1,int:!0},u32:{size:4,align:4,n:1,uint:!0},vec2f:{size:8,align:8,n:2},vec3f:{size:12,align:16,n:3},vec4f:{size:16,align:16,n:4},vec2i:{size:8,align:8,n:2,int:!0},vec4i:{size:16,align:16,n:4,int:!0},vec2u:{size:8,align:8,n:2,uint:!0},vec4u:{size:16,align:16,n:4,uint:!0},mat3x3f:{size:48,align:16,n:12,mat3:!0},mat4x4f:{size:64,align:16,n:16}};function Je(e){let t=/^(\w+)(?:\[(\d+)\])?$/.exec(e);if(!t||!qe[t[1]])throw Error(`Unsupported uniform type `+e);let n=qe[t[1]],r=t[2]?Number(t[2]):0;if(r&&n.align<16)throw Error(`uniform array ${e}: element must be 16-byte aligned (use vec4f)`);return{name:t[1],base:n,count:r}}function Ye(e,t,n,r,i,a){let{base:o}=i,s=o.int?n:o.uint?t:e;if(typeof a==`number`||typeof a==`boolean`){s[r]=Number(a);return}if(a!=null){if(a.isMatrix4||a.isMatrix3){let t=a.elements;if(o.mat3){if(t.length===9)for(let n=0;n<3;n++)for(let i=0;i<3;i++)e[r+n*4+i]=t[n*3+i];else for(let n=0;n<3;n++)for(let i=0;i<3;i++)e[r+n*4+i]=t[n*4+i]}else for(let n=0;n<16;n++)e[r+n]=t[n];return}if(a.isColor){s[r]=a.r,s[r+1]=a.g,s[r+2]=a.b,o.n===4&&(s[r+3]=1);return}if(a.isVector2){s[r]=a.x,s[r+1]=a.y;return}if(a.isVector3){s[r]=a.x,s[r+1]=a.y,s[r+2]=a.z;return}if(a.isVector4||a.isQuaternion){s[r]=a.x,s[r+1]=a.y,s[r+2]=a.z,s[r+3]=a.w;return}if(ArrayBuffer.isView(a)||Array.isArray(a)){for(let e=0;e<Math.min(a.length,o.n);e++)s[r+e]=a[e];return}throw Error(`Cannot write uniform value `+a)}}var Xe=0,Ze=class{constructor(e,t,{label:n}={}){this.structName=e,this.label=n||e,this.id=Xe++,this.layout={},this.fields={},this.order=[];let r=0,i=16;for(let e in t){let n=t[e],a=Array.isArray(n)?n[0]:n,o=Array.isArray(n)?n[1]:void 0,s=Je(a),c=s.base.align;i=Math.max(i,c),r=Math.ceil(r/c)*c;let l=s.count?Math.ceil(s.base.size/16)*16:s.base.size,u=s.count?l*s.count:s.base.size;this.layout[e]={offset:r,type:s,typeStr:a,stride:l,size:u},this.order.push(e),this.fields[e]={value:o===void 0?Qe(s):o},r+=u}this.byteLength=Math.max(16,Math.ceil(r/i)*i),this.data=new ArrayBuffer(this.byteLength),this.f32=new Float32Array(this.data),this.u32=new Uint32Array(this.data),this.i32=new Int32Array(this.data),this.buffer=null,this.version=0;let a=this;this.values=new Proxy({},{get:(e,t)=>a.fields[t]&&a.fields[t].value,set:(e,t,n)=>(a.set(t,n),!0)})}get wgsl(){let e=`struct ${this.structName} {\n`;for(let t of this.order){let{type:n}=this.layout[t];e+=n.count?`\t${t}: array<${n.name}, ${n.count}>,\n`:`\t${t}: ${n.name},\n`}return e+`};
`}set(e,t){let n=this.fields[e];if(!n)throw Error(`${this.structName}: no uniform ${e}`);n.value&&typeof n.value==`object`&&!Array.isArray(n.value)&&n.value.copy&&t&&t.constructor===n.value.constructor?n.value.copy(t):n.value=t}get(e){return this.fields[e].value}_pack(){this.onBeforePack&&this.onBeforePack(this);let{f32:e,u32:t,i32:n,fields:r}=this,i=this._plan||this._makePlan();for(let a=0;a<i.length;a++){let{name:o,o:s,type:c,stride:l,count:u,n:d}=i[a],f=r[o].value;if(typeof f==`number`){(c.base.int?n:c.base.uint?t:e)[s]=f;continue}if(u){if(!f)continue;if(typeof f[0]==`number`){let r=c.base.int?n:c.base.uint?t:e,i=Math.min(u,f.length/d);for(let e=0;e<i;e++){let t=s+e*l,n=e*d,i=Math.min(d,f.length-n);for(let e=0;e<i;e++)r[t+e]=f[n+e]}}else{let r=Math.min(u,f.length);for(let i=0;i<r;i++)Ye(e,t,n,s+i*l,c,f[i])}}else Ye(e,t,n,s,c,f)}}_makePlan(){return this._plan=this.order.map(e=>{let{offset:t,type:n,stride:r}=this.layout[e];return{name:e,o:t/4,type:n,stride:r/4,count:n.count,n:n.base.n}}),this._plan}getBuffer(){return this.buffer||(this.buffer=t.device.createBuffer({label:this.label,size:this.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._last=new Uint32Array(this.byteLength/4),this._last.fill(4294967295),this._hasUploaded=!1),this.buffer}upload(e){if(e!==void 0&&e===this._token&&this.buffer)return this.buffer;this._token=e;let n=this.getBuffer();this._pack();let r=this.u32,i=this._last;if(!this._hasUploaded)return t.queue.writeBuffer(n,0,this.data),i.set(r),this._hasUploaded=!0,n;let a=0;for(;a<r.length&&r[a]===i[a];)a++;if(a<r.length){let e=r.length;if(r.length>=64)for(;e>a+1&&r[e-1]===i[e-1];)e--;else a=0;t.queue.writeBuffer(n,a*4,this.data,a*4,(e-a)*4),i.set(r)}return n}};function Qe(e){return e.count?null:e.base.n===1?0:Array(e.base.n).fill(0)}var $e=[[`smpLinearRepeat`,`linearRepeat`,`filtering`],[`smpLinearClamp`,`linearClamp`,`filtering`],[`smpLinearMirror`,`linearMirror`,`filtering`],[`smpAnisoRepeat`,`anisoRepeat`,`filtering`],[`smpAnisoClamp`,`anisoClamp`,`filtering`],[`smpAniso4Repeat`,`aniso4Repeat`,`filtering`],[`smpNearestClamp`,`nearestClamp`,`non-filtering`],[`smpNearestRepeat`,`nearestRepeat`,`non-filtering`],[`smpShadow`,`shadow`,`comparison`]],et=0,F=class{constructor({name:e,deps:t=[],code:n=``,bindings:r={},uniforms:i=null,uniformName:a=null}){this.id=et++,this.name=e||`module`+this.id,this.deps=t.filter(Boolean),this.code=n,this.bindings={...r},i&&(this.bindings[a||tt(i.structName)]={uniform:i}),this.isShaderModule=!0}};function tt(e){return e[0].toLowerCase()+e.slice(1)}function nt(e){let t=[],n=new Set,r=e=>{if(e&&!n.has(e)){n.add(e);for(let t of e.deps)r(t);t.push(e)}};for(let t of e)r(t);return t}function rt(e,t={}){let n=e.split(`
`),r=[],i=[],a=()=>i.length===0||i[i.length-1].active,o=e=>{e=e.trim();let n;if(n=/^!\s*(\w+)$/.exec(e))return!it(t[n[1]]);if(n=/^(\w+)\s*(==|!=|>=|<=|>|<)\s*([\w.'"-]+)$/.exec(e)){let e=t[n[1]],r=n[3].replace(/^['"]|['"]$/g,``);switch(!isNaN(Number(r))&&typeof e==`number`&&(r=Number(r)),n[2]){case`==`:return e==r;case`!=`:return e!=r;case`>=`:return e>=r;case`<=`:return e<=r;case`>`:return e>r;case`<`:return e<r}}return/\|\|/.test(e)?e.split(`||`).some(e=>o(e)):/&&/.test(e)?e.split(`&&`).every(e=>o(e)):it(t[e])};for(let e of n){let n=e.trim(),s;if(s=/^#(if|ifdef|ifndef)\s+(.*)$/.exec(n)){let e=a(),n;n=s[1]===`ifdef`?t[s[2].trim()]!==void 0:s[1]===`ifndef`?t[s[2].trim()]===void 0:o(s[2]),i.push({active:e&&n,taken:n,parent:e});continue}if(s=/^#elif\s+(.*)$/.exec(n)){let e=i[i.length-1],t=!e.taken&&o(s[1]);e.active=e.parent&&t,e.taken=e.taken||t;continue}if(n===`#else`){let e=i[i.length-1];e.active=e.parent&&!e.taken,e.taken=!0;continue}if(n===`#endif`){i.pop();continue}a()&&r.push(e)}if(i.length)throw Error(`preprocess: unterminated #if`);return r.join(`
`)}function it(e){return e!=null&&e!==!1&&e!==0&&e!==`0`}function I(e){return typeof e==`function`?e():e}function at(e,t,n){let r=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,i=n===`compute`?GPUShaderStage.COMPUTE:r;if(t.uniform){let n=t.uniform;return{layout:{visibility:i,buffer:{type:`uniform`}},decl:`var<uniform> ${e}: ${n.structName};`,struct:n}}if(t.uniformBuffer)return{layout:{visibility:i,buffer:{type:`uniform`}},decl:`var<uniform> ${e}: ${t.wgslType};`};if(t.storage){let a=I(t.storage),o=t.access||`read`,s=t.wgslType||`array<${t.type||a.type}>`;return{layout:{visibility:n===`compute`?i:o===`read`?r:GPUShaderStage.FRAGMENT,buffer:{type:o===`read`?`read-only-storage`:`storage`}},decl:`var<storage, ${o===`read`?`read`:`read_write`}> ${e}: ${s};`}}if(t.storageTexture){let r=I(t.storageTexture),a=t.access||`write`,o=t.viewDimension||t.view?.dimension||r.defaultViewDimension;return{layout:{visibility:n===`compute`?i:GPUShaderStage.FRAGMENT,storageTexture:{access:a===`write`?`write-only`:a===`read`?`read-only`:`read-write`,format:r.format,viewDimension:o}},decl:`var ${e}: texture_storage_${o.replace(`-`,`_`)}<${r.format}, ${a}>;`}}if(t.texture){let n=I(t.texture),r=t.viewDimension||t.view?.dimension||n.defaultViewDimension,a=t.sampleType||n.sampleType,o=t.wgslType||n.wgslType(r);return t.sampleType===`unfilterable-float`&&n.isDepth&&(o=`texture_${r.replace(`-`,`_`)}<f32>`),{layout:{visibility:i,texture:{sampleType:a,viewDimension:r,multisampled:n.sampleCount>1}},decl:`var ${e}: ${o};`}}if(t.sampler)return{layout:{visibility:i,sampler:{type:t.samplerType||`filtering`}},decl:`var ${e}: ${t.samplerType===`comparison`?`sampler_comparison`:`sampler`};`};throw Error(`binding ${e}: unknown spec`)}function ot(e){if(e.uniform)return{buffer:e.uniform.getBuffer()};if(e.uniformBuffer)return{buffer:I(e.uniformBuffer)};if(e.storage){let t=I(e.storage),n=t.getGPU?t.getGPU():t;return e.offset===void 0?{buffer:n}:{buffer:n,offset:e.offset,size:e.size}}if(e.storageTexture)return I(e.storageTexture).view(e.view||{dimension:e.viewDimension||I(e.storageTexture).defaultViewDimension,mipLevelCount:1,baseMipLevel:e.mip||0});if(e.texture){let t=I(e.texture);return e.view||e.viewDimension?t.view({...e.view||{},dimension:e.viewDimension||e.view.dimension}):t.view()}if(e.sampler)return typeof e.sampler==`string`?t.samplers[e.sampler]:e.sampler;throw Error(`unknown binding`)}var st=0,ct=1,lt=2,ut=3,dt=4;function ft(e){return e.uniform?st:e.uniformBuffer?ct:e.storage?lt:e.storageTexture||e.texture?ut:dt}var pt=4,mt=new WeakMap;function ht(e,n){let r=JSON.stringify(e),i=mt.get(t.device);i||(i=new Map,mt.set(t.device,i));let a=i.get(r);return a||(a=t.device.createBindGroupLayout({label:n,entries:e}),i.set(r,a)),a}var gt=class{constructor(e,n,r=`bindings`,i=null,a=null){if(this.label=r,this.stage=n,this.names=Object.keys(e),this.specs=e,this.described=this.names.map(t=>at(t,e[t],n)),i)for(let e=0;e<this.names.length;e++){let t=this.described[e].layout,n=i[this.names[e]];n===`fragment`&&t.visibility&GPUShaderStage.FRAGMENT&&(t.visibility=GPUShaderStage.FRAGMENT),n===`vertex`&&t.visibility&GPUShaderStage.VERTEX&&(t.visibility=GPUShaderStage.VERTEX)}if(a)for(let e=0;e<this.names.length;e++){let t=this.described[e];a.has(this.names[e])&&(t.layout.buffer={type:`read-only-storage`},t.decl=t.decl.replace(/^var<uniform>/,`var<storage, read>`))}this.layout=ht(this.described.map((e,t)=>({binding:t,...e.layout})),r),this._device=t.device,this.group=null;let o=this.names.length;this._specs=this.names.map(t=>e[t]),this._kinds=this._specs.map(ft),this._blocks=this._specs.filter(e=>e.uniform).map(e=>e.uniform),this._objs=Array(o).fill(null),this._vers=Array(o).fill(0),this._entry=null,this._cache=[],this._token=null}declarations(e){return this.described.map((t,n)=>`@group(${e}) @binding(${n}) ${t.decl}`).join(`
`)}structs(){let e=[];for(let t of this.described)t.struct&&!e.includes(t.struct)&&e.push(t.struct);return e}getBindGroup(e){if(this._device!==t.device&&(this._device=t.device,this.layout=ht(this.described.map((e,t)=>({binding:t,...e.layout})),this.label),this.group=this._entry=this._token=null,this._cache.length=0),e!==void 0&&e===this._token&&this.group)return this.group;this._token=e;let n=this._specs,r=this._kinds,i=this._objs,a=this._vers,o=n.length;for(let e=0;e<o;e++){let o=n[e],s=null,c=0;if(t.reuseAllocationBindings){let e=ot(o);s=e.buffer||e,e.buffer&&(e.offset!==void 0||e.size!==void 0)&&(c=`${e.offset??0}:${e.size??`all`}`)}else switch(r[e]){case st:s=o.uniform;break;case ct:s=I(o.uniformBuffer);break;case lt:s=I(o.storage),s.getGPU&&(s.getGPU(),c=s.version);break;case ut:s=I(o.storageTexture||o.texture),s&&s.getGPU&&(s.getGPU(),c=s.version);break;default:s=o.sampler}i[e]=s,a[e]=c}let s=this._blocks;for(let t=0;t<s.length;t++)s[t].upload(e);if(this._entry&&this._matches(this._entry))return this.group;let c=this._cache;for(let e=0;e<c.length;e++){let t=c[e];if(t!==this._entry&&this._matches(t))return this._entry=t,this.group=t.group,this.group}let l=Array(o);for(let e=0;e<o;e++)l[e]={binding:e,resource:ot(n[e])};return this.group=t.device.createBindGroup({label:this.label,layout:this.layout,entries:l}),this._entry={objs:i.slice(),vers:a.slice(),group:this.group},c.unshift(this._entry),c.length>pt&&c.pop(),this.group}_matches(e){let t=this._objs,n=this._vers,r=e.objs,i=e.vers;for(let e=0;e<t.length;e++)if(t[e]!==r[e]||n[e]!==i[e])return!1;return!0}},_t=null,vt=null;function yt(e){_t=e,vt=null}function bt(e){if(vt||={},!vt[e]){let t={frame:{uniform:_t}};for(let[e,n,r]of $e)t[e]={sampler:n,samplerType:r};vt[e]=new gt(t,e,`group0-`+e)}return vt[e]}var xt=new WeakMap;function St(e,t=`render`){if(e===_t)return bt(t);let n=xt.get(e);if(n||xt.set(e,n={}),!n[t]){let r={frame:{uniform:e}};for(let[e,t,n]of $e)r[e]={sampler:t,samplerType:n};n[t]=new gt(r,t,`group0-`+e.label)}return n[t]}function Ct({modules:e=[],bindings:n={},code:r=``,defines:i={},stage:a=`render`,label:o=`shader`,header:s=``}){let c=nt(e),l={};for(let e of c)for(let t in e.bindings){if(l[t]&&l[t]!==e.bindings[t]&&!Tt(l[t],e.bindings[t]))throw Error(`${o}: binding ${t} declared twice (${e.name})`);l[t]=e.bindings[t]}for(let e in n)l[e]=n[e];let u=null,d=null;if(a===`render`&&/@vertex\s+fn\s+vs\b/.test(r)){let e=``;for(let t of c)e+=t.code+`
`;let n=rt(e+r,i),a=wt(n,`vs`),o=/@fragment\s+fn\s+fs\b/.test(n)?wt(n,`fs`):null;u={};for(let e in l)!a.has(e)&&(!o||o.has(e))?u[e]=`fragment`:o&&!o.has(e)&&a.has(e)&&(u[e]=`vertex`);d=new Set;let s=t.limits||{},f=(s.maxUniformBuffersPerShaderStage||12)-2,p={vertex:s.maxStorageBuffersInVertexStage??4,fragment:s.maxStorageBuffersInFragmentStage??s.maxStorageBuffersPerShaderStage??8},m=(e,t)=>!u[e]||u[e]===t;for(let e of[`fragment`,`vertex`]){let t=Object.keys(l).filter(t=>l[t].uniform&&m(t,e)&&!d.has(t)),n=Object.keys(l).filter(t=>(l[t].storage||d.has(t))&&m(t,e)).length;t.sort((t,n)=>(u[t]===e?0:1)-(u[n]===e?0:1));let r=t.length;for(let i of t){if(r<=f||n>=p[e])break;d.add(i),n++,r--}}}let f=new gt(l,a,o+`.g1`,u,d),p=bt(a),m=[...new Set([...p.structs(),...f.structs()])],h=``;t.features.has(`shader-f16`)&&i.F16&&(h+=`enable f16;
`),i.CLIP_DISTANCES&&(h+=`enable clip_distances;
`),/diagnostic\s*\(\s*off\s*,\s*derivative_uniformity/.test(s)||(h+=`diagnostic( off, derivative_uniformity );
`),h+=s,h+=m.map(e=>e.wgsl).join(`
`)+`
`,h+=p.declarations(0)+`
`,h+=f.declarations(1)+`
`;for(let e of c)h+=`// ---- ${e.name}\n${e.code}\n`;return h+=r,{code:rt(h,i),bindings:f,group0:p,modules:c}}function wt(e,t){let n=new Map,r=/\bfn\s+([A-Za-z_]\w*)\s*\(/g,i;for(;i=r.exec(e);){let a=e.indexOf(`{`,i.index);if(a<0)break;let o=0,s=a;for(;s<e.length;s++){let t=e[s];if(t===`{`)o++;else if(t===`}`&&--o===0)break}(!/@(vertex|fragment|compute)[^;{}]*$/.test(e.slice(Math.max(0,i.index-80),i.index))||i[1]===t)&&n.set(i[1],e.slice(i.index,s+1)),r.lastIndex=s+1}let a=new Set,o=[t],s=new Set;for(;o.length;){let e=o.pop();if(!s.has(e)&&n.has(e)){s.add(e);for(let t of n.get(e).match(/[A-Za-z_]\w*/g)||[])a.add(t),n.has(t)&&!s.has(t)&&o.push(t)}}return a}function Tt(e,t){let n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&n.every(n=>e[n]===t[n])}var Et=new Map;function Dt(e,n){let r=Et.get(e);return r||(r=t.device.createShaderModule({label:n,code:e}),Et.set(e,r),r.getCompilationInfo&&r.getCompilationInfo().then(t=>{let r=t.messages.filter(e=>e.type===`error`);if(!r.length)return;let i=e.split(`
`);for(let e of r){let t=Math.max(0,e.lineNum-4),r=Math.min(i.length,e.lineNum+2),a=i.slice(t,r).map((n,r)=>`${t+r+1}${t+r+1===e.lineNum?`>`:` `} ${n}`).join(`
`);console.error(`WGSL error in ${n} (${e.lineNum}:${e.linePos}): ${e.message}\n${a}`)}}),r)}var L=new F({name:`common`,code:`
const PI: f32 = 3.141592653589793;
const TWO_PI: f32 = 6.283185307179586;
const INV_PI: f32 = 0.3183098861837907;
const EPS: f32 = 1e-5;

fn sat( x: f32 ) -> f32 { return clamp( x, 0.0, 1.0 ); }
fn sat3( x: vec3f ) -> vec3f { return clamp( x, vec3f( 0.0 ), vec3f( 1.0 ) ); }
fn pow2( x: f32 ) -> f32 { return x * x; }
fn pow4( x: f32 ) -> f32 { let y = x * x; return y * y; }
fn pow5( x: f32 ) -> f32 { let y = x * x; return y * y * x; }
fn luminance( c: vec3f ) -> f32 { return dot( c, vec3f( 0.2126, 0.7152, 0.0722 ) ); }
fn remap( x: f32, a: f32, b: f32, c: f32, d: f32 ) -> f32 { return c + ( x - a ) * ( d - c ) / ( b - a ); }
fn remapClamp( x: f32, a: f32, b: f32, c: f32, d: f32 ) -> f32 { return mix( c, d, sat( ( x - a ) / ( b - a ) ) ); }
fn rotate2( v: vec2f, a: f32 ) -> vec2f { let c = cos( a ); let s = sin( a ); return vec2f( c * v.x - s * v.y, s * v.x + c * v.y ); }

// ---- depth (reversed-Z: 1 at the near plane, 0 at far / infinity)

// positive view-space distance along the view axis from a depth-buffer value
fn viewDepth( d: f32 ) -> f32 {
	let v = frame.invProj * vec4f( 0.0, 0.0, d, 1.0 );
	return - v.z / v.w;
}

// uv (0..1, y down) + depth -> world / view position
fn ndcFromUv( uv: vec2f, d: f32 ) -> vec4f { return vec4f( uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, d, 1.0 ); }
fn worldFromDepth( uv: vec2f, d: f32 ) -> vec3f {
	let p = frame.invViewProj * ndcFromUv( uv, d );
	return p.xyz / p.w;
}
fn viewFromDepth( uv: vec2f, d: f32 ) -> vec3f {
	let p = frame.invProj * ndcFromUv( uv, d );
	return p.xyz / p.w;
}
// world direction of the camera ray through uv
fn viewRay( uv: vec2f ) -> vec3f {
	let p = frame.invViewProj * ndcFromUv( uv, 0.5 );
	return normalize( p.xyz / p.w - frame.cameraPos );
}
// world position -> uv (y down) and depth
fn projectToUv( P: vec3f ) -> vec3f {
	let c = frame.viewProjNoJitter * vec4f( P, 1.0 );
	let n = c.xyz / c.w;
	return vec3f( n.x * 0.5 + 0.5, 0.5 - n.y * 0.5, n.z );
}
fn isSky( d: f32 ) -> bool { return d <= 0.0; }

// ---- hashes

fn pcg( v: u32 ) -> u32 {
	let state = v * 747796405u + 2891336453u;
	let word = ( ( state >> ( ( state >> 28u ) + 4u ) ) ^ state ) * 277803737u;
	return ( word >> 22u ) ^ word;
}
fn pcg3( v0: vec3u ) -> vec3u {
	var v = v0 * 1664525u + 1013904223u;
	v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
	v ^= v >> vec3u( 16u );
	v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
	return v;
}
fn u32ToUnit( h: u32 ) -> f32 { return f32( h >> 8u ) * ( 1.0 / 16777216.0 ) + ( 0.5 / 16777216.0 ); }
// float hash in [0, 1) of a float seed (TSL hash())
fn hash11( p: f32 ) -> f32 { return u32ToUnit( pcg( bitcast<u32>( p ) ^ 0x9e3779b9u ) ); }
fn hash21( p: vec2f ) -> f32 { return u32ToUnit( pcg( bitcast<u32>( p.x ) ^ pcg( bitcast<u32>( p.y ) ) ) ); }
fn hash31( p: vec3f ) -> f32 { return u32ToUnit( pcg3( bitcast<vec3u>( p ) ).x ); }
fn hash22( p: vec2f ) -> vec2f {
	let h = pcg3( vec3u( bitcast<vec2u>( p ), 0x51ed270bu ) );
	return vec2f( u32ToUnit( h.x ), u32ToUnit( h.y ) );
}
fn hash33( p: vec3f ) -> vec3f {
	let h = pcg3( bitcast<vec3u>( p ) );
	return vec3f( u32ToUnit( h.x ), u32ToUnit( h.y ), u32ToUnit( h.z ) );
}
fn hashU( a: u32, b: u32 ) -> f32 { return u32ToUnit( pcg( a ^ pcg( b ) ) ); }
fn ihash3( p: vec3i ) -> vec3u { return pcg3( bitcast<vec3u>( p ) ); }

// Jimenez interleaved gradient noise at a pixel (0..1)
fn interleavedGradientNoise( px: vec2f ) -> f32 { return fract( 52.9829189 * fract( dot( px, vec2f( 0.06711056, 0.00583715 ) ) ) ); }

// i-th of n points of a Vogel disc (unit radius), rotated by phi
fn vogelDiskSample( i: i32, n: i32, phi: f32 ) -> vec2f {
	let r = sqrt( ( f32( i ) + 0.5 ) / f32( n ) );
	let theta = f32( i ) * 2.399963229728653 + phi;
	return vec2f( cos( theta ), sin( theta ) ) * r;
}

// ---- gradient noise: MaterialX (three's MaterialXNoise.js) bit for bit — the same Jenkins
// lookup3 hash, gradients, quintic fade and gradient scales (0.6616 in 2D, 0.982 in 3D), so the
// procedural patterns land where they did in the three.js version.

fn _mxRotl( x: u32, k: u32 ) -> u32 { return ( x << k ) | ( x >> ( 32u - k ) ); }
fn _mxFinal( a0: u32, b0: u32, c0: u32 ) -> u32 {
	var a = a0; var b = b0; var c = c0;
	c ^= b; c -= _mxRotl( b, 14u );
	a ^= c; a -= _mxRotl( c, 11u );
	b ^= a; b -= _mxRotl( a, 25u );
	c ^= b; c -= _mxRotl( b, 16u );
	a ^= c; a -= _mxRotl( c, 4u );
	b ^= a; b -= _mxRotl( a, 14u );
	c ^= b; c -= _mxRotl( b, 24u );
	return c;
}
fn mxHash2( x: i32, y: i32 ) -> u32 { let s = 0xdeadbeefu + ( 2u << 2u ) + 13u; return _mxFinal( s + u32( x ), s + u32( y ), s ); }
fn mxHash3( x: i32, y: i32, z: i32 ) -> u32 { let s = 0xdeadbeefu + ( 3u << 2u ) + 13u; return _mxFinal( s + u32( x ), s + u32( y ), s + u32( z ) ); }
fn _mxGrad2( hash: u32, x: f32, y: f32 ) -> f32 {
	let h = hash & 7u;
	let u = select( y, x, h < 4u );
	let v = 2.0 * select( x, y, h < 4u );
	return select( u, - u, ( h & 1u ) != 0u ) + select( v, - v, ( h & 2u ) != 0u );
}
fn _gradDot3( h: u32, p: vec3f ) -> f32 {
	let hh = h & 15u;
	let u = select( p.y, p.x, hh < 8u );
	let v = select( select( p.z, p.x, hh == 12u || hh == 14u ), p.y, hh < 4u );
	return select( u, - u, ( hh & 1u ) != 0u ) + select( v, - v, ( hh & 2u ) != 0u );
}
fn _fade3( t: vec3f ) -> vec3f { return t * t * t * ( t * ( t * 6.0 - 15.0 ) + 10.0 ); }
fn _h3( i: vec3i ) -> u32 { return mxHash3( i.x, i.y, i.z ); }

fn perlin3( p: vec3f ) -> f32 {
	let fl = floor( p );
	let i = vec3i( fl );
	let f = p - fl;
	let u = _fade3( f );
	let n000 = _gradDot3( _h3( i ), f );
	let n100 = _gradDot3( _h3( i + vec3i( 1, 0, 0 ) ), f - vec3f( 1.0, 0.0, 0.0 ) );
	let n010 = _gradDot3( _h3( i + vec3i( 0, 1, 0 ) ), f - vec3f( 0.0, 1.0, 0.0 ) );
	let n110 = _gradDot3( _h3( i + vec3i( 1, 1, 0 ) ), f - vec3f( 1.0, 1.0, 0.0 ) );
	let n001 = _gradDot3( _h3( i + vec3i( 0, 0, 1 ) ), f - vec3f( 0.0, 0.0, 1.0 ) );
	let n101 = _gradDot3( _h3( i + vec3i( 1, 0, 1 ) ), f - vec3f( 1.0, 0.0, 1.0 ) );
	let n011 = _gradDot3( _h3( i + vec3i( 0, 1, 1 ) ), f - vec3f( 0.0, 1.0, 1.0 ) );
	let n111 = _gradDot3( _h3( i + vec3i( 1, 1, 1 ) ), f - vec3f( 1.0, 1.0, 1.0 ) );
	let x0 = mix( mix( n000, n100, u.x ), mix( n010, n110, u.x ), u.y );
	let x1 = mix( mix( n001, n101, u.x ), mix( n011, n111, u.x ), u.y );
	return mix( x0, x1, u.z ) * 0.982;
}
fn perlin2( p: vec2f ) -> f32 {
	let fl = floor( p );
	let X = i32( fl.x ); let Y = i32( fl.y );
	let fx = p.x - fl.x; let fy = p.y - fl.y;
	let u = _fade3( vec3f( fx, fy, 0.0 ) );
	let v0 = _mxGrad2( mxHash2( X, Y ), fx, fy );
	let v1 = _mxGrad2( mxHash2( X + 1, Y ), fx - 1.0, fy );
	let v2 = _mxGrad2( mxHash2( X, Y + 1 ), fx, fy - 1.0 );
	let v3 = _mxGrad2( mxHash2( X + 1, Y + 1 ), fx - 1.0, fy - 1.0 );
	let s1 = 1.0 - u.x;
	return ( ( 1.0 - u.y ) * ( v0 * s1 + v1 * u.x ) + u.y * ( v2 * s1 + v3 * u.x ) ) * 0.6616;
}
fn mx_noise_float3( p: vec3f ) -> f32 { return perlin3( p ); }
fn mx_noise_float2( p: vec2f ) -> f32 { return perlin2( p ); }
// MaterialX vec3 noise: one hash per corner, its three low bytes pick the gradients
fn _mxGrad3v( h: u32, p: vec3f ) -> vec3f { return vec3f( _gradDot3( h & 0xffu, p ), _gradDot3( ( h >> 8u ) & 0xffu, p ), _gradDot3( ( h >> 16u ) & 0xffu, p ) ); }
fn mx_noise_vec3( p: vec3f ) -> vec3f {
	let fl = floor( p );
	let i = vec3i( fl );
	let f = p - fl;
	let u = _fade3( f );
	let n000 = _mxGrad3v( _h3( i ), f );
	let n100 = _mxGrad3v( _h3( i + vec3i( 1, 0, 0 ) ), f - vec3f( 1.0, 0.0, 0.0 ) );
	let n010 = _mxGrad3v( _h3( i + vec3i( 0, 1, 0 ) ), f - vec3f( 0.0, 1.0, 0.0 ) );
	let n110 = _mxGrad3v( _h3( i + vec3i( 1, 1, 0 ) ), f - vec3f( 1.0, 1.0, 0.0 ) );
	let n001 = _mxGrad3v( _h3( i + vec3i( 0, 0, 1 ) ), f - vec3f( 0.0, 0.0, 1.0 ) );
	let n101 = _mxGrad3v( _h3( i + vec3i( 1, 0, 1 ) ), f - vec3f( 1.0, 0.0, 1.0 ) );
	let n011 = _mxGrad3v( _h3( i + vec3i( 0, 1, 1 ) ), f - vec3f( 0.0, 1.0, 1.0 ) );
	let n111 = _mxGrad3v( _h3( i + vec3i( 1, 1, 1 ) ), f - vec3f( 1.0, 1.0, 1.0 ) );
	let x0 = mix( mix( n000, n100, u.x ), mix( n010, n110, u.x ), u.y );
	let x1 = mix( mix( n001, n101, u.x ), mix( n011, n111, u.x ), u.y );
	return mix( x0, x1, u.z ) * 0.982;
}
fn mx_fractal_noise_float3( p: vec3f, octaves: i32, lacunarity: f32, diminish: f32 ) -> f32 {
	var r = 0.0; var amp = 1.0; var q = p;
	for ( var i = 0; i < octaves; i++ ) { r += amp * perlin3( q ); amp *= diminish; q *= lacunarity; }
	return r;
}
fn mx_cell_noise_float3( p: vec3f ) -> f32 { let i = vec3i( floor( p ) ); return f32( mxHash3( i.x, i.y, i.z ) ) / f32( 0xffffffffu ); }
fn mx_cell_noise_float2( p: vec2f ) -> f32 { let i = vec2i( floor( p ) ); return f32( mxHash2( i.x, i.y ) ) / f32( 0xffffffffu ); }
// distances to the nearest two feature points (F1, F2), jitter 0..1
fn mx_worley_noise_vec2_3( p: vec3f, jitter: f32 ) -> vec2f {
	let i = vec3i( floor( p ) );
	let f = fract( p );
	var d1 = 1e9; var d2 = 1e9;
	for ( var z = -1; z <= 1; z++ ) { for ( var y = -1; y <= 1; y++ ) { for ( var x = -1; x <= 1; x++ ) {
		let c = vec3i( x, y, z );
		let h = ihash3( i + c );
		let o = vec3f( f32( c.x ), f32( c.y ), f32( c.z ) ) + ( vec3f( u32ToUnit( h.x ), u32ToUnit( h.y ), u32ToUnit( h.z ) ) - 0.5 ) * jitter + 0.5 - f;
		let d = dot( o, o );
		if ( d < d1 ) { d2 = d1; d1 = d; } else if ( d < d2 ) { d2 = d; }
	} } }
	return sqrt( vec2f( d1, d2 ) );
}
fn mx_worley_noise_vec2_2( p: vec2f, jitter: f32 ) -> vec2f {
	let i = vec2i( floor( p ) );
	let f = fract( p );
	var d1 = 1e9; var d2 = 1e9;
	for ( var y = -1; y <= 1; y++ ) { for ( var x = -1; x <= 1; x++ ) {
		let c = vec2i( x, y );
		let h = ihash3( vec3i( i + c, 0 ) );
		let o = vec2f( f32( c.x ), f32( c.y ) ) + ( vec2f( u32ToUnit( h.x ), u32ToUnit( h.y ) ) - 0.5 ) * jitter + 0.5 - f;
		let d = dot( o, o );
		if ( d < d1 ) { d2 = d1; d1 = d; } else if ( d < d2 ) { d2 = d; }
	} }
	return sqrt( vec2f( d1, d2 ) );
}

// ---- normals

// orthonormal basis around n (Frisvad / Duff et al.)
fn basis( n: vec3f ) -> mat3x3f {
	let s = select( -1.0, 1.0, n.z >= 0.0 );
	let a = -1.0 / ( s + n.z );
	let b = n.x * n.y * a;
	let t = vec3f( 1.0 + s * n.x * n.x * a, s * b, -s * n.x );
	let bt = vec3f( b, s + n.y * n.y * a, -n.y );
	return mat3x3f( t, bt, n );
}

// Perturb a world-space normal by a height field sampled with screen-space derivatives
// (Mikkelsen, "Bump Mapping Unparametrized Surfaces"; TSL perturbNormal equivalent).
// dhdx / dhdy: dpdx / dpdy of the height (in metres) at this pixel.
fn perturbNormalByHeight( P: vec3f, N: vec3f, dhdx: f32, dhdy: f32, strength: f32 ) -> vec3f {
	let dPdx = dpdx( P );
	let dPdy = dpdy( P );
	let r1 = cross( dPdy, N );
	let r2 = cross( N, dPdx );
	let det = dot( dPdx, r1 );
	let grad = sign( det ) * ( dhdx * r1 + dhdy * r2 ) * strength;
	return normalize( abs( det ) * N - grad );
}

// tangent-space normal map sample (xy in -1..1) applied with a derivative-based TBN
fn perturbNormalByMap( P: vec3f, N: vec3f, uv: vec2f, mapN: vec3f ) -> vec3f {
	let dp1 = dpdx( P ); let dp2 = dpdy( P );
	let duv1 = dpdx( uv ); let duv2 = dpdy( uv );
	let dp2perp = cross( dp2, N ); let dp1perp = cross( N, dp1 );
	let T = dp2perp * duv1.x + dp1perp * duv2.x;
	let B = dp2perp * duv1.y + dp1perp * duv2.y;
	let invmax = inverseSqrt( max( max( dot( T, T ), dot( B, B ) ), 1e-20 ) );
	return normalize( mat3x3f( T * invmax, B * invmax, N ) * mapN );
}

// ---- color

fn srgbToLinear( c: vec3f ) -> vec3f {
	return select( pow( ( c + 0.055 ) / 1.055, vec3f( 2.4 ) ), c / 12.92, c <= vec3f( 0.04045 ) );
}
fn linearToSrgb( c: vec3f ) -> vec3f {
	return select( 1.055 * pow( c, vec3f( 1.0 / 2.4 ) ) - 0.055, c * 12.92, c <= vec3f( 0.0031308 ) );
}
`}),R=class e{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){return this[`xyzw`[e]]=t,this}getComponent(e){return this[`xyzw`[e]]}clone(){return new e(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.dot(this)}length(){return Math.sqrt(this.dot(this))}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};R.prototype.isVector4=!0;var Ot=`srgb`,kt=`srgb-linear`,At=e=>e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4,z=e=>e<.0031308?e*12.92:1.055*e**.41666-.055,jt=e=>Math.max(0,Math.min(1,e)),Mt=(e,t)=>(e%t+t)%t;function Nt(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Pt={h:0,s:0,l:0},B=class e{constructor(e,t,n){this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){if(e===void 0)return this;e&&e.isColor?this.copy(e):typeof e==`number`?this.setHex(e):typeof e==`string`&&this.setStyle(e)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.setRGB((e>>16&255)/255,(e>>8&255)/255,(e&255)/255,t)}setRGB(e,t,n,r=kt){return r===`srgb`&&(e=At(e),t=At(t),n=At(n)),this.r=e,this.g=t,this.b=n,this}setHSL(e,t,n,r=kt){if(e=Mt(e,1),t=jt(t),n=jt(n),t===0)return this.setRGB(n,n,n,r);let i=n<=.5?n*(1+t):n+t-n*t,a=2*n-i;return this.setRGB(Nt(a,i,e+1/3),Nt(a,i,e),Nt(a,i,e-1/3),r)}setStyle(e,t=Ot){let n;if(n=/^#([A-Fa-f\d]+)$/.exec(e)){let e=n[1];if(e.length===3)return this.setRGB(parseInt(e[0],16)/15,parseInt(e[1],16)/15,parseInt(e[2],16)/15,t);if(e.length===6)return this.setHex(parseInt(e,16),t)}else if(n=/^rgba?\(\s*([\d.]+)(%?)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*(?:,\s*[\d.]+\s*)?\)$/.exec(e)){let e=n[2]===`%`?100:255;return this.setRGB(Math.min(1,n[1]/e),Math.min(1,n[3]/e),Math.min(1,n[4]/e),t)}else if(n=/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*[\d.]+\s*)?\)$/.exec(e))return this.setHSL(n[1]/360,n[2]/100,n[3]/100,t);else if(Ft[e.toLowerCase()]!==void 0)return this.setHex(Ft[e.toLowerCase()],t);return console.warn(`Color: unknown color `+e),this}clone(){return new e(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=At(e.r),this.g=At(e.g),this.b=At(e.b),this}copyLinearToSRGB(e){return this.r=z(e.r),this.g=z(e.g),this.b=z(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this)}convertLinearToSRGB(){return this.copyLinearToSRGB(this)}getHex(e=Ot){let t=this.r,n=this.g,r=this.b;return e===`srgb`&&(t=z(t),n=z(n),r=z(r)),Math.round(jt(t)*255)*65536+Math.round(jt(n)*255)*256+Math.round(jt(r)*255)}getHexString(e=Ot){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=kt){let n=this.r,r=this.g,i=this.b;t===`srgb`&&(n=z(n),r=z(r),i=z(i));let a=Math.max(n,r,i),o=Math.min(n,r,i),s=0,c=0,l=(o+a)/2;if(o!==a){let e=a-o;c=l<=.5?e/(a+o):e/(2-a-o),s=a===n?(r-i)/e+(r<i?6:0):a===r?(i-n)/e+2:(n-r)/e+4,s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=kt){return e.r=this.r,e.g=this.g,e.b=this.b,t===`srgb`&&(e.r=z(e.r),e.g=z(e.g),e.b=z(e.b)),e}getStyle(e=Ot){let t=this.getRGB({},e);return`rgb(${Math.round(t.r*255)},${Math.round(t.g*255)},${Math.round(t.b*255)})`}offsetHSL(e,t,n){return this.getHSL(Pt),this.setHSL(Pt.h+e,Pt.s+t,Pt.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};B.prototype.isColor=!0;var Ft={black:0,white:16777215,red:16711680,green:32768,lime:65280,blue:255,yellow:16776960,cyan:65535,magenta:16711935,gray:8421504,grey:8421504,orange:16753920};B.NAMES=Ft;var It=new l,Lt=Array.from({length:8},()=>new l),V=class e{constructor(e=new l(1/0,1/0,1/0),t=new l(-1/0,-1/0,-1/0)){this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0;t<e.length;t+=3)this.expandByPoint(It.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0;t<e.count;t++)this.expandByPoint(It.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t of e)this.expandByPoint(t);return this}setFromCenterAndSize(e,t){return It.copy(t).multiplyScalar(.5),this.min.copy(e).sub(It),this.max.copy(e).add(It),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new e().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t&&r!==void 0)for(let t=0;t<r.count;t++)this.expandByPoint(It.fromBufferAttribute(r,t).applyMatrix4(e.matrixWorld));else n.boundingBox===null&&n.computeBoundingBox(),Rt.copy(n.boundingBox).applyMatrix4(e.matrixWorld),this.union(Rt)}for(let n of e.children)this.expandByObject(n,t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,It),It.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n,r=e.normal;return r.x>0?(t=r.x*this.min.x,n=r.x*this.max.x):(t=r.x*this.max.x,n=r.x*this.min.x),r.y>0?(t+=r.y*this.min.y,n+=r.y*this.max.y):(t+=r.y*this.max.y,n+=r.y*this.min.y),r.z>0?(t+=r.z*this.min.z,n+=r.z*this.max.z):(t+=r.z*this.max.z,n+=r.z*this.min.z),t<=-e.constant&&n>=-e.constant}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,It).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?(e.makeEmpty(),e):(this.getCenter(e.center),e.radius=this.getSize(It).length()*.5,e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){if(this.isEmpty())return this;let t=this.min,n=this.max;return Lt[0].set(t.x,t.y,t.z).applyMatrix4(e),Lt[1].set(t.x,t.y,n.z).applyMatrix4(e),Lt[2].set(t.x,n.y,t.z).applyMatrix4(e),Lt[3].set(t.x,n.y,n.z).applyMatrix4(e),Lt[4].set(n.x,t.y,t.z).applyMatrix4(e),Lt[5].set(n.x,t.y,n.z).applyMatrix4(e),Lt[6].set(n.x,n.y,t.z).applyMatrix4(e),Lt[7].set(n.x,n.y,n.z).applyMatrix4(e),this.setFromPoints(Lt)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};V.prototype.isBox3=!0;var Rt=new V,zt=new V,Bt=new l,Vt=class e{constructor(e=new l,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){t===void 0?zt.setFromPoints(e).getCenter(this.center):this.center.copy(t);let n=0;for(let t of e)n=Math.max(n,this.center.distanceToSquared(t));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}clone(){return new e().copy(this)}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&t.sub(this.center).normalize().multiplyScalar(this.radius).add(this.center),t}getBoundingBox(e){return this.isEmpty()?e.makeEmpty():(e.set(this.center,this.center),e.expandByScalar(this.radius))}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bt.subVectors(e,this.center);let t=Bt.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Bt,n/e),this.radius+=n}return this}union(e){if(e.isEmpty())return this;if(this.isEmpty())return this.copy(e);let t=this.center.distanceTo(e.center);if(t+e.radius<=this.radius)return this;if(t+this.radius<=e.radius)return this.copy(e);let n=(t+this.radius+e.radius)*.5;return this.center.lerp(e.center,(n-this.radius)/t),this.radius=n,this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}};Vt.prototype.isSphere=!0;var Ht=new l,Ut=new l,Wt=new T,Gt=class e{constructor(e=new l(1,0,0),t=0){this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(e),this}setFromCoplanarPoints(e,t,n){let r=Ht.subVectors(n,t).cross(Ut.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e)}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}clone(){return new e().copy(this)}normalize(){let e=this.normal.length();if(e===0)return this;let t=1/e;return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}applyMatrix4(e,t){let n=t||Wt.getNormalMatrix(e),r=this.coplanarPoint(Ht).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}};Gt.prototype.isPlane=!0;var Kt=new Vt,qt=new l,Jt=class e{constructor(e=new Gt,t=new Gt,n=new Gt,r=new Gt,i=new Gt,a=new Gt){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){for(let t=0;t<6;t++)this.planes[t].copy(e.planes[t]);return this}clone(){return new e().copy(this)}setFromProjectionMatrix(e,t=u,n=!0){let r=this.planes,i=e.elements,a=i[0],o=i[4],s=i[8],c=i[12],l=i[1],d=i[5],f=i[9],p=i[13],m=i[2],h=i[6],g=i[10],_=i[14],v=i[3],y=i[7],b=i[11],x=i[15];return r[0].setComponents(v+a,y+o,b+s,x+c).normalize(),r[1].setComponents(v-a,y-o,b-s,x-c).normalize(),r[2].setComponents(v+l,y+d,b+f,x+p).normalize(),r[3].setComponents(v-l,y-d,b-f,x-p).normalize(),n?(r[4].setComponents(v-m,y-h,b-g,x-_).normalize(),r[5].setComponents(m,h,g,_).normalize()):t===2e3?(r[4].setComponents(v+m,y+h,b+g,x+_).normalize(),r[5].setComponents(v-m,y-h,b-g,x-_).normalize()):(r[4].setComponents(m,h,g,_).normalize(),r[5].setComponents(v-m,y-h,b-g,x-_).normalize()),this}intersectsObject(e){let t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Kt.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Kt)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n].normal;if(qt.x=r.x>0?e.max.x:e.min.x,qt.y=r.y>0?e.max.y:e.min.y,qt.z=r.z>0?e.max.z:e.min.z,t[n].distanceToPoint(qt)<0)return!1}return!0}containsPoint(e){for(let t=0;t<6;t++)if(this.planes[t].distanceToPoint(e)<0)return!1;return!0}},Yt=class{constructor(){this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}getPoint(){throw Error(`Curve.getPoint() not implemented`)}getPointAt(e,t){return this.getPoint(this.getUtoTmapping(e),t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[0],n=this.getPoint(0),r=0;for(let i=1;i<=e;i++){let a=this.getPoint(i/e);r+=a.distanceTo(n),t.push(r),n=a}return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=n.length,i=t===null?e*n[r-1]:t,a=0,o=r-1;for(;a<=o;){let e=Math.floor(a+(o-a)/2),t=n[e]-i;if(t<0)a=e+1;else if(t>0)o=e-1;else{o=e;break}}let s=o;if(n[s]===i)return s/(r-1);let c=n[s],l=n[s+1];return(s+(i-c)/(l-c))/(r-1)}getTangent(e,t=new l){let n=1e-4,r=Math.max(0,e-n),i=Math.min(1,e+n),a=this.getPoint(r),o=this.getPoint(i);return t.copy(o).sub(a).normalize()}getTangentAt(e,t){return this.getTangent(this.getUtoTmapping(e),t)}computeFrenetFrames(e,t){let n=new l,r=[],i=[],a=[],o=new l,s=new v;for(let t=0;t<=e;t++)r[t]=this.getTangentAt(t/e,new l);i[0]=new l,a[0]=new l;let c=Number.MAX_VALUE,u=Math.abs(r[0].x),d=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(Math.max(-1,Math.min(1,r[t-1].dot(r[t]))));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(Math.max(-1,Math.min(1,i[0].dot(i[e]))))/e;r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}};function Xt(e,t,n,r,i){e[0]=t,e[1]=r,e[2]=-3*t+3*n-2*r-i,e[3]=2*t-2*n+r+i}function Zt(e,t,n,r,i,a){Xt(e,n,r,a*(r-t),a*(i-n))}function Qt(e,t,n,r,i,a,o,s){let c=(n-t)/a-(r-t)/(a+o)+(r-n)/o,l=(r-n)/o-(i-n)/(o+s)+(i-r)/s;c*=o,l*=o,Xt(e,n,r,c,l)}var $t=(e,t)=>e[0]+t*(e[1]+t*(e[2]+t*e[3])),en=[0,0,0,0],tn=[0,0,0,0],nn=[0,0,0,0],rn=new l,an=new l,on=class e extends Yt{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new l){let n=this.points,r=n.length,i=(r-+!this.closed)*e,a=Math.floor(i),o=i-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:o===0&&a===r-1&&(a=r-2,o=1);let s,c;s=this.closed||a>0?n[(a-1)%r]:rn.subVectors(n[0],n[1]).add(n[0]);let u=n[a%r],d=n[(a+1)%r];if(c=this.closed||a+2<r?n[(a+2)%r]:an.subVectors(n[r-1],n[r-2]).add(n[r-1]),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=s.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(c)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Qt(en,s.x,u.x,d.x,c.x,t,n,r),Qt(tn,s.y,u.y,d.y,c.y,t,n,r),Qt(nn,s.z,u.z,d.z,c.z,t,n,r)}else Zt(en,s.x,u.x,d.x,c.x,this.tension),Zt(tn,s.y,u.y,d.y,c.y,this.tension),Zt(nn,s.z,u.z,d.z,c.z,this.tension);return t.set($t(en,o),$t(tn,o),$t(nn,o))}copy(e){return super.copy(e),this.points=e.points.map(e=>e.clone()),this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}clone(){return new e().copy(this)}};on.prototype.isCatmullRomCurve3=!0;function sn(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}var cn=e=>sn(e)<0;function ln(e){let t=e.length;t>2&&e[t-1].x===e[0].x&&e[t-1].y===e[0].y&&e.pop()}var un=(e,t,n)=>(t.x-e.x)*(n.y-t.y)-(t.y-e.y)*(n.x-t.x),dn=(e,t)=>e.x===t.x&&e.y===t.y;function fn(e,t,n,r){return(n.x-r.x)*(e.y-r.y)>=(e.x-r.x)*(n.y-r.y)&&(e.x-r.x)*(t.y-r.y)>=(t.x-r.x)*(e.y-r.y)&&(t.x-r.x)*(n.y-r.y)>=(n.x-r.x)*(t.y-r.y)}function pn(e,t){let n=0;for(let r=0,i=e.length-1;r<e.length;i=r++)n+=t[e[i]].x*t[e[r]].y-t[e[r]].x*t[e[i]].y;return n}function mn(e,t,n){let r=0;for(let e=1;e<t.length;e++)n[t[e]].x>n[t[r]].x&&(r=e);let i=n[t[r]],a=1/0,o=-1,s=e.length;for(let t=0;t<s;t++){let r=n[e[t]],c=n[e[(t+1)%s]];if(r.y<=i.y&&i.y<=c.y||c.y<=i.y&&i.y<=r.y){if(r.y===c.y)continue;let e=r.x+(i.y-r.y)*(c.x-r.x)/(c.y-r.y);e>=i.x&&e<a&&(a=e,o=r.x>c.x?t:(t+1)%s)}}if(o<0)return e;let c={x:a,y:i.y},l=n[e[o]];if(a!==l.x||i.y!==l.y){let t=1/0,r=l.y<i.y?[i,l,c]:[i,c,l],a=o;for(let c=0;c<s;c++){let u=(a+c)%s,d=n[e[u]];if(d.x<i.x||u===a)continue;let f=n[e[(u+s-1)%s]],p=n[e[(u+1)%s]];if(!(un(f,d,p)<0)&&(d.x!==i.x||d.y!==i.y)||!hn(r,d))continue;let m=Math.abs(i.y-d.y)/(d.x-i.x||1e-12);(m<t||m===t&&d.x<l.x)&&(t=m,o=u,l=d)}}for(let t=0;t<s;t++){if(!dn(n[e[t]],l))continue;let r=n[e[(t+s-1)%s]],a=n[e[(t+1)%s]],c=un(r,l,i)>=0,u=un(l,a,i)>=0;if(un(r,l,a)>=0?c&&u:c||u){o=t;break}}let u=t.slice(r).concat(t.slice(0,r));return e.slice(0,o+1).concat(u,[t[r],e[o]],e.slice(o+1))}function hn(e,t){let[n,r,i]=un(e[0],e[1],e[2])>=0?e:[e[0],e[2],e[1]];return fn(n,r,i,t)}function gn(e,t,n){let r=e.slice(),i=0;for(;r.length>3&&i++<1e5;){let e=r.length,i=!1;for(let a=0;a<2&&!i;a++)for(let o=0;o<e;o++){let s=r[(o+e-1)%e],c=r[o],l=r[(o+1)%e],u=t[s],d=t[c],f=t[l],p=un(u,d,f);if(a===0?p<=0:p<0)continue;let m=!0;if(p>0)for(let n=0;n<e;n++){let e=t[r[n]];if(!(dn(e,u)||dn(e,d)||dn(e,f))&&fn(u,d,f,e)){m=!1;break}}if(m){n.push([s,c,l]),r.splice(o,1),i=!0;break}}if(!i){let i=0,a=-1/0;for(let n=0;n<e;n++){let o=un(t[r[(n+e-1)%e]],t[r[n]],t[r[(n+1)%e]]);o>a&&(a=o,i=n)}n.push([r[(i+e-1)%e],r[i],r[(i+1)%e]]),r.splice(i,1)}}return r.length===3&&n.push([r[0],r[1],r[2]]),n}function _n(e,t=[]){ln(e),t.forEach(ln);let n=e.concat(...t),r=e.map((e,t)=>t),i=pn(r,n)<0;i&&r.reverse();let a=e.length,o=t.map(e=>{let t=e.map((e,t)=>a+t);return a+=e.length,pn(t,n)>0&&t.reverse(),t}).filter(e=>e.length>=3);o.sort((e,t)=>Math.max(...t.map(e=>n[e].x))-Math.max(...e.map(e=>n[e].x)));for(let e of o)r=mn(r,e,n);let s=gn(r,n,[]);if(i)for(let e of s){let t=e[0];e[0]=e[2],e[2]=t}return s}var vn={area:sn,isClockWise:cn,triangulateShape:_n};new Uint32Array(new Float32Array(1).buffer);var yn={hooks:{},version:0,set(e,t){this.hooks[e]=t,this.version++},modules(){return Object.values(this.hooks).filter(Boolean)}},bn={directModulation:`fn hookDirectModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }`,ambientModulation:`fn hookAmbientModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }`,shadowPosition:`fn hookShadowPosition( P: vec3f, N: vec3f, pixel: vec2f ) -> vec3f { return P; }`,bounce:`fn hookBounce( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 0.0 ); }`,localLights:`fn hookLocalLights( s: Surface, P: vec3f, N: vec3f, V: vec3f, acc: ptr<function, LightAccum> ) {}`,envSpecular:`fn hookEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f { let t = sat( R.y * 0.5 + 0.5 ); return mix( frame.horizonColor * 0.6, frame.skyIrradiance * PI, t ) * frame.envIntensity; }`,envDiffuse:`fn hookEnvDiffuse( N: vec3f ) -> vec3f { return mix( frame.horizonColor * 0.25, frame.skyIrradiance, N.y * 0.5 + 0.5 ) * frame.envIntensity; }`};function xn(){let e=[];for(let t in bn){let n=yn.hooks[t];n?e.push(n):e.push(Cn(t))}return e}var Sn={};function Cn(e){return Sn[e]||(Sn[e]=new F({name:`hook-`+e+`-default`,deps:[On],code:bn[e]}))}var wn=new Ze(`SunShadow`,{matrices:[`mat4x4f[4]`,[new v,new v,new v,new v]],cascades:[`vec4f[4]`,[new R,new R,new R,new R]],count:[`u32`,0],mapSize:[`f32`,2048],bias:[`f32`,2e-5],fade:[`f32`,1],pcssCascades:[`u32`,1],sunAngularDiameter:[`f32`,.00925],enabled:[`f32`,0],pad:[`f32`,0],blend:[`vec4f[4]`,[new R,new R,new R,new R]]}),Tn=null;function En(e){Tn=e}var Dn=new F({name:`sunShadow`,deps:[L],uniforms:wn,uniformName:`shadowParams`,bindings:{sunShadowMap:{texture:()=>Tn,viewDimension:`2d-array`}},code:`
fn shadowCascadeOf( viewDist: f32 ) -> i32 {
	for ( var i = 0; i < i32( shadowParams.count ); i++ ) { if ( viewDist < shadowParams.cascades[ i ].x ) { return i; } }
	return -1;
}

fn _shadowTap( uv: vec2f, layer: i32, z: f32 ) -> f32 {
	return textureSampleCompareLevel( sunShadowMap, smpShadow, uv, layer, z );
}

// shadow map depth (0 near .. 1 far, standard Z) at uv
fn _shadowDepth( uv: vec2f, layer: i32 ) -> f32 {
	let dim = vec2f( textureDimensions( sunShadowMap ) );
	let px = vec2i( clamp( uv * dim, vec2f( 0.0 ), dim - 1.0 ) );
	return textureLoad( sunShadowMap, px, layer, 0 );
}

// Contact-hardening sun shadows (PCSS, the former SunShadowFilter) on the near cascades. The penumbra of a
// real sun shadow grows with the distance from the occluder to the receiver (the sun is a 0.53 deg disc):
// sharp where an object touches the ground, soft under a palm crown 10 m up. Per pixel:
//  1. blocker search: average depth of the occluders around the pixel (raw depth loads, no sampler)
//  2. penumbra width = occluder-receiver distance * sun diameter, converted to this cascade's texels
//  3. percentage-closer filtering over that width
// Both sample sets are Vogel disks rotated per pixel and per frame (interleaved gradient noise): the
// TAA resolves the noise into a smooth gradient. Farther cascades: three's PCFShadowFilter (5 Vogel taps
// of hardware comparisons over one texel, rotated per pixel).
const SHADOW_MAX_OCCLUDER_HEIGHT: f32 = 30.0; // m: search radius covers penumbrae of occluders up to this far above
const SHADOW_SEARCH_TAPS: i32 = 8;
const SHADOW_FILTER_TAPS: i32 = 12;

fn sunShadowCascade( P: vec3f, N: vec3f, c: i32, noise: f32, pcfNoise: f32 ) -> f32 {
	return _sunShadowCascade( P, N, c, noise, pcfNoise, true );
}

// pcss = false: the 5-tap PCF filter in every cascade (no blocker search)
fn _sunShadowCascade( P: vec3f, N: vec3f, c: i32, noise: f32, pcfNoise: f32, pcss: bool ) -> f32 {
	let info = shadowParams.cascades[ c ];
	let Pb = P + N * info.z;
	let sc = shadowParams.matrices[ c ] * vec4f( Pb, 1.0 );
	let uvz = vec3f( sc.x * 0.5 + 0.5, 0.5 - sc.y * 0.5, sc.z );
	if ( any( uvz.xy < vec2f( 0.0 ) ) || any( uvz.xy > vec2f( 1.0 ) ) || uvz.z > 1.0 ) { return 1.0; }
	let z = uvz.z - shadowParams.bias;
	let texel = 1.0 / shadowParams.mapSize;
	if ( pcss && u32( c ) < shadowParams.pcssCascades ) {
		// moved every frame (Jimenez 2014): a noise pattern fixed on screen would never average out
		let phi = noise * TWO_PI;
		let width = info.y * shadowParams.mapSize; // cascade width (m)
		let range = info.w; // depth range (m)
		let SD = shadowParams.sunAngularDiameter;
		// 1. blockers within the widest penumbra this cascade can show. The texel straight along the light
		// ray comes first: a thin occluder (a log, a rope, a rail) can fall between the disk taps, which
		// left lit dots inside its umbra.
		let searchUV = max( min( SHADOW_MAX_OCCLUDER_HEIGHT * SD / width, texel * 24.0 ), texel * 1.5 );
		let d0 = _shadowDepth( uvz.xy, c );
		var blockSum = select( 0.0, d0, d0 < z );
		var blockCount = select( 0.0, 1.0, d0 < z );
		for ( var i = 0; i < SHADOW_SEARCH_TAPS; i++ ) {
			let d = _shadowDepth( uvz.xy + vogelDiskSample( i, SHADOW_SEARCH_TAPS, phi ) * searchUV, c );
			// standard depth: an occluder is closer to the light = smaller depth
			if ( d < z ) { blockSum += d; blockCount += 1.0; }
		}
		if ( blockCount < 0.5 ) { return 1.0; }
		// 2. occluder-receiver distance (orthographic: depth is linear over the camera range)
		let dz = abs( blockSum / blockCount - z ) * range;
		let penumbraUV = clamp( dz * SD / width, texel * 1.2, texel * 32.0 );
		// 3. PCF over the penumbra
		var sum = 0.0;
		for ( var i = 0; i < SHADOW_FILTER_TAPS; i++ ) {
			let d = _shadowDepth( uvz.xy + vogelDiskSample( i, SHADOW_FILTER_TAPS, phi + 1.7 ) * penumbraUV, c );
			sum += select( 0.0, 1.0, z <= d );
		}
		return sum / f32( SHADOW_FILTER_TAPS );
	}
	// three's PCFShadowFilter: 5 samples on a Vogel disk of one texel, rotated per pixel
	let phiP = pcfNoise * TWO_PI;
	var sum = 0.0;
	for ( var i = 0; i < 5; i++ ) {
		sum += _shadowTap( uvz.xy + vogelDiskSample( i, 5, phiP ) * texel, c, z );
	}
	return sum / 5.0;
}

// visibility of the sun at P (1 = lit); pixel = fragment coordinate for the dither.
// Cascade seams blended over a band that grows with their distance (SoftCSMShadowNode: a quarter of it,
// 2.5 m at the 10 m seam, 15 m at 60 m, and the last cascade fades out over its final 100 m); each
// cascade's map is widened to cover its part of the overlap.
fn sunShadow( P: vec3f, N: vec3f, pixel: vec2f ) -> f32 {
	return _sunShadow( P, N, pixel, true );
}

// sunShadow with the plain 5-tap PCF filter everywhere (surfaces whose own detail hides penumbrae: water)
fn sunShadowPCF( P: vec3f, N: vec3f, pixel: vec2f ) -> f32 {
	return _sunShadow( P, N, pixel, false );
}

fn _sunShadow( P: vec3f, N: vec3f, pixel: vec2f, pcss: bool ) -> f32 {
	if ( shadowParams.enabled < 0.5 ) { return 1.0; }
	let dist = dot( P - frame.cameraPos, - vec3f( frame.view[ 0 ][ 2 ], frame.view[ 1 ][ 2 ], frame.view[ 2 ][ 2 ] ) );
	let noise = interleavedGradientNoise( pixel + f32( frame.frameIndex % 64u ) * 5.588238 );
	let pcfNoise = interleavedGradientNoise( pixel );
	if ( shadowParams.fade < 0.5 ) {
		let c = shadowCascadeOf( dist );
		if ( c < 0 ) { return 1.0; }
		return _sunShadowCascade( P, N, c, noise, pcfNoise, pcss );
	}
	var ret = 1.0;
	let last = i32( shadowParams.count ) - 1;
	for ( var i = 0; i <= last; i++ ) {
		let b = shadowParams.blend[ i ]; // x, y: cascade range, z / w: blend margin at its near / far seam
		let center = ( b.x + b.y ) * 0.5;
		let margin = max( select( b.w, b.z, dist < center ), 1e-5 );
		let csmX = b.x - margin * 0.5;
		let csmY = select( b.y + margin * 0.5, b.y, i == last );
		if ( dist >= csmX && dist <= csmY ) {
			var ratio = clamp( min( dist - csmX, csmY - dist ) / margin, 0.0, 1.0 );
			// no fade at the near edge of the first cascade
			if ( i == 0 && dist <= center ) { ratio = 1.0; }
			ret -= ( 1.0 - _sunShadowCascade( P, N, i, noise, pcfNoise, pcss ) ) * ratio;
		}
	}
	return max( ret, 0.0 );
}

// one depth comparison in cascade c (1 = lit; outside the map: lit). For volumetric marches (haze shafts,
// motes) where the jitter and the temporal resolve do the filtering.
fn sunShadowCascadeHard( P: vec3f, c: i32 ) -> f32 {
	let sc = shadowParams.matrices[ c ] * vec4f( P, 1.0 );
	let uv = vec2f( sc.x * 0.5 + 0.5, 0.5 - sc.y * 0.5 );
	if ( any( uv <= vec2f( 0.0 ) ) || any( uv >= vec2f( 1.0 ) ) || sc.z > 1.0 ) { return 1.0; }
	return select( 0.0, 1.0, sc.z - 2e-5 <= _shadowDepth( uv, c ) );
}
// same in the cascade covering P (by view distance), 1 beyond the last one or with shadows off
fn sunShadowHard( P: vec3f ) -> f32 {
	if ( shadowParams.enabled < 0.5 ) { return 1.0; }
	let dist = dot( P - frame.cameraPos, - vec3f( frame.view[ 0 ][ 2 ], frame.view[ 1 ][ 2 ], frame.view[ 2 ][ 2 ] ) );
	let c = shadowCascadeOf( dist );
	if ( c < 0 ) { return 1.0; }
	return sunShadowCascadeHard( P, c );
}
`}),On=new F({name:`surface`,deps:[L],code:`
struct Surface {
	albedo: vec3f,
	alpha: f32,
	normal: vec3f,      // world space, shading normal
	roughness: f32,
	emissive: vec3f,
	metalness: f32,
	translucency: vec3f, // fraction of the direct light transmitted through thin foliage (x lightColor)
	ao: f32,
	sheenColor: vec3f,
	specularIntensity: f32,
	clearcoat: f32,
	clearcoatRoughness: f32,
	sheenRoughness: f32,
	ior: f32,
	clearcoatNormal: vec3f,
	envIntensity: f32,
};

fn defaultSurface( N: vec3f ) -> Surface {
	var s: Surface;
	s.albedo = vec3f( 1.0 ); s.alpha = 1.0; s.normal = N; s.roughness = 1.0; s.metalness = 0.0;
	s.emissive = vec3f( 0.0 ); s.translucency = vec3f( 0.0 ); s.ao = 1.0; s.sheenColor = vec3f( 0.0 );
	s.specularIntensity = 1.0; s.clearcoat = 0.0; s.clearcoatRoughness = 0.0; s.sheenRoughness = 1.0;
	s.ior = 1.5; s.clearcoatNormal = N; s.envIntensity = 1.0;
	return s;
}

// screen derivatives of the lit position, taken at the top of shadeSurface (every lane of the quad
// is live there; the sun hooks run in a branch, where derivatives are undefined)
var<private> lightDPdx: vec3f = vec3f( 0.0 );
var<private> lightDPdy: vec3f = vec3f( 0.0 );

struct LightAccum {
	directDiffuse: vec3f,
	directSpecular: vec3f,
	indirectDiffuse: vec3f,
	indirectSpecular: vec3f,
};

fn F_Schlick( f0: vec3f, f90: f32, dotVH: f32 ) -> vec3f {
	let fresnel = exp2( ( -5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + f90 * fresnel;
}
fn V_GGX_SmithCorrelated( alpha: f32, dotNL: f32, dotNV: f32 ) -> f32 {
	let a2 = alpha * alpha;
	let gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * dotNV * dotNV );
	let gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * dotNL * dotNL );
	return 0.5 / max( gv + gl, EPS );
}
fn D_GGX( alpha: f32, dotNH: f32 ) -> f32 {
	let a2 = alpha * alpha;
	let d = dotNH * dotNH * ( a2 - 1.0 ) + 1.0;
	return INV_PI * a2 / ( d * d );
}
fn BRDF_GGX( L: vec3f, V: vec3f, N: vec3f, f0: vec3f, f90: f32, roughness: f32 ) -> vec3f {
	let alpha = roughness * roughness;
	let H = normalize( L + V );
	let dotNL = sat( dot( N, L ) ); let dotNV = sat( dot( N, V ) );
	let dotNH = sat( dot( N, H ) ); let dotVH = sat( dot( V, H ) );
	return F_Schlick( f0, f90, dotVH ) * V_GGX_SmithCorrelated( alpha, dotNL, dotNV ) * D_GGX( alpha, dotNH );
}
// Charlie sheen (Estevez & Kulla)
fn D_Charlie( roughness: f32, dotNH: f32 ) -> f32 {
	let a = roughness * roughness;
	let invA = 1.0 / a;
	let cos2h = dotNH * dotNH;
	let sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invA ) * pow( sin2h, invA * 0.5 ) / ( 2.0 * PI );
}
fn V_Neubelt( dotNV: f32, dotNL: f32 ) -> f32 { return sat( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) ); }
fn BRDF_Sheen( L: vec3f, V: vec3f, N: vec3f, color: vec3f, roughness: f32 ) -> vec3f {
	let H = normalize( L + V );
	return color * D_Charlie( roughness, sat( dot( N, H ) ) ) * V_Neubelt( sat( dot( N, V ) ), sat( dot( N, L ) ) );
}
// analytical approximation of the split-sum DFG term (Karis)
fn DFGApprox( dotNV: f32, roughness: f32 ) -> vec2f {
	let c0 = vec4f( -1.0, -0.0275, -0.572, 0.022 );
	let c1 = vec4f( 1.0, 0.0425, 1.04, -0.04 );
	let r = roughness * c0 + c1;
	let a004 = min( r.x * r.x, exp2( -9.28 * dotNV ) ) * r.x + r.y;
	return vec2f( -1.04, 1.04 ) * a004 + r.zw;
}
// multi-scattering specular energy compensation (Fdez-Aguera), as three's computeMultiscattering
fn multiscatter( N: vec3f, V: vec3f, specColor: vec3f, specF90: f32, roughness: f32, single: ptr<function, vec3f>, multi: ptr<function, vec3f> ) {
	let fab = DFGApprox( sat( dot( N, V ) ), roughness );
	let Fr = specColor;
	let FssEss = Fr * fab.x + specF90 * fab.y;
	let Ess = fab.x + fab.y;
	let Ems = 1.0 - Ess;
	let Favg = Fr + ( 1.0 - Fr ) * 0.047619;
	let Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	*single += FssEss;
	*multi += Fms * Ems;
}
`}),kn=new F({name:`lighting`,deps:[L,On,Dn],code:`
// STUDIO_LIGHTING (a pass define, e.g. the fish portraits of the catch card): the world hooks are
// skipped (no shadows, caustics, cloud / hill shadow, bounce, local lights, underwater tint) and the
// environment is a neutral photo studio: a grey sweep lit from above plus one large softbox whose
// azimuth is frame.debug.x (radians, animatable). The key light is frame.sunDir / frame.sunColor of
// the view's own frame block.
fn studioEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f {
	let sweep = mix( vec3f( 0.035, 0.04, 0.045 ), vec3f( 0.55, 0.57, 0.6 ), smoothstep( -0.35, 0.85, R.y ) );
	let az = atan2( R.x, R.z ) - frame.debug.x;
	let w = 0.35 + roughness * 1.6;
	let box = exp( - az * az / ( w * w ) ) * smoothstep( -0.05, 0.3, R.y ) * smoothstep( 0.98, 0.55, R.y );
	return ( sweep + box * vec3f( 2.4, 2.35, 2.25 ) / ( 1.0 + roughness * 3.0 ) ) * frame.envIntensity;
}
fn studioEnvDiffuse( N: vec3f ) -> vec3f {
	return mix( vec3f( 0.05, 0.055, 0.06 ), vec3f( 0.3, 0.31, 0.33 ), N.y * 0.5 + 0.5 ) * frame.envIntensity;
}

fn shadeSurface( s: Surface, P: vec3f, V: vec3f, pixel: vec2f ) -> vec3f {
	let N = s.normal;
	let rough = clamp( s.roughness, 0.03, 1.0 );
	let diffuseColor = s.albedo * ( 1.0 - s.metalness );
	let specF0 = mix( vec3f( 0.04 ) * s.specularIntensity, s.albedo, s.metalness );
	let specF90 = mix( s.specularIntensity, 1.0, s.metalness );
	var acc: LightAccum;
	acc.directDiffuse = vec3f( 0.0 ); acc.directSpecular = vec3f( 0.0 );
	acc.indirectDiffuse = vec3f( 0.0 ); acc.indirectSpecular = vec3f( 0.0 );

	lightDPdx = dpdx( P );
	lightDPdy = dpdy( P );

	// ---- sun / moon
	let L = frame.sunDir;
	let dotNL = sat( dot( N, L ) );
#if STUDIO_LIGHTING
	let lightColor = frame.sunColor;
#else
	// Faces turned away from the sun with no transmission get nothing from it: the modulation hooks
	// (clouds, hill shadow, caustics) and the shadow filters only run for the rest, and the filters
	// only where the hooks left light (their derivatives are taken ahead: lightDPdx / lightDPdy)
	var lightColor = vec3f( 0.0 );
	if ( dotNL > 0.0 || any( s.translucency > vec3f( 0.0 ) ) ) {
		lightColor = frame.sunColor * hookDirectModulation( P, N );
#if MATERIAL_SUN_MODULATION
		// per-material key-light multiplier (the former TerrainLightingModel: heightfield hill shadow)
		lightColor *= materialSunModulation( P, N );
#endif
		let geomN = N;
		var shadow = 0.0;
		if ( any( lightColor > vec3f( 0.0 ) ) ) {
#if REFRACTION_CLIP
			// the water's refraction source (seen blurred through the water): one hard shadow tap
			shadow = sunShadowHard( hookShadowPosition( P, geomN, pixel ) );
#else
			shadow = sunShadow( hookShadowPosition( P, geomN, pixel ), geomN, pixel );
#endif
		}
		lightColor *= shadow;
	}
#endif
	let irradiance = dotNL * lightColor;
	acc.directDiffuse += irradiance * diffuseColor * INV_PI;
	acc.directSpecular += irradiance * BRDF_GGX( L, V, N, specF0, specF90, rough );
#if SHEEN
	acc.directSpecular += irradiance * BRDF_Sheen( L, V, N, s.sheenColor, max( s.sheenRoughness, 0.07 ) );
#endif
	// thin-surface transmission (foliage): lit from behind as well
	acc.directDiffuse += s.translucency * lightColor;
#if CLEARCOAT
	let ccN = s.clearcoatNormal;
	let ccNL = sat( dot( ccN, L ) );
	let ccSpec = ccNL * lightColor * BRDF_GGX( L, V, ccN, vec3f( 0.04 ), 1.0, clamp( s.clearcoatRoughness, 0.03, 1.0 ) );
#endif

	// ---- local lights (lanterns, windows, boat lights, flashlight)
#if !STUDIO_LIGHTING
	hookLocalLights( s, P, N, V, &acc );
#endif

	// ---- indirect: environment + ground bounce
	// (three's PhysicalLightingModel: env irradiance goes through the multiscatter-compensated
	// diffuse; the ground bounce is plain Lambert)
	let R = reflect( -V, N );
	let Rr = normalize( mix( R, N, rough * rough ) );
#if STUDIO_LIGHTING
	let envIrr = studioEnvDiffuse( N ) * PI * s.envIntensity;
	let radiance = studioEnvSpecular( Rr, rough ) * s.envIntensity;
#else
	let envIrr = hookEnvDiffuse( N ) * PI * s.envIntensity;
	let radiance = hookEnvSpecular( Rr, rough ) * s.envIntensity;
#endif
	var single = vec3f( 0.0 ); var multi = vec3f( 0.0 );
	multiscatter( N, V, specF0, specF90, rough, &single, &multi );
	let totalScatter = single + multi;
	let diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
	acc.indirectSpecular += radiance * single + multi * envIrr * INV_PI;
#if STUDIO_LIGHTING
	acc.indirectDiffuse += diffuseMS * envIrr * INV_PI;
#else
	acc.indirectDiffuse += diffuseMS * envIrr * INV_PI + hookBounce( P, N ) * diffuseColor;
#endif

	// ambient occlusion (specular occlusion after Lagarde)
	let dotNV = sat( dot( N, V ) );
	let specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
	acc.indirectDiffuse *= s.ao;
	acc.indirectSpecular *= specAO;
#if STUDIO_LIGHTING
	let amb = vec3f( 1.0 );
#else
	let amb = hookAmbientModulation( P, N );
#endif
	acc.indirectDiffuse *= amb;
	acc.indirectSpecular *= amb;

	var color = acc.directDiffuse + acc.directSpecular + acc.indirectDiffuse + acc.indirectSpecular;
#if SHEEN
	color += s.sheenColor * envIrr * INV_PI * 0.5 * s.ao * amb;
#endif
#if CLEARCOAT
	let ccNV = sat( dot( ccN, V ) );
	let Fcc = F_Schlick( vec3f( 0.04 ), 1.0, ccNV ) * s.clearcoat;
#if STUDIO_LIGHTING
	let ccRad = studioEnvSpecular( reflect( -V, ccN ), clamp( s.clearcoatRoughness, 0.03, 1.0 ) ) * amb * specAO;
#else
	let ccRad = hookEnvSpecular( reflect( -V, ccN ), clamp( s.clearcoatRoughness, 0.03, 1.0 ) ) * amb * specAO;
#endif
	color = color * ( 1.0 - Fcc ) + ( ccSpec * s.clearcoat + ccRad * Fcc );
#endif
	return color + s.emissive;
}
`}),An={position:`vec3f`,normal:`vec3f`,uv:`vec2f`,color:`vec4f`},jn={normal:`vec3f( 0.0, 1.0, 0.0 )`,uv:`vec2f( 0.0 )`,color:`vec4f( 1.0 )`},Mn=/^(u32|i32|vec[234][ui])$/;function Nn(e){return e===`f32`?`0.0`:e===`u32`?`0u`:e===`i32`?`0i`:`${e}()`}function Pn(e,n,r){let i=r.kind,a=new Set(n.map(e=>e.name)),o=e.allDefines();o.PASS_MAIN=+(i===`main`||i===`visibility`),o.PASS_MASK=+((r.colorFormats?.length??3)>2),o.PASS_VISIBILITY=+(i===`visibility`),o.PASS_DEPTH=+(i===`depth`),o.PASS_COLOR=+(i===`color`),o.PASS_LATE=+!!r.late,o.LIT=+!!e.lit,o.INSTANCED=+!!a.has(`instanceMatrix0`),o.INSTANCE_COLOR=+!!a.has(`instanceColor`),Object.assign(o,r.defines||{}),o.CLIP_DISTANCES=o.REFRACTION_CLIP&&t.features.has(`clip-distances`)?1:0;let s=`struct VertexIn {
`;for(let e of n)s+=`\t@location( ${e.location} ) ${e.name}: ${e.wgsl},\n`;s+=`	@builtin( instance_index ) instance: u32,
	@builtin( vertex_index ) vertex: u32,
};
`;let c=`struct VertexData {
	position: vec3f,
	normal: vec3f,
	uv: vec2f,
	color: vec4f,
	model: mat4x4f,
	prevModel: mat4x4f,
	instance: u32,
	vertex: u32,
	worldOffset: vec3f,
	prevWorldOffset: vec3f,
	useWorld: bool,
	worldPos: vec3f,
	worldNormal: vec3f,
	prevWorldPos: vec3f,
`;for(let t in e.attributes)c+=`\t${t}: ${e.attributes[t]},\n`;c+=`};
`;let l=i===`main`||i===`visibility`,u=0,d=`struct VSOut {
	@builtin( position ) clip: vec4f,
`;d+=`\t@location( ${u++} ) worldPos: vec3f,\n`,d+=`\t@location( ${u++} ) normal: vec3f,\n`,d+=`\t@location( ${u++} ) uv: vec2f,\n`,d+=`\t@location( ${u++} ) color: vec4f,\n`,l&&(d+=`\t@location( ${u++} ) curClip: vec4f,\n`,d+=`\t@location( ${u++} ) prevClip: vec4f,\n`);for(let t in e.varyings){let n=e.varyings[t];d+=`\t@location( ${u++} )${Mn.test(n)?` @interpolate( flat )`:``} ${t}: ${n},\n`}if(d+=`};
`,o.CLIP_DISTANCES){let e=[...d.matchAll(/\s(\w+): [^,]+,\n/g)].map(e=>e[1]);d+=d.replace(`struct VSOut {`,`struct VSOutClip {`).replace(/};\n$/,`	@builtin( clip_distances ) clipDistances: array<f32, 1>,
};
`),d+=`fn vsClip( o: VSOut, d: f32 ) -> VSOutClip {\n\tvar c: VSOutClip;\n${e.map(e=>`\tc.${e} = o.${e};\n`).join(``)}\tc.clipDistances[ 0 ] = d;\n\treturn c;\n}\n`}let f=``;for(let e in An)if(a.has(e)){let t=n.find(t=>t.name===e);e===`color`&&t.wgsl===`vec3f`?f+=`	v.color = vec4f( i.color, 1.0 );
`:f+=`\tv.${e} = i.${e};\n`}else e!==`position`&&(f+=`\tv.${e} = ${jn[e]};\n`);for(let t in e.attributes)f+=a.has(t)?`\tv.${t} = i.${t};\n`:`\tv.${t} = ${Nn(e.attributes[t])};\n`;let p=`
struct Draw {
	model: mat4x4f,
	prevModel: mat4x4f,
	params: vec4f,  // x: object id, y: user, z: user, w: user
	params2: vec4f,
};
@group( 2 ) @binding( 0 ) var<uniform> draw: Draw;

${s}
${c}
${d}

struct FragInput {
	vs: VSOut,
	P: vec3f,
	N: vec3f,
	V: vec3f,
	uv: vec2f,
	color: vec4f,
	front: bool,
	pixel: vec2f,
};

struct FragResult {
	color: vec4f,
	velocity: vec4f,
	mask: vec4f,
};

fn cofactor3( m: mat4x4f ) -> mat3x3f {
	let a = m[ 0 ].xyz; let b = m[ 1 ].xyz; let c = m[ 2 ].xyz;
	return mat3x3f( cross( b, c ), cross( c, a ), cross( a, b ) );
}

fn materialVertex( v: ptr<function, VertexData>, o: ptr<function, VSOut> ) {
${e.vertex}
}

fn materialSurface( in: FragInput, s: ptr<function, Surface> ) {
${e.surface}
}

fn materialOutput( in: FragInput, s: Surface, r: ptr<function, FragResult> ) {
${e.output}
}

#if CLIP_DISTANCES
@vertex fn vs( i: VertexIn ) -> VSOutClip {
#else
@vertex fn vs( i: VertexIn ) -> VSOut {
#endif
	var v: VertexData;
${f}#if !HAS_POSITION
	v.position = vec3f( 0.0 );
#endif
	v.instance = i.instance;
	v.vertex = i.vertex;
#if INSTANCED
	let im = mat4x4f( i.instanceMatrix0, i.instanceMatrix1, i.instanceMatrix2, i.instanceMatrix3 );
	v.model = draw.model * im;
	v.prevModel = draw.prevModel * im;
#else
	v.model = draw.model;
	v.prevModel = draw.prevModel;
#endif
#if INSTANCE_COLOR
	v.color = vec4f( v.color.rgb * i.instanceColor, v.color.a );
#endif
	v.worldOffset = vec3f( 0.0 );
	v.prevWorldOffset = vec3f( 1e30 );
	v.useWorld = false;
	v.prevWorldPos = vec3f( 1e30 );
	var o: VSOut;
	materialVertex( &v, &o );
	var wp: vec3f;
	var wn: vec3f;
	var pwp: vec3f;
	if ( v.useWorld ) {
		wp = v.worldPos;
		wn = v.worldNormal;
		pwp = select( v.prevWorldPos, wp, v.prevWorldPos.x > 1e29 );
	} else {
		let lp = vec4f( v.position, 1.0 );
		wp = ( v.model * lp ).xyz + v.worldOffset;
		wn = cofactor3( v.model ) * v.normal;
		pwp = ( v.prevModel * lp ).xyz + select( v.prevWorldOffset, v.worldOffset, v.prevWorldOffset.x > 1e29 );
	}
	o.worldPos = wp;
	o.normal = wn;
	o.uv = v.uv;
	o.color = v.color;
	o.clip = frame.viewProj * vec4f( wp, 1.0 );
#if PASS_MAIN
	o.curClip = frame.viewProjNoJitter * vec4f( wp, 1.0 );
	o.prevClip = frame.prevViewProjNoJitter * vec4f( pwp, 1.0 );
#endif
#if CLIP_DISTANCES
	return vsClip( o, frame.seaLevel + REFRACTION_CLIP_MARGIN - wp.y );
#else
	return o;
#endif
}

#if PASS_MAIN && !PASS_LATE && LIT && !IS_WATER && !ALPHA_TEST && !STUDIO_LIGHTING
// Deep under the water, seen from above it: the water drawn over this pixel shows the refraction
// pass (ocean/RefractionPass.js) at its refracted end point, never this pixel's own colour. The end
// point is predicted as the water shader traces it (flat surface, the seabed at P's depth, a margin
// for the wave slopes); where it would leave the screen the water takes the refraction pass' edge.
const SUBMERGED_DEPTH: f32 = 2.5; // m below sea level: below the deepest wave troughs
fn submergedHidden( P: vec3f ) -> bool {
#if ROCHA_WORLD
	// Inland bodies have independent elevations and boundaries; shade their beds normally.
	return false;
#else
	if ( frame.waterEnabled < 0.5 ) { return false; }
	let sea = frame.seaLevel;
	if ( P.y > sea - SUBMERGED_DEPTH || frame.cameraPos.y < sea + 1.0 ) { return false; }
	let V = normalize( P - frame.cameraPos );
	let pos = frame.cameraPos + V * ( ( frame.cameraPos.y - sea ) / max( - V.y, 1e-4 ) );
	let Tr = refract( V, vec3f( 0.0, 1.0, 0.0 ), 1.0 / 1.333 );
	let Tv = normalize( vec3f( Tr.x, min( Tr.y, -0.08 ), Tr.z ) );
	let L = ( sea - P.y ) / max( - Tv.y, 0.04 );
	let c = frame.viewProj * vec4f( pos + Tv * min( L, 80.0 ), 1.0 );
	let uv = c.xy / max( c.w, 1e-4 ) * vec2f( 0.5, -0.5 ) + 0.5;
	return all( uv > vec2f( 0.1 ) ) && all( uv < vec2f( 0.9 ) ) && c.w > 0.0;
#endif
}
#endif

fn fragInput( vs: VSOut, front: bool ) -> FragInput {
	var in: FragInput;
	in.vs = vs;
	in.P = vs.worldPos;
	var N = normalize( vs.normal );
#if DOUBLE_SIDED
	N = select( -N, N, front );
#endif
#if BACK_SIDE
	N = -N;
#endif
	in.N = N;
	in.V = normalize( frame.cameraPos - vs.worldPos );
	in.uv = vs.uv;
	in.color = vs.color;
	in.front = front;
	in.pixel = vs.clip.xy;
	return in;
}

fn surfaceOf( in: FragInput ) -> Surface {
	var s = defaultSurface( in.N );
	s.albedo = mat.color * in.color.rgb;
	s.alpha = mat.opacity * in.color.a;
	s.roughness = mat.roughness;
	s.metalness = mat.metalness;
	s.emissive = mat.emissive;
	materialSurface( in, &s );
	return s;
}

#if PASS_VISIBILITY
// Main-camera coverage, never the cheaper/different shadow silhouette.
@fragment fn fs( vs: VSOut, @builtin( front_facing ) front: bool ) {
	let in = fragInput( vs, front );
	let s = surfaceOf( in );
#if ALPHA_TEST
	if ( s.alpha < mat.alphaTest ) { discard; }
#endif
}
#elif PASS_DEPTH
#if NEEDS_DEPTH_FRAGMENT
@fragment fn fs( vs: VSOut, @builtin( front_facing ) front: bool ) {
	let in = fragInput( vs, front );
#if HAS_SHADOW_HOOK
	if ( ! materialShadow( in ) ) { discard; }
#else
	let s = surfaceOf( in );
	if ( s.alpha < mat.alphaTest ) { discard; }
#endif
}
#endif
#else

#if PASS_MAIN
struct FragOut {
	@location( 0 ) color: vec4f,
	@location( 1 ) velocity: vec4f,
#if PASS_MASK
	@location( 2 ) mask: vec4f,
#endif
};
#else
struct FragOut {
	@location( 0 ) color: vec4f,
};
#endif

@fragment fn fs( vs: VSOut, @builtin( front_facing ) front: bool ) -> FragOut {
	let in = fragInput( vs, front );
#if WATER_MAP_REFLECTION
	// A mirrored basin view contains only the dry side of the waterline.
	if ( in.P.y < frame.seaLevel - 0.04 ) { discard; }
#endif
#if ROCHA_EARLY_REFRACTION && REFRACTION_CLIP && LIT && !IS_WATER && !STUDIO_LIGHTING
	// The original Rocha lighting hooks reject these same fragments after material shading.
	// Classify once before the material; surviving boundary quads still execute derivatives.
	let rochaRefrWater = rochaWaterAt( in.P.xz );
	if ( rochaRefrWater.z < 0.5 || in.P.y > rochaRefrWater.x + 0.4 ) { discard; }
#endif
#if REFRACTION_CLIP
#if !CLIP_DISTANCES
	// the water's refraction source only holds what is under the water (pass.defines)
	if ( in.P.y > frame.seaLevel + REFRACTION_CLIP_MARGIN ) { discard; }
#endif
#endif
#if PASS_MAIN && !PASS_LATE && LIT && !IS_WATER && !ALPHA_TEST && !STUDIO_LIGHTING
	// hidden under the water (see submergedHidden): an ambient colour, keeping depth and motion
	if ( submergedHidden( in.P ) ) {
		var so: FragOut;
		so.color = vec4f( mat.color * in.color.rgb * hookEnvDiffuse( in.N ) * hookAmbientModulation( in.P, in.N ), 1.0 );
		let cur0 = vs.curClip.xy / vs.curClip.w;
		let prev0 = vs.prevClip.xy / vs.prevClip.w;
		so.velocity = vec4f( ( cur0 - prev0 ) * vec2f( 0.5, -0.5 ), 0.0, 1.0 );
#if PASS_MASK
		so.mask = vec4f( 0.0 );
#endif
		return so;
	}
#endif
	var s = surfaceOf( in );
#if ALPHA_TEST
	if ( s.alpha < mat.alphaTest ) { discard; }
#endif
	s.normal = normalize( s.normal );
	s.clearcoatNormal = normalize( s.clearcoatNormal );
	var r: FragResult;
#if LIT
	r.color = vec4f( shadeSurface( s, in.P, in.V, in.pixel ), s.alpha );
#else
	r.color = vec4f( s.albedo + s.emissive, s.alpha );
#endif
#if PASS_MAIN
	let cur = vs.curClip.xy / vs.curClip.w;
	let prev = vs.prevClip.xy / vs.prevClip.w;
	r.velocity = vec4f( ( cur - prev ) * vec2f( 0.5, -0.5 ), 0.0, 1.0 );
#if WATER_MAP_MOTION
	r.velocity.z = vs.prevClip.w;
#endif
#else
	r.velocity = vec4f( 0.0 );
#endif
	r.mask = vec4f( 0.0 );
	materialOutput( in, s, &r );
	var out: FragOut;
	out.color = r.color;
#if PASS_MAIN
#if PASS_LATE
	// premultiplied: opaque outputs overwrite, blended ones weight their motion by coverage
#if VELOCITY_OPAQUE
	// the fragment owns the motion of its pixel even when its colour is blended (AirMotes specks)
	let a = VELOCITY_WEIGHT;
#else
	let a = select( 1.0, r.color.a, TRANSPARENT_F ) * VELOCITY_WEIGHT;
#endif
	out.velocity = vec4f( r.velocity.xy * a, 0.0, a );
#if WATER_MAP_MOTION
	out.velocity.z = r.velocity.z * a;
#endif
#else
	out.velocity = r.velocity;
#endif
#if PASS_MASK
	out.mask = r.mask;
#endif
#endif
	return out;
}
#endif
`,m=e.shadow?`fn materialShadow( in: FragInput ) -> bool {\n${e.shadow}\n}\n`:``;o.HAS_SHADOW_HOOK=+!!e.shadow,o.NEEDS_DEPTH_FRAGMENT=i===`depth`&&(e.alphaTest>0||e.shadow)?1:0,o.HAS_POSITION=+!!a.has(`position`);let h=p.replace(`fn fragInput(`,m+`fn fragInput(`).replace(/\bTRANSPARENT_F\b/g,e.transparent?`true`:`false`).replace(/\bVELOCITY_WEIGHT\b/g,Fn(e.velocityWeight)).replace(/\bREFRACTION_CLIP_MARGIN\b/g,Fn((r.defines&&r.defines.REFRACTION_CLIP_MARGIN)??0)),g=[L,On,...e.modules];return(i!==`depth`||nt(e.modules).includes(kn))&&(g=[L,On,...xn(),kn,...e.modules]),e.lightingHooks===!1&&!nt(e.modules).includes(kn)&&(g=[L,On,Dn,...e.modules]),{code:h,modules:g,defines:o,bindings:{mat:{uniform:e.uniformBlock},...e.bindings},hasFragment:i!==`depth`||o.NEEDS_DEPTH_FRAGMENT===1}}function Fn(e){let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`}var In=0,Ln={color:[`vec3f`,null],opacity:[`f32`,1],emissive:[`vec3f`,null],roughness:[`f32`,1],metalness:[`f32`,0],alphaTest:[`f32`,0]},Rn=class{constructor(e={}){this.id=In++,this.isMaterial=!0,this.name=e.name||`material`+this.id,this.version=0,this.modules=e.modules||[],this.varyings=e.varyings||{},this.attributes=e.attributes||{},this.vertex=e.vertex||``,this.surface=e.surface||``,this.output=e.output||``,this.shadow=e.shadow||``,this.defines={...e.defines||{}},this.lit=e.lit!==!1,this.side=e.side||`front`,this.transparent=!!e.transparent,this.blending=e.blending||(this.transparent?`normal`:`none`),this.depthWrite=e.depthWrite??!this.transparent,this.depthTest=e.depthTest??!0,this.depthCompare=e.depthCompare||null,this.depthBias=e.depthBias||0,this.depthBiasSlopeScale=e.depthBiasSlopeScale||0,this.colorWrite=e.colorWrite??!0,this.topology=e.topology||`triangle-list`,this.visible=e.visible??!0,this.vertexColors=!!e.vertexColors,this.velocityWeight=e.velocityWeight??1,this.underwaterLighting=e.underwaterLighting||`full`,this.appliesHillShadow=!!e.appliesHillShadow,this.localLightsCheap=!!e.localLightsCheap,this.receiveShadows=e.receiveShadows??!0,this.userData=e.userData||{};let t={...Ln};for(let n in e.uniforms||{})t[n]=e.uniforms[n];this.uniformBlock=new Ze(`MaterialParams`+this.id,t,{label:this.name}),this.uniforms=this.uniformBlock.fields;let n=this.uniforms;n.color.value=Bn(e.color,new B(1,1,1)),n.emissive.value=Bn(e.emissive,new B(0,0,0)),e.roughness!==void 0&&(n.roughness.value=e.roughness),e.metalness!==void 0&&(n.metalness.value=e.metalness),e.opacity!==void 0&&(n.opacity.value=e.opacity),e.alphaTest!==void 0&&(n.alphaTest.value=e.alphaTest),this.bindings={};for(let t in e.textures||{}){let n=e.textures[t];this.bindings[t]=n&&n.isTexture||typeof n==`function`?{texture:n}:n}for(let t in e.storage||{}){let n=e.storage[t];this.bindings[t]=n&&n.isStorageBuffer?{storage:n,access:`read`}:n}Object.assign(this.bindings,e.bindings||{}),this._listeners=[]}get color(){return this.uniforms.color.value}set color(e){this.uniforms.color.value=Bn(e,this.uniforms.color.value)}get emissive(){return this.uniforms.emissive.value}set emissive(e){this.uniforms.emissive.value=Bn(e,this.uniforms.emissive.value)}get roughness(){return this.uniforms.roughness.value}set roughness(e){this.uniforms.roughness.value=e}get metalness(){return this.uniforms.metalness.value}set metalness(e){this.uniforms.metalness.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms.opacity.value=e}get alphaTest(){return this.uniforms.alphaTest.value}set alphaTest(e){e>0!=this.uniforms.alphaTest.value>0&&(this.needsUpdate=!0),this.uniforms.alphaTest.value=e}set(e,t){this.uniformBlock.set(e,t)}set needsUpdate(e){e&&this.version++}setDefine(e,t){this.defines[e]!==t&&(this.defines[e]=t,this.version++)}pipelineKey(){return`${this.id}.${this.version}.${this.side}.${this.transparent}.${typeof this.blending==`string`?this.blending:JSON.stringify(this.blending)}.${this.depthWrite}.${this.depthTest}.${this.depthCompare}.${this.colorWrite}.${this.topology}.${this.alphaTest>0}.${this.underwaterLighting}.${this.appliesHillShadow}.${this.localLightsCheap}.${this.receiveShadows}.${this.depthBias}.${this.depthBiasSlopeScale}.${this.vertexColors}`}allDefines(){return{...this.defines,UNDERWATER_LIGHTING:{none:0,lite:1,full:2}[this.underwaterLighting]??2,HILL_SHADOW_SELF:+!!this.appliesHillShadow,LOCAL_LIGHTS_CHEAP:+!!this.localLightsCheap,ALPHA_TEST:+(this.alphaTest>0),DOUBLE_SIDED:+(this.side===`double`),BACK_SIDE:+(this.side===`back`),TRANSPARENT:+!!this.transparent,RECEIVE_SHADOWS:+!!this.receiveShadows}}addEventListener(e,t){e===`dispose`&&this._listeners.push(t)}dispose(){for(let e of this._listeners)e({target:this})}clone(){let e=Object.create(Object.getPrototypeOf(this));return Object.assign(e,this),e.id=In++,e.version=0,e.defines={...this.defines},e.bindings={...this.bindings},e.uniformBlock=new Ze(`MaterialParams`+e.id,Object.fromEntries(this.uniformBlock.order.map(e=>[e,[this.uniformBlock.layout[e].typeStr,zn(this.uniforms[e].value)]])),{label:e.name}),e.uniforms=e.uniformBlock.fields,e._listeners=[],e}};function zn(e){return e&&typeof e==`object`&&e.clone?e.clone():Array.isArray(e)?e.map(zn):e}function Bn(e,t){return e==null?t:e.isColor?t.copy?t.copy(e):e.clone():typeof e==`number`||typeof e==`string`?t.set(e):Array.isArray(e)?t.setRGB(e[0],e[1],e[2]):e.isVector3?t.setRGB(e.x,e.y,e.z):t}function Vn(e){if(!e||e===`none`)return;if(typeof e==`object`)return e;let t=(e,t,n=`add`)=>({srcFactor:e,dstFactor:t,operation:n});switch(e){case`normal`:return{color:t(`src-alpha`,`one-minus-src-alpha`),alpha:t(`one`,`one-minus-src-alpha`)};case`premultiplied`:return{color:t(`one`,`one-minus-src-alpha`),alpha:t(`one`,`one-minus-src-alpha`)};case`additive`:return{color:t(`src-alpha`,`one`),alpha:t(`zero`,`one`)};case`add`:return{color:t(`one`,`one`),alpha:t(`one`,`one`)};case`multiply`:return{color:t(`dst`,`zero`),alpha:t(`zero`,`one`)};case`min`:return{color:t(`one`,`one`,`min`),alpha:t(`one`,`one`,`min`)};case`max`:return{color:t(`one`,`one`,`max`),alpha:t(`one`,`one`,`max`)}}throw Error(`unknown blending `+e)}var Hn={view:`mat4x4f`,proj:`mat4x4f`,viewProj:`mat4x4f`,invView:`mat4x4f`,invProj:`mat4x4f`,invViewProj:`mat4x4f`,viewProjNoJitter:`mat4x4f`,prevViewProjNoJitter:`mat4x4f`,cameraPos:[`vec3f`,new l],near:[`f32`,.1],prevCameraPos:[`vec3f`,new l],far:[`f32`,6e4],resolution:[`vec2f`,new P(1,1)],invResolution:[`vec2f`,new P(1,1)],outputResolution:[`vec2f`,new P(1,1)],jitter:[`vec2f`,new P],prevJitter:[`vec2f`,new P],frameIndex:[`u32`,0],time:[`f32`,0],dt:[`f32`,1/60],seaLevel:[`f32`,0],waterEnabled:[`f32`,1],atmosphereQuality:[`f32`,1],antiAliasingQuality:[`f32`,1],sunDir:[`vec3f`,new l(.3,.6,-.7).normalize()],night:[`f32`,0],sunColor:[`vec3f`,new B(1,1,1)],exposure:[`f32`,1],skyIrradiance:[`vec3f`,new B(.3,.4,.6)],cameraUnderwater:[`f32`,0],horizonColor:[`vec3f`,new B(.6,.7,.8)],cameraWaterHeight:[`f32`,0],waterAbsorption:[`vec3f`,new l(.42,.075,.035)],windSpeed:[`f32`,7],waterScattering:[`vec3f`,new l(.012,.018,.024)],envIntensity:[`f32`,1],windDir:[`vec2f`,new P(.35,.94).normalize()],reversedDepth:[`f32`,1],pad0:[`f32`,0],debug:[`vec4f`,new R]},Un=[`view`,`proj`,`viewProj`,`invView`,`invProj`,`invViewProj`,`viewProjNoJitter`,`prevViewProjNoJitter`,`cameraPos`,`near`,`prevCameraPos`,`far`,`resolution`,`invResolution`,`jitter`,`prevJitter`,`reversedDepth`],H=new Ze(`Frame`,Hn,{label:`frame`});yt(H);function Wn(e){let t=new Ze(`Frame`,Hn,{label:e});return t.onBeforePack=()=>{for(let e of H.order)Un.includes(e)||(t.fields[e].value=H.fields[e].value)},t}var U=H.fields,Gn={time:U.time,dt:U.dt,seaLevel:U.seaLevel,waterEnabled:U.waterEnabled,atmosphereQuality:U.atmosphereQuality,antiAliasingQuality:U.antiAliasingQuality,sunDir:U.sunDir,sunColor:U.sunColor,skyIrradiance:U.skyIrradiance,horizonColor:U.horizonColor,waterAbsorption:U.waterAbsorption,waterScattering:U.waterScattering,cameraUnderwater:U.cameraUnderwater,cameraWaterHeight:U.cameraWaterHeight,exposure:U.exposure,windDir:U.windDir,windSpeed:U.windSpeed,night:U.night,envIntensity:U.envIntensity},Kn=9.81,qn=new v;function Jn(e,t,n,{jitterX:r=0,jitterY:i=0,prevViewProj:a=null,prevCameraPos:o=null,block:s=H}={}){let c=s.fields;e.updateMatrixWorld(),e.matrixWorldInverse&&e.matrixWorldInverse.copy(e.matrixWorld).invert();let u=e.matrixWorldInverse,d=e.projectionMatrix;c.view.value=u.clone(),c.proj.value=d.clone();let f=new v().multiplyMatrices(d,u);c.viewProjNoJitter.value=f.clone();let p=2*r/t,m=2*i/n;qn.makeTranslation(p,m,0);let h=new v().multiplyMatrices(qn,f);c.viewProj.value=h,c.invView.value=e.matrixWorld.clone(),c.invProj.value=d.clone().invert(),c.invViewProj.value=h.clone().invert(),c.prevViewProjNoJitter.value=a?a.clone():f.clone(),c.cameraPos.value=new l().setFromMatrixPosition(e.matrixWorld),c.prevCameraPos.value=o?o.clone():c.cameraPos.value.clone(),c.near.value=e.near,c.far.value=e.far,c.resolution.value=new P(t,n),c.invResolution.value=new P(1/t,1/n),c.prevJitter.value=c.jitter.value?c.jitter.value.clone():new P,c.jitter.value=new P(p,m),c.reversedDepth.value=e.reversedDepth===!1?0:1}var Yn=new Vt,Xn=new Jt,Zn=new v,Qn=new l,$n=new l,er=new V,tr=2**-23;function nr(e,t){let n=t.elements.map(Math.fround),r=1/0,i=-1/0,a=1/0,o=-1/0;for(let t of[e.min.x,e.max.x])for(let s of[e.min.y,e.max.y])for(let c of[e.min.z,e.max.z])for(let e of[2,3]){let l=[n[e]*t,n[e+4]*s,n[e+8]*c,n[e+12]],u=l.reduce((e,t)=>e+t,0),d=16*tr*l.reduce((e,t)=>e+Math.abs(t),0)+1e-37;e===2?(r=Math.min(r,u-d),i=Math.max(i,u+d)):(a=Math.min(a,u-d),o=Math.max(o,u+d))}if(!(a>0))return null;let s=[r/a,r/o,i/a,i/o],c=Math.min(...s),l=Math.max(...s),u=16*tr*Math.max(Math.abs(c),Math.abs(l))+1e-37;return Number.isFinite(u)?[c-u,l+u]:null}function rr(e,t){return e&&t&&(e[1]<t[0]||t[1]<e[0])}var ir=new WeakMap,ar=0,or=256,sr=class{constructor(){this.pipelines=new Map,this.geometries=new WeakMap,this.sharedAttributes=new WeakMap,this.sharedIndices=new WeakMap,this.resourceStats={vertexBuffers:0,indexBuffers:0,vertexBytes:0,indexBytes:0,attributeOwners:0,indexOwners:0,bufferUploadBytes:0},this.spatialSortEnabled=!0,this.capacity=8192,this.drawBuffer=null,this.drawData=null,this.drawCount=0,this.frame=-1,this.stats={draws:0,triangles:0,pipelines:0},this.drawLayout=null,this.drawBindGroup=null,this.syncPipelines=!0}_ensureDrawBuffer(){this.drawBuffer&&this.drawData.byteLength>=this.capacity*or||(this.drawBuffer&&this.drawBuffer.destroy(),this.drawBuffer=t.device.createBuffer({label:`draws`,size:this.capacity*or,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.drawData=new Float32Array(this.capacity*or/4),this.drawLayout=ht([{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:`uniform`,hasDynamicOffset:!0,minBindingSize:160}}],`draw`),this.drawBindGroup=t.device.createBindGroup({label:`draws`,layout:this.drawLayout,entries:[{binding:0,resource:{buffer:this.drawBuffer,size:160}}]}))}_beginFrame(){this.frame!==t.frame&&(this.frame=t.frame,this._ensureDrawBuffer(),this.drawCount>this.capacity*.75&&(this.capacity*=2,this._ensureDrawBuffer()),this.drawCount=0,t.onSubmit(()=>{this.drawCount&&t.queue.writeBuffer(this.drawBuffer,0,this.drawData.buffer,0,this.drawCount*or)}),this.stats.draws=0,this.stats.triangles=0)}_slot(e){let n=e.__draw;if(n||=e.__draw={frame:-1,slot:0,cur:new Float32Array(16),prev:new Float32Array(16),has:!1},n.frame===t.frame)return n.slot;if(this.drawCount>=this.capacity)throw Error(`MeshRenderer: draw buffer full`);n.frame=t.frame,n.slot=this.drawCount++;let r=e.matrixWorld.elements;n.has&&!e.resetVelocity?n.prev.set(n.cur):n.prev.set(r),n.cur.set(r),n.has=!0,e.resetVelocity=!1;let i=n.slot*or/4,a=this.drawData;a.set(n.cur,i),a.set(e.staticVelocity?n.cur:n.prev,i+16);let o=e.drawParams;if(a[i+32]=e.id??0,a[i+33]=o?o[0]:0,a[i+34]=o?o[1]:0,a[i+35]=o?o[2]:0,o&&o.length>3)for(let e=0;e<4;e++)a[i+36+e]=o[3+e]??0;return n.slot}_geometryGPU(e){let t=this.geometries.get(e);return t||(t={buffers:new Map,index:null,indexVersion:-1},this.geometries.set(e,t),e.addEventListener&&e.addEventListener(`dispose`,()=>{if(!t.disposed){t.disposed=!0;for(let[e,n]of t.buffers)this._releaseShared(this.sharedAttributes,e,n);t.index&&this._releaseShared(this.sharedIndices,t.indexAttribute,t.index),this.geometries.delete(e)}})),t}_releaseShared(e,t,n){this.resourceStats[n.kind===`index`?`indexOwners`:`attributeOwners`]--,--n.owners===0&&(n.buffer?.destroy(),n.buffer&&this.resourceStats[n.kind===`index`?`indexBuffers`:`vertexBuffers`]--,this.resourceStats[n.kind===`index`?`indexBytes`:`vertexBytes`]-=n.allocationBytes||0,e.delete(t))}_attributeBuffer(e,n){let r=this._geometryGPU(e),i=n.isInterleavedBufferAttribute?n.data:n;if(i.gpuBuffer)return i.gpuBuffer.getGPU?i.gpuBuffer.getGPU():i.gpuBuffer;let a=r.buffers.get(i);a||(a=this.sharedAttributes.get(i),a||(a={buffer:null,size:0,version:-1,owners:0,kind:`attribute`,allocationBytes:0},this.sharedAttributes.set(i,a)),a.owners++,this.resourceStats.attributeOwners++,r.buffers.set(i,a));let o=i.version??0;if(a&&a.version===o&&a.array===i.array)return a.buffer;let s=dr(n);if((!a.buffer||a.size<s.byteLength)&&(a.buffer?a.buffer.destroy():this.resourceStats.vertexBuffers++,this.resourceStats.vertexBytes-=a.allocationBytes,a.allocationBytes=Math.max(16,cr(s.byteLength)),this.resourceStats.vertexBytes+=a.allocationBytes,a.buffer=t.device.createBuffer({label:n.name||`attribute`,size:Math.max(16,cr(s.byteLength)),usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),a.size=s.byteLength,a.version=-1),a.version!==o||a.array!==i.array){let e=i.updateRanges&&i.updateRanges.length&&a.version>=0&&a.array===i.array?i.updateRanges:null;if(e&&s===i.array){let n=i.array.BYTES_PER_ELEMENT;for(let r of e)t.queue.writeBuffer(a.buffer,r.start*n,i.array.buffer,i.array.byteOffset+r.start*n,cr(r.count*n)),this.resourceStats.bufferUploadBytes+=cr(r.count*n);i.clearUpdateRanges?i.clearUpdateRanges():i.updateRanges.length=0}else lr(a.buffer,s),this.resourceStats.bufferUploadBytes+=cr(s.byteLength);a.version=o}return a.array=i.array,a.buffer}_indexBuffer(e){let n=e.index;if(!n)return null;let r=this._geometryGPU(e);if(r.index&&r.indexAttribute!==n&&(this._releaseShared(this.sharedIndices,r.indexAttribute,r.index),r.index=null),!r.index){let e=this.sharedIndices.get(n);e||(e={buffer:null,size:0,version:-1,owners:0,array:null,ref:null,kind:`index`,allocationBytes:0},this.sharedIndices.set(n,e)),e.owners++,this.resourceStats.indexOwners++,r.index=e,r.indexAttribute=n}let i=r.index;if(i.ref&&i.array===n.array&&i.version===(n.version??0))return i.ref;let a=n.array instanceof Uint16Array||n.array instanceof Uint32Array?n.array:new Uint32Array(n.array);return(!i.buffer||i.size<a.byteLength)&&(i.buffer?i.buffer.destroy():this.resourceStats.indexBuffers++,this.resourceStats.indexBytes-=i.allocationBytes,i.allocationBytes=Math.max(16,cr(a.byteLength)),this.resourceStats.indexBytes+=i.allocationBytes,i.buffer=t.device.createBuffer({label:`index`,size:Math.max(16,cr(a.byteLength)),usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),i.size=a.byteLength,i.version=-1),(i.version!==(n.version??0)||i.array!==n.array)&&(lr(i.buffer,a),this.resourceStats.bufferUploadBytes+=cr(a.byteLength),i.version=n.version??0),i.array=n.array,i.ref={buffer:i.buffer,format:a instanceof Uint16Array?`uint16`:`uint32`},i.ref}_cachedLayout(e,t,n){let r=ir.get(t);r||ir.set(t,r=new Map);let i=e.isInstancedMesh?e.instanceColor?2:1:0,a=i?n.id+`:`+i:n.id,o=r.get(a);if(o&&o.version===n.version&&o.attrsVersion===t.attributesVersion&&(!i||o.instanceMatrix===e.instanceMatrix)){let e=o.refs,n=o.names,r=t.attributes,i=!0;for(let t=0;t<n.length;t++)if(r[n[t]]!==e[t]){i=!1;break}if(i)return o.vl}let s=this._layout(e,t,n),c=s.layout.filter(e=>!e.name.startsWith(`instance`)).map(e=>e.name);return o={version:n.version,attrsVersion:t.attributesVersion,instanceMatrix:e.instanceMatrix,names:c,refs:c.map(e=>t.attributes[e]),vl:s},s.pipelines=new Map,r.set(a,o),s}_layout(e,t,n){let r=[],i=[`position`,`normal`,`uv`,`color`,...Object.keys(n.attributes)];for(let e of i){let i=t.attributes[e];i&&(e!==`color`||n.vertexColors||n.attributes.color)&&r.push({name:e,attr:i})}if(e.isInstancedMesh){for(let t=0;t<4;t++)r.push({name:`instanceMatrix`+t,attr:e.instanceMatrix,column:t});e.instanceColor&&r.push({name:`instanceColor`,attr:e.instanceColor})}let a=[],o=[],s=new Map,c=0;for(let e of r){let t=e.attr,r=t.isInterleavedBufferAttribute?t.data:t,i=!!(t.isInstancedBufferAttribute||r.isInstancedInterleavedBuffer||t.meshPerAttribute||r.meshPerAttribute)||e.name.startsWith(`instance`),l=pr(t),u=s.get(r);if(u===void 0){u=a.length,s.set(r,u);let e=t.isInterleavedBufferAttribute?t.data.stride*l.bytesPerComponent:t.itemSize*l.bytesPerComponent;a.push({src:r,attr:t,layout:{arrayStride:l.converted?l.itemSize*4:e,stepMode:i?`instance`:`vertex`,attributes:[]}})}let d=t.isInterleavedBufferAttribute?t.offset*l.bytesPerComponent:0,f=l.format,p=l.wgsl;e.column!==void 0&&(d=e.column*16,f=`float32x4`,p=`vec4f`),a[u].layout.attributes.push({shaderLocation:c,offset:d,format:f}),(e.name===`position`||e.name===`normal`)&&(p=`vec3f`),e.name===`uv`&&(p=`vec2f`),e.name===`color`&&(p=t.itemSize===4?`vec4f`:`vec3f`),e.name===`instanceColor`&&(p=`vec3f`),n.attributes[e.name]&&(p=n.attributes[e.name]),o.push({name:e.name,wgsl:p,location:c,instanced:i}),c++}return{key:o.map(e=>`${e.name}:${e.wgsl}`).join(`,`)+`|`+a.map(e=>`${e.layout.arrayStride}/${e.layout.stepMode}/${e.layout.attributes.map(e=>e.format+`@`+e.offset).join(`;`)}`).join(`,`),layout:o,buffers:a}}_pipeline(e,n,r){e.__pkFrame!==t.frame&&(e.__pk=e.pipelineKey()+`|`+yn.version,e.__pkFrame=t.frame);let i=r.passKey,a=n.pipelines&&n.pipelines.get(i);if(a&&a.materialKey===e.__pk)return a.p;let o=`${e.__pk}|${n.key}|${i}`,s=this.pipelines.get(o);return s||=this._createPipeline(e,n,r,o),n.pipelines&&n.pipelines.set(i,{materialKey:e.__pk,p:s}),s}_createPipeline(e,n,r,i){let a=Pn(e,n.layout,r),o=Ct({modules:a.modules,bindings:a.bindings,code:a.code,defines:a.defines,stage:`render`,label:e.name}),s=Dt(o.code,e.name);this._ensureDrawBuffer();let c=t.device.createPipelineLayout({bindGroupLayouts:[o.group0.layout,o.bindings.layout,this.drawLayout]}),l=Vn(e.blending),u=[];r.kind===`main`?(u=[{format:r.colorFormats[0],blend:e.transparent||r.late?l:void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0},{format:r.colorFormats[1],blend:r.late?Vn(`premultiplied`):void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0}],r.colorFormats.length>2&&u.push({format:r.colorFormats[2],blend:Vn(`normal`),writeMask:e.colorWrite?GPUColorWrite.ALL:0})):r.kind===`color`&&(u=r.colorFormats.map(t=>({format:t,blend:l,writeMask:e.colorWrite?GPUColorWrite.ALL:0})));let d=e.side,f=r.cullOverride||(d===`double`?`none`:d===`back`?`front`:`back`),p=e.depthTest?e.depthCompare||r.depthCompare:`always`,m={label:e.name+` `+r.kind,layout:c,vertex:{module:s,entryPoint:`vs`,buffers:n.buffers.map(e=>e.layout)},primitive:{topology:e.topology,cullMode:f,frontFace:`ccw`}};a.hasFragment&&(m.fragment={module:s,entryPoint:`fs`,targets:u}),r.depthFormat&&(m.depthStencil={format:r.depthFormat,depthWriteEnabled:e.depthWrite,depthCompare:p,depthBias:r.kind===`depth`?r.depthBias||0:e.depthBias,depthBiasSlopeScale:r.kind===`depth`?r.depthBiasSlopeScale||0:e.depthBiasSlopeScale});let h={handle:t.renderPipeline(m),bindings:o.bindings,label:m.label};return this.pipelines.set(i,h),this.stats.pipelines=this.pipelines.size,h}collect(e,{camera:t,layerMask:n=4294967295,filter:r=null,kind:i=`main`,cull:a=!0,frameBlock:o=H}){let s=[],c=[];t&&(t.updateMatrixWorld(),Zn.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse.copy(t.matrixWorld).invert()),Xn.setFromProjectionMatrix(Zn,t.reversedDepth!==!1),$n.setFromMatrixPosition(t.matrixWorld));let l=this.precompiling,u=e=>{if(e.visible||l){e.isMesh&&e.material&&e.geometry&&(e.layers.mask&n)!==0&&(!r||r(e))&&(i!==`depth`||e.castShadow)&&(l||!a||!t||e.frustumCulled===!1||this._inFrustum(e,t,o,i))&&(e.onBeforeRender&&e.onBeforeRender(null,null,t,e.geometry,e.material,null),(e.visible||l)&&this._addItems(e,s,c));for(let t of e.children)u(t)}};e.updateMatrixWorld(),u(e),s.sort((e,t)=>e.renderOrder-t.renderOrder||e.pipeKey-t.pipeKey||e.z-t.z);for(let e=1;e<s.length;e++){let t=e;for(;t>0;){let e=s[t-1],n=s[t];if(!e.sortBounds||!n.sortBounds||e.renderOrder!==n.renderOrder||e.pipeKey!==n.pipeKey||e.spatialDepth<=n.spatialDepth||e.sortBounds.intersectsBox(n.sortBounds)||!rr(e.sortDepthRange,n.sortDepthRange))break;s[t-1]=n,s[t]=e,t--}}return c.sort((e,t)=>e.renderOrder-t.renderOrder||t.z-e.z),{opaque:s,transparent:c}}_inFrustum(e,t,n,r){let i=null;if(e.isInstancedMesh?(!e.boundingSphere&&e.computeBoundingSphere&&e.computeBoundingSphere(),i=e.boundingSphere):(e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),i=e.geometry.boundingSphere),!i||i.radius<0||!Number.isFinite(i.radius))return!0;if(Yn.copy(i).applyMatrix4(e.matrixWorld),e.userData?.spatialSort&&t){let e=Yn.center.distanceTo($n)+Yn.radius,i=Math.max(.001,e*1e-6);if(r!==`depth`){let r=n?.fields,a=r?.resolution?.value,o=r?.jitter?.value,s=Math.max(1,a?.x||1),c=Math.max(1,a?.y||1),l=Math.max(2,Math.abs(o?.x||0)*s/2+1),u=Math.max(2,Math.abs(o?.y||0)*c/2+1),d=t.projectionMatrix.elements,f=d[15]===0?e:1;i+=Math.max(2*l/(s*Math.abs(d[0])),2*u/(c*Math.abs(d[5])))*f}Yn.radius+=i}return Xn.intersectsSphere(Yn)}_addItems(e,t,n){let r=e.geometry,i=Array.isArray(e.material)?e.material:null,a=Qn.setFromMatrixPosition(e.matrixWorld).distanceToSquared($n),o=this.spatialSortEnabled&&e.userData?.spatialSort&&r.boundingBox?er.copy(r.boundingBox).applyMatrix4(e.matrixWorld).expandByScalar(.001).clone():null,s=o?o.distanceToPoint($n)**2:a,c=o?nr(o,Zn):null,l=(i,l,u)=>{if(!i||!i.visible&&!this.precompiling)return;let d=i.depthTest&&i.depthWrite&&i.blending===`none`,f={object:e,geometry:r,material:i,start:l,count:u,z:a,spatialDepth:s,sortBounds:d?o:null,sortDepthRange:c,renderOrder:e.renderOrder||0,pipeKey:i.id};(i.transparent?n:t).push(f)},u=r.drawRange||{start:0,count:1/0};if(i&&r.groups&&r.groups.length)for(let e of r.groups){let t=Math.max(e.start,u.start),n=Math.min(e.start+e.count,u.start+u.count);n>t&&l(i[e.materialIndex],t,n-t)}else l(i?i[0]:e.material,u.start,u.count)}async prepareMeshes(e,n,{cancelled:r=()=>!1}={}){let i=new Set,a=globalThis.performance?.now()??Date.now();for(let t of n){let n={kind:`main`,late:!1,colorFormats:[],depthFormat:null,depthCompare:`greater-equal`,frameBlock:H,layerMask:4294967295,...t};n.passKey=`${n.kind}.${+!!n.late}.${n.colorFormats.join(`,`)}.${n.depthFormat}.${n.depthCompare}.${n.cullOverride||``}.${n.defines?JSON.stringify(n.defines):``}`;for(let t of e){if(r())return;if(!(t.layers.mask&n.layerMask)||n.kind===`depth`&&!t.castShadow)continue;let e=this._cachedLayout(t,t.geometry,t.material);this._indexBuffer(t.geometry),i.add(this._pipeline(t.material,e,n).handle),(globalThis.performance?.now()??Date.now())-a>=8&&typeof requestAnimationFrame==`function`&&(await new Promise(e=>requestAnimationFrame(e)),a=globalThis.performance?.now()??Date.now())}}if(await t.pipelinesReady(),!r()){for(let e of i)if(e.failed||!e.pipeline)throw Error(`Could not prepare `+e.label)}}render(e,n){this._beginFrame(),n={kind:`main`,late:!1,colorFormats:[],depthFormat:null,depthCompare:`greater-equal`,frameBlock:H,layerMask:4294967295,...n},n.passKey=`${n.kind}.${+!!n.late}.${n.colorFormats.join(`,`)}.${n.depthFormat}.${n.depthCompare}.${n.cullOverride||``}.${n.defines?JSON.stringify(n.defines):``}`;let r=n.items||this.collect(e,n),i=t.getEncoder(),a=(n.colorViews||[]).map((e,t)=>{let r=n.clearColors?n.clearColors[t]:null;return{view:e,loadOp:r?`clear`:`load`,storeOp:`store`,clearValue:r||[0,0,0,0]}}),o={label:n.label||n.kind,colorAttachments:a};n.depthView&&(o.depthStencilAttachment={view:n.depthView,depthLoadOp:n.clearDepth===null||n.clearDepth===void 0?`load`:`clear`,depthStoreOp:`store`,depthClearValue:n.clearDepth??0}),n.timestampWrites&&(o.timestampWrites=n.timestampWrites);let s=i.beginRenderPass(o);n.viewport&&s.setViewport(...n.viewport),s.setBindGroup(0,St(n.frameBlock,`render`).getBindGroup()),this.drawItems(s,r.opaque,n),n.betweenLists&&n.betweenLists(s),this.drawItems(s,r.transparent,n),n.after&&n.after(s),s.end()}drawItems(e,n,r){let i=null,a=null,o=new Ke(e),s=++ar;for(let c of n){let{object:n,geometry:l,material:u}=c;if(!l.attributes.position&&!l.vertexCount&&!l.indirect)continue;let d,f;if(this.precompiling){try{d=this._cachedLayout(n,l,u),f=this._pipeline(u,d,r)}catch{continue}continue}d=this._cachedLayout(n,l,u),f=this._pipeline(u,d,r);let p=f.handle.pipeline||(this.syncPipelines?t.ready(f.handle):null);if(!p)continue;f!==i&&(e.setPipeline(p),i=f);let m=f.bindings.getBindGroup(s);m!==a&&(e.setBindGroup(1,m),a=m),o.bindObject(this.drawBindGroup,this._slot(n)*or);for(let e=0;e<d.buffers.length;e++)o.bindVertex(e,this._attributeBuffer(l,d.buffers[e].attr));let h=n.isInstancedMesh?n.count:l.instanceCount??1;if(h===0)continue;let g=this._indexBuffer(l);if(l.indirect){let t=l.indirect.buffer.getGPU?l.indirect.buffer.getGPU():l.indirect.buffer,n=l.indirect.offsets||[l.indirect.offset||0];g&&o.bindIndex(g.buffer,g.format);for(let r of n)g?e.drawIndexedIndirect(t,r):e.drawIndirect(t,r),this.stats.draws++;continue}if(g){let t=Math.min(c.count,l.index.count-c.start);if(t<=0)continue;o.bindIndex(g.buffer,g.format),e.drawIndexed(t,h===1/0?1:h,c.start,0,0),this.stats.triangles+=t/3*h}else{let t=l.attributes.position?l.attributes.position.count:l.vertexCount,n=Math.min(c.count,t-c.start);if(n<=0)continue;e.draw(n,h,c.start,0),this.stats.triangles+=n/3*h}this.stats.draws++}}};function cr(e){return Math.ceil(e/4)*4}function lr(e,n){if(n.byteLength%4==0){t.queue.writeBuffer(e,0,n.buffer,n.byteOffset,n.byteLength);return}let r=new Uint8Array(cr(n.byteLength));r.set(new Uint8Array(n.buffer,n.byteOffset,n.byteLength)),t.queue.writeBuffer(e,0,r)}var ur=new WeakMap;function dr(e){let t=e.isInterleavedBufferAttribute?e.data:e;if(!pr(e).converted)return t.array;let n=ur.get(t);if(n&&n.version===t.version)return n.array;let r=e.count,i=e.itemSize,a=new Float32Array(r*i),o=e.normalized?fr(t.array):1;for(let e=0;e<r*i;e++)a[e]=t.array[e]/o;return ur.set(t,{version:t.version,array:a}),a}function fr(e){return e instanceof Uint8Array?255:e instanceof Int8Array?127:e instanceof Uint16Array?65535:e instanceof Int16Array?32767:1}function pr(e){let t=(e.isInterleavedBufferAttribute?e.data:e).array,n=e.itemSize,r=e.normalized,i=e=>n===1?e:`vec${n}${e===`f32`?`f`:e===`u32`?`u`:`i`}`;if(t instanceof Float32Array)return{format:n===1?`float32`:`float32x${n}`,wgsl:i(`f32`),bytesPerComponent:4,itemSize:n};if(t instanceof Uint32Array)return{format:n===1?`uint32`:`uint32x${n}`,wgsl:i(`u32`),bytesPerComponent:4,itemSize:n};if(t instanceof Int32Array)return{format:n===1?`sint32`:`sint32x${n}`,wgsl:i(`i32`),bytesPerComponent:4,itemSize:n};let a={Uint8Array:[`uint8`,`unorm8`,1],Int8Array:[`sint8`,`snorm8`,1],Uint16Array:[`uint16`,`unorm16`,2],Int16Array:[`sint16`,`snorm16`,2]}[t.constructor.name];return a&&(n===2||n===4)&&!e.isInterleavedBufferAttribute?{format:(r?a[1]:a[0])+`x`+n,wgsl:i(r?`f32`:t instanceof Uint8Array||t instanceof Uint16Array?`u32`:`i32`),bytesPerComponent:a[2],itemSize:n}:{format:n===1?`float32`:`float32x${n}`,wgsl:i(`f32`),bytesPerComponent:4,itemSize:n,converted:!0}}var mr=class{constructor(t){this.container=t,this.renderScale=1,this.clock=new Ge,this.frame=0,this.onResize=[],this.renderOptimizations=e(),this.pacingStats={callbacks:0,submitted:0,completed:0,skipped:0,inFlight:0,maxInFlight:0}}async init(){let e=document.createElement(`canvas`);e.tabIndex=0,this.container.appendChild(e),this.canvas=e,this.domElement=e,await t.init({canvas:e}),t.reuseAllocationBindings=this.renderOptimizations.bindingReuse,this.meshRenderer=new sr,this.meshRenderer.syncPipelines=!1,this.camera=new Ve(62,window.innerWidth/window.innerHeight,.06,6e4),this.scene=new Ue,window.addEventListener(`resize`,()=>this.resize()),this.resize()}setRenderScale(e){this.renderScale=e,this.resize()}get width(){return this.canvas.width}get height(){return this.canvas.height}resize(){let e=window.innerWidth,t=window.innerHeight,n=this.renderScale;this.canvas.width=Math.max(1,Math.floor(e*n)),this.canvas.height=Math.max(1,Math.floor(t*n)),this.canvas.style.width=e+`px`,this.canvas.style.height=t+`px`,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),H.fields.outputResolution.value.set(this.canvas.width,this.canvas.height);for(let n of this.onResize)n(e,t)}currentTexture(){return t.context.getCurrentTexture()}start(e){this.stop(),this._running=!0;let n=this._loopGeneration,r=t.queue,i=this.renderOptimizations.framePacing;(!this._flight||this._flight.queue!==r)&&(this._flight={queue:r,count:0});let a=this._flight,o=this.pacingStats;i&&this.clock.reset();let s=t=>{if(this._running&&n===this._loopGeneration){if(o.callbacks++,i&&a.count>=2)o.skipped++;else{this.clock.update(t),this.frameInterval=this.clock.getDelta();let n=Math.min(.1,this.frameInterval);this.frame++,e(n,this.clock.getElapsed()),o.submitted++,i&&(a.count++,o.inFlight=a.count,o.maxInFlight=Math.max(o.maxInFlight,a.count),r.onSubmittedWorkDone().then(()=>{a.count--,o.completed++,a===this._flight&&(o.inFlight=a.count)},e=>{a.count--,a===this._flight&&(o.inFlight=a.count,o.error=String(e),this.stop(),console.error(`Frame queue failed:`,e))}))}this._running&&n===this._loopGeneration&&(this._raf=requestAnimationFrame(s))}};this._raf=requestAnimationFrame(s)}stop(){this._running=!1,this._loopGeneration=(this._loopGeneration||0)+1,cancelAnimationFrame(this._raf)}},hr=`
struct FSIn { @builtin( position ) pos: vec4f, @location( 0 ) uv: vec2f };
@vertex fn vs( @builtin( vertex_index ) i: u32 ) -> FSIn {
	let p = vec2f( f32( ( i << 1u ) & 2u ), f32( i & 2u ) );
	var o: FSIn;
	o.pos = vec4f( p * 2.0 - 1.0, FS_DEPTH, 1.0 );
	o.uv = vec2f( p.x, 1.0 - p.y );
	return o;
}
`,gr=class{constructor({label:e=`fullscreen`,modules:n=[],bindings:r={},code:i,colorFormats:a=[`rgba16float`],blend:o=`none`,defines:s={},depthFormat:c=null,depthCompare:l=`always`,depthWrite:u=!1,depth:d=0,writeMasks:f=null,blends:p=null}){this.label=e,this.colorFormats=a;let m=i.includes(`@fragment`)?i:`${i}\n@fragment fn fs( in: FSIn ) -> @location( 0 ) vec4f { return fragment( in ); }\n`,h=Ct({modules:[L,...n],bindings:r,code:hr.replace(`FS_DEPTH`,d.toFixed(6))+m,defines:s,stage:`render`,label:e});this.source=h.code,this.bindings=h.bindings;let g=Dt(h.code,e),_={label:e,layout:t.device.createPipelineLayout({bindGroupLayouts:[h.group0.layout,h.bindings.layout]}),vertex:{module:g,entryPoint:`vs`},fragment:{module:g,entryPoint:`fs`,targets:a.map((e,t)=>({format:e,blend:Vn(p?p[t]:t===0?o:`none`),writeMask:f?f[t]:GPUColorWrite.ALL}))},primitive:{topology:`triangle-list`}};c&&(_.depthStencil={format:c,depthCompare:l,depthWriteEnabled:u}),this.handle=t.renderPipeline(_),this.timestampWrites=null}get pipeline(){return t.ready(this.handle)}draw(e,n=H){e.setPipeline(t.ready(this.handle)),e.setBindGroup(0,St(n,`render`).getBindGroup()),e.setBindGroup(1,this.bindings.getBindGroup()),e.draw(3)}render({colorViews:e,clear:n=null,clearColors:r=null,viewport:i=null,scissor:a=null,frameBlock:o=H,depthView:s=null,encoder:c=t.getEncoder()}={}){let l=e.map(e=>e.isTexture?e.view({dimension:`2d`,mipLevelCount:1}):e),u={label:this.label,colorAttachments:l.map((e,t)=>{let i=r?r[t]:n;return{view:e,loadOp:i?`clear`:`load`,storeOp:`store`,clearValue:i||[0,0,0,0]}})};s&&(u.depthStencilAttachment={view:s,depthLoadOp:`load`,depthStoreOp:`store`}),this.timestampWrites&&(u.timestampWrites=this.timestampWrites);let d=c.beginRenderPass(u);i&&d.setViewport(...i),a&&d.setScissorRect(...a),this.draw(d,o),d.end()}},W=Object.freeze({id:`water`,name:`Water`,width:50,length:50,depth:10,surface:0,bottom:-10,halfSize:25,beige:`#e8dfd0`});function _r(e,t){return Number.isFinite(e)&&Number.isFinite(t)&&Math.abs(e)<=W.halfSize&&Math.abs(t)<=W.halfSize}function vr(e){return!!e&&e.maxComputeWorkgroupStorageSize>=16384&&e.maxComputeInvocationsPerWorkgroup>=256&&e.maxComputeWorkgroupSizeX>=256&&e.maxStorageTexturesPerShaderStage>=4&&e.maxStorageBuffersPerShaderStage>=3}function yr(e){let t=``;for(let e=0;e<8;e++){let n=1<<e;t+=`
  {
    let pos = t & ${n-1}u;
    let i = ((t >> ${e}u) << ${e+1}u) | pos;
    let j = i + ${n}u;
    let ang = f32(pos) * ${(Math.PI/n).toFixed(12)};
    let w = vec2f(cos(ang), sin(ang));
    let i2 = (i * 2u + lane) * 2u;
    let j2 = (j * 2u + lane) * 2u;
    let a0 = fftShared[i2]; let a1 = fftShared[i2 + 1u];
    let b0 = fftCmul2(fftShared[j2], w);
    let b1 = fftCmul2(fftShared[j2 + 1u], w);
    fftShared[i2] = a0 + b0;
    fftShared[i2 + 1u] = a1 + b1;
    fftShared[j2] = a0 - b0;
    fftShared[j2 + 1u] = a1 - b1;
    workgroupBarrier();
  }`}return e+`
var<workgroup> fftShared: array<vec4f, 1024>;
@compute @workgroup_size(256, 1, 1)
fn main(@builtin(local_invocation_id) lid: vec3u, @builtin(workgroup_id) wid: vec3u) {
  let lane = lid.x & 1u;
  let t = lid.x >> 1u;
  let col = wid.x * 2u + lane;
  let c = wid.y;
  let base = c * 65536u;
  for (var e = 0u; e < 2u; e++) {
    let y = t + e * 128u;
    let idx = base + y * 256u + col;
    let r = (fftBitReverse8(y) * 2u + lane) * 2u;
    fftShared[r] = tmp[idx * 2u];
    fftShared[r + 1u] = tmp[idx * 2u + 1u];
  }
  workgroupBarrier();
${t}
  let lambda = ocean.choppiness;
  for (var e = 0u; e < 2u; e++) {
    let y = t + e * 128u;
    let idx = base + y * 256u + col;
    let k = (y * 2u + lane) * 2u;
    let sign = select(-1.0, 1.0, ((col + y) & 1u) == 0u);
    let A = fftShared[k] * sign;
    let B = fftShared[k + 1u] * sign;
    let Dx = A.x; let Dz = A.y; let Dy = A.z; let Dxz = A.w;
    let Dyx = B.x; let Dyz = B.y; let Dxx = B.z; let Dzz = B.w;
    let jxx = lambda * Dxx + 1.0;
    let jzz = lambda * Dzz + 1.0;
    let jxz = lambda * Dxz;
    let J = jxx * jzz - jxz * jxz;
    let prev = foam[idx];
    let gen = sat((ocean.foamBias - J) * ocean.foamGain);
    let f = prev * exp(-ocean.foamDecay * frame.dt) + gen * ocean.foamAdd * frame.dt;
    let fNew = clamp(max(f, gen * 0.5), 0.0, 1.5);
    foam[idx] = fNew;
    let uv = vec2u(col, y);
    let vDisp = vec4f(lambda * Dx, Dy, lambda * Dz, fNew);
    let vDeriv = vec4f(Dyx, Dyz, lambda * Dxx, lambda * Dzz);
    textureStore(dispOut, uv, c, vDisp);
    textureStore(derivOut, uv, c, vDeriv);
    // Each invocation owns these two entries: all FFT stages have finished.
    fftShared[k] = vDisp;
    fftShared[k + 1u] = vDeriv;
  }
  // Both columns' postprocessed values must be visible before forming mip 1.
  workgroupBarrier();
  if (lane == 0u) {
    let a = t * 8u;
    // Exactly baseline's left-to-right ((a+b)+c)+d order; not (a+c)+(b+d).
    let vd = (fftShared[a] + fftShared[a + 2u] + fftShared[a + 4u] + fftShared[a + 6u]) * 0.25;
    let vn = (fftShared[a + 1u] + fftShared[a + 3u] + fftShared[a + 5u] + fftShared[a + 7u]) * 0.25;
    textureStore(dispMip1, vec2u(wid.x, t), c, vd);
    textureStore(derivMip1, vec2u(wid.x, t), c, vn);
    let dst = (c * 16384u + t * 128u + wid.x) * 2u;
    // Preserve full precision for subsequent mips, even though output textures are rgba16float.
    mipSrc[dst] = vd;
    mipSrc[dst + 1u] = vn;
  }
}`}function br(e,t,n,r,i,a,o=!1){let s=r*2,c=n?`${n}[ly * ${r}u + lx] = v;`:o?`mipMid[(c * 64u + gy * 8u + gx) * 2u + ${a}u] = v;`:``;return`
  if (lx < ${r}u && ly < ${r}u) {
    let i = ly * ${s*2}u + lx * 2u;
    let v = (${t}[i] + ${t}[i + 1u] + ${t}[i + ${s}u] + ${t}[i + ${s+1}u]) * 0.25;
    textureStore(${e}${i}, vec2u(gx * ${r}u + lx, gy * ${r}u + ly), c, v);
    ${c}
  }`}function xr(e){if(e===null)return[[`d`,0],[`n`,1]];if(e!==0&&e!==1)throw RangeError(`Field channel must be 0, 1, or null`);return[[e===0?`d`:`n`,e]]}function Sr(e=null){let t=xr(e),n=``;for(let[e]of t)n+=`var<workgroup> ${e}2: array<vec4f, 64>;
var<workgroup> ${e}3: array<vec4f, 16>;
var<workgroup> ${e}4: array<vec4f, 4>;
`;n+=`fn src(c: u32, x: u32, y: u32, channel: u32) -> vec4f {
  return mipSrc[(c * 16384u + y * 128u + x) * 2u + channel];
}
@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid: vec3u, @builtin(workgroup_id) wid: vec3u) {
  let lx = lid.x; let ly = lid.y;
  let gx = wid.x; let gy = wid.y; let c = wid.z;
  let x2 = gx * 8u + lx; let y2 = gy * 8u + ly;
  let x = x2 * 2u; let y = y2 * 2u;
`;for(let[e,r]of t)n+=`  {
    let v = (src(c, x, y, ${r}u) + src(c, x + 1u, y, ${r}u) + src(c, x, y + 1u, ${r}u) + src(c, x + 1u, y + 1u, ${r}u)) * 0.25;
    textureStore(${e}Out2, vec2u(x2, y2), c, v);
    ${e}2[ly * 8u + lx] = v;
  }
`;n+=`  workgroupBarrier();
`;for(let[e,r]of[[3,4],[4,2],[5,1]]){for(let[i,a]of t)n+=br(`${i}Out`,`${i}${e-1}`,e<5?`${i}${e}`:null,r,e,a,e===5);e<5&&(n+=`
  workgroupBarrier();
`)}return n+`
}`}function Cr(e=null){let t=xr(e),n=``;for(let[e]of t)n+=`var<workgroup> ${e}5: array<vec4f, 64>;
var<workgroup> ${e}6: array<vec4f, 16>;
var<workgroup> ${e}7: array<vec4f, 4>;
`;n+=`@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid: vec3u, @builtin(workgroup_id) wid: vec3u) {
  let lx = lid.x; let ly = lid.y; let c = wid.z;
  let gx = 0u; let gy = 0u;
  let i = (c * 64u + ly * 8u + lx) * 2u;
`;for(let[e,r]of t)n+=`  ${e}5[ly * 8u + lx] = mipMid[i + ${r}u];\n`;n+=`  workgroupBarrier();
`;for(let[e,r]of[[6,4],[7,2],[8,1]]){for(let[i,a]of t)n+=br(`${i}Out`,`${i}${e-1}`,e<8?`${i}${e}`:null,r,e,a);e<8&&(n+=`
  workgroupBarrier();
`)}return n+`
}`}function wr(e,{ComputeKernel:t,commonModule:n,fftCommon:r,oceanU:i,limits:a}){if(!vr(a))throw Error(`Insufficient negotiated limits for paired columns`);let o=e=>({storage:e,access:`read_write`}),s=(e,t)=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}}),c=e.displacementTexture,l=e.derivativeTexture;e.columnKernel=new t({label:`Ocean Paired Columns + Mip1`,modules:[n],bindings:{...i,tmp:o(e.tmp),foam:o(e.foam),mipSrc:o(e.mipSrc),dispOut:s(c,0),derivOut:s(l,0),dispMip1:s(c,1),derivMip1:s(l,1)},workgroupSize:[256,1,1],code:yr(r)}),e.fusedMipFields=a.maxStorageTexturesPerShaderStage>=8;let u=e.derivativeOnly?[1]:e.fusedMipFields?[null]:[0,1];e.mipKernelsA=u.map(n=>{let r={mipSrc:o(e.mipSrc),mipMid:o(e.mipMid)};for(let[e,t]of xr(n))for(let n=2;n<=5;n++)r[`${e}Out${n}`]=s(t===0?c:l,n);return new t({label:`Ocean Paired Mips 2-5`+(n===null?``:` field${n}`),bindings:r,workgroupSize:[8,8,1],code:Sr(n)})}),e.mipKernelsB=u.map(n=>{let r={mipMid:o(e.mipMid)};for(let[e,t]of xr(n))for(let n=6;n<=8;n++)r[`${e}Out${n}`]=s(t===0?c:l,n);return new t({label:`Ocean Paired Mips 6-8`+(n===null?``:` field${n}`),bindings:r,workgroupSize:[8,8,1],code:Cr(n)})})}function Tr(e,t){let n=e===`Ocean FFT Rows`,r=e===`Ocean FFT Columns`,i=e===`Ocean Paired Columns + Mip1`;return t=t.replaceAll(`let c = i32( gid.z );`,`let c = i32( gid.z ) + 2;`).replaceAll(`let c = wid.y;`,`let c = wid.y + 2u;`).replaceAll(`let c = wid.z;`,`let c = wid.z + 2u;`).replace(`let idx = gid.z *`,`let idx = ( gid.z + 2u ) *`),e===`Ocean Copy H0`&&(t=t.replace(/\s*foam\[ idx \] = 0\.0;/,``)),n?t:((n||r)&&(t=t.replace(/let a0 = fftShared\[ i2 \]; /g,``).replace(/let b0 = fftCmul2\( fftShared\[ j2 \], w \); /g,``),t=t.replace(/^\s*fftShared\[ (?:i2|j2) \] = a0 [+-] b0;\n/gm,``),n&&(t=t.replace(/\s*\/\/ Dx_hat[\s\S]*?(?=\s*\/\/ c2 =)/,`
`),t=t.replace(/^\s*fftShared\[ r \] = vec4f\( c0, c1 \);\n/gm,``).replace(/^\s*tmp\[ o \] = fftShared\[ x \* 2u \];\n/gm,``)),r&&(t=t.replace(/^\s*fftShared\[ r \] = tmp\[ idx \* 2u \];\n/gm,``).replace(/^\s*let A = fftShared\[ y \* 2u \] \* sign;\n/gm,``).replace(/^\s*let Dx = A.x;[^\n]*\n/gm,``).replace(/\s*let jxx = lambda \* Dxx \+ 1\.0;[\s\S]*?(?=\s*let uv =)/,`
`).replace(/^\s*let vDisp = [^;]+;\n/gm,``).replace(/^\s*textureStore\( dispOut,[^\n]+\n/gm,``).replace(/^\s*mipSrc\[ idx \* 2u \] = vDisp;\n/gm,``))),i&&(t=t.replace(/let a0 = fftShared\[i2\]; /g,``).replace(/\s*let b0 = fftCmul2\(fftShared\[j2\], w\);/g,``),t=t.replace(/^\s*fftShared\[(?:i2|j2)\] = a0 [+-] b0;\n/gm,``).replace(/^\s*fftShared\[r\] = tmp\[idx \* 2u\];\n/gm,``).replace(/^\s*let A = fftShared\[k\] \* sign;\n/gm,``).replace(/^\s*let Dx = A.x;[^\n]*\n/gm,``).replace(/\s*let jxx = lambda \* Dxx \+ 1\.0;[\s\S]*?(?=\s*let uv =)/,`
`).replace(/^\s*let vDisp = [^;]+;\n/gm,``).replace(/^\s*textureStore\(dispOut,[^\n]+\n/gm,``).replace(/^\s*fftShared\[k\] = vDisp;\n/gm,``).replace(/^\s*let vd = [^;]+;\n/gm,``).replace(/^\s*textureStore\(dispMip1,[^\n]+\n/gm,``).replace(/^\s*mipSrc\[dst\] = vd;\n/gm,``)),t)}var Er=class extends Fe{constructor(){super(),this.type=`Group`}};Er.prototype.isGroup=!0;var Dr=35044,G=new l,Or=new P,kr={getComponent(e,t){let n=this.array[this._idx(e,t)];return this.normalized?ge(n,this.array):n},setComponent(e,t,n){return this.array[this._idx(e,t)]=this.normalized?_e(n,this.array):n,this},getX(e){return this.getComponent(e,0)},getY(e){return this.getComponent(e,1)},getZ(e){return this.getComponent(e,2)},getW(e){return this.getComponent(e,3)},setX(e,t){return this.setComponent(e,0,t)},setY(e,t){return this.setComponent(e,1,t)},setZ(e,t){return this.setComponent(e,2,t)},setW(e,t){return this.setComponent(e,3,t)},setXY(e,t,n){return this.setComponent(e,0,t),this.setComponent(e,1,n)},setXYZ(e,t,n,r){return this.setComponent(e,0,t),this.setComponent(e,1,n),this.setComponent(e,2,r)},setXYZW(e,t,n,r,i){return this.setComponent(e,0,t),this.setComponent(e,1,n),this.setComponent(e,2,r),this.setComponent(e,3,i)},applyMatrix3(e){if(this.itemSize===2)for(let t=0;t<this.count;t++)Or.fromBufferAttribute(this,t).applyMatrix3(e),this.setXY(t,Or.x,Or.y);else if(this.itemSize===3)for(let t=0;t<this.count;t++)G.fromBufferAttribute(this,t).applyMatrix3(e),this.setXYZ(t,G.x,G.y,G.z);return this},applyMatrix4(e){for(let t=0;t<this.count;t++)G.fromBufferAttribute(this,t).applyMatrix4(e),this.setXYZ(t,G.x,G.y,G.z);return this},applyNormalMatrix(e){for(let t=0;t<this.count;t++)G.fromBufferAttribute(this,t).applyNormalMatrix(e),this.setXYZ(t,G.x,G.y,G.z);return this},transformDirection(e){for(let t=0;t<this.count;t++)G.fromBufferAttribute(this,t).transformDirection(e),this.setXYZ(t,G.x,G.y,G.z);return this}},K=class extends a{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`BufferAttribute: array should be a Typed Array.`);this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Dr,this.updateRanges=[],this.gpuType=1015,this.version=0,this.onUploadCallback=Ar}set needsUpdate(e){e===!0&&this.version++}_idx(e,t){return e*this.itemSize+t}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){let r=this.itemSize;e*=r,n*=t.itemSize;for(let i=0;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}set(e,t=0){return this.array.set(e,t),this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}dispose(){this.dispatchEvent({type:`dispose`})}};Object.assign(K.prototype,kr),K.prototype.isBufferAttribute=!0;function Ar(){}var jr=class extends K{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Mr=class extends K{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Nr=class extends K{constructor(e,t,n){super(new Float32Array(e),t,n)}},Pr=class e extends K{constructor(e,t,n,r=1){super(e,t,n),this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new e(this.array,this.itemSize).copy(this)}};Pr.prototype.isInstancedBufferAttribute=!0;var Fr=class extends a{constructor(e,t){super(),this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Dr,this.updateRanges=[],this.version=0,this.uuid=A(),this.onUploadCallback=Ar}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}set(e,t=0){return this.array.set(e,t),this}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0;r<this.stride;r++)this.array[e+r]=t.array[n+r];return this}clone(){return new this.constructor(new this.array.constructor(this.array),this.stride).copy(this)}dispose(){this.dispatchEvent({type:`dispose`})}};Fr.prototype.isInterleavedBuffer=!0;var Ir=class e extends Fr{constructor(e,t,n=1){super(e,t),this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new e(new this.array.constructor(this.array),this.stride,this.meshPerAttribute)}};Ir.prototype.isInstancedInterleavedBuffer=!0;var Lr=class{constructor(e,t,n,r=!1){this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}_idx(e,t){return e*this.data.stride+this.offset+t}clone(){let e=new this.array.constructor(this.count*this.itemSize);for(let t=0;t<this.count;t++)for(let n=0;n<this.itemSize;n++)e[t*this.itemSize+n]=this.array[this._idx(t,n)];return new K(e,this.itemSize,this.normalized)}};Object.assign(Lr.prototype,kr),Lr.prototype.isInterleavedBufferAttribute=!0;var Rr=0,zr=new v,Br=new T,Vr=new o,Hr=new V,Ur=new l,Wr=new l;function Gr(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}var q=class e extends a{constructor(){super(),Object.defineProperty(this,"id",{value:Rr++}),this.uuid=A(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Gr(e)?Mr:jr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this.attributesVersion=(this.attributesVersion||0)+1,this}deleteAttribute(e){return delete this.attributes[e],this.attributesVersion=(this.attributesVersion||0)+1,this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;n!==void 0&&(n.applyNormalMatrix(Br.getNormalMatrix(e)),n.needsUpdate=!0);let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return this.applyMatrix4(zr.makeRotationFromQuaternion(e))}rotateX(e){return this.applyMatrix4(zr.makeRotationX(e))}rotateY(e){return this.applyMatrix4(zr.makeRotationY(e))}rotateZ(e){return this.applyMatrix4(zr.makeRotationZ(e))}translate(e,t,n){return this.applyMatrix4(zr.makeTranslation(e,t,n))}scale(e,t,n){return this.applyMatrix4(zr.makeScale(e,t,n))}lookAt(e){return zr.lookAt(e,Ur.set(0,0,0),new l(0,1,0)),Vr.setFromRotationMatrix(zr),this.applyQuaternion(Vr)}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wr).negate(),this.translate(Wr.x,Wr.y,Wr.z)}setFromPoints(e){let t=[];for(let n of e)t.push(n.x,n.y,n.z||0);return this.setAttribute(`position`,new Nr(t,3))}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new V);let e=this.attributes.position;if(e===void 0){this.boundingBox.makeEmpty();return}this.boundingBox.setFromBufferAttribute(e)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vt);let e=this.attributes.position;if(e===void 0){this.boundingSphere.makeEmpty();return}let t=this.boundingSphere.center;Hr.setFromBufferAttribute(e).getCenter(t);let n=0;for(let r=0;r<e.count;r++)n=Math.max(n,t.distanceToSquared(Ur.fromBufferAttribute(e,r)));this.boundingSphere.radius=Math.sqrt(n)}computeTangents(){let e=this.index,t=this.attributes.position,n=this.attributes.normal,r=this.attributes.uv;if(e===null||t===void 0||n===void 0||r===void 0){console.error(`BufferGeometry.computeTangents(): missing required attributes (index, position, normal or uv)`);return}let i=t.count;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new K(new Float32Array(4*i),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<i;e++)o[e]=new l,s[e]=new l;let c=new l,u=new l,d=new l,f=new P,p=new P,m=new P,h=new l,g=new l,_=(e,n,i)=>{c.fromBufferAttribute(t,e),u.fromBufferAttribute(t,n),d.fromBufferAttribute(t,i),f.fromBufferAttribute(r,e),p.fromBufferAttribute(r,n),m.fromBufferAttribute(r,i),u.sub(c),d.sub(c),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[n].add(h),o[i].add(h),s[e].add(g),s[n].add(g),s[i].add(g))},v=this.groups.length?this.groups:[{start:0,count:e.count}];for(let t of v)for(let n=t.start;n<t.start+t.count;n+=3)_(e.getX(n),e.getX(n+1),e.getX(n+2));let y=new l,b=new l,x=new l,S=new l,C=e=>{b.fromBufferAttribute(n,e),x.copy(b);let t=o[e];y.copy(t).sub(b.multiplyScalar(b.dot(t))).normalize(),S.crossVectors(x,t);let r=S.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,r)};for(let t of v)for(let n=t.start;n<t.start+t.count;n++)C(e.getX(n))}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t===void 0)return;let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new K(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0;e<n.count;e++)n.setXYZ(e,0,0,0);let r=new l,i=new l,a=new l,o=new l,s=new l,c=new l,u=new l,d=new l;if(e)for(let l=0,f=e.count;l<f;l+=3){let f=e.getX(l),p=e.getX(l+1),m=e.getX(l+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),o.subVectors(a,i),s.subVectors(r,i),o.cross(s),c.fromBufferAttribute(n,f),u.fromBufferAttribute(n,p),d.fromBufferAttribute(n,m),c.add(o),u.add(o),d.add(o),n.setXYZ(f,c.x,c.y,c.z),n.setXYZ(p,u.x,u.y,u.z),n.setXYZ(m,d.x,d.y,d.z)}else for(let e=0,c=t.count;e<c;e+=3)r.fromBufferAttribute(t,e),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),o.subVectors(a,i),s.subVectors(r,i),o.cross(s),n.setXYZ(e,o.x,o.y,o.z),n.setXYZ(e+1,o.x,o.y,o.z),n.setXYZ(e+2,o.x,o.y,o.z);this.normalizeNormals(),n.needsUpdate=!0}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ur.fromBufferAttribute(e,t).normalize(),e.setXYZ(t,Ur.x,Ur.y,Ur.z)}toNonIndexed(){if(this.index===null)return console.warn(`BufferGeometry.toNonIndexed(): geometry is already non-indexed.`),this;let t=new e,n=this.index,r=e=>{let t=e.itemSize,r=new e.array.constructor(n.count*t);for(let i=0;i<n.count;i++){let a=n.getX(i);for(let n=0;n<t;n++)r[i*t+n]=e.array[e._idx(a,n)]}return new K(r,t,e.normalized)};for(let e in this.attributes)t.setAttribute(e,r(this.attributes[e]));for(let e in this.morphAttributes)t.morphAttributes[e]=this.morphAttributes[e].map(r);t.morphTargetsRelative=this.morphTargetsRelative;for(let e of this.groups)t.addGroup(e.start,e.count,e.materialIndex);return t}clone(){return new e().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.name=e.name,e.index!==null&&this.setIndex(e.index.clone());for(let t in e.attributes)this.setAttribute(t,e.attributes[t].clone());for(let t in e.morphAttributes)this.morphAttributes[t]=e.morphAttributes[t].map(e=>e.clone());this.morphTargetsRelative=e.morphTargetsRelative;for(let t of e.groups)this.addGroup(t.start,t.count,t.materialIndex);return e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}};q.prototype.isBufferGeometry=!0;var Kr=class e extends q{constructor(){super(),this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}clone(){return new e().copy(this)}};Kr.prototype.isInstancedBufferGeometry=!0;var qr=class extends Fe{constructor(e=new q,t=null){super(),this.type=`Mesh`,this.geometry=e,this.material=t,this.count=1}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this.count=e.count,this}};qr.prototype.isMesh=!0;var Jr=new v,Yr=new V,Xr=new Vt,Zr=class e extends qr{constructor(e,t,n){super(e,t),this.type=`InstancedMesh`,this.instanceMatrix=new Pr(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Jr.identity())}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}getColorAt(e,t){return t.fromArray(this.instanceColor.array,e*3)}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Pr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new V),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,Jr),Yr.copy(e.boundingBox).applyMatrix4(Jr),this.boundingBox.union(Yr)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Vt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,Jr),Xr.copy(e.boundingSphere).applyMatrix4(Jr),this.boundingSphere.union(Xr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}clone(t){return new e(this.geometry,this.material,this.count).copy(this,t)}dispose(){this.dispatchEvent({type:`dispose`})}};Zr.prototype.isInstancedMesh=!0;function Qr(e,t,n,r,i){t&&e.setIndex(t),e.setAttribute(`position`,new Nr(n,3)),e.setAttribute(`normal`,new Nr(r,3)),e.setAttribute(`uv`,new Nr(i,2))}var $r=class extends q{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a},r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let o=[],s=[],c=[],u=[],d=0,f=0,p=new l,m=(e,t,n,r,i,a,l,m,h,g,_)=>{let v=a/h,y=l/g,b=a/2,x=l/2,S=m/2,C=h+1,w=g+1,T=0,E=0;for(let a=0;a<w;a++){let o=a*y-x;for(let l=0;l<C;l++){let d=l*v-b;p[e]=d*r,p[t]=o*i,p[n]=S,s.push(p.x,p.y,p.z),p[e]=0,p[t]=0,p[n]=m>0?1:-1,c.push(p.x,p.y,p.z),u.push(l/h,1-a/g),T++}}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d,r=n+t+C*e,i=n+t+C*(e+1),a=n+(t+1)+C*(e+1),s=n+(t+1)+C*e;o.push(r,i,s,i,a,s),E+=6}this.addGroup(f,E,_),f+=E,d+=T};m(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),m(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),m(`x`,`z`,`y`,1,1,e,n,t,r,a,2),m(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),m(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),m(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),Qr(this,o,s,c,u)}},ei=class extends q{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,u=[],d=[],f=[],p=[],m=[],h=new l;for(let l=0;l<=n;l++){let d=[],g=l/n,_=0;l===0&&a===0?_=.5/t:l===n&&s===Math.PI&&(_=-.5/t);for(let n=0;n<=t;n++){let s=n/t,l=Math.sin(a+g*o);h.set(-e*Math.cos(r+s*i)*l,e*Math.cos(a+g*o),e*Math.sin(r+s*i)*l),f.push(h.x,h.y,h.z),h.normalize(),p.push(h.x,h.y,h.z),m.push(s+_,1-g),d.push(c++)}u.push(d)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=u[e][r+1],i=u[e][r],o=u[e+1][r],c=u[e+1][r+1];(e!==0||a>0)&&d.push(t,i,c),(e!==n-1||s<Math.PI)&&d.push(i,o,c)}Qr(this,d,f,p,m)}},ti=class extends q{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s},r=Math.floor(r),i=Math.floor(i);let c=[],u=[],d=[],f=[],p=[],m=n/2,h=0,g=0,_=new l;{let a=0,l=(t-e)/n;for(let a=0;a<=i;a++){let c=[],g=a/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,a=Math.sin(i),p=Math.cos(i);u.push(v*a,-g*n+m,v*p),_.set(a,l,p).normalize(),d.push(_.x,_.y,_.z),f.push(t,1-g),c.push(h++)}p.push(c)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let o=p[r][n],s=p[r+1][n],l=p[r+1][n+1],u=p[r][n+1];(e>0||r!==0)&&(c.push(o,s,u),a+=3),(t>0||r!==i-1)&&(c.push(s,l,u),a+=3)}this.addGroup(g,a,0),g+=a}let v=n=>{let i=h,a=n===!0?e:t,l=n===!0?1:-1,p=0;for(let e=1;e<=r;e++)u.push(0,m*l,0),d.push(0,l,0),f.push(.5,.5),h++;let _=h;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);u.push(a*i,m*l,a*n),d.push(0,l,0),f.push(n*.5+.5,i*.5*l+.5),h++}for(let e=0;e<r;e++){let t=i+e,r=_+e;n===!0?c.push(r,r+1,t):c.push(r+1,r,t),p+=3}this.addGroup(g,p,n===!0?1:2),g+=p};a===!1&&(e>0&&v(!0),t>0&&v(!1)),Qr(this,c,u,d,f)}},ni=(1+Math.sqrt(5))/2;-ni,-ni,-ni,-ni,-ni,-ni;var ri=new l;function J(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;ri.copy(t),ri[r]=0,ri.normalize();let l=.5*o/(o+s),u=1-ri.angleTo(e)/c;return Math.sign(ri[n])===1?u*l:s/(o+s)+l+l*(1-u)}var ii=class extends $r{constructor(e=1,t=1,n=1,r=2,i=.1){if(r=r*2+1,i=Math.min(e/2,t/2,n/2,i),super(1,1,1,r,r,r),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},r===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let o=new l,s=new l,c=new l,u=new l(e,t,n).divideScalar(2).subScalar(i),d=this.attributes.position.array,f=this.attributes.normal.array,p=this.attributes.uv.array,m=d.length/3/6,h=.5/r;for(let r=0,a=0;r<d.length/3;r++,a+=3){o.fromArray(d,a),s.copy(o),s.x-=Math.sign(s.x)*h,s.y-=Math.sign(s.y)*h,s.z-=Math.sign(s.z)*h,s.normalize(),d[a]=u.x*Math.sign(o.x)+s.x*i,d[a+1]=u.y*Math.sign(o.y)+s.y*i,d[a+2]=u.z*Math.sign(o.z)+s.z*i,f[a]=s.x,f[a+1]=s.y,f[a+2]=s.z;let l=r*2;switch(Math.floor(r/m)){case 0:c.set(1,0,0),p[l]=J(c,s,`z`,`y`,i,n),p[l+1]=1-J(c,s,`y`,`z`,i,t);break;case 1:c.set(-1,0,0),p[l]=1-J(c,s,`z`,`y`,i,n),p[l+1]=1-J(c,s,`y`,`z`,i,t);break;case 2:c.set(0,1,0),p[l]=1-J(c,s,`x`,`z`,i,e),p[l+1]=J(c,s,`z`,`x`,i,n);break;case 3:c.set(0,-1,0),p[l]=1-J(c,s,`x`,`z`,i,e),p[l+1]=1-J(c,s,`z`,`x`,i,n);break;case 4:c.set(0,0,1),p[l]=1-J(c,s,`x`,`y`,i,e),p[l+1]=1-J(c,s,`y`,`x`,i,t);break;case 5:c.set(0,0,-1),p[l]=J(c,s,`x`,`y`,i,e),p[l+1]=1-J(c,s,`y`,`x`,i,t)}}}};function ai(e){let t=e[0],n=t.array.constructor,r=t.itemSize,i=t.normalized,a=0;for(let t of e){if(t.array.constructor!==n||t.itemSize!==r||t.normalized!==i)return console.error(`mergeAttributes(): attributes differ in array type, itemSize or normalized.`),null;a+=t.count*r}let o=new n(a),s=0;for(let t of e){if(t.isInterleavedBufferAttribute)for(let e=0;e<t.count;e++)for(let n=0;n<r;n++)o[s+e*r+n]=t.array[t._idx(e,n)];else o.set(t.array.subarray(0,t.count*r),s);s+=t.count*r}let c=new K(o,r,i);return c.gpuType=t.gpuType===void 0?c.gpuType:t.gpuType,c}function oi(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i={},a=new q,o=0;for(let s=0;s<e.length;s++){let c=e[s];if(n!==(c.index!==null))return console.error(`mergeGeometries(): geometry ${s} index mismatch; all or none must be indexed.`),null;let l=0;for(let e in c.attributes){if(!r.has(e))return console.error(`mergeGeometries(): geometry ${s} has attribute "${e}" missing from geometry 0.`),null;(i[e]||=[]).push(c.attributes[e]),l++}if(l!==r.size)return console.error(`mergeGeometries(): geometry ${s} is missing attributes.`),null;if(t){let e=n?c.index.count:c.attributes.position.count;a.addGroup(o,e,s),o+=e}}if(n){let t=0,n=[];for(let r of e){let e=r.index;for(let r=0;r<e.count;r++)n.push(e.getX(r)+t);t+=r.attributes.position.count}a.setIndex(n)}for(let e in i){let t=ai(i[e]);if(!t)return console.error(`mergeGeometries(): failed merging attribute "${e}".`),null;a.setAttribute(e,t)}let s=e.map(e=>e.userData).filter(e=>e&&Object.keys(e).length);return s.length&&(a.userData.mergedUserData=s),a}var si=0,ci=class{constructor(e={}){this.id=si++,this.label=e.label||e.name||`texture`+this.id,this.width=Math.max(1,e.width||1),this.height=Math.max(1,e.height||1),this.depth=Math.max(1,e.depth||(e.dimension===`cube`?6:1)),this.dimension=e.dimension||`2d`,this.format=e.format||`rgba8unorm`,this.mipsOption=e.mips??!1,this.sampleCount=e.sampleCount||1;let t=e.usage||[`sample`,`copyDst`];this.usageList=t,this.sampler=e.sampler||`linearClamp`,this.gpu=null,this.version=0,this._views=new Map,this.isTexture=!0,e.data&&(this.pendingData=e.data)}get mipLevelCount(){return this.mipsOption===!0?Math.floor(Math.log2(Math.max(this.width,this.height,this.dimension===`3d`?this.depth:1)))+1:typeof this.mipsOption==`number`?this.mipsOption:1}get usage(){let e=0;for(let t of this.usageList)e|={sample:GPUTextureUsage.TEXTURE_BINDING,render:GPUTextureUsage.RENDER_ATTACHMENT,storage:GPUTextureUsage.STORAGE_BINDING,copySrc:GPUTextureUsage.COPY_SRC,copyDst:GPUTextureUsage.COPY_DST}[t];return this.mipLevelCount>1&&(e|=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING),e}get isDepth(){return this.format.startsWith(`depth`)}get sampleType(){return i(this.format)}wgslType(e=this.defaultViewDimension){let t=this.sampleType;if(t===`depth`)return{"2d":`texture_depth_2d`,"2d-array":`texture_depth_2d_array`,cube:`texture_depth_cube`}[e];let n=t===`uint`?`u32`:t===`sint`?`i32`:`f32`;return`texture_${e.replace(`-`,`_`)}<${n}>`}get defaultViewDimension(){return this.dimension}getGPU(){return this.gpu||this._create(),this.gpu}_create(){let e=this.dimension===`3d`?`3d`:`2d`;if(this.gpu=t.device.createTexture({label:this.label,size:{width:this.width,height:this.height,depthOrArrayLayers:this.depth},dimension:e,format:this.format,mipLevelCount:this.mipLevelCount,sampleCount:this.sampleCount,usage:this.usage}),this._views.clear(),this.version++,this.pendingData){let e=this.pendingData;this.pendingData=null,this.upload(e)}}view(e=null){let t=this.getGPU(),n=e?JSON.stringify(e):``,r=this._views.get(n);return r||(r=t.createView({label:this.label+n,dimension:e?.dimension||this.defaultViewDimension,...e||{}}),this._views.set(n,r)),r}resize(e,n,r=this.depth){if(e=Math.max(1,Math.floor(e)),n=Math.max(1,Math.floor(n)),e===this.width&&n===this.height&&r===this.depth&&this.gpu)return!1;if(this.width=e,this.height=n,this.depth=r,this.gpu){let e=this.gpu;t.onSubmit(null,()=>e.destroy()),this.gpu=null}return this._create(),!0}upload(e,{mip:n=0,layer:i=0,layers:a=null,width:o=null,height:s=null,x:c=0,y:l=0}={}){if(!this.gpu){if(n===0&&i===0&&!o){this.pendingData=e,this.getGPU();return}this.getGPU()}let u=r(this.format).bytes,d=o||Math.max(1,this.width>>n),f=s||Math.max(1,this.height>>n),p=a||(this.dimension===`3d`?Math.max(1,this.depth>>n):this.depth-i),m=e instanceof ArrayBuffer?e:e.buffer,h=e instanceof ArrayBuffer?0:e.byteOffset;t.queue.writeTexture({texture:this.gpu,mipLevel:n,origin:{x:c,y:l,z:i}},m,{offset:h,bytesPerRow:d*u,rowsPerImage:f},{width:d,height:f,depthOrArrayLayers:p})}destroy(){this.gpu&&this.gpu.destroy(),this.gpu=null,this.version++}},li=class{constructor(e,t,{colors:n=[`rgba16float`],depth:r=null,label:i=`rt`,mips:a=!1,usage:o=[`sample`,`render`,`copySrc`,`copyDst`],depthUsage:s=[`sample`,`render`,`copySrc`,`copyDst`],scale:c=1}={}){this.label=i,this.width=Math.max(1,e|0),this.height=Math.max(1,t|0),this.scale=c,this.textures=n.map((e,t)=>{let n=typeof e==`string`?{format:e}:e;return new ci({label:`${i}.${n.name||t}`,width:this.width,height:this.height,format:n.format,mips:n.mips??a,usage:n.usage||o})}),this.depthTexture=r?new ci({label:i+`.depth`,width:this.width,height:this.height,format:r,usage:s}):null}get texture(){return this.textures[0]}get formats(){return this.textures.map(e=>e.format)}setSize(e,t){if(e=Math.max(1,e|0),t=Math.max(1,t|0),e===this.width&&t===this.height)return!1;this.width=e,this.height=t;for(let n of this.textures)n.resize(e,t);return this.depthTexture&&this.depthTexture.resize(e,t),!0}},ui=0,di=class{constructor({label:e,count:t,type:n=`vec4f`,stride:r=null,data:i=null,usage:a=[]}){if(this.id=ui++,this.label=e||`buffer`+this.id,this.count=t,this.type=n,this.stride=r||{f32:4,u32:4,i32:4,"atomic<u32>":4,"atomic<i32>":4,vec2f:8,vec2u:8,vec3f:16,vec4f:16,vec4u:16,vec4i:16,mat4x4f:64}[n],!this.stride)throw Error(`StorageBuffer ${this.label}: pass a stride for ${n}`);this.byteLength=Math.max(16,t*this.stride),this.extraUsage=a,this.gpu=null,this.version=0,this.pendingData=i,this.isStorageBuffer=!0}getGPU(){if(!this.gpu){let e=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC;for(let t of this.extraUsage)e|={vertex:GPUBufferUsage.VERTEX,index:GPUBufferUsage.INDEX,indirect:GPUBufferUsage.INDIRECT,uniform:GPUBufferUsage.UNIFORM}[t];if(this.gpu=t.device.createBuffer({label:this.label,size:Math.ceil(this.byteLength/4)*4,usage:e}),this.version++,this.pendingData){let e=this.pendingData;this.pendingData=null,this.write(e)}}return this.gpu}write(e,n=0){if(!this.gpu){if(n===0){this.pendingData=e,this.getGPU();return}this.getGPU()}t.queue.writeBuffer(this.gpu,n,e.buffer||e,e.byteOffset||0,e.byteLength??void 0)}destroy(){this.gpu&&this.gpu.destroy(),this.gpu=null}},fi=class{constructor({label:e=`kernel`,modules:n=[],bindings:r={},code:i,workgroupSize:a=[64,1,1],defines:o={},entryPoint:s=`main`}){this.label=e,this.workgroupSize=a;let[c,l=1,u=1]=a,d=Ct({modules:n,bindings:r,code:i.replace(/\bWG_X\b/g,c).replace(/\bWG_Y\b/g,l).replace(/\bWG_Z\b/g,u),defines:o,stage:`compute`,label:e});this.source=d.code,this.bindings=d.bindings,this.group0=d.group0;let f=Dt(d.code,e);this.handle=t.computePipeline({label:e,layout:t.device.createPipelineLayout({bindGroupLayouts:[d.group0.layout,d.bindings.layout]}),compute:{module:f,entryPoint:s}}),this.timestampWrites=null}get pipeline(){return t.ready(this.handle)}dispatch(e,{pass:n=null,indirect:r=null}={}){let[i,a=1,o=1]=Array.isArray(e)?e:[e];if(!r&&(i===0||a===0||o===0))return;let s=e=>{e.setPipeline(t.ready(this.handle)),e.setBindGroup(0,this.group0.getBindGroup()),e.setBindGroup(1,this.bindings.getBindGroup()),r?e.dispatchWorkgroupsIndirect(r.buffer.getGPU?r.buffer.getGPU():r.buffer,r.offset||0):e.dispatchWorkgroups(i,a,o)};n?s(n):t.computePass(this.label,s,this.timestampWrites||void 0)}groups(e,t=1,n=1){let[r,i=1,a=1]=this.workgroupSize;return[Math.ceil(e/r),Math.ceil(t/i),Math.ceil(n/a)]}},pi=new Map,mi=null;function hi(e){let n=pi.get(e);return n||(mi||=t.device.createShaderModule({label:`mipmap`,code:`
		struct VSOut { @builtin( position ) pos: vec4f, @location( 0 ) uv: vec2f };
		@vertex fn vs( @builtin( vertex_index ) i: u32 ) -> VSOut {
			let p = vec2f( f32( ( i << 1u ) & 2u ), f32( i & 2u ) );
			var o: VSOut;
			o.pos = vec4f( p * 2.0 - 1.0, 0.0, 1.0 );
			o.uv = vec2f( p.x, 1.0 - p.y );
			return o;
		}
		@group( 0 ) @binding( 0 ) var src: texture_2d<f32>;
		@group( 0 ) @binding( 1 ) var smp: sampler;
		@fragment fn fs( in: VSOut ) -> @location( 0 ) vec4f {
			return textureSampleLevel( src, smp, in.uv, 0.0 );
		}
	`}),n=t.device.createRenderPipeline({label:`mipmap `+e,layout:`auto`,vertex:{module:mi,entryPoint:`vs`},fragment:{module:mi,entryPoint:`fs`,targets:[{format:e}]},primitive:{topology:`triangle-list`}}),pi.set(e,n),n)}var gi=new WeakMap;function _i(e,n,r){let i=gi.get(e);if(i&&i.gpu===n)return i;let a=e.mipLevelCount,o=e.dimension===`3d`?1:e.depth,s=[],c=r.getBindGroupLayout(0);for(let r=0;r<o;r++)for(let i=1;i<a;i++){let a=n.createView({dimension:`2d`,baseMipLevel:i-1,mipLevelCount:1,baseArrayLayer:r,arrayLayerCount:1}),o=n.createView({dimension:`2d`,baseMipLevel:i,mipLevelCount:1,baseArrayLayer:r,arrayLayerCount:1}),l=t.device.createBindGroup({label:`mipmap `+e.label,layout:c,entries:[{binding:0,resource:a},{binding:1,resource:t.samplers.linearClamp}]});s.push({bg:l,desc:{label:`mipmap`,colorAttachments:[{view:o,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,0]}]}})}return i={gpu:n,pipeline:r,steps:s},gi.set(e,i),i}function vi(e,n=t.getEncoder()){if(e.mipLevelCount<2)return;let r=e.getGPU(),i=hi(e.format),{steps:a}=_i(e,r,i);for(let e=0;e<a.length;e++){let t=n.beginRenderPass(a[e].desc);t.setPipeline(i),t.setBindGroup(0,a[e].bg),t.draw(3),t.end()}}new l,new Vt,new Jt,new v,new v,e().compactTargets;var yi=[];for(let e=0;e<8;e++)yi.push(new l);var bi=new l,xi=new l(0,1,0),Si=new v,Ci=new l,wi=new R,Ti=new WeakMap,Ei=0;function Di(e){return!e||typeof e!=`object`?String(e):(Ti.has(e)||Ti.set(e,++Ei),Ti.get(e))}var Oi=class{constructor({size:e=2048,splits:t=[10,60,400],lightMargin:n=200,normalBias:r=[.015,.06,.3],bias:i=2e-5,pcssCascades:a=1,cacheStatic:o=!1,skipUnused:s=o}={}){this.size=e,this.splits=t,this.count=t.length,this.lightMargin=n,this.normalBias=r,this.periods=t.map((e,t)=>t===0?1:t===1?2:4),this.cacheStatic=o,this.skipUnused=s,this._samplingEnabled=!1,this.staticTexture=null,this.texture=new ci({label:`sunShadowMap`,width:e,height:e,depth:this.count,dimension:`2d-array`,format:`depth32float`,usage:[`sample`,`render`,`copyDst`]}),En(this.texture),this.cascades=t.map((e,t)=>({camera:{matrixWorld:new v,matrixWorldInverse:new v,projectionMatrix:new v,near:0,far:1,reversedDepth:!1,updateMatrixWorld(){},isCamera:!0,isShadowCamera:!0},block:Wn(`shadowView`+t),viewProj:new v,radius:0,dirty:!0})),this.enabled=!0,this.layerMask=4294967295,this.frame=0,this.lastSun=new l(0,-2,0);let c=wn.fields;c.count.value=this.count,c.mapSize.value=e,c.bias.value=i,c.pcssCascades.value=a,c.enabled.value=1}invalidateStatic(){for(let e of this.cascades)e.staticKey=null,e.dirty=!0}_margin(e){let t=this.splits[this.count-1],n=e/t;return Math.max(.25*n*n,.25*n)*t}_fit(e,t,n){let r=this.cascades[e],i=e===0?0:this.splits[e-1],a=this.splits[e],o=this._margin(i),s=this._margin(a),c=Math.max(t.near,i-o*.5),u=e===this.count-1?a:a+s*.5;wn.fields.blend.value[e]=new R(i,a,o,s);let d=Math.tan(t.fov*Math.PI/360),f=d*t.aspect,p=0;for(let e of[c,u])for(let n of[-1,1])for(let r of[-1,1])yi[p++].set(n*f*e,r*d*e,-e).applyMatrix4(t.matrixWorld);let m=Math.min(u,(c+u)/2*(1+f*f+d*d));bi.set(0,0,-m).applyMatrix4(t.matrixWorld);let h=0;for(let e of yi)h=Math.max(h,e.distanceTo(bi));h=Math.ceil(h*16)/16,r.radius=h;let g=r.camera,_=n,v=Math.abs(_.y)>.99?Ci.set(1,0,0):xi;g.matrixWorld.lookAt(_,new l(0,0,0),v),Si.copy(g.matrixWorld).invert();let y=2*h/this.size,b=wi.set(bi.x,bi.y,bi.z,1).applyMatrix4(Si);b.x=Math.round(b.x/y)*y,b.y=Math.round(b.y/y)*y;let x=h+this.lightMargin,S=new l(b.x,b.y,b.z+x).applyMatrix4(g.matrixWorld);g.matrixWorld.setPosition(S),g.matrixWorldInverse.copy(g.matrixWorld).invert();let C=.1,w=x+h;g.near=C,g.far=w,Ai(g.projectionMatrix,-h,h,h,-h,C,w),r.viewProj.multiplyMatrices(g.projectionMatrix,g.matrixWorldInverse);let T=wn.fields;T.matrices.value[e]=r.viewProj.clone(),T.cascades.value[e]=new R(u,y,this.normalBias[e]??.05,w-C)}update(e,t){this.frame++;let n=this.enabled&&t.y>-.05;if(wn.fields.enabled.value=+!!n,this.skipUnused&&n&&!this._samplingEnabled&&this.invalidateStatic(),this._samplingEnabled=n,!this.enabled||this.skipUnused&&!n)return[];e.updateMatrixWorld();let r=this.lastSun.angleTo(t)>1e-4;this.lastSun.copy(t);let i=[];for(let n=0;n<this.count;n++)(r||this.cascades[n].dirty||(this.frame+n)%this.periods[n]===0)&&(this._fit(n,e,t),this.cascades[n].dirty=!1,i.push(n));return i}render(e,n,r){for(let i of r){let r=this.cascades[i];Jn(r.camera,this.size,this.size,{block:r.block});let a={label:`shadow cascade `+i,kind:`depth`,camera:r.camera,frameBlock:r.block,depthView:this.texture.view({dimension:`2d`,baseArrayLayer:i,arrayLayerCount:1}),depthFormat:`depth32float`,clearDepth:1,depthCompare:`less-equal`,layerMask:this.layerMask,depthBias:2,depthBiasSlopeScale:1.5};if(!this.cacheStatic){n.render(e,a);continue}this.staticTexture||=new ci({label:`staticShadowCache`,width:this.size,height:this.size,depth:this.count,dimension:`2d-array`,format:`depth32float`,usage:[`render`,`copySrc`]});let o=n.collect(e,{...a,filter:e=>e.shadowStatic===!0}),s=ki(r,o);r.staticKey!==s&&(n.render(e,{...a,label:`shadow static cascade `+i,items:o,depthView:this.staticTexture.view({dimension:`2d`,baseArrayLayer:i,arrayLayerCount:1})}),r.staticKey=!n.precompiling&&[...n.pipelines.values()].every(e=>e.handle.pipeline)?s:null),t.getEncoder().copyTextureToTexture({texture:this.staticTexture.getGPU(),origin:{x:0,y:0,z:i}},{texture:this.texture.getGPU(),origin:{x:0,y:0,z:i}},{width:this.size,height:this.size,depthOrArrayLayers:1}),n.render(e,{...a,clearDepth:null,filter:e=>e.shadowStatic!==!0})}}};function ki(e,t){let n=[...e.viewProj.elements.map(Math.fround),Math.fround(e.camera.near),Math.fround(e.camera.far)];for(let e of[...t.opaque,...t.transparent]){let t=e.object,r=e.geometry,i=e.material;n.push(t.id,r.id,i.id,i.version,e.start,e.count,t.count??1,t.shadowRevision??0,i.side,i.alphaTest,i.depthWrite,i.shadow,...t.matrixWorld.elements),t.drawParams&&n.push(...t.drawParams);for(let[e,t]of Object.entries(r.attributes)){let r=t.data||t;n.push(e,Di(t),Di(r.array),r.version,t.count)}r.index&&n.push(Di(r.index),Di(r.index.array),r.index.version,r.index.count),t.instanceMatrix&&n.push(Di(t.instanceMatrix),Di(t.instanceMatrix.array),t.instanceMatrix.version);for(let e of Object.values(i.uniforms||{})){let t=e.value;typeof t==`number`||typeof t==`boolean`?n.push(t):t?.elements?n.push(...t.elements):Array.isArray(t)||ArrayBuffer.isView(t)?n.push(...t):t&&typeof t==`object`&&n.push(t.x,t.y,t.z,t.w,t.r,t.g,t.b)}}return n.join(`|`)}function Ai(e,t,n,r,i,a,o){let s=1/(n-t),c=1/(r-i),l=1/(o-a);return e.set(2*s,0,0,-(n+t)*s,0,2*c,0,-(r+i)*c,0,0,-l,-a*l,0,0,0,1),e}var Y=256,ji=8,Mi=Y/2,Ni=[733,157,33.3,7.1],Pi=Math.PI*2,Fi=class{constructor(e={}){this.scale=e.scale??1,this.windSpeed=e.windSpeed??8,this.windDirection=e.windDirection??20,this.fetch=e.fetch??200,this.spreadBlend=e.spreadBlend??.9,this.swell=e.swell??.2,this.peakEnhancement=e.peakEnhancement??3.3,this.shortWavesFade=e.shortWavesFade??.01}},Ii=`
const FFT_N: u32 = ${Y}u;
const FFT_HALF: u32 = ${Mi}u;
const FFT_G: f32 = ${Kn};

fn fftBitReverse8( v: u32 ) -> u32 {
	var r = v;
	r = ( ( r & 0x55u ) << 1u ) | ( ( r >> 1u ) & 0x55u );
	r = ( ( r & 0x33u ) << 2u ) | ( ( r >> 2u ) & 0x33u );
	r = ( ( r & 0x0Fu ) << 4u ) | ( ( r >> 4u ) & 0x0Fu );
	return r;
}

// complex multiply of two packed complex numbers (v.xy, v.zw) by scalar complex w
fn fftCmul2( v: vec4f, w: vec2f ) -> vec4f {
	return vec4f( v.x * w.x - v.y * w.y, v.x * w.y + v.y * w.x, v.z * w.x - v.w * w.y, v.z * w.y + v.w * w.x );
}

// PCG hash
fn fftPcg( v: u32 ) -> u32 {
	let state = v * 747796405u + 2891336453u;
	let word = ( ( state >> ( ( state >> 28u ) + 4u ) ) ^ state ) * 277803737u;
	return ( word >> 22u ) ^ word;
}
fn fftToUnit( h: u32 ) -> f32 { return f32( h >> 8u ) * ( 1.0 / 16777216.0 ) + ( 0.5 / 16777216.0 ); }
`,Li=class{constructor(e,n={}){if(this.renderer=e,this.cascades=n.cascades??4,this.derivativeOnly=n.derivativeOnly===!0,this.derivativeOnly&&this.cascades!==4)throw Error(`Rocha derivatives retain logical cascades 2 and 3 of four`);this.fusedMips=n.fusedMips??new URLSearchParams(globalThis.location?.search||``).has(`fusedOcean`),this.fusedMips&&!vr(t.limits)&&(console.warn(`Fused ocean unsupported by negotiated limits; retaining original kernels.`),this.fusedMips=!1),this.sizes=(n.sizes??Ni).slice(0,this.cascades),this.depth=n.depth??500,this.local=new Fi(n.local??{windSpeed:7,windDirection:25,fetch:120,spreadBlend:.85,swell:.05}),this.swell=new Fi(n.swell??{scale:.48,windSpeed:6,windDirection:5,fetch:1200,spreadBlend:1,swell:.9,shortWavesFade:.1});let r=this.cascades;this.params=new Ze(`OceanParams`,{sizes:[`vec4f[4]`,[0,1,2,3].map(e=>new R(this.sizes[e]??1,0,0,0))],cuts:[`vec4f[4]`,[0,1,2,3].map(()=>new R)],sysA:[`vec4f[2]`,[new R,new R]],sysB:[`vec4f[2]`,[new R,new R]],choppiness:[`f32`,n.choppiness??.9],foamBias:[`f32`,.58],foamGain:[`f32`,3],foamDecay:[`f32`,.35],foamAdd:[`f32`,2.5],time:[`f32`,0],depth:[`f32`,this.depth],seed:[`u32`,1337]},{label:`ocean`});let i=this.params.fields;this.choppiness=i.choppiness,this.foamBias=i.foamBias,this.foamGain=i.foamGain,this.foamDecay=i.foamDecay,this.foamAdd=i.foamAdd,this.time=i.time,this.uDepth=i.depth,this.uSeed=i.seed,this.timeScale=1;let a=Y*Y*r;this.h0=new di({label:`fftH0`,count:a,type:`vec4f`}),this.waveData=new di({label:`fftWave`,count:a,type:`vec4f`}),this.tmp=new di({label:`fftTmp`,count:a*2,type:`vec4f`}),this.foam=new di({label:`fftFoam`,count:a,type:`f32`}),this.mipSrc=new di({label:`fftMipSrc`,count:this.fusedMips?a/2:a*2,type:`vec4f`}),this.mipMid=new di({label:`fftMipMid`,count:64*r*2,type:`vec4f`});let o=e=>new ci({label:e,width:Y,height:Y,depth:r,dimension:`2d-array`,format:`rgba16float`,mips:!0,usage:[`sample`,`storage`,`copyDst`,`copySrc`],sampler:`linearRepeat`});this.displacementTexture=o(`oceanDisplacement`),this.derivativeTexture=o(`oceanDerivatives`),this.module=new F({name:`ocean`,deps:[L],uniforms:this.params,uniformName:`ocean`,bindings:{oceanDisplacement:{texture:this.displacementTexture,viewDimension:`2d-array`},oceanDerivatives:{texture:this.derivativeTexture,viewDimension:`2d-array`}},code:`
const OCEAN_CASCADES: i32 = ${r};
const OCEAN_FFT_SIZE: f32 = ${Y}.0;

// Sample all cascades' displacement at world xz (explicit mip level).
fn oceanSampleDisplacement( xz: vec2f, level: f32 ) -> vec3f {
	var sum = vec3f( 0.0 );
	for ( var c = 0; c < OCEAN_CASCADES; c++ ) {
		sum += textureSampleLevel( oceanDisplacement, smpLinearRepeat, xz / ocean.sizes[ c ].x, c, level ).xyz;
	}
	return sum;
}

// ... with a weight per cascade
fn oceanSampleDisplacementWeighted( xz: vec2f, level: f32, w: vec4f ) -> vec3f {
	var sum = vec3f( 0.0 );
	for ( var c = 0; c < OCEAN_CASCADES; c++ ) {
		sum += textureSampleLevel( oceanDisplacement, smpLinearRepeat, xz / ocean.sizes[ c ].x, c, level ).xyz * w[ c ];
	}
	return sum;
}
`}),this._buildKernels(),this.updateSpectrumUniforms(),this.needsSpectrum=!0}get uSizes(){return{array:this.sizes}}setCascadeSizes(e){this.sizes=e.slice(0,this.cascades),this.updateSpectrumUniforms()}updateSpectrumUniforms(){let e=this.cascades,t=this.params.fields;for(let n=0;n<e;n++){let r=n===0?1e-4:Pi/this.sizes[n]*6,i=n===e-1?9999:Pi/this.sizes[n+1]*6;t.cuts.value[n].set(r,i,0,0),t.sizes.value[n].set(this.sizes[n],0,0,0)}t.depth.value=this.depth;let n=[this.local,this.swell];for(let e=0;e<2;e++){let r=n[e],i=Math.max(1,r.fetch)*1e3,a=Math.max(.1,r.windSpeed),o=.076*(Kn*i/(a*a))**-.22,s=22*(a*i/(Kn*Kn))**-.33;t.sysA.value[e].set(r.scale,ve.degToRad(r.windDirection),r.spreadBlend,r.swell),t.sysB.value[e].set(o,s,r.peakEnhancement,r.shortWavesFade)}this.params.set(`cuts`,t.cuts.value),this.params.set(`sizes`,t.sizes.value),this.params.set(`sysA`,t.sysA.value),this.params.set(`sysB`,t.sysB.value),this.needsSpectrum=!0}_buildKernels(){this.cascades;let e={ocean:{uniform:this.params}},n=e=>({storage:e,access:`read_write`}),r=this.derivativeOnly,i=class extends fi{constructor(e){super(r?{...e,code:Tr(e.label,e.code)}:e)}};this.initSpectrumKernel=new i({label:`Ocean Init Spectrum`,modules:[L],bindings:{...e,h0:n(this.h0),waveData:n(this.waveData)},workgroupSize:[16,16,1],code:Ii+`
fn dispersion( k: f32 ) -> f32 { return sqrt( k * FFT_G * tanh( min( k * ocean.depth, 20.0 ) ) ); }

fn dispersionDerivative( k: f32 ) -> f32 {
	let kd = min( k * ocean.depth, 20.0 );
	let th = tanh( kd );
	let ch = cosh( kd );
	return FFT_G * ( ocean.depth * k / ( ch * ch ) + th ) / dispersion( k ) * 0.5;
}

fn tmaCorrection( omega: f32 ) -> f32 {
	let omegaH = omega * sqrt( ocean.depth / FFT_G );
	let a = omegaH * omegaH * 0.5;
	let b = 1.0 - pow( 2.0 - omegaH, 2.0 ) * 0.5;
	return select( select( 1.0, b, omegaH < 2.0 ), a, omegaH <= 1.0 );
}

fn jonswap( omega: f32, sysA: vec4f, sysB: vec4f ) -> f32 {
	let alpha = sysB.x; let peakOmega = sysB.y; let gamma = sysB.z;
	let sigma = select( 0.09, 0.07, omega <= peakOmega );
	let d = omega - peakOmega;
	let r = exp( - d * d / ( sigma * sigma * peakOmega * peakOmega * 2.0 ) );
	let inv = 1.0 / omega;
	let po = peakOmega * inv;
	return sysA.x * tmaCorrection( omega ) * alpha * ( FFT_G * FFT_G )
		* pow( inv, 5.0 )
		* exp( pow( po, 4.0 ) * -1.25 )
		* pow( abs( gamma ), r );
}

fn normalisationFactor( s: f32 ) -> f32 {
	let s2 = s * s; let s3 = s2 * s; let s4 = s3 * s;
	let lo = s4 * -0.000564 + s3 * 0.00776 - s2 * 0.044 + s * 0.192 + 0.163;
	let hi = s4 * -4.80e-08 + s3 * 1.07e-05 - s2 * 9.53e-04 + s * 5.90e-02 + 3.93e-01;
	return select( hi, lo, s < 5.0 );
}

fn directionSpectrum( theta: f32, omega: f32, sysA: vec4f, sysB: vec4f ) -> f32 {
	let peakOmega = sysB.y;
	let ratio = omega / peakOmega;
	let spreadPower = select( pow( abs( ratio ), 5.0 ) * 6.97, pow( abs( ratio ), -2.5 ) * 9.77, omega > peakOmega );
	let s = spreadPower + tanh( min( ratio, 20.0 ) ) * 16.0 * sysA.w * sysA.w;
	let dTheta = theta - sysA.y;
	let cos2s = normalisationFactor( s ) * pow( abs( cos( dTheta * 0.5 ) ), s * 2.0 );
	let cosT = cos( dTheta );
	let base = cosT * cosT * ( 2.0 / PI ) * select( 0.0, 1.0, cosT > 0.0 );
	return mix( base, cos2s, sysA.z );
}

fn shortWavesFade( k: f32, sysB: vec4f ) -> f32 { return exp( - sysB.w * sysB.w * k * k ); }

@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let x = i32( gid.x ); let y = i32( gid.y ); let c = i32( gid.z );
	let idx = c * ${Y*Y} + y * ${Y} + x;

	let L = ocean.sizes[ c ].x;
	let dk = TWO_PI / L;
	let kx = f32( x - ${Mi} ) * dk;
	let kz = f32( y - ${Mi} ) * dk;
	let kLen = length( vec2f( kx, kz ) );

	var outH = vec4f( 0.0 );
	var outW = vec4f( kx, kz, 0.0, 0.0 );

	if ( kLen >= ocean.cuts[ c ].x && kLen <= ocean.cuts[ c ].y ) {
		let omega = dispersion( kLen );
		let dOmega = dispersionDerivative( kLen );
		let theta = atan2( kz, kx );

		let sa0 = ocean.sysA[ 0 ]; let sb0 = ocean.sysB[ 0 ];
		let sa1 = ocean.sysA[ 1 ]; let sb1 = ocean.sysB[ 1 ];

		let S0 = jonswap( omega, sa0, sb0 ) * directionSpectrum( theta, omega, sa0, sb0 ) * shortWavesFade( kLen, sb0 );
		let S1 = jonswap( omega, sa1, sb1 ) * directionSpectrum( theta, omega, sa1, sb1 ) * shortWavesFade( kLen, sb1 );
		let S = max( S0 + S1, 0.0 );

		// E|h0|^2 = S(k) dk^2 / 2 so that var(height) = sum S(k) dk^2 (h has both +k and -k terms)
		let amp = sqrt( S * abs( dOmega ) / kLen * dk * dk ) * 0.5;

		// gaussian random pair (Box-Muller)
		let seed = u32( idx ) * 4u + ocean.seed * 7919u;
		let u1 = fftToUnit( fftPcg( seed ) );
		let u2 = fftToUnit( fftPcg( seed + 1u ) );
		let r = sqrt( log( u1 ) * -2.0 );
		let g0 = r * cos( u2 * TWO_PI );
		let g1 = r * sin( u2 * TWO_PI );

		outH = vec4f( g0 * amp, g1 * amp, 0.0, 0.0 );
		outW = vec4f( kx, kz, 1.0 / kLen, omega );
	}

	h0[ idx ] = outH;
	waveData[ idx ] = outW;
}`}),this.conjugateKernel=new i({label:`Ocean Conjugate`,bindings:{h0:n(this.h0),tmp:n(this.tmp)},workgroupSize:[16,16,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let x = i32( gid.x ); let y = i32( gid.y ); let c = i32( gid.z );
	let base = c * ${Y*Y};
	let idx = base + y * ${Y} + x;
	let xm = ( ${Y} - x ) % ${Y};
	let ym = ( ${Y} - y ) % ${Y};
	let idxm = base + ym * ${Y} + xm;
	let hm = h0[ idxm ].xy;
	let cur = h0[ idx ].xy;
	tmp[ idx ] = vec4f( cur.x, cur.y, hm.x, - hm.y );
}`}),this.copyH0Kernel=new i({label:`Ocean Copy H0`,bindings:{h0:n(this.h0),tmp:n(this.tmp),foam:n(this.foam)},workgroupSize:[16,16,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let idx = gid.z * ${Y*Y}u + gid.y * ${Y}u + gid.x;
	h0[ idx ] = tmp[ idx ];
	foam[ idx ] = 0.0;
}`});let a=``;for(let e=0;e<ji;e++){let t=1<<e;a+=`
	{
		let pos = t & ${t-1}u;
		let i = ( ( t >> ${e}u ) << ${e+1}u ) | pos;
		let j = i + ${t}u;
		let ang = f32( pos ) * ${(Math.PI/t).toFixed(12)};
		let w = vec2f( cos( ang ), sin( ang ) );
		let i2 = i * 2u; let j2 = j * 2u;
		let a0 = fftShared[ i2 ]; let a1 = fftShared[ i2 + 1u ];
		let b0 = fftCmul2( fftShared[ j2 ], w ); let b1 = fftCmul2( fftShared[ j2 + 1u ], w );
		fftShared[ i2 ] = a0 + b0;
		fftShared[ i2 + 1u ] = a1 + b1;
		fftShared[ j2 ] = a0 - b0;
		fftShared[ j2 + 1u ] = a1 - b1;
		workgroupBarrier();
	}`}let o=`var<workgroup> fftShared: array<vec4f, ${Y*2}>;\n`;if(this.rowKernel=new i({label:`Ocean FFT Rows`,modules:[L],bindings:{...e,h0:n(this.h0),waveData:n(this.waveData),tmp:n(this.tmp)},workgroupSize:[Mi,1,1],code:Ii+o+`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let t = lid.x;
	let row = wid.x;
	let c = wid.y;
	let base = c * ${Y*Y}u + row * ${Y}u;
	let time = ocean.time;

	for ( var e = 0u; e < 2u; e++ ) {
		let x = t + e * FFT_HALF;
		let idx = base + x;
		let w = waveData[ idx ];
		let hv = h0[ idx ];
		let ph = w.w * time;
		let cs = cos( ph ); let sn = sin( ph );

		// h = h0 * e^{i w t} + conj(h0(-k)) * e^{-i w t}
		let hr = hv.x * cs - hv.y * sn + hv.z * cs + hv.w * sn;
		let hi = hv.x * sn + hv.y * cs - hv.z * sn + hv.w * cs;

		let kx = w.x; let kz = w.y; let ik = w.z;
		let fx = kx * ik; let fz = kz * ik;

		// Dx_hat = i kx/k h, Dz_hat = i kz/k h  ->  c0 = Dx + i Dz
		let c0 = vec2f( - ( fx * hi + fz * hr ), fx * hr - fz * hi );
		// c1 = Dy + i dDx/dz,  dDx/dz_hat = -kx kz / k h
		let q = - ( kx * kz * ik );
		let c1 = vec2f( hr - q * hi, hi + q * hr );
		// c2 = dDy/dx + i dDy/dz
		let c2 = vec2f( - ( kx * hi + kz * hr ), kx * hr - kz * hi );
		// c3 = dDx/dx + i dDz/dz
		let a = - ( kx * kx * ik ); let b = - ( kz * kz * ik );
		let c3 = vec2f( a * hr - b * hi, a * hi + b * hr );

		let r = fftBitReverse8( x ) * 2u;
		fftShared[ r ] = vec4f( c0, c1 );
		fftShared[ r + 1u ] = vec4f( c2, c3 );
	}

	workgroupBarrier();
${a}

	for ( var e = 0u; e < 2u; e++ ) {
		let x = t + e * FFT_HALF;
		let o = ( base + x ) * 2u;
		tmp[ o ] = fftShared[ x * 2u ];
		tmp[ o + 1u ] = fftShared[ x * 2u + 1u ];
	}
}`}),this.fusedMips){wr(this,{ComputeKernel:i,commonModule:L,fftCommon:Ii,oceanU:e,limits:t.limits});return}let s=(e,t)=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}});this.columnKernel=new i({label:`Ocean FFT Columns`,modules:[L],bindings:{...e,tmp:n(this.tmp),foam:n(this.foam),mipSrc:n(this.mipSrc),dispOut:s(this.displacementTexture,0),derivOut:s(this.derivativeTexture,0)},workgroupSize:[Mi,1,1],code:Ii+o+`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let t = lid.x;
	let col = wid.x;
	let c = wid.y;
	let base = c * ${Y*Y}u;

	for ( var e = 0u; e < 2u; e++ ) {
		let y = t + e * FFT_HALF;
		let idx = base + y * ${Y}u + col;
		let r = fftBitReverse8( y ) * 2u;
		fftShared[ r ] = tmp[ idx * 2u ];
		fftShared[ r + 1u ] = tmp[ idx * 2u + 1u ];
	}

	workgroupBarrier();
${a}

	let lambda = ocean.choppiness;
	for ( var e = 0u; e < 2u; e++ ) {
		let y = t + e * FFT_HALF;
		let idx = base + y * ${Y}u + col;
		let sign = select( -1.0, 1.0, ( ( col + y ) & 1u ) == 0u );
		let A = fftShared[ y * 2u ] * sign;
		let B = fftShared[ y * 2u + 1u ] * sign;

		let Dx = A.x; let Dz = A.y; let Dy = A.z; let Dxz = A.w;
		let Dyx = B.x; let Dyz = B.y; let Dxx = B.z; let Dzz = B.w;

		let jxx = lambda * Dxx + 1.0;
		let jzz = lambda * Dzz + 1.0;
		let jxz = lambda * Dxz;
		let J = jxx * jzz - jxz * jxz;

		// Persistent foam: generated where the surface compresses (J < bias),
		// then slowly decays so whitecaps leave trailing foam patches.
		let prev = foam[ idx ];
		let gen = sat( ( ocean.foamBias - J ) * ocean.foamGain );
		let f = prev * exp( - ocean.foamDecay * frame.dt ) + gen * ocean.foamAdd * frame.dt;
		let fNew = clamp( max( f, gen * 0.5 ), 0.0, 1.5 );
		foam[ idx ] = fNew;

		let uv = vec2u( col, y );
		let vDisp = vec4f( lambda * Dx, Dy, lambda * Dz, fNew );
		let vDeriv = vec4f( Dyx, Dyz, lambda * Dxx, lambda * Dzz );
		textureStore( dispOut, uv, c, vDisp );
		textureStore( derivOut, uv, c, vDeriv );
		mipSrc[ idx * 2u ] = vDisp;
		mipSrc[ idx * 2u + 1u ] = vDeriv;
	}
}`});let c=(e,t,n,r,i)=>{let a=n*2,o=``;return t?o=`${t}[ ly * ${n}u + lx ] = v;`:r===5&&(o=`mipMid[ ( c * 64u + gy * 8u + gx ) * 2u + ${i}u ] = v;`),`
	if ( lx < ${n}u && ly < ${n}u ) {
		let i = ly * ${2*a}u + lx * 2u;
		let v = ( ${e}[ i ] + ${e}[ i + 1u ] + ${e}[ i + ${a}u ] + ${e}[ i + ${a+1}u ] ) * 0.25;
		textureStore( out${r}, vec2u( gx * ${n}u + lx, gy * ${n}u + ly ), c, v );
		${o}
	}`},l=(e,t)=>new i({label:`Ocean Mips A`,bindings:{mipSrc:n(this.mipSrc),mipMid:n(this.mipMid),out1:s(e,1),out2:s(e,2),out3:s(e,3),out4:s(e,4),out5:s(e,5)},workgroupSize:[16,16,1],code:`
var<workgroup> s1: array<vec4f, 256>;
var<workgroup> s2: array<vec4f, 64>;
var<workgroup> s3: array<vec4f, 16>;
var<workgroup> s4: array<vec4f, 4>;
fn src( c: u32, x: u32, y: u32 ) -> vec4f { return mipSrc[ ( c * ${Y*Y}u + y * ${Y}u + x ) * 2u + ${t}u ]; }
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y;
	let gx = wid.x; let gy = wid.y; let c = wid.z;
	let x1 = gx * 16u + lx; let y1 = gy * 16u + ly;
	let x0 = x1 * 2u; let y0 = y1 * 2u;
	let v1 = ( src( c, x0, y0 ) + src( c, x0 + 1u, y0 ) + src( c, x0, y0 + 1u ) + src( c, x0 + 1u, y0 + 1u ) ) * 0.25;
	textureStore( out1, vec2u( x1, y1 ), c, v1 );
	s1[ ly * 16u + lx ] = v1;
	workgroupBarrier();
${c(`s1`,`s2`,8,2,t)}
	workgroupBarrier();
${c(`s2`,`s3`,4,3,t)}
	workgroupBarrier();
${c(`s3`,`s4`,2,4,t)}
	workgroupBarrier();
${c(`s4`,null,1,5,t)}
}`}),u=(e,t)=>new i({label:`Ocean Mips B`,bindings:{mipMid:n(this.mipMid),out6:s(e,6),out7:s(e,7),out8:s(e,8)},workgroupSize:[8,8,1],code:`
var<workgroup> s5: array<vec4f, 64>;
var<workgroup> s6: array<vec4f, 16>;
var<workgroup> s7: array<vec4f, 4>;
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y; let c = wid.z;
	let gx = 0u; let gy = 0u;
	s5[ ly * 8u + lx ] = mipMid[ ( c * 64u + ly * 8u + lx ) * 2u + ${t}u ];
	workgroupBarrier();
${c(`s5`,`s6`,4,6,t)}
	workgroupBarrier();
${c(`s6`,`s7`,2,7,t)}
	workgroupBarrier();
${c(`s7`,null,1,8,t)}
}`});this.mipKernelsA=this.derivativeOnly?[l(this.derivativeTexture,1)]:[l(this.displacementTexture,0),l(this.derivativeTexture,1)],this.mipKernelsB=this.derivativeOnly?[u(this.derivativeTexture,1)]:[u(this.displacementTexture,0),u(this.derivativeTexture,1)]}update(e){let n=this.derivativeOnly?2:this.cascades;if(this.needsSpectrum){this.needsSpectrum=!1;let e=[Y/16,Y/16,n];this.initSpectrumKernel.dispatch(e),this.conjugateKernel.dispatch(e),this.copyH0Kernel.dispatch(e)}this.time.value+=e*this.timeScale,t.computePass(`Ocean FFT`,e=>{this.rowKernel.dispatch([Y,n,1],{pass:e}),this.columnKernel.dispatch([this.fusedMips?Y/2:Y,n,1],{pass:e});for(let t of this.mipKernelsA)t.dispatch([Y/32,Y/32,n],{pass:e});for(let t of this.mipKernelsB)t.dispatch([1,1,n],{pass:e})},this.timestampWrites||void 0)}sampleDisplacement(e,t=null,n=null){let r=[];for(let i=0;i<this.cascades;i++){let a=`textureSampleLevel( oceanDisplacement, smpLinearRepeat, ( ${e} ) / ocean.sizes[ ${i} ].x, ${i}, ${t??`0.0`} ).xyz`;n&&(a+=` * ( ${n[i]} )`),r.push(a)}return`( `+r.join(` + `)+` )`}},Ri=6;new F({name:`whaleWater`,uniforms:new Ze(`WhaleMarks`,{marks:[`vec4f[${Ri}]`,Array(Ri).fill(0).map(()=>new R(0,0,1,0))]},{label:`whaleMarks`}),uniformName:`whaleMarks`,code:`
fn whaleWater( xz: vec2f ) -> vec2f {
	var foam = 0.0; var slick = 0.0;
	for ( var i = 0; i < ${Ri}; i++ ) {
		let e = whaleMarks.marks[ i ];
		let d = length( xz - e.xy ) / e.z;
		// (outside a mark, or an unused one, core or the amounts are 0)
		if ( d >= 1.0 || e.w == 0.0 ) { continue; }
		let core = 1.0 - smoothstep( 0.2, 1.0, d );
		// churned water breaks up into lumps and streaks with dark water between them, denser
		// toward the middle
		let q = xz * 0.8; let q2 = xz * 2.9;
		let n1 = sin( q.x + sin( q.y * 1.3 ) * 1.7 ) * sin( q.y * 1.1 + sin( q.x * 1.7 ) * 1.4 );
		let n2 = sin( q2.x * 1.1 + sin( q2.y ) * 1.3 ) * sin( q2.y * 0.9 + sin( q2.x * 1.2 ) );
		let lumps = smoothstep( -0.25, 0.55, n1 * 0.7 + n2 * 0.45 + ( 1.0 - d ) * 0.5 );
		foam = max( foam, core * max( e.w, 0.0 ) * lumps * 0.85 );
		slick = max( slick, core * max( - e.w, 0.0 ) );
	}
	return vec2f( foam, slick );
}
`}),new l,new l;var zi={left:.15,right:.15,bottom:.6,top:0},Bi={cx:(zi.right-zi.left)/2,cy:(zi.top-zi.bottom)/2,sx:1+(zi.left+zi.right)/2,sy:1+(zi.top+zi.bottom)/2};new v().set(1/Bi.sx,0,0,-Bi.cx/Bi.sx,0,1/Bi.sy,0,-Bi.cy/Bi.sy,0,0,1,0,0,0,0,1),new v,new V,new l;var Vi=new F({name:`waterFresnel`,deps:[L],code:`
fn fresnelDielectric( cosI: f32, eta: f32 ) -> f32 {
	let c = clamp( cosI, 0.0, 1.0 );
	let g2 = eta * eta - 1.0 + c * c;
	let tir = g2 < 0.0;
	let g = sqrt( max( g2, 0.0 ) );
	let a = ( g - c ) / ( g + c );
	let b = ( c * ( g + c ) - 1.0 ) / ( c * ( g - c ) + 1.0 );
	return select( 0.5 * ( a * a ) * ( b * b + 1.0 ), 1.0, tir );
}

fn waterPhaseHG( cosT: f32, g: f32 ) -> f32 {
	let g2 = g * g;
	return ( ( 1.0 - g2 ) / ( 4.0 * PI ) ) / pow( max( 1.0 + g2 - cosT * 2.0 * g, 1e-4 ), 1.5 );
}

fn viewPositionFromViewZ( uv: vec2f, viewZ: f32 ) -> vec3f {
	let ndc = vec2f( uv.x * 2.0 - 1.0, ( 1.0 - uv.y ) * 2.0 - 1.0 );
	let p00 = frame.proj[ 0 ][ 0 ];
	let p11 = frame.proj[ 1 ][ 1 ];
	return vec3f( ndc.x / p00, ndc.y / p11, -1.0 ) * ( - viewZ );
}
`}),Hi=Bi,Ui=e=>e.toFixed(6),Wi=`
// a refracted sample is usable when it lies this far behind the water surface (view depth, m): objects in
// front of it (the hull you stand in, pier piles) are rejected
const WATER_BEHIND: f32 = 0.05;
// screen NDC -> uv in the refraction image, which extends past the screen (RefractionPass guard band)
fn _waterRefrUV( ndc: vec2f ) -> vec2f {
	let n = ( ndc - vec2f( ${Ui(Hi.cx)}, ${Ui(Hi.cy)} ) ) / vec2f( ${Ui(Hi.sx)}, ${Ui(Hi.sy)} );
	return clamp( vec2f( n.x * 0.5 + 0.5, 0.5 - n.y * 0.5 ), vec2f( 0.0005 ), vec2f( 0.9995 ) );
}
fn _waterDGGX( NdH: f32, a2: f32 ) -> f32 {
	let d = NdH * NdH * ( a2 - 1.0 ) + 1.0;
	return a2 / ( d * d * PI );
}
fn _waterVSmithGGX( NdL: f32, NdV: f32, a2: f32 ) -> f32 {
	let gv = NdL * sqrt( NdV * NdV * ( 1.0 - a2 ) + a2 );
	let gl = NdV * sqrt( NdL * NdL * ( 1.0 - a2 ) + a2 );
	return 0.5 / max( gv + gl, 1e-5 );
}
// depth via exact texel loads (float depth textures + filtering samplers are unreliable)
fn _waterSceneDepthAt( uv: vec2f ) -> f32 {
	let size = vec2f( textureDimensions( waterSceneDepth ) );
	let p = vec2i( clamp( uv, vec2f( 0.0 ), vec2f( 0.9999 ) ) * size );
	return textureLoad( waterSceneDepth, p, 0 ).x;
}
// linear view Z of the opaque scene for the reflection march (half float copy: the march is
// bandwidth bound and its thickness tests allow centimetres)
fn _waterSceneZAt( uv: vec2f ) -> f32 {
#if WATER_DEPTH_HALF
	let size = vec2f( textureDimensions( waterSceneDepthHalf ) );
	return - viewDepth( textureLoad( waterSceneDepthHalf, vec2i( clamp( uv, vec2f( 0.0 ), vec2f( 0.9999 ) ) * size ), 0 ).x );
#else
	return - viewDepth( _waterSceneDepthAt( uv ) );
#endif
}
fn _waterProject( p: vec3f ) -> vec2f {
	let clip = frame.proj * vec4f( p, 1.0 );
	let ndc = clip.xy / max( clip.w, 1e-4 );
	return vec2f( ndc.x * 0.5 + 0.5, ndc.y * -0.5 + 0.5 );
}

// --------------------------------------------------------------- screen-space reflection
// March the reflected ray through the opaque depth copy (view space, geometric steps, then a
// short bisection). Returns ( color, weight ): weight fades at screen edges, for rays heading
// back toward the camera and at the end of the search range.
// y0, ry: world height of the start and the ray's rise per metre. A hit beyond 260 m, or below the
// water on a descending ray, is weighted 0, so the march stops once the last miss is there.
fn _waterSSR( posV: vec3f, Rv: vec3f, y0: f32, ry: f32 ) -> vec4f {
	var hit = false;
	// steps grow with the distance: far away the first ones would all land in the same pixel
	let stepScale = max( - posV.z / 60.0, 1.0 );
	var t = 0.15 * stepScale;
	var dt = 0.25 * stepScale;
	var prevT = 0.0;
	for ( var i = 0; i < 11; i++ ) {
		prevT = t;
		if ( prevT >= 260.0 || ( ry <= 0.0 && y0 + ry * prevT < frame.seaLevel - 0.2 ) ) { break; }
		t += dt;
		dt *= 1.7;
		let p = posV + Rv * t;
		let uv = _waterProject( p );
		if ( uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0 || p.z > -0.1 ) { break; }
		let sz = _waterSceneZAt( uv );
		// behind the visible surface, within a thickness covering the last step
		if ( p.z < sz && sz - p.z < max( dt * 1.3, max( t * 0.08, 0.3 ) ) ) {
			hit = true;
			break;
		}
	}

	var color = vec3f( 0.0 );
	var weight = 0.0;
	if ( hit ) {
		// refine between the last miss and the hit
		var a = prevT; var b = t;
		for ( var k = 0; k < 3; k++ ) {
			let m = ( a + b ) * 0.5;
			let p = posV + Rv * m;
			let behind = p.z < _waterSceneZAt( _waterProject( p ) );
			b = select( b, m, behind );
			a = select( m, a, behind );
		}
		let hitT = b;
		let hitV = posV + Rv * b;
		let uv = _waterProject( hitV );
		// after refining, the ray must really touch the surface there (a ray that only passed far
		// behind a thin or distant object is a false hit)
		let gap = abs( _waterSceneZAt( uv ) - hitV.z );
		let touch = smoothstep( max( b * 0.04, 0.4 ), max( b * 0.02, 0.2 ), gap );
		// anything under the surface (seabed seen through the water, submerged hull) is not
		// visible to a reflected ray: those rays run into the next wave instead
		let hitY = ( frame.invView * vec4f( hitV, 1.0 ) ).y;
		color = textureSampleLevel( waterSceneColor, smpLinearClamp, uv, 0.0 ).rgb;
		let edge = smoothstep( 0.0, 0.06, uv.x ) * smoothstep( 1.0, 0.94, uv.x ) * smoothstep( 0.0, 0.06, uv.y ) * smoothstep( 1.0, 0.94, uv.y );
		let facing = smoothstep( 0.5, 0.1, Rv.z ); // rays toward the camera leave the screen
		weight = edge * facing * touch * smoothstep( 260.0, 120.0, hitT ) * smoothstep( frame.seaLevel - 0.15, frame.seaLevel + 0.35, hitY );
	}
	return vec4f( color, weight );
}
`;new F({name:`waterHelpers`,deps:[L],code:Wi});var Gi=9.81,Ki=1025,qi=3,Ji=Object.freeze([[.18,11,.55,.3],[.1,7.3,.95,1.7],[.065,4.6,-.35,3.2],[.035,2.8,1.4,4.1]].map(([e,t,n,r])=>{let i=2*Math.PI/t,a=Math.exp(-2*i*W.depth);return Object.freeze({amplitude:e,k:i,x:Math.cos(n),z:Math.sin(n),phase:r,mirrorDepth:a,inverseDepth:1/(1-a),omega:Math.sqrt(Gi*i*Math.tanh(i*W.depth))})}));function Yi(e){let t=Math.max(0,Math.min(1,(W.halfSize-Math.abs(e))/qi));return[t*t*(3-2*t),t>0&&t<1?-Math.sign(e)*6*t*(1-t)/qi:0]}var Xi=class{constructor({strength:e=1}={}){this.strength=e}get strength(){return this._strength}set strength(e){if(!Number.isFinite(e)||e<0||e>2)throw RangeError(`Wave strength must be between 0 and 2`);this._strength=e}get maxHeight(){return Ji.reduce((e,t)=>e+t.amplitude,0)*this.strength}sample(e,t,n,r=W.surface,i={}){if(i.height=i.gradientX=i.gradientZ=i.verticalSpeed=0,i.velocityX=i.velocityY=i.velocityZ=0,!_r(e,t))return i.wet=!1,i;i.wet=!0;let[a,o]=Yi(e),[s,c]=Yi(t),l=a*s,u=0,d=0,f=0,p=Math.max(-W.depth,Math.min(0,r));for(let r of Ji){let a=r.k*(e*r.x+t*r.z)-r.omega*n+r.phase,o=Math.cos(a),s=Math.sin(a),c=r.amplitude*this.strength;u+=c*o,d-=c*r.k*r.x*s,f-=c*r.k*r.z*s,i.verticalSpeed+=c*r.omega*s*l;let m=Math.exp(r.k*p),h=r.mirrorDepth/m,g=c*r.omega*o*(m+h)*r.inverseDepth,_=c*r.omega*s*(m-h)*r.inverseDepth,v=c*c*r.omega*r.k*m*m;i.velocityX+=(g+v)*r.x*l,i.velocityY+=_*l,i.velocityZ+=(g+v)*r.z*l}return i.height=u*l,i.gradientX=d*l+u*o*s,i.gradientZ=f*l+u*a*c,i}},X=e=>Number(e).toFixed(9),Zi=`
fn waveEdge(p: f32) -> vec2f {
  let q = clamp((${X(W.halfSize)} - abs(p)) / ${X(qi)}, 0.0, 1.0);
  let derivative = select(0.0, -sign(p) * 6.0 * q * (1.0 - q) / ${X(qi)}, q > 0.0 && q < 1.0);
  return vec2f(q * q * (3.0 - 2.0 * q), derivative);
}
// Height, d(height)/dx, d(height)/dz, vertical surface speed.
fn waveSampleAt(p: vec2f, time: f32) -> vec4f {
  if (any(abs(p) > vec2f(${X(W.halfSize)}))) { return vec4f(0.0); }
  let ex = waveEdge(p.x); let ez = waveEdge(p.y);
  var sum = vec4f(0.0);
  ${Ji.map(e=>`{
    let phase = ${X(e.k)} * dot(p, vec2f(${X(e.x)}, ${X(e.z)})) - ${X(e.omega)} * time + ${X(e.phase)};
    let a = ${X(e.amplitude)} * waves.strength;
    sum += vec4f(a * cos(phase), -a * ${X(e.k*e.x)} * sin(phase), -a * ${X(e.k*e.z)} * sin(phase), a * ${X(e.omega)} * sin(phase));
  }`).join(`
`)}
  let envelope = ex.x * ez.x;
  return vec4f(sum.x * envelope, sum.y * envelope + sum.x * ex.y * ez.x,
    sum.z * envelope + sum.x * ex.x * ez.y, sum.w * envelope);
}
fn waveSample(p: vec2f) -> vec4f { return waveSampleAt(p, waves.time); }
`,Qi=1/120,$i=(e,t,n)=>Math.max(t,Math.min(n,e)),ea=e=>Array.isArray(e)?new l(...e):e.clone(),ta=(e,t)=>{if(!Number.isFinite(e)||e<=0)throw RangeError(t+` must be positive and finite`);return e};function na(e){e.updateWorldMatrix(!0,!0);let t=e.matrixWorld.clone().invert(),n=new V,r=new l;return e.traverse(i=>{let a=i.geometry;if(!a)return;a.boundingBox||a.computeBoundingBox();let o=a.boundingBox;for(let a of[o.min.x,o.max.x])for(let s of[o.min.y,o.max.y])for(let c of[o.min.z,o.max.z])r.set(a,s,c).applyMatrix4(i.matrixWorld).applyMatrix4(t).multiply(e.scale),n.expandByPoint(r)}),n}var ra=class{constructor(e,{dimensions:t,mass:n,density:r=550,samples:i,centerOfMass:a,displacementCenter:s,drag:c=1.1,inertia:u}={}){if(!e?.position||!e?.quaternion)throw TypeError(`A buoyant object needs position and quaternion transforms`);if(e.parent)throw TypeError(`Register an unparented object; the water map owns its world transform`);this.object=e;let d=na(e);this.dimensions=t?ea(t):d.getSize(new l),this.displacementCenter=s?ea(s):d.getCenter(new l);for(let e of[`x`,`y`,`z`])ta(this.dimensions[e],`Object dimension`);if(this.centerOfMass=a?ea(a):this.displacementCenter.clone(),![...this.displacementCenter.toArray(),...e.position.toArray(),...e.quaternion.toArray()].every(Number.isFinite))throw TypeError(`Invalid object transform`);if(!this.centerOfMass.toArray().every(Number.isFinite))throw TypeError(`Invalid center of mass`);let f=this.dimensions,p=f.clone().multiplyScalar(1/3);if(this.samples=i?i.map(e=>({position:ea(e.position),volume:ta(e.volume,`Sample volume`),halfSize:e.halfSize?ea(e.halfSize):new l(Math.cbrt(e.volume)/2,Math.cbrt(e.volume)/2,Math.cbrt(e.volume)/2)})):[],!i)for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++)for(let n=-1;n<=1;n++)this.samples.push({position:new l(e*p.x,t*p.y,n*p.z).add(this.displacementCenter),volume:p.x*p.y*p.z,halfSize:p.clone().multiplyScalar(.5)});if(!this.samples.length)throw TypeError(`Buoyancy requires displacement samples`);for(let e of this.samples){if(!e.position.toArray().every(Number.isFinite))throw TypeError(`Invalid displacement position`);for(let t of[`x`,`y`,`z`])ta(e.halfSize[t],`Sample half size`);e.area=e.volume**(2/3)}this.volume=this.samples.reduce((e,t)=>e+t.volume,0),this.mass=ta(n??ta(r,`Density`)*this.volume,`Mass`),this.drag=ta(c,`Drag`),this.inertia=u?ea(u):new l(this.mass*(f.y*f.y+f.z*f.z)/12,this.mass*(f.x*f.x+f.z*f.z)/12,this.mass*(f.x*f.x+f.y*f.y)/12);for(let e of[`x`,`y`,`z`])ta(this.inertia[e],`Inertia`);this.velocity=new l,this.angularVelocity=new l,this.submergedVolume=0,this.buoyancyForce=0,this._r=new l,this._p=new l,this._force=new l,this._total=new l,this._torque=new l,this._relative=new l,this._pointVelocity=new l,this._inverse=new o,this._rotation=new o,this._x=new l,this._y=new l,this._z=new l,this._comOffset=new l,this._sample={}}step(e,t,n){let r=this.object.quaternion,i=this.object.position;this._x.set(1,0,0).applyQuaternion(r),this._y.set(0,1,0).applyQuaternion(r),this._z.set(0,0,1).applyQuaternion(r),this._comOffset.copy(this.centerOfMass).applyQuaternion(r),this._total.set(0,-this.mass*Gi,0),this._torque.set(0,0,0),this.submergedVolume=0;for(let n of this.samples){let r=n.position;this._p.copy(this._x).multiplyScalar(r.x).addScaledVector(this._y,r.y).addScaledVector(this._z,r.z),this._r.copy(this._p).sub(this._comOffset),this._p.add(i);let a=e.sample(this._p.x,this._p.z,t,this._p.y,this._sample);if(!a.wet)continue;let o=n.halfSize,s=Math.abs(this._x.y)*o.x+Math.abs(this._y.y)*o.y+Math.abs(this._z.y)*o.z,c=$i((a.height-this._p.y+s)/(2*s),0,1);if(!c)continue;let l=n.volume*c;this.submergedVolume+=l,this._force.set(0,Ki*Gi*l,0),this._pointVelocity.crossVectors(this.angularVelocity,this._r).add(this.velocity),this._relative.set(this._pointVelocity.x-a.velocityX,this._pointVelocity.y-a.velocityY,this._pointVelocity.z-a.velocityZ);let u=n.area*c,d=.5*Ki*this.drag*u*(.15+this._relative.length());this._force.addScaledVector(this._relative,-d),this._total.add(this._force),this._torque.add(this._pointVelocity.crossVectors(this._r,this._force))}this.buoyancyForce=Ki*Gi*this.submergedVolume;let a=this.mass+Ki*this.submergedVolume*.25;this.velocity.addScaledVector(this._total,n/a);let o=this._p.copy(this.centerOfMass).applyQuaternion(r).add(i);o.addScaledVector(this.velocity,n),this._inverse.copy(r).invert(),this._torque.applyQuaternion(this._inverse),this._relative.copy(this.angularVelocity).applyQuaternion(this._inverse),this._pointVelocity.copy(this._relative).multiply(this.inertia),this._force.crossVectors(this._relative,this._pointVelocity),this._torque.sub(this._force);let s=1+.3*this.submergedVolume/this.volume;this._torque.x/=this.inertia.x*s,this._torque.y/=this.inertia.y*s,this._torque.z/=this.inertia.z*s,this._torque.applyQuaternion(r),this.angularVelocity.addScaledVector(this._torque,n).multiplyScalar(Math.exp(-n*.08));let c=this.angularVelocity.length();c>0&&(this._rotation.setFromAxisAngle(this._torque.copy(this.angularVelocity).multiplyScalar(1/c),c*n),r.premultiply(this._rotation).normalize()),i.copy(o).sub(this._r.copy(this.centerOfMass).applyQuaternion(r)),this._x.set(1,0,0).applyQuaternion(r),this._y.set(0,1,0).applyQuaternion(r),this._z.set(0,0,1).applyQuaternion(r);let l=this.dimensions,u=e=>(Math.abs(this._x[e])*l.x+Math.abs(this._y[e])*l.y+Math.abs(this._z[e])*l.z)/2,d=this._p.copy(this.displacementCenter).applyQuaternion(r).add(i);d.y-u(`y`)<W.bottom&&(i.y+=W.bottom+u(`y`)-d.y,this.velocity.y=Math.max(0,this.velocity.y),this.angularVelocity.multiplyScalar(.98));for(let e of[`x`,`z`]){let t=Math.max(0,W.halfSize-u(e)),n=$i(d[e],-t,t);n!==d[e]&&(i[e]+=n-d[e],this.velocity[e]*=-.15)}}},ia=class{constructor(e){this.field=e,this.bodies=new Set,this.time=0,this._accumulator=0}add(e,t){let n=new ra(e,t);return this.bodies.add(n),n}remove(e){return this.bodies.delete(e)}update(e){if(!Number.isFinite(e)||e<0||e>.25)throw RangeError(`Simulation timestep must be between 0 and .25 seconds`);for(this._accumulator+=e;this._accumulator+1e-10>=Qi;){this.time+=Qi;for(let e of this.bodies)e.step(this.field,this.time,Qi);this._accumulator=Math.max(0,this._accumulator-Qi)}}},aa=class extends Oi{constructor(){super({size:1024,splits:[500],lightMargin:30,normalBias:[.018],bias:3e-5,pcssCascades:0}),this.setSun(38,50)}setSun(e,t=this.azimuth){if(!Number.isFinite(e)||e<5||e>85||!Number.isFinite(t))throw RangeError(`Sun elevation must be 5–85 degrees`);this.elevation=e,this.azimuth=t;let n=e*Math.PI/180,r=t*Math.PI/180;Gn.sunDir.value.set(Math.sin(r)*Math.cos(n),Math.sin(n),Math.cos(r)*Math.cos(n));let i=Math.max(0,(35-e)/30);Gn.sunColor.value.setRGB(2.75,2.6-i*.65,2.38-i*1.05),Gn.skyIrradiance.value.setRGB(.31,.37,.43),Gn.horizonColor.value.setRGB(.62,.65,.66),Gn.envIntensity.value=.9}_fit(e,t,n){let r=this.cascades[e],i=r.camera,a=new l(0,2,0),o=a.clone().addScaledVector(n,60);i.matrixWorld.lookAt(o,a,new l(0,1,0)).setPosition(o),i.matrixWorldInverse.copy(i.matrixWorld).invert(),i.near=.1,i.far=120,Ai(i.projectionMatrix,-36,36,36,-36,i.near,i.far),r.viewProj.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),wn.fields.matrices.value[e]=r.viewProj.clone(),wn.fields.cascades.value[e]=new R(500,72/this.size,.018,i.far-i.near),wn.fields.blend.value[e]=new R(0,500,0,0)}},oa=(e,t)=>{let n=0,r=1;for(;e>0;)r/=t,n+=e%t*r,e=Math.floor(e/t);return n},sa=class{constructor({enabled:e=!0,sampleScale:n=1.5}={}){this.enabled=e,this.sampleScale=n,this.current=new li(1,1,{colors:[`rgba16float`,`rgba16float`,`rg16float`,`rgba16float`],label:`Water AA color motion depth stable fluid`}),this.history=[0,1].map(e=>new li(1,1,{colors:[`rgba16float`,`rg16float`],label:`Water AA history ${e}`})),this.index=0,this.frame=0,this.needsReset=!0,this.previousView=new v,this.previousViewProj=new v,this.uniforms=new Ze(`WaterAA`,{previousView:[`mat4x4f`,new v],previousViewProj:[`mat4x4f`,new v],inverseStableViewProj:[`mat4x4f`,new v],jitter:[`vec2f`,new P],previousTime:[`f32`,0],reset:[`f32`,1],enabled:[`f32`,+!!e]}),this.stats={enabled:e,phases:16,resets:0,frames:0},this.resolve=[0,1].map(e=>new gr({label:`Water motion-aware temporal resolve`,colorFormats:[`rgba16float`,`rg16float`],bindings:{aa:{uniform:this.uniforms},currentColor:{texture:this.current.textures[0]},currentMotion:{texture:this.current.textures[1]},currentInfo:{texture:this.current.textures[2]},stableFluid:{texture:this.current.textures[3]},historyColor:{texture:this.history[e].textures[0]},historyInfo:{texture:this.history[e].textures[1]}},code:`
fn compressed(c: vec3f) -> vec3f { return max(c, vec3f(0.0)) / (1.0 + max(max(c.r, c.g), c.b)); }
fn expanded(c: vec3f) -> vec3f { return c / max(.0001, 1.0 - max(max(c.r, c.g), c.b)); }
fn toYCoCg(c: vec3f) -> vec3f { return vec3f(dot(c, vec3f(.25,.5,.25)), (c.r-c.b)*.5, (-c.r+2.0*c.g-c.b)*.25); }
fn fromYCoCg(c: vec3f) -> vec3f { return vec3f(c.x+c.y-c.z, c.x+c.z, c.x-c.y-c.z); }
fn cubic(x0: f32) -> f32 {
  let x = abs(x0);
  if (x < 1.0) { return 1.5*x*x*x - 2.5*x*x + 1.0; }
  if (x < 2.0) { return -.5*x*x*x + 2.5*x*x - 4.0*x + 2.0; }
  return 0.0;
}
// Five bilinear taps reconstruct a Catmull-Rom history without repeated blur.
fn sampleHistory(uv: vec2f) -> vec4f {
  let size = vec2f(textureDimensions(historyColor));
  let p = uv*size; let base = floor(p-.5)+.5; let f = p-base;
  let w0 = f*(-.5+f*(1.0-.5*f));
  let w1 = 1.0+f*f*(-2.5+1.5*f);
  let w2 = f*(.5+f*(2.0-1.5*f));
  let w3 = f*f*(-.5+.5*f); let middle = w1+w2;
  let center = (base+w2/middle)/size;
  var color = textureSampleLevel(historyColor,smpLinearClamp,center,0.0)*middle.x*middle.y;
  color += textureSampleLevel(historyColor,smpLinearClamp,vec2f((base.x-1.0)/size.x,center.y),0.0)*w0.x*middle.y;
  color += textureSampleLevel(historyColor,smpLinearClamp,vec2f((base.x+2.0)/size.x,center.y),0.0)*w3.x*middle.y;
  color += textureSampleLevel(historyColor,smpLinearClamp,vec2f(center.x,(base.y-1.0)/size.y),0.0)*middle.x*w0.y;
  color += textureSampleLevel(historyColor,smpLinearClamp,vec2f(center.x,(base.y+2.0)/size.y),0.0)*middle.x*w3.y;
  return color / max(.001, middle.x*middle.y+(w0.x+w3.x)*middle.y+(w0.y+w3.y)*middle.x);
}
struct AAOut { @location(0) color: vec4f, @location(1) info: vec4f };
@fragment fn fs(in: FSIn) -> AAOut {
  let size = vec2i(textureDimensions(currentColor)); let sf = vec2f(size);
  let p = in.uv*sf-aa.jitter;
  let center = vec2i(floor(p));
  var lo = vec3f(1e5); var hi = vec3f(-1e5); var sum = vec3f(0.0); var sum2 = vec3f(0.0);
  var closest = vec4f(1e5,0.0,0.0,0.0); var motion = vec4f(0.0);
  var foregroundMin=1e5; var foregroundMax=0.0;
  // Foreground dilation preserves narrow railings when the camera or hull moves.
  for (var y=-1; y<=1; y++) { for (var x=-1; x<=1; x++) {
    let q = clamp(center+vec2i(x,y),vec2i(0),size-1);
    let c = toYCoCg(compressed(textureLoad(currentColor,q,0).rgb));
    lo=min(lo,c); hi=max(hi,c); sum+=c; sum2+=c*c;
    let info=textureLoad(currentInfo,q,0);
    if (info.y==1.0) { foregroundMin=min(foregroundMin,info.x); foregroundMax=max(foregroundMax,info.x); }
    if (info.x < closest.x) { closest=info; motion=textureLoad(currentMotion,q,0); }
  } }
  if (closest.y==2.0) {
    // A stable, unjittered spatial resolve for independently moving optical
    // features. History from a previous wave/glint cannot form a trailing image.
    let inverseSize=1.0/vec2f(textureDimensions(historyColor));
    var fluid=vec3f(0.0);
    for (var i=0;i<4;i++) {
      let offset=(vec2f(f32(i%2),f32(i/2))-.5)*.5;
      fluid+=textureSampleLevel(stableFluid,smpLinearClamp,in.uv+offset*inverseSize,0.0).rgb;
    }
    return AAOut(vec4f(fluid*.25,1.0),closest);
  }
  // Integrate the output pixel footprint instead of sharply reconstructing a
  // point from a denser grid. This prevents phase-dependent edge ringing.
  let inverseOutput=1.0/vec2f(textureDimensions(historyColor));
  var reconstructed=vec3f(0.0);
  for (var i=0;i<4;i++) {
    let offset=(vec2f(f32(i%2),f32(i/2))-.5)*.5;
    reconstructed+=textureSampleLevel(currentColor,smpLinearClamp,in.uv-aa.jitter/sf+offset*inverseOutput,0.0).rgb*.25;
  }
  let current=clamp(toYCoCg(compressed(max(reconstructed,vec3f(0.0)))),lo,hi);
  let historyUV=in.uv-motion.xy;
  let prevInfo=textureSampleLevel(historyInfo,smpNearestClamp,historyUV,0.0);
  // Neighbourhood dilation represents a pixel footprint on sloping surfaces.
  // Account for its depth extent without accepting an unrelated distant hull.
  let extentDepth=max(0.0,foregroundMax-foregroundMin);
  let tolerance=max(.06,motion.z*.004+min(motion.z*.04,extentDepth));
  let valid=aa.reset<.5 && all(historyUV>vec2f(0.0)) && all(historyUV<vec2f(1.0))
    && abs(prevInfo.y-closest.y)<.1 && abs(prevInfo.x-motion.z)<tolerance;
  let old=sampleHistory(historyUV);
  let oldColor=toYCoCg(compressed(max(old.rgb,vec3f(0.0))));
  let mean=sum/9.0; let sigma=sqrt(max(sum2/9.0-mean*mean,vec3f(0.0)));
  let speed=length(motion.xy*vec2f(textureDimensions(historyColor)));
  let boundary=textureLoad(currentInfo,clamp(center,vec2i(0),size-1),0).y!=closest.y;
  let reactive=clamp(max(motion.w,select(0.0,.6,boundary)),0.0,1.0);
  let gamma=mix(2.0,1.25,max(reactive,smoothstep(0.5,12.0,speed)));
  let boxLo=max(lo,mean-gamma*sigma-.002); let boxHi=min(hi,mean+gamma*sigma+.002);
  let boxCenter=(boxHi+boxLo)*.5; let extent=max((boxHi-boxLo)*.5,vec3f(.0001));
  let delta=oldColor-boxCenter;
  let ratio=abs(delta)/extent; let clip=max(1.0,max(max(ratio.x,ratio.y),ratio.z));
  let history=boxCenter+delta/clip;
  // Reflections and changing glints have different motion from the hull.
  // Cap their history, and abandon stale lighting rather than leaving trails.
  let limit=mix(16.0,3.0,reactive);
  let age=min(max(1.0,old.a),mix(limit,min(limit,5.0),smoothstep(2.0,16.0,speed)));
  let shadingChange=abs(history.x-current.x);
  var weight=age/(age+1.0);
  weight=min(weight,mix(.94,.55,reactive));
  weight*=1.0-smoothstep(.08,.30,shadingChange)*.8;
  weight*=1.0-smoothstep(1.0,4.0,clip)*.35;
  if (!valid) { weight=0.0; }
  var out: AAOut;
  out.color=vec4f(max(expanded(max(fromYCoCg(mix(current,history,weight)),vec3f(0.0))),vec3f(0.0)),select(1.0,min(age+1.0,limit),valid));
  out.info=closest;
  return out;
}
`})),this.present=new gr({label:`Water AA display`,bindings:{color:{texture:()=>this.enabled?this.history[this.index].texture:this.current.texture}},code:`fn fragment(in: FSIn) -> vec4f { return vec4f(linearToSrgb(max(textureSampleLevel(color,smpLinearClamp,in.uv,0.0).rgb,vec3f(0.0))),1.0); }`,colorFormats:[t.format]})}reset(){this.needsReset=!0}begin(e,t,n,r){let i=this.enabled?Math.max(1,Math.min(this.sampleScale,Math.sqrt(4e6/(t*n)))):1;this.current.setSize(Math.ceil(t*i),Math.ceil(n*i))&&this.reset(),this.history[0].setSize(t,n)&&this.reset(),this.history[1].setSize(t,n),e.updateMatrixWorld(),e.matrixWorldInverse.copy(e.matrixWorld).invert();let a=e.matrixWorld.elements;if(this.uniforms.set(`inverseStableViewProj`,new v().multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse).invert()),this.cameraState){let t=this.cameraState,n=Math.hypot(a[12]-t[0],a[13]-t[1],a[14]-t[2]),i=Math.hypot(a[8]-t[3],a[9]-t[4],a[10]-t[5]);(n>5||i>.35||Math.abs(e.projectionMatrix.elements[5]-t[6])>.01||r<this.previousTime)&&this.reset()}return this.cameraState=[a[12],a[13],a[14],a[8],a[9],a[10],e.projectionMatrix.elements[5]],this.uniforms.set(`previousView`,this.needsReset?e.matrixWorldInverse:this.previousView),this.uniforms.set(`previousViewProj`,this.needsReset?new v().multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse):this.previousViewProj),this.uniforms.set(`previousTime`,this.needsReset?r:this.previousTime),this.uniforms.set(`reset`,+!!this.needsReset),this.jitter=this.enabled?[(oa(this.frame%16+1,2)-.5)*.6,(oa(this.frame%16+1,3)-.5)*.6]:[0,0],this.uniforms.fields.jitter.value.set(...this.jitter),this.needsReset&&this.stats.resets++,this.stats.input=[this.current.width,this.current.height],this.stats.output=[t,n],this.jitter}finish(e,t,n,{scissor:r=null,background:i=null}={}){if(this.enabled){let e=1-this.index;this.resolve[this.index].render({colorViews:this.history[e].textures,clear:[0,0,0,0],scissor:r,clearColors:i?[i,[6e4,0,0,0]]:null}),this.index=e}this.present.render({colorViews:[n],clear:[0,0,0,1]}),this.previousView.copy(e.matrixWorldInverse),this.previousViewProj.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this.previousTime=t,this.frame++,this.needsReset=!1,this.stats.frames++}},ca=class{constructor(){this.matrix=new v,this.box=new V,this.clip=new R;let e=W.halfSize;this.surface=new V(new l(-e,0,-e),new l(e,0,e))}get(e,t,n){if(e.matrixWorld.elements[13]<=n+.05||(this.matrix.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this.minimum=[1/0,1/0],this.maximum=[-1/0,-1/0],this.surface.min.y=-n,this.surface.max.y=n,!this.include(this.surface,e.near)))return[0,0,1,1];let r=!1;return t.traverse(e=>{let t=(e.material?.vertex||``).replace(`o.vLocal = v.position;`,``);(e.isInstancedMesh||/\bv\.(?:position|worldOffset|worldPos|useWorld|model)\b/.test(t))&&(r=!0)}),r||(t.updateMatrixWorld(),this.box.setFromObject(t),!this.box.isEmpty()&&!this.include(this.box,e.near))?[0,0,1,1]:[this.minimum[0],this.minimum[1],this.maximum[0],this.maximum[1]]}include(e,t){let n=[];for(let t=0;t<8;t++)this.clip.set(t&1?e.max.x:e.min.x,t&2?e.max.y:e.min.y,t&4?e.max.z:e.min.z,1).applyMatrix4(this.matrix),n.push([this.clip.x,this.clip.y,this.clip.w]);if(n.every(e=>e[2]<=0))return!0;if(n.some(e=>e[2]<=t+.01))return!1;for(let[e,t,r]of n){let n=e/r*.5+.5,i=.5-t/r*.5;this.minimum[0]=Math.min(this.minimum[0],n),this.minimum[1]=Math.min(this.minimum[1],i),this.maximum[0]=Math.max(this.maximum[0],n),this.maximum[1]=Math.max(this.maximum[1],i)}return!0}};function la(e,t,n,r=8){let i=Math.max(0,Math.min(t-1,Math.floor((e[0]*t-r)/2)*2)),a=Math.max(0,Math.min(n-1,Math.floor((e[1]*n-r)/2)*2)),o=Math.max(i+1,Math.min(t,Math.ceil((e[2]*t+r)/2)*2)),s=Math.max(a+1,Math.min(n,Math.ceil((e[3]*n+r)/2)*2));return[i,a,o-i,s-a]}var ua=class{constructor(){this.enabled=!1,this.last=-1/0,this.result=null,this.active=!1}begin(e=performance.now(),n={}){this.active=!1,!(!this.enabled||!t.hasTimestamp||e-this.last<700)&&(this.queries||(this.queries=t.device.createQuerySet({type:`timestamp`,count:32}),this.resolved=t.device.createBuffer({size:256,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),this.ring=[0,1].map(()=>({busy:!1,buffer:t.device.createBuffer({size:256,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST})}))),this.slot=this.ring.find(e=>!e.busy),this.slot&&(this.slot.busy=!0,this.names=[],this.active=!0,this.last=e,this.context={...n},t.getEncoder().beginComputePass({label:`Water profiling start`,timestampWrites:this.writes(`begin`)}).end()))}writes(e){if(!this.active)return null;let t=this.names.length*2;return this.names.push(e),{querySet:this.queries,beginningOfPassWriteIndex:t,endOfPassWriteIndex:t+1}}finish(){if(!this.active)return;let e=t.getEncoder();e.beginComputePass({label:`Water profiling end`,timestampWrites:this.writes(`end`)}).end(),this.active=!1;let n=this.slot,r=this.names.slice(),i=this.context;e.resolveQuerySet(this.queries,0,r.length*2,this.resolved,0),e.copyBufferToBuffer(this.resolved,0,n.buffer,0,r.length*16),t.onSubmit(null,()=>{n.buffer.mapAsync(GPUMapMode.READ).then(()=>{let e=new BigUint64Array(n.buffer.getMappedRange().slice(0));n.buffer.unmap(),n.busy=!1;let t={fft:0};for(let n=0;n<r.length;n++)r[n]!==`begin`&&r[n]!==`end`&&(t[r[n]]=Number(e[n*2+1]-e[n*2])/1e6);let a=Number(e[(r.length-1)*2+1]-e[0])/1e6;this.result={capturedAt:Date.now(),...i,totalGPUms:a,stages:t,scope:`One diagnostic sample; GPU passes only, including reflection mipmaps. Excludes browser composition; tile GPUs may overlap individual stages.`},this.enabled=!1}).catch(e=>{n.busy=!1,this.result={error:String(e)}})})}};function da({antiAliasing:e=!0,sampleScale:n=1.5,boundedRendering:r=!0,mobilePerformance:i=!1}={}){let a=new Xi,o=new ia(a),s=new Ue,c=new sr,l=new aa,u=new sa({enabled:e,sampleScale:n}),d=new li(1,1,{colors:[`rgba16float`,`rgba16float`],depth:`depth32float`,label:`Water objects and motion`}),f=new li(1,1,{colors:[`rgba16float`],depth:`depth32float`,mips:!0,label:`Water object reflection`}),p=Wn(`waterReflection`),m=new v().makeScale(1,-1,1),h={isCamera:!0,reversedDepth:!0,near:.1,far:1e3,matrixWorld:new v,matrixWorldInverse:new v,projectionMatrix:new v,updateMatrixWorld(){this.matrixWorldInverse.copy(this.matrixWorld).invert()}},g=new Ze(`WaterReflection`,{matrix:[`mat4x4f`,new v]}),_=new F({name:`waterReflection`,uniforms:g,uniformName:`waterReflection`,code:``}),y=new Ze(`WaterMapWaves`,{time:[`f32`,0],strength:[`f32`,1],advectedRipples:[`f32`,+!!i],rippleEpoch:[`f32`,0]}),b=new F({name:`waterMapWaves`,uniforms:y,uniformName:`waves`,code:Zi}),x=new Li(null,{depth:W.depth,derivativeOnly:!0,fusedMips:!0});x.local.windSpeed=3.5,x.swell.scale=0,x.updateSpectrumUniforms();let S=new B(W.beige),C=new ca,w=[S.r,S.g,S.b,1],T=new ua,E=new gr({label:`50 metre water map`,modules:[x.module,Vi,b,Dn,_],bindings:{objectColor:{texture:d.texture},objectMotion:{texture:d.textures[1]},objectDepth:{texture:d.depthTexture},reflectionColor:{texture:f.texture},aa:{uniform:u.uniforms}},colorFormats:u.current.formats,code:`
const HALF_SIZE: f32 = ${W.halfSize}.0;
const BOTTOM: f32 = ${W.bottom}.0;
const BEIGE = vec3f(${S.r}, ${S.g}, ${S.b});

fn inSquare(p: vec2f) -> bool { return all(abs(p) <= vec2f(HALF_SIZE)); }

// Exact distances to the four beige walls and the flat bottom, in metres.
fn bedDistance(p: vec3f, d: vec3f) -> f32 {
  var t = 100000.0;
  if (d.y < -0.00001) { t = min(t, (BOTTOM - p.y) / d.y); }
  if (abs(d.x) > 0.00001) { t = min(t, (sign(d.x) * HALF_SIZE - p.x) / d.x); }
  if (abs(d.z) > 0.00001) { t = min(t, (sign(d.z) * HALF_SIZE - p.z) / d.z); }
  return max(0.0, t);
}

fn throughWaterTo(distance: f32, base: vec3f) -> vec3f {
  let extinction = frame.waterAbsorption + frame.waterScattering;
  let transmission = exp(-extinction * distance);
  let scattered = vec3f(0.035, 0.24, 0.30);
  return base * transmission + scattered * (vec3f(1.0) - transmission);
}
fn throughWater(distance: f32) -> vec3f { return throughWaterTo(distance, BEIGE * 0.72); }

fn reflectedScene(p: vec3f, normal: vec3f) -> vec3f {
  // Full-output-resolution reflection with footprint-filtered mipmaps. Empty
  // pixels reflect beige; rapidly distorted fine rails do not sparkle.
  let projected = waterReflection.matrix * vec4f(p, 1.0);
  let uv = projected.xy / max(projected.w, 0.001) * vec2f(.5, -.5) + .5;
  let offset = normal.xz * .017;
  let coordinate = uv + offset;
  let size = vec2f(textureDimensions(reflectionColor));
  let footprint = max(length(dpdx(coordinate) * size), length(dpdy(coordinate) * size));
  let level = max(.5, log2(max(1.0, footprint)));
  let sample = textureSampleLevel(reflectionColor, smpLinearClamp, clamp(coordinate, vec2f(.001), vec2f(.999)), level);
  let valid = all(uv > vec2f(0.0)) && all(uv < vec2f(1.0)) && projected.w > 0.0;
  return select(BEIGE * .8, sample.rgb + BEIGE * .8 * (1.0 - sample.a), valid);
}

fn waterNormal(p: vec2f) -> vec3f {
  var slopes = waveSample(p).yz;
  let footprint = max(length(dpdx(p)), length(dpdy(p)));
  for (var c = 2; c < 4; c++) {
    let texels = footprint * f32(textureDimensions(oceanDerivatives).x) / ocean.sizes[c].x;
    let level = max(0.0, log2(max(1.0, texels)));
    // Mobile mode transports the same generated fine-wave spectrum. Analytic
    // surface waves and buoyancy still use the full physical height field.
    // Two velocities avoid a single sliding pattern, without a per-frame FFT.
    let flow = select(vec2f(.12,.035),vec2f(-.055,.10),c==3)*(waves.time-waves.rippleEpoch)/ocean.sizes[c].x;
    let uv = p/ocean.sizes[c].x-select(vec2f(0.0),flow,waves.advectedRipples>.5);
    slopes += textureSampleLevel(oceanDerivatives, smpLinearRepeat, uv, c, level).xy;
  }
  return normalize(vec3f(-slopes.x, 1.0, -slopes.y));
}

// Solve the actual height field, rather than a stationary plane. The envelope
// pins the edge at mean water level and keeps all waves inside the 50 m square.
fn surfaceDistance(origin: vec3f, ray: vec3f) -> f32 {
  if (abs(ray.y) < 0.00001) { return -1.0; }
  var t = max(0.0, -origin.y / ray.y);
  for (var i = 0; i < 6; i++) {
    let p = origin + ray * t;
    let sample = waveSample(p.xz);
    let error = p.y - sample.x;
    let derivative = ray.y - dot(sample.yz, ray.xz);
    if (abs(derivative) < 0.0001) { break; }
    t -= clamp(error / derivative, -8.0, 8.0);
  }
  let p = origin + ray * t;
  if (t < 0.0 || !inSquare(p.xz) || abs(p.y - waveSample(p.xz).x) > 0.025) { return -1.0; }
  return t;
}

struct WaterRay { color: vec3f, distance: f32 };
fn stableWaterRay(uv: vec2f, stable: bool) -> vec3f {
  if(!stable) { return viewRay(uv); }
  let p=aa.inverseStableViewProj*ndcFromUv(uv,.5);
  return normalize(p.xyz/p.w-frame.cameraPos);
}
fn shadeRay(uv: vec2f, ray: vec3f) -> WaterRay {
  let origin = frame.cameraPos;
  let underwater = origin.y < waveSample(origin.xz).x && origin.y >= BOTTOM && inSquare(origin.xz);
  if (underwater) {
    let bed = bedDistance(origin, ray);
    if (ray.y > 0.00001) {
      let t = surfaceDistance(origin, ray);
      let p = origin + ray * t;
      if (t >= 0.0 && t < bed && inSquare(p.xz)) {
        let normal = -waterNormal(p.xz);
        let fresnel = fresnelDielectric(dot(-ray, normal), 1.0 / 1.333);
        let reflected = throughWater(bedDistance(p, reflect(ray, normal)));
        let transmission = exp(-(frame.waterAbsorption + frame.waterScattering) * t);
        return WaterRay(mix(vec3f(0.035, 0.24, 0.30), mix(BEIGE, reflected, fresnel), transmission), t);
      }
    }
    return WaterRay(throughWater(bed), bed);
  }
  if (ray.y >= -0.00001) { return WaterRay(BEIGE, 100000.0); }
  let t = surfaceDistance(origin, ray);
  let p = origin + ray * t;
  if (t < 0.0) { return WaterRay(BEIGE, 100000.0); }
  let normal = waterNormal(p.xz);
  let view = -ray;
  let refracted = refract(ray, normal, 1.0 / 1.333);
  let transmitted = throughWater(bedDistance(p, refracted));
  let reflected = reflect(ray, normal);
  let fresnel = fresnelDielectric(dot(view, normal), 1.333);
  let sun = frame.sunDir;
  // Convolve the narrow sun lobe with the normal variation within this pixel.
  // This retains glint energy while preventing isolated flashing white pixels.
  let nx = dpdx(normal); let ny = dpdy(normal);
  let variance = (dot(nx,nx) + dot(ny,ny)) / 12.0;
  let power = 700.0 / (1.0 + 700.0 * variance);
  let highlight = pow(max(dot(reflected, sun), 0.0), power) * 2.5 * power / 700.0;
  let shadow = sunShadowPCF(p, normal, uv * frame.resolution);
  return WaterRay(mix(transmitted * mix(.65, 1.0, shadow), reflectedScene(p, normal), fresnel)
    + frame.sunColor * highlight * shadow, t);
}

struct MapSample { color: vec3f, motion: vec4f, info: vec4f };
fn surfaceSample(uv: vec2f, water: WaterRay, ray: vec3f) -> MapSample {
  if (water.distance > 50000.0) { return MapSample(water.color,vec4f(0.0,0.0,60000.0,0.0),vec4f(60000.0,0.0,0.0,0.0)); }
  let point = frame.cameraPos + ray * water.distance;
  var previous = point;
  if (abs(point.y-waveSample(point.xz).x)<.15) { previous.y += waveSampleAt(point.xz,aa.previousTime).x-waveSample(point.xz).x; }
  let cur = frame.viewProjNoJitter * vec4f(point,1.0);
  let prev = aa.previousViewProj * vec4f(previous,1.0);
  let velocity = (cur.xy/cur.w-prev.xy/max(.001,prev.w))*vec2f(.5,-.5);
  let depth = -(frame.view * vec4f(point,1.0)).z;
  let previousDepth = -(aa.previousView * vec4f(previous,1.0)).z;
  let reactive = select(.05,.45+clamp(max(max(water.color.r,water.color.g),water.color.b)-.9,0.0,.4),frame.dt>0.0);
  return MapSample(water.color,vec4f(velocity,previousDepth,reactive),vec4f(depth,2.0,0.0,0.0));
}
fn sceneSample(uv: vec2f, rayUV: vec2f, stableFluid: bool) -> MapSample {
  // Build fluid rays directly from the unjittered inverse matrix. Subtracting
  // and then cancelling projection jitter amplified float error in sharp glints.
  let ray=stableWaterRay(rayUV,stableFluid);
  let water = shadeRay(rayUV,ray);
  var result = surfaceSample(rayUV,water,ray);
  let pixel = vec2i(clamp(uv, vec2f(0.0), vec2f(0.99999)) * vec2f(textureDimensions(objectDepth)));
  let depth = textureLoad(objectDepth, pixel, 0);
  if (depth <= 0.0) { return result; }
  let objectSample = textureLoad(objectColor, pixel, 0);
  let object = objectSample.rgb / max(objectSample.a, .001);
  let position = worldFromDepth(uv, depth);
  let distance = length(position - frame.cameraPos);
  let motion = textureLoad(objectMotion,pixel,0);
  let previousDepth = motion.z / max(.001,motion.w);
  let viewDistance = -(frame.view*vec4f(position,1.0)).z;
  let reactive = select(.02,.8,objectSample.a<.98);
  let objectSampleData = MapSample(object,vec4f(motion.xy/max(.001,motion.w),previousDepth,reactive),vec4f(viewDistance,1.0,0.0,0.0));
  let camUnder = frame.cameraPos.y < waveSample(frame.cameraPos.xz).x && inSquare(frame.cameraPos.xz);
  if (camUnder) {
    result.color=mix(water.color,throughWaterTo(distance,object),objectSample.a); result.motion.w=.8;
    return result;
  }
  if (distance <= water.distance) {
    var dry=objectSampleData; dry.color=mix(water.color,object,objectSample.a); return dry;
  }
  // Submerged portions share the water's absorption and reflection, with the
  // moving surface depth controlling the waterline on arbitrary scene meshes.
  if (inSquare(position.xz) && position.y >= BOTTOM) {
    let surface = frame.cameraPos + ray * water.distance;
    let normal = waterNormal(surface.xz);
    let fresnel = fresnelDielectric(dot(-ray, normal), 1.333);
    result.color=mix(water.color,mix(throughWaterTo(distance-water.distance,object),reflectedScene(surface,normal),fresnel),objectSample.a);
    result.motion.w=.8;
    return result;
  }
  return result;
}

struct MapOut { @location(0) color: vec4f, @location(1) motion: vec4f, @location(2) info: vec4f, @location(3) fluid: vec4f };
@fragment fn fs(in: FSIn) -> MapOut {
  // Spatial water coverage plus 16 independently jittered mesh samples over
  // time; resolving in HDR avoids averaging gamma-encoded edge colors.
  var color = vec3f(0.0);
  var chosen = MapSample(vec3f(0.0),vec4f(0.0),vec4f(65000.0,0.0,0.0,0.0));
  let count=select(4,1,aa.enabled>.5);
  for (var i = 0; i < count; i++) {
    let offset=select((vec2f(f32(i%2),f32(i/2))-.5)*.5,vec2f(0.0),count==1);
    let uv=in.uv+offset*frame.invResolution;
    let sample=sceneSample(uv,uv,false);
    color+=sample.color;
    if (sample.info.x<chosen.info.x) { chosen=sample; }
  }
  color/=f32(count);
  var fluid=color;
  if (aa.enabled>.5) {
    fluid=vec3f(0.0);
    for (var i=0;i<4;i++) {
      let offset=(vec2f(f32(i%2),f32(i/2))-.5)*.5;
      let stableUV=in.uv+offset*frame.invResolution;
      fluid+=sceneSample(stableUV-aa.jitter*frame.invResolution,stableUV,true).color*.25;
    }
  }
  return MapOut(vec4f(color,1.0),chosen.motion,chosen.info,vec4f(fluid,1.0));
}
`});return{fft:x,pass:E,waves:a,physics:o,scene:s,waveModule:b,waveParams:y,lighting:l,meshRenderer:c,reflection:f,objects:d,aa:u,profiler:T,mobilePerformance:i,reflectionScale:i?.5:1,elapsedTime:0,setMobilePerformance(e){this.mobilePerformance=e,this.reflectionScale=e?.5:1,e?y.set(`rippleEpoch`,o.time):x.time.value=this.elapsedTime,y.set(`advectedRipples`,+!!e),this.fftTime=void 0,u.reset()},resetHistory(){u.reset()},addObject(e,t){let n=o.add(e,t);return s.add(e),u.reset(),n},removeObject(e){return o.remove(e)?(s.remove(e.object),u.reset(),!0):!1},render(e,n,i,_,v){this.elapsedTime+=v,o.update(v),y.set(`time`,o.time),y.set(`strength`,a.strength),Gn.dt.value=v,Gn.time.value=o.time,t.beginFrame();let b=c.render,S=[l.elevation,l.azimuth,l.enabled,a.strength,this.mobilePerformance,this.reflectionScale].join(`:`);this.historySignature!==S&&(u.reset(),this.historySignature=S);let[D,O]=u.begin(e,n,i,o.time),k=u.current.width,A=u.current.height;Jn(e,k,A,{jitterX:-D,jitterY:O,prevViewProj:u.uniforms.fields.previousViewProj.value});let j=r?C.get(e,s,a.maxHeight):[0,0,1,1],M=la(j,k,A),ee=la(j,n,i);this.stats={source:[k,A],output:[n,i],scissor:M,shadedFraction:M[2]*M[3]/(k*A)},T.begin(void 0,{source:[k,A],mobilePerformance:this.mobilePerformance}),T.active&&(c.render=(e,t)=>b.call(c,e,{...t,timestampWrites:T.writes(t.kind===`depth`?`shadow`:t.kind===`color`?`reflection`:`objects`)})),x.timestampWrites=null,E.timestampWrites=T.writes(`water`);for(let e of u.resolve)e.timestampWrites=null;u.enabled&&(u.resolve[u.index].timestampWrites=T.writes(`antiAliasing`)),u.present.timestampWrites=T.writes(`display`);let te=x.time.value+v*x.timeScale;(x.needsSpectrum||this.fftTime===void 0||!this.mobilePerformance&&this.fftTime!==te)&&(x.timestampWrites=T.writes(`fft`),x.update(v)),this.fftTime=x.time.value,l.render(s,c,l.update(e,Gn.sunDir.value)),f.setSize(Math.max(1,Math.ceil(k*this.reflectionScale)),Math.max(1,Math.ceil(A*this.reflectionScale))),h.matrixWorld.multiplyMatrices(m,e.matrixWorld),h.projectionMatrix.copy(e.projectionMatrix),h.near=e.near,h.far=e.far,Jn(h,f.width,f.height,{block:p}),g.set(`matrix`,p.fields.viewProj.value),c.render(s,{camera:h,frameBlock:p,kind:`color`,cullOverride:`front`,defines:{WATER_MAP_REFLECTION:1},colorViews:[f.texture.view({mipLevelCount:1})],colorFormats:[`rgba16float`],depthView:f.depthTexture.view(),depthFormat:`depth32float`,clearColors:[[0,0,0,0]],clearDepth:0}),vi(f.texture),d.setSize(k,A),c.render(s,{camera:e,kind:`main`,late:!0,defines:{WATER_MAP_MOTION:1},colorViews:d.textures.map(e=>e.view()),colorFormats:d.formats,depthView:d.depthTexture.view(),depthFormat:`depth32float`,clearColors:[[0,0,0,0],[0,0,0,0]],clearDepth:0}),E.render({colorViews:u.current.textures,scissor:M,clearColors:[w,[0,0,6e4,0],[6e4,0,0,0],w]}),u.finish(e,o.time,_,{scissor:ee,background:w}),c.render=b,T.finish(),t.submit()}}}var fa={0:`front`,1:`back`,2:`double`,front:`front`,back:`back`,double:`double`};function pa(e){let t={...e};return t.side!==void 0&&(t.side=fa[t.side]||`front`),t}var ma=class extends Rn{constructor(e={},t=null){let n=pa(e),r={...n.uniforms||{}};r.envMapIntensity=[`f32`,n.envMapIntensity??1],r.emissiveIntensity=[`f32`,n.emissiveIntensity??1],t&&Object.assign(r,t),super({...n,uniforms:r}),this.isSceneMaterial=!0,this.isMeshStandardMaterial=!0}get side(){return this._side}set side(e){let t=fa[e]||`front`;t!==this._side&&this._side!==void 0&&this.version++,this._side=t}get emissiveIntensity(){return this.uniforms.emissiveIntensity.value}set emissiveIntensity(e){this.uniforms.emissiveIntensity.value=e}get envMapIntensity(){return this.uniforms.envMapIntensity.value}set envMapIntensity(e){this.uniforms.envMapIntensity.value=e}get surface(){return this._prelude()+(this._surface||``)}set surface(e){this._surface=e}_prelude(){return`	s.emissive = s.emissive * mat.emissiveIntensity;
	s.envIntensity = mat.envMapIntensity;
`}},ha=class extends ma{constructor(e={}){let t=e.clearcoat??0,n=e.sheen??0;super(e,{clearcoat:[`f32`,t],clearcoatRoughness:[`f32`,e.clearcoatRoughness??0],specularIntensity:[`f32`,e.specularIntensity??1],sheen:[`f32`,n],sheenColor:[`vec3f`,null],sheenRoughness:[`f32`,e.sheenRoughness??1],ior:[`f32`,e.ior??1.5]}),this.isMeshPhysicalMaterial=!0,e.sheenColor===void 0?this.uniforms.sheenColor.value=ga(0):this.uniforms.sheenColor.value=ga(e.sheenColor),t>0&&(this.defines.CLEARCOAT=1),n>0&&(this.defines.SHEEN=1)}get clearcoat(){return this.uniforms.clearcoat.value}set clearcoat(e){e>0!=!!this.defines.CLEARCOAT&&this.setDefine(`CLEARCOAT`,+(e>0)),this.uniforms.clearcoat.value=e}get clearcoatRoughness(){return this.uniforms.clearcoatRoughness.value}set clearcoatRoughness(e){this.uniforms.clearcoatRoughness.value=e}get specularIntensity(){return this.uniforms.specularIntensity.value}set specularIntensity(e){this.uniforms.specularIntensity.value=e}get sheen(){return this.uniforms.sheen.value}set sheen(e){e>0!=!!this.defines.SHEEN&&this.setDefine(`SHEEN`,+(e>0)),this.uniforms.sheen.value=e}get sheenColor(){return this.uniforms.sheenColor.value}get sheenRoughness(){return this.uniforms.sheenRoughness.value}set sheenRoughness(e){this.uniforms.sheenRoughness.value=e}get ior(){return this.uniforms.ior.value}set ior(e){this.uniforms.ior.value=e}_prelude(){return super._prelude()+`	s.clearcoat = mat.clearcoat;
	s.clearcoatRoughness = mat.clearcoatRoughness;
	s.specularIntensity = mat.specularIntensity;
	s.sheenColor = mat.sheenColor * mat.sheen;
	s.sheenRoughness = mat.sheenRoughness;
	s.ior = mat.ior;
`}};function ga(e){return e&&e.isColor?e.clone():new B().set(e)}new B;var _a=new l;new o,new C,new l;function va(e,t){let n=e.attributes.position,r=e.index.array,i=new l,a=new l,o=new l,s=new l,c=new l;for(let e=0;e<r.length;e+=3)i.fromBufferAttribute(n,r[e]),a.fromBufferAttribute(n,r[e+1]),o.fromBufferAttribute(n,r[e+2]),s.subVectors(a,i).cross(o.sub(i)),c.add(s);if(c.dot(t)<0){let t=Array.from(r);for(let e=0;e<t.length;e+=3){let n=t[e+1];t[e+1]=t[e+2],t[e+2]=n}e.setIndex(t)}return e}function ya(e,t,n,{edges:r=!0,back:i=!0,front:a=!0}={}){let o=e.map(e=>new P(e[0],e[1])),s=t.map(e=>e.map(e=>new P(e[0],e[1])));vn.isClockWise(o)&&o.reverse();for(let e of s)vn.isClockWise(e)||e.reverse();let c=vn.triangulateShape(o,s),u=o.concat(...s),d=[],f=e=>{let t=[],r=[];for(let i of u){let a=n(i.x,i.y,e);t.push(a.x,a.y,a.z),r.push(i.x,i.y)}let i=[];for(let e of c){let t=u[e[0]],n=u[e[1]],r=u[e[2]];Math.abs((n.x-t.x)*(r.y-t.y)-(r.x-t.x)*(n.y-t.y))>1e-10&&i.push(e[0],e[1],e[2])}let a=new q;a.setAttribute(`position`,new Nr(t,3)),a.setAttribute(`uv`,new Nr(r,2)),a.setIndex(i);let s=o[0],l=n(s.x,s.y,e).sub(n(s.x,s.y,1-e));va(a,l),a.computeVertexNormals();let d=a.attributes.normal;l.normalize();for(let e=0;e<d.count;e++)Math.hypot(d.getX(e),d.getY(e),d.getZ(e))<.5&&d.setXYZ(e,l.x,l.y,l.z);return a};if(a&&d.push(f(0)),i&&d.push(f(1)),r){let e=[],t=[],r=[],i=[o,...s],a=new l,c=new l,u=new l,f=new l,p=new l,m=new l;for(let o of i){let i=0;for(let s=0;s<o.length;s++){let l=o[s],d=o[(s+1)%o.length],h=l.distanceTo(d);if(h<1e-6)continue;a.copy(n(l.x,l.y,0)),c.copy(n(l.x,l.y,1)),u.copy(n(d.x,d.y,0)),f.copy(n(d.x,d.y,1));let g=a.distanceTo(c),_=e.length/3;e.push(a.x,a.y,a.z,u.x,u.y,u.z,f.x,f.y,f.z,c.x,c.y,c.z),t.push(i,0,i+h,0,i+h,g,i,g),i+=h;let v=(l.x+d.x)/2,y=(l.y+d.y)/2,b=(d.y-l.y)/h*.01,x=-(d.x-l.x)/h*.01;m.copy(n(v+b,y+x,0)).sub(n(v,y,0)),p.subVectors(u,a).cross(_a.subVectors(c,a)),p.dot(m)>=0?r.push(_,_+1,_+2,_,_+2,_+3):r.push(_,_+2,_+1,_,_+3,_+2)}}if(e.length){let n=new q;n.setAttribute(`position`,new Nr(e,3)),n.setAttribute(`uv`,new Nr(t,2)),n.setIndex(r),n.computeVertexNormals(),d.push(n)}}return d.length===1?d[0]:oi(d,!1)}var ba=Object.freeze({url:`https://azimutyachts.com/wp-content/uploads/2022/04/Trideck_menu.png`,width:1400,height:800,stern:55,bow:1348,waterline:595}),xa=38.22/1293,Z=e=>(e-55)*xa-19.11,Q=e=>(595-e)*xa,Sa=([e,t])=>[Z(e),Q(t)],Ca=Object.freeze({mainGlass:[[385,451],[739,451],[820,449],[1342,450],[1335,468],[1250,475],[1104,480],[1076,487],[1044,513],[1020,516],[960,516],[925,503],[897,498],[852,496],[739,494],[732,491],[392,493]],mainRoof:[[283,438],[288,431],[310,424],[329,420],[710,418],[746,415],[802,414],[922,413],[975,416],[1110,422],[1240,429],[1294,434],[1326,438],[1348,445],[1348,450],[829,453],[819,455],[387,454],[333,451],[300,448],[284,443]],upperGlass:[[432,415],[454,401],[478,391],[519,375],[575,374],[698,374],[818,372],[848,372],[861,381],[884,402],[907,416],[864,418],[630,418],[520,417]],upperRoof:[[368,369],[375,363],[399,354],[445,346],[548,343],[638,343],[724,344],[750,351],[819,357],[883,362],[919,367],[936,371],[935,373],[900,373],[842,372],[786,372],[717,375],[650,378],[610,377],[514,373],[451,373],[417,374],[376,374]],hardtop:[[519,284],[526,280],[540,277],[581,275],[650,276],[704,279],[739,282],[742,284],[735,288],[698,288],[652,286],[579,287],[541,289],[522,288]],mastSupport:[[555,341],[577,299],[584,291],[610,290],[603,320],[597,341]],mast:[[574,276],[583,192],[596,190],[603,219],[609,255],[614,275]],terraceBrace:[[304,493],[345,479],[394,455],[442,455],[408,484],[378,502],[364,502],[412,462],[398,462],[344,489],[315,496]],sternBrace:[[77,547],[113,519],[144,507],[242,507],[240,520],[195,520],[151,524],[116,551]]});function wa(e,t){let n=(t+19.11)/xa+55;for(let t=1;t<e.length;t++){let[r,i]=e[t-1],[a,o]=e[t];if(n<=a)return Q(i+(o-i)*Math.max(0,(n-r)/(a-r)))}return Q(e.at(-1)[1])}var Ta=[[55,561],[70,552],[109,550],[150,551],[215,551],[252,549],[260,508],[400,504],[740,500],[882,500],[940,516],[1020,517],[1093,484],[1260,475],[1338,470],[1348,450]],Ea=[[1100,646],[1170,633],[1225,601],[1250,584],[1297,551],[1322,517],[1340,483],[1348,468]],$=Object.freeze({name:`Azimut Grande Trideck · 38 Metri`,length:38.22,beam:7.98,draft:2.02,mass:192e3,hullDraft:1.55,source:`https://azimutyachts.com/en/grande-series/grande-trideck/`,dimensionsVerified:!0,exterior:`Reference-inspired exterior; not manufacturer CAD`}),Da=[[-19.11,3.53],[-17.7,3.68],[-13,3.91],[-6,3.95],[0,3.95],[6,3.82],[11,3.2],[15,2.12],[17.8,.87],[19.11,0]];function Oa(e){for(let t=1;t<Da.length;t++){let[n,r]=Da[t-1],[i,a]=Da[t];if(e<=i){let t=Math.max(0,(e-n)/(i-n));return(r+(a-r)*t)*$.beam/7.9}}return 0}function ka(e){return e<11.7?-$.hullDraft:Math.max(-$.hullDraft,wa(Ea,e))}function Aa(e){return wa(Ta,e)}var ja=Object.freeze([[0,0],[.28,.06],[.64,.16],[.88,.31],[.95,.46],[.985,.68],[1,1]].map(Object.freeze));function Ma(e,t){let n=ka(e),r=(t-n)/(Aa(e)-n);if(r<=0)return 0;if(r>=1)return Oa(e);for(let t=1;t<ja.length;t++){let[n,i]=ja[t-1],[a,o]=ja[t];if(r<=o)return Oa(e)*(n+(a-n)*(r-i)/(o-i))}return 0}function Na(){let e=[],t=$.length/20,n=.4;for(let r=0;r<20;r++){let i=-$.length/2+(r+.5)*t;for(let r=-$.hullDraft+n/2;r<1;r+=n){let a=Ma(i,r),o=2*a/3;if(!(o<.03))for(let s=0;s<3;s++)e.push({position:[-a+(s+.5)*o,r,i],volume:o*n*t,halfSize:[o/2,n/2,t/2]})}}let r=0,i=0;for(let t of e){let e=Math.max(0,Math.min(1,(.5*n-t.position[1])/n));r+=t.volume*e,i+=t.volume*e*t.position[2]}let a=$.mass/(r*1025);for(let t of e)t.volume*=a;return{samples:e,mass:$.mass,centerOfMass:[0,-.05,i/r],displacementCenter:[0,0,0],dimensions:[$.beam,5.7,$.length],drag:1.65}}var Pa=class{constructor(){this.p=[],this.n=[],this.uv=[],this.color=[],this.surface=[]}add(e,t,n=[.25,0,0,1]){let r=e.index?e.toNonIndexed():e,i=r.attributes.position,a=r.attributes.normal,o=r.attributes.uv,s=new B(t);for(let e=0;e<i.count;e++)this.p.push(i.getX(e),i.getY(e),i.getZ(e)),this.n.push(a.getX(e),a.getY(e),a.getZ(e)),this.uv.push(o?o.getX(e):i.getX(e),o?o.getY(e):i.getZ(e)),this.color.push(s.r,s.g,s.b),this.surface.push(...n)}geometry(){let e=new q;for(let[t,n,r]of[[`position`,this.p,3],[`normal`,this.n,3],[`uv`,this.uv,2],[`color`,this.color,3],[`aSurface`,this.surface,4]])e.setAttribute(t,new Nr(n,r));return e.computeBoundingBox(),e.computeBoundingSphere(),e}};function Fa(e,t,n=!1){let r=new q;if(r.setAttribute(`position`,new Nr(e.flat(),3)),r.setIndex(t),r.computeVertexNormals(),n)return r;let i=r.toNonIndexed();return i.computeVertexNormals(),i}function Ia(){let e=[],t=[],n=[...ja.slice().reverse(),...ja.slice(1).map(([e,t])=>[-e,t])];for(let t=0;t<=112;t++){let r=-$.length/2+$.length*t/112,i=ka(r),a=Aa(r);for(let[t,o]of n)e.push([t*Oa(r),i+(a-i)*o,r])}let r=n.length;for(let e=0;e<112;e++)for(let n=0;n<r;n++){let i=e*r+n,a=e*r+(n+1)%r,o=i+r,s=a+r;t.push(i,o,a,a,o,s)}for(let e=1;e<r-1;e++)t.push(0,e,e+1);return Fa(e,t,!0)}function La(e,t,n){e.reduce((t,[n,r],i)=>{let a=e[(i+1)%e.length];return t+n*a[1]-a[0]*r},0)>0&&(e=e.slice().reverse());let r=e.map(([e,n])=>[e,t,n]).concat(e.map(([e,t])=>[e,n,t])),i=[],a=e.length;for(let e=1;e<a-1;e++)i.push(a,a+e+1,a+e,0,e,e+1);for(let e=0;e<a;e++){let t=(e+1)%a;i.push(e,a+e,t,t,a+e,a+t)}for(let e=0;e<i.length;e+=3)[i[e+1],i[e+2]]=[i[e+2],i[e+1]];return Fa(r,i)}function Ra({detail:e=`high`}={}){if(![`high`,`low`].includes(e))throw RangeError(`Yacht detail must be high or low`);let t=new Pa,n=new Pa,r=new Pa,i=e===`high`,a=15921645,s=12436935,c=10717794,u=14998991,d=[.22,0,0,1],f=[.6,0,1,.94],p=[.17,.93,0,1],m=(e,n,r=a,i=d,o=.035)=>{let s=o?new ii(...e,1,o):new $r(...e);t.add(s.translate(...n),r,i)},h=(e,n,r=.02,a=s,c=p)=>{let u=new l(...e),d=new l(...n),f=d.clone().sub(u),m=new ti(r,r,f.length(),i?8:5,1);m.applyQuaternion(new o().setFromUnitVectors(new l(0,1,0),f.normalize())),t.add(m.translate(...u.add(d).multiplyScalar(.5).toArray()),a,c)},g=(e,n,r=t,i=a,o=d,s=[])=>{let c=e.map(Sa),u=s.map(e=>e.map(Sa)),f=typeof n==`function`?n:()=>n;r.add(ya(c,u,(e,t,n)=>new l((n?-1:1)*Math.max(.001,f(e,t)),t,e)),i,o)},_=(e,t=.64)=>{for(let n=0;n<e.length;n++){let[i,a,o]=e[n];if(h([i,a,o],[i,a+t,o],.022),n)for(let r of[t,t*.48]){let s=e[n-1];h([s[0],s[1]+r,s[2]],[i,a+r,o],r===t?.022:.011)}if(n){let s=e[n-1],c=.032,l=[[s[0],s[1]+c,s[2]],[i,a+c,o],[i,a+t-c,o],[s[0],s[1]+t-c,s[2]]];r.add(Fa(l,[0,1,2,0,2,3,0,2,1,0,3,2]),15135732,[.09,0,0,1])}}},v=(e,t,n,r)=>[[-n+.3,e],[-n,e+.32],[-r,t-.35],[-r+.3,t],[r-.3,t],[r,t-.35],[n,e+.32],[n-.3,e]];t.add(Ia(),a,[.24,0,3,1]),g(Ca.mainGlass,e=>Math.max(.005,Oa(e)-.022),n,527890,[.085,.02,0,.85]),g(Ca.mainRoof,e=>Math.max(.004,Oa(e)-.008)),g(Ca.upperGlass,(e,t)=>2.92-Math.max(0,t-5.25)*.13,n,659734,[.09,.02,0,.9]),g(Ca.upperRoof,e=>{let t=Z(368),n=Z(936),r=Math.min(1,Math.max(.002,(e-t)/.75),Math.max(.002,(n-e)/1.55));return 3.2*Math.sqrt(r)}),g(Ca.hardtop,2.1,t,3422780,[.23,.15,0,1]),g(Ca.mastSupport,.46,t,3357501,[.23,.15,0,1]),g(Ca.mast,.21,t,3357501,[.23,.15,0,1]);let y=Q(550),b=Q(489),x=Q(427),S=Q(349);t.add(La(v(-19.11,Z(231),3.53,3.66),y-.14,y),a,d),t.add(La(v(-18.94,Z(231)-.13,3.4,3.53),y+.012,y+.033),c,f),t.add(La(v(Z(122),Z(385),3.45,3.7),b-.22,b),a,d),t.add(La(v(Z(126),Z(380),3.31,3.5),b+.006,b+.025),c,f),t.add(La(v(Z(292),Z(511),3.39,3.24),x-.24,x),a,d),t.add(La(v(Z(297),Z(505),3.25,3.11),x+.005,x+.024),c,f),t.add(La(v(Z(405),Z(725),2.94,2.92),S-.06,S),c,f);for(let e of[-1,1]){let r=Ca.terraceBrace,o=ya(r.map(Sa),[],(t,n,r)=>new l(e*(Oa(t)-.009-r*.14),n,t));t.add(o,a,d);let u=ya(Ca.sternBrace.map(Sa),[],(t,n,r)=>new l(e*(3.46-r*.17),n,t));t.add(u,a,d),t.add(La([[e*3.33,Z(370)],[e*3.34,Z(775)],[e*3.8,Z(775)],[e*3.8,Z(370)]],Q(502)-.03,Q(502)),c,f),_(Array.from({length:12},(t,n)=>[e*3.75,Q(502),Z(383+n*33)]),.46),_(Array.from({length:5},(t,n)=>[e*3.32,b+.03,Z(136+n*43)]),.76),_(Array.from({length:5},(t,n)=>[e*3.16,x+.03,Z(303+n*35)]),.65),_(Array.from({length:6},(t,n)=>[e*2.81,S,Z(406+n*62)]),.48);let g=[];for(let t=0;t<(i?17:10);t++){let n=Z(912+t*390/((i?17:10)-1)),r=wa([[912,423],[982,425],[1100,430],[1210,434],[1305,443]],n);g.push([e*Math.max(0,Oa(n)-.16),r,n])}_(g,.52);let v=(t,r,a,o)=>{let s=[],c=[],l=i?24:12;for(let n=0;n<=l;n++){let i=Z(t+(a-t)*n/l),u=Q(o),d=Q(r),f=.025*Math.max(0,1-Math.min(n,l-n));for(let t of[u+f,d-f])s.push([e*(Ma(i,t)+.019),t,i]);if(n){let e=(n-1)*2,t=n*2;c.push(e,e+1,t,e+1,t+1,t)}}if(e<0)for(let e=0;e<c.length;e+=3)[c[e+1],c[e+2]]=[c[e+2],c[e+1]];n.add(Fa(s,c,!0),527891,[.1,.02,0,.94])};v(620,543,785,570),v(880,543,922,570);for(let[e,t,n,r]of[[949,975,543,558],[1009,1035,542,558],[1069,1095,540,556],[1155,1181,528,543]])v(e,n,t,r);for(let[e,t]of[[300,365],[380,485],[501,610],[815,850]])v(e,518,t,525);let C=ya([[1229,514],[1268,510],[1261,542],[1220,547]].map(Sa),[],(t,n,r)=>new l(e*(Ma(t,n)+.035-r*.015),n,t));t.add(C,8753298,p),n.add(ya([[1237,517],[1262,515],[1255,537],[1228,541]].map(Sa),[],(t,n,r)=>new l(e*(Ma(t,n)+.05-r*.01),n,t)),1383969,[.35,.2,0,.7]);let w=Z(1245),T=Q(531),E=e*(Ma(w,T)+.12);h([E,T+.43,w],[E,T-.31,w-.11],.038,s,p),h([E,T-.24,w-.4],[E,T-.24,w+.29],.045,s,p);for(let t=0;t<8;t++){let n=Z(142+t*13.8),r=y+.11+t*(b-y)/8;m([.66,.1,.31],[e*2.99,r,n],a,d,.018),m([.6,.023,.28],[e*2.99,r+.058,n],c,f,0)}for(let t=0;t<6;t++){let n=Z(332+t*14),r=b+.09+t*(x-b)/6;m([.6,.095,.27],[e*3.07,r,n],a,d,.017),m([.55,.02,.24],[e*3.07,r+.055,n],c,f,0)}for(let t of[169,301,445,812,1140,1303]){let n=Z(t),r=t>900?wa([[912,423],[1305,443]],n):Math.max(y,Aa(n)),i=e*(Oa(n)-.17);h([i,r+.025,n-.14],[i,r+.025,n+.14],.037)}for(let t of[574,698,821]){let n=Z(t);m([.033,1.2,.037],[e*2.82,Q(395),n],1383200,[.2,.4,0,1],0)}}_([[-3.3,b+.03,Z(130)],[0,b+.03,Z(130)],[3.3,b+.03,Z(130)]],.76),_([[-3.17,x+.03,Z(297)],[0,x+.03,Z(297)],[3.17,x+.03,Z(297)]],.65),_([[-2.76,S,Z(410)],[0,S,Z(410)],[2.76,S,Z(410)]],.48);for(let e of[-1,1]){h([e*2.98,Q(415),Z(413)],[e*2.98,Q(373),Z(413)],.033,a,d),h([e*2.98,Q(414),Z(427)],[e*2.98,Q(373),Z(481)],.047,a,d);for(let t=0;t<7;t++)m([.58,.09,.29],[e*2.98,Q(414)-.04+t*.155,Z(430+t*7.2)],c,f,.01)}let C=(e,t,n,r,i=.8,a=.55)=>{m([r,.21,i],[e,t+.115,n],15001315,d,.055),m([r-.09,.14,i-.08],[e,t+.29,n],u,[.8,0,0,.94],.07),m([r,a-.24,.14],[e,t+.24+(a-.24)/2,n-i/2+.04],u,[.8,0,0,.92],.065);for(let o of[-1,1])m([.15,a-.2,i],[e+o*(r/2-.06),t+.2+(a-.2)/2,n],u,[.8,0,0,.94],.055)};C(0,b+.04,Z(252),3.8,1.01,.58),C(-1.58,x+.04,Z(357),1.03,.82,.62),C(1.58,x+.04,Z(357),1.03,.82,.62),C(-1.48,x+.04,Z(310),1.03,.82,.62),C(1.48,x+.04,Z(310),1.03,.82,.62);for(let e of[-1.52,1.52])C(e,S-.14,Z(516),1.01,2.1,.53);for(let e of[-1.8,-.65,.65,1.8])m([.82,.14,1.8],[e,S+.03,Z(438)],u,[.8,0,0,.95],.06);m([1.05,.08,2.25],[0,S+.47,Z(548)],c,f,.07),h([0,S,Z(548)],[0,S+.43,Z(548)],.065),m([3.58,.46,.65],[0,S+.13,Z(663)],a,d,.09),m([3.7,.07,.75],[0,S+.41,Z(663)],c,f,.045);let w=e=>wa([[916,420],[995,423],[1120,428],[1230,434],[1310,441]],e);for(let[e,t,n]of[[3.75,1.65,1007],[2.78,1.55,1168]]){let r=Z(n);m([e,.2,t],[0,w(r)+.13,r],u,[.8,0,0,.97],.075)}for(let e of[-1,1])C(e*1.3,w(Z(1095)),Z(1095),.98,2.05,.53);m([1.05,.085,1.25],[0,w(Z(1100))+.43,Z(1100)],c,f,.06);for(let e of[-1,1]){let n=e*1.18,r=Z(560);t.add(new ti(.45,.47,.2,i?16:10).translate(n,Q(280)+.12,r),3422780,[.2,.22,0,1]),t.add(new ei(.63,i?20:12,i?14:9).scale(1,1.12,1).translate(n,Q(247),r),3422780,[.13,.18,0,1])}let T=Z(588);h([0,Q(193),T],[0,Q(121),T],.017,3225658,[.25,.25,0,1]);for(let e of[122,138,154])h([0,Q(e),T],[0,Q(e),T+.23],.015,3225658,[.25,.25,0,1]);for(let[e,t,n]of[[585,193,1.4],[590,225,1.62],[597,262,1.04]]){let r=Z(e);m([.2,.105,n],[0,Q(t),r+n*.28],14278105,[.22,.18,0,1],.02)}h([-1.87,Q(283),Z(620)],[-1.87,Q(311),Z(620)],.022),h([1.87,Q(283),Z(680)],[1.87,Q(344),Z(680)],.023);for(let e of[-1,1]){let n=-$.draft+.56,r=e*1.52,i=-13.9;h([r,-.55,-8.2],[r,n,i],.075,7896181,p),h([r,n,-13.55],[r,n,-14.280000000000001],.14,10914897,p);for(let e=0;e<5;e++){let a=e*Math.PI*2/5,o=new $r(.16,.51,.045).rotateZ(-a).translate(r+Math.sin(a)*.3,n+Math.cos(a)*.3,i);t.add(o,10914897,p)}m([.12,.015,.03],[r,-$.draft+.0075,i],10914897,p,0),m([.09,.72,.7],[r,-1.56,-15.42],2700598,[.4,.1,0,1],.02)}let E=new ha({name:`Azimut exterior batched gelcoat teak steel`,vertexColors:!0,clearcoat:.65,clearcoatRoughness:.15,attributes:{aSurface:`vec4f`},varyings:{vSurface:`vec4f`,vLocal:`vec3f`},vertex:`o.vSurface = v.aSurface; o.vLocal = v.position;`,surface:`
      let data = in.vs.vSurface;
      s.roughness = data.x; s.metalness = data.y; s.ao = data.w;
      s.clearcoat = (1.0 - data.y) * select(.65, 0.0, data.z > .5 && data.z < 2.5);
      s.clearcoatRoughness = .15;
      if (data.z > .5 && data.z < 1.5) {
        let p = in.vs.vLocal;
        let plank = p.x / .105;
        let seam = smoothstep(.025, .045 + fwidth(plank), min(fract(plank), 1.0 - fract(plank)));
        let grain = .96 + .035 * sin(p.z * 37.0 + sin(p.x * 310.0) * 1.2);
        s.albedo *= mix(.38, grain, seam);
        s.clearcoat = 0.0;
      }
      let wet = 1.0 - smoothstep(-.08, .28, in.P.y);
      if (data.z > 2.5) {
        let antifoul = 1.0 - smoothstep(-.02, .04, in.vs.vLocal.y);
        s.albedo = mix(s.albedo, vec3f(.018, .028, .030), antifoul);
      }
      s.roughness = mix(s.roughness, .15, wet * .5);
      s.albedo *= 1.0 - wet * .14;
    `}),D=new ha({name:`Azimut sealed reflective exterior glazing`,vertexColors:!0,roughness:.1,metalness:.02,envMapIntensity:.06,clearcoat:.65,clearcoatRoughness:.055,specularIntensity:1,attributes:{aSurface:`vec4f`},varyings:{vSurface:`vec4f`},vertex:`o.vSurface = v.aSurface;`,surface:`s.roughness = in.vs.vSurface.x; s.ao = in.vs.vSurface.w; s.clearcoat = 1.0; s.clearcoatRoughness = .055;`}),O=new Er;O.name=$.name;for(let[e,r,i]of[[t,E,`Merged exterior`],[n,D,`Merged glazing`]]){let t=new qr(e.geometry(),r);t.name=i,t.castShadow=!0,O.add(t)}let k=new ha({name:`Trideck transparent exterior glass guards`,color:15135732,roughness:.085,transparent:!0,opacity:.14,depthWrite:!0,side:`front`,clearcoat:.65,clearcoatRoughness:.07,envMapIntensity:.45,surface:`s.alpha = .12 + .20 * pow(1.0 - abs(dot(in.N, in.V)), 5.0);`}),A=new qr(r.geometry(),k);A.name=`Glass balustrades`,A.castShadow=!1,O.add(A);let j=O.children.reduce((e,t)=>e+t.geometry.attributes.position.count/3,0),M=O.children.reduce((e,t)=>e+Object.values(t.geometry.attributes).reduce((e,t)=>e+t.array.byteLength,0),0);return O.userData={geometryRevision:2,profileReference:ba.url,spec:$,exteriorOnly:!0,detail:e,triangles:j,vertexBytes:M,colorDraws:3,textureBytes:0},{object:O,spec:$,stats:O.userData,buoyancy:Na(),dispose(){for(let e of O.children)e.geometry.dispose(),e.material.dispose()}}}var za=class{constructor({targetFPS:e=45,mode:t=`full`,maximumScale:n=2,minimumScale:r=.5}={}){this.targetFPS=e,this.minimumScale=r,this.maximumScale=n,this.mode=t,this.scale=t===`full`?n:Math.min(1,n),this.reset()}reset(){this.started=null,this.lastTime=null,this.lastCompleted=null,this.frames=0,this.elapsed=0,this.fastSince=null,this.lastChange=-1/0,this.fps=null,this.cpuMs=0,this.samples=[],this.changes=0}setMode(e){if(![`full`,`auto`,`performance`].includes(e))throw RangeError(`Unknown water quality mode`);return this.mode=e,this.scale=e===`full`?this.maximumScale:Math.min(1,this.maximumScale),this.reset(),this.scale}setMaximum(e){return this.maximumScale=e,this.scale=this.mode===`full`?e:Math.min(this.scale,e),this.reset(),this.scale}observe(e,t,n=0,r=!1){if(this.cpuMs=n,r)return this.lastTime=null,this.lastCompleted=null,this.fps=null,null;if(this.lastTime===null||e-this.lastTime>15e3||t<this.lastCompleted)return this.lastTime=e,this.lastCompleted=t,this.started=e,this.frames=0,this.elapsed=0,null;let i=e-this.lastTime,a=t-this.lastCompleted;if(this.lastTime=e,this.lastCompleted=t,i<=0||(this.frames+=a,this.elapsed+=i,this.elapsed<700||this.frames<2))return null;let o=this.frames*1e3/this.elapsed,s=1e3/o;if(this.fps=o,this.frames=0,this.elapsed=0,this.samples.push({time:e,fps:o,scale:this.scale,cpuMs:n}),this.samples.length>120&&this.samples.shift(),this.mode===`full`||e-this.started<1e3||e-this.lastChange<1e3)return null;let c=1e3/this.targetFPS,l=this.scale;return s>c*1.08?(this.fastSince=null,l=Math.max(this.minimumScale,Math.min(this.scale*.9,this.scale*Math.sqrt(c*.82/s)))):s<c*.8?(this.fastSince??=e,e-this.fastSince>5e3&&(l=Math.min(this.mode===`performance`?Math.min(1,this.maximumScale):this.maximumScale,this.scale*1.08))):this.fastSince=null,l=Math.min(this.maximumScale,Math.max(this.minimumScale,Math.round(l*20)/20)),Math.abs(l-this.scale)<.049?null:(this.scale=l,this.lastChange=e,this.fastSince=null,this.changes++,l)}get limited(){return this.fps!==null&&this.fps<this.targetFPS*.9&&this.scale<=this.minimumScale+.01}},Ba=document.querySelector(`#status`);document.querySelector(`#map-link`).hidden=!0;try{let e=new mr(document.querySelector(`#app`));await e.init();let n=new URLSearchParams(location.search).get(`quality`),r=/Android|iPhone|iPad/.test(navigator.userAgent)||matchMedia(`(max-width: 650px)`).matches,i=[`full`,`auto`,`performance`].includes(n)?n:r?`auto`:`full`;document.documentElement.dataset.waterQuality=i;let a=()=>Math.min(window.devicePixelRatio||1,2,Math.sqrt(3686400/(innerWidth*innerHeight))),o=new za({mode:i,maximumScale:a()}),s=()=>e.setRenderScale(o.setMaximum(a()));s(),window.addEventListener(`resize`,s),e.renderOptimizations.framePacing=!0;let c=da({mobilePerformance:i!==`full`}),u=Ra({detail:matchMedia(`(max-width: 650px)`).matches?`low`:`high`}),d=c.addObject(u.object,u.buoyancy),f=e.camera;f.far=1e3,f.fov=48,f.updateProjectionMatrix();let p=!1,m=`yacht`,h=Math.PI/4,g=.7,_=90,v=!1,y=32;function b(t){let n=performance.now();c.render(f,e.width,e.height,e.currentTexture().createView(),p?0:Math.max(0,t));let r=o.observe(performance.now(),e.pacingStats.completed,performance.now()-n,p);r!==null&&e.setRenderScale(r),p&&--y<=0&&e.stop()}function x(){y=32,v&&!document.hidden&&!e._running&&(o.reset(),e.start(b))}e.onResize.push(x);let S=new l(0,-2,0);function C(){f.position.set(S.x+Math.sin(h)*Math.cos(g)*_,S.y+Math.sin(g)*_,S.z+Math.cos(h)*Math.cos(g)*_),f.lookAt(S),x()}function w(e){c.resetHistory(),m=e,h=e===`yacht`?1.248:Math.PI/4,f.fov=e===`yacht`?34.1:48,f.updateProjectionMatrix(),e===`underwater`?(S.set(0,-5,0),g=.04,_=15):e===`yacht`?(S.set(0,5.44,0),g=.0783,_=58.8*Math.max(1,1.15/f.aspect)):(S.set(0,-2,0),g=e===`surface`?.2:.7,_=e===`surface`?65:90);for(let t of document.querySelectorAll(`[data-view]`))t.setAttribute(`aria-pressed`,String(t.dataset.view===e));C()}for(let e of document.querySelectorAll(`[data-view]`))e.addEventListener(`click`,()=>w(e.dataset.view));let T=document.querySelector(`#pause`);T.addEventListener(`click`,()=>{p=!p,T.textContent=p?`Resume water`:`Pause water`,T.setAttribute(`aria-pressed`,String(p)),o.reset(),x()});let E=document.querySelector(`#wave-size`);E.addEventListener(`input`,()=>{c.waves.strength=Number(E.value),x()});let D=document.querySelector(`#sun-angle`);D.addEventListener(`input`,()=>{c.lighting.setSun(Number(D.value)),x()}),document.querySelector(`#toggle-yacht`).addEventListener(`click`,e=>{d?(c.removeObject(d),d=null):d=c.addObject(u.object,u.buoyancy),e.currentTarget.textContent=d?`Hide yacht`:`Show yacht`,e.currentTarget.setAttribute(`aria-pressed`,String(!!d)),x()}),document.querySelector(`#reset-yacht`).addEventListener(`click`,()=>{u.object.position.set(0,0,0),u.object.quaternion.identity(),d&&(d.velocity.set(0,0,0),d.angularVelocity.set(0,0,0)),w(`yacht`)});let O=new Set;function k(){let e=new Rn({name:`Water test float`,color:12363904,lit:!1,surface:`s.albedo *= 0.35 + 0.65 * max(dot(in.N, normalize(vec3f(-0.45, 0.8, 0.3))), 0.0);`}),t=new qr(new $r(3,1.2,2),e),n=O.size;t.position.set((n%2?-1:1)*(10+Math.floor(n/2)%3*4),2,Math.floor(n/6)*3-2);let r=c.addObject(t,{density:500});return O.add(r),document.querySelector(`#clear-floats`).hidden=!1,x(),r}document.querySelector(`#add-float`).addEventListener(`click`,k),document.querySelector(`#clear-floats`).addEventListener(`click`,e=>{for(let e of O)c.removeObject(e),e.object.geometry.dispose(),e.object.material.dispose();O.clear(),e.currentTarget.hidden=!0,x()});let A=null;e.canvas.addEventListener(`pointerdown`,t=>{t.button===0&&(A={id:t.pointerId,x:t.clientX,y:t.clientY},e.canvas.setPointerCapture(t.pointerId))}),e.canvas.addEventListener(`pointermove`,e=>{A&&A.id===e.pointerId&&(h-=(e.clientX-A.x)*.006,g=Math.max(m===`underwater`?-.25:.06,Math.min(m===`underwater`?.25:1.5,g+(e.clientY-A.y)*.006)),A.x=e.clientX,A.y=e.clientY,C())});let j=()=>{A=null};e.canvas.addEventListener(`pointerup`,j),e.canvas.addEventListener(`pointercancel`,j),e.canvas.addEventListener(`lostpointercapture`,j),e.canvas.addEventListener(`wheel`,e=>{e.preventDefault(),_=Math.max(m===`underwater`?2:40,Math.min(m===`underwater`?20:180,_*Math.exp(e.deltaY*.001))),C()},{passive:!1});let M=document.getElementById(`quality-mode`);M.value=i;function ee(t){let n=o.setMode(t);M.value=t,c.setMobilePerformance(t!==`full`),document.documentElement.dataset.waterQuality=t,c.profiler.result=null,c.profiler.last=-1/0,c.profiler.enabled=document.getElementById(`performance-panel`).open,e.setRenderScale(n),c.resetHistory(),x()}M.addEventListener(`change`,()=>ee(M.value));let te={userAgent:navigator.userAgent,model:null,platformVersion:null,fullVersionList:null};navigator.userAgentData?.getHighEntropyValues?.([`model`,`platformVersion`,`fullVersionList`]).then(e=>{te={...te,model:e.model||null,platformVersion:e.platformVersion||null,fullVersionList:e.fullVersionList||null}}).catch(()=>{});let N=t.adapter.info||{},ne={vendor:N.vendor||null,architecture:N.architecture||null,device:N.device||null,description:N.description||null,isFallbackAdapter:N.isFallbackAdapter??t.adapter.isFallbackAdapter??null,features:[...t.features]};function re(){return{build:`mobile-45-r1`,device:te,gpu:ne,targetFPS:o.targetFPS,fpsMeasurement:`Completed GPU submissions per wall-clock second; physical display presentation is not directly measured.`,measuredCompletedFPS:p?null:o.fps,mode:o.mode,renderScale:o.scale,output:[e.width,e.height],scene:c.aa.stats.input,reflection:[c.reflection.width,c.reflection.height],shadedFraction:c.stats?.shadedFraction,encodeCPUms:o.cpuMs,paused:p,pacing:{...e.pacingStats},geometry:d?u.stats:null,sampleHistory:o.samples.slice(),belowTargetAtMinimum:o.limited,timestampQueriesAvailable:t.hasTimestamp,gpuTiming:c.profiler.result}}let ie=document.getElementById(`fps-value`),ae=document.getElementById(`performance-detail`);document.getElementById(`performance-panel`).addEventListener(`toggle`,e=>{c.profiler.enabled=e.currentTarget.open,e.currentTarget.open&&x()});let oe=setInterval(()=>{if(ie.textContent=p?`Paused`:o.fps===null?`Measuring…`:`${o.fps.toFixed(0)} FPS`,document.getElementById(`performance-panel`).open){let t=ne.description||[ne.vendor,ne.architecture].filter(Boolean).join(` `)||`GPU details unavailable`;ae.textContent=`${te.model||`Phone model unavailable`} · ${t}\n${e.width} × ${e.height} · ${o.mode===`full`?`Full quality`:`Adaptive resolution`}\n${o.limited?`Below 45 FPS at minimum resolution.`:o.mode===`full`?`Original rendering quality.`:`Targets 45 FPS; actual speed depends on your GPU.`}`}},500);if(document.getElementById(`copy-performance`).addEventListener(`click`,async e=>{let t=e.currentTarget,n=JSON.stringify(re(),null,2);try{await navigator.clipboard.writeText(n),t.textContent=`Copied`}catch{ae.textContent=n}}),w(`yacht`),await t.pipelinesReady(),[c.pass,...c.aa.resolve,c.aa.present].some(e=>e.handle.failed))throw Error(`The water or anti-aliasing shader could not compile.`);c.render(f,e.width,e.height,e.currentTexture().createView(),0),await t.queue.onSubmittedWorkDone(),v=!0,x(),window.__waterMap={engine:e,renderer:c,spec:W,yacht:u,setView:w,addTestFloat:k,requestRender:x,quality:o,setQuality:ee,performanceReport:re,get yachtBody(){return d},addObject:(e,t)=>{let n=c.addObject(e,t);return x(),n},removeObject:e=>{let t=c.removeObject(e);return x(),t},get paused(){return p}},document.addEventListener(`visibilitychange`,()=>document.hidden?e.stop():x()),window.addEventListener(`pagehide`,t=>{e.stop(),t.persisted||clearInterval(oe)}),window.addEventListener(`pageshow`,x),document.getElementById(`performance-panel`).hidden=!1,Ba.hidden=!0}catch(e){Ba.hidden=!1,Ba.textContent=`Water could not start: `+e.message,console.error(e)}