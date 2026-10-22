# Main-saloon realism audit — 22 October 2026

The initial revision failed visual review. The current work corrects its major
layout errors and rendering artifacts, but remains an approximation. No claim
of photographic parity with the modern-bedroom example is made. Functional
results, captures and measurements belong in the published review report;
passing a loading or navigation check does not establish visual fidelity.

## Reference workflow

The public [img2threejs repository](https://github.com/img2threejs/img2threejs)
provides a staged reconstruction workflow. Its detail inventory requires each
observed feature to map to geometry or materials, and its material contract
requires regional browser comparisons. Adopting its renderer or installing its
tools does not establish likeness. The bedroom is a separately authored scene.

The yacht implementation is independently authored. Its current geometry is
based on the [Azimut tour](https://vrcloud.com/?pv=1667308298), its side and ceiling
views, and the tour's public main-deck plan. The plan supports arrangement and
chair count, not the estimated coordinates of this reconstruction.

## Corrections to the initial interpretation

- One opposing pair of display niches replaces the duplicated mirrored pairs.
- The aft lamp cabinet is on port, aligned with the side wall. Starboard has a
  full-height veneer panel and dark pull. The two window layouts are asymmetric.
- The oblong dining table runs across the beam, with ten seats. Rounded chair
  backs face away from the table, and the tabletop has a dark perimeter.
- The dining oval is ceiling-mounted with a luminous perimeter and central
  diffusers. The previously inferred suspension wires have been removed.
- The saloon coffer has an annular lip and a visible recessed centre. A solid
  cylinder in the earlier model had hidden that centre.
- Cushions now use sewn panels, perimeter piping and shallow corner folds.
  Chair volumes, floor grain, rug variation and stone maps have been revised.
- Three spatially blended local reflection captures retain the static visible
  luminaires. A separate native presentation sun matches the viewer's live sun;
  it is excluded from ambient bakes and reflection capture.
- Coastal sky/scenery use a CC0 Poly Haven HDRI. A physical Blender water plane
  occludes the near beach in the environment bake. This is illustrative scenery,
  not the reference yacht's actual anchorage.

## Artifact diagnosis and prevention

Diagnostic browser material-ID passes identified the extremely thin, long tube
meshes for floor joints appearing through foreground furniture. The dots remained
without textures, lightmaps or receiving shadows and also appeared with the
uncompressed model. Removing the joint meshes removed those visible artifacts.
Position, normal and both UV attributes match across meshopt compression.

Floor joints now use physical-scale texture maps. Ceiling lines are filtered
across the pixel footprint in the material. Atlas packing now measures coverage and degeneracy, reducing its margin until
coverage exceeds 25%. A fixed large fraction had collapsed the furniture atlas;
that failed browser capture was rejected. OIDN filters the full atlas; preserving unfiltered edge pixels produced visible
Monte Carlo noise on thin curved parts. The final viewer uses full-precision half-float EXRs with linear filtering and
verified vertical orientation. Lossy atlas compression produced visible color
errors at thin chart edges. The two atlas uploads use 64 MiB on the GPU; all
surface texture maps retain KTX2 compression. A minimal Blender
bake also verified that the selected UV1 layer is the bake target while physical
material maps explicitly read UV0.

The ambient source environment, source GLB, raw bakes and editable master carry
SHA-256 records. Geometry/UV and environment bindings reject stale lighting
assets. The original yacht publication is checked against its 629 baseline file
hashes; its files are outside the new page's build output.

## Remaining limits

Furniture profiles, exact dimensions, hidden supports, some small fittings and
finish identities remain inferred. Materials are authored approximations, not
manufacturer-matched scans. Static reflection probes cannot reproduce every
view-dependent reflection. Reference-photo cameras have not been calibrated from
an as-built survey. Matched comparison images establish before/after consistency
between the two digital models, not pixel agreement with the tour.

Cloud Chromium uses ANGLE SwiftShader. Its actual rendered sequences are useful
for correctness and resource stability, but cannot establish desktop 60 fps or
mobile 30 fps. Those targets still require physical-device measurements.

Scope remains the main saloon and adjoining dining area only. The tour identifies
an Azimut Grande 36M; it does not prove that its photographed vessel is Luz de Mar.
At the initial audit, the separate public URL returned 404; publication status is
reported separately after deployment verification.
