import { renderOptimizationOptions } from '../post/RenderOptimizations.js';
import { GPU } from './gpu/GPU.js';
import { PerspectiveCamera } from './scene/Camera.js';
import { Scene } from './scene/Scene.js';
import { Timer } from './math/Timer.js';
import { MeshRenderer } from './render/MeshRenderer.js';
import { FrameUniforms } from './render/Frame.js';

// Canvas, device, main camera / scene and the frame loop.
export class Engine {

	constructor( container ) {

		this.container = container;
		this.renderScale = 1;
		this.clock = new Timer();
		this.frame = 0;
		this.onResize = [];
		this.renderOptimizations = renderOptimizationOptions();
		this.pacingStats = { callbacks: 0, submitted: 0, completed: 0, skipped: 0, inFlight: 0, maxInFlight: 0 };

	}

	async init() {

		const canvas = document.createElement( 'canvas' );
		canvas.tabIndex = 0;
		this.container.appendChild( canvas );
		this.canvas = canvas;
		this.domElement = canvas;
		await GPU.init( { canvas } );
		GPU.reuseAllocationBindings = this.renderOptimizations.bindingReuse;
		this.meshRenderer = new MeshRenderer();
		this.meshRenderer.syncPipelines = false; // compile in the background (App.precompile waits for them)
		this.camera = new PerspectiveCamera( 62, window.innerWidth / window.innerHeight, 0.06, 60000 );
		this.scene = new Scene();
		window.addEventListener( 'resize', () => this.resize() );
		this.resize();

	}

	setRenderScale( s ) {

		this.renderScale = s;
		this.resize();

	}

	// output (canvas) size in pixels
	get width() {

		return this.canvas.width;

	}

	get height() {

		return this.canvas.height;

	}

	resize() {

		const w = window.innerWidth, h = window.innerHeight;
		const dpr = this.renderScale;
		this.canvas.width = Math.max( 1, Math.floor( w * dpr ) );
		this.canvas.height = Math.max( 1, Math.floor( h * dpr ) );
		this.canvas.style.width = w + 'px';
		this.canvas.style.height = h + 'px';
		this.camera.aspect = w / h;
		this.camera.updateProjectionMatrix();
		FrameUniforms.fields.outputResolution.value.set( this.canvas.width, this.canvas.height );
		for ( const f of this.onResize ) f( w, h );

	}

	// the canvas texture of this frame (render target of the final post pass)
	currentTexture() {

		return GPU.context.getCurrentTexture();

	}

	start( update ) {
		this.stop();
		this._running = true;
		const generation = this._loopGeneration;
		const queue = GPU.queue, paced = this.renderOptimizations.framePacing;
		if ( ! this._flight || this._flight.queue !== queue ) this._flight = { queue, count: 0 };
		const flight = this._flight, stats = this.pacingStats;
		if ( paced ) this.clock.reset();
		const loop = ( t ) => {
			if ( ! this._running || generation !== this._loopGeneration ) return;
			stats.callbacks ++;
			if ( paced && flight.count >= 2 ) {
				stats.skipped ++;
			} else {
				this.clock.update( t );
				this.frameInterval = this.clock.getDelta();
				const dt = Math.min( .1, this.frameInterval );
				this.frame ++;
				update( dt, this.clock.getElapsed() );
				stats.submitted ++;
				if ( paced ) {
					flight.count ++; stats.inFlight = flight.count;
					stats.maxInFlight = Math.max( stats.maxInFlight, flight.count );
					// Never block the UI or encode a third frame while the GPU is behind.
					queue.onSubmittedWorkDone().then( () => {
						flight.count --; stats.completed ++;
						if ( flight === this._flight ) stats.inFlight = flight.count;
					}, error => {
						flight.count --;
						if ( flight !== this._flight ) return;
						stats.inFlight = flight.count; stats.error = String( error );
						this.stop(); console.error( 'Frame queue failed:', error );
					} );
				}
			}
			if ( this._running && generation === this._loopGeneration ) this._raf = requestAnimationFrame( loop );
		};
		this._raf = requestAnimationFrame( loop );
	}

	stop() {
		this._running = false;
		this._loopGeneration = ( this._loopGeneration || 0 ) + 1;
		cancelAnimationFrame( this._raf );
	}

}
