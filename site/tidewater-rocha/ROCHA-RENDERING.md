# Rocha rendering update (`rocha-render-1`)

This update removes repeated or unused work while keeping the selected resolution and six diagnostic quality levels. It retains the survey, source layout, water bodies, plant content, architecture, lighting settings, and original island. GPU and moving-image validation is tracked separately in [VALIDATION.md](../results/render-optimization/VALIDATION.md); this document describes the implementation and how to reproduce checks, with measured outcomes and their limits recorded in that report.

## Implemented work reductions

| Area | Change | Preservation condition |
|---|---|---|
| Surveyed land shading | Specialize branches whose inputs are constant in Rocha | Source elevations and zero-valued terrain channels are guarded before specialization; surveyed vertices and triangles are retained |
| Water-boundary lookup | Conservative candidate masks on terrain batches and a spatial candidate grid | The original polygon predicate still decides membership; candidate masks may include extra bodies but must never omit an intersecting body |
| Refraction | Reject irrelevant fragments before expensive material work; skip the full pass and half-depth conversion when no water fragment can consume them | Uses the actual camera medium, the original near-surface/front-face rule, and all relevant flat water elevations; full opaque depth remains for AO, and opaque color remains for the underwater branch |
| Caustics | Skip generation when the underwater shaft consumer cannot run | Follow the same camera-water-height and lens margin predicate; generate again on entry |
| Rocha wave FFT | Run logical cascades 2 and 3 with complete original row calculations, derivative-only column outputs and mip chains | Preserve cascade identities, spectra, timing and derivative mip formats. Full row expressions/writes are retained because removing unused row fields changed GPU rounding. The original island keeps its complete ocean |
| Estimated lake beds | Collapse safe flat interiors and deduplicate exact attributes | Keep sloped triangles, normals, perimeters and float32 raster coverage; leave uncertain cases unchanged |
| Parcel lines | Remove triangles with exactly duplicated vertex attributes | Preserve every unique triangle and all 776 plot records |
| Scene batches | Partition eligible opaque scenery into conservative spatial chunks; share original attribute/index allocations; retain 20 survey water-candidate batches by default | Preserve triangles, materials, transforms and collision data; cloth/nets and unrelated transparency retain their behavior; fine survey subdivision is opt-in |
| Static shadows | Cache explicitly static casters under the full cascade transform and draw/material/geometry state | Compare matrix values after Float32 conversion, matching the actual GPU uniforms; retain draw membership in the key. Moving vegetation remains dynamic at the original update cadence; inspection changes invalidate caches; inactive light sampling does not require shadow updates |
| Scene targets | Store velocity in `rg16float` and the water mask in `rg8unorm` | Consumed channels retain their original precision and source-alpha blend factors; scene color remains `rgba16float` |
| Temporal depth | Rotate the current/previous `depth32float` allocations instead of copying | Wrapper references stay stable; resize, mode switches and the last resolved temporal frame retain correct ownership |
| Native temporal AA experiment | Opt into shared 10×10 neighborhoods for 8×8 output tiles with `tiledTAA`; the original fragment resolve is the default | Keep all original nine resolve samples, float32 preparation and history formats; scaled output, debug views and unsupported jitter use the original fragment resolve |

A separate main-camera visibility depth prepass is available for experiments, but remains off by default. It preserves main-camera vertex/coverage semantics, rather than reusing shadow coverage. It can cost more than it saves and needs independent measurement.

Tiled AA has the same mathematical UV coordinates as the fullscreen triangle. Hardware varying interpolation and compute arithmetic can round differently, and compilers can make different floating-point choices. Small image differences require investigation in still and moving captures. A matched water-on pair on the local adapter measured lower completed-frame times with the original fragment resolve, so tiled AA remains an opt-in experiment. That pair is recorded under `candidate-final` (tiled) and `candidate-fragment` (fragment); these are intermediate builds, not the final acceptance suite. The checked settings, input hashes and signed comparison are saved in [taa-default-selection.json](../results/render-optimization/taa-default-selection.json). This update does not use reduced sample counts or half-precision workgroup arithmetic to obtain the tiled result.

