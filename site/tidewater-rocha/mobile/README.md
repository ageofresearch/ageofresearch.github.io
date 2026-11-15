# Mobile yacht zones

Release: `upper-interior-1`. The mobile route connects boarding, the aft terrace,
swim platform, main saloon, upper terrace, solarium and upper interior. All zone
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
The mobile extent ends at the forward partition plane x=18.63233; an on-screen notice
identifies the pending bridge continuation when approaching it. No fictitious wall
or bridge stair is added. Full-yacht bridge circulation remains available.

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
| Exterior | 24,583 | 1,631,708 |
| Main saloon interior | 24,831 | 1,651,480 |
| Upper terrace and interior | 23,879 | 1,611,924 |
| Solarium | 23,689 | 1,593,160 |

Every profile uses two batches and one render pass, below 25,000 triangles.
Resident indexed geometry totals 6,488,272 bytes, excluding render attachments,
CPU assets and earlier packages. The final binary is 7,014,508 bytes. Offline
compaction removes unused vertices without changing indexed attributes or triangles.
No new texture or pipeline is introduced. Resolution and MSAA settings are retained.
The `upper` profile covers the entire new passage, with no switch at the doorway.

The new package loads after the solarium. Candidate profiles upload and execute
before geometry and navigation are enabled together. Network, timeout, incomplete
assets or GPU preparation failures preserve the previous buffers and routes and
show a retry. Retrying pauses walking under the loader, clears input and resumes
only after preparation finishes. Disposal aborts outstanding loading and releases
resources. State is exposed as `upperInteriorLoadState`.

## Rebuild and verify

From the repository root:

```sh
npm ci --prefix scripts/yacht-geometry
node scripts/build-yacht-terrace.mjs
node scripts/build-yacht-saloon.mjs
node scripts/build-yacht-upper.mjs
node scripts/build-yacht-sun.mjs
node scripts/build-yacht-upper-interior.mjs
node --test tests/yacht-touch-look.test.mjs tests/yacht-terrace.test.mjs tests/yacht-stern-access.test.mjs tests/yacht-stair-surfaces.test.mjs tests/yacht-saloon.test.mjs tests/yacht-upper.test.mjs tests/yacht-readiness.test.mjs tests/yacht-sun.test.mjs tests/yacht-upper-interior.test.mjs
```

Browser checks capture matching full/mobile views, count actual GPU submissions,
exercise corrupted/network/GPU failures and paused retries, and verify full-yacht
handoff. Navigation checks cover stops, reversals and diagonal doorway passage at
12/40/60 Hz. Cold-context instrumentation records first/repeated traversal FPS,
P95, long frames, movement CPU time, model requests and GPU resource creation at
identical resolution and MSAA. The 25 ms frame goal is measured, not assumed from
triangle counts or guaranteed by software-renderer timings.
