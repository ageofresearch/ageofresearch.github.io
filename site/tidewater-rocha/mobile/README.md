# Mobile yacht zones

Release: `upper-terrace-1`. The boarding, aft terrace and swim platform are usable
immediately. The main saloon loads next, followed by the upper aft terrace. Mobile
never downloads or builds the complete yacht, machinery, shadow maps or postprocessing.

## Geometry and navigation

The offline builders extract the **final shared generator**, including its replacements
and additions, rather than restoring consumed source proxies. The upper terrace includes
the island daybed, coffee table, barbecue/wet bar, tensile shade, guardrails and six-chair
exterior dining assembly. The dining assembly is included by final placement even though
its old room tag is UD_R02. Source dimensions remain model interpretations, not certified
onboard measurements or a newly verified VRCloud survey.

The upper floor is the existing MD ceiling, with only its missing forward side strips
added. Upper-facing vertices receive teak, contact and shade lighting; underside lighting
is retained. There is no overlapping second slab. The visible solarium stair and adjoining
roof remain scenery; navigation stops before the upper enclosure at x=14.188.

The aft port stair uses 11 intermediate treads and 12 rises, from MD z=3.95 to UD z=6.
Support polygons and per-height body/head obstacles are extracted from the same final
parts used in the full yacht. The mutable shared flight registry adds this route without
nesting controllers. UD_R01 is “Terraza superior,” with safe spawn [8.35,2.21,7.6]; the
original spawn was inside the coffee table. Both landings, stopped positions, reversals
and diagonal movement use the same collision decision.

The MD saloon route remains available only on MD. The starboard swim stair still connects
to SP z=2.84, and the port swim descent remains blocked under the deployed gangway.
Switching to the complete yacht preserves a supported UD or aft-stair position; an invalid
upper pose falls back to the nearest-height safe landing. Existing swim handoff uses MD.

## Rendering and loading

The initial scene submits 24,566 triangles. The saloon alone retains its two previous
profiles. Once the upper terrace succeeds, three precomputed profiles replace them:

| Profile | Submitted triangles | GPU geometry bytes |
| --- | ---: | ---: |
| Exterior | 22,233 | 2,642,208 |
| Saloon interior | 22,917 | 2,650,416 |
| Upper terrace and entire aft stair | 23,125 | 2,652,912 |

Every profile uses two batches and one render pass, below the 25,000-triangle limit.
All three resident profile buffers total 7,945,536 bytes, excluding render attachments,
initial CPU geometry and decoded asset data. The upper binary is 8,896,896 bytes and its
navigation/metadata JSON is 3,371,001 bytes, before HTTP compression. Duplicate collision
polygons and runtime-unused obstacle labels are omitted without changing their coordinates.

The upper profile applies throughout the aft flight, even while the navigation deck is
still MD. Lower profile selection retains its x=8.0/9.2 hysteresis. All profiles use the
same aft stair geometry; tread/support silhouettes are not simplified. Other detail is
simplified offline using original vertices and locked material/component borders.

The upper loader starts only after the saloon is ready. Both batches of every profile
upload before the upper route and menu become available. Network, 45-second timeout,
version, geometry and GPU upload failures retain the existing scene and offer a retry.
Disposal aborts loading and frees GPU profiles. Load duration is exposed as `upperLoadMs`.

## Rebuild and verify

From the repository root:

```sh
npm ci --prefix scripts/yacht-geometry
node scripts/build-yacht-terrace.mjs
node scripts/build-yacht-saloon.mjs
node scripts/build-yacht-upper.mjs
node --test tests/yacht-touch-look.test.mjs tests/yacht-terrace.test.mjs tests/yacht-stern-access.test.mjs tests/yacht-stair-surfaces.test.mjs tests/yacht-saloon.test.mjs tests/yacht-upper.test.mjs
```

The browser workflow captures matching full/mobile saloon and upper views, counts actual
GPU submissions, tests failure/retry/GPU rollback and handoff from UD and a middle tread,
and measures matching resolutions with MSAA 1×/4×. Native navigation tests exercise every
tread at 12/40/60 Hz and verify furniture, head clearance, deck edges and closed routes.
Software-renderer results do not establish phone performance: 40 FPS still requires the
same-resolution/MSAA walk on the user's handset.
