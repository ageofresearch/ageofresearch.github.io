// Preserve the original resolve equations. At native resolution, neighbouring output pixels
// repeatedly prepare the same input samples; one 8x8 group shares its 10x10 input neighbourhood.
// Workgroup storage remains f32. The final three texture formats are unchanged.
export const TAA_TILE_SIZE = 8;
export const TAA_TILE_EXTENT = TAA_TILE_SIZE + 2;

export function canUseTiledTAA( { enabled, debugView, inputWidth, inputHeight, outputWidth, outputHeight, jitterX, jitterY } ) {
	return enabled && debugView === 0 && inputWidth === outputWidth && inputHeight === outputHeight &&
		inputWidth > 0 && inputHeight > 0 && Math.abs( jitterX ) < 0.49 && Math.abs( jitterY ) < 0.49;
}

export function tiledTAAResolveSource( original ) {
	const depth = /fn taauDepthAt\( p: vec2i \) -> f32 \{[\s\S]*?\n\}/;
	const prepare = `\t\tlet rgb = min( max( taauLoadBeauty( tap ).rgb, vec3f( 0.0 ) ) * exposure, vec3f( 65504.0 ) );
\t\tsamples[ i ] = taauToYCoCg( rgb );
\t\tlumas[ i ] = taauLockLuma( rgb );`;
	if ( ! depth.test( original ) || ! original.includes( prepare ) || ! original.includes( '@fragment fn fs( in: FSIn ) -> TaauOut' ) ) {
		throw new Error( 'The temporal resolve changed: review the tiled adaptation before enabling it' );
	}
	const body = original
		.replace( depth, 'fn taauDepthAt( p: vec2i ) -> f32 { return taauTileDepth[ taauTileIndex( p ) ]; }' )
		.replace( prepare, `\t\tlet prepared = taauTilePrepared[ taauTileIndex( tap ) ];
\t\tsamples[ i ] = prepared.xyz;
\t\tlumas[ i ] = prepared.w;` )
		.replace( '@fragment fn fs( in: FSIn ) -> TaauOut', 'fn taauResolvePixel( in: FSIn ) -> TaauOut' )
		.replace( /@location\(\s*\d+\s*\)\s*/g, '' );
	return /* wgsl */`
struct FSIn { pos: vec4f, uv: vec2f };
var<workgroup> taauTilePrepared: array<vec4f, 100>;
var<workgroup> taauTileDepth: array<f32, 100>;
var<private> taauTileOrigin: vec2i;
fn taauTileIndex(p:vec2i)->u32 {
	let q=p-taauTileOrigin;
	return u32(q.y*10+q.x);
}
${ body }
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
}`;
}
