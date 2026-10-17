# Cuarto de máquinas · detailed owner-reference review

The production model was frozen before the comparison phase. `pre-comparison-hashes.json` records SHA-256 values for 314 production files; `comparison-complete.json` verifies that all were unchanged when the review gate completed.

## What “1,152 comparisons” means

96 separately named reference/model crops were each assessed on 12 distinct criteria: body lightness, chroma, hue, dark-gap extent, highlight extent, shading range, edge density, edge orientation, corner density, projected edge curvature, texture scale and texture directionality. All 1,152 finite measurements have unique IDs and source-image rectangles in `comparisons.csv` / `comparisons.json`.

Every paired crop was also visually reviewed. The observations and proposed changes were recorded in `regions.json` before production edits. The review covers all 17 owner photographs and 32 selected frames from both supplied machinery videos. Original owner pixels, not generated images, form the reference crops. Isolated model views are explicitly labelled where another machine would otherwise obscure the fitting.

This is 96 visual regions × 12 image diagnostics, not 1,152 independent physical objects, surveyed measurements or a recovered material calibration. Different views, exposure, perspective and occlusion limit direct pixel comparisons; the metrics are not an overall accuracy percentage. Missing old hardware is compared against its parent face. Neutral-surface hue is weak evidence.

## Changes guided by the review

- Engines: genuinely rounded 3D castings, bank gaskets and seated hex fasteners, bordered identification plates, scalloped filler-cap grips, moulded connectors, loom collars, woven air-cleaner screens and rolled rims.
- Exhaust: smoother swept black covers, fabric seam, irregular quilted silver jacket geometry, bound welt and closure lacing; separate blue silicone sleeve, four stainless clamp bands and screw housings.
- Generators: rolled enclosure corners, inset door seams, recessed pulls, controller bezel/LCD and small satin identification plates.
- CLIMMA: formed metal edges and lower returns, cover breaks, bordered blue plates, small screws, lens bezels, correctly ordered green/red lamps, yellow index fields and distinct hose collars/fabric seams.
- Watermaker: ticked pressure dials with pointer and rolled bezel, flow-meter scale/float, separate control rings, digital salinometer/keypad, rounded filter bowls with bell-shaped metal heads, valve lever and oval blue-bordered badge.
- ASEA: white cabinet rolls, membrane-key hierarchy, recessed LCD, circular isolator mount, hinges and pale bordered warning plates in place of solid red bars.
- Fuel/pumps: selector pivots and labels, clamp straps, stepped bronze unions, motor cooling fins and fan rims, terminal box, formed manual-pump cover, instruction field and pump saddle feet.
- Charging: folded Skylla hoods and face lips, seated screws, three status columns, rocker bezels, terminal glands, protective earth returns, ribbed isolators, exposed lug washers and moulded Phoenix face/status fields.
- Safety: forest-green panel, two alarm/fault rows, metal lamp rings, PLC keys, lock rings, printed intercom perimeter, screws, rounded sounder and padded oval hearing protection with a connected hanging lead.
- Architecture/stowage: filtered staggered acoustic perforations, alternating five-bar checkerplate relief, countersunk panel rims, cabinet hinges, clipped purple conduit, grille surrounds, moulded case ribs/lips/catches and satin door maker plates. The service porthole reuses the existing glass batch; every moving fitting follows the same guarded door swing.

## Fidelity limits

The evidence establishes visible forms, finishes and relative arrangements. Local corner radii, hidden fixings, component depths and unseen pipe routes remain fitted estimates. Small rating fields use restrained rules and verified type names; unreadable serial/compliance text is not fabricated. Controls remain visual representations.

Fine surface detail uses filtered procedural patterns, not owner photographs baked onto geometry. The scene retains its existing sun, water, reflection cadence, resolution and AA. Neutral machinery-room fill is an inexpensive local work-light approximation; metal uses the existing analytic room reflection rather than a new per-frame probe.

## Verification scope

CPU tests cover finite unit normals, true 3D edge rolls, immutable source dimensions, unchanged exterior GPU inputs, batch/texture budget, room culling, collision routes, and byte-exact opaque/glass buffer restoration after repeated door cycles. Chromium checks cover keyboard and portrait-touch entry, aisles, four stair routes and return to the map. Native Vulkan renders exercise the production model, material code, GTAO/TAA/ACES and shared lake integration.

Native fixture timings include CPU command encoding and GPU queue completion on the cloud software adapter. They do not measure full-map browser performance or physical Android/Safari FPS. Full-map rendering exceeds this cloud Chromium adapter's 16-texture limit; the map requires 32. No phone performance claim is inferred from those tests.
