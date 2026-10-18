import{D as e,E as t,O as n,_ as r,a as i,b as a,c as o,d as s,f as c,i as l,j as u,k as d,l as f,n as p,o as m,s as h,t as g,u as _,v,w as y,y as b}from"./Frame-CNet77I0.js";import{a as x,i as S}from"./Materials-CAztm2ge.js";import{t as C}from"./GPU-CxPpnRCf.js";import{n as w,r as T,t as E}from"./Texture-8f_StRFj.js";import{t as ee}from"./Readback-5lEJRVdK.js";import"./Globals-CLsqp45h.js";import{A as te,_ as ne,b as D,h as re,k as ie,t as O,v as ae}from"./common-HBn3Movl.js";import{c as oe,d as se,f as ce,l as le,o as ue,s as de,u as fe}from"./LocalLights-DGrzAZBs.js";import{n as pe,t as me}from"./Material-tyLfv2Wn.js";import{a as k}from"./CameraVelocity-DbPmsWHs.js";var he=()=>typeof performance<`u`?performance.now():Date.now(),ge=class{constructor(){this._startTime=he(),this._previousTime=0,this._currentTime=0,this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=()=>{e.hidden===!1&&this.reset()},e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=he()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?he():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}},_e=[];for(let t=0;t<8;t++)_e.push(new e);var A=new e,ve=new e(0,1,0),ye=new y,be=new e,xe=new t,Se=new WeakMap,Ce=0;function j(e){return!e||typeof e!=`object`?String(e):(Se.has(e)||Se.set(e,++Ce),Se.get(e))}var we=class{constructor({size:t=2048,splits:n=[10,60,400],lightMargin:r=200,normalBias:i=[.015,.06,.3],bias:a=2e-5,pcssCascades:o=1,cacheStatic:s=!1,skipUnused:c=s}={}){this.size=t,this.splits=n,this.count=n.length,this.lightMargin=r,this.normalBias=i,this.periods=n.map((e,t)=>t===0?1:t===1?2:4),this.cacheStatic=s,this.skipUnused=c,this._samplingEnabled=!1,this.staticTexture=null,this.texture=new T({label:`sunShadowMap`,width:t,height:t,depth:this.count,dimension:`2d-array`,format:`depth32float`,usage:[`sample`,`render`,`copyDst`]}),fe(this.texture),this.cascades=n.map((e,t)=>({camera:{matrixWorld:new y,matrixWorldInverse:new y,projectionMatrix:new y,near:0,far:1,reversedDepth:!1,updateMatrixWorld(){},isCamera:!0,isShadowCamera:!0},block:l(`shadowView`+t),viewProj:new y,radius:0,dirty:!0})),this.enabled=!0,this.layerMask=4294967295,this.frame=0,this.lastSun=new e(0,-2,0);let u=de.fields;u.count.value=this.count,u.mapSize.value=t,u.bias.value=a,u.pcssCascades.value=o,u.enabled.value=1}invalidateStatic(){for(let e of this.cascades)e.staticKey=null,e.dirty=!0}_margin(e){let t=this.splits[this.count-1],n=e/t;return Math.max(.25*n*n,.25*n)*t}_fit(n,r,i){let a=this.cascades[n],o=n===0?0:this.splits[n-1],s=this.splits[n],c=this._margin(o),l=this._margin(s),u=Math.max(r.near,o-c*.5),d=n===this.count-1?s:s+l*.5;de.fields.blend.value[n]=new t(o,s,c,l);let f=Math.tan(r.fov*Math.PI/360),p=f*r.aspect,m=0;for(let e of[u,d])for(let t of[-1,1])for(let n of[-1,1])_e[m++].set(t*p*e,n*f*e,-e).applyMatrix4(r.matrixWorld);let h=Math.min(d,(u+d)/2*(1+p*p+f*f));A.set(0,0,-h).applyMatrix4(r.matrixWorld);let g=0;for(let e of _e)g=Math.max(g,e.distanceTo(A));g=Math.ceil(g*16)/16,a.radius=g;let _=a.camera,v=i,y=Math.abs(v.y)>.99?be.set(1,0,0):ve;_.matrixWorld.lookAt(v,new e(0,0,0),y),ye.copy(_.matrixWorld).invert();let b=2*g/this.size,x=xe.set(A.x,A.y,A.z,1).applyMatrix4(ye);x.x=Math.round(x.x/b)*b,x.y=Math.round(x.y/b)*b;let S=g+this.lightMargin,C=new e(x.x,x.y,x.z+S).applyMatrix4(_.matrixWorld);_.matrixWorld.setPosition(C),_.matrixWorldInverse.copy(_.matrixWorld).invert();let w=.1,T=S+g;_.near=w,_.far=T,Ee(_.projectionMatrix,-g,g,g,-g,w,T),a.viewProj.multiplyMatrices(_.projectionMatrix,_.matrixWorldInverse);let E=de.fields;E.matrices.value[n]=a.viewProj.clone(),E.cascades.value[n]=new t(d,b,this.normalBias[n]??.05,T-w)}update(e,t){this.frame++;let n=this.enabled&&t.y>-.05;if(de.fields.enabled.value=+!!n,this.skipUnused&&n&&!this._samplingEnabled&&this.invalidateStatic(),this._samplingEnabled=n,!this.enabled||this.skipUnused&&!n)return[];e.updateMatrixWorld();let r=this.lastSun.angleTo(t)>1e-4;this.lastSun.copy(t);let i=[];for(let n=0;n<this.count;n++)(r||this.cascades[n].dirty||(this.frame+n)%this.periods[n]===0)&&(this._fit(n,e,t),this.cascades[n].dirty=!1,i.push(n));return i}render(e,t,n){for(let r of n){let n=this.cascades[r];i(n.camera,this.size,this.size,{block:n.block});let a={label:`shadow cascade `+r,kind:`depth`,camera:n.camera,frameBlock:n.block,depthView:this.texture.view({dimension:`2d`,baseArrayLayer:r,arrayLayerCount:1}),depthFormat:`depth32float`,clearDepth:1,depthCompare:`less-equal`,layerMask:this.layerMask,depthBias:2,depthBiasSlopeScale:1.5};if(!this.cacheStatic){t.render(e,a);continue}this.staticTexture||=new T({label:`staticShadowCache`,width:this.size,height:this.size,depth:this.count,dimension:`2d-array`,format:`depth32float`,usage:[`render`,`copySrc`]});let o=t.collect(e,{...a,filter:e=>e.shadowStatic===!0}),s=Te(n,o);n.staticKey!==s&&(t.render(e,{...a,label:`shadow static cascade `+r,items:o,depthView:this.staticTexture.view({dimension:`2d`,baseArrayLayer:r,arrayLayerCount:1})}),n.staticKey=!t.precompiling&&[...t.pipelines.values()].every(e=>e.handle.pipeline)?s:null),C.getEncoder().copyTextureToTexture({texture:this.staticTexture.getGPU(),origin:{x:0,y:0,z:r}},{texture:this.texture.getGPU(),origin:{x:0,y:0,z:r}},{width:this.size,height:this.size,depthOrArrayLayers:1}),t.render(e,{...a,clearDepth:null,filter:e=>e.shadowStatic!==!0})}}};function Te(e,t){let n=[...e.viewProj.elements.map(Math.fround),Math.fround(e.camera.near),Math.fround(e.camera.far)];for(let e of[...t.opaque,...t.transparent]){let t=e.object,r=e.geometry,i=e.material;n.push(t.id,r.id,i.id,i.version,e.start,e.count,t.count??1,t.shadowRevision??0,i.side,i.alphaTest,i.depthWrite,i.shadow,...t.matrixWorld.elements),t.drawParams&&n.push(...t.drawParams);for(let[e,t]of Object.entries(r.attributes)){let r=t.data||t;n.push(e,j(t),j(r.array),r.version,t.count)}r.index&&n.push(j(r.index),j(r.index.array),r.index.version,r.index.count),t.instanceMatrix&&n.push(j(t.instanceMatrix),j(t.instanceMatrix.array),t.instanceMatrix.version);for(let e of Object.values(i.uniforms||{})){let t=e.value;typeof t==`number`||typeof t==`boolean`?n.push(t):t?.elements?n.push(...t.elements):Array.isArray(t)||ArrayBuffer.isView(t)?n.push(...t):t&&typeof t==`object`&&n.push(t.x,t.y,t.z,t.w,t.r,t.g,t.b)}}return n.join(`|`)}function Ee(e,t,n,r,i,a,o){let s=1/(n-t),c=1/(r-i),l=1/(o-a);return e.set(2*s,0,0,-(n+t)*s,0,2*c,0,-(r+i)*c,0,0,-l,-a*l,0,0,0,1),e}var M=Object.freeze({atmosphere:1,antiAliasing:1,sceneDetail:1});Object.freeze({atmosphere:.5,antiAliasing:.5,sceneDetail:.5});var N=Object.freeze([0,.05,.1,.2,.5,1]),De=Object.freeze([`Off`,`5%`,`10%`,`20%`,`Half (50%)`,`Full (100%)`]),Oe=e=>De[N.indexOf(e)],ke=e=>e===1?`taa`:e>0?`fxaa`:`none`,Ae=e=>Math.max(1,Math.min(6,Math.ceil(12*e))),je=Object.freeze({atmosphere:`atmosphereQuality`,antiAliasing:`aaQuality`,sceneDetail:`detailQuality`});function Me(e){if(!e||typeof e!=`object`||Array.isArray(e))throw TypeError(`Quality levels must be an object`);for(let[t,n]of Object.entries(e))if(!Object.hasOwn(M,t)||!N.includes(n))throw TypeError(`Quality levels accept only known keys and 0, 0.05, 0.1, 0.2, 0.5, or 1`);return e}function Ne(e){let t=typeof e==`string`?new URLSearchParams(e):e,n={...M};for(let[e,r]of Object.entries(je))if(t.has(r)){let i=t.get(r);if(!N.map(String).includes(i))throw TypeError(`Invalid `+r);n[e]=Number(i)}return n}function Pe(e,t=0){let n=e=>{let n=e+t+2654435769|0;return n=Math.imul(n^n>>>16,569420461),n=Math.imul(n^n>>>15,1935289751),(n^n>>>15)>>>0},r=Array.from({length:e},(e,t)=>t).sort((e,t)=>n(e)-n(t)||e-t),i=new Uint32Array(e);for(let t=0;t<e;t++)i[r[t]]=t;return i}function Fe(e,t,n){Me(n);let r={...e.qualityLevels,...n},i={...e.qualityLevels};return Object.keys(M).every(e=>i[e]===r[e])?e.qualityLevels:(Object.assign(e.qualityLevels,r),i.atmosphere!==r.atmosphere&&(t.atmosphereQuality.value=r.atmosphere,e.clouds&&(e.clouds.resolutionScale=e.settings.renderScale*Math.sqrt(r.atmosphere||1),e.clouds.invalidate?.(),e.clouds.resetHistory?.()),e.haze&&(e.haze.qualityLevel=r.atmosphere,e.haze._histValid=!1,r.atmosphere>0&&e.haze.setSize(e.engine.canvas.width,e.engine.canvas.height)),e._qualityEnvironmentDirty=e._waterGroundDirty=!0),i.antiAliasing!==r.antiAliasing&&(t.antiAliasingQuality.value=r.antiAliasing,e.post.aaMode=ke(r.antiAliasing)),i.sceneDetail!==r.sceneDetail&&(e.vegetation?.setQualityLevel(r.sceneDetail),e.reef?.setQualityLevel(r.sceneDetail)),e.post.taau.restart(),e.post._hasPrev=!1,e._fps&&(e._fps.acc=e._fps.n=e._fps.worst=0),e.fps=0,e.ui?.syncQualityLevels?.(),e.qualityLevels)}function P(e=globalThis.location?.search||``){let t=new URLSearchParams(e),n=t.has(`renderReference`),r=t.get(`world`)===`rocha`;return{reference:n,bindingReuse:r&&!n&&!t.has(`noRenderV2`)&&!t.has(`noBindingReuse`),framePacing:r&&!n&&!t.has(`noRenderV2`)&&!t.has(`noFramePacing`),compactTargets:!n&&!t.has(`noCompactSceneTargets`)&&(r||t.has(`compactSceneTargets`)),depthRotation:!n&&!t.has(`noDepthRotation`)&&(r||t.has(`depthRotation`)),tiledTAA:!n&&t.has(`tiledTAA`)&&!t.has(`noTiledTAA`)}}function Ie(e){return[`rgba16float`,e?`rg16float`:`rgba16float`,e?`rg8unorm`:`rgba8unorm`]}function Le(e,t,n=!0){if(e===t||e.format!==t.format||e.width!==t.width||e.height!==t.height)throw Error(`Depth rotation requires distinct, matching depth textures`);let r=e.getGPU();e.gpu=t.getGPU(),t.gpu=r,n&&([e._views,t._views]=[t._views,e._views]);for(let r of[e,t])r.version++,n||r._views.clear()}var Re=class{constructor(e){this.pass=e,this.vertices=[],this.indexBuffer=null,this.indexFormat=null,this.drawGroup=null,this.drawOffset=-1,this.offsets=new Uint32Array(1)}bindObject(e,t){(e!==this.drawGroup||t!==this.drawOffset)&&(this.offsets[0]=t,this.pass.setBindGroup(2,e,this.offsets,0,1),this.drawGroup=e,this.drawOffset=t)}bindVertex(e,t){this.vertices[e]!==t&&(this.pass.setVertexBuffer(e,t),this.vertices[e]=t)}bindIndex(e,t){(this.indexBuffer!==e||this.indexFormat!==t)&&(this.pass.setIndexBuffer(e,t),this.indexBuffer=e,this.indexFormat=t)}},ze={position:`vec3f`,normal:`vec3f`,uv:`vec2f`,color:`vec4f`},Be={normal:`vec3f( 0.0, 1.0, 0.0 )`,uv:`vec2f( 0.0 )`,color:`vec4f( 1.0 )`},Ve=/^(u32|i32|vec[234][ui])$/;function He(e){return e===`f32`?`0.0`:e===`u32`?`0u`:e===`i32`?`0i`:`${e}()`}function Ue(e,t,n){let r=n.kind,i=new Set(t.map(e=>e.name)),a=e.allDefines();if(a.PASS_MAIN=+(r===`main`||r===`visibility`),a.PASS_MASK=+((n.colorFormats?.length??3)>2),a.PASS_VISIBILITY=+(r===`visibility`),a.PASS_DEPTH=+(r===`depth`),a.PASS_COLOR=+(r===`color`),a.PASS_LATE=+!!n.late,a.LIT=+!!e.lit,a.INSTANCED=+!!i.has(`instanceMatrix0`),a.INSTANCE_COLOR=+!!i.has(`instanceColor`),Object.assign(a,n.defines||{}),r===`main`&&n.waterObjectCropModule&&!a.STUDIO_LIGHTING?a.WATER_OBJECT_CROP=1:a.WATER_OBJECT_CROP&&=0,a.WATER_OBJECT_CROP_VIEWPORT&&!a.WATER_OBJECT_CROP&&(a.WATER_OBJECT_CROP_VIEWPORT=0),a.YACHT_EXACT_FINISH_PALETTE&&(r!==`main`||a.STUDIO_LIGHTING||a.INSTANCED||!e.vertexColors||e.attributes?.aSurface!==`vec4f`||!i.has(`yachtFinishIndex`)||!e.yachtExactFinishPalette?.module)&&(a.YACHT_EXACT_FINISH_PALETTE=0),a.YACHT_HALF_COLOR&&(r!==`main`||!a.LIT||a.STUDIO_LIGHTING||a.SHEEN||!C.features.has(`shader-f16`))&&(a.YACHT_HALF_COLOR=0),a.YACHT_HALF_COLOR&&(a.F16=1),a.CLIP_DISTANCES=(a.REFRACTION_CLIP||a.WATER_MAP_REFLECTION)&&C.features.has(`clip-distances`)?1:0,a.WATER_YACHT_SHADING_CACHE&&(r!==`main`||a.STUDIO_LIGHTING||!a.LIT)&&(a.WATER_YACHT_SHADING_CACHE=0),a.WATER_YACHT_SHADING_CACHE&&(!n.yachtShadingCacheModule||!a.PASS_MASK))throw Error(`Yacht shading cache requires a main-pass module and a marker color attachment`);if(a.WATER_SURFACE_YACHT_OCCLUSION&&(r!==`main`||a.STUDIO_LIGHTING||!a.LIT||!a.YACHT_OPAQUE_COLOR||e.transparent)&&(a.WATER_SURFACE_YACHT_OCCLUSION=0),a.WATER_SURFACE_YACHT_OCCLUSION&&!n.waterSurfaceOcclusionModule)throw Error(`Yacht surface occlusion requires a main-pass depth module`);a.WATER_YACHT_PBR_PREPARED=a.WATER_YACHT_SHADING_CACHE||a.WATER_SURFACE_YACHT_OCCLUSION?1:0;let o=`struct VertexIn {
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
`;u+=`\t@location( ${l++} ) worldPos: vec3f,\n`,u+=`\t@location( ${l++} ) normal: vec3f,\n`,u+=`\t@location( ${l++} ) uv: vec2f,\n`,u+=`\t@location( ${l++} )${a.YACHT_FLAT_COLOR?` @interpolate( flat )`:``} color: vec4f,\n`,c&&(u+=`\t@location( ${l++} ) curClip: vec4f,\n`,u+=`\t@location( ${l++} ) prevClip: vec4f,\n`);for(let t in e.varyings){let n=e.varyings[t];u+=`\t@location( ${l++} )${Ve.test(n)||a.YACHT_FLAT_SURFACE&&t===`vSurface`?` @interpolate( flat )`:``} ${t}: ${n},\n`}if(u+=`};
`,a.CLIP_DISTANCES){let e=[...u.matchAll(/\s(\w+): [^,]+,\n/g)].map(e=>e[1]);u+=u.replace(`struct VSOut {`,`struct VSOutClip {`).replace(/};\n$/,`	@builtin( clip_distances ) clipDistances: array<f32, 1>,
};
`),u+=`fn vsClip( o: VSOut, d: f32 ) -> VSOutClip {\n\tvar c: VSOutClip;\n${e.map(e=>`\tc.${e} = o.${e};\n`).join(``)}\tc.clipDistances[ 0 ] = d;\n\treturn c;\n}\n`}let d=``;for(let e in ze)if(i.has(e)){let n=t.find(t=>t.name===e);e===`color`&&n.wgsl===`vec3f`?d+=`	v.color = vec4f( i.color, 1.0 );
`:d+=`\tv.${e} = i.${e};\n`}else e!==`position`&&(d+=`\tv.${e} = ${Be[e]};\n`);for(let t in e.attributes)d+=i.has(t)?`\tv.${t} = i.${t};\n`:`\tv.${t} = ${He(e.attributes[t])};\n`;a.YACHT_EXACT_FINISH_PALETTE&&(d+=`	let yachtFinish = yachtExactVertexFinish( i.yachtFinishIndex );
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
`,p=e.shadow?`fn materialShadow( in: FragInput ) -> bool {\n${e.shadow}\n}\n`:``;a.HAS_SHADOW_HOOK=+!!e.shadow,a.NEEDS_DEPTH_FRAGMENT=r===`depth`&&(e.alphaTest>0||e.shadow)?1:0,a.HAS_POSITION=+!!i.has(`position`);let m=f.replace(`fn fragInput(`,p+`fn fragInput(`).replace(/\bTRANSPARENT_F\b/g,e.transparent?`true`:`false`).replace(/\bVELOCITY_WEIGHT\b/g,We(e.velocityWeight)).replace(/\bREFRACTION_CLIP_MARGIN\b/g,We((n.defines&&n.defines.REFRACTION_CLIP_MARGIN)??0)),g=[O,ce,...e.modules];return(r!==`depth`||h(e.modules).includes(le))&&(g=[O,ce,...oe(n.lightingHooks),le,...e.modules]),e.lightingHooks===!1&&!h(e.modules).includes(le)&&(g=[O,ce,se,...e.modules]),a.WATER_YACHT_SHADING_CACHE&&g.push(n.yachtShadingCacheModule),a.WATER_SURFACE_YACHT_OCCLUSION&&g.push(n.waterSurfaceOcclusionModule),a.YACHT_EXACT_FINISH_PALETTE&&g.push(e.yachtExactFinishPalette.module),a.WATER_OBJECT_CROP&&g.push(n.waterObjectCropModule),{code:m,modules:g,defines:a,bindings:{mat:{uniform:e.uniformBlock},...e.bindings},hasFragment:r!==`depth`||a.NEEDS_DEPTH_FRAGMENT===1}}function We(e){let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`}var F=new v,Ge=new r,Ke=new y,qe=new e,I=new e,Je=new b,Ye=2**-23;function Xe(e,t){let n=t.elements.map(Math.fround),r=1/0,i=-1/0,a=1/0,o=-1/0;for(let t of[e.min.x,e.max.x])for(let s of[e.min.y,e.max.y])for(let c of[e.min.z,e.max.z])for(let e of[2,3]){let l=[n[e]*t,n[e+4]*s,n[e+8]*c,n[e+12]],u=l.reduce((e,t)=>e+t,0),d=16*Ye*l.reduce((e,t)=>e+Math.abs(t),0)+1e-37;e===2?(r=Math.min(r,u-d),i=Math.max(i,u+d)):(a=Math.min(a,u-d),o=Math.max(o,u+d))}if(!(a>0))return null;let s=[r/a,r/o,i/a,i/o],c=Math.min(...s),l=Math.max(...s),u=16*Ye*Math.max(Math.abs(c),Math.abs(l))+1e-37;return Number.isFinite(u)?[c-u,l+u]:null}function Ze(e,t){return e&&t&&(e[1]<t[0]||t[1]<e[0])}var Qe=new WeakMap,$e=0,L=256;function et(e){let t=e.kind===`main`&&e.defines?.WATER_YACHT_SHADING_CACHE&&e.yachtShadingCacheModule?`.yachtCache:`+e.yachtShadingCacheModule.id:``,n=e.kind===`main`&&e.defines?.WATER_SURFACE_YACHT_OCCLUSION&&e.waterSurfaceOcclusionModule?`.yachtOcclusion:`+e.waterSurfaceOcclusionModule.id:``,r=e.kind===`main`&&e.waterObjectCropModule?`.waterObjectCrop:`+e.waterObjectCropModule.id:``;return e.lightingHooks?`.`+Object.entries(e.lightingHooks).filter(([,e])=>e).sort((e,t)=>e[0].localeCompare(t[0])).map(([e,t])=>e+`:`+t.id).join(`,`)+t+n+r:t+n+r}function tt(e,t,n,r){if(r?.kind!==`main`||r.defines?.STUDIO_LIGHTING||r.defines?.YACHT_EXACT_FINISH_PALETTE===0||!n.defines?.YACHT_EXACT_FINISH_PALETTE||!n.vertexColors||n.transparent||n.attributes?.aSurface!==`vec4f`)return null;let i=n.yachtExactFinishPalette;return i?.validFor(e,t)?i:null}function nt(e,t){let n=e.mainPassMaterialGroups;if(t!==`main`||!n||n.originalMaterial!==e.material||!Array.isArray(n.groups)||!n.validFor?.(e))return null;let r=0;for(let e of n.groups){if(e.start!==r||!Number.isInteger(e.count)||e.count<=0||e.count%3||!e.material||e.material.transparent)return null;r+=e.count}let i=e.geometry.index?.count??e.geometry.attributes.position?.count??0;return r===i&&!e.material.transparent?n:null}var rt=class{constructor(){this.pipelines=new Map,this.geometries=new WeakMap,this.sharedAttributes=new WeakMap,this.sharedIndices=new WeakMap,this.resourceStats={vertexBuffers:0,indexBuffers:0,vertexBytes:0,indexBytes:0,attributeOwners:0,indexOwners:0,bufferUploadBytes:0},this.spatialSortEnabled=!0,this.capacity=8192,this.drawBuffer=null,this.drawData=null,this.drawCount=0,this.frame=-1,this.stats={draws:0,triangles:0,pipelines:0},this.drawLayout=null,this.drawBindGroup=null,this.syncPipelines=!0}_ensureDrawBuffer(){this.drawBuffer&&this.drawData.byteLength>=this.capacity*L||(this.drawBuffer&&this.drawBuffer.destroy(),this.drawBuffer=C.device.createBuffer({label:`draws`,size:this.capacity*L,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.drawData=new Float32Array(this.capacity*L/4),this.drawLayout=_([{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:`uniform`,hasDynamicOffset:!0,minBindingSize:160}}],`draw`),this.drawBindGroup=C.device.createBindGroup({label:`draws`,layout:this.drawLayout,entries:[{binding:0,resource:{buffer:this.drawBuffer,size:160}}]}))}_beginFrame(){this.frame!==C.frame&&(this.frame=C.frame,this._ensureDrawBuffer(),this.drawCount>this.capacity*.75&&(this.capacity*=2,this._ensureDrawBuffer()),this.drawCount=0,C.onSubmit(()=>{this.drawCount&&C.queue.writeBuffer(this.drawBuffer,0,this.drawData.buffer,0,this.drawCount*L)}),this.stats.draws=0,this.stats.triangles=0)}_slot(e){let t=e.__draw;if(t||=e.__draw={frame:-1,slot:0,cur:new Float32Array(16),prev:new Float32Array(16),has:!1},t.frame===C.frame)return t.slot;if(this.drawCount>=this.capacity)throw Error(`MeshRenderer: draw buffer full`);t.frame=C.frame,t.slot=this.drawCount++;let n=e.matrixWorld.elements;t.has&&!e.resetVelocity?t.prev.set(t.cur):t.prev.set(n),t.cur.set(n),t.has=!0,e.resetVelocity=!1;let r=t.slot*L/4,i=this.drawData;i.set(t.cur,r),i.set(e.staticVelocity?t.cur:t.prev,r+16);let a=e.drawParams;if(i[r+32]=e.id??0,i[r+33]=a?a[0]:0,i[r+34]=a?a[1]:0,i[r+35]=a?a[2]:0,a&&a.length>3)for(let e=0;e<4;e++)i[r+36+e]=a[3+e]??0;return t.slot}_geometryGPU(e){let t=this.geometries.get(e);return t||(t={buffers:new Map,index:null,indexVersion:-1},this.geometries.set(e,t),e.addEventListener&&e.addEventListener(`dispose`,()=>{if(!t.disposed){t.disposed=!0;for(let[e,n]of t.buffers)this._releaseShared(this.sharedAttributes,e,n);t.index&&this._releaseShared(this.sharedIndices,t.indexAttribute,t.index),this.geometries.delete(e)}})),t}_releaseShared(e,t,n){this.resourceStats[n.kind===`index`?`indexOwners`:`attributeOwners`]--,--n.owners===0&&(n.buffer?.destroy(),n.buffer&&this.resourceStats[n.kind===`index`?`indexBuffers`:`vertexBuffers`]--,this.resourceStats[n.kind===`index`?`indexBytes`:`vertexBytes`]-=n.allocationBytes||0,e.delete(t))}_attributeBuffer(e,t){let n=this._geometryGPU(e),r=t.isInterleavedBufferAttribute?t.data:t;if(r.gpuBuffer)return r.gpuBuffer.getGPU?r.gpuBuffer.getGPU():r.gpuBuffer;let i=n.buffers.get(r);i||(i=this.sharedAttributes.get(r),i||(i={buffer:null,size:0,version:-1,owners:0,kind:`attribute`,allocationBytes:0},this.sharedAttributes.set(r,i)),i.owners++,this.resourceStats.attributeOwners++,n.buffers.set(r,i));let a=r.version??0;if(i&&i.version===a&&i.array===r.array)return i.buffer;let o=ot(t);if((!i.buffer||i.size<o.byteLength)&&(i.buffer?i.buffer.destroy():this.resourceStats.vertexBuffers++,this.resourceStats.vertexBytes-=i.allocationBytes,i.allocationBytes=Math.max(16,R(o.byteLength)),this.resourceStats.vertexBytes+=i.allocationBytes,i.buffer=C.device.createBuffer({label:t.name||`attribute`,size:Math.max(16,R(o.byteLength)),usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),i.size=o.byteLength,i.version=-1),i.version!==a||i.array!==r.array){let e=r.updateRanges&&r.updateRanges.length&&i.version>=0&&i.array===r.array?r.updateRanges:null;if(e&&o===r.array){let t=r.array.BYTES_PER_ELEMENT;for(let n of e)C.queue.writeBuffer(i.buffer,n.start*t,r.array.buffer,r.array.byteOffset+n.start*t,R(n.count*t)),this.resourceStats.bufferUploadBytes+=R(n.count*t);r.clearUpdateRanges?r.clearUpdateRanges():r.updateRanges.length=0}else it(i.buffer,o),this.resourceStats.bufferUploadBytes+=R(o.byteLength);i.version=a}return i.array=r.array,i.buffer}_indexBuffer(e){let t=e.index;if(!t)return null;let n=this._geometryGPU(e);if(n.index&&n.indexAttribute!==t&&(this._releaseShared(this.sharedIndices,n.indexAttribute,n.index),n.index=null),!n.index){let e=this.sharedIndices.get(t);e||(e={buffer:null,size:0,version:-1,owners:0,array:null,ref:null,kind:`index`,allocationBytes:0},this.sharedIndices.set(t,e)),e.owners++,this.resourceStats.indexOwners++,n.index=e,n.indexAttribute=t}let r=n.index;if(r.ref&&r.array===t.array&&r.version===(t.version??0))return r.ref;let i=t.array instanceof Uint16Array||t.array instanceof Uint32Array?t.array:new Uint32Array(t.array);return(!r.buffer||r.size<i.byteLength)&&(r.buffer?r.buffer.destroy():this.resourceStats.indexBuffers++,this.resourceStats.indexBytes-=r.allocationBytes,r.allocationBytes=Math.max(16,R(i.byteLength)),this.resourceStats.indexBytes+=r.allocationBytes,r.buffer=C.device.createBuffer({label:`index`,size:Math.max(16,R(i.byteLength)),usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),r.size=i.byteLength,r.version=-1),(r.version!==(t.version??0)||r.array!==t.array)&&(it(r.buffer,i),this.resourceStats.bufferUploadBytes+=R(i.byteLength),r.version=t.version??0),r.array=t.array,r.ref={buffer:r.buffer,format:i instanceof Uint16Array?`uint16`:`uint32`},r.ref}_cachedLayout(e,t,n,r=null){let i=Qe.get(t);i||Qe.set(t,i=new Map);let a=e.isInstancedMesh?e.instanceColor?2:1:0,o=tt(e,t,n,r),s=o?n.id+`:exact-finish-palette`:a?n.id+`:`+a:n.id,c=n.skipVertexUV===!0,l=i.get(s);if(l&&l.palette===o&&l.version===n.version&&l.skipVertexUV===c&&l.attrsVersion===t.attributesVersion&&(!a||l.instanceMatrix===e.instanceMatrix)){let e=l.refs,n=l.names,r=t.attributes,i=!0;for(let t=0;t<n.length;t++)if(r[n[t]]!==e[t]){i=!1;break}if(i)return l.vl}let u=this._layout(e,t,n,r),d=u.layout.filter(e=>!e.name.startsWith(`instance`)&&e.name!==`yachtFinishIndex`).map(e=>e.name);return l={version:n.version,palette:o,skipVertexUV:c,attrsVersion:t.attributesVersion,instanceMatrix:e.instanceMatrix,names:d,refs:d.map(e=>t.attributes[e]),vl:u},u.pipelines=new Map,i.set(s,l),u}_layout(e,t,n,r=null){let i=[],a=tt(e,t,n,r),o=[`position`,`normal`,`uv`,`color`,...Object.keys(n.attributes)];for(let e of o){if(e===`uv`&&n.skipVertexUV===!0||a&&(e===`color`||e===`aSurface`))continue;let r=t.attributes[e];r&&(e!==`color`||n.vertexColors||n.attributes.color)&&i.push({name:e,attr:r})}if(a&&i.push({name:`yachtFinishIndex`,attr:a.attribute}),e.isInstancedMesh){for(let t=0;t<4;t++)i.push({name:`instanceMatrix`+t,attr:e.instanceMatrix,column:t});e.instanceColor&&i.push({name:`instanceColor`,attr:e.instanceColor})}let s=[],c=[],l=new Map,u=0;for(let e of i){let t=e.attr,r=t.isInterleavedBufferAttribute?t.data:t,i=!!(t.isInstancedBufferAttribute||r.isInstancedInterleavedBuffer||t.meshPerAttribute||r.meshPerAttribute)||e.name.startsWith(`instance`),a=ct(t),o=l.get(r);if(o===void 0){o=s.length,l.set(r,o);let e=t.isInterleavedBufferAttribute?t.data.stride*a.bytesPerComponent:t.itemSize*a.bytesPerComponent;s.push({src:r,attr:t,layout:{arrayStride:a.converted?a.itemSize*4:e,stepMode:i?`instance`:`vertex`,attributes:[]}})}let d=t.isInterleavedBufferAttribute?t.offset*a.bytesPerComponent:0,f=a.format,p=a.wgsl;e.column!==void 0&&(d=e.column*16,f=`float32x4`,p=`vec4f`),s[o].layout.attributes.push({shaderLocation:u,offset:d,format:f}),(e.name===`position`||e.name===`normal`)&&(p=`vec3f`),e.name===`uv`&&(p=`vec2f`),e.name===`color`&&(p=t.itemSize===4?`vec4f`:`vec3f`),e.name===`instanceColor`&&(p=`vec3f`),n.attributes[e.name]&&(p=n.attributes[e.name]),c.push({name:e.name,wgsl:p,location:u,instanced:i}),u++}return{key:c.map(e=>`${e.name}:${e.wgsl}`).join(`,`)+`|`+s.map(e=>`${e.layout.arrayStride}/${e.layout.stepMode}/${e.layout.attributes.map(e=>e.format+`@`+e.offset).join(`;`)}`).join(`,`),layout:c,buffers:s}}_pipeline(e,t,n){e.__pkFrame!==C.frame&&(e.__pk=e.pipelineKey()+`|`+ue.version,e.__pkFrame=C.frame);let r=n.passKey,i=t.pipelines&&t.pipelines.get(r);if(i&&i.materialKey===e.__pk)return i.p;let a=`${e.__pk}|${t.key}|${r}`,o=this.pipelines.get(a);return o||=this._createPipeline(e,t,n,a),t.pipelines&&t.pipelines.set(r,{materialKey:e.__pk,p:o}),o}_createPipeline(e,t,n,r){let i=Ue(e,t.layout,n),a=o({modules:i.modules,bindings:i.bindings,code:i.code,defines:i.defines,stage:`render`,label:e.name}),s=f(a.code,e.name);this._ensureDrawBuffer();let c=C.device.createPipelineLayout({bindGroupLayouts:[a.group0.layout,a.bindings.layout,this.drawLayout]}),l=pe(e.blending),u=[];if(n.kind===`main`){let t=n.defines?.WATER_MAP_MOTION&&!e.transparent&&e.velocityWeight===1,r=n.defines?.WATER_MAP_MOTION&&e.defines?.YACHT_OPAQUE_COLOR&&!e.transparent;u=[{format:n.colorFormats[0],blend:!r&&(e.transparent||n.late)?l:void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0},{format:n.colorFormats[1],blend:n.late&&!t?pe(`premultiplied`):void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0}],n.colorFormats.length>2&&u.push({format:n.colorFormats[2],blend:pe(`normal`),writeMask:e.colorWrite?GPUColorWrite.ALL:0})}else n.kind===`color`&&(u=n.colorFormats.map(t=>({format:t,blend:l,writeMask:e.colorWrite?GPUColorWrite.ALL:0})));let d=e.side,p=n.cullOverride||(d===`double`?`none`:d===`back`?`front`:`back`),m=e.depthTest?e.depthCompare||n.depthCompare:`always`,h={label:e.name+` `+n.kind,layout:c,vertex:{module:s,entryPoint:`vs`,buffers:t.buffers.map(e=>e.layout)},primitive:{topology:e.topology,cullMode:p,frontFace:`ccw`}};i.hasFragment&&(h.fragment={module:s,entryPoint:`fs`,targets:u}),n.depthFormat&&(h.depthStencil={format:n.depthFormat,depthWriteEnabled:e.depthWrite,depthCompare:m,depthBias:n.kind===`depth`?n.depthBias||0:e.depthBias,depthBiasSlopeScale:n.kind===`depth`?n.depthBiasSlopeScale||0:e.depthBiasSlopeScale});let g={handle:C.renderPipeline(h),bindings:a.bindings,label:h.label};return this.pipelines.set(r,g),this.stats.pipelines=this.pipelines.size,g}collect(e,{camera:t,layerMask:n=4294967295,filter:r=null,kind:i=`main`,cull:a=!0,frameBlock:o=g}){let s=[],c=[];t&&(t.updateMatrixWorld(),Ke.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse.copy(t.matrixWorld).invert()),Ge.setFromProjectionMatrix(Ke,t.reversedDepth!==!1),I.setFromMatrixPosition(t.matrixWorld));let l=this.precompiling,u=e=>{if(e.visible||l){e.isMesh&&e.material&&e.geometry&&(e.layers.mask&n)!==0&&(!r||r(e))&&(i!==`depth`||e.castShadow)&&(l||!a||!t||e.frustumCulled===!1||this._inFrustum(e,t,o,i))&&(e.onBeforeRender&&e.onBeforeRender(null,null,t,e.geometry,e.material,null),(e.visible||l)&&this._addItems(e,s,c,i));for(let t of e.children)u(t)}};e.updateMatrixWorld(),u(e),s.sort((e,t)=>e.renderOrder-t.renderOrder||e.pipeKey-t.pipeKey||e.z-t.z);for(let e=1;e<s.length;e++){let t=e;for(;t>0;){let e=s[t-1],n=s[t];if(!e.sortBounds||!n.sortBounds||e.renderOrder!==n.renderOrder||e.pipeKey!==n.pipeKey||e.spatialDepth<=n.spatialDepth||e.sortBounds.intersectsBox(n.sortBounds)||!Ze(e.sortDepthRange,n.sortDepthRange))break;s[t-1]=n,s[t]=e,t--}}return c.sort((e,t)=>e.renderOrder-t.renderOrder||t.z-e.z),{opaque:s,transparent:c}}_inFrustum(e,t,n,r){let i=null;if(e.isInstancedMesh?(!e.boundingSphere&&e.computeBoundingSphere&&e.computeBoundingSphere(),i=e.boundingSphere):(e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),i=e.geometry.boundingSphere),!i||i.radius<0||!Number.isFinite(i.radius))return!0;if(F.copy(i).applyMatrix4(e.matrixWorld),e.userData?.spatialSort&&t){let e=F.center.distanceTo(I)+F.radius,i=Math.max(.001,e*1e-6);if(r!==`depth`){let r=n?.fields,a=r?.resolution?.value,o=r?.jitter?.value,s=Math.max(1,a?.x||1),c=Math.max(1,a?.y||1),l=Math.max(2,Math.abs(o?.x||0)*s/2+1),u=Math.max(2,Math.abs(o?.y||0)*c/2+1),d=t.projectionMatrix.elements,f=d[15]===0?e:1;i+=Math.max(2*l/(s*Math.abs(d[0])),2*u/(c*Math.abs(d[5])))*f}F.radius+=i}return Ge.intersectsSphere(F)}_addItems(e,t,n,r=`main`){let i=e.geometry,a=Array.isArray(e.material)?e.material:null,o=qe.setFromMatrixPosition(e.matrixWorld).distanceToSquared(I),s=this.spatialSortEnabled&&e.userData?.spatialSort&&i.boundingBox?Je.copy(i.boundingBox).applyMatrix4(e.matrixWorld).expandByScalar(.001).clone():null,c=s?s.distanceToPoint(I)**2:o,l=s?Xe(s,Ke):null,u=(r,a,u,d=r?.id)=>{if(!r||!r.visible&&!this.precompiling)return;let f=r.depthTest&&r.depthWrite&&r.blending===`none`,p={object:e,geometry:i,material:r,start:a,count:u,z:o,spatialDepth:c,sortBounds:f?s:null,sortDepthRange:l,renderOrder:e.renderOrder||0,pipeKey:d};(r.transparent?n:t).push(p)},d=i.drawRange||{start:0,count:1/0},f=nt(e,r);if(f){if(!f.originalMaterial.visible&&!this.precompiling)return;for(let e of f.groups){let t=Math.max(e.start,d.start),n=Math.min(e.start+e.count,d.start+d.count);n>t&&u(e.material,t,n-t,f.originalMaterial.id)}return}if(a&&i.groups&&i.groups.length)for(let e of i.groups){let t=Math.max(e.start,d.start),n=Math.min(e.start+e.count,d.start+d.count);n>t&&u(a[e.materialIndex],t,n-t)}else u(a?a[0]:e.material,d.start,d.count)}async prepareMeshes(e,t,{cancelled:n=()=>!1}={}){let r=new Set,i=globalThis.performance?.now()??Date.now();for(let a of t){let t={kind:`main`,late:!1,colorFormats:[],depthFormat:null,depthCompare:`greater-equal`,frameBlock:g,layerMask:4294967295,...a};t.passKey=`${t.kind}.${+!!t.late}.${t.colorFormats.join(`,`)}.${t.depthFormat}.${t.depthCompare}.${t.cullOverride||``}.${t.defines?JSON.stringify(t.defines):``}`+et(t);for(let a of e){if(n())return;if(!(a.layers.mask&t.layerMask)||t.kind===`depth`&&!a.castShadow)continue;this._indexBuffer(a.geometry);let e=nt(a,t.kind),o=e?[...new Set(e.groups.map(e=>e.material))]:[a.material];for(let e of o){let n=this._cachedLayout(a,a.geometry,e,t);r.add(this._pipeline(e,n,t).handle)}(globalThis.performance?.now()??Date.now())-i>=8&&typeof requestAnimationFrame==`function`&&(await new Promise(e=>requestAnimationFrame(e)),i=globalThis.performance?.now()??Date.now())}}if(await C.pipelinesReady(),!n()){for(let e of r)if(e.failed||!e.pipeline)throw Error(`Could not prepare `+e.label)}}render(e,t){this._beginFrame(),t={kind:`main`,late:!1,colorFormats:[],depthFormat:null,depthCompare:`greater-equal`,frameBlock:g,layerMask:4294967295,...t},t.passKey=`${t.kind}.${+!!t.late}.${t.colorFormats.join(`,`)}.${t.depthFormat}.${t.depthCompare}.${t.cullOverride||``}.${t.defines?JSON.stringify(t.defines):``}`+et(t);let n=t.items||this.collect(e,t);this._prepareYachtTriangleCull(n,t),this._prepareYachtOpaqueIndexOrder(n,t);let r=C.getEncoder(),i=(t.colorViews||[]).map((e,n)=>{let r=t.clearColors?t.clearColors[n]:null;return{view:e,loadOp:r?`clear`:`load`,storeOp:`store`,clearValue:r||[0,0,0,0]}}),a={label:t.label||t.kind,colorAttachments:i};t.depthView&&(a.depthStencilAttachment={view:t.depthView,depthLoadOp:t.clearDepth===null||t.clearDepth===void 0?`load`:`clear`,depthStoreOp:t.depthStoreOp||`store`,depthClearValue:t.clearDepth??0}),t.timestampWrites&&(a.timestampWrites=t.timestampWrites);let o=r.beginRenderPass(a);t.viewport&&o.setViewport(...t.viewport),o.setBindGroup(0,s(t.frameBlock,`render`).getBindGroup()),this.drawItems(o,n.opaque,t),t.betweenLists&&t.betweenLists(o),this.drawItems(o,n.transparent,t),t.after&&t.after(o),o.end()}_prepareYachtTriangleCull(e,t){if(t.kind===`main`&&t.waterObjectCropModule){for(let t of[...e.opaque,...e.transparent])t.yachtTriangleCull=null;return}if(this.precompiling||t.kind!==`main`||!t.yachtTriangleCull||t.viewport||(t.sampleCount??1)!==1)return;let n=t.frameBlock?.fields,r=n?.resolution?.value,i=n?.viewProj?.value;if(!r||!i)return;let a=e=>{for(let n of e){n.yachtTriangleCull=null;let{object:e,geometry:a,material:o}=n,s=a.index?.count??a.attributes.position?.count??a.vertexCount??0,c=Math.min(n.count,s-n.start);if(c<=0)continue;let l=this._cachedLayout(e,a,o,t),u=this._pipeline(o,l,t);(u.handle.pipeline||this.syncPipelines&&C.ready(u.handle))&&(this._slot(e),n.yachtTriangleCull=t.yachtTriangleCull.prepare(e,{model:e.__draw.cur,viewProj:i,width:r.x,height:r.y,start:n.start,count:c}))}};a(e.opaque),a(e.transparent)}_prepareYachtOpaqueIndexOrder(e,t){if(!t.waterOpaqueIndexOrder)return;for(let t of[...e.opaque,...e.transparent])t.yachtOpaqueIndexOrder=null;if(this.precompiling||t.kind!==`main`||t.viewport||t.waterObjectCropModule||t.yachtTriangleCull||(t.sampleCount??1)!==1||t.depthFormat!==`depth32float`||t.depthCompare!==`greater-equal`)return;let n=t.frameBlock?.fields,r=n?.resolution?.value,i=n?.viewProj?.value;if(r&&i)for(let n of e.opaque){let{object:e,geometry:a,material:o}=n,s=Math.min(n.count,(a.index?.count??0)-n.start);if(s<=0||o.transparent)continue;let c=this._cachedLayout(e,a,o,t),l=this._pipeline(o,c,t);(l.handle.pipeline||this.syncPipelines&&C.ready(l.handle))&&(this._slot(e),n.yachtOpaqueIndexOrder=t.waterOpaqueIndexOrder.prepare(e,{material:o,model:e.__draw.cur,viewProj:i,width:r.x,height:r.y,start:n.start,count:s}))}}drawItems(e,t,n){let r=null,i=null,a=new Re(e),o=++$e;for(let s of t){let{object:t,geometry:c,material:l}=s;if(!c.attributes.position&&!c.vertexCount&&!c.indirect)continue;let u,d;if(this.precompiling){try{u=this._cachedLayout(t,c,l,n),d=this._pipeline(l,u,n)}catch{continue}continue}u=this._cachedLayout(t,c,l,n),d=this._pipeline(l,u,n);let f=d.handle.pipeline||(this.syncPipelines?C.ready(d.handle):null);if(!f)continue;d!==r&&(e.setPipeline(f),r=d);let p=d.bindings.getBindGroup(o);p!==i&&(e.setBindGroup(1,p),i=p),a.bindObject(this.drawBindGroup,this._slot(t)*L);for(let e=0;e<u.buffers.length;e++)a.bindVertex(e,this._attributeBuffer(c,u.buffers[e].attr));let m=t.isInstancedMesh?t.count:c.instanceCount??1;if(m===0)continue;let h=n.kind===`main`&&n.yachtTriangleCull&&!n.viewport&&(n.sampleCount??1)===1?s.yachtTriangleCull:null;if(h){a.bindIndex(h.indexBuffer,h.indexFormat),e.drawIndexedIndirect(h.indirectBuffer,0),this.stats.draws++;continue}let g=n.kind===`main`&&n.waterOpaqueIndexOrder&&!n.viewport&&!n.waterObjectCropModule&&!n.yachtTriangleCull&&(n.sampleCount??1)===1?s.yachtOpaqueIndexOrder:null;if(g){a.bindIndex(g.indexBuffer,g.indexFormat),e.drawIndexed(g.count,m===1/0?1:m,g.start,0,0),this.stats.draws++,this.stats.triangles+=g.count/3*m;continue}let _=this._indexBuffer(c);if(c.indirect){let t=c.indirect.buffer.getGPU?c.indirect.buffer.getGPU():c.indirect.buffer,n=c.indirect.offsets||[c.indirect.offset||0];_&&a.bindIndex(_.buffer,_.format);for(let r of n)_?e.drawIndexedIndirect(t,r):e.drawIndirect(t,r),this.stats.draws++;continue}if(_){let t=Math.min(s.count,c.index.count-s.start);if(t<=0)continue;a.bindIndex(_.buffer,_.format),e.drawIndexed(t,m===1/0?1:m,s.start,0,0),this.stats.triangles+=t/3*m}else{let t=c.attributes.position?c.attributes.position.count:c.vertexCount,n=Math.min(s.count,t-s.start);if(n<=0)continue;e.draw(n,m,s.start,0),this.stats.triangles+=n/3*m}this.stats.draws++}}};function R(e){return Math.ceil(e/4)*4}function it(e,t){if(t.byteLength%4==0){C.queue.writeBuffer(e,0,t.buffer,t.byteOffset,t.byteLength);return}let n=new Uint8Array(R(t.byteLength));n.set(new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),C.queue.writeBuffer(e,0,n)}var at=new WeakMap;function ot(e){let t=e.isInterleavedBufferAttribute?e.data:e;if(!ct(e).converted)return t.array;let n=at.get(t);if(n&&n.version===t.version)return n.array;let r=e.count,i=e.itemSize,a=new Float32Array(r*i),o=e.normalized?st(t.array):1;for(let e=0;e<r*i;e++)a[e]=t.array[e]/o;return at.set(t,{version:t.version,array:a}),a}function st(e){return e instanceof Uint8Array?255:e instanceof Int8Array?127:e instanceof Uint16Array?65535:e instanceof Int16Array?32767:1}function ct(e){let t=(e.isInterleavedBufferAttribute?e.data:e).array,n=e.itemSize,r=e.normalized,i=e=>n===1?e:`vec${n}${e===`f32`?`f`:e===`u32`?`u`:`i`}`;if(t instanceof Float32Array)return{format:n===1?`float32`:`float32x${n}`,wgsl:i(`f32`),bytesPerComponent:4,itemSize:n};if(t instanceof Uint32Array)return{format:n===1?`uint32`:`uint32x${n}`,wgsl:i(`u32`),bytesPerComponent:4,itemSize:n};if(t instanceof Int32Array)return{format:n===1?`sint32`:`sint32x${n}`,wgsl:i(`i32`),bytesPerComponent:4,itemSize:n};let a={Uint8Array:[`uint8`,`unorm8`,1],Int8Array:[`sint8`,`snorm8`,1],Uint16Array:[`uint16`,`unorm16`,2],Int16Array:[`sint16`,`snorm16`,2]}[t.constructor.name];return a&&(n===2||n===4)&&!e.isInterleavedBufferAttribute?{format:(r?a[1]:a[0])+`x`+n,wgsl:i(r?`f32`:t instanceof Uint8Array||t instanceof Uint16Array?`u32`:`i32`),bytesPerComponent:a[2],itemSize:n}:{format:n===1?`float32`:`float32x${n}`,wgsl:i(`f32`),bytesPerComponent:4,itemSize:n,converted:!0}}var lt=class{constructor(e){this.container=e,this.renderScale=1,this.clock=new ge,this.frame=0,this.onResize=[],this.renderOptimizations=P(),this.pacingStats={callbacks:0,submitted:0,completed:0,skipped:0,inFlight:0,maxInFlight:0}}async init(){let e=document.createElement(`canvas`);e.tabIndex=0,this.container.appendChild(e),this.canvas=e,this.domElement=e,await C.init({canvas:e}),C.reuseAllocationBindings=this.renderOptimizations.bindingReuse,this.meshRenderer=new rt,this.meshRenderer.syncPipelines=!1,this.camera=new re(62,window.innerWidth/window.innerHeight,.06,6e4),this.scene=new ie,window.addEventListener(`resize`,()=>this.resize()),this.resize()}setRenderScale(e){this.renderScale=e,this.resize()}get width(){return this.canvas.width}get height(){return this.canvas.height}resize(){let e=window.innerWidth,t=window.innerHeight,n=this.renderScale;this.canvas.width=Math.max(1,Math.floor(e*n)),this.canvas.height=Math.max(1,Math.floor(t*n)),this.canvas.style.width=e+`px`,this.canvas.style.height=t+`px`,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),g.fields.outputResolution.value.set(this.canvas.width,this.canvas.height);for(let n of this.onResize)n(e,t)}currentTexture(){return C.context.getCurrentTexture()}start(e){this.stop(),this._running=!0;let t=this._loopGeneration,n=C.queue,r=this.renderOptimizations.framePacing;(!this._flight||this._flight.queue!==n)&&(this._flight={queue:n,count:0});let i=this._flight,a=this.pacingStats;r&&this.clock.reset();let o=s=>{if(this._running&&t===this._loopGeneration){if(a.callbacks++,r&&i.count>=2)a.skipped++;else{this.clock.update(s),this.frameInterval=this.clock.getDelta();let t=Math.min(.1,this.frameInterval);this.frame++,e(t,this.clock.getElapsed()),a.submitted++,r&&(i.count++,a.inFlight=i.count,a.maxInFlight=Math.max(a.maxInFlight,i.count),n.onSubmittedWorkDone().then(()=>{i.count--,a.completed++,i===this._flight&&(a.inFlight=i.count)},e=>{i.count--,i===this._flight&&(a.inFlight=i.count,a.error=String(e),this.stop(),console.error(`Frame queue failed:`,e))}))}this._running&&t===this._loopGeneration&&(this._raf=requestAnimationFrame(o))}};this._raf=requestAnimationFrame(o)}stop(){this._running=!1,this._loopGeneration=(this._loopGeneration||0)+1,cancelAnimationFrame(this._raf)}},ut=class{constructor(e){this.dom=e,this.keys=new Set,this.pressed=new Set,this.look={x:0,y:0},this.wheel=0,this.mouseDown=!1,this.rightDown=!1,this.locked=!1,this.enabled=!0,window.addEventListener(`keydown`,e=>{(!e.target||e.target.tagName!==`INPUT`&&e.target.tagName!==`SELECT`&&e.target.tagName!==`TEXTAREA`)&&(this.keys.has(e.code)||this.pressed.add(e.code),this.keys.add(e.code),[`Space`,`ArrowUp`,`ArrowDown`,`Tab`].includes(e.code)&&e.preventDefault())}),window.addEventListener(`keyup`,e=>this.keys.delete(e.code)),window.addEventListener(`blur`,()=>this.keys.clear()),e.addEventListener(`mousedown`,e=>{e.button===0&&(this.mouseDown=!0),e.button===2&&(this.rightDown=!0)}),window.addEventListener(`mouseup`,e=>{e.button===0&&(this.mouseDown=!1),e.button===2&&(this.rightDown=!1)}),e.addEventListener(`contextmenu`,e=>e.preventDefault()),window.addEventListener(`mousemove`,e=>{(this.locked||this.mouseDown||this.rightDown)&&(this.look.x+=e.movementX,this.look.y+=e.movementY)}),e.addEventListener(`wheel`,e=>{this.wheel+=Math.sign(e.deltaY),e.preventDefault()},{passive:!1}),document.addEventListener(`pointerlockchange`,()=>{this.locked=document.pointerLockElement===e})}requestLock(){this.locked||this.dom.requestPointerLock?.()?.catch?.(()=>{})}down(e){return this.enabled&&this.keys.has(e)}hit(e){return this.enabled&&this.pressed.has(e)}consumeLook(){let e={x:this.look.x,y:this.look.y};return this.look.x=0,this.look.y=0,e}consumeWheel(){let e=this.wheel;return this.wheel=0,e}endFrame(){this.pressed.clear()}},dt=new e,ft=new v,pt=new r,mt=new y,ht=new y,z={OPAQUE:0,WATER:1,TRANSPARENT:2,REFLECT_ONLY:3},gt=Ie(P().compactTargets),B=`depth32float`,_t=class{constructor(e,t,n){this.meshRenderer=e,this.scene=t,this.camera=n,this.scale=1,this.waterEnabled=!0,this.refractionEnabled=!0,this.renderOptimizations=P(),this.visibilityDepth=!this.renderOptimizations.reference&&new URLSearchParams(globalThis.location?.search||``).has(`visibilityDepth`),this.width=1,this.height=1,this.sceneRT=new E(1,1,{colors:gt.map((e,t)=>({format:e,name:[`color`,`velocity`,`waterMask`][t]})),depth:B,label:`scene`}),this.velocityTexture=this.sceneRT.textures[1],this.waterMaskTexture=this.sceneRT.textures[2],this.opaqueCopy=new E(1,1,{colors:[`rgba16float`],depth:B,label:`opaqueCopy`}),this.opaqueDepthHalf=new E(1,1,{colors:[`r16float`],label:`opaqueDepthHalf`}),this._depthHalfPass=null,this.hullMaskRT=new E(1,1,{colors:[`r16float`],depth:B,label:`hullMask`}),this.hullMaskScene=new ie,this.hullMaskMaterial=new me({name:`hullMask`,lit:!1,side:`double`,surface:`s.albedo = vec3f( length( in.P - frame.cameraPos ), 0.0, 0.0 ); s.emissive = vec3f( 0.0 );`}),this.hullMasks=[],this.hullMaskActive={value:0},this.background=null,this.clearColor=[0,0,0,1],this.onBeforeWater=null}setSize(e,t){this.width=e,this.height=t,this.sceneRT.setSize(e,t),this.opaqueCopy.setSize(e,t),this.opaqueDepthHalf.setSize(e,t),this.hullMaskRT.setSize(e,t)}addHullMask(e,t){e.computeBoundingBox(),e.computeBoundingSphere();let n=new ne(e,this.hullMaskMaterial);return n.matrixAutoUpdate=!1,n.frustumCulled=!1,this.hullMaskScene.add(n),this.hullMasks.push({mesh:n,object:t,box:e.boundingBox.clone().expandByScalar(.05),sphere:e.boundingSphere}),n}_renderHullMasks(e){let t=0;pt.setFromProjectionMatrix(mt.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse));for(let n of this.hullMasks){n.object.updateWorldMatrix(!0,!1),n.mesh.matrix.copy(n.object.matrixWorld),n.mesh.matrixWorld.copy(n.object.matrixWorld),dt.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ht.copy(n.object.matrixWorld).invert());let r=!n.box.containsPoint(dt)&&pt.intersectsSphere(ft.copy(n.sphere).applyMatrix4(n.object.matrixWorld));n.mesh.visible=r,r&&t++}if(this.hullMaskActive.value=+(t>0),!t)return;let n=this.hullMaskRT;this.meshRenderer.render(this.hullMaskScene,{label:`hull mask`,kind:`color`,camera:e,colorViews:[n.texture.view()],colorFormats:n.formats,clearColors:[[0,0,0,0]],depthView:n.depthTexture.view(),depthFormat:B,clearDepth:0,cull:!1})}render(){let{scene:e,camera:t,meshRenderer:n}=this,r=this.sceneRT,i={camera:t,colorViews:r.textures.map(e=>e.view()),colorFormats:r.formats,depthView:r.depthTexture.view(),depthFormat:B,kind:`main`};this.visibilityDepth&&n.render(e,{label:`opaque visibility depth`,kind:`visibility`,camera:t,depthView:i.depthView,depthFormat:B,clearDepth:0,layerMask:1<<z.OPAQUE,filter:e=>!Array.isArray(e.material)&&!e.material.transparent&&e.material.colorWrite&&e.material.depthWrite&&e.material.depthTest&&(e.material.depthCompare===null||e.material.depthCompare===`greater-equal`)&&e.material.blending===`none`&&!e.material.output}),n.render(e,{...i,label:`opaque`,layerMask:1<<z.OPAQUE,clearColors:[this.clearColor,[0,0,0,0],[0,0,0,0]],clearDepth:this.visibilityDepth?null:0,after:this.background?e=>this.background.draw(e):null});let a=C.getEncoder(),o={width:r.width,height:r.height};this.waterEnabled&&this.waterColorCopyEnabled!==!1&&a.copyTextureToTexture({texture:r.texture.getGPU()},{texture:this.opaqueCopy.texture.getGPU()},o),a.copyTextureToTexture({texture:r.depthTexture.getGPU()},{texture:this.opaqueCopy.depthTexture.getGPU()},o),this.waterEnabled&&this.refractionEnabled&&!this._depthHalfPass&&(this._depthHalfPass=new k({label:`opaque depth half`,colorFormats:[`r16float`],bindings:{srcDepth:{texture:()=>this.opaqueCopy.depthTexture}},code:`fn fragment( in: FSIn ) -> vec4f { return vec4f( textureLoad( srcDepth, vec2i( in.pos.xy ), 0 ), 0.0, 0.0, 1.0 ); }`})),this.waterEnabled&&this.refractionEnabled&&this._depthHalfPass.render({colorViews:[this.opaqueDepthHalf.texture],clear:[0,0,0,0]}),this.waterEnabled&&this.hullMasks.length>0&&this._renderHullMasks(t),this.waterEnabled&&this.refractionEnabled&&this.onBeforeWater&&this.onBeforeWater(),n.render(e,{...i,label:`water + transparent`,late:!0,layerMask:(this.waterEnabled?1<<z.WATER:0)|1<<z.TRANSPARENT})}},vt={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT4:16},yt={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},bt={5120:127,5121:255,5122:32767,5123:65535};async function xt(e){let t;if(globalThis.__assetFile)t=await globalThis.__assetFile(e);else{let n=await fetch(e);if(!n.ok)throw Error(`GLB: `+e+` `+n.status);t=await n.arrayBuffer()}return St(t)}function St(t){let r=new DataView(t);if(r.getUint32(0,!0)!==1179937895)throw Error(`GLB: bad magic`);let i=r.getUint32(8,!0),a=null,o=null;for(let e=12;e<i;){let n=r.getUint32(e,!0),i=r.getUint32(e+4,!0);i===1313821514?a=JSON.parse(new TextDecoder().decode(new Uint8Array(t,e+8,n))):i===5130562&&(o=new Uint8Array(t,e+8,n)),e+=8+n}if(!a)throw Error(`GLB: no JSON chunk`);if(a.extensionsRequired&&a.extensionsRequired.length)throw Error(`GLB: unsupported extensions `+a.extensionsRequired.join(`, `));let s=e=>{let t=a.bufferViews[e];if(t.buffer!==0||!o)throw Error(`GLB: external buffers are not supported`);return new Uint8Array(o.buffer,o.byteOffset+(t.byteOffset||0),t.byteLength)},c=e=>{let t=a.accessors[e];if(t.sparse)throw Error(`GLB: sparse accessors are not supported`);let n=vt[t.type],r=yt[t.componentType],i=new r(t.count*n);if(t.bufferView!==void 0){let e=a.bufferViews[t.bufferView],o=s(t.bufferView),c=o.byteOffset+(t.byteOffset||0),l=r.BYTES_PER_ELEMENT,u=e.byteStride||n*l;if(u===n*l&&c%l===0)i.set(new r(o.buffer,c,t.count*n));else{let e=new DataView(o.buffer),r={5120:t=>e.getInt8(t),5121:t=>e.getUint8(t),5122:t=>e.getInt16(t,!0),5123:t=>e.getUint16(t,!0),5125:t=>e.getUint32(t,!0),5126:t=>e.getFloat32(t,!0)}[t.componentType];for(let e=0;e<t.count;e++)for(let t=0;t<n;t++)i[e*n+t]=r(c+e*u+t*l)}}return{array:i,itemSize:n,normalized:!!t.normalized,componentType:t.componentType}},l=e=>{let t=c(e);if(t.array instanceof Float32Array)return t.array;let n=new Float32Array(t.array.length),r=t.normalized?1/bt[t.componentType]:1;for(let e=0;e<n.length;e++)n[e]=Math.max(t.array[e]*r,-1);return n},u=new y,d=new e,f=new n,p=new e,m=(a.nodes||[]).map(e=>{let t=e.translation||[0,0,0],n=e.rotation||[0,0,0,1],r=e.scale||[1,1,1];return e.matrix&&(u.fromArray(e.matrix).decompose(d,f,p),t=[d.x,d.y,d.z],n=[f.x,f.y,f.z,f.w],r=[p.x,p.y,p.z]),{name:e.name||``,children:e.children||[],t:t.slice(),r:n.slice(),s:r.slice(),mesh:e.mesh,skin:e.skin}}),h=(a.meshes||[]).map(e=>e.primitives.map(e=>{let t={};for(let n in e.attributes)t[n]=c(e.attributes[n]);return e.targets&&e.targets.length&&console.warn(`GLB: morph targets are ignored`),{attributes:t,indices:e.indices===void 0?null:c(e.indices).array,material:e.material,mode:e.mode??4}})),g=(a.skins||[]).map(e=>({name:e.name||``,joints:e.joints,skeleton:e.skeleton,inverseBindMatrices:e.inverseBindMatrices===void 0?Ct(e.joints.length):l(e.inverseBindMatrices)})),_=(a.animations||[]).map(e=>{let t=0,n=[];for(let r of e.channels){if(r.target.node===void 0||r.target.path===`weights`)continue;let i=e.samplers[r.sampler],a=l(i.input),o=l(i.output),s=r.target.path===`rotation`?4:3;if(i.interpolation===`CUBICSPLINE`){let e=new Float32Array(a.length*s);for(let t=0;t<a.length;t++)for(let n=0;n<s;n++)e[t*s+n]=o[(t*3+1)*s+n];o=e}t=Math.max(t,a[a.length-1]),n.push({node:r.target.node,path:r.target.path,times:a,values:o,step:i.interpolation===`STEP`})}let r=1/0;for(let e of n)r=Math.min(r,e.times[0]);if(r>0&&r<1/0){for(let e of n)for(let t=0;t<e.times.length;t++)e.times[t]-=r;t-=r}return{name:e.name||`clip`,duration:t,channels:n}}),v=(a.images||[]).map(e=>({bytes:e.bufferView===void 0?null:s(e.bufferView),mimeType:e.mimeType,uri:e.uri})),b=a.scenes?a.scenes[a.scene||0]:null,x=b?b.nodes:m.map((e,t)=>t).filter(e=>!m.some(t=>t.children.includes(e)));return{json:a,nodes:m,roots:x,meshes:h,skins:g,animations:_,materials:a.materials||[],textures:a.textures||[],images:v}}function Ct(e){let t=new Float32Array(e*16);for(let n=0;n<e;n++)t[n*16]=t[n*16+5]=t[n*16+10]=t[n*16+15]=1;return t}async function wt(e,t){if(globalThis.__assetImage)return globalThis.__assetImage(e,t);let n=await createImageBitmap(new Blob([e],{type:t}),{colorSpaceConversion:`none`,premultiplyAlpha:`none`}),r=new OffscreenCanvas(n.width,n.height).getContext(`2d`,{willReadFrequently:!0});r.drawImage(n,0,0);let i=n.width,a=n.height,o=r.getImageData(0,0,i,a).data;return n.close&&n.close(),{data:new Uint8Array(o.buffer,o.byteOffset,o.byteLength),width:i,height:a}}var Tt=e=>`
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
`;function Et({name:e,joints:t,jointBuffer:n,textures:r={},alphaMode:i=`OPAQUE`,alphaCutoff:a=.5,doubleSided:o=!1,surface:s=``,uniforms:c={},color:l=null,roughness:u=1,metalness:d=1,defines:f={},modules:p=[]}){let m={};r.albedo&&(m.chAlbedo=r.albedo),r.normal&&(m.chNormal=r.normal),r.orm&&(m.chOrm=r.orm);let h=`
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
`;return new me({name:e,modules:p,attributes:{skinIndex:`vec4u`,skinWeight:`vec4f`},storage:{skinJoints:{storage:n,access:`read`}},textures:m,uniforms:c,color:l||void 0,roughness:u,metalness:d,vertex:Tt(t),surface:h,side:o?`double`:`front`,alphaTest:i===`MASK`||i===`BLEND`?a:0,defines:{HAS_ALBEDO:+!!m.chAlbedo,HAS_ORM:+!!m.chOrm,HAS_NORMAL:+!!m.chNormal,...f}})}function Dt(e,t,n,r,i){let a=r[0],o=r[1],s=r[2],c=r[3],l=a+a,u=o+o,d=s+s,f=a*l,p=a*u,m=a*d,h=o*u,g=o*d,_=s*d,v=c*l,y=c*u,b=c*d,x=i[0],S=i[1],C=i[2];e[t]=(1-(h+_))*x,e[t+1]=(p+b)*x,e[t+2]=(m-y)*x,e[t+3]=0,e[t+4]=(p-b)*S,e[t+5]=(1-(f+_))*S,e[t+6]=(g+v)*S,e[t+7]=0,e[t+8]=(m+y)*C,e[t+9]=(g-v)*C,e[t+10]=(1-(f+h))*C,e[t+11]=0,e[t+12]=n[0],e[t+13]=n[1],e[t+14]=n[2],e[t+15]=1}function Ot(e,t,n,r,i,a){for(let o=0;o<4;o++){let s=i[a+o*4],c=i[a+o*4+1],l=i[a+o*4+2],u=i[a+o*4+3];for(let i=0;i<4;i++)e[t+o*4+i]=n[r+i]*s+n[r+4+i]*c+n[r+8+i]*l+n[r+12+i]*u}}function kt(e,t,n){let r=e.times,i=e.values,a=e.path===`rotation`?4:3,o=r.length;if(o===1||t<=r[0]){for(let e=0;e<a;e++)n[e]=i[e];return}if(t>=r[o-1]){for(let e=0;e<a;e++)n[e]=i[(o-1)*a+e];return}let s=e._k||0;for(r[s]>t&&(s=0);s<o-2&&r[s+1]<=t;)s++;e._k=s;let c=e.step?0:(t-r[s])/(r[s+1]-r[s]),l=s*a,u=(s+1)*a;if(a===4){let e=i[l]*i[u]+i[l+1]*i[u+1]+i[l+2]*i[u+2]+i[l+3]*i[u+3]<0?-c:c,t=i[l]*(1-c)+i[u]*e,r=i[l+1]*(1-c)+i[u+1]*e,a=i[l+2]*(1-c)+i[u+2]*e,o=i[l+3]*(1-c)+i[u+3]*e,s=1/Math.hypot(t,r,a,o);n[0]=t*s,n[1]=r*s,n[2]=a*s,n[3]=o*s}else for(let e=0;e<3;e++)n[e]=i[l+e]+(i[u+e]-i[l+e])*c}var At=class e{static async create(t,{materials:n=null,textureSize:r=null}={}){let i=new e(t);return await i._buildMeshes(n),i}constructor(e){this.gltf=e;let t=e.skins[0];if(!t)throw Error(`SkinnedModel: no skin`);this.skin=t;let n=e.nodes.length;this.nodeCount=n,this.joints=t.joints.length,this.rest=e.nodes.map(e=>({t:Float32Array.from(e.t),r:Float32Array.from(e.r),s:Float32Array.from(e.s)})),this.local=e.nodes.map(e=>({t:Float32Array.from(e.t),r:Float32Array.from(e.r),s:Float32Array.from(e.s)})),this.world=new Float32Array(n*16),this._localM=new Float32Array(16),this.order=[],this.parent=new Int32Array(n).fill(-1);let r=t=>{this.order.push(t);for(let n of e.nodes[t].children)this.parent[n]=t,r(n)};for(let t of e.roots)r(t);this.jointData=new Float32Array(this.joints*32),this.jointBuffer=new w({label:`skinJoints`,count:this.joints*2,type:`mat4x4f`}),this._first=!0,this.clips=new Map;for(let t of e.animations)this.clips.set(t.name,t);this.layers=[],this._acc=e.nodes.map(()=>({t:new Float32Array(3),r:new Float32Array(4),s:new Float32Array(3),wt:0,wr:0,ws:0})),this._tmp=new Float32Array(4),this.group=new te,this.group.name=`SkinnedModel`,this.meshes=[],this.materials=[],this.onClipEnd=null,this._pose()}async _buildMeshes(e){let t=this.gltf,n=new Map,r=async(e,r)=>{if(!e)return null;let i=t.textures[e.index].source,a=i+(r?`s`:`l`);if(!n.has(a)){let e=t.images[i],o=await wt(e.bytes,e.mimeType),s=new T({label:`char`+i,width:o.width,height:o.height,format:r?`rgba8unorm-srgb`:`rgba8unorm`,data:o.data,mips:!0,usage:[`sample`,`copyDst`],sampler:`anisoRepeat`});s.getGPU(),S(s),n.set(a,s)}return n.get(a)},i=t.nodes.findIndex(e=>e.mesh!==void 0&&e.skin!==void 0),a=t.meshes[t.nodes[i].mesh],o=new Map;for(let n of a){let i=new ae,a=n.attributes;i.setAttribute(`position`,new D(a.POSITION.array,3)),a.NORMAL&&i.setAttribute(`normal`,new D(a.NORMAL.array,3)),a.TEXCOORD_0&&i.setAttribute(`uv`,new D(jt(a.TEXCOORD_0),2)),i.setAttribute(`skinIndex`,new D(Uint32Array.from(a.JOINTS_0.array),4)),i.setAttribute(`skinWeight`,new D(Mt(jt(a.WEIGHTS_0)),4)),n.indices&&i.setIndex(new D(n.indices instanceof Uint32Array||n.indices instanceof Uint16Array?n.indices:Uint32Array.from(n.indices),1)),i.computeBoundingSphere();let s=o.get(n.material);if(!s){let i=t.materials[n.material]||{},a=i.pbrMetallicRoughness||{},c={gltfMaterial:i,name:i.name||`material`,textures:{albedo:await r(a.baseColorTexture,!0),orm:await r(a.metallicRoughnessTexture,!1),normal:await r(i.normalTexture,!1)},alphaMode:i.alphaMode||`OPAQUE`},l=e&&e(c)||{};s=Et({name:`skinned-`+c.name,joints:this.joints,jointBuffer:this.jointBuffer,textures:c.textures,alphaMode:c.alphaMode,alphaCutoff:i.alphaCutoff??.5,doubleSided:!!i.doubleSided,roughness:a.roughnessFactor??1,metalness:a.metallicFactor??1,...l}),o.set(n.material,s),this.materials.push(s)}let c=new ne(i,s);c.name=`skinned:`+(t.materials[n.material]?.name||``),c.frustumCulled=!1,c.castShadow=!0,c.receiveShadow=!0,this.group.add(c),this.meshes.push(c)}}clipNames(){return[...this.clips.keys()]}clipDuration(e){let t=this.clips.get(e);return t?t.duration:0}play(e,{fade:t=.4,loop:n=!0,speed:r=1,from:i=0}={}){let a=this.clips.get(e);if(!a)throw Error(`SkinnedModel: no clip `+e);let o=this.layers.find(e=>e.clip===a&&e.target===1);if(o)return o;let s={clip:a,time:i,weight:+!this.layers.length,target:1,fade:Math.max(t,.001),loop:n,speed:r,ended:!1};for(let e of this.layers)e.target=0,e.fade=s.fade;return this.layers.push(s),s}get current(){let e=this.layers.find(e=>e.target===1);return e?e.clip.name:null}hold(){if(this._held)return;let e=this.joints,t=this.jointData;t.copyWithin(e*16,0,e*16),this.jointBuffer.write(t),this._held=!0}update(e){e===0&&(this._first=!0),this._held=!1;for(let t of this.layers){t.time+=e*t.speed;let n=t.clip.duration;t.time>=n&&(t.loop&&n>0?t.time%=n:(t.time=n,t.ended||(t.ended=!0,t.target===1&&this.onClipEnd&&this.onClipEnd(t.clip.name))));let r=e/t.fade;t.weight=t.target>t.weight?Math.min(t.target,t.weight+r):Math.max(t.target,t.weight-r)}this.layers=this.layers.filter(e=>e.target>0||e.weight>1e-4);let t=0;for(let e of this.layers)t+=e.weight;if(t>1e-4)for(let e of this.layers)e.weight/=t;this._pose()}_pose(){let e=this.nodeCount,t=this._acc,n=this._tmp;for(let n=0;n<e;n++){let e=t[n];e.wt=e.wr=e.ws=0,e.t.fill(0),e.r.fill(0),e.s.fill(0)}for(let e of this.layers)if(!(e.weight<=0))for(let r of e.clip.channels){let i=t[r.node];if(kt(r,e.time,n),r.path===`rotation`){let t=i.r[0]*n[0]+i.r[1]*n[1]+i.r[2]*n[2]+i.r[3]*n[3]<0?-e.weight:e.weight;for(let e=0;e<4;e++)i.r[e]+=n[e]*t;i.wr+=e.weight}else if(r.path===`translation`){for(let t=0;t<3;t++)i.t[t]+=n[t]*e.weight;i.wt+=e.weight}else{for(let t=0;t<3;t++)i.s[t]+=n[t]*e.weight;i.ws+=e.weight}}for(let n=0;n<e;n++){let e=t[n],r=this.local[n],i=this.rest[n];for(let t=0;t<3;t++)r.t[t]=e.t[t]+i.t[t]*(1-Math.min(e.wt,1)),r.s[t]=e.s[t]+i.s[t]*(1-Math.min(e.ws,1));if(e.wr>0){let t=1-Math.min(e.wr,1),n=e.r[0]*i.r[0]+e.r[1]*i.r[1]+e.r[2]*i.r[2]+e.r[3]*i.r[3]<0?-t:t,a=e.r[0]+i.r[0]*n,o=e.r[1]+i.r[1]*n,s=e.r[2]+i.r[2]*n,c=e.r[3]+i.r[3]*n,l=1/Math.hypot(a,o,s,c);r.r[0]=a*l,r.r[1]=o*l,r.r[2]=s*l,r.r[3]=c*l}else r.r.set(i.r)}let r=this.world,i=this._localM;for(let e of this.order){let t=this.local[e];Dt(i,0,t.t,t.r,t.s);let n=this.parent[e];n<0?r.set(i,e*16):Ot(r,e*16,r,n*16,i,0)}let a=this.joints,o=this.jointData,s=this.skin.inverseBindMatrices;this._first||o.copyWithin(a*16,0,a*16);for(let e=0;e<a;e++)Ot(o,e*16,r,this.skin.joints[e]*16,s,e*16);this._first&&=(o.copyWithin(a*16,0,a*16),!1),this.jointBuffer.write(o)}nodeWorld(e,t){let n=this.gltf.nodes.findIndex(t=>t.name===e);if(n<0)return null;let r=this.world;return t.set(r[n*16+12],r[n*16+13],r[n*16+14])}dispose(){this.jointBuffer.destroy();for(let e of this.meshes)e.geometry.dispose&&e.geometry.dispose()}};function jt(e){if(e.array instanceof Float32Array)return e.array;let t=e.normalized?1/(e.array instanceof Uint8Array?255:e.array instanceof Uint16Array?65535:1):1;return Float32Array.from(e.array,e=>e*t)}function Mt(e){for(let t=0;t<e.length;t+=4){let n=e[t]+e[t+1]+e[t+2]+e[t+3];if(n>0)for(let r=0;r<4;r++)e[t+r]/=n;else e[t]=1}return e}var Nt=6360,Pt=6460,Ft=.00537625,V=256,H=64,U=32,W=192,G=108,It=Math.log(1.02),K=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`};function Lt(e,t,n){return new T({label:n,width:e,height:t,format:`rgba16float`,usage:[`sample`,`storage`]})}function Rt(){return`
const ATMO_RG: f32 = ${K(Nt)};
const ATMO_RT: f32 = ${K(Pt)};

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
	return vec2f( ( xMu + ${K(.5/V)} ) * ${K(V/257)}, ( xR + ${K(.5/H)} ) * ${K(H/65)} );
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
`}var zt=class{constructor(t=null){this.renderer=t,this.transmittanceLUT=Lt(V,H,`atmoTransmittance`),this.multiScatLUT=Lt(U,U,`atmoMultiScat`),this.skyViewLUT=Lt(W,G,`atmoSkyView`),this.params=new c(`AtmosphereParams`,{rayleighScale:[`f32`,1],mieScale:[`f32`,1],mieG:[`f32`,.8],ozoneScale:[`f32`,1],groundAlbedo:[`vec3f`,new a(.06,.08,.1)],viewHeight:[`f32`,6360.002],sunIlluminance:[`vec3f`,new a(11,11,11)],pad0:[`f32`,0],sunDir:[`vec3f`,new e(.3,.6,-.7).normalize()],pad1:[`f32`,0]},{label:`atmosphere`});let n=this.params.fields;this.rayleighScale=n.rayleighScale,this.mieScale=n.mieScale,this.mieG=n.mieG,this.ozoneScale=n.ozoneScale,this.groundAlbedo=n.groundAlbedo,this.viewHeight=n.viewHeight,this.sunIlluminance=n.sunIlluminance,this.sunDir=n.sunDir,this.irrBuffer=new w({label:`atmoIrr`,count:4,type:`vec4f`}),this.readback=new ee({byteLength:48,label:`atmoIrrReadback`}),this.readback.onData=e=>this._onIrradiance(e),this._buildModules(),this._build(),this.needsStatic=!0,this._irrPending=!1,this._irrTimer=0,this.skyIrradiance=null,this.sunTransmittance=null,this.horizon=null,this.onIrradiance=null}_buildModules(){this.coreModule=new m({name:`atmosphereCore`,deps:[O],uniforms:this.params,uniformName:`atmosphereParams`,code:Rt()}),this.transmittanceModule=new m({name:`atmosphereTransmittance`,deps:[this.coreModule],bindings:{atmosphereTransmittanceLUT:{texture:this.transmittanceLUT}},code:`
fn atmosphereSampleTransmittance( r: f32, mu: f32 ) -> vec3f {
	return textureSampleLevel( atmosphereTransmittanceLUT, smpLinearClamp, atmosphereTransmittanceUV( r, mu ), 0.0 ).rgb;
}
// Transmittance from the viewer toward direction dir (for sun disk / sun light color).
fn atmosphereTransmittanceToSpace( dir: vec3f ) -> vec3f {
	return atmosphereSampleTransmittance( atmosphereParams.viewHeight, dir.y );
}
`}),this.multiScatModule=new m({name:`atmosphereMultiScat`,deps:[this.coreModule],bindings:{atmosphereMultiScatLUT:{texture:this.multiScatLUT}},code:`
fn atmosphereSampleMultiScat( r: f32, cosSun: f32 ) -> vec3f {
	let uv = vec2f( cosSun * 0.5 + 0.5, ( r - ATMO_RG ) / ( ATMO_RT - ATMO_RG ) );
	let suv = uv * ${K(31/U)} + ${K(.5/U)};
	return textureSampleLevel( atmosphereMultiScatLUT, smpLinearClamp, suv, 0.0 ).rgb;
}
`}),this.module=new m({name:`atmosphere`,deps:[this.transmittanceModule],bindings:{atmosphereSkyViewLUT:{texture:this.skyViewLUT}},code:`
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

	let suv = vec2f( u * ${K(191/W)} + ${K(.5/W)}, v * ${K(107/G)} + ${K(.5/G)} );
	return textureSampleLevel( atmosphereSkyViewLUT, smpLinearClamp, suv, 0.0 ).rgb;
}
`})}_build(){this.transmittanceKernel=new x({label:`Atmosphere Transmittance`,modules:[this.coreModule],bindings:{outLUT:{storageTexture:this.transmittanceLUT}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let px = gid.xy;
	let uv = ( vec2f( px ) + 0.5 ) / vec2f( ${K(V)}, ${K(H)} );
	let xMu = ( uv.x - ${K(.5/V)} ) * ${K(V/255)};
	let xR = ( uv.y - ${K(.5/H)} ) * ${K(H/63)};
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
`}),this.multiScatKernel=new x({label:`Atmosphere MultiScat`,modules:[this.transmittanceModule],bindings:{outLUT:{storageTexture:this.multiScatLUT}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let px = gid.xy;
	let uv = ( ( vec2f( px ) + 0.5 ) / ${K(U)} - ${K(.5/U)} ) * ${K(U/31)};
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
`}),this.skyViewKernel=new x({label:`Atmosphere SkyView`,modules:[this.transmittanceModule,this.multiScatModule],bindings:{outLUT:{storageTexture:this.skyViewLUT}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let px = gid.xy;
	if ( px.x >= ${W}u || px.y >= ${G}u ) { return; }
	let uv = ( vec2f( px ) + 0.5 ) / vec2f( ${K(W)}, ${K(G)} );
	let u = ( uv.x - ${K(.5/W)} ) * ${K(W/191)};
	let v = ( uv.y - ${K(.5/G)} ) * ${K(G/107)};

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
	let rayPhase = ${K(3/(16*Math.PI))} * ( cosTheta * cosTheta + 1.0 );
	let g = atmosphereParams.mieG;
	let g2 = g * g;
	// Cornette-Shanks
	let miePhase = ${K(3/(8*Math.PI))} * ( ( 1.0 - g2 ) * ( cosTheta * cosTheta + 1.0 ) )
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
`}),this.irradianceKernel=new x({label:`Atmosphere Irradiance`,modules:[this.module],bindings:{irr:{storage:this.irrBuffer,access:`read_write`}},workgroupSize:[1,1,1],code:`
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
`})}update(e,t){let n=Math.max(.5,t+.5),r=n<100?Math.round(n/2)*2:Math.exp(Math.round(Math.log(n)/It)*It);this.viewHeight.value=Nt+Math.max(.001,r/1e3);let i=!1;this.needsStatic&&(this.needsStatic=!1,i=!0,this.transmittanceKernel.dispatch([V/8,H/8,1]),this.multiScatKernel.dispatch([U/8,U/8,1])),this.params._pack();let a=this.params.u32,o=this._svLast||=new Uint32Array(a.length);for(let e=0;e<a.length&&!i;e++)i=a[e]!==o[e];(i||!this._svValid)&&(o.set(a),this._svValid=!0,this.skyViewKernel.dispatch([W/8,Math.ceil(G/8),1])),this._irrTimer-=e,this._irrTimer<=0&&!this._irrPending&&(this._irrTimer=.25,this.irradianceKernel.dispatch(1),this.readback.request(this.irrBuffer)&&(this._irrPending=!0))}_onIrradiance(e){let t=new Float32Array(e);this.skyIrradiance=[t[0],t[1],t[2]],this.sunTransmittance=[t[4],t[5],t[6]],this.horizon=[t[8],t[9],t[10]],this._irrPending=!1,this.onIrradiance&&this.onIrradiance(this)}invalidate(){this.needsStatic=!0,this._svValid=!1}},Bt=160,Vt=.1,Ht=new e(.3,.2,1).normalize(),Ut=.08,q=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},Wt=class{constructor(t){this.atmosphere=t,this.clouds=null,this.params=new c(`SkyParams`,{moonDir:[`vec3f`,new e(-.3,.5,.8).normalize()],sunDiskIntensity:[`f32`,1],starIntensity:[`f32`,0]},{label:`sky`}),this.sunDiskIntensity=this.params.fields.sunDiskIntensity,this.moonDir=this.params.fields.moonDir,this.starIntensity=this.params.fields.starIntensity,this._module=null,this._background=null}get module(){return this._module||=this._buildModule(),this._module}_buildModule(){let e=this.clouds,t=[O,this.atmosphere.module];e&&t.push(e.module);let n=t=>e?`let c = ${t}( dir );\n\treturn base * c.a + c.rgb;`:`return base;`;return new m({name:`sky`,deps:t,uniforms:this.params,uniformName:`skyParams`,code:`
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
	let r = ang / ${q(Ft)};
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
	let uv = select( select( dir.xy / a.z, dir.xz / a.y, onY ), dir.yz / a.x, onX ) * ${q(Bt)};
	let cell = vec3f( floor( uv ), face );
	let h = skyHash13( cell );
	let bx = dot( dir, vec3f( ${q(Ht.x)}, ${q(Ht.y)}, ${q(Ht.z)} ) ) * 4.0;
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
	let sp = ( floor( uv ) + vec2f( skyHash13( cell + 3.1 ), skyHash13( cell + 5.7 ) ) * 0.4 + 0.3 ) / ${q(Bt)};
	let sdir = normalize( select( select( vec3f( sp, sign( dir.z ) ), vec3f( sp.x, sign( dir.y ), sp.y ), onY ), vec3f( sign( dir.x ), sp ), onX ) );
	let d = length( dir - sdir ) * ${q(Bt)};
	// flux relative to a magnitude 6.5 star; bright stars look bigger (glare), not just clipped
	let flux = pow( uc, -0.8 );
	let size = log2( flux ) * 0.08 + 1.0;
	let psf = exp( d * d / ( size * size ) * ${q(-.5/(Vt*Vt))} ) / ( size * size );
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
	else { base = skyBackground( dir, ${q(Ut)} ); }
	${n(`cloudsSample`)}
}

// Water reflections: no moon disk (the water's specular lobe reflects the key light) and only a
// trace of the stars, which rough water would spread into flickering sparkles.
fn skyReflectionRadiance( dir: vec3f ) -> vec3f {
	let base = skyBackground( dir, ${q(Ut)} );
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
`})}get background(){if(!this._background){let e=new k({label:`sky background`,modules:[this.module],colorFormats:gt,depthFormat:B,depthCompare:`equal`,depthWrite:!1,depth:0,code:`
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
`});this._background={pass:e,draw:t=>e.draw(t)}}return this._background}backgroundNode(){return this.background}};function Gt(t,n=24,r=6,i=new e){let a=u.degToRad(n),o=u.degToRad(r),s=u.degToRad((t-12)*15),c=-Math.cos(o)*Math.sin(s),l=Math.cos(a)*Math.sin(o)-Math.sin(a)*Math.cos(o)*Math.cos(s),d=Math.sin(a)*Math.sin(o)+Math.cos(a)*Math.cos(o)*Math.cos(s);return i.set(c,d,-l).normalize()}var Kt=class{constructor(e,t=e.label){let n=e.width;if(e.height!==n||n&n-1||n<32||n>512)throw Error(`ComputeMips: square power-of-two 32..512 only`);this.res=n,this.layers=e.dimension===`3d`?1:e.depth;let r=e.mipLevelCount,i=Math.min(5,r-1),a=i===5&&(C.limits.maxStorageTexturesInComputeStage??C.limits.maxStorageTexturesPerShaderStage)<5,o=n>>5;this.mip5Buffer=a?new w({label:t+` mip5 staging`,count:o*o*this.layers,type:`vec4f`}):null;let s=t=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}}),c=t=>({texture:e,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}}),l=(e,t,n,r)=>`
	if ( lx < ${n}u && ly < ${n}u ) {
		let i = ly * ${4*n}u + lx * 2u;
		let v = ( ${e}[ i ] + ${e}[ i + 1u ] + ${e}[ i + ${2*n}u ] + ${e}[ i + ${2*n+1}u ] ) * 0.25;
		${a&&r===5?`mip5Buffer[ ( layer * ${o}u + gy ) * ${o}u + gx ] = v;`:`textureStore( out${r}, vec2u( gx * ${n}u + lx, gy * ${n}u + ly ), layer, v );`}
		${t?`${t}[ ly * ${n}u + lx ] = v;`:``}
	}
	workgroupBarrier();`,u={src0:c(0)},d=``;for(let e=1;e<=i;e++)(!a||e!==5)&&(u[`out`+e]=s(e));a&&(u.mip5Buffer={storage:this.mip5Buffer,access:`read_write`});for(let e=2,t=8;e<=i;e++,t>>=1)d+=l(`s`+(e-1),e<i?`s`+e:null,t,e);if(this.kernelA=new x({label:t+` mips A`,bindings:u,workgroupSize:[16,16,1],code:`
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
}`}),this.kernelB=null,this.copyMip5=a?new x({label:t+` mip5 store`,bindings:{mip5Buffer:{storage:this.mip5Buffer,access:`read`},out5:s(5)},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) p: vec3u ) {
	if ( p.x >= ${o}u || p.y >= ${o}u ) { return; }
	textureStore( out5, p.xy, p.z, mip5Buffer[ ( p.z * ${o}u + p.y ) * ${o}u + p.x ] );
}`}):null,r>6&&o>1){let e={src5:c(5)},n=``,i=``,a=`s5`;for(let t=6,c=o>>1;t<r&&c>=1;t++,c>>=1){e[`out`+t]=s(t);let o=c>1&&t<r-1?`s`+t:null;o&&(i+=`var<workgroup> ${o}: array<vec4f, ${c*c}>;\n`),n+=l(a,o,c,t),a=o}this.kernelB=new x({label:t+` mips B`,bindings:e,workgroupSize:[o,o,1],code:`
var<workgroup> s5: array<vec4f, ${o*o}>;
${i}
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let lx = lid.x; let ly = lid.y; let layer = wid.z;
	let gx = 0u; let gy = 0u;
	s5[ ly * ${o}u + lx ] = textureLoad( src5, vec2u( lx, ly ), layer, 0 );
	workgroupBarrier();
${n}
}`})}}dispatch(e=null){let t=e?{pass:e}:void 0;this.kernelA.dispatch([this.res/32,this.res/32,this.layers],t),this.copyMip5&&this.copyMip5.dispatch([Math.ceil((this.res>>5)/8),Math.ceil((this.res>>5)/8),this.layers],t),this.kernelB&&this.kernelB.dispatch([1,1,this.layers],t)}},qt=6,J=32,Y=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},Jt=`
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
`,Yt=class{constructor(t,n,r,i=128){this.renderer=t,this.scene=n,this.sky=r,this.size=i,n&&(n.environmentIntensity=1),this.source=new T({label:`envSource`,width:i,height:i,dimension:`cube`,format:`rgba16float`,mips:!0,usage:[`sample`,`storage`,`render`]});let a=e=>new T({label:e,width:i,height:i,dimension:`cube`,format:`rgba16float`,mips:qt,usage:[`sample`,`storage`]});this.targets=[a(`envSpecularA`),a(`envSpecularB`)],this.front=0,this.sh=[new w({label:`envSH_A`,count:9,type:`vec4f`,data:Xt()}),new w({label:`envSH_B`,count:9,type:`vec4f`})],this.lastSun=new e(0,-2,0),this.timer=0,this.interval=3,this.step=-1,this.primed=!1,this._build(),this.steps=this._buildSteps()}_build(){let e=this.sky,t=this.size;this.faceParams=[],this.faceKernels=[];for(let n=0;n<6;n++)this.faceKernels.push(new x({label:`Env Face `+n,modules:[O,e.module],bindings:{outCube:{storageTexture:this.source,viewDimension:`2d-array`}},workgroupSize:[8,8,1],code:`${Jt}
@compute @workgroup_size( WG_X, WG_Y, WG_Z ) fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	if ( gid.x >= ${t}u || gid.y >= ${t}u ) { return; }
	let dir = envCubeDir( ${n}u, gid.x, gid.y, ${t}u );
	// no sun or moon disk: the key light is lit directly
	textureStore( outCube, gid.xy, ${n}, vec4f( skyRadianceWithClouds( dir, false ), 1.0 ) );
}`}));this.filterKernels=[[],[]];for(let e=0;e<2;e++)for(let n=0;n<qt;n++){let r=n/5,i=t>>n;this.filterKernels[e].push(new x({label:`Env GGX `+n,modules:[O],bindings:{srcCube:{texture:this.source,viewDimension:`cube`},outCube:{storageTexture:this.targets[e],view:{dimension:`2d-array`,baseMipLevel:n,mipLevelCount:1}}},workgroupSize:[8,8,1],code:`${Jt}
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
	let alpha = ${Y(r*r)};
	let a2 = alpha * alpha;
	let tb = basis( N );
	const COUNT = 96u;
	let saTexel = ${Y(4*Math.PI/(6*t*t))};
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
			let lod = clamp( 0.5 * log2( saSample / saTexel ) + 1.0, 0.0, ${Y(Math.log2(t))} );
			sum += textureSampleLevel( srcCube, smpLinearClamp, L, lod ).rgb * NdotL;
			wsum += NdotL;
		}
	}
	textureStore( outCube, gid.xy, gid.z, vec4f( sum / max( wsum, 1e-4 ), 1.0 ) );
}`}`}))}let n=Math.max(0,Math.log2(t/J));this.shKernels=[0,1].map(e=>new x({label:`Env SH`,modules:[O],bindings:{srcCube:{texture:this.source,viewDimension:`2d-array`},shOut:{storage:this.sh[e],access:`read_write`}},workgroupSize:[128,1,1],code:`${Jt}
var<workgroup> acc: array<array<vec3f, 9>, 128>;
@compute @workgroup_size( 128 ) fn main( @builtin( local_invocation_index ) li: u32 ) {
	var c: array<vec3f, 9>;
	for ( var k = 0; k < 9; k++ ) { c[ k ] = vec3f( 0.0 ); }
	let total = 6144u;
	for ( var idx = li; idx < total; idx += 128u ) {
		let face = idx / 1024u;
		let r = idx % 1024u;
		let x = r % ${J}u; let y = r / ${J}u;
		let d = envCubeDir( face, x, y, ${J}u );
		// solid angle of the texel
		let u = ( f32( x ) + 0.5 ) / ${Y(J)} * 2.0 - 1.0;
		let v = ( f32( y ) + 0.5 ) / ${Y(J)} * 2.0 - 1.0;
		let tmp = 1.0 + u * u + v * v;
		let w = 4.0 / ( sqrt( tmp ) * tmp ) * ${Y(1/1024)};
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
}`})),this.envUniforms=new c(`EnvParams`,{levels:[`f32`,5]},{label:`env`}),ue.set(`envSpecular`,new m({name:`hook-envSpecular`,deps:[O],uniforms:this.envUniforms,uniformName:`envParams`,bindings:{envSpecularCube:{texture:()=>this.targets[this.front],viewDimension:`cube`}},code:`
fn hookEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f {
	return textureSampleLevel( envSpecularCube, smpLinearClamp, R, roughness * envParams.levels ).rgb * frame.envIntensity;
}
`})),ue.set(`envDiffuse`,new m({name:`hook-envDiffuse`,deps:[O],bindings:{envSH:{storage:()=>this.sh[this.front],access:`read`,type:`vec4f`}},code:`
fn hookEnvDiffuse( N: vec3f ) -> vec3f {
	let d = N;
	var e = envSH[ 0 ].rgb * 0.282095
		+ envSH[ 1 ].rgb * 0.488603 * d.y + envSH[ 2 ].rgb * 0.488603 * d.z + envSH[ 3 ].rgb * 0.488603 * d.x
		+ envSH[ 4 ].rgb * 1.092548 * d.x * d.y + envSH[ 5 ].rgb * 1.092548 * d.y * d.z
		+ envSH[ 6 ].rgb * 0.315392 * ( 3.0 * d.z * d.z - 1.0 ) + envSH[ 7 ].rgb * 1.092548 * d.x * d.z
		+ envSH[ 8 ].rgb * 0.546274 * ( d.x * d.x - d.y * d.y );
	return max( e, vec3f( 0.0 ) ) * frame.envIntensity;
}
`}))}_buildSteps(){let e=[],t=this.size;for(let n=0;n<6;n++)e.push(()=>this.faceKernels[n].dispatch([t/8,t/8,1]));let n=this._mips||=new Kt(this.source,`envSource`);e.push(()=>n.dispatch());for(let n=0;n<qt;n++){let r=Math.max(1,Math.ceil((t>>n)/8));e.push(()=>this.filterKernels[1-this.front][n].dispatch([r,r,6]))}return e.push(()=>this.shKernels[1-this.front].dispatch(1)),e.push(()=>{this.front=1-this.front}),e}update(e,t=!1){this.timer-=e;let n=this.sky.atmosphere.sunDir.value;if(t||!this.primed){this.primed=!0,this.timer=this.interval,this.lastSun.copy(n);for(let e of this.steps)e();this.step=-1;return}if(this.step<0){if(!(n.angleTo(this.lastSun)>.004)&&this.timer>0)return;this.timer=this.interval,this.lastSun.copy(n),this.step=0}this.steps[this.step++](),this.step===this.steps.length&&(this.step=-1)}get texture(){return this.targets[this.front]}};function Xt(){let e=new Float32Array(36),t=[.3,.4,.6];for(let n=0;n<3;n++)e[n]=t[n]/.282095;return e}var Zt=new m({name:`boatSurfaceGradient`,code:`
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
`}),Qt=[60,300,180,240,120,0],$t=[0,.5,.25,.75],en=class{constructor(e,t,{samples:n=16,depthIsColor:r=!1}={}){this.depthTexture=e,this.depthIsColor=r,this.camera=t,this.resolutionScale=1,this.useTemporalFiltering=!1,this.uniforms=new c(`GTAOParams`,{proj:[`mat4x4f`,new y],invProj:[`mat4x4f`,new y],resolution:[`vec2f`,new d],radius:[`f32`,.25],thickness:[`f32`,1],distanceExponent:[`f32`,1],distanceFallOff:[`f32`,1],scale:[`f32`,1],temporalDirection:[`f32`,0],temporalOffset:[`f32`,0],resolutionScaleU:[`f32`,0]},{label:`gtao`});let i=this.uniforms.fields;this.radius=i.radius,this.thickness=i.thickness,this.distanceExponent=i.distanceExponent,this.distanceFallOff=i.distanceFallOff,this.scale=i.scale,this.samples={value:n},this.target=new E(1,1,{colors:[`r8unorm`],label:`GTAO.AO`}),this.noiseTexture=tn(),this._currentSamples=-1,this._pass=null,this._frame=0,this._jp=new y}get texture(){return this.target.texture}getTextureNode(){return this.target.texture}setSize(e,t){e=Math.round(this.resolutionScale*e),t=Math.round(this.resolutionScale*t),this.uniforms.fields.resolutionScaleU.value=this.resolutionScale,this.uniforms.fields.resolution.value.set(e,t),this.target.setSize(e,t)}_build(){let e=this.samples.value,t=e<30?3:5,n=Math.ceil(e/t);this._pass=new k({label:`GTAO`,colorFormats:[`r8unorm`],bindings:{gtao:{uniform:this.uniforms},gtaoDepth:{texture:()=>this.depthTexture},gtaoNoise:{texture:this.noiseTexture}},code:`
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
`}),this._currentSamples=e}render(){let e=this.uniforms.fields;if(this.useTemporalFiltering===!0){let t=this._frame++;e.temporalDirection.value=Qt[t%6]/360,e.temporalOffset.value=$t[t%4]}else e.temporalDirection.value=0,e.temporalOffset.value=1;this.samples.value!==this._currentSamples&&this._build();let t=g.fields,n=t.jitter.value;this._jp.makeTranslation(n.x,n.y,0).multiply(t.proj.value),e.proj.value.copy(this._jp),e.invProj.value.copy(this._jp).invert(),this._pass.render({colorViews:[this.target.texture],clear:[1,1,1,1]})}};function tn(t=5){let n=Math.floor(t)%2==0?Math.floor(t)+1:Math.floor(t),r=nn(n),i=r.length,a=new Uint8Array(i*4);for(let t=0;t<i;++t){let n=r[t],o=2*Math.PI*n/i,s=new e(Math.cos(o),Math.sin(o),0).normalize();a[t*4]=(s.x*.5+.5)*255,a[t*4+1]=(s.y*.5+.5)*255,a[t*4+2]=127,a[t*4+3]=255}return new T({label:`GTAO.noise`,width:n,height:n,format:`rgba8unorm`,data:a,sampler:`nearestRepeat`})}function nn(e){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=t*t,r=Array(n).fill(0),i=Math.floor(t/2),a=t-1;for(let e=1;e<=n;){if(i===-1&&a===t?(a=t-2,i=0):(a===t&&(a=0),i<0&&(i=t-1)),r[i*t+a]!==0){a-=2,i++;continue}r[i*t+a]=e++,a++,i--}return r}var X=[0,0,0,0],rn=`
fn aaIn( uv: vec2f ) -> vec3f { return textureSampleLevel( aaSrc, smpLinearClamp, uv, 0.0 ).rgb; }
// display-like value for edge detection: exposed, Reinhard on the max channel, square root
fn aaP( c: vec3f ) -> vec3f {
	let e = max( c, vec3f( 0.0 ) ) * aaExposure[ 0 ] * frame.exposure;
	return sqrt( e / ( 1.0 + max( e.r, max( e.g, e.b ) ) ) );
}
fn aaLuma( uv: vec2f ) -> f32 { return dot( aaP( aaIn( uv ) ), vec3f( 0.3, 0.59, 0.11 ) ); }
`,an=class{constructor({src:e,exposure:t}){this.src=e,this.exposure=t,this.edges=new E(1,1,{colors:[`rgba8unorm`],label:`smaaEdges`}),this.weights=new E(1,1,{colors:[`rgba8unorm`],label:`smaaWeights`}),this.area=null,this.search=null,this._passes=null,this._load()}get searchStepsPerDirection(){return Ae(p.antiAliasingQuality.value)}async _load(){let e=async(e,t)=>{let n=await wt(new Uint8Array(await(await fetch(`./textures/smaa/`+e)).arrayBuffer()),`image/png`);return new T({label:t,width:n.width,height:n.height,format:`rgba8unorm`,data:n.data})};try{[this.area,this.search]=await Promise.all([e(`area.png`,`smaaArea`),e(`search.png`,`smaaSearch`)])}catch(e){console.warn(`SMAA textures failed to load`,e)}}_build(){let e={aaSrc:{texture:this.src},aaExposure:{storage:this.exposure,access:`read`}},t=new k({label:`AA none`,colorFormats:[`rgba16float`],bindings:{aaSrc:{texture:this.src}},code:`fn fragment( in: FSIn ) -> vec4f { return textureSampleLevel( aaSrc, smpLinearClamp, in.uv, 0.0 ); }`}),n=new k({label:`FXAA`,colorFormats:[`rgba16float`],bindings:e,code:rn+`
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
`});this._passes={none:t,fxaa:n}}_buildSMAA(){let e={aaSrc:{texture:this.src},aaExposure:{storage:this.exposure,access:`read`}},t=new k({label:`SMAA edges`,colorFormats:[`rgba8unorm`],bindings:e,code:rn+`
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
`}),n=new k({label:`SMAA weights`,colorFormats:[`rgba8unorm`],bindings:{aaEdges:{texture:()=>this.edges.texture},aaArea:{texture:()=>this.area},aaSearch:{texture:()=>this.search}},code:`
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
`}),r=new k({label:`SMAA blend`,colorFormats:[`rgba16float`],bindings:{aaSrc:{texture:this.src},aaWeights:{texture:()=>this.weights.texture}},code:`
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
`});Object.assign(this._passes,{edges:t,weights:n,blend:r}),this._smaa=!0}render(e,t){this._passes||this._build();let n=this._passes;if(e===`smaa`&&this.area&&this.search){this._smaa||this._buildSMAA();let e=typeof this.src==`function`?this.src():this.src;this.edges.setSize(e.width,e.height),this.weights.setSize(e.width,e.height),n.edges.render({colorViews:[this.edges.texture],clear:X}),n.weights.render({colorViews:[this.weights.texture],clear:X}),n.blend.render({colorViews:[t],clear:X})}else e===`fxaa`||e===`smaa`?n.fxaa.render({colorViews:[t],clear:X}):n.none.render({colorViews:[t],clear:X})}};function on({enabled:e,debugView:t,inputWidth:n,inputHeight:r,outputWidth:i,outputHeight:a,jitterX:o,jitterY:s}){return e&&t===0&&n===i&&r===a&&n>0&&r>0&&Math.abs(o)<.49&&Math.abs(s)<.49}function sn(e){let t=/fn taauDepthAt\( p: vec2i \) -> f32 \{[\s\S]*?\n\}/,n=`		let rgb = min( max( taauLoadBeauty( tap ).rgb, vec3f( 0.0 ) ) * exposure, vec3f( 65504.0 ) );
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
}`}var cn=[0,0,0,0];function ln(e,t){let n=1,r=0;for(;e>0;)n/=t,r+=e%t*n,e=Math.floor(e/t);return r}var un=class{static DEBUG_VIEWS=[`Off`,`Locks (green: holding, blue: new)`,`Luma instability (red)`,`Clamped (red) / kept (green)`,`New frame weight`,`Motion (px / frame)`,`Resampling blur (blue)`,`Still pixels kept (yellow)`];constructor(e,t,n,r,i=null,a=null){this.beauty=e,this.depthTexture=t,this.velocityTexture=n,this.waterMaskTexture=i,this.camera=r,this.renderOptimizations=P(),this.optimizationStats={tiledFrames:0,fragmentFrames:0,depthRotations:0,depthCopies:0},this._depthReady=!1,this.exposure=a||new w({label:`taauExposure`,count:1,type:`f32`,data:new Float32Array([1])}),this.uniforms=new c(`TAAUParams`,{prevInvViewProj:[`mat4x4f`,new y],jitterOffset:[`vec2f`,new d],cameraNearFar:[`vec2f`,new d(.1,1e3)],depthThreshold:[`f32`,5e-4],edgeDepthDiff:[`f32`,.001],hasWaterMask:[`f32`,+!!i],jitterPhases:[`f32`,8],reset:[`f32`,1],debugView:[`f32`,0],boxStill:[`f32`,3],boxMotion:[`f32`,1],maxAccumulation:[`f32`,2],motionAccumulation:[`f32`,10],blurComp:[`f32`,.5],locks:[`f32`,1],instability:[`f32`,1],lockThreshold:[`f32`,1.05],staticKeep:[`f32`,1]},{label:`taau`}),this.settings=this.uniforms.fields,this.jitterPhaseOverride=4,this.jitterScale=.5,this.jitterMoving=.35,this._camMotion=0,this._camPrev=null,this.debugView=0;let o=this.uniforms.fields;this._jitterOffset=o.jitterOffset,this._jitterIndex=0,this._outW=1;let s=()=>({colors:[{format:`rgba16float`,name:`color`},{format:`rgba16float`,name:`lock`},{format:`rgba8unorm`,name:`lumaHistory`}],label:`taauHistory`,usage:this.renderOptimizations.tiledTAA?[`sample`,`render`,`copySrc`,`copyDst`,`storage`]:[`sample`,`render`,`copySrc`,`copyDst`]});this.history=[new E(1,1,s()),new E(1,1,s())],this._cur=0,this._prevDepth=new T({label:`taauPrevDepth`,width:1,height:1,format:`depth32float`,usage:this.renderOptimizations.depthRotation?[`sample`,`render`,`copySrc`,`copyDst`]:[`sample`,`copyDst`]}),this._hasPrevInvVP=!1,this._needsRestart=!0,this._build()}get texture(){return this.history[this._cur].textures[0]}get output(){return this.debugView>0&&this._debugTarget?this._debugTarget.texture:this.texture}getTextureNode(){return this.texture}setSize(e,t){let n=this.history[0].setSize(e,t);this.history[1].setSize(e,t),this._outW=e,n&&(this._needsRestart=!0)}restart(){this._needsRestart=!0,this._hasPrevInvVP=!1}_beautyTexture(){return typeof this.beauty==`function`?this.beauty():this.beauty}jitter(){let e=this._beautyTexture(),t=e&&e.width?this._outW/e.width:1,n=this.jitterPhaseOverride||Math.max(1,Math.ceil(8*t*t));this.uniforms.fields.jitterPhases.value=n;let r=this._jitterIndex%n,i=this.jitterScale*(1+(this.jitterMoving-1)*this._cameraMotion());this.jitterNow=i;let a=(ln(r+1,2)-.5)*i,o=(ln(r+1,3)-.5)*i;return this._jitterOffset.value.set(a,o),[a,o]}_cameraMotion(){let e=this.camera&&this.camera.matrixWorld;if(!e)return 0;let t=e.elements,n=[t[12],t[13],t[14],t[8],t[9],t[10]],r=0;if(this._camPrev){let e=this._camPrev,t=Math.hypot(n[0]-e[0],n[1]-e[1],n[2]-e[2]),i=Math.hypot(n[3]-e[3],n[4]-e[4],n[5]-e[5]);r=Math.min(1,Math.max((t-.002)/.008,(i-5e-4)/.0015)),r=Math.max(0,r)}return this._camPrev=n,this._camMotion=r>this._camMotion?r:this._camMotion+(r-this._camMotion)*.15,this._camMotion}clearViewOffset(){this._jitterIndex=(this._jitterIndex+1)%1024}_build(){let e=()=>this._beautyTexture(),t=t=>({taau:{uniform:this.uniforms},taauBeauty:{texture:e},taauDepth:{texture:()=>this.depthTexture},taauPrevDepth:{texture:()=>this._prevDepth},taauVelocity:{texture:()=>this.velocityTexture},taauMask:{texture:()=>this.waterMaskTexture||this.velocityTexture},taauHistory:{texture:()=>this.history[t].textures[0]},taauLock:{texture:()=>this.history[t].textures[1]},taauLumaHistory:{texture:()=>this.history[t].textures[2]},taauExposure:{storage:this.exposure,access:`read`}}),n=`
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
`,``);if(this._resolve=[0,1].map(e=>new k({label:`TAAU`,bindings:t(e),colorFormats:r,code:i})),this.renderOptimizations.tiledTAA){let e=sn(i);this._tiledResolve=[0,1].map(n=>new x({label:`TAAU tiled`,modules:[O],workgroupSize:[8,8,1],bindings:{...t(n),taauOutColor:{storageTexture:()=>this.history[1-n].textures[0]},taauOutLock:{storageTexture:()=>this.history[1-n].textures[1]},taauOutLuma:{storageTexture:()=>this.history[1-n].textures[2]}},code:e}))}this._buildDebug=()=>{let e=n.replace(`DEBUG_FIELD`,`@location( 3 ) debug: vec4f`).replace(`DEBUG_OUTPUT`,`
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
	out.debug = vec4f( v / max( exposure, 1e-4 ), 1.0 );`),i=[...r,`rgba16float`];this._resolveDebug=[0,1].map(n=>new k({label:`TAAU debug`,bindings:t(n),colorFormats:i,code:e})),this._debugTarget=new E(1,1,{colors:[`rgba16float`],label:`taauDebug`})}}render(){let e=g.fields,t=this.uniforms.fields;t.cameraNearFar.value.set(e.near.value,e.far.value),this._hasPrevInvVP||t.prevInvViewProj.value.copy(e.invViewProj.value),this._hasPrevInvVP=!0;let n=this.depthTexture;(this._prevDepth.width!==n.width||this._prevDepth.height!==n.height)&&(this._prevDepth.resize(n.width,n.height),this._needsRestart=!0),t.reset.value=+!!this._needsRestart,this._needsRestart=!1;let r=1-this._cur;if(this.debugView>0){this._resolveDebug||this._buildDebug();let e=this.history[r];this._debugTarget.setSize(e.textures[0].width,e.textures[0].height),t.debugView.value=this.debugView,this._resolveDebug[this._cur].render({colorViews:[...e.textures,this._debugTarget.texture],clear:cn})}else this._tiledResolve&&on({enabled:this.renderOptimizations.tiledTAA,debugView:this.debugView,inputWidth:this._beautyTexture().width,inputHeight:this._beautyTexture().height,outputWidth:this.history[r].width,outputHeight:this.history[r].height,jitterX:this._jitterOffset.value.x,jitterY:this._jitterOffset.value.y})?(this._tiledResolve[this._cur].dispatch([Math.ceil(this.history[r].width/8),Math.ceil(this.history[r].height/8),1]),this.optimizationStats.tiledFrames++):(this._resolve[this._cur].render({colorViews:this.history[r].textures,clear:cn}),this.optimizationStats.fragmentFrames++);this._cur=r;let i=this.depthTexture;this.renderOptimizations.depthRotation||(C.getEncoder().copyTextureToTexture({texture:i.getGPU()},{texture:this._prevDepth.getGPU()},{width:i.width,height:i.height}),this.optimizationStats.depthCopies++),this._depthReady=!0}endFrame(){this._nextPrev=this._nextPrev||new y,this._nextPrev.copy(g.fields.invViewProj.value)}advance(){if(this.renderOptimizations.depthRotation){let e=this.depthTexture,t=this._prevDepth;(t.width!==e.width||t.height!==e.height)&&(t.resize(e.width,e.height),this._needsRestart=!0,this._depthReady=!1),this._depthReady&&(Le(e,t,this.renderOptimizations.bindingReuse),this.optimizationStats.depthRotations++),this._depthReady=!1}this._nextPrev&&this.uniforms.fields.prevInvViewProj.value.copy(this._nextPrev)}},dn=class{constructor(){this.uniforms=new c(`LensParams`,{wet:[`f32`,0],age:[`f32`,100],seed:[`f32`,0],aspect:[`f32`,16/9]},{label:`lens`});let e=this.uniforms.fields;this.wet=e.wet,this.age=e.age,this.seed=e.seed,this.aspect=e.aspect,this.duration=9,this._wasUnder=!1,this.module=new m({name:`lens`,uniforms:this.uniforms,uniformName:`lensParams`,code:fn})}update(e,t){t?this.wet.value=0:(this._wasUnder&&(this.wet.value=1,this.age.value=0,this.seed.value=Math.random()*97),this.age.value+=e,this.wet.value=Math.max(0,this.wet.value-e/this.duration)),this._wasUnder=t}build(){return this.module}},fn=`
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
`,pn=7,mn=.3,hn=[{a:.72,r:.018,tint:[1,.85,.6],k:.55},{a:.44,r:.045,tint:[.55,.9,1],k:.35},{a:.16,r:.022,tint:[.8,1,.7],k:.45},{a:-.18,r:.07,tint:[.6,.75,1],k:.22},{a:-.42,r:.03,tint:[1,.7,.9],k:.4},{a:-.75,r:.11,tint:[.7,1,.85],k:.14},{a:-1.15,r:.05,tint:[1,.8,.55],k:.28}],gn=24,Z=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},_n=class{constructor({depthTexture:t,clouds:n=null,sunDir:r}){this.sunDir=r,this.uniforms=new c(`FlareParams`,{sunDir:[`vec3f`,new e(0,1,0)],strength:[`f32`,1],sunUV:[`vec2f`,new d(.5,.5)],inView:[`f32`,0],aboveWater:[`f32`,1],aspect:[`f32`,16/9],discPx:[`f32`,6],dt:[`f32`,1/60]},{label:`flare`});let i=this.uniforms.fields;this.strength=i.strength,this.sunUV=i.sunUV,this.inView=i.inView,this.aboveWater=i.aboveWater,this.aspect=i.aspect,this.discPx=i.discPx,this.dt=i.dt,this.visibility=new w({label:`flareVisibility`,count:1,type:`f32`,data:new Float32Array([0])}),this.depthTexture=t,this.clouds=n;let a=``;for(let e=0;e<gn;e++){let t=Math.sqrt((e+.5)/gn),n=e*2.39996323;a+=`\tsky += flareSkyTap( c + vec2f( ${Z(Math.cos(n)*t)}, ${Z(Math.sin(n)*t)} ) * flareParams.discPx, size );\n`}let o=!!(n&&n.module);this.kernel=new x({label:`Lens Flare Visibility`,modules:[O,o?n.module:null].filter(Boolean),bindings:{flareParams:{uniform:this.uniforms},flareDepth:{texture:()=>this.depthTexture},flareVisRW:{storage:this.visibility,access:`read_write`}},workgroupSize:[1,1,1],code:`
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
	let tgt = sky / ${Z(gn)} * cloudT * up * flareParams.inView * flareParams.aboveWater;
	let v = flareVisRW[ 0 ];
	flareVisRW[ 0 ] = mix( v, tgt, 1.0 - exp( flareParams.dt * -14.0 ) );
}
`});let s=``;for(let e of hn)s+=`
	{
		let pd = flarePolyDist( p - s * ${Z(e.a)} );
		let body = vec3f( smoothstep( ${Z(e.r*.975)}, ${Z(e.r*.975*.9)}, pd ), smoothstep( ${Z(e.r)}, ${Z(e.r*.9)}, pd ), smoothstep( ${Z(e.r*1.025)}, ${Z(e.r*1.025*.9)}, pd ) );
		let rim = smoothstep( ${Z(e.r*.55)}, ${Z(e.r)}, pd ) * 0.7 + 0.3;
		// smaller ghosts concentrate the same reflected energy: brighter
		ghosts += body * rim * vec3f( ${e.tint.map(Z).join(`, `)} ) * ${Z(e.k*.0028/(e.r*e.r))};
	}`;this.module=new m({name:`flare`,deps:[O],uniforms:this.uniforms,uniformName:`flareParams`,bindings:{flareVis:{storage:this.visibility,access:`read`}},code:`
const FLARE_SEG: f32 = ${Z(2*Math.PI/pn)};

// aperture polygon: distance scaled so the polygon edge sits at the given radius
fn flarePolyDist( d: vec2f ) -> f32 {
	let a = atan2( d.y, d.x ) + ${Z(mn)};
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
	let aq = atan2( q.y, q.x ) + ${Z(mn)};
	let px = 1.0 / max( frame.outputResolution.y, 1.0 );
	// the nearest spike (two per blade) and this pixel's distance from its line
	let seg = ${Z(Math.PI/pn)};
	let k = floor( aq / seg + 0.5 );
	let perp = abs( sin( aq - k * seg ) ) * rq;
	let ki = k - ${Z(14)} * floor( k / ${Z(14)} ); // same spike across the atan2 seam
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
	let t = ( aq * ${Z(1/(2*Math.PI))} + 0.5 ) * 48.0;
	let ti = floor( t );
	let hA = fract( sin( ( ti - 48.0 * floor( ti / 48.0 ) ) * 91.345 ) * 43758.5453 );
	let hB = fract( sin( ( ti + 1.0 - 48.0 * floor( ( ti + 1.0 ) / 48.0 ) ) * 91.345 ) * 43758.5453 );
	let n = mix( hA, hB, smoothstep( 0.0, 1.0, t - ti ) );
	let fine = pow( n, 5.0 ) * exp( - rq / 0.03 ) * 0.3;
	let glow = exp( rq * -5.0 ) * 0.05 + exp( rq * -40.0 ) * 0.4;
	let burst = spikes + vec3f( fine + glow );

	return light * ( ghosts * offAxis + halo + burst );
}
`})}update(e,t,{aboveWater:n=!0}={}){let r=this.uniforms.fields.sunDir.value.copy(this.sunDir.value||this.sunDir);e.updateMatrixWorld();let i=vn.copy(e.position).addScaledVector(r,1e3).project(e),a=yn.set(0,0,-1).applyQuaternion(e.quaternion).dot(r)>.05;this.sunUV.value.set(i.x*.5+.5,.5-i.y*.5);let o=Math.max(Math.abs(i.x),Math.abs(i.y));this.inView.value=a?u.clamp((1-o)/.1,0,1):0,this.aboveWater.value=+!!n,this.aspect.value=e.aspect,this.dt.value=Math.min(t,.1);let s=this._depthH||1080;this.discPx.value=Math.max(1.5,.004625/Math.tan(u.degToRad(e.fov)*.5)*s*.5)}setDepthHeight(e){this._depthH=e}},vn=new e,yn=new e,bn=20,xn=10,Q=400,Sn=224,Cn=`
const MB_TILE: f32 = ${bn}.0;
const MB_MAX_TILES_X: i32 = ${Q};

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
`,wn=class{constructor({velocityTexture:e,depthTexture:t,color:n}){this.uniforms=new c(`MotionBlurParams`,{skyReproj:[`mat4x4f`,new y],outSize:[`vec2f`,new d(1,1)],tileCount:[`vec2f`,new d(1,1)],shutter:[`f32`,.5],frameIndex:[`f32`,0]},{label:`motionBlur`});let r=this.uniforms.fields;this.shutter=r.shutter,this.outSize=r.outSize,this.tileCount=r.tileCount,this.frameIndex=r.frameIndex,this.skyReproj=r.skyReproj,this._vp=new y,this._prevVP=new y,this._hasPrev=!1,this.color=n,this.velocityTexture=e,this.depthTexture=t,this.tileMax=new w({label:`mbTileMax`,count:Q*Sn,type:`vec4f`}),this.neighborMax=new w({label:`mbNeighborMax`,count:Q*Sn,type:`vec4f`}),this._frame=0,this._buildKernels();let i=()=>typeof this.color==`function`?this.color():this.color;this.module=new m({name:`motionBlur`,deps:[O],uniforms:this.uniforms,uniformName:`mbParams`,bindings:{mbVelocity:{texture:()=>this.velocityTexture},mbDepth:{texture:()=>this.depthTexture},mbColor:{texture:i},mbNeighbor:{storage:this.neighborMax,access:`read`}},code:Cn+`
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
	workgroupBarrier();`;let t={mbParams:{uniform:this.uniforms}};this.tileKernel=new x({label:`Motion Blur Tiles`,modules:[O],bindings:{...t,mbVelocity:{texture:()=>this.velocityTexture},mbDepth:{texture:()=>this.depthTexture},mbTileMaxRW:{storage:this.tileMax,access:`read_write`}},workgroupSize:[xn,xn,1],code:Cn+`
var<workgroup> mbShared: array<vec4f, 100>;
@compute @workgroup_size( WG_X, WG_Y, 1 )
fn main( @builtin( local_invocation_id ) lid: vec3u, @builtin( workgroup_id ) wid: vec3u ) {
	let t = lid.y * ${xn}u + lid.x;
	let inSize = vec2i( textureDimensions( mbVelocity ) );
	var best = vec2f( 0.0 ); var bestL = 0.0; var minL = 1e8;
	for ( var k = 0; k < 4; k++ ) {
		let o = vec2u( u32( k & 1 ), u32( k >> 1u ) );
		let p = vec2f( wid.xy * ${bn}u + lid.xy * 2u + o ) + 0.5;
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
		}`}this.neighborKernel=new x({label:`Motion Blur Neighbourhood`,modules:[O],bindings:{...t,mbTileMaxR:{storage:this.tileMax,access:`read`},mbNeighborRW:{storage:this.neighborMax,access:`read_write`}},workgroupSize:[8,8,1],code:`
const MB_MAX_TILES_X: i32 = ${Q};
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
`})}updateCamera(e){e.updateMatrixWorld(),e.matrixWorldInverse&&e.matrixWorldInverse.copy(e.matrixWorld).invert(),this._vp.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._hasPrev||this._prevVP.copy(this._vp),this._hasPrev=!0,this.skyReproj.value.copy(this._vp).invert().premultiply(this._prevVP),this._prevVP.copy(this._vp)}compute(e,t){if(this.shutter.value<=0)return;let n=Math.min(Q,Math.ceil(e/bn)),r=Math.min(Sn,Math.ceil(t/bn));this.outSize.value.set(e,t),this.tileCount.value.set(n,r),this._frame=(this._frame+1)%64,this.frameIndex.value=this._frame,this.tileKernel.dispatch([n,r,1]),this.neighborKernel.dispatch([Math.ceil(n/8),Math.ceil(r/8),1])}},Tn=`
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
`,$=[0,0,0,0],En=class{constructor(t,{sceneRenderer:n,camera:r,underwater:i,clouds:a=null,sunDir:o=null,haze:s=null}){this.renderer=t,this.camera=r,this.sceneRenderer=n,this.underwater=i,this.scale=1,this.outputTexture=null,this.outputSize=null,this.outputFormat=C.context?C.format:`rgba8unorm`,this.uniforms=new c(`PostParams`,{aoStrength:[`f32`,1],bloom:[`f32`,.05],vignette:[`f32`,.28],saturation:[`f32`,1.06],contrast:[`f32`,1.04],warmth:[`f32`,.02],grain:[`f32`,.012],sharpen:[`f32`,.45]},{label:`post`}),this.params=this.uniforms.fields,this.aeUniforms=new c(`AutoExposureParams`,{enabled:[`f32`,1],refLum:[`f32`,.25],min:[`f32`,.6],max:[`f32`,6],up:[`f32`,1.6],down:[`f32`,1.1]},{label:`autoExposure`}),this.autoExposure={...this.aeUniforms.fields,ref:this.aeUniforms.fields.refLum},this.exposure=new w({label:`autoExposure`,count:1,type:`f32`,data:new Float32Array([1])});let l=n.sceneRT,u=n.opaqueCopy;this.sceneColor=l.texture,this.opaqueDepth=u.depthTexture,this.finalDepth=l.depthTexture,this.aoDepth=new E(1,1,{colors:[`r16float`],label:`aoDepth`}),this._aoDepthPass=new k({label:`AO depth`,colorFormats:[`r16float`],bindings:{aoFullDepth:{texture:()=>this.opaqueDepth},aoFinalDepth:{texture:()=>this.finalDepth}},code:`
// negative where the water covers the opaque surface: its AO is never shown (the beauty pass skips
// covered pixels), so GTAO leaves those texels alone; everything else reads the magnitude
fn fragment( in: FSIn ) -> vec4f {
	let s = vec2i( textureDimensions( aoFullDepth ) );
	let p = min( vec2i( in.pos.xy ) * 2, s - 1 );
	let d = textureLoad( aoFullDepth, p, 0 );
	let covered = textureLoad( aoFinalDepth, p, 0 ) > d + 1e-7;
	return vec4f( select( d, - d, covered ), 0.0, 0.0, 1.0 );
}
`}),this.aoPass=new en(this.aoDepth.texture,r,{samples:12,depthIsColor:!0}),this.aoPass.resolutionScale=.5,this.aoPass.radius.value=2.2,this.aoPass.thickness.value=2,this.aoPass.distanceExponent.value=1.4,this.aoPass.scale.value=1.6,this.aoPass.samples.value=12,this.aoPass.useTemporalFiltering=!0,this.aoBlurX=new E(1,1,{colors:[`r16float`],label:`aoBlurX`}),this.aoBlurY=new E(1,1,{colors:[`r16float`],label:`aoBlurY`});let f=(e,t,n)=>{let r=``;for(let e=-2;e<=2;e++)r+=`
	{
		let uvK = in.uv + vec2f( ${t*e}.0, ${n*e}.0 ) / size;
		let rel = abs( postDepthOpaque( uvK ) - dC ) / max( dC, 1e-7 );
		let w = 1.0 / pow2( rel * 40.0 + 1.0 );
		sum += textureSampleLevel( aoSrc, smpLinearClamp, uvK, 0.0 ).r * w;
		wSum += w;
	}`;return new k({label:`AO blur `+(t?`x`:`y`),colorFormats:[`r16float`],bindings:{aoSrc:{texture:e},postAODepth:{texture:()=>this.aoDepth.texture}},code:`
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
`})};this._aoBlurXPass=f(()=>this.aoPass.texture,1,0),this._aoBlurYPass=f(()=>this.aoBlurX.texture,0,1),this.medium=new E(1,1,{colors:[`r8unorm`],label:`medium`}),i.mediumTexture=this.medium.texture,this.haze=s,s&&(s.mediumTexture=this.medium.texture),this.beauty=new E(1,1,{colors:[`rgba16float`],label:`beauty`}),this.smaaIn=new E(1,1,{colors:[`rgba16float`],label:`smaaBeforeTAA`}),this.taau=new un(()=>this.aaMode===`smaataa`?this.smaaIn.texture:this.beauty.texture,this.finalDepth,n.velocityTexture,r,n.waterMaskTexture,this.exposure),this.aaMode=`taa`,this.aa=new an({src:()=>this.beauty.texture,exposure:this.exposure}),this.motionBlur=new wn({velocityTexture:n.velocityTexture,depthTexture:l.depthTexture,color:()=>this.taau.output}),this.flare=o?new _n({depthTexture:l.depthTexture,clouds:a,sunDir:o}):null,this.lens=new dn,this._outW=0,this._outH=0,this._inW=0,this._inH=0,this._prevVP=new y,this._prevCamPos=new e,this._hasPrev=!1,this._size=new d,this._built=!1,this.profiler=null}_build(){this._built=!0;let e=this.underwater,t=this.haze;if(this._mediumPass=new k({label:`medium`,colorFormats:[`r8unorm`],modules:[e.module],code:`fn fragment( in: FSIn ) -> vec4f { return vec4f( underwaterMedium( in.uv ), 0.0, 0.0, 1.0 ); }`}),this._beautyPass=new k({label:`beauty (AO + haze + underwater)`,colorFormats:[`rgba16float`],modules:[e.compositeModule,t?t.compositeModule:null].filter(Boolean),defines:t?t._defines():{},bindings:{post:{uniform:this.uniforms},postScene:{texture:()=>this.sceneColor},postOpaqueDepth:{texture:()=>this.opaqueDepth},postFinalDepth:{texture:()=>this.finalDepth},postAO:{texture:()=>this.aoBlurY.texture},postAODepth:{texture:()=>this.aoDepth.texture}},code:`
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
`}),this.aoPass._pass||this.aoPass._build(),t&&!t._passes&&t._build(),e.renderShafts&&e.shaftPass,this._buildBloom(),this._buildMeter(),this._buildFinal(),this.profiler)for(let[e,t]of this.passes())this.profiler.track(`post `+e,t)}_buildBloom(){let e=e=>new E(1,1,{colors:[`rgba16float`],label:e});this.bloomScales=[.5,.25,.125,.0625,.03125],this.bloomDown=this.bloomScales.map((t,n)=>e(`bloomDown`+(n+1))),this.bloomUp=this.bloomScales.slice(0,4).map((t,n)=>e(`bloomUp`+(n+1)));let t=(e,t)=>new k({label:`bloom down`,colorFormats:[`rgba16float`],bindings:{bSrc:{texture:e}},code:`
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
`}),n=(e,t)=>new k({label:`bloom up`,colorFormats:[`rgba16float`],bindings:{bSrc:{texture:e},bBase:{texture:t}},code:`
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
	workgroupBarrier();`;this.meterKernel=new x({label:`Auto Exposure`,modules:[O],bindings:{ae:{uniform:this.aeUniforms},aeTex:{texture:()=>this.meterRT.texture},aeExposure:{storage:this.exposure,access:`read_write`}},workgroupSize:[256,1,1],code:`
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
`})}_buildFinal(){let e=[O,this.motionBlur.module,this.lens.module];this.flare&&e.push(this.flare.module),this._finalPass=new k({label:`final (grade + tonemap)`,colorFormats:[this.outputFormat],modules:e,bindings:{post:{uniform:this.uniforms},postResolved:{texture:()=>this.taau.output},postBloom:{texture:()=>this.bloomTex.texture},postHalf:{texture:()=>this.half.texture},postExposure:{storage:this.exposure,access:`read`}},code:Tn+`
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
`})}_outputSize(){if(this.outputSize)return this.outputSize;let e=this.renderer;return e&&e.width?{width:e.width,height:e.height}:C.canvas?{width:C.canvas.width,height:C.canvas.height}:{width:1,height:1}}_resize(){let{width:e,height:t}=this._outputSize(),n=Math.max(1,Math.round(e*this.scale)),r=Math.max(1,Math.round(t*this.scale));if(e===this._outW&&t===this._outH&&n===this._inW&&r===this._inH)return;this._outW=e,this._outH=t,this._inW=n,this._inH=r,this.sceneRenderer.setSize(n,r),this.beauty.setSize(n,r),this.smaaIn.setSize(n,r),this.medium.setSize(n,r),this.underwater.setSize&&this.underwater.setSize(n,r),this.aoPass.resolutionScale=.5*this.scale,this.aoPass.setSize(e,t);let i=Math.round(e*.5*this.scale),a=Math.round(t*.5*this.scale);this.aoDepth.setSize(i,a),this.aoBlurX.setSize(i,a),this.aoBlurY.setSize(i,a),this.haze&&this.haze.setSize(e,t),this.taau.setSize(e,t),this.bloomDown&&(this.bloomScales.forEach((n,r)=>this.bloomDown[r].setSize(Math.round(e*n),Math.round(t*n))),this.bloomScales.slice(0,4).forEach((n,r)=>this.bloomUp[r].setSize(Math.round(e*n),Math.round(t*n)))),this.flare&&this.flare.setDepthHeight(r),this.lens.aspect.value=e/t}setScale(e){e!==this.scale&&(this.scale=e,this.sceneRenderer.scale=e,this.haze&&this.haze.setScale(e))}setBloom(e){this.params.bloom.value=e}internalSize(e=new d){return e.set(this._inW,this._inH)}beginFrame(){this._built||(this._build(),this._outW=0),this._resize();let e=this.camera;e.updateMatrixWorld(),e.matrixWorldInverse&&e.matrixWorldInverse.copy(e.matrixWorld).invert(),this.motionBlur.updateCamera(e),this.taau.advance();let[t,n]=this.aaMode===`taa`||this.aaMode===`smaataa`?this.taau.jitter():[0,0];i(e,this._inW,this._inH,{jitterX:-t,jitterY:n,prevViewProj:this._hasPrev?this._prevVP:null,prevCameraPos:this._hasPrev?this._prevCamPos:null});let r=g.fields;r.outputResolution.value.set(this._outW,this._outH),this._prevVP.copy(r.viewProjNoJitter.value),this._prevCamPos.copy(r.cameraPos.value),this._hasPrev=!0}render(){if(this._built||this.beginFrame(),this._timers,this.motionBlur.compute(this._outW,this._outH),this._aoDepthPass.render({colorViews:[this.aoDepth.texture],clear:$}),this.aoPass.render(),this._aoBlurXPass.render({colorViews:[this.aoBlurX.texture],clear:$}),this._aoBlurYPass.render({colorViews:[this.aoBlurY.texture],clear:$}),p.waterEnabled.value>.5&&this._mediumPass.render({colorViews:[this.medium.texture],clear:$}),this.underwater.renderShafts&&this.underwater.renderShafts(p.waterEnabled.value>.5&&this.camera.position.y<p.cameraWaterHeight.value+.35+1),this.haze&&p.atmosphereQuality.value>0&&(this.haze.update(),this.haze.render()),this._beautyPass.render({colorViews:[this.beauty.texture],clear:$}),this.aaMode===`taa`||this.aaMode===`smaataa`)this.aaMode===`smaataa`&&this.aa.render(`smaa`,this.smaaIn.texture),this.taau.render();else{let e=this.taau,t=1-e._cur;this.aa.render(this.aaMode,e.history[t].textures[0]),e._cur=t,e._needsRestart=!0}for(let[e,t]of this._bloomPasses)e.render({colorViews:[t.texture],clear:$});let e=this.outputTexture?this.outputTexture.view({dimension:`2d`,mipLevelCount:1}):C.context.getCurrentTexture().createView();this._finalPass.render({colorViews:[e],clear:$}),this.meterKernel.dispatch([1,1,1])}endFrame(){this.taau.clearViewOffset(),this.taau.endFrame()}passes(){let e=[[`motion blur tiles`,this.motionBlur.tileKernel],[`motion blur neighbours`,this.motionBlur.neighborKernel],[`GTAO`,this.aoPass._pass],[`AO blur x`,this._aoBlurXPass],[`AO blur y`,this._aoBlurYPass],[`medium`,this._mediumPass]];return this.haze&&this.haze._passes&&(e.push([`haze march`,this.haze._passes.march],[`haze sun mask`,this.haze._passes.mask]),this.haze._passes.blur.forEach((t,n)=>e.push([`haze god rays `+n,t]))),this.underwater._shaftPass&&e.push([`underwater shafts`,this.underwater._shaftPass]),e.push([`beauty`,this._beautyPass],[`TAAU`,this.taau._resolve[0]],[`TAAU `,this.taau._resolve[1]]),this.taau._tiledResolve&&this.taau._tiledResolve.forEach((t,n)=>e.push([`TAAU tiled `+n,t])),this._bloomPasses.forEach(([t],n)=>e.push([`bloom `+n,t])),e.push([`final`,this._finalPass],[`auto exposure`,this.meterKernel]),this.flare&&e.push([`flare visibility`,this.flare.kernel]),e}};export{Oe as C,Ne as S,we as T,lt as _,Kt as a,N as b,zt as c,xt as d,B as f,ut as g,_t as h,Yt as i,At as l,gt as m,Tn as n,Wt as o,z as p,Zt as r,Gt as s,En as t,wt as u,rt as v,Fe as w,Pe as x,M as y};