## Internal A/B switches

These are URL parameters for diagnostic use. They do not change the public quality sliders. Reload a fresh game after changing them.

| Parameter | Effect |
|---|---|
| `renderReference` | Restore prior Rocha render paths and original post target/depth/AA paths where switches exist |
| `noTerrainSpecialization` | Keep general terrain material calculations |
| `noWaterGrid` | Keep full water-body lookup |
| `noDerivativeFFT` | Keep full ocean output generation for Rocha |
| `noFlatBeds` | Keep the original estimated-bed triangulation |
| `noEarlyRefraction` | Disable early refraction fragment rejection |
| `noWaterWorkGates` | Keep reference refraction/caustic scheduling |
| `noSceneChunks` | Disable additional spatial subdivision; conservative water-candidate buckets remain |
| `surveyChunks` | Opt into fine survey subdivision; otherwise the 1,778 survey triangles use 20 water-candidate batches; `noSceneChunks` disables this experiment |
| `noSpatialSort` | Disable the bounds-based ordering of opted-in chunks |
| `noStaticShadowCache` | Render the full scheduled shadow contribution |
| `compactSceneTargets` | Opt into compact targets on the original island (already enabled by default on Rocha) |
| `depthRotation` | Opt into allocation rotation on the original island (already enabled by default on Rocha) |
| `noCompactSceneTargets` | Restore the earlier four-channel velocity/mask formats |
| `noDepthRotation` | Restore the temporal depth copy |
| `tiledTAA` | Opt into the experimental shared-tile temporal resolve where supported |
| `noTiledTAA` | Force the default fragment temporal resolve, overriding `tiledTAA` |
| `visibilityDepth` | Opt into the experimental main-camera depth prepass; `renderReference` disables it |

`renderReference` is an implementation fallback within the new build. Shared resource-ownership and benchmark fixes remain installed. Use the backed-up production build for an immutable before/after baseline. `fusedOcean` / original-ocean selection is independent and must match both runs. Rocha defaults to compact targets and temporal depth rotation. The original island retains its original four-channel formats and depth copy: compact targets regressed its measured underwater path. Explicit `compactSceneTargets` and `depthRotation` opt into those experiments on the island; the corresponding `no…` flags and `renderReference` take precedence. Both maps have independent visual and runtime checks.

## Three different performance measurements

1. **Instrumented GPU/CPU timings:** 120 warm-up frames and 300 measured frames for entrance, lake glitter and underwater, with fixed simulation timestep `1/60`. The benchmark timestamps individual passes and resolves/maps query buffers. GPU mean/P95 and CPU encoding time describe this instrumented run. Timestamp capture can alter scheduling and wall time; its reciprocal is not measured displayed FPS.
2. **Timestamp-free completed throughput:** the same three views, warm-up, frame count, timestep and shader-clock reset, with both benchmark and optional profiler timestamps suspended. At most two frames are outstanding. The elapsed interval includes completion of the final submitted work. `millisecondsPerCompletedFrame` and `completedFramesPerSecond` describe this bounded throughput, not presentation or scanout.
3. **Live callback cadence:** 120 warm-up callbacks followed by 10 seconds at lake glitter, fixed simulation timestep `1/60`, and no per-frame GPU wait or timestamp readback. The report shows actual callback intervals/rate and CPU encoding cost. `queueDrainMs` records the subsequent GPU drain separately; a fast callback rate can coexist with queued GPU work. Cadence is not displayed FPS.

Each review phase starts a new seeded game and destroys its device before the next phase. Reports include actual map/source/settings, quality levels, water state, ocean mode, adapter, renderer version and per-view draw/resource counters. Negative savings remain negative. If timestamp queries are unavailable, the GPU phase is explicitly unavailable while throughput and cadence can run. Hidden tabs, load failures and device errors abort the affected suite.

