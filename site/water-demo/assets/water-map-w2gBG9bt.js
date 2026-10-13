(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e=globalThis.location?.search||``){let t=new URLSearchParams(e),n=t.has(`renderReference`),r=t.get(`world`)===`rocha`;return{reference:n,bindingReuse:r&&!n&&!t.has(`noRenderV2`)&&!t.has(`noBindingReuse`),framePacing:r&&!n&&!t.has(`noRenderV2`)&&!t.has(`noFramePacing`),compactTargets:!n&&!t.has(`noCompactSceneTargets`)&&(r||t.has(`compactSceneTargets`)),depthRotation:!n&&!t.has(`noDepthRotation`)&&(r||t.has(`depthRotation`)),tiledTAA:!n&&t.has(`tiledTAA`)&&!t.has(`noTiledTAA`)}}var t={device:null,queue:null,adapter:null,context:null,canvas:null,format:`bgra8unorm`,features:new Set,limits:null,hasTimestamp:!1,hasFloat32Filterable:!1,encoder:null,frame:0,samplers:null,_submitHooks:[],async init({canvas:e=null,requiredLimits:t={},headless:n=!1}={}){if(!navigator.gpu)throw Error(`WebGPU is not available in this browser.`);let r=await navigator.gpu.requestAdapter({powerPreference:`high-performance`});if(!r)throw Error(`No WebGPU adapter found.`);this.adapter=r;let i=r.limits,a={maxSampledTexturesPerShaderStage:32,maxSamplersPerShaderStage:16,maxStorageBuffersPerShaderStage:10,maxStorageTexturesPerShaderStage:8,maxComputeWorkgroupStorageSize:32768,maxColorAttachmentBytesPerSample:64,maxStorageBuffersInVertexStage:4,maxStorageBuffersInFragmentStage:8,maxStorageTexturesInFragmentStage:4,maxBindingsPerBindGroup:1e3,maxBufferSize:1073741824,maxStorageBufferBindingSize:536870912,...t},o={};for(let e in a)i[e]!==void 0&&(o[e]=Math.min(a[e],i[e]));let s=[`float32-filterable`,`timestamp-query`,`rg11b10ufloat-renderable`,`float32-blendable`,`shader-f16`,`clip-distances`].filter(e=>r.features.has(e));this.features=new Set(s),this.hasTimestamp=this.features.has(`timestamp-query`),this.hasFloat32Filterable=this.features.has(`float32-filterable`);let c=await r.requestDevice({requiredFeatures:s,requiredLimits:o});return this.device=c,this.queue=c.queue,this.limits=c.limits,c.lost.then(e=>console.error(`WebGPU device lost:`,e.message)),c.addEventListener&&c.addEventListener(`uncapturederror`,e=>console.error(`WebGPU:`,e.error.message.split(`
`).slice(0,6).join(`
`))),e&&!n&&(this.canvas=e,this.context=e.getContext(`webgpu`),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:c,format:this.format,alphaMode:`opaque`,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST})),this._createSamplers(),this},_createSamplers(){let e=this.device,t=t=>e.createSampler(t),n={magFilter:`linear`,minFilter:`linear`,mipmapFilter:`linear`};this.samplers={linearRepeat:t({...n,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`}),linearClamp:t({...n,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`,addressModeW:`clamp-to-edge`}),linearMirror:t({...n,addressModeU:`mirror-repeat`,addressModeV:`mirror-repeat`,addressModeW:`mirror-repeat`}),anisoRepeat:t({...n,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`,maxAnisotropy:8}),aniso4Repeat:t({...n,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`,maxAnisotropy:4}),anisoClamp:t({...n,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`,maxAnisotropy:8}),nearestClamp:t({magFilter:`nearest`,minFilter:`nearest`,mipmapFilter:`nearest`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`,addressModeW:`clamp-to-edge`}),nearestRepeat:t({magFilter:`nearest`,minFilter:`nearest`,mipmapFilter:`nearest`,addressModeU:`repeat`,addressModeV:`repeat`,addressModeW:`repeat`}),shadow:t({magFilter:`linear`,minFilter:`linear`,compare:`less`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`})}},beginFrame(){return this.frame++,this.getEncoder()},getEncoder(){return this.encoder||=this.device.createCommandEncoder(),this.encoder},submit(){if(!this.encoder)return;let e=this._submitHooks;this._submitHooks=[];for(let t of e)t.before&&t.before(this.encoder);this.queue.submit([this.encoder.finish()]),this.encoder=null;for(let t of e)t.after&&t.after()},onSubmit(e,t){this._submitHooks.push({before:e,after:t})},_pending:new Set,syncCompiles:[],renderPipeline(e){return this._async(e,`render`)},computePipeline(e){return this._async(e,`compute`)},_async(e,t){let n={pipeline:null,label:e.label,desc:e,kind:t,failed:!1},r=Promise.resolve().then(()=>{if(!n.pipeline)return(t===`render`?this.device.createRenderPipelineAsync:this.device.createComputePipelineAsync).call(this.device,e).then(e=>{n.pipeline||=e,n.desc=null},t=>{n.failed=!0,console.error(`WebGPU: pipeline "${e.label}" failed: ${t.message.split(`
`).slice(0,6).join(`
`)}`)})}).finally(()=>this._pending.delete(r));return this._pending.add(r),n},ready(e){return e.pipeline||e.failed?e.pipeline:(this.syncCompiles.push(e.label),e.pipeline=e.kind===`render`?this.device.createRenderPipeline(e.desc):this.device.createComputePipeline(e.desc),e.pipeline)},async pipelinesReady(){for(;this._pending.size;)await Promise.all([...this._pending])},computePass(e,t,n){let r=this.getEncoder().beginComputePass({label:e,timestampWrites:n});t(r),r.end()}},n={r8unorm:{bytes:1,sample:`float`},rg8unorm:{bytes:2,sample:`float`},rgba8unorm:{bytes:4,sample:`float`},"rgba8unorm-srgb":{bytes:4,sample:`float`},bgra8unorm:{bytes:4,sample:`float`},r16float:{bytes:2,sample:`float`},rg16float:{bytes:4,sample:`float`},rgba16float:{bytes:8,sample:`float`},rg11b10ufloat:{bytes:4,sample:`float`},r32float:{bytes:4,sample:`unfilterable-float`},rg32float:{bytes:8,sample:`unfilterable-float`},rgba32float:{bytes:16,sample:`unfilterable-float`},r32uint:{bytes:4,sample:`uint`},rg32uint:{bytes:8,sample:`uint`},rgba32uint:{bytes:16,sample:`uint`},r32sint:{bytes:4,sample:`sint`},r8uint:{bytes:1,sample:`uint`},rgba8uint:{bytes:4,sample:`uint`},depth32float:{bytes:4,sample:`depth`},depth24plus:{bytes:4,sample:`depth`},"depth24plus-stencil8":{bytes:4,sample:`depth`}};function r(e){let t=n[e];if(!t)throw Error(`Unknown texture format `+e);return t}function i(e){let n=r(e).sample;return n===`unfilterable-float`&&t.hasFloat32Filterable?`float`:n}var a=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].includes(t)||n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].includes(t)}removeEventListener(e,t){let n=this._listeners&&this._listeners[e];if(n===void 0)return;let r=n.indexOf(t);r!==-1&&n.splice(r,1)}dispatchEvent(e){let t=this._listeners&&this._listeners[e.type];if(t!==void 0){e.target=this;for(let n of t.slice())n.call(this,e);e.target=null}}},o=class e{constructor(e=0,t=0,n=0,r=1){this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback=s}static slerpFlat(t,n,r,i,a,o,s){let c=new e().fromArray(r,i),l=new e().fromArray(a,o);c.slerp(l,s).toArray(t,n)}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new e(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}identity(){return this.set(0,0,0,1)}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos(n/2),s=Math.cos(r/2),c=Math.cos(i/2),l=Math.sin(n/2),u=Math.sin(r/2),d=Math.sin(i/2);switch(a){case`XYZ`:this._x=l*s*c+o*u*d,this._y=o*u*c-l*s*d,this._z=o*s*d+l*u*c,this._w=o*s*c-l*u*d;break;case`YXZ`:this._x=l*s*c+o*u*d,this._y=o*u*c-l*s*d,this._z=o*s*d-l*u*c,this._w=o*s*c+l*u*d;break;case`ZXY`:this._x=l*s*c-o*u*d,this._y=o*u*c+l*s*d,this._z=o*s*d+l*u*c,this._w=o*s*c-l*u*d;break;case`ZYX`:this._x=l*s*c-o*u*d,this._y=o*u*c+l*s*d,this._z=o*s*d-l*u*c,this._w=o*s*c+l*u*d;break;case`YZX`:this._x=l*s*c+o*u*d,this._y=o*u*c+l*s*d,this._z=o*s*d-l*u*c,this._w=o*s*c-l*u*d;break;case`XZY`:this._x=l*s*c-o*u*d,this._y=o*u*c-l*s*d,this._z=o*s*d+l*u*c,this._w=o*s*c+l*u*d;break;default:throw Error(`Quaternion.setFromEuler: unknown order `+a)}return t&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.x*t.x+e.y*t.y+e.z*t.z+1;return n<2**-52?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Math.max(-1,Math.min(1,this.dot(e)))))}rotateTowards(e,t){let n=this.angleTo(e);return n===0?this:this.slerp(e,Math.min(1,t/n))}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this.lengthSq())}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,i=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+i*e._z,s=e._x,c=e._y,l=e._z,u=e._w;if(o<0&&(s=-s,c=-c,l=-l,u=-u,o=-o),o>=1)return this;let d=1-o*o;if(d<=2**-52){let e=1-t;return this._w=e*a+t*u,this._x=e*n+t*s,this._y=e*r+t*c,this._z=e*i+t*l,this.normalize()}let f=Math.sqrt(d),p=Math.atan2(f,o),m=Math.sin((1-t)*p)/f,h=Math.sin(t*p)/f;return this._w=a*m+u*h,this._x=n*m+s*h,this._y=r*m+c*h,this._z=i*m+l*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this.set(e.getX(t),e.getY(t),e.getZ(t),e.getW(t))}_onChange(e){return this._onChangeCallback=e,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};function s(){}o.prototype.isQuaternion=!0;var c=new o,l=class e{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){return e===0?this.x=t:e===1?this.y=t:this.z=t,this}getComponent(e){return e===0?this.x:e===1?this.y:this.z}clone(){return new e(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}applyEuler(e){return this.applyQuaternion(c.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(c.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){let t=this.dot(e)/(e.lengthSq()||1);return this.addScaledVector(e,-t)}reflect(e){return this.addScaledVector(e,-2*this.dot(e))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(e)/t)))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.set(t,n,r)}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};l.prototype.isVector3=!0;var u=2001,d=new l,f=new l,p=new l,m=new l,h=new o,g=new l(1,1,1),_=new l,v=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)t[e]=n[e];return this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1)}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1)}extractRotation(e){let t=this.elements,n=e.elements,r=1/d.setFromMatrixColumn(e,0).length(),i=1/d.setFromMatrixColumn(e,1).length(),a=1/d.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){return this.compose(_,h.setFromEuler(e,!1),g)}makeRotationFromQuaternion(e){return this.compose(_,e,g)}lookAt(e,t,n){let r=this.elements;return m.subVectors(e,t),m.lengthSq()===0&&(m.z=1),m.normalize(),f.crossVectors(n,m),f.lengthSq()===0&&(Math.abs(n.z)===1?m.x+=1e-4:m.z+=1e-4,m.normalize(),f.crossVectors(n,m)),f.normalize(),p.crossVectors(m,f),r[0]=f.x,r[4]=p.x,r[8]=m.x,r[1]=f.y,r[5]=p.y,r[9]=m.y,r[2]=f.z,r[6]=p.z,r[10]=m.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],te=r[14],ne=r[3],re=r[7],ie=r[11],ae=r[15];return i[0]=a*x+o*T+s*k+c*ne,i[4]=a*S+o*E+s*A+c*re,i[8]=a*C+o*D+s*ee+c*ie,i[12]=a*w+o*O+s*te+c*ae,i[1]=l*x+u*T+d*k+f*ne,i[5]=l*S+u*E+d*A+f*re,i[9]=l*C+u*D+d*ee+f*ie,i[13]=l*w+u*O+d*te+f*ae,i[2]=p*x+m*T+h*k+g*ne,i[6]=p*S+m*E+h*A+g*re,i[10]=p*C+m*D+h*ee+g*ie,i[14]=p*w+m*O+h*te+g*ae,i[3]=_*x+v*T+y*k+b*ne,i[7]=_*S+v*E+y*A+b*re,i[11]=_*C+v*D+y*ee+b*ie,i[15]=_*w+v*O+y*te+b*ae,this}multiplyScalar(e){let t=this.elements;for(let n=0;n<16;n++)t[n]*=e;return this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=d*g-f*h,v=u*g-f*m,y=u*h-d*m,b=l*g-f*p,x=l*h-d*p,S=l*m-u*p;return t*(o*_-s*v+c*y)-n*(a*_-s*b+c*x)+r*(a*v-o*b+c*S)-i*(a*y-o*x+s*S)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements;return t[0]*=e.x,t[4]*=e.y,t[8]*=e.z,t[1]*=e.x,t[5]*=e.y,t[9]*=e.z,t[2]*=e.x,t[6]*=e.y,t[10]*=e.z,t[3]*=e.x,t[7]*=e.y,t[11]*=e.z,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1)}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1)}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1)}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1)}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1)}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1)}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1)}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,i=Math.hypot(r[0],r[1],r[2]),a=Math.hypot(r[4],r[5],r[6]),o=Math.hypot(r[8],r[9],r[10]);this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14];let s=y.copy(this),c=s.elements,l=1/i,u=1/a,d=1/o;return c[0]*=l,c[1]*=l,c[2]*=l,c[4]*=u,c[5]*=u,c[6]*=u,c[8]*=d,c[9]*=d,c[10]*=d,t.setFromRotationMatrix(s),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,r,i,a,o=u,s=!0){let c=this.elements,l=2*i/(t-e),d=2*i/(n-r),f=(t+e)/(t-e),p=(n+r)/(n-r),m,h,g=a===1/0;if(s){if(o!==2001)throw Error(`Matrix4.makePerspective: reversed depth requires WebGPU clip space`);m=g?0:i/(a-i),h=g?i:a*i/(a-i)}else o===2001?(m=g?-1:-a/(a-i),h=g?-i:-a*i/(a-i)):(m=g?-1:-(a+i)/(a-i),h=g?-2*i:-2*a*i/(a-i));return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=h,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=u,s=!0){let c=this.elements,l=1/(t-e),d=1/(n-r),f=1/(a-i),p=(t+e)*l,m=(n+r)*d,h,g;return s?(h=a*f,g=f):o===2001?(h=-i*f,g=-f):(h=-(a+i)*f,g=-2*f),c[0]=2*l,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=g,c[14]=h,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){for(let t=0;t<16;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;for(let r=0;r<16;r++)e[t+r]=n[r];return e}};v.prototype.isMatrix4=!0;var y=new v,b=new v,x=new o,S=e=>Math.max(-1,Math.min(1,e)),C=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this._x=t,this._y=n,this._z=r,this._order=i,this._onChangeCallback=w}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new e(this._x,this._y,this._z,this._order)}copy(e){return this.set(e._x,e._y,e._z,e._order)}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10],p=.9999999;switch(t){case`XYZ`:this._y=Math.asin(S(o)),Math.abs(o)<p?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-S(l)),Math.abs(l)<p?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(S(d)),Math.abs(d)<p?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-S(u)),Math.abs(u)<p?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(S(s)),Math.abs(s)<p?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-S(a)),Math.abs(a)<p?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:throw Error(`Euler.setFromRotationMatrix: unknown order `+t)}return this._order=t,n&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return b.makeRotationFromQuaternion(e),this.setFromRotationMatrix(b,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return x.setFromEuler(this),this.setFromQuaternion(x,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};function w(){}C.DEFAULT_ORDER=`XYZ`,C.prototype.isEuler=!0;var T=class e{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1)}copy(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)t[e]=n[e];return this}clone(){return new e().fromArray(this.elements)}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10])}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;for(let n=0;n<9;n++)t[n]*=e;return this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}makeTranslation(e,t){return e.isVector2&&(t=e.y,e=e.x),this.set(1,0,e,0,1,t,0,0,1)}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1)}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1)}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1)}scale(e,t){return this.premultiply(E.makeScale(e,t))}rotate(e){return this.premultiply(E.makeRotation(-e))}translate(e,t){return this.premultiply(E.makeTranslation(e,t))}equals(e){for(let t=0;t<9;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){for(let n=0;n<9;n++)e[t+n]=this.elements[n];return e}};T.prototype.isMatrix3=!0;var E=new T,D=Math.PI/180,O=180/Math.PI,k=[];for(let e=0;e<256;e++)k[e]=(e<16?`0`:``)+e.toString(16);function A(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(k[e&255]+k[e>>8&255]+k[e>>16&255]+k[e>>24&255]+`-`+k[t&255]+k[t>>8&255]+`-`+k[t>>16&15|64]+k[t>>24&255]+`-`+k[n&63|128]+k[n>>8&255]+`-`+k[n>>16&255]+k[n>>24&255]+k[r&255]+k[r>>8&255]+k[r>>16&255]+k[r>>24&255]).toLowerCase()}var ee=(e,t,n)=>Math.max(t,Math.min(n,e)),te=(e,t)=>(e%t+t)%t,ne=(e,t,n,r,i)=>r+(e-t)*(i-r)/(n-t),re=(e,t,n)=>e===t?0:(n-e)/(t-e),ie=(e,t,n)=>(1-n)*e+n*t,ae=(e,t,n,r)=>ie(e,t,1-Math.exp(-n*r)),oe=(e,t=1)=>t-Math.abs(te(e,t*2)-t);function se(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function ce(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}var le=(e,t)=>e+Math.floor(Math.random()*(t-e+1)),ue=(e,t)=>e+Math.random()*(t-e),de=e=>e*(.5-Math.random()),fe=1234567;function pe(e){e!==void 0&&(fe=e);let t=fe+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}var me=e=>e*D,he=e=>e*O,ge=e=>!(e&e-1)&&e!==0,_e=e=>2**Math.ceil(Math.log(e)/Math.LN2),ve=e=>2**Math.floor(Math.log(e)/Math.LN2);function ye(e,t){switch(t.constructor){case Float32Array:case Float64Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:return e}}function be(e,t){switch(t.constructor){case Float32Array:case Float64Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:return e}}var xe={normalize:be,denormalize:ye,DEG2RAD:D,RAD2DEG:O,generateUUID:A,clamp:ee,euclideanModulo:te,mapLinear:ne,inverseLerp:re,lerp:ie,damp:ae,pingpong:oe,smoothstep:se,smootherstep:ce,randInt:le,randFloat:ue,randFloatSpread:de,seededRandom:pe,degToRad:me,radToDeg:he,isPowerOfTwo:ge,ceilPowerOfTwo:_e,floorPowerOfTwo:ve},Se=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},Ce=0,we=new l,Te=new o,j=new v,Ee=new l,De=new l,Oe=new l,ke=new o,Ae=new l(1,0,0),je=new l(0,1,0),Me=new l(0,0,1),Ne={type:`added`},Pe={type:`removed`},Fe={type:`childadded`,child:null},Ie={type:`childremoved`,child:null},Le=class e extends a{constructor(){super(),Object.defineProperty(this,"id",{value:Ce++}),this.uuid=A(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new l,n=new C,r=new o,i=new l(1,1,1);n._onChange(()=>r.setFromEuler(n,!1)),r._onChange(()=>n.setFromQuaternion(r,void 0,!1)),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new v},normalMatrix:{value:new T}}),this.matrix=new v,this.matrixWorld=new v,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Se,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}onBeforeRender(){}onAfterRender(){}onBeforeShadow(){}onAfterShadow(){}dispose(){this.dispatchEvent({type:`dispose`})}applyMatrix4(e){return this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Te.setFromAxisAngle(e,t),this.quaternion.multiply(Te),this}rotateOnWorldAxis(e,t){return Te.setFromAxisAngle(e,t),this.quaternion.premultiply(Te),this}rotateX(e){return this.rotateOnAxis(Ae,e)}rotateY(e){return this.rotateOnAxis(je,e)}rotateZ(e){return this.rotateOnAxis(Me,e)}translateOnAxis(e,t){return we.copy(e).applyQuaternion(this.quaternion),this.position.add(we.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ae,e)}translateY(e){return this.translateOnAxis(je,e)}translateZ(e){return this.translateOnAxis(Me,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(j.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ee.copy(e):Ee.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),De.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?j.lookAt(De,Ee,this.up):j.lookAt(Ee,De,this.up),this.quaternion.setFromRotationMatrix(j),r&&(j.extractRotation(r.matrixWorld),Te.setFromRotationMatrix(j),this.quaternion.premultiply(Te.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this||e&&e.isObject3D&&(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ne),Fe.child=e,this.dispatchEvent(Fe),Fe.child=null),this}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Pe),Ie.child=e,this.dispatchEvent(Ie),Ie.child=null),this}removeFromParent(){return this.parent!==null&&this.parent.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),j.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),j.multiply(e.parent.matrixWorld)),e.applyMatrix4(j),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ne),this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n of this.children){let r=n.getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);for(let r of this.children)r.getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(De,e,Oe),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(De,ke,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(n===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(n.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].matrixWorldAutoUpdate===!0&&e[t].updateWorldMatrix(!1,!0)}}clone(e){return new this.constructor().copy(this,e)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,t.onBeforeRender!==e.prototype.onBeforeRender&&(this.onBeforeRender=t.onBeforeRender),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let e of t.children)this.add(e.clone());return this}};Le.DEFAULT_UP=new l(0,1,0),Le.DEFAULT_MATRIX_AUTO_UPDATE=!0,Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,Le.prototype.isObject3D=!0;var M=class e{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){return e===0?this.x=t:this.y=t,this}getComponent(e){return e===0?this.x:this.y}clone(){return new e(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(e)/t)))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};M.prototype.isVector2=!0;var Re=new l,ze=new M,Be=new M,Ve=class extends Le{constructor(){super(),this.type=`Camera`,this.matrixWorldInverse=new v,this.projectionMatrix=new v,this.projectionMatrixInverse=new v,this.coordinateSystem=u,this.reversedDepth=!0}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this.reversedDepth=e.reversedDepth,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};Ve.prototype.isCamera=!0;function He(e,t,n,r,i,a,o){e.view===null&&(e.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1});let s=e.view;s.enabled=!0,s.fullWidth=t,s.fullHeight=n,s.offsetX=r,s.offsetY=i,s.width=a,s.height=o,e.updateProjectionMatrix()}var Ue=class extends Ve{constructor(e=50,t=1,n=.1,r=2e3){super(),this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.infiniteFar=!1,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.infiniteFar=e.infiniteFar,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=O*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){return .5*this.getFilmHeight()/Math.tan(D*.5*this.fov)}getEffectiveFOV(){return O*2*Math.atan(Math.tan(D*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Re.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Re.x,Re.y).multiplyScalar(-e/Re.z),Re.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Re.x,Re.y).multiplyScalar(-e/Re.z)}getViewSize(e,t){return this.getViewBounds(e,ze,Be),t.subVectors(Be,ze)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,He(this,e,t,n,r,i,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(D*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(a!==null&&a.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth());let s=this.infiniteFar?1/0:this.far;this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,s,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}};Ue.prototype.isPerspectiveCamera=!0;var We=class extends Ve{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){He(this,e,t,n,r,i,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t,c=this.view;if(c!==null&&c.enabled){let e=(this.right-this.left)/c.fullWidth/this.zoom,t=(this.top-this.bottom)/c.fullHeight/this.zoom;i+=e*c.offsetX,a=i+e*c.width,o-=t*c.offsetY,s=o-t*c.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}};We.prototype.isOrthographicCamera=!0;var Ge=class extends Le{constructor(){super(),this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new C,this.environmentIntensity=1,this.environmentRotation=new C,this.overrideMaterial=null}copy(e,t){return super.copy(e,t),this.background=e.background,this.environment=e.environment,this.fog=e.fog,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),this.environmentIntensity=e.environmentIntensity,this.overrideMaterial=e.overrideMaterial,this.matrixAutoUpdate=e.matrixAutoUpdate,this}};Ge.prototype.isScene=!0;var Ke=()=>typeof performance<`u`?performance.now():Date.now(),qe=class{constructor(){this._startTime=Ke(),this._previousTime=0,this._currentTime=0,this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=()=>{e.hidden===!1&&this.reset()},e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=Ke()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?Ke():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}},Je=class{constructor(e){this.pass=e,this.vertices=[],this.indexBuffer=null,this.indexFormat=null,this.drawGroup=null,this.drawOffset=-1,this.offsets=new Uint32Array(1)}bindObject(e,t){(e!==this.drawGroup||t!==this.drawOffset)&&(this.offsets[0]=t,this.pass.setBindGroup(2,e,this.offsets,0,1),this.drawGroup=e,this.drawOffset=t)}bindVertex(e,t){this.vertices[e]!==t&&(this.pass.setVertexBuffer(e,t),this.vertices[e]=t)}bindIndex(e,t){(this.indexBuffer!==e||this.indexFormat!==t)&&(this.pass.setIndexBuffer(e,t),this.indexBuffer=e,this.indexFormat=t)}},Ye={f32:{size:4,align:4,n:1},i32:{size:4,align:4,n:1,int:!0},u32:{size:4,align:4,n:1,uint:!0},vec2f:{size:8,align:8,n:2},vec3f:{size:12,align:16,n:3},vec4f:{size:16,align:16,n:4},vec2i:{size:8,align:8,n:2,int:!0},vec4i:{size:16,align:16,n:4,int:!0},vec2u:{size:8,align:8,n:2,uint:!0},vec4u:{size:16,align:16,n:4,uint:!0},mat3x3f:{size:48,align:16,n:12,mat3:!0},mat4x4f:{size:64,align:16,n:16}};function Xe(e){let t=/^(\w+)(?:\[(\d+)\])?$/.exec(e);if(!t||!Ye[t[1]])throw Error(`Unsupported uniform type `+e);let n=Ye[t[1]],r=t[2]?Number(t[2]):0;if(r&&n.align<16)throw Error(`uniform array ${e}: element must be 16-byte aligned (use vec4f)`);return{name:t[1],base:n,count:r}}function Ze(e,t,n,r,i,a){let{base:o}=i,s=o.int?n:o.uint?t:e;if(typeof a==`number`||typeof a==`boolean`){s[r]=Number(a);return}if(a!=null){if(a.isMatrix4||a.isMatrix3){let t=a.elements;if(o.mat3){if(t.length===9)for(let n=0;n<3;n++)for(let i=0;i<3;i++)e[r+n*4+i]=t[n*3+i];else for(let n=0;n<3;n++)for(let i=0;i<3;i++)e[r+n*4+i]=t[n*4+i]}else for(let n=0;n<16;n++)e[r+n]=t[n];return}if(a.isColor){s[r]=a.r,s[r+1]=a.g,s[r+2]=a.b,o.n===4&&(s[r+3]=1);return}if(a.isVector2){s[r]=a.x,s[r+1]=a.y;return}if(a.isVector3){s[r]=a.x,s[r+1]=a.y,s[r+2]=a.z;return}if(a.isVector4||a.isQuaternion){s[r]=a.x,s[r+1]=a.y,s[r+2]=a.z,s[r+3]=a.w;return}if(ArrayBuffer.isView(a)||Array.isArray(a)){for(let e=0;e<Math.min(a.length,o.n);e++)s[r+e]=a[e];return}throw Error(`Cannot write uniform value `+a)}}var Qe=0,N=class{constructor(e,t,{label:n}={}){this.structName=e,this.label=n||e,this.id=Qe++,this.layout={},this.fields={},this.order=[];let r=0,i=16;for(let e in t){let n=t[e],a=Array.isArray(n)?n[0]:n,o=Array.isArray(n)?n[1]:void 0,s=Xe(a),c=s.base.align;i=Math.max(i,c),r=Math.ceil(r/c)*c;let l=s.count?Math.ceil(s.base.size/16)*16:s.base.size,u=s.count?l*s.count:s.base.size;this.layout[e]={offset:r,type:s,typeStr:a,stride:l,size:u},this.order.push(e),this.fields[e]={value:o===void 0?$e(s):o},r+=u}this.byteLength=Math.max(16,Math.ceil(r/i)*i),this.data=new ArrayBuffer(this.byteLength),this.f32=new Float32Array(this.data),this.u32=new Uint32Array(this.data),this.i32=new Int32Array(this.data),this.buffer=null,this.version=0;let a=this;this.values=new Proxy({},{get:(e,t)=>a.fields[t]&&a.fields[t].value,set:(e,t,n)=>(a.set(t,n),!0)})}get wgsl(){let e=`struct ${this.structName} {\n`;for(let t of this.order){let{type:n}=this.layout[t];e+=n.count?`\t${t}: array<${n.name}, ${n.count}>,\n`:`\t${t}: ${n.name},\n`}return e+`};
`}set(e,t){let n=this.fields[e];if(!n)throw Error(`${this.structName}: no uniform ${e}`);n.value&&typeof n.value==`object`&&!Array.isArray(n.value)&&n.value.copy&&t&&t.constructor===n.value.constructor?n.value.copy(t):n.value=t}get(e){return this.fields[e].value}_pack(){this.onBeforePack&&this.onBeforePack(this);let{f32:e,u32:t,i32:n,fields:r}=this,i=this._plan||this._makePlan();for(let a=0;a<i.length;a++){let{name:o,o:s,type:c,stride:l,count:u,n:d}=i[a],f=r[o].value;if(typeof f==`number`){(c.base.int?n:c.base.uint?t:e)[s]=f;continue}if(u){if(!f)continue;if(typeof f[0]==`number`){let r=c.base.int?n:c.base.uint?t:e,i=Math.min(u,f.length/d);for(let e=0;e<i;e++){let t=s+e*l,n=e*d,i=Math.min(d,f.length-n);for(let e=0;e<i;e++)r[t+e]=f[n+e]}}else{let r=Math.min(u,f.length);for(let i=0;i<r;i++)Ze(e,t,n,s+i*l,c,f[i])}}else Ze(e,t,n,s,c,f)}}_makePlan(){return this._plan=this.order.map(e=>{let{offset:t,type:n,stride:r}=this.layout[e];return{name:e,o:t/4,type:n,stride:r/4,count:n.count,n:n.base.n}}),this._plan}getBuffer(){return this.buffer||(this.buffer=t.device.createBuffer({label:this.label,size:this.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._last=new Uint32Array(this.byteLength/4),this._last.fill(4294967295),this._hasUploaded=!1),this.buffer}upload(e){if(e!==void 0&&e===this._token&&this.buffer)return this.buffer;this._token=e;let n=this.getBuffer();this._pack();let r=this.u32,i=this._last;if(!this._hasUploaded)return t.queue.writeBuffer(n,0,this.data),i.set(r),this._hasUploaded=!0,n;let a=0;for(;a<r.length&&r[a]===i[a];)a++;if(a<r.length){let e=r.length;if(r.length>=64)for(;e>a+1&&r[e-1]===i[e-1];)e--;else a=0;t.queue.writeBuffer(n,a*4,this.data,a*4,(e-a)*4),i.set(r)}return n}};function $e(e){return e.count?null:e.base.n===1?0:Array(e.base.n).fill(0)}var et=[[`smpLinearRepeat`,`linearRepeat`,`filtering`],[`smpLinearClamp`,`linearClamp`,`filtering`],[`smpLinearMirror`,`linearMirror`,`filtering`],[`smpAnisoRepeat`,`anisoRepeat`,`filtering`],[`smpAnisoClamp`,`anisoClamp`,`filtering`],[`smpAniso4Repeat`,`aniso4Repeat`,`filtering`],[`smpNearestClamp`,`nearestClamp`,`non-filtering`],[`smpNearestRepeat`,`nearestRepeat`,`non-filtering`],[`smpShadow`,`shadow`,`comparison`]],tt=0,P=class{constructor({name:e,deps:t=[],code:n=``,bindings:r={},uniforms:i=null,uniformName:a=null}){this.id=tt++,this.name=e||`module`+this.id,this.deps=t.filter(Boolean),this.code=n,this.bindings={...r},i&&(this.bindings[a||nt(i.structName)]={uniform:i}),this.isShaderModule=!0}};function nt(e){return e[0].toLowerCase()+e.slice(1)}function rt(e){let t=[],n=new Set,r=e=>{if(e&&!n.has(e)){n.add(e);for(let t of e.deps)r(t);t.push(e)}};for(let t of e)r(t);return t}function it(e,t={}){let n=e.split(`
`),r=[],i=[],a=()=>i.length===0||i[i.length-1].active,o=e=>{e=e.trim();let n;if(n=/^!\s*(\w+)$/.exec(e))return!at(t[n[1]]);if(n=/^(\w+)\s*(==|!=|>=|<=|>|<)\s*([\w.'"-]+)$/.exec(e)){let e=t[n[1]],r=n[3].replace(/^['"]|['"]$/g,``);switch(!isNaN(Number(r))&&typeof e==`number`&&(r=Number(r)),n[2]){case`==`:return e==r;case`!=`:return e!=r;case`>=`:return e>=r;case`<=`:return e<=r;case`>`:return e>r;case`<`:return e<r}}return/\|\|/.test(e)?e.split(`||`).some(e=>o(e)):/&&/.test(e)?e.split(`&&`).every(e=>o(e)):at(t[e])};for(let e of n){let n=e.trim(),s;if(s=/^#(if|ifdef|ifndef)\s+(.*)$/.exec(n)){let e=a(),n;n=s[1]===`ifdef`?t[s[2].trim()]!==void 0:s[1]===`ifndef`?t[s[2].trim()]===void 0:o(s[2]),i.push({active:e&&n,taken:n,parent:e});continue}if(s=/^#elif\s+(.*)$/.exec(n)){let e=i[i.length-1],t=!e.taken&&o(s[1]);e.active=e.parent&&t,e.taken=e.taken||t;continue}if(n===`#else`){let e=i[i.length-1];e.active=e.parent&&!e.taken,e.taken=!0;continue}if(n===`#endif`){i.pop();continue}a()&&r.push(e)}if(i.length)throw Error(`preprocess: unterminated #if`);return r.join(`
`)}function at(e){return e!=null&&e!==!1&&e!==0&&e!==`0`}function F(e){return typeof e==`function`?e():e}function ot(e,t,n){let r=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,i=n===`compute`?GPUShaderStage.COMPUTE:r;if(t.uniform){let n=t.uniform;return{layout:{visibility:i,buffer:{type:`uniform`}},decl:`var<uniform> ${e}: ${n.structName};`,struct:n}}if(t.uniformBuffer)return{layout:{visibility:i,buffer:{type:`uniform`}},decl:`var<uniform> ${e}: ${t.wgslType};`};if(t.storage){let a=F(t.storage),o=t.access||`read`,s=t.wgslType||`array<${t.type||a.type}>`;return{layout:{visibility:n===`compute`?i:o===`read`?r:GPUShaderStage.FRAGMENT,buffer:{type:o===`read`?`read-only-storage`:`storage`}},decl:`var<storage, ${o===`read`?`read`:`read_write`}> ${e}: ${s};`}}if(t.storageTexture){let r=F(t.storageTexture),a=t.access||`write`,o=t.viewDimension||t.view?.dimension||r.defaultViewDimension;return{layout:{visibility:n===`compute`?i:GPUShaderStage.FRAGMENT,storageTexture:{access:a===`write`?`write-only`:a===`read`?`read-only`:`read-write`,format:r.format,viewDimension:o}},decl:`var ${e}: texture_storage_${o.replace(`-`,`_`)}<${r.format}, ${a}>;`}}if(t.texture){let n=F(t.texture),r=t.viewDimension||t.view?.dimension||n.defaultViewDimension,a=t.sampleType||n.sampleType,o=t.wgslType||n.wgslType(r);return t.sampleType===`unfilterable-float`&&n.isDepth&&(o=`texture_${r.replace(`-`,`_`)}<f32>`),{layout:{visibility:i,texture:{sampleType:a,viewDimension:r,multisampled:n.sampleCount>1}},decl:`var ${e}: ${o};`}}if(t.sampler)return{layout:{visibility:i,sampler:{type:t.samplerType||`filtering`}},decl:`var ${e}: ${t.samplerType===`comparison`?`sampler_comparison`:`sampler`};`};throw Error(`binding ${e}: unknown spec`)}function st(e){if(e.uniform)return{buffer:e.uniform.getBuffer()};if(e.uniformBuffer)return{buffer:F(e.uniformBuffer)};if(e.storage){let t=F(e.storage),n=t.getGPU?t.getGPU():t;return e.offset===void 0?{buffer:n}:{buffer:n,offset:e.offset,size:e.size}}if(e.storageTexture)return F(e.storageTexture).view(e.view||{dimension:e.viewDimension||F(e.storageTexture).defaultViewDimension,mipLevelCount:1,baseMipLevel:e.mip||0});if(e.texture){let t=F(e.texture);return e.view||e.viewDimension?t.view({...e.view||{},dimension:e.viewDimension||e.view.dimension}):t.view()}if(e.sampler)return typeof e.sampler==`string`?t.samplers[e.sampler]:e.sampler;throw Error(`unknown binding`)}var ct=0,lt=1,ut=2,dt=3,ft=4;function pt(e){return e.uniform?ct:e.uniformBuffer?lt:e.storage?ut:e.storageTexture||e.texture?dt:ft}var mt=4,ht=new WeakMap;function gt(e,n){let r=JSON.stringify(e),i=ht.get(t.device);i||(i=new Map,ht.set(t.device,i));let a=i.get(r);return a||(a=t.device.createBindGroupLayout({label:n,entries:e}),i.set(r,a)),a}var _t=class{constructor(e,n,r=`bindings`,i=null,a=null){if(this.label=r,this.stage=n,this.names=Object.keys(e),this.specs=e,this.described=this.names.map(t=>ot(t,e[t],n)),i)for(let e=0;e<this.names.length;e++){let t=this.described[e].layout,n=i[this.names[e]];n===`fragment`&&t.visibility&GPUShaderStage.FRAGMENT&&(t.visibility=GPUShaderStage.FRAGMENT),n===`vertex`&&t.visibility&GPUShaderStage.VERTEX&&(t.visibility=GPUShaderStage.VERTEX)}if(a)for(let e=0;e<this.names.length;e++){let t=this.described[e];a.has(this.names[e])&&(t.layout.buffer={type:`read-only-storage`},t.decl=t.decl.replace(/^var<uniform>/,`var<storage, read>`))}this.layout=gt(this.described.map((e,t)=>({binding:t,...e.layout})),r),this._device=t.device,this.group=null;let o=this.names.length;this._specs=this.names.map(t=>e[t]),this._kinds=this._specs.map(pt),this._blocks=this._specs.filter(e=>e.uniform).map(e=>e.uniform),this._objs=Array(o).fill(null),this._vers=Array(o).fill(0),this._entry=null,this._cache=[],this._token=null}declarations(e){return this.described.map((t,n)=>`@group(${e}) @binding(${n}) ${t.decl}`).join(`
`)}structs(){let e=[];for(let t of this.described)t.struct&&!e.includes(t.struct)&&e.push(t.struct);return e}getBindGroup(e){if(this._device!==t.device&&(this._device=t.device,this.layout=gt(this.described.map((e,t)=>({binding:t,...e.layout})),this.label),this.group=this._entry=this._token=null,this._cache.length=0),e!==void 0&&e===this._token&&this.group)return this.group;this._token=e;let n=this._specs,r=this._kinds,i=this._objs,a=this._vers,o=n.length;for(let e=0;e<o;e++){let o=n[e],s=null,c=0;if(t.reuseAllocationBindings){let e=st(o);s=e.buffer||e,e.buffer&&(e.offset!==void 0||e.size!==void 0)&&(c=`${e.offset??0}:${e.size??`all`}`)}else switch(r[e]){case ct:s=o.uniform;break;case lt:s=F(o.uniformBuffer);break;case ut:s=F(o.storage),s.getGPU&&(s.getGPU(),c=s.version);break;case dt:s=F(o.storageTexture||o.texture),s&&s.getGPU&&(s.getGPU(),c=s.version);break;default:s=o.sampler}i[e]=s,a[e]=c}let s=this._blocks;for(let t=0;t<s.length;t++)s[t].upload(e);if(this._entry&&this._matches(this._entry))return this.group;let c=this._cache;for(let e=0;e<c.length;e++){let t=c[e];if(t!==this._entry&&this._matches(t))return this._entry=t,this.group=t.group,this.group}let l=Array(o);for(let e=0;e<o;e++)l[e]={binding:e,resource:st(n[e])};return this.group=t.device.createBindGroup({label:this.label,layout:this.layout,entries:l}),this._entry={objs:i.slice(),vers:a.slice(),group:this.group},c.unshift(this._entry),c.length>mt&&c.pop(),this.group}_matches(e){let t=this._objs,n=this._vers,r=e.objs,i=e.vers;for(let e=0;e<t.length;e++)if(t[e]!==r[e]||n[e]!==i[e])return!1;return!0}},vt=null,yt=null;function bt(e){vt=e,yt=null}function xt(e){if(yt||={},!yt[e]){let t={frame:{uniform:vt}};for(let[e,n,r]of et)t[e]={sampler:n,samplerType:r};yt[e]=new _t(t,e,`group0-`+e)}return yt[e]}var St=new WeakMap;function Ct(e,t=`render`){if(e===vt)return xt(t);let n=St.get(e);if(n||St.set(e,n={}),!n[t]){let r={frame:{uniform:e}};for(let[e,t,n]of et)r[e]={sampler:t,samplerType:n};n[t]=new _t(r,t,`group0-`+e.label)}return n[t]}function wt({modules:e=[],bindings:n={},code:r=``,defines:i={},stage:a=`render`,label:o=`shader`,header:s=``}){let c=rt(e),l={};for(let e of c)for(let t in e.bindings){if(l[t]&&l[t]!==e.bindings[t]&&!Et(l[t],e.bindings[t]))throw Error(`${o}: binding ${t} declared twice (${e.name})`);l[t]=e.bindings[t]}for(let e in n)l[e]=n[e];let u=null,d=null;if(a===`render`&&/@vertex\s+fn\s+vs\b/.test(r)){let e=``;for(let t of c)e+=t.code+`
`;let n=it(e+r,i),a=Tt(n,`vs`),o=/@fragment\s+fn\s+fs\b/.test(n)?Tt(n,`fs`):null;u={};for(let e in l)!a.has(e)&&(!o||o.has(e))?u[e]=`fragment`:o&&!o.has(e)&&a.has(e)&&(u[e]=`vertex`);d=new Set;let s=t.limits||{},f=(s.maxUniformBuffersPerShaderStage||12)-2,p={vertex:s.maxStorageBuffersInVertexStage??4,fragment:s.maxStorageBuffersInFragmentStage??s.maxStorageBuffersPerShaderStage??8},m=(e,t)=>!u[e]||u[e]===t;for(let e of[`fragment`,`vertex`]){let t=Object.keys(l).filter(t=>l[t].uniform&&m(t,e)&&!d.has(t)),n=Object.keys(l).filter(t=>(l[t].storage||d.has(t))&&m(t,e)).length;t.sort((t,n)=>(u[t]===e?0:1)-(u[n]===e?0:1));let r=t.length;for(let i of t){if(r<=f||n>=p[e])break;d.add(i),n++,r--}}}let f=new _t(l,a,o+`.g1`,u,d),p=xt(a),m=[...new Set([...p.structs(),...f.structs()])],h=``;t.features.has(`shader-f16`)&&i.F16&&(h+=`enable f16;
`),i.CLIP_DISTANCES&&(h+=`enable clip_distances;
`),/diagnostic\s*\(\s*off\s*,\s*derivative_uniformity/.test(s)||(h+=`diagnostic( off, derivative_uniformity );
`),h+=s,h+=m.map(e=>e.wgsl).join(`
`)+`
`,h+=p.declarations(0)+`
`,h+=f.declarations(1)+`
`;for(let e of c)h+=`// ---- ${e.name}\n${e.code}\n`;return h+=r,{code:it(h,i),bindings:f,group0:p,modules:c}}function Tt(e,t){let n=new Map,r=/\bfn\s+([A-Za-z_]\w*)\s*\(/g,i;for(;i=r.exec(e);){let a=e.indexOf(`{`,i.index);if(a<0)break;let o=0,s=a;for(;s<e.length;s++){let t=e[s];if(t===`{`)o++;else if(t===`}`&&--o===0)break}(!/@(vertex|fragment|compute)[^;{}]*$/.test(e.slice(Math.max(0,i.index-80),i.index))||i[1]===t)&&n.set(i[1],e.slice(i.index,s+1)),r.lastIndex=s+1}let a=new Set,o=[t],s=new Set;for(;o.length;){let e=o.pop();if(!s.has(e)&&n.has(e)){s.add(e);for(let t of n.get(e).match(/[A-Za-z_]\w*/g)||[])a.add(t),n.has(t)&&!s.has(t)&&o.push(t)}}return a}function Et(e,t){let n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&n.every(n=>e[n]===t[n])}var Dt=new Map;function Ot(e,n){let r=Dt.get(e);return r||(r=t.device.createShaderModule({label:n,code:e}),Dt.set(e,r),r.getCompilationInfo&&r.getCompilationInfo().then(t=>{let r=t.messages.filter(e=>e.type===`error`);if(!r.length)return;let i=e.split(`
`);for(let e of r){let t=Math.max(0,e.lineNum-4),r=Math.min(i.length,e.lineNum+2),a=i.slice(t,r).map((n,r)=>`${t+r+1}${t+r+1===e.lineNum?`>`:` `} ${n}`).join(`
`);console.error(`WGSL error in ${n} (${e.lineNum}:${e.linePos}): ${e.message}\n${a}`)}}),r)}var I=new P({name:`common`,code:`
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
`}),L=class e{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){return this[`xyzw`[e]]=t,this}getComponent(e){return this[`xyzw`[e]]}clone(){return new e(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.dot(this)}length(){return Math.sqrt(this.dot(this))}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};L.prototype.isVector4=!0;var kt=`srgb`,At=`srgb-linear`,jt=e=>e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4,R=e=>e<.0031308?e*12.92:1.055*e**.41666-.055,Mt=e=>Math.max(0,Math.min(1,e)),Nt=(e,t)=>(e%t+t)%t;function Pt(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Ft={h:0,s:0,l:0},z=class e{constructor(e,t,n){this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){if(e===void 0)return this;e&&e.isColor?this.copy(e):typeof e==`number`?this.setHex(e):typeof e==`string`&&this.setStyle(e)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.setRGB((e>>16&255)/255,(e>>8&255)/255,(e&255)/255,t)}setRGB(e,t,n,r=At){return r===`srgb`&&(e=jt(e),t=jt(t),n=jt(n)),this.r=e,this.g=t,this.b=n,this}setHSL(e,t,n,r=At){if(e=Nt(e,1),t=Mt(t),n=Mt(n),t===0)return this.setRGB(n,n,n,r);let i=n<=.5?n*(1+t):n+t-n*t,a=2*n-i;return this.setRGB(Pt(a,i,e+1/3),Pt(a,i,e),Pt(a,i,e-1/3),r)}setStyle(e,t=kt){let n;if(n=/^#([A-Fa-f\d]+)$/.exec(e)){let e=n[1];if(e.length===3)return this.setRGB(parseInt(e[0],16)/15,parseInt(e[1],16)/15,parseInt(e[2],16)/15,t);if(e.length===6)return this.setHex(parseInt(e,16),t)}else if(n=/^rgba?\(\s*([\d.]+)(%?)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*(?:,\s*[\d.]+\s*)?\)$/.exec(e)){let e=n[2]===`%`?100:255;return this.setRGB(Math.min(1,n[1]/e),Math.min(1,n[3]/e),Math.min(1,n[4]/e),t)}else if(n=/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*[\d.]+\s*)?\)$/.exec(e))return this.setHSL(n[1]/360,n[2]/100,n[3]/100,t);else if(It[e.toLowerCase()]!==void 0)return this.setHex(It[e.toLowerCase()],t);return console.warn(`Color: unknown color `+e),this}clone(){return new e(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=jt(e.r),this.g=jt(e.g),this.b=jt(e.b),this}copyLinearToSRGB(e){return this.r=R(e.r),this.g=R(e.g),this.b=R(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this)}convertLinearToSRGB(){return this.copyLinearToSRGB(this)}getHex(e=kt){let t=this.r,n=this.g,r=this.b;return e===`srgb`&&(t=R(t),n=R(n),r=R(r)),Math.round(Mt(t)*255)*65536+Math.round(Mt(n)*255)*256+Math.round(Mt(r)*255)}getHexString(e=kt){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=At){let n=this.r,r=this.g,i=this.b;t===`srgb`&&(n=R(n),r=R(r),i=R(i));let a=Math.max(n,r,i),o=Math.min(n,r,i),s=0,c=0,l=(o+a)/2;if(o!==a){let e=a-o;c=l<=.5?e/(a+o):e/(2-a-o),s=a===n?(r-i)/e+(r<i?6:0):a===r?(i-n)/e+2:(n-r)/e+4,s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=At){return e.r=this.r,e.g=this.g,e.b=this.b,t===`srgb`&&(e.r=R(e.r),e.g=R(e.g),e.b=R(e.b)),e}getStyle(e=kt){let t=this.getRGB({},e);return`rgb(${Math.round(t.r*255)},${Math.round(t.g*255)},${Math.round(t.b*255)})`}offsetHSL(e,t,n){return this.getHSL(Ft),this.setHSL(Ft.h+e,Ft.s+t,Ft.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};z.prototype.isColor=!0;var It={black:0,white:16777215,red:16711680,green:32768,lime:65280,blue:255,yellow:16776960,cyan:65535,magenta:16711935,gray:8421504,grey:8421504,orange:16753920};z.NAMES=It;var B=new l,V=Array.from({length:8},()=>new l),H=class e{constructor(e=new l(1/0,1/0,1/0),t=new l(-1/0,-1/0,-1/0)){this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0;t<e.length;t+=3)this.expandByPoint(B.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0;t<e.count;t++)this.expandByPoint(B.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t of e)this.expandByPoint(t);return this}setFromCenterAndSize(e,t){return B.copy(t).multiplyScalar(.5),this.min.copy(e).sub(B),this.max.copy(e).add(B),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new e().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t&&r!==void 0)for(let t=0;t<r.count;t++)this.expandByPoint(B.fromBufferAttribute(r,t).applyMatrix4(e.matrixWorld));else n.boundingBox===null&&n.computeBoundingBox(),Lt.copy(n.boundingBox).applyMatrix4(e.matrixWorld),this.union(Lt)}for(let n of e.children)this.expandByObject(n,t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,B),B.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n,r=e.normal;return r.x>0?(t=r.x*this.min.x,n=r.x*this.max.x):(t=r.x*this.max.x,n=r.x*this.min.x),r.y>0?(t+=r.y*this.min.y,n+=r.y*this.max.y):(t+=r.y*this.max.y,n+=r.y*this.min.y),r.z>0?(t+=r.z*this.min.z,n+=r.z*this.max.z):(t+=r.z*this.max.z,n+=r.z*this.min.z),t<=-e.constant&&n>=-e.constant}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,B).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?(e.makeEmpty(),e):(this.getCenter(e.center),e.radius=this.getSize(B).length()*.5,e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){if(this.isEmpty())return this;let t=this.min,n=this.max;return V[0].set(t.x,t.y,t.z).applyMatrix4(e),V[1].set(t.x,t.y,n.z).applyMatrix4(e),V[2].set(t.x,n.y,t.z).applyMatrix4(e),V[3].set(t.x,n.y,n.z).applyMatrix4(e),V[4].set(n.x,t.y,t.z).applyMatrix4(e),V[5].set(n.x,t.y,n.z).applyMatrix4(e),V[6].set(n.x,n.y,t.z).applyMatrix4(e),V[7].set(n.x,n.y,n.z).applyMatrix4(e),this.setFromPoints(V)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};H.prototype.isBox3=!0;var Lt=new H,Rt=new H,zt=new l,Bt=class e{constructor(e=new l,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){t===void 0?Rt.setFromPoints(e).getCenter(this.center):this.center.copy(t);let n=0;for(let t of e)n=Math.max(n,this.center.distanceToSquared(t));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}clone(){return new e().copy(this)}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&t.sub(this.center).normalize().multiplyScalar(this.radius).add(this.center),t}getBoundingBox(e){return this.isEmpty()?e.makeEmpty():(e.set(this.center,this.center),e.expandByScalar(this.radius))}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zt.subVectors(e,this.center);let t=zt.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(zt,n/e),this.radius+=n}return this}union(e){if(e.isEmpty())return this;if(this.isEmpty())return this.copy(e);let t=this.center.distanceTo(e.center);if(t+e.radius<=this.radius)return this;if(t+this.radius<=e.radius)return this.copy(e);let n=(t+this.radius+e.radius)*.5;return this.center.lerp(e.center,(n-this.radius)/t),this.radius=n,this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}};Bt.prototype.isSphere=!0;var Vt=new l,Ht=new l,Ut=new T,Wt=class e{constructor(e=new l(1,0,0),t=0){this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(e),this}setFromCoplanarPoints(e,t,n){let r=Vt.subVectors(n,t).cross(Ht.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e)}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}clone(){return new e().copy(this)}normalize(){let e=this.normal.length();if(e===0)return this;let t=1/e;return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}applyMatrix4(e,t){let n=t||Ut.getNormalMatrix(e),r=this.coplanarPoint(Vt).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}};Wt.prototype.isPlane=!0;var Gt=new Bt,Kt=new l,qt=class e{constructor(e=new Wt,t=new Wt,n=new Wt,r=new Wt,i=new Wt,a=new Wt){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){for(let t=0;t<6;t++)this.planes[t].copy(e.planes[t]);return this}clone(){return new e().copy(this)}setFromProjectionMatrix(e,t=u,n=!0){let r=this.planes,i=e.elements,a=i[0],o=i[4],s=i[8],c=i[12],l=i[1],d=i[5],f=i[9],p=i[13],m=i[2],h=i[6],g=i[10],_=i[14],v=i[3],y=i[7],b=i[11],x=i[15];return r[0].setComponents(v+a,y+o,b+s,x+c).normalize(),r[1].setComponents(v-a,y-o,b-s,x-c).normalize(),r[2].setComponents(v+l,y+d,b+f,x+p).normalize(),r[3].setComponents(v-l,y-d,b-f,x-p).normalize(),n?(r[4].setComponents(v-m,y-h,b-g,x-_).normalize(),r[5].setComponents(m,h,g,_).normalize()):t===2e3?(r[4].setComponents(v+m,y+h,b+g,x+_).normalize(),r[5].setComponents(v-m,y-h,b-g,x-_).normalize()):(r[4].setComponents(m,h,g,_).normalize(),r[5].setComponents(v-m,y-h,b-g,x-_).normalize()),this}intersectsObject(e){let t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Gt.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Gt)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n].normal;if(Kt.x=r.x>0?e.max.x:e.min.x,Kt.y=r.y>0?e.max.y:e.min.y,Kt.z=r.z>0?e.max.z:e.min.z,t[n].distanceToPoint(Kt)<0)return!1}return!0}containsPoint(e){for(let t=0;t<6;t++)if(this.planes[t].distanceToPoint(e)<0)return!1;return!0}},Jt=class{constructor(){this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}getPoint(){throw Error(`Curve.getPoint() not implemented`)}getPointAt(e,t){return this.getPoint(this.getUtoTmapping(e),t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[0],n=this.getPoint(0),r=0;for(let i=1;i<=e;i++){let a=this.getPoint(i/e);r+=a.distanceTo(n),t.push(r),n=a}return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=n.length,i=t===null?e*n[r-1]:t,a=0,o=r-1;for(;a<=o;){let e=Math.floor(a+(o-a)/2),t=n[e]-i;if(t<0)a=e+1;else if(t>0)o=e-1;else{o=e;break}}let s=o;if(n[s]===i)return s/(r-1);let c=n[s],l=n[s+1];return(s+(i-c)/(l-c))/(r-1)}getTangent(e,t=new l){let n=1e-4,r=Math.max(0,e-n),i=Math.min(1,e+n),a=this.getPoint(r),o=this.getPoint(i);return t.copy(o).sub(a).normalize()}getTangentAt(e,t){return this.getTangent(this.getUtoTmapping(e),t)}computeFrenetFrames(e,t){let n=new l,r=[],i=[],a=[],o=new l,s=new v;for(let t=0;t<=e;t++)r[t]=this.getTangentAt(t/e,new l);i[0]=new l,a[0]=new l;let c=Number.MAX_VALUE,u=Math.abs(r[0].x),d=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(Math.max(-1,Math.min(1,r[t-1].dot(r[t]))));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(Math.max(-1,Math.min(1,i[0].dot(i[e]))))/e;r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}};function Yt(e,t,n,r,i){e[0]=t,e[1]=r,e[2]=-3*t+3*n-2*r-i,e[3]=2*t-2*n+r+i}function Xt(e,t,n,r,i,a){Yt(e,n,r,a*(r-t),a*(i-n))}function Zt(e,t,n,r,i,a,o,s){let c=(n-t)/a-(r-t)/(a+o)+(r-n)/o,l=(r-n)/o-(i-n)/(o+s)+(i-r)/s;c*=o,l*=o,Yt(e,n,r,c,l)}var Qt=(e,t)=>e[0]+t*(e[1]+t*(e[2]+t*e[3])),$t=[0,0,0,0],en=[0,0,0,0],tn=[0,0,0,0],nn=new l,rn=new l,an=class e extends Jt{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new l){let n=this.points,r=n.length,i=(r-+!this.closed)*e,a=Math.floor(i),o=i-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:o===0&&a===r-1&&(a=r-2,o=1);let s,c;s=this.closed||a>0?n[(a-1)%r]:nn.subVectors(n[0],n[1]).add(n[0]);let u=n[a%r],d=n[(a+1)%r];if(c=this.closed||a+2<r?n[(a+2)%r]:rn.subVectors(n[r-1],n[r-2]).add(n[r-1]),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=s.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(c)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Zt($t,s.x,u.x,d.x,c.x,t,n,r),Zt(en,s.y,u.y,d.y,c.y,t,n,r),Zt(tn,s.z,u.z,d.z,c.z,t,n,r)}else Xt($t,s.x,u.x,d.x,c.x,this.tension),Xt(en,s.y,u.y,d.y,c.y,this.tension),Xt(tn,s.z,u.z,d.z,c.z,this.tension);return t.set(Qt($t,o),Qt(en,o),Qt(tn,o))}copy(e){return super.copy(e),this.points=e.points.map(e=>e.clone()),this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}clone(){return new e().copy(this)}};an.prototype.isCatmullRomCurve3=!0,new Uint32Array(new Float32Array(1).buffer);var on={hooks:{},version:0,set(e,t){this.hooks[e]=t,this.version++},modules(){return Object.values(this.hooks).filter(Boolean)}},sn={directModulation:`fn hookDirectModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }`,ambientModulation:`fn hookAmbientModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }`,shadowPosition:`fn hookShadowPosition( P: vec3f, N: vec3f, pixel: vec2f ) -> vec3f { return P; }`,bounce:`fn hookBounce( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 0.0 ); }`,localLights:`fn hookLocalLights( s: Surface, P: vec3f, N: vec3f, V: vec3f, acc: ptr<function, LightAccum> ) {}`,envSpecular:`fn hookEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f { let t = sat( R.y * 0.5 + 0.5 ); return mix( frame.horizonColor * 0.6, frame.skyIrradiance * PI, t ) * frame.envIntensity; }`,envDiffuse:`fn hookEnvDiffuse( N: vec3f ) -> vec3f { return mix( frame.horizonColor * 0.25, frame.skyIrradiance, N.y * 0.5 + 0.5 ) * frame.envIntensity; }`};function cn(){let e=[];for(let t in sn){let n=on.hooks[t];n?e.push(n):e.push(un(t))}return e}var ln={};function un(e){return ln[e]||(ln[e]=new P({name:`hook-`+e+`-default`,deps:[hn],code:sn[e]}))}var dn=new N(`SunShadow`,{matrices:[`mat4x4f[4]`,[new v,new v,new v,new v]],cascades:[`vec4f[4]`,[new L,new L,new L,new L]],count:[`u32`,0],mapSize:[`f32`,2048],bias:[`f32`,2e-5],fade:[`f32`,1],pcssCascades:[`u32`,1],sunAngularDiameter:[`f32`,.00925],enabled:[`f32`,0],pad:[`f32`,0],blend:[`vec4f[4]`,[new L,new L,new L,new L]]}),fn=null;function pn(e){fn=e}var mn=new P({name:`sunShadow`,deps:[I],uniforms:dn,uniformName:`shadowParams`,bindings:{sunShadowMap:{texture:()=>fn,viewDimension:`2d-array`}},code:`
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
`}),hn=new P({name:`surface`,deps:[I],code:`
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
`}),gn=new P({name:`lighting`,deps:[I,hn,mn],code:`
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
`}),_n={position:`vec3f`,normal:`vec3f`,uv:`vec2f`,color:`vec4f`},vn={normal:`vec3f( 0.0, 1.0, 0.0 )`,uv:`vec2f( 0.0 )`,color:`vec4f( 1.0 )`},yn=/^(u32|i32|vec[234][ui])$/;function bn(e){return e===`f32`?`0.0`:e===`u32`?`0u`:e===`i32`?`0i`:`${e}()`}function xn(e,n,r){let i=r.kind,a=new Set(n.map(e=>e.name)),o=e.allDefines();o.PASS_MAIN=+(i===`main`||i===`visibility`),o.PASS_VISIBILITY=+(i===`visibility`),o.PASS_DEPTH=+(i===`depth`),o.PASS_COLOR=+(i===`color`),o.PASS_LATE=+!!r.late,o.LIT=+!!e.lit,o.INSTANCED=+!!a.has(`instanceMatrix0`),o.INSTANCE_COLOR=+!!a.has(`instanceColor`),Object.assign(o,r.defines||{}),o.CLIP_DISTANCES=o.REFRACTION_CLIP&&t.features.has(`clip-distances`)?1:0;let s=`struct VertexIn {
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
`;d+=`\t@location( ${u++} ) worldPos: vec3f,\n`,d+=`\t@location( ${u++} ) normal: vec3f,\n`,d+=`\t@location( ${u++} ) uv: vec2f,\n`,d+=`\t@location( ${u++} ) color: vec4f,\n`,l&&(d+=`\t@location( ${u++} ) curClip: vec4f,\n`,d+=`\t@location( ${u++} ) prevClip: vec4f,\n`);for(let t in e.varyings){let n=e.varyings[t];d+=`\t@location( ${u++} )${yn.test(n)?` @interpolate( flat )`:``} ${t}: ${n},\n`}if(d+=`};
`,o.CLIP_DISTANCES){let e=[...d.matchAll(/\s(\w+): [^,]+,\n/g)].map(e=>e[1]);d+=d.replace(`struct VSOut {`,`struct VSOutClip {`).replace(/};\n$/,`	@builtin( clip_distances ) clipDistances: array<f32, 1>,
};
`),d+=`fn vsClip( o: VSOut, d: f32 ) -> VSOutClip {\n\tvar c: VSOutClip;\n${e.map(e=>`\tc.${e} = o.${e};\n`).join(``)}\tc.clipDistances[ 0 ] = d;\n\treturn c;\n}\n`}let f=``;for(let e in _n)if(a.has(e)){let t=n.find(t=>t.name===e);e===`color`&&t.wgsl===`vec3f`?f+=`	v.color = vec4f( i.color, 1.0 );
`:f+=`\tv.${e} = i.${e};\n`}else e!==`position`&&(f+=`\tv.${e} = ${vn[e]};\n`);for(let t in e.attributes)f+=a.has(t)?`\tv.${t} = i.${t};\n`:`\tv.${t} = ${bn(e.attributes[t])};\n`;let p=`
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
	@location( 2 ) mask: vec4f,
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
		so.mask = vec4f( 0.0 );
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
#else
	out.velocity = r.velocity;
#endif
	out.mask = r.mask;
#endif
	return out;
}
#endif
`,m=e.shadow?`fn materialShadow( in: FragInput ) -> bool {\n${e.shadow}\n}\n`:``;o.HAS_SHADOW_HOOK=+!!e.shadow,o.NEEDS_DEPTH_FRAGMENT=i===`depth`&&(e.alphaTest>0||e.shadow)?1:0,o.HAS_POSITION=+!!a.has(`position`);let h=p.replace(`fn fragInput(`,m+`fn fragInput(`).replace(/\bTRANSPARENT_F\b/g,e.transparent?`true`:`false`).replace(/\bVELOCITY_WEIGHT\b/g,Sn(e.velocityWeight)).replace(/\bREFRACTION_CLIP_MARGIN\b/g,Sn((r.defines&&r.defines.REFRACTION_CLIP_MARGIN)??0)),g=[I,hn,...e.modules];return(i!==`depth`||rt(e.modules).includes(gn))&&(g=[I,hn,...cn(),gn,...e.modules]),e.lightingHooks===!1&&!rt(e.modules).includes(gn)&&(g=[I,hn,mn,...e.modules]),{code:h,modules:g,defines:o,bindings:{mat:{uniform:e.uniformBlock},...e.bindings},hasFragment:i!==`depth`||o.NEEDS_DEPTH_FRAGMENT===1}}function Sn(e){let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`}var Cn=0,wn={color:[`vec3f`,null],opacity:[`f32`,1],emissive:[`vec3f`,null],roughness:[`f32`,1],metalness:[`f32`,0],alphaTest:[`f32`,0]},Tn=class{constructor(e={}){this.id=Cn++,this.isMaterial=!0,this.name=e.name||`material`+this.id,this.version=0,this.modules=e.modules||[],this.varyings=e.varyings||{},this.attributes=e.attributes||{},this.vertex=e.vertex||``,this.surface=e.surface||``,this.output=e.output||``,this.shadow=e.shadow||``,this.defines={...e.defines||{}},this.lit=e.lit!==!1,this.side=e.side||`front`,this.transparent=!!e.transparent,this.blending=e.blending||(this.transparent?`normal`:`none`),this.depthWrite=e.depthWrite??!this.transparent,this.depthTest=e.depthTest??!0,this.depthCompare=e.depthCompare||null,this.depthBias=e.depthBias||0,this.depthBiasSlopeScale=e.depthBiasSlopeScale||0,this.colorWrite=e.colorWrite??!0,this.topology=e.topology||`triangle-list`,this.visible=e.visible??!0,this.vertexColors=!!e.vertexColors,this.velocityWeight=e.velocityWeight??1,this.underwaterLighting=e.underwaterLighting||`full`,this.appliesHillShadow=!!e.appliesHillShadow,this.localLightsCheap=!!e.localLightsCheap,this.receiveShadows=e.receiveShadows??!0,this.userData=e.userData||{};let t={...wn};for(let n in e.uniforms||{})t[n]=e.uniforms[n];this.uniformBlock=new N(`MaterialParams`+this.id,t,{label:this.name}),this.uniforms=this.uniformBlock.fields;let n=this.uniforms;n.color.value=Dn(e.color,new z(1,1,1)),n.emissive.value=Dn(e.emissive,new z(0,0,0)),e.roughness!==void 0&&(n.roughness.value=e.roughness),e.metalness!==void 0&&(n.metalness.value=e.metalness),e.opacity!==void 0&&(n.opacity.value=e.opacity),e.alphaTest!==void 0&&(n.alphaTest.value=e.alphaTest),this.bindings={};for(let t in e.textures||{}){let n=e.textures[t];this.bindings[t]=n&&n.isTexture||typeof n==`function`?{texture:n}:n}for(let t in e.storage||{}){let n=e.storage[t];this.bindings[t]=n&&n.isStorageBuffer?{storage:n,access:`read`}:n}Object.assign(this.bindings,e.bindings||{}),this._listeners=[]}get color(){return this.uniforms.color.value}set color(e){this.uniforms.color.value=Dn(e,this.uniforms.color.value)}get emissive(){return this.uniforms.emissive.value}set emissive(e){this.uniforms.emissive.value=Dn(e,this.uniforms.emissive.value)}get roughness(){return this.uniforms.roughness.value}set roughness(e){this.uniforms.roughness.value=e}get metalness(){return this.uniforms.metalness.value}set metalness(e){this.uniforms.metalness.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms.opacity.value=e}get alphaTest(){return this.uniforms.alphaTest.value}set alphaTest(e){e>0!=this.uniforms.alphaTest.value>0&&(this.needsUpdate=!0),this.uniforms.alphaTest.value=e}set(e,t){this.uniformBlock.set(e,t)}set needsUpdate(e){e&&this.version++}setDefine(e,t){this.defines[e]!==t&&(this.defines[e]=t,this.version++)}pipelineKey(){return`${this.id}.${this.version}.${this.side}.${this.transparent}.${typeof this.blending==`string`?this.blending:JSON.stringify(this.blending)}.${this.depthWrite}.${this.depthTest}.${this.depthCompare}.${this.colorWrite}.${this.topology}.${this.alphaTest>0}.${this.underwaterLighting}.${this.appliesHillShadow}.${this.localLightsCheap}.${this.receiveShadows}.${this.depthBias}.${this.depthBiasSlopeScale}.${this.vertexColors}`}allDefines(){return{...this.defines,UNDERWATER_LIGHTING:{none:0,lite:1,full:2}[this.underwaterLighting]??2,HILL_SHADOW_SELF:+!!this.appliesHillShadow,LOCAL_LIGHTS_CHEAP:+!!this.localLightsCheap,ALPHA_TEST:+(this.alphaTest>0),DOUBLE_SIDED:+(this.side===`double`),BACK_SIDE:+(this.side===`back`),TRANSPARENT:+!!this.transparent,RECEIVE_SHADOWS:+!!this.receiveShadows}}addEventListener(e,t){e===`dispose`&&this._listeners.push(t)}dispose(){for(let e of this._listeners)e({target:this})}clone(){let e=Object.create(Object.getPrototypeOf(this));return Object.assign(e,this),e.id=Cn++,e.version=0,e.defines={...this.defines},e.bindings={...this.bindings},e.uniformBlock=new N(`MaterialParams`+e.id,Object.fromEntries(this.uniformBlock.order.map(e=>[e,[this.uniformBlock.layout[e].typeStr,En(this.uniforms[e].value)]])),{label:e.name}),e.uniforms=e.uniformBlock.fields,e._listeners=[],e}};function En(e){return e&&typeof e==`object`&&e.clone?e.clone():Array.isArray(e)?e.map(En):e}function Dn(e,t){return e==null?t:e.isColor?t.copy?t.copy(e):e.clone():typeof e==`number`||typeof e==`string`?t.set(e):Array.isArray(e)?t.setRGB(e[0],e[1],e[2]):e.isVector3?t.setRGB(e.x,e.y,e.z):t}function On(e){if(!e||e===`none`)return;if(typeof e==`object`)return e;let t=(e,t,n=`add`)=>({srcFactor:e,dstFactor:t,operation:n});switch(e){case`normal`:return{color:t(`src-alpha`,`one-minus-src-alpha`),alpha:t(`one`,`one-minus-src-alpha`)};case`premultiplied`:return{color:t(`one`,`one-minus-src-alpha`),alpha:t(`one`,`one-minus-src-alpha`)};case`additive`:return{color:t(`src-alpha`,`one`),alpha:t(`zero`,`one`)};case`add`:return{color:t(`one`,`one`),alpha:t(`one`,`one`)};case`multiply`:return{color:t(`dst`,`zero`),alpha:t(`zero`,`one`)};case`min`:return{color:t(`one`,`one`,`min`),alpha:t(`one`,`one`,`min`)};case`max`:return{color:t(`one`,`one`,`max`),alpha:t(`one`,`one`,`max`)}}throw Error(`unknown blending `+e)}var kn={view:`mat4x4f`,proj:`mat4x4f`,viewProj:`mat4x4f`,invView:`mat4x4f`,invProj:`mat4x4f`,invViewProj:`mat4x4f`,viewProjNoJitter:`mat4x4f`,prevViewProjNoJitter:`mat4x4f`,cameraPos:[`vec3f`,new l],near:[`f32`,.1],prevCameraPos:[`vec3f`,new l],far:[`f32`,6e4],resolution:[`vec2f`,new M(1,1)],invResolution:[`vec2f`,new M(1,1)],outputResolution:[`vec2f`,new M(1,1)],jitter:[`vec2f`,new M],prevJitter:[`vec2f`,new M],frameIndex:[`u32`,0],time:[`f32`,0],dt:[`f32`,1/60],seaLevel:[`f32`,0],waterEnabled:[`f32`,1],atmosphereQuality:[`f32`,1],antiAliasingQuality:[`f32`,1],sunDir:[`vec3f`,new l(.3,.6,-.7).normalize()],night:[`f32`,0],sunColor:[`vec3f`,new z(1,1,1)],exposure:[`f32`,1],skyIrradiance:[`vec3f`,new z(.3,.4,.6)],cameraUnderwater:[`f32`,0],horizonColor:[`vec3f`,new z(.6,.7,.8)],cameraWaterHeight:[`f32`,0],waterAbsorption:[`vec3f`,new l(.42,.075,.035)],windSpeed:[`f32`,7],waterScattering:[`vec3f`,new l(.012,.018,.024)],envIntensity:[`f32`,1],windDir:[`vec2f`,new M(.35,.94).normalize()],reversedDepth:[`f32`,1],pad0:[`f32`,0],debug:[`vec4f`,new L]},An=[`view`,`proj`,`viewProj`,`invView`,`invProj`,`invViewProj`,`viewProjNoJitter`,`prevViewProjNoJitter`,`cameraPos`,`near`,`prevCameraPos`,`far`,`resolution`,`invResolution`,`jitter`,`prevJitter`,`reversedDepth`],U=new N(`Frame`,kn,{label:`frame`});bt(U);function jn(e){let t=new N(`Frame`,kn,{label:e});return t.onBeforePack=()=>{for(let e of U.order)An.includes(e)||(t.fields[e].value=U.fields[e].value)},t}var W=U.fields,Mn={time:W.time,dt:W.dt,seaLevel:W.seaLevel,waterEnabled:W.waterEnabled,atmosphereQuality:W.atmosphereQuality,antiAliasingQuality:W.antiAliasingQuality,sunDir:W.sunDir,sunColor:W.sunColor,skyIrradiance:W.skyIrradiance,horizonColor:W.horizonColor,waterAbsorption:W.waterAbsorption,waterScattering:W.waterScattering,cameraUnderwater:W.cameraUnderwater,cameraWaterHeight:W.cameraWaterHeight,exposure:W.exposure,windDir:W.windDir,windSpeed:W.windSpeed,night:W.night,envIntensity:W.envIntensity},Nn=9.81,Pn=new v;function Fn(e,t,n,{jitterX:r=0,jitterY:i=0,prevViewProj:a=null,prevCameraPos:o=null,block:s=U}={}){let c=s.fields;e.updateMatrixWorld(),e.matrixWorldInverse&&e.matrixWorldInverse.copy(e.matrixWorld).invert();let u=e.matrixWorldInverse,d=e.projectionMatrix;c.view.value=u.clone(),c.proj.value=d.clone();let f=new v().multiplyMatrices(d,u);c.viewProjNoJitter.value=f.clone();let p=2*r/t,m=2*i/n;Pn.makeTranslation(p,m,0);let h=new v().multiplyMatrices(Pn,f);c.viewProj.value=h,c.invView.value=e.matrixWorld.clone(),c.invProj.value=d.clone().invert(),c.invViewProj.value=h.clone().invert(),c.prevViewProjNoJitter.value=a?a.clone():f.clone(),c.cameraPos.value=new l().setFromMatrixPosition(e.matrixWorld),c.prevCameraPos.value=o?o.clone():c.cameraPos.value.clone(),c.near.value=e.near,c.far.value=e.far,c.resolution.value=new M(t,n),c.invResolution.value=new M(1/t,1/n),c.prevJitter.value=c.jitter.value?c.jitter.value.clone():new M,c.jitter.value=new M(p,m),c.reversedDepth.value=e.reversedDepth===!1?0:1}var In=new Bt,Ln=new qt,Rn=new v,zn=new l,Bn=new l,Vn=new H,Hn=2**-23;function Un(e,t){let n=t.elements.map(Math.fround),r=1/0,i=-1/0,a=1/0,o=-1/0;for(let t of[e.min.x,e.max.x])for(let s of[e.min.y,e.max.y])for(let c of[e.min.z,e.max.z])for(let e of[2,3]){let l=[n[e]*t,n[e+4]*s,n[e+8]*c,n[e+12]],u=l.reduce((e,t)=>e+t,0),d=16*Hn*l.reduce((e,t)=>e+Math.abs(t),0)+1e-37;e===2?(r=Math.min(r,u-d),i=Math.max(i,u+d)):(a=Math.min(a,u-d),o=Math.max(o,u+d))}if(!(a>0))return null;let s=[r/a,r/o,i/a,i/o],c=Math.min(...s),l=Math.max(...s),u=16*Hn*Math.max(Math.abs(c),Math.abs(l))+1e-37;return Number.isFinite(u)?[c-u,l+u]:null}function Wn(e,t){return e&&t&&(e[1]<t[0]||t[1]<e[0])}var Gn=new WeakMap,Kn=0,qn=256,Jn=class{constructor(){this.pipelines=new Map,this.geometries=new WeakMap,this.sharedAttributes=new WeakMap,this.sharedIndices=new WeakMap,this.resourceStats={vertexBuffers:0,indexBuffers:0,vertexBytes:0,indexBytes:0,attributeOwners:0,indexOwners:0,bufferUploadBytes:0},this.spatialSortEnabled=!0,this.capacity=8192,this.drawBuffer=null,this.drawData=null,this.drawCount=0,this.frame=-1,this.stats={draws:0,triangles:0,pipelines:0},this.drawLayout=null,this.drawBindGroup=null,this.syncPipelines=!0}_ensureDrawBuffer(){this.drawBuffer&&this.drawData.byteLength>=this.capacity*qn||(this.drawBuffer&&this.drawBuffer.destroy(),this.drawBuffer=t.device.createBuffer({label:`draws`,size:this.capacity*qn,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.drawData=new Float32Array(this.capacity*qn/4),this.drawLayout=gt([{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:`uniform`,hasDynamicOffset:!0,minBindingSize:160}}],`draw`),this.drawBindGroup=t.device.createBindGroup({label:`draws`,layout:this.drawLayout,entries:[{binding:0,resource:{buffer:this.drawBuffer,size:160}}]}))}_beginFrame(){this.frame!==t.frame&&(this.frame=t.frame,this._ensureDrawBuffer(),this.drawCount>this.capacity*.75&&(this.capacity*=2,this._ensureDrawBuffer()),this.drawCount=0,t.onSubmit(()=>{this.drawCount&&t.queue.writeBuffer(this.drawBuffer,0,this.drawData.buffer,0,this.drawCount*qn)}),this.stats.draws=0,this.stats.triangles=0)}_slot(e){let n=e.__draw;if(n||=e.__draw={frame:-1,slot:0,cur:new Float32Array(16),prev:new Float32Array(16),has:!1},n.frame===t.frame)return n.slot;if(this.drawCount>=this.capacity)throw Error(`MeshRenderer: draw buffer full`);n.frame=t.frame,n.slot=this.drawCount++;let r=e.matrixWorld.elements;n.has&&!e.resetVelocity?n.prev.set(n.cur):n.prev.set(r),n.cur.set(r),n.has=!0,e.resetVelocity=!1;let i=n.slot*qn/4,a=this.drawData;a.set(n.cur,i),a.set(e.staticVelocity?n.cur:n.prev,i+16);let o=e.drawParams;if(a[i+32]=e.id??0,a[i+33]=o?o[0]:0,a[i+34]=o?o[1]:0,a[i+35]=o?o[2]:0,o&&o.length>3)for(let e=0;e<4;e++)a[i+36+e]=o[3+e]??0;return n.slot}_geometryGPU(e){let t=this.geometries.get(e);return t||(t={buffers:new Map,index:null,indexVersion:-1},this.geometries.set(e,t),e.addEventListener&&e.addEventListener(`dispose`,()=>{if(!t.disposed){t.disposed=!0;for(let[e,n]of t.buffers)this._releaseShared(this.sharedAttributes,e,n);t.index&&this._releaseShared(this.sharedIndices,t.indexAttribute,t.index),this.geometries.delete(e)}})),t}_releaseShared(e,t,n){this.resourceStats[n.kind===`index`?`indexOwners`:`attributeOwners`]--,--n.owners===0&&(n.buffer?.destroy(),n.buffer&&this.resourceStats[n.kind===`index`?`indexBuffers`:`vertexBuffers`]--,this.resourceStats[n.kind===`index`?`indexBytes`:`vertexBytes`]-=n.allocationBytes||0,e.delete(t))}_attributeBuffer(e,n){let r=this._geometryGPU(e),i=n.isInterleavedBufferAttribute?n.data:n;if(i.gpuBuffer)return i.gpuBuffer.getGPU?i.gpuBuffer.getGPU():i.gpuBuffer;let a=r.buffers.get(i);a||(a=this.sharedAttributes.get(i),a||(a={buffer:null,size:0,version:-1,owners:0,kind:`attribute`,allocationBytes:0},this.sharedAttributes.set(i,a)),a.owners++,this.resourceStats.attributeOwners++,r.buffers.set(i,a));let o=i.version??0;if(a&&a.version===o&&a.array===i.array)return a.buffer;let s=Zn(n);if((!a.buffer||a.size<s.byteLength)&&(a.buffer?a.buffer.destroy():this.resourceStats.vertexBuffers++,this.resourceStats.vertexBytes-=a.allocationBytes,a.allocationBytes=Math.max(16,G(s.byteLength)),this.resourceStats.vertexBytes+=a.allocationBytes,a.buffer=t.device.createBuffer({label:n.name||`attribute`,size:Math.max(16,G(s.byteLength)),usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),a.size=s.byteLength,a.version=-1),a.version!==o||a.array!==i.array){let e=i.updateRanges&&i.updateRanges.length&&a.version>=0&&a.array===i.array?i.updateRanges:null;if(e&&s===i.array){let n=i.array.BYTES_PER_ELEMENT;for(let r of e)t.queue.writeBuffer(a.buffer,r.start*n,i.array.buffer,i.array.byteOffset+r.start*n,G(r.count*n)),this.resourceStats.bufferUploadBytes+=G(r.count*n);i.clearUpdateRanges?i.clearUpdateRanges():i.updateRanges.length=0}else Yn(a.buffer,s),this.resourceStats.bufferUploadBytes+=G(s.byteLength);a.version=o}return a.array=i.array,a.buffer}_indexBuffer(e){let n=e.index;if(!n)return null;let r=this._geometryGPU(e);if(r.index&&r.indexAttribute!==n&&(this._releaseShared(this.sharedIndices,r.indexAttribute,r.index),r.index=null),!r.index){let e=this.sharedIndices.get(n);e||(e={buffer:null,size:0,version:-1,owners:0,array:null,ref:null,kind:`index`,allocationBytes:0},this.sharedIndices.set(n,e)),e.owners++,this.resourceStats.indexOwners++,r.index=e,r.indexAttribute=n}let i=r.index;if(i.ref&&i.array===n.array&&i.version===(n.version??0))return i.ref;let a=n.array instanceof Uint16Array||n.array instanceof Uint32Array?n.array:new Uint32Array(n.array);return(!i.buffer||i.size<a.byteLength)&&(i.buffer?i.buffer.destroy():this.resourceStats.indexBuffers++,this.resourceStats.indexBytes-=i.allocationBytes,i.allocationBytes=Math.max(16,G(a.byteLength)),this.resourceStats.indexBytes+=i.allocationBytes,i.buffer=t.device.createBuffer({label:`index`,size:Math.max(16,G(a.byteLength)),usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),i.size=a.byteLength,i.version=-1),(i.version!==(n.version??0)||i.array!==n.array)&&(Yn(i.buffer,a),this.resourceStats.bufferUploadBytes+=G(a.byteLength),i.version=n.version??0),i.array=n.array,i.ref={buffer:i.buffer,format:a instanceof Uint16Array?`uint16`:`uint32`},i.ref}_cachedLayout(e,t,n){let r=Gn.get(t);r||Gn.set(t,r=new Map);let i=e.isInstancedMesh?e.instanceColor?2:1:0,a=i?n.id+`:`+i:n.id,o=r.get(a);if(o&&o.version===n.version&&o.attrsVersion===t.attributesVersion&&(!i||o.instanceMatrix===e.instanceMatrix)){let e=o.refs,n=o.names,r=t.attributes,i=!0;for(let t=0;t<n.length;t++)if(r[n[t]]!==e[t]){i=!1;break}if(i)return o.vl}let s=this._layout(e,t,n),c=s.layout.filter(e=>!e.name.startsWith(`instance`)).map(e=>e.name);return o={version:n.version,attrsVersion:t.attributesVersion,instanceMatrix:e.instanceMatrix,names:c,refs:c.map(e=>t.attributes[e]),vl:s},s.pipelines=new Map,r.set(a,o),s}_layout(e,t,n){let r=[],i=[`position`,`normal`,`uv`,`color`,...Object.keys(n.attributes)];for(let e of i){let i=t.attributes[e];i&&(e!==`color`||n.vertexColors||n.attributes.color)&&r.push({name:e,attr:i})}if(e.isInstancedMesh){for(let t=0;t<4;t++)r.push({name:`instanceMatrix`+t,attr:e.instanceMatrix,column:t});e.instanceColor&&r.push({name:`instanceColor`,attr:e.instanceColor})}let a=[],o=[],s=new Map,c=0;for(let e of r){let t=e.attr,r=t.isInterleavedBufferAttribute?t.data:t,i=!!(t.isInstancedBufferAttribute||r.isInstancedInterleavedBuffer||t.meshPerAttribute||r.meshPerAttribute)||e.name.startsWith(`instance`),l=$n(t),u=s.get(r);if(u===void 0){u=a.length,s.set(r,u);let e=t.isInterleavedBufferAttribute?t.data.stride*l.bytesPerComponent:t.itemSize*l.bytesPerComponent;a.push({src:r,attr:t,layout:{arrayStride:l.converted?l.itemSize*4:e,stepMode:i?`instance`:`vertex`,attributes:[]}})}let d=t.isInterleavedBufferAttribute?t.offset*l.bytesPerComponent:0,f=l.format,p=l.wgsl;e.column!==void 0&&(d=e.column*16,f=`float32x4`,p=`vec4f`),a[u].layout.attributes.push({shaderLocation:c,offset:d,format:f}),(e.name===`position`||e.name===`normal`)&&(p=`vec3f`),e.name===`uv`&&(p=`vec2f`),e.name===`color`&&(p=t.itemSize===4?`vec4f`:`vec3f`),e.name===`instanceColor`&&(p=`vec3f`),n.attributes[e.name]&&(p=n.attributes[e.name]),o.push({name:e.name,wgsl:p,location:c,instanced:i}),c++}return{key:o.map(e=>`${e.name}:${e.wgsl}`).join(`,`)+`|`+a.map(e=>`${e.layout.arrayStride}/${e.layout.stepMode}/${e.layout.attributes.map(e=>e.format+`@`+e.offset).join(`;`)}`).join(`,`),layout:o,buffers:a}}_pipeline(e,n,r){e.__pkFrame!==t.frame&&(e.__pk=e.pipelineKey()+`|`+on.version,e.__pkFrame=t.frame);let i=r.passKey,a=n.pipelines&&n.pipelines.get(i);if(a&&a.materialKey===e.__pk)return a.p;let o=`${e.__pk}|${n.key}|${i}`,s=this.pipelines.get(o);return s||=this._createPipeline(e,n,r,o),n.pipelines&&n.pipelines.set(i,{materialKey:e.__pk,p:s}),s}_createPipeline(e,n,r,i){let a=xn(e,n.layout,r),o=wt({modules:a.modules,bindings:a.bindings,code:a.code,defines:a.defines,stage:`render`,label:e.name}),s=Ot(o.code,e.name);this._ensureDrawBuffer();let c=t.device.createPipelineLayout({bindGroupLayouts:[o.group0.layout,o.bindings.layout,this.drawLayout]}),l=On(e.blending),u=[];r.kind===`main`?u=[{format:r.colorFormats[0],blend:e.transparent||r.late?l:void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0},{format:r.colorFormats[1],blend:r.late?On(`premultiplied`):void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0},{format:r.colorFormats[2],blend:On(`normal`),writeMask:e.colorWrite?GPUColorWrite.ALL:0}]:r.kind===`color`&&(u=r.colorFormats.map(t=>({format:t,blend:l,writeMask:e.colorWrite?GPUColorWrite.ALL:0})));let d=e.side,f=r.cullOverride||(d===`double`?`none`:d===`back`?`front`:`back`),p=e.depthTest?e.depthCompare||r.depthCompare:`always`,m={label:e.name+` `+r.kind,layout:c,vertex:{module:s,entryPoint:`vs`,buffers:n.buffers.map(e=>e.layout)},primitive:{topology:e.topology,cullMode:f,frontFace:`ccw`}};a.hasFragment&&(m.fragment={module:s,entryPoint:`fs`,targets:u}),r.depthFormat&&(m.depthStencil={format:r.depthFormat,depthWriteEnabled:e.depthWrite,depthCompare:p,depthBias:r.kind===`depth`?r.depthBias||0:e.depthBias,depthBiasSlopeScale:r.kind===`depth`?r.depthBiasSlopeScale||0:e.depthBiasSlopeScale});let h={handle:t.renderPipeline(m),bindings:o.bindings,label:m.label};return this.pipelines.set(i,h),this.stats.pipelines=this.pipelines.size,h}collect(e,{camera:t,layerMask:n=4294967295,filter:r=null,kind:i=`main`,cull:a=!0,frameBlock:o=U}){let s=[],c=[];t&&(t.updateMatrixWorld(),Rn.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse.copy(t.matrixWorld).invert()),Ln.setFromProjectionMatrix(Rn,t.reversedDepth!==!1),Bn.setFromMatrixPosition(t.matrixWorld));let l=this.precompiling,u=e=>{if(e.visible||l){e.isMesh&&e.material&&e.geometry&&(e.layers.mask&n)!==0&&(!r||r(e))&&(i!==`depth`||e.castShadow)&&(l||!a||!t||e.frustumCulled===!1||this._inFrustum(e,t,o,i))&&(e.onBeforeRender&&e.onBeforeRender(null,null,t,e.geometry,e.material,null),(e.visible||l)&&this._addItems(e,s,c));for(let t of e.children)u(t)}};e.updateMatrixWorld(),u(e),s.sort((e,t)=>e.renderOrder-t.renderOrder||e.pipeKey-t.pipeKey||e.z-t.z);for(let e=1;e<s.length;e++){let t=e;for(;t>0;){let e=s[t-1],n=s[t];if(!e.sortBounds||!n.sortBounds||e.renderOrder!==n.renderOrder||e.pipeKey!==n.pipeKey||e.spatialDepth<=n.spatialDepth||e.sortBounds.intersectsBox(n.sortBounds)||!Wn(e.sortDepthRange,n.sortDepthRange))break;s[t-1]=n,s[t]=e,t--}}return c.sort((e,t)=>e.renderOrder-t.renderOrder||t.z-e.z),{opaque:s,transparent:c}}_inFrustum(e,t,n,r){let i=null;if(e.isInstancedMesh?(!e.boundingSphere&&e.computeBoundingSphere&&e.computeBoundingSphere(),i=e.boundingSphere):(e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),i=e.geometry.boundingSphere),!i||i.radius<0||!Number.isFinite(i.radius))return!0;if(In.copy(i).applyMatrix4(e.matrixWorld),e.userData?.spatialSort&&t){let e=In.center.distanceTo(Bn)+In.radius,i=Math.max(.001,e*1e-6);if(r!==`depth`){let r=n?.fields,a=r?.resolution?.value,o=r?.jitter?.value,s=Math.max(1,a?.x||1),c=Math.max(1,a?.y||1),l=Math.max(2,Math.abs(o?.x||0)*s/2+1),u=Math.max(2,Math.abs(o?.y||0)*c/2+1),d=t.projectionMatrix.elements,f=d[15]===0?e:1;i+=Math.max(2*l/(s*Math.abs(d[0])),2*u/(c*Math.abs(d[5])))*f}In.radius+=i}return Ln.intersectsSphere(In)}_addItems(e,t,n){let r=e.geometry,i=Array.isArray(e.material)?e.material:null,a=zn.setFromMatrixPosition(e.matrixWorld).distanceToSquared(Bn),o=this.spatialSortEnabled&&e.userData?.spatialSort&&r.boundingBox?Vn.copy(r.boundingBox).applyMatrix4(e.matrixWorld).expandByScalar(.001).clone():null,s=o?o.distanceToPoint(Bn)**2:a,c=o?Un(o,Rn):null,l=(i,l,u)=>{if(!i||!i.visible&&!this.precompiling)return;let d=i.depthTest&&i.depthWrite&&i.blending===`none`,f={object:e,geometry:r,material:i,start:l,count:u,z:a,spatialDepth:s,sortBounds:d?o:null,sortDepthRange:c,renderOrder:e.renderOrder||0,pipeKey:i.id};(i.transparent?n:t).push(f)},u=r.drawRange||{start:0,count:1/0};if(i&&r.groups&&r.groups.length)for(let e of r.groups){let t=Math.max(e.start,u.start),n=Math.min(e.start+e.count,u.start+u.count);n>t&&l(i[e.materialIndex],t,n-t)}else l(i?i[0]:e.material,u.start,u.count)}async prepareMeshes(e,n,{cancelled:r=()=>!1}={}){let i=new Set,a=globalThis.performance?.now()??Date.now();for(let t of n){let n={kind:`main`,late:!1,colorFormats:[],depthFormat:null,depthCompare:`greater-equal`,frameBlock:U,layerMask:4294967295,...t};n.passKey=`${n.kind}.${+!!n.late}.${n.colorFormats.join(`,`)}.${n.depthFormat}.${n.depthCompare}.${n.cullOverride||``}.${n.defines?JSON.stringify(n.defines):``}`;for(let t of e){if(r())return;if(!(t.layers.mask&n.layerMask)||n.kind===`depth`&&!t.castShadow)continue;let e=this._cachedLayout(t,t.geometry,t.material);this._indexBuffer(t.geometry),i.add(this._pipeline(t.material,e,n).handle),(globalThis.performance?.now()??Date.now())-a>=8&&typeof requestAnimationFrame==`function`&&(await new Promise(e=>requestAnimationFrame(e)),a=globalThis.performance?.now()??Date.now())}}if(await t.pipelinesReady(),!r()){for(let e of i)if(e.failed||!e.pipeline)throw Error(`Could not prepare `+e.label)}}render(e,n){this._beginFrame(),n={kind:`main`,late:!1,colorFormats:[],depthFormat:null,depthCompare:`greater-equal`,frameBlock:U,layerMask:4294967295,...n},n.passKey=`${n.kind}.${+!!n.late}.${n.colorFormats.join(`,`)}.${n.depthFormat}.${n.depthCompare}.${n.cullOverride||``}.${n.defines?JSON.stringify(n.defines):``}`;let r=n.items||this.collect(e,n),i=t.getEncoder(),a=(n.colorViews||[]).map((e,t)=>{let r=n.clearColors?n.clearColors[t]:null;return{view:e,loadOp:r?`clear`:`load`,storeOp:`store`,clearValue:r||[0,0,0,0]}}),o={label:n.label||n.kind,colorAttachments:a};n.depthView&&(o.depthStencilAttachment={view:n.depthView,depthLoadOp:n.clearDepth===null||n.clearDepth===void 0?`load`:`clear`,depthStoreOp:`store`,depthClearValue:n.clearDepth??0}),n.timestampWrites&&(o.timestampWrites=n.timestampWrites);let s=i.beginRenderPass(o);n.viewport&&s.setViewport(...n.viewport),s.setBindGroup(0,Ct(n.frameBlock,`render`).getBindGroup()),this.drawItems(s,r.opaque,n),n.betweenLists&&n.betweenLists(s),this.drawItems(s,r.transparent,n),n.after&&n.after(s),s.end()}drawItems(e,n,r){let i=null,a=null,o=new Je(e),s=++Kn;for(let c of n){let{object:n,geometry:l,material:u}=c;if(!l.attributes.position&&!l.vertexCount&&!l.indirect)continue;let d,f;if(this.precompiling){try{d=this._cachedLayout(n,l,u),f=this._pipeline(u,d,r)}catch{continue}continue}d=this._cachedLayout(n,l,u),f=this._pipeline(u,d,r);let p=f.handle.pipeline||(this.syncPipelines?t.ready(f.handle):null);if(!p)continue;f!==i&&(e.setPipeline(p),i=f);let m=f.bindings.getBindGroup(s);m!==a&&(e.setBindGroup(1,m),a=m),o.bindObject(this.drawBindGroup,this._slot(n)*qn);for(let e=0;e<d.buffers.length;e++)o.bindVertex(e,this._attributeBuffer(l,d.buffers[e].attr));let h=n.isInstancedMesh?n.count:l.instanceCount??1;if(h===0)continue;let g=this._indexBuffer(l);if(l.indirect){let t=l.indirect.buffer.getGPU?l.indirect.buffer.getGPU():l.indirect.buffer,n=l.indirect.offsets||[l.indirect.offset||0];g&&o.bindIndex(g.buffer,g.format);for(let r of n)g?e.drawIndexedIndirect(t,r):e.drawIndirect(t,r),this.stats.draws++;continue}if(g){let t=Math.min(c.count,l.index.count-c.start);if(t<=0)continue;o.bindIndex(g.buffer,g.format),e.drawIndexed(t,h===1/0?1:h,c.start,0,0),this.stats.triangles+=t/3*h}else{let t=l.attributes.position?l.attributes.position.count:l.vertexCount,n=Math.min(c.count,t-c.start);if(n<=0)continue;e.draw(n,h,c.start,0),this.stats.triangles+=n/3*h}this.stats.draws++}}};function G(e){return Math.ceil(e/4)*4}function Yn(e,n){if(n.byteLength%4==0){t.queue.writeBuffer(e,0,n.buffer,n.byteOffset,n.byteLength);return}let r=new Uint8Array(G(n.byteLength));r.set(new Uint8Array(n.buffer,n.byteOffset,n.byteLength)),t.queue.writeBuffer(e,0,r)}var Xn=new WeakMap;function Zn(e){let t=e.isInterleavedBufferAttribute?e.data:e;if(!$n(e).converted)return t.array;let n=Xn.get(t);if(n&&n.version===t.version)return n.array;let r=e.count,i=e.itemSize,a=new Float32Array(r*i),o=e.normalized?Qn(t.array):1;for(let e=0;e<r*i;e++)a[e]=t.array[e]/o;return Xn.set(t,{version:t.version,array:a}),a}function Qn(e){return e instanceof Uint8Array?255:e instanceof Int8Array?127:e instanceof Uint16Array?65535:e instanceof Int16Array?32767:1}function $n(e){let t=(e.isInterleavedBufferAttribute?e.data:e).array,n=e.itemSize,r=e.normalized,i=e=>n===1?e:`vec${n}${e===`f32`?`f`:e===`u32`?`u`:`i`}`;if(t instanceof Float32Array)return{format:n===1?`float32`:`float32x${n}`,wgsl:i(`f32`),bytesPerComponent:4,itemSize:n};if(t instanceof Uint32Array)return{format:n===1?`uint32`:`uint32x${n}`,wgsl:i(`u32`),bytesPerComponent:4,itemSize:n};if(t instanceof Int32Array)return{format:n===1?`sint32`:`sint32x${n}`,wgsl:i(`i32`),bytesPerComponent:4,itemSize:n};let a={Uint8Array:[`uint8`,`unorm8`,1],Int8Array:[`sint8`,`snorm8`,1],Uint16Array:[`uint16`,`unorm16`,2],Int16Array:[`sint16`,`snorm16`,2]}[t.constructor.name];return a&&(n===2||n===4)&&!e.isInterleavedBufferAttribute?{format:(r?a[1]:a[0])+`x`+n,wgsl:i(r?`f32`:t instanceof Uint8Array||t instanceof Uint16Array?`u32`:`i32`),bytesPerComponent:a[2],itemSize:n}:{format:n===1?`float32`:`float32x${n}`,wgsl:i(`f32`),bytesPerComponent:4,itemSize:n,converted:!0}}var er=class{constructor(t){this.container=t,this.renderScale=1,this.clock=new qe,this.frame=0,this.onResize=[],this.renderOptimizations=e(),this.pacingStats={callbacks:0,submitted:0,completed:0,skipped:0,inFlight:0,maxInFlight:0}}async init(){let e=document.createElement(`canvas`);e.tabIndex=0,this.container.appendChild(e),this.canvas=e,this.domElement=e,await t.init({canvas:e}),t.reuseAllocationBindings=this.renderOptimizations.bindingReuse,this.meshRenderer=new Jn,this.meshRenderer.syncPipelines=!1,this.camera=new Ue(62,window.innerWidth/window.innerHeight,.06,6e4),this.scene=new Ge,window.addEventListener(`resize`,()=>this.resize()),this.resize()}setRenderScale(e){this.renderScale=e,this.resize()}get width(){return this.canvas.width}get height(){return this.canvas.height}resize(){let e=window.innerWidth,t=window.innerHeight,n=this.renderScale;this.canvas.width=Math.max(1,Math.floor(e*n)),this.canvas.height=Math.max(1,Math.floor(t*n)),this.canvas.style.width=e+`px`,this.canvas.style.height=t+`px`,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),U.fields.outputResolution.value.set(this.canvas.width,this.canvas.height);for(let n of this.onResize)n(e,t)}currentTexture(){return t.context.getCurrentTexture()}start(e){this.stop(),this._running=!0;let n=this._loopGeneration,r=t.queue,i=this.renderOptimizations.framePacing;(!this._flight||this._flight.queue!==r)&&(this._flight={queue:r,count:0});let a=this._flight,o=this.pacingStats;i&&this.clock.reset();let s=t=>{if(this._running&&n===this._loopGeneration){if(o.callbacks++,i&&a.count>=2)o.skipped++;else{this.clock.update(t),this.frameInterval=this.clock.getDelta();let n=Math.min(.1,this.frameInterval);this.frame++,e(n,this.clock.getElapsed()),o.submitted++,i&&(a.count++,o.inFlight=a.count,o.maxInFlight=Math.max(o.maxInFlight,a.count),r.onSubmittedWorkDone().then(()=>{a.count--,o.completed++,a===this._flight&&(o.inFlight=a.count)},e=>{a.count--,a===this._flight&&(o.inFlight=a.count,o.error=String(e),this.stop(),console.error(`Frame queue failed:`,e))}))}this._running&&n===this._loopGeneration&&(this._raf=requestAnimationFrame(s))}};this._raf=requestAnimationFrame(s)}stop(){this._running=!1,this._loopGeneration=(this._loopGeneration||0)+1,cancelAnimationFrame(this._raf)}},tr=`
struct FSIn { @builtin( position ) pos: vec4f, @location( 0 ) uv: vec2f };
@vertex fn vs( @builtin( vertex_index ) i: u32 ) -> FSIn {
	let p = vec2f( f32( ( i << 1u ) & 2u ), f32( i & 2u ) );
	var o: FSIn;
	o.pos = vec4f( p * 2.0 - 1.0, FS_DEPTH, 1.0 );
	o.uv = vec2f( p.x, 1.0 - p.y );
	return o;
}
`,nr=class{constructor({label:e=`fullscreen`,modules:n=[],bindings:r={},code:i,colorFormats:a=[`rgba16float`],blend:o=`none`,defines:s={},depthFormat:c=null,depthCompare:l=`always`,depthWrite:u=!1,depth:d=0,writeMasks:f=null,blends:p=null}){this.label=e,this.colorFormats=a;let m=i.includes(`@fragment`)?i:`${i}\n@fragment fn fs( in: FSIn ) -> @location( 0 ) vec4f { return fragment( in ); }\n`,h=wt({modules:[I,...n],bindings:r,code:tr.replace(`FS_DEPTH`,d.toFixed(6))+m,defines:s,stage:`render`,label:e});this.source=h.code,this.bindings=h.bindings;let g=Ot(h.code,e),_={label:e,layout:t.device.createPipelineLayout({bindGroupLayouts:[h.group0.layout,h.bindings.layout]}),vertex:{module:g,entryPoint:`vs`},fragment:{module:g,entryPoint:`fs`,targets:a.map((e,t)=>({format:e,blend:On(p?p[t]:t===0?o:`none`),writeMask:f?f[t]:GPUColorWrite.ALL}))},primitive:{topology:`triangle-list`}};c&&(_.depthStencil={format:c,depthCompare:l,depthWriteEnabled:u}),this.handle=t.renderPipeline(_),this.timestampWrites=null}get pipeline(){return t.ready(this.handle)}draw(e,n=U){e.setPipeline(t.ready(this.handle)),e.setBindGroup(0,Ct(n,`render`).getBindGroup()),e.setBindGroup(1,this.bindings.getBindGroup()),e.draw(3)}render({colorViews:e,clear:n=null,viewport:r=null,frameBlock:i=U,depthView:a=null,encoder:o=t.getEncoder()}={}){let s=e.map(e=>e.isTexture?e.view({dimension:`2d`,mipLevelCount:1}):e),c={label:this.label,colorAttachments:s.map(e=>({view:e,loadOp:n?`clear`:`load`,storeOp:`store`,clearValue:n||[0,0,0,0]}))};a&&(c.depthStencilAttachment={view:a,depthLoadOp:`load`,depthStoreOp:`store`}),this.timestampWrites&&(c.timestampWrites=this.timestampWrites);let l=o.beginRenderPass(c);r&&l.setViewport(...r),this.draw(l,i),l.end()}},K=Object.freeze({id:`water`,name:`Water`,width:50,length:50,depth:10,surface:0,bottom:-10,halfSize:25,beige:`#e8dfd0`});function rr(e,t){return Number.isFinite(e)&&Number.isFinite(t)&&Math.abs(e)<=K.halfSize&&Math.abs(t)<=K.halfSize}function ir(e){return!!e&&e.maxComputeWorkgroupStorageSize>=16384&&e.maxComputeInvocationsPerWorkgroup>=256&&e.maxComputeWorkgroupSizeX>=256&&e.maxStorageTexturesPerShaderStage>=4&&e.maxStorageBuffersPerShaderStage>=3}function ar(e){let t=``;for(let e=0;e<8;e++){let n=1<<e;t+=`
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
}`}function or(e,t,n,r,i,a,o=!1){let s=r*2,c=n?`${n}[ly * ${r}u + lx] = v;`:o?`mipMid[(c * 64u + gy * 8u + gx) * 2u + ${a}u] = v;`:``;return`
  if (lx < ${r}u && ly < ${r}u) {
    let i = ly * ${s*2}u + lx * 2u;
    let v = (${t}[i] + ${t}[i + 1u] + ${t}[i + ${s}u] + ${t}[i + ${s+1}u]) * 0.25;
    textureStore(${e}${i}, vec2u(gx * ${r}u + lx, gy * ${r}u + ly), c, v);
    ${c}
  }`}function sr(e){if(e===null)return[[`d`,0],[`n`,1]];if(e!==0&&e!==1)throw RangeError(`Field channel must be 0, 1, or null`);return[[e===0?`d`:`n`,e]]}function cr(e=null){let t=sr(e),n=``;for(let[e]of t)n+=`var<workgroup> ${e}2: array<vec4f, 64>;
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
`;for(let[e,r]of[[3,4],[4,2],[5,1]]){for(let[i,a]of t)n+=or(`${i}Out`,`${i}${e-1}`,e<5?`${i}${e}`:null,r,e,a,e===5);e<5&&(n+=`
  workgroupBarrier();
`)}return n+`
}`}function lr(e=null){let t=sr(e),n=``;for(let[e]of t)n+=`var<workgroup> ${e}5: array<vec4f, 64>;
var<workgroup> ${e}6: array<vec4f, 16>;
var<workgroup> ${e}7: array<vec4f, 4>;
`;n+=`@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid: vec3u, @builtin(workgroup_id) wid: vec3u) {
  let lx = lid.x; let ly = lid.y; let c = wid.z;
  let gx = 0u; let gy = 0u;
  let i = (c * 64u + ly * 8u + lx) * 2u;
`;for(let[e,r]of t)n+=`  ${e}5[ly * 8u + lx] = mipMid[i + ${r}u];\n`;n+=`  workgroupBarrier();
`;for(let[e,r]of[[6,4],[7,2],[8,1]]){for(let[i,a]of t)n+=or(`${i}Out`,`${i}${e-1}`,e<8?`${i}${e}`:null,r,e,a);e<8&&(n+=`
  workgroupBarrier();
`)}return n+`
}`}function ur(e,{ComputeKernel:t,commonModule:n,fftCommon:r,oceanU:i,limits:a}){if(!ir(a))throw Error(`Insufficient negotiated limits for paired columns`);let o=e=>({storage:e,access:`read_write`}),s=(e,t)=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}}),c=e.displacementTexture,l=e.derivativeTexture;e.columnKernel=new t({label:`Ocean Paired Columns + Mip1`,modules:[n],bindings:{...i,tmp:o(e.tmp),foam:o(e.foam),mipSrc:o(e.mipSrc),dispOut:s(c,0),derivOut:s(l,0),dispMip1:s(c,1),derivMip1:s(l,1)},workgroupSize:[256,1,1],code:ar(r)}),e.fusedMipFields=a.maxStorageTexturesPerShaderStage>=8;let u=e.derivativeOnly?[1]:e.fusedMipFields?[null]:[0,1];e.mipKernelsA=u.map(n=>{let r={mipSrc:o(e.mipSrc),mipMid:o(e.mipMid)};for(let[e,t]of sr(n))for(let n=2;n<=5;n++)r[`${e}Out${n}`]=s(t===0?c:l,n);return new t({label:`Ocean Paired Mips 2-5`+(n===null?``:` field${n}`),bindings:r,workgroupSize:[8,8,1],code:cr(n)})}),e.mipKernelsB=u.map(n=>{let r={mipMid:o(e.mipMid)};for(let[e,t]of sr(n))for(let n=6;n<=8;n++)r[`${e}Out${n}`]=s(t===0?c:l,n);return new t({label:`Ocean Paired Mips 6-8`+(n===null?``:` field${n}`),bindings:r,workgroupSize:[8,8,1],code:lr(n)})})}function dr(e,t){let n=e===`Ocean FFT Rows`,r=e===`Ocean FFT Columns`,i=e===`Ocean Paired Columns + Mip1`;return t=t.replaceAll(`let c = i32( gid.z );`,`let c = i32( gid.z ) + 2;`).replaceAll(`let c = wid.y;`,`let c = wid.y + 2u;`).replaceAll(`let c = wid.z;`,`let c = wid.z + 2u;`).replace(`let idx = gid.z *`,`let idx = ( gid.z + 2u ) *`),e===`Ocean Copy H0`&&(t=t.replace(/\s*foam\[ idx \] = 0\.0;/,``)),n?t:((n||r)&&(t=t.replace(/let a0 = fftShared\[ i2 \]; /g,``).replace(/let b0 = fftCmul2\( fftShared\[ j2 \], w \); /g,``),t=t.replace(/^\s*fftShared\[ (?:i2|j2) \] = a0 [+-] b0;\n/gm,``),n&&(t=t.replace(/\s*\/\/ Dx_hat[\s\S]*?(?=\s*\/\/ c2 =)/,`
`),t=t.replace(/^\s*fftShared\[ r \] = vec4f\( c0, c1 \);\n/gm,``).replace(/^\s*tmp\[ o \] = fftShared\[ x \* 2u \];\n/gm,``)),r&&(t=t.replace(/^\s*fftShared\[ r \] = tmp\[ idx \* 2u \];\n/gm,``).replace(/^\s*let A = fftShared\[ y \* 2u \] \* sign;\n/gm,``).replace(/^\s*let Dx = A.x;[^\n]*\n/gm,``).replace(/\s*let jxx = lambda \* Dxx \+ 1\.0;[\s\S]*?(?=\s*let uv =)/,`
`).replace(/^\s*let vDisp = [^;]+;\n/gm,``).replace(/^\s*textureStore\( dispOut,[^\n]+\n/gm,``).replace(/^\s*mipSrc\[ idx \* 2u \] = vDisp;\n/gm,``))),i&&(t=t.replace(/let a0 = fftShared\[i2\]; /g,``).replace(/\s*let b0 = fftCmul2\(fftShared\[j2\], w\);/g,``),t=t.replace(/^\s*fftShared\[(?:i2|j2)\] = a0 [+-] b0;\n/gm,``).replace(/^\s*fftShared\[r\] = tmp\[idx \* 2u\];\n/gm,``).replace(/^\s*let A = fftShared\[k\] \* sign;\n/gm,``).replace(/^\s*let Dx = A.x;[^\n]*\n/gm,``).replace(/\s*let jxx = lambda \* Dxx \+ 1\.0;[\s\S]*?(?=\s*let uv =)/,`
`).replace(/^\s*let vDisp = [^;]+;\n/gm,``).replace(/^\s*textureStore\(dispOut,[^\n]+\n/gm,``).replace(/^\s*fftShared\[k\] = vDisp;\n/gm,``).replace(/^\s*let vd = [^;]+;\n/gm,``).replace(/^\s*textureStore\(dispMip1,[^\n]+\n/gm,``).replace(/^\s*mipSrc\[dst\] = vd;\n/gm,``)),t)}var fr=class extends Le{constructor(){super(),this.type=`Group`}};fr.prototype.isGroup=!0;var pr=35044,q=new l,mr=new M,hr={getComponent(e,t){let n=this.array[this._idx(e,t)];return this.normalized?ye(n,this.array):n},setComponent(e,t,n){return this.array[this._idx(e,t)]=this.normalized?be(n,this.array):n,this},getX(e){return this.getComponent(e,0)},getY(e){return this.getComponent(e,1)},getZ(e){return this.getComponent(e,2)},getW(e){return this.getComponent(e,3)},setX(e,t){return this.setComponent(e,0,t)},setY(e,t){return this.setComponent(e,1,t)},setZ(e,t){return this.setComponent(e,2,t)},setW(e,t){return this.setComponent(e,3,t)},setXY(e,t,n){return this.setComponent(e,0,t),this.setComponent(e,1,n)},setXYZ(e,t,n,r){return this.setComponent(e,0,t),this.setComponent(e,1,n),this.setComponent(e,2,r)},setXYZW(e,t,n,r,i){return this.setComponent(e,0,t),this.setComponent(e,1,n),this.setComponent(e,2,r),this.setComponent(e,3,i)},applyMatrix3(e){if(this.itemSize===2)for(let t=0;t<this.count;t++)mr.fromBufferAttribute(this,t).applyMatrix3(e),this.setXY(t,mr.x,mr.y);else if(this.itemSize===3)for(let t=0;t<this.count;t++)q.fromBufferAttribute(this,t).applyMatrix3(e),this.setXYZ(t,q.x,q.y,q.z);return this},applyMatrix4(e){for(let t=0;t<this.count;t++)q.fromBufferAttribute(this,t).applyMatrix4(e),this.setXYZ(t,q.x,q.y,q.z);return this},applyNormalMatrix(e){for(let t=0;t<this.count;t++)q.fromBufferAttribute(this,t).applyNormalMatrix(e),this.setXYZ(t,q.x,q.y,q.z);return this},transformDirection(e){for(let t=0;t<this.count;t++)q.fromBufferAttribute(this,t).transformDirection(e),this.setXYZ(t,q.x,q.y,q.z);return this}},J=class extends a{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`BufferAttribute: array should be a Typed Array.`);this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=pr,this.updateRanges=[],this.gpuType=1015,this.version=0,this.onUploadCallback=gr}set needsUpdate(e){e===!0&&this.version++}_idx(e,t){return e*this.itemSize+t}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){let r=this.itemSize;e*=r,n*=t.itemSize;for(let i=0;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}set(e,t=0){return this.array.set(e,t),this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}dispose(){this.dispatchEvent({type:`dispose`})}};Object.assign(J.prototype,hr),J.prototype.isBufferAttribute=!0;function gr(){}var _r=class extends J{constructor(e,t,n){super(new Uint16Array(e),t,n)}},vr=class extends J{constructor(e,t,n){super(new Uint32Array(e),t,n)}},yr=class extends J{constructor(e,t,n){super(new Float32Array(e),t,n)}},br=class e extends J{constructor(e,t,n,r=1){super(e,t,n),this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new e(this.array,this.itemSize).copy(this)}};br.prototype.isInstancedBufferAttribute=!0;var xr=class extends a{constructor(e,t){super(),this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=pr,this.updateRanges=[],this.version=0,this.uuid=A(),this.onUploadCallback=gr}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}set(e,t=0){return this.array.set(e,t),this}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0;r<this.stride;r++)this.array[e+r]=t.array[n+r];return this}clone(){return new this.constructor(new this.array.constructor(this.array),this.stride).copy(this)}dispose(){this.dispatchEvent({type:`dispose`})}};xr.prototype.isInterleavedBuffer=!0;var Sr=class e extends xr{constructor(e,t,n=1){super(e,t),this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new e(new this.array.constructor(this.array),this.stride,this.meshPerAttribute)}};Sr.prototype.isInstancedInterleavedBuffer=!0;var Cr=class{constructor(e,t,n,r=!1){this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}_idx(e,t){return e*this.data.stride+this.offset+t}clone(){let e=new this.array.constructor(this.count*this.itemSize);for(let t=0;t<this.count;t++)for(let n=0;n<this.itemSize;n++)e[t*this.itemSize+n]=this.array[this._idx(t,n)];return new J(e,this.itemSize,this.normalized)}};Object.assign(Cr.prototype,hr),Cr.prototype.isInterleavedBufferAttribute=!0;var wr=0,Tr=new v,Er=new T,Dr=new o,Or=new H,kr=new l,Ar=new l;function jr(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}var Mr=class e extends a{constructor(){super(),Object.defineProperty(this,"id",{value:wr++}),this.uuid=A(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(jr(e)?vr:_r)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this.attributesVersion=(this.attributesVersion||0)+1,this}deleteAttribute(e){return delete this.attributes[e],this.attributesVersion=(this.attributesVersion||0)+1,this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;n!==void 0&&(n.applyNormalMatrix(Er.getNormalMatrix(e)),n.needsUpdate=!0);let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return this.applyMatrix4(Tr.makeRotationFromQuaternion(e))}rotateX(e){return this.applyMatrix4(Tr.makeRotationX(e))}rotateY(e){return this.applyMatrix4(Tr.makeRotationY(e))}rotateZ(e){return this.applyMatrix4(Tr.makeRotationZ(e))}translate(e,t,n){return this.applyMatrix4(Tr.makeTranslation(e,t,n))}scale(e,t,n){return this.applyMatrix4(Tr.makeScale(e,t,n))}lookAt(e){return Tr.lookAt(e,kr.set(0,0,0),new l(0,1,0)),Dr.setFromRotationMatrix(Tr),this.applyQuaternion(Dr)}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ar).negate(),this.translate(Ar.x,Ar.y,Ar.z)}setFromPoints(e){let t=[];for(let n of e)t.push(n.x,n.y,n.z||0);return this.setAttribute(`position`,new yr(t,3))}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new H);let e=this.attributes.position;if(e===void 0){this.boundingBox.makeEmpty();return}this.boundingBox.setFromBufferAttribute(e)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bt);let e=this.attributes.position;if(e===void 0){this.boundingSphere.makeEmpty();return}let t=this.boundingSphere.center;Or.setFromBufferAttribute(e).getCenter(t);let n=0;for(let r=0;r<e.count;r++)n=Math.max(n,t.distanceToSquared(kr.fromBufferAttribute(e,r)));this.boundingSphere.radius=Math.sqrt(n)}computeTangents(){let e=this.index,t=this.attributes.position,n=this.attributes.normal,r=this.attributes.uv;if(e===null||t===void 0||n===void 0||r===void 0){console.error(`BufferGeometry.computeTangents(): missing required attributes (index, position, normal or uv)`);return}let i=t.count;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new J(new Float32Array(4*i),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<i;e++)o[e]=new l,s[e]=new l;let c=new l,u=new l,d=new l,f=new M,p=new M,m=new M,h=new l,g=new l,_=(e,n,i)=>{c.fromBufferAttribute(t,e),u.fromBufferAttribute(t,n),d.fromBufferAttribute(t,i),f.fromBufferAttribute(r,e),p.fromBufferAttribute(r,n),m.fromBufferAttribute(r,i),u.sub(c),d.sub(c),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[n].add(h),o[i].add(h),s[e].add(g),s[n].add(g),s[i].add(g))},v=this.groups.length?this.groups:[{start:0,count:e.count}];for(let t of v)for(let n=t.start;n<t.start+t.count;n+=3)_(e.getX(n),e.getX(n+1),e.getX(n+2));let y=new l,b=new l,x=new l,S=new l,C=e=>{b.fromBufferAttribute(n,e),x.copy(b);let t=o[e];y.copy(t).sub(b.multiplyScalar(b.dot(t))).normalize(),S.crossVectors(x,t);let r=S.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,r)};for(let t of v)for(let n=t.start;n<t.start+t.count;n++)C(e.getX(n))}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t===void 0)return;let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new J(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0;e<n.count;e++)n.setXYZ(e,0,0,0);let r=new l,i=new l,a=new l,o=new l,s=new l,c=new l,u=new l,d=new l;if(e)for(let l=0,f=e.count;l<f;l+=3){let f=e.getX(l),p=e.getX(l+1),m=e.getX(l+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),o.subVectors(a,i),s.subVectors(r,i),o.cross(s),c.fromBufferAttribute(n,f),u.fromBufferAttribute(n,p),d.fromBufferAttribute(n,m),c.add(o),u.add(o),d.add(o),n.setXYZ(f,c.x,c.y,c.z),n.setXYZ(p,u.x,u.y,u.z),n.setXYZ(m,d.x,d.y,d.z)}else for(let e=0,c=t.count;e<c;e+=3)r.fromBufferAttribute(t,e),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),o.subVectors(a,i),s.subVectors(r,i),o.cross(s),n.setXYZ(e,o.x,o.y,o.z),n.setXYZ(e+1,o.x,o.y,o.z),n.setXYZ(e+2,o.x,o.y,o.z);this.normalizeNormals(),n.needsUpdate=!0}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kr.fromBufferAttribute(e,t).normalize(),e.setXYZ(t,kr.x,kr.y,kr.z)}toNonIndexed(){if(this.index===null)return console.warn(`BufferGeometry.toNonIndexed(): geometry is already non-indexed.`),this;let t=new e,n=this.index,r=e=>{let t=e.itemSize,r=new e.array.constructor(n.count*t);for(let i=0;i<n.count;i++){let a=n.getX(i);for(let n=0;n<t;n++)r[i*t+n]=e.array[e._idx(a,n)]}return new J(r,t,e.normalized)};for(let e in this.attributes)t.setAttribute(e,r(this.attributes[e]));for(let e in this.morphAttributes)t.morphAttributes[e]=this.morphAttributes[e].map(r);t.morphTargetsRelative=this.morphTargetsRelative;for(let e of this.groups)t.addGroup(e.start,e.count,e.materialIndex);return t}clone(){return new e().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.name=e.name,e.index!==null&&this.setIndex(e.index.clone());for(let t in e.attributes)this.setAttribute(t,e.attributes[t].clone());for(let t in e.morphAttributes)this.morphAttributes[t]=e.morphAttributes[t].map(e=>e.clone());this.morphTargetsRelative=e.morphTargetsRelative;for(let t of e.groups)this.addGroup(t.start,t.count,t.materialIndex);return e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}};Mr.prototype.isBufferGeometry=!0;var Nr=class e extends Mr{constructor(){super(),this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}clone(){return new e().copy(this)}};Nr.prototype.isInstancedBufferGeometry=!0;var Pr=class extends Le{constructor(e=new Mr,t=null){super(),this.type=`Mesh`,this.geometry=e,this.material=t,this.count=1}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this.count=e.count,this}};Pr.prototype.isMesh=!0;var Fr=new v,Ir=new H,Lr=new Bt,Rr=class e extends Pr{constructor(e,t,n){super(e,t),this.type=`InstancedMesh`,this.instanceMatrix=new br(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Fr.identity())}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}getColorAt(e,t){return t.fromArray(this.instanceColor.array,e*3)}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new br(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new H),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,Fr),Ir.copy(e.boundingBox).applyMatrix4(Fr),this.boundingBox.union(Ir)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Bt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,Fr),Lr.copy(e.boundingSphere).applyMatrix4(Fr),this.boundingSphere.union(Lr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}clone(t){return new e(this.geometry,this.material,this.count).copy(this,t)}dispose(){this.dispatchEvent({type:`dispose`})}};Rr.prototype.isInstancedMesh=!0;function zr(e,t,n,r,i){t&&e.setIndex(t),e.setAttribute(`position`,new yr(n,3)),e.setAttribute(`normal`,new yr(r,3)),e.setAttribute(`uv`,new yr(i,2))}var Br=class extends Mr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a},r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let o=[],s=[],c=[],u=[],d=0,f=0,p=new l,m=(e,t,n,r,i,a,l,m,h,g,_)=>{let v=a/h,y=l/g,b=a/2,x=l/2,S=m/2,C=h+1,w=g+1,T=0,E=0;for(let a=0;a<w;a++){let o=a*y-x;for(let l=0;l<C;l++){let d=l*v-b;p[e]=d*r,p[t]=o*i,p[n]=S,s.push(p.x,p.y,p.z),p[e]=0,p[t]=0,p[n]=m>0?1:-1,c.push(p.x,p.y,p.z),u.push(l/h,1-a/g),T++}}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d,r=n+t+C*e,i=n+t+C*(e+1),a=n+(t+1)+C*(e+1),s=n+(t+1)+C*e;o.push(r,i,s,i,a,s),E+=6}this.addGroup(f,E,_),f+=E,d+=T};m(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),m(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),m(`x`,`z`,`y`,1,1,e,n,t,r,a,2),m(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),m(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),m(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),zr(this,o,s,c,u)}},Vr=class extends Mr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,u=[],d=[],f=[],p=[],m=[],h=new l;for(let l=0;l<=n;l++){let d=[],g=l/n,_=0;l===0&&a===0?_=.5/t:l===n&&s===Math.PI&&(_=-.5/t);for(let n=0;n<=t;n++){let s=n/t,l=Math.sin(a+g*o);h.set(-e*Math.cos(r+s*i)*l,e*Math.cos(a+g*o),e*Math.sin(r+s*i)*l),f.push(h.x,h.y,h.z),h.normalize(),p.push(h.x,h.y,h.z),m.push(s+_,1-g),d.push(c++)}u.push(d)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=u[e][r+1],i=u[e][r],o=u[e+1][r],c=u[e+1][r+1];(e!==0||a>0)&&d.push(t,i,c),(e!==n-1||s<Math.PI)&&d.push(i,o,c)}zr(this,d,f,p,m)}},Hr=class extends Mr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s},r=Math.floor(r),i=Math.floor(i);let c=[],u=[],d=[],f=[],p=[],m=n/2,h=0,g=0,_=new l;{let a=0,l=(t-e)/n;for(let a=0;a<=i;a++){let c=[],g=a/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,a=Math.sin(i),p=Math.cos(i);u.push(v*a,-g*n+m,v*p),_.set(a,l,p).normalize(),d.push(_.x,_.y,_.z),f.push(t,1-g),c.push(h++)}p.push(c)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let o=p[r][n],s=p[r+1][n],l=p[r+1][n+1],u=p[r][n+1];(e>0||r!==0)&&(c.push(o,s,u),a+=3),(t>0||r!==i-1)&&(c.push(s,l,u),a+=3)}this.addGroup(g,a,0),g+=a}let v=n=>{let i=h,a=n===!0?e:t,l=n===!0?1:-1,p=0;for(let e=1;e<=r;e++)u.push(0,m*l,0),d.push(0,l,0),f.push(.5,.5),h++;let _=h;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);u.push(a*i,m*l,a*n),d.push(0,l,0),f.push(n*.5+.5,i*.5*l+.5),h++}for(let e=0;e<r;e++){let t=i+e,r=_+e;n===!0?c.push(r,r+1,t):c.push(r+1,r,t),p+=3}this.addGroup(g,p,n===!0?1:2),g+=p};a===!1&&(e>0&&v(!0),t>0&&v(!1)),zr(this,c,u,d,f)}},Ur=(1+Math.sqrt(5))/2;-Ur,-Ur,-Ur,-Ur,-Ur,-Ur;var Wr=new l;function Y(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;Wr.copy(t),Wr[r]=0,Wr.normalize();let l=.5*o/(o+s),u=1-Wr.angleTo(e)/c;return Math.sign(Wr[n])===1?u*l:s/(o+s)+l+l*(1-u)}var Gr=class extends Br{constructor(e=1,t=1,n=1,r=2,i=.1){if(r=r*2+1,i=Math.min(e/2,t/2,n/2,i),super(1,1,1,r,r,r),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},r===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let o=new l,s=new l,c=new l,u=new l(e,t,n).divideScalar(2).subScalar(i),d=this.attributes.position.array,f=this.attributes.normal.array,p=this.attributes.uv.array,m=d.length/3/6,h=.5/r;for(let r=0,a=0;r<d.length/3;r++,a+=3){o.fromArray(d,a),s.copy(o),s.x-=Math.sign(s.x)*h,s.y-=Math.sign(s.y)*h,s.z-=Math.sign(s.z)*h,s.normalize(),d[a]=u.x*Math.sign(o.x)+s.x*i,d[a+1]=u.y*Math.sign(o.y)+s.y*i,d[a+2]=u.z*Math.sign(o.z)+s.z*i,f[a]=s.x,f[a+1]=s.y,f[a+2]=s.z;let l=r*2;switch(Math.floor(r/m)){case 0:c.set(1,0,0),p[l]=Y(c,s,`z`,`y`,i,n),p[l+1]=1-Y(c,s,`y`,`z`,i,t);break;case 1:c.set(-1,0,0),p[l]=1-Y(c,s,`z`,`y`,i,n),p[l+1]=1-Y(c,s,`y`,`z`,i,t);break;case 2:c.set(0,1,0),p[l]=1-Y(c,s,`x`,`z`,i,e),p[l+1]=Y(c,s,`z`,`x`,i,n);break;case 3:c.set(0,-1,0),p[l]=1-Y(c,s,`x`,`z`,i,e),p[l+1]=1-Y(c,s,`z`,`x`,i,n);break;case 4:c.set(0,0,1),p[l]=1-Y(c,s,`x`,`y`,i,e),p[l+1]=1-Y(c,s,`y`,`x`,i,t);break;case 5:c.set(0,0,-1),p[l]=Y(c,s,`x`,`y`,i,e),p[l+1]=1-Y(c,s,`y`,`x`,i,t)}}}},Kr=0,qr=class{constructor(e={}){this.id=Kr++,this.label=e.label||e.name||`texture`+this.id,this.width=Math.max(1,e.width||1),this.height=Math.max(1,e.height||1),this.depth=Math.max(1,e.depth||(e.dimension===`cube`?6:1)),this.dimension=e.dimension||`2d`,this.format=e.format||`rgba8unorm`,this.mipsOption=e.mips??!1,this.sampleCount=e.sampleCount||1;let t=e.usage||[`sample`,`copyDst`];this.usageList=t,this.sampler=e.sampler||`linearClamp`,this.gpu=null,this.version=0,this._views=new Map,this.isTexture=!0,e.data&&(this.pendingData=e.data)}get mipLevelCount(){return this.mipsOption===!0?Math.floor(Math.log2(Math.max(this.width,this.height,this.dimension===`3d`?this.depth:1)))+1:typeof this.mipsOption==`number`?this.mipsOption:1}get usage(){let e=0;for(let t of this.usageList)e|={sample:GPUTextureUsage.TEXTURE_BINDING,render:GPUTextureUsage.RENDER_ATTACHMENT,storage:GPUTextureUsage.STORAGE_BINDING,copySrc:GPUTextureUsage.COPY_SRC,copyDst:GPUTextureUsage.COPY_DST}[t];return this.mipLevelCount>1&&(e|=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING),e}get isDepth(){return this.format.startsWith(`depth`)}get sampleType(){return i(this.format)}wgslType(e=this.defaultViewDimension){let t=this.sampleType;if(t===`depth`)return{"2d":`texture_depth_2d`,"2d-array":`texture_depth_2d_array`,cube:`texture_depth_cube`}[e];let n=t===`uint`?`u32`:t===`sint`?`i32`:`f32`;return`texture_${e.replace(`-`,`_`)}<${n}>`}get defaultViewDimension(){return this.dimension}getGPU(){return this.gpu||this._create(),this.gpu}_create(){let e=this.dimension===`3d`?`3d`:`2d`;if(this.gpu=t.device.createTexture({label:this.label,size:{width:this.width,height:this.height,depthOrArrayLayers:this.depth},dimension:e,format:this.format,mipLevelCount:this.mipLevelCount,sampleCount:this.sampleCount,usage:this.usage}),this._views.clear(),this.version++,this.pendingData){let e=this.pendingData;this.pendingData=null,this.upload(e)}}view(e=null){let t=this.getGPU(),n=e?JSON.stringify(e):``,r=this._views.get(n);return r||(r=t.createView({label:this.label+n,dimension:e?.dimension||this.defaultViewDimension,...e||{}}),this._views.set(n,r)),r}resize(e,n,r=this.depth){if(e=Math.max(1,Math.floor(e)),n=Math.max(1,Math.floor(n)),e===this.width&&n===this.height&&r===this.depth&&this.gpu)return!1;if(this.width=e,this.height=n,this.depth=r,this.gpu){let e=this.gpu;t.onSubmit(null,()=>e.destroy()),this.gpu=null}return this._create(),!0}upload(e,{mip:n=0,layer:i=0,layers:a=null,width:o=null,height:s=null,x:c=0,y:l=0}={}){if(!this.gpu){if(n===0&&i===0&&!o){this.pendingData=e,this.getGPU();return}this.getGPU()}let u=r(this.format).bytes,d=o||Math.max(1,this.width>>n),f=s||Math.max(1,this.height>>n),p=a||(this.dimension===`3d`?Math.max(1,this.depth>>n):this.depth-i),m=e instanceof ArrayBuffer?e:e.buffer,h=e instanceof ArrayBuffer?0:e.byteOffset;t.queue.writeTexture({texture:this.gpu,mipLevel:n,origin:{x:c,y:l,z:i}},m,{offset:h,bytesPerRow:d*u,rowsPerImage:f},{width:d,height:f,depthOrArrayLayers:p})}destroy(){this.gpu&&this.gpu.destroy(),this.gpu=null,this.version++}},Jr=class{constructor(e,t,{colors:n=[`rgba16float`],depth:r=null,label:i=`rt`,mips:a=!1,usage:o=[`sample`,`render`,`copySrc`,`copyDst`],depthUsage:s=[`sample`,`render`,`copySrc`,`copyDst`],scale:c=1}={}){this.label=i,this.width=Math.max(1,e|0),this.height=Math.max(1,t|0),this.scale=c,this.textures=n.map((e,t)=>{let n=typeof e==`string`?{format:e}:e;return new qr({label:`${i}.${n.name||t}`,width:this.width,height:this.height,format:n.format,mips:n.mips??a,usage:n.usage||o})}),this.depthTexture=r?new qr({label:i+`.depth`,width:this.width,height:this.height,format:r,usage:s}):null}get texture(){return this.textures[0]}get formats(){return this.textures.map(e=>e.format)}setSize(e,t){if(e=Math.max(1,e|0),t=Math.max(1,t|0),e===this.width&&t===this.height)return!1;this.width=e,this.height=t;for(let n of this.textures)n.resize(e,t);return this.depthTexture&&this.depthTexture.resize(e,t),!0}},Yr=0,Xr=class{constructor({label:e,count:t,type:n=`vec4f`,stride:r=null,data:i=null,usage:a=[]}){if(this.id=Yr++,this.label=e||`buffer`+this.id,this.count=t,this.type=n,this.stride=r||{f32:4,u32:4,i32:4,"atomic<u32>":4,"atomic<i32>":4,vec2f:8,vec2u:8,vec3f:16,vec4f:16,vec4u:16,vec4i:16,mat4x4f:64}[n],!this.stride)throw Error(`StorageBuffer ${this.label}: pass a stride for ${n}`);this.byteLength=Math.max(16,t*this.stride),this.extraUsage=a,this.gpu=null,this.version=0,this.pendingData=i,this.isStorageBuffer=!0}getGPU(){if(!this.gpu){let e=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC;for(let t of this.extraUsage)e|={vertex:GPUBufferUsage.VERTEX,index:GPUBufferUsage.INDEX,indirect:GPUBufferUsage.INDIRECT,uniform:GPUBufferUsage.UNIFORM}[t];if(this.gpu=t.device.createBuffer({label:this.label,size:Math.ceil(this.byteLength/4)*4,usage:e}),this.version++,this.pendingData){let e=this.pendingData;this.pendingData=null,this.write(e)}}return this.gpu}write(e,n=0){if(!this.gpu){if(n===0){this.pendingData=e,this.getGPU();return}this.getGPU()}t.queue.writeBuffer(this.gpu,n,e.buffer||e,e.byteOffset||0,e.byteLength??void 0)}destroy(){this.gpu&&this.gpu.destroy(),this.gpu=null}},Zr=class{constructor({label:e=`kernel`,modules:n=[],bindings:r={},code:i,workgroupSize:a=[64,1,1],defines:o={},entryPoint:s=`main`}){this.label=e,this.workgroupSize=a;let[c,l=1,u=1]=a,d=wt({modules:n,bindings:r,code:i.replace(/\bWG_X\b/g,c).replace(/\bWG_Y\b/g,l).replace(/\bWG_Z\b/g,u),defines:o,stage:`compute`,label:e});this.source=d.code,this.bindings=d.bindings,this.group0=d.group0;let f=Ot(d.code,e);this.handle=t.computePipeline({label:e,layout:t.device.createPipelineLayout({bindGroupLayouts:[d.group0.layout,d.bindings.layout]}),compute:{module:f,entryPoint:s}}),this.timestampWrites=null}get pipeline(){return t.ready(this.handle)}dispatch(e,{pass:n=null,indirect:r=null}={}){let[i,a=1,o=1]=Array.isArray(e)?e:[e];if(!r&&(i===0||a===0||o===0))return;let s=e=>{e.setPipeline(t.ready(this.handle)),e.setBindGroup(0,this.group0.getBindGroup()),e.setBindGroup(1,this.bindings.getBindGroup()),r?e.dispatchWorkgroupsIndirect(r.buffer.getGPU?r.buffer.getGPU():r.buffer,r.offset||0):e.dispatchWorkgroups(i,a,o)};n?s(n):t.computePass(this.label,s,this.timestampWrites||void 0)}groups(e,t=1,n=1){let[r,i=1,a=1]=this.workgroupSize;return[Math.ceil(e/r),Math.ceil(t/i),Math.ceil(n/a)]}};new l,new Bt,new qt,new v,new v,e().compactTargets;var Qr=[];for(let e=0;e<8;e++)Qr.push(new l);var $r=new l,ei=new l(0,1,0),ti=new v,ni=new l,ri=new L,ii=new WeakMap,ai=0;function oi(e){return!e||typeof e!=`object`?String(e):(ii.has(e)||ii.set(e,++ai),ii.get(e))}var si=class{constructor({size:e=2048,splits:t=[10,60,400],lightMargin:n=200,normalBias:r=[.015,.06,.3],bias:i=2e-5,pcssCascades:a=1,cacheStatic:o=!1,skipUnused:s=o}={}){this.size=e,this.splits=t,this.count=t.length,this.lightMargin=n,this.normalBias=r,this.periods=t.map((e,t)=>t===0?1:t===1?2:4),this.cacheStatic=o,this.skipUnused=s,this._samplingEnabled=!1,this.staticTexture=null,this.texture=new qr({label:`sunShadowMap`,width:e,height:e,depth:this.count,dimension:`2d-array`,format:`depth32float`,usage:[`sample`,`render`,`copyDst`]}),pn(this.texture),this.cascades=t.map((e,t)=>({camera:{matrixWorld:new v,matrixWorldInverse:new v,projectionMatrix:new v,near:0,far:1,reversedDepth:!1,updateMatrixWorld(){},isCamera:!0,isShadowCamera:!0},block:jn(`shadowView`+t),viewProj:new v,radius:0,dirty:!0})),this.enabled=!0,this.layerMask=4294967295,this.frame=0,this.lastSun=new l(0,-2,0);let c=dn.fields;c.count.value=this.count,c.mapSize.value=e,c.bias.value=i,c.pcssCascades.value=a,c.enabled.value=1}invalidateStatic(){for(let e of this.cascades)e.staticKey=null,e.dirty=!0}_margin(e){let t=this.splits[this.count-1],n=e/t;return Math.max(.25*n*n,.25*n)*t}_fit(e,t,n){let r=this.cascades[e],i=e===0?0:this.splits[e-1],a=this.splits[e],o=this._margin(i),s=this._margin(a),c=Math.max(t.near,i-o*.5),u=e===this.count-1?a:a+s*.5;dn.fields.blend.value[e]=new L(i,a,o,s);let d=Math.tan(t.fov*Math.PI/360),f=d*t.aspect,p=0;for(let e of[c,u])for(let n of[-1,1])for(let r of[-1,1])Qr[p++].set(n*f*e,r*d*e,-e).applyMatrix4(t.matrixWorld);let m=Math.min(u,(c+u)/2*(1+f*f+d*d));$r.set(0,0,-m).applyMatrix4(t.matrixWorld);let h=0;for(let e of Qr)h=Math.max(h,e.distanceTo($r));h=Math.ceil(h*16)/16,r.radius=h;let g=r.camera,_=n,v=Math.abs(_.y)>.99?ni.set(1,0,0):ei;g.matrixWorld.lookAt(_,new l(0,0,0),v),ti.copy(g.matrixWorld).invert();let y=2*h/this.size,b=ri.set($r.x,$r.y,$r.z,1).applyMatrix4(ti);b.x=Math.round(b.x/y)*y,b.y=Math.round(b.y/y)*y;let x=h+this.lightMargin,S=new l(b.x,b.y,b.z+x).applyMatrix4(g.matrixWorld);g.matrixWorld.setPosition(S),g.matrixWorldInverse.copy(g.matrixWorld).invert();let C=.1,w=x+h;g.near=C,g.far=w,li(g.projectionMatrix,-h,h,h,-h,C,w),r.viewProj.multiplyMatrices(g.projectionMatrix,g.matrixWorldInverse);let T=dn.fields;T.matrices.value[e]=r.viewProj.clone(),T.cascades.value[e]=new L(u,y,this.normalBias[e]??.05,w-C)}update(e,t){this.frame++;let n=this.enabled&&t.y>-.05;if(dn.fields.enabled.value=+!!n,this.skipUnused&&n&&!this._samplingEnabled&&this.invalidateStatic(),this._samplingEnabled=n,!this.enabled||this.skipUnused&&!n)return[];e.updateMatrixWorld();let r=this.lastSun.angleTo(t)>1e-4;this.lastSun.copy(t);let i=[];for(let n=0;n<this.count;n++)(r||this.cascades[n].dirty||(this.frame+n)%this.periods[n]===0)&&(this._fit(n,e,t),this.cascades[n].dirty=!1,i.push(n));return i}render(e,n,r){for(let i of r){let r=this.cascades[i];Fn(r.camera,this.size,this.size,{block:r.block});let a={label:`shadow cascade `+i,kind:`depth`,camera:r.camera,frameBlock:r.block,depthView:this.texture.view({dimension:`2d`,baseArrayLayer:i,arrayLayerCount:1}),depthFormat:`depth32float`,clearDepth:1,depthCompare:`less-equal`,layerMask:this.layerMask,depthBias:2,depthBiasSlopeScale:1.5};if(!this.cacheStatic){n.render(e,a);continue}this.staticTexture||=new qr({label:`staticShadowCache`,width:this.size,height:this.size,depth:this.count,dimension:`2d-array`,format:`depth32float`,usage:[`render`,`copySrc`]});let o=n.collect(e,{...a,filter:e=>e.shadowStatic===!0}),s=ci(r,o);r.staticKey!==s&&(n.render(e,{...a,label:`shadow static cascade `+i,items:o,depthView:this.staticTexture.view({dimension:`2d`,baseArrayLayer:i,arrayLayerCount:1})}),r.staticKey=!n.precompiling&&[...n.pipelines.values()].every(e=>e.handle.pipeline)?s:null),t.getEncoder().copyTextureToTexture({texture:this.staticTexture.getGPU(),origin:{x:0,y:0,z:i}},{texture:this.texture.getGPU(),origin:{x:0,y:0,z:i}},{width:this.size,height:this.size,depthOrArrayLayers:1}),n.render(e,{...a,clearDepth:null,filter:e=>e.shadowStatic!==!0})}}};function ci(e,t){let n=[...e.viewProj.elements.map(Math.fround),Math.fround(e.camera.near),Math.fround(e.camera.far)];for(let e of[...t.opaque,...t.transparent]){let t=e.object,r=e.geometry,i=e.material;n.push(t.id,r.id,i.id,i.version,e.start,e.count,t.count??1,t.shadowRevision??0,i.side,i.alphaTest,i.depthWrite,i.shadow,...t.matrixWorld.elements),t.drawParams&&n.push(...t.drawParams);for(let[e,t]of Object.entries(r.attributes)){let r=t.data||t;n.push(e,oi(t),oi(r.array),r.version,t.count)}r.index&&n.push(oi(r.index),oi(r.index.array),r.index.version,r.index.count),t.instanceMatrix&&n.push(oi(t.instanceMatrix),oi(t.instanceMatrix.array),t.instanceMatrix.version);for(let e of Object.values(i.uniforms||{})){let t=e.value;typeof t==`number`||typeof t==`boolean`?n.push(t):t?.elements?n.push(...t.elements):Array.isArray(t)||ArrayBuffer.isView(t)?n.push(...t):t&&typeof t==`object`&&n.push(t.x,t.y,t.z,t.w,t.r,t.g,t.b)}}return n.join(`|`)}function li(e,t,n,r,i,a,o){let s=1/(n-t),c=1/(r-i),l=1/(o-a);return e.set(2*s,0,0,-(n+t)*s,0,2*c,0,-(r+i)*c,0,0,-l,-a*l,0,0,0,1),e}var X=256,ui=8,di=X/2,fi=[733,157,33.3,7.1],pi=Math.PI*2,mi=class{constructor(e={}){this.scale=e.scale??1,this.windSpeed=e.windSpeed??8,this.windDirection=e.windDirection??20,this.fetch=e.fetch??200,this.spreadBlend=e.spreadBlend??.9,this.swell=e.swell??.2,this.peakEnhancement=e.peakEnhancement??3.3,this.shortWavesFade=e.shortWavesFade??.01}},hi=`
const FFT_N: u32 = ${X}u;
const FFT_HALF: u32 = ${di}u;
const FFT_G: f32 = ${Nn};

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
`,gi=class{constructor(e,n={}){if(this.renderer=e,this.cascades=n.cascades??4,this.derivativeOnly=n.derivativeOnly===!0,this.derivativeOnly&&this.cascades!==4)throw Error(`Rocha derivatives retain logical cascades 2 and 3 of four`);this.fusedMips=n.fusedMips??new URLSearchParams(globalThis.location?.search||``).has(`fusedOcean`),this.fusedMips&&!ir(t.limits)&&(console.warn(`Fused ocean unsupported by negotiated limits; retaining original kernels.`),this.fusedMips=!1),this.sizes=(n.sizes??fi).slice(0,this.cascades),this.depth=n.depth??500,this.local=new mi(n.local??{windSpeed:7,windDirection:25,fetch:120,spreadBlend:.85,swell:.05}),this.swell=new mi(n.swell??{scale:.48,windSpeed:6,windDirection:5,fetch:1200,spreadBlend:1,swell:.9,shortWavesFade:.1});let r=this.cascades;this.params=new N(`OceanParams`,{sizes:[`vec4f[4]`,[0,1,2,3].map(e=>new L(this.sizes[e]??1,0,0,0))],cuts:[`vec4f[4]`,[0,1,2,3].map(()=>new L)],sysA:[`vec4f[2]`,[new L,new L]],sysB:[`vec4f[2]`,[new L,new L]],choppiness:[`f32`,n.choppiness??.9],foamBias:[`f32`,.58],foamGain:[`f32`,3],foamDecay:[`f32`,.35],foamAdd:[`f32`,2.5],time:[`f32`,0],depth:[`f32`,this.depth],seed:[`u32`,1337]},{label:`ocean`});let i=this.params.fields;this.choppiness=i.choppiness,this.foamBias=i.foamBias,this.foamGain=i.foamGain,this.foamDecay=i.foamDecay,this.foamAdd=i.foamAdd,this.time=i.time,this.uDepth=i.depth,this.uSeed=i.seed,this.timeScale=1;let a=X*X*r;this.h0=new Xr({label:`fftH0`,count:a,type:`vec4f`}),this.waveData=new Xr({label:`fftWave`,count:a,type:`vec4f`}),this.tmp=new Xr({label:`fftTmp`,count:a*2,type:`vec4f`}),this.foam=new Xr({label:`fftFoam`,count:a,type:`f32`}),this.mipSrc=new Xr({label:`fftMipSrc`,count:this.fusedMips?a/2:a*2,type:`vec4f`}),this.mipMid=new Xr({label:`fftMipMid`,count:64*r*2,type:`vec4f`});let o=e=>new qr({label:e,width:X,height:X,depth:r,dimension:`2d-array`,format:`rgba16float`,mips:!0,usage:[`sample`,`storage`,`copyDst`,`copySrc`],sampler:`linearRepeat`});this.displacementTexture=o(`oceanDisplacement`),this.derivativeTexture=o(`oceanDerivatives`),this.module=new P({name:`ocean`,deps:[I],uniforms:this.params,uniformName:`ocean`,bindings:{oceanDisplacement:{texture:this.displacementTexture,viewDimension:`2d-array`},oceanDerivatives:{texture:this.derivativeTexture,viewDimension:`2d-array`}},code:`
const OCEAN_CASCADES: i32 = ${r};
const OCEAN_FFT_SIZE: f32 = ${X}.0;

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
`}),this._buildKernels(),this.updateSpectrumUniforms(),this.needsSpectrum=!0}get uSizes(){return{array:this.sizes}}setCascadeSizes(e){this.sizes=e.slice(0,this.cascades),this.updateSpectrumUniforms()}updateSpectrumUniforms(){let e=this.cascades,t=this.params.fields;for(let n=0;n<e;n++){let r=n===0?1e-4:pi/this.sizes[n]*6,i=n===e-1?9999:pi/this.sizes[n+1]*6;t.cuts.value[n].set(r,i,0,0),t.sizes.value[n].set(this.sizes[n],0,0,0)}t.depth.value=this.depth;let n=[this.local,this.swell];for(let e=0;e<2;e++){let r=n[e],i=Math.max(1,r.fetch)*1e3,a=Math.max(.1,r.windSpeed),o=.076*(Nn*i/(a*a))**-.22,s=22*(a*i/(Nn*Nn))**-.33;t.sysA.value[e].set(r.scale,xe.degToRad(r.windDirection),r.spreadBlend,r.swell),t.sysB.value[e].set(o,s,r.peakEnhancement,r.shortWavesFade)}this.params.set(`cuts`,t.cuts.value),this.params.set(`sizes`,t.sizes.value),this.params.set(`sysA`,t.sysA.value),this.params.set(`sysB`,t.sysB.value),this.needsSpectrum=!0}_buildKernels(){this.cascades;let e={ocean:{uniform:this.params}},n=e=>({storage:e,access:`read_write`}),r=this.derivativeOnly,i=class extends Zr{constructor(e){super(r?{...e,code:dr(e.label,e.code)}:e)}};this.initSpectrumKernel=new i({label:`Ocean Init Spectrum`,modules:[I],bindings:{...e,h0:n(this.h0),waveData:n(this.waveData)},workgroupSize:[16,16,1],code:hi+`
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
	let idx = c * ${X*X} + y * ${X} + x;

	let L = ocean.sizes[ c ].x;
	let dk = TWO_PI / L;
	let kx = f32( x - ${di} ) * dk;
	let kz = f32( y - ${di} ) * dk;
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
	let base = c * ${X*X};
	let idx = base + y * ${X} + x;
	let xm = ( ${X} - x ) % ${X};
	let ym = ( ${X} - y ) % ${X};
	let idxm = base + ym * ${X} + xm;
	let hm = h0[ idxm ].xy;
	let cur = h0[ idx ].xy;
	tmp[ idx ] = vec4f( cur.x, cur.y, hm.x, - hm.y );
}`}),this.copyH0Kernel=new i({label:`Ocean Copy H0`,bindings:{h0:n(this.h0),tmp:n(this.tmp),foam:n(this.foam)},workgroupSize:[16,16,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let idx = gid.z * ${X*X}u + gid.y * ${X}u + gid.x;
	h0[ idx ] = tmp[ idx ];
	foam[ idx ] = 0.0;
}`});let a=``;for(let e=0;e<ui;e++){let t=1<<e;a+=`
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
	}`}let o=`var<workgroup> fftShared: array<vec4f, ${X*2}>;\n`;if(this.rowKernel=new i({label:`Ocean FFT Rows`,modules:[I],bindings:{...e,h0:n(this.h0),waveData:n(this.waveData),tmp:n(this.tmp)},workgroupSize:[di,1,1],code:hi+o+`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let t = lid.x;
	let row = wid.x;
	let c = wid.y;
	let base = c * ${X*X}u + row * ${X}u;
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
}`}),this.fusedMips){ur(this,{ComputeKernel:i,commonModule:I,fftCommon:hi,oceanU:e,limits:t.limits});return}let s=(e,t)=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}});this.columnKernel=new i({label:`Ocean FFT Columns`,modules:[I],bindings:{...e,tmp:n(this.tmp),foam:n(this.foam),mipSrc:n(this.mipSrc),dispOut:s(this.displacementTexture,0),derivOut:s(this.derivativeTexture,0)},workgroupSize:[di,1,1],code:hi+o+`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let t = lid.x;
	let col = wid.x;
	let c = wid.y;
	let base = c * ${X*X}u;

	for ( var e = 0u; e < 2u; e++ ) {
		let y = t + e * FFT_HALF;
		let idx = base + y * ${X}u + col;
		let r = fftBitReverse8( y ) * 2u;
		fftShared[ r ] = tmp[ idx * 2u ];
		fftShared[ r + 1u ] = tmp[ idx * 2u + 1u ];
	}

	workgroupBarrier();
${a}

	let lambda = ocean.choppiness;
	for ( var e = 0u; e < 2u; e++ ) {
		let y = t + e * FFT_HALF;
		let idx = base + y * ${X}u + col;
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
fn src( c: u32, x: u32, y: u32 ) -> vec4f { return mipSrc[ ( c * ${X*X}u + y * ${X}u + x ) * 2u + ${t}u ]; }
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
}`});this.mipKernelsA=this.derivativeOnly?[l(this.derivativeTexture,1)]:[l(this.displacementTexture,0),l(this.derivativeTexture,1)],this.mipKernelsB=this.derivativeOnly?[u(this.derivativeTexture,1)]:[u(this.displacementTexture,0),u(this.derivativeTexture,1)]}update(e){let n=this.derivativeOnly?2:this.cascades;if(this.needsSpectrum){this.needsSpectrum=!1;let e=[X/16,X/16,n];this.initSpectrumKernel.dispatch(e),this.conjugateKernel.dispatch(e),this.copyH0Kernel.dispatch(e)}this.time.value+=e*this.timeScale,t.computePass(`Ocean FFT`,e=>{this.rowKernel.dispatch([X,n,1],{pass:e}),this.columnKernel.dispatch([this.fusedMips?X/2:X,n,1],{pass:e});for(let t of this.mipKernelsA)t.dispatch([X/32,X/32,n],{pass:e});for(let t of this.mipKernelsB)t.dispatch([1,1,n],{pass:e})})}sampleDisplacement(e,t=null,n=null){let r=[];for(let i=0;i<this.cascades;i++){let a=`textureSampleLevel( oceanDisplacement, smpLinearRepeat, ( ${e} ) / ocean.sizes[ ${i} ].x, ${i}, ${t??`0.0`} ).xyz`;n&&(a+=` * ( ${n[i]} )`),r.push(a)}return`( `+r.join(` + `)+` )`}},_i=6;new P({name:`whaleWater`,uniforms:new N(`WhaleMarks`,{marks:[`vec4f[${_i}]`,Array(_i).fill(0).map(()=>new L(0,0,1,0))]},{label:`whaleMarks`}),uniformName:`whaleMarks`,code:`
fn whaleWater( xz: vec2f ) -> vec2f {
	var foam = 0.0; var slick = 0.0;
	for ( var i = 0; i < ${_i}; i++ ) {
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
`}),new l,new l;var vi={left:.15,right:.15,bottom:.6,top:0},yi={cx:(vi.right-vi.left)/2,cy:(vi.top-vi.bottom)/2,sx:1+(vi.left+vi.right)/2,sy:1+(vi.top+vi.bottom)/2};new v().set(1/yi.sx,0,0,-yi.cx/yi.sx,0,1/yi.sy,0,-yi.cy/yi.sy,0,0,1,0,0,0,0,1),new v,new H,new l;var bi=new P({name:`waterFresnel`,deps:[I],code:`
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
`}),xi=yi,Si=e=>e.toFixed(6),Ci=`
// a refracted sample is usable when it lies this far behind the water surface (view depth, m): objects in
// front of it (the hull you stand in, pier piles) are rejected
const WATER_BEHIND: f32 = 0.05;
// screen NDC -> uv in the refraction image, which extends past the screen (RefractionPass guard band)
fn _waterRefrUV( ndc: vec2f ) -> vec2f {
	let n = ( ndc - vec2f( ${Si(xi.cx)}, ${Si(xi.cy)} ) ) / vec2f( ${Si(xi.sx)}, ${Si(xi.sy)} );
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
`;new P({name:`waterHelpers`,deps:[I],code:Ci});var wi=9.81,Ti=1025,Ei=3,Di=Object.freeze([[.18,11,.55,.3],[.1,7.3,.95,1.7],[.065,4.6,-.35,3.2],[.035,2.8,1.4,4.1]].map(([e,t,n,r])=>{let i=2*Math.PI/t;return Object.freeze({amplitude:e,k:i,x:Math.cos(n),z:Math.sin(n),phase:r,omega:Math.sqrt(wi*i*Math.tanh(i*K.depth))})}));function Oi(e){let t=Math.max(0,Math.min(1,(K.halfSize-Math.abs(e))/Ei));return[t*t*(3-2*t),t>0&&t<1?-Math.sign(e)*6*t*(1-t)/Ei:0]}var ki=class{constructor({strength:e=1}={}){this.strength=e}get strength(){return this._strength}set strength(e){if(!Number.isFinite(e)||e<0||e>2)throw RangeError(`Wave strength must be between 0 and 2`);this._strength=e}get maxHeight(){return Di.reduce((e,t)=>e+t.amplitude,0)*this.strength}sample(e,t,n,r=K.surface,i={}){if(i.height=i.gradientX=i.gradientZ=i.verticalSpeed=0,i.velocityX=i.velocityY=i.velocityZ=0,!rr(e,t))return i.wet=!1,i;i.wet=!0;let[a,o]=Oi(e),[s,c]=Oi(t),l=a*s,u=0,d=0,f=0,p=Math.max(-K.depth,Math.min(0,r));for(let r of Di){let a=r.k*(e*r.x+t*r.z)-r.omega*n+r.phase,o=Math.cos(a),s=Math.sin(a),c=r.amplitude*this.strength;u+=c*o,d-=c*r.k*r.x*s,f-=c*r.k*r.z*s,i.verticalSpeed+=c*r.omega*s*l;let m=c*r.omega*o*Math.cosh(r.k*(p+K.depth))/Math.sinh(r.k*K.depth),h=c*r.omega*s*Math.sinh(r.k*(p+K.depth))/Math.sinh(r.k*K.depth),g=c*c*r.omega*r.k*Math.exp(2*r.k*p);i.velocityX+=(m+g)*r.x*l,i.velocityY+=h*l,i.velocityZ+=(m+g)*r.z*l}return i.height=u*l,i.gradientX=d*l+u*o*s,i.gradientZ=f*l+u*a*c,i}},Z=e=>Number(e).toFixed(9),Ai=`
fn waveEdge(p: f32) -> vec2f {
  let q = clamp((${Z(K.halfSize)} - abs(p)) / ${Z(Ei)}, 0.0, 1.0);
  let derivative = select(0.0, -sign(p) * 6.0 * q * (1.0 - q) / ${Z(Ei)}, q > 0.0 && q < 1.0);
  return vec2f(q * q * (3.0 - 2.0 * q), derivative);
}
// Height, d(height)/dx, d(height)/dz, vertical surface speed.
fn waveSample(p: vec2f) -> vec4f {
  if (any(abs(p) > vec2f(${Z(K.halfSize)}))) { return vec4f(0.0); }
  let ex = waveEdge(p.x); let ez = waveEdge(p.y);
  var sum = vec4f(0.0);
  ${Di.map(e=>`{
    let phase = ${Z(e.k)} * dot(p, vec2f(${Z(e.x)}, ${Z(e.z)})) - ${Z(e.omega)} * waves.time + ${Z(e.phase)};
    let a = ${Z(e.amplitude)} * waves.strength;
    sum += vec4f(a * cos(phase), -a * ${Z(e.k*e.x)} * sin(phase), -a * ${Z(e.k*e.z)} * sin(phase), a * ${Z(e.omega)} * sin(phase));
  }`).join(`
`)}
  let envelope = ex.x * ez.x;
  return vec4f(sum.x * envelope, sum.y * envelope + sum.x * ex.y * ez.x,
    sum.z * envelope + sum.x * ex.x * ez.y, sum.w * envelope);
}
`,ji=1/120,Mi=(e,t,n)=>Math.max(t,Math.min(n,e)),Ni=e=>Array.isArray(e)?new l(...e):e.clone(),Pi=(e,t)=>{if(!Number.isFinite(e)||e<=0)throw RangeError(t+` must be positive and finite`);return e};function Fi(e){e.updateWorldMatrix(!0,!0);let t=e.matrixWorld.clone().invert(),n=new H,r=new l;return e.traverse(i=>{let a=i.geometry;if(!a)return;a.boundingBox||a.computeBoundingBox();let o=a.boundingBox;for(let a of[o.min.x,o.max.x])for(let s of[o.min.y,o.max.y])for(let c of[o.min.z,o.max.z])r.set(a,s,c).applyMatrix4(i.matrixWorld).applyMatrix4(t).multiply(e.scale),n.expandByPoint(r)}),n}var Ii=class{constructor(e,{dimensions:t,mass:n,density:r=550,samples:i,centerOfMass:a,displacementCenter:s,drag:c=1.1,inertia:u}={}){if(!e?.position||!e?.quaternion)throw TypeError(`A buoyant object needs position and quaternion transforms`);if(e.parent)throw TypeError(`Register an unparented object; the water map owns its world transform`);this.object=e;let d=Fi(e);this.dimensions=t?Ni(t):d.getSize(new l),this.displacementCenter=s?Ni(s):d.getCenter(new l);for(let e of[`x`,`y`,`z`])Pi(this.dimensions[e],`Object dimension`);if(this.centerOfMass=a?Ni(a):this.displacementCenter.clone(),![...this.displacementCenter.toArray(),...e.position.toArray(),...e.quaternion.toArray()].every(Number.isFinite))throw TypeError(`Invalid object transform`);if(!this.centerOfMass.toArray().every(Number.isFinite))throw TypeError(`Invalid center of mass`);let f=this.dimensions,p=f.clone().multiplyScalar(1/3);if(this.samples=i?i.map(e=>({position:Ni(e.position),volume:Pi(e.volume,`Sample volume`),halfSize:e.halfSize?Ni(e.halfSize):new l(Math.cbrt(e.volume)/2,Math.cbrt(e.volume)/2,Math.cbrt(e.volume)/2)})):[],!i)for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++)for(let n=-1;n<=1;n++)this.samples.push({position:new l(e*p.x,t*p.y,n*p.z).add(this.displacementCenter),volume:p.x*p.y*p.z,halfSize:p.clone().multiplyScalar(.5)});if(!this.samples.length)throw TypeError(`Buoyancy requires displacement samples`);for(let e of this.samples){if(!e.position.toArray().every(Number.isFinite))throw TypeError(`Invalid displacement position`);for(let t of[`x`,`y`,`z`])Pi(e.halfSize[t],`Sample half size`)}this.volume=this.samples.reduce((e,t)=>e+t.volume,0),this.mass=Pi(n??Pi(r,`Density`)*this.volume,`Mass`),this.drag=Pi(c,`Drag`),this.inertia=u?Ni(u):new l(this.mass*(f.y*f.y+f.z*f.z)/12,this.mass*(f.x*f.x+f.z*f.z)/12,this.mass*(f.x*f.x+f.y*f.y)/12);for(let e of[`x`,`y`,`z`])Pi(this.inertia[e],`Inertia`);this.velocity=new l,this.angularVelocity=new l,this.submergedVolume=0,this.buoyancyForce=0,this._r=new l,this._p=new l,this._force=new l,this._total=new l,this._torque=new l,this._relative=new l,this._pointVelocity=new l,this._inverse=new o,this._rotation=new o,this._x=new l,this._y=new l,this._z=new l,this._sample={}}step(e,t,n){let r=this.object.quaternion,i=this.object.position;this._x.set(1,0,0).applyQuaternion(r),this._y.set(0,1,0).applyQuaternion(r),this._z.set(0,0,1).applyQuaternion(r),this._total.set(0,-this.mass*wi,0),this._torque.set(0,0,0),this.submergedVolume=0;for(let n of this.samples){this._r.copy(n.position).sub(this.centerOfMass).applyQuaternion(r),this._p.copy(n.position).applyQuaternion(r).add(i);let a=e.sample(this._p.x,this._p.z,t,this._p.y,this._sample);if(!a.wet)continue;let o=n.halfSize,s=Math.abs(this._x.y)*o.x+Math.abs(this._y.y)*o.y+Math.abs(this._z.y)*o.z,c=Mi((a.height-this._p.y+s)/(2*s),0,1);if(!c)continue;let l=n.volume*c;this.submergedVolume+=l,this._force.set(0,Ti*wi*l,0),this._pointVelocity.crossVectors(this.angularVelocity,this._r).add(this.velocity),this._relative.set(this._pointVelocity.x-a.velocityX,this._pointVelocity.y-a.velocityY,this._pointVelocity.z-a.velocityZ);let u=n.volume**(2/3)*c,d=.5*Ti*this.drag*u*(.15+this._relative.length());this._force.addScaledVector(this._relative,-d),this._total.add(this._force),this._torque.add(this._pointVelocity.crossVectors(this._r,this._force))}this.buoyancyForce=Ti*wi*this.submergedVolume;let a=this.mass+Ti*this.submergedVolume*.25;this.velocity.addScaledVector(this._total,n/a);let o=this._p.copy(this.centerOfMass).applyQuaternion(r).add(i);o.addScaledVector(this.velocity,n),this._inverse.copy(r).invert(),this._torque.applyQuaternion(this._inverse),this._relative.copy(this.angularVelocity).applyQuaternion(this._inverse),this._pointVelocity.copy(this._relative).multiply(this.inertia),this._force.crossVectors(this._relative,this._pointVelocity),this._torque.sub(this._force);let s=1+.3*this.submergedVolume/this.volume;this._torque.x/=this.inertia.x*s,this._torque.y/=this.inertia.y*s,this._torque.z/=this.inertia.z*s,this._torque.applyQuaternion(r),this.angularVelocity.addScaledVector(this._torque,n).multiplyScalar(Math.exp(-n*.08));let c=this.angularVelocity.length();c>0&&(this._rotation.setFromAxisAngle(this._torque.copy(this.angularVelocity).multiplyScalar(1/c),c*n),r.premultiply(this._rotation).normalize()),i.copy(o).sub(this._r.copy(this.centerOfMass).applyQuaternion(r)),this._x.set(1,0,0).applyQuaternion(r),this._y.set(0,1,0).applyQuaternion(r),this._z.set(0,0,1).applyQuaternion(r);let l=this.dimensions,u=e=>(Math.abs(this._x[e])*l.x+Math.abs(this._y[e])*l.y+Math.abs(this._z[e])*l.z)/2,d=this._p.copy(this.displacementCenter).applyQuaternion(r).add(i);d.y-u(`y`)<K.bottom&&(i.y+=K.bottom+u(`y`)-d.y,this.velocity.y=Math.max(0,this.velocity.y),this.angularVelocity.multiplyScalar(.98));for(let e of[`x`,`z`]){let t=Math.max(0,K.halfSize-u(e)),n=Mi(d[e],-t,t);n!==d[e]&&(i[e]+=n-d[e],this.velocity[e]*=-.15)}}},Li=class{constructor(e){this.field=e,this.bodies=new Set,this.time=0,this._accumulator=0}add(e,t){let n=new Ii(e,t);return this.bodies.add(n),n}remove(e){return this.bodies.delete(e)}update(e){if(!Number.isFinite(e)||e<0||e>.25)throw RangeError(`Simulation timestep must be between 0 and .25 seconds`);for(this._accumulator+=e;this._accumulator+1e-10>=ji;){this.time+=ji;for(let e of this.bodies)e.step(this.field,this.time,ji);this._accumulator=Math.max(0,this._accumulator-ji)}}},Ri=class extends si{constructor(){super({size:1024,splits:[500],lightMargin:30,normalBias:[.018],bias:3e-5,pcssCascades:0}),this.setSun(38,50)}setSun(e,t=this.azimuth){if(!Number.isFinite(e)||e<5||e>85||!Number.isFinite(t))throw RangeError(`Sun elevation must be 5–85 degrees`);this.elevation=e,this.azimuth=t;let n=e*Math.PI/180,r=t*Math.PI/180;Mn.sunDir.value.set(Math.sin(r)*Math.cos(n),Math.sin(n),Math.cos(r)*Math.cos(n));let i=Math.max(0,(35-e)/30);Mn.sunColor.value.setRGB(2.75,2.6-i*.65,2.38-i*1.05),Mn.skyIrradiance.value.setRGB(.31,.37,.43),Mn.horizonColor.value.setRGB(.62,.65,.66),Mn.envIntensity.value=.9}_fit(e,t,n){let r=this.cascades[e],i=r.camera,a=new l(0,2,0),o=a.clone().addScaledVector(n,60);i.matrixWorld.lookAt(o,a,new l(0,1,0)).setPosition(o),i.matrixWorldInverse.copy(i.matrixWorld).invert(),i.near=.1,i.far=120,li(i.projectionMatrix,-36,36,36,-36,i.near,i.far),r.viewProj.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),dn.fields.matrices.value[e]=r.viewProj.clone(),dn.fields.cascades.value[e]=new L(500,72/this.size,.018,i.far-i.near),dn.fields.blend.value[e]=new L(0,500,0,0)}};function zi(){let e=new ki,n=new Li(e),r=new Ge,i=new Jn,a=new Ri,o=new Jr(1,1,{colors:[`rgba16float`],depth:`depth32float`,label:`Water objects`}),s=new Jr(1,1,{colors:[`rgba16float`],depth:`depth32float`,label:`Water object reflection`}),c=jn(`waterReflection`),l=new v().makeScale(1,-1,1),u={isCamera:!0,reversedDepth:!0,near:.1,far:1e3,matrixWorld:new v,matrixWorldInverse:new v,projectionMatrix:new v,updateMatrixWorld(){this.matrixWorldInverse.copy(this.matrixWorld).invert()}},d=new N(`WaterReflection`,{matrix:[`mat4x4f`,new v]}),f=new P({name:`waterReflection`,uniforms:d,uniformName:`waterReflection`,code:``}),p=new N(`WaterMapWaves`,{time:[`f32`,0],strength:[`f32`,1]}),m=new P({name:`waterMapWaves`,uniforms:p,uniformName:`waves`,code:Ai}),h=new gi(null,{depth:K.depth,derivativeOnly:!0,fusedMips:!0});h.local.windSpeed=3.5,h.swell.scale=0,h.updateSpectrumUniforms();let g=new z(K.beige),_=new nr({label:`50 metre water map`,modules:[h.module,bi,m,mn,f],bindings:{objectColor:{texture:o.texture},objectDepth:{texture:o.depthTexture},reflectionColor:{texture:s.texture}},colorFormats:[t.format],code:`
const HALF_SIZE: f32 = ${K.halfSize}.0;
const BOTTOM: f32 = ${K.bottom}.0;
const BEIGE = vec3f(${g.r}, ${g.g}, ${g.b});

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
  // A half-resolution planar mesh reflection, distorted by the same FFT and
  // large-wave normals used for the visible water. Empty pixels reflect beige.
  let projected = waterReflection.matrix * vec4f(p, 1.0);
  let uv = projected.xy / max(projected.w, 0.001) * vec2f(.5, -.5) + .5;
  let offset = normal.xz * .017;
  let sample = textureSampleLevel(reflectionColor, smpLinearClamp, clamp(uv + offset, vec2f(.001), vec2f(.999)), 0.0);
  let valid = all(uv > vec2f(0.0)) && all(uv < vec2f(1.0)) && projected.w > 0.0;
  return mix(BEIGE * .8, sample.rgb, select(0.0, sample.a, valid));
}

fn waterNormal(p: vec2f) -> vec3f {
  var slopes = waveSample(p).yz;
  for (var c = 2; c < 4; c++) {
    slopes += textureSampleLevel(oceanDerivatives, smpLinearRepeat, p / ocean.sizes[c].x, c, 0.0).xy;
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
fn shadeRay(uv: vec2f) -> WaterRay {
  let origin = frame.cameraPos;
  let ray = viewRay(uv);
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
  let highlight = pow(max(dot(reflected, sun), 0.0), 700.0) * 2.5;
  let shadow = sunShadowPCF(p, normal, uv * frame.resolution);
  return WaterRay(mix(transmitted * mix(.65, 1.0, shadow), reflectedScene(p, normal), fresnel)
    + frame.sunColor * highlight * shadow, t);
}

fn sceneColor(uv: vec2f) -> vec3f {
  let water = shadeRay(uv);
  let pixel = vec2i(clamp(uv, vec2f(0.0), vec2f(0.99999)) * vec2f(textureDimensions(objectDepth)));
  let depth = textureLoad(objectDepth, pixel, 0);
  if (depth <= 0.0) { return water.color; }
  let object = textureLoad(objectColor, pixel, 0).rgb;
  let position = worldFromDepth(uv, depth);
  let distance = length(position - frame.cameraPos);
  let camUnder = frame.cameraPos.y < waveSample(frame.cameraPos.xz).x && inSquare(frame.cameraPos.xz);
  if (camUnder) { return throughWaterTo(distance, object); }
  if (distance <= water.distance) { return object; }
  // Submerged portions share the water's absorption and reflection, with the
  // moving surface depth controlling the waterline on arbitrary scene meshes.
  if (inSquare(position.xz) && position.y >= BOTTOM) {
    let surface = frame.cameraPos + viewRay(uv) * water.distance;
    let normal = waterNormal(surface.xz);
    let fresnel = fresnelDielectric(dot(-viewRay(uv), normal), 1.333);
    return mix(throughWaterTo(distance - water.distance, object), reflectedScene(surface, normal), fresnel);
  }
  return water.color;
}

fn fragment(in: FSIn) -> vec4f {
  // Four spatial samples keep the exact square boundary smooth without a
  // full-scene post-processing pipeline or any external textures.
  var color = vec3f(0.0);
  for (var i = 0; i < 4; i++) {
    let offset = (vec2f(f32(i % 2), f32(i / 2)) - 0.5) * 0.5;
    color += sceneColor(in.uv + offset * frame.invResolution);
  }
  return vec4f(linearToSrgb(color * 0.25), 1.0);
}
`});return{fft:h,pass:_,waves:e,physics:n,scene:r,waveModule:m,waveParams:p,lighting:a,meshRenderer:i,reflection:s,addObject(e,t){let i=n.add(e,t);return r.add(e),i},removeObject(e){return n.remove(e)?(r.remove(e.object),!0):!1},render(f,m,g,v,y){n.update(y),p.set(`time`,n.time),p.set(`strength`,e.strength),Mn.dt.value=y,Mn.time.value=n.time,t.beginFrame(),Fn(f,m,g),h.update(y),a.render(r,i,a.update(f,Mn.sunDir.value)),s.setSize(Math.max(1,Math.ceil(m/2)),Math.max(1,Math.ceil(g/2))),u.matrixWorld.multiplyMatrices(l,f.matrixWorld),u.projectionMatrix.copy(f.projectionMatrix),u.near=f.near,u.far=f.far,Fn(u,s.width,s.height,{block:c}),d.set(`matrix`,c.fields.viewProj.value),i.render(r,{camera:u,frameBlock:c,kind:`color`,cullOverride:`front`,defines:{WATER_MAP_REFLECTION:1},colorViews:[s.texture.view()],colorFormats:[`rgba16float`],depthView:s.depthTexture.view(),depthFormat:`depth32float`,clearColors:[[0,0,0,0]],clearDepth:0}),Fn(f,m,g),o.setSize(m,g),i.render(r,{camera:f,kind:`color`,colorViews:[o.texture.view()],colorFormats:[`rgba16float`],depthView:o.depthTexture.view(),depthFormat:`depth32float`,clearColors:[[0,0,0,0]],clearDepth:0}),_.render({colorViews:[v],clear:[0,0,0,1]}),t.submit()}}}var Bi={0:`front`,1:`back`,2:`double`,front:`front`,back:`back`,double:`double`};function Vi(e){let t={...e};return t.side!==void 0&&(t.side=Bi[t.side]||`front`),t}var Hi=class extends Tn{constructor(e={},t=null){let n=Vi(e),r={...n.uniforms||{}};r.envMapIntensity=[`f32`,n.envMapIntensity??1],r.emissiveIntensity=[`f32`,n.emissiveIntensity??1],t&&Object.assign(r,t),super({...n,uniforms:r}),this.isSceneMaterial=!0,this.isMeshStandardMaterial=!0}get side(){return this._side}set side(e){let t=Bi[e]||`front`;t!==this._side&&this._side!==void 0&&this.version++,this._side=t}get emissiveIntensity(){return this.uniforms.emissiveIntensity.value}set emissiveIntensity(e){this.uniforms.emissiveIntensity.value=e}get envMapIntensity(){return this.uniforms.envMapIntensity.value}set envMapIntensity(e){this.uniforms.envMapIntensity.value=e}get surface(){return this._prelude()+(this._surface||``)}set surface(e){this._surface=e}_prelude(){return`	s.emissive = s.emissive * mat.emissiveIntensity;
	s.envIntensity = mat.envMapIntensity;
`}},Ui=class extends Hi{constructor(e={}){let t=e.clearcoat??0,n=e.sheen??0;super(e,{clearcoat:[`f32`,t],clearcoatRoughness:[`f32`,e.clearcoatRoughness??0],specularIntensity:[`f32`,e.specularIntensity??1],sheen:[`f32`,n],sheenColor:[`vec3f`,null],sheenRoughness:[`f32`,e.sheenRoughness??1],ior:[`f32`,e.ior??1.5]}),this.isMeshPhysicalMaterial=!0,e.sheenColor===void 0?this.uniforms.sheenColor.value=Wi(0):this.uniforms.sheenColor.value=Wi(e.sheenColor),t>0&&(this.defines.CLEARCOAT=1),n>0&&(this.defines.SHEEN=1)}get clearcoat(){return this.uniforms.clearcoat.value}set clearcoat(e){e>0!=!!this.defines.CLEARCOAT&&this.setDefine(`CLEARCOAT`,+(e>0)),this.uniforms.clearcoat.value=e}get clearcoatRoughness(){return this.uniforms.clearcoatRoughness.value}set clearcoatRoughness(e){this.uniforms.clearcoatRoughness.value=e}get specularIntensity(){return this.uniforms.specularIntensity.value}set specularIntensity(e){this.uniforms.specularIntensity.value=e}get sheen(){return this.uniforms.sheen.value}set sheen(e){e>0!=!!this.defines.SHEEN&&this.setDefine(`SHEEN`,+(e>0)),this.uniforms.sheen.value=e}get sheenColor(){return this.uniforms.sheenColor.value}get sheenRoughness(){return this.uniforms.sheenRoughness.value}set sheenRoughness(e){this.uniforms.sheenRoughness.value=e}get ior(){return this.uniforms.ior.value}set ior(e){this.uniforms.ior.value=e}_prelude(){return super._prelude()+`	s.clearcoat = mat.clearcoat;
	s.clearcoatRoughness = mat.clearcoatRoughness;
	s.specularIntensity = mat.specularIntensity;
	s.sheenColor = mat.sheenColor * mat.sheen;
	s.sheenRoughness = mat.sheenRoughness;
	s.ior = mat.ior;
`}};function Wi(e){return e&&e.isColor?e.clone():new z().set(e)}var Q=Object.freeze({name:`Azimut Grande Trideck · 38 Metri`,length:38.22,beam:7.98,draft:2.02,mass:192e3,hullDraft:1.55,source:`https://azimutyachts.com/en/grande-series/grande-trideck/`,dimensionsVerified:!0,exterior:`Reference-inspired exterior; not manufacturer CAD`}),Gi=[[-19.11,3.12],[-17.7,3.6],[-13,3.82],[-6,3.94],[0,3.95],[6,3.82],[11,3.2],[15,2.12],[17.8,.87],[19.11,0]];function Ki(e){for(let t=1;t<Gi.length;t++){let[n,r]=Gi[t-1],[i,a]=Gi[t];if(e<=i){let t=Math.max(0,(e-n)/(i-n));return(r+(a-r)*t)*Q.beam/7.9}}return 0}function qi(e){let t=Math.max(0,(e-10)/(Q.length/2-10));return-Q.hullDraft+t**2.2*2.5}function $(e){let t=Math.max(0,Math.min(1,(e+2)/12));return 2.3+1.85*t*t*(3-2*t)+.18*Math.max(0,e/(Q.length/2))**2}var Ji=Object.freeze([[0,0],[.28,.06],[.64,.16],[.88,.31],[.95,.46],[.985,.68],[1,1]].map(Object.freeze));function Yi(e,t){let n=qi(e),r=(t-n)/($(e)-n);if(r<=0)return 0;if(r>=1)return Ki(e);for(let t=1;t<Ji.length;t++){let[n,i]=Ji[t-1],[a,o]=Ji[t];if(r<=o)return Ki(e)*(n+(a-n)*(r-i)/(o-i))}return 0}function Xi(){let e=[],t=Q.length/20,n=.4;for(let r=0;r<20;r++){let i=-Q.length/2+(r+.5)*t;for(let r=-Q.hullDraft+n/2;r<1;r+=n){let a=Yi(i,r),o=2*a/3;if(!(o<.03))for(let s=0;s<3;s++)e.push({position:[-a+(s+.5)*o,r,i],volume:o*n*t,halfSize:[o/2,n/2,t/2]})}}let r=0,i=0;for(let t of e){let e=Math.max(0,Math.min(1,(.5*n-t.position[1])/n));r+=t.volume*e,i+=t.volume*e*t.position[2]}let a=Q.mass/(r*1025);for(let t of e)t.volume*=a;return{samples:e,mass:Q.mass,centerOfMass:[0,-.05,i/r],displacementCenter:[0,0,0],dimensions:[Q.beam,5.7,Q.length],drag:1.65}}var Zi=class{constructor(){this.p=[],this.n=[],this.uv=[],this.color=[],this.surface=[]}add(e,t,n=[.25,0,0,1]){let r=e.index?e.toNonIndexed():e,i=r.attributes.position,a=r.attributes.normal,o=r.attributes.uv,s=new z(t);for(let e=0;e<i.count;e++)this.p.push(i.getX(e),i.getY(e),i.getZ(e)),this.n.push(a.getX(e),a.getY(e),a.getZ(e)),this.uv.push(o?o.getX(e):i.getX(e),o?o.getY(e):i.getZ(e)),this.color.push(s.r,s.g,s.b),this.surface.push(...n)}geometry(){let e=new Mr;for(let[t,n,r]of[[`position`,this.p,3],[`normal`,this.n,3],[`uv`,this.uv,2],[`color`,this.color,3],[`aSurface`,this.surface,4]])e.setAttribute(t,new yr(n,r));return e.computeBoundingBox(),e.computeBoundingSphere(),e}};function Qi(e,t,n=!1){let r=new Mr;if(r.setAttribute(`position`,new yr(e.flat(),3)),r.setIndex(t),r.computeVertexNormals(),n)return r;let i=r.toNonIndexed();return i.computeVertexNormals(),i}function $i(){let e=[],t=[],n=[...Ji.slice().reverse(),...Ji.slice(1).map(([e,t])=>[-e,t])];for(let t=0;t<=56;t++){let r=-Q.length/2+Q.length*t/56,i=qi(r),a=$(r);for(let[t,o]of n)e.push([t*Ki(r),i+(a-i)*o,r])}let r=n.length;for(let e=0;e<56;e++)for(let n=0;n<r;n++){let i=e*r+n,a=e*r+(n+1)%r,o=i+r,s=a+r;t.push(i,o,a,a,o,s)}for(let e=1;e<r-1;e++)t.push(0,e,e+1);return Qi(e,t,!0)}function ea(e,t,n){let r=e.map(([e,n])=>[e,t,n]).concat(e.map(([e,t])=>[e,n,t])),i=[],a=e.length;for(let e=1;e<a-1;e++)i.push(a,a+e+1,a+e,0,e,e+1);for(let e=0;e<a;e++){let t=(e+1)%a;i.push(e,a+e,t,t,a+e,a+t)}for(let e=0;e<i.length;e+=3)[i[e+1],i[e+2]]=[i[e+2],i[e+1]];return Qi(r,i)}function ta(e,t,n,r,i,a,o=.7){let s=[[-i,n,e],[i,n,e],[a,n,t],[-a,n,t],[-i*.96,r,e+.18],[i*.96,r,e+.18],[a*.9,r,t-o],[-a*.9,r,t-o]],c=[0,3,2,0,2,1,4,5,6,4,6,7,0,1,5,0,5,4,3,7,6,3,6,2,1,2,6,1,6,5,0,4,7,0,7,3];for(let e=0;e<c.length;e+=3)[c[e+1],c[e+2]]=[c[e+2],c[e+1]];return Qi(s,c)}function na({detail:e=`high`}={}){if(![`high`,`low`].includes(e))throw RangeError(`Yacht detail must be high or low`);let t=new Zi,n=new Zi,r=e===`high`,i=15921385,a=15197920,s=10189136,c=14274235,u=[.23,0,0,1],d=[.62,0,1,.9],f=[.18,.92,0,1],p=(e,n,r=i,a=u,o=.04)=>{let s=o?new Gr(...e,1,o):new Br(...e);t.add(s.translate(...n),r,a)},m=(e,n,i=.023,a=12371656,s=f)=>{let c=new l(...e),u=new l(...n),d=u.clone().sub(c),p=new Hr(i,i,d.length(),r?8:5,1);p.applyQuaternion(new o().setFromUnitVectors(new l(0,1,0),d.normalize())),p.translate(...c.add(u).multiplyScalar(.5).toArray()),t.add(p,a,s)},h=(e,t=1.02)=>{for(let n=0;n<e.length;n++){let[r,i,a]=e[n];if(m([r,i,a],[r,i+t,a],.025),n)for(let o of[t,t*.45]){let s=e[n-1];m([s[0],s[1]+o,s[2]],[r,i+o,a],o===t?.027:.013)}}},g=(e,t,n,r)=>[[-n+.35,e],[-n,e+.5],[-r,t-.7],[-r+.4,t],[r-.4,t],[r,t-.7],[n,e+.5],[n-.35,e]];t.add($i(),i,[.23,0,3,1]),t.add(ea(g(-19.11,-16.4,3.12,3.54),.2,.42),i,u),t.add(ea(g(-18.98,-16.52,3.02,3.4),.425,.445),s,d);for(let e of[-1,1])for(let t=0;t<7;t++)p([.77,.12,.37],[e*3,.48+t*.265,-16.35+t*.33],a,u,.025),p([.7,.025,.32],[e*3,.55+t*.265,-16.35+t*.33],s,d,0);let _=[];for(let e=0;e<=24;e++){let t=-15.8+e*34.5/24;_.push([-Math.max(0,Ki(t)-.12),t])}let v=_.concat(_.slice().reverse().map(([e,t])=>[-e,t]));t.add(ea(v,2.31,2.35),s,d);let y=[],b=[];for(let e=0;e<=24;e++){let t=7.7+e*11/24,n=Ki(t)-.12,r=$(t)+.016;if(y.push([-n,r,t],[n,r,t]),e){let t=(e-1)*2,n=e*2;b.push(t,n,t+1,t+1,n,n+1)}}t.add(Qi(y,b,!0),s,d),n.add(ta(-10.7,7.8,2.39,4.88,3.18,2.9,1.15),1518387,[.12,.12,0,.8]),t.add(ea(g(-14.6,8.25,3.64,3.08),4.9,5.24),i,u),t.add(ea(g(-14.35,7.97,3.46,2.9),5.245,5.275),s,d),n.add(ta(-7.5,5.75,5.29,7.52,2.84,2.58,.96),1321524,[.105,.14,0,.82]),t.add(ea(g(-10.9,6.2,3.18,2.8),7.53,7.83),i,u),t.add(ea(g(-10.63,5.87,3,2.62),7.835,7.87),s,d);for(let e of[-1,1]){for(let n of[-10.1,-5.3,-.4,6.3]){let r=e*(n>4?2.9:3.19);t.add(ta(n-.16,n+.15,2.4,4.9,.13,.13,-.15).translate(r,0,0),n===-5.3||n===-.4?1846065:i,u)}for(let t of[-6.8,0,4.55])p([.13,2.2,.17],[e*2.77,6.41,t],i);let a=new Br(.24,2.48,.43).rotateX(-.34).translate(e*2.77,6.39,-8.17);t.add(a,i,u),h(Array.from({length:r?22:12},(t,n)=>{let i=-15.5+n*33.6/((r?22:12)-1);return[e*Math.max(0,Ki(i)-.13),Math.max(2.36,$(i)),i]}),.92),h(Array.from({length:7},(t,n)=>[e*3.42,5.29,-14+n*1.05])),h(Array.from({length:8},(t,n)=>[e*2.94,7.9,-10.1+n*1.75]));let o=(t,i,a,o,s=!1)=>{let c=[],l=[],u=r?24:12;for(let n=0;n<=u;n++){let r=t+(i-t)*n/u,d=Math.min(1,(r-t)/.3,(i-r)/.4),f=s?$(r)-.14:a+o*(.72+.28*Math.max(0,d)),p=s?f-.32-1.3*Math.sin(Math.PI*(r-t)/(i-t))**2:a;if(c.push([e*(Yi(r,p)+.018),p,r],[e*(Yi(r,f)+.018),f,r]),n){let e=(n-1)*2,t=n*2;l.push(e,e+1,t,e+1,t+1,t)}}if(e<0)for(let e=0;e<l.length;e+=3)[l[e+1],l[e+2]]=[l[e+2],l[e+1]];n.add(Qi(c,l,!0),1188651,[.12,.08,0,.8])};o(-12.8,-7.7,.59,.73),o(-5.4,-4.2,.65,.66);for(let e of[-2.5,-.7,1.1,2.9,4.7])o(e,e+.68,.84,.39);o(1.3,17.4,1.44,.75,!0);for(let t of[-11,-9,6,8.5,11])p([.035,.68,.055],[e*(Yi(t,.85)+.025),1.19,t],5989990,f,0);for(let t of[-15,-6,8,16])m([e*(Ki(t)-.25),$(t)+.04,t-.16],[e*(Ki(t)-.25),$(t)+.04,t+.16],.05)}h([[-3.28,5.29,-14.15],[0,5.29,-14.15],[3.28,5.29,-14.15]]),h([[-2.8,7.9,-10.37],[0,7.9,-10.37],[2.8,7.9,-10.37]]),t.add(ea(g(-7,2,2.56,2.44),9.53,9.76),3160123,[.23,.18,0,1]);for(let e of[-2.36,2.36])for(let t of[-6.35,.9])m([e,7.87,t],[e*.94,9.54,t+.25],.075,i,u);p([2.5,.68,1.14],[0,8.19,3.55],i,u,.12),n.add(new Br(2.05,.36,.035).rotateX(-.35).translate(0,8.5,4.08),1320492);let x=(e,t,n,r,i=.95)=>{p([r,.34,i],[e,t+.2,n],a,u,.07),p([r-.12,.16,i-.12],[e,t+.45,n],c,[.78,0,0,.9],.07),p([r,.48,.18],[e,t+.64,n-i/2+.08],c,[.8,0,0,.9],.07)};x(0,2.36,-13.05,4.6,1.12),x(0,5.29,-11.85,4.5),x(0,7.9,-8.95,4.3),x(-1.62,7.9,-4.5,1.12,2.9),x(1.62,7.9,-4.5,1.12,2.9);for(let[e,t]of[[2.36,-11.5],[5.29,-10.05],[7.9,-6.7]])p([1.7,.09,1.03],[0,e+.68,t],s,d,.08),m([0,e,t],[0,e+.64,t],.09);p([4.03,.23,2.65],[0,$(10.1)+.16,10.1],c,[.8,0,0,.92],.1),x(0,$(13.1)+.025,13.1,3.4,1.4),n.add(new Br(1.14,.025,1.9).translate(0,$(16)+.03,16),1520699);let S=(e,n,a,o)=>{t.add(new Hr(o*.7,o*.82,.45,r?14:8).translate(e,n,a),i,u),t.add(new Vr(o,r?16:10,r?12:7).scale(1,1.2,1).translate(e,n+.34,a),i,u)};S(-1.58,10.02,-4.78,.47),S(1.58,10.02,-4.78,.47),m([0,9.76,-5.03],[0,11.64,-5.38],.075,3160123,u);let C=new Br(.38,2.6,.58).rotateX(-.18).translate(0,10.36,-5.22);t.add(C,3160123,[.24,.15,0,1]),p([2.2,.17,.25],[0,10.73,-5.25],3160123),m([-.8,9.74,-6.17],[-.8,11.2,-6.17],.013),m([.8,9.74,-6.17],[.8,11.4,-6.17],.013),m([0,11.6,-5.38],[0,12.12,-5.38],.012);for(let e of[-1,1]){p([.11,.085,.16],[e*2.88,5.42,6.42],e<0?8793888:2583891,[.4,.1,2,1],.02),m([e*.25,$(18.3),18.3],[e*.25,$(18.3)+.15,18.3],.035);let n=-Q.draft+.56,r=e*1.52,i=-13.9;m([r,-.55,-8.2],[r,n,i],.075,7896181,f),m([r,n,-13.55],[r,n,-14.280000000000001],.14,10914897,f);for(let e=0;e<5;e++){let a=e*Math.PI*2/5,o=new Br(.16,.51,.045).rotateZ(-a).translate(r+Math.sin(a)*.3,n+Math.cos(a)*.3,i);t.add(o,10914897,f)}p([.12,.015,.03],[r,-Q.draft+.0075,i],10914897,f,0),p([.09,.72,.7],[r,-1.56,-15.42],2700598,[.4,.1,0,1],.02)}let w=new Ui({name:`Azimut exterior batched gelcoat teak steel`,vertexColors:!0,clearcoat:.65,clearcoatRoughness:.15,attributes:{aSurface:`vec4f`},varyings:{vSurface:`vec4f`,vLocal:`vec3f`},vertex:`o.vSurface = v.aSurface; o.vLocal = v.position;`,surface:`
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
    `}),T=new Ui({name:`Azimut sealed reflective exterior glazing`,vertexColors:!0,roughness:.1,metalness:.28,clearcoat:1,clearcoatRoughness:.055,specularIntensity:1.3,attributes:{aSurface:`vec4f`},varyings:{vSurface:`vec4f`},vertex:`o.vSurface = v.aSurface;`,surface:`s.roughness = in.vs.vSurface.x; s.ao = in.vs.vSurface.w; s.clearcoat = 1.0; s.clearcoatRoughness = .055;`}),E=new fr;E.name=Q.name;for(let[e,r,i]of[[t,w,`Merged exterior`],[n,T,`Merged glazing`]]){let t=new Pr(e.geometry(),r);t.name=i,t.castShadow=!0,E.add(t)}return E.userData={spec:Q,exteriorOnly:!0,detail:e,triangles:E.children.reduce((e,t)=>e+t.geometry.attributes.position.count/3,0),vertexBytes:E.children.reduce((e,t)=>e+Object.values(t.geometry.attributes).reduce((e,t)=>e+t.array.byteLength,0),0),colorDraws:2,textureBytes:0},{object:E,spec:Q,stats:E.userData,buoyancy:Xi(),dispose(){for(let e of E.children)e.geometry.dispose(),e.material.dispose()}}}var ra=document.querySelector(`#status`);document.querySelector(`#map-link`).hidden=!0;try{let e=new er(document.querySelector(`#app`));await e.init(),e.renderOptimizations.framePacing=!0;let n=zi(),r=na({detail:matchMedia(`(max-width: 650px)`).matches?`low`:`high`}),i=n.addObject(r.object,r.buoyancy),a=e.camera;a.far=1e3,a.fov=48,a.updateProjectionMatrix();let o=!1,s=`yacht`,c=Math.PI/4,u=.7,d=90,f=new l(0,-2,0);function p(){a.position.set(f.x+Math.sin(c)*Math.cos(u)*d,f.y+Math.sin(u)*d,f.z+Math.cos(c)*Math.cos(u)*d),a.lookAt(f)}function m(e){s=e,c=e===`yacht`?1.18:Math.PI/4,e===`underwater`?(f.set(0,-5,0),u=.04,d=15):e===`yacht`?(f.set(0,3.3,0),u=.23,d=49/Math.min(1,Math.max(.4,a.aspect))):(f.set(0,-2,0),u=e===`surface`?.2:.7,d=e===`surface`?65:90);for(let t of document.querySelectorAll(`[data-view]`))t.setAttribute(`aria-pressed`,String(t.dataset.view===e));p()}for(let e of document.querySelectorAll(`[data-view]`))e.addEventListener(`click`,()=>m(e.dataset.view));let h=document.querySelector(`#pause`);h.addEventListener(`click`,()=>{o=!o,h.textContent=o?`Resume water`:`Pause water`,h.setAttribute(`aria-pressed`,String(o))});let g=document.querySelector(`#wave-size`);g.addEventListener(`input`,()=>{n.waves.strength=Number(g.value)});let _=document.querySelector(`#sun-angle`);_.addEventListener(`input`,()=>n.lighting.setSun(Number(_.value))),document.querySelector(`#toggle-yacht`).addEventListener(`click`,e=>{i?(n.removeObject(i),i=null):i=n.addObject(r.object,r.buoyancy),e.currentTarget.textContent=i?`Hide yacht`:`Show yacht`,e.currentTarget.setAttribute(`aria-pressed`,String(!!i))}),document.querySelector(`#reset-yacht`).addEventListener(`click`,()=>{r.object.position.set(0,0,0),r.object.quaternion.identity(),i&&(i.velocity.set(0,0,0),i.angularVelocity.set(0,0,0)),m(`yacht`)});let v=new Set;function y(){let e=new Tn({name:`Water test float`,color:12363904,lit:!1,surface:`s.albedo *= 0.35 + 0.65 * max(dot(in.N, normalize(vec3f(-0.45, 0.8, 0.3))), 0.0);`}),t=new Pr(new Br(3,1.2,2),e),r=v.size;t.position.set((r%2?-1:1)*(10+Math.floor(r/2)%3*4),2,Math.floor(r/6)*3-2);let i=n.addObject(t,{density:500});return v.add(i),document.querySelector(`#clear-floats`).hidden=!1,i}document.querySelector(`#add-float`).addEventListener(`click`,y),document.querySelector(`#clear-floats`).addEventListener(`click`,e=>{for(let e of v)n.removeObject(e),e.object.geometry.dispose(),e.object.material.dispose();v.clear(),e.currentTarget.hidden=!0});let b=null;e.canvas.addEventListener(`pointerdown`,t=>{t.button===0&&(b={id:t.pointerId,x:t.clientX,y:t.clientY},e.canvas.setPointerCapture(t.pointerId))}),e.canvas.addEventListener(`pointermove`,e=>{b&&b.id===e.pointerId&&(c-=(e.clientX-b.x)*.006,u=Math.max(s===`underwater`?-.25:.06,Math.min(s===`underwater`?.25:1.5,u+(e.clientY-b.y)*.006)),b.x=e.clientX,b.y=e.clientY,p())});let x=()=>{b=null};if(e.canvas.addEventListener(`pointerup`,x),e.canvas.addEventListener(`pointercancel`,x),e.canvas.addEventListener(`lostpointercapture`,x),e.canvas.addEventListener(`wheel`,e=>{e.preventDefault(),d=Math.max(s===`underwater`?2:40,Math.min(s===`underwater`?20:180,d*Math.exp(e.deltaY*.001))),p()},{passive:!1}),m(`yacht`),await t.pipelinesReady(),n.pass.handle.failed)throw Error(`The water shader could not compile.`);n.render(a,e.width,e.height,e.currentTexture().createView(),0),await t.queue.onSubmittedWorkDone(),e.start(t=>n.render(a,e.width,e.height,e.currentTexture().createView(),o?0:Math.max(0,t))),window.__waterMap={engine:e,renderer:n,spec:K,yacht:r,setView:m,addTestFloat:y,get yachtBody(){return i},addObject:(e,t)=>n.addObject(e,t),removeObject:e=>n.removeObject(e),get paused(){return o}},window.addEventListener(`pagehide`,()=>e.stop(),{once:!0}),ra.hidden=!0}catch(e){ra.hidden=!1,ra.textContent=`Water could not start: `+e.message,console.error(e)}