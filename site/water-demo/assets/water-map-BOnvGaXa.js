const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./WaterWebGLBackend-BmfJJK-Q.js","./WaterDisplayColor-Cd3iiWcj.js"])))=>i.map(i=>d[i]);
import{t as e}from"./preload-helper-uBIymjUX.js";import{$ as t,A as n,B as r,C as i,D as a,E as o,F as s,G as c,I as l,J as u,K as d,L as f,M as p,N as m,O as h,P as g,Q as _,R as v,S as y,T as b,U as x,V as S,W as C,X as w,Y as T,_ as E,a as ee,b as D,d as O,et as k,f as A,g as j,h as M,j as te,k as ne,m as re,n as ie,p as ae,q as N,r as oe,s as se,t as ce,tt as P,u as le,v as ue,w as F,x as de,y as I,z as L}from"./WaterDisplayColor-Cd3iiWcj.js";function fe(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}var pe=e=>fe(e)<0;function me(e){let t=e.length;t>2&&e[t-1].x===e[0].x&&e[t-1].y===e[0].y&&e.pop()}var he=(e,t,n)=>(t.x-e.x)*(n.y-t.y)-(t.y-e.y)*(n.x-t.x),ge=(e,t)=>e.x===t.x&&e.y===t.y;function _e(e,t,n,r){return(n.x-r.x)*(e.y-r.y)>=(e.x-r.x)*(n.y-r.y)&&(e.x-r.x)*(t.y-r.y)>=(t.x-r.x)*(e.y-r.y)&&(t.x-r.x)*(n.y-r.y)>=(n.x-r.x)*(t.y-r.y)}function ve(e,t){let n=0;for(let r=0,i=e.length-1;r<e.length;i=r++)n+=t[e[i]].x*t[e[r]].y-t[e[r]].x*t[e[i]].y;return n}function ye(e,t,n){let r=0;for(let e=1;e<t.length;e++)n[t[e]].x>n[t[r]].x&&(r=e);let i=n[t[r]],a=1/0,o=-1,s=e.length;for(let t=0;t<s;t++){let r=n[e[t]],c=n[e[(t+1)%s]];if(r.y<=i.y&&i.y<=c.y||c.y<=i.y&&i.y<=r.y){if(r.y===c.y)continue;let e=r.x+(i.y-r.y)*(c.x-r.x)/(c.y-r.y);e>=i.x&&e<a&&(a=e,o=r.x>c.x?t:(t+1)%s)}}if(o<0)return e;let c={x:a,y:i.y},l=n[e[o]];if(a!==l.x||i.y!==l.y){let t=1/0,r=l.y<i.y?[i,l,c]:[i,c,l],a=o;for(let c=0;c<s;c++){let u=(a+c)%s,d=n[e[u]];if(d.x<i.x||u===a)continue;let f=n[e[(u+s-1)%s]],p=n[e[(u+1)%s]];if(!(he(f,d,p)<0)&&(d.x!==i.x||d.y!==i.y)||!be(r,d))continue;let m=Math.abs(i.y-d.y)/(d.x-i.x||1e-12);(m<t||m===t&&d.x<l.x)&&(t=m,o=u,l=d)}}for(let t=0;t<s;t++){if(!ge(n[e[t]],l))continue;let r=n[e[(t+s-1)%s]],a=n[e[(t+1)%s]],c=he(r,l,i)>=0,u=he(l,a,i)>=0;if(he(r,l,a)>=0?c&&u:c||u){o=t;break}}let u=t.slice(r).concat(t.slice(0,r));return e.slice(0,o+1).concat(u,[t[r],e[o]],e.slice(o+1))}function be(e,t){let[n,r,i]=he(e[0],e[1],e[2])>=0?e:[e[0],e[2],e[1]];return _e(n,r,i,t)}function xe(e,t,n){let r=e.slice(),i=0;for(;r.length>3&&i++<1e5;){let e=r.length,i=!1;for(let a=0;a<2&&!i;a++)for(let o=0;o<e;o++){let s=r[(o+e-1)%e],c=r[o],l=r[(o+1)%e],u=t[s],d=t[c],f=t[l],p=he(u,d,f);if(a===0?p<=0:p<0)continue;let m=!0;if(p>0)for(let n=0;n<e;n++){let e=t[r[n]];if(!(ge(e,u)||ge(e,d)||ge(e,f))&&_e(u,d,f,e)){m=!1;break}}if(m){n.push([s,c,l]),r.splice(o,1),i=!0;break}}if(!i){let i=0,a=-1/0;for(let n=0;n<e;n++){let o=he(t[r[(n+e-1)%e]],t[r[n]],t[r[(n+1)%e]]);o>a&&(a=o,i=n)}n.push([r[(i+e-1)%e],r[i],r[(i+1)%e]]),r.splice(i,1)}}return r.length===3&&n.push([r[0],r[1],r[2]]),n}function Se(e,t=[]){me(e),t.forEach(me);let n=e.concat(...t),r=e.map((e,t)=>t),i=ve(r,n)<0;i&&r.reverse();let a=e.length,o=t.map(e=>{let t=e.map((e,t)=>a+t);return a+=e.length,ve(t,n)>0&&t.reverse(),t}).filter(e=>e.length>=3);o.sort((e,t)=>Math.max(...t.map(e=>n[e].x))-Math.max(...e.map(e=>n[e].x)));for(let e of o)r=ye(r,e,n);let s=xe(r,n,[]);if(i)for(let e of s){let t=e[0];e[0]=e[2],e[2]=t}return s}var Ce={area:fe,isClockWise:pe,triangulateShape:Se},we=()=>typeof performance<`u`?performance.now():Date.now(),Te=class{constructor(){this._startTime=we(),this._previousTime=0,this._currentTime=0,this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=()=>{e.hidden===!1&&this.reset()},e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=we()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?we():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Ee(e=globalThis.location?.search||``){let t=new URLSearchParams(e),n=t.has(`renderReference`),r=t.get(`world`)===`rocha`;return{reference:n,bindingReuse:r&&!n&&!t.has(`noRenderV2`)&&!t.has(`noBindingReuse`),framePacing:r&&!n&&!t.has(`noRenderV2`)&&!t.has(`noFramePacing`),compactTargets:!n&&!t.has(`noCompactSceneTargets`)&&(r||t.has(`compactSceneTargets`)),depthRotation:!n&&!t.has(`noDepthRotation`)&&(r||t.has(`depthRotation`)),tiledTAA:!n&&t.has(`tiledTAA`)&&!t.has(`noTiledTAA`)}}var De=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].includes(t)||n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].includes(t)}removeEventListener(e,t){let n=this._listeners&&this._listeners[e];if(n===void 0)return;let r=n.indexOf(t);r!==-1&&n.splice(r,1)}dispatchEvent(e){let t=this._listeners&&this._listeners[e.type];if(t!==void 0){e.target=this;for(let n of t.slice())n.call(this,e);e.target=null}}},Oe=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},ke=0,Ae=new T,je=new w,Me=new y,Ne=new T,Pe=new T,Fe=new T,Ie=new w,Le=new T(1,0,0),Re=new T(0,1,0),ze=new T(0,0,1),Be={type:`added`},Ve={type:`removed`},He={type:`childadded`,child:null},Ue={type:`childremoved`,child:null},We=class e extends De{constructor(){super(),Object.defineProperty(this,"id",{value:ke++}),this.uuid=n(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new T,r=new de,i=new w,a=new T(1,1,1);r._onChange(()=>i.setFromEuler(r,!1)),i._onChange(()=>r.setFromQuaternion(i,void 0,!1)),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:r},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new y},normalMatrix:{value:new D}}),this.matrix=new y,this.matrixWorld=new y,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Oe,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}onBeforeRender(){}onAfterRender(){}onBeforeShadow(){}onAfterShadow(){}dispose(){this.dispatchEvent({type:`dispose`})}applyMatrix4(e){return this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return je.setFromAxisAngle(e,t),this.quaternion.multiply(je),this}rotateOnWorldAxis(e,t){return je.setFromAxisAngle(e,t),this.quaternion.premultiply(je),this}rotateX(e){return this.rotateOnAxis(Le,e)}rotateY(e){return this.rotateOnAxis(Re,e)}rotateZ(e){return this.rotateOnAxis(ze,e)}translateOnAxis(e,t){return Ae.copy(e).applyQuaternion(this.quaternion),this.position.add(Ae.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Le,e)}translateY(e){return this.translateOnAxis(Re,e)}translateZ(e){return this.translateOnAxis(ze,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Me.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ne.copy(e):Ne.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Pe.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Me.lookAt(Pe,Ne,this.up):Me.lookAt(Ne,Pe,this.up),this.quaternion.setFromRotationMatrix(Me),r&&(Me.extractRotation(r.matrixWorld),je.setFromRotationMatrix(Me),this.quaternion.premultiply(je.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this||e&&e.isObject3D&&(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Be),He.child=e,this.dispatchEvent(He),He.child=null),this}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ve),Ue.child=e,this.dispatchEvent(Ue),Ue.child=null),this}removeFromParent(){return this.parent!==null&&this.parent.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Me.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Me.multiply(e.parent.matrixWorld)),e.applyMatrix4(Me),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Be),this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n of this.children){let r=n.getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);for(let r of this.children)r.getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pe,e,Fe),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pe,Ie,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(n===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(n.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].matrixWorldAutoUpdate===!0&&e[t].updateWorldMatrix(!1,!0)}}clone(e){return new this.constructor().copy(this,e)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,t.onBeforeRender!==e.prototype.onBeforeRender&&(this.onBeforeRender=t.onBeforeRender),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let e of t.children)this.add(e.clone());return this}};We.DEFAULT_UP=new T(0,1,0),We.DEFAULT_MATRIX_AUTO_UPDATE=!0,We.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,We.prototype.isObject3D=!0;var Ge=new T,Ke=new b,qe=new b,Je=class extends We{constructor(){super(),this.type=`Camera`,this.matrixWorldInverse=new y,this.projectionMatrix=new y,this.projectionMatrixInverse=new y,this.coordinateSystem=i,this.reversedDepth=!0}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this.reversedDepth=e.reversedDepth,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};Je.prototype.isCamera=!0;function Ye(e,t,n,r,i,a,o){e.view===null&&(e.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1});let s=e.view;s.enabled=!0,s.fullWidth=t,s.fullHeight=n,s.offsetX=r,s.offsetY=i,s.width=a,s.height=o,e.updateProjectionMatrix()}var Xe=class extends Je{constructor(e=50,t=1,n=.1,r=2e3){super(),this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.infiniteFar=!1,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.infiniteFar=e.infiniteFar,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=h*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){return .5*this.getFilmHeight()/Math.tan(o*.5*this.fov)}getEffectiveFOV(){return h*2*Math.atan(Math.tan(o*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ge.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ge.x,Ge.y).multiplyScalar(-e/Ge.z),Ge.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ge.x,Ge.y).multiplyScalar(-e/Ge.z)}getViewSize(e,t){return this.getViewBounds(e,Ke,qe),t.subVectors(qe,Ke)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,Ye(this,e,t,n,r,i,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(o*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(a!==null&&a.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let s=this.filmOffset;s!==0&&(i+=e*s/this.getFilmWidth());let c=this.infiniteFar?1/0:this.far;this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,c,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}};Xe.prototype.isPerspectiveCamera=!0;var Ze=class extends Je{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){Ye(this,e,t,n,r,i,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t,c=this.view;if(c!==null&&c.enabled){let e=(this.right-this.left)/c.fullWidth/this.zoom,t=(this.top-this.bottom)/c.fullHeight/this.zoom;i+=e*c.offsetX,a=i+e*c.width,o-=t*c.offsetY,s=o-t*c.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}};Ze.prototype.isOrthographicCamera=!0;var Qe=class extends We{constructor(){super(),this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new de,this.environmentIntensity=1,this.environmentRotation=new de,this.overrideMaterial=null}copy(e,t){return super.copy(e,t),this.background=e.background,this.environment=e.environment,this.fog=e.fog,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),this.environmentIntensity=e.environmentIntensity,this.overrideMaterial=e.overrideMaterial,this.matrixAutoUpdate=e.matrixAutoUpdate,this}};Qe.prototype.isScene=!0;var $e=class{constructor(e){this.pass=e,this.vertices=[],this.indexBuffer=null,this.indexFormat=null,this.drawGroup=null,this.drawOffset=-1,this.offsets=new Uint32Array(1)}bindObject(e,t){(e!==this.drawGroup||t!==this.drawOffset)&&(this.offsets[0]=t,this.pass.setBindGroup(2,e,this.offsets,0,1),this.drawGroup=e,this.drawOffset=t)}bindVertex(e,t){this.vertices[e]!==t&&(this.pass.setVertexBuffer(e,t),this.vertices[e]=t)}bindIndex(e,t){(this.indexBuffer!==e||this.indexFormat!==t)&&(this.pass.setIndexBuffer(e,t),this.indexBuffer=e,this.indexFormat=t)}},R={position:`vec3f`,normal:`vec3f`,uv:`vec2f`,color:`vec4f`},z={normal:`vec3f( 0.0, 1.0, 0.0 )`,uv:`vec2f( 0.0 )`,color:`vec4f( 1.0 )`},et=/^(u32|i32|vec[234][ui])$/;function B(e){return e===`f32`?`0.0`:e===`u32`?`0u`:e===`i32`?`0i`:`${e}()`}function tt(e,t,n){let r=n.kind,i=new Set(t.map(e=>e.name)),a=e.allDefines();if(a.PASS_MAIN=+(r===`main`||r===`visibility`),a.PASS_MASK=+((n.colorFormats?.length??3)>2),a.PASS_VISIBILITY=+(r===`visibility`),a.PASS_DEPTH=+(r===`depth`),a.PASS_COLOR=+(r===`color`),a.PASS_LATE=+!!n.late,a.LIT=+!!e.lit,a.INSTANCED=+!!i.has(`instanceMatrix0`),a.INSTANCE_COLOR=+!!i.has(`instanceColor`),Object.assign(a,n.defines||{}),r===`main`&&n.waterObjectCropModule&&!a.STUDIO_LIGHTING?a.WATER_OBJECT_CROP=1:a.WATER_OBJECT_CROP&&=0,a.WATER_OBJECT_CROP_VIEWPORT&&!a.WATER_OBJECT_CROP&&(a.WATER_OBJECT_CROP_VIEWPORT=0),a.YACHT_EXACT_FINISH_PALETTE&&(r!==`main`||a.STUDIO_LIGHTING||a.INSTANCED||!e.vertexColors||e.attributes?.aSurface!==`vec4f`||!i.has(`yachtFinishIndex`)||!e.yachtExactFinishPalette?.module)&&(a.YACHT_EXACT_FINISH_PALETTE=0),a.YACHT_HALF_COLOR&&(r!==`main`||!a.LIT||a.STUDIO_LIGHTING||a.SHEEN||!P.features.has(`shader-f16`))&&(a.YACHT_HALF_COLOR=0),a.YACHT_HALF_COLOR&&(a.F16=1),a.CLIP_DISTANCES=(a.REFRACTION_CLIP||a.WATER_MAP_REFLECTION)&&P.features.has(`clip-distances`)?1:0,a.WATER_YACHT_SHADING_CACHE&&(r!==`main`||a.STUDIO_LIGHTING||!a.LIT)&&(a.WATER_YACHT_SHADING_CACHE=0),a.WATER_YACHT_SHADING_CACHE&&(!n.yachtShadingCacheModule||!a.PASS_MASK))throw Error(`Yacht shading cache requires a main-pass module and a marker color attachment`);if(a.WATER_SURFACE_YACHT_OCCLUSION&&(r!==`main`||a.STUDIO_LIGHTING||!a.LIT||!a.YACHT_OPAQUE_COLOR||e.transparent)&&(a.WATER_SURFACE_YACHT_OCCLUSION=0),a.WATER_SURFACE_YACHT_OCCLUSION&&!n.waterSurfaceOcclusionModule)throw Error(`Yacht surface occlusion requires a main-pass depth module`);a.WATER_YACHT_PBR_PREPARED=a.WATER_YACHT_SHADING_CACHE||a.WATER_SURFACE_YACHT_OCCLUSION?1:0;let o=`struct VertexIn {
`;for(let e of t)o+=`\t@location( ${e.location} ) ${e.name}: ${e.wgsl},\n`;o+=`	@builtin( instance_index ) instance: u32,
	@builtin( vertex_index ) vertex: u32,
};
`;let s=`struct VertexData {
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
`;for(let t in e.attributes)s+=`\t${t}: ${e.attributes[t]},\n`;s+=`};
`;let c=r===`main`||r===`visibility`,l=0,u=`struct VSOut {
	@builtin( position ) clip: vec4f,
`;u+=`\t@location( ${l++} ) worldPos: vec3f,\n`,u+=`\t@location( ${l++} ) normal: vec3f,\n`,u+=`\t@location( ${l++} ) uv: vec2f,\n`,u+=`\t@location( ${l++} )${a.YACHT_FLAT_COLOR?` @interpolate( flat )`:``} color: vec4f,\n`,c&&(u+=`\t@location( ${l++} ) curClip: vec4f,\n`,u+=`\t@location( ${l++} ) prevClip: vec4f,\n`);for(let t in e.varyings){let n=e.varyings[t];u+=`\t@location( ${l++} )${et.test(n)||a.YACHT_FLAT_SURFACE&&t===`vSurface`?` @interpolate( flat )`:``} ${t}: ${n},\n`}if(u+=`};
`,a.CLIP_DISTANCES){let e=[...u.matchAll(/\s(\w+): [^,]+,\n/g)].map(e=>e[1]);u+=u.replace(`struct VSOut {`,`struct VSOutClip {`).replace(/};\n$/,`	@builtin( clip_distances ) clipDistances: array<f32, 1>,
};
`),u+=`fn vsClip( o: VSOut, d: f32 ) -> VSOutClip {\n\tvar c: VSOutClip;\n${e.map(e=>`\tc.${e} = o.${e};\n`).join(``)}\tc.clipDistances[ 0 ] = d;\n\treturn c;\n}\n`}let d=``;for(let e in R)if(i.has(e)){let n=t.find(t=>t.name===e);e===`color`&&n.wgsl===`vec3f`?d+=`	v.color = vec4f( i.color, 1.0 );
`:d+=`\tv.${e} = i.${e};\n`}else e!==`position`&&(d+=`\tv.${e} = ${z[e]};\n`);for(let t in e.attributes)d+=i.has(t)?`\tv.${t} = i.${t};\n`:`\tv.${t} = ${B(e.attributes[t])};\n`;a.YACHT_EXACT_FINISH_PALETTE&&(d+=`	let yachtFinish = yachtExactVertexFinish( i.yachtFinishIndex );
	v.color = yachtFinish.color;
	v.aSurface = yachtFinish.surface;
`);let f=`
struct Draw {
	model: mat4x4f,
	prevModel: mat4x4f,
	params: vec4f,  // x: object id, y: user, z: user, w: user
	params2: vec4f,
};
@group( 2 ) @binding( 0 ) var<uniform> draw: Draw;

${o}
${s}
${u}

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
${d}#if !HAS_POSITION
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
#if YACHT_PRECOMPUTED_NORMALS && !INSTANCED
		wn = yachtNormal.matrix * v.normal;
#else
		wn = cofactor3( v.model ) * v.normal;
#endif
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
#if WATER_OBJECT_CROP && !WATER_OBJECT_CROP_VIEWPORT
	// Remap only the raster position. Motion retains the original full-view
	// clips and frame resolution; the target keeps the original pixel density.
	if ( waterObjectCrop.cropEnabled != 0u ) {
		let scale = waterObjectCrop.sourceSize / waterObjectCrop.size;
		let offset = ( waterObjectCrop.sourceSize - waterObjectCrop.size - 2.0 * waterObjectCrop.origin ) * vec2f( 1.0, -1.0 ) / waterObjectCrop.size;
		o.clip = vec4f( o.clip.xy * scale + o.clip.w * offset, o.clip.zw );
	}
#endif
#if CLIP_DISTANCES
#if WATER_MAP_REFLECTION
	return vsClip( o, wp.y - ( frame.seaLevel - 0.04 ) );
#else
	return vsClip( o, frame.seaLevel + REFRACTION_CLIP_MARGIN - wp.y );
#endif
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
#if WATER_OBJECT_CROP
	// Builtin position is target-local. Restore the original half-integer
	// screen coordinates for material hooks, shadow dither and depth consumers.
	if ( waterObjectCrop.cropEnabled != 0u ) {
		in.vs.clip = vec4f( vs.clip.xy + waterObjectCrop.origin, vs.clip.zw );
	}
#endif
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
#if WATER_OBJECT_CROP
	in.pixel = in.vs.clip.xy;
#else
	in.pixel = vs.clip.xy;
#endif
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
#if WATER_MAP_REFLECTION && !CLIP_DISTANCES
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
#if WATER_YACHT_PBR_PREPARED && PASS_MAIN
	waterYachtPbrPrepare( s, in.P );
#endif
#if WATER_SURFACE_YACHT_OCCLUSION && PASS_MAIN
	let yachtWaterHidden = waterSurfaceHidden( in );
#endif
#if WATER_YACHT_SHADING_CACHE && PASS_MAIN
	// Read's own normal/albedo derivatives remain unconditional even when
	// surface occlusion is also enabled for another part of this quad.
	let yachtVisibility = waterYachtCachePrepare( s, in.P, in.V, in.pixel );
	let cachedYachtColor = waterYachtCacheRead( in, s, yachtVisibility );
#endif
	var r: FragResult;
#if LIT
#if WATER_SURFACE_YACHT_OCCLUSION && PASS_MAIN
	if ( yachtWaterHidden ) {
		r.color = vec4f( vec3f( 0.0 ), s.alpha );
	} else {
#endif
#if WATER_YACHT_SHADING_CACHE && PASS_MAIN
	if ( cachedYachtColor.a > 0.5 ) {
		r.color = vec4f( cachedYachtColor.rgb, s.alpha );
	} else {
		r.color = vec4f( shadeSurface( s, in.P, in.V, in.pixel ), s.alpha );
	}
#else
	r.color = vec4f( shadeSurface( s, in.P, in.V, in.pixel ), s.alpha );
#endif
#if WATER_SURFACE_YACHT_OCCLUSION && PASS_MAIN
	}
#endif
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
#if WATER_YACHT_SHADING_CACHE && PASS_MAIN
	// Alpha one overwrites stale eligibility even on fresh or transparent
	// rejected fragments. Color, depth and motion keep their ordinary outputs.
	r.mask = waterYachtCacheMarker();
#if WATER_SURFACE_YACHT_OCCLUSION
	// Hidden black radiance must never seed a visible pixel's next-frame cache.
	if ( yachtWaterHidden ) { r.mask = vec4f( 0.0, 0.0, 0.0, 1.0 ); }
#endif
#endif
#if WATER_YACHT_SHADING_CACHE && PASS_MAIN && WATER_YACHT_CACHE_DIAGNOSTIC
#if WATER_YACHT_CACHE_CLASS == 1 || WATER_YACHT_CACHE_CLASS == 2
	// Enable for one untimed raster AFTER physical-radiance warmup. Persistent
	// red/green output would alter the next frame's radiance smoothness gate.
	// R/G distinguish fresh/reused shading; B distinguishes glazing from shell.
	if ( yachtCache.diagnosticOutput != 0u ) {
		let cacheHit = select( 0.0, 1.0, cachedYachtColor.a > 0.5 );
#if WATER_YACHT_CACHE_CLASS == 2
		r.color = vec4f( 1.0 - cacheHit, cacheHit, 1.0, r.color.a );
#else
		r.color = vec4f( 1.0 - cacheHit, cacheHit, 0.0, r.color.a );
#endif
	}
#endif
#endif
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
`,m=e.shadow?`fn materialShadow( in: FragInput ) -> bool {\n${e.shadow}\n}\n`:``;a.HAS_SHADOW_HOOK=+!!e.shadow,a.NEEDS_DEPTH_FRAGMENT=r===`depth`&&(e.alphaTest>0||e.shadow)?1:0,a.HAS_POSITION=+!!i.has(`position`);let h=f.replace(`fn fragInput(`,m+`fn fragInput(`).replace(/\bTRANSPARENT_F\b/g,e.transparent?`true`:`false`).replace(/\bVELOCITY_WEIGHT\b/g,nt(e.velocityWeight)).replace(/\bREFRACTION_CLIP_MARGIN\b/g,nt((n.defines&&n.defines.REFRACTION_CLIP_MARGIN)??0)),_=[p,j,...e.modules];return(r!==`depth`||g(e.modules).includes(ae))&&(_=[p,j,...A(n.lightingHooks),ae,...e.modules]),e.lightingHooks===!1&&!g(e.modules).includes(ae)&&(_=[p,j,M,...e.modules]),a.WATER_YACHT_SHADING_CACHE&&_.push(n.yachtShadingCacheModule),a.WATER_SURFACE_YACHT_OCCLUSION&&_.push(n.waterSurfaceOcclusionModule),a.YACHT_EXACT_FINISH_PALETTE&&_.push(e.yachtExactFinishPalette.module),a.WATER_OBJECT_CROP&&_.push(n.waterObjectCropModule),{code:h,modules:_,defines:a,bindings:{mat:{uniform:e.uniformBlock},...e.bindings},hasFragment:r!==`depth`||a.NEEDS_DEPTH_FRAGMENT===1}}function nt(e){let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`}var V=0,H={color:[`vec3f`,null],opacity:[`f32`,1],emissive:[`vec3f`,null],roughness:[`f32`,1],metalness:[`f32`,0],alphaTest:[`f32`,0]},rt=class{constructor(e={}){this.id=V++,this.isMaterial=!0,this.name=e.name||`material`+this.id,this.version=0,this.modules=e.modules||[],this.varyings=e.varyings||{},this.attributes=e.attributes||{},this.vertex=e.vertex||``,this.surface=e.surface||``,this.output=e.output||``,this.shadow=e.shadow||``,this.defines={...e.defines||{}},this.lit=e.lit!==!1,this.side=e.side||`front`,this.transparent=!!e.transparent,this.blending=e.blending||(this.transparent?`normal`:`none`),this.depthWrite=e.depthWrite??!this.transparent,this.depthTest=e.depthTest??!0,this.depthCompare=e.depthCompare||null,this.depthBias=e.depthBias||0,this.depthBiasSlopeScale=e.depthBiasSlopeScale||0,this.colorWrite=e.colorWrite??!0,this.topology=e.topology||`triangle-list`,this.visible=e.visible??!0,this.vertexColors=!!e.vertexColors,this.velocityWeight=e.velocityWeight??1,this.underwaterLighting=e.underwaterLighting||`full`,this.appliesHillShadow=!!e.appliesHillShadow,this.localLightsCheap=!!e.localLightsCheap,this.receiveShadows=e.receiveShadows??!0,this.userData=e.userData||{};let t={...H};for(let n in e.uniforms||{})t[n]=e.uniforms[n];this.uniformBlock=new r(`MaterialParams`+this.id,t,{label:this.name}),this.uniforms=this.uniformBlock.fields;let n=this.uniforms;n.color.value=it(e.color,new I(1,1,1)),n.emissive.value=it(e.emissive,new I(0,0,0)),e.roughness!==void 0&&(n.roughness.value=e.roughness),e.metalness!==void 0&&(n.metalness.value=e.metalness),e.opacity!==void 0&&(n.opacity.value=e.opacity),e.alphaTest!==void 0&&(n.alphaTest.value=e.alphaTest),this.bindings={};for(let t in e.textures||{}){let n=e.textures[t];this.bindings[t]=n&&n.isTexture||typeof n==`function`?{texture:n}:n}for(let t in e.storage||{}){let n=e.storage[t];this.bindings[t]=n&&n.isStorageBuffer?{storage:n,access:`read`}:n}Object.assign(this.bindings,e.bindings||{}),this._listeners=[]}get color(){return this.uniforms.color.value}set color(e){this.uniforms.color.value=it(e,this.uniforms.color.value)}get emissive(){return this.uniforms.emissive.value}set emissive(e){this.uniforms.emissive.value=it(e,this.uniforms.emissive.value)}get roughness(){return this.uniforms.roughness.value}set roughness(e){this.uniforms.roughness.value=e}get metalness(){return this.uniforms.metalness.value}set metalness(e){this.uniforms.metalness.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms.opacity.value=e}get alphaTest(){return this.uniforms.alphaTest.value}set alphaTest(e){e>0!=this.uniforms.alphaTest.value>0&&(this.needsUpdate=!0),this.uniforms.alphaTest.value=e}set(e,t){this.uniformBlock.set(e,t)}set needsUpdate(e){e&&this.version++}setDefine(e,t){this.defines[e]!==t&&(this.defines[e]=t,this.version++)}pipelineKey(){return`${this.id}.${this.version}.${this.side}.${this.transparent}.${typeof this.blending==`string`?this.blending:JSON.stringify(this.blending)}.${this.depthWrite}.${this.depthTest}.${this.depthCompare}.${this.colorWrite}.${this.topology}.${this.alphaTest>0}.${this.underwaterLighting}.${this.appliesHillShadow}.${this.localLightsCheap}.${this.receiveShadows}.${this.depthBias}.${this.depthBiasSlopeScale}.${this.vertexColors}`}allDefines(){return{...this.defines,UNDERWATER_LIGHTING:{none:0,lite:1,full:2}[this.underwaterLighting]??2,HILL_SHADOW_SELF:+!!this.appliesHillShadow,LOCAL_LIGHTS_CHEAP:+!!this.localLightsCheap,ALPHA_TEST:+(this.alphaTest>0),DOUBLE_SIDED:+(this.side===`double`),BACK_SIDE:+(this.side===`back`),TRANSPARENT:+!!this.transparent,RECEIVE_SHADOWS:+!!this.receiveShadows}}addEventListener(e,t){e===`dispose`&&this._listeners.push(t)}dispose(){for(let e of this._listeners)e({target:this})}clone(){let e=Object.create(Object.getPrototypeOf(this));return Object.assign(e,this),e.id=V++,e.version=0,e.defines={...this.defines},e.bindings={...this.bindings},e.uniformBlock=new r(`MaterialParams`+e.id,Object.fromEntries(this.uniformBlock.order.map(e=>[e,[this.uniformBlock.layout[e].typeStr,U(this.uniforms[e].value)]])),{label:e.name}),e.uniforms=e.uniformBlock.fields,e._listeners=[],e}};function U(e){return e&&typeof e==`object`&&e.clone?e.clone():Array.isArray(e)?e.map(U):e}function it(e,t){return e==null?t:e.isColor?t.copy?t.copy(e):e.clone():typeof e==`number`||typeof e==`string`?t.set(e):Array.isArray(e)?t.setRGB(e[0],e[1],e[2]):e.isVector3?t.setRGB(e.x,e.y,e.z):t}function at(e){if(!e||e===`none`)return;if(typeof e==`object`)return e;let t=(e,t,n=`add`)=>({srcFactor:e,dstFactor:t,operation:n});switch(e){case`normal`:return{color:t(`src-alpha`,`one-minus-src-alpha`),alpha:t(`one`,`one-minus-src-alpha`)};case`premultiplied`:return{color:t(`one`,`one-minus-src-alpha`),alpha:t(`one`,`one-minus-src-alpha`)};case`additive`:return{color:t(`src-alpha`,`one`),alpha:t(`zero`,`one`)};case`add`:return{color:t(`one`,`one`),alpha:t(`one`,`one`)};case`multiply`:return{color:t(`dst`,`zero`),alpha:t(`zero`,`one`)};case`min`:return{color:t(`one`,`one`,`min`),alpha:t(`one`,`one`,`min`)};case`max`:return{color:t(`one`,`one`,`max`),alpha:t(`one`,`one`,`max`)}}throw Error(`unknown blending `+e)}var ot={view:`mat4x4f`,proj:`mat4x4f`,viewProj:`mat4x4f`,invView:`mat4x4f`,invProj:`mat4x4f`,invViewProj:`mat4x4f`,viewProjNoJitter:`mat4x4f`,prevViewProjNoJitter:`mat4x4f`,cameraPos:[`vec3f`,new T],near:[`f32`,.1],prevCameraPos:[`vec3f`,new T],far:[`f32`,6e4],resolution:[`vec2f`,new b(1,1)],invResolution:[`vec2f`,new b(1,1)],outputResolution:[`vec2f`,new b(1,1)],jitter:[`vec2f`,new b],prevJitter:[`vec2f`,new b],frameIndex:[`u32`,0],time:[`f32`,0],dt:[`f32`,1/60],seaLevel:[`f32`,0],waterEnabled:[`f32`,1],atmosphereQuality:[`f32`,1],antiAliasingQuality:[`f32`,1],sunDir:[`vec3f`,new T(.3,.6,-.7).normalize()],night:[`f32`,0],sunColor:[`vec3f`,new I(1,1,1)],exposure:[`f32`,1],skyIrradiance:[`vec3f`,new I(.3,.4,.6)],cameraUnderwater:[`f32`,0],horizonColor:[`vec3f`,new I(.6,.7,.8)],cameraWaterHeight:[`f32`,0],waterAbsorption:[`vec3f`,new T(.42,.075,.035)],windSpeed:[`f32`,7],waterScattering:[`vec3f`,new T(.012,.018,.024)],envIntensity:[`f32`,1],windDir:[`vec2f`,new b(.35,.94).normalize()],reversedDepth:[`f32`,1],pad0:[`f32`,0],debug:[`vec4f`,new F]},st=[`view`,`proj`,`viewProj`,`invView`,`invProj`,`invViewProj`,`viewProjNoJitter`,`prevViewProjNoJitter`,`cameraPos`,`near`,`prevCameraPos`,`far`,`resolution`,`invResolution`,`jitter`,`prevJitter`,`reversedDepth`],ct=new r(`Frame`,ot,{label:`frame`});L(ct);function lt(e){let t=new r(`Frame`,ot,{label:e});return t.onBeforePack=()=>{for(let e of ct.order)st.includes(e)||(t.fields[e].value=ct.fields[e].value)},t}var W=ct.fields,ut={time:W.time,dt:W.dt,seaLevel:W.seaLevel,waterEnabled:W.waterEnabled,atmosphereQuality:W.atmosphereQuality,antiAliasingQuality:W.antiAliasingQuality,sunDir:W.sunDir,sunColor:W.sunColor,skyIrradiance:W.skyIrradiance,horizonColor:W.horizonColor,waterAbsorption:W.waterAbsorption,waterScattering:W.waterScattering,cameraUnderwater:W.cameraUnderwater,cameraWaterHeight:W.cameraWaterHeight,exposure:W.exposure,windDir:W.windDir,windSpeed:W.windSpeed,night:W.night,envIntensity:W.envIntensity},dt=9.81,ft=new y;function pt(e,t,n,{jitterX:r=0,jitterY:i=0,prevViewProj:a=null,prevCameraPos:o=null,block:s=ct}={}){let c=s.fields;e.updateMatrixWorld(),e.matrixWorldInverse&&e.matrixWorldInverse.copy(e.matrixWorld).invert();let l=e.matrixWorldInverse,u=e.projectionMatrix;c.view.value=l.clone(),c.proj.value=u.clone();let d=new y().multiplyMatrices(u,l);c.viewProjNoJitter.value=d.clone();let f=2*r/t,p=2*i/n;ft.makeTranslation(f,p,0);let m=new y().multiplyMatrices(ft,d);c.viewProj.value=m,c.invView.value=e.matrixWorld.clone(),c.invProj.value=u.clone().invert(),c.invViewProj.value=m.clone().invert(),c.prevViewProjNoJitter.value=a?a.clone():d.clone(),c.cameraPos.value=new T().setFromMatrixPosition(e.matrixWorld),c.prevCameraPos.value=o?o.clone():c.cameraPos.value.clone(),c.near.value=e.near,c.far.value=e.far,c.resolution.value=new b(t,n),c.invResolution.value=new b(1/t,1/n),c.prevJitter.value=c.jitter.value?c.jitter.value.clone():new b,c.jitter.value=new b(f,p),c.reversedDepth.value=e.reversedDepth===!1?0:1}var mt=new ue,ht=new E,gt=new y,_t=new T,vt=new T,yt=new u,bt=2**-23;function xt(e,t){let n=t.elements.map(Math.fround),r=1/0,i=-1/0,a=1/0,o=-1/0;for(let t of[e.min.x,e.max.x])for(let s of[e.min.y,e.max.y])for(let c of[e.min.z,e.max.z])for(let e of[2,3]){let l=[n[e]*t,n[e+4]*s,n[e+8]*c,n[e+12]],u=l.reduce((e,t)=>e+t,0),d=16*bt*l.reduce((e,t)=>e+Math.abs(t),0)+1e-37;e===2?(r=Math.min(r,u-d),i=Math.max(i,u+d)):(a=Math.min(a,u-d),o=Math.max(o,u+d))}if(!(a>0))return null;let s=[r/a,r/o,i/a,i/o],c=Math.min(...s),l=Math.max(...s),u=16*bt*Math.max(Math.abs(c),Math.abs(l))+1e-37;return Number.isFinite(u)?[c-u,l+u]:null}function St(e,t){return e&&t&&(e[1]<t[0]||t[1]<e[0])}var Ct=new WeakMap,wt=0,Tt=256;function Et(e){let t=e.kind===`main`&&e.defines?.WATER_YACHT_SHADING_CACHE&&e.yachtShadingCacheModule?`.yachtCache:`+e.yachtShadingCacheModule.id:``,n=e.kind===`main`&&e.defines?.WATER_SURFACE_YACHT_OCCLUSION&&e.waterSurfaceOcclusionModule?`.yachtOcclusion:`+e.waterSurfaceOcclusionModule.id:``,r=e.kind===`main`&&e.waterObjectCropModule?`.waterObjectCrop:`+e.waterObjectCropModule.id:``;return e.lightingHooks?`.`+Object.entries(e.lightingHooks).filter(([,e])=>e).sort((e,t)=>e[0].localeCompare(t[0])).map(([e,t])=>e+`:`+t.id).join(`,`)+t+n+r:t+n+r}function G(e,t,n,r){if(r?.kind!==`main`||r.defines?.STUDIO_LIGHTING||r.defines?.YACHT_EXACT_FINISH_PALETTE===0||!n.defines?.YACHT_EXACT_FINISH_PALETTE||!n.vertexColors||n.transparent||n.attributes?.aSurface!==`vec4f`)return null;let i=n.yachtExactFinishPalette;return i?.validFor(e,t)?i:null}function K(e,t){let n=e.mainPassMaterialGroups;if(t!==`main`||!n||n.originalMaterial!==e.material||!Array.isArray(n.groups)||!n.validFor?.(e))return null;let r=0;for(let e of n.groups){if(e.start!==r||!Number.isInteger(e.count)||e.count<=0||e.count%3||!e.material||e.material.transparent)return null;r+=e.count}let i=e.geometry.index?.count??e.geometry.attributes.position?.count??0;return r===i&&!e.material.transparent?n:null}var Dt=class{constructor(){this.pipelines=new Map,this.geometries=new WeakMap,this.sharedAttributes=new WeakMap,this.sharedIndices=new WeakMap,this.resourceStats={vertexBuffers:0,indexBuffers:0,vertexBytes:0,indexBytes:0,attributeOwners:0,indexOwners:0,bufferUploadBytes:0},this.spatialSortEnabled=!0,this.capacity=8192,this.drawBuffer=null,this.drawData=null,this.drawCount=0,this.frame=-1,this.stats={draws:0,triangles:0,pipelines:0},this.drawLayout=null,this.drawBindGroup=null,this.syncPipelines=!0}_ensureDrawBuffer(){this.drawBuffer&&this.drawData.byteLength>=this.capacity*Tt||(this.drawBuffer&&this.drawBuffer.destroy(),this.drawBuffer=P.device.createBuffer({label:`draws`,size:this.capacity*Tt,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.drawData=new Float32Array(this.capacity*Tt/4),this.drawLayout=f([{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:`uniform`,hasDynamicOffset:!0,minBindingSize:160}}],`draw`),this.drawBindGroup=P.device.createBindGroup({label:`draws`,layout:this.drawLayout,entries:[{binding:0,resource:{buffer:this.drawBuffer,size:160}}]}))}_beginFrame(){this.frame!==P.frame&&(this.frame=P.frame,this._ensureDrawBuffer(),this.drawCount>this.capacity*.75&&(this.capacity*=2,this._ensureDrawBuffer()),this.drawCount=0,P.onSubmit(()=>{this.drawCount&&P.queue.writeBuffer(this.drawBuffer,0,this.drawData.buffer,0,this.drawCount*Tt)}),this.stats.draws=0,this.stats.triangles=0)}_slot(e){let t=e.__draw;if(t||=e.__draw={frame:-1,slot:0,cur:new Float32Array(16),prev:new Float32Array(16),has:!1},t.frame===P.frame)return t.slot;if(this.drawCount>=this.capacity)throw Error(`MeshRenderer: draw buffer full`);t.frame=P.frame,t.slot=this.drawCount++;let n=e.matrixWorld.elements;t.has&&!e.resetVelocity?t.prev.set(t.cur):t.prev.set(n),t.cur.set(n),t.has=!0,e.resetVelocity=!1;let r=t.slot*Tt/4,i=this.drawData;i.set(t.cur,r),i.set(e.staticVelocity?t.cur:t.prev,r+16);let a=e.drawParams;if(i[r+32]=e.id??0,i[r+33]=a?a[0]:0,i[r+34]=a?a[1]:0,i[r+35]=a?a[2]:0,a&&a.length>3)for(let e=0;e<4;e++)i[r+36+e]=a[3+e]??0;return t.slot}_geometryGPU(e){let t=this.geometries.get(e);return t||(t={buffers:new Map,index:null,indexVersion:-1},this.geometries.set(e,t),e.addEventListener&&e.addEventListener(`dispose`,()=>{if(!t.disposed){t.disposed=!0;for(let[e,n]of t.buffers)this._releaseShared(this.sharedAttributes,e,n);t.index&&this._releaseShared(this.sharedIndices,t.indexAttribute,t.index),this.geometries.delete(e)}})),t}_releaseShared(e,t,n){this.resourceStats[n.kind===`index`?`indexOwners`:`attributeOwners`]--,--n.owners===0&&(n.buffer?.destroy(),n.buffer&&this.resourceStats[n.kind===`index`?`indexBuffers`:`vertexBuffers`]--,this.resourceStats[n.kind===`index`?`indexBytes`:`vertexBytes`]-=n.allocationBytes||0,e.delete(t))}_attributeBuffer(e,t){let n=this._geometryGPU(e),r=t.isInterleavedBufferAttribute?t.data:t;if(r.gpuBuffer)return r.gpuBuffer.getGPU?r.gpuBuffer.getGPU():r.gpuBuffer;let i=n.buffers.get(r);i||(i=this.sharedAttributes.get(r),i||(i={buffer:null,size:0,version:-1,owners:0,kind:`attribute`,allocationBytes:0},this.sharedAttributes.set(r,i)),i.owners++,this.resourceStats.attributeOwners++,n.buffers.set(r,i));let a=r.version??0;if(i&&i.version===a&&i.array===r.array)return i.buffer;let o=J(t);if((!i.buffer||i.size<o.byteLength)&&(i.buffer?i.buffer.destroy():this.resourceStats.vertexBuffers++,this.resourceStats.vertexBytes-=i.allocationBytes,i.allocationBytes=Math.max(16,Ot(o.byteLength)),this.resourceStats.vertexBytes+=i.allocationBytes,i.buffer=P.device.createBuffer({label:t.name||`attribute`,size:Math.max(16,Ot(o.byteLength)),usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),i.size=o.byteLength,i.version=-1),i.version!==a||i.array!==r.array){let e=r.updateRanges&&r.updateRanges.length&&i.version>=0&&i.array===r.array?r.updateRanges:null;if(e&&o===r.array){let t=r.array.BYTES_PER_ELEMENT;for(let n of e)P.queue.writeBuffer(i.buffer,n.start*t,r.array.buffer,r.array.byteOffset+n.start*t,Ot(n.count*t)),this.resourceStats.bufferUploadBytes+=Ot(n.count*t);r.clearUpdateRanges?r.clearUpdateRanges():r.updateRanges.length=0}else kt(i.buffer,o),this.resourceStats.bufferUploadBytes+=Ot(o.byteLength);i.version=a}return i.array=r.array,i.buffer}_indexBuffer(e){let t=e.index;if(!t)return null;let n=this._geometryGPU(e);if(n.index&&n.indexAttribute!==t&&(this._releaseShared(this.sharedIndices,n.indexAttribute,n.index),n.index=null),!n.index){let e=this.sharedIndices.get(t);e||(e={buffer:null,size:0,version:-1,owners:0,array:null,ref:null,kind:`index`,allocationBytes:0},this.sharedIndices.set(t,e)),e.owners++,this.resourceStats.indexOwners++,n.index=e,n.indexAttribute=t}let r=n.index;if(r.ref&&r.array===t.array&&r.version===(t.version??0))return r.ref;let i=t.array instanceof Uint16Array||t.array instanceof Uint32Array?t.array:new Uint32Array(t.array);return(!r.buffer||r.size<i.byteLength)&&(r.buffer?r.buffer.destroy():this.resourceStats.indexBuffers++,this.resourceStats.indexBytes-=r.allocationBytes,r.allocationBytes=Math.max(16,Ot(i.byteLength)),this.resourceStats.indexBytes+=r.allocationBytes,r.buffer=P.device.createBuffer({label:`index`,size:Math.max(16,Ot(i.byteLength)),usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),r.size=i.byteLength,r.version=-1),(r.version!==(t.version??0)||r.array!==t.array)&&(kt(r.buffer,i),this.resourceStats.bufferUploadBytes+=Ot(i.byteLength),r.version=t.version??0),r.array=t.array,r.ref={buffer:r.buffer,format:i instanceof Uint16Array?`uint16`:`uint32`},r.ref}_cachedLayout(e,t,n,r=null){let i=Ct.get(t);i||Ct.set(t,i=new Map);let a=e.isInstancedMesh?e.instanceColor?2:1:0,o=G(e,t,n,r),s=o?n.id+`:exact-finish-palette`:a?n.id+`:`+a:n.id,c=n.skipVertexUV===!0,l=i.get(s);if(l&&l.palette===o&&l.version===n.version&&l.skipVertexUV===c&&l.attrsVersion===t.attributesVersion&&(!a||l.instanceMatrix===e.instanceMatrix)){let e=l.refs,n=l.names,r=t.attributes,i=!0;for(let t=0;t<n.length;t++)if(r[n[t]]!==e[t]){i=!1;break}if(i)return l.vl}let u=this._layout(e,t,n,r),d=u.layout.filter(e=>!e.name.startsWith(`instance`)&&e.name!==`yachtFinishIndex`).map(e=>e.name);return l={version:n.version,palette:o,skipVertexUV:c,attrsVersion:t.attributesVersion,instanceMatrix:e.instanceMatrix,names:d,refs:d.map(e=>t.attributes[e]),vl:u},u.pipelines=new Map,i.set(s,l),u}_layout(e,t,n,r=null){let i=[],a=G(e,t,n,r),o=[`position`,`normal`,`uv`,`color`,...Object.keys(n.attributes)];for(let e of o){if(e===`uv`&&n.skipVertexUV===!0||a&&(e===`color`||e===`aSurface`))continue;let r=t.attributes[e];r&&(e!==`color`||n.vertexColors||n.attributes.color)&&i.push({name:e,attr:r})}if(a&&i.push({name:`yachtFinishIndex`,attr:a.attribute}),e.isInstancedMesh){for(let t=0;t<4;t++)i.push({name:`instanceMatrix`+t,attr:e.instanceMatrix,column:t});e.instanceColor&&i.push({name:`instanceColor`,attr:e.instanceColor})}let s=[],c=[],l=new Map,u=0;for(let e of i){let t=e.attr,r=t.isInterleavedBufferAttribute?t.data:t,i=!!(t.isInstancedBufferAttribute||r.isInstancedInterleavedBuffer||t.meshPerAttribute||r.meshPerAttribute)||e.name.startsWith(`instance`),a=jt(t),o=l.get(r);if(o===void 0){o=s.length,l.set(r,o);let e=t.isInterleavedBufferAttribute?t.data.stride*a.bytesPerComponent:t.itemSize*a.bytesPerComponent;s.push({src:r,attr:t,layout:{arrayStride:a.converted?a.itemSize*4:e,stepMode:i?`instance`:`vertex`,attributes:[]}})}let d=t.isInterleavedBufferAttribute?t.offset*a.bytesPerComponent:0,f=a.format,p=a.wgsl;e.column!==void 0&&(d=e.column*16,f=`float32x4`,p=`vec4f`),s[o].layout.attributes.push({shaderLocation:u,offset:d,format:f}),(e.name===`position`||e.name===`normal`)&&(p=`vec3f`),e.name===`uv`&&(p=`vec2f`),e.name===`color`&&(p=t.itemSize===4?`vec4f`:`vec3f`),e.name===`instanceColor`&&(p=`vec3f`),n.attributes[e.name]&&(p=n.attributes[e.name]),c.push({name:e.name,wgsl:p,location:u,instanced:i}),u++}return{key:c.map(e=>`${e.name}:${e.wgsl}`).join(`,`)+`|`+s.map(e=>`${e.layout.arrayStride}/${e.layout.stepMode}/${e.layout.attributes.map(e=>e.format+`@`+e.offset).join(`;`)}`).join(`,`),layout:c,buffers:s}}_pipeline(e,t,n){e.__pkFrame!==P.frame&&(e.__pk=e.pipelineKey()+`|`+le.version,e.__pkFrame=P.frame);let r=n.passKey,i=t.pipelines&&t.pipelines.get(r);if(i&&i.materialKey===e.__pk)return i.p;let a=`${e.__pk}|${t.key}|${r}`,o=this.pipelines.get(a);return o||=this._createPipeline(e,t,n,a),t.pipelines&&t.pipelines.set(r,{materialKey:e.__pk,p:o}),o}_createPipeline(e,t,n,r){let i=tt(e,t.layout,n),a=s({modules:i.modules,bindings:i.bindings,code:i.code,defines:i.defines,stage:`render`,label:e.name}),o=l(a.code,e.name);this._ensureDrawBuffer();let c=P.device.createPipelineLayout({bindGroupLayouts:[a.group0.layout,a.bindings.layout,this.drawLayout]}),u=at(e.blending),d=[];if(n.kind===`main`){let t=n.defines?.WATER_MAP_MOTION&&!e.transparent&&e.velocityWeight===1,r=n.defines?.WATER_MAP_MOTION&&e.defines?.YACHT_OPAQUE_COLOR&&!e.transparent;d=[{format:n.colorFormats[0],blend:!r&&(e.transparent||n.late)?u:void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0},{format:n.colorFormats[1],blend:n.late&&!t?at(`premultiplied`):void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0}],n.colorFormats.length>2&&d.push({format:n.colorFormats[2],blend:at(`normal`),writeMask:e.colorWrite?GPUColorWrite.ALL:0})}else n.kind===`color`&&(d=n.colorFormats.map(t=>({format:t,blend:u,writeMask:e.colorWrite?GPUColorWrite.ALL:0})));let f=e.side,p=n.cullOverride||(f===`double`?`none`:f===`back`?`front`:`back`),m=e.depthTest?e.depthCompare||n.depthCompare:`always`,h={label:e.name+` `+n.kind,layout:c,vertex:{module:o,entryPoint:`vs`,buffers:t.buffers.map(e=>e.layout)},primitive:{topology:e.topology,cullMode:p,frontFace:`ccw`}};i.hasFragment&&(h.fragment={module:o,entryPoint:`fs`,targets:d}),n.depthFormat&&(h.depthStencil={format:n.depthFormat,depthWriteEnabled:e.depthWrite,depthCompare:m,depthBias:n.kind===`depth`?n.depthBias||0:e.depthBias,depthBiasSlopeScale:n.kind===`depth`?n.depthBiasSlopeScale||0:e.depthBiasSlopeScale});let g={handle:P.renderPipeline(h),bindings:a.bindings,label:h.label};return this.pipelines.set(r,g),this.stats.pipelines=this.pipelines.size,g}collect(e,{camera:t,layerMask:n=4294967295,filter:r=null,kind:i=`main`,cull:a=!0,frameBlock:o=ct}){let s=[],c=[];t&&(t.updateMatrixWorld(),gt.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse.copy(t.matrixWorld).invert()),ht.setFromProjectionMatrix(gt,t.reversedDepth!==!1),vt.setFromMatrixPosition(t.matrixWorld));let l=this.precompiling,u=e=>{if(e.visible||l){e.isMesh&&e.material&&e.geometry&&(e.layers.mask&n)!==0&&(!r||r(e))&&(i!==`depth`||e.castShadow)&&(l||!a||!t||e.frustumCulled===!1||this._inFrustum(e,t,o,i))&&(e.onBeforeRender&&e.onBeforeRender(null,null,t,e.geometry,e.material,null),(e.visible||l)&&this._addItems(e,s,c,i));for(let t of e.children)u(t)}};e.updateMatrixWorld(),u(e),s.sort((e,t)=>e.renderOrder-t.renderOrder||e.pipeKey-t.pipeKey||e.z-t.z);for(let e=1;e<s.length;e++){let t=e;for(;t>0;){let e=s[t-1],n=s[t];if(!e.sortBounds||!n.sortBounds||e.renderOrder!==n.renderOrder||e.pipeKey!==n.pipeKey||e.spatialDepth<=n.spatialDepth||e.sortBounds.intersectsBox(n.sortBounds)||!St(e.sortDepthRange,n.sortDepthRange))break;s[t-1]=n,s[t]=e,t--}}return c.sort((e,t)=>e.renderOrder-t.renderOrder||t.z-e.z),{opaque:s,transparent:c}}_inFrustum(e,t,n,r){let i=null;if(e.isInstancedMesh?(!e.boundingSphere&&e.computeBoundingSphere&&e.computeBoundingSphere(),i=e.boundingSphere):(e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),i=e.geometry.boundingSphere),!i||i.radius<0||!Number.isFinite(i.radius))return!0;if(mt.copy(i).applyMatrix4(e.matrixWorld),e.userData?.spatialSort&&t){let e=mt.center.distanceTo(vt)+mt.radius,i=Math.max(.001,e*1e-6);if(r!==`depth`){let r=n?.fields,a=r?.resolution?.value,o=r?.jitter?.value,s=Math.max(1,a?.x||1),c=Math.max(1,a?.y||1),l=Math.max(2,Math.abs(o?.x||0)*s/2+1),u=Math.max(2,Math.abs(o?.y||0)*c/2+1),d=t.projectionMatrix.elements,f=d[15]===0?e:1;i+=Math.max(2*l/(s*Math.abs(d[0])),2*u/(c*Math.abs(d[5])))*f}mt.radius+=i}return ht.intersectsSphere(mt)}_addItems(e,t,n,r=`main`){let i=e.geometry,a=Array.isArray(e.material)?e.material:null,o=_t.setFromMatrixPosition(e.matrixWorld).distanceToSquared(vt),s=this.spatialSortEnabled&&e.userData?.spatialSort&&i.boundingBox?yt.copy(i.boundingBox).applyMatrix4(e.matrixWorld).expandByScalar(.001).clone():null,c=s?s.distanceToPoint(vt)**2:o,l=s?xt(s,gt):null,u=(r,a,u,d=r?.id)=>{if(!r||!r.visible&&!this.precompiling)return;let f=r.depthTest&&r.depthWrite&&r.blending===`none`,p={object:e,geometry:i,material:r,start:a,count:u,z:o,spatialDepth:c,sortBounds:f?s:null,sortDepthRange:l,renderOrder:e.renderOrder||0,pipeKey:d};(r.transparent?n:t).push(p)},d=i.drawRange||{start:0,count:1/0},f=K(e,r);if(f){if(!f.originalMaterial.visible&&!this.precompiling)return;for(let e of f.groups){let t=Math.max(e.start,d.start),n=Math.min(e.start+e.count,d.start+d.count);n>t&&u(e.material,t,n-t,f.originalMaterial.id)}return}if(a&&i.groups&&i.groups.length)for(let e of i.groups){let t=Math.max(e.start,d.start),n=Math.min(e.start+e.count,d.start+d.count);n>t&&u(a[e.materialIndex],t,n-t)}else u(a?a[0]:e.material,d.start,d.count)}async prepareMeshes(e,t,{cancelled:n=()=>!1}={}){let r=new Set,i=globalThis.performance?.now()??Date.now();for(let a of t){let t={kind:`main`,late:!1,colorFormats:[],depthFormat:null,depthCompare:`greater-equal`,frameBlock:ct,layerMask:4294967295,...a};t.passKey=`${t.kind}.${+!!t.late}.${t.colorFormats.join(`,`)}.${t.depthFormat}.${t.depthCompare}.${t.cullOverride||``}.${t.defines?JSON.stringify(t.defines):``}`+Et(t);for(let a of e){if(n())return;if(!(a.layers.mask&t.layerMask)||t.kind===`depth`&&!a.castShadow)continue;this._indexBuffer(a.geometry);let e=K(a,t.kind),o=e?[...new Set(e.groups.map(e=>e.material))]:[a.material];for(let e of o){let n=this._cachedLayout(a,a.geometry,e,t);r.add(this._pipeline(e,n,t).handle)}(globalThis.performance?.now()??Date.now())-i>=8&&typeof requestAnimationFrame==`function`&&(await new Promise(e=>requestAnimationFrame(e)),i=globalThis.performance?.now()??Date.now())}}if(await P.pipelinesReady(),!n()){for(let e of r)if(e.failed||!e.pipeline)throw Error(`Could not prepare `+e.label)}}render(e,t){this._beginFrame(),t={kind:`main`,late:!1,colorFormats:[],depthFormat:null,depthCompare:`greater-equal`,frameBlock:ct,layerMask:4294967295,...t},t.passKey=`${t.kind}.${+!!t.late}.${t.colorFormats.join(`,`)}.${t.depthFormat}.${t.depthCompare}.${t.cullOverride||``}.${t.defines?JSON.stringify(t.defines):``}`+Et(t);let n=t.items||this.collect(e,t);this._prepareYachtTriangleCull(n,t),this._prepareYachtOpaqueIndexOrder(n,t);let r=P.getEncoder(),i=(t.colorViews||[]).map((e,n)=>{let r=t.clearColors?t.clearColors[n]:null;return{view:e,loadOp:r?`clear`:`load`,storeOp:`store`,clearValue:r||[0,0,0,0]}}),a={label:t.label||t.kind,colorAttachments:i};t.depthView&&(a.depthStencilAttachment={view:t.depthView,depthLoadOp:t.clearDepth===null||t.clearDepth===void 0?`load`:`clear`,depthStoreOp:t.depthStoreOp||`store`,depthClearValue:t.clearDepth??0}),t.timestampWrites&&(a.timestampWrites=t.timestampWrites);let o=r.beginRenderPass(a);t.viewport&&o.setViewport(...t.viewport),o.setBindGroup(0,v(t.frameBlock,`render`).getBindGroup()),this.drawItems(o,n.opaque,t),t.betweenLists&&t.betweenLists(o),this.drawItems(o,n.transparent,t),t.after&&t.after(o),o.end()}_prepareYachtTriangleCull(e,t){if(t.kind===`main`&&t.waterObjectCropModule){for(let t of[...e.opaque,...e.transparent])t.yachtTriangleCull=null;return}if(this.precompiling||t.kind!==`main`||!t.yachtTriangleCull||t.viewport||(t.sampleCount??1)!==1)return;let n=t.frameBlock?.fields,r=n?.resolution?.value,i=n?.viewProj?.value;if(!r||!i)return;let a=e=>{for(let n of e){n.yachtTriangleCull=null;let{object:e,geometry:a,material:o}=n,s=a.index?.count??a.attributes.position?.count??a.vertexCount??0,c=Math.min(n.count,s-n.start);if(c<=0)continue;let l=this._cachedLayout(e,a,o,t),u=this._pipeline(o,l,t);(u.handle.pipeline||this.syncPipelines&&P.ready(u.handle))&&(this._slot(e),n.yachtTriangleCull=t.yachtTriangleCull.prepare(e,{model:e.__draw.cur,viewProj:i,width:r.x,height:r.y,start:n.start,count:c}))}};a(e.opaque),a(e.transparent)}_prepareYachtOpaqueIndexOrder(e,t){if(!t.waterOpaqueIndexOrder)return;for(let t of[...e.opaque,...e.transparent])t.yachtOpaqueIndexOrder=null;if(this.precompiling||t.kind!==`main`||t.viewport||t.waterObjectCropModule||t.yachtTriangleCull||(t.sampleCount??1)!==1||t.depthFormat!==`depth32float`||t.depthCompare!==`greater-equal`)return;let n=t.frameBlock?.fields,r=n?.resolution?.value,i=n?.viewProj?.value;if(r&&i)for(let n of e.opaque){let{object:e,geometry:a,material:o}=n,s=Math.min(n.count,(a.index?.count??0)-n.start);if(s<=0||o.transparent)continue;let c=this._cachedLayout(e,a,o,t),l=this._pipeline(o,c,t);(l.handle.pipeline||this.syncPipelines&&P.ready(l.handle))&&(this._slot(e),n.yachtOpaqueIndexOrder=t.waterOpaqueIndexOrder.prepare(e,{material:o,model:e.__draw.cur,viewProj:i,width:r.x,height:r.y,start:n.start,count:s}))}}drawItems(e,t,n){let r=null,i=null,a=new $e(e),o=++wt;for(let s of t){let{object:t,geometry:c,material:l}=s;if(!c.attributes.position&&!c.vertexCount&&!c.indirect)continue;let u,d;if(this.precompiling){try{u=this._cachedLayout(t,c,l,n),d=this._pipeline(l,u,n)}catch{continue}continue}u=this._cachedLayout(t,c,l,n),d=this._pipeline(l,u,n);let f=d.handle.pipeline||(this.syncPipelines?P.ready(d.handle):null);if(!f)continue;d!==r&&(e.setPipeline(f),r=d);let p=d.bindings.getBindGroup(o);p!==i&&(e.setBindGroup(1,p),i=p),a.bindObject(this.drawBindGroup,this._slot(t)*Tt);for(let e=0;e<u.buffers.length;e++)a.bindVertex(e,this._attributeBuffer(c,u.buffers[e].attr));let m=t.isInstancedMesh?t.count:c.instanceCount??1;if(m===0)continue;let h=n.kind===`main`&&n.yachtTriangleCull&&!n.viewport&&(n.sampleCount??1)===1?s.yachtTriangleCull:null;if(h){a.bindIndex(h.indexBuffer,h.indexFormat),e.drawIndexedIndirect(h.indirectBuffer,0),this.stats.draws++;continue}let g=n.kind===`main`&&n.waterOpaqueIndexOrder&&!n.viewport&&!n.waterObjectCropModule&&!n.yachtTriangleCull&&(n.sampleCount??1)===1?s.yachtOpaqueIndexOrder:null;if(g){a.bindIndex(g.indexBuffer,g.indexFormat),e.drawIndexed(g.count,m===1/0?1:m,g.start,0,0),this.stats.draws++,this.stats.triangles+=g.count/3*m;continue}let _=this._indexBuffer(c);if(c.indirect){let t=c.indirect.buffer.getGPU?c.indirect.buffer.getGPU():c.indirect.buffer,n=c.indirect.offsets||[c.indirect.offset||0];_&&a.bindIndex(_.buffer,_.format);for(let r of n)_?e.drawIndexedIndirect(t,r):e.drawIndirect(t,r),this.stats.draws++;continue}if(_){let t=Math.min(s.count,c.index.count-s.start);if(t<=0)continue;a.bindIndex(_.buffer,_.format),e.drawIndexed(t,m===1/0?1:m,s.start,0,0),this.stats.triangles+=t/3*m}else{let t=c.attributes.position?c.attributes.position.count:c.vertexCount,n=Math.min(s.count,t-s.start);if(n<=0)continue;e.draw(n,m,s.start,0),this.stats.triangles+=n/3*m}this.stats.draws++}}};function Ot(e){return Math.ceil(e/4)*4}function kt(e,t){if(t.byteLength%4==0){P.queue.writeBuffer(e,0,t.buffer,t.byteOffset,t.byteLength);return}let n=new Uint8Array(Ot(t.byteLength));n.set(new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),P.queue.writeBuffer(e,0,n)}var q=new WeakMap;function J(e){let t=e.isInterleavedBufferAttribute?e.data:e;if(!jt(e).converted)return t.array;let n=q.get(t);if(n&&n.version===t.version)return n.array;let r=e.count,i=e.itemSize,a=new Float32Array(r*i),o=e.normalized?At(t.array):1;for(let e=0;e<r*i;e++)a[e]=t.array[e]/o;return q.set(t,{version:t.version,array:a}),a}function At(e){return e instanceof Uint8Array?255:e instanceof Int8Array?127:e instanceof Uint16Array?65535:e instanceof Int16Array?32767:1}function jt(e){let t=(e.isInterleavedBufferAttribute?e.data:e).array,n=e.itemSize,r=e.normalized,i=e=>n===1?e:`vec${n}${e===`f32`?`f`:e===`u32`?`u`:`i`}`;if(t instanceof Float32Array)return{format:n===1?`float32`:`float32x${n}`,wgsl:i(`f32`),bytesPerComponent:4,itemSize:n};if(t instanceof Uint32Array)return{format:n===1?`uint32`:`uint32x${n}`,wgsl:i(`u32`),bytesPerComponent:4,itemSize:n};if(t instanceof Int32Array)return{format:n===1?`sint32`:`sint32x${n}`,wgsl:i(`i32`),bytesPerComponent:4,itemSize:n};let a={Uint8Array:[`uint8`,`unorm8`,1],Int8Array:[`sint8`,`snorm8`,1],Uint16Array:[`uint16`,`unorm16`,2],Int16Array:[`sint16`,`snorm16`,2]}[t.constructor.name];return a&&(n===2||n===4)&&!e.isInterleavedBufferAttribute?{format:(r?a[1]:a[0])+`x`+n,wgsl:i(r?`f32`:t instanceof Uint8Array||t instanceof Uint16Array?`u32`:`i32`),bytesPerComponent:a[2],itemSize:n}:{format:n===1?`float32`:`float32x${n}`,wgsl:i(`f32`),bytesPerComponent:4,itemSize:n,converted:!0}}var Mt=class{constructor(e){this.container=e,this.renderScale=1,this.clock=new Te,this.frame=0,this.onResize=[],this.renderOptimizations=Ee(),this.pacingStats={callbacks:0,submitted:0,completed:0,skipped:0,inFlight:0,maxInFlight:0}}async init(){let e=document.createElement(`canvas`);e.tabIndex=0,this.container.appendChild(e),this.canvas=e,this.domElement=e,await P.init({canvas:e}),P.reuseAllocationBindings=this.renderOptimizations.bindingReuse,this.meshRenderer=new Dt,this.meshRenderer.syncPipelines=!1,this.camera=new Xe(62,window.innerWidth/window.innerHeight,.06,6e4),this.scene=new Qe,window.addEventListener(`resize`,()=>this.resize()),this.resize()}setRenderScale(e){this.renderScale=e,this.resize()}get width(){return this.canvas.width}get height(){return this.canvas.height}resize(){let e=window.innerWidth,t=window.innerHeight,n=this.renderScale;this.canvas.width=Math.max(1,Math.floor(e*n)),this.canvas.height=Math.max(1,Math.floor(t*n)),this.canvas.style.width=e+`px`,this.canvas.style.height=t+`px`,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),ct.fields.outputResolution.value.set(this.canvas.width,this.canvas.height);for(let n of this.onResize)n(e,t)}currentTexture(){return P.context.getCurrentTexture()}start(e){this.stop(),this._running=!0;let t=this._loopGeneration,n=P.queue,r=this.renderOptimizations.framePacing;(!this._flight||this._flight.queue!==n)&&(this._flight={queue:n,count:0});let i=this._flight,a=this.pacingStats;r&&this.clock.reset();let o=s=>{if(this._running&&t===this._loopGeneration){if(a.callbacks++,r&&i.count>=2)a.skipped++;else{this.clock.update(s),this.frameInterval=this.clock.getDelta();let t=Math.min(.1,this.frameInterval);this.frame++,e(t,this.clock.getElapsed()),a.submitted++,r&&(i.count++,a.inFlight=i.count,a.maxInFlight=Math.max(a.maxInFlight,i.count),n.onSubmittedWorkDone().then(()=>{i.count--,a.completed++,i===this._flight&&(a.inFlight=i.count)},e=>{i.count--,i===this._flight&&(a.inFlight=i.count,a.error=String(e),this.stop(),console.error(`Frame queue failed:`,e))}))}this._running&&t===this._loopGeneration&&(this._raf=requestAnimationFrame(o))}};this._raf=requestAnimationFrame(o)}stop(){this._running=!1,this._loopGeneration=(this._loopGeneration||0)+1,cancelAnimationFrame(this._raf)}},Nt=35044,Y=new T,Pt=new b,Ft={getComponent(e,t){let n=this.array[this._idx(e,t)];return this.normalized?ne(n,this.array):n},setComponent(e,t,n){return this.array[this._idx(e,t)]=this.normalized?te(n,this.array):n,this},getX(e){return this.getComponent(e,0)},getY(e){return this.getComponent(e,1)},getZ(e){return this.getComponent(e,2)},getW(e){return this.getComponent(e,3)},setX(e,t){return this.setComponent(e,0,t)},setY(e,t){return this.setComponent(e,1,t)},setZ(e,t){return this.setComponent(e,2,t)},setW(e,t){return this.setComponent(e,3,t)},setXY(e,t,n){return this.setComponent(e,0,t),this.setComponent(e,1,n)},setXYZ(e,t,n,r){return this.setComponent(e,0,t),this.setComponent(e,1,n),this.setComponent(e,2,r)},setXYZW(e,t,n,r,i){return this.setComponent(e,0,t),this.setComponent(e,1,n),this.setComponent(e,2,r),this.setComponent(e,3,i)},applyMatrix3(e){if(this.itemSize===2)for(let t=0;t<this.count;t++)Pt.fromBufferAttribute(this,t).applyMatrix3(e),this.setXY(t,Pt.x,Pt.y);else if(this.itemSize===3)for(let t=0;t<this.count;t++)Y.fromBufferAttribute(this,t).applyMatrix3(e),this.setXYZ(t,Y.x,Y.y,Y.z);return this},applyMatrix4(e){for(let t=0;t<this.count;t++)Y.fromBufferAttribute(this,t).applyMatrix4(e),this.setXYZ(t,Y.x,Y.y,Y.z);return this},applyNormalMatrix(e){for(let t=0;t<this.count;t++)Y.fromBufferAttribute(this,t).applyNormalMatrix(e),this.setXYZ(t,Y.x,Y.y,Y.z);return this},transformDirection(e){for(let t=0;t<this.count;t++)Y.fromBufferAttribute(this,t).transformDirection(e),this.setXYZ(t,Y.x,Y.y,Y.z);return this}},It=class extends De{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`BufferAttribute: array should be a Typed Array.`);this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Nt,this.updateRanges=[],this.gpuType=1015,this.version=0,this.onUploadCallback=Lt}set needsUpdate(e){e===!0&&this.version++}_idx(e,t){return e*this.itemSize+t}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){let r=this.itemSize;e*=r,n*=t.itemSize;for(let i=0;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}set(e,t=0){return this.array.set(e,t),this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}dispose(){this.dispatchEvent({type:`dispose`})}};Object.assign(It.prototype,Ft),It.prototype.isBufferAttribute=!0;function Lt(){}var Rt=class extends It{constructor(e,t,n){super(new Uint16Array(e),t,n)}},zt=class extends It{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Bt=class extends It{constructor(e,t,n){super(new Float32Array(e),t,n)}},Vt=class e extends It{constructor(e,t,n,r=1){super(e,t,n),this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new e(this.array,this.itemSize).copy(this)}};Vt.prototype.isInstancedBufferAttribute=!0;var Ht=class extends De{constructor(e,t){super(),this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Nt,this.updateRanges=[],this.version=0,this.uuid=n(),this.onUploadCallback=Lt}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}set(e,t=0){return this.array.set(e,t),this}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0;r<this.stride;r++)this.array[e+r]=t.array[n+r];return this}clone(){return new this.constructor(new this.array.constructor(this.array),this.stride).copy(this)}dispose(){this.dispatchEvent({type:`dispose`})}};Ht.prototype.isInterleavedBuffer=!0;var Ut=class e extends Ht{constructor(e,t,n=1){super(e,t),this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new e(new this.array.constructor(this.array),this.stride,this.meshPerAttribute)}};Ut.prototype.isInstancedInterleavedBuffer=!0;var Wt=class{constructor(e,t,n,r=!1){this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}_idx(e,t){return e*this.data.stride+this.offset+t}clone(){let e=new this.array.constructor(this.count*this.itemSize);for(let t=0;t<this.count;t++)for(let n=0;n<this.itemSize;n++)e[t*this.itemSize+n]=this.array[this._idx(t,n)];return new It(e,this.itemSize,this.normalized)}};Object.assign(Wt.prototype,Ft),Wt.prototype.isInterleavedBufferAttribute=!0;var Gt=new WeakMap,Kt=new Set([`Merged exterior`,`Merged glazing`]),qt=1065353216;function Jt(e,{maximumTuples:t=256}={}){let n=e?.geometry,r=e?.material;if(!e?.isMesh||e.isInstancedMesh||e.isSkinnedMesh||!Kt.has(e.name)||!n||!r||Array.isArray(r)||!r.vertexColors||r.transparent||r.attributes?.aSurface!==`vec4f`||!Number.isInteger(t)||t<1)return null;let i=n.attributes?.color,a=n.attributes?.aSurface,o=n.attributes?.position?.count;if(!Number.isInteger(o)||o<1||!i||!a||!(i.array instanceof Float32Array)||!(a.array instanceof Float32Array)||i.isInterleavedBufferAttribute||a.isInterleavedBufferAttribute||i.gpuBuffer||a.gpuBuffer||i.normalized||a.normalized||![3,4].includes(i.itemSize)||a.itemSize!==4||i.count!==o||a.count!==o)return null;let s=new Uint32Array(i.array.buffer,i.array.byteOffset,i.array.length),c=new Uint32Array(a.array.buffer,a.array.byteOffset,a.array.length),l=new Uint32Array(o),u=[],d=new Map;for(let e=0;e<o;e++){let n=e*i.itemSize,r=e*4;for(let e=0;e<i.itemSize;e++)if(!Number.isFinite(i.array[n+e]))return null;for(let e=0;e<4;e++)if(!Number.isFinite(a.array[r+e]))return null;let o=[s[n],s[n+1],s[n+2],i.itemSize===4?s[n+3]:qt,c[r],c[r+1],c[r+2],c[r+3]],f=o.join(`,`),p=d.get(f);if(p!==void 0)l[e]=p;else{if(u.length===t)return null;l[e]=u.length,d.set(f,u.length),u.push(o)}}let f=new Uint32Array(u.length*8);for(let e=0;e<u.length;e++)f.set(u[e],e*8);return{geometry:n,material:r,color:i,surface:a,colorArray:i.array,surfaceArray:a.array,colorVersion:i.version??0,surfaceVersion:a.version??0,count:o,colorItemSize:i.itemSize,tupleCount:u.length,indices:l,coefficients:new Float32Array(f.buffer),sourceBytes:i.array.byteLength+a.array.byteLength,indexBytes:l.byteLength,paletteBytes:f.byteLength}}function Yt(e,t={}){if(Gt.has(e))return Gt.get(e);let n=[],i={meshes:0,tuples:0,sourceBytes:0,indexBytes:0,paletteBytes:0,disposed:!1};e.traverse(e=>{let a=Jt(e,t);if(!a)return;let o=new r(`YachtExactFinishPalette`,{values:[`vec4f[`+a.tupleCount*2+`]`,a.coefficients]},{label:e.name+` exact finish palette`}),s=new m({name:`azimut-exact-finish-palette`,uniforms:o,uniformName:`yachtFinishPalette`,code:`
struct YachtExactVertexFinish { color: vec4f, surface: vec4f, };
fn yachtExactVertexFinish( index: u32 ) -> YachtExactVertexFinish {
  return YachtExactVertexFinish( yachtFinishPalette.values[ index * 2u ], yachtFinishPalette.values[ index * 2u + 1u ] );
}
`}),c=new zt(a.indices,1);c.name=e.name+` lossless finish indices`;let l=e.material,u=l.yachtExactFinishPalette,d=l.defines.YACHT_EXACT_FINISH_PALETTE,f={...a,mesh:e,attribute:c,uniform:o,module:s,previousEntry:u,previousDefine:d,disposed:!1,validFor(t,n=t?.geometry){return!this.disposed&&t===e&&n===a.geometry&&t.material===a.material&&t.material.vertexColors&&!t.material.transparent&&!t.isInstancedMesh&&!t.isSkinnedMesh&&t.material.attributes?.aSurface===`vec4f`&&n.attributes.position?.count===a.count&&n.attributes.color===a.color&&n.attributes.aSurface===a.surface&&a.color.itemSize===a.colorItemSize&&a.surface.itemSize===4&&a.color.count===a.count&&a.surface.count===a.count&&!a.color.normalized&&!a.surface.normalized&&!a.color.gpuBuffer&&!a.surface.gpuBuffer&&a.color.array===a.colorArray&&a.surface.array===a.surfaceArray&&(a.color.version??0)===a.colorVersion&&(a.surface.version??0)===a.surfaceVersion}};l.yachtExactFinishPalette=f,l.setDefine(`YACHT_EXACT_FINISH_PALETTE`,1),l.addEventListener(`dispose`,()=>{o.buffer?.destroy(),o.buffer=null,f.disposed=!0}),n.push(f),i.meshes++,i.tuples+=a.tupleCount,i.sourceBytes+=a.sourceBytes,i.indexBytes+=a.indexBytes,i.paletteBytes+=a.paletteBytes});let a={entries:n,stats:i,dispose(){if(!i.disposed){i.disposed=!0;for(let e of n)e.disposed=!0,e.uniform.buffer?.destroy(),e.uniform.buffer=null,e.material.yachtExactFinishPalette===e&&(e.material.yachtExactFinishPalette=e.previousEntry),e.material.setDefine(`YACHT_EXACT_FINISH_PALETTE`,e.previousDefine);Gt.delete(e)}}};return Gt.set(e,a),a}var Xt={0:`front`,1:`back`,2:`double`,front:`front`,back:`back`,double:`double`};function Zt(e){let t={...e};return t.side!==void 0&&(t.side=Xt[t.side]||`front`),t}var Qt=class extends rt{constructor(e={},t=null){let n=Zt(e),r={...n.uniforms||{}};r.envMapIntensity=[`f32`,n.envMapIntensity??1],r.emissiveIntensity=[`f32`,n.emissiveIntensity??1],t&&Object.assign(r,t),super({...n,uniforms:r}),this.isSceneMaterial=!0,this.isMeshStandardMaterial=!0}get side(){return this._side}set side(e){let t=Xt[e]||`front`;t!==this._side&&this._side!==void 0&&this.version++,this._side=t}get emissiveIntensity(){return this.uniforms.emissiveIntensity.value}set emissiveIntensity(e){this.uniforms.emissiveIntensity.value=e}get envMapIntensity(){return this.uniforms.envMapIntensity.value}set envMapIntensity(e){this.uniforms.envMapIntensity.value=e}get surface(){return this._prelude()+(this._surface||``)}set surface(e){this._surface=e}_prelude(){return`	s.emissive = s.emissive * mat.emissiveIntensity;
	s.envIntensity = mat.envMapIntensity;
`}},$t=class extends Qt{constructor(e={}){let t=e.clearcoat??0,n=e.sheen??0;super(e,{clearcoat:[`f32`,t],clearcoatRoughness:[`f32`,e.clearcoatRoughness??0],specularIntensity:[`f32`,e.specularIntensity??1],sheen:[`f32`,n],sheenColor:[`vec3f`,null],sheenRoughness:[`f32`,e.sheenRoughness??1],ior:[`f32`,e.ior??1.5]}),this.isMeshPhysicalMaterial=!0,e.sheenColor===void 0?this.uniforms.sheenColor.value=en(0):this.uniforms.sheenColor.value=en(e.sheenColor),t>0&&(this.defines.CLEARCOAT=1),n>0&&(this.defines.SHEEN=1)}get clearcoat(){return this.uniforms.clearcoat.value}set clearcoat(e){e>0!=!!this.defines.CLEARCOAT&&this.setDefine(`CLEARCOAT`,+(e>0)),this.uniforms.clearcoat.value=e}get clearcoatRoughness(){return this.uniforms.clearcoatRoughness.value}set clearcoatRoughness(e){this.uniforms.clearcoatRoughness.value=e}get specularIntensity(){return this.uniforms.specularIntensity.value}set specularIntensity(e){this.uniforms.specularIntensity.value=e}get sheen(){return this.uniforms.sheen.value}set sheen(e){e>0!=!!this.defines.SHEEN&&this.setDefine(`SHEEN`,+(e>0)),this.uniforms.sheen.value=e}get sheenColor(){return this.uniforms.sheenColor.value}get sheenRoughness(){return this.uniforms.sheenRoughness.value}set sheenRoughness(e){this.uniforms.sheenRoughness.value=e}get ior(){return this.uniforms.ior.value}set ior(e){this.uniforms.ior.value=e}_prelude(){return super._prelude()+`	s.clearcoat = mat.clearcoat;
	s.clearcoatRoughness = mat.clearcoatRoughness;
	s.specularIntensity = mat.specularIntensity;
	s.sheenColor = mat.sheenColor * mat.sheen;
	s.sheenRoughness = mat.sheenRoughness;
	s.ior = mat.ior;
`}};function en(e){return e&&e.isColor?e.clone():new I().set(e)}var tn=new m({name:`boatSurfaceGradient`,code:`
// Mikkelsen surface-gradient bump mapping from a procedural height in meters.
// (TSL worked in view space with faceDirection; here P / N are world space and N already faces
// the viewer on double-sided materials, so faceDirection is folded into N.)
fn boatBumpNormal( P: vec3f, N: vec3f, height: f32 ) -> vec3f {
	let dPdx = dpdx( P );
	let dPdy = dpdy( P );
	let n = N;
	let r1 = cross( dPdy, n );
	let r2 = cross( n, dPdx );
	let det = dot( dPdx, r1 );
	let grad = sign( det ) * ( dpdx( height ) * r1 + dpdy( height ) * r2 );
	return normalize( abs( det ) * n - grad + n * 1e-12 );
}
`}),nn=`
      let data = in.vs.vSurface;
      // Tag1 is teak decking; tag2 is solid furniture wood. Both reuse the
      // original grain/gradient path, while only the deck has caulk seams.
      let isTimber = data.z > .5 && data.z < 2.5;
      // Existing upholstery vertices carry .8 roughness and no metal. Classify
      // them here so the finish never changes the geometry's surface data.
      let isCloth = data.x > .7 && data.y < .1 && data.z < .5;
      let isGelcoat = data.y < .1 && !isTimber && !isCloth;
      s.roughness = select(data.x, .25, isGelcoat);
      s.metalness = data.y; s.ao = data.w;
      s.clearcoat = (1.0 - data.y) * select(1.0, 0.0, isTimber || isCloth || data.y > .5);
      s.clearcoatRoughness = .1;
      if (isCloth) { s.roughness = .88; }
      if (isTimber) {
        let p = in.vs.vLocal;
        let plank = p.x / .105;
        let seam = select(1.0, smoothstep(.025, .045 + fwidth(plank), min(fract(plank), 1.0 - fract(plank))), data.z < 1.5);
        let grain = .96 + .035 * sin(p.z * 37.0 + sin(p.x * 310.0) * 1.2);
        s.albedo *= mix(.38, grain, seam);
        s.clearcoat = 0.0;
        // Reuse Tidewater's meter-scaled surface gradient with the existing
        // grain. Fade both relief frequencies before they become sub-pixel.
        let grainFootprint = (fwidth(p.z * 37.0) + 1.2 * fwidth(p.x * 310.0)) / 6.28318530718;
        let grainFade = 1.0 - smoothstep(.2, .5, grainFootprint);
        let seamFade = 1.0 - smoothstep(.2, .5, fwidth(plank));
        let height = (grain - .96) / .035 * .0002 * grainFade - (1.0 - seam) * .0012 * seamFade;
        s.normal = boatBumpNormal(in.P, in.N, height);
      }
      let wet = 1.0 - smoothstep(-.08, .28, in.P.y);
      if (data.z > 2.5) {
        let antifoul = 1.0 - smoothstep(-.02, .04, in.vs.vLocal.y);
        s.albedo = mix(s.albedo, vec3f(.018, .028, .030), antifoul);
      }
      s.roughness = mix(s.roughness, .15, wet * .5);
      s.albedo *= 1.0 - wet * .14;
    `;function rn({style:e=`tidewater`}={}){if(![`tidewater`,`legacy`].includes(e))throw RangeError(`Yacht finish must be tidewater or legacy`);let t=e===`tidewater`,n=new $t({name:`Azimut exterior batched gelcoat teak steel`,vertexColors:!0,clearcoat:t?1:.65,clearcoatRoughness:t?.1:.15,attributes:{aSurface:`vec4f`},varyings:{vSurface:`vec4f`,vLocal:`vec3f`},vertex:`o.vSurface = v.aSurface; o.vLocal = v.position;`,modules:t?[tn]:[],surface:t?nn:`
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
    `});t&&(n.defines.AZIMUT_TOP_BOUNCE=1);let r=new $t({name:`Azimut sealed reflective exterior glazing`,vertexColors:!0,roughness:t?.05:.1,metalness:t?0:.02,envMapIntensity:t?1:.06,clearcoat:.65,clearcoatRoughness:.055,specularIntensity:1,ior:1.5,attributes:{aSurface:`vec4f`},varyings:{vSurface:`vec4f`},vertex:`o.vSurface = v.aSurface;`,surface:t?`s.roughness = .05; s.ao = in.vs.vSurface.w; s.clearcoat = 1.0; s.clearcoatRoughness = .055;`:`s.roughness = in.vs.vSurface.x; s.ao = in.vs.vSurface.w; s.clearcoat = 1.0; s.clearcoatRoughness = .055;`}),i=new $t({name:`Trideck transparent exterior glass guards`,color:t?11124420:15135732,roughness:t?.05:.085,transparent:!0,opacity:.14,depthWrite:!0,side:`front`,clearcoat:.65,clearcoatRoughness:.07,envMapIntensity:t?1:.45,ior:1.5,surface:`s.alpha = .12 + .20 * pow(1.0 - abs(dot(in.N, in.V)), 5.0);`});return n.skipVertexUV=!0,r.skipVertexUV=!0,i.skipVertexUV=!0,{material:n,glass:r,balustrade:i}}var an=Object.freeze([`gelcoat`,`hull`,`metal`,`deckWood`,`furnitureWood`,`cloth`,`fallback`]);function on(e,t,n,r){return!Number.isFinite(e)||!Number.isFinite(t)||!Number.isFinite(n)||!Number.isFinite(r)||e<0||e>1||t<0||t>1||r<0||r>1?`fallback`:n>.5&&n<1.5?`deckWood`:n>=1.5&&n<2.5?`furnitureWood`:e>.7&&t<.1&&n<.5?`cloth`:t>.5?`metal`:t===0?n>2.5?`hull`:`gelcoat`:`fallback`}function sn(e,{style:t=`tidewater`}={}){let n=e?.index,r=e?.attributes?.position,i=n?.count??r?.count??0;if(!Number.isInteger(i)||i<0||i%3!=0)throw TypeError(`Yacht specialization requires complete triangle primitives`);let a={...e?.attributes},o=Object.fromEntries(an.map(e=>[e,0])),s=Object.fromEntries(an.map(e=>[e,0])),c=[],l=(e,t,n)=>{if(!t)return;let r=c.at(-1);r?.kind===n&&r.start+r.count===e?r.count+=t:(c.push({start:e,count:t,kind:n,materialIndex:an.indexOf(n)}),s[n]++),o[n]+=t/3},u=t=>({geometry:e,attributes:a,index:n,groups:c,stats:{triangles:i/3,groups:c.length,triangleCounts:o,groupCounts:s,mixedSurfaceTriangles:d,specializedTriangles:i/3-o.fallback,originalIndexOrder:!0,originalAttributes:!0,extraVertexBytes:0,extraIndexBytes:0,requiresOriginalSortKey:!0,requiresSharedNormalModule:!0,fallbackReason:t}}),d=0,f=e?.attributes?.aSurface,p=null;if(t===`tidewater`?!f||!(f.array instanceof Float32Array)||f.isInterleavedBufferAttribute||f.normalized||f.itemSize!==4||f.count!==r?.count?p=`Unknown surface attribute layout`:n&&(n.itemSize!==1||n.normalized||n.isInterleavedBufferAttribute||!(n.array instanceof Uint16Array||n.array instanceof Uint32Array))&&(p=`Unknown primitive index layout`):p=`Only the authored Tidewater finish classification is specialized`,p)return l(0,i,`fallback`),u(p);let m=f.array,h=new Uint32Array(m.buffer,m.byteOffset,m.length),g=n?.array;for(let e=0;e<i;e+=3){let t=g?g[e]:e,n=g?g[e+1]:e+1,r=g?g[e+2]:e+2;if(t>=f.count||n>=f.count||r>=f.count)throw RangeError(`Yacht specialization index exceeds its unchanged vertex stream`);let i=!0;for(let e=0;e<4;e++)if(h[t*4+e]!==h[n*4+e]||h[t*4+e]!==h[r*4+e]){i=!1;break}if(!i){d++,l(e,3,`fallback`);continue}let a=t*4;l(e,3,on(m[a],m[a+1],m[a+2],m[a+3]))}return u(null)}function cn(e,{maxSpecializedRanges:t=4,maxGroups:n=16,minTriangles:r=256}={}){if(!Array.isArray(e?.groups)||!e.stats)throw TypeError(`Specialization range selection needs a source plan`);if(!Number.isInteger(t)||t<0||!Number.isInteger(n)||n<1||!Number.isInteger(r)||r<1)throw RangeError(`Specialization range budgets must be finite nonnegative integers`);let i=e.groups.filter(e=>e.kind!==`fallback`&&e.count>=r*3).sort((e,t)=>t.count-e.count||e.start-t.start).slice(0,t),a=new Set(i),o=()=>{let t=[];for(let n of e.groups){let e=a.has(n)?n.kind:`fallback`,r=t.at(-1);r?.kind===e&&r.start+r.count===n.start?r.count+=n.count:t.push({start:n.start,count:n.count,kind:e,materialIndex:an.indexOf(e)})}return t},s=o();for(;s.length>n&&i.length;)a.delete(i.pop()),s=o();let c=Object.fromEntries(an.map(e=>[e,0])),l=Object.fromEntries(an.map(e=>[e,0]));for(let e of s)c[e.kind]+=e.count/3,l[e.kind]++;return{...e,groups:s,stats:{...e.stats,groups:s.length,triangleCounts:c,groupCounts:l,specializedTriangles:e.stats.triangles-c.fallback,sourceGroups:e.groups.length,selectedSourceRanges:a.size,maxSpecializedRanges:t,maxGroups:n,minTriangles:r}}}var ln=new Set([`metal`,`deckWood`,`furnitureWood`,`cloth`]),un=new Set([`gelcoat`,`hull`]),dn=[`lit`,`visible`,`velocityWeight`,`skipVertexUV`,`lightingHooks`,`vertex`,`output`,`shadow`,`modules`,`attributes`,`varyings`,`bindings`,`uniformBlock`,`uniforms`,`yachtExactFinishPalette`],fn=new WeakMap;function pn(e,t=null){if(!an.includes(e)||e===`fallback`)throw RangeError(`Unknown Azimut specialized finish`);let n=e===`deckWood`||e===`furnitureWood`,r=nn.replace(`let isTimber = data.z > .5 && data.z < 2.5;`,`let isTimber = ${n};`).replace(`let isCloth = data.x > .7 && data.y < .1 && data.z < .5;`,`let isCloth = ${e===`cloth`};`).replace(`let isGelcoat = data.y < .1 && !isTimber && !isCloth;`,`let isGelcoat = ${un.has(e)};`);if(ln.has(e)&&(r=r.replace(`s.clearcoat = (1.0 - data.y) * select(1.0, 0.0, isTimber || isCloth || data.y > .5);`,`s.clearcoat = 0.0;`)),e!==`metal`&&(r=r.replace(`if (data.z > 2.5) {`,`if (${e===`hull`}) {`)),n&&(r=r.replace(`data.z < 1.5);`,`${e===`deckWood`});`)),t){if(t.length!==4||on(...t)!==e)throw TypeError(`Constant surface does not match its certified specialization`);r=r.replace(`let data = in.vs.vSurface;`,`let data = vec4f(${Array.from(t,e=>Object.is(e,-0)?`-0.0`:/[.e]/i.test(String(e))?String(e):`${e}.0`).join(`, `)});`)}return r}function mn(e,t,n=null){if(t===`fallback`)return e;if(!e?.isMeshPhysicalMaterial||e._surface!==nn||e.transparent)throw TypeError(`Specialization requires the unchanged authored opaque Tidewater exterior finish`);let r=e.clone();return delete r.__pkFrame,delete r.__pk,r.name=`${e.name} · main ${t}`,r._surface=pn(t,n),r.userData={...e.userData,azimutMainSpecialization:t},r.uniformBlock=e.uniformBlock,r.uniforms=e.uniforms,r.modules=e.modules,r.bindings=e.bindings,r.yachtExactFinishPalette=e.yachtExactFinishPalette,ln.has(t)&&r.setDefine(`CLEARCOAT`,0),r.needsUpdate=!0,r}function hn(e,t,n){let r=e.attributes.aSurface.array,i=new Uint32Array(r.buffer,r.byteOffset,r.length),a=e.index?.array,o=(a?a[t]:t)*4;for(let e=t;e<t+n;e++){let t=(a?a[e]:e)*4;for(let e=0;e<4;e++)if(i[o+e]!==i[t+e])return null}return Array.from(r.subarray(o,o+4))}function gn(e){return{geometry:e,index:e.index,indexArray:e.index?.array,indexVersion:e.index?.version,attributesVersion:e.attributesVersion,groups:e.groups,groupCount:e.groups?.length,start:e.drawRange?.start,count:e.drawRange?.count,attributes:Object.entries(e.attributes).map(([e,t])=>[e,t,t.array,t.version,t.count,t.itemSize,t.normalized,t.gpuBuffer])}}function _n(e,t){let n=e.geometry;return n!==t.geometry||n.index!==t.index||n.index?.array!==t.indexArray||n.index?.version!==t.indexVersion||n.attributesVersion!==t.attributesVersion||n.groups!==t.groups||n.groups?.length!==t.groupCount||n.drawRange?.start!==t.start||n.drawRange?.count!==t.count||Object.keys(n.attributes).length!==t.attributes.length?!1:t.attributes.every(([e,t,r,i,a,o,s,c])=>n.attributes[e]===t&&t.array===r&&t.version===i&&t.count===a&&t.itemSize===o&&t.normalized===s&&t.gpuBuffer===c)}function vn(e){return{key:e.pipelineKey(),surface:e.surface,fields:dn.map(t=>[t,e[t]]),modules:e.modules.map(e=>e.id),defines:JSON.stringify(e.allDefines()),attributes:JSON.stringify(e.attributes),varyings:JSON.stringify(e.varyings),bindings:Object.entries(e.bindings)}}function yn(e,t){return e.pipelineKey()===t.key&&e.surface===t.surface&&t.fields.every(([t,n])=>e[t]===n)&&e.modules.length===t.modules.length&&e.modules.every((e,n)=>e.id===t.modules[n])&&JSON.stringify(e.allDefines())===t.defines&&JSON.stringify(e.attributes)===t.attributes&&JSON.stringify(e.varyings)===t.varyings&&Object.keys(e.bindings).length===t.bindings.length&&t.bindings.every(([t,n])=>e.bindings[t]===n)}function bn(e,{maxSpecializedRanges:t=4,maxGroups:n=8,minTriangles:r=256}={}){if(fn.has(e))return fn.get(e);let i=[],a={meshes:0,originalMainDraws:0,specializedMainDraws:0,selectedSourceRanges:0,triangles:0,specializedTriangles:0,extraVertexBytes:0,extraIndexBytes:0,extraUniformBytes:0,mainOnly:!0,originalPrimitiveOrder:!0,constantFinishRanges:0,disposed:!1,ranges:[]};if(e?.userData?.exteriorOnly!==!0||e.userData.geometryRevision!==4||!e.traverse)return{stats:a,dispose(){}};e.traverse(e=>{if(!e.isMesh)return;a.originalMainDraws++,a.specializedMainDraws++;let o=e.material,s=e.geometry;if(e.name!==`Merged exterior`||e.isInstancedMesh||e.isSkinnedMesh||Array.isArray(o)||o?.transparent||!o?.lit||o._surface!==nn||e.mainPassMaterialGroups||s?.indirect||s?.groups?.length||s?.drawRange?.start!==0||s.drawRange.count!==1/0&&s.drawRange.count!==(s.index?.count??s.attributes?.position?.count))return;let c=cn(sn(s),{maxSpecializedRanges:t,maxGroups:n,minTriangles:r});if(!c.stats.selectedSourceRanges)return;let l=new Map([[`fallback`,o]]),u=0,d=c.groups.map(({start:e,count:t,kind:n})=>{if(n===`fallback`)return{start:e,count:t,material:o};let r=hn(s,e,t);r&&u++;let i=`${n}:${r?new Uint32Array(new Float32Array(r).buffer).join(`,`):`varying`}`;return l.has(i)||l.set(i,mn(o,n,r)),{start:e,count:t,material:l.get(i)}}),f=gn(s),p=vn(o),m=!1,h={groups:d,originalMaterial:o,validFor(t){return!m&&t===e&&t.material===o&&!t.isInstancedMesh&&!t.isSkinnedMesh&&!t.geometry.indirect&&_n(t,f)&&yn(o,p)},stats:{...c.stats,groups:d.length,materialClones:l.size-1,constantFinishRanges:u,extraUniformBytes:0,mainOnly:!0,originalMaterialIdentity:!0}};e.mainPassMaterialGroups=h,a.meshes++,a.specializedMainDraws+=d.length-1,a.selectedSourceRanges+=c.stats.selectedSourceRanges,a.constantFinishRanges+=u,a.triangles+=c.stats.triangles,a.specializedTriangles+=c.stats.specializedTriangles,a.ranges.push(...c.groups.map(({start:t,count:n,kind:r})=>({mesh:e.name,start:t,count:n,kind:r})));let g=()=>{if(!m){m=!0,e.mainPassMaterialGroups===h&&delete e.mainPassMaterialGroups;for(let[e,t]of l)e!==`fallback`&&t.dispose()}};o.addEventListener(`dispose`,g),i.push(g)});let o={stats:a,dispose(){for(let e of i)e();a.disposed=!0,e.azimutMainSpecialization===o&&delete e.azimutMainSpecialization,fn.get(e)===o&&fn.delete(e)}};return e.azimutMainSpecialization=o,fn.set(e,o),o}var xn=[1,1],Sn=e=>Array.isArray(e)||ArrayBuffer.isView(e)?e.length===4?Array.from(e):null:e&&[`x`,`y`,`z`,`w`].every(t=>Number.isFinite(e[t]))?[e.x,e.y,e.z,e.w]:null,Cn=(e,t)=>Math.max(0,Math.min(t,e)),wn=class{constructor({enabled:e=!1,halo:t=4,directObjectLoads:n=!1,prefixOnly:i=!1}={}){if(!Number.isFinite(t)||t<4)throw RangeError(`Object crop requires at least four source pixels of halo`);this.enabled=!!e,this.halo=Math.ceil(t),this.directObjectLoads=!!n,this.prefixOnly=!!i,this.uniforms=new r(`WaterObjectCrop`,{origin:[`vec2f`,new Float32Array([0,0])],size:[`vec2f`,new Float32Array(xn)],sourceSize:[`vec2f`,new Float32Array(xn)],cropEnabled:[`u32`,0]},{label:`Full-source object crop coordinates`}),this.module=new m({name:`waterObjectCrop`,uniforms:this.uniforms,uniformName:`waterObjectCrop`,code:``}),this.compositorCode=En({directLoads:this.directObjectLoads}),this.crop={origin:[0,0],size:[...xn],sourceSize:[...xn],sourceRect:[0,0,...xn],active:!1,prefixOnly:this.prefixOnly},this.stats={enabled:this.enabled,active:!1,halo:this.halo,configurations:0,revisions:0,uniformBytes:this.uniforms.byteLength,sourcePixels:1,physicalPixels:1,physicalFraction:1,origin:[0,0],size:[...xn],sourceSize:[...xn],retainedEnvelope:!1,fallbackReason:`Not configured`,exactPixelIdentityClaimed:!1,directObjectLoads:this.directObjectLoads,prefixOnly:this.prefixOnly},this._retained=null}configure(e,t,n,{certified:r=!1,enabled:i=this.enabled,prefixOnly:a=this.prefixOnly}={}){if(![t,n].every(e=>Number.isInteger(e)&&e>0&&e<=2**24))throw RangeError(`Object crop needs positive, exactly representable source dimensions`);let o=[t,n];a=!!a,(o.some((e,t)=>e!==this.crop.sourceSize[t])||a!==this.crop.prefixOnly)&&(this._retained=null);let s=Sn(e),c=[0,0,t,n],l=null;i?r===!0?!s||!s.every(Number.isFinite)||s[2]<=0||s[3]<=0?l=`Unknown or invalid foreground bounds`:(c=[Cn(Math.floor((s[0]-this.halo)/2)*2,t),Cn(Math.floor((s[1]-this.halo)/2)*2,n),Cn(Math.ceil((s[0]+s[2]+this.halo)/2)*2,t),Cn(Math.ceil((s[1]+s[3]+this.halo)/2)*2,n)],c[0]>=c[2]||c[1]>=c[3]?(c=[0,0,t,n],l=`Empty foreground bounds`):(a&&(c[0]=0,c[1]=0),this._retained&&(c=[Math.min(c[0],this._retained[0]),Math.min(c[1],this._retained[1]),Math.max(c[2],this._retained[2]),Math.max(c[3],this._retained[3])]),this._retained=c.slice())):l=`Uncertified foreground bounds`:l=`Disabled`;let u=c.slice(0,2),d=[c[2]-c[0],c[3]-c[1]],f=!(!i||l||!u[0]&&!u[1]&&d[0]===t&&d[1]===n);!f&&!l&&(l=`Certified bounds cover full source`);let p={origin:u,size:d,sourceSize:o,sourceRect:[...u,...d],active:f,prefixOnly:a};return JSON.stringify(p)!==JSON.stringify(this.crop)&&this.stats.revisions++,this.crop=p,this.uniforms.fields.origin.value.set(u),this.uniforms.fields.size.value.set(d),this.uniforms.fields.sourceSize.value.set(o),this.uniforms.set(`cropEnabled`,+!!f),Object.assign(this.stats,{enabled:!!i,active:f,prefixOnly:a,configurations:this.stats.configurations+1,sourcePixels:t*n,physicalPixels:d[0]*d[1],physicalFraction:d[0]*d[1]/(t*n),origin:u.slice(),size:d.slice(),sourceSize:o.slice(),sourceRect:p.sourceRect.slice(),retainedEnvelope:!!this._retained,fallbackReason:l}),this.getCrop()}configureForegroundRect(e,t,n,r={}){let i=Sn(e);return this.configure(i?[i[0]*t,i[1]*n,(i[2]-i[0])*t,(i[3]-i[1])*n]:null,t,n,r)}containsSourceReadRect(e,{padding:t=1}={}){let n=Sn(e);if(!this.stats.configurations||!n||!n.every(Number.isFinite)||n[2]<=0||n[3]<=0||!Number.isFinite(t)||t<0)return!1;let r=[0,1].map(e=>Cn(Math.floor(n[e]-t),this.crop.sourceSize[e]-1)),i=[0,1].map(e=>Cn(Math.floor(n[e]+n[e+2]+t),this.crop.sourceSize[e]-1));return r.every((e,t)=>e>=this.crop.origin[t])&&i.every((e,t)=>e<this.crop.origin[t]+this.crop.size[t])}get origin(){return this.crop.origin}get size(){return this.crop.size}get sourceRect(){return this.crop.sourceRect}getCrop(){return{origin:this.crop.origin.slice(),size:this.crop.size.slice(),sourceSize:this.crop.sourceSize.slice(),sourceRect:this.crop.sourceRect.slice(),active:this.crop.active,prefixOnly:this.crop.prefixOnly}}reset(){this._retained=null}dispose(){this.uniforms.buffer?.destroy(),this.uniforms.buffer=null,this._retained=null}},Tn=e=>{if(typeof e!=`string`||!/^[A-Za-z_]\w*$/.test(e))throw TypeError(`Object crop shader names must be WGSL identifiers`);return e};function En({color:e=`objectColor`,motion:t=`objectMotion`,depth:n=`objectDepth`,sampler:r=`smpLinearClamp`,prefix:i=`waterObject`,directLoads:a=!1}={}){[e,t,n,r,i].forEach(Tn);let o=(e,t,n,r,a=!1)=>a?`
fn ${i}${e}Load(pixel:vec2i) -> ${n} {
  return textureLoad(${t}, pixel - vec2i(waterObjectCrop.origin), 0);
}
`:`
fn ${i}${e}Load(pixel:vec2i) -> ${n} {
  let sourceSize = vec2i(waterObjectCrop.sourceSize);
  if(any(pixel < vec2i(0)) || any(pixel >= sourceSize)) { return ${r}; }
  let local = pixel - vec2i(waterObjectCrop.origin);
  if(any(local < vec2i(0)) || any(local >= vec2i(waterObjectCrop.size))) { return ${r}; }
  return textureLoad(${t}, local, 0);
}
`,s=(e,t)=>`
fn ${i}${e}Sample(uv:vec2f) -> vec4f {
  if(waterObjectCrop.cropEnabled == 0u) { return textureSampleLevel(${t}, ${r}, uv, 0.0); }
  let sourceSize = vec2i(waterObjectCrop.sourceSize);
  let coordinate = uv * waterObjectCrop.sourceSize - .5;
  let base = vec2i(floor(coordinate));
  let low = clamp(base, vec2i(0), sourceSize - 1);
  let high = clamp(base + 1, vec2i(0), sourceSize - 1);
  let origin = vec2i(waterObjectCrop.origin);
  let end = origin + vec2i(waterObjectCrop.size);
  if(all(low >= origin) && all(high < end)) {
    let localUV = (uv * waterObjectCrop.sourceSize - waterObjectCrop.origin) / waterObjectCrop.size;
    return textureSampleLevel(${t}, ${r}, localUV, 0.0);
  }
  if(any(high < origin) || any(low >= end)) { return vec4f(0.0); }
  let weight = fract(coordinate);
  let c00 = ${i}${e}${a?`Sample`:``}Load(low);
  let c10 = ${i}${e}${a?`Sample`:``}Load(vec2i(high.x, low.y));
  let c01 = ${i}${e}${a?`Sample`:``}Load(vec2i(low.x, high.y));
  let c11 = ${i}${e}${a?`Sample`:``}Load(high);
  return mix(mix(c00, c10, weight.x), mix(c01, c11, weight.x), weight.y);
}
`;return`fn ${i}SourceSize() -> vec2f { return waterObjectCrop.sourceSize; }
${o(`Color`,e,`vec4f`,`vec4f(0.0)`,a)}
${o(`Motion`,t,`vec4f`,`vec4f(0.0)`,a)}
${o(`Depth`,n,`f32`,`0.0`,a)}
${a?o(`ColorSample`,e,`vec4f`,`vec4f(0.0)`)+o(`MotionSample`,t,`vec4f`,`vec4f(0.0)`):``}
${s(`Color`,e)}
${s(`Motion`,t)}`}var Dn=256,On=4096,kn=2**-23,An=new Float32Array(1),jn=new Uint32Array(An.buffer),Mn=new Set([`Merged exterior`,`Merged glazing`,`Glass balustrades`]),Nn=e=>(e||``).replace(/\/\*[\s\S]*?\*\//g,``).replace(/\/\/[^\n]*/g,``).trim();function Pn(e){for(let t of Nn(e.vertex).split(`;`).filter(e=>e.trim())){let n=t.match(/^\s*o\.([a-zA-Z_]\w*)\s*=\s*v\.[a-zA-Z_]\w*(?:\.[xyzwrgba]+)?\s*$/);if(!n||!Object.hasOwn(e.varyings||{},n[1]))return!1}return!0}function Fn(e,{start:t=null,count:n=null}={}){let r=e?.geometry,i=r?.attributes?.position,a=e?.material;if(!r||!i||!a||Array.isArray(a)||!Pn(a)||e.isInstancedMesh||e.isSkinnedMesh||e.count!=null&&e.count!==1||r.instanceCount!=null&&r.instanceCount!==1||r.isInstancedBufferGeometry||r.indirect||Object.keys(r.morphAttributes||{}).length||a.wireframe||a.topology!==`triangle-list`||i.itemSize!==3||i.normalized||i.isInterleavedBufferAttribute||i.gpuBuffer||!(i.array instanceof Float32Array)||!Number.isInteger(i.count)||i.count<3||i.array.length!==i.count*3||Object.entries(r.attributes||{}).some(([e,t])=>e.startsWith(`instance`)||t.isInstancedBufferAttribute||t.meshPerAttribute||t.data?.isInstancedInterleavedBuffer))return null;let o=r.index;if(o&&(o.itemSize!==1||o.normalized||o.isInterleavedBufferAttribute||o.gpuBuffer||!(o.array instanceof Uint16Array||o.array instanceof Uint32Array)||o.count!==o.array.length))return null;let s=o?o.count:i.count,c=t??r.drawRange?.start??0,l=n??r.drawRange?.count??s,u=Math.min(l,s-c);return!Number.isInteger(c)||c<0||c%3||!Number.isInteger(u)||u<3||u%3||c+u>s||u/3>Dn*65535?null:{geometry:r,position:i,index:o,start:c,count:u,triangles:u/3}}var In=`
struct TriangleCullParams {
	model:mat4x4f,
	viewProj:mat4x4f,
	raster:vec4f, // source width/height, subpixel guard, maximum pixel error
	counts:vec4u, // triangles, groups, source first index, optional edge proof
};
@group(0) @binding(0) var<uniform> params:TriangleCullParams;
`,Ln=In+`
@group(0) @binding(1) var<storage,read> positions:array<vec4f>;
@group(0) @binding(2) var<storage,read> indices:array<u32>;
@group(0) @binding(3) var<storage,read_write> keepPrefix:array<vec2u>;
@group(0) @binding(4) var<storage,read_write> blockCounts:array<u32>;
var<workgroup> scan:array<u32,256>;

struct PixelInterval { low:vec2f, high:vec2f, safe:bool };
fn absoluteProduct( matrix:mat4x4f, value:vec4f ) -> vec4f {
	return abs(matrix[0])*abs(value.x)+abs(matrix[1])*abs(value.y)
		+abs(matrix[2])*abs(value.z)+abs(matrix[3])*abs(value.w);
}
fn projectedInterval( local:vec4f ) -> PixelInterval {
	let epsilon=0.00000011920928955078125;
	let world=(params.model*local).xyz;
	let worldError=16.0*epsilon*absoluteProduct(params.model,local).xyz+vec3f(1e-30);
	let clip=params.viewProj*vec4f(world,1.0);
	let propagated=absoluteProduct(params.viewProj,vec4f(worldError,0.0));
	let error=16.0*epsilon*absoluteProduct(params.viewProj,vec4f(world,1.0))
		+(1.0+16.0*epsilon)*propagated+vec4f(1e-30);
	// Do not try to prove clipped/near-plane/nonfinite triangles empty.
	if(!(all(abs(clip)<vec4f(1e20))&&all(error<vec4f(1e20)))
		||!(clip.w-error.w>0.00001)||!(clip.z-error.z>0.0)
		||!(clip.w-clip.z-error.w-error.z>0.0)) {
		return PixelInterval(vec2f(0.0),vec2f(0.0),false);
	}
	let ndc=clip.xy/clip.w;
	let ratioError=(error.xy+abs(ndc)*error.w)/(clip.w-error.w);
	let pixel=(ndc*vec2f(.5,-.5)+.5)*params.raster.xy;
	let pixelError=.5*params.raster.xy*ratioError
		+16.0*epsilon*max(params.raster.xy,abs(pixel))+vec2f(1e-30);
	if(!(all(abs(pixel)<vec2f(1e7))&&all(pixelError<=vec2f(params.raster.w)))) {
		return PixelInterval(vec2f(0.0),vec2f(0.0),false);
	}
	let margin=pixelError+vec2f(params.raster.z);
	return PixelInterval(pixel-margin,pixel+margin,true);
}
fn keepTriangle(triangle:u32) -> u32 {
	let first=params.counts.z+triangle*3u;
	let a=projectedInterval(positions[indices[first]]);
	let b=projectedInterval(positions[indices[first+1u]]);
	let c=projectedInterval(positions[indices[first+2u]]);
	if(!(a.safe&&b.safe&&c.safe)) { return 1u; }
	let low=max(vec2f(0.0),min(a.low,min(b.low,c.low)));
	let high=min(params.raster.xy, max(a.high,max(b.high,c.high)));
	// Integer source pixel centres lie at n+.5. Outward guards also cover
	// fixed-point viewport snapping and compute/VS arithmetic differences.
	let firstCenter=ceil(low-.5);
	let lastCenter=floor(high-.5);
	return select(1u,0u,any(firstCenter>lastCenter));
}
@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid:vec3u,
	@builtin(local_invocation_index) local:u32,@builtin(workgroup_id) group:vec3u) {
	var keep=0u;
	if(gid.x<params.counts.x) { keep=keepTriangle(gid.x); }
	scan[local]=keep;
	workgroupBarrier();
	for(var offset=1u;offset<256u;offset*=2u) {
		var value=scan[local];
		if(local>=offset) { value+=scan[local-offset]; }
		workgroupBarrier();
		scan[local]=value;
		workgroupBarrier();
	}
	if(gid.x<params.counts.x) { keepPrefix[gid.x]=vec2u(keep,scan[local]-keep); }
	if(local==255u) { blockCounts[group.x]=scan[local]; }
}
`,Rn=In+`
@group(0) @binding(1) var<storage,read> indices:array<u32>;
@group(0) @binding(2) var<storage,read> keepPrefix:array<vec2u>;
@group(0) @binding(3) var<storage,read> blockCounts:array<u32>;
@group(0) @binding(4) var<storage,read_write> outputIndices:array<u32>;
@group(0) @binding(5) var<storage,read_write> indirect:array<u32>;
var<workgroup> blockStart:u32;
@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid:vec3u,
	@builtin(local_invocation_index) local:u32,@builtin(workgroup_id) group:vec3u) {
	if(local==0u) {
		var prefix=0u;
		for(var block=0u;block<group.x;block++) { prefix+=blockCounts[block]; }
		blockStart=prefix;
		if(group.x==0u) {
			var total=0u;
			for(var block=0u;block<params.counts.y;block++) { total+=blockCounts[block]; }
			indirect[0]=total*3u;indirect[1]=1u;indirect[2]=0u;
			indirect[3]=0u;indirect[4]=0u;
		}
	}
	workgroupBarrier();
	if(gid.x>=params.counts.x) { return; }
	let decision=keepPrefix[gid.x];
	if(decision.x==0u) { return; }
	let output=(blockStart+decision.y)*3u;
	let input=params.counts.z+gid.x*3u;
	outputIndices[output]=indices[input];
	outputIndices[output+1u]=indices[input+1u];
	outputIndices[output+2u]=indices[input+2u];
}
`;function zn(e,t,n,r=new Float32Array(4)){let i=Hn(t),a=Hn(n);if(!e||e.length!==3||!Array.from(e).every(e=>Number.isFinite(e)&&e>=0)||!i||!a||!(r instanceof Float32Array)||r.length!==4)throw TypeError(`Yacht clip error needs finite position bounds and two Float32 matrices`);let o=[0,1,2].map(t=>Math.abs(i[t+12])+Math.abs(i[t])*e[0]+Math.abs(i[t+4])*e[1]+Math.abs(i[t+8])*e[2]),s=o.map(e=>16*kn*e+1e-30),c=o.map(e=>(1+16*kn)*e+1e-30);for(let e=0;e<4;e++){let t=Math.abs(a[e+12]),n=0;for(let r=0;r<3;r++){let i=Math.abs(a[e+r*4]);t+=i*c[r],n+=i*s[r]}let i=16*kn*t+(1+16*kn)*n+1e-30;if(An[0]=i,!Number.isFinite(An[0]))throw RangeError(`Yacht clip error bound overflowed Float32`);An[0]<i&&jn[0]++,jn[0]++,r[e]=An[0]}return r}function Bn(e,t,n,r=new Float32Array(16),i=new Float32Array(4)){let a=Hn(t),o=Hn(n);if(!e||e.length!==3||!Array.from(e).every(e=>Number.isFinite(e)&&e>=0)||!a||!o||!(r instanceof Float32Array)||r.length!==16||!(i instanceof Float32Array)||i.length!==4)throw TypeError(`Yacht precombined classifier needs bounded positions and Float32 destinations`);let s=[...e,1],c=new Float64Array(16),l=new Float64Array(16);for(let e=0;e<4;e++)for(let t=0;t<4;t++){let n=e===3?o[t+12]:0,i=Math.abs(n);for(let r=0;r<3;r++){let s=o[t+r*4]*a[r+e*4];n+=s,i+=Math.abs(s)}let s=t+e*4;if(c[s]=n,l[s]=i,r[s]=n,!Number.isFinite(r[s]))throw RangeError(`Yacht precombined transform overflowed Float32`)}let u=[0,1,2].map(e=>Math.abs(a[e+12])+Math.abs(a[e])*s[0]+Math.abs(a[e+4])*s[1]+Math.abs(a[e+8])*s[2]),d=u.map(e=>16*kn*e+1e-30);for(let e=0;e<4;e++){let t=Math.abs(o[e+12]),n=0,a=0,f=0;for(let r=0;r<3;r++){let i=Math.abs(o[e+r*4]);t+=i*(u[r]+d[r]),n+=i*d[r]}for(let t=0;t<4;t++){let n=e+t*4;a+=Math.abs(r[n])*s[t],f+=(Math.abs(r[n]-c[n])+16*2**-52*l[n])*s[t]}let p=16*kn*t+n+16*kn*a+f+1e-30;if(An[0]=p,!Number.isFinite(An[0]))throw RangeError(`Yacht precombined clip interval overflowed Float32`);An[0]<p&&jn[0]++,jn[0]++,i[e]=An[0]}return{transform:r,error:i}}function Vn({globalClipError:e=!1,precombinedClip:t=!1}={}){if(!e&&!t)return Ln;let n=Ln.replace(`counts:vec4u, // triangles, groups, source first index, optional edge proof`,`counts:vec4u,
	clipError:vec4f,`).replace(`	let worldError=16.0*epsilon*absoluteProduct(params.model,local).xyz+vec3f(1e-30);
`,``).replace(/\tlet propagated=absoluteProduct\(params\.viewProj,vec4f\(worldError,0\.0\)\);\n\tlet error=[\s\S]*?\+vec4f\(1e-30\);/,`	let error=params.clipError;`);return t&&(n=n.replace(`clipError:vec4f,`,`clipError:vec4f,
	clipTransform:mat4x4f,`).replace(`	let world=(params.model*local).xyz;
	let clip=params.viewProj*vec4f(world,1.0);`,`	let clip=params.clipTransform*local;`)),n}function Hn(e){let t=e?.elements||e;if(!t||t.length!==16)return null;let n=Float32Array.from(t);return n.every(e=>Number.isFinite(e)&&Math.abs(e)<0xe8d4a51000)?n:null}var Un=class{constructor({enabled:e=!1,rasterGuard:t=.125,maximumPixelError:n=.125,globalClipError:r=!1,precombinedClip:i=!1}={}){if(!Number.isFinite(t)||t<.125||!Number.isFinite(n)||n<0)throw RangeError(`Triangle culling requires conservative raster and Float32 guards`);this.enabled=!!e,this.rasterGuard=t,this.maximumPixelError=n,this.precombinedClip=!!i,this.globalClipError=!!(r||i),this.sources=new WeakMap,this.draws=new WeakMap,this.resources=new Set,this.stats={prepares:0,dispatches:0,sourceUploads:0,sourceBytes:0,outputBytes:0,candidateTriangles:0,fallback:0,strategy:`stable-empty-source-pixel-triangles`,rasterGuard:t,maximumPixelError:n,globalClipError:this.globalClipError,precombinedClip:this.precombinedClip,workgroupSize:Dn},this.pipelines=null}_ensurePipelines(){if(this.pipelines)return;let e=e=>P.device.createBindGroupLayout({label:`Yacht triangle cull layout`,entries:e.map((e,t)=>({binding:t,visibility:GPUShaderStage.COMPUTE,buffer:{type:e}}))}),t=e([`uniform`,`read-only-storage`,`read-only-storage`,`storage`,`storage`]),n=e([`uniform`,`read-only-storage`,`read-only-storage`,`read-only-storage`,`storage`,`storage`]),r=(e,t,n)=>P.computePipeline({label:e,layout:P.device.createPipelineLayout({bindGroupLayouts:[n]}),compute:{module:P.device.createShaderModule({label:e,code:t}),entryPoint:`main`}});this.pipelines={classifyLayout:t,scatterLayout:n,classify:r(`Yacht empty triangle classify`,Vn(this),t),scatter:r(`Yacht stable triangle scatter`,Rn,n)}}_source(e){let t=this.sources.get(e.geometry),n=e.position,r=e.index;if(t&&t.position===n&&t.positionArray===n.array&&t.positionVersion===n.version&&t.index===r&&t.indexArray===r?.array&&t.indexVersion===r?.version)return t;let i=new Float32Array(n.count*4),a=[0,0,0];for(let e=0;e<n.count;e++){for(let t=0;t<3;t++){let r=n.array[e*3+t];if(!Number.isFinite(r)||Math.abs(r)>1e8)return null;i[e*4+t]=r,a[t]=Math.max(a[t],Math.abs(r))}i[e*4+3]=1}let o=r?Uint32Array.from(r.array):Uint32Array.from({length:n.count},(e,t)=>t);return o.some(e=>e>=n.count)?null:(t={position:n,positionArray:n.array,positionVersion:n.version,maximumPosition:a,index:r,indexArray:r?.array,indexVersion:r?.version,positions:new c({label:`Yacht cull static positions`,count:n.count,type:`vec4f`,data:i}),indices:new c({label:`Yacht cull canonical indices`,count:o.length,type:`u32`,data:o})},this.sources.set(e.geometry,t),this.resources.add(t),this.stats.sourceUploads++,this.stats.sourceBytes+=i.byteLength+o.byteLength,t)}_draw(e,t,n){let i=this.draws.get(e);i||(i=new Map,this.draws.set(e,i));let a=`${t.start}:${t.count}`,o=i.get(a);if(o?.source===n)return o;let s=Math.ceil(t.triangles/Dn),l=new r(`TriangleCullParams`,{model:`mat4x4f`,viewProj:`mat4x4f`,raster:`vec4f`,counts:`vec4u`,...this.globalClipError?{clipError:[`vec4f`,new Float32Array(4)]}:{},...this.precombinedClip?{clipTransform:[`mat4x4f`,new Float32Array(16)]}:{}});return o={source:n,params:l,groups:s,keepPrefix:new c({label:`Yacht triangle stable prefix`,count:t.triangles,type:`vec2u`}),blockCounts:new c({label:`Yacht triangle block counts`,count:s,type:`u32`}),output:new c({label:`Yacht retained triangle indices`,count:t.count,type:`u32`,usage:[`index`]}),indirect:new c({label:`Yacht retained indexed draw`,count:5,type:`u32`,usage:[`indirect`]})},i.set(a,o),this.resources.add(o),this.stats.outputBytes+=o.keepPrefix.byteLength+o.blockCounts.byteLength+o.output.byteLength+o.indirect.byteLength+l.byteLength,o}prepare(e,{model:t=e?.__draw?.cur,viewProj:n,width:r,height:i,start:a=null,count:o=null,sampleCount:s=1}={}){this.stats.prepares++;let c=()=>(this.stats.fallback++,null),l=e?.parent?.userData;if(!this.enabled||!Mn.has(e?.name)||!l?.exteriorOnly||l.geometryRevision!==4||s!==1||![r,i].every(e=>Number.isInteger(e)&&e>0&&e<=On))return c();let u=Fn(e,{start:a,count:o}),d=Hn(t),f=Hn(n);if(!u||!d||!f)return c();let p=this._source(u);if(!p)return c();this._ensurePipelines();let m=this._draw(e,u,p);if(m.frame===P.frame)return m.width===r&&m.height===i&&d.every((e,t)=>e===m.params.fields.model.value[t])&&f.every((e,t)=>e===m.params.fields.viewProj.value[t])?m.result:c();if(m.params.fields.model.value=d,m.params.fields.viewProj.value=f,m.params.fields.raster.value=[r,i,this.rasterGuard,this.maximumPixelError],m.params.fields.counts.value=[u.triangles,m.groups,u.start,0],this.globalClipError)try{this.precombinedClip?Bn(p.maximumPosition,d,f,m.params.fields.clipTransform.value,m.params.fields.clipError.value):zn(p.maximumPosition,d,f,m.params.fields.clipError.value)}catch{return c()}if(m.params.upload(),!m.classifyGroup){let e=(e,t)=>P.device.createBindGroup({layout:e,entries:t.map((e,t)=>({binding:t,resource:{buffer:e.getGPU?e.getGPU():e}}))});m.classifyGroup=e(this.pipelines.classifyLayout,[m.params.buffer,p.positions,p.indices,m.keepPrefix,m.blockCounts]),m.scatterGroup=e(this.pipelines.scatterLayout,[m.params.buffer,p.indices,m.keepPrefix,m.blockCounts,m.output,m.indirect])}return P.computePass(`Yacht empty triangle classify`,e=>{e.setPipeline(P.ready(this.pipelines.classify)),e.setBindGroup(0,m.classifyGroup),e.dispatchWorkgroups(m.groups)}),P.computePass(`Yacht stable triangle scatter`,e=>{e.setPipeline(P.ready(this.pipelines.scatter)),e.setBindGroup(0,m.scatterGroup),e.dispatchWorkgroups(m.groups)}),this.stats.dispatches+=2,this.stats.candidateTriangles=u.triangles,m.frame=P.frame,m.width=r,m.height=i,m.result={indexBuffer:m.output.getGPU(),indirectBuffer:m.indirect.getGPU(),indexFormat:`uint32`,originalTriangles:u.triangles},m.result}dispose(){for(let e of this.resources)e.positions?.destroy(),e.indices?.destroy(),e.keepPrefix?.destroy(),e.blockCounts?.destroy(),e.output?.destroy(),e.indirect?.destroy(),e.params?.buffer?.destroy();this.resources.clear(),this.sources=new WeakMap,this.draws=new WeakMap}},Wn=2**-23,Gn=new Set([`Merged exterior`,`Merged glazing`]),Kn=()=>globalThis.performance?.now()??Date.now(),qn=e=>e?.elements||e;function Jn(e){let t=qn(e);if(!t||t.length!==16)return null;let n=Float32Array.from(t);return n.every(e=>Number.isFinite(e)&&Math.abs(e)<0xe8d4a51000)?n:null}function Yn(e,t,{maxSwapsPerTriangle:n=4,out:r=null}={}){if(e.length!==t.length||!Number.isInteger(n)||n<0||n>256)throw RangeError(`Invalid bounded opaque index ordering`);let i=r||new Uint32Array(e.length);if(!(i instanceof Uint32Array)||i.length!==e.length)throw TypeError(`Triangle order must have one uint32 entry per triangle`);let a=0;for(let r=0;r<i.length;r++){i[r]=r;let o=r,s=n;for(;o>0&&s>0;){let n=i[o-1];if(!(Number.isFinite(e[r])&&Number.isFinite(t[n])&&e[r]>t[n]))break;i[o]=n,i[--o]=r,s--,a++}}let o=0;for(let e=0;e<i.length;e++)i[e]!==e&&o++;return{order:i,swaps:a,movedTriangles:o}}function Xn(e,t,n,r,i,a,o=null){let s=Jn(n),c=Jn(r);if(!(e instanceof Float32Array)||e.length%3||!(t instanceof Uint16Array||t instanceof Uint32Array)||t.length%3||!s||!c||!Number.isFinite(i)||!Number.isFinite(a)||i<1||a<1)return null;let l=e.length/3,u=t.length/3,d=[0,0,0];for(let t=0;t<e.length;t++){let n=e[t];if(!Number.isFinite(n))return null;d[t%3]=Math.max(d[t%3],Math.abs(n))}let f;try{f=zn(d,s,c)}catch{return null}let p=o?.projected?.length===l*5?o.projected:new Float64Array(l*5),m=o?.low?.length===u?o.low:new Float64Array(u),h=o?.high?.length===u?o.high:new Float64Array(u),g=0;for(let t=0;t<l;t++){let n=t*3,r=e[n],o=e[n+1],l=e[n+2],u=s[0]*r+s[4]*o+s[8]*l+s[12],d=s[1]*r+s[5]*o+s[9]*l+s[13],m=s[2]*r+s[6]*o+s[10]*l+s[14],h=c[0]*u+c[4]*d+c[8]*m+c[12],g=c[1]*u+c[5]*d+c[9]*m+c[13],_=c[2]*u+c[6]*d+c[10]*m+c[14],v=c[3]*u+c[7]*d+c[11]*m+c[15],y=t*5;if(p[y+4]=1/0,!(v-f[3]>1e-5&&_-f[2]>0&&v-_-f[3]-f[2]>0))continue;let b=h/v,x=g/v,S=_/v,C=v-f[3],w=(f[2]+Math.abs(S)*f[3])/C+32*Wn*Math.abs(S)+1e-30,T=(b*.5+.5)*i,E=(.5-x*.5)*a,ee=Math.max(.5*i*(f[0]+Math.abs(b)*f[3])/C,.5*a*(f[1]+Math.abs(x)*f[3])/C)+32*Wn*Math.max(i,a,Math.abs(T),Math.abs(E))+1e-30;Number.isFinite(w)&&ee<=.125&&(p[y]=T,p[y+1]=E,p[y+2]=S,p[y+3]=w,p[y+4]=ee)}for(let e=0;e<u;e++){m[e]=NaN,h[e]=NaN;let n=t[e*3]*5,r=t[e*3+1]*5,i=t[e*3+2]*5;if(n>=p.length||r>=p.length||i>=p.length)return null;let a=Math.max(p[n+4],p[r+4],p[i+4]);if(!Number.isFinite(a))continue;let o=p[r]-p[n],s=p[r+1]-p[n+1],c=p[i]-p[n],l=p[i+1]-p[n+1],u=a+.125,d=Math.abs(o*l-s*c)-(2*u*(Math.abs(o)+Math.abs(s)+Math.abs(c)+Math.abs(l))+8*u*u);if(!(d>0))continue;let f=Math.min(p[n+2]-p[n+3],p[r+2]-p[r+3],p[i+2]-p[i+3]),_=Math.max(p[n+2]+p[n+3],p[r+2]+p[r+3],p[i+2]+p[i+3]),v=(_-f)*(Math.abs(o)+Math.abs(c)+Math.abs(s)+Math.abs(l)+8*u)/d*u+32*Wn*Math.max(Math.abs(f),Math.abs(_))+1e-30;Number.isFinite(v)&&(m[e]=f-v,h[e]=_+v,g++)}return{low:m,high:h,projected:p,safeTriangles:g}}function Zn(e){return e&&!e.transparent&&e.blending===`none`&&e.depthWrite&&e.depthTest&&(e.depthCompare===null||e.depthCompare===`greater-equal`)&&e.opacity===1&&!e.alphaTest&&!e.wireframe&&e.topology===`triangle-list`&&!e.depthBias&&!e.depthBiasSlopeScale}var Qn=class{constructor({enabled:e=!1,maxSwapsPerTriangle:t=4}={}){if(!Number.isInteger(t)||t<0||t>256)throw RangeError(`Opaque sort budget must be an integer from 0 to 256`);this.enabled=!!e,this.maxSwapsPerTriangle=t,this.meshes=new WeakMap,this.resources=new Set,this.stats={registeredMeshes:0,prepares:0,sorts:0,sortMs:0,lastSortMs:0,frameSortMs:0,swaps:0,frameSwaps:0,lastSwaps:0,movedTriangles:0,lastMovedTriangles:0,safeTriangles:0,uploads:0,uploadBytes:0,bufferBytes:0,cacheHits:0,fallbacks:0,maxSwapsPerTriangle:t,mainOnly:!0,trianglesRemoved:0},this.frame=-1}register(e){if(!e?.traverse||e.userData?.exteriorOnly!==!0||e.userData.geometryRevision!==4)return 0;let t=0;return e.traverse(e=>{if(!e.isMesh||!Gn.has(e.name)||this.meshes.has(e)||!Zn(e.material))return;let n=Fn(e);if(!n?.index||n.start!==0||n.count!==n.index.count||n.geometry.groups?.length)return;let r=new Set([e.material]),i=e.mainPassMaterialGroups;if(i){if(i.originalMaterial!==e.material||!i.validFor?.(e))return;for(let t of i.groups){if(!Zn(t.material)||t.material.vertex!==e.material.vertex)return;r.add(t.material)}}let a=n.index.array,o={geometry:n.geometry,material:e.material,materials:r,vertex:e.material.vertex,position:n.position,positionArray:n.position.array,positionVersion:n.position.version,index:n.index,indexArray:a,indexVersion:n.index.version,copy:new a.constructor(Math.ceil(a.byteLength/4)*4/a.BYTES_PER_ELEMENT),buffer:null,intervals:null,ranges:new Map,signature:null,prepareFrame:-1};o.copy.set(a),this.meshes.set(e,o),t++}),this.stats.registeredMeshes+=t,t}prepare(e,{material:t=e?.material,model:n,viewProj:r,width:i,height:a,start:o=0,count:s=null}={}){this.frame!==P.frame&&(this.frame=P.frame,this.stats.frameSortMs=0,this.stats.frameSwaps=0),this.stats.prepares++;let c=this.meshes.get(e),l=e?.geometry,u=Math.min(s??c?.indexArray.length??0,(c?.indexArray.length??0)-o),d=Jn(n),f=Jn(r),p=()=>(this.stats.fallbacks++,null);if(!this.enabled||!this.maxSwapsPerTriangle||!c||!d||!f||!Zn(t)||!c.materials.has(t)||e.material!==c.material||t.vertex!==c.vertex||l!==c.geometry||l.attributes.position!==c.position||c.position.array!==c.positionArray||c.position.version!==c.positionVersion||c.position.itemSize!==3||c.position.normalized||c.position.isInterleavedBufferAttribute||c.position.gpuBuffer||l.index!==c.index||c.index.array!==c.indexArray||c.index.version!==c.indexVersion||c.index.itemSize!==1||c.index.normalized||c.index.isInterleavedBufferAttribute||c.index.gpuBuffer||e.isInstancedMesh||e.isSkinnedMesh||l.indirect||l.instanceCount!=null&&l.instanceCount!==1||l.isInstancedBufferGeometry||e.mainPassMaterialGroups&&!e.mainPassMaterialGroups.validFor?.(e)||!Number.isInteger(o)||o<0||o%3||!Number.isInteger(u)||u<3||u%3)return p();let m=[...d,...f,i,a],h=!c.signature||m.some((e,t)=>!Object.is(e,c.signature[t]));if(h&&c.prepareFrame===P.frame)return p();let g=Kn();if(h){let e=Xn(c.positionArray,c.indexArray,d,f,i,a,c.intervals);if(!e)return p();c.intervals=e,c.signature=m,c.ranges.clear(),c.copy.set(c.indexArray),c.prepareFrame=P.frame,this.stats.safeTriangles=e.safeTriangles}c.prepareFrame=P.frame;let _=`${o}:${u}`;if(c.ranges.has(_))return this.stats.cacheHits++,c.ranges.get(_);let v=o/3,y=(o+u)/3,b=Yn(c.intervals.low.subarray(v,y),c.intervals.high.subarray(v,y),{maxSwapsPerTriangle:this.maxSwapsPerTriangle}),x=Kn()-g;if(this.stats.sorts++,this.stats.sortMs+=x,this.stats.lastSortMs=x,this.stats.frameSortMs+=x,this.stats.swaps+=b.swaps,this.stats.lastSwaps=b.swaps,this.stats.frameSwaps+=b.swaps,this.stats.movedTriangles+=b.movedTriangles,this.stats.lastMovedTriangles=b.movedTriangles,!b.swaps)return c.ranges.set(_,null),null;for(let e=0;e<b.order.length;e++){let t=o+b.order[e]*3,n=o+e*3;c.copy[n]=c.indexArray[t],c.copy[n+1]=c.indexArray[t+1],c.copy[n+2]=c.indexArray[t+2]}if(!c.buffer)c.buffer=P.device.createBuffer({label:`Yacht main opaque ordered indices`,size:c.copy.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),this.resources.add(c.buffer),this.stats.bufferBytes+=c.copy.byteLength,P.queue.writeBuffer(c.buffer,0,c.copy),this.stats.uploads++,this.stats.uploadBytes+=c.copy.byteLength;else{let e=c.copy.BYTES_PER_ELEMENT,t=Math.floor(o*e/4)*4,n=Math.ceil((o+u)*e/4)*4;P.queue.writeBuffer(c.buffer,t,c.copy.buffer,t,n-t),this.stats.uploads++,this.stats.uploadBytes+=n-t}let S={indexBuffer:c.buffer,indexFormat:c.copy instanceof Uint16Array?`uint16`:`uint32`,start:o,count:u};return c.ranges.set(_,S),S}dispose(){for(let e of this.resources)e.destroy();this.resources.clear(),this.meshes=new WeakMap,this.stats.bufferBytes=0}},$n=`
struct FSIn { @builtin( position ) pos: vec4f, @location( 0 ) uv: vec2f };
@vertex fn vs( @builtin( vertex_index ) i: u32 ) -> FSIn {
	let p = vec2f( f32( ( i << 1u ) & 2u ), f32( i & 2u ) );
	var o: FSIn;
	o.pos = vec4f( p * 2.0 - 1.0, FS_DEPTH, 1.0 );
	o.uv = vec2f( p.x, 1.0 - p.y );
	return o;
}
`,er=class{constructor({label:e=`fullscreen`,modules:t=[],bindings:n={},code:r,colorFormats:i=[`rgba16float`],blend:a=`none`,defines:o={},depthFormat:c=null,depthCompare:u=`always`,depthWrite:d=!1,depth:f=0,writeMasks:m=null,blends:h=null}){this.label=e,this.colorFormats=i;let g=r.includes(`@fragment`)?r:`${r}\n@fragment fn fs( in: FSIn ) -> @location( 0 ) vec4f { return fragment( in ); }\n`,_=s({modules:[p,...t],bindings:n,code:$n.replace(`FS_DEPTH`,f.toFixed(6))+g,defines:o,stage:`render`,label:e});this.source=_.code,this.bindings=_.bindings;let v=l(_.code,e),y={label:e,layout:P.device.createPipelineLayout({bindGroupLayouts:[_.group0.layout,_.bindings.layout]}),vertex:{module:v,entryPoint:`vs`},fragment:{module:v,entryPoint:`fs`,targets:i.map((e,t)=>({format:e,blend:at(h?h[t]:t===0?a:`none`),writeMask:m?m[t]:GPUColorWrite.ALL}))},primitive:{topology:`triangle-list`}};c&&(y.depthStencil={format:c,depthCompare:u,depthWriteEnabled:d}),this.handle=P.renderPipeline(y),this.timestampWrites=null}get pipeline(){return P.ready(this.handle)}draw(e,t=ct){e.setPipeline(P.ready(this.handle)),e.setBindGroup(0,v(t,`render`).getBindGroup()),e.setBindGroup(1,this.bindings.getBindGroup()),e.draw(3)}render({colorViews:e,clear:t=null,clearColors:n=null,viewport:r=null,scissor:i=null,frameBlock:a=ct,depthView:o=null,encoder:s=P.getEncoder()}={}){let c=e.map(e=>e.isTexture?e.view({dimension:`2d`,mipLevelCount:1}):e),l={label:this.label,colorAttachments:c.map((e,r)=>{let i=n?n[r]:t;return{view:e,loadOp:i?`clear`:`load`,storeOp:`store`,clearValue:i||[0,0,0,0]}})};o&&(l.depthStencilAttachment={view:o,depthLoadOp:`load`,depthStoreOp:`store`}),this.timestampWrites&&(l.timestampWrites=this.timestampWrites);let u=s.beginRenderPass(l);r&&u.setViewport(...r),i&&u.setScissorRect(...i),this.draw(u,a),u.end()}};function tr(e){return!!e&&e.maxComputeWorkgroupStorageSize>=16384&&e.maxComputeInvocationsPerWorkgroup>=256&&e.maxComputeWorkgroupSizeX>=256&&e.maxStorageTexturesPerShaderStage>=4&&e.maxStorageBuffersPerShaderStage>=3}function nr(e){let t=``;for(let e=0;e<8;e++){let n=1<<e;t+=`
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
}`}function rr(e,t,n,r,i,a,o=!1){let s=r*2,c=n?`${n}[ly * ${r}u + lx] = v;`:o?`mipMid[(c * 64u + gy * 8u + gx) * 2u + ${a}u] = v;`:``;return`
  if (lx < ${r}u && ly < ${r}u) {
    let i = ly * ${s*2}u + lx * 2u;
    let v = (${t}[i] + ${t}[i + 1u] + ${t}[i + ${s}u] + ${t}[i + ${s+1}u]) * 0.25;
    textureStore(${e}${i}, vec2u(gx * ${r}u + lx, gy * ${r}u + ly), c, v);
    ${c}
  }`}function ir(e){if(e===null)return[[`d`,0],[`n`,1]];if(e!==0&&e!==1)throw RangeError(`Field channel must be 0, 1, or null`);return[[e===0?`d`:`n`,e]]}function ar(e=null){let t=ir(e),n=``;for(let[e]of t)n+=`var<workgroup> ${e}2: array<vec4f, 64>;
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
`;for(let[e,r]of[[3,4],[4,2],[5,1]]){for(let[i,a]of t)n+=rr(`${i}Out`,`${i}${e-1}`,e<5?`${i}${e}`:null,r,e,a,e===5);e<5&&(n+=`
  workgroupBarrier();
`)}return n+`
}`}function or(e=null){let t=ir(e),n=``;for(let[e]of t)n+=`var<workgroup> ${e}5: array<vec4f, 64>;
var<workgroup> ${e}6: array<vec4f, 16>;
var<workgroup> ${e}7: array<vec4f, 4>;
`;n+=`@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid: vec3u, @builtin(workgroup_id) wid: vec3u) {
  let lx = lid.x; let ly = lid.y; let c = wid.z;
  let gx = 0u; let gy = 0u;
  let i = (c * 64u + ly * 8u + lx) * 2u;
`;for(let[e,r]of t)n+=`  ${e}5[ly * 8u + lx] = mipMid[i + ${r}u];\n`;n+=`  workgroupBarrier();
`;for(let[e,r]of[[6,4],[7,2],[8,1]]){for(let[i,a]of t)n+=rr(`${i}Out`,`${i}${e-1}`,e<8?`${i}${e}`:null,r,e,a);e<8&&(n+=`
  workgroupBarrier();
`)}return n+`
}`}function sr(e,{ComputeKernel:t,commonModule:n,fftCommon:r,oceanU:i,limits:a}){if(!tr(a))throw Error(`Insufficient negotiated limits for paired columns`);let o=e=>({storage:e,access:`read_write`}),s=(e,t)=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}}),c=e.displacementTexture,l=e.derivativeTexture;e.columnKernel=new t({label:`Ocean Paired Columns + Mip1`,modules:[n],bindings:{...i,tmp:o(e.tmp),foam:o(e.foam),mipSrc:o(e.mipSrc),dispOut:s(c,0),derivOut:s(l,0),dispMip1:s(c,1),derivMip1:s(l,1)},workgroupSize:[256,1,1],code:nr(r)}),e.fusedMipFields=a.maxStorageTexturesPerShaderStage>=8;let u=e.derivativeOnly?[1]:e.fusedMipFields?[null]:[0,1];e.mipKernelsA=u.map(n=>{let r={mipSrc:o(e.mipSrc),mipMid:o(e.mipMid)};for(let[e,t]of ir(n))for(let n=2;n<=5;n++)r[`${e}Out${n}`]=s(t===0?c:l,n);return new t({label:`Ocean Paired Mips 2-5`+(n===null?``:` field${n}`),bindings:r,workgroupSize:[8,8,1],code:ar(n)})}),e.mipKernelsB=u.map(n=>{let r={mipMid:o(e.mipMid)};for(let[e,t]of ir(n))for(let n=6;n<=8;n++)r[`${e}Out${n}`]=s(t===0?c:l,n);return new t({label:`Ocean Paired Mips 6-8`+(n===null?``:` field${n}`),bindings:r,workgroupSize:[8,8,1],code:or(n)})})}function cr(e,t){let n=e===`Ocean FFT Rows`,r=e===`Ocean FFT Columns`,i=e===`Ocean Paired Columns + Mip1`;return t=t.replaceAll(`let c = i32( gid.z );`,`let c = i32( gid.z ) + 2;`).replaceAll(`let c = wid.y;`,`let c = wid.y + 2u;`).replaceAll(`let c = wid.z;`,`let c = wid.z + 2u;`).replace(`let idx = gid.z *`,`let idx = ( gid.z + 2u ) *`),e===`Ocean Copy H0`&&(t=t.replace(/\s*foam\[ idx \] = 0\.0;/,``)),n?t:((n||r)&&(t=t.replace(/let a0 = fftShared\[ i2 \]; /g,``).replace(/let b0 = fftCmul2\( fftShared\[ j2 \], w \); /g,``),t=t.replace(/^\s*fftShared\[ (?:i2|j2) \] = a0 [+-] b0;\n/gm,``),n&&(t=t.replace(/\s*\/\/ Dx_hat[\s\S]*?(?=\s*\/\/ c2 =)/,`
`),t=t.replace(/^\s*fftShared\[ r \] = vec4f\( c0, c1 \);\n/gm,``).replace(/^\s*tmp\[ o \] = fftShared\[ x \* 2u \];\n/gm,``)),r&&(t=t.replace(/^\s*fftShared\[ r \] = tmp\[ idx \* 2u \];\n/gm,``).replace(/^\s*let A = fftShared\[ y \* 2u \] \* sign;\n/gm,``).replace(/^\s*let Dx = A.x;[^\n]*\n/gm,``).replace(/\s*let jxx = lambda \* Dxx \+ 1\.0;[\s\S]*?(?=\s*let uv =)/,`
`).replace(/^\s*let vDisp = [^;]+;\n/gm,``).replace(/^\s*textureStore\( dispOut,[^\n]+\n/gm,``).replace(/^\s*mipSrc\[ idx \* 2u \] = vDisp;\n/gm,``))),i&&(t=t.replace(/let a0 = fftShared\[i2\]; /g,``).replace(/\s*let b0 = fftCmul2\(fftShared\[j2\], w\);/g,``),t=t.replace(/^\s*fftShared\[(?:i2|j2)\] = a0 [+-] b0;\n/gm,``).replace(/^\s*fftShared\[r\] = tmp\[idx \* 2u\];\n/gm,``).replace(/^\s*let A = fftShared\[k\] \* sign;\n/gm,``).replace(/^\s*let Dx = A.x;[^\n]*\n/gm,``).replace(/\s*let jxx = lambda \* Dxx \+ 1\.0;[\s\S]*?(?=\s*let uv =)/,`
`).replace(/^\s*let vDisp = [^;]+;\n/gm,``).replace(/^\s*textureStore\(dispOut,[^\n]+\n/gm,``).replace(/^\s*fftShared\[k\] = vDisp;\n/gm,``).replace(/^\s*let vd = [^;]+;\n/gm,``).replace(/^\s*textureStore\(dispMip1,[^\n]+\n/gm,``).replace(/^\s*mipSrc\[dst\] = vd;\n/gm,``)),t)}var lr=class extends We{constructor(){super(),this.type=`Group`}};lr.prototype.isGroup=!0;var ur=0,dr=new y,fr=new D,pr=new w,mr=new u,hr=new T,gr=new T;function _r(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}var vr=class e extends De{constructor(){super(),Object.defineProperty(this,"id",{value:ur++}),this.uuid=n(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(_r(e)?zt:Rt)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this.attributesVersion=(this.attributesVersion||0)+1,this}deleteAttribute(e){return delete this.attributes[e],this.attributesVersion=(this.attributesVersion||0)+1,this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;n!==void 0&&(n.applyNormalMatrix(fr.getNormalMatrix(e)),n.needsUpdate=!0);let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return this.applyMatrix4(dr.makeRotationFromQuaternion(e))}rotateX(e){return this.applyMatrix4(dr.makeRotationX(e))}rotateY(e){return this.applyMatrix4(dr.makeRotationY(e))}rotateZ(e){return this.applyMatrix4(dr.makeRotationZ(e))}translate(e,t,n){return this.applyMatrix4(dr.makeTranslation(e,t,n))}scale(e,t,n){return this.applyMatrix4(dr.makeScale(e,t,n))}lookAt(e){return dr.lookAt(e,hr.set(0,0,0),new T(0,1,0)),pr.setFromRotationMatrix(dr),this.applyQuaternion(pr)}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gr).negate(),this.translate(gr.x,gr.y,gr.z)}setFromPoints(e){let t=[];for(let n of e)t.push(n.x,n.y,n.z||0);return this.setAttribute(`position`,new Bt(t,3))}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new u);let e=this.attributes.position;if(e===void 0){this.boundingBox.makeEmpty();return}this.boundingBox.setFromBufferAttribute(e)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ue);let e=this.attributes.position;if(e===void 0){this.boundingSphere.makeEmpty();return}let t=this.boundingSphere.center;mr.setFromBufferAttribute(e).getCenter(t);let n=0;for(let r=0;r<e.count;r++)n=Math.max(n,t.distanceToSquared(hr.fromBufferAttribute(e,r)));this.boundingSphere.radius=Math.sqrt(n)}computeTangents(){let e=this.index,t=this.attributes.position,n=this.attributes.normal,r=this.attributes.uv;if(e===null||t===void 0||n===void 0||r===void 0){console.error(`BufferGeometry.computeTangents(): missing required attributes (index, position, normal or uv)`);return}let i=t.count;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new It(new Float32Array(4*i),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<i;e++)o[e]=new T,s[e]=new T;let c=new T,l=new T,u=new T,d=new b,f=new b,p=new b,m=new T,h=new T,g=(e,n,i)=>{c.fromBufferAttribute(t,e),l.fromBufferAttribute(t,n),u.fromBufferAttribute(t,i),d.fromBufferAttribute(r,e),f.fromBufferAttribute(r,n),p.fromBufferAttribute(r,i),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[n].add(m),o[i].add(m),s[e].add(h),s[n].add(h),s[i].add(h))},_=this.groups.length?this.groups:[{start:0,count:e.count}];for(let t of _)for(let n=t.start;n<t.start+t.count;n+=3)g(e.getX(n),e.getX(n+1),e.getX(n+2));let v=new T,y=new T,x=new T,S=new T,C=e=>{y.fromBufferAttribute(n,e),x.copy(y);let t=o[e];v.copy(t).sub(y.multiplyScalar(y.dot(t))).normalize(),S.crossVectors(x,t);let r=S.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,r)};for(let t of _)for(let n=t.start;n<t.start+t.count;n++)C(e.getX(n))}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t===void 0)return;let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new It(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0;e<n.count;e++)n.setXYZ(e,0,0,0);let r=new T,i=new T,a=new T,o=new T,s=new T,c=new T,l=new T,u=new T;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),o.subVectors(a,i),s.subVectors(r,i),o.cross(s),c.fromBufferAttribute(n,f),l.fromBufferAttribute(n,p),u.fromBufferAttribute(n,m),c.add(o),l.add(o),u.add(o),n.setXYZ(f,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z),n.setXYZ(m,u.x,u.y,u.z)}else for(let e=0,c=t.count;e<c;e+=3)r.fromBufferAttribute(t,e),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),o.subVectors(a,i),s.subVectors(r,i),o.cross(s),n.setXYZ(e,o.x,o.y,o.z),n.setXYZ(e+1,o.x,o.y,o.z),n.setXYZ(e+2,o.x,o.y,o.z);this.normalizeNormals(),n.needsUpdate=!0}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)hr.fromBufferAttribute(e,t).normalize(),e.setXYZ(t,hr.x,hr.y,hr.z)}toNonIndexed(){if(this.index===null)return console.warn(`BufferGeometry.toNonIndexed(): geometry is already non-indexed.`),this;let t=new e,n=this.index,r=e=>{let t=e.itemSize,r=new e.array.constructor(n.count*t);for(let i=0;i<n.count;i++){let a=n.getX(i);for(let n=0;n<t;n++)r[i*t+n]=e.array[e._idx(a,n)]}return new It(r,t,e.normalized)};for(let e in this.attributes)t.setAttribute(e,r(this.attributes[e]));for(let e in this.morphAttributes)t.morphAttributes[e]=this.morphAttributes[e].map(r);t.morphTargetsRelative=this.morphTargetsRelative;for(let e of this.groups)t.addGroup(e.start,e.count,e.materialIndex);return t}clone(){return new e().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.name=e.name,e.index!==null&&this.setIndex(e.index.clone());for(let t in e.attributes)this.setAttribute(t,e.attributes[t].clone());for(let t in e.morphAttributes)this.morphAttributes[t]=e.morphAttributes[t].map(e=>e.clone());this.morphTargetsRelative=e.morphTargetsRelative;for(let t of e.groups)this.addGroup(t.start,t.count,t.materialIndex);return e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}};vr.prototype.isBufferGeometry=!0;var yr=class e extends vr{constructor(){super(),this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}clone(){return new e().copy(this)}};yr.prototype.isInstancedBufferGeometry=!0;var br=class extends We{constructor(e=new vr,t=null){super(),this.type=`Mesh`,this.geometry=e,this.material=t,this.count=1}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this.count=e.count,this}};br.prototype.isMesh=!0;var xr=new y,Sr=new u,Cr=new ue,wr=class e extends br{constructor(e,t,n){super(e,t),this.type=`InstancedMesh`,this.instanceMatrix=new Vt(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,xr.identity())}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}getColorAt(e,t){return t.fromArray(this.instanceColor.array,e*3)}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Vt(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new u),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,xr),Sr.copy(e.boundingBox).applyMatrix4(xr),this.boundingBox.union(Sr)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ue),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,xr),Cr.copy(e.boundingSphere).applyMatrix4(xr),this.boundingSphere.union(Cr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}clone(t){return new e(this.geometry,this.material,this.count).copy(this,t)}dispose(){this.dispatchEvent({type:`dispose`})}};wr.prototype.isInstancedMesh=!0;function Tr(e,t,n,r,i){t&&e.setIndex(t),e.setAttribute(`position`,new Bt(n,3)),e.setAttribute(`normal`,new Bt(r,3)),e.setAttribute(`uv`,new Bt(i,2))}var Er=class extends vr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a},r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let o=[],s=[],c=[],l=[],u=0,d=0,f=new T,p=(e,t,n,r,i,a,p,m,h,g,_)=>{let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0;for(let a=0;a<w;a++){let o=a*y-x;for(let u=0;u<C;u++){let d=u*v-b;f[e]=d*r,f[t]=o*i,f[n]=S,s.push(f.x,f.y,f.z),f[e]=0,f[t]=0,f[n]=m>0?1:-1,c.push(f.x,f.y,f.z),l.push(u/h,1-a/g),T++}}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=u,r=n+t+C*e,i=n+t+C*(e+1),a=n+(t+1)+C*(e+1),s=n+(t+1)+C*e;o.push(r,i,s,i,a,s),E+=6}this.addGroup(d,E,_),d+=E,u+=T};p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),Tr(this,o,s,c,l)}},Dr=class extends vr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s},r=Math.floor(r),i=Math.floor(i);let c=[],l=[],u=[],d=[],f=[],p=n/2,m=0,h=0,g=new T;{let a=0,_=(t-e)/n;for(let a=0;a<=i;a++){let c=[],h=a/i,v=h*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,a=Math.sin(i),f=Math.cos(i);l.push(v*a,-h*n+p,v*f),g.set(a,_,f).normalize(),u.push(g.x,g.y,g.z),d.push(t,1-h),c.push(m++)}f.push(c)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let o=f[r][n],s=f[r+1][n],l=f[r+1][n+1],u=f[r][n+1];(e>0||r!==0)&&(c.push(o,s,u),a+=3),(t>0||r!==i-1)&&(c.push(s,l,u),a+=3)}this.addGroup(h,a,0),h+=a}let _=n=>{let i=m,a=n===!0?e:t,f=n===!0?1:-1,g=0;for(let e=1;e<=r;e++)l.push(0,p*f,0),u.push(0,f,0),d.push(.5,.5),m++;let _=m;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);l.push(a*i,p*f,a*n),u.push(0,f,0),d.push(n*.5+.5,i*.5*f+.5),m++}for(let e=0;e<r;e++){let t=i+e,r=_+e;n===!0?c.push(r,r+1,t):c.push(r+1,r,t),g+=3}this.addGroup(h,g,n===!0?1:2),h+=g};a===!1&&(e>0&&_(!0),t>0&&_(!1)),Tr(this,c,l,u,d)}},Or=class extends vr{constructor(e=[new b(0,-.5),new b(.5,0),new b(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=Math.max(0,Math.min(Math.PI*2,r));let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new T,d=new T,f=new T,p=e.length;for(let t=0;t<=p-1;t++)if(t===0){let t=e[1].x-e[0].x,n=e[1].y-e[0].y;u.set(n,-t,0),f.copy(u),u.normalize(),s.push(u.x,u.y,u.z)}else if(t===p-1)s.push(f.x,f.y,f.z);else{let n=e[t+1].x-e[t].x,r=e[t+1].y-e[t].y;u.set(r,-n,0),d.copy(u),u.add(f).normalize(),s.push(u.x,u.y,u.z),f.copy(d)}for(let i=0;i<=t;i++){let u=n+i*l*r,d=Math.sin(u),f=Math.cos(u);for(let n=0;n<=p-1;n++)a.push(e[n].x*d,e[n].y,e[n].x*f),o.push(i/t,n/(p-1)),c.push(s[3*n]*d,s[3*n+1],s[3*n]*f)}for(let e=0;e<t;e++)for(let t=0;t<p-1;t++){let n=t+e*p,r=n,a=n+p,o=n+p+1,s=n+1;i.push(r,a,s,o,s,a)}this.setIndex(i),this.setAttribute(`position`,new Bt(a,3)),this.setAttribute(`uv`,new Bt(o,2)),this.setAttribute(`normal`,new Bt(c,3))}},kr=(1+Math.sqrt(5))/2;-kr,-kr,-kr,-kr,-kr,-kr;var Ar=new T;function jr(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;Ar.copy(t),Ar[r]=0,Ar.normalize();let l=.5*o/(o+s),u=1-Ar.angleTo(e)/c;return Math.sign(Ar[n])===1?u*l:s/(o+s)+l+l*(1-u)}var Mr=class extends Er{constructor(e=1,t=1,n=1,r=2,i=.1){if(r=r*2+1,i=Math.min(e/2,t/2,n/2,i),super(1,1,1,r,r,r),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},r===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let o=new T,s=new T,c=new T,l=new T(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/3/6,m=.5/r;for(let r=0,a=0;r<u.length/3;r++,a+=3){o.fromArray(u,a),s.copy(o),s.x-=Math.sign(s.x)*m,s.y-=Math.sign(s.y)*m,s.z-=Math.sign(s.z)*m,s.normalize(),u[a]=l.x*Math.sign(o.x)+s.x*i,u[a+1]=l.y*Math.sign(o.y)+s.y*i,u[a+2]=l.z*Math.sign(o.z)+s.z*i,d[a]=s.x,d[a+1]=s.y,d[a+2]=s.z;let h=r*2;switch(Math.floor(r/p)){case 0:c.set(1,0,0),f[h]=jr(c,s,`z`,`y`,i,n),f[h+1]=1-jr(c,s,`y`,`z`,i,t);break;case 1:c.set(-1,0,0),f[h]=1-jr(c,s,`z`,`y`,i,n),f[h+1]=1-jr(c,s,`y`,`z`,i,t);break;case 2:c.set(0,1,0),f[h]=1-jr(c,s,`x`,`z`,i,e),f[h+1]=jr(c,s,`z`,`x`,i,n);break;case 3:c.set(0,-1,0),f[h]=1-jr(c,s,`x`,`z`,i,e),f[h+1]=1-jr(c,s,`z`,`x`,i,n);break;case 4:c.set(0,0,1),f[h]=1-jr(c,s,`x`,`y`,i,e),f[h+1]=1-jr(c,s,`y`,`x`,i,t);break;case 5:c.set(0,0,-1),f[h]=jr(c,s,`x`,`y`,i,e),f[h+1]=1-jr(c,s,`y`,`x`,i,t)}}}};function Nr(e){let t=e[0],n=t.array.constructor,r=t.itemSize,i=t.normalized,a=0;for(let t of e){if(t.array.constructor!==n||t.itemSize!==r||t.normalized!==i)return console.error(`mergeAttributes(): attributes differ in array type, itemSize or normalized.`),null;a+=t.count*r}let o=new n(a),s=0;for(let t of e){if(t.isInterleavedBufferAttribute)for(let e=0;e<t.count;e++)for(let n=0;n<r;n++)o[s+e*r+n]=t.array[t._idx(e,n)];else o.set(t.array.subarray(0,t.count*r),s);s+=t.count*r}let c=new It(o,r,i);return c.gpuType=t.gpuType===void 0?c.gpuType:t.gpuType,c}function Pr(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i={},a=new vr,o=0;for(let s=0;s<e.length;s++){let c=e[s];if(n!==(c.index!==null))return console.error(`mergeGeometries(): geometry ${s} index mismatch; all or none must be indexed.`),null;let l=0;for(let e in c.attributes){if(!r.has(e))return console.error(`mergeGeometries(): geometry ${s} has attribute "${e}" missing from geometry 0.`),null;(i[e]||=[]).push(c.attributes[e]),l++}if(l!==r.size)return console.error(`mergeGeometries(): geometry ${s} is missing attributes.`),null;if(t){let e=n?c.index.count:c.attributes.position.count;a.addGroup(o,e,s),o+=e}}if(n){let t=0,n=[];for(let r of e){let e=r.index;for(let r=0;r<e.count;r++)n.push(e.getX(r)+t);t+=r.attributes.position.count}a.setIndex(n)}for(let e in i){let t=Nr(i[e]);if(!t)return console.error(`mergeGeometries(): failed merging attribute "${e}".`),null;a.setAttribute(e,t)}let s=e.map(e=>e.userData).filter(e=>e&&Object.keys(e).length);return s.length&&(a.userData.mergedUserData=s),a}var Fr=class{constructor({label:e=`kernel`,modules:t=[],bindings:n={},code:r,workgroupSize:i=[64,1,1],defines:a={},entryPoint:o=`main`}){this.label=e,this.workgroupSize=i;let[c,u=1,d=1]=i,f=r.replace(/\bWG_X\b/g,c).replace(/\bWG_Y\b/g,u).replace(/\bWG_Z\b/g,d),p=s({modules:t,bindings:n,code:f,defines:a,stage:`compute`,label:e});this.source=p.code,this.bindings=p.bindings,this.group0=p.group0;let m=l(p.code,e);this.handle=P.computePipeline({label:e,layout:P.device.createPipelineLayout({bindGroupLayouts:[p.group0.layout,p.bindings.layout]}),compute:{module:m,entryPoint:o}}),this.timestampWrites=null}get pipeline(){return P.ready(this.handle)}dispatch(e,{pass:t=null,indirect:n=null}={}){let[r,i=1,a=1]=Array.isArray(e)?e:[e];if(!n&&(r===0||i===0||a===0))return;let o=e=>{e.setPipeline(P.ready(this.handle)),e.setBindGroup(0,this.group0.getBindGroup()),e.setBindGroup(1,this.bindings.getBindGroup()),n?e.dispatchWorkgroupsIndirect(n.buffer.getGPU?n.buffer.getGPU():n.buffer,n.offset||0):e.dispatchWorkgroups(r,i,a)};t?o(t):P.computePass(this.label,o,this.timestampWrites||void 0)}groups(e,t=1,n=1){let[r,i=1,a=1]=this.workgroupSize;return[Math.ceil(e/r),Math.ceil(t/i),Math.ceil(n/a)]}};new T,new ue,new E,new y,new y,Ee().compactTargets;var Ir=[];for(let e=0;e<8;e++)Ir.push(new T);var Lr=new T,Rr=new T(0,1,0),zr=new y,Br=new T,Vr=new F,Hr=new WeakMap,Ur=0;function Wr(e){return!e||typeof e!=`object`?String(e):(Hr.has(e)||Hr.set(e,++Ur),Hr.get(e))}var Gr=class{constructor({size:e=2048,splits:t=[10,60,400],lightMargin:n=200,normalBias:r=[.015,.06,.3],bias:i=2e-5,pcssCascades:a=1,cacheStatic:o=!1,skipUnused:s=o}={}){this.size=e,this.splits=t,this.count=t.length,this.lightMargin=n,this.normalBias=r,this.periods=t.map((e,t)=>t===0?1:t===1?2:4),this.cacheStatic=o,this.skipUnused=s,this._samplingEnabled=!1,this.staticTexture=null,this.texture=new d({label:`sunShadowMap`,width:e,height:e,depth:this.count,dimension:`2d-array`,format:`depth32float`,usage:[`sample`,`render`,`copyDst`]}),re(this.texture),this.cascades=t.map((e,t)=>({camera:{matrixWorld:new y,matrixWorldInverse:new y,projectionMatrix:new y,near:0,far:1,reversedDepth:!1,updateMatrixWorld(){},isCamera:!0,isShadowCamera:!0},block:lt(`shadowView`+t),viewProj:new y,radius:0,dirty:!0})),this.enabled=!0,this.layerMask=4294967295,this.frame=0,this.lastSun=new T(0,-2,0);let c=O.fields;c.count.value=this.count,c.mapSize.value=e,c.bias.value=i,c.pcssCascades.value=a,c.enabled.value=1}invalidateStatic(){for(let e of this.cascades)e.staticKey=null,e.dirty=!0}_margin(e){let t=this.splits[this.count-1],n=e/t;return Math.max(.25*n*n,.25*n)*t}_fit(e,t,n){let r=this.cascades[e],i=e===0?0:this.splits[e-1],a=this.splits[e],o=this._margin(i),s=this._margin(a),c=Math.max(t.near,i-o*.5),l=e===this.count-1?a:a+s*.5;O.fields.blend.value[e]=new F(i,a,o,s);let u=Math.tan(t.fov*Math.PI/360),d=u*t.aspect,f=0;for(let e of[c,l])for(let n of[-1,1])for(let r of[-1,1])Ir[f++].set(n*d*e,r*u*e,-e).applyMatrix4(t.matrixWorld);let p=Math.min(l,(c+l)/2*(1+d*d+u*u));Lr.set(0,0,-p).applyMatrix4(t.matrixWorld);let m=0;for(let e of Ir)m=Math.max(m,e.distanceTo(Lr));m=Math.ceil(m*16)/16,r.radius=m;let h=r.camera,g=n,_=Math.abs(g.y)>.99?Br.set(1,0,0):Rr;h.matrixWorld.lookAt(g,new T(0,0,0),_),zr.copy(h.matrixWorld).invert();let v=2*m/this.size,y=Vr.set(Lr.x,Lr.y,Lr.z,1).applyMatrix4(zr);y.x=Math.round(y.x/v)*v,y.y=Math.round(y.y/v)*v;let b=m+this.lightMargin,x=new T(y.x,y.y,y.z+b).applyMatrix4(h.matrixWorld);h.matrixWorld.setPosition(x),h.matrixWorldInverse.copy(h.matrixWorld).invert();let S=.1,C=b+m;h.near=S,h.far=C,qr(h.projectionMatrix,-m,m,m,-m,S,C),r.viewProj.multiplyMatrices(h.projectionMatrix,h.matrixWorldInverse);let w=O.fields;w.matrices.value[e]=r.viewProj.clone(),w.cascades.value[e]=new F(l,v,this.normalBias[e]??.05,C-S)}update(e,t){this.frame++;let n=this.enabled&&t.y>-.05;if(O.fields.enabled.value=+!!n,this.skipUnused&&n&&!this._samplingEnabled&&this.invalidateStatic(),this._samplingEnabled=n,!this.enabled||this.skipUnused&&!n)return[];e.updateMatrixWorld();let r=this.lastSun.angleTo(t)>1e-4;this.lastSun.copy(t);let i=[];for(let n=0;n<this.count;n++)(r||this.cascades[n].dirty||(this.frame+n)%this.periods[n]===0)&&(this._fit(n,e,t),this.cascades[n].dirty=!1,i.push(n));return i}render(e,t,n){for(let r of n){let n=this.cascades[r];pt(n.camera,this.size,this.size,{block:n.block});let i={label:`shadow cascade `+r,kind:`depth`,camera:n.camera,frameBlock:n.block,depthView:this.texture.view({dimension:`2d`,baseArrayLayer:r,arrayLayerCount:1}),depthFormat:`depth32float`,clearDepth:1,depthCompare:`less-equal`,layerMask:this.layerMask,depthBias:2,depthBiasSlopeScale:1.5};if(!this.cacheStatic){t.render(e,i);continue}this.staticTexture||=new d({label:`staticShadowCache`,width:this.size,height:this.size,depth:this.count,dimension:`2d-array`,format:`depth32float`,usage:[`render`,`copySrc`]});let a=t.collect(e,{...i,filter:e=>e.shadowStatic===!0}),o=Kr(n,a);n.staticKey!==o&&(t.render(e,{...i,label:`shadow static cascade `+r,items:a,depthView:this.staticTexture.view({dimension:`2d`,baseArrayLayer:r,arrayLayerCount:1})}),n.staticKey=!t.precompiling&&[...t.pipelines.values()].every(e=>e.handle.pipeline)?o:null),P.getEncoder().copyTextureToTexture({texture:this.staticTexture.getGPU(),origin:{x:0,y:0,z:r}},{texture:this.texture.getGPU(),origin:{x:0,y:0,z:r}},{width:this.size,height:this.size,depthOrArrayLayers:1}),t.render(e,{...i,clearDepth:null,filter:e=>e.shadowStatic!==!0})}}};function Kr(e,t){let n=[...e.viewProj.elements.map(Math.fround),Math.fround(e.camera.near),Math.fround(e.camera.far)];for(let e of[...t.opaque,...t.transparent]){let t=e.object,r=e.geometry,i=e.material;n.push(t.id,r.id,i.id,i.version,e.start,e.count,t.count??1,t.shadowRevision??0,i.side,i.alphaTest,i.depthWrite,i.shadow,...t.matrixWorld.elements),t.drawParams&&n.push(...t.drawParams);for(let[e,t]of Object.entries(r.attributes)){let r=t.data||t;n.push(e,Wr(t),Wr(r.array),r.version,t.count)}r.index&&n.push(Wr(r.index),Wr(r.index.array),r.index.version,r.index.count),t.instanceMatrix&&n.push(Wr(t.instanceMatrix),Wr(t.instanceMatrix.array),t.instanceMatrix.version);for(let e of Object.values(i.uniforms||{})){let t=e.value;typeof t==`number`||typeof t==`boolean`?n.push(t):t?.elements?n.push(...t.elements):Array.isArray(t)||ArrayBuffer.isView(t)?n.push(...t):t&&typeof t==`object`&&n.push(t.x,t.y,t.z,t.w,t.r,t.g,t.b)}}return n.join(`|`)}function qr(e,t,n,r,i,a,o){let s=1/(n-t),c=1/(r-i),l=1/(o-a);return e.set(2*s,0,0,-(n+t)*s,0,2*c,0,-(r+i)*c,0,0,-l,-a*l,0,0,0,1),e}var X=256,Jr=8,Yr=X/2,Xr=[733,157,33.3,7.1],Zr=Math.PI*2,Qr=class{constructor(e={}){this.scale=e.scale??1,this.windSpeed=e.windSpeed??8,this.windDirection=e.windDirection??20,this.fetch=e.fetch??200,this.spreadBlend=e.spreadBlend??.9,this.swell=e.swell??.2,this.peakEnhancement=e.peakEnhancement??3.3,this.shortWavesFade=e.shortWavesFade??.01}},$r=`
const FFT_N: u32 = ${X}u;
const FFT_HALF: u32 = ${Yr}u;
const FFT_G: f32 = ${dt};

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
`,ei=class{constructor(e,t={}){if(this.renderer=e,this.cascades=t.cascades??4,this.derivativeOnly=t.derivativeOnly===!0,this.derivativeOnly&&this.cascades!==4)throw Error(`Rocha derivatives retain logical cascades 2 and 3 of four`);this.fusedMips=t.fusedMips??new URLSearchParams(globalThis.location?.search||``).has(`fusedOcean`),this.fusedMips&&!tr(P.limits)&&(console.warn(`Fused ocean unsupported by negotiated limits; retaining original kernels.`),this.fusedMips=!1),this.sizes=(t.sizes??Xr).slice(0,this.cascades),this.depth=t.depth??500,this.local=new Qr(t.local??{windSpeed:7,windDirection:25,fetch:120,spreadBlend:.85,swell:.05}),this.swell=new Qr(t.swell??{scale:.48,windSpeed:6,windDirection:5,fetch:1200,spreadBlend:1,swell:.9,shortWavesFade:.1});let n=this.cascades;this.params=new r(`OceanParams`,{sizes:[`vec4f[4]`,[0,1,2,3].map(e=>new F(this.sizes[e]??1,0,0,0))],cuts:[`vec4f[4]`,[0,1,2,3].map(()=>new F)],sysA:[`vec4f[2]`,[new F,new F]],sysB:[`vec4f[2]`,[new F,new F]],choppiness:[`f32`,t.choppiness??.9],foamBias:[`f32`,.58],foamGain:[`f32`,3],foamDecay:[`f32`,.35],foamAdd:[`f32`,2.5],time:[`f32`,0],depth:[`f32`,this.depth],seed:[`u32`,1337]},{label:`ocean`});let i=this.params.fields;this.choppiness=i.choppiness,this.foamBias=i.foamBias,this.foamGain=i.foamGain,this.foamDecay=i.foamDecay,this.foamAdd=i.foamAdd,this.time=i.time,this.uDepth=i.depth,this.uSeed=i.seed,this.timeScale=1;let a=X*X*n;this.h0=new c({label:`fftH0`,count:a,type:`vec4f`}),this.waveData=new c({label:`fftWave`,count:a,type:`vec4f`}),this.tmp=new c({label:`fftTmp`,count:a*2,type:`vec4f`}),this.foam=new c({label:`fftFoam`,count:a,type:`f32`}),this.mipSrc=new c({label:`fftMipSrc`,count:this.fusedMips?a/2:a*2,type:`vec4f`}),this.mipMid=new c({label:`fftMipMid`,count:64*n*2,type:`vec4f`});let o=e=>new d({label:e,width:X,height:X,depth:n,dimension:`2d-array`,format:`rgba16float`,mips:!0,usage:[`sample`,`storage`,`copyDst`,`copySrc`],sampler:`linearRepeat`});this.displacementTexture=o(`oceanDisplacement`),this.derivativeTexture=o(`oceanDerivatives`),this.module=new m({name:`ocean`,deps:[p],uniforms:this.params,uniformName:`ocean`,bindings:{oceanDisplacement:{texture:this.displacementTexture,viewDimension:`2d-array`},oceanDerivatives:{texture:this.derivativeTexture,viewDimension:`2d-array`}},code:`
const OCEAN_CASCADES: i32 = ${n};
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
`}),this._buildKernels(),this.updateSpectrumUniforms(),this.needsSpectrum=!0}get uSizes(){return{array:this.sizes}}setCascadeSizes(e){this.sizes=e.slice(0,this.cascades),this.updateSpectrumUniforms()}updateSpectrumUniforms(){let e=this.cascades,t=this.params.fields;for(let n=0;n<e;n++){let r=n===0?1e-4:Zr/this.sizes[n]*6,i=n===e-1?9999:Zr/this.sizes[n+1]*6;t.cuts.value[n].set(r,i,0,0),t.sizes.value[n].set(this.sizes[n],0,0,0)}t.depth.value=this.depth;let n=[this.local,this.swell];for(let e=0;e<2;e++){let r=n[e],i=Math.max(1,r.fetch)*1e3,o=Math.max(.1,r.windSpeed),s=.076*(dt*i/(o*o))**-.22,c=22*(o*i/(dt*dt))**-.33;t.sysA.value[e].set(r.scale,a.degToRad(r.windDirection),r.spreadBlend,r.swell),t.sysB.value[e].set(s,c,r.peakEnhancement,r.shortWavesFade)}this.params.set(`cuts`,t.cuts.value),this.params.set(`sizes`,t.sizes.value),this.params.set(`sysA`,t.sysA.value),this.params.set(`sysB`,t.sysB.value),this.needsSpectrum=!0}_buildKernels(){this.cascades;let e={ocean:{uniform:this.params}},t=e=>({storage:e,access:`read_write`}),n=this.derivativeOnly,r=class extends Fr{constructor(e){super(n?{...e,code:cr(e.label,e.code)}:e)}};this.initSpectrumKernel=new r({label:`Ocean Init Spectrum`,modules:[p],bindings:{...e,h0:t(this.h0),waveData:t(this.waveData)},workgroupSize:[16,16,1],code:$r+`
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
	let kx = f32( x - ${Yr} ) * dk;
	let kz = f32( y - ${Yr} ) * dk;
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
}`}),this.conjugateKernel=new r({label:`Ocean Conjugate`,bindings:{h0:t(this.h0),tmp:t(this.tmp)},workgroupSize:[16,16,1],code:`
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
}`}),this.copyH0Kernel=new r({label:`Ocean Copy H0`,bindings:{h0:t(this.h0),tmp:t(this.tmp),foam:t(this.foam)},workgroupSize:[16,16,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let idx = gid.z * ${X*X}u + gid.y * ${X}u + gid.x;
	h0[ idx ] = tmp[ idx ];
	foam[ idx ] = 0.0;
}`});let i=``;for(let e=0;e<Jr;e++){let t=1<<e;i+=`
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
	}`}let a=`var<workgroup> fftShared: array<vec4f, ${X*2}>;\n`;if(this.rowKernel=new r({label:`Ocean FFT Rows`,modules:[p],bindings:{...e,h0:t(this.h0),waveData:t(this.waveData),tmp:t(this.tmp)},workgroupSize:[Yr,1,1],code:$r+a+`
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
${i}

	for ( var e = 0u; e < 2u; e++ ) {
		let x = t + e * FFT_HALF;
		let o = ( base + x ) * 2u;
		tmp[ o ] = fftShared[ x * 2u ];
		tmp[ o + 1u ] = fftShared[ x * 2u + 1u ];
	}
}`}),this.fusedMips){sr(this,{ComputeKernel:r,commonModule:p,fftCommon:$r,oceanU:e,limits:P.limits});return}let o=(e,t)=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}});this.columnKernel=new r({label:`Ocean FFT Columns`,modules:[p],bindings:{...e,tmp:t(this.tmp),foam:t(this.foam),mipSrc:t(this.mipSrc),dispOut:o(this.displacementTexture,0),derivOut:o(this.derivativeTexture,0)},workgroupSize:[Yr,1,1],code:$r+a+`
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
${i}

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
}`});let s=(e,t,n,r,i)=>{let a=n*2,o=``;return t?o=`${t}[ ly * ${n}u + lx ] = v;`:r===5&&(o=`mipMid[ ( c * 64u + gy * 8u + gx ) * 2u + ${i}u ] = v;`),`
	if ( lx < ${n}u && ly < ${n}u ) {
		let i = ly * ${2*a}u + lx * 2u;
		let v = ( ${e}[ i ] + ${e}[ i + 1u ] + ${e}[ i + ${a}u ] + ${e}[ i + ${a+1}u ] ) * 0.25;
		textureStore( out${r}, vec2u( gx * ${n}u + lx, gy * ${n}u + ly ), c, v );
		${o}
	}`},c=(e,n)=>new r({label:`Ocean Mips A`,bindings:{mipSrc:t(this.mipSrc),mipMid:t(this.mipMid),out1:o(e,1),out2:o(e,2),out3:o(e,3),out4:o(e,4),out5:o(e,5)},workgroupSize:[16,16,1],code:`
var<workgroup> s1: array<vec4f, 256>;
var<workgroup> s2: array<vec4f, 64>;
var<workgroup> s3: array<vec4f, 16>;
var<workgroup> s4: array<vec4f, 4>;
fn src( c: u32, x: u32, y: u32 ) -> vec4f { return mipSrc[ ( c * ${X*X}u + y * ${X}u + x ) * 2u + ${n}u ]; }
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
${s(`s1`,`s2`,8,2,n)}
	workgroupBarrier();
${s(`s2`,`s3`,4,3,n)}
	workgroupBarrier();
${s(`s3`,`s4`,2,4,n)}
	workgroupBarrier();
${s(`s4`,null,1,5,n)}
}`}),l=(e,n)=>new r({label:`Ocean Mips B`,bindings:{mipMid:t(this.mipMid),out6:o(e,6),out7:o(e,7),out8:o(e,8)},workgroupSize:[8,8,1],code:`
var<workgroup> s5: array<vec4f, 64>;
var<workgroup> s6: array<vec4f, 16>;
var<workgroup> s7: array<vec4f, 4>;
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y; let c = wid.z;
	let gx = 0u; let gy = 0u;
	s5[ ly * 8u + lx ] = mipMid[ ( c * 64u + ly * 8u + lx ) * 2u + ${n}u ];
	workgroupBarrier();
${s(`s5`,`s6`,4,6,n)}
	workgroupBarrier();
${s(`s6`,`s7`,2,7,n)}
	workgroupBarrier();
${s(`s7`,null,1,8,n)}
}`});this.mipKernelsA=this.derivativeOnly?[c(this.derivativeTexture,1)]:[c(this.displacementTexture,0),c(this.derivativeTexture,1)],this.mipKernelsB=this.derivativeOnly?[l(this.derivativeTexture,1)]:[l(this.displacementTexture,0),l(this.derivativeTexture,1)]}update(e){let t=this.derivativeOnly?2:this.cascades;if(this.needsSpectrum){this.needsSpectrum=!1;let e=[X/16,X/16,t];this.initSpectrumKernel.dispatch(e),this.conjugateKernel.dispatch(e),this.copyH0Kernel.dispatch(e)}this.time.value+=e*this.timeScale,P.computePass(`Ocean FFT`,e=>{this.rowKernel.dispatch([X,t,1],{pass:e}),this.columnKernel.dispatch([this.fusedMips?X/2:X,t,1],{pass:e});for(let n of this.mipKernelsA)n.dispatch([X/32,X/32,t],{pass:e});for(let n of this.mipKernelsB)n.dispatch([1,1,t],{pass:e})},this.timestampWrites||void 0)}sampleDisplacement(e,t=null,n=null){let r=[];for(let i=0;i<this.cascades;i++){let a=`textureSampleLevel( oceanDisplacement, smpLinearRepeat, ( ${e} ) / ocean.sizes[ ${i} ].x, ${i}, ${t??`0.0`} ).xyz`;n&&(a+=` * ( ${n[i]} )`),r.push(a)}return`( `+r.join(` + `)+` )`}},ti=6,ni=new r(`WhaleMarks`,{marks:[`vec4f[${ti}]`,Array(ti).fill(0).map(()=>new F(0,0,1,0))]},{label:`whaleMarks`});new m({name:`whaleWater`,uniforms:ni,uniformName:`whaleMarks`,code:`
fn whaleWater( xz: vec2f ) -> vec2f {
	var foam = 0.0; var slick = 0.0;
	for ( var i = 0; i < ${ti}; i++ ) {
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
`}),new T,new T;var ri={left:.15,right:.15,bottom:.6,top:0},ii={cx:(ri.right-ri.left)/2,cy:(ri.top-ri.bottom)/2,sx:1+(ri.left+ri.right)/2,sy:1+(ri.top+ri.bottom)/2};new y().set(1/ii.sx,0,0,-ii.cx/ii.sx,0,1/ii.sy,0,-ii.cy/ii.sy,0,0,1,0,0,0,0,1),new y,new u,new T;var ai=new m({name:`waterFresnel`,deps:[p],code:`
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
`}),oi=ii,si=e=>e.toFixed(6),ci=`
// a refracted sample is usable when it lies this far behind the water surface (view depth, m): objects in
// front of it (the hull you stand in, pier piles) are rejected
const WATER_BEHIND: f32 = 0.05;
// screen NDC -> uv in the refraction image, which extends past the screen (RefractionPass guard band)
fn _waterRefrUV( ndc: vec2f ) -> vec2f {
	let n = ( ndc - vec2f( ${si(oi.cx)}, ${si(oi.cy)} ) ) / vec2f( ${si(oi.sx)}, ${si(oi.sy)} );
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
`;new m({name:`waterHelpers`,deps:[p],code:ci});var li=class extends Gr{constructor(){super({size:1024,splits:[500],lightMargin:30,normalBias:[.018],bias:3e-5,pcssCascades:0}),this.setSun(38,50)}setSun(e,t=this.azimuth){if(!Number.isFinite(e)||e<5||e>85||!Number.isFinite(t))throw RangeError(`Sun elevation must be 5–85 degrees`);this.elevation=e,this.azimuth=t;let n=e*Math.PI/180,r=t*Math.PI/180;ut.sunDir.value.set(Math.sin(r)*Math.cos(n),Math.sin(n),Math.cos(r)*Math.cos(n));let i=Math.max(0,(35-e)/30);if(ut.sunColor.value.setRGB(2.75,2.6-i*.65,2.38-i*1.05),ut.skyIrradiance.value.setRGB(.31,.37,.43),ut.horizonColor.value.setRGB(.62,.65,.66),ut.envIntensity.value=.9,this.environment){let t=this.environment.sampleLighting(e);ut.sunColor.value.setRGB(...t.sunTransmittance.map(e=>e*t.sunIlluminance)),ut.skyIrradiance.value.setRGB(...t.skyIrradiance),ut.horizonColor.value.setRGB(...t.horizon),ut.envIntensity.value=1}}_fit(e,t,n){let r=this.cascades[e],i=r.camera,a=new T(0,2,0),o=a.clone().addScaledVector(n,60);i.matrixWorld.lookAt(o,a,new T(0,1,0)).setPosition(o),i.matrixWorldInverse.copy(i.matrixWorld).invert(),i.near=.1,i.far=120,qr(i.projectionMatrix,-36,36,36,-36,i.near,i.far),r.viewProj.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),O.fields.matrices.value[e]=r.viewProj.clone(),O.fields.cascades.value[e]=new F(500,72/this.size,.018,i.far-i.near),O.fields.blend.value[e]=new F(0,500,0,0)}},ui=`
fn RRTAndODTFit( v: vec3f ) -> vec3f {
	let a = v * ( v + 0.0245786 ) - 0.000090537;
	let b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
fn acesFilmicToneMapping( colorIn: vec3f, exposure: f32 ) -> vec3f {
	let ACESInputMat = transpose( mat3x3f(
		0.59719, 0.35458, 0.04823,
		0.07600, 0.90834, 0.01566,
		0.02840, 0.13383, 0.83777 ) );
	let ACESOutputMat = transpose( mat3x3f(
		1.60475, -0.53108, -0.07367,
		-0.10208, 1.10813, -0.00605,
		-0.00327, -0.07276, 1.07602 ) );
	var color = colorIn * exposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return clamp( color, vec3f( 0.0 ), vec3f( 1.0 ) );
}
`,di=(e,t)=>{let n=0,r=1;for(;e>0;)r/=t,n+=e%t*r,e=Math.floor(e/t);return n},fi=ui+`
fn displayColor(c:vec3f) -> vec3f {
#if AA_FILMIC
  return linearToSrgb(acesFilmicToneMapping(max(c,vec3f(0.0)),aa.displayExposure));
#else
  return linearToSrgb(max(c,vec3f(0.0)));
#endif
}
fn roundedBackground() -> vec3f {
  return vec3f(unpack2x16float(pack2x16float(aa.cachedBackground.rg)),unpack2x16float(pack2x16float(aa.cachedBackground.ba)).x);
}
fn resolvedDisplayColor(c:vec3f,kind:f32) -> vec3f {
#if AA_CACHED_BACKGROUND_DISPLAY
  if(aa.cachedBackground.w>.5&&kind==0.0&&all(c==roundedBackground())) {
    // Both conversions use the same WGSL and final canvas-format rounding.
    // This texel changes only when the HDR beige or exposure changes.
    return textureLoad(backgroundDisplayCache,vec2i(0),0).rgb;
  }
#endif
  return displayColor(c);
}
`,pi=`
fn sourceColorDimensions() -> vec2u {
  if(aa.surfaceCropActive>.5) { return vec2u(aa.sourceSize); }
  return textureDimensions(currentColor);
}
fn sourceColorLoad(p:vec2i) -> vec4f {
  if(aa.surfaceCropActive>.5) {
    let global=clamp(p,vec2i(0),vec2i(aa.sourceSize)-1);
    let local=global-vec2i(aa.surfaceCrop.xy);
    if(any(local<vec2i(0))||any(local>=vec2i(aa.surfaceCrop.zw))) {
      return vec4f(roundedBackground(),60000.0);
    }
    return textureLoad(currentColor,local,0);
  }
  return textureLoad(currentColor,p,0);
}
fn sourceMotionLoad(p:vec2i) -> vec4f {
  if(aa.surfaceCropActive>.5) {
    let global=clamp(p,vec2i(0),vec2i(aa.sourceSize)-1);
    let local=global-vec2i(aa.surfaceCrop.xy);
    if(any(local<vec2i(0))||any(local>=vec2i(aa.surfaceCrop.zw))) {
      return vec4f(0.0,0.0,60000.0,0.0);
    }
    return textureLoad(currentMotion,local,0);
  }
  return textureLoad(currentMotion,p,0);
}
fn sourceColorSample(uv:vec2f) -> vec4f {
  if(aa.surfaceCropActive>.5) {
    let size=aa.sourceSize;
    let pixel=uv*size-.5;
    let base=vec2i(floor(pixel));
    let first=clamp(base,vec2i(0),vec2i(size)-1);
    let last=clamp(base+vec2i(1),vec2i(0),vec2i(size)-1);
    let origin=vec2i(aa.surfaceCrop.xy);let end=origin+vec2i(aa.surfaceCrop.zw);
    if(all(first>=origin)&&all(last<end)) {
      return textureSampleLevel(currentColor,smpLinearClamp,(uv*size-aa.surfaceCrop.xy)/aa.surfaceCrop.zw,0.0);
    }
    // Normally unreachable for foreground thanks to the four-texel halo.
    // Preserve the virtual original clear outside ROI, including global clamp.
    let f=fract(pixel);
    let a=sourceColorLoad(base);let b=sourceColorLoad(base+vec2i(1,0));
    let c=sourceColorLoad(base+vec2i(0,1));let d=sourceColorLoad(base+vec2i(1,1));
    return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
  }
  return textureSampleLevel(currentColor,smpLinearClamp,uv,0.0);
}
`,mi=`
fn sourceColorDimensions() -> vec2u { return vec2u(aa.sourceSize); }
fn sourceColorLoad(p:vec2i) -> vec4f {
  return textureLoad(currentColor,p-vec2i(aa.surfaceCrop.xy),0);
}
fn sourceMotionLoad(p:vec2i) -> vec4f {
  return textureLoad(currentMotion,p-vec2i(aa.surfaceCrop.xy),0);
}
fn sourceColorSample(uv:vec2f) -> vec4f {
  return textureSampleLevel(currentColor,smpLinearClamp,(uv*aa.sourceSize-aa.surfaceCrop.xy)/aa.surfaceCrop.zw,0.0);
}
`;function hi(e,t=!1,n=!1){if(!t)return e;let r=e.replaceAll(`textureDimensions(currentColor)`,`sourceColorDimensions()`).replace(/textureLoad\(currentColor,(\w+),0\)/g,`sourceColorLoad($1)`).replace(/textureLoad\(currentMotion,(\w+),0\)/g,`sourceMotionLoad($1)`).replace(/textureSampleLevel\(currentColor,smpLinearClamp,([^;\n]+?),0\.0\)/g,`sourceColorSample($1)`);return(n?mi:pi)+r}function gi(e,t,n,r=4,i=16){if(!e)return null;let[a,o,s,c]=e;if(s<=0||c<=0||a>=t||o>=n||a+s<=0||o+c<=0)return{origin:[0,0],size:[1,1],empty:!0};let l=Math.max(0,Math.floor((a-r)/i)*i),u=Math.max(0,Math.floor((o-r)/i)*i),d=Math.min(t,Math.ceil((a+s+r)/i)*i),f=Math.min(n,Math.ceil((o+c+r)/i)*i);return l===0&&u===0&&d===t&&f===n?null:{origin:[l,u],size:[d-l,f-u],empty:!1}}function _i(e,t,n,r,i){if(!e||!n.every(Number.isFinite)||!r.every(e=>e>0)||n.some((e,t)=>e>r[t]*2))return!1;if(t[2]<=0||t[3]<=0)return!0;if(e.empty)return!1;for(let a=0;a<2;a++){let o=n[a]/r[a],s=n[a]*2**-20+1e-4,c=(t[a]+.5)*o-i[a],l=(t[a]+t[a+2]-.5)*o-i[a],u=Math.max(0,Math.min(n[a]-1,Math.min(Math.floor(c-s)-1,Math.floor(c-s-o*.25-.5)))),d=Math.max(0,Math.min(n[a]-1,Math.max(Math.floor(l+s)+1,Math.floor(l+s+o*.25-.5)+1)));if(u<e.origin[a]||d>=e.origin[a]+e.size[a])return!1}return!0}function vi(e,t,n=!1){return!!(e&&t.has(`shader-f16`)&&!n)}function yi(e,t,n,r=null){if(e[0]>e[2]||e[1]>e[3])return[0,0,0,0];let i=r||[0,0,t,n],a=Math.max(i[0],0,Math.floor(e[0]*t)-2),o=Math.max(i[1],0,Math.floor(e[1]*n)-2),s=Math.min(i[0]+i[2],t,Math.ceil(e[2]*t)+2),c=Math.min(i[1]+i[3],n,Math.ceil(e[3]*n)+2);return[a,o,Math.max(0,s-a),Math.max(0,c-o)]}function bi(e,t){let n=Math.max(e[0],t[0]),r=Math.max(e[1],t[1]),i=Math.min(e[0]+e[2],t[0]+t[2]),a=Math.min(e[1]+e[3],t[1]+t[3]);return n>=i||r>=a?{fluid:e[2]>0&&e[3]>0?[[...e]]:[],foreground:[0,0,0,0]}:{fluid:[[e[0],e[1],e[2],r-e[1]],[e[0],a,e[2],e[1]+e[3]-a],[e[0],r,n-e[0],a-r],[i,r,e[0]+e[2]-i,a-r]].filter(e=>e[2]>0&&e[3]>0),foreground:[n,r,i-n,a-r]}}var xi=class{constructor({enabled:e=!0,sampleScale:t=1.5,directDisplay:n=!0,filmic:i=!1,exposure:a=ce,splitSurfaceHistory:o=!1,fusedSurfaceComposition:s=!1,sparseSurfaceAA:c=!1,signedSurfaceDepth:l=!1,gatherSurfaceInfo:u=!1,fusedOpaqueHardware:f=!1,cachedBackgroundDisplay:p=!1,specializedSurfaceAA:m=!1,partitionedSurfaceAA:h=!1,croppedSurfaceComposite:g=!1,croppedSurfaceDirectLoads:_=!1,halfColorResolve:v=!1}={}){this.enabled=e,this.sampleScale=t,this.directDisplay=n,this.splitSurfaceHistory=o,this.fusedSurfaceComposition=s,this.sparseSurfaceAA=c,this.signedSurfaceDepth=l,this.gatherSurfaceInfo=u,this.fusedOpaqueHardware=f,this.cachedBackgroundDisplay=p,this.specializedSurfaceAA=m,this.partitionedSurfaceAA=h,this.croppedSurfaceComposite=g,this.croppedSurfaceDirectLoads=_,this.halfColorResolve=vi(v,P.features,s||o),this._surfaceCrop=null,this.surfaceInputs=null,this.filmic=i,this.exposure=a,this.fullCurrent=new C(1,1,{colors:[`rgba16float`,`rgba16float`,`rg16float`,`rgba16float`],label:`Water AA color motion depth stable fluid`}),this.compactCurrent=new C(1,1,{colors:[`rgba16float`,`rgba16float`,`rgba16float`],label:`Mobile AA color-depth motion-class stable fluid`}),this.compact=!1,this.emptySurfaceDepth=new d({width:1,height:1,format:`depth32float`,usage:[`sample`,`render`],label:`Inactive surface AA depth`}),this.surfaceCoverage=c?new d({width:1,height:1,format:`r8unorm`,usage:[`sample`,`render`],label:`Conservative8x8 source coverage`}):null,this.history=[0,1].map(e=>new C(1,1,{colors:[`rgba16float`,`rg16float`],label:`Water AA history ${e}`})),this.index=0,this.frame=0,this.needsReset=!0,this.previousView=new y,this.previousViewProj=new y,this.uniforms=new r(`WaterAA`,{previousView:[`mat4x4f`,new y],previousViewProj:[`mat4x4f`,new y],inverseStableViewProj:[`mat4x4f`,new y],jitter:[`vec2f`,new b],outputSize:[`vec2f`,new b(1,1)],sourceSize:[`vec2f`,new b(1,1)],surfaceCrop:[`vec4f`,new F(0,0,1,1)],surfaceCropActive:[`f32`,0],previousTime:[`f32`,0],reset:[`f32`,1],enabled:[`f32`,+!!e],foregroundRect:[`vec4f`,new F(0,0,1,1)],surfaceOnly:[`f32`,0],fusedSurface:[`f32`,0],sparseSurface:[`f32`,0],signedSurfaceDepth:[`f32`,0],gatherSurfaceInfo:[`f32`,0],displayExposure:[`f32`,a],cachedBackground:[`vec4f`,new F(0,0,0,0)]}),this.stats={enabled:e,phases:16,resets:0,frames:0,backgroundDisplayCacheUpdates:0},this.backgroundDisplayCache=p?new d({width:1,height:1,format:P.format,usage:[`sample`,`render`],label:`Exact constant beige display conversion`}):null,this.backgroundDisplayCachePass=p?new er({label:`Cache exact constant beige display conversion`,colorFormats:[P.format],defines:{AA_FILMIC:+!!i},bindings:{aa:{uniform:this.uniforms}},code:fi+`fn fragment(in:FSIn) -> vec4f { return vec4f(displayColor(roundedBackground()),1.0); }`}):null;let x=(e,t,r=`original`)=>new er({label:`Water motion-aware temporal resolve`,colorFormats:n?[`rgba16float`,`rg16float`,P.format]:[`rgba16float`,`rg16float`],defines:{AA_DIRECT_DISPLAY:+!!n,AA_COMPACT:+!!e,AA_FILMIC:+!!i,AA_FUSED_SURFACE:s&&r===`original`?1:0,AA_SPARSE_SURFACE:c&&r===`original`?1:0,AA_SIGNED_SURFACE_DEPTH:+!!l,AA_GATHER_SURFACE_INFO:u&&r===`original`?1:0,AA_FUSED_OPAQUE_HARDWARE:+!!f,AA_CACHED_BACKGROUND_DISPLAY:+!!p,AA_HALF_COLOR_RESOLVE:+!!this.halfColorResolve,F16:+!!this.halfColorResolve},bindings:{aa:{uniform:this.uniforms},currentColor:{texture:(e?this.compactCurrent:this.fullCurrent).textures[0]},currentMotion:{texture:(e?this.compactCurrent:this.fullCurrent).textures[1]},...e?{}:{currentInfo:{texture:this.fullCurrent.textures[2]}},stableFluid:{texture:(e?this.compactCurrent:this.fullCurrent).textures[e?2:3]},surfaceDepth:{texture:()=>this.surfaceDepth||this.emptySurfaceDepth},historyColor:{texture:this.history[t].textures[0]},historyInfo:{texture:this.history[t].textures[1]},...s?{surfaceObjectColor:{texture:()=>this.surfaceInputs?.color||this.current.texture},surfaceObjectMotion:{texture:()=>this.surfaceInputs?.motion||this.current.textures[1]},surfaceObjectDepth:{texture:()=>this.surfaceInputs?.depth||this.emptySurfaceDepth}}:{},...c?{surfaceCoverage:{texture:this.surfaceCoverage}}:{},...p?{backgroundDisplayCache:{texture:this.backgroundDisplayCache}}:{}},code:hi(fi+`
#if AA_GATHER_SURFACE_INFO
fn classifyGather(depth:f32,p:vec2i,closest:ptr<function,vec4f>,closestPixel:ptr<function,vec2i>,foregroundMin:ptr<function,f32>,foregroundMax:ptr<function,f32>) {
  let kind=select(select(1.0,0.0,depth==60000.0),2.0,depth<0.0);
  let info=vec4f(abs(depth),kind,0.0,0.0);
  if(info.y==1.0) { *foregroundMin=min(*foregroundMin,info.x);*foregroundMax=max(*foregroundMax,info.x); }
  if(info.x<(*closest).x) { *closest=info;*closestPixel=p; }
}
fn gatherSourceInfo(center:vec2i,size:vec2f,closest:ptr<function,vec4f>,closestPixel:ptr<function,vec2i>,foregroundMin:ptr<function,f32>,foregroundMax:ptr<function,f32>) {
  // WGSL gather order is lower-left,lower-right,upper-right,upper-left.
  // At each source texel junction these four footprints cover3x3 exactly.
  let g00=textureGather(3,currentColor,smpNearestClamp,(vec2f(center)+vec2f(0.0,0.0))/size);
  let g01=textureGather(3,currentColor,smpNearestClamp,(vec2f(center)+vec2f(1.0,0.0))/size);
  let g10=textureGather(3,currentColor,smpNearestClamp,(vec2f(center)+vec2f(0.0,1.0))/size);
  let g11=textureGather(3,currentColor,smpNearestClamp,(vec2f(center)+vec2f(1.0,1.0))/size);
  classifyGather(g00.w,center+vec2i(-1,-1),closest,closestPixel,foregroundMin,foregroundMax);
  classifyGather(g00.z,center+vec2i(0,-1),closest,closestPixel,foregroundMin,foregroundMax);
  classifyGather(g01.z,center+vec2i(1,-1),closest,closestPixel,foregroundMin,foregroundMax);
  classifyGather(g00.x,center+vec2i(-1,0),closest,closestPixel,foregroundMin,foregroundMax);
  classifyGather(g00.y,center+vec2i(0,0),closest,closestPixel,foregroundMin,foregroundMax);
  classifyGather(g01.y,center+vec2i(1,0),closest,closestPixel,foregroundMin,foregroundMax);
  classifyGather(g10.x,center+vec2i(-1,1),closest,closestPixel,foregroundMin,foregroundMax);
  classifyGather(g10.y,center+vec2i(0,1),closest,closestPixel,foregroundMin,foregroundMax);
  classifyGather(g11.y,center+vec2i(1,1),closest,closestPixel,foregroundMin,foregroundMax);
}
#endif
#if AA_SPARSE_SURFACE
fn tileCoverage(tile:vec2i) -> u32 {
  return u32(round(textureLoad(surfaceCoverage,tile,0).r*255.0));
}
fn sparseInfo(center:vec2i,size:vec2i) -> vec4f {
  // Five source texels cover classification plus the additional bilinear
  // support of composed RGB. Object-free proof is deliberately conservative.
  let first=clamp(center-vec2i(2),vec2i(0),size-1)/8;
  let last=clamp(center+vec2i(2),vec2i(0),size-1)/8;
  var coverage=tileCoverage(first);
  if(last.x!=first.x) { coverage=coverage|tileCoverage(vec2i(last.x,first.y)); }
  if(last.y!=first.y) { coverage=coverage|tileCoverage(vec2i(first.x,last.y)); }
  if(all(last!=first)) { coverage=coverage|tileCoverage(last); }
  if((coverage&1u)!=0u) { return vec4f(0.0,-1.0,0.0,0.0); }
  // No surface anywhere in this guarded support means every old composed
  // RGB sample is the same half-float background. Geometry cannot be hidden
  // by the shortcut, and basin-edge cases remain on the full resolve path.
  if((coverage&2u)==0u) { return vec4f(60000.0,0.0,0.0,0.0); }
  var depth=0.0;
  for(var y=-1;y<=1;y++) { for(var x=-1;x<=1;x++) {
    depth=max(depth,textureLoad(surfaceDepth,clamp(center+vec2i(x,y),vec2i(0),size-1),0));
  } }
  if(depth<=0.0) { return vec4f(0.0,-1.0,0.0,0.0); }
  // Reversed depth is monotonic. Max raw depth gives the same minimum
  // half-float view distance as the original nine ordered metadata samples.
  return vec4f(unpack2x16float(pack2x16float(vec2f(viewDepth(depth),2.0))),0.0,0.0);
}
#endif
#if AA_FUSED_SURFACE
fn half4(c:vec4f) -> vec4f {
  return vec4f(unpack2x16float(pack2x16float(c.xy)),unpack2x16float(pack2x16float(c.zw)));
}
fn sourceStableUV(p:vec2i) -> vec2f {
  let uv=(vec2f(p)+.5)/vec2f(textureDimensions(currentColor));
  return uv+aa.jitter*frame.invResolution;
}
// xy retains the old composed half-float depth/class. z records whether the
// real object wins the original reversed-depth comparison; RGB is deferred.
fn sourceMetadata(p:vec2i) -> vec4f {
  let uv=(vec2f(p)+.5)/vec2f(textureDimensions(currentColor));
  let stableUV=sourceStableUV(p);
  let waterPixel=vec2i(clamp(stableUV,vec2f(0.0),vec2f(.99999))*vec2f(textureDimensions(surfaceDepth)));
  let waterDepth=textureLoad(surfaceDepth,waterPixel,0);
  var info=vec2f(60000.0,0.0);
  if(waterDepth>0.0) { info=vec2f(viewDepth(waterDepth),2.0); }
  if(any(stableUV<aa.foregroundRect.xy)||any(stableUV>aa.foregroundRect.zw)) {
    return vec4f(unpack2x16float(pack2x16float(info)),0.0,0.0);
  }
  let objectPixel=vec2i(clamp(uv,vec2f(0.0),vec2f(.99999))*vec2f(textureDimensions(surfaceObjectDepth)));
  let objectDepth=textureLoad(surfaceObjectDepth,objectPixel,0);
  if(objectDepth>waterDepth&&objectDepth>0.0) {
    return vec4f(unpack2x16float(pack2x16float(vec2f(viewDepth(objectDepth),1.0))),1.0,0.0);
  }
  return vec4f(unpack2x16float(pack2x16float(info)),0.0,0.0);
}
fn sourceRGB(p:vec2i,foreground:f32) -> vec3f {
  let stableUV=sourceStableUV(p);
  if(foreground>.5) {
    let uv=(vec2f(p)+.5)/vec2f(textureDimensions(currentColor));
    let objectPixel=vec2i(clamp(uv,vec2f(0.0),vec2f(.99999))*vec2f(textureDimensions(surfaceObjectDepth)));
    let color=textureLoad(surfaceObjectColor,objectPixel,0);
    if(color.a==1.0) { return color.rgb; }
    let water=textureSampleLevel(stableFluid,smpLinearClamp,stableUV,0.0).rgb;
    return half4(vec4f(color.rgb+water*(1.0-color.a),1.0)).rgb;
  }
  return half4(vec4f(textureSampleLevel(stableFluid,smpLinearClamp,stableUV,0.0).rgb,1.0)).rgb;
}
#if AA_FUSED_OPAQUE_HARDWARE
fn sourceRGBAndOpacity(p:vec2i,foreground:f32) -> vec4f {
  let stableUV=sourceStableUV(p);
  if(foreground>.5) {
    let uv=(vec2f(p)+.5)/vec2f(textureDimensions(currentColor));
    let objectPixel=vec2i(clamp(uv,vec2f(0.0),vec2f(.99999))*vec2f(textureDimensions(surfaceObjectDepth)));
    let color=textureLoad(surfaceObjectColor,objectPixel,0);
    if(color.a==1.0) { return color; }
    let water=textureSampleLevel(stableFluid,smpLinearClamp,stableUV,0.0).rgb;
    return vec4f(half4(vec4f(color.rgb+water*(1.0-color.a),1.0)).rgb,color.a);
  }
  return vec4f(half4(vec4f(textureSampleLevel(stableFluid,smpLinearClamp,stableUV,0.0).rgb,1.0)).rgb,0.0);
}
#endif
fn sourceMotion(p:vec2i) -> vec4f {
  let info=sourceMetadata(p);
  if(info.z<.5) { return half4(vec4f(0.0,0.0,info.x,select(0.0,.8,info.y==2.0))); }
  let uv=(vec2f(p)+.5)/vec2f(textureDimensions(currentColor));
  let objectPixel=vec2i(clamp(uv,vec2f(0.0),vec2f(.99999))*vec2f(textureDimensions(surfaceObjectDepth)));
  let color=textureLoad(surfaceObjectColor,objectPixel,0);
  let motion=textureLoad(surfaceObjectMotion,objectPixel,0);
  return half4(vec4f(motion.xyz/max(.001,motion.w),select(.02,.8,color.a<.98)));
}
// All four spatial footprints fit this same 3x3 source neighbourhood when
// source/output scale is at most two, including rounded small dimensions.
fn classifySource(p:vec2i,closest:ptr<function,vec4f>,closestPixel:ptr<function,vec2i>,foregroundMin:ptr<function,f32>,foregroundMax:ptr<function,f32>) -> f32 {
  let metadata=sourceMetadata(p);
  let info=vec4f(metadata.xy,0.0,0.0);
  if(info.y==1.0) { *foregroundMin=min(*foregroundMin,info.x);*foregroundMax=max(*foregroundMax,info.x); }
  if(info.x<(*closest).x) { *closest=info;*closestPixel=p; }
  return metadata.z;
}
fn accumulateSource(raw:vec3f,lo:ptr<function,vec3f>,hi:ptr<function,vec3f>,sum:ptr<function,vec3f>,sum2:ptr<function,vec3f>) {
  let c=toYCoCg(compressed(raw));
  *lo=min(*lo,c);*hi=max(*hi,c);*sum+=c;*sum2+=c*c;
}
fn sourceBilinear(uv:vec2f,size:vec2f,center:vec2i,c00:vec3f,c01:vec3f,c02:vec3f,c10:vec3f,c11:vec3f,c12:vec3f,c20:vec3f,c21:vec3f,c22:vec3f) -> vec3f {
  let p=uv*size-.5;
  let base=vec2i(floor(p));let f=fract(p);
  let local=clamp(base-center+vec2i(1),vec2i(0),vec2i(1));
  let right=local.x!=0;let bottom=local.y!=0;
  let a=select(select(c00,c01,right),select(c10,c11,right),bottom);
  let b=select(select(c01,c02,right),select(c11,c12,right),bottom);
  let c=select(select(c10,c11,right),select(c20,c21,right),bottom);
  let d=select(select(c11,c12,right),select(c21,c22,right),bottom);
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
}
#endif
fn loadInfo(p: vec2i) -> vec4f {
#if AA_FUSED_SURFACE
  if(aa.fusedSurface>.5) { return vec4f(sourceMetadata(p).xy,0.0,0.0); }
#endif
#if AA_COMPACT
#if AA_SIGNED_SURFACE_DEPTH
  if(aa.signedSurfaceDepth>.5) {
    // The original positive half-float magnitude retains every depth bit.
    // Sign marks water;60000 is the existing unreachable empty sentinel.
    let depth=textureLoad(currentColor,p,0).a;
    let kind=select(select(1.0,0.0,depth==60000.0),2.0,depth<0.0);
    return vec4f(abs(depth),kind,0.0,0.0);
  }
#endif
  return vec4f(textureLoad(currentColor,p,0).a,abs(textureLoad(currentMotion,p,0).w),0.0,0.0);
#else
  return textureLoad(currentInfo,p,0);
#endif
}
fn loadMotion(p: vec2i) -> vec4f {
#if AA_FUSED_SURFACE
  if(aa.fusedSurface>.5) { return sourceMotion(p); }
#endif
  let motion=textureLoad(currentMotion,p,0);
#if AA_COMPACT
  // Reconstruct the exact half-float values previously stored by the mobile
  // compositor: +1 opaque foreground, -1 reactive foreground, +2 fluid, 0 empty.
  let reactive=select(select(0.0,0.0200042724609375,motion.w==1.0),0.7998046875,motion.w<0.0||motion.w==2.0);
  return vec4f(motion.xyz,reactive);
#else
  return motion;
#endif
}
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
struct AAOut { @location(0) color: vec4f, @location(1) info: vec4f,
#if AA_DIRECT_DISPLAY
  @location(2) display: vec4f,
#endif
};
fn resolved(color: vec4f,info: vec4f) -> AAOut {
#if AA_DIRECT_DISPLAY
  // Match the half-float history round-trip of the former display pass. This
  // retains HDR temporal history while displaying it in the same render pass.
  let rg=unpack2x16float(pack2x16float(color.rg));
  let ba=unpack2x16float(pack2x16float(color.ba));
  return AAOut(color,info,vec4f(resolvedDisplayColor(vec3f(rg,ba.x),info.y),1.0));
#else
  return AAOut(color,info);
#endif
}
fn resolvedFluid(uv: vec2f,info: vec4f) -> AAOut {
  let inverseSize=1.0/vec2f(textureDimensions(historyColor));
#if AA_HALF_COLOR_RESOLVE
  if(info.y==2.0) {
    var halfFluid=vec3h(0.0);
    for(var i=0;i<4;i++) {
      let offset=(vec2f(f32(i%2),f32(i/2))-.5)*.5;
      // Quarter each finite source before accumulation, avoiding HDR sum
      // overflow without clipping. Background retains the original FP32 path.
      halfFluid+=vec3h(textureSampleLevel(stableFluid,smpLinearClamp,uv+offset*inverseSize,0.0).rgb*.25);
    }
    return resolved(vec4f(vec3f(halfFluid),1.0),info);
  }
#endif
  var fluid=vec3f(0.0);
  for(var i=0;i<4;i++) {
    let offset=(vec2f(f32(i%2),f32(i/2))-.5)*.5;
    fluid+=textureSampleLevel(stableFluid,smpLinearClamp,uv+offset*inverseSize,0.0).rgb;
  }
  return resolved(vec4f(fluid*.25,1.0),info);
}
@fragment fn fs(in: FSIn) -> AAOut {
  let size = vec2i(textureDimensions(currentColor)); let sf = vec2f(size);
  let outsideForeground=any(in.uv<aa.foregroundRect.xy)||any(in.uv>aa.foregroundRect.zw);
  if(aa.surfaceOnly>.5&&outsideForeground) {
    // These pixels cannot contain any current foreground mesh. Surface color
    // is already unjittered; retain the exact four spatial taps and skip yacht
    // metadata, variance and temporal-history work, including on beige pixels.
    let q=clamp(vec2i(in.uv*sf),vec2i(0),size-1);
    let depth=textureLoad(surfaceDepth,q,0);
    var info=vec4f(60000.0,0.0,0.0,0.0);
    if(depth>0.0) { info=vec4f(viewDepth(depth),2.0,0.0,0.0); }
    return resolvedFluid(in.uv,info);
  }
  let p = in.uv*sf-aa.jitter;
  let center = vec2i(floor(p));
#if AA_SPARSE_SURFACE
  if(aa.sparseSurface>.5) {
    let info=sparseInfo(center,size);
    if(info.y>=0.0) { return resolvedFluid(in.uv,info); }
  }
#endif
  let centralInfo=loadInfo(clamp(center,vec2i(0),size-1));
  if(outsideForeground&&centralInfo.y==2.0) { return resolvedFluid(in.uv,centralInfo); }
  var lo = vec3f(1e5); var hi = vec3f(-1e5); var sum = vec3f(0.0); var sum2 = vec3f(0.0);
  var closest = vec4f(1e5,0.0,0.0,0.0);var closestPixel=center;
  var foregroundMin=1e5; var foregroundMax=0.0;
#if AA_FUSED_SURFACE
  var f00:f32;var c00:vec3f;
  var f01:f32;var c01:vec3f;
  var f02:f32;var c02:vec3f;
  var f10:f32;var c10:vec3f;
  var f11:f32;var c11:vec3f;
  var f12:f32;var c12:vec3f;
  var f20:f32;var c20:vec3f;
  var f21:f32;var c21:vec3f;
  var f22:f32;var c22:vec3f;
#if AA_FUSED_OPAQUE_HARDWARE
  var allOpaque=false;
#endif
  if(aa.fusedSurface>.5) {
    f00=classifySource(clamp(center+vec2i(-1,-1),vec2i(0),size-1),&closest,&closestPixel,&foregroundMin,&foregroundMax);
    f01=classifySource(clamp(center+vec2i(0,-1),vec2i(0),size-1),&closest,&closestPixel,&foregroundMin,&foregroundMax);
    f02=classifySource(clamp(center+vec2i(1,-1),vec2i(0),size-1),&closest,&closestPixel,&foregroundMin,&foregroundMax);
    f10=classifySource(clamp(center+vec2i(-1,0),vec2i(0),size-1),&closest,&closestPixel,&foregroundMin,&foregroundMax);
    f11=classifySource(clamp(center+vec2i(0,0),vec2i(0),size-1),&closest,&closestPixel,&foregroundMin,&foregroundMax);
    f12=classifySource(clamp(center+vec2i(1,0),vec2i(0),size-1),&closest,&closestPixel,&foregroundMin,&foregroundMax);
    f20=classifySource(clamp(center+vec2i(-1,1),vec2i(0),size-1),&closest,&closestPixel,&foregroundMin,&foregroundMax);
    f21=classifySource(clamp(center+vec2i(0,1),vec2i(0),size-1),&closest,&closestPixel,&foregroundMin,&foregroundMax);
    f22=classifySource(clamp(center+vec2i(1,1),vec2i(0),size-1),&closest,&closestPixel,&foregroundMin,&foregroundMax);
  } else {
#endif
#if AA_GATHER_SURFACE_INFO
  if(aa.gatherSurfaceInfo>.5&&all(center>=vec2i(1))&&all(center<size-vec2i(1))) {
    gatherSourceInfo(center,sf,&closest,&closestPixel,&foregroundMin,&foregroundMax);
  } else {
#endif
  // Foreground dilation preserves narrow railings when the camera or hull moves.
  for (var y=-1; y<=1; y++) { for (var x=-1; x<=1; x++) {
    let q = clamp(center+vec2i(x,y),vec2i(0),size-1);
    let info=loadInfo(q);
    if (info.y==1.0) { foregroundMin=min(foregroundMin,info.x); foregroundMax=max(foregroundMax,info.x); }
    if (info.x < closest.x) { closest=info;closestPixel=q; }
  } }
#if AA_GATHER_SURFACE_INFO
  }
#endif
#if AA_FUSED_SURFACE
  }
#endif
  if (closest.y==2.0) {
    // A stable, unjittered spatial resolve for independently moving optical
    // features. History from a previous wave/glint cannot form a trailing image.
    return resolvedFluid(in.uv,closest);
  }
  let motion=loadMotion(closestPixel);
  // Most mobile pixels are water. They need no color variance/history work.
#if AA_FUSED_SURFACE
  if(aa.fusedSurface>.5) {
#if AA_FUSED_OPAQUE_HARDWARE
    allOpaque=true;
    let rgba00=sourceRGBAndOpacity(clamp(center+vec2i(-1,-1),vec2i(0),size-1),f00);
    c00=rgba00.rgb;allOpaque=allOpaque&&rgba00.a==1.0;
    accumulateSource(c00,&lo,&hi,&sum,&sum2);
    let rgba01=sourceRGBAndOpacity(clamp(center+vec2i(0,-1),vec2i(0),size-1),f01);
    c01=rgba01.rgb;allOpaque=allOpaque&&rgba01.a==1.0;
    accumulateSource(c01,&lo,&hi,&sum,&sum2);
    let rgba02=sourceRGBAndOpacity(clamp(center+vec2i(1,-1),vec2i(0),size-1),f02);
    c02=rgba02.rgb;allOpaque=allOpaque&&rgba02.a==1.0;
    accumulateSource(c02,&lo,&hi,&sum,&sum2);
    let rgba10=sourceRGBAndOpacity(clamp(center+vec2i(-1,0),vec2i(0),size-1),f10);
    c10=rgba10.rgb;allOpaque=allOpaque&&rgba10.a==1.0;
    accumulateSource(c10,&lo,&hi,&sum,&sum2);
    let rgba11=sourceRGBAndOpacity(clamp(center+vec2i(0,0),vec2i(0),size-1),f11);
    c11=rgba11.rgb;allOpaque=allOpaque&&rgba11.a==1.0;
    accumulateSource(c11,&lo,&hi,&sum,&sum2);
    let rgba12=sourceRGBAndOpacity(clamp(center+vec2i(1,0),vec2i(0),size-1),f12);
    c12=rgba12.rgb;allOpaque=allOpaque&&rgba12.a==1.0;
    accumulateSource(c12,&lo,&hi,&sum,&sum2);
    let rgba20=sourceRGBAndOpacity(clamp(center+vec2i(-1,1),vec2i(0),size-1),f20);
    c20=rgba20.rgb;allOpaque=allOpaque&&rgba20.a==1.0;
    accumulateSource(c20,&lo,&hi,&sum,&sum2);
    let rgba21=sourceRGBAndOpacity(clamp(center+vec2i(0,1),vec2i(0),size-1),f21);
    c21=rgba21.rgb;allOpaque=allOpaque&&rgba21.a==1.0;
    accumulateSource(c21,&lo,&hi,&sum,&sum2);
    let rgba22=sourceRGBAndOpacity(clamp(center+vec2i(1,1),vec2i(0),size-1),f22);
    c22=rgba22.rgb;allOpaque=allOpaque&&rgba22.a==1.0;
    accumulateSource(c22,&lo,&hi,&sum,&sum2);
#else
    c00=sourceRGB(clamp(center+vec2i(-1,-1),vec2i(0),size-1),f00);
    accumulateSource(c00,&lo,&hi,&sum,&sum2);
    c01=sourceRGB(clamp(center+vec2i(0,-1),vec2i(0),size-1),f01);
    accumulateSource(c01,&lo,&hi,&sum,&sum2);
    c02=sourceRGB(clamp(center+vec2i(1,-1),vec2i(0),size-1),f02);
    accumulateSource(c02,&lo,&hi,&sum,&sum2);
    c10=sourceRGB(clamp(center+vec2i(-1,0),vec2i(0),size-1),f10);
    accumulateSource(c10,&lo,&hi,&sum,&sum2);
    c11=sourceRGB(clamp(center+vec2i(0,0),vec2i(0),size-1),f11);
    accumulateSource(c11,&lo,&hi,&sum,&sum2);
    c12=sourceRGB(clamp(center+vec2i(1,0),vec2i(0),size-1),f12);
    accumulateSource(c12,&lo,&hi,&sum,&sum2);
    c20=sourceRGB(clamp(center+vec2i(-1,1),vec2i(0),size-1),f20);
    accumulateSource(c20,&lo,&hi,&sum,&sum2);
    c21=sourceRGB(clamp(center+vec2i(0,1),vec2i(0),size-1),f21);
    accumulateSource(c21,&lo,&hi,&sum,&sum2);
    c22=sourceRGB(clamp(center+vec2i(1,1),vec2i(0),size-1),f22);
    accumulateSource(c22,&lo,&hi,&sum,&sum2);
#endif
  } else {
#endif
  for (var y=-1; y<=1; y++) { for (var x=-1; x<=1; x++) {
    let q=clamp(center+vec2i(x,y),vec2i(0),size-1);
    let c=toYCoCg(compressed(textureLoad(currentColor,q,0).rgb));
    lo=min(lo,c);hi=max(hi,c);sum+=c;sum2+=c*c;
  } }
#if AA_FUSED_SURFACE
  }
#endif
  // Integrate the output pixel footprint instead of sharply reconstructing a
  // point from a denser grid. This prevents phase-dependent edge ringing.
  let inverseOutput=1.0/vec2f(textureDimensions(historyColor));
  var reconstructed=vec3f(0.0);
#if AA_HALF_COLOR_RESOLVE
  if(closest.y==1.0) {
    var halfReconstructed=vec3h(0.0);
    for(var i=0;i<4;i++) {
      let offset=(vec2f(f32(i%2),f32(i/2))-.5)*.5;
      halfReconstructed+=vec3h(textureSampleLevel(currentColor,smpLinearClamp,in.uv-aa.jitter/sf+offset*inverseOutput,0.0).rgb*.25);
    }
    reconstructed=vec3f(halfReconstructed);
  } else {
#endif
  for (var i=0;i<4;i++) {
    let offset=(vec2f(f32(i%2),f32(i/2))-.5)*.5;
#if AA_FUSED_SURFACE
    if(aa.fusedSurface>.5) {
#if AA_FUSED_OPAQUE_HARDWARE
      if(allOpaque) {
        // All9 source values equal opaque object RGB exactly. The original
        // hardware bilinear footprint therefore needs no manual composition.
        reconstructed+=textureSampleLevel(surfaceObjectColor,smpLinearClamp,in.uv-aa.jitter/sf+offset*inverseOutput,0.0).rgb*.25;
      } else {
#endif
      reconstructed+=sourceBilinear(in.uv-aa.jitter/sf+offset*inverseOutput,sf,center,c00,c01,c02,c10,c11,c12,c20,c21,c22)*.25;
#if AA_FUSED_OPAQUE_HARDWARE
      }
#endif
    } else { reconstructed+=textureSampleLevel(currentColor,smpLinearClamp,in.uv-aa.jitter/sf+offset*inverseOutput,0.0).rgb*.25; }
#else
    reconstructed+=textureSampleLevel(currentColor,smpLinearClamp,in.uv-aa.jitter/sf+offset*inverseOutput,0.0).rgb*.25;
#endif
  }
#if AA_HALF_COLOR_RESOLVE
  }
#endif
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
  let boundary=centralInfo.y!=closest.y;
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
#if AA_HALF_COLOR_RESOLVE
  var mixed=mix(current,history,weight);
  if(closest.y==1.0&&weight>0.0) {
    // The history weight and both weighted terms remain FP32. Round only the
    // three colour contributions and their sum, never depth, moments or age.
    mixed=vec3f(vec3h(current*(1.0-weight))+vec3h(history*weight));
  }
  let color=vec4f(max(expanded(max(fromYCoCg(mixed),vec3f(0.0))),vec3f(0.0)),select(1.0,min(age+1.0,limit),valid));
#else
  let color=vec4f(max(expanded(max(fromYCoCg(mix(current,history,weight)),vec3f(0.0))),vec3f(0.0)),select(1.0,min(age+1.0,limit),valid));
#endif
  return resolved(color,closest);
}
`,r!==`original`,r===`direct`)});this.resolveVariants=[!1,!0].map(e=>[0,1].map(t=>x(e,t))),this.cropResolveVariants=g?[0,1].map(e=>x(!0,e,`wrapped`)):null,this.directCropResolveVariants=g&&_?[0,1].map(e=>x(!0,e,`direct`)):null,this.surfaceFluidResolveVariants=m?[!1,!0].map(e=>new er({label:`Specialized Surface fluid MRT resolve`,colorFormats:n?[`rgba16float`,`rg16float`,P.format]:[`rgba16float`,`rg16float`],defines:{AA_DIRECT_DISPLAY:+!!n,AA_FILMIC:+!!i,AA_CACHED_BACKGROUND_DISPLAY:+!!p,AA_PARTITIONED_SURFACE:+!!h,AA_HALF_COLOR_RESOLVE:+!!this.halfColorResolve,F16:+!!this.halfColorResolve},bindings:{aa:{uniform:this.uniforms},stableFluid:{texture:(e?this.compactCurrent:this.fullCurrent).textures[e?2:3]},surfaceDepth:{texture:()=>this.surfaceDepth||this.emptySurfaceDepth},...p?{backgroundDisplayCache:{texture:this.backgroundDisplayCache}}:{}},code:fi+`
struct SurfaceFluidOut { @location(0) color:vec4f,@location(1) info:vec4f,
#if AA_DIRECT_DISPLAY
  @location(2) display:vec4f,
#endif
};
@fragment fn fs(in:FSIn) -> SurfaceFluidOut {
#if !AA_PARTITIONED_SURFACE
  let outside=any(in.uv<aa.foregroundRect.xy)||any(in.uv>aa.foregroundRect.zw);
  if(!outside) { discard; }
#endif
  // Match the original early Surface branch: one unjittered surface-depth
  // sample, then the same four output-footprint fluid taps. Foreground keeps
  // the original nine-sample classification in the temporal pipeline below.
  let size=vec2i(textureDimensions(surfaceDepth));
  let q=clamp(vec2i(in.uv*vec2f(size)),vec2i(0),size-1);
  let depth=textureLoad(surfaceDepth,q,0);
  var info=vec4f(60000.0,0.0,0.0,0.0);
  if(depth>0.0) { info=vec4f(viewDepth(depth),2.0,0.0,0.0); }
  let inverseSize=1.0/aa.outputSize;
#if AA_HALF_COLOR_RESOLVE
  if(info.y==2.0) {
    var halfFluid=vec3h(0.0);
    for(var i=0;i<4;i++) {
      let offset=(vec2f(f32(i%2),f32(i/2))-.5)*.5;
      halfFluid+=vec3h(textureSampleLevel(stableFluid,smpLinearClamp,in.uv+offset*inverseSize,0.0).rgb*.25);
    }
    let color=vec4f(vec3f(halfFluid),1.0);
#if AA_DIRECT_DISPLAY
    let rg=unpack2x16float(pack2x16float(color.rg));let ba=unpack2x16float(pack2x16float(color.ba));
    return SurfaceFluidOut(color,info,vec4f(resolvedDisplayColor(vec3f(rg,ba.x),info.y),1.0));
#else
    return SurfaceFluidOut(color,info);
#endif
  }
#endif
  var fluid=vec3f(0.0);
  for(var i=0;i<4;i++) {
    let offset=(vec2f(f32(i%2),f32(i/2))-.5)*.5;
    fluid+=textureSampleLevel(stableFluid,smpLinearClamp,in.uv+offset*inverseSize,0.0).rgb;
  }
  let color=vec4f(fluid*.25,1.0);
#if AA_DIRECT_DISPLAY
  let rg=unpack2x16float(pack2x16float(color.rg));
  let ba=unpack2x16float(pack2x16float(color.ba));
  return SurfaceFluidOut(color,info,vec4f(resolvedDisplayColor(vec3f(rg,ba.x),info.y),1.0));
#else
  return SurfaceFluidOut(color,info);
#endif
}
`})):null,this.surfaceCoveragePass=c?new er({label:`Conservative8x8 object and surface coverage`,colorFormats:[`r8unorm`],bindings:{coverageObjectDepth:{texture:()=>this.surfaceInputs?.depth||this.emptySurfaceDepth},coverageSurfaceDepth:{texture:()=>this.surfaceDepth||this.emptySurfaceDepth}},code:`
fn fragment(in:FSIn) -> vec4f {
  let size=vec2i(textureDimensions(coverageObjectDepth));
  let start=vec2i(in.pos.xy)*8;
  for(var y=0;y<8;y++) { for(var x=0;x<8;x++) {
    let p=start+vec2i(x,y);
    if(all(p<size)&&textureLoad(coverageObjectDepth,p,0)>0.0) { return vec4f(1.0/255.0,0.0,0.0,1.0); }
  } }
  for(var y=0;y<8;y++) { for(var x=0;x<8;x++) {
    let p=start+vec2i(x,y);
    if(all(p<size)&&textureLoad(coverageSurfaceDepth,p,0)>0.0) { return vec4f(2.0/255.0,0.0,0.0,1.0); }
  } }
  return vec4f(0.0,0.0,0.0,1.0);
}
`}):null,this.surfaceDisplayVariants=o?[!1,!0].map(e=>new er({label:`Independent Surface display without temporal history`,colorFormats:[P.format],defines:{AA_FILMIC:+!!i,AA_CACHED_BACKGROUND_DISPLAY:+!!p},bindings:{aa:{uniform:this.uniforms},stableFluid:{texture:(e?this.compactCurrent:this.fullCurrent).textures[e?2:3]},...p?{backgroundDisplayCache:{texture:this.backgroundDisplayCache}}:{}},code:fi+`
fn fragment(in:FSIn) -> vec4f {
  let outside=any(in.uv<aa.foregroundRect.xy)||any(in.uv>aa.foregroundRect.zw);
  if(!outside) { discard; }
  let inverseOutput=1.0/aa.outputSize;
  var fluid=vec3f(0.0);
  for(var i=0;i<4;i++) {
    let offset=(vec2f(f32(i%2),f32(i/2))-.5)*.5;
    fluid+=textureSampleLevel(stableFluid,smpLinearClamp,in.uv+offset*inverseOutput,0.0).rgb;
  }
  let roundedFluid=vec4f(unpack2x16float(pack2x16float(vec4f(fluid*.25,1.0).rg)),unpack2x16float(pack2x16float(vec4f(fluid*.25,1.0).ba)));
  return vec4f(resolvedDisplayColor(roundedFluid.rgb,0.0),1.0);
}
`})):null,this.present=new er({label:`Water AA display`,bindings:{color:{texture:()=>this.enabled?this.history[this.index].texture:this.current.texture},aa:{uniform:this.uniforms}},defines:{AA_FILMIC:+!!i},code:ui+`fn fragment(in: FSIn) -> vec4f {
        let c=max(textureSampleLevel(color,smpLinearClamp,in.uv,0.0).rgb,vec3f(0.0));
#if AA_FILMIC
        return vec4f(linearToSrgb(acesFilmicToneMapping(c,aa.displayExposure)),1.0);
#else
        return vec4f(linearToSrgb(c),1.0);
#endif
      }`,colorFormats:[P.format]})}get current(){return this.compact?this.compactCurrent:this.fullCurrent}get resolve(){return this.surfaceCrop?this.croppedSurfaceDirectLoadsActive?this.directCropResolveVariants:this.cropResolveVariants:this.resolveVariants[+!!this.compact]}get fluidTexture(){return this.current.textures[this.compact?2:3]}get surfaceDisplay(){return this.surfaceDisplayVariants?.[+!!this.compact]||null}get surfaceFluidResolve(){return this.surfaceFluidResolveVariants?.[+!!this.compact]||null}get surfaceCrop(){return this._surfaceCrop}get croppedSurfaceDirectLoadsActive(){let e=this.stats.output;if(!this.croppedSurfaceDirectLoads||!this.surfaceCrop||!this.partitionedSurfaceAAActive||!e)return!1;let t=this.uniforms.fields.foregroundRect.value,n=this.uniforms.fields.jitter.value,r=yi([t.x,t.y,t.z,t.w],...e);return _i(this.surfaceCrop,r,[this.current.width,this.current.height],e,[n.x,n.y])}setSurfaceCrop(e){let t=this.current,n=this.croppedSurfaceComposite&&this.enabled&&this.compact&&this.uniforms.fields.surfaceOnly.value>.5?gi(e,t.width,t.height):null,r=this._surfaceCrop;n&&!n.empty&&r&&!r.empty&&n.origin.every((e,t)=>e>=r.origin[t]&&e+n.size[t]<=r.origin[t]+r.size[t])&&(n=r),this._surfaceCrop=n;let i=n?.origin||[0,0],a=n?.size||[t.width,t.height];t.textures[0].resize(...a),t.textures[1].resize(...a),this.uniforms.fields.sourceSize.value.set(t.width,t.height),this.uniforms.fields.surfaceCrop.value.set(...i,...a),this.uniforms.set(`surfaceCropActive`,+!!n),this.stats.croppedSurfaceComposite=!!n,this.stats.surfaceCrop=n?{origin:[...i],size:[...a],empty:n.empty}:null,this.stats.sourceColorMotionPixels=a[0]*a[1]}setSurfaceInputs(e){this.surfaceInputs=e}get fusedSurfaceCompositionActive(){let e=this.stats.output;return!!(this.fusedSurfaceComposition&&this.enabled&&!this.surfaceCrop&&this.uniforms.fields.surfaceOnly.value>.5&&this.surfaceInputs&&e&&this.current.width<=e[0]*2&&this.current.height<=e[1]*2)}get sparseSurfaceAAActive(){let e=this.stats.output;return!!(this.sparseSurfaceAA&&this.enabled&&!this.surfaceCrop&&this.uniforms.fields.surfaceOnly.value>.5&&this.surfaceInputs?.depth&&e&&this.current.width<=e[0]*2&&this.current.height<=e[1]*2)}get signedSurfaceDepthActive(){return!!(this.signedSurfaceDepth&&this.compact&&this.enabled&&this.uniforms.fields.surfaceOnly.value>.5)}get gatherSurfaceInfoActive(){return!(!this.gatherSurfaceInfo||!this.signedSurfaceDepthActive||this.fusedSurfaceCompositionActive||this.surfaceCrop)}get specializedSurfaceAAActive(){return!!(this.specializedSurfaceAA&&this.enabled&&this.directDisplay&&!this.splitSurfaceHistory&&this.uniforms.fields.surfaceOnly.value>.5)}get partitionedSurfaceAAActive(){return!!(this.partitionedSurfaceAA&&this.specializedSurfaceAAActive)}renderSpecializedSurface({colorViews:e,clearColors:t,scissor:n,foregroundScissor:r}){let i=e.map(e=>e.isTexture?e.view({dimension:`2d`,mipLevelCount:1}):e),a=P.getEncoder().beginRenderPass({label:`Specialized Surface and temporal MRT resolve`,timestampWrites:this.resolve[this.index].timestampWrites,colorAttachments:i.map((e,n)=>({view:e,loadOp:`clear`,storeOp:`store`,clearValue:t[n]}))});if(this.partitionedSurfaceAAActive){let e=bi(n||[0,0,...this.stats.output],r);this.stats.fluidScissors=e.fluid;for(let t of e.fluid)a.setScissorRect(...t),this.surfaceFluidResolve.draw(a);r=e.foreground}else n&&a.setScissorRect(...n),this.surfaceFluidResolve.draw(a);r[2]>0&&r[3]>0&&(a.setScissorRect(...r),this.resolve[this.index].draw(a)),a.end()}updateBackgroundDisplayCache(e){let t=e?.slice(0,3),n=!!(this.cachedBackgroundDisplay&&this.enabled&&this.directDisplay&&this.uniforms.fields.surfaceOnly.value>.5&&t?.length===3&&t.every(Number.isFinite));if(this.stats.cachedBackgroundDisplay=n,this.uniforms.fields.cachedBackground.value.set(...t||[0,0,0],+!!n),!n)return;let r=[...t,this.uniforms.fields.displayExposure.value].map(Math.fround).join(`,`);r!==this.backgroundDisplayCacheKey&&(this.backgroundDisplayCachePass.render({colorViews:[this.backgroundDisplayCache],clear:[0,0,0,0]}),this.backgroundDisplayCacheKey=r,this.stats.backgroundDisplayCacheUpdates++)}setCompact(e){if(this.compact!==e){let t=this.current;this.compact=e,t.setSize(1,1),this._surfaceCrop=null,this.uniforms.set(`surfaceCropActive`,0),this.reset()}}reset(){this.needsReset=!0}begin(e,t,n,r){let i=this.enabled?Math.max(1,Math.min(this.sampleScale,Math.sqrt(4e6/(t*n)))):1;this.current.setSize(Math.ceil(t*i),Math.ceil(n*i))&&(this._surfaceCrop=null,this.uniforms.set(`surfaceCropActive`,0),this.reset()),this.uniforms.fields.sourceSize.value.set(this.current.width,this.current.height),this._surfaceCrop&&(!this.enabled||!this.compact)&&this.setSurfaceCrop(null),this.history[0].setSize(t,n)&&this.reset(),this.history[1].setSize(t,n),e.updateMatrixWorld(),e.matrixWorldInverse.copy(e.matrixWorld).invert();let a=e.matrixWorld.elements;if(this.uniforms.set(`inverseStableViewProj`,new y().multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse).invert()),this.cameraState){let t=this.cameraState,n=Math.hypot(a[12]-t[0],a[13]-t[1],a[14]-t[2]),i=Math.hypot(a[8]-t[3],a[9]-t[4],a[10]-t[5]);(n>5||i>.35||Math.abs(e.projectionMatrix.elements[5]-t[6])>.01||r<this.previousTime)&&this.reset()}this.cameraState=[a[12],a[13],a[14],a[8],a[9],a[10],e.projectionMatrix.elements[5]],this.uniforms.set(`previousView`,this.needsReset?e.matrixWorldInverse:this.previousView),this.uniforms.set(`previousViewProj`,this.needsReset?new y().multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse):this.previousViewProj),this.uniforms.set(`previousTime`,this.needsReset?r:this.previousTime),this.uniforms.set(`reset`,+!!this.needsReset);let o=this.filmic?.4:.6;return this.stats.jitterSpan=o,this.jitter=this.enabled?[(di(this.frame%16+1,2)-.5)*o,(di(this.frame%16+1,3)-.5)*o]:[0,0],this.uniforms.fields.jitter.value.set(...this.jitter),this.needsReset&&this.stats.resets++,this.stats.input=[this.current.width,this.current.height],this.stats.output=[t,n],this.uniforms.fields.outputSize.value.set(t,n),this.stats.directDisplay=this.enabled&&this.directDisplay,this.stats.filmic=this.filmic,this.stats.exposure=this.exposure,this.stats.compact=this.compact,this.stats.sourceBytesPerPixel=this.compact?24:28,this.jitter}finish(e,t,n,{scissor:r=null,background:i=null}={}){this.updateBackgroundDisplayCache(i),this.stats.halfColorResolve=this.halfColorResolve&&this.enabled,this.stats.croppedSurfaceDirectLoads=this.croppedSurfaceDirectLoadsActive;let a=this.fusedSurfaceCompositionActive;this.uniforms.set(`fusedSurface`,+!!a),this.stats.fusedSurfaceComposition=a,this.stats.fusedOpaqueHardware=a&&this.fusedOpaqueHardware;let o=this.signedSurfaceDepthActive;this.uniforms.set(`signedSurfaceDepth`,+!!o),this.stats.signedSurfaceDepth=o;let s=this.gatherSurfaceInfoActive;this.uniforms.set(`gatherSurfaceInfo`,+!!s),this.stats.gatherSurfaceInfo=s;let c=this.sparseSurfaceAAActive;if(this.uniforms.set(`sparseSurface`,+!!c),this.stats.sparseSurfaceAA=c,c){this.surfaceCoverage.resize(Math.ceil(this.current.width/8),Math.ceil(this.current.height/8));let e=this.uniforms.fields.foregroundRect.value,t=yi([e.x,e.y,e.z,e.w],this.surfaceCoverage.width,this.surfaceCoverage.height);this.stats.coverageSource=[this.surfaceCoverage.width,this.surfaceCoverage.height],this.stats.coverageScissor=t,this.surfaceCoveragePass.render({colorViews:[this.surfaceCoverage],clear:[0,0,0,0],scissor:t})}if(this.enabled){let e=1-this.index,t=(i||[0,0,0,1]).slice(0,3),a=[...(this.filmic?ie(t,this.exposure):t).map(e=>e<=.0031308?e*12.92:1.055*e**(1/2.4)-.055),1],o=this.splitSurfaceHistory&&this.directDisplay&&this.uniforms.fields.surfaceOnly.value>.5;this.stats.splitSurfaceHistory=o;let s=this.specializedSurfaceAAActive;if(this.stats.specializedSurfaceAA=s,this.stats.partitionedSurfaceAA=this.partitionedSurfaceAAActive,o){this.surfaceDisplay.render({colorViews:[n],clear:a,scissor:r});let t=this.uniforms.fields.foregroundRect.value,o=yi([t.x,t.y,t.z,t.w],this.history[e].width,this.history[e].height,r);this.stats.historyScissor=o,this.stats.historyFraction=o[2]*o[3]/(this.history[e].width*this.history[e].height),this.resolve[this.index].render({colorViews:[...this.history[e].textures,n],scissor:o,clearColors:[i||[0,0,0,0],[6e4,0,0,0],null]})}else if(s){let t=this.uniforms.fields.foregroundRect.value,o=yi([t.x,t.y,t.z,t.w],this.history[e].width,this.history[e].height,r);this.stats.historyScissor=r,this.stats.historyFraction=1,this.stats.temporalScissor=o,this.renderSpecializedSurface({colorViews:[...this.history[e].textures,n],scissor:r,foregroundScissor:o,clearColors:i?[i,[6e4,0,0,0],a]:[[0,0,0,0],[0,0,0,0],a]})}else this.stats.historyScissor=r,this.stats.historyFraction=1,this.resolve[this.index].render({colorViews:this.directDisplay?[...this.history[e].textures,n]:this.history[e].textures,clear:[0,0,0,0],scissor:r,clearColors:i?this.directDisplay?[i,[6e4,0,0,0],a]:[i,[6e4,0,0,0]]:this.directDisplay?[[0,0,0,0],[0,0,0,0],a]:null});this.index=e}(!this.enabled||!this.directDisplay)&&this.present.render({colorViews:[n],clear:[0,0,0,1]}),this.previousView.copy(e.matrixWorldInverse),this.previousViewProj.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this.previousTime=t,this.frame++,this.needsReset=!1,this.stats.frames++}},Si=class{constructor(){this.matrix=new y,this.box=new u,this.clip=new F,this.geometryStates=new WeakMap;let e=k.halfSize;this.surface=new u(new T(-e,0,-e),new T(e,0,e))}get(e,t,n){if(e.matrixWorld.elements[13]<=n+.05||(this.matrix.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this.minimum=[1/0,1/0],this.maximum=[-1/0,-1/0],this.surface.min.y=-n,this.surface.max.y=n,!this.include(this.surface,e.near)))return[0,0,1,1];let r=!1;return t.traverse(e=>{let t=(e.material?.vertex||``).replace(`o.vLocal = v.position;`,``);(e.isInstancedMesh||/\bv\.(?:position|worldOffset|worldPos|useWorld|model)\b/.test(t))&&(r=!0)}),r||(t.updateMatrixWorld(),this.box.setFromObject(t),!this.box.isEmpty()&&!this.include(this.box,e.near))?[0,0,1,1]:[this.minimum[0],this.minimum[1],this.maximum[0],this.maximum[1]]}getForeground(e,t,n=null){if(e.updateWorldMatrix(!0,!1),t.updateWorldMatrix(!0,!0),this.matrix.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),!this.matrix.elements.every(Number.isFinite))return[0,0,1,1];this.minimum=[1/0,1/0],this.maximum=[-1/0,-1/0];let r=!1;if(t.traverseVisible(t=>{if(r||!t.isMesh||!t.geometry)return;let i=t.geometry,a=i.attributes?.position,o=Array.isArray(t.material)?t.material:[t.material];if(t.isInstancedMesh||t.isSkinnedMesh||t.count>1||i.instanceCount>1||i.isInstancedBufferGeometry||Object.entries(i.attributes||{}).some(([e,t])=>e.startsWith(`instance`)||t.isInstancedBufferAttribute||t.meshPerAttribute||t.data?.isInstancedInterleavedBuffer||t.data?.meshPerAttribute)||o.some(e=>!Ci(e))){r=!0;return}if(!a?.array||a.gpuBuffer||a.data?.gpuBuffer||!i.computeBoundingBox){r=!0;return}let s=a.isInterleavedBufferAttribute?a.data:a,c=this.geometryStates.get(i);if((!i.boundingBox||c&&(c.source!==s||c.array!==s.array||c.version!==s.version))&&i.computeBoundingBox(),this.geometryStates.set(i,{source:s,array:s.array,version:s.version}),!i.boundingBox.isEmpty()){if(this.box.copy(i.boundingBox).applyMatrix4(t.matrixWorld),![this.box.min.x,this.box.min.y,this.box.min.z,this.box.max.x,this.box.max.y,this.box.max.z].every(Number.isFinite)){r=!0;return}if(n){let e=n(t);if(e===!1)return;if(e!==!0){r=!0;return}}this.include(this.box,e.near,e.reversedDepth!==!1)||(r=!0)}}),r)return[0,0,1,1];let i=[Math.max(0,this.minimum[0]),Math.max(0,this.minimum[1]),Math.min(1,this.maximum[0]),Math.min(1,this.maximum[1])];return i[0]<=i[2]&&i[1]<=i[3]?i:[1,1,0,0]}include(e,t,n=null){let r=[];for(let t=0;t<8;t++)this.clip.set(t&1?e.max.x:e.min.x,t&2?e.max.y:e.min.y,t&4?e.max.z:e.min.z,1).applyMatrix4(this.matrix),r.push([this.clip.x,this.clip.y,this.clip.w,this.clip.z]);if(n!==null&&r.some(e=>!e.every(Number.isFinite)))return!1;if(r.every(e=>e[2]<=0))return!0;if(r.some(e=>e[2]<=t+.01)||n!==null&&r.some(e=>n?e[3]>=e[2]:e[3]<=0))return!1;for(let[e,t,n]of r){let r=e/n*.5+.5,i=.5-t/n*.5;this.minimum[0]=Math.min(this.minimum[0],r),this.minimum[1]=Math.min(this.minimum[1],i),this.maximum[0]=Math.max(this.maximum[0],r),this.maximum[1]=Math.max(this.maximum[1],i)}return!0}};function Ci(e){let t=(e?.vertex||``).replace(/\/\*[\s\S]*?\*\//g,``).replace(/\/\/[^\n]*/g,``).trim();if(!t)return!0;for(let n of t.split(`;`).filter(e=>e.trim())){let t=n.match(/^\s*o\.([a-zA-Z_]\w*)\s*=\s*v\.[a-zA-Z_]\w*(?:\.[xyzwrgba]+)?\s*$/);if(!t||!Object.hasOwn(e.varyings||{},t[1]))return!1}return!0}function wi(e,t,n,r=8){let i=Math.max(0,Math.min(t-1,Math.floor((e[0]*t-r)/2)*2)),a=Math.max(0,Math.min(n-1,Math.floor((e[1]*n-r)/2)*2)),o=Math.max(i+1,Math.min(t,Math.ceil((e[2]*t+r)/2)*2)),s=Math.max(a+1,Math.min(n,Math.ceil((e[3]*n+r)/2)*2));return[i,a,o-i,s-a]}var Ti=class{constructor(){this.enabled=!1,this.last=-1/0,this.result=null,this.active=!1}begin(e=performance.now(),t={}){this.active=!1,!(!this.enabled||!P.hasTimestamp||e-this.last<700)&&(this.queries||(this.queries=P.device.createQuerySet({type:`timestamp`,count:32}),this.resolved=P.device.createBuffer({size:256,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),this.ring=[0,1].map(()=>({busy:!1,buffer:P.device.createBuffer({size:256,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST})}))),this.slot=this.ring.find(e=>!e.busy),this.slot&&(this.slot.busy=!0,this.names=[],this.active=!0,this.last=e,this.context={...t},P.getEncoder().beginComputePass({label:`Water profiling start`,timestampWrites:this.writes(`begin`)}).end()))}writes(e){if(!this.active)return null;let t=this.names.length*2;return this.names.push(e),{querySet:this.queries,beginningOfPassWriteIndex:t,endOfPassWriteIndex:t+1}}finish(){if(!this.active)return;let e=P.getEncoder();e.beginComputePass({label:`Water profiling end`,timestampWrites:this.writes(`end`)}).end(),this.active=!1;let t=this.slot,n=this.names.slice(),r=this.context;e.resolveQuerySet(this.queries,0,n.length*2,this.resolved,0),e.copyBufferToBuffer(this.resolved,0,t.buffer,0,n.length*16),P.onSubmit(null,()=>{t.buffer.mapAsync(GPUMapMode.READ).then(()=>{let e=new BigUint64Array(t.buffer.getMappedRange().slice(0));t.buffer.unmap(),t.busy=!1;let i={fft:0};for(let t=0;t<n.length;t++)n[t]!==`begin`&&n[t]!==`end`&&(i[n[t]]=Number(e[t*2+1]-e[t*2])/1e6);let a=Number(e[(n.length-1)*2+1]-e[0])/1e6;this.result={capturedAt:Date.now(),...r,totalGPUms:a,stages:i,scope:`One diagnostic sample; GPU passes only, including reflection mipmaps. Excludes browser composition; tile GPUs may overlap individual stages.`},this.enabled=!1}).catch(e=>{t.busy=!1,this.result={error:String(e)}})})}},Ei=257,Di=class{constructor(e){this.target=new C(Ei,Ei,{colors:[`rgba16float`],label:`Shared mobile wave height and gradient`}),this.pass=new er({label:`Mobile analytic wave field`,modules:[e],code:`
fn fragment(in: FSIn) -> vec4f {
  let p=(in.pos.xy-.5)/${Ei-1}.0*${k.width}.0-${k.halfSize}.0;
  return waveSpectrumAt(p,waves.time);
}`}),this.updates=0}render(e,t){return e===this.time&&t===this.strength?!1:(this.pass.render({colorViews:this.target.textures}),this.time=e,this.strength=t,this.updates++,!0)}},Oi=new m({name:`Azimut upper exterior hemisphere bounce`,code:`
fn hookBounce(P: vec3f, N: vec3f) -> vec3f {
#if AZIMUT_TOP_BOUNCE
  // Recover yacht-local height from its existing rigid draw transform. World
  // height would let unchanged lower fittings cross the band during bob/roll.
  let axis = draw.model[1].xyz;
  let localY = dot(P - draw.model[3].xyz, axis) / max(dot(axis, axis), 1e-8);
  if (localY <= 6.6) { return vec3f(0.0); }
  let upper = smoothstep(6.6, 7.0, localY);
  let hemisphere = clamp(0.5 - N.y * 0.5, 0.0, 1.0);
  let daylight = 0.8 + 0.2 * max(frame.sunDir.y, 0.0);
  return frame.horizonColor * (upper * hemisphere * daylight * frame.envIntensity);
#else
  return vec3f(0.0);
#endif
}
`}),ki=[0,1,2,4,5,6,8,9,10],Ai=new Set([`Merged exterior`,`Merged glazing`,`Glass balustrades`]),ji=new WeakMap,Mi=(e,t,n,r)=>Math.fround(Math.fround(e*t)-Math.fround(n*r));function Ni(e,t=new D){let n=Math.fround,r=t.elements,i=n(e[0]),a=n(e[1]),o=n(e[2]),s=n(e[4]),c=n(e[5]),l=n(e[6]),u=n(e[8]),d=n(e[9]),f=n(e[10]);return r[0]=Mi(c,f,l,d),r[1]=Mi(l,u,s,f),r[2]=Mi(s,d,c,u),r[3]=Mi(d,o,f,a),r[4]=Mi(f,i,u,o),r[5]=Mi(u,a,d,i),r[6]=Mi(a,l,o,c),r[7]=Mi(o,s,i,l),r[8]=Mi(i,c,a,s),t}function Pi(e){if(ji.has(e))return ji.get(e);let t=[];if(e.traverse(e=>{e.isMesh&&Ai.has(e.name)&&!e.isInstancedMesh&&!Array.isArray(e.material)&&t.push(e)}),t.length!==3||new Set(t.map(e=>e.material)).size!==3)throw Error(`Precomputed yacht normals require its three distinct non-instanced exterior materials`);let n={matrices:3,uniformBytes:144,updates:0,cacheHits:0,disposed:!1},i=t.map(e=>{let t=e.material,i=new D,a=new r(`YachtNormalParams`,{matrix:[`mat3x3f`,i]},{label:e.name+` normal cofactor`}),o=new m({name:`azimut-precomputed-normal`,uniforms:a,uniformName:`yachtNormal`}),s=t.modules,c=t.defines.YACHT_PRECOMPUTED_NORMALS,l=e.onBeforeRender,u=new Float32Array(16),d=new Float32Array(16),f={mesh:e,material:t,uniform:a,module:o,previousModules:s,previousDefine:c,previousCallback:l,matrix:i,packed:u,previous:d,valid:!1,frame:-1,disposed:!1},p=()=>{let t=e.__draw,r=t?.frame===P.frame?t.cur:e.matrixWorld.elements;for(let e=0;e<16;e++)u[e]=r[e];let a=f.valid;if(a){for(let e of ki)if(!Object.is(u[e],d[e])){a=!1;break}}if(f.frame=P.frame,a){n.cacheHits++;return}Ni(u,i),d.set(u),f.valid=!0,n.updates++};return f.update=p,f.callback=function(...e){l&&l.apply(this,e),f.disposed||p()},t.modules=[...s,o],t.setDefine(`YACHT_PRECOMPUTED_NORMALS`,1),e.onBeforeRender=f.callback,t.addEventListener(`dispose`,()=>{a.buffer?.destroy(),a.buffer=null,f.disposed=!0}),f}),a={entries:i,stats:n,dispose(){if(!n.disposed){n.disposed=!0;for(let e of i)e.disposed=!0,e.uniform.buffer?.destroy(),e.uniform.buffer=null,e.material.modules=e.previousModules,e.material.setDefine(`YACHT_PRECOMPUTED_NORMALS`,e.previousDefine),e.mesh.onBeforeRender===e.callback&&(e.mesh.onBeforeRender=e.previousCallback);ji.delete(e)}}};return ji.set(e,a),a}var Fi=class{constructor(e,{maxReuseFrames:t=3,relaxed:n=!1}={}){if(e?.depthTexture?.format!==`depth32float`||e.textures?.[0]?.format!==`rgba16float`||e.textures?.[2]?.format!==`r8unorm`)throw TypeError(`Yacht shading cache needs raw HDR/depth and a current r8unorm marker`);if(!Number.isInteger(t)||t<1||t>3)throw RangeError(`Yacht shading cache permits one to three reuse frames`);this.objects=e,this.maxReuseFrames=t,this.history=new C(1,1,{colors:[`rgba16float`,`r8unorm`],depth:`depth32float`,label:`Experimental raw yacht radiance history`,usage:[`sample`,`copyDst`],depthUsage:[`sample`,`copyDst`]}),this.uniforms=new r(`WaterYachtCache`,{previousJitter:[`vec2f`,[0,0]],valid:[`u32`,0],reuseAge:[`u32`,0],diagnosticOutput:[`u32`,0]}),this.module=new m({name:`waterYachtShadingCache`,deps:[p,j],uniforms:this.uniforms,uniformName:`yachtCache`,bindings:{yachtCacheColor:{texture:()=>this.history.textures[0]},yachtCacheMarker:{texture:()=>this.history.textures[1]},yachtCacheDepth:{texture:()=>this.history.depthTexture}},code:n?Ii.replace(`normalVariation > .008`,`normalVariation > .03`).replace(`sunHotspot > .90`,`sunHotspot > .99`).replace(`hi - lo > vec3f(.018)`,`hi - lo > vec3f(.06)`):Ii}),this._hasHistory=!1,this._key=null,this._reuseAge=0,this._pendingJitter=[0,0],this.stats={width:1,height:1,historyBytes:13,markerAttachmentBytes:1,addedTextureBytes:14,uniformBytes:this.uniforms.byteLength,capturedFrames:0,invalidatedFrames:0,forcedFreshFrames:0,maxReuseFrames:t,experimental:!0,relaxedProbe:!!n}}beginFrame({width:e,height:t,camera:n,jitter:r=[0,0],revisionKey:i=``}){if(!Number.isInteger(e)||!Number.isInteger(t)||e<1||t<1||this.objects.width!==e||this.objects.height!==t)throw RangeError(`Cache dimensions must match the raw object raster exactly`);let a=this.history.setSize(e,t),o=[i,e,t,n.reversedDepth,...n.matrixWorld.elements,...n.projectionMatrix.elements].join(`:`),s=a||o!==this._key||!this._hasHistory;s&&(this._reuseAge=0,this.stats.invalidatedFrames++);let c=!s&&this._reuseAge>=this.maxReuseFrames,l=!s&&!c;if(c&&(this._reuseAge=0,this.stats.forcedFreshFrames++),this.uniforms.set(`valid`,+!!l),this.uniforms.set(`reuseAge`,l?this._reuseAge+1:0),this.uniforms.set(`previousJitter`,this._capturedJitter??[0,0]),this._key=o,this._pendingJitter=[r.x??r[0],r.y??r[1]],!this._pendingJitter.every(Number.isFinite))throw TypeError(`Cache jitter must be finite NDC coordinates`);l&&this._reuseAge++;let u=this.history.width*this.history.height;return Object.assign(this.stats,{width:this.history.width,height:this.history.height,historyBytes:u*13,markerAttachmentBytes:u,addedTextureBytes:u*14,currentReuseAge:l?this._reuseAge:0,historyValid:l}),l}capture(){let e=P.getEncoder(),t={width:this.history.width,height:this.history.height,depthOrArrayLayers:1};for(let[n,r]of[[this.objects.textures[0],this.history.textures[0]],[this.objects.textures[2],this.history.textures[1]],[this.objects.depthTexture,this.history.depthTexture]])e.copyTextureToTexture({texture:n.getGPU()},{texture:r.getGPU()},t);this._capturedJitter=this._pendingJitter,this._hasHistory=!0,this.stats.capturedFrames++}invalidate(){this._hasHistory=!1,this._reuseAge=0,this.uniforms.set(`valid`,0)}dispose(){for(let e of[...this.history.textures,this.history.depthTexture])e.destroy();this.uniforms.buffer?.destroy(),this.uniforms.buffer=null}},Ii=`
#if WATER_YACHT_SHADING_CACHE && PASS_MAIN
var<private> waterYachtCurrentMarker: f32 = 0.0;

fn waterYachtCacheRead(in: FragInput, s: Surface, visibility: f32) -> vec4f {
  waterYachtCurrentMarker = 0.0;
  let normalVariation = max(length(dpdx(s.normal)), length(dpdy(s.normal)));
  let albedoVariation = max(length(dpdx(s.albedo)), length(dpdy(s.albedo)));
  var kind = 0u;
#if WATER_YACHT_CACHE_CLASS == 1
  let data = in.vs.vSurface;
  let timber = data.z > .5 && data.z < 2.5;
  let cloth = data.x > .7 && data.y < .1 && data.z < .5;
  if (!timber && !cloth && data.y < .1) {
    // Stable albedo buckets prevent same-material white/dark trim boundaries
    // from interpolating into each other in the previous raw color image.
    kind = 1u + u32(clamp(floor(luminance(s.albedo) * 31.0), 0.0, 31.0));
    kind += select(0u, 32u, s.albedo.r > s.albedo.b);
  }
#elif WATER_YACHT_CACHE_CLASS == 2
  kind = 96u;
#endif
  let shadowInterior = visibility <= .00001 || visibility >= .99999;
  let sunHotspot = dot(reflect(-in.V, s.clearcoatNormal), frame.sunDir);
  // Preserve geometric creases, changing shadows, narrow fittings, grazing
  // reflections, wet hull/waterline shading and the sun's sharp GGX highlight.
  if (kind == 0u || s.alpha < .999 || in.P.y < .5 || !shadowInterior ||
      normalVariation > .008 || albedoVariation > .002 ||
      abs(dot(s.normal, in.V)) < .2 || sunHotspot > .90) { return vec4f(0.0); }
  let marker = kind + select(0u, 128u, visibility >= .99999);
  waterYachtCurrentMarker = f32(marker) / 255.0;
  if (yachtCache.valid == 0u || in.vs.prevClip.w <= 0.0) { return vec4f(0.0); }
  let size = vec2i(textureDimensions(yachtCacheColor));
  let previousUv = in.vs.prevClip.xy / in.vs.prevClip.w * vec2f(.5, -.5) + .5 +
    yachtCache.previousJitter * vec2f(.5, -.5);
  let currentUv = in.vs.curClip.xy / in.vs.curClip.w * vec2f(.5, -.5) + .5;
  if (length((previousUv - currentUv) * vec2f(size)) > 2.0) { return vec4f(0.0); }
  let raster = previousUv * vec2f(size) - .5;
  let base = vec2i(floor(raster));
  if (any(base < vec2i(0)) || any(base + vec2i(1) >= size)) { return vec4f(0.0); }
  let p0 = base;
  let p1 = base + vec2i(1, 0);
  let p2 = base + vec2i(0, 1);
  let p3 = base + vec2i(1, 1);
  let m = vec4f(textureLoad(yachtCacheMarker, p0, 0).r,
    textureLoad(yachtCacheMarker, p1, 0).r,
    textureLoad(yachtCacheMarker, p2, 0).r,
    textureLoad(yachtCacheMarker, p3, 0).r);
  if (any(abs(m - vec4f(waterYachtCurrentMarker)) > vec4f(.001))) { return vec4f(0.0); }
  let d = vec4f(textureLoad(yachtCacheDepth, p0, 0),
    textureLoad(yachtCacheDepth, p1, 0),
    textureLoad(yachtCacheDepth, p2, 0),
    textureLoad(yachtCacheDepth, p3, 0));
  if (any(d <= vec4f(0.0))) { return vec4f(0.0); }
  let f = fract(raster);
  // Depth-buffer values are affine across a planar projected face. Interpolate
  // BEFORE reconstruction to compare with the point's prior linear view depth.
  let oldDepth = viewDepth(mix(mix(d.x, d.y, f.x), mix(d.z, d.w, f.x), f.y));
  if (abs(oldDepth - in.vs.prevClip.w) > .01) { return vec4f(0.0); }
  let c0 = textureLoad(yachtCacheColor, p0, 0);
  let c1 = textureLoad(yachtCacheColor, p1, 0);
  let c2 = textureLoad(yachtCacheColor, p2, 0);
  let c3 = textureLoad(yachtCacheColor, p3, 0);
  if (min(min(c0.a, c1.a), min(c2.a, c3.a)) < .999) { return vec4f(0.0); }
  let lo = min(min(c0.rgb, c1.rgb), min(c2.rgb, c3.rgb));
  let hi = max(max(c0.rgb, c1.rgb), max(c2.rgb, c3.rgb));
  // Interpolation is restricted to smooth raw radiance interiors; edges and
  // highlights retain full fresh shading rather than accumulating softening.
  if (any(hi - lo > vec3f(.018))) { return vec4f(0.0); }
  return vec4f(mix(mix(c0.rgb, c1.rgb, f.x), mix(c2.rgb, c3.rgb, f.x), f.y), 1.0);
}

fn waterYachtCacheMarker() -> vec4f {
  // A=1 overwrites the previous material's tag even on transparent guard draws.
  return vec4f(waterYachtCurrentMarker, 0.0, 0.0, 1.0);
}
#endif
`,Li=[1,1,0,0],Ri=e=>Array.isArray(e)&&e.length===4&&e.every(Number.isFinite),zi=e=>(e||``).replace(/\/\*[\s\S]*?\*\//g,``).replace(/\/\/[^\n]*/g,``).trim();function Bi(e){let t=Array.isArray(e.material)?e.material:[e.material];if(!t.length||t.some(e=>!e))return null;let n=!1;for(let r of t){if(r.visible===!1)continue;if(r.transparent===!0){n=!0;continue}let t=r.uniforms?.opacity?.value??r.opacity,i=zi(r.surface),a=zi(r.output),o=/\b(?:s|\(\s*\*\s*s\s*\))\s*\.\s*alpha\b/.test(i),s=/\b\w+\s*\([^;]*\b(?:&\s*)?s\s*[,)]/.test(i);if(r.transparent!==!1||!r.defines?.YACHT_OPAQUE_COLOR||t!==1||r.depthTest===!1||r.depthWrite===!1||r.depthBias!=null&&r.depthBias!==0||r.depthBiasSlopeScale!=null&&r.depthBiasSlopeScale!==0||o||s||a||e.geometry?.attributes?.color?.itemSize>3)return null}return n}function Vi(e,t,n,r=t,i=n){if(![t,n,r,i].every(e=>Number.isFinite(e)&&e>0))throw RangeError(`Surface occlusion requires positive finite source/output dimensions`);if(!Ri(e))return[0,0,t,n];if(e.every((e,t)=>e===Li[t]))return[t,n,0,0];if(e[0]>e[2]||e[1]>e[3])return[0,0,t,n];let a=8+2*t/r,o=8+2*n/i;return[Math.max(0,Math.floor(e[0]*t-a)),Math.max(0,Math.floor(e[1]*n-o)),Math.min(t,Math.ceil(e[2]*t+a)),Math.min(n,Math.ceil(e[3]*n+o))]}var Hi=class{constructor({depthTexture:e}){if(!e||e.format!==`depth32float`)throw TypeError(`Surface occlusion needs the fresh depth32float surface texture`);this.depthTexture=e,this.screenBounds=new Si,this.uniforms=new r(`WaterSurfaceOcclusionParams`,{transparentRect:[`vec4f`,new Float32Array([0,0,1,1])],raster:[`vec4f`,new Float32Array([1,1,0,0])]},{label:`Surface opaque shading guard`}),this.module=new m({name:`water-surface-opaque-shading-guard`,uniforms:this.uniforms,uniformName:`waterSurfaceOcclusion`,bindings:{waterSurfaceOcclusionDepth:{texture:e}},code:`
fn waterSurfaceHidden( in: FragInput ) -> bool {
	if ( waterSurfaceOcclusion.raster.z < .5 ) { return false; }
	// Native fragment coordinates are source-pixel centres. With AA active
	// and |source jitter| <= .4, the compositor's shifted surface-depth load
	// selects this same integer texel, not an approximate world-height test.
	let pixel = vec2i( in.pixel );
	let size = vec2i( waterSurfaceOcclusion.raster.xy );
	if ( any( pixel < vec2i( 0 ) ) || any( pixel >= size ) ) { return false; }
	if ( all( in.pixel >= waterSurfaceOcclusion.transparentRect.xy )
		&& all( in.pixel <= waterSurfaceOcclusion.transparentRect.zw ) ) { return false; }
	if ( any( vec2i( textureDimensions( waterSurfaceOcclusionDepth ) ) != size ) ) { return false; }
	let waterDepth = textureLoad( waterSurfaceOcclusionDepth, pixel, 0 );
	return waterDepth > 0.0 && in.vs.clip.z <= waterDepth;
}
`}),this.stats={enabled:!1,updates:0,bytes:this.uniforms.byteLength,source:[1,1],transparentBounds:[0,0,1,1],guard:[0,0,1,1]}}update({camera:e,scene:t,width:n,height:r,outputWidth:i=n,outputHeight:a=r,jitterX:o=0,jitterY:s=0,enabled:c=!0,aaEnabled:l=!0,transparentBounds:u=null}){let d=u??this.screenBounds.getForeground(e,t,Bi),f=Vi(d,n,r,i,a),p=f[0]<=0&&f[1]<=0&&f[2]>=n&&f[3]>=r,m=c&&l&&e?.reversedDepth!==!1&&Number.isFinite(o)&&Number.isFinite(s)&&Math.abs(o)<=.4&&Math.abs(s)<=.4&&!p;this.uniforms.fields.transparentRect.value.set(f),this.uniforms.fields.raster.value.set([n,r,+!!m,0]);let h=Math.max(0,f[2]-f[0]),g=Math.max(0,f[3]-f[1]);return Object.assign(this.stats,{enabled:!!m,updates:this.stats.updates+1,source:[n,r],transparentBounds:[...d],guard:f,guardedFraction:h*g/(n*r),sourceJitter:[o,s]}),this.stats.enabled}dispose(){this.uniforms.buffer?.destroy(),this.uniforms.buffer=null}},Ui=class{constructor(e){this.occlusion=e,this.pass=new er({label:`Certified water depth before opaque yacht`,colorFormats:[],depthFormat:`depth32float`,depthCompare:`always`,depthWrite:!0,bindings:{waterDepth:{texture:e.depthTexture},guard:{uniform:e.uniforms}},code:`
@fragment fn fs(in:FSIn) -> @builtin(frag_depth) f32 {
  if(guard.raster.z<.5) { return 0.0; }
  if(all(in.pos.xy>=guard.transparentRect.xy)&&all(in.pos.xy<=guard.transparentRect.zw)) { return 0.0; }
  return textureLoad(waterDepth,vec2i(in.pos.xy),0);
}`}),this.stats={active:!1,renders:0,addedTextureBytes:0}}render({depthTexture:e,scissor:t,frameBlock:n=ct}){if(!this.occlusion.stats.enabled)return this.stats.active=!1,!1;let r=P.getEncoder().beginRenderPass({label:this.pass.label,colorAttachments:[],depthStencilAttachment:{view:e.view(),depthLoadOp:`clear`,depthClearValue:0,depthStoreOp:`store`}});return t&&r.setScissorRect(...t),this.pass.draw(r,n),r.end(),this.stats.active=!0,this.stats.renders++,!0}},Wi=2**-23,Gi=new Float32Array(1),Ki=new Uint32Array(Gi.buffer);function qi(e,t){return Gi[0]=e,Number.isFinite(Gi[0])?Gi[0]===0?t?-(2**-149):2**-149:(Ki[0]+=Gi[0]>0===t?-1:1,Gi[0]):null}function Ji(e){return e?Array.isArray(e)||ArrayBuffer.isView(e)?Array.from(e):[e.x,e.y,e.z,e.w]:[]}function Yi(e,t){if(!e||!e.elements&&!Array.isArray(e)&&!ArrayBuffer.isView(e))return null;let n=Array.from(e.elements||e,Math.fround);if(n.length!==16||!n.every(Number.isFinite)||!(t>0)||!Number.isFinite(t)||n[3]!==0||n[7]!==0||n[11]!==0||n[15]!==1)return null;let r=[n[0],n[4],n[8]],i=[n[1],n[5],n[9]],a=[n[2],n[6],n[10]],o=Math.hypot(...r),s=Math.hypot(...i),c=Math.hypot(...a);if(!(o>0&&s>0&&c>0))return null;let l=(e,t)=>e.reduce((e,n,r)=>e+n*t[r],0);if(Math.abs(l(r,i))>16*Wi*o*s||Math.abs(l(r,a))>16*Wi*o*c||Math.abs(l(i,a))>16*Wi*s*c)return null;let u=[r[1]*i[2]-r[2]*i[1],r[2]*i[0]-r[0]*i[2],r[0]*i[1]-r[1]*i[0]],d=Math.hypot(...u),f=u[1]<0?-1:1;for(let e=0;e<3;e++)u[e]*=f/d;return!(u[1]>=.025)||!u.every(Number.isFinite)?null:{ray:u,texel:Math.max(2/(t*o),2/(t*s)),matrix:n}}function Xi(e,t,{minimumY:n,maximumY:r,normalBias:i=0}={}){if(!e||!t||![n,r,i].every(Number.isFinite)||n>r||i<0)return null;let[a,o,s]=t.ray;if(!(o>=.025)||!Number.isFinite(t.texel)||t.texel<=0)return null;let c=1/0,l=1/0,u=-1/0,d=-1/0,f=n-i*1.01,p=r+i*1.01;for(let t of e){let e=Ji(t.min),n=Ji(t.max);if(![...e.slice(0,3),...n.slice(0,3)].every(Number.isFinite)||e.some((e,t)=>t<3&&e>n[t]))return null;for(let t of[e[0],n[0]])for(let r of[e[1],n[1]])for(let i of[e[2],n[2]])for(let e of[f,p]){let n=t-(r-e)*a/o,f=i-(r-e)*s/o;c=Math.min(c,n),u=Math.max(u,n),l=Math.min(l,f),d=Math.max(d,f)}}if(!e.length)return[0x56bc75e2d63100000,0x56bc75e2d63100000,-0x56bc75e2d63100000,-0x56bc75e2d63100000];let m=Math.max(1,Math.abs(c),Math.abs(l),Math.abs(u),Math.abs(d)),h=128*Wi*m/o,g=i*1.01+3*Math.SQRT2*t.texel*(1+32*Wi)/o+h;return[c-g,l-g,u+g,d+g]}function Zi(e){let t=(e.vertex||``).replace(/\/\*[\s\S]*?\*\//g,``).replace(/\/\/[^\n]*/g,``).trim();if(!t)return!0;for(let n of t.split(`;`).filter(e=>e.trim())){let t=n.match(/^\s*o\.([a-zA-Z_]\w*)\s*=\s*v\.[a-zA-Z_]\w*(?:\.[xyzwrgba]+)?\s*$/);if(!t||!Object.hasOwn(e.varyings||{},t[1]))return!1}return!0}var Qi=class{constructor(){this.uniforms=new r(`WaterSurfaceShadowExclusion`,{bounds:[`vec4f`,new Float32Array(4)],slab:[`vec4f`,new Float32Array(4)]}),this.module=new m({name:`water-surface-shadow-exclusion`,uniforms:this.uniforms,uniformName:`waterSurfaceShadowExclusion`,code:`
fn waterSurfaceOutsideShadow( p: vec3f ) -> bool {
	let slab = waterSurfaceShadowExclusion.slab;
	let bounds = waterSurfaceShadowExclusion.bounds;
	return slab.z > 0.5 && p.y >= slab.x && p.y <= slab.y
		&& ( any( p.xz < bounds.xy ) || any( p.xz > bounds.zw ) );
}
`}),this.attributeStates=new WeakMap,this.snapshots=new Map,this.model=new y,this.stats={updates:0,snapshotUpdates:0,active:!1,reason:`uninitialized`,casters:0,uniformBytes:32,bounds:null}}_snapshot(e,t){if(!e?.traverseVisible||!e.updateWorldMatrix)return null;e.updateWorldMatrix(!0,!0);let n=[],r=!1;return e.traverseVisible(e=>{if(r||!e.isMesh||!e.castShadow||!(e.layers.mask&t))return;let i=e.geometry,a=i?.attributes?.position,o=(Array.isArray(e.material)?e.material:[e.material]).filter(e=>e?.visible!==!1);if(!o.length)return;let s=a?.data||a;if(!a||!s?.array||s.gpuBuffer||a.gpuBuffer||e.isInstancedMesh||e.isSkinnedMesh||e.count>1||i.instanceCount>1||i.isInstancedBufferGeometry||Object.entries(i.attributes||{}).some(([e,t])=>e.startsWith(`instance`)||t.isInstancedBufferAttribute||t.meshPerAttribute||t.data?.isInstancedInterleavedBuffer||t.data?.meshPerAttribute)||o.some(e=>!e||e.transparent||!Zi(e))){r=!0;return}let c=this.attributeStates.get(a);if((!c||c.array!==s.array||c.version!==s.version)&&(c={box:new u().setFromBufferAttribute(a),array:s.array,version:s.version},this.attributeStates.set(a,c)),c.box.isEmpty())return;let l=[...Ji(c.box.min).slice(0,3),...Ji(c.box.max).slice(0,3)],d=e.__draw?.frame===P.frame?e.__draw.cur:e.matrixWorld.elements,f=Array.from(d,Math.fround);if(!l.every(Number.isFinite)||!f.every(Number.isFinite)||f[3]!==0||f[7]!==0||f[11]!==0||f[15]!==1){r=!0;return}this.model.fromArray(f);let p=c.box.clone().applyMatrix4(this.model),m=[0,1,2].map(e=>Math.max(Math.abs(l[e]),Math.abs(l[e+3]))),h=1;for(let e=0;e<3;e++)h=Math.max(h,Math.abs(f[e])*m[0]+Math.abs(f[e+4])*m[1]+Math.abs(f[e+8])*m[2]+Math.abs(f[e+12]));p.expandByScalar(64*Wi*h+1e-4),n.push(p)}),r?null:n}update({scene:e,shadowUniforms:t,maxHeight:n,renderedCascades:r,layerMask:i=4294967295}){this.stats.updates++;let a=this.uniforms.get(`slab`);a[2]=0;let o=e=>(this.stats.active=!1,this.stats.reason=e,this.stats.bounds=null,!1),s=t?.fields,c=s?.count?.value,l=s?.mapSize?.value;if(!s||!Number.isInteger(c)||c<1||c>4||!Array.isArray(r)||!Number.isFinite(n)||n<0)return o(`unknown-shadow-state`);if(!(Math.fround(s.bias?.value)>=Wi))return o(`unsupported-comparison-bias`);if(r.length){let t=this._snapshot(e,i);for(let e of r){if(!Number.isInteger(e)||e<0||e>=c)return o(`unknown-cascade`);let n=s.matrices?.value?.[e];this.snapshots.set(e,{boxes:t,matrix:n?Array.from(n.elements||n,Math.fround):null,mapSize:l}),this.stats.snapshotUpdates++}}let u=[1/0,1/0,-1/0,-1/0],d=0,f=k.surface-n-1e-4,p=k.surface+n+1e-4;for(let e=0;e<c;e++){let t=this.snapshots.get(e),n=t?.boxes,r=s.cascades?.value?.[e],i=s.matrices?.value?.[e];if(!n)return o(`uncertified-casters`);let a=Ji(r),c=Yi(i,l);if(!c||!Number.isFinite(a[2]))return o(`unsupported-shadow-projection`);if(t.mapSize!==l||!t.matrix||t.matrix.some((e,t)=>!Object.is(e,c.matrix[t])))return o(`changed-unrendered-shadow-map`);let m=Xi(n,c,{minimumY:f,maximumY:p,normalBias:Math.abs(Math.fround(a[2]))});if(!m||!m.every(Number.isFinite))return o(`nonfinite-bounds`);u=[Math.min(u[0],m[0]),Math.min(u[1],m[1]),Math.max(u[2],m[2]),Math.max(u[3],m[3])],d+=n.length}let m=this.uniforms.get(`bounds`);for(let e=0;e<4;e++){let t=qi(u[e],e<2);if(t===null)return o(`unrepresentable-bounds`);m[e]=t}return a[0]=qi(f,!0),a[1]=qi(p,!1),a[2]=1,this.stats.active=!0,this.stats.reason=`certified`,this.stats.casters=d,this.stats.bounds=Array.from(m),!0}dispose(){this.uniforms.buffer?.destroy(),this.uniforms.buffer=null,this.snapshots.clear()}};function $i({antiAliasing:e=!0,sampleScale:n=1.5,boundedRendering:i=!0,mobilePerformance:a=!1,waterStyle:o=`volume`,surfaceFastResolve:s=!0,precomputedWaves:c=!0,halfWaveBasis:l=!1,surfaceGridCells:u=128,blockedSurfaceIndices:d=!1,waterFrustumPatches:f=!1,waterPbrExact:p=!0,look:h=`tidewater`,depthPrepass:g=!1,splitSurfaceHistory:v=!1,fusedSurfaceComposition:b=!1,sparseSurfaceAA:w=!1,signedSurfaceDepth:T=!1,gatherSurfaceInfo:E=!1,fusedOpaqueHardware:D=!1,cachedBackgroundDisplay:A=!1,specializedSurfaceAA:j=!1,partitionedSurfaceAA:te=!1,croppedSurfaceComposite:ne=!1,croppedSurfaceDirectLoads:ie=!1,halfColorResolve:ae=!1,surfaceSquaredFootprint:le=!1,surfaceStaticInvariants:ue=!1,precomputedEnvelope:F=!1,vertexReflection:de=!1,temporalWaveCoefficients:L=!1,surfaceSingleCascade:fe=!1,surfaceZeroGlint:pe=!1,surfaceHalfColor:me=!1,surfaceLazyOpaqueColor:he=!1,surfaceShadowExclusion:ge=!1,waterYachtFastLighting:_e=!1,waterCoincidentCoatNormals:ve=!1,waterAliasCoatNormals:ye=!1,waterFlatSurface:be=!1,waterFlatColor:xe=!1,waterExactFinishPalette:Se=!1,waterMaterialSpecialization:Ce=!1,waterOpaqueIndexSort:we=!1,waterObjectCrop:Te=!1,directObjectCropLoads:Ee=!1,prefixObjectCrop:De=!1,viewportObjectCrop:Oe=!1,waterShadowRotation:ke=!1,waterPrecomputedNormals:Ae=!1,waterDirectZeroFast:je=!1,uniformEnvironment:Me=!1,factoredEnvironmentSH:Ne=!1,waterHomogeneousEnvironment:Pe=!1,mirrorEnvironmentSH:Fe=!1,waterOpaqueColor:Ie=!1,waterSingleCascade:Le=!1,waterCompactPbr:Re=!1,waterDielectricScalar:ze=!1,waterSharedGgxAngles:Be=!1,waterHalfColor:Ve=!1,literalEnvironmentSH:He=!1,temporalYachtShadingCache:Ue=!1,relaxedYachtShadingCache:We=!1,yachtShadingMaxReuseFrames:Ge=3,waterSurfaceYachtOcclusion:Ke=!1,waterSurfaceDepthPrefill:qe=!1,waterTriangleCull:Je=!1,triangleCullGlobalError:Ye=!1,triangleCullPrecombined:Xe=!1}={}){if(![`surface`,`volume`].includes(o))throw RangeError(`Unknown water style`);if(![`tidewater`,`legacy`].includes(h))throw RangeError(`Unknown water-map look`);let Ze=new _,$e=new N(Ze),R=new Qe,z=new Dt;z.capacity=64;let et=Je?new Un({enabled:!0,globalClipError:Ye,precombinedClip:Xe}):null,B=new li,tt=h===`tidewater`?new ee({elevation:B.elevation,azimuth:B.azimuth,uniformEnvironment:Me,factoredEnvironmentSH:Ne,mirrorEnvironmentSH:Fe,literalEnvironmentSH:He}):null,nt=tt?{...tt.lightingHooks,bounce:Oi}:null;B.environment=tt;let V=new xi({enabled:e,sampleScale:n,filmic:h===`tidewater`,splitSurfaceHistory:v,fusedSurfaceComposition:b,sparseSurfaceAA:w,signedSurfaceDepth:T,gatherSurfaceInfo:E,fusedOpaqueHardware:D,cachedBackgroundDisplay:A,specializedSurfaceAA:j,partitionedSurfaceAA:te,croppedSurfaceComposite:ne,croppedSurfaceDirectLoads:ie,halfColorResolve:ae}),H=new C(1,1,{colors:Ue?[`rgba16float`,`rgba16float`,`r8unorm`]:[`rgba16float`,`rgba16float`],depth:`depth32float`,label:`Water objects and motion`,...Ue?{usage:[`sample`,`render`,`copySrc`],depthUsage:[`sample`,`render`,`copySrc`]}:{}}),rt=we?new Qn({enabled:!0,maxSwapsPerTriangle:4}):null,U=Te?new wn({enabled:!0,directObjectLoads:Ee,prefixOnly:De}):null,it=new WeakMap,at=e=>U?U.compositorCode+`
`+e.replaceAll(`textureDimensions(objectDepth)`,`waterObjectSourceSize()`).replace(/textureLoad\(object(Depth|Color|Motion),\s*(\w+),\s*0\)/g,(e,t,n)=>`waterObject${t}Load(${n})`):e,ot=Ue?new Fi(H,{maxReuseFrames:Ge,relaxed:We}):null;V.setSurfaceInputs?.({color:H.texture,motion:H.textures[1],depth:H.depthTexture});let st=new C(1,1,{colors:[`rgba16float`],depth:`depth32float`,depthUsage:[`render`],mips:!0,label:`Water object reflection`}),W=lt(`waterReflection`),dt=new C(1,1,{colors:[`rgba16float`],label:`Mobile water optical lighting`}),ft=lt(`waterOptics`),mt=new y().makeScale(1,-1,1),ht={isCamera:!0,reversedDepth:!0,near:.1,far:1e3,matrixWorld:new y,matrixWorldInverse:new y,projectionMatrix:new y,updateMatrixWorld(){this.matrixWorldInverse.copy(this.matrixWorld).invert()}},gt=new r(`WaterReflection`,{matrix:[`mat4x4f`,new y]}),_t=new m({name:`waterReflection`,uniforms:gt,uniformName:`waterReflection`,code:``}),vt=new r(`WaterMapWaves`,{time:[`f32`,0],strength:[`f32`,1],advectedRipples:[`f32`,+!!a],rippleEpoch:[`f32`,0],maximumHeight:[`f32`,Ze.maxHeight]}),yt=new m({name:`waterMapWaves`,uniforms:vt,uniformName:`waves`,code:t}),bt=new Di(yt),xt=new S,St=lt(`waterSurface`),Ct=ge?new Qi:null,wt=new se({waveModule:yt,reflectionModule:_t,reflectionTexture:st.texture,normalTexture:xt,precomputedWaves:c,halfWaveBasis:l,surfaceGridCells:u,blockedSurfaceIndices:d,waterFrustumPatches:f,filterOutput:h===`tidewater`,surfaceSquaredFootprint:le,surfaceStaticInvariants:ue,precomputedEnvelope:F,vertexReflection:de,temporalWaveCoefficients:L,surfaceSingleCascade:fe,surfaceZeroGlint:pe,surfaceShadowBounds:Ct,surfaceHalfColor:me}),Tt=Ke||qe?new Hi({depthTexture:wt.depthTexture}):null,Et=qe?new Ui(Tt):null;V.surfaceDepth=wt.depthTexture;let G=new ei(null,{depth:k.depth,derivativeOnly:!0,fusedMips:!0});G.local.windSpeed=3.5,G.swell.scale=0,G.updateSpectrumUniforms();let K=new I(k.beige);h===`tidewater`&&K.setRGB(...oe([K.r,K.g,K.b],ce));let Ot=new Si,kt=[K.r,K.g,K.b,1],q=new Ti,J={label:`50 metre water map`,modules:[G.module,ai,yt,M,_t],bindings:{objectColor:{texture:H.texture},objectMotion:{texture:H.textures[1]},objectDepth:{texture:H.depthTexture},reflectionColor:{texture:st.texture},aa:{uniform:V.uniforms},waveHeight:{texture:bt.target.texture},waterOptics:{texture:dt.texture}},colorFormats:V.current.formats,code:`
const HALF_SIZE: f32 = ${k.halfSize}.0;
const BOTTOM: f32 = ${k.bottom}.0;
const BEIGE = vec3f(${K.r}, ${K.g}, ${K.b});

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
#if WATER_MOBILE_COMPOSITE
  // Optical color is independent of the yacht's raster resolution. Solve the
  // actual surface again here so the high-resolution hull/waterline stays sharp.
  let projected=frame.viewProjNoJitter*vec4f(origin+ray*10.0,1.0);
  let coordinate=projected.xy/projected.w*vec2f(.5,-.5)+.5;
  let color=textureSampleLevel(waterOptics,smpLinearClamp,coordinate,0.0).rgb;
  if(underwater) {
    let bed=bedDistance(origin,ray);
    let surface=surfaceDistance(origin,ray);
    return WaterRay(color,select(bed,surface,ray.y>0.00001&&surface>=0.0&&surface<bed));
  }
  if(ray.y>=-0.00001) { return WaterRay(BEIGE,100000.0); }
  let surface=surfaceDistance(origin,ray);
  return WaterRay(select(color,BEIGE,surface<0.0),select(surface,100000.0,surface<0.0));
#else
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
#endif
}

struct MapSample { color: vec3f, motion: vec4f, info: vec4f };
fn surfaceSample(uv: vec2f, water: WaterRay, ray: vec3f) -> MapSample {
  if (water.distance > 50000.0) { return MapSample(water.color,vec4f(0.0,0.0,60000.0,0.0),vec4f(60000.0,0.0,0.0,0.0)); }
  let point = frame.cameraPos + ray * water.distance;
  let depth = -(frame.view * vec4f(point,1.0)).z;
#if WATER_MOBILE
  // Water uses current spatial samples, never old glints. Only foreground
  // geometry needs reprojection; its actual motion is read from objectMotion.
  return MapSample(water.color,vec4f(0.0,0.0,depth,.8),vec4f(depth,2.0,0.0,0.0));
#else
  var previous = point;
  if (abs(point.y-waveSample(point.xz).x)<.15) { previous.y += waveSampleAt(point.xz,aa.previousTime).x-waveSample(point.xz).x; }
  let cur = frame.viewProjNoJitter * vec4f(point,1.0);
  let prev = aa.previousViewProj * vec4f(previous,1.0);
  let velocity = (cur.xy/cur.w-prev.xy/max(.001,prev.w))*vec2f(.5,-.5);
  let previousDepth = -(aa.previousView * vec4f(previous,1.0)).z;
  let reactive = select(.05,.45+clamp(max(max(water.color.r,water.color.g),water.color.b)-.9,0.0,.4),frame.dt>0.0);
  return MapSample(water.color,vec4f(velocity,previousDepth,reactive),vec4f(depth,2.0,0.0,0.0));
#endif
}
fn sceneSample(uv: vec2f, rayUV: vec2f, stableFluid: bool) -> MapSample {
#if WATER_MOBILE_COMPOSITE
  let dryPixel=vec2i(clamp(uv,vec2f(0.0),vec2f(.99999))*vec2f(textureDimensions(objectDepth)));
  let dryDepth=textureLoad(objectDepth,dryPixel,0);
  if(dryDepth>0.0 && frame.cameraPos.y>waves.maximumHeight) {
    let position=worldFromDepth(uv,dryDepth);
    let color=textureLoad(objectColor,dryPixel,0);
    // Both ends of this ray segment are above every wave crest. Fully opaque
    // yacht surfaces cannot receive water color or be occluded by the surface.
    if(position.y>waves.maximumHeight && color.a==1.0) {
      let motion=textureLoad(objectMotion,dryPixel,0);
      let viewDistance=-(frame.view*vec4f(position,1.0)).z;
      return MapSample(color.rgb,vec4f(motion.xy/max(.001,motion.w),motion.z/max(.001,motion.w),.02),vec4f(viewDistance,1.0,0.0,0.0));
    }
  }
#endif
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

struct MapOut { @location(0) color: vec4f, @location(1) motion: vec4f,
#if WATER_COMPACT
  @location(2) fluid: vec4f,
#else
  @location(2) info: vec4f,@location(3) fluid: vec4f,
#endif
};
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
#if WATER_MOBILE_COMPOSITE
    let stableUV=in.uv;
    fluid=sceneSample(stableUV-aa.jitter*frame.invResolution,stableUV,true).color;
#else
    for (var i=0;i<4;i++) {
      let offset=(vec2f(f32(i%2),f32(i/2))-.5)*.5;
      let stableUV=in.uv+offset*frame.invResolution;
      fluid+=sceneSample(stableUV-aa.jitter*frame.invResolution,stableUV,true).color*.25;
    }
#endif
  }
#if WATER_COMPACT
  let tag=select(chosen.info.y,-1.0,chosen.info.y==1.0&&chosen.motion.w>.5);
  return MapOut(vec4f(color,chosen.info.x),vec4f(chosen.motion.xyz,tag),vec4f(fluid,1.0));
#else
  return MapOut(vec4f(color,1.0),chosen.motion,chosen.info,vec4f(fluid,1.0));
#endif
}
`},At=new er(J),jt=new er({...J,label:`Mobile water with shared wave field`,defines:{WATER_MOBILE:1,WATER_WAVE_TEXTURE:1,WATER_MOBILE_COMPOSITE:1,WATER_COMPACT:1},colorFormats:V.compactCurrent.formats}),Mt=new er({...J,label:`Mobile spatial water lighting`,colorFormats:[`rgba16float`],bindings:{reflectionColor:J.bindings.reflectionColor,aa:J.bindings.aa,waveHeight:J.bindings.waveHeight},defines:{WATER_WAVE_TEXTURE:1,WATER_MOBILE:1},code:J.code.split(`struct MapSample`)[0]+`
@fragment fn fs(in: FSIn) -> @location(0) vec4f {
  var color=vec3f(0.0);
  for(var i=0;i<4;i++) {
    let offset=(vec2f(f32(i%2),f32(i/2))-.5)*.5;
    let uv=in.uv+offset*frame.invResolution;
    color+=shadeRay(uv,stableWaterRay(uv,true)).color*.25;
  }
  return vec4f(color,1.0);
}`}),Nt=[!1,!0].map(e=>new er({label:`Yacht without water`,colorFormats:(e?V.compactCurrent:V.fullCurrent).formats,defines:{WATER_COMPACT:+!!e},bindings:{objectColor:J.bindings.objectColor,objectMotion:J.bindings.objectMotion,objectDepth:J.bindings.objectDepth,aa:J.bindings.aa},code:`
const BEIGE=vec3f(${K.r},${K.g},${K.b});
struct DrySample { color:vec3f,motion:vec4f,info:vec4f };
fn drySample(uv:vec2f) -> DrySample {
  let pixel=vec2i(clamp(uv,vec2f(0.0),vec2f(.99999))*vec2f(textureDimensions(objectDepth)));
  let depth=textureLoad(objectDepth,pixel,0);
  if(depth<=0.0) { return DrySample(BEIGE,vec4f(0.0,0.0,60000.0,0.0),vec4f(60000.0,0.0,0.0,0.0)); }
  let color=textureLoad(objectColor,pixel,0);
  let motion=textureLoad(objectMotion,pixel,0);
  let position=worldFromDepth(uv,depth);
  let viewDistance=-(frame.view*vec4f(position,1.0)).z;
  return DrySample(color.rgb+BEIGE*(1.0-color.a),
    vec4f(motion.xy/max(.001,motion.w),motion.z/max(.001,motion.w),select(.02,.8,color.a<.98)),
    vec4f(viewDistance,1.0,0.0,0.0));
}
struct DryOut { @location(0) color:vec4f,@location(1) motion:vec4f,
#if WATER_COMPACT
  @location(2) fluid:vec4f,
#else
  @location(2) info:vec4f,@location(3) fluid:vec4f,
#endif
};
@fragment fn fs(in:FSIn) -> DryOut {
  var color=vec3f(0.0);
  var chosen=DrySample(BEIGE,vec4f(0.0,0.0,60000.0,0.0),vec4f(65000.0,0.0,0.0,0.0));
  let count=select(4,1,aa.enabled>.5);
  for(var i=0;i<count;i++) {
    let offset=select((vec2f(f32(i%2),f32(i/2))-.5)*.5,vec2f(0.0),count==1);
    let sample=drySample(in.uv+offset*frame.invResolution);
    color+=sample.color;
    if(sample.info.x<chosen.info.x) { chosen=sample; }
  }
  color/=f32(count);
#if WATER_COMPACT
  let tag=select(chosen.info.y,-1.0,chosen.info.y==1.0&&chosen.motion.w>.5);
  return DryOut(vec4f(color,chosen.info.x),vec4f(chosen.motion.xyz,tag),vec4f(BEIGE,1.0));
#else
  return DryOut(vec4f(color,1.0),chosen.motion,chosen.info,vec4f(BEIGE,1.0));
#endif
}`})),Y=[!1,!0].map(e=>new er({label:`Surface water and yacht composition`,modules:U?[U.module]:[],colorFormats:(e?V.compactCurrent:V.fullCurrent).formats.slice(0,e?2:3),defines:{WATER_COMPACT:+!!e,WATER_SIGNED_SURFACE_DEPTH:+!!T,WATER_LAZY_OPAQUE_COLOR:+!!he},bindings:{objectColor:J.bindings.objectColor,objectMotion:J.bindings.objectMotion,objectDepth:J.bindings.objectDepth,aa:J.bindings.aa,surfaceColor:{texture:()=>V.fluidTexture},surfaceDepth:{texture:wt.depthTexture}},code:at(`
struct SurfaceSample { color:vec3f,motion:vec4f,info:vec4f };
fn surfaceScene(uv:vec2f) -> SurfaceSample {
  let stableUV=uv+aa.jitter*frame.invResolution;
  let waterPixel=vec2i(clamp(stableUV,vec2f(0.0),vec2f(.99999))*vec2f(textureDimensions(surfaceDepth)));
  let waterDepth=textureLoad(surfaceDepth,waterPixel,0);
#if WATER_LAZY_OPAQUE_COLOR
  if(all(stableUV>=aa.foregroundRect.xy)&&all(stableUV<=aa.foregroundRect.zw)) {
    let objectPixel=vec2i(clamp(uv,vec2f(0.0),vec2f(.99999))*vec2f(textureDimensions(objectDepth)));
    let visibleDepth=textureLoad(objectDepth,objectPixel,0);
    if(visibleDepth>waterDepth&&visibleDepth>0.0) {
      let visibleColor=textureLoad(objectColor,objectPixel,0);
      if(visibleColor.a==1.0) {
        let visibleMotion=textureLoad(objectMotion,objectPixel,0);
        return SurfaceSample(visibleColor.rgb,
          vec4f(visibleMotion.xy/max(.001,visibleMotion.w),visibleMotion.z/max(.001,visibleMotion.w),.02),
          vec4f(viewDepth(visibleDepth),1.0,0.0,0.0));
      }
    }
  }
#endif
  let water=textureSampleLevel(surfaceColor,smpLinearClamp,stableUV,0.0).rgb;
  var result=SurfaceSample(water,vec4f(0.0,0.0,60000.0,0.0),vec4f(60000.0,0.0,0.0,0.0));
  if(waterDepth>0.0) {
    let depth=viewDepth(waterDepth);
    result=SurfaceSample(water,vec4f(0.0,0.0,depth,.8),vec4f(depth,2.0,0.0,0.0));
  }
  if(any(stableUV<aa.foregroundRect.xy)||any(stableUV>aa.foregroundRect.zw)) { return result; }
  let pixel=vec2i(clamp(uv,vec2f(0.0),vec2f(.99999))*vec2f(textureDimensions(objectDepth)));
  let depth=textureLoad(objectDepth,pixel,0);
  if(depth<=waterDepth||depth<=0.0) { return result; }
  let color=textureLoad(objectColor,pixel,0);
  let motion=textureLoad(objectMotion,pixel,0);
  return SurfaceSample(color.rgb+water*(1.0-color.a),
    vec4f(motion.xy/max(.001,motion.w),motion.z/max(.001,motion.w),select(.02,.8,color.a<.98)),
    vec4f(viewDepth(depth),1.0,0.0,0.0));
}
struct SurfaceOut { @location(0) color:vec4f,@location(1) motion:vec4f,
#if !WATER_COMPACT
  @location(2) info:vec4f,
#endif
};
@fragment fn fs(in:FSIn) -> SurfaceOut {
  var color=vec3f(0.0);
  var chosen=SurfaceSample(vec3f(0.0),vec4f(0.0),vec4f(65000.0,0.0,0.0,0.0));
  let count=select(4,1,aa.enabled>.5);
  let globalUV=select(in.uv,(in.pos.xy+aa.surfaceCrop.xy)/aa.sourceSize,aa.surfaceCropActive>.5);
  for(var i=0;i<count;i++) {
    let offset=select((vec2f(f32(i%2),f32(i/2))-.5)*.5,vec2f(0.0),count==1);
    let sample=surfaceScene(globalUV+offset*frame.invResolution);
    color+=sample.color;
    if(sample.info.x<chosen.info.x) { chosen=sample; }
  }
  color/=f32(count);
#if WATER_COMPACT
  let tag=select(chosen.info.y,-1.0,chosen.info.y==1.0&&chosen.motion.w>.5);
  #if WATER_SIGNED_SURFACE_DEPTH
  let packedDepth=select(chosen.info.x,-chosen.info.x,aa.signedSurfaceDepth>.5&&chosen.info.y==2.0);
  return SurfaceOut(vec4f(color,packedDepth),vec4f(chosen.motion.xyz,tag));
#else
  return SurfaceOut(vec4f(color,chosen.info.x),vec4f(chosen.motion.xyz,tag));
#endif
#else
  return SurfaceOut(vec4f(color,1.0),chosen.motion,chosen.info);
#endif
}`)}));return V.setCompact(a),{fft:G,waves:Ze,physics:$e,scene:R,waveModule:yt,waveParams:vt,waveTexture:bt,lighting:B,meshRenderer:z,reflection:st,objects:H,optics:dt,opticsPass:Mt,aa:V,profiler:q,normalTexture:xt,surfaceRenderer:wt,opaqueIndexOrder:rt,environment:tt,look:h,triangleCull:et,yachtShadingCache:ot,surfaceOcclusion:Tt,surfaceShadowBounds:Ct,surfaceDepthPrefill:Et,objectCrop:U,waterStyle:o,waterVisible:!0,get pass(){return this.waterVisible?this.waterStyle===`surface`?Y[+!!this.mobilePerformance]:this.mobilePerformance?jt:At:Nt[+!!this.mobilePerformance]},mobilePerformance:a,reflectionScale:a?.5:1,elapsedTime:0,setWaterStyle(e){if(![`surface`,`volume`].includes(e))throw RangeError(`Unknown water style`);this.waterStyle!==e&&(this.waterStyle=e,V.reset(),this.reflectionKey=null,this.fftTime=void 0,e===`volume`&&!this.mobilePerformance&&(G.time.value=this.elapsedTime))},setWaterVisible(e){e=!!e,this.waterVisible!==e&&(this.waterVisible=e,V.reset(),e&&(this.mobilePerformance||(G.time.value=this.elapsedTime),this.fftTime=void 0))},setMobilePerformance(e){this.mobilePerformance=e,this.reflectionScale=e?.5:1,V.setCompact(e),e?vt.set(`rippleEpoch`,$e.time):G.time.value=this.elapsedTime,vt.set(`advectedRipples`,+!!e),this.fftTime=void 0,V.reset()},resetHistory(){V.reset(),this.reflectionKey=null},addObject(e,t){Ae&&e.userData?.exteriorOnly&&e.userData?.geometryRevision===4&&Pi(e),e.userData?.exteriorOnly&&e.userData?.geometryRevision===4&&e.traverse(e=>{e.isMesh&&(_e&&e.material.setDefine(`YACHT_PBR_FAST`,1),Re&&e.material.setDefine(`YACHT_COMPACT_PBR`,1),ze&&e.material.setDefine(`YACHT_DIELECTRIC_SCALAR`,1),Be&&e.material.setDefine(`YACHT_SHARED_GGX_ANGLES`,1),Ve&&e.material.setDefine(`YACHT_HALF_COLOR`,1),be&&e.material.setDefine(`YACHT_FLAT_SURFACE`,1),xe&&e.material.setDefine(`YACHT_FLAT_COLOR`,1),ye&&(e.material.setDefine(`YACHT_COINCIDENT_COAT_NORMAL`,1),e.material.setDefine(`YACHT_ALIAS_COAT_NORMAL`,1)),(Ie||Ke||qe)&&!e.material.transparent&&(e.name===`Merged exterior`||e.name===`Merged glazing`)&&e.material.setDefine(`YACHT_OPAQUE_COLOR`,1),Ue&&e.material.setDefine(`WATER_YACHT_CACHE_CLASS`,e.name===`Merged exterior`?1:e.name===`Merged glazing`?2:0),je&&e.material.setDefine(`YACHT_DIRECT_ZERO_FAST`,1),Pe&&h===`tidewater`&&e.material.setDefine(`YACHT_ENV_HOMOGENEOUS`,1),ve&&(e.name===`Merged glazing`||e.name===`Glass balustrades`)&&e.material.setDefine(`YACHT_COINCIDENT_COAT_NORMAL`,1))}),Se&&e.userData?.exteriorOnly&&e.userData?.geometryRevision===4&&Yt(e),Ce&&bn(e),U&&e.userData?.exteriorOnly&&e.userData?.geometryRevision===4&&e.traverse(e=>{e.isMesh&&it.set(e,{geometry:e.geometry,position:e.geometry.attributes.position,positionArray:e.geometry.attributes.position.array,positionVersion:e.geometry.attributes.position.version,attributesVersion:e.geometry.attributesVersion,material:e.material,vertex:e.material.vertex})}),rt&&e.userData?.exteriorOnly&&e.userData?.geometryRevision===4&&rt.register(e);let n=$e.add(e,t);return R.add(e),V.reset(),this.reflectionKey=null,n},removeObject(e){return $e.remove(e)?(R.remove(e.object),V.reset(),this.reflectionKey=null,!0):!1},render(e,t,n,r,a){this.elapsedTime+=a,$e.update(a);let o=0;R.traverse(e=>{e.isMesh&&o++}),z.capacity=Math.max(z.capacity,Math.ceil((o+16)/64)*64),vt.set(`time`,$e.time),vt.set(`strength`,Ze.strength),vt.set(`maximumHeight`,Ze.maxHeight),ut.dt.value=a,ut.time.value=$e.time,ct.fields.outputResolution.value.set(t,n),tt?.update(B.elevation,B.azimuth),tt&&nt&&Object.assign(nt,tt.lightingHooks),B.setSun(B.elevation,B.azimuth),re(B.texture),P.beginFrame();let c=z.render,l=this.pass,u=[B.elevation,B.azimuth,B.enabled,Ze.strength,this.mobilePerformance,this.reflectionScale,this.waterVisible,this.waterStyle].join(`:`);this.historySignature!==u&&(V.reset(),this.historySignature=u);let[d,f]=V.begin(e,t,n,$e.time),m=V.current.width,_=V.current.height;pt(e,m,_,{jitterX:-d,jitterY:f,prevViewProj:V.uniforms.fields.previousViewProj.value});let v=this.waterVisible&&i?Ot.get(e,R,Ze.maxHeight):[0,0,1,1],y=Ot.getForeground(e,R);if(y[0]<=y[2]&&y[1]<=y[3]){let e=8/m+2/t,r=8/_+2/n;y[0]=Math.max(0,y[0]-e),y[1]=Math.max(0,y[1]-r),y[2]=Math.min(1,y[2]+e),y[3]=Math.min(1,y[3]+r)}V.uniforms.fields.foregroundRect.value.set(...y);let b=s&&this.waterVisible&&this.waterStyle===`surface`&&V.enabled;V.uniforms.set(`surfaceOnly`,+!!b),V.setSurfaceCrop?.(b?wi(y,m,_):null),V.uniforms.set(`signedSurfaceDepth`,+!!V.signedSurfaceDepthActive),!this.waterVisible&&i&&(v=y);let S=wi(v,m,_),C=wi(v,t,n);this.stats={source:[m,_],output:[t,n],scissor:S,foreground:y,waterVisible:this.waterVisible,waterStyle:this.waterStyle,waterRenderingSkipped:!this.waterVisible,shadedFraction:S[2]*S[3]/(m*_)},this.stats.surfaceFastResolve=b,q.begin(void 0,{source:[m,_],mobilePerformance:this.mobilePerformance,waterVisible:this.waterVisible,waterStyle:this.waterStyle}),q.active&&(z.render=(e,t)=>c.call(z,e,{...t,timestampWrites:q.writes(t.kind===`depth`?`shadow`:t.kind===`color`?`reflection`:`objects`)})),G.timestampWrites=null,l.timestampWrites=q.writes(this.waterVisible?`water`:`objectComposite`);for(let e of V.resolve)e.timestampWrites=null;if(V.enabled&&(V.resolve[V.index].timestampWrites=q.writes(`antiAliasing`)),V.present.timestampWrites=V.enabled&&V.directDisplay?null:q.writes(`display`),this.waterVisible&&this.waterStyle===`volume`){let e=G.time.value+a*G.timeScale;(G.needsSpectrum||this.fftTime===void 0||!this.mobilePerformance&&this.fftTime!==e)&&(G.timestampWrites=q.writes(`fft`),G.update(a)),this.fftTime=G.time.value,bt.pass.timestampWrites=q.writes(`waveField`),this.mobilePerformance&&bt.render($e.time,Ze.strength)}let T=B.update(e,ut.sunDir.value);if(B.render(R,z,T),Ct?.update({scene:R,shadowUniforms:O,maxHeight:Ze.maxHeight,renderedCascades:T,layerMask:B.layerMask}),this.waterVisible){let t=this.waterStyle===`surface`,n=t?.25:this.reflectionScale,r=[m,_,B.elevation,B.azimuth,B.enabled,...e.matrixWorld.elements,...e.projectionMatrix.elements].join(`:`),i=!t||this.reflectionKey!==r||this.reflectionTime===void 0||$e.time-this.reflectionTime>=1/12;i&&(st.setSize(Math.max(1,Math.ceil(m*n)),Math.max(1,Math.ceil(_*n))),ht.matrixWorld.multiplyMatrices(mt,e.matrixWorld),ht.projectionMatrix.copy(e.projectionMatrix),ht.near=e.near,ht.far=e.far,pt(ht,st.width,st.height,{block:W}),gt.set(`matrix`,W.fields.viewProj.value),z.render(R,{camera:ht,frameBlock:W,kind:`color`,cullOverride:`front`,defines:{WATER_MAP_REFLECTION:1,WATER_PBR_EXACT:+!!p,WATER_SPECULAR_AA:+(h===`tidewater`),WATER_SHADOW_ROTATION:+!!ke,WATER_SINGLE_CASCADE:+!!Le},lightingHooks:nt,colorViews:[st.texture.view({mipLevelCount:1})],colorFormats:[`rgba16float`],depthView:st.depthTexture.view(),depthFormat:`depth32float`,clearColors:[[0,0,0,0]],clearDepth:0,depthStoreOp:`discard`}),x(st.texture),this.reflectionKey=r,this.reflectionTime=$e.time),this.stats.reflectionUpdated=i,!t&&this.mobilePerformance&&(dt.setSize(Math.max(1,Math.ceil(m*.5)),Math.max(1,Math.ceil(_*.5))),pt(e,dt.width,dt.height,{block:ft}),Mt.timestampWrites=q.writes(`waterOptics`),Mt.render({colorViews:dt.textures,frameBlock:ft,scissor:wi(v,dt.width,dt.height),clear:kt})),t&&(pt(e,m,_,{block:St}),wt.render({camera:e,width:m,height:_,colorTexture:V.fluidTexture,background:kt,frameBlock:St,timestampWrites:q.writes(`surfaceWater`)}),this.stats.surface=wt.stats)}if(U){let e=b&&!ot&&!Tt&&!g&&!et&&!V.fusedSurfaceCompositionActive&&!w;R.traverse(t=>{if(!t.isMesh||!t.visible)return;let n=it.get(t);(!n||t.geometry!==n.geometry||t.geometry.attributes.position!==n.position||t.geometry.attributes.position.array!==n.positionArray||t.geometry.attributes.position.version!==n.positionVersion||t.geometry.attributesVersion!==n.attributesVersion||t.material!==n.material||t.material.vertex!==n.vertex)&&(e=!1)});let t=wi(y,m,_),n=U.configure(t,m,_,{certified:e});Ee&&!U.containsSourceReadRect(t,{padding:1})&&(n=U.configure(null,m,_,{certified:!1})),H.setSize(...n.size),this.stats.objectCrop=U.stats}else H.setSize(m,_);if(Tt&&(Tt.update({camera:e,scene:R,width:m,height:_,outputWidth:t,outputHeight:n,jitterX:d,jitterY:f,enabled:b,aaEnabled:V.enabled}),this.stats.surfaceOcclusion=Tt.stats),ot){V.needsReset&&ot.invalidate();let t=[];R.traverse(e=>{e.isMesh&&t.push([e.id,e.visible,e.geometry.id,e.geometry.attributesVersion,e.geometry.index?.version,...Object.entries(e.geometry.attributes).map(([e,t])=>[e,t.version,t.data?.version]),...(Array.isArray(e.material)?e.material:[e.material]).map(e=>[e.id,e.version,...Object.entries(e.uniforms).map(([e,t])=>[e,t.value])])])});let n=ot.beginFrame({width:m,height:_,camera:e,jitter:ct.fields.jitter.value,revisionKey:u+JSON.stringify([t,tt?.params.fields.intensity.value])});this.stats.yachtShadingRefreshed=!n,this.stats.yachtShadingReuseAge=ot.stats.currentReuseAge}let E=(!g&&Et?.render({depthTexture:H.depthTexture,scissor:wi(y,m,_)}))??!1;this.stats.waterSurfaceDepthPrefill=E,g&&z.render(R,{label:`Water-map opaque depth prepass`,camera:e,kind:`depth`,late:!0,filter:e=>!Array.isArray(e.material)&&!e.material.transparent&&e.material.depthWrite!==!1&&!e.material.depthBias&&!e.material.depthBiasSlopeScale,colorViews:[],colorFormats:[],depthView:H.depthTexture.view(),depthFormat:`depth32float`,clearDepth:0});let ee=z.frame===P.frame?z.stats.draws:0;z.render(R,{camera:e,kind:`main`,late:!0,waterOpaqueIndexOrder:rt,viewport:U&&(De||Oe)?[-U.origin[0],-U.origin[1],m,_,0,1]:void 0,waterObjectCropModule:De?void 0:U?.module,yachtTriangleCull:et,defines:{WATER_OBJECT_CROP_VIEWPORT:+!!Oe,WATER_MAP_MOTION:1,WATER_PBR_EXACT:+!!p,WATER_SPECULAR_AA:+(h===`tidewater`),WATER_SHADOW_ROTATION:+!!ke,WATER_SINGLE_CASCADE:+!!Le,WATER_YACHT_SHADING_CACHE:+!!Ue,WATER_SURFACE_YACHT_OCCLUSION:+!!Ke},yachtShadingCacheModule:ot?.module,waterSurfaceOcclusionModule:Tt?.module,lightingHooks:nt,colorViews:H.textures.map(e=>e.view()),colorFormats:H.formats,depthView:H.depthTexture.view(),depthFormat:`depth32float`,clearColors:H.textures.map(()=>[0,0,0,0]),clearDepth:g||E?null:0}),this.stats.mainDraws=z.stats.draws-ee,ot?.capture();let D=this.waterVisible&&this.waterStyle===`surface`?V.current.textures.slice(0,this.mobilePerformance?2:3):V.current.textures,k=this.mobilePerformance?[[...kt.slice(0,3),6e4],[0,0,6e4,0],kt]:[kt,[0,0,6e4,0],[6e4,0,0,0],kt],A=b?wi(y,m,_):S,j=V.surfaceCrop?[A[0]-V.surfaceCrop.origin[0],A[1]-V.surfaceCrop.origin[1],A[2],A[3]]:A;this.stats.compositeScissor=j,this.stats.surfaceCrop=V.surfaceCrop,this.stats.fusedSurfaceComposition=!!V.fusedSurfaceCompositionActive,V.fusedSurfaceCompositionActive||l.render({colorViews:D,scissor:j,clearColors:k.slice(0,D.length)}),V.finish(e,$e.time,r,{scissor:C,background:kt}),z.render=c,q.finish(),P.submit()}}}async function ea(t,{forceWebGL:n=!1}={}){let r=null;if(!n&&navigator.gpu){let e=new Mt(t);try{return await e.init(),P.context.configure({device:P.device,format:P.format,alphaMode:`premultiplied`,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST}),{backend:`webgpu`,engine:e,createRenderer:$i,ready:()=>P.pipelinesReady(),waitForGPU:()=>P.queue.onSubmittedWorkDone()}}catch(t){r=String(t.message||t),e.stop(),e.canvas?.remove()}}let{createWaterWebGLEngine:i,createWaterWebGLRenderer:a}=await e(async()=>{let{createWaterWebGLEngine:e,createWaterWebGLRenderer:t}=await import(`./WaterWebGLBackend-BmfJJK-Q.js`);return{createWaterWebGLEngine:e,createWaterWebGLRenderer:t}},__vite__mapDeps([0,1]),import.meta.url),o=i(t);return{backend:`webgl2`,engine:o,webGPUError:r,createRenderer:e=>a(o,e),ready:e=>e.prepare(),waitForGPU:()=>o.waitForGPU()}}new I;var ta=new T;new w,new de,new T;function na(e,t){let n=e.attributes.position,r=e.index.array,i=new T,a=new T,o=new T,s=new T,c=new T;for(let e=0;e<r.length;e+=3)i.fromBufferAttribute(n,r[e]),a.fromBufferAttribute(n,r[e+1]),o.fromBufferAttribute(n,r[e+2]),s.subVectors(a,i).cross(o.sub(i)),c.add(s);if(c.dot(t)<0){let t=Array.from(r);for(let e=0;e<t.length;e+=3){let n=t[e+1];t[e+1]=t[e+2],t[e+2]=n}e.setIndex(t)}return e}function ra(e,t,n,{edges:r=!0,back:i=!0,front:a=!0}={}){let o=e.map(e=>new b(e[0],e[1])),s=t.map(e=>e.map(e=>new b(e[0],e[1])));Ce.isClockWise(o)&&o.reverse();for(let e of s)Ce.isClockWise(e)||e.reverse();let c=Ce.triangulateShape(o,s),l=o.concat(...s),u=[],d=e=>{let t=[],r=[];for(let i of l){let a=n(i.x,i.y,e);t.push(a.x,a.y,a.z),r.push(i.x,i.y)}let i=[];for(let e of c){let t=l[e[0]],n=l[e[1]],r=l[e[2]];Math.abs((n.x-t.x)*(r.y-t.y)-(r.x-t.x)*(n.y-t.y))>1e-10&&i.push(e[0],e[1],e[2])}let a=new vr;a.setAttribute(`position`,new Bt(t,3)),a.setAttribute(`uv`,new Bt(r,2)),a.setIndex(i);let s=o[0],u=n(s.x,s.y,e).sub(n(s.x,s.y,1-e));na(a,u),a.computeVertexNormals();let d=a.attributes.normal;u.normalize();for(let e=0;e<d.count;e++)Math.hypot(d.getX(e),d.getY(e),d.getZ(e))<.5&&d.setXYZ(e,u.x,u.y,u.z);return a};if(a&&u.push(d(0)),i&&u.push(d(1)),r){let e=[],t=[],r=[],i=[o,...s],a=new T,c=new T,l=new T,d=new T,f=new T,p=new T;for(let o of i){let i=0;for(let s=0;s<o.length;s++){let u=o[s],m=o[(s+1)%o.length],h=u.distanceTo(m);if(h<1e-6)continue;a.copy(n(u.x,u.y,0)),c.copy(n(u.x,u.y,1)),l.copy(n(m.x,m.y,0)),d.copy(n(m.x,m.y,1));let g=a.distanceTo(c),_=e.length/3;e.push(a.x,a.y,a.z,l.x,l.y,l.z,d.x,d.y,d.z,c.x,c.y,c.z),t.push(i,0,i+h,0,i+h,g,i,g),i+=h;let v=(u.x+m.x)/2,y=(u.y+m.y)/2,b=(m.y-u.y)/h*.01,x=-(m.x-u.x)/h*.01;p.copy(n(v+b,y+x,0)).sub(n(v,y,0)),f.subVectors(l,a).cross(ta.subVectors(c,a)),f.dot(p)>=0?r.push(_,_+1,_+2,_,_+2,_+3):r.push(_,_+2,_+1,_,_+3,_+2)}}if(e.length){let n=new vr;n.setAttribute(`position`,new Bt(e,3)),n.setAttribute(`uv`,new Bt(t,2)),n.setIndex(r),n.computeVertexNormals(),u.push(n)}}return u.length===1?u[0]:Pr(u,!1)}var ia=Object.freeze({url:`https://azimutyachts.com/wp-content/uploads/2022/04/Trideck_menu.png`,width:1400,height:800,stern:55,bow:1348,waterline:595}),aa=38.22/1293,Z=e=>(e-55)*aa-19.11,Q=e=>(595-e)*aa,oa=([e,t])=>[Z(e),Q(t)],sa=Object.freeze({mainGlass:[[385,451],[739,451],[820,449],[1342,450],[1335,468],[1250,475],[1104,480],[1076,487],[1044,513],[1020,516],[960,516],[925,503],[897,498],[852,496],[739,494],[732,491],[392,493]],mainRoof:[[283,438],[288,431],[310,424],[329,420],[710,418],[746,415],[802,414],[922,413],[975,416],[1110,422],[1240,429],[1294,434],[1326,438],[1348,445],[1348,450],[829,453],[819,455],[387,454],[333,451],[300,448],[284,443]],upperGlass:[[432,415],[454,401],[478,391],[519,375],[575,374],[698,374],[818,372],[848,372],[861,381],[884,402],[907,416],[864,418],[630,418],[520,417]],upperRoof:[[368,369],[375,363],[399,354],[445,346],[548,343],[638,343],[724,344],[750,351],[819,357],[883,362],[919,367],[936,371],[935,373],[900,373],[842,372],[786,372],[717,375],[650,378],[610,377],[514,373],[451,373],[417,374],[376,374]],hardtop:[[519,284],[526,280],[540,277],[581,275],[650,276],[704,279],[739,282],[742,284],[735,288],[698,288],[652,286],[579,287],[541,289],[522,288]],mastSupport:[[555,341],[577,299],[584,291],[610,290],[603,320],[597,341]],mast:[[574,276],[583,192],[596,190],[603,219],[609,255],[614,275]],terraceBrace:[[304,493],[345,479],[394,455],[442,455],[408,484],[378,502],[364,502],[412,462],[398,462],[344,489],[315,496]],sternBrace:[[77,547],[113,519],[144,507],[242,507],[240,520],[195,520],[151,524],[116,551]]});function ca(e,t){let n=(t+19.11)/aa+55;for(let t=1;t<e.length;t++){let[r,i]=e[t-1],[a,o]=e[t];if(n<=a)return Q(i+(o-i)*Math.max(0,(n-r)/(a-r)))}return Q(e.at(-1)[1])}var la=[[55,561],[70,552],[109,550],[150,551],[215,551],[252,549],[260,508],[400,504],[740,500],[882,500],[940,516],[1020,517],[1093,484],[1260,475],[1338,470],[1348,450]],ua=[[1100,646],[1170,633],[1225,601],[1250,584],[1297,551],[1322,517],[1340,483],[1348,468]],$=Object.freeze({name:`Azimut Grande Trideck · 38 Metri`,length:38.22,beam:7.98,draft:2.02,mass:192e3,hullDraft:1.55,source:`https://azimutyachts.com/en/grande-series/grande-trideck/`,dimensionsVerified:!0,exterior:`Reference-inspired exterior; not manufacturer CAD`}),da=[[-19.11,3.53],[-17.7,3.68],[-13,3.91],[-6,3.95],[0,3.95],[6,3.82],[11,3.2],[15,2.12],[17.8,.87],[19.11,0]];function fa(e){for(let t=1;t<da.length;t++){let[n,r]=da[t-1],[i,a]=da[t];if(e<=i){let t=Math.max(0,(e-n)/(i-n));return(r+(a-r)*t)*$.beam/7.9}}return 0}function pa(e){return e<11.7?-$.hullDraft:Math.max(-$.hullDraft,ca(ua,e))}function ma(e){return ca(la,e)}var ha=Object.freeze([[0,0],[.28,.06],[.64,.16],[.88,.31],[.95,.46],[.985,.68],[1,1]].map(Object.freeze));function ga(e,t){let n=pa(e),r=(t-n)/(ma(e)-n);if(r<=0)return 0;if(r>=1)return fa(e);for(let t=1;t<ha.length;t++){let[n,i]=ha[t-1],[a,o]=ha[t];if(r<=o)return fa(e)*(n+(a-n)*(r-i)/(o-i))}return 0}function _a(){let e=[],t=$.length/20,n=.4;for(let r=0;r<20;r++){let i=-$.length/2+(r+.5)*t;for(let r=-$.hullDraft+n/2;r<1;r+=n){let a=ga(i,r),o=2*a/3;if(!(o<.03))for(let s=0;s<3;s++)e.push({position:[-a+(s+.5)*o,r,i],volume:o*n*t,halfSize:[o/2,n/2,t/2]})}}let r=0,i=0;for(let t of e){let e=Math.max(0,Math.min(1,(.5*n-t.position[1])/n));r+=t.volume*e,i+=t.volume*e*t.position[2]}let a=$.mass/(r*1025);for(let t of e)t.volume*=a;return{samples:e,mass:$.mass,centerOfMass:[0,-.05,i/r],displacementCenter:[0,0,0],dimensions:[$.beam,5.7,$.length],drag:1.65}}function va(e){if(e.index)return e;let t=e.attributes.position?.count??0;if(!t)return e;let n=Object.entries(e.attributes).map(([e,n])=>{if(!(n.array instanceof Float32Array)||n.isInterleavedBufferAttribute||n.count!==t)throw TypeError(`Exact yacht indexing requires equally sized plain float32 attributes`);return{name:e,attribute:n,size:n.itemSize,bits:new Uint32Array(n.array.buffer,n.array.byteOffset,n.array.length)}}),r=new Uint32Array(t),i=new Uint32Array(t),a=new Map,o=0,s=(e,t)=>{for(let{bits:r,size:i}of n)for(let n=0;n<i;n++)if(r[e*i+n]!==r[t*i+n])return!1;return!0};for(let e=0;e<t;e++){let t=2166136261;for(let{bits:r,size:i}of n)for(let n=0;n<i;n++)t=Math.imul(t^r[e*i+n],16777619);let c=a.get(t),l;if(typeof c==`number`?s(e,r[c])&&(l=c):c&&(l=c.find(t=>s(e,r[t]))),l!==void 0){i[e]=l;continue}i[e]=o,r[o]=e,c===void 0?a.set(t,o):typeof c==`number`?a.set(t,[c,o]):c.push(o),o++}if(o===t)return e;for(let{name:t,attribute:i,size:a,bits:s}of n){let n=new Float32Array(o*a),c=new Uint32Array(n.buffer);for(let e=0;e<o;e++){let t=r[e]*a;for(let n=0;n<a;n++)c[e*a+n]=s[t+n]}let l=new It(n,a,i.normalized);l.name=i.name,l.usage=i.usage,l.gpuType=i.gpuType,e.setAttribute(t,l)}return e.setIndex(o<=65536?new Rt(i,1):new zt(i,1)),e}var ya=Object.freeze({profile:ia.url,sundeck:`https://azimutyachts.com/wp-content/uploads/2023/01/Trideck-Sundeck-1.jpg`,aft:`https://azimutyachts.com/wp-content/uploads/2025/10/Trideck-External-View-2.jpg`,side:`https://azimutyachts.com/wp-content/uploads/2022/04/Trideck-External-View-1-3.jpg`}),ba=Object.freeze({minX:-2.94,maxX:-1.97,minZ:-8.85,maxZ:-5.8}),xa=(e,t,n)=>Math.max(t,Math.min(n,e));function Sa(e,t){for(let n=1;n<e.length;n++)if(t<=e[n][0]){let[r,i]=e[n-1],[a,o]=e[n];return i+(o-i)*xa((t-r)/(a-r),0,1)}return e.at(-1)[1]}function Ca(e,t,n){let r=[];for(let i=0;i<e.length;i++){let a=e[(i+e.length-1)%e.length],o=e[i],s=e[(i+1)%e.length],c=Math.hypot(a[0]-o[0],a[1]-o[1]),l=Math.hypot(s[0]-o[0],s[1]-o[1]),u=Math.min(t,c*.24,l*.24),d=o.map((e,t)=>e+(a[t]-e)*u/c),f=o.map((e,t)=>e+(s[t]-e)*u/l);for(let e=0;e<=n;e++){let t=e/n;r.push(o.map((e,n)=>(1-t)**2*d[n]+2*(1-t)*t*e+t*t*f[n]))}}return r}function wa(e,t,n){let r=e.reduce((t,n)=>[t[0]+n[0]/e.length,t[1]+n[1]/e.length],[0,0]);return e.map(e=>[r[0]+(e[0]-r[0])*t,r[1]+(e[1]-r[1])*n])}function Ta(e,t){let n=new Or(e.map(e=>new b(...e)),t),r=n.attributes.position,i=n.index.array,a=[];for(let e=0;e<i.length;e+=3){let t=i[e],n=i[e+1],o=i[e+2],s=r.getX(n)-r.getX(t),c=r.getY(n)-r.getY(t),l=r.getZ(n)-r.getZ(t),u=r.getX(o)-r.getX(t),d=r.getY(o)-r.getY(t),f=r.getZ(o)-r.getZ(t);Math.hypot(c*f-l*d,l*u-s*f,s*d-c*u)>1e-12&&a.push(t,n,o)}return n.setIndex(a),n}function Ea(e,{upper:t,lower:n,halfWidth:r,hi:i,crown:a=0,deckY:o=null,opening:s=null}){let c=t[0][0],l=t.at(-1)[0],u=[...t,...n].map(e=>e[0]);s&&u.push(s.minZ,s.maxZ);let d=[...new Set(u)].filter(e=>e>=c&&e<=l).sort((e,t)=>e-t);if(i){let e=[];for(let t=1;t<d.length;t++)d[t]-d[t-1]>.9&&e.push((d[t]+d[t-1])/2);d=d.concat(e).sort((e,t)=>e-t)}let f=i?[-1,-.99,-.95,-.8,-.5,0,.5,.8,.95,.99,1]:[-1,-.985,-.94,-.5,0,.5,.94,.985,1],p=[],m=[],h=[],g=[],_=new Map,v=e=>{let t=Math.min(1,(e-c)/(o===null?.66:1.2)),n=Math.min(1,(l-e)/(o===null?.9:1.55));return r*Math.sqrt(Math.max(18e-5,Math.min(1-(1-t)**2,1-(1-n)**2)))},y=(e,r)=>{let i=v(r),s=Math.abs(e/i),c=Sa(t,r);if(o!==null&&r>=Z(405)&&r<=Z(725))return o+(c-o)*xa((s-.93)/.07,0,1);let l=Math.max(0,c-Sa(n,r)-.015-.018-.03);return c-Math.min(a,l)*s*s-.018*xa((s-.96)/.04,0,1)},b=(e,t)=>Sa(n,t)+.015*(e/v(t))**2;for(let e of d){let t=v(e),n=f.map(e=>e*t);s&&e>=s.minZ&&e<=s.maxZ&&(n[2]=s.minX,n[3]=s.maxX);for(let t of n)p.push([t,y(t,e),e])}let x=p.length;for(let[e,,t]of p.slice())p.push([e,b(e,t),t]);let S=(e,t)=>{let n=Math.min(e,t)+`:`+Math.max(e,t);_.has(n)?_.delete(n):_.set(n,[e,t])};for(let e=1;e<d.length;e++)for(let t=0;t<f.length-1;t++){let n=(e-1)*f.length+t,r=n+1,i=e*f.length+t,a=i+1,o=(p[n][0]+p[r][0]+p[i][0]+p[a][0])/4,c=(d[e-1]+d[e])/2;if(!(s&&o>s.minX&&o<s.maxX&&c>s.minZ&&c<s.maxZ)){m.push(n,i,r,r,i,a),h.push(x+n,x+r,x+i,x+r,x+a,x+i);for(let e of[[n,i],[i,a],[a,r],[r,n]])S(...e)}}for(let[e,t]of _.values())g.push(e,x+e,t,t,x+e,x+t);let C=e(p,[...m,...h,...g],!0),w=C.attributes.position,T={minimumThickness:1/0,maximumThickness:0,sampledVertices:x,minimumAt:null,source:`Every paired Float32 top/bottom mesh vertex; common X/Z triangles interpolate thickness linearly`};for(let e=0;e<x;e++){let t=w.getY(e)-w.getY(e+x);if(t<T.minimumThickness&&(T.minimumThickness=t,T.minimumAt=[w.getX(e),w.getZ(e)]),T.maximumThickness=Math.max(T.maximumThickness,t),!Number.isFinite(t)||t<=0)throw RangeError(`Azimut top roof has nonpositive exterior shell clearance`)}let E=e=>{let t=new vr;return t.setAttribute(`position`,C.attributes.position),t.setAttribute(`normal`,C.attributes.normal),t.setIndex(e),t};return{geometry:C,top:E(m),bottom:E(h),edges:E(g),upperAt:y,lowerAt:b,widthAt:v,rear:c,front:l,clearance:T}}function Da(e){let{shell:t,hi:n,triangles:r,sunFloor:i,colors:{white:a,trim:o,metal:s},surfaces:{painted:c,steel:l}}=e,u=t.p?.length,d=0,f=[],p={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]},m=e=>{for(let t=0;t<3;t++)p.min[t]=Math.min(p.min[t],e[t]),p.max[t]=Math.max(p.max[t],e[t])},h=(e,n,r)=>{d+=(e.index?.count??e.attributes.position.count)/3;let i=e.attributes.position;for(let e=0;e<i.count;e++)m([i.getX(e),i.getY(e),i.getZ(e)]);t.add(e,n,r)},g=(t,n,r,i,a=.025)=>{e.box(t,n,r,i,a),d+=a?108:12,m(n.map((e,n)=>e-t[n]/2)),m(n.map((e,n)=>e+t[n]/2))},_=(t,r,i,a=s,o=l)=>{e.rod(t,r,i,a,o),d+=4*(n?8:5);for(let e of[t,r])m(e.map(e=>e-i)),m(e.map(e=>e+i))},v=(e,t,n={})=>{let r=d;t(),f.push({name:e,triangles:d-r,...n})},y=3160123,b=[.16,.18,0,1],x=Ea(r,{upper:sa.upperRoof.slice(0,12).map(oa),lower:sa.upperRoof.slice(12).map(oa).reverse(),halfWidth:3.2,hi:n,deckY:i-.065,opening:ba});v(`Swept white sundeck supporting roof and stair aperture`,()=>{h(x.geometry,a,c)},{estimatedMaximumBeam:6.4,stairOpening:{...ba},clearance:x.clearance});let S=Ea(r,{upper:sa.hardtop.slice(0,8).map(oa),lower:sa.hardtop.slice(8).map(oa).reverse(),halfWidth:2.1,hi:n,crown:.16});v(`Crowned dark hardtop with reflective rounded perimeter`,()=>{h(S.top,y,[.21,.16,0,1]),h(S.bottom,6450288,[.34,.07,0,1]),h(S.edges,3423294,[.13,.33,0,1])},{estimatedBeam:4.2,longitudinalSpan:[S.rear,S.front],clearance:S.clearance}),v(`Flush canopy seams and downlights`,()=>{let e=(e,t,n)=>{let i=t[0]-e[0],a=t[1]-e[1],o=Math.hypot(i,a),s=-a/o*n/2,c=i/o*n/2,l=[[e[0]-s,e[1]-c],[t[0]-s,t[1]-c],[t[0]+s,t[1]+c],[e[0]+s,e[1]+c]].map(([e,t])=>[e,S.lowerAt(e,t)-.002,t]);h(r(l,[0,1,2,0,2,3]),1120283,[.5,0,0,1])};for(let t of[-.68,.68])e([t,Z(541)],[t,Z(724)],.009);for(let t of[592,655])e([-1.93,Z(t)],[1.93,Z(t)],.009);let t=n?10:8;for(let e of[-1,1])for(let n=0;n<7;n++){let i=e*1.18,a=Z(550+157*n/6),o=S.lowerAt(i,a)-.006,c=[[i,o-.001,a]],l=[],u=[];for(let e=0;e<2;e++)for(let n=0;n<t;n++){let r=n*Math.PI*2/t,s=e?.068:.055;c.push([i+Math.cos(r)*s,o,a+Math.sin(r)*s])}for(let e=0;e<t;e++){let n=(e+1)%t;l.push(0,1+e,1+n),u.push(1+e,1+t+e,1+n,1+n,1+t+e,1+t+n)}h(r(c,l),14278093,[.36,0,0,1]),h(r(c,u),s,[.17,.72,0,1])}},{downlights:14,dynamicLights:0,estimatedFixtureStations:[550,550+157/6,550+157/3,628.5,550+314/3,550+785/6,707],estimatedFixtureX:[-1.18,1.18]}),v(`Paired outboard swept pylons with shaped service panels`,()=>{let t=Ca(sa.mastSupport.map(oa),.045,n?3:2),r=wa(t,.8,.83);for(let a of[-1,1]){let s=a*1.85;h(ra(t,[],(e,t,n)=>new T(s+(n?-.145:.145),t,e)),y,b);let l=Z(576),u=s-.17,d=s+.17,f=l-.65,p=l+.65,m=.028;h(e.plate([[u+m,f],[d-m,f],[d,f+m],[d,p-m],[d-m,p],[u+m,p],[u,p-m],[u,f+m]],i-.012,Q(341)+.01),o,c);let g=Ca([[577,296],[582,286],[617,286],[611,296]].map(oa),.045,n?3:2);h(ra(g,[],(e,t,n)=>new T(s+(n?-.16:.16),t,e)),y,b);for(let e of[-1,1]){let t=s+e*.1465;h(ra(r,[],(n,r,i)=>new T(t+e*(i?0:.001),r,n),{back:!1,edges:!1}),1054233,[.32,0,0,1]);let n=wa(r,.965,.974);h(ra(n,[],(n,r,i)=>new T(t+e*(i?0:.002),r,n),{back:!1,edges:!1}),3159865,[.21,.14,0,1])}}},{count:2,estimatedCentersX:[-1.85,1.85],sectionThickness:.29,tracedBodyProfile:`mastSupport`,lateralPositionEstimated:!0}),v(`Slender polished forward canopy posts and seated fittings`,()=>{for(let e of[-1,1]){let t=e*1.87,r=Z(678),a=S.lowerAt(t,r);_([t,i+.015,r],[t,a+.016,r],.034);for(let e of[i+.012,a-.014])h(new Dr(.062,.062,.024,n?10:6).translate(t,e,r),s,l)}},{count:2,estimatedCenters:[[-1.87,Z(678)],[1.87,Z(678)]],estimatedDiameter:.068}),v(`Tapered equipment mast, scanner mounts and aerials`,()=>{let e=sa.mast.map(oa);h(ra(e,[],(e,t,n)=>{let r=.22-.075*xa((t-Q(276))/(Q(190)-Q(276)),0,1);return new T(n?-r:r,t,e)}),y,b);let t=Z(588);_([0,Q(192),t],[0,Q(121),t],.023,y,[.25,.25,0,1]);for(let e of[122,138,154]){let r=Q(e);_([0,r,t],[0,r,t+.23],.013,y,b),h(new Dr(.037,.032,.057,n?8:6).translate(0,r+.025,t+.23),14278612,[.24,.1,0,1])}for(let[e,t,r]of[[585,193,1.4],[590,225,1.62]]){let i=Z(e),o=Q(t),s=i+r*.65;_([0,o-.24,i],[0,o-.24,s-.2],.045,y,b),_([0,o-.51,i-.04],[0,o-.24,s-.24],.028,y,b),h(new Dr(.085,.11,.15,n?10:6).translate(0,o-.145,i+r*.28),a,c),g([.2,.105,r],[0,o-.025,i+r*.28],14278105,[.22,.1,0,1],.026)}g([.54,.075,.38],[0,Q(257),Z(602)],y,b,0);for(let e of[-1,1])_([e*.21,Q(257),Z(602)],[e*.21,Q(251),Z(602)],.025,13686737,[.25,.2,0,1])},{whiteScanners:2,mastTraced:!0,hardwareDimensionsEstimated:!0}),v(`Paired capped barrel radomes with collars and tapered mounting bowls`,()=>{let e=n?24:16,t=n?[[0,0],[.25,0],[.32,.06],[.42,.16],[.59,.36],[.635,.43],[.635,.97],[.61,1.1],[.55,1.25],[.44,1.36],[.28,1.43],[0,1.448]]:[[0,0],[.25,0],[.34,.08],[.59,.36],[.635,.44],[.635,.97],[.57,1.22],[.42,1.37],[.25,1.43],[0,1.448]],i=Q(275),a=Z(557);for(let o of[-1,1]){let s=o*1.18,c=n?12:8,l=[],u=[];for(let e=0;e<2;e++)for(let t=0;t<c;t++){let n=t*Math.PI*2/c,r=e?.26:.31,o=s+Math.sin(n)*r,u=a+Math.cos(n)*r;l.push([o,e?i+.003:S.upperAt(o,u)-.004,u])}l.push([s,i+.003,a]);for(let e=0;e<c;e++){let t=(e+1)%c,n=e,r=t,i=c+e,a=c+t;u.push(n,r,i,r,a,i,c*2,i,a)}h(r(l,u,!0),y,b),h(Ta(t,e).translate(s,i,a),y,[.14,.16,0,1]),h(Ta([[.634,.421],[.659,.431],[.659,.454],[.634,.462]],n?20:12).translate(s,i,a),3884103,[.14,.32,0,1])}},{count:2,estimatedDiameter:1.27,estimatedHousingHeight:1.448,estimatedCenters:[[-1.18,Z(557)],[1.18,Z(557)]]});let C=u===void 0?d:(t.p.length-u)/9;if(u!==void 0){p.min.fill(1/0),p.max.fill(-1/0);for(let e=u;e<t.p.length;e+=3)m(t.p.slice(e,e+3))}return{revision:1,exteriorOnly:!0,referenceURLs:{...ya},components:f,triangles:C,triangleBudget:n?5500:3600,addedDrawCalls:0,textureBytes:0,bounds:p,stairOpening:{...ba},canopySpan:[S.rear,S.front],roofClearance:{white:x.clearance,hardtop:S.clearance},uncertainties:[`Roof beam/cross-section curvature and hidden underside are photograph-derived estimates.`,`Mirrored outboard pylon and slender-post lateral positions are inferred from the visible near/far pair.`,`Mast equipment brackets, radome dimensions and panel/downlight placement are inferred; component drawings are unavailable.`]}}function Oa(e){let{shell:t,railGlass:n,hi:r,sunFloor:i,upperAftFloor:a,colors:o,surfaces:s,triangles:c}=e,{white:l,metal:u,teak:d}=o,{painted:f,timber:p,steel:m}=s,h=[...p];h[2]=2;let g=13621462,_=15790572,v=11700802,y=[.8,0,0,.96],x=[.8,0,0,.93],S=Z(405),C=Z(725),E=-5.8,ee={},D=(e,n,r,i,a=t)=>{let o=(e.index?.count??e.attributes.position.count)/3;ee[i]=(ee[i]??0)+o,a.add(e,n,r)},O=(e,t,n,r,i)=>{D(new Er(...e).translate(...t),n,r,i)},k=(e,t,n,i,a,o)=>{let s=new T(...e),c=new T(...t),l=c.clone().sub(s),u=new Dr(n,n,l.length(),r?8:4,1,!0);u.applyQuaternion(new w().setFromUnitVectors(new T(0,1,0),l.normalize())),u.translate(...s.add(c).multiplyScalar(.5).toArray()),D(u,i,a,o)},A=(e,t,n=.12)=>{let i=[],a=r?3:2;n=Math.min(n,e/2,t/2);for(let[r,o,s]of[[e/2-n,t/2-n,0],[-e/2+n,t/2-n,Math.PI/2],[-e/2+n,-t/2+n,Math.PI],[e/2-n,-t/2+n,Math.PI*1.5]])for(let e=0;e<a;e++){let t=s+e/a*Math.PI/2;i.push([r+Math.cos(t)*n,o+Math.sin(t)*n])}return i},j=(e,t)=>{let n=[];for(let r=0;r<e.length;r++){let i=e[Math.max(0,r-1)],a=e[Math.min(e.length-1,r+1)],o=a[0]-i[0],s=a[1]-i[1],c=Math.hypot(o,s);n.push([s/c*t/2,-o/c*t/2])}return e.map((e,t)=>[e[0]+n[t][0],e[1]+n[t][1]]).concat(e.map((e,t)=>[e[0]-n[t][0],e[1]-n[t][1]]).reverse())},M=(e,t,n,r=.035,i=4)=>{let a=e.map(e=>new b(...e));Ce.isClockWise(a)&&(a=a.reverse());let o=a.length,s=[];for(let e=0;e<o;e++){let t=a[(e+o-1)%o],n=a[e],r=a[(e+1)%o],i=n.x-t.x,c=n.y-t.y,l=r.x-n.x,u=r.y-n.y,d=Math.hypot(i,c),f=Math.hypot(l,u),p=-c/d-u/f,m=i/d+l/f,h=Math.hypot(p,m);s.push(h>1e-8?[p/h,m/h]:[-c/d,i/d])}r=Math.min(r,(n-t)*.45);let c=i===3?[[t,r],[(t+n)*.5,0],[n,r]]:[[t,r],[t+r,0],[n-r,0],[n,r]],l=[],u=[];for(let[e,t]of c)for(let n=0;n<o;n++)l.push(a[n].x+s[n][0]*t,e,a[n].y+s[n][1]*t);for(let e=0;e<c.length-1;e++)for(let t=0;t<o;t++){let n=(t+1)%o,r=e*o+t,i=e*o+n,a=i+o,s=r+o;u.push(r,s,i,i,s,a)}let d=a.map((e,t)=>new b(e.x+s[t][0]*r,e.y+s[t][1]*r));for(let[e,t,n]of Ce.triangulateShape(d,[]))u.push(e,t,n,(c.length-1)*o+e,(c.length-1)*o+n,(c.length-1)*o+t);let f=new vr;return f.setAttribute(`position`,new Bt(l,3)),f.setIndex(u),f.computeVertexNormals(),f},te=(e,t,n,r,i,a,o,s,c,l=.1)=>{D(M(A(e,t,l),n,r).translate(i,0,a),o,s,c)},ne=(e,t,n,i,a=0)=>{let o=M(A(.4,.14,.064),-.2,.2,.05,r?4:3);o.rotateX(-.16).rotateY(a).translate(e,n,t),D(o,i,y,`lounge`)};D(ra([[-1.97,S],[2.48,S],[2.78,S+.18],[2.9,S+.42],[2.88,C-.42],[2.74,C-.12],[2.49,C],[-2.49,C],[-2.74,C-.12],[-2.88,C-.42],[-2.9,E],[-1.97,E]],[],(e,t,n)=>new T(e,n?i-.065:i,t)),d,p,`deck`);let re=new Set,ie=.82,ae=e=>{for(let t=0;t<e.length;t++){let[r,a]=e[t],o=r.toFixed(4)+`:`+a.toFixed(4);if(re.has(o)||(re.add(o),k([r,i+.025,a],[r,i+ie,a],.014,u,m,`guards`),O([.063,.018,.063],[r,i+.009,a],u,m,`guards`)),t===0)continue;let[s,l]=e[t-1],d=r-s,f=a-l,p=Math.hypot(d,f),g=d/p*.028,_=f/p*.028;k([s,i+ie,l],[r,i+ie,a],.023,7757895,h,`guards`);let v=[[s+g,i+.055,l+_],[r-g,i+.055,a-_],[r-g,i+ie-.035,a-_],[s+g,i+ie-.035,l+_]];D(c(v,[0,1,2,0,2,3,0,2,1,0,3,2]),15135732,[.09,0,0,1],`guards`,n)}};ae([[-1.97,S+.13],[-.83,S+.13],[.32,S+.13],[1.47,S+.13],[2.64,S+.25]]),ae([[2.64,S+.25],[2.79,-6.85],[2.79,-4.65],[2.79,-2.45],[2.77,-.45],[2.62,C-.14]]),ae([[2.62,C-.14],[1.79,C-.03],[.9,C-.03],[0,C-.03],[-.9,C-.03],[-1.79,C-.03],[-2.62,C-.14]]),ae([[-2.62,C-.14],[-2.77,-.45],[-2.79,-2.9],[-2.79,-5.7]]),ae([[-1.97,S+.13],[-1.97,-7.26],[-1.97,-5.7]]);let N=-5.55,oe=r?8:5;for(let e of[-1,1]){let t=[],n=e<0?Math.PI:0;for(let e=0;e<=oe;e++){let r=n-.69+1.38*e/oe;t.push([1.4*Math.cos(r),N+1.16*Math.sin(r)])}D(M(j(t,.76),i,i+.2,.035),7107699,[.35,.15,0,1],`lounge`);for(let e=0;e<2;e++){let t=[];for(let i=0;i<=(r?4:3);i++){let a=(e+i/(r?4:3))/2,o=n-.685+1.37*a;t.push([1.4*Math.cos(o),N+1.16*Math.sin(o)])}D(M(j(t,.71),i+.18,i+.39,.045),g,y,`lounge`)}D(M(j(t.map(([e,t])=>[e*1.23,N+(t-N)*1.23]),.15),i+.29,i+.77,.045),g,x,`lounge`),ne(e*1.48,-5.9799999999999995,i+.62,v,Math.atan2(-e*1.48,.43)),ne(e*1.5,-5.25,i+.62,_,Math.atan2(-e*1.5,-.3))}let se=r?24:16;D(new Dr(.675,.675,.045,se).translate(0,i+.47,N),u,m,`lounge`),D(new Dr(.653,.653,.042,se).translate(0,i+.49,N),12560255,h,`lounge`),D(new Dr(.21,.24,.42,r?12:8).translate(0,i+.2375,N),u,m,`lounge`),D(new Dr(.32,.32,.028,r?14:8).translate(0,i+.014,N),u,m,`lounge`);let ce=[{z:-2.8,facing:1},{z:-1.6,facing:-1}];for(let{z:e,facing:t}of ce){te(2.65,.52,i,i+1.01,0,e,l,f,`bars`,.2),te(2.79,.61,i+.99,i+1.055,0,e,16052971,f,`bars`,.2);for(let n of[-.88,0,.88]){let a=e-t*.7,o=i+.68;D(new Dr(.225,.225,.1,r?10:6).translate(n,o,a),g,y,`bars`);for(let e of[-.17,.17]){let r=[n+e,i+.025,a+t*.16],s=[n+e,i+.025,a-t*.16];k(r,s,.011,u,m,`bars`),k(r,[n+e,o-.045,a+t*.16],.011,u,m,`bars`),k(s,[n+e,i+1.01,a-t*.16],.011,u,m,`bars`)}k([n-.17,i+.28,a+t*.16],[n+.17,i+.28,a+t*.16],.012,u,m,`bars`);let s=[];for(let e=0;e<=(r?5:3);e++){let i=-.22+.44*e/(r?5:3);s.push([n+i,a-t*(.18+.055*(1-(i/.22)**2))])}D(M(j(s,.043),i+.86,i+1.055,.015,3),10584407,h,`bars`)}}let P=[],le=r?10:6,ue=e=>[2.42*Math.sin(e),-.25+.4*Math.cos(e)];for(let e=0;e<=le;e++)P.push(ue(-1.12+2.24*e/le));D(M(j(P,.65),i,i+.2,.035),l,f,`lounge`);for(let e=0;e<3;e++){let t=[];for(let n=0;n<=(r?4:3);n++)t.push(ue(-1.115+2.23*(e+n/(r?4:3))/3));D(M(j(t,.59),i+.18,i+.37,.04),g,y,`lounge`)}D(M(j(P.map(([e,t])=>[e*1.045,t+.28]),.14),i+.28,i+.73,.04),g,x,`lounge`),ne(-.91,.34,i+.59,_,-.12),ne(.91,.34,i+.59,v,.12);for(let e of[-1.2,.31,1.82])for(let t of[-.355,.355]){let n=e+t;D(ra(A(.675,1.76,.12),[],(e,t,r)=>new T(e+n,r?i:i+.1,t+-7.66)),6908774,[.3,.35,0,1],`loungers`),te(.63,1.17,i+.085,i+.245,n,-7.9,g,y,`loungers`,.1);let r=M(A(.63,.61,.1),-.073,.073,.035);r.rotateX(-.4).translate(n,i+.34,-7.13),D(r,g,x,`loungers`)}let F=-2.48,de=.7,I=Z(404),L=Z(496),fe=(i-a)/13,pe=(L-I)/13,me=.023,he=fe*.05-.045-me*pe/Math.hypot(pe,fe);for(let e=1;e<=13;e++){let t=a+fe*e,n=I+pe*(e-.5);O([de,.045,pe*.9],[F,t-.0225,n],d,p,`stair`),k([F-de/2,t-.01,n-pe*.45],[-2.13,t-.01,n-pe*.45],.011,u,m,`stair`)}for(let e of[-1,1]){let t=F+e*.38,r=F+e*(de/2-me);k([r,a+he,I],[r,i+he,L],me,u,m,`stair`),k([t,a+.86,I],[t,i+.82,L],.019,u,m,`stair`);for(let e of[0,1]){let n=I+(L-I)*e,r=a+(i-a)*e;k([t,r+.05,n],[t,r+.84,n],.013,u,m,`stair`)}D(c([[t,a+.23,I+.07],[t,i+.07,L-.07],[t,i+.76,L-.07],[t,a+.8,I+.07]],[0,1,2,0,2,3,0,2,1,0,3,2]),15135732,[.09,0,0,1],`stair`,n)}let ge=L-pe*.05,_e=E;return O([de,.045,_e-ge],[F,i-.0225,(ge+_e)*.5],d,p,`stair`),{components:ee,triangles:Object.values(ee).reduce((e,t)=>e+t,0),floor:{rear:S,front:C,height:i,halfWidth:2.9},stair:{x:F,width:de,lowerZ:I,upperZ:L,bottom:a,top:i,steps:13,opening:{minX:-2.94,maxX:-1.97,minZ:-8.85,maxZ:E},landing:{rearZ:ge,frontZ:_e},stringers:{radius:me,centersX:[-2.807,-2.153],inclineOffset:he}},furniture:{loungeCenter:N,barStations:ce,forwardBench:!0,pairedLoungers:3}}}var ka=class{constructor(){this.p=[],this.n=[],this.uv=[],this.color=[],this.surface=[],this.component=`lower`,this.componentRanges=[]}add(e,t,n=[.25,0,0,1]){let r=e.index?e.toNonIndexed():e,i=r.attributes.position,a=r.attributes.normal,o=r.attributes.uv,s=this.componentRanges.at(-1),c=this.p.length/3;s?.component===this.component?s.count+=i.count:this.componentRanges.push({component:this.component,start:c,count:i.count});let l=new I(t);for(let e=0;e<i.count;e++)this.p.push(i.getX(e),i.getY(e),i.getZ(e)),this.n.push(a.getX(e),a.getY(e),a.getZ(e)),this.uv.push(o?o.getX(e):i.getX(e),o?o.getY(e):i.getZ(e)),this.color.push(l.r,l.g,l.b),this.surface.push(...n)}geometry(){let e=new vr;for(let[t,n,r]of[[`position`,this.p,3],[`normal`,this.n,3],[`uv`,this.uv,2],[`color`,this.color,3],[`aSurface`,this.surface,4]])e.setAttribute(t,new Bt(n,r));return va(e),e.computeBoundingBox(),e.computeBoundingSphere(),e}};function Aa(e,t,n=!1){let r=new vr;if(r.setAttribute(`position`,new Bt(e.flat(),3)),r.setIndex(t),r.computeVertexNormals(),n)return r;let i=r.toNonIndexed();return i.computeVertexNormals(),i}function ja(){let e=[],t=[],n=[...ha.slice().reverse(),...ha.slice(1).map(([e,t])=>[-e,t])];for(let t=0;t<=112;t++){let r=-$.length/2+$.length*t/112,i=pa(r),a=ma(r);for(let[t,o]of n)e.push([t*fa(r),i+(a-i)*o,r])}let r=n.length;for(let e=0;e<112;e++)for(let n=0;n<r;n++){let i=e*r+n,a=e*r+(n+1)%r,o=i+r,s=a+r;t.push(i,o,a,a,o,s)}for(let e=1;e<r-1;e++)t.push(0,e,e+1);return Aa(e,t,!0)}function Ma(e,t,n){e.reduce((t,[n,r],i)=>{let a=e[(i+1)%e.length];return t+n*a[1]-a[0]*r},0)>0&&(e=e.slice().reverse());let r=e.map(([e,n])=>[e,t,n]).concat(e.map(([e,t])=>[e,n,t])),i=[],a=e.length;for(let e=1;e<a-1;e++)i.push(a,a+e+1,a+e,0,e,e+1);for(let e=0;e<a;e++){let t=(e+1)%a;i.push(e,a+e,t,t,a+e,a+t)}for(let e=0;e<i.length;e+=3)[i[e+1],i[e+2]]=[i[e+2],i[e+1]];return Aa(r,i)}function Na({detail:e=`high`,finish:t=`tidewater`}={}){if(![`high`,`low`].includes(e))throw RangeError(`Yacht detail must be high or low`);if(![`tidewater`,`legacy`].includes(t))throw RangeError(`Yacht finish must be tidewater or legacy`);let n=new ka,r=new ka,i=new ka,a=e===`high`,o=15921645,s=15001315,c=12436935,l=10717794,u=14998991,d=[.22,0,0,1],f=[.6,0,1,.94],p=[.17,.93,0,1],m=(e,t,r=o,i=d,a=.035)=>{let s=a?new Mr(...e,1,a):new Er(...e);n.add(s.translate(...t),r,i)},h=(e,t,r=.02,i=c,o=p)=>{let s=new T(...e),l=new T(...t),u=l.clone().sub(s),d=new Dr(r,r,u.length(),a?8:5,1);d.applyQuaternion(new w().setFromUnitVectors(new T(0,1,0),u.normalize())),n.add(d.translate(...s.add(l).multiplyScalar(.5).toArray()),i,o)},g=(e,t,r=n,i=o,a=d,s=[])=>{let c=e.map(oa),l=s.map(e=>e.map(oa)),u=typeof t==`function`?t:()=>t;r.add(ra(c,l,(e,t,n)=>new T((n?-1:1)*Math.max(.001,u(e,t)),t,e)),i,a)},_=(e,t=.64)=>{for(let n=0;n<e.length;n++){let[r,a,o]=e[n];if(h([r,a,o],[r,a+t,o],.022),n)for(let i of[t,t*.48]){let s=e[n-1];h([s[0],s[1]+i,s[2]],[r,a+i,o],i===t?.022:.011)}if(n){let s=e[n-1],c=.032,l=[[s[0],s[1]+c,s[2]],[r,a+c,o],[r,a+t-c,o],[s[0],s[1]+t-c,s[2]]];i.add(Aa(l,[0,1,2,0,2,3,0,2,1,0,3,2]),15135732,[.09,0,0,1])}}},v=(e,t,n,r)=>[[-n+.3,e],[-n,e+.32],[-r,t-.35],[-r+.3,t],[r-.3,t],[r,t-.35],[n,e+.32],[n-.3,e]];n.add(ja(),o,[.24,0,3,1]),g(sa.mainGlass,e=>Math.max(.005,fa(e)-.022),r,527890,[.085,.02,0,.85]),g(sa.mainRoof,e=>Math.max(.004,fa(e)-.008)),g(sa.upperGlass,(e,t)=>2.92-Math.max(0,t-5.25)*.13,r,659734,[.09,.02,0,.9]);let y=Q(550),b=Q(489),x=Q(427),S=Q(349);n.add(Ma(v(-19.11,Z(231),3.53,3.66),y-.14,y),o,d),n.add(Ma(v(-18.94,Z(231)-.13,3.4,3.53),y+.012,y+.033),l,f),n.add(Ma(v(Z(122),Z(385),3.45,3.7),b-.22,b),o,d),n.add(Ma(v(Z(126),Z(380),3.31,3.5),b+.006,b+.025),l,f),n.add(Ma(v(Z(292),Z(511),3.39,3.24),x-.24,x),o,d),n.add(Ma(v(Z(297),Z(505),3.25,3.11),x+.005,x+.024),l,f);for(let e of[-1,1]){let t=sa.terraceBrace,i=ra(t.map(oa),[],(t,n,r)=>new T(e*(fa(t)-.009-r*.14),n,t));n.add(i,o,d);let s=ra(sa.sternBrace.map(oa),[],(t,n,r)=>new T(e*(3.46-r*.17),n,t));n.add(s,o,d),n.add(Ma([[e*3.33,Z(370)],[e*3.34,Z(775)],[e*3.8,Z(775)],[e*3.8,Z(370)]],Q(502)-.03,Q(502)),l,f),_(Array.from({length:12},(t,n)=>[e*3.75,Q(502),Z(383+n*33)]),.46),_(Array.from({length:5},(t,n)=>[e*3.32,b+.03,Z(136+n*43)]),.76),_(Array.from({length:5},(t,n)=>[e*3.16,x+.03,Z(303+n*35)]),.65);let u=[];for(let t=0;t<(a?17:10);t++){let n=Z(912+t*390/((a?17:10)-1)),r=ca([[912,423],[982,425],[1100,430],[1210,434],[1305,443]],n);u.push([e*Math.max(0,fa(n)-.16),r,n])}_(u,.52);let g=(t,n,i,o)=>{let s=[],c=[],l=a?24:12;for(let r=0;r<=l;r++){let a=Z(t+(i-t)*r/l),u=Q(o),d=Q(n),f=.025*Math.max(0,1-Math.min(r,l-r));for(let t of[u+f,d-f])s.push([e*(ga(a,t)+.019),t,a]);if(r){let e=(r-1)*2,t=r*2;c.push(e,e+1,t,e+1,t+1,t)}}if(e<0)for(let e=0;e<c.length;e+=3)[c[e+1],c[e+2]]=[c[e+2],c[e+1]];r.add(Aa(s,c,!0),527891,[.1,.02,0,.94])};g(620,543,785,570),g(880,543,922,570);for(let[e,t,n,r]of[[949,975,543,558],[1009,1035,542,558],[1069,1095,540,556],[1155,1181,528,543]])g(e,n,t,r);for(let[e,t]of[[300,365],[380,485],[501,610],[815,850]])g(e,518,t,525);let v=ra([[1229,514],[1268,510],[1261,542],[1220,547]].map(oa),[],(t,n,r)=>new T(e*(ga(t,n)+.035-r*.015),n,t));n.add(v,8753298,p),r.add(ra([[1237,517],[1262,515],[1255,537],[1228,541]].map(oa),[],(t,n,r)=>new T(e*(ga(t,n)+.05-r*.01),n,t)),1383969,[.35,.2,0,.7]);let S=Z(1245),C=Q(531),w=e*(ga(S,C)+.12);h([w,C+.43,S],[w,C-.31,S-.11],.038,c,p),h([w,C-.24,S-.4],[w,C-.24,S+.29],.045,c,p);for(let t=0;t<8;t++){let n=Z(142+t*13.8),r=y+.11+t*(b-y)/8;m([.66,.1,.31],[e*2.99,r,n],o,d,.018),m([.6,.023,.28],[e*2.99,r+.058,n],l,f,0)}for(let t=0;t<6;t++){let n=Z(332+t*14),r=b+.09+t*(x-b)/6;m([.6,.095,.27],[e*3.07,r,n],o,d,.017),m([.55,.02,.24],[e*3.07,r+.055,n],l,f,0)}for(let t of[169,301,445,812,1140,1303]){let n=Z(t),r=t>900?ca([[912,423],[1305,443]],n):Math.max(y,ma(n)),i=e*(fa(n)-.17);h([i,r+.025,n-.14],[i,r+.025,n+.14],.037)}for(let t of[574,698,821]){let n=Z(t);m([.033,1.2,.037],[e*2.82,Q(395),n],1383200,[.2,.4,0,1],0)}}_([[-3.3,b+.03,Z(130)],[0,b+.03,Z(130)],[3.3,b+.03,Z(130)]],.76),_([[-3.17,x+.03,Z(297)],[0,x+.03,Z(297)],[3.17,x+.03,Z(297)]],.65);let C=(e,t,n,r,i=.8,a=.55)=>{m([r,.21,i],[e,t+.115,n],s,d,.055),m([r-.09,.14,i-.08],[e,t+.29,n],u,[.8,0,0,.94],.07),m([r,a-.24,.14],[e,t+.24+(a-.24)/2,n-i/2+.04],u,[.8,0,0,.92],.065);for(let o of[-1,1])m([.15,a-.2,i],[e+o*(r/2-.06),t+.2+(a-.2)/2,n],u,[.8,0,0,.94],.055)};C(0,b+.04,Z(252),3.8,1.01,.58),C(-1.58,x+.04,Z(357),1.03,.82,.62),C(1.58,x+.04,Z(357),1.03,.82,.62),C(-1.48,x+.04,Z(310),1.03,.82,.62),C(1.48,x+.04,Z(310),1.03,.82,.62);let E=e=>ca([[916,420],[995,423],[1120,428],[1230,434],[1310,441]],e);for(let[e,t,n]of[[3.75,1.65,1007],[2.78,1.55,1168]]){let r=Z(n);m([e,.2,t],[0,E(r)+.13,r],u,[.8,0,0,.97],.075)}for(let e of[-1,1])C(e*1.3,E(Z(1095)),Z(1095),.98,2.05,.53);m([1.05,.085,1.25],[0,E(Z(1100))+.43,Z(1100)],l,f,.06);for(let e of[-1,1]){let t=-$.draft+.56,r=e*1.52,i=-13.9;h([r,-.55,-8.2],[r,t,i],.075,7896181,p),h([r,t,-13.55],[r,t,-14.280000000000001],.14,10914897,p);for(let e=0;e<5;e++){let a=e*Math.PI*2/5,o=new Er(.16,.51,.045).rotateZ(-a).translate(r+Math.sin(a)*.3,t+Math.cos(a)*.3,i);n.add(o,10914897,p)}m([.12,.015,.03],[r,-$.draft+.0075,i],10914897,p,0),m([.09,.72,.7],[r,-1.56,-15.42],2700598,[.4,.1,0,1],.02)}let ee={shell:n,railGlass:i,hi:a,detail:e,box:m,rod:h,plate:Ma,triangles:Aa,sideSolid:g,sunFloor:S,upperAftFloor:x,colors:{white:o,trim:s,metal:c,teak:l,cushion:u},surfaces:{painted:d,timber:f,steel:p}};n.component=`topStructure`,i.component=`topStructure`;let D=Da(ee);n.component=`topDeck`,i.component=`topDeck`;let O=Oa(ee),{material:k,glass:A,balustrade:j}=rn({style:t}),M=new lr;M.name=$.name;for(let[e,t,i]of[[n,k,`Merged exterior`],[r,A,`Merged glazing`]]){let n=new br(e.geometry(),t);n.name=i,n.castShadow=!0,M.add(n)}let te=new br(i.geometry(),j);te.name=`Glass balustrades`,te.castShadow=!1,M.add(te);let ne=M.children.reduce((e,t)=>e+(t.geometry.index?.count??t.geometry.attributes.position.count)/3,0),re=M.children.reduce((e,t)=>e+t.geometry.attributes.position.count,0),ie=M.children.reduce((e,t)=>e+Object.values(t.geometry.attributes).reduce((e,t)=>e+t.array.byteLength,0),0),ae=M.children.reduce((e,t)=>e+(t.geometry.index?.array.byteLength??0),0);return M.userData={geometryRevision:4,profileReference:ia.url,spec:$,exteriorOnly:!0,detail:e,triangles:ne,vertices:re,vertexBytes:ie,indexBytes:ae,colorDraws:3,textureBytes:0,componentRanges:{"Merged exterior":n.componentRanges,"Merged glazing":r.componentRanges,"Glass balustrades":i.componentRanges},topStructure:D,topDeck:O},{object:M,spec:$,stats:M.userData,buoyancy:_a(),dispose(){for(let e of M.children)e.geometry.dispose(),e.material.dispose()}}}function Pa({requestedMode:e,userAgent:t=``,userAgentData:n={},gpuInfo:r={},narrowScreen:i=!1,coarsePointer:a=!1,maxTouchPoints:o=0}={}){if([`full`,`auto`,`performance`].includes(e))return{mode:e,source:`url`};if(/Android|iPhone|iPad/i.test(t)||n.mobile||/Android|iOS/i.test(n.platform||``))return{mode:`auto`,source:`mobile-user-agent`};let s=[r.vendor,r.architecture,r.description].filter(Boolean).join(` `);return/\b(bifrost|valhall|mali|adreno)\b/i.test(s)?{mode:`auto`,source:`mobile-gpu`}:a&&o>0?{mode:`auto`,source:`touch-screen`}:i?{mode:`auto`,source:`narrow-viewport`}:{mode:`full`,source:`desktop-default`}}var Fa=class{constructor({targetFPS:e=45,mode:t=`full`,maximumScale:n=2,minimumScale:r=1}={}){this.targetFPS=e,this.minimumScale=r,this.maximumScale=n,this.mode=t,this.scale=t===`full`?n:Math.min(1,n),this.reset()}reset(){this.started=null,this.lastTime=null,this.lastCompleted=null,this.frames=0,this.elapsed=0,this.fastSince=null,this.lastChange=-1/0,this.fps=null,this.cpuMs=0,this.samples=[],this.changes=0}setMode(e){if(![`full`,`auto`,`performance`].includes(e))throw RangeError(`Unknown water quality mode`);return this.mode=e,this.scale=e===`full`?this.maximumScale:Math.min(1,this.maximumScale),this.reset(),this.scale}setMaximum(e){return this.maximumScale=e,this.scale=this.mode===`full`?e:Math.min(this.scale,e),this.reset(),this.scale}observe(e,t,n=0,r=!1,i=!0){if(this.cpuMs=n,r)return this.lastTime=null,this.lastCompleted=null,this.fps=null,null;if(this.lastTime===null||e-this.lastTime>15e3||t<this.lastCompleted)return this.lastTime=e,this.lastCompleted=t,this.started=e,this.frames=0,this.elapsed=0,null;let a=e-this.lastTime,o=t-this.lastCompleted;if(this.lastTime=e,this.lastCompleted=t,a<=0||(this.frames+=o,this.elapsed+=a,this.elapsed<700||this.frames<2))return null;let s=this.frames*1e3/this.elapsed,c=1e3/s;if(this.fps=s,this.frames=0,this.elapsed=0,this.samples.push({time:e,fps:s,scale:this.scale,cpuMs:n}),this.samples.length>120&&this.samples.shift(),!i)return this.fastSince=null,null;if(this.mode===`full`||e-this.started<1e3||e-this.lastChange<1e3)return null;let l=1e3/this.targetFPS,u=this.scale;return c>l*1.08?(this.fastSince=null,u=Math.max(this.minimumScale,Math.min(this.scale*.9,this.scale*Math.sqrt(l*.82/c)))):c<l*.8?(this.fastSince??=e,e-this.fastSince>5e3&&(u=Math.min(this.mode===`performance`?Math.min(1,this.maximumScale):this.maximumScale,this.scale*1.08))):this.fastSince=null,u=Math.min(this.maximumScale,Math.max(this.minimumScale,Math.round(u*20)/20)),Math.abs(u-this.scale)<.049?null:(this.scale=u,this.lastChange=e,this.fastSince=null,this.changes++,u)}get limited(){return this.fps!==null&&this.fps<this.targetFPS*.9&&this.scale<=this.minimumScale+.01}},Ia=Object.freeze({blockedSurfaceIndices:!0,waterAliasCoatNormals:!0,waterFlatSurface:!0,waterFlatColor:!0,literalEnvironmentSH:!0});function La({requested:e=!1,mobile:t=!1,prefixSupported:n=!1,frustumPatches:r=!1}={}){return!e||!t?{}:{...Ia,...r?{waterFrustumPatches:!0}:{},...n?{waterObjectCrop:!0,directObjectCropLoads:!0,prefixObjectCrop:!0}:{}}}var Ra=document.querySelector(`#status`);document.querySelector(`#map-link`).hidden=!0;try{let e=await ea(document.querySelector(`#app`),{forceWebGL:new URLSearchParams(location.search).get(`backend`)===`webgl`}),{engine:t,backend:n}=e,r=n===`webgl2`,i=new URLSearchParams(location.search).get(`quality`),a={userAgent:navigator.userAgent,userAgentData:navigator.userAgentData,gpuInfo:P.adapter?.info||{},narrowScreen:matchMedia(`(max-width: 650px)`).matches,coarsePointer:matchMedia(`(pointer: coarse)`).matches,maxTouchPoints:navigator.maxTouchPoints},o=Pa({...a,requestedMode:i}),s=Pa(a).mode===`auto`,c=o.mode;document.documentElement.dataset.waterQuality=c;let l=()=>Math.min(window.devicePixelRatio||1,2,Math.sqrt(3686400/(innerWidth*innerHeight))),u=new Fa({mode:c,maximumScale:l()}),d=()=>t.setRenderScale(u.setMaximum(l()));d(),window.addEventListener(`resize`,d),t.renderOptimizations.framePacing=!0;let f=new URLSearchParams(location.search).get(`look`)===`legacy`?`legacy`:`tidewater`,p=La({requested:!1,mobile:s,prefixSupported:!1,frustumPatches:!0}),m=r?`water-safari-webgl-r10`:`trideck-top-r8`,h=e.createRenderer({mobilePerformance:c!==`full`,waterStyle:`surface`,look:f,...p}),g=Na({detail:s?`low`:`high`,finish:f}),_=h.addObject(g.object,g.buoyancy),v=t.camera;v.far=1e3,v.fov=48,v.updateProjectionMatrix();let y=!1,b=`yacht`,x=Math.PI/4,S=.7,C=90,w=!1,E=32;function ee(e){let n=performance.now();h.render(v,t.width,t.height,r?null:t.currentTexture().createView(),y?0:Math.max(0,e));let i=h.waterVisible!==!1,a=u.observe(performance.now(),t.pacingStats.completed,performance.now()-n,y,i);i&&a!==null&&t.setRenderScale(a),y&&--E<=0&&t.stop()}function D(){E=r?1:32,w&&!document.hidden&&!t._running&&(u.reset(),t.start(ee))}t.onResize.push(D);let O=new T(0,-2,0);function A(){v.position.set(O.x+Math.sin(x)*Math.cos(S)*C,O.y+Math.sin(S)*C,O.z+Math.cos(x)*Math.cos(S)*C),v.lookAt(O),D()}function j(e){e===`underwater`&&h.waterStyle===`surface`&&(e=`yacht`),h.resetHistory(),b=e,x=e===`yacht`?1.248:Math.PI/4,v.fov=e===`yacht`?34.1:48,v.updateProjectionMatrix(),e===`underwater`?(O.set(0,-5,0),S=.04,C=15):e===`sundeck`?(O.set(0,9.2,-3.2),x=1.248,S=.22,C=18.5*Math.max(1,1.15/v.aspect)):e===`yacht`?(O.set(0,5.44,0),S=.0783,C=58.8*Math.max(1,1.15/v.aspect)):(O.set(0,-2,0),S=e===`surface`?.2:.7,C=e===`surface`?65:90);for(let t of document.querySelectorAll(`[data-view]`))t.setAttribute(`aria-pressed`,String(t.dataset.view===e));A()}for(let e of document.querySelectorAll(`[data-view]`))e.addEventListener(`click`,()=>j(e.dataset.view));let M=document.querySelector(`#pause`);M.addEventListener(`click`,()=>{y=!y,M.textContent=y?`Resume water`:`Pause water`,M.setAttribute(`aria-pressed`,String(y)),u.reset(),D()});let te=document.getElementById(`toggle-water`),ne={toggles:0,lastToggle:null};function re(e){return e=!!e,h.waterVisible!==!1===e?e:(h.setWaterVisible(e),te.textContent=e?`Hide water`:`Show water`,te.setAttribute(`aria-pressed`,String(e)),u.scale=t.renderScale,u.reset(),ne.toggles++,ne.lastToggle={waterVisible:e,mode:u.mode,renderScale:t.renderScale,output:[t.width,t.height]},h.profiler.result=null,h.profiler.last=-1/0,h.profiler.enabled=document.getElementById(`performance-panel`).open,D(),ge(),e)}te.addEventListener(`click`,()=>re(h.waterVisible===!1));let ie=document.querySelector(`#wave-size`);ie.addEventListener(`input`,()=>{h.waves.strength=Number(ie.value),D()});let ae=document.querySelector(`#sun-angle`);ae.addEventListener(`input`,()=>{h.lighting.setSun(Number(ae.value)),D()}),document.querySelector(`#toggle-yacht`).addEventListener(`click`,e=>{_?(h.removeObject(_),_=null):_=h.addObject(g.object,g.buoyancy),e.currentTarget.textContent=_?`Hide yacht`:`Show yacht`,e.currentTarget.setAttribute(`aria-pressed`,String(!!_)),D()}),document.querySelector(`#reset-yacht`).addEventListener(`click`,()=>{g.object.position.set(0,0,0),g.object.quaternion.identity(),_&&(_.velocity.set(0,0,0),_.angularVelocity.set(0,0,0)),j(`yacht`)});let N=new Set;function oe(){let e=new rt({name:`Water test float`,color:12363904,lit:!1,surface:`s.albedo *= 0.35 + 0.65 * max(dot(in.N, normalize(vec3f(-0.45, 0.8, 0.3))), 0.0);`}),t=new br(new Er(3,1.2,2),e),n=N.size;t.position.set((n%2?-1:1)*(10+Math.floor(n/2)%3*4),2,Math.floor(n/6)*3-2);let r=h.addObject(t,{density:500});return N.add(r),document.querySelector(`#clear-floats`).hidden=!1,D(),r}document.querySelector(`#add-float`).addEventListener(`click`,oe),document.querySelector(`#clear-floats`).addEventListener(`click`,e=>{for(let e of N)h.removeObject(e),e.object.geometry.dispose(),e.object.material.dispose();N.clear(),e.currentTarget.hidden=!0,D()});let se=null;t.canvas.addEventListener(`pointerdown`,e=>{e.button===0&&(se={id:e.pointerId,x:e.clientX,y:e.clientY},t.canvas.setPointerCapture(e.pointerId))}),t.canvas.addEventListener(`pointermove`,e=>{se&&se.id===e.pointerId&&(x-=(e.clientX-se.x)*.006,S=Math.max(b===`underwater`?-.25:.06,Math.min(b===`underwater`?.25:1.5,S+(e.clientY-se.y)*.006)),se.x=e.clientX,se.y=e.clientY,A())});let ce=()=>{se=null};t.canvas.addEventListener(`pointerup`,ce),t.canvas.addEventListener(`pointercancel`,ce),t.canvas.addEventListener(`lostpointercapture`,ce),t.canvas.addEventListener(`wheel`,e=>{e.preventDefault(),C=Math.max(b===`underwater`?2:b===`sundeck`?12:40,Math.min(b===`underwater`?20:b===`sundeck`?100:180,C*Math.exp(e.deltaY*.001))),A()},{passive:!1});let le=document.getElementById(`quality-mode`);le.value=c;function ue(e){let n=u.setMode(e);le.value=e,h.setMobilePerformance(e!==`full`),document.documentElement.dataset.waterQuality=e;let r=new URL(location.href);r.searchParams.set(`quality`,e),history.replaceState(history.state,``,r),h.profiler.result=null,h.profiler.last=-1/0,h.profiler.enabled=document.getElementById(`performance-panel`).open,t.setRenderScale(n),h.resetHistory(),D(),ge()}le.addEventListener(`change`,()=>ue(le.value)),document.getElementById(`use-auto`).addEventListener(`click`,()=>ue(`auto`));let F=document.getElementById(`water-style`);F.value=h.waterStyle,r&&(F.closest(`label`).hidden=!0);function de(e){h.setWaterStyle(e),F.value=e;let n=e===`surface`;document.getElementById(`water-description`).textContent=n?`Surface-only water`:`10 metres deep`;let r=document.querySelector(`[data-view="underwater"]`);return r.hidden=n,r.disabled=n,u.scale=t.renderScale,u.reset(),h.resetHistory(),h.profiler.result=null,h.profiler.last=-1/0,h.profiler.enabled=document.getElementById(`performance-panel`).open,n&&b===`underwater`?j(`yacht`):D(),ge(),e}F.addEventListener(`change`,()=>de(F.value));let I={userAgent:navigator.userAgent,model:null,platformVersion:null,fullVersionList:null};navigator.userAgentData?.getHighEntropyValues?.([`model`,`platformVersion`,`fullVersionList`]).then(e=>{I={...I,model:e.model||null,platformVersion:e.platformVersion||null,fullVersionList:e.fullVersionList||null}}).catch(()=>{});let L=P.adapter?.info||{},fe={vendor:L.vendor||null,architecture:L.architecture||null,device:L.device||null,description:L.description||null,isFallbackAdapter:L.isFallbackAdapter??P.adapter?.isFallbackAdapter??null,features:r?[]:[...P.features]};function pe(){return{build:m,backend:n,antiAliasing:h.antiAliasing||null,performancePreview:{requested:!1,active:Object.keys(p).length>0,options:p,cropSupport:null},device:I,gpu:fe,targetFPS:u.targetFPS,yachtFinish:f,filmicToneMapping:h.aa.filmic,filmicExposure:h.aa.exposure,temporalJitterSpan:h.aa.stats.jitterSpan??null,environment:h.environment?{...h.environment.stats}:null,waterStyle:h.waterStyle,waterVisible:h.waterVisible!==!1,waterSimulation:y?`paused`:`active`,waterRenderingSkipped:h.stats?.waterRenderingSkipped??!1,waterToggleContext:{...ne,resolutionHeld:h.waterVisible===!1},initialMode:o.mode,initialModeSource:o.source,requestedQuality:i,display:{cssViewport:[innerWidth,innerHeight],devicePixelRatio:window.devicePixelRatio||1},fpsMeasurement:`Completed GPU submissions per wall-clock second; physical display presentation is not directly measured.`,measuredCompletedFPS:y?null:u.fps,mode:u.mode,renderScale:u.scale,output:[t.width,t.height],scene:h.aa.stats.input,reflection:h.waterVisible?[h.reflection.width,h.reflection.height]:null,minimumRenderScale:u.minimumScale,waterSamples:h.waterVisible?h.waterStyle===`surface`||h.mobilePerformance?4:5:0,surfaceWater:h.waterVisible&&h.waterStyle===`surface`?{...h.surfaceRenderer.stats,spatialResolveSamples:4,normalTextureBytes:h.normalTexture.metadata.textureBytes,normalUploads:h.normalTexture.uploads,reflectionTargetFPS:12}:null,waterLighting:h.waterVisible&&h.waterStyle===`volume`?h.mobilePerformance?[h.optics.width,h.optics.height]:h.aa.stats.input:null,waveField:h.waterVisible&&h.waterStyle===`volume`&&h.mobilePerformance?[h.waveTexture.target.width,h.waveTexture.target.height]:null,sourceAttachmentBytes:h.aa.stats.sourceBytesPerPixel,directDisplay:h.aa.stats.directDisplay,surfaceFastResolve:h.stats.surfaceFastResolve??!1,meshResources:{...h.meshRenderer.resourceStats},canvasAlphaMode:r?`opaque`:P.context.getConfiguration?.()?.alphaMode||`premultiplied`,shadedFraction:h.stats?.shadedFraction,encodeCPUms:u.cpuMs,paused:y,pacing:{...t.pacingStats},geometry:_?g.stats:null,sampleHistory:u.samples.slice(),belowTargetAtMinimum:u.limited,timestampQueriesAvailable:!r&&P.hasTimestamp,gpuTiming:h.profiler.result}}let me=document.getElementById(`fps-value`),he=document.getElementById(`performance-detail`);document.getElementById(`performance-panel`).addEventListener(`toggle`,e=>{h.profiler.enabled=e.currentTarget.open,e.currentTarget.open&&D()});function ge(){me.textContent=y?`Paused`:u.fps===null?`Measuring…`:`${u.fps.toFixed(0)} FPS`,document.getElementById(`quality-value`).textContent={auto:`Auto`,performance:`Performance`,full:`Full quality`}[u.mode];let e=h.waterVisible!==!1,n=e&&!y&&u.mode===`full`&&u.fps!==null&&u.fps<u.targetFPS*.9;if(document.getElementById(`use-auto`).hidden=!n,document.getElementById(`performance-panel`).open){let i=r?`WebGL compatibility renderer`:fe.description||[fe.vendor,fe.architecture].filter(Boolean).join(` `)||`GPU details unavailable`,a=e?u.limited?`Below 45 FPS at minimum resolution.`:n?`Full quality is below 45 FPS. Try Auto.`:u.mode===`full`?`Fixed resolution. Auto targets 45 FPS.`:`Targets 45 FPS; actual speed depends on your GPU.`:y?`Simulation paused. Resolution held for comparison.`:`Wave physics continue. Resolution held for comparison.`;he.textContent=`${I.model||`Phone model unavailable`} · ${i}\n${t.width} × ${t.height} · ${e?u.mode===`full`?`Full quality`:`Adaptive resolution`:`Fixed for comparison`}\n${e?`Water shown`:`Water hidden · same render resolution`} · ${h.waterStyle===`surface`?`Surface · fast`:`Original · volume`}\n${a}\nBuild ${m}`}}ge();let _e=setInterval(ge,500);if(document.getElementById(`copy-performance`).addEventListener(`click`,async e=>{let t=e.currentTarget,n=JSON.stringify(pe(),null,2);try{await navigator.clipboard.writeText(n),t.textContent=`Copied`}catch{he.textContent=n}}),j(new URLSearchParams(location.search).get(`view`)===`sundeck`?`sundeck`:`yacht`),await e.ready(h),!r&&[h.pass,...h.aa.resolve,h.aa.present].some(e=>e.handle.failed))throw Error(`The water or anti-aliasing shader could not compile.`);h.render(v,t.width,t.height,r?null:t.currentTexture().createView(),0),await e.waitForGPU(),w=!0,D(),window.__waterMap={engine:t,renderer:h,backend:n,spec:k,yacht:g,setView:j,addTestFloat:oe,requestRender:D,quality:u,setQuality:ue,setWaterVisible:re,setWaterStyle:de,performanceReport:pe,get yachtBody(){return _},addObject:(e,t)=>{let n=h.addObject(e,t);return D(),n},removeObject:e=>{let t=h.removeObject(e);return D(),t},get paused(){return y}},document.addEventListener(`visibilitychange`,()=>document.hidden?t.stop():D()),window.addEventListener(`pagehide`,e=>{t.stop(),e.persisted||clearInterval(_e)}),window.addEventListener(`pageshow`,D),document.getElementById(`performance-panel`).hidden=!1,Ra.hidden=!0}catch(e){Ra.hidden=!1,Ra.textContent=`Water could not start: `+e.message,console.error(e)}