# Rocha environment

Open http://127.0.0.1:5195/local-launcher.html and choose **Rocha**, or use **Play Rocha**. The original Tidewater island and its five-story building remain available. `?world=tidewater` is the default; `?world=rocha` selects the prepared Rocha map. WASD walks, mouse looks, F switches walking/flying, Shift moves faster, and H opens settings.

**Maps → Explore Rocha** contains the overhead plan and review cameras. **Maps → Environment → Surveyed terrain** displays the original CAD triangle surface, hides estimated excavations, bank faces, and water previews, and clears temporal history. Live quality and water controls remain under Performance. Removing water preserves an invisible, polygon-bounded flat surface for walking/swimming physics.

**Maps → Vivienda contenedor** contains a furnished, walkable example home in lot 775. Its custom 12.10 × 3.60 m plan follows the supplied drawing. «Ir al acceso» starts walking at its stairs; look at a nearby door or front slider and press E. The original survey and rainfall inputs remain unchanged. Source measurements, estimated heights, 7,312-triangle budget, controls and validation are documented in [ROCHA-CONTAINER.md](ROCHA-CONTAINER.md).

## Transformer interior inspection

Inspection camera transitions move position, orientation, field of view and near clipping together: 0.4 s entering, 0.25 s between views/components and 0.35 s returning, with smooth acceleration and deceleration. Escape can interrupt entry; further view selections retarget from the displayed pose. Orbit/scroll input is discarded during travel and resumes afterward. The first opening prepares only inspection mesh pipelines and buffers asynchronously while keeping the starting camera and closed pole steady; subsequent openings reuse them. Geometry remains stationary. Shadow cascades follow normal camera updates without forcing a cache reset on each animation frame. Return restores saved camera/navigation state at completion; game disposal restores it immediately. Review tools wait for preparation and travel before fixed-camera measurements. Transition evidence is saved under `results/rocha-transformer-transitions`.

Click the transformer tank on the single illustrative pole, or choose **Maps → Electrical infrastructure → Inspect transformer interior**. The camera enters a stationary sectional tank; pole, equipment, bushing mounts and wired terminals remain in place. Drag to orbit, scroll to zoom, and use **Whole assembly**, **Windings**, **Connections**, or **Inside tank**. Select a component to frame it and read its description. Coils stay wrapped by default. **Expose winding layers** sections the left winding pack to reveal representative conductor layers, insulation and cooling ducts; **Show dielectric oil** adds a static transparent preview. **Return to map** or Escape restores the previous camera and walking/flying state without changing quality, water, resolution or render scale.

