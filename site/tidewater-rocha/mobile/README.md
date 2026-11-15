# Mobile yacht zones

Release: `saloon-mobile-1`. The initial boarding/terrace/swim-platform scene stays
usable while the main saloon is prepared. No full-yacht model, machinery assets,
shadow map or postprocessing pass is loaded by this view.

## Geometry and navigation

`scripts/build-yacht-saloon.mjs` extracts MD_R02 from the final shared generator.
It retains the curved sofas, two coffee tables, forward table and four armchairs,
side joinery, carpets, glazing, deck and ceiling. Raw retained parts use the full
renderer’s finishes. Source dimensions and arrangement remain interpretations
of the supplied model, not certified onboard measurements or a newly verified
VRCloud survey.

The terrace owns geometry through x=8.5; the saloon continues from that seam to
the front partition at x=17.83. Navigation uses the original floor triangles
and body-height obstacles, independently of rendering detail. The shared sliding
door panels are projected triangle by triangle so their open doorway stays open.
The guided route ends at [10, 0.1]; manual walking reaches the forward lounge.
The existing starboard swim stair remains available and the port stair remains
blocked by the deployed gangway. Kitchen, suites and other decks are not added.

## Rendering and loading

Two precomputed profiles each contain one opaque and one glass batch. They draw
19,843 triangles outside and 20,465 inside, in one render pass. The initial scene
draws 24,566 triangles until the optional saloon succeeds. Both resident profiles
use 3,597,976 GPU buffer bytes, separate from attachments and the initial scene’s
CPU geometry. The binary download is 4,296,964 bytes before HTTP compression.

The interior profile activates beyond x=9.2; the exterior returns below x=8.0 or
on the swim platform. Parts touching x=6.8…10.2 share the same simplified geometry
in both profiles. The simplifier retains original vertices, material boundaries
and borders; swim treads and boarding support surfaces are unchanged. No scene
reconstruction, simplification or extra draw calls occur when switching profiles.

Both profiles upload before opening navigation into the saloon. Network, version,
geometry, GPU allocation and 45-second timeout failures keep the exterior usable
and expose a retry. Disposal aborts loading and releases profile buffers. Switching
to the full yacht preserves a safe main-deck position, with a saloon-entry fallback;
switching from the swim stair/platform still lands safely on the aft terrace.

## Rebuild and verify

From the repository root:

```sh
npm ci --prefix scripts/yacht-geometry
node scripts/build-yacht-terrace.mjs
node scripts/build-yacht-saloon.mjs
node --test tests/yacht-touch-look.test.mjs tests/yacht-terrace.test.mjs tests/yacht-stern-access.test.mjs tests/yacht-stair-surfaces.test.mjs tests/yacht-saloon.test.mjs
```

The mobile browser workflow captures the same saloon views in both renderers,
counts actual submitted triangles/draw calls/passes, verifies profile transitions,
failure/retry and full-yacht handoff, and measures the route at fixed resolutions
with and without MSAA. Software-renderer measurements are not phone measurements:
the 40 FPS target still needs validation on the user’s handset.
