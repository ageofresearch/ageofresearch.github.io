# Luz de Mar in Rocha

Imported from the user-provided WEB R03 / corrected CAD R02 package. The 694 source component records and original mesh binary are retained. Runtime geometry is batched by deck and finish.

Listing dimensions: 35.23 m length, 7.47 m beam, 2.01 m draft. The source's two-axis display normalization is preserved; vertical levels and the waterline datum remain illustrative. The model is a provisional reconstruction, not an as-built survey. The source does not establish the association between hull MD283_012 and the vessel name.

Rooms, furniture and the base navigation masks come from R03. The current photo-guided stair pass adds continuous guest, bridge, terrace and sun-deck circulation through derived display openings and navigation overlays. Room jumps remain optional. The reconstructed optional sun deck is now visible initially and can be hidden with its existing control. Piping remains in the source binary but is not drawn in the ordinary walkthrough. Original PDFs are retained in the private reference workspace, not published with this map.

## Interior display refinement · salvagni-reference-1

The original R03 binary, hull, deck levels, partitions, stair openings and collision masks are unchanged. Selected furniture display meshes have rounded upholstery, separate cushions, thin tabletops with open pedestal bases, cabinet joints, folded blue-grey coverlets and padded headboards. Walnut window surrounds and shallow ceiling reveals complete the earlier ivory/wood/blue palette. These details are visual estimates, not measured component drawings. Furniture replacements remain inside their original component envelopes; headboards sit within the original berth-base footprints. The supplied ten upper dining seats and six forward service berths remain present.

References are Azimut's earlier Salvagni-era Grande 36M model photographs, rather than the different m2atelier interior announced in September 2025:

