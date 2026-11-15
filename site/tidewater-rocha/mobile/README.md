# Mobile yacht zones

Release: `bridge-helm-1`. The mobile route connects boarding, the aft terrace,
swim platform, main saloon, upper terrace, solarium, upper interior and bridge. All zone
packages, collision indices and GPU profiles finish preparation under the initial
loader. Mobile never downloads or constructs the full yacht, machinery, shadow
maps or postprocessing.

## Geometry and navigation

The offline builders extract the **final shared generator**, including raw source
parts without replacements. Source arrays are normalized before clipping. Furniture
that has been consumed by a later shared revision is not restored from old room tags.
The outdoor dining table and six chairs stay on the upper terrace; the old interior
table and ten chair proxies stay absent. UD_R02 is **Interior superior**, retaining
its service cabinet, glazing, partition, ceiling and fixtures. Its safe camera spawn
is [14.8,0,7.6], with walking elevation 6.00.

The central entrance keeps its existing glazing and jambs. Only the low frame segment
across the clear opening is removed above the floor: the existing z=6.00 slab owns
the flush threshold, with no second coplanar cap. This corrects the previous raised
track ending at z=6.037. Both versions use the same geometry. The shared physical
floor/obstacles replace stale furniture navigation masks inside the upper interior.
Vertical triangle projections retain a numerical thickness for collision indexing,
so tall glass/walls remain solid even when their top and bottom are outside body height.
The bridge is reached through the existing port passage around the forward
partition, retaining the partition and service furniture. UD_R03 is **Puente de
mando**, with safe camera spawn [20.5,0,7.6] and floor elevation 6.00. The console,
wheel/throttles, five static displays, helm chair, side settee and eight windshield
panels retain their shared positions. The forward deck, its furniture and the
existing internal stair are visible context; neither is walkable on mobile.
Their continuation notice does not invent a wall. Full-yacht bridge circulation
and its internal staircase remain available.

Extraction now honors the full renderer's existing `displayFits`, including the
service refrigerator and replacement furniture below the upper slab. Their rendered
top is 5.87; the old raw 6.10 refrigerator bounds caused a phantom bridge obstacle.
Normals and collision geometry use the same fit, once. The original model assets
and the display-fit definition are unchanged.

The upper interior reuses the upper floor already supplied as the MD saloon ceiling.
Only the missing strip beyond x=17.91 and the upper ceiling beyond x=14.25 are added.
The extraction retains real holes, the service cabinet, glass and head clearance.
The sun flight retains 13 intermediate treads and 14 rises (6.00 to 8.20); the aft
flight retains 11 intermediate treads and 12 rises (3.95 to 6.00). The starboard swim
access remains usable, and the port swim stair stays blocked under the gangway.
Full-yacht handoff preserves a supported interior position; invalid positions use
the room's safe spawn. Existing stair handoffs remain unchanged.

This is the provisional current model, not an as-built survey. The flush threshold
is a model circulation correction; no certified onboard dimensions are claimed.

## Rendering and loading

Four profiles remain resident after the final package succeeds:

| Profile | Submitted triangles | GPU geometry bytes |
| --- | ---: | ---: |
| Exterior | 24,731 | 1,819,280 |
| Main saloon interior | 24,849 | 1,826,260 |
| Upper terrace, interior and bridge | 24,941 | 1,864,024 |
| Solarium | 24,645 | 1,815,856 |

Every profile uses two batches and one render pass, below 25,000 triangles.
Resident indexed geometry totals 7,325,420 bytes. The final binary is
8,267,900 bytes. Supports, treads and glass retain their geometry; distant seams,
fasteners and enclosed bridge details are omitted in profiles where they cannot
be seen. Forward furniture remains in the upper and sun profiles.

Material UVs and lighting/color transfer are evaluated per vertex. Two prepared,
mipmapped textures retain the existing wood grain, canvas, static instrument graphics and teak board layout
(105 mm spacing in model coordinates, staggered ends and per-board variation).
They use less than 3.4 MB, generated before walking, with no texture downloads.
This extends the original grain-only texture proposal to teak after measurements
showed analytic per-pixel joints still exceeded the frame budget. Fine detail fades
with mip level. Floor triangles are split at the exact interior/exterior finish
planes after LOD, so simplifying a floor cannot move its material boundary.
Resolution and MSAA are unchanged. The `upper` profile spans the terrace, upper
interior and bridge, with no profile switch at either doorway.

The bridge package loads after the upper interior. Candidate profiles upload and
execute before geometry and navigation are enabled together. Network, timeout,
incomplete assets or GPU preparation failures preserve the previous buffers and
routes and show a retry. Retrying pauses walking under the loader, clears input
and resumes only after preparation. Disposal aborts loading and releases resources.
State is exposed as `bridgeLoadState`. Upper, sun and upper-interior packages also
carry the new version to invalidate their affected caches.

## Rebuild and verify

From the repository root:

```sh
npm ci --prefix scripts/yacht-geometry
node scripts/build-yacht-terrace.mjs
node scripts/build-yacht-saloon.mjs
node scripts/build-yacht-upper.mjs
node scripts/build-yacht-sun.mjs
node scripts/build-yacht-upper-interior.mjs
node scripts/build-yacht-bridge.mjs
node --test tests/yacht-touch-look.test.mjs tests/yacht-terrace.test.mjs tests/yacht-stern-access.test.mjs tests/yacht-stair-surfaces.test.mjs tests/yacht-saloon.test.mjs tests/yacht-upper.test.mjs tests/yacht-readiness.test.mjs tests/yacht-sun.test.mjs tests/yacht-upper-interior.test.mjs tests/yacht-bridge.test.mjs
```

Browser checks capture matching full/mobile views, count actual GPU submissions,
exercise corrupted/network/GPU failures and paused retries, and verify full-yacht
handoff. Navigation checks cover stops, reversals and diagonal doorway passage at
12/40/60 Hz. Cold-context instrumentation records first/repeated traversal FPS,
P95, long frames, movement CPU time, model requests and GPU resource creation at
identical resolution and MSAA. The 25 ms frame goal is measured, not assumed from
triangle counts or guaranteed by software-renderer timings.

Controlled software-renderer reference (run separately from builders):

```sh
NODE_PATH=/path/to/browser/node_modules node tests/yacht-bridge-performance.cjs
```

It uses three fresh 360×540 contexts, scale 1 and 4× MSAA, two fixed return views,
and requires median P95 ≤25 ms at each view. Physical phone performance still
requires measurement; these timings are a controlled regression gate.