The Rymel 150 kVA conventional unit remains the exterior reference. Its [July 2026 catalogue](https://rymel.com.co/wp-content/uploads/2026/07/Transf-convencionales-y-autoprotegidos.pdf) documents oil immersion, insulated windings, bushings and a tap changer. The [factory photograph](https://rymel.com.co/wp-content/themes/rymel/assets/factory.webp) shows the general appearance of active assemblies, but does not identify this 150 kVA design. Exact core construction, winding topology, turns, conductor sections, winding metal, vector group, secondary voltage, oil type and internal dimensions are unpublished. The interior is a detailed illustrative arrangement of documented component families, **not a 100% verified factory replica**. No self-protected internal breaker or fuses are added to this conventional model. The cutaway is an inspection visualization, not a hinged real tank door or live equipment.

Interior version: `rocha-transformer-interior-2`. The photo-based reconstruction adds smoothly wrapped coil packs, binding, pressboard end rings, cooling gaps, lamination edges, formed clamps, threaded rods, washers, nuts, wrapped leads, lacing and an estimated five-position three-deck rotary selector. Lead construction detail follows a [comparable Jiezou factory photograph](https://www.jiezoupower.com/factory-supply-price-400-kva-630-kva-11000v-415v-three-phase-electrical-oil-immersed-transformer-product/); selector shape follows [Riotrafo references](https://riotrafo.com.br/en/products/rotary-tap-changers/). Neither establishes Rymel's supplier, topology or dimensions. Paper, insulation and metal use a dedicated procedural PBR surface, preserving Tidewater lighting without exterior rust/paint damage on internal paper.

Geometry is created once on first inspection and reused, with a 30,000-triangle interior cap: 27,404 normal, 26,464 sectioned, or 27,416 including the oil preview. The hidden inspection submits zero draws; the closed pole retains identical exterior geometry and three material batches. Inspection filters the sealed tank and seven low-detail bushing housings out of the pole context, replacing the housings with smoother close-up versions at identical attachment positions and endpoints. Other pole equipment retains its original vertices and materials. The retained context adds 4,169 triangles; the complete inspection is at most 31,585 triangles including context and oil. No image textures, lights, fluid simulation or render passes are added. No survey, roads, seeded scenery, electrical placement or rainfall input changes. Interior references, estimated component records and actual geometry counts are packaged in `transformerInterior`, separately from the exterior version. New matched captures and reports are under `results/rocha-transformer-interior-v2`; previous evidence remains in `results/rocha-transformer-interior`. The production build on 5195 was checked with all six quality levels, both water states, Surveyed terrain, repeated restoration and component framing. GPU timestamps were available. Matched 1080p/scale-1/Full measurements show identical closed draw/triangle/buffer counters; the whole-assembly inspection added about 1.04 ms GPU mean, with higher P95 tails in both inspection views. These single before/after runs were not thermally controlled; `comparison.json`, `comparison.csv` and `report.html` retain all signed timing changes.

## Survey and layout precision

The authoritative main DWG has INSUNITS=6 (metres). The packaged surface contains 1,076 unique vertices and 1,778 triangles. Its planar boundary area is 1,157,719.261546 m² (115.771926 ha), with source elevations 14.963920–60 m. Rendering uses those triangles directly; CPU ground queries use their barycentric interpolation. Lighting textures are derived data. No island scaling, procedural erosion, or automatic building-pad flattening is applied to the survey.

The reversible origin is E=854377.174, N=1612733.553, elevation offset=0. Local X=E−originE, Z=originN−N, Y=source elevation. Horizontal and vertical datums are unidentified. The PDF's point table uses another coordinate system. The electrical addition validates an inferred EPSG:9377-to-EPSG:3116 conversion against three matching control points; this does not establish an identified survey datum or field accuracy.

The layout is registered using the matching CAD boundary and labelled PDF grid. Maximum boundary registration error is **0.046710 m**, RMS matched-vertex error **0.020397 m**. Six PDF outline copies match; two alternate 61-segment outlines differ and are excluded from registration. This measures registration, not the accuracy of every pictogram. Curve flattening tolerance is 0.016437 m, plotter quantization approximately 0.062516 m, and topology gap joins are limited to 0.164373 m. All 776 unique plot IDs have distinct containing parcel polygons; empty residential plots are left undeveloped.

Embedded water/pool silhouettes and roof symbols are retained as mapped features. Raster water outlines have approximately 0.39 m source-pixel precision. Parcel 737 has a small source-layout extension beyond the CAD boundary; the survey is not enlarged to accommodate it. Source checksums, original survey coordinates, unknown datums, and uncertainty notes are in `extras/rocha/source-metadata.json` and the runtime asset. The cropped DWG's proprietary Civil 3D objects are not substituted for the main drawing's verified triangle surface.

## Artistic and estimated content

Mapped facilities reuse Tidewater's timber siding, shutters, doors, roof details, warm window/lantern lighting, weathered texture baker, material batches, and colliders. There are 53 exterior facilities, each defaulting to one 2.75 m story. Their roof-symbol extents are mapped; body, porch, foundation and facade design are visual estimates. Facilities remain visible when scenery quality is Off. No quest, interior, or functioning attraction is added.

Mapped landscaping uses the original palm/tree models and wind animation, with compatible grass and fern cover. Roads, water, sports markings and facility footprints are excluded from generated ground cover. Sports linework and parcel boundaries follow the registered layout. Marker width is a visual aid, not a surveyed fence dimension.

The water surfaces use the existing Tidewater optics, sky/reflections, calm FFT ripple normals, refraction, and underwater effects. Exact polygon edge tables constrain their optics and queries without compiling thousands of shader constants. Lakes, pools and channel pieces have independent polygon geometry. Estimated maximum depths are 3 m, 1.5 m and 0.75 m respectively. Water levels use median surveyed perimeter samples; connected lake/channel pieces share one estimated level. Bathymetry, lake/channel division and shore excavation faces are not surveyed. Terrain remains immutable; the proposed design layer is separate. Outside the surveyed map, a flat grey-green (`#606955`) graphic backdrop replaces the previous 32,768-triangle estimated landscape. It uses the existing background draw, adds no terrain, textures, depth, shadows, refraction draws or collision, blends into the original sky at the horizon, and dims at night. The backdrop skips lower-sky haze marching and compositing so cloud shadows cannot darken a nonexistent surface. The opt-in haze path leaves the original island shaders unchanged. It stays visible in Surveyed terrain inspection. The map edge remains the authoritative survey boundary.

## Performance comparison

The launcher and benchmark panel are map-aware. Rocha runs entrance, lake-glitter and underwater views using the same existing keys, leaving the island's camera order unchanged. Matched comparisons load two fresh seeded games sequentially, stop rendering, wait for queued work, and destroy each device before loading the next. They use the chosen resolution, render scale 1, fixed 1/60 simulation timestep, 120 warm-up frames and 300 measured frames per view, then 10 seconds of live callback cadence after 120 warm-up callbacks. Reports identify the map, source version, estimates, actual settings, AA search budget and `exteriorMode` (`flat-color` for Rocha, null for the original island). Negative savings remain visible. GPU timestamps and callback cadence are separate; reciprocal GPU time is not reported as measured FPS. Hidden tabs, loading failures and device errors abort success reporting. Cadence-only fallback remains available when GPU timestamps are unavailable.

## Preparation, installation and recovery

Playing and first installation need no CAD software or Python. Normalized assets and runtime modules are included in the guarded launcher patch package. Offline preparation is reproducible with `tools/prepare-rocha.py` from a LibreDWG JSON conversion of the authorized main source, using NumPy, PyMuPDF and Shapely; this is a maintainer tool only. `tools/rocha-overhead.mjs` prepares the inspection plan.

This installation's pre-Rocha files and hashes are preserved under `app/.rocha-map-backup`. The subsequent exterior-removal update is backed up under `app/.rocha-exterior-backup`, including the prior production build and launcher package. Earlier water, quality and building backups are preserved. Future installations validate complete known source anchors before editing, refusing incompatible or partly patched source. The normalized asset's source files are identified by SHA-256; original proprietary PDF/DWG documents are not required for play and are not redistributed in the launcher.

Validation logs, registered layout/PDF overlay, screenshots, GPU pass audits and measured reports are saved under `results/rocha-*`. Performance reports apply only to their recorded device, browser and resolution; no universal 60 FPS claim is made.

## Recorded validation on this installation

The launcher suite passed 75 tests, including 12 Rocha tests, and the optimization suite passed 10 tests. WebGPU timestamps were available on the recorded Apple Metal adapter. Both cloud implementations passed 216 mixed quality-state checks and 12 rendered water/quality modes each, including walking, deep-water transitions, dry-ground transitions, and survey restoration. The original island and five-story building were also checked in a fresh game.

At 1920 × 1080, the matched water comparison recorded 300 GPU and CPU samples for each of the three views in both games, plus at least 10 seconds of callback cadence. Removing water reduced mean GPU time by 24.6% at the entrance, 52.2% at the lake-glitter view, and 43.3% below the water level. With water off in both games, Half quality reduced mean GPU time by 22.3%, 13.3%, and 15.1% respectively. The below-water CPU mean became 0.05 ms slower; that negative result remains visible. These are recorded measurements, not a guarantee of frame rate on another device.

See `results/rocha-validation.json`, `results/rocha-water-comparison.json`, `results/rocha-quality-comparison.json`, both cloud pass audits, and the saved screenshots. The 420 pre-change backup files were checked against their original hashes. The in-app browser did not expose an automated native download-completion event; the combined JSON reports were saved directly for review, and the normal browser Save JSON control remains available.

## Exterior removal validation (2026-10-02)

Rocha now omits the 32,768-triangle surrounding landscape. All 1,778 survey triangles and every survey/layout array remain unchanged. A single existing background draw supplies the grey-green exterior and sky; no new texture or terrain draw is added. The background remains in Surveyed terrain mode. The original island's generated haze shaders are regression-tested against the pre-change version. The legacy cloud renderer fades through clear atmosphere near the horizon to avoid stretching its screen-space cloud texture; the default Sky-Pro background shader matches the measured shader hash.

The updated launcher suite passed **80 tests**, including **17 Rocha tests**, and the optimization suite passed **10 tests**. The current installation and package were backed up before editing (629 installed files and 58 package files, original hashes checked). GPU audits cover 216 mixed quality states, all 12 rendered quality/water modes, walking, water transitions, and survey restoration; no exterior mesh is submitted in main, shadow or refraction passes.

The comparison below uses the recorded Apple Metal adapter, 1920 × 1080 output, Full quality, scale 1, the optimized ocean, fixed 1/60 timestep, 120 warm-up and 300 measured frames per view. Values are mean GPU milliseconds; lower is better.

| View | Water on: original → flat | Reduction | Water off: original → flat | Reduction |
| --- | ---: | ---: | ---: | ---: |
| Entrance | 36.59 → 33.81 ms | 7.61% | 27.27 → 25.26 ms | 7.35% |
| Lake glitter | 109.35 → 107.22 ms | 1.95% | 49.34 → 48.90 ms | 0.89% |
| Underwater / below water level | 77.99 → 75.80 ms | 2.81% | 41.95 → 41.72 ms | 0.57% |

The 10-second callback cadence measurements changed from 37.775 to 37.725 Hz with water and 50.917 to 50.533 Hz without water: no clear cadence improvement. These are browser callbacks, not measured displayed FPS. CPU means in the water-on lake and underwater views increased by 0.060 and 0.085 ms; negative savings are retained in the report. Small differences may reflect measurement variability. This removal is a modest optimization in these views, not a large measured FPS gain.

The first reference was captured before editing, but its visible browser size changed during the run. It remains saved as `results/rocha-exterior-before.json`. For the matched result, the original production snapshot was measured again at the same visible 585 × 779 browser viewport as the new version (the game buffers stayed 1920 × 1080). Raw timestamps preserve the order: new version, then repeated original reference.

`results/rocha-exterior-comparison.json` contains both matched runs, GPU/CPU mean and P95, signed savings, raw samples and separate cadence. Individual recordings, pass audits, screenshots, build/test logs and backup checks are saved as `results/rocha-exterior-*`.

## Mapped entrance and commercial row (commercial-entrance-1)

Rocha now includes LOCAL 1–17, the registered storefront wall footprints and their
5.02 m access gap between units 11 and 12. The adjoining strip has **32 stalls**;
the recreation lot has **59 stalls**, for **91 mapped spaces**, initially empty.
The lot's circulation opening and the strip's three planting islands are retained.
The original 776 plots remain undeveloped, and existing facilities remain unchanged.

The southwest road sector is restored from the PDF vector topology. A 32.50 m
supported timber crossing follows its four mapped corners, with continuous
approach collision and an explicit inward-facing entrance spawn. Construction
heights are visual estimates: the main deck is 15.809 m, with 0.60 m clearance
above the neighboring estimated 15.209 m water level. The approach ramps, timber
supports, 0.22 m deck thickness and 0.90 m rails are estimates, not engineering plans.

Storefronts have one 2.75 m story, stepped stone foundations, Tidewater's pastel
siding, cream trim, glazed timber doors, shuttered sash windows, rusted metal
roofs and warm lights. LOCAL numbers use one cached 256 × 1024 atlas (1 MiB).
The shared nearest-light system still has eight GPU light slots. Buildings,
parking, frontage and crossing remain visible when diagnostic vegetation is Off.

Survey vertices, all 1,778 triangle planes, original road records, water boundaries,
parcels and existing structures are unchanged. New paving is clipped against the
TIN's exact planes; no sampled-height replacement or pad flattening is applied.
Mapped planting is excluded from paving and buildings after its original random
stream is consumed, preserving the appearance of every surviving plant.

Use **Maps → Explore Rocha** for **Locales 1–17**, **Locales at night**,
**Commercial overhead**, **91-space parking**, and **Entrance crossing** cameras.
The entrance/lake/underwater automatic benchmark keys and protocol remain available.
The additional local collector can be started with
`node tools/commercial-review-server.mjs app/dist 5197`, then opened at
`http://127.0.0.1:5197/test/commercial-review.html?bench`. It captures
five matched fixed cameras at 1920 × 1080, Full quality and render scale 1, with
120 warm-up / 300 measured frames and a separate 10-second callback cadence.
Before/after layout versions are intentionally different; no FPS increase is promised.

Prepared source records are packaged in `extras/rocha/rocha-data.json`. The PDF
SHA-256 is guarded in `tools/prepare-rocha-commercial.py`; preparing a different
PDF requires renewed extraction review. Maintainer preparation uses PyMuPDF,
NumPy and Shapely 2.1+; playing and the automatic installer require neither Python
nor CAD software. The extraction report records coordinate precision and counts.
Registration retains the original 0.04671 m maximum boundary error; shared-wall
centre lines have approximately 0.164 m plotter/topology precision.

Before this update, source, assets, production build and launcher package were
preserved under `app/.rocha-commercial-entrance-backup`. Earlier backups remain.
Measured results, screenshots and validation are in `results/rocha-commercial-entrance`.

## Mapped road junction and roundabout

The selected commercial/recreation junction now follows deduplicated source PDF
road boundaries through its adjoining western and northern junctions. Its two
approaches, road connections and curves are restored, including the separate
10.315 m circular planting island. Review it with **Maps → Explore Rocha →
Roundabout**, **Roundabout overhead**, **Roundabout approach**, and **Roundabout
at night**. The southwestern crossing view is retained; the later complete-entrance update moves the live spawn to the main gate.

The paving is clipped against exact survey triangle planes and raised 0.038 m
for depth separation. The 0.12 m high, 0.18 m wide weathered stone curb is a visual
construction estimate. A 0.00015 m clearance beneath it avoids Float32 boundary
slivers; it does not modify the surveyed ground or the island outline. Paving
uses the existing village weathering texture, adding no image or texture
allocation. The mapped island tree retains its original position, species,
scale, orientation and seed. Roads and curb remain visible at every diagnostic
quality level; vegetation obeys its existing quality controls.

The prepared profile includes `roadJunctions` and source-version metadata.
Existing survey, parcels, water, facilities, parking, storefronts and original
road records are unchanged; only this sector's derived paving/vegetation masks
are replaced. Other recreation features remain outside this update.

The original boundary registration maximum remains 0.04671 m. Road curves are
subdivided within 0.02 m and checked against dense samples of the original PDF
arcs. `tools/prepare-rocha-roundabout.py` is a maintainer-only preparation tool
with the same source PDF checksum guard. Installation and play require no CAD
software or Python. Source, package and production build are backed up under
`app/.rocha-roundabout-backup`; all earlier backups remain intact.

Screenshots, source overlays, checks, pass/draw captures and matched before/after
GPU/CPU/cadence results are saved under `results/rocha-roundabout`. The collector
can be started with `node tools/roundabout-review-server.mjs app/dist 5199` and
opened at `http://127.0.0.1:5199/test/roundabout-review.html?bench`.


## Complete main entrance — main-entrance-1

The source-defined road correction now continues through both open entrance lanes,
its narrow planted median and curved end, the access canopy and eight mapped columns.
The former rectangular extraction cutoff is removed. The live walking/flying spawn
is inside the main entrance facing the roundabout. The southwestern bridge remains,
with its review camera labelled **Channel crossing**. Historical `beach`, `sunGlitter`
and `underwater` benchmark positions are unchanged; `beach` is labelled **Channel
approach**. Maps offers Main entrance, matched overhead, nighttime and parking-access
review cameras.

Paving retains the 0.038 m offset above exact surveyed triangle planes. The survey,
776 parcels, 17 locales, 91 empty parking stalls, water boundaries and source planting
records are preserved. Roads/access structures remain visible at every diagnostic
quality level. Median ground stays unpaved. Its weathered stone curb height 0.12 m
and width 0.18 m, enclosure height 2.75 m and minimum canopy clearance 3.8 m are
visual construction estimates. Collision applies to solid walls/posts only; the
gate remains open. Longer median curb edges have slope-following collision segments.

The PDF leaves a landscaped strip approximately 24.24 m wide between the forecourt
and commercial parking. It is retained, with pedestrian access through the original
LOCAL 11–12 gap; no unshown paved connector or exterior terrain is invented.
Recreation parking connects to the completed paving. Remaining recreation facilities
are outside this repair. Rocha's canopy GPU attribute mapping now uses each tree's
existing vertical scale instead of the palm lean field, fixing missing overhead
crowns without changing mapped positions, sizes, species or seeds.

Source registration maximum remains 0.04671 m; cubic flattening tolerance is below
0.02 m. The completed source geometry and report are packaged in `extras/rocha` and
`results/rocha-main-entrance/source-extraction.json`. Preparation order is base Rocha,
commercial supplement, roundabout, then `tools/prepare-rocha-main-entrance.py`.
Earlier supplement stages retain a later composed entrance instead of overwriting
it. Maintainer conversion requires Python/PDF tools; installing and playing does not.

Every pre-change installed source/public/build file and launcher package is preserved
under `app/.rocha-main-entrance-backup` with a SHA256 manifest. Earlier backups remain.
Matched source overlays, actual before/after captures, command/draw evidence, walking
checks and GPU/CPU/callback results are in `results/rocha-main-entrance/VALIDATION.md`.
Raw BGRA intermediates were losslessly archived as `.bgra.gz` to recover disk space;
the archive manifest retains original checksums. PNG captures and timing JSON are
preserved. Play remains on loopback port **5195**.


## Lake-side road connection — lake-road-connection-1

The road between the roundabout and the next residential intersection now retains
the missing bend and continuation beside water-6. The omitted north/south projection
was 62.88842 m; restored paving is 608.18424 m². The road uses the same muted,
weathered paving, TIN contact and 0.038 m lift. It adds 19 triangles, retaining the
existing paving primitive prefix and all initialized material/texture resources.

The earlier entrance extraction stopped at native PDF x=1845. The original base
preparation also removed circulation inside a rectangular recreation-image mask,
until x=1902.3894039. The connection stage extracts the registered PDF road cell,
limits changes to that omitted sector, and rejects joining edges that do not meet
existing pavement. This is a topology check, rather than moving the cutoff to a
new unchecked rectangle. There are no new roads or changes to the survey, parcels,
shops, parking, water, access structures, spawn or historical benchmark cameras.

`tools/prepare-rocha-main-entrance.py` now automatically invokes
`tools/prepare-rocha-lake-road.py`. The latter is idempotent and can also be run on
the completed entrance with `--pdf` and `--out`. All preparation remains offline;
installation and play use packaged assets and require no Python or CAD software.
The local review page supports `?bench&lakeRoadReview` with fixed lake-road ground,
overhead and nighttime poses; these do not replace historical benchmark positions.

The immutable reference is in `app/.rocha-lake-road-connection-backup`, including
installed source/public/build files and the launcher package. Earlier backups stay
intact. Captures, source geometry, walking/render audits, test results and limits
are recorded in `results/rocha-lake-road-connection/VALIDATION.md`. Production stays
on loopback port **5195**.

## Compacted zahorra roads — rocha-zahorra-2

All Rocha streets, entrance lanes, roundabout and both parking areas now share a
warm grey-beige compacted aggregate finish, based on `#A9A391`. Fine grit, muted
stone variation and matte lighting reuse Tidewater's existing terrain detail
texture. Sidewalks, stone curbs, parking markings and the timber channel crossing
retain their materials. The original Tidewater island is unchanged.

Roads integrated into the surveyed terrain reuse its existing fine-detail sample.
Prepared road and parking overlays share one material and one anisotropic,
mip-filtered texture lookup. There are no new image assets, GPU textures, mesh
triangles or render passes. Small shading relief is capped at 1 mm, within the
planned 2 mm maximum; it does not move vertices or change surveyed ground heights.
The normal calculation was simplified after an isolated native GPU trial found
a regression in the initial relief implementation.
Opaque paving is submitted before the terrain beneath it, retaining the existing
depth buffer and render pass. Native draw-order comparisons preserve HDR pixels
exactly; this does not establish a whole-game FPS increase.

The complete packaged layout stays byte-identical, including masks, road
connections, survey, parcel boundaries, storefronts, parking and water bodies.
Benchmark metadata separates `roadSurface: "zahorra"` and
`roadMaterialVersion: "rocha-zahorra-2"` from the unchanged layout version. Both
renderer reference paths use the same road appearance. Material and geometry
persist through water toggles, all six quality levels and Surveyed terrain.

Backups are in `app/.rocha-zahorra-backup`; previous backups remain intact.
Validation and explicitly labelled native material previews are in
`results/rocha-zahorra/VALIDATION.md`. Native previews omit full-game scenery,
water, atmosphere and postprocessing, and must not be presented as browser game
captures. Whole-game GPU/CPU and ten-second callback-cadence validation remains
unavailable while the browser tool's localhost-policy rejection is unresolved.

Version 2 fixes the finish at terrain-rendered road edges, including the stretch
north of the lake-road connection. The registered road mask now controls the
aggregate coverage without the island footpath's soil noise. Shore sand and
painted forest occlusion no longer bleed into the road finish; baked topographic
occlusion and actual shadows remain. Texture samples, road geometry and gameplay
data are unchanged. Incremental backups are retained in
`app/.rocha-zahorra-backup/completion-20261004-235229279/`.
See `results/rocha-zahorra-completion/VALIDATION.md` for the matched, isolated
material checks and their inspection limits.
Production is served on port **5195**.


## Diagonal street beside the lower recreation lake

The user screenshot identified two omitted portions of the same street: the
initial recreation-image exclusion removed paving on both sides of a surviving
fragment. The repair follows the PDF's complete parallel road edges, from the
western junction past the lower lake to the actual map boundary. Its width is
8.975 m. It adds 2,960.123 m² of paving and 64 TIN-clipped triangles, using the
existing zahorra material, texture and bounded culling batches. No textures or
render passes are added. This geometry addition is separate from the earlier
material-only update; no FPS increase is claimed.

`roadSurfaceRepairs` updates road/grass masks, vegetation exclusions, world
metadata and the minimap additively. The survey, original road records, 776 plots,
17 locales, 91 parking spaces, water, earlier junction corrections, historical
cameras and original island remain unchanged. Surviving plant seeds are retained.
Preparation calls `prepare-rocha-recreation-road.py` after the existing lake-road
stage; installers receive the prepared assets and require no PDF/CAD tools.
The layout version ends in `recreation-road-1`; the shared material remains
`rocha-zahorra-2`.

The unchanged survey keeps its original hydraulic playback input identity through
`surveyPlaybackSourceVersion`. Existing numerical files are neither relabelled
nor recalculated. Hydrology remains paused. Incremental backups are in
`app/.rocha-zahorra-backup/recreation-road-20261005002457493/`.
The current browser can render and inspect Rocha on port 5195; live before/after
captures and test results are saved in `results/rocha-recreation-road/`.

## Lluvia y drenaje exploratorio — escenario ligero

En el launcher, **Simular lluvia en Rocha** carga el resultado pausado, sitúa la cámara en la vista general y abre **Maps → Lluvia y drenaje**. También puedes abrir **Cargar resultado** desde una partida normal sin mover la cámara. La reproducción comienza pausada: 30 mm/h uniformes durante 60 minutos, infiltración hipotética de 5 mm/h sobre el terreno topográfico y seis horas posteriores. Reproducir, pausar, reiniciar, desplazar el tiempo y elegir 1×, 10× o 60× no ejecuta un motor hidráulico en el juego. Las capas de profundidad, velocidad, cuencas potenciales, flechas y salidas son opcionales. Las cámaras O01–O12 corresponden a candidatos topográficos; H01–H06, a los sectores simulados con mayor descarga. No son tuberías o receptores comprobados. El parámetro `rainfall` es optativo y se ignora en benchmarks para conservar sus ajustes y cámaras históricos.

Por solicitud posterior del usuario, se conserva **un solo escenario meteorológico** en lugar de la batería de 64 casos. La referencia utiliza una malla numérica de unos 10 m. La ampliación comprueba el mismo caso a 5 m y después a 2,5 m si los controles de recursos lo permiten; si las salidas principales difieren más del 5 %, comprueba zonas de 1,25 m. El informe indica cuáles terminaron, cuáles quedaron incompletas y su alcance. ANUGA 4.0.1 se compiló para macOS 14 ARM64 y se ejecuta en CPU en un entorno de preparación aislado. Jugar e instalar requieren solo las dependencias habituales del launcher; no Python ni ANUGA. Los triángulos de reproducción se recortan contra los 1.778 planos topográficos originales. Campos float32 por bloques, cada cinco minutos, interpolación visual lineal; agua inferior a 1 mm se omite y ese error se cuantifica.

El estudio es exploratorio y no tiene periodo de retorno. La estabilidad se evalúa por magnitud y por sectores geográficos fijos de 50 m: diferencias inferiores al 5 % en volumen y caudal máximo, incluyendo los sectores que reúnen el 95 % de la descarga. Totales estables no demuestran estabilidad de cada salida; una comprobación local no demuestra convergencia de todo el predio. El terreno natural conserva las depresiones. Los lagos, construcciones, bordillos y excavaciones visuales no se incluyen como obras hidráulicas en este escenario. La descarga libre supone un exterior seco a la cota de cada borde; faltan cuencas externas, niveles receptores, drenajes reales, batimetría, suelo, datos locales de lluvia y precisión vertical. El fondo gráfico no es terreno. **El receptor final fuera del mapa es desconocido.**

La lluvia decorativa y la apariencia de humedad no representan lluvia o humedad medidas. Ocultar las partículas o el agua, y modificar la calidad, no cambia las cantidades calculadas. Cerrar la reproducción libera sus buffers, mallas y materiales y restaura el modo topográfico y las superficies previas. Cambiar manualmente Surveyed terrain cierra la reproducción para no mezclar ambos terrenos. La locomoción usa las consultas habituales del juego; la reproducción hidráulica no añade un sistema nuevo de natación o daños.

El informe servido en `rocha/rainfall/report.html` incluye mapas, animación técnica, perfiles, balance global, hidrogramas, coordenadas originales, afecciones indicativas CSV, parámetros y limitaciones. A 10 m no se resuelve cada estacionamiento, cuneta o alcantarilla; las huellas pequeñas se marcan como aproximadas. Las atribuciones por salida muestrean el mismo flujo numérico de ANUGA y reportan su diferencia frente al integral global. No constituyen aforos de campo.

El botón **Precisión del descole** abre `rocha/rainfall/refinement/report.html`: comparaciones firmadas, mapas afinados, coordenadas originales, balances e hidrogramas comprimidos por malla. Se exige balance de agua y discrepancia regional/global de como máximo 1 %. Cada resultado identifica escenario, malla, celdas, resolución y SHA-256. El refinamiento cambia la discretización del cálculo, no la precisión del levantamiento. Las consultas de altura son baricéntricas sobre el TIN; la malla hidráulica no sigue todos sus bordes y su aproximación a los planos se cuantifica por separado.

La ampliación limita los archivos adicionales a **2 GB decimales**, incluidos respaldo y candidata de reproducción; mantiene al menos 3 GB libres y detiene un cálculo si supera 3 GB de memoria residente. No inicia más de 650.000 celdas; usa dos hilos y un cálculo a la vez. Guarda máximos comprimidos, parámetros e hidrogramas, sin SWW ni películas nuevas. Conserva cálculos completos y rechaza archivos interrumpidos al reanudar. El tiempo de cálculo puede ser de varias horas aunque el almacenamiento sea pequeño.

Se preparó una sola candidata de reproducción a 5 m. Dos ensayos GPU nativos con las mismas cámaras registraron una regresión reproducible; por ello se conserva la reproducción publicada de **10 m** y el análisis más fino se entrega mediante el informe. La decisión y las diferencias GPU/CPU están en `results/rocha-rainfall/refinement/replay-decision.json`. Los ensayos nativos no miden FPS ni cadencia del navegador. La ampliación tiene respaldo propio en `app/.rocha-rainfall-refinement-backup`, sin sustituir los anteriores. Preparación opcional: `tools/setup-rocha-hydrology.sh refine`; reutiliza el entorno instalado y los resultados válidos.

Los sectores geográficos se conservan entre mallas, pero los flujos de cada cara numérica se atribuyen por su punto medio. La longitud de borde asignada a un sector puede variar con la discretización; se incluye por malla en los parámetros descargables. Los máximos de los campos y los caudales regionales se muestrean cada 10 segundos; el pico global es el mayor caudal medio de un intervalo de 10 segundos. No se presentan como máximos instantáneos.

Después de finalizar el cálculo, `sh tools/finalize-rocha-refinement.sh` repite las verificaciones hidráulicas, actualiza los informes y el instalador, ejecuta ambas suites, reconstruye producción, comprueba los activos en 5195 y registra checksums. Necesita el servidor local ya activo. Rechaza una entrega final mientras el estudio conserve el estado pendiente.

Se conserva la identidad y geometría de los 776 lotes, 17 locales, 91 plazas, agua y contenido existente. Respaldo previo: `app/.rocha-rainfall-backup`. Repetir la preparación opcional: `tools/setup-rocha-hydrology.sh` con `ROCHA_PYTHON` apuntando al entorno aislado; versiones en `results/rocha-rainfall/preparation-requirements.txt`. La inspección automática del juego en navegador permanece pendiente por un rechazo previo de política de automatización; los ensayos nativos son escenas aisladas y no prueban FPS, cadencia, sombras, óptica submarina ni restauración temporal del juego completo.
# Colombian-style transformer pole · rocha-electrical-single-pole-2

Maps → Electrical infrastructure → **Pole · 100 m north** opens the unchanged
pole camera. Explore Rocha also offers transformer and ground-connection close-ups.

One fictional three-phase pole-mounted transformer now has three fuse cutouts,
three surge arresters, three primary bushings, four secondary terminals, incoming
cable terminations, a metering/protection cabinet, clamps and grounding bonds.
Both the incoming medium-voltage supply and outgoing secondary use protected
underground conduits. Visible cables use a shared prepared terminal layout; the
buried electrode is described in metadata, with no trench or hydraulic changes.

The 13.8 kV primary reference and all construction dimensions are illustrative.
Capacity and secondary voltage remain unspecified. Utility diagrams are visual
references, not an Afinia-approved installation or a confirmed electricity supply:
[EPM transformer/metering arrangements](https://www.epm.com.co/content/dam/epm/proveedores-y-contratistas/RA4_100.pdf),
[EPM grounding details](https://www.epm.com.co/content/dam/epm/proveedores-y-contratistas/norma-RA6-010-junio.pdf).

The position, 11 m pole, orientation, support pad, existing review cameras, survey,
layout, seeds and rainfall inputs are preserved. There are no additional poles,
overhead spans, service tracks, lights, textures or rendering passes. The assembly
uses the existing stone, timber and hard-surface material batches, static shadows
and culling, with a maximum budget of 6,000 triangles. A conservative collision
cylinder includes the attached conduits; the cabinet has its own solid box.

Infrastructure remains visible at all six diagnostic quality levels, water on/off
and Surveyed terrain. The original Tidewater island remains unchanged.

Preparation: run `tools/prepare-rocha-electrical.py` after other Rocha stages, then
`node tools/package-rocha-electrical.mjs`. Prepared assets need no Python at play
or install time. Evidence is in `results/rocha-pole-equipment`; previous versions
remain archived in `results/rocha-single-pole` and `results/rocha-electrical`.
Backups, including production files, are under `.rocha-electrical-backup/<timestamp>`.

# Rymel-referenced exterior · rocha-electrical-single-pole-3

The exterior follows the currently published Rymel conventional three-phase
150 kVA photograph and July 2026 catalogue, inspected on 5 October 2026:
https://rymel.com.co/transformadores-convencionales-y-autoprotegidos/
https://rymel.com.co/wp-content/themes/rymel/assets/convencionales-3-0.webp
https://rymel.com.co/wp-content/uploads/2026/07/Transf-convencionales-y-autoprotegidos.pdf

The estimated 1.04 m tank width anchors photo-derived proportions; tank height
0.70 m and depth 0.58 m remain scenery estimates. The 150 kVA reference identifies
the exterior, not a verified utility capacity. Primary supply, mounting strength,
grounding performance, secondary voltage and real installation remain unverified.
This exterior record predates the separate on-demand interior inspection described above; its historical geometry and metadata remain preserved.

A shallower weathered tank now has folded cooling panels, open lifting fittings,
galvanized supports, seven-shed primary bushings, short secondary terminals, a
central tap handle, relief fitting, front indicator, drain/sample valve and
geometry-only markings. The central upper phase and its leads are clear of the
concrete pole. Arresters are mounted near the primary bushings; secondary leads
travel in front of and beneath the tank. Ground bonds route around solid objects.

Maps → Explore Rocha includes front, side, rear, upper-equipment and nighttime
exterior cameras. Historical camera keys/positions remain unchanged. The one
pole, support patch, underground feed, unknown supply ratings, map layout, seeds
and rainfall inputs remain unchanged. The exterior uses the same three static
material batches, no new GPU textures/lights/passes, and at most 6,000 triangles.

Preparation rejects unexpected cable intersections with the pole, tank,
mounting beams, cabinet, bushings and other defined equipment volumes. Explicit
terminal joints and each conductor's own protected conduit are the only allowed
contacts. These are geometric checks, not an electrical-clearance certification.

Evidence: `results/rocha-pole-exterior`, including matched before/after views,
GPU/CPU timings, separate live callback cadence, tests, source references and
checksums. Prior evidence is retained. Each modified installed file is backed up
under a new timestamp in `app/.rocha-electrical-backup`.

## Transformer interior and virtual opening · 2026-10-05

Click the transformer tank, or choose **Maps → Electrical infrastructure → Inspect transformer interior**. Inspection geometry and pipelines are prepared once. The first completed inspection approaches the closed tank in 0.4 seconds, then plays a 0.8-second maintenance-inspired opening: fasteners and external leads release, the top cover rises slightly, internal leads separate, and the cover with its three primary bushings rises 0.45 m. A clipped front wall reveals the stationary active assembly. Subsequent visits reuse the open inspection with the 0.4-second camera transition. View/component changes take 0.25 seconds; returning takes 0.35 seconds.

The inspection represents **isolated equipment with oil removed**. Rymel's exact fastenings, lifting support and service procedure are unpublished and remain estimates. The cover is supported virtually; there are no crew, rigging simulation or operating electrical circuits. The animated wall section is an educational cutaway. Maintenance principles follow the [Wilson liquid-filled transformer maintenance guide](https://www.wilsonpowersolutions.co.uk/wp-content/uploads/Wilson-Maintenance-Manual-2022-06.pdf); appearance and component families follow the [Rymel catalogue](https://rymel.com.co/wp-content/uploads/2026/07/Transf-convencionales-y-autoprotegidos.pdf).

During the first opening, orbit, scroll, view selection, winding exposure and oil preview are suspended. **Esc** returns immediately from the displayed camera/equipment pose. An interrupted first opening is retried on the next visit. The wrapped coils, core, selector and mounting supports remain fixed. Detached exterior leads clear the cover and bushings; short internal leads retain their supports. After opening, drag to orbit, scroll to zoom, choose components and optionally expose winding layers or preview oil. Returning restores the closed exterior, camera, navigation and settings. Closing the game disposes owned inspection resources.

Version `rocha-transformer-interior-3`, animation `rocha-transformer-opening-1`. Maximum interior geometry is 27,536 triangles including optional oil, below the 30,000 limit. Complete opening uses at most nine opaque draws including pole context, plus one optional oil draw; the clipped wall is hidden after the reveal. Closed inspection adds zero draws. No image textures, lights or rendering passes are added. Motion vectors include cover movement and previous lead deformation; moving parts use dynamic shadows only during travel. The survey, roads, plots, buildings, water, rainfall inputs and closed pole geometry remain unchanged.

Review controls at `test/transformer-interior-review.html?bench` capture opening stages, record live transitions, check all quality/water states, and compare fixed-camera timings. Evidence and limitations are saved under `results/rocha-transformer-opening`. The server remains on 5195; temporary review games are destroyed after each check.
# Proposed overhead electrical network

Rocha loads `rocha-overhead-network-3` separately from the immutable survey and
registered layout. Maps → Proposed overhead network provides visibility,
station review and interior inspection. The R02 edge correction has
**451 physical supports**, including the 38 transformer supports, and **337 grouped
service derivations**. This replaces 2,762 generated poles/posts. All 776 plots,
17 locales and four common panels retain exactly one supply assignment. Vacant
plots have planned frontage connections, without an automatic tall customer mast.

The original 38 candidate locations and ratings remain: 32 × 75 kVA,
four × 112.5 kVA and two × 150 kVA (3,150 kVA total). The fictional demonstration
pole remains separate. The paper comparison has 495 supports at 35 m, 448 at
40 m and 387 at 50 m. These are geometry studies, not universal permitted spans
or a proven minimum. The selected layout uses one roadside physical schedule;
compatible MV/LV circuits share supports while secondary circuits stay separate.

The revised drawings and editable calculations are in
`outputs/rocha-overhead-redesign-20261005`. They use vector circulation axes and
surveyed ground queries, not the former routing raster. Twenty-two nearby junction supports were merged
after checking every affected span; the consolidation schedule records each ID.
Numbered supports,
original survey coordinates, circuit spans, grouped services and actual lengths
are provided in CSV, DXF, SVG and PDF. The commercial parking branch includes a
26.20 m estimated electrical spur across the source access gap. No road, terrain
or planting geometry is added or altered; legal access and tree clearance remain
pending. One conductor overhang extends beyond surveyed terrain: exterior ground
clearance is explicitly unverified. Known terrain samples clear the conservative
5.6 m study screen. Wind, tension, maximum-temperature sag, pole class, foundations
and site-specific RETIE classifications require engineering review.

This is a proposed visual installation, not an approved or energized network.
Afinia has not confirmed the utility connection, accepted supply voltage or fault
levels. The earlier 32 station land reservations, four frontage conflicts,
historical conditional voltage flags and exploratory rainfall flags are retained.
The updated route-based screen identifies **52 services above the provisional 3% voltage
threshold** and **14 reserved drops longer than 40 m**. Those are unresolved design
items; no claim of complete voltage-drop or mechanical acceptance is made. The
208 V line-line phase-pair sensitivity uses stated hypothetical impedances;
phase-neutral loading, phase balance, neutral currents, ampacity and actual
conductors need a separate final calculation. Conservative mapped canopy
reservations are recorded without deleting or reseeding existing trees.

The historical 350 kWh/month estimate describes one regularly used AC and does
not size equipment. Afinia's published aerial LV criteria require at least two
9,000 BTU AC units in the new-network household load census. The workbook keeps
these concepts separate: an illustrative 6.1 kW connected census, provisional
2/3 kVA diversified scenarios, and an additional-AC upper sensitivity. In the
latter, 21 stations exceed the 80% planning target and seven exceed their rating.
Utility-accepted NTC 2050 demand calculations and equipment schedules remain
pending. Aggregate capacity alone does not resolve individual overloads.

Static equipment uses spatial instancing and existing materials/shadow passes.
Grouped derivation boxes are shared; no textures, lights or passes are added.
Station exteriors use estimated scaling from the Rymel-inspired shell. Interiors
remain representative reconstructions cached by capacity; only the selected
assembly is replaced during inspection. All six quality levels, water and
Surveyed terrain retain the network. Hiding it disables its own collisions and
picking. `?overheadNetwork=off` remains the fresh-game performance reference.

R02 moves 410 ordinary supports outside actual vector circulation boundaries;
38 transformer coordinates remain unchanged. The entire circular base/collider
leaves at least 0.02 m to paving. This is a representation tolerance, not a
regulatory clearance. Three shared supports split pairs made longer than 40 m by
the relocation. There are 308 MV supports and 307 MV spans in 8.130 km; the complete
MV/LV game network has 451 supports and 820 circuit spans. Original support IDs,
MT labels, services, road geometry, terrain, water and seeded content are preserved.
355 private plot reservations in the complete network remain unconfirmed.

The R02 package is `outputs/rocha-mt-20261005-r02`; R01 and the archived 35/40/50 m
studies are preserved. It includes 106 vector A1 sheets, three DXF drawings, a
10-sheet workbook, CSV displacement/quantity/conflict schedules and the actual
version-3 game asset. It remains **Diseño condicionado para revisión — no liberado
para construcción**. Four supports require mechanical reconfiguration under the
partial MT screen; one span has an exterior phase with unknown ground clearance.
The base conditional flow recalculates 76.233 A, 5.0699 kW loss and 0.5219% maximum
drop without source impedance. The workbook's editable approximation is explicitly
separate from saved nonlinear and mechanical results.

Maintainer preparation, in order:

1. `tools/redesign-rocha-overhead.py` prepares the new edge correction and validates
   it independently in `outputs/rocha-overhead-roadside-r02`. It never overwrites
   the archived spacing studies or R01. Python preparation uses NumPy/SciPy/Shapely.
2. Run the R02 `preparation/prepare.py`, `draw.py`, `workbook.mjs`, `normalize_cad.py`,
   `schedules.py` and `render_qa.py`. Review the drawings and workbook.
3. `tools/prepare-rocha-overhead.py` requires matching network, geometry validation
   and R02 model checksums before publishing.
4. Run `tools/prepare-rocha-overhead-minimap.mjs` and
   `tools/package-rocha-overhead.mjs`. Then run R02 `preparation/copy_visual.py`
   and `validate.py` to bind the delivered coordinates to the installed asset.
   Rerun tests, rebuild production, capture review evidence, then run R02
   `preparation/package.py` to create the checksummed delivery ZIP.

Playing or installing requires no Python or CAD software. Preparation retains
separate network assets and earlier map corrections. The dated backup is
`.rocha-roadside-poles-backup/20261005-211736`; before/after captures, browser GPU
measurements, ground traversals and test limitations are in
`results/rocha-roadside-poles/VALIDATION.md`. No new materials, textures, lights or
passes are introduced. R01 and all earlier backups/reports remain intact.


## Southeast cross-street and underground revision R02

The complete mapped 189.6 m × 9 m zahorra street and junction are published as the additive `southeast-cross-street` repair: 67 terrain-clipped triangles, 0.038 m lift and six bounded batches, using the existing shared material. Earlier repairs and the immutable survey remain intact. T03, T09 and T11 move to the approved roadside reserves near X=99.429/97.521/95.613, Z=352.960/355.251/357.542 m. The other 35 underground station records and aerial equipment positions are unchanged. Full base/access checks leave circulation and mapped parcels free; all 38 legal reservations remain pending.

Updated actual underground routes, coordinates, conditional voltage-drop/loss calculations and old/new schedules are delivered in `outputs/rocha-underground-network-20261006-r02`. Longer low-voltage routes can fail the existing study limits; publication of scenery does not resolve them. Documents remain **Diseño condicionado para revisión — no liberado para construcción**. Exact geometry, browser evidence and measurements: `results/rocha-southeast-road`. Maintainer preparation: incremental relocation of T03/T09/T11, underground asset preparation, then `tools/package-rocha-southeast-road.mjs`. The base/recreation/lake stages retain multiple named repairs and reject unreviewed overwrite.

## Realistic compacted zahorra — candidate version 3

`rocha-zahorra-3` uses an original deterministic 512 × 512 packed texture: linear
RGB aggregate color and alpha-channel shallow height. It depicts embedded stones
in compacted fines, with restrained dusty variation around `#A9A391`. Visible
grain sizes are artistic estimates; the material does not establish permeability.
The 0.63 m world-space scale and orientation match the terrain and road overlays.
Apparent relief is capped at 2 mm; the generated maximum is approximately 1.30 mm.

The ten mip levels are baked offline and uploaded once, totaling 1,398,100 bytes
(1.33 MiB) per device/game. The resource is shared and released during cleanup.
Overlay roads use one lookup for color and relief. Terrain samples the dedicated
texture only where the registered road mask contributes, using explicit sampling
gradients and uniform normal derivatives. Generic terrain detail, meshes, masks,
collisions, shadow passes and surveyed elevations remain unchanged.

Use `?world=rocha&zahorra=realistic` for the candidate and `zahorra=legacy` for
version 2. All five comparison pairs completed; three were rejected for
unchanged-pass timing drift, leaving two valid pairs. Performance acceptance is
unconfirmed, so the production default remains version 2. The decision and signed comparisons
are recorded in `results/rocha-zahorra-realism/performance-summary.json` and
`REPORT.html`; do not infer an FPS gain from callback cadence or queued throughput.
The integrated-browser review is `test/zahorra-realism-review.html` on port 5195.

Preparation: `node tools/bake-rocha-zahorra.mjs`,
`node tools/package-rocha-zahorra.mjs`, then the production build. The baker saves
the seed, channel encoding, dimensions, references and SHA-256. Review evidence
includes matched close, road-level, aerial and nighttime screenshots, reference
rendering, quality/water/network controls and five alternating fresh-game pairs.
The timestamped pre-change installation is preserved under
`app/.rocha-zahorra-backup/realism-2026-10-10T18-37-40-154Z`; older backups remain.


Rocha incluye dos viviendas contenedor de muestra: lote 775 (12,10 × 3,60 m) y lote 776 (12,10 × 6,90 m). Selección en Maps → Viviendas contenedor. La nueva casa reutiliza materiales y añade 10.468 triángulos; no modifica el levantamiento ni las redes. Ver ROCHA-CONTAINER.md y results/rocha-container-large.

## Lightweight countryside backdrop — candidate version 1

`?world=rocha&exterior=landscape` selects an artistic countryside backdrop;
`exterior=flat` selects the unchanged measured grey-green fallback. The production
default remains flat until the five valid paired acceptance measurements pass.
The scenery does not represent verified geography outside the surveyed boundary.

The 1024 × 1024 ground image and 2048 × 512 transparent-sky horizon panorama are
packaged locally with offline linear, premultiplied mipmaps. Together their
compressed downloads occupy 2,724,074 bytes (2.60 MiB); RGBA8 allocation including
all mipmaps occupies 11,184,816 bytes (10.67 MiB). RGB authoring quantization is
3/255 in linear space; the channel-predictor/gzip download encoding is lossless
relative to the prepared images. There are no runtime image-generation or mipmap
render passes. Textures are shared per device and released after the last lease.

The existing empty-depth background draw projects ground onto a virtual plane
0.05 m below the survey's minimum elevation (14.913920042 m). This plane provides
no depth, ground query, collision or rainfall input. The panorama is rotation-only;
ground motion includes camera translation. Existing sun/moon irradiance, sky
irradiance, exposure and restrained day/night haze shade both images. Local lamps
and flashlights do not light this distant scenery. Clouds, moon and stars remain.
No exterior meshes, shadow casters, lights, animation loops or passes are added.

Ordinary walking and flying now use swept movement against the union of the
survey boundary and the existing narrow demonstration-pole support/access area.
Movement slides at the edge; stationary scripted cameras, transformer inspection
and precision poses are preserved. Walking support is recomputed at an accepted
boundary position, preventing exterior fallback heights from sinking the player.
Map geometry, roads, parcels, equipment, planting seeds and rainfall stay intact.

Preparation: `node tools/prepare-rocha-backdrop.mjs` (authoring inputs are preserved
in the results folder); packaging: `node tools/package-rocha-backdrop.mjs`.
Use the launcher's root `npm run build` for production. Review controls are at
`test/countryside-review.html` on 5195. Evidence, matched captures, motion recording,
raw GPU/CPU samples, live application FPS, completed throughput and callback
cadence are kept separately in `results/rocha-countryside-backdrop`. Native display
scanout is not measured by browser completion counts. Device/loading/hidden-tab
failures and timing-drift pairs are rejected, rather than interpreted as zero cost.

The scheduled trial did not establish five valid pairs, so this delivery retains
the flat production default. The landscape remains an explicit opt-in candidate;
its FPS acceptance is unconfirmed. `performance-summary.json` contains the
signed accepted-pair statistics; `signed-comparisons.csv` also preserves rejected
observations. All variants use the same frozen updated build, with only the
exterior query changed, so these stationary-camera measurements isolate the
backdrop. Swept-boundary movement is checked separately and is common to both.
Visual acceptance is also unmet: full-map aerial views expose repeating planar
ground imagery and a tonal boundary; close approaches show the abrupt survey
edge. The horizon reads better from ordinary entrance views. These limitations
are shown in actual captures rather than hidden by promoting the candidate.

Audit correction: the initial TAAU timing sentinel was unsuitable as a standalone
drift detector, because that shader branches on image luma, history and locks.
New background detail can legitimately increase its cost. Those original flags
remain recorded, but eligibility uses independent FFT/cloud-trace timings,
matching settings, complete samples and a stable power source within each pair.
The relative drift threshold is 10%, with absolute floors of 0.131072 ms for FFT
and 0.15 ms for cloud trace to account for browser timestamp quantization. This
does not establish the cause of hardware timing changes. No samples are filtered
according to whether their FPS result is favorable.
# Overhead pole measurements

`rocha-overhead-measurements-1` adds **Maps → Red eléctrica propuesta → Mostrar distancias entre postes / Tabla de vanos**. Switch to the aerial alternative first. Measurements start disabled; they do not change the underground default or equipment locations. The SVG overlay shows at most 24 nearby physical spans, fading from 80 to 100 m. The searchable, sortable, virtualized table covers all 453 physical spans formed by 820 MV/LV circuit records and 451 poles. Shared circuits receive one dimension. Selecting a row frames the span without moving equipment.

H is horizontal distance between pole axes. The table separately reports signed base elevation change (destination minus origin, IDs sorted) and straight base-to-base 3D distance. Three decimal places describe the digital model, not field survey precision or sagging conductor length. The 22 spans below 5 m, including two below 1 m, are review flags rather than design-error or compliance determinations. The 40 m check is an existing illustrative scenery limit, not a regulatory clearance.

Prepared full-precision CSV/JSON files are `rocha/overhead-span-audit.csv` and `rocha/overhead-span-audit.json`, bound to the original overhead asset checksum. Audit/source errors reject incompatible prepared data. Disabled measurements have no projection/layout or GPU work. Enabled measurements use cached SVG elements and the existing UI frame update; no scene meshes, textures, lights, shadows or rendering passes are added. Inspection, precision mode, hidden network and underground mode hide the overlay. Owned UI/resources are disposed with the game.

Reproduction, screenshots and performance evidence: `results/rocha-overhead-measurements`. The existing pole positions, geometry, engineering documents and historical cameras remain unchanged.

Five alternating fresh-game off/on pairs were recorded at identical fixed views, 1920 × 1080 GPU output, scale 1, Full, 120 warm-up and 300 measured frames, with completed throughput and separate 10-second callback cadence. Enabled SVG updates averaged 0.10–0.29 ms, meeting the 0.3 ms mean target. Game draw/triangle counts were unchanged. Overall GPU timings varied substantially between runs, so displayed FPS impact and stable performance acceptance remain unconfirmed. Browser SVG compositing is outside the GPU timestamp pass measurements; tiny GPU-readback differences are recorded rather than represented as pixel identity. Measurements remain disabled initially.

