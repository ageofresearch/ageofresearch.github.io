// Internal A/B controls: the reference retains the original render graph and formats.
export function renderOptimizationOptions( search = globalThis.location?.search || '' ) {
	const qs = new URLSearchParams( search );
	const reference = qs.has( 'renderReference' );
	// Smaller targets help Rocha, but regress the island's underwater path on
	// the measured adapter. Keep its original formats/copy unless opted in.
	const rocha = qs.get( 'world' ) === 'rocha';
	return {
		reference,
		bindingReuse: rocha && !reference && !qs.has('noRenderV2') && !qs.has('noBindingReuse'),
		framePacing: rocha && !reference && !qs.has('noRenderV2') && !qs.has('noFramePacing'),
		compactTargets: ! reference && ! qs.has( 'noCompactSceneTargets' ) && ( rocha || qs.has( 'compactSceneTargets' ) ),
		depthRotation: ! reference && ! qs.has( 'noDepthRotation' ) && ( rocha || qs.has( 'depthRotation' ) ),
		// The shared-tile experiment is slower on the validated adapter; retain the
		// original fragment resolve unless an explicit A/B run requests compute.
		tiledTAA: ! reference && qs.has( 'tiledTAA' ) && ! qs.has( 'noTiledTAA' ),
	};
}

export function sceneTargetFormats( compact ) {
	return [ 'rgba16float', compact ? 'rg16float' : 'rgba16float', compact ? 'rg8unorm' : 'rgba8unorm' ];
}

// All consumers retain their Texture wrapper. Only the physical allocations rotate, before
// scene encoding starts; binding versions and cached views must follow the allocations.
export function rotateDepthTextures( current, previous, reuseViews = true ) {
	if ( current === previous || current.format !== previous.format || current.width !== previous.width || current.height !== previous.height ) {
		throw new Error( 'Depth rotation requires distinct, matching depth textures' );
	}
	const a = current.getGPU(), b = previous.getGPU();
	current.gpu = b;
	previous.gpu = a;
	if ( reuseViews ) [ current._views, previous._views ] = [ previous._views, current._views ];
	for ( const t of [ current, previous ] ) {
		t.version ++;
		if ( ! reuseViews ) t._views.clear();
	}
}
