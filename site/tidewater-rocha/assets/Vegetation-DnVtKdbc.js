import{C as e,D as t,E as n,O as r,_ as i,a,b as o,c as s,f as c,h as l,i as u,j as d,k as f,l as p,n as m,o as h,p as g,r as _,t as v,v as y,w as b,x,y as S}from"./Frame-CNet77I0.js";import{a as C,i as w,o as T,r as E}from"./Materials-CAztm2ge.js";import{a as D,b as O,f as k,p as ee,v as te,x as ne}from"./PostFX-0mW-sLoH.js";import{t as A}from"./GPU-CxPpnRCf.js";import{n as re,r as j,t as ie}from"./Texture-8f_StRFj.js";import"./Globals-CLsqp45h.js";import{A as ae,C as oe,D as se,E as ce,O as le,S as ue,T as de,_ as fe,a as pe,b as me,c as he,d as ge,f as _e,g as ve,i as ye,k as be,l as xe,m as Se,n as Ce,o as we,p as Te,r as Ee,s as De,t as M,u as Oe,v as ke,w as Ae,x as N,y as je}from"./common-HBn3Movl.js";import{d as Me,o as Ne}from"./LocalLights-DGrzAZBs.js";import{t as Pe}from"./Material-tyLfv2Wn.js";import{a as Fe}from"./CameraVelocity-DbPmsWHs.js";import{G as Ie,J as Le,K as Re,W as ze,at as Be,nt as Ve,ot as P,q as He,rt as Ue,tt as We,w as Ge}from"./Village-C_egDSub.js";var Ke=class{constructor({gridSize:e=64,leafSize:r=8,levels:a=12,rangeFactor:o=2.5,morphStartRatio:s=.66,maxInstances:l=1500,minY:u=-20,maxY:d=20,heightBounds:p=null,center:m=null,prefix:g=`cdlod`}={}){this.G=e,this.leafSize=r,this.levels=a,this.minY=u,this.maxY=d,this.heightBounds=p,this.fixedRoot=m,this.ranges=[];let _=[],v=0;for(let e=0;e<a;e++){let t=r*2**e*o;this.ranges.push(t);let n=v+(t-v)*s;_.push(new f(n,1/Math.max(.001,t-n))),v=t}let x=[];for(let t=0;t<a;t++)x.push(r*2**t/e);this.uMorph={array:_},this.uSpacing={array:x};let C=g,w=C[0].toUpperCase()+C.slice(1);this.params=new c(w+`Params`,{morph:[`vec4f[${a}]`,_.map((e,t)=>new n(e.x,e.y,x[t],0))]},{label:C}),this.module=new h({name:C,uniforms:this.params,uniformName:C,code:`
struct ${w}Vertex { worldXZ: vec2f, spacing: f32, morphK: f32, lod: f32, size: f32 };

// Morph in world space on the LOD's own vertex lattice (spacing h). Quarter nodes of a
// partially subdivided parent carry the parent's LOD, so their extra vertices first snap
// onto that lattice; every node covering a point then computes the same position.
fn ${C}Snapped( node: vec4f, grid: vec2f ) -> vec2f {
	let h = ${C}.morph[ i32( node.w ) ].z;
	let p = node.xy + grid * node.z;
	return floor( p / h + 1e-3 ) * h;
}

fn ${C}Morph( node: vec4f, grid: vec2f, viewPos: vec3f, y0: f32 ) -> ${w}Vertex {
	let lod = i32( node.w );
	let m = ${C}.morph[ lod ];
	let h = m.z;
	let p = node.xy + grid * node.z;
	let idx = floor( p / h + 1e-3 );
	let snapped = idx * h;
	let dist = length( viewPos - vec3f( snapped.x, y0, snapped.y ) );
	let morphK = clamp( ( dist - m.x ) * m.y, 0.0, 1.0 );
	let odd = fract( idx * 0.5 ) * 2.0;
	var o: ${w}Vertex;
	o.worldXZ = snapped - odd * h * morphK;
	o.spacing = h * ( morphK + 1.0 );
	o.morphK = morphK;
	o.lod = node.w;
	o.size = node.z;
	return o;
}
`});let T=e,E=new Float32Array((T+1)*(T+1)*3),D=0;for(let e=0;e<=T;e++)for(let t=0;t<=T;t++)E[D++]=t/T,E[D++]=0,E[D++]=e/T;let O=new Uint32Array(T*T*6);D=0;for(let e=0;e<T;e+=8)for(let t=0;t<T;t++)for(let n=e;n<Math.min(e+8,T);n++){let e=t*(T+1)+n,r=e+1,i=e+(T+1),a=i+1;(n+t)%2==0?(O[D++]=e,O[D++]=i,O[D++]=r,O[D++]=r,O[D++]=i,O[D++]=a):(O[D++]=e,O[D++]=i,O[D++]=a,O[D++]=e,O[D++]=a,O[D++]=r)}let k=new je;k.setAttribute(`position`,new me(E,3)),k.setIndex(new me(O,1)),this.nodeArray=new Float32Array(l*4),this.nodeAttr=new ue(this.nodeArray,4),k.setAttribute(`nodeData`,this.nodeAttr),k.instanceCount=0,k.boundingSphere=new y(new t,1e7),k.boundingBox=new S(new t(-1e7,-1e7,-1e7),new t(1e7,1e7,1e7)),this.geometry=k,this.maxInstances=l,this.count=0,this._box=new S,this._frustum=new i,this._mat=new b,this._cam=new t,this.lodCounts=Array(a).fill(0)}vertexNodes(e=null,{out:t=`lod`,viewPos:n=`frame.cameraPos`}={}){let r=this.module.name;return`let ${t} = ${r}Morph( v.nodeData, v.position.xz, ${n}, ${e?`${e}( ${r}Snapped( v.nodeData, v.position.xz ) )`:`0.0`} );`}update(e){e.updateMatrixWorld(),this._mat.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(this._mat,e.coordinateSystem,e.reversedDepth),e.getWorldPosition(this._cam),this.count=0,this.lodCounts.fill(0);let t=this.levels-1,n=this.leafSize*2**t;if(this.fixedRoot){let{x:e,z:r,size:i}=this.fixedRoot,a=Math.ceil(i/n);for(let i=0;i<a;i++)for(let o=0;o<a;o++)this._select(e+o*n,r+i*n,n,t)}else{let e=Math.floor(this._cam.x/n),r=Math.floor(this._cam.z/n);for(let i=-1;i<=1;i++)for(let a=-1;a<=1;a++)this._select((e+a)*n,(r+i)*n,n,t)}let r=this.count,i=this._order||=[];i.length=r;let a=this.nodeArray,o=this._cam;for(let e=0;e<r;e++){let t=a[e*4+2],n=Math.max(a[e*4]-o.x,0,o.x-a[e*4]-t),r=Math.max(a[e*4+1]-o.z,0,o.z-a[e*4+1]-t);i[e]={d:n*n+r*r,x:a[e*4],z:a[e*4+1],s:t,l:a[e*4+3]}}i.sort((e,t)=>e.d-t.d);for(let e=0;e<r;e++){let t=i[e];a[e*4]=t.x,a[e*4+1]=t.z,a[e*4+2]=t.s,a[e*4+3]=t.l}this.geometry.instanceCount=this.count,this.nodeAttr.clearUpdateRanges(),this.nodeAttr.addUpdateRange(0,this.count*4),this.nodeAttr.needsUpdate=!0}_bounds(e,t,n){if(this.heightBounds){let[r,i]=this.heightBounds(e,t,e+n,t+n);this._box.min.set(e,r,t),this._box.max.set(e+n,i,t+n)}else this._box.min.set(e,this.minY,t),this._box.max.set(e+n,this.maxY,t+n);return this._box}_intersectsSphere(e,t){let n=this._cam,r=Math.max(e.min.x-n.x,0,n.x-e.max.x),i=Math.max(e.min.y-n.y,0,n.y-e.max.y),a=Math.max(e.min.z-n.z,0,n.z-e.max.z);return r*r+i*i+a*a<=t*t}_add(e,t,n,r){if(this.count>=this.maxInstances)return;let i=this.count*4;this.nodeArray[i]=e,this.nodeArray[i+1]=t,this.nodeArray[i+2]=n,this.nodeArray[i+3]=r,this.count++,this.lodCounts[r]++}_select(e,t,n,r){let i=this._bounds(e,t,n);if(!this._intersectsSphere(i,this.ranges[r]))return!1;if(!this._frustum.intersectsBox(i))return!0;if(r===0||!this._intersectsSphere(i,this.ranges[r-1]))return this._add(e,t,n,r),!0;let a=n*.5,o=[[e,t],[e+a,t],[e,t+a],[e+a,t+a]];for(let[e,t]of o)if(!this._select(e,t,a,r-1)){let n=this._bounds(e,t,a);this._frustum.intersectsBox(n)&&this._add(e,t,a,r)}return!0}},qe=128,Je=class{constructor(e,{enabled:t=null}={}){this.renderer=e;let n=t??(typeof location<`u`&&/(^|[?&])profile\b/.test(location.search||``));this.enabled=!!n&&A.hasTimestamp,this.nodes=new Map,this.result={compute:0,render:0,items:[]},this._t=0,this._busy=!1,this._slots=[],this.enabled&&(this.querySet=A.device.createQuerySet({type:`timestamp`,count:256}),this.resolveBuffer=A.device.createBuffer({label:`profiler resolve`,size:2048,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),this.ring=[0,1,2].map(()=>({buffer:A.device.createBuffer({label:`profiler read`,size:2048,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),busy:!1})),this._last=new Map)}track(e,t){if(!t||(this.nodes.set(e,t),!this.enabled))return;let n=this._slots.length;n>=qe||(this._slots.push({name:e,node:t}),t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:n*2,endOfPassWriteIndex:n*2+1})}_record(){let e=this._slots.length;if(!e)return;let t=this.ring.find(e=>!e.busy);if(!t)return;t.busy=!0;let n=A.getEncoder();n.resolveQuerySet(this.querySet,0,e*2,this.resolveBuffer,0),n.copyBufferToBuffer(this.resolveBuffer,0,t.buffer,0,e*16);let r=this._slots.map(e=>e.name),i=this._slots.map(e=>e.node.dispatch||(e.node.handle?e.node.handle.kind===`compute`:e.node.pipeline&&/Compute/.test(e.node.pipeline.constructor.name))?`compute`:`render`);A.onSubmit(null,()=>{t.buffer.mapAsync(GPUMapMode.READ).then(()=>{let e=new BigInt64Array(t.buffer.getMappedRange().slice(0));t.buffer.unmap(),t.busy=!1;let n=[];this.debugRaw&&console.log(`raw`,Array.from(e.slice(0,r.length*2),t=>Number(t-e[0])/1e6).map(e=>e.toFixed(3)).join(` `));let a=0,o=0,s=[];for(let t=0;t<r.length;t++){let n=e[t*2],r=e[t*2+1];r>0n&&r>=n&&s.push({i:t,a:n,b:r})}s.sort((e,t)=>e.b<t.b?-1:+(e.b>t.b));let c=new Map,l=null;for(let e of s){let t=l!==null&&l>e.a?l:e.a;c.set(e.i,Number(e.b-t)/1e6),l=e.b}for(let e=0;e<r.length;e++){let t=c.get(e)||0;(t>1e3||t<0)&&(t=0),t>0?this._last.set(r[e],t):t=this._last.get(r[e])||0,n.push({name:r[e],ms:t,kind:i[e]}),i[e]===`compute`?a+=t:o+=t}n.sort((e,t)=>t.ms-e.ms),this.result={compute:a,render:o,items:n}}).catch(()=>{t.busy=!1})})}update(e){this.enabled&&(this._t+=e,this._t>.5&&(this._t=0,this._record()))}summary(e=12){return this.result.items.slice(0,e).map(e=>`${e.name} ${e.ms.toFixed(2)}`).join(` · `)}},Ye=Math.PI,Xe=636e4,Ze=32768,Qe=512,$e=256,et=16,tt=24,nt=128,rt=2048,it=.12,at=15,ot=2500,st=9e3,ct=64,lt=1e3,ut=.48,dt=lt/4,ft=3.7,pt=dt/ft,mt=1024,ht=320,gt=256,_t=409600,vt=1024,yt=4e4,bt=256,xt=3e4,St=2.6,Ct=[0,10,2,8,5,15,7,13,1,11,3,9,4,14,6,12],wt=4,Tt=.75,F=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},Et=`
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
	let a = clHash2( c ) * ${F(2*Ye)};
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
`;function Dt(e){let t=Math.cos(e),n=Math.sin(e),r=e+.6;return`
const CL_EARTH_R: f32 = ${F(Xe)};
const CL_TILE: f32 = ${F(Ze)};
const CL_D_MEAN: f32 = ${F(ut)};
const CL_EDGE: f32 = ${F(at)};
const CL_AP_DIST: f32 = ${F(xt)};
const CL_MS: f32 = ${F(St)};
// weather map lookups are rotated so cloud streets line up with the (initial) wind
const CL_C: f32 = ${F(t)};
const CL_S: f32 = ${F(n)};
// frame of the upper wind (veered from the trades)
const CL_HC: f32 = ${F(Math.cos(r))};
const CL_HS: f32 = ${F(Math.sin(r))};

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
`}function Ot(e,t){return`
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
`}var kt=class{constructor(e,n){this.renderer=e,this.atmosphere=n;let r=new f().copy(m.windDir.value).normalize().multiplyScalar(12);this.params=new c(`CloudsParams`,{coverage:[`f32`,.45],densityScale:[`f32`,.07],bottom:[`f32`,750],top:[`f32`,2400],wind:[`vec2f`,r],offset:[`vec2f`,new f],shadowCenter:[`vec2f`,new f],shadowSize:[`f32`,8e3],shadowStrength:[`f32`,.85],cirrus:[`f32`,.5],cirrusAlt:[`f32`,9e3],camY:[`f32`,1],horizonY:[`f32`,-.001],nOrigin:[`vec2f`,new f],wOrigin:[`vec2f`,new f],camXZ:[`vec2f`,new f],hOffset:[`vec2f`,new f],windN:[`vec2f`,new f(1,0)],viewSize:[`vec2f`,new f(4,4)],traceSize:[`vec2f`,new f(1,1)],displayH:[`f32`,4],viewValid:[`f32`,0],sdfCoverage:[`f32`,0],shadowPhase:[`f32`,0],panoSlot:[`vec2f`,new f],camRight:[`vec3f`,new t(1,0,0)],camUp:[`vec3f`,new t(0,1,0)],camFwd:[`vec3f`,new t(0,0,-1)],camTan:[`vec2f`,new f(1,1)],viewRight:[`vec3f`,new t(1,0,0)],viewUp:[`vec3f`,new t(0,1,0)],viewFwd:[`vec3f`,new t(0,0,-1)],viewTan:[`vec2f`,new f(1,1)]},{label:`clouds`});let i=this.params.fields;this.coverage=i.coverage,this.densityScale=i.densityScale,this.bottom=i.bottom,this.top=i.top,this.wind=i.wind,this.offset=i.offset,this.shadowCenter=i.shadowCenter,this.shadowSize=i.shadowSize,this.shadowStrength=i.shadowStrength,this.cirrus=i.cirrus,this.cirrusAlt=i.cirrusAlt,this.camY=i.camY,this.nOrigin=i.nOrigin,this.wOrigin=i.wOrigin,this.camXZ=i.camXZ,this.hOffset=i.hOffset,this.horizonY=i.horizonY,this.windN=i.windN,this.viewSize=i.viewSize,this.displayH=i.displayH,this.traceSize=i.traceSize,this.viewValid=i.viewValid,this.sdfCoverage=i.sdfCoverage,this.shadowPhase=i.shadowPhase,this.panoSlot=i.panoSlot,this.cam={right:i.camRight,up:i.camUp,fwd:i.camFwd,tan:i.camTan},this.viewCam={right:i.viewRight,up:i.viewUp,fwd:i.viewFwd,tan:i.viewTan},this.prev={right:{value:new t(1,0,0)},up:{value:new t(0,1,0)},fwd:{value:new t(0,0,-1)},tan:{value:new f(1,1)}},this.camDelta={value:new t},this.camDeltaHi={value:new t},this.historyValid={value:0},this.minAlpha={value:.12},this.rebuildK={value:-1},this.slot={value:new f},this.subPixel={value:new f},this.frameNoise={value:0};let a=this.wind.value;this._rot=Math.atan2(a.y,a.x),this._offsetW=new f,this._offsetH=new f,this._makeNoise(),this._makeTargets(),this._buildModules(),this._buildKernels(),this._generateNoise(),this.frame=0,this.panoWarm=1,this.resolutionScale=1,this.outputSize=null,this._prevCam=new t,this._prevSun=new t,this._hasPrev=!1,this._rebuild=0,this._since=0,this._traces=0,this._pp=0,this._traceIndex=0}_makeNoise(){let e=(e,t)=>new j({label:t,width:e,height:e,depth:e,dimension:`3d`,format:`rgba8unorm`,usage:[`sample`,`storage`]});this.shapeTex=e(nt,`cloudShape`),this.detailTex=e(ct,`cloudDetail`),this.weatherTex=new j({label:`cloudWeather`,width:Qe,height:Qe,format:`rgba8unorm`,usage:[`sample`,`storage`]}),this.synTex=new j({label:`cloudSynoptic`,width:gt,height:gt,format:`rgba8unorm`,usage:[`sample`,`storage`]}),this.fibTex=new j({label:`cloudFibres`,width:vt,height:vt,format:`rgba8unorm`,mips:!0,usage:[`sample`,`storage`,`render`]}),this.auxTex=new j({label:`cloudFibreFlow`,width:vt,height:vt,format:`rgba16float`,usage:[`sample`,`storage`]})}_generateNoise(){let e=this._noiseKernels;e.syn.dispatch([gt/8,gt/8,1]),e.aux.dispatch([vt/8,vt/8,1]),e.fib.dispatch([vt/8,vt/8,1]),w(this.fibTex),e.shape.dispatch([nt/4,nt/4,nt/4]),e.detail.dispatch([ct/4,ct/4,ct/4]),e.weather.dispatch([Qe/8,Qe/8,1])}_makeTargets(){let e=(e,t,n)=>new j({label:n,width:e,height:t,format:`rgba16float`,usage:[`sample`,`storage`,`copySrc`]});this.panorama=e(mt,ht,`cloudPanorama`),this.shadowMap=e(bt,bt,`cloudShadow`);let t=e=>new j({label:e,width:$e,height:$e,depth:et,dimension:`3d`,format:`rgba8unorm`,usage:[`sample`,`storage`]});this.sdfA=t(`cloudSdfA`),this.sdfB=t(`cloudSdfB`),this.sdfTex=t(`cloudSdf`),this.traceTex=e(1,1,`cloudTrace`),this.traceDepth=e(1,1,`cloudTraceDepth`),this.highTrace=e(1,1,`cloudHighTrace`),this.motionTex=e(1,1,`cloudMotion`),this.boxMin=e(1,1,`cloudBoxMin`),this.boxMax=e(1,1,`cloudBoxMax`),this.history=[e(4,4,`cloudViewA`),e(4,4,`cloudViewB`)],this.viewTex=this.history[0],this._w=0,this._h=0}_buildModules(){let e=this.atmosphere,t=new h({name:`cloudsHelpers`,deps:[M],code:Dt(this._rot)});this.helpersModule=t,this.coreModule=new h({name:`cloudsCore`,deps:[M,e.module,t],uniforms:this.params,uniformName:`cloudsParams`,bindings:{cloudsWeatherTex:{texture:this.weatherTex},cloudsShapeTex:{texture:this.shapeTex},cloudsDetailTex:{texture:this.detailTex},cloudsSdfTex:{texture:this.sdfTex},cloudsSynTex:{texture:this.synTex},cloudsFibTex:{texture:this.fibTex}},code:`
// weather space (rotated so cloud streets follow the wind) uv of a camera relative position
fn cloudsWeatherUV( pxz: vec2f ) -> vec2f {
	return ( vec2f( pxz.x * CL_C + pxz.y * CL_S, pxz.y * CL_C - pxz.x * CL_S ) + cloudsParams.wOrigin ) / CL_TILE;
}

// x: cell profile (after the coverage control), y: top of this column (fraction of the layer).
// pxz: camera relative; big cells and towers are only allowed far from the island (origin)
fn cloudsWeather( pxz: vec2f ) -> vec2f {
	let w = textureSampleLevel( cloudsWeatherTex, smpLinearRepeat, cloudsWeatherUV( pxz ), 0.0 );
	let thr = 1.0 - cloudsParams.coverage * 1.3;
	let far = smoothstep( ${F(ot)}, ${F(st)}, length( pxz + cloudsParams.camXZ ) );
	// cells too weak to hold more than a scrap of cloud are dropped (no scattered specks)
	let cs = sat( ( ( w.x - thr ) / max( 1.0 - thr, 0.05 ) - 0.08 ) * 1.09 );
	let cb = sat( ( ( w.w * far - thr ) / max( 1.0 - thr, 0.05 ) - 0.08 ) * 1.09 );
	return vec2f( max( cs, cb ), max( clSmallTop( cs, w.y, w.z ), clBigTop( cb, w.z ) ) );
}

// distance (m) that is certainly free of cloud around p (0 near clouds). Nearest lookup of the distance
// field: x / y repeat (the field tiles), z clamped to the layer
fn cloudsSkip( p: vec3f ) -> f32 {
	let alt = p.y + ( p.x * p.x + p.z * p.z ) / ${F(2*Xe)};
	let H = cloudsParams.top - cloudsParams.bottom;
	let uvw = vec3f( fract( cloudsWeatherUV( p.xz ) ), sat( ( alt - cloudsParams.bottom ) / H ) );
	let ix = vec3i( min( vec3f( floor( uvw * vec3f( ${F($e)}, ${F($e)}, ${F(et)} ) ) ), vec3f( ${F(255)}, ${F(255)}, ${F(15)} ) ) );
	let d = textureLoad( cloudsSdfTex, ix, 0 ).x * 255.0;
	return max( d - 1.0, 0.0 ) * min( H / ${F(et)}, ${F(Ze/$e)} );
}

// base shape. p: camera relative (sheared) position, w: weather
// returns vec4( raw shape value, height inside the cloud 0..1, swirl xy ); density = ramp( x )
fn cloudsBase( p: vec3f, w: vec2f ) -> vec4f {
	let alt = p.y + ( p.x * p.x + p.z * p.z ) / ${F(2*Xe)};
	let hL = ( alt - cloudsParams.bottom ) / ( cloudsParams.top - cloudsParams.bottom );
	let np = p.xz + cloudsParams.nOrigin;
	let n = textureSampleLevel( cloudsShapeTex, smpLinearRepeat, vec3f( np.x, alt * 1.4, np.y ) / ${F(rt)}, 0.0 );
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
	let alt = p.y + ( p.x * p.x + p.z * p.z ) / ${F(2*Xe)};
	let np = p.xz + cloudsParams.nOrigin;
	// low frequency swirl of the detail lookup
	let sw = ( b.zw - 0.5 ) * ( 0.3 * ( 1.0 - b.y * 0.6 ) );
	let dp = vec3f( np.x, alt, np.y ) / ${F(lt)} + vec3f( sw.x, 0.0, sw.y ) + vec3f( frame.time * 0.0015, 0.0, 0.0 );
	var f1 = CL_D_MEAN;
	var f2 = CL_D_MEAN;
	if ( foot < ${F(dt*.24)} ) {
		f1 = cloudsOctaves( dp, ${F(dt)}, foot );
		// close range: a finer fetch (lumps down to ~3 m) keeps near clouds crisp
		if ( foot < ${F(pt*.24)} ) {
			f2 = cloudsOctaves( dp * ${F(ft)} + 0.37, ${F(pt)}, foot );
		}
	}
	let crease = clCreaseOf( clErosionField( f1 * 0.78 + f2 * 0.22, b ) );
	// the creases are eaten: round lumps (cauliflower) on the upper parts, wisps underneath
	return vec2f( clEroded( b, crease ), 1.0 - crease );
}

// the cloud field leans downwind with height (wind shear)
fn cloudsSheared( p: vec3f ) -> vec3f {
	let lean = max( p.y - cloudsParams.bottom, 0.0 ) * ${F(it)};
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
	let lit = smoothstep( -0.006, 0.006, mu + sqrt( max( alt, 0.0 ) * ${F(2/Xe)} ) );
	return select( lit, 1.0, light.isMoon );
}

// cubic B-spline filtered texture lookup in 4 bilinear taps (GPU Gems 2, ch. 20): magnified cirrus fibres
// stay smooth instead of showing the bilinear texel grid (res: texels at mip 0)
fn cloudsBspline( uv: vec2f, lod: f32 ) -> vec4f {
	let size = ${F(vt)} / exp2( lod );
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
	let la = length( a ) * ${F(vt)}; let lb = length( b ) * ${F(vt)};
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
	let syn = textureSampleLevel( cloudsSynTex, smpLinearRepeat, cloudsToWind( q ) * ${F(1/_t)}, 0.0 );
	let cov = smoothstep( 0.15, 0.85, syn.x ) * smoothstep( 0.4, 0.72, syn.z ) * ( syn.y * 0.4 + 0.6 );
	// fibres at two scales (hides the tiling of the texture)
	let f1 = cloudsFibres( q, fA, fB, ${F(yt)}, 0.0 );
	let f2 = cloudsFibres( q, fA, fB, ${F(yt*2.3)}, 0.5 );
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
	let tr = exp( t * ${F(-.25/xt)} );
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
${At(`View`,{maxSteps:200,maxDist:5e4,ds0:24,dsMax:120,coarse:4,lightSteps:[12,50,140,350,900,1800],lightDetail:3,detail:!0,ambient:1.2,pxAngle:`cloudsParams.camTan.y * 2.0 / cloudsParams.displayH`})}
${At(`Pano`,{maxSteps:56,maxDist:5e4,ds0:60,dsMax:320,coarse:2,lightSteps:[120,500],lightDetail:0,detail:!1,ambient:1.2,pxAngle:F(2*Ye/mt)})}
`}),this.shadowModule=new h({name:`cloudsShadow`,deps:[M],uniforms:this.params,uniformName:`cloudsParams`,bindings:{cloudsShadowMap:{texture:this.shadowMap}},code:`
// cloud shadow transmittance (1 = clear) at a world position. Manual bilinear filtering of an
// unfilterable texture: costs no sampler in the (sampler hungry) scene materials.
fn cloudsShadowTap( i: vec2i ) -> f32 { return textureLoad( cloudsShadowMap, clamp( i, vec2i( 0 ), vec2i( 255 ) ), 0 ).x; }
fn cloudsShadow( worldXZ: vec2f ) -> f32 {
	if ( frame.atmosphereQuality <= 0.0 ) { return 1.0; }
	let uv = ( worldXZ - cloudsParams.shadowCenter ) / cloudsParams.shadowSize + 0.5;
	let st = uv * ${F(bt)} - 0.5;
	let i0 = vec2i( floor( st ) );
	let fr = fract( st );
	let s = mix( mix( cloudsShadowTap( i0 ), cloudsShadowTap( i0 + vec2i( 1, 0 ) ), fr.x ), mix( cloudsShadowTap( i0 + vec2i( 0, 1 ) ), cloudsShadowTap( i0 + vec2i( 1, 1 ) ), fr.x ), fr.y );
	// no data outside the map: fade to unshadowed at its border
	let e = abs( uv - 0.5 );
	let inside = smoothstep( 0.5, 0.42, max( e.x, e.y ) );
	return mix( 1.0, s, cloudsParams.shadowStrength * inside );
}
`}),this.module=new h({name:`clouds`,deps:[M,t,this.shadowModule],uniforms:this.params,uniformName:`cloudsParams`,bindings:{cloudsPanorama:{texture:this.panorama},cloudsView:{texture:()=>this.viewTex}},code:`
${Ot(`cloudsViewCatmullRom`,`cloudsView`)}

// vec4(rgb in-scattered radiance, a transmittance) for a view direction (panorama)
fn cloudsSample( dir: vec3f ) -> vec4f {
	if ( frame.atmosphereQuality <= 0.0 ) { return vec4f( 0.0, 0.0, 0.0, 1.0 ); }
	let az = atan2( dir.z, dir.x );
	let u = fract( az / ${F(2*Ye)} );
	let elev = - acos( clamp( dir.y, -1.0, 1.0 ) ) + ${F(Ye/2)};
	let t = clamp( ( elev + ${F(4/180*Ye)} ) / ${F(94/180*Ye)}, 0.0, 1.0 );
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

`})}_buildKernels(){let e=new h({name:`cloudsNoise`,deps:[M],code:Et}),t=this.helpersModule,n=(e,t,n,r,i=[8,8,1])=>new C({label:e,modules:t,bindings:n,code:r,workgroupSize:i}),r=`@compute @workgroup_size( WG_X, WG_Y, WG_Z ) fn main( @builtin( global_invocation_id ) gid: vec3u )`;this._noiseKernels={shape:n(`Cloud Shape Noise`,[e],{outTex:{storageTexture:this.shapeTex}},`${r} {
	let p = ( vec3f( gid ) + 0.5 ) / ${F(nt)};
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
	let p = ( vec3f( gid ) + 0.5 ) / ${F(ct)};
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
	let p = ( vec2f( gid.xy ) + 0.5 ) / ${F(Qe)};
	let meso = clVnoise2( p, vec2f( 4.0 ) ) * 0.6 + clVnoise2( p, vec2f( 8.0 ) ) * 0.3 + clVnoise2( p, vec2f( 16.0 ) ) * 0.1;
	// low frequency warp: irregular footprints, wavy streets
	let pw = p + ( vec2f( clVnoise2( p, vec2f( 24.0 ) ), clVnoise2( p + 0.37, vec2f( 24.0 ) ) ) - 0.5 ) * 0.03;
	// cloud streets along the wind (x), about 3 km apart
	let street = sin( pw.y * ${F(2*Ye*11)} + clVnoise2( p, vec2f( 3.0 ) ) * 6.0 ) * 0.5 + 0.5;
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
	let p = ( vec2f( gid.xy ) + 0.5 ) / ${F(gt)};
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
	let p = ( vec2f( gid.xy ) + 0.5 ) / ${F(vt)};
	let e = ${F(1/vt)};
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
	let LIC_STEP = ${F(1/vt)};
	let p = ( vec2f( gid.xy ) + 0.5 ) / ${F(vt)};
	var x1 = p; var x2 = p;
	var fib = 0.0;
	var head = 0.0;
	for ( var i = 0; i < LIC_STEPS; i++ ) {
		let k = f32( i );
		let a = textureSampleLevel( auxTex, smpLinearRepeat, x1, 0.0 );
		fib += a.x * sin( ( k + 0.5 ) * ${F(Ye/44)} );
		x1 -= vec2f( cos( a.y ), sin( a.y ) ) * LIC_STEP;
		// hooked tails: from the tuft downwind, sagging sideways
		let b = textureSampleLevel( auxTex, smpLinearRepeat, x2, 0.0 );
		head += b.z * exp( k * ${F(-1/12)} );
		x2 -= normalize( vec2f( cos( b.y ), sin( b.y ) + b.w * 1.2 ) ) * LIC_STEP;
	}
	let breakup = sat( clGfbm( p, vec2f( 24.0 ), 0.71 ) * 1.6 - 0.25 );
	let wisps = ( 1.0 - exp( fib * -0.8 ) ) * breakup;
	let hooks = 1.0 - exp( head * -0.5 );
	let veil = clGfbm( p, vec2f( 4.0 ), 0.33 );
	textureStore( outTex, gid.xy, vec4f( sat( max( wisps, hooks ) ), sat( veil ), 0.0, 1.0 ) );
}`)};let i=this.params,a=new h({name:`cloudsSdfParams`,deps:[M,t],uniforms:i,uniformName:`cloudsParams`,code:``});this.sdfOccKernel=n(`Cloud SDF Occupancy`,[a],{weatherTex:{texture:this.weatherTex},outTex:{storageTexture:this.sdfA}},`${r} {
	let ix = i32( gid.x ); let iy = i32( gid.y );
	let h0 = f32( gid.z ) / ${F(et)};
	let thr = 1.0 - cloudsParams.sdfCoverage * 1.3;
	// conservative: maxima of every weather quantity around the cell (they are interpolated
	// separately), big cells assumed allowed
	var mx = vec4f( 0.0 );
	for ( var y = -1; y <= 2; y++ ) { for ( var x = -1; x <= 2; x++ ) {
		let wc = vec2i( ( ix * 2 + x + ${Qe} ) % ${Qe}, ( iy * 2 + y + ${Qe} ) % ${Qe} );
		mx = max( mx, textureLoad( weatherTex, wc, 0 ) );
	} }
	let cs = sat( ( mx.x - thr ) / max( 1.0 - thr, 0.05 ) );
	let cb = sat( ( mx.w - thr ) / max( 1.0 - thr, 0.05 ) );
	let occ = max( select( -1.0, clSmallTop( cs, mx.y, mx.z ), cs > 0.0 ), select( -1.0, clBigTop( cb, mx.z ), cb > 0.0 ) ) - h0;
	textureStore( outTex, gid, vec4f( select( 1.0, 0.0, occ > 0.0 ), 0.0, 0.0, 1.0 ) );
}`),this.sdfXKernel=n(`Cloud SDF X`,[M],{src:{texture:this.sdfA},outTex:{storageTexture:this.sdfB}},`${r} {
	let ix = i32( gid.x ); let iy = i32( gid.y ); let iz = i32( gid.z );
	var d = ${F(25)};
	for ( var k = -24; k <= ${tt}; k++ ) {
		if ( textureLoad( src, vec3i( ( ix + k + ${$e} ) % ${$e}, iy, iz ), 0 ).x * 255.0 < 0.5 ) {
			d = min( d, f32( abs( k ) ) );
		}
	}
	textureStore( outTex, gid, vec4f( d / 255.0, 0.0, 0.0, 1.0 ) );
}`),this.sdfYKernel=n(`Cloud SDF Y`,[M],{src:{texture:this.sdfB},outTex:{storageTexture:this.sdfA}},`${r} {
	let ix = i32( gid.x ); let iy = i32( gid.y ); let iz = i32( gid.z );
	var d = ${F(25)};
	for ( var k = -24; k <= ${tt}; k++ ) {
		d = min( d, max( textureLoad( src, vec3i( ix, ( iy + k + ${$e} ) % ${$e}, iz ), 0 ).x * 255.0, f32( abs( k ) ) ) );
	}
	textureStore( outTex, gid, vec4f( d / 255.0, 0.0, 0.0, 1.0 ) );
}`),this.sdfZKernel=n(`Cloud SDF Z`,[M],{src:{texture:this.sdfA},outTex:{storageTexture:this.sdfTex}},`${r} {
	let ix = i32( gid.x ); let iy = i32( gid.y ); let iz = i32( gid.z );
	var d = ${F(25)};
	for ( var k = -15; k <= 15; k++ ) {
		let z = iz + k;
		if ( z >= 0 && z < ${et} ) {
			d = min( d, max( textureLoad( src, vec3i( ix, iy, z ), 0 ).x * 255.0, f32( abs( k ) ) ) );
		}
	}
	textureStore( outTex, gid, vec4f( d / 255.0, 0.0, 0.0, 1.0 ) );
}`),this._traceSets=[];for(let e=0;e<wt;e++)this._traceSet(e);let o=e=>`
// per pixel random offset (white noise: subsampled every 4 pixels, structured noise such as
// interleaved gradient noise would alias into a visible grid) for the golden ratio sequence
fn pixelHash( px: vec2f ) -> f32 {
	var p3 = fract( vec3f( px.x, px.y, px.x ) * vec3f( 0.1031, 0.1030, 0.0973 ) );
	p3 += dot( p3, p3.yzx + 33.33 );
	return fract( ( p3.x + p3.y ) * p3.z );
}
${r} {
	${e?`let px = gid.xy;`:`let px = gid.xy * vec2u( 8u, 4u ) + vec2u( cloudsParams.panoSlot );`}
	if ( px.x >= ${mt}u || px.y >= ${ht}u ) { return; }
	let uv = ( vec2f( px ) + 0.5 ) / vec2f( ${F(mt)}, ${F(ht)} );
	let az = uv.x * ${F(2*Ye)};
	let elev = uv.y * uv.y * ${F(94/180*Ye)} - ${F(4/180*Ye)};
	let rd = vec3f( cos( elev ) * cos( az ), sin( elev ), cos( elev ) * sin( az ) );
	let jitter = pixelHash( vec2f( px ) );
	let m = cloudsMarchPano( rd, jitter );
	// panorama texel: 2 pi / PANO_W across; the elevation mapping is similar near the horizon
	let hi = cloudsHigh( rd, ${F(2*Ye/mt)} );
	textureStore( outTex, px, clOver( vec4f( m.L, m.T ), hi ) );
}`;this.panoKernel=n(`Clouds Panorama`,[this.coreModule],{outTex:{storageTexture:this.panorama}},o(!1)),this.panoFullKernel=n(`Clouds Panorama (full)`,[this.coreModule],{outTex:{storageTexture:this.panorama}},o(!0)),this.shadowKernel=n(`Cloud Shadow`,[this.coreModule],{outTex:{storageTexture:this.shadowMap}},`${r} {
	let px = vec2u( gid.x, gid.y * 4u + u32( cloudsParams.shadowPhase ) );
	let uv = ( vec2f( px ) + 0.5 ) / ${F(bt)};
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
}`)}_traceSet(e){if(this._traceSets[e])return this._traceSets[e];let n=new c(`CloudsTrace`,{slot:[`vec2f`,new f],subPixel:[`vec2f`,new f],prevRight:[`vec3f`,new t],frameNoise:[`f32`,0],prevUp:[`vec3f`,new t],rebuildK:[`f32`,-1],prevFwd:[`vec3f`,new t],minAlpha:[`f32`,.12],prevTan:[`vec2f`,new f(1,1)],historyValid:[`f32`,0],pad:[`f32`,0],camDelta:[`vec3f`,new t],camDeltaHi:[`vec3f`,new t]},{label:`cloudsTrace`+e}),r=new h({name:`cloudsTrace`+e,deps:[this.coreModule],uniforms:n,uniformName:`cloudsTrace`,code:`
fn cloudsViewDir( uv: vec2f ) -> vec3f {
	let ndc = vec2f( uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0 ) * cloudsParams.camTan;
	return normalize( cloudsParams.camFwd + cloudsParams.camRight * ndc.x + cloudsParams.camUp * ndc.y );
}
// interleaved gradient noise (Jimenez 2014)
fn cloudsIGN( px: vec2f ) -> f32 { return fract( fract( dot( px, vec2f( 0.06711056, 0.00583715 ) ) ) * 52.9829189 ); }
fn cloudsTracedPixel( tp: vec2u ) -> vec2f { return vec2f( tp * 4u + vec2u( cloudsTrace.slot ) ) + 0.5 + cloudsTrace.subPixel; }
fn cloudsOutside( tp: vec2u ) -> bool { return tp.x >= u32( cloudsParams.traceSize.x ) || tp.y >= u32( cloudsParams.traceSize.y ); }
`}),i=(e,t,n)=>new C({label:e,modules:[r],bindings:t,code:n,workgroupSize:[8,8,1]}),a=`@compute @workgroup_size( WG_X, WG_Y, WG_Z ) fn main( @builtin( global_invocation_id ) gid: vec3u )`,o=i(`Clouds Trace`,{traceOut:{storageTexture:this.traceTex},depthOut:{storageTexture:this.traceDepth}},`${a} {
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
}`),l=i(`Clouds Box`,{traceTex:{texture:this.traceTex},highTrace:{texture:this.highTrace},minOut:{storageTexture:this.boxMin},maxOut:{storageTexture:this.boxMax}},`${a} {
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
${Ot(`historyCatmullRom`,`srcHistory`)}
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
}`),d={block:n,trace:o,high:s,box:l,resolve:[u(this.history[1],this.history[0]),u(this.history[0],this.history[1])]};return this._traceSets[e]=d,d}_resize(e,t){this._w=e,this._h=t,this._scale=this.resolutionScale;let n=Math.max(4,Math.round(e*this._scale*Tt)),r=Math.max(4,Math.round(t*this._scale*Tt));this.displayH.value=Math.max(4,t*this._scale);let i=Math.ceil(n/4),a=Math.ceil(r/4);this.viewSize.value.set(n,r),this.traceSize.value.set(i,a);for(let e of[this.traceTex,this.traceDepth,this.highTrace,this.boxMin,this.boxMax,this.motionTex])e.resize(i,a);this.history[0].resize(n,r),this.history[1].resize(n,r),this.viewValid.value=0,this.resetHistory()}_drawingBufferSize(){if(this.outputSize)return this.outputSize;let e=this.renderer;return e&&e.getDrawingBufferSize?e.getDrawingBufferSize(this._size||=new f):e&&e.width&&e.height?{x:e.width,y:e.height}:A.canvas?{x:A.canvas.width,y:A.canvas.height}:v.fields.outputResolution.value}update(e,t){if(m.atmosphereQuality.value<=0)return;this._traceIndex=0;let n=this.wind.value,r=Math.cos(this._rot),i=Math.sin(this._rot),a=this.offset.value;a.addScaledVector(n,e),a.set((a.x%Ze+Ze)%Ze,(a.y%Ze+Ze)%Ze);let o=this._offsetW;o.x+=(n.x*r+n.y*i)*e,o.y+=(n.y*r-n.x*i)*e,o.set((o.x%Ze+Ze)%Ze,(o.y%Ze+Ze)%Ze);let s=this._offsetH;s.addScaledVector(n,e*1.6),s.set((s.x%Ze+Ze)%Ze,(s.y%Ze+Ze)%Ze),t.updateMatrixWorld();let c=t.position;this.camY.value=d.clamp(c.y,1,this.bottom.value-50),n.lengthSq()>1e-6&&this.windN.value.copy(n).normalize(),this.horizonY.value=-Math.sqrt(2*this.camY.value/Xe),this.nOrigin.value.set(c.x-a.x,c.z-a.y),this.wOrigin.value.set(c.x*r+c.z*i-o.x,c.z*r-c.x*i-o.y);let l=this.coverage.value;(l>this.sdfCoverage.value||l<this.sdfCoverage.value-.1)&&(this.sdfCoverage.value=Math.min(l+.04,1),this._buildSDF());let u=this._drawingBufferSize();(u.x!==this._w||u.y!==this._h||this.resolutionScale!==this._scale)&&this._resize(u.x,u.y);let f=t.matrixWorld.elements,p=Math.tan(d.degToRad(t.fov*.5))/(t.zoom||1),h=this.cam,g=this.prev;g.right.value.copy(h.right.value),g.up.value.copy(h.up.value),g.fwd.value.copy(h.fwd.value),g.tan.value.copy(h.tan.value),h.right.value.set(f[0],f[1],f[2]).normalize(),h.up.value.set(f[4],f[5],f[6]).normalize(),h.fwd.value.set(-f[8],-f[9],-f[10]).normalize(),h.tan.value.set(p*t.aspect,p);let _=this._hasPrev?c.distanceTo(this._prevCam):1/0,v=h.fwd.value.angleTo(g.fwd.value);this._turned=v;let y=m.sunDir.value;(_>8||v>.5||y.angleTo(this._prevSun)>.05||Math.abs(h.tan.value.y-g.tan.value.y)>.001*h.tan.value.y)&&this.resetHistory(),this._prevSun.copy(y),this.camDelta.value.set(c.x-this._prevCam.x-n.x*e,c.y-this._prevCam.y,c.z-this._prevCam.z-n.y*e),this.camDeltaHi.value.set(c.x-this._prevCam.x-n.x*e*1.6,c.y-this._prevCam.y,c.z-this._prevCam.z-n.y*e*1.6),this._prevCam.copy(c),this._hasPrev=!0,this.shadowPhase.value=this.frame%4,this.frame%4==0&&this.shadowCenter.value.set(c.x,c.z),this.camXZ.value.set(c.x,c.z),this.hOffset.value.copy(s),this.panoWarm>0&&(this.panoFullKernel.dispatch([mt/8,ht/8,1]),this.panoWarm=0),this._panoSlot(this.frame);let b=()=>{this.shadowKernel.dispatch([bt/8,bt/32,1]),this.panoKernel.dispatch([mt/64,ht/32,1])};if(m.cameraUnderwater.value>.5)b(),this.resetHistory();else if(this._rebuild<16){for(let e=0;e<wt&&this._rebuild<16;e++)e>0&&this._holdCamera(),this.rebuildK.value=this._rebuild,this._trace(Ct[this._rebuild++]);b()}else{let e=1+Math.floor(this._since++/16);this.minAlpha.value=Math.max(.12,1/(e+1)),this.rebuildK.value=-1,this._trace(Ct[this.frame%16]),b(),this._turned>.003&&(this._holdCamera(),this._trace(Ct[(this.frame+8)%16]))}this.frame++}_trace(e){this.slot.value.set(e%4,Math.floor(e/4));let t=Math.floor(this._traces/16)+1;this.subPixel.value.set((.5+t*.7548776662)%1-.5,(.5+t*.569840291)%1-.5).multiplyScalar(.25),this.frameNoise.value=t*.6180339887%1,this._traces++;let n=this._traceSet(this._traceIndex++),r=n.block.fields,i=this.prev;r.slot.value.copy(this.slot.value),r.subPixel.value.copy(this.subPixel.value),r.frameNoise.value=this.frameNoise.value,r.rebuildK.value=this.rebuildK.value,r.minAlpha.value=this.minAlpha.value,r.historyValid.value=this.historyValid.value,r.prevRight.value.copy(i.right.value),r.prevUp.value.copy(i.up.value),r.prevFwd.value.copy(i.fwd.value),r.prevTan.value.copy(i.tan.value),r.camDelta.value.copy(this.camDelta.value),r.camDeltaHi.value.copy(this.camDeltaHi.value);let a=[Math.ceil(this.traceSize.value.x/8),Math.ceil(this.traceSize.value.y/8),1];n.trace.dispatch(a),n.high.dispatch(a),n.box.dispatch(a),n.resolve[this._pp].dispatch([Math.ceil(this.viewSize.value.x/8),Math.ceil(this.viewSize.value.y/8),1]),this.viewTex=this.history[this._pp],this._pp=1-this._pp,this.historyValid.value=1;let o=this.cam,s=this.viewCam;s.right.value.copy(o.right.value),s.up.value.copy(o.up.value),s.fwd.value.copy(o.fwd.value),s.tan.value.copy(o.tan.value),this.viewValid.value=1}_holdCamera(){let e=this.cam,t=this.prev;t.right.value.copy(e.right.value),t.up.value.copy(e.up.value),t.fwd.value.copy(e.fwd.value),t.tan.value.copy(e.tan.value),this.camDelta.value.set(0,0,0),this.camDeltaHi.value.set(0,0,0)}resetHistory(){this._rebuild=0,this._since=0,this.historyValid.value=0}_panoSlot(e){let t=Ct[e%16];this.panoSlot.value.set(t%4*2+Math.floor(e/16)%2,Math.floor(t/4))}_buildSDF(){let e=[$e/8,$e/8,et];for(let t of[this.sdfOccKernel,this.sdfXKernel,this.sdfYKernel,this.sdfZKernel])t.dispatch(e)}invalidate(){this.panoWarm=1,this.resetHistory()}};function At(e,t){let n=`min( exp2( b ) * ${F(t.ds0)}, ${F(t.dsMax)} )`,r=``,i=0;for(let e=0;e<t.lightSteps.length;e++){let n=t.lightSteps[e],a=n-i;i=n,r+=`\t\t\t\t{\n\t\t\t\t\tlet lp = cloudsSheared( pr + sunDir * ( lj * ${F(n-a*.5)} ) );\n`,e<t.lightDetail?r+=`\t\t\t\t\tlet lb = cloudsBase( lp, w );
					if ( T > 0.5 ) {
						// filtered at the size of the light segment
						od += cloudsErode( lp, lb, max( foot, ${F(a*.35)} ) ).x * ${F(a)};
					} else {
						od += clMeanDensity( lb ) * ${F(a)};
					}\n`:r+=`\t\t\t\t\tlet lb = cloudsBase( lp, cloudsWeather( lp.xz ) );\n\t\t\t\t\tod += clMeanDensity( lb ) * ${F(a)};\n`,r+=`				}
`}return`
fn cloudsBandStep${e}( b: f32 ) -> f32 { return ( ${n} ) / ${e===`Pano`?`max( frame.atmosphereQuality, 0.05 )`:`1.0`}; }
fn cloudsSnapCoarse${e}( t: f32, up: bool, jitter: f32, k0: f32 ) -> f32 {
	let b = cloudsBand( t ); let s0 = cloudsBandStart( b ); let ds = cloudsBandStep${e}( b );
	let i = ( t - s0 ) / ds - jitter;
	let m = select( floor( i + 1e-3 ), ceil( i - 1e-3 ), up );
	let mc = select( m - cloudsPosMod( m - k0, ${F(t.coarse)} ), m + cloudsPosMod( k0 - m, ${F(t.coarse)} ), up );
	return s0 + ( mc + jitter ) * ds;
}
fn cloudsMarch${e}( rd: vec3f, jitter: f32 ) -> CloudsMarch {
	let camY = cloudsParams.camY;
	let light = cloudsKeyLight( ( cloudsParams.bottom + cloudsParams.top ) * 0.0005 );
	let sunDir = light.dir;
	let pxAngle = ${t.pxAngle};
	let t0 = max( cloudsShell( camY, rd, cloudsParams.bottom ), 0.0 );
	let t1 = min( cloudsShell( camY, rd, cloudsParams.top ), ${F(t.maxDist)} );
	var L = vec3f( 0.0 );
	var T = 1.0;
	var opac = 0.0;
	var tAcc = 0.0;
	var wAcc = 0.0;
	let k0 = floor( fract( jitter * 7.31 + 0.37 ) * ${F(t.coarse)} ); // coarse phase

	let cosT = dot( rd, sunDir );
	// multiple scattering octaves (Hillaire 2016): scattering a^i, extinction b^i, eccentricity c^i
	// (sky-pro-webgpu) normalized droplet phase: 80% forward / 20% back; each order halves the asymmetry
	let phase = vec3f( clPhaseHG( cosT, 0.8 ), clPhaseHG( cosT, 0.4 ), clPhaseHG( cosT, 0.2 ) ) * 0.8
		+ vec3f( clPhaseHG( cosT, -0.2 ), clPhaseHG( cosT, -0.1 ), clPhaseHG( cosT, -0.05 ) ) * 0.2;
	let ph3 = ${F(.15/(4*Ye))}; // light diffused through the whole cloud (keeps thick bodies from going black)
	let sunE = light.E;
	let amb = frame.skyIrradiance * ${F(t.ambient)};
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
				if ( jump > ds * ${F(t.coarse)} ) {
					// far from any cloud: jump, landing on the coarse lattice (at least one stride on)
					t = max( cloudsSnapCoarse${e}( t + jump, false, jitter, k0 ), t + ds * ${F(t.coarse)} );
					bd = cloudsBand( t );
				} else {
					let b = cloudsBase( p, cloudsWeather( p.xz ) );
					// switch to fine steps a little before the surface so thin wisps aren't skipped
					if ( b.x > -0.08 ) {
						t -= ds * ${F(t.coarse-1)};
						fineSteps = 5;
					} else {
						t += ds * ${F(t.coarse)};
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
${t.detail?`\t\t\t\t\tif ( foot < ${F(dt*.24)} ) { er = cloudsErode( p, b, foot ); }`:``}
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
						let alt = pr.y + dot( pr.xz, pr.xz ) / ${F(2*Xe)};
						let S = sunE * ( sun * powder * baseShadow * ( er.y * 0.5 + 0.5 ) * cloudsEarthShadow( light, alt, pr.xz ) ) + amb * ambH
							+ bounce * ( 1.0 - up );
						let Tstep = exp( - sig * ds );
						let tap = exp( t * ${F(-1/xt)} );
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
`}var jt=e=>{let t=Number(e).toString();return/[.eE]/.test(t)?t:t+`.0`},Mt=Math.PI/180,Nt={atmosphere:{multipleScattering:.99},shape:{altitude:4e3,thickness:5200,density:.019,coverage:.49,horizonCoverageStart:2e4,horizonCoverageRamp:45e3,horizonCoverageAmount:.12,edgeSoftness:.095,edgeSoftnessFalloff:1,weatherScale:29e3,baseScale:7500,baseStrength:.69,erosionScaleBaseMultiplier:.13,erosionStrengthBase:.24,erosionStrengthPeak:2.15,erosionShape:1,baseWeatherStrength:.54,baseWeatherHeightStart:0,baseWeatherHeightEnd:.13},lighting:{scatteringAlbedo:1,powderStrength:.7,ambientIntensity:.7,groundBounceAlbedo:[.009134058699157796,.015208514418949472,.018500220124016652],baseShadowStrength:.88,baseShadowHeight:.13,moonGain:.65},wind:{speed:12,evolutionSpeed:60.8*12/89,skew:1750},fade:{hazeDensityScale:.62,horizonMeltStart:25e3,horizonMeltEnd:45e3},weather:{resolution:1024,mainMass:[4,5,0,1.32],detail:[6,6,1,.13],coverage:.26}},Pt={historyDivisor:2,lattice:4,maxSteps:256,lightTaps:6,stepMeters:25,fullLightingAlpha:.5,lightReuseSteps:3,historyWeight:.9},Ft=512,It=160,Lt=4,Rt=256,zt=3e4,Bt=()=>[0,0,0,0],Vt=`
const SC_EARTH: f32 = 6371.0;
const SC_FAR: f32 = 250000.0;
const SC_AP_DIST: f32 = ${jt(zt)};

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
`,Ht=`
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
`,Ut=`
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
`,Wt=class{constructor(e,n){this.renderer=e,this.atmosphere=n;let r=Nt,i=r.shape,a=r.lighting;this.frameBlock=new c(`SkyCloudFrame`,{position:[`vec4f`,Bt()],right:[`vec4f`,Bt()],up:[`vec4f`,Bt()],forward:[`vec4f`,Bt()],previousPosition:[`vec4f`,Bt()],previousRight:[`vec4f`,Bt()],previousUp:[`vec4f`,Bt()],previousForward:[`vec4f`,Bt()],viewport:[`vec4f`,Bt()],sampling:[`vec4f`,Bt()],clock:[`vec4f`,Bt()],wind:[`vec4f`,Bt()],windDelta:[`vec4f`,Bt()],march:[`vec4f`,Bt()],temporal:[`vec4f`,Bt()],display:[`vec4f`,Bt()],pano:[`vec4f`,Bt()],shadow:[`vec4f`,Bt()],lightOffsets:[`vec4f[8]`,new Float32Array(32)],lightLods:[`vec4f[8]`,new Float32Array(32)]},{label:`sky clouds frame`}),this.settingsBlock=new c(`SkyCloudSettings`,{shell:[`vec4f`,[i.altitude,i.thickness,i.density,i.coverage]],shape:[`vec4f`,[i.weatherScale,i.baseScale,i.baseStrength,i.erosionScaleBaseMultiplier]],erosion:[`vec4f`,[i.erosionStrengthBase,i.erosionStrengthPeak,i.erosionShape,i.baseWeatherHeightEnd]],base:[`vec4f`,[i.baseWeatherStrength,i.edgeSoftness,Math.log2(Math.max(i.edgeSoftnessFalloff,.001))*i.thickness*.001,i.baseWeatherHeightStart]],horizon:[`vec4f`,[i.horizonCoverageStart,i.horizonCoverageRamp,i.horizonCoverageAmount,0]],cloudLight:[`vec4f`,[a.scatteringAlbedo,a.powderStrength,a.ambientIntensity,r.atmosphere.multipleScattering]],shadow:[`vec4f`,[a.baseShadowStrength,a.baseShadowHeight,a.moonGain,0]],bounce:[`vec4f`,[...a.groundBounceAlbedo,0]],wind:[`vec4f`,[0,1,r.wind.skew,0]],fade:[`vec4f`,[r.fade.hazeDensityScale,r.fade.horizonMeltStart,r.fade.horizonMeltEnd,0]],weatherMass:[`vec4f`,r.weather.mainMass.slice()],weatherDetail:[`vec4f`,r.weather.detail.slice()],weather:[`vec4f`,[r.weather.coverage,0,0,0]]},{label:`sky clouds settings`}),this.F=this.frameBlock.fields,this.S=this.settingsBlock.fields,this.coverage={value:i.coverage},this.resolutionScale=1,this.outputSize=null,this.noise=new j({label:`cloud shape noise 64³`,width:64,height:64,depth:64,dimension:`3d`,format:`rgba8unorm`,usage:[`sample`,`copyDst`]}),this.blue=new j({label:`cloud blue noise`,width:64,height:64,format:`r8unorm`,usage:[`sample`,`copyDst`]});let o=r.weather.resolution;this.weatherMap=new j({label:`cloud weather`,width:o,height:o,format:`rgba8unorm`,usage:[`sample`,`storage`]}),this.weatherBounds=new j({label:`cloud weather bounds`,width:64,height:64,format:`rgba8unorm`,usage:[`sample`,`storage`]});let s=(e,t=4,n=4,r=`rgba16float`)=>new j({label:e,width:t,height:n,format:r,usage:[`sample`,`storage`]});this.source=s(`cloud radiance`),this.sourceMeta=s(`cloud depth + cost`),this.colors=[s(`cloud history A`),s(`cloud history B`)],this.metas=[s(`cloud history meta A`),s(`cloud history meta B`)],this.panorama=s(`cloud panorama`,Ft,It),this.shadowMap=s(`cloud shadow`,Rt,Rt,`r32float`),this._pp=0,this.viewTex=this.colors[0],this.ready=this._loadNoise(),this._buildModules(),this._buildKernels(),this._w=0,this._h=0,this._scale=1,this.sourceWidth=1,this.sourceHeight=1,this.historyWidth=1,this.historyHeight=1,this.frameIndex=0,this.historyValid=!1,this.weatherDirty=!0,this.panoWarm=!0,this._windX=0,this._windZ=0,this._evolution=0,this._elapsed=0,this._prevCam=null,this._prevLight=new t,this._lastCoverage=-1}async _loadNoise(){let e=async e=>{let t=await fetch(`./clouds/`+e);if(!t.ok)throw Error(`clouds: ${e} HTTP ${t.status}`);return t},[t,n]=await Promise.all([e(`baseShape64.bin`),e(`blueNoise.bin`)]),r=new Uint8Array(await new Response(t.body.pipeThrough(new DecompressionStream(`gzip`))).arrayBuffer()),i=new DataView(r.buffer,r.byteOffset,r.byteLength);if(i.getUint32(0,!0)!==828004942)throw Error(`clouds: bad noise blob`);let a=[i.getUint16(6,!0),i.getUint16(8,!0),i.getUint16(10,!0)],o=i.getUint8(12),s=this.noise;s.gpu=A.device.createTexture({label:s.label,dimension:`3d`,size:a,mipLevelCount:o,format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),s.mipsOption=o,s._views.clear(),s.version++;let c=16;for(let e=0;e<o;e++){let t=a.map(t=>Math.max(1,t>>e)),n=t[0]*t[1]*t[2]*4;A.queue.writeTexture({texture:s.gpu,mipLevel:e},r,{offset:c,bytesPerRow:t[0]*4,rowsPerImage:t[1]},t),c+=n}this.blue.upload(new Uint8Array(await n.arrayBuffer()))}_buildModules(){let e=this.atmosphere;this.uniformModule=new h({name:`skyCloudsUniforms`,deps:[M],bindings:{scf:{uniform:this.frameBlock},scs:{uniform:this.settingsBlock}}}),this.coreModule=new h({name:`skyCloudsCore`,deps:[this.uniformModule],bindings:{scNoise:{texture:this.noise},scWeatherMap:{texture:this.weatherMap}},code:Vt}),this.marchModule=new h({name:`skyCloudsMarch`,deps:[this.coreModule,e.module,e.transmittanceModule],bindings:{scWeatherBounds:{texture:this.weatherBounds}},code:Ht}),this.params=new c(`CloudsParams`,{viewRight:[`vec3f`,new t(1,0,0)],viewUp:[`vec3f`,new t(0,1,0)],viewFwd:[`vec3f`,new t(0,0,-1)],viewTan:[`vec2f`,new f(1,1)],viewValid:[`f32`,0],shadowCenter:[`vec2f`,new f],shadowSize:[`f32`,12e3],shadowStrength:[`f32`,.85]},{label:`clouds`});let n=this.params.fields;this.viewCam={right:n.viewRight,up:n.viewUp,fwd:n.viewFwd,tan:n.viewTan},this.viewValid=n.viewValid,this.shadowCenter=n.shadowCenter,this.shadowSize=n.shadowSize,this.shadowStrength=n.shadowStrength,this.shadowModule=new h({name:`cloudsShadow`,deps:[M],uniforms:this.params,uniformName:`cloudsParams`,bindings:{cloudsShadowMap:{texture:this.shadowMap}},code:`
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
	let st = uv * ${jt(Rt)} - 0.5;
	let i0 = vec2i( floor( st ) );
	let fr = fract( st );
	let s = mix( mix( cloudsShadowTap( i0 ), cloudsShadowTap( i0 + vec2i( 1, 0 ) ), fr.x ), mix( cloudsShadowTap( i0 + vec2i( 0, 1 ) ), cloudsShadowTap( i0 + vec2i( 1, 1 ) ), fr.x ), fr.y );
	let e = abs( uv - 0.5 );
	let inside = smoothstep( 0.5, 0.42, max( e.x, e.y ) );
	return mix( 1.0, s, cloudsParams.shadowStrength * inside );
}
`}),this.module=new h({name:`clouds`,deps:[M,this.shadowModule],uniforms:this.params,uniformName:`cloudsParams`,bindings:{cloudsPanorama:{texture:this.panorama},cloudsView:{texture:()=>this.viewTex}},code:`
// vec4( rgb in-scattered radiance, a transmittance ) for a view direction (panorama)
fn cloudsSample( dir: vec3f ) -> vec4f {
	if ( frame.atmosphereQuality <= 0.0 ) { return vec4f( 0.0, 0.0, 0.0, 1.0 ); }
	let az = atan2( dir.z, dir.x );
	let u = fract( az / ${jt(2*Math.PI)} );
	let elev = - acos( clamp( dir.y, -1.0, 1.0 ) ) + ${jt(Math.PI/2)};
	let t = clamp( ( elev + ${jt(4*Mt)} ) / ${jt(94*Mt)}, 0.0, 1.0 );
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
`})}_buildKernels(){let e=`@compute @workgroup_size( WG_X, WG_Y, WG_Z ) fn main( @builtin( global_invocation_id ) id: vec3u )`,t=(e,t,n,r)=>new C({label:e,modules:t,bindings:n,code:r,workgroupSize:[8,8,1]});this.weatherKernel=t(`Cloud Weather`,[this.uniformModule],{scOut:{storageTexture:this.weatherMap}},Ut+`
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
}`);let n=()=>this.colors[this._pp],r=()=>this.metas[this._pp],i=()=>this.colors[1-this._pp],a=()=>this.metas[1-this._pp];this.temporalKernel=new C({label:`Clouds Resolve`,modules:[this.coreModule],workgroupSize:[8,8,1],bindings:{scCurrentColor:{texture:this.source},scCurrentMeta:{texture:this.sourceMeta},scPreviousColor:{texture:i},scPreviousMeta:{texture:a},scOutputColor:{storageTexture:n},scOutputMeta:{storageTexture:r}},code:`
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
	let elev = uv.y * uv.y * ${jt(94*Mt)} - ${jt(4*Mt)};
	let az = uv.x * ${jt(2*Math.PI)};
	let dir = vec3f( cos( elev ) * cos( az ), sin( elev ), cos( elev ) * sin( az ) );
	let cone = ${jt(2*Math.PI/Ft)} / max( frame.atmosphereQuality, 0.05 );
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
}`)}_drawingBufferSize(){if(this.outputSize)return this.outputSize;let e=v.fields.outputResolution.value;if(e&&e.x>0)return e;let t=A.canvas;return{x:t?t.width:1280,y:t?t.height:720}}_allocate(e,t){let n=Pt,r=this.resolutionScale;this.sourceWidth=Math.max(1,Math.ceil(e*r/n.historyDivisor/n.lattice)),this.sourceHeight=Math.max(1,Math.ceil(t*r/n.historyDivisor/n.lattice)),this.historyWidth=this.sourceWidth*n.lattice,this.historyHeight=this.sourceHeight*n.lattice,this.source.resize(this.sourceWidth,this.sourceHeight),this.sourceMeta.resize(this.sourceWidth,this.sourceHeight);for(let e of[...this.colors,...this.metas])e.resize(this.historyWidth,this.historyHeight);this.historyValid=!1}update(e,t){if(m.atmosphereQuality.value<=0)return;let n=Pt,r=Nt,i=this.F,a=this.S;e=Math.min(.1,Math.max(0,e));let o=this._drawingBufferSize();(o.x!==this._w||o.y!==this._h||this.resolutionScale!==this._scale)&&(this._w=o.x,this._h=o.y,this._scale=this.resolutionScale,this._allocate(o.x,o.y));let s=this.coverage.value;s!==this._lastCoverage&&(a.shell.value[3]=s,this._lastCoverage=s,this.historyValid=!1,this.panoWarm=!0);let c=m.windDir.value,l=Math.hypot(c.x,c.y)||1,u=c.x/l,f=c.y/l;if(a.wind.value[0]=u,a.wind.value[1]=f,this.weatherDirty){let e=this.weatherMap.width;this.weatherKernel.dispatch([e/8,e/8,1]),this.boundsKernel.dispatch([8,8,1]),this.weatherDirty=!1}t.updateMatrixWorld();let p=t.matrixWorld.elements,h=t.position,g=Math.tan(d.degToRad(t.fov*.5))/(t.zoom||1),_=t.aspect,v=[p[0],p[1],p[2]],y=[p[4],p[5],p[6]],b=[-p[8],-p[9],-p[10]],x=e=>{let t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]},S=x(v),C=x(y),w=x(b),T={position:[h.x,h.y,h.z,g],right:[...S,_],up:[...C,0],forward:[...w,0]},E=this._prevCam;(!E||Math.hypot(h.x-E.position[0],h.y-E.position[1],h.z-E.position[2])>1e3||w[0]*E.forward[0]+w[1]*E.forward[1]+w[2]*E.forward[2]<.7||Math.abs(g-E.position[3])>.01)&&(this.historyValid=!1);let D=m.sunDir.value;D.dot(this._prevLight)<.999&&(this.historyValid=!1,this.panoWarm=!0),this._prevLight.copy(D);let O=this.historyValid&&E?E:T;i.position.value=T.position,i.right.value=T.right,i.up.value=T.up,i.forward.value=T.forward,i.previousPosition.value=O.position,i.previousRight.value=O.right,i.previousUp.value=O.up,i.previousForward.value=O.forward,this._prevCam=T;let k=n.lattice,ee=this.frameIndex%(k*k),te=0,ne=0;for(let e=0;1<<e<k;e++){let t=ee>>e*2&3;te|=(t>>1^t&1)<<Math.log2(k)-e-1,ne|=(t&1)<<Math.log2(k)-e-1}i.viewport.value=[o.x*this.resolutionScale,o.y*this.resolutionScale,this.historyWidth,this.historyHeight],i.sampling.value=[te,ne,k,+!!this.historyValid],this._elapsed+=e;let A=r.wind.speed,re=u*A*e,j=f*A*e;this._windX+=re,this._windZ+=j,this._evolution+=r.wind.evolutionSpeed*e,i.clock.value=[this.frameIndex%4096,this._elapsed,e,0],i.wind.value=[this._windX,this._windZ,this._evolution,0],i.windDelta.value=[re,j,0,0],i.march.value=[n.stepMeters,n.maxSteps,n.lightTaps,n.fullLightingAlpha],i.temporal.value=[n.historyWeight,Math.min(1,r.wind.evolutionSpeed*e/100),0,0],i.display.value=[0,n.lightReuseSteps,0,0];let ie=D.x,ae=D.y,oe=D.z,se=oe,ce=0,le=-ie;Math.abs(ae)>.99&&(se=0,ce=-oe,le=ae);let ue=1/Math.hypot(se,ce,le);se*=ue,ce*=ue,le*=ue;let de=ae*le-oe*ce,fe=oe*se-ie*le,pe=ie*ce-ae*se,me=i.lightOffsets.value,he=i.lightLods.value;me[0]=0,me[1]=0,me[2]=0,me[3]=25;let ge=r.shape;for(let e=1;e<8;e++){let t=1.7**e,r=25*((t-1)/.7+t*.5),i=e*2.399963,a=Math.sqrt((e+.5)/n.lightTaps),o=Math.cos(i)*a*.05*r,s=Math.sin(i)*a*.05*r,c=e*4;me[c]=ie*r+se*o+de*s,me[c+1]=ae*r+ce*o+fe*s,me[c+2]=oe*r+le*o+pe*s,me[c+3]=25*t;let l=r*.1;he[c]=Math.max(0,Math.log2(l*64/ge.baseScale)),he[c+1]=Math.max(0,Math.log2(l*64/(ge.baseScale*ge.erosionScaleBaseMultiplier)))}let _e=this.frameIndex%4;if(_e===0||!this._shadowInit){let e=this.shadowSize.value/Rt*4;this.shadowCenter.value.set(Math.round(h.x/e)*e,Math.round(h.z/e)*e)}i.shadow.value=[this.shadowCenter.value.x,this.shadowCenter.value.y,this.shadowSize.value,_e];let ve=m.cameraUnderwater&&m.cameraUnderwater.value>.5;if(this._shadowInit?this.shadowKernel.dispatch([Rt/8,Rt/32,1]):(i.shadow.value=[this.shadowCenter.value.x,this.shadowCenter.value.y,this.shadowSize.value,-1],this.shadowKernel.dispatch([Rt/8,Rt/8,1]),this._shadowInit=!0),this.panoWarm)i.pano.value=[0,0,1,0],this.panoKernel.dispatch([Ft/8,It/8,1]),this.panoWarm=!1;else{let e=this.frameIndex%16;i.pano.value=[e%Lt,Math.floor(e/Lt),Lt,0],this.panoKernel.dispatch([Math.ceil(Ft/Lt/8),Math.ceil(It/Lt/8),1])}if(ve)this.viewValid.value=0,this.historyValid=!1;else{this.traceKernel.dispatch([Math.ceil(this.sourceWidth/8),Math.ceil(this.sourceHeight/8),1]),this.temporalKernel.dispatch([Math.ceil(this.historyWidth/8),Math.ceil(this.historyHeight/8),1]),this.viewTex=this.colors[this._pp],this._pp=1-this._pp;let e=this.viewCam;e.right.value.set(S[0],S[1],S[2]),e.up.value.set(C[0],C[1],C[2]),e.fwd.value.set(w[0],w[1],w[2]),e.tan.value.set(g*_,g),this.viewValid.value=1,this.historyValid=!0}this.frameIndex++}resetHistory(){this.historyValid=!1}invalidate(){this.panoWarm=!0,this.resetHistory()}},Gt=[4,8,13,19,27,38,52,72,100],Kt=8;function qt(e){let t=performance.now(),{res:n,heights:r,rock:i,texel:a,origin:o}=e,s=n/4,c=a*4,l=new Float32Array(s*s);for(let e=0;e<s;e++)for(let t=0;t<s;t++){let i=0;for(let a=0;a<4;a++){let o=(e*4+a)*n+t*4;for(let e=0;e<4;e++)i+=r[o+e]}l[e*s+t]=i/16}let u=new Float32Array(s*s).fill(1),d=[];for(let e=0;e<Kt;e++){let t=(e+.5)/Kt*Math.PI*2;d.push([Math.cos(t),Math.sin(t)])}for(let e=1;e<s-1;e++)for(let t=1;t<s-1;t++){let n=l[e*s+t];if(n<-25)continue;let r=0;for(let i=0;i<Kt;i++){let[a,o]=d[i],u=0;for(let r=0;r<Gt.length;r++){let i=Gt[r],d=Math.round(t+a*i/c),f=Math.round(e+o*i/c);if(d<0||f<0||d>=s||f>=s)break;let p=(l[f*s+d]-n-.3)/i;p>u&&(u=p)}r+=1/(1+u*u)}u[e*s+t]=r/Kt}let f=performance.now(),p=new Uint8Array(n*n*4),m=new Uint8Array(n*n*4),h=e.sand,g=e.path,_=e.gully,v=e.seagrass,y=e.rubble,b=e.scarp,x=1/(2*a);for(let e=0;e<n;e++){let t=e>0?e-1:0,a=e<n-1?e+1:n-1,o=e>1?e-2:0,c=e<n-2?e+2:n-1,l=(e+.5)/4-.5;l=l<0?0:l>s-1.001?s-1.001:l;let d=l|0,f=l-d;for(let l=0;l<n;l++){let S=e*n+l,C=l>0?l-1:0,w=l<n-1?l+1:n-1,T=(r[e*n+w]-r[e*n+C])*x,E=(r[a*n+l]-r[t*n+l])*x,D=1/Math.sqrt(T*T+1+E*E),O=-T*D,k=-E*D,ee=l>1?l-2:0,te=l<n-2?l+2:n-1,ne=r[S],A=.5+(r[e*n+ee]+r[e*n+te]+r[o*n+l]+r[c*n+l]-4*ne)*.25*.9;A=A<0?0:A>1?1:A;let re=(l+.5)/4-.5;re=re<0?0:re>s-1.001?s-1.001:re;let j=re|0,ie=re-j,ae=d*s+j,oe=((u[ae]*(1-ie)+u[ae+1]*ie)*(1-f)+(u[ae+s]*(1-ie)+u[ae+s+1]*ie)*f)*(1-Math.max(0,A-.5)*.7);oe=oe<0?0:oe;let se=S*4;p[se]=(O*.5+.5)*255+.5,p[se+1]=(k*.5+.5)*255+.5,p[se+2]=i[S]*255+.5,p[se+3]=oe*255+.5,m[se]=h[S],m[se+1]=g[S],m[se+2]=v?Math.max(_[S],v[S]):_[S],m[se+3]=Math.max(y?y[S]:0,b?b[S]:0)}}if(e.pads)for(let t of e.pads){let e=t.radius+3.5,r=Math.max(0,Math.floor((t.x-e-o)/a)),i=Math.min(n-1,Math.ceil((t.x+e-o)/a)),s=Math.max(0,Math.floor((t.z-e-o)/a)),c=Math.min(n-1,Math.ceil((t.z+e-o)/a));for(let e=s;e<=c;e++)for(let s=r;s<=i;s++){let r=o+(s+.5)*a,i=o+(e+.5)*a,c=Math.hypot(r-t.x,i-t.z),l=Math.atan2(i-t.z,r-t.x),u=1.2+1.8*(.5+.5*Math.sin(l*3+t.x)*Math.sin(l*5-t.z)),d=c<t.radius?1:Math.max(0,1-(c-t.radius)/u),f=(e*n+s)*4+1,p=Math.round(d*d*150);p>m[f]&&(m[f]=p)}}return{normal:p,splat:m,ms:{ao:f-t,maps:performance.now()-f}}}function Jt(e,t=4){let{res:n,heights:r}=e,i=n/t,a=new Float32Array(i*i),o=-1/0,s=1/(t*t);for(let e=0;e<i;e++)for(let c=0;c<i;c++){let l=0;for(let i=0;i<t;i++){let a=(e*t+i)*n+c*t;for(let e=0;e<t;e++)l+=r[a+e]}let u=l*s;a[e*i+c]=u,u>o&&(o=u)}let c=e=>{let t=new Uint16Array(e.length);for(let n=0;n<e.length;n++)t[n]=g.toHalfFloat(e[n]);return t},l=[{data:c(a),width:i,height:i}],u=i;for(;u>1;){let e=u>>1,t=new Float32Array(e*e);for(let n=0;n<e;n++)for(let r=0;r<e;r++){let i=2*n*u+2*r;t[n*e+r]=Math.max(a[i],a[i+1],a[i+u],a[i+u+1])}l.push({data:c(t),width:e,height:e}),a=t,u=e}return{levels:l,texel:e.texel*t,maxHeight:o}}var Yt=512,Xt=24,Zt=6,Qt=1.22,$t=24;function en(e,t,n,r,i,a=!1){let o=new j({label:i,width:t,height:n,format:r,mips:a,usage:[`sample`,`copyDst`],data:e});return o.getGPU(),a===!0&&w(o),o}var tn=class{constructor(e,n){this.terrain=e;let r=e.res,i=performance.now();this.heightTexture=en(e.heights,r,r,`r32float`,`terrainHeights`);let a=qt(e);this.normalTexture=en(a.normal,r,r,`rgba8unorm`,`terrainNormalRockAO`,!0),this.splatTexture=en(a.splat,r,r,`rgba8unorm`,`terrainSplat`,!0),this.detailTexture=Le();let o=Jt(e,4),s=new j({label:`terrainShadowHeights`,width:o.levels[0].width,height:o.levels[0].height,format:`r16float`,mips:o.levels.length,usage:[`sample`,`copyDst`]});s.getGPU(),o.levels.forEach((e,t)=>s.upload(e.data,{mip:t,width:e.width,height:e.height})),this.shadowHeightTexture=s,this.shadowTexel=o.texel,this.maxHeight=o.maxHeight,this.size=e.size,this.origin=e.origin,this.res=r,this.uniforms=new c(`TerrainParams`,{origin:[`f32`,e.origin],size:[`f32`,e.size],res:[`f32`,r],shoreRes:[`f32`,1],sunBake:[`vec3f`,new t(0,1,0)],sunBaked:[`f32`,0]},{label:`terrainParams`}),this.uOrigin=this.uniforms.fields.origin,this.uSize=this.uniforms.fields.size,this.shoreTexture=en(new Float32Array([1e4,0,0,0]),1,1,`rgba32float`,`terrainShoreField`),n&&this.setShoreField(n),this._initSunShadow(),this.module=new h({name:`terrain`,deps:[M],uniforms:this.uniforms,bindings:{terrainHeightTex:{texture:this.heightTexture,sampleType:`unfilterable-float`},terrainNormalTex:{texture:this.normalTexture},terrainSplatTex:{texture:this.splatTexture},terrainDetailTex:ze(),terrainShoreTex:{texture:()=>this.shoreTexture,sampleType:`unfilterable-float`},terrainSunShadowTex:{texture:this.sunShadowTexture}},code:nn}),this.sunModulationModule=new h({name:`terrainSunModulation`,deps:[this.module],code:`fn materialSunModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( terrainSunShadowAt( P ) ); }`}),this.timings={...a.ms,detail:this.detailTexture.userData.ms,total:performance.now()-i}}_initSunShadow(){this.sunShadowTexture=new j({label:`terrainSunShadow`,width:Yt,height:Yt,format:`rgba16float`,usage:[`sample`,`storage`]}),this.uSunBake=this.uniforms.fields.sunBake,this.uSunBaked=this.uniforms.fields.sunBaked,this._sunBaked=!1;let e=1/this.shadowTexel;this.sunShadowKernel=new C({label:`Terrain Sun Shadow`,modules:[M],bindings:{terrainParams:{uniform:this.uniforms},terrainShadowHeights:{texture:this.shadowHeightTexture},terrainSunShadowOut:{storageTexture:this.sunShadowTexture,access:`write`}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	if ( gid.x >= ${Yt}u || gid.y >= ${Yt}u ) { return; }
	let ij = vec2f( gid.xy );
	let xz = ( ij + 0.5 ) / ${Yt}.0 * terrainParams.size + terrainParams.origin;
	let L = terrainParams.sunBake;
	let lxz = max( length( L.xz ), 1e-4 );
	let dir = L.xz / lxz;
	let tanEl = L.y / lxz;
	var top = -1e4;
	var occ = 0.0;
	var t = f32( ${Xt} );
	var dt = f32( ${Zt} );
	for ( var i = 0; i < ${$t}; i++ ) {
		let q = xz + dir * t;
		let uv = ( q - terrainParams.origin ) / terrainParams.size;
		let hq = textureSampleLevel( terrainShadowHeights, smpLinearClamp, uv, log2( max( dt * ${e.toFixed(8)}, 1.0 ) ) ).x;
		let v = hq - t * tanEl;
		if ( v > top ) {
			top = v;
			occ = t;
		}
		dt *= ${Qt};
		t += dt;
	}
	textureStore( terrainSunShadowOut, vec2u( gid.xy ), vec4f( top, occ, 0.0, 1.0 ) );
}
`})}updateSunShadow(e,t=!1){let n=m.sunDir.value;return!t&&this._sunBaked&&n.angleTo(this.uSunBake.value)<.0015?!1:(this.uSunBake.value.copy(n),this.sunShadowKernel.dispatch([Yt/8,Yt/8,1]),this._sunBaked=!0,this.uSunBaked.value=1,!0)}setShoreField(e){this.shoreRes=e.res,this.shoreTexture.width===e.res?this.shoreTexture.upload(e.data):(this.shoreTexture.destroy(),this.shoreTexture=en(e.data,e.res,e.res,`rgba32float`,`terrainShoreField`)),this.uniforms.fields.shoreRes.value=e.res}},nn=`
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
`,rn=[62,87],an=class{constructor({scene:e,terrainData:n,terrainGPU:r,gridSize:i=40,rangeFactor:a=2,sunShadow:o=!0,renderer:s=null}){this.data=n,this.gpu=r;let c=n.size/2;this.lod=new Ke({gridSize:i,leafSize:8,levels:9,heightBounds:(e,t,r,i)=>n.boundsFor(e,t,r,i),center:{x:-c,z:-c,size:n.size},rangeFactor:a,prefix:`terrainLod`}),this.wetness=null,this.sunShadow=o,this.renderer=s,this.uViewPos={value:new t},this.gustOffset=new f;let l=this.material=E({name:`Terrain`,roughness:.9,metalness:0,uniforms:{viewPos:[`vec3f`,this.uViewPos.value],wetDarken:[`f32`,.58],gustOffset:[`vec2f`,this.gustOffset]},attributes:{nodeData:`vec4f`}});this.params={wetDarken:l.uniforms.wetDarken},this.uViewPos=l.uniforms.viewPos,l.vertex=`
	// CDLOD vertex (same lattice snapping and geomorph as the CDLOD module) morphing toward viewPos
	let snapped = terrainLodSnapped( v.nodeData, v.position.xz );
	let y0 = terrainHeightAt( snapped );
	let cv = terrainLodMorph( v.nodeData, v.position.xz, mat.viewPos, y0 );
	v.useWorld = true;
	v.worldPos = vec3f( cv.worldXZ.x, terrainHeightAt( cv.worldXZ ), cv.worldXZ.y );
	v.worldNormal = vec3f( 0.0, 1.0, 0.0 );
`,this.finalizeMaterial(),this.mesh=new fe(this.lod.geometry,l),this.mesh.frustumCulled=!1,this.mesh.receiveShadow=!0,this.mesh.castShadow=!0,this.mesh.staticVelocity=!0,this.mesh.name=`Terrain`,e.add(this.mesh)}finalizeMaterial(){let e=this.material,t=[this.gpu.module,He(),this.lod.module];this.wetness&&(t.push(...this.wetness.modules||[]),t.push(new h({name:`terrainWetness`,deps:[this.gpu.module,...this.wetness.modules||[]],code:this.wetness.code}))),t.push(new h({name:`terrainMaterial`,deps:[this.gpu.module,He()],code:on})),e.modules=t,e.defines.HAS_WETNESS=+!!this.wetness,e.defines.MATERIAL_SUN_MODULATION=+!!this.sunShadow,e.surface=sn,e.needsUpdate=!0}update(e){e.getWorldPosition(this.uViewPos.value),this.lod.update(e);let t=m.windDir.value,n=.7*m.windSpeed.value+1.5,r=m.dt.value;this.gustOffset.x+=t.x*n*r,this.gustOffset.y+=t.y*n*r,this.gpu.updateSunShadow(this.renderer)}},I=Re,on=`
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
`,sn=`
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
	let macroA = terDetail( ${Ie(`xz`,.7)} / 173.0 ).w;
	let macroB = terDetail( ${Ie(`xz`,2.1)} / 47.0 ).w;
	let mcr = macroA * 0.6 + macroB * 0.4;
	let dN = terDetail( xz / 1.9 );
	let dM = terDetail( ${Ie(`xz`,1.3)} / 6.7 + 0.21 );
	let dF = terDetail( ${Ie(`xz`,2.4)} / 0.63 + 0.53 );
	let grain = min( dN.z, 0.62 );
	let grainF = min( dF.z, 0.62 );
#if REFRACTION_CLIP
	// the refraction source (half resolution, seen blurred through the water): every non-rock
	// fragment under the water takes the cheap seabed path
	let seabedPath = h < 0.4 && nr.z < 0.05;
#else
	let seabedPath = h < -0.8 && nr.z < 0.05 && slope < 0.18;
#endif
	let sw = vec2f( ${We.swellDir.x}, ${We.swellDir.y} );
	let swDir = sw;
	let rc = vec2f( ${We.reef.center.x.toFixed(3)}, ${We.reef.center.z.toFixed(3)} );
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
		let reefW = 1.0 - smoothstep( ${We.reef.radius*.5}, ${We.reef.radius*1.15}, reefD + ( mcr - 0.5 ) * 30.0 );
		var under = mix( ${I(.84,.78,.64)}, ${I(.72,.7,.58)}, smoothstep( 1.0, 9.0, depth ) );
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
		var meadow = mix( ${I(.12,.16,.07)}, ${I(.27,.29,.15)}, smoothstep( 0.35, 0.75, blades ) );
		meadow = mix( meadow, ${I(.24,.2,.11)}, smoothstep( 0.55, 0.8, dM.y + ( macroB - 0.5 ) * 0.4 ) * 0.5 );
		// sparse at the fringe: sand shows between the blades; thinner, paler patches inside
		meadow = mix( under, meadow, smoothstep( 0.3, 0.85, sp.z + clumps * 0.5 ) * 0.35 + 0.65 );
		meadow = mix( meadow, mix( meadow, under, 0.45 ), smoothstep( 0.58, 0.8, macroB + ( dM.w - 0.5 ) * 0.4 ) );
		under = mix( under, meadow, seagrassW );
		// rubble heads: coral rubble and rock turfed with algae, pink coralline crusts
		let rubbleW = smoothstep( 0.3, 0.6, sp.w + ( dN.x - 0.5 ) * 0.4 + ( dM.w - 0.5 ) * 0.3 ) * underW;
		var rubble = mix( ${I(.2,.19,.15)}, ${I(.36,.33,.26)}, smoothstep( 0.3, 0.7, dN.x ) );
		rubble = mix( rubble, ${I(.2,.24,.1)}, smoothstep( 0.5, 0.7, dF.y ) * 0.6 );
		rubble = mix( rubble, ${I(.58,.38,.44)}, smoothstep( 0.62, 0.74, dM.x ) * 0.6 );
		under = mix( under, rubble, rubbleW );
		// reef flat: coral rubble and pink crusts toward the reef
		under = mix( under, mix( ${I(.56,.5,.44)}, ${I(.6,.43,.46)}, smoothstep( 0.45, 0.7, dM.x ) ), reefW * 0.7 * smoothstep( 0.4, 0.6, dN.x ) );

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
			basalt = mix( basalt, mix( ${I(.13,.1,.07)}, ${I(.2,.2,.1)}, dF.y ), joints * 0.7 );
			// moss / small plants on every ledge and on the less steep parts, more near the edges
			let ledgeMoss = smoothstep( 0.4, 0.75, N0.y + ( dN.y - 0.45 ) * 0.6 ) * smoothstep( 0.25, 0.55, macroB + dM.y * 0.4 );
			let fringe = smoothstep( 0.5, 0.58, rv ) * smoothstep( 0.8, 0.6, rv ) * smoothstep( 0.3, 0.6, dM.w + dN.y * 0.4 );
			let mossK = sat( max( ledgeMoss * 0.75, fringe * 0.8 ) + R.moss * 0.3 + joints * 0.25 );
			rockAlbedo = mix( basalt, mix( ${I(.12,.17,.05)}, ${I(.22,.26,.09)}, dF.y ), mossK );
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
		var sand = mix( ${I(.83,.75,.6)}, ${I(.9,.84,.72)}, smoothstep( 0.3, 0.72, mcr + dryK * 0.2 ) );
		sand = mix( sand, ${I(.84,.72,.55)}, smoothstep( 0.55, 0.8, dM.w + ( macroB - 0.5 ) * 0.6 ) * 0.45 );
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
		let pebCol = mix( mix( ${I(.86,.82,.74)}, ${I(.78,.64,.6)}, smoothstep( 0.45, 0.75, dM.x ) ), ${I(.36,.33,.3)}, smoothstep( 0.74, 0.82, dM.y ) );
		sand = mix( sand, pebCol, pebW * 0.75 );
		let wrack = wrackBand * smoothstep( 0.58, 0.72, dN.y ) * smoothstep( 0.4, 0.6, macroB );
		sand = mix( sand, ${I(.24,.18,.11)}, wrack * 0.8 );
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
			let reefW = 1.0 - smoothstep( ${We.reef.radius*.5}, ${We.reef.radius*1.15}, reefD + ( mcr - 0.5 ) * 30.0 );
			under = mix( ${I(.84,.78,.64)}, ${I(.72,.7,.58)}, smoothstep( 1.0, 9.0, depth ) );
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
			var meadow = mix( ${I(.12,.16,.07)}, ${I(.27,.29,.15)}, smoothstep( 0.35, 0.75, blades ) );
			meadow = mix( meadow, ${I(.24,.2,.11)}, smoothstep( 0.55, 0.8, dM.y + ( macroB - 0.5 ) * 0.4 ) * 0.5 );
			// sparse at the fringe: sand shows between the blades; thinner, paler patches inside
			meadow = mix( under, meadow, smoothstep( 0.3, 0.85, sp.z + clumps * 0.5 ) * 0.35 + 0.65 );
			meadow = mix( meadow, mix( meadow, under, 0.45 ), smoothstep( 0.58, 0.8, macroB + ( dM.w - 0.5 ) * 0.4 ) );
			under = mix( under, meadow, seagrassW );
			// rubble heads: coral rubble and rock turfed with algae, pink coralline crusts
			rubbleW = smoothstep( 0.3, 0.6, sp.w + ( dN.x - 0.5 ) * 0.4 + ( dM.w - 0.5 ) * 0.3 ) * underW;
			var rubble = mix( ${I(.2,.19,.15)}, ${I(.36,.33,.26)}, smoothstep( 0.3, 0.7, dN.x ) );
			rubble = mix( rubble, ${I(.2,.24,.1)}, smoothstep( 0.5, 0.7, dF.y ) * 0.6 );
			rubble = mix( rubble, ${I(.58,.38,.44)}, smoothstep( 0.62, 0.74, dM.x ) * 0.6 );
			under = mix( under, rubble, rubbleW );
			// reef flat: coral rubble and pink crusts toward the reef
			under = mix( under, mix( ${I(.56,.5,.44)}, ${I(.6,.43,.46)}, smoothstep( 0.45, 0.7, dM.x ) ), reefW * 0.7 * smoothstep( 0.4, 0.6, dN.x ) );
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
		lawn = mix( lawn, ${I(.4,.33,.23)}, smoothstep( 0.72, 0.84, dN.y + ( dM.y - 0.5 ) * 0.5 ) * 0.25 );
		lawn = mix( lawn, ${I(.6,.52,.38)}, sat( sp.x * 1.6 ) * smoothstep( 0.45, 0.62, dN.z + dM.y * 0.3 ) * 0.7 );
		// inside the geometric grass field (GrassField) the ground is only seen between the blades:
		// the shaded base of the sward, dark and brownish with dead leaves; it hands over to the
		// sward's own look (above) where the blades thin out
		let grassHere = smoothstep( 2.5, 4.5, h ) * ( 1.0 - smoothstep( 0.45, 0.85, jungleW ) ) * ( 1.0 - sat( sp.x * 1.6 ) );
		let fieldK = ( 1.0 - smoothstep( ${rn[0].toFixed(1)}, ${rn[1].toFixed(1)}, length( p.xz - frame.cameraPos.xz ) ) ) * grassHere;
		let swardBase = mix( mt.tone * 0.4, MEADOW_soil, 0.4 ) * ( ( dN.y - 0.45 ) * 0.6 + 1.0 ) * ( ( dF.y - 0.4 ) * 0.3 + 1.0 );
		lawn = mix( lawn, swardBase, fieldK * 0.85 );
		let litter = mix( ${I(.2,.15,.09)}, ${I(.34,.25,.13)}, dF.y );
		var jungle = mix( ${I(.1,.16,.05)}, litter, smoothstep( 0.52, 0.7, dN.y ) );
		jungle = mix( jungle, ${I(.12,.1,.06)}, gully * 0.3 );
		let far = smoothstep( 40.0, 160.0, camDist );
		var cover = mix( ${I(.08,.13,.04)}, ${I(.17,.24,.07)}, smoothstep( 0.3, 0.7, mcr ) );
		cover = mix( cover, ${I(.27,.29,.12)}, smoothstep( 0.66, 0.84, macroB + dM.w * 0.2 ) * 0.45 );
		jungle = mix( jungle, cover, far * 0.8 );
		jungle = jungle * ( ( mcr - 0.5 ) * 0.3 + 1.0 );
		// canopy: seen from a distance (or on slopes too steep for the trees) the forest reads as
		// a carpet of lumpy crowns with dark gaps
		let canopyW = jungleW * max( smoothstep( 0.2, 0.4, slope ), smoothstep( 90.0, 260.0, camDist ) ) * smoothstep( 25.0, 70.0, camDist ) * notRock * ( 1.0 - screeW * 0.7 );
		var canopyH = 0.0;
		if ( canopyW > 0.0 ) {
			let crowns = terDetail( ${Ie(`xz`,.9)} / 61.0 ).w;
			let crownsB = terDetail( ${Ie(`xz`,2.3)} / 13.0 + 0.37 ).w;
			canopyH = smoothstep( 0.32, 0.7, crowns * 0.45 + crownsB * 0.4 + dM.w * 0.15 );
			var canopy = mix( ${I(.05,.08,.025)}, mix( ${I(.14,.21,.06)}, ${I(.22,.27,.09)}, macroB ), canopyH );
			// steep faces: the canopy hangs in streaks down the fall line
			canopy = canopy * ( ( streak - 0.5 ) * 0.5 * smoothstep( 0.3, 0.5, slope ) + 1.0 );
			jungle = mix( jungle, canopy, canopyW );
		}
		var ground = mix( lawn, jungle, jungleW );
		// around the bare rock: dark humus, stones and moss, with the surrounding plants creeping
		// in (a soft, noisy band; no speckle)
		let creepIn = smoothstep( 0.4, 0.75, dM.w + ( dN.y - 0.45 ) * 0.5 + ( macroB - 0.5 ) * 0.3 );
		var scree = mix( ${I(.16,.13,.1)}, ${I(.27,.24,.2)}, smoothstep( 0.45, 0.75, dM.x + ( dN.x - 0.5 ) * 0.3 ) );
		scree = mix( scree, mix( ${I(.13,.18,.06)}, ${I(.22,.26,.09)}, dF.y ), smoothstep( 0.45, 0.7, dM.y + ( dN.y - 0.45 ) * 0.5 ) * 0.7 );
		ground = mix( ground, scree, screeW * ( 1.0 - creepIn * 0.7 ) );
		let laterite = mix( ${I(.42,.25,.16)}, ${I(.52,.36,.24)}, dM.w ) * ( ( dN.y - 0.4 ) * 0.3 + 1.0 );
		ground = mix( ground, laterite, lateriteW );

		// ---- worn dirt paths / trampled ground (darker, redder soil in the forest)
		var dirt = mix( ${I(.38,.31,.23)}, ${I(.5,.43,.32)}, dM.w ) * ( ( dN.y - 0.4 ) * 0.35 + 0.95 );
		dirt = mix( dirt, ${I(.3,.22,.15)}, jungleW * 0.7 );
		dirt = mix( dirt, ${I(.56,.53,.48)}, smoothstep( 0.72, 0.82, dN.z ) * 0.5 );
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
			var soil = mix( ${I(.5,.42,.31)}, ${I(.68,.6,.46)}, smoothstep( 0.3, 0.8, layerMix ) * 0.45 + lamB * 0.2 + ( grain - 0.45 ) * 0.5 + ( dM.w - 0.5 ) * 0.3 );
			// humus-stained, rootier soil in patches (the old dune surface caught in the cut)
			soil = mix( soil, ${I(.26,.2,.14)}, smoothstep( 0.55, 0.8, dM.y + ( macroB - 0.5 ) * 0.5 ) * 0.55 );
			// roots: horizontal coordinate along the face, stretched down the fall line
			let ru = terDetail( vec2f( dot( xz, tanF ) / 0.8, h / 0.5 ) + vec2f( 0.37, 0.11 ) );
			let rv = terDetail( vec2f( dot( xz, tanF ) / 1.7 + h * 0.6, h / 0.9 ) + vec2f( 0.71, 0.29 ) );
			let rootLive = smoothstep( 0.035, 0.0, abs( ru.x - 0.5 ) ) * smoothstep( 0.45, 0.62, ru.w );
			let rootDead = smoothstep( 0.03, 0.0, abs( rv.z - 0.52 ) ) * smoothstep( 0.5, 0.66, rv.y );
			soil = mix( soil, ${I(.17,.12,.08)}, rootLive * 0.85 );
			soil = mix( soil, ${I(.8,.75,.66)}, rootDead * 0.75 );
			// damp, darker sand toward the toe and in seepage streaks
			let seep = smoothstep( 0.6, 0.8, terDetail( vec2f( dot( xz, tanF ) / 2.3, h / 6.0 ) ).w ) * 0.35;
			soil = soil * ( 1.0 - seep - smoothstep( 0.5, 1.0, sp.w ) * 0.08 );
			// under the lip: the dark, rooty topsoil the grass grows in, overhanging the cut
			let lip = smoothstep( 0.86, 0.97, sp.w + ( dN.y - 0.45 ) * 0.1 );
			soil = mix( soil, ${I(.2,.15,.1)} * ( dN.x * 0.4 + 0.8 ), lip * 0.85 );
			// foot of the face: undercut by the swash of storm waves, in its own shadow
			soil *= 1.0 - ( 1.0 - smoothstep( 0.6, 0.78, sp.w ) ) * smoothstep( 0.35, 0.55, sp.w ) * 0.25;
			// slumped sand and fallen chunks at the toe: damp beach sand rather than soil
			soil = mix( ${I(.63,.56,.44)} * ( grain * 0.3 + 0.85 ), soil, smoothstep( 0.35, 0.75, sp.w ) );
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
		albedo = mix( albedo * ( 1.0 - swashLine * 0.3 ), ${I(.9,.88,.84)}, swashLine * smoothstep( 0.6, 0.75, dF.z ) * 0.5 );
		// foam residue: lacy patterns stranded on the sand
		var residue = sat( wetFoam.y ) * landW * notRock;
		if ( residue > 0.0 ) { residue *= smoothstep( 0.42, 0.18, terDetail( ${Ie(`xz`,.4)} / 0.9 ).x ) * 0.7 + 0.3; }
		albedo = mix( albedo, ${I(.88,.9,.9)}, residue );

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
`,cn=6,ln=new c(`WhaleMarks`,{marks:[`vec4f[${cn}]`,Array(cn).fill(0).map(()=>new n(0,0,1,0))]},{label:`whaleMarks`}),un={get array(){return ln.fields.marks.value}},dn=new h({name:`whaleWater`,uniforms:ln,uniformName:`whaleMarks`,code:`
fn whaleWater( xz: vec2f ) -> vec2f {
	var foam = 0.0; var slick = 0.0;
	for ( var i = 0; i < ${cn}; i++ ) {
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
`}),fn=new t,L=new t,pn=class{constructor(){this.events=[],this.foamTimer=0,this.slickDone=!1,this.breaches=0,this.splashes=0}update(e,t,n){if(n?.disabled)return;let r=e.brain,i=r.water-r.position.y;if(r.state===`surface`&&i<1.6&&(this.foamTimer-=t,this.foamTimer<=0&&(this.foamTimer=1.2,e.toWorld(fn.set(0,e.rest[8].y,e.zHead-5),L),this.push({x:L.x,z:L.z,r:5.5,age:0,life:16,kind:`foam`,peak:.9})),n&&Math.random()<t*30)){let t=Math.random()<.5?-1:1;e.toWorld(fn.set(t*1.6,e.rest[8].y,e.zHead-2-Math.random()*8),L),L.y=r.water+.05,n.emit(L,fn.set((Math.random()-.5)*1.5,1.6+Math.random()*1.6,(Math.random()-.5)*1.5),10,.05,0,{spread:1.2,jitter:.4,life:1.4})}r.breaches!==this.breaches&&(this.breaches=r.breaches,e.toWorld(fn.set(0,e.rest[2].y,e.zHead-2),L),this.push({x:L.x,z:L.z,r:6,age:0,life:14,kind:`foam`,peak:1}),this.burst(e,n,L,5,7,18)),r.splashes!==this.splashes&&(this.splashes=r.splashes,e.toWorld(fn.set(0,e.rest[8].y,e.zHead-5),L),this.push({x:L.x,z:L.z,r:11,age:0,life:20,kind:`foam`,peak:1}),this.push({x:L.x+3,z:L.z-2,r:7,age:0,life:12,kind:`foam`,peak:.9}),this.burst(e,n,L,9,11,26)),r.flukeUp>.6&&!this.slickDone&&(this.slickDone=!0,e.toWorld(fn.set(0,e.rest[e.rest.length-1].y,e.manifest.notchZ),L),this.push({x:L.x,z:L.z,r:6,age:0,life:24,kind:`slick`,peak:1}),this.push({x:L.x,z:L.z,r:3.5,age:0,life:7,kind:`foam`,peak:.7})),r.state!==`surface`&&(this.slickDone=!1);let a=un.array;for(let e=0;e<cn;e++){let n=this.events[e];if(!n){a[e].set(0,0,1,0);continue}n.age+=t;let r=Math.max(0,1-n.age/n.life),i=n.kind===`foam`?1+n.age*.06:1+n.age*.02;a[e].set(n.x,n.z,n.r*i,(n.kind===`foam`?1:-1)*n.peak*r*Math.min(1,n.age*3))}this.events=this.events.filter(e=>e.age<e.life)}burst(e,n,r,i,a,o){if(!n)return;let s=e.brain.water;for(let e=0;e<9;e++){let c=e/9*Math.PI*2+Math.random()*.5,l=new t(r.x+Math.cos(c)*i*(.4+Math.random()*.6),s+.2,r.z+Math.sin(c)*i*(.4+Math.random()*.6)),u=new t(Math.cos(c)*2.5,a*(.6+Math.random()*.5),Math.sin(c)*2.5);n.emit(l,u,o,.3,3,{spread:2.4,jitter:.5,life:2.8,sizeJitter:.8}),n.emit(l,u.clone().multiplyScalar(.9),o*2,.025,0,{spread:3,jitter:.4,life:2.4}),e%3==0&&n.emit(l,u.clone().multiplyScalar(.5),o,.8,1,{spread:2.2,jitter:.6,life:5})}}push(e){this.events.push(e),this.events.length>cn&&this.events.shift()}},mn=e=>Math.min(1,Math.max(0,e)),R=(e,t,n)=>e+(t-e)*n,hn=(e,t,n)=>{let r=mn((n-e)/(t-e));return r*r*(3-2*r)},gn=[4,4,3,3,8,10],_n=1025,vn=class{constructor(){this.zAft=-3.9,this.zBow=4.3,this.length=this.zBow-this.zAft,this.deckY=.35,this.shell=.07,this.houseBack=-.35,this.houseFront=1.45;let e=.2,t=.45,n=this.keelY(1),r=this.sheerY(1),i=this.zBow-e*r,a=Math.sqrt(1.04),o=n+t;this.stem={k:e,R:t,yF:n,zW:i,yc:o,zc:i+e*o-t*a,yT:o-t*e/a},this._setback=new Map,this._sectionCache=new Map,this.analyze()}sheerZ(e){return this.zAft+this.length*e}tAtSheerZ(e){return mn((e-this.zAft)/this.length)}sheerY(e){let t=Math.max(0,1-e/.2);return .98+.62*e**2.2+.04*t*t}sheerX(e){if(e<=.42){let t=1-e/.42;return 1.45-.17*t*t}return 1.45*(1-((e-.42)/.58)**2.6)}keelY(e){return e<=.45?-.23-.22*Math.sin(Math.PI*.5*e/.45):-.45+.33*hn(.45,1,e)**1.6}chineX(e){if(e<=.42){let t=1-e/.42;return 1.26-.1*t*t}let t=(e-.42)/.58;return 1.26*Math.max(0,1-t**1.7)**1.15}chineY(e){return R(.01,-.045,hn(0,.45,e))+.33*hn(.5,1,e)**1.3}bilgeTangent(e){return R(.2,.24,hn(0,.4,e))*(1-.55*hn(.6,1,e))}bottomConvexity(e){return R(.025,.012,hn(.55,.95,e))}flare(e){return R(-.012,.075,hn(.3,.85,e))*(1-.3*hn(.9,1,e))}bowBlend(e){return e>.55?((e-.55)/.45)**2:0}stemZ(e){let t=this.stem;if(e>=t.yT)return t.zW+t.k*e;let n=e-t.yc;return t.zc+Math.sqrt(Math.max(0,t.R*t.R-n*n))}controlPoints(e){let t=[0,this.keelY(e)],n=[this.chineX(e),this.chineY(e)],r=[this.sheerX(e),this.sheerY(e)],i=n[0]-t[0],a=n[1]-t[1],o=Math.hypot(i,a),s=i/o,c=a/o,l=r[0]-n[0],u=r[1]-n[1],d=Math.hypot(l,u),f=l/d,p=u/d,m=hn(0,.3,n[0]),h=Math.min(this.bilgeTangent(e),.3*o,.3*d),g=this.bottomConvexity(e)*o*m,_=[t[0]+s*o*.5+c*g,t[1]+c*o*.5-s*g],v=[n[0]-s*h,n[1]-c*h],y=[n[0]+f*h,n[1]+p*h],b=Math.acos(Math.min(1,Math.max(-1,s*f+c*p))),x=f-s,S=p-c,C=Math.hypot(x,S),w=C>1e-6?h*Math.tan(b/4)/C:0,T=[n[0]+x*w,n[1]+S*w],E=this.flare(e)*d*m;return[t,_,v,T,y,[n[0]+f*d*.5-p*E,n[1]+p*d*.5+f*E],r]}sectionPoints(e,t=1){let n=e+`:`+t,r=this._sectionCache.get(n);if(r)return r;let i=this.controlPoints(e),a=i.length,o=[[2*i[0][0]-i[1][0],2*i[0][1]-i[1][1]],...i,[2*i[a-1][0]-i[a-2][0],2*i[a-1][1]-i[a-2][1]]],s=gn.reduce((e,t)=>e+t,0)*t+1,c=new Float64Array(s*2),l=0,u=[0,0];for(let e=0;e<gn.length;e++){let n=gn[e]*t;for(let t=0;t<n;t++)yn(o[e],o[e+1],o[e+2],o[e+3],t/n,u),c[l++]=Math.max(0,u[0]),c[l++]=u[1]}return c[l++]=i[a-1][0],c[l++]=i[a-1][1],this._sectionCache.size>4096&&this._sectionCache.clear(),this._sectionCache.set(n,c),c}setback(e=1){let t=this._setback.get(e);if(t)return t;let n=this.sectionPoints(1,e),r=n.length/2;t=new Float64Array(r);for(let e=0;e<r;e++)t[e]=this.zBow-this.stemZ(n[2*e+1]);return t[r-1]=0,this._setback.set(e,t),t}sectionCount(e=1){return gn.reduce((e,t)=>e+t,0)*e+1}station(e,n=1){let r=this.sectionPoints(e,n),i=this.setback(n),a=this.sheerZ(e),o=this.bowBlend(e),s=[];for(let e=0;e<i.length;e++)s.push(new t(r[2*e],r[2*e+1],a-o*i[e]));return s}stationParams(e){let t=e=>1+2.2*hn(.62,1,e)+.5*(1-hn(0,.08,e)),n=2e3,r=new Float64Array(2001);for(let e=1;e<=n;e++)r[e]=r[e-1]+t((e-.5)/n)/n;let i=r[n],a=[],o=0;for(let t=0;t<e;t++){let s=i*t/(e-1);for(;o<n&&r[o+1]<s;)o++;let c=(s-r[o])/Math.max(1e-12,r[o+1]-r[o]);a.push(t===e-1?1:(o+mn(c))/n)}return a}halfBreadth(e,t){let n=this.sectionPoints(e,2),r=n.length/2;if(t>=n[2*r-1])return n[2*r-2];for(let e=r-2;e>=0;e--){let r=n[2*e+1],i=n[2*e+3];if(t>=r&&t<=i){let a=(t-r)/Math.max(1e-9,i-r);return R(n[2*e],n[2*e+2],a)}}return 0}tAt(e,t){let n=0,r=1;for(let i=0;i<40;i++){let i=(n+r)*.5;this.zOnStation(i,t)<e?n=i:r=i}return(n+r)*.5}zOnStation(e,t){let n=this.bowBlend(e);if(n===0)return this.sheerZ(e);let r=this.sectionPoints(e,2),i=this.setback(2),a=r.length/2,o=0;if(t<=r[1])o=i[0];else if(t>=r[2*a-1])o=0;else for(let e=0;e<a-1;e++){let n=r[2*e+1],a=r[2*e+3];if(t>=n&&t<=a){o=R(i[e],i[e+1],(t-n)/Math.max(1e-9,a-n));break}}return this.sheerZ(e)-n*o}hullXAt(e,t){return this.halfBreadth(this.tAt(e,t),t)}analyze(){let e=this.setback(3),n=e.length,r=[];for(let t=0;t<=480;t++){let i=t/480,a=this.sectionPoints(i,3),o=this.sheerZ(i),s=this.bowBlend(i);for(let t=0;t<n-1;t++){let n=a[2*t+1],i=a[2*t+3];if(n<=0&&i>0){let c=-n/(i-n);r.push([o-s*R(e[t],e[t+1],c),R(a[2*t],a[2*t+2],c)]);break}}}r.sort((e,t)=>e[0]-t[0]),this.wlStart=r[0][0],this.wlEnd=r[r.length-1][0],this._beamTable=new Float64Array(513),this._tableZ0=this.wlStart,this._tableDz=(this.wlEnd-this.wlStart)/512;let i=0;for(let e=0;e<=512;e++){let t=this.wlStart+e*this._tableDz;for(;i<r.length-2&&r[i+1][0]<t;)i++;let n=r[i],a=r[i+1],o=mn((t-n[0])/Math.max(1e-9,a[0]-n[0]));this._beamTable[e]=R(n[1],a[1],o)}let a=.02,o=this.zAft-.02,s=Math.ceil((this.wlEnd+.05-o)/a),c=new Float32Array(75*s).fill(1/0),l=[];for(let t=0;t<=480;t++){let r=t/480,i=this.sectionPoints(r,3),a=this.sheerZ(r),o=this.bowBlend(r),s=new Float64Array(n*3);for(let t=0;t<n;t++)s[3*t]=i[2*t],s[3*t+1]=i[2*t+1],s[3*t+2]=a-o*e[t];l.push(s)}let u=(e,t,n)=>{if(Math.min(e[1],t[1],n[1])>.01)return;let r=Math.min(e[0],t[0],n[0]),i=Math.max(e[0],t[0],n[0]),l=Math.min(e[2],t[2],n[2]),u=Math.max(e[2],t[2],n[2]),d=Math.max(0,Math.ceil((r-0)/a-.5)),f=Math.min(74,Math.floor((i-0)/a-.5)),p=Math.max(0,Math.ceil((l-o)/a-.5)),m=Math.min(s-1,Math.floor((u-o)/a-.5));if(d>f||p>m)return;let h=(t[2]-n[2])*(e[0]-n[0])+(n[0]-t[0])*(e[2]-n[2]);if(!(Math.abs(h)<1e-12))for(let r=p;r<=m;r++){let i=o+(r+.5)*a;for(let o=d;o<=f;o++){let s=0+(o+.5)*a,l=((t[2]-n[2])*(s-n[0])+(n[0]-t[0])*(i-n[2]))/h,u=((n[2]-e[2])*(s-n[0])+(e[0]-n[0])*(i-n[2]))/h,d=1-l-u;if(l<-1e-9||u<-1e-9||d<-1e-9)continue;let f=l*e[1]+u*t[1]+d*n[1],p=r*75+o;f<c[p]&&(c[p]=f)}}},d=[0,0,0],f=[0,0,0],p=[0,0,0],m=[0,0,0],h=(e,t,n)=>(n[0]=e[3*t],n[1]=e[3*t+1],n[2]=e[3*t+2],n);for(let e=0;e<480;e++)for(let t=0;t<n-1;t++)h(l[e],t,d),h(l[e+1],t,f),h(l[e+1],t+1,p),h(l[e],t+1,m),u(d,f,p),u(d,p,m);this._field={bottom:c,nx:75,nz:s,cell:a,x0:0,z0:o};let g=0,_=0,v=0,y=0,b=0;for(let e=0;e<s;e++){let t=o+(e+.5)*a;for(let n=0;n<75;n++){let r=c[e*75+n];if(!(r<0))continue;let i=a*a*2;g+=i,v+=i*t,_+=i*-r,y+=i*-r*t,b+=i*-r*(r*.5)}}this.waterplaneArea=g,this.canoeVolume=_,this.centerOfFlotationZ=v/g,this.centerOfBuoyancy=new t(0,b/_,y/_)}halfBeamAt(e){if(e<this.wlStart||e>this.wlEnd)return 0;let t=(e-this._tableZ0)/this._tableDz,n=Math.min(this._beamTable.length-2,Math.max(0,Math.floor(t)));return R(this._beamTable[n],this._beamTable[n+1],mn(t-n))}draftAt(e){let{bottom:t,nx:n,nz:r,cell:i,z0:a}=this._field,o=(e-a)/i-.5;if(o<-.5||o>r-.5)return 0;let s=Math.min(r-2,Math.max(0,Math.floor(o))),c=t[s*n],l=t[(s+1)*n];return R(c<0?-c:0,l<0?-l:0,mn(o-s))}bottomAt(e,t){let{bottom:n,nx:r,nz:i,cell:a,x0:o,z0:s}=this._field,c=Math.floor((Math.abs(e)-o)/a),l=Math.floor((t-s)/a);return c<0||c>=r||l<0||l>=i?1/0:n[l*r+c]}buildHullSamples(e=8){let{bottom:n,nx:r,nz:i,cell:a,x0:o,z0:s}=this._field,c=this.wlEnd-this.wlStart,l=[];for(let t=0;t<e;t++)l.push([0,1].map(()=>({a:0,x2:0,z:0,v:0})));for(let t=0;t<i;t++){let i=s+(t+.5)*a,u=Math.min(e-1,Math.max(0,Math.floor((i-this.wlStart)/c*e))),d=this.halfBeamAt(i);for(let e=0;e<r;e++){let s=n[t*r+e];if(!(s<0))continue;let c=o+(e+.5)*a,f=+(d>0&&c>d*.5),p=a*a,m=l[u][f];m.a+=p,m.x2+=p*c*c,m.z+=p*i,m.v+=p*-s}}let u=[];for(let n=0;n<e;n++)for(let e=0;e<2;e++){let r=l[n][e];if(r.a<=0)continue;let i=Math.sqrt(r.x2/r.a),a=r.z/r.a,o=-r.v/r.a,s=Math.min(0,this.bottomAt(i,a));u.push({position:new t(i,o,a),area:r.a,depth:-o,bottomY:s}),u.push({position:new t(-i,o,a),area:r.a,depth:-o,bottomY:s})}return u}};function yn(e,t,n,r,i,a){let o=Math.max(1e-5,Math.sqrt(Math.hypot(t[0]-e[0],t[1]-e[1]))),s=Math.max(1e-5,Math.sqrt(Math.hypot(n[0]-t[0],n[1]-t[1]))),c=Math.max(1e-5,Math.sqrt(Math.hypot(r[0]-n[0],r[1]-n[1]))),l=o,u=l+s,d=u+c,f=l+(u-l)*i;for(let i=0;i<2;i++){let o=((l-f)*e[i]+(f-0)*t[i])/(l-0),s=((u-f)*t[i]+(f-l)*n[i])/(u-l),c=((d-f)*n[i]+(f-u)*r[i])/(d-u),p=((u-f)*o+(f-0)*s)/(u-0),m=((d-f)*s+(f-l)*c)/(d-l);a[i]=((u-f)*p+(f-l)*m)/(u-l)}return a}var bn=new Set([`position`,`normal`,`uv`,`color`,`aux`]),xn=new o,Sn=new t,Cn=new r,wn=new e,Tn=new t;function z(e=0,t=0,n=0,r=0,i=0,a=0,o=1,s=o,c=o,l=`XYZ`){return wn.set(r,i,a,l),Cn.setFromEuler(wn),new b().compose(Sn.set(e,t,n),Cn,Tn.set(o,s,c))}function En(e,n,i=0){let a=n.clone().normalize(),o=new r().setFromUnitVectors(new t(0,1,0),a);return i&&o.multiply(new r().setFromAxisAngle(new t(0,1,0),i)),new b().compose(e,o,new t(1,1,1))}function Dn(e){return e instanceof o?e:xn.set(e).clone()}function On(e,{color:t=16777215,rough:n=.5,metal:r=0,pattern:i=0,anim:a=0,matrix:o=null}={}){for(let t of Object.keys(e.attributes))bn.has(t)||e.deleteAttribute(t);e.morphAttributes={},e.clearGroups();let s=e.attributes.position.count;if(!e.index){let t=Array(s);for(let e=0;e<s;e++)t[e]=e;e.setIndex(t)}if(e.attributes.normal||e.computeVertexNormals(),e.attributes.uv||e.setAttribute(`uv`,new N(new Float32Array(s*2),2)),!e.attributes.color){let n=Dn(t),r=new Float32Array(s*3);for(let e=0;e<s;e++)r[e*3]=n.r,r[e*3+1]=n.g,r[e*3+2]=n.b;e.setAttribute(`color`,new N(r,3))}if(!e.attributes.aux){let t=new Float32Array(s*4);for(let e=0;e<s;e++)t[e*4]=n,t[e*4+1]=r,t[e*4+2]=i,t[e*4+3]=a;e.setAttribute(`aux`,new N(t,4))}for(let t of Object.keys(e.attributes)){let n=e.attributes[t];(!(n.array instanceof Float32Array)||n.isInterleavedBufferAttribute)&&e.setAttribute(t,new N(Float32Array.from({length:n.count*n.itemSize},(e,t)=>n.array[t]),n.itemSize))}return o&&e.applyMatrix4(o),e}var kn=class{constructor(){this.buckets=new Map}add(e,t,n){let r=On(t,n);return this.buckets.has(e)||this.buckets.set(e,[]),this.buckets.get(e).push(r),r}merged(e){let t=this.buckets.get(e);if(!t||t.length===0)return null;let n=t.length===1?t[0]:Ce(t,!1);if(!n)throw Error(`BoatModel: failed to merge bucket `+e);return n.computeBoundingBox(),n.computeBoundingSphere(),n}};function An(e){let t=e.length===1?e[0]:Ce(e,!1);return t.computeBoundingBox(),t.computeBoundingSphere(),t}function B(e,t,n){let r=new we(e,t,n),i=r.attributes.uv,a=[[n,t],[n,t],[e,n],[e,n],[e,t],[e,t]];for(let e=0;e<6;e++)for(let t=0;t<4;t++){let n=e*4+t;i.setXY(n,i.getX(n)*a[e][0],i.getY(n)*a[e][1])}return r}function jn(e,t,n,r=.02,i=2){let a=new Ee(e,t,n,i,Math.min(r,e/2-1e-4,t/2-1e-4,n/2-1e-4)),o=a.attributes.uv;for(let r=0;r<o.count;r++)o.setXY(r,o.getX(r)*Math.max(e,n),o.getY(r)*t);return a}function V(e,t,n,r=12,i=1,a=!1,o=0,s=Math.PI*2){let c=new xe(e,t,n,r,i,a,o,s),l=c.attributes.uv,u=Math.max(e,t)*s;for(let e=0;e<l.count;e++)l.setXY(e,l.getX(e)*u,l.getY(e)*n);return c}function H(e,n,r,i=8,a=r){let o=new t().subVectors(n,e),s=V(a,r,o.length(),i,1,!1);return s.applyMatrix4(En(new t().addVectors(e,n).multiplyScalar(.5),o)),s}function Mn(e,t=12,n=8,r=0,i=Math.PI*2,a=0,o=Math.PI){return new _e(e,t,n,r,i,a,o)}function Nn(e,t,n=8,r=24,i=Math.PI*2){let a=new Te(e,t,n,r,i),o=a.attributes.uv;for(let n=0;n<o.count;n++)o.setXY(n,o.getX(n)*e*i,o.getY(n)*2*Math.PI*t);return a}function Pn(e,t=16){let n=e.map(e=>new f(Math.max(0,e[0]),e[1]));return new Oe(n,t)}function Fn(e,t,n=32,r=6,i=!1,a=.5){let o=new l(e,i,`catmullrom`,a),s=new ye(o,n,t,r,i),c=o.getLength(),u=s.attributes.uv;for(let e=0;e<u.count;e++)u.setXY(e,u.getX(e)*c,u.getY(e));return s}function In(e,{flip:t=!1,uvFn:n=null,closeJ:r=!1}={}){let i=e.length,a=e[0].length,o=new Float32Array(i*a*3),s=new Float32Array(i*a*2),c=0;for(let t=0;t<i;t++){t>0&&(c+=e[t][0].distanceTo(e[t-1][0]));let r=0;for(let i=0;i<a;i++){let l=e[t][i];i>0&&(r+=l.distanceTo(e[t][i-1]));let u=t*a+i;if(o[u*3]=l.x,o[u*3+1]=l.y,o[u*3+2]=l.z,n){let e=n(l,t,i,c,r);s[u*2]=e[0],s[u*2+1]=e[1]}else s[u*2]=c,s[u*2+1]=r}}let l=[],u=r?a:a-1;for(let e=0;e<i-1;e++)for(let n=0;n<u;n++){let r=(n+1)%a,i=e*a+n,o=(e+1)*a+n,s=(e+1)*a+r,c=e*a+r;t?l.push(i,o,c,o,s,c):l.push(i,c,o,c,s,o)}let d=new ke;return d.setAttribute(`position`,new N(o,3)),d.setAttribute(`uv`,new N(s,2)),d.setIndex(l),d.computeVertexNormals(),d}function Ln(e,n){let r=new t;for(let t of e)r.add(t);r.divideScalar(e.length);let i=[r.x,r.y,r.z];for(let t of e)i.push(t.x,t.y,t.z);let a=[];for(let t=0;t<e.length;t++)a.push(0,1+t,1+(t+1)%e.length);let o=new ke;return o.setAttribute(`position`,new N(i,3)),o.setIndex(a),Rn(o,n),o.computeVertexNormals(),zn(o,n),o}function Rn(e,n){let r=e.attributes.position,i=e.index.array,a=new t,o=new t,s=new t,c=new t,l=new t;for(let e=0;e<i.length;e+=3)a.fromBufferAttribute(r,i[e]),o.fromBufferAttribute(r,i[e+1]),s.fromBufferAttribute(r,i[e+2]),c.subVectors(o,a).cross(s.sub(a)),l.add(c);if(l.dot(n)<0){let t=Array.from(i);for(let e=0;e<t.length;e+=3){let n=t[e+1];t[e+1]=t[e+2],t[e+2]=n}e.setIndex(t)}return e}function zn(e,n){let r=n.clone().normalize(),i=Math.abs(r.y)>.9?new t(1,0,0):new t(0,1,0).cross(r).normalize(),a=new t().crossVectors(r,i),o=e.attributes.position,s=new Float32Array(o.count*2),c=new t;for(let e=0;e<o.count;e++)c.fromBufferAttribute(o,e),s[e*2]=c.dot(i),s[e*2+1]=c.dot(a);return e.setAttribute(`uv`,new N(s,2)),e}function Bn(e,n,r,{edges:i=!0,back:a=!0,front:o=!0}={}){let s=e.map(e=>new f(e[0],e[1])),c=n.map(e=>e.map(e=>new f(e[0],e[1])));T.isClockWise(s)&&s.reverse();for(let e of c)T.isClockWise(e)||e.reverse();let l=T.triangulateShape(s,c),u=s.concat(...c),d=[],p=e=>{let t=[],n=[];for(let i of u){let a=r(i.x,i.y,e);t.push(a.x,a.y,a.z),n.push(i.x,i.y)}let i=[];for(let e of l){let t=u[e[0]],n=u[e[1]],r=u[e[2]];Math.abs((n.x-t.x)*(r.y-t.y)-(r.x-t.x)*(n.y-t.y))>1e-10&&i.push(e[0],e[1],e[2])}let a=new ke;a.setAttribute(`position`,new N(t,3)),a.setAttribute(`uv`,new N(n,2)),a.setIndex(i);let o=s[0],c=r(o.x,o.y,e).sub(r(o.x,o.y,1-e));Rn(a,c),a.computeVertexNormals();let d=a.attributes.normal;c.normalize();for(let e=0;e<d.count;e++)Math.hypot(d.getX(e),d.getY(e),d.getZ(e))<.5&&d.setXYZ(e,c.x,c.y,c.z);return a};if(o&&d.push(p(0)),a&&d.push(p(1)),i){let e=[],n=[],i=[],a=[s,...c],o=new t,l=new t,u=new t,f=new t,p=new t,m=new t;for(let t of a){let a=0;for(let s=0;s<t.length;s++){let c=t[s],d=t[(s+1)%t.length],h=c.distanceTo(d);if(h<1e-6)continue;o.copy(r(c.x,c.y,0)),l.copy(r(c.x,c.y,1)),u.copy(r(d.x,d.y,0)),f.copy(r(d.x,d.y,1));let g=o.distanceTo(l),_=e.length/3;e.push(o.x,o.y,o.z,u.x,u.y,u.z,f.x,f.y,f.z,l.x,l.y,l.z),n.push(a,0,a+h,0,a+h,g,a,g),a+=h;let v=(c.x+d.x)/2,y=(c.y+d.y)/2,b=(d.y-c.y)/h*.01,x=-(d.x-c.x)/h*.01;m.copy(r(v+b,y+x,0)).sub(r(v,y,0)),p.subVectors(u,o).cross(Sn.subVectors(l,o)),p.dot(m)>=0?i.push(_,_+1,_+2,_,_+2,_+3):i.push(_,_+2,_+1,_,_+3,_+2)}}if(e.length){let t=new ke;t.setAttribute(`position`,new N(e,3)),t.setAttribute(`uv`,new N(n,2)),t.setIndex(i),t.computeVertexNormals(),d.push(t)}}return d.length===1?d[0]:Ce(d,!1)}function Vn(e,{closed:n=!1,flip:r=!1}={}){let i=n?e.map(e=>[...e,e[0].clone()]):e,a=In(i,{flip:r});if(n){let e=i[0].length,n=a.attributes.normal,r=new t,o=new t;for(let t=0;t<i.length;t++){let i=t*e,a=t*e+e-1;r.fromBufferAttribute(n,i),o.fromBufferAttribute(n,a),r.add(o).normalize(),n.setXYZ(i,r.x,r.y,r.z),n.setXYZ(a,r.x,r.y,r.z)}}return a}function Hn(e,n){let r=e.attributes.position,i=new Float32Array(r.count*3),a=new t;for(let e=0;e<r.count;e++){a.fromBufferAttribute(r,e);let t=Dn(n(a,e));i[e*3]=t.r,i[e*3+1]=t.g,i[e*3+2]=t.b}return e.setAttribute(`color`,new N(i,3)),e}function Un(e,n){let r=e.attributes.position,i=new Float32Array(r.count*4),a=new t;for(let e=0;e<r.count;e++){a.fromBufferAttribute(r,e);let t=n(a,e);i[e*4]=t[0],i[e*4+1]=t[1],i[e*4+2]=t[2],i[e*4+3]=t[3]}return e.setAttribute(`aux`,new N(i,4)),e}function Wn(e){return e.index?e.index.count/3:e.attributes.position.count/3}var Gn={gelcoat:15855334,lining:15328988,deck:14867919,antifouling:8002837,stainless:13685718},U=(e,n,r)=>new t(e,n,r);function Kn(e,t){qn(e,t),Zn(e,t),nr(e,t),ir(e,t),cr(e,t),ur(e,t)}function qn(e,t){let n=t.stationParams(60).map(e=>t.station(e,1)),r=e=>[e.z,e.y];e.add(`hull`,In(n,{uvFn:r}));let i=n.map(e=>e.map(e=>U(-e.x,e.y,e.z)));e.add(`hull`,In(i,{flip:!0,uvFn:r}));let a=n[0],o=[],s=[],c=[];for(let e of a)o.push(e.x,e.y,e.z,-e.x,e.y,e.z),c.push(e.x,e.y,-e.x,e.y);for(let e=0;e<a.length-1;e++){let t=2*e,n=2*e+1,r=2*e+2,i=2*e+3;a[e].x>1e-5&&s.push(t,n,r),s.push(n,i,r)}let l=new ke;l.setAttribute(`position`,new N(o,3)),l.setAttribute(`uv`,new N(c,2)),l.setIndex(s),Rn(l,U(0,0,-1)),l.computeVertexNormals(),$n(l,U(0,0,-1)),e.add(`hull`,l)}function Jn(e){let t=e.stationParams(28).map(t=>e.station(t,1).filter((e,t,n)=>t%2==0||t===n.length-1)),n=t[0].length,r=[],i=[],a=e=>(r.push(e.x,e.y,e.z),r.length/3-1),o=t.map(e=>e.map(a)),s=t.map(e=>e.map(e=>a(U(-e.x,e.y,e.z))));for(let e=0;e<t.length-1;e++)for(let t=0;t<n-1;t++){let n=o[e][t],r=o[e+1][t],a=o[e+1][t+1],c=o[e][t+1];i.push(n,c,r,c,a,r);let l=s[e][t],u=s[e+1][t],d=s[e+1][t+1],f=s[e][t+1];i.push(l,u,f,u,d,f)}for(let e=0;e<n-1;e++)i.push(o[0][e],s[0][e],o[0][e+1],s[0][e],s[0][e+1],o[0][e+1]);let c=n-1;for(let e=0;e<t.length-1;e++)i.push(o[e][c],s[e][c],o[e+1][c],s[e][c],s[e+1][c],o[e+1][c]);let l=(e,t)=>Math.abs(r[3*e]-r[3*t])+Math.abs(r[3*e+1]-r[3*t+1])+Math.abs(r[3*e+2]-r[3*t+2])<1e-7,u=[];for(let e=0;e<i.length;e+=3){let[t,n,r]=[i[e],i[e+1],i[e+2]];!l(t,n)&&!l(n,r)&&!l(t,r)&&u.push(t,n,r)}let d=new ke;return d.setAttribute(`position`,new N(r,3)),d.setIndex(u),d.computeVertexNormals(),d.computeBoundingBox(),d.computeBoundingSphere(),d}var Yn=[[3.74,-.093],[3.3,-.2],[3,-.265],[1.5,-.5],[0,-.62],[-1.5,-.7],[-3.05,-.77]];function Xn(e){let t=Yn;if(e>=t[0][0])return t[0][1];if(e<=t[t.length-1][0])return t[t.length-1][1];let n=0;for(;n<t.length-2&&e<t[n+1][0];)n++;let r=t[Math.max(0,n-1)],i=t[n],a=t[n+1],o=t[Math.min(t.length-1,n+2)],s=(i[0]-e)/(i[0]-a[0]),c=s*s,l=c*s;return .5*(2*i[1]+(-r[1]+a[1])*s+(2*r[1]-5*i[1]+4*a[1]-o[1])*c+(-r[1]+3*i[1]-3*a[1]+o[1])*l)}var W={zFront:3.74,zAft:-3.05,shoeAft:-3.68,bottom:-.77,shoeTop:-.74};function Zn(e,t){let n=[];for(let e=0;e<=32;e++){let r=e/32,i=R(W.zAft,W.zFront,r**.9),a=Xn(i),o=-t.draftAt(i),s=Math.max(o+.06,a+.02),c=hn(2.6,W.zFront,i),l=R(.065,.012,c),u=R(.042,.008,c),d=R(s,a,.55),f=[[l,s],[R(l,u,.6),d],[u,a+.035],[u*.75,a+.012],[u*.35,a+.002]],p=[];for(let e of f)p.push(U(e[0],e[1],i));p.push(U(0,a,i));for(let e=f.length-1;e>=0;e--)p.push(U(-f[e][0],f[e][1],i));n.push(p)}let r=Vn(n);er(r,e=>U(e.x,0,0),U(0,-1,0)),e.add(`hull`,r),e.add(`hull`,Ln(n[0],U(0,0,-1))),e.add(`hull`,Ln(n[32],U(0,0,1)));let i=W.zAft-W.shoeAft,a=B(.075,W.shoeTop-W.bottom,i);a.translate(0,(W.shoeTop+W.bottom)/2,(W.zAft+W.shoeAft)/2),e.add(`hull`,a),e.add(`fittings`,H(U(0,W.shoeTop,-3.58),U(0,W.shoeTop+.03,-3.58),.03,10),{color:11564618,rough:.4,metal:1}),e.add(`fittings`,H(U(0,-.53,W.zAft+.02),U(0,-.53,-3.27),.024,10),{color:13225168,rough:.25,metal:1}),e.add(`hull`,H(U(0,-.53,W.zAft+.06),U(0,-.53,W.zAft-.03),.05,12,.04))}function Qn(e){let t=(W.zFront-W.zAft)/240,n=0;for(let r=0;r<240;r++){let i=W.zAft+(r+.5)*t,a=Math.max(0,-e.draftAt(i)-Xn(i)),o=hn(2.6,W.zFront,i);n+=(R(.065,.012,o)+R(.042,.008,o))*a*t}return n+.075*(W.shoeTop-W.bottom)*(W.zAft-W.shoeAft)}function $n(e,t){let n=e.attributes.normal;for(let e=0;e<n.count;e++)Math.hypot(n.getX(e),n.getY(e),n.getZ(e))<.5&&n.setXYZ(e,t.x,t.y,t.z)}function er(e,t,n){let r=e.attributes.position,i=e.attributes.normal,a=0,o=U(0,0,0),s=U(0,0,0);for(let e=0;e<r.count;e++){o.fromBufferAttribute(r,e),s.fromBufferAttribute(i,e);let c=t(o);a+=c.lengthSq()>1e-10?s.dot(c):s.dot(n)}if(a<0){let t=Array.from(e.index.array);for(let e=0;e<t.length;e+=3){let n=t[e+1];t[e+1]=t[e+2],t[e+2]=n}e.setIndex(t),e.computeVertexNormals()}return e}function tr(e,t,n){return e.halfBreadth(t,n)-e.shell}function nr(e,t){let n=t.shell/t.length,r=t.tAtSheerZ(t.houseFront),i=[];for(let e=0;e<=40;e++){let a=R(n,r,e/40),o=t.sheerZ(a),s=t.sheerY(a),c=[];for(let e=0;e<=7;e++){let n=R(t.deckY,s,e/7);c.push(U(tr(t,a,n),n,o))}i.push(c)}let a=e=>[e.z,e.y],o=In(i,{uvFn:a,flip:!0}),s=In(i.map(e=>e.map(e=>U(-e.x,e.y,e.z))),{uvFn:a});e.add(`gelcoat`,o,{color:Gn.lining,rough:.4}),e.add(`gelcoat`,s,{color:Gn.lining,rough:.4});let c=t.zAft+t.shell,l=[],u=[],d=[];for(let e=0;e<=7;e++){let r=R(t.deckY,t.sheerY(n),e/7),i=tr(t,n,r);l.push(i,r,c,-i,r,c),u.push(i,r,-i,r)}for(let e=0;e<7;e++){let t=2*e,n=2*e+1,r=2*e+2,i=2*e+3;d.push(t,r,n,n,r,i)}let f=new ke;f.setAttribute(`position`,new N(l,3)),f.setAttribute(`uv`,new N(u,2)),f.setIndex(d),Rn(f,U(0,0,1)),f.computeVertexNormals(),e.add(`gelcoat`,f,{color:Gn.lining,rough:.4})}function rr(e,t,n){let r=Math.max(.001,e.sheerX(t)-e.shell),i=Math.min(1,Math.abs(n)/r);return e.sheerY(t)+.06*(1-i*i)}function ir(e,t){let n=t.shell/t.length,r=t.tAtSheerZ(t.houseFront),i={color:Gn.deck,rough:.5,pattern:1},a=e=>[e.x,e.z],o=[];for(let e=0;e<=40;e++){let i=R(n,r,e/40),a=t.sheerZ(i),s=tr(t,i,t.deckY),c=[];for(let e=0;e<=8;e++)c.push(U(R(s,-s,e/8),t.deckY,a));o.push(c)}let s=In(o,{uvFn:a});Rn(s,U(0,1,0)),s.computeVertexNormals(),e.add(`gelcoat`,s,i);let c=1;for(;t.sheerX(c)-t.shell<.012;)c-=5e-4;let l=[];for(let e=0;e<=30;e++){let n=R(r,c,1-(1-e/30)**1.3),i=t.sheerZ(n),a=Math.max(.012,t.sheerX(n)-t.shell),o=[];for(let e=0;e<=12;e++){let r=R(a,-a,e/12);o.push(U(r,rr(t,n,r),i))}l.push(o)}let u=In(l,{uvFn:a});Rn(u,U(0,1,0)),u.computeVertexNormals(),e.add(`gelcoat`,u,i);for(let n of[1,-1]){let r=[],i=t.houseBack,a=t.houseFront;for(let e=0;e<=12;e++){let n=R(i,a,e/12);r.push([n,ar(t,n)-.045])}for(let e=12;e>=0;e--){let n=R(i,a,e/12);r.push([n,t.sheerX(t.tAtSheerZ(n))-t.shell+.01])}let o=Bn(r,[],(e,r,i)=>{let a=t.tAtSheerZ(e);return U(n*r,t.sheerY(a)-(i?.04:0),e)});Un(o,e=>[.5,0,+(e.y>t.sheerY(t.tAtSheerZ(e.z))-.02),0]),e.add(`gelcoat`,o,{color:Gn.deck})}let d=t.deckY+.008;for(let[t,n,r,i]of[[.74,.03,0,-1.25],[.74,.03,0,-1.95],[.03,.73,.355,-1.6],[.03,.73,-.355,-1.6]]){let a=B(t,.016,n);a.translate(r,d,i),e.add(`gelcoat`,a,{color:14078404,rough:.45})}e.add(`fittings`,H(U(-.05,t.deckY+.004,-1.45),U(.05,t.deckY+.004,-1.45),.006,6),{color:Gn.stainless,rough:.3,metal:1})}function ar(e,t){return e.sheerX(e.tAtSheerZ(t))-.2}var or=.045;function sr(e,t,n,r,i){let a=(e+t)/2;return[[e,n-.012],[e,n+or-.012],[e+.01,n+or-.002],[a,n+or+.004],[t-.01,n+or-.002],[t,n+or-.012],[t,n-.026],[t-.018,n-.03]].map(e=>U(i*Math.max(0,e[0]),e[1],r))}function cr(e,t){let n=(t.shell+.03)/t.length;for(let r of[1,-1]){let i=[];for(let e=0;e<=60;e++){let a=R(n,1,1-(1-e/60)**1.25),o=t.sheerX(a),s=t.sheerZ(a),c=o+.022;e===60&&(c=0,s+=.03),i.push(sr(Math.max(0,o-t.shell-.03),c,t.sheerY(a),s,r))}let a=Vn(i);er(a,e=>U(e.x-r*(t.sheerX(t.tAtSheerZ(e.z))-.03),e.y-t.sheerY(t.tAtSheerZ(e.z))-.01,0),U(0,1,0)),lr(a,i),e.add(`wood`,a,{rough:.32}),e.add(`wood`,Ln(i[0],U(0,0,-1)),{rough:.32})}let r=t.sheerY(0),i=t.sheerX(0)+.022,a=t.zAft+t.shell+.03,o=t.zAft-.022,s=e=>sr(0,a-o,0,0,1).map(t=>U(e,r+t.y,a-t.x)),c=[];for(let e=0;e<=8;e++)c.push(s(R(-i,i,e/8)));let l=Vn(c);er(l,e=>U(0,e.y-r-.01,e.z-(a+o)/2),U(0,1,0)),lr(l,c),e.add(`wood`,l,{rough:.32}),e.add(`wood`,Ln(c[0],U(-1,0,0)),{rough:.32}),e.add(`wood`,Ln(c[8],U(1,0,0)),{rough:.32})}function lr(e,t){let n=t[0].length,r=e.attributes.uv,i=0;for(let e=0;e<t.length;e++){e>0&&(i+=t[e][3].distanceTo(t[e-1][3]));let a=0;for(let o=0;o<n;o++)o>0&&(a+=t[e][o].distanceTo(t[e][o-1])),r.setXY(e*n+o,i,a)}}function ur(e,t){let n=[-90,-60,-30,0,30,60,90].map(e=>e*Math.PI/180);for(let r of[1,-1]){let i=[];for(let e=0;e<=50;e++){let n=R(0,.992,1-(1-e/50)**1.25),r=t.sheerY(n)-.07,a=t.halfBreadth(n,r);i.push(U(a,r,t.zOnStation(n,r)))}let a=[],o=[];for(let e=0;e<=50;e++){let t=i[e],s=i[Math.max(0,e-1)],c=i[Math.min(50,e+1)],l=c.z-s.z,u=c.x-s.x,d=Math.hypot(u,l)||1,f=l/d,p=-u/d,m=n.map(e=>{let n=.036*Math.cos(e)-.006;return U(r*(t.x+f*n),t.y+.03*Math.sin(e),t.z+p*n)});a.push(m),o.push(U(r*(t.x+f*.034),t.y,t.z+p*.034))}let s=Vn(a);er(s,()=>U(r,0,0),U(r,0,0)),lr(s,a),e.add(`wood`,s,{rough:.35}),e.add(`wood`,Ln(a[0],U(0,0,-1)),{rough:.35}),e.add(`wood`,Ln(a[50],U(0,0,1)),{rough:.35}),e.add(`fittings`,Fn(o,.0065,64,4),{color:Gn.stainless,rough:.22,metal:1})}let r=t.sheerY(0)-.07,i=t.sheerX(0)+.015,a=[];for(let e=0;e<=6;e++){let o=R(-i,i,e/6);a.push(n.map(e=>U(o,r+.03*Math.sin(e),t.zAft-(.036*Math.cos(e)-.006))))}let o=Vn(a);er(o,e=>U(0,0,e.z-t.zAft+.001),U(0,0,-1)),lr(o,a),e.add(`wood`,o,{rough:.35}),e.add(`wood`,Ln(a[0],U(-1,0,0)),{rough:.35}),e.add(`wood`,Ln(a[6],U(1,0,0)),{rough:.35})}var G=(e,n,r)=>new t(e,n,r),dr={color:Gn.stainless,rough:.22,metal:1},fr={color:10725291,rough:.35,metal:1},pr={color:1710877,rough:.55,metal:0};function mr(e=[16738835,16052714,1920924],t=.35){let n=[[[0,0],[.03,.004],[.055,.025],[.07,.07],[.075,.12],[.075,.17]],[[.075,.17],[.075,.22],[.075,.27]],[[.075,.27],[.074,.33],[.068,.39],[.052,.435],[.03,.455],[0,.46]]].map((t,n)=>[Pn(t,12),{color:e[n],rough:.55}]);return n.push([V(.011,.013,.46+t+.06,6).translate(0,(.46+t-.06)/2,0),{color:10254924,rough:.75}]),n}function hr(e,t,n){yr(e,t),xr(e,t),Cr(e,t),wr(e,t),Er(e,t),Or(e,t),kr(e,t),Ar(e,t),Mr(e,t,n)}function gr(e,t,n,r,i,a,o=0){let s=new ke;return s.setAttribute(`position`,new N([e.x,e.y,e.z,t.x,t.y,t.z,n.x,n.y,n.z,r.x,r.y,r.z],3)),s.setAttribute(`uv`,new N([0,0,i,0,i,a,0,a],2)),s.setIndex([0,1,2,0,2,3]),s.computeVertexNormals(),{g:s,opts:{rough:i,metal:a,pattern:o}}}var _r={L:.95,W:.55,H:.37},vr=[[.66,0,-3.25,.02,14201372],[.66,1,-3.23,-.03,3111484],[.64,0,-2.2,-.04,14201372],[-.68,0,-3.25,.03,2040614]];function yr(e,t){let{L:n,W:r,H:i}=_r;for(let[a,o,s,c,l]of vr){let u=z(a,t.deckY+.03+o*(i+.035),s,0,c,0),d=(t,n=l)=>{t.g.applyMatrix4(u),e.add(`trap`,t.g,{...t.opts,color:n})},f=r/2,p=n/2;d(gr(G(-f,0,p),G(f,0,p),G(f,i,p),G(-f,i,p),r,i)),d(gr(G(f,0,-p),G(-f,0,-p),G(-f,i,-p),G(f,i,-p),r,i)),d(gr(G(f,0,p),G(f,0,-p),G(f,i,-p),G(f,i,p),n,i)),d(gr(G(-f,0,-p),G(-f,0,p),G(-f,i,p),G(-f,i,-p),n,i)),d(gr(G(-f,i,p),G(f,i,p),G(f,i,-p),G(-f,i,-p),r,n)),d(gr(G(-f,0,-p),G(f,0,-p),G(f,0,p),G(-f,0,p),r,n)),d(gr(G(-f,0,.08),G(f,0,.08),G(f,i,.08),G(-f,i,.08),r,i));for(let e of[1,-1]){let t=i*.5,n=[G(e*f,t-.12,-.35),G(e*f,t-.12,-.05000000000000002),G(e*f,t+.12,-.05000000000000002),G(e*f,t+.12,-.35)],r=[G(e*.07,t-.045,-.26),G(e*.07,t-.045,-.14),G(e*.07,t+.045,-.14),G(e*.07,t+.045,-.26)];for(let e=0;e<4;e++){let t=(e+1)%4;d(gr(n[e],n[t],r[t],r[e],n[e].distanceTo(n[t]),n[e].distanceTo(r[e]),1),2510702)}}for(let t of[-.2,0,.2]){let r=B(.05,.032,n+.02);r.translate(t,-.012,0),r.applyMatrix4(u),e.add(`wood`,r,{color:10132114,rough:.8})}for(let t of[-.3,.3]){let n=B(.2,.06,.09);n.translate(.05,.035,t),n.applyMatrix4(u),e.add(`fittings`,n,{color:9320998,rough:.9})}let m=Mn(.06,8,6);m.scale(1,1.3,1),m.translate(0,i-.1,-.2),m.applyMatrix4(u),e.add(`fittings`,m,{color:11740702,rough:.8})}}var br={x:-1,z:-.62,y:1.34};function xr(e,t){let n=t.tAtSheerZ(-.78),r=-(t.sheerX(n)-.035),i=t.sheerY(n)+.045,a=[G(r,i,-.8),G(r-.02,i+.45,-.78),G(r-.05,1.86,-.76),G(r-.13,2.06,-.74),G(r-.3,2.11,-.73),G(r-.43,2.07,-.72)];e.add(`fittings`,Fn(a,.03,32,8),dr);let o=jn(.12,.02,.16,.008,1);o.translate(r,i+.01,-.8),e.add(`fittings`,o,dr);let s=a[a.length-1],c=Mn(.03,10,6);c.translate(s.x,s.y,s.z),e.add(`fittings`,c,dr),e.add(`fittings`,H(s,s.clone().add(G(0,-.12,0)),.01,6),dr);let l=s.clone().add(G(0,-.22,0));for(let t of[-.022,.022]){let n=V(.085,.085,.01,16);n.applyMatrix4(z(l.x,l.y,l.z+t,Math.PI/2,0,0)),e.add(`fittings`,n,fr)}let u=V(.07,.07,.034,16);u.applyMatrix4(z(l.x,l.y,l.z,Math.PI/2,0,0)),e.add(`fittings`,u,{color:2829616,rough:.6});let{x:d,y:f,z:p}=br;e.add(`fittings`,H(G(d,t.deckY,p+.1),G(d,f-.1,p+.1),.038,12),fr);let m=B(.2,.012,.2);m.translate(d,t.deckY+.006,p+.1),e.add(`fittings`,m,fr);let h=V(.075,.075,.17,18);h.applyMatrix4(z(d,f,p+.13,Math.PI/2,0,0)),e.add(`fittings`,h,{color:3817544,rough:.45,metal:.3});let g=Pn([[0,-.05],[.2,-.05],[.205,-.04],[.1,-.006],[.1,.006],[.205,.04],[.2,.05],[0,.05]],28);g.applyMatrix4(z(d,f,p,Math.PI/2,0,0)),e.add(`fittings`,g,fr);let _=V(.04,.05,.03,12);_.applyMatrix4(z(d,f,p-.06,Math.PI/2,0,0)),e.add(`fittings`,_,fr),e.add(`fittings`,Fn([G(d+.05,f,p+.2),G(d+.12,f-.2,p+.3),G(d+.1,.6,p+.28),G(d+.06,t.deckY+.02,p+.25)],.012,20,5),pr),e.add(`fittings`,Fn([G(d-.05,f,p+.2),G(d-.02,f-.25,p+.32),G(d+.02,.62,p+.3),G(d+.02,t.deckY+.02,p+.28)],.012,20,5),pr);let v=[l.clone().add(G(.07,0,0)),G(d-.3,f+.35,p+.02),G(d-.12,f+.2,p),G(d+.2,f-.02,p-.01),G(d+.16,f-.25,p-.01),G(d+.05,.72,p-.1),G(d+.2,t.deckY+.02,p-.35)];e.add(`fittings`,Fn(v,.009,48,4),{color:14991925,rough:.8,pattern:1})}function Sr(e,t,n,r,i,a,o){let s=[],c=r*12;for(let l=0;l<=c;l++){let u=l/c,d=l/12*Math.PI*2+o,f=i*(1-.12*u)+.012*Math.sin(l*.9+o*3),p=t+a+u*r*a*1.35+.004*Math.sin(l*1.7+o);s.push(G(e+Math.cos(d)*f,p,n+Math.sin(d)*f))}let l=s[s.length-1];return s.push(G(l.x*.7+e*.3+.12,l.y-.01,l.z+.2),G(l.x+.35,t+a,l.z+.4)),Fn(s,a,r*21+10,4)}function Cr(e,t){e.add(`fittings`,Sr(-.5,t.deckY,-2.15,5,.22,.011,.3),{color:14991925,rough:.8,pattern:1});let n=t.deckY+.03+_r.H+.012;e.add(`fittings`,Sr(-.68,n,-3.2,4,.19,.01,1.7),{color:3108687,rough:.8,pattern:1})}function wr(e,t){let n=[[-.2,t.deckY+.075,-2.75,Math.PI/2,.4],[.12,t.deckY+.075,-3,Math.PI/2,-.9]];for(let[t,r,i,a,o]of n){let n=z(t,r,i,a,o,0,1,1,1,`YXZ`);for(let[t,r]of mr(void 0,.3))t.translate(0,-.23,0),t.applyMatrix4(n),e.add(`fittings`,t,r)}}var Tr=[[-1,-2.4],[-1,-1.05],[-1,.65],[1,-1.7]];function Er(e,t){let n=[[0,0],[.03,.004],[.055,.016],[.07,.04],[.075,.07],[.075,.43],[.07,.46],[.055,.484],[.03,.496],[0,.5]];for(let[r,i]of Tr){let a=r*(t.hullXAt(i,.8099999999999999)+.08),o=Pn(n,12);o.translate(a,.36,i),e.add(`fittings`,o,{color:1915494,rough:.45});let s=Nn(.018,.006,5,10);s.translate(a,.878,i),e.add(`fittings`,s,{color:1915494,rough:.45});let c=t.tAtSheerZ(i),l=t.sheerY(c)+.05,u=r*(t.sheerX(c)+.01),d=r*(t.sheerX(c)-t.shell-.05),f=[G(a,.89,i),G(a-r*.01,(.86+l)/2,i),G(u,l,i),G((u+d)/2,l+.012,i),G(d,l-.03,i)];e.add(`fittings`,Fn(f,.006,16,4),{color:15790056,rough:.8,pattern:1})}}function Dr(e,t,n=.2){let r=[],i=V(.011,.011,n*.7,8);i.applyMatrix4(z(0,.045,0,Math.PI/2,0,0)),r.push(i);for(let e of[1,-1]){let t=V(.006,.011,n*.15,8);t.applyMatrix4(z(0,.045,e*n*.425,e*Math.PI/2,0,0)),r.push(t);let i=V(.013,.018,.045,8);i.translate(0,.0225,e*n*.22),r.push(i)}let a=z(e.x,e.y,e.z,0,t,0);return r.map(e=>e.applyMatrix4(a))}function Or(e,t){let n=[];for(let e of[1,-1])for(let r of[-3.6,-1.35]){let i=t.tAtSheerZ(r);n.push(...Dr(G(e*(t.sheerX(i)-.04),t.sheerY(i)+.048,r),0))}let r=t.tAtSheerZ(3.35);n.push(...Dr(G(0,rr(t,r,0),3.35),Math.PI/2,.24));for(let t of n)e.add(`fittings`,t,dr)}function kr(e,t){let n=t.sheerY(1),r=jn(.09,.05,.3,.015,2);r.translate(0,n+.03,t.zBow-.08),e.add(`fittings`,r,dr);for(let r of[1,-1]){let i=B(.008,.07,.16);i.translate(r*.04,n+.08,t.zBow+.02),e.add(`fittings`,i,dr)}let i=V(.03,.03,.07,12);i.applyMatrix4(z(0,n+.085,t.zBow+.07,0,0,Math.PI/2)),e.add(`fittings`,i,pr);let a=G(0,n+.1,t.zBow-.45),o=G(0,n+.12,t.zBow+.13);e.add(`fittings`,H(a,o,.017,8),fr);let s=V(.025,.025,.07,10);s.applyMatrix4(z(o.x,o.y,o.z,0,0,Math.PI/2)),e.add(`fittings`,s,fr);let c=G(0,-.85,-.4).normalize(),l=new he(.12,.34,4);l.rotateY(Math.PI/4),l.scale(1,1,.38),l.applyMatrix4(En(o.clone().add(G(0,-.02,.02)).addScaledVector(c,.17),c)),e.add(`fittings`,l,fr);let u=rr(t,t.tAtSheerZ(t.zBow-.75),0),d=V(.035,.045,.04,14);d.translate(0,u+.02,t.zBow-.75),e.add(`fittings`,d,dr),e.add(`fittings`,Fn([a,G(0,R(a.y,u,.6)+.03,t.zBow-.6),G(0,u+.04,t.zBow-.75)],.012,10,5),fr)}function Ar(e,t){let n=new xe(.43,.37,.36,4,1);n.rotateY(Math.PI/4),n.scale(1,1,.62),n.translate(-.72,t.deckY+.18,-1.45),e.add(`fittings`,n,{color:2778288,rough:.55});let r=B(.52,.02,.33);r.translate(-.72,t.deckY+.352,-1.45),e.add(`fittings`,r,{color:5909538,rough:.35});let i=.86,a=-.8,o=V(.26,.26,.78,20);o.translate(i,t.deckY+.39,a),e.add(`fittings`,o,{color:2055846,rough:.5});for(let n of[.26,.52]){let r=Nn(.262,.012,5,24);r.applyMatrix4(z(i,t.deckY+n,a,Math.PI/2,0,0)),e.add(`fittings`,r,{color:2055846,rough:.5})}let s=V(.27,.27,.03,20);s.translate(i,t.deckY+.795,a),e.add(`fittings`,s,{color:1789836,rough:.5})}var jr={w:.5,h:.33};function Mr(e,t,n){let r=t.sheerY(0)+.045,i=V(.03,.035,.03,12);i.translate(0,r+.015,t.zAft+.03),e.add(`fittings`,i,pr);let a=V(.025,.025,.05,12);a.translate(0,r+.055,t.zAft+.03),e.add(`glow`,a,{color:16774108,rough:.2,pattern:0});let o=V(.03,.028,.012,12);o.translate(0,r+.086,t.zAft+.03),e.add(`fittings`,o,pr);let s=-(t.sheerX(.02)-.08),c=t.zAft+.14,l=r+1;e.add(`fittings`,H(G(s,r-.02,c),G(s,l,c),.014,8,.01),{color:15855592,rough:.3});let u=Mn(.02,8,6);u.translate(s,l+.015,c),e.add(`fittings`,u,{color:13148240,rough:.25,metal:1});let d=V(.022,.026,.06,10);d.translate(s,r+.01,c),e.add(`fittings`,d,dr);let{w:f,h:p}=jr,m=[],h=[],g=[];for(let e=0;e<=6;e++)for(let t=0;t<=12;t++){let n=t/12,r=e/6;m.push(s,l-.03-p+r*p,c-n*f),h.push(n,r)}for(let e=0;e<6;e++)for(let t=0;t<12;t++){let n=e*13+t,r=n+1,i=n+12+2,a=n+12+1;g.push(n,r,i,n,i,a)}for(let t of[!1,!0]){let n=new ke;n.setAttribute(`position`,new N(m,3)),n.setAttribute(`uv`,new N(h,2));let r=t?g.map((e,t)=>g[t-t%3+(2-t%3)]):g.slice();n.setIndex(r),n.computeVertexNormals(),Un(n,(e,t)=>[.7,0,2,h[t*2]]),e.add(`fittings`,n,{color:16777215})}n.flagPivot=G(s,0,c)}var K=(e,n,r)=>new t(e,n,r),q={wallT:.045,wsBottomY:1.48,wsTopY:2.24,roofUnderY:2.31,roofZ0:-.95,roofZ1:1.34,winBottom:1.56,winTop:2.12,dash:{zFace:.98,yKnee:1.08,zTop:1.16,yTop:1.4,zBack:1.41,halfW:1.1},helmX:-.55,seatZ:.22},J={color:Gn.stainless,rough:.22,metal:1},Nr={color:1710877,rough:.55,metal:0},Pr={color:15855851,rough:.35,metal:0},Fr={color:10791083,rough:.55,metal:1},Ir={color:2042426,rough:.6,metal:0};function Lr(e,t){return e.houseFront-(t-q.wsBottomY)*(.25/.76)}function Rr(e,t,n){return ar(e,t)-Math.max(0,n-1.15)*.04}function zr(e){return 2.375+.035*(1-(e/1.35)**2)}function Br(e,t){let n=e.length,r=Vr(e)>0,i=[];for(let a=0;a<n;a++){let o=e[a],s=e[(a+1)%n],c=s[0]-o[0],l=s[1]-o[1],u=Math.hypot(c,l),d=l/u,f=-c/u;r||(d=-d,f=-f),i.push([o[0]+d*t,o[1]+f*t,c,l])}let a=[];for(let e=0;e<n;e++){let t=i[(e+n-1)%n],r=i[e],o=t[2]*r[3]-t[3]*r[2],s=((r[0]-t[0])*r[3]-(r[1]-t[1])*r[2])/o;a.push([t[0]+t[2]*s,t[1]+t[3]*s])}return a}function Vr(e){let t=0;for(let n=0;n<e.length;n++){let r=e[n],i=e[(n+1)%e.length];t+=r[0]*i[1]-i[0]*r[1]}return t}function Hr(e,t,n){Wr(e,t),Gr(e,t),qr(e,t),Zr(e,t,n),Qr(e,t),ei(e,t),ni(e,t,n)}function Ur(e){let{winBottom:t,winTop:n}=q,r=t=>Lr(e,t)-.1;return[[[.3,t],[.78,t],[.78,n],[.3,n]],[[.84,t],[r(t),t],[r(n),n],[.84,n]]]}function Wr(e,t){let{wallT:n,roofUnderY:r}=q,i=t.houseBack,a=t.houseFront,o=[];for(let e=0;e<=8;e++){let n=R(i,a,e/8);o.push([n,t.sheerY(t.tAtSheerZ(n))])}o.push([a,q.wsBottomY]),o.push([Lr(t,r),r]),o.push([i,r]);let s=Ur(t);for(let r of[1,-1]){let i=Bn(o,s,(e,i,a)=>K(r*(Rr(t,e,i)-a*n),i,e));Un(i,e=>Math.abs(e.x)<Rr(t,e.z,e.y)-n*.5?[.5,0,2,0]:[.3,0,0,0]),e.add(`gelcoat`,i,{color:Gn.gelcoat});for(let i of s){let a=Br(i,.024);e.add(`fittings`,Bn(a,[Br(i,-.006)],(e,i,a)=>K(r*(Rr(t,e,i)+.008-a*(n+.016)),i,e)),Fr),e.add(`fittings`,Bn(Br(i,-.005),[Br(i,-.014)],(e,i,a)=>K(r*(Rr(t,e,i)+.004-a*(n+.008)),i,e)),{color:921360,rough:.8});let o=Br(i,.011);for(let i=0;i<o.length;i++){let a=o[i],s=o[(i+1)%o.length],c=Math.hypot(s[0]-a[0],s[1]-a[1]),l=Math.max(2,Math.round(c/.075));for(let i=0;i<l;i++){let o=R(a[0],s[0],(i+.5)/l),c=R(a[1],s[1],(i+.5)/l),u=r*(Rr(t,o,c)+.008-(n+.016)-.001),d=V(.0045,.0045,.003,6);d.applyMatrix4(z(u,c,o,0,0,Math.PI/2)),e.add(`fittings`,d,{color:13225168,rough:.35,metal:1})}}}let a=.81,c=1.84,l=B(.02,.06,.025);l.translate(r*(Rr(t,a,c)-n-.012),c,a),e.add(`fittings`,l,Nr)}let c=t.tAtSheerZ(t.houseFront),l=ar(t,t.houseFront),u=[];for(let e=0;e<=10;e++){let n=R(-l,l,e/10);u.push([n,rr(t,c,n)-.012])}u.push([l,q.wsBottomY],[-l,q.wsBottomY]);let d=Bn(u,[],(e,n,r)=>K(e,n,t.houseFront-r*.04));Un(d,e=>e.z<t.houseFront-.02?[.5,0,2,0]:[.3,0,0,0]),e.add(`gelcoat`,d,{color:Gn.gelcoat})}function Gr(e,n){let{wsBottomY:r,roofUnderY:i}=q,a=new t(0,.76,-.25).normalize(),o=new t(0,.25,.76).normalize(),s=K(0,r,n.houseFront),c=(i-r)/a.y,l=(e,t)=>s.clone().addScaledVector(a,t).setX(e),u=e=>{let t=l(0,e);return Rr(n,t.z,t.y)},d=u(0),f=u(c),p=[[-d,0],[d,0],[f,c],[-f,c]],m=.07,h=.75,g=[[[-.36,m],[.36,m],[.36,h],[-.36,h]],[[.42,m],[u(m)-.09,m],[u(h)-.09,h],[.42,h]],[[-.42,m],[-.42,h],[-u(h)+.09,h],[-u(m)+.09,m]]];e.add(`gelcoat`,Bn(p,g,(e,t,n)=>l(e,t).addScaledVector(o,-n*.05)),{color:Gn.gelcoat,rough:.3});for(let t of g){let n=Br(t,.022);e.add(`fittings`,Bn(n,[Br(t,-.006)],(e,t,n)=>l(e,t).addScaledVector(o,.008-n*.066)),Fr)}for(let[t,n]of[[0,.25],[-.72,.2]]){let r=l(t,.1).addScaledVector(o,.012),i=a.clone().applyAxisAngle(o,n),s=H(r,r.clone().addScaledVector(i,.52),.006,5);e.add(`fittings`,s,Nr),e.add(`fittings`,H(r.clone().addScaledVector(o,-.01),r.clone().addScaledVector(o,.012),.014,8),Nr)}}function Kr(e,t){let n=Rr(e,Math.min(Math.max(t,e.houseBack),1.18),q.roofUnderY)+.09,r=.22,i=Math.min(t-q.roofZ0,q.roofZ1-t);return i<r&&(n-=r-Math.sqrt(Math.max(0,r*r-(r-i)**2))),n}function qr(e,t){let n=q.roofUnderY,r=[],i=[];for(let e=0;e<=22;e++){let t=e/22,n=.5-.5*Math.cos(Math.PI*t);i.push(R(q.roofZ0,q.roofZ1,R(t,n,.6)))}for(let e of[t.houseBack,t.houseFront])for(let t of[-.012,.012]){let n=e+t;n>q.roofZ0+.02&&n<q.roofZ1-.02&&i.push(n)}i.sort((e,t)=>e-t);for(let e of i){let i=Kr(t,e),a=Rr(t,Math.min(Math.max(e,t.houseBack),t.houseFront),n)-q.wallT,o=[[0,n],[a*.5,n],[a-.01,n],[a+.01,n],[i-.03,n],[i-.008,n+.008],[i,n+.025],[i-.004,zr(i)-.012],[i-.02,zr(i)],[i*.75,zr(i*.75)],[i*.5,zr(i*.5)],[i*.25,zr(i*.25)],[0,zr(0)]],s=o.map(t=>K(t[0],t[1],e));for(let t=o.length-2;t>=1;t--)s.push(K(-o[t][0],o[t][1],e));r.push(s)}let a=r.length-1,o=Vn(r,{closed:!0});Jr(o,e=>K(e.x,e.y-2.345,0)),Yr(o,e=>[e.x,e.z]),Un(o,e=>e.y>n+.03?[.35,0,1,0]:[.35,0,e.z>t.houseBack&&e.z<t.houseFront&&Math.abs(e.x)<Rr(t,Math.min(Math.max(e.z,t.houseBack),t.houseFront),n)-q.wallT?3:0,0]),e.add(`gelcoat`,o,{color:Gn.gelcoat}),e.add(`gelcoat`,Ln(r[0],K(0,0,-1)),{color:Gn.gelcoat,rough:.3}),e.add(`gelcoat`,Ln(r[a],K(0,0,1)),{color:Gn.gelcoat,rough:.3});for(let t of[1,-1]){let n=t*1.1,r=zr(1.1)+.07;e.add(`fittings`,H(K(n,r,-.7),K(n,r,.95),.013,8),J);for(let t of[-.7,-.12,.45,.95])e.add(`fittings`,H(K(n,zr(1.1)-.01,t),K(n,r,t),.011,6),J)}}function Jr(e,t){let n=e.attributes.position,r=e.attributes.normal,i=0,a=K(0,0,0),o=K(0,0,0);for(let e=0;e<n.count;e++)a.fromBufferAttribute(n,e),o.fromBufferAttribute(r,e),i+=o.dot(t(a));if(i<0){let t=Array.from(e.index.array);for(let e=0;e<t.length;e+=3){let n=t[e+1];t[e+1]=t[e+2],t[e+2]=n}e.setIndex(t),e.computeVertexNormals()}}function Yr(e,t){let n=e.attributes.position,r=new Float32Array(n.count*2),i=K(0,0,0);for(let e=0;e<n.count;e++){i.fromBufferAttribute(n,e);let a=t(i);r[e*2]=a[0],r[e*2+1]=a[1]}e.setAttribute(`uv`,new N(r,2))}function Xr(){let e=q.dash,t=new f(e.zFace,e.yKnee),n=new f(e.zTop,e.yTop),r=n.clone().sub(t).normalize();return{along:K(0,r.y,r.x),normal:K(0,r.x,-r.y),at:(e,r)=>K(e,R(t.y,n.y,r),R(t.x,n.x,r)),length:t.distanceTo(n),angle:Math.atan2(r.x,r.y)}}function Zr(e,t,n){let r=q.dash,i=[[r.zFace,t.deckY],[r.zFace,r.yKnee],[r.zTop,r.yTop],[r.zBack,r.yTop],[r.zBack,t.deckY]],a=[];for(let e=0;e<i.length;e++){let t=i[e],n=i[(e+1)%i.length];for(let e=0;e<6;e++)a.push([R(t[0],n[0],e/6),R(t[1],n[1],e/6)])}let o=(e,n)=>Math.min(r.halfW,t.halfBreadth(t.tAtSheerZ(e),Math.min(n,t.sheerY(t.tAtSheerZ(e))))-t.shell-.004),s=Bn(a,[],(e,t,n)=>K((n?-1:1)*o(e,t),t,e));Un(s,()=>[.5,0,2,0]),e.add(`gelcoat`,s,{color:Gn.gelcoat});let c=B(r.halfW*2-.01,.01,r.zBack-r.zTop);c.translate(0,r.yTop+.005,(r.zBack+r.zTop)/2),e.add(`gelcoat`,c,{color:2763823,rough:.85});let l=Xr(),u=B(r.halfW*2-.04,l.length-.02,.012);u.applyMatrix4(z(0,0,0,l.angle,0,0)),u.translate(...l.at(0,.5).addScaledVector(l.normal,.004).toArray()),e.add(`fittings`,u,{color:1908514,rough:.7,pattern:4});let d=B(r.halfW*2-.02,.03,.022);d.translate(0,r.yTop+.02,r.zTop+.011),e.add(`wood`,d,{rough:.3});for(let[t,n]of[[-.76,.72],[-.34,.72],[-.55,.9],[-.12,.5],[.02,.5]]){let r=l.at(t,n).addScaledVector(l.normal,.012),i=new b().makeBasis(K(-1,0,0),l.along,l.normal).setPosition(r),a=Nn(.043,.006,4,16);a.applyMatrix4(i),e.add(`fittings`,a,J);let o=new De(.042,20);o.applyMatrix4(new b().makeBasis(K(-1,0,0),l.along,l.normal).setPosition(r.clone().addScaledVector(l.normal,.001))),e.add(`glow`,o,{color:16777215,rough:.2,pattern:3})}let f=l.at(.55,.45).addScaledVector(l.normal,.012),p=new b().makeBasis(K(-1,0,0),l.along,l.normal).setPosition(f),m=B(.34,.1,.008);m.applyMatrix4(p),e.add(`fittings`,m,{color:2961462,rough:.5,pattern:4});let h=B(.3,.014,.002);h.applyMatrix4(new b().makeBasis(K(-1,0,0),l.along,l.normal).setPosition(f.clone().addScaledVector(l.along,-.038).addScaledVector(l.normal,.005))),e.add(`fittings`,h,{color:16777215,rough:.5,pattern:8});for(let t=0;t<6;t++){let n=B(.03,.045,.015);n.applyMatrix4(new b().makeBasis(K(-1,0,0),l.along,l.normal).setPosition(f.clone().add(K(-.13+t*.052,0,0)).addScaledVector(l.normal,.008))),e.add(`fittings`,n,{color:1118740,rough:.4});let r=B(.008,.008,.004);r.applyMatrix4(new b().makeBasis(K(-1,0,0),l.along,l.normal).setPosition(f.clone().add(K(-.13+t*.052,0,0)).addScaledVector(l.along,.035).addScaledVector(l.normal,.006))),e.add(`glow`,r,{color:t%3==0?3407718:16733474,rough:.3,pattern:6})}let g=l.at(q.helmX,.45),_=g.clone().addScaledVector(l.normal,.14);e.add(`fittings`,H(g.clone().addScaledVector(l.normal,-.01),_.clone().addScaledVector(l.normal,-.03),.02,10),J);let v=V(.05,.055,.025,16);v.applyMatrix4(En(g.clone().addScaledVector(l.normal,.008),l.normal)),e.add(`fittings`,v,{color:2829616,rough:.5}),n.wheelCenter=_,n.wheelAxis=l.normal.clone().negate();let y=-.93,x=1.24,S=jn(.1,.075,.15,.015,1);S.translate(y,r.yTop+.01+.0375,x),e.add(`fittings`,S,Nr);let C=B(.085,.004,.13);C.translate(y,r.yTop+.01+.077,x),e.add(`fittings`,C,J),n.throttlePivot=K(y,r.yTop+.09,x);let w=q.helmX,T=1.3,E=Pn([[0,0],[.07,0],[.072,.02],[.062,.045],[0,.045]],20);E.translate(w,r.yTop+.01,T),e.add(`fittings`,E,Nr);let D=V(.05,.05,.01,20);D.translate(w,r.yTop+.06,T),e.add(`fittings`,D,{color:2894890,rough:.5});let O=B(.004,.02,.008);O.translate(w,r.yTop+.07,1.345),e.add(`fittings`,O,{color:13647914,rough:.5});let k=Mn(.058,20,8,0,Math.PI*2,0,Math.PI/2);k.translate(w,r.yTop+.053,T),e.add(`glass`,k);for(let[t,n]of[[-.06,1],[.38,2]]){let i=.27,a=z(t,r.yTop+.01+i/2+.03,1.29,.3,0,0),o=jn(.36,i,.07,.018,1);o.applyMatrix4(a),e.add(`fittings`,o,Nr);let s=B(.1,.05,.08);s.translate(t,r.yTop+.035,1.3),e.add(`fittings`,s,Nr);let c=new ge(.31,.21000000000000002);c.applyMatrix4(new b().makeRotationY(Math.PI)),c.applyMatrix4(z(0,.012,-.037)),c.applyMatrix4(a);let l=c.attributes.uv;for(let e=0;e<l.count;e++)l.setX(e,1-l.getX(e));e.add(`glow`,c,{color:16777215,rough:.15,pattern:n})}let ee=1.02,te=q.roofUnderY-.07,ne=jn(.9,.13,.3,.02,1);ne.applyMatrix4(z(-.15,te,ee,-.25,0,0)),e.add(`fittings`,ne,{color:2369066,rough:.6});let A=z(-.15,te,ee,-.25,0,0),re=B(.2,.06,.02);re.applyMatrix4(new b().makeTranslation(-.18,0,-.155)),re.applyMatrix4(A),e.add(`fittings`,re,{color:1118740,rough:.4});let j=new ge(.09,.03);j.applyMatrix4(new b().makeRotationY(Math.PI)),j.applyMatrix4(new b().makeTranslation(-.2,.005,-.168)),j.applyMatrix4(A),e.add(`glow`,j,{color:8257434,rough:.2,pattern:6});for(let t of[-.06,.1,.26]){let n=V(.012,.012,.02,10);n.applyMatrix4(new b().makeRotationX(Math.PI/2)),n.applyMatrix4(new b().makeTranslation(t,0,-.16)),n.applyMatrix4(A),e.add(`fittings`,n,J)}let ie=jn(.05,.08,.03,.01,1);ie.translate(-.02,te-.2,.9),e.add(`fittings`,ie,Nr),e.add(`fittings`,Fn([K(-.05,te-.04,.87),K(-.08,te-.1,.88),K(-.04,te-.14,.89),K(-.02,te-.16,.9)],.004,16,4),Nr);let ae=V(.08,.085,.012,20);ae.translate(0,q.roofUnderY-.006,.42),e.add(`glow`,ae,{color:16770744,rough:.4,pattern:5});let oe=B(.5,.62,.01);oe.translate(.55,.72,r.zFace-.004),e.add(`fittings`,oe,{color:1184533,rough:.9});for(let[t,n,i,a]of[[.56,.03,.55,1.045],[.56,.03,.55,.395],[.03,.68,.285,.72],[.03,.68,.815,.72]]){let o=B(t,n,.022);o.translate(i,a,r.zFace-.011),e.add(`wood`,o,{rough:.3})}}function Qr(e,t){let n=q.helmX,r=q.seatZ,i=t.deckY,a=V(.18,.19,.012,20);a.translate(n,i+.006,r),e.add(`fittings`,a,J),e.add(`fittings`,H(K(n,i,r),K(n,.92,r),.042,14),J);let o=Nn(.17,.011,6,28);o.applyMatrix4(z(n,.62,r,Math.PI/2,0,0)),e.add(`fittings`,o,J);for(let t=0;t<3;t++){let i=t*Math.PI*2/3+.5;e.add(`fittings`,H(K(n+Math.cos(i)*.04,.62,r+Math.sin(i)*.04),K(n+Math.cos(i)*.165,.62,r+Math.sin(i)*.165),.008,6),J)}let s=jn(.44,.045,.4,.015,1);s.translate(n,.94,r),e.add(`fittings`,s,{color:2829875,rough:.5});let c=jn(.46,.085,.42,.035,1);c.translate(n,1,r),e.add(`fittings`,c,Ir);let l=jn(.44,.3,.075,.03,1);l.applyMatrix4(z(n,1.22,r-.2,-.17,0,0)),e.add(`fittings`,l,Ir),e.add(`fittings`,H(K(n,.96,r-.17),K(n,1.12,r-.2),.018,8),J);let u=jn(.42,.4,.75,.02,1);u.translate(.86,i+.2,.45),e.add(`gelcoat`,u,{color:Gn.gelcoat,rough:.35});let d=jn(.42,.07,.73,.03,1);d.translate(.86,i+.435,.45),e.add(`fittings`,d,Ir)}function $r(e,t,n,r){return t*(Rr(e,n,r)-q.wallT)}function ei(e,t){let n=q.dash,r=t.deckY,i=q.roofUnderY,a=e=>Math.min(ar(t,e)-q.wallT,t.halfBreadth(t.tAtSheerZ(e),r)-t.shell)-.015,s=[],c=t.houseBack-.02,l=n.zFace-.005;for(let e=0;e<=6;e++){let t=R(c,l,e/6);s.push([t,-a(t)])}for(let e=6;e>=0;e--){let t=R(c,l,e/6);s.push([t,a(t)])}let u=Bn(s,[],(e,t,n)=>K(t,r+.009-n*.009,e),{back:!1});e.add(`wood`,u,{rough:.5,pattern:2});for(let n of[-.22,.26,.74]){let r=B(.045,.016,2*(Rr(t,n,i)-q.wallT)-.02);r.applyMatrix4(z(0,i-.008,n,0,Math.PI/2,0)),e.add(`wood`,r,{rough:.35})}let d=i-.06;e.add(`wood`,H(K(-.32,d,-.2),K(-.32,d,.9),.016,10),{rough:.35});for(let t of[-.12,.35,.82])e.add(`fittings`,H(K(-.32,d,t),K(-.32,i-.004,t),.011,8),J);for(let t of[-.3,.35,.95]){let n=B(.36,.012,.03);n.translate(.64,i-.08,t),e.add(`fittings`,n,Nr);for(let n of[.48,.8])e.add(`fittings`,H(K(n,i-.08,t),K(n,i-.002,t),.005,6),J)}for(let[t,n]of[.54,.64,.74].entries()){let r=i-.066,a=-.42+t*.05;e.add(`fittings`,H(K(n,r,a),K(n,r,1.12),.007,6,.0025),{color:[1776670,2767442,4857626][t],rough:.3}),e.add(`fittings`,H(K(n,r,a),K(n,r,a+.24),.013,8),{color:11831900,rough:.85});let o=V(.034,.034,.03,12);o.applyMatrix4(z(n,r-.045,a+.3,0,0,Math.PI/2)),e.add(`fittings`,o,{color:[9080209,12095552,2829616][t],rough:.3,metal:1}),e.add(`fittings`,H(K(n,r-.012,a+.3),K(n,r-.03,a+.3),.004,5),{color:2829616,rough:.4})}{let n=.56,r=1.33,i=$r(t,1,n,r),a=B(.014,.22,.34);a.translate(i-.007,r,n),e.add(`fittings`,a,{color:3816770,rough:.5,pattern:4});for(let t=0;t<2;t++){let r=1.375-t*.1,a=B(.002,.014,.3);a.translate(i-.015,r+.035,n),e.add(`fittings`,a,{color:16777215,rough:.5,pattern:8});for(let n=0;n<8;n++){let a=B(.016,.034,.02);a.translate(i-.021,r,.42500000000000004+n*.0386),e.add(`fittings`,a,{color:1184532,rough:.4});let o=B(.012,.012,.008);o.translate(i-.034,r+((n*7+t*3)%5==0?-.007:.007),.42500000000000004+n*.0386),e.add(`fittings`,o,{color:(n*7+t*3)%5==0?11545122:1974049,rough:.4})}}}let f=(n,r,i,a)=>{let s=$r(t,1,n,r);e.add(`fittings`,H(K(s,r+.02,n),K(s-.05,r+.04,n),.006,6),J);let c=Pn([[.17,0],[.2,.03],[.2,.3],[.21,.5],[.2,.56],[.12,.62],[.05,.66],[.001,.665]].map(([e,t])=>[e*a,t*a]),20);c.applyMatrix4(z(s-.06,r-.66*a,n,0,0,0,.3,1,1)),e.add(`fittings`,c,{color:i,rough:.6,pattern:9});for(let t of[-1,1]){let o=Fn([K(s-.07,r-.12*a,n+t*.17*a),K(s-.1,r-.3*a,n+t*.2*a),K(s-.11,r-.52*a,n+t*.16*a)],.045*a,10,8);e.add(`fittings`,o,{color:i,rough:.6,pattern:9})}let l=Mn(.1*a,12,8,0,Math.PI*2,0,Math.PI*.6);l.applyMatrix4(z(s-.04,r-.03,n,.5,0,0,.5,.8,1)),e.add(`fittings`,l,{color:new o(i).multiplyScalar(.85).getHex(),rough:.6,pattern:9})};f(-.12,1.92,14723100,1),f(.14,1.9,14832410,.8);{let n=-.18,i=r+.2,a=$r(t,-1,n,.8),o=a+.075,s=Pn([[0,0],[.058,0],[.062,.02],[.062,.3],[.05,.35],[.018,.37],[0,.37]],18);s.translate(o,i,n),e.add(`fittings`,s,{color:11736335,rough:.35});let c=B(.03,.05,.05);c.translate(o,i+.39,n),e.add(`fittings`,c,{color:1710618,rough:.4}),e.add(`fittings`,H(K(o,i+.41,n),K(o+.02,i+.42,-.09),.007,6),{color:9211795,rough:.3,metal:1}),e.add(`fittings`,Fn([K(o,i+.38,-.16),K(o+.03,i+.3,-.10999999999999999),K(o+.05,i+.15,-.12),K(o+.06,i+.08,-.15)],.008,12,5),{color:1315860,rough:.6});for(let t of[.12,.26]){let r=Nn(.064,.004,4,20);r.applyMatrix4(z(o,i+t,n,Math.PI/2,0,0)),e.add(`fittings`,r,J)}let l=B(.006,.3,.07);l.translate(a+.003,i+.19,n),e.add(`fittings`,l,J);let u=V(.0625,.0625,.1,18,1,!0,-.9,1.8);u.translate(o,i+.19,n),e.add(`fittings`,u,{color:16777215,rough:.5,pattern:8})}let p=(n,r,i,a,o,s,c)=>{let l=new ge(a,o);l.applyMatrix4(z(0,0,0,0,n>0?-Math.PI/2:Math.PI/2,0)),l.applyMatrix4(new b().makeRotationX(s)),l.translate(0,i,r);let u=l.getAttribute(`position`);for(let e=0;e<u.count;e++)u.setX(e,$r(t,n,u.getZ(e),u.getY(e))-n*.012);u.needsUpdate=!0,l.computeVertexNormals(),e.add(`fittings`,l,c)};p(-1,.02,1.47,.1,.13,.06,{color:16777215,rough:.3,pattern:7,anim:.15}),p(-1,.15,1.42,.12,.09,-.1,{color:16777215,rough:.3,pattern:7,anim:.7}),p(-1,.36,1.36,.19,.25,.02,{color:16777215,rough:.9,pattern:5});for(let[e,t]of[[-.09,.12],[.09,.12]])p(-1,.36+e,1.36+t,.05,.018,.5,{color:14208936,rough:.8});{let n=.85,r=1.3,i=$r(t,-1,n,r)+.035;e.add(`fittings`,H(K(i,r,.75),K(i,r,.95),.02,12),{color:15909403,rough:.45}),e.add(`fittings`,H(K(i,r,.95),K(i,r,.98),.026,12),{color:1710618,rough:.4});for(let t of[-.06,.05]){let a=Nn(.023,.003,4,12,Math.PI*1.3);a.applyMatrix4(z(i,r,n+t,0,Math.PI/2,-.65)),e.add(`fittings`,a,Nr)}}{let t=n.yTop+.01,r=z(.74,t+.004,1.26,0,.18,0),i=B(.23,.005,.31);i.applyMatrix4(r),e.add(`fittings`,i,{color:7031339,rough:.7});let a=new ge(.21,.28);a.applyMatrix4(z(0,.0035,.012,-Math.PI/2,0,0)),a.applyMatrix4(r),e.add(`fittings`,a,{color:16777215,rough:.9,pattern:5});let o=B(.08,.014,.03);o.applyMatrix4(z(0,.008,.14)),o.applyMatrix4(r),e.add(`fittings`,o,J);let s=-.76,c=1.34,l=Nn(.05,.006,6,18);l.applyMatrix4(z(s,t+.035,c,Math.PI/2,0,0)),e.add(`fittings`,l,Nr);let u=V(.042,.038,.095,18,1,!0);u.translate(s,t+.048,c),e.add(`fittings`,u,{color:2050618,rough:.25});let d=V(.039,.036,.09,18,1,!0);d.translate(s,t+.05,c),ti(d),e.add(`fittings`,d,{color:15328472,rough:.25});let f=new De(.039,18);f.applyMatrix4(z(s,t+.082,c,-Math.PI/2,0,0)),e.add(`fittings`,f,{color:2758155,rough:.1});let p=new De(.038,18);p.applyMatrix4(z(s,t+5e-4,c,Math.PI/2,0,0)),e.add(`fittings`,p,{color:2050618,rough:.4});let m=Nn(.026,.006,6,12,Math.PI);m.applyMatrix4(z(-.802,t+.048,c,0,0,Math.PI/2)),e.add(`fittings`,m,{color:2050618,rough:.25})}{let t=r+.47;for(let[n,r]of[0,.05].entries()){let i=jn(.34,.05,.4,.02,1);i.applyMatrix4(z(.86,t+.025+r,.28+n*.02,0,.12*n-.05,0)),e.add(`fittings`,i,{color:14832410,rough:.6,pattern:9});for(let i of[-.08,.08]){let a=B(.345,.052,.025);a.applyMatrix4(z(.86,t+.025+r,.28+n*.02+i,0,.12*n-.05,0)),e.add(`fittings`,a,{color:1381653,rough:.7})}}let n=new ge(.3,.22);n.applyMatrix4(z(.85,t+.002,.64,-Math.PI/2,0,.3)),e.add(`fittings`,n,{color:16777215,rough:.85,pattern:6});for(let t=0;t<5;t++){let n=Nn(.15-t*.004,.011,6,28);n.applyMatrix4(z(.62+t*.004,r+.02+t*.02,-.14+t*.006,Math.PI/2+t%2*.06,0,0));let i=n.attributes.uv;for(let e=0;e<i.count;e++)i.setXY(e,i.getX(e)*.94,i.getY(e));e.add(`fittings`,n,{color:2906764,rough:.8,pattern:1})}}}function ti(e){let t=Array.from(e.index.array);for(let e=0;e<t.length;e+=3){let n=t[e+1];t[e+1]=t[e+2],t[e+2]=n}e.setIndex(t);let n=e.attributes.normal;for(let e=0;e<n.count;e++)n.setXYZ(e,-n.getX(e),-n.getY(e),-n.getZ(e))}function ni(e,t,n){let r=zr(0),i=-.5,a=B(.18,.025,.18);a.translate(0,r+.005,i),e.add(`fittings`,a,Pr),e.add(`fittings`,H(K(0,r,i),K(0,3.9,i),.042,14,.03),Pr);let o=B(.1,.035,.34);o.translate(0,3,-.31),e.add(`fittings`,o,Pr);let s=B(.34,.015,.34);s.translate(0,3.02,-.2),e.add(`fittings`,s,Pr),e.add(`fittings`,H(K(0,3,-.46),K(0,2.82,-.49),.012,6),Pr);let c=Pn([[0,0],[.285,0],[.3,.018],[.3,.095],[.29,.14],[.245,.188],[.16,.222],[.07,.234],[0,.236]],24);c.translate(0,3.028,-.2),e.add(`fittings`,c,{color:15987438,rough:.4});let l=V(.302,.302,.02,24,1,!0);l.translate(0,3.05,-.2),e.add(`fittings`,l,{color:3816770,rough:.5});let u=3.45,d=B(.78,.03,.045);d.translate(0,3.4000000000000004,i),e.add(`fittings`,d,Pr);for(let t of[1,-1]){let n=t*.4,r=B(.055,.07,.11);r.translate(n,u,-.48),e.add(`fittings`,r,Nr);let i=B(.014,.05,.085);i.translate(n+t*.033,u,-.47),e.add(`glow`,i,{color:t>0?16718350:1376090,rough:.2,pattern:0});let a=B(.004,.07,.12);a.translate(n-t*.03,u,-.48),e.add(`fittings`,a,Nr)}let f=V(.036,.036,.03,12);f.translate(0,3.915,i),e.add(`fittings`,f,Nr);let p=V(.03,.03,.065,12);p.translate(0,3.962,i),e.add(`glow`,p,{color:16774108,rough:.2,pattern:0});let m=V(.034,.038,.016,12);m.translate(0,4.003,i),e.add(`fittings`,m,Nr);for(let t of[1,-1]){let n=t*1.02,r=-.78,i=zr(1.02),a=jn(.06,.07,.06,.01,1);a.translate(n,i+.035,r),e.add(`fittings`,a,J);let o=t>0?2.4:1.2,s=V(.005,.013,o,8,10);s.translate(n,i+.07+o/2,r),Un(s,e=>[.3,0,3,Math.max(0,(e.y-i-.07)/o)]),e.add(`fittings`,s,{color:16053489})}let h=.8,g=jn(.26,.28,.3,.03,1);g.translate(0,r+.14,h),e.add(`fittings`,g,{color:15987438,rough:.4}),n.radarPivot=K(0,r+.3,h);let _=.42,v=1.05,y=zr(.42);e.add(`fittings`,H(K(_,y,v),K(_,y+.1,v),.03,10),Nr);let b=V(.065,.06,.15,16);b.applyMatrix4(z(_,y+.17,v,Math.PI/2,0,0)),e.add(`fittings`,b,J);let x=new De(.058,16);x.translate(_,y+.17,1.1255),e.add(`glow`,x,{color:16773590,rough:.2,pattern:4});let S=Pn([[0,0],[.018,0],[.016,.1],[.024,.17],[.05,.22],[.046,.222],[0,.2]],16);S.applyMatrix4(z(-.42,zr(.42)+.07,.93,Math.PI/2,0,0)),e.add(`fittings`,S,J),e.add(`fittings`,H(K(-.42,zr(.42),v),K(-.42,zr(.42)+.07,v),.012,6),J);let C=.62,w=-.72,T=B(.12,.03,.12);T.translate(C,zr(C)+.015,w),e.add(`fittings`,T,J);for(let[t,n]of mr())t.translate(C,zr(C)+.03,w),e.add(`fittings`,t,n);for(let t of[1,-1]){let n=jn(.13,.07,.08,.01,1);n.translate(t*.55,q.roofUnderY-.035,q.roofZ0+.14),e.add(`fittings`,n,Nr);let r=new ge(.11,.06);r.applyMatrix4(z(t*.55,q.roofUnderY-.071,q.roofZ0+.14,Math.PI/2+.35,0,0)),e.add(`glow`,r,{color:16773590,rough:.2,pattern:4})}let E=Rr(t,-.02,1.72)+.05,D=Nn(.235,.05,8,24);D.applyMatrix4(z(E,1.72,-.02,0,Math.PI/2,0)),Hn(D,e=>{let t=Math.atan2(e.y-1.72,e.z+.02);return Math.abs((t/(Math.PI/2)%1+1)%1-.5)>.4?15921386:15882770}),e.add(`fittings`,D,{rough:.6});let O=B(.03,.05,.08);O.translate(E-.03,1.98,-.02),e.add(`fittings`,O,J)}function ri(){let e=[],t={rough:.3,metal:0};e.push(On(Nn(.2,.017,8,40),{...t,color:15251608}));for(let n=0;n<6;n++){let r=n*Math.PI/3+Math.PI/6,i=K(Math.cos(r),Math.sin(r),0),a=V(.009,.013,.15000000000000002,8);a.applyMatrix4(En(i.clone().multiplyScalar(.125),i)),e.push(On(a,{...t,color:15251608}));let o=Pn([[0,0],[.011,0],[.013,.02],[.017,.045],[.012,.06],[.01,.07],[.015,.078],[0,.086]],8);o.applyMatrix4(En(i.clone().multiplyScalar(.195),i)),e.push(On(o,{...t,color:15251608}))}let n=Pn([[0,-.03],[.05,-.03],[.058,-.012],[.058,.012],[.05,.028],[0,.03]],20);n.applyMatrix4(new b().makeRotationX(Math.PI/2)),e.push(On(n,{...t,color:15251608}));let r=Mn(.032,16,6,0,Math.PI*2,0,Math.PI/2);return r.applyMatrix4(new b().makeRotationX(-Math.PI/2)),r.translate(0,0,-.028),e.push(On(r,{color:13148240,rough:.25,metal:1,pattern:1})),An(e)}function ii(){let e=[];e.push(On(H(K(0,-.01,0),K(0,.15,.015),.008,8),J));let t=Mn(.022,14,10);t.scale(1,1.15,1),t.translate(0,.165,.016),e.push(On(t,Nr));let n=V(.02,.02,.05,12);return n.applyMatrix4(new b().makeRotationZ(Math.PI/2)),e.push(On(n,J)),An(e)}function ai(){let e=[];e.push(On(V(.05,.06,.06,14),{color:15987438,rough:.4}));let t=jn(1.05,.12,.1,.035,2);t.translate(0,.09,0),e.push(On(t,{color:15987438,rough:.4}));let n=B(.95,.028,.004);return n.translate(0,.09,.051),e.push(On(n,{color:2895669,rough:.5})),An(e)}function oi(e){return!!e&&e.maxComputeWorkgroupStorageSize>=16384&&e.maxComputeInvocationsPerWorkgroup>=256&&e.maxComputeWorkgroupSizeX>=256&&e.maxStorageTexturesPerShaderStage>=4&&e.maxStorageBuffersPerShaderStage>=3}function si(e){let t=``;for(let e=0;e<8;e++){let n=1<<e;t+=`
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
}`}function ci(e,t,n,r,i,a,o=!1){let s=r*2,c=n?`${n}[ly * ${r}u + lx] = v;`:o?`mipMid[(c * 64u + gy * 8u + gx) * 2u + ${a}u] = v;`:``;return`
  if (lx < ${r}u && ly < ${r}u) {
    let i = ly * ${s*2}u + lx * 2u;
    let v = (${t}[i] + ${t}[i + 1u] + ${t}[i + ${s}u] + ${t}[i + ${s+1}u]) * 0.25;
    textureStore(${e}${i}, vec2u(gx * ${r}u + lx, gy * ${r}u + ly), c, v);
    ${c}
  }`}function li(e){if(e===null)return[[`d`,0],[`n`,1]];if(e!==0&&e!==1)throw RangeError(`Field channel must be 0, 1, or null`);return[[e===0?`d`:`n`,e]]}function ui(e=null){let t=li(e),n=``;for(let[e]of t)n+=`var<workgroup> ${e}2: array<vec4f, 64>;
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
`;for(let[e,r]of[[3,4],[4,2],[5,1]]){for(let[i,a]of t)n+=ci(`${i}Out`,`${i}${e-1}`,e<5?`${i}${e}`:null,r,e,a,e===5);e<5&&(n+=`
  workgroupBarrier();
`)}return n+`
}`}function di(e=null){let t=li(e),n=``;for(let[e]of t)n+=`var<workgroup> ${e}5: array<vec4f, 64>;
var<workgroup> ${e}6: array<vec4f, 16>;
var<workgroup> ${e}7: array<vec4f, 4>;
`;n+=`@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid: vec3u, @builtin(workgroup_id) wid: vec3u) {
  let lx = lid.x; let ly = lid.y; let c = wid.z;
  let gx = 0u; let gy = 0u;
  let i = (c * 64u + ly * 8u + lx) * 2u;
`;for(let[e,r]of t)n+=`  ${e}5[ly * 8u + lx] = mipMid[i + ${r}u];\n`;n+=`  workgroupBarrier();
`;for(let[e,r]of[[6,4],[7,2],[8,1]]){for(let[i,a]of t)n+=ci(`${i}Out`,`${i}${e-1}`,e<8?`${i}${e}`:null,r,e,a);e<8&&(n+=`
  workgroupBarrier();
`)}return n+`
}`}function fi(e,{ComputeKernel:t,commonModule:n,fftCommon:r,oceanU:i,limits:a}){if(!oi(a))throw Error(`Insufficient negotiated limits for paired columns`);let o=e=>({storage:e,access:`read_write`}),s=(e,t)=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}}),c=e.displacementTexture,l=e.derivativeTexture;e.columnKernel=new t({label:`Ocean Paired Columns + Mip1`,modules:[n],bindings:{...i,tmp:o(e.tmp),foam:o(e.foam),mipSrc:o(e.mipSrc),dispOut:s(c,0),derivOut:s(l,0),dispMip1:s(c,1),derivMip1:s(l,1)},workgroupSize:[256,1,1],code:si(r)}),e.fusedMipFields=a.maxStorageTexturesPerShaderStage>=8;let u=e.derivativeOnly?[1]:e.fusedMipFields?[null]:[0,1];e.mipKernelsA=u.map(n=>{let r={mipSrc:o(e.mipSrc),mipMid:o(e.mipMid)};for(let[e,t]of li(n))for(let n=2;n<=5;n++)r[`${e}Out${n}`]=s(t===0?c:l,n);return new t({label:`Ocean Paired Mips 2-5`+(n===null?``:` field${n}`),bindings:r,workgroupSize:[8,8,1],code:ui(n)})}),e.mipKernelsB=u.map(n=>{let r={mipMid:o(e.mipMid)};for(let[e,t]of li(n))for(let n=6;n<=8;n++)r[`${e}Out${n}`]=s(t===0?c:l,n);return new t({label:`Ocean Paired Mips 6-8`+(n===null?``:` field${n}`),bindings:r,workgroupSize:[8,8,1],code:di(n)})})}function pi(e,t){let n=e===`Ocean FFT Rows`,r=e===`Ocean FFT Columns`,i=e===`Ocean Paired Columns + Mip1`;return t=t.replaceAll(`let c = i32( gid.z );`,`let c = i32( gid.z ) + 2;`).replaceAll(`let c = wid.y;`,`let c = wid.y + 2u;`).replaceAll(`let c = wid.z;`,`let c = wid.z + 2u;`).replace(`let idx = gid.z *`,`let idx = ( gid.z + 2u ) *`),e===`Ocean Copy H0`&&(t=t.replace(/\s*foam\[ idx \] = 0\.0;/,``)),n?t:((n||r)&&(t=t.replace(/let a0 = fftShared\[ i2 \]; /g,``).replace(/let b0 = fftCmul2\( fftShared\[ j2 \], w \); /g,``),t=t.replace(/^\s*fftShared\[ (?:i2|j2) \] = a0 [+-] b0;\n/gm,``),n&&(t=t.replace(/\s*\/\/ Dx_hat[\s\S]*?(?=\s*\/\/ c2 =)/,`
`),t=t.replace(/^\s*fftShared\[ r \] = vec4f\( c0, c1 \);\n/gm,``).replace(/^\s*tmp\[ o \] = fftShared\[ x \* 2u \];\n/gm,``)),r&&(t=t.replace(/^\s*fftShared\[ r \] = tmp\[ idx \* 2u \];\n/gm,``).replace(/^\s*let A = fftShared\[ y \* 2u \] \* sign;\n/gm,``).replace(/^\s*let Dx = A.x;[^\n]*\n/gm,``).replace(/\s*let jxx = lambda \* Dxx \+ 1\.0;[\s\S]*?(?=\s*let uv =)/,`
`).replace(/^\s*let vDisp = [^;]+;\n/gm,``).replace(/^\s*textureStore\( dispOut,[^\n]+\n/gm,``).replace(/^\s*mipSrc\[ idx \* 2u \] = vDisp;\n/gm,``))),i&&(t=t.replace(/let a0 = fftShared\[i2\]; /g,``).replace(/\s*let b0 = fftCmul2\(fftShared\[j2\], w\);/g,``),t=t.replace(/^\s*fftShared\[(?:i2|j2)\] = a0 [+-] b0;\n/gm,``).replace(/^\s*fftShared\[r\] = tmp\[idx \* 2u\];\n/gm,``).replace(/^\s*let A = fftShared\[k\] \* sign;\n/gm,``).replace(/^\s*let Dx = A.x;[^\n]*\n/gm,``).replace(/\s*let jxx = lambda \* Dxx \+ 1\.0;[\s\S]*?(?=\s*let uv =)/,`
`).replace(/^\s*let vDisp = [^;]+;\n/gm,``).replace(/^\s*textureStore\(dispOut,[^\n]+\n/gm,``).replace(/^\s*fftShared\[k\] = vDisp;\n/gm,``).replace(/^\s*let vd = [^;]+;\n/gm,``).replace(/^\s*textureStore\(dispMip1,[^\n]+\n/gm,``).replace(/^\s*mipSrc\[dst\] = vd;\n/gm,``)),t)}var Y=256,mi=8,hi=Y/2,gi=[733,157,33.3,7.1],_i=Math.PI*2,vi=class{constructor(e={}){this.scale=e.scale??1,this.windSpeed=e.windSpeed??8,this.windDirection=e.windDirection??20,this.fetch=e.fetch??200,this.spreadBlend=e.spreadBlend??.9,this.swell=e.swell??.2,this.peakEnhancement=e.peakEnhancement??3.3,this.shortWavesFade=e.shortWavesFade??.01}},yi=`
const FFT_N: u32 = ${Y}u;
const FFT_HALF: u32 = ${hi}u;
const FFT_G: f32 = ${_};

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
`,bi=class{constructor(e,t={}){if(this.renderer=e,this.cascades=t.cascades??4,this.derivativeOnly=t.derivativeOnly===!0,this.derivativeOnly&&this.cascades!==4)throw Error(`Rocha derivatives retain logical cascades 2 and 3 of four`);this.fusedMips=t.fusedMips??new URLSearchParams(globalThis.location?.search||``).has(`fusedOcean`),this.fusedMips&&!oi(A.limits)&&(console.warn(`Fused ocean unsupported by negotiated limits; retaining original kernels.`),this.fusedMips=!1),this.sizes=(t.sizes??gi).slice(0,this.cascades),this.depth=t.depth??500,this.local=new vi(t.local??{windSpeed:7,windDirection:25,fetch:120,spreadBlend:.85,swell:.05}),this.swell=new vi(t.swell??{scale:.48,windSpeed:6,windDirection:5,fetch:1200,spreadBlend:1,swell:.9,shortWavesFade:.1});let r=this.cascades;this.params=new c(`OceanParams`,{sizes:[`vec4f[4]`,[0,1,2,3].map(e=>new n(this.sizes[e]??1,0,0,0))],cuts:[`vec4f[4]`,[0,1,2,3].map(()=>new n)],sysA:[`vec4f[2]`,[new n,new n]],sysB:[`vec4f[2]`,[new n,new n]],choppiness:[`f32`,t.choppiness??.9],foamBias:[`f32`,.58],foamGain:[`f32`,3],foamDecay:[`f32`,.35],foamAdd:[`f32`,2.5],time:[`f32`,0],depth:[`f32`,this.depth],seed:[`u32`,1337]},{label:`ocean`});let i=this.params.fields;this.choppiness=i.choppiness,this.foamBias=i.foamBias,this.foamGain=i.foamGain,this.foamDecay=i.foamDecay,this.foamAdd=i.foamAdd,this.time=i.time,this.uDepth=i.depth,this.uSeed=i.seed,this.timeScale=1;let a=Y*Y*r;this.h0=new re({label:`fftH0`,count:a,type:`vec4f`}),this.waveData=new re({label:`fftWave`,count:a,type:`vec4f`}),this.tmp=new re({label:`fftTmp`,count:a*2,type:`vec4f`}),this.foam=new re({label:`fftFoam`,count:a,type:`f32`}),this.mipSrc=new re({label:`fftMipSrc`,count:this.fusedMips?a/2:a*2,type:`vec4f`}),this.mipMid=new re({label:`fftMipMid`,count:64*r*2,type:`vec4f`});let o=e=>new j({label:e,width:Y,height:Y,depth:r,dimension:`2d-array`,format:`rgba16float`,mips:!0,usage:[`sample`,`storage`,`copyDst`,`copySrc`],sampler:`linearRepeat`});this.displacementTexture=o(`oceanDisplacement`),this.derivativeTexture=o(`oceanDerivatives`),this.module=new h({name:`ocean`,deps:[M],uniforms:this.params,uniformName:`ocean`,bindings:{oceanDisplacement:{texture:this.displacementTexture,viewDimension:`2d-array`},oceanDerivatives:{texture:this.derivativeTexture,viewDimension:`2d-array`}},code:`
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
`}),this._buildKernels(),this.updateSpectrumUniforms(),this.needsSpectrum=!0}get uSizes(){return{array:this.sizes}}setCascadeSizes(e){this.sizes=e.slice(0,this.cascades),this.updateSpectrumUniforms()}updateSpectrumUniforms(){let e=this.cascades,t=this.params.fields;for(let n=0;n<e;n++){let r=n===0?1e-4:_i/this.sizes[n]*6,i=n===e-1?9999:_i/this.sizes[n+1]*6;t.cuts.value[n].set(r,i,0,0),t.sizes.value[n].set(this.sizes[n],0,0,0)}t.depth.value=this.depth;let n=[this.local,this.swell];for(let e=0;e<2;e++){let r=n[e],i=Math.max(1,r.fetch)*1e3,a=Math.max(.1,r.windSpeed),o=.076*(_*i/(a*a))**-.22,s=22*(a*i/(_*_))**-.33;t.sysA.value[e].set(r.scale,d.degToRad(r.windDirection),r.spreadBlend,r.swell),t.sysB.value[e].set(o,s,r.peakEnhancement,r.shortWavesFade)}this.params.set(`cuts`,t.cuts.value),this.params.set(`sizes`,t.sizes.value),this.params.set(`sysA`,t.sysA.value),this.params.set(`sysB`,t.sysB.value),this.needsSpectrum=!0}_buildKernels(){this.cascades;let e={ocean:{uniform:this.params}},t=e=>({storage:e,access:`read_write`}),n=this.derivativeOnly,r=class extends C{constructor(e){super(n?{...e,code:pi(e.label,e.code)}:e)}};this.initSpectrumKernel=new r({label:`Ocean Init Spectrum`,modules:[M],bindings:{...e,h0:t(this.h0),waveData:t(this.waveData)},workgroupSize:[16,16,1],code:yi+`
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
	let kx = f32( x - ${hi} ) * dk;
	let kz = f32( y - ${hi} ) * dk;
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
	let base = c * ${Y*Y};
	let idx = base + y * ${Y} + x;
	let xm = ( ${Y} - x ) % ${Y};
	let ym = ( ${Y} - y ) % ${Y};
	let idxm = base + ym * ${Y} + xm;
	let hm = h0[ idxm ].xy;
	let cur = h0[ idx ].xy;
	tmp[ idx ] = vec4f( cur.x, cur.y, hm.x, - hm.y );
}`}),this.copyH0Kernel=new r({label:`Ocean Copy H0`,bindings:{h0:t(this.h0),tmp:t(this.tmp),foam:t(this.foam)},workgroupSize:[16,16,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let idx = gid.z * ${Y*Y}u + gid.y * ${Y}u + gid.x;
	h0[ idx ] = tmp[ idx ];
	foam[ idx ] = 0.0;
}`});let i=``;for(let e=0;e<mi;e++){let t=1<<e;i+=`
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
	}`}let a=`var<workgroup> fftShared: array<vec4f, ${Y*2}>;\n`;if(this.rowKernel=new r({label:`Ocean FFT Rows`,modules:[M],bindings:{...e,h0:t(this.h0),waveData:t(this.waveData),tmp:t(this.tmp)},workgroupSize:[hi,1,1],code:yi+a+`
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
${i}

	for ( var e = 0u; e < 2u; e++ ) {
		let x = t + e * FFT_HALF;
		let o = ( base + x ) * 2u;
		tmp[ o ] = fftShared[ x * 2u ];
		tmp[ o + 1u ] = fftShared[ x * 2u + 1u ];
	}
}`}),this.fusedMips){fi(this,{ComputeKernel:r,commonModule:M,fftCommon:yi,oceanU:e,limits:A.limits});return}let o=(e,t)=>({storageTexture:e,access:`write`,view:{dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}});this.columnKernel=new r({label:`Ocean FFT Columns`,modules:[M],bindings:{...e,tmp:t(this.tmp),foam:t(this.foam),mipSrc:t(this.mipSrc),dispOut:o(this.displacementTexture,0),derivOut:o(this.derivativeTexture,0)},workgroupSize:[hi,1,1],code:yi+a+`
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
${i}

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
}`});let s=(A.limits.maxStorageTexturesInComputeStage??A.limits.maxStorageTexturesPerShaderStage)<5,c=(e,t,n,r,i)=>{let a=n*2,o=``;return t?o=`${t}[ ly * ${n}u + lx ] = v;`:r===5&&(o=`mipMid[ ( c * 64u + gy * 8u + gx ) * 2u + ${i}u ] = v;`),`
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
fn src( c: u32, x: u32, y: u32 ) -> vec4f { return mipSrc[ ( c * ${Y*Y}u + y * ${Y}u + x ) * 2u + ${n}u ]; }
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
}`});this.mipKernelsA=this.derivativeOnly?[l(this.derivativeTexture,1)]:[l(this.displacementTexture,0),l(this.derivativeTexture,1)],this.mipKernelsB=this.derivativeOnly?[u(this.derivativeTexture,1)]:[u(this.displacementTexture,0),u(this.derivativeTexture,1)]}update(e){let t=this.derivativeOnly?2:this.cascades;if(this.needsSpectrum){this.needsSpectrum=!1;let e=[Y/16,Y/16,t];this.initSpectrumKernel.dispatch(e),this.conjugateKernel.dispatch(e),this.copyH0Kernel.dispatch(e)}this.time.value+=e*this.timeScale,A.computePass(`Ocean FFT`,e=>{this.rowKernel.dispatch([Y,t,1],{pass:e}),this.columnKernel.dispatch([this.fusedMips?Y/2:Y,t,1],{pass:e});for(let n of this.mipKernelsA)n.dispatch([Y/32,Y/32,t],{pass:e});for(let n of this.mipKernelsB)n.dispatch([1,1,t],{pass:e})},this.timestampWrites||void 0)}sampleDisplacement(e,t=null,n=null){let r=[];for(let i=0;i<this.cascades;i++){let a=`textureSampleLevel( oceanDisplacement, smpLinearRepeat, ( ${e} ) / ocean.sizes[ ${i} ].x, ${i}, ${t??`0.0`} ).xyz`;n&&(a+=` * ( ${n[i]} )`),r.push(a)}return`( `+r.join(` + `)+` )`}},xi=.4,Si={left:.15,right:.15,bottom:.6,top:0},Ci={cx:(Si.right-Si.left)/2,cy:(Si.top-Si.bottom)/2,sx:1+(Si.left+Si.right)/2,sy:1+(Si.top+Si.bottom)/2},wi=new b().set(1/Ci.sx,0,0,-Ci.cx/Ci.sx,0,1/Ci.sy,0,-Ci.cy/Ci.sy,0,0,1,0,0,0,0,1),Ti=new b,Ei=new S,Di=new t,Oi=class{constructor({meshRenderer:e,scene:t,camera:n,sceneRenderer:r,scale:i=.5}){this.meshRenderer=e,this.scene=t,this.camera=n,this.sceneRenderer=r,this.scale=i,this.enabled=!0,this.objectFilter=null,this.volumeFilter=null,this.optimizationStats={excludedObjects:0,excludedVolumes:0},this.guard=Ci,this._camera=Object.create(n),this._camera.projectionMatrix=new b,this.block=u(`refraction`),this.target=new ie(1,1,{colors:[`rgba16float`],depth:k,label:`refraction`}),this.texture=this.target.texture,this.depthTexture=this.target.depthTexture,this._clearColors=[[0,0,0,0]],this._filter=e=>{if(this.objectFilter&&!this.objectFilter(e))return this.optimizationStats.excludedObjects++,!1;let t=e.material;return t.underwaterLighting===`none`||t.isWaterMaterial?!1:e.isInstancedMesh?this._instancedMinY(e)>=this._clipY?!1:this.volumeFilter&&!this.volumeFilter(Ei,e)?(this.optimizationStats.excludedVolumes++,!1):!0:!e.geometry.attributes.position||(Ei.copy(this._localBox(e)).applyMatrix4(e.matrixWorld),Ei.min.y>=this._clipY?!1:this.volumeFilter&&!this.volumeFilter(Ei,e)?(this.optimizationStats.excludedVolumes++,!1):!0)},this._boxes=new WeakMap,this._instBoxes=new WeakMap,this._clipY=0,this._defines={REFRACTION_CLIP:1,REFRACTION_CLIP_MARGIN:xi}}_instancedMinY(e){let t=e.instanceMatrix,n=this._instBoxes.get(e);return(!n||n.version!==(t.version||0)||n.count!==e.count||n.array!==t.array)&&(e.computeBoundingBox(),n={version:t.version||0,count:e.count,array:t.array,box:e.boundingBox.clone()},this._instBoxes.set(e,n)),n.count?Ei.copy(n.box).applyMatrix4(e.matrixWorld).min.y:1/0}_localBox(e){let t=e.geometry,n=t.drawRange||{start:0,count:1/0},r=this._boxes.get(e);if(r&&r.geometry===t&&r.start===n.start&&r.count===n.count&&r.version===(t.attributes.position.version||0))return r.box;let i=new S,a=t.attributes.position;if(n.start===0&&(n.count===1/0||n.count===null))t.boundingBox||t.computeBoundingBox(),i.copy(t.boundingBox);else{let e=t.index?t.index.array:null,r=e?e.length:a.count,o=Math.min(r,n.start+(n.count??1/0));for(let t=n.start;t<o;t++){let n=e?e[t]:t;Di.set(a.getX(n),a.getY(n),a.getZ(n)),i.expandByPoint(Di)}}return this._boxes.set(e,{geometry:t,start:n.start,count:n.count,version:a.version||0,box:i}),i}render(e){this.optimizationStats.excludedObjects=this.optimizationStats.excludedVolumes=0;let t=this.sceneRenderer,n=this.guard,r=Math.max(1,Math.round(t.width*this.scale*n.sx)),i=Math.max(1,Math.round(t.height*this.scale*n.sy));(this.target.width!==r||this.target.height!==i)&&this.target.setSize(r,i),this._clipY=e+xi;let o=this.target,s=v.fields,c=this._camera;c.projectionMatrix.multiplyMatrices(wi,this.camera.projectionMatrix),Ti.multiplyMatrices(wi,s.prevViewProjNoJitter.value),a(c,r,i,{jitterX:s.jitter.value.x/n.sx*r/2,jitterY:s.jitter.value.y/n.sy*i/2,prevViewProj:Ti,prevCameraPos:s.prevCameraPos.value,block:this.block}),this.meshRenderer.render(this.scene,{label:`refraction`,kind:`color`,camera:c,frameBlock:this.block,colorViews:[o.texture.view()],colorFormats:o.formats,clearColors:this._clearColors,depthView:o.depthTexture.view(),depthFormat:k,clearDepth:0,layerMask:this.enabled?1<<ee.OPAQUE:0,filter:this._filter,defines:this._defines})}},ki=1.333,Ai=new h({name:`waterFresnel`,deps:[M],code:`
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
`}),ji=class extends Pe{constructor({surface:e,sky:t,sceneCopy:n,sceneDepthHalf:r=null,refraction:i=null,reflection:a=null,hullMask:o=null,hullMaskActive:s=null}){super({name:`water`,lit:!1,side:`double`,transparent:!1,blending:`none`,depthWrite:!0,defines:{IS_WATER:1},attributes:{nodeData:`vec4f`},varyings:{vLagXZ:`vec2f`,vWaveH:`f32`,vSeaDepth:`f32`,vFoam:`f32`,vShoreN:`vec3f`,vShoreFoam:`f32`,vSurfMask:`vec2f`},uniforms:{backscatter:[`f32`,.035],sss:[`f32`,1],refraction:[`f32`,.06],foamIntensity:[`f32`,1],waterRoughness:[`f32`,.035],reflectionStrength:[`f32`,1],ssr:[`f32`,1],debugMode:[`i32`,0],hullActive:[`f32`,0]}}),this.isWaterMaterial=!0,this.lightingHooks=!1,this.waterSurface=e,this.sky=t,this.reflection=a,this.clouds=null,this.cheap=!1,this.cameraWaterHeightNode=null;let c=this.uniforms;this.params={absorption:m.waterAbsorption,scattering:m.waterScattering,backscatter:c.backscatter,sss:c.sss,refraction:c.refraction,foamIntensity:c.foamIntensity,roughness:c.waterRoughness,reflectionStrength:c.reflectionStrength,ssr:c.ssr},this.debugMode=c.debugMode,this.sceneDepthTexture=n.depthTexture,this.sceneColorTexture=n.texture,this.sceneDepthHalfTexture=r,this.refraction=i,this.hullMaskTexture=o,this.hullMaskActive=s,s&&(this.uniformBlock.fields.hullActive=s),this._built=!1}get _hullOn(){return this._hull?this.hullOverride!==void 0&&this.hullOverride!==null?!!this.hullOverride:this.hullMaskActive.value>.5:!1}pipelineKey(){return this._built||this._build(),super.pipelineKey()+(this._hullOn?`.hull`:``)}allDefines(){return{...super.allDefines(),WATER_HULL:+!!this._hullOn}}_build(){this._built=!0;let e=this.waterSurface,t=this.sky,n=!!e.terrain,r=!!e.shore,i=!!e.shoreSim,a=!!e.surfFoam,o=!!(this.clouds&&this.clouds.module),s=!!(this.hullMaskTexture&&this.hullMaskActive),c=!!(this.reflection&&this.reflection.module);this.modules=[M,Ai,Fi,dn,e.module,t&&t.module,o&&this.clouds.module,i&&e.shoreSim.module,c&&this.reflection.module,this.cameraWaterHeightNode&&this.cameraWaterHeightNode.module].filter(Boolean),this.bindings.waterSceneColor={texture:this.sceneColorTexture},this.bindings.waterSceneDepth={texture:this.sceneDepthTexture,sampleType:`unfilterable-float`},this.sceneDepthHalfTexture&&(this.bindings.waterSceneDepthHalf={texture:this.sceneDepthHalfTexture}),this.setDefine(`WATER_DEPTH_HALF`,+!!this.sceneDepthHalfTexture);let l=!!this.refraction;l&&(this.bindings.waterRefrColor={texture:this.refraction.texture},this.bindings.waterRefrDepth={texture:this.refraction.depthTexture,sampleType:`unfilterable-float`}),this.setDefine(`WATER_REFRACTION`,+!!l),s&&(this.bindings.waterHullMask={texture:this.hullMaskTexture,sampleType:`unfilterable-float`}),this._hull=s,this.vertex=`
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
		let F = fresnelDielectric( NdV, ${ki} );

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
		let Fs = fresnelDielectric( VdH, ${ki} );
		let spec = _waterDGGX( NdH, alpha2 ) * _waterVSmithGGX( NdL, NdV, alpha2 ) * Fs * NdL;
		// physically the glint is ~1e5x brighter than the sky; clamp to stay inside fp16 range
		let sunSpec = sunLight * min( spec, 400.0 );

		// ---- refraction / water volume
		// Trace the refracted view ray (Snell) to the sea floor instead of using the straight
		// screen ray: at grazing angles the straight ray overestimates the water path ~10x.
		// view ray inside the water (unit, downward). Facets of a curling crest can refract it
		// upward on a coarse mesh; keep it heading down into the water body.
		let Tr = refract( - V, N, 1.0 / ${ki} );
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
		let Ls = - refract( - L, vec3f( 0.0, 1.0, 0.0 ), 1.0 / ${ki} ); // toward the sun from underwater
		let muS = max( Ls.y, 0.1 );
		let muV = max( - Tv.y, 0.15 );

		let Tview = exp( - sigT * pathLen );

		// in-scattered light along the view ray (single scattering sun + ambient), analytic
		// light at depth z: E0 * exp(-sigT * z / mu). Along the view ray z = s * muV.
		let sunIn = sunLight * ( 1.0 - fresnelDielectric( max( L.y, 0.02 ), ${ki} ) );
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
		let F = fresnelDielectric( NdV, ${(1/ki).toFixed(8)} );
		let Tt = refract( - V, N, ${ki} );
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
		let LsU = - refract( - L, vec3f( 0.0, 1.0, 0.0 ), 1.0 / ${ki} );
		let muU = max( LsU.y, 0.15 );
		let phR = waterPhaseHG( dot( Rr, LsU ), 0.86 ) * 0.7 + ${(.3/(4*Math.PI)).toFixed(8)};
		let kS = sigT * ( 1.0 - min( Rr.y, 0.0 ) / muU );
		let kA = sigT * ( 1.0 - min( Rr.y, 0.0 ) / 0.8 );
		let eSunU = sunLight * ( 1.0 - fresnelDielectric( max( L.y, 0.02 ), ${ki} ) );
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
`}},Mi=Ci,Ni=e=>e.toFixed(6),Pi=`
// a refracted sample is usable when it lies this far behind the water surface (view depth, m): objects in
// front of it (the hull you stand in, pier piles) are rejected
const WATER_BEHIND: f32 = 0.05;
// screen NDC -> uv in the refraction image, which extends past the screen (RefractionPass guard band)
fn _waterRefrUV( ndc: vec2f ) -> vec2f {
	let n = ( ndc - vec2f( ${Ni(Mi.cx)}, ${Ni(Mi.cy)} ) ) / vec2f( ${Ni(Mi.sx)}, ${Ni(Mi.sy)} );
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
`,Fi=new h({name:`waterHelpers`,deps:[M],code:Pi}),Ii=Math.PI*2,Li=.066,Ri=.4,zi=.55,Bi=1.2,Vi=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`};function Hi(e,t){return`
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
`}var Ui=class{constructor(e){this.terrain=e,this.uniforms=new c(`ShoreParams`,{period:[`f32`,9],amplitude:[`f32`,.34],variation:[`f32`,.55],gamma:[`f32`,.78],breakSpan:[`f32`,.13],curl:[`f32`,1],runup:[`f32`,1],enabled:[`f32`,1],turbidity:[`f32`,.16],dirMin:[`vec2f`,new f],dirSize:[`f32`,1],dirOn:[`f32`,0]});let t=this.uniforms.fields;this.period=t.period,this.amplitude=t.amplitude,this.variation=t.variation,this.gamma=t.gamma,this.breakSpan=t.breakSpan,this.curl=t.curl,this.runup=t.runup,this.enabled=t.enabled,this.turbidity=t.turbidity,this.dirMin=t.dirMin,this.dirSize=t.dirSize,this.time=m.time,this.dirTexture=null,this._dirPlaceholder=new j({label:`shoreDirPlaceholder`,width:1,height:1,format:`rgba32float`,data:new Float32Array([1,0,0,1])}),this.module=new h({name:`shore`,deps:[M,e&&e.module],uniforms:this.uniforms,uniformName:`shoreP`,bindings:{shoreDirTex:{texture:()=>this.dirTexture||this._dirPlaceholder}},code:this._code()})}_code(){return`
const SHORE_GRAVITY: f32 = ${Vi(_)};
const SHORE_TAU: f32 = ${Vi(Ii)};
const SHORE_BEACH_SLOPE: f32 = ${Vi(Li)};
const SHORE_SWASH_UP: f32 = ${Vi(Ri)};
const SHORE_SWASH_DOWN: f32 = ${Vi(zi)};
const SHORE_SWASH_OVERSHOOT: f32 = ${Vi(Bi)};

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
	let waveSet = abs( sin( m * ${Vi(Math.PI/7)} ) ) * 0.6 + 0.55;
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
	let th = clamp( - u / uf, 0.0, 1.0 ) * ${Vi(Math.PI/2)};
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
${Hi(`shoreEvaluate`,`normal`)}
${Hi(`shoreEvaluateNoNormal`,`plain`)}
${Hi(`shoreEvaluateWorld`,`world`)}
`}buildDirTexture({min:e,size:t,res:n=128}){let r=this.terrain,i=r.shoreField||null,a=i?i.data:r.shoreData||r.shoreTexture?.image?.data||r.shoreTexture?.pendingData,o=i?i.res:r.shoreRes;if(!a||!o)return console.warn(`ShoreWaves.buildDirTexture: no shore field data on the terrain; using terrainShoreSample instead`),null;let s=r.origin,c=r.size,l=new Float32Array(n*n*4);for(let r=0;r<n;r++)for(let i=0;i<n;i++){let u=e.x+(i+.5)/n*t,d=e.y+(r+.5)/n*t,f=Math.min(Math.max((u-s)/c*o-.5,0),o-1.001),p=Math.min(Math.max((d-s)/c*o-.5,0),o-1.001),m=Math.floor(f),h=Math.floor(p),g=f-m,_=p-h,v=e=>{let t=a[(h*o+m)*4+e],n=a[(h*o+m+1)*4+e],r=a[((h+1)*o+m)*4+e],i=a[((h+1)*o+m+1)*4+e];return(t*(1-g)+n*g)*(1-_)+(r*(1-g)+i*g)*_},y=v(1),b=v(2),x=Math.hypot(y,b)||1e-4,S=(r*n+i)*4;l[S]=y/x,l[S+1]=b/x,l[S+2]=Math.min(1,x*1.4),l[S+3]=1}let u=new j({label:`shoreDir`,width:n,height:n,format:`rgba32float`,data:l});return this.dirTexture=u,this.dirMin.value.copy(e),this.dirSize.value=t,this.uniforms.fields.dirOn.value=1,this.dirRes=n,u}},Wi=class{constructor(e,t,{res:n,grid:r,depths:i,name:a,slopeLevel:o,margin:c}){this.fft=e,this.cascade=t,this.tile=e.sizes[t],this.res=n,this.margin=c,this.grid=Math.ceil(r*(1+2*c)),this.depths=i,this.texture=new j({label:a,width:n,height:n,format:`rgba16float`,mips:!0,usage:[`sample`,`render`,`storage`,`copyDst`,`copySrc`],sampler:`anisoRepeat`}),this.target={texture:this.texture};let l=this.grid,u=l+1,d=new Uint32Array(l*l*6);for(let e=0,t=0;e<l;e++)for(let n=0;n<l;n++){let r=e*u+n;d[t++]=r,d[t++]=r+1,d[t++]=r+u,d[t++]=r+u,d[t++]=r+1,d[t++]=r+u+1}this.indexCount=d.length,this.indexBuffer=A.device.createBuffer({label:a+` indices`,size:d.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),A.queue.writeBuffer(this.indexBuffer,0,d),this.mipChain=new D(this.texture,a);let f=this.tile;this.pipelines=[];for(let n=0;n<i.length;n++){let r=i[n],l=`
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
`,u=s({modules:[M,e.module],code:l,stage:`render`,label:a}),d=p(u.code,a),m={srcFactor:`one`,dstFactor:`one`,operation:`add`},h=A.renderPipeline({label:a+n,layout:A.device.createPipelineLayout({bindGroupLayouts:[u.group0.layout,u.bindings.layout]}),vertex:{module:d,entryPoint:`vs`},fragment:{module:d,entryPoint:`fs`,targets:[{format:`rgba16float`,blend:{color:m,alpha:m}}]},primitive:{topology:`triangle-list`,cullMode:`none`}});this.pipelines.push({pipeline:h,bindings:u.bindings,group0:u.group0})}}render(){let e=A.getEncoder().beginRenderPass({label:this.texture.label,colorAttachments:[{view:this.texture.view({dimension:`2d`,baseMipLevel:0,mipLevelCount:1}),clearValue:[0,0,0,0],loadOp:`clear`,storeOp:`store`}]});e.setIndexBuffer(this.indexBuffer,`uint32`);for(let t of this.pipelines)e.setPipeline(A.ready(t.pipeline)),e.setBindGroup(0,t.group0.getBindGroup()),e.setBindGroup(1,t.bindings.getBindGroup()),e.drawIndexed(this.indexCount,1);e.end()}mips(e){this.mipChain.dispatch(e)}},Gi=class{constructor(e,t){this.renderer=e,this.fft=t,this.params=new c(`CausticsParams`,{strength:[`f32`,.75]},{label:`caustics`}),this.strength=this.params.fields.strength,this.detail=null;let n=t.cascades-1;this.fine=new Wi(t,n,{res:512,grid:256,depths:[1.2,4],name:`causticsFine`,slopeLevel:1,margin:.35}),this.broad=new Wi(t,n-1,{res:256,grid:128,depths:[3,9],name:`causticsBroad`,slopeLevel:.5,margin:.35}),this._module=null}update(){this.fine.render(this.renderer),this.broad.render(this.renderer),A.computePass(`Caustics Mips`,e=>{this.fine.mips(e),this.broad.mips(e)})}get module(){if(this._module)return this._module;let e=this.detail,t=this.fine,n=this.broad;return this._module=new h({name:`caustics`,deps:[M,e?e.module:null],uniforms:this.params,uniformName:`caustics`,bindings:{causticsFineTex:{texture:t.texture},causticsBroadTex:{texture:n.texture}},code:`
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
`}),this._module}get fineTex(){return this.fine.texture}get broadTex(){return this.broad.texture}},Ki=512,qi=.6,Ji=.08,Yi=new c(`GroundBounceParams`,{sun:[`vec3f`,new t(0,1,0)],strength:[`f32`,1],ready:[`f32`,0]},{label:`groundBounce`}),Xi={strength:Yi.fields.strength,module:null,exclude(e){e&&e.setDefine&&e.setDefine(`NO_GROUND_BOUNCE`,1)}},Zi=(e,t,n)=>{let r=new o().setRGB(e,t,n,x);return`vec3f( ${r.r.toFixed(6)}, ${r.g.toFixed(6)}, ${r.b.toFixed(6)} )`};function Qi({terrain:e,clouds:t=null}){let n=e=>new j({label:e,width:Ki,height:Ki,format:`rgba16float`,usage:[`sample`,`storage`]}),r=n(`groundBounceRaw`),i=n(`groundBounce`),a=Yi.fields.sun,o=Yi.fields.ready,s=new C({label:`Ground Bounce Bake`,modules:[M,e.module],bindings:{groundBounceParams:{uniform:Yi},gbRawOut:{storageTexture:r,access:`write`}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let ij = vec2f( gid.xy );
	let xz = ( ij + 0.5 ) / ${Ki}.0 * terrainParams.size + terrainParams.origin;
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
	let veg = mix( ${Zi(.3,.36,.16)}, ${Zi(.12,.17,.07)}, jungleW );
	// dry coral sand, darker where damp near the water line
	let sand = ${Zi(.86,.79,.66)} * mix( 0.6, 1.0, smoothstep( 0.2, 1.2, h ) );
	let land = mix( mix( veg, sand, sandW ), vec3f( 0.08, 0.075, 0.065 ), rockW );
	// sea: the seabed (sand in the bay) seen through the water column, down and back up
	let depth = select( 0.0, max( frame.seaLevel - h, 0.0 ), frame.waterEnabled > 0.5 );
	let seabed = mix( ${Zi(.62,.58,.48)}, ${Zi(.25,.3,.22)}, smoothstep( 0.3, 0.7, sp.y ) );
	let sea = select( seabed, seabed * exp( ( frame.waterAbsorption + frame.waterScattering ) * depth * -2.4 ) * 0.9 + vec3f( 0.01, 0.025, 0.03 ), frame.waterEnabled > 0.5 );
	let wet = smoothstep( 0.05, -0.1, h - frame.seaLevel );
	let albedo = mix( land, sea, wet );
	let nSurf = mix( n, vec3f( 0.0, 1.0, 0.0 ), wet * frame.waterEnabled );
	// heightfield sun shadow at the ground (same filtering as terrainSunShadowAt)
	let top = select( h, max( h, frame.seaLevel ), frame.waterEnabled > 0.5 );
	let vis = terrainSunShadowAt( vec3f( xz.x, top, xz.y ) );
	let E = max( dot( nSurf, L ), 0.0 ) * vis * smoothstep( -0.02, 0.05, L.y );
	let o = max( albedo * E - ${Ji} * max( L.y, 0.0 ), vec3f( 0.0 ) );
	textureStore( gbRawOut, vec2u( gid.xy ), vec4f( o, top ) );
}
`}),c=[1,4,6,4,1],l=``;for(let e=-2;e<=2;e++)for(let t=-2;t<=2;t++)l+=`	sum += textureLoad( gbRaw, clamp( c + vec2i( ${t}, ${e} ), vec2i( 0 ), vec2i( 511 ) ), 0 ) * ${(c[t+2]*c[e+2]/256).toFixed(8)};\n`;let u=new C({label:`Ground Bounce Blur`,bindings:{gbRaw:{texture:r,sampleType:`unfilterable-float`},gbMapOut:{storageTexture:i,access:`write`}},workgroupSize:[8,8,1],code:`
@compute @workgroup_size( WG_X, WG_Y, WG_Z )
fn main( @builtin( global_invocation_id ) gid: vec3u ) {
	let c = vec2i( gid.xy );
	var sum = vec4f( 0.0 );
${l}	textureStore( gbMapOut, vec2u( gid.xy ), sum );
}
`}),d=()=>{a.value.copy(m.sunDir.value),s.dispatch([Ki/8,Ki/8,1]),u.dispatch([Ki/8,Ki/8,1]),o.value=1},f=!1,p=e.updateSunShadow.bind(e);e.updateSunShadow=(e,t=!1)=>{let n=p(e,t);return(n||!f)&&d(e),f=!0,n};let g=t&&t.module?`let cloud = cloudsShadow( P.xz );`:`let cloud = 1.0;`;return Xi.module=new h({name:`hook-bounce`,deps:[M,e.module,...t&&t.module?[t.module]:[]],uniforms:Yi,uniformName:`groundBounceParams`,bindings:{groundBounceMap:{texture:i,sampleType:`unfilterable-float`}},code:`
fn hookBounce( P: vec3f, Nw: vec3f ) -> vec3f {
#if IS_WATER || NO_GROUND_BOUNCE
	return vec3f( 0.0 );
#else
	let view = sat( Nw.y * -0.5 + 0.5 );
	var E = vec3f( 0.0 );
	if ( view > 0.03 && P.y > frame.seaLevel - 0.3 && groundBounceParams.strength > 0.0 && groundBounceParams.ready > 0.0 ) {

		let st = clamp( terrainUvOf( P.xz ) * ${Ki}.0 - 0.5, vec2f( 0.0 ), vec2f( ${Ki}.0 - 1.001 ) );
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
		${g}
		// a face turned away from a low sun looks at the ground its object shades (a long shadow)
		let Lh = frame.sunDir.xz / max( length( frame.sunDir.xz ), 1e-3 );
		let selfShade = 1.0 - sat( -dot( Nw.xz, Lh ) ) * sat( 1.0 - frame.sunDir.y ) * 0.6;
		E = s.xyz * frame.sunColor * cloud * ( view * fade * selfShade * groundBounceParams.strength * ${qi} );

	}
	// the lighting adds hookBounce * diffuse colour: irradiance / PI (three: E * diffuse / PI)
	return E * INV_PI;
#endif
}
`}),Ne.set(`bounce`,Xi.module),{bake:d,map:i,raw:r}}var $i=[0,0,0,0],ea=16,ta=2500,na=900,ra=6e4,ia=8,aa=[.9,.97,1],oa=3.5,sa={sigma:15e-5,H:110},ca={sigma:32e-6,H:1400},la=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},ua=new h({name:`haze-shadow-hard`,deps:[Me],code:`
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
`}),da=class{constructor({depthTexture:e,underwater:t,atmosphere:n,sky:r=null,clouds:i=null,terrain:a=null,csm:o=null,flatExterior:s=!1}){this.depthTexture=e,this.uw=t,this.atmosphere=n,this.sky=r,this.clouds=i,this.terrain=a,this.csm=o,this.flatExterior=s,this.uniforms=new c(`HazeParams`,{density:[`f32`,1.6],shafts:[`f32`,1],enabled:[`f32`,1],frame:[`f32`,0],sunUV:[`vec2f`,new f(.5,.5)],ssFade:[`f32`,0],hasMedium:[`f32`,0],histValid:[`f32`,0]},{label:`haze`});let l=this.uniforms.fields;this.density=l.density,this.shafts=l.shafts,this.enabled=l.enabled,this.frame=l.frame,this.sunUV=l.sunUV,this.ssFade=l.ssFade,this.mediumTexture=null,this.low=new ie(1,1,{colors:[`rgba16float`],label:`hazeShafts`}),this.hist=[0,1].map(e=>new ie(1,1,{colors:[`rgba16float`],label:`hazeShaftsHistory`+e})),this._hc=0,this._histValid=!1,this.ssTargets=[0,1,2,3].map(e=>new ie(1,1,{colors:[`r16float`],label:`hazeSS`+e})),this.ssShafts=this.ssTargets[3],this.godRays=!0,this.scale=1,this._module=null,this._passes=null}setScale(e){this.scale=e}setSize(e,t){let n=this.scale*Math.sqrt(this.qualityLevel||1);this.low.setSize(Math.round(e*.5*n),Math.round(t*.5*n));for(let r of this.hist)r.setSize(Math.round(e*.5*n),Math.round(t*.5*n));this._histValid=!1;for(let r of this.ssTargets)r.setSize(Math.round(e*.25*n),Math.round(t*.25*n))}update(){this.frame.value=(this.frame.value+1)%1024;let e=this.uw.camWorld.value.elements,t=m.sunDir.value,n=this.uw.proj.value,r=e[0]*t.x+e[1]*t.y+e[2]*t.z,i=e[4]*t.x+e[5]*t.y+e[6]*t.z,a=e[8]*t.x+e[9]*t.y+e[10]*t.z,o=d.smoothstep,s=0;if(a<-.02){let e=.5+.5*(r/-a)*n.x,c=.5-.5*(i/-a)*n.y;this.sunUV.value.set(e,c),s=(1-o(Math.max(Math.abs(e-.5),Math.abs(c-.5)),.6,1.15))*o(-a,.02,.25)*(1-o(t.y,.3,.75))}(m.cameraUnderwater.value>.5||this.enabled.value<.5||this.shafts.value<=0||!this.godRays)&&(s=0),this.ssFade.value=s,this.uniforms.fields.hasMedium.value=this.mediumTexture&&m.waterEnabled.value>.5?1:0}render(){this._passes||this._build();let e=this._passes;e.march.render({colorViews:[this.low.texture],clear:$i});let t=this.enabled.value>.5&&this.shafts.value>0;if(this.uniforms.fields.histValid.value=this._histValid&&t?1:0,e.temporal[this._hc].render({colorViews:[this.hist[1-this._hc].texture],clear:$i}),this._hc=1-this._hc,this._histValid=t,this.ssFade.value>.001){e.mask.render({colorViews:[this.ssTargets[0].texture],clear:$i});for(let t=0;t<3;t++)e.blur[t].render({colorViews:[this.ssTargets[t+1].texture],clear:$i})}}_deps(){let e=Me.code.includes(`fn sunShadowHard`)?Me:ua;return[M,this.uw.module,this.atmosphere&&this.atmosphere.module,this.sky&&this.sky.module,this.clouds&&this.clouds.module,this.terrain&&this.terrain.module,e]}_defines(){return{HZ_CLOUDS:this.clouds&&this.clouds.module?1:0,HZ_TERRAIN:this.terrain&&this.terrain.module?1:0,HZ_MOON:this.sky&&this.sky.module?1:0}}get module(){return this._module||=new h({name:`haze`,deps:this._deps(),uniforms:this.uniforms,uniformName:`hazeParams`,bindings:{hazeDepth:{texture:()=>this.depthTexture}},code:`
const HZ_MARINE_SIGMA: f32 = ${la(sa.sigma)};
const HZ_MARINE_H: f32 = ${la(sa.H)};
const HZ_AEROSOL_SIGMA: f32 = ${la(ca.sigma)};
const HZ_AEROSOL_H: f32 = ${la(ca.H)};
const HZ_FAR_CLAMP: f32 = ${la(ra)};
const HZ_NEAR: f32 = ${la(na)};

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

`}),this._module}get compositeModule(){return this._compositeModule||=new h({name:`haze-composite`,deps:[this.module],bindings:{hazeLow:{texture:()=>this.hist[this._hc].texture},hazeSS:{texture:()=>this.ssShafts.texture},hazeMedium:{texture:()=>this.mediumTexture||this.low.texture}},code:`
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
				let all = sh.y * hazeInScatter( camH, dir.y, min( dist, ${la(ta)} ) );
				let lit = sat( sh.x ) * all;
				let near = Ep * lit * ( 1.0 - h ) * hazeParams.shafts;
				let deficit = fog * fSun * ( all - lit ) * h;
				out = max( out + near - deficit, vec3f( 0.0 ) );
			}

			// ---- screen-space god rays: sun colour x phase x the near air's haze depth
			if ( hazeParams.ssFade > 0.001 ) {
				let rays = textureSampleLevel( hazeSS, smpLinearClamp, uv, 0.0 ).r;
				let k = 1.0 - exp( - HZ_MARINE_SIGMA * 300.0 * hazeParams.density );
				out += Ep * rays * k * hazeParams.shafts * hazeParams.ssFade * ${la(oa)};
			}
		}
	}
	return vec4f( ${this.flatExterior?`mix(c.rgb, out, backdropBlend)`:`out`}, c.a );
}
`}),this._compositeModule}_build(){let e=this.module,t=this._defines(),n=new Fe({label:`haze march`,modules:[e],defines:t,colorFormats:[`rgba16float`],code:`
fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let R = hazeRay( uv );
	var out = vec4f( 0.0, 0.0, R.dist, 1.0 );
	${this.flatExterior?`if (R.sky && R.dir.y <= 0.025) { return out; }`:``}
	if ( hazeParams.enabled > 0.5 && frame.cameraUnderwater < 0.5 && hazeParams.shafts > 0.0 ) {
		let cam = underwaterParams.camPos;
		let tMax = min( R.dist, ${la(ta)} );
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
		for ( var i = 0; i < ${ea}; i++ ) {
			// quadratic spacing: dense near the camera (palm and pier shafts), sparse far out (clouds, hills)
			let u = ( f32( i ) + jitter ) / ${la(ea)};
			let t = u * u * tMax;
			let dt = u * ${la(2/ea)} * tMax;
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
`}),r=new Fe({label:`haze sun mask`,modules:[e],defines:t,colorFormats:[`r16float`],code:`
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
`}),i=[0,1,2].map(t=>{let n=.95/ia**+t,r=aa[t],i=``,a=0;for(let e=0;e<ia;e++){let t=r**+e;i+=`\t\tacc += textureSampleLevel( hzSrc, smpLinearClamp, uv + step * ( ${la(e)} + jit ), 0.0 ).r * ${la(t)};\n`,a+=t}return new Fe({label:`haze god rays `+t,modules:[e],bindings:{hzSrc:{texture:()=>this.ssTargets[t].texture}},colorFormats:[`r16float`],code:`
fn fragment( in: FSIn ) -> vec4f {
	var out = vec4f( 0.0 );
	if ( hazeParams.ssFade > 0.001 ) {
		let uv = in.uv;
		let step = ( hazeParams.sunUV - uv ) * ${la(n/ia)};
		// taps shifted by a per pixel, per frame fraction of a step: the fixed taps drew hard radial
		// streaks through cloud gaps and foliage; jittered, the temporal resolve blends them
		// (centred on 0: the average over frames keeps the fixed taps' result)
		let jit = fract( interleavedGradientNoise( in.pos.xy ) + hazeParams.frame * 0.61803398875 + ${la(t*.37)} ) - 0.5;
		var acc = 0.0;
${i}
		out = vec4f( acc / ${la(a)}, 0.0, 0.0, 1.0 );
	}
	return out;
}
`})}),a=[0,1].map(n=>new Fe({label:`haze shafts temporal`,modules:[e],defines:t,bindings:{hzCur:{texture:()=>this.low.texture},hzPrev:{texture:()=>this.hist[n].texture}},colorFormats:[`rgba16float`],code:`
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
`}));this._passes={march:n,mask:r,blur:i,temporal:a}}},fa=class{constructor(e,n,r){this.camera=e,this.dom=n,this.input=r,this.yaw=0,this.pitch=0,this.speed=8,this.enabled=!0,this.velocity=new t,this._fwd=new t,this._right=new t}setPose(e,t,n){this.camera.position.copy(e),this.yaw=t,this.pitch=n,this.apply()}apply(){this.camera.rotation.set(this.pitch,this.yaw,0,`YXZ`)}update(e){if(!this.enabled)return;let n=this.input,r=n.consumeLook();this.yaw-=r.x*.0022,this.pitch-=r.y*.0022,this.pitch=Math.max(-1.55,Math.min(1.55,this.pitch)),this.apply();let i=n.down(`ShiftLeft`)||n.down(`ShiftRight`),a=this.speed*(i?6:1);this.camera.getWorldDirection(this._fwd),this._right.crossVectors(this._fwd,this.camera.up).normalize();let o=new t;n.down(`KeyW`)&&o.add(this._fwd),n.down(`KeyS`)&&o.sub(this._fwd),n.down(`KeyD`)&&o.add(this._right),n.down(`KeyA`)&&o.sub(this._right),(n.down(`KeyE`)||n.down(`Space`))&&(o.y+=1),(n.down(`KeyQ`)||n.down(`KeyC`))&&--o.y,o.lengthSq()>0&&o.normalize().multiplyScalar(a),this.velocity.lerp(o,1-Math.exp(-e*8)),this.camera.position.addScaledVector(this.velocity,e)}},pa={x:q.helmX,z:q.seatZ},ma=1.62,ha=ma*.1,ga=.3,_a=1.75,va=1.35,ya=1.1,ba=new t,xa=new t,Sa=new t,Ca=new t,wa=new r,Ta=new e(0,0,0,`YXZ`),Ea=new t(0,1,0),Da=new r,Oa=new r,ka=new r,Aa=new t,ja=.24,Ma=.36,Na=.75,Pa=class{constructor({camera:e,input:n,terrain:r,colliders:i,query:a,boat:o,reef:s=null,audio:c=null,world:l=We}){this.camera=e,this.input=n,this.terrain=r,this.colliders=i,this.query=a,this.boat=o,this.reef=s,this.audio=c,this.mode=`walk`,this.camMode=`third`;let u=l.start||l.spawn;this.position=new t().copy(u.position),this.position.y=Math.max(r.heightAt(this.position.x,this.position.z),i?i.groundHeightAt(this.position.x,this.position.z,50):-1/0),this.velocity=new t,this.yaw=u.yaw,this.pitch=-.05,this.grounded=!1,this.bob=0,this.stepDist=0,this.waterH=0,this.waterMean=null,this.wade=0,this.camOff=0,this.camOffV=0,this._camY=null,this.floating=!0,this.slot=a.allocate(`player`,1),this.prompt=null,this.surface=`sand`,this.orbitYaw=0,this.orbitPitch=.22,this.orbitDist=13,this.helmYaw=0,this.helmPitch=-.05,this.camPos=new t,this.camInit=!1,this.wasUnder=!1,this.deckPos=new t,this.deckVel=new t,this.deckYaw=0,this.deckGrounded=!0,this._ashore=null,this._ashoreT=0,this.busy=!1}getViewDir(e){return e.set(0,0,-1).applyQuaternion(this.camera.quaternion)}waterHeight(){let e=this.query;if(!e.cpuValid)return 0;let t=e.cpu[this.slot*4];return Number.isFinite(t)?t:this.waterH||0}groundAt(e,t,n){let r=this.terrain.heightAt(e,t),i=this.colliders.groundHeightAt(e,t,n);return i>r&&(r=i),this.reef&&this.reef.floorHeightAt&&(r=Math.max(r,this.reef.floorHeightAt(e,t))),r}nearBoat(){if(!this.boat)return!1;let e=this.boat.toWorld(this.boat.model.boardPoint,ba),t=Math.hypot(e.x-this.position.x,e.z-this.position.z),n=Math.abs(e.y-this.position.y);return t<4.2&&n<3.2}update(e){let t=this.input;if(this.query.setPoint(this.slot,this.position.x,this.position.z),this.waterH=this.waterHeight(),this.waterMean=this.waterMean===null?this.waterH:this.waterMean+(this.waterH-this.waterMean)*(1-Math.exp(-e/4)),this.prompt=null,this.mode===`boat`){this.updateBoat(e);return}if(this.mode===`deck`){this.updateDeck(e);return}let n=t.consumeLook();if(this.yaw-=n.x*.0022,this.pitch=d.clamp(this.pitch-n.y*.0022,-1.5,1.5),this.nearBoat()&&!this.busy&&(this.prompt={key:`E`,text:`Board boat`},t.hit(`KeyE`))){this.boardBoat();return}let r=this.mode;this.mode===`walk`?this.updateWalk(e):this.updateSwim(e);let i=this.position.clone();this.mode===`walk`?i.y+=ma+Math.sin(this.bob)*.035*(1-.6*this.wade):i.y+=ha,this._camY===null||this.camera.position.y!==this._camY?(this.camOff=0,this.camOffV=0):this.mode!==r&&(this.camOff=this._camY-i.y);let a=Math.exp(-6*e),o=(this.camOffV+6*this.camOff)*e;this.camOff=(this.camOff+o)*a,this.camOffV=(this.camOffV-6*o)*a,i.y+=this.camOff,this.camera.position.copy(i),this._camY=this.camera.position.y,this.camera.quaternion.setFromEuler(Ta.set(this.pitch,this.yaw,0))}updateWalk(e){let n=this.input;Sa.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),Ca.set(-Sa.z,0,Sa.x);let r=new t;n.down(`KeyW`)&&r.add(Sa),n.down(`KeyS`)&&r.sub(Sa),n.down(`KeyD`)&&r.add(Ca),n.down(`KeyA`)&&r.sub(Ca),r.lengthSq()>0&&r.normalize();let i=this.waterH-this.position.y,a=d.clamp(i/1.2,0,1);this.wade=a;let o=n.down(`ShiftLeft`)||n.down(`ShiftRight`),s=(o?6.2:3)*d.lerp(1,.42,a),c=this.grounded?14:2.5,l=1-Math.exp(-c*e);this.velocity.x+=(r.x*s-this.velocity.x)*l,this.velocity.z+=(r.z*s-this.velocity.z)*l,this.grounded&&n.hit(`Space`)&&i<.9&&(this.velocity.y=4.6,this.grounded=!1),this.velocity.y-=9.81*e,i>0&&this.velocity.multiplyScalar(Math.exp(-e*i*.8));let u=this.position,f=u.clone();u.addScaledVector(this.velocity,e),this.colliders.resolveCapsule(u,ga,_a,.4);let p=this.groundAt(u.x,u.z,u.y+.45);u.y<=p?(u.y=p,this.velocity.y<0&&(this.velocity.y=0),this.grounded=!0):this.grounded=u.y-p<.06;let m=Math.hypot(u.x-f.x,u.z-f.z);if(this.grounded){this.bob+=m*2.4,this.stepDist+=m;let e=o?.9:.62;this.stepDist>e&&(this.stepDist=0,this.surface=this.surfaceType(i),this.audio&&this.audio.footstep(this.surface))}if(this.waterMean-u.y>va){let e=this.grounded;this.mode=`swim`,e&&(u.y=Math.max(u.y,this.waterH-ha+.1)),this.velocity.y=e?0:Math.max(this.velocity.y*.3,-2.5),this.audio&&this.audio.splash(e?.2:.5,u)}}surfaceType(e){let t=this.position;if(e>.12)return`water`;if(this.colliders.groundHeightAt(t.x,t.z,t.y+.1)>this.terrain.heightAt(t.x,t.z)+.05)return`wood`;let n=this.terrain.heightAt(t.x,t.z);return n<.6?`wetsand`:n>3.6?`grass`:`sand`}updateSwim(e){let n=this.input,r=this.position,i=this.waterH;Sa.set(0,0,-1).applyEuler(Ta.set(this.pitch,this.yaw,0)),Ca.set(-Math.cos(this.yaw),0,Math.sin(this.yaw)).negate();let a=new t;n.down(`KeyW`)&&a.add(Sa),n.down(`KeyS`)&&a.sub(Sa),n.down(`KeyD`)&&a.add(Ca),n.down(`KeyA`)&&a.sub(Ca),n.down(`Space`)&&(a.y+=1),(n.down(`KeyC`)||n.down(`ControlLeft`))&&--a.y,a.lengthSq()>0&&a.normalize(),this.floating&&r.y>i-.45&&a.y>-.25&&!n.down(`KeyC`)&&(a.y=Math.max(a.y,0));let o=n.down(`ShiftLeft`)||n.down(`ShiftRight`)?2.5:1.5,s=1-Math.exp(-e*3);this.velocity.lerp(a.multiplyScalar(o),s);let c=i-ha+.1;n.down(`KeyC`)||n.down(`KeyW`)&&this.pitch<-.35||a.y<-.1?this.floating=!1:r.y>c-.15&&(this.floating=!0),this.floating&&(r.y+=(c-r.y)*(1-Math.exp(-e*5)),this.velocity.y>0&&(this.velocity.y*=.5)),r.addScaledVector(this.velocity,e),r.y=Math.min(r.y,i+.05),this.colliders.resolveCapsule(r,ga,1,0);let l=this.groundAt(r.x,r.z,r.y+.3);r.y<l+.25&&(r.y=l+.25),this.stepDist+=this.velocity.length()*e,this.stepDist>1.3&&(this.stepDist=0,this.audio&&this.audio.swimStroke());let u=this.camera.position.y<i-.05;if(u!==this.wasUnder&&this.audio&&(u?this.audio.submerge():this.audio.emerge()),this.wasUnder=u,this.waterMean-l<ya&&(this.mode=`walk`,r.y=l,this.velocity.set(this.velocity.x,0,this.velocity.z)),this.colliders.boxes){for(let t of this.colliders.boxes)if(t.tag===`ladder`&&Math.hypot(t.center.x-r.x,t.center.z-r.z)<1.1){if(this.prompt={key:`Space`,text:`Climb ladder`},n.down(`Space`)||n.down(`KeyW`)){let n=this.colliders.groundHeightAt(t.center.x,t.center.z,10);if(n>r.y&&(r.y+=e*1.6,r.y>n-1)){let e=We.pier.deckHeight;r.set(t.center.x-Math.sign(t.center.x-We.pier.x)*1.2,e,t.center.z),this.mode=`walk`,this.velocity.set(0,0,0)}}break}}}boardBoat(){let e=this.boat;this.mode=`deck`,this.deckPos.copy(e.model.boardPoint),this.deckVel.set(0,0,0),this.deckYaw=this.yaw-(e.getYaw()+Math.PI),this.deckGrounded=!0,this._ashore=null,this._ashoreT=0,this.velocity.set(0,0,0),this._camY=null,this.deckToWorld()}takeHelm(){this.mode=`boat`,this.boat.driven=!0,this.boat.moored=!1,this.helmYaw=0,this.helmPitch=-.05,this.orbitYaw=this.boat.getYaw()+Math.PI,this.camInit=!1,this.audio&&this.audio.engineStart()}leaveHelm(){let e=this.boat;e.driven=!1,e.throttle=0,this.mode=`deck`,this.deckPos.set(pa.x+.45,e.model.lines.deckY,pa.z-.1),this.deckVel.set(0,0,0),this.deckYaw=this.helmYaw,this.pitch=this.helmPitch,this.deckGrounded=!0,this._camY=null,this.audio&&this.audio.engineStop(),this.deckToWorld()}enterBoat(){this.boardBoat(),this.takeHelm()}exitBoat(e=null,n=0){let r=this.boat,i=r.driven;r.driven=!1,r.throttle=0;let a=n?null:this.ashoreTarget(),o=We.boatDock.position;if(r.position.distanceTo(o)<14&&r.speed<1.5&&(r.moored=!0,r.mooring.anchor.set(r.position.x,0,r.position.z),r.mooring.heading=r.getYaw()),e&&(a=e),a)this.position.set(a.out.x,a.g,a.out.z),this.mode=`walk`;else{let e=r.toWorld(new t(2.2*(n||1),0,0),new t);this.waterH=this.waterMean=r.position.y,this.position.set(e.x,r.position.y-.2,e.z),this.mode=`swim`,this.audio&&this.audio.splash(.8,this.position)}this.velocity.set(0,0,0),this.yaw=r.getYaw()+Math.PI,this._camY=null,this.audio&&i&&this.audio.engineStop()}ashoreTarget(){let e=this.boat,n=this.query.cpuValid?this.query.cpu[0]:0,r=xa.set(1,0,0).applyQuaternion(e.quaternion).setY(0).normalize(),i=r.x,a=r.z,o=null,s=1/0;for(let r of e.model.exitPoints){let c=e.toWorld(r,new t),l=Math.sign(r.x)||1;for(let e of[.9,1.4,2]){let u=new t(c.x+i*l*e,c.y,c.z+a*l*e),d=this.groundAt(u.x,u.z,c.y+2.5),f=d-c.y;if(f>1.7||f<-1.2||d<n-.3)continue;let p=Math.abs(f)+e*.2;p<s&&(s=p,o={out:u,g:d,ep:r})}}return o}deckBase(e){let t=this.boat;return Da.setFromAxisAngle(Ea,t.getYaw()+Math.PI),Oa.copy(t.quaternion).multiply(ka.setFromAxisAngle(Ea,Math.PI)),e.slerpQuaternions(Oa,Da,.55)}deckToWorld(){let e=this.boat;e.toWorld(this.deckPos,this.position),this.yaw=e.getYaw()+Math.PI+this.deckYaw}deckGroundAt(e,t,n){let r=this.boat.model.lines.deckY;for(let i of this.boat.model.colliders){if(!i.walkable||Math.abs(e-i.center.x)>i.half.x||Math.abs(t-i.center.z)>i.half.z)continue;let a=i.center.y+i.half.y;a<=n&&a>r&&(r=a)}return r}updateDeck(e){let t=this.input,n=this.boat,r=n.model.lines,i=t.consumeLook();this.deckYaw-=i.x*.0022,this.pitch=d.clamp(this.pitch-i.y*.0022,-1.5,1.5);let a=Math.sin(this.deckYaw),o=Math.cos(this.deckYaw);Sa.set(a,0,o),Ca.set(-o,0,a),Aa.set(0,0,0),t.down(`KeyW`)&&Aa.add(Sa),t.down(`KeyS`)&&Aa.sub(Sa),t.down(`KeyD`)&&Aa.add(Ca),t.down(`KeyA`)&&Aa.sub(Ca),Aa.lengthSq()>0&&Aa.normalize();let s=t.down(`ShiftLeft`)?2.6:1.6,c=1-Math.exp(-12*e),l=this.deckVel;l.x+=(Aa.x*s-l.x)*c,l.z+=(Aa.z*s-l.z)*c,this.deckGrounded&&t.hit(`Space`)&&(l.y=3.2,this.deckGrounded=!1),l.y-=9.81*e;let u=this.deckPos,f=u.x,p=u.z;u.addScaledVector(l,e);for(let e=0;e<2;e++)for(let e of n.model.colliders){if(!e.solid)continue;let t=e.center.y+e.half.y,n=e.center.y-e.half.y;if(t<=u.y+Ma||n>=u.y+_a)continue;let r=e.half.x+ja,i=e.half.z+ja,a=u.x-e.center.x,o=u.z-e.center.z;if(Math.abs(a)>=r||Math.abs(o)>=i)continue;let s=r-Math.abs(a),c=i-Math.abs(o);s<c?(u.x+=Math.sign(a||f-e.center.x||1)*s,l.x=0):(u.z+=Math.sign(o||p-e.center.z||1)*c,l.z=0)}u.z=d.clamp(u.z,r.zAft+r.shell+ja,4);let m=Math.max(.15,r.halfBreadth(r.tAtSheerZ(u.z),Math.max(u.y,r.deckY))-r.shell-ja);u.x=d.clamp(u.x,-m,m);let h=this.deckGroundAt(u.x,u.z,u.y+Ma);u.y<=h?(u.y=h,l.y<0&&(l.y=0),this.deckGrounded=!0):this.deckGrounded=u.y-h<.04;let g=Math.hypot(u.x-f,u.z-p);this.deckGrounded&&(this.bob+=g*2.4,this.stepDist+=g,this.stepDist>.6&&(this.stepDist=0,this.audio&&this.audio.footstep(`wood`))),this.deckToWorld();let _=pa.x,v=pa.z,y=Math.hypot(u.x-_,u.z-v)<Na&&!this.busy;if(this._ashoreT-=e,this._ashoreT<=0&&(this._ashoreT=.25,this._ashore=n.speed<2.5?this.ashoreTarget():null),y){if(this.prompt={key:`E`,text:`Take the helm`},t.hit(`KeyE`)){this.takeHelm();return}}else if(!this.busy){let e=this._ashore&&this._ashore.ep,r=n.model.exitPoints.some(e=>Math.hypot(u.x-e.x,u.z-e.z)<1.3);if(e&&Math.hypot(u.x-e.x,u.z-e.z)<1.3){if(this.prompt={key:`E`,text:`Step ashore`},t.hit(`KeyE`)){this.exitBoat(this._ashore);return}}else if(r&&(this.prompt={key:`E`,text:`Jump overboard`},t.hit(`KeyE`))){this.exitBoat(null,Math.sign(u.x)||1);return}}let b=ba.set(u.x,u.y+ma+Math.sin(this.bob)*.02,u.z);n.toWorld(b,this.camera.position),this._camY=this.camera.position.y,this.deckBase(wa),this.camera.quaternion.copy(wa).multiply(Da.setFromEuler(Ta.set(this.pitch,this.deckYaw,0)))}updateBoat(e){let n=this.input,i=this.boat,a=n.consumeLook(),o=n.consumeWheel();if(n.hit(`KeyV`)&&(this.camMode=this.camMode===`first`?`third`:`first`),n.hit(`KeyE`)){this.leaveHelm();return}let s=0;n.down(`KeyW`)&&(s=n.down(`ShiftLeft`)?1:.7),n.down(`KeyS`)&&(s=-.6);let c=0;if(n.down(`KeyA`)&&(c+=1),n.down(`KeyD`)&&--c,i.setInput(s,c,e),this.prompt={key:`E`,text:`Leave helm   ·   V  camera`},i.toWorld(i.model.helmEye,this.position),this.position.y-=ma,this.camMode===`first`){this.helmYaw=d.clamp(this.helmYaw-a.x*.0022,-2.2,2.2),this.helmPitch=d.clamp(this.helmPitch-a.y*.0022,-1.2,1);let e=i.toWorld(i.model.helmEye,new t);this.camera.position.copy(e);let n=i.quaternion,o=new r().setFromAxisAngle(new t(0,1,0),i.getYaw()+Math.PI),s=new r().slerpQuaternions(n.clone().multiply(new r().setFromAxisAngle(new t(0,1,0),Math.PI)),o,.55),c=new r().setFromEuler(Ta.set(this.helmPitch,this.helmYaw,0));this.camera.quaternion.copy(s).multiply(c)}else{if(this.orbitYaw-=a.x*.003,this.orbitPitch=d.clamp(this.orbitPitch+a.y*.003,-.05,1.2),this.orbitDist=d.clamp(this.orbitDist*(1+o*.08),6,40),i.speed>2&&Math.abs(a.x)<.5){let t=i.getYaw()+Math.PI-this.orbitYaw;t=Math.atan2(Math.sin(t),Math.cos(t)),this.orbitYaw+=t*(1-Math.exp(-e*.8))}let n=i.toWorld(new t(0,1.4,0),new t),r=new t(Math.sin(this.orbitYaw)*Math.cos(this.orbitPitch),Math.sin(this.orbitPitch),Math.cos(this.orbitYaw)*Math.cos(this.orbitPitch)).multiplyScalar(this.orbitDist),s=n.clone().add(r);s.y=Math.max(s.y,this.waterH+.7),this.camInit||=(this.camPos.copy(s),!0),this.camPos.lerp(s,1-Math.exp(-e*6)),this.camera.position.copy(this.camPos),this.camera.lookAt(n)}}},X={minHeight:1.8,villageRadius:100,villagePalms:10,pathClear:12,path:{x:We.pier.x,z0:-130,z1:-40},spawnClear:5,obstacleClear:2,boardwalk:[[55,-65],[54.6,-72],[52.4,-82],[48.4,-92],[44.8,-100.5],[42.6,-107.2]],boardwalkWidth:1.8};function Fa(){let e=Le(),t=e.image.width,n=e.image.data;return(e,r,i)=>{let a=e*t-.5,o=r*t-.5,s=Math.floor(a),c=Math.floor(o),l=a-s,u=o-c,d=(s%t+t)%t,f=(c%t+t)%t,p=(d+1)%t,m=(f+1)%t,h=n[(f*t+d)*4+i],g=n[(f*t+p)*4+i],_=n[(m*t+d)*4+i],v=n[(m*t+p)*4+i];return((h*(1-l)+g*l)*(1-u)+(_*(1-l)+v*l)*u)/255}}var Ia=(e,t,n)=>[e*Math.cos(n)-t*Math.sin(n),e*Math.sin(n)+t*Math.cos(n)],La=class{constructor(e,{seed:n=1234,footprints:r=[],paths:i=null}={}){this.terrain=e,this.noise=new Ve(n),this.noise2=new Ve(n*7+3),this.n=new t,this.village=We.village.center,this.spawn=We.spawn.position,this.detail=Fa(),this.hasVillage=r.length>0,this.setObstacles(r,i??[{points:X.boardwalk,width:X.boardwalkWidth}])}setObstacles(e,t){this.footprints=e.map(e=>({x:e.x,z:e.z,r:e.r})),this.segments=[];for(let e of t){let t=e.points;for(let n=0;n<t.length-1;n++)this.segments.push([t[n][0],t[n][1],t[n+1][0],t[n+1][1],(e.width??1.8)*.5])}let n=this.obstacleBounds={x0:1/0,z0:1/0,x1:-1/0,z1:-1/0},r=(e,t,r)=>{n.x0=Math.min(n.x0,e-r),n.x1=Math.max(n.x1,e+r),n.z0=Math.min(n.z0,t-r),n.z1=Math.max(n.z1,t+r)};for(let e of this.footprints)r(e.x,e.z,e.r);for(let e of this.segments)r(e[0],e[1],e[4]),r(e[2],e[3],e[4])}obstacleDist(e,t){let n=this.obstacleBounds;if(e<n.x0-25||e>n.x1+25||t<n.z0-25||t>n.z1+25)return 1e9;let r=1e9;for(let n of this.footprints)r=Math.min(r,Math.hypot(e-n.x,t-n.z)-n.r);for(let[n,i,a,o,s]of this.segments){let c=a-n,l=o-i,u=c*c+l*l||1,d=Ue(((e-n)*c+(t-i)*l)/u,0,1);r=Math.min(r,Math.hypot(e-n-c*d,t-i-l*d)-s)}return r}height(e,t){return this.terrain.heightAt(e,t)}_mask(e,t,n,r=1){let i=this.terrain,a=(t-i.origin)/i.texel-.5,o=(n-i.origin)/i.texel-.5;if(a<0||o<0||a>=i.res-1||o>=i.res-1)return 0;let s=Math.floor(a),c=Math.floor(o),l=a-s,u=o-c,d=c*i.res+s;return((e[d]*(1-l)+e[d+1]*l)*(1-u)+(e[d+i.res]*(1-l)+e[d+i.res+1]*l)*u)*r}rock(e,t){return this._mask(this.terrain.rock,e,t)}normalY(e,t){return this.terrain.normalAt(e,t,this.n).y}villageDist(e,t){return Math.hypot(e-this.village.x,t-this.village.z)}pathDist(e,t){let n=X.path,r=Ue(t,n.z0,n.z1);return Math.hypot(e-n.x,t-r)}spawnDist(e,t){return Math.hypot(e-this.spawn.x,t-this.spawn.z)}inBay(e,t){return Math.abs(e-10)<235&&t>-245&&t<-30}cover(e,t,n={}){let r=this.terrain,i=this.height(e,t),a=this.normalY(e,t),o=1-a,[s,c]=Ia(e,t,.7),[l,u]=Ia(e,t,2.1),d=this.detail(s/173,c/173,3),f=this.detail(l/47,u/47,3),p=d*.6+f*.4,m=this._mask(r.gully,e,t,1/255)*P(-.5,.5,i),h=Ue(P(9,24,i+(p-.5)*18)+P(.18,.36,o)+m*.6,0,1),g=this.rock(e,t);return n.h=i,n.ny=a,n.slope=o,n.macro=p,n.mA=d,n.mB=f,n.gully=m,n.forest=h,n.rock=g,n.bare=Math.max(g*1.4,P(.42,.55,o)),n.sand=this._mask(r.sand,e,t,1/255),n.path=this._mask(r.path,e,t,1/255),n.scarp=r.scarp?this._mask(r.scarp,e,t,1/255):0,n}allowed(e,t,n,{minH:r=X.minHeight,maxBare:i=.35,clear:a=0,big:o=!1,maxSand:s=.5,maxPath:c=.3}={}){return!(n.h<r||n.bare>i||n.sand>s||n.path>c||n.scarp>.3||this.spawnDist(e,t)<X.spawnClear+a||this.pathDist(e,t)<(o?X.pathClear:X.pathClear*.5)||this.obstacleDist(e,t)<X.obstacleClear+a||this.terrain.pathDistance&&this.terrain.pathDistance(e,t)<.6+a*.5)}groundY(e,t,n){let r=this.height(e,t);return n>0&&(r=Math.min(r,this.height(e+n,t),this.height(e-n,t),this.height(e,t+n),this.height(e,t-n))),r}downhill(e,t){this.terrain.normalAt(e,t,this.n);let n=Math.hypot(this.n.x,this.n.z);return n>1e-4?[this.n.x/n,this.n.z/n]:[0,1]}},Ra=class{constructor(e=4){this.cell=e,this.map=new Map}_key(e,t){return(e+32768)*65536+(t+32768)}add(e,t,n,r){let i=this._key(Math.floor(e/this.cell),Math.floor(t/this.cell)),a=this.map.get(i);a||this.map.set(i,a=[]),a.push(e,t,n,r)}free(e,t,n,r=1){let i=n+8,a=this.cell,o=Math.floor((e-i)/a),s=Math.floor((e+i)/a),c=Math.floor((t-i)/a),l=Math.floor((t+i)/a);for(let i=c;i<=l;i++)for(let a=o;a<=s;a++){let o=this.map.get(this._key(a,i));if(o)for(let i=0;i<o.length;i+=4){let a=o[i]-e,s=o[i+1]-t,c=(o[i+2]+n)*r;if(a*a+s*s<c*c)return!1}}return!0}},za={PALM:1,TREE:2,BANANA:3,SHRUB:4,YOUNG:5,FERN:6,BROAD:7};function Ba(e,t,n,r,i,a,o){for(let s=n;s<i;s+=a)for(let n=t;n<r;n+=a)o(n+e()*a,s+e()*a)}var Va=null;function Ha(e,t,n,r=!1){let i=Va;if(n.h<2.3||n.h>80||n.bare>.45||n.path>.3)return 0;let a=i.villageDist(e,t),o=P(X.villageRadius+5,X.villageRadius+40,a);return o<=0?0:o*(1-.6*(P(18,55,n.h)*(1-n.gully))+.5*n.gully)*(r?1:1-P(.35,.7,n.sand))*(1-P(.25,.45,n.rock))}function Ua(e,t=99){Va=e;let n=Be(t),r=new Ra(4),i=new Ra(6),a=e.noise,o=e.noise2,s={palms:[],trees:[],bananas:[],shrubs:[],youngPalms:[],ferns:[],monsteras:[],elephantEars:[],heliconias:[],strelitzias:[]},c=Math.PI*2,l={},u=-660,d=-900;Ba(n,u,d,660,320,4.6,(t,u)=>{if(e.cover(t,u,l),l.h<3)return;let d=a.fbm(t/60,u/60,3)*.6+o.fbm(t/17,u/17,2)*.4,f=l.forest>.5?.9:P(.15,.5,l.forest)*.38*P(-.25,.2,d)+.008;if(u>-20&&(f=l.forest>.5?.45*P(-.2,.2,d):f),l.forest<=.5&&(f+=Ha(t,u,l)*(.9*P(-.2,.2,d)+.1)),n()>f||!e.allowed(t,u,l,{minH:3,maxBare:.3,clear:5,big:!0}))return;let p=(l.forest>.5&&n()<.3?.55+n()*.2:.8+n()*.5)*(l.forest>.5?1:.85)*(n()<.08?1.3:1),m=.78+n()*.34+(n()<.1?.25:0),h=2.5*p;if(!i.free(t,u,h,1))return;i.add(t,u,h,za.TREE),r.add(t,u,.5*p,za.TREE);let g=n()*c;s.trees.push({x:t,y:e.groundY(t,u,.6)-.15,z:u,s:p,sy:m,yaw:g,la:g,l:m,H:12.5*p*m,seed:n()})});let f=(t,r,i)=>{let[a,o]=e.downhill(t,r),s=a*.35,l=1+o*.35,u=Math.atan2(l,s)+(n()-.5)*1.1,d=(.1+.32*(1-P(2.3,5.5,i)))*(.55+.75*n()),f=.85+n()*.32,p=(7+n()*6.5)*(.9+.2*f);return{x:t,y:e.groundY(t,r,.35)-.05,z:r,s:f,yaw:n()*c,la:u,l:d,H:p,seed:n()}};Ba(n,-240,-230,250,-40,3.4,(t,c)=>{if(!e.inBay(t,c)||e.villageDist(t,c)<X.villageRadius)return;e.cover(t,c,l);let u=a.fbm(t/48,c/48,3)+.4*o.fbm(t/17,c/17,2),d=P(1.95,2.35,l.h)*(1-P(5.2,7.2,l.h)),p=.5*P(-.28,.22,u)*d;n()>p||!e.allowed(t,c,l,{minH:2,maxBare:.2,clear:3,big:!0,maxSand:1.01,maxPath:.5})||l.ny<.9||r.free(t,c,1.95,1)&&i.free(t,c,1.5,1)&&(r.add(t,c,1.95,za.PALM),s.palms.push(f(t,c,l.h)))});let p=[];Ba(n,-70,-220,150,-60,3.5,(t,r)=>{if(e.villageDist(t,r)>=X.villageRadius||!e.hasVillage&&r<-106||(e.cover(t,r,l),l.h<2.05||l.h>14||l.bare>.2||l.ny<.9)||e.pathDist(t,r)<X.pathClear||e.spawnDist(t,r)<X.spawnClear+3)return;let i=e.obstacleDist(t,r);if(i<3.5)return;let a=e.hasVillage?P(4.5,6,i)*(1-P(10,16,i)):0,o=P(2,2.3,l.h)*(1-P(3.6,4.4,l.h));p.push({x:t,z:r,h:l.h,r:n()*(.25+Math.max(a,o))})}),p.sort((e,t)=>t.r-e.r);let m=0;for(let e of p){if(m>=X.villagePalms)break;r.free(e.x,e.z,5.5,1)&&i.free(e.x,e.z,3,1)&&(r.add(e.x,e.z,5.5,za.PALM),s.palms.push(f(e.x,e.z,e.h)),m++)}s.villagePalms=m,Ba(n,u,d,660,-20,12,(t,a)=>{e.cover(t,a,l);let u=o.fbm(t/110+3.3,a/110-1.7,3),d=(.04+.4*P(0,.45,u))*(1-P(60,160,l.h));if(n()>d||e.villageDist(t,a)<X.villageRadius||!e.allowed(t,a,l,{minH:6,maxBare:.2,clear:3,big:!0})||l.ny<.8||!r.free(t,a,2,1)||!i.free(t,a,1.2,1))return;r.add(t,a,2,za.PALM);let[f,p]=e.downhill(t,a),m=.8+n()*.35;s.palms.push({x:t,y:e.groundY(t,a,.35)-.05,z:a,s:m,yaw:n()*c,la:Math.atan2(p,f)+(n()-.5)*1.5,l:.03+n()*.12,H:(8+n()*7)*m,seed:n()})});for(let e of s.palms){let t=0,n=0;for(let r of s.palms){if(r===e)continue;let i=e.x-r.x,a=e.z-r.z,o=i*i+a*a;if(o<25&&o>1e-6){let e=Math.sqrt(o);t+=i/e*(5-e),n+=a/e*(5-e)}}if(t!==0||n!==0){let r=Math.cos(e.la),i=Math.sin(e.la),a=Math.min(1,Math.hypot(t,n)/3);e.la=Math.atan2(i*(1-a)+n/Math.hypot(t,n)*a,r*(1-a)+t/Math.hypot(t,n)*a),e.l=Math.max(e.l,.14+.1*a)}}return Ba(n,u,d,660,320,3,(t,i)=>{if(e.cover(t,i,l),l.h<2.3)return;let u=a.fbm(t/26+11.3,i/26-4.1,3)*.7+o.fbm(t/9,i/9,2)*.3,d=P(.2,.45,l.forest)*(1-P(.75,.95,l.forest)),f=e.inBay(t,i)&&l.h<5.5,p=d*.75+l.gully*.5+(l.forest>.9?.12:0)+(f?.08:.03),m=Ha(t,i,l,!0);if(p+=m*(.32+.45*(1-P(3.5,9,l.h)))*(1-P(.5,.8,l.forest)),p*=P(-.2,.25,u),e.villageDist(t,i)<X.villageRadius&&(p*=.35),n()>p||!e.allowed(t,i,l,{minH:2.3,maxBare:.4,clear:1.2}))return;let h=(.75+n()*.8)*(m>.3?1.35:1),g=.65+n()*.65;if(!r.free(t,i,.85*h,1))return;r.add(t,i,.85*h,za.SHRUB);let _=n()*c;s.shrubs.push({x:t,y:e.groundY(t,i,.3)-.08*h,z:i,s:h,sy:g,yaw:_,la:_,l:-g,H:1.6*h*g,seed:n()})}),Ba(n,-280,-420,360,-40,4.2,(t,i)=>{let a=e.villageDist(t,i);if(a>330)return;e.cover(t,i,l);let u=o.fbm(t/38-5.1,i/38+2.2,3),d=.75*P(.12,.38,u)*(1-P(220,330,a))*(1-P(.8,1,l.forest)*.6);if(n()>d||!e.allowed(t,i,l,{minH:3.4,maxBare:.2,clear:1.5})||l.ny<.82)return;let f=.8+n()*.45;r.free(t,i,1.1*f,1)&&(r.add(t,i,1.1*f,za.BANANA),s.bananas.push({x:t,y:e.groundY(t,i,.2)-.05,z:i,s:f,yaw:n()*c,la:n()*c,l:n()*.08,H:1.8*f*(.8+n()*.5),seed:n()}))}),Ba(n,u,d,660,-20,6.5,(t,i)=>{if(e.cover(t,i,l),l.h<2.3||l.h>120)return;let o=a.fbm(t/48,i/48,3),u=(e.inBay(t,i)?.22:.1)*P(-.3,.2,o)*(1-l.forest*.6);if(n()>u||!e.allowed(t,i,l,{minH:2.3,maxBare:.2,clear:1.5}))return;let d=.7+n()*.6;r.free(t,i,1.1*d,1)&&(r.add(t,i,1.1*d,za.YOUNG),s.youngPalms.push({x:t,y:l.h-.05,z:i,s:d,yaw:n()*c,la:n()*c,l:n()*.1,H:.35*d,seed:n()}))}),Ba(n,u,d,660,-20,2.2,(t,i)=>{if(e.cover(t,i,l),l.h<4)return;let a=o.fbm(t/28-9.9,i/28+3.7,3),u=(.08+.72*P(.3,.8,l.forest)+l.gully*.4)*P(-.35,.2,a);if(n()>u||!e.allowed(t,i,l,{minH:4,maxBare:.45,clear:.5}))return;let d=.75+n()*.7;r.free(t,i,.5*d,1)&&(r.add(t,i,.5*d,za.FERN),s.ferns.push({x:t,y:l.h-.03,z:i,s:d,yaw:n()*c,la:0,l:0,H:.05,seed:n()}))}),Ba(n,u,d,660,-20,3.2,(t,i)=>{if(e.cover(t,i,l),l.h<3.5)return;let a=o.fbm(t/22+7.7,i/22-1.3,3),u=e.villageDist(t,i)<95?.18*P(.3,.7,l.forest+.4):0,d=(.5*P(.35,.75,l.forest)+l.gully*.35+u)*P(0,.35,a);if(n()>d||!e.allowed(t,i,l,{minH:3.5,maxBare:.35,clear:1,maxSand:.15})||l.ny<.75)return;let f=.8+n()*.6;r.free(t,i,.9*f,1)&&(r.add(t,i,.9*f,za.BROAD),s.monsteras.push({x:t,y:l.h-.04,z:i,s:f,yaw:n()*c,la:n()*c,l:n()*.05,H:.02,seed:n()}))}),Ba(n,u,d,660,-20,3.6,(t,i)=>{if(e.cover(t,i,l),l.h<2.6)return;let o=a.fbm(t/30-3.1,i/30+8.4,3),u=(l.gully*.8+P(7,3,l.h)*.25+P(.25,.5,l.forest)*(1-P(.7,.95,l.forest))*.25)*P(.05,.4,o);if(n()>u||!e.allowed(t,i,l,{minH:2.6,maxBare:.3,clear:1,maxSand:.15})||l.ny<.8)return;let d=.95+n()*.55;r.free(t,i,1.1*d,1)&&(r.add(t,i,1.1*d,za.BROAD),s.elephantEars.push({x:t,y:l.h-.04,z:i,s:d,yaw:n()*c,la:n()*c,l:n()*.05,H:.02,seed:n()}))}),Ba(n,u,d,660,-20,3.4,(t,i)=>{let a=e.villageDist(t,i);if(e.cover(t,i,l),l.h<3)return;let u=P(.2,.45,l.forest)*(1-P(.7,.9,l.forest)),d=e.obstacleDist(t,i),f=a<110?P(16,4,d)*.45+.04:0,p=(u*.12+f)*P(-.1,.3,o.fbm(t/18+2.2,i/18-6.6,2));if(n()>p||!e.allowed(t,i,l,{minH:3,maxBare:.3,clear:1.2,maxSand:.25})||l.ny<.8)return;let m=.85+n()*.35;r.free(t,i,.9*m,1)&&(r.add(t,i,.9*m,za.BROAD),s.heliconias.push({x:t,y:l.h-.04,z:i,s:m,yaw:n()*c,la:n()*c,l:n()*.04,H:.02,seed:n()}))}),Ba(n,u,d,660,-20,3,(t,i)=>{if(e.villageDist(t,i)>105||(e.cover(t,i,l),l.h<3))return;let o=e.obstacleDist(t,i),u=P(10,3.5,o)*.35*P(-.2,.3,a.fbm(t/14-4.4,i/14+6.6,2));if(n()>u||!e.allowed(t,i,l,{minH:3,maxBare:.3,clear:.8,maxSand:.25})||l.ny<.85)return;let d=.85+n()*.3;r.free(t,i,.7*d,1)&&(r.add(t,i,.7*d,za.BROAD),s.strelitzias.push({x:t,y:l.h-.03,z:i,s:d,yaw:n()*c,la:n()*c,l:n()*.03,H:.02,seed:n()}))}),s}function Wa(e){let t=e.terrain,n=Math.round(t.size/2),r=t.size/n,i=new Uint8Array(n*n*4),a=e.noise,o=e.noise2,s={};for(let c=1;c<n-1;c++){let l=t.origin+(c+.5)*r;if(!(l>0||l<-950))for(let u=1;u<n-1;u++){let d=c*n+u,f=t.origin+(u+.5)*r;if(t.heightAt(f,l)<1.7||e.rock(f,l)>.45||(e.cover(f,l,s),s.bare>.5))continue;let p=e.spawnDist(f,l);if(p<X.spawnClear+2)continue;let m=e.obstacleDist(f,l);if(m<X.obstacleClear+1)continue;let h=P(X.spawnClear+2,X.spawnClear+4,p)*P(X.obstacleClear+1,X.obstacleClear+3.5,m)*(1-P(.2,.5,s.path))*(1-P(.25,.45,s.bare)),g=e.inBay(f,l),_=a.noise(f/7.5,l/7.5)*.65+o.noise(f/19,l/19)*.35,v=e.hasVillage?1-.55*(1-P(3,9,m)):1-.85*(1-P(X.villageRadius-6,X.villageRadius+4,e.villageDist(f,l))),y=P(2.5,4.5,s.h)*(1-P(.45,.85,s.forest))*(1-P(.3,.7,s.sand))*v*(.75+.25*P(-.4,.3,_)),b=0,x=0,S=0;if(g){let n=a.noise(f/16+4.4,l/16-2.2)*.6+o.noise(f/6-1.7,l/6+8.1)*.4,r=s.h-(2.15-n*.4),i=0;if(s.scarp<.3&&t.scarp){let n=e.height(f+8,l)-e.height(f-8,l),r=e.height(f,l+8)-e.height(f,l-8),a=Math.hypot(n,r);if(a>.001){n/=a,r/=a;for(let a=1;a<=34;a+=1.5)i=Math.max(i,e._mask(t.scarp,f+n*a,l+r*a,1/255))}i=P(.3,.5,i)}let c=P(.3,.5,s.scarp);r=r*(1-i)-2*i;let u=P(0,.35,r),d=P(-.45,-.1,r)*(1-u)*P(.35,.6,a.noise(f/2.6+9.3,l/2.6-4.1)),p=1-P(4.8,6.5,s.h),m=o.noise(f/4.2+5.5,l/4.2-3.3)*.6+a.noise(f/11-7.1,l/11+1.9)*.4,h=(.3+.7*P(-.45,.25,m))*(.6+.4*P(-.35,.35,_));b=Math.max(u*h,d*.85)*p*(1-P(.4,.8,s.forest)),b=b*(1-c)+c*.18*P(.7,1,s.scarp)*P(0,.4,m),x=P(0,.25,r)*(1-P(1.4,2.2,r))*P(0,.45,a.noise(f/13+3.1,l/13-7.7)),S=P(-.6,-.15,r)*(1-P(1.2,2,r))*P(-.15,.3,o.noise(f/9-2.3,l/9+5.3)),S=Math.max(S*(1-c),c*.6*P(0,.35,o.noise(f/3.5+1.1,l/3.5-2.9)))}let C=d*4;i[C]=Math.round(255*Ue(b*h,0,1)),i[C+1]=Math.round(255*Ue(y*h*(1-b),0,1)),i[C+2]=Math.round(255*Ue(x*h,0,1)),i[C+3]=Math.round(255*Ue(S*h,0,1))}}return{data:i,res:n}}var Ga=1100,Ka=new b,qa=new r,Ja=new t,Ya=new t,Xa=new t(0,1,0),Za=class{constructor(e,t=32){let n=e.length;this.count=n,this.qualityLevel=1,this.qualityRanks=ne(n),this.qualityLimit=n,this.px=new Float32Array(n),this.py=new Float32Array(n),this.pz=new Float32Array(n),this.matrices=new Float32Array(n*16),this.qr2=new Float32Array(n),this.iPos=new Float32Array(n*4),this.iDat=new Float32Array(n*4);for(let t=0;t<n;t++){let n=e[t];this.px[t]=n.x,this.py[t]=n.y,this.pz[t]=n.z,Ja.set(n.x,n.y,n.z),qa.setFromAxisAngle(Xa,n.yaw),n.msx===void 0?Ya.set(n.s,n.s*Math.abs(n.sy||1),n.s):Ya.set(n.msx,n.msy,n.msz),Ka.compose(Ja,qa,Ya).toArray(this.matrices,t*16),this.iPos.set([n.x,n.y,n.z,n.s],t*4),this.iDat.set([n.la||0,n.l||0,n.H||1,n.seed],t*4),this.qr2[t]=n.qr?n.qr*n.qr:0}this.cellSize=t;let r=new Map;for(let e=0;e<n;e++){let n=this._key(Math.floor(this.px[e]/t),Math.floor(this.pz[e]/t)),i=r.get(n);i||r.set(n,i=[]),i.push(e)}this.cells=new Map;for(let[e,t]of r)this.cells.set(e,Int32Array.from(t))}_key(e,t){return(e+4096)*8192+(t+4096)}queryNear(e,t,n,r){let i=this.cellSize,a=Math.floor((e-n)/i),o=Math.floor((e+n)/i),s=Math.floor((t-n)/i),c=Math.floor((t+n)/i),l=n*n,u=0;for(let n=s;n<=c;n++)for(let i=a;i<=o;i++){let a=this.cells.get(this._key(i,n));if(a)for(let n=0;n<a.length;n++){let i=a[n],o=this.px[i]-e,s=this.pz[i]-t,c=this.qr2[i]||l;o*o+s*s<c&&u<r.length&&(r[u++]=i)}}return u}},Qa=class{constructor(e,t,n){this.capacity=Math.max(t,Ga);let r=this.capacity;this.instanceMatrix=new ue(new Float32Array(r*16),16),this.iBuffer=new oe(new Float32Array(r*8),8),this.iPos=new de(this.iBuffer,4,0),this.iDat=new de(this.iBuffer,4,4),this.lodRange=n.clone(),this.meshes=[],this.count=0,this.trianglesPerInstance=0;for(let{geometry:t,material:n,castShadow:i=!1,name:a=``}of e){t.setAttribute(`iPos`,this.iPos),t.setAttribute(`iDat`,this.iDat);let e=new ve(t,n,r);e.instanceMatrix=this.instanceMatrix,e.count=0,e.name=a,e.castShadow=i,e.receiveShadow=!0,e.frustumCulled=!1,e.userData.lodRange=this.lodRange,e.drawParams=[this.lodRange.x,this.lodRange.y,this.lodRange.z],e.matrixAutoUpdate=!1,e.updateMatrix(),this.meshes.push(e),this.trianglesPerInstance+=(t.index?t.index.count:t.attributes.position.count)/3}}setDynamic(){this.instanceMatrix.setUsage(le),this.iBuffer.setUsage(le)}fill(e,t=null,n=e.count,r=!0){n=Math.min(n,t===null?e.count:t.length);let i=0,a=this.instanceMatrix.array,o=this.iBuffer.array,s=e.matrices,c=e.iPos,l=e.iDat;for(let u=0;u<n&&i<this.capacity;u++){let n=t===null?u:t[u];if(e.qualityLevel===0||e.qualityLevel<1&&e.qualityRanks[n]>=e.qualityLimit)continue;if(r){let e=n*16,t=i*16;for(let n=0;n<16;n++)a[t+n]=s[e+n]}let d=n*4,f=i*8;o[f]=c[d],o[f+1]=c[d+1],o[f+2]=c[d+2],o[f+3]=c[d+3],o[f+4]=l[d],o[f+5]=l[d+1],o[f+6]=l[d+2],o[f+7]=l[d+3],i++}n=i,r&&(this.instanceMatrix.clearUpdateRanges(),this.instanceMatrix.addUpdateRange(0,n*16),this.instanceMatrix.needsUpdate=!0),this.iBuffer.clearUpdateRanges(),this.iBuffer.addUpdateRange(0,n*8),this.iBuffer.needsUpdate=!0,this.count=n;for(let e of this.meshes)e.count=n}get triangles(){return this.count*this.trianglesPerInstance}},$a=class{constructor(e,n,{near:r=null,far:i=null,nearRange:a=100,fade:o=null,margin:s=14,refreshDistance:c=6,farExcludeNear:l=!1,sortNear:u=!1,sortFar:d=!1,farRefresh:f=16}={}){this.name=e,this.sortNear=u,this.sortFar=d&&!!i&&!l,this.farRefresh=f,this.farX=1/0,this.farZ=1/0,this.inst=new Za(n),this.nearRange=a,this.margin=s,this.refreshDistance=c,this.lastX=1/0,this.lastY=1/0,this.lastZ=1/0,this.levels=[];let p=i?new t(0,a,a+.01):new t(0,o[0],o[1]);this.queryRadius=(i?a:o[1])+s,r&&(this.nearIds=new Int32Array(Math.max(1,this.inst.count)),this.near=new Qa(r,Math.min(this.inst.count,6e3),p),this.near.setDynamic(),this.levels.push(this.near)),i&&(this.far=new Qa(i.parts,this.inst.count,new t(a,i.fade[0],i.fade[1])),this.far.fill(this.inst),this.levels.push(this.far),this.sortFar&&(this.far.setDynamic(),this.farIds=new Int32Array(Math.max(1,this.inst.count))),this.farExcludeNear=l,l&&(this.far.setDynamic(),this.farIds=new Int32Array(Math.max(1,this.inst.count))))}get meshes(){return this.levels.flatMap(e=>e.meshes)}overdue(e){if(!this.near)return-1;let t=e.x-this.lastX,n=e.y-this.lastY,r=e.z-this.lastZ,i=t*t+n*n+r*r,a=Number.isFinite(i)?Math.sqrt(i)-this.refreshDistance:1e9;if(!this.sortFar)return a;let o=Math.hypot(e.x-this.farX,e.z-this.farZ);return Math.max(a,Number.isFinite(o)?o-this.farRefresh:1e9)}_sortFar(e){this.farX=e.x,this.farZ=e.z;let{px:t,pz:n,count:r}=this.inst,i=this._bucket||=new Uint16Array(r),a=this._bstart||=new Int32Array(1025);a.fill(0);for(let o=0;o<r;o++){let r=Math.min(1023,Math.floor(Math.hypot(t[o]-e.x,n[o]-e.z)/6));i[o]=r,a[r+1]++}for(let e=0;e<1024;e++)a[e+1]+=a[e];for(let e=0;e<r;e++)this.farIds[a[i[e]]++]=e;this.far.fill(this.inst,this.farIds,r,!1)}update(e,t=!1){if(!this.near||!t&&this.overdue(e)<0)return!1;this.sortFar&&!(Math.hypot(e.x-this.farX,e.z-this.farZ)<this.farRefresh)&&this._sortFar(e),this.lastX=e.x,this.lastY=e.y,this.lastZ=e.z;let n=this.inst.queryNear(e.x,e.z,this.queryRadius,this.nearIds);if(this.sortNear){let{px:t,pz:r}=this.inst,i=this.nearIds.subarray(0,n),a=this._sortKey||=new Float32Array(this.nearIds.length);for(let o=0;o<n;o++){let n=i[o];a[n]=(t[n]-e.x)**2+(r[n]-e.z)**2}i.sort((e,t)=>a[e]-a[t])}if(this.near.fill(this.inst,this.nearIds,n),this.farExcludeNear){let t=Math.max(0,this.nearRange-this.refreshDistance-2),n=t*t,{px:r,py:i,pz:a}=this.inst,o=0;for(let t=0;t<this.inst.count;t++){let s=r[t]-e.x,c=i[t]-e.y,l=a[t]-e.z;s*s+c*c+l*l>=n&&(this.farIds[o++]=t)}this.far.fill(this.inst,this.farIds,o)}return!0}},eo=class{constructor(){this.pos=[],this.nor=[],this.uv=[],this.veg=[],this.mat=[],this.lobe=[],this.kind=0,this.idx=[]}get count(){return this.pos.length/3}vertex(e,t,n,r,i,a,o=null){return o?this.lobe.push(o[0],o[1],o[2],o[3]):this.lobe.push(0,0,0,-1-this.kind),this.pos.push(e.x,e.y,e.z),this.nor.push(t.x,t.y,t.z),this.uv.push(n,r),this.veg.push(i[0],i[1],i[2],i[3]),this.mat.push(a[0],a[1],a[2],a[3]),this.count-1}tri(e,t,n){this.idx.push(e,t,n)}quad(e,t,n,r){this.idx.push(e,t,n,e,n,r)}build(e=0,t=null){let n=this.count,r=[[`position`,this.pos,3],[`normal`,this.nor,3],[`uv`,this.uv,2],[`aVeg`,this.veg,4],[`aMat`,this.mat,4],[`aLobe`,this.lobe,4]],i=r.reduce((e,t)=>e+t[2],0),a=new Float32Array(n*i),o=0;for(let[,e,t]of r){for(let r=0;r<n;r++)for(let n=0;n<t;n++)a[r*i+o+n]=e[r*t+n];o+=t}let s=new Ae(a,i),c=new ke;o=0;for(let[e,,t]of r)c.setAttribute(e,new de(s,t,o)),o+=t;return c.setIndex(n>65535?new se(this.idx,1):new ce(this.idx,1)),c.computeBoundingBox(),c.computeBoundingSphere(),e>0&&(c.boundingSphere.radius=Math.max(c.boundingSphere.radius,e),t&&c.boundingSphere.center.copy(t)),c}get triangles(){return this.idx.length/3}},Z={STEM:0,FROND:1,FERN:2,BANANA:3,COCONUT:5,MONSTERA:6,ELEPHANT:7,HELICONIA:8,BRACT:9,STRELITZIA:10,BIRD:11},to=new t(0,1,0),no=new t,ro=new t,io=new t,ao=new t,oo=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function so(e,{radial:t,rows:n,radius:r,Hgeo:i,mat:a=[0,0,0,0],cap:o=!0,texU:s=1,lumps:c=null}){let l=e.count;for(let o=0;o<n.length;o++){let l=n[o],u=r(l),d=.01,f=(r(l+d)-r(l-d))/(2*d*i);for(let n=0;n<=t;n++){let r=n/t*Math.PI*2,o=Math.cos(r),d=Math.sin(r),p=c?u*(1+c(l,r)):u;no.set(o*p,l*i,d*p),ro.set(o,-f,d).normalize(),e.vertex(no,ro,n/t*s,l,[l,0,0,0],a)}}for(let r=0;r<n.length-1;r++)for(let n=0;n<t;n++){let i=l+r*(t+1)+n,a=i+t+1;e.quad(i,a,a+1,i+1)}if(o){let r=n[n.length-1],o=e.vertex(no.set(0,r*i,0),to,.5,r,[r+.015,0,0,0],a),s=l+(n.length-1)*(t+1);for(let n=0;n<t;n++)e.tri(s+n,o,s+n+1)}}function co(e,n){let{origin:r,azimuth:i,elevation:a,bend:o,twist:s=0,length:c,segs:l=8,cross:u=2,leafLen:d,leafAngle:f,droop:p,curl:m=.2,part:h=Z.FROND,age:g=0,seed:_=0,phase:v=0,flutter:y=1,minWidth:b=.035,bendPow:x=1.4,stemU:S=1,roll:C=0,sBase:w=0}=n,T=[],E=r.clone();for(let e=0;e<=l;e++){T.push(E.clone());let t=(e+.5)/l,n=a-o*t**+x,r=i+s*t;no.set(Math.cos(n)*Math.cos(r),Math.sin(n),Math.cos(n)*Math.sin(r)),E.addScaledVector(no,c/l)}let D=new t(-Math.sin(i),0,Math.cos(i)),O=new t,k=new t,ee=new t,te=new t,ne=new t;for(let t of[-1,1]){let n=[];for(let e=0;e<=l;e++){let r=e/l;O.subVectors(T[Math.min(l,e+1)],T[Math.max(0,e-1)]).normalize(),k.crossVectors(O,to),k.lengthSq()<.04&&k.copy(D),k.normalize(),ee.crossVectors(k,O).normalize();let i=Math.max(d(r),b),a=f(r),o=p(r)+t*C*r*r;te.copy(k).multiplyScalar(t*Math.cos(o)).addScaledVector(ee,-Math.sin(o)),ne.copy(O).multiplyScalar(Math.cos(a)).addScaledVector(te,Math.sin(a)).normalize();let s=[];for(let t=0;t<=u;t++){let n=t/u,a=T[e].clone().addScaledVector(ne,i*n).addScaledVector(ee,-i*m*n*n);s.push({q:a,s:r,t:n,Ll:i,nup:ee.clone()})}n.push(s)}let r=[];for(let t=0;t<=l;t++){let i=[];for(let r=0;r<=u;r++){let a=n[t][r],o=Math.max(0,t-1),s=Math.min(l,t+1),c=Math.max(0,r-1),d=Math.min(u,r+1);ro.subVectors(n[s][r].q,n[o][r].q),io.subVectors(n[t][d].q,n[t][c].q),ao.crossVectors(ro,io),ao.lengthSq()<1e-12&&ao.copy(a.nup),ao.normalize(),ao.dot(a.nup)<0&&ao.negate();let f=a.t*oo(.05,.3,a.s)*y;i.push(e.vertex(a.q,ao,a.s,a.t,[S,w+(1-w)*a.s,f,v],[h,g,a.Ll,_]))}r.push(i)}for(let n=0;n<l;n++)for(let i=0;i<u;i++){let a=r[n][i],o=r[n+1][i],s=r[n+1][i+1],c=r[n][i+1];t>0?e.quad(a,c,s,o):e.quad(a,o,s,c)}}}function lo(e,t,n,r,i){let a=new pe(1,0),o=a.attributes.position,s=new Map,c=[];for(let a=0;a<o.count;a++){no.fromBufferAttribute(o,a);let l=no.x.toFixed(3)+`,`+no.y.toFixed(3)+`,`+no.z.toFixed(3),u=s.get(l);u===void 0&&(ro.copy(no).multiply(n).add(t),io.copy(no).divide(n).normalize(),u=e.vertex(ro,io,.5,.5,i,r),s.set(l,u)),c.push(u)}for(let t=0;t<c.length;t+=3)e.tri(c[t],c[t+1],c[t+2]);a.dispose()}var uo=10,fo=e=>{let t=e*uo,n=.155+.045*(1-e)+.19*Math.exp(-Math.max(t,0)/.42);return n*=1+.05*Math.sin(t*1.7)*(1-e),n+=.07*oo(.955,.99,e)-.1*oo(.995,1.02,e),n},po=(e,t)=>{let n=Math.max(e*uo,0);return Math.exp(-n/.3)*(.16*Math.max(0,Math.sin(t*5+.7))+.08*Math.sin(t*11+2.1))};function mo(e,t){let n=[];for(let r=0;r<t;r++){let i=t>1?r/(t-1):.5,a=t>10&&r>=t-2,o=(3.8+1.5*oo(0,.45,i))*(.88+.24*e());n.push({a:i,dead:a,azimuth:r*2.39996+(e()-.5)*.4,elevation:a?-1.05-(r-(t-2))*.25:1-1.25*i**.8+(e()-.5)*.3,bend:a?.35:.55+1.15*i+e()*.4,bendPow:a?1.2:1.9+e()*.5,twist:(e()-.5)*.45,roll:(e()-.5)*(a?.4:.9),length:a?o*.9:o,attachY:.32-.5*i,seed:e(),phase:e()})}return n}function ho(e,n,{segs:r,cross:i,leafScale:a=1}){for(let o of n){let n=new t(Math.cos(o.azimuth)*.14,o.attachY,Math.sin(o.azimuth)*.14),s=o.length;co(e,{origin:n,azimuth:o.azimuth,elevation:o.elevation,bend:o.bend,bendPow:o.bendPow,twist:o.twist,roll:o.roll,length:s,segs:r,cross:i,leafLen:e=>a*.23*s*(oo(.14,.3,e)*(1-.68*oo(.35,1,e))),leafAngle:e=>1.1-.5*e,droop:e=>(o.dead?1.3:.88+.35*o.a)+.45*e,curl:o.dead?.15:.45,part:Z.FROND,age:o.dead?1:o.a*.55,seed:o.seed,phase:o.phase,flutter:o.dead?.3:1,minWidth:.045})}}function go(e=11){let n=Be(e),r=new eo;so(r,{radial:10,rows:[-.03,0,.015,.04,.08,.14,.22,.32,.43,.54,.65,.76,.86,.94,.975,.992,1.005],radius:fo,Hgeo:uo,mat:[Z.STEM,0,0,0],lumps:po});for(let e=0;e<6;e++){let i=e*2.39996+n()*.5,a=.2+n()*.1,o=new t(Math.cos(i)*a,-.3-n()*.35,Math.sin(i)*a),s=.12+n()*.035;lo(r,o,new t(s,s*1.12,s),[Z.COCONUT,n(),0,e/6],[1,0,0,0])}return ho(r,mo(n,18),{segs:8,cross:2}),{geometry:r.build(16,new t(0,6,0)),triangles:r.triangles}}function _o(e=11){let n=Be(e),r=new eo;return so(r,{radial:5,rows:[-.03,.03,.2,.6,1],radius:fo,Hgeo:uo,mat:[Z.STEM,0,0,0],cap:!1}),ho(r,mo(n,18).filter((e,t)=>t!==1&&t!==5&&t!==9&&t!==13),{segs:3,cross:1,leafScale:1.15}),{geometry:r.build(16,new t(0,6,0)),triangles:r.triangles}}function vo(e=5,n=new eo){let r=Be(e);so(n,{radial:5,rows:[-.2,.3,1],radius:e=>.16-.07*e,Hgeo:.6,mat:[Z.STEM,.35,0,0],cap:!1});for(let e=0;e<8;e++){let i=e/7,a=e*2.39996+r()*.4,o=(1.7+.9*i)*(.85+.3*r());co(n,{origin:new t(0,.1-.15*i,0),azimuth:a,elevation:1.35-.8*i+(r()-.5)*.2,bend:.6+.7*i,twist:(r()-.5)*.3,length:o,segs:5,cross:1,leafLen:e=>.21*o*(oo(.04,.25,e)*(1-.6*oo(.3,1,e))),leafAngle:e=>1-.4*e,droop:e=>.25+.4*i+.2*e,curl:.15,part:Z.FROND,age:i*.4,seed:r(),phase:r(),minWidth:.03})}return{geometry:n.build(4,new t(0,1,0)),triangles:n.triangles}}function yo(e=3,n=new eo){let r=Be(e);for(let e=0;e<9;e++){let i=e/8,a=e*2.39996+r()*.5,o=(.75+.5*i)*(.85+.3*r());co(n,{origin:new t(0,.05,0),azimuth:a,elevation:1.3-.55*i+(r()-.5)*.2,bend:1.3+.8*i,twist:(r()-.5)*.5,length:o,segs:4,cross:1,bendPow:1.2,leafLen:e=>.2*o*(oo(.02,.2,e)*(1-.8*oo(.35,1,e))),leafAngle:()=>1.35,droop:e=>.12+.2*e,curl:.08,part:Z.FERN,age:0,seed:r(),phase:r(),minWidth:.012,flutter:.6})}return{geometry:n.build(1.6,new t(0,.4,0)),triangles:n.triangles}}function bo(e=9,n=new eo){let r=Be(e),i=[{h:2.1+r()*.5,r:.12,leaves:8,dead:3,off:0},{h:1.3+r()*.4,r:.085,leaves:6,dead:1,off:.32},{h:.55+r()*.25,r:.05,leaves:3,dead:0,off:.3,sucker:!0},{h:.35+r()*.2,r:.04,leaves:3,dead:0,off:.28,sucker:!0}],a=new t,o=r()*Math.PI*2;for(let e of i){o+=2.1+r()*.8;let i=new t(Math.cos(o)*e.off,0,Math.sin(o)*e.off),s=e.off>0?o:r()*Math.PI*2,c=new t(Math.cos(s),0,Math.sin(s)).multiplyScalar((e.off>0?.1:.04)+r()*.05),l=[];for(let n=0;n<=3;n++){let r=n/3;l.push(i.clone().add(new t(0,e.h*r,0)).addScaledVector(c,e.h*r*r))}let u=l[3],d=Math.min(.55,.2+e.h*.15),f=r();Bo(n,l,{radius:t=>e.r*(1-.35*t)*(1+.25*Math.exp(-t*7)),radial:e.sucker?4:6,part:Z.BANANA,age:0,seed:f,phase:r(),s0:0,s1:d});let p=e.leaves+e.dead;for(let i=0;i<p;i++){let o=i>=e.leaves,s=i/Math.max(1,e.leaves-1),c=i*2.39996+r()*.6;a.set(Math.cos(c),0,Math.sin(c));let l=e.sucker?.35+r()*.15:e.h/2.4,f=(1.9+.8*r())*l*(o?.85:1),p=(e.sucker?.14:.3+.08*r())*(e.sucker?1:Math.max(.6,l));co(n,{origin:u.clone().add(new t(a.x*e.r*.5,-(o?.15+r()*.35:s*.2)*e.h,a.z*e.r*.5)),azimuth:c,elevation:o?-.9-r()*.5:(e.sucker?1.25:1.2-.85*s)+(r()-.5)*.25,bend:o?.35:e.sucker?.5:1+1.3*s+r()*.4,twist:(r()-.5)*.5,length:f,segs:o||e.sucker?3:5,cross:1,bendPow:1.6,roll:(r()-.5)*.8,leafLen:e=>p*Math.max(0,Math.sin(Math.PI*Math.min(1,Math.max(0,(e-.1)/.9))))**.5*(o?.6:1),leafAngle:()=>1.45,droop:e=>o?.9:.2+.45*e+.2*s,curl:o?.5:.15,part:Z.BANANA,age:o?.92+r()*.06:s*.45+r()*.15,seed:r(),phase:r(),minWidth:.03,flutter:o?.3:.8,sBase:d})}}return{geometry:n.build(4,new t(0,1.5,0)),triangles:n.triangles}}var xo=12.5,So=[[.4,9.9,-.3,2.9],[-2,8.3,1.6,2.6],[3,7.7,1.2,2.4],[1.7,6.8,-3,2.5],[-3.2,6.3,-1.8,2.3],[.4,5.6,3.4,2.2],[-1.1,11.2,-1.7,1.8],[3.7,5.2,-.9,1.9]],Co=[.15,3.7,-.05],wo=1.6,To=[[0,.85,0,.8],[.75,.6,.35,.6],[-.6,.55,.55,.6],[-.25,.65,-.75,.62],[.35,1.25,-.25,.48]];function Eo(e,n,r,i,a,o,s,c,l,u,d=null){let f=new t().subVectors(r,n),p=f.length();f.normalize();let m=Math.abs(f.y)<.9?to:new t(1,0,0),h=new t().crossVectors(f,m).normalize(),g=new t().crossVectors(h,f).normalize(),_=e.count;for(let r=0;r<=s;r++){let m=r/s,_=new t().copy(n).addScaledVector(f,p*m);for(let n=0;n<=o;n++){let r=n/o*Math.PI*2,s=d?d(m,r,_):i+(a-i)*m,f=new t().copy(h).multiplyScalar(Math.cos(r)).addScaledVector(g,Math.sin(r)),v=_.clone().addScaledVector(f,s);e.vertex(v,f,n/o,m*p,[Math.max(0,v.y/l),u(v),0,0],c)}}for(let t=0;t<s;t++)for(let n=0;n<o;n++){let r=_+t*(o+1)+n,i=r+o+1;e.quad(r,i,i+1,r+1)}}function Do(e,n,r,i,a,o,s,c,l,u,d){let f=e.count,p=e=>new t().copy(n).multiplyScalar((1-e)*(1-e)).addScaledVector(r,2*(1-e)*e).addScaledVector(i,e*e),m=e=>new t().subVectors(r,n).multiplyScalar(2*(1-e)).addScaledVector(new t().subVectors(i,r),2*e).normalize(),h=m(0),g=new t().crossVectors(h,Math.abs(h.y)<.9?to:new t(1,0,0)).normalize(),_=0,v=p(0);for(let n=0;n<=c;n++){let r=n/c,i=p(r);_+=i.distanceTo(v),v=i;let f=m(r);g.addScaledVector(f,-g.dot(f)).normalize(),h=f;let y=new t().crossVectors(g,h).normalize(),b=a+(o-a)*r**.8;for(let n=0;n<=s;n++){let r=n/s*Math.PI*2,a=new t().copy(g).multiplyScalar(Math.cos(r)).addScaledVector(y,Math.sin(r)),o=i.clone().addScaledVector(a,b);e.vertex(o,a,n/s,_,[Math.max(0,o.y/u),d(o),0,0],l)}}for(let t=0;t<c;t++)for(let n=0;n<s;n++){let r=f+t*(s+1)+n,i=r+s+1;e.quad(r,i,i+1,r+1)}}function Oo(e,{center:n,size:r,normal:i,yaw:a,lobeC:o,lobeR:s,lobeId:c,crownC:l,crownR:u,rand:d,flexFn:f,hScale:p,part:m,clumpC:h=null,clumpR:g=1}){let _=i.clone().normalize(),v=Math.abs(_.y)<.95?to:new t(1,0,0),y=new t().crossVectors(v,_).normalize(),b=new t().crossVectors(_,y).normalize(),x=Math.cos(a),S=Math.sin(a),C=y.clone().multiplyScalar(x).addScaledVector(b,S),w=b.clone().multiplyScalar(x).addScaledVector(y,-S),T=d(),E=d(),D=d(),O=[];for(let[t,i,a,d]of[[-.5,-.5,0,0],[.5,-.5,1,0],[.5,.5,1,1],[-.5,.5,0,1]]){let v=n.clone().addScaledVector(C,t*r).addScaledVector(w,i*r),y=h?v.clone().sub(h).divideScalar(g):v.clone().sub(o).divideScalar(s),b=v.clone().sub(l).divide(u),x=y.clone().normalize().multiplyScalar(.5).addScaledVector(b.clone().normalize(),.4).addScaledVector(_,.2).normalize(),S=Math.min(1,.5*Math.min(1,y.length())+.4*Math.min(1,b.length())+.25*Math.max(0,b.y)),k=Math.max(0,v.y/p);O.push(e.vertex(v,x,a,d,[k,f(v),1,D],[m,.2+.8*S*S,T,E],[o.x-v.x,o.y-v.y,o.z-v.z,c]))}e.quad(O[0],O[1],O[2],O[3])}function ko(e,n,{count:r,size:i,crownC:a,crownR:o,rand:s,flexFn:c,hScale:l,part:u,flatten:d=.6}){let f=new t(e[0],e[1],e[2]),p=e[3],m=[];for(let e=0;e<r;e++){let e,r,h;do e=s()*2-1,r=s()*2-1,h=s()*2-1;while(e*e+r*r+h*h>1||r<-.75);let g=Math.hypot(e,r,h)||1,_=.45+.55*Math.sqrt(g),v=new t(e/g*_*p*.85,r/g*_*p*.85*d,h/g*_*p*.85).add(f),y=v.clone().sub(f).normalize().lerp(to,.35+s()*.35).normalize();m.push({center:v,size:i*(.8+s()*.45),normal:y,yaw:s()*6.283,lobeC:f,lobeR:p,lobeId:n,crownC:a,crownR:o,rand:s,flexFn:c,hScale:l,part:u})}return m}function Ao(e,n,{clumps:r,clumpR:i,cardsPer:a,size:o,crownC:s,crownR:c,rand:l,flexFn:u,hScale:d,part:f,flatten:p=.7}){let m=new t(e[0],e[1],e[2]),h=e[3],g=[],_=[];for(let e=0;e<r;e++){let e,r,v;do e=l()*2-1,r=l()*2-1,v=l()*2-1;while(e*e+r*r+v*v>1||r<-.55);let y=Math.hypot(e,r,v)||1,b=.3+.7*Math.sqrt(l()),x=new t(e/y,r/y*p,v/y).multiplyScalar(b*h*.85).add(m),S=i*(.65+l()*.7);_.push({c:x,rc:S});let C=x.clone().sub(m).normalize();for(let e=0;e<a;e++){let e=new t(l()*2-1,l()*2-1,l()*2-1).normalize().addScaledVector(C,.9).addScaledVector(to,.55).normalize(),r=x.clone().addScaledVector(e,S*(.1+.3*l())).add(new t(l()-.5,(l()-.5)*.6,l()-.5).multiplyScalar(S*.5));g.push({center:r,size:o*S/i*(.8+l()*.4),normal:e,yaw:l()*6.283,lobeC:m,lobeR:h,lobeId:n,crownC:s,crownR:c,rand:l,flexFn:u,hScale:d,part:f,clumpC:x,clumpR:S})}}return{cards:g,tips:_}}function jo(e,t,n){t.sort((e,t)=>t.center.distanceToSquared(n)-e.center.distanceToSquared(n));for(let n of t)Oo(e,n)}function Mo(e=21,n=new eo){let r=Be(e),i=xo,a=new t(0,7.8,0),o=new t(5.2,3.7,5.2),s=e=>Math.min(1,Math.hypot(e.x,e.z)/5)*oo(3.2,6.5,e.y),c=new t(...Co);Eo(n,new t(0,-.5,0),c,.34,.24,10,7,[0,0,0,0],i,s,(e,t,n)=>{let r=n.y;return(.34-.1*e)*(1+.9*(Math.max(0,Math.cos(4*t+.4))**4*Math.exp(-Math.max(r,0)/.8))+.25*Math.exp(-Math.max(r+.3,0)/.5))});let l=[];So.forEach((e,o)=>{let u=new t(e[0],e[1],e[2]),d=u.clone().addScaledVector(u.clone().sub(a).setY(0).normalize(),-e[3]*.2).setY(e[1]-e[3]*.25),f=(e,n,i)=>{let a=e.clone().lerp(n,.5),o=n.clone().sub(e),s=new t(o.x,0,o.z);return a.addScaledVector(s,-.28*i).add(new t(0,o.length()*.16*i,0)).add(new t((r()-.5)*.5,(r()-.5)*.3,(r()-.5)*.5).multiplyScalar(o.length()*.25))};if(o<5){let e=c.clone().add(new t((r()-.5)*.2,-.2-r()*.3,(r()-.5)*.2)),a=f(e,d,1);Do(n,e,a,d,.18,.05,6,5,[0,0,0,0],i,s),l.push(e.clone().multiplyScalar(.25).addScaledVector(a,.5).addScaledVector(d,.25))}else{let e=l[0];for(let t of l)t.distanceTo(u)<e.distanceTo(u)&&(e=t);Do(n,e,f(e,d,.6),d,.085,.03,4,3,[0,0,0,0],i,s)}});let u=[];return So.forEach((e,c)=>{let{cards:l,tips:d}=Ao(e,c,{clumps:Math.round(3.9*e[3]),clumpR:.82,cardsPer:3,size:1.45,crownC:a,crownR:o,rand:r,flexFn:s,hScale:i,part:1,flatten:.72});u.push(...l);let f=new t(e[0],e[1]-e[3]*.3,e[2]);if(c<2)for(let e of d){let a=f.clone().lerp(e.c,.4+r()*.25).add(new t(r()-.5,(r()-.5)*.4,r()-.5).multiplyScalar(.5));Eo(n,a,a.clone().lerp(e.c,.7),.035,.014,3,1,[0,0,0,0],i,s)}}),jo(n,u,a),{geometry:n.build(14,new t(0,6.5,0)),triangles:n.triangles}}function No(e=31,n=new eo){let r=Be(e),i=new t(0,.7,0),a=new t(1.1,.75,1.1),o=e=>Math.min(1,e.y/1.3);for(let e=0;e<3;e++){let r=To[e+1];Eo(n,new t(0,-.1,0),new t(r[0]*.6,r[1]*.7,r[2]*.6),.035,.015,3,1,[5,0,0,0],wo,o)}let s=[];return To.forEach((e,t)=>s.push(...ko(e,t,{count:Math.round(15*e[3]),size:.85,crownC:i,crownR:a,rand:r,flexFn:o,hScale:wo,part:4,flatten:.8}))),jo(n,s,i),{geometry:n.build(2.2,new t(0,.7,0)),triangles:n.triangles}}var Po=(()=>{let e=Be(4711),t=new Float32Array(40);for(let n=0;n<5;n++){let r=n>=3,i=r?To.length:So.length,a=0;for(let o=0;o<8;o++){if(o>=i)continue;let s=o>=2&&e()<.3&&a<(r?1:3);s&&a++,t[n*8+o]=s?0:.74+.44*e()}}return t})();function Fo(e,t,n){let r=e.attributes.position,i=e.attributes.aLobe,a=r.data.array,o=r.data.stride,s=new Float32Array(a);for(let e=0;e<r.count;e++){let c=e*o,l=a[c+i.offset+3];if(l<0)continue;let u=1-t[n+l];s[c+r.offset]+=a[c+i.offset]*u,s[c+r.offset+1]+=a[c+i.offset+1]*u,s[c+r.offset+2]+=a[c+i.offset+2]*u}let c=new Ae(s,o),l=new ke;for(let t of Object.keys(e.attributes)){let n=e.attributes[t];l.setAttribute(t,new de(c,n.itemSize,n.offset))}return l.setIndex(e.index),l.boundingSphere=e.boundingSphere.clone(),l}function Io(){let e=new eo;Mo(21,e);let n=e.triangles;return No(31,e),{geometry:e.build(14,new t(0,6.5,0)),triangles:e.triangles,treeTriangles:n,shrubTriangles:e.triangles-n}}var Lo={YOUNG:1,BANANA:2,FERN:3,BANANA_B:4};function Ro(){let e=new eo,n={},r=0;return e.kind=Lo.YOUNG,vo(5,e),n.young=e.triangles-r,r=e.triangles,e.kind=Lo.FERN,yo(3,e),n.fern=e.triangles-r,{geometry:e.build(4,new t(0,1.5,0)),triangles:e.triangles,perKind:n}}function zo(){let e=new eo,n={},r=0;return e.kind=Lo.BANANA,bo(9,e),n.banana=e.triangles-r,r=e.triangles,e.kind=Lo.BANANA_B,bo(23,e),n.bananaB=e.triangles-r,{geometry:e.build(4,new t(0,1.5,0)),triangles:e.triangles,perKind:n}}function Bo(e,n,{radius:r,radial:i=4,part:a,age:o=0,seed:s=0,phase:c=0,s0:l=0,s1:u=.5,W:d=.1}){let f=e.count,p=n.length,m=new t,h=new t,g=new t;for(let t=0;t<p;t++){m.subVectors(n[Math.min(p-1,t+1)],n[Math.max(0,t-1)]).normalize(),h.crossVectors(m,to),h.lengthSq()<1e-4&&h.set(1,0,0),h.normalize(),g.crossVectors(h,m).normalize();let f=t/(p-1),_=r(f);for(let r=0;r<=i;r++){let p=r/i*Math.PI*2;ro.copy(h).multiplyScalar(Math.cos(p)).addScaledVector(g,Math.sin(p)),no.copy(n[t]).addScaledVector(ro,_),e.vertex(no,ro,-1+.5*f,r/i,[1,l+(u-l)*f,0,c],[a,o,d,s])}}for(let t=0;t<p-1;t++)for(let n=0;n<i;n++){let r=f+t*(i+1)+n,a=r+i+1;e.quad(r,r+1,a+1,a)}}function Vo(e,t,n,r,i,a=6){let o=[e.clone()],s=e.clone();for(let e=0;e<a;e++){let c=(e+.5)/a,l=r+(i-r)*c*c;no.copy(t).multiplyScalar(Math.cos(l)).addScaledVector(to,Math.sin(l)),s.addScaledVector(no,n/a),o.push(s.clone())}return o}function Ho(e,n){let{attach:i,dirH:a,pitch:o,bend:s,L:c,W:l,yBack:u=0,env:d,cup:f=0,roll:p=0,wave:m=0,segsY:h=8,segsX:g=2,part:_,age:v=0,seed:y=0,phase:b=0,s0:x=.5,flutter:S=.6}=n,C=new t(-a.z,0,a.x).normalize(),w=new r,T=new t,E=new t,D=new t,O=[],k=[],ee=i.clone().addScaledVector(no.copy(a).multiplyScalar(Math.cos(o)).addScaledVector(to,Math.sin(o)),-u*c).clone();for(let e=0;e<=h;e++){let t=e/h,n=Math.max(0,(t-u)/(1-u)),r=o-s*n**1.4;T.copy(a).multiplyScalar(Math.cos(r)).addScaledVector(to,Math.sin(r)).normalize(),w.setFromAxisAngle(T,p*(.4+.6*n)),D.copy(C).applyQuaternion(w),E.crossVectors(D,T).normalize(),k.push({p:ee.clone(),T:T.clone(),S:D.clone(),N:E.clone(),y:t}),e<h&&ee.addScaledVector(T,c/h)}for(let e=0;e<=h;e++){let t=k[e],n=Math.max(d(t.y),.02),r=[];for(let e=-g;e<=g;e++){let i=e/g,a=Math.abs(i),o=m*Math.sin(t.y*23+y*40+(i>0?1.7:0))*a,s=t.p.clone().addScaledVector(t.S,i*n*l).addScaledVector(t.N,(f*a*a+o)*n*l);r.push({q:s,x:i*n,y:t.y,n:t.N})}O.push(r)}let te=2*g,ne=[];for(let t=0;t<=h;t++){let n=[];for(let r=0;r<=te;r++){let i=O[t][r],a=Math.max(0,t-1),o=Math.min(h,t+1),s=Math.max(0,r-1),c=Math.min(te,r+1);ro.subVectors(O[o][r].q,O[a][r].q),io.subVectors(O[t][c].q,O[t][s].q),ao.crossVectors(io,ro),ao.lengthSq()<1e-12&&ao.copy(i.n),ao.normalize(),ao.dot(i.n)<0&&ao.negate();let u=S*Math.abs(i.x)*oo(0,.6,i.y);n.push(e.vertex(i.q,ao,i.y,i.x,[1,x+(1-x)*i.y,u,b],[_,v,l,y]))}ne.push(n)}for(let t=0;t<h;t++)for(let n=0;n<te;n++)e.quad(ne[t][n],ne[t][n+1],ne[t+1][n+1],ne[t+1][n])}var Uo=e=>t=>t<e?.75+t/e*.3:Math.sin(Math.PI*Math.min(1,.5+.5*(t-e)/(1-e)))**.75*1.02+.02,Wo=e=>Math.max(0,Math.sin(Math.PI*Math.min(1,e*1.02)))**.55*1.02+.02;function Go(e=41,n=new eo){let r=Be(e),i=new t;for(let e=0;e<8;e++){let a=e*2.39996+r()*.5;i.set(Math.cos(a),0,Math.sin(a));let o=e===1||e===5?.1:e===6?.95:.4+r()*.4,s=o>.3,c=(s?.65+r()*.45:.35+r()*.2)*(o>.9?.8:1),l=Vo(new t(i.x*.06,.02,i.z*.06),i,c,1.35-r()*.2,(o>.9?0:.55)+r()*.25,6),u=s?.55+r()*.35:.28+r()*.1,d=u*.47,f=r();Bo(n,l,{radius:e=>.016-.005*e,part:Z.MONSTERA,age:o,seed:r(),phase:f,s0:0,s1:.45}),Ho(n,{attach:l[l.length-1],dirH:i,pitch:o>.9?-.9:-.15-r()*.35,bend:.35+r()*.35,L:u,W:d,yBack:.16,env:Uo(.16),cup:.12,roll:(r()-.5)*.5,wave:.03,segsY:10,segsX:4,part:Z.MONSTERA,age:o,seed:r(),phase:f,s0:.45,flutter:.35})}return{geometry:n.build(2.2,new t(0,.6,0)),triangles:n.triangles}}function Ko(e=43,n=new eo){let r=Be(e),i=new t;for(let e=0;e<8;e++){let a=e*2.39996+r()*.4;i.set(Math.cos(a),0,Math.sin(a));let o=e===6?.95:e===7?.1:.2+r()*.5,s=(.8+r()*.6)*(o>.9?.75:1),c=Vo(new t(i.x*.05,.02,i.z*.05),i,s,1.45,(o>.9?.5:1.05)+r()*.25,6),l=(.75+r()*.5)*(o<.15?.6:1),u=l*.42,d=r();Bo(n,c,{radius:e=>.03-.014*e,radial:5,part:Z.ELEPHANT,age:o,seed:r(),phase:d,s0:0,s1:.5}),Ho(n,{attach:c[c.length-1],dirH:i,pitch:-.45-r()*.45-(o>.9?.5:0),bend:.3+r()*.25,L:l,W:u,yBack:.3,env:Uo(.3),cup:-.1,roll:(r()-.5)*.4,wave:.05,segsY:9,segsX:3,part:Z.ELEPHANT,age:o,seed:r(),phase:d,s0:.5,flutter:.3})}return{geometry:n.build(2.4,new t(0,.8,0)),triangles:n.triangles}}function qo(e=47,n=new eo){let r=Be(e),i=new t;for(let e=0;e<5;e++){let a=e*2.39996+r()*.6,o=.05+r()*.22,s=new t(Math.cos(a)*o,0,Math.sin(a)*o),c=1.1+r()*1,l=new t(Math.cos(a),0,Math.sin(a)).multiplyScalar(.08+r()*.1),u=s.clone().add(new t(0,c,0)).addScaledVector(l,c),d=r(),f=r(),p=[];for(let e=0;e<=4;e++)p.push(s.clone().lerp(u,e/4));Bo(n,p,{radius:e=>.028-.012*e,radial:5,part:Z.HELICONIA,age:.3,seed:f,phase:d,s0:0,s1:.55});let m=r()*Math.PI,h=3+Math.floor(r()*2);for(let e=0;e<h;e++){let t=m+((e%2?1:-1)>0?0:Math.PI)+(r()-.5)*.3;i.set(Math.cos(t),0,Math.sin(t));let a=s.clone().lerp(u,.45+e/h*.5),o=e===0&&r()<.5?.95:.2+r()*.4,c=Vo(a,i,.15+r()*.15,1.2,1,3);Bo(n,c,{radius:()=>.01,radial:3,part:Z.HELICONIA,age:o,seed:f,phase:d,s0:.5,s1:.6});let l=.8+r()*.5;Ho(n,{attach:c[c.length-1],dirH:i,pitch:o>.9?-.4:.85+r()*.3,bend:o>.9?1.4:.9+r()*.5,L:l,W:l*.15,yBack:0,env:Wo,cup:.25,roll:(r()-.5)*.6,wave:.02,segsY:7,segsX:1,part:Z.HELICONIA,age:o,seed:r(),phase:d,s0:.6,flutter:.6})}if(r()<.6){let e=6+Math.floor(r()*3),a=u.clone(),o=.45+r()*.15,s=m+Math.PI*.5;for(let c=0;c<e;c++){let l=c/(e-1),u=a.clone().add(new t(0,o*l*.9+.04,0)),f=s+(c%2?0:Math.PI);i.set(Math.cos(f),0,Math.sin(f));let p=.22*(1-.45*l);Ho(n,{attach:u,dirH:i,pitch:.5,bend:-.35,L:p,W:p*.3,yBack:0,env:e=>Math.sin(Math.PI*Math.min(1,.15+e*.9))*1.02+.05,cup:1.2,segsY:3,segsX:1,part:Z.BRACT,age:l,seed:r(),phase:d,s0:.62,flutter:.05})}Bo(n,[a.clone(),a.clone().add(new t(0,o,0))],{radius:()=>.009,radial:3,part:Z.BRACT,age:0,seed:f,phase:d,s0:.6,s1:.65})}}return{geometry:n.build(2.8,new t(0,1.2,0)),triangles:n.triangles}}function Jo(e=53,n=new eo){let r=Be(e),i=new t;for(let e=0;e<11;e++){let a=.3+((e%2?1:-1)>0?0:Math.PI)+(r()-.5)*.9;i.set(Math.cos(a),0,Math.sin(a));let o=e===9?.95:.2+r()*.5,s=.55+r()*.45,c=Vo(new t((r()-.5)*.12,.02,(r()-.5)*.12),i,s,1.45,(o>.9?.6:1.15)+r()*.2,4),l=.45+r()*.2,u=r();Bo(n,c,{radius:e=>.012-.004*e,radial:3,part:Z.STRELITZIA,age:o,seed:r(),phase:u,s0:0,s1:.5}),Ho(n,{attach:c[c.length-1],dirH:i,pitch:o>.9?.2:1+r()*.3,bend:.25+r()*.2,L:l,W:l*.2,yBack:0,env:Wo,cup:.2,roll:(r()-.5)*.5,wave:.02,segsY:5,segsX:1,part:Z.STRELITZIA,age:o,seed:r(),phase:u,s0:.5,flutter:.2})}let a=2+Math.floor(r()*2);for(let e=0;e<a;e++){let e=r()*Math.PI*2;i.set(Math.cos(e),0,Math.sin(e));let a=new t((r()-.5)*.15,.02,(r()-.5)*.15),o=a.clone().add(new t(i.x*.08,.85+r()*.3,i.z*.08)),s=r();Bo(n,[a,a.clone().lerp(o,.5),o],{radius:()=>.01,radial:3,part:Z.STRELITZIA,age:.3,seed:r(),phase:s,s0:0,s1:.55}),Ho(n,{attach:o,dirH:i,pitch:.12,bend:.15,L:.19,W:.022,yBack:.1,env:e=>Math.sin(Math.PI*Math.min(1,.1+e*.95))*1.05+.08,cup:1.5,segsY:4,segsX:1,part:Z.BIRD,age:0,seed:r(),phase:s,s0:.55,flutter:.02});let c=o.clone().addScaledVector(i,.05).add(new t(0,.02,0));for(let i=0;i<3;i++){let a=e+(i-1)*.35;Ho(n,{attach:c,dirH:new t(Math.cos(a),0,Math.sin(a)),pitch:1+(r()-.5)*.3,bend:-.3,L:.11+r()*.03,W:.012,yBack:0,env:e=>Math.sin(Math.PI*Math.min(1,.2+e*.8))+.1,cup:.3,segsY:2,segsX:1,part:Z.BIRD,age:.5,seed:r(),phase:s,s0:.6,flutter:.05})}Ho(n,{attach:c,dirH:i,pitch:.55,bend:.1,L:.09,W:.008,yBack:0,env:()=>.9,cup:.4,segsY:2,segsX:1,part:Z.BIRD,age:1,seed:r(),phase:s,s0:.6,flutter:.05})}return{geometry:n.build(1.8,new t(0,.7,0)),triangles:n.triangles}}var Yo={MONSTERA:11,ELEPHANT:12,HELICONIA:13,STRELITZIA:14};function Xo(){let e=new eo;return e.kind=Yo.MONSTERA,Go(41,e),{geometry:e.build(2.2,new t(0,.6,0)),triangles:e.triangles}}function Zo(){let e=new eo,n={},r=0;return e.kind=Yo.ELEPHANT,Ko(43,e),n.elephant=e.triangles-r,r=e.triangles,e.kind=Yo.HELICONIA,qo(47,e),n.heliconia=e.triangles-r,r=e.triangles,e.kind=Yo.STRELITZIA,Jo(53,e),n.strelitzia=e.triangles-r,{geometry:e.build(3,new t(0,1,0)),triangles:e.triangles,perKind:n}}var Qo=Math.ceil(Po.length/4),$o=new c(`VegParams`,{camPos:[`vec3f`,new t(0,10,0)],pad0:[`f32`,0],gustOffset:[`vec2f`,new f],canopyNear:[`vec2f`,new f(75,45)],lobeTable:[`vec4f[${Qo}]`,Array.from({length:Qo},(e,t)=>[0,1,2,3].map(e=>Po[t*4+e]??0))]},{label:`vegParams`}),es=$o.fields.camPos,ts=$o.fields.gustOffset,ns=.12,rs=[42,58],Q=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},is=new h({name:`veg`,deps:[M,Ge],uniforms:$o,bindings:{vegDetail:{texture:()=>Le()}},code:`
const VEG_UP = vec3f( 0.0, 1.0, 0.0 );
const VEG_LOD_BAND: f32 = ${Q(ns)};

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
	let fernFade = select( 1.0, 1.0 - smoothstep( ${Q(rs[0])}, ${Q(rs[1])}, dCam ), kindI > 2.5 && kindI < 3.5 );
	let k = vegLodScale( base, lodRange ) * fernFade * select( 0.0, 1.0, keepKind );
	out.pos = base + ( pos - base ) * k;
	return out;
}
`}),as=e=>e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4,$=e=>{let t=as((e>>16&255)/255),n=as((e>>8&255)/255),r=as((e&255)/255);return`vec3f( ${t.toFixed(6)}, ${n.toFixed(6)}, ${r.toFixed(6)} )`},os=[11,17],ss=[36,45],cs=[62,87],ls=48,us=160,ds=420,fs=384,ps=7,ms=[0,0,1,1,2,2,2],hs=[2,2,3],gs=12,_s=28,vs={GRASS:0,OAT_STALK:1,OAT_HEAD:2,CREEPER:3,FLOWER:4};function ys(e,t,n,r=10){let i=[];for(let a=0;a<t;a++){let t=null,o=-1;for(let s=0;s<(a===0?1:r);s++){let r=e()*n,a=e()*n,s=1/0;for(let e of i){let t=Math.abs(e[0]-r),i=Math.abs(e[1]-a);t=Math.min(t,n-t),i=Math.min(i,n-i),s=Math.min(s,t*t+i*i)}s>o&&(o=s,t=[r,a])}i.push(t)}return i}var bs=class{constructor(){this.pos=[],this.nor=[],this.side=[],this.slot=[],this.bladeData=[],this.idx=[]}get count(){return this.pos.length/3}v(e,t,n,r,i){return this.pos.push(e[0],e[1],e[2]),this.nor.push(t[0],t[1],t[2]),this.side.push(n[0],n[1],n[2],n[3]??0),this.slot.push(r[0],r[1],r[2],r[3]),this.bladeData.push(i[0],i[1],i[2],i[3]),this.count-1}blade(e,t,n,r,i,a,o,s,c,l,u=[0,0],d=0){let f=-a,p=i,m=[];for(let h=0;h<n.length;h++){let g=n[h],_=(Math.sin(o)*g+c*g*g)*s,v=(Math.cos(o)*g-c*.35*g*g)*s,y=[u[0]+i*_,v,u[1]+a*_],b=Math.sin(o)+2*c*g,x=Math.cos(o)-.7*c*g,S=Math.hypot(b,x),C=i*b/S,w=x/S,T=a*b/S,E=-p*w,D=p*C-f*T,O=f*w,k=Math.hypot(E,D,O)||1,ee=[E/k,D/k,O/k],te=r*(1-g**1.6)*(.75+.25*(1-g)),ne=[g,t,l,d];h===n.length-1?m.push([this.v(y,ee,[0,0,0,0],e,ne)]):m.push([this.v(y,ee,[-f*te,0,-p*te,-1],e,ne),this.v(y,ee,[f*te,0,p*te,1],e,ne)])}for(let e=0;e<m.length-1;e++){let t=m[e],n=m[e+1];n.length===1?this.idx.push(t[0],t[1],n[0]):this.idx.push(t[0],t[1],n[1],t[0],n[1],n[0])}}fan(e,t,n,r,i,a,o,s,c,l,u,d=.1){let f=this.v([n[0],u,n[1]],[0,1,0],[0,0,0,0],e,[d,t,l,1]),p=[];for(let f=0;f<s;f++){let m=f/s*Math.PI*2,h=r*c(m),g=Math.cos(m)*h,_=Math.sin(m)*h*.85,v=n[0]+g*i-_*a,y=n[1]+g*a+_*i,b=g/r,x=u+(b+.6)*r*o;p.push(this.v([v,x,y],[0,1,0],[0,0,0,0],e,[d+.05*Math.max(0,b),t,l,0]))}for(let e=0;e<s;e++)this.idx.push(f,p[(e+1)%s],p[e])}ribbon(e,t,n,r,i){let a=[];for(let o=0;o<n.length;o++){let s=n[o],c=n[Math.min(n.length-1,o+1)],l=n[Math.max(0,o-1)],u=c[0]-l[0],d=c[2]-l[2],f=Math.hypot(u,d)||1;u/=f,d/=f;let p=-d*r,m=u*r;a.push([this.v([s[0]-p,s[1],s[2]-m],[0,1,0],[0,0,0,0],e,[.05,t,i,0]),this.v([s[0]+p,s[1],s[2]+m],[0,1,0],[0,0,0,0],e,[.05,t,i,0])])}for(let e=0;e<a.length-1;e++){let t=a[e],n=a[e+1];this.idx.push(t[0],n[1],t[1],t[0],n[0],n[1])}}build(){let e=new je;return e.setAttribute(`position`,new N(this.pos,3)),e.setAttribute(`normal`,new N(this.nor,3)),e.setAttribute(`aSide`,new N(this.side,4)),e.setAttribute(`aSlot`,new N(this.slot,4)),e.setAttribute(`aBlade`,new N(this.bladeData,4)),e.setIndex(this.count>65535?new se(this.idx,1):new ce(this.idx,1)),e.boundingSphere=new y(new t,1e7),e.boundingBox=new S(new t(-1e7,-1e7,-1e7),new t(1e7,1e7,1e7)),e}get triangles(){return this.idx.length/3}};function xs(e){let t=Be(e);return ys(Be(e+1),fs,8).map(([e,n])=>{let r=t(),i=t()*Math.PI*2,a=[];for(let e=0;e<ps;e++){let n=i+e*2.39996+(t()-.5)*.5,r=e===0?.1+.3*t():e===1?.35+.4*t():t();a.push({dx:Math.cos(n),dz:Math.sin(n),lean:.06+.55*r*(.6+.8*t()),h:(.7+.5*t())*(1.06-.22*r),curve:.12+.5*r*(.5+t()),rnd:t(),base:[Math.cos(n)*.09*t(),Math.sin(n)*.09*t()],tier:ms[e]})}return{x:e,z:n,slotRand:r,blades:a}})}function Ss(e,t,n=7,r=1){let i=new bs,a=[[0,.3,.62,1],[0,.55,1],[0,1]][e],o=2-e;for(let e of t.slice(0,Math.ceil(t.length*r))){let t=[e.x,e.z,e.slotRand,0];for(let n of e.blades)n.tier>o||i.blade(t,vs.GRASS,a,.012,n.dx,n.dz,n.lean,n.h,n.curve,n.rnd,n.base,n.tier)}if(e===2)return i;let s=ys(Be(n+2),gs,8),c=e===0;if(s.slice(0,Math.ceil(s.length*r)).forEach(([e,t],r)=>{let a=Be(n*7919+r*131+17),o=[e,t,a(),1],s=c?3:1;for(let e=0;e<3;e++){let t=a()*Math.PI*2,n=Math.cos(t),r=Math.sin(t),l=.06+.14*a(),u=.8+.3*a(),d=a(),f=e===0?0:(a()-.5)*.22,p=e===0?0:(a()-.5)*.22,m=[a(),a(),a(),a(),a(),a(),a(),a()];if(e>=s)continue;let h=e===0?0:2;i.blade(o,vs.OAT_STALK,c?[0,.3,.6,.85,1]:[0,.6,1],c?.0075:.014,n,r,l,u,.2,d,[f,p],h);let g=c?8:3;for(let e=0;e<g;e++){let a=.7+.3*(e/Math.max(1,g-1)),s=(Math.sin(l)*a+.2*a*a)*u,_=(Math.cos(l)*a-.07*a*a)*u,v=t+(e%2?1:-1)*(.45+.6*m[e]),y=Math.cos(v),b=Math.sin(v),x=f+n*s+y*.02,S=p+r*s+b*.02,C=c?.085:.13,w=c?.022:.04,T=[0,1,0],E=[a,vs.OAT_HEAD,d,h],D=i.v([x,_+.01,S],T,[0,0,0,0],o,E),O=i.v([x+y*C*.45-b*w,_-C*.4,S+b*C*.45+y*w],T,[0,0,0,0],o,E),k=i.v([x+y*C*.45+b*w,_-C*.4,S+b*C*.45-y*w],T,[0,0,0,0],o,E),ee=i.v([x+y*C*.8,_-C*.95,S+b*C*.8],T,[0,0,0,0],o,E);i.idx.push(D,O,ee,D,ee,k)}}if(c)for(let e=0;e<4;e++){let t=e/4*Math.PI*2+a();i.blade(o,vs.GRASS,[0,.45,.8,1],.01,Math.cos(t),Math.sin(t),.55+.4*a(),.45,.35,a(),[0,0],2)}}),!c)return i;let l=e=>{let t=Math.min(Math.abs(e),Math.abs(e-Math.PI*2));return 1-.38*Math.exp(-(t*t)/.12)-.15*Math.sin(e*.5)**8},u=e=>.82+.18*Math.cos(e*5),d=ys(Be(n+3),_s,8);return d.slice(0,Math.ceil(d.length*r)).forEach(([e,t],r)=>{let a=Be(n*3571+r*197+5),o=[e,t,a(),2],s=a()*Math.PI*2,c=[],d=-Math.cos(s)*1.1,f=-Math.sin(s)*1.1;for(let e=0;e<12;e++)c.push([d,.01,f]),s+=(a()-.5)*.5,d+=Math.cos(s)*.19,f+=Math.sin(s)*.19;i.ribbon(o,vs.CREEPER,c,.011,a());for(let e=1;e<c.length;e++){let t=e%2?1:-1,n=c[e-1],r=c[e],s=r[0]-n[0],u=r[2]-n[2],d=Math.hypot(s,u)||1;s/=d,u/=d;let f=Math.atan2(u,s)+t*(.7+.5*a()),p=Math.cos(f),m=Math.sin(f),h=(.07+.04*a())*(.6+.4*Math.sin(Math.PI*e/12));i.fan(o,vs.CREEPER,[r[0]+p*h*.9,r[2]+m*h*.9],h,p,m,.3+.3*a(),7,l,a(),.015)}let p=c[3+Math.floor(a()*4)];i.fan(o,vs.FLOWER,[p[0]+.03,p[2]+.03],.036,1,0,1.4,10,u,a(),.07,.2)}),i}var Cs=class{constructor({terrain:e,mask:t}){this.terrain=e;let n=e.res,r=t.data,a=t.res;this.heightTex=new j({label:`grassHeights`,width:n,height:n,format:`r32float`,data:e.heights}),Object.defineProperty(this.heightTex,"needsUpdate",{set:t=>{t&&this.heightTex.upload(e.heights)}}),this.maskTex=new j({label:`grassMask`,width:a,height:a,format:`rgba8unorm`,data:r,sampler:`linearClamp`});let o=Math.ceil(e.size/8);this.cellsPerSide=o,this.cellFlags=new Uint8Array(o*o),this.cellMinY=new Float32Array(o*o),this.cellMaxY=new Float32Array(o*o);let s=8/(e.size/a),c=8/e.texel;for(let t=0;t<o;t++)for(let i=0;i<o;i++){let l=0,u=1/0,d=-1/0,f=Math.max(0,Math.floor(i*s)-1),p=Math.min(a-1,Math.ceil((i+1)*s)+1),m=Math.max(0,Math.floor(t*s)-1),h=Math.min(a-1,Math.ceil((t+1)*s)+1);for(let e=m;e<=h&&!l;e++)for(let t=f;t<=p;t++){let n=(e*a+t)*4;if(r[n]>8||r[n+1]>8||r[n+2]>8||r[n+3]>8){l=1;break}}let g=t*o+i;if(this.cellFlags[g]=l,!l)continue;let _=Math.max(0,Math.floor(i*c)-1),v=Math.min(n-1,Math.ceil((i+1)*c)+1),y=Math.max(0,Math.floor(t*c)-1),b=Math.min(n-1,Math.ceil((t+1)*c)+1);for(let t=y;t<=b;t++)for(let r=_;r<=v;r++){let i=e.heights[t*n+r];i<u&&(u=i),i>d&&(d=i)}this.cellMinY[g]=u,this.cellMaxY[g]=d}this.material=this._createMaterial();let l=xs(7),u=[Ss(0,l),Ss(1,l),Ss(2,l)];this.patchTris=u.map(e=>e.triangles),this.levels=[this._createMesh(u[0].build(),ls,`veg-grass-near`),this._createMesh(u[1].build(),us,`veg-grass-mid`),this._createMesh(u[2].build(),ds,`veg-grass-far`)],this.meshes=this.levels.map(e=>e.mesh);for(let[e,t]of this.levels.entries()){t.qualityGeometries=new Map([[1,{geometry:t.geometry,triangles:this.patchTris[e]}]]);for(let n of O.filter(e=>e>0&&e<1)){let r=Ss(e,l,7,n),i=r.build();i.setAttribute(`iCell`,t.attr),t.qualityGeometries.set(n,{geometry:i,triangles:r.triangles})}}this._frustum=new i,this._mat=new b,this._box=new S,this._last=new Float64Array(8).fill(NaN)}get near(){return this.levels[0]}get far(){return this.levels[2]}get nearTris(){return this.patchTris[0]}get farTris(){return this.patchTris[2]}_createMesh(e,t,n){let r=new Float32Array(t*4),i=new ue(r,4);i.setUsage(le),e.setAttribute(`iCell`,i),e.instanceCount=0;let a=new fe(e,this.material);return a.name=n,a.frustumCulled=!1,a.castShadow=!1,a.receiveShadow=!0,a.matrixAutoUpdate=!1,{mesh:a,geometry:e,attr:i,arr:r,max:t,count:0}}_createMaterial(){return ks(this)}setQualityLevel(e){this.patchTris=this.levels.map(t=>t.qualityGeometries.get(e||1).triangles);for(let t of this.levels)t.mesh.geometry=t.geometry=t.qualityGeometries.get(e||1).geometry,t.count=t.geometry.instanceCount=0;this._last.fill(NaN)}update(e){let t=e.matrixWorld.elements,n=this._last,r=e.projectionMatrix.elements;if(Math.abs(t[12]-n[0])<.05&&Math.abs(t[13]-n[1])<.05&&Math.abs(t[14]-n[2])<.05&&Math.abs(t[8]-n[3])<.001&&Math.abs(t[9]-n[4])<.001&&Math.abs(t[10]-n[5])<.001&&r[0]===n[6]&&r[5]===n[7])return!1;n[0]=t[12],n[1]=t[13],n[2]=t[14],n[3]=t[8],n[4]=t[9],n[5]=t[10],n[6]=r[0],n[7]=r[5],this._mat.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(this._mat,e.coordinateSystem,e.reversedDepth);let i=t[12];t[13];let a=t[14],o=this.terrain,s=this.cellsPerSide,c=Math.max(0,Math.floor((i-88-o.origin)/8)),l=Math.min(s-1,Math.floor((i+88-o.origin)/8)),u=Math.max(0,Math.floor((a-88-o.origin)/8)),d=Math.min(s-1,Math.floor((a+88-o.origin)/8)),[f,p,m]=this.levels,h=0,g=0,_=0;for(let e=u;e<=d;e++)for(let t=c;t<=l;t++){let n=e*s+t;if(!this.cellFlags[n])continue;let r=o.origin+t*8,c=o.origin+e*8,l=Math.max(r-i,0,i-r-8),u=Math.max(c-a,0,a-c-8),d=Math.hypot(l,u);d>88||(this._box.min.set(r,this.cellMinY[n]-.5,c),this._box.max.set(r+8,this.cellMaxY[n]+1.8,c+8),this._frustum.intersectsBox(this._box)&&(d<18&&h<f.max?(f.arr[h*4]=r,f.arr[h*4+1]=c,h++):d<46&&g<p.max?(p.arr[g*4]=r,p.arr[g*4+1]=c,g++):d>=46&&_<m.max&&(m.arr[_*4]=r,m.arr[_*4+1]=c,_++)))}for(let[e,t]of[[f,h],[p,g],[m,_]])e.count=t,e.geometry.instanceCount=t,e.attr.clearUpdateRanges(),e.attr.addUpdateRange(0,Math.max(1,t)*4),e.attr.needsUpdate=!0;return!0}get triangles(){return this.levels.reduce((e,t,n)=>e+t.count*this.patchTris[n],0)}dispose(){this.heightTex.destroy(),this.maskTex.destroy(),this.material.dispose();for(let e of this.levels)for(let{geometry:t}of e.qualityGeometries.values())t.dispose()}},ws=e=>e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4,Ts=(e,t,n)=>`vec3f( ${ws(e).toFixed(6)}, ${ws(t).toFixed(6)}, ${ws(n).toFixed(6)} )`,Es={lush:Ts(.13,.2,.05),green:Ts(.25,.32,.1),olive:Ts(.36,.37,.14),yellow:Ts(.5,.46,.2),straw:Ts(.62,.54,.33),soil:Ts(.17,.13,.08)},Ds=(e,t)=>{let n=Math.cos(t),r=Math.sin(t);return`vec2f( ${e}.x * ${Q(n)} - ${e}.y * ${Q(r)}, ${e}.x * ${Q(r)} + ${e}.y * ${Q(n)} )`},Os=new h({name:`vegGrass`,deps:[is],code:`
const VEG_MEADOW_LUSH = ${Es.lush};
const VEG_MEADOW_GREEN = ${Es.green};
const VEG_MEADOW_OLIVE = ${Es.olive};
const VEG_MEADOW_YELLOW = ${Es.yellow};
const VEG_MEADOW_STRAW = ${Es.straw};
const VEG_MEADOW_SOIL = ${Es.soil};

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
	let f2 = 1.0 - smoothstep( ${Q(os[0])}, ${Q(os[1])}, d );
	let f1 = 1.0 - smoothstep( ${Q(ss[0])}, ${Q(ss[1])}, d );
	let f0 = 1.0 - smoothstep( cut - 5.0, cut, d );
	return select( select( f0, f1, tier > 0.5 ), f2, tier > 1.5 );
}
`});function ks(e){let t=e.terrain,n=t.res;return new Pe({name:`veg-grass`,side:`double`,roughness:.8,metalness:0,modules:[is,Os],textures:{grassHeights:e.heightTex,grassMask:e.maskTex},attributes:{iCell:`vec4f`,aSlot:`vec4f`,aBlade:`vec4f`,aSide:`vec4f`},varyings:{vVegGrass:`vec4f`,vVegGrassTone:`vec4f`,vVegGrass2:`vec4f`,vVegGust:`f32`},vertex:`
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
	let mA = textureSampleLevel( vegDetail, smpLinearRepeat, ${Ds(`xz`,.7)} / 173.0, 0.0 ).w;
	let mB = textureSampleLevel( vegDetail, smpLinearRepeat, ${Ds(`xz`,2.1)} / 47.0, 0.0 ).w;
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
	let cut = mix( ${Q(cs[0]+5)}, ${Q(cs[1])}, cutK - floor( cutK ) );
	let own = vegGrassTierFade( tier, dist, cut );
	let f2 = 1.0 - smoothstep( ${Q(os[0])}, ${Q(os[1])}, dist );
	let f1 = 1.0 - smoothstep( ${Q(ss[0])}, ${Q(ss[1])}, dist );
	let comp = ${Q(hs[0]+hs[1]+hs[2])} / ( f2 * ${Q(hs[2])} + f1 * ${Q(hs[1])} + ${Q(hs[0])} );
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
`})}var As=`
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
`,js=`
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
`,Ms=new h({name:`vegPlant`,deps:[is],code:As+js+`
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
`}),Ns={iPos:`vec4f`,iDat:`vec4f`,aVeg:`vec4f`,aMat:`vec4f`,aLobe:`vec4f`};function Ps(){return new Pe({name:`veg-plant-leaf`,side:`double`,modules:[is,Ms],attributes:Ns,varyings:{vTrunkY:`f32`,vTrunkT:`vec3f`,vMat:`vec4f`,vIDat:`vec4f`,vIPos:`vec3f`},vertex:`
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
	if ( isLeaf ) { s.translucency = vegTranslucency( albedo, in.N, select( 0.3, 0.2, isBroad ), in.P ); }`,shadow:`return vegPlantMask( in );`})}var Fs=e=>`
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
`,Is=$o.fields.canopyNear,Ls=new h({name:`vegCanopy`,deps:[is],code:`
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
`}),Rs=`
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
`;function zs(e){let t=new h({name:`vegCanopyMask`,deps:[Ls,e.module],code:Rs});return new Pe({name:`veg-canopy`,side:`double`,modules:[is,Ls,e.module,t],attributes:Ns,varyings:{vMat:`vec4f`,vIDat:`vec4f`,vIPos:`vec3f`,vHf:`f32`},vertex:Fs(!0)+`
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
	if ( ! isBark ) { s.translucency = vegTranslucency( albedo, geoN, 0.5, in.P ) * ( ao * 0.6 + 0.4 ); }`,shadow:`return vegCanopyMask( in, vegCanopyLeaf( in ) );`})}function Bs(e){let t=t=>new Pe({name:`veg-impostor-bake-`+t,side:`double`,lit:!1,modules:[is,e.module],attributes:{aMat:`vec4f`},varyings:{vMat:`vec4f`,vLocalN:`vec3f`},vertex:`o.vMat = v.aMat; o.vLocalN = v.normal;`,surface:`
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
	r.color = vec4f( normalize( in.vs.vLocalN ) * 0.5 + 0.5, select( aMat.y, 0.6, isBark ) );`});return{albedo:t(`albedo`),normal:t(`normal`)}}var Vs=`vegImpostorColor`,Hs=100,Us=[140,320],Ws=.5,Gs=180,Ks=128;function qs(e,n,r=new t){let i=(e-n)*.5,a=(e+n)*.5;return r.set(i,1-Math.abs(i)-Math.abs(a),a).normalize()}function Js(e){let n=new t().crossVectors(new t(0,1,0),e);return n.lengthSq()<1e-8&&n.set(1,0,0),n.normalize(),{right:n,up:new t().crossVectors(e,n).normalize()}}var Ys=`
fn vegOctDecode( u: f32, v: f32 ) -> vec3f {
	let x = ( u - v ) * 0.5; let z = ( u + v ) * 0.5;
	return normalize( vec3f( x, 1.0 - abs( x ) - abs( z ), z ) );
}
fn vegOctEncode( d: vec3f ) -> vec2f {
	let p = d / ( abs( d.x ) + abs( d.y ) + abs( d.z ) );
	return vec2f( p.x + p.z, p.z - p.x );
}
`,Xs=class{constructor(e,t){this.groups=e,this.bakeMaterials=t;let n=0;for(let t of e)t.variantBase=n,n+=t.variants.length;this.variantCount=n;let r=n*6*Ks,i=e=>{let t=new j({label:e,width:r,height:768,format:`rgba8unorm`,mips:!0,usage:[`sample`,`render`,`copyDst`,`copySrc`],sampler:`linearClamp`});return{texture:t,dispose:()=>t.destroy()}};this.rtA=i(`vegImpostorA`),this.rtB=i(`vegImpostorB`),this.depth=new j({label:`vegImpostorDepth`,width:r,height:768,format:`depth32float`,usage:[`render`]}),this.width=r,this.height=768,this.baked=!1}_frameMatrices(e,t){let n=[],r=e.radius,i=e.center;for(let a=0;a<6;a++)for(let o=0;o<6;o++){let s=qs(-1+2*o/5,-1+2*a/5),{right:c,up:l}=Js(s),u=((e.variantBase+t)*6+o+.5)*2*r,d=(a+.5)*2*r,f=new b().set(c.x,c.y,c.z,-i.dot(c)+u,l.x,l.y,l.z,-i.dot(l)+d,s.x,s.y,s.z,-i.dot(s),0,0,0,1);n.push(f)}return n}bake(e=null){let t=performance.now(),n=e&&e.render&&e.collect?e:this._mr||=new te,r=this.depth.view(),i=!0;for(let[e,t]of[[this.rtA,this.bakeMaterials.albedo],[this.rtB,this.bakeMaterials.normal]]){i=!0;let o=e.texture.view({dimension:`2d`,baseMipLevel:0,mipLevelCount:1});this.groups.forEach((e,s)=>{let c=e.radius,l=new Se(0,this.variantCount*6*2*c,12*c,0,.1,6*c+10);l.position.set(0,0,3*c+2),l.lookAt(0,0,-1),l.updateMatrixWorld(),l.updateProjectionMatrix();let d=(this._blocks||=[])[s]||(this._blocks[s]=u(`vegImpostorBake`+s));a(l,this.width,this.height,{block:d});let f=new be;e.variants.forEach((n,r)=>{let i=this._frameMatrices(e,r),a=new ve(n,t,i.length);i.forEach((e,t)=>a.setMatrixAt(t,e)),a.frustumCulled=!1,f.add(a)}),f.updateMatrixWorld(!0),n.render(f,{camera:l,frameBlock:d,kind:`color`,label:`veg impostor bake`,colorViews:[o],colorFormats:[`rgba8unorm`],depthView:r,depthFormat:`depth32float`,clearColors:[i?[0,0,0,0]:null],clearDepth:0}),i=!1}),w(e.texture)}this.baked=!0,this.bakeMs=performance.now()-t}createMaterial({isGroup1:e,variantOf:t,colorOf:n,nearDist:r}){let[i,a]=this.groups,o=this.variantCount*6,s=(e,t)=>`select( ${Q(e)}, ${Q(t)}, g1Flag )`,c=`
	let g1Flag = ${e(`iDat`)};
	let R = ${s(i.radius,a.radius)};
	let Rh = ${s(i.rh,a.rh)};
	let Hv = ${s(i.hv,a.hv)};
	let Cy = ${s(i.center.y,a.center.y)};
	let vBase = ${s(i.variantBase,a.variantBase)};`,l=new Pe({name:`veg-impostor`,side:`double`,modules:[is,Ls],textures:{vegImpA:this.rtA.texture,vegImpB:this.rtB.texture},attributes:{iPos:`vec4f`,iDat:`vec4f`},varyings:{vImp:`vec4f`,vIPos4:`vec4f`,vIDat:`vec4f`},vertex:`
	let iPos = v.iPos;
	let iDat = v.iDat;
${c}
	let base = iPos.xyz;
	let sy = abs( iDat.y );
	// LOD window: from the near plant's hand-over distance to the fade-out, else collapsed
	let d = length( vegParams.camPos - base );
	let vis = select( 0.0, 1.0, d >= ( ${r(`g1Flag`)} ) * ( 1.0 - VEG_LOD_BAND / 2.0 ) && d < select( draw.params.w, ${Q(Gs)}, g1Flag ) );
	// far away the forest is thinned out: fewer, proportionally larger crowns (grown about
	// the base) keep the canopy closed
	let thin = smoothstep( ${Q(Us[0])}, ${Q(Us[1])}, d );
	let keep = select( 1.0, 0.0, fract( iDat.w * 91.7 ) < thin * ${Q(Ws)} );
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
	let blend = length( vegParams.camPos - base ) < ${Q(Hs)};
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
	s.translucency = vegTranslucency( albedo, in.N, 0.35, in.P );`});return l.modules.push(new is.constructor({name:`vegImpostorSample`,deps:[is],code:Ys+`
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
`})),l}};function Zs(){let e=new ke;return e.setAttribute(`position`,new N([-1,-1,0,1,-1,0,1,1,0,-1,1,0],3)),e.setAttribute(`normal`,new N([0,0,1,0,0,1,0,0,1,0,0,1],3)),e.setIndex([0,1,2,0,2,3]),e.boundingSphere=new y(new t,1e7),e}var Qs=[{grid:4,leaves:6,width:.34},{grid:4,leaves:8,width:.2},{grid:3,leaves:6,width:.45},{grid:3,leaves:8,width:.22}],$s=1024,ec=`
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
`,tc=class{constructor(){this.texture=new j({label:`vegLeafClusters`,width:$s,height:$s,format:`rgba8unorm`,mips:!0,usage:[`sample`,`render`,`copyDst`,`copySrc`],sampler:`anisoRepeat`}),this.rt={dispose:()=>this.texture.destroy()},this.baked=!1;let e=this;this.module=new h({name:`vegLeafAtlas`,deps:[is],bindings:{vegLeafTex:{texture:()=>e.texture}},code:`
// sample tile ( 0..3 ) at card uv st -> ( coverage, bright, cell, 1 )
fn vegLeafSample( st: vec2f, tile: f32 ) -> vec4f {
	let tuv = ( vec2f( fract( tile * 0.5 ) * 2.0, floor( tile * 0.5 ) ) + clamp( st, vec2f( 0.004 ), vec2f( 0.996 ) ) ) * 0.5;
	return textureSample( vegLeafTex, smpAnisoRepeat, vec2f( tuv.x, 1.0 - tuv.y ) );
}
`})}bake(){let e=``;for(let t=0;t<4;t++){let n=Qs[t];e+=`\tif ( tid == ${t}.0 ) {\n`;for(let t=0;t<4;t++){let r=(t%2-.5)*nc*.5,i=(Math.floor(t/2)-.5)*nc*.5;e+=`\t\t{
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
`}new Fe({label:`veg leaf atlas bake`,modules:[is],colorFormats:[`rgba8unorm`],code:ec+`
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
`}).render({colorViews:[this.texture],clear:[0,0,0,0]}),w(this.texture),this.baked=!0}},nc=1/($s/2),rc=(e,t)=>`vegVariantOf( ${e}, ${t} )`;function ic(e){if(!e)return{};let t=typeof e.getFootprints==`function`?e.getFootprints():[],n=[];for(let t of[e.path,...e.sidePaths||[]]){if(!t||!t.samples)continue;let e=[];for(let n=0;n<t.samples.length;n+=5)e.push([t.samples[n].p.x,t.samples[n].p.z]);let r=t.samples[t.samples.length-1];e.push([r.p.x,r.p.z]),n.push({points:e,width:t.width??1.8})}return{footprints:t,paths:n.length?n:null}}function ac(e){let n=e.attributes.position,r=new t,i=1/0,a=-1/0;for(let e=0;e<n.count;e++)r.fromBufferAttribute(n,e),i=Math.min(i,r.y),a=Math.max(a,r.y);let o=new t(0,(i+a)*.5,0),s=0,c=0;for(let e=0;e<n.count;e++)r.fromBufferAttribute(n,e),s=Math.max(s,r.distanceTo(o)),c=Math.max(c,Math.hypot(r.x,r.z));return{center:o,radius:s*1.02,rh:c*1.03,hv:(a-i)*.5*1.03}}var oc=120,sc=65,cc=45,lc=[120,140],uc=[85,105],dc=[100,120],fc=[2600,2800],pc=class{constructor({scene:e,terrain:n,village:r=null,records:i=null,grassMask:a=null}){this.scene=e,this.terrain=n,this.group=new ae,this.group.name=`Vegetation`,this.group.matrixAutoUpdate=!1;let o=performance.now(),s=new La(n,ic(r));this.site=s;let c=i||Ua(s);this.records=c;let l=performance.now(),u=a||Wa(s);this.timings={scatter:l-o,mask:performance.now()-l};let d=Ps();this.leafAtlas=new tc;let f=zs(this.leafAtlas);Is.value.set(sc,cc);let p=go(),m=_o(),h=Ro(),g=Zo(),_=Xo(),v=zo(),y=Io(),b=Mo().geometry,x=No().geometry,S=[],C=[];for(let e=0;e<3;e++)S.push(Fo(b,Po,e*8));for(let e=0;e<2;e++)C.push(Fo(x,Po,(3+e)*8));this.atlas=new Xs([{variants:S,...ac(b)},{variants:C,...ac(x)}],Bs(this.leafAtlas));let w=this.atlas.createMaterial({isGroup1:e=>`${e}.y < 0.0`,variantOf:(e,t)=>rc(e,t),colorOf:({seed:e,cr:t,leaf:n,bright:r,isGroup1:i})=>`${Vs}( ${e}, ${t}, ${n}, ${r}, ${i} )`,nearDist:e=>`select( vegParams.canopyNear.x, vegParams.canopyNear.y, ${e} )`});this.materials=[d,f,w],this.types=[];let T=e=>{this.types.push(e);for(let t of e.meshes)this.group.add(t);return e};this.palms=T(new $a(`palms`,c.palms,{nearRange:oc,margin:10,refreshDistance:6,farExcludeNear:!0,sortNear:!0,near:[{geometry:p.geometry,material:d,castShadow:!0,name:`veg-palm`}],far:{parts:[{geometry:m.geometry,material:d,name:`veg-palm-far`}],fade:fc}}));let E=[...c.youngPalms.map(e=>({...e,seed:Lo.YOUNG+e.seed*.999,qr:lc[1]+10})),...c.ferns.map(e=>({...e,seed:Lo.FERN+e.seed*.999,qr:rs[1]+8}))],D=c.bananas.map(e=>({...e,H:.02,seed:(e.seed<.5?Lo.BANANA:Lo.BANANA_B)+e.seed*.999,qr:dc[1]+10}));this.bananas=T(new $a(`bananas`,D,{fade:dc,margin:10,sortNear:!0,near:[{geometry:v.geometry,material:d,castShadow:!0,name:`veg-banana`}]})),this.understory=T(new $a(`understory`,E,{fade:lc,margin:10,sortNear:!0,near:[{geometry:h.geometry,material:d,castShadow:!1,name:`veg-understory`}]}));let O=c.monsteras.map(e=>({...e,seed:Yo.MONSTERA+e.seed*.999,qr:uc[1]+10}));this.monsteras=T(new $a(`monsteras`,O,{fade:uc,margin:10,sortNear:!0,near:[{geometry:_.geometry,material:d,castShadow:!0,name:`veg-monstera`}]}));let k=[...c.elephantEars.map(e=>({...e,seed:Yo.ELEPHANT+e.seed*.999,qr:uc[1]+10})),...c.heliconias.map(e=>({...e,seed:Yo.HELICONIA+e.seed*.999,qr:uc[1]+10})),...c.strelitzias.map(e=>({...e,seed:Yo.STRELITZIA+e.seed*.999,qr:uc[1]+10}))];this.broadleaf=T(new $a(`broadleaf`,k,{fade:uc,margin:10,sortNear:!0,near:[{geometry:g.geometry,material:d,castShadow:!0,name:`veg-broadleaf`}]}));let ee=[...c.trees.map(e=>({...e,qr:75})),...c.shrubs.map(e=>({...e,qr:55}))];this.canopy=T(new $a(`canopy`,ee,{nearRange:sc,margin:10,sortNear:!0,sortFar:!0,farRefresh:16,near:[{geometry:y.geometry,material:f,castShadow:!0,name:`veg-canopy`}],far:{parts:[{geometry:Zs(),material:w,name:`veg-canopy-far`}],fade:fc}}));for(let e of[this.palms,this.understory,this.bananas,this.monsteras,this.broadleaf,this.canopy])for(let t of e.meshes)t.renderOrder=1;for(let e of this.canopy.far.meshes)e.renderOrder=2;this.renderer=!0,this.grass=new Cs({terrain:n,mask:u});for(let e of this.grass.meshes)this.group.add(e);this.geometryTriangles={palmNear:p.triangles,palmFar:m.triangles,understory:h.triangles,understoryPerKind:h.perKind,broadleaf:g.triangles,broadleafPerKind:g.perKind,monstera:_.triangles,bananas:v.triangles,canopy:y.triangles,tree:y.treeTriangles,shrub:y.shrubTriangles,impostor:2,grassNearPatch:this.grass.patchTris[0],grassMidPatch:this.grass.patchTris[1],grassFarPatch:this.grass.patchTris[2]},this.group.updateMatrixWorld(!0),e.add(this.group),this._camPos=new t,this.timings.total=performance.now()-o}setQualityLevel(e){this.group.visible=e>0;for(let t of this.types)t.inst.qualityLevel=e,t.inst.qualityLimit=Math.ceil(t.inst.count*e),t.lastX=t.farX=1/0,t.near&&t.near.fill(t.inst,null,0),t.far&&t.far.fill(t.inst);this.grass.setQualityLevel(e)}update(e,t){if(this.renderer&&!this.atlas.baked){let e=performance.now();this.leafAtlas.bake(this.renderer),this.atlas.bake(this.renderer),this.timings.bake=performance.now()-e}t.updateMatrixWorld();let n=t.getWorldPosition(this._camPos);es.value.copy(n);let r=m.windDir.value,i=.7*m.windSpeed.value+1.5;ts.value.x+=r.x*i*e,ts.value.y+=r.y*i*e;let a=null,o=null,s=0,c=0;for(let e of this.types){let t=e.overdue(n);t>e.margin-e.refreshDistance?e.update(n,!0):t>s?(o=a,c=s,a=e,s=t):t>c&&(o=e,c=t)}a&&a.update(n,!0),o&&o.update(n,!0),this.grass.update(t)}refreshTerrain(){this.grass.heightTex.needsUpdate=!0}stats(){let e={},t=0,n=0;for(let r of this.types){let i={};for(let[e,a]of[[`near`,r.near],[`far`,r.far]])a&&(i[e]={instances:a.count,triangles:a.triangles,meshes:a.meshes.length},t+=a.triangles,a.count>0&&(n+=a.meshes.length));e[r.name]={total:r.inst.count,...i}}let r=this.grass;return e.grass={nearCells:r.levels[0].count,midCells:r.levels[1].count,farCells:r.levels[2].count,triangles:r.triangles},t+=r.triangles,n+=r.levels.filter(e=>e.count>0).length,{types:e,triangles:t,drawCalls:n,villagePalms:this.records.villagePalms,rules:X}}dispose(){this.scene.remove(this.group);for(let e of this.types)for(let t of e.meshes)t.geometry.dispose();for(let e of this.materials)e.dispose();this.atlas.rtA.dispose(),this.leafAtlas.rt.dispose(),this.atlas.rtB.dispose(),this.atlas.depth.destroy(),this.grass.dispose()}};export{Wt as $,B as A,jn as B,W as C,ar as D,Jn as E,z as F,Fn as G,Mn as H,An as I,pn as J,vn as K,Rn as L,Ln as M,In as N,Qn as O,Pn as P,Jt as Q,On as R,hr as S,Kn as T,Nn as U,Bn as V,Wn as W,tn as X,an as Y,qt as Z,ii as _,Xi as a,_r as b,Ui as c,Oi as d,kt as et,bi as f,zr as g,ai as h,da as i,V as j,kn as k,ji as l,Hr as m,Pa as n,Ke as nt,Qi as o,q as p,_n as q,fa as r,Gi as s,pc as t,Je as tt,Ai as u,ri as v,Gn as w,vr as x,br as y,H as z};