- [Saloon and joinery](https://azimutyachts.com/wp-content/uploads/2023/10/G36M-Salon-2_Low-res.jpg)
- [Owner suite](https://azimutyachts.com/wp-content/uploads/2023/10/G36M-Owner-Suite-1_Low-res.jpg)
- [VIP cabin](https://azimutyachts.com/wp-content/uploads/2023/10/G36M-Port-Side-Vip-Cabin_Low-res.jpg)
- [Dining furniture](https://azimutyachts.com/wp-content/uploads/2023/10/G36M-Dining-Area-1_Low-res.jpg)
- [Galley](https://azimutyachts.com/wp-content/uploads/2023/10/G36M-Galley_Low-res.jpg)
- [Wheelhouse](https://azimutyachts.com/wp-content/uploads/2023/10/G36M-Wheel-House_Low-res.jpg)

The [Luz de Mar listing](https://www.yachtbuyer.com/en/fleet/luz-de-mar-115-azimut) identifies Salvagni Architetti as the interior designer but supplies no authenticated interior photographs. The named yacht's exact finishes, optional furniture, electronics models, complete stair routes and construction dimensions remain unverified. Crew/service spaces retain their provisional layout; the model photographs do not establish those spaces aboard Luz de Mar.

Rendering retains 12 deck/material batches, shared materials, zero additional textures and the existing water, reflection, lighting and anti-aliasing passes. Added geometry is hidden with the cabin batches at distance. Warm cabin fill is an approximation of indirect daylight; cove edges are emissive surfaces, not new dynamic lights. The default sun deck remains hidden.

Complete Float32 vertex inputs are indexed without changing triangle order or attribute bits. The refined display has 59,237 triangles and approximately 3.33 MB of indexed geometry, compared with 41,645 triangles and 2.53 MB before refinement. Additional detail has a measurable rendering cost in isolated software-Vulkan tests; it is not a demonstrated mobile FPS improvement. Physical-device performance remains to be measured.


## Crafted object pass · salvagni-crafted-2

The two-lounge R03 configuration remains the layout basis. Pale fine-jointed interior timber is separate from warmer exterior boards, guest carpet, bathroom stone appearance and the dark galley floor. Fine sofa textile, coarse armchair textile, soft panels, brown glossy joinery, coated window reveals, brushed metal and polished fittings have distinct appearance-based recipes. Wood species, stone varieties and fibres are unverified.

This pass replaces complete chair assemblies, consumes their old back/pedestal proxies, segments the curved sofa cushions, rounds bed surrounds and bedside cabinets, gives guest throws separate palettes, recesses basin bowls, and adds faucets, shower fittings, galley equipment, an inclined display bank, steering wheel, controls, fitted ceiling coffers, lamps and restrained accents. Components carry stable part IDs, source IDs, material slots, inferred room membership, proposed bounds and shared batch ranges. These authored objects compile into the existing 12 batches; no texture, reflection target or light pass is added. Fine material and wall-joint detail is derivative-filtered in source metres. Opaque winding is corrected against normals before back-face culling; glass stays double-sided.

All 694 source records remain traceable; 81 engineering route symbols remain hidden. Ten upper dining chairs, six forward-service berth footprints and the supplied guest headboard orientations are retained. Original binary/layout/masks, principal dimensions, yacht placement, water, rendering resolution and AA remain intact. Material zoning and furniture shapes are photographic adaptations, not proof of this vessel's as-built configuration.

Exact as-built stair component dimensions, technical/service stair routes, exact machinery/crew finishes, later-generation interior details, unverified upper dining insets, working doors and live mirrors remain outside the verified evidence. The indirect fill is still a lightweight directional approximation, not a ray-traced room solution. The full Rocha map still requires a WebGPU adapter with 32 sampled textures; the separate water demo's Safari fallback does not supply a full Rocha WebGL renderer.


The crafted model has **62,923 triangles**, **12 shared batches**, **3,287,822 bytes of indexed geometry**, **987 individually registered display parts** and **137 finish-region records**. Sixty redundant chair/basin proxies are consumed by complete assemblies, leaving 553 nonempty source-component ranges plus the added details; all 694 source records remain in the audit. Three lower-deck interior linings now open at the existing exterior window positions. The original source binary, window positions and solid floor-level collision boundary remain unchanged. Seven bathroom mirrors use a camera-dependent analytic room-box approximation with no live-object reflections.

Validation includes source-hash and dimensional checks, complete assembly bounds, outward winding, ten dining chairs, six forward service berths, all 31 room entries, desktop/portrait input, and native GPU views using the existing GTAO/TAA/ACES chain. Native timings are diagnostic software-Vulkan measurements, not mobile/browser FPS. See the local `results/luz-de-mar-realism` execution report for per-family evidence holds and raw timings.


## Helm floor depth correction · service-ceiling-fit-1

Three main-deck service proxies crossed their ceiling into the upper helm room. MD_FUR_038 and MD_FUR_039 had tops exactly coplanar with the upper floor (source Z = 6.00 m); MD_EQU_002 reached Z = 6.10 m. Their competing surfaces caused view-dependent color changes. The display compiler now fits each complete cabinet assembly, including attached joints, below the upper slab underside at Z = 5.88 m with a proposed 10 mm clearance. Normals receive the corresponding inverse-scale correction. Source binary, original dimensions/provenance, footprint, walking masks, floor finish and rendering settings remain unchanged. No triangles, batches, textures or passes are added.

A native depth regression at the actual georeferenced position reproduced the flashing before the change. Across twelve slightly different camera positions, the corrected upper floor fully occludes all three lower cabinets. Normal rendered floor/galley checks use the existing GTAO/TAA/ACES chain. This is a display reconciliation of provisional CAD geometry, not a surveyed cabinet dimension.


## Walkable stair pass · photo-guided-stairs-1

Four metre-scale routes now connect lower guest deck → main deck, main deck → bridge, aft main terrace → upper terrace, and upper port terrace → sun deck. The central upper stair is the arrival of the bridge connection; the sun deck uses its separate exterior port stair, as shown by the supplied plans and manufacturer upper-terrace photograph. Sixty-five flat footprint symbols compile into four coherent stair assemblies. Thirty boarding/service/technical symbols remain provisional; this pass does not certify machinery-space, crew or forepeak access.

Interior stairs use open pale inset treads, warm timber nosings, sculpted ivory enclosures and continuous dark handrails, guided by Azimut's earlier [Lobby](https://azimutyachts.com/wp-content/uploads/2023/10/G36M-Lobby_Low-res.jpg) and [Stairs](https://azimutyachts.com/wp-content/uploads/2023/10/G36M-Stairs_Low-res.jpg) photographs. Exterior flights use open treads, polished rails/stringers and clear guards; the sun-deck flight includes a dark swept outboard fairing, guided by [Upper Deck 2](https://azimutyachts.com/wp-content/uploads/2023/10/G36M-Upper-Deck-2_Low-res.jpg). These are model-series references, not authenticated as-built interior photographs of Luz de Mar.

Guest stairs use fourteen estimated 171 mm rises; bridge and aft terrace flights use twelve estimated 171 mm rises; the sun-deck flight uses fourteen estimated 157 mm rises. Clear tread widths are proposed fits of approximately 0.74–0.84 source metres. Turns, exact tread counts, component profiles and finishes are photographic adaptations to the provisional R03 deck levels, not measured construction details. The published 35.23 m × 7.47 m dimensions, 2.01 m draft, position and source deck levels remain unchanged.

The original JSON, binary and masks remain intact. The runtime compiler subtracts stair openings/notches from the appropriate slabs and canopies, includes their exposed edge faces, clears one upper return against a provisional lower ensuite lining, and opens the saloon stair-lobby doorway to a usable width. Derived navigation follows the same stair footprints and actual tread heights, blocks intermediate side exits and low under-stair headroom, restores only short clear landing strips and the reconciled lobby doorway, and eases camera height while climbing. It never teleports between floors. The sun deck is visible initially and is restored automatically when using its stair.

The display contains **69,931 triangles**, **12 shared batches**, and **3,590,858 bytes of indexed geometry**: +7,008 triangles and +303,036 geometry bytes over the prior crafted build. There are no additional textures, lights, render targets or lighting/reflection passes. Existing sunlight, materials, water, reflections, resolution and anti-aliasing settings remain in use. Native software-Vulkan costs are diagnostic, not phone FPS measurements.

Validation covers both directions on every flight, supported winders, physical deck openings, rail/side blocking, low-frame-rate movement, one connected floor network through the saloon and terraces, all room entries, keyboard and actual Chromium touch input, 1,212 compiled-geometry headroom samples, and the previous helm-floor depth regression. The retained bridge roof gives approximately 1.67 m of overhead clearance at the top: adequate for the current 1.60 m camera, not evidence of real-world human-envelope compliance. Reference geometry retains the source's illustrative vertical scale. Desktop and portrait inspection images use native Vulkan with the existing GTAO/TAA/ACES chain. The full Rocha browser renderer still requires 32 sampled textures per stage; the cloud browser's 16-slot adapter cannot validate that complete scene.