The immutable baseline lacks the new `Bench.resetTime()` API. The helper uses its existing `shots([])` clock reset with no rendered frames, readbacks or uploads, preserving the requested dimensions. Both variants start the shader clock at 1000 for each timed view. Independent simulation clocks still rely on fresh games and identical camera order.

## Local reference/candidate validation servers

From the launcher root, keep each command in its own terminal. The review servers bind only to `127.0.0.1` and write local results; they are separate from the normal game server on port 5195.

```sh
# Immutable production build captured before this update, with current review tools overlaid.
node tools/render-review-server.mjs app/.rocha-render-backup/dist 5196
```

```sh
# Current production build. Rebuild this before capturing a new candidate revision.
node tools/render-review-server.mjs app/dist 5197
```

Open `http://127.0.0.1:5196/test/render-review.html?bench` for the reference and `http://127.0.0.1:5197/test/render-review.html?bench` for the candidate. Run only one game/device at a time, keep the measuring tab visible, and keep browser, adapter, power state and dimensions fixed. Use 1920×1080, Rocha, empty launch options, and labels `reference-final` / `candidate-validated`. Both default to the optimized ocean; select the same alternative explicitly if needed.

**Run matched suite** runs `shots,moving,gpu,throughput,cadence,audit` sequentially with both water modes by default. The action mask can select a subset, but the report combiner compares only phases present in both suite manifests. In particular, it never substitutes an older GPU report because its filename looks similar. A failed or stopped suite records failure and cleans up its device. Stop remains available during a run.

**Measure optimization variants** runs fresh timestamp-free throughput games for each comma-separated internal flag and each selected water mode. The default list is `tiledTAA,noDepthRotation,noStaticShadowCache,visibilityDepth,surveyChunks`. It saves distinct flag-labeled reports and a variants manifest, allowing the tiled resolve, depth rotation, static shadow cache, optional prepass and fine survey subdivision to be assessed independently. This is a diagnostic comparison, not automatic selection of a faster preset; compare actual settings and signed results before choosing a path.

Still captures warm each camera for 120 frames with `dt=0`. Moving captures warm for 120 frames, then save eight frames per view, 15 simulation frames apart: a 1 m/s sideways camera translation, 0.16 rad/s yaw and a small deterministic pitch change. Histories are reset before warm-up and retained during movement; JSON records the actual camera poses. Review-only lens seed 42 removes differences caused by resource allocation consuming the global random sequence. Production lens behavior remains unchanged, and reports identify this review override.

Artifacts are written under `results/render-optimization/`: raw BGRA captures, shot metadata, GPU/throughput/cadence JSON, mode audits and a suite manifest. A screenshot upload error is a failed capture, not a success. Later runs using the same label overwrite those filenames; use a new label for a distinct revision or repetition.

Combine matching completed suites:

```sh
node tools/summarize-render-reviews.mjs \
  --reference reference-final --candidate candidate-validated --world rocha \
  --output results/render-optimization/reference-final-vs-candidate-validated-rocha.json
```

The tool writes JSON and Markdown, hashes its input files, and checks the world/source, output size, water/quality/AA/ocean settings, browser/adapter, review seed and protocol. Mismatches fail. Missing pairs remain pending; unavailable timestamps remain unavailable. It preserves GPU/CPU mean/P95, signed millisecond savings, completed throughput and callback cadence separately. The summary does not certify visual equivalence.

If a review is interrupted after some phases finish, retain its failed manifest. Run the unfinished phases with a new label, then use `tools/compose-render-review.mjs` to assemble completed phases with explicit source hashes and recovery provenance. It requires a completed recovery suite, matching renderer/protocol metadata, every declared artifact, and an unchanged candidate build hash manifest. Failed phases cannot become successful. The recorded local run uses `candidate-validated` plus the water-off audit retry `candidate-resume`, composed as `candidate-reviewed`; the original interrupted manifest remains failed.

