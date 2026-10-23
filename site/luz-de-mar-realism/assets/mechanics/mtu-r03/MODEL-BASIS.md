# MTU 16V2000M96 R03 · Luz de Mar

Two metric instances replace the fitted engine proxies when the machinery room
is entered. The complete exterior loads first. The cutaway and native actions
load only when inspection or playback is requested. A failed load retains the
previous complete representation. Walking and the two service doors retain their
existing supported routes.

Open **Inspeccionar motores MTU** (keyboard **K**) in the machinery room. Select
**Babor** or **Estribor**, enable **Mostrar corte**, then use **Reproducir**,
**Pausar**, **Reiniciar** or the cycle slider. Only the selected engine is cut.
Leaving the room or hiding the browser tab pauses playback. The illustrative
eight-second loop represents 720 crank degrees, not operation at 2450 rpm.

## Source and export

- User-provided [MTU_16V_2000_M96_R03_package.zip](https://drive.google.com/file/d/1WLZXuvsGxxrnXauWJ5A8PlYWofR0p7T0/view).
- Native SHA-256: `2b94d601027673a0506136c165c4c3a3a95f59f3646ed3d2eb8b6540f20c4580`.
- The original Blender file is unchanged. Display meshes evaluate its modifiers,
  simplify derived copies, and retain native spring vertex correspondence.
- Cut surfaces come from **02 CUTAWAY | animated mechanics**. Saved actions are
  sampled in **01 INTACT | exterior**, which contains the complete dependency
  graph, at 240 frames / 30 fps. No downloaded Python build script is executed.
- Rigid descendants share their animated ancestor channel. Spring channels share
  a channel only if their complete saved F-curves agree. Current and previous
  poses drive geometry and motion vectors in the existing rendering passes.
- Both engines share the same exterior geometry. Internal geometry and animation
  remain absent until requested. No owner photographs become public textures.

## Placement and evidence

[Azimut's lower-deck general arrangement](https://azimutyachts.com/wp-content/uploads/2022/04/Lowerdeck_Grande36M.jpg)
and page 25 of the [September 2022 manufacturer brochure](https://www.azimutyachts.co.il/Uploads/media/grande%2036m%20sept%202022.pdf)
show two parallel longitudinal engines forward of the tender garage and aft of
the guest accommodation. These are general arrangements, not engine-bed or
serial-specific installation drawings.

The [MTU 3238241 dimensional sheet, edition 01/20](https://www.mtu-solutions.com/content/dam/mtu/products/yacht/main-propulsion/mtu-series-2000/3238241_MTU_Marine_spec_10V12V16V2000M96_1DS.pdf/_jcr_content/renditions/original./3238241_MTU_Marine_spec_10V12V16V2000M96_1DS.pdf)
lists an approximate engine envelope of 2258 × 1293 × 1453 mm and 1790 kW /
2400 bhp at 2450 rpm. With the standard ZF 3060 the listed overall length is
3078 mm. The delivered Blender asset is the engine alone; the vessel's gearbox
representation remains a separate fitted assembly, with no new exact-type claim.

Retained owner photographs WA0002/03 identify two 16V2000M96 engines, 1790 kW,
2450 rpm, manufactured 2022/05. Their plates state 3680 kg, while the generic
catalogue states 3450 kg dry; those different references do not establish equal
options or weighing conditions. Serial numbers are not assigned to vessel sides.
The [Luz de Mar broker listing](https://www.northropandjohnson.com/yachts-for-sale/luz-de-mar-115-azimut-yachts)
also lists the 2400 hp engine upgrade.

Source yacht coordinates are X forward, Y port, Z up. Native engine coordinates
are driving end −X, cooling end +X, bank A +Y, bank B −Y, Z up. The display uses:

```
sx = 35.23 / 36; sy = 7.47 / 7.6
x0 = 9.72 + 1.089 / sx = 10.832801589554357
source(X,Y,Z) = (x0 + X/sx, ±1.20 + Y/sy, 1.42 + Z)
```

Compensation for the inherited yacht display normalization preserves the motor's
physical scale and handedness. The native coupling point (−1.089,0,0.52) meets
the fitted gearbox input (9.72,±1.20,1.94). Foot bottoms are at Z=1.484, below the
Z=1.58 walkway, and the engine top is approximately Z=2.937. Replacement bearers
meet the feet; short exhaust adapters meet the retained insulated installation
exhaust. These are authored installation fits, not surveyed vessel dimensions.

The nominal envelope leaves approximately 1.066 m between engine bodies and
0.845 m between the interior guard-rail centre lines. Tube thickness reduces the
rail clearance. Those values describe this reconstruction, not certified service
clearances on the real yacht.

## Limits

The R03 source explicitly identifies its internal castings, cam laws, accessory
packaging and mechanism geometry as nominal. Geometric and animation checks do
not establish OEM identity, physical performance, installation approval or an
as-built digital twin. Photographs govern visible vessel finishes where readable;
hidden connections and precise mounting dimensions remain inferred.
