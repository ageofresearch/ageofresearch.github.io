import{D as e,E as t,b as n,f as r,j as i,k as a,n as o,o as s,w as c}from"./Frame-CNet77I0.js";import{t as l}from"./common-HBn3Movl.js";var u={hooks:{},version:0,set(e,t){this.hooks[e]=t,this.version++},modules(){return Object.values(this.hooks).filter(Boolean)}},d={directModulation:`fn hookDirectModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }`,ambientModulation:`fn hookAmbientModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }`,shadowPosition:`fn hookShadowPosition( P: vec3f, N: vec3f, pixel: vec2f ) -> vec3f { return P; }`,bounce:`fn hookBounce( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 0.0 ); }`,localLights:`fn hookLocalLights( s: Surface, P: vec3f, N: vec3f, V: vec3f, acc: ptr<function, LightAccum> ) {}`,envSpecular:`fn hookEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f { let t = sat( R.y * 0.5 + 0.5 ); return mix( frame.horizonColor * 0.6, frame.skyIrradiance * PI, t ) * frame.envIntensity; }`,envDiffuse:`fn hookEnvDiffuse( N: vec3f ) -> vec3f { return mix( frame.horizonColor * 0.25, frame.skyIrradiance, N.y * 0.5 + 0.5 ) * frame.envIntensity; }`};function f(e=null){let t=[];for(let n in d){let r=e?.[n]||u.hooks[n];r?t.push(r):t.push(m(n))}return t}var p={};function m(e){return p[e]||(p[e]=new s({name:`hook-`+e+`-default`,deps:[S],code:d[e]}))}var h=new r(`SunShadow`,{matrices:[`mat4x4f[4]`,[new c,new c,new c,new c]],cascades:[`vec4f[4]`,[new t,new t,new t,new t]],count:[`u32`,0],mapSize:[`f32`,2048],bias:[`f32`,2e-5],fade:[`f32`,1],pcssCascades:[`u32`,1],sunAngularDiameter:[`f32`,.00925],enabled:[`f32`,0],pad:[`f32`,0],blend:[`vec4f[4]`,[new t,new t,new t,new t]]}),g=null;function _(e){g=e}var v=Object.freeze(Array.from({length:5},(e,t)=>{let n=Math.fround(t*Math.fround(2.399963229728653)),r=Math.fround(Math.sqrt(Math.fround((t+.5)/5)));return Object.freeze([Math.fround(Math.fround(Math.cos(n))*r),Math.fround(Math.fround(Math.sin(n))*r)])})),y=e=>{let t=String(e);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},b=v.map(([e,t])=>`\tsum += _shadowTap( uvz.xy + _waterPcf5Rotate( vec2f( ${y(e)}, ${y(t)} ), rotation ) * texel, c, z );`).join(`
`),x=new s({name:`sunShadow`,deps:[l],uniforms:h,uniformName:`shadowParams`,bindings:{sunShadowMap:{texture:()=>g,viewDimension:`2d-array`}},code:`
#if WATER_SHADOW_ROTATION
fn _waterPcf5Rotate( v: vec2f, r: vec2f ) -> vec2f {
	return vec2f( v.x * r.x - v.y * r.y, v.x * r.y + v.y * r.x );
}
#endif
fn shadowCascadeOf( viewDist: f32 ) -> i32 {
#if WATER_SINGLE_CASCADE
	if ( shadowParams.count == 1u ) {
		return select( -1, 0, viewDist < shadowParams.cascades[ 0 ].x );
	}
#endif
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
#if WATER_SHADOW_ROTATION
	let rotation = vec2f( cos( phiP ), sin( phiP ) );
${b}
#else
	for ( var i = 0; i < 5; i++ ) {
		sum += _shadowTap( uvz.xy + vogelDiskSample( i, 5, phiP ) * texel, c, z );
	}
#endif
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
#if WATER_SINGLE_CASCADE
	// Keep the original selection/fade gates while making its only live map
	// index literal. A changed scene count retains the generic cascade path.
	if ( shadowParams.count == 1u ) {
		if ( shadowParams.fade < 0.5 ) {
			if ( dist < shadowParams.cascades[ 0 ].x ) {
				return _sunShadowCascade( P, N, 0, noise, pcfNoise, pcss );
			}
			return 1.0;
		}
		let b = shadowParams.blend[ 0 ];
		let center = ( b.x + b.y ) * 0.5;
		let margin = max( select( b.w, b.z, dist < center ), 1e-5 );
		let csmX = b.x - margin * 0.5;
		let csmY = b.y;
		var ret = 1.0;
		if ( dist >= csmX && dist <= csmY ) {
			var ratio = clamp( min( dist - csmX, csmY - dist ) / margin, 0.0, 1.0 );
			if ( dist <= center ) { ratio = 1.0; }
			ret -= ( 1.0 - _sunShadowCascade( P, N, 0, noise, pcfNoise, pcss ) ) * ratio;
		}
		return max( ret, 0.0 );
	}
#endif
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
`}),S=new s({name:`surface`,deps:[l],code:`
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
#if YACHT_DIELECTRIC_SCALAR || YACHT_SHARED_GGX_ANGLES
// The ordinary BRDF remains untouched. Authored yacht draws may share only
// their view/light half-vector and scalar Fresnel factor, never normal fields.
fn yachtDirectGgx( L: vec3f, V: vec3f, N: vec3f, f0: vec3f, f90: f32, roughness: f32, sharedH: vec3f, sharedFresnel: f32, dielectric: bool ) -> vec3f {
	let alpha = roughness * roughness;
#if YACHT_SHARED_GGX_ANGLES
	let H = sharedH;
	let fresnel = sharedFresnel;
#else
	let H = normalize( L + V );
	let dotVH = sat( dot( V, H ) );
	let fresnel = exp2( ( -5.55473 * dotVH - 6.98316 ) * dotVH );
#endif
	let dotNL = sat( dot( N, L ) ); let dotNV = sat( dot( N, V ) );
	let dotNH = sat( dot( N, H ) );
#if YACHT_DIELECTRIC_SCALAR
	if ( dielectric ) {
		let F = 0.04 * ( 1.0 - fresnel ) + 1.0 * fresnel;
		return vec3f( F * V_GGX_SmithCorrelated( alpha, dotNL, dotNV ) * D_GGX( alpha, dotNH ) );
	}
#endif
	return ( f0 * ( 1.0 - fresnel ) + f90 * fresnel ) * V_GGX_SmithCorrelated( alpha, dotNL, dotNV ) * D_GGX( alpha, dotNH );
}
#endif
#if YACHT_DIELECTRIC_SCALAR
// With metalness zero and unit specular intensity, all three original
// multiscatter components are identical. Keep their operation tree scalar.
fn yachtDielectricMultiscatter( N: vec3f, V: vec3f, roughness: f32 ) -> vec2f {
	let fab = DFGApprox( sat( dot( N, V ) ), roughness );
	let Fr = 0.04;
	let FssEss = Fr * fab.x + 1.0 * fab.y;
	let Ess = fab.x + fab.y;
	let Ems = 1.0 - Ess;
	let Favg = Fr + ( 1.0 - Fr ) * 0.047619;
	let Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	return vec2f( FssEss, Fms * Ems );
}
#endif
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
`}),C=new s({name:`lighting`,deps:[l,S,x],code:`
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

#if WATER_YACHT_PBR_PREPARED && PASS_MAIN
var<private> waterYachtBaseVariance: f32 = 0.0;
var<private> waterYachtCoatVariance: f32 = 0.0;

// Called unconditionally before a cache/occlusion branch. A mixed quad must
// never take a PBR derivative inside its divergent fresh-shading branch.
fn waterYachtPbrPrepare( s: Surface, P: vec3f ) {
	let N = s.normal;
	lightDPdx = dpdx( P );
	lightDPdy = dpdy( P );
#if WATER_SPECULAR_AA
	let specularPixelScale = max( vec2f( 1.0 ), frame.resolution / max( frame.outputResolution, vec2f( 1.0 ) ) );
	let nx = dpdx( N ) * specularPixelScale.x; let ny = dpdy( N ) * specularPixelScale.y;
	waterYachtBaseVariance = min( .18, max( dot( nx, nx ), dot( ny, ny ) ) );
#if CLEARCOAT
#if YACHT_COINCIDENT_COAT_NORMAL
	waterYachtCoatVariance = waterYachtBaseVariance;
#else
	let cx = dpdx( s.clearcoatNormal ) * specularPixelScale.x; let cy = dpdy( s.clearcoatNormal ) * specularPixelScale.y;
	waterYachtCoatVariance = min( .18, max( dot( cx, cx ), dot( cy, cy ) ) );
#endif
#endif
#endif
}
#endif

#if WATER_YACHT_SHADING_CACHE && PASS_MAIN
var<private> waterYachtLightColor: vec3f = vec3f( 0.0 );

// The unconditional PBR preparation above precedes this shadow work. A fresh
// cache miss consumes the same modulation and visibility without a second tap.
fn waterYachtCachePrepare( s: Surface, P: vec3f, V: vec3f, pixel: vec2f ) -> f32 {
	let N = s.normal;
	let dotNL = sat( dot( N, frame.sunDir ) );
	waterYachtLightColor = vec3f( 0.0 );
	var visibility = 1.0;
	if ( dotNL > 0.0 || any( s.translucency > vec3f( 0.0 ) ) ) {
		waterYachtLightColor = frame.sunColor * hookDirectModulation( P, N );
#if MATERIAL_SUN_MODULATION
		waterYachtLightColor *= materialSunModulation( P, N );
#endif
		let geomN = N;
		var shadow = 0.0;
		if ( any( waterYachtLightColor > vec3f( 0.0 ) ) ) {
#if REFRACTION_CLIP
			shadow = sunShadowHard( hookShadowPosition( P, geomN, pixel ) );
#else
			shadow = sunShadow( hookShadowPosition( P, geomN, pixel ), geomN, pixel );
#endif
		}
		visibility = shadow;
		waterYachtLightColor *= shadow;
	}
	return visibility;
}
#endif

fn shadeSurface( s: Surface, P: vec3f, V: vec3f, pixel: vec2f ) -> vec3f {
	let N = s.normal;
	var rough = clamp( s.roughness, 0.03, 1.0 );
#if WATER_SPECULAR_AA
	// Convolve a subpixel normal footprint with the GGX lobe. Smooth panels
	// retain their authored gloss; tiny curved rails and hull glints broaden
	// before they become isolated flashing pixels. Keep the filter in radiance.
#if WATER_YACHT_PBR_PREPARED && PASS_MAIN
	let variance = waterYachtBaseVariance;
#else
	let specularPixelScale = max( vec2f( 1.0 ), frame.resolution / max( frame.outputResolution, vec2f( 1.0 ) ) );
	let nx = dpdx( N ) * specularPixelScale.x; let ny = dpdy( N ) * specularPixelScale.y;
	let variance = min( .18, max( dot( nx, nx ), dot( ny, ny ) ) );
#endif
	rough = sqrt( sqrt( min( 1.0, rough * rough * rough * rough + variance ) ) );
#endif
#if CLEARCOAT
	var coatRough = clamp( s.clearcoatRoughness, 0.03, 1.0 );
#if WATER_SPECULAR_AA
#if WATER_YACHT_PBR_PREPARED && PASS_MAIN
	let coatVariance = waterYachtCoatVariance;
#else
#if YACHT_COINCIDENT_COAT_NORMAL
	// Only an entire draw with identical shading and coat normals can share
	// this kernel. A per-pixel equality check is unsafe at bumped-wood edges.
	let coatVariance = variance;
#else
	let cx = dpdx( s.clearcoatNormal ) * specularPixelScale.x; let cy = dpdy( s.clearcoatNormal ) * specularPixelScale.y;
	let coatVariance = min( .18, max( dot( cx, cx ), dot( cy, cy ) ) );
#endif
#endif
#if YACHT_PBR_FAST
	// Derivatives above remain unconditional; only unused scalar coat work
	// moves into the branch. Zero-coat cloth, steel and teak retain base PBR.
	if ( s.clearcoat != 0.0 ) {
		coatRough = sqrt( sqrt( min( 1.0, coatRough * coatRough * coatRough * coatRough + coatVariance ) ) );
	}
#else
	coatRough = sqrt( sqrt( min( 1.0, coatRough * coatRough * coatRough * coatRough + coatVariance ) ) );
#endif
#endif
#endif
	let diffuseColor = s.albedo * ( 1.0 - s.metalness );
	let specF0 = mix( vec3f( 0.04 ) * s.specularIntensity, s.albedo, s.metalness );
	let specF90 = mix( s.specularIntensity, 1.0, s.metalness );
#if YACHT_DIELECTRIC_SCALAR
	let yachtDielectric = s.metalness == 0.0 && s.specularIntensity == 1.0;
#else
#if YACHT_SHARED_GGX_ANGLES
	let yachtDielectric = false;
#endif
#endif
	var acc: LightAccum;
	acc.directDiffuse = vec3f( 0.0 ); acc.directSpecular = vec3f( 0.0 );
	acc.indirectDiffuse = vec3f( 0.0 ); acc.indirectSpecular = vec3f( 0.0 );

#if !WATER_YACHT_PBR_PREPARED || !PASS_MAIN
	lightDPdx = dpdx( P );
	lightDPdy = dpdy( P );
#endif

	// ---- sun / moon
	let L = frame.sunDir;
	let dotNL = sat( dot( N, L ) );
#if WATER_YACHT_SHADING_CACHE && PASS_MAIN
	let lightColor = waterYachtLightColor;
#else
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
#endif
	let irradiance = dotNL * lightColor;
#if YACHT_HALF_COLOR
	// Geometric factors remain f32; round only the bounded RGB diffuse work.
	// Direct glossy lobes stay f32: grazing GGX can exceed the f16 range before
	// clearcoat attenuation even though the final color target is rgba16float.
	acc.directDiffuse += vec3f( vec3h( irradiance ) * vec3h( diffuseColor ) * f16( INV_PI ) );
#else
	acc.directDiffuse += irradiance * diffuseColor * INV_PI;
#endif
#if YACHT_SHARED_GGX_ANGLES
	var sharedH = vec3f( 0.0 );
	var sharedFresnel = 0.0;
	var sharedDirectActive = any( irradiance != vec3f( 0.0 ) );
#if CLEARCOAT
#if !YACHT_ALIAS_COAT_NORMAL || !YACHT_COINCIDENT_COAT_NORMAL
	if ( s.clearcoat != 0.0 ) {
		sharedDirectActive = sharedDirectActive || any( sat( dot( s.clearcoatNormal, L ) ) * lightColor != vec3f( 0.0 ) );
	}
#endif
#endif
	if ( sharedDirectActive ) {
		sharedH = normalize( L + V );
		let sharedDotVH = sat( dot( V, sharedH ) );
		sharedFresnel = exp2( ( -5.55473 * sharedDotVH - 6.98316 ) * sharedDotVH );
	}
#else
#if YACHT_DIELECTRIC_SCALAR
	let sharedH = vec3f( 0.0 );
	let sharedFresnel = 0.0;
#endif
#endif
#if YACHT_DIRECT_ZERO_FAST || YACHT_SHARED_GGX_ANGLES
	// All derivatives and shadow work stay above this branch. A finite GGX
	// lobe multiplied by exact-zero irradiance cannot contribute direct light.
	if ( any( irradiance != vec3f( 0.0 ) ) ) {
#if YACHT_DIELECTRIC_SCALAR || YACHT_SHARED_GGX_ANGLES
		acc.directSpecular += irradiance * yachtDirectGgx( L, V, N, specF0, specF90, rough, sharedH, sharedFresnel, yachtDielectric );
#else
		acc.directSpecular += irradiance * BRDF_GGX( L, V, N, specF0, specF90, rough );
#endif
	}
#else
#if YACHT_DIELECTRIC_SCALAR
	acc.directSpecular += irradiance * yachtDirectGgx( L, V, N, specF0, specF90, rough, sharedH, sharedFresnel, yachtDielectric );
#else
	acc.directSpecular += irradiance * BRDF_GGX( L, V, N, specF0, specF90, rough );
#endif
#endif
#if SHEEN
	acc.directSpecular += irradiance * BRDF_Sheen( L, V, N, s.sheenColor, max( s.sheenRoughness, 0.07 ) );
#endif
	// thin-surface transmission (foliage): lit from behind as well
	acc.directDiffuse += s.translucency * lightColor;
#if CLEARCOAT
#if YACHT_ALIAS_COAT_NORMAL && YACHT_COINCIDENT_COAT_NORMAL
	// The certified draw promises coincident normals wherever coat contributes.
	// Aliasing exposes identical GGX dot/reflection operands to the compiler;
	// zero-coat primitives retain their base normal and all derivative work.
	let ccN = N;
#else
	let ccN = s.clearcoatNormal;
#endif
#if YACHT_PBR_FAST || YACHT_DIRECT_ZERO_FAST || YACHT_SHARED_GGX_ANGLES || YACHT_DIELECTRIC_SCALAR
	var ccSpec = vec3f( 0.0 );
#if YACHT_PBR_FAST || YACHT_SHARED_GGX_ANGLES
	if ( s.clearcoat != 0.0 ) {
#endif
		let ccNL = sat( dot( ccN, L ) );
#if YACHT_DIRECT_ZERO_FAST || YACHT_SHARED_GGX_ANGLES
		if ( any( ccNL * lightColor != vec3f( 0.0 ) ) ) {
#if YACHT_DIELECTRIC_SCALAR || YACHT_SHARED_GGX_ANGLES
			ccSpec = ccNL * lightColor * yachtDirectGgx( L, V, ccN, vec3f( 0.04 ), 1.0, coatRough, sharedH, sharedFresnel, true );
#else
			ccSpec = ccNL * lightColor * BRDF_GGX( L, V, ccN, vec3f( 0.04 ), 1.0, coatRough );
#endif
		}
#else
#if YACHT_DIELECTRIC_SCALAR
		ccSpec = ccNL * lightColor * yachtDirectGgx( L, V, ccN, vec3f( 0.04 ), 1.0, coatRough, sharedH, sharedFresnel, true );
#else
		ccSpec = ccNL * lightColor * BRDF_GGX( L, V, ccN, vec3f( 0.04 ), 1.0, coatRough );
#endif
#endif
#if YACHT_PBR_FAST || YACHT_SHARED_GGX_ANGLES
	}
#endif
#else
	let ccNL = sat( dot( ccN, L ) );
	let ccSpec = ccNL * lightColor * BRDF_GGX( L, V, ccN, vec3f( 0.04 ), 1.0, coatRough );
#endif
#endif

	// ---- local lights (lanterns, windows, boat lights, flashlight)
#if !STUDIO_LIGHTING
	hookLocalLights( s, P, N, V, &acc );
#endif

#if YACHT_HALF_COLOR && !STUDIO_LIGHTING && !SHEEN
	// Keep direct GGX peaks, scalar energy compensation, and the final
	// accumulator f32. Only bounded diffuse/IBL RGB intermediates use f16.
	var color = vec3f( vec3h( acc.directDiffuse ) ) + acc.directSpecular;
	let envIrrH = vec3h( hookEnvDiffuse( N ) * PI * s.envIntensity );
	var single = vec3f( 0.0 ); var multi = vec3f( 0.0 );
#if YACHT_DIELECTRIC_SCALAR
	var diffuseMS = vec3f( 0.0 );
	if ( yachtDielectric ) {
		let scatter = yachtDielectricMultiscatter( N, V, rough );
		single += vec3f( scatter.x ); multi += vec3f( scatter.y );
		let totalScatter = single.x + multi.x;
		diffuseMS = diffuseColor * ( 1.0 - totalScatter );
	} else {
		multiscatter( N, V, specF0, specF90, rough, &single, &multi );
		let totalScatter = single + multi;
		diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
	}
#else
	multiscatter( N, V, specF0, specF90, rough, &single, &multi );
	let totalScatter = single + multi;
	let diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
#endif
	var indirectDiffuseH = vec3h( acc.indirectDiffuse );
	indirectDiffuseH += vec3h( diffuseMS ) * envIrrH * f16( INV_PI ) + vec3h( hookBounce( P, N ) ) * vec3h( diffuseColor );
	let dotNV = sat( dot( N, V ) );
#if WATER_PBR_EXACT
	var specAO = 1.0;
	if ( s.ao != 1.0 ) {
		specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
	}
#else
	let specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
#endif
	let amb = hookAmbientModulation( P, N );
	let ambH = vec3h( amb );
	indirectDiffuseH *= f16( s.ao );
	indirectDiffuseH *= ambH;
	color += vec3f( indirectDiffuseH );
	let R = reflect( -V, N );
#if YACHT_ENV_HOMOGENEOUS
	let Rr = mix( R, N, rough * rough );
#else
	let Rr = normalize( mix( R, N, rough * rough ) );
#endif
	let radianceH = vec3h( hookEnvSpecular( Rr, rough ) * s.envIntensity );
	var indirectSpecularH = vec3h( acc.indirectSpecular );
	indirectSpecularH += radianceH * vec3h( single ) + vec3h( multi ) * envIrrH * f16( INV_PI );
	indirectSpecularH *= f16( specAO );
	indirectSpecularH *= ambH;
	color += vec3f( indirectSpecularH );
#else
#if YACHT_COMPACT_PBR && !STUDIO_LIGHTING && !SHEEN
	// Preserve the original left-to-right final adds, while finishing each
	// contribution before the next expensive texture sample. This schedule
	// is installed only with the yacht's pure baked-environment hooks.
	var color = acc.directDiffuse + acc.directSpecular;
	let envIrr = hookEnvDiffuse( N ) * PI * s.envIntensity;
	var single = vec3f( 0.0 ); var multi = vec3f( 0.0 );
#if YACHT_DIELECTRIC_SCALAR
	var diffuseMS = vec3f( 0.0 );
	if ( yachtDielectric ) {
		let scatter = yachtDielectricMultiscatter( N, V, rough );
		single += vec3f( scatter.x ); multi += vec3f( scatter.y );
		let totalScatter = single.x + multi.x;
		diffuseMS = diffuseColor * ( 1.0 - totalScatter );
	} else {
		multiscatter( N, V, specF0, specF90, rough, &single, &multi );
		let totalScatter = single + multi;
		diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
	}
#else
	multiscatter( N, V, specF0, specF90, rough, &single, &multi );
	let totalScatter = single + multi;
	let diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
#endif
	acc.indirectDiffuse += diffuseMS * envIrr * INV_PI + hookBounce( P, N ) * diffuseColor;
	let dotNV = sat( dot( N, V ) );
#if WATER_PBR_EXACT
	var specAO = 1.0;
	if ( s.ao != 1.0 ) {
		specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
	}
#else
	let specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
#endif
	let amb = hookAmbientModulation( P, N );
	acc.indirectDiffuse *= s.ao;
	acc.indirectDiffuse *= amb;
	color += acc.indirectDiffuse;
	let R = reflect( -V, N );
#if YACHT_ENV_HOMOGENEOUS
	let Rr = mix( R, N, rough * rough );
#else
	let Rr = normalize( mix( R, N, rough * rough ) );
#endif
	let radiance = hookEnvSpecular( Rr, rough ) * s.envIntensity;
	acc.indirectSpecular += radiance * single + multi * envIrr * INV_PI;
	acc.indirectSpecular *= specAO;
	acc.indirectSpecular *= amb;
	color += acc.indirectSpecular;
#else
	// ---- indirect: environment + ground bounce
	// (three's PhysicalLightingModel: env irradiance goes through the multiscatter-compensated
	// diffuse; the ground bounce is plain Lambert)
	let R = reflect( -V, N );
#if YACHT_ENV_HOMOGENEOUS && !STUDIO_LIGHTING
	// The water-map environment hook applies a linear yaw rotation then an
	// explicit-LOD cube sample: scaling its nonzero direction changes neither
	// the face nor the sample coordinates. Other environment hooks retain
	// their original normalized direction.
	let Rr = mix( R, N, rough * rough );
#else
	let Rr = normalize( mix( R, N, rough * rough ) );
#endif
#if STUDIO_LIGHTING
	let envIrr = studioEnvDiffuse( N ) * PI * s.envIntensity;
	let radiance = studioEnvSpecular( Rr, rough ) * s.envIntensity;
#else
	let envIrr = hookEnvDiffuse( N ) * PI * s.envIntensity;
	let radiance = hookEnvSpecular( Rr, rough ) * s.envIntensity;
#endif
	var single = vec3f( 0.0 ); var multi = vec3f( 0.0 );
#if YACHT_DIELECTRIC_SCALAR
	var diffuseMS = vec3f( 0.0 );
	if ( yachtDielectric ) {
		let scatter = yachtDielectricMultiscatter( N, V, rough );
		single += vec3f( scatter.x ); multi += vec3f( scatter.y );
		let totalScatter = single.x + multi.x;
		diffuseMS = diffuseColor * ( 1.0 - totalScatter );
	} else {
		multiscatter( N, V, specF0, specF90, rough, &single, &multi );
		let totalScatter = single + multi;
		diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
	}
#else
	multiscatter( N, V, specF0, specF90, rough, &single, &multi );
	let totalScatter = single + multi;
	let diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
#endif
	acc.indirectSpecular += radiance * single + multi * envIrr * INV_PI;
#if STUDIO_LIGHTING
	acc.indirectDiffuse += diffuseMS * envIrr * INV_PI;
#else
	acc.indirectDiffuse += diffuseMS * envIrr * INV_PI + hookBounce( P, N ) * diffuseColor;
#endif

	// ambient occlusion (specular occlusion after Lagarde)
	let dotNV = sat( dot( N, V ) );
#if WATER_PBR_EXACT
	// With unit AO, dotNV + AO is at least one and the exponent is
	// positive. The original expression therefore saturates to exactly one.
	// Keep the original computation for every non-unit material AO value.
	var specAO = 1.0;
	if ( s.ao != 1.0 ) {
		specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
	}
#else
	let specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao );
#endif
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
#endif
#endif
#if CLEARCOAT
#if YACHT_PBR_FAST
	// With a finite PBR result and zero coat, the original blend is exactly
	// color*1 + 0. Skip its unused environment sample and specular lobe.
	if ( s.clearcoat != 0.0 ) {
#endif
	let ccNV = sat( dot( ccN, V ) );
	let Fcc = F_Schlick( vec3f( 0.04 ), 1.0, ccNV ) * s.clearcoat;
#if STUDIO_LIGHTING
	let ccRad = studioEnvSpecular( reflect( -V, ccN ), coatRough ) * amb * specAO;
#else
#if YACHT_HALF_COLOR
	let ccRad = vec3f( vec3h( hookEnvSpecular( reflect( -V, ccN ), coatRough ) ) * vec3h( amb ) * f16( specAO ) );
#else
	let ccRad = hookEnvSpecular( reflect( -V, ccN ), coatRough ) * amb * specAO;
#endif
#endif
	color = color * ( 1.0 - Fcc ) + ( ccSpec * s.clearcoat + ccRad * Fcc );
#if YACHT_PBR_FAST
	}
#endif
#endif
	return color + s.emissive;
}
`}),w=8,T=()=>Array.from({length:w},()=>new t),E=new r(`LocalLightParams`,{pos:[`vec4f[${w}]`,T()],col:[`vec4f[${w}]`,T()],dir:[`vec4f[${w}]`,T()],count:[`i32`,0],flashOn:[`f32`,0],flashCone:[`vec2f`,new a(.99,.82)],flashPos:[`vec3f`,new e],flashDir:[`vec3f`,new e(0,0,-1)],flashCol:[`vec3f`,new e]},{label:`localLights`}),D=E.fields,O={array:D.pos.value},k={array:D.col.value},A={array:D.dir.value},j=D.count,M={on:D.flashOn,pos:D.flashPos,dir:D.flashDir,col:D.flashCol,cone:D.flashCone},N=new s({name:`localLights`,deps:[l,S],uniforms:E,uniformName:`localLights`,code:`
// spot profile shared by the shading, the beam and the snow: hot centre, soft edge, faint spill
fn localLightsSpotProfile( cd: f32, cosInner: f32, cosOuter: f32 ) -> f32 {
	let m = smoothstep( cosOuter, cosInner, cd );
	return max( m * m, smoothstep( cosOuter - 0.55, cosOuter, cd ) * 0.05 );
}

fn hookLocalLights( s: Surface, P: vec3f, N: vec3f, V: vec3f, acc: ptr<function, LightAccum> ) {
#if !IS_WATER && !NO_LOCAL_LIGHTS
	let diffuseColor = s.albedo * ( 1.0 - s.metalness );
	let specF0 = mix( vec3f( 0.04 ) * s.specularIntensity, s.albedo, s.metalness );
	let specF90 = mix( s.specularIntensity, 1.0, s.metalness );
	let rough = clamp( s.roughness, 0.03, 1.0 );
	for ( var i = 0; i < localLights.count; i++ ) {
		let p = localLights.pos[ i ];
		let d = p.xyz - P;
		let d2 = dot( d, d );
		if ( d2 < p.w ) {
			let c = localLights.col[ i ];
			let sd = localLights.dir[ i ];
			let L = d * inverseSqrt( max( d2, 1e-6 ) );
			// smooth range window (1 - (d/r)^4)^2 on the inverse-square law
			let x = d2 / p.w;
			let win = sat( 1.0 - x * x );
			// spot: hot centre, soft edge at the outer cone, faint wide spill
			let spot = localLightsSpotProfile( dot( -L, sd.xyz ), c.w, sd.w );
			// Beer-Lambert over the underwater part of the path (straight, mean sea level): red dies
			// within metres, so what the torch lights far away under water is dim and blue-green
			let r = d2 * inverseSqrt( max( d2, 1e-6 ) );
			let under = select( 0.0, sat( ( frame.seaLevel - min( P.y, p.y ) ) / max( abs( p.y - P.y ), 1e-3 ) ), frame.waterEnabled > 0.5 );
			let Tw = exp( -( frame.waterAbsorption + frame.waterScattering ) * ( r * under ) );
			// the + 0.15 m^2 softens the near field of a lamp's finite size (no hot spot on the post)
			let lightColor = c.xyz * Tw * ( win * win * spot / ( d2 + 0.15 ) );
			let irradiance = max( dot( N, L ), 0.0 ) * lightColor;
#if LOCAL_LIGHTS_CHEAP
			// foliage (heavy overdraw): Lambert only
			( *acc ).directDiffuse += irradiance * diffuseColor * INV_PI;
#else
			( *acc ).directDiffuse += irradiance * diffuseColor * INV_PI;
			( *acc ).directSpecular += irradiance * BRDF_GGX( L, V, N, specF0, specF90, rough );
#if SHEEN
			( *acc ).directSpecular += irradiance * BRDF_Sheen( L, V, N, s.sheenColor, max( s.sheenRoughness, 0.07 ) );
#endif
#endif
		}
	}
#endif
}
`});u.set(`localLights`,N);var P=new e,F=new e,I=new e,L=new e,R=(e,t,n)=>{let r=Math.min(1,Math.max(0,(e-t)/(n-t)));return r*r*(3-2*r)},z=class{constructor(){this.sources=[],this.enabled=!0,this.strength=1,this.flashlight={on:!1,intensity:55,range:30,color:new n(1,.71,.49),cosInner:Math.cos(i.degToRad(9)),cosOuter:Math.cos(i.degToRad(35)),position:new e,dir:new e(0,0,-1),primed:!1},this._list=[],this.time=0,this.active=0}add(e){return e.phase=e.phase??Math.random()*100,this.sources.push(e),e}toggleFlashlight(e=!this.flashlight.on){return this.flashlight.on=e,this.flashlight.primed=!1,e}update(e,t){this.time+=t;let n=0;M.on.value=this.flashlight.on&&this.enabled?1:0;let r=O.array,i=k.array,a=A.array,s=this.flashlight;if(s.on&&this.enabled){e.updateMatrixWorld();let c=e.matrixWorld.elements;I.set(c[0],c[1],c[2]).normalize(),L.set(c[4],c[5],c[6]).normalize(),F.set(-c[8],-c[9],-c[10]).normalize(),s.primed||=(s.dir.copy(F),!0),s.dir.lerp(F,1-Math.exp(-t/.06)).normalize(),s.position.setFromMatrixPosition(e.matrixWorld).addScaledVector(I,.2).addScaledVector(L,-.22).addScaledVector(F,.15);let l=s.intensity*(.08+.92*R(o.night.value,0,.6));r[0].set(s.position.x,s.position.y,s.position.z,s.range*s.range),i[0].set(s.color.r*l,s.color.g*l,s.color.b*l,s.cosInner),a[0].set(s.dir.x,s.dir.y,s.dir.z,s.cosOuter),n=1,M.pos.value.copy(s.position),M.dir.value.copy(s.dir),M.col.value.set(s.color.r*l,s.color.g*l,s.color.b*l),M.cone.value.set(s.cosInner,s.cosOuter)}let c=R(o.night.value,.15,.75)*this.strength;if(c>.002&&this.enabled){let t=e.position,o=this._list;o.length=0;for(let e of this.sources)e.enabled!==!1&&(e.update&&e.update(),e.d2=e.position.distanceToSquared(t),o.push(e));o.sort((e,t)=>e.d2-t.d2);let s=w-n,l=o.length>s?Math.sqrt(o[s].d2):1/0;for(let e=0;e<Math.min(s,o.length);e++){let t=o[e],s=Number.isFinite(l)?R(Math.sqrt(t.d2),l,l*.8):1,u=t.flicker?1+t.flicker*Math.sin(this.time*9+t.phase)*Math.sin(this.time*5.3+t.phase*.37):1,d=t.intensity*c*s*u*(t.scale??1);if(d<=1e-4)continue;let f=t.range;r[n].set(t.position.x,t.position.y,t.position.z,f*f),i[n].set(t.color.r*d,t.color.g*d,t.color.b*d,t.cosInner??-1.5),t.dir?a[n].set(t.dir.x,t.dir.y,t.dir.z,t.cosOuter??-2):a[n].set(0,-1,0,-2),n++}}j.value=n,this.active=n}};function B(t,r){let i=r.lines,a=r.group,o=[{p:[0,2.24,.42],color:[1,.84,.62],intensity:.9,range:5.5,kind:`boatDome`},{p:[-.45,1.5,1.12],color:[.45,.75,1],intensity:.12,range:2.2,kind:`boatInstruments`},{p:[.47,3.45,-.47],color:[1,.06,.03],intensity:1.4,range:8,kind:`boatNav`,side:[1,0,0]},{p:[-.47,3.45,-.47],color:[.05,1,.3],intensity:1.4,range:8,kind:`boatNav`,side:[-1,0,0]},{p:[0,3.97,-.5],color:[1,.95,.85],intensity:1.2,range:8,kind:`boatNav`},{p:[0,i.sheerY(0)+.1,i.zAft-.05],color:[1,.95,.85],intensity:.8,range:7,kind:`boatNav`}],s=[];for(let r of o){let i=new e(...r.p),o=r.side?new e(...r.side):null,c={position:new e,color:new n(...r.color),intensity:r.intensity,range:r.range,kind:r.kind,dir:o?new e:null,cosInner:o?.25:void 0,cosOuter:o?-.2:void 0,update(){a.updateWorldMatrix(!0,!1),this.position.copy(i).applyMatrix4(a.matrixWorld),o&&this.dir.copy(o).transformDirection(a.matrixWorld)}};c.update(),s.push(t.add(c))}return s}function V(e,t){let n={lantern:1.5,pathLight:1,window:.8},r={lantern:11,pathLight:7,window:6};for(let i of t.getLightSources()){let a=i.kind||`lantern`,o={position:i.position,color:i.color,intensity:i.intensity*(n[a]??1.2),range:r[a]??12,kind:a};if(a===`window`){let e=null,n=1/0;for(let r of t.buildings||[]){let t=(r.x-i.position.x)**2+(r.z-i.position.z)**2;t<n&&(n=t,e=r)}let r=e?P.set(i.position.x-e.x,0,i.position.z-e.z):P.set(0,0,1);r.lengthSq()<1e-6&&r.set(0,0,1),r.normalize(),o.position=i.position.clone().addScaledVector(r,.35),o.dir=r.clone(),o.cosInner=.35,o.cosOuter=-.15}else o.flicker=.08;e.add(o)}}export{N as a,f as c,x as d,S as f,V as i,C as l,z as n,u as o,B as r,h as s,M as t,_ as u};