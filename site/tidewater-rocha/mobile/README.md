# Mobile yacht zones

Release: `bow-deck-1`. The mobile route connects boarding, the aft terrace,
swim platform, main saloon, upper terrace, solarium, upper interior, bridge and forward lounge. All zone
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
panels retain their shared positions. The narrow bow tip and the existing internal stair remain visible context and
are not walkable on mobile. Their continuation notices do not invent walls. Full-yacht bridge circulation
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

## Forward lounge and starboard access

UD_R04 is **Estar de proa**, with camera spawn [26.8,0,7.6], deck height 6.00.
Its convex navigation domains connect the existing terrace through starboard to
both sides of the sunpad, stopping at x=29.40 minus the 0.14 body radius. The bow
clearance index also applies to overlapping older floor regions, so old terrace
support cannot bypass a new guard. Body height remains 1.65. Location and
full-yacht handoff use these exterior domains instead of the bridge's x cutoff.

Only the missing starboard slab strips are added: x=14.25..17.91 outside y=-3.13,
and x=17.91..18.72 outside y=-2.55. The bridge package already owns the floor
beyond x=18.72. Teak and exterior lighting meet on the existing floor plane.
The new shared guards start at the exact aft terrace rail endpoint, follow the
actual slab, and protect the lounge's port edge from x=23.73. Continuous white
coaming, clear glass and a cap at z=7.02 use supported posts spaced at most 1.25.
The three sunpad source envelopes retain their dimensions and position, with
rounded upholstery; the four existing sofa modules stay in place.

The tip's four chairs and unresolved bordered feature stay unchanged and outside
the mobile route. Two of those chairs have incomplete slab support; their layout
is explicitly pending. The port connection beside the sun flight also stays
pending. No pool, new stair, opening through the bridge glass or artificial wall
has been introduced. Guard dimensions and upholstery are inferred model fits,
not certified vessel measurements.

`bow` activates only inside the exterior domains after x>13.8 and stays active
until x<12.8. Interior/bridge views use `upper`; stairs retain their priority.
The preparation loader executes all five profiles before enabling movement.
Failures preserve the four-profile bridge route; paused retries restore the
previous buffers and navigation on GPU failure, and register one destination
on success. Disposal releases failed candidates and superseded buffers.

## Rendering and loading

Five profiles remain resident after the final package succeeds:

| Profile | Submitted triangles | GPU geometry bytes |
| --- | ---: | ---: |
| Exterior | 24,755 | 1,818,892 |
| Main saloon interior | 24,399 | 1,795,744 |
| Upper terrace, interior and bridge | 24,739 | 1,842,412 |
| Solarium | 24,225 | 1,767,604 |
| Starboard passage and forward lounge | 22,693 | 1,686,716 |

Every profile uses two batches and one render pass, below 25,000 triangles.
Resident indexed geometry totals 8,911,368 bytes; the final binary is 9,893,496
bytes. The fifth profile adds 1,585,948 resident bytes over `bridge-helm-1`.
Supports, treads, glass and physical boundaries are retained. The audit records
why each omitted detail is absent: occluded MD furniture in `bow`, the SD tap
when viewed from lower decks, reverse-facing transom lettering, distant finish detail, or distant
new guard posts. Continuous coaming, glass and rail remain in every profile.
The exterior profile retains the transom lettering and emblem.

The `upper` opaque indices are ordered offline in half-unit depth buckets around
the upper interior. Nearby cover reaches the depth buffer before hidden patterned
decks, reducing overdraw in return views. Every original triangle and winding is
retained; glass order, geometry bytes, materials, resolution and MSAA are unchanged.
The same ordering is used in the sun, upper-interior and bridge fallback packages.

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

The bridge package loads after the upper interior; the bow package follows the bridge. Candidate profiles upload and
execute before geometry and navigation are enabled together. Network, timeout,
incomplete assets or GPU preparation failures preserve the previous buffers and
routes and show a retry. Retrying pauses walking under the loader, clears input
and resumes only after preparation. Disposal aborts loading and releases resources.
State is exposed as `bridgeLoadState` and `bowLoadState`. Upper, sun and upper-interior packages also
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
node scripts/build-yacht-bow.mjs
node --test tests/yacht-touch-look.test.mjs tests/yacht-terrace.test.mjs tests/yacht-stern-access.test.mjs tests/yacht-stair-surfaces.test.mjs tests/yacht-saloon.test.mjs tests/yacht-upper.test.mjs tests/yacht-readiness.test.mjs tests/yacht-sun.test.mjs tests/yacht-upper-interior.test.mjs tests/yacht-bridge.test.mjs tests/yacht-bow.test.mjs
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
NODE_PATH=/path/to/browser/node_modules node tests/yacht-bow-performance.cjs
```

It uses three fresh 360×540 contexts, scale 1 and 4× MSAA, two fixed return views,
and requires median P95 ≤25 ms at each view. Physical phone performance still
requires measurement; these timings are a controlled regression gate.

CI additionally compares the old upper return views against an immutable checkout
of the PR base on the same runner, at the same resolution and MSAA. It rejects a
mean-frame regression above 5%, or a P95 above both 25 ms and 105% of the base.
The report includes both versions' absolute timings; a slow baseline is not
reported as meeting 25 ms. The standalone controlled return-view gate remains
unchanged, and the new bow route must meet its absolute 25 ms CI gate as well.

The bow benchmark holds its package to verify initial-loader blocking, then uses
three fresh contexts to walk out/back twice, including both sunpad sides. It
records FPS, P95, >25/50 ms frames, movement/CPU timing, resident memory, model
requests and GPU creation. Median P95 per leg must be <=25 ms; resource creation
and geometry requests during all four walking legs must be zero.

Local controlled `bow-deck-1` run: all 12 first/repeated legs across three fresh
contexts measured 59.79–60.00 FPS and P95 16.8–16.9 ms, at 360×540, scale 1,
4× MSAA. No geometry requests or GPU object creation occurred while walking.
Individual long frames remain recorded in the JSON reports; the measured result
is a regression reference, not a promise that every frame takes less than 25 ms.
