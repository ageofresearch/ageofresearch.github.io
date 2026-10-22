# Luz de Mar — salón principal

Independent Three.js 0.180.0 / WebGL2 viewer at `/luz-de-mar-realism/`.
The existing yacht at `/tidewater-rocha/` is an immutable publication baseline.

## Scope and reference

This release covers **MD_R02, main saloon and its dining area only**. The user
selected the VRCLOUD Azimut Grande 36M tour as the primary guide for layout and
detail, replacing the earlier instruction to retain the simplified furniture.
Reference: https://vrcloud.com/?pv=1667308298 — Salon and Dining Area viewpoints.
The tour identifies the yacht type; it does not prove the identity of Luz de Mar.

The room envelope and source axes come from the existing yacht. Furniture,
lining, lighting fixtures and material character follow the observed reference.
All replacement dimensions, hidden supports and exact mounting positions remain
image estimates. The reference photographs are not redistributed as textures.
A 28-group visual inventory records observed details and the earlier mismatches.

## Reproduce

Node 22+, Python with numpy/Pillow, Blender 4.3.2, Basis Universal 2.50 CLI,
and Intel Open Image Denoise 2.5.1 CLI (CPU RTLightmap filter) are used.

1. `npm ci --cache /tmp/luz-realism-npm-cache`
2. `node tools/export-yacht.mjs --source /path/to/tidewater-rocha`
3. `python tools/fetch-material-sources.py`, then `python tools/material-textures.py`
   and `python tools/saloon-textures.py`
4. `python tools/saloon-navigation.py`
5. `blender -b -Y --python-exit-code 1 --python tools/marine-environment.py`,
   then `blender -b -Y --python-exit-code 1 --python tools/rebuild-saloon.py`
6. `blender -b work/saloon-master.blend -Y --python-exit-code 1 --python tools/finish-native.py -- --room saloon --skip-preview`
7. `OIDN=/path/to/oidnDenoise blender -b -Y --python-exit-code 1 --python tools/denoise-lightmaps.py`
8. `BASISU=/path/to/basisu node tools/prepare-assets.mjs`
9. `blender -b work/saloon-master.blend -Y --python-exit-code 1 --python tools/finalize-authoring.py`
10. `npm test`, `npm run build`, then `node test/browser.cjs URL OUTPUT_DIR`.

The native scene, source snapshot and reference inventory are in the authoring
download. Original 96-sample HDR bakes are in a separate raw-bake ZIP. The
material-source manifest records CC0 download URLs and hashes; the scripts need
those originals in `work/material-sources/` to regenerate the texture maps. The native scene keeps editable individual objects in
`EDITABLE | reference-authored components`; the optimized Web meshes are separate.
The current source authoring snapshot is kept for provenance, not overwritten.

## Rendering

Two 2048² half-float EXR ambient HDR atlases (architecture/furniture), three spatially blended
local box-projected reflection probes, separate runtime sun, physically scaled color/normal/roughness
maps, opaque tint glazing (no scene-wide refraction pass). Static shadow maps are
cached. Frames are requested only while walking, dragging, loading or resizing.
Motion starts at a 1.5 MP budget and adapts; after 150 ms idle the resting DPR is
restored, capped at 2. Software checks establish correctness, not hardware FPS.

The side walkway and guardrail silhouettes visible through the glazing are
independently drawn, image-estimated occluders outside the navigation envelope.
The viewer uses a local probe and the live sun for these pieces. Atlas/source
geometry SHA-256 bindings reject reuse of a bake from another UV layout.

## Revision 7 visual scope

The tour and its main-deck plan support one opposing pair of display niches,
the aft port cabinet, the full-height starboard veneer panel, a transverse
ten-seat dining table and a ceiling-mounted luminous oval. Earlier mirrored
niches, the starboard lamp cabinet, longitudinal table and suspended-ring
interpretation have been replaced. Furniture placement and dimensions remain
estimates within the inherited envelope.

Long subpixel tube meshes for board and ceiling joints produced visible depth
artifacts through foreground furniture in diagnostic browser ID passes. Floor
joints now use physical-scale texture maps; ceiling joints use derivative-filtered
material lines. Cushion panels, sewn edges, corner folds, chair volumes and the
annular ceiling coffer are authored geometry.

This is a work-in-progress realism pilot. Functional tests are separate from
visual acceptance. The public review records the remaining differences; it does
not claim photographic parity with the modern-bedroom demonstration.

For an authoring download, open `Blender/Saloon-MD_R02.blend` directly; all used
image textures are packed. To regenerate the Web assets, clone this app source
and copy the archive’s `work/` directory into the app. The `work/snapshot/` inputs
already contain the preserved saloon export, so step 2 is needed only when
capturing a new source-yacht revision. The legacy UV repair/orientation scripts
apply only to revision 2; the current builder creates UV0 and UV1 correctly.

The exterior is an offline Blender panorama using the CC0 Fish Hoek Beach HDRI
for its sky/coast and a physically shaded water plane over its near beach. Native
illumination uses linear HDR. A display-referred JPEG uses the same Neutral tone
curve as the viewer. This scenery is illustrative, not the reference anchorage.
Atlas packing adapts its margin and rejects coverage below 25% or degenerate
charts. Per-atlas margins are recorded in authoring.json. OIDN filters the complete HDR atlases. Original unfiltered irradiance remains in
the raw-bake archive. The viewer uses full-precision EXR lightmaps with linear filtering; compressed
material maps remain KTX2. The two RGBA16F atlas uploads use 64 MiB of GPU storage.
