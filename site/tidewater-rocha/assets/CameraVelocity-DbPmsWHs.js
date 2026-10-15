import{D as e,E as t,c as n,d as r,f as i,l as a,o,t as s,w as c}from"./Frame-CNet77I0.js";import{t as l}from"./GPU-CxPpnRCf.js";import{t as u}from"./Texture-8f_StRFj.js";import{t as d}from"./common-HBn3Movl.js";import{a as f}from"./LocalLights-DGrzAZBs.js";import{n as p}from"./Material-tyLfv2Wn.js";var m=`
struct FSIn { @builtin( position ) pos: vec4f, @location( 0 ) uv: vec2f };
@vertex fn vs( @builtin( vertex_index ) i: u32 ) -> FSIn {
	let p = vec2f( f32( ( i << 1u ) & 2u ), f32( i & 2u ) );
	var o: FSIn;
	o.pos = vec4f( p * 2.0 - 1.0, FS_DEPTH, 1.0 );
	o.uv = vec2f( p.x, 1.0 - p.y );
	return o;
}
`,h=class{constructor({label:e=`fullscreen`,modules:t=[],bindings:r={},code:i,colorFormats:o=[`rgba16float`],blend:s=`none`,defines:c={},depthFormat:u=null,depthCompare:f=`always`,depthWrite:h=!1,depth:g=0,writeMasks:_=null,blends:v=null}){this.label=e,this.colorFormats=o;let y=i.includes(`@fragment`)?i:`${i}\n@fragment fn fs( in: FSIn ) -> @location( 0 ) vec4f { return fragment( in ); }\n`,b=n({modules:[d,...t],bindings:r,code:m.replace(`FS_DEPTH`,g.toFixed(6))+y,defines:c,stage:`render`,label:e});this.source=b.code,this.bindings=b.bindings;let x=a(b.code,e),S={label:e,layout:l.device.createPipelineLayout({bindGroupLayouts:[b.group0.layout,b.bindings.layout]}),vertex:{module:x,entryPoint:`vs`},fragment:{module:x,entryPoint:`fs`,targets:o.map((e,t)=>({format:e,blend:p(v?v[t]:t===0?s:`none`),writeMask:_?_[t]:GPUColorWrite.ALL}))},primitive:{topology:`triangle-list`}};u&&(S.depthStencil={format:u,depthCompare:f,depthWriteEnabled:h}),this.handle=l.renderPipeline(S),this.timestampWrites=null}get pipeline(){return l.ready(this.handle)}draw(e,t=s){e.setPipeline(l.ready(this.handle)),e.setBindGroup(0,r(t,`render`).getBindGroup()),e.setBindGroup(1,this.bindings.getBindGroup()),e.draw(3)}render({colorViews:e,clear:t=null,clearColors:n=null,viewport:r=null,scissor:i=null,frameBlock:a=s,depthView:o=null,encoder:c=l.getEncoder()}={}){let u=e.map(e=>e.isTexture?e.view({dimension:`2d`,mipLevelCount:1}):e),d={label:this.label,colorAttachments:u.map((e,r)=>{let i=n?n[r]:t;return{view:e,loadOp:i?`clear`:`load`,storeOp:`store`,clearValue:i||[0,0,0,0]}})};o&&(d.depthStencilAttachment={view:o,depthLoadOp:`load`,depthStoreOp:`store`}),this.timestampWrites&&(d.timestampWrites=this.timestampWrites);let f=c.beginRenderPass(d);r&&f.setViewport(...r),i&&f.setScissorRect(...i),this.draw(f,a),f.end()}},g=1.333,_=.35,v=_,y=16,b=new o({name:`underwater-flash`,deps:[f],code:`
fn uwFlashOn() -> f32 { return localLights.flashOn; }
fn uwFlashPos() -> vec3f { return localLights.flashPos; }
fn uwFlashDir() -> vec3f { return localLights.flashDir; }
fn uwFlashCol() -> vec3f { return localLights.flashCol; }
fn uwFlashCone() -> vec2f { return localLights.flashCone; }
`}),x=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},S=class{constructor({depthTexture:n,maskTexture:r,query:a,caustics:o,fft:s}){this.depthTexture=n,this.maskTexture=r,this.query=a,this.caustics=o,this.fft=s,this.mediumTexture=null,this.uniforms=new i(`UnderwaterParams`,{camWorld:[`mat4x4f`,new c],camPos:[`vec3f`,new e],lensDistance:[`f32`,.1],proj:[`vec4f`,new t(1,1,.1,1e3)],shafts:[`f32`,1],band:[`f32`,9],enabled:[`f32`,1],torchBeam:[`f32`,3],hasShafts:[`f32`,0]},{label:`underwater`});let l=this.uniforms.fields;this.lensDistance=l.lensDistance,this.shafts=l.shafts,this.band=l.band,this.enabled=l.enabled,this.torchBeam=l.torchBeam,this.camPos=l.camPos,this.camWorld=l.camWorld,this.proj=l.proj,this._module=null,this.shaftTarget=new u(1,1,{colors:[`rgba16float`],label:`uwShafts`}),this._shaftPass=null}setSize(e,t){this.shaftTarget.setSize(Math.max(1,Math.ceil(e/2)),Math.max(1,Math.ceil(t/2)))}get shaftPass(){return this._shaftPass||=new h({label:`underwater shafts`,colorFormats:[`rgba16float`],modules:[this.module],code:this._shaftCode()}),this._shaftPass}renderShafts(e){this.uniforms.fields.hasShafts.value=+!!e,e&&this.shaftPass.render({colorViews:[this.shaftTarget.texture],clear:[0,0,0,0]})}updateCamera(e){e.updateMatrixWorld(),this.camPos.value.setFromMatrixPosition(e.matrixWorld),this.camWorld.value.copy(e.matrixWorld);let t=e.projectionMatrix.elements;this.proj.value.set(t[0],t[5],e.near,e.far),this.lensDistance.value=e.near}get module(){return this._module||=new o({name:`underwater`,deps:[d,this.query&&this.query.module,this.caustics&&this.caustics.module,b],uniforms:this.uniforms,uniformName:`underwaterParams`,bindings:{underwaterDepth:{texture:()=>this.depthTexture},underwaterMask:{texture:()=>this.maskTexture}},code:this._code()}),this._module}get compositeModule(){return this._compositeModule||=new o({name:`underwater-composite`,deps:[this.module],bindings:{underwaterMediumTex:{texture:()=>this.mediumTexture},underwaterShaftTex:{texture:()=>this.shaftTarget.texture}},code:this._compositeCode()}),this._compositeModule}_code(){return`
const UW_STRADDLE: f32 = ${x(v)};
const UW_BAND: i32 = ${y};
const UW_IOR: f32 = ${x(g)};

// reversed-Z depth -> view Z (negative)
fn underwaterViewZ( d: f32 ) -> f32 {
	let n = underwaterParams.proj.z; let f = underwaterParams.proj.w;
	return n * f / ( ( n - f ) * d - n );
}

// view-space ray for screen uv (unnormalized, z = -1)
fn underwaterViewRay( uv: vec2f ) -> vec3f {
	let ndc = vec2f( uv.x * 2.0 - 1.0, ( 1.0 - uv.y ) * 2.0 - 1.0 );
	return vec3f( ndc.x / underwaterParams.proj.x, ndc.y / underwaterParams.proj.y, -1.0 );
}

fn underwaterWorldDir( uv: vec2f ) -> vec3f {
	return normalize( ( underwaterParams.camWorld * vec4f( underwaterViewRay( uv ), 0.0 ) ).xyz );
}

fn _uwDepthAt( uv: vec2f ) -> f32 {
	let size = vec2f( textureDimensions( underwaterDepth ) );
	return textureLoad( underwaterDepth, vec2i( clamp( uv, vec2f( 0.0 ), vec2f( 0.9999 ) ) * size ), 0 );
}

// Medium at the near clip plane for each pixel (1: water, 0: air).
//  - a water surface in view: the side it is seen from (written by the water material) is the
//    medium between the lens and the surface
//  - no surface in view: the ray never crosses the surface beyond the lens, so it is in the medium
//    of its far end: an object hit below the surface is in water; the sky is air (a downward ray
//    that reaches nothing is in water)
// The waterline on the lens is then exactly where the rendered surface crosses the near plane:
// the surface fragments on one side end right there, and the far ends on the other side agree.
// Farther than STRADDLE from the surface the near plane can't reach it: the camera's medium.
fn underwaterMedium( uv: vec2f ) -> f32 {
	if ( frame.waterEnabled < 0.5 ) { return 0.0; }
	let size = vec2f( textureDimensions( underwaterMask ) );
	let px = vec2i( clamp( uv, vec2f( 0.0 ), vec2f( 0.9999 ) ) * size );
	let m = textureLoad( underwaterMask, px, 0 );
	let camH = underwaterParams.camPos.y - waterQueryCameraState().x;
	var water = select( 0.0, 1.0, camH < 0.0 );
	if ( m.y > 0.5 ) {
		water = m.x;
	} else if ( abs( camH ) < UW_STRADDLE ) {
		let d = _uwDepthAt( uv );
		let ray = underwaterViewRay( uv );
		let dirW = ( underwaterParams.camWorld * vec4f( ray, 0.0 ) ).xyz;
		if ( d < 1e-7 ) {
			water = select( 0.0, 1.0, dirW.y < 0.0 );
		} else {
			let q = underwaterParams.camPos + dirW * ( - underwaterViewZ( d ) );
			water = select( 0.0, 1.0, q.y < waterQueryHeightAtXZ( q.xz ) );
		}
	}
	return water;
}

`}_shaftCode(){return`
fn _uwIgn( px: vec2f ) -> f32 { return fract( fract( dot( px, vec2f( 0.06711056, 0.00583715 ) ) ) * 52.9829189 ); }

fn fragment( in: FSIn ) -> vec4f {
	let uv = in.uv;
	let pixel = in.pos.xy;
	let d = _uwDepthAt( uv );
	let vz = underwaterViewZ( d );
	let ray = underwaterViewRay( uv );
	let dist = max( min( length( ray * ( - vz ) ), 600.0 ) - underwaterParams.lensDistance * length( ray ), 0.0 );
	let dir = underwaterWorldDir( uv );
	let st = waterQueryCameraState();
	let sigS = frame.waterScattering;
	let sigT = frame.waterAbsorption + sigS;

	let Ls = - refract( - frame.sunDir, vec3f( 0.0, 1.0, 0.0 ), 1.0 / UW_IOR ); // toward the sun, underwater
	let mu = max( Ls.y, 0.15 );
	let cosPh = dot( dir, Ls );
	let g = 0.85;
	let phase = ( 1.0 - g * g ) / ( 4.0 * PI ) / pow( max( 1.0 + g * g - cosPh * 2.0 * g, 1e-4 ), 1.5 ) * 0.75 + 0.25 / ( 4.0 * PI );

	let sunE = frame.sunColor * 0.96;

	var shafts = vec3f( 0.0 );
${this.caustics&&this.caustics.module?`
		{
			let steps = 20;
			let maxD = min( dist, 22.0 );
			let ds = maxD / f32( steps );
			// interleaved gradient noise on the pixel grid, moved every frame (Jimenez 2014) so the
			// temporal resolve integrates the steps instead of freezing a noise pattern on screen
			let fragPx = pixel + f32( frame.frameIndex % 64u ) * 5.588238;
			let jitter = _uwIgn( fragPx );
			// gusts / slicks vary over hundreds of metres: one sample for the whole march
			let detK = causticsDetailK( underwaterParams.camPos.xz + dir.xz * ( maxD * 0.5 ) );
			for ( var i = 0; i < steps; i++ ) {
				let s = ( f32( i ) + jitter ) * ds;
				let p = underwaterParams.camPos + dir * s;
				let z = max( st.x - p.y, 0.01 );
				let caus = causticsSampleShaft( p, z, 1.5, detK );
				let Tl = exp( - sigT * ( s + z / mu ) );
				shafts += ( caus - 1.0 ) * Tl * ds;
			}
			shafts = shafts * sunE * sigS * phase * underwaterParams.shafts * 2.5;
		}`:``}
	// diver's torch: single scattering of the flashlight cone along the view ray (the torch sits
	// beside the eye, so the beam is a shaft slightly off the view axis), extinction on the light
	// and the view legs, same phase function, up to the scene depth
	var torch = vec3f( 0.0 );
	if ( uwFlashOn() > 0.5 ) {
		let tSteps = 8;
		let tMax = min( dist, 25.0 );
		let tds = tMax / f32( tSteps );
		let tPx = pixel + f32( frame.frameIndex % 64u ) * 5.588238 + 17.3;
		let tJit = _uwIgn( tPx );
		let fpos = uwFlashPos(); let fdir = uwFlashDir(); let cone = uwFlashCone();
		for ( var i = 0; i < tSteps; i++ ) {
			let s = ( f32( i ) + tJit ) * tds;
			let v = underwaterParams.camPos + dir * s - fpos;
			let r2 = max( dot( v, v ), 1e-4 );
			let r = sqrt( r2 );
			let Lr = v / r;
			let spot = localLightsSpotProfile( dot( Lr, fdir ), cone.x, cone.y );
			// same lobe as the sun in-scatter (0.75 forward g = 0.85 + 0.25 isotropic), Schlick's form
			let sk = 1.55 * g - 0.55 * g * g * g;
			let sd = 1.0 - dot( dir, - Lr ) * sk;
			let ph = ( 1.0 - sk * sk ) / ( 4.0 * PI ) * 0.75 / ( sd * sd ) + 0.25 / ( 4.0 * PI );
			torch += exp( - sigT * ( r + s ) ) * ( spot * ph / ( r2 + 0.15 ) );
		}
		// x3: the suspended particles scatter more than the clear-water coefficient (the beam reads)
		torch = torch * uwFlashCol() * sigS * tds * underwaterParams.torchBeam;
	}

	return vec4f( max( shafts, vec3f( 0.0 ) ) + torch, dist );
}
`}_compositeCode(){return`
fn _uwMed( pc: vec2i, dy: i32, mSize: vec2i ) -> f32 {
	return textureLoad( underwaterMediumTex, vec2i( pc.x, clamp( pc.y + dy, 0, mSize.y - 1 ) ), 0 ).r;
}

fn _uwLit( m: f32, sigT: vec3f, zc: f32, dirY: f32, dist: f32 ) -> vec3f {
	let a = sigT * zc / m;
	let kk = sigT * ( 1.0 - dirY / m );
	let e0 = exp( - a );
	let e1 = exp( - max( a + kk * dist, vec3f( 0.0 ) ) );
	return select( ( e0 - e1 ) / kk, e0 * dist, abs( kk ) < vec3f( 1e-4 ) );
}

// pixel: fragment coordinate of the composite (screenCoordinate)
fn underwaterComposite( uv: vec2f, pixel: vec2f ) -> vec4f {
	if ( frame.waterEnabled < 0.5 ) { return vec4f( postSceneSample( uv ), 1.0 ); }
	let mSize = vec2i( textureDimensions( underwaterMediumTex ) );
	let pc = clamp( vec2i( uv * vec2f( mSize ) ), vec2i( 0 ), mSize - 1 );
	let here = _uwMed( pc, 0, mSize );
	let under = here > 0.5;

	// distance to the waterline on the lens in pixels, searched vertically (the line runs roughly
	// across the screen: no camera roll, and over the few cm of the lens the surface is a plane)
	var lineDist = 1e4;
	var lineDir = 0.0; // uv.y direction toward the other medium
	let camH = underwaterParams.camPos.y - waterQueryCameraState().x;
	if ( abs( camH ) < UW_STRADDLE ) {
		let flips = abs( _uwMed( pc, -8, mSize ) - here ) + abs( _uwMed( pc, 8, mSize ) - here ) + abs( _uwMed( pc, -UW_BAND, mSize ) - here ) + abs( _uwMed( pc, UW_BAND, mSize ) - here );
		if ( flips > 0.5 ) {
			for ( var i = 1; i < UW_BAND + 1; i++ ) {
				let up = abs( _uwMed( pc, -i, mSize ) - here ) > 0.5;
				let down = abs( _uwMed( pc, i, mSize ) - here ) > 0.5;
				if ( lineDist > 1e3 && ( up || down ) ) {
					lineDist = f32( i ) - 0.5;
					lineDir = select( 1.0, -1.0, up );
				}
			}
		}
	}

	// ---- meniscus band: rounded water edge acting like a cylindrical lens; samples are pushed
	// away from the line on both sides
	let bandW = underwaterParams.band;
	let tBand = clamp( lineDist / bandW, 0.0, 1.0 );
	let bendPx = tBand * sqrt( max( 1.0 - tBand * tBand, 0.0 ) ) * bandW * 0.8;
	let uvB = uv - vec2f( 0.0, lineDir * bendPx / f32( mSize.y ) );
	let base = postSceneSample( uvB );

	var result = base;

	if ( under && underwaterParams.enabled > 0.5 ) {
		// scene distance along this pixel
		let d = _uwDepthAt( uv );
		let vz = underwaterViewZ( d );
		let ray = underwaterViewRay( uv );
		// the water between the eye and the lens is clipped away: the medium starts at the lens
		let dist = max( min( length( ray * ( - vz ) ), 600.0 ) - underwaterParams.lensDistance * length( ray ), 0.0 );
		let dir = underwaterWorldDir( uv );

		let st = waterQueryCameraState();
		let zc = max( st.x - underwaterParams.camPos.y, 0.0 ); // camera depth below the surface
		let sigA = frame.waterAbsorption;
		let sigS = frame.waterScattering;
		let sigT = sigA + sigS;

		let Ls = - refract( - frame.sunDir, vec3f( 0.0, 1.0, 0.0 ), 1.0 / UW_IOR ); // toward the sun, underwater
		let mu = max( Ls.y, 0.15 );
		let cosPh = dot( dir, Ls );
		let g = 0.85;
		let phase = ( 1.0 - g * g ) / ( 4.0 * PI ) / pow( max( 1.0 + g * g - cosPh * 2.0 * g, 1e-4 ), 1.5 ) * 0.75 + 0.25 / ( 4.0 * PI );

		// light arriving at depth z: E0 exp(-sigT z / m); along the ray z(s) = zc - dir.y s, seen through
		// exp(-sigT s). The in-scatter integral is (exp(-a) - exp(-(a + k d))) / k with a = sigT zc / m
		// and k = sigT (1 - dir.y / m): both exponents stay <= 0 while the ray is in the water, so it
		// can't overflow looking up through deep water (exp(-a) (1 - exp(-k d)) / k does, and the
		// Inf / NaN would stick in the TAA history)
		let sunE = frame.sunColor * 0.96;
		let ambE = frame.skyIrradiance * PI * 0.9;

		let bb = sigS * 0.035;
		let msAlb = bb * 1.3 / ( sigA + bb );
		let inSun = sunE * ( sigS * phase + msAlb * sigT * ( 1.0 / PI ) ) * _uwLit( mu, sigT, zc, dir.y, dist );
		let inAmb = ambE * ( sigS * ( 1.0 / ( 4.0 * PI ) ) + msAlb * sigT * ( 1.0 / PI ) ) * _uwLit( 0.8, sigT, zc, dir.y, dist );

		// caustic light shafts and the torch beam: the half resolution march (underwaterShafts), depth-aware
		// upsampled (bilinear weights times the view distance similarity)
		var extra = vec3f( 0.0 );
		if ( underwaterParams.hasShafts > 0.5 ) {
			let ls = vec2i( textureDimensions( underwaterShaftTex ) );
			let pa = uv * vec2f( ls ) - 0.5;
			let q0 = floor( pa );
			let fr = pa - q0;
			var acc = vec3f( 0.0 );
			var wSum = 1e-6;
			for ( var k = 0; k < 4; k++ ) {
				let o = vec2i( k & 1, k >> 1u );
				let sm = textureLoad( underwaterShaftTex, clamp( vec2i( q0 ) + o, vec2i( 0 ), ls - 1 ), 0 );
				let wb = select( 1.0 - fr.x, fr.x, o.x == 1 ) * select( 1.0 - fr.y, fr.y, o.y == 1 );
				let rel = abs( sm.w - dist ) / max( dist, 0.5 );
				let wt = wb / pow2( rel * 10.0 + 1.0 ) + 1e-5;
				acc += sm.rgb * wt;
				wSum += wt;
			}
			extra = acc / wSum;
		}

		let T = exp( - sigT * dist );
		result = base * T + inSun + inAmb + extra;
	}

	// meniscus contact line and bright rim
	let line = smoothstep( 2.0, 0.0, lineDist );
	let rim = smoothstep( bandW, bandW * 0.4, lineDist ) * smoothstep( 0.5, 2.5, lineDist );
	let withLine = result * ( 1.0 - line * 0.55 ) + rim * 0.15 * ( frame.skyIrradiance * 2.5 + frame.sunColor * 0.02 );
	return vec4f( withLine, 1.0 );
}
`}},C={value:new c},w=new c,T=new c,E=!1;function D(e){e.updateMatrixWorld(),e.matrixWorldInverse&&e.matrixWorldInverse.copy(e.matrixWorld).invert(),T.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),E?C.value.copy(w):C.value.copy(T),w.copy(T),E=!0}function O(e){e.traverse(e=>{e.staticVelocity=!0})}export{h as a,S as i,O as n,_ as r,D as t};