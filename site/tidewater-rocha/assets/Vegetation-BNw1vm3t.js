import{C as e,D as t,E as n,O as r,_ as i,a,b as o,c as s,d as c,f as l,h as u,i as d,j as f,k as p,l as m,n as h,o as g,p as _,r as v,s as y,t as b,u as x,v as S,w as C,x as w,y as T}from"./Frame-CNet77I0.js";import{J as E,K as D,X as O,Y as k,Z as ee,at as te,ct as A,dt as j,ft as ne,it as re,lt as M,ot as ie,q as ae,ut as oe,w as se}from"./Village-C3UMI-Qm.js";import{t as N}from"./GPU-CxPpnRCf.js";import{n as ce,r as P,t as le}from"./Texture-8f_StRFj.js";import{r as ue}from"./DebugViews-CMYk8aZr.js";import"./Globals-CLsqp45h.js";import{A as de,C as fe,D as pe,E as me,O as he,S as ge,T as _e,_ as ve,a as ye,b as be,c as xe,d as Se,f as Ce,g as we,h as Te,i as Ee,k as De,l as Oe,m as ke,n as Ae,o as je,p as Me,r as Ne,s as Pe,t as F,u as Fe,v as Ie,w as Le,x as I,y as Re}from"./common-HBn3Movl.js";import{c as ze,d as Be,f as Ve,l as He,o as Ue,s as We,u as Ge}from"./LocalLights-DGrzAZBs.js";import{n as Ke,t as qe}from"./Material-tyLfv2Wn.js";import{a as Je}from"./CameraVelocity-DbPmsWHs.js";var Ye=()=>typeof performance<`u`?performance.now():Date.now(),Xe=class{constructor(){this._startTime=Ye(),this._previousTime=0,this._currentTime=0,this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=()=>{e.hidden===!1&&this.reset()},e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=Ye()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?Ye():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}},Ze=[];for(let e=0;e<8;e++)Ze.push(new t);var Qe=new t,$e=new t(0,1,0),et=new C,tt=new t,nt=new n,rt=new WeakMap,it=0;function at(e){return!e||typeof e!=`object`?String(e):(rt.has(e)||rt.set(e,++it),rt.get(e))}var ot=class{constructor({size:e=2048,splits:n=[10,60,400],lightMargin:r=200,normalBias:i=[.015,.06,.3],bias:a=2e-5,pcssCascades:o=1,cacheStatic:s=!1,skipUnused:c=s}={}){this.size=e,this.splits=n,this.count=n.length,this.lightMargin=r,this.normalBias=i,this.periods=n.map((e,t)=>t===0?1:t===1?2:4),this.cacheStatic=s,this.skipUnused=c,this._samplingEnabled=!1,this.staticTexture=null,this.texture=new P({label:`sunShadowMap`,width:e,height:e,depth:this.count,dimension:`2d-array`,format:`depth32float`,usage:[`sample`,`render`,`copyDst`]}),Ge(this.texture),this.cascades=n.map((e,t)=>({camera:{matrixWorld:new C,matrixWorldInverse:new C,projectionMatrix:new C,near:0,far:1,reversedDepth:!1,updateMatrixWorld(){},isCamera:!0,isShadowCamera:!0},block:d(`shadowView`+t),viewProj:new C,radius:0,dirty:!0})),this.enabled=!0,this.layerMask=4294967295,this.frame=0,this.lastSun=new t(0,-2,0);let l=We.fields;l.count.value=this.count,l.mapSize.value=e,l.bias.value=a,l.pcssCascades.value=o,l.enabled.value=1}invalidateStatic(){for(let e of this.cascades)e.staticKey=null,e.dirty=!0}_margin(e){let t=this.splits[this.count-1],n=e/t;return Math.max(.25*n*n,.25*n)*t}_fit(e,r,i){let a=this.cascades[e],o=e===0?0:this.splits[e-1],s=this.splits[e],c=this._margin(o),l=this._margin(s),u=Math.max(r.near,o-c*.5),d=e===this.count-1?s:s+l*.5;We.fields.blend.value[e]=new n(o,s,c,l);let f=Math.tan(r.fov*Math.PI/360),p=f*r.aspect,m=0;for(let e of[u,d])for(let t of[-1,1])for(let n of[-1,1])Ze[m++].set(t*p*e,n*f*e,-e).applyMatrix4(r.matrixWorld);let h=Math.min(d,(u+d)/2*(1+p*p+f*f));Qe.set(0,0,-h).applyMatrix4(r.matrixWorld);let g=0;for(let e of Ze)g=Math.max(g,e.distanceTo(Qe));g=Math.ceil(g*16)/16,a.radius=g;let _=a.camera,v=i,y=Math.abs(v.y)>.99?tt.set(1,0,0):$e;_.matrixWorld.lookAt(v,new t(0,0,0),y),et.copy(_.matrixWorld).invert();let b=2*g/this.size,x=nt.set(Qe.x,Qe.y,Qe.z,1).applyMatrix4(et);x.x=Math.round(x.x/b)*b,x.y=Math.round(x.y/b)*b;let S=g+this.lightMargin,C=new t(x.x,x.y,x.z+S).applyMatrix4(_.matrixWorld);_.matrixWorld.setPosition(C),_.matrixWorldInverse.copy(_.matrixWorld).invert();let w=.1,T=S+g;_.near=w,_.far=T,ct(_.projectionMatrix,-g,g,g,-g,w,T),a.viewProj.multiplyMatrices(_.projectionMatrix,_.matrixWorldInverse);let E=We.fields;E.matrices.value[e]=a.viewProj.clone(),E.cascades.value[e]=new n(d,b,this.normalBias[e]??.05,T-w)}update(e,t){this.frame++;let n=this.enabled&&t.y>-.05;if(We.fields.enabled.value=+!!n,this.skipUnused&&n&&!this._samplingEnabled&&this.invalidateStatic(),this._samplingEnabled=n,!this.enabled||this.skipUnused&&!n)return[];e.updateMatrixWorld();let r=this.lastSun.angleTo(t)>1e-4;this.lastSun.copy(t);let i=[];for(let n=0;n<this.count;n++)(r||this.cascades[n].dirty||(this.frame+n)%this.periods[n]===0)&&(this._fit(n,e,t),this.cascades[n].dirty=!1,i.push(n));return i}render(e,t,n){for(let r of n){let n=this.cascades[r];a(n.camera,this.size,this.size,{block:n.block});let i={label:`shadow cascade `+r,kind:`depth`,camera:n.camera,frameBlock:n.block,depthView:this.texture.view({dimension:`2d`,baseArrayLayer:r,arrayLayerCount:1}),depthFormat:`depth32float`,clearDepth:1,depthCompare:`less-equal`,layerMask:this.layerMask,depthBias:2,depthBiasSlopeScale:1.5};if(!this.cacheStatic){t.render(e,i);continue}this.staticTexture||=new P({label:`staticShadowCache`,width:this.size,height:this.size,depth:this.count,dimension:`2d-array`,format:`depth32float`,usage:[`render`,`copySrc`]});let o=t.collect(e,{...i,filter:e=>e.shadowStatic===!0}),s=st(n,o);n.staticKey!==s&&(t.render(e,{...i,label:`shadow static cascade `+r,items:o,depthView:this.staticTexture.view({dimension:`2d`,baseArrayLayer:r,arrayLayerCount:1})}),n.staticKey=!t.precompiling&&[...t.pipelines.values()].every(e=>e.handle.pipeline)?s:null),N.getEncoder().copyTextureToTexture({texture:this.staticTexture.getGPU(),origin:{x:0,y:0,z:r}},{texture:this.texture.getGPU(),origin:{x:0,y:0,z:r}},{width:this.size,height:this.size,depthOrArrayLayers:1}),t.render(e,{...i,clearDepth:null,filter:e=>e.shadowStatic!==!0})}}};function st(e,t){let n=[...e.viewProj.elements.map(Math.fround),Math.fround(e.camera.near),Math.fround(e.camera.far)];for(let e of[...t.opaque,...t.transparent]){let t=e.object,r=e.geometry,i=e.material;n.push(t.id,r.id,i.id,i.version,e.start,e.count,t.count??1,t.shadowRevision??0,i.side,i.alphaTest,i.depthWrite,i.shadow,...t.matrixWorld.elements),t.drawParams&&n.push(...t.drawParams);for(let[e,t]of Object.entries(r.attributes)){let r=t.data||t;n.push(e,at(t),at(r.array),r.version,t.count)}r.index&&n.push(at(r.index),at(r.index.array),r.index.version,r.index.count),t.instanceMatrix&&n.push(at(t.instanceMatrix),at(t.instanceMatrix.array),t.instanceMatrix.version);for(let e of Object.values(i.uniforms||{})){let t=e.value;typeof t==`number`||typeof t==`boolean`?n.push(t):t?.elements?n.push(...t.elements):Array.isArray(t)||ArrayBuffer.isView(t)?n.push(...t):t&&typeof t==`object`&&n.push(t.x,t.y,t.z,t.w,t.r,t.g,t.b)}}return n.join(`|`)}function ct(e,t,n,r,i,a,o){let s=1/(n-t),c=1/(r-i),l=1/(o-a);return e.set(2*s,0,0,-(n+t)*s,0,2*c,0,-(r+i)*c,0,0,-l,-a*l,0,0,0,1),e}var lt=Object.freeze({atmosphere:1,antiAliasing:1,sceneDetail:1});Object.freeze({atmosphere:.5,antiAliasing:.5,sceneDetail:.5});var ut=Object.freeze([0,.05,.1,.2,.5,1]),dt=Object.freeze([`Off`,`5%`,`10%`,`20%`,`Half (50%)`,`Full (100%)`]),ft=e=>dt[ut.indexOf(e)],pt=e=>e===1?`taa`:e>0?`fxaa`:`none`,mt=e=>Math.max(1,Math.min(6,Math.ceil(12*e))),ht=Object.freeze({atmosphere:`atmosphereQuality`,antiAliasing:`aaQuality`,sceneDetail:`detailQuality`});function gt(e){if(!e||typeof e!=`object`||Array.isArray(e))throw TypeError(`Quality levels must be an object`);for(let[t,n]of Object.entries(e))if(!Object.hasOwn(lt,t)||!ut.includes(n))throw TypeError(`Quality levels accept only known keys and 0, 0.05, 0.1, 0.2, 0.5, or 1`);return e}function _t(e){let t=typeof e==`string`?new URLSearchParams(e):e,n={...lt};for(let[e,r]of Object.entries(ht))if(t.has(r)){let i=t.get(r);if(!ut.map(String).includes(i))throw TypeError(`Invalid `+r);n[e]=Number(i)}return n}function vt(e,t=0){let n=e=>{let n=e+t+2654435769|0;return n=Math.imul(n^n>>>16,569420461),n=Math.imul(n^n>>>15,1935289751),(n^n>>>15)>>>0},r=Array.from({length:e},(e,t)=>t).sort((e,t)=>n(e)-n(t)||e-t),i=new Uint32Array(e);for(let t=0;t<e;t++)i[r[t]]=t;return i}function yt(e,t,n){gt(n);let r={...e.qualityLevels,...n},i={...e.qualityLevels};return Object.keys(lt).every(e=>i[e]===r[e])?e.qualityLevels:(Object.assign(e.qualityLevels,r),i.atmosphere!==r.atmosphere&&(t.atmosphereQuality.value=r.atmosphere,e.clouds&&(e.clouds.resolutionScale=e.settings.renderScale*Math.sqrt(r.atmosphere||1),e.clouds.invalidate?.(),e.clouds.resetHistory?.()),e.haze&&(e.haze.qualityLevel=r.atmosphere,e.haze._histValid=!1,r.atmosphere>0&&e.haze.setSize(e.engine.canvas.width,e.engine.canvas.height)),e._qualityEnvironmentDirty=e._waterGroundDirty=!0),i.antiAliasing!==r.antiAliasing&&(t.antiAliasingQuality.value=r.antiAliasing,e.post.aaMode=pt(r.antiAliasing)),i.sceneDetail!==r.sceneDetail&&(e.vegetation?.setQualityLevel(r.sceneDetail),e.reef?.setQualityLevel(r.sceneDetail)),e.post.taau.restart(),e.post._hasPrev=!1,e._fps&&(e._fps.acc=e._fps.n=e._fps.worst=0),e.fps=0,e.ui?.syncQualityLevels?.(),e.qualityLevels)}function bt(e=globalThis.location?.search||``){let t=new URLSearchParams(e),n=t.has(`renderReference`),r=t.get(`world`)===`rocha`;return{reference:n,bindingReuse:r&&!n&&!t.has(`noRenderV2`)&&!t.has(`noBindingReuse`),framePacing:r&&!n&&!t.has(`noRenderV2`)&&!t.has(`noFramePacing`),compactTargets:!n&&!t.has(`noCompactSceneTargets`)&&(r||t.has(`compactSceneTargets`)),depthRotation:!n&&!t.has(`noDepthRotation`)&&(r||t.has(`depthRotation`)),tiledTAA:!n&&t.has(`tiledTAA`)&&!t.has(`noTiledTAA`)}}function xt(e){return[`rgba16float`,e?`rg16float`:`rgba16float`,e?`rg8unorm`:`rgba8unorm`]}function St(e,t,n=!0){if(e===t||e.format!==t.format||e.width!==t.width||e.height!==t.height)throw Error(`Depth rotation requires distinct, matching depth textures`);let r=e.getGPU();e.gpu=t.getGPU(),t.gpu=r,n&&([e._views,t._views]=[t._views,e._views]);for(let r of[e,t])r.version++,n||r._views.clear()}var Ct=class{constructor(e){this.pass=e,this.vertices=[],this.indexBuffer=null,this.indexFormat=null,this.drawGroup=null,this.drawOffset=-1,this.offsets=new Uint32Array(1)}bindObject(e,t){(e!==this.drawGroup||t!==this.drawOffset)&&(this.offsets[0]=t,this.pass.setBindGroup(2,e,this.offsets,0,1),this.drawGroup=e,this.drawOffset=t)}bindVertex(e,t){this.vertices[e]!==t&&(this.pass.setVertexBuffer(e,t),this.vertices[e]=t)}bindIndex(e,t){(this.indexBuffer!==e||this.indexFormat!==t)&&(this.pass.setIndexBuffer(e,t),this.indexBuffer=e,this.indexFormat=t)}},wt={position:`vec3f`,normal:`vec3f`,uv:`vec2f`,color:`vec4f`},Tt={normal:`vec3f( 0.0, 1.0, 0.0 )`,uv:`vec2f( 0.0 )`,color:`vec4f( 1.0 )`},Et=/^(u32|i32|vec[234][ui])$/;function Dt(e){return e===`f32`?`0.0`:e===`u32`?`0u`:e===`i32`?`0i`:`${e}()`}function Ot(e,t,n){let r=n.kind,i=new Set(t.map(e=>e.name)),a=e.allDefines();if(a.PASS_MAIN=+(r===`main`||r===`visibility`),a.PASS_MASK=+((n.colorFormats?.length??3)>2),a.PASS_VISIBILITY=+(r===`visibility`),a.PASS_DEPTH=+(r===`depth`),a.PASS_COLOR=+(r===`color`),a.PASS_LATE=+!!n.late,a.LIT=+!!e.lit,a.INSTANCED=+!!i.has(`instanceMatrix0`),a.INSTANCE_COLOR=+!!i.has(`instanceColor`),Object.assign(a,n.defines||{}),r===`main`&&n.waterObjectCropModule&&!a.STUDIO_LIGHTING?a.WATER_OBJECT_CROP=1:a.WATER_OBJECT_CROP&&=0,a.WATER_OBJECT_CROP_VIEWPORT&&!a.WATER_OBJECT_CROP&&(a.WATER_OBJECT_CROP_VIEWPORT=0),a.YACHT_EXACT_FINISH_PALETTE&&(r!==`main`||a.STUDIO_LIGHTING||a.INSTANCED||!e.vertexColors||e.attributes?.aSurface!==`vec4f`||!i.has(`yachtFinishIndex`)||!e.yachtExactFinishPalette?.module)&&(a.YACHT_EXACT_FINISH_PALETTE=0),a.YACHT_HALF_COLOR&&(r!==`main`||!a.LIT||a.STUDIO_LIGHTING||a.SHEEN||!N.features.has(`shader-f16`))&&(a.YACHT_HALF_COLOR=0),a.YACHT_HALF_COLOR&&(a.F16=1),a.CLIP_DISTANCES=(a.REFRACTION_CLIP||a.WATER_MAP_REFLECTION)&&N.features.has(`clip-distances`)?1:0,a.WATER_YACHT_SHADING_CACHE&&(r!==`main`||a.STUDIO_LIGHTING||!a.LIT)&&(a.WATER_YACHT_SHADING_CACHE=0),a.WATER_YACHT_SHADING_CACHE&&(!n.yachtShadingCacheModule||!a.PASS_MASK))throw Error(`Yacht shading cache requires a main-pass module and a marker color attachment`);if(a.WATER_SURFACE_YACHT_OCCLUSION&&(r!==`main`||a.STUDIO_LIGHTING||!a.LIT||!a.YACHT_OPAQUE_COLOR||e.transparent)&&(a.WATER_SURFACE_YACHT_OCCLUSION=0),a.WATER_SURFACE_YACHT_OCCLUSION&&!n.waterSurfaceOcclusionModule)throw Error(`Yacht surface occlusion requires a main-pass depth module`);a.WATER_YACHT_PBR_PREPARED=a.WATER_YACHT_SHADING_CACHE||a.WATER_SURFACE_YACHT_OCCLUSION?1:0;let o=`struct VertexIn {
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
`;u+=`\t@location( ${l++} ) worldPos: vec3f,\n`,u+=`\t@location( ${l++} ) normal: vec3f,\n`,u+=`\t@location( ${l++} ) uv: vec2f,\n`,u+=`\t@location( ${l++} )${a.YACHT_FLAT_COLOR?` @interpolate( flat )`:``} color: vec4f,\n`,c&&(u+=`\t@location( ${l++} ) curClip: vec4f,\n`,u+=`\t@location( ${l++} ) prevClip: vec4f,\n`);for(let t in e.varyings){let n=e.varyings[t];u+=`\t@location( ${l++} )${Et.test(n)||a.YACHT_FLAT_SURFACE&&t===`vSurface`?` @interpolate( flat )`:``} ${t}: ${n},\n`}if(u+=`};
`,a.CLIP_DISTANCES){let e=[...u.matchAll(/\s(\w+): [^,]+,\n/g)].map(e=>e[1]);u+=u.replace(`struct VSOut {`,`struct VSOutClip {`).replace(/};\n$/,`	@builtin( clip_distances ) clipDistances: array<f32, 1>,
};
`),u+=`fn vsClip( o: VSOut, d: f32 ) -> VSOutClip {\n\tvar c: VSOutClip;\n${e.map(e=>`\tc.${e} = o.${e};\n`).join(``)}\tc.clipDistances[ 0 ] = d;\n\treturn c;\n}\n`}let d=``;for(let e in wt)if(i.has(e)){let n=t.find(t=>t.name===e);e===`color`&&n.wgsl===`vec3f`?d+=`	v.color = vec4f( i.color, 1.0 );
`:d+=`\tv.${e} = i.${e};\n`}else e!==`position`&&(d+=`\tv.${e} = ${Tt[e]};\n`);for(let t in e.attributes)d+=i.has(t)?`\tv.${t} = i.${t};\n`:`\tv.${t} = ${Dt(e.attributes[t])};\n`;a.YACHT_EXACT_FINISH_PALETTE&&(d+=`	let yachtFinish = yachtExactVertexFinish( i.yachtFinishIndex );
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
`,p=e.shadow?`fn materialShadow( in: FragInput ) -> bool {\n${e.shadow}\n}\n`:``;a.HAS_SHADOW_HOOK=+!!e.shadow,a.NEEDS_DEPTH_FRAGMENT=r===`depth`&&(e.alphaTest>0||e.shadow)?1:0,a.HAS_POSITION=+!!i.has(`position`);let m=f.replace(`fn fragInput(`,p+`fn fragInput(`).replace(/\bTRANSPARENT_F\b/g,e.transparent?`true`:`false`).replace(/\bVELOCITY_WEIGHT\b/g,kt(e.velocityWeight)).replace(/\bREFRACTION_CLIP_MARGIN\b/g,kt((n.defines&&n.defines.REFRACTION_CLIP_MARGIN)??0)),h=[F,Ve,...e.modules];return(r!==`depth`||y(e.modules).includes(He))&&(h=[F,Ve,...ze(n.lightingHooks),He,...e.modules]),e.lightingHooks===!1&&!y(e.modules).includes(He)&&(h=[F,Ve,Be,...e.modules]),a.WATER_YACHT_SHADING_CACHE&&h.push(n.yachtShadingCacheModule),a.WATER_SURFACE_YACHT_OCCLUSION&&h.push(n.waterSurfaceOcclusionModule),a.YACHT_EXACT_FINISH_PALETTE&&h.push(e.yachtExactFinishPalette.module),a.WATER_OBJECT_CROP&&h.push(n.waterObjectCropModule),{code:m,modules:h,defines:a,bindings:{mat:{uniform:e.uniformBlock},...e.bindings},hasFragment:r!==`depth`||a.NEEDS_DEPTH_FRAGMENT===1}}function kt(e){let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`}var At=new S,jt=new i,Mt=new C,Nt=new t,Pt=new t,Ft=new T,It=2**-23;function Lt(e,t){let n=t.elements.map(Math.fround),r=1/0,i=-1/0,a=1/0,o=-1/0;for(let t of[e.min.x,e.max.x])for(let s of[e.min.y,e.max.y])for(let c of[e.min.z,e.max.z])for(let e of[2,3]){let l=[n[e]*t,n[e+4]*s,n[e+8]*c,n[e+12]],u=l.reduce((e,t)=>e+t,0),d=16*It*l.reduce((e,t)=>e+Math.abs(t),0)+1e-37;e===2?(r=Math.min(r,u-d),i=Math.max(i,u+d)):(a=Math.min(a,u-d),o=Math.max(o,u+d))}if(!(a>0))return null;let s=[r/a,r/o,i/a,i/o],c=Math.min(...s),l=Math.max(...s),u=16*It*Math.max(Math.abs(c),Math.abs(l))+1e-37;return Number.isFinite(u)?[c-u,l+u]:null}function Rt(e,t){return e&&t&&(e[1]<t[0]||t[1]<e[0])}var zt=new WeakMap,Bt=0,Vt=256;function Ht(e){let t=e.kind===`main`&&e.defines?.WATER_YACHT_SHADING_CACHE&&e.yachtShadingCacheModule?`.yachtCache:`+e.yachtShadingCacheModule.id:``,n=e.kind===`main`&&e.defines?.WATER_SURFACE_YACHT_OCCLUSION&&e.waterSurfaceOcclusionModule?`.yachtOcclusion:`+e.waterSurfaceOcclusionModule.id:``,r=e.kind===`main`&&e.waterObjectCropModule?`.waterObjectCrop:`+e.waterObjectCropModule.id:``;return e.lightingHooks?`.`+Object.entries(e.lightingHooks).filter(([,e])=>e).sort((e,t)=>e[0].localeCompare(t[0])).map(([e,t])=>e+`:`+t.id).join(`,`)+t+n+r:t+n+r}function Ut(e,t,n,r){if(r?.kind!==`main`||r.defines?.STUDIO_LIGHTING||r.defines?.YACHT_EXACT_FINISH_PALETTE===0||!n.defines?.YACHT_EXACT_FINISH_PALETTE||!n.vertexColors||n.transparent||n.attributes?.aSurface!==`vec4f`)return null;let i=n.yachtExactFinishPalette;return i?.validFor(e,t)?i:null}function Wt(e,t){let n=e.mainPassMaterialGroups;if(t!==`main`||!n||n.originalMaterial!==e.material||!Array.isArray(n.groups)||!n.validFor?.(e))return null;let r=0;for(let e of n.groups){if(e.start!==r||!Number.isInteger(e.count)||e.count<=0||e.count%3||!e.material||e.material.transparent)return null;r+=e.count}let i=e.geometry.index?.count??e.geometry.attributes.position?.count??0;return r===i&&!e.material.transparent?n:null}var Gt=class{constructor(){this.pipelines=new Map,this.geometries=new WeakMap,this.sharedAttributes=new WeakMap,this.sharedIndices=new WeakMap,this.resourceStats={vertexBuffers:0,indexBuffers:0,vertexBytes:0,indexBytes:0,attributeOwners:0,indexOwners:0,bufferUploadBytes:0},this.spatialSortEnabled=!0,this.capacity=8192,this.drawBuffer=null,this.drawData=null,this.drawCount=0,this.frame=-1,this.stats={draws:0,triangles:0,pipelines:0},this.drawLayout=null,this.drawBindGroup=null,this.syncPipelines=!0}_ensureDrawBuffer(){this.drawBuffer&&this.drawData.byteLength>=this.capacity*Vt||(this.drawBuffer&&this.drawBuffer.destroy(),this.drawBuffer=N.device.createBuffer({label:`draws`,size:this.capacity*Vt,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.drawData=new Float32Array(this.capacity*Vt/4),this.drawLayout=x([{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:`uniform`,hasDynamicOffset:!0,minBindingSize:160}}],`draw`),this.drawBindGroup=N.device.createBindGroup({label:`draws`,layout:this.drawLayout,entries:[{binding:0,resource:{buffer:this.drawBuffer,size:160}}]}))}_beginFrame(){this.frame!==N.frame&&(this.frame=N.frame,this._ensureDrawBuffer(),this.drawCount>this.capacity*.75&&(this.capacity*=2,this._ensureDrawBuffer()),this.drawCount=0,N.onSubmit(()=>{this.drawCount&&N.queue.writeBuffer(this.drawBuffer,0,this.drawData.buffer,0,this.drawCount*Vt)}),this.stats.draws=0,this.stats.triangles=0)}_slot(e){let t=e.__draw;if(t||=e.__draw={frame:-1,slot:0,cur:new Float32Array(16),prev:new Float32Array(16),has:!1},t.frame===N.frame)return t.slot;if(this.drawCount>=this.capacity)throw Error(`MeshRenderer: draw buffer full`);t.frame=N.frame,t.slot=this.drawCount++;let n=e.matrixWorld.elements;t.has&&!e.resetVelocity?t.prev.set(t.cur):t.prev.set(n),t.cur.set(n),t.has=!0,e.resetVelocity=!1;let r=t.slot*Vt/4,i=this.drawData;i.set(t.cur,r),i.set(e.staticVelocity?t.cur:t.prev,r+16);let a=e.drawParams;if(i[r+32]=e.id??0,i[r+33]=a?a[0]:0,i[r+34]=a?a[1]:0,i[r+35]=a?a[2]:0,a&&a.length>3)for(let e=0;e<4;e++)i[r+36+e]=a[3+e]??0;return t.slot}_geometryGPU(e){let t=this.geometries.get(e);return t||(t={buffers:new Map,index:null,indexVersion:-1},this.geometries.set(e,t),e.addEventListener&&e.addEventListener(`dispose`,()=>{if(!t.disposed){t.disposed=!0;for(let[e,n]of t.buffers)this._releaseShared(this.sharedAttributes,e,n);t.index&&this._releaseShared(this.sharedIndices,t.indexAttribute,t.index),this.geometries.delete(e)}})),t}_releaseShared(e,t,n){this.resourceStats[n.kind===`index`?`indexOwners`:`attributeOwners`]--,--n.owners===0&&(n.buffer?.destroy(),n.buffer&&this.resourceStats[n.kind===`index`?`indexBuffers`:`vertexBuffers`]--,this.resourceStats[n.kind===`index`?`indexBytes`:`vertexBytes`]-=n.allocationBytes||0,e.delete(t))}_attributeBuffer(e,t){let n=this._geometryGPU(e),r=t.isInterleavedBufferAttribute?t.data:t;if(r.gpuBuffer)return r.gpuBuffer.getGPU?r.gpuBuffer.getGPU():r.gpuBuffer;let i=n.buffers.get(r);i||(i=this.sharedAttributes.get(r),i||(i={buffer:null,size:0,version:-1,owners:0,kind:`attribute`,allocationBytes:0},this.sharedAttributes.set(r,i)),i.owners++,this.resourceStats.attributeOwners++,n.buffers.set(r,i));let a=r.version??0;if(i&&i.version===a&&i.array===r.array)return i.buffer;let o=Yt(t);if((!i.buffer||i.size<o.byteLength)&&(i.buffer?i.buffer.destroy():this.resourceStats.vertexBuffers++,this.resourceStats.vertexBytes-=i.allocationBytes,i.allocationBytes=Math.max(16,Kt(o.byteLength)),this.resourceStats.vertexBytes+=i.allocationBytes,i.buffer=N.device.createBuffer({label:t.name||`attribute`,size:Math.max(16,Kt(o.byteLength)),usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),i.size=o.byteLength,i.version=-1),i.version!==a||i.array!==r.array){let e=r.updateRanges&&r.updateRanges.length&&i.version>=0&&i.array===r.array?r.updateRanges:null;if(e&&o===r.array){let t=r.array.BYTES_PER_ELEMENT;for(let n of e)N.queue.writeBuffer(i.buffer,n.start*t,r.array.buffer,r.array.byteOffset+n.start*t,Kt(n.count*t)),this.resourceStats.bufferUploadBytes+=Kt(n.count*t);r.clearUpdateRanges?r.clearUpdateRanges():r.updateRanges.length=0}else qt(i.buffer,o),this.resourceStats.bufferUploadBytes+=Kt(o.byteLength);i.version=a}return i.array=r.array,i.buffer}_indexBuffer(e){let t=e.index;if(!t)return null;let n=this._geometryGPU(e);if(n.index&&n.indexAttribute!==t&&(this._releaseShared(this.sharedIndices,n.indexAttribute,n.index),n.index=null),!n.index){let e=this.sharedIndices.get(t);e||(e={buffer:null,size:0,version:-1,owners:0,array:null,ref:null,kind:`index`,allocationBytes:0},this.sharedIndices.set(t,e)),e.owners++,this.resourceStats.indexOwners++,n.index=e,n.indexAttribute=t}let r=n.index;if(r.ref&&r.array===t.array&&r.version===(t.version??0))return r.ref;let i=t.array instanceof Uint16Array||t.array instanceof Uint32Array?t.array:new Uint32Array(t.array);return(!r.buffer||r.size<i.byteLength)&&(r.buffer?r.buffer.destroy():this.resourceStats.indexBuffers++,this.resourceStats.indexBytes-=r.allocationBytes,r.allocationBytes=Math.max(16,Kt(i.byteLength)),this.resourceStats.indexBytes+=r.allocationBytes,r.buffer=N.device.createBuffer({label:`index`,size:Math.max(16,Kt(i.byteLength)),usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),r.size=i.byteLength,r.version=-1),(r.version!==(t.version??0)||r.array!==t.array)&&(qt(r.buffer,i),this.resourceStats.bufferUploadBytes+=Kt(i.byteLength),r.version=t.version??0),r.array=t.array,r.ref={buffer:r.buffer,format:i instanceof Uint16Array?`uint16`:`uint32`},r.ref}_cachedLayout(e,t,n,r=null){let i=zt.get(t);i||zt.set(t,i=new Map);let a=e.isInstancedMesh?e.instanceColor?2:1:0,o=Ut(e,t,n,r),s=o?n.id+`:exact-finish-palette`:a?n.id+`:`+a:n.id,c=n.skipVertexUV===!0,l=i.get(s);if(l&&l.palette===o&&l.version===n.version&&l.skipVertexUV===c&&l.attrsVersion===t.attributesVersion&&(!a||l.instanceMatrix===e.instanceMatrix)){let e=l.refs,n=l.names,r=t.attributes,i=!0;for(let t=0;t<n.length;t++)if(r[n[t]]!==e[t]){i=!1;break}if(i)return l.vl}let u=this._layout(e,t,n,r),d=u.layout.filter(e=>!e.name.startsWith(`instance`)&&e.name!==`yachtFinishIndex`).map(e=>e.name);return l={version:n.version,palette:o,skipVertexUV:c,attrsVersion:t.attributesVersion,instanceMatrix:e.instanceMatrix,names:d,refs:d.map(e=>t.attributes[e]),vl:u},u.pipelines=new Map,i.set(s,l),u}_layout(e,t,n,r=null){let i=[],a=Ut(e,t,n,r),o=[`position`,`normal`,`uv`,`color`,...Object.keys(n.attributes)];for(let e of o){if(e===`uv`&&n.skipVertexUV===!0||a&&(e===`color`||e===`aSurface`))continue;let r=t.attributes[e];r&&(e!==`color`||n.vertexColors||n.attributes.color)&&i.push({name:e,attr:r})}if(a&&i.push({name:`yachtFinishIndex`,attr:a.attribute}),e.isInstancedMesh){for(let t=0;t<4;t++)i.push({name:`instanceMatrix`+t,attr:e.instanceMatrix,column:t});e.instanceColor&&i.push({name:`instanceColor`,attr:e.instanceColor})}let s=[],c=[],l=new Map,u=0;for(let e of i){let t=e.attr,r=t.isInterleavedBufferAttribute?t.data:t,i=!!(t.isInstancedBufferAttribute||r.isInstancedInterleavedBuffer||t.meshPerAttribute||r.meshPerAttribute)||e.name.startsWith(`instance`),a=Zt(t),o=l.get(r);if(o===void 0){o=s.length,l.set(r,o);let e=t.isInterleavedBufferAttribute?t.data.stride*a.bytesPerComponent:t.itemSize*a.bytesPerComponent;s.push({src:r,attr:t,layout:{arrayStride:a.converted?a.itemSize*4:e,stepMode:i?`instance`:`vertex`,attributes:[]}})}let d=t.isInterleavedBufferAttribute?t.offset*a.bytesPerComponent:0,f=a.format,p=a.wgsl;e.column!==void 0&&(d=e.column*16,f=`float32x4`,p=`vec4f`),s[o].layout.attributes.push({shaderLocation:u,offset:d,format:f}),(e.name===`position`||e.name===`normal`)&&(p=`vec3f`),e.name===`uv`&&(p=`vec2f`),e.name===`color`&&(p=t.itemSize===4?`vec4f`:`vec3f`),e.name===`instanceColor`&&(p=`vec3f`),n.attributes[e.name]&&(p=n.attributes[e.name]),c.push({name:e.name,wgsl:p,location:u,instanced:i}),u++}return{key:c.map(e=>`${e.name}:${e.wgsl}`).join(`,`)+`|`+s.map(e=>`${e.layout.arrayStride}/${e.layout.stepMode}/${e.layout.attributes.map(e=>e.format+`@`+e.offset).join(`;`)}`).join(`,`),layout:c,buffers:s}}_pipeline(e,t,n){e.__pkFrame!==N.frame&&(e.__pk=e.pipelineKey()+`|`+Ue.version,e.__pkFrame=N.frame);let r=n.passKey,i=t.pipelines&&t.pipelines.get(r);if(i&&i.materialKey===e.__pk)return i.p;let a=`${e.__pk}|${t.key}|${r}`,o=this.pipelines.get(a);return o||=this._createPipeline(e,t,n,a),t.pipelines&&t.pipelines.set(r,{materialKey:e.__pk,p:o}),o}_createPipeline(e,t,n,r){let i=Ot(e,t.layout,n),a=s({modules:i.modules,bindings:i.bindings,code:i.code,defines:i.defines,stage:`render`,label:e.name}),o=m(a.code,e.name);this._ensureDrawBuffer();let c=N.device.createPipelineLayout({bindGroupLayouts:[a.group0.layout,a.bindings.layout,this.drawLayout]}),l=Ke(e.blending),u=[];if(n.kind===`main`){let t=n.defines?.WATER_MAP_MOTION&&!e.transparent&&e.velocityWeight===1,r=n.defines?.WATER_MAP_MOTION&&e.defines?.YACHT_OPAQUE_COLOR&&!e.transparent;u=[{format:n.colorFormats[0],blend:!r&&(e.transparent||n.late)?l:void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0},{format:n.colorFormats[1],blend:n.late&&!t?Ke(`premultiplied`):void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0}],n.colorFormats.length>2&&u.push({format:n.colorFormats[2],blend:Ke(`normal`),writeMask:e.colorWrite?GPUColorWrite.ALL:0})}else n.kind===`color`&&(u=n.colorFormats.map(t=>({format:t,blend:l,writeMask:e.colorWrite?GPUColorWrite.ALL:0})));let d=e.side,f=n.cullOverride||(d===`double`?`none`:d===`back`?`front`:`back`),p=e.depthTest?e.depthCompare||n.depthCompare:`always`,h={label:e.name+` `+n.kind,layout:c,vertex:{module:o,entryPoint:`vs`,buffers:t.buffers.map(e=>e.layout)},primitive:{topology:e.topology,cullMode:f,frontFace:`ccw`}};i.hasFragment&&(h.fragment={module:o,entryPoint:`fs`,targets:u}),n.depthFormat&&(h.depthStencil={format:n.depthFormat,depthWriteEnabled:e.depthWrite,depthCompare:p,depthBias:n.kind===`depth`?n.depthBias||0:e.depthBias,depthBiasSlopeScale:n.kind===`depth`?n.depthBiasSlopeScale||0:e.depthBiasSlopeScale});let g={handle:N.renderPipeline(h),bindings:a.bindings,label:h.label};return this.pipelines.set(r,g),this.stats.pipelines=this.pipelines.size,g}collect(e,{camera:t,layerMask:n=4294967295,filter:r=null,kind:i=`main`,cull:a=!0,frameBlock:o=b}){let s=[],c=[];t&&(t.updateMatrixWorld(),Mt.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse.copy(t.matrixWorld).invert()),jt.setFromProjectionMatrix(Mt,t.reversedDepth!==!1),Pt.setFromMatrixPosition(t.matrixWorld));let l=this.precompiling,u=e=>{if(e.visible||l){e.isMesh&&e.material&&e.geometry&&(e.layers.mask&n)!==0&&(!r||r(e))&&(i!==`depth`||e.castShadow)&&(l||!a||!t||e.frustumCulled===!1||this._inFrustum(e,t,o,i))&&(e.onBeforeRender&&e.onBeforeRender(null,null,t,e.geometry,e.material,null),(e.visible||l)&&this._addItems(e,s,c,i));for(let t of e.children)u(t)}};e.updateMatrixWorld(),u(e),s.sort((e,t)=>e.renderOrder-t.renderOrder||e.pipeKey-t.pipeKey||e.z-t.z);for(let e=1;e<s.length;e++){let t=e;for(;t>0;){let e=s[t-1],n=s[t];if(!e.sortBounds||!n.sortBounds||e.renderOrder!==n.renderOrder||e.pipeKey!==n.pipeKey||e.spatialDepth<=n.spatialDepth||e.sortBounds.intersectsBox(n.sortBounds)||!Rt(e.sortDepthRange,n.sortDepthRange))break;s[t-1]=n,s[t]=e,t--}}return c.sort((e,t)=>e.renderOrder-t.renderOrder||t.z-e.z),{opaque:s,transparent:c}}_inFrustum(e,t,n,r){let i=null;if(e.isInstancedMesh?(!e.boundingSphere&&e.computeBoundingSphere&&e.computeBoundingSphere(),i=e.boundingSphere):(e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),i=e.geometry.boundingSphere),!i||i.radius<0||!Number.isFinite(i.radius))return!0;if(At.copy(i).applyMatrix4(e.matrixWorld),e.userData?.spatialSort&&t){let e=At.center.distanceTo(Pt)+At.radius,i=Math.max(.001,e*1e-6);if(r!==`depth`){let r=n?.fields,a=r?.resolution?.value,o=r?.jitter?.value,s=Math.max(1,a?.x||1),c=Math.max(1,a?.y||1),l=Math.max(2,Math.abs(o?.x||0)*s/2+1),u=Math.max(2,Math.abs(o?.y||0)*c/2+1),d=t.projectionMatrix.elements,f=d[15]===0?e:1;i+=Math.max(2*l/(s*Math.abs(d[0])),2*u/(c*Math.abs(d[5])))*f}At.radius+=i}return jt.intersectsSphere(At)}_addItems(e,t,n,r=`main`){let i=e.geometry,a=Array.isArray(e.material)?e.material:null,o=Nt.setFromMatrixPosition(e.matrixWorld).distanceToSquared(Pt),s=this.spatialSortEnabled&&e.userData?.spatialSort&&i.boundingBox?Ft.copy(i.boundingBox).applyMatrix4(e.matrixWorld).expandByScalar(.001).clone():null,c=s?s.distanceToPoint(Pt)**2:o,l=s?Lt(s,Mt):null,u=(r,a,u,d=r?.id)=>{if(!r||!r.visible&&!this.precompiling)return;let f=r.depthTest&&r.depthWrite&&r.blending===`none`,p={object:e,geometry:i,material:r,start:a,count:u,z:o,spatialDepth:c,sortBounds:f?s:null,sortDepthRange:l,renderOrder:e.renderOrder||0,pipeKey:d};(r.transparent?n:t).push(p)},d=i.drawRange||{start:0,count:1/0},f=Wt(e,r);if(f){if(!f.originalMaterial.visible&&!this.precompiling)return;for(let e of f.groups){let t=Math.max(e.start,d.start),n=Math.min(e.start+e.count,d.start+d.count);n>t&&u(e.material,t,n-t,f.originalMaterial.id)}return}if(a&&i.groups&&i.groups.length)for(let e of i.groups){let t=Math.max(e.start,d.start),n=Math.min(e.start+e.count,d.start+d.count);n>t&&u(a[e.materialIndex],t,n-t)}else u(a?a[0]:e.material,d.start,d.count)}async prepareMeshes(e,t,{cancelled:n=()=>!1}={}){let r=new Set,i=globalThis.performance?.now()??Date.now();for(let a of t){let t={kind:`main`,late:!1,colorFormats:[],depthFormat:null,depthCompare:`greater-equal`,frameBlock:b,layerMask:4294967295,...a};t.passKey=`${t.kind}.${+!!t.late}.${t.colorFormats.join(`,`)}.${t.depthFormat}.${t.depthCompare}.${t.cullOverride||``}.${t.defines?JSON.stringify(t.defines):``}`+Ht(t);for(let a of e){if(n())return;if(!(a.layers.mask&t.layerMask)||t.kind===`depth`&&!a.castShadow)continue;this._indexBuffer(a.geometry);let e=Wt(a,t.kind),o=e?[...new Set(e.groups.map(e=>e.material))]:[a.material];for(let e of o){let n=this._cachedLayout(a,a.geometry,e,t);r.add(this._pipeline(e,n,t).handle)}(globalThis.performance?.now()??Date.now())-i>=8&&typeof requestAnimationFrame==`function`&&(await new Promise(e=>requestAnimationFrame(e)),i=globalThis.performance?.now()??Date.now())}}if(await N.pipelinesReady(),!n()){for(let e of r)if(e.failed||!e.pipeline)throw Error(`Could not prepare `+e.label)}}render(e,t){this._beginFrame(),t={kind:`main`,late:!1,colorFormats:[],depthFormat:null,depthCompare:`greater-equal`,frameBlock:b,layerMask:4294967295,...t},t.passKey=`${t.kind}.${+!!t.late}.${t.colorFormats.join(`,`)}.${t.depthFormat}.${t.depthCompare}.${t.cullOverride||``}.${t.defines?JSON.stringify(t.defines):``}`+Ht(t);let n=t.items||this.collect(e,t);this._prepareYachtTriangleCull(n,t),this._prepareYachtOpaqueIndexOrder(n,t);let r=N.getEncoder(),i=(t.colorViews||[]).map((e,n)=>{let r=t.clearColors?t.clearColors[n]:null;return{view:e,loadOp:r?`clear`:`load`,storeOp:`store`,clearValue:r||[0,0,0,0]}}),a={label:t.label||t.kind,colorAttachments:i};t.depthView&&(a.depthStencilAttachment={view:t.depthView,depthLoadOp:t.clearDepth===null||t.clearDepth===void 0?`load`:`clear`,depthStoreOp:t.depthStoreOp||`store`,depthClearValue:t.clearDepth??0}),t.timestampWrites&&(a.timestampWrites=t.timestampWrites);let o=r.beginRenderPass(a);t.viewport&&o.setViewport(...t.viewport),o.setBindGroup(0,c(t.frameBlock,`render`).getBindGroup()),this.drawItems(o,n.opaque,t),t.betweenLists&&t.betweenLists(o),this.drawItems(o,n.transparent,t),t.after&&t.after(o),o.end()}_prepareYachtTriangleCull(e,t){if(t.kind===`main`&&t.waterObjectCropModule){for(let t of[...e.opaque,...e.transparent])t.yachtTriangleCull=null;return}if(this.precompiling||t.kind!==`main`||!t.yachtTriangleCull||t.viewport||(t.sampleCount??1)!==1)return;let n=t.frameBlock?.fields,r=n?.resolution?.value,i=n?.viewProj?.value;if(!r||!i)return;let a=e=>{for(let n of e){n.yachtTriangleCull=null;let{object:e,geometry:a,material:o}=n,s=a.index?.count??a.attributes.position?.count??a.vertexCount??0,c=Math.min(n.count,s-n.start);if(c<=0)continue;let l=this._cachedLayout(e,a,o,t),u=this._pipeline(o,l,t);(u.handle.pipeline||this.syncPipelines&&N.ready(u.handle))&&(this._slot(e),n.yachtTriangleCull=t.yachtTriangleCull.prepare(e,{model:e.__draw.cur,viewProj:i,width:r.x,height:r.y,start:n.start,count:c}))}};a(e.opaque),a(e.transparent)}_prepareYachtOpaqueIndexOrder(e,t){if(!t.waterOpaqueIndexOrder)return;for(let t of[...e.opaque,...e.transparent])t.yachtOpaqueIndexOrder=null;if(this.precompiling||t.kind!==`main`||t.viewport||t.waterObjectCropModule||t.yachtTriangleCull||(t.sampleCount??1)!==1||t.depthFormat!==`depth32float`||t.depthCompare!==`greater-equal`)return;let n=t.frameBlock?.fields,r=n?.resolution?.value,i=n?.viewProj?.value;if(r&&i)for(let n of e.opaque){let{object:e,geometry:a,material:o}=n,s=Math.min(n.count,(a.index?.count??0)-n.start);if(s<=0||o.transparent)continue;let c=this._cachedLayout(e,a,o,t),l=this._pipeline(o,c,t);(l.handle.pipeline||this.syncPipelines&&N.ready(l.handle))&&(this._slot(e),n.yachtOpaqueIndexOrder=t.waterOpaqueIndexOrder.prepare(e,{material:o,model:e.__draw.cur,viewProj:i,width:r.x,height:r.y,start:n.start,count:s}))}}drawItems(e,t,n){let r=null,i=null,a=new Ct(e),o=++Bt;for(let s of t){let{object:t,geometry:c,material:l}=s;if(!c.attributes.position&&!c.vertexCount&&!c.indirect)continue;let u,d;if(this.precompiling){try{u=this._cachedLayout(t,c,l,n),d=this._pipeline(l,u,n)}catch{continue}continue}u=this._cachedLayout(t,c,l,n),d=this._pipeline(l,u,n);let f=d.handle.pipeline||(this.syncPipelines?N.ready(d.handle):null);if(!f)continue;d!==r&&(e.setPipeline(f),r=d);let p=d.bindings.getBindGroup(o);p!==i&&(e.setBindGroup(1,p),i=p),a.bindObject(this.drawBindGroup,this._slot(t)*Vt);for(let e=0;e<u.buffers.length;e++)a.bindVertex(e,this._attributeBuffer(c,u.buffers[e].attr));let m=t.isInstancedMesh?t.count:c.instanceCount??1;if(m===0)continue;let h=n.kind===`main`&&n.yachtTriangleCull&&!n.viewport&&(n.sampleCount??1)===1?s.yachtTriangleCull:null;if(h){a.bindIndex(h.indexBuffer,h.indexFormat),e.drawIndexedIndirect(h.indirectBuffer,0),this.stats.draws++;continue}let g=n.kind===`main`&&n.waterOpaqueIndexOrder&&!n.viewport&&!n.waterObjectCropModule&&!n.yachtTriangleCull&&(n.sampleCount??1)===1?s.yachtOpaqueIndexOrder:null;if(g){a.bindIndex(g.indexBuffer,g.indexFormat),e.drawIndexed(g.count,m===1/0?1:m,g.start,0,0),this.stats.draws++,this.stats.triangles+=g.count/3*m;continue}let _=this._indexBuffer(c);if(c.indirect){let t=c.indirect.buffer.getGPU?c.indirect.buffer.getGPU():c.indirect.buffer,n=c.indirect.offsets||[c.indirect.offset||0];_&&a.bindIndex(_.buffer,_.format);for(let r of n)_?e.drawIndexedIndirect(t,r):e.drawIndirect(t,r),this.stats.draws++;continue}if(_){let t=Math.min(s.count,c.index.count-s.start);if(t<=0)continue;a.bindIndex(_.buffer,_.format),e.drawIndexed(t,m===1/0?1:m,s.start,0,0),this.stats.triangles+=t/3*m}else{let t=c.attributes.position?c.attributes.position.count:c.vertexCount,n=Math.min(s.count,t-s.start);if(n<=0)continue;e.draw(n,m,s.start,0),this.stats.triangles+=n/3*m}this.stats.draws++}}};function Kt(e){return Math.ceil(e/4)*4}function qt(e,t){if(t.byteLength%4==0){N.queue.writeBuffer(e,0,t.buffer,t.byteOffset,t.byteLength);return}let n=new Uint8Array(Kt(t.byteLength));n.set(new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),N.queue.writeBuffer(e,0,n)}var Jt=new WeakMap;function Yt(e){let t=e.isInterleavedBufferAttribute?e.data:e;if(!Zt(e).converted)return t.array;let n=Jt.get(t);if(n&&n.version===t.version)return n.array;let r=e.count,i=e.itemSize,a=new Float32Array(r*i),o=e.normalized?Xt(t.array):1;for(let e=0;e<r*i;e++)a[e]=t.array[e]/o;return Jt.set(t,{version:t.version,array:a}),a}function Xt(e){return e instanceof Uint8Array?255:e instanceof Int8Array?127:e instanceof Uint16Array?65535:e instanceof Int16Array?32767:1}function Zt(e){let t=(e.isInterleavedBufferAttribute?e.data:e).array,n=e.itemSize,r=e.normalized,i=e=>n===1?e:`vec${n}${e===`f32`?`f`:e===`u32`?`u`:`i`}`;if(t instanceof Float32Array)return{format:n===1?`float32`:`float32x${n}`,wgsl:i(`f32`),bytesPerComponent:4,itemSize:n};if(t instanceof Uint32Array)return{format:n===1?`uint32`:`uint32x${n}`,wgsl:i(`u32`),bytesPerComponent:4,itemSize:n};if(t instanceof Int32Array)return{format:n===1?`sint32`:`sint32x${n}`,wgsl:i(`i32`),bytesPerComponent:4,itemSize:n};let a={Uint8Array:[`uint8`,`unorm8`,1],Int8Array:[`sint8`,`snorm8`,1],Uint16Array:[`uint16`,`unorm16`,2],Int16Array:[`sint16`,`snorm16`,2]}[t.constructor.name];return a&&(n===2||n===4)&&!e.isInterleavedBufferAttribute?{format:(r?a[1]:a[0])+`x`+n,wgsl:i(r?`f32`:t instanceof Uint8Array||t instanceof Uint16Array?`u32`:`i32`),bytesPerComponent:a[2],itemSize:n}:{format:n===1?`float32`:`float32x${n}`,wgsl:i(`f32`),bytesPerComponent:4,itemSize:n,converted:!0}}var Qt=class{constructor(e){this.container=e,this.renderScale=1,this.clock=new Xe,this.frame=0,this.onResize=[],this.renderOptimizations=bt(),this.pacingStats={callbacks:0,submitted:0,completed:0,skipped:0,inFlight:0,maxInFlight:0}}async init(){let e=document.createElement(`canvas`);e.tabIndex=0,this.container.appendChild(e),this.canvas=e,this.domElement=e,await N.init({canvas:e}),N.reuseAllocationBindings=this.renderOptimizations.bindingReuse,this.meshRenderer=new Gt,this.meshRenderer.syncPipelines=!1,this.camera=new Te(62,window.innerWidth/window.innerHeight,.06,6e4),this.scene=new De,window.addEventListener(`resize`,()=>this.resize()),this.resize()}setRenderScale(e){this.renderScale=e,this.resize()}get width(){return this.canvas.width}get height(){return this.canvas.height}resize(){let e=window.innerWidth,t=window.innerHeight,n=this.renderScale;this.canvas.width=Math.max(1,Math.floor(e*n)),this.canvas.height=Math.max(1,Math.floor(t*n)),this.canvas.style.width=e+`px`,this.canvas.style.height=t+`px`,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),b.fields.outputResolution.value.set(this.canvas.width,this.canvas.height);for(let n of this.onResize)n(e,t)}currentTexture(){return N.context.getCurrentTexture()}start(e){this.stop(),this._running=!0;let t=this._loopGeneration,n=N.queue,r=this.renderOptimizations.framePacing;(!this._flight||this._flight.queue!==n)&&(this._flight={queue:n,count:0});let i=this._flight,a=this.pacingStats;r&&this.clock.reset();let o=s=>{if(this._running&&t===this._loopGeneration){if(a.callbacks++,r&&i.count>=2)a.skipped++;else{this.clock.update(s),this.frameInterval=this.clock.getDelta();let t=Math.min(.1,this.frameInterval);this.frame++,e(t,this.clock.getElapsed()),a.submitted++,r&&(i.count++,a.inFlight=i.count,a.maxInFlight=Math.max(a.maxInFlight,i.count),n.onSubmittedWorkDone().then(()=>{i.count--,a.completed++,i===this._flight&&(a.inFlight=i.count)},e=>{i.count--,i===this._flight&&(a.inFlight=i.count,a.error=String(e),this.stop(),console.error(`Frame queue failed:`,e))}))}this._running&&t===this._loopGeneration&&(this._raf=requestAnimationFrame(o))}};this._raf=requestAnimationFrame(o)}stop(){this._running=!1,this._loopGeneration=(this._loopGeneration||0)+1,cancelAnimationFrame(this._raf)}},$t=class{constructor(e){this.dom=e,this.keys=new Set,this.pressed=new Set,this.look={x:0,y:0},this.wheel=0,this.mouseDown=!1,this.rightDown=!1,this.locked=!1,this.enabled=!0,window.addEventListener(`keydown`,e=>{(!e.target||e.target.tagName!==`INPUT`&&e.target.tagName!==`SELECT`&&e.target.tagName!==`TEXTAREA`)&&(this.keys.has(e.code)||this.pressed.add(e.code),this.keys.add(e.code),[`Space`,`ArrowUp`,`ArrowDown`,`Tab`].includes(e.code)&&e.preventDefault())}),window.addEventListener(`keyup`,e=>this.keys.delete(e.code)),window.addEventListener(`blur`,()=>this.keys.clear()),e.addEventListener(`mousedown`,e=>{e.button===0&&(this.mouseDown=!0),e.button===2&&(this.rightDown=!0)}),window.addEventListener(`mouseup`,e=>{e.button===0&&(this.mouseDown=!1),e.button===2&&(this.rightDown=!1)}),e.addEventListener(`contextmenu`,e=>e.preventDefault()),window.addEventListener(`mousemove`,e=>{(this.locked||this.mouseDown||this.rightDown)&&(this.look.x+=e.movementX,this.look.y+=e.movementY)}),e.addEventListener(`wheel`,e=>{this.wheel+=Math.sign(e.deltaY),e.preventDefault()},{passive:!1}),document.addEventListener(`pointerlockchange`,()=>{this.locked=document.pointerLockElement===e})}requestLock(){this.locked||this.dom.requestPointerLock?.()?.catch?.(()=>{})}down(e){return this.enabled&&this.keys.has(e)}hit(e){return this.enabled&&this.pressed.has(e)}consumeLook(){let e={x:this.look.x,y:this.look.y};return this.look.x=0,this.look.y=0,e}consumeWheel(){let e=this.wheel;return this.wheel=0,e}endFrame(){this.pressed.clear()}},en=new t,tn=new S,nn=new i,rn=new C,an=new C,on={OPAQUE:0,WATER:1,TRANSPARENT:2,REFLECT_ONLY:3},sn=xt(bt().compactTargets),cn=`depth32float`,ln=class{constructor(e,t,n){this.meshRenderer=e,this.scene=t,this.camera=n,this.scale=1,this.waterEnabled=!0,this.refractionEnabled=!0,this.renderOptimizations=bt(),this.visibilityDepth=!this.renderOptimizations.reference&&new URLSearchParams(globalThis.location?.search||``).has(`visibilityDepth`),this.width=1,this.height=1,this.sceneRT=new le(1,1,{colors:sn.map((e,t)=>({format:e,name:[`color`,`velocity`,`waterMask`][t]})),depth:cn,label:`scene`}),this.velocityTexture=this.sceneRT.textures[1],this.waterMaskTexture=this.sceneRT.textures[2],this.opaqueCopy=new le(1,1,{colors:[`rgba16float`],depth:cn,label:`opaqueCopy`}),this.opaqueDepthHalf=new le(1,1,{colors:[`r16float`],label:`opaqueDepthHalf`}),this._depthHalfPass=null,this.hullMaskRT=new le(1,1,{colors:[`r16float`],depth:cn,label:`hullMask`}),this.hullMaskScene=new De,this.hullMaskMaterial=new qe({name:`hullMask`,lit:!1,side:`double`,surface:`s.albedo = vec3f( length( in.P - frame.cameraPos ), 0.0, 0.0 ); s.emissive = vec3f( 0.0 );`}),this.hullMasks=[],this.hullMaskActive={value:0},this.background=null,this.clearColor=[0,0,0,1],this.onBeforeWater=null}setSize(e,t){this.width=e,this.height=t,this.sceneRT.setSize(e,t),this.opaqueCopy.setSize(e,t),this.opaqueDepthHalf.setSize(e,t),this.hullMaskRT.setSize(e,t)}addHullMask(e,t){e.computeBoundingBox(),e.computeBoundingSphere();let n=new ve(e,this.hullMaskMaterial);return n.matrixAutoUpdate=!1,n.frustumCulled=!1,this.hullMaskScene.add(n),this.hullMasks.push({mesh:n,object:t,box:e.boundingBox.clone().expandByScalar(.05),sphere:e.boundingSphere}),n}_renderHullMasks(e){let t=0;nn.setFromProjectionMatrix(rn.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse));for(let n of this.hullMasks){n.object.updateWorldMatrix(!0,!1),n.mesh.matrix.copy(n.object.matrixWorld),n.mesh.matrixWorld.copy(n.object.matrixWorld),en.setFromMatrixPosition(e.matrixWorld).applyMatrix4(an.copy(n.object.matrixWorld).invert());let r=!n.box.containsPoint(en)&&nn.intersectsSphere(tn.copy(n.sphere).applyMatrix4(n.object.matrixWorld));n.mesh.visible=r,r&&t++}if(this.hullMaskActive.value=+(t>0),!t)return;let n=this.hullMaskRT;this.meshRenderer.render(this.hullMaskScene,{label:`hull mask`,kind:`color`,camera:e,colorViews:[n.texture.view()],colorFormats:n.formats,clearColors:[[0,0,0,0]],depthView:n.depthTexture.view(),depthFormat:cn,clearDepth:0,cull:!1})}render(){let{scene:e,camera:t,meshRenderer:n}=this,r=this.sceneRT,i={camera:t,colorViews:r.textures.map(e=>e.view()),colorFormats:r.formats,depthView:r.depthTexture.view(),depthFormat:cn,kind:`main`};this.visibilityDepth&&n.render(e,{label:`opaque visibility depth`,kind:`visibility`,camera:t,depthView:i.depthView,depthFormat:cn,clearDepth:0,layerMask:1<<on.OPAQUE,filter:e=>!Array.isArray(e.material)&&!e.material.transparent&&e.material.colorWrite&&e.material.depthWrite&&e.material.depthTest&&(e.material.depthCompare===null||e.material.depthCompare===`greater-equal`)&&e.material.blending===`none`&&!e.material.output}),n.render(e,{...i,label:`opaque`,layerMask:1<<on.OPAQUE,clearColors:[this.clearColor,[0,0,0,0],[0,0,0,0]],clearDepth:this.visibilityDepth?null:0,after:this.background?e=>this.background.draw(e):null});let a=N.getEncoder(),o={width:r.width,height:r.height};this.waterEnabled&&a.copyTextureToTexture({texture:r.texture.getGPU()},{texture:this.opaqueCopy.texture.getGPU()},o),a.copyTextureToTexture({texture:r.depthTexture.getGPU()},{texture:this.opaqueCopy.depthTexture.getGPU()},o),this.waterEnabled&&this.refractionEnabled&&!this._depthHalfPass&&(this._depthHalfPass=new Je({label:`opaque depth half`,colorFormats:[`r16float`],bindings:{srcDepth:{texture:()=>this.opaqueCopy.depthTexture}},code:`fn fragment( in: FSIn ) -> vec4f { return vec4f( textureLoad( srcDepth, vec2i( in.pos.xy ), 0 ), 0.0, 0.0, 1.0 ); }`})),this.waterEnabled&&this.refractionEnabled&&this._depthHalfPass.render({colorViews:[this.opaqueDepthHalf.texture],clear:[0,0,0,0]}),this.waterEnabled&&this.hullMasks.length>0&&this._renderHullMasks(t),this.waterEnabled&&this.refractionEnabled&&this.onBeforeWater&&this.onBeforeWater(),n.render(e,{...i,label:`water + transparent`,late:!0,layerMask:(this.waterEnabled?1<<on.WATER:0)|1<<on.TRANSPARENT})}},un={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT4:16},dn={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},fn={5120:127,5121:255,5122:32767,5123:65535};async function pn(e){let t;if(globalThis.__assetFile)t=await globalThis.__assetFile(e);else{let n=await fetch(e);if(!n.ok)throw Error(`GLB: `+e+` `+n.status);t=await n.arrayBuffer()}return mn(t)}function mn(e){let n=new DataView(e);if(n.getUint32(0,!0)!==1179937895)throw Error(`GLB: bad magic`);let i=n.getUint32(8,!0),a=null,o=null;for(let t=12;t<i;){let r=n.getUint32(t,!0),i=n.getUint32(t+4,!0);i===1313821514?a=JSON.parse(new TextDecoder().decode(new Uint8Array(e,t+8,r))):i===5130562&&(o=new Uint8Array(e,t+8,r)),t+=8+r}if(!a)throw Error(`GLB: no JSON chunk`);if(a.extensionsRequired&&a.extensionsRequired.length)throw Error(`GLB: unsupported extensions `+a.extensionsRequired.join(`, `));let s=e=>{let t=a.bufferViews[e];if(t.buffer!==0||!o)throw Error(`GLB: external buffers are not supported`);return new Uint8Array(o.buffer,o.byteOffset+(t.byteOffset||0),t.byteLength)},c=e=>{let t=a.accessors[e];if(t.sparse)throw Error(`GLB: sparse accessors are not supported`);let n=un[t.type],r=dn[t.componentType],i=new r(t.count*n);if(t.bufferView!==void 0){let e=a.bufferViews[t.bufferView],o=s(t.bufferView),c=o.byteOffset+(t.byteOffset||0),l=r.BYTES_PER_ELEMENT,u=e.byteStride||n*l;if(u===n*l&&c%l===0)i.set(new r(o.buffer,c,t.count*n));else{let e=new DataView(o.buffer),r={5120:t=>e.getInt8(t),5121:t=>e.getUint8(t),5122:t=>e.getInt16(t,!0),5123:t=>e.getUint16(t,!0),5125:t=>e.getUint32(t,!0),5126:t=>e.getFloat32(t,!0)}[t.componentType];for(let e=0;e<t.count;e++)for(let t=0;t<n;t++)i[e*n+t]=r(c+e*u+t*l)}}return{array:i,itemSize:n,normalized:!!t.normalized,componentType:t.componentType}},l=e=>{let t=c(e);if(t.array instanceof Float32Array)return t.array;let n=new Float32Array(t.array.length),r=t.normalized?1/fn[t.componentType]:1;for(let e=0;e<n.length;e++)n[e]=Math.max(t.array[e]*r,-1);return n},u=new C,d=new t,f=new r,p=new t,m=(a.nodes||[]).map(e=>{let t=e.translation||[0,0,0],n=e.rotation||[0,0,0,1],r=e.scale||[1,1,1];return e.matrix&&(u.fromArray(e.matrix).decompose(d,f,p),t=[d.x,d.y,d.z],n=[f.x,f.y,f.z,f.w],r=[p.x,p.y,p.z]),{name:e.name||``,children:e.children||[],t:t.slice(),r:n.slice(),s:r.slice(),mesh:e.mesh,skin:e.skin}}),h=(a.meshes||[]).map(e=>e.primitives.map(e=>{let t={};for(let n in e.attributes)t[n]=c(e.attributes[n]);return e.targets&&e.targets.length&&console.warn(`GLB: morph targets are ignored`),{attributes:t,indices:e.indices===void 0?null:c(e.indices).array,material:e.material,mode:e.mode??4}})),g=(a.skins||[]).map(e=>({name:e.name||``,joints:e.joints,skeleton:e.skeleton,inverseBindMatrices:e.inverseBindMatrices===void 0?hn(e.joints.length):l(e.inverseBindMatrices)})),_=(a.animations||[]).map(e=>{let t=0,n=[];for(let r of e.channels){if(r.target.node===void 0||r.target.path===`weights`)continue;let i=e.samplers[r.sampler],a=l(i.input),o=l(i.output),s=r.target.path===`rotation`?4:3;if(i.interpolation===`CUBICSPLINE`){let e=new Float32Array(a.length*s);for(let t=0;t<a.length;t++)for(let n=0;n<s;n++)e[t*s+n]=o[(t*3+1)*s+n];o=e}t=Math.max(t,a[a.length-1]),n.push({node:r.target.node,path:r.target.path,times:a,values:o,step:i.interpolation===`STEP`})}let r=1/0;for(let e of n)r=Math.min(r,e.times[0]);if(r>0&&r<1/0){for(let e of n)for(let t=0;t<e.times.length;t++)e.times[t]-=r;t-=r}return{name:e.name||`clip`,duration:t,channels:n}}),v=(a.images||[]).map(e=>({bytes:e.bufferView===void 0?null:s(e.bufferView),mimeType:e.mimeType,uri:e.uri})),y=a.scenes?a.scenes[a.scene||0]:null,b=y?y.nodes:m.map((e,t)=>t).filter(e=>!m.some(t=>t.children.includes(e)));return{json:a,nodes:m,roots:b,meshes:h,skins:g,animations:_,materials:a.materials||[],textures:a.textures||[],images:v}}function hn(e){let t=new Float32Array(e*16);for(let n=0;n<e;n++)t[n*16]=t[n*16+5]=t[n*16+10]=t[n*16+15]=1;return t}async function gn(e,t){if(globalThis.__assetImage)return globalThis.__assetImage(e,t);let n=await createImageBitmap(new Blob([e],{type:t}),{colorSpaceConversion:`none`,premultiplyAlpha:`none`}),r=new OffscreenCanvas(n.width,n.height).getContext(`2d`,{willReadFrequently:!0});r.drawImage(n,0,0);let i=n.width,a=n.height,o=r.getImageData(0,0,i,a).data;return n.close&&n.close(),{data:new Uint8Array(o.buffer,o.byteOffset,o.byteLength),width:i,height:a}}var _n=e=>`
	let sj = v.skinIndex;
	let sw = v.skinWeight;
	let sk = skinJoints[ sj.x ] * sw.x + skinJoints[ sj.y ] * sw.y + skinJoints[ sj.z ] * sw.z + skinJoints[ sj.w ] * sw.w;
	let skp = skinJoints[ sj.x + ${e}u ] * sw.x + skinJoints[ sj.y + ${e}u ] * sw.y + skinJoints[ sj.z + ${e}u ] * sw.z + skinJoints[ sj.w + ${e}u ] * sw.w;
	let lp = vec4f( v.position, 1.0 );
	let lm = v.model * sk;
	v.useWorld = true;
	v.worldPos = ( lm * lp ).xyz;
	v.worldNormal = cofactor3( lm ) * v.normal;
	v.prevWorldPos = ( v.prevModel * skp * lp ).xyz;
`;function vn({name:e,joints:t,jointBuffer:n,textures:r={},alphaMode:i=`OPAQUE`,alphaCutoff:a=.5,doubleSided:o=!1,surface:s=``,uniforms:c={},color:l=null,roughness:u=1,metalness:d=1,defines:f={},modules:p=[]}){let m={};r.albedo&&(m.chAlbedo=r.albedo),r.normal&&(m.chNormal=r.normal),r.orm&&(m.chOrm=r.orm);let h=`
#if HAS_ALBEDO
	let ca = textureSample( chAlbedo, smpAnisoRepeat, in.uv );
	s.albedo *= ca.rgb;
	s.alpha *= ca.a;
#endif
#if HAS_ORM
	let orm = textureSample( chOrm, smpAnisoRepeat, in.uv );
	s.roughness *= orm.g;
	s.metalness *= orm.b;
#endif
#if HAS_NORMAL
	let nm = textureSample( chNormal, smpAnisoRepeat, in.uv ).xyz * 2.0 - 1.0;
	s.normal = perturbNormalByMap( in.P, in.N, in.uv, nm );
#endif
${s}
`;return new qe({name:e,modules:p,attributes:{skinIndex:`vec4u`,skinWeight:`vec4f`},storage:{skinJoints:{storage:n,access:`read`}},textures:m,uniforms:c,color:l||void 0,roughness:u,metalness:d,vertex:_n(t),surface:h,side:o?`double`:`front`,alphaTest:i===`MASK`||i===`BLEND`?a:0,defines:{HAS_ALBEDO:+!!m.chAlbedo,HAS_ORM:+!!m.chOrm,HAS_NORMAL:+!!m.chNormal,...f}})}function yn(e,t,n,r,i){let a=r[0],o=r[1],s=r[2],c=r[3],l=a+a,u=o+o,d=s+s,f=a*l,p=a*u,m=a*d,h=o*u,g=o*d,_=s*d,v=c*l,y=c*u,b=c*d,x=i[0],S=i[1],C=i[2];e[t]=(1-(h+_))*x,e[t+1]=(p+b)*x,e[t+2]=(m-y)*x,e[t+3]=0,e[t+4]=(p-b)*S,e[t+5]=(1-(f+_))*S,e[t+6]=(g+v)*S,e[t+7]=0,e[t+8]=(m+y)*C,e[t+9]=(g-v)*C,e[t+10]=(1-(f+h))*C,e[t+11]=0,e[t+12]=n[0],e[t+13]=n[1],e[t+14]=n[2],e[t+15]=1}function bn(e,t,n,r,i,a){for(let o=0;o<4;o++){let s=i[a+o*4],c=i[a+o*4+1],l=i[a+o*4+2],u=i[a+o*4+3];for(let i=0;i<4;i++)e[t+o*4+i]=n[r+i]*s+n[r+4+i]*c+n[r+8+i]*l+n[r+12+i]*u}}function xn(e,t,n){let r=e.times,i=e.values,a=e.path===`rotation`?4:3,o=r.length;if(o===1||t<=r[0]){for(let e=0;e<a;e++)n[e]=i[e];return}if(t>=r[o-1]){for(let e=0;e<a;e++)n[e]=i[(o-1)*a+e];return}let s=e._k||0;for(r[s]>t&&(s=0);s<o-2&&r[s+1]<=t;)s++;e._k=s;let c=e.step?0:(t-r[s])/(r[s+1]-r[s]),l=s*a,u=(s+1)*a;if(a===4){let e=i[l]*i[u]+i[l+1]*i[u+1]+i[l+2]*i[u+2]+i[l+3]*i[u+3]<0?-c:c,t=i[l]*(1-c)+i[u]*e,r=i[l+1]*(1-c)+i[u+1]*e,a=i[l+2]*(1-c)+i[u+2]*e,o=i[l+3]*(1-c)+i[u+3]*e,s=1/Math.hypot(t,r,a,o);n[0]=t*s,n[1]=r*s,n[2]=a*s,n[3]=o*s}else for(let e=0;e<3;e++)n[e]=i[l+e]+(i[u+e]-i[l+e])*c}var Sn=class e{static async create(t,{materials:n=null,textureSize:r=null}={}){let i=new e(t);return await i._buildMeshes(n),i}constructor(e){this.gltf=e;let t=e.skins[0];if(!t)throw Error(`SkinnedModel: no skin`);this.skin=t;let n=e.nodes.length;this.nodeCount=n,this.joints=t.joints.length,this.rest=e.nodes.map(e=>({t:Float32Array.from(e.t),r:Float32Array.from(e.r),s:Float32Array.from(e.s)})),this.local=e.nodes.map(e=>({t:Float32Array.from(e.t),r:Float32Array.from(e.r),s:Float32Array.from(e.s)})),this.world=new Float32Array(n*16),this._localM=new Float32Array(16),this.order=[],this.parent=new Int32Array(n).fill(-1);let r=t=>{this.order.push(t);for(let n of e.nodes[t].children)this.parent[n]=t,r(n)};for(let t of e.roots)r(t);this.jointData=new Float32Array(this.joints*32),this.jointBuffer=new ce({label:`skinJoints`,count:this.joints*2,type:`mat4x4f`}),this._first=!0,this.clips=new Map;for(let t of e.animations)this.clips.set(t.name,t);this.layers=[],this._acc=e.nodes.map(()=>({t:new Float32Array(3),r:new Float32Array(4),s:new Float32Array(3),wt:0,wr:0,ws:0})),this._tmp=new Float32Array(4),this.group=new de,this.group.name=`SkinnedModel`,this.meshes=[],this.materials=[],this.onClipEnd=null,this._pose()}async _buildMeshes(e){let t=this.gltf,n=new Map,r=async(e,r)=>{if(!e)return null;let i=t.textures[e.index].source,a=i+(r?`s`:`l`);if(!n.has(a)){let e=t.images[i],o=await gn(e.bytes,e.mimeType),s=new P({label:`char`+i,width:o.width,height:o.height,format:r?`rgba8unorm-srgb`:`rgba8unorm`,data:o.data,mips:!0,usage:[`sample`,`copyDst`],sampler:`anisoRepeat`});s.getGPU(),oe(s),n.set(a,s)}return n.get(a)},i=t.nodes.findIndex(e=>e.mesh!==void 0&&e.skin!==void 0),a=t.meshes[t.nodes[i].mesh],o=new Map;for(let n of a){let i=new Ie,a=n.attributes;i.setAttribute(`position`,new be(a.POSITION.array,3)),a.NORMAL&&i.setAttribute(`normal`,new be(a.NORMAL.array,3)),a.TEXCOORD_0&&i.setAttribute(`uv`,new be(Cn(a.TEXCOORD_0),2)),i.setAttribute(`skinIndex`,new be(Uint32Array.from(a.JOINTS_0.array),4)),i.setAttribute(`skinWeight`,new be(wn(Cn(a.WEIGHTS_0)),4)),n.indices&&i.setIndex(new be(n.indices instanceof Uint32Array||n.indices instanceof Uint16Array?n.indices:Uint32Array.from(n.indices),1)),i.computeBoundingSphere();let s=o.get(n.material);if(!s){let i=t.materials[n.material]||{},a=i.pbrMetallicRoughness||{},c={gltfMaterial:i,name:i.name||`material`,textures:{albedo:await r(a.baseColorTexture,!0),orm:await r(a.metallicRoughnessTexture,!1),normal:await r(i.normalTexture,!1)},alphaMode:i.alphaMode||`OPAQUE`},l=e&&e(c)||{};s=vn({name:`skinned-`+c.name,joints:this.joints,jointBuffer:this.jointBuffer,textures:c.textures,alphaMode:c.alphaMode,alphaCutoff:i.alphaCutoff??.5,doubleSided:!!i.doubleSided,roughness:a.roughnessFactor??1,metalness:a.metallicFactor??1,...l}),o.set(n.material,s),this.materials.push(s)}let c=new ve(i,s);c.name=`skinned:`+(t.materials[n.material]?.name||``),c.frustumCulled=!1,c.castShadow=!0,c.receiveShadow=!0,this.group.add(c),this.meshes.push(c)}}clipNames(){return[...this.clips.keys()]}clipDuration(e){let t=this.clips.get(e);return t?t.duration:0}play(e,{fade:t=.4,loop:n=!0,speed:r=1,from:i=0}={}){let a=this.clips.get(e);if(!a)throw Error(`SkinnedModel: no clip `+e);let o=this.layers.find(e=>e.clip===a&&e.target===1);if(o)return o;let s={clip:a,time:i,weight:+!this.layers.length,target:1,fade:Math.max(t,.001),loop:n,speed:r,ended:!1};for(let e of this.layers)e.target=0,e.fade=s.fade;return this.layers.push(s),s}get current(){let e=this.layers.find(e=>e.target===1);return e?e.clip.name:null}hold(){if(this._held)return;let e=this.joints,t=this.jointData;t.copyWithin(e*16,0,e*16),this.jointBuffer.write(t),this._held=!0}update(e){e===0&&(this._first=!0),this._held=!1;for(let t of this.layers){t.time+=e*t.speed;let n=t.clip.duration;t.time>=n&&(t.loop&&n>0?t.time%=n:(t.time=n,t.ended||(t.ended=!0,t.target===1&&this.onClipEnd&&this.onClipEnd(t.clip.name))));let r=e/t.fade;t.weight=t.target>t.weight?Math.min(t.target,t.weight+r):Math.max(t.target,t.weight-r)}this.layers=this.layers.filter(e=>e.target>0||e.weight>1e-4);let t=0;for(let e of this.layers)t+=e.weight;if(t>1e-4)for(let e of this.layers)e.weight/=t;this._pose()}_pose(){let e=this.nodeCount,t=this._acc,n=this._tmp;for(let n=0;n<e;n++){let e=t[n];e.wt=e.wr=e.ws=0,e.t.fill(0),e.r.fill(0),e.s.fill(0)}for(let e of this.layers)if(!(e.weight<=0))for(let r of e.clip.channels){let i=t[r.node];if(xn(r,e.time,n),r.path===`rotation`){let t=i.r[0]*n[0]+i.r[1]*n[1]+i.r[2]*n[2]+i.r[3]*n[3]<0?-e.weight:e.weight;for(let e=0;e<4;e++)i.r[e]+=n[e]*t;i.wr+=e.weight}else if(r.path===`translation`){for(let t=0;t<3;t++)i.t[t]+=n[t]*e.weight;i.wt+=e.weight}else{for(let t=0;t<3;t++)i.s[t]+=n[t]*e.weight;i.ws+=e.weight}}for(let n=0;n<e;n++){let e=t[n],r=this.local[n],i=this.rest[n];for(let t=0;t<3;t++)r.t[t]=e.t[t]+i.t[t]*(1-Math.min(e.wt,1)),r.s[t]=e.s[t]+i.s[t]*(1-Math.min(e.ws,1));if(e.wr>0){let t=1-Math.min(e.wr,1),n=e.r[0]*i.r[0]+e.r[1]*i.r[1]+e.r[2]*i.r[2]+e.r[3]*i.r[3]<0?-t:t,a=e.r[0]+i.r[0]*n,o=e.r[1]+i.r[1]*n,s=e.r[2]+i.r[2]*n,c=e.r[3]+i.r[3]*n,l=1/Math.hypot(a,o,s,c);r.r[0]=a*l,r.r[1]=o*l,r.r[2]=s*l,r.r[3]=c*l}else r.r.set(i.r)}let r=this.world,i=this._localM;for(let e of this.order){let t=this.local[e];yn(i,0,t.t,t.r,t.s);let n=this.parent[e];n<0?r.set(i,e*16):bn(r,e*16,r,n*16,i,0)}let a=this.joints,o=this.jointData,s=this.skin.inverseBindMatrices;this._first||o.copyWithin(a*16,0,a*16);for(let e=0;e<a;e++)bn(o,e*16,r,this.skin.joints[e]*16,s,e*16);this._first&&=(o.copyWithin(a*16,0,a*16),!1),this.jointBuffer.write(o)}nodeWorld(e,t){let n=this.gltf.nodes.findIndex(t=>t.name===e);if(n<0)return null;let r=this.world;return t.set(r[n*16+12],r[n*16+13],r[n*16+14])}dispose(){this.jointBuffer.destroy();for(let e of this.meshes)e.geometry.dispose&&e.geometry.dispose()}};function Cn(e){if(e.array instanceof Float32Array)return e.array;let t=e.normalized?1/(e.array instanceof Uint8Array?255:e.array instanceof Uint16Array?65535:1):1;return Float32Array.from(e.array,e=>e*t)}function wn(e){for(let t=0;t<e.length;t+=4){let n=e[t]+e[t+1]+e[t+2]+e[t+3];if(n>0)for(let r=0;r<4;r++)e[t+r]/=n;else e[t]=1}return e}var Tn=class{constructor({gridSize:e=64,leafSize:r=8,levels:a=12,rangeFactor:o=2.5,morphStartRatio:s=.66,maxInstances:c=1500,minY:u=-20,maxY:d=20,heightBounds:f=null,center:m=null,prefix:h=`cdlod`}={}){this.G=e,this.leafSize=r,this.levels=a,this.minY=u,this.maxY=d,this.heightBounds=f,this.fixedRoot=m,this.ranges=[];let _=[],v=0;for(let e=0;e<a;e++){let t=r*2**e*o;this.ranges.push(t);let n=v+(t-v)*s;_.push(new p(n,1/Math.max(.001,t-n))),v=t}let y=[];for(let t=0;t<a;t++)y.push(r*2**t/e);this.uMorph={array:_},this.uSpacing={array:y};let b=h,x=b[0].toUpperCase()+b.slice(1);this.params=new l(x+`Params`,{morph:[`vec4f[${a}]`,_.map((e,t)=>new n(e.x,e.y,y[t],0))]},{label:b}),this.module=new g({name:b,uniforms:this.params,uniformName:b,code:`
struct ${x}Vertex { worldXZ: vec2f, spacing: f32, morphK: f32, lod: f32, size: f32 };

// Morph in world space on the LOD's own vertex lattice (spacing h). Quarter nodes of a
// partially subdivided parent carry the parent's LOD, so their extra vertices first snap
// onto that lattice; every node covering a point then computes the same position.
fn ${b}Snapped( node: vec4f, grid: vec2f ) -> vec2f {
	let h = ${b}.morph[ i32( node.w ) ].z;
	let p = node.xy + grid * node.z;
	return floor( p / h + 1e-3 ) * h;
}

fn ${b}Morph( node: vec4f, grid: vec2f, viewPos: vec3f, y0: f32 ) -> ${x}Vertex {
	let lod = i32( node.w );
	let m = ${b}.morph[ lod ];
	let h = m.z;
	let p = node.xy + grid * node.z;
	let idx = floor( p / h + 1e-3 );
	let snapped = idx * h;
	let dist = length( viewPos - vec3f( snapped.x, y0, snapped.y ) );
	let morphK = clamp( ( dist - m.x ) * m.y, 0.0, 1.0 );
	let odd = fract( idx * 0.5 ) * 2.0;
	var o: ${x}Vertex;
	o.worldXZ = snapped - odd * h * morphK;
	o.spacing = h * ( morphK + 1.0 );
	o.morphK = morphK;
	o.lod = node.w;
	o.size = node.z;
	return o;
}
`});let w=e,E=new Float32Array((w+1)*(w+1)*3),D=0;for(let e=0;e<=w;e++)for(let t=0;t<=w;t++)E[D++]=t/w,E[D++]=0,E[D++]=e/w;let O=new Uint32Array(w*w*6);D=0;for(let e=0;e<w;e+=8)for(let t=0;t<w;t++)for(let n=e;n<Math.min(e+8,w);n++){let e=t*(w+1)+n,r=e+1,i=e+(w+1),a=i+1;(n+t)%2==0?(O[D++]=e,O[D++]=i,O[D++]=r,O[D++]=r,O[D++]=i,O[D++]=a):(O[D++]=e,O[D++]=i,O[D++]=a,O[D++]=e,O[D++]=a,O[D++]=r)}let k=new Re;k.setAttribute(`position`,new be(E,3)),k.setIndex(new be(O,1)),this.nodeArray=new Float32Array(c*4),this.nodeAttr=new ge(this.nodeArray,4),k.setAttribute(`nodeData`,this.nodeAttr),k.instanceCount=0,k.boundingSphere=new S(new t,1e7),k.boundingBox=new T(new t(-1e7,-1e7,-1e7),new t(1e7,1e7,1e7)),this.geometry=k,this.maxInstances=c,this.count=0,this._box=new T,this._frustum=new i,this._mat=new C,this._cam=new t,this.lodCounts=Array(a).fill(0)}vertexNodes(e=null,{out:t=`lod`,viewPos:n=`frame.cameraPos`}={}){let r=this.module.name;return`let ${t} = ${r}Morph( v.nodeData, v.position.xz, ${n}, ${e?`${e}( ${r}Snapped( v.nodeData, v.position.xz ) )`:`0.0`} );`}update(e){e.updateMatrixWorld(),this._mat.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(this._mat,e.coordinateSystem,e.reversedDepth),e.getWorldPosition(this._cam),this.count=0,this.lodCounts.fill(0);let t=this.levels-1,n=this.leafSize*2**t;if(this.fixedRoot){let{x:e,z:r,size:i}=this.fixedRoot,a=Math.ceil(i/n);for(let i=0;i<a;i++)for(let o=0;o<a;o++)this._select(e+o*n,r+i*n,n,t)}else{let e=Math.floor(this._cam.x/n),r=Math.floor(this._cam.z/n);for(let i=-1;i<=1;i++)for(let a=-1;a<=1;a++)this._select((e+a)*n,(r+i)*n,n,t)}let r=this.count,i=this._order||=[];i.length=r;let a=this.nodeArray,o=this._cam;for(let e=0;e<r;e++){let t=a[e*4+2],n=Math.max(a[e*4]-o.x,0,o.x-a[e*4]-t),r=Math.max(a[e*4+1]-o.z,0,o.z-a[e*4+1]-t);i[e]={d:n*n+r*r,x:a[e*4],z:a[e*4+1],s:t,l:a[e*4+3]}}i.sort((e,t)=>e.d-t.d);for(let e=0;e<r;e++){let t=i[e];a[e*4]=t.x,a[e*4+1]=t.z,a[e*4+2]=t.s,a[e*4+3]=t.l}this.geometry.instanceCount=this.count,this.nodeAttr.clearUpdateRanges(),this.nodeAttr.addUpdateRange(0,this.count*4),this.nodeAttr.needsUpdate=!0}_bounds(e,t,n){if(this.heightBounds){let[r,i]=this.heightBounds(e,t,e+n,t+n);this._box.min.set(e,r,t),this._box.max.set(e+n,i,t+n)}else this._box.min.set(e,this.minY,t),this._box.max.set(e+n,this.maxY,t+n);return this._box}_intersectsSphere(e,t){let n=this._cam,r=Math.max(e.min.x-n.x,0,n.x-e.max.x),i=Math.max(e.min.y-n.y,0,n.y-e.max.y),a=Math.max(e.min.z-n.z,0,n.z-e.max.z);return r*r+i*i+a*a<=t*t}_add(e,t,n,r){if(this.count>=this.maxInstances)return;let i=this.count*4;this.nodeArray[i]=e,this.nodeArray[i+1]=t,this.nodeArray[i+2]=n,this.nodeArray[i+3]=r,this.count++,this.lodCounts[r]++}_select(e,t,n,r){let i=this._bounds(e,t,n);if(!this._intersectsSphere(i,this.ranges[r]))return!1;if(!this._frustum.intersectsBox(i))return!0;if(r===0||!this._intersectsSphere(i,this.ranges[r-1]))return this._add(e,t,n,r),!0;let a=n*.5,o=[[e,t],[e+a,t],[e,t+a],[e+a,t+a]];for(let[e,t]of o)if(!this._select(e,t,a,r-1)){let n=this._bounds(e,t,a);this._frustum.intersectsBox(n)&&this._add(e,t,a,r)}return!0}},En=128,Dn=class{constructor(e,{enabled:t=null}={}){this.renderer=e;let n=t??(typeof location<`u`&&/(^|[?&])profile\b/.test(location.search||``));this.enabled=!!n&&N.hasTimestamp,this.nodes=new Map,this.result={compute:0,render:0,items:[]},this._t=0,this._busy=!1,this._slots=[],this.enabled&&(this.querySet=N.device.createQuerySet({type:`timestamp`,count:256}),this.resolveBuffer=N.device.createBuffer({label:`profiler resolve`,size:2048,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),this.ring=[0,1,2].map(()=>({buffer:N.device.createBuffer({label:`profiler read`,size:2048,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),busy:!1})),this._last=new Map)}track(e,t){if(!t||(this.nodes.set(e,t),!this.enabled))return;let n=this._slots.length;n>=En||(this._slots.push({name:e,node:t}),t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:n*2,endOfPassWriteIndex:n*2+1})}_record(){let e=this._slots.length;if(!e)return;let t=this.ring.find(e=>!e.busy);if(!t)return;t.busy=!0;let n=N.getEncoder();n.resolveQuerySet(this.querySet,0,e*2,this.resolveBuffer,0),n.copyBufferToBuffer(this.resolveBuffer,0,t.buffer,0,e*16);let r=this._slots.map(e=>e.name),i=this._slots.map(e=>e.node.dispatch||(e.node.handle?e.node.handle.kind===`compute`:e.node.pipeline&&/Compute/.test(e.node.pipeline.constructor.name))?`compute`:`render`);N.onSubmit(null,()=>{t.buffer.mapAsync(GPUMapMode.READ).then(()=>{let e=new BigInt64Array(t.buffer.getMappedRange().slice(0));t.buffer.unmap(),t.busy=!1;let n=[];this.debugRaw&&console.log(`raw`,Array.from(e.slice(0,r.length*2),t=>Number(t-e[0])/1e6).map(e=>e.toFixed(3)).join(` `));let a=0,o=0,s=[];for(let t=0;t<r.length;t++){let n=e[t*2],r=e[t*2+1];r>0n&&r>=n&&s.push({i:t,a:n,b:r})}s.sort((e,t)=>e.b<t.b?-1:+(e.b>t.b));let c=new Map,l=null;for(let e of s){let t=l!==null&&l>e.a?l:e.a;c.set(e.i,Number(e.b-t)/1e6),l=e.b}for(let e=0;e<r.length;e++){let t=c.get(e)||0;(t>1e3||t<0)&&(t=0),t>0?this._last.set(r[e],t):t=this._last.get(r[e])||0,n.push({name:r[e],ms:t,kind:i[e]}),i[e]===`compute`?a+=t:o+=t}n.sort((e,t)=>t.ms-e.ms),this.result={compute:a,render:o,items:n}}).catch(()=>{t.busy=!1})})}update(e){this.enabled&&(this._t+=e,this._t>.5&&(this._t=0,this._record()))}summary(e=12){return this.result.items.slice(0,e).map(e=>`${e.name} ${e.ms.toFixed(2)}`).join(` · `)}},On=6360,kn=6460,An=.00537625,jn=256,Mn=64,Nn=32,Pn=192,Fn=108,In=Math.log(1.02),L=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`};function Ln(e,t,n){return new P({label:n,width:e,height:t,format:`rgba16float`,usage:[`sample`,`storage`]})}function Rn(){return`
const ATMO_RG: f32 = ${L(On)};
const ATMO_RT: f32 = ${L(kn)};

struct AtmosphereMedium {
	rayScat: vec3f,
	mieScat: f32,
	extinction: vec3f,
	scattering: vec3f,
};

fn atmosphereMedium( hKm: f32 ) -> AtmosphereMedium {
	let rayDensity = exp( - hKm / 8.0 );
	let mieDensity = exp( - hKm / 1.2 );
	let ozoneDensity = max( 0.0, 1.0 - abs( hKm - 25.0 ) / 15.0 );
	var m: AtmosphereMedium;
	m.rayScat = vec3f( 5.802e-3, 13.558e-3, 33.1e-3 ) * rayDensity * atmosphereParams.rayleighScale;
	m.mieScat = 3.996e-3 * mieDensity * atmosphereParams.mieScale;
	let mieExt = 4.440e-3 * mieDensity * atmosphereParams.mieScale;
	let ozoneAbs = vec3f( 0.650e-3, 1.881e-3, 0.085e-3 ) * ozoneDensity * atmosphereParams.ozoneScale;
	m.extinction = m.rayScat + mieExt + ozoneAbs;
	m.scattering = m.rayScat + m.mieScat;
	return m;
}

// (r, mu) -> transmittance LUT uv
fn atmosphereTransmittanceUV( r: f32, mu: f32 ) -> vec2f {
	let H = sqrt( ATMO_RT * ATMO_RT - ATMO_RG * ATMO_RG );
	let rho = sqrt( max( r * r - ATMO_RG * ATMO_RG, 0.0 ) );
	let disc = r * r * ( mu * mu - 1.0 ) + ATMO_RT * ATMO_RT;
	let d = max( 0.0, - r * mu + sqrt( max( disc, 0.0 ) ) );
	let dMin = ATMO_RT - r;
	let dMax = rho + H;
	let xMu = ( d - dMin ) / ( dMax - dMin );
	let xR = rho / H;
	// unit -> sub-uv
	return vec2f( ( xMu + ${L(.5/jn)} ) * ${L(jn/257)}, ( xR + ${L(.5/Mn)} ) * ${L(Mn/65)} );
}

// nearest positive ray-sphere intersection from ro (km, planet centered), -1 if none
fn atmosphereRaySphereNearest( ro: vec3f, rd: vec3f, radius: f32 ) -> f32 {
	let b = dot( ro, rd );
	let c = dot( ro, ro ) - radius * radius;
	let disc = b * b - c;
	let sq = sqrt( max( disc, 0.0 ) );
	let t0 = - b - sq;
	let t1 = - b + sq;
	return select( select( select( -1.0, t1, t1 > 0.0 ), t0, t0 > 0.0 ), -1.0, disc < 0.0 );
}
`}var zn=class{constructor(e=null){this.renderer=e,this.transmittanceLUT=Ln(jn,Mn,`atmoTransmittance`),this.multiScatLUT=Ln(Nn,Nn,`atmoMultiScat`),this.skyViewLUT=Ln(Pn,Fn,`atmoSkyView`),this.params=new l(`AtmosphereParams`,{rayleighScale:[`f32`,1],mieScale:[`f32`,1],mieG:[`f32`,.8],ozoneScale:[`f32`,1],groundAlbedo:[`vec3f`,new o(.06,.08,.1)],viewHeight:[`f32`,6360.002],sunIlluminance:[`vec3f`,new o(11,11,11)],pad0:[`f32`,0],sunDir:[`vec3f`,new t(.3,.6,-.7).normalize()],pad1:[`f32`,0]},{label:`atmosphere`});let n=this.params.fields;this.rayleighScale=n.rayleighScale,this.mieScale=n.mieScale,this.mieG=n.mieG,this.ozoneScale=n.ozoneScale,this.groundAlbedo=n.groundAlbedo,this.viewHeight=n.viewHeight,this.sunIlluminance=n.sunIlluminance,this.sunDir=n.sunDir,this.irrBuffer=new ce({label:`atmoIrr`,count:4,type:`vec4f`}),this.readback=new ue({byteLength:48,label:`atmoIrrReadback`}),this.readback.onData=e=>this._onIrradiance(e),this._buildModules(),this._build(),this.needsStatic=!0,this._irrPending=!1,this._irrTimer=0,this.skyIrradiance=null,this.sunTransmittance=null,this.horizon=null,this.onIrradiance=null}_buildModules(){this.coreModule=new g({name:`atmosphereCore`,deps:[F],uniforms:this.params,uniformName:`atmosphereParams`,code:Rn()}),this.transmittanceModule=new g({name:`atmosphereTransmittance`,deps:[this.coreModule],bindings:{atmosphereTransmittanceLUT:{texture:this.transmittanceLUT}},code:`
fn atmosphereSampleTransmittance( r: f32, mu: f32 ) -> vec3f {
	return textureSampleLevel( atmosphereTransmittanceLUT, smpLinearClamp, atmosphereTransmittanceUV( r, mu ), 0.0 ).rgb;
}
// Transmittance from the viewer toward direction dir (for sun disk / sun light color).
fn atmosphereTransmittanceToSpace( dir: vec3f ) -> vec3f {
	return atmosphereSampleTransmittance( atmosphereParams.viewHeight, dir.y );
}
`}),this.multiScatModule=new g({name:`atmosphereMultiScat`,deps:[this.coreModule],bindings:{atmosphereMultiScatLUT:{texture:this.multiScatLUT}},code:`
fn atmosphereSampleMultiScat( r: f32, cosSun: f32 ) -> vec3f {
	let uv = vec2f( cosSun * 0.5 + 0.5, ( r - ATMO_RG ) / ( ATMO_RT - ATMO_RG ) );
	let suv = uv * ${L(31/Nn)} + ${L(.5/Nn)};
	return textureSampleLevel( atmosphereMultiScatLUT, smpLinearClamp, suv, 0.0 ).rgb;
}
`}),this.module=new g({name:`atmosphere`,deps:[this.transmittanceModule],bindings:{atmosphereSkyViewLUT:{texture:this.skyViewLUT}},code:`
// Sky luminance (no sun disk) for world direction dir (normalized).
fn atmosphereSkyLuminance( dir: vec3f ) -> vec3f {
	let viewH = atmosphereParams.viewHeight;
	let vHorizon = sqrt( max( viewH * viewH - ATMO_RG * ATMO_RG, 0.0 ) );
	let beta = acos( vHorizon / viewH );
	let zenithHorizonAngle = PI - beta;
	let viewZenithAngle = acos( clamp( dir.y, -1.0, 1.0 ) );

	let vCoordA = ( 1.0 - sqrt( max( 1.0 - viewZenithAngle / zenithHorizonAngle, 0.0 ) ) ) * 0.5;
	let vCoordB = sqrt( max( ( viewZenithAngle - zenithHorizonAngle ) / beta, 0.0 ) ) * 0.5 + 0.5;
	let v = select( vCoordB, vCoordA, viewZenithAngle < zenithHorizonAngle );

	// azimuth relative to sun
	let sunH = normalize( vec2f( atmosphereParams.sunDir.x, atmosphereParams.sunDir.z ) + vec2f( 1e-5, 0.0 ) );
	let dirH = normalize( vec2f( dir.x, dir.z ) + vec2f( 1e-5, 0.0 ) );
	let lightViewCos = dot( sunH, dirH );
	let u = sqrt( clamp( lightViewCos * -0.5 + 0.5, 0.0, 1.0 ) );

	let suv = vec2f( u * ${L(191/Pn)} + ${L(.5/Pn)}, v * ${L(107/Fn)} + ${L(.5/Fn)} );
	return textureSampleLevel( atmosphereSkyViewLUT, smpLinearClamp, suv, 0.0 ).rgb;
}
`})}_build(){this.transmittanceKernel=new j({label:`Atmosphere Transmittance`,modules:[this.coreModule],bindings:{outLUT:{storageTexture:this.transmittanceLUT}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let px = gid.xy;
	let uv = ( vec2f( px ) + 0.5 ) / vec2f( ${L(jn)}, ${L(Mn)} );
	let xMu = ( uv.x - ${L(.5/jn)} ) * ${L(jn/255)};
	let xR = ( uv.y - ${L(.5/Mn)} ) * ${L(Mn/63)};
	let H = sqrt( ATMO_RT * ATMO_RT - ATMO_RG * ATMO_RG );
	let rho = xR * H;
	let r = sqrt( rho * rho + ATMO_RG * ATMO_RG );
	let dMin = ATMO_RT - r;
	let dMax = rho + H;
	let d = dMin + xMu * ( dMax - dMin );
	let mu = clamp( select( ( H * H - rho * rho - d * d ) / ( 2.0 * r * d ), 1.0, d == 0.0 ), -1.0, 1.0 );

	let ro = vec3f( 0.0, r, 0.0 );
	let rd = vec3f( sqrt( max( 1.0 - mu * mu, 0.0 ) ), mu, 0.0 );
	let tMax = atmosphereRaySphereNearest( ro, rd, ATMO_RT );
	let steps = 40;
	let dt = tMax / f32( steps );
	var od = vec3f( 0.0 );
	for ( var i = 0; i < steps; i++ ) {
		let t = ( f32( i ) + 0.5 ) * dt;
		let p = ro + rd * t;
		let h = length( p ) - ATMO_RG;
		od += atmosphereMedium( h ).extinction * dt;
	}
	textureStore( outLUT, px, vec4f( exp( - od ), 1.0 ) );
}
`}),this.multiScatKernel=new j({label:`Atmosphere MultiScat`,modules:[this.transmittanceModule],bindings:{outLUT:{storageTexture:this.multiScatLUT}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let px = gid.xy;
	let uv = ( ( vec2f( px ) + 0.5 ) / ${L(Nn)} - ${L(.5/Nn)} ) * ${L(Nn/31)};
	let cosSun = uv.x * 2.0 - 1.0;
	let r = ATMO_RG + clamp( uv.y, 0.001, 0.999 ) * ( ATMO_RT - ATMO_RG );
	let sunDir = normalize( vec3f( 0.0, cosSun, - sqrt( max( 1.0 - cosSun * cosSun, 0.0 ) ) ) );
	let ro = vec3f( 0.0, r, 0.0 );

	var Lsum = vec3f( 0.0 );
	var fmsSum = vec3f( 0.0 );
	const SQ = 8;
	let isoPhase = 1.0 / ( 4.0 * PI );

	for ( var i = 0; i < SQ * SQ; i++ ) {
		let ii = ( f32( i % SQ ) + 0.5 ) / f32( SQ );
		let jj = ( f32( i / SQ ) + 0.5 ) / f32( SQ );
		let theta = ii * 2.0 * PI;
		let phi = acos( 1.0 - jj * 2.0 );
		let rd = vec3f( cos( theta ) * sin( phi ), cos( phi ), sin( theta ) * sin( phi ) );

		let tBottom = atmosphereRaySphereNearest( ro, rd, ATMO_RG );
		let tTop = atmosphereRaySphereNearest( ro, rd, ATMO_RT );
		let hitGround = tBottom > 0.0;
		let tMax = select( tTop, tBottom, hitGround );
		let steps = 20;
		let dt = tMax / f32( steps );
		var throughput = vec3f( 1.0 );
		var L = vec3f( 0.0 );
		var fms = vec3f( 0.0 );

		for ( var s = 0; s < steps; s++ ) {
			let t = ( f32( s ) + 0.3 ) * dt;
			let p = ro + rd * t;
			let pr = length( p );
			let m = atmosphereMedium( pr - ATMO_RG );
			let up = p / pr;
			let cosSunP = dot( up, sunDir );
			let Tsun = atmosphereSampleTransmittance( pr, cosSunP );
			let shadowT = atmosphereRaySphereNearest( p, sunDir, ATMO_RG );
			let earthShadow = select( 1.0, 0.0, shadowT > 0.0 );
			let S = Tsun * earthShadow * m.scattering * isoPhase;
			let Tstep = exp( - m.extinction * dt );
			let ext = max( m.extinction, vec3f( 1e-6 ) );
			L += throughput * ( S - S * Tstep ) / ext;
			fms += throughput * ( m.scattering - m.scattering * Tstep ) / ext;
			throughput *= Tstep;
		}

		if ( hitGround ) {
			let p = ro + rd * tMax;
			let up = normalize( p );
			let cosS = dot( up, sunDir );
			let Tsun = atmosphereSampleTransmittance( ATMO_RG, cosS );
			L += Tsun * throughput * max( cosS, 0.0 ) * atmosphereParams.groundAlbedo / PI;
		}

		Lsum += L * ( 4.0 * PI / f32( SQ * SQ ) );
		fmsSum += fms * ( 4.0 * PI / f32( SQ * SQ ) );
	}

	let Lin = Lsum * isoPhase;
	let fmsAvg = fmsSum * isoPhase;
	let Lms = Lin / ( vec3f( 1.0 ) - fmsAvg );
	textureStore( outLUT, px, vec4f( Lms, 1.0 ) );
}
`}),this.skyViewKernel=new j({label:`Atmosphere SkyView`,modules:[this.transmittanceModule,this.multiScatModule],bindings:{outLUT:{storageTexture:this.skyViewLUT}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let px = gid.xy;
	if ( px.x >= ${Pn}u || px.y >= ${Fn}u ) { return; }
	let uv = ( vec2f( px ) + 0.5 ) / vec2f( ${L(Pn)}, ${L(Fn)} );
	let u = ( uv.x - ${L(.5/Pn)} ) * ${L(Pn/191)};
	let v = ( uv.y - ${L(.5/Fn)} ) * ${L(Fn/107)};

	let viewH = atmosphereParams.viewHeight;
	let vHorizon = sqrt( max( viewH * viewH - ATMO_RG * ATMO_RG, 0.0 ) );
	let beta = acos( vHorizon / viewH );
	let zenithHorizonAngle = PI - beta;

	var vzA = 0.0;
	if ( v < 0.5 ) {
		var c = v * 2.0;
		c = 1.0 - c;
		c = c * c;
		c = 1.0 - c;
		vzA = zenithHorizonAngle * c;
	} else {
		var c = v * 2.0 - 1.0;
		c = c * c;
		vzA = zenithHorizonAngle + beta * c;
	}

	let cosViewZenith = cos( vzA );
	let sinViewZenith = sin( vzA );
	let cu = u * u;
	let lightViewCos = - ( cu * 2.0 - 1.0 );
	let lightViewSin = sqrt( max( 1.0 - lightViewCos * lightViewCos, 0.0 ) );

	// local frame: up = +y, sun azimuth along +x
	let sunCosZ = atmosphereParams.sunDir.y;
	let sunSinZ = sqrt( max( 1.0 - sunCosZ * sunCosZ, 0.0 ) );
	let sunDir = vec3f( sunSinZ, sunCosZ, 0.0 );
	let rd = vec3f( sinViewZenith * lightViewCos, cosViewZenith, sinViewZenith * lightViewSin );
	let ro = vec3f( 0.0, viewH, 0.0 );

	let tBottom = atmosphereRaySphereNearest( ro, rd, ATMO_RG );
	let tTop = atmosphereRaySphereNearest( ro, rd, ATMO_RT );
	let tMax = select( tTop, tBottom, tBottom > 0.0 );
	let steps = 32;
	let cosTheta = dot( rd, sunDir );
	let rayPhase = ${L(3/(16*Math.PI))} * ( cosTheta * cosTheta + 1.0 );
	let g = atmosphereParams.mieG;
	let g2 = g * g;
	// Cornette-Shanks
	let miePhase = ${L(3/(8*Math.PI))} * ( ( 1.0 - g2 ) * ( cosTheta * cosTheta + 1.0 ) )
		/ ( ( g2 + 2.0 ) * pow( max( g2 + 1.0 - g * cosTheta * 2.0, 1e-4 ), 1.5 ) );

	var throughput = vec3f( 1.0 );
	var L = vec3f( 0.0 );

	for ( var i = 0; i < steps; i++ ) {
		// quadratic step distribution
		let t0 = f32( i ) / f32( steps );
		let t1 = ( f32( i ) + 1.0 ) / f32( steps );
		let ta = t0 * t0 * tMax;
		let tb = t1 * t1 * tMax;
		let t = mix( ta, tb, 0.3 );
		let dt = tb - ta;
		let p = ro + rd * t;
		let pr = length( p );
		let m = atmosphereMedium( pr - ATMO_RG );
		let up = p / pr;
		let cosSunP = dot( up, sunDir );
		let Tsun = atmosphereSampleTransmittance( pr, cosSunP );
		let shadowT = atmosphereRaySphereNearest( p, sunDir, ATMO_RG );
		let earthShadow = select( 1.0, 0.0, shadowT > 0.0 );
		let ms = atmosphereSampleMultiScat( pr, cosSunP );
		let phaseScat = m.rayScat * rayPhase + vec3f( m.mieScat * miePhase );
		let S = Tsun * earthShadow * phaseScat + ms * m.scattering;
		let Tstep = exp( - m.extinction * dt );
		let ext = max( m.extinction, vec3f( 1e-6 ) );
		L += throughput * ( S - S * Tstep ) / ext;
		throughput *= Tstep;
	}

	textureStore( outLUT, px, vec4f( L * atmosphereParams.sunIlluminance, 1.0 ) );
}
`}),this.irradianceKernel=new j({label:`Atmosphere Irradiance`,modules:[this.module],bindings:{irr:{storage:this.irrBuffer,access:`read_write`}},workgroupSize:[1,1,1],code:`
@compute @workgroup_size( 1 )
fn main() {
	var sum = vec3f( 0.0 );
	const N = 16;
	for ( var i = 0; i < N * N; i++ ) {
		let a = ( f32( i % N ) + 0.5 ) / f32( N );
		let b = ( f32( i / N ) + 0.5 ) / f32( N );
		// cosine-weighted hemisphere
		let r = sqrt( b );
		let phi = a * 2.0 * PI;
		let dir = vec3f( r * cos( phi ), sqrt( max( 1.0 - b, 0.0 ) ), r * sin( phi ) );
		sum += atmosphereSkyLuminance( dir );
	}
	// E = PI * mean(L) for cosine-weighted samples; store E/PI (radiance-equivalent irradiance)
	irr[ 0 ] = vec4f( sum / f32( N * N ), 1.0 );
	// sun transmittance at sea level for the current sun direction
	let Ts = atmosphereSampleTransmittance( ATMO_RG + 0.001, atmosphereParams.sunDir.y );
	irr[ 1 ] = vec4f( Ts, 1.0 );
	// horizon color (average around the horizon)
	var hs = vec3f( 0.0 );
	for ( var i = 0; i < 16; i++ ) {
		let phi = f32( i ) * ( 2.0 * PI / 16.0 );
		hs += atmosphereSkyLuminance( normalize( vec3f( cos( phi ), 0.03, sin( phi ) ) ) );
	}
	irr[ 2 ] = vec4f( hs / 16.0, 1.0 );
}
`})}update(e,t){let n=Math.max(.5,t+.5),r=n<100?Math.round(n/2)*2:Math.exp(Math.round(Math.log(n)/In)*In);this.viewHeight.value=On+Math.max(.001,r/1e3);let i=!1;this.needsStatic&&(this.needsStatic=!1,i=!0,this.transmittanceKernel.dispatch([jn/8,Mn/8,1]),this.multiScatKernel.dispatch([Nn/8,Nn/8,1])),this.params._pack();let a=this.params.u32,o=this._svLast||=new Uint32Array(a.length);for(let e=0;e<a.length&&!i;e++)i=a[e]!==o[e];(i||!this._svValid)&&(o.set(a),this._svValid=!0,this.skyViewKernel.dispatch([Pn/8,Math.ceil(Fn/8),1])),this._irrTimer-=e,this._irrTimer<=0&&!this._irrPending&&(this._irrTimer=.25,this.irradianceKernel.dispatch(1),this.readback.request(this.irrBuffer)&&(this._irrPending=!0))}_onIrradiance(e){let t=new Float32Array(e);this.skyIrradiance=[t[0],t[1],t[2]],this.sunTransmittance=[t[4],t[5],t[6]],this.horizon=[t[8],t[9],t[10]],this._irrPending=!1,this.onIrradiance&&this.onIrradiance(this)}invalidate(){this.needsStatic=!0,this._svValid=!1}},Bn=160,Vn=.1,Hn=new t(.3,.2,1).normalize(),Un=.08,Wn=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},Gn=class{constructor(e){this.atmosphere=e,this.clouds=null,this.params=new l(`SkyParams`,{moonDir:[`vec3f`,new t(-.3,.5,.8).normalize()],sunDiskIntensity:[`f32`,1],starIntensity:[`f32`,0]},{label:`sky`}),this.sunDiskIntensity=this.params.fields.sunDiskIntensity,this.moonDir=this.params.fields.moonDir,this.starIntensity=this.params.fields.starIntensity,this._module=null,this._background=null}get module(){return this._module||=this._buildModule(),this._module}_buildModule(){let e=this.clouds,t=[F,this.atmosphere.module];e&&t.push(e.module);let n=t=>e?`let c = ${t}( dir );\n\treturn base * c.a + c.rgb;`:`return base;`;return new g({name:`sky`,deps:t,uniforms:this.params,uniformName:`skyParams`,code:`
// hash without sine (D. Hoskins): keeps full precision for large integer coordinates
fn skyHash13( p: vec3f ) -> f32 {
	var p3 = fract( p * vec3f( 0.1031, 0.1030, 0.0973 ) );
	p3 += dot( p3, p3.yzx + 33.33 );
	return fract( ( p3.x + p3.y ) * p3.z );
}

// Sun disk radiance along dir (already includes atmospheric transmittance).
fn skySunDisk( dir: vec3f ) -> vec3f {
	let cosA = dot( dir, atmosphereParams.sunDir ); // the real sun (frame.sunDir is the moon at night)
	let ang = acos( clamp( cosA, -1.0, 1.0 ) );
	let r = ang / ${Wn(An)};
	let mask = smoothstep( 1.0, 0.9, r );
	let mu = sqrt( max( 1.0 - r * r, 0.0 ) );
	let limb = 1.0 - 0.6 * ( 1.0 - mu );
	let T = atmosphereTransmittanceToSpace( dir );
	// physically the disk radiance is E / solid angle (~1.6e5); clamp for fp16 targets
	return T * mask * limb * 2500.0 * skyParams.sunDiskIntensity * smoothstep( -0.02, 0.0, dir.y );
}

// Stars: one candidate per cell of a cube-face grid, jittered inside it, with a power law
// magnitude distribution (few bright stars, many faint ones), denser along the Milky Way. They
// come out after civil twilight: the brightest first, the faintest once the sky is fully dark.
fn skyStars( dir: vec3f ) -> vec3f {
	// cube face coordinates
	let a = abs( dir );
	let onX = a.x > a.y && a.x > a.z;
	let onY = a.y > a.z;
	let face = select( select( sign( dir.z ) + 8.0, sign( dir.y ) + 5.0, onY ), sign( dir.x ) + 2.0, onX );
	let uv = select( select( dir.xy / a.z, dir.xz / a.y, onY ), dir.yz / a.x, onX ) * ${Wn(Bn)};
	let cell = vec3f( floor( uv ), face );
	let h = skyHash13( cell );
	let bx = dot( dir, vec3f( ${Wn(Hn.x)}, ${Wn(Hn.y)}, ${Wn(Hn.z)} ) ) * 4.0;
	let band = exp( - bx * bx );
	// the cell holds a star with probability P (higher along the Milky Way); an independent
	// uniform u ranks its brightness: N( < m ) ~ 10^( m / 2 ), brightest about magnitude -1
	let has = h < band * 0.035 + 0.025;
	let uc = max( skyHash13( cell + 7.7 ), 2e-4 );
	let m = log2( uc ) * 0.602 + 6.5;
	// limiting magnitude: -1 when the sun is 6 deg below the horizon, 6.5 below 16 deg
	let dark = 1.0 - smoothstep( -0.28, -0.1, atmosphereParams.sunDir.y );
	let vis = smoothstep( m - 0.6, m + 0.6, dark * 7.5 - 1.0 ) * select( 0.0, 1.0, has );
	// angular distance to the star (isotropic whatever the cube face distortion), in cells
	let sp = ( floor( uv ) + vec2f( skyHash13( cell + 3.1 ), skyHash13( cell + 5.7 ) ) * 0.4 + 0.3 ) / ${Wn(Bn)};
	let sdir = normalize( select( select( vec3f( sp, sign( dir.z ) ), vec3f( sp.x, sign( dir.y ), sp.y ), onY ), vec3f( sign( dir.x ), sp ), onX ) );
	let d = length( dir - sdir ) * ${Wn(Bn)};
	// flux relative to a magnitude 6.5 star; bright stars look bigger (glare), not just clipped
	let flux = pow( uc, -0.8 );
	let size = log2( flux ) * 0.08 + 1.0;
	let psf = exp( d * d / ( size * size ) * ${Wn(-.5/(Vn*Vn))} ) / ( size * size );
	// subtle scintillation, stronger low in the sky
	let tw = sin( frame.time * ( skyHash13( cell + 13.3 ) * 9.0 + 5.0 ) + h * 60.0 ) * mix( 0.18, 0.06, sat( dir.y * 2.0 ) ) + 1.0;
	let col = mix( vec3f( 1.0, 0.8, 0.6 ), vec3f( 0.75, 0.85, 1.0 ), skyHash13( cell + 17.0 ) ) * 0.5 + 0.5;
	let star = col * ( psf * flux * vis * tw * 0.0075 );
	// diffuse glow of the Milky Way
	let glow = vec3f( 0.55, 0.6, 0.75 ) * ( band * dark * 0.0035 );
	// atmospheric extinction toward the horizon
	return ( star + glow ) * skyParams.starIntensity * smoothstep( 0.0, 0.2, dir.y );
}

fn skyMoon( dir: vec3f ) -> vec3f {
	let cosA = dot( dir, skyParams.moonDir );
	let ang = acos( clamp( cosA, -1.0, 1.0 ) );
	let r = ang / 0.0048;
	let mask = smoothstep( 1.0, 0.92, r );
	return vec3f( 0.9, 0.92, 1.0 ) * mask * 3.0 * skyParams.starIntensity * smoothstep( -0.02, 0.02, dir.y );
}

// Faint blue-grey moonlit sky (a little brighter toward the horizon) and the moon's aureole.
// Physically dim: about the level of the app's night ambient light.
fn skyMoonSky( dir: vec3f ) -> vec3f {
	let cosA = dot( dir, skyParams.moonDir );
	let ang = acos( clamp( cosA, -1.0, 1.0 ) );
	let aureole = exp( ang * -14.0 ) * 2.4 + exp( ang * -2.5 ) * 0.9;
	let grad = mix( 1.7, 1.0, sat( dir.y * 3.0 ) );
	let up = smoothstep( -0.05, 0.15, skyParams.moonDir.y );
	return vec3f( 0.005, 0.0068, 0.0105 ) * ( grad + aureole ) * frame.night * up;
}

// Everything behind the clouds except the sun and moon disks. The night terms are only
// evaluated at night (uniform branch).
fn skyBackground( dir: vec3f, starK: f32 ) -> vec3f {
	var L = atmosphereSkyLuminance( dir );
	if ( skyParams.starIntensity > 0.001 ) {
		L += skyMoonSky( dir ) + skyStars( dir ) * starK;
	}
	return L;
}

// Full sky radiance for a direction (no clouds).
fn skyRadiance( dir: vec3f, withSun: bool ) -> vec3f {
	var L = skyBackground( dir, 1.0 ) + skyMoon( dir );
	if ( withSun ) { L += skySunDisk( dir ); }
	return L;
}

// Sky with clouds composited (low resolution cloud panorama). withSun = false (environment
// map): no sun or moon disk, the key light is lit directly.
fn skyRadianceWithClouds( dir: vec3f, withSun: bool ) -> vec3f {
	var base: vec3f;
	if ( withSun ) { base = skyBackground( dir, 1.0 ) + skyMoon( dir ) + skySunDisk( dir ); }
	else { base = skyBackground( dir, ${Wn(Un)} ); }
	${n(`cloudsSample`)}
}

// Water reflections: no moon disk (the water's specular lobe reflects the key light) and only a
// trace of the stars, which rough water would spread into flickering sparkles.
fn skyReflectionRadiance( dir: vec3f ) -> vec3f {
	let base = skyBackground( dir, ${Wn(Un)} );
	${n(`cloudsSample`)}
}

// Main view background: full resolution clouds for the camera's view (the sun's disc behind them
// with cloudsSunTransmittance: no sun through the cut-off remainder of thick cloud)
fn skyViewRadiance( dir: vec3f ) -> vec3f {
	let base = skyBackground( dir, 1.0 ) + skyMoon( dir );
	let sun = skySunDisk( dir );
	${e?`let c = cloudsSampleView( dir );
	return base * c.a + sun * cloudsSunTransmittance( c.a ) + c.rgb;`:`return base + sun;`}
}
`})}get background(){if(!this._background){let e=new Je({label:`sky background`,modules:[this.module],colorFormats:sn,depthFormat:cn,depthCompare:`equal`,depthWrite:!1,depth:0,code:`
struct SkyOut {
	@location( 0 ) color: vec4f,
	@location( 1 ) velocity: vec4f,
	@location( 2 ) mask: vec4f,
};
@fragment fn fs( in: FSIn ) -> SkyOut {
	let uv = in.pos.xy * frame.invResolution;
	let dir = viewRay( uv );
	var o: SkyOut;
	o.color = vec4f( skyViewRadiance( dir ), 1.0 );
	// a direction at infinity: only the camera rotation moves it
	let c = frame.viewProjNoJitter * vec4f( dir, 0.0 );
	let p = frame.prevViewProjNoJitter * vec4f( dir, 0.0 );
	let cur = c.xy / max( abs( c.w ), 1e-6 ) * sign( c.w );
	let prev = p.xy / max( abs( p.w ), 1e-6 ) * sign( p.w );
	o.velocity = vec4f( select( vec2f( 0.0 ), ( cur - prev ) * vec2f( 0.5, -0.5 ), c.w > 1e-6 && p.w > 1e-6 ), 0.0, 1.0 );
	o.mask = vec4f( 0.0 );
	return o;
}
`});this._background={pass:e,draw:t=>e.draw(t)}}return this._background}backgroundNode(){return this.background}};function Kn(e,n=24,r=6,i=new t){let a=f.degToRad(n),o=f.degToRad(r),s=f.degToRad((e-12)*15),c=-Math.cos(o)*Math.sin(s),l=Math.cos(a)*Math.sin(o)-Math.sin(a)*Math.cos(o)*Math.cos(s),u=Math.sin(a)*Math.sin(o)+Math.cos(a)*Math.cos(o)*Math.cos(s);return i.set(c,u,-l).normalize()}var qn=Math.PI,Jn=636e4,Yn=32768,Xn=512,Zn=256,Qn=16,$n=24,er=128,tr=2048,nr=.12,rr=15,ir=2500,ar=9e3,or=64,sr=1e3,cr=.48,lr=sr/4,ur=3.7,dr=lr/ur,fr=1024,pr=320,mr=256,hr=409600,gr=1024,_r=4e4,vr=256,yr=3e4,br=2.6,xr=[0,10,2,8,5,15,7,13,1,11,3,9,4,14,6,12],Sr=4,Cr=.75,R=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},wr=`
fn clMod( x: f32, y: f32 ) -> f32 { return x - y * floor( x / y ); }
fn clMod2( x: vec2f, y: vec2f ) -> vec2f { return x - y * floor( x / y ); }
fn clMod3( x: vec3f, y: f32 ) -> vec3f { return x - y * floor( x / y ); }
fn clHash3( p: vec3f ) -> f32 { return fract( sin( dot( p, vec3f( 127.1, 311.7, 74.7 ) ) ) * 43758.5453 ); }
fn clHash2( p: vec2f ) -> f32 { return fract( sin( dot( p, vec2f( 127.1, 311.7 ) ) ) * 43758.5453 ); }

// tileable 3D worley (F1) with cells cells per unit
fn clWorley3( p: vec3f, cells: f32 ) -> f32 {
	let q = p * cells;
	let ip = floor( q );
	let fp = fract( q );
	var d = 1e3;
	for ( var z = -1; z <= 1; z++ ) { for ( var y = -1; y <= 1; y++ ) { for ( var x = -1; x <= 1; x++ ) {
		let o = vec3f( f32( x ), f32( y ), f32( z ) );
		let cell = clMod3( ip + o, cells );
		let h = vec3f( clHash3( cell ), clHash3( cell + 19.7 ), clHash3( cell + 41.3 ) );
		d = min( d, length( o + h - fp ) );
	} } }
	return d;
}

// tileable 3D gradient (perlin) noise, about -1..1
fn clGrad3( i: vec3f, f: vec3f, o: vec3f, cells: f32 ) -> f32 {
	let c = clMod3( i + o, cells );
	let gv = vec3f( clHash3( c ), clHash3( c + 13.1 ), clHash3( c + 27.7 ) ) * 2.0 - 1.0;
	return dot( gv, f - o );
}
fn clGnoise( p: vec3f, cells: f32 ) -> f32 {
	let q = p * cells;
	let i = floor( q );
	let f = fract( q );
	let u = f * f * ( f * ( f * 6.0 - 15.0 ) + 10.0 ); // (sic: the original's fade, f^2 not f^3)
	let x00 = mix( clGrad3( i, f, vec3f( 0.0, 0.0, 0.0 ), cells ), clGrad3( i, f, vec3f( 1.0, 0.0, 0.0 ), cells ), u.x );
	let x10 = mix( clGrad3( i, f, vec3f( 0.0, 1.0, 0.0 ), cells ), clGrad3( i, f, vec3f( 1.0, 1.0, 0.0 ), cells ), u.x );
	let x01 = mix( clGrad3( i, f, vec3f( 0.0, 0.0, 1.0 ), cells ), clGrad3( i, f, vec3f( 1.0, 0.0, 1.0 ), cells ), u.x );
	let x11 = mix( clGrad3( i, f, vec3f( 0.0, 1.0, 1.0 ), cells ), clGrad3( i, f, vec3f( 1.0, 1.0, 1.0 ), cells ), u.x );
	return mix( mix( x00, x10, u.y ), mix( x01, x11, u.y ), u.z );
}

// billows: inverted worley fbm (1 at the feature points)
fn clBillows( p: vec3f, c: f32 ) -> f32 { return 1.0 - ( clWorley3( p, c ) * 0.625 + clWorley3( p, c * 2.0 ) * 0.25 + clWorley3( p, c * 4.0 ) * 0.125 ); }
fn clPerlinFbm( p: vec3f, c: f32 ) -> f32 { return clGnoise( p, c ) * 0.5 + clGnoise( p, c * 2.0 ) * 0.25 + clGnoise( p, c * 4.0 ) * 0.125; }

fn clVh( i: vec2f, o: vec2f, cells: vec2f ) -> f32 { return clHash2( clMod2( i + o, cells ) ); }
fn clVnoise2( p: vec2f, cells: vec2f ) -> f32 {
	let q = p * cells;
	let i = floor( q );
	let f = fract( q );
	let u = f * f * ( f * ( f * 6.0 - 15.0 ) + 10.0 ); // (sic: the original's fade, f^2 not f^3)
	return mix( mix( clVh( i, vec2f( 0.0, 0.0 ), cells ), clVh( i, vec2f( 1.0, 0.0 ), cells ), u.x ),
		mix( clVh( i, vec2f( 0.0, 1.0 ), cells ), clVh( i, vec2f( 1.0, 1.0 ), cells ), u.x ), u.y );
}

fn clGh( i: vec2f, f: vec2f, o: vec2f, cells: vec2f ) -> f32 {
	let c = clMod2( i + o, cells );
	let a = clHash2( c ) * ${R(2*qn)};
	return dot( vec2f( cos( a ), sin( a ) ), f - o );
}
fn clGnoise2( p: vec2f, cells: vec2f ) -> f32 {
	let q = p * cells;
	let i = floor( q );
	let f = fract( q );
	let u = f * f * ( f * ( f * 6.0 - 15.0 ) + 10.0 ); // (sic: the original's fade, f^2 not f^3)
	return mix( mix( clGh( i, f, vec2f( 0.0, 0.0 ), cells ), clGh( i, f, vec2f( 1.0, 0.0 ), cells ), u.x ),
		mix( clGh( i, f, vec2f( 0.0, 1.0 ), cells ), clGh( i, f, vec2f( 1.0, 1.0 ), cells ), u.x ), u.y );
}
// gradient noise fbm remapped to about 0..1 (smoother than value noise, no grid artefacts)
fn clGfbm( p: vec2f, cells: vec2f, seed: f32 ) -> f32 {
	return ( clGnoise2( p + seed, cells ) * 0.55 + clGnoise2( p + seed * 1.7, cells * 2.0 ) * 0.3 + clGnoise2( p + seed * 2.3, cells * 4.0 ) * 0.15 ) * 1.6 + 0.5;
}
`;function Tr(e){let t=Math.cos(e),n=Math.sin(e),r=e+.6;return`
const CL_EARTH_R: f32 = ${R(Jn)};
const CL_TILE: f32 = ${R(Yn)};
const CL_D_MEAN: f32 = ${R(cr)};
const CL_EDGE: f32 = ${R(rr)};
const CL_AP_DIST: f32 = ${R(yr)};
const CL_MS: f32 = ${R(br)};
// weather map lookups are rotated so cloud streets line up with the (initial) wind
const CL_C: f32 = ${R(t)};
const CL_S: f32 = ${R(n)};
// frame of the upper wind (veered from the trades)
const CL_HC: f32 = ${R(Math.cos(r))};
const CL_HS: f32 = ${R(Math.sin(r))};

// top of a cloud column (fraction of the layer) from the cell profile (0..1), the cell's top and
// the turret noise: broad rounded domes, uneven
fn clSmallTop( cs: f32, top: f32, lump: f32 ) -> f32 { return top * pow( cs, 0.42 ) * ( lump * 0.8 + 0.65 ); }
fn clBigTop( cb: f32, lump: f32 ) -> f32 { return pow( cb, 0.6 ) * ( lump * 0.35 + 0.7 ); }
fn clCreaseOf( x: f32 ) -> f32 { return smoothstep( 0.42, 0.64, x ); }
// erosion grows with the height in the cloud: flat, dense bases, billowy tops; the undersides use the
// inverted field (wisps instead of lumps)
fn clErosionAmount( b: vec4f ) -> f32 { return mix( 0.25, 1.0, smoothstep( 0.05, 0.6, b.y ) ); }
fn clErosionField( F: f32, b: vec4f ) -> f32 { return mix( 1.0 - F, F, smoothstep( 0.0, 0.08, b.y ) ); }
// erosion only eats the outer shell of the base shape (Nubis remap): the dense core keeps no holes
fn clEroded( b: vec4f, crease: f32 ) -> f32 { return sat( ( b.x - crease * clErosionAmount( b ) * sat( 1.0 - b.x * 0.9 ) - 0.012 ) * CL_EDGE ); }
// density with every detail octave at its mean (reflections, shadows, deep light samples): the same
// cloud as the detailed one, seen through a coarse filter
fn clMeanCrease( b: vec4f ) -> f32 { return clCreaseOf( clErosionField( CL_D_MEAN, b ) ); }
fn clMeanDensity( b: vec4f ) -> f32 { return clEroded( b, clMeanCrease( b ) ); }
// layer a (in-scattered radiance, transmittance) in front of layer b
fn clOver( a: vec4f, b: vec4f ) -> vec4f { return vec4f( a.rgb + b.rgb * a.a, a.a * b.a ); }
// Henyey-Greenstein phase
fn clPhaseHG( c: f32, g: f32 ) -> f32 { return ( ( 1.0 - g * g ) / ( 4.0 * PI ) ) / pow( max( 1.0 + g * g - c * 2.0 * g, 1e-4 ), 1.5 ); }

// distance along rd from a point at height camY (on the planet axis) to the sphere at altitude H
// (camera below it). Stable form: |oc|^2 - R^2 = (camY - H)(2Re + camY + H)
fn cloudsShell( camY: f32, rd: vec3f, H: f32 ) -> f32 {
	let b = rd.y * ( camY + CL_EARTH_R );
	let cc = ( camY - H ) * ( camY + H + 2.0 * CL_EARTH_R );
	let disc = b * b - cc;
	return - b + sqrt( max( disc, 0.0 ) );
}

// camera frame projection: direction -> uv (y down) of a camera given by its basis and frustum tangents
fn cloudsProject( d: vec3f, right: vec3f, up: vec3f, fwd: vec3f, tanv: vec2f ) -> vec2f {
	let z = max( dot( d, fwd ), 1e-4 );
	let ndc = vec2f( dot( d, right ), dot( d, up ) ) / ( tanv * z );
	return vec2f( ndc.x * 0.5 + 0.5, 0.5 - ndc.y * 0.5 );
}
`}function Er(e,t){return`
fn ${e}( uv: vec2f, size: vec2f ) -> vec4f {
	let sp = uv * size;
	let tp1 = floor( sp - 0.5 ) + 0.5;
	let f = sp - tp1;
	let w0 = f * ( f * ( f * -0.5 + 1.0 ) - 0.5 );
	let w1 = f * f * ( f * 1.5 - 2.5 ) + 1.0;
	let w2 = f * ( f * ( f * -1.5 + 2.0 ) + 0.5 );
	let w3 = f * f * ( f * 0.5 - 0.5 );
	let w12 = w1 + w2;
	let tc0 = ( tp1 - 1.0 ) / size;
	let tc3 = ( tp1 + 2.0 ) / size;
	let tc12 = ( tp1 + w2 / w12 ) / size;
	let a = w12.x * w0.y; let b = w0.x * w12.y; let cc = w12.x * w12.y; let d = w3.x * w12.y; let e = w12.x * w3.y;
	let sum = textureSampleLevel( ${t}, smpLinearClamp, vec2f( tc12.x, tc0.y ), 0.0 ) * a
		+ textureSampleLevel( ${t}, smpLinearClamp, vec2f( tc0.x, tc12.y ), 0.0 ) * b
		+ textureSampleLevel( ${t}, smpLinearClamp, vec2f( tc12.x, tc12.y ), 0.0 ) * cc
		+ textureSampleLevel( ${t}, smpLinearClamp, vec2f( tc3.x, tc12.y ), 0.0 ) * d
		+ textureSampleLevel( ${t}, smpLinearClamp, vec2f( tc12.x, tc3.y ), 0.0 ) * e;
	return sum / ( a + b + cc + d + e );
}
`}var Dr=class{constructor(e,n){this.renderer=e,this.atmosphere=n;let r=new p().copy(h.windDir.value).normalize().multiplyScalar(12);this.params=new l(`CloudsParams`,{coverage:[`f32`,.45],densityScale:[`f32`,.07],bottom:[`f32`,750],top:[`f32`,2400],wind:[`vec2f`,r],offset:[`vec2f`,new p],shadowCenter:[`vec2f`,new p],shadowSize:[`f32`,8e3],shadowStrength:[`f32`,.85],cirrus:[`f32`,.5],cirrusAlt:[`f32`,9e3],camY:[`f32`,1],horizonY:[`f32`,-.001],nOrigin:[`vec2f`,new p],wOrigin:[`vec2f`,new p],camXZ:[`vec2f`,new p],hOffset:[`vec2f`,new p],windN:[`vec2f`,new p(1,0)],viewSize:[`vec2f`,new p(4,4)],traceSize:[`vec2f`,new p(1,1)],displayH:[`f32`,4],viewValid:[`f32`,0],sdfCoverage:[`f32`,0],shadowPhase:[`f32`,0],panoSlot:[`vec2f`,new p],camRight:[`vec3f`,new t(1,0,0)],camUp:[`vec3f`,new t(0,1,0)],camFwd:[`vec3f`,new t(0,0,-1)],camTan:[`vec2f`,new p(1,1)],viewRight:[`vec3f`,new t(1,0,0)],viewUp:[`vec3f`,new t(0,1,0)],viewFwd:[`vec3f`,new t(0,0,-1)],viewTan:[`vec2f`,new p(1,1)]},{label:`clouds`});let i=this.params.fields;this.coverage=i.coverage,this.densityScale=i.densityScale,this.bottom=i.bottom,this.top=i.top,this.wind=i.wind,this.offset=i.offset,this.shadowCenter=i.shadowCenter,this.shadowSize=i.shadowSize,this.shadowStrength=i.shadowStrength,this.cirrus=i.cirrus,this.cirrusAlt=i.cirrusAlt,this.camY=i.camY,this.nOrigin=i.nOrigin,this.wOrigin=i.wOrigin,this.camXZ=i.camXZ,this.hOffset=i.hOffset,this.horizonY=i.horizonY,this.windN=i.windN,this.viewSize=i.viewSize,this.displayH=i.displayH,this.traceSize=i.traceSize,this.viewValid=i.viewValid,this.sdfCoverage=i.sdfCoverage,this.shadowPhase=i.shadowPhase,this.panoSlot=i.panoSlot,this.cam={right:i.camRight,up:i.camUp,fwd:i.camFwd,tan:i.camTan},this.viewCam={right:i.viewRight,up:i.viewUp,fwd:i.viewFwd,tan:i.viewTan},this.prev={right:{value:new t(1,0,0)},up:{value:new t(0,1,0)},fwd:{value:new t(0,0,-1)},tan:{value:new p(1,1)}},this.camDelta={value:new t},this.camDeltaHi={value:new t},this.historyValid={value:0},this.minAlpha={value:.12},this.rebuildK={value:-1},this.slot={value:new p},this.subPixel={value:new p},this.frameNoise={value:0};let a=this.wind.value;this._rot=Math.atan2(a.y,a.x),this._offsetW=new p,this._offsetH=new p,this._makeNoise(),this._makeTargets(),this._buildModules(),this._buildKernels(),this._generateNoise(),this.frame=0,this.panoWarm=1,this.resolutionScale=1,this.outputSize=null,this._prevCam=new t,this._prevSun=new t,this._hasPrev=!1,this._rebuild=0,this._since=0,this._traces=0,this._pp=0,this._traceIndex=0}_makeNoise(){let e=(e,t)=>new P({label:t,width:e,height:e,depth:e,dimension:`3d`,format:`rgba8unorm`,usage:[`sample`,`storage`]});this.shapeTex=e(er,`cloudShape`),this.detailTex=e(or,`cloudDetail`),this.weatherTex=new P({label:`cloudWeather`,width:Xn,height:Xn,format:`rgba8unorm`,usage:[`sample`,`storage`]}),this.synTex=new P({label:`cloudSynoptic`,width:mr,height:mr,format:`rgba8unorm`,usage:[`sample`,`storage`]}),this.fibTex=new P({label:`cloudFibres`,width:gr,height:gr,format:`rgba8unorm`,mips:!0,usage:[`sample`,`storage`,`render`]}),this.auxTex=new P({label:`cloudFibreFlow`,width:gr,height:gr,format:`rgba16float`,usage:[`sample`,`storage`]})}_generateNoise(){let e=this._noiseKernels;e.syn.dispatch([mr/8,mr/8,1]),e.aux.dispatch([gr/8,gr/8,1]),e.fib.dispatch([gr/8,gr/8,1]),oe(this.fibTex),e.shape.dispatch([er/4,er/4,er/4]),e.detail.dispatch([or/4,or/4,or/4]),e.weather.dispatch([Xn/8,Xn/8,1])}_makeTargets(){let e=(e,t,n)=>new P({label:n,width:e,height:t,format:`rgba16float`,usage:[`sample`,`storage`,`copySrc`]});this.panorama=e(fr,pr,`cloudPanorama`),this.shadowMap=e(vr,vr,`cloudShadow`);let t=e=>new P({label:e,width:Zn,height:Zn,depth:Qn,dimension:`3d`,format:`rgba8unorm`,usage:[`sample`,`storage`]});this.sdfA=t(`cloudSdfA`),this.sdfB=t(`cloudSdfB`),this.sdfTex=t(`cloudSdf`),this.traceTex=e(1,1,`cloudTrace`),this.traceDepth=e(1,1,`cloudTraceDepth`),this.highTrace=e(1,1,`cloudHighTrace`),this.motionTex=e(1,1,`cloudMotion`),this.boxMin=e(1,1,`cloudBoxMin`),this.boxMax=e(1,1,`cloudBoxMax`),this.history=[e(4,4,`cloudViewA`),e(4,4,`cloudViewB`)],this.viewTex=this.history[0],this._w=0,this._h=0}_buildModules(){let e=this.atmosphere,t=new g({name:`cloudsHelpers`,deps:[F],code:Tr(this._rot)});this.helpersModule=t,this.coreModule=new g({name:`cloudsCore`,deps:[F,e.module,t],uniforms:this.params,uniformName:`cloudsParams`,bindings:{cloudsWeatherTex:{texture:this.weatherTex},cloudsShapeTex:{texture:this.shapeTex},cloudsDetailTex:{texture:this.detailTex},cloudsSdfTex:{texture:this.sdfTex},cloudsSynTex:{texture:this.synTex},cloudsFibTex:{texture:this.fibTex}},code:`
// weather space (rotated so cloud streets follow the wind) uv of a camera relative position
fn cloudsWeatherUV( pxz: vec2f ) -> vec2f {
	return ( vec2f( pxz.x * CL_C + pxz.y * CL_S, pxz.y * CL_C - pxz.x * CL_S ) + cloudsParams.wOrigin ) / CL_TILE;
}

// x: cell profile (after the coverage control), y: top of this column (fraction of the layer).
// pxz: camera relative; big cells and towers are only allowed far from the island (origin)
fn cloudsWeather( pxz: vec2f ) -> vec2f {
	let w = textureSampleLevel( cloudsWeatherTex, smpLinearRepeat, cloudsWeatherUV( pxz ), 0.0 );
	let thr = 1.0 - cloudsParams.coverage * 1.3;
	let far = smoothstep( ${R(ir)}, ${R(ar)}, length( pxz + cloudsParams.camXZ ) );
	// cells too weak to hold more than a scrap of cloud are dropped (no scattered specks)
	let cs = sat( ( ( w.x - thr ) / max( 1.0 - thr, 0.05 ) - 0.08 ) * 1.09 );
	let cb = sat( ( ( w.w * far - thr ) / max( 1.0 - thr, 0.05 ) - 0.08 ) * 1.09 );
	return vec2f( max( cs, cb ), max( clSmallTop( cs, w.y, w.z ), clBigTop( cb, w.z ) ) );
}

// distance (m) that is certainly free of cloud around p (0 near clouds). Nearest lookup of the distance
// field: x / y repeat (the field tiles), z clamped to the layer
fn cloudsSkip( p: vec3f ) -> f32 {
	let alt = p.y + ( p.x * p.x + p.z * p.z ) / ${R(2*Jn)};
	let H = cloudsParams.top - cloudsParams.bottom;
	let uvw = vec3f( fract( cloudsWeatherUV( p.xz ) ), sat( ( alt - cloudsParams.bottom ) / H ) );
	let ix = vec3i( min( vec3f( floor( uvw * vec3f( ${R(Zn)}, ${R(Zn)}, ${R(Qn)} ) ) ), vec3f( ${R(255)}, ${R(255)}, ${R(15)} ) ) );
	let d = textureLoad( cloudsSdfTex, ix, 0 ).x * 255.0;
	return max( d - 1.0, 0.0 ) * min( H / ${R(Qn)}, ${R(Yn/Zn)} );
}

// base shape. p: camera relative (sheared) position, w: weather
// returns vec4( raw shape value, height inside the cloud 0..1, swirl xy ); density = ramp( x )
fn cloudsBase( p: vec3f, w: vec2f ) -> vec4f {
	let alt = p.y + ( p.x * p.x + p.z * p.z ) / ${R(2*Jn)};
	let hL = ( alt - cloudsParams.bottom ) / ( cloudsParams.top - cloudsParams.bottom );
	let np = p.xz + cloudsParams.nOrigin;
	let n = textureSampleLevel( cloudsShapeTex, smpLinearRepeat, vec3f( np.x, alt * 1.4, np.y ) / ${R(tr)}, 0.0 );
	// flat, slightly uneven base, the column's (domed) top, edges from the cell profile (steep,
	// so the shape noise can't break fragments off the rim)
	let hb = n.y * 0.025;
	// columns whose top stays very low hold no cloud: the saddles between overlapping weak cells
	// along a street made long, thin, flat ribbons, and the thin rims of each dome made it a flat
	// pancake. Without them the cells stay separate and their sides rise steeply.
	let Ce = sat( ( w.y - hL ) * 3.5 ) * smoothstep( 0.0, 0.45, w.x ) * smoothstep( hb, hb + 0.012, hL ) * smoothstep( 0.1, 0.2, w.y );
	// the shape noise carves the boundary. x is the raw shape value (density before the ramp,
	// negative outside): the detail erodes it in the same units, and the coarse search uses it
	// to slow down near a cloud
	return vec4f( n.x + Ce - 1.0, sat( hL / max( w.y, 0.05 ) ), n.y, n.z );
}

// three detail octaves per fetch; s: size (m) of the coarsest features
fn cloudsOctaves( uvw: vec3f, s: f32, foot: f32 ) -> f32 {
	let d = textureSampleLevel( cloudsDetailTex, smpLinearRepeat, uvw, 0.0 ).xyz;
	let w = vec3f( smoothstep( s * 0.24, s * 0.09, foot ), smoothstep( s * 0.12, s * 0.045, foot ), smoothstep( s * 0.06, s * 0.0225, foot ) );
	return dot( mix( vec3f( CL_D_MEAN ), d, w ), vec3f( 0.56, 0.32, 0.12 ) );
}

// full density with detail erosion. b: result of cloudsBase, foot: pixel footprint (m) that filters the
// octaves. Returns vec2( density, lump ) (1 on a lump, 0 in a crease: shades the crevices)
fn cloudsErode( p: vec3f, b: vec4f, foot: f32 ) -> vec2f {
	let alt = p.y + ( p.x * p.x + p.z * p.z ) / ${R(2*Jn)};
	let np = p.xz + cloudsParams.nOrigin;
	// low frequency swirl of the detail lookup
	let sw = ( b.zw - 0.5 ) * ( 0.3 * ( 1.0 - b.y * 0.6 ) );
	let dp = vec3f( np.x, alt, np.y ) / ${R(sr)} + vec3f( sw.x, 0.0, sw.y ) + vec3f( frame.time * 0.0015, 0.0, 0.0 );
	var f1 = CL_D_MEAN;
	var f2 = CL_D_MEAN;
	if ( foot < ${R(lr*.24)} ) {
		f1 = cloudsOctaves( dp, ${R(lr)}, foot );
		// close range: a finer fetch (lumps down to ~3 m) keeps near clouds crisp
		if ( foot < ${R(dr*.24)} ) {
			f2 = cloudsOctaves( dp * ${R(ur)} + 0.37, ${R(dr)}, foot );
		}
	}
	let crease = clCreaseOf( clErosionField( f1 * 0.78 + f2 * 0.22, b ) );
	// the creases are eaten: round lumps (cauliflower) on the upper parts, wisps underneath
	return vec2f( clEroded( b, crease ), 1.0 - crease );
}

// the cloud field leans downwind with height (wind shear)
fn cloudsSheared( p: vec3f ) -> vec3f {
	let lean = max( p.y - cloudsParams.bottom, 0.0 ) * ${R(nr)};
	return vec3f( p.x - cloudsParams.windN.x * lean, p.y, p.z - cloudsParams.windN.y * lean );
}

// Key light of the clouds: the sun while it is the app's key light (seen from cloud altitude,
// so it keeps lighting the clouds a little after it has set at sea level), else the moon.
// E: illuminance before the earth shadow.
struct CloudsLight { dir: vec3f, E: vec3f, isMoon: bool };
fn cloudsKeyLight( altKm: f32 ) -> CloudsLight {
	var l: CloudsLight;
	l.isMoon = dot( frame.sunDir, atmosphereParams.sunDir ) < 0.9999;
	let sunE = atmosphereSampleTransmittance( 6360.0 + altKm, frame.sunDir.y ) * atmosphereParams.sunIlluminance;
	l.dir = frame.sunDir;
	l.E = select( sunE, frame.sunColor, l.isMoon );
	return l;
}

// earth shadow on a point at altitude alt (m) and horizontal offset pxz (m) from the camera: the
// light is below its horizon once mu < -sqrt( 2 alt / R ) (the local vertical tilts with distance)
fn cloudsEarthShadow( light: CloudsLight, alt: f32, pxz: vec2f ) -> f32 {
	let mu = light.dir.y + dot( light.dir.xz, pxz ) / CL_EARTH_R;
	let lit = smoothstep( -0.006, 0.006, mu + sqrt( max( alt, 0.0 ) * ${R(2/Jn)} ) );
	return select( lit, 1.0, light.isMoon );
}

// cubic B-spline filtered texture lookup in 4 bilinear taps (GPU Gems 2, ch. 20): magnified cirrus fibres
// stay smooth instead of showing the bilinear texel grid (res: texels at mip 0)
fn cloudsBspline( uv: vec2f, lod: f32 ) -> vec4f {
	let size = ${R(gr)} / exp2( lod );
	let st = uv * size - 0.5;
	let i = floor( st );
	let fr = st - i;
	let f2 = fr * fr; let f3 = f2 * fr;
	let w0 = ( - f3 + f2 * 3.0 - fr * 3.0 + 1.0 ) / 6.0;
	let w1 = ( f3 * 3.0 - f2 * 6.0 + 4.0 ) / 6.0;
	let w3 = f3 / 6.0;
	let w2 = 1.0 - w0 - w1 - w3;
	let g0 = w0 + w1; let g1 = w2 + w3;
	let p0 = ( i - 0.5 + w1 / g0 ) / size; let p1 = ( i + 1.5 + w3 / g1 ) / size;
	return textureSampleLevel( cloudsFibTex, smpLinearRepeat, vec2f( p0.x, p0.y ), lod ) * ( g0.x * g0.y )
		+ textureSampleLevel( cloudsFibTex, smpLinearRepeat, vec2f( p1.x, p0.y ), lod ) * ( g1.x * g0.y )
		+ textureSampleLevel( cloudsFibTex, smpLinearRepeat, vec2f( p0.x, p1.y ), lod ) * ( g0.x * g1.y )
		+ textureSampleLevel( cloudsFibTex, smpLinearRepeat, vec2f( p1.x, p1.y ), lod ) * ( g1.x * g1.y );
}

fn cloudsToWind( v: vec2f ) -> vec2f { return vec2f( v.x * CL_HC + v.y * CL_HS, v.y * CL_HC - v.x * CL_HS ); }

// anisotropic filtering: n taps along the long axis of the footprint at the mip of its short axis
fn cloudsFibres( q: vec2f, fA: vec2f, fB: vec2f, tile: f32, rot: f32 ) -> vec4f {
	let cr = cos( rot ); let sr = sin( rot );
	let wq = cloudsToWind( q ); let wa = cloudsToWind( fA ); let wb = cloudsToWind( fB );
	let uv = vec2f( wq.x * cr + wq.y * sr, wq.y * cr - wq.x * sr ) / tile;
	let a = vec2f( wa.x * cr + wa.y * sr, wa.y * cr - wa.x * sr ) / tile;
	let b = vec2f( wb.x * cr + wb.y * sr, wb.y * cr - wb.x * sr ) / tile;
	let la = length( a ) * ${R(gr)}; let lb = length( b ) * ${R(gr)};
	let major = select( b, a, la > lb );
	const n = 3;
	let lod = max( log2( max( min( la, lb ), max( la, lb ) / f32( n ) ) ), 0.0 );
	var sum = vec4f( 0.0 );
	for ( var i = 0; i < n; i++ ) {
		sum += cloudsBspline( uv + major * ( ( f32( i ) + 0.5 ) / f32( n ) - 0.5 ), lod );
	}
	return sum / f32( n );
}

// Cirrus veil seen along rd: vec4( radiance, transmittance ). A thin sheet on a curved-earth
// shell, so its fibres converge toward the horizon in true perspective. Its coverage varies
// only over hundreds of km (clearer and thicker parts of the sky, no outlines); long, gently
// curved fibres follow the upper wind and give a low contrast texture. The fibre texture is
// filtered anisotropically with the footprint of one pixel (pxAngle, radians), which turns
// distant fibres into a smooth veil. Lighting: single scattering by ice crystals (strong
// forward peak: bright near the sun, a faint 22 degree halo) plus multiple scattering and sky
// light; lit by the sun from below its horizon for a while after sunset.
fn cloudsHigh( rd: vec3f, pxAngle: f32 ) -> vec4f {
	let H = cloudsParams.cirrusAlt;
	let light = cloudsKeyLight( 9.0 );
	let sunDir = light.dir;
	let cosT = dot( rd, sunDir );

	// geometry: hit point, local incidence, pixel footprint on the sheet (across the view and
	// along it, stretched by 1 / mu)
	let t = cloudsShell( cloudsParams.camY, rd, H );
	let pxz = rd.xz * t;
	let up = normalize( vec3f( pxz.x / CL_EARTH_R, 1.0, pxz.y / CL_EARTH_R ) );
	let mu = max( dot( rd, up ), 0.02 );
	let radial = normalize( rd.xz + vec2f( 1e-6, 0.0 ) );
	let fA = vec2f( - radial.y, radial.x ) * ( t * pxAngle );
	let fB = radial * ( t * pxAngle / mu );
	let q = pxz + cloudsParams.camXZ - cloudsParams.hOffset;

	// coverage: patches of 5 - 50 km with clear gaps, modulated over hundreds of km, broad bands
	let syn = textureSampleLevel( cloudsSynTex, smpLinearRepeat, cloudsToWind( q ) * ${R(1/hr)}, 0.0 );
	let cov = smoothstep( 0.15, 0.85, syn.x ) * smoothstep( 0.4, 0.72, syn.z ) * ( syn.y * 0.4 + 0.6 );
	// fibres at two scales (hides the tiling of the texture)
	let f1 = cloudsFibres( q, fA, fB, ${R(_r)}, 0.0 );
	let f2 = cloudsFibres( q, fA, fB, ${R(_r*2.3)}, 0.5 );
	let fib = f1.x * 0.6 + f2.x * 0.4;
	let veil = f1.y * 0.5 + f2.y * 0.5;
	// vertical optical depth: faint wisps (opacity mostly 0.05 - 0.2 at the default amount) over
	// a thinner veil
	let amount = cloudsParams.cirrus * ( cloudsParams.coverage * 0.5 + 0.78 );
	let tau = amount * 0.4 * cov * ( fib * 0.75 + 0.25 ) * ( veil * 0.4 + 0.8 );
	// slant path, bounded so the veil doesn't turn into a white band at the horizon
	let alpha = 1.0 - exp( - tau / max( mu, 0.25 ) );

	// lighting: the key light at the sheet (sunset colours depend on the altitude)
	let muS = dot( sunDir, up );
	let E = select( atmosphereSampleTransmittance( 6360.0 + H / 1000.0, muS ) * atmosphereParams.sunIlluminance, light.E, light.isMoon )
		* cloudsEarthShadow( light, H, pxz );
	// ice: strong forward peak, a faint 22 degree halo, some backscatter; thin: mostly single
	// scattering, a little multiply scattered light
	let hd = ( acos( clamp( cosT, -1.0, 1.0 ) ) - 0.384 ) / 0.02;
	let halo = exp( - hd * hd ) * 0.04;
	let phase = clPhaseHG( cosT, 0.85 ) * 0.4 + clPhaseHG( cosT, 0.3 ) * 0.35 + clPhaseHG( cosT, -0.15 ) * 0.25 + halo;
	let Ts = exp( tau * -0.5 / max( muS, 0.1 ) );
	let L = ( E * ( phase * Ts + ( 1.0 - Ts ) * 0.06 ) + frame.skyIrradiance * 0.9 ) * alpha;
	// aerial perspective: haze in front of the sheet shows sky light where the sheet hides it
	let tr = exp( t * ${R(-.25/yr)} );
	let skyL = atmosphereSkyLuminance( rd );
	return vec4f( L * tr + skyL * alpha * ( 1.0 - tr ), 1.0 - alpha );
}

// Samples lie on a lattice along the ray, shared by all rays and jittered per frame: steps of
// ds in distance bands ( [0, 5), [5, 10), [10, 20), [20, 40), 40+ km, ds doubling), fine points
// every ds, coarse points every coarse fine points. Jumps over empty space snap onto it, so
// neighbouring pixels always sample the clouds at consistent positions (arbitrary landing
// points after a jump would average into contour lines)
const CL_B0: f32 = 2500.0;
fn cloudsBand( t: f32 ) -> f32 { return clamp( floor( log2( max( t, CL_B0 ) / CL_B0 ) ), 0.0, 4.0 ); }
fn cloudsBandStart( b: f32 ) -> f32 { return select( exp2( b ) * CL_B0, 0.0, b == 0.0 ); }
fn cloudsPosMod( x: f32, c: f32 ) -> f32 { return x - floor( x / c ) * c; }

struct CloudsMarch { L: vec3f, T: f32, depth: f32 };
${Or(`View`,{maxSteps:200,maxDist:5e4,ds0:24,dsMax:120,coarse:4,lightSteps:[12,50,140,350,900,1800],lightDetail:3,detail:!0,ambient:1.2,pxAngle:`cloudsParams.camTan.y * 2.0 / cloudsParams.displayH`})}
${Or(`Pano`,{maxSteps:56,maxDist:5e4,ds0:60,dsMax:320,coarse:2,lightSteps:[120,500],lightDetail:0,detail:!1,ambient:1.2,pxAngle:R(2*qn/fr)})}
`}),this.shadowModule=new g({name:`cloudsShadow`,deps:[F],uniforms:this.params,uniformName:`cloudsParams`,bindings:{cloudsShadowMap:{texture:this.shadowMap}},code:`
// cloud shadow transmittance (1 = clear) at a world position. Manual bilinear filtering of an
// unfilterable texture: costs no sampler in the (sampler hungry) scene materials.
fn cloudsShadowTap( i: vec2i ) -> f32 { return textureLoad( cloudsShadowMap, clamp( i, vec2i( 0 ), vec2i( 255 ) ), 0 ).x; }
fn cloudsShadow( worldXZ: vec2f ) -> f32 {
	if ( frame.atmosphereQuality <= 0.0 ) { return 1.0; }
	let uv = ( worldXZ - cloudsParams.shadowCenter ) / cloudsParams.shadowSize + 0.5;
	let st = uv * ${R(vr)} - 0.5;
	let i0 = vec2i( floor( st ) );
	let fr = fract( st );
	let s = mix( mix( cloudsShadowTap( i0 ), cloudsShadowTap( i0 + vec2i( 1, 0 ) ), fr.x ), mix( cloudsShadowTap( i0 + vec2i( 0, 1 ) ), cloudsShadowTap( i0 + vec2i( 1, 1 ) ), fr.x ), fr.y );
	// no data outside the map: fade to unshadowed at its border
	let e = abs( uv - 0.5 );
	let inside = smoothstep( 0.5, 0.42, max( e.x, e.y ) );
	return mix( 1.0, s, cloudsParams.shadowStrength * inside );
}
`}),this.module=new g({name:`clouds`,deps:[F,t,this.shadowModule],uniforms:this.params,uniformName:`cloudsParams`,bindings:{cloudsPanorama:{texture:this.panorama},cloudsView:{texture:()=>this.viewTex}},code:`
${Er(`cloudsViewCatmullRom`,`cloudsView`)}

// vec4(rgb in-scattered radiance, a transmittance) for a view direction (panorama)
fn cloudsSample( dir: vec3f ) -> vec4f {
	if ( frame.atmosphereQuality <= 0.0 ) { return vec4f( 0.0, 0.0, 0.0, 1.0 ); }
	let az = atan2( dir.z, dir.x );
	let u = fract( az / ${R(2*qn)} );
	let elev = - acos( clamp( dir.y, -1.0, 1.0 ) ) + ${R(qn/2)};
	let t = clamp( ( elev + ${R(4/180*qn)} ) / ${R(94/180*qn)}, 0.0, 1.0 );
	let v = sqrt( t );
	let s = textureSampleLevel( cloudsPanorama, smpLinearRepeat, vec2f( u, v ), 0.0 );
	// below the panorama range: no clouds
	let below = smoothstep( -0.07, -0.03, dir.y );
	return vec4f( s.rgb * below, mix( 1.0, s.a, below ) );
}

// Full resolution clouds for the main background. The view texture is looked up with the camera
// it was traced with (it can lag behind: underwater frames skip the tracing); directions outside
// it, or a texture without data yet (startup, resize), fall back to the panorama, so the sky can
// never show empty texels
// Transmittance for the sun's disc behind the clouds. The cloud march stops once less than 0.3 % of
// the light gets through and reports that remainder, which (noisy from frame to frame) let a
// clamped sun disc of 2500x the sky shine and sparkle through thick cloud: below ~0.4 % it is dark.
fn cloudsSunTransmittance( T: f32 ) -> f32 { return T * smoothstep( 0.004, 0.04, T ); }

fn cloudsSampleView( dir: vec3f ) -> vec4f {
	if ( frame.atmosphereQuality <= 0.0 ) { return vec4f( 0.0, 0.0, 0.0, 1.0 ); }
	let uv = cloudsProject( dir, cloudsParams.viewRight, cloudsParams.viewUp, cloudsParams.viewFwd, cloudsParams.viewTan );
	let inside = cloudsParams.viewValid > 0.5 && dot( dir, cloudsParams.viewFwd ) > 0.01 && uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0;
	if ( inside ) {
		// bicubic (Catmull-Rom) upsampling of the half resolution history keeps the edges crisp
		let v = max( cloudsViewCatmullRom( uv, cloudsParams.viewSize ), vec4f( 0.0 ) );
		let above = smoothstep( -0.05, -0.03, dir.y );
		return vec4f( v.rgb * above, mix( 1.0, min( v.a, 1.0 ), above ) );
	}
	return cloudsSample( dir );
}

`})}_buildKernels(){let e=new g({name:`cloudsNoise`,deps:[F],code:wr}),t=this.helpersModule,n=(e,t,n,r,i=[8,8,1])=>new j({label:e,modules:t,bindings:n,code:r,workgroupSize:i}),r=`@compute @workgroup_size( WG_X, WG_Y, WG_Z ) fn main( @builtin( global_invocation_id ) gid: vec3u )`;this._noiseKernels={shape:n(`Cloud Shape Noise`,[e],{outTex:{storageTexture:this.shapeTex}},`${r} {
	let p = ( vec3f( gid ) + 0.5 ) / ${R(er)};
	let b = clBillows( p, 4.0 );
	let pn = clPerlinFbm( p, 4.0 ) * 0.9 + 0.5;
	// perlin-worley: remap( perlin, 0, 1, worley, 1 ) keeps the billows, breaks their regularity
	let pw = b + sat( pn ) * ( 1.0 - b ) * 0.5;
	let base = sat( ( pw - 0.42 ) / 0.5 );
	let cx = clGnoise( p + 0.31, 4.0 ) * 0.7 + 0.5;
	let cz = clGnoise( p + 0.67, 4.0 ) * 0.7 + 0.5;
	textureStore( outTex, gid, vec4f( base, sat( cx ), sat( cz ), 1.0 ) );
}`,[4,4,4]),detail:n(`Cloud Detail Noise`,[e],{outTex:{storageTexture:this.detailTex}},`
fn fbmW( p: vec3f, c: f32 ) -> f32 { return clWorley3( p, c ) * 0.625 + clWorley3( p, c * 2.0 ) * 0.25 + clWorley3( p, c * 4.0 ) * 0.125; }
${r} {
	let p = ( vec3f( gid ) + 0.5 ) / ${R(or)};
	textureStore( outTex, gid, vec4f( sat( fbmW( p, 4.0 ) ), sat( fbmW( p, 8.0 ) ), sat( fbmW( p, 16.0 ) ), 1.0 ) );
}`,[4,4,4]),weather:n(`Cloud Weather`,[e],{outTex:{storageTexture:this.weatherTex}},`
// cells of varying size: max over cells of a blob that fades out at its random radius,
// cells switch on where the mesoscale field allows. returns vec2( blob, its size )
fn blobs( p: vec2f, cells: vec2f, meso: f32, seed: f32 ) -> vec2f {
	let q = p * cells;
	let ip = floor( q );
	let fp = fract( q );
	var b = vec2f( 0.0 );
	for ( var y = -1; y <= 1; y++ ) { for ( var x = -1; x <= 1; x++ ) {
		let o = vec2f( f32( x ), f32( y ) );
		let cell = clMod2( ip + o, cells ) + seed;
		let hx = clHash2( cell ); let hy = clHash2( cell + 19.7 ); let hr = clHash2( cell + 41.3 ); let hp = clHash2( cell + 7.1 );
		let d = length( o + vec2f( hx, hy ) * 0.6 + 0.2 - fp );
		// radii 0.34 - 0.74 cells (was up to 0.9): neighbours in a row no longer fuse into one long ridge,
		// which from underneath read as a stretched, smeared tube
		let rad = hr * hr * 0.4 + 0.34;
		let on = smoothstep( hp - 0.15, hp + 0.15, meso + 0.12 );
		let v = sat( 1.0 - d / rad ) * on;
		if ( v > b.x ) { b = vec2f( v, hr ); }
	} }
	return b;
}
${r} {
	let p = ( vec2f( gid.xy ) + 0.5 ) / ${R(Xn)};
	let meso = clVnoise2( p, vec2f( 4.0 ) ) * 0.6 + clVnoise2( p, vec2f( 8.0 ) ) * 0.3 + clVnoise2( p, vec2f( 16.0 ) ) * 0.1;
	// low frequency warp: irregular footprints, wavy streets
	let pw = p + ( vec2f( clVnoise2( p, vec2f( 24.0 ) ), clVnoise2( p + 0.37, vec2f( 24.0 ) ) ) - 0.5 ) * 0.03;
	// cloud streets along the wind (x), about 3 km apart
	let street = sin( pw.y * ${R(2*qn*11)} + clVnoise2( p, vec2f( 3.0 ) ) * 6.0 ) * 0.5 + 0.5;
	// fair weather cumulus: cells of 0.5 - 2 km, mostly along the streets
	// (loosely: a street seen end-on from under it lines its cells up into one long tube)
	let small = blobs( pw, vec2f( 15.0, 19.0 ), meso * 0.7 + street * 0.22 - 0.16, 0.0 );
	// big cells and towers (used far from the island only)
	let big = blobs( pw, vec2f( 6.0, 8.0 ), meso - 0.1, 3.7 );
	// turrets: several bumps per cell
	let lump = clVnoise2( pw, vec2f( 80.0 ) ) * 0.65 + clVnoise2( pw + 0.5, vec2f( 160.0 ) ) * 0.35;
	// top of the small cells (fraction of the layer): bigger cells grow taller
	let top = ( small.y * 0.35 + 0.4 ) * ( clVnoise2( p, vec2f( 12.0 ) ) * 0.5 + 0.75 );
	textureStore( outTex, gid.xy, vec4f( small.x, sat( top ), lump, big.x ) );
}`),syn:n(`Cloud Synoptic Fields`,[e],{outTex:{storageTexture:this.synTex}},`${r} {
	let p = ( vec2f( gid.xy ) + 0.5 ) / ${R(mr)};
	let cov = clGfbm( p, vec2f( 2.0, 3.0 ), 0.31 );
	let streets = clGfbm( p, vec2f( 4.0, 14.0 ), 0.59 );
	let patches = clGfbm( p, vec2f( 10.0, 14.0 ), 0.83 ) * 0.7 + clGfbm( p, vec2f( 28.0, 40.0 ), 0.21 ) * 0.3;
	textureStore( outTex, gid.xy, clamp( vec4f( cov, streets, patches, 1.0 ), vec4f( 0.0 ), vec4f( 1.0 ) ) );
}`),aux:n(`Cloud Fibre Flow`,[e],{outTex:{storageTexture:this.auxTex}},`
fn psi( q: vec2f ) -> f32 { return clGnoise2( q, vec2f( 3.0 ) ) * 0.5 + clGnoise2( q + 0.37, vec2f( 7.0 ) ) * 0.25 + clGnoise2( q + 0.71, vec2f( 15.0 ) ) * 0.1; }
// sparse jittered points: n cells per texture, probability, radius (cells), seed
fn points( p: vec2f, cluster: f32, n: f32, prob: f32, sigma: f32, seed: f32 ) -> f32 {
	let q = p * n;
	let ip = floor( q );
	let fp = fract( q );
	var v = 0.0;
	for ( var y = -1; y <= 1; y++ ) { for ( var x = -1; x <= 1; x++ ) {
		let o = vec2f( f32( x ), f32( y ) );
		let c = clMod2( ip + o, vec2f( n ) ) + seed;
		let pos = o + vec2f( clHash2( c ), clHash2( c + 19.7 ) ) * 0.8 + 0.1;
		let on = select( 0.0, 1.0, clHash2( c + 41.3 ) < cluster * prob );
		let d = pos - fp;
		v = max( v, exp( dot( d, d ) * ( -0.5 / ( sigma * sigma ) ) ) * on * ( clHash2( c + 7.1 ) * 0.7 + 0.3 ) );
	} }
	return v;
}
${r} {
	let p = ( vec2f( gid.xy ) + 0.5 ) / ${R(gr)};
	let e = ${R(1/gr)};
	let curl = vec2f( psi( p + vec2f( 0.0, e ) ) - psi( p - vec2f( 0.0, e ) ), psi( p - vec2f( e, 0.0 ) ) - psi( p + vec2f( e, 0.0 ) ) ) / ( 2.0 * e );
	let dir = normalize( vec2f( 1.0, 0.0 ) + vec2f( 0.0, clGnoise2( p + 0.13, vec2f( 3.0 ) ) * 0.5 ) + curl * 0.05 );
	let cluster = sat( clGfbm( p, vec2f( 5.0 ), 0.9 ) * 1.6 - 0.3 );
	let seeds = max( points( p, cluster, 110.0, 0.3, 0.18, 0.0 ), points( p, cluster, 44.0, 0.3, 0.18, 3.3 ) * 0.8 );
	// tufts (heads of hooked filaments) and, just downwind of them, a sideways sag of the flow
	let tuft = points( p, cluster, 40.0, 0.4, 0.1, 6.1 );
	let droop = points( p, cluster, 40.0, 0.4, 0.3, 6.1 );
	textureStore( outTex, gid.xy, vec4f( seeds, atan2( dir.y, dir.x ), tuft, droop ) );
}`),fib:n(`Cloud Fibres`,[e],{auxTex:{texture:this.auxTex},outTex:{storageTexture:this.fibTex}},`${r} {
	const LIC_STEPS = 44;
	let LIC_STEP = ${R(1/gr)};
	let p = ( vec2f( gid.xy ) + 0.5 ) / ${R(gr)};
	var x1 = p; var x2 = p;
	var fib = 0.0;
	var head = 0.0;
	for ( var i = 0; i < LIC_STEPS; i++ ) {
		let k = f32( i );
		let a = textureSampleLevel( auxTex, smpLinearRepeat, x1, 0.0 );
		fib += a.x * sin( ( k + 0.5 ) * ${R(qn/44)} );
		x1 -= vec2f( cos( a.y ), sin( a.y ) ) * LIC_STEP;
		// hooked tails: from the tuft downwind, sagging sideways
		let b = textureSampleLevel( auxTex, smpLinearRepeat, x2, 0.0 );
		head += b.z * exp( k * ${R(-1/12)} );
		x2 -= normalize( vec2f( cos( b.y ), sin( b.y ) + b.w * 1.2 ) ) * LIC_STEP;
	}
	let breakup = sat( clGfbm( p, vec2f( 24.0 ), 0.71 ) * 1.6 - 0.25 );
	let wisps = ( 1.0 - exp( fib * -0.8 ) ) * breakup;
	let hooks = 1.0 - exp( head * -0.5 );
	let veil = clGfbm( p, vec2f( 4.0 ), 0.33 );
	textureStore( outTex, gid.xy, vec4f( sat( max( wisps, hooks ) ), sat( veil ), 0.0, 1.0 ) );
}`)};let i=this.params,a=new g({name:`cloudsSdfParams`,deps:[F,t],uniforms:i,uniformName:`cloudsParams`,code:``});this.sdfOccKernel=n(`Cloud SDF Occupancy`,[a],{weatherTex:{texture:this.weatherTex},outTex:{storageTexture:this.sdfA}},`${r} {
	let ix = i32( gid.x ); let iy = i32( gid.y );
	let h0 = f32( gid.z ) / ${R(Qn)};
	let thr = 1.0 - cloudsParams.sdfCoverage * 1.3;
	// conservative: maxima of every weather quantity around the cell (they are interpolated
	// separately), big cells assumed allowed
	var mx = vec4f( 0.0 );
	for ( var y = -1; y <= 2; y++ ) { for ( var x = -1; x <= 2; x++ ) {
		let wc = vec2i( ( ix * 2 + x + ${Xn} ) % ${Xn}, ( iy * 2 + y + ${Xn} ) % ${Xn} );
		mx = max( mx, textureLoad( weatherTex, wc, 0 ) );
	} }
	let cs = sat( ( mx.x - thr ) / max( 1.0 - thr, 0.05 ) );
	let cb = sat( ( mx.w - thr ) / max( 1.0 - thr, 0.05 ) );
	let occ = max( select( -1.0, clSmallTop( cs, mx.y, mx.z ), cs > 0.0 ), select( -1.0, clBigTop( cb, mx.z ), cb > 0.0 ) ) - h0;
	textureStore( outTex, gid, vec4f( select( 1.0, 0.0, occ > 0.0 ), 0.0, 0.0, 1.0 ) );
}`),this.sdfXKernel=n(`Cloud SDF X`,[F],{src:{texture:this.sdfA},outTex:{storageTexture:this.sdfB}},`${r} {
	let ix = i32( gid.x ); let iy = i32( gid.y ); let iz = i32( gid.z );
	var d = ${R(25)};
	for ( var k = -24; k <= ${$n}; k++ ) {
		if ( textureLoad( src, vec3i( ( ix + k + ${Zn} ) % ${Zn}, iy, iz ), 0 ).x * 255.0 < 0.5 ) {
			d = min( d, f32( abs( k ) ) );
		}
	}
	textureStore( outTex, gid, vec4f( d / 255.0, 0.0, 0.0, 1.0 ) );
}`),this.sdfYKernel=n(`Cloud SDF Y`,[F],{src:{texture:this.sdfB},outTex:{storageTexture:this.sdfA}},`${r} {
	let ix = i32( gid.x ); let iy = i32( gid.y ); let iz = i32( gid.z );
	var d = ${R(25)};
	for ( var k = -24; k <= ${$n}; k++ ) {
		d = min( d, max( textureLoad( src, vec3i( ix, ( iy + k + ${Zn} ) % ${Zn}, iz ), 0 ).x * 255.0, f32( abs( k ) ) ) );
	}
	textureStore( outTex, gid, vec4f( d / 255.0, 0.0, 0.0, 1.0 ) );
}`),this.sdfZKernel=n(`Cloud SDF Z`,[F],{src:{texture:this.sdfA},outTex:{storageTexture:this.sdfTex}},`${r} {
	let ix = i32( gid.x ); let iy = i32( gid.y ); let iz = i32( gid.z );
	var d = ${R(25)};
	for ( var k = -15; k <= 15; k++ ) {
		let z = iz + k;
		if ( z >= 0 && z < ${Qn} ) {
			d = min( d, max( textureLoad( src, vec3i( ix, iy, z ), 0 ).x * 255.0, f32( abs( k ) ) ) );
		}
	}
	textureStore( outTex, gid, vec4f( d / 255.0, 0.0, 0.0, 1.0 ) );
}`),this._traceSets=[];for(let e=0;e<Sr;e++)this._traceSet(e);let o=e=>`
// per pixel random offset (white noise: subsampled every 4 pixels, structured noise such as
// interleaved gradient noise would alias into a visible grid) for the golden ratio sequence
fn pixelHash( px: vec2f ) -> f32 {
	var p3 = fract( vec3f( px.x, px.y, px.x ) * vec3f( 0.1031, 0.1030, 0.0973 ) );
	p3 += dot( p3, p3.yzx + 33.33 );
	return fract( ( p3.x + p3.y ) * p3.z );
}
${r} {
	${e?`let px = gid.xy;`:`let px = gid.xy * vec2u( 8u, 4u ) + vec2u( cloudsParams.panoSlot );`}
	if ( px.x >= ${fr}u || px.y >= ${pr}u ) { return; }
	let uv = ( vec2f( px ) + 0.5 ) / vec2f( ${R(fr)}, ${R(pr)} );
	let az = uv.x * ${R(2*qn)};
	let elev = uv.y * uv.y * ${R(94/180*qn)} - ${R(4/180*qn)};
	let rd = vec3f( cos( elev ) * cos( az ), sin( elev ), cos( elev ) * sin( az ) );
	let jitter = pixelHash( vec2f( px ) );
	let m = cloudsMarchPano( rd, jitter );
	// panorama texel: 2 pi / PANO_W across; the elevation mapping is similar near the horizon
	let hi = cloudsHigh( rd, ${R(2*qn/fr)} );
	textureStore( outTex, px, clOver( vec4f( m.L, m.T ), hi ) );
}`;this.panoKernel=n(`Clouds Panorama`,[this.coreModule],{outTex:{storageTexture:this.panorama}},o(!1)),this.panoFullKernel=n(`Clouds Panorama (full)`,[this.coreModule],{outTex:{storageTexture:this.panorama}},o(!0)),this.shadowKernel=n(`Cloud Shadow`,[this.coreModule],{outTex:{storageTexture:this.shadowMap}},`${r} {
	let px = vec2u( gid.x, gid.y * 4u + u32( cloudsParams.shadowPhase ) );
	let uv = ( vec2f( px ) + 0.5 ) / ${R(vr)};
	// camera relative ground position
	let gxz = cloudsParams.shadowCenter + ( uv - 0.5 ) * cloudsParams.shadowSize - cloudsParams.camXZ;
	let sunDir = frame.sunDir;
	let mu = max( sunDir.y, 0.08 );
	let tb = cloudsParams.bottom / mu;
	let tt = cloudsParams.top / mu;
	var od = 0.0;
	let steps = max( 1, i32( ceil( 8.0 * frame.atmosphereQuality ) ) );
	for ( var k = 0; k < steps; k++ ) {
		let t = mix( tb, tt, ( f32( k ) + 0.5 ) / f32( steps ) );
		let p = cloudsSheared( vec3f( gxz.x, 0.0, gxz.y ) + sunDir * t );
		od += clMeanDensity( cloudsBase( p, cloudsWeather( p.xz ) ) );
	}
	let T = exp( od * cloudsParams.densityScale * ( ( tt - tb ) / f32( steps ) ) * -0.5 );
	textureStore( outTex, px, vec4f( T, 0.0, 0.0, 1.0 ) );
}`)}_traceSet(e){if(this._traceSets[e])return this._traceSets[e];let n=new l(`CloudsTrace`,{slot:[`vec2f`,new p],subPixel:[`vec2f`,new p],prevRight:[`vec3f`,new t],frameNoise:[`f32`,0],prevUp:[`vec3f`,new t],rebuildK:[`f32`,-1],prevFwd:[`vec3f`,new t],minAlpha:[`f32`,.12],prevTan:[`vec2f`,new p(1,1)],historyValid:[`f32`,0],pad:[`f32`,0],camDelta:[`vec3f`,new t],camDeltaHi:[`vec3f`,new t]},{label:`cloudsTrace`+e}),r=new g({name:`cloudsTrace`+e,deps:[this.coreModule],uniforms:n,uniformName:`cloudsTrace`,code:`
fn cloudsViewDir( uv: vec2f ) -> vec3f {
	let ndc = vec2f( uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0 ) * cloudsParams.camTan;
	return normalize( cloudsParams.camFwd + cloudsParams.camRight * ndc.x + cloudsParams.camUp * ndc.y );
}
// interleaved gradient noise (Jimenez 2014)
fn cloudsIGN( px: vec2f ) -> f32 { return fract( fract( dot( px, vec2f( 0.06711056, 0.00583715 ) ) ) * 52.9829189 ); }
fn cloudsTracedPixel( tp: vec2u ) -> vec2f { return vec2f( tp * 4u + vec2u( cloudsTrace.slot ) ) + 0.5 + cloudsTrace.subPixel; }
fn cloudsOutside( tp: vec2u ) -> bool { return tp.x >= u32( cloudsParams.traceSize.x ) || tp.y >= u32( cloudsParams.traceSize.y ); }
`}),i=(e,t,n)=>new j({label:e,modules:[r],bindings:t,code:n,workgroupSize:[8,8,1]}),a=`@compute @workgroup_size( WG_X, WG_Y, WG_Z ) fn main( @builtin( global_invocation_id ) gid: vec3u )`,o=i(`Clouds Trace`,{traceOut:{storageTexture:this.traceTex},depthOut:{storageTexture:this.traceDepth}},`${a} {
	let tp = gid.xy;
	if ( cloudsOutside( tp ) ) { return; }
	let px = cloudsTracedPixel( tp );
	let rd = cloudsViewDir( px / cloudsParams.viewSize );
	// well distributed in space (interleaved gradient noise on the grid of traced pixels) and over
	// the traces of each pixel (per cycle offset): the residual noise is high frequency, easy to average
	let jitter = fract( cloudsIGN( vec2f( tp ) ) + cloudsTrace.frameNoise );
	let m = cloudsMarchView( rd, jitter );
	textureStore( traceOut, tp, vec4f( m.L, m.T ) );
	// depth + opacity of the cumulus: the resolve reprojects either the cumulus or the high layers
	textureStore( depthOut, tp, vec4f( m.depth, 1.0 - m.T, 0.0, 1.0 ) );
}`),s=i(`Clouds High Trace`,{traceDepth:{texture:this.traceDepth},highOut:{storageTexture:this.highTrace},motionOut:{storageTexture:this.motionTex}},`${a} {
	let tp = gid.xy;
	if ( cloudsOutside( tp ) ) { return; }
	let px = cloudsTracedPixel( tp );
	let rd = cloudsViewDir( px / cloudsParams.viewSize );
	var hi = vec4f( 0.0, 0.0, 0.0, 1.0 );
	if ( rd.y > -0.01 ) {
		hi = cloudsHigh( rd, cloudsParams.camTan.y * 2.0 / cloudsParams.viewSize.y );
	}
	textureStore( highOut, tp, hi );

	// motion for the resolve: the closest cumulus sample around this block (like the closest
	// depth dilation of TAA), so the edges of a cloud move with it and foreground wins
	var best = vec3f( 1e9, 0.0, 0.0 ); // depth key, depth, opacity
	let tmax = vec2i( cloudsParams.traceSize ) - 1;
	for ( var y = -1; y <= 1; y++ ) { for ( var x = -1; x <= 1; x++ ) {
		let dz = textureLoad( traceDepth, clamp( vec2i( tp ) + vec2i( x, y ), vec2i( 0 ), tmax ), 0 );
		let key = select( 1e9, dz.x, dz.y > 0.15 );
		if ( key < best.x ) { best = vec3f( key, dz.xy ); }
	} }
	if ( best.x > 1e8 ) {
		best = vec3f( 0.0, textureLoad( traceDepth, vec2i( tp ), 0 ).xy );
	}
	textureStore( motionOut, tp, vec4f( best.yz, 0.0, 1.0 ) );
}`),c=i(`Clouds Box`,{traceTex:{texture:this.traceTex},highTrace:{texture:this.highTrace},minOut:{storageTexture:this.boxMin},maxOut:{storageTexture:this.boxMax}},`${a} {
	let tp = vec2i( gid.xy );
	if ( cloudsOutside( gid.xy ) ) { return; }
	let tmax = vec2i( cloudsParams.traceSize ) - 1;
	var lo = vec4f( 1e4 ); var hi = vec4f( -1e4 );
	for ( var y = -1; y <= 1; y++ ) { for ( var x = -1; x <= 1; x++ ) {
		let q = clamp( tp + vec2i( x, y ), vec2i( 0 ), tmax );
		let c = clOver( textureLoad( traceTex, q, 0 ), textureLoad( highTrace, q, 0 ) );
		lo = min( lo, c );
		hi = max( hi, c );
	} }
	textureStore( minOut, tp, lo );
	textureStore( maxOut, tp, hi );
}`),u=(e,t)=>i(`Clouds Resolve`,{motionTex:{texture:this.motionTex},traceTex:{texture:this.traceTex},highTrace:{texture:this.highTrace},boxMin:{texture:this.boxMin},boxMax:{texture:this.boxMax},srcHistory:{texture:e},dstHistory:{storageTexture:t}},`
${Er(`historyCatmullRom`,`srcHistory`)}
// this frame's samples upsampled (they sit at the slot of each block)
fn upsampled( p: vec2u ) -> vec4f {
	let suv = ( ( vec2f( p ) - cloudsTrace.slot ) / 4.0 + 0.5 ) / cloudsParams.traceSize;
	return clOver( textureSampleLevel( traceTex, smpLinearClamp, suv, 0.0 ), textureSampleLevel( highTrace, smpLinearClamp, suv, 0.0 ) );
}
fn b2( a: f32, b: f32 ) -> f32 { return abs( a - b ) * 2.0 + b; }
${a} {
	let p = gid.xy;
	if ( p.x >= u32( cloudsParams.viewSize.x ) || p.y >= u32( cloudsParams.viewSize.y ) ) { return; }
	let uv = ( vec2f( p ) + 0.5 ) / cloudsParams.viewSize;
	let rd = cloudsViewDir( uv );
	if ( rd.y < -0.06 ) { return; }

	let tp = p / 4u;
	let fresh = ( p.x % 4u ) == u32( cloudsTrace.slot.x ) && ( p.y % 4u ) == u32( cloudsTrace.slot.y );
	let dz = textureLoad( motionTex, vec2i( tp ), 0 );
	// where was this cloud point last frame (camera motion and wind drift): cumulus, or the high
	// layers where there is no cumulus in front
	let T = cloudsTrace;
	let pdC = normalize( rd * dz.x + T.camDelta );
	let pdH = normalize( rd * cloudsShell( cloudsParams.camY, rd, cloudsParams.cirrusAlt ) + T.camDeltaHi );
	let pd = select( pdH, pdC, dz.y > 0.3 );
	let puv = mix( cloudsProject( pdH, T.prevRight, T.prevUp, T.prevFwd, T.prevTan ), cloudsProject( pdC, T.prevRight, T.prevUp, T.prevFwd, T.prevTan ), smoothstep( 0.1, 0.5, dz.y ) );
	let valid = T.historyValid > 0.5 && dot( pd, T.prevFwd ) > 0.01 && puv.x > 0.0 && puv.x < 1.0 && puv.y > 0.0 && puv.y < 1.0 && pd.y > -0.05;
	var out = vec4f( 0.0, 0.0, 0.0, 1.0 );
	if ( rd.y > -0.035 ) {
		if ( valid ) {
			// reprojected history, clamped to the range of this frame's samples around it (with a
			// margin): real changes (lighting, motion the reprojection missed) can't leave ghosts,
			// so the samples can be averaged over many frames, which removes the noise
			let h = max( historyCatmullRom( puv, cloudsParams.viewSize ), vec4f( 0.0 ) );
			let lo = textureLoad( boxMin, vec2i( tp ), 0 ); let hi = textureLoad( boxMax, vec2i( tp ), 0 );
			let pad = ( hi - lo ) * 0.25 + 0.01;
			out = select( h, clamp( h, lo - pad, hi + pad ), T.rebuildK < 0.0 );
		} else {
			out = upsampled( p );
		}

		if ( fresh ) {
			let cu = textureLoad( traceTex, vec2i( tp ), 0 );
			let hl = textureLoad( highTrace, vec2i( tp ), 0 );
			let cur = clOver( cu, hl );
			// average the jittered samples over time (removes the ray march noise); a little
			// shorter where the clouds move fast on screen (the history is resampled every frame)
			let hist = out;
			let motion = length( ( puv - uv ) * cloudsParams.viewSize );
			let a0 = T.minAlpha;
			let a = clamp( motion * 0.1 + a0, a0, 0.35 );
			// rebuilding after a camera cut: each pixel takes its own first sample as is
			out = select( cur, mix( hist, cur, a ), valid && T.rebuildK < 0.0 );
		} else if ( T.rebuildK >= 0.0 && valid ) {
			// rebuilding: pixels without a sample of their own since the cut average the upsampled
			// samples of every slot traced so far (their refresh rank is the 4x4 Bayer index)
			let x = f32( p.x % 4u ); let y = f32( p.y % 4u );
			let rank = b2( x % 2.0, y % 2.0 ) * 4.0 + b2( floor( x / 2.0 ), floor( y / 2.0 ) );
			if ( rank > T.rebuildK ) {
				out = mix( out, upsampled( p ), 1.0 / ( T.rebuildK + 1.0 ) );
			}
		}
	}

	textureStore( dstHistory, p, vec4f( out.rgb, clamp( out.a, 0.0, 1.0 ) ) );
}`),d={block:n,trace:o,high:s,box:c,resolve:[u(this.history[1],this.history[0]),u(this.history[0],this.history[1])]};return this._traceSets[e]=d,d}_resize(e,t){this._w=e,this._h=t,this._scale=this.resolutionScale;let n=Math.max(4,Math.round(e*this._scale*Cr)),r=Math.max(4,Math.round(t*this._scale*Cr));this.displayH.value=Math.max(4,t*this._scale);let i=Math.ceil(n/4),a=Math.ceil(r/4);this.viewSize.value.set(n,r),this.traceSize.value.set(i,a);for(let e of[this.traceTex,this.traceDepth,this.highTrace,this.boxMin,this.boxMax,this.motionTex])e.resize(i,a);this.history[0].resize(n,r),this.history[1].resize(n,r),this.viewValid.value=0,this.resetHistory()}_drawingBufferSize(){if(this.outputSize)return this.outputSize;let e=this.renderer;return e&&e.getDrawingBufferSize?e.getDrawingBufferSize(this._size||=new p):e&&e.width&&e.height?{x:e.width,y:e.height}:N.canvas?{x:N.canvas.width,y:N.canvas.height}:b.fields.outputResolution.value}update(e,t){if(h.atmosphereQuality.value<=0)return;this._traceIndex=0;let n=this.wind.value,r=Math.cos(this._rot),i=Math.sin(this._rot),a=this.offset.value;a.addScaledVector(n,e),a.set((a.x%Yn+Yn)%Yn,(a.y%Yn+Yn)%Yn);let o=this._offsetW;o.x+=(n.x*r+n.y*i)*e,o.y+=(n.y*r-n.x*i)*e,o.set((o.x%Yn+Yn)%Yn,(o.y%Yn+Yn)%Yn);let s=this._offsetH;s.addScaledVector(n,e*1.6),s.set((s.x%Yn+Yn)%Yn,(s.y%Yn+Yn)%Yn),t.updateMatrixWorld();let c=t.position;this.camY.value=f.clamp(c.y,1,this.bottom.value-50),n.lengthSq()>1e-6&&this.windN.value.copy(n).normalize(),this.horizonY.value=-Math.sqrt(2*this.camY.value/Jn),this.nOrigin.value.set(c.x-a.x,c.z-a.y),this.wOrigin.value.set(c.x*r+c.z*i-o.x,c.z*r-c.x*i-o.y);let l=this.coverage.value;(l>this.sdfCoverage.value||l<this.sdfCoverage.value-.1)&&(this.sdfCoverage.value=Math.min(l+.04,1),this._buildSDF());let u=this._drawingBufferSize();(u.x!==this._w||u.y!==this._h||this.resolutionScale!==this._scale)&&this._resize(u.x,u.y);let d=t.matrixWorld.elements,p=Math.tan(f.degToRad(t.fov*.5))/(t.zoom||1),m=this.cam,g=this.prev;g.right.value.copy(m.right.value),g.up.value.copy(m.up.value),g.fwd.value.copy(m.fwd.value),g.tan.value.copy(m.tan.value),m.right.value.set(d[0],d[1],d[2]).normalize(),m.up.value.set(d[4],d[5],d[6]).normalize(),m.fwd.value.set(-d[8],-d[9],-d[10]).normalize(),m.tan.value.set(p*t.aspect,p);let _=this._hasPrev?c.distanceTo(this._prevCam):1/0,v=m.fwd.value.angleTo(g.fwd.value);this._turned=v;let y=h.sunDir.value;(_>8||v>.5||y.angleTo(this._prevSun)>.05||Math.abs(m.tan.value.y-g.tan.value.y)>.001*m.tan.value.y)&&this.resetHistory(),this._prevSun.copy(y),this.camDelta.value.set(c.x-this._prevCam.x-n.x*e,c.y-this._prevCam.y,c.z-this._prevCam.z-n.y*e),this.camDeltaHi.value.set(c.x-this._prevCam.x-n.x*e*1.6,c.y-this._prevCam.y,c.z-this._prevCam.z-n.y*e*1.6),this._prevCam.copy(c),this._hasPrev=!0,this.shadowPhase.value=this.frame%4,this.frame%4==0&&this.shadowCenter.value.set(c.x,c.z),this.camXZ.value.set(c.x,c.z),this.hOffset.value.copy(s),this.panoWarm>0&&(this.panoFullKernel.dispatch([fr/8,pr/8,1]),this.panoWarm=0),this._panoSlot(this.frame);let b=()=>{this.shadowKernel.dispatch([vr/8,vr/32,1]),this.panoKernel.dispatch([fr/64,pr/32,1])};if(h.cameraUnderwater.value>.5)b(),this.resetHistory();else if(this._rebuild<16){for(let e=0;e<Sr&&this._rebuild<16;e++)e>0&&this._holdCamera(),this.rebuildK.value=this._rebuild,this._trace(xr[this._rebuild++]);b()}else{let e=1+Math.floor(this._since++/16);this.minAlpha.value=Math.max(.12,1/(e+1)),this.rebuildK.value=-1,this._trace(xr[this.frame%16]),b(),this._turned>.003&&(this._holdCamera(),this._trace(xr[(this.frame+8)%16]))}this.frame++}_trace(e){this.slot.value.set(e%4,Math.floor(e/4));let t=Math.floor(this._traces/16)+1;this.subPixel.value.set((.5+t*.7548776662)%1-.5,(.5+t*.569840291)%1-.5).multiplyScalar(.25),this.frameNoise.value=t*.6180339887%1,this._traces++;let n=this._traceSet(this._traceIndex++),r=n.block.fields,i=this.prev;r.slot.value.copy(this.slot.value),r.subPixel.value.copy(this.subPixel.value),r.frameNoise.value=this.frameNoise.value,r.rebuildK.value=this.rebuildK.value,r.minAlpha.value=this.minAlpha.value,r.historyValid.value=this.historyValid.value,r.prevRight.value.copy(i.right.value),r.prevUp.value.copy(i.up.value),r.prevFwd.value.copy(i.fwd.value),r.prevTan.value.copy(i.tan.value),r.camDelta.value.copy(this.camDelta.value),r.camDeltaHi.value.copy(this.camDeltaHi.value);let a=[Math.ceil(this.traceSize.value.x/8),Math.ceil(this.traceSize.value.y/8),1];n.trace.dispatch(a),n.high.dispatch(a),n.box.dispatch(a),n.resolve[this._pp].dispatch([Math.ceil(this.viewSize.value.x/8),Math.ceil(this.viewSize.value.y/8),1]),this.viewTex=this.history[this._pp],this._pp=1-this._pp,this.historyValid.value=1;let o=this.cam,s=this.viewCam;s.right.value.copy(o.right.value),s.up.value.copy(o.up.value),s.fwd.value.copy(o.fwd.value),s.tan.value.copy(o.tan.value),this.viewValid.value=1}_holdCamera(){let e=this.cam,t=this.prev;t.right.value.copy(e.right.value),t.up.value.copy(e.up.value),t.fwd.value.copy(e.fwd.value),t.tan.value.copy(e.tan.value),this.camDelta.value.set(0,0,0),this.camDeltaHi.value.set(0,0,0)}resetHistory(){this._rebuild=0,this._since=0,this.historyValid.value=0}_panoSlot(e){let t=xr[e%16];this.panoSlot.value.set(t%4*2+Math.floor(e/16)%2,Math.floor(t/4))}_buildSDF(){let e=[Zn/8,Zn/8,Qn];for(let t of[this.sdfOccKernel,this.sdfXKernel,this.sdfYKernel,this.sdfZKernel])t.dispatch(e)}invalidate(){this.panoWarm=1,this.resetHistory()}};function Or(e,t){let n=`min( exp2( b ) * ${R(t.ds0)}, ${R(t.dsMax)} )`,r=``,i=0;for(let e=0;e<t.lightSteps.length;e++){let n=t.lightSteps[e],a=n-i;i=n,r+=`\t\t\t\t{\n\t\t\t\t\tlet lp = cloudsSheared( pr + sunDir * ( lj * ${R(n-a*.5)} ) );\n`,e<t.lightDetail?r+=`\t\t\t\t\tlet lb = cloudsBase( lp, w );
					if ( T > 0.5 ) {
						// filtered at the size of the light segment
						od += cloudsErode( lp, lb, max( foot, ${R(a*.35)} ) ).x * ${R(a)};
					} else {
						od += clMeanDensity( lb ) * ${R(a)};
					}\n`:r+=`\t\t\t\t\tlet lb = cloudsBase( lp, cloudsWeather( lp.xz ) );\n\t\t\t\t\tod += clMeanDensity( lb ) * ${R(a)};\n`,r+=`				}
`}return`
fn cloudsBandStep${e}( b: f32 ) -> f32 { return ( ${n} ) / ${e===`Pano`?`max( frame.atmosphereQuality, 0.05 )`:`1.0`}; }
fn cloudsSnapCoarse${e}( t: f32, up: bool, jitter: f32, k0: f32 ) -> f32 {
	let b = cloudsBand( t ); let s0 = cloudsBandStart( b ); let ds = cloudsBandStep${e}( b );
	let i = ( t - s0 ) / ds - jitter;
	let m = select( floor( i + 1e-3 ), ceil( i - 1e-3 ), up );
	let mc = select( m - cloudsPosMod( m - k0, ${R(t.coarse)} ), m + cloudsPosMod( k0 - m, ${R(t.coarse)} ), up );
	return s0 + ( mc + jitter ) * ds;
}
fn cloudsMarch${e}( rd: vec3f, jitter: f32 ) -> CloudsMarch {
	let camY = cloudsParams.camY;
	let light = cloudsKeyLight( ( cloudsParams.bottom + cloudsParams.top ) * 0.0005 );
	let sunDir = light.dir;
	let pxAngle = ${t.pxAngle};
	let t0 = max( cloudsShell( camY, rd, cloudsParams.bottom ), 0.0 );
	let t1 = min( cloudsShell( camY, rd, cloudsParams.top ), ${R(t.maxDist)} );
	var L = vec3f( 0.0 );
	var T = 1.0;
	var opac = 0.0;
	var tAcc = 0.0;
	var wAcc = 0.0;
	let k0 = floor( fract( jitter * 7.31 + 0.37 ) * ${R(t.coarse)} ); // coarse phase

	let cosT = dot( rd, sunDir );
	// multiple scattering octaves (Hillaire 2016): scattering a^i, extinction b^i, eccentricity c^i
	// (sky-pro-webgpu) normalized droplet phase: 80% forward / 20% back; each order halves the asymmetry
	let phase = vec3f( clPhaseHG( cosT, 0.8 ), clPhaseHG( cosT, 0.4 ), clPhaseHG( cosT, 0.2 ) ) * 0.8
		+ vec3f( clPhaseHG( cosT, -0.2 ), clPhaseHG( cosT, -0.1 ), clPhaseHG( cosT, -0.05 ) ) * 0.2;
	let ph3 = ${R(.15/(4*qn))}; // light diffused through the whole cloud (keeps thick bodies from going black)
	let sunE = light.E;
	let amb = frame.skyIrradiance * ${R(t.ambient)};
	// in-scatter probability (Schneider 2015 'powder', Nubis 2017): light scattered toward the viewer
	// builds up inside the cloud, so thin edges and the underside look darker; faded out looking
	// toward the sun, where the forward peak makes the thin edges glow (silver lining)
	let powderK = sat( cosT * -0.5 + 0.6 );
	// warm light bounced by the sunlit sea onto the undersides (at low sun the sunlight is warm)
	let bounce = frame.sunColor * ( max( sunDir.y, 0.0 ) * 0.01 + 0.003 );

	var t = cloudsSnapCoarse${e}( t0, true, jitter, k0 );
	var bd = cloudsBand( t );
	// Nubis stepping: coarse steps with the cheap density until something is hit, then step
	// back and walk through it with fine, fully detailed samples
	var fineSteps = 0;

	if ( rd.y > cloudsParams.horizonY && t1 > t0 ) {
		for ( var it = 0; it < max( 1, i32( ceil( f32( ${t.maxSteps} ) * select( frame.atmosphereQuality, 1.0, ${e==`Pano`?`false`:`true`} ) ) ) ); it++ ) {
			if ( t > t1 || T < 0.015 ) { break; }

			// entering the next distance band: onto its lattice
			if ( cloudsBand( t ) != bd ) {
				bd = cloudsBand( t );
				if ( fineSteps == 0 ) {
					t = cloudsSnapCoarse${e}( t, true, jitter, k0 );
				} else {
					let s0 = cloudsBandStart( bd ); let d0 = cloudsBandStep${e}( bd );
					t = s0 + ( ceil( ( t - s0 ) / d0 - jitter - 1e-3 ) + jitter ) * d0;
				}
			}

			let pr = vec3f( rd.x * t, camY + rd.y * t, rd.z * t );
			let p = cloudsSheared( pr );
			let ds = cloudsBandStep${e}( bd );

			if ( fineSteps == 0 ) {
				let sk = cloudsSkip( p );
				// the shear can move the sample up to 12% more than the ray
				let jump = sk * 0.89;
				if ( jump > ds * ${R(t.coarse)} ) {
					// far from any cloud: jump, landing on the coarse lattice (at least one stride on)
					t = max( cloudsSnapCoarse${e}( t + jump, false, jitter, k0 ), t + ds * ${R(t.coarse)} );
					bd = cloudsBand( t );
				} else {
					let b = cloudsBase( p, cloudsWeather( p.xz ) );
					// switch to fine steps a little before the surface so thin wisps aren't skipped
					if ( b.x > -0.08 ) {
						t -= ds * ${R(t.coarse-1)};
						fineSteps = 5;
					} else {
						t += ds * ${R(t.coarse)};
					}
				}
			} else {
				let w = cloudsWeather( p.xz );
				let b = cloudsBase( p, w );
				fineSteps -= 1;

				if ( b.x > 0.002 ) {
					fineSteps = 3;
					// detail level from the pixel footprint (m): the close range octave (lumps of ~13 - 51 m)
					// fades out beyond ~3 km, the erosion (~47 - 190 m) beyond ~24 km, so nothing smaller
					// than about two pixels is ever sampled (that would only alias into grain)
					let foot = t * pxAngle;
					var er = vec2f( clMeanDensity( b ), 1.0 - clMeanCrease( b ) );
					// detail erosion (every octave under 2 px: the mean erosion above)
${t.detail?`\t\t\t\t\tif ( foot < ${R(lr*.24)} ) { er = cloudsErode( p, b, foot ); }`:``}
					let dens = er.x;

					if ( dens > 0.002 ) {
						// light march toward the sun: near samples share the weather and keep the
						// detail, far ones only see the base shape
						var od = 0.0;
						// jittered along the light ray: its sampling pattern turns into noise the
						// temporal filter removes, instead of streaks across the cloud
						let lj = fract( jitter + 0.5 ) * 0.3 + 0.85;
${r}
						let sig = dens * cloudsParams.densityScale;
						// light optical depth (the local segment included); multiple scattering lowers the
						// effective extinction of the light
						let tau = ( od + dens * 6.0 ) * cloudsParams.densityScale;
						// single scattering (dual-lobe HG) through the true optical depth, one multiple
						// scattering octave (Wrenninge 2013: extinction and eccentricity lowered), and the
						// diffusion regime of a thick, non-absorbing cloud: diffuse light is transmitted
						// ~ 1 / (1 + 0.75 (1 - g) tau), so a sunlit surface reflects like a bright diffuser and
						// the shaded side stays grey, not black (the octave sum alone was ~4x too dark)
						// multiply scattered light builds up with height in the cloud (Nubis 'vertical
						// probability'): the lower parts are darker
						let msV = mix( 0.35, 1.0, smoothstep( 0.0, 0.45, b.y ) );
						let sun = phase.x * exp( -tau ) + ( phase.y * 0.6 * exp( tau * -0.3 )
							+ phase.z * ( CL_MS / pow2( 1.0 + 0.1 * tau ) ) + ph3 * exp( tau * -0.03 ) ) * msV;
						// skylight occlusion: two broad upward probes (125 m, 600 m) of the filtered density
						let pu1 = cloudsSheared( pr + vec3f( 0.0, 125.0, 0.0 ) ); let pu2 = cloudsSheared( pr + vec3f( 0.0, 600.0, 0.0 ) );
						let skyTau = ( clMeanDensity( cloudsBase( pu1, w ) ) * 250.0 + clMeanDensity( cloudsBase( pu2, cloudsWeather( pu2.xz ) ) ) * 700.0
							+ dens * 25.0 ) * cloudsParams.densityScale;
						let skyVis = 0.3 + 0.7 / ( skyTau * 0.35 + 1.0 );
						// darker bases (their direct light is scattered away by the cloud above)
						let baseShadow = mix( 0.55, 1.0, smoothstep( -0.1, 0.45, b.y ) );
						let depthP = pow( dens, mix( 0.5, 1.6, b.y ) ) * 0.95 + 0.05;
						let vertP = pow( smoothstep( 0.02, 0.2, b.y ), 0.8 ) * 0.85 + 0.15;
						let powder = mix( 1.0, depthP * vertP, powderK );
						// ambient: the sky lights the tops; the bases only see the dark sea and the
						// horizon (darker, bluer), and crevices of the detail noise are occluded
						let up = sat( b.y * 1.4 );
						let ambH = mix( vec3f( 0.45, 0.5, 0.58 ), vec3f( 1.0 ), sqrt( up ) ) * skyVis * ( er.y * 0.75 + 0.42 );
						// after sunset the tops stay lit longest
						let alt = pr.y + dot( pr.xz, pr.xz ) / ${R(2*Jn)};
						let S = sunE * ( sun * powder * baseShadow * ( er.y * 0.5 + 0.5 ) * cloudsEarthShadow( light, alt, pr.xz ) ) + amb * ambH
							+ bounce * ( 1.0 - up );
						let Tstep = exp( - sig * ds );
						let tap = exp( t * ${R(-1/yr)} );
						let dT = T * ( 1.0 - Tstep );
						L += S * dT * tap;
						opac += dT * tap;
						tAcc += t * dT;
						wAcc += dT;
						T *= Tstep;
					}
				}

				t += ds;
				if ( fineSteps == 0 ) {
					t = cloudsSnapCoarse${e}( t, true, jitter, k0 );
				}
			}
		}
	}

	var m: CloudsMarch;
	m.depth = select( t0 + 4000.0, tAcc / max( wAcc, 1e-4 ), wAcc > 1e-4 );
	// aerial perspective: the haze in front of distant clouds shows sky light where the cloud
	// hides the sky (sky luminance times the hidden fraction not reached by the cloud's light)
	// the march stops at 98.5% opacity: the rest counts as opaque (the sun disc must not shine through)
	let Tc = sat( ( T - 0.015 ) / 0.985 );
	let haze = 1.0 - Tc - opac;
	m.L = L + atmosphereSkyLuminance( rd ) * max( haze, 0.0 );
	m.T = Tc;
	return m;
}
`}var kr=e=>{let t=Number(e).toString();return/[.eE]/.test(t)?t:t+`.0`},Ar=Math.PI/180,jr={atmosphere:{multipleScattering:.99},shape:{altitude:4e3,thickness:5200,density:.019,coverage:.49,horizonCoverageStart:2e4,horizonCoverageRamp:45e3,horizonCoverageAmount:.12,edgeSoftness:.095,edgeSoftnessFalloff:1,weatherScale:29e3,baseScale:7500,baseStrength:.69,erosionScaleBaseMultiplier:.13,erosionStrengthBase:.24,erosionStrengthPeak:2.15,erosionShape:1,baseWeatherStrength:.54,baseWeatherHeightStart:0,baseWeatherHeightEnd:.13},lighting:{scatteringAlbedo:1,powderStrength:.7,ambientIntensity:.7,groundBounceAlbedo:[.009134058699157796,.015208514418949472,.018500220124016652],baseShadowStrength:.88,baseShadowHeight:.13,moonGain:.65},wind:{speed:12,evolutionSpeed:60.8*12/89,skew:1750},fade:{hazeDensityScale:.62,horizonMeltStart:25e3,horizonMeltEnd:45e3},weather:{resolution:1024,mainMass:[4,5,0,1.32],detail:[6,6,1,.13],coverage:.26}},Mr={historyDivisor:2,lattice:4,maxSteps:256,lightTaps:6,stepMeters:25,fullLightingAlpha:.5,lightReuseSteps:3,historyWeight:.9},Nr=512,Pr=160,Fr=4,Ir=256,Lr=3e4,Rr=()=>[0,0,0,0],zr=`
const SC_EARTH: f32 = 6371.0;
const SC_FAR: f32 = 250000.0;
const SC_AP_DIST: f32 = ${kr(Lr)};

fn scRay( uv: vec2f ) -> vec3f {
	let ndc = vec2f( uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0 );
	return normalize( scf.forward.xyz + scf.right.xyz * ( ndc.x * scf.right.w * scf.position.w )
		+ scf.up.xyz * ( ndc.y * scf.position.w ) );
}
fn scSourceUV( pixel: vec2f ) -> vec2f {
	return ( pixel * scf.sampling.z + scf.sampling.xy + 0.5 ) / scf.viewport.zw;
}
fn scProjectPrevious( p: vec3f ) -> vec3f {
	let v = p - scf.previousPosition.xyz;
	let z = dot( v, scf.previousForward.xyz );
	let denom = max( z, 0.001 ) * scf.previousPosition.w;
	return vec3f( vec2f( dot( v, scf.previousRight.xyz ) / ( denom * scf.previousRight.w ),
		-dot( v, scf.previousUp.xyz ) / denom ) * 0.5 + 0.5, z );
}
fn scHG( mu: f32, g: f32 ) -> f32 {
	let d = max( 1.0 + g * g - 2.0 * g * mu, 0.001 );
	return ( 1.0 - g * g ) / ( 4.0 * PI * d * sqrt( d ) );
}
// normalized droplet phase: 80% forward / 20% backscatter; each higher order halves the asymmetry
fn scPhases( mu: f32 ) -> vec3f {
	return vec3f( scHG( mu, 0.8 ), scHG( mu, 0.4 ), scHG( mu, 0.2 ) ) * 0.8
		+ vec3f( scHG( mu, -0.2 ), scHG( mu, -0.1 ), scHG( mu, -0.05 ) ) * 0.2;
}

// ---- density (sky-pro density.wgsl)
struct ScCandidate {
	conservative: f32, edge: f32, top: f32, floorMask: f32,
	shellHeight: f32, localHeight: f32, coverage: f32, position: vec3f,
};
fn scShellHeight( p: vec3f ) -> f32 {
	let horizontal = p.xz - scf.position.xz;
	// parabolic radial height avoids subtracting two ~6,371,000 m f32 values
	let altitude = p.y + dot( horizontal, horizontal ) / ( 2.0 * SC_EARTH * 1000.0 );
	return ( altitude - scs.shell.x ) / scs.shell.y;
}
fn scConeLod( footprint: f32, scale: f32 ) -> f32 { return max( 0.0, log2( max( footprint * 64.0 / scale, 1.0 ) ) ); }
fn scCandidate( p: vec3f, coverage: f32, lod: f32 ) -> ScCandidate {
	let h = scShellHeight( p );
	var result: ScCandidate;
	result.conservative = 0.0;
	if ( h < -0.1 || h > 1.3 || coverage <= 0.0 ) { return result; }
	let windDirection = scs.wind.xy;
	let shapePosition = p - vec3f( scf.wind.x, 0.0, scf.wind.y )
		- vec3f( windDirection.x, 0.0, windDirection.y ) * ( scs.wind.z * max( h, 0.0 ) - scf.wind.z );
	let weather = textureSampleLevel( scWeatherMap, smpLinearRepeat, ( p.xz - scf.wind.xy ) / scs.shape.x, 0.0 ).r;
	let edge = max( scs.base.y * exp2( -max( h, 0.0 ) * scs.base.z ), 0.0001 );
	// an all-one noise sample bounds top dilation; a failed bound avoids the volume fetch
	let maximumTop = weather + coverage - 1.0 + 1.34 * scs.shape.z * coverage;
	if ( maximumTop < h - edge ) { return result; }
	let required = ( 1.0 - smoothstep( scs.base.w, max( scs.erosion.w, scs.base.w + 0.001 ), h ) ) * scs.base.x;
	let floorMask = smoothstep( required - 0.1, required, weather );
	if ( floorMask <= 0.0 ) { return result; }
	let baseSample = textureSampleLevel( scNoise, smpLinearRepeat, shapePosition / scs.shape.y, lod ).rgb;
	let dilation = dot( baseSample, vec3f( 0.7, 0.41, 0.23 ) ) * scs.shape.z;
	let top = weather + coverage - 1.0 + dilation * coverage;
	result.conservative = smoothstep( -edge, edge, top - h ) * smoothstep( -edge, edge, h ) * floorMask;
	result.edge = edge; result.top = top; result.floorMask = floorMask;
	result.shellHeight = h; result.localHeight = clamp( h / max( top, 0.001 ), 0.0, 1.0 );
	result.coverage = coverage; result.position = shapePosition;
	return result;
}
fn scErodedDensity( c: ScCandidate, lod: f32 ) -> f32 {
	if ( c.conservative <= 0.0 ) { return 0.0; }
	let strength = mix( scs.erosion.x, scs.erosion.y, c.localHeight );
	let maximumErosion = 0.173 * strength * c.coverage;
	if ( min( c.top - c.shellHeight, c.shellHeight ) >= maximumErosion + c.edge ) { return c.floorMask; }
	let s = textureSampleLevel( scNoise, smpLinearRepeat, c.position / ( scs.shape.y * scs.shape.w ), lod ).rgb;
	let field = mix( 1.0 - s, s, scs.erosion.z );
	let erosion = dot( field, vec3f( 0.113, 0.04, 0.02 ) ) * strength * c.coverage;
	return smoothstep( -c.edge, c.edge, c.top - erosion - c.shellHeight )
		* smoothstep( -c.edge, c.edge, c.shellHeight - erosion ) * c.floorMask;
}
fn scLightDensity( p: vec3f, coverage: f32, lods: vec2f, cheap: bool ) -> f32 {
	let c = scCandidate( p, coverage, lods.x );
	if ( cheap ) { return c.conservative; }
	return scErodedDensity( c, lods.y );
}
fn scShellRoots( direction: vec3f, altitude: f32, originHeight: f32 ) -> vec2f {
	let radius = SC_EARTH * 1000.0;
	let b = ( radius + originHeight ) * direction.y;
	let c = ( originHeight - altitude ) * ( 2.0 * radius + originHeight + altitude );
	let h = b * b - c;
	if ( h < 0.0 ) { return vec2f( -1.0 ); }
	let q = -b - select( -sqrt( h ), sqrt( h ), b >= 0.0 );
	let other = c / select( -0.0001, q, abs( q ) > 0.0001 );
	return vec2f( min( q, other ), max( q, other ) );
}
fn scCloudInterval( dir: vec3f, originHeight: f32 ) -> vec2f {
	let inner = scShellRoots( dir, scs.shell.x, originHeight );
	let outer = scShellRoots( dir, scs.shell.x + scs.shell.y, originHeight );
	var start = 0.0; var end = min( outer.y, SC_FAR );
	if ( outer.y <= 0.0 ) { return vec2f( 0.0 ); }
	if ( originHeight < scs.shell.x ) { start = max( inner.y, 0.0 ); }
	else {
		if ( originHeight > scs.shell.x + scs.shell.y ) { start = max( outer.x, 0.0 ); }
		if ( inner.x >= 0.0 ) { end = min( end, inner.x ); }
	}
	let ground = scShellRoots( dir, 0.0, originHeight );
	if ( ground.x > 0.0 ) { end = min( end, ground.x ); }
	return vec2f( start, end );
}
`,Br=`
fn scCoverageAt( t: f32 ) -> f32 {
	return scs.shell.w + scs.horizon.z * smoothstep( scs.horizon.x, scs.horizon.x + max( scs.horizon.y, 1.0 ), t );
}
fn scHeightAlongRay( t: f32, dir: vec3f, originHeight: f32 ) -> f32 {
	let altitude = originHeight + dir.y * t + dot( dir.xz, dir.xz ) * t * t / ( 2.0 * SC_EARTH * 1000.0 );
	return ( altitude - scs.shell.x ) / scs.shell.y;
}
fn scCellIsEmpty( t: f32, end: f32, dir: vec3f, originHeight: f32, maximumWeather: f32 ) -> bool {
	let turningPoint = -dir.y * SC_EARTH * 1000.0 / max( dot( dir.xz, dir.xz ), 0.000001 );
	let minHeight = scHeightAlongRay( clamp( turningPoint, t, end ), dir, originHeight );
	let maxHeight = max( scHeightAlongRay( t, dir, originHeight ), scHeightAlongRay( end, dir, originHeight ) );
	let coverage = scCoverageAt( end );
	let maximumTop = maximumWeather + coverage - 1.0 + 1.34 * scs.shape.z * coverage;
	let edgeHeight = select( maxHeight, minHeight, scs.base.z >= 0.0 );
	let edge = max( scs.base.y * exp2( -max( edgeHeight, 0.0 ) * scs.base.z ), 0.0001 );
	let required = ( 1.0 - smoothstep( scs.base.w, max( scs.erosion.w, scs.base.w + 0.001 ), maxHeight ) ) * scs.base.x;
	return maximumTop < minHeight - edge || maximumWeather <= required - 0.1;
}
fn scLightOpticalDepth( p: vec3f, coverage: f32, lods: vec2f, cheap: bool ) -> f32 {
	var opticalDepth = 0.0;
	for ( var i = 1u; i < 8u; i++ ) {
		if ( i >= u32( scf.march.z ) ) { break; }
		let tap = scf.lightOffsets[ i ];
		opticalDepth += scLightDensity( p + tap.xyz, coverage, max( lods, scf.lightLods[ i ].xy ), cheap ) * tap.w * scs.shell.z;
		if ( opticalDepth >= 32.0 ) { break; }
	}
	return opticalDepth;
}
fn scLightEnergy( opticalDepth: f32, phase: vec3f ) -> f32 {
	let quarter = exp( -opticalDepth * 0.25 );
	let halfT = quarter * quarter;
	return dot( vec3f( halfT * halfT, halfT * 0.5, quarter * 0.25 ), phase );
}

// Tidewater's sky (the atmosphere's sky view LUT; the night sky's ambient)
fn scSky( dir: vec3f ) -> vec3f {
	return atmosphereSkyLuminance( dir ) + frame.skyIrradiance * frame.night;
}
// key light: the sun while it is the app's key light, seen from cloud altitude, else the moon
fn scDirect() -> vec3f {
	let isMoon = dot( frame.sunDir, atmosphereParams.sunDir ) < 0.9999;
	let sunE = atmosphereSampleTransmittance( 6360.0 + scs.shell.x * 0.001, frame.sunDir.y ) * atmosphereParams.sunIlluminance;
	return select( sunE, frame.sunColor, isMoon );
}

struct ScMarch { color: vec3f, alpha: f32, depth: f32, steps: u32 };

fn scMarch( origin: vec3f, dir: vec3f, dither: f32, pixelConeAngle: f32, stepConeAngle: f32, maxSteps: u32, useBounds: bool ) -> ScMarch {
	var out: ScMarch;
	out.color = vec3f( 0.0 ); out.alpha = 0.0; out.depth = SC_FAR; out.steps = 0u;
	let interval = scCloudInterval( dir, origin.y );
	var color = vec3f( 0.0 ); var transmission = 1.0; var weightedDepth = 0.0;
	var steps = 0u;
	if ( interval.y > interval.x && scs.shell.w > 0.0 && scs.shell.z > 0.0 ) {
		let L = frame.sunDir;
		let lightCosine = dot( dir, L );
		let phase = scPhases( lightCosine );
		let direct = scDirect();
		let zenith = scSky( vec3f( 0.0, 1.0, 0.0 ) );
		let horizon = scSky( normalize( vec3f( L.x, 0.03, L.z ) + vec3f( 1e-5, 0.0, 0.0 ) ) );
		let bounce = scs.bounce.rgb * direct * max( L.y, 0.0 );
		var t = interval.x + dither * scf.march.x;
		var coarse = true; var emptyRun = 0u; var accumulatedDepth = 0.0;
		var refineEnd = -1.0;
		var cellEnd = -1.0; var cellStart = -1.0; var maximumWeather = 1.0;
		var shadowAt = -SC_FAR; var shadowDensity = -1.0; var shadowTau = 0.0; var skyTau = 0.0; var shadowCheap = false;
		let hasDirectLight = max( direct.x, max( direct.y, direct.z ) ) > 0.00001;
		for ( var i = 0u; i < maxSteps; i++ ) {
			if ( t >= interval.y || transmission < 0.003 ) { break; }
			steps++;
			if ( coarse && useBounds ) {
				if ( t >= cellEnd || t < cellStart ) {
					let size = vec2i( textureDimensions( scWeatherBounds ) );
					let grid = ( origin.xz + dir.xz * t - scf.wind.xy ) / scs.shape.x * vec2f( size );
					let cell = vec2i( floor( grid ) );
					maximumWeather = textureLoad( scWeatherBounds, ( ( cell % size ) + size ) % size, 0 ).r;
					let distance = select( fract( grid ), 1.0 - fract( grid ), dir.xz >= vec2f( 0.0 ) )
						/ max( abs( dir.xz ) * vec2f( size ) / scs.shape.x, vec2f( 0.0000001 ) );
					cellStart = t; cellEnd = min( interval.y, t + max( min( distance.x, distance.y ), 0.05 ) );
				}
				if ( scCellIsEmpty( t, cellEnd, dir, origin.y, maximumWeather ) ) { t = cellEnd + 0.05; continue; }
			}
			let footprint = t * pixelConeAngle;
			let fineStep = max( scf.march.x, t * stepConeAngle * 1.5 );
			let p = origin + dir * t;
			let coverage = scCoverageAt( t );
			let baseLod = scConeLod( footprint, scs.shape.y );
			let c = scCandidate( p, coverage, baseLod );
			let erosionLod = scConeLod( footprint, scs.shape.y * scs.shape.w );
			if ( coarse ) {
				if ( c.conservative > 0.0 ) {
					if ( scErodedDensity( c, erosionLod ) > 0.0 ) {
						refineEnd = t;
						t = max( interval.x, t - fineStep * 4.0 ) + fineStep;
						t = min( t, refineEnd );
						coarse = false; emptyRun = 0u;
						continue;
					}
				}
				t += fineStep * 4.0;
				continue;
			}
			let density = scErodedDensity( c, erosionLod );
			if ( density <= 0.0 ) {
				shadowAt = -SC_FAR;
				emptyRun++;
				if ( t < refineEnd ) { t = min( t + fineStep, refineEnd ); continue; }
				if ( emptyRun >= 4u ) { coarse = true; }
				t += select( fineStep, fineStep * 4.0, coarse ); continue;
			}
			emptyRun = 0u; refineEnd = -1.0;
			let sigmaT = density * scs.shell.z;
			let surfaceStep = clamp( 0.5 / max( sigmaT, 0.000001 ), fineStep * 0.15, fineStep );
			let stepLength = min( mix( surfaceStep, fineStep * 3.0, smoothstep( 1.0, 3.0, accumulatedDepth ) ), interval.y - t );
			let height = clamp( c.shellHeight, 0.0, 1.0 );
			let baseShadow = mix( 1.0, mix( 0.15, 1.0, smoothstep( 0.0, max( scs.shadow.y, 0.001 ), height ) ), scs.shadow.x );
			// darken thin margins away from the sun; keep the forward scattered silver linings
			let powderWeight = scs.cloudLight.y * ( 1.0 - smoothstep( 0.2, 0.95, lightCosine ) );
			let powder = mix( 1.0, 1.0 - exp( -density * 2.0 ), powderWeight );
			var energy = 0.0;
			let cheap = ( 1.0 - transmission ) >= scf.march.w;
			let reuseDistance = min( fineStep * scf.display.y, max( 20.0, scs.shape.y * scs.shape.w * 0.03 ) );
			if ( abs( t - shadowAt ) >= reuseDistance || abs( density - shadowDensity ) > 0.08 || cheap != shadowCheap ) {
				let lods = vec2f( baseLod, erosionLod );
				if ( hasDirectLight ) { shadowTau = scLightOpticalDepth( p, coverage, lods, cheap ); }
				let skyLods = lods + vec2f( 1.0 );
				skyTau = ( scLightDensity( p + vec3f( 0.0, 125.0, 0.0 ), coverage, skyLods, true ) * 250.0
					+ scLightDensity( p + vec3f( 0.0, 600.0, 0.0 ), coverage, skyLods, true ) * 700.0 ) * scs.shell.z;
				shadowAt = t; shadowDensity = density; shadowCheap = cheap;
			}
			if ( hasDirectLight ) {
				energy = scLightEnergy( shadowTau + sigmaT * scf.lightOffsets[ 0 ].w, phase );
			}
			let skyVisibility = 0.2 + 0.8 / ( 1.0 + ( skyTau + sigmaT * 25.0 ) * 0.35 );
			let ambient = ( mix( mix( zenith, horizon, 0.55 ), zenith, sqrt( height ) ) * skyVisibility + bounce * ( 1.0 - height ) )
				* scs.cloudLight.z * ( 1.0 + scs.cloudLight.w );
			let light = ( direct * energy * powder * baseShadow + ambient ) * scs.cloudLight.x;
			let stepT = exp( -sigmaT * stepLength );
			let alpha = transmission * ( 1.0 - stepT );
			color += alpha * light; weightedDepth += alpha * t;
			transmission *= stepT; accumulatedDepth += sigmaT * stepLength; t += stepLength;
		}
	}
	let alpha = 1.0 - transmission;
	var depth = SC_FAR;
	if ( alpha > 0.0 ) {
		depth = weightedDepth / alpha;
		// aerial perspective (distance toward the sky behind), then the far melt into the sky
		let sky = scSky( dir );
		let ap = exp( -depth / SC_AP_DIST );
		color = color * ap + sky * alpha * ( 1.0 - ap );
		let melt = smoothstep( scs.fade.y, max( scs.fade.z, scs.fade.y + 1.0 ), depth );
		color = mix( color, sky * alpha, melt );
	}
	out.color = color; out.alpha = alpha; out.depth = depth; out.steps = steps;
	return out;
}
`,Vr=`
fn scHash33( cell: vec3u ) -> vec3u {
	var p = cell * 1664525u + 1013904223u;
	p.x += p.y * p.z; p.y += p.z * p.x; p.z += p.x * p.y;
	p = p ^ ( p >> vec3u( 16u ) );
	p.x += p.y * p.z; p.y += p.z * p.x; p.z += p.x * p.y;
	return p;
}
fn scGradient( cell: vec3i, period: i32, offset: vec3f ) -> f32 {
	let wrapped = vec3u( ( ( cell % vec3i( period ) ) + vec3i( period ) ) % vec3i( period ) );
	let h = ( scHash33( wrapped ).x >> 24u ) & 15u;
	let u = select( offset.y, offset.x, h < 8u );
	let v = select( select( offset.z, offset.x, h == 12u || h == 14u ), offset.y, h < 4u );
	return select( -u, u, ( h & 1u ) == 0u ) + select( -v, v, ( h & 2u ) == 0u );
}
fn scPerlin( p: vec3f, period: i32 ) -> f32 {
	let cell = vec3i( floor( p ) ); let fr = fract( p ); let w = fr * fr * fr * ( fr * ( fr * 6.0 - 15.0 ) + 10.0 );
	return mix( mix( mix( scGradient( cell, period, fr ), scGradient( cell + vec3i( 1, 0, 0 ), period, fr - vec3f( 1, 0, 0 ) ), w.x ),
		mix( scGradient( cell + vec3i( 0, 1, 0 ), period, fr - vec3f( 0, 1, 0 ) ), scGradient( cell + vec3i( 1, 1, 0 ), period, fr - vec3f( 1, 1, 0 ) ), w.x ), w.y ),
		mix( mix( scGradient( cell + vec3i( 0, 0, 1 ), period, fr - vec3f( 0, 0, 1 ) ), scGradient( cell + vec3i( 1, 0, 1 ), period, fr - vec3f( 1, 0, 1 ) ), w.x ),
		mix( scGradient( cell + vec3i( 0, 1, 1 ), period, fr - vec3f( 0, 1, 1 ) ), scGradient( cell + vec3i( 1, 1, 1 ), period, fr - vec3f( 1, 1, 1 ) ), w.x ), w.y ), w.z );
}
fn scFbm( uv: vec2f, profile: vec4f ) -> f32 {
	var frequency = max( 1.0, round( profile.x ) ); var weight = 0.5;
	var sum = 0.0; var weights = 0.0;
	for ( var i = 0u; i < u32( profile.y ); i++ ) {
		sum += scPerlin( vec3f( uv, profile.z * 13.37 + 0.5 ) * frequency, i32( frequency ) ) * weight;
		weights += weight; weight *= 0.5; frequency *= 2.0;
	}
	return sum / max( weights, 0.001 ) * 0.5 + 0.5;
}
`,Hr=class{constructor(e,n){this.renderer=e,this.atmosphere=n;let r=jr,i=r.shape,a=r.lighting;this.frameBlock=new l(`SkyCloudFrame`,{position:[`vec4f`,Rr()],right:[`vec4f`,Rr()],up:[`vec4f`,Rr()],forward:[`vec4f`,Rr()],previousPosition:[`vec4f`,Rr()],previousRight:[`vec4f`,Rr()],previousUp:[`vec4f`,Rr()],previousForward:[`vec4f`,Rr()],viewport:[`vec4f`,Rr()],sampling:[`vec4f`,Rr()],clock:[`vec4f`,Rr()],wind:[`vec4f`,Rr()],windDelta:[`vec4f`,Rr()],march:[`vec4f`,Rr()],temporal:[`vec4f`,Rr()],display:[`vec4f`,Rr()],pano:[`vec4f`,Rr()],shadow:[`vec4f`,Rr()],lightOffsets:[`vec4f[8]`,new Float32Array(32)],lightLods:[`vec4f[8]`,new Float32Array(32)]},{label:`sky clouds frame`}),this.settingsBlock=new l(`SkyCloudSettings`,{shell:[`vec4f`,[i.altitude,i.thickness,i.density,i.coverage]],shape:[`vec4f`,[i.weatherScale,i.baseScale,i.baseStrength,i.erosionScaleBaseMultiplier]],erosion:[`vec4f`,[i.erosionStrengthBase,i.erosionStrengthPeak,i.erosionShape,i.baseWeatherHeightEnd]],base:[`vec4f`,[i.baseWeatherStrength,i.edgeSoftness,Math.log2(Math.max(i.edgeSoftnessFalloff,.001))*i.thickness*.001,i.baseWeatherHeightStart]],horizon:[`vec4f`,[i.horizonCoverageStart,i.horizonCoverageRamp,i.horizonCoverageAmount,0]],cloudLight:[`vec4f`,[a.scatteringAlbedo,a.powderStrength,a.ambientIntensity,r.atmosphere.multipleScattering]],shadow:[`vec4f`,[a.baseShadowStrength,a.baseShadowHeight,a.moonGain,0]],bounce:[`vec4f`,[...a.groundBounceAlbedo,0]],wind:[`vec4f`,[0,1,r.wind.skew,0]],fade:[`vec4f`,[r.fade.hazeDensityScale,r.fade.horizonMeltStart,r.fade.horizonMeltEnd,0]],weatherMass:[`vec4f`,r.weather.mainMass.slice()],weatherDetail:[`vec4f`,r.weather.detail.slice()],weather:[`vec4f`,[r.weather.coverage,0,0,0]]},{label:`sky clouds settings`}),this.F=this.frameBlock.fields,this.S=this.settingsBlock.fields,this.coverage={value:i.coverage},this.resolutionScale=1,this.outputSize=null,this.noise=new P({label:`cloud shape noise 64³`,width:64,height:64,depth:64,dimension:`3d`,format:`rgba8unorm`,usage:[`sample`,`copyDst`]}),this.blue=new P({label:`cloud blue noise`,width:64,height:64,format:`r8unorm`,usage:[`sample`,`copyDst`]});let o=r.weather.resolution;this.weatherMap=new P({label:`cloud weather`,width:o,height:o,format:`rgba8unorm`,usage:[`sample`,`storage`]}),this.weatherBounds=new P({label:`cloud weather bounds`,width:64,height:64,format:`rgba8unorm`,usage:[`sample`,`storage`]});let s=(e,t=4,n=4,r=`rgba16float`)=>new P({label:e,width:t,height:n,format:r,usage:[`sample`,`storage`]});this.source=s(`cloud radiance`),this.sourceMeta=s(`cloud depth + cost`),this.colors=[s(`cloud history A`),s(`cloud history B`)],this.metas=[s(`cloud history meta A`),s(`cloud history meta B`)],this.panorama=s(`cloud panorama`,Nr,Pr),this.shadowMap=s(`cloud shadow`,Ir,Ir,`r32float`),this._pp=0,this.viewTex=this.colors[0],this.ready=this._loadNoise(),this._buildModules(),this._buildKernels(),this._w=0,this._h=0,this._scale=1,this.sourceWidth=1,this.sourceHeight=1,this.historyWidth=1,this.historyHeight=1,this.frameIndex=0,this.historyValid=!1,this.weatherDirty=!0,this.panoWarm=!0,this._windX=0,this._windZ=0,this._evolution=0,this._elapsed=0,this._prevCam=null,this._prevLight=new t,this._lastCoverage=-1}async _loadNoise(){let e=async e=>{let t=await fetch(`./clouds/`+e);if(!t.ok)throw Error(`clouds: ${e} HTTP ${t.status}`);return t},[t,n]=await Promise.all([e(`baseShape64.bin`),e(`blueNoise.bin`)]),r=new Uint8Array(await new Response(t.body.pipeThrough(new DecompressionStream(`gzip`))).arrayBuffer()),i=new DataView(r.buffer,r.byteOffset,r.byteLength);if(i.getUint32(0,!0)!==828004942)throw Error(`clouds: bad noise blob`);let a=[i.getUint16(6,!0),i.getUint16(8,!0),i.getUint16(10,!0)],o=i.getUint8(12),s=this.noise;s.gpu=N.device.createTexture({label:s.label,dimension:`3d`,size:a,mipLevelCount:o,format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),s.mipsOption=o,s._views.clear(),s.version++;let c=16;for(let e=0;e<o;e++){let t=a.map(t=>Math.max(1,t>>e)),n=t[0]*t[1]*t[2]*4;N.queue.writeTexture({texture:s.gpu,mipLevel:e},r,{offset:c,bytesPerRow:t[0]*4,rowsPerImage:t[1]},t),c+=n}this.blue.upload(new Uint8Array(await n.arrayBuffer()))}_buildModules(){let e=this.atmosphere;this.uniformModule=new g({name:`skyCloudsUniforms`,deps:[F],bindings:{scf:{uniform:this.frameBlock},scs:{uniform:this.settingsBlock}}}),this.coreModule=new g({name:`skyCloudsCore`,deps:[this.uniformModule],bindings:{scNoise:{texture:this.noise},scWeatherMap:{texture:this.weatherMap}},code:zr}),this.marchModule=new g({name:`skyCloudsMarch`,deps:[this.coreModule,e.module,e.transmittanceModule],bindings:{scWeatherBounds:{texture:this.weatherBounds}},code:Br}),this.params=new l(`CloudsParams`,{viewRight:[`vec3f`,new t(1,0,0)],viewUp:[`vec3f`,new t(0,1,0)],viewFwd:[`vec3f`,new t(0,0,-1)],viewTan:[`vec2f`,new p(1,1)],viewValid:[`f32`,0],shadowCenter:[`vec2f`,new p],shadowSize:[`f32`,12e3],shadowStrength:[`f32`,.85]},{label:`clouds`});let n=this.params.fields;this.viewCam={right:n.viewRight,up:n.viewUp,fwd:n.viewFwd,tan:n.viewTan},this.viewValid=n.viewValid,this.shadowCenter=n.shadowCenter,this.shadowSize=n.shadowSize,this.shadowStrength=n.shadowStrength,this.shadowModule=new g({name:`cloudsShadow`,deps:[F],uniforms:this.params,uniformName:`cloudsParams`,bindings:{cloudsShadowMap:{texture:this.shadowMap}},code:`
// cloud shadow transmittance (1 = clear) at a world position. Manual bilinear filtering of an
// unfilterable texture: costs no sampler in the (sampler hungry) scene materials.
fn cloudsShadowTap( i: vec2i ) -> f32 { return textureLoad( cloudsShadowMap, clamp( i, vec2i( 0 ), vec2i( 255 ) ), 0 ).x; }
// (the last lookup is remembered: the scene lighting hooks ask for the same point several times)
var<private> cloudsShadowMemoXZ: vec2f = vec2f( 3.0e38 );
var<private> cloudsShadowMemo: f32 = 1.0;
fn cloudsShadow( worldXZ: vec2f ) -> f32 {
	if ( frame.atmosphereQuality <= 0.0 ) { return 1.0; }
	if ( all( worldXZ == cloudsShadowMemoXZ ) ) { return cloudsShadowMemo; }
	cloudsShadowMemoXZ = worldXZ;
	cloudsShadowMemo = _cloudsShadow( worldXZ );
	return cloudsShadowMemo;
}
fn _cloudsShadow( worldXZ: vec2f ) -> f32 {
	let uv = ( worldXZ - cloudsParams.shadowCenter ) / cloudsParams.shadowSize + 0.5;
	let st = uv * ${kr(Ir)} - 0.5;
	let i0 = vec2i( floor( st ) );
	let fr = fract( st );
	let s = mix( mix( cloudsShadowTap( i0 ), cloudsShadowTap( i0 + vec2i( 1, 0 ) ), fr.x ), mix( cloudsShadowTap( i0 + vec2i( 0, 1 ) ), cloudsShadowTap( i0 + vec2i( 1, 1 ) ), fr.x ), fr.y );
	let e = abs( uv - 0.5 );
	let inside = smoothstep( 0.5, 0.42, max( e.x, e.y ) );
	return mix( 1.0, s, cloudsParams.shadowStrength * inside );
}
`}),this.module=new g({name:`clouds`,deps:[F,this.shadowModule],uniforms:this.params,uniformName:`cloudsParams`,bindings:{cloudsPanorama:{texture:this.panorama},cloudsView:{texture:()=>this.viewTex}},code:`
// vec4( rgb in-scattered radiance, a transmittance ) for a view direction (panorama)
fn cloudsSample( dir: vec3f ) -> vec4f {
	if ( frame.atmosphereQuality <= 0.0 ) { return vec4f( 0.0, 0.0, 0.0, 1.0 ); }
	let az = atan2( dir.z, dir.x );
	let u = fract( az / ${kr(2*Math.PI)} );
	let elev = - acos( clamp( dir.y, -1.0, 1.0 ) ) + ${kr(Math.PI/2)};
	let t = clamp( ( elev + ${kr(4*Ar)} ) / ${kr(94*Ar)}, 0.0, 1.0 );
	let s = textureSampleLevel( cloudsPanorama, smpLinearRepeat, vec2f( u, sqrt( t ) ), 0.0 );
	let below = smoothstep( -0.07, -0.03, dir.y );
	return vec4f( s.rgb * below, mix( 1.0, s.a, below ) );
}

// Transmittance for the sun's disc behind the clouds. The cloud march stops once less than 0.3 % of
// the light gets through and reports that remainder, which (noisy from frame to frame) let a
// clamped sun disc of 2500x the sky shine and sparkle through thick cloud: below ~0.4 % it is dark.
fn cloudsSunTransmittance( T: f32 ) -> f32 { return T * smoothstep( 0.004, 0.04, T ); }

// The main view's clouds: the temporally reconstructed half resolution history, looked up with the
// camera it was resolved for; outside it (or before any trace) the panorama
fn cloudsSampleView( dir: vec3f ) -> vec4f {
	if ( frame.atmosphereQuality <= 0.0 ) { return vec4f( 0.0, 0.0, 0.0, 1.0 ); }
	let x = dot( dir, cloudsParams.viewRight );
	let y = dot( dir, cloudsParams.viewUp );
	let z = dot( dir, cloudsParams.viewFwd );
	let uv = vec2f( x / max( z, 1e-4 ) / cloudsParams.viewTan.x * 0.5 + 0.5, 0.5 - y / max( z, 1e-4 ) / cloudsParams.viewTan.y * 0.5 );
	let inside = cloudsParams.viewValid > 0.5 && z > 0.01 && all( uv >= vec2f( 0.0 ) ) && all( uv <= vec2f( 1.0 ) );
	if ( inside ) {
		let v = max( textureSampleLevel( cloudsView, smpLinearClamp, uv, 0.0 ), vec4f( 0.0 ) );
		let above = smoothstep( -0.05, -0.03, dir.y );
		return vec4f( v.rgb * above, 1.0 - min( v.a, 1.0 ) * above );
	}
	return cloudsSample( dir );
}
`})}_buildKernels(){let e=`@compute @workgroup_size( WG_X, WG_Y, WG_Z ) fn main( @builtin( global_invocation_id ) id: vec3u )`,t=(e,t,n,r)=>new j({label:e,modules:t,bindings:n,code:r,workgroupSize:[8,8,1]});this.weatherKernel=t(`Cloud Weather`,[this.uniformModule],{scOut:{storageTexture:this.weatherMap}},Vr+`
${e} {
	let size = textureDimensions( scOut );
	if ( any( id.xy >= size ) ) { return; }
	let uv = vec2f( id.xy ) / vec2f( size );
	let mass = clamp( ( scFbm( uv, scs.weatherMass ) - 0.5 ) * scs.weatherMass.w + 0.5, 0.0, 1.0 );
	let detail = ( scFbm( uv, scs.weatherDetail ) * 2.0 - 1.0 ) * scs.weatherDetail.w;
	textureStore( scOut, id.xy, vec4f( clamp( mass + detail + scs.weather.x - 0.5, 0.0, 1.0 ), 0.0, 0.0, 1.0 ) );
}`),this.boundsKernel=t(`Cloud Weather Bounds`,[this.coreModule],{scOut:{storageTexture:this.weatherBounds}},`
${e} {
	let size = textureDimensions( scOut );
	if ( any( id.xy >= size ) ) { return; }
	let sourceSize = vec2i( textureDimensions( scWeatherMap ) );
	let scale = vec2f( sourceSize ) / vec2f( size );
	// both bilinear neighbours at cell boundaries, including the repeat seam
	let lo = vec2i( floor( vec2f( id.xy ) * scale - 0.5 ) );
	let hi = vec2i( ceil( vec2f( id.xy + 1u ) * scale - 0.5 ) );
	var maximum = 0.0;
	for ( var y = lo.y; y <= hi.y; y++ ) {
		for ( var x = lo.x; x <= hi.x; x++ ) {
			let p = ( ( vec2i( x, y ) % sourceSize ) + sourceSize ) % sourceSize;
			maximum = max( maximum, textureLoad( scWeatherMap, p, 0 ).r );
		}
	}
	textureStore( scOut, id.xy, vec4f( min( 1.0, maximum + 1.0 / 255.0 ), 0.0, 0.0, 1.0 ) );
}`),this.traceKernel=t(`Clouds Trace`,[this.marchModule],{scBlue:{texture:this.blue},scOutColor:{storageTexture:this.source},scOutMeta:{storageTexture:this.sourceMeta}},`
${e} {
	let size = textureDimensions( scOutColor );
	if ( any( id.xy >= size ) ) { return; }
	let uv = scSourceUV( vec2f( id.xy ) );
	let dir = scRay( uv );
	let noise = textureLoad( scBlue, vec2i( id.xy % 64u ), 0 ).r;
	let dither = select( 0.5, fract( noise + scf.clock.x * 0.61803398875 ), scf.temporal.x > 0.0 );
	let pixelConeAngle = 2.0 * scf.position.w / scf.viewport.y;
	let stepConeAngle = 2.0 * scf.position.w / scf.viewport.w;
	let m = scMarch( scf.position.xyz, dir, dither, pixelConeAngle, stepConeAngle, u32( scf.march.y ), scf.display.y > 0.0 );
	textureStore( scOutColor, id.xy, vec4f( m.color, m.alpha ) );
	// km depth fits half float; the metadata also records the normalized primary sample cost
	textureStore( scOutMeta, id.xy, vec4f( m.depth * 0.001, 1.0, f32( m.steps ) / scf.march.y, 0.0 ) );
}`);let n=()=>this.colors[this._pp],r=()=>this.metas[this._pp],i=()=>this.colors[1-this._pp],a=()=>this.metas[1-this._pp];this.temporalKernel=new j({label:`Clouds Resolve`,modules:[this.coreModule],workgroupSize:[8,8,1],bindings:{scCurrentColor:{texture:this.source},scCurrentMeta:{texture:this.sourceMeta},scPreviousColor:{texture:i},scPreviousMeta:{texture:a},scOutputColor:{storageTexture:n},scOutputMeta:{storageTexture:r}},code:`
var<workgroup> scTileColor: array<vec4f, 121>;
var<workgroup> scTileMeta: array<vec4f, 121>;
fn scSourceClamp( p: vec2i ) -> vec2i { return clamp( p, vec2i( 0 ), vec2i( textureDimensions( scCurrentColor ) ) - 1 ); }
fn scTileIndex( p: vec2i, origin: vec2i, width: u32 ) -> u32 {
	let local = vec2u( scSourceClamp( p ) - origin );
	return local.y * width + local.x;
}
fn scHistoryAt( uv: vec2f, size: vec2f ) -> vec4f {
	// five tap Catmull-Rom: detail survives repeated history warps
	let position = uv * size;
	let center = floor( position - 0.5 ) + 0.5;
	let fr = position - center;
	let w0 = fr * ( fr * ( -0.5 * fr + 1.0 ) - 0.5 );
	let w1 = fr * fr * ( 1.5 * fr - 2.5 ) + 1.0;
	let w2 = fr * ( fr * ( -1.5 * fr + 2.0 ) + 0.5 );
	let w3 = fr * fr * ( 0.5 * fr - 0.5 );
	let w12 = w1 + w2;
	let uv0 = ( center - 1.0 ) / size;
	let uv3 = ( center + 2.0 ) / size;
	let uv12 = ( center + w2 / w12 ) / size;
	let weights = vec4f( w12.x * w0.y, w0.x * w12.y, w12.x * w12.y, w3.x * w12.y );
	let bottomWeight = w12.x * w3.y;
	let value = textureSampleLevel( scPreviousColor, smpLinearClamp, vec2f( uv12.x, uv0.y ), 0.0 ) * weights.x
		+ textureSampleLevel( scPreviousColor, smpLinearClamp, vec2f( uv0.x, uv12.y ), 0.0 ) * weights.y
		+ textureSampleLevel( scPreviousColor, smpLinearClamp, uv12, 0.0 ) * weights.z
		+ textureSampleLevel( scPreviousColor, smpLinearClamp, vec2f( uv3.x, uv12.y ), 0.0 ) * weights.w
		+ textureSampleLevel( scPreviousColor, smpLinearClamp, vec2f( uv12.x, uv3.y ), 0.0 ) * bottomWeight;
	return value / ( dot( weights, vec4f( 1.0 ) ) + bottomWeight );
}
fn scFreshHistoryWeight( color: vec4f, depth: f32 ) -> f32 {
	let retain = select( mix( 0.25, 0.65, smoothstep( 8.0, 30.0, depth ) ), 0.25, color.a < 0.0001 );
	return min( scf.temporal.x, retain ) * ( 1.0 - scf.temporal.y );
}
fn scResolve( pixel: vec2u, color: vec4f, depth: f32, carriedDepth: f32, cost: f32, weight: f32 ) {
	textureStore( scOutputColor, pixel, vec4f( max( color.rgb, vec3f( 0.0 ) ), clamp( color.a, 0.0, 1.0 ) ) );
	textureStore( scOutputMeta, pixel, vec4f( depth, carriedDepth, cost, weight ) );
}
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) id: vec3u, @builtin( local_invocation_index ) thread: u32, @builtin( workgroup_id ) group: vec3u ) {
	let size = textureDimensions( scOutputColor );
	let tileWidth = u32( ceil( 8.0 / scf.sampling.z ) ) + 3u;
	let tileOrigin = vec2i( floor( ( vec2f( group.xy * 8u ) - scf.sampling.xy ) / scf.sampling.z ) ) - 1;
	for ( var index = thread; index < tileWidth * tileWidth; index += 64u ) {
		let p = scSourceClamp( tileOrigin + vec2i( i32( index % tileWidth ), i32( index / tileWidth ) ) );
		scTileColor[ index ] = textureLoad( scCurrentColor, p, 0 );
		scTileMeta[ index ] = textureLoad( scCurrentMeta, p, 0 );
	}
	workgroupBarrier();
	if ( any( id.xy >= size ) ) { return; }
	let uv = ( vec2f( id.xy ) + 0.5 ) / vec2f( size );
	let lattice = u32( scf.sampling.z );
	let fresh = all( id.xy % lattice == vec2u( scf.sampling.xy ) );
	let source = ( vec2f( id.xy ) - scf.sampling.xy ) / scf.sampling.z;
	let center = scSourceClamp( vec2i( round( source ) ) );
	let metadata = scTileMeta[ scTileIndex( center, tileOrigin, tileWidth ) ];
	let central = scTileColor[ scTileIndex( center, tileOrigin, tileWidth ) ];
	let currentDepth = max( metadata.x, 0.001 );
	let stored = textureLoad( scPreviousMeta, vec2i( id.xy ), 0 );
	let historyValid = scf.sampling.w > 0.5 && scf.temporal.x > 0.0;

	// a still view: untouched slots keep their colour and depth exactly
	if ( scf.temporal.z > 0.5 && historyValid && stored.y >= 0.001 ) {
		let history = textureLoad( scPreviousColor, vec2i( id.xy ), 0 );
		if ( fresh ) {
			let weight = scFreshHistoryWeight( central, currentDepth );
			scResolve( id.xy, mix( central, history, weight ), currentDepth, currentDepth, metadata.z, weight );
		} else {
			scResolve( id.xy, history, stored.x, stored.y, stored.z, 1.0 );
		}
		return;
	}

	var color = vec4f( 0.0 ); var weightSum = 0.0;
	let base = vec2i( floor( source ) ); let fraction = fract( source );
	for ( var y = 0; y < 2; y++ ) {
		for ( var x = 0; x < 2; x++ ) {
			let pos = scSourceClamp( base + vec2i( x, y ) );
			let index = scTileIndex( pos, tileOrigin, tileWidth );
			let tap = scTileColor[ index ]; let depth = scTileMeta[ index ].x;
			let bilinear = select( 1.0 - fraction.x, fraction.x, x == 1 ) * select( 1.0 - fraction.y, fraction.y, y == 1 );
			let weight = bilinear * exp( -abs( depth - metadata.x ) / max( 0.1, metadata.x * 0.1 ) - abs( tap.a - central.a ) * 4.0 );
			color += tap * weight; weightSum += weight;
		}
	}
	color = select( central, color / max( weightSum, 0.00001 ), weightSum > 0.00001 );
	if ( fresh ) { color = central; }
	if ( ! historyValid ) {
		scResolve( id.xy, color, currentDepth, currentDepth, metadata.z, 0.0 );
		return;
	}

	var low = color; var high = color;
	var reprojectionDepth = select( SC_FAR * 0.001, stored.y, stored.y >= 0.001 );
	for ( var y = -1; y <= 1; y++ ) {
		for ( var x = -1; x <= 1; x++ ) {
			let tap = scTileColor[ scTileIndex( center + vec2i( x, y ), tileOrigin, tileWidth ) ];
			low = min( low, tap ); high = max( high, tap );
			let neighbor = clamp( vec2i( id.xy ) + vec2i( x, y ), vec2i( 0 ), vec2i( size ) - 1 );
			let depth = textureLoad( scPreviousMeta, neighbor, 0 ).y;
			if ( depth >= 0.001 ) { reprojectionDepth = min( reprojectionDepth, depth ); }
		}
	}
	if ( stored.y < 0.001 ) { reprojectionDepth = min( reprojectionDepth, currentDepth ); }
	var world = scf.position.xyz + scRay( uv ) * ( reprojectionDepth * 1000.0 );
	world -= vec3f( scf.windDelta.x, 0.0, scf.windDelta.y );
	let previous = scProjectPrevious( world );
	let previousPixel = clamp( vec2i( previous.xy * vec2f( size ) ), vec2i( 0 ), vec2i( size ) - 1 );
	let oldMeta = textureLoad( scPreviousMeta, previousPixel, 0 );
	let valid = previous.z > 0.0 && all( previous.xy >= vec2f( 0.0 ) ) && all( previous.xy <= vec2f( 1.0 ) ) && oldMeta.y >= 0.001;
	var carriedDepth = currentDepth; var historyFraction = 0.0;
	if ( valid ) {
		let history = clamp( scHistoryAt( previous.xy, vec2f( size ) ), low, high );
		let motionPixels = length( ( previous.xy - uv ) * vec2f( size ) );
		historyFraction = select( 1.0, scFreshHistoryWeight( central, currentDepth ), fresh );
		color = mix( color, history, historyFraction );
		let expectedDepth = length( world - scf.previousPosition.xyz ) * 0.001;
		if ( ! fresh && ( motionPixels <= 0.5 || abs( oldMeta.y - expectedDepth ) < max( 0.001, expectedDepth * 0.15 ) ) ) {
			carriedDepth = oldMeta.y;
		}
	}
	scResolve( id.xy, color, currentDepth, carriedDepth, metadata.z, historyFraction );
}`}),this.panoKernel=t(`Clouds Panorama`,[this.marchModule],{scPano:{storageTexture:this.panorama}},`
${e} {
	let size = textureDimensions( scPano );
	let texel = id.xy * u32( scf.pano.z ) + vec2u( scf.pano.xy );
	if ( any( texel >= size ) ) { return; }
	let uv = ( vec2f( texel ) + 0.5 ) / vec2f( size );
	let elev = uv.y * uv.y * ${kr(94*Ar)} - ${kr(4*Ar)};
	let az = uv.x * ${kr(2*Math.PI)};
	let dir = vec3f( cos( elev ) * cos( az ), sin( elev ), cos( elev ) * sin( az ) );
	let cone = ${kr(2*Math.PI/Nr)} / max( frame.atmosphereQuality, 0.05 );
	let m = scMarch( scf.position.xyz, dir, 0.5, cone, cone, max( 1u, u32( ceil( 128.0 * frame.atmosphereQuality ) ) ), true );
	textureStore( scPano, texel, vec4f( m.color, 1.0 - m.alpha ) );
}`),this.shadowKernel=t(`Clouds Shadow`,[this.marchModule],{scShadow:{storageTexture:this.shadowMap}},`
${e} {
	let size = textureDimensions( scShadow );
	// a quarter of the rows per frame (w = phase), or all of them (w < 0)
	let full = scf.shadow.w < 0.0;
	let texel = select( vec2u( id.x, id.y * 4u + u32( max( scf.shadow.w, 0.0 ) ) ), id.xy, full );
	if ( any( texel >= size ) ) { return; }
	let xz = scf.shadow.xy + ( ( vec2f( texel ) + 0.5 ) / vec2f( size ) - 0.5 ) * scf.shadow.z;
	let L = frame.sunDir;
	let ly = max( L.y, 0.08 );
	let t0 = scs.shell.x / ly;
	let t1 = ( scs.shell.x + scs.shell.y ) / ly;
	let n = max( 1, i32( ceil( 16.0 * frame.atmosphereQuality ) ) );
	let dt = ( t1 - t0 ) / f32( n );
	var tau = 0.0;
	for ( var i = 0; i < n; i++ ) {
		let t = t0 + ( f32( i ) + 0.5 ) * dt;
		let p = vec3f( xz.x, 0.0, xz.y ) + vec3f( L.x, ly, L.z ) * t;
		tau += scLightDensity( p, scs.shell.w, vec2f( 2.0, 2.0 ), false ) * scs.shell.z * dt;
		if ( tau > 12.0 ) { break; }
	}
	// multiple scattering lets some light through even thick cloud (as the view's octaves do)
	let T = exp( -tau ) * 0.8 + exp( -tau * 0.25 ) * 0.2;
	textureStore( scShadow, texel, vec4f( T, 0.0, 0.0, 1.0 ) );
}`)}_drawingBufferSize(){if(this.outputSize)return this.outputSize;let e=b.fields.outputResolution.value;if(e&&e.x>0)return e;let t=N.canvas;return{x:t?t.width:1280,y:t?t.height:720}}_allocate(e,t){let n=Mr,r=this.resolutionScale;this.sourceWidth=Math.max(1,Math.ceil(e*r/n.historyDivisor/n.lattice)),this.sourceHeight=Math.max(1,Math.ceil(t*r/n.historyDivisor/n.lattice)),this.historyWidth=this.sourceWidth*n.lattice,this.historyHeight=this.sourceHeight*n.lattice,this.source.resize(this.sourceWidth,this.sourceHeight),this.sourceMeta.resize(this.sourceWidth,this.sourceHeight);for(let e of[...this.colors,...this.metas])e.resize(this.historyWidth,this.historyHeight);this.historyValid=!1}update(e,t){if(h.atmosphereQuality.value<=0)return;let n=Mr,r=jr,i=this.F,a=this.S;e=Math.min(.1,Math.max(0,e));let o=this._drawingBufferSize();(o.x!==this._w||o.y!==this._h||this.resolutionScale!==this._scale)&&(this._w=o.x,this._h=o.y,this._scale=this.resolutionScale,this._allocate(o.x,o.y));let s=this.coverage.value;s!==this._lastCoverage&&(a.shell.value[3]=s,this._lastCoverage=s,this.historyValid=!1,this.panoWarm=!0);let c=h.windDir.value,l=Math.hypot(c.x,c.y)||1,u=c.x/l,d=c.y/l;if(a.wind.value[0]=u,a.wind.value[1]=d,this.weatherDirty){let e=this.weatherMap.width;this.weatherKernel.dispatch([e/8,e/8,1]),this.boundsKernel.dispatch([8,8,1]),this.weatherDirty=!1}t.updateMatrixWorld();let p=t.matrixWorld.elements,m=t.position,g=Math.tan(f.degToRad(t.fov*.5))/(t.zoom||1),_=t.aspect,v=[p[0],p[1],p[2]],y=[p[4],p[5],p[6]],b=[-p[8],-p[9],-p[10]],x=e=>{let t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]},S=x(v),C=x(y),w=x(b),T={position:[m.x,m.y,m.z,g],right:[...S,_],up:[...C,0],forward:[...w,0]},E=this._prevCam;(!E||Math.hypot(m.x-E.position[0],m.y-E.position[1],m.z-E.position[2])>1e3||w[0]*E.forward[0]+w[1]*E.forward[1]+w[2]*E.forward[2]<.7||Math.abs(g-E.position[3])>.01)&&(this.historyValid=!1);let D=h.sunDir.value;D.dot(this._prevLight)<.999&&(this.historyValid=!1,this.panoWarm=!0),this._prevLight.copy(D);let O=this.historyValid&&E?E:T;i.position.value=T.position,i.right.value=T.right,i.up.value=T.up,i.forward.value=T.forward,i.previousPosition.value=O.position,i.previousRight.value=O.right,i.previousUp.value=O.up,i.previousForward.value=O.forward,this._prevCam=T;let k=n.lattice,ee=this.frameIndex%(k*k),te=0,A=0;for(let e=0;1<<e<k;e++){let t=ee>>e*2&3;te|=(t>>1^t&1)<<Math.log2(k)-e-1,A|=(t&1)<<Math.log2(k)-e-1}i.viewport.value=[o.x*this.resolutionScale,o.y*this.resolutionScale,this.historyWidth,this.historyHeight],i.sampling.value=[te,A,k,+!!this.historyValid],this._elapsed+=e;let j=r.wind.speed,ne=u*j*e,re=d*j*e;this._windX+=ne,this._windZ+=re,this._evolution+=r.wind.evolutionSpeed*e,i.clock.value=[this.frameIndex%4096,this._elapsed,e,0],i.wind.value=[this._windX,this._windZ,this._evolution,0],i.windDelta.value=[ne,re,0,0],i.march.value=[n.stepMeters,n.maxSteps,n.lightTaps,n.fullLightingAlpha],i.temporal.value=[n.historyWeight,Math.min(1,r.wind.evolutionSpeed*e/100),0,0],i.display.value=[0,n.lightReuseSteps,0,0];let M=D.x,ie=D.y,ae=D.z,oe=ae,se=0,N=-M;Math.abs(ie)>.99&&(oe=0,se=-ae,N=ie);let ce=1/Math.hypot(oe,se,N);oe*=ce,se*=ce,N*=ce;let P=ie*N-ae*se,le=ae*oe-M*N,ue=M*se-ie*oe,de=i.lightOffsets.value,fe=i.lightLods.value;de[0]=0,de[1]=0,de[2]=0,de[3]=25;let pe=r.shape;for(let e=1;e<8;e++){let t=1.7**e,r=25*((t-1)/.7+t*.5),i=e*2.399963,a=Math.sqrt((e+.5)/n.lightTaps),o=Math.cos(i)*a*.05*r,s=Math.sin(i)*a*.05*r,c=e*4;de[c]=M*r+oe*o+P*s,de[c+1]=ie*r+se*o+le*s,de[c+2]=ae*r+N*o+ue*s,de[c+3]=25*t;let l=r*.1;fe[c]=Math.max(0,Math.log2(l*64/pe.baseScale)),fe[c+1]=Math.max(0,Math.log2(l*64/(pe.baseScale*pe.erosionScaleBaseMultiplier)))}let me=this.frameIndex%4;if(me===0||!this._shadowInit){let e=this.shadowSize.value/Ir*4;this.shadowCenter.value.set(Math.round(m.x/e)*e,Math.round(m.z/e)*e)}i.shadow.value=[this.shadowCenter.value.x,this.shadowCenter.value.y,this.shadowSize.value,me];let he=h.cameraUnderwater&&h.cameraUnderwater.value>.5;if(this._shadowInit?this.shadowKernel.dispatch([Ir/8,Ir/32,1]):(i.shadow.value=[this.shadowCenter.value.x,this.shadowCenter.value.y,this.shadowSize.value,-1],this.shadowKernel.dispatch([Ir/8,Ir/8,1]),this._shadowInit=!0),this.panoWarm)i.pano.value=[0,0,1,0],this.panoKernel.dispatch([Nr/8,Pr/8,1]),this.panoWarm=!1;else{let e=this.frameIndex%16;i.pano.value=[e%Fr,Math.floor(e/Fr),Fr,0],this.panoKernel.dispatch([Math.ceil(Nr/Fr/8),Math.ceil(Pr/Fr/8),1])}if(he)this.viewValid.value=0,this.historyValid=!1;else{this.traceKernel.dispatch([Math.ceil(this.sourceWidth/8),Math.ceil(this.sourceHeight/8),1]),this.temporalKernel.dispatch([Math.ceil(this.historyWidth/8),Math.ceil(this.historyHeight/8),1]),this.viewTex=this.colors[this._pp],this._pp=1-this._pp;let e=this.viewCam;e.right.value.set(S[0],S[1],S[2]),e.up.value.set(C[0],C[1],C[2]),e.fwd.value.set(w[0],w[1],w[2]),e.tan.value.set(g*_,g),this.viewValid.value=1,this.historyValid=!0}this.frameIndex++}resetHistory(){this.historyValid=!1}invalidate(){this.panoWarm=!0,this.resetHistory()}},Ur=class{constructor(e,t=e.label){let n=e.width;if(e.height!==n||n&n-1||n<32||n>512)throw Error(`ComputeMips: square power-of-two 32..512 only`);this.res=n,this.layers=e.dimension===`3d`?1:e.depth;let r=e.mipLevelCount,i=Math.min(5,r-1),a=i===5&&(N.limits.maxStorageTexturesInComputeStage??N.limits.maxStorageTexturesPerShaderStage)<5,o=n>>5;this.mip5Buffer=a?new ce({label:t+` mip5 staging`,count:o*o*this.layers,type:`vec4f`}):null;let s=t=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}}),c=t=>({texture:e,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}}),l=(e,t,n,r)=>`
	if ( lx < ${n}u && ly < ${n}u ) {
		let i = ly * ${4*n}u + lx * 2u;
		let v = ( ${e}[ i ] + ${e}[ i + 1u ] + ${e}[ i + ${2*n}u ] + ${e}[ i + ${2*n+1}u ] ) * 0.25;
		${a&&r===5?`mip5Buffer[ ( layer * ${o}u + gy ) * ${o}u + gx ] = v;`:`textureStore( out${r}, vec2u( gx * ${n}u + lx, gy * ${n}u + ly ), layer, v );`}
		${t?`${t}[ ly * ${n}u + lx ] = v;`:``}
	}
	workgroupBarrier();`,u={src0:c(0)},d=``;for(let e=1;e<=i;e++)(!a||e!==5)&&(u[`out`+e]=s(e));a&&(u.mip5Buffer={storage:this.mip5Buffer,access:`read_write`});for(let e=2,t=8;e<=i;e++,t>>=1)d+=l(`s`+(e-1),e<i?`s`+e:null,t,e);if(this.kernelA=new j({label:t+` mips A`,bindings:u,workgroupSize:[16,16,1],code:`
var<workgroup> s1: array<vec4f, 256>;
var<workgroup> s2: array<vec4f, 64>;
var<workgroup> s3: array<vec4f, 16>;
var<workgroup> s4: array<vec4f, 4>;
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y;
	let gx = wid.x; let gy = wid.y; let layer = wid.z;
	let x1 = gx * 16u + lx; let y1 = gy * 16u + ly;
	let p = vec2u( x1, y1 ) * 2u;
	let v1 = ( textureLoad( src0, p, layer, 0 ) + textureLoad( src0, p + vec2u( 1u, 0u ), layer, 0 ) + textureLoad( src0, p + vec2u( 0u, 1u ), layer, 0 ) + textureLoad( src0, p + vec2u( 1u, 1u ), layer, 0 ) ) * 0.25;
	textureStore( out1, vec2u( x1, y1 ), layer, v1 );
	s1[ ly * 16u + lx ] = v1;
	workgroupBarrier();
${d}
}`}),this.kernelB=null,this.copyMip5=a?new j({label:t+` mip5 store`,bindings:{mip5Buffer:{storage:this.mip5Buffer,access:`read`},out5:s(5)},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) p: vec3u ) {
	if ( p.x >= ${o}u || p.y >= ${o}u ) { return; }
	textureStore( out5, p.xy, p.z, mip5Buffer[ ( p.z * ${o}u + p.y ) * ${o}u + p.x ] );
}`}):null,r>6&&o>1){let e={src5:c(5)},n=``,i=``,a=`s5`;for(let t=6,c=o>>1;t<r&&c>=1;t++,c>>=1){e[`out`+t]=s(t);let o=c>1&&t<r-1?`s`+t:null;o&&(i+=`var<workgroup> ${o}: array<vec4f, ${c*c}>;\n`),n+=l(a,o,c,t),a=o}this.kernelB=new j({label:t+` mips B`,bindings:e,workgroupSize:[o,o,1],code:`
var<workgroup> s5: array<vec4f, ${o*o}>;
${i}
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y; let layer = wid.z;
	let gx = 0u; let gy = 0u;
	s5[ ly * ${o}u + lx ] = textureLoad( src5, vec2u( lx, ly ), layer, 0 );
	workgroupBarrier();
${n}
}`})}}dispatch(e=null){let t=e?{pass:e}:void 0;this.kernelA.dispatch([this.res/32,this.res/32,this.layers],t),this.copyMip5&&this.copyMip5.dispatch([Math.ceil((this.res>>5)/8),Math.ceil((this.res>>5)/8),this.layers],t),this.kernelB&&this.kernelB.dispatch([1,1,this.layers],t)}},Wr=6,Gr=32,Kr=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},qr=`
fn envCubeDir( face: u32, x: u32, y: u32, size: u32 ) -> vec3f {
	let u = ( f32( x ) + 0.5 ) / f32( size ) * 2.0 - 1.0;
	let v = ( f32( y ) + 0.5 ) / f32( size ) * 2.0 - 1.0;
	var d: vec3f;
	switch ( face ) {
		case 0u: { d = vec3f( 1.0, -v, -u ); }
		case 1u: { d = vec3f( -1.0, -v, u ); }
		case 2u: { d = vec3f( u, 1.0, v ); }
		case 3u: { d = vec3f( u, -1.0, -v ); }
		case 4u: { d = vec3f( u, -v, 1.0 ); }
		default: { d = vec3f( -u, -v, -1.0 ); }
	}
	return normalize( d );
}
`,Jr=class{constructor(e,n,r,i=128){this.renderer=e,this.scene=n,this.sky=r,this.size=i,n&&(n.environmentIntensity=1),this.source=new P({label:`envSource`,width:i,height:i,dimension:`cube`,format:`rgba16float`,mips:!0,usage:[`sample`,`storage`,`render`]});let a=e=>new P({label:e,width:i,height:i,dimension:`cube`,format:`rgba16float`,mips:Wr,usage:[`sample`,`storage`]});this.targets=[a(`envSpecularA`),a(`envSpecularB`)],this.front=0,this.sh=[new ce({label:`envSH_A`,count:9,type:`vec4f`,data:Yr()}),new ce({label:`envSH_B`,count:9,type:`vec4f`})],this.lastSun=new t(0,-2,0),this.timer=0,this.interval=3,this.step=-1,this.primed=!1,this._build(),this.steps=this._buildSteps()}_build(){let e=this.sky,t=this.size;this.faceParams=[],this.faceKernels=[];for(let n=0;n<6;n++)this.faceKernels.push(new j({label:`Env Face `+n,modules:[F,e.module],bindings:{outCube:{storageTexture:this.source,viewDimension:`2d-array`}},workgroupSize:[8,8,1],code:`${qr}
@compute @workgroup_size( WG_X, WG_Y, WG_Z ) fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	if ( gid.x >= ${t}u || gid.y >= ${t}u ) { return; }
	let dir = envCubeDir( ${n}u, gid.x, gid.y, ${t}u );
	// no sun or moon disk: the key light is lit directly
	textureStore( outCube, gid.xy, ${n}, vec4f( skyRadianceWithClouds( dir, false ), 1.0 ) );
}`}));this.filterKernels=[[],[]];for(let e=0;e<2;e++)for(let n=0;n<Wr;n++){let r=n/5,i=t>>n;this.filterKernels[e].push(new j({label:`Env GGX `+n,modules:[F],bindings:{srcCube:{texture:this.source,viewDimension:`cube`},outCube:{storageTexture:this.targets[e],view:{dimension:`2d-array`,baseMipLevel:n,mipLevelCount:1}}},workgroupSize:[8,8,1],code:`${qr}
fn hammersley( i: u32, n: u32 ) -> vec2f {
	var b = i;
	b = ( b << 16u ) | ( b >> 16u );
	b = ( ( b & 0x55555555u ) << 1u ) | ( ( b & 0xAAAAAAAAu ) >> 1u );
	b = ( ( b & 0x33333333u ) << 2u ) | ( ( b & 0xCCCCCCCCu ) >> 2u );
	b = ( ( b & 0x0F0F0F0Fu ) << 4u ) | ( ( b & 0xF0F0F0F0u ) >> 4u );
	b = ( ( b & 0x00FF00FFu ) << 8u ) | ( ( b & 0xFF00FF00u ) >> 8u );
	return vec2f( f32( i ) / f32( n ), f32( b ) * 2.3283064365386963e-10 );
}
@compute @workgroup_size( WG_X, WG_Y, WG_Z ) fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	if ( gid.x >= ${i}u || gid.y >= ${i}u ) { return; }
	let N = envCubeDir( gid.z, gid.x, gid.y, ${i}u );
${n===0?`
	textureStore( outCube, gid.xy, gid.z, vec4f( textureSampleLevel( srcCube, smpLinearClamp, N, 0.0 ).rgb, 1.0 ) );
}`:`
	// filtered importance sampling (Karis 2013 / GPU Gems 3 ch. 20), N = V = R
	let alpha = ${Kr(r*r)};
	let a2 = alpha * alpha;
	let tb = basis( N );
	const COUNT = 96u;
	let saTexel = ${Kr(4*Math.PI/(6*t*t))};
	var sum = vec3f( 0.0 );
	var wsum = 0.0;
	for ( var i = 0u; i < COUNT; i++ ) {
		let xi = hammersley( i, COUNT );
		let phi = TWO_PI * xi.x;
		let cosT = sqrt( ( 1.0 - xi.y ) / ( 1.0 + ( a2 - 1.0 ) * xi.y ) );
		let sinT = sqrt( 1.0 - cosT * cosT );
		let H = tb * vec3f( sinT * cos( phi ), sinT * sin( phi ), cosT );
		let L = 2.0 * dot( N, H ) * H - N;
		let NdotL = dot( N, L );
		if ( NdotL > 0.0 ) {
			let NdotH = cosT;
			let d = NdotH * NdotH * ( a2 - 1.0 ) + 1.0;
			let D = a2 / ( PI * d * d );
			let pdf = D * 0.25; // D * NdotH / ( 4 VdotH ), N = V
			let saSample = 1.0 / ( f32( COUNT ) * pdf + 1e-4 );
			let lod = clamp( 0.5 * log2( saSample / saTexel ) + 1.0, 0.0, ${Kr(Math.log2(t))} );
			sum += textureSampleLevel( srcCube, smpLinearClamp, L, lod ).rgb * NdotL;
			wsum += NdotL;
		}
	}
	textureStore( outCube, gid.xy, gid.z, vec4f( sum / max( wsum, 1e-4 ), 1.0 ) );
}`}`}))}let n=Math.max(0,Math.log2(t/Gr));this.shKernels=[0,1].map(e=>new j({label:`Env SH`,modules:[F],bindings:{srcCube:{texture:this.source,viewDimension:`2d-array`},shOut:{storage:this.sh[e],access:`read_write`}},workgroupSize:[128,1,1],code:`${qr}
var<workgroup> acc: array<array<vec3f, 9>, 128>;
@compute @workgroup_size( 128 ) fn main( @builtin( local_invocation_index ) li: u32 ) {
	var c: array<vec3f, 9>;
	for ( var k = 0; k < 9; k++ ) { c[ k ] = vec3f( 0.0 ); }
	let total = 6144u;
	for ( var idx = li; idx < total; idx += 128u ) {
		let face = idx / 1024u;
		let r = idx % 1024u;
		let x = r % ${Gr}u; let y = r / ${Gr}u;
		let d = envCubeDir( face, x, y, ${Gr}u );
		// solid angle of the texel
		let u = ( f32( x ) + 0.5 ) / ${Kr(Gr)} * 2.0 - 1.0;
		let v = ( f32( y ) + 0.5 ) / ${Kr(Gr)} * 2.0 - 1.0;
		let tmp = 1.0 + u * u + v * v;
		let w = 4.0 / ( sqrt( tmp ) * tmp ) * ${Kr(1/1024)};
		let L = textureLoad( srcCube, vec2u( x, y ), face, ${n} ).rgb * w;
		c[ 0 ] += L * 0.282095;
		c[ 1 ] += L * 0.488603 * d.y;
		c[ 2 ] += L * 0.488603 * d.z;
		c[ 3 ] += L * 0.488603 * d.x;
		c[ 4 ] += L * 1.092548 * d.x * d.y;
		c[ 5 ] += L * 1.092548 * d.y * d.z;
		c[ 6 ] += L * 0.315392 * ( 3.0 * d.z * d.z - 1.0 );
		c[ 7 ] += L * 1.092548 * d.x * d.z;
		c[ 8 ] += L * 0.546274 * ( d.x * d.x - d.y * d.y );
	}
	acc[ li ] = c;
	workgroupBarrier();
	for ( var s = 64u; s > 0u; s >>= 1u ) {
		if ( li < s ) { for ( var k = 0; k < 9; k++ ) { acc[ li ][ k ] += acc[ li + s ][ k ]; } }
		workgroupBarrier();
	}
	if ( li == 0u ) {
		// cosine lobe convolution (A0 = PI, A1 = 2 PI / 3, A2 = PI / 4), stored as irradiance / PI
		let A = array<f32, 9>( 1.0, 0.6666667, 0.6666667, 0.6666667, 0.25, 0.25, 0.25, 0.25, 0.25 );
		for ( var k = 0; k < 9; k++ ) { shOut[ k ] = vec4f( acc[ 0 ][ k ] * A[ k ], 0.0 ); }
	}
}`})),this.envUniforms=new l(`EnvParams`,{levels:[`f32`,5]},{label:`env`}),Ue.set(`envSpecular`,new g({name:`hook-envSpecular`,deps:[F],uniforms:this.envUniforms,uniformName:`envParams`,bindings:{envSpecularCube:{texture:()=>this.targets[this.front],viewDimension:`cube`}},code:`
fn hookEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f {
	return textureSampleLevel( envSpecularCube, smpLinearClamp, R, roughness * envParams.levels ).rgb * frame.envIntensity;
}
`})),Ue.set(`envDiffuse`,new g({name:`hook-envDiffuse`,deps:[F],bindings:{envSH:{storage:()=>this.sh[this.front],access:`read`,type:`vec4f`}},code:`
fn hookEnvDiffuse( N: vec3f ) -> vec3f {
	let d = N;
	var e = envSH[ 0 ].rgb * 0.282095
		+ envSH[ 1 ].rgb * 0.488603 * d.y + envSH[ 2 ].rgb * 0.488603 * d.z + envSH[ 3 ].rgb * 0.488603 * d.x
		+ envSH[ 4 ].rgb * 1.092548 * d.x * d.y + envSH[ 5 ].rgb * 1.092548 * d.y * d.z
		+ envSH[ 6 ].rgb * 0.315392 * ( 3.0 * d.z * d.z - 1.0 ) + envSH[ 7 ].rgb * 1.092548 * d.x * d.z
		+ envSH[ 8 ].rgb * 0.546274 * ( d.x * d.x - d.y * d.y );
	return max( e, vec3f( 0.0 ) ) * frame.envIntensity;
}
`}))}_buildSteps(){let e=[],t=this.size;for(let n=0;n<6;n++)e.push(()=>this.faceKernels[n].dispatch([t/8,t/8,1]));let n=this._mips||=new Ur(this.source,`envSource`);e.push(()=>n.dispatch());for(let n=0;n<Wr;n++){let r=Math.max(1,Math.ceil((t>>n)/8));e.push(()=>this.filterKernels[1-this.front][n].dispatch([r,r,6]))}return e.push(()=>this.shKernels[1-this.front].dispatch(1)),e.push(()=>{this.front=1-this.front}),e}update(e,t=!1){this.timer-=e;let n=this.sky.atmosphere.sunDir.value;if(t||!this.primed){this.primed=!0,this.timer=this.interval,this.lastSun.copy(n);for(let e of this.steps)e();this.step=-1;return}if(this.step<0){if(!(n.angleTo(this.lastSun)>.004)&&this.timer>0)return;this.timer=this.interval,this.lastSun.copy(n),this.step=0}this.steps[this.step++](),this.step===this.steps.length&&(this.step=-1)}get texture(){return this.targets[this.front]}};function Yr(){let e=new Float32Array(36),t=[.3,.4,.6];for(let n=0;n<3;n++)e[n]=t[n]/.282095;return e}var Xr=[4,8,13,19,27,38,52,72,100],Zr=8;function Qr(e){let t=performance.now(),{res:n,heights:r,rock:i,texel:a,origin:o}=e,s=n/4,c=a*4,l=new Float32Array(s*s);for(let e=0;e<s;e++)for(let t=0;t<s;t++){let i=0;for(let a=0;a<4;a++){let o=(e*4+a)*n+t*4;for(let e=0;e<4;e++)i+=r[o+e]}l[e*s+t]=i/16}let u=new Float32Array(s*s).fill(1),d=[];for(let e=0;e<Zr;e++){let t=(e+.5)/Zr*Math.PI*2;d.push([Math.cos(t),Math.sin(t)])}for(let e=1;e<s-1;e++)for(let t=1;t<s-1;t++){let n=l[e*s+t];if(n<-25)continue;let r=0;for(let i=0;i<Zr;i++){let[a,o]=d[i],u=0;for(let r=0;r<Xr.length;r++){let i=Xr[r],d=Math.round(t+a*i/c),f=Math.round(e+o*i/c);if(d<0||f<0||d>=s||f>=s)break;let p=(l[f*s+d]-n-.3)/i;p>u&&(u=p)}r+=1/(1+u*u)}u[e*s+t]=r/Zr}let f=performance.now(),p=new Uint8Array(n*n*4),m=new Uint8Array(n*n*4),h=e.sand,g=e.path,_=e.gully,v=e.seagrass,y=e.rubble,b=e.scarp,x=1/(2*a);for(let e=0;e<n;e++){let t=e>0?e-1:0,a=e<n-1?e+1:n-1,o=e>1?e-2:0,c=e<n-2?e+2:n-1,l=(e+.5)/4-.5;l=l<0?0:l>s-1.001?s-1.001:l;let d=l|0,f=l-d;for(let l=0;l<n;l++){let S=e*n+l,C=l>0?l-1:0,w=l<n-1?l+1:n-1,T=(r[e*n+w]-r[e*n+C])*x,E=(r[a*n+l]-r[t*n+l])*x,D=1/Math.sqrt(T*T+1+E*E),O=-T*D,k=-E*D,ee=l>1?l-2:0,te=l<n-2?l+2:n-1,A=r[S],j=.5+(r[e*n+ee]+r[e*n+te]+r[o*n+l]+r[c*n+l]-4*A)*.25*.9;j=j<0?0:j>1?1:j;let ne=(l+.5)/4-.5;ne=ne<0?0:ne>s-1.001?s-1.001:ne;let re=ne|0,M=ne-re,ie=d*s+re,ae=((u[ie]*(1-M)+u[ie+1]*M)*(1-f)+(u[ie+s]*(1-M)+u[ie+s+1]*M)*f)*(1-Math.max(0,j-.5)*.7);ae=ae<0?0:ae;let oe=S*4;p[oe]=(O*.5+.5)*255+.5,p[oe+1]=(k*.5+.5)*255+.5,p[oe+2]=i[S]*255+.5,p[oe+3]=ae*255+.5,m[oe]=h[S],m[oe+1]=g[S],m[oe+2]=v?Math.max(_[S],v[S]):_[S],m[oe+3]=Math.max(y?y[S]:0,b?b[S]:0)}}if(e.pads)for(let t of e.pads){let e=t.radius+3.5,r=Math.max(0,Math.floor((t.x-e-o)/a)),i=Math.min(n-1,Math.ceil((t.x+e-o)/a)),s=Math.max(0,Math.floor((t.z-e-o)/a)),c=Math.min(n-1,Math.ceil((t.z+e-o)/a));for(let e=s;e<=c;e++)for(let s=r;s<=i;s++){let r=o+(s+.5)*a,i=o+(e+.5)*a,c=Math.hypot(r-t.x,i-t.z),l=Math.atan2(i-t.z,r-t.x),u=1.2+1.8*(.5+.5*Math.sin(l*3+t.x)*Math.sin(l*5-t.z)),d=c<t.radius?1:Math.max(0,1-(c-t.radius)/u),f=(e*n+s)*4+1,p=Math.round(d*d*150);p>m[f]&&(m[f]=p)}}return{normal:p,splat:m,ms:{ao:f-t,maps:performance.now()-f}}}function $r(e,t=4){let{res:n,heights:r}=e,i=n/t,a=new Float32Array(i*i),o=-1/0,s=1/(t*t);for(let e=0;e<i;e++)for(let c=0;c<i;c++){let l=0;for(let i=0;i<t;i++){let a=(e*t+i)*n+c*t;for(let e=0;e<t;e++)l+=r[a+e]}let u=l*s;a[e*i+c]=u,u>o&&(o=u)}let c=e=>{let t=new Uint16Array(e.length);for(let n=0;n<e.length;n++)t[n]=_.toHalfFloat(e[n]);return t},l=[{data:c(a),width:i,height:i}],u=i;for(;u>1;){let e=u>>1,t=new Float32Array(e*e);for(let n=0;n<e;n++)for(let r=0;r<e;r++){let i=2*n*u+2*r;t[n*e+r]=Math.max(a[i],a[i+1],a[i+u],a[i+u+1])}l.push({data:c(t),width:e,height:e}),a=t,u=e}return{levels:l,texel:e.texel*t,maxHeight:o}}var ei=512,ti=24,ni=6,ri=1.22,ii=24;function ai(e,t,n,r,i,a=!1){let o=new P({label:i,width:t,height:n,format:r,mips:a,usage:[`sample`,`copyDst`],data:e});return o.getGPU(),a===!0&&oe(o),o}var oi=class{constructor(e,n){this.terrain=e;let r=e.res,i=performance.now();this.heightTexture=ai(e.heights,r,r,`r32float`,`terrainHeights`);let a=Qr(e);this.normalTexture=ai(a.normal,r,r,`rgba8unorm`,`terrainNormalRockAO`,!0),this.splatTexture=ai(a.splat,r,r,`rgba8unorm`,`terrainSplat`,!0),this.detailTexture=ee();let o=$r(e,4),s=new P({label:`terrainShadowHeights`,width:o.levels[0].width,height:o.levels[0].height,format:`r16float`,mips:o.levels.length,usage:[`sample`,`copyDst`]});s.getGPU(),o.levels.forEach((e,t)=>s.upload(e.data,{mip:t,width:e.width,height:e.height})),this.shadowHeightTexture=s,this.shadowTexel=o.texel,this.maxHeight=o.maxHeight,this.size=e.size,this.origin=e.origin,this.res=r,this.uniforms=new l(`TerrainParams`,{origin:[`f32`,e.origin],size:[`f32`,e.size],res:[`f32`,r],shoreRes:[`f32`,1],sunBake:[`vec3f`,new t(0,1,0)],sunBaked:[`f32`,0]},{label:`terrainParams`}),this.uOrigin=this.uniforms.fields.origin,this.uSize=this.uniforms.fields.size,this.shoreTexture=ai(new Float32Array([1e4,0,0,0]),1,1,`rgba32float`,`terrainShoreField`),n&&this.setShoreField(n),this._initSunShadow(),this.module=new g({name:`terrain`,deps:[F],uniforms:this.uniforms,bindings:{terrainHeightTex:{texture:this.heightTexture,sampleType:`unfilterable-float`},terrainNormalTex:{texture:this.normalTexture},terrainSplatTex:{texture:this.splatTexture},terrainDetailTex:ae(),terrainShoreTex:{texture:()=>this.shoreTexture,sampleType:`unfilterable-float`},terrainSunShadowTex:{texture:this.sunShadowTexture}},code:si}),this.sunModulationModule=new g({name:`terrainSunModulation`,deps:[this.module],code:`fn materialSunModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( terrainSunShadowAt( P ) ); }`}),this.timings={...a.ms,detail:this.detailTexture.userData.ms,total:performance.now()-i}}_initSunShadow(){this.sunShadowTexture=new P({label:`terrainSunShadow`,width:ei,height:ei,format:`rgba16float`,usage:[`sample`,`storage`]}),this.uSunBake=this.uniforms.fields.sunBake,this.uSunBaked=this.uniforms.fields.sunBaked,this._sunBaked=!1;let e=1/this.shadowTexel;this.sunShadowKernel=new j({label:`Terrain Sun Shadow`,modules:[F],bindings:{terrainParams:{uniform:this.uniforms},terrainShadowHeights:{texture:this.shadowHeightTexture},terrainSunShadowOut:{storageTexture:this.sunShadowTexture,access:`write`}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	if ( gid.x >= ${ei}u || gid.y >= ${ei}u ) { return; }
	let ij = vec2f( gid.xy );
	let xz = ( ij + 0.5 ) / ${ei}.0 * terrainParams.size + terrainParams.origin;
	let L = terrainParams.sunBake;
	let lxz = max( length( L.xz ), 1e-4 );
	let dir = L.xz / lxz;
	let tanEl = L.y / lxz;
	var top = -1e4;
	var occ = 0.0;
	var t = f32( ${ti} );
	var dt = f32( ${ni} );
	for ( var i = 0; i < ${ii}; i++ ) {
		let q = xz + dir * t;
		let uv = ( q - terrainParams.origin ) / terrainParams.size;
		let hq = textureSampleLevel( terrainShadowHeights, smpLinearClamp, uv, log2( max( dt * ${e.toFixed(8)}, 1.0 ) ) ).x;
		let v = hq - t * tanEl;
		if ( v > top ) {
			top = v;
			occ = t;
		}
		dt *= ${ri};
		t += dt;
	}
	textureStore( terrainSunShadowOut, vec2u( gid.xy ), vec4f( top, occ, 0.0, 1.0 ) );
}
`})}updateSunShadow(e,t=!1){let n=h.sunDir.value;return!t&&this._sunBaked&&n.angleTo(this.uSunBake.value)<.0015?!1:(this.uSunBake.value.copy(n),this.sunShadowKernel.dispatch([ei/8,ei/8,1]),this._sunBaked=!0,this.uSunBaked.value=1,!0)}setShoreField(e){this.shoreRes=e.res,this.shoreTexture.width===e.res?this.shoreTexture.upload(e.data):(this.shoreTexture.destroy(),this.shoreTexture=ai(e.data,e.res,e.res,`rgba32float`,`terrainShoreField`)),this.uniforms.fields.shoreRes.value=e.res}},si=`
fn terrainUvOf( xz: vec2f ) -> vec2f {
	return ( xz - terrainParams.origin ) / terrainParams.size;
}

// exact bilinear height at world xz (matches TerrainData.heightAt)
fn terrainHeightAt( xz: vec2f ) -> f32 {
	let res = terrainParams.res;
	let f = ( xz - terrainParams.origin ) / terrainParams.size * res - 0.5;
	let fc = clamp( f, vec2f( 0.0 ), vec2f( res - 1.001 ) );
	let i = floor( fc );
	let t = fract( fc );
	let ii = vec2i( i );
	let a = textureLoad( terrainHeightTex, ii, 0 ).x;
	let b = textureLoad( terrainHeightTex, ii + vec2i( 1, 0 ), 0 ).x;
	let c = textureLoad( terrainHeightTex, ii + vec2i( 0, 1 ), 0 ).x;
	let d = textureLoad( terrainHeightTex, ii + vec2i( 1, 1 ), 0 ).x;
	let h = mix( mix( a, b, t.x ), mix( c, d, t.x ), t.y );
	// outside the domain: deep ocean floor
	let outside = f.x < 0.0 || f.y < 0.0 || f.x > res - 1.0 || f.y > res - 1.0;
	return select( h, -90.0, outside );
}

// filtered normal (xz components), rock mask, ambient occlusion
fn terrainNormalRock( xz: vec2f ) -> vec4f {
	let s = textureSample( terrainNormalTex, smpLinearClamp, terrainUvOf( xz ) );
	return vec4f( s.xy * 2.0 - 1.0, s.z, s.w );
}
// explicit mip (e.g. in the vertex stage)
fn terrainNormalRockLevel( xz: vec2f, level: f32 ) -> vec4f {
	let s = textureSampleLevel( terrainNormalTex, smpLinearClamp, terrainUvOf( xz ), level );
	return vec4f( s.xy * 2.0 - 1.0, s.z, s.w );
}
fn terrainNormalAt( xz: vec2f ) -> vec3f {
	let nr = terrainNormalRockLevel( xz, 0.0 );
	return normalize( vec3f( nr.x, sqrt( max( 1.0 - nr.x * nr.x - nr.y * nr.y, 0.0025 ) ), nr.y ) );
}

// loose sand, worn ground / paths, gullies (land) or seagrass (seabed), seabed rubble (the
// eroded beach scarp face on land)
fn terrainSplat( xz: vec2f ) -> vec4f {
	return textureSample( terrainSplatTex, smpLinearClamp, terrainUvOf( xz ) );
}
fn terrainSplatLevel( xz: vec2f, level: f32 ) -> vec4f {
	return textureSampleLevel( terrainSplatTex, smpLinearClamp, terrainUvOf( xz ), level );
}

// shore field: (T, dirX, dirZ, exposure), bilinear via loads (float32 data)
fn terrainShoreSample( xz: vec2f ) -> vec4f {
	let res = terrainParams.shoreRes;
	let f = ( xz - terrainParams.origin ) / terrainParams.size * res - 0.5;
	let fc = clamp( f, vec2f( 0.0 ), vec2f( max( res - 1.001, 0.0 ) ) );
	let i = floor( fc );
	let t = fract( fc );
	let ii = vec2i( i );
	let mx = vec2i( max( i32( res ) - 1, 0 ) );
	let a = textureLoad( terrainShoreTex, ii, 0 );
	let b = textureLoad( terrainShoreTex, min( ii + vec2i( 1, 0 ), mx ), 0 );
	let c = textureLoad( terrainShoreTex, min( ii + vec2i( 0, 1 ), mx ), 0 );
	let d = textureLoad( terrainShoreTex, min( ii + vec2i( 1, 1 ), mx ), 0 );
	return mix( mix( a, b, t.x ), mix( c, d, t.x ), t.y );
}

// 0 (in the terrain's shadow) .. 1 (lit) for a world position, soft penumbra that widens with the
// occluder distance
fn terrainSunShadowAt( P: vec3f ) -> f32 {
	let N = f32( textureDimensions( terrainSunShadowTex ).x );
	let st = clamp( terrainUvOf( P.xz ) * N - 0.5, vec2f( 0.0 ), vec2f( N - 1.001 ) );
	let i = vec2i( floor( st ) );
	let t = fract( st );
	let s = mix(
		mix( textureLoad( terrainSunShadowTex, i, 0 ), textureLoad( terrainSunShadowTex, i + vec2i( 1, 0 ), 0 ), t.x ),
		mix( textureLoad( terrainSunShadowTex, i + vec2i( 0, 1 ), 0 ), textureLoad( terrainSunShadowTex, i + vec2i( 1, 1 ), 0 ), t.x ),
		t.y
	);
	let w = s.y * 0.012 + 0.35;
	return mix( 1.0, smoothstep( -w, w, P.y - s.x ), terrainParams.sunBaked );
}
`,ci=[62,87],li=class{constructor({scene:e,terrainData:n,terrainGPU:r,gridSize:i=40,rangeFactor:a=2,sunShadow:o=!0,renderer:s=null}){this.data=n,this.gpu=r;let c=n.size/2;this.lod=new Tn({gridSize:i,leafSize:8,levels:9,heightBounds:(e,t,r,i)=>n.boundsFor(e,t,r,i),center:{x:-c,z:-c,size:n.size},rangeFactor:a,prefix:`terrainLod`}),this.wetness=null,this.sunShadow=o,this.renderer=s,this.uViewPos={value:new t},this.gustOffset=new p;let l=this.material=D({name:`Terrain`,roughness:.9,metalness:0,uniforms:{viewPos:[`vec3f`,this.uViewPos.value],wetDarken:[`f32`,.58],gustOffset:[`vec2f`,this.gustOffset]},attributes:{nodeData:`vec4f`}});this.params={wetDarken:l.uniforms.wetDarken},this.uViewPos=l.uniforms.viewPos,l.vertex=`
	// CDLOD vertex (same lattice snapping and geomorph as the CDLOD module) morphing toward viewPos
	let snapped = terrainLodSnapped( v.nodeData, v.position.xz );
	let y0 = terrainHeightAt( snapped );
	let cv = terrainLodMorph( v.nodeData, v.position.xz, mat.viewPos, y0 );
	v.useWorld = true;
	v.worldPos = vec3f( cv.worldXZ.x, terrainHeightAt( cv.worldXZ ), cv.worldXZ.y );
	v.worldNormal = vec3f( 0.0, 1.0, 0.0 );
`,this.finalizeMaterial(),this.mesh=new ve(this.lod.geometry,l),this.mesh.frustumCulled=!1,this.mesh.receiveShadow=!0,this.mesh.castShadow=!0,this.mesh.staticVelocity=!0,this.mesh.name=`Terrain`,e.add(this.mesh)}finalizeMaterial(){let e=this.material,t=[this.gpu.module,O(),this.lod.module];this.wetness&&(t.push(...this.wetness.modules||[]),t.push(new g({name:`terrainWetness`,deps:[this.gpu.module,...this.wetness.modules||[]],code:this.wetness.code}))),t.push(new g({name:`terrainMaterial`,deps:[this.gpu.module,O()],code:ui})),e.modules=t,e.defines.HAS_WETNESS=+!!this.wetness,e.defines.MATERIAL_SUN_MODULATION=+!!this.sunShadow,e.surface=di,e.needsUpdate=!0}update(e){e.getWorldPosition(this.uViewPos.value),this.lod.update(e);let t=h.windDir.value,n=.7*h.windSpeed.value+1.5,r=h.dt.value;this.gustOffset.x+=t.x*n*r,this.gustOffset.y+=t.y*n*r,this.gpu.updateSunShadow(this.renderer)}},z=k,ui=`
// meadow weight of the current fragment (written by the surface, read by the sun modulation)
var<private> terMeadowW: f32 = 0.0;

// tall grass shades itself when the sun is low (the meadow darkens and gains contrast)
fn materialSunModulation( P: vec3f, N: vec3f ) -> vec3f {
	let grass = mix( 1.0, smoothstep( -0.05, 0.45, frame.sunDir.y ) * 0.35 + 0.62, terMeadowW );
	return vec3f( terrainSunShadowAt( P ) * grass );
}

// Travelling gust field in [0, 1] (VegNodes gustAt): noise of (worldXZ - windDir * t * speed),
// where the time-integrated offset comes from mat.gustOffset. Two fetches of the detail texture's
// fbm channel (~35 m and ~15 m gust cells).
fn terGustAt( xz: vec2f, offset: vec2f ) -> f32 {
	let p = xz - offset;
	let n = textureSampleLevel( terrainDetailTex, smpLinearRepeat, p / 140.0, 0.0 ).w * 0.62
		+ textureSampleLevel( terrainDetailTex, smpLinearRepeat, p / 61.0 + 0.37, 0.0 ).w * 0.38;
	return smoothstep( 0.46, 0.6, n );
}

// ---- wetness (swash zone) from the shore system, else a static damp band
fn terWetFoam( xz: vec2f, h: f32 ) -> vec2f {
#if HAS_WETNESS
	return terrainWetness( xz, h );
#else
	return vec2f( smoothstep( 0.5, 0.0, h ), 0.0 );
#endif
}

fn terDetail( uv: vec2f ) -> vec4f {
	return textureSample( terrainDetailTex, smpAniso4Repeat, uv );
}
`,di=`
	let p = in.P;
	let xz = p.xz;
	let h = p.y;
	var outRough = 0.9;
	var outN = vec3f( 0.0, 1.0, 0.0 );
	var outAO = 1.0;
	var albedoOut = vec3f( 0.0 );

	// ---- data maps
	let nr = terrainNormalRock( xz );
	let N0 = normalize( vec3f( nr.x, sqrt( max( 1.0 - nr.x * nr.x - nr.y * nr.y, 0.0025 ) ), nr.y ) );
	let sp = terrainSplat( xz );
	let slope = 1.0 - N0.y;
	let camDist = length( frame.cameraPos - p );
	let dpx = dpdx( p ); let dpy = dpdy( p );
	let fwY = fwidth( h );

	// ---- deep seabed (seen through the water: no rock, land cover, swash or wind ripples),
	// the same colour / relief / AO as the full path below, from 6 detail samples instead of ~17
	// detail samples shared by both paths (sampled in uniform control flow: no derivative seams
	// where the paths meet)
	let macroA = terDetail( ${E(`xz`,.7)} / 173.0 ).w;
	let macroB = terDetail( ${E(`xz`,2.1)} / 47.0 ).w;
	let mcr = macroA * 0.6 + macroB * 0.4;
	let dN = terDetail( xz / 1.9 );
	let dM = terDetail( ${E(`xz`,1.3)} / 6.7 + 0.21 );
	let dF = terDetail( ${E(`xz`,2.4)} / 0.63 + 0.53 );
	let grain = min( dN.z, 0.62 );
	let grainF = min( dF.z, 0.62 );
#if REFRACTION_CLIP
	// the refraction source (half resolution, seen blurred through the water): every non-rock
	// fragment under the water takes the cheap seabed path
	let seabedPath = h < 0.4 && nr.z < 0.05;
#else
	let seabedPath = h < -0.8 && nr.z < 0.05 && slope < 0.18;
#endif
	let sw = vec2f( ${re.swellDir.x}, ${re.swellDir.y} );
	let swDir = sw;
	let rc = vec2f( ${re.reef.center.x.toFixed(3)}, ${re.reef.center.z.toFixed(3)} );
	// ripple phases of both paths (identical there), differentiated in uniform control flow
	let ph2 = dot( xz, swDir ) * ( 6.2832 / 0.75 ) + dM.w * 16.0 + macroB * 24.0;
	let fade2 = 1.0 - smoothstep( 0.5, 2.0, fwidth( ph2 ) );
	let rip2 = pow( sin( ph2 ) * 0.5 + 0.5, 1.4 );
	let ph3 = dot( xz, swDir ) * ( 6.2832 / 0.16 ) + dM.w * 26.0 + dN.w * 5.0;
	let fade3 = 1.0 - smoothstep( 0.6, 2.2, fwidth( ph3 ) );
	let rip3 = pow( sin( ph3 ) * 0.5 + 0.5, 1.5 );
	// bump height of either path: the surface-gradient bump runs after the branch (its screen-space
	// derivatives would be undefined in quads that straddle the two paths)
	var hdOut = 0.0;
	if ( seabedPath ) {

		let underW = 1.0;
		let sandW = smoothstep( 0.3, 0.72, sp.x + ( dM.z - 0.5 ) * 0.5 + ( mcr - 0.5 ) * 0.35 );
		// ---- seabed: sand with ripple fields, seagrass meadows, rubble heads
		let depth = -h;
		let reefD = length( xz - rc );
		let reefW = 1.0 - smoothstep( ${re.reef.radius*.5}, ${re.reef.radius*1.15}, reefD + ( mcr - 0.5 ) * 30.0 );
		var under = mix( ${z(.84,.78,.64)}, ${z(.72,.7,.58)}, smoothstep( 1.0, 9.0, depth ) );
		under = under * ( ( dM.w - 0.5 ) * 0.14 + 1.0 ) * ( ( grain - 0.45 ) * 0.25 + 1.0 );
		// megaripple fields (~0.75 m) across the swell, troughs collect darker shell hash; not in
		// the swash zone or the first metre of depth
		let fieldW = smoothstep( 0.42, 0.62, macroB + ( dM.w - 0.5 ) * 0.35 ) * smoothstep( 0.9, 2.0, depth ) * ( 1.0 - reefW );
		under = under * ( ( rip2 - 0.55 ) * 0.22 * fieldW * fade2 + 1.0 );
		// small wave ripples (~0.16 m) everywhere below the swash
		// seagrass meadows: ragged edges, blade streaks leaning with the wave surge, epiphyte tips
		// (the fringe breaks up into clumps: noise at three scales thresholds the soft splat edge)
		let clumps = ( dM.w - 0.5 ) * 0.5 + ( dN.y - 0.45 ) * 0.4 + ( macroB - 0.5 ) * 0.3;
		let seagrassW = smoothstep( 0.3, 0.55, sp.z + clumps ) * underW * smoothstep( 0.3, 0.9, depth );
		let swPerp = vec2f( -swDir.y, swDir.x );
		let blades = terDetail( vec2f( dot( xz, swDir ) / 2.6, dot( xz, swPerp ) / 0.35 ) ).y;
		var meadow = mix( ${z(.12,.16,.07)}, ${z(.27,.29,.15)}, smoothstep( 0.35, 0.75, blades ) );
		meadow = mix( meadow, ${z(.24,.2,.11)}, smoothstep( 0.55, 0.8, dM.y + ( macroB - 0.5 ) * 0.4 ) * 0.5 );
		// sparse at the fringe: sand shows between the blades; thinner, paler patches inside
		meadow = mix( under, meadow, smoothstep( 0.3, 0.85, sp.z + clumps * 0.5 ) * 0.35 + 0.65 );
		meadow = mix( meadow, mix( meadow, under, 0.45 ), smoothstep( 0.58, 0.8, macroB + ( dM.w - 0.5 ) * 0.4 ) );
		under = mix( under, meadow, seagrassW );
		// rubble heads: coral rubble and rock turfed with algae, pink coralline crusts
		let rubbleW = smoothstep( 0.3, 0.6, sp.w + ( dN.x - 0.5 ) * 0.4 + ( dM.w - 0.5 ) * 0.3 ) * underW;
		var rubble = mix( ${z(.2,.19,.15)}, ${z(.36,.33,.26)}, smoothstep( 0.3, 0.7, dN.x ) );
		rubble = mix( rubble, ${z(.2,.24,.1)}, smoothstep( 0.5, 0.7, dF.y ) * 0.6 );
		rubble = mix( rubble, ${z(.58,.38,.44)}, smoothstep( 0.62, 0.74, dM.x ) * 0.6 );
		under = mix( under, rubble, rubbleW );
		// reef flat: coral rubble and pink crusts toward the reef
		under = mix( under, mix( ${z(.56,.5,.44)}, ${z(.6,.43,.46)}, smoothstep( 0.45, 0.7, dM.x ) ), reefW * 0.7 * smoothstep( 0.4, 0.6, dN.x ) );

		// damp sand below the berm (wet = 0 under water)
		let dampMottle = smoothstep( 0.3, 0.7, dM.w + ( dN.y - 0.45 ) * 0.6 + ( macroB - 0.5 ) * 0.4 );
		let wetK = smoothstep( 1.7, 0.5, h + dM.w * 0.3 ) * sandW * mix( 0.22, 0.5, dampMottle );
		let wetAlbedo = terrainSaturation( under * mat.wetDarken, 1.15 ) * vec3f( 0.97, 0.98, 1.0 );
		albedoOut = mix( under, wetAlbedo, wetK );
		outRough = 0.75;
		let waveR = rip3 * 0.012 * fade3 * smoothstep( -0.3, -0.9, h ) * ( 1.0 - seagrassW );
		let megaR = rip2 * 0.035 * fade2 * fieldW * ( 1.0 - seagrassW );
		let sandH = grain * 0.004 + grainF * 0.003 + waveR + megaR;
		let seabedH = seagrassW * ( blades * 0.05 + 0.08 ) + rubbleW * ( dN.x * 0.07 + dF.x * 0.015 );
		hdOut = sandH + seabedH;
		outAO = nr.w * ( 1.0 - seagrassW * 0.3 ) * ( 1.0 - rubbleW * smoothstep( 0.55, 0.2, dN.x ) * 0.35 );
		terMeadowW = 0.0;

	} else {

		// ---- detail samples (tileable heights: x rock, y soil, z sand, w fbm)
		// sand grain without the pebble peaks (pebbles are drawn separately where they belong)

		// ---- downslope streaks (rock flutes, hanging vegetation, landslide scars): the detail
		// texture stretched vertically on the two vertical projection planes
		let sw4 = pow( abs( N0.xz ), vec2f( 4.0 ) );
		let swN = sw4 / ( sw4.x + sw4.y + 1e-5 );
		// (everything they shape is weighted by the slope and vanishes at 0.28 or less: explicit
		// gradients in the branch, the same as the implicit ones of the full-screen quad)
		var streak = 0.5; var scar = 0.5;
		if ( slope > 0.28 ) {
			let stA = textureSampleGrad( terrainDetailTex, smpAniso4Repeat, vec2f( p.z / 9.3, h / 37.0 ), vec2f( dpx.z / 9.3, dpx.y / 37.0 ), vec2f( dpy.z / 9.3, dpy.y / 37.0 ) );
			let stB = textureSampleGrad( terrainDetailTex, smpAniso4Repeat, vec2f( p.x / 9.3 + 0.5, h / 37.0 + 0.3 ), vec2f( dpx.x / 9.3, dpx.y / 37.0 ), vec2f( dpy.x / 9.3, dpy.y / 37.0 ) );
			streak = stA.w * swN.x + stB.w * swN.y;
			scar = stA.y * swN.x + stB.y * swN.y;
		}

		// ---- rock: only evaluated where the rock mask or the slope allow it. Exposure follows the
		// form: steep faces, convex spurs and ridges (high AO) go bare, gully floors (low AO,
		// drainage lines) keep soil and plants; noise and fall-line streaks break the outline up.
		// Around the bare rock a band of scree / dark soil and moss; plants creep over it.
		let gully = sp.z * smoothstep( -0.5, 0.5, h );
		var rockAlbedo = vec3f( 0.2 ); var rockRough = 0.8; var rockHd = 0.0;
		var rockW = 0.0; var screeW = 0.0;
		let cliffK = smoothstep( 0.28, 0.55, slope );
		let convex = smoothstep( 0.5, 0.85, nr.w );
		// rv below, without the rock's own relief term, which adds at most 0.1925 (R.height <= 1): where
		// even that can't reach the scree band (0.28), rock and scree weigh 0 and the rock isn't shaded
		let rvBound = nr.z * 0.7 + smoothstep( 0.3, 0.62, slope ) * 0.5 + convex * 0.14 - gully * 0.4
			+ ( dM.w - 0.5 ) * 0.34 + ( dN.w - 0.5 ) * 0.22 + ( streak - 0.5 ) * 1.0 * cliffK + 0.2;
		if ( ( nr.z > 0.06 || slope > 0.3 ) && rvBound > 0.28 ) {

			var g: RockGrad;
			g.dpdx = dpx; g.dpdy = dpy; g.fwY = fwY; g.useGrad = true;
			let R = terrainRockSurface( p, N0, h, mcr, 0.5, 1.0, g );
			let rv = nr.z * 0.7 + smoothstep( 0.3, 0.62, slope ) * 0.5 + convex * 0.14 - gully * 0.4
				+ ( R.height - 0.45 ) * 0.35 + ( dM.w - 0.5 ) * 0.34 + ( dN.w - 0.5 ) * 0.22
				+ ( streak - 0.5 ) * 1.0 * cliffK;
			// fades to 0 at the branch boundary: no step along the slope / mask iso-lines
			let branchK = max( smoothstep( 0.06, 0.18, nr.z ), smoothstep( 0.3, 0.42, slope ) );
			rockW = smoothstep( 0.5, 0.68, rv ) * branchK;
			screeW = smoothstep( 0.28, 0.52, rv ) * branchK * ( 1.0 - rockW );
			// weathered basalt: darker and browner than the sea-cliff palette, streaked; moss and
			// ferns on the ledges and on the less steep parts of the faces
			// dark wet stains down the fall line, paler dry ribs between them
			let stain = smoothstep( 0.5, 0.7, streak ) * cliffK;
			// dark, weathered basalt (the island's inland rock is darker and browner than the pale
			// sea-cliff palette), stained down the fall line
			var basalt = R.albedo * vec3f( 0.36, 0.34, 0.31 ) * ( 1.0 - stain * 0.45 ) * ( smoothstep( 0.42, 0.25, streak ) * cliffK * 0.15 + 1.0 );
			// soil and humus caught in the joints and hollows of the rock (low relief), so the face
			// reads as fractured stone instead of a smooth plate
			let joints = smoothstep( 0.42, 0.22, R.height + ( dN.w - 0.5 ) * 0.25 );
			basalt = mix( basalt, mix( ${z(.13,.1,.07)}, ${z(.2,.2,.1)}, dF.y ), joints * 0.7 );
			// moss / small plants on every ledge and on the less steep parts, more near the edges
			let ledgeMoss = smoothstep( 0.4, 0.75, N0.y + ( dN.y - 0.45 ) * 0.6 ) * smoothstep( 0.25, 0.55, macroB + dM.y * 0.4 );
			let fringe = smoothstep( 0.5, 0.58, rv ) * smoothstep( 0.8, 0.6, rv ) * smoothstep( 0.3, 0.6, dM.w + dN.y * 0.4 );
			let mossK = sat( max( ledgeMoss * 0.75, fringe * 0.8 ) + R.moss * 0.3 + joints * 0.25 );
			rockAlbedo = mix( basalt, mix( ${z(.12,.17,.05)}, ${z(.22,.26,.09)}, dF.y ), mossK );
			rockRough = R.rough;
			// craggier than the boulders: the big blocks and plates stand out from afar
			rockHd = R.hd * 2.2 + R.height * 0.6;

		}

		// ---- weights
		let notRock = 1.0 - rockW;
		let underW = smoothstep( 0.12, -0.6, h );
		let landW = 1.0 - underW;
		let sandW = smoothstep( 0.3, 0.72, sp.x + ( dM.z - 0.5 ) * 0.5 + ( mcr - 0.5 ) * 0.35 ) * notRock;
		let pathW = smoothstep( 0.28, 0.62, sp.y + ( dN.y - 0.45 ) * 0.4 + ( dM.w - 0.5 ) * 0.25 ) * notRock * landW
			* ( 1.0 - smoothstep( 50.0, 220.0, camDist ) * 0.85 );
		// forest on the higher / steeper ground and in the gullies, tall-grass meadow on the valley
		// floor and around the village (same classification as the vegetation's land cover)
		let jungleW = sat( smoothstep( 9.0, 24.0, h + ( mcr - 0.5 ) * 18.0 ) + smoothstep( 0.18, 0.36, slope ) + gully * 0.6 );
		// landslide scars: raw red-brown laterite in streaks down steep slopes, rare
		let lateriteW = smoothstep( 0.62, 0.74, scar + ( macroB - 0.5 ) * 0.3 ) * smoothstep( 0.3, 0.42, slope )
			* smoothstep( 0.52, 0.66, mcr ) * notRock * 0.85;

		// ---- beach sand: pale coral sand, drifts of warmer / coarser sand, grain
		let dryK = smoothstep( 0.8, 3.0, h );
		var sand = mix( ${z(.83,.75,.6)}, ${z(.9,.84,.72)}, smoothstep( 0.3, 0.72, mcr + dryK * 0.2 ) );
		sand = mix( sand, ${z(.84,.72,.55)}, smoothstep( 0.55, 0.8, dM.w + ( macroB - 0.5 ) * 0.6 ) * 0.45 );
		sand = sand * ( ( dM.w - 0.5 ) * 0.16 + 1.0 ) * ( ( dN.w - 0.5 ) * 0.1 + 1.0 );
		sand = sand * ( ( grain - 0.45 ) * 0.3 + 0.97 ) * ( ( grainF - 0.45 ) * 0.2 + 1.0 );
		// disturbed / trodden patches: slightly darker, coarser sand (footfall, crabs, wind scour)
		let trod = smoothstep( 0.52, 0.7, dN.y + ( dM.y - 0.5 ) * 0.6 ) * dryK;
		sand = sand * ( 1.0 - trod * 0.07 );
		// the high-water band collects shell grit, coral bits and dried seaweed
		let hw = h + ( dM.w - 0.5 ) * 0.5;
		let wrackBand = smoothstep( 1.15, 1.4, hw ) * smoothstep( 2.1, 1.7, hw );
		let pebDensity = smoothstep( 0.62, 0.85, macroB + dM.w * 0.3 ) * 0.2 + wrackBand * smoothstep( 0.3, 0.6, dM.y );
		let pebW = smoothstep( 0.66, 0.8, dN.z ) * sat( pebDensity ) * smoothstep( 0.6, 0.9, sp.x ) * landW
			* ( 1.0 - smoothstep( 12.0, 35.0, camDist ) );
		let pebCol = mix( mix( ${z(.86,.82,.74)}, ${z(.78,.64,.6)}, smoothstep( 0.45, 0.75, dM.x ) ), ${z(.36,.33,.3)}, smoothstep( 0.74, 0.82, dM.y ) );
		sand = mix( sand, pebCol, pebW * 0.75 );
		let wrack = wrackBand * smoothstep( 0.58, 0.72, dN.y ) * smoothstep( 0.4, 0.6, macroB );
		sand = mix( sand, ${z(.24,.18,.11)}, wrack * 0.8 );
		// trampled sand along the paths
		sand = sand * ( 1.0 - pathW * 0.07 );

		// wind ripples on the dry sand: crests across the wind (bent by the fbm), wavelength
		// ~10.5 cm, fading where trodden; visible in the albedo too (finer sand on the crests).
		// (A wavelength varying in space must not divide the absolute coordinate: the phase then
		// swings by x * dλ / λ², which at 100 m from the origin turned the ripples into patches
		// of random direction and spacing with seams and moiré, and made fwidth switch them off
		// in blotches. The spacing varies through the smooth warp instead.)
		let wd = frame.windDir;
		let ph1 = dot( xz, wd ) * ( 6.2832 / 0.105 ) + dM.w * 24.0 + dN.w * 7.0 + macroB * 30.0;
		let fade1 = 1.0 - smoothstep( 0.6, 2.2, fwidth( ph1 ) );
		let rip1 = pow( sin( ph1 ) * 0.5 + 0.5, 1.6 );
		let windK = fade1 * smoothstep( 1.5, 2.2, h ) * ( 1.0 - pathW ) * ( 1.0 - trod * 0.7 )
			* smoothstep( 0.2, 0.5, macroB + dM.w * 0.3 );
		sand = sand * ( ( rip1 - 0.5 ) * 0.12 * windK + 1.0 );

		// ---- seabed: sand with ripple fields, seagrass meadows, rubble heads (only below the berm:
		// everything here is weighted by underW, 0 on land)
		let depth = -h;
		var fieldW = 0.0; var seagrassW = 0.0; var blades = 0.0; var rubbleW = 0.0;
		var under = sand;
		if ( underW > 0.0 ) {
			let reefD = length( xz - rc );
			let reefW = 1.0 - smoothstep( ${re.reef.radius*.5}, ${re.reef.radius*1.15}, reefD + ( mcr - 0.5 ) * 30.0 );
			under = mix( ${z(.84,.78,.64)}, ${z(.72,.7,.58)}, smoothstep( 1.0, 9.0, depth ) );
			under = under * ( ( dM.w - 0.5 ) * 0.14 + 1.0 ) * ( ( grain - 0.45 ) * 0.25 + 1.0 );
			// megaripple fields (~0.75 m) across the swell, troughs collect darker shell hash; not in
			// the swash zone or the first metre of depth
			fieldW = smoothstep( 0.42, 0.62, macroB + ( dM.w - 0.5 ) * 0.35 ) * smoothstep( 0.9, 2.0, depth ) * ( 1.0 - reefW );
			under = under * ( ( rip2 - 0.55 ) * 0.22 * fieldW * fade2 + 1.0 );
			// small wave ripples (~0.16 m) everywhere below the swash
			// seagrass meadows: ragged edges, blade streaks leaning with the wave surge, epiphyte tips
			// (the fringe breaks up into clumps: noise at three scales thresholds the soft splat edge)
			let clumps = ( dM.w - 0.5 ) * 0.5 + ( dN.y - 0.45 ) * 0.4 + ( macroB - 0.5 ) * 0.3;
			seagrassW = smoothstep( 0.3, 0.55, sp.z + clumps ) * underW * smoothstep( 0.3, 0.9, depth );
			let swPerp = vec2f( -swDir.y, swDir.x );
			blades = terDetail( vec2f( dot( xz, swDir ) / 2.6, dot( xz, swPerp ) / 0.35 ) ).y;
			var meadow = mix( ${z(.12,.16,.07)}, ${z(.27,.29,.15)}, smoothstep( 0.35, 0.75, blades ) );
			meadow = mix( meadow, ${z(.24,.2,.11)}, smoothstep( 0.55, 0.8, dM.y + ( macroB - 0.5 ) * 0.4 ) * 0.5 );
			// sparse at the fringe: sand shows between the blades; thinner, paler patches inside
			meadow = mix( under, meadow, smoothstep( 0.3, 0.85, sp.z + clumps * 0.5 ) * 0.35 + 0.65 );
			meadow = mix( meadow, mix( meadow, under, 0.45 ), smoothstep( 0.58, 0.8, macroB + ( dM.w - 0.5 ) * 0.4 ) );
			under = mix( under, meadow, seagrassW );
			// rubble heads: coral rubble and rock turfed with algae, pink coralline crusts
			rubbleW = smoothstep( 0.3, 0.6, sp.w + ( dN.x - 0.5 ) * 0.4 + ( dM.w - 0.5 ) * 0.3 ) * underW;
			var rubble = mix( ${z(.2,.19,.15)}, ${z(.36,.33,.26)}, smoothstep( 0.3, 0.7, dN.x ) );
			rubble = mix( rubble, ${z(.2,.24,.1)}, smoothstep( 0.5, 0.7, dF.y ) * 0.6 );
			rubble = mix( rubble, ${z(.58,.38,.44)}, smoothstep( 0.62, 0.74, dM.x ) * 0.6 );
			under = mix( under, rubble, rubbleW );
			// reef flat: coral rubble and pink crusts toward the reef
			under = mix( under, mix( ${z(.56,.5,.44)}, ${z(.6,.43,.46)}, smoothstep( 0.45, 0.7, dM.x ) ), reefW * 0.7 * smoothstep( 0.4, 0.6, dN.x ) );
		}
		sand = mix( sand, under, underW );

		// ---- ground: tall-grass meadow (tone shared with the grass field), forest floor and, from
		// afar, the forest canopy; laterite scars
		let V = normalize( frame.cameraPos - p );
		let NdV = sat( dot( N0, V ) );
		let mt = terrainMeadowTone( macroA, macroB, slope, N0.z, dM.w * 0.65 + dN.w * 0.35, true );
		// clumps (1-3 m) and tussocks, blade-scale grain
		let clump = dM.w * 0.6 + dN.y * 0.4;
		// seen from afar the tussocks and their shadowed gaps are what makes tall grass read as
		// grass (not lawn): the clump contrast grows with distance as the blades fade out
		let clumpK = mix( 0.34, 0.95, smoothstep( 40.0, 140.0, camDist ) );
		var lawn = mt.tone * ( ( clump - 0.5 ) * clumpK + 1.0 ) * ( ( dF.y - 0.4 ) * 0.22 + 1.0 );
		lawn = lawn * mix( 1.0, smoothstep( 0.25, 0.55, dN.y * 0.5 + dM.y * 0.5 ) * 0.35 + 0.72, smoothstep( 50.0, 160.0, camDist ) );
		// grass combed along the wind: long streaks (anisotropic sample of the fbm channel)
		// (comb and gust only where the lawn shows: not under full forest, sand or water)
		let lawnShows = jungleW < 1.0 && landW > 0.0 && sandW < 1.0;
		var comb = 0.5;
		if ( lawnShows ) {
			let combUV = vec2f( dot( xz, frame.windDir ) / 7.5, dot( xz, vec2f( -frame.windDir.y, frame.windDir.x ) ) / 0.9 );
			comb = terDetail( combUV + vec2f( 0.31, 0.77 ) ).w;
			lawn = lawn * ( ( comb - 0.5 ) * 0.3 + 1.0 );
		}
		// seen from above the dark soil shows between the clumps; at grazing angles blade sides
		// cover everything (lighter, more saturated)
		let gapK = smoothstep( 0.3, 0.95, NdV ) * smoothstep( 0.62, 0.3, clump );
		lawn = mix( lawn, MEADOW_soil, gapK * 0.45 );
		lawn = mix( lawn, terrainSaturation( lawn * 1.12, 1.15 ), smoothstep( 0.45, 0.1, NdV ) * 0.6 );
		// travelling gusts flatten the grass: the paler blade backs show as waves (same gust
		// field as the grass blades)
		let windStrength = max( frame.windSpeed * 0.1, 0.03 );
		if ( lawnShows ) {
			let gust = terGustAt( xz, mat.gustOffset ) * sat( windStrength * 0.5 );
			lawn = mix( lawn, lawn * vec3f( 1.25, 1.22, 1.06 ) + 0.01, gust * 0.6 );
		}
		// bare trodden soil in places, sandy soil toward the beach
		lawn = mix( lawn, ${z(.4,.33,.23)}, smoothstep( 0.72, 0.84, dN.y + ( dM.y - 0.5 ) * 0.5 ) * 0.25 );
		lawn = mix( lawn, ${z(.6,.52,.38)}, sat( sp.x * 1.6 ) * smoothstep( 0.45, 0.62, dN.z + dM.y * 0.3 ) * 0.7 );
		// inside the geometric grass field (GrassField) the ground is only seen between the blades:
		// the shaded base of the sward, dark and brownish with dead leaves; it hands over to the
		// sward's own look (above) where the blades thin out
		let grassHere = smoothstep( 2.5, 4.5, h ) * ( 1.0 - smoothstep( 0.45, 0.85, jungleW ) ) * ( 1.0 - sat( sp.x * 1.6 ) );
		let fieldK = ( 1.0 - smoothstep( ${ci[0].toFixed(1)}, ${ci[1].toFixed(1)}, length( p.xz - frame.cameraPos.xz ) ) ) * grassHere;
		let swardBase = mix( mt.tone * 0.4, MEADOW_soil, 0.4 ) * ( ( dN.y - 0.45 ) * 0.6 + 1.0 ) * ( ( dF.y - 0.4 ) * 0.3 + 1.0 );
		lawn = mix( lawn, swardBase, fieldK * 0.85 );
		let litter = mix( ${z(.2,.15,.09)}, ${z(.34,.25,.13)}, dF.y );
		var jungle = mix( ${z(.1,.16,.05)}, litter, smoothstep( 0.52, 0.7, dN.y ) );
		jungle = mix( jungle, ${z(.12,.1,.06)}, gully * 0.3 );
		let far = smoothstep( 40.0, 160.0, camDist );
		var cover = mix( ${z(.08,.13,.04)}, ${z(.17,.24,.07)}, smoothstep( 0.3, 0.7, mcr ) );
		cover = mix( cover, ${z(.27,.29,.12)}, smoothstep( 0.66, 0.84, macroB + dM.w * 0.2 ) * 0.45 );
		jungle = mix( jungle, cover, far * 0.8 );
		jungle = jungle * ( ( mcr - 0.5 ) * 0.3 + 1.0 );
		// canopy: seen from a distance (or on slopes too steep for the trees) the forest reads as
		// a carpet of lumpy crowns with dark gaps
		let canopyW = jungleW * max( smoothstep( 0.2, 0.4, slope ), smoothstep( 90.0, 260.0, camDist ) ) * smoothstep( 25.0, 70.0, camDist ) * notRock * ( 1.0 - screeW * 0.7 );
		var canopyH = 0.0;
		if ( canopyW > 0.0 ) {
			let crowns = terDetail( ${E(`xz`,.9)} / 61.0 ).w;
			let crownsB = terDetail( ${E(`xz`,2.3)} / 13.0 + 0.37 ).w;
			canopyH = smoothstep( 0.32, 0.7, crowns * 0.45 + crownsB * 0.4 + dM.w * 0.15 );
			var canopy = mix( ${z(.05,.08,.025)}, mix( ${z(.14,.21,.06)}, ${z(.22,.27,.09)}, macroB ), canopyH );
			// steep faces: the canopy hangs in streaks down the fall line
			canopy = canopy * ( ( streak - 0.5 ) * 0.5 * smoothstep( 0.3, 0.5, slope ) + 1.0 );
			jungle = mix( jungle, canopy, canopyW );
		}
		var ground = mix( lawn, jungle, jungleW );
		// around the bare rock: dark humus, stones and moss, with the surrounding plants creeping
		// in (a soft, noisy band; no speckle)
		let creepIn = smoothstep( 0.4, 0.75, dM.w + ( dN.y - 0.45 ) * 0.5 + ( macroB - 0.5 ) * 0.3 );
		var scree = mix( ${z(.16,.13,.1)}, ${z(.27,.24,.2)}, smoothstep( 0.45, 0.75, dM.x + ( dN.x - 0.5 ) * 0.3 ) );
		scree = mix( scree, mix( ${z(.13,.18,.06)}, ${z(.22,.26,.09)}, dF.y ), smoothstep( 0.45, 0.7, dM.y + ( dN.y - 0.45 ) * 0.5 ) * 0.7 );
		ground = mix( ground, scree, screeW * ( 1.0 - creepIn * 0.7 ) );
		let laterite = mix( ${z(.42,.25,.16)}, ${z(.52,.36,.24)}, dM.w ) * ( ( dN.y - 0.4 ) * 0.3 + 1.0 );
		ground = mix( ground, laterite, lateriteW );

		// ---- worn dirt paths / trampled ground (darker, redder soil in the forest)
		var dirt = mix( ${z(.38,.31,.23)}, ${z(.5,.43,.32)}, dM.w ) * ( ( dN.y - 0.4 ) * 0.35 + 0.95 );
		dirt = mix( dirt, ${z(.3,.22,.15)}, jungleW * 0.7 );
		dirt = mix( dirt, ${z(.56,.53,.48)}, smoothstep( 0.72, 0.82, dN.z ) * 0.5 );
		// grass creeping onto the trail, a grassy strip between the two worn ruts
		let creep = smoothstep( 0.45, 0.7, dN.y + ( dF.y - 0.45 ) * 0.5 ) * smoothstep( 0.9, 0.5, sp.y );
		dirt = mix( dirt, lawn, creep * 0.8 );

		// ---- combine
		let meadowW = ( 1.0 - jungleW ) * ( 1.0 - pathW ) * notRock * ( 1.0 - sandW ) * landW * ( 1.0 - screeW );
		terMeadowW = meadowW;
		var albedo = mix( ground, dirt, pathW );
		albedo = mix( albedo, sand, max( sandW, underW * notRock ) );
		albedo = mix( albedo, rockAlbedo, rockW );

		// ---- eroded beach scarp (splat alpha on land): storm-cut face of the foredune. Layered
		// sandy soil (laminae of paler and darker sand, darker humus-stained patches), live roots
		// and pale dead-root tangles hanging out of the face, damp darker sand at the toe.
		let scarpW = sat( sp.w * 1.6 ) * landW * notRock;
		var scarpH = 0.0;
		if ( scarpW > 0.003 ) {

			// laminae: thin storm layers, warped and wedging out, with a set of cross-beds at a low angle
			let tanF = normalize( vec2f( -N0.z, N0.x ) + vec2f( 1e-4, 0.0 ) );
			let alongF = dot( xz, tanF );
			let hw = h + ( dM.w - 0.5 ) * 0.5 + ( dN.w - 0.5 ) * 0.12 + ( macroB - 0.5 ) * 0.35;
			let lam = sin( hw * ( 6.2832 / 0.11 ) + dN.x * 2.0 ) * 0.5 + 0.5;
			let cross = sin( ( hw + alongF * 0.09 ) * ( 6.2832 / 0.075 ) ) * 0.5 + 0.5;
			let lamB = smoothstep( 0.3, 0.7, sin( ( hw + dM.y * 0.4 ) * ( 6.2832 / 0.43 ) ) * 0.5 + 0.5 );
			let layerMix = mix( lam, cross, smoothstep( 0.4, 0.6, dM.x ) );
			var soil = mix( ${z(.5,.42,.31)}, ${z(.68,.6,.46)}, smoothstep( 0.3, 0.8, layerMix ) * 0.45 + lamB * 0.2 + ( grain - 0.45 ) * 0.5 + ( dM.w - 0.5 ) * 0.3 );
			// humus-stained, rootier soil in patches (the old dune surface caught in the cut)
			soil = mix( soil, ${z(.26,.2,.14)}, smoothstep( 0.55, 0.8, dM.y + ( macroB - 0.5 ) * 0.5 ) * 0.55 );
			// roots: horizontal coordinate along the face, stretched down the fall line
			let ru = terDetail( vec2f( dot( xz, tanF ) / 0.8, h / 0.5 ) + vec2f( 0.37, 0.11 ) );
			let rv = terDetail( vec2f( dot( xz, tanF ) / 1.7 + h * 0.6, h / 0.9 ) + vec2f( 0.71, 0.29 ) );
			let rootLive = smoothstep( 0.035, 0.0, abs( ru.x - 0.5 ) ) * smoothstep( 0.45, 0.62, ru.w );
			let rootDead = smoothstep( 0.03, 0.0, abs( rv.z - 0.52 ) ) * smoothstep( 0.5, 0.66, rv.y );
			soil = mix( soil, ${z(.17,.12,.08)}, rootLive * 0.85 );
			soil = mix( soil, ${z(.8,.75,.66)}, rootDead * 0.75 );
			// damp, darker sand toward the toe and in seepage streaks
			let seep = smoothstep( 0.6, 0.8, terDetail( vec2f( dot( xz, tanF ) / 2.3, h / 6.0 ) ).w ) * 0.35;
			soil = soil * ( 1.0 - seep - smoothstep( 0.5, 1.0, sp.w ) * 0.08 );
			// under the lip: the dark, rooty topsoil the grass grows in, overhanging the cut
			let lip = smoothstep( 0.86, 0.97, sp.w + ( dN.y - 0.45 ) * 0.1 );
			soil = mix( soil, ${z(.2,.15,.1)} * ( dN.x * 0.4 + 0.8 ), lip * 0.85 );
			// foot of the face: undercut by the swash of storm waves, in its own shadow
			soil *= 1.0 - ( 1.0 - smoothstep( 0.6, 0.78, sp.w ) ) * smoothstep( 0.35, 0.55, sp.w ) * 0.25;
			// slumped sand and fallen chunks at the toe: damp beach sand rather than soil
			soil = mix( ${z(.63,.56,.44)} * ( grain * 0.3 + 0.85 ), soil, smoothstep( 0.35, 0.75, sp.w ) );
			albedo = mix( albedo, soil, scarpW );
			scarpH = ( lip * 0.03 + layerMix * 0.012 + lamB * 0.018 + rootLive * 0.012 + rootDead * 0.009 + dN.x * 0.025 );

		}

		// ---- wetness (swash zone) from the shore system, else a static damp band
		let wetFoam = terWetFoam( xz, h );
		let wet = sat( wetFoam.x ) * ( 1.0 - jungleW * 0.8 ) * landW;
		// damp sand below the berm: darker in mottled, drying patches even when the swash has not
		// reached it lately
		let dampMottle = smoothstep( 0.3, 0.7, dM.w + ( dN.y - 0.45 ) * 0.6 + ( macroB - 0.5 ) * 0.4 );
		let damp = smoothstep( 1.7, 0.5, h + dM.w * 0.3 ) * sandW * mix( 0.22, 0.5, dampMottle );
		// sand dries in mottled patches; backwash leaves faint rills down the slope
		let mottle = smoothstep( 0.25, 0.75, dM.w + ( dN.y - 0.45 ) * 0.5 );
		let dryEdge = smoothstep( 0.0, 0.6, wet ) * smoothstep( 1.0, 0.6, wet );
		let wetK = max( wet, damp ) * ( 1.0 - dryEdge * mottle * 0.6 ) * notRock;
		let slopeDir = normalize( N0.xz + vec2f( 1e-4, 0.0 ) );
		let rillK = smoothstep( 0.2, 0.9, wet ) * smoothstep( 0.05, 0.6, h ) * sandW;
		var rill = 0.5;
		if ( rillK > 0.0 ) { rill = terDetail( vec2f( dot( xz, slopeDir ) / 3.2, dot( xz, vec2f( -slopeDir.y, slopeDir.x ) ) / 0.3 ) ).w; }
		let wetAlbedo = terrainSaturation( albedo * mat.wetDarken, 1.15 ) * vec3f( 0.97, 0.98, 1.0 ) * ( ( rill - 0.5 ) * 0.25 * rillK + 1.0 );
		albedo = mix( albedo, wetAlbedo, wetK );
		// swash marks: thin wavy lines of grit left at the limits of earlier uprushes
		let sl = ( h + dM.w * 0.18 + dN.w * 0.05 ) / 0.13;
		let slD = abs( fract( sl ) - 0.5 );
		let slW = fwidth( sl ) + 1e-4;
		let swashLine = smoothstep( slW * 1.5 + 0.04, 0.0, slD ) * smoothstep( 0.2, 0.4, h ) * smoothstep( 1.6, 1.2, h )
			* smoothstep( 0.45, 0.65, dM.y + ( macroB - 0.5 ) * 0.4 ) * sandW * ( 1.0 - smoothstep( 0.8, 2.0, slW * 10.0 ) );
		albedo = mix( albedo * ( 1.0 - swashLine * 0.3 ), ${z(.9,.88,.84)}, swashLine * smoothstep( 0.6, 0.75, dF.z ) * 0.5 );
		// foam residue: lacy patterns stranded on the sand
		var residue = sat( wetFoam.y ) * landW * notRock;
		if ( residue > 0.0 ) { residue *= smoothstep( 0.42, 0.18, terDetail( ${E(`xz`,.4)} / 0.9 ).x ) * 0.7 + 0.3; }
		albedo = mix( albedo, ${z(.88,.9,.9)}, residue );

		// ---- roughness
		var rough = mix( 0.88, 0.93, sandW );
		rough = mix( rough, 0.9, pathW );
		rough = mix( rough, rockRough, rockW );
		// wet sand has a film of water: glossy while fresh, satin as it drains
		rough = mix( rough, mix( 0.42, 0.16, wet ), wetK );
		rough = mix( rough, 0.7, residue );
		rough = mix( rough, 0.75, underW );
		rough = mix( rough, 0.94, scarpW );
		outRough = rough;

		// ---- micro relief for the normal
		let windR = rip1 * 0.005 * windK;
		let waveR = rip3 * 0.012 * fade3 * smoothstep( -0.3, -0.9, h ) * ( 1.0 - seagrassW );
		let megaR = rip2 * 0.035 * fade2 * fieldW * ( 1.0 - seagrassW );
		let sandH = ( grain * 0.004 + grainF * 0.003 + pebW * 0.004 + windR + waveR + megaR ) * ( 1.0 - wet * 0.6 )
			+ rill * 0.006 * rillK;
		// seagrass canopy stands proud of the sand with a ragged scarp; rubble is knobbly
		let seabedH = seagrassW * ( blades * 0.05 + 0.08 ) + rubbleW * ( dN.x * 0.07 + dF.x * 0.015 );
		let groundH = dN.y * mix( 0.05, 0.035, jungleW ) + dF.y * 0.012 + dM.y * 0.045 + canopyH * canopyW * 2.5
			+ clump * 0.12 * ( 1.0 - jungleW ) + comb * 0.03 * ( 1.0 - jungleW );
		let screeH = dN.z * 0.04 + dM.x * 0.06;
		let dirtH = dN.z * 0.012 + dN.y * 0.01;
		var hd = mix( mix( groundH, screeH, screeW ), dirtH, pathW );
		hd = mix( hd, sandH + seabedH, max( sandW, underW * notRock ) );
		hd = mix( hd, rockHd, rockW );
		hd = mix( hd, scarpH, scarpW );
		hdOut = hd;

		// ---- ambient occlusion: baked horizon + cavity, plus litter / crevices / seagrass canopy
		let aoDetail = mix( 1.0, dN.y * 0.5 + 0.7, jungleW * ( 1.0 - sandW ) * notRock * landW )
			* mix( 1.0, smoothstep( 0.2, 0.7, clump ) * 0.35 + 0.65, meadowW );
		outAO = nr.w * aoDetail * ( 1.0 - seagrassW * 0.3 ) * ( 1.0 - rubbleW * smoothstep( 0.55, 0.2, dN.x ) * 0.35 )
			* mix( 1.0, smoothstep( 0.15, 0.6, canopyH ) * 0.6 + 0.4, canopyW );

		albedoOut = albedo;

	}

	outN = terrainPerturbNormal( p, N0, hdOut, 1.0 );

	s.albedo = albedoOut;
	s.roughness = outRough;
	s.normal = outN;
	s.ao = sat( outAO );
`,fi=6,pi=new l(`WhaleMarks`,{marks:[`vec4f[${fi}]`,Array(fi).fill(0).map(()=>new n(0,0,1,0))]},{label:`whaleMarks`}),mi={get array(){return pi.fields.marks.value}},hi=new g({name:`whaleWater`,uniforms:pi,uniformName:`whaleMarks`,code:`
fn whaleWater( xz: vec2f ) -> vec2f {
	var foam = 0.0; var slick = 0.0;
	for ( var i = 0; i < ${fi}; i++ ) {
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
`}),gi=new t,_i=new t,vi=class{constructor(){this.events=[],this.foamTimer=0,this.slickDone=!1,this.breaches=0,this.splashes=0}update(e,t,n){if(n?.disabled)return;let r=e.brain,i=r.water-r.position.y;if(r.state===`surface`&&i<1.6&&(this.foamTimer-=t,this.foamTimer<=0&&(this.foamTimer=1.2,e.toWorld(gi.set(0,e.rest[8].y,e.zHead-5),_i),this.push({x:_i.x,z:_i.z,r:5.5,age:0,life:16,kind:`foam`,peak:.9})),n&&Math.random()<t*30)){let t=Math.random()<.5?-1:1;e.toWorld(gi.set(t*1.6,e.rest[8].y,e.zHead-2-Math.random()*8),_i),_i.y=r.water+.05,n.emit(_i,gi.set((Math.random()-.5)*1.5,1.6+Math.random()*1.6,(Math.random()-.5)*1.5),10,.05,0,{spread:1.2,jitter:.4,life:1.4})}r.breaches!==this.breaches&&(this.breaches=r.breaches,e.toWorld(gi.set(0,e.rest[2].y,e.zHead-2),_i),this.push({x:_i.x,z:_i.z,r:6,age:0,life:14,kind:`foam`,peak:1}),this.burst(e,n,_i,5,7,18)),r.splashes!==this.splashes&&(this.splashes=r.splashes,e.toWorld(gi.set(0,e.rest[8].y,e.zHead-5),_i),this.push({x:_i.x,z:_i.z,r:11,age:0,life:20,kind:`foam`,peak:1}),this.push({x:_i.x+3,z:_i.z-2,r:7,age:0,life:12,kind:`foam`,peak:.9}),this.burst(e,n,_i,9,11,26)),r.flukeUp>.6&&!this.slickDone&&(this.slickDone=!0,e.toWorld(gi.set(0,e.rest[e.rest.length-1].y,e.manifest.notchZ),_i),this.push({x:_i.x,z:_i.z,r:6,age:0,life:24,kind:`slick`,peak:1}),this.push({x:_i.x,z:_i.z,r:3.5,age:0,life:7,kind:`foam`,peak:.7})),r.state!==`surface`&&(this.slickDone=!1);let a=mi.array;for(let e=0;e<fi;e++){let n=this.events[e];if(!n){a[e].set(0,0,1,0);continue}n.age+=t;let r=Math.max(0,1-n.age/n.life),i=n.kind===`foam`?1+n.age*.06:1+n.age*.02;a[e].set(n.x,n.z,n.r*i,(n.kind===`foam`?1:-1)*n.peak*r*Math.min(1,n.age*3))}this.events=this.events.filter(e=>e.age<e.life)}burst(e,n,r,i,a,o){if(!n)return;let s=e.brain.water;for(let e=0;e<9;e++){let c=e/9*Math.PI*2+Math.random()*.5,l=new t(r.x+Math.cos(c)*i*(.4+Math.random()*.6),s+.2,r.z+Math.sin(c)*i*(.4+Math.random()*.6)),u=new t(Math.cos(c)*2.5,a*(.6+Math.random()*.5),Math.sin(c)*2.5);n.emit(l,u,o,.3,3,{spread:2.4,jitter:.5,life:2.8,sizeJitter:.8}),n.emit(l,u.clone().multiplyScalar(.9),o*2,.025,0,{spread:3,jitter:.4,life:2.4}),e%3==0&&n.emit(l,u.clone().multiplyScalar(.5),o,.8,1,{spread:2.2,jitter:.6,life:5})}}push(e){this.events.push(e),this.events.length>fi&&this.events.shift()}},yi=e=>Math.min(1,Math.max(0,e)),B=(e,t,n)=>e+(t-e)*n,bi=(e,t,n)=>{let r=yi((n-e)/(t-e));return r*r*(3-2*r)},xi=[4,4,3,3,8,10],Si=1025,Ci=class{constructor(){this.zAft=-3.9,this.zBow=4.3,this.length=this.zBow-this.zAft,this.deckY=.35,this.shell=.07,this.houseBack=-.35,this.houseFront=1.45;let e=.2,t=.45,n=this.keelY(1),r=this.sheerY(1),i=this.zBow-e*r,a=Math.sqrt(1.04),o=n+t;this.stem={k:e,R:t,yF:n,zW:i,yc:o,zc:i+e*o-t*a,yT:o-t*e/a},this._setback=new Map,this._sectionCache=new Map,this.analyze()}sheerZ(e){return this.zAft+this.length*e}tAtSheerZ(e){return yi((e-this.zAft)/this.length)}sheerY(e){let t=Math.max(0,1-e/.2);return .98+.62*e**2.2+.04*t*t}sheerX(e){if(e<=.42){let t=1-e/.42;return 1.45-.17*t*t}return 1.45*(1-((e-.42)/.58)**2.6)}keelY(e){return e<=.45?-.23-.22*Math.sin(Math.PI*.5*e/.45):-.45+.33*bi(.45,1,e)**1.6}chineX(e){if(e<=.42){let t=1-e/.42;return 1.26-.1*t*t}let t=(e-.42)/.58;return 1.26*Math.max(0,1-t**1.7)**1.15}chineY(e){return B(.01,-.045,bi(0,.45,e))+.33*bi(.5,1,e)**1.3}bilgeTangent(e){return B(.2,.24,bi(0,.4,e))*(1-.55*bi(.6,1,e))}bottomConvexity(e){return B(.025,.012,bi(.55,.95,e))}flare(e){return B(-.012,.075,bi(.3,.85,e))*(1-.3*bi(.9,1,e))}bowBlend(e){return e>.55?((e-.55)/.45)**2:0}stemZ(e){let t=this.stem;if(e>=t.yT)return t.zW+t.k*e;let n=e-t.yc;return t.zc+Math.sqrt(Math.max(0,t.R*t.R-n*n))}controlPoints(e){let t=[0,this.keelY(e)],n=[this.chineX(e),this.chineY(e)],r=[this.sheerX(e),this.sheerY(e)],i=n[0]-t[0],a=n[1]-t[1],o=Math.hypot(i,a),s=i/o,c=a/o,l=r[0]-n[0],u=r[1]-n[1],d=Math.hypot(l,u),f=l/d,p=u/d,m=bi(0,.3,n[0]),h=Math.min(this.bilgeTangent(e),.3*o,.3*d),g=this.bottomConvexity(e)*o*m,_=[t[0]+s*o*.5+c*g,t[1]+c*o*.5-s*g],v=[n[0]-s*h,n[1]-c*h],y=[n[0]+f*h,n[1]+p*h],b=Math.acos(Math.min(1,Math.max(-1,s*f+c*p))),x=f-s,S=p-c,C=Math.hypot(x,S),w=C>1e-6?h*Math.tan(b/4)/C:0,T=[n[0]+x*w,n[1]+S*w],E=this.flare(e)*d*m;return[t,_,v,T,y,[n[0]+f*d*.5-p*E,n[1]+p*d*.5+f*E],r]}sectionPoints(e,t=1){let n=e+`:`+t,r=this._sectionCache.get(n);if(r)return r;let i=this.controlPoints(e),a=i.length,o=[[2*i[0][0]-i[1][0],2*i[0][1]-i[1][1]],...i,[2*i[a-1][0]-i[a-2][0],2*i[a-1][1]-i[a-2][1]]],s=xi.reduce((e,t)=>e+t,0)*t+1,c=new Float64Array(s*2),l=0,u=[0,0];for(let e=0;e<xi.length;e++){let n=xi[e]*t;for(let t=0;t<n;t++)wi(o[e],o[e+1],o[e+2],o[e+3],t/n,u),c[l++]=Math.max(0,u[0]),c[l++]=u[1]}return c[l++]=i[a-1][0],c[l++]=i[a-1][1],this._sectionCache.size>4096&&this._sectionCache.clear(),this._sectionCache.set(n,c),c}setback(e=1){let t=this._setback.get(e);if(t)return t;let n=this.sectionPoints(1,e),r=n.length/2;t=new Float64Array(r);for(let e=0;e<r;e++)t[e]=this.zBow-this.stemZ(n[2*e+1]);return t[r-1]=0,this._setback.set(e,t),t}sectionCount(e=1){return xi.reduce((e,t)=>e+t,0)*e+1}station(e,n=1){let r=this.sectionPoints(e,n),i=this.setback(n),a=this.sheerZ(e),o=this.bowBlend(e),s=[];for(let e=0;e<i.length;e++)s.push(new t(r[2*e],r[2*e+1],a-o*i[e]));return s}stationParams(e){let t=e=>1+2.2*bi(.62,1,e)+.5*(1-bi(0,.08,e)),n=2e3,r=new Float64Array(2001);for(let e=1;e<=n;e++)r[e]=r[e-1]+t((e-.5)/n)/n;let i=r[n],a=[],o=0;for(let t=0;t<e;t++){let s=i*t/(e-1);for(;o<n&&r[o+1]<s;)o++;let c=(s-r[o])/Math.max(1e-12,r[o+1]-r[o]);a.push(t===e-1?1:(o+yi(c))/n)}return a}halfBreadth(e,t){let n=this.sectionPoints(e,2),r=n.length/2;if(t>=n[2*r-1])return n[2*r-2];for(let e=r-2;e>=0;e--){let r=n[2*e+1],i=n[2*e+3];if(t>=r&&t<=i){let a=(t-r)/Math.max(1e-9,i-r);return B(n[2*e],n[2*e+2],a)}}return 0}tAt(e,t){let n=0,r=1;for(let i=0;i<40;i++){let i=(n+r)*.5;this.zOnStation(i,t)<e?n=i:r=i}return(n+r)*.5}zOnStation(e,t){let n=this.bowBlend(e);if(n===0)return this.sheerZ(e);let r=this.sectionPoints(e,2),i=this.setback(2),a=r.length/2,o=0;if(t<=r[1])o=i[0];else if(t>=r[2*a-1])o=0;else for(let e=0;e<a-1;e++){let n=r[2*e+1],a=r[2*e+3];if(t>=n&&t<=a){o=B(i[e],i[e+1],(t-n)/Math.max(1e-9,a-n));break}}return this.sheerZ(e)-n*o}hullXAt(e,t){return this.halfBreadth(this.tAt(e,t),t)}analyze(){let e=this.setback(3),n=e.length,r=[];for(let t=0;t<=480;t++){let i=t/480,a=this.sectionPoints(i,3),o=this.sheerZ(i),s=this.bowBlend(i);for(let t=0;t<n-1;t++){let n=a[2*t+1],i=a[2*t+3];if(n<=0&&i>0){let c=-n/(i-n);r.push([o-s*B(e[t],e[t+1],c),B(a[2*t],a[2*t+2],c)]);break}}}r.sort((e,t)=>e[0]-t[0]),this.wlStart=r[0][0],this.wlEnd=r[r.length-1][0],this._beamTable=new Float64Array(513),this._tableZ0=this.wlStart,this._tableDz=(this.wlEnd-this.wlStart)/512;let i=0;for(let e=0;e<=512;e++){let t=this.wlStart+e*this._tableDz;for(;i<r.length-2&&r[i+1][0]<t;)i++;let n=r[i],a=r[i+1],o=yi((t-n[0])/Math.max(1e-9,a[0]-n[0]));this._beamTable[e]=B(n[1],a[1],o)}let a=.02,o=this.zAft-.02,s=Math.ceil((this.wlEnd+.05-o)/a),c=new Float32Array(75*s).fill(1/0),l=[];for(let t=0;t<=480;t++){let r=t/480,i=this.sectionPoints(r,3),a=this.sheerZ(r),o=this.bowBlend(r),s=new Float64Array(n*3);for(let t=0;t<n;t++)s[3*t]=i[2*t],s[3*t+1]=i[2*t+1],s[3*t+2]=a-o*e[t];l.push(s)}let u=(e,t,n)=>{if(Math.min(e[1],t[1],n[1])>.01)return;let r=Math.min(e[0],t[0],n[0]),i=Math.max(e[0],t[0],n[0]),l=Math.min(e[2],t[2],n[2]),u=Math.max(e[2],t[2],n[2]),d=Math.max(0,Math.ceil((r-0)/a-.5)),f=Math.min(74,Math.floor((i-0)/a-.5)),p=Math.max(0,Math.ceil((l-o)/a-.5)),m=Math.min(s-1,Math.floor((u-o)/a-.5));if(d>f||p>m)return;let h=(t[2]-n[2])*(e[0]-n[0])+(n[0]-t[0])*(e[2]-n[2]);if(!(Math.abs(h)<1e-12))for(let r=p;r<=m;r++){let i=o+(r+.5)*a;for(let o=d;o<=f;o++){let s=0+(o+.5)*a,l=((t[2]-n[2])*(s-n[0])+(n[0]-t[0])*(i-n[2]))/h,u=((n[2]-e[2])*(s-n[0])+(e[0]-n[0])*(i-n[2]))/h,d=1-l-u;if(l<-1e-9||u<-1e-9||d<-1e-9)continue;let f=l*e[1]+u*t[1]+d*n[1],p=r*75+o;f<c[p]&&(c[p]=f)}}},d=[0,0,0],f=[0,0,0],p=[0,0,0],m=[0,0,0],h=(e,t,n)=>(n[0]=e[3*t],n[1]=e[3*t+1],n[2]=e[3*t+2],n);for(let e=0;e<480;e++)for(let t=0;t<n-1;t++)h(l[e],t,d),h(l[e+1],t,f),h(l[e+1],t+1,p),h(l[e],t+1,m),u(d,f,p),u(d,p,m);this._field={bottom:c,nx:75,nz:s,cell:a,x0:0,z0:o};let g=0,_=0,v=0,y=0,b=0;for(let e=0;e<s;e++){let t=o+(e+.5)*a;for(let n=0;n<75;n++){let r=c[e*75+n];if(!(r<0))continue;let i=a*a*2;g+=i,v+=i*t,_+=i*-r,y+=i*-r*t,b+=i*-r*(r*.5)}}this.waterplaneArea=g,this.canoeVolume=_,this.centerOfFlotationZ=v/g,this.centerOfBuoyancy=new t(0,b/_,y/_)}halfBeamAt(e){if(e<this.wlStart||e>this.wlEnd)return 0;let t=(e-this._tableZ0)/this._tableDz,n=Math.min(this._beamTable.length-2,Math.max(0,Math.floor(t)));return B(this._beamTable[n],this._beamTable[n+1],yi(t-n))}draftAt(e){let{bottom:t,nx:n,nz:r,cell:i,z0:a}=this._field,o=(e-a)/i-.5;if(o<-.5||o>r-.5)return 0;let s=Math.min(r-2,Math.max(0,Math.floor(o))),c=t[s*n],l=t[(s+1)*n];return B(c<0?-c:0,l<0?-l:0,yi(o-s))}bottomAt(e,t){let{bottom:n,nx:r,nz:i,cell:a,x0:o,z0:s}=this._field,c=Math.floor((Math.abs(e)-o)/a),l=Math.floor((t-s)/a);return c<0||c>=r||l<0||l>=i?1/0:n[l*r+c]}buildHullSamples(e=8){let{bottom:n,nx:r,nz:i,cell:a,x0:o,z0:s}=this._field,c=this.wlEnd-this.wlStart,l=[];for(let t=0;t<e;t++)l.push([0,1].map(()=>({a:0,x2:0,z:0,v:0})));for(let t=0;t<i;t++){let i=s+(t+.5)*a,u=Math.min(e-1,Math.max(0,Math.floor((i-this.wlStart)/c*e))),d=this.halfBeamAt(i);for(let e=0;e<r;e++){let s=n[t*r+e];if(!(s<0))continue;let c=o+(e+.5)*a,f=+(d>0&&c>d*.5),p=a*a,m=l[u][f];m.a+=p,m.x2+=p*c*c,m.z+=p*i,m.v+=p*-s}}let u=[];for(let n=0;n<e;n++)for(let e=0;e<2;e++){let r=l[n][e];if(r.a<=0)continue;let i=Math.sqrt(r.x2/r.a),a=r.z/r.a,o=-r.v/r.a,s=Math.min(0,this.bottomAt(i,a));u.push({position:new t(i,o,a),area:r.a,depth:-o,bottomY:s}),u.push({position:new t(-i,o,a),area:r.a,depth:-o,bottomY:s})}return u}};function wi(e,t,n,r,i,a){let o=Math.max(1e-5,Math.sqrt(Math.hypot(t[0]-e[0],t[1]-e[1]))),s=Math.max(1e-5,Math.sqrt(Math.hypot(n[0]-t[0],n[1]-t[1]))),c=Math.max(1e-5,Math.sqrt(Math.hypot(r[0]-n[0],r[1]-n[1]))),l=o,u=l+s,d=u+c,f=l+(u-l)*i;for(let i=0;i<2;i++){let o=((l-f)*e[i]+(f-0)*t[i])/(l-0),s=((u-f)*t[i]+(f-l)*n[i])/(u-l),c=((d-f)*n[i]+(f-u)*r[i])/(d-u),p=((u-f)*o+(f-0)*s)/(u-0),m=((d-f)*s+(f-l)*c)/(d-l);a[i]=((u-f)*p+(f-l)*m)/(u-l)}return a}var Ti=new Set([`position`,`normal`,`uv`,`color`,`aux`]),Ei=new o,Di=new t,Oi=new r,ki=new e,Ai=new t;function V(e=0,t=0,n=0,r=0,i=0,a=0,o=1,s=o,c=o,l=`XYZ`){return ki.set(r,i,a,l),Oi.setFromEuler(ki),new C().compose(Di.set(e,t,n),Oi,Ai.set(o,s,c))}function ji(e,n,i=0){let a=n.clone().normalize(),o=new r().setFromUnitVectors(new t(0,1,0),a);return i&&o.multiply(new r().setFromAxisAngle(new t(0,1,0),i)),new C().compose(e,o,new t(1,1,1))}function Mi(e){return e instanceof o?e:Ei.set(e).clone()}function Ni(e,{color:t=16777215,rough:n=.5,metal:r=0,pattern:i=0,anim:a=0,matrix:o=null}={}){for(let t of Object.keys(e.attributes))Ti.has(t)||e.deleteAttribute(t);e.morphAttributes={},e.clearGroups();let s=e.attributes.position.count;if(!e.index){let t=Array(s);for(let e=0;e<s;e++)t[e]=e;e.setIndex(t)}if(e.attributes.normal||e.computeVertexNormals(),e.attributes.uv||e.setAttribute(`uv`,new I(new Float32Array(s*2),2)),!e.attributes.color){let n=Mi(t),r=new Float32Array(s*3);for(let e=0;e<s;e++)r[e*3]=n.r,r[e*3+1]=n.g,r[e*3+2]=n.b;e.setAttribute(`color`,new I(r,3))}if(!e.attributes.aux){let t=new Float32Array(s*4);for(let e=0;e<s;e++)t[e*4]=n,t[e*4+1]=r,t[e*4+2]=i,t[e*4+3]=a;e.setAttribute(`aux`,new I(t,4))}for(let t of Object.keys(e.attributes)){let n=e.attributes[t];(!(n.array instanceof Float32Array)||n.isInterleavedBufferAttribute)&&e.setAttribute(t,new I(Float32Array.from({length:n.count*n.itemSize},(e,t)=>n.array[t]),n.itemSize))}return o&&e.applyMatrix4(o),e}var Pi=class{constructor(){this.buckets=new Map}add(e,t,n){let r=Ni(t,n);return this.buckets.has(e)||this.buckets.set(e,[]),this.buckets.get(e).push(r),r}merged(e){let t=this.buckets.get(e);if(!t||t.length===0)return null;let n=t.length===1?t[0]:Ae(t,!1);if(!n)throw Error(`BoatModel: failed to merge bucket `+e);return n.computeBoundingBox(),n.computeBoundingSphere(),n}};function Fi(e){let t=e.length===1?e[0]:Ae(e,!1);return t.computeBoundingBox(),t.computeBoundingSphere(),t}function H(e,t,n){let r=new je(e,t,n),i=r.attributes.uv,a=[[n,t],[n,t],[e,n],[e,n],[e,t],[e,t]];for(let e=0;e<6;e++)for(let t=0;t<4;t++){let n=e*4+t;i.setXY(n,i.getX(n)*a[e][0],i.getY(n)*a[e][1])}return r}function Ii(e,t,n,r=.02,i=2){let a=new Ne(e,t,n,i,Math.min(r,e/2-1e-4,t/2-1e-4,n/2-1e-4)),o=a.attributes.uv;for(let r=0;r<o.count;r++)o.setXY(r,o.getX(r)*Math.max(e,n),o.getY(r)*t);return a}function U(e,t,n,r=12,i=1,a=!1,o=0,s=Math.PI*2){let c=new Oe(e,t,n,r,i,a,o,s),l=c.attributes.uv,u=Math.max(e,t)*s;for(let e=0;e<l.count;e++)l.setXY(e,l.getX(e)*u,l.getY(e)*n);return c}function W(e,n,r,i=8,a=r){let o=new t().subVectors(n,e),s=U(a,r,o.length(),i,1,!1);return s.applyMatrix4(ji(new t().addVectors(e,n).multiplyScalar(.5),o)),s}function Li(e,t=12,n=8,r=0,i=Math.PI*2,a=0,o=Math.PI){return new Ce(e,t,n,r,i,a,o)}function Ri(e,t,n=8,r=24,i=Math.PI*2){let a=new Me(e,t,n,r,i),o=a.attributes.uv;for(let n=0;n<o.count;n++)o.setXY(n,o.getX(n)*e*i,o.getY(n)*2*Math.PI*t);return a}function zi(e,t=16){let n=e.map(e=>new p(Math.max(0,e[0]),e[1]));return new Fe(n,t)}function Bi(e,t,n=32,r=6,i=!1,a=.5){let o=new u(e,i,`catmullrom`,a),s=new Ee(o,n,t,r,i),c=o.getLength(),l=s.attributes.uv;for(let e=0;e<l.count;e++)l.setXY(e,l.getX(e)*c,l.getY(e));return s}function Vi(e,{flip:t=!1,uvFn:n=null,closeJ:r=!1}={}){let i=e.length,a=e[0].length,o=new Float32Array(i*a*3),s=new Float32Array(i*a*2),c=0;for(let t=0;t<i;t++){t>0&&(c+=e[t][0].distanceTo(e[t-1][0]));let r=0;for(let i=0;i<a;i++){let l=e[t][i];i>0&&(r+=l.distanceTo(e[t][i-1]));let u=t*a+i;if(o[u*3]=l.x,o[u*3+1]=l.y,o[u*3+2]=l.z,n){let e=n(l,t,i,c,r);s[u*2]=e[0],s[u*2+1]=e[1]}else s[u*2]=c,s[u*2+1]=r}}let l=[],u=r?a:a-1;for(let e=0;e<i-1;e++)for(let n=0;n<u;n++){let r=(n+1)%a,i=e*a+n,o=(e+1)*a+n,s=(e+1)*a+r,c=e*a+r;t?l.push(i,o,c,o,s,c):l.push(i,c,o,c,s,o)}let d=new Ie;return d.setAttribute(`position`,new I(o,3)),d.setAttribute(`uv`,new I(s,2)),d.setIndex(l),d.computeVertexNormals(),d}function Hi(e,n){let r=new t;for(let t of e)r.add(t);r.divideScalar(e.length);let i=[r.x,r.y,r.z];for(let t of e)i.push(t.x,t.y,t.z);let a=[];for(let t=0;t<e.length;t++)a.push(0,1+t,1+(t+1)%e.length);let o=new Ie;return o.setAttribute(`position`,new I(i,3)),o.setIndex(a),Ui(o,n),o.computeVertexNormals(),Wi(o,n),o}function Ui(e,n){let r=e.attributes.position,i=e.index.array,a=new t,o=new t,s=new t,c=new t,l=new t;for(let e=0;e<i.length;e+=3)a.fromBufferAttribute(r,i[e]),o.fromBufferAttribute(r,i[e+1]),s.fromBufferAttribute(r,i[e+2]),c.subVectors(o,a).cross(s.sub(a)),l.add(c);if(l.dot(n)<0){let t=Array.from(i);for(let e=0;e<t.length;e+=3){let n=t[e+1];t[e+1]=t[e+2],t[e+2]=n}e.setIndex(t)}return e}function Wi(e,n){let r=n.clone().normalize(),i=Math.abs(r.y)>.9?new t(1,0,0):new t(0,1,0).cross(r).normalize(),a=new t().crossVectors(r,i),o=e.attributes.position,s=new Float32Array(o.count*2),c=new t;for(let e=0;e<o.count;e++)c.fromBufferAttribute(o,e),s[e*2]=c.dot(i),s[e*2+1]=c.dot(a);return e.setAttribute(`uv`,new I(s,2)),e}function Gi(e,n,r,{edges:i=!0,back:a=!0,front:o=!0}={}){let s=e.map(e=>new p(e[0],e[1])),c=n.map(e=>e.map(e=>new p(e[0],e[1])));ne.isClockWise(s)&&s.reverse();for(let e of c)ne.isClockWise(e)||e.reverse();let l=ne.triangulateShape(s,c),u=s.concat(...c),d=[],f=e=>{let t=[],n=[];for(let i of u){let a=r(i.x,i.y,e);t.push(a.x,a.y,a.z),n.push(i.x,i.y)}let i=[];for(let e of l){let t=u[e[0]],n=u[e[1]],r=u[e[2]];Math.abs((n.x-t.x)*(r.y-t.y)-(r.x-t.x)*(n.y-t.y))>1e-10&&i.push(e[0],e[1],e[2])}let a=new Ie;a.setAttribute(`position`,new I(t,3)),a.setAttribute(`uv`,new I(n,2)),a.setIndex(i);let o=s[0],c=r(o.x,o.y,e).sub(r(o.x,o.y,1-e));Ui(a,c),a.computeVertexNormals();let d=a.attributes.normal;c.normalize();for(let e=0;e<d.count;e++)Math.hypot(d.getX(e),d.getY(e),d.getZ(e))<.5&&d.setXYZ(e,c.x,c.y,c.z);return a};if(o&&d.push(f(0)),a&&d.push(f(1)),i){let e=[],n=[],i=[],a=[s,...c],o=new t,l=new t,u=new t,f=new t,p=new t,m=new t;for(let t of a){let a=0;for(let s=0;s<t.length;s++){let c=t[s],d=t[(s+1)%t.length],h=c.distanceTo(d);if(h<1e-6)continue;o.copy(r(c.x,c.y,0)),l.copy(r(c.x,c.y,1)),u.copy(r(d.x,d.y,0)),f.copy(r(d.x,d.y,1));let g=o.distanceTo(l),_=e.length/3;e.push(o.x,o.y,o.z,u.x,u.y,u.z,f.x,f.y,f.z,l.x,l.y,l.z),n.push(a,0,a+h,0,a+h,g,a,g),a+=h;let v=(c.x+d.x)/2,y=(c.y+d.y)/2,b=(d.y-c.y)/h*.01,x=-(d.x-c.x)/h*.01;m.copy(r(v+b,y+x,0)).sub(r(v,y,0)),p.subVectors(u,o).cross(Di.subVectors(l,o)),p.dot(m)>=0?i.push(_,_+1,_+2,_,_+2,_+3):i.push(_,_+2,_+1,_,_+3,_+2)}}if(e.length){let t=new Ie;t.setAttribute(`position`,new I(e,3)),t.setAttribute(`uv`,new I(n,2)),t.setIndex(i),t.computeVertexNormals(),d.push(t)}}return d.length===1?d[0]:Ae(d,!1)}function Ki(e,{closed:n=!1,flip:r=!1}={}){let i=n?e.map(e=>[...e,e[0].clone()]):e,a=Vi(i,{flip:r});if(n){let e=i[0].length,n=a.attributes.normal,r=new t,o=new t;for(let t=0;t<i.length;t++){let i=t*e,a=t*e+e-1;r.fromBufferAttribute(n,i),o.fromBufferAttribute(n,a),r.add(o).normalize(),n.setXYZ(i,r.x,r.y,r.z),n.setXYZ(a,r.x,r.y,r.z)}}return a}function qi(e,n){let r=e.attributes.position,i=new Float32Array(r.count*3),a=new t;for(let e=0;e<r.count;e++){a.fromBufferAttribute(r,e);let t=Mi(n(a,e));i[e*3]=t.r,i[e*3+1]=t.g,i[e*3+2]=t.b}return e.setAttribute(`color`,new I(i,3)),e}function Ji(e,n){let r=e.attributes.position,i=new Float32Array(r.count*4),a=new t;for(let e=0;e<r.count;e++){a.fromBufferAttribute(r,e);let t=n(a,e);i[e*4]=t[0],i[e*4+1]=t[1],i[e*4+2]=t[2],i[e*4+3]=t[3]}return e.setAttribute(`aux`,new I(i,4)),e}function Yi(e){return e.index?e.index.count/3:e.attributes.position.count/3}var Xi=new g({name:`boatSurfaceGradient`,code:`
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
`}),Zi={gelcoat:15855334,lining:15328988,deck:14867919,antifouling:8002837,stainless:13685718},G=(e,n,r)=>new t(e,n,r);function Qi(e,t){$i(e,t),ra(e,t),ca(e,t),ua(e,t),ma(e,t),ga(e,t)}function $i(e,t){let n=t.stationParams(60).map(e=>t.station(e,1)),r=e=>[e.z,e.y];e.add(`hull`,Vi(n,{uvFn:r}));let i=n.map(e=>e.map(e=>G(-e.x,e.y,e.z)));e.add(`hull`,Vi(i,{flip:!0,uvFn:r}));let a=n[0],o=[],s=[],c=[];for(let e of a)o.push(e.x,e.y,e.z,-e.x,e.y,e.z),c.push(e.x,e.y,-e.x,e.y);for(let e=0;e<a.length-1;e++){let t=2*e,n=2*e+1,r=2*e+2,i=2*e+3;a[e].x>1e-5&&s.push(t,n,r),s.push(n,i,r)}let l=new Ie;l.setAttribute(`position`,new I(o,3)),l.setAttribute(`uv`,new I(c,2)),l.setIndex(s),Ui(l,G(0,0,-1)),l.computeVertexNormals(),aa(l,G(0,0,-1)),e.add(`hull`,l)}function ea(e){let t=e.stationParams(28).map(t=>e.station(t,1).filter((e,t,n)=>t%2==0||t===n.length-1)),n=t[0].length,r=[],i=[],a=e=>(r.push(e.x,e.y,e.z),r.length/3-1),o=t.map(e=>e.map(a)),s=t.map(e=>e.map(e=>a(G(-e.x,e.y,e.z))));for(let e=0;e<t.length-1;e++)for(let t=0;t<n-1;t++){let n=o[e][t],r=o[e+1][t],a=o[e+1][t+1],c=o[e][t+1];i.push(n,c,r,c,a,r);let l=s[e][t],u=s[e+1][t],d=s[e+1][t+1],f=s[e][t+1];i.push(l,u,f,u,d,f)}for(let e=0;e<n-1;e++)i.push(o[0][e],s[0][e],o[0][e+1],s[0][e],s[0][e+1],o[0][e+1]);let c=n-1;for(let e=0;e<t.length-1;e++)i.push(o[e][c],s[e][c],o[e+1][c],s[e][c],s[e+1][c],o[e+1][c]);let l=(e,t)=>Math.abs(r[3*e]-r[3*t])+Math.abs(r[3*e+1]-r[3*t+1])+Math.abs(r[3*e+2]-r[3*t+2])<1e-7,u=[];for(let e=0;e<i.length;e+=3){let[t,n,r]=[i[e],i[e+1],i[e+2]];!l(t,n)&&!l(n,r)&&!l(t,r)&&u.push(t,n,r)}let d=new Ie;return d.setAttribute(`position`,new I(r,3)),d.setIndex(u),d.computeVertexNormals(),d.computeBoundingBox(),d.computeBoundingSphere(),d}var ta=[[3.74,-.093],[3.3,-.2],[3,-.265],[1.5,-.5],[0,-.62],[-1.5,-.7],[-3.05,-.77]];function na(e){let t=ta;if(e>=t[0][0])return t[0][1];if(e<=t[t.length-1][0])return t[t.length-1][1];let n=0;for(;n<t.length-2&&e<t[n+1][0];)n++;let r=t[Math.max(0,n-1)],i=t[n],a=t[n+1],o=t[Math.min(t.length-1,n+2)],s=(i[0]-e)/(i[0]-a[0]),c=s*s,l=c*s;return .5*(2*i[1]+(-r[1]+a[1])*s+(2*r[1]-5*i[1]+4*a[1]-o[1])*c+(-r[1]+3*i[1]-3*a[1]+o[1])*l)}var K={zFront:3.74,zAft:-3.05,shoeAft:-3.68,bottom:-.77,shoeTop:-.74};function ra(e,t){let n=[];for(let e=0;e<=32;e++){let r=e/32,i=B(K.zAft,K.zFront,r**.9),a=na(i),o=-t.draftAt(i),s=Math.max(o+.06,a+.02),c=bi(2.6,K.zFront,i),l=B(.065,.012,c),u=B(.042,.008,c),d=B(s,a,.55),f=[[l,s],[B(l,u,.6),d],[u,a+.035],[u*.75,a+.012],[u*.35,a+.002]],p=[];for(let e of f)p.push(G(e[0],e[1],i));p.push(G(0,a,i));for(let e=f.length-1;e>=0;e--)p.push(G(-f[e][0],f[e][1],i));n.push(p)}let r=Ki(n);oa(r,e=>G(e.x,0,0),G(0,-1,0)),e.add(`hull`,r),e.add(`hull`,Hi(n[0],G(0,0,-1))),e.add(`hull`,Hi(n[32],G(0,0,1)));let i=K.zAft-K.shoeAft,a=H(.075,K.shoeTop-K.bottom,i);a.translate(0,(K.shoeTop+K.bottom)/2,(K.zAft+K.shoeAft)/2),e.add(`hull`,a),e.add(`fittings`,W(G(0,K.shoeTop,-3.58),G(0,K.shoeTop+.03,-3.58),.03,10),{color:11564618,rough:.4,metal:1}),e.add(`fittings`,W(G(0,-.53,K.zAft+.02),G(0,-.53,-3.27),.024,10),{color:13225168,rough:.25,metal:1}),e.add(`hull`,W(G(0,-.53,K.zAft+.06),G(0,-.53,K.zAft-.03),.05,12,.04))}function ia(e){let t=(K.zFront-K.zAft)/240,n=0;for(let r=0;r<240;r++){let i=K.zAft+(r+.5)*t,a=Math.max(0,-e.draftAt(i)-na(i)),o=bi(2.6,K.zFront,i);n+=(B(.065,.012,o)+B(.042,.008,o))*a*t}return n+.075*(K.shoeTop-K.bottom)*(K.zAft-K.shoeAft)}function aa(e,t){let n=e.attributes.normal;for(let e=0;e<n.count;e++)Math.hypot(n.getX(e),n.getY(e),n.getZ(e))<.5&&n.setXYZ(e,t.x,t.y,t.z)}function oa(e,t,n){let r=e.attributes.position,i=e.attributes.normal,a=0,o=G(0,0,0),s=G(0,0,0);for(let e=0;e<r.count;e++){o.fromBufferAttribute(r,e),s.fromBufferAttribute(i,e);let c=t(o);a+=c.lengthSq()>1e-10?s.dot(c):s.dot(n)}if(a<0){let t=Array.from(e.index.array);for(let e=0;e<t.length;e+=3){let n=t[e+1];t[e+1]=t[e+2],t[e+2]=n}e.setIndex(t),e.computeVertexNormals()}return e}function sa(e,t,n){return e.halfBreadth(t,n)-e.shell}function ca(e,t){let n=t.shell/t.length,r=t.tAtSheerZ(t.houseFront),i=[];for(let e=0;e<=40;e++){let a=B(n,r,e/40),o=t.sheerZ(a),s=t.sheerY(a),c=[];for(let e=0;e<=7;e++){let n=B(t.deckY,s,e/7);c.push(G(sa(t,a,n),n,o))}i.push(c)}let a=e=>[e.z,e.y],o=Vi(i,{uvFn:a,flip:!0}),s=Vi(i.map(e=>e.map(e=>G(-e.x,e.y,e.z))),{uvFn:a});e.add(`gelcoat`,o,{color:Zi.lining,rough:.4}),e.add(`gelcoat`,s,{color:Zi.lining,rough:.4});let c=t.zAft+t.shell,l=[],u=[],d=[];for(let e=0;e<=7;e++){let r=B(t.deckY,t.sheerY(n),e/7),i=sa(t,n,r);l.push(i,r,c,-i,r,c),u.push(i,r,-i,r)}for(let e=0;e<7;e++){let t=2*e,n=2*e+1,r=2*e+2,i=2*e+3;d.push(t,r,n,n,r,i)}let f=new Ie;f.setAttribute(`position`,new I(l,3)),f.setAttribute(`uv`,new I(u,2)),f.setIndex(d),Ui(f,G(0,0,1)),f.computeVertexNormals(),e.add(`gelcoat`,f,{color:Zi.lining,rough:.4})}function la(e,t,n){let r=Math.max(.001,e.sheerX(t)-e.shell),i=Math.min(1,Math.abs(n)/r);return e.sheerY(t)+.06*(1-i*i)}function ua(e,t){let n=t.shell/t.length,r=t.tAtSheerZ(t.houseFront),i={color:Zi.deck,rough:.5,pattern:1},a=e=>[e.x,e.z],o=[];for(let e=0;e<=40;e++){let i=B(n,r,e/40),a=t.sheerZ(i),s=sa(t,i,t.deckY),c=[];for(let e=0;e<=8;e++)c.push(G(B(s,-s,e/8),t.deckY,a));o.push(c)}let s=Vi(o,{uvFn:a});Ui(s,G(0,1,0)),s.computeVertexNormals(),e.add(`gelcoat`,s,i);let c=1;for(;t.sheerX(c)-t.shell<.012;)c-=5e-4;let l=[];for(let e=0;e<=30;e++){let n=B(r,c,1-(1-e/30)**1.3),i=t.sheerZ(n),a=Math.max(.012,t.sheerX(n)-t.shell),o=[];for(let e=0;e<=12;e++){let r=B(a,-a,e/12);o.push(G(r,la(t,n,r),i))}l.push(o)}let u=Vi(l,{uvFn:a});Ui(u,G(0,1,0)),u.computeVertexNormals(),e.add(`gelcoat`,u,i);for(let n of[1,-1]){let r=[],i=t.houseBack,a=t.houseFront;for(let e=0;e<=12;e++){let n=B(i,a,e/12);r.push([n,da(t,n)-.045])}for(let e=12;e>=0;e--){let n=B(i,a,e/12);r.push([n,t.sheerX(t.tAtSheerZ(n))-t.shell+.01])}let o=Gi(r,[],(e,r,i)=>{let a=t.tAtSheerZ(e);return G(n*r,t.sheerY(a)-(i?.04:0),e)});Ji(o,e=>[.5,0,+(e.y>t.sheerY(t.tAtSheerZ(e.z))-.02),0]),e.add(`gelcoat`,o,{color:Zi.deck})}let d=t.deckY+.008;for(let[t,n,r,i]of[[.74,.03,0,-1.25],[.74,.03,0,-1.95],[.03,.73,.355,-1.6],[.03,.73,-.355,-1.6]]){let a=H(t,.016,n);a.translate(r,d,i),e.add(`gelcoat`,a,{color:14078404,rough:.45})}e.add(`fittings`,W(G(-.05,t.deckY+.004,-1.45),G(.05,t.deckY+.004,-1.45),.006,6),{color:Zi.stainless,rough:.3,metal:1})}function da(e,t){return e.sheerX(e.tAtSheerZ(t))-.2}var fa=.045;function pa(e,t,n,r,i){let a=(e+t)/2;return[[e,n-.012],[e,n+fa-.012],[e+.01,n+fa-.002],[a,n+fa+.004],[t-.01,n+fa-.002],[t,n+fa-.012],[t,n-.026],[t-.018,n-.03]].map(e=>G(i*Math.max(0,e[0]),e[1],r))}function ma(e,t){let n=(t.shell+.03)/t.length;for(let r of[1,-1]){let i=[];for(let e=0;e<=60;e++){let a=B(n,1,1-(1-e/60)**1.25),o=t.sheerX(a),s=t.sheerZ(a),c=o+.022;e===60&&(c=0,s+=.03),i.push(pa(Math.max(0,o-t.shell-.03),c,t.sheerY(a),s,r))}let a=Ki(i);oa(a,e=>G(e.x-r*(t.sheerX(t.tAtSheerZ(e.z))-.03),e.y-t.sheerY(t.tAtSheerZ(e.z))-.01,0),G(0,1,0)),ha(a,i),e.add(`wood`,a,{rough:.32}),e.add(`wood`,Hi(i[0],G(0,0,-1)),{rough:.32})}let r=t.sheerY(0),i=t.sheerX(0)+.022,a=t.zAft+t.shell+.03,o=t.zAft-.022,s=e=>pa(0,a-o,0,0,1).map(t=>G(e,r+t.y,a-t.x)),c=[];for(let e=0;e<=8;e++)c.push(s(B(-i,i,e/8)));let l=Ki(c);oa(l,e=>G(0,e.y-r-.01,e.z-(a+o)/2),G(0,1,0)),ha(l,c),e.add(`wood`,l,{rough:.32}),e.add(`wood`,Hi(c[0],G(-1,0,0)),{rough:.32}),e.add(`wood`,Hi(c[8],G(1,0,0)),{rough:.32})}function ha(e,t){let n=t[0].length,r=e.attributes.uv,i=0;for(let e=0;e<t.length;e++){e>0&&(i+=t[e][3].distanceTo(t[e-1][3]));let a=0;for(let o=0;o<n;o++)o>0&&(a+=t[e][o].distanceTo(t[e][o-1])),r.setXY(e*n+o,i,a)}}function ga(e,t){let n=[-90,-60,-30,0,30,60,90].map(e=>e*Math.PI/180);for(let r of[1,-1]){let i=[];for(let e=0;e<=50;e++){let n=B(0,.992,1-(1-e/50)**1.25),r=t.sheerY(n)-.07,a=t.halfBreadth(n,r);i.push(G(a,r,t.zOnStation(n,r)))}let a=[],o=[];for(let e=0;e<=50;e++){let t=i[e],s=i[Math.max(0,e-1)],c=i[Math.min(50,e+1)],l=c.z-s.z,u=c.x-s.x,d=Math.hypot(u,l)||1,f=l/d,p=-u/d,m=n.map(e=>{let n=.036*Math.cos(e)-.006;return G(r*(t.x+f*n),t.y+.03*Math.sin(e),t.z+p*n)});a.push(m),o.push(G(r*(t.x+f*.034),t.y,t.z+p*.034))}let s=Ki(a);oa(s,()=>G(r,0,0),G(r,0,0)),ha(s,a),e.add(`wood`,s,{rough:.35}),e.add(`wood`,Hi(a[0],G(0,0,-1)),{rough:.35}),e.add(`wood`,Hi(a[50],G(0,0,1)),{rough:.35}),e.add(`fittings`,Bi(o,.0065,64,4),{color:Zi.stainless,rough:.22,metal:1})}let r=t.sheerY(0)-.07,i=t.sheerX(0)+.015,a=[];for(let e=0;e<=6;e++){let o=B(-i,i,e/6);a.push(n.map(e=>G(o,r+.03*Math.sin(e),t.zAft-(.036*Math.cos(e)-.006))))}let o=Ki(a);oa(o,e=>G(0,0,e.z-t.zAft+.001),G(0,0,-1)),ha(o,a),e.add(`wood`,o,{rough:.35}),e.add(`wood`,Hi(a[0],G(-1,0,0)),{rough:.35}),e.add(`wood`,Hi(a[6],G(1,0,0)),{rough:.35})}var q=(e,n,r)=>new t(e,n,r),_a={color:Zi.stainless,rough:.22,metal:1},va={color:10725291,rough:.35,metal:1},ya={color:1710877,rough:.55,metal:0};function ba(e=[16738835,16052714,1920924],t=.35){let n=[[[0,0],[.03,.004],[.055,.025],[.07,.07],[.075,.12],[.075,.17]],[[.075,.17],[.075,.22],[.075,.27]],[[.075,.27],[.074,.33],[.068,.39],[.052,.435],[.03,.455],[0,.46]]].map((t,n)=>[zi(t,12),{color:e[n],rough:.55}]);return n.push([U(.011,.013,.46+t+.06,6).translate(0,(.46+t-.06)/2,0),{color:10254924,rough:.75}]),n}function xa(e,t,n){Ta(e,t),Da(e,t),ka(e,t),Aa(e,t),Ma(e,t),Pa(e,t),Fa(e,t),Ia(e,t),Ra(e,t,n)}function Sa(e,t,n,r,i,a,o=0){let s=new Ie;return s.setAttribute(`position`,new I([e.x,e.y,e.z,t.x,t.y,t.z,n.x,n.y,n.z,r.x,r.y,r.z],3)),s.setAttribute(`uv`,new I([0,0,i,0,i,a,0,a],2)),s.setIndex([0,1,2,0,2,3]),s.computeVertexNormals(),{g:s,opts:{rough:i,metal:a,pattern:o}}}var Ca={L:.95,W:.55,H:.37},wa=[[.66,0,-3.25,.02,14201372],[.66,1,-3.23,-.03,3111484],[.64,0,-2.2,-.04,14201372],[-.68,0,-3.25,.03,2040614]];function Ta(e,t){let{L:n,W:r,H:i}=Ca;for(let[a,o,s,c,l]of wa){let u=V(a,t.deckY+.03+o*(i+.035),s,0,c,0),d=(t,n=l)=>{t.g.applyMatrix4(u),e.add(`trap`,t.g,{...t.opts,color:n})},f=r/2,p=n/2;d(Sa(q(-f,0,p),q(f,0,p),q(f,i,p),q(-f,i,p),r,i)),d(Sa(q(f,0,-p),q(-f,0,-p),q(-f,i,-p),q(f,i,-p),r,i)),d(Sa(q(f,0,p),q(f,0,-p),q(f,i,-p),q(f,i,p),n,i)),d(Sa(q(-f,0,-p),q(-f,0,p),q(-f,i,p),q(-f,i,-p),n,i)),d(Sa(q(-f,i,p),q(f,i,p),q(f,i,-p),q(-f,i,-p),r,n)),d(Sa(q(-f,0,-p),q(f,0,-p),q(f,0,p),q(-f,0,p),r,n)),d(Sa(q(-f,0,.08),q(f,0,.08),q(f,i,.08),q(-f,i,.08),r,i));for(let e of[1,-1]){let t=i*.5,n=[q(e*f,t-.12,-.35),q(e*f,t-.12,-.05000000000000002),q(e*f,t+.12,-.05000000000000002),q(e*f,t+.12,-.35)],r=[q(e*.07,t-.045,-.26),q(e*.07,t-.045,-.14),q(e*.07,t+.045,-.14),q(e*.07,t+.045,-.26)];for(let e=0;e<4;e++){let t=(e+1)%4;d(Sa(n[e],n[t],r[t],r[e],n[e].distanceTo(n[t]),n[e].distanceTo(r[e]),1),2510702)}}for(let t of[-.2,0,.2]){let r=H(.05,.032,n+.02);r.translate(t,-.012,0),r.applyMatrix4(u),e.add(`wood`,r,{color:10132114,rough:.8})}for(let t of[-.3,.3]){let n=H(.2,.06,.09);n.translate(.05,.035,t),n.applyMatrix4(u),e.add(`fittings`,n,{color:9320998,rough:.9})}let m=Li(.06,8,6);m.scale(1,1.3,1),m.translate(0,i-.1,-.2),m.applyMatrix4(u),e.add(`fittings`,m,{color:11740702,rough:.8})}}var Ea={x:-1,z:-.62,y:1.34};function Da(e,t){let n=t.tAtSheerZ(-.78),r=-(t.sheerX(n)-.035),i=t.sheerY(n)+.045,a=[q(r,i,-.8),q(r-.02,i+.45,-.78),q(r-.05,1.86,-.76),q(r-.13,2.06,-.74),q(r-.3,2.11,-.73),q(r-.43,2.07,-.72)];e.add(`fittings`,Bi(a,.03,32,8),_a);let o=Ii(.12,.02,.16,.008,1);o.translate(r,i+.01,-.8),e.add(`fittings`,o,_a);let s=a[a.length-1],c=Li(.03,10,6);c.translate(s.x,s.y,s.z),e.add(`fittings`,c,_a),e.add(`fittings`,W(s,s.clone().add(q(0,-.12,0)),.01,6),_a);let l=s.clone().add(q(0,-.22,0));for(let t of[-.022,.022]){let n=U(.085,.085,.01,16);n.applyMatrix4(V(l.x,l.y,l.z+t,Math.PI/2,0,0)),e.add(`fittings`,n,va)}let u=U(.07,.07,.034,16);u.applyMatrix4(V(l.x,l.y,l.z,Math.PI/2,0,0)),e.add(`fittings`,u,{color:2829616,rough:.6});let{x:d,y:f,z:p}=Ea;e.add(`fittings`,W(q(d,t.deckY,p+.1),q(d,f-.1,p+.1),.038,12),va);let m=H(.2,.012,.2);m.translate(d,t.deckY+.006,p+.1),e.add(`fittings`,m,va);let h=U(.075,.075,.17,18);h.applyMatrix4(V(d,f,p+.13,Math.PI/2,0,0)),e.add(`fittings`,h,{color:3817544,rough:.45,metal:.3});let g=zi([[0,-.05],[.2,-.05],[.205,-.04],[.1,-.006],[.1,.006],[.205,.04],[.2,.05],[0,.05]],28);g.applyMatrix4(V(d,f,p,Math.PI/2,0,0)),e.add(`fittings`,g,va);let _=U(.04,.05,.03,12);_.applyMatrix4(V(d,f,p-.06,Math.PI/2,0,0)),e.add(`fittings`,_,va),e.add(`fittings`,Bi([q(d+.05,f,p+.2),q(d+.12,f-.2,p+.3),q(d+.1,.6,p+.28),q(d+.06,t.deckY+.02,p+.25)],.012,20,5),ya),e.add(`fittings`,Bi([q(d-.05,f,p+.2),q(d-.02,f-.25,p+.32),q(d+.02,.62,p+.3),q(d+.02,t.deckY+.02,p+.28)],.012,20,5),ya);let v=[l.clone().add(q(.07,0,0)),q(d-.3,f+.35,p+.02),q(d-.12,f+.2,p),q(d+.2,f-.02,p-.01),q(d+.16,f-.25,p-.01),q(d+.05,.72,p-.1),q(d+.2,t.deckY+.02,p-.35)];e.add(`fittings`,Bi(v,.009,48,4),{color:14991925,rough:.8,pattern:1})}function Oa(e,t,n,r,i,a,o){let s=[],c=r*12;for(let l=0;l<=c;l++){let u=l/c,d=l/12*Math.PI*2+o,f=i*(1-.12*u)+.012*Math.sin(l*.9+o*3),p=t+a+u*r*a*1.35+.004*Math.sin(l*1.7+o);s.push(q(e+Math.cos(d)*f,p,n+Math.sin(d)*f))}let l=s[s.length-1];return s.push(q(l.x*.7+e*.3+.12,l.y-.01,l.z+.2),q(l.x+.35,t+a,l.z+.4)),Bi(s,a,r*21+10,4)}function ka(e,t){e.add(`fittings`,Oa(-.5,t.deckY,-2.15,5,.22,.011,.3),{color:14991925,rough:.8,pattern:1});let n=t.deckY+.03+Ca.H+.012;e.add(`fittings`,Oa(-.68,n,-3.2,4,.19,.01,1.7),{color:3108687,rough:.8,pattern:1})}function Aa(e,t){let n=[[-.2,t.deckY+.075,-2.75,Math.PI/2,.4],[.12,t.deckY+.075,-3,Math.PI/2,-.9]];for(let[t,r,i,a,o]of n){let n=V(t,r,i,a,o,0,1,1,1,`YXZ`);for(let[t,r]of ba(void 0,.3))t.translate(0,-.23,0),t.applyMatrix4(n),e.add(`fittings`,t,r)}}var ja=[[-1,-2.4],[-1,-1.05],[-1,.65],[1,-1.7]];function Ma(e,t){let n=[[0,0],[.03,.004],[.055,.016],[.07,.04],[.075,.07],[.075,.43],[.07,.46],[.055,.484],[.03,.496],[0,.5]];for(let[r,i]of ja){let a=r*(t.hullXAt(i,.8099999999999999)+.08),o=zi(n,12);o.translate(a,.36,i),e.add(`fittings`,o,{color:1915494,rough:.45});let s=Ri(.018,.006,5,10);s.translate(a,.878,i),e.add(`fittings`,s,{color:1915494,rough:.45});let c=t.tAtSheerZ(i),l=t.sheerY(c)+.05,u=r*(t.sheerX(c)+.01),d=r*(t.sheerX(c)-t.shell-.05),f=[q(a,.89,i),q(a-r*.01,(.86+l)/2,i),q(u,l,i),q((u+d)/2,l+.012,i),q(d,l-.03,i)];e.add(`fittings`,Bi(f,.006,16,4),{color:15790056,rough:.8,pattern:1})}}function Na(e,t,n=.2){let r=[],i=U(.011,.011,n*.7,8);i.applyMatrix4(V(0,.045,0,Math.PI/2,0,0)),r.push(i);for(let e of[1,-1]){let t=U(.006,.011,n*.15,8);t.applyMatrix4(V(0,.045,e*n*.425,e*Math.PI/2,0,0)),r.push(t);let i=U(.013,.018,.045,8);i.translate(0,.0225,e*n*.22),r.push(i)}let a=V(e.x,e.y,e.z,0,t,0);return r.map(e=>e.applyMatrix4(a))}function Pa(e,t){let n=[];for(let e of[1,-1])for(let r of[-3.6,-1.35]){let i=t.tAtSheerZ(r);n.push(...Na(q(e*(t.sheerX(i)-.04),t.sheerY(i)+.048,r),0))}let r=t.tAtSheerZ(3.35);n.push(...Na(q(0,la(t,r,0),3.35),Math.PI/2,.24));for(let t of n)e.add(`fittings`,t,_a)}function Fa(e,t){let n=t.sheerY(1),r=Ii(.09,.05,.3,.015,2);r.translate(0,n+.03,t.zBow-.08),e.add(`fittings`,r,_a);for(let r of[1,-1]){let i=H(.008,.07,.16);i.translate(r*.04,n+.08,t.zBow+.02),e.add(`fittings`,i,_a)}let i=U(.03,.03,.07,12);i.applyMatrix4(V(0,n+.085,t.zBow+.07,0,0,Math.PI/2)),e.add(`fittings`,i,ya);let a=q(0,n+.1,t.zBow-.45),o=q(0,n+.12,t.zBow+.13);e.add(`fittings`,W(a,o,.017,8),va);let s=U(.025,.025,.07,10);s.applyMatrix4(V(o.x,o.y,o.z,0,0,Math.PI/2)),e.add(`fittings`,s,va);let c=q(0,-.85,-.4).normalize(),l=new xe(.12,.34,4);l.rotateY(Math.PI/4),l.scale(1,1,.38),l.applyMatrix4(ji(o.clone().add(q(0,-.02,.02)).addScaledVector(c,.17),c)),e.add(`fittings`,l,va);let u=la(t,t.tAtSheerZ(t.zBow-.75),0),d=U(.035,.045,.04,14);d.translate(0,u+.02,t.zBow-.75),e.add(`fittings`,d,_a),e.add(`fittings`,Bi([a,q(0,B(a.y,u,.6)+.03,t.zBow-.6),q(0,u+.04,t.zBow-.75)],.012,10,5),va)}function Ia(e,t){let n=new Oe(.43,.37,.36,4,1);n.rotateY(Math.PI/4),n.scale(1,1,.62),n.translate(-.72,t.deckY+.18,-1.45),e.add(`fittings`,n,{color:2778288,rough:.55});let r=H(.52,.02,.33);r.translate(-.72,t.deckY+.352,-1.45),e.add(`fittings`,r,{color:5909538,rough:.35});let i=.86,a=-.8,o=U(.26,.26,.78,20);o.translate(i,t.deckY+.39,a),e.add(`fittings`,o,{color:2055846,rough:.5});for(let n of[.26,.52]){let r=Ri(.262,.012,5,24);r.applyMatrix4(V(i,t.deckY+n,a,Math.PI/2,0,0)),e.add(`fittings`,r,{color:2055846,rough:.5})}let s=U(.27,.27,.03,20);s.translate(i,t.deckY+.795,a),e.add(`fittings`,s,{color:1789836,rough:.5})}var La={w:.5,h:.33};function Ra(e,t,n){let r=t.sheerY(0)+.045,i=U(.03,.035,.03,12);i.translate(0,r+.015,t.zAft+.03),e.add(`fittings`,i,ya);let a=U(.025,.025,.05,12);a.translate(0,r+.055,t.zAft+.03),e.add(`glow`,a,{color:16774108,rough:.2,pattern:0});let o=U(.03,.028,.012,12);o.translate(0,r+.086,t.zAft+.03),e.add(`fittings`,o,ya);let s=-(t.sheerX(.02)-.08),c=t.zAft+.14,l=r+1;e.add(`fittings`,W(q(s,r-.02,c),q(s,l,c),.014,8,.01),{color:15855592,rough:.3});let u=Li(.02,8,6);u.translate(s,l+.015,c),e.add(`fittings`,u,{color:13148240,rough:.25,metal:1});let d=U(.022,.026,.06,10);d.translate(s,r+.01,c),e.add(`fittings`,d,_a);let{w:f,h:p}=La,m=[],h=[],g=[];for(let e=0;e<=6;e++)for(let t=0;t<=12;t++){let n=t/12,r=e/6;m.push(s,l-.03-p+r*p,c-n*f),h.push(n,r)}for(let e=0;e<6;e++)for(let t=0;t<12;t++){let n=e*13+t,r=n+1,i=n+12+2,a=n+12+1;g.push(n,r,i,n,i,a)}for(let t of[!1,!0]){let n=new Ie;n.setAttribute(`position`,new I(m,3)),n.setAttribute(`uv`,new I(h,2));let r=t?g.map((e,t)=>g[t-t%3+(2-t%3)]):g.slice();n.setIndex(r),n.computeVertexNormals(),Ji(n,(e,t)=>[.7,0,2,h[t*2]]),e.add(`fittings`,n,{color:16777215})}n.flagPivot=q(s,0,c)}var J=(e,n,r)=>new t(e,n,r),Y={wallT:.045,wsBottomY:1.48,wsTopY:2.24,roofUnderY:2.31,roofZ0:-.95,roofZ1:1.34,winBottom:1.56,winTop:2.12,dash:{zFace:.98,yKnee:1.08,zTop:1.16,yTop:1.4,zBack:1.41,halfW:1.1},helmX:-.55,seatZ:.22},za={color:Zi.stainless,rough:.22,metal:1},Ba={color:1710877,rough:.55,metal:0},Va={color:15855851,rough:.35,metal:0},Ha={color:10791083,rough:.55,metal:1},Ua={color:2042426,rough:.6,metal:0};function Wa(e,t){return e.houseFront-(t-Y.wsBottomY)*(.25/.76)}function Ga(e,t,n){return da(e,t)-Math.max(0,n-1.15)*.04}function Ka(e){return 2.375+.035*(1-(e/1.35)**2)}function qa(e,t){let n=e.length,r=Ja(e)>0,i=[];for(let a=0;a<n;a++){let o=e[a],s=e[(a+1)%n],c=s[0]-o[0],l=s[1]-o[1],u=Math.hypot(c,l),d=l/u,f=-c/u;r||(d=-d,f=-f),i.push([o[0]+d*t,o[1]+f*t,c,l])}let a=[];for(let e=0;e<n;e++){let t=i[(e+n-1)%n],r=i[e],o=t[2]*r[3]-t[3]*r[2],s=((r[0]-t[0])*r[3]-(r[1]-t[1])*r[2])/o;a.push([t[0]+t[2]*s,t[1]+t[3]*s])}return a}function Ja(e){let t=0;for(let n=0;n<e.length;n++){let r=e[n],i=e[(n+1)%e.length];t+=r[0]*i[1]-i[0]*r[1]}return t}function Ya(e,t,n){Za(e,t),Qa(e,t),eo(e,t),io(e,t,n),ao(e,t),so(e,t),lo(e,t,n)}function Xa(e){let{winBottom:t,winTop:n}=Y,r=t=>Wa(e,t)-.1;return[[[.3,t],[.78,t],[.78,n],[.3,n]],[[.84,t],[r(t),t],[r(n),n],[.84,n]]]}function Za(e,t){let{wallT:n,roofUnderY:r}=Y,i=t.houseBack,a=t.houseFront,o=[];for(let e=0;e<=8;e++){let n=B(i,a,e/8);o.push([n,t.sheerY(t.tAtSheerZ(n))])}o.push([a,Y.wsBottomY]),o.push([Wa(t,r),r]),o.push([i,r]);let s=Xa(t);for(let r of[1,-1]){let i=Gi(o,s,(e,i,a)=>J(r*(Ga(t,e,i)-a*n),i,e));Ji(i,e=>Math.abs(e.x)<Ga(t,e.z,e.y)-n*.5?[.5,0,2,0]:[.3,0,0,0]),e.add(`gelcoat`,i,{color:Zi.gelcoat});for(let i of s){let a=qa(i,.024);e.add(`fittings`,Gi(a,[qa(i,-.006)],(e,i,a)=>J(r*(Ga(t,e,i)+.008-a*(n+.016)),i,e)),Ha),e.add(`fittings`,Gi(qa(i,-.005),[qa(i,-.014)],(e,i,a)=>J(r*(Ga(t,e,i)+.004-a*(n+.008)),i,e)),{color:921360,rough:.8});let o=qa(i,.011);for(let i=0;i<o.length;i++){let a=o[i],s=o[(i+1)%o.length],c=Math.hypot(s[0]-a[0],s[1]-a[1]),l=Math.max(2,Math.round(c/.075));for(let i=0;i<l;i++){let o=B(a[0],s[0],(i+.5)/l),c=B(a[1],s[1],(i+.5)/l),u=r*(Ga(t,o,c)+.008-(n+.016)-.001),d=U(.0045,.0045,.003,6);d.applyMatrix4(V(u,c,o,0,0,Math.PI/2)),e.add(`fittings`,d,{color:13225168,rough:.35,metal:1})}}}let a=.81,c=1.84,l=H(.02,.06,.025);l.translate(r*(Ga(t,a,c)-n-.012),c,a),e.add(`fittings`,l,Ba)}let c=t.tAtSheerZ(t.houseFront),l=da(t,t.houseFront),u=[];for(let e=0;e<=10;e++){let n=B(-l,l,e/10);u.push([n,la(t,c,n)-.012])}u.push([l,Y.wsBottomY],[-l,Y.wsBottomY]);let d=Gi(u,[],(e,n,r)=>J(e,n,t.houseFront-r*.04));Ji(d,e=>e.z<t.houseFront-.02?[.5,0,2,0]:[.3,0,0,0]),e.add(`gelcoat`,d,{color:Zi.gelcoat})}function Qa(e,n){let{wsBottomY:r,roofUnderY:i}=Y,a=new t(0,.76,-.25).normalize(),o=new t(0,.25,.76).normalize(),s=J(0,r,n.houseFront),c=(i-r)/a.y,l=(e,t)=>s.clone().addScaledVector(a,t).setX(e),u=e=>{let t=l(0,e);return Ga(n,t.z,t.y)},d=u(0),f=u(c),p=[[-d,0],[d,0],[f,c],[-f,c]],m=.07,h=.75,g=[[[-.36,m],[.36,m],[.36,h],[-.36,h]],[[.42,m],[u(m)-.09,m],[u(h)-.09,h],[.42,h]],[[-.42,m],[-.42,h],[-u(h)+.09,h],[-u(m)+.09,m]]];e.add(`gelcoat`,Gi(p,g,(e,t,n)=>l(e,t).addScaledVector(o,-n*.05)),{color:Zi.gelcoat,rough:.3});for(let t of g){let n=qa(t,.022);e.add(`fittings`,Gi(n,[qa(t,-.006)],(e,t,n)=>l(e,t).addScaledVector(o,.008-n*.066)),Ha)}for(let[t,n]of[[0,.25],[-.72,.2]]){let r=l(t,.1).addScaledVector(o,.012),i=a.clone().applyAxisAngle(o,n),s=W(r,r.clone().addScaledVector(i,.52),.006,5);e.add(`fittings`,s,Ba),e.add(`fittings`,W(r.clone().addScaledVector(o,-.01),r.clone().addScaledVector(o,.012),.014,8),Ba)}}function $a(e,t){let n=Ga(e,Math.min(Math.max(t,e.houseBack),1.18),Y.roofUnderY)+.09,r=.22,i=Math.min(t-Y.roofZ0,Y.roofZ1-t);return i<r&&(n-=r-Math.sqrt(Math.max(0,r*r-(r-i)**2))),n}function eo(e,t){let n=Y.roofUnderY,r=[],i=[];for(let e=0;e<=22;e++){let t=e/22,n=.5-.5*Math.cos(Math.PI*t);i.push(B(Y.roofZ0,Y.roofZ1,B(t,n,.6)))}for(let e of[t.houseBack,t.houseFront])for(let t of[-.012,.012]){let n=e+t;n>Y.roofZ0+.02&&n<Y.roofZ1-.02&&i.push(n)}i.sort((e,t)=>e-t);for(let e of i){let i=$a(t,e),a=Ga(t,Math.min(Math.max(e,t.houseBack),t.houseFront),n)-Y.wallT,o=[[0,n],[a*.5,n],[a-.01,n],[a+.01,n],[i-.03,n],[i-.008,n+.008],[i,n+.025],[i-.004,Ka(i)-.012],[i-.02,Ka(i)],[i*.75,Ka(i*.75)],[i*.5,Ka(i*.5)],[i*.25,Ka(i*.25)],[0,Ka(0)]],s=o.map(t=>J(t[0],t[1],e));for(let t=o.length-2;t>=1;t--)s.push(J(-o[t][0],o[t][1],e));r.push(s)}let a=r.length-1,o=Ki(r,{closed:!0});to(o,e=>J(e.x,e.y-2.345,0)),no(o,e=>[e.x,e.z]),Ji(o,e=>e.y>n+.03?[.35,0,1,0]:[.35,0,e.z>t.houseBack&&e.z<t.houseFront&&Math.abs(e.x)<Ga(t,Math.min(Math.max(e.z,t.houseBack),t.houseFront),n)-Y.wallT?3:0,0]),e.add(`gelcoat`,o,{color:Zi.gelcoat}),e.add(`gelcoat`,Hi(r[0],J(0,0,-1)),{color:Zi.gelcoat,rough:.3}),e.add(`gelcoat`,Hi(r[a],J(0,0,1)),{color:Zi.gelcoat,rough:.3});for(let t of[1,-1]){let n=t*1.1,r=Ka(1.1)+.07;e.add(`fittings`,W(J(n,r,-.7),J(n,r,.95),.013,8),za);for(let t of[-.7,-.12,.45,.95])e.add(`fittings`,W(J(n,Ka(1.1)-.01,t),J(n,r,t),.011,6),za)}}function to(e,t){let n=e.attributes.position,r=e.attributes.normal,i=0,a=J(0,0,0),o=J(0,0,0);for(let e=0;e<n.count;e++)a.fromBufferAttribute(n,e),o.fromBufferAttribute(r,e),i+=o.dot(t(a));if(i<0){let t=Array.from(e.index.array);for(let e=0;e<t.length;e+=3){let n=t[e+1];t[e+1]=t[e+2],t[e+2]=n}e.setIndex(t),e.computeVertexNormals()}}function no(e,t){let n=e.attributes.position,r=new Float32Array(n.count*2),i=J(0,0,0);for(let e=0;e<n.count;e++){i.fromBufferAttribute(n,e);let a=t(i);r[e*2]=a[0],r[e*2+1]=a[1]}e.setAttribute(`uv`,new I(r,2))}function ro(){let e=Y.dash,t=new p(e.zFace,e.yKnee),n=new p(e.zTop,e.yTop),r=n.clone().sub(t).normalize();return{along:J(0,r.y,r.x),normal:J(0,r.x,-r.y),at:(e,r)=>J(e,B(t.y,n.y,r),B(t.x,n.x,r)),length:t.distanceTo(n),angle:Math.atan2(r.x,r.y)}}function io(e,t,n){let r=Y.dash,i=[[r.zFace,t.deckY],[r.zFace,r.yKnee],[r.zTop,r.yTop],[r.zBack,r.yTop],[r.zBack,t.deckY]],a=[];for(let e=0;e<i.length;e++){let t=i[e],n=i[(e+1)%i.length];for(let e=0;e<6;e++)a.push([B(t[0],n[0],e/6),B(t[1],n[1],e/6)])}let o=(e,n)=>Math.min(r.halfW,t.halfBreadth(t.tAtSheerZ(e),Math.min(n,t.sheerY(t.tAtSheerZ(e))))-t.shell-.004),s=Gi(a,[],(e,t,n)=>J((n?-1:1)*o(e,t),t,e));Ji(s,()=>[.5,0,2,0]),e.add(`gelcoat`,s,{color:Zi.gelcoat});let c=H(r.halfW*2-.01,.01,r.zBack-r.zTop);c.translate(0,r.yTop+.005,(r.zBack+r.zTop)/2),e.add(`gelcoat`,c,{color:2763823,rough:.85});let l=ro(),u=H(r.halfW*2-.04,l.length-.02,.012);u.applyMatrix4(V(0,0,0,l.angle,0,0)),u.translate(...l.at(0,.5).addScaledVector(l.normal,.004).toArray()),e.add(`fittings`,u,{color:1908514,rough:.7,pattern:4});let d=H(r.halfW*2-.02,.03,.022);d.translate(0,r.yTop+.02,r.zTop+.011),e.add(`wood`,d,{rough:.3});for(let[t,n]of[[-.76,.72],[-.34,.72],[-.55,.9],[-.12,.5],[.02,.5]]){let r=l.at(t,n).addScaledVector(l.normal,.012),i=new C().makeBasis(J(-1,0,0),l.along,l.normal).setPosition(r),a=Ri(.043,.006,4,16);a.applyMatrix4(i),e.add(`fittings`,a,za);let o=new Pe(.042,20);o.applyMatrix4(new C().makeBasis(J(-1,0,0),l.along,l.normal).setPosition(r.clone().addScaledVector(l.normal,.001))),e.add(`glow`,o,{color:16777215,rough:.2,pattern:3})}let f=l.at(.55,.45).addScaledVector(l.normal,.012),p=new C().makeBasis(J(-1,0,0),l.along,l.normal).setPosition(f),m=H(.34,.1,.008);m.applyMatrix4(p),e.add(`fittings`,m,{color:2961462,rough:.5,pattern:4});let h=H(.3,.014,.002);h.applyMatrix4(new C().makeBasis(J(-1,0,0),l.along,l.normal).setPosition(f.clone().addScaledVector(l.along,-.038).addScaledVector(l.normal,.005))),e.add(`fittings`,h,{color:16777215,rough:.5,pattern:8});for(let t=0;t<6;t++){let n=H(.03,.045,.015);n.applyMatrix4(new C().makeBasis(J(-1,0,0),l.along,l.normal).setPosition(f.clone().add(J(-.13+t*.052,0,0)).addScaledVector(l.normal,.008))),e.add(`fittings`,n,{color:1118740,rough:.4});let r=H(.008,.008,.004);r.applyMatrix4(new C().makeBasis(J(-1,0,0),l.along,l.normal).setPosition(f.clone().add(J(-.13+t*.052,0,0)).addScaledVector(l.along,.035).addScaledVector(l.normal,.006))),e.add(`glow`,r,{color:t%3==0?3407718:16733474,rough:.3,pattern:6})}let g=l.at(Y.helmX,.45),_=g.clone().addScaledVector(l.normal,.14);e.add(`fittings`,W(g.clone().addScaledVector(l.normal,-.01),_.clone().addScaledVector(l.normal,-.03),.02,10),za);let v=U(.05,.055,.025,16);v.applyMatrix4(ji(g.clone().addScaledVector(l.normal,.008),l.normal)),e.add(`fittings`,v,{color:2829616,rough:.5}),n.wheelCenter=_,n.wheelAxis=l.normal.clone().negate();let y=-.93,b=1.24,x=Ii(.1,.075,.15,.015,1);x.translate(y,r.yTop+.01+.0375,b),e.add(`fittings`,x,Ba);let S=H(.085,.004,.13);S.translate(y,r.yTop+.01+.077,b),e.add(`fittings`,S,za),n.throttlePivot=J(y,r.yTop+.09,b);let w=Y.helmX,T=1.3,E=zi([[0,0],[.07,0],[.072,.02],[.062,.045],[0,.045]],20);E.translate(w,r.yTop+.01,T),e.add(`fittings`,E,Ba);let D=U(.05,.05,.01,20);D.translate(w,r.yTop+.06,T),e.add(`fittings`,D,{color:2894890,rough:.5});let O=H(.004,.02,.008);O.translate(w,r.yTop+.07,1.345),e.add(`fittings`,O,{color:13647914,rough:.5});let k=Li(.058,20,8,0,Math.PI*2,0,Math.PI/2);k.translate(w,r.yTop+.053,T),e.add(`glass`,k);for(let[t,n]of[[-.06,1],[.38,2]]){let i=.27,a=V(t,r.yTop+.01+i/2+.03,1.29,.3,0,0),o=Ii(.36,i,.07,.018,1);o.applyMatrix4(a),e.add(`fittings`,o,Ba);let s=H(.1,.05,.08);s.translate(t,r.yTop+.035,1.3),e.add(`fittings`,s,Ba);let c=new Se(.31,.21000000000000002);c.applyMatrix4(new C().makeRotationY(Math.PI)),c.applyMatrix4(V(0,.012,-.037)),c.applyMatrix4(a);let l=c.attributes.uv;for(let e=0;e<l.count;e++)l.setX(e,1-l.getX(e));e.add(`glow`,c,{color:16777215,rough:.15,pattern:n})}let ee=1.02,te=Y.roofUnderY-.07,A=Ii(.9,.13,.3,.02,1);A.applyMatrix4(V(-.15,te,ee,-.25,0,0)),e.add(`fittings`,A,{color:2369066,rough:.6});let j=V(-.15,te,ee,-.25,0,0),ne=H(.2,.06,.02);ne.applyMatrix4(new C().makeTranslation(-.18,0,-.155)),ne.applyMatrix4(j),e.add(`fittings`,ne,{color:1118740,rough:.4});let re=new Se(.09,.03);re.applyMatrix4(new C().makeRotationY(Math.PI)),re.applyMatrix4(new C().makeTranslation(-.2,.005,-.168)),re.applyMatrix4(j),e.add(`glow`,re,{color:8257434,rough:.2,pattern:6});for(let t of[-.06,.1,.26]){let n=U(.012,.012,.02,10);n.applyMatrix4(new C().makeRotationX(Math.PI/2)),n.applyMatrix4(new C().makeTranslation(t,0,-.16)),n.applyMatrix4(j),e.add(`fittings`,n,za)}let M=Ii(.05,.08,.03,.01,1);M.translate(-.02,te-.2,.9),e.add(`fittings`,M,Ba),e.add(`fittings`,Bi([J(-.05,te-.04,.87),J(-.08,te-.1,.88),J(-.04,te-.14,.89),J(-.02,te-.16,.9)],.004,16,4),Ba);let ie=U(.08,.085,.012,20);ie.translate(0,Y.roofUnderY-.006,.42),e.add(`glow`,ie,{color:16770744,rough:.4,pattern:5});let ae=H(.5,.62,.01);ae.translate(.55,.72,r.zFace-.004),e.add(`fittings`,ae,{color:1184533,rough:.9});for(let[t,n,i,a]of[[.56,.03,.55,1.045],[.56,.03,.55,.395],[.03,.68,.285,.72],[.03,.68,.815,.72]]){let o=H(t,n,.022);o.translate(i,a,r.zFace-.011),e.add(`wood`,o,{rough:.3})}}function ao(e,t){let n=Y.helmX,r=Y.seatZ,i=t.deckY,a=U(.18,.19,.012,20);a.translate(n,i+.006,r),e.add(`fittings`,a,za),e.add(`fittings`,W(J(n,i,r),J(n,.92,r),.042,14),za);let o=Ri(.17,.011,6,28);o.applyMatrix4(V(n,.62,r,Math.PI/2,0,0)),e.add(`fittings`,o,za);for(let t=0;t<3;t++){let i=t*Math.PI*2/3+.5;e.add(`fittings`,W(J(n+Math.cos(i)*.04,.62,r+Math.sin(i)*.04),J(n+Math.cos(i)*.165,.62,r+Math.sin(i)*.165),.008,6),za)}let s=Ii(.44,.045,.4,.015,1);s.translate(n,.94,r),e.add(`fittings`,s,{color:2829875,rough:.5});let c=Ii(.46,.085,.42,.035,1);c.translate(n,1,r),e.add(`fittings`,c,Ua);let l=Ii(.44,.3,.075,.03,1);l.applyMatrix4(V(n,1.22,r-.2,-.17,0,0)),e.add(`fittings`,l,Ua),e.add(`fittings`,W(J(n,.96,r-.17),J(n,1.12,r-.2),.018,8),za);let u=Ii(.42,.4,.75,.02,1);u.translate(.86,i+.2,.45),e.add(`gelcoat`,u,{color:Zi.gelcoat,rough:.35});let d=Ii(.42,.07,.73,.03,1);d.translate(.86,i+.435,.45),e.add(`fittings`,d,Ua)}function oo(e,t,n,r){return t*(Ga(e,n,r)-Y.wallT)}function so(e,t){let n=Y.dash,r=t.deckY,i=Y.roofUnderY,a=e=>Math.min(da(t,e)-Y.wallT,t.halfBreadth(t.tAtSheerZ(e),r)-t.shell)-.015,s=[],c=t.houseBack-.02,l=n.zFace-.005;for(let e=0;e<=6;e++){let t=B(c,l,e/6);s.push([t,-a(t)])}for(let e=6;e>=0;e--){let t=B(c,l,e/6);s.push([t,a(t)])}let u=Gi(s,[],(e,t,n)=>J(t,r+.009-n*.009,e),{back:!1});e.add(`wood`,u,{rough:.5,pattern:2});for(let n of[-.22,.26,.74]){let r=H(.045,.016,2*(Ga(t,n,i)-Y.wallT)-.02);r.applyMatrix4(V(0,i-.008,n,0,Math.PI/2,0)),e.add(`wood`,r,{rough:.35})}let d=i-.06;e.add(`wood`,W(J(-.32,d,-.2),J(-.32,d,.9),.016,10),{rough:.35});for(let t of[-.12,.35,.82])e.add(`fittings`,W(J(-.32,d,t),J(-.32,i-.004,t),.011,8),za);for(let t of[-.3,.35,.95]){let n=H(.36,.012,.03);n.translate(.64,i-.08,t),e.add(`fittings`,n,Ba);for(let n of[.48,.8])e.add(`fittings`,W(J(n,i-.08,t),J(n,i-.002,t),.005,6),za)}for(let[t,n]of[.54,.64,.74].entries()){let r=i-.066,a=-.42+t*.05;e.add(`fittings`,W(J(n,r,a),J(n,r,1.12),.007,6,.0025),{color:[1776670,2767442,4857626][t],rough:.3}),e.add(`fittings`,W(J(n,r,a),J(n,r,a+.24),.013,8),{color:11831900,rough:.85});let o=U(.034,.034,.03,12);o.applyMatrix4(V(n,r-.045,a+.3,0,0,Math.PI/2)),e.add(`fittings`,o,{color:[9080209,12095552,2829616][t],rough:.3,metal:1}),e.add(`fittings`,W(J(n,r-.012,a+.3),J(n,r-.03,a+.3),.004,5),{color:2829616,rough:.4})}{let n=.56,r=1.33,i=oo(t,1,n,r),a=H(.014,.22,.34);a.translate(i-.007,r,n),e.add(`fittings`,a,{color:3816770,rough:.5,pattern:4});for(let t=0;t<2;t++){let r=1.375-t*.1,a=H(.002,.014,.3);a.translate(i-.015,r+.035,n),e.add(`fittings`,a,{color:16777215,rough:.5,pattern:8});for(let n=0;n<8;n++){let a=H(.016,.034,.02);a.translate(i-.021,r,.42500000000000004+n*.0386),e.add(`fittings`,a,{color:1184532,rough:.4});let o=H(.012,.012,.008);o.translate(i-.034,r+((n*7+t*3)%5==0?-.007:.007),.42500000000000004+n*.0386),e.add(`fittings`,o,{color:(n*7+t*3)%5==0?11545122:1974049,rough:.4})}}}let f=(n,r,i,a)=>{let s=oo(t,1,n,r);e.add(`fittings`,W(J(s,r+.02,n),J(s-.05,r+.04,n),.006,6),za);let c=zi([[.17,0],[.2,.03],[.2,.3],[.21,.5],[.2,.56],[.12,.62],[.05,.66],[.001,.665]].map(([e,t])=>[e*a,t*a]),20);c.applyMatrix4(V(s-.06,r-.66*a,n,0,0,0,.3,1,1)),e.add(`fittings`,c,{color:i,rough:.6,pattern:9});for(let t of[-1,1]){let o=Bi([J(s-.07,r-.12*a,n+t*.17*a),J(s-.1,r-.3*a,n+t*.2*a),J(s-.11,r-.52*a,n+t*.16*a)],.045*a,10,8);e.add(`fittings`,o,{color:i,rough:.6,pattern:9})}let l=Li(.1*a,12,8,0,Math.PI*2,0,Math.PI*.6);l.applyMatrix4(V(s-.04,r-.03,n,.5,0,0,.5,.8,1)),e.add(`fittings`,l,{color:new o(i).multiplyScalar(.85).getHex(),rough:.6,pattern:9})};f(-.12,1.92,14723100,1),f(.14,1.9,14832410,.8);{let n=-.18,i=r+.2,a=oo(t,-1,n,.8),o=a+.075,s=zi([[0,0],[.058,0],[.062,.02],[.062,.3],[.05,.35],[.018,.37],[0,.37]],18);s.translate(o,i,n),e.add(`fittings`,s,{color:11736335,rough:.35});let c=H(.03,.05,.05);c.translate(o,i+.39,n),e.add(`fittings`,c,{color:1710618,rough:.4}),e.add(`fittings`,W(J(o,i+.41,n),J(o+.02,i+.42,-.09),.007,6),{color:9211795,rough:.3,metal:1}),e.add(`fittings`,Bi([J(o,i+.38,-.16),J(o+.03,i+.3,-.10999999999999999),J(o+.05,i+.15,-.12),J(o+.06,i+.08,-.15)],.008,12,5),{color:1315860,rough:.6});for(let t of[.12,.26]){let r=Ri(.064,.004,4,20);r.applyMatrix4(V(o,i+t,n,Math.PI/2,0,0)),e.add(`fittings`,r,za)}let l=H(.006,.3,.07);l.translate(a+.003,i+.19,n),e.add(`fittings`,l,za);let u=U(.0625,.0625,.1,18,1,!0,-.9,1.8);u.translate(o,i+.19,n),e.add(`fittings`,u,{color:16777215,rough:.5,pattern:8})}let p=(n,r,i,a,o,s,c)=>{let l=new Se(a,o);l.applyMatrix4(V(0,0,0,0,n>0?-Math.PI/2:Math.PI/2,0)),l.applyMatrix4(new C().makeRotationX(s)),l.translate(0,i,r);let u=l.getAttribute(`position`);for(let e=0;e<u.count;e++)u.setX(e,oo(t,n,u.getZ(e),u.getY(e))-n*.012);u.needsUpdate=!0,l.computeVertexNormals(),e.add(`fittings`,l,c)};p(-1,.02,1.47,.1,.13,.06,{color:16777215,rough:.3,pattern:7,anim:.15}),p(-1,.15,1.42,.12,.09,-.1,{color:16777215,rough:.3,pattern:7,anim:.7}),p(-1,.36,1.36,.19,.25,.02,{color:16777215,rough:.9,pattern:5});for(let[e,t]of[[-.09,.12],[.09,.12]])p(-1,.36+e,1.36+t,.05,.018,.5,{color:14208936,rough:.8});{let n=.85,r=1.3,i=oo(t,-1,n,r)+.035;e.add(`fittings`,W(J(i,r,.75),J(i,r,.95),.02,12),{color:15909403,rough:.45}),e.add(`fittings`,W(J(i,r,.95),J(i,r,.98),.026,12),{color:1710618,rough:.4});for(let t of[-.06,.05]){let a=Ri(.023,.003,4,12,Math.PI*1.3);a.applyMatrix4(V(i,r,n+t,0,Math.PI/2,-.65)),e.add(`fittings`,a,Ba)}}{let t=n.yTop+.01,r=V(.74,t+.004,1.26,0,.18,0),i=H(.23,.005,.31);i.applyMatrix4(r),e.add(`fittings`,i,{color:7031339,rough:.7});let a=new Se(.21,.28);a.applyMatrix4(V(0,.0035,.012,-Math.PI/2,0,0)),a.applyMatrix4(r),e.add(`fittings`,a,{color:16777215,rough:.9,pattern:5});let o=H(.08,.014,.03);o.applyMatrix4(V(0,.008,.14)),o.applyMatrix4(r),e.add(`fittings`,o,za);let s=-.76,c=1.34,l=Ri(.05,.006,6,18);l.applyMatrix4(V(s,t+.035,c,Math.PI/2,0,0)),e.add(`fittings`,l,Ba);let u=U(.042,.038,.095,18,1,!0);u.translate(s,t+.048,c),e.add(`fittings`,u,{color:2050618,rough:.25});let d=U(.039,.036,.09,18,1,!0);d.translate(s,t+.05,c),co(d),e.add(`fittings`,d,{color:15328472,rough:.25});let f=new Pe(.039,18);f.applyMatrix4(V(s,t+.082,c,-Math.PI/2,0,0)),e.add(`fittings`,f,{color:2758155,rough:.1});let p=new Pe(.038,18);p.applyMatrix4(V(s,t+5e-4,c,Math.PI/2,0,0)),e.add(`fittings`,p,{color:2050618,rough:.4});let m=Ri(.026,.006,6,12,Math.PI);m.applyMatrix4(V(-.802,t+.048,c,0,0,Math.PI/2)),e.add(`fittings`,m,{color:2050618,rough:.25})}{let t=r+.47;for(let[n,r]of[0,.05].entries()){let i=Ii(.34,.05,.4,.02,1);i.applyMatrix4(V(.86,t+.025+r,.28+n*.02,0,.12*n-.05,0)),e.add(`fittings`,i,{color:14832410,rough:.6,pattern:9});for(let i of[-.08,.08]){let a=H(.345,.052,.025);a.applyMatrix4(V(.86,t+.025+r,.28+n*.02+i,0,.12*n-.05,0)),e.add(`fittings`,a,{color:1381653,rough:.7})}}let n=new Se(.3,.22);n.applyMatrix4(V(.85,t+.002,.64,-Math.PI/2,0,.3)),e.add(`fittings`,n,{color:16777215,rough:.85,pattern:6});for(let t=0;t<5;t++){let n=Ri(.15-t*.004,.011,6,28);n.applyMatrix4(V(.62+t*.004,r+.02+t*.02,-.14+t*.006,Math.PI/2+t%2*.06,0,0));let i=n.attributes.uv;for(let e=0;e<i.count;e++)i.setXY(e,i.getX(e)*.94,i.getY(e));e.add(`fittings`,n,{color:2906764,rough:.8,pattern:1})}}}function co(e){let t=Array.from(e.index.array);for(let e=0;e<t.length;e+=3){let n=t[e+1];t[e+1]=t[e+2],t[e+2]=n}e.setIndex(t);let n=e.attributes.normal;for(let e=0;e<n.count;e++)n.setXYZ(e,-n.getX(e),-n.getY(e),-n.getZ(e))}function lo(e,t,n){let r=Ka(0),i=-.5,a=H(.18,.025,.18);a.translate(0,r+.005,i),e.add(`fittings`,a,Va),e.add(`fittings`,W(J(0,r,i),J(0,3.9,i),.042,14,.03),Va);let o=H(.1,.035,.34);o.translate(0,3,-.31),e.add(`fittings`,o,Va);let s=H(.34,.015,.34);s.translate(0,3.02,-.2),e.add(`fittings`,s,Va),e.add(`fittings`,W(J(0,3,-.46),J(0,2.82,-.49),.012,6),Va);let c=zi([[0,0],[.285,0],[.3,.018],[.3,.095],[.29,.14],[.245,.188],[.16,.222],[.07,.234],[0,.236]],24);c.translate(0,3.028,-.2),e.add(`fittings`,c,{color:15987438,rough:.4});let l=U(.302,.302,.02,24,1,!0);l.translate(0,3.05,-.2),e.add(`fittings`,l,{color:3816770,rough:.5});let u=3.45,d=H(.78,.03,.045);d.translate(0,3.4000000000000004,i),e.add(`fittings`,d,Va);for(let t of[1,-1]){let n=t*.4,r=H(.055,.07,.11);r.translate(n,u,-.48),e.add(`fittings`,r,Ba);let i=H(.014,.05,.085);i.translate(n+t*.033,u,-.47),e.add(`glow`,i,{color:t>0?16718350:1376090,rough:.2,pattern:0});let a=H(.004,.07,.12);a.translate(n-t*.03,u,-.48),e.add(`fittings`,a,Ba)}let f=U(.036,.036,.03,12);f.translate(0,3.915,i),e.add(`fittings`,f,Ba);let p=U(.03,.03,.065,12);p.translate(0,3.962,i),e.add(`glow`,p,{color:16774108,rough:.2,pattern:0});let m=U(.034,.038,.016,12);m.translate(0,4.003,i),e.add(`fittings`,m,Ba);for(let t of[1,-1]){let n=t*1.02,r=-.78,i=Ka(1.02),a=Ii(.06,.07,.06,.01,1);a.translate(n,i+.035,r),e.add(`fittings`,a,za);let o=t>0?2.4:1.2,s=U(.005,.013,o,8,10);s.translate(n,i+.07+o/2,r),Ji(s,e=>[.3,0,3,Math.max(0,(e.y-i-.07)/o)]),e.add(`fittings`,s,{color:16053489})}let h=.8,g=Ii(.26,.28,.3,.03,1);g.translate(0,r+.14,h),e.add(`fittings`,g,{color:15987438,rough:.4}),n.radarPivot=J(0,r+.3,h);let _=.42,v=1.05,y=Ka(.42);e.add(`fittings`,W(J(_,y,v),J(_,y+.1,v),.03,10),Ba);let b=U(.065,.06,.15,16);b.applyMatrix4(V(_,y+.17,v,Math.PI/2,0,0)),e.add(`fittings`,b,za);let x=new Pe(.058,16);x.translate(_,y+.17,1.1255),e.add(`glow`,x,{color:16773590,rough:.2,pattern:4});let S=zi([[0,0],[.018,0],[.016,.1],[.024,.17],[.05,.22],[.046,.222],[0,.2]],16);S.applyMatrix4(V(-.42,Ka(.42)+.07,.93,Math.PI/2,0,0)),e.add(`fittings`,S,za),e.add(`fittings`,W(J(-.42,Ka(.42),v),J(-.42,Ka(.42)+.07,v),.012,6),za);let C=.62,w=-.72,T=H(.12,.03,.12);T.translate(C,Ka(C)+.015,w),e.add(`fittings`,T,za);for(let[t,n]of ba())t.translate(C,Ka(C)+.03,w),e.add(`fittings`,t,n);for(let t of[1,-1]){let n=Ii(.13,.07,.08,.01,1);n.translate(t*.55,Y.roofUnderY-.035,Y.roofZ0+.14),e.add(`fittings`,n,Ba);let r=new Se(.11,.06);r.applyMatrix4(V(t*.55,Y.roofUnderY-.071,Y.roofZ0+.14,Math.PI/2+.35,0,0)),e.add(`glow`,r,{color:16773590,rough:.2,pattern:4})}let E=Ga(t,-.02,1.72)+.05,D=Ri(.235,.05,8,24);D.applyMatrix4(V(E,1.72,-.02,0,Math.PI/2,0)),qi(D,e=>{let t=Math.atan2(e.y-1.72,e.z+.02);return Math.abs((t/(Math.PI/2)%1+1)%1-.5)>.4?15921386:15882770}),e.add(`fittings`,D,{rough:.6});let O=H(.03,.05,.08);O.translate(E-.03,1.98,-.02),e.add(`fittings`,O,za)}function uo(){let e=[],t={rough:.3,metal:0};e.push(Ni(Ri(.2,.017,8,40),{...t,color:15251608}));for(let n=0;n<6;n++){let r=n*Math.PI/3+Math.PI/6,i=J(Math.cos(r),Math.sin(r),0),a=U(.009,.013,.15000000000000002,8);a.applyMatrix4(ji(i.clone().multiplyScalar(.125),i)),e.push(Ni(a,{...t,color:15251608}));let o=zi([[0,0],[.011,0],[.013,.02],[.017,.045],[.012,.06],[.01,.07],[.015,.078],[0,.086]],8);o.applyMatrix4(ji(i.clone().multiplyScalar(.195),i)),e.push(Ni(o,{...t,color:15251608}))}let n=zi([[0,-.03],[.05,-.03],[.058,-.012],[.058,.012],[.05,.028],[0,.03]],20);n.applyMatrix4(new C().makeRotationX(Math.PI/2)),e.push(Ni(n,{...t,color:15251608}));let r=Li(.032,16,6,0,Math.PI*2,0,Math.PI/2);return r.applyMatrix4(new C().makeRotationX(-Math.PI/2)),r.translate(0,0,-.028),e.push(Ni(r,{color:13148240,rough:.25,metal:1,pattern:1})),Fi(e)}function fo(){let e=[];e.push(Ni(W(J(0,-.01,0),J(0,.15,.015),.008,8),za));let t=Li(.022,14,10);t.scale(1,1.15,1),t.translate(0,.165,.016),e.push(Ni(t,Ba));let n=U(.02,.02,.05,12);return n.applyMatrix4(new C().makeRotationZ(Math.PI/2)),e.push(Ni(n,za)),Fi(e)}function po(){let e=[];e.push(Ni(U(.05,.06,.06,14),{color:15987438,rough:.4}));let t=Ii(1.05,.12,.1,.035,2);t.translate(0,.09,0),e.push(Ni(t,{color:15987438,rough:.4}));let n=H(.95,.028,.004);return n.translate(0,.09,.051),e.push(Ni(n,{color:2895669,rough:.5})),Fi(e)}function mo(e){return!!e&&e.maxComputeWorkgroupStorageSize>=16384&&e.maxComputeInvocationsPerWorkgroup>=256&&e.maxComputeWorkgroupSizeX>=256&&e.maxStorageTexturesPerShaderStage>=4&&e.maxStorageBuffersPerShaderStage>=3}function ho(e){let t=``;for(let e=0;e<8;e++){let n=1<<e;t+=`
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
}`}function go(e,t,n,r,i,a,o=!1){let s=r*2,c=n?`${n}[ly * ${r}u + lx] = v;`:o?`mipMid[(c * 64u + gy * 8u + gx) * 2u + ${a}u] = v;`:``;return`
  if (lx < ${r}u && ly < ${r}u) {
    let i = ly * ${s*2}u + lx * 2u;
    let v = (${t}[i] + ${t}[i + 1u] + ${t}[i + ${s}u] + ${t}[i + ${s+1}u]) * 0.25;
    textureStore(${e}${i}, vec2u(gx * ${r}u + lx, gy * ${r}u + ly), c, v);
    ${c}
  }`}function _o(e){if(e===null)return[[`d`,0],[`n`,1]];if(e!==0&&e!==1)throw RangeError(`Field channel must be 0, 1, or null`);return[[e===0?`d`:`n`,e]]}function vo(e=null){let t=_o(e),n=``;for(let[e]of t)n+=`var<workgroup> ${e}2: array<vec4f, 64>;
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
`;for(let[e,r]of[[3,4],[4,2],[5,1]]){for(let[i,a]of t)n+=go(`${i}Out`,`${i}${e-1}`,e<5?`${i}${e}`:null,r,e,a,e===5);e<5&&(n+=`
  workgroupBarrier();
`)}return n+`
}`}function yo(e=null){let t=_o(e),n=``;for(let[e]of t)n+=`var<workgroup> ${e}5: array<vec4f, 64>;
var<workgroup> ${e}6: array<vec4f, 16>;
var<workgroup> ${e}7: array<vec4f, 4>;
`;n+=`@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid: vec3u, @builtin(workgroup_id) wid: vec3u) {
  let lx = lid.x; let ly = lid.y; let c = wid.z;
  let gx = 0u; let gy = 0u;
  let i = (c * 64u + ly * 8u + lx) * 2u;
`;for(let[e,r]of t)n+=`  ${e}5[ly * 8u + lx] = mipMid[i + ${r}u];\n`;n+=`  workgroupBarrier();
`;for(let[e,r]of[[6,4],[7,2],[8,1]]){for(let[i,a]of t)n+=go(`${i}Out`,`${i}${e-1}`,e<8?`${i}${e}`:null,r,e,a);e<8&&(n+=`
  workgroupBarrier();
`)}return n+`
}`}function bo(e,{ComputeKernel:t,commonModule:n,fftCommon:r,oceanU:i,limits:a}){if(!mo(a))throw Error(`Insufficient negotiated limits for paired columns`);let o=e=>({storage:e,access:`read_write`}),s=(e,t)=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}}),c=e.displacementTexture,l=e.derivativeTexture;e.columnKernel=new t({label:`Ocean Paired Columns + Mip1`,modules:[n],bindings:{...i,tmp:o(e.tmp),foam:o(e.foam),mipSrc:o(e.mipSrc),dispOut:s(c,0),derivOut:s(l,0),dispMip1:s(c,1),derivMip1:s(l,1)},workgroupSize:[256,1,1],code:ho(r)}),e.fusedMipFields=a.maxStorageTexturesPerShaderStage>=8;let u=e.derivativeOnly?[1]:e.fusedMipFields?[null]:[0,1];e.mipKernelsA=u.map(n=>{let r={mipSrc:o(e.mipSrc),mipMid:o(e.mipMid)};for(let[e,t]of _o(n))for(let n=2;n<=5;n++)r[`${e}Out${n}`]=s(t===0?c:l,n);return new t({label:`Ocean Paired Mips 2-5`+(n===null?``:` field${n}`),bindings:r,workgroupSize:[8,8,1],code:vo(n)})}),e.mipKernelsB=u.map(n=>{let r={mipMid:o(e.mipMid)};for(let[e,t]of _o(n))for(let n=6;n<=8;n++)r[`${e}Out${n}`]=s(t===0?c:l,n);return new t({label:`Ocean Paired Mips 6-8`+(n===null?``:` field${n}`),bindings:r,workgroupSize:[8,8,1],code:yo(n)})})}function xo(e,t){let n=e===`Ocean FFT Rows`,r=e===`Ocean FFT Columns`,i=e===`Ocean Paired Columns + Mip1`;return t=t.replaceAll(`let c = i32( gid.z );`,`let c = i32( gid.z ) + 2;`).replaceAll(`let c = wid.y;`,`let c = wid.y + 2u;`).replaceAll(`let c = wid.z;`,`let c = wid.z + 2u;`).replace(`let idx = gid.z *`,`let idx = ( gid.z + 2u ) *`),e===`Ocean Copy H0`&&(t=t.replace(/\s*foam\[ idx \] = 0\.0;/,``)),n?t:((n||r)&&(t=t.replace(/let a0 = fftShared\[ i2 \]; /g,``).replace(/let b0 = fftCmul2\( fftShared\[ j2 \], w \); /g,``),t=t.replace(/^\s*fftShared\[ (?:i2|j2) \] = a0 [+-] b0;\n/gm,``),n&&(t=t.replace(/\s*\/\/ Dx_hat[\s\S]*?(?=\s*\/\/ c2 =)/,`
`),t=t.replace(/^\s*fftShared\[ r \] = vec4f\( c0, c1 \);\n/gm,``).replace(/^\s*tmp\[ o \] = fftShared\[ x \* 2u \];\n/gm,``)),r&&(t=t.replace(/^\s*fftShared\[ r \] = tmp\[ idx \* 2u \];\n/gm,``).replace(/^\s*let A = fftShared\[ y \* 2u \] \* sign;\n/gm,``).replace(/^\s*let Dx = A.x;[^\n]*\n/gm,``).replace(/\s*let jxx = lambda \* Dxx \+ 1\.0;[\s\S]*?(?=\s*let uv =)/,`
`).replace(/^\s*let vDisp = [^;]+;\n/gm,``).replace(/^\s*textureStore\( dispOut,[^\n]+\n/gm,``).replace(/^\s*mipSrc\[ idx \* 2u \] = vDisp;\n/gm,``))),i&&(t=t.replace(/let a0 = fftShared\[i2\]; /g,``).replace(/\s*let b0 = fftCmul2\(fftShared\[j2\], w\);/g,``),t=t.replace(/^\s*fftShared\[(?:i2|j2)\] = a0 [+-] b0;\n/gm,``).replace(/^\s*fftShared\[r\] = tmp\[idx \* 2u\];\n/gm,``).replace(/^\s*let A = fftShared\[k\] \* sign;\n/gm,``).replace(/^\s*let Dx = A.x;[^\n]*\n/gm,``).replace(/\s*let jxx = lambda \* Dxx \+ 1\.0;[\s\S]*?(?=\s*let uv =)/,`
`).replace(/^\s*let vDisp = [^;]+;\n/gm,``).replace(/^\s*textureStore\(dispOut,[^\n]+\n/gm,``).replace(/^\s*fftShared\[k\] = vDisp;\n/gm,``).replace(/^\s*let vd = [^;]+;\n/gm,``).replace(/^\s*textureStore\(dispMip1,[^\n]+\n/gm,``).replace(/^\s*mipSrc\[dst\] = vd;\n/gm,``)),t)}var X=256,So=8,Co=X/2,wo=[733,157,33.3,7.1],To=Math.PI*2,Eo=class{constructor(e={}){this.scale=e.scale??1,this.windSpeed=e.windSpeed??8,this.windDirection=e.windDirection??20,this.fetch=e.fetch??200,this.spreadBlend=e.spreadBlend??.9,this.swell=e.swell??.2,this.peakEnhancement=e.peakEnhancement??3.3,this.shortWavesFade=e.shortWavesFade??.01}},Do=`
const FFT_N: u32 = ${X}u;
const FFT_HALF: u32 = ${Co}u;
const FFT_G: f32 = ${v};

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
`,Oo=class{constructor(e,t={}){if(this.renderer=e,this.cascades=t.cascades??4,this.derivativeOnly=t.derivativeOnly===!0,this.derivativeOnly&&this.cascades!==4)throw Error(`Rocha derivatives retain logical cascades 2 and 3 of four`);this.fusedMips=t.fusedMips??new URLSearchParams(globalThis.location?.search||``).has(`fusedOcean`),this.fusedMips&&!mo(N.limits)&&(console.warn(`Fused ocean unsupported by negotiated limits; retaining original kernels.`),this.fusedMips=!1),this.sizes=(t.sizes??wo).slice(0,this.cascades),this.depth=t.depth??500,this.local=new Eo(t.local??{windSpeed:7,windDirection:25,fetch:120,spreadBlend:.85,swell:.05}),this.swell=new Eo(t.swell??{scale:.48,windSpeed:6,windDirection:5,fetch:1200,spreadBlend:1,swell:.9,shortWavesFade:.1});let r=this.cascades;this.params=new l(`OceanParams`,{sizes:[`vec4f[4]`,[0,1,2,3].map(e=>new n(this.sizes[e]??1,0,0,0))],cuts:[`vec4f[4]`,[0,1,2,3].map(()=>new n)],sysA:[`vec4f[2]`,[new n,new n]],sysB:[`vec4f[2]`,[new n,new n]],choppiness:[`f32`,t.choppiness??.9],foamBias:[`f32`,.58],foamGain:[`f32`,3],foamDecay:[`f32`,.35],foamAdd:[`f32`,2.5],time:[`f32`,0],depth:[`f32`,this.depth],seed:[`u32`,1337]},{label:`ocean`});let i=this.params.fields;this.choppiness=i.choppiness,this.foamBias=i.foamBias,this.foamGain=i.foamGain,this.foamDecay=i.foamDecay,this.foamAdd=i.foamAdd,this.time=i.time,this.uDepth=i.depth,this.uSeed=i.seed,this.timeScale=1;let a=X*X*r;this.h0=new ce({label:`fftH0`,count:a,type:`vec4f`}),this.waveData=new ce({label:`fftWave`,count:a,type:`vec4f`}),this.tmp=new ce({label:`fftTmp`,count:a*2,type:`vec4f`}),this.foam=new ce({label:`fftFoam`,count:a,type:`f32`}),this.mipSrc=new ce({label:`fftMipSrc`,count:this.fusedMips?a/2:a*2,type:`vec4f`}),this.mipMid=new ce({label:`fftMipMid`,count:64*r*2,type:`vec4f`});let o=e=>new P({label:e,width:X,height:X,depth:r,dimension:`2d-array`,format:`rgba16float`,mips:!0,usage:[`sample`,`storage`,`copyDst`,`copySrc`],sampler:`linearRepeat`});this.displacementTexture=o(`oceanDisplacement`),this.derivativeTexture=o(`oceanDerivatives`),this.module=new g({name:`ocean`,deps:[F],uniforms:this.params,uniformName:`ocean`,bindings:{oceanDisplacement:{texture:this.displacementTexture,viewDimension:`2d-array`},oceanDerivatives:{texture:this.derivativeTexture,viewDimension:`2d-array`}},code:`
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
`}),this._buildKernels(),this.updateSpectrumUniforms(),this.needsSpectrum=!0}get uSizes(){return{array:this.sizes}}setCascadeSizes(e){this.sizes=e.slice(0,this.cascades),this.updateSpectrumUniforms()}updateSpectrumUniforms(){let e=this.cascades,t=this.params.fields;for(let n=0;n<e;n++){let r=n===0?1e-4:To/this.sizes[n]*6,i=n===e-1?9999:To/this.sizes[n+1]*6;t.cuts.value[n].set(r,i,0,0),t.sizes.value[n].set(this.sizes[n],0,0,0)}t.depth.value=this.depth;let n=[this.local,this.swell];for(let e=0;e<2;e++){let r=n[e],i=Math.max(1,r.fetch)*1e3,a=Math.max(.1,r.windSpeed),o=.076*(v*i/(a*a))**-.22,s=22*(a*i/(v*v))**-.33;t.sysA.value[e].set(r.scale,f.degToRad(r.windDirection),r.spreadBlend,r.swell),t.sysB.value[e].set(o,s,r.peakEnhancement,r.shortWavesFade)}this.params.set(`cuts`,t.cuts.value),this.params.set(`sizes`,t.sizes.value),this.params.set(`sysA`,t.sysA.value),this.params.set(`sysB`,t.sysB.value),this.needsSpectrum=!0}_buildKernels(){this.cascades;let e={ocean:{uniform:this.params}},t=e=>({storage:e,access:`read_write`}),n=this.derivativeOnly,r=class extends j{constructor(e){super(n?{...e,code:xo(e.label,e.code)}:e)}};this.initSpectrumKernel=new r({label:`Ocean Init Spectrum`,modules:[F],bindings:{...e,h0:t(this.h0),waveData:t(this.waveData)},workgroupSize:[16,16,1],code:Do+`
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
	let kx = f32( x - ${Co} ) * dk;
	let kz = f32( y - ${Co} ) * dk;
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
}`});let i=``;for(let e=0;e<So;e++){let t=1<<e;i+=`
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
	}`}let a=`var<workgroup> fftShared: array<vec4f, ${X*2}>;\n`;if(this.rowKernel=new r({label:`Ocean FFT Rows`,modules:[F],bindings:{...e,h0:t(this.h0),waveData:t(this.waveData),tmp:t(this.tmp)},workgroupSize:[Co,1,1],code:Do+a+`
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
}`}),this.fusedMips){bo(this,{ComputeKernel:r,commonModule:F,fftCommon:Do,oceanU:e,limits:N.limits});return}let o=(e,t)=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}});this.columnKernel=new r({label:`Ocean FFT Columns`,modules:[F],bindings:{...e,tmp:t(this.tmp),foam:t(this.foam),mipSrc:t(this.mipSrc),dispOut:o(this.displacementTexture,0),derivOut:o(this.derivativeTexture,0)},workgroupSize:[Co,1,1],code:Do+a+`
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
}`});let s=(N.limits.maxStorageTexturesInComputeStage??N.limits.maxStorageTexturesPerShaderStage)<5,c=(e,t,n,r,i)=>{let a=n*2,o=``;return t?o=`${t}[ ly * ${n}u + lx ] = v;`:r===5&&(o=`mipMid[ ( c * 64u + gy * 8u + gx ) * 2u + ${i}u ] = v;`),`
	if ( lx < ${n}u && ly < ${n}u ) {
		let i = ly * ${2*a}u + lx * 2u;
		let v = ( ${e}[ i ] + ${e}[ i + 1u ] + ${e}[ i + ${a}u ] + ${e}[ i + ${a+1}u ] ) * 0.25;
		${s&&r===5?``:`textureStore( out${r}, vec2u( gx * ${n}u + lx, gy * ${n}u + ly ), c, v );`}
		${o}
	}`},l=(e,n)=>new r({label:`Ocean Mips A`,bindings:{mipSrc:t(this.mipSrc),mipMid:t(this.mipMid),out1:o(e,1),out2:o(e,2),out3:o(e,3),out4:o(e,4),...s?{}:{out5:o(e,5)}},workgroupSize:[16,16,1],code:`
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
${c(`s1`,`s2`,8,2,n)}
	workgroupBarrier();
${c(`s2`,`s3`,4,3,n)}
	workgroupBarrier();
${c(`s3`,`s4`,2,4,n)}
	workgroupBarrier();
${c(`s4`,null,1,5,n)}
}`}),u=(e,n)=>new r({label:`Ocean Mips B`,bindings:{mipMid:t(this.mipMid),...s?{out5:o(e,5)}:{},out6:o(e,6),out7:o(e,7),out8:o(e,8)},workgroupSize:[8,8,1],code:`
var<workgroup> s5: array<vec4f, 64>;
var<workgroup> s6: array<vec4f, 16>;
var<workgroup> s7: array<vec4f, 4>;
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y; let c = wid.z;
	let gx = 0u; let gy = 0u;
	s5[ ly * 8u + lx ] = mipMid[ ( c * 64u + ly * 8u + lx ) * 2u + ${n}u ];
	${s?`textureStore( out5, vec2u( lx, ly ), c, s5[ ly * 8u + lx ] );`:``}
	workgroupBarrier();
${c(`s5`,`s6`,4,6,n)}
	workgroupBarrier();
${c(`s6`,`s7`,2,7,n)}
	workgroupBarrier();
${c(`s7`,null,1,8,n)}
}`});this.mipKernelsA=this.derivativeOnly?[l(this.derivativeTexture,1)]:[l(this.displacementTexture,0),l(this.derivativeTexture,1)],this.mipKernelsB=this.derivativeOnly?[u(this.derivativeTexture,1)]:[u(this.displacementTexture,0),u(this.derivativeTexture,1)]}update(e){let t=this.derivativeOnly?2:this.cascades;if(this.needsSpectrum){this.needsSpectrum=!1;let e=[X/16,X/16,t];this.initSpectrumKernel.dispatch(e),this.conjugateKernel.dispatch(e),this.copyH0Kernel.dispatch(e)}this.time.value+=e*this.timeScale,N.computePass(`Ocean FFT`,e=>{this.rowKernel.dispatch([X,t,1],{pass:e}),this.columnKernel.dispatch([this.fusedMips?X/2:X,t,1],{pass:e});for(let n of this.mipKernelsA)n.dispatch([X/32,X/32,t],{pass:e});for(let n of this.mipKernelsB)n.dispatch([1,1,t],{pass:e})},this.timestampWrites||void 0)}sampleDisplacement(e,t=null,n=null){let r=[];for(let i=0;i<this.cascades;i++){let a=`textureSampleLevel( oceanDisplacement, smpLinearRepeat, ( ${e} ) / ocean.sizes[ ${i} ].x, ${i}, ${t??`0.0`} ).xyz`;n&&(a+=` * ( ${n[i]} )`),r.push(a)}return`( `+r.join(` + `)+` )`}},ko=.4,Ao={left:.15,right:.15,bottom:.6,top:0},jo={cx:(Ao.right-Ao.left)/2,cy:(Ao.top-Ao.bottom)/2,sx:1+(Ao.left+Ao.right)/2,sy:1+(Ao.top+Ao.bottom)/2},Mo=new C().set(1/jo.sx,0,0,-jo.cx/jo.sx,0,1/jo.sy,0,-jo.cy/jo.sy,0,0,1,0,0,0,0,1),No=new C,Po=new T,Fo=new t,Io=class{constructor({meshRenderer:e,scene:t,camera:n,sceneRenderer:r,scale:i=.5}){this.meshRenderer=e,this.scene=t,this.camera=n,this.sceneRenderer=r,this.scale=i,this.enabled=!0,this.objectFilter=null,this.volumeFilter=null,this.optimizationStats={excludedObjects:0,excludedVolumes:0},this.guard=jo,this._camera=Object.create(n),this._camera.projectionMatrix=new C,this.block=d(`refraction`),this.target=new le(1,1,{colors:[`rgba16float`],depth:cn,label:`refraction`}),this.texture=this.target.texture,this.depthTexture=this.target.depthTexture,this._clearColors=[[0,0,0,0]],this._filter=e=>{if(this.objectFilter&&!this.objectFilter(e))return this.optimizationStats.excludedObjects++,!1;let t=e.material;return t.underwaterLighting===`none`||t.isWaterMaterial?!1:e.isInstancedMesh?this._instancedMinY(e)>=this._clipY?!1:this.volumeFilter&&!this.volumeFilter(Po,e)?(this.optimizationStats.excludedVolumes++,!1):!0:!e.geometry.attributes.position||(Po.copy(this._localBox(e)).applyMatrix4(e.matrixWorld),Po.min.y>=this._clipY?!1:this.volumeFilter&&!this.volumeFilter(Po,e)?(this.optimizationStats.excludedVolumes++,!1):!0)},this._boxes=new WeakMap,this._instBoxes=new WeakMap,this._clipY=0,this._defines={REFRACTION_CLIP:1,REFRACTION_CLIP_MARGIN:ko}}_instancedMinY(e){let t=e.instanceMatrix,n=this._instBoxes.get(e);return(!n||n.version!==(t.version||0)||n.count!==e.count||n.array!==t.array)&&(e.computeBoundingBox(),n={version:t.version||0,count:e.count,array:t.array,box:e.boundingBox.clone()},this._instBoxes.set(e,n)),n.count?Po.copy(n.box).applyMatrix4(e.matrixWorld).min.y:1/0}_localBox(e){let t=e.geometry,n=t.drawRange||{start:0,count:1/0},r=this._boxes.get(e);if(r&&r.geometry===t&&r.start===n.start&&r.count===n.count&&r.version===(t.attributes.position.version||0))return r.box;let i=new T,a=t.attributes.position;if(n.start===0&&(n.count===1/0||n.count===null))t.boundingBox||t.computeBoundingBox(),i.copy(t.boundingBox);else{let e=t.index?t.index.array:null,r=e?e.length:a.count,o=Math.min(r,n.start+(n.count??1/0));for(let t=n.start;t<o;t++){let n=e?e[t]:t;Fo.set(a.getX(n),a.getY(n),a.getZ(n)),i.expandByPoint(Fo)}}return this._boxes.set(e,{geometry:t,start:n.start,count:n.count,version:a.version||0,box:i}),i}render(e){this.optimizationStats.excludedObjects=this.optimizationStats.excludedVolumes=0;let t=this.sceneRenderer,n=this.guard,r=Math.max(1,Math.round(t.width*this.scale*n.sx)),i=Math.max(1,Math.round(t.height*this.scale*n.sy));(this.target.width!==r||this.target.height!==i)&&this.target.setSize(r,i),this._clipY=e+ko;let o=this.target,s=b.fields,c=this._camera;c.projectionMatrix.multiplyMatrices(Mo,this.camera.projectionMatrix),No.multiplyMatrices(Mo,s.prevViewProjNoJitter.value),a(c,r,i,{jitterX:s.jitter.value.x/n.sx*r/2,jitterY:s.jitter.value.y/n.sy*i/2,prevViewProj:No,prevCameraPos:s.prevCameraPos.value,block:this.block}),this.meshRenderer.render(this.scene,{label:`refraction`,kind:`color`,camera:c,frameBlock:this.block,colorViews:[o.texture.view()],colorFormats:o.formats,clearColors:this._clearColors,depthView:o.depthTexture.view(),depthFormat:cn,clearDepth:0,layerMask:this.enabled?1<<on.OPAQUE:0,filter:this._filter,defines:this._defines})}},Lo=1.333,Ro=new g({name:`waterFresnel`,deps:[F],code:`
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
`}),zo=class extends qe{constructor({surface:e,sky:t,sceneCopy:n,sceneDepthHalf:r=null,refraction:i=null,reflection:a=null,hullMask:o=null,hullMaskActive:s=null}){super({name:`water`,lit:!1,side:`double`,transparent:!1,blending:`none`,depthWrite:!0,defines:{IS_WATER:1},attributes:{nodeData:`vec4f`},varyings:{vLagXZ:`vec2f`,vWaveH:`f32`,vSeaDepth:`f32`,vFoam:`f32`,vShoreN:`vec3f`,vShoreFoam:`f32`,vSurfMask:`vec2f`},uniforms:{backscatter:[`f32`,.035],sss:[`f32`,1],refraction:[`f32`,.06],foamIntensity:[`f32`,1],waterRoughness:[`f32`,.035],reflectionStrength:[`f32`,1],ssr:[`f32`,1],debugMode:[`i32`,0],hullActive:[`f32`,0]}}),this.isWaterMaterial=!0,this.lightingHooks=!1,this.waterSurface=e,this.sky=t,this.reflection=a,this.clouds=null,this.cheap=!1,this.cameraWaterHeightNode=null;let c=this.uniforms;this.params={absorption:h.waterAbsorption,scattering:h.waterScattering,backscatter:c.backscatter,sss:c.sss,refraction:c.refraction,foamIntensity:c.foamIntensity,roughness:c.waterRoughness,reflectionStrength:c.reflectionStrength,ssr:c.ssr},this.debugMode=c.debugMode,this.sceneDepthTexture=n.depthTexture,this.sceneColorTexture=n.texture,this.sceneDepthHalfTexture=r,this.refraction=i,this.hullMaskTexture=o,this.hullMaskActive=s,s&&(this.uniformBlock.fields.hullActive=s),this._built=!1}get _hullOn(){return this._hull?this.hullOverride!==void 0&&this.hullOverride!==null?!!this.hullOverride:this.hullMaskActive.value>.5:!1}pipelineKey(){return this._built||this._build(),super.pipelineKey()+(this._hullOn?`.hull`:``)}allDefines(){return{...super.allDefines(),WATER_HULL:+!!this._hullOn}}_build(){this._built=!0;let e=this.waterSurface,t=this.sky,n=!!e.terrain,r=!!e.shore,i=!!e.shoreSim,a=!!e.surfFoam,o=!!(this.clouds&&this.clouds.module),s=!!(this.hullMaskTexture&&this.hullMaskActive),c=!!(this.reflection&&this.reflection.module);this.modules=[F,Ro,Uo,hi,e.module,t&&t.module,o&&this.clouds.module,i&&e.shoreSim.module,c&&this.reflection.module,this.cameraWaterHeightNode&&this.cameraWaterHeightNode.module].filter(Boolean),this.bindings.waterSceneColor={texture:this.sceneColorTexture},this.bindings.waterSceneDepth={texture:this.sceneDepthTexture,sampleType:`unfilterable-float`},this.sceneDepthHalfTexture&&(this.bindings.waterSceneDepthHalf={texture:this.sceneDepthHalfTexture}),this.setDefine(`WATER_DEPTH_HALF`,+!!this.sceneDepthHalfTexture);let l=!!this.refraction;l&&(this.bindings.waterRefrColor={texture:this.refraction.texture},this.bindings.waterRefrDepth={texture:this.refraction.depthTexture,sampleType:`unfilterable-float`}),this.setDefine(`WATER_REFRACTION`,+!!l),s&&(this.bindings.waterHullMask={texture:this.hullMaskTexture,sampleType:`unfilterable-float`}),this._hull=s,this.vertex=`
	let r = waterSurfaceVertex( v.nodeData, v.position.xz );
	v.useWorld = true;
	v.worldPos = r.position;
	v.worldNormal = vec3f( 0.0, 1.0, 0.0 );
	o.vLagXZ = r.lagXZ;
	o.vWaveH = r.height;
	o.vSeaDepth = r.depth;
	o.vFoam = r.foam;
	o.vShoreN = r.shoreN;
	o.vShoreFoam = r.shoreFoam;
	o.vSurfMask = r.surfMask;
`,this.output=this.cheap?`r.color = vec4f( 0.02, 0.05, 0.1, 1.0 ); r.mask = vec4f( 0.0, 1.0, 0.0, 1.0 );`:this._shadeWGSL({T:n,SH:r,SIM:i,SF:a,CL:o,HULL:s,REFL:c}),this.needsUpdate=!0}_shadeWGSL({T:e,SH:t,SIM:n,SF:r,CL:i,HULL:a,REFL:o}){this.waterSurface;let s=t,c=t,l=e&&t,u=this.cameraWaterHeightNode?String(this.cameraWaterHeightNode):`frame.cameraWaterHeight`;return`
	let pos = in.P;
	let screenUV = in.pixel * frame.invResolution;
	let posV = ( frame.view * vec4f( pos, 1.0 ) ).xyz;
	let lagXZ = in.vs.vLagXZ;
	let vDepth = in.vs.vSeaDepth;
	let vHeight = in.vs.vWaveH;
	// footprint of this pixel on the surface (m) — for filtering / roughness (uniform control flow)
	let footprint = max( length( fwidth( lagXZ ) ), 1e-4 );

#if WATER_HULL
	// No sea inside a hull: the surface behind the nearest face of the hull volume is water the hull
	// keeps out (without this it shows through the cockpit sole when the stern squats or the boat heels)
	if ( mat.hullActive > 0.5 && in.front ) {
		let mSize = vec2f( textureDimensions( waterHullMask ) );
		let hullDist = textureLoad( waterHullMask, vec2i( clamp( screenUV, vec2f( 0.0 ), vec2f( 0.9999 ) ) * mSize ), 0 ).x;
		if ( hullDist > 0.01 && length( pos - frame.cameraPos ) > hullDist - 0.02 ) { discard; }
	}
#endif

	let toCam = frame.cameraPos - pos;
	let dist = length( toCam );
	let V = toCam / dist;
	let L = frame.sunDir;
	// the sun light reaching the surface: sun colour x shadow maps (three's direct light), x clouds,
	// x the island's own shadow (heightfield horizon: the shadow map's range is too short to hold it)
	// (5-tap PCF: the waves break up any penumbra detail the contact-hardening filter would add)
	var sunLight = frame.sunColor * sunShadowPCF( pos, vec3f( 0.0, 1.0, 0.0 ), in.pixel );
${i?`	sunLight *= cloudsShadow( pos.xz );`:``}
${e?`	sunLight *= terrainSunShadowAt( pos );`:``}

	// water film thickness at this pixel and the distance to the swash front (ShoreWaves.swashEdge):
	// the sheet ends exactly on its analytic leading edge, not on the mesh triangles
	let groundH = ${e?`terrainHeightAt( pos.xz )`:`-500.0`};
	var thickness = ${e?`pos.y - groundH`:`10.0`};
	var frontD = 1e3;
	var swTau = 0.0;
	var swRt = 0.0;
${l?`	if ( vDepth < 1.0 ) {
		let tRaw = thickness;
		let se = shoreSwashEdge( pos.xz, thickness );
		thickness = se.x; frontD = se.y; swTau = se.z; swRt = se.w;
		// The draining sheet has no rounded front: it thins out over decimetres and breaks up where the
		// sand drains faster. The analytic front runs parallel to the shoreline; kept as a hard, smooth
		// edge (with the uprush's meniscus, rim and contact shadow) it read as a dark line ruled along
		// the beach between the foam and the wet sand.
		let backwash = smoothstep( 0.32, 0.46, swTau );
		if ( backwash > 0.0 && swRt > 0.0 && frontD < 3.0 ) {
			frontD += ( perlin2( pos.xz * 1.1 ) * 0.35 + perlin2( pos.xz * 3.7 + vec2f( 5.3, 1.9 ) ) * 0.15 ) * backwash;
			thickness = min( tRaw, frontD * mix( 0.08, 0.025, backwash ) );
		}
	}`:``}
	// the foam line riding the swash front, per pixel: a dense bubbly bead right at the edge while
	// the sheet runs up, a thinning lace behind it; weaker in the backwash (it sinks into the sand)
	let uprush = smoothstep( 0.46, 0.32, swTau );
	let bead = smoothstep( -0.01, 0.05, frontD ) * smoothstep( 0.6, 0.12, frontD );
	let trail = smoothstep( -0.01, 0.25, frontD ) * smoothstep( 2.2, 0.3, frontD );
	// patchy along the front (dense bunches and thin stretches), not an even white rope (only where
	// the edge foam below can be non-zero: it is weighted by the run-up and the shallow depth)
	var edgePatch = 1.0;
${l?`	if ( swRt > 0.0 && vDepth < 0.4 ) {
		edgePatch = smoothstep( -0.45, 0.55, perlin2( pos.xz * 0.42 ) ) * 0.7 + smoothstep( -0.3, 0.6, perlin2( pos.xz * 1.7 + vec2f( 3.1, 7.7 ) ) ) * 0.3;
	}`:``}
	let edgeFoam = ( bead * mix( 0.45, 1.1, uprush ) * mix( 0.35, 1.0, edgePatch ) + trail * mix( 0.12, 0.4, uprush ) * edgePatch ) * smoothstep( 0.0, 1.0, swRt ) * smoothstep( 0.4, -0.2, vDepth );
	// the meniscus: the last decimetre of the advancing sheet bends down to the sand
	let lipW = ( 1.0 - smoothstep( 0.0, 0.14, frontD ) ) * uprush;

	let simState = ${n?`shoreSimSample( pos.xz )`:`vec4f( 0.0 )`};
	let surf = waterSurfaceFragment( lagXZ, footprint, vDepth, in.vs.vFoam, in.vs.vShoreN, in.vs.vShoreFoam + edgeFoam, simState.x, simState, in.vs.vSurfMask, pos );
	var foam = surf.foam;
	// the whale's churned white water and flat fluke-print slick (WhaleWater.js)
	let whaleW = whaleWater( pos.xz );
	foam = max( foam, whaleW.x );

	// Which medium is the view ray in before it reaches this fragment? The water surface is a closed
	// interface: a front face (its air side towards the camera) is seen from the air, a back face from
	// the water. For the visible (nearest) fragment this is the medium the ray starts in at the near
	// clip plane, which is exactly how the clip plane slices the water. The winding can't be trusted
	// in folds of the choppy / breaking surface: there, and well above or below the surface, the
	// camera's own medium decides.
	let camH = frame.cameraPos.y - ${u};
${t?`	let folded = surf.jacobian < 0.1 || normalize( in.vs.vShoreN ).y < 0.35;`:`	let folded = surf.jacobian < 0.1;`}
	let nearSurface = abs( camH ) < 1.5;
	let viewFromBelow = select( camH < 0.0, ! in.front, nearSurface && ! folded );
	let seenFromBelow = select( 0.0, 1.0, viewFromBelow );
	// shading normal on the viewer's side of the interface. Triangle winding can't be trusted
	// (tiny self-intersections of the choppy FFT surface render as back faces seen from above),
	// so pick the side from the camera and bend facets that face away to grazing instead of
	// flipping them (a flipped normal turns a fold into a white sky-mirror patch).
	let Nup = normalize( mix( surf.normal, vec3f( 0.0, 1.0, 0.0 ), whaleW.y * 0.75 ) );
	let Nside = select( Nup, - Nup, viewFromBelow );
	let Nview = normalize( Nside + V * max( - dot( Nside, V ) + 0.03, 0.0 ) );

	// roughness from unresolved slope variance (Cox-Munk: mss = 0.003 + 0.00512 U)
	let mss = ( 0.003 + frame.windSpeed * 0.00512 ) * waterSurface.slopeScale;
	let kpx = PI / footprint;
	let unresolved = sat( log2( 110.0 / kpx ) / 9.0 );
	let roughVar = surf.rough * surf.rough;
	let alpha2 = ( mat.waterRoughness * mat.waterRoughness + mss * 2.0 * unresolved * roughVar + foam * 0.2 + surf.aeration * 0.03 ) * ( 1.0 - whaleW.y * 0.6 );
	// slope spread the mesh / normal maps can't show at this distance (for the reflection)
	let sigmaUnres = sqrt( mss * unresolved * roughVar );

	var outCol = vec3f( 0.0 );
	var ssrW = 0.0;
	var dbgPath = 0.0;
	var dbgScene = vec3f( 0.0 );
	var dbgSrc = vec3f( 0.0 ); // which image the seabed came from (debug view 12)
	var dbgRefr = vec3f( 0.0 ); // refraction image at the end point: coverage, depth > 0, behind (13)

	if ( ! viewFromBelow ) {

		// ================= ABOVE WATER =================
		// near the leading edge the surface bends down to meet the sand like a rounded bead
		// (meniscus), tilting the normal toward dry land
		let edgeW = max( ( 1.0 - smoothstep( 0.0, 0.006, thickness ) ) * uprush, lipW );
		let nr = ${e?`terrainNormalRock( pos.xz )`:`vec4f( 0.0 )`};
		let uphill = normalize( - vec2f( nr.x, nr.y ) + vec2f( 1e-5, 0.0 ) );
		let N = normalize( Nview + vec3f( uphill.x, 0.0, uphill.y ) * ( edgeW * edgeW * 0.7 ) );
		let NdV = max( dot( N, V ), 1e-4 );
		let F = fresnelDielectric( NdV, ${Lo} );

		// ---- reflection
		let Rraw = reflect( - V, N );
		// unresolved facets tilt the average reflection toward the higher, darker sky: rough
		// patches (gusts) darken toward the horizon, slicks stay bright and mirror-like
		let Rup = max( Rraw.y, 0.004 ) + sigmaUnres * 1.3 * ( 1.0 - max( Rraw.y, 0.0 ) );
		let R = normalize( vec3f( Rraw.x, Rup, Rraw.z ) );
		// reflections pointing below the horizon hit other waves: fade toward a dark sea color
		let horizonOcc = max( smoothstep( -0.12, 0.08, Rraw.y ), smoothstep( 0.25, 0.06, thickness ) );
		// (unused where both its weights are 0: horizonOcc here, the rim at the swash front below)
		var skyRefl = vec3f( 0.0 );
		if ( horizonOcc > 0.0 || frontD < 0.1 ) { skyRefl = skyReflectionRadiance( R ); }
		var reflCol = mix( frame.horizonColor * 0.35, skyRefl, horizonOcc );

		// objects (pier, boat, hills, village) reflected from the screen; only rays close to the
		// horizon can hit anything, so steep reflections skip the march entirely
		// (looking down, F is tiny: the reflection can't be seen, skip the march)
		if ( Rraw.y < 0.45 && F > 0.05 && mat.ssr > 0.5 ) {
			let Rv = normalize( ( frame.view * vec4f( Rraw, 0.0 ) ).xyz );
			// (rays toward the camera get no weight: see facing in _waterSSR)
			if ( Rv.z < 0.5 ) {
				let r = _waterSSR( posV, Rv, pos.y, Rraw.y );
				reflCol = mix( reflCol, r.rgb, r.a );
				ssrW = r.a;
			}
		}
${o?`
		// planar reflection of scene objects (alpha = coverage)
		let rOffset = N.xz * 0.8 / max( dist, 1.0 ) * 4.0;
		let rs = reflectionSample( screenUV, rOffset );
		reflCol = mix( reflCol, rs.rgb, rs.a );`:``}

		reflCol *= mat.reflectionStrength;

		// ---- sun specular (GGX), sun light already includes shadowing
		let H = normalize( L + V );
		let NdL = max( dot( N, L ), 0.0 );
		let NdH = max( dot( N, H ), 0.0 );
		let VdH = max( dot( V, H ), 0.0 );
		let Fs = fresnelDielectric( VdH, ${Lo} );
		let spec = _waterDGGX( NdH, alpha2 ) * _waterVSmithGGX( NdL, NdV, alpha2 ) * Fs * NdL;
		// physically the glint is ~1e5x brighter than the sky; clamp to stay inside fp16 range
		let sunSpec = sunLight * min( spec, 400.0 );

		// ---- refraction / water volume
		// Trace the refracted view ray (Snell) to the sea floor instead of using the straight
		// screen ray: at grazing angles the straight ray overestimates the water path ~10x.
		// view ray inside the water (unit, downward). Facets of a curling crest can refract it
		// upward on a coarse mesh; keep it heading down into the water body.
		let Tr = refract( - V, N, 1.0 / ${Lo} );
		let Tv = normalize( vec3f( Tr.x, min( Tr.y, -0.08 ), Tr.z ) );
		let tDown = max( - Tv.y, 0.04 );
		let surfViewZ = posV.z;

		// water column below the surface along the refracted ray (terrain, 2 refinements)
${e?`		let L0 = max( pos.y - groundH, 0.0 ) / tDown;
		// deep water: the end point is capped at 80 m and the column is opaque long before, so the
		// refinements can't change the result
		var Lt = L0;
		if ( L0 < 100.0 ) {
			let L1 = max( pos.y - terrainHeightAt( pos.xz + Tv.xz * min( L0, 200.0 ) ), 0.0 ) / tDown;
			Lt = max( pos.y - terrainHeightAt( pos.xz + Tv.xz * min( L1 * 0.5 + L0 * 0.5, 200.0 ) ), 0.0 ) / tDown;
		}`:`		let Lt = 400.0;`}
		let Lter = clamp( Lt, 0.0, 400.0 );
		// thin breaking crests: the refracted ray leaves through the back of the wave into the sky
		let crestT = ${s?`shoreCrestPath( lagXZ, vDepth, Tv )`:`1e4`};
		let thruCrest = crestT < Lter;

		// project the refracted end point to the screen
		let pEnd = pos + Tv * min( Lter, 80.0 );
		let clipEnd = frame.proj * ( frame.view * vec4f( pEnd, 1.0 ) );
		let ndcEnd = clipEnd.xy / max( clipEnd.w, 1e-4 );
		let uvR = vec2f( ndcEnd.x * 0.5 + 0.5, ndcEnd.y * -0.5 + 0.5 );
		let onScreen = all( uvR > vec2f( 0.0 ) ) && all( uvR < vec2f( 1.0 ) );
		var uvF = screenUV;
		var dR = 0.0;
		var sceneCol = vec3f( 0.0 );
		var found = false;
#if WATER_REFRACTION
		// the scene below the water only (RefractionPass): nothing above the water (pier, rails, posts,
		// the boat) can hide the refracted end point. Coverage in alpha: bilinear across its edge, then
		// un-premultiplied, so the clip boundary blends instead of darkening.
		// The image extends past the screen (RefractionPass guard band): the refracted end points of the
		// pixels near the bottom edge land below the screen (light bends down into the water), and the
		// seabed there is drawn. Lookups project with this frame's jittered camera, as the image was.
		{
			let cj = frame.viewProj * vec4f( pEnd, 1.0 );
			let uvRc = _waterRefrUV( cj.xy / max( cj.w, 1e-4 ) );
			let rc = textureSampleLevel( waterRefrColor, smpLinearClamp, uvRc, 0.0 );
			let rSize = vec2f( textureDimensions( waterRefrDepth ) );
			let rd = textureLoad( waterRefrDepth, vec2i( min( uvRc * rSize, rSize - 1.0 ) ), 0 ).x;
			// only what lies behind this surface point can be seen through it: submerged parts of
			// objects in front of it (the hull of the boat you stand in, pier piles) would otherwise be
			// pasted onto the sea far out, wherever the end point lands on them (or off screen next to
			// them: the edge texel)
			dbgRefr = vec3f( rc.a, select( 0.0, 1.0, rd > 0.0 ), select( 0.0, 1.0, surfViewZ + viewDepth( rd ) > WATER_BEHIND ) );
			if ( rc.a > 0.5 && rd > 0.0 && surfViewZ + viewDepth( rd ) > WATER_BEHIND ) {
				sceneCol = rc.rgb / rc.a;
				uvF = uvR;
				dR = rd;
				found = true;
			} else if ( rc.a > 0.5 && rd > 0.0 ) {
				// the end point lies on something in front (a pile, a hull): what lies straight behind
				// this pixel, from the same (lit) source. The opaque copy shades deep seabed cheaply and
				// flickered against it as the piles passed in front while walking the pier.
				let uvS = _waterRefrUV( vec2f( screenUV.x * 2.0 - 1.0, 1.0 - screenUV.y * 2.0 ) );
				let rcS = textureSampleLevel( waterRefrColor, smpLinearClamp, uvS, 0.0 );
				let rdS = textureLoad( waterRefrDepth, vec2i( min( uvS * rSize, rSize - 1.0 ) ), 0 ).x;
				if ( rcS.a > 0.5 && rdS > 0.0 && surfViewZ + viewDepth( rdS ) > WATER_BEHIND ) {
					sceneCol = rcS.rgb / rcS.a;
					uvF = screenUV;
					dR = rdS;
					found = true;
				}
			}
		}
#endif
		if ( ! found ) {
			// nothing under the water there (shallows above the clip height, off screen): the opaque copy,
			// where the refracted sample lies behind the water surface, else the unrefracted pixel
			let dO = _waterSceneDepthAt( uvR );
			let valid = onScreen && surfViewZ + viewDepth( dO ) > WATER_BEHIND;
			uvF = select( screenUV, uvR, valid );
			dR = select( _waterSceneDepthAt( screenUV ), dO, valid );
			sceneCol = textureSampleLevel( waterSceneColor, smpLinearClamp, uvF, 0.0 ).rgb;
		} else {
			// Thin water (the swash film on the sand): the refraction offset is a few pixels at most and
			// nothing can stand between the film and the sand, so the opaque pass's own image of the sand
			// is the right one: it has the wet swash sand and its ripples, which the refraction image
			// draws as plain seabed and leaves out altogether above its clip height (0.4 m). Switching
			// between the two there drew a hard straight line across the wet sand along that height.
			let filmW = 1.0 - smoothstep( 0.04, 0.3, thickness );
			if ( filmW > 0.0 ) {
				let dO = _waterSceneDepthAt( uvR );
				let uvO = select( screenUV, uvR, onScreen && surfViewZ + viewDepth( dO ) > WATER_BEHIND );
				sceneCol = mix( sceneCol, textureSampleLevel( waterSceneColor, smpLinearClamp, uvO, 0.0 ).rgb, filmW );
			}
		}
		// (a branch: select() would evaluate the sky for every pixel)
		if ( thruCrest ) { sceneCol = skyReflectionRadiance( normalize( vec3f( Tv.x, max( abs( Tv.y ), 0.03 ), Tv.z ) ) ); }

		// objects in front of the sea floor (pylons, rocks, reef) shorten the path
		let qView = viewPositionFromViewZ( uvF, - viewDepth( dR ) );
		let qDist = length( qView - posV );
		var pathLen = clamp( min( Lter, qDist ), 0.0, 400.0 );
		pathLen = min( pathLen, crestT );
		dbgPath = pathLen;
		dbgScene = sceneCol;
		dbgSrc = select( vec3f( 1.0, 0.0, 0.0 ), vec3f( 0.0, 1.0, 0.0 ), found );

		// bubbles mixed into the water (the surf behind breakers, wakes): a strong scatterer, the water
		// turns milky turquoise and the bottom disappears (WaterSurface.fragment aeration)
		let aer = surf.aeration;
		// sand stirred up where the bores have just passed (the foam they left marks that water):
		// clouds of sediment, not a uniform tint
		let sandK = ${n?`sat( simState.x * 2.5 ) * 1.8 + 0.45`:`1.0`};
${c?`		// surf zone: sand and bubbles stirred up by the breakers (see ShoreWaves.surfMedium)
		let surfMed = shoreSurfMedium( pos.xz, vDepth );
		let sigA = frame.waterAbsorption + surfMed.absorb * sandK;
		// (bubble plumes are shallow and patchy: a moderate scatterer, milky turquoise rather than a glow)
		let sigS = frame.waterScattering + surfMed.scatter * sandK + aer * 1.6;`:`		let sigA = frame.waterAbsorption;
		let sigS = frame.waterScattering + aer * 1.6;`}
		let sigT = sigA + sigS;

		// refracted sun direction
		let Ls = - refract( - L, vec3f( 0.0, 1.0, 0.0 ), 1.0 / ${Lo} ); // toward the sun from underwater
		let muS = max( Ls.y, 0.1 );
		let muV = max( - Tv.y, 0.15 );

		let Tview = exp( - sigT * pathLen );

		// in-scattered light along the view ray (single scattering sun + ambient), analytic
		// light at depth z: E0 * exp(-sigT * z / mu). Along the view ray z = s * muV.
		let sunIn = sunLight * ( 1.0 - fresnelDielectric( max( L.y, 0.02 ), ${Lo} ) );
		let kSun = sigT * ( 1.0 + muV / muS );
		let kAmb = sigT * ( 1.0 + muV / 0.75 );
		let cosPh = dot( Tv, Ls );
		let phase = waterPhaseHG( cosPh, 0.86 ) * 0.7 + ${(.3/(4*Math.PI)).toFixed(8)};
		let bb = sigS * mix( mat.backscatter, 0.06, sat( aer * 2.0 ) );
		// multiple-scattering boosted backscatter (Gordon R = 0.33 bb/(a+bb))
		let albedoMS = bb * ( 0.33 * 4.0 ) / ( sigA + bb );
		let inSun = sunIn * ( sigS * phase + albedoMS * sigT * INV_PI ) * ( 1.0 - exp( - kSun * pathLen ) ) / kSun;
		let inAmb = frame.skyIrradiance * ( sigS * 0.25 + albedoMS * sigT ) * ( 1.0 - exp( - kAmb * pathLen ) ) / kAmb;

		// crest translucency (sun shining through thin wave tips)
		let vH = normalize( vec2f( V.x, V.z ) );
		let lH = normalize( vec2f( L.x, L.z ) + 1e-5 );
		// (light entering the top and back of a thin crest scatters out of the face over a broad lobe:
		// side-lit waves glow green too, not only when looking straight into the sun)
		let back = pow( sat( dot( vH, - lH ) * 0.6 + 0.4 ), 2.5 );
		let crest = sat( vHeight * 0.9 + 0.1 ) * ( sat( ( 1.0 - N.y ) * 4.0 ) + 0.25 );
		let sssCol = vec3f( 0.12, 0.55, 0.45 ) * 0.06;
		let sss = sunLight * sssCol * back * crest * mat.sss * smoothstep( 0.0, 0.25, L.y );

		// the bead of the meniscus shades the sand right under it
		let transmitted = sceneCol * Tview * ( 1.0 - 0.3 * lipW ) + inSun + inAmb + sss;

		// ---- foam
		// foam: bright diffuse scatterer (albedo ~0.85), wrapped sun + sky irradiance (skyIrradiance = E/PI)
${r?`		let foamLit = surfFoamLight( surf.foamInfo, N, L, V, sunLight, pos );`:`		let foamLit = ( sunLight * ( max( dot( N, L ), 0.0 ) * 0.75 + 0.25 ) * INV_PI + frame.skyIrradiance * 0.95 ) * 0.85;`}
		let foamCol = foamLit * mat.foamIntensity;

		// a thin bright rim just behind the edge: the rounded bead catches the sky
		let rim = smoothstep( 0.0, 0.025, frontD ) * smoothstep( 0.1, 0.035, frontD ) * uprush;
		let water = mix( transmitted, reflCol, F ) + sunSpec + skyRefl * ( 0.22 * rim );
		let shaded = mix( water, foamCol + sunSpec * 0.05, sat( foam ) );
		// fade into the sand right at the leading edge (anti-aliased by the film thickness)
		let edgeAA = smoothstep( 0.0, max( fwidth( thickness ) * 1.5, 0.004 ), thickness );
		// contact shadow: the sand just ahead of the advancing edge is darkened (the bead's
		// shadow and the wetting front), fading within ~15 cm
		outCol = shaded;
		if ( edgeAA < 1.0 ) {
			let contact = smoothstep( -0.16, -0.005, frontD ) * ( 1.0 - edgeAA ) * uprush;
			let sandC = textureSampleLevel( waterSceneColor, smpLinearClamp, screenUV, 0.0 ).rgb * ( 1.0 - 0.3 * contact );
			outCol = mix( sandC, shaded, edgeAA );
		}

	} else {

		// ================= BELOW WATER (looking up at the surface) =================
		let N = Nview;
		let NdV = max( dot( N, V ), 1e-4 );
		// from water (n=1.333) into air: eta = 1/1.333
		let F = fresnelDielectric( NdV, ${(1/Lo).toFixed(8)} );
		let Tt = refract( - V, N, ${Lo} );
		let tValid = dot( Tt, Tt ) > 0.5;
		let Td = normalize( select( vec3f( 0.0, 1.0, 0.0 ), Tt, tValid ) );
		// sky through Snell's window; the sun disk is bounded so grazing refractions of it far
		// away cannot bloom through the fog
		let skyT = min( skyRadianceWithClouds( Td, true ), vec3f( 60.0 ) );

		// total internal reflection mirrors the lit water body below: the radiance of an
		// infinitely long view ray through the medium in the reflected direction
		let sigA = frame.waterAbsorption; let sigS = frame.waterScattering; let sigT = sigA + sigS;
		let bb = sigS * mat.backscatter;
		let albedoMS = bb * ( 0.33 * 4.0 ) / ( sigA + bb );
		let Rr = reflect( - V, N );
		let LsU = - refract( - L, vec3f( 0.0, 1.0, 0.0 ), 1.0 / ${Lo} );
		let muU = max( LsU.y, 0.15 );
		let phR = waterPhaseHG( dot( Rr, LsU ), 0.86 ) * 0.7 + ${(.3/(4*Math.PI)).toFixed(8)};
		let kS = sigT * ( 1.0 - min( Rr.y, 0.0 ) / muU );
		let kA = sigT * ( 1.0 - min( Rr.y, 0.0 ) / 0.8 );
		let eSunU = sunLight * ( 1.0 - fresnelDielectric( max( L.y, 0.02 ), ${Lo} ) );
		let deepCol = eSunU * ( sigS * phR + albedoMS * sigT * INV_PI ) / kS
			+ frame.skyIrradiance * PI * ( sigS * ( 1.0 / ( 4.0 * PI ) ) + albedoMS * sigT * INV_PI ) / kA;

		// objects above the water seen through Snell's window (from the viewport)
		let sceneDepthC = _waterSceneDepthAt( screenUV );
		let sceneZ = - viewDepth( sceneDepthC );
		let hasObj = posV.z - sceneZ > 0.0 && sceneZ > - frame.far * 0.9;
		let objCol = textureSampleLevel( waterSceneColor, smpLinearClamp, screenUV, 0.0 ).rgb;
		let transmittedU = select( skyT, objCol, hasObj );

		let foamUnder = ( frame.skyIrradiance + sunLight * 0.5 ) * 0.25;
		outCol = mix( transmittedU * ( 1.0 - F ) + deepCol * F, foamUnder, sat( foam ) * 0.7 );

	}

	// debug views: 1 = back faces red, 2 = normals, 3 = foam, 7 = the seabed seen through, 12 = its source
	let dbg = mat.debugMode;
	var res = min( outCol, vec3f( 16000.0 ) );
	if ( dbg == 1 ) {
		res = select( vec3f( 50.0, 0.0, 0.0 ), res, in.front );
	} else if ( dbg == 2 ) {
		res = Nview * 0.5 + 0.5;
	} else if ( dbg == 3 ) {
		res = vec3f( foam );
	} else if ( dbg == 4 ) {
		let nanN = Nup.x != Nup.x || Nup.y != Nup.y || Nup.z != Nup.z;
		let nanL = lagXZ.x != lagXZ.x || lagXZ.y != lagXZ.y;
		let big = length( surf.slopes ) > 4.0;
		res = vec3f( select( 0.0, 1.0, nanN ), select( 0.0, 1.0, nanL ), select( 0.0, 1.0, big ) ) + 0.05;
	} else if ( dbg == 10 ) {
		res = vec3f( ssrW );
	} else if ( dbg == 6 ) {
		res = vec3f( dbgPath * 0.02, 0.0, 0.0 );
	} else if ( dbg == 9 ) {
		let sceneDepthC = _waterSceneDepthAt( screenUV );
		let dz = - viewDepth( sceneDepthC );
		res = vec3f( sceneDepthC * 100.0, - dz * 0.02, - posV.z * 0.02 );
	} else if ( dbg == 8 ) {
		res = vec3f( 0.0, vDepth * 0.02, 0.0 );
	} else if ( dbg == 7 ) {
		res = dbgScene;
	} else if ( dbg == 13 ) {
		res = dbgRefr;
	} else if ( dbg == 12 ) {
		// green: the refraction image, red: the opaque copy (nothing below the water there in the image)
		res = dbgSrc;
	} else if ( dbg == 11 ) {
		// surf foam sources: whitewater of the breaking wave (r), foam carried by the shore sim (g), clear plunging face (b)
		res = vec3f( in.vs.vShoreFoam, simState.x, in.vs.vSurfMask.x );
	} else if ( dbg == 5 ) {
		res = vec3f( fract( lagXZ.x * 0.1 ), fract( vHeight ), fract( lagXZ.y * 0.1 ) );
	}
	r.color = vec4f( res, 1.0 );
	// camera velocity for TAA (default: static), plus the water mask (SceneRenderer) for the
	// underwater pass: whether the visible surface is seen from below
	r.mask = vec4f( seenFromBelow, 1.0, 0.0, 1.0 );
`}},Bo=jo,Vo=e=>e.toFixed(6),Ho=`
// a refracted sample is usable when it lies this far behind the water surface (view depth, m): objects in
// front of it (the hull you stand in, pier piles) are rejected
const WATER_BEHIND: f32 = 0.05;
// screen NDC -> uv in the refraction image, which extends past the screen (RefractionPass guard band)
fn _waterRefrUV( ndc: vec2f ) -> vec2f {
	let n = ( ndc - vec2f( ${Vo(Bo.cx)}, ${Vo(Bo.cy)} ) ) / vec2f( ${Vo(Bo.sx)}, ${Vo(Bo.sy)} );
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
`,Uo=new g({name:`waterHelpers`,deps:[F],code:Ho}),Wo=Math.PI*2,Go=.066,Ko=.4,qo=.55,Jo=1.2,Yo=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`};function Xo(e,t){return`
fn ${e}( xz: vec2f, depth: f32, groundH: f32 ) -> ShoreSample {
	let ph = shorePhaseAt( xz );
	let sh = ph.sh;
	let exposure = ph.exposure;
	let along = ph.along;
	let dir = ph.dir;
	let Tp = shoreP.period;

	let d = depth;
	let c = sqrt( clamp( d, 0.3, 25.0 ) * SHORE_GRAVITY );
	let lam = c * Tp;

	let s = ph.s;
	let m = floor( s + 0.5 );
	let u = s - m;

	// wave height with smooth hand-over between consecutive waves at the trough
	let A0 = shoreWaveAmp( m, along );
	let An = shoreWaveAmp( m + sign( u ), along );
	let A = mix( A0, An, smoothstep( 0.32, 0.5, abs( u ) ) * 0.5 );
	// the breaking state of the whole wave comes from the depth under its crest
	let dB = shoreBreakDepth( xz, dir, u, lam, d );

	// offshore fade-in (FFT covers deep water) and fade on land (the swash sheet takes over there)
	let env = smoothstep( 26.0, 13.0, d ) * smoothstep( -0.25, 0.05, d ) * sat( exposure * 1.4 ) * shoreP.enabled;

	// finite difference along the propagation direction for the normal
	let e = 0.15;
	var face = 0.0;
	var roller = 0.0;
${t===`world`?`	let r = shoreWorld( u, A, dB, lam, env );
	let s0 = vec4f( r.z, r.y, r.x, r.w );`:t===`normal`?`	let pair = shoreShapePair( u, - e / lam, A, dB, lam );
	let s0 = pair.s0;
	let s1 = pair.s1;
	face = s1.z * env;
	roller = s1.w * env;`:`	let s0 = shoreShape( u, A, dB, lam );`}

	var disp = vec3f( dir.x * s0.x, s0.y, dir.y * s0.x ) * env;

	var nShore = vec3f( 0.0, 1.0, 0.0 );
${t===`normal`?`	{
		let dX = e + ( s1.x - s0.x ) * env;
		let dY = ( s1.y - s0.y ) * env;
		let tAlong = vec3f( dir.x * dX, dY, dir.y * dX );
		let tAcross = vec3f( - dir.y, 0.0, dir.x );
		// epsilon: never a zero vector; never facing down (the mesh doesn't overhang, the lip sheet does)
		let n = normalize( cross( tAcross, tAlong ) + vec3f( 0.0, 1e-4, 0.0 ) );

		// the whitewater roller is not a smooth tube: lumps of foam tumble along its front and over
		// its top (relief of a few decimetres, with its slope in the normal). Noise, not a sum of sines:
		// regular bumps along the crest read as a row of identical puffs. Bigger, fewer lumps in some
		// stretches, a lower, smoother churn in others (different for every wave).
		let sx = u * lam; // rest position along the wave direction (m, seaward)
		let t = frame.time;
		let mW = floor( ph.s + 0.5 );
		// (the lumps only exist on the roller: amp is 0 elsewhere)
		if ( roller != 0.0 ) {
		let lumpy = sat( perlin2( vec2f( along * 0.045, mW * 3.7 ) ) * 1.2 + 0.55 );
		let amp = roller * mix( 0.25, 0.7, lumpy );
		let q1 = vec2f( along * 0.28, sx * 0.7 - t * 0.8 );
		let q2 = vec2f( along * 0.8 + 11.3, sx * 1.6 - t * 1.5 );
		let eL = 0.25;
		let L0 = perlin2( q1 ) * 0.7 + perlin2( q2 ) * 0.3;
		let La = perlin2( q1 + vec2f( eL * 0.28, 0.0 ) ) * 0.7 + perlin2( q2 + vec2f( eL * 0.8, 0.0 ) ) * 0.3;
		let Ls = perlin2( q1 + vec2f( 0.0, eL * 0.7 ) ) * 0.7 + perlin2( q2 + vec2f( 0.0, eL * 1.6 ) ) * 0.3;
		// lumps stand up from the roller (rounded caps, flatter troughs between them)
		let lump = max( L0 * 1.5 + 0.2, -0.3 );
		disp.y += lump * amp;
		let dAlong = select( 0.0, ( La - L0 ) / eL * 1.5, L0 * 1.5 + 0.2 > -0.3 );
		let dSx = select( 0.0, ( Ls - L0 ) / eL * 1.5, L0 * 1.5 + 0.2 > -0.3 );
		let dShore = - dSx; // d/d(shoreward) = - d/dsx
		let g = ( vec2f( - dir.y, dir.x ) * dAlong + dir * dShore ) * amp * n.y;
		nShore = normalize( vec3f( n.x - g.x, max( n.y, 0.04 ), n.z - g.y ) );
		} else {
			nShore = normalize( vec3f( n.x, max( n.y, 0.04 ), n.z ) );
		}
	}`:``}

	// ---- swash: run-up of the most recent wave on the sand
	let swr = shoreSwashRunup( sh, along, groundH );
	let front = swr.Rt - swr.inland; // signed distance to the leading edge (m), > 0 under the sheet
	let covered = front > 0.0;
	// leading edge velocity along the slope (m/s), positive = uphill
	let dRdt = select( pow( max( swr.sb, 1e-3 ), 0.6 ) * ( - 1.6 / SHORE_SWASH_DOWN ), pow( 1.0 - swr.su, 0.5 ) * ( 1.5 / SHORE_SWASH_UP ), swr.isUp ) * swr.RhMax / Tp;
	// thin sheet (a few cm, thickening behind the leading edge). The mesh sheet overshoots the
	// leading edge a little; the water shader cuts it exactly on the front (swashClip), so the edge
	// doesn't follow the mesh triangles.
	let fm = front + SHORE_SWASH_OVERSHOOT;
	let thick = clamp( min( fm * 0.3, max( fm - 0.1, 0.0 ) * ( SHORE_BEACH_SLOPE * 0.22 ) + 0.03 ), -0.1, 0.12 );
	let swashLevel = groundH + thick;
	// bubbly foam line riding the leading edge all the way up (left behind as the swash mark)
	let uprush = smoothstep( 0.46, 0.32, swr.tau );
	let edge = smoothstep( 0.8, 0.0, front ) * smoothstep( -0.05, 0.05, front ) * uprush * smoothstep( 0.0, 1.0, swr.Rt );
	let swashFoam = edge * 0.9;

	// ---- depth-averaged water velocity (along dir), for foam advection
	// waves / bores: shallow-water particle velocity c * eta / h; swash sheet: the tip moves at
	// dR/dt, slower toward the shoreline during uprush, faster there while it drains
	let eta = disp.y;
	let uWave = clamp( c * eta / ( max( d, 0.0 ) + max( eta, d * -0.8 ) + 0.15 ), -2.5, 4.0 );
	let rel = sat( swr.inland / max( swr.Rt, 0.5 ) );
	let uSwash = dRdt * select( ( 1.0 - rel ) * 0.6 + 0.9, clamp( ( swr.inland + 3.0 ) / ( swr.Rt + 3.0 ), 0.15, 1.0 ), swr.isUp );
	let wSwash = smoothstep( 0.3, 0.05, d );
	let uFlow = mix( uWave, uSwash, wSwash ) * select( 0.0, 1.0, covered || d > 0.02 );

	var o: ShoreSample;
	// the churn of a bore is uneven along the crest: dense in some stretches, torn into patches and
	// lace in others (different for every wave, drifting slowly along it)
	var wwPatch = 0.0;
	if ( s0.z * env != 0.0 ) { wwPatch = smoothstep( -0.5, 0.45, perlin2( vec2f( along * 0.06 + frame.time * 0.05, m * 2.9 + 0.4 ) ) ); }
	o.disp = disp; o.nShore = nShore; o.env = env; o.foam = s0.z * env * mix( 0.3, 1.0, wwPatch ); o.breaking = s0.w; o.u = u; o.dir = dir;
	o.exposure = exposure; o.swashLevel = swashLevel; o.swashCovered = select( 0.0, 1.0, covered ); o.thick = thick;
	o.swashFoam = swashFoam; o.runup = swr.Rt; o.inland = swr.inland; o.dRdt = dRdt; o.tau = swr.tau;
	o.flow = dir * uFlow; o.flowSpeed = uFlow; o.face = face; o.roller = roller;
	return o;
}
`}var Zo=class{constructor(e){this.terrain=e,this.uniforms=new l(`ShoreParams`,{period:[`f32`,9],amplitude:[`f32`,.34],variation:[`f32`,.55],gamma:[`f32`,.78],breakSpan:[`f32`,.13],curl:[`f32`,1],runup:[`f32`,1],enabled:[`f32`,1],turbidity:[`f32`,.16],dirMin:[`vec2f`,new p],dirSize:[`f32`,1],dirOn:[`f32`,0]});let t=this.uniforms.fields;this.period=t.period,this.amplitude=t.amplitude,this.variation=t.variation,this.gamma=t.gamma,this.breakSpan=t.breakSpan,this.curl=t.curl,this.runup=t.runup,this.enabled=t.enabled,this.turbidity=t.turbidity,this.dirMin=t.dirMin,this.dirSize=t.dirSize,this.time=h.time,this.dirTexture=null,this._dirPlaceholder=new P({label:`shoreDirPlaceholder`,width:1,height:1,format:`rgba32float`,data:new Float32Array([1,0,0,1])}),this.module=new g({name:`shore`,deps:[F,e&&e.module],uniforms:this.uniforms,uniformName:`shoreP`,bindings:{shoreDirTex:{texture:()=>this.dirTexture||this._dirPlaceholder}},code:this._code()})}_code(){return`
const SHORE_GRAVITY: f32 = ${Yo(v)};
const SHORE_TAU: f32 = ${Yo(Wo)};
const SHORE_BEACH_SLOPE: f32 = ${Yo(Go)};
const SHORE_SWASH_UP: f32 = ${Yo(Ko)};
const SHORE_SWASH_DOWN: f32 = ${Yo(qo)};
const SHORE_SWASH_OVERSHOOT: f32 = ${Yo(Jo)};

struct ShoreSample {
	disp: vec3f,
	nShore: vec3f,
	env: f32,
	foam: f32,
	breaking: f32,
	u: f32,
	dir: vec2f,
	exposure: f32,
	swashLevel: f32,
	swashCovered: f32,
	thick: f32,
	swashFoam: f32,
	runup: f32,
	inland: f32,
	dRdt: f32,
	tau: f32,
	flow: vec2f,
	flowSpeed: f32,
	face: f32,
	roller: f32,
};

struct ShoreMedium { scatter: vec3f, absorb: vec3f };

struct ShorePhase { sh: vec4f, T: f32, dir: vec2f, exposure: f32, along: f32, s: f32 };

struct ShoreBreak {
	db: f32, b: f32, Ash: f32, p: f32, meanP: f32, crestPeak: f32, yc: f32, yt: f32,
	H: f32, wBore: f32, Xi: f32, Hb: f32, ycB: f32, ytB: f32, Xc: f32, Wt: f32,
};

struct ShoreProfile { x: f32, y: f32, b: f32, foam: f32, face: f32, roller: f32 };

struct ShorePair { s0: vec4f, s1: vec4f };

struct ShoreRunup { tau: f32, Rt: f32, inland: f32, RhMax: f32, su: f32, sb: f32, isUp: bool };

fn shoreHash1( x: f32 ) -> f32 { return fract( sin( x * 127.1 + 311.7 ) * 43758.5453 ); }

// Bathymetry along the beach that the travel-time field doesn't resolve: a bar with rip channels
// cut through it every ~100 m (irregular spacing and width). Over the bar the waves are bigger and
// break first and farther out (the peaks); in the channels they are much smaller and roll through
// unbroken almost to the shorebreak, so a set never closes out along the whole beach at once.
// Returns 1 over the bar, less in a channel; rip (0..1) is the channel mask.
struct ShoreBar { k: f32, rip: f32 };
fn shoreBar( along: f32 ) -> ShoreBar {
	let w = sin( along * 0.021 + 1.9 ) * 1.4 + sin( along * 0.009 + 0.3 ) * 0.9;
	let r = sin( along * 0.059 + w );
	let width = 0.8 + sin( along * 0.017 + 4.1 ) * 0.08; // channels of different width
	let rip = smoothstep( width, 0.985, r );
	// the bar itself is uneven: broad peaks and lower shoulders
	let bar = 0.9 + ( sin( along * 0.031 + 7.3 ) * 0.6 + sin( along * 0.083 + 1.1 ) * 0.4 ) * 0.14;
	return ShoreBar( bar * ( 1.0 - rip * 0.58 ), rip );
}

// along-shore phase wobble (in periods): crests bend over the uneven bottom (and run ahead in the
// deeper rip channels, where the waves travel faster)
fn shoreWobble( along: f32 ) -> f32 {
	return sin( along * 0.029 + 0.7 ) * 0.07 + sin( along * 0.083 + 2.1 ) * 0.035
		+ sin( along * 0.19 + 0.4 ) * 0.022 + sin( along * 0.37 + 2.6 ) * 0.011
		+ shoreBar( along ).rip * 0.045;
}

// ------------------------------------------------------------ per-wave height

fn shoreWaveAmp( m: f32, along: f32 ) -> f32 {
	// sets: groups of ~7 waves with larger ones in the middle, plus per-wave randomness
	let waveSet = abs( sin( m * ${Yo(Math.PI/7)} ) ) * 0.6 + 0.55;
	let rnd = ( shoreHash1( m ) - 0.5 ) * 2.0;
	// along-shore variation so waves peel instead of closing out
	// peaks ~40-50 m wide with lower shoulders between them, different for every wave (the warp keeps
	// them from repeating along the beach); each peak breaks first and peels outward from it
	let warp = sin( along * 0.016 + m * 0.9 ) * 1.6;
	let a1 = sin( along * 0.062 + m * 1.7 + warp );
	let a2 = sin( along * 0.13 + m * 4.1 + 1.3 - warp * 0.7 );
	// (plus a shorter ~20 m variation: bores that rise and sag along the crest, more peel sections)
	let a3 = sin( along * 0.29 + m * 2.3 + warp * 0.5 ) * 0.6 + sin( along * 0.47 + m * 5.9 + 0.8 ) * 0.4;
	let alongV = a1 * 0.6 + a2 * 0.4 + a3 * 0.28;
	return max( shoreP.amplitude * waveSet * ( 1.0 + rnd * shoreP.variation * 0.5 + alongV * shoreP.variation * 0.7 ) * shoreBar( along ).k, 0.02 );
}

// ------------------------------------------------------------ cross-section shape

fn shoreBreakParams( A: f32, d: f32 ) -> ShoreBreak {
	var P: ShoreBreak;
	// break depth for this wave (Green's law shoaling, H = gamma d)
	P.db = pow( A * 3.556 / shoreP.gamma, 0.8 );
	P.b = ( P.db - d ) / ( P.db * shoreP.breakSpan ); // <0 shoaling, 0..1 plunging, >1 bore
	let shoal = pow( 10.0 / clamp( d, 0.35, 10.0 ), 0.25 );
	P.Ash = A * shoal;
	P.p = mix( 1.0, 3.0, smoothstep( -2.5, 0.0, P.b ) );
	P.meanP = 1.0 / sqrt( ( P.p + 0.25 ) * PI );
	P.crestPeak = 1.0 + smoothstep( -1.0, 0.3, P.b ) * 0.22;
	P.yc = P.Ash * 2.0 * ( 1.0 - P.meanP ) * P.crestPeak; // crest height
	P.yt = P.Ash * -2.0 * P.meanP * P.crestPeak; // trough level
	P.H = P.yc - P.yt;
	P.wBore = smoothstep( 0.85, 1.35, P.b );
	P.Xi = P.H * 0.8; // lip throw at impact
	// bore height, limited by the depth and fading out in the last few decimetres
	P.Hb = min( P.H * 0.6, max( d, 0.0 ) * 0.75 ) * ( smoothstep( 0.0, 0.3, d ) * 0.7 + 0.3 );
	P.ycB = mix( P.yc, P.yt * 0.6 + P.Hb, P.wBore ); // crest / roller top
	P.ytB = mix( P.yt, P.yt * 0.6, P.wBore ); // trough
	// the collapsing crest moves to where the lip landed (no shift once the bore has run out of height)
	P.Xc = mix( 0.0, P.Xi - P.Hb * 0.55, P.wBore ) * smoothstep( 0.03, 0.3, P.Hb );
	// horizontal extent of the face: concave tube face while plunging, short convex roller front on the bore
	P.Wt = mix( P.H * mix( 0.25, 0.55, smoothstep( 0.1, 0.9, P.b ) ), P.Hb * 0.6 + 0.08, P.wBore );
	return P;
}

// Whitewater made by the breaking wave at xi (m): the horizontal position relative to the crest's
// rest position, positive shoreward (a parcel's own position, or a fixed world point: the shore
// simulation deposits it where the water actually is, not where the parcel rests).
//  * nothing at all while the lip is in the air: the face and the lip are clear, glassy water
//  * the lip lands in the trough at the plunge point (b ~ 0.9, xi = Xi): whitewater appears there
//    and spreads out from it while the tube collapses behind it
//  * the collapsed tube becomes the roller: whitewater over the front and top of the bore,
//    shedding foam behind it (carried on by ShoreSim)
// whitewater over the face after the plunge: s = 0 at the crest .. 1 at the foot of the face
fn shoreFaceFill( b: f32, s: f32 ) -> f32 {
	// the foot turns white first (where the lip lands), the top of the face last: along a peeling
	// crest the edge of the broken section slants down and forward instead of standing vertical
	let k = ( 1.0 - s ) * 0.45;
	return smoothstep( k + 0.9, k + 1.08, b );
}

fn shoreWhitewater( xi: f32, lam: f32, P: ShoreBreak ) -> f32 {
	let landed = smoothstep( 0.86, 0.99, P.b );
	let spread = sat( ( P.b - 0.9 ) / 0.45 );
	let reach = P.Xi * 0.25 + spread * ( P.Xi * 0.9 + 1.0 ); // radius around the plunge point
	let impact = landed * smoothstep( reach, reach * 0.6, abs( xi - P.Xi ) ) * ( 1.0 - smoothstep( 1.4, 1.9, P.b ) );
	let toe = P.Xc + P.Wt;
	// the collapsing tube turns white from its foot (next to the plunge point) up to the crest
	let faceFill = shoreFaceFill( P.b, sat( ( xi - P.Xc ) / max( P.Wt, 0.05 ) ) );
	let ahead = exp( ( xi - toe ) * -3.0 ) * P.wBore;
	let behind = exp( ( P.Xc - xi ) / lam * -16.0 ) * P.wBore;
	let roller = select( select( max( faceFill, P.wBore ), behind, xi < P.Xc ), ahead, xi > toe );
	return sat( max( impact, roller ) );
}

// the cross-section for break parameters P (see shoreBreakParams)
// u: local phase in [-0.5, 0.5], crest at 0, u < 0 in front (shoreward) of the crest
// Returns x: shoreward displacement, y: height above mean, b: breaking progress (+ foam, face, roller withFoam)
fn shoreProfile( u: f32, lam: f32, P: ShoreBreak, withFoam: bool ) -> ShoreProfile {
	// --- shoaling: peaked (cnoidal-like) crest, the front compressed by a phase skew
	let skew = smoothstep( -3.0, 0.0, P.b ) * 0.55;
	let phi = u - skew * ( 1.0 - cos( u * SHORE_TAU ) ) / SHORE_TAU;
	let c = max( ( cos( phi * SHORE_TAU ) + 1.0 ) * 0.5, 0.0 ); // pow() of a rounding-negative base is NaN
	let yPre = P.Ash * 2.0 * ( pow( c, P.p ) - P.meanP ) * P.crestPeak;
	let Q = smoothstep( -3.0, 0.0, P.b ) * 0.25 + 0.1;
	let xPre = sin( u * SHORE_TAU ) * P.Ash * Q;

	// --- plunging / bore profile. Front: the upper uf of the phase is an elliptic arc from the
	// crest down to the trough (concave tube face -> convex roller front), the rest of the
	// front is trough, stretched to meet the next wave. Back: the shoaling back, decaying
	// exponentially behind the bore.
	let uf = 0.09;
	let inFace = u > - uf;
	let th = clamp( - u / uf, 0.0, 1.0 ) * ${Yo(Math.PI/2)};
	let fx = mix( 1.0 - cos( th ), sin( th ), P.wBore );
	let fy = mix( 1.0 - sin( th ), cos( th ), P.wBore );
	let sTr = clamp( ( - u - uf ) / ( 0.5 - uf ), 0.0, 1.0 );
	let ul = u * lam;
	let xFront = select( mix( P.Xc + P.Wt, lam * 0.5, sTr ), P.Xc + P.Wt * fx, inFace ) + ul;
	let yFront = select( P.ytB, P.ytB + ( P.ycB - P.ytB ) * fy, inFace );
	let cb = pow( max( ( cos( u * ( SHORE_TAU * 0.85 ) ) + 1.0 ) * 0.5, 0.0 ), P.p );
	let yBack = P.ytB + ( P.ycB - P.ytB ) * mix( cb, exp( u * -7.0 ), P.wBore );
	let xBack = P.Xc * exp( u * -6.0 ) * smoothstep( 0.5, 0.35, u ) + xPre * ( 1.0 - P.wBore );
	let front = u < 0.0;
	let wC = smoothstep( -0.35, 0.25, P.b ) * shoreP.curl;
	var r: ShoreProfile;
	r.x = mix( xPre, select( xBack, xFront, front ), wC );
	r.y = mix( yPre, select( yBack, yFront, front ), wC );
	r.b = P.b;
	if ( withFoam ) {
		// --- whitewater (a function of where the parcel is now, see shoreWhitewater) and, per parcel, the
		// clear face of the plunging wave and the relief of the roller
		r.foam = shoreWhitewater( r.x - u * lam, lam, P );
		let onFace = front && inFace;
		let faceFill = shoreFaceFill( P.b, fx );
		// the clear, concave face of a plunging wave (WaterSurface keeps the foam carried by the water off it)
		r.face = select( 0.0, 1.0, onFace ) * smoothstep( -0.4, 0.0, P.b ) * ( 1.0 - faceFill );
		// turbulent relief of the whitewater roller (m): its front and the top it tumbles over
		r.roller = select( exp( u * -25.0 ), select( 0.0, 1.0, inFace ), front ) * P.wBore * P.Hb * wC;
	}
	return r;
}

// ( x, y, foam, b )
fn shoreShape( u: f32, A: f32, d: f32, lam: f32 ) -> vec4f {
	let s = shoreProfile( u, lam, shoreBreakParams( A, d ), true );
	return vec4f( s.x, s.y, s.foam, s.b );
}

// the cross-section at u and at u + du (for the surface normal) in one call:
// ( x0, y0, foam, b ), ( x1, y1, face, roller )
fn shoreShapePair( u: f32, du: f32, A: f32, d: f32, lam: f32 ) -> ShorePair {
	let P = shoreBreakParams( A, d );
	let s0 = shoreProfile( u, lam, P, true );
	let s1 = shoreProfile( u + du, lam, P, false );
	return ShorePair( vec4f( s0.x, s0.y, s0.foam, s0.b ), vec4f( s1.x, s1.y, s0.face, s0.roller ) );
}

// the surface at a fixed WORLD point (for the Eulerian shore simulation): whitewater there and
// the water height there (the parcel shown at this point rests ~x up-wave: first-order inverse
// of the horizontal displacement, which is large on a breaking wave)
// ( foam, height, displacement of the parcel resting here, b )
fn shoreWorld( u: f32, A: f32, d: f32, lam: f32, env: f32 ) -> vec4f {
	let P = shoreBreakParams( A, d );
	let s0 = shoreProfile( u, lam, P, false );
	let s1 = shoreProfile( u + s0.x * env / lam, lam, P, false );
	return vec4f( shoreWhitewater( - u * lam, lam, P ), s1.y, s0.x, P.b );
}

// the bore that follows the plunge: roller height Hb, horizontal extent of its front Wt, forward
// shift of the crest Xc (to where the lip landed), bore weight (0 while plunging .. 1)
fn shoreBore( A: f32, d: f32 ) -> vec4f {
	let P = shoreBreakParams( A, d );
	return vec4f( P.Hb, P.Wt, P.Xc, P.wBore );
}

// breaking progress b, wave height H, trough level (relative to mean) and how far the lip is thrown
fn shoreCrest( A: f32, d: f32 ) -> vec4f {
	let P = shoreBreakParams( A, d );
	return vec4f( P.b, P.yc - P.yt, P.ytB, P.Xi );
}

// Depth that sets the breaking state of the wave a parcel belongs to: the depth under that wave's
// crest, not under the parcel. Breaking is a property of the wave: a parcel ahead of the crest is
// in shallower water and would otherwise "break" first (whitewater creeping up the foot of a still
// glassy face). Near the troughs it hands over to the local depth, where the neighbouring wave
// takes over (the profile stays continuous at u = +-0.5). u: local phase, lam: local wavelength.
fn shoreBreakDepth( xz: vec2f, dir: vec2f, u: f32, lam: f32, d: f32 ) -> f32 {
	let pc = xz + dir * ( u * lam );
	let dc = frame.seaLevel - terrainHeightAt( pc );
	return mix( dc, d, smoothstep( 0.3, 0.5, abs( u ) ) );
}

// ------------------------------------------------------------ cheap wave direction lookup

// vec3( dir.x, dir.z, exposure ) from the direction texture (bilinear from 4 loads)
fn shoreDirAt( xz: vec2f ) -> vec3f {
	let res = f32( textureDimensions( shoreDirTex ).x );
	let fp = ( xz - shoreP.dirMin ) / shoreP.dirSize * res - 0.5;
	let fc = clamp( fp, vec2f( 0.0 ), vec2f( res - 1.001 ) );
	let i = vec2i( floor( fc ) );
	let t = fract( fc );
	let a = textureLoad( shoreDirTex, i, 0 );
	let b = textureLoad( shoreDirTex, i + vec2i( 1, 0 ), 0 );
	let c = textureLoad( shoreDirTex, i + vec2i( 0, 1 ), 0 );
	let d = textureLoad( shoreDirTex, i + vec2i( 1, 1 ), 0 );
	return mix( mix( a, b, t.x ), mix( c, d, t.x ), t.y ).xyz;
}

// ------------------------------------------------------------ surf zone water

// Optical properties of the water stirred up by breaking waves: suspended sand and fine bubbles
// scatter light (milky, luminous), fine sediment and dissolved matter absorb blue. Returns the
// extra { scatter, absorb } coefficients (1/m) that make the surf zone turquoise, not ocean-clear.
fn shoreSurfMedium( xz: vec2f, depth: f32 ) -> ShoreMedium {
	var k = 0.0;
	if ( depth < 4.5 && depth > -0.2 ) {
		var expo: f32;
		if ( shoreP.dirOn > 0.5 ) { expo = shoreDirAt( xz ).z; } else { expo = sat( length( terrainShoreSample( xz ).yz ) * 1.4 ); }
		k = smoothstep( 4.5, 1.2, depth ) * smoothstep( -0.2, 0.15, depth ) * expo * shoreP.turbidity * shoreP.enabled;
	}
	return ShoreMedium( vec3f( 0.9, 1.0, 0.85 ) * k, vec3f( 0.1, 0.2, 0.62 ) * k );
}

// ------------------------------------------------------------ evaluation at a point

// Local wave phase data at a (Lagrangian) point: shared by evaluate() and the crest finder.
fn shorePhaseAt( xz: vec2f ) -> ShorePhase {
	let sh = terrainShoreSample( xz );
	let T = sh.x;
	let dirE = vec2f( sh.y, sh.z );
	let exposure = length( dirE );
	let dir = dirE / max( exposure, 1e-4 );
	let along = dot( xz, vec2f( - dir.y, dir.x ) );
	let s = ( frame.time - T ) / shoreP.period + shoreWobble( along );
	return ShorePhase( sh, T, dir, exposure, along, s );
}

// ------------------------------------------------------------ light through thin crests

// Water path (m) along the refracted view ray Tv (unit, inside the water) from the surface point
// with rest position lagXZ until the ray leaves through the other side of the wave, or 1e4 if
// it doesn't within a few metres. The upper part of a steep wave is only a few metres thick
// horizontally: the view ray crosses it and exits into the sky behind, which is what makes
// breaking faces and crests glow turquoise. Marches the analytic cross-section (up to 3 steps).
fn shoreCrestPath( p: vec2f, d: f32, T: vec3f ) -> f32 {
	var out = 1e4;
	if ( d >= 6.0 || shoreP.enabled <= 0.0 ) { return out; } // (before the phase lookup)
	let ph = shorePhaseAt( p );
	let tXi = dot( T.xz, ph.dir ); // shoreward component of the ray
	let env = smoothstep( 26.0, 13.0, d ) * sat( ph.exposure * 1.4 ) * shoreP.enabled;
	// rays heading out through the back of the wave (a view from the beach side), near breakers
	if ( env > 0.05 && tXi < -0.05 && d < 6.0 ) {
		let lam = sqrt( clamp( d, 0.3, 25.0 ) * SHORE_GRAVITY ) * shoreP.period;
		let m = floor( ph.s + 0.5 );
		let u = ph.s - m;
		let A = shoreWaveAmp( m, ph.along );
		let P = shoreBreakParams( A, shoreBreakDepth( p, ph.dir, u, lam, d ) );
		let s0 = shoreProfile( u, lam, P, false );
		let y0 = s0.y * env;
		// only the upper part of steep (nearly breaking) waves is thin enough to see through
		if ( y0 > A * 0.2 && P.b > -1.5 ) {
			let xi0 = - u * lam + s0.x * env;
			let slope = T.y / - tXi; // ray rise per metre of horizontal travel
			var prevGap = 0.0;
			var prevDist = 0.0;
			var off = 1.1;
			for ( var k = 0; k < 3; k++ ) {
				let uk = min( u + off / lam, 0.5 );
				let sk = shoreProfile( uk, lam, P, false );
				let dist = abs( xi0 - ( - uk * lam + sk.x * env ) );
				// ray height above the surface there (> 0: the ray has left the water)
				let gap = y0 + slope * dist - sk.y * env;
				if ( gap > 0.0 ) {
					let fr = - prevGap / max( gap - prevGap, 1e-4 );
					out = mix( prevDist, dist, sat( fr ) ) / - tXi;
					break;
				}
				prevGap = gap;
				prevDist = dist;
				off *= 2.6;
			}
		}
	}
	return out;
}

// ------------------------------------------------------------ swash

// Run-up of the most recent wave at a point on the beach (distances in metres up the beach face).
// The run-up is compared with the height of the sand (converted with the nominal beach slope), so
// the front is exact at the waterline and follows the contours of the sand. sh: terrainShoreSample( xz ).
fn shoreSwashRunup( sh: vec4f, along: f32, groundH: f32 ) -> ShoreRunup {
	let Tp = shoreP.period;
	let exposure = length( vec2f( sh.y, sh.z ) );
	let Ts = sh.w;
	let inland = max( groundH - frame.seaLevel, 0.0 ) / SHORE_BEACH_SLOPE;
	let ss = ( frame.time - Ts ) / Tp + shoreWobble( along );
	let ms = floor( ss );
	let tau = ss - ms; // 0..1 time since that wave's bore reached the shoreline
	let Am = shoreWaveAmp( ms, along );
	// vertical run-up ~ H on this gentle beach, converted to a horizontal excursion
	let RhMax = Am * 2.1 * shoreP.runup * sat( exposure * 1.4 ) / SHORE_BEACH_SLOPE;
	// decelerating uprush, then a backwash that starts slowly and accelerates as the sheet drains
	let su = sat( tau / SHORE_SWASH_UP );
	let sb = sat( ( tau - SHORE_SWASH_UP ) / SHORE_SWASH_DOWN );
	let isUp = tau < SHORE_SWASH_UP;
	let Rh = select( 1.0 - pow( sb, 1.6 ), 1.0 - pow( 1.0 - su, 1.5 ), isUp ) * RhMax - 0.3;
	// the front is lobed, not a straight line: each wave runs up a little differently along the beach
	let lobes = sin( along * 0.61 + ms * 2.3 ) * 0.5 + sin( along * 1.73 + ms * 5.1 ) * 0.3 + sin( along * 4.3 + ms * 1.7 ) * 0.2;
	// the backwash never quite exposes the lower beach face: a film of water always covers the
	// first decimetres past the shoreline, so the sea never meets the sand along mesh triangles
	let Rt = max( Rh + lobes * ( max( Rh, 0.0 ) * 0.07 + 0.35 ), 0.35 ) * shoreP.enabled;
	return ShoreRunup( tau, Rt, inland, RhMax, su, sb, isUp );
}

// Water film thickness clipped at the leading edge of the swash sheet, for the water shader's
// edge fade: min( thickness, distance to the front (m) * 0.08 ). Only evaluated where the film is
// thin, so the sheet ends on the analytic front instead of the mesh triangles at ~no cost.
fn shoreSwashEdge( p: vec2f, t: f32 ) -> vec4f {
	var out = vec4f( t, 1e3, 0.0, 0.0 );
	if ( t < 0.3 ) {
		let g = terrainHeightAt( p );
		if ( g > frame.seaLevel - 0.8 ) {
			let ph = shorePhaseAt( p );
			let r = shoreSwashRunup( ph.sh, ph.along, g );
			let front = r.Rt - r.inland;
			// The lapping region reaches down the beach face past where the sea's edge sits in the trough
			// of the backwash (it stopped at sea level: a strip in between with a straight edge across the
			// draining water), and fades in from there and from 0.3 m of film instead of switching on.
			// The front distance is divided by the weight so the effects at the front recede with it.
			let w = smoothstep( frame.seaLevel - 0.8, frame.seaLevel - 0.4, g ) * smoothstep( 0.3, 0.15, t );
			if ( w > 0.0 ) {
				out = vec4f( mix( t, min( t, front * 0.08 ), w ), front / max( w, 1e-3 ), r.tau, r.Rt * w );
			}
		}
	}
	return out;
}

fn shoreSwashClip( p: vec2f, t: f32 ) -> f32 {
	return shoreSwashEdge( p, t ).x;
}

// ------------------------------------------------------------ evaluate()
// Returns displacement relative to (xz, seaLevel), foam, breaking indicator and the
// swash surface level (absolute height) for this point. shoreEvaluate (withNormal, the water mesh) also
// gives face: 1 on the clear concave face of a plunging wave, roller: relief of the whitewater (m).
// shoreEvaluateWorld: the shore simulation's view (a fixed world point instead of a water parcel): foam and
// height are those of the water shown at xz, the displacement is not meaningful.
${Xo(`shoreEvaluate`,`normal`)}
${Xo(`shoreEvaluateNoNormal`,`plain`)}
${Xo(`shoreEvaluateWorld`,`world`)}
`}buildDirTexture({min:e,size:t,res:n=128}){let r=this.terrain,i=r.shoreField||null,a=i?i.data:r.shoreData||r.shoreTexture?.image?.data||r.shoreTexture?.pendingData,o=i?i.res:r.shoreRes;if(!a||!o)return console.warn(`ShoreWaves.buildDirTexture: no shore field data on the terrain; using terrainShoreSample instead`),null;let s=r.origin,c=r.size,l=new Float32Array(n*n*4);for(let r=0;r<n;r++)for(let i=0;i<n;i++){let u=e.x+(i+.5)/n*t,d=e.y+(r+.5)/n*t,f=Math.min(Math.max((u-s)/c*o-.5,0),o-1.001),p=Math.min(Math.max((d-s)/c*o-.5,0),o-1.001),m=Math.floor(f),h=Math.floor(p),g=f-m,_=p-h,v=e=>{let t=a[(h*o+m)*4+e],n=a[(h*o+m+1)*4+e],r=a[((h+1)*o+m)*4+e],i=a[((h+1)*o+m+1)*4+e];return(t*(1-g)+n*g)*(1-_)+(r*(1-g)+i*g)*_},y=v(1),b=v(2),x=Math.hypot(y,b)||1e-4,S=(r*n+i)*4;l[S]=y/x,l[S+1]=b/x,l[S+2]=Math.min(1,x*1.4),l[S+3]=1}let u=new P({label:`shoreDir`,width:n,height:n,format:`rgba32float`,data:l});return this.dirTexture=u,this.dirMin.value.copy(e),this.dirSize.value=t,this.uniforms.fields.dirOn.value=1,this.dirRes=n,u}},Qo=class{constructor(e,t,{res:n,grid:r,depths:i,name:a,slopeLevel:o,margin:c}){this.fft=e,this.cascade=t,this.tile=e.sizes[t],this.res=n,this.margin=c,this.grid=Math.ceil(r*(1+2*c)),this.depths=i,this.texture=new P({label:a,width:n,height:n,format:`rgba16float`,mips:!0,usage:[`sample`,`render`,`storage`,`copyDst`,`copySrc`],sampler:`anisoRepeat`}),this.target={texture:this.texture};let l=this.grid,u=l+1,d=new Uint32Array(l*l*6);for(let e=0,t=0;e<l;e++)for(let n=0;n<l;n++){let r=e*u+n;d[t++]=r,d[t++]=r+1,d[t++]=r+u,d[t++]=r+u,d[t++]=r+1,d[t++]=r+u+1}this.indexCount=d.length,this.indexBuffer=N.device.createBuffer({label:a+` indices`,size:d.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),N.queue.writeBuffer(this.indexBuffer,0,d),this.mipChain=new Ur(this.texture,a);let f=this.tile;this.pipelines=[];for(let n=0;n<i.length;n++){let r=i[n],l=`
struct CauOut { @builtin( position ) pos: vec4f, @location( 0 ) vOld: vec2f, @location( 1 ) vNew: vec2f };

@vertex fn vs( @builtin( vertex_index ) vi: u32 ) -> CauOut {
	// vertex of a ${this.grid} x ${this.grid} quad grid over [-margin, 1 + margin]^2 (indexed)
	let cx = vi % ${this.grid+1}u; let cy = vi / ${this.grid+1}u;
	let uv = vec2f( vec2u( cx, cy ) ) / ${this.grid}.0 * ${(1+2*c).toFixed(4)} - ${c.toFixed(4)};
	let d = textureSampleLevel( oceanDerivatives, smpLinearRepeat, uv, ${t}, ${o.toFixed(3)} );
	let s = vec2f( d.x / max( d.z + 1.0, 0.3 ), d.y / max( d.w + 1.0, 0.3 ) );
	let n = normalize( vec3f( - s.x, 1.0, - s.y ) );
	let T = refract( - frame.sunDir, n, 1.0 / 1.333 );
	let tDown = max( - T.y, 0.15 );
	// flat-surface refraction offset is removed so the pattern stays registered with the
	// entry point (the lookup re-applies it with the real depth)
	let T0 = refract( - frame.sunDir, vec3f( 0.0, 1.0, 0.0 ), 1.0 / 1.333 );
	let off = ( T.xz / tDown - T0.xz / max( - T0.y, 0.15 ) ) * ${r.toFixed(3)};
	let p = uv * ${f};
	let qq = p + off;
	var o: CauOut;
	o.vOld = p;
	o.vNew = qq;
	let ndc = qq / ${f} * 2.0 - 1.0;
	o.pos = vec4f( ndc.x, ndc.y, 0.0, 1.0 );
	return o;
}

@fragment fn fs( in: CauOut ) -> @location( 0 ) vec4f {
	// area ratio between the surface patch and its image on the floor
	let ao = abs( dpdx( in.vOld ).x * dpdy( in.vOld ).y - dpdx( in.vOld ).y * dpdy( in.vOld ).x );
	let an = abs( dpdx( in.vNew ).x * dpdy( in.vNew ).y - dpdx( in.vNew ).y * dpdy( in.vNew ).x );
	// soft limit: a single nearly-folded cell must not become a flat white hot spot (the
	// finite sun disk spreads real caustic peaks to a few times the mean anyway)
	let I = ao / max( an + ao * ( 1.0 / 8.0 ), 1e-9 );
	return vec4f( ${n===0?`I`:`0.0`}, ${n===1?`I`:`0.0`}, 0.0, 1.0 );
}
`,u=s({modules:[F,e.module],code:l,stage:`render`,label:a}),d=m(u.code,a),p={srcFactor:`one`,dstFactor:`one`,operation:`add`},h=N.renderPipeline({label:a+n,layout:N.device.createPipelineLayout({bindGroupLayouts:[u.group0.layout,u.bindings.layout]}),vertex:{module:d,entryPoint:`vs`},fragment:{module:d,entryPoint:`fs`,targets:[{format:`rgba16float`,blend:{color:p,alpha:p}}]},primitive:{topology:`triangle-list`,cullMode:`none`}});this.pipelines.push({pipeline:h,bindings:u.bindings,group0:u.group0})}}render(){let e=N.getEncoder().beginRenderPass({label:this.texture.label,colorAttachments:[{view:this.texture.view({dimension:`2d`,baseMipLevel:0,mipLevelCount:1}),clearValue:[0,0,0,0],loadOp:`clear`,storeOp:`store`}]});e.setIndexBuffer(this.indexBuffer,`uint32`);for(let t of this.pipelines)e.setPipeline(N.ready(t.pipeline)),e.setBindGroup(0,t.group0.getBindGroup()),e.setBindGroup(1,t.bindings.getBindGroup()),e.drawIndexed(this.indexCount,1);e.end()}mips(e){this.mipChain.dispatch(e)}},$o=class{constructor(e,t){this.renderer=e,this.fft=t,this.params=new l(`CausticsParams`,{strength:[`f32`,.75]},{label:`caustics`}),this.strength=this.params.fields.strength,this.detail=null;let n=t.cascades-1;this.fine=new Qo(t,n,{res:512,grid:256,depths:[1.2,4],name:`causticsFine`,slopeLevel:1,margin:.35}),this.broad=new Qo(t,n-1,{res:256,grid:128,depths:[3,9],name:`causticsBroad`,slopeLevel:.5,margin:.35}),this._module=null}update(){this.fine.render(this.renderer),this.broad.render(this.renderer),N.computePass(`Caustics Mips`,e=>{this.fine.mips(e),this.broad.mips(e)})}get module(){if(this._module)return this._module;let e=this.detail,t=this.fine,n=this.broad;return this._module=new g({name:`caustics`,deps:[F,e?e.module:null],uniforms:this.params,uniformName:`caustics`,bindings:{causticsFineTex:{texture:t.texture},causticsBroadTex:{texture:n.texture}},code:`
// the blur level is the least filtering; with a footprint, each gradient is stretched to at
// least that level's texel size
fn _causticsStretch( g: vec2f, minLen: f32 ) -> vec2f { return g * max( minLen / max( length( g ), 1e-9 ), 1.0 ); }
fn _causticsFetchFine( uv: vec2f, lvl: f32, gdx: vec2f, gdy: vec2f, useGrad: bool ) -> vec4f {
	if ( ! useGrad ) { return textureSampleLevel( causticsFineTex, smpAnisoRepeat, uv, lvl ); }
	let minLen = exp2( lvl ) / ${t.res}.0;
	return textureSampleGrad( causticsFineTex, smpAnisoRepeat, uv, _causticsStretch( gdx / ${t.tile}, minLen ), _causticsStretch( gdy / ${t.tile}, minLen ) );
}
fn _causticsFetchBroad( uv: vec2f, lvl: f32, gdx: vec2f, gdy: vec2f, useGrad: bool ) -> vec4f {
	if ( ! useGrad ) { return textureSampleLevel( causticsBroadTex, smpAnisoRepeat, uv, lvl ); }
	let minLen = exp2( lvl ) / ${n.res}.0;
	return textureSampleGrad( causticsBroadTex, smpAnisoRepeat, uv, _causticsStretch( gdx / ${n.tile}, minLen ), _causticsStretch( gdy / ${n.tile}, minLen ) );
}

// gust / slick factor of the caustics at xz (1 without sea detail)
fn causticsDetailK( xz: vec2f ) -> f32 {
${e?`	let det = seaDetailSample( xz );
	return mix( 0.55, 1.25, det.gust ) * ( 1.0 - det.slick * 0.6 );`:`	return 1.0;`}
}

// mono: one fine lookup instead of three (no chromatic dispersion); detailK < 0: evaluated here
fn _causticsSample( P: vec3f, depth: f32, level: f32, slope: vec2f, foam: f32, hasFoam: bool, gdx: vec2f, gdy: vec2f, useGrad: bool, mono: bool, detailK: f32 ) -> vec3f {
	// the light reaching this point entered the water up-sun along the refracted sun ray
	let n = normalize( vec3f( - slope.x, 1.0, - slope.y ) );
	let Ls = refract( - frame.sunDir, n, 1.0 / 1.333 );
	let tDown = max( - Ls.y, 0.15 );
	let entry = P.xz - Ls.xz * ( depth / tDown );

	// deeper -> softer (finite sun disk + forward scattering)
	let blur = select( clamp( depth * 0.4 - 0.2, 0.0, 3.0 ), level, level >= 0.0 );
	let wD = sat( ( depth - 1.2 ) / 2.8 ); // blend between the two focal planes

	let uvF = entry / ${t.tile};
	let tg = _causticsFetchFine( uvF, blur, gdx, gdy, useGrad );
	let g = mix( tg.x, tg.y, wD );
	var r = g;
	var b = g;
	if ( ! mono ) {
		// slight chromatic dispersion: each color lands a little apart along the sun direction
		let disp = normalize( Ls.xz + vec2f( 1e-4, 0.0 ) ) * ( depth * 0.0035 );
		let tr = _causticsFetchFine( uvF + disp / ${t.tile}, blur, gdx, gdy, useGrad );
		let tb = _causticsFetchFine( uvF - disp / ${t.tile}, blur, gdx, gdy, useGrad );
		r = mix( tr.x, tr.y, wD );
		b = mix( tb.x, tb.y, wD );
	}
	let broad = _causticsFetchBroad( entry / ${n.tile}, 1.5, gdx, gdy, useGrad );
	let br = mix( broad.x, broad.y, sat( depth / 9.0 ) );
	let c = vec3f( r, g, b ) * mix( 1.0, br, 0.6 );

	// no caustics right at the surface, strongest in the first metres, fading with depth
	var k = smoothstep( 0.03, 0.5, depth ) * exp( depth * -0.06 ) * caustics.strength;
	k *= select( causticsDetailK( entry ), detailK, detailK >= 0.0 );
	if ( hasFoam ) { k *= 1.0 - sat( foam ); }
	let result = mix( vec3f( 1.0 ), c, k );
	// foam and bubble clouds scatter the light back up: the floor under them is shaded
	return select( result, result * ( 1.0 - sat( foam ) * 0.6 ), hasFoam );
}

fn causticsSample( P: vec3f, depth: f32, slope: vec2f, foam: f32, gdx: vec2f, gdy: vec2f ) -> vec3f {
	return _causticsSample( P, depth, -1.0, slope, foam, true, gdx, gdy, true, false, -1.0 );
}

fn causticsSampleBaked( P: vec3f, depth: f32, slope: vec2f, foam: f32, gdx: vec2f, gdy: vec2f, detailK: f32 ) -> vec3f {
	return _causticsSample( P, depth, -1.0, slope, foam, true, gdx, gdy, true, false, detailK );
}

// without the chromatic dispersion (one fine lookup): the water's refraction source, seen blurred
fn causticsSampleBakedMono( P: vec3f, depth: f32, slope: vec2f, foam: f32, gdx: vec2f, gdy: vec2f, detailK: f32 ) -> vec3f {
	return _causticsSample( P, depth, -1.0, slope, foam, true, gdx, gdy, true, true, detailK );
}

fn causticsSampleLevel( P: vec3f, depth: f32, level: f32 ) -> vec3f {
	return _causticsSample( P, depth, level, vec2f( 0.0 ), 0.0, false, vec2f( 0.0 ), vec2f( 0.0 ), false, false, -1.0 );
}

fn causticsSampleShaft( P: vec3f, depth: f32, level: f32, detailK: f32 ) -> vec3f {
	return _causticsSample( P, depth, level, vec2f( 0.0 ), 0.0, false, vec2f( 0.0 ), vec2f( 0.0 ), false, true, detailK );
}
`}),this._module}get fineTex(){return this.fine.texture}get broadTex(){return this.broad.texture}},es=512,ts=.6,ns=.08,rs=new l(`GroundBounceParams`,{sun:[`vec3f`,new t(0,1,0)],strength:[`f32`,1],ready:[`f32`,0]},{label:`groundBounce`}),is={strength:rs.fields.strength,module:null,exclude(e){e&&e.setDefine&&e.setDefine(`NO_GROUND_BOUNCE`,1)}},as=(e,t,n)=>{let r=new o().setRGB(e,t,n,w);return`vec3f( ${r.r.toFixed(6)}, ${r.g.toFixed(6)}, ${r.b.toFixed(6)} )`};function os({terrain:e,clouds:t=null}){let n=e=>new P({label:e,width:es,height:es,format:`rgba16float`,usage:[`sample`,`storage`]}),r=n(`groundBounceRaw`),i=n(`groundBounce`),a=rs.fields.sun,o=rs.fields.ready,s=new j({label:`Ground Bounce Bake`,modules:[F,e.module],bindings:{groundBounceParams:{uniform:rs},gbRawOut:{storageTexture:r,access:`write`}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let ij = vec2f( gid.xy );
	let xz = ( ij + 0.5 ) / ${es}.0 * terrainParams.size + terrainParams.origin;
	let h = terrainHeightAt( xz );
	let nr = terrainNormalRockLevel( xz, 1.0 );
	let n = vec3f( nr.x, sqrt( sat( 1.0 - dot( nr.xy, nr.xy ) ) ), nr.y );
	let slope = 1.0 - n.y;
	let sp = terrainSplatLevel( xz, 1.0 );
	let L = groundBounceParams.sun;
	// land cover (same masks as the terrain material, coarsely)
	let rockW = sat( smoothstep( 0.35, 0.6, nr.z * 0.7 + smoothstep( 0.3, 0.62, slope ) * 0.5 ) );
	let sandW = smoothstep( 0.3, 0.72, sp.x ) * ( 1.0 - rockW );
	let jungleW = sat( smoothstep( 9.0, 24.0, h ) + smoothstep( 0.18, 0.36, slope ) );
	let veg = mix( ${as(.3,.36,.16)}, ${as(.12,.17,.07)}, jungleW );
	// dry coral sand, darker where damp near the water line
	let sand = ${as(.86,.79,.66)} * mix( 0.6, 1.0, smoothstep( 0.2, 1.2, h ) );
	let land = mix( mix( veg, sand, sandW ), vec3f( 0.08, 0.075, 0.065 ), rockW );
	// sea: the seabed (sand in the bay) seen through the water column, down and back up
	let depth = select( 0.0, max( frame.seaLevel - h, 0.0 ), frame.waterEnabled > 0.5 );
	let seabed = mix( ${as(.62,.58,.48)}, ${as(.25,.3,.22)}, smoothstep( 0.3, 0.7, sp.y ) );
	let sea = select( seabed, seabed * exp( ( frame.waterAbsorption + frame.waterScattering ) * depth * -2.4 ) * 0.9 + vec3f( 0.01, 0.025, 0.03 ), frame.waterEnabled > 0.5 );
	let wet = smoothstep( 0.05, -0.1, h - frame.seaLevel );
	let albedo = mix( land, sea, wet );
	let nSurf = mix( n, vec3f( 0.0, 1.0, 0.0 ), wet * frame.waterEnabled );
	// heightfield sun shadow at the ground (same filtering as terrainSunShadowAt)
	let top = select( h, max( h, frame.seaLevel ), frame.waterEnabled > 0.5 );
	let vis = terrainSunShadowAt( vec3f( xz.x, top, xz.y ) );
	let E = max( dot( nSurf, L ), 0.0 ) * vis * smoothstep( -0.02, 0.05, L.y );
	let o = max( albedo * E - ${ns} * max( L.y, 0.0 ), vec3f( 0.0 ) );
	textureStore( gbRawOut, vec2u( gid.xy ), vec4f( o, top ) );
}
`}),c=[1,4,6,4,1],l=``;for(let e=-2;e<=2;e++)for(let t=-2;t<=2;t++)l+=`	sum += textureLoad( gbRaw, clamp( c + vec2i( ${t}, ${e} ), vec2i( 0 ), vec2i( 511 ) ), 0 ) * ${(c[t+2]*c[e+2]/256).toFixed(8)};\n`;let u=new j({label:`Ground Bounce Blur`,bindings:{gbRaw:{texture:r,sampleType:`unfilterable-float`},gbMapOut:{storageTexture:i,access:`write`}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let c = vec2i( gid.xy );
	var sum = vec4f( 0.0 );
${l}	textureStore( gbMapOut, vec2u( gid.xy ), sum );
}
`}),d=()=>{a.value.copy(h.sunDir.value),s.dispatch([es/8,es/8,1]),u.dispatch([es/8,es/8,1]),o.value=1},f=!1,p=e.updateSunShadow.bind(e);e.updateSunShadow=(e,t=!1)=>{let n=p(e,t);return(n||!f)&&d(e),f=!0,n};let m=t&&t.module?`let cloud = cloudsShadow( P.xz );`:`let cloud = 1.0;`;return is.module=new g({name:`hook-bounce`,deps:[F,e.module,...t&&t.module?[t.module]:[]],uniforms:rs,uniformName:`groundBounceParams`,bindings:{groundBounceMap:{texture:i,sampleType:`unfilterable-float`}},code:`
fn hookBounce( P: vec3f, Nw: vec3f ) -> vec3f {
#if IS_WATER || NO_GROUND_BOUNCE
	return vec3f( 0.0 );
#else
	let view = sat( Nw.y * -0.5 + 0.5 );
	var E = vec3f( 0.0 );
	if ( view > 0.03 && P.y > frame.seaLevel - 0.3 && groundBounceParams.strength > 0.0 && groundBounceParams.ready > 0.0 ) {

		let st = clamp( terrainUvOf( P.xz ) * ${es}.0 - 0.5, vec2f( 0.0 ), vec2f( ${es}.0 - 1.001 ) );
		let i = vec2i( floor( st ) );
		let t = fract( st );
		let s = mix(
			mix( textureLoad( groundBounceMap, i, 0 ), textureLoad( groundBounceMap, i + vec2i( 1, 0 ), 0 ), t.x ),
			mix( textureLoad( groundBounceMap, i + vec2i( 0, 1 ), 0 ), textureLoad( groundBounceMap, i + vec2i( 1, 1 ), 0 ), t.x ),
			t.y
		);
		let above = P.y - s.w;
		// nothing from a surface above the receiver (under water: the sea surface is above), a
		// little less high up where more of the view is taken by other objects
		let fade = smoothstep( -0.3, 0.3, above ) * mix( 0.4, 1.0, smoothstep( 30.0, 4.0, above ) );
		${m}
		// a face turned away from a low sun looks at the ground its object shades (a long shadow)
		let Lh = frame.sunDir.xz / max( length( frame.sunDir.xz ), 1e-3 );
		let selfShade = 1.0 - sat( -dot( Nw.xz, Lh ) ) * sat( 1.0 - frame.sunDir.y ) * 0.6;
		E = s.xyz * frame.sunColor * cloud * ( view * fade * selfShade * groundBounceParams.strength * ${ts} );

	}
	// the lighting adds hookBounce * diffuse colour: irradiance / PI (three: E * diffuse / PI)
	return E * INV_PI;
#endif
}
`}),Ue.set(`bounce`,is.module),{bake:d,map:i,raw:r}}var ss=[60,300,180,240,120,0],cs=[0,.5,.25,.75],ls=class{constructor(e,t,{samples:n=16,depthIsColor:r=!1}={}){this.depthTexture=e,this.depthIsColor=r,this.camera=t,this.resolutionScale=1,this.useTemporalFiltering=!1,this.uniforms=new l(`GTAOParams`,{proj:[`mat4x4f`,new C],invProj:[`mat4x4f`,new C],resolution:[`vec2f`,new p],radius:[`f32`,.25],thickness:[`f32`,1],distanceExponent:[`f32`,1],distanceFallOff:[`f32`,1],scale:[`f32`,1],temporalDirection:[`f32`,0],temporalOffset:[`f32`,0],resolutionScaleU:[`f32`,0]},{label:`gtao`});let i=this.uniforms.fields;this.radius=i.radius,this.thickness=i.thickness,this.distanceExponent=i.distanceExponent,this.distanceFallOff=i.distanceFallOff,this.scale=i.scale,this.samples={value:n},this.target=new le(1,1,{colors:[`r8unorm`],label:`GTAO.AO`}),this.noiseTexture=us(),this._currentSamples=-1,this._pass=null,this._frame=0,this._jp=new C}get texture(){return this.target.texture}getTextureNode(){return this.target.texture}setSize(e,t){e=Math.round(this.resolutionScale*e),t=Math.round(this.resolutionScale*t),this.uniforms.fields.resolutionScaleU.value=this.resolutionScale,this.uniforms.fields.resolution.value.set(e,t),this.target.setSize(e,t)}_build(){let e=this.samples.value,t=e<30?3:5,n=Math.ceil(e/t);this._pass=new Je({label:`GTAO`,colorFormats:[`r8unorm`],bindings:{gtao:{uniform:this.uniforms},gtaoDepth:{texture:()=>this.depthTexture},gtaoNoise:{texture:this.noiseTexture}},code:`
const GTAO_DIRECTIONS: i32 = ${t};
const GTAO_STEPS: i32 = ${n};

// (a colour depth copy may mark texels negative: under the water, no AO wanted; see PostFX)
fn gtaoSampleDepthRaw( uv: vec2f ) -> f32 {
	let s = vec2i( textureDimensions( gtaoDepth ) );
	return textureLoad( gtaoDepth, clamp( vec2i( floor( uv * vec2f( s ) ) ), vec2i( 0 ), s - 1 ), 0 )${this.depthIsColor?`.x`:``};
}
fn gtaoSampleDepth( uv: vec2f ) -> f32 { return abs( gtaoSampleDepthRaw( uv ) ); }
fn gtaoLoad( p: vec2i ) -> f32 {
	let s = vec2i( textureDimensions( gtaoDepth ) );
	return abs( textureLoad( gtaoDepth, clamp( p, vec2i( 0 ), s - 1 ), 0 )${this.depthIsColor?`.x`:``} );
}
// three's getViewPosition (WebGPU coordinate system)
fn gtaoViewPosition( uv: vec2f, depth: f32 ) -> vec3f {
	let sp = vec2f( uv.x, 1.0 - uv.y ) * 2.0 - 1.0;
	let v = gtao.invProj * vec4f( sp, depth, 1.0 );
	return v.xyz / v.w;
}
fn gtaoScreenFromClip( c: vec4f ) -> vec2f {
	let s = c.xy / c.w * 0.5 + 0.5;
	return vec2f( s.x, 1.0 - s.y );
}
// three's getNormalFromDepth
fn gtaoNormalFromDepth( uv: vec2f ) -> vec3f {
	let size = vec2f( textureDimensions( gtaoDepth ) );
	let p = vec2i( uv * size );
	let c0 = gtaoLoad( p );
	let l2 = gtaoLoad( p - vec2i( 2, 0 ) ); let l1 = gtaoLoad( p - vec2i( 1, 0 ) );
	let r1 = gtaoLoad( p + vec2i( 1, 0 ) ); let r2 = gtaoLoad( p + vec2i( 2, 0 ) );
	let b2 = gtaoLoad( p + vec2i( 0, 2 ) ); let b1 = gtaoLoad( p + vec2i( 0, 1 ) );
	let t1 = gtaoLoad( p - vec2i( 0, 1 ) ); let t2 = gtaoLoad( p - vec2i( 0, 2 ) );
	let dl = abs( ( 2.0 * l1 - l2 ) - c0 );
	let dr = abs( ( 2.0 * r1 - r2 ) - c0 );
	let db = abs( ( 2.0 * b1 - b2 ) - c0 );
	let dt = abs( ( 2.0 * t1 - t2 ) - c0 );
	let ce = gtaoViewPosition( uv, c0 );
	let dpdx = select( - ce + gtaoViewPosition( uv + vec2f( 1.0 / size.x, 0.0 ), r1 ), ce - gtaoViewPosition( uv - vec2f( 1.0 / size.x, 0.0 ), l1 ), dl < dr );
	let dpdy = select( - ce + gtaoViewPosition( uv - vec2f( 0.0, 1.0 / size.y ), t1 ), ce - gtaoViewPosition( uv + vec2f( 0.0, 1.0 / size.y ), b1 ), db < dt );
	return normalize( cross( dpdx, dpdy ) );
}
fn gtaoRand( uv: vec2f ) -> f32 {
	let dt = dot( uv, vec2f( 12.9898, 78.233 ) );
	let sn = dt - PI * floor( dt / PI );
	return fract( sin( sn ) * 43758.5453 );
}

fn fragment( in: FSIn ) -> vec4f {
	let uvNode = in.uv;
	// Sidestep the nearest-rounding during depth access for the unjittered center pixel to avoid banding
	var depth: f32;
	if ( gtao.resolutionScaleU < 1.0 ) {
		let g = abs( textureGather( ${this.depthIsColor?`0, `:``}gtaoDepth, smpNearestClamp, uvNode ) );
		depth = min( min( g.x, g.y ), min( g.z, g.w ) );
	} else {
		depth = gtaoSampleDepth( uvNode );
	}
	// nothing there (sky: the depth is reversed-Z, 0 at infinity): unoccluded, and never shown
	if ( depth <= 0.0 || gtaoSampleDepthRaw( uvNode ) < 0.0 ) { return vec4f( 1.0 ); }
	let viewPosition = gtaoViewPosition( uvNode, depth );
	let viewNormal = gtaoNormalFromDepth( uvNode );
	let radius = gtao.radius;
	let invRadius = 1.0 / radius;
	let viewDir = normalize( - viewPosition );
	let clipPosition = gtao.proj * vec4f( viewPosition, 1.0 );

	// 5x5 magic square rotation noise (nearest, repeat)
	let noiseRes = vec2f( textureDimensions( gtaoNoise ) );
	let noiseUv = vec2f( uvNode.x, 1.0 - uvNode.y ) * ( gtao.resolution / noiseRes );
	let nt = vec2i( floor( fract( noiseUv ) * noiseRes ) );
	let noiseTexel = textureLoad( gtaoNoise, nt, 0 );
	let randomVec = noiseTexel.xyz * 2.0 - 1.0;
	let tangent = normalize( vec3f( randomVec.xy, 0.0 ) );
	let bitangent = vec3f( - tangent.y, tangent.x, 0.0 );
	let kernelMatrix = mat3x3f( tangent, bitangent, vec3f( 0.0, 0.0, 1.0 ) );

	let invSteps = 1.0 / f32( GTAO_STEPS );
	var ao = 0.0;
	// Per-step phase jitter for spatio-temporal decorrelation.
	let noiseJitterIdx = gtao.temporalDirection * 0.02;
	let stepJitter = interleavedGradientNoise( in.pos.xy + gtao.temporalOffset ) + gtaoRand( ( uvNode + noiseJitterIdx ) * 2.0 - 1.0 );

	// Each iteration analyzes one vertical "slice" of the 3D space around the fragment.
	for ( var i = 0; i < GTAO_DIRECTIONS; i++ ) {
		let angle = f32( i ) / f32( GTAO_DIRECTIONS ) * PI + gtao.temporalDirection;
		let sampleDir = kernelMatrix * vec3f( cos( angle ), sin( angle ), 0.0 );
		let clipDirRadius = gtao.proj * vec4f( sampleDir, 0.0 ) * radius;
		let sliceBitangent = normalize( cross( sampleDir, viewDir ) );
		let sliceTangent = cross( sliceBitangent, viewDir );
		// Project the view normal onto the slice plane (remove component along sliceBitangent).
		// The unnormalized length is the foreshortening weight applied at slice integration.
		// (Activision GTAO paper, Section 3.2 "Per-pixel sampling".)
		let projNRaw = viewNormal - sliceBitangent * dot( viewNormal, sliceBitangent );
		let projNLen = length( projNRaw );
		let projN = projNRaw / max( projNLen, 0.0001 );
		// gamma: angle of projN within the slice plane, signed by the tangent direction.
		let nSin = dot( projN, sliceTangent );
		let nCos = clamp( dot( projN, viewDir ), 0.0, 1.0 );
		let signNSin = select( -1.0, 1.0, nSin >= 0.0 );
		let angleN = signNSin * acos( nCos );
		let tangentToNormalInSlice = cross( projN, sliceBitangent );
		let cosHorizon = dot( viewDir, tangentToNormalInSlice );
		var cosHorizons = vec2f( cosHorizon, - cosHorizon );
		// For each slice, the inner loop performs ray marching to find the horizons.
		for ( var j = 0; j < GTAO_STEPS; j++ ) {
			// Quadratic step distribution ( sampleDist = t^2 ) concentrates samples in the
			// near-field. (Blender's Eevee adaptation)
			let t = ( f32( j ) + 1.0 + stepJitter ) * invSteps;
			let sampleDist = t * t;
			let clipOffset = clipDirRadius * sampleDist;
			// The loop marches in two opposite directions (x and y) along the slice's line to find the horizon on both sides.
			// x
			let sampleScreenPositionX = gtaoScreenFromClip( clipPosition + clipOffset );
			let sampleDepthX = gtaoSampleDepth( sampleScreenPositionX );
			let viewDeltaX = gtaoViewPosition( sampleScreenPositionX, sampleDepthX ) - viewPosition;
			let lenX = length( viewDeltaX );
			// Manual normalize guards against zero-length delta.
			let sHX = dot( viewDir, viewDeltaX ) / max( lenX, 0.0001 );
			// Sphere falloff: ( dist / radius )^2 fades the sample's horizon contribution
			// back toward the prior horizon as it approaches the radius boundary.
			// (squared variant of the paper's near-field attenuation;
			// Activision GTAO paper, Section 4.3 "Bounding the sampling area")
			let distFacX = min( lenX * invRadius, 1.0 );
			let distFacSqX = distFacX * distFacX;
			if ( abs( viewDeltaX.z ) < gtao.thickness ) {
				cosHorizons.x = mix( max( cosHorizons.x, sHX ), cosHorizons.x, distFacSqX );
			}
			// y
			let sampleScreenPositionY = gtaoScreenFromClip( clipPosition - clipOffset );
			let sampleDepthY = gtaoSampleDepth( sampleScreenPositionY );
			let viewDeltaY = gtaoViewPosition( sampleScreenPositionY, sampleDepthY ) - viewPosition;
			let lenY = length( viewDeltaY );
			let sHY = dot( viewDir, viewDeltaY ) / max( lenY, 0.0001 );
			let distFacY = min( lenY * invRadius, 1.0 );
			let distFacSqY = distFacY * distFacY;
			if ( abs( viewDeltaY.z ) < gtao.thickness ) {
				cosHorizons.y = mix( max( cosHorizons.y, sHY ), cosHorizons.y, distFacSqY );
			}
		}
		// Cosine-weighted inner integral, closed-form (Activision GTAO paper, Eq. 7).
		// Per horizon h_i:    term_i = -cos( 2 h_i - gamma ) + cos( gamma ) + 2 h_i sin( gamma )
		// The 0.25 factor is 1/2 (integral normalization) x 1/2 (averaging the two horizons).
		// In this slice setup sliceTangent = cross( sliceBitangent, viewDir ) works out
		// opposite to sampleDir, so the +sampleDir samples (cosHorizons.x) live on the
		// -T side of the slice and -sampleDir samples (cosHorizons.y) on the +T side.
		// gamma is signed by +T (sliceTangent), so hPos must read from cosHorizons.y.
		let hPos = acos( clamp( cosHorizons.y, -1.0, 1.0 ) );
		let hNeg = - acos( clamp( cosHorizons.x, -1.0, 1.0 ) );
		let termPos = - cos( hPos * 2.0 - angleN ) + nCos + hPos * 2.0 * nSin;
		let termNeg = - cos( hNeg * 2.0 - angleN ) + nCos + hNeg * 2.0 * nSin;
		let a = ( termPos + termNeg ) * 0.25;
		// |projN| is the foreshortening weight from the per-slice normal projection.
		ao += projNLen * a;
	}
	ao = clamp( ao / f32( GTAO_DIRECTIONS ), 0.0, 1.0 );
	ao = pow( ao, gtao.scale );
	return vec4f( ao, 0.0, 0.0, 1.0 );
}
`}),this._currentSamples=e}render(){let e=this.uniforms.fields;if(this.useTemporalFiltering===!0){let t=this._frame++;e.temporalDirection.value=ss[t%6]/360,e.temporalOffset.value=cs[t%4]}else e.temporalDirection.value=0,e.temporalOffset.value=1;this.samples.value!==this._currentSamples&&this._build();let t=b.fields,n=t.jitter.value;this._jp.makeTranslation(n.x,n.y,0).multiply(t.proj.value),e.proj.value.copy(this._jp),e.invProj.value.copy(this._jp).invert(),this._pass.render({colorViews:[this.target.texture],clear:[1,1,1,1]})}};function us(e=5){let n=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),r=ds(n),i=r.length,a=new Uint8Array(i*4);for(let e=0;e<i;++e){let n=r[e],o=2*Math.PI*n/i,s=new t(Math.cos(o),Math.sin(o),0).normalize();a[e*4]=(s.x*.5+.5)*255,a[e*4+1]=(s.y*.5+.5)*255,a[e*4+2]=127,a[e*4+3]=255}return new P({label:`GTAO.noise`,width:n,height:n,format:`rgba8unorm`,data:a,sampler:`nearestRepeat`})}function ds(e){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=t*t,r=Array(n).fill(0),i=Math.floor(t/2),a=t-1;for(let e=1;e<=n;){if(i===-1&&a===t?(a=t-2,i=0):(a===t&&(a=0),i<0&&(i=t-1)),r[i*t+a]!==0){a-=2,i++;continue}r[i*t+a]=e++,a++,i--}return r}var fs=[0,0,0,0],ps=`
fn aaIn( uv: vec2f ) -> vec3f { return textureSampleLevel( aaSrc, smpLinearClamp, uv, 0.0 ).rgb; }
// display-like value for edge detection: exposed, Reinhard on the max channel, square root
fn aaP( c: vec3f ) -> vec3f {
	let e = max( c, vec3f( 0.0 ) ) * aaExposure[ 0 ] * frame.exposure;
	return sqrt( e / ( 1.0 + max( e.r, max( e.g, e.b ) ) ) );
}
fn aaLuma( uv: vec2f ) -> f32 { return dot( aaP( aaIn( uv ) ), vec3f( 0.3, 0.59, 0.11 ) ); }
`,ms=class{constructor({src:e,exposure:t}){this.src=e,this.exposure=t,this.edges=new le(1,1,{colors:[`rgba8unorm`],label:`smaaEdges`}),this.weights=new le(1,1,{colors:[`rgba8unorm`],label:`smaaWeights`}),this.area=null,this.search=null,this._passes=null,this._load()}get searchStepsPerDirection(){return mt(h.antiAliasingQuality.value)}async _load(){let e=async(e,t)=>{let n=await gn(new Uint8Array(await(await fetch(`./textures/smaa/`+e)).arrayBuffer()),`image/png`);return new P({label:t,width:n.width,height:n.height,format:`rgba8unorm`,data:n.data})};try{[this.area,this.search]=await Promise.all([e(`area.png`,`smaaArea`),e(`search.png`,`smaaSearch`)])}catch(e){console.warn(`SMAA textures failed to load`,e)}}_build(){let e={aaSrc:{texture:this.src},aaExposure:{storage:this.exposure,access:`read`}},t=new Je({label:`AA none`,colorFormats:[`rgba16float`],bindings:{aaSrc:{texture:this.src}},code:`fn fragment( in: FSIn ) -> vec4f { return textureSampleLevel( aaSrc, smpLinearClamp, in.uv, 0.0 ); }`}),n=new Je({label:`FXAA`,colorFormats:[`rgba16float`],bindings:e,code:ps+`
fn fragment( in: FSIn ) -> vec4f {
	var FXAA_STEPS = array<f32, 6>( 1.0, 1.5, 2.0, 2.0, 2.0, 4.0 );
	let searchSteps = clamp( i32( ceil( 12.0 * frame.antiAliasingQuality ) ), 1, 6 );
	let uv = in.uv;
	let ts = 1.0 / vec2f( textureDimensions( aaSrc ) );
	let m = aaLuma( uv );
	let n = aaLuma( uv + ts * vec2f( 0.0, -1.0 ) ); let e = aaLuma( uv + ts * vec2f( 1.0, 0.0 ) );
	let s = aaLuma( uv + ts * vec2f( 0.0, 1.0 ) ); let w = aaLuma( uv + ts * vec2f( -1.0, 0.0 ) );
	let ne = aaLuma( uv + ts * vec2f( 1.0, -1.0 ) ); let nw = aaLuma( uv + ts * vec2f( -1.0, -1.0 ) );
	let se = aaLuma( uv + ts * vec2f( 1.0, 1.0 ) ); let sw = aaLuma( uv + ts * vec2f( -1.0, 1.0 ) );
	let highest = max( max( max( s, e ), max( n, w ) ), m );
	let lowest = min( min( min( s, e ), min( n, w ) ), m );
	let contrast = highest - lowest;
	if ( contrast < max( 0.0312, 0.063 * highest ) ) { return vec4f( aaIn( uv ), 1.0 ); }

	// sub-pixel blend
	var f = ( 2.0 * ( s + e + n + w ) + ( se + sw + ne + nw ) ) / 12.0;
	f = clamp( abs( f - m ) / max( contrast, 1e-6 ), 0.0, 1.0 );
	let bf = smoothstep( 0.0, 1.0, f );
	let pixelBlend = bf * bf;

	// edge orientation and the side the edge lies on
	let horizontal = abs( s + n - 2.0 * m ) * 2.0 + abs( se + ne - 2.0 * e ) + abs( sw + nw - 2.0 * w );
	let vertical = abs( e + w - 2.0 * m ) * 2.0 + abs( se + sw - 2.0 * s ) + abs( ne + nw - 2.0 * n );
	let isH = horizontal >= vertical;
	let pL = select( e, s, isH ); let nL = select( w, n, isH );
	let pG = abs( pL - m ); let nG = abs( nL - m );
	var pixelStep = select( ts.x, ts.y, isH );
	var oppL = pL; var grad = pG;
	if ( pG < nG ) { pixelStep = - pixelStep; oppL = nL; grad = nG; }

	// walk along the edge both ways to its ends
	var uvEdge = uv;
	var edgeStep = vec2f( 0.0, ts.y );
	if ( isH ) { uvEdge.y += pixelStep * 0.5; edgeStep = vec2f( ts.x, 0.0 ); } else { uvEdge.x += pixelStep * 0.5; }
	let edgeL = ( m + oppL ) * 0.5;
	let gt = grad * 0.25;
	var puv = uvEdge + edgeStep * FXAA_STEPS[ 0 ];
	var pD = aaLuma( puv ) - edgeL;
	var pEnd = abs( pD ) >= gt;
	for ( var i = 1; i < searchSteps && ! pEnd; i++ ) { puv += edgeStep * FXAA_STEPS[ i ]; pD = aaLuma( puv ) - edgeL; pEnd = abs( pD ) >= gt; }
	if ( ! pEnd ) { puv += edgeStep * 8.0; }
	var nuv = uvEdge - edgeStep * FXAA_STEPS[ 0 ];
	var nD = aaLuma( nuv ) - edgeL;
	var nEnd = abs( nD ) >= gt;
	for ( var i = 1; i < searchSteps && ! nEnd; i++ ) { nuv -= edgeStep * FXAA_STEPS[ i ]; nD = aaLuma( nuv ) - edgeL; nEnd = abs( nD ) >= gt; }
	if ( ! nEnd ) { nuv -= edgeStep * 8.0; }
	let pDist = select( puv.y - uv.y, puv.x - uv.x, isH );
	let nDist = select( uv.y - nuv.y, uv.x - nuv.x, isH );
	let shortest = min( pDist, nDist );
	let deltaSign = select( nD >= 0.0, pD >= 0.0, pDist <= nDist );
	let edgeBlend = select( 0.5 - shortest / ( pDist + nDist ), 0.0, deltaSign == ( m - edgeL >= 0.0 ) );

	let fb = max( pixelBlend, edgeBlend );
	var fuv = uv;
	if ( isH ) { fuv.y += pixelStep * fb; } else { fuv.x += pixelStep * fb; }
	return vec4f( aaIn( fuv ), 1.0 );
}
`});this._passes={none:t,fxaa:n}}_buildSMAA(){let e={aaSrc:{texture:this.src},aaExposure:{storage:this.exposure,access:`read`}},t=new Je({label:`SMAA edges`,colorFormats:[`rgba8unorm`],bindings:e,code:ps+`
fn smaaDelta( a: vec3f, b: vec3f ) -> f32 { let t = abs( a - b ); return max( t.r, max( t.g, t.b ) ); }
fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let px = 1.0 / vec2f( textureDimensions( aaSrc ) );
	let C = aaP( aaIn( uv ) );
	var delta = vec4f( smaaDelta( C, aaP( aaIn( uv + vec2f( - px.x, 0.0 ) ) ) ), smaaDelta( C, aaP( aaIn( uv + vec2f( 0.0, - px.y ) ) ) ), 0.0, 0.0 );
	var edges = step( vec2f( 0.1 ), delta.xy );
	if ( dot( edges, vec2f( 1.0 ) ) == 0.0 ) { return vec4f( 0.0 ); }
	delta.z = smaaDelta( C, aaP( aaIn( uv + vec2f( px.x, 0.0 ) ) ) );
	delta.w = smaaDelta( C, aaP( aaIn( uv + vec2f( 0.0, px.y ) ) ) );
	var maxDelta = max( max( delta.x, delta.y ), max( delta.z, delta.w ) );
	let dLL = smaaDelta( C, aaP( aaIn( uv + vec2f( - 2.0 * px.x, 0.0 ) ) ) );
	let dTT = smaaDelta( C, aaP( aaIn( uv + vec2f( 0.0, - 2.0 * px.y ) ) ) );
	maxDelta = max( maxDelta, max( dLL, dTT ) );
	// local contrast adaptation
	edges *= step( vec2f( 0.5 * maxDelta ), delta.xy );
	return vec4f( edges, 0.0, 0.0 );
}
`}),n=new Je({label:`SMAA weights`,colorFormats:[`rgba8unorm`],bindings:{aaEdges:{texture:()=>this.edges.texture},aaArea:{texture:()=>this.area},aaSearch:{texture:()=>this.search}},code:`
const SMAA_STEPS: i32 = 8;
fn smaaE( uv: vec2f ) -> vec2f { return textureSampleLevel( aaEdges, smpLinearClamp, uv, 0.0 ).rg; }
fn smaaSearchLength( e: vec2f, bias: f32, scale: f32 ) -> f32 {
	return 255.0 * textureSampleLevel( aaSearch, smpNearestClamp, vec2f( bias + e.x * scale, e.y ), 0.0 ).r;
}
fn smaaArea( dist: vec2f, e1: f32, e2: f32, offset: f32 ) -> vec2f {
	let ps = vec2f( 1.0 / 160.0, 1.0 / 560.0 );
	var tc = ps * ( 16.0 * round( 4.0 * vec2f( e1, e2 ) ) + dist ) + 0.5 * ps;
	tc.y += offset / 7.0;
	return textureSampleLevel( aaArea, smpLinearClamp, tc, 0.0 ).rg;
}
fn smaaXLeft( tc: vec2f, end: f32, inv: vec2f ) -> f32 {
	var e = vec2f( 0.0, 1.0 ); var c = tc;
	for ( var i = 0; i < SMAA_STEPS; i++ ) {
		e = smaaE( c ); c.x -= 2.0 * inv.x;
		if ( c.x <= end || e.y <= 0.8281 || e.x != 0.0 ) { break; }
	}
	c.x += 0.25 * inv.x + inv.x + 2.0 * inv.x;
	return c.x - inv.x * smaaSearchLength( e, 0.0, 0.5 );
}
fn smaaXRight( tc: vec2f, end: f32, inv: vec2f ) -> f32 {
	var e = vec2f( 0.0, 1.0 ); var c = tc;
	for ( var i = 0; i < SMAA_STEPS; i++ ) {
		e = smaaE( c ); c.x += 2.0 * inv.x;
		if ( c.x >= end || e.y <= 0.8281 || e.x != 0.0 ) { break; }
	}
	c.x -= 0.25 * inv.x + inv.x + 2.0 * inv.x;
	return c.x + inv.x * smaaSearchLength( e, 0.5, 0.5 );
}
fn smaaYUp( tc: vec2f, end: f32, inv: vec2f ) -> f32 {
	var e = vec2f( 1.0, 0.0 ); var c = tc;
	for ( var i = 0; i < SMAA_STEPS; i++ ) {
		e = smaaE( c ); c.y -= 2.0 * inv.y;
		if ( c.y <= end || e.x <= 0.8281 || e.y != 0.0 ) { break; }
	}
	c.y += 0.25 * inv.y + inv.y + 2.0 * inv.y;
	return c.y - inv.y * smaaSearchLength( e.yx, 0.0, 0.5 );
}
fn smaaYDown( tc: vec2f, end: f32, inv: vec2f ) -> f32 {
	var e = vec2f( 1.0, 0.0 ); var c = tc;
	for ( var i = 0; i < SMAA_STEPS; i++ ) {
		e = smaaE( c ); c.y += 2.0 * inv.y;
		if ( c.y >= end || e.x <= 0.8281 || e.y != 0.0 ) { break; }
	}
	c.y -= 0.25 * inv.y + inv.y + 2.0 * inv.y;
	return c.y + inv.y * smaaSearchLength( e.yx, 0.5, 0.5 );
}
fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let inv = 1.0 / vec2f( textureDimensions( aaEdges ) );
	let pix = uv / inv;
	let o0 = vec4f( uv, uv ) + vec4f( inv, inv ) * vec4f( -0.25, -0.125, 1.25, -0.125 );
	let o1 = vec4f( uv, uv ) + vec4f( inv, inv ) * vec4f( -0.125, -0.25, -0.125, 1.25 );
	let o2 = vec4f( o0.xz, o1.yw ) + vec4f( -2.0, 2.0, -2.0, 2.0 ) * vec4f( inv.xx, inv.yy ) * f32( SMAA_STEPS );
	var w = vec4f( 0.0 );
	let e = smaaE( uv );
	if ( e.y > 0.0 ) {
		// edge at north: distances to its ends left and right, and the crossing edges there
		let xl = smaaXLeft( o0.xy, o2.x, inv );
		let e1 = textureSampleLevel( aaEdges, smpLinearClamp, vec2f( xl, o1.y ), 0.0 ).r;
		let xr = smaaXRight( o0.zw, o2.y, inv );
		let d = vec2f( xl, xr ) / inv.x - pix.x;
		let e2 = textureSampleLevel( aaEdges, smpLinearClamp, vec2f( xr + inv.x, o1.y ), 0.0 ).r;
		let a = smaaArea( sqrt( abs( d ) ), e1, e2, 0.0 );
		w = vec4f( a, w.zw );
	}
	if ( e.x > 0.0 ) {
		// edge at west: up and down
		let yu = smaaYUp( o1.xy, o2.z, inv );
		let e1 = textureSampleLevel( aaEdges, smpLinearClamp, vec2f( o0.x, yu ), 0.0 ).g;
		let yd = smaaYDown( o1.zw, o2.w, inv );
		let d = vec2f( yu, yd ) / inv.y - pix.y;
		let e2 = textureSampleLevel( aaEdges, smpLinearClamp, vec2f( o0.x, yd + inv.y ), 0.0 ).g;
		let a = smaaArea( sqrt( abs( d ) ), e1, e2, 0.0 );
		w = vec4f( w.xy, a );
	}
	return w;
}
`}),r=new Je({label:`SMAA blend`,colorFormats:[`rgba16float`],bindings:{aaSrc:{texture:this.src},aaWeights:{texture:()=>this.weights.texture}},code:`
fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let inv = 1.0 / vec2f( textureDimensions( aaWeights ) );
	let w0 = textureSampleLevel( aaWeights, smpLinearClamp, uv, 0.0 );
	let a = vec4f( w0.x, textureSampleLevel( aaWeights, smpLinearClamp, uv + vec2f( 0.0, inv.y ), 0.0 ).y,
		w0.z, textureSampleLevel( aaWeights, smpLinearClamp, uv + vec2f( inv.x, 0.0 ), 0.0 ).w );
	let C = textureSampleLevel( aaSrc, smpLinearClamp, uv, 0.0 );
	if ( dot( a, vec4f( 1.0 ) ) < 1e-5 ) { return C; }
	// the line with the largest weight through each direction; the stronger direction wins
	var off = vec2f( select( - a.z, a.w, a.w > a.z ), select( - a.x, a.y, a.y > a.x ) );
	if ( abs( off.x ) > abs( off.y ) ) { off.y = 0.0; } else { off.x = 0.0; }
	let Cop = textureSampleLevel( aaSrc, smpLinearClamp, uv + sign( off ) * inv, 0.0 );
	return mix( C, Cop, max( abs( off.x ), abs( off.y ) ) );
}
`});Object.assign(this._passes,{edges:t,weights:n,blend:r}),this._smaa=!0}render(e,t){this._passes||this._build();let n=this._passes;if(e===`smaa`&&this.area&&this.search){this._smaa||this._buildSMAA();let e=typeof this.src==`function`?this.src():this.src;this.edges.setSize(e.width,e.height),this.weights.setSize(e.width,e.height),n.edges.render({colorViews:[this.edges.texture],clear:fs}),n.weights.render({colorViews:[this.weights.texture],clear:fs}),n.blend.render({colorViews:[t],clear:fs})}else e===`fxaa`||e===`smaa`?n.fxaa.render({colorViews:[t],clear:fs}):n.none.render({colorViews:[t],clear:fs})}};function hs({enabled:e,debugView:t,inputWidth:n,inputHeight:r,outputWidth:i,outputHeight:a,jitterX:o,jitterY:s}){return e&&t===0&&n===i&&r===a&&n>0&&r>0&&Math.abs(o)<.49&&Math.abs(s)<.49}function gs(e){let t=/fn taauDepthAt\( p: vec2i \) -> f32 \{[\s\S]*?\n\}/,n=`		let rgb = min( max( taauLoadBeauty( tap ).rgb, vec3f( 0.0 ) ) * exposure, vec3f( 65504.0 ) );
		samples[ i ] = taauToYCoCg( rgb );
		lumas[ i ] = taauLockLuma( rgb );`;if(!t.test(e)||!e.includes(n)||!e.includes(`@fragment fn fs( in: FSIn ) -> TaauOut`))throw Error(`The temporal resolve changed: review the tiled adaptation before enabling it`);return`
struct FSIn { pos: vec4f, uv: vec2f };
var<workgroup> taauTilePrepared: array<vec4f, 100>;
var<workgroup> taauTileDepth: array<f32, 100>;
var<private> taauTileOrigin: vec2i;
fn taauTileIndex(p:vec2i)->u32 {
	let q=p-taauTileOrigin;
	return u32(q.y*10+q.x);
}
${e.replace(t,`fn taauDepthAt( p: vec2i ) -> f32 { return taauTileDepth[ taauTileIndex( p ) ]; }`).replace(n,`		let prepared = taauTilePrepared[ taauTileIndex( tap ) ];
		samples[ i ] = prepared.xyz;
		lumas[ i ] = prepared.w;`).replace(`@fragment fn fs( in: FSIn ) -> TaauOut`,`fn taauResolvePixel( in: FSIn ) -> TaauOut`).replace(/@location\(\s*\d+\s*\)\s*/g,``)}
@compute @workgroup_size(8, 8, 1)
fn main(@builtin(global_invocation_id) gid:vec3u, @builtin(local_invocation_index) index:u32, @builtin(workgroup_id) group:vec3u) {
	let size=vec2i(textureDimensions(taauBeauty));
	taauTileOrigin=vec2i(group.xy)*8-vec2i(1);
	let exposure=taauExposure[0]*frame.exposure;
	for(var i=index;i<100u;i+=64u) {
		let p=clamp(taauTileOrigin+vec2i(i32(i%10u),i32(i/10u)),vec2i(0),size-1);
		let rgb=min(max(textureLoad(taauBeauty,p,0).rgb,vec3f(0.0))*exposure,vec3f(65504.0));
		taauTilePrepared[i]=vec4f(taauToYCoCg(rgb),taauLockLuma(rgb));
		taauTileDepth[i]=1.0-textureLoad(taauDepth,p,0);
	}
	workgroupBarrier();
	if(any(gid.xy>=vec2u(size))) { return; }
	let pixel=vec2f(gid.xy)+vec2f(0.5);
	let value=taauResolvePixel(FSIn(vec4f(pixel,0.0,1.0),pixel/vec2f(size)));
	textureStore(taauOutColor,vec2i(gid.xy),value.color);
	textureStore(taauOutLock,vec2i(gid.xy),value.lock);
	textureStore(taauOutLuma,vec2i(gid.xy),value.lumaHistory);
}`}var _s=[0,0,0,0];function vs(e,t){let n=1,r=0;for(;e>0;)n/=t,r+=e%t*n,e=Math.floor(e/t);return r}var ys=class{static DEBUG_VIEWS=[`Off`,`Locks (green: holding, blue: new)`,`Luma instability (red)`,`Clamped (red) / kept (green)`,`New frame weight`,`Motion (px / frame)`,`Resampling blur (blue)`,`Still pixels kept (yellow)`];constructor(e,t,n,r,i=null,a=null){this.beauty=e,this.depthTexture=t,this.velocityTexture=n,this.waterMaskTexture=i,this.camera=r,this.renderOptimizations=bt(),this.optimizationStats={tiledFrames:0,fragmentFrames:0,depthRotations:0,depthCopies:0},this._depthReady=!1,this.exposure=a||new ce({label:`taauExposure`,count:1,type:`f32`,data:new Float32Array([1])}),this.uniforms=new l(`TAAUParams`,{prevInvViewProj:[`mat4x4f`,new C],jitterOffset:[`vec2f`,new p],cameraNearFar:[`vec2f`,new p(.1,1e3)],depthThreshold:[`f32`,5e-4],edgeDepthDiff:[`f32`,.001],hasWaterMask:[`f32`,+!!i],jitterPhases:[`f32`,8],reset:[`f32`,1],debugView:[`f32`,0],boxStill:[`f32`,3],boxMotion:[`f32`,1],maxAccumulation:[`f32`,2],motionAccumulation:[`f32`,10],blurComp:[`f32`,.5],locks:[`f32`,1],instability:[`f32`,1],lockThreshold:[`f32`,1.05],staticKeep:[`f32`,1]},{label:`taau`}),this.settings=this.uniforms.fields,this.jitterPhaseOverride=4,this.jitterScale=.5,this.jitterMoving=.35,this._camMotion=0,this._camPrev=null,this.debugView=0;let o=this.uniforms.fields;this._jitterOffset=o.jitterOffset,this._jitterIndex=0,this._outW=1;let s=()=>({colors:[{format:`rgba16float`,name:`color`},{format:`rgba16float`,name:`lock`},{format:`rgba8unorm`,name:`lumaHistory`}],label:`taauHistory`,usage:this.renderOptimizations.tiledTAA?[`sample`,`render`,`copySrc`,`copyDst`,`storage`]:[`sample`,`render`,`copySrc`,`copyDst`]});this.history=[new le(1,1,s()),new le(1,1,s())],this._cur=0,this._prevDepth=new P({label:`taauPrevDepth`,width:1,height:1,format:`depth32float`,usage:this.renderOptimizations.depthRotation?[`sample`,`render`,`copySrc`,`copyDst`]:[`sample`,`copyDst`]}),this._hasPrevInvVP=!1,this._needsRestart=!0,this._build()}get texture(){return this.history[this._cur].textures[0]}get output(){return this.debugView>0&&this._debugTarget?this._debugTarget.texture:this.texture}getTextureNode(){return this.texture}setSize(e,t){let n=this.history[0].setSize(e,t);this.history[1].setSize(e,t),this._outW=e,n&&(this._needsRestart=!0)}restart(){this._needsRestart=!0,this._hasPrevInvVP=!1}_beautyTexture(){return typeof this.beauty==`function`?this.beauty():this.beauty}jitter(){let e=this._beautyTexture(),t=e&&e.width?this._outW/e.width:1,n=this.jitterPhaseOverride||Math.max(1,Math.ceil(8*t*t));this.uniforms.fields.jitterPhases.value=n;let r=this._jitterIndex%n,i=this.jitterScale*(1+(this.jitterMoving-1)*this._cameraMotion());this.jitterNow=i;let a=(vs(r+1,2)-.5)*i,o=(vs(r+1,3)-.5)*i;return this._jitterOffset.value.set(a,o),[a,o]}_cameraMotion(){let e=this.camera&&this.camera.matrixWorld;if(!e)return 0;let t=e.elements,n=[t[12],t[13],t[14],t[8],t[9],t[10]],r=0;if(this._camPrev){let e=this._camPrev,t=Math.hypot(n[0]-e[0],n[1]-e[1],n[2]-e[2]),i=Math.hypot(n[3]-e[3],n[4]-e[4],n[5]-e[5]);r=Math.min(1,Math.max((t-.002)/.008,(i-5e-4)/.0015)),r=Math.max(0,r)}return this._camPrev=n,this._camMotion=r>this._camMotion?r:this._camMotion+(r-this._camMotion)*.15,this._camMotion}clearViewOffset(){this._jitterIndex=(this._jitterIndex+1)%1024}_build(){let e=()=>this._beautyTexture(),t=t=>({taau:{uniform:this.uniforms},taauBeauty:{texture:e},taauDepth:{texture:()=>this.depthTexture},taauPrevDepth:{texture:()=>this._prevDepth},taauVelocity:{texture:()=>this.velocityTexture},taauMask:{texture:()=>this.waterMaskTexture||this.velocityTexture},taauHistory:{texture:()=>this.history[t].textures[0]},taauLock:{texture:()=>this.history[t].textures[1]},taauLumaHistory:{texture:()=>this.history[t].textures[2]},taauExposure:{storage:this.exposure,access:`read`}}),n=`
const TAAU_EPS = 1e-3;
const TAAU_LANCZOS_WEIGHT_SCALE = 1.0 / 12.0;
const TAAU_AVG_LANCZOS_WEIGHT_PER_FRAME = 0.74 / 12.0;

fn taauToYCoCg( c: vec3f ) -> vec3f {
	return vec3f( dot( c, vec3f( 0.25, 0.5, 0.25 ) ), dot( c, vec3f( 0.5, 0.0, -0.5 ) ), dot( c, vec3f( -0.25, 0.5, -0.25 ) ) );
}
fn taauFromYCoCg( c: vec3f ) -> vec3f { return vec3f( c.x + c.y - c.z, c.x + c.z, c.x - c.y - c.z ); }
// FSR2 Tonemap / InverseTonemap (max channel Reinhard)
fn taauTonemap( c: vec3f ) -> vec3f { return c / ( max( max( 0.0, c.r ), max( c.g, c.b ) ) + 1.0 ); }
fn taauTonemapInverse( c: vec3f ) -> vec3f { return c / max( 1e-4, 1.0 - max( c.r, max( c.g, c.b ) ) ); }
fn taauMinDivMax( a: f32, b: f32 ) -> f32 { let m = max( a, b ); return select( 0.0, min( a, b ) / m, m != 0.0 ); }
// Lanczos-2 of the squared distance (FSR2 Lanczos2ApproxSq)
fn taauLanczos2Sq( x2In: f32 ) -> f32 {
	let x2 = min( x2In, 4.0 );
	let a = 0.4 * x2 - 1.0;
	let b = 0.25 * x2 - 1.0;
	return ( 1.5625 * a * a - 0.5625 ) * ( b * b );
}
// luma for the lock logic (FSR2 ComputeLockInputLuma: perceived lightness of the tone mapped colour, ^1/6)
fn taauLockLuma( rgb: vec3f ) -> f32 {
	let l = luminance( taauTonemap( rgb ) );
	let p = select( pow( l, 1.0 / 3.0 ) * 116.0 - 16.0, l * ( 24389.0 / 27.0 ), l <= 216.0 / 24389.0 ) * 0.01;
	return pow( max( p, 0.0 ), 1.0 / 6.0 );
}

// Catmull-Rom history lookup with 5 bilinear taps (the 4 corner taps are dropped)
fn taauSampleHistory( uvIn: vec2f ) -> vec4f {
	let size = vec2f( textureDimensions( taauHistory ) );
	let samplePos = uvIn * size;
	let texPos1 = floor( samplePos - 0.5 ) + 0.5;
	let f = samplePos - texPos1;
	let w0 = f * ( f * ( f * -0.5 + 1.0 ) - 0.5 );
	let w1 = f * f * ( f * 1.5 - 2.5 ) + 1.0;
	let w2 = f * ( f * ( f * -1.5 + 2.0 ) + 0.5 );
	let w3 = f * f * ( f * 0.5 - 0.5 );
	let w12 = w1 + w2;
	let tp0 = ( texPos1 - 1.0 ) / size;
	let tp3 = ( texPos1 + 2.0 ) / size;
	let tp12 = ( texPos1 + w2 / w12 ) / size;
	let wa = w12.x * w0.y; let wb = w0.x * w12.y; let wc = w12.x * w12.y; let wd = w3.x * w12.y; let we = w12.x * w3.y;
	let sum = textureSampleLevel( taauHistory, smpLinearClamp, vec2f( tp12.x, tp0.y ), 0.0 ) * wa
		+ textureSampleLevel( taauHistory, smpLinearClamp, vec2f( tp0.x, tp12.y ), 0.0 ) * wb
		+ textureSampleLevel( taauHistory, smpLinearClamp, vec2f( tp12.x, tp12.y ), 0.0 ) * wc
		+ textureSampleLevel( taauHistory, smpLinearClamp, vec2f( tp3.x, tp12.y ), 0.0 ) * wd
		+ textureSampleLevel( taauHistory, smpLinearClamp, vec2f( tp12.x, tp3.y ), 0.0 ) * we;
	return max( sum / ( wa + wb + wc + wd + we ), vec4f( 0.0 ) );
}

fn taauLoadBeauty( p: vec2i ) -> vec4f {
	let s = vec2i( textureDimensions( taauBeauty ) );
	return textureLoad( taauBeauty, clamp( p, vec2i( 0 ), s - 1 ), 0 );
}

// standard (0 near .. 1 far) perspective depth of the reversed-Z buffer at p (clamped)
fn taauDepthAt( p: vec2i ) -> f32 {
	let s = vec2i( textureDimensions( taauDepth ) );
	return 1.0 - textureLoad( taauDepth, clamp( p, vec2i( 0 ), s - 1 ), 0 );
}

// last frame's depth at uv, reprojected into this frame's camera (standard perspective depth)
fn taauPreviousDepth( uv: vec2f ) -> f32 {
	let s = vec2i( textureDimensions( taauPrevDepth ) );
	let d = textureLoad( taauPrevDepth, clamp( vec2i( uv * vec2f( s ) ), vec2i( 0 ), s - 1 ), 0 );
	let pw = taau.prevInvViewProj * vec4f( uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, d, 1.0 );
	let world = pw.xyz / pw.w;
	let viewZ = ( frame.view * vec4f( world, 1.0 ) ).z;
	let near = taau.cameraNearFar.x; let far = taau.cameraNearFar.y;
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}

fn taauInside( uv: vec2f ) -> bool { return all( uv >= vec2f( 0.0 ) ) && all( uv <= vec2f( 1.0 ) ); }

struct TaauOut { @location( 0 ) color: vec4f, @location( 1 ) lock: vec4f, @location( 2 ) lumaHistory: vec4f, DEBUG_FIELD };
@fragment fn fs( in: FSIn ) -> TaauOut {
	let uv = in.uv;
	let inSize = vec2f( textureDimensions( taauBeauty ) );
	let outSize = vec2f( textureDimensions( taauHistory ) );
	let downscale = inSize / outSize; // FSR2 DownscaleFactor (render / display)
	let exposure = taauExposure[ 0 ] * frame.exposure;

	// output pixel centre in input pixels; the input tap whose jittered sample is closest
	let pIn = uv * inSize;
	let closestTap = vec2i( round( pIn - ( vec2f( 0.5 ) + taau.jitterOffset ) ) );

	// ---- reprojection (three's TAAUNode): velocity of the nearest depth in the 3x3, disocclusion
	var closestDepth = 2.0;
	var closestPositionTexel = vec2i( 0 );
	var farthestDepth = -1.0;
	for ( var y = -1; y <= 1; y++ ) {
		for ( var x = -1; x <= 1; x++ ) {
			let neighbor = closestTap + vec2i( x, y );
			let depth = taauDepthAt( neighbor );
			if ( depth < closestDepth ) {
				closestDepth = depth;
				closestPositionTexel = neighbor;
			}
			farthestDepth = max( farthestDepth, depth );
		}
	}
	let vs = vec2i( textureDimensions( taauVelocity ) );
	let velocity = textureLoad( taauVelocity, clamp( closestPositionTexel, vec2i( 0 ), vs - 1 ), 0 ).xy;
	let historyUV = uv - velocity;
	let hrVelocity = length( velocity * outSize ); // output pixels per frame
	let isEdge = farthestDepth - closestDepth > taau.edgeDepthDiff;
	let isDisocclusion = closestDepth - taauPreviousDepth( historyUV ) > taau.depthThreshold;
	// the water surface keeps its history (its depth changes with the waves, not with occlusion)
	let ms = vec2i( textureDimensions( taauMask ) );
	let isWater = taau.hasWaterMask > 0.5 && textureLoad( taauMask, clamp( closestTap, vec2i( 0 ), ms - 1 ), 0 ).g > 0.5;
	let isExistingSample = taauInside( historyUV );
	let depthClip = select( 0.0, 1.0, isDisocclusion && ! isEdge && ! isWater );
	let isNewSample = ! isExistingSample || taau.reset > 0.5;

	// ---- history (FSR2 ReprojectHistoryColor / ReprojectHistoryLockStatus)
	var historyColor = vec3f( 0.0 );
	var lockStatus = vec2f( 0.0 );
	var temporalReactive = 0.0;
	var inMotionLastFrame = false;
	var blurPrev = 0.0;
	if ( ! isNewSample ) {
		historyColor = taauToYCoCg( min( taauSampleHistory( historyUV ).rgb * exposure, vec3f( 65504.0 ) ) );
		let ls = textureSampleLevel( taauLock, smpLinearClamp, historyUV, 0.0 );
		lockStatus = ls.xy;
		temporalReactive = sat( abs( ls.z ) );
		inMotionLastFrame = ls.z < 0.0;
		blurPrev = ls.w;
	}

	// ---- the 3x3 input taps: prepared (exposed) YCoCg colour, lock luma
	var samples: array<vec3f, 9>;
	var lumas: array<f32, 9>;
	var lumaSum = 0.0;
	for ( var i = 0; i < 9; i++ ) {
		let tap = closestTap + vec2i( i % 3 - 1, i / 3 - 1 );
		let rgb = min( max( taauLoadBeauty( tap ).rgb, vec3f( 0.0 ) ) * exposure, vec3f( 65504.0 ) );
		samples[ i ] = taauToYCoCg( rgb );
		lumas[ i ] = taauLockLuma( rgb );
		lumaSum += lumas[ i ];
	}

	// ---- new lock: the centre tap is a thin feature (FSR2 ComputeThinFeatureConfidence)
	var newLock = false;
	{
		let nucleus = lumas[ 4 ];
		var mask = 1u << 4u;
		var dMin = 3.4e38;
		var dMax = 0.0;
		for ( var i = 0; i < 9; i++ ) {
			if ( i == 4 ) { continue; }
			let l = lumas[ i ];
			let diff = max( l, nucleus ) / min( l, nucleus );
			if ( diff > 0.0 && diff < taau.lockThreshold ) { mask |= 1u << u32( i ); } else { dMin = min( dMin, l ); dMax = max( dMax, l ); }
		}
		let isRidge = nucleus > dMax || nucleus < dMin;
		let q0 = ( 1u << 0u ) | ( 1u << 1u ) | ( 1u << 3u ) | ( 1u << 4u );
		let q1 = ( 1u << 1u ) | ( 1u << 2u ) | ( 1u << 4u ) | ( 1u << 5u );
		let q2 = ( 1u << 3u ) | ( 1u << 4u ) | ( 1u << 6u ) | ( 1u << 7u );
		let q3 = ( 1u << 4u ) | ( 1u << 5u ) | ( 1u << 7u ) | ( 1u << 8u );
		newLock = isRidge && ( mask & q0 ) != q0 && ( mask & q1 ) != q1 && ( mask & q2 ) != q2 && ( mask & q3 ) != q3;
	}

	// ---- lock status (FSR2 UpdateLockStatus). The shading change luma is the local mean lock luma
	// (FSR2 reads a coarse mip of the luma)
	var thisFrameReactive = temporalReactive;
	let shadingLuma = lumaSum / 9.0;
	if ( lockStatus.y == 0.0 ) { lockStatus.y = shadingLuma; }
	let luminanceDiff = 1.0 - taauMinDivMax( lockStatus.y, shadingLuma );
	if ( newLock ) {
		lockStatus.y = shadingLuma;
		lockStatus.x = select( 1.0, 2.0, lockStatus.x != 0.0 );
	} else if ( lockStatus.x <= 1.0 ) {
		lockStatus.y = mix( lockStatus.y, shadingLuma, 0.5 );
	} else if ( luminanceDiff > 0.1 ) {
		lockStatus.x = 0.0;
	}
	thisFrameReactive = max( thisFrameReactive, sat( ( luminanceDiff - 0.1 ) * 10.0 ) );
	lockStatus.x *= 1.0 - thisFrameReactive;
	lockStatus.x *= select( 0.0, 1.0, depthClip < 0.1 );
	let lockContribution = sat( sat( sat( lockStatus.x - 1.0 ) * 4.0 ) * sat( taauMinDivMax( lockStatus.y, shadingLuma ) ) ) * taau.locks;

	// ---- this frame at the output pixel: Lanczos-2 over the 3x3 taps, and the rectification box
	// (FSR2 ComputeUpsampledColorAndWeight)
	let kernelReactive = max( thisFrameReactive, select( 0.0, 1.0, isNewSample ) );
	let maxKernelWeight = min( 1.99, 1.0 + ( 1.0 / downscale.x - 1.0 ) );
	let kernelBiasMax = maxKernelWeight * ( 1.0 - kernelReactive );
	let kernelBiasMin = max( 1.0, ( 1.0 + kernelBiasMax ) * 0.3 );
	let kernelBias = mix( kernelBiasMax, kernelBiasMin, max( 0.25 * depthClip, kernelReactive ) );
	let rectCurveBias = mix( -2.0, -3.0, sat( hrVelocity / 50.0 ) );
	var colorSum = vec3f( 0.0 );
	var weightSum = 0.0;
	var boxCenter = vec3f( 0.0 );
	var boxVec = vec3f( 0.0 );
	var boxWeight = 0.0;
	var aabbMin = vec3f( 3.4e38 );
	var aabbMax = vec3f( -3.4e38 );
	let iSize = vec2i( inSize );
	for ( var i = 0; i < 9; i++ ) {
		let tap = closestTap + vec2i( i % 3 - 1, i / 3 - 1 );
		let offset = vec2f( tap ) + vec2f( 0.5 ) + taau.jitterOffset - pIn; // sample position - output position
		let onScreen = all( tap >= vec2i( 0 ) ) && all( tap < iSize );
		let ob = offset * kernelBias;
		let w = select( 0.0, taauLanczos2Sq( dot( ob, ob ) ), onScreen );
		let c = samples[ i ];
		colorSum += c * w;
		weightSum += w;
		let bw = exp( rectCurveBias * dot( offset, offset ) );
		boxCenter += c * bw;
		boxVec += c * c * bw;
		boxWeight += bw;
		aabbMin = min( aabbMin, c );
		aabbMax = max( aabbMax, c );
	}
	boxCenter /= boxWeight;
	boxVec = sqrt( abs( boxVec / boxWeight - boxCenter * boxCenter ) );
	var upsampledWeight = select( 0.0, weightSum, weightSum > TAAU_EPS );
	var upsampled = vec3f( 0.0 );
	if ( upsampledWeight > TAAU_EPS ) {
		// deringing: the Lanczos lobes can't leave the neighbourhood's range
		upsampled = clamp( colorSum / upsampledWeight, aabbMin, aabbMax );
		upsampledWeight *= TAAU_LANCZOS_WEIGHT_SCALE;
	}

	// ---- luma instability (FSR2 ComputeLumaInstabilityFactor): the local luma returning to an older
	// value instead of the last one
	var lumaInstability = 0.0;
	var lumaHist = vec4f( 0.0 );
	var staticKeep = 0.0;
	{
		var curLuma = boxCenter.x / ( 1.0 + max( 0.0, boxCenter.x ) );
		curLuma = round( curLuma * 255.0 ) / 255.0;
		let sampleHist = max( depthClip, luminanceDiff ) < 0.1 && ! isNewSample;
		if ( sampleHist ) { lumaHist = textureSampleLevel( taauLumaHistory, smpLinearClamp, historyUV, 0.0 ); }
		let d0 = curLuma - lumaHist.x;
		var dmin = abs( d0 );
		if ( dmin >= 1.0 / 255.0 ) {
			for ( var i = 1; i < 4; i++ ) {
				let d1 = curLuma - lumaHist[ i ];
				if ( sign( d0 ) == sign( d1 ) ) { dmin = min( dmin, abs( d1 ) ); }
			}
			let boxSizeFactor = pow( sat( boxVec.x / 0.1 ), 6.0 );
			lumaInstability = select( 0.0, 1.0, dmin != abs( d0 ) ) * boxSizeFactor;
			lumaInstability = select( 0.0, 1.0, lumaInstability > 1.0 / 255.0 );
		}
		lumaInstability *= select( 0.0, 1.0, lumaHist.w != 0.0 ) * taau.instability;
		// Still pixels (not in FSR2): with the camera and the surface still, a clamp can only be the
		// jitter's doing (a sub-pixel plank gap that the 3x3 misses in this frame's samples), unless the
		// lighting changed. A real change (a shadow moving in) leaves the local luma away from all of
		// the last 4 frames'; the jitter brings it back to one of them. Such pixels keep their history.
		let dAll = min( min( abs( curLuma - lumaHist.x ), abs( curLuma - lumaHist.y ) ), min( abs( curLuma - lumaHist.z ), abs( curLuma - lumaHist.w ) ) );
		staticKeep = taau.staticKeep * select( 0.0, 1.0, hrVelocity < 0.05 && lumaHist.w != 0.0 && ! isWater ) * sat( 1.0 - ( dAll - 0.01 ) / 0.03 );
		lumaHist = vec4f( curLuma, lumaHist.xyz );
	}

	// ---- accumulation weight (FSR2 ComputeBaseAccumulationWeight)
	var accumulation = taau.maxAccumulation * select( 0.0, 1.0, isExistingSample ) * ( 1.0 - thisFrameReactive ) * ( 1.0 - depthClip );
	accumulation = min( accumulation, mix( accumulation, upsampledWeight * taau.motionAccumulation, max( select( 0.0, 1.0, inMotionLastFrame ), sat( hrVelocity * 10.0 ) ) ) );
	accumulation = min( accumulation, mix( accumulation, upsampledWeight, sat( hrVelocity / 20.0 ) ) );

	// Resampling blur (not in FSR2): even the Catmull-Rom loses fine detail when it samples between
	// texels, and in motion the history is resampled that way every frame (at 0.2 px ~80% of the
	// finest detail survives a resample). The blur the history has gathered (the variance its
	// resamples added, f (1 - f) per axis, decayed by the blend) caps the accumulation, so a blurred
	// history takes a larger share of the sharp new frame; a still camera resamples at texel centres.
	let hf = fract( historyUV * outSize - 0.5 );
	let hv = hf * ( 1.0 - hf );
	let blurAcc = blurPrev + hv.x + hv.y;
	let blurAlpha = min( blurAcc * taau.blurComp, select( 1.0, 0.15, isWater ) );
	accumulation = min( accumulation, upsampledWeight * ( 1.0 - blurAlpha ) / max( blurAlpha, 1e-3 ) );

	var outColor: vec3f;
	var alphaOut = 1.0;
	var dbgClamp = vec2f( 0.0 );
	if ( isNewSample ) {
		outColor = taauFromYCoCg( upsampled );
	} else {
		// rectify (FSR2 RectifyHistory): clamp to the variance box, but keep locked and oscillating
		// pixels' history; a clamp drops the accumulated weight
		// FSR2 widens the box while still by the upscale factor (1 at native: a 1 sigma box that clamped
		// the sub-pixel plank gaps out of the history, frame after frame); at least 3 sigma here
		let scaleInfluence = max( taau.boxStill, min( 20.0, pow( 1.0 / abs( downscale.x * downscale.y ), 3.0 ) ) );
		let boxScaleT = max( depthClip, sat( hrVelocity / 20.0 ) );
		let boxScale = mix( scaleInfluence, taau.boxMotion, boxScaleT );
		let boxMin = max( aabbMin, boxCenter - boxVec * boxScale );
		let boxMax = min( aabbMax, boxCenter + boxVec * boxScale );
		if ( any( boxMin > historyColor ) || any( historyColor > boxMax ) ) {
			let clamped = clamp( historyColor, boxMin, boxMax );
			// (not on the water: its glints move on their own and would leave trails)
			let contribution = select( sat( max( max( lumaInstability, lockContribution ), staticKeep ) ), 0.0, isWater );
			dbgClamp = vec2f( length( clamped - historyColor ) / max( boxVec.x * 2.0, 0.02 ), contribution );
			historyColor = mix( clamped, historyColor, contribution );
			accumulation = mix( min( accumulation, 0.1 ), accumulation, contribution );
		}
		// accumulate (FSR2 Accumulate), blending tone mapped colours
		let acc = max( TAAU_EPS, accumulation + upsampledWeight );
		let alpha = upsampledWeight / acc;
		alphaOut = alpha;
		let up = taauToYCoCg( taauTonemap( taauFromYCoCg( upsampled ) ) );
		let hi = taauToYCoCg( taauTonemap( taauFromYCoCg( historyColor ) ) );
		outColor = taauTonemapInverse( taauFromYCoCg( mix( hi, up, alpha ) ) );
	}

	// ---- lock lifetime (FSR2 FinalizeLockStatus)
	if ( ! taauInside( uv + velocity ) ) {
		lockStatus.x = 0.0;
	} else {
		lockStatus.x = max( 0.0, lockStatus.x - upsampledWeight / ( taau.jitterPhases * TAAU_AVG_LANCZOS_WEIGHT_PER_FRAME ) );
	}

	// ---- temporal reactive factor for the next frame (FSR2 ComputeTemporalReactiveFactor)
	var newReactive = min( 0.99, thisFrameReactive );
	newReactive = max( newReactive, mix( newReactive, 0.4, sat( hrVelocity ) ) );
	newReactive = max( newReactive * newReactive, depthClip * 0.1 );
	newReactive = select( newReactive, 1.0, isNewSample );
	if ( sat( hrVelocity * 10.0 ) >= 1.0 ) { newReactive = -max( TAAU_EPS, newReactive ); }

	var out: TaauOut;
	out.color = vec4f( max( outColor, vec3f( 0.0 ) ) / exposure, 1.0 );
	out.lock = vec4f( lockStatus, newReactive, select( blurAcc * ( 1.0 - alphaOut ), 0.0, isNewSample ) );
	out.lumaHistory = lumaHist;
DEBUG_OUTPUT
	return out;
}
`,r=[`rgba16float`,`rgba16float`,`rgba8unorm`],i=n.replace(`, DEBUG_FIELD`,``).replace(`DEBUG_OUTPUT
`,``);if(this._resolve=[0,1].map(e=>new Je({label:`TAAU`,bindings:t(e),colorFormats:r,code:i})),this.renderOptimizations.tiledTAA){let e=gs(i);this._tiledResolve=[0,1].map(n=>new j({label:`TAAU tiled`,modules:[F],workgroupSize:[8,8,1],bindings:{...t(n),taauOutColor:{storageTexture:()=>this.history[1-n].textures[0]},taauOutLock:{storageTexture:()=>this.history[1-n].textures[1]},taauOutLuma:{storageTexture:()=>this.history[1-n].textures[2]}},code:e}))}this._buildDebug=()=>{let e=n.replace(`DEBUG_FIELD`,`@location( 3 ) debug: vec4f`).replace(`DEBUG_OUTPUT`,`
	// grey image, the chosen quantity over it (colours are divided by the exposure: the final pass
	// multiplies them back)
	let gray = vec3f( luminance( taauTonemap( outColor * exposure ) ) * 0.35 );
	let view = u32( taau.debugView );
	var v = gray;
	if ( view == 1u ) { v = gray + vec3f( 0.0, lockContribution, select( 0.0, 1.0, newLock ) ); }
	else if ( view == 2u ) { v = gray + vec3f( lumaInstability, 0.0, 0.0 ); }
	else if ( view == 3u ) { v = gray + vec3f( sat( dbgClamp.x ) * ( 1.0 - dbgClamp.y ), sat( dbgClamp.x ) * dbgClamp.y, 0.0 ); }
	else if ( view == 7u ) { v = gray + vec3f( staticKeep * 0.8, staticKeep * 0.8, 0.0 ); }
	else if ( view == 4u ) { v = vec3f( sat( alphaOut * 3.0 ) ); }
	else if ( view == 5u ) { v = gray + vec3f( sat( hrVelocity / 4.0 ), sat( hrVelocity / 16.0 ), 0.0 ); }
	else if ( view == 6u ) { v = gray + vec3f( 0.0, 0.0, sat( blurAlpha * 2.0 ) ); }
	out.debug = vec4f( v / max( exposure, 1e-4 ), 1.0 );`),i=[...r,`rgba16float`];this._resolveDebug=[0,1].map(n=>new Je({label:`TAAU debug`,bindings:t(n),colorFormats:i,code:e})),this._debugTarget=new le(1,1,{colors:[`rgba16float`],label:`taauDebug`})}}render(){let e=b.fields,t=this.uniforms.fields;t.cameraNearFar.value.set(e.near.value,e.far.value),this._hasPrevInvVP||t.prevInvViewProj.value.copy(e.invViewProj.value),this._hasPrevInvVP=!0;let n=this.depthTexture;(this._prevDepth.width!==n.width||this._prevDepth.height!==n.height)&&(this._prevDepth.resize(n.width,n.height),this._needsRestart=!0),t.reset.value=+!!this._needsRestart,this._needsRestart=!1;let r=1-this._cur;if(this.debugView>0){this._resolveDebug||this._buildDebug();let e=this.history[r];this._debugTarget.setSize(e.textures[0].width,e.textures[0].height),t.debugView.value=this.debugView,this._resolveDebug[this._cur].render({colorViews:[...e.textures,this._debugTarget.texture],clear:_s})}else this._tiledResolve&&hs({enabled:this.renderOptimizations.tiledTAA,debugView:this.debugView,inputWidth:this._beautyTexture().width,inputHeight:this._beautyTexture().height,outputWidth:this.history[r].width,outputHeight:this.history[r].height,jitterX:this._jitterOffset.value.x,jitterY:this._jitterOffset.value.y})?(this._tiledResolve[this._cur].dispatch([Math.ceil(this.history[r].width/8),Math.ceil(this.history[r].height/8),1]),this.optimizationStats.tiledFrames++):(this._resolve[this._cur].render({colorViews:this.history[r].textures,clear:_s}),this.optimizationStats.fragmentFrames++);this._cur=r;let i=this.depthTexture;this.renderOptimizations.depthRotation||(N.getEncoder().copyTextureToTexture({texture:i.getGPU()},{texture:this._prevDepth.getGPU()},{width:i.width,height:i.height}),this.optimizationStats.depthCopies++),this._depthReady=!0}endFrame(){this._nextPrev=this._nextPrev||new C,this._nextPrev.copy(b.fields.invViewProj.value)}advance(){if(this.renderOptimizations.depthRotation){let e=this.depthTexture,t=this._prevDepth;(t.width!==e.width||t.height!==e.height)&&(t.resize(e.width,e.height),this._needsRestart=!0,this._depthReady=!1),this._depthReady&&(St(e,t,this.renderOptimizations.bindingReuse),this.optimizationStats.depthRotations++),this._depthReady=!1}this._nextPrev&&this.uniforms.fields.prevInvViewProj.value.copy(this._nextPrev)}},bs=class{constructor(){this.uniforms=new l(`LensParams`,{wet:[`f32`,0],age:[`f32`,100],seed:[`f32`,0],aspect:[`f32`,16/9]},{label:`lens`});let e=this.uniforms.fields;this.wet=e.wet,this.age=e.age,this.seed=e.seed,this.aspect=e.aspect,this.duration=9,this._wasUnder=!1,this.module=new g({name:`lens`,uniforms:this.uniforms,uniformName:`lensParams`,code:xs})}update(e,t){t?this.wet.value=0:(this._wasUnder&&(this.wet.value=1,this.age.value=0,this.seed.value=Math.random()*97),this.age.value+=e,this.wet.value=Math.max(0,this.wet.value-e/this.duration)),this._wasUnder=t}build(){return this.module}},xs=`
// integer hash (pcg2d) of the float bits: no transcendentals (18 cells x 2 hashes per pixel)
fn lensHash2( p: vec2f ) -> vec2f {
	var v = bitcast<vec2u>( p ) * 1664525u + 1013904223u;
	v.x += v.y * 1664525u; v.y += v.x * 1664525u;
	v = v ^ ( v >> vec2u( 16u ) );
	v.x += v.y * 1664525u; v.y += v.x * 1664525u;
	v = v ^ ( v >> vec2u( 16u ) );
	return vec2f( v >> vec2u( 8u ) ) / 16777216.0;
}

struct LensAcc { n2: vec2f, cover: f32, trail: f32 };

// one layer of droplets (clinging, or sliding: heavy drops that start sliding after a delay)
fn lensLayer( p: vec2f, cell: f32, rMin: f32, rMax: f32, density: f32, slide: bool, acc: ptr<function, LensAcc> ) {
	let wet = lensParams.wet; let age = lensParams.age; let seed = lensParams.seed;
	let c0 = floor( p / cell );
	for ( var j = -1; j <= 1; j++ ) {
		for ( var i = -1; i <= 1; i++ ) {
			let c = c0 + vec2f( f32( i ), f32( j ) );
			let h = lensHash2( c + seed );
			// no drop in this cell: it adds nothing (skip the outline math, most cells are empty)
			if ( h.x >= density ) { continue; }
			let h2 = lensHash2( c + seed + 17.3 );
			var center = ( c + ( vec2f( 0.2 ) + h2 * 0.6 ) ) * cell;
			// evaporation shrinks drops; big ones last longer
			let life = clamp( wet * 1.6 - h2.y * 0.6, 0.0, 1.0 );
			let r = mix( rMin, rMax, h.y * h.y ) * sqrt( life );
			if ( slide ) {
				// heavy drops start sliding after a delay and accelerate
				let t0 = h2.x * 3.0 + 0.4;
				let s = max( age - t0, 0.0 );
				let dy = s * s * ( r * 3.5 );
				center.y += dy;
				// wet streak above a sliding drop
				let dxT = abs( p.x - center.x );
				let above = center.y - p.y;
				let tr = smoothstep( r * 0.45, 0.0, dxT ) * smoothstep( 0.0, 0.01, above ) * smoothstep( dy + 0.01, 0.0, above );
				( *acc ).trail = max( ( *acc ).trail, tr * life );
			}
			// irregular outline: a few lobes, sliding drops stretched vertically
			let d = ( p - center ) * vec2f( 1.0, select( 1.0, 0.8, slide ) );
			// outside the largest outline (wobble <= 1.18): no coverage, skip the lobes
			let rB = max( r * 1.18, 1e-4 );
			if ( dot( d, d ) >= rB * rB ) { continue; }
			let ang = atan2( d.y, d.x );
			let wobble = 1.0 + sin( ang * 3.0 + h.x * 40.0 ) * 0.12 + sin( ang * 5.0 + h2.y * 30.0 ) * 0.06;
			let q = d / max( r * wobble, 1e-4 );
			let rq = dot( q, q );
			let a = smoothstep( 1.0, 0.7, rq );
			if ( a > ( *acc ).cover ) {
				( *acc ).n2 = q;
				( *acc ).cover = a;
			}
		}
	}
}

fn lensDroplets( uv: vec2f ) -> vec3f {
	var col = lensSharp( uv );
	let wet = lensParams.wet;
	if ( wet > 0.001 ) {
		let aspect = lensParams.aspect;
		let p = vec2f( uv.x * aspect, uv.y ); // y grows downward on screen

		// ---- droplets (two layers: clinging small drops, sliding large drops)
		var acc: LensAcc;
		acc.n2 = vec2f( 0.0 ); // droplet normal (xy) of the drop covering this pixel
		acc.cover = 0.0; // soft coverage (drops are out of focus)
		acc.trail = 0.0;
		lensLayer( p, 0.05, 0.003, 0.011, wet * 0.5, false, &acc );
		lensLayer( p, 0.13, 0.01, 0.026, wet * 0.22, true, &acc );

		if ( acc.cover > 0.001 ) {
			let n2 = acc.n2;
			let r2 = min( dot( n2, n2 ), 1.0 );
			let nz = sqrt( max( 1.0 - r2, 0.0 ) );
			// a drop is a strong fisheye lens: the image inside is inverted and blurred
			let off = n2 * -0.05 * ( 1.0 - nz * 0.5 );
			let inside = lensBlurred( uv + vec2f( off.x / aspect, off.y ) );
			let edge = smoothstep( 0.45, 1.0, r2 );
			let highlight = smoothstep( 0.3, 0.0, length( n2 - vec2f( -0.3, -0.4 ) ) ) * 0.35;
			let dropCol = inside * mix( 1.04, 0.7, edge ) + inside * highlight;
			col = mix( col, dropCol, acc.cover );
		}

		// wet trails: slight blur and darkening
		col = mix( col, lensBlurred( uv ) * 0.9, acc.trail * 0.6 );
	}
	return col;
}
`,Ss=7,Cs=.3,ws=[{a:.72,r:.018,tint:[1,.85,.6],k:.55},{a:.44,r:.045,tint:[.55,.9,1],k:.35},{a:.16,r:.022,tint:[.8,1,.7],k:.45},{a:-.18,r:.07,tint:[.6,.75,1],k:.22},{a:-.42,r:.03,tint:[1,.7,.9],k:.4},{a:-.75,r:.11,tint:[.7,1,.85],k:.14},{a:-1.15,r:.05,tint:[1,.8,.55],k:.28}],Ts=24,Es=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},Ds=class{constructor({depthTexture:e,clouds:n=null,sunDir:r}){this.sunDir=r,this.uniforms=new l(`FlareParams`,{sunDir:[`vec3f`,new t(0,1,0)],strength:[`f32`,1],sunUV:[`vec2f`,new p(.5,.5)],inView:[`f32`,0],aboveWater:[`f32`,1],aspect:[`f32`,16/9],discPx:[`f32`,6],dt:[`f32`,1/60]},{label:`flare`});let i=this.uniforms.fields;this.strength=i.strength,this.sunUV=i.sunUV,this.inView=i.inView,this.aboveWater=i.aboveWater,this.aspect=i.aspect,this.discPx=i.discPx,this.dt=i.dt,this.visibility=new ce({label:`flareVisibility`,count:1,type:`f32`,data:new Float32Array([0])}),this.depthTexture=e,this.clouds=n;let a=``;for(let e=0;e<Ts;e++){let t=Math.sqrt((e+.5)/Ts),n=e*2.39996323;a+=`\tsky += flareSkyTap( c + vec2f( ${Es(Math.cos(n)*t)}, ${Es(Math.sin(n)*t)} ) * flareParams.discPx, size );\n`}let o=!!(n&&n.module);this.kernel=new j({label:`Lens Flare Visibility`,modules:[F,o?n.module:null].filter(Boolean),bindings:{flareParams:{uniform:this.uniforms},flareDepth:{texture:()=>this.depthTexture},flareVisRW:{storage:this.visibility,access:`read_write`}},workgroupSize:[1,1,1],code:`
fn flareSkyTap( p: vec2f, size: vec2i ) -> f32 {
	let q = clamp( vec2i( p ), vec2i( 0 ), size - 1 );
	// reversed depth: the sky is at 0
	return select( 0.0, 1.0, textureLoad( flareDepth, q, 0 ) < 1e-7 );
}
@compute @workgroup_size( 1 )
fn main() {
	let size = vec2i( textureDimensions( flareDepth ) );
	let c = flareParams.sunUV * vec2f( size );
	var sky = 0.0;
${a}
	let cloudT = ${o?`cloudsSunTransmittance( cloudsSampleView( flareParams.sunDir ).a )`:`1.0`};
	let up = smoothstep( -0.02, 0.04, flareParams.sunDir.y );
	let tgt = sky / ${Es(Ts)} * cloudT * up * flareParams.inView * flareParams.aboveWater;
	let v = flareVisRW[ 0 ];
	flareVisRW[ 0 ] = mix( v, tgt, 1.0 - exp( flareParams.dt * -14.0 ) );
}
`});let s=``;for(let e of ws)s+=`
	{
		let pd = flarePolyDist( p - s * ${Es(e.a)} );
		let body = vec3f( smoothstep( ${Es(e.r*.975)}, ${Es(e.r*.975*.9)}, pd ), smoothstep( ${Es(e.r)}, ${Es(e.r*.9)}, pd ), smoothstep( ${Es(e.r*1.025)}, ${Es(e.r*1.025*.9)}, pd ) );
		let rim = smoothstep( ${Es(e.r*.55)}, ${Es(e.r)}, pd ) * 0.7 + 0.3;
		// smaller ghosts concentrate the same reflected energy: brighter
		ghosts += body * rim * vec3f( ${e.tint.map(Es).join(`, `)} ) * ${Es(e.k*.0028/(e.r*e.r))};
	}`;this.module=new g({name:`flare`,deps:[F],uniforms:this.uniforms,uniformName:`flareParams`,bindings:{flareVis:{storage:this.visibility,access:`read`}},code:`
const FLARE_SEG: f32 = ${Es(2*Math.PI/Ss)};

// aperture polygon: distance scaled so the polygon edge sits at the given radius
fn flarePolyDist( d: vec2f ) -> f32 {
	let a = atan2( d.y, d.x ) + ${Es(Cs)};
	return length( d ) * cos( floor( a / FLARE_SEG + 0.5 ) * FLARE_SEG - a );
}

// HDR flare light for this screen position (added before exposure / tone mapping)
fn flareLight( uv: vec2f ) -> vec3f {
	let asp = vec2f( flareParams.aspect, 1.0 );
	let p = ( uv - 0.5 ) * asp * vec2f( 1.0, -1.0 );
	let s = ( flareParams.sunUV - 0.5 ) * asp * vec2f( 1.0, -1.0 );
	let vis = flareVis[ 0 ];
	// light arriving from the sun disc (the key light colour follows the atmosphere's
	// transmittance; at night the moon is the key light and flares only faintly)
	let light = frame.sunColor * vis * flareParams.strength * 0.02;
	if ( vis <= 0.0 ) { return vec3f( 0.0 ); }

	var ghosts = vec3f( 0.0 );
${s}

	// fade the ghosts as the sun nears the centre (they collapse onto it and vanish)
	let offAxis = smoothstep( 0.02, 0.2, length( s ) );

	// halo: dispersive ring about the image centre
	let rc = length( p );
	let halo = vec3f( smoothstep( 0.03, 0.0, abs( rc - 0.43 ) ), smoothstep( 0.03, 0.0, abs( rc - 0.445 ) ), smoothstep( 0.03, 0.0, abs( rc - 0.46 ) ) ) * smoothstep( 0.25, 0.8, length( s ) ) * 0.12;

	// starburst and veiling glare around the sun (distances in image heights)
	let q = p - s;
	let rq = max( length( q ), 1e-4 );
	let aq = atan2( q.y, q.x ) + ${Es(Cs)};
	let px = 1.0 / max( frame.outputResolution.y, 1.0 );
	// the nearest spike (two per blade) and this pixel's distance from its line
	let seg = ${Es(Math.PI/Ss)};
	let k = floor( aq / seg + 0.5 );
	let perp = abs( sin( aq - k * seg ) ) * rq;
	let ki = k - ${Es(14)} * floor( k / ${Es(14)} ); // same spike across the atan2 seam
	let h1 = fract( sin( ki * 12.9898 + 4.1 ) * 43758.5453 );
	let h2 = fract( sin( ki * 78.233 + 1.7 ) * 43758.5453 );
	// thin at the disc, a little softer outward (same energy across the line: dimmer as it widens)
	let width = px * 0.8 + rq * 0.003;
	let line = exp( - ( perp * perp ) / ( width * width ) ) * ( px * 0.8 / width );
	let len = 0.05 + 0.08 * h1;
	let lenC = vec3f( len * 1.12, len, len * 0.88 );
	let taper = exp( - rq / lenC - ( rq * rq ) / ( lenC * lenC * 4.0 ) );
	let spikes = line * taper * ( 0.45 + 0.55 * h2 ) * 1.4;
	// fine streaks around the disc: smooth angular noise, short
	let t = ( aq * ${Es(1/(2*Math.PI))} + 0.5 ) * 48.0;
	let ti = floor( t );
	let hA = fract( sin( ( ti - 48.0 * floor( ti / 48.0 ) ) * 91.345 ) * 43758.5453 );
	let hB = fract( sin( ( ti + 1.0 - 48.0 * floor( ( ti + 1.0 ) / 48.0 ) ) * 91.345 ) * 43758.5453 );
	let n = mix( hA, hB, smoothstep( 0.0, 1.0, t - ti ) );
	let fine = pow( n, 5.0 ) * exp( - rq / 0.03 ) * 0.3;
	let glow = exp( rq * -5.0 ) * 0.05 + exp( rq * -40.0 ) * 0.4;
	let burst = spikes + vec3f( fine + glow );

	return light * ( ghosts * offAxis + halo + burst );
}
`})}update(e,t,{aboveWater:n=!0}={}){let r=this.uniforms.fields.sunDir.value.copy(this.sunDir.value||this.sunDir);e.updateMatrixWorld();let i=Os.copy(e.position).addScaledVector(r,1e3).project(e),a=ks.set(0,0,-1).applyQuaternion(e.quaternion).dot(r)>.05;this.sunUV.value.set(i.x*.5+.5,.5-i.y*.5);let o=Math.max(Math.abs(i.x),Math.abs(i.y));this.inView.value=a?f.clamp((1-o)/.1,0,1):0,this.aboveWater.value=+!!n,this.aspect.value=e.aspect,this.dt.value=Math.min(t,.1);let s=this._depthH||1080;this.discPx.value=Math.max(1.5,.004625/Math.tan(f.degToRad(e.fov)*.5)*s*.5)}setDepthHeight(e){this._depthH=e}},Os=new t,ks=new t,As=20,js=10,Ms=400,Ns=224,Ps=`
const MB_TILE: f32 = ${As}.0;
const MB_MAX_TILES_X: i32 = ${Ms};

// uv motion (current - previous) of the pixel at uv with reversed-Z depth d (sky = 0): sky pixels
// reproject their far-plane points with last frame's unjittered camera
fn mbUvVelocity( vel: vec4f, uv: vec2f, d: f32 ) -> vec2f {
	let ndc = ( uv * 2.0 - 1.0 ) * vec2f( 1.0, -1.0 );
	let prev = mbParams.skyReproj * vec4f( ndc, 0.0, 1.0 );
	return select( ( ndc - prev.xy / prev.w ) * vec2f( 0.5, -0.5 ), vel.xy, d > 1e-7 );
}

// uv velocity -> half streak vector in output pixels (shutter applied, capped at one tile)
fn mbToPx( vel: vec2f ) -> vec2f {
	let v = vel * mbParams.outSize * ( mbParams.shutter * 0.5 );
	let l = length( v );
	return v * min( 1.0, MB_TILE / max( l, 1e-6 ) );
}
`,Fs=class{constructor({velocityTexture:e,depthTexture:t,color:n}){this.uniforms=new l(`MotionBlurParams`,{skyReproj:[`mat4x4f`,new C],outSize:[`vec2f`,new p(1,1)],tileCount:[`vec2f`,new p(1,1)],shutter:[`f32`,.5],frameIndex:[`f32`,0]},{label:`motionBlur`});let r=this.uniforms.fields;this.shutter=r.shutter,this.outSize=r.outSize,this.tileCount=r.tileCount,this.frameIndex=r.frameIndex,this.skyReproj=r.skyReproj,this._vp=new C,this._prevVP=new C,this._hasPrev=!1,this.color=n,this.velocityTexture=e,this.depthTexture=t,this.tileMax=new ce({label:`mbTileMax`,count:Ms*Ns,type:`vec4f`}),this.neighborMax=new ce({label:`mbNeighborMax`,count:Ms*Ns,type:`vec4f`}),this._frame=0,this._buildKernels();let i=()=>typeof this.color==`function`?this.color():this.color;this.module=new g({name:`motionBlur`,deps:[F],uniforms:this.uniforms,uniformName:`mbParams`,bindings:{mbVelocity:{texture:()=>this.velocityTexture},mbDepth:{texture:()=>this.depthTexture},mbColor:{texture:i},mbNeighbor:{storage:this.neighborMax,access:`read`}},code:Ps+`
fn mbTexel( uv: vec2f, inSize: vec2f ) -> vec2i { return clamp( vec2i( uv * inSize ), vec2i( 0 ), vec2i( inSize ) - 1 ); }
fn mbSample( uv: vec2f ) -> vec3f { return textureSampleLevel( mbColor, smpLinearClamp, uv, 0.0 ).rgb; }

// Motion-blurred colour at uv. sharpColor = the (sharpened) unblurred colour at uv, returned
// unchanged where nothing moves; the blur itself reads the unsharpened resolved image, so
// sharpening never acts on blurred pixels.
fn mbApply( sharpColor: vec3f, uvIn: vec2f ) -> vec3f {
	var out = sharpColor;
	if ( mbParams.shutter > 0.0 ) {
		let pix = uvIn * mbParams.outSize;
		let tile = clamp( vec2i( floor( pix / MB_TILE ) ), vec2i( 0 ), vec2i( mbParams.tileCount ) - 1 );
		let nm = mbNeighbor[ tile.y * MB_MAX_TILES_X + tile.x ];
		let nmLen = nm.z;
		if ( nmLen >= 0.5 ) {
			let inSize = vec2f( textureDimensions( mbVelocity ) );
			let cX = mbTexel( uvIn, inSize );
			let dX = textureLoad( mbDepth, cX, 0 );
			let vX = mbToPx( mbUvVelocity( textureLoad( mbVelocity, cX, 0 ), uvIn, dX ) );
			let lenX = length( vX );
			// interleaved gradient noise, shifted every frame
			let pn = floor( pix ) + mbParams.frameIndex * 5.588238;
			let jitter = fract( fract( dot( pn, vec2f( 0.06711056, 0.00583715 ) ) ) * 52.9829189 ) - 0.5;
			// sample pairs: ~3 px apart along the streak, 2..6 pairs
			let pairs = i32( clamp( ceil( nmLen / 3.0 ), 2.0, 6.0 ) );
			let invSize = 1.0 / mbParams.outSize;
			var acc = vec3f( 0.0 );
			let fade = sat( nmLen - 0.5 ); // continuous with the early-out below 0.5 px

			if ( nm.w > nmLen * 0.75 ) {
				// fast path: all streaks in the neighbourhood alike (camera rotation, distant scenery):
				// a plain directional average along the pixel's own motion
				for ( var i = 0; i < pairs; i++ ) {
					let tt = ( f32( i ) + 0.5 + jitter ) / f32( pairs );
					let o = vX * tt * invSize;
					acc += mbSample( uvIn + o );
					acc += mbSample( uvIn - o );
				}
				out = mix( sharpColor, acc / ( f32( pairs ) * 2.0 ), fade );
			} else {
				// full reconstruction: soft depth classification of each sample against the centre
				var wSum = 0.0;
				let dirX = select( nm.xy, vX, lenX > 0.5 );
				for ( var i = 0; i < pairs; i++ ) {
					let tt = ( f32( i ) + 0.5 + jitter ) / f32( pairs );
					// alternate between the neighbourhood's dominant direction and the pixel's own (Jimenez 2014)
					let dir = select( nm.xy, dirX, ( i & 1 ) == 1 );
					let off = dir * tt;
					let offLen = length( off );
					for ( var k = 0; k < 2; k++ ) {
						let sgn = select( -1.0, 1.0, k == 0 );
						let uvY = uvIn + off * invSize * sgn;
						let tY = mbTexel( uvY, inSize );
						let dY = textureLoad( mbDepth, tY, 0 );
						let lenY = length( mbToPx( mbUvVelocity( textureLoad( mbVelocity, tY, 0 ), uvY, dY ) ) );
						// reversed-Z depth ~ 1/distance: q > 0 when the sample is farther than the centre
						let q = ( dX - dY ) / max( max( dX, dY ), 1e-12 );
						let behind = sat( q * 40.0 + 0.5 );
						// a sample behind the centre shows through the centre's own streak; one in front
						// covers the centre when its streak reaches it (1 px soft cylinders)
						let spreadX = sat( lenX - max( offLen - 1.0, 0.0 ) );
						let spreadY = sat( lenY - max( offLen - 1.0, 0.0 ) );
						let w = behind * spreadX + ( 1.0 - behind ) * spreadY;
						acc += mbSample( uvY ) * w;
						wSum += w;
					}
				}
				// whatever the samples don't cover is this pixel's own (sharpened) colour
				let n = f32( pairs ) * 2.0;
				let res = acc / n + sharpColor * max( 1.0 - wSum / n, 0.0 );
				out = mix( sharpColor, res, fade );
			}
		}
	}
	return out;
}
`})}_buildKernels(){let e=``;for(let t=64;t>0;t>>=1)e+=`
	if ( t < ${t}u && t + ${t}u < 100u ) {
		let a = mbShared[ t ];
		let b = mbShared[ t + ${t}u ];
		let m = select( a, b, b.z > a.z );
		mbShared[ t ] = vec4f( m.xyz, min( a.w, b.w ) );
	}
	workgroupBarrier();`;let t={mbParams:{uniform:this.uniforms}};this.tileKernel=new j({label:`Motion Blur Tiles`,modules:[F],bindings:{...t,mbVelocity:{texture:()=>this.velocityTexture},mbDepth:{texture:()=>this.depthTexture},mbTileMaxRW:{storage:this.tileMax,access:`read_write`}},workgroupSize:[js,js,1],code:Ps+`
var<workgroup> mbShared: array<vec4f, 100>;
@compute @workgroup_size( WG_X, WG_Y, 1 )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let t = lid.y * ${js}u + lid.x;
	let inSize = vec2i( textureDimensions( mbVelocity ) );
	var best = vec2f( 0.0 ); var bestL = 0.0; var minL = 1e8;
	for ( var k = 0; k < 4; k++ ) {
		let o = vec2u( u32( k & 1 ), u32( k >> 1u ) );
		let p = vec2f( wid.xy * ${As}u + lid.xy * 2u + o ) + 0.5;
		let q = min( vec2i( p / mbParams.outSize * vec2f( inSize ) ), inSize - 1 );
		let v = mbToPx( mbUvVelocity( textureLoad( mbVelocity, q, 0 ), p / mbParams.outSize, textureLoad( mbDepth, q, 0 ) ) );
		let l = dot( v, v );
		if ( l > bestL ) {
			bestL = l;
			best = v;
		}
		minL = min( minL, l );
	}
	mbShared[ t ] = vec4f( best, bestL, minL );
	workgroupBarrier();
${e}
	if ( t == 0u ) {
		let r = mbShared[ 0 ];
		let idx = i32( wid.y ) * MB_MAX_TILES_X + i32( wid.x );
		// xy = longest half streak (px), z = its length, w = shortest length in the tile
		mbTileMaxRW[ idx ] = vec4f( r.xy, sqrt( r.z ), sqrt( r.w ) );
	}
}
`});let n=``;for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++){let r=`m.z > best.z`;if(t!==0&&e!==0){let n=[-t*Math.SQRT1_2,-e*Math.SQRT1_2];r+=` && abs( dot( m.xy, vec2f( ${n[0]}, ${n[1]} ) ) ) > m.z * 0.7`}n+=`
		{
			let x = clamp( tx + ${t}, 0, nx - 1 ); let y = clamp( ty + ${e}, 0, ny - 1 );
			let m = mbTileMaxR[ y * MB_MAX_TILES_X + x ];
			if ( ${r} ) { best = m; }
			minL = min( minL, m.w );
		}`}this.neighborKernel=new j({label:`Motion Blur Neighbourhood`,modules:[F],bindings:{...t,mbTileMaxR:{storage:this.tileMax,access:`read`},mbNeighborRW:{storage:this.neighborMax,access:`read_write`}},workgroupSize:[8,8,1],code:`
const MB_MAX_TILES_X: i32 = ${Ms};
@compute @workgroup_size( WG_X, WG_Y, 1 )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let tx = i32( gid.x ); let ty = i32( gid.y );
	let nx = i32( mbParams.tileCount.x ); let ny = i32( mbParams.tileCount.y );
	if ( tx < nx && ty < ny ) {
		var best = vec4f( 0.0 ); var minL = 1e8;
${n}
		// xy = dominant half streak (px), z = its length, w = shortest streak in the neighbourhood
		mbNeighborRW[ ty * MB_MAX_TILES_X + tx ] = vec4f( best.xyz, minL );
	}
}
`})}updateCamera(e){e.updateMatrixWorld(),e.matrixWorldInverse&&e.matrixWorldInverse.copy(e.matrixWorld).invert(),this._vp.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._hasPrev||this._prevVP.copy(this._vp),this._hasPrev=!0,this.skyReproj.value.copy(this._vp).invert().premultiply(this._prevVP),this._prevVP.copy(this._vp)}compute(e,t){if(this.shutter.value<=0)return;let n=Math.min(Ms,Math.ceil(e/As)),r=Math.min(Ns,Math.ceil(t/As));this.outSize.value.set(e,t),this.tileCount.value.set(n,r),this._frame=(this._frame+1)%64,this.frameIndex.value=this._frame,this.tileKernel.dispatch([n,r,1]),this.neighborKernel.dispatch([Math.ceil(n/8),Math.ceil(r/8),1])}},Is=`
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
`,Ls=[0,0,0,0],Rs=class{constructor(e,{sceneRenderer:n,camera:r,underwater:i,clouds:a=null,sunDir:o=null,haze:s=null}){this.renderer=e,this.camera=r,this.sceneRenderer=n,this.underwater=i,this.scale=1,this.outputTexture=null,this.outputSize=null,this.outputFormat=N.context?N.format:`rgba8unorm`,this.uniforms=new l(`PostParams`,{aoStrength:[`f32`,1],bloom:[`f32`,.05],vignette:[`f32`,.28],saturation:[`f32`,1.06],contrast:[`f32`,1.04],warmth:[`f32`,.02],grain:[`f32`,.012],sharpen:[`f32`,.45]},{label:`post`}),this.params=this.uniforms.fields,this.aeUniforms=new l(`AutoExposureParams`,{enabled:[`f32`,1],refLum:[`f32`,.25],min:[`f32`,.6],max:[`f32`,6],up:[`f32`,1.6],down:[`f32`,1.1]},{label:`autoExposure`}),this.autoExposure={...this.aeUniforms.fields,ref:this.aeUniforms.fields.refLum},this.exposure=new ce({label:`autoExposure`,count:1,type:`f32`,data:new Float32Array([1])});let c=n.sceneRT,u=n.opaqueCopy;this.sceneColor=c.texture,this.opaqueDepth=u.depthTexture,this.finalDepth=c.depthTexture,this.aoDepth=new le(1,1,{colors:[`r16float`],label:`aoDepth`}),this._aoDepthPass=new Je({label:`AO depth`,colorFormats:[`r16float`],bindings:{aoFullDepth:{texture:()=>this.opaqueDepth},aoFinalDepth:{texture:()=>this.finalDepth}},code:`
// negative where the water covers the opaque surface: its AO is never shown (the beauty pass skips
// covered pixels), so GTAO leaves those texels alone; everything else reads the magnitude
fn fragment( in: FSIn ) -> vec4f {
	let s = vec2i( textureDimensions( aoFullDepth ) );
	let p = min( vec2i( in.pos.xy ) * 2, s - 1 );
	let d = textureLoad( aoFullDepth, p, 0 );
	let covered = textureLoad( aoFinalDepth, p, 0 ) > d + 1e-7;
	return vec4f( select( d, - d, covered ), 0.0, 0.0, 1.0 );
}
`}),this.aoPass=new ls(this.aoDepth.texture,r,{samples:12,depthIsColor:!0}),this.aoPass.resolutionScale=.5,this.aoPass.radius.value=2.2,this.aoPass.thickness.value=2,this.aoPass.distanceExponent.value=1.4,this.aoPass.scale.value=1.6,this.aoPass.samples.value=12,this.aoPass.useTemporalFiltering=!0,this.aoBlurX=new le(1,1,{colors:[`r16float`],label:`aoBlurX`}),this.aoBlurY=new le(1,1,{colors:[`r16float`],label:`aoBlurY`});let d=(e,t,n)=>{let r=``;for(let e=-2;e<=2;e++)r+=`
	{
		let uvK = in.uv + vec2f( ${t*e}.0, ${n*e}.0 ) / size;
		let rel = abs( postDepthOpaque( uvK ) - dC ) / max( dC, 1e-7 );
		let w = 1.0 / pow2( rel * 40.0 + 1.0 );
		sum += textureSampleLevel( aoSrc, smpLinearClamp, uvK, 0.0 ).r * w;
		wSum += w;
	}`;return new Je({label:`AO blur `+(t?`x`:`y`),colorFormats:[`r16float`],bindings:{aoSrc:{texture:e},postAODepth:{texture:()=>this.aoDepth.texture}},code:`
fn postDepthOpaque( uv: vec2f ) -> f32 {
	let s = vec2i( textureDimensions( postAODepth ) );
	return abs( textureLoad( postAODepth, clamp( vec2i( floor( uv * vec2f( s ) ) ), vec2i( 0 ), s - 1 ), 0 ).r );
}
fn fragment( in: FSIn ) -> vec4f {
	let size = vec2f( textureDimensions( aoSrc ) );
	let dC = postDepthOpaque( in.uv );
	var sum = 0.0; var wSum = 0.0;
${r}
	return vec4f( sum / wSum, 0.0, 0.0, 1.0 );
}
`})};this._aoBlurXPass=d(()=>this.aoPass.texture,1,0),this._aoBlurYPass=d(()=>this.aoBlurX.texture,0,1),this.medium=new le(1,1,{colors:[`r8unorm`],label:`medium`}),i.mediumTexture=this.medium.texture,this.haze=s,s&&(s.mediumTexture=this.medium.texture),this.beauty=new le(1,1,{colors:[`rgba16float`],label:`beauty`}),this.smaaIn=new le(1,1,{colors:[`rgba16float`],label:`smaaBeforeTAA`}),this.taau=new ys(()=>this.aaMode===`smaataa`?this.smaaIn.texture:this.beauty.texture,this.finalDepth,n.velocityTexture,r,n.waterMaskTexture,this.exposure),this.aaMode=`taa`,this.aa=new ms({src:()=>this.beauty.texture,exposure:this.exposure}),this.motionBlur=new Fs({velocityTexture:n.velocityTexture,depthTexture:c.depthTexture,color:()=>this.taau.output}),this.flare=o?new Ds({depthTexture:c.depthTexture,clouds:a,sunDir:o}):null,this.lens=new bs,this._outW=0,this._outH=0,this._inW=0,this._inH=0,this._prevVP=new C,this._prevCamPos=new t,this._hasPrev=!1,this._size=new p,this._built=!1,this.profiler=null}_build(){this._built=!0;let e=this.underwater,t=this.haze;if(this._mediumPass=new Je({label:`medium`,colorFormats:[`r8unorm`],modules:[e.module],code:`fn fragment( in: FSIn ) -> vec4f { return vec4f( underwaterMedium( in.uv ), 0.0, 0.0, 1.0 ); }`}),this._beautyPass=new Je({label:`beauty (AO + haze + underwater)`,colorFormats:[`rgba16float`],modules:[e.compositeModule,t?t.compositeModule:null].filter(Boolean),defines:t?t._defines():{},bindings:{post:{uniform:this.uniforms},postScene:{texture:()=>this.sceneColor},postOpaqueDepth:{texture:()=>this.opaqueDepth},postFinalDepth:{texture:()=>this.finalDepth},postAO:{texture:()=>this.aoBlurY.texture},postAODepth:{texture:()=>this.aoDepth.texture}},code:`
fn postDepthLoad( uv: vec2f, which: i32 ) -> f32 {
	if ( which == 0 ) {
		let s = vec2i( textureDimensions( postOpaqueDepth ) );
		return textureLoad( postOpaqueDepth, clamp( vec2i( floor( uv * vec2f( s ) ) ), vec2i( 0 ), s - 1 ), 0 );
	}
	let s = vec2i( textureDimensions( postFinalDepth ) );
	return textureLoad( postFinalDepth, clamp( vec2i( floor( uv * vec2f( s ) ) ), vec2i( 0 ), s - 1 ), 0 );
}

fn postColorAO( uv: vec2f ) -> vec3f {
	let c = textureSampleLevel( postScene, smpLinearClamp, uv, 0.0 ).rgb;
	let dO = postDepthLoad( uv, 0 );
	let dF = postDepthLoad( uv, 1 );
	// reversed depth: sky = 0; water in front of the opaque surface has a larger depth value
	let isSky = dO < 1e-7;
	let covered = dF > dO + 1e-7;
	// no AO there (k = 0 below): skip the upsample
	if ( isSky || covered ) { return c; }
	// depth-aware upsample of the half-res AO: the 4 nearest AO texels, weighted by how close
	// their depth is to this pixel's (no dark halos bleeding across depth edges)
	// (the AO texels' depths: the half resolution copy the AO was computed from)
	let aoSizeI = vec2i( textureDimensions( postAO ) );
	let pa = uv * vec2f( aoSizeI ) - 0.5;
	let i0 = floor( pa );
	let fr = pa - i0;
	var aSum = 0.0; var wSum = 1e-4;
	for ( var k = 0; k < 4; k++ ) {
		let o = vec2i( k & 1, k >> 1u );
		let pT = clamp( vec2i( i0 ) + o, vec2i( 0 ), aoSizeI - 1 );
		let dT = abs( textureLoad( postAODepth, pT, 0 ).r );
		let wBil = select( 1.0 - fr.x, fr.x, o.x == 1 ) * select( 1.0 - fr.y, fr.y, o.y == 1 );
		// reversed-Z depth ~ near / z, so the relative depth difference ~ |dT - dO| / dO
		let rel = abs( dT - dO ) / max( dO, 1e-7 );
		let wDepth = 1.0 / pow2( rel * 40.0 + 1.0 );
		let wt = wBil * wDepth + 1e-5;
		aSum += textureLoad( postAO, pT, 0 ).r * wt;
		wSum += wt;
	}
	let a = aSum / wSum;
	// multi-bounce approximation (Jimenez 2016) for a typical outdoor albedo of ~0.35
	let aMB = max( a, ( ( a * 0.382 - 1.036 ) * a + 1.654 ) * a );
	// AO only removes ambient light: full effect where the pixel is lit by the sky alone,
	// a third of it on sunlit surfaces (still grounds objects without dirty halos)
	let ambientOnly = 1.0 - smoothstep( 0.12, 0.9, luminance( c ) );
	let k = select( post.aoStrength * mix( 0.35, 1.0, ambientOnly ), 0.0, isSky || covered );
	return c * mix( 1.0, aMB, k );
}

fn postSceneSample( uv: vec2f ) -> vec3f {
	${t?`return hazeApply( uv, vec4f( postColorAO( uv ), 1.0 ) ).rgb;`:`return postColorAO( uv );`}
}

fn fragment( in: FSIn ) -> vec4f {
	return underwaterComposite( in.uv, in.pos.xy );
}
`}),this.aoPass._pass||this.aoPass._build(),t&&!t._passes&&t._build(),e.renderShafts&&e.shaftPass,this._buildBloom(),this._buildMeter(),this._buildFinal(),this.profiler)for(let[e,t]of this.passes())this.profiler.track(`post `+e,t)}_buildBloom(){let e=e=>new le(1,1,{colors:[`rgba16float`],label:e});this.bloomScales=[.5,.25,.125,.0625,.03125],this.bloomDown=this.bloomScales.map((t,n)=>e(`bloomDown`+(n+1))),this.bloomUp=this.bloomScales.slice(0,4).map((t,n)=>e(`bloomUp`+(n+1)));let t=(e,t)=>new Je({label:`bloom down`,colorFormats:[`rgba16float`],bindings:{bSrc:{texture:e}},code:`
fn bTap( uv: vec2f, texel: vec2f, x: f32, y: f32 ) -> vec3f { return textureSampleLevel( bSrc, smpLinearClamp, uv + texel * vec2f( x, y ), 0.0 ).rgb; }
fn karis( c: vec3f ) -> vec3f { return c / ( luminance( c ) + 1.0 ); }

fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let texel = 1.0 / vec2f( textureDimensions( bSrc ) );
	let a = bTap( uv, texel, -2.0, -2.0 ); let b = bTap( uv, texel, 0.0, -2.0 ); let c = bTap( uv, texel, 2.0, -2.0 );
	let d = bTap( uv, texel, -2.0, 0.0 ); let e = bTap( uv, texel, 0.0, 0.0 ); let f = bTap( uv, texel, 2.0, 0.0 );
	let g = bTap( uv, texel, -2.0, 2.0 ); let h = bTap( uv, texel, 0.0, 2.0 ); let i = bTap( uv, texel, 2.0, 2.0 );
	let j = bTap( uv, texel, -1.0, -1.0 ); let k = bTap( uv, texel, 1.0, -1.0 ); let l = bTap( uv, texel, -1.0, 1.0 ); let m = bTap( uv, texel, 1.0, 1.0 );
${t?`
	// weighted groups of four (Karis average) suppress fireflies
	let g0 = karis( ( j + k + l + m ) * 0.25 ) * 0.5;
	let g1 = karis( ( a + b + d + e ) * 0.25 ) * 0.125;
	let g2 = karis( ( b + c + e + f ) * 0.25 ) * 0.125;
	let g3 = karis( ( d + e + g + h ) * 0.25 ) * 0.125;
	let g4 = karis( ( e + f + h + i ) * 0.25 ) * 0.125;
	let s = g0 + g1 + g2 + g3 + g4;
	// undo the Karis tonemap on the result
	return vec4f( s / max( 1.0 - luminance( s ), 0.02 ), 1.0 );`:`
	let s = e * 0.125 + ( a + c + g + i ) * 0.03125 + ( b + d + f + h ) * 0.0625 + ( j + k + l + m ) * 0.125;
	return vec4f( s, 1.0 );`}
}
`}),n=(e,t)=>new Je({label:`bloom up`,colorFormats:[`rgba16float`],bindings:{bSrc:{texture:e},bBase:{texture:t}},code:`
fn bTap( uv: vec2f, texel: vec2f, x: f32, y: f32 ) -> vec3f { return textureSampleLevel( bSrc, smpLinearClamp, uv + texel * vec2f( x, y ), 0.0 ).rgb; }
fn karis( c: vec3f ) -> vec3f { return c / ( luminance( c ) + 1.0 ); }

fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let texel = 1.0 / vec2f( textureDimensions( bSrc ) );
	let s = ( bTap( uv, texel, 0.0, 0.0 ) * 4.0
		+ ( bTap( uv, texel, -1.0, 0.0 ) + bTap( uv, texel, 1.0, 0.0 ) + bTap( uv, texel, 0.0, -1.0 ) + bTap( uv, texel, 0.0, 1.0 ) ) * 2.0
		+ ( bTap( uv, texel, -1.0, -1.0 ) + bTap( uv, texel, 1.0, -1.0 ) + bTap( uv, texel, -1.0, 1.0 ) + bTap( uv, texel, 1.0, 1.0 ) ) ) / 16.0;
	return vec4f( textureSampleLevel( bBase, smpLinearClamp, uv, 0.0 ).rgb + s, 1.0 );
}
`}),r=this.bloomDown,i=this.bloomUp;this._bloomPasses=[[t(()=>this.taau.texture,!0),r[0]],[t(()=>r[0].texture,!1),r[1]],[t(()=>r[1].texture,!1),r[2]],[t(()=>r[2].texture,!1),r[3]],[t(()=>r[3].texture,!1),r[4]],[n(()=>r[4].texture,()=>r[3].texture),i[3]],[n(()=>i[3].texture,()=>r[2].texture),i[2]],[n(()=>i[2].texture,()=>r[1].texture),i[1]],[n(()=>i[1].texture,()=>r[0].texture),i[0]]],this.bloomTex=i[0],this.half=r[0],this.meterRT=r[3]}_buildMeter(){let e=``;for(let t=128;t>0;t>>=1)e+=`
	if ( t < ${t}u ) {
		sumL[ t ] += sumL[ t + ${t}u ];
		sumW[ t ] += sumW[ t + ${t}u ];
	}
	workgroupBarrier();`;this.meterKernel=new j({label:`Auto Exposure`,modules:[F],bindings:{ae:{uniform:this.aeUniforms},aeTex:{texture:()=>this.meterRT.texture},aeExposure:{storage:this.exposure,access:`read_write`}},workgroupSize:[256,1,1],code:`
var<workgroup> sumL: array<f32, 256>;
var<workgroup> sumW: array<f32, 256>;
@compute @workgroup_size( WG_X, 1, 1 )
fn main( @builtin( local_invocation_id ) lid: vec3u ) {
	let t = lid.x;
	let size = textureDimensions( aeTex );
	let n = size.x * size.y;
	var accL = 0.0; var accW = 0.0;
	for ( var i = 0u; i < 160u; i++ ) {
		let idx = t + i * 256u;
		if ( idx < n ) {
			let x = idx % size.x; let y = idx / size.x;
			let c = textureLoad( aeTex, vec2i( i32( x ), i32( y ) ), 0 ).rgb;
			let l = log2( max( luminance( c ), 1e-4 ) );
			let uvc = vec2f( ( f32( x ) + 0.5 ) / f32( size.x ), ( f32( y ) + 0.5 ) / f32( size.y ) ) - 0.5;
			let w = max( 1.0 - length( uvc * vec2f( 1.0, 1.4 ) ) * 1.2, 0.15 );
			accL += l * w;
			accW += w;
		}
	}
	sumL[ t ] = accL;
	sumW[ t ] = accW;
	workgroupBarrier();
${e}
	if ( t == 0u ) {
		let avg = exp2( sumL[ 0 ] / max( sumW[ 0 ], 1e-4 ) );
		// the eye only partly compensates: dark scenes stay darker (dusk and night must not
		// look like day), and at night at most one extra stop
		let ratio = ae.refLum / avg;
		let partial = select( ratio, pow( ratio, 0.8 ), ratio > 1.0 );
		let tgt = clamp( partial, ae.min, mix( ae.max, 2.0, frame.night ) );
		let cur = aeExposure[ 0 ];
		let rate = select( ae.down, ae.up, tgt > cur );
		let k = 1.0 - exp( - frame.dt * rate );
		let next = exp2( mix( log2( max( cur, 1e-3 ) ), log2( tgt ), k ) );
		aeExposure[ 0 ] = select( 1.0, next, ae.enabled > 0.5 );
	}
}
`})}_buildFinal(){let e=[F,this.motionBlur.module,this.lens.module];this.flare&&e.push(this.flare.module),this._finalPass=new Je({label:`final (grade + tonemap)`,colorFormats:[this.outputFormat],modules:e,bindings:{post:{uniform:this.uniforms},postResolved:{texture:()=>this.taau.output},postBloom:{texture:()=>this.bloomTex.texture},postHalf:{texture:()=>this.half.texture},postExposure:{storage:this.exposure,access:`read`}},code:Is+`
fn tm( c: vec3f ) -> vec3f { return c / ( max( c.r, max( c.g, c.b ) ) + 1.0 ); }
fn loadResolved( p: vec2i ) -> vec3f { return textureLoad( postResolved, p, 0 ).rgb; }

// RCAS (AMD FSR1 robust contrast-adaptive sharpening) on the resolved image: TAA converges to a
// slightly soft image, RCAS restores the detail without halos (the lobe is limited by local
// contrast). Done on a tonemapped proxy of the HDR values and inverted afterwards.
fn rcas( uvIn: vec2f ) -> vec3f {
	let size = vec2i( textureDimensions( postResolved ) );
	let pc = clamp( vec2i( uvIn * vec2f( size ) ), vec2i( 1 ), size - 2 );
	let e = tm( loadResolved( pc ) );
	let b = tm( loadResolved( pc + vec2i( 0, -1 ) ) ); let d = tm( loadResolved( pc + vec2i( -1, 0 ) ) );
	let f = tm( loadResolved( pc + vec2i( 1, 0 ) ) ); let h = tm( loadResolved( pc + vec2i( 0, 1 ) ) );
	let mn4 = min( min( b, d ), min( f, h ) );
	let mx4 = max( max( b, d ), max( f, h ) );
	let hitMin = min( mn4, e ) / ( mx4 * 4.0 + 1e-5 );
	let hitMax = ( vec3f( 1.0 ) - max( mx4, e ) ) / ( mn4 * 4.0 - 4.0 );
	let lobeRGB = max( - hitMin, hitMax );
	// the sky (depth 0) is only sharpened lightly: clouds and cirrus are soft by nature, and the lobe
	// turned their sampling noise into fine grain (mbDepth: the scene depth, bound by the blur module)
	let dS = textureLoad( mbDepth, clamp( vec2i( uvIn * vec2f( textureDimensions( mbDepth ) ) ), vec2i( 0 ), vec2i( textureDimensions( mbDepth ) ) - 1 ), 0 );
	let skyK = select( 1.0, 0.3, dS < 1e-7 );
	let lobe = max( -0.1875, min( max( lobeRGB.r, max( lobeRGB.g, lobeRGB.b ) ), 0.0 ) ) * post.sharpen * skyK;
	let r = max( ( ( b + d + f + h ) * lobe + e ) / ( lobe * 4.0 + 1.0 ), vec3f( 0.0 ) );
	// back to HDR (inverse of the max-channel Reinhard)
	return r / max( 1.0 - max( r.r, max( r.g, r.b ) ), 1e-3 );
}

// integer hash (per pixel and frame) -> [0, 1)
fn postHash( p: vec2u, f: u32 ) -> f32 {
	var x = p.x * 1664525u + p.y * 1013904223u + f * 2654435761u;
	x ^= x >> 16u; x *= 0x7feb352du; x ^= x >> 15u; x *= 0x846ca68bu; x ^= x >> 16u;
	return f32( x >> 8u ) / 16777216.0;
}

fn bloomAt( uv: vec2f ) -> vec3f { return textureSampleLevel( postBloom, smpLinearClamp, uv, 0.0 ).rgb * post.bloom; }

fn lensSharp( uv: vec2f ) -> vec3f {
	var c = mbApply( rcas( uv ), uv ) + bloomAt( uv );
${this.flare?`	c += flareLight( uv );`:``}
	return c;
}
fn lensBlurred( uv: vec2f ) -> vec3f { return textureSampleLevel( postHalf, smpLinearClamp, uv, 0.0 ).rgb + bloomAt( uv ); }

fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	var c = lensDroplets( uv ) * postExposure[ 0 ];
	// white balance nudge + saturation + contrast around mid grey (in linear HDR)
	c = c * vec3f( 1.0 + post.warmth, 1.0, 1.0 - post.warmth );
	let l = luminance( c );
	c = mix( vec3f( l ), c, post.saturation );
	c = pow( max( c, vec3f( 0.0 ) ) / 0.18, vec3f( post.contrast ) ) * 0.18;
	// vignette (elliptical, soft)
	let dv = ( uv - 0.5 ) * vec2f( 1.0, 0.8 );
	let v = 1.0 - smoothstep( 0.25, 0.75, length( dv ) ) * post.vignette;
	c = c * v;
	// fine film grain (luminance-weighted): triangular white noise on the real pixel grid, new every
	// frame (a fixed pattern on a fixed grid showed as diagonal hatching in dark gradients)
	let px = vec2u( in.pos.xy );
	let fi = frame.frameIndex;
	let n = ( postHash( px, fi ) + postHash( px + vec2u( 7919u, 104729u ), fi ) - 1.0 ) * 0.5;
	c = c + c * ( n * post.grain );
	// renderOutput: ACES filmic tone mapping with the exposure, sRGB transfer
	let t = acesFilmicToneMapping( c, frame.exposure );
	// +-1 LSB triangular dither before the 8-bit output: no banding in the sky gradients
	let dq = ( postHash( px + vec2u( 31337u, 271u ), fi ) + postHash( px + vec2u( 1013u, 65537u ), fi ) - 1.0 ) / 255.0;
	return vec4f( linearToSrgb( t ) + vec3f( dq ), 1.0 );
}
`})}_outputSize(){if(this.outputSize)return this.outputSize;let e=this.renderer;return e&&e.width?{width:e.width,height:e.height}:N.canvas?{width:N.canvas.width,height:N.canvas.height}:{width:1,height:1}}_resize(){let{width:e,height:t}=this._outputSize(),n=Math.max(1,Math.round(e*this.scale)),r=Math.max(1,Math.round(t*this.scale));if(e===this._outW&&t===this._outH&&n===this._inW&&r===this._inH)return;this._outW=e,this._outH=t,this._inW=n,this._inH=r,this.sceneRenderer.setSize(n,r),this.beauty.setSize(n,r),this.smaaIn.setSize(n,r),this.medium.setSize(n,r),this.underwater.setSize&&this.underwater.setSize(n,r),this.aoPass.resolutionScale=.5*this.scale,this.aoPass.setSize(e,t);let i=Math.round(e*.5*this.scale),a=Math.round(t*.5*this.scale);this.aoDepth.setSize(i,a),this.aoBlurX.setSize(i,a),this.aoBlurY.setSize(i,a),this.haze&&this.haze.setSize(e,t),this.taau.setSize(e,t),this.bloomDown&&(this.bloomScales.forEach((n,r)=>this.bloomDown[r].setSize(Math.round(e*n),Math.round(t*n))),this.bloomScales.slice(0,4).forEach((n,r)=>this.bloomUp[r].setSize(Math.round(e*n),Math.round(t*n)))),this.flare&&this.flare.setDepthHeight(r),this.lens.aspect.value=e/t}setScale(e){e!==this.scale&&(this.scale=e,this.sceneRenderer.scale=e,this.haze&&this.haze.setScale(e))}setBloom(e){this.params.bloom.value=e}internalSize(e=new p){return e.set(this._inW,this._inH)}beginFrame(){this._built||(this._build(),this._outW=0),this._resize();let e=this.camera;e.updateMatrixWorld(),e.matrixWorldInverse&&e.matrixWorldInverse.copy(e.matrixWorld).invert(),this.motionBlur.updateCamera(e),this.taau.advance();let[t,n]=this.aaMode===`taa`||this.aaMode===`smaataa`?this.taau.jitter():[0,0];a(e,this._inW,this._inH,{jitterX:-t,jitterY:n,prevViewProj:this._hasPrev?this._prevVP:null,prevCameraPos:this._hasPrev?this._prevCamPos:null});let r=b.fields;r.outputResolution.value.set(this._outW,this._outH),this._prevVP.copy(r.viewProjNoJitter.value),this._prevCamPos.copy(r.cameraPos.value),this._hasPrev=!0}render(){if(this._built||this.beginFrame(),this._timers,this.motionBlur.compute(this._outW,this._outH),this._aoDepthPass.render({colorViews:[this.aoDepth.texture],clear:Ls}),this.aoPass.render(),this._aoBlurXPass.render({colorViews:[this.aoBlurX.texture],clear:Ls}),this._aoBlurYPass.render({colorViews:[this.aoBlurY.texture],clear:Ls}),h.waterEnabled.value>.5&&this._mediumPass.render({colorViews:[this.medium.texture],clear:Ls}),this.underwater.renderShafts&&this.underwater.renderShafts(h.waterEnabled.value>.5&&this.camera.position.y<h.cameraWaterHeight.value+.35+1),this.haze&&h.atmosphereQuality.value>0&&(this.haze.update(),this.haze.render()),this._beautyPass.render({colorViews:[this.beauty.texture],clear:Ls}),this.aaMode===`taa`||this.aaMode===`smaataa`)this.aaMode===`smaataa`&&this.aa.render(`smaa`,this.smaaIn.texture),this.taau.render();else{let e=this.taau,t=1-e._cur;this.aa.render(this.aaMode,e.history[t].textures[0]),e._cur=t,e._needsRestart=!0}for(let[e,t]of this._bloomPasses)e.render({colorViews:[t.texture],clear:Ls});let e=this.outputTexture?this.outputTexture.view({dimension:`2d`,mipLevelCount:1}):N.context.getCurrentTexture().createView();this._finalPass.render({colorViews:[e],clear:Ls}),this.meterKernel.dispatch([1,1,1])}endFrame(){this.taau.clearViewOffset(),this.taau.endFrame()}passes(){let e=[[`motion blur tiles`,this.motionBlur.tileKernel],[`motion blur neighbours`,this.motionBlur.neighborKernel],[`GTAO`,this.aoPass._pass],[`AO blur x`,this._aoBlurXPass],[`AO blur y`,this._aoBlurYPass],[`medium`,this._mediumPass]];return this.haze&&this.haze._passes&&(e.push([`haze march`,this.haze._passes.march],[`haze sun mask`,this.haze._passes.mask]),this.haze._passes.blur.forEach((t,n)=>e.push([`haze god rays `+n,t]))),this.underwater._shaftPass&&e.push([`underwater shafts`,this.underwater._shaftPass]),e.push([`beauty`,this._beautyPass],[`TAAU`,this.taau._resolve[0]],[`TAAU `,this.taau._resolve[1]]),this.taau._tiledResolve&&this.taau._tiledResolve.forEach((t,n)=>e.push([`TAAU tiled `+n,t])),this._bloomPasses.forEach(([t],n)=>e.push([`bloom `+n,t])),e.push([`final`,this._finalPass],[`auto exposure`,this.meterKernel]),this.flare&&e.push([`flare visibility`,this.flare.kernel]),e}},zs=[0,0,0,0],Bs=16,Vs=2500,Hs=900,Us=6e4,Ws=8,Gs=[.9,.97,1],Ks=3.5,qs={sigma:15e-5,H:110},Js={sigma:32e-6,H:1400},Ys=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},Xs=new g({name:`haze-shadow-hard`,deps:[Be],code:`
fn sunShadowHard( P: vec3f ) -> f32 {
	if ( shadowParams.enabled < 0.5 ) { return 1.0; }
	let dist = dot( P - frame.cameraPos, - vec3f( frame.view[ 0 ][ 2 ], frame.view[ 1 ][ 2 ], frame.view[ 2 ][ 2 ] ) );
	let c = shadowCascadeOf( dist );
	if ( c < 0 ) { return 1.0; }
	let sc = shadowParams.matrices[ c ] * vec4f( P, 1.0 );
	let uvz = vec3f( sc.x * 0.5 + 0.5, 0.5 - sc.y * 0.5, sc.z );
	if ( any( uvz.xy < vec2f( 0.0 ) ) || any( uvz.xy > vec2f( 1.0 ) ) || uvz.z > 1.0 ) { return 1.0; }
	return select( 1.0, 0.0, _shadowDepth( uvz.xy, c ) < uvz.z - 2e-5 );
}
`}),Zs=class{constructor({depthTexture:e,underwater:t,atmosphere:n,sky:r=null,clouds:i=null,terrain:a=null,csm:o=null,flatExterior:s=!1}){this.depthTexture=e,this.uw=t,this.atmosphere=n,this.sky=r,this.clouds=i,this.terrain=a,this.csm=o,this.flatExterior=s,this.uniforms=new l(`HazeParams`,{density:[`f32`,1.6],shafts:[`f32`,1],enabled:[`f32`,1],frame:[`f32`,0],sunUV:[`vec2f`,new p(.5,.5)],ssFade:[`f32`,0],hasMedium:[`f32`,0],histValid:[`f32`,0]},{label:`haze`});let c=this.uniforms.fields;this.density=c.density,this.shafts=c.shafts,this.enabled=c.enabled,this.frame=c.frame,this.sunUV=c.sunUV,this.ssFade=c.ssFade,this.mediumTexture=null,this.low=new le(1,1,{colors:[`rgba16float`],label:`hazeShafts`}),this.hist=[0,1].map(e=>new le(1,1,{colors:[`rgba16float`],label:`hazeShaftsHistory`+e})),this._hc=0,this._histValid=!1,this.ssTargets=[0,1,2,3].map(e=>new le(1,1,{colors:[`r16float`],label:`hazeSS`+e})),this.ssShafts=this.ssTargets[3],this.godRays=!0,this.scale=1,this._module=null,this._passes=null}setScale(e){this.scale=e}setSize(e,t){let n=this.scale*Math.sqrt(this.qualityLevel||1);this.low.setSize(Math.round(e*.5*n),Math.round(t*.5*n));for(let r of this.hist)r.setSize(Math.round(e*.5*n),Math.round(t*.5*n));this._histValid=!1;for(let r of this.ssTargets)r.setSize(Math.round(e*.25*n),Math.round(t*.25*n))}update(){this.frame.value=(this.frame.value+1)%1024;let e=this.uw.camWorld.value.elements,t=h.sunDir.value,n=this.uw.proj.value,r=e[0]*t.x+e[1]*t.y+e[2]*t.z,i=e[4]*t.x+e[5]*t.y+e[6]*t.z,a=e[8]*t.x+e[9]*t.y+e[10]*t.z,o=f.smoothstep,s=0;if(a<-.02){let e=.5+.5*(r/-a)*n.x,c=.5-.5*(i/-a)*n.y;this.sunUV.value.set(e,c),s=(1-o(Math.max(Math.abs(e-.5),Math.abs(c-.5)),.6,1.15))*o(-a,.02,.25)*(1-o(t.y,.3,.75))}(h.cameraUnderwater.value>.5||this.enabled.value<.5||this.shafts.value<=0||!this.godRays)&&(s=0),this.ssFade.value=s,this.uniforms.fields.hasMedium.value=this.mediumTexture&&h.waterEnabled.value>.5?1:0}render(){this._passes||this._build();let e=this._passes;e.march.render({colorViews:[this.low.texture],clear:zs});let t=this.enabled.value>.5&&this.shafts.value>0;if(this.uniforms.fields.histValid.value=this._histValid&&t?1:0,e.temporal[this._hc].render({colorViews:[this.hist[1-this._hc].texture],clear:zs}),this._hc=1-this._hc,this._histValid=t,this.ssFade.value>.001){e.mask.render({colorViews:[this.ssTargets[0].texture],clear:zs});for(let t=0;t<3;t++)e.blur[t].render({colorViews:[this.ssTargets[t+1].texture],clear:zs})}}_deps(){let e=Be.code.includes(`fn sunShadowHard`)?Be:Xs;return[F,this.uw.module,this.atmosphere&&this.atmosphere.module,this.sky&&this.sky.module,this.clouds&&this.clouds.module,this.terrain&&this.terrain.module,e]}_defines(){return{HZ_CLOUDS:this.clouds&&this.clouds.module?1:0,HZ_TERRAIN:this.terrain&&this.terrain.module?1:0,HZ_MOON:this.sky&&this.sky.module?1:0}}get module(){return this._module||=new g({name:`haze`,deps:this._deps(),uniforms:this.uniforms,uniformName:`hazeParams`,bindings:{hazeDepth:{texture:()=>this.depthTexture}},code:`
const HZ_MARINE_SIGMA: f32 = ${Ys(qs.sigma)};
const HZ_MARINE_H: f32 = ${Ys(qs.H)};
const HZ_AEROSOL_SIGMA: f32 = ${Ys(Js.sigma)};
const HZ_AEROSOL_H: f32 = ${Ys(Js.H)};
const HZ_FAR_CLAMP: f32 = ${Ys(Us)};
const HZ_NEAR: f32 = ${Ys(Hs)};

// optical depth of one exponential layer from height hc along a ray with direction y component
// vy over distance d
fn hazeLayerDepth( sigma: f32, H: f32, hc: f32, vy: f32, d: f32 ) -> f32 {
	let base = exp( hc / - H ) * sigma;
	let k = vy * d / H;
	let fk = select( H * ( 1.0 - exp( - k ) ) / vy, d, abs( k ) < 1e-3 );
	return base * fk;
}

// unshadowed in-scatter depth of both layers from height hc along a ray (direction y component vy)
// over distance d: 1 - their transmittance
fn hazeInScatter( hc: f32, vy: f32, d: f32 ) -> f32 {
	return 1.0 - exp( - ( hazeLayerDepth( HZ_MARINE_SIGMA, HZ_MARINE_H, hc, vy, d ) + hazeLayerDepth( HZ_AEROSOL_SIGMA, HZ_AEROSOL_H, hc, vy, d ) ) * hazeParams.density );
}

// Cornette-Shanks (strong forward lobe) plus a little isotropic scattering
// (a softer lobe than coastal aerosol's ~0.76: toward the sun the haze glared over everything
// in front of it and washed distant foliage out to white)
fn hazePhase( cosT: f32 ) -> f32 {
	let g = 0.62; let g2 = g * g;
	let cs = 3.0 * ( 1.0 - g2 ) / ( 8.0 * PI * ( 2.0 + g2 ) ) * ( cosT * cosT + 1.0 ) / pow( max( 1.0 + g2 - cosT * 2.0 * g, 1e-4 ), 1.5 );
	return cs * 0.7 + 0.3 / ( 4.0 * PI );
}

struct HazeRay { dist: f32, dir: vec3f, sky: bool, rayLen: f32 };

// view distance of the pixel (reversed-Z depth, sky = 0) and its world direction
fn hazeRay( uv: vec2f ) -> HazeRay {
	let size = vec2f( textureDimensions( hazeDepth ) );
	let d = textureLoad( hazeDepth, vec2i( clamp( uv, vec2f( 0.0 ), vec2f( 0.9999 ) ) * size ), 0 );
	let ray = underwaterViewRay( uv );
	var r: HazeRay;
	r.rayLen = length( ray );
	r.sky = d < 1e-7;
	r.dist = select( min( - underwaterViewZ( max( d, 1e-9 ) ) * r.rayLen, HZ_FAR_CLAMP ), HZ_FAR_CLAMP, r.sky );
	r.dir = normalize( ( underwaterParams.camWorld * vec4f( ray, 0.0 ) ).xyz );
	return r;
}

// the march's hill shadow: terrainSunShadowAt with one filtered fetch instead of four loads (the
// texture is half float, filterable; the materials keep the loads: they are short of samplers)
fn hazeTerrainSun( P: vec3f ) -> f32 {
#if HZ_TERRAIN
	let s = textureSampleLevel( terrainSunShadowTex, smpLinearClamp, terrainUvOf( P.xz ), 0.0 );
	let w = s.y * 0.012 + 0.35;
	return mix( 1.0, smoothstep( -w, w, P.y - s.x ), terrainParams.sunBaked );
#else
	return 1.0;
#endif
}

// the march's sun visibility after the shadow map (hills, clouds), only where light is left
fn hazeVisibilityRest( P: vec3f, v0: f32 ) -> f32 {
	var v = v0;
#if HZ_TERRAIN
	if ( v > 0.0 ) { v *= hazeTerrainSun( P ); }
#endif
#if HZ_CLOUDS
	if ( v > 0.0 ) {
		let L = frame.sunDir;
		let g = P.xz - L.xz * ( max( P.y, 0.0 ) / max( L.y, 0.08 ) );
		v *= cloudsShadow( g );
	}
#endif
	return v;
}

// sun visibility at world position P: shadow cascades, hills, clouds
fn hazeVisibility( P: vec3f ) -> f32 {
	// (each lookup only where the ones before left some light)
	var v = sunShadowHard( P );
#if HZ_TERRAIN
	if ( v > 0.0 ) { v *= terrainSunShadowAt( P ); }
#endif
#if HZ_CLOUDS
	if ( v > 0.0 ) {
		// the cloud shadow map is the ground's shadow along the key light: follow the light down
		let L = frame.sunDir;
		let g = P.xz - L.xz * ( max( P.y, 0.0 ) / max( L.y, 0.08 ) );
		v *= cloudsShadow( g );
	}
#endif
	return v;
}

`}),this._module}get compositeModule(){return this._compositeModule||=new g({name:`haze-composite`,deps:[this.module],bindings:{hazeLow:{texture:()=>this.hist[this._hc].texture},hazeSS:{texture:()=>this.ssShafts.texture},hazeMedium:{texture:()=>this.mediumTexture||this.low.texture}},code:`
// c: the scene colour at uv. Returns the hazed colour.
//   geometry: c T + (1 - T) fog (1 - fSun (1 - h)) + (1 - h) E p(θ) lit - h fSun fog (all - lit)
//   sky:      c - fSun fog (all - lit)
// fog: sky radiance just above the horizon in the view direction; fSun: its sunlit share (phase
// weighted); lit / all: shadowed / unshadowed in-scatter depth from the march; h: 0 near the
// camera (explicit, shadowed sun single scattering: bright shafts) -> 1 far away and for the sky
// (only the shadowed share of the sky-coloured haze is removed: consistent with the sky)
fn hazeApply( uv: vec2f, c: vec4f ) -> vec4f {
	var out = c.rgb;
	${this.flatExterior?`var backdropBlend = 1.0;`:``}
	let isActive = frame.atmosphereQuality > 0.0 && hazeParams.enabled > 0.5 && frame.cameraUnderwater < 0.5;
	if ( isActive ) {
		var inAir = 1.0;
		if ( hazeParams.hasMedium > 0.5 ) {
			let ms = vec2i( textureDimensions( hazeMedium ) );
			inAir = select( 1.0, 0.0, textureLoad( hazeMedium, clamp( vec2i( uv * vec2f( ms ) ), vec2i( 0 ), ms - 1 ), 0 ).r > 0.5 );
		}
		if ( inAir > 0.5 ) {
			let R = hazeRay( uv );
			let dist = R.dist; let dir = R.dir; let sky = R.sky;
			${this.flatExterior?`if (sky) { backdropBlend = smoothstep(0.025, 0.06, dir.y); if (backdropBlend <= 0.0) { return c; } }`:``}
			let camH = max( underwaterParams.camPos.y - frame.seaLevel, 0.0 );

			// the haze looks like the sky just above the horizon in this direction
			let vh = normalize( vec3f( dir.x, max( dir.y, 0.02 ), dir.z ) );
			var fog = atmosphereSkyLuminance( vh );
#if HZ_MOON
			fog += skyMoonSky( vh );
#endif

			// sun (moon) light scattered toward the eye, and its share of the haze radiance
			let Ep = frame.sunColor * hazePhase( dot( dir, frame.sunDir ) );
			let eL = luminance( Ep );
			let fSun = eL / ( eL + luminance( frame.skyIrradiance ) + 1e-5 ) * min( hazeParams.shafts, 1.0 );
			let h = select( smoothstep( 0.0, HZ_NEAR, dist ), 1.0, sky );

			// ---- aerial perspective / marine haze on geometry (the water surface included)
			if ( ! sky ) {
				let tau = ( hazeLayerDepth( HZ_MARINE_SIGMA, HZ_MARINE_H, camH, dir.y, dist ) + hazeLayerDepth( HZ_AEROSOL_SIGMA, HZ_AEROSOL_H, camH, dir.y, dist ) ) * hazeParams.density;
				let T = exp( - tau );
				out = out * T + fog * ( 1.0 - T ) * ( 1.0 - fSun * ( 1.0 - h ) );
			}

			// ---- sun shafts: depth-aware upsample of the half resolution march
			if ( hazeParams.shafts > 0.0 ) {
				let ls = vec2i( textureDimensions( hazeLow ) );
				let pa = uv * vec2f( ls ) - 0.5;
				let i0 = floor( pa );
				let fr = pa - i0;
				var acc = vec2f( 0.0 );
				var wSum = 1e-6;
				for ( var k = 0; k < 4; k++ ) {
					let o = vec2i( k & 1, k >> 1u );
					let s = textureLoad( hazeLow, clamp( vec2i( i0 ) + o, vec2i( 0 ), ls - 1 ), 0 );
					let wb = select( 1.0 - fr.x, fr.x, o.x == 1 ) * select( 1.0 - fr.y, fr.y, o.y == 1 );
					let rel = abs( s.z - dist ) / max( dist, 0.5 );
					let wd = 1.0 / pow2( rel * 10.0 + 1.0 );
					let wt = wb * wd + 1e-5;
					acc += s.xy * wt;
					wSum += wt;
				}
				// The upsample carries the lit share of the in-scatter and the march's ratio to the exact
				// in-scatter; the exact in-scatter is then taken over this pixel's own ray. Upsampling the
				// in-scatter itself gave a thin frond in front of the low sun, whose half resolution
				// neighbours all lie far behind it, their long rays' in-scatter: bright, flickering specks.
				let sh = acc / wSum;
				let all = sh.y * hazeInScatter( camH, dir.y, min( dist, ${Ys(Vs)} ) );
				let lit = sat( sh.x ) * all;
				let near = Ep * lit * ( 1.0 - h ) * hazeParams.shafts;
				let deficit = fog * fSun * ( all - lit ) * h;
				out = max( out + near - deficit, vec3f( 0.0 ) );
			}

			// ---- screen-space god rays: sun colour x phase x the near air's haze depth
			if ( hazeParams.ssFade > 0.001 ) {
				let rays = textureSampleLevel( hazeSS, smpLinearClamp, uv, 0.0 ).r;
				let k = 1.0 - exp( - HZ_MARINE_SIGMA * 300.0 * hazeParams.density );
				out += Ep * rays * k * hazeParams.shafts * hazeParams.ssFade * ${Ys(Ks)};
			}
		}
	}
	return vec4f( ${this.flatExterior?`mix(c.rgb, out, backdropBlend)`:`out`}, c.a );
}
`}),this._compositeModule}_build(){let e=this.module,t=this._defines(),n=new Je({label:`haze march`,modules:[e],defines:t,colorFormats:[`rgba16float`],code:`
fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let R = hazeRay( uv );
	var out = vec4f( 0.0, 0.0, R.dist, 1.0 );
	${this.flatExterior?`if (R.sky && R.dir.y <= 0.025) { return out; }`:``}
	if ( hazeParams.enabled > 0.5 && frame.cameraUnderwater < 0.5 && hazeParams.shafts > 0.0 ) {
		let cam = underwaterParams.camPos;
		let tMax = min( R.dist, ${Ys(Vs)} );
		// interleaved gradient noise, decorrelated per frame (golden ratio sequence)
		let jitter = fract( interleavedGradientNoise( in.pos.xy ) + hazeParams.frame * 0.61803398875 );
		let sigM = HZ_MARINE_SIGMA * hazeParams.density;
		let sigA = HZ_AEROSOL_SIGMA * hazeParams.density;
		var lit = 0.0; var all = 0.0; var tau = 0.0; var tPrev = 0.0;
		// the ray in each cascade's light space is linear in t: its end points, once
		let fwd = - vec3f( frame.view[ 0 ][ 2 ], frame.view[ 1 ][ 2 ], frame.view[ 2 ][ 2 ] );
		var sc0: array<vec4f, 4>; var scd: array<vec4f, 4>;
		for ( var c = 0; c < i32( shadowParams.count ); c++ ) {
			sc0[ c ] = shadowParams.matrices[ c ] * vec4f( cam, 1.0 );
			scd[ c ] = shadowParams.matrices[ c ] * vec4f( R.dir, 0.0 );
		}
		for ( var i = 0; i < ${Bs}; i++ ) {
			// quadratic spacing: dense near the camera (palm and pier shafts), sparse far out (clouds, hills)
			let u = ( f32( i ) + jitter ) / ${Ys(Bs)};
			let t = u * u * tMax;
			let dt = u * ${Ys(2/Bs)} * tMax;
			let P = cam + R.dir * t;
			let h = max( P.y - frame.seaLevel, 0.0 );
			let sig = exp( h / - HZ_MARINE_H ) * sigM + exp( h / - HZ_AEROSOL_H ) * sigA;
			tau += sig * ( t - tPrev );
			tPrev = t;
			let Tr = exp( - tau );
			let w = sig * Tr * dt;
			// sunShadowHard( P ) with the hoisted light-space ray
			var v = 1.0;
			if ( shadowParams.enabled > 0.5 ) {
				let c = shadowCascadeOf( dot( P - frame.cameraPos, fwd ) );
				if ( c >= 0 ) {
					let sc = sc0[ c ] + scd[ c ] * t;
					let suv = vec2f( sc.x * 0.5 + 0.5, 0.5 - sc.y * 0.5 );
					if ( ! ( any( suv <= vec2f( 0.0 ) ) || any( suv >= vec2f( 1.0 ) ) || sc.z > 1.0 ) ) {
						v = select( 0.0, 1.0, sc.z - 2e-5 <= _shadowDepth( suv, c ) );
					}
				}
			}
			lit += w * hazeVisibilityRest( P, v );
			all += w;
		}
		// The lit share of the in-scatter (0..1) and the ratio of the marched in-scatter to its exact
		// value over this ray: both smooth across depth edges, unlike the in-scatter itself, which
		// grows with the distance (see the composite)
		let exact = hazeInScatter( max( cam.y - frame.seaLevel, 0.0 ), R.dir.y, tMax );
		out = vec4f( lit / max( all, 1e-12 ), all / max( exact, 1e-12 ), R.dist, 1.0 );
	}
	return out;
}
`}),r=new Je({label:`haze sun mask`,modules:[e],defines:t,colorFormats:[`r16float`],code:`
fn fragment( in: FSIn ) -> vec4f {
	var out = vec4f( 0.0 );
	if ( hazeParams.ssFade > 0.001 ) {
		let uv = in.uv;
		let dir = underwaterWorldDir( uv );
		${this.flatExterior?`if (dir.y <= 0.025) { return out; }`:``}
#if HZ_CLOUDS
		let cloudT = cloudsSunTransmittance( cloudsSampleView( dir ).a );
#else
		let cloudT = 1.0;
#endif
		let size = vec2f( textureDimensions( hazeDepth ) );
		let d = textureLoad( hazeDepth, vec2i( clamp( uv, vec2f( 0.0 ), vec2f( 0.9999 ) ) * size ), 0 );
		let c = dot( dir, frame.sunDir );
		let glow = exp( ( c - 1.0 ) * 600.0 ) + exp( ( c - 1.0 ) * 50.0 ) * 0.25;
		out = vec4f( select( 0.0, glow * cloudT, d < 1e-7 ), 0.0, 0.0, 1.0 );
	}
	return out;
}
`}),i=[0,1,2].map(t=>{let n=.95/Ws**+t,r=Gs[t],i=``,a=0;for(let e=0;e<Ws;e++){let t=r**+e;i+=`\t\tacc += textureSampleLevel( hzSrc, smpLinearClamp, uv + step * ( ${Ys(e)} + jit ), 0.0 ).r * ${Ys(t)};\n`,a+=t}return new Je({label:`haze god rays `+t,modules:[e],bindings:{hzSrc:{texture:()=>this.ssTargets[t].texture}},colorFormats:[`r16float`],code:`
fn fragment( in: FSIn ) -> vec4f {
	var out = vec4f( 0.0 );
	if ( hazeParams.ssFade > 0.001 ) {
		let uv = in.uv;
		let step = ( hazeParams.sunUV - uv ) * ${Ys(n/Ws)};
		// taps shifted by a per pixel, per frame fraction of a step: the fixed taps drew hard radial
		// streaks through cloud gaps and foliage; jittered, the temporal resolve blends them
		// (centred on 0: the average over frames keeps the fixed taps' result)
		let jit = fract( interleavedGradientNoise( in.pos.xy ) + hazeParams.frame * 0.61803398875 + ${Ys(t*.37)} ) - 0.5;
		var acc = 0.0;
${i}
		out = vec4f( acc / ${Ys(a)}, 0.0, 0.0, 1.0 );
	}
	return out;
}
`})}),a=[0,1].map(n=>new Je({label:`haze shafts temporal`,modules:[e],defines:t,bindings:{hzCur:{texture:()=>this.low.texture},hzPrev:{texture:()=>this.hist[n].texture}},colorFormats:[`rgba16float`],code:`
fn fragment( in: FSIn ) -> vec4f {
	let size = vec2i( textureDimensions( hzCur ) );
	let p = vec2i( in.pos.xy );
	let cur = textureLoad( hzCur, p, 0 );
	var out = cur;
	if ( hazeParams.histValid > 0.5 ) {
		var lo = cur.xy; var hi = cur.xy;
		for ( var k = 0; k < 9; k++ ) {
			let s = textureLoad( hzCur, clamp( p + vec2i( k % 3 - 1, k / 3 - 1 ), vec2i( 0 ), size - 1 ), 0 ).xy;
			lo = min( lo, s ); hi = max( hi, s );
		}
		let R = hazeRay( in.uv );
		let world = underwaterParams.camPos + R.dir * cur.z;
		let clip = frame.prevViewProjNoJitter * vec4f( world, 1.0 );
		if ( clip.w > 1e-4 ) {
			let puv = clip.xy / clip.w * vec2f( 0.5, -0.5 ) + 0.5;
			if ( all( puv >= vec2f( 0.0 ) ) && all( puv <= vec2f( 1.0 ) ) ) {
				let prev = textureSampleLevel( hzPrev, smpLinearClamp, puv, 0.0 );
				let expect = length( world - frame.prevCameraPos );
				if ( abs( prev.z - expect ) < expect * 0.05 + 0.3 ) {
					out = vec4f( mix( clamp( prev.xy, lo, hi ), cur.xy, 0.12 ), cur.z, 1.0 );
				}
			}
		}
	}
	return out;
}
`}));this._passes={march:n,mask:r,blur:i,temporal:a}}},Qs=class{constructor(e,n,r){this.camera=e,this.dom=n,this.input=r,this.yaw=0,this.pitch=0,this.speed=8,this.enabled=!0,this.velocity=new t,this._fwd=new t,this._right=new t}setPose(e,t,n){this.camera.position.copy(e),this.yaw=t,this.pitch=n,this.apply()}apply(){this.camera.rotation.set(this.pitch,this.yaw,0,`YXZ`)}update(e){if(!this.enabled)return;let n=this.input,r=n.consumeLook();this.yaw-=r.x*.0022,this.pitch-=r.y*.0022,this.pitch=Math.max(-1.55,Math.min(1.55,this.pitch)),this.apply();let i=n.down(`ShiftLeft`)||n.down(`ShiftRight`),a=this.speed*(i?6:1);this.camera.getWorldDirection(this._fwd),this._right.crossVectors(this._fwd,this.camera.up).normalize();let o=new t;n.down(`KeyW`)&&o.add(this._fwd),n.down(`KeyS`)&&o.sub(this._fwd),n.down(`KeyD`)&&o.add(this._right),n.down(`KeyA`)&&o.sub(this._right),(n.down(`KeyE`)||n.down(`Space`))&&(o.y+=1),(n.down(`KeyQ`)||n.down(`KeyC`))&&--o.y,o.lengthSq()>0&&o.normalize().multiplyScalar(a),this.velocity.lerp(o,1-Math.exp(-e*8)),this.camera.position.addScaledVector(this.velocity,e)}},$s={x:Y.helmX,z:Y.seatZ},ec=1.62,tc=ec*.1,nc=.3,rc=1.75,ic=1.35,ac=1.1,oc=new t,sc=new t,cc=new t,lc=new t,uc=new r,dc=new e(0,0,0,`YXZ`),fc=new t(0,1,0),pc=new r,mc=new r,hc=new r,gc=new t,_c=.24,vc=.36,yc=.75,bc=class{constructor({camera:e,input:n,terrain:r,colliders:i,query:a,boat:o,reef:s=null,audio:c=null,world:l=re}){this.camera=e,this.input=n,this.terrain=r,this.colliders=i,this.query=a,this.boat=o,this.reef=s,this.audio=c,this.mode=`walk`,this.camMode=`third`;let u=l.start||l.spawn;this.position=new t().copy(u.position),this.position.y=Math.max(r.heightAt(this.position.x,this.position.z),i?i.groundHeightAt(this.position.x,this.position.z,50):-1/0),this.velocity=new t,this.yaw=u.yaw,this.pitch=-.05,this.grounded=!1,this.bob=0,this.stepDist=0,this.waterH=0,this.waterMean=null,this.wade=0,this.camOff=0,this.camOffV=0,this._camY=null,this.floating=!0,this.slot=a.allocate(`player`,1),this.prompt=null,this.surface=`sand`,this.orbitYaw=0,this.orbitPitch=.22,this.orbitDist=13,this.helmYaw=0,this.helmPitch=-.05,this.camPos=new t,this.camInit=!1,this.wasUnder=!1,this.deckPos=new t,this.deckVel=new t,this.deckYaw=0,this.deckGrounded=!0,this._ashore=null,this._ashoreT=0,this.busy=!1}getViewDir(e){return e.set(0,0,-1).applyQuaternion(this.camera.quaternion)}waterHeight(){let e=this.query;if(!e.cpuValid)return 0;let t=e.cpu[this.slot*4];return Number.isFinite(t)?t:this.waterH||0}groundAt(e,t,n){let r=this.terrain.heightAt(e,t),i=this.colliders.groundHeightAt(e,t,n);return i>r&&(r=i),this.reef&&this.reef.floorHeightAt&&(r=Math.max(r,this.reef.floorHeightAt(e,t))),r}nearBoat(){if(!this.boat)return!1;let e=this.boat.toWorld(this.boat.model.boardPoint,oc),t=Math.hypot(e.x-this.position.x,e.z-this.position.z),n=Math.abs(e.y-this.position.y);return t<4.2&&n<3.2}update(e){let t=this.input;if(this.query.setPoint(this.slot,this.position.x,this.position.z),this.waterH=this.waterHeight(),this.waterMean=this.waterMean===null?this.waterH:this.waterMean+(this.waterH-this.waterMean)*(1-Math.exp(-e/4)),this.prompt=null,this.mode===`boat`){this.updateBoat(e);return}if(this.mode===`deck`){this.updateDeck(e);return}let n=t.consumeLook();if(this.yaw-=n.x*.0022,this.pitch=f.clamp(this.pitch-n.y*.0022,-1.5,1.5),this.nearBoat()&&!this.busy&&(this.prompt={key:`E`,text:`Board boat`},t.hit(`KeyE`))){this.boardBoat();return}let r=this.mode;this.mode===`walk`?this.updateWalk(e):this.updateSwim(e);let i=this.position.clone();this.mode===`walk`?i.y+=ec+Math.sin(this.bob)*.035*(1-.6*this.wade):i.y+=tc,this._camY===null||this.camera.position.y!==this._camY?(this.camOff=0,this.camOffV=0):this.mode!==r&&(this.camOff=this._camY-i.y);let a=Math.exp(-6*e),o=(this.camOffV+6*this.camOff)*e;this.camOff=(this.camOff+o)*a,this.camOffV=(this.camOffV-6*o)*a,i.y+=this.camOff,this.camera.position.copy(i),this._camY=this.camera.position.y,this.camera.quaternion.setFromEuler(dc.set(this.pitch,this.yaw,0))}updateWalk(e){let n=this.input;cc.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),lc.set(-cc.z,0,cc.x);let r=new t;n.down(`KeyW`)&&r.add(cc),n.down(`KeyS`)&&r.sub(cc),n.down(`KeyD`)&&r.add(lc),n.down(`KeyA`)&&r.sub(lc),r.lengthSq()>0&&r.normalize();let i=this.waterH-this.position.y,a=f.clamp(i/1.2,0,1);this.wade=a;let o=n.down(`ShiftLeft`)||n.down(`ShiftRight`),s=(o?6.2:3)*f.lerp(1,.42,a),c=this.grounded?14:2.5,l=1-Math.exp(-c*e);this.velocity.x+=(r.x*s-this.velocity.x)*l,this.velocity.z+=(r.z*s-this.velocity.z)*l,this.grounded&&n.hit(`Space`)&&i<.9&&(this.velocity.y=4.6,this.grounded=!1),this.velocity.y-=9.81*e,i>0&&this.velocity.multiplyScalar(Math.exp(-e*i*.8));let u=this.position,d=u.clone();u.addScaledVector(this.velocity,e),this.colliders.resolveCapsule(u,nc,rc,.4);let p=this.groundAt(u.x,u.z,u.y+.45);u.y<=p?(u.y=p,this.velocity.y<0&&(this.velocity.y=0),this.grounded=!0):this.grounded=u.y-p<.06;let m=Math.hypot(u.x-d.x,u.z-d.z);if(this.grounded){this.bob+=m*2.4,this.stepDist+=m;let e=o?.9:.62;this.stepDist>e&&(this.stepDist=0,this.surface=this.surfaceType(i),this.audio&&this.audio.footstep(this.surface))}if(this.waterMean-u.y>ic){let e=this.grounded;this.mode=`swim`,e&&(u.y=Math.max(u.y,this.waterH-tc+.1)),this.velocity.y=e?0:Math.max(this.velocity.y*.3,-2.5),this.audio&&this.audio.splash(e?.2:.5,u)}}surfaceType(e){let t=this.position;if(e>.12)return`water`;if(this.colliders.groundHeightAt(t.x,t.z,t.y+.1)>this.terrain.heightAt(t.x,t.z)+.05)return`wood`;let n=this.terrain.heightAt(t.x,t.z);return n<.6?`wetsand`:n>3.6?`grass`:`sand`}updateSwim(e){let n=this.input,r=this.position,i=this.waterH;cc.set(0,0,-1).applyEuler(dc.set(this.pitch,this.yaw,0)),lc.set(-Math.cos(this.yaw),0,Math.sin(this.yaw)).negate();let a=new t;n.down(`KeyW`)&&a.add(cc),n.down(`KeyS`)&&a.sub(cc),n.down(`KeyD`)&&a.add(lc),n.down(`KeyA`)&&a.sub(lc),n.down(`Space`)&&(a.y+=1),(n.down(`KeyC`)||n.down(`ControlLeft`))&&--a.y,a.lengthSq()>0&&a.normalize(),this.floating&&r.y>i-.45&&a.y>-.25&&!n.down(`KeyC`)&&(a.y=Math.max(a.y,0));let o=n.down(`ShiftLeft`)||n.down(`ShiftRight`)?2.5:1.5,s=1-Math.exp(-e*3);this.velocity.lerp(a.multiplyScalar(o),s);let c=i-tc+.1;n.down(`KeyC`)||n.down(`KeyW`)&&this.pitch<-.35||a.y<-.1?this.floating=!1:r.y>c-.15&&(this.floating=!0),this.floating&&(r.y+=(c-r.y)*(1-Math.exp(-e*5)),this.velocity.y>0&&(this.velocity.y*=.5)),r.addScaledVector(this.velocity,e),r.y=Math.min(r.y,i+.05),this.colliders.resolveCapsule(r,nc,1,0);let l=this.groundAt(r.x,r.z,r.y+.3);r.y<l+.25&&(r.y=l+.25),this.stepDist+=this.velocity.length()*e,this.stepDist>1.3&&(this.stepDist=0,this.audio&&this.audio.swimStroke());let u=this.camera.position.y<i-.05;if(u!==this.wasUnder&&this.audio&&(u?this.audio.submerge():this.audio.emerge()),this.wasUnder=u,this.waterMean-l<ac&&(this.mode=`walk`,r.y=l,this.velocity.set(this.velocity.x,0,this.velocity.z)),this.colliders.boxes){for(let t of this.colliders.boxes)if(t.tag===`ladder`&&Math.hypot(t.center.x-r.x,t.center.z-r.z)<1.1){if(this.prompt={key:`Space`,text:`Climb ladder`},n.down(`Space`)||n.down(`KeyW`)){let n=this.colliders.groundHeightAt(t.center.x,t.center.z,10);if(n>r.y&&(r.y+=e*1.6,r.y>n-1)){let e=re.pier.deckHeight;r.set(t.center.x-Math.sign(t.center.x-re.pier.x)*1.2,e,t.center.z),this.mode=`walk`,this.velocity.set(0,0,0)}}break}}}boardBoat(){let e=this.boat;this.mode=`deck`,this.deckPos.copy(e.model.boardPoint),this.deckVel.set(0,0,0),this.deckYaw=this.yaw-(e.getYaw()+Math.PI),this.deckGrounded=!0,this._ashore=null,this._ashoreT=0,this.velocity.set(0,0,0),this._camY=null,this.deckToWorld()}takeHelm(){this.mode=`boat`,this.boat.driven=!0,this.boat.moored=!1,this.helmYaw=0,this.helmPitch=-.05,this.orbitYaw=this.boat.getYaw()+Math.PI,this.camInit=!1,this.audio&&this.audio.engineStart()}leaveHelm(){let e=this.boat;e.driven=!1,e.throttle=0,this.mode=`deck`,this.deckPos.set($s.x+.45,e.model.lines.deckY,$s.z-.1),this.deckVel.set(0,0,0),this.deckYaw=this.helmYaw,this.pitch=this.helmPitch,this.deckGrounded=!0,this._camY=null,this.audio&&this.audio.engineStop(),this.deckToWorld()}enterBoat(){this.boardBoat(),this.takeHelm()}exitBoat(e=null,n=0){let r=this.boat,i=r.driven;r.driven=!1,r.throttle=0;let a=n?null:this.ashoreTarget(),o=re.boatDock.position;if(r.position.distanceTo(o)<14&&r.speed<1.5&&(r.moored=!0,r.mooring.anchor.set(r.position.x,0,r.position.z),r.mooring.heading=r.getYaw()),e&&(a=e),a)this.position.set(a.out.x,a.g,a.out.z),this.mode=`walk`;else{let e=r.toWorld(new t(2.2*(n||1),0,0),new t);this.waterH=this.waterMean=r.position.y,this.position.set(e.x,r.position.y-.2,e.z),this.mode=`swim`,this.audio&&this.audio.splash(.8,this.position)}this.velocity.set(0,0,0),this.yaw=r.getYaw()+Math.PI,this._camY=null,this.audio&&i&&this.audio.engineStop()}ashoreTarget(){let e=this.boat,n=this.query.cpuValid?this.query.cpu[0]:0,r=sc.set(1,0,0).applyQuaternion(e.quaternion).setY(0).normalize(),i=r.x,a=r.z,o=null,s=1/0;for(let r of e.model.exitPoints){let c=e.toWorld(r,new t),l=Math.sign(r.x)||1;for(let e of[.9,1.4,2]){let u=new t(c.x+i*l*e,c.y,c.z+a*l*e),d=this.groundAt(u.x,u.z,c.y+2.5),f=d-c.y;if(f>1.7||f<-1.2||d<n-.3)continue;let p=Math.abs(f)+e*.2;p<s&&(s=p,o={out:u,g:d,ep:r})}}return o}deckBase(e){let t=this.boat;return pc.setFromAxisAngle(fc,t.getYaw()+Math.PI),mc.copy(t.quaternion).multiply(hc.setFromAxisAngle(fc,Math.PI)),e.slerpQuaternions(mc,pc,.55)}deckToWorld(){let e=this.boat;e.toWorld(this.deckPos,this.position),this.yaw=e.getYaw()+Math.PI+this.deckYaw}deckGroundAt(e,t,n){let r=this.boat.model.lines.deckY;for(let i of this.boat.model.colliders){if(!i.walkable||Math.abs(e-i.center.x)>i.half.x||Math.abs(t-i.center.z)>i.half.z)continue;let a=i.center.y+i.half.y;a<=n&&a>r&&(r=a)}return r}updateDeck(e){let t=this.input,n=this.boat,r=n.model.lines,i=t.consumeLook();this.deckYaw-=i.x*.0022,this.pitch=f.clamp(this.pitch-i.y*.0022,-1.5,1.5);let a=Math.sin(this.deckYaw),o=Math.cos(this.deckYaw);cc.set(a,0,o),lc.set(-o,0,a),gc.set(0,0,0),t.down(`KeyW`)&&gc.add(cc),t.down(`KeyS`)&&gc.sub(cc),t.down(`KeyD`)&&gc.add(lc),t.down(`KeyA`)&&gc.sub(lc),gc.lengthSq()>0&&gc.normalize();let s=t.down(`ShiftLeft`)?2.6:1.6,c=1-Math.exp(-12*e),l=this.deckVel;l.x+=(gc.x*s-l.x)*c,l.z+=(gc.z*s-l.z)*c,this.deckGrounded&&t.hit(`Space`)&&(l.y=3.2,this.deckGrounded=!1),l.y-=9.81*e;let u=this.deckPos,d=u.x,p=u.z;u.addScaledVector(l,e);for(let e=0;e<2;e++)for(let e of n.model.colliders){if(!e.solid)continue;let t=e.center.y+e.half.y,n=e.center.y-e.half.y;if(t<=u.y+vc||n>=u.y+rc)continue;let r=e.half.x+_c,i=e.half.z+_c,a=u.x-e.center.x,o=u.z-e.center.z;if(Math.abs(a)>=r||Math.abs(o)>=i)continue;let s=r-Math.abs(a),c=i-Math.abs(o);s<c?(u.x+=Math.sign(a||d-e.center.x||1)*s,l.x=0):(u.z+=Math.sign(o||p-e.center.z||1)*c,l.z=0)}u.z=f.clamp(u.z,r.zAft+r.shell+_c,4);let m=Math.max(.15,r.halfBreadth(r.tAtSheerZ(u.z),Math.max(u.y,r.deckY))-r.shell-_c);u.x=f.clamp(u.x,-m,m);let h=this.deckGroundAt(u.x,u.z,u.y+vc);u.y<=h?(u.y=h,l.y<0&&(l.y=0),this.deckGrounded=!0):this.deckGrounded=u.y-h<.04;let g=Math.hypot(u.x-d,u.z-p);this.deckGrounded&&(this.bob+=g*2.4,this.stepDist+=g,this.stepDist>.6&&(this.stepDist=0,this.audio&&this.audio.footstep(`wood`))),this.deckToWorld();let _=$s.x,v=$s.z,y=Math.hypot(u.x-_,u.z-v)<yc&&!this.busy;if(this._ashoreT-=e,this._ashoreT<=0&&(this._ashoreT=.25,this._ashore=n.speed<2.5?this.ashoreTarget():null),y){if(this.prompt={key:`E`,text:`Take the helm`},t.hit(`KeyE`)){this.takeHelm();return}}else if(!this.busy){let e=this._ashore&&this._ashore.ep,r=n.model.exitPoints.some(e=>Math.hypot(u.x-e.x,u.z-e.z)<1.3);if(e&&Math.hypot(u.x-e.x,u.z-e.z)<1.3){if(this.prompt={key:`E`,text:`Step ashore`},t.hit(`KeyE`)){this.exitBoat(this._ashore);return}}else if(r&&(this.prompt={key:`E`,text:`Jump overboard`},t.hit(`KeyE`))){this.exitBoat(null,Math.sign(u.x)||1);return}}let b=oc.set(u.x,u.y+ec+Math.sin(this.bob)*.02,u.z);n.toWorld(b,this.camera.position),this._camY=this.camera.position.y,this.deckBase(uc),this.camera.quaternion.copy(uc).multiply(pc.setFromEuler(dc.set(this.pitch,this.deckYaw,0)))}updateBoat(e){let n=this.input,i=this.boat,a=n.consumeLook(),o=n.consumeWheel();if(n.hit(`KeyV`)&&(this.camMode=this.camMode===`first`?`third`:`first`),n.hit(`KeyE`)){this.leaveHelm();return}let s=0;n.down(`KeyW`)&&(s=n.down(`ShiftLeft`)?1:.7),n.down(`KeyS`)&&(s=-.6);let c=0;if(n.down(`KeyA`)&&(c+=1),n.down(`KeyD`)&&--c,i.setInput(s,c,e),this.prompt={key:`E`,text:`Leave helm   ·   V  camera`},i.toWorld(i.model.helmEye,this.position),this.position.y-=ec,this.camMode===`first`){this.helmYaw=f.clamp(this.helmYaw-a.x*.0022,-2.2,2.2),this.helmPitch=f.clamp(this.helmPitch-a.y*.0022,-1.2,1);let e=i.toWorld(i.model.helmEye,new t);this.camera.position.copy(e);let n=i.quaternion,o=new r().setFromAxisAngle(new t(0,1,0),i.getYaw()+Math.PI),s=new r().slerpQuaternions(n.clone().multiply(new r().setFromAxisAngle(new t(0,1,0),Math.PI)),o,.55),c=new r().setFromEuler(dc.set(this.helmPitch,this.helmYaw,0));this.camera.quaternion.copy(s).multiply(c)}else{if(this.orbitYaw-=a.x*.003,this.orbitPitch=f.clamp(this.orbitPitch+a.y*.003,-.05,1.2),this.orbitDist=f.clamp(this.orbitDist*(1+o*.08),6,40),i.speed>2&&Math.abs(a.x)<.5){let t=i.getYaw()+Math.PI-this.orbitYaw;t=Math.atan2(Math.sin(t),Math.cos(t)),this.orbitYaw+=t*(1-Math.exp(-e*.8))}let n=i.toWorld(new t(0,1.4,0),new t),r=new t(Math.sin(this.orbitYaw)*Math.cos(this.orbitPitch),Math.sin(this.orbitPitch),Math.cos(this.orbitYaw)*Math.cos(this.orbitPitch)).multiplyScalar(this.orbitDist),s=n.clone().add(r);s.y=Math.max(s.y,this.waterH+.7),this.camInit||=(this.camPos.copy(s),!0),this.camPos.lerp(s,1-Math.exp(-e*6)),this.camera.position.copy(this.camPos),this.camera.lookAt(n)}}},Z={minHeight:1.8,villageRadius:100,villagePalms:10,pathClear:12,path:{x:re.pier.x,z0:-130,z1:-40},spawnClear:5,obstacleClear:2,boardwalk:[[55,-65],[54.6,-72],[52.4,-82],[48.4,-92],[44.8,-100.5],[42.6,-107.2]],boardwalkWidth:1.8};function xc(){let e=ee(),t=e.image.width,n=e.image.data;return(e,r,i)=>{let a=e*t-.5,o=r*t-.5,s=Math.floor(a),c=Math.floor(o),l=a-s,u=o-c,d=(s%t+t)%t,f=(c%t+t)%t,p=(d+1)%t,m=(f+1)%t,h=n[(f*t+d)*4+i],g=n[(f*t+p)*4+i],_=n[(m*t+d)*4+i],v=n[(m*t+p)*4+i];return((h*(1-l)+g*l)*(1-u)+(_*(1-l)+v*l)*u)/255}}var Sc=(e,t,n)=>[e*Math.cos(n)-t*Math.sin(n),e*Math.sin(n)+t*Math.cos(n)],Cc=class{constructor(e,{seed:n=1234,footprints:r=[],paths:i=null}={}){this.terrain=e,this.noise=new te(n),this.noise2=new te(n*7+3),this.n=new t,this.village=re.village.center,this.spawn=re.spawn.position,this.detail=xc(),this.hasVillage=r.length>0,this.setObstacles(r,i??[{points:Z.boardwalk,width:Z.boardwalkWidth}])}setObstacles(e,t){this.footprints=e.map(e=>({x:e.x,z:e.z,r:e.r})),this.segments=[];for(let e of t){let t=e.points;for(let n=0;n<t.length-1;n++)this.segments.push([t[n][0],t[n][1],t[n+1][0],t[n+1][1],(e.width??1.8)*.5])}let n=this.obstacleBounds={x0:1/0,z0:1/0,x1:-1/0,z1:-1/0},r=(e,t,r)=>{n.x0=Math.min(n.x0,e-r),n.x1=Math.max(n.x1,e+r),n.z0=Math.min(n.z0,t-r),n.z1=Math.max(n.z1,t+r)};for(let e of this.footprints)r(e.x,e.z,e.r);for(let e of this.segments)r(e[0],e[1],e[4]),r(e[2],e[3],e[4])}obstacleDist(e,t){let n=this.obstacleBounds;if(e<n.x0-25||e>n.x1+25||t<n.z0-25||t>n.z1+25)return 1e9;let r=1e9;for(let n of this.footprints)r=Math.min(r,Math.hypot(e-n.x,t-n.z)-n.r);for(let[n,i,a,o,s]of this.segments){let c=a-n,l=o-i,u=c*c+l*l||1,d=ie(((e-n)*c+(t-i)*l)/u,0,1);r=Math.min(r,Math.hypot(e-n-c*d,t-i-l*d)-s)}return r}height(e,t){return this.terrain.heightAt(e,t)}_mask(e,t,n,r=1){let i=this.terrain,a=(t-i.origin)/i.texel-.5,o=(n-i.origin)/i.texel-.5;if(a<0||o<0||a>=i.res-1||o>=i.res-1)return 0;let s=Math.floor(a),c=Math.floor(o),l=a-s,u=o-c,d=c*i.res+s;return((e[d]*(1-l)+e[d+1]*l)*(1-u)+(e[d+i.res]*(1-l)+e[d+i.res+1]*l)*u)*r}rock(e,t){return this._mask(this.terrain.rock,e,t)}normalY(e,t){return this.terrain.normalAt(e,t,this.n).y}villageDist(e,t){return Math.hypot(e-this.village.x,t-this.village.z)}pathDist(e,t){let n=Z.path,r=ie(t,n.z0,n.z1);return Math.hypot(e-n.x,t-r)}spawnDist(e,t){return Math.hypot(e-this.spawn.x,t-this.spawn.z)}inBay(e,t){return Math.abs(e-10)<235&&t>-245&&t<-30}cover(e,t,n={}){let r=this.terrain,i=this.height(e,t),a=this.normalY(e,t),o=1-a,[s,c]=Sc(e,t,.7),[l,u]=Sc(e,t,2.1),d=this.detail(s/173,c/173,3),f=this.detail(l/47,u/47,3),p=d*.6+f*.4,m=this._mask(r.gully,e,t,1/255)*M(-.5,.5,i),h=ie(M(9,24,i+(p-.5)*18)+M(.18,.36,o)+m*.6,0,1),g=this.rock(e,t);return n.h=i,n.ny=a,n.slope=o,n.macro=p,n.mA=d,n.mB=f,n.gully=m,n.forest=h,n.rock=g,n.bare=Math.max(g*1.4,M(.42,.55,o)),n.sand=this._mask(r.sand,e,t,1/255),n.path=this._mask(r.path,e,t,1/255),n.scarp=r.scarp?this._mask(r.scarp,e,t,1/255):0,n}allowed(e,t,n,{minH:r=Z.minHeight,maxBare:i=.35,clear:a=0,big:o=!1,maxSand:s=.5,maxPath:c=.3}={}){return!(n.h<r||n.bare>i||n.sand>s||n.path>c||n.scarp>.3||this.spawnDist(e,t)<Z.spawnClear+a||this.pathDist(e,t)<(o?Z.pathClear:Z.pathClear*.5)||this.obstacleDist(e,t)<Z.obstacleClear+a||this.terrain.pathDistance&&this.terrain.pathDistance(e,t)<.6+a*.5)}groundY(e,t,n){let r=this.height(e,t);return n>0&&(r=Math.min(r,this.height(e+n,t),this.height(e-n,t),this.height(e,t+n),this.height(e,t-n))),r}downhill(e,t){this.terrain.normalAt(e,t,this.n);let n=Math.hypot(this.n.x,this.n.z);return n>1e-4?[this.n.x/n,this.n.z/n]:[0,1]}},wc=class{constructor(e=4){this.cell=e,this.map=new Map}_key(e,t){return(e+32768)*65536+(t+32768)}add(e,t,n,r){let i=this._key(Math.floor(e/this.cell),Math.floor(t/this.cell)),a=this.map.get(i);a||this.map.set(i,a=[]),a.push(e,t,n,r)}free(e,t,n,r=1){let i=n+8,a=this.cell,o=Math.floor((e-i)/a),s=Math.floor((e+i)/a),c=Math.floor((t-i)/a),l=Math.floor((t+i)/a);for(let i=c;i<=l;i++)for(let a=o;a<=s;a++){let o=this.map.get(this._key(a,i));if(o)for(let i=0;i<o.length;i+=4){let a=o[i]-e,s=o[i+1]-t,c=(o[i+2]+n)*r;if(a*a+s*s<c*c)return!1}}return!0}},Tc={PALM:1,TREE:2,BANANA:3,SHRUB:4,YOUNG:5,FERN:6,BROAD:7};function Ec(e,t,n,r,i,a,o){for(let s=n;s<i;s+=a)for(let n=t;n<r;n+=a)o(n+e()*a,s+e()*a)}var Dc=null;function Oc(e,t,n,r=!1){let i=Dc;if(n.h<2.3||n.h>80||n.bare>.45||n.path>.3)return 0;let a=i.villageDist(e,t),o=M(Z.villageRadius+5,Z.villageRadius+40,a);return o<=0?0:o*(1-.6*(M(18,55,n.h)*(1-n.gully))+.5*n.gully)*(r?1:1-M(.35,.7,n.sand))*(1-M(.25,.45,n.rock))}function kc(e,t=99){Dc=e;let n=A(t),r=new wc(4),i=new wc(6),a=e.noise,o=e.noise2,s={palms:[],trees:[],bananas:[],shrubs:[],youngPalms:[],ferns:[],monsteras:[],elephantEars:[],heliconias:[],strelitzias:[]},c=Math.PI*2,l={},u=-660,d=-900;Ec(n,u,d,660,320,4.6,(t,u)=>{if(e.cover(t,u,l),l.h<3)return;let d=a.fbm(t/60,u/60,3)*.6+o.fbm(t/17,u/17,2)*.4,f=l.forest>.5?.9:M(.15,.5,l.forest)*.38*M(-.25,.2,d)+.008;if(u>-20&&(f=l.forest>.5?.45*M(-.2,.2,d):f),l.forest<=.5&&(f+=Oc(t,u,l)*(.9*M(-.2,.2,d)+.1)),n()>f||!e.allowed(t,u,l,{minH:3,maxBare:.3,clear:5,big:!0}))return;let p=(l.forest>.5&&n()<.3?.55+n()*.2:.8+n()*.5)*(l.forest>.5?1:.85)*(n()<.08?1.3:1),m=.78+n()*.34+(n()<.1?.25:0),h=2.5*p;if(!i.free(t,u,h,1))return;i.add(t,u,h,Tc.TREE),r.add(t,u,.5*p,Tc.TREE);let g=n()*c;s.trees.push({x:t,y:e.groundY(t,u,.6)-.15,z:u,s:p,sy:m,yaw:g,la:g,l:m,H:12.5*p*m,seed:n()})});let f=(t,r,i)=>{let[a,o]=e.downhill(t,r),s=a*.35,l=1+o*.35,u=Math.atan2(l,s)+(n()-.5)*1.1,d=(.1+.32*(1-M(2.3,5.5,i)))*(.55+.75*n()),f=.85+n()*.32,p=(7+n()*6.5)*(.9+.2*f);return{x:t,y:e.groundY(t,r,.35)-.05,z:r,s:f,yaw:n()*c,la:u,l:d,H:p,seed:n()}};Ec(n,-240,-230,250,-40,3.4,(t,c)=>{if(!e.inBay(t,c)||e.villageDist(t,c)<Z.villageRadius)return;e.cover(t,c,l);let u=a.fbm(t/48,c/48,3)+.4*o.fbm(t/17,c/17,2),d=M(1.95,2.35,l.h)*(1-M(5.2,7.2,l.h)),p=.5*M(-.28,.22,u)*d;n()>p||!e.allowed(t,c,l,{minH:2,maxBare:.2,clear:3,big:!0,maxSand:1.01,maxPath:.5})||l.ny<.9||r.free(t,c,1.95,1)&&i.free(t,c,1.5,1)&&(r.add(t,c,1.95,Tc.PALM),s.palms.push(f(t,c,l.h)))});let p=[];Ec(n,-70,-220,150,-60,3.5,(t,r)=>{if(e.villageDist(t,r)>=Z.villageRadius||!e.hasVillage&&r<-106||(e.cover(t,r,l),l.h<2.05||l.h>14||l.bare>.2||l.ny<.9)||e.pathDist(t,r)<Z.pathClear||e.spawnDist(t,r)<Z.spawnClear+3)return;let i=e.obstacleDist(t,r);if(i<3.5)return;let a=e.hasVillage?M(4.5,6,i)*(1-M(10,16,i)):0,o=M(2,2.3,l.h)*(1-M(3.6,4.4,l.h));p.push({x:t,z:r,h:l.h,r:n()*(.25+Math.max(a,o))})}),p.sort((e,t)=>t.r-e.r);let m=0;for(let e of p){if(m>=Z.villagePalms)break;r.free(e.x,e.z,5.5,1)&&i.free(e.x,e.z,3,1)&&(r.add(e.x,e.z,5.5,Tc.PALM),s.palms.push(f(e.x,e.z,e.h)),m++)}s.villagePalms=m,Ec(n,u,d,660,-20,12,(t,a)=>{e.cover(t,a,l);let u=o.fbm(t/110+3.3,a/110-1.7,3),d=(.04+.4*M(0,.45,u))*(1-M(60,160,l.h));if(n()>d||e.villageDist(t,a)<Z.villageRadius||!e.allowed(t,a,l,{minH:6,maxBare:.2,clear:3,big:!0})||l.ny<.8||!r.free(t,a,2,1)||!i.free(t,a,1.2,1))return;r.add(t,a,2,Tc.PALM);let[f,p]=e.downhill(t,a),m=.8+n()*.35;s.palms.push({x:t,y:e.groundY(t,a,.35)-.05,z:a,s:m,yaw:n()*c,la:Math.atan2(p,f)+(n()-.5)*1.5,l:.03+n()*.12,H:(8+n()*7)*m,seed:n()})});for(let e of s.palms){let t=0,n=0;for(let r of s.palms){if(r===e)continue;let i=e.x-r.x,a=e.z-r.z,o=i*i+a*a;if(o<25&&o>1e-6){let e=Math.sqrt(o);t+=i/e*(5-e),n+=a/e*(5-e)}}if(t!==0||n!==0){let r=Math.cos(e.la),i=Math.sin(e.la),a=Math.min(1,Math.hypot(t,n)/3);e.la=Math.atan2(i*(1-a)+n/Math.hypot(t,n)*a,r*(1-a)+t/Math.hypot(t,n)*a),e.l=Math.max(e.l,.14+.1*a)}}return Ec(n,u,d,660,320,3,(t,i)=>{if(e.cover(t,i,l),l.h<2.3)return;let u=a.fbm(t/26+11.3,i/26-4.1,3)*.7+o.fbm(t/9,i/9,2)*.3,d=M(.2,.45,l.forest)*(1-M(.75,.95,l.forest)),f=e.inBay(t,i)&&l.h<5.5,p=d*.75+l.gully*.5+(l.forest>.9?.12:0)+(f?.08:.03),m=Oc(t,i,l,!0);if(p+=m*(.32+.45*(1-M(3.5,9,l.h)))*(1-M(.5,.8,l.forest)),p*=M(-.2,.25,u),e.villageDist(t,i)<Z.villageRadius&&(p*=.35),n()>p||!e.allowed(t,i,l,{minH:2.3,maxBare:.4,clear:1.2}))return;let h=(.75+n()*.8)*(m>.3?1.35:1),g=.65+n()*.65;if(!r.free(t,i,.85*h,1))return;r.add(t,i,.85*h,Tc.SHRUB);let _=n()*c;s.shrubs.push({x:t,y:e.groundY(t,i,.3)-.08*h,z:i,s:h,sy:g,yaw:_,la:_,l:-g,H:1.6*h*g,seed:n()})}),Ec(n,-280,-420,360,-40,4.2,(t,i)=>{let a=e.villageDist(t,i);if(a>330)return;e.cover(t,i,l);let u=o.fbm(t/38-5.1,i/38+2.2,3),d=.75*M(.12,.38,u)*(1-M(220,330,a))*(1-M(.8,1,l.forest)*.6);if(n()>d||!e.allowed(t,i,l,{minH:3.4,maxBare:.2,clear:1.5})||l.ny<.82)return;let f=.8+n()*.45;r.free(t,i,1.1*f,1)&&(r.add(t,i,1.1*f,Tc.BANANA),s.bananas.push({x:t,y:e.groundY(t,i,.2)-.05,z:i,s:f,yaw:n()*c,la:n()*c,l:n()*.08,H:1.8*f*(.8+n()*.5),seed:n()}))}),Ec(n,u,d,660,-20,6.5,(t,i)=>{if(e.cover(t,i,l),l.h<2.3||l.h>120)return;let o=a.fbm(t/48,i/48,3),u=(e.inBay(t,i)?.22:.1)*M(-.3,.2,o)*(1-l.forest*.6);if(n()>u||!e.allowed(t,i,l,{minH:2.3,maxBare:.2,clear:1.5}))return;let d=.7+n()*.6;r.free(t,i,1.1*d,1)&&(r.add(t,i,1.1*d,Tc.YOUNG),s.youngPalms.push({x:t,y:l.h-.05,z:i,s:d,yaw:n()*c,la:n()*c,l:n()*.1,H:.35*d,seed:n()}))}),Ec(n,u,d,660,-20,2.2,(t,i)=>{if(e.cover(t,i,l),l.h<4)return;let a=o.fbm(t/28-9.9,i/28+3.7,3),u=(.08+.72*M(.3,.8,l.forest)+l.gully*.4)*M(-.35,.2,a);if(n()>u||!e.allowed(t,i,l,{minH:4,maxBare:.45,clear:.5}))return;let d=.75+n()*.7;r.free(t,i,.5*d,1)&&(r.add(t,i,.5*d,Tc.FERN),s.ferns.push({x:t,y:l.h-.03,z:i,s:d,yaw:n()*c,la:0,l:0,H:.05,seed:n()}))}),Ec(n,u,d,660,-20,3.2,(t,i)=>{if(e.cover(t,i,l),l.h<3.5)return;let a=o.fbm(t/22+7.7,i/22-1.3,3),u=e.villageDist(t,i)<95?.18*M(.3,.7,l.forest+.4):0,d=(.5*M(.35,.75,l.forest)+l.gully*.35+u)*M(0,.35,a);if(n()>d||!e.allowed(t,i,l,{minH:3.5,maxBare:.35,clear:1,maxSand:.15})||l.ny<.75)return;let f=.8+n()*.6;r.free(t,i,.9*f,1)&&(r.add(t,i,.9*f,Tc.BROAD),s.monsteras.push({x:t,y:l.h-.04,z:i,s:f,yaw:n()*c,la:n()*c,l:n()*.05,H:.02,seed:n()}))}),Ec(n,u,d,660,-20,3.6,(t,i)=>{if(e.cover(t,i,l),l.h<2.6)return;let o=a.fbm(t/30-3.1,i/30+8.4,3),u=(l.gully*.8+M(7,3,l.h)*.25+M(.25,.5,l.forest)*(1-M(.7,.95,l.forest))*.25)*M(.05,.4,o);if(n()>u||!e.allowed(t,i,l,{minH:2.6,maxBare:.3,clear:1,maxSand:.15})||l.ny<.8)return;let d=.95+n()*.55;r.free(t,i,1.1*d,1)&&(r.add(t,i,1.1*d,Tc.BROAD),s.elephantEars.push({x:t,y:l.h-.04,z:i,s:d,yaw:n()*c,la:n()*c,l:n()*.05,H:.02,seed:n()}))}),Ec(n,u,d,660,-20,3.4,(t,i)=>{let a=e.villageDist(t,i);if(e.cover(t,i,l),l.h<3)return;let u=M(.2,.45,l.forest)*(1-M(.7,.9,l.forest)),d=e.obstacleDist(t,i),f=a<110?M(16,4,d)*.45+.04:0,p=(u*.12+f)*M(-.1,.3,o.fbm(t/18+2.2,i/18-6.6,2));if(n()>p||!e.allowed(t,i,l,{minH:3,maxBare:.3,clear:1.2,maxSand:.25})||l.ny<.8)return;let m=.85+n()*.35;r.free(t,i,.9*m,1)&&(r.add(t,i,.9*m,Tc.BROAD),s.heliconias.push({x:t,y:l.h-.04,z:i,s:m,yaw:n()*c,la:n()*c,l:n()*.04,H:.02,seed:n()}))}),Ec(n,u,d,660,-20,3,(t,i)=>{if(e.villageDist(t,i)>105||(e.cover(t,i,l),l.h<3))return;let o=e.obstacleDist(t,i),u=M(10,3.5,o)*.35*M(-.2,.3,a.fbm(t/14-4.4,i/14+6.6,2));if(n()>u||!e.allowed(t,i,l,{minH:3,maxBare:.3,clear:.8,maxSand:.25})||l.ny<.85)return;let d=.85+n()*.3;r.free(t,i,.7*d,1)&&(r.add(t,i,.7*d,Tc.BROAD),s.strelitzias.push({x:t,y:l.h-.03,z:i,s:d,yaw:n()*c,la:n()*c,l:n()*.03,H:.02,seed:n()}))}),s}function Ac(e){let t=e.terrain,n=Math.round(t.size/2),r=t.size/n,i=new Uint8Array(n*n*4),a=e.noise,o=e.noise2,s={};for(let c=1;c<n-1;c++){let l=t.origin+(c+.5)*r;if(!(l>0||l<-950))for(let u=1;u<n-1;u++){let d=c*n+u,f=t.origin+(u+.5)*r;if(t.heightAt(f,l)<1.7||e.rock(f,l)>.45||(e.cover(f,l,s),s.bare>.5))continue;let p=e.spawnDist(f,l);if(p<Z.spawnClear+2)continue;let m=e.obstacleDist(f,l);if(m<Z.obstacleClear+1)continue;let h=M(Z.spawnClear+2,Z.spawnClear+4,p)*M(Z.obstacleClear+1,Z.obstacleClear+3.5,m)*(1-M(.2,.5,s.path))*(1-M(.25,.45,s.bare)),g=e.inBay(f,l),_=a.noise(f/7.5,l/7.5)*.65+o.noise(f/19,l/19)*.35,v=e.hasVillage?1-.55*(1-M(3,9,m)):1-.85*(1-M(Z.villageRadius-6,Z.villageRadius+4,e.villageDist(f,l))),y=M(2.5,4.5,s.h)*(1-M(.45,.85,s.forest))*(1-M(.3,.7,s.sand))*v*(.75+.25*M(-.4,.3,_)),b=0,x=0,S=0;if(g){let n=a.noise(f/16+4.4,l/16-2.2)*.6+o.noise(f/6-1.7,l/6+8.1)*.4,r=s.h-(2.15-n*.4),i=0;if(s.scarp<.3&&t.scarp){let n=e.height(f+8,l)-e.height(f-8,l),r=e.height(f,l+8)-e.height(f,l-8),a=Math.hypot(n,r);if(a>.001){n/=a,r/=a;for(let a=1;a<=34;a+=1.5)i=Math.max(i,e._mask(t.scarp,f+n*a,l+r*a,1/255))}i=M(.3,.5,i)}let c=M(.3,.5,s.scarp);r=r*(1-i)-2*i;let u=M(0,.35,r),d=M(-.45,-.1,r)*(1-u)*M(.35,.6,a.noise(f/2.6+9.3,l/2.6-4.1)),p=1-M(4.8,6.5,s.h),m=o.noise(f/4.2+5.5,l/4.2-3.3)*.6+a.noise(f/11-7.1,l/11+1.9)*.4,h=(.3+.7*M(-.45,.25,m))*(.6+.4*M(-.35,.35,_));b=Math.max(u*h,d*.85)*p*(1-M(.4,.8,s.forest)),b=b*(1-c)+c*.18*M(.7,1,s.scarp)*M(0,.4,m),x=M(0,.25,r)*(1-M(1.4,2.2,r))*M(0,.45,a.noise(f/13+3.1,l/13-7.7)),S=M(-.6,-.15,r)*(1-M(1.2,2,r))*M(-.15,.3,o.noise(f/9-2.3,l/9+5.3)),S=Math.max(S*(1-c),c*.6*M(0,.35,o.noise(f/3.5+1.1,l/3.5-2.9)))}let C=d*4;i[C]=Math.round(255*ie(b*h,0,1)),i[C+1]=Math.round(255*ie(y*h*(1-b),0,1)),i[C+2]=Math.round(255*ie(x*h,0,1)),i[C+3]=Math.round(255*ie(S*h,0,1))}}return{data:i,res:n}}var jc=1100,Mc=new C,Nc=new r,Pc=new t,Fc=new t,Ic=new t(0,1,0),Lc=class{constructor(e,t=32){let n=e.length;this.count=n,this.qualityLevel=1,this.qualityRanks=vt(n),this.qualityLimit=n,this.px=new Float32Array(n),this.py=new Float32Array(n),this.pz=new Float32Array(n),this.matrices=new Float32Array(n*16),this.qr2=new Float32Array(n),this.iPos=new Float32Array(n*4),this.iDat=new Float32Array(n*4);for(let t=0;t<n;t++){let n=e[t];this.px[t]=n.x,this.py[t]=n.y,this.pz[t]=n.z,Pc.set(n.x,n.y,n.z),Nc.setFromAxisAngle(Ic,n.yaw),n.msx===void 0?Fc.set(n.s,n.s*Math.abs(n.sy||1),n.s):Fc.set(n.msx,n.msy,n.msz),Mc.compose(Pc,Nc,Fc).toArray(this.matrices,t*16),this.iPos.set([n.x,n.y,n.z,n.s],t*4),this.iDat.set([n.la||0,n.l||0,n.H||1,n.seed],t*4),this.qr2[t]=n.qr?n.qr*n.qr:0}this.cellSize=t;let r=new Map;for(let e=0;e<n;e++){let n=this._key(Math.floor(this.px[e]/t),Math.floor(this.pz[e]/t)),i=r.get(n);i||r.set(n,i=[]),i.push(e)}this.cells=new Map;for(let[e,t]of r)this.cells.set(e,Int32Array.from(t))}_key(e,t){return(e+4096)*8192+(t+4096)}queryNear(e,t,n,r){let i=this.cellSize,a=Math.floor((e-n)/i),o=Math.floor((e+n)/i),s=Math.floor((t-n)/i),c=Math.floor((t+n)/i),l=n*n,u=0;for(let n=s;n<=c;n++)for(let i=a;i<=o;i++){let a=this.cells.get(this._key(i,n));if(a)for(let n=0;n<a.length;n++){let i=a[n],o=this.px[i]-e,s=this.pz[i]-t,c=this.qr2[i]||l;o*o+s*s<c&&u<r.length&&(r[u++]=i)}}return u}},Rc=class{constructor(e,t,n){this.capacity=Math.max(t,jc);let r=this.capacity;this.instanceMatrix=new ge(new Float32Array(r*16),16),this.iBuffer=new fe(new Float32Array(r*8),8),this.iPos=new _e(this.iBuffer,4,0),this.iDat=new _e(this.iBuffer,4,4),this.lodRange=n.clone(),this.meshes=[],this.count=0,this.trianglesPerInstance=0;for(let{geometry:t,material:n,castShadow:i=!1,name:a=``}of e){t.setAttribute(`iPos`,this.iPos),t.setAttribute(`iDat`,this.iDat);let e=new we(t,n,r);e.instanceMatrix=this.instanceMatrix,e.count=0,e.name=a,e.castShadow=i,e.receiveShadow=!0,e.frustumCulled=!1,e.userData.lodRange=this.lodRange,e.drawParams=[this.lodRange.x,this.lodRange.y,this.lodRange.z],e.matrixAutoUpdate=!1,e.updateMatrix(),this.meshes.push(e),this.trianglesPerInstance+=(t.index?t.index.count:t.attributes.position.count)/3}}setDynamic(){this.instanceMatrix.setUsage(he),this.iBuffer.setUsage(he)}fill(e,t=null,n=e.count,r=!0){n=Math.min(n,t===null?e.count:t.length);let i=0,a=this.instanceMatrix.array,o=this.iBuffer.array,s=e.matrices,c=e.iPos,l=e.iDat;for(let u=0;u<n&&i<this.capacity;u++){let n=t===null?u:t[u];if(e.qualityLevel===0||e.qualityLevel<1&&e.qualityRanks[n]>=e.qualityLimit)continue;if(r){let e=n*16,t=i*16;for(let n=0;n<16;n++)a[t+n]=s[e+n]}let d=n*4,f=i*8;o[f]=c[d],o[f+1]=c[d+1],o[f+2]=c[d+2],o[f+3]=c[d+3],o[f+4]=l[d],o[f+5]=l[d+1],o[f+6]=l[d+2],o[f+7]=l[d+3],i++}n=i,r&&(this.instanceMatrix.clearUpdateRanges(),this.instanceMatrix.addUpdateRange(0,n*16),this.instanceMatrix.needsUpdate=!0),this.iBuffer.clearUpdateRanges(),this.iBuffer.addUpdateRange(0,n*8),this.iBuffer.needsUpdate=!0,this.count=n;for(let e of this.meshes)e.count=n}get triangles(){return this.count*this.trianglesPerInstance}},zc=class{constructor(e,n,{near:r=null,far:i=null,nearRange:a=100,fade:o=null,margin:s=14,refreshDistance:c=6,farExcludeNear:l=!1,sortNear:u=!1,sortFar:d=!1,farRefresh:f=16}={}){this.name=e,this.sortNear=u,this.sortFar=d&&!!i&&!l,this.farRefresh=f,this.farX=1/0,this.farZ=1/0,this.inst=new Lc(n),this.nearRange=a,this.margin=s,this.refreshDistance=c,this.lastX=1/0,this.lastY=1/0,this.lastZ=1/0,this.levels=[];let p=i?new t(0,a,a+.01):new t(0,o[0],o[1]);this.queryRadius=(i?a:o[1])+s,r&&(this.nearIds=new Int32Array(Math.max(1,this.inst.count)),this.near=new Rc(r,Math.min(this.inst.count,6e3),p),this.near.setDynamic(),this.levels.push(this.near)),i&&(this.far=new Rc(i.parts,this.inst.count,new t(a,i.fade[0],i.fade[1])),this.far.fill(this.inst),this.levels.push(this.far),this.sortFar&&(this.far.setDynamic(),this.farIds=new Int32Array(Math.max(1,this.inst.count))),this.farExcludeNear=l,l&&(this.far.setDynamic(),this.farIds=new Int32Array(Math.max(1,this.inst.count))))}get meshes(){return this.levels.flatMap(e=>e.meshes)}overdue(e){if(!this.near)return-1;let t=e.x-this.lastX,n=e.y-this.lastY,r=e.z-this.lastZ,i=t*t+n*n+r*r,a=Number.isFinite(i)?Math.sqrt(i)-this.refreshDistance:1e9;if(!this.sortFar)return a;let o=Math.hypot(e.x-this.farX,e.z-this.farZ);return Math.max(a,Number.isFinite(o)?o-this.farRefresh:1e9)}_sortFar(e){this.farX=e.x,this.farZ=e.z;let{px:t,pz:n,count:r}=this.inst,i=this._bucket||=new Uint16Array(r),a=this._bstart||=new Int32Array(1025);a.fill(0);for(let o=0;o<r;o++){let r=Math.min(1023,Math.floor(Math.hypot(t[o]-e.x,n[o]-e.z)/6));i[o]=r,a[r+1]++}for(let e=0;e<1024;e++)a[e+1]+=a[e];for(let e=0;e<r;e++)this.farIds[a[i[e]]++]=e;this.far.fill(this.inst,this.farIds,r,!1)}update(e,t=!1){if(!this.near||!t&&this.overdue(e)<0)return!1;this.sortFar&&!(Math.hypot(e.x-this.farX,e.z-this.farZ)<this.farRefresh)&&this._sortFar(e),this.lastX=e.x,this.lastY=e.y,this.lastZ=e.z;let n=this.inst.queryNear(e.x,e.z,this.queryRadius,this.nearIds);if(this.sortNear){let{px:t,pz:r}=this.inst,i=this.nearIds.subarray(0,n),a=this._sortKey||=new Float32Array(this.nearIds.length);for(let o=0;o<n;o++){let n=i[o];a[n]=(t[n]-e.x)**2+(r[n]-e.z)**2}i.sort((e,t)=>a[e]-a[t])}if(this.near.fill(this.inst,this.nearIds,n),this.farExcludeNear){let t=Math.max(0,this.nearRange-this.refreshDistance-2),n=t*t,{px:r,py:i,pz:a}=this.inst,o=0;for(let t=0;t<this.inst.count;t++){let s=r[t]-e.x,c=i[t]-e.y,l=a[t]-e.z;s*s+c*c+l*l>=n&&(this.farIds[o++]=t)}this.far.fill(this.inst,this.farIds,o)}return!0}},Bc=class{constructor(){this.pos=[],this.nor=[],this.uv=[],this.veg=[],this.mat=[],this.lobe=[],this.kind=0,this.idx=[]}get count(){return this.pos.length/3}vertex(e,t,n,r,i,a,o=null){return o?this.lobe.push(o[0],o[1],o[2],o[3]):this.lobe.push(0,0,0,-1-this.kind),this.pos.push(e.x,e.y,e.z),this.nor.push(t.x,t.y,t.z),this.uv.push(n,r),this.veg.push(i[0],i[1],i[2],i[3]),this.mat.push(a[0],a[1],a[2],a[3]),this.count-1}tri(e,t,n){this.idx.push(e,t,n)}quad(e,t,n,r){this.idx.push(e,t,n,e,n,r)}build(e=0,t=null){let n=this.count,r=[[`position`,this.pos,3],[`normal`,this.nor,3],[`uv`,this.uv,2],[`aVeg`,this.veg,4],[`aMat`,this.mat,4],[`aLobe`,this.lobe,4]],i=r.reduce((e,t)=>e+t[2],0),a=new Float32Array(n*i),o=0;for(let[,e,t]of r){for(let r=0;r<n;r++)for(let n=0;n<t;n++)a[r*i+o+n]=e[r*t+n];o+=t}let s=new Le(a,i),c=new Ie;o=0;for(let[e,,t]of r)c.setAttribute(e,new _e(s,t,o)),o+=t;return c.setIndex(n>65535?new pe(this.idx,1):new me(this.idx,1)),c.computeBoundingBox(),c.computeBoundingSphere(),e>0&&(c.boundingSphere.radius=Math.max(c.boundingSphere.radius,e),t&&c.boundingSphere.center.copy(t)),c}get triangles(){return this.idx.length/3}},Vc={STEM:0,FROND:1,FERN:2,BANANA:3,COCONUT:5,MONSTERA:6,ELEPHANT:7,HELICONIA:8,BRACT:9,STRELITZIA:10,BIRD:11},Hc=new t(0,1,0),Uc=new t,Wc=new t,Gc=new t,Kc=new t,qc=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function Jc(e,{radial:t,rows:n,radius:r,Hgeo:i,mat:a=[0,0,0,0],cap:o=!0,texU:s=1,lumps:c=null}){let l=e.count;for(let o=0;o<n.length;o++){let l=n[o],u=r(l),d=.01,f=(r(l+d)-r(l-d))/(2*d*i);for(let n=0;n<=t;n++){let r=n/t*Math.PI*2,o=Math.cos(r),d=Math.sin(r),p=c?u*(1+c(l,r)):u;Uc.set(o*p,l*i,d*p),Wc.set(o,-f,d).normalize(),e.vertex(Uc,Wc,n/t*s,l,[l,0,0,0],a)}}for(let r=0;r<n.length-1;r++)for(let n=0;n<t;n++){let i=l+r*(t+1)+n,a=i+t+1;e.quad(i,a,a+1,i+1)}if(o){let r=n[n.length-1],o=e.vertex(Uc.set(0,r*i,0),Hc,.5,r,[r+.015,0,0,0],a),s=l+(n.length-1)*(t+1);for(let n=0;n<t;n++)e.tri(s+n,o,s+n+1)}}function Yc(e,n){let{origin:r,azimuth:i,elevation:a,bend:o,twist:s=0,length:c,segs:l=8,cross:u=2,leafLen:d,leafAngle:f,droop:p,curl:m=.2,part:h=Vc.FROND,age:g=0,seed:_=0,phase:v=0,flutter:y=1,minWidth:b=.035,bendPow:x=1.4,stemU:S=1,roll:C=0,sBase:w=0}=n,T=[],E=r.clone();for(let e=0;e<=l;e++){T.push(E.clone());let t=(e+.5)/l,n=a-o*t**+x,r=i+s*t;Uc.set(Math.cos(n)*Math.cos(r),Math.sin(n),Math.cos(n)*Math.sin(r)),E.addScaledVector(Uc,c/l)}let D=new t(-Math.sin(i),0,Math.cos(i)),O=new t,k=new t,ee=new t,te=new t,A=new t;for(let t of[-1,1]){let n=[];for(let e=0;e<=l;e++){let r=e/l;O.subVectors(T[Math.min(l,e+1)],T[Math.max(0,e-1)]).normalize(),k.crossVectors(O,Hc),k.lengthSq()<.04&&k.copy(D),k.normalize(),ee.crossVectors(k,O).normalize();let i=Math.max(d(r),b),a=f(r),o=p(r)+t*C*r*r;te.copy(k).multiplyScalar(t*Math.cos(o)).addScaledVector(ee,-Math.sin(o)),A.copy(O).multiplyScalar(Math.cos(a)).addScaledVector(te,Math.sin(a)).normalize();let s=[];for(let t=0;t<=u;t++){let n=t/u,a=T[e].clone().addScaledVector(A,i*n).addScaledVector(ee,-i*m*n*n);s.push({q:a,s:r,t:n,Ll:i,nup:ee.clone()})}n.push(s)}let r=[];for(let t=0;t<=l;t++){let i=[];for(let r=0;r<=u;r++){let a=n[t][r],o=Math.max(0,t-1),s=Math.min(l,t+1),c=Math.max(0,r-1),d=Math.min(u,r+1);Wc.subVectors(n[s][r].q,n[o][r].q),Gc.subVectors(n[t][d].q,n[t][c].q),Kc.crossVectors(Wc,Gc),Kc.lengthSq()<1e-12&&Kc.copy(a.nup),Kc.normalize(),Kc.dot(a.nup)<0&&Kc.negate();let f=a.t*qc(.05,.3,a.s)*y;i.push(e.vertex(a.q,Kc,a.s,a.t,[S,w+(1-w)*a.s,f,v],[h,g,a.Ll,_]))}r.push(i)}for(let n=0;n<l;n++)for(let i=0;i<u;i++){let a=r[n][i],o=r[n+1][i],s=r[n+1][i+1],c=r[n][i+1];t>0?e.quad(a,c,s,o):e.quad(a,o,s,c)}}}function Xc(e,t,n,r,i){let a=new ye(1,0),o=a.attributes.position,s=new Map,c=[];for(let a=0;a<o.count;a++){Uc.fromBufferAttribute(o,a);let l=Uc.x.toFixed(3)+`,`+Uc.y.toFixed(3)+`,`+Uc.z.toFixed(3),u=s.get(l);u===void 0&&(Wc.copy(Uc).multiply(n).add(t),Gc.copy(Uc).divide(n).normalize(),u=e.vertex(Wc,Gc,.5,.5,i,r),s.set(l,u)),c.push(u)}for(let t=0;t<c.length;t+=3)e.tri(c[t],c[t+1],c[t+2]);a.dispose()}var Zc=10,Qc=e=>{let t=e*Zc,n=.155+.045*(1-e)+.19*Math.exp(-Math.max(t,0)/.42);return n*=1+.05*Math.sin(t*1.7)*(1-e),n+=.07*qc(.955,.99,e)-.1*qc(.995,1.02,e),n},$c=(e,t)=>{let n=Math.max(e*Zc,0);return Math.exp(-n/.3)*(.16*Math.max(0,Math.sin(t*5+.7))+.08*Math.sin(t*11+2.1))};function el(e,t){let n=[];for(let r=0;r<t;r++){let i=t>1?r/(t-1):.5,a=t>10&&r>=t-2,o=(3.8+1.5*qc(0,.45,i))*(.88+.24*e());n.push({a:i,dead:a,azimuth:r*2.39996+(e()-.5)*.4,elevation:a?-1.05-(r-(t-2))*.25:1-1.25*i**.8+(e()-.5)*.3,bend:a?.35:.55+1.15*i+e()*.4,bendPow:a?1.2:1.9+e()*.5,twist:(e()-.5)*.45,roll:(e()-.5)*(a?.4:.9),length:a?o*.9:o,attachY:.32-.5*i,seed:e(),phase:e()})}return n}function tl(e,n,{segs:r,cross:i,leafScale:a=1}){for(let o of n){let n=new t(Math.cos(o.azimuth)*.14,o.attachY,Math.sin(o.azimuth)*.14),s=o.length;Yc(e,{origin:n,azimuth:o.azimuth,elevation:o.elevation,bend:o.bend,bendPow:o.bendPow,twist:o.twist,roll:o.roll,length:s,segs:r,cross:i,leafLen:e=>a*.23*s*(qc(.14,.3,e)*(1-.68*qc(.35,1,e))),leafAngle:e=>1.1-.5*e,droop:e=>(o.dead?1.3:.88+.35*o.a)+.45*e,curl:o.dead?.15:.45,part:Vc.FROND,age:o.dead?1:o.a*.55,seed:o.seed,phase:o.phase,flutter:o.dead?.3:1,minWidth:.045})}}function nl(e=11){let n=A(e),r=new Bc;Jc(r,{radial:10,rows:[-.03,0,.015,.04,.08,.14,.22,.32,.43,.54,.65,.76,.86,.94,.975,.992,1.005],radius:Qc,Hgeo:Zc,mat:[Vc.STEM,0,0,0],lumps:$c});for(let e=0;e<6;e++){let i=e*2.39996+n()*.5,a=.2+n()*.1,o=new t(Math.cos(i)*a,-.3-n()*.35,Math.sin(i)*a),s=.12+n()*.035;Xc(r,o,new t(s,s*1.12,s),[Vc.COCONUT,n(),0,e/6],[1,0,0,0])}return tl(r,el(n,18),{segs:8,cross:2}),{geometry:r.build(16,new t(0,6,0)),triangles:r.triangles}}function rl(e=11){let n=A(e),r=new Bc;return Jc(r,{radial:5,rows:[-.03,.03,.2,.6,1],radius:Qc,Hgeo:Zc,mat:[Vc.STEM,0,0,0],cap:!1}),tl(r,el(n,18).filter((e,t)=>t!==1&&t!==5&&t!==9&&t!==13),{segs:3,cross:1,leafScale:1.15}),{geometry:r.build(16,new t(0,6,0)),triangles:r.triangles}}function il(e=5,n=new Bc){let r=A(e);Jc(n,{radial:5,rows:[-.2,.3,1],radius:e=>.16-.07*e,Hgeo:.6,mat:[Vc.STEM,.35,0,0],cap:!1});for(let e=0;e<8;e++){let i=e/7,a=e*2.39996+r()*.4,o=(1.7+.9*i)*(.85+.3*r());Yc(n,{origin:new t(0,.1-.15*i,0),azimuth:a,elevation:1.35-.8*i+(r()-.5)*.2,bend:.6+.7*i,twist:(r()-.5)*.3,length:o,segs:5,cross:1,leafLen:e=>.21*o*(qc(.04,.25,e)*(1-.6*qc(.3,1,e))),leafAngle:e=>1-.4*e,droop:e=>.25+.4*i+.2*e,curl:.15,part:Vc.FROND,age:i*.4,seed:r(),phase:r(),minWidth:.03})}return{geometry:n.build(4,new t(0,1,0)),triangles:n.triangles}}function al(e=3,n=new Bc){let r=A(e);for(let e=0;e<9;e++){let i=e/8,a=e*2.39996+r()*.5,o=(.75+.5*i)*(.85+.3*r());Yc(n,{origin:new t(0,.05,0),azimuth:a,elevation:1.3-.55*i+(r()-.5)*.2,bend:1.3+.8*i,twist:(r()-.5)*.5,length:o,segs:4,cross:1,bendPow:1.2,leafLen:e=>.2*o*(qc(.02,.2,e)*(1-.8*qc(.35,1,e))),leafAngle:()=>1.35,droop:e=>.12+.2*e,curl:.08,part:Vc.FERN,age:0,seed:r(),phase:r(),minWidth:.012,flutter:.6})}return{geometry:n.build(1.6,new t(0,.4,0)),triangles:n.triangles}}function ol(e=9,n=new Bc){let r=A(e),i=[{h:2.1+r()*.5,r:.12,leaves:8,dead:3,off:0},{h:1.3+r()*.4,r:.085,leaves:6,dead:1,off:.32},{h:.55+r()*.25,r:.05,leaves:3,dead:0,off:.3,sucker:!0},{h:.35+r()*.2,r:.04,leaves:3,dead:0,off:.28,sucker:!0}],a=new t,o=r()*Math.PI*2;for(let e of i){o+=2.1+r()*.8;let i=new t(Math.cos(o)*e.off,0,Math.sin(o)*e.off),s=e.off>0?o:r()*Math.PI*2,c=new t(Math.cos(s),0,Math.sin(s)).multiplyScalar((e.off>0?.1:.04)+r()*.05),l=[];for(let n=0;n<=3;n++){let r=n/3;l.push(i.clone().add(new t(0,e.h*r,0)).addScaledVector(c,e.h*r*r))}let u=l[3],d=Math.min(.55,.2+e.h*.15),f=r();El(n,l,{radius:t=>e.r*(1-.35*t)*(1+.25*Math.exp(-t*7)),radial:e.sucker?4:6,part:Vc.BANANA,age:0,seed:f,phase:r(),s0:0,s1:d});let p=e.leaves+e.dead;for(let i=0;i<p;i++){let o=i>=e.leaves,s=i/Math.max(1,e.leaves-1),c=i*2.39996+r()*.6;a.set(Math.cos(c),0,Math.sin(c));let l=e.sucker?.35+r()*.15:e.h/2.4,f=(1.9+.8*r())*l*(o?.85:1),p=(e.sucker?.14:.3+.08*r())*(e.sucker?1:Math.max(.6,l));Yc(n,{origin:u.clone().add(new t(a.x*e.r*.5,-(o?.15+r()*.35:s*.2)*e.h,a.z*e.r*.5)),azimuth:c,elevation:o?-.9-r()*.5:(e.sucker?1.25:1.2-.85*s)+(r()-.5)*.25,bend:o?.35:e.sucker?.5:1+1.3*s+r()*.4,twist:(r()-.5)*.5,length:f,segs:o||e.sucker?3:5,cross:1,bendPow:1.6,roll:(r()-.5)*.8,leafLen:e=>p*Math.max(0,Math.sin(Math.PI*Math.min(1,Math.max(0,(e-.1)/.9))))**.5*(o?.6:1),leafAngle:()=>1.45,droop:e=>o?.9:.2+.45*e+.2*s,curl:o?.5:.15,part:Vc.BANANA,age:o?.92+r()*.06:s*.45+r()*.15,seed:r(),phase:r(),minWidth:.03,flutter:o?.3:.8,sBase:d})}}return{geometry:n.build(4,new t(0,1.5,0)),triangles:n.triangles}}var sl=12.5,cl=[[.4,9.9,-.3,2.9],[-2,8.3,1.6,2.6],[3,7.7,1.2,2.4],[1.7,6.8,-3,2.5],[-3.2,6.3,-1.8,2.3],[.4,5.6,3.4,2.2],[-1.1,11.2,-1.7,1.8],[3.7,5.2,-.9,1.9]],ll=[.15,3.7,-.05],ul=1.6,dl=[[0,.85,0,.8],[.75,.6,.35,.6],[-.6,.55,.55,.6],[-.25,.65,-.75,.62],[.35,1.25,-.25,.48]];function fl(e,n,r,i,a,o,s,c,l,u,d=null){let f=new t().subVectors(r,n),p=f.length();f.normalize();let m=Math.abs(f.y)<.9?Hc:new t(1,0,0),h=new t().crossVectors(f,m).normalize(),g=new t().crossVectors(h,f).normalize(),_=e.count;for(let r=0;r<=s;r++){let m=r/s,_=new t().copy(n).addScaledVector(f,p*m);for(let n=0;n<=o;n++){let r=n/o*Math.PI*2,s=d?d(m,r,_):i+(a-i)*m,f=new t().copy(h).multiplyScalar(Math.cos(r)).addScaledVector(g,Math.sin(r)),v=_.clone().addScaledVector(f,s);e.vertex(v,f,n/o,m*p,[Math.max(0,v.y/l),u(v),0,0],c)}}for(let t=0;t<s;t++)for(let n=0;n<o;n++){let r=_+t*(o+1)+n,i=r+o+1;e.quad(r,i,i+1,r+1)}}function pl(e,n,r,i,a,o,s,c,l,u,d){let f=e.count,p=e=>new t().copy(n).multiplyScalar((1-e)*(1-e)).addScaledVector(r,2*(1-e)*e).addScaledVector(i,e*e),m=e=>new t().subVectors(r,n).multiplyScalar(2*(1-e)).addScaledVector(new t().subVectors(i,r),2*e).normalize(),h=m(0),g=new t().crossVectors(h,Math.abs(h.y)<.9?Hc:new t(1,0,0)).normalize(),_=0,v=p(0);for(let n=0;n<=c;n++){let r=n/c,i=p(r);_+=i.distanceTo(v),v=i;let f=m(r);g.addScaledVector(f,-g.dot(f)).normalize(),h=f;let y=new t().crossVectors(g,h).normalize(),b=a+(o-a)*r**.8;for(let n=0;n<=s;n++){let r=n/s*Math.PI*2,a=new t().copy(g).multiplyScalar(Math.cos(r)).addScaledVector(y,Math.sin(r)),o=i.clone().addScaledVector(a,b);e.vertex(o,a,n/s,_,[Math.max(0,o.y/u),d(o),0,0],l)}}for(let t=0;t<c;t++)for(let n=0;n<s;n++){let r=f+t*(s+1)+n,i=r+s+1;e.quad(r,i,i+1,r+1)}}function ml(e,{center:n,size:r,normal:i,yaw:a,lobeC:o,lobeR:s,lobeId:c,crownC:l,crownR:u,rand:d,flexFn:f,hScale:p,part:m,clumpC:h=null,clumpR:g=1}){let _=i.clone().normalize(),v=Math.abs(_.y)<.95?Hc:new t(1,0,0),y=new t().crossVectors(v,_).normalize(),b=new t().crossVectors(_,y).normalize(),x=Math.cos(a),S=Math.sin(a),C=y.clone().multiplyScalar(x).addScaledVector(b,S),w=b.clone().multiplyScalar(x).addScaledVector(y,-S),T=d(),E=d(),D=d(),O=[];for(let[t,i,a,d]of[[-.5,-.5,0,0],[.5,-.5,1,0],[.5,.5,1,1],[-.5,.5,0,1]]){let v=n.clone().addScaledVector(C,t*r).addScaledVector(w,i*r),y=h?v.clone().sub(h).divideScalar(g):v.clone().sub(o).divideScalar(s),b=v.clone().sub(l).divide(u),x=y.clone().normalize().multiplyScalar(.5).addScaledVector(b.clone().normalize(),.4).addScaledVector(_,.2).normalize(),S=Math.min(1,.5*Math.min(1,y.length())+.4*Math.min(1,b.length())+.25*Math.max(0,b.y)),k=Math.max(0,v.y/p);O.push(e.vertex(v,x,a,d,[k,f(v),1,D],[m,.2+.8*S*S,T,E],[o.x-v.x,o.y-v.y,o.z-v.z,c]))}e.quad(O[0],O[1],O[2],O[3])}function hl(e,n,{count:r,size:i,crownC:a,crownR:o,rand:s,flexFn:c,hScale:l,part:u,flatten:d=.6}){let f=new t(e[0],e[1],e[2]),p=e[3],m=[];for(let e=0;e<r;e++){let e,r,h;do e=s()*2-1,r=s()*2-1,h=s()*2-1;while(e*e+r*r+h*h>1||r<-.75);let g=Math.hypot(e,r,h)||1,_=.45+.55*Math.sqrt(g),v=new t(e/g*_*p*.85,r/g*_*p*.85*d,h/g*_*p*.85).add(f),y=v.clone().sub(f).normalize().lerp(Hc,.35+s()*.35).normalize();m.push({center:v,size:i*(.8+s()*.45),normal:y,yaw:s()*6.283,lobeC:f,lobeR:p,lobeId:n,crownC:a,crownR:o,rand:s,flexFn:c,hScale:l,part:u})}return m}function gl(e,n,{clumps:r,clumpR:i,cardsPer:a,size:o,crownC:s,crownR:c,rand:l,flexFn:u,hScale:d,part:f,flatten:p=.7}){let m=new t(e[0],e[1],e[2]),h=e[3],g=[],_=[];for(let e=0;e<r;e++){let e,r,v;do e=l()*2-1,r=l()*2-1,v=l()*2-1;while(e*e+r*r+v*v>1||r<-.55);let y=Math.hypot(e,r,v)||1,b=.3+.7*Math.sqrt(l()),x=new t(e/y,r/y*p,v/y).multiplyScalar(b*h*.85).add(m),S=i*(.65+l()*.7);_.push({c:x,rc:S});let C=x.clone().sub(m).normalize();for(let e=0;e<a;e++){let e=new t(l()*2-1,l()*2-1,l()*2-1).normalize().addScaledVector(C,.9).addScaledVector(Hc,.55).normalize(),r=x.clone().addScaledVector(e,S*(.1+.3*l())).add(new t(l()-.5,(l()-.5)*.6,l()-.5).multiplyScalar(S*.5));g.push({center:r,size:o*S/i*(.8+l()*.4),normal:e,yaw:l()*6.283,lobeC:m,lobeR:h,lobeId:n,crownC:s,crownR:c,rand:l,flexFn:u,hScale:d,part:f,clumpC:x,clumpR:S})}}return{cards:g,tips:_}}function _l(e,t,n){t.sort((e,t)=>t.center.distanceToSquared(n)-e.center.distanceToSquared(n));for(let n of t)ml(e,n)}function vl(e=21,n=new Bc){let r=A(e),i=sl,a=new t(0,7.8,0),o=new t(5.2,3.7,5.2),s=e=>Math.min(1,Math.hypot(e.x,e.z)/5)*qc(3.2,6.5,e.y),c=new t(...ll);fl(n,new t(0,-.5,0),c,.34,.24,10,7,[0,0,0,0],i,s,(e,t,n)=>{let r=n.y;return(.34-.1*e)*(1+.9*(Math.max(0,Math.cos(4*t+.4))**4*Math.exp(-Math.max(r,0)/.8))+.25*Math.exp(-Math.max(r+.3,0)/.5))});let l=[];cl.forEach((e,o)=>{let u=new t(e[0],e[1],e[2]),d=u.clone().addScaledVector(u.clone().sub(a).setY(0).normalize(),-e[3]*.2).setY(e[1]-e[3]*.25),f=(e,n,i)=>{let a=e.clone().lerp(n,.5),o=n.clone().sub(e),s=new t(o.x,0,o.z);return a.addScaledVector(s,-.28*i).add(new t(0,o.length()*.16*i,0)).add(new t((r()-.5)*.5,(r()-.5)*.3,(r()-.5)*.5).multiplyScalar(o.length()*.25))};if(o<5){let e=c.clone().add(new t((r()-.5)*.2,-.2-r()*.3,(r()-.5)*.2)),a=f(e,d,1);pl(n,e,a,d,.18,.05,6,5,[0,0,0,0],i,s),l.push(e.clone().multiplyScalar(.25).addScaledVector(a,.5).addScaledVector(d,.25))}else{let e=l[0];for(let t of l)t.distanceTo(u)<e.distanceTo(u)&&(e=t);pl(n,e,f(e,d,.6),d,.085,.03,4,3,[0,0,0,0],i,s)}});let u=[];return cl.forEach((e,c)=>{let{cards:l,tips:d}=gl(e,c,{clumps:Math.round(3.9*e[3]),clumpR:.82,cardsPer:3,size:1.45,crownC:a,crownR:o,rand:r,flexFn:s,hScale:i,part:1,flatten:.72});u.push(...l);let f=new t(e[0],e[1]-e[3]*.3,e[2]);if(c<2)for(let e of d){let a=f.clone().lerp(e.c,.4+r()*.25).add(new t(r()-.5,(r()-.5)*.4,r()-.5).multiplyScalar(.5));fl(n,a,a.clone().lerp(e.c,.7),.035,.014,3,1,[0,0,0,0],i,s)}}),_l(n,u,a),{geometry:n.build(14,new t(0,6.5,0)),triangles:n.triangles}}function yl(e=31,n=new Bc){let r=A(e),i=new t(0,.7,0),a=new t(1.1,.75,1.1),o=e=>Math.min(1,e.y/1.3);for(let e=0;e<3;e++){let r=dl[e+1];fl(n,new t(0,-.1,0),new t(r[0]*.6,r[1]*.7,r[2]*.6),.035,.015,3,1,[5,0,0,0],ul,o)}let s=[];return dl.forEach((e,t)=>s.push(...hl(e,t,{count:Math.round(15*e[3]),size:.85,crownC:i,crownR:a,rand:r,flexFn:o,hScale:ul,part:4,flatten:.8}))),_l(n,s,i),{geometry:n.build(2.2,new t(0,.7,0)),triangles:n.triangles}}var bl=(()=>{let e=A(4711),t=new Float32Array(40);for(let n=0;n<5;n++){let r=n>=3,i=r?dl.length:cl.length,a=0;for(let o=0;o<8;o++){if(o>=i)continue;let s=o>=2&&e()<.3&&a<(r?1:3);s&&a++,t[n*8+o]=s?0:.74+.44*e()}}return t})();function xl(e,t,n){let r=e.attributes.position,i=e.attributes.aLobe,a=r.data.array,o=r.data.stride,s=new Float32Array(a);for(let e=0;e<r.count;e++){let c=e*o,l=a[c+i.offset+3];if(l<0)continue;let u=1-t[n+l];s[c+r.offset]+=a[c+i.offset]*u,s[c+r.offset+1]+=a[c+i.offset+1]*u,s[c+r.offset+2]+=a[c+i.offset+2]*u}let c=new Le(s,o),l=new Ie;for(let t of Object.keys(e.attributes)){let n=e.attributes[t];l.setAttribute(t,new _e(c,n.itemSize,n.offset))}return l.setIndex(e.index),l.boundingSphere=e.boundingSphere.clone(),l}function Sl(){let e=new Bc;vl(21,e);let n=e.triangles;return yl(31,e),{geometry:e.build(14,new t(0,6.5,0)),triangles:e.triangles,treeTriangles:n,shrubTriangles:e.triangles-n}}var Cl={YOUNG:1,BANANA:2,FERN:3,BANANA_B:4};function wl(){let e=new Bc,n={},r=0;return e.kind=Cl.YOUNG,il(5,e),n.young=e.triangles-r,r=e.triangles,e.kind=Cl.FERN,al(3,e),n.fern=e.triangles-r,{geometry:e.build(4,new t(0,1.5,0)),triangles:e.triangles,perKind:n}}function Tl(){let e=new Bc,n={},r=0;return e.kind=Cl.BANANA,ol(9,e),n.banana=e.triangles-r,r=e.triangles,e.kind=Cl.BANANA_B,ol(23,e),n.bananaB=e.triangles-r,{geometry:e.build(4,new t(0,1.5,0)),triangles:e.triangles,perKind:n}}function El(e,n,{radius:r,radial:i=4,part:a,age:o=0,seed:s=0,phase:c=0,s0:l=0,s1:u=.5,W:d=.1}){let f=e.count,p=n.length,m=new t,h=new t,g=new t;for(let t=0;t<p;t++){m.subVectors(n[Math.min(p-1,t+1)],n[Math.max(0,t-1)]).normalize(),h.crossVectors(m,Hc),h.lengthSq()<1e-4&&h.set(1,0,0),h.normalize(),g.crossVectors(h,m).normalize();let f=t/(p-1),_=r(f);for(let r=0;r<=i;r++){let p=r/i*Math.PI*2;Wc.copy(h).multiplyScalar(Math.cos(p)).addScaledVector(g,Math.sin(p)),Uc.copy(n[t]).addScaledVector(Wc,_),e.vertex(Uc,Wc,-1+.5*f,r/i,[1,l+(u-l)*f,0,c],[a,o,d,s])}}for(let t=0;t<p-1;t++)for(let n=0;n<i;n++){let r=f+t*(i+1)+n,a=r+i+1;e.quad(r,r+1,a+1,a)}}function Dl(e,t,n,r,i,a=6){let o=[e.clone()],s=e.clone();for(let e=0;e<a;e++){let c=(e+.5)/a,l=r+(i-r)*c*c;Uc.copy(t).multiplyScalar(Math.cos(l)).addScaledVector(Hc,Math.sin(l)),s.addScaledVector(Uc,n/a),o.push(s.clone())}return o}function Ol(e,n){let{attach:i,dirH:a,pitch:o,bend:s,L:c,W:l,yBack:u=0,env:d,cup:f=0,roll:p=0,wave:m=0,segsY:h=8,segsX:g=2,part:_,age:v=0,seed:y=0,phase:b=0,s0:x=.5,flutter:S=.6}=n,C=new t(-a.z,0,a.x).normalize(),w=new r,T=new t,E=new t,D=new t,O=[],k=[],ee=i.clone().addScaledVector(Uc.copy(a).multiplyScalar(Math.cos(o)).addScaledVector(Hc,Math.sin(o)),-u*c).clone();for(let e=0;e<=h;e++){let t=e/h,n=Math.max(0,(t-u)/(1-u)),r=o-s*n**1.4;T.copy(a).multiplyScalar(Math.cos(r)).addScaledVector(Hc,Math.sin(r)).normalize(),w.setFromAxisAngle(T,p*(.4+.6*n)),D.copy(C).applyQuaternion(w),E.crossVectors(D,T).normalize(),k.push({p:ee.clone(),T:T.clone(),S:D.clone(),N:E.clone(),y:t}),e<h&&ee.addScaledVector(T,c/h)}for(let e=0;e<=h;e++){let t=k[e],n=Math.max(d(t.y),.02),r=[];for(let e=-g;e<=g;e++){let i=e/g,a=Math.abs(i),o=m*Math.sin(t.y*23+y*40+(i>0?1.7:0))*a,s=t.p.clone().addScaledVector(t.S,i*n*l).addScaledVector(t.N,(f*a*a+o)*n*l);r.push({q:s,x:i*n,y:t.y,n:t.N})}O.push(r)}let te=2*g,A=[];for(let t=0;t<=h;t++){let n=[];for(let r=0;r<=te;r++){let i=O[t][r],a=Math.max(0,t-1),o=Math.min(h,t+1),s=Math.max(0,r-1),c=Math.min(te,r+1);Wc.subVectors(O[o][r].q,O[a][r].q),Gc.subVectors(O[t][c].q,O[t][s].q),Kc.crossVectors(Gc,Wc),Kc.lengthSq()<1e-12&&Kc.copy(i.n),Kc.normalize(),Kc.dot(i.n)<0&&Kc.negate();let u=S*Math.abs(i.x)*qc(0,.6,i.y);n.push(e.vertex(i.q,Kc,i.y,i.x,[1,x+(1-x)*i.y,u,b],[_,v,l,y]))}A.push(n)}for(let t=0;t<h;t++)for(let n=0;n<te;n++)e.quad(A[t][n],A[t][n+1],A[t+1][n+1],A[t+1][n])}var kl=e=>t=>t<e?.75+t/e*.3:Math.sin(Math.PI*Math.min(1,.5+.5*(t-e)/(1-e)))**.75*1.02+.02,Al=e=>Math.max(0,Math.sin(Math.PI*Math.min(1,e*1.02)))**.55*1.02+.02;function jl(e=41,n=new Bc){let r=A(e),i=new t;for(let e=0;e<8;e++){let a=e*2.39996+r()*.5;i.set(Math.cos(a),0,Math.sin(a));let o=e===1||e===5?.1:e===6?.95:.4+r()*.4,s=o>.3,c=(s?.65+r()*.45:.35+r()*.2)*(o>.9?.8:1),l=Dl(new t(i.x*.06,.02,i.z*.06),i,c,1.35-r()*.2,(o>.9?0:.55)+r()*.25,6),u=s?.55+r()*.35:.28+r()*.1,d=u*.47,f=r();El(n,l,{radius:e=>.016-.005*e,part:Vc.MONSTERA,age:o,seed:r(),phase:f,s0:0,s1:.45}),Ol(n,{attach:l[l.length-1],dirH:i,pitch:o>.9?-.9:-.15-r()*.35,bend:.35+r()*.35,L:u,W:d,yBack:.16,env:kl(.16),cup:.12,roll:(r()-.5)*.5,wave:.03,segsY:10,segsX:4,part:Vc.MONSTERA,age:o,seed:r(),phase:f,s0:.45,flutter:.35})}return{geometry:n.build(2.2,new t(0,.6,0)),triangles:n.triangles}}function Ml(e=43,n=new Bc){let r=A(e),i=new t;for(let e=0;e<8;e++){let a=e*2.39996+r()*.4;i.set(Math.cos(a),0,Math.sin(a));let o=e===6?.95:e===7?.1:.2+r()*.5,s=(.8+r()*.6)*(o>.9?.75:1),c=Dl(new t(i.x*.05,.02,i.z*.05),i,s,1.45,(o>.9?.5:1.05)+r()*.25,6),l=(.75+r()*.5)*(o<.15?.6:1),u=l*.42,d=r();El(n,c,{radius:e=>.03-.014*e,radial:5,part:Vc.ELEPHANT,age:o,seed:r(),phase:d,s0:0,s1:.5}),Ol(n,{attach:c[c.length-1],dirH:i,pitch:-.45-r()*.45-(o>.9?.5:0),bend:.3+r()*.25,L:l,W:u,yBack:.3,env:kl(.3),cup:-.1,roll:(r()-.5)*.4,wave:.05,segsY:9,segsX:3,part:Vc.ELEPHANT,age:o,seed:r(),phase:d,s0:.5,flutter:.3})}return{geometry:n.build(2.4,new t(0,.8,0)),triangles:n.triangles}}function Nl(e=47,n=new Bc){let r=A(e),i=new t;for(let e=0;e<5;e++){let a=e*2.39996+r()*.6,o=.05+r()*.22,s=new t(Math.cos(a)*o,0,Math.sin(a)*o),c=1.1+r()*1,l=new t(Math.cos(a),0,Math.sin(a)).multiplyScalar(.08+r()*.1),u=s.clone().add(new t(0,c,0)).addScaledVector(l,c),d=r(),f=r(),p=[];for(let e=0;e<=4;e++)p.push(s.clone().lerp(u,e/4));El(n,p,{radius:e=>.028-.012*e,radial:5,part:Vc.HELICONIA,age:.3,seed:f,phase:d,s0:0,s1:.55});let m=r()*Math.PI,h=3+Math.floor(r()*2);for(let e=0;e<h;e++){let t=m+((e%2?1:-1)>0?0:Math.PI)+(r()-.5)*.3;i.set(Math.cos(t),0,Math.sin(t));let a=s.clone().lerp(u,.45+e/h*.5),o=e===0&&r()<.5?.95:.2+r()*.4,c=Dl(a,i,.15+r()*.15,1.2,1,3);El(n,c,{radius:()=>.01,radial:3,part:Vc.HELICONIA,age:o,seed:f,phase:d,s0:.5,s1:.6});let l=.8+r()*.5;Ol(n,{attach:c[c.length-1],dirH:i,pitch:o>.9?-.4:.85+r()*.3,bend:o>.9?1.4:.9+r()*.5,L:l,W:l*.15,yBack:0,env:Al,cup:.25,roll:(r()-.5)*.6,wave:.02,segsY:7,segsX:1,part:Vc.HELICONIA,age:o,seed:r(),phase:d,s0:.6,flutter:.6})}if(r()<.6){let e=6+Math.floor(r()*3),a=u.clone(),o=.45+r()*.15,s=m+Math.PI*.5;for(let c=0;c<e;c++){let l=c/(e-1),u=a.clone().add(new t(0,o*l*.9+.04,0)),f=s+(c%2?0:Math.PI);i.set(Math.cos(f),0,Math.sin(f));let p=.22*(1-.45*l);Ol(n,{attach:u,dirH:i,pitch:.5,bend:-.35,L:p,W:p*.3,yBack:0,env:e=>Math.sin(Math.PI*Math.min(1,.15+e*.9))*1.02+.05,cup:1.2,segsY:3,segsX:1,part:Vc.BRACT,age:l,seed:r(),phase:d,s0:.62,flutter:.05})}El(n,[a.clone(),a.clone().add(new t(0,o,0))],{radius:()=>.009,radial:3,part:Vc.BRACT,age:0,seed:f,phase:d,s0:.6,s1:.65})}}return{geometry:n.build(2.8,new t(0,1.2,0)),triangles:n.triangles}}function Pl(e=53,n=new Bc){let r=A(e),i=new t;for(let e=0;e<11;e++){let a=.3+((e%2?1:-1)>0?0:Math.PI)+(r()-.5)*.9;i.set(Math.cos(a),0,Math.sin(a));let o=e===9?.95:.2+r()*.5,s=.55+r()*.45,c=Dl(new t((r()-.5)*.12,.02,(r()-.5)*.12),i,s,1.45,(o>.9?.6:1.15)+r()*.2,4),l=.45+r()*.2,u=r();El(n,c,{radius:e=>.012-.004*e,radial:3,part:Vc.STRELITZIA,age:o,seed:r(),phase:u,s0:0,s1:.5}),Ol(n,{attach:c[c.length-1],dirH:i,pitch:o>.9?.2:1+r()*.3,bend:.25+r()*.2,L:l,W:l*.2,yBack:0,env:Al,cup:.2,roll:(r()-.5)*.5,wave:.02,segsY:5,segsX:1,part:Vc.STRELITZIA,age:o,seed:r(),phase:u,s0:.5,flutter:.2})}let a=2+Math.floor(r()*2);for(let e=0;e<a;e++){let e=r()*Math.PI*2;i.set(Math.cos(e),0,Math.sin(e));let a=new t((r()-.5)*.15,.02,(r()-.5)*.15),o=a.clone().add(new t(i.x*.08,.85+r()*.3,i.z*.08)),s=r();El(n,[a,a.clone().lerp(o,.5),o],{radius:()=>.01,radial:3,part:Vc.STRELITZIA,age:.3,seed:r(),phase:s,s0:0,s1:.55}),Ol(n,{attach:o,dirH:i,pitch:.12,bend:.15,L:.19,W:.022,yBack:.1,env:e=>Math.sin(Math.PI*Math.min(1,.1+e*.95))*1.05+.08,cup:1.5,segsY:4,segsX:1,part:Vc.BIRD,age:0,seed:r(),phase:s,s0:.55,flutter:.02});let c=o.clone().addScaledVector(i,.05).add(new t(0,.02,0));for(let i=0;i<3;i++){let a=e+(i-1)*.35;Ol(n,{attach:c,dirH:new t(Math.cos(a),0,Math.sin(a)),pitch:1+(r()-.5)*.3,bend:-.3,L:.11+r()*.03,W:.012,yBack:0,env:e=>Math.sin(Math.PI*Math.min(1,.2+e*.8))+.1,cup:.3,segsY:2,segsX:1,part:Vc.BIRD,age:.5,seed:r(),phase:s,s0:.6,flutter:.05})}Ol(n,{attach:c,dirH:i,pitch:.55,bend:.1,L:.09,W:.008,yBack:0,env:()=>.9,cup:.4,segsY:2,segsX:1,part:Vc.BIRD,age:1,seed:r(),phase:s,s0:.6,flutter:.05})}return{geometry:n.build(1.8,new t(0,.7,0)),triangles:n.triangles}}var Fl={MONSTERA:11,ELEPHANT:12,HELICONIA:13,STRELITZIA:14};function Il(){let e=new Bc;return e.kind=Fl.MONSTERA,jl(41,e),{geometry:e.build(2.2,new t(0,.6,0)),triangles:e.triangles}}function Ll(){let e=new Bc,n={},r=0;return e.kind=Fl.ELEPHANT,Ml(43,e),n.elephant=e.triangles-r,r=e.triangles,e.kind=Fl.HELICONIA,Nl(47,e),n.heliconia=e.triangles-r,r=e.triangles,e.kind=Fl.STRELITZIA,Pl(53,e),n.strelitzia=e.triangles-r,{geometry:e.build(3,new t(0,1,0)),triangles:e.triangles,perKind:n}}var Rl=Math.ceil(bl.length/4),zl=new l(`VegParams`,{camPos:[`vec3f`,new t(0,10,0)],pad0:[`f32`,0],gustOffset:[`vec2f`,new p],canopyNear:[`vec2f`,new p(75,45)],lobeTable:[`vec4f[${Rl}]`,Array.from({length:Rl},(e,t)=>[0,1,2,3].map(e=>bl[t*4+e]??0))]},{label:`vegParams`}),Bl=zl.fields.camPos,Vl=zl.fields.gustOffset,Hl=.12,Ul=[42,58],Q=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},Wl=new g({name:`veg`,deps:[F,se],uniforms:zl,bindings:{vegDetail:{texture:()=>ee()}},code:`
const VEG_UP = vec3f( 0.0, 1.0, 0.0 );
const VEG_LOD_BAND: f32 = ${Q(Hl)};

// Dave Hoskins' sine-free hash, [0, 1)
fn vegHash12( p: vec2f ) -> f32 {
	var p3 = fract( vec3f( p.x, p.y, p.x ) * 0.1031 );
	p3 += dot( p3, p3.yzx + 33.33 );
	return fract( ( p3.x + p3.y ) * p3.z );
}

fn vegNoise( p: vec2f ) -> f32 {
	let i = floor( p );
	let fr = fract( p );
	let u = fr * fr * ( fr * -2.0 + 3.0 );
	let a = vegHash12( i );
	let b = vegHash12( i + vec2f( 1.0, 0.0 ) );
	let c = vegHash12( i + vec2f( 0.0, 1.0 ) );
	let d = vegHash12( i + vec2f( 1.0, 1.0 ) );
	return mix( mix( a, b, u.x ), mix( c, d, u.x ), u.y );
}

// Wind ---------------------------------------------------------------------------------

// 0 (calm) .. 2.5 (storm). Tiny floor so nothing is ever perfectly frozen.
fn vegWindStrength() -> f32 { return max( frame.windSpeed * 0.1, 0.03 ); }
fn vegWindDir3() -> vec3f { return vec3f( frame.windDir.x, 0.0, frame.windDir.y ); }
fn vegWindPerp3() -> vec3f { return vec3f( -frame.windDir.y, 0.0, frame.windDir.x ); }

// Travelling gust field in [0, 1]: noise of (worldXZ - windDir * t * speed), where the
// time-integrated offset comes from vegParams.gustOffset. Two fetches of the detail texture's fbm
// channel (~35 m and ~15 m gust cells); the terrain uses the same function for its wind sheen.
fn vegGustAt( xz: vec2f ) -> f32 {
	let p = xz - vegParams.gustOffset;
	let n = textureSampleLevel( vegDetail, smpLinearRepeat, p / 140.0, 0.0 ).w * 0.62
		+ textureSampleLevel( vegDetail, smpLinearRepeat, p / 61.0 + 0.37, 0.0 ).w * 0.38;
	return smoothstep( 0.46, 0.6, n );
}

// Rotation taking +Y to the unit vector T, applied to v.
fn vegRotUpTo( v: vec3f, T: vec3f ) -> vec3f {
	let k = vec3f( T.z, 0.0, -T.x );
	let c1 = cross( k, v );
	return v + c1 + cross( k, c1 ) / ( T.y + 1.0 );
}

// normal through the instance matrix as three's instance node does it (not normalised: its
// length scales the leaf flutter the same way)
fn vegInstanceNormal( m: mat4x4f, n: vec3f ) -> vec3f {
	let a = m[ 0 ].xyz; let b = m[ 1 ].xyz; let c = m[ 2 ].xyz;
	let t = n / vec3f( dot( a, a ), dot( b, b ), dot( c, c ) );
	return mat3x3f( a, b, c ) * t;
}

// Crown variants: the per-instance variant picks a row of the lobe table (per-lobe size, 0 =
// dropped). Shared by the near canopy geometry and the impostor bake, so near and far crowns match.
fn vegVariantOf( seed: f32, isShrub: bool ) -> f32 {
	return floor( fract( seed * 7.77 ) * select( ${Q(3)}, ${Q(2)}, isShrub ) );
}
fn vegLobeScale( seed: f32, li: f32, isShrub: bool ) -> f32 {
	let row = vegVariantOf( seed, isShrub ) + select( 0.0, ${Q(3)}, isShrub );
	let i = i32( row * 8.0 + max( li, 0.0 ) );
	return vegParams.lobeTable[ i / 4 ][ i % 4 ];
}

// LOD window factor for an instance at base (0 = hidden, 1 = full size); lodRange = (visible from,
// fade-out start, fade-out end)
fn vegLodScale( base: vec3f, lodRange: vec3f ) -> f32 {
	let d = length( vegParams.camPos - base );
	let inside = d >= lodRange.x * ( 1.0 - VEG_LOD_BAND / 2.0 );
	let hardEnd = lodRange.z - lodRange.y < 0.05;
	let endK = select( 1.0 - smoothstep( lodRange.y, lodRange.z, d ), select( 0.0, 1.0, d < lodRange.y * ( 1.0 + VEG_LOD_BAND / 2.0 ) ), hardEnd );
	return select( 0.0, endK, inside );
}

// Fragment-stage keep test of the LOD cross-fade for an instance at base (true: keep the pixel)
fn vegLodDither( base: vec3f, lodRange: vec3f, pixel: vec2f ) -> bool {
	let d = length( vegParams.camPos - base );
	let t = bayer4( pixel );
	let x = lodRange.x; let y = lodRange.y;
	let fadeIn = select( 1.0, smoothstep( x * ( 1.0 - VEG_LOD_BAND / 2.0 ), x * ( 1.0 + VEG_LOD_BAND / 2.0 ), d ), x > 0.0 );
	let fadeOut = select( 0.0, smoothstep( y * ( 1.0 - VEG_LOD_BAND / 2.0 ), y * ( 1.0 + VEG_LOD_BAND / 2.0 ), d ), lodRange.z - y < 0.05 );
	return t < fadeIn && t >= fadeOut;
}

// Leaf translucency: sunlight transmitted through the leaf when it is lit from behind (relative
// to the viewer). The lighting model multiplies it by the shadowed light colour, so leaves in
// shadow (behind a hill at sunset, inside the canopy) don't glow.
fn vegTranslucency( albedo: vec3f, N: vec3f, strength: f32, P: vec3f ) -> vec3f {
	let V = normalize( frame.cameraPos - P );
	let L = frame.sunDir;
	let back = sat( dot( -N, L ) );
	let forward = pow( sat( dot( -V, L ) ), 3.0 ) * 0.7 + 0.3;
	let tint = albedo * vec3f( 1.25, 1.45, 0.55 ) + vec3f( 0.012, 0.018, 0.0 );
	return tint * ( back * forward * strength ) * ( 1.0 - frame.night );
}

struct VegPlant {
	pos: vec3f,
	normal: vec3f,
	trunkY: f32,  // height along the stem (m)
	trunkT: vec3f, // stem axis (world)
};

// Plant deformation shared by palms / young palms / bananas / ferns.
//
// Geometry conventions (local space, applied after the instance matrix = T * Ry * S):
//   aMat.x == 0  -> stem vertex: aVeg.x = height fraction u, x/z = radial offset.
//   aMat.x >= 1  -> crown vertex: position is relative to the crown centre.
//   aVeg = (u, s along frond, flutter weight, phase)
// Per instance:
//   iPos = (base.xyz, scale), iDat = (lean azimuth, lean (fraction of H), stem height H (m), seed)
// P / N0: the vertex through the instance matrix (three's positionLocal / normalLocal after the
// instance node).
fn vegPlantDeform( P: vec3f, N0: vec3f, iPos: vec4f, iDat: vec4f, veg: vec4f, aMat: vec4f, aLobe: vec4f, lodRange: vec3f ) -> VegPlant {
	let part = aMat.x;
	let base = iPos.xyz;
	let sc = iPos.w;
	let leanDir = vec3f( cos( iDat.x ), 0.0, sin( iDat.x ) );
	let lean = iDat.y;
	let H = iDat.z;
	// merged geometries (understory): the instance's plant kind is the integer part of the seed;
	// vertices of the other plants collapse onto the base
	let seed = fract( iDat.w );
	let kindI = floor( iDat.w );
	let kindV = -aLobe.w - 1.0;
	let keepKind = kindV < 0.5 || abs( kindV - kindI ) < 0.5;

	let u = veg.x;
	let s = veg.y;
	let flut = veg.z;
	let ph = veg.w;

	let t = frame.time;
	let w = vegWindStrength();
	let g = vegGustAt( base.xz );
	let ph0 = seed * 6.2832;
	let windDir3 = vegWindDir3();
	let windPerp3 = vegWindPerp3();

	// stem sway: horizontal offset of the top as a fraction of H
	let sway = w * w * 0.014 * ( g * 0.9 + 0.3 ) + sin( t * 0.83 + ph0 ) * w * 0.0065 * ( g + 0.45 );
	let swayP = sin( t * 0.61 + ph0 * 1.7 ) * w * 0.0028;
	let windOff = windDir3 * sway + windPerp3 * swayP;

	// stem curve: mix of a straight tilt and a "banana" curve (vertical at the top)
	let c = fract( seed * 7.31 );
	let fc = mix( u, u * ( ( 1.0 - u ) + 1.0 ), c );
	let df = mix( 1.0, ( 1.0 - u ) * 2.0, c );
	let off = leanDir * ( lean * fc ) + windOff * ( u * u );
	let T = normalize( VEG_UP + leanDir * ( lean * df ) + windOff * ( u * 2.0 ) );

	let radial = vec3f( P.x - base.x, 0.0, P.z - base.z );
	let axisPt = base + vec3f( 0.0, u * H, 0.0 ) + off * H;
	let stemPos = axisPt + vegRotUpTo( radial, T );
	let stemN = vegRotUpTo( N0, T );

	// crown: follows the stem top, tilted half as much as the stem tip
	let Ttop = normalize( VEG_UP + leanDir * ( lean * ( 1.0 - c ) ) + windOff * 2.0 );
	let Ttilt = normalize( VEG_UP + Ttop );
	let C = base + vec3f( 0.0, H, 0.0 ) + ( leanDir * lean + windOff ) * H;
	let o1 = vegRotUpTo( P - base, Ttilt );
	let N1 = vegRotUpTo( N0, Ttilt );

	// frond / leaf motion: gust bending + slow bounce + leaflet flutter, applied as a
	// length preserving rotation about the crown centre so fronds stream downwind in storms.
	let s2 = s * s;
	let bend = s2 * sc * 4.5 * ( w * w * 0.16 * ( g * 0.8 + 0.35 )
		+ sin( t * ( ph * 0.5 + 1.3 ) + ph * 23.0 + ph0 ) * w * 0.075 * ( g + 0.3 ) );
	let bounce = sin( t * ( ph + 2.1 ) + ph * 41.0 ) * s2 * w * sc * 0.1;
	let flutter = flut * sc * ( sin( t * ( ph * 5.0 + 11.0 ) + ph * 60.0 + s * 9.0 ) * ( w * 0.045 + 0.008 )
		+ sin( t * 23.0 + ph * 13.0 + s * 17.0 ) * ( max( w - 1.0, 0.0 ) * 0.05 ) );
	let disp = windDir3 * bend + VEG_UP * ( bounce - bend * 0.3 ) + N1 * flutter;
	let L = length( o1 );
	let o2 = normalize( o1 + disp + vec3f( 0.0, 1e-5, 0.0 ) ) * L;
	let crownPos = C + o2;

	// the dead (hanging) frond is only kept on some palms
	let hideDead = part > 0.5 && part < 1.5 && aMat.y > 0.95 && fract( seed * 13.7 ) > 0.4;
	let crownPos2 = select( crownPos, C, hideDead );

	let isStem = part < 0.5;
	let pos = select( crownPos2, stemPos, isStem );

	var out: VegPlant;
	out.normal = select( N1, stemN, isStem );
	out.trunkY = u * H;
	out.trunkT = T;

	// LOD window / distance fade: shrink around the base (ferns fade out earlier)
	let dCam = length( vegParams.camPos - base );
	let fernFade = select( 1.0, 1.0 - smoothstep( ${Q(Ul[0])}, ${Q(Ul[1])}, dCam ), kindI > 2.5 && kindI < 3.5 );
	let k = vegLodScale( base, lodRange ) * fernFade * select( 0.0, 1.0, keepKind );
	out.pos = base + ( pos - base ) * k;
	return out;
}
`}),Gl=e=>e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4,$=e=>{let t=Gl((e>>16&255)/255),n=Gl((e>>8&255)/255),r=Gl((e&255)/255);return`vec3f( ${t.toFixed(6)}, ${n.toFixed(6)}, ${r.toFixed(6)} )`},Kl=[11,17],ql=[36,45],Jl=[62,87],Yl=48,Xl=160,Zl=420,Ql=384,$l=7,eu=[0,0,1,1,2,2,2],tu=[2,2,3],nu=12,ru=28,iu={GRASS:0,OAT_STALK:1,OAT_HEAD:2,CREEPER:3,FLOWER:4};function au(e,t,n,r=10){let i=[];for(let a=0;a<t;a++){let t=null,o=-1;for(let s=0;s<(a===0?1:r);s++){let r=e()*n,a=e()*n,s=1/0;for(let e of i){let t=Math.abs(e[0]-r),i=Math.abs(e[1]-a);t=Math.min(t,n-t),i=Math.min(i,n-i),s=Math.min(s,t*t+i*i)}s>o&&(o=s,t=[r,a])}i.push(t)}return i}var ou=class{constructor(){this.pos=[],this.nor=[],this.side=[],this.slot=[],this.bladeData=[],this.idx=[]}get count(){return this.pos.length/3}v(e,t,n,r,i){return this.pos.push(e[0],e[1],e[2]),this.nor.push(t[0],t[1],t[2]),this.side.push(n[0],n[1],n[2],n[3]??0),this.slot.push(r[0],r[1],r[2],r[3]),this.bladeData.push(i[0],i[1],i[2],i[3]),this.count-1}blade(e,t,n,r,i,a,o,s,c,l,u=[0,0],d=0){let f=-a,p=i,m=[];for(let h=0;h<n.length;h++){let g=n[h],_=(Math.sin(o)*g+c*g*g)*s,v=(Math.cos(o)*g-c*.35*g*g)*s,y=[u[0]+i*_,v,u[1]+a*_],b=Math.sin(o)+2*c*g,x=Math.cos(o)-.7*c*g,S=Math.hypot(b,x),C=i*b/S,w=x/S,T=a*b/S,E=-p*w,D=p*C-f*T,O=f*w,k=Math.hypot(E,D,O)||1,ee=[E/k,D/k,O/k],te=r*(1-g**1.6)*(.75+.25*(1-g)),A=[g,t,l,d];h===n.length-1?m.push([this.v(y,ee,[0,0,0,0],e,A)]):m.push([this.v(y,ee,[-f*te,0,-p*te,-1],e,A),this.v(y,ee,[f*te,0,p*te,1],e,A)])}for(let e=0;e<m.length-1;e++){let t=m[e],n=m[e+1];n.length===1?this.idx.push(t[0],t[1],n[0]):this.idx.push(t[0],t[1],n[1],t[0],n[1],n[0])}}fan(e,t,n,r,i,a,o,s,c,l,u,d=.1){let f=this.v([n[0],u,n[1]],[0,1,0],[0,0,0,0],e,[d,t,l,1]),p=[];for(let f=0;f<s;f++){let m=f/s*Math.PI*2,h=r*c(m),g=Math.cos(m)*h,_=Math.sin(m)*h*.85,v=n[0]+g*i-_*a,y=n[1]+g*a+_*i,b=g/r,x=u+(b+.6)*r*o;p.push(this.v([v,x,y],[0,1,0],[0,0,0,0],e,[d+.05*Math.max(0,b),t,l,0]))}for(let e=0;e<s;e++)this.idx.push(f,p[(e+1)%s],p[e])}ribbon(e,t,n,r,i){let a=[];for(let o=0;o<n.length;o++){let s=n[o],c=n[Math.min(n.length-1,o+1)],l=n[Math.max(0,o-1)],u=c[0]-l[0],d=c[2]-l[2],f=Math.hypot(u,d)||1;u/=f,d/=f;let p=-d*r,m=u*r;a.push([this.v([s[0]-p,s[1],s[2]-m],[0,1,0],[0,0,0,0],e,[.05,t,i,0]),this.v([s[0]+p,s[1],s[2]+m],[0,1,0],[0,0,0,0],e,[.05,t,i,0])])}for(let e=0;e<a.length-1;e++){let t=a[e],n=a[e+1];this.idx.push(t[0],n[1],t[1],t[0],n[0],n[1])}}build(){let e=new Re;return e.setAttribute(`position`,new I(this.pos,3)),e.setAttribute(`normal`,new I(this.nor,3)),e.setAttribute(`aSide`,new I(this.side,4)),e.setAttribute(`aSlot`,new I(this.slot,4)),e.setAttribute(`aBlade`,new I(this.bladeData,4)),e.setIndex(this.count>65535?new pe(this.idx,1):new me(this.idx,1)),e.boundingSphere=new S(new t,1e7),e.boundingBox=new T(new t(-1e7,-1e7,-1e7),new t(1e7,1e7,1e7)),e}get triangles(){return this.idx.length/3}};function su(e){let t=A(e);return au(A(e+1),Ql,8).map(([e,n])=>{let r=t(),i=t()*Math.PI*2,a=[];for(let e=0;e<$l;e++){let n=i+e*2.39996+(t()-.5)*.5,r=e===0?.1+.3*t():e===1?.35+.4*t():t();a.push({dx:Math.cos(n),dz:Math.sin(n),lean:.06+.55*r*(.6+.8*t()),h:(.7+.5*t())*(1.06-.22*r),curve:.12+.5*r*(.5+t()),rnd:t(),base:[Math.cos(n)*.09*t(),Math.sin(n)*.09*t()],tier:eu[e]})}return{x:e,z:n,slotRand:r,blades:a}})}function cu(e,t,n=7,r=1){let i=new ou,a=[[0,.3,.62,1],[0,.55,1],[0,1]][e],o=2-e;for(let e of t.slice(0,Math.ceil(t.length*r))){let t=[e.x,e.z,e.slotRand,0];for(let n of e.blades)n.tier>o||i.blade(t,iu.GRASS,a,.012,n.dx,n.dz,n.lean,n.h,n.curve,n.rnd,n.base,n.tier)}if(e===2)return i;let s=au(A(n+2),nu,8),c=e===0;if(s.slice(0,Math.ceil(s.length*r)).forEach(([e,t],r)=>{let a=A(n*7919+r*131+17),o=[e,t,a(),1],s=c?3:1;for(let e=0;e<3;e++){let t=a()*Math.PI*2,n=Math.cos(t),r=Math.sin(t),l=.06+.14*a(),u=.8+.3*a(),d=a(),f=e===0?0:(a()-.5)*.22,p=e===0?0:(a()-.5)*.22,m=[a(),a(),a(),a(),a(),a(),a(),a()];if(e>=s)continue;let h=e===0?0:2;i.blade(o,iu.OAT_STALK,c?[0,.3,.6,.85,1]:[0,.6,1],c?.0075:.014,n,r,l,u,.2,d,[f,p],h);let g=c?8:3;for(let e=0;e<g;e++){let a=.7+.3*(e/Math.max(1,g-1)),s=(Math.sin(l)*a+.2*a*a)*u,_=(Math.cos(l)*a-.07*a*a)*u,v=t+(e%2?1:-1)*(.45+.6*m[e]),y=Math.cos(v),b=Math.sin(v),x=f+n*s+y*.02,S=p+r*s+b*.02,C=c?.085:.13,w=c?.022:.04,T=[0,1,0],E=[a,iu.OAT_HEAD,d,h],D=i.v([x,_+.01,S],T,[0,0,0,0],o,E),O=i.v([x+y*C*.45-b*w,_-C*.4,S+b*C*.45+y*w],T,[0,0,0,0],o,E),k=i.v([x+y*C*.45+b*w,_-C*.4,S+b*C*.45-y*w],T,[0,0,0,0],o,E),ee=i.v([x+y*C*.8,_-C*.95,S+b*C*.8],T,[0,0,0,0],o,E);i.idx.push(D,O,ee,D,ee,k)}}if(c)for(let e=0;e<4;e++){let t=e/4*Math.PI*2+a();i.blade(o,iu.GRASS,[0,.45,.8,1],.01,Math.cos(t),Math.sin(t),.55+.4*a(),.45,.35,a(),[0,0],2)}}),!c)return i;let l=e=>{let t=Math.min(Math.abs(e),Math.abs(e-Math.PI*2));return 1-.38*Math.exp(-(t*t)/.12)-.15*Math.sin(e*.5)**8},u=e=>.82+.18*Math.cos(e*5),d=au(A(n+3),ru,8);return d.slice(0,Math.ceil(d.length*r)).forEach(([e,t],r)=>{let a=A(n*3571+r*197+5),o=[e,t,a(),2],s=a()*Math.PI*2,c=[],d=-Math.cos(s)*1.1,f=-Math.sin(s)*1.1;for(let e=0;e<12;e++)c.push([d,.01,f]),s+=(a()-.5)*.5,d+=Math.cos(s)*.19,f+=Math.sin(s)*.19;i.ribbon(o,iu.CREEPER,c,.011,a());for(let e=1;e<c.length;e++){let t=e%2?1:-1,n=c[e-1],r=c[e],s=r[0]-n[0],u=r[2]-n[2],d=Math.hypot(s,u)||1;s/=d,u/=d;let f=Math.atan2(u,s)+t*(.7+.5*a()),p=Math.cos(f),m=Math.sin(f),h=(.07+.04*a())*(.6+.4*Math.sin(Math.PI*e/12));i.fan(o,iu.CREEPER,[r[0]+p*h*.9,r[2]+m*h*.9],h,p,m,.3+.3*a(),7,l,a(),.015)}let p=c[3+Math.floor(a()*4)];i.fan(o,iu.FLOWER,[p[0]+.03,p[2]+.03],.036,1,0,1.4,10,u,a(),.07,.2)}),i}var lu=class{constructor({terrain:e,mask:t}){this.terrain=e;let n=e.res,r=t.data,a=t.res;this.heightTex=new P({label:`grassHeights`,width:n,height:n,format:`r32float`,data:e.heights}),Object.defineProperty(this.heightTex,"needsUpdate",{set:t=>{t&&this.heightTex.upload(e.heights)}}),this.maskTex=new P({label:`grassMask`,width:a,height:a,format:`rgba8unorm`,data:r,sampler:`linearClamp`});let o=Math.ceil(e.size/8);this.cellsPerSide=o,this.cellFlags=new Uint8Array(o*o),this.cellMinY=new Float32Array(o*o),this.cellMaxY=new Float32Array(o*o);let s=8/(e.size/a),c=8/e.texel;for(let t=0;t<o;t++)for(let i=0;i<o;i++){let l=0,u=1/0,d=-1/0,f=Math.max(0,Math.floor(i*s)-1),p=Math.min(a-1,Math.ceil((i+1)*s)+1),m=Math.max(0,Math.floor(t*s)-1),h=Math.min(a-1,Math.ceil((t+1)*s)+1);for(let e=m;e<=h&&!l;e++)for(let t=f;t<=p;t++){let n=(e*a+t)*4;if(r[n]>8||r[n+1]>8||r[n+2]>8||r[n+3]>8){l=1;break}}let g=t*o+i;if(this.cellFlags[g]=l,!l)continue;let _=Math.max(0,Math.floor(i*c)-1),v=Math.min(n-1,Math.ceil((i+1)*c)+1),y=Math.max(0,Math.floor(t*c)-1),b=Math.min(n-1,Math.ceil((t+1)*c)+1);for(let t=y;t<=b;t++)for(let r=_;r<=v;r++){let i=e.heights[t*n+r];i<u&&(u=i),i>d&&(d=i)}this.cellMinY[g]=u,this.cellMaxY[g]=d}this.material=this._createMaterial();let l=su(7),u=[cu(0,l),cu(1,l),cu(2,l)];this.patchTris=u.map(e=>e.triangles),this.levels=[this._createMesh(u[0].build(),Yl,`veg-grass-near`),this._createMesh(u[1].build(),Xl,`veg-grass-mid`),this._createMesh(u[2].build(),Zl,`veg-grass-far`)],this.meshes=this.levels.map(e=>e.mesh);for(let[e,t]of this.levels.entries()){t.qualityGeometries=new Map([[1,{geometry:t.geometry,triangles:this.patchTris[e]}]]);for(let n of ut.filter(e=>e>0&&e<1)){let r=cu(e,l,7,n),i=r.build();i.setAttribute(`iCell`,t.attr),t.qualityGeometries.set(n,{geometry:i,triangles:r.triangles})}}this._frustum=new i,this._mat=new C,this._box=new T,this._last=new Float64Array(8).fill(NaN)}get near(){return this.levels[0]}get far(){return this.levels[2]}get nearTris(){return this.patchTris[0]}get farTris(){return this.patchTris[2]}_createMesh(e,t,n){let r=new Float32Array(t*4),i=new ge(r,4);i.setUsage(he),e.setAttribute(`iCell`,i),e.instanceCount=0;let a=new ve(e,this.material);return a.name=n,a.frustumCulled=!1,a.castShadow=!1,a.receiveShadow=!0,a.matrixAutoUpdate=!1,{mesh:a,geometry:e,attr:i,arr:r,max:t,count:0}}_createMaterial(){return hu(this)}setQualityLevel(e){this.patchTris=this.levels.map(t=>t.qualityGeometries.get(e||1).triangles);for(let t of this.levels)t.mesh.geometry=t.geometry=t.qualityGeometries.get(e||1).geometry,t.count=t.geometry.instanceCount=0;this._last.fill(NaN)}update(e){let t=e.matrixWorld.elements,n=this._last,r=e.projectionMatrix.elements;if(Math.abs(t[12]-n[0])<.05&&Math.abs(t[13]-n[1])<.05&&Math.abs(t[14]-n[2])<.05&&Math.abs(t[8]-n[3])<.001&&Math.abs(t[9]-n[4])<.001&&Math.abs(t[10]-n[5])<.001&&r[0]===n[6]&&r[5]===n[7])return!1;n[0]=t[12],n[1]=t[13],n[2]=t[14],n[3]=t[8],n[4]=t[9],n[5]=t[10],n[6]=r[0],n[7]=r[5],this._mat.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(this._mat,e.coordinateSystem,e.reversedDepth);let i=t[12];t[13];let a=t[14],o=this.terrain,s=this.cellsPerSide,c=Math.max(0,Math.floor((i-88-o.origin)/8)),l=Math.min(s-1,Math.floor((i+88-o.origin)/8)),u=Math.max(0,Math.floor((a-88-o.origin)/8)),d=Math.min(s-1,Math.floor((a+88-o.origin)/8)),[f,p,m]=this.levels,h=0,g=0,_=0;for(let e=u;e<=d;e++)for(let t=c;t<=l;t++){let n=e*s+t;if(!this.cellFlags[n])continue;let r=o.origin+t*8,c=o.origin+e*8,l=Math.max(r-i,0,i-r-8),u=Math.max(c-a,0,a-c-8),d=Math.hypot(l,u);d>88||(this._box.min.set(r,this.cellMinY[n]-.5,c),this._box.max.set(r+8,this.cellMaxY[n]+1.8,c+8),this._frustum.intersectsBox(this._box)&&(d<18&&h<f.max?(f.arr[h*4]=r,f.arr[h*4+1]=c,h++):d<46&&g<p.max?(p.arr[g*4]=r,p.arr[g*4+1]=c,g++):d>=46&&_<m.max&&(m.arr[_*4]=r,m.arr[_*4+1]=c,_++)))}for(let[e,t]of[[f,h],[p,g],[m,_]])e.count=t,e.geometry.instanceCount=t,e.attr.clearUpdateRanges(),e.attr.addUpdateRange(0,Math.max(1,t)*4),e.attr.needsUpdate=!0;return!0}get triangles(){return this.levels.reduce((e,t,n)=>e+t.count*this.patchTris[n],0)}dispose(){this.heightTex.destroy(),this.maskTex.destroy(),this.material.dispose();for(let e of this.levels)for(let{geometry:t}of e.qualityGeometries.values())t.dispose()}},uu=e=>e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4,du=(e,t,n)=>`vec3f( ${uu(e).toFixed(6)}, ${uu(t).toFixed(6)}, ${uu(n).toFixed(6)} )`,fu={lush:du(.13,.2,.05),green:du(.25,.32,.1),olive:du(.36,.37,.14),yellow:du(.5,.46,.2),straw:du(.62,.54,.33),soil:du(.17,.13,.08)},pu=(e,t)=>{let n=Math.cos(t),r=Math.sin(t);return`vec2f( ${e}.x * ${Q(n)} - ${e}.y * ${Q(r)}, ${e}.x * ${Q(r)} + ${e}.y * ${Q(n)} )`},mu=new g({name:`vegGrass`,deps:[Wl],code:`
const VEG_MEADOW_LUSH = ${fu.lush};
const VEG_MEADOW_GREEN = ${fu.green};
const VEG_MEADOW_OLIVE = ${fu.olive};
const VEG_MEADOW_YELLOW = ${fu.yellow};
const VEG_MEADOW_STRAW = ${fu.straw};
const VEG_MEADOW_SOIL = ${fu.soil};

struct VegMeadow { tone: vec3f, dry: f32, lush: f32 };

//   mA, mB: detail fbm channel at the 173 m / 47 m scales (~0.5 +- 0.1): the samples at
//   rot2( xz, 0.7 ) / 173 and rot2( xz, 2.1 ) / 47 that the terrain takes anyway; slope: 1 - N.y;
//   south: N.z (the sun side). Mostly fresh green grass with olive, sun-bleached yellow and a few
// straw-dry patches (more on exposed slopes), darker lush grass in the damp patches.
// (TerrainShading's optional finer 'detail' input is not used by the grass.)
fn vegMeadowTone( mA: f32, mB: f32, slope: f32, south: f32 ) -> VegMeadow {
	let m = mA * 0.55 + mB * 0.45 + slope * 0.25 + south * 0.04;
	let olive = smoothstep( 0.52, 0.6, m );
	let yellow = smoothstep( 0.6, 0.67, m );
	let straw = smoothstep( 0.66, 0.73, m + ( mB - 0.5 ) * 0.2 );
	let lush = smoothstep( 0.46, 0.37, mB * 0.7 + mA * 0.3 + slope * 0.2 );
	var c = mix( VEG_MEADOW_GREEN, VEG_MEADOW_OLIVE, olive );
	c = mix( c, VEG_MEADOW_YELLOW, yellow * 0.8 );
	c = mix( c, VEG_MEADOW_STRAW, straw * 0.55 );
	c = mix( c, VEG_MEADOW_LUSH, lush * 0.75 );
	return VegMeadow( c, olive * 0.4 + yellow * 0.6, lush );
}

// per-tier visibility at camera distance d (1 = full width, 0 = gone); tier 0 thins out per blade
fn vegGrassTierFade( tier: f32, d: f32, cut: f32 ) -> f32 {
	let f2 = 1.0 - smoothstep( ${Q(Kl[0])}, ${Q(Kl[1])}, d );
	let f1 = 1.0 - smoothstep( ${Q(ql[0])}, ${Q(ql[1])}, d );
	let f0 = 1.0 - smoothstep( cut - 5.0, cut, d );
	return select( select( f0, f1, tier > 0.5 ), f2, tier > 1.5 );
}
`});function hu(e){let t=e.terrain,n=t.res;return new qe({name:`veg-grass`,side:`double`,roughness:.8,metalness:0,modules:[Wl,mu],textures:{grassHeights:e.heightTex,grassMask:e.maskTex},attributes:{iCell:`vec4f`,aSlot:`vec4f`,aBlade:`vec4f`,aSide:`vec4f`},varyings:{vVegGrass:`vec4f`,vVegGrassTone:`vec4f`,vVegGrass2:`vec4f`,vVegGust:`f32`},vertex:`
	let cell = v.iCell.xy;
	let slot = v.aSlot;
	let blade = v.aBlade;
	let side4 = v.aSide;
	let side = side4.xyz;
	let P = v.position;
	let N = v.normal;

	let xz = cell + slot.xy;
	let hf = blade.x;
	let kind = blade.y;
	let bRnd = blade.z;

	let m = textureSampleLevel( grassMask, smpLinearClamp, ( xz - ${Q(t.origin)} ) / ${Q(t.size)}, 0.0 );
	let isGrass = kind < 0.5;
	let isOat = kind > 0.5 && kind < 2.5;
	let lush = m.g;
	let dune = m.r;
	// the backshore grass is dense in its clumps (the mask carries the clumping and the edge)
	let duneF = dune / ( dune + lush + 1e-3 );
	let grassP = mix( lush, min( dune * 1.1, 1.0 ), duneF );
	let density = select( select( m.a, m.b, isOat ), grassP, isGrass );
	let r = vegHash12( xz * 1.37 + 0.51 );
	let r2 = vegHash12( xz * 2.11 + 7.3 );
	let flowerOk = select( 1.0, select( 0.0, 1.0, r2 < 0.35 ), kind > 3.5 );
	let present = select( 0.0, 1.0, r < density ) * flowerOk;


#if GRASS_REJECT_ABSENT
	// terrain height (float texels loaded and bilinearly filtered manually)
	let hfp = ( xz - ${Q(t.origin)} ) / ${Q(t.texel)} - 0.5;
	let hfi = floor( hfp );
	let hfr = hfp - hfi;
	let ij = vec2i( clamp( hfi, vec2f( 0.0 ), vec2f( ${Q(n-2)} ) ) );
	let ha = textureLoad( grassHeights, ij, 0 ).x;
	let hb = textureLoad( grassHeights, ij + vec2i( 1, 0 ), 0 ).x;
	let hc = textureLoad( grassHeights, ij + vec2i( 0, 1 ), 0 ).x;
	let hd = textureLoad( grassHeights, ij + vec2i( 1, 1 ), 0 ).x;
	let ground = mix( mix( ha, hb, hfr.x ), mix( hc, hd, hfr.x ), hfr.y );
	let base = vec3f( xz.x, ground - 0.03, xz.y );
	// Absent blades already collapse to this exact point with zero coverage.
	// Skip tone, noise, trigonometry and wind without rejecting any visible blade.
	if ( present == 0.0 ) {

		v.useWorld = true; v.worldPos = base; v.worldNormal = VEG_UP;
		o.vVegGrass = vec4f( 0.0 ); o.vVegGrassTone = vec4f( 0.0 );
		o.vVegGrass2 = vec4f( 0.0 ); o.vVegGust = 0.0;
		return;
	}
#endif

	// meadow tone at the clump: the same function and inputs as the terrain's meadow shading
	let mA = textureSampleLevel( vegDetail, smpLinearRepeat, ${pu(`xz`,.7)} / 173.0, 0.0 ).w;
	let mB = textureSampleLevel( vegDetail, smpLinearRepeat, ${pu(`xz`,2.1)} / 47.0, 0.0 ).w;
	let mt = vegMeadowTone( mA, mB, 0.0, 0.0 );
	// size: tall meadow grass, knee to waist high: swathes of taller grass in the lush patches,
	// lower where it is dry; wiry dune tufts
	let patchN = vegNoise( xz * ${Q(1/6.5)} + 17.3 ) * 0.7 + vegNoise( xz * ${Q(1/2.3)} ) * 0.3;
	let lushH = mix( 0.7, 1.3, patchN ) * ( mt.lush * 0.25 + 1.0 ) * ( 1.0 - mt.dry * 0.25 );
	// dune tufts vary a lot in size (young shoots to big old clumps)
	let grassH = mix( lushH, 0.62, duneF ) * mix( r2 * 0.35 + 0.83, r2 * r2 * 0.9 + 0.5, duneF ) * ( density * 0.35 + 0.65 );
	let oatH = r2 * 0.55 + 1.0;
	let vineS = r2 * 0.4 + 0.8;
	let hScale = select( select( vineS, oatH, isOat ), grassH, isGrass );
	// meadow clumps fan out wider than the wiry dune tufts
	let spread = select( 1.0, mix( 1.35, 1.3, duneF ), isGrass );

	// distance LOD: tiers fade out (narrow to nothing), the remaining blades widen so the
	// coverage (blade density x width) stays constant; tier 0 thins out per blade near R_FAR
	let dist = length( xz - vegParams.camPos.xz );
	// tier: grass blades and oats carry their own (aBlade.w), otherwise the slot's
	let tier = max( select( 0.0, blade.w, kind < 2.5 ), slot.w );
	let cutK = bRnd * 7.13 + r2;
	let cut = mix( ${Q(Jl[0]+5)}, ${Q(Jl[1])}, cutK - floor( cutK ) );
	let own = vegGrassTierFade( tier, dist, cut );
	let f2 = 1.0 - smoothstep( ${Q(Kl[0])}, ${Q(Kl[1])}, dist );
	let f1 = 1.0 - smoothstep( ${Q(ql[0])}, ${Q(ql[1])}, dist );
	let comp = ${Q(tu[0]+tu[1]+tu[2])} / ( f2 * ${Q(tu[2])} + f1 * ${Q(tu[1])} + ${Q(tu[0])} );
	// oats and creeper simply shrink out
	let widthK = select( 1.0, comp * own, isGrass );
	let sizeK = select( own, 1.0, isGrass );
	let scale = hScale * present * sizeK;

	// per-slot random yaw
	let yaw = vegHash12( xz * 0.73 + 3.3 ) * 6.2832;
	let cy = cos( yaw ); let sy = sin( yaw );


#if !GRASS_REJECT_ABSENT
	// terrain height (float texels loaded and bilinearly filtered manually)
	let hfp = ( xz - ${Q(t.origin)} ) / ${Q(t.texel)} - 0.5;
	let hfi = floor( hfp );
	let hfr = hfp - hfi;
	let ij = vec2i( clamp( hfi, vec2f( 0.0 ), vec2f( ${Q(n-2)} ) ) );
	let ha = textureLoad( grassHeights, ij, 0 ).x;
	let hb = textureLoad( grassHeights, ij + vec2i( 1, 0 ), 0 ).x;
	let hc = textureLoad( grassHeights, ij + vec2i( 0, 1 ), 0 ).x;
	let hd = textureLoad( grassHeights, ij + vec2i( 1, 1 ), 0 ).x;
	let ground = mix( mix( ha, hb, hfr.x ), mix( hc, hd, hfr.x ), hfr.y );
	let base = vec3f( xz.x, ground - 0.03, xz.y );
#endif
	let pl = vec3f( P.x * spread, P.y, P.z * spread );
	let o0 = vec3f( pl.x * cy - pl.z * sy, pl.y, pl.x * sy + pl.z * cy ) * scale;

	// wind: travelling gusts bend blades downwind (length preserving), plus flutter
	let w = vegWindStrength();
	let g = vegGustAt( xz );
	let tm = frame.time;
	let ph = r * 6.2832;
	let bendAmt = w * ( g * 0.55 + 0.22 ) + sin( tm * 1.9 + ph + xz.x * 0.2 ) * w * 0.1;
	let flut = sin( tm * 7.3 + ph * 3.0 + bRnd * 20.0 ) * ( w * 0.06 + 0.015 );
	let stiff = select( select( 0.08, 0.8, isOat ), 1.0, isGrass );
	let hf2 = hf * hf;
	let disp = ( vegWindDir3() * ( bendAmt * hf2 * stiff ) + vegWindPerp3() * ( flut * hf2 * stiff ) ) * ( length( o0 ) + 1e-4 );
	let oL = length( o0 );
	let ob = normalize( o0 + disp + vec3f( 0.0, 1e-5, 0.0 ) ) * oL;

	let wScale = select( 1.0, mix( 1.5, 1.55, duneF ), isGrass );
	let wide = wScale * widthK * min( scale * 2.0, max( scale, 0.5 ) );
	let sideR = vec3f( side.x * cy - side.z * sy, side.y, side.x * sy + side.z * cy );
	let pos = base + ob + sideR * wide;

	// lighting normal: blade normal bent towards up (soft, grass-like shading), rounded across
	// the blade (a folded leaf is lit differently on its two halves)
	let across = side4.w;
	let sideDir = normalize( sideR + vec3f( 1e-5, 0.0, 0.0 ) );
	let nR = vec3f( N.x * cy - N.z * sy, N.y, N.x * sy + N.z * cy );

	// a share of the blades is dead / straw coloured (more in the dry patches)
	let dk = bRnd * 13.7 + r * 3.1;
	let dryBlade = select( 0.0, 1.0, dk - floor( dk ) < mt.dry * 0.3 + 0.07 );
	o.vVegGrass = vec4f( hf, kind, duneF, bRnd );
	o.vVegGrassTone = vec4f( mt.tone, mt.dry );
	o.vVegGrass2 = vec4f( density, select( blade.w, 0.0, kind < 2.5 ), across, dryBlade );
	o.vVegGust = sat( g * w * 0.6 ) * stiff;

	v.useWorld = true;
	v.worldPos = pos;
	v.worldNormal = normalize( nR * 0.5 + VEG_UP + sideDir * ( across * 0.35 ) );
`,surface:`
	let hf = in.vs.vVegGrass.x;
	let kind = in.vs.vVegGrass.y;
	let duneF = in.vs.vVegGrass.z;
	let rnd = in.vs.vVegGrass.w;
	let across = in.vs.vVegGrass2.z;
	let dryBlade = in.vs.vVegGrass2.w;
	// self-shadowing of the sward: dark at the base of the clump
	let ao = mix( 0.32, 1.0, smoothstep( 0.0, 0.75, hf ) );
	// dune grass: olive base, straw tips; meadow: the terrain's meadow tone, dark and brownish
	// (dead leaf sheaths) at the base, lighter / sun-bleached towards the tips
	let duneBase = mix( ${$(6119986)}, ${$(8358464)}, rnd );
	let duneTip = mix( ${$(12102508)}, ${$(10134610)}, rnd );
	let tone = in.vs.vVegGrassTone.xyz * ( rnd * 0.34 + 0.83 );
	let lushBase = mix( tone * 0.5, VEG_MEADOW_SOIL, 0.3 );
	let tipDry = in.vs.vVegGrassTone.w * 0.4 + smoothstep( 0.8, 1.0, rnd ) * 0.35;
	let lushTip = mix( tone * vec3f( 1.25, 1.25, 1.05 ), VEG_MEADOW_STRAW, tipDry * smoothstep( 0.55, 1.0, hf ) );
	let gBase = mix( lushBase, duneBase, duneF );
	let gTip = mix( lushTip, duneTip, duneF );
	var grass0 = mix( gBase, gTip, smoothstep( 0.05, 0.95, hf ) );
	// dead blades: straw to brown
	grass0 = mix( grass0, mix( VEG_MEADOW_STRAW, VEG_MEADOW_SOIL * 1.8, rnd * 0.6 ) * ( smoothstep( 0.0, 0.5, hf ) * 0.4 + 0.6 ), dryBlade * ( 1.0 - duneF ) );
	// pale midrib
	grass0 = grass0 * ( pow( 1.0 - abs( across ), 6.0 ) * smoothstep( 0.05, 0.4, hf ) * 0.18 + 1.0 );
	// wind sheen: blades flattened by a gust show their paler undersides, so gusts read
	// as bright waves rolling across the grass
	let grass = mix( grass0, grass0 * vec3f( 1.3, 1.28, 1.1 ) + vec3f( 0.03, 0.03, 0.015 ), in.vs.vVegGust * smoothstep( 0.15, 0.9, hf ) * 0.6 );
	let oatStalk = mix( ${$(10263138)}, ${$(12759674)}, hf );
	let oatHead = mix( ${$(13218426)}, ${$(11047002)}, rnd );
	let centre = in.vs.vVegGrass2.y; // 1 at leaf / flower centre
	let vine = mix( mix( ${$(3035673)}, ${$(4879144)}, rnd ), ${$(8032074)}, centre * 0.3 ) * select( vec3f( 1.0 ), vec3f( 1.25, 1.05, 0.8 ), hf < 0.075 );
	let flower = mix( ${$(12076956)}, ${$(15919342)}, smoothstep( 0.35, 0.9, centre ) );
	let c = select( select( select( select( flower, vine, kind < 3.5 ), oatHead, kind < 2.5 ), oatStalk, kind < 1.5 ), grass, kind < 0.5 );
	let albedo = c * select( 1.0, ao, kind < 2.5 );
	s.albedo = albedo;
	s.roughness = select( 0.8, 0.45, kind > 2.5 && kind < 3.5 );
	s.metalness = 0.0;
	s.specularIntensity = 0.4;
	s.normal = normalize( normalize( in.vs.normal ) + in.V * 0.4 );
	// back-lit thin blades glow (evaluated in the lighting model with the shadowed light, so
	// grass in shadow does not)
	let back = pow( sat( dot( - in.V, frame.sunDir ) ), 4.0 );
	s.translucency = albedo * vec3f( 1.1, 1.3, 0.6 ) * ( back * 0.3 * smoothstep( 0.2, 1.0, hf ) ) * ( 1.0 - frame.night );
`})}var gu=`
struct VegBark { bark: vec3f, hd: f32 };
// (the last evaluation is remembered: the albedo and the trunk bump both ask for the same point)
var<private> vegBarkMemoKey: vec4f = vec4f( 3.0e38 );
var<private> vegBarkMemoIv: f32 = 3.0e38;
var<private> vegBarkMemo: VegBark;
fn vegPalmBark( y: f32, a: f32, H: f32, seed: f32, iv: f32 ) -> VegBark {
	let key = vec4f( y, a, H, seed );
	if ( all( key == vegBarkMemoKey ) && iv == vegBarkMemoIv ) { return vegBarkMemo; }
	vegBarkMemoKey = key;
	vegBarkMemoIv = iv;
	vegBarkMemo = _vegPalmBark( y, a, H, seed, iv );
	return vegBarkMemo;
}
fn _vegPalmBark( y: f32, a: f32, H: f32, seed: f32, iv: f32 ) -> VegBark {
	let A = a * 6.2832;
	let ca = cos( A ); let sa = sin( A );
	let yn = y / H;
	// rings: phase grows faster toward the crown, jittered per ring band and around the trunk
	let wob = ( vegNoise( vec2f( ca * 1.3 + y * 0.35, sa * 1.3 + seed * 9.0 ) ) - 0.5 ) * 0.7
		+ sin( A * 2.0 + y * 1.1 + seed * 5.0 ) * 0.1;
	let phase = y * mix( 8.5, 11.0, iv ) + pow( yn, 2.2 ) * H * 5.5 + vegNoise( vec2f( y * 0.8, seed * 7.3 ) ) * 3.2
		+ vegNoise( vec2f( y * 3.1, seed * 2.9 ) ) * 0.9 + wob;
	let k0 = floor( phase );
	// ragged ring edges: the scar line wanders a little around the trunk
	let phaseR = phase + ( vegNoise( vec2f( a * 38.0, k0 * 2.3 + seed * 5.0 ) ) - 0.5 ) * 0.22;
	let k = floor( phaseR );
	let fr = phaseR - k;
	// each ring scar has its own width and depth
	let rk = vegHash12( vec2f( k, seed * 13.7 ) );
	let gw = mix( 0.05, 0.14, rk );
	let groove = ( smoothstep( gw, 0.0, fr ) + smoothstep( 1.0 - gw * 0.6, 1.0, fr ) ) * mix( 0.45, 1.0, vegHash12( vec2f( k * 1.3, seed * 3.1 ) ) );
	let ridge = smoothstep( 0.07, 0.15, fr ) * smoothstep( 0.45, 0.16, fr );
	// partial rings: each ring fades out around part of the circumference
	let amp = smoothstep( 0.28, 0.6, vegNoise( vec2f( ca * 1.8 + k * 3.17, sa * 1.8 + k * 1.71 + seed * 11.0 ) ) ) * 0.75 + 0.25;
	// fine vertical fissures (level set of a vertically stretched noise) and bark plates
	let nf = vegNoise( vec2f( a * 54.0, y * 1.6 + seed * 41.0 ) );
	let nf2 = vegNoise( vec2f( a * 110.0, y * 3.4 + seed * 29.0 ) );
	// fissures: short, broken vertical splits (not continuous grain lines)
	let segA = smoothstep( 0.45, 0.62, vegNoise( vec2f( a * 30.0, y * 4.5 + seed * 9.0 ) ) );
	let segB = smoothstep( 0.5, 0.66, vegNoise( vec2f( a * 60.0 + 3.7, y * 9.0 + seed * 21.0 ) ) );
	let crack = max( smoothstep( 0.09, 0.0, abs( nf - 0.5 ) ) * segA, smoothstep( 0.06, 0.0, abs( nf2 - 0.5 ) ) * segB * 0.7 );
	let plate = vegNoise( vec2f( a * 24.0, y * 3.5 + seed * 17.0 ) );
	let blotch = vegNoise( vec2f( a * 6.0, y * 0.4 + seed * 13.0 ) );
	// grey-brown bark weathering to silver-grey, per palm
	var bark = mix( ${$(6182218)}, ${$(10787464)}, sat( blotch * 0.55 + plate * 0.25 + ( iv - 0.5 ) * 0.5 + yn * 0.15 ) );
	// warmer tan on some trees and in patches, dark weathered (rain-soaked) blotches
	bark = mix( bark, bark * vec3f( 1.12, 1.0, 0.82 ), sat( ( vegNoise( vec2f( a * 4.0, y * 0.25 + seed * 31.0 ) ) - 0.4 ) * 2.0 ) * iv );
	bark = bark * mix( 1.0, 0.72, smoothstep( 0.6, 0.8, vegNoise( vec2f( a * 5.0, y * 0.7 + seed * 43.0 ) ) ) );
	// fine mottling (rough, fibrous surface) and pale sun-bleached patches
	let mott = vegNoise( vec2f( a * 90.0, y * 80.0 + seed * 7.0 ) ) * 0.6 + vegNoise( vec2f( a * 35.0, y * 30.0 + seed * 3.0 ) ) * 0.4;
	bark = bark * ( mott * 0.45 + 0.78 ) * ( plate * 0.25 + 0.88 );
	bark = mix( bark, ${$(11775391)}, smoothstep( 0.55, 0.75, vegNoise( vec2f( a * 8.0, y * 1.3 + seed * 61.0 ) ) ) * 0.35 * ( 1.0 - yn * 0.5 ) );
	bark = bark * mix( 1.0, 0.7, groove * amp ) * ( ridge * amp * 0.1 + 1.0 ) * mix( 1.0, 0.5, crack );
	// lichen: pale grey-green crusts and white spots, a little orange; darker rain streaks
	let lic = smoothstep( 0.6, 0.72, vegNoise( vec2f( a * 9.0, y * 2.1 + seed * 23.0 ) ) + ( vegNoise( vec2f( a * 31.0, y * 7.0 ) ) - 0.5 ) * 0.3 ) * smoothstep( 0.9, 0.2, yn );
	let licC = mix( ${$(9343359)}, ${$(11118489)}, plate );
	bark = mix( bark, licC, lic * 0.5 );
	let streak = smoothstep( 0.62, 0.8, vegNoise( vec2f( a * 16.0, y * 0.12 + seed * 5.0 ) ) ) * smoothstep( 1.0, 0.6, yn );
	bark = bark * ( 1.0 - streak * 0.28 );
	// damp, dark base (splash of sand and soil) and the mass of exposed roots at the ground
	let baseK = smoothstep( 1.4, 0.2, y + ( blotch - 0.5 ) * 0.8 );
	bark = mix( bark, bark * vec3f( 0.62, 0.56, 0.48 ), baseK );
	let rootN = vegNoise( vec2f( a * 26.0, y * 2.2 + seed * 19.0 ) );
	let roots = smoothstep( 0.42, 0.05, y ) * smoothstep( 0.35, 0.6, rootN );
	bark = mix( bark, mix( ${$(3812898)}, ${$(6179382)}, rootN ), smoothstep( 0.5, 0.0, y ) * 0.85 );
	// fibrous old frond bases (boot) under the crown: criss-cross fibre mat, brown
	let boot = smoothstep( H - 1.0, H - 0.35, y + ( blotch - 0.5 ) * 0.3 );
	let fib = sin( A * 34.0 + y * 30.0 ) * sin( A * 34.0 - y * 30.0 ) * 0.5 + 0.5;
	bark = mix( bark, mix( ${$(5060386)}, ${$(9073740)}, fib * 0.6 + plate * 0.4 ), boot );
	var o: VegBark;
	o.bark = bark;
	o.hd = ( ridge * amp * 0.004 - groove * amp * 0.008 - crack * 0.006 + plate * 0.004 + mott * 0.004 + roots * 0.01 ) * ( 1.0 - boot ) + boot * fib * 0.004;
	return o;
}
`,_u=`
// Broadleaf plants (parts 6 monstera, 7 elephant ear, 8 heliconia leaf, 9 heliconia bract). Blade
// coordinates: y along the midrib (0 back of the basal lobes .. 1 tip), x across in units of the
// half-width W (m). Returns the outline half-width (x units) at y and whether a hole / slit / tear is
// cut at (y, x).
struct VegBroad { w: f32, cut: bool };
fn vegBroadShape( part: f32, y: f32, x: f32, age: f32, W: f32, fseed: f32, seed: f32 ) -> VegBroad {
	let ax = abs( x );
	var w = 0.0;
	var cut = false;
	// ragged, slightly irregular margin on every leaf (more on old ones)
	let rag = 1.0 - ( vegNoise( vec2f( y * 38.0 + select( 0.0, 17.0, x > 0.0 ), fseed * 31.0 ) ) * 0.05 + age * age * 0.12 * vegNoise( vec2f( y * 11.0, fseed * 7.0 + x ) ) );
	if ( part < 6.5 ) {
		// monstera: cordate blade, basal lobes behind the petiole, V sinus; mature leaves are split
		// from the margin between the primary veins, with a row of holes (fenestrations) inside
		let yb = 0.16;
		let g = ( y - yb ) / ( 1.0 - yb );
		if ( y >= yb ) {
			w = pow( max( sin( 3.14159 * min( 1.0, 0.4 + 0.6 * g ) ), 0.0 ), 0.8 ) * ( 1.0 - 0.15 * smoothstep( 0.8, 1.0, g ) );
		} else {
			let q = ( yb - y ) / yb;
			w = sqrt( max( 1.0 - q * q * q, 0.0 ) ) * 0.96;
			cut = ax < 0.3 * ( 1.0 - y / yb );
		}
		w *= rag;
		let matK = smoothstep( 0.28, 0.45, age );
		if ( matK > 0.0 && y > yb * 0.4 && y < 0.93 ) {
			let L = W / 0.47;
			let X = ax * W;
			let Y = ( y - yb ) * L;
			let p = ( Y - 0.55 * X ) / ( L * 0.8 / 5.5 ) + fseed * 0.37;
			let k = floor( p + 0.5 );
			let e = abs( p - k ); // 0 on the gap between two primary veins
			let hk = vegHash12( vec2f( k + select( 0.0, 50.0, x > 0.0 ), fseed * 19.3 ) );
			let r = ax / max( w, 0.05 );
			let depth = mix( 0.42, 0.75, hk ) + ( 1.0 - matK ) * 0.4;
			// slits widen toward the margin, their inner end rounded
			let slit = e < 0.035 + 0.1 * smoothstep( depth, 1.0, r ) && r > depth - 0.03;
			// fenestrations: one or two elongated holes along the gap line, inside the slit
			let r0 = 0.14; let r1 = depth - 0.1;
			let qh = ( r - r0 ) / max( r1 - r0, 0.05 );
			let nh = select( 1.0, 2.0, hk > 0.45 );
			let qq = fract( qh * nh );
			let hole = qh > 0.0 && qh < 1.0 && e < 0.16 * pow( sin( 3.14159 * qq ), 0.6 ) * matK && hk > 0.12;
			cut = cut || slit || hole;
		}
	} else if ( part < 7.5 ) {
		// elephant ear: peltate blade (petiole joins inside it), rounded basal lobes, acute tip
		let yb = 0.3;
		let g = ( y - yb ) / ( 1.0 - yb );
		if ( y >= yb ) {
			w = pow( max( sin( 3.14159 * min( 1.0, 0.5 + 0.5 * g ) ), 0.0 ), 0.85 );
		} else {
			let q = ( yb - y ) / yb;
			w = sqrt( max( 1.0 - pow( q, 1.6 ), 0.0 ) ) * 0.98;
			cut = y < 0.1 && ax < 0.2 * ( 1.0 - y / 0.1 );
		}
		w *= rag;
	} else if ( part < 8.5 || ( part > 9.5 && part < 10.5 ) ) {
		// heliconia / bird of paradise: paddle blade, torn along the lateral veins (more on old leaves)
		w = pow( max( sin( 3.14159 * min( y * 1.02, 1.0 ) ), 0.0 ), 0.5 ) * ( 1.0 - 0.3 * smoothstep( 0.75, 1.0, y ) ) * rag;
		let xl = y * 22.0 + ax * 1.2 + sin( y * 31.0 + fseed * 10.0 ) * 0.3;
		let k = floor( xl );
		let r1 = vegHash12( vec2f( k + select( 0.0, 40.0, x > 0.0 ), fseed * 7.7 ) );
		let r2 = vegHash12( vec2f( k + 0.5, fseed * 3.3 + seed ) );
		let fx = abs( fract( xl ) - 0.5 );
		cut = r1 < select( 0.12, 0.2, part > 9.5 ) + age * 0.45 && ax / max( w, 0.05 ) > mix( 0.25, 0.8, r2 ) && fx > 0.44;
	} else if ( part < 9.5 ) {
		// bract: boat-shaped, pointed
		w = sin( 3.14159 * min( 1.0, 0.15 + y * 0.9 ) ) * ( 1.0 - 0.4 * smoothstep( 0.7, 1.0, y ) );
	} else {
		// bird of paradise flower pieces: pointed
		w = sin( 3.14159 * min( 1.0, 0.1 + y * 0.9 ) ) * ( 1.0 - 0.5 * smoothstep( 0.6, 1.0, y ) );
	}
	if ( part < 7.5 ) {
		let dmg = vegNoise( vec2f( y * 26.0 + fseed * 17.0, x * 11.0 + seed * 9.0 ) );
		cut = cut || dmg > 0.95 - age * 0.08;
	}
	var o: VegBroad;
	o.w = w;
	o.cut = cut;
	return o;
}

fn vegBroadAlbedo( part: f32, y: f32, x: f32, age: f32, W: f32, fseed: f32, seed: f32, iv: f32, hGround: f32 ) -> vec3f {
	let ax = abs( x );
	let fr = vegHash12( vec2f( fseed * 51.3, seed * 17.9 ) );
	let n1 = vegNoise( vec2f( y * 9.0 + fseed * 13.0, x * 4.0 ) );
	let n2 = vegNoise( vec2f( y * 37.0 + fseed * 3.0, x * 17.0 + seed * 5.0 ) );
	var c = vec3f( 0.0 );
	if ( part < 6.5 ) {
		// monstera: deep glossy green, juvenile leaves lighter yellow-green, old ones yellowing
		var g = mix( ${$(2243349)}, ${$(3297053)}, iv * 0.6 + fr * 0.4 );
		g = mix( ${$(5205800)}, g, smoothstep( 0.1, 0.35, age ) );
		g = mix( g, ${$(10129726)}, smoothstep( 0.85, 0.97, age ) * ( 0.6 + 0.4 * n1 ) );
		c = g * ( n1 * 0.16 + 0.92 );
		// primary veins a touch paler, midrib pale
		let L = W / 0.47;
		let p = ( ( y - 0.16 ) * L - 0.55 * ax * W ) / ( L * 0.8 / 5.5 ) + fseed * 0.37;
		let rib = smoothstep( 0.1, 0.0, abs( fract( p ) - 0.5 ) ) * step( 0.16, y );
		c = c * ( 1.0 + rib * 0.12 );
		c = mix( c, ${$(8427850)}, smoothstep( 0.03, 0.0, ax * W ) * 0.7 );
	} else if ( part < 7.5 ) {
		// elephant ear: mid green, pale veins radiating from where the petiole joins
		var g = mix( ${$(3364894)}, ${$(4878632)}, iv * 0.6 + fr * 0.4 );
		g = mix( g, ${$(9998655)}, smoothstep( 0.85, 0.97, age ) * ( 0.6 + 0.4 * n1 ) );
		let ang = atan2( ax * W, ( y - 0.3 ) * W / 0.4 );
		let vein = smoothstep( 0.1, 0.0, abs( fract( ang * 2.6 ) - 0.5 ) - 0.38 ) * 0.7;
		c = g * ( n1 * 0.14 + 0.93 );
		c = mix( c, ${$(8361560)}, vein * 0.35 + smoothstep( 0.025, 0.0, ax * W ) * step( 0.3, y ) * 0.5 );
	} else if ( part > 10.5 ) {
		// bird of paradise flower: beak green-grey with a purple-red keel, orange sepals, blue tongue
		let beak = mix( mix( ${$(5991242)}, ${$(7024442)}, smoothstep( 0.3, 0.9, ax ) * 0.7 ), ${$(12611642)}, smoothstep( 0.8, 1.0, y ) * 0.4 );
		let sepal = mix( ${$(14709788)}, ${$(15768106)}, n1 );
		let tongue = mix( ${$(2899866)}, ${$(4217016)}, n1 );
		return select( select( beak, sepal, age > 0.25 ), tongue, age > 0.75 );
	} else if ( part > 9.5 ) {
		// bird of paradise leaf: glaucous grey-green, pale midrib
		var g = mix( ${$(4086326)}, ${$(5204547)}, iv * 0.6 + fr * 0.4 );
		g = mix( g, ${$(9407050)}, smoothstep( 0.8, 0.95, age ) );
		c = g * ( n1 * 0.1 + 0.95 );
		c = mix( c, ${$(10725496)}, smoothstep( 0.015, 0.0, ax * W ) * 0.6 );
	} else if ( part < 8.5 ) {
		var g = mix( ${$(3562784)}, ${$(4944425)}, iv * 0.6 + fr * 0.4 );
		g = mix( g, ${$(9407034)}, smoothstep( 0.8, 0.95, age ) );
		c = g * ( ( sin( y * 180.0 + ax * 30.0 ) * 0.5 + 0.5 ) * 0.06 + 0.95 ) * ( n1 * 0.12 + 0.94 );
		c = mix( c, ${$(11188334)}, smoothstep( 0.02, 0.0, ax * W ) * 0.7 );
	} else {
		// heliconia bract: scarlet, yellow lip, green tip on the youngest (top) bracts
		c = mix( ${$(9312786)}, ${$(12397082)}, n1 * 0.6 + fr * 0.4 );
		c = mix( c, ${$(14925112)}, smoothstep( 0.62, 0.9, ax ) );
		c = mix( c, ${$(7113262)}, smoothstep( 0.8, 1.0, y ) * smoothstep( 0.6, 1.0, age ) * 0.7 );
		return c;
	}
	// weathering: browned dry margins and tips, fungal spots, splashed soil on low leaves
	let edge = smoothstep( 0.8, 1.0, ax + n2 * 0.25 - 0.1 ) * ( 0.25 + age * 0.9 );
	c = mix( c, mix( ${$(8087097)}, ${$(5915944)}, n2 ), sat( edge ) * 0.85 );
	let spot = vegNoise( vec2f( y * 14.0 + fseed * 9.0, x * 6.0 + seed * 3.0 ) );
	c = mix( c, ${$(6181939)}, smoothstep( 0.86, 0.93, spot ) * 0.5 * ( 0.4 + age ) );
	c = mix( c, ${$(7101509)}, smoothstep( 0.55, 0.0, hGround ) * smoothstep( 0.5, 0.75, n2 ) * 0.5 );
	// dead leaves: brown and papery
	c = mix( c, mix( ${$(7231028)}, ${$(9402958)}, n1 ), smoothstep( 0.93, 0.99, age ) );
	return c;
}

fn vegBroadStem( part: f32, a: f32, f: f32, seed: f32, age: f32 ) -> vec3f {
	let n = vegNoise( vec2f( a * 6.0, f * 30.0 + seed * 11.0 ) );
	if ( part < 6.5 ) { return mix( ${$(4876842)}, ${$(6061107)}, n ) * mix( 1.0, 0.8, smoothstep( 0.7, 1.0, age ) ); }
	if ( part < 7.5 ) { return mix( ${$(5663284)}, ${$(6113852)}, n * 0.5 ); }
	if ( part < 8.5 ) { return mix( mix( ${$(4877102)}, ${$(6387514)}, n ), ${$(5917232)}, smoothstep( 0.6, 0.8, vegNoise( vec2f( a * 3.0, f * 8.0 + seed * 5.0 ) ) ) * 0.6 ); }
	if ( part > 9.5 ) { return mix( ${$(5596746)}, ${$(7173720)}, n ); }
	return ${$(9312786)};
}
`,vu=new g({name:`vegPlant`,deps:[Wl],code:gu+_u+`
// alpha mask (fronds / pinnae / torn banana blades) + the LOD cross-fade of the instance
fn vegPlantMask( in: FragInput ) -> bool {
	let st = in.uv;
	let s = st.x;
	let t = st.y;
	let fwS = fwidth( s ); // evaluated in uniform control flow, before the branches
	let aMat = in.vs.vMat;
	let part = aMat.x; let age = aMat.y; let Ll = aMat.z; let fseed = aMat.w;
	let seed = in.vs.vIDat.w;
	var m = 1.0;
	if ( part > 0.5 && part < 1.5 ) {
		// coconut frond: ~95 narrow leaflets per side (100-125 on a real frond), separated by gaps
		// that show the sky; leaflets bunch and spread irregularly, some are short, split or torn
		// away (runs of missing leaflets, more on old fronds)
		let N = 95.0;
		let x = s * N + ( vegNoise( vec2f( s * 7.0, fseed * 23.0 + seed * 3.0 ) ) - 0.5 ) * 2.2;
		let k = floor( x );
		let r1 = vegHash12( vec2f( k, fseed * 91.7 ) );
		let r2 = vegHash12( vec2f( k * 1.37 + 3.1, fseed * 17.3 + seed * 5.0 ) );
		let fx = fract( x ) - 0.5 - ( r1 - 0.5 ) * 0.35;
		let tEnd = mix( 0.72, 1.0, r2 ) * select( 1.0, 0.45, r1 < 0.06 );
		let tt = t / tEnd;
		let hw = pow( max( 1.0 - tt, 0.0 ), 0.6 ) * 0.22 * ( smoothstep( 0.0, 0.1, tt ) * 0.4 + 0.6 );
		// split leaflets: a slit from the tip back along the midvein
		let split = r2 > 0.9 && tt > mix( 0.35, 0.7, r1 ) && abs( fx ) < hw * 0.3;
		// torn-out runs of leaflets
		let torn = vegNoise( vec2f( k * 0.21 + seed * 17.0, fseed * 37.0 ) ) > 0.83 - age * 0.2 && s > 0.3;
		// sub-pixel leaflets widen instead of aliasing (fronds turn solid in the distance)
		let hwE = max( hw, min( fwS * ( N * 0.6 ), 0.5 ) * select( 0.0, 1.0, tt < 1.0 ) );
		let leaf = abs( fx ) < hwE && tt < 1.0 && s > 0.06 && ! split && ! torn;
		let rachis = t * Ll < 0.026;
		m = select( 0.0, 1.0, leaf || rachis );
	} else if ( part > 1.5 && part < 2.5 ) {
		// fern: rounded pinnae
		let N = 26.0;
		let x = s * N;
		let k = floor( x );
		let r2 = vegHash12( vec2f( k, fseed * 31.1 ) );
		let fx = fract( x ) - 0.5;
		let tt = t / mix( 0.8, 1.0, r2 );
		let hw = sqrt( max( 1.0 - tt * tt, 0.0 ) ) * 0.34;
		let hwE = max( hw, min( fwS * ( N * 0.6 ), 0.5 ) * select( 0.0, 1.0, tt < 1.0 ) );
		let leaf = abs( fx ) < hwE && tt < 1.0 && s > 0.04;
		let rachis = t * Ll < 0.006;
		m = select( 0.0, 1.0, leaf || rachis );
	} else if ( part > 2.5 && part < 3.5 && s >= 0.0 ) {
		// banana: full blade, torn along lateral veins, ragged edge
		let x = s * 13.0 + sin( s * 31.0 + fseed * 10.0 ) * 0.35;
		let k = floor( x );
		let r1 = vegHash12( vec2f( k, fseed * 7.7 ) );
		let r2 = vegHash12( vec2f( k + 0.5, fseed * 3.3 + seed ) );
		let fx = abs( fract( x ) - 0.5 );
		// dead leaves are shredded
		let dead = step( 0.8, age );
		// wind-torn strips: most tears start at the margin and run in along the veins, more on older
		// leaves; dead leaves are shredded
		let tear = r1 < mix( 0.45 + age * 0.6, 0.95, dead ) && t > mix( 0.12, 0.75, r2 ) * mix( 1.0, 0.4, dead ) && fx > mix( 0.45, 0.37, r2 ) - dead * 0.12;
		let edge = t < 0.985 - vegNoise( vec2f( s * 60.0, fseed * 9.0 ) ) * 0.07;
		m = select( 0.0, 1.0, ! tear && edge );
	} else if ( part > 5.5 && s >= 0.0 ) {
		// broadleaf blades (petioles, s < 0, are kept whole)
		let sh = vegBroadShape( part, s, t, age, Ll, fseed, seed );
		m = select( 0.0, 1.0, abs( t ) < sh.w && ! sh.cut );
	}
	return m > 0.5 && vegLodDither( in.vs.vIPos, draw.params.yzw, in.pixel );
}

fn vegPlantAlbedo( in: FragInput ) -> vec3f {
	let st = in.uv;
	let s = st.x;
	let t = st.y;
	let aMat = in.vs.vMat;
	let part = aMat.x; let age = aMat.y; let Ll = aMat.z; let fseed = aMat.w;
	let seed = in.vs.vIDat.w;
	let H = in.vs.vIDat.z;
	var col = vec3f( 0.0 );
	let iv = vegHash12( vec2f( seed * 37.1, 1.7 ) );
	if ( part < 0.5 ) {
		// stems: age 0 -> weathered, ringed palm trunk; 1 -> green banana pseudostem
		let y = in.vs.vTrunkY;
		let a = st.x;
		let bark = vegPalmBark( y, a, H, seed, iv ).bark;
		// (palm trunks have age 0: the pseudostem colour only where it is mixed in)
		var green = vec3f( 0.0 );
		if ( age > 0.0 ) {
			let fiss = vegNoise( vec2f( a * 46.0, y * 1.1 + seed * 50.0 ) );
			let blotch = vegNoise( vec2f( a * 7.0, y * 0.45 + seed * 13.0 ) );
			// banana pseudostem: overlapping sheaths (vertical streaks), dark blotches, dry brown
			// sheath strips peeling off low down (no leaf-scar rings)
			let streakS = vegNoise( vec2f( a * 24.0, y * 0.35 + seed * 7.0 ) );
			green = mix( ${$(5138986)}, ${$(7046200)}, streakS * 0.7 + fiss * 0.3 );
			green = mix( green, ${$(3879714)}, smoothstep( 0.62, 0.82, blotch ) * 0.55 );
			green = mix( green, mix( ${$(7230772)}, ${$(9402962)}, fiss ), smoothstep( 0.55, 0.75, streakS ) * smoothstep( 1.1, 0.3, y ) );
		}
		col = mix( bark, green, age );
	} else if ( part < 1.5 ) {
		// age (aMat.y): 0 young upper fronds (lighter yellow-green) .. 0.55 old lower fronds (olive,
		// yellowing); 1 = the two hanging fronds, whose state is picked per tree and frond (one crown
		// mesh is shared): still olive, yellowing or dead brown
		let fr = vegHash12( vec2f( fseed * 51.3, seed * 17.9 ) );
		let a = sat( age / 0.55 );
		var g = mix( ${$(7506995)}, ${$(4480807)}, smoothstep( 0.0, 0.35, a ) );
		g = mix( g, ${$(6909999)}, smoothstep( 0.55, 1.0, a ) );
		// per tree: yellower or bluer greens; per frond: value
		g = mix( g, g * vec3f( 1.12, 1.02, 0.78 ), iv * 0.8 );
		g = mix( g, g * vec3f( 0.86, 0.98, 1.08 ), ( 1.0 - iv ) * 0.5 );
		g = g * mix( 0.82, 1.1, fr );
		// leaflets: darker toward their tips, paler at the base, each a little different
		let kL = floor( s * 95.0 );
		let perLeaf = vegHash12( vec2f( kL, fseed * 13.1 ) );
		var c = g * mix( 1.08, 0.86, smoothstep( 0.2, 1.0, t ) ) * ( perLeaf * 0.22 + 0.9 );
		// browned, dried tips on some leaflets (more on old fronds)
		let tipK = smoothstep( 0.72, 0.97, t ) * step( 0.55 - a * 0.35, vegHash12( vec2f( kL * 1.7, fseed * 5.3 + seed ) ) );
		c = mix( c, mix( ${$(9206346)}, ${$(7232313)}, perLeaf ), tipK * 0.85 );
		// hanging fronds
		let hangK = smoothstep( 0.8, 0.95, age );
		let state = vegHash12( vec2f( fseed * 7.1, seed * 29.3 ) );
		let yellowing = mix( ${$(9407036)}, ${$(10521157)}, perLeaf );
		let deadC = mix( ${$(8021056)}, ${$(6048304)}, perLeaf );
		let hangC = select( select( c * 0.9, yellowing, state > 0.35 ), deadC, state > 0.62 );
		c = mix( c, hangC, hangK );
		// midrib: pale yellow on young fronds, straw on old, brown when dead
		let rachis = t * Ll < 0.026;
		let rib = mix( mix( ${$(11773536)}, ${$(9996622)}, a ), ${$(7297594)}, hangK * step( 0.62, state ) );
		col = select( c, rib, rachis );
	} else if ( part < 2.5 ) {
		let c = mix( ${$(3431456)}, ${$(5603372)}, smoothstep( 0.1, 1.0, s ) * 0.6 + iv * 0.4 );
		col = c * mix( 0.85, 1.1, vegHash12( vec2f( floor( s * 26.0 ), fseed ) ) );
	} else if ( part < 3.5 ) {
		if ( s < 0.0 ) {
			// banana pseudostem: overlapping sheaths (vertical streaks), brown / purple-black blotches,
			// dry brown sheath fibre peeling low down
			let f = ( s + 1.0 ) * 2.0;
			let a = t;
			let streakS = vegNoise( vec2f( a * 26.0, f * 3.0 + fseed * 7.0 ) );
			let blotch = vegNoise( vec2f( a * 9.0, f * 6.0 + fseed * 13.0 ) );
			var gS = mix( ${$(5596974)}, ${$(7241018)}, streakS * 0.7 + iv * 0.3 );
			gS = mix( gS, ${$(3811880)}, smoothstep( 0.6, 0.8, blotch ) * 0.6 );
			let dry = smoothstep( 0.45, 0.7, vegNoise( vec2f( a * 14.0 + 3.0, f * 2.5 + fseed * 19.0 ) ) ) * smoothstep( 0.8, 0.2, f );
			col = mix( gS, mix( ${$(6967859)}, ${$(9337426)}, streakS ), dry * 0.9 );
		} else {
			// blade: muted green (per plant and leaf), paler midrib, faint lateral veins; dried, browned
			// margins and torn strip edges; old leaves yellowing; dead ones brown and papery
			let lf = vegHash12( vec2f( fseed * 23.1, seed * 3.7 ) );
			var base = mix( ${$(4153124)}, ${$(5600301)}, iv * 0.55 + lf * 0.45 );
			base = mix( base, ${$(8158517)}, smoothstep( 0.35, 0.6, age ) * 0.55 );
			let vein = ( sin( s * 260.0 ) * 0.5 + 0.5 ) * 0.07;
			let mott = vegNoise( vec2f( s * 11.0 + fseed * 3.0, t * 4.0 ) );
			var c = base * ( vein + 0.94 ) * ( mott * 0.14 + 0.93 );
			c = mix( c, ${$(11120750)}, smoothstep( 0.05, 0.0, t ) * 0.75 ); // midrib
			let xs = s * 13.0 + sin( s * 31.0 + fseed * 10.0 ) * 0.35;
			let stripEdge = smoothstep( 0.36, 0.47, abs( fract( xs ) - 0.5 ) ) * smoothstep( 0.4, 0.8, t ) * ( 0.3 + age );
			let dryEdge = smoothstep( 0.72, 1.0, t + ( vegNoise( vec2f( s * 25.0, fseed * 4.0 ) ) - 0.5 ) * 0.3 ) * ( 0.45 + age * 0.8 );
			let brownC = mix( ${$(7034161)}, ${$(9402952)}, mott );
			c = mix( c, brownC, sat( max( dryEdge, stripEdge * 0.6 ) ) * 0.85 );
			let deadC = mix( ${$(6179372)}, ${$(8810570)}, vegNoise( vec2f( s * 18.0, t * 3.0 + fseed * 5.0 ) ) );
			c = mix( c, deadC, smoothstep( 0.85, 0.95, age ) );
			col = c;
		}
	} else if ( part > 5.5 ) {
		let hGround = in.P.y - in.vs.vIPos.y;
		if ( s < 0.0 ) {
			col = vegBroadStem( part, t, ( s + 1.0 ) * 2.0, fseed, age );
		} else {
			col = vegBroadAlbedo( part, s, t, age, Ll, fseed, seed, iv, hGround );
		}
	} else {
		// coconuts: green -> yellow -> brown
		col = mix( mix( ${$(6845994)}, ${$(10258996)}, smoothstep( 0.3, 0.7, age ) ), ${$(6045986)}, smoothstep( 0.82, 0.95, age ) );
	}
	return col;
}
`}),yu={iPos:`vec4f`,iDat:`vec4f`,aVeg:`vec4f`,aMat:`vec4f`,aLobe:`vec4f`};function bu(){return new qe({name:`veg-plant-leaf`,side:`double`,modules:[Wl,vu],attributes:yu,varyings:{vTrunkY:`f32`,vTrunkT:`vec3f`,vMat:`vec4f`,vIDat:`vec4f`,vIPos:`vec3f`},vertex:`
	let pl = vegPlantDeform( ( v.model * vec4f( v.position, 1.0 ) ).xyz, vegInstanceNormal( v.model, v.normal ), v.iPos, v.iDat, v.aVeg, v.aMat, v.aLobe, draw.params.yzw );
	v.useWorld = true;
	v.worldPos = pl.pos;
	v.worldNormal = pl.normal;
	o.vTrunkY = pl.trunkY;
	o.vTrunkT = pl.trunkT;
	o.vMat = v.aMat;
	o.vIDat = v.iDat;
	o.vIPos = v.iPos.xyz;`,surface:`
	if ( ! vegPlantMask( in ) ) { discard; }
	let aMat = in.vs.vMat;
	let part = aMat.x;
	let age = aMat.y;
	let isStem = part < 0.5;
	let isNut = part > 4.5 && part < 5.5;
	let isLeaf = ! isStem && ! isNut;
	let isBroad = part > 5.5;
	var albedo = vegPlantAlbedo( in );
	// the underside of fronds and leaves is duller and a little bluer than the waxy upper side
	let upper = in.front;
	albedo = select( albedo * vec3f( 0.74, 0.8, 0.84 ), albedo, upper || ! isLeaf );
	s.albedo = albedo;
	// stems: leaf-scar ring bump along the trunk axis; leaves: normals bent slightly towards
	// the viewer to soften grazing-angle Fresnel
	// palm trunks: bark relief (rings, fissures, roots, fibres) along the trunk axis (finite
	// difference of the bark height, faded with distance); leaves: normals bent towards the viewer
	var d = 0.0;
	var dA = 0.0;
	let fadeB = 1.0 - smoothstep( 10.0, 32.0, length( frame.cameraPos - in.P ) );
	if ( isStem && fadeB > 0.0 ) {
		let seed = in.vs.vIDat.w;
		let H = in.vs.vIDat.z;
		let y = in.vs.vTrunkY;
		let a = in.uv.x;
		let ivN = vegHash12( vec2f( seed * 37.1, 1.7 ) );
		let e = 0.004;
		let ea = 0.0015; // around the trunk (a: 0..1 over a ~1.1 m circumference)
		let h0 = vegPalmBark( y, a, H, seed, ivN ).hd;
		let slope = ( vegPalmBark( y + e, a, H, seed, ivN ).hd - h0 ) / e;
		let slopeA = ( vegPalmBark( y, a + ea, H, seed, ivN ).hd - h0 ) / ( ea * 1.1 );
		d = slope * fadeB * ( 1.0 - age );
		dA = slopeA * fadeB * ( 1.0 - age );
	}
	s.normal = normalize( in.N - in.vs.vTrunkT * d - cross( in.N, in.vs.vTrunkT ) * dA + in.V * select( 0.0, 0.15, isLeaf ) );
	// waxy but not glossy: a sharper, stronger sheen mirrored the bright sky near the sun and read as a
	// white film over backlit foliage
	// broadleaf: monstera glossy, elephant ear waxy-matte, heliconia satin, bracts glossy; dead
	// leaves dull
	let broadR = select( select( select( 0.45, 0.42, part > 7.5 ), 0.58, part > 6.5 && part < 7.5 ), 0.46, part < 6.5 );
	s.roughness = select( select( select( 0.7, 0.62, part < 1.5 || isNut ), 0.92, isStem ), mix( broadR, 0.85, smoothstep( 0.9, 0.98, age ) ), isBroad );
	s.metalness = 0.0;
	s.specularIntensity = select( select( 0.4, 0.3, isStem ), 0.42, isBroad );
	s.translucency = vec3f( 0.0 );
	if ( isLeaf ) { s.translucency = vegTranslucency( albedo, in.N, select( 0.3, 0.2, isBroad ), in.P ); }`,shadow:`return vegPlantMask( in );`})}var xu=e=>`
	let iPos = v.iPos;
	let iDat = v.iDat;
	let veg = v.aVeg;
	let base = iPos.xyz;
	let sc = iPos.w;
	let Hh = iDat.z;
	let seed = iDat.w;
	let hf = veg.x;
	let flex = veg.y;
	let flut = veg.z;
	let ph = veg.w;
	var P = ( v.model * vec4f( v.position, 1.0 ) ).xyz;
	let isShrubI = iDat.y < 0.0;
	var keep = 1.0;
${e?`
	// merged tree + shrub geometry: keep the parts of this instance's plant type
	let isShrubPart = v.aMat.x > 3.5;
	keep = select( 0.0, 1.0, isShrubPart == isShrubI );
	// leaf cards move towards their lobe centre by the variant's lobe scale (0: dropped lobe)
	let lobe = v.aLobe;
	let lk = select( 0.0, 1.0 - vegLobeScale( seed, lobe.w, isShrubI ), lobe.w >= 0.0 );
	let ld = lobe.xyz * lk;
	let yaw = iDat.x; let cy = cos( yaw ); let sy = sin( yaw );
	let sv = abs( iDat.y );
	P += vec3f( ld.x * cy + ld.z * sy, ld.y * sv, ld.z * cy - ld.x * sy ) * sc;
`:``}
	let N = vegInstanceNormal( v.model, v.normal );
	let w = vegWindStrength();
	let g = vegGustAt( base.xz );
	let t = frame.time;
	let ph0 = seed * 6.2832;
	let h2 = hf * hf;
	let sway = ( w * w * 0.009 * ( g * 0.8 + 0.3 ) + sin( t * 0.9 + ph0 ) * w * 0.0045 * ( g + 0.4 ) ) * Hh * h2;
	let swayP = sin( t * 0.67 + ph0 * 1.3 ) * w * 0.002 * Hh * h2;
	let branch = sin( t * ( ph + 1.7 ) + ph * 20.0 + ph0 ) * flex * w * sc * 0.07 * ( g + 0.5 )
		- flex * w * w * sc * 0.04 * ( g + 0.3 ); // branches sag / stream in strong gusts
	let flutter = sin( t * 9.5 + ph * 50.0 + P.x * 1.9 + P.z * 2.3 ) * flut * sc * ( w * 0.035 + 0.005 );
	let pos = P + vegWindDir3() * sway + vegWindPerp3() * swayP + VEG_UP * branch + N * flutter;
	// near LOD: trees and shrubs hand over to the impostors at their own distance
	let dCam = length( vegParams.camPos - base );
	let nearK = select( 0.0, 1.0, dCam < select( vegParams.canopyNear.x, vegParams.canopyNear.y, isShrubI ) * ( 1.0 + VEG_LOD_BAND / 2.0 ) );
	v.useWorld = true;
	v.worldPos = base + ( pos - base ) * ( keep * nearK );
	v.worldNormal = N;
`,Su=zl.fields.canopyNear,Cu=new g({name:`vegCanopy`,deps:[Wl],code:`
fn vegPick4( s4: f32, a: vec3f, b: vec3f, c: vec3f, d: vec3f ) -> vec3f { return select( select( select( d, c, s4 < 2.5 ), b, s4 < 1.5 ), a, s4 < 0.5 ); }
fn vegPick3( s3: f32, a: vec3f, b: vec3f, c: vec3f ) -> vec3f { return select( select( c, b, s3 < 1.5 ), a, s3 < 0.5 ); }
fn vegTreeSpecies( seed: f32 ) -> f32 { return floor( fract( seed * 5.31 ) * 4.0 ); }
// shrubs: 0 sea grape 45 %, 1 croton 15 %, 2 hibiscus 40 %
fn vegShrubSpecies( seed: f32 ) -> f32 {
	let h = fract( seed * 3.17 );
	return select( select( 2.0, 1.0, h < 0.6 ), 0.0, h < 0.45 );
}

// base leaf colour of an instance (species, per-card random cr, per-instance tint)
fn vegCanopyLeafColor( seed: f32, cr: f32, isShrub: bool ) -> vec3f {
	let spT = vegTreeSpecies( seed ); let spS = vegShrubSpecies( seed );
	// tree species: dark glossy (bronze flush), fresh mid green, yellow-green, blue-green
	// (Caribbean hillside forest: deep, olive and yellow-greens, muted, with a few dry / bronze
	// and flowering crowns)
	let t0 = mix( mix( ${$(2636315)}, ${$(3557923)}, cr ), ${$(6179374)}, smoothstep( 0.96, 0.995, cr ) * 0.5 );
	let t1 = mix( ${$(3426591)}, ${$(4742183)}, cr );
	let t2 = mix( ${$(5200423)}, ${$(6580785)}, cr );
	let t3 = mix( ${$(2767658)}, ${$(3820086)}, cr );
	let s0 = mix( ${$(4150562)}, ${$(5400106)}, cr );
	let s1 = mix( ${$(2900510)}, ${$(4478495)}, cr );
	let s2 = mix( ${$(3428892)}, ${$(4613668)}, cr );
	let iv = vegHash12( vec2f( seed * 17.3, 4.1 ) );
	let iv2 = vegHash12( vec2f( seed * 5.9, 8.3 ) );
	var c = select( vegPick4( spT, t0, t1, t2, t3 ), vegPick3( spS, s0, s1, s2 ), isShrub ) * ( iv * 0.36 + 0.74 );
	// a few trees dry / dropping leaves (brown-olive), or flowering (flamboyant, orange-red)
	let treeK = select( 1.0, 0.0, isShrub );
	let dry = step( iv2, 0.035 ) * treeK;
	c = mix( c, mix( ${$(6050356)}, ${$(7232058)}, cr ), dry * 0.5 );
	let flower = step( 0.988, iv2 ) * treeK * step( 0.5, cr );
	c = mix( c, ${$(9062956)}, flower * 0.5 );
	return mix( vec3f( luminance( c ) ), c, 0.85 );
}

fn vegBarkColor( n: f32, n2: f32 ) -> vec3f {
	return mix( mix( ${$(3156514)}, ${$(6051145)}, n * 0.6 + n2 * 0.4 ), ${$(8092522)}, smoothstep( 0.64, 0.8, n2 ) * 0.3 );
}

// leaf-cluster tile of a card: trees broad / narrow leaves by species, shrubs round / narrow
fn vegLeafTile( seed: f32, isShrub: bool ) -> f32 {
	let spT = vegTreeSpecies( seed ); let spS = vegShrubSpecies( seed );
	return select( select( 0.0, 1.0, fract( spT * 0.5 ) > 0.25 ), select( 2.0, 3.0, spS == 1.0 ), isShrub );
}

// alpha-test threshold compensating the coverage loss of the minified (mipmapped) leaf texture
fn vegCoverageThreshold( st: vec2f ) -> f32 {
	let lod = log2( max( max( fwidth( st.x ), fwidth( st.y ) ) * 256.0, 1e-4 ) );
	return mix( 0.5, 0.3, sat( lod / 4.0 ) );
}

// Runtime colour of an impostor fragment (same palette as the near canopy)
fn vegImpostorColor( seed: f32, cr: f32, leaf: f32, bright: f32, isGroup1: bool ) -> vec3f {
	let leafC = vegCanopyLeafColor( seed, cr, isGroup1 ) * ( bright * 1.4 );
	// limbs and twigs seen through the crown gaps are in the crown's shade: dark and a little
	// green-brown, and the leaves dominate the blend (grey limbs made far crowns read grey-beige)
	let barkC = mix( ${$(1841683)}, ${$(3025696)}, ( bright - 0.4 ) / 0.5 );
	let c = mix( barkC, leafC, smoothstep( 0.05, 0.55, leaf ) );
	// far crowns keep their green through the haze (a little more saturated than the near canopy)
	return max( mix( vec3f( luminance( c ) ), c, 1.25 ), vec3f( 0.0 ) );
}
`}),wu=`
fn vegCanopyMask( in: FragInput, L: vec4f ) -> bool {
	let part = in.vs.vMat.x;
	let isBark = part < 0.5 || part > 4.5;
	// cross-fade into the impostors (outgoing level of the band around uCanopyNear)
	let nearD = select( vegParams.canopyNear.x, vegParams.canopyNear.y, in.vs.vIDat.y < 0.0 );
	let fade = smoothstep( nearD * ( 1.0 - VEG_LOD_BAND / 2.0 ), nearD * ( 1.0 + VEG_LOD_BAND / 2.0 ), length( vegParams.camPos - in.vs.vIPos ) );
	// cards seen edge-on thin out (no sliver lines through the crown)
	let facing = abs( dot( normalize( cross( dpdx( in.P ), dpdy( in.P ) ) ), in.V ) );
	let thr = vegCoverageThreshold( in.uv ) + ( 1.0 - smoothstep( 0.08, 0.35, facing ) ) * 0.45;
	return ( isBark || L.x > thr ) && bayer4( in.pixel ) >= fade;
}
fn vegCanopyLeaf( in: FragInput ) -> vec4f {
	let part = in.vs.vMat.x;
	return vegLeafSample( in.uv, vegLeafTile( in.vs.vIDat.w, part > 2.5 ) );
}
`;function Tu(e){let t=new g({name:`vegCanopyMask`,deps:[Cu,e.module],code:wu});return new qe({name:`veg-canopy`,side:`double`,modules:[Wl,Cu,e.module,t],attributes:yu,varyings:{vMat:`vec4f`,vIDat:`vec4f`,vIPos:`vec3f`,vHf:`f32`},vertex:xu(!0)+`
	o.vMat = v.aMat;
	o.vIDat = v.iDat;
	o.vIPos = v.iPos.xyz;
	o.vHf = v.aVeg.x;`,surface:`
	let aMat = in.vs.vMat;
	let part = aMat.x;
	let ao = aMat.y;
	let cr = aMat.z;
	let seed = in.vs.vIDat.w;
	let isBark = part < 0.5 || part > 4.5;
	let isShrub = part > 2.5;
	let spT = vegTreeSpecies( seed ); let spS = vegShrubSpecies( seed );
	// leaf cluster sampled once (first in the fragment shader), shared by the mask and the colour
	let L = vegCanopyLeaf( in );
	if ( ! vegCanopyMask( in, L ) ) { discard; }
	let bright = L.y * 1.4;
	let cell = L.z;
	var c = vegCanopyLeafColor( seed, cr, isShrub ) * bright;
	// species details: red-veined old leaves (sea grape), variegation (croton), flowers (hibiscus)
	let shrub0 = isShrub && spS < 0.5; let shrub1 = isShrub && spS == 1.0; let shrub2 = isShrub && spS > 1.5;
	c = mix( c, ${$(8010274)}, smoothstep( 0.86, 0.98, cell ) * 0.55 * select( 0.0, 1.0, shrub0 ) );
	let vari = select( ${$(8010274)}, ${$(10127920)}, fract( cell * 7.3 ) > 0.5 );
	c = mix( c, vari, smoothstep( 0.72, 0.9, cell ) * 0.55 * select( 0.0, 1.0, shrub1 ) );
	c = select( c, ${$(11740702)}, shrub2 && cell > 0.92 );
	// trees: a few old leaves turning red / yellow before they drop (sea almond)
	let treeK = select( 1.0, 0.0, isShrub );
	c = mix( c, mix( ${$(9075258)}, ${$(8273442)}, step( 0.992, fract( cell * 3.7 ) ) ), step( 0.984, fract( cell * 3.7 ) ) * treeK * 0.6 );
	// sunlit outer / upper leaves brighter and a little yellow-green; shaded interior kept for contrast
	let outer = smoothstep( 0.62, 1.0, ao );
	c = mix( c, c * vec3f( 1.16, 1.22, 0.92 ), outer * 0.7 );
	let leaf = c * mix( 0.55, 1.0, ao );
	// bark: grey-brown with vertical streaks, lichen patches
	let hfB = in.vs.vHf;
	var albedo = leaf;
	if ( isBark ) {
		let st = in.uv;
		let n2 = vegNoise( vec2f( st.x * 6.0, st.y * 0.7 ) );
		var bark = vegBarkColor( vegNoise( vec2f( st.x * 30.0, st.y * 2.5 + seed * 40.0 ) ), n2 );
		// moss and epiphytes on the humid lower trunk and the upper sides of the limbs
		bark = mix( bark, mix( ${$(2898456)}, ${$(4478250)}, n2 ), smoothstep( 0.45, 0.7, vegNoise( vec2f( st.x * 9.0, st.y * 1.3 + seed * 11.0 ) ) + ( 0.35 - hfB ) * 0.6 ) * 0.7 );
		albedo = bark;
	}
	s.albedo = albedo;
	// bark: the trunk under the crown sees little of the sky
	s.ao = select( mix( 0.35, 1.0, ao ), smoothstep( 0.0, 0.75, hfB ) * 0.45 + 0.4, isBark );
	s.roughness = select( select( 0.82, 0.65, ( isShrub && spS < 0.5 ) || ( ! isShrub && spT < 0.5 ) ), 0.92, isBark );
	s.metalness = 0.0;
	s.specularIntensity = 0.15;
	// leaves: canopy (spherical) normals, not flipped on back faces, bent towards the viewer
	// so they are never shaded at grazing angles (avoids a white Fresnel sheen when backlit)
	let geoN = normalize( in.vs.normal );
	s.normal = select( normalize( geoN + in.V * 0.7 ), in.N, isBark );
	s.translucency = vec3f( 0.0 );
	if ( ! isBark ) { s.translucency = vegTranslucency( albedo, geoN, 0.5, in.P ) * ( ao * 0.6 + 0.4 ); }`,shadow:`return vegCanopyMask( in, vegCanopyLeaf( in ) );`})}function Eu(e){let t=t=>new qe({name:`veg-impostor-bake-`+t,side:`double`,lit:!1,modules:[Wl,e.module],attributes:{aMat:`vec4f`},varyings:{vMat:`vec4f`,vLocalN:`vec3f`},vertex:`o.vMat = v.aMat; o.vLocalN = v.normal;`,surface:`
	let aMat = in.vs.vMat;
	let part = aMat.x;
	let isBark = part < 0.5 || part > 4.5;
	let isShrub = part > 2.5;
	let st = in.uv;
	let L = vegLeafSample( st, select( 0.0, 2.0, isShrub ) );
	if ( ! ( isBark || L.x > 0.5 ) ) { discard; }`,output:t===`albedo`?`
	let aMat = in.vs.vMat;
	let part = aMat.x;
	let isBark = part < 0.5 || part > 4.5;
	let isShrub = part > 2.5;
	let st = in.uv;
	let vBright = vegLeafSample( st, select( 0.0, 2.0, isShrub ) ).y * 1.4;
	let barkN = vegNoise( vec2f( st.x * 30.0, st.y * 2.5 ) ) * 0.6 + vegNoise( vec2f( st.x * 6.0, st.y * 0.7 ) ) * 0.4;
	let bright = select( vBright / 1.4, barkN * 0.5 + 0.4, isBark );
	r.color = vec4f( bright, select( 1.0, 0.0, isBark ), aMat.z, 1.0 );`:`
	let aMat = in.vs.vMat;
	let part = aMat.x;
	let isBark = part < 0.5 || part > 4.5;
	r.color = vec4f( normalize( in.vs.vLocalN ) * 0.5 + 0.5, select( aMat.y, 0.6, isBark ) );`});return{albedo:t(`albedo`),normal:t(`normal`)}}var Du=`vegImpostorColor`,Ou=100,ku=[140,320],Au=.5,ju=180,Mu=128;function Nu(e,n,r=new t){let i=(e-n)*.5,a=(e+n)*.5;return r.set(i,1-Math.abs(i)-Math.abs(a),a).normalize()}function Pu(e){let n=new t().crossVectors(new t(0,1,0),e);return n.lengthSq()<1e-8&&n.set(1,0,0),n.normalize(),{right:n,up:new t().crossVectors(e,n).normalize()}}var Fu=`
fn vegOctDecode( u: f32, v: f32 ) -> vec3f {
	let x = ( u - v ) * 0.5; let z = ( u + v ) * 0.5;
	return normalize( vec3f( x, 1.0 - abs( x ) - abs( z ), z ) );
}
fn vegOctEncode( d: vec3f ) -> vec2f {
	let p = d / ( abs( d.x ) + abs( d.y ) + abs( d.z ) );
	return vec2f( p.x + p.z, p.z - p.x );
}
`,Iu=class{constructor(e,t){this.groups=e,this.bakeMaterials=t;let n=0;for(let t of e)t.variantBase=n,n+=t.variants.length;this.variantCount=n;let r=n*6*Mu,i=e=>{let t=new P({label:e,width:r,height:768,format:`rgba8unorm`,mips:!0,usage:[`sample`,`render`,`copyDst`,`copySrc`],sampler:`linearClamp`});return{texture:t,dispose:()=>t.destroy()}};this.rtA=i(`vegImpostorA`),this.rtB=i(`vegImpostorB`),this.depth=new P({label:`vegImpostorDepth`,width:r,height:768,format:`depth32float`,usage:[`render`]}),this.width=r,this.height=768,this.baked=!1}_frameMatrices(e,t){let n=[],r=e.radius,i=e.center;for(let a=0;a<6;a++)for(let o=0;o<6;o++){let s=Nu(-1+2*o/5,-1+2*a/5),{right:c,up:l}=Pu(s),u=((e.variantBase+t)*6+o+.5)*2*r,d=(a+.5)*2*r,f=new C().set(c.x,c.y,c.z,-i.dot(c)+u,l.x,l.y,l.z,-i.dot(l)+d,s.x,s.y,s.z,-i.dot(s),0,0,0,1);n.push(f)}return n}bake(e=null){let t=performance.now(),n=e&&e.render&&e.collect?e:this._mr||=new Gt,r=this.depth.view(),i=!0;for(let[e,t]of[[this.rtA,this.bakeMaterials.albedo],[this.rtB,this.bakeMaterials.normal]]){i=!0;let o=e.texture.view({dimension:`2d`,baseMipLevel:0,mipLevelCount:1});this.groups.forEach((e,s)=>{let c=e.radius,l=new ke(0,this.variantCount*6*2*c,12*c,0,.1,6*c+10);l.position.set(0,0,3*c+2),l.lookAt(0,0,-1),l.updateMatrixWorld(),l.updateProjectionMatrix();let u=(this._blocks||=[])[s]||(this._blocks[s]=d(`vegImpostorBake`+s));a(l,this.width,this.height,{block:u});let f=new De;e.variants.forEach((n,r)=>{let i=this._frameMatrices(e,r),a=new we(n,t,i.length);i.forEach((e,t)=>a.setMatrixAt(t,e)),a.frustumCulled=!1,f.add(a)}),f.updateMatrixWorld(!0),n.render(f,{camera:l,frameBlock:u,kind:`color`,label:`veg impostor bake`,colorViews:[o],colorFormats:[`rgba8unorm`],depthView:r,depthFormat:`depth32float`,clearColors:[i?[0,0,0,0]:null],clearDepth:0}),i=!1}),oe(e.texture)}this.baked=!0,this.bakeMs=performance.now()-t}createMaterial({isGroup1:e,variantOf:t,colorOf:n,nearDist:r}){let[i,a]=this.groups,o=this.variantCount*6,s=(e,t)=>`select( ${Q(e)}, ${Q(t)}, g1Flag )`,c=`
	let g1Flag = ${e(`iDat`)};
	let R = ${s(i.radius,a.radius)};
	let Rh = ${s(i.rh,a.rh)};
	let Hv = ${s(i.hv,a.hv)};
	let Cy = ${s(i.center.y,a.center.y)};
	let vBase = ${s(i.variantBase,a.variantBase)};`,l=new qe({name:`veg-impostor`,side:`double`,modules:[Wl,Cu],textures:{vegImpA:this.rtA.texture,vegImpB:this.rtB.texture},attributes:{iPos:`vec4f`,iDat:`vec4f`},varyings:{vImp:`vec4f`,vIPos4:`vec4f`,vIDat:`vec4f`},vertex:`
	let iPos = v.iPos;
	let iDat = v.iDat;
${c}
	let base = iPos.xyz;
	let sy = abs( iDat.y );
	// LOD window: from the near plant's hand-over distance to the fade-out, else collapsed
	let d = length( vegParams.camPos - base );
	let vis = select( 0.0, 1.0, d >= ( ${r(`g1Flag`)} ) * ( 1.0 - VEG_LOD_BAND / 2.0 ) && d < select( draw.params.w, ${Q(ju)}, g1Flag ) );
	// far away the forest is thinned out: fewer, proportionally larger crowns (grown about
	// the base) keep the canopy closed
	let thin = smoothstep( ${Q(ku[0])}, ${Q(ku[1])}, d );
	let keep = select( 1.0, 0.0, fract( iDat.w * 91.7 ) < thin * ${Q(Au)} );
	let grow = thin * ${Q(1/Math.sqrt(.5)-1)} + 1.0;
	let s = iPos.w * grow;
	let C = base + vec3f( 0.0, Cy * s * sy, 0.0 );
	// sway of the whole crown (matches the near plants' trunk sway amplitude)
	let w = vegWindStrength();
	let g = vegGustAt( base.xz );
	let ph0 = iDat.w * 6.2832;
	let sway = ( w * w * 0.009 * ( g * 0.8 + 0.3 ) + sin( frame.time * 0.9 + ph0 ) * w * 0.0045 * ( g + 0.4 ) ) * iDat.z * 0.45;
	let swayV = vegWindDir3() * sway;
	let Cs = C + swayV;
	o.vImp = vec4f( swayV, s );
	o.vIPos4 = iPos;
	o.vIDat = iDat;
	let toCam = normalize( frame.cameraPos - Cs );
	let right = normalize( cross( VEG_UP, toCam ) + vec3f( 1e-4, 0.0, 0.0 ) );
	let up = cross( toCam, right );
	// quad fitted to the plant's projected extent: its horizontal radius across, from above
	// the crown disc, from the side the (stretched) height
	let k = s * vis * keep;
	let ty = abs( toCam.y );
	let halfW = Rh * k;
	let halfH = ( Hv * sy * sqrt( max( 1.0 - ty * ty, 0.0 ) ) + Rh * ty ) * k;
	let p = v.position;
	v.useWorld = true;
	v.worldPos = Cs + right * ( p.x * halfW ) + up * ( p.y * halfH );
	// (three: the geometry normal is left as is, +Z of the quad)
	v.worldNormal = v.normal;`,surface:`
	let iPos = in.vs.vIPos4;
	let iDat = in.vs.vIDat;
${c}
	let base = iPos.xyz;
	let si = in.vs.vImp.w;
	let sy = abs( iDat.y );
	let yaw = iDat.x;
	let cyw = cos( yaw ); let syw = sin( yaw );
	let C = base + vec3f( 0.0, Cy * si * sy, 0.0 ) + in.vs.vImp.xyz;
	// world -> plant-local (unstretched, centred): rotate by -yaw, divide by the scale
	let Ow = frame.cameraPos - C;
	let Dw = in.P - frame.cameraPos;
	let scl = vec3f( si, si * sy, si );
	let O = vec3f( Ow.x * cyw - Ow.z * syw, Ow.y, Ow.x * syw + Ow.z * cyw ) / scl;
	let D = vec3f( Dw.x * cyw - Dw.z * syw, Dw.y, Dw.x * syw + Dw.z * cyw ) / scl;
	let vdir = normalize( O );
	let vd = normalize( vec3f( vdir.x, max( vdir.y, 0.02 ), vdir.z ) );
	let gg = ( vegOctEncode( vd ) * 0.5 + 0.5 ) * ${Q(5)};
	let gi = floor( clamp( gg, vec2f( 0.0 ), vec2f( ${Q(4.9990000000000006)} ) ) );
	let fr = gg - gi;
	let upper = fr.x + fr.y > 1.0;
	// triangle of the cell containing g, barycentric weights
	let i0 = select( gi, gi + 1.0, upper );
	let i1 = select( gi + vec2f( 1.0, 0.0 ), gi + vec2f( 0.0, 1.0 ), upper );
	let i2 = select( gi + vec2f( 0.0, 1.0 ), gi + vec2f( 1.0, 0.0 ), upper );
	let w0 = select( 1.0 - fr.x - fr.y, fr.x + fr.y - 1.0, upper );
	let w1 = select( fr.x, 1.0 - fr.x, upper );
	let w2 = select( fr.y, 1.0 - fr.y, upper );
	let variant = vBase + ${t(`iDat.w`,`g1Flag`)};
	var vA = vec4f( 0.0 ); var vB = vec4f( 0.0 );
	// near: blend the three frames around the view direction; far: the dominant frame only
	let blend = length( vegParams.camPos - base ) < ${Q(Ou)};
	if ( blend ) {
		let s0 = vegImpSample( i0, O, D, variant, R );
		let s1 = vegImpSample( i1, O, D, variant, R );
		let s2 = vegImpSample( i2, O, D, variant, R );
		vA = s0[ 0 ] * w0 + s1[ 0 ] * w1 + s2[ 0 ] * w2;
		vB = s0[ 1 ] * w0 + s1[ 1 ] * w1 + s2[ 1 ] * w2;
	} else {
		let iMax = select( select( i2, i1, w1 >= w2 ), i0, w0 >= max( w1, w2 ) );
		let sm = vegImpSample( iMax, O, D, variant, R );
		vA = sm[ 0 ];
		vB = sm[ 1 ];
	}
	// cross-fade from the near geometry (incoming level of the band around nearDist)
	let nd = ${r(`g1Flag`)};
	let fade = smoothstep( nd * ( 1.0 - VEG_LOD_BAND / 2.0 ), nd * ( 1.0 + VEG_LOD_BAND / 2.0 ), length( vegParams.camPos - base ) );
	if ( ! ( vA.w > 0.42 && bayer4( in.pixel ) < fade ) ) { discard; }

	let cov = max( vA.w, 1e-3 );
	let bright = vA.x / cov; let leaf = vA.y / cov; let cr = vA.z / cov;
	// exposure (baked crown AO): the inside and underside of the crown in deep shade
	let ex = vB.w / cov;
	let albedo = ${n({seed:`iDat.w`,cr:`cr`,leaf:`leaf`,bright:`bright`,isGroup1:`g1Flag`})} * mix( 0.26, 1.0, ex * ex ) * ( bright * 0.6 + 0.7 );
	s.albedo = albedo;
	// B is written where A has coverage: un-premultiply the filtered edges by A's coverage
	let nl = vB.xyz / max( vA.w, 1e-3 ) * 2.0 - 1.0;
	// local -> world: inverse-transpose of the stretch, then the yaw rotation
	let ns = vec3f( nl.x, nl.y / sy, nl.z );
	let nw = normalize( vec3f( ns.x * cyw + ns.z * syw, ns.y, ns.z * cyw - ns.x * syw ) );
	s.normal = normalize( nw + in.V * 0.12 );
	s.roughness = 0.85;
	s.metalness = 0.0;
	s.specularIntensity = 0.12;
	// backlit crowns glow at the edges (light through the leaves), like the near canopy
	s.translucency = vegTranslucency( albedo, in.N, 0.35, in.P );`});return l.modules.push(new Wl.constructor({name:`vegImpostorSample`,deps:[Wl],code:Fu+`
fn vegImpSample( ij: vec2f, O: vec3f, D: vec3f, variant: f32, Rf: f32 ) -> array<vec4f, 2> {
	let d = vegOctDecode( ij.x / ${Q(5)} * 2.0 - 1.0, ij.y / ${Q(5)} * 2.0 - 1.0 );
	let right = normalize( cross( VEG_UP, d ) );
	let up = cross( d, right );
	let t = - dot( O, d ) / dot( D, d );
	let P = O + D * t;
	let a = dot( P, right ) / Rf; let b = dot( P, up ) / Rf;
	let cu = variant * ${Q(6)} + ij.x + ( a * 0.5 + 0.5 );
	let cv = ij.y + ( b * 0.5 + 0.5 );
	let inCell = abs( a ) < 1.0 && abs( b ) < 1.0;
	// render targets are stored top row first: flip v
	let st = vec2f( cu / ${Q(o)}, 1.0 - cv / ${Q(6)} );
	let k = select( 0.0, 1.0, inCell );
	return array<vec4f, 2>( textureSample( vegImpA, smpLinearClamp, st ) * k, textureSample( vegImpB, smpLinearClamp, st ) * k );
}
`})),l}};function Lu(){let e=new Ie;return e.setAttribute(`position`,new I([-1,-1,0,1,-1,0,1,1,0,-1,1,0],3)),e.setAttribute(`normal`,new I([0,0,1,0,0,1,0,0,1,0,0,1],3)),e.setIndex([0,1,2,0,2,3]),e.boundingSphere=new S(new t,1e7),e}var Ru=[{grid:4,leaves:6,width:.34},{grid:4,leaves:8,width:.2},{grid:3,leaves:6,width:.45},{grid:3,leaves:8,width:.22}],zu=1024,Bu=`
struct VegRosette { d: f32, bright: f32, cell: f32 };
fn vegRosette( st: vec2f, G: f32, nLeaves: f32, width: f32, rot: f32 ) -> VegRosette {
	let cuv = st * G;
	let cell = floor( cuv );
	let h1 = vegHash12( cell + rot * 17.3 );
	let h2 = vegHash12( cell * 1.7 + rot * 31.1 + 5.2 );
	let h3 = vegHash12( cell * 2.3 + rot * 7.7 + 1.9 );
	// whorls of different sizes, off the cell centres; some cells stay empty (sky holes)
	let sc = mix( 0.62, 1.05, h2 ) * select( 1.0, 0.001, h3 < 0.2 );
	let off = vec2f( h1 - 0.5, h3 - 0.5 ) * 0.34;
	let p = ( fract( cuv ) - 0.5 - off ) * 2.0 / sc;
	let r = length( p );
	let ang = atan2( p.y, p.x ) + rot + h1 * 6.2832;
	let sector = ang * ( nLeaves / 6.2832 );
	let k = floor( sector + 0.5 );
	// irregular leaf spacing and lengths so clusters don't read as flowers
	let lr = vegHash12( vec2f( k, h1 * 13.7 ) );
	let jit = ( lr - 0.5 ) * 0.8;
	let L = mix( 0.5, 1.0, fract( lr * 7.13 ) );
	// each blade curves a little to one side (leaves, not a star)
	let curve = ( fract( lr * 3.31 ) - 0.5 ) * 0.9;
	let da = ( sector - k - jit ) * ( 6.2832 / nLeaves ) - curve * ( r / L ) * ( r / L ) * 0.35;
	let along = r * cos( da );
	let across = abs( r * sin( da ) );
	let x = along / L;
	let bx = clamp( ( x - 0.18 ) / 0.82, 0.0, 1.0 ); // blade after a short petiole
	// obovate (widest beyond the middle) with a short pointed tip
	let shape = pow( max( sin( pow( bx, 0.62 ) * 3.14159 ), 0.0 ), 0.8 ) * ( smoothstep( 1.0, 0.86, bx ) * 0.25 + 0.75 );
	let hw = shape * width * L;
	let inBlade = x > 0.16 && x < 1.0;
	let dBlade = select( -1.0, hw - across, inBlade );
	let dPet = select( -1.0, 0.012 - across, x < 0.2 );
	var o: VegRosette;
	o.d = max( dBlade, dPet );
	let vein = smoothstep( 0.03, 0.0, across ) * smoothstep( 0.05, 0.25, bx ) * smoothstep( 1.0, 0.7, bx );
	o.bright = ( ( h1 * 0.7 + lr * 0.3 ) * 0.22 + 0.88 ) * mix( 0.82, 1.08, bx ) * ( vein * 0.09 + 1.0 );
	o.cell = h1 * 0.7 + lr * 0.3;
	return o;
}
`,Vu=class{constructor(){this.texture=new P({label:`vegLeafClusters`,width:zu,height:zu,format:`rgba8unorm`,mips:!0,usage:[`sample`,`render`,`copyDst`,`copySrc`],sampler:`anisoRepeat`}),this.rt={dispose:()=>this.texture.destroy()},this.baked=!1;let e=this;this.module=new g({name:`vegLeafAtlas`,deps:[Wl],bindings:{vegLeafTex:{texture:()=>e.texture}},code:`
// sample tile ( 0..3 ) at card uv st -> ( coverage, bright, cell, 1 )
fn vegLeafSample( st: vec2f, tile: f32 ) -> vec4f {
	let tuv = ( vec2f( fract( tile * 0.5 ) * 2.0, floor( tile * 0.5 ) ) + clamp( st, vec2f( 0.004 ), vec2f( 0.996 ) ) ) * 0.5;
	return textureSample( vegLeafTex, smpAnisoRepeat, vec2f( tuv.x, 1.0 - tuv.y ) );
}
`})}bake(){let e=``;for(let t=0;t<4;t++){let n=Ru[t];e+=`\tif ( tid == ${t}.0 ) {\n`;for(let t=0;t<4;t++){let r=(t%2-.5)*Hu*.5,i=(Math.floor(t/2)-.5)*Hu*.5;e+=`\t\t{
			let q = local + vec2f( ${Q(r)}, ${Q(i)} );
			let A = vegRosette( q, ${Q(n.grid)}, ${Q(n.leaves)}, ${Q(n.width)}, 0.0 );
			let B = vegRosette( q + ${Q(.5/n.grid)}, ${Q(n.grid)}, ${Q(n.leaves)}, ${Q(n.width)}, 2.1 );
			let inA = A.d > 0.0; let inB = B.d > 0.0;
			if ( inA || inB ) {
				cov += 0.25;
				bright += select( B.bright, A.bright, inA ) * 0.25;
				cellR += select( B.cell, A.cell, inA ) * 0.25;
			}
		}\n`}e+=`	}
`}new Je({label:`veg leaf atlas bake`,modules:[Wl],colorFormats:[`rgba8unorm`],code:Bu+`
fn fragment( in: FSIn ) -> vec4f {
	// three's quad uv: v up
	let st = vec2f( in.uv.x, 1.0 - in.uv.y );
	let tile = floor( st * 2.0 );
	let tid = tile.x + tile.y * 2.0;
	let local = fract( st * 2.0 );
	var cov = 0.0; var bright = 0.0; var cellR = 0.0;
${e}
	// colour channels are stored un-premultiplied (valid where covered)
	let inv = 1.0 / max( cov, 1e-3 );
	return vec4f( cov, bright * inv / 1.4, cellR * inv, 1.0 );
}
`}).render({colorViews:[this.texture],clear:[0,0,0,0]}),oe(this.texture),this.baked=!0}},Hu=1/(zu/2),Uu=(e,t)=>`vegVariantOf( ${e}, ${t} )`;function Wu(e){if(!e)return{};let t=typeof e.getFootprints==`function`?e.getFootprints():[],n=[];for(let t of[e.path,...e.sidePaths||[]]){if(!t||!t.samples)continue;let e=[];for(let n=0;n<t.samples.length;n+=5)e.push([t.samples[n].p.x,t.samples[n].p.z]);let r=t.samples[t.samples.length-1];e.push([r.p.x,r.p.z]),n.push({points:e,width:t.width??1.8})}return{footprints:t,paths:n.length?n:null}}function Gu(e){let n=e.attributes.position,r=new t,i=1/0,a=-1/0;for(let e=0;e<n.count;e++)r.fromBufferAttribute(n,e),i=Math.min(i,r.y),a=Math.max(a,r.y);let o=new t(0,(i+a)*.5,0),s=0,c=0;for(let e=0;e<n.count;e++)r.fromBufferAttribute(n,e),s=Math.max(s,r.distanceTo(o)),c=Math.max(c,Math.hypot(r.x,r.z));return{center:o,radius:s*1.02,rh:c*1.03,hv:(a-i)*.5*1.03}}var Ku=120,qu=65,Ju=45,Yu=[120,140],Xu=[85,105],Zu=[100,120],Qu=[2600,2800],$u=class{constructor({scene:e,terrain:n,village:r=null,records:i=null,grassMask:a=null}){this.scene=e,this.terrain=n,this.group=new de,this.group.name=`Vegetation`,this.group.matrixAutoUpdate=!1;let o=performance.now(),s=new Cc(n,Wu(r));this.site=s;let c=i||kc(s);this.records=c;let l=performance.now(),u=a||Ac(s);this.timings={scatter:l-o,mask:performance.now()-l};let d=bu();this.leafAtlas=new Vu;let f=Tu(this.leafAtlas);Su.value.set(qu,Ju);let p=nl(),m=rl(),h=wl(),g=Ll(),_=Il(),v=Tl(),y=Sl(),b=vl().geometry,x=yl().geometry,S=[],C=[];for(let e=0;e<3;e++)S.push(xl(b,bl,e*8));for(let e=0;e<2;e++)C.push(xl(x,bl,(3+e)*8));this.atlas=new Iu([{variants:S,...Gu(b)},{variants:C,...Gu(x)}],Eu(this.leafAtlas));let w=this.atlas.createMaterial({isGroup1:e=>`${e}.y < 0.0`,variantOf:(e,t)=>Uu(e,t),colorOf:({seed:e,cr:t,leaf:n,bright:r,isGroup1:i})=>`${Du}( ${e}, ${t}, ${n}, ${r}, ${i} )`,nearDist:e=>`select( vegParams.canopyNear.x, vegParams.canopyNear.y, ${e} )`});this.materials=[d,f,w],this.types=[];let T=e=>{this.types.push(e);for(let t of e.meshes)this.group.add(t);return e};this.palms=T(new zc(`palms`,c.palms,{nearRange:Ku,margin:10,refreshDistance:6,farExcludeNear:!0,sortNear:!0,near:[{geometry:p.geometry,material:d,castShadow:!0,name:`veg-palm`}],far:{parts:[{geometry:m.geometry,material:d,name:`veg-palm-far`}],fade:Qu}}));let E=[...c.youngPalms.map(e=>({...e,seed:Cl.YOUNG+e.seed*.999,qr:Yu[1]+10})),...c.ferns.map(e=>({...e,seed:Cl.FERN+e.seed*.999,qr:Ul[1]+8}))],D=c.bananas.map(e=>({...e,H:.02,seed:(e.seed<.5?Cl.BANANA:Cl.BANANA_B)+e.seed*.999,qr:Zu[1]+10}));this.bananas=T(new zc(`bananas`,D,{fade:Zu,margin:10,sortNear:!0,near:[{geometry:v.geometry,material:d,castShadow:!0,name:`veg-banana`}]})),this.understory=T(new zc(`understory`,E,{fade:Yu,margin:10,sortNear:!0,near:[{geometry:h.geometry,material:d,castShadow:!1,name:`veg-understory`}]}));let O=c.monsteras.map(e=>({...e,seed:Fl.MONSTERA+e.seed*.999,qr:Xu[1]+10}));this.monsteras=T(new zc(`monsteras`,O,{fade:Xu,margin:10,sortNear:!0,near:[{geometry:_.geometry,material:d,castShadow:!0,name:`veg-monstera`}]}));let k=[...c.elephantEars.map(e=>({...e,seed:Fl.ELEPHANT+e.seed*.999,qr:Xu[1]+10})),...c.heliconias.map(e=>({...e,seed:Fl.HELICONIA+e.seed*.999,qr:Xu[1]+10})),...c.strelitzias.map(e=>({...e,seed:Fl.STRELITZIA+e.seed*.999,qr:Xu[1]+10}))];this.broadleaf=T(new zc(`broadleaf`,k,{fade:Xu,margin:10,sortNear:!0,near:[{geometry:g.geometry,material:d,castShadow:!0,name:`veg-broadleaf`}]}));let ee=[...c.trees.map(e=>({...e,qr:75})),...c.shrubs.map(e=>({...e,qr:55}))];this.canopy=T(new zc(`canopy`,ee,{nearRange:qu,margin:10,sortNear:!0,sortFar:!0,farRefresh:16,near:[{geometry:y.geometry,material:f,castShadow:!0,name:`veg-canopy`}],far:{parts:[{geometry:Lu(),material:w,name:`veg-canopy-far`}],fade:Qu}}));for(let e of[this.palms,this.understory,this.bananas,this.monsteras,this.broadleaf,this.canopy])for(let t of e.meshes)t.renderOrder=1;for(let e of this.canopy.far.meshes)e.renderOrder=2;this.renderer=!0,this.grass=new lu({terrain:n,mask:u});for(let e of this.grass.meshes)this.group.add(e);this.geometryTriangles={palmNear:p.triangles,palmFar:m.triangles,understory:h.triangles,understoryPerKind:h.perKind,broadleaf:g.triangles,broadleafPerKind:g.perKind,monstera:_.triangles,bananas:v.triangles,canopy:y.triangles,tree:y.treeTriangles,shrub:y.shrubTriangles,impostor:2,grassNearPatch:this.grass.patchTris[0],grassMidPatch:this.grass.patchTris[1],grassFarPatch:this.grass.patchTris[2]},this.group.updateMatrixWorld(!0),e.add(this.group),this._camPos=new t,this.timings.total=performance.now()-o}setQualityLevel(e){this.group.visible=e>0;for(let t of this.types)t.inst.qualityLevel=e,t.inst.qualityLimit=Math.ceil(t.inst.count*e),t.lastX=t.farX=1/0,t.near&&t.near.fill(t.inst,null,0),t.far&&t.far.fill(t.inst);this.grass.setQualityLevel(e)}update(e,t){if(this.renderer&&!this.atlas.baked){let e=performance.now();this.leafAtlas.bake(this.renderer),this.atlas.bake(this.renderer),this.timings.bake=performance.now()-e}t.updateMatrixWorld();let n=t.getWorldPosition(this._camPos);Bl.value.copy(n);let r=h.windDir.value,i=.7*h.windSpeed.value+1.5;Vl.value.x+=r.x*i*e,Vl.value.y+=r.y*i*e;let a=null,o=null,s=0,c=0;for(let e of this.types){let t=e.overdue(n);t>e.margin-e.refreshDistance?e.update(n,!0):t>s?(o=a,c=s,a=e,s=t):t>c&&(o=e,c=t)}a&&a.update(n,!0),o&&o.update(n,!0),this.grass.update(t)}refreshTerrain(){this.grass.heightTex.needsUpdate=!0}stats(){let e={},t=0,n=0;for(let r of this.types){let i={};for(let[e,a]of[[`near`,r.near],[`far`,r.far]])a&&(i[e]={instances:a.count,triangles:a.triangles,meshes:a.meshes.length},t+=a.triangles,a.count>0&&(n+=a.meshes.length));e[r.name]={total:r.inst.count,...i}}let r=this.grass;return e.grass={nearCells:r.levels[0].count,midCells:r.levels[1].count,farCells:r.levels[2].count,triangles:r.triangles},t+=r.triangles,n+=r.levels.filter(e=>e.count>0).length,{types:e,triangles:t,drawCalls:n,villagePalms:this.records.villagePalms,rules:Z}}dispose(){this.scene.remove(this.group);for(let e of this.types)for(let t of e.meshes)t.geometry.dispose();for(let e of this.materials)e.dispose();this.atlas.rtA.dispose(),this.leafAtlas.rt.dispose(),this.atlas.rtB.dispose(),this.atlas.depth.destroy(),this.grass.dispose()}};export{oi as $,ia as A,Ui as B,wa as C,_t as Ct,Qi as D,Zi as E,ot as Et,Hi as F,Li as G,W as H,Vi as I,Bi as J,Ri as K,zi as L,Pi as M,H as N,ea as O,U as P,li as Q,V as R,Ca as S,vt as St,K as T,yt as Tt,Ii as U,Ni as V,Gi as W,Si as X,Ci as Y,vi as Z,po as _,$t as _t,Rs as a,Gn as at,uo as b,lt as bt,os as c,Dn as ct,zo as d,gn as dt,Qr as et,Ro as f,pn as ft,Ya as g,ln as gt,Y as h,sn as ht,Zs as i,Dr as it,Xi as j,da as k,$o as l,Tn as lt,Oo as m,on as mt,bc as n,Jr as nt,Is as o,Kn as ot,Io as p,cn as pt,Yi as q,Qs as r,Hr as rt,is as s,zn as st,$u as t,$r as tt,Zo as u,Sn as ut,Ka as v,Qt as vt,xa as w,ft as wt,Ea as x,ut as xt,fo as y,Gt as yt,Fi as z};