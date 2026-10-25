# Sources and credits

- Current yacht envelope and versioned snapshot: Luz de Mar / tidewater-rocha,
  published commit `36624f2403cfd27b7c7406514727c773dd7d3dfc`.
  See assets/manifest.json and the authoring archive for hashes and transforms.
- Primary visual reference: **Azimut Grande 36M — VRCLOUD**,
  https://vrcloud.com/?pv=1667308298, accessed 2026-10-22. Salon and Dining Area, Cockpit, Cockpit Port/Stbd, Port Side, Starboard Side, Forward Starboard Side, Bow Lounge, Bow Sunbed, Bow and Beach Club. All six cube faces of the ten exterior panoramas were reviewed.
  Its public main-deck plan also informed table orientation, chair count and
  asymmetric cabinetry: https://cdn-static.vrcloud.com/azimut-yachts/ma2805/content/main.png?v=p29279716.
  Reference images retain their owners' rights. They are not used as application
  textures or redistributed in this public site. Vessel identity is unverified.
- Veneer and pale floor grain derivatives: **Black Walnut Veneer 02**, Jenelle van Heerden,
  **Powered by Poly Haven** — https://polyhaven.com/a/black_walnut_veneer_02.
  CC0: https://polyhaven.com/license. Original map hashes are in the authoring
  archive. The wood species on the real yacht has not been established.
- Coastal sky and distant scenery: **Fish Hoek Beach**, Greg Zaal,
  **Powered by Poly Haven** — https://polyhaven.com/a/fish_hoek_beach. CC0.
  The near beach is occluded by an independently shaded water plane in an offline
  Blender panorama. This illustrative environment is not the photographed anchorage.
  Source hashes and the adaptation recipe are included in the authoring package.
- Other material maps, reference-led geometry, shaders and UI:
  independently authored for this pilot. Photographs guide forms and character;
  no reference image pixels were used as textures.
- Rendering dependency: Three.js 0.180.0, MIT — THREE-LICENSE.txt.
- Mesh compression: meshoptimizer 1.3.0, MIT — MESHOPT-LICENSE.txt.
- Texture codec and decoder: Basis Universal, Apache 2.0 — BASISU-LICENSE.txt.
- Offline HDR denoising: Intel Open Image Denoise 2.5.1, Apache 2.0.
- Technical rendering reference: img2threejs modern-bedroom,
  https://img2threejs.io/modern-bedroom/ and
  https://github.com/img2threejs/img2threejs-showcase/tree/main/showcases/modern-bedroom.
  Reviewed baked ambient/live-light separation, reflection probes, demand
  rendering and adaptive resolution. Its source, geometry and bundled textures
  were not copied. Yacht implementation authored independently.

The public img2threejs reconstruction workflow was also reviewed: https://github.com/img2threejs/img2threejs. Its staged visual/material review is a technical reference; installing or adopting its renderer does not establish photographic fidelity.

This is a visual reconstruction, not an as-built survey. Room dimensions are
inherited estimates. Furniture dimensions, some hidden shapes, exact placement,
material identity and light calibration are inferred. Improved rendering does
not provide additional evidence of dimensional accuracy.

Exterior reconstruction: own teak, outdoor woven textiles, stitching, furniture, jacuzzi, deck machinery and fixed water. These visually inferred forms are not manufacturer CAD. New Blender authoring archives are distributed through GitHub Releases; old saloon downloads are retained.

Machinery r11: evaluated geometry, equipment identities, native MTU exterior/
cutaway samples and seawater-filter assets imported byte-identically from the
published tidewater-rocha yacht. The MTU model originates in the user-provided
R03 Blender package; native source hash and nominal-geometry limits are recorded
in assets/mechanics/mtu-r03/MODEL-BASIS.md. The filter is a visual reconstruction
of owner-provided maintenance photos/video; its provenance and unknown equipment
identity remain recorded in assets/mechanics/sea-strainers/MODEL-BASIS.md.

The Engine Room panorama in the Grande 36M tour was inspected via the boat icon →
LOWER → Engine Room on 2026-10-22 UTC. Six complete 2048² cube faces and 24 valid
views inform the finish/light pass. The observation inventory records differences
from the imported equipment. Four transverse light fixtures and the ochre floor
grid are independently authored, with estimated placement. The tour photographs
are not redistributed or sampled as textures. Its visible brands identify the
tour's equipment appearance, without confirming models or equipment on Luz de Mar.

Left-engine grid candidate r12: independently authored installed exterior fitted
to the same private panorama reference, with a fixed estimated station and
documented contour controls. Compatible crankcase, mount, rocker-cover and
flywheel parts retain the nominal R03 source provenance. The original package,
original Blender file and right-engine asset remain unchanged. Paint, metal,
insulation, rubber and intake-weave maps are procedural authoring; the editable
scene and its source/validation inventory are distributed through GitHub Releases.
The geometric fit is an intermediate review milestone. Casing shapes,
accessories, cloth detail and finish remain under review.

Bulkhead VR R01 candidate (2026-10-24): independently authored cabinets,
pipework, motor/pump housings, wiring, supports and procedural material maps.
Native 2048² reference comparison uses 16-pixel cells and 8-pixel detail cells
from the same estimated panorama station. The tour photographs remain private,
are not included in Pages or Releases, and are never used as model textures.
Unseen dimensions and routing are estimates. The original engine model/material
assets and LDM-VR-EST-001 strategy remain unchanged. Strict visual acceptance
has not been established; this variant is opt-in rather than the default.

Authoring uses Blender 4.3.2/Cycles, Intel Open Image Denoise 2.5.1, and xatlas
0.0.11 Python bindings (MIT; https://github.com/mworchel/xatlas-python) to generate
independent lightmap UVs. Runtime geometry uses meshoptimizer and textures use
Basis Universal/KTX2 under the licenses already included in this distribution.

## KOHLER y equipos locales · VR R01

Reconstrucción propia a partir de la visita Grande 36M de VRcloud (https://vrcloud.com/?pv=1667308298), con una estación panorámica estimada fija. Las imágenes originales permanecen privadas. Carcasa, controlador, equipos superiores y materiales se modelaron en Blender; las profundidades ocultas y los apoyos son inferidos. Los rótulos legibles usan contornos de DejaVu Sans (https://dejavu-fonts.github.io/License.html). Las texturas de material publicadas son propias; se conservan las licencias Three.js/MIT, meshoptimizer/MIT y Basis Universal/Apache-2.0 anteriores.
