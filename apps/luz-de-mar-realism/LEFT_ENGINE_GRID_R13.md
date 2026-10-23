# Left installed engine: R13 surface reconstruction

This is an opt-in visual candidate at `?room=machinery&engine=left-vr-grid-r13`.
The default room, right engine and nominal R03 mechanism are retained. The
original yacht's 629 published files are outside this change.

## What changed

The installed intake now has a separately authored stepped casing, ribs, split
flanges, cast supports and short connecting neck. Eight visible bank covers and
the long lower casing replace the corresponding nominal exterior surfaces.
The near accessory case has a removable cover, ridges, fasteners, service lines
and conduit. Nominal internals remain available through the existing cutaway.

The insulated elbow has individually traced diagonal fold paths, fitted seams
and straps seated on the deformed surface. Parallel-transport sweep frames
replace the previous near-vertical frame discontinuity that twisted tube rings.
Paint, polished steel, black insulation, satin straps and aluminized cloth use
separate authored PBR maps. Probe captures include camera-visible LED emitter
proxies; these do not contribute duplicate diffuse energy or runtime geometry.

## Fixed reference and tile ledger

The six original VR cube faces have 2048 × 2048 pixels. One estimated camera
station, source `[9.15, 0, 3.18]`, is used for every face and all eight rectilinear
views. Those views are rotations/crops of one observation, not extra depth data.

`tools/left-tile-evidence.json` records conservative visible regions and held-out
edge annotations. `tools/render-left-tiles.py` renders actual visible object IDs
at native cube resolution, retaining the surrounding room as an occluding holdout. `tools/review-left-tiles.py` creates a private ledger
and interactive comparator, using 64 px parent cells and 32 px detail cells.
Coverage is the union of reference regions and candidate surfaces, so missing
geometry and protrusions remain in the ledger. Background gaps within coarse
reference regions are explicitly possible.

Inventory coverage, geometric agreement and material approval are separate
states. Presence of an object or a successful contour fit never marks a cell
visually accepted. Failed/uncertain points remain reported. Cropped image edges
are excluded from silhouette extraction: the cube boundary is not a part edge.
Residual contour fitting uses only training controls, never held-out points.

The target is 4 px for unambiguous landmarks and a 6 px 95th percentile for clear
edges. Legacy 40.96 px anchor checks remain construction/fallback guards; they
do not establish the stricter R13 acceptance. The public candidate stays opt-in
while any strict visual acceptance criterion is unresolved.

## Authoring and limits

Open `left-engine-master.blend`. Hide `LVR installed | detail` and its walking
derivative; enable `EDITABLE | VR left installed` to edit individual components.
Per-object IDs, grid observations, materials and nominal provenance are included.
The packed Blender snapshot can be edited directly. Build scripts belong to the
`apps/luz-de-mar-realism` repository checkout and retain its authoring-input paths;
the archive does not redistribute the original nominal source ZIP or VR photos.
The authoring snapshot and optimized GLBs use physical metres. Position/shape
behind visible surfaces, wall thickness, material parameters and dimensions
remain inferred. The panorama does not prove the photographed vessel is Luz de
Mar or identify serial numbers.

The diagnostic pass also found silver fabric intersecting the black cuff. The
cuff now clears the underlying cover; densely sampled straps follow its actual
surface. Lightmap charts have at least 6 px separation. Diffuse irradiance is
baked at 4096² and reduced linearly to the published 2048² atlas; fine material
normals remain out of this low-frequency bake to avoid undersampled grain.
The intake weave retains a separate relief map and alpha coverage in MSAA.

Runtime textures are independently authored. Private VR photographs and the
private comparison page are excluded from the release archive and public site.
Public review captures contain rendered candidates and frozen R11/R12 output only.
Full diffuse direct/indirect lighting is baked once into 2048² HDR; local probes
provide specular response. Neutral tone mapping and exposure 0.05 are fixed for
Blender/browser comparisons. Geometry and receiver illumination swap atomically
with the nominal cutaway and restore on exit.

The private native-resolution material renders trace the bounding rectangle of
the union of reference annotations and candidate visibility, plus 32 px. Camera,
projection and output resolution remain unchanged. Unrelated pixels outside
that rectangle are unrendered, and this rectangle is never an acceptance mask.
All eight public comparison views are complete actual browser captures.

Validation reports distinguish software rendering correctness from hardware FPS.
The R11 performance reference is the existing same-environment measurement;
candidate timings are measured separately. No physical-GPU 60/30 FPS result is
claimed. The budgets remain 220k walking / 450k detail triangles, 128 MiB extra
estimated GPU resources, and 1M triangles / 120 draws for normal walking.
