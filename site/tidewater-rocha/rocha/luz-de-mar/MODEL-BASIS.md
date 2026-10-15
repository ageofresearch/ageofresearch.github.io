# Luz de Mar in Rocha

Imported from the user-provided WEB R03 / corrected CAD R02 package. The 694 source component records and original mesh binary are retained. Runtime geometry is batched by deck and finish.

Listing dimensions: 35.23 m length, 7.47 m beam, 2.01 m draft. The source's two-axis display normalization is preserved; vertical levels and the waterline datum remain illustrative. The model is a provisional reconstruction, not an as-built survey. The source does not establish the association between hull MD283_012 and the vessel name.

Rooms, furniture and navigation masks come from R03. Room/deck jumps are virtual; unresolved stairs are not completed by inventing flights. The optional sun deck is initially hidden. Piping remains in the source binary but is not drawn in the ordinary walkthrough. Original PDFs are retained in the private reference workspace, not published with this map.

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