```sh
node tools/compose-render-review.mjs --label candidate-reviewed --world rocha \
  --source candidate-validated --source candidate-resume \
  --build results/render-optimization/candidate-validated-build.json
```

Cadence can substantially outrun GPU completion. The local candidate's 10-second callback tests required another 13.354 seconds (water On) and 11.133 seconds (water Off) to drain queued work. Those callback rates must not be described as rendered FPS; use the bounded completed-throughput results for the measured work rate. Presentation, interaction latency and sustained gameplay remain separate validation topics.

`tools/compare-render-images.py` decodes full-resolution BGRA captures and creates difference images. It requires Python with NumPy and Pillow **only for development image analysis**; installing and playing still require no Python. The tool compares matching filenames and skips missing pairs, so verify the suite/capture manifest also contains every requested view and motion frame before treating an image set as complete.

## Backup and tests

The existing installation is preserved under `app/.rocha-render-backup/`, including source, production output, launcher package and its manifest. Earlier backups remain. Guarded installer replacements are generated from the verified original source and the current installation; do not bypass compatibility guards to apply them to another upstream revision.

```sh
npm test
npm --prefix optimization-kit test
npm run build
```

Review the actual logs in `results/render-optimization/`. Offline tests cover state/resource ownership, original sample equations, conservative bounds, geometry invariants, shadow invalidation, sequential cleanup and report arithmetic. Vite compilation alone does not compile WGSL or establish GPU correctness. Repeated matched runs, moving views, restoration, original-island regression checks and device-specific GPU validation remain the acceptance evidence.

## Finite HDR and cloud checks

**Check finite GPU output** reads scene/beauty HDR, cloud and haze float targets through a compute `textureLoad` and counts NaN/Inf exponent patterns. It checks every atmosphere level with water Off/On and restores prior settings. Run both default and `originalOcean&oldClouds` configurations; screenshots alone do not prove finite intermediate calculations. Errors or hidden tabs abort without a success report, and readback buffers are released.

## Main entrance layout correction

`main-entrance-1` adds source-defined paving/access geometry and corrects Rocha's
canopy attribute binding. It changes visible content, so its timing comparison
intentionally allows a layout-version difference while requiring identical camera
poses, Full quality, 1920 × 1080 output, scale 1 and timestep 1/60. Historical
benchmark cameras remain fixed even though live spawn moves to the true entrance.
The reports separate GPU time, CPU encoding time and measured callback cadence;
see `results/rocha-main-entrance/VALIDATION.md`. Earlier renderer/layout backups
remain intact. The commercial forecourt's mapped landscaped gap stays unpaved.

## Renderer v2 (2026-10-03)

Rocha now uses `rocha-render-2` with three default quality-preserving changes and one grass experiment:

- A 2 m integer water-classification grid certifies cells away from boundaries. A conservative 2 m edge halo, packed bounding-box edges and f32 row-bin corrections retain the original edge-parity fallback in uncertain cells. The grid occupies 446,143 bytes. Polygon geometry and CPU water/terrain queries are unchanged.
- Opt-in `grassRejection`: absent grass blades return at their collapsed terrain position before meadow, noise and wind work. Visible blades retain all original calculations, counts, distance thresholds and animation.
- Depth texture views rotate with their physical allocations. Binding groups use actual allocations, retaining two ping-pong combinations instead of rebuilding them every frame. Resize and device changes invalidate reuse.
- Normal Rocha play queues at most two frames. This reduces stale GPU backlog; it is not evidence of a GPU speed increase. The FPS display uses the actual frame interval rather than a simulation interval capped at 100 ms.

Full resolution, render scale, diagnostic quality levels, water, ocean selection, shadows and effect settings retain their defaults. The original island does not enable the new water, grass, binding-reuse or pacing optimizations.

`?world=rocha&noRenderV2` reproduces the preceding renderer's implementation paths while retaining all earlier optimizations. Grass rejection is off by default because render-pass tests showed no convincing gain. Enable `grassRejection` to test it; `noGrassRejection` overrides it. Independent controls are `noWaterClassification`, `noGrassRejection`, `noBindingReuse` and `noFramePacing`; metadata records their actual states. `renderReference` remains the older, broader reference and is **not** the v2 baseline.

The launcher’s **Compare renderer speed** page runs fresh games, alternating five baseline/candidate pairs at 1920 × 1080, Full, scale 1 and timestep 1/60. Entrance, roundabout and lake use 120 warm-up / 300 measured frames. A separate 10-second callback-cadence test reports its queue drain. GPU timestamps, completed-work throughput and callback cadence remain separate; GPU time is never presented as measured FPS. The combined report downloads locally.

Native WebGPU tests on this installation returned identical water-query output bits across 319,800 positions in six shader variants. A 1280 × 720 grass rendering fixture returned identical pixels. Some grass vertex positions differ by at most 0.00000763 m from compiler float rounding; normals and visible varyings matched bitwise. Isolated compute timings measured approximately 22% less water-query time. An initial grass compute trial suggested a 7% improvement, but the final trial measured a 1.60% regression. The 280,962-triangle grass rendering fixture measured 1.831 ms before and 1.852 ms with the experiment (−1.19% improvement), so that experiment is not enabled by default. These are **not whole-game FPS gains**. Browser-controlled gameplay measurement remains unavailable, and the extra 10 FPS target is unverified. Full-game motion, atmospheric variants and visual restoration still require browser validation.

Evidence is in `results/render-optimization-v2/`. The immutable previous source, production build and installer package are preserved in `app/.rocha-render-2-backup/`. Shader verification can use a separately installed compatible native `webgpu` runtime through `WEBGPU_TEST_RUNTIME`; this does not change the game’s dependencies or browser settings.

## Compacted aggregate material (rocha-zahorra-1)

Rocha roads and parking now share the grey-beige zahorra palette `#A9A391`,
roughness 0.96, static fine grain and at most 1 mm of apparent shading relief.
Road topology, survey heights, paving lifts, collision and masks stay immutable.
The original island, sidewalks, curb stone, stall lines and timber crossing keep
their materials. This is a deliberate appearance change, independent of renderer
v2's quality-preserving implementation changes.

The original 512 × 512 RGBA8 terrain detail texture is shared by both shading
paths. Terrain paths reuse their already-computed `dF` sample; overlays use one
4× anisotropic, mip-filtered lookup, replacing the roundabout's two 8× weathering
lookups. Entrance/parking previously had a flat colour, so adding grain there
adds a lookup even though no GPU texture is allocated. Shared material instances
reuse the existing spatial batches. There are no new draws, vertices, bake jobs,
normal maps, dynamic noise, displacement or postprocessing passes.

Lifted opaque roads populate depth before terrain (`renderOrder = -1`). The
normal construction uses the horizontal two-coordinate differential frame and
the engine's existing final normalization. Both avoid redundant shading work;
native checks require identical HDR pixels when only the draw order changes.
This ordering is not presented as a measured whole-game speedup.

Reports include `roadSurface` and `roadMaterialVersion`. Water, quality and
renderer comparisons reject mismatched road revisions. `noRenderV2` and
`renderReference` retain zahorra: neither is a reference for the old road finish.
For material before/after inspection use the immutable production/source backup
in `app/.rocha-zahorra-backup`, keeping identical camera and graphics settings.
Any material comparison must explicitly allow only this material-version change.

`tools/validate-rocha-zahorra-gpu.mjs` exercises the actual terrain shader,
survey/paving geometry, shared texture and native render pipeline at 1920 × 1080,
with 120 warm-up and 300 measured paired frames. Its isolated pass timings and
partial scene previews are not whole-game FPS or browser callback cadence.
Initial slower experiments are preserved. See `results/rocha-zahorra/VALIDATION.md`
for final measured costs, shader/resource checks and browser validation limits.
