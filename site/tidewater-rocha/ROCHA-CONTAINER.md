# Vivienda contenedor · lote 775

Versión `rocha-container-home-2`, corregida el 8 de octubre de 2026 (Colombia). En **Maps → Vivienda contenedor**, «Ir al acceso» coloca al personaje caminando frente a los escalones. Acércate, mira la puerta y pulsa **E** a un máximo de 1,5 m. La misma tecla controla la puerta del baño y las dos correderas de la fachada. «Planta sin cubierta» oculta únicamente cubierta y cielo raso; «Restaurar cubierta» los recupera.

## Planta y estimaciones

La referencia `contenedor_container_rocha.jpg` conserva su checksum en `extras/rocha/container-home.json`. El módulo personalizado mide **12,10 × 3,60 m**, con unión central a 6,05 m, cerramientos de extremos de 0,22 m y divisiones de 0,14/0,15 m. La cadena parcial suma 12,09 m: se prioriza la cota general y se registra 0,01 m de cierre en el revestimiento del extremo del dormitorio.

Sala, comedor de cuatro puestos, cocina, baño y dormitorio siguen la distribución suministrada. La cama mide 1,50 × 2,00 m. Sofá, sillas, mesas auxiliares, armarios, sanitarios y área de ducha son interpretaciones visuales; no se presentan como detalles constructivos comprobados.

Las alturas adoptadas son 2,80 m exterior y 2,54 m libre, comparables al módulo habitable del [catálogo CONTAINEX CLASSIC Line, página 19](https://catalog.containex.com/catalog/CONTAINEX/es/catalogs/CLASSIC_Line/pdf/CLASSIC_Line.pdf). La referencia no identifica el fabricante de esta vivienda; el ancho de 3,60 m es personalizado. Vidrio de 2,20 m, puertas de 2,10 m, pendiente de cubierta del 1 %, implantación y mobiliario quedan marcados como estimados.

Posición local **509,571 / −514,613 m**, orientación **0,538 rad**. La envolvente de acceso 14,10 × 7,60 m cabe en el lote 775; la menor distancia muestreada al límite del lote es 2,20 m. La variación topográfica bajo la huella es 0,04964 m. El piso está a cota **45,58171 m**, 0,45 m sobre la cota máxima muestreada; seis apoyos penetran 0,12 m en el terreno representado. La nota «NPT +0,45» no permite identificar su datum: esta separación se registra como una decisión visual independiente.

## Estilo, interacción y recursos

Metal pintado turquesa `#5DBCB0`, marcos blanco envejecido `#F3EFE6`, puerta navy `#2E4F73`, interior crema, madera cálida y textiles claros. Se reutilizan las texturas y materiales del pueblo. Las paredes tienen huecos reales y el vidrio usa el pase transparente existente. La geometría se construye una vez; sólo las hojas activas actualizan posición y collider. Su recorrido dura 0,2 s y se comprueba contra la cápsula del jugador antes y durante la animación. Los colliders móviles no pertenecen al índice estático.

La casa tiene **7.312 triángulos**, **10 grupos opacos y 6 transparentes**, una luminaria en el sistema existente de ocho luces, cero texturas GPU y cero pases nuevos. Los grupos tienen límites para culling, sombras estáticas en reposo y movimiento correcto en hojas animadas. El esquema de color no congela la iluminación: responde al cielo, al sol y a la noche de Tidewater.

`app.world.containerHomes` conserva fuente, medidas, estimaciones, posición, elevación y conteos. El activo se carga separado de `rocha-data.json`. Las máscaras de hierba derivadas cambian sólo bajo la vivienda y su acceso inmediato; no se aplanan ni sustituyen triángulos del TIN. No cambian calles, lluvia, agua, redes eléctricas, árboles dibujados, semillas anteriores, aparición ni cámaras históricas. La vivienda continúa visible en los seis niveles de calidad, ambas redes, ambos estados del agua y Surveyed terrain.

## Unión de cubierta y vidrio · versión 2

Una fascia continua de blanco envejecido cierra la fachada desde 2,2725 hasta 2,604 m sobre el piso. Los remates duplicados, las caras laterales de la antigua losa y las caras exteriores coincidentes de soportes se eliminan. Los retornos laterales y el cielo raso cierran el perímetro interior a 2,54 m; la piel superior conserva la pendiente del 1 %. La fascia pertenece a la fachada fija y continúa visible al ocultar la cubierta.

La secuencia aleatoria anterior se conserva: madera, mobiliario, puertas, vidrio y apoyos mantienen sus atributos y semillas. Cambian únicamente los remates, el cierre y las caras de encuentro de los extremos. La versión elimina 64 triángulos, manteniendo diez grupos opacos y seis transparentes. La prueba de regresión usa geometría de la versión 1 para reproducir el defecto y comprueba toda la franja nueva; las intersecciones menores a 1 mm² se consideran redondeo numérico Float32.

La revisión de esta corrección está en `results/rocha-container-trim`: capturas antes/después a 1920 × 1080, cámaras coincidentes, controles, calidad, agua, noche, movimiento, cubierta desmontable y mediciones separadas de GPU/CPU/cadencia. El respaldo de la versión anterior está en `.rocha-container-backup/2026-10-08T06-13-36-026Z-trim`. La herramienta `test/container-trim-review.html` mantiene partidas frescas y libera cada dispositivo antes del siguiente. Las mediciones son exploratorias; la cadencia de callbacks no demuestra FPS presentados.

## Revisión y recuperación

Evidencia en `results/rocha-container`: capturas WebGPU de fachada, extremos, cubierta, sala, cocina, dormitorio, acceso, noche, aperturas y planta; `validation.json` contiene comprobaciones de los 24 estados calidad/agua/red, restauración y la isla original. `REPORT.md` indica las comprobaciones realizadas y las limitaciones finales.

La herramienta `test/container-review.html` permite capturas y comparación secuencial a 1920 × 1080, escala 1 y calidad Full, con 120 frames de calentamiento, 300 medidos por vista y 10 s de cadencia independiente. El modo de referencia `?noContainer` omite la casa y su máscara derivada en el mismo build, conservando las cámaras de revisión. La cadencia de callbacks no es FPS presentados. No se supone un coste cero ni una mejora de FPS al añadir la casa.

Los archivos previos se conservan en `.rocha-container-backup/2026-10-08T04-24-20-642Z` (nombre en UTC); otras copias anteriores permanecen intactas. Instalaciones futuras reciben constructor, activo, referencia documental y UI por el plan protegido del launcher. Verificación: `node --test test/rocha-container.test.mjs`, `npm test`, pruebas de optimización y `node launcher.mjs build`.


## Segunda vivienda · lote 776

La versión `rocha-container-large-1` añade una vivienda de **12,10 × 6,90 m (83,49 m²)** en **492 / −484 m**, yaw **0,538 rad**. La referencia `IMG-20260923-WA0007.jpg` se conserva en `rocha/container-large-plan.jpg` y su checksum en el activo independiente. Las dimensiones de planta siguen el dibujo: divisiones longitudinales 6,05 m, transversales 3,45 m, extremos 0,22 m y particiones 0,14/0,15 m. Se registra el cierre de 1 cm de la cadena longitudinal parcial.

Dos dormitorios, dos baños, sala con sofá y dos sillones, comedor de seis puestos y cocina/bar con tres taburetes. La entrada está en el extremo corto; cinco hojas abatibles y cuatro correderas usan E a 1,5 m con animación de 0,2 s. Los muebles y duchas son estimaciones; se reserva circulación para la cápsula existente. El sofá mide 1,95 m para permitir el paso frente al acristalamiento.

La cota del piso es **45,497472 m**: 0,45 m por encima del máximo TIN exacto de la huella. La variación bajo la casa es **0,040033 m**. Nueve apoyos llegan al terreno sin modificarlo. La envolvente de acceso permanece en el lote, con al menos **6,946 m** de margen muestreado. Cubierta estimada de dos planos al 1 %, 2,80 m exterior y 2,54 m libre; fascia blanca continua en ambos acristalamientos. La nota NPT no identifica datum.

En **Maps → Viviendas contenedor**, seleccionar «Grande · lote 776» o «Original · lote 775». Se inicia seleccionada la grande; «Ir al acceso» inicia la exploración a pie. El punto de aparición general no cambia. Cada cubierta se controla de forma independiente. `app.containerHomes` contiene ambos controladores, `app.containerHome` conserva el original y `app.world.containerHomes` contiene sus registros. Las cámaras antiguas conservan sus valores; las nuevas usan el prefijo `containerLarge`.

La adición usa **10.468 triángulos, 15 grupos opacos y ocho transparentes**, una luminaria dentro del límite compartido de ocho luces, sin nuevas texturas ni pasadas. La geometría de las 16 mallas originales permanece idéntica byte a byte. `?noLargeContainer` omite sólo la nueva casa y su máscara para la comparación; `?noContainer` sigue omitiendo ambas.

Revisión integrada: `test/container-large-review.html`. Evidencia y medidas en `results/rocha-container-large`; incluye los seis niveles de calidad, ambos estados del agua, ambas redes, terreno topográfico, apertura/cierre, navegación, cubierta, noche y la isla original. Las cifras de cadencia se informan separadas de los tiempos GPU/CPU. Alturas, implantación, mobiliario y cubierta siguen siendo estimaciones visuales.

## Medidas exteriores manuscritas · versión 1

Las dos viviendas muestran automáticamente tres cotas al acercarse: lote 775, **12,10 × 3,60 × 2,80 m**; lote 776, **12,10 × 6,90 × 2,80 m**. En **Maps → Viviendas contenedor → Mostrar medidas** se pueden ocultar sin mover la cámara. La selección es local a la sesión.

La altura exterior estimada mide de −0,16 a +2,64 m respecto al piso terminado: incluye el suelo estructural y el punto máximo de la cubierta, excluyendo apoyos y cimentación. Se emplean las dimensiones estructurales, no los remates decorativos ni la caja global de la escena.

Trazos marfil cálido, pequeñas irregularidades deterministas y letra **Caveat**, incluida localmente con licencia SIL OFL en `fonts/caveat`. Inspiración: [model-viewer](https://modelviewer.dev/examples/annotations/), [xeokit](https://xeokit.io/examples/measurement/) y [Rough.js](https://roughjs.com/). No se carga un servicio externo ni se añade Rough.js como dependencia.

Visibilidad completa hasta 35 m del exterior y reducción gradual de 35 a 45 m, con transiciones de 0,2 s. Las cotas siguen la cámara sin retraso; el cambio de lado tiene una banda de 1 m para evitar oscilaciones. Se ocultan en interiores, inspección de transformadores, tras el plano cercano o fuera de la pantalla. El sistema mantiene texto horizontal, evita el panel y otras etiquetas, y suprime cotas que no caben. Permanece en modo foto y respeta movimiento reducido.

El controlador `ContainerMeasurements` proyecta puntos preparados en un único SVG; no crea mallas, texturas de juego, luces, sombras, pases ni lecturas de profundidad. Las líneas son diagramas superpuestos: no tienen oclusión real por la profundidad de la escena. Utiliza el rectángulo CSS del lienzo y la proyección WebGPU con profundidad invertida, independiente de escala de renderizado o densidad de píxeles. Se actualiza en el ciclo existente y libera elementos y listeners al cerrar.

API: `app.containerMeasurementsEnabled`, `app.setContainerMeasurementsEnabled(boolean)`. Los informes incluyen `containerMeasurementVersion`, `containerMeasurementsEnabled` y `containerMeasurementVisibleHomeIds`. Capturas WebGPU anteriores excluyen el SVG; las capturas de navegador lo incluyen. Herramienta de revisión: `test/container-measurements-review.html`; evidencias y limitaciones: `results/rocha-container-measurements`.

## Sistemas solares propuestos — solares-1

Cada vivienda (lotes 775 y 776) incorpora cuatro módulos Trina Vertex N
TSM-620NE19R de 620 W (2,48 kWp DC por vivienda), un microinversor Hoymiles
HMS-2000-4T-NA de cuatro entradas MPPT independientes, estructura, conexiones
DC, caja AC, desconectador bloqueable, interruptor, SPD, medidor bidireccional,
tablero de vivienda, monitor interior, conductos y unión a la tierra común de
la vivienda. No hay baterías ni respaldo durante cortes: el microinversor
interrumpe la generación por anti-isla. La salida continua publicada es
1,918 kVA (pico 2 kVA), distinta de la potencia DC; puede haber recorte de picos.
No se simula producción ni ahorro.

Los módulos miden 2,382 × 1,134 × 0,030 m. Cuatro módulos en paisaje, con
60 mm entre módulos, forman una fila de 9,708 × 1,134 m; inclinación de 5°
hacia +Z local, centro Z=+0,80 m y separación mínima de 150 mm sobre cubierta.
Se estima el montaje; la resistencia estructural, viento y estanqueidad están
pendientes. Las ocho placas pesan 223,2 kg en total, antes de herrajes/equipos.
Las medidas manuscritas siguen mostrando el módulo de 2,80 m sin equipo solar.
Retirar la cubierta también oculta sus paneles, rieles y cableado de cubierta.

Maps → Viviendas contenedor → Sistema solar permite mostrar/ocultar ambos kits,
consultar ratings/componentes, ir a vistas de paneles/equipos/conexión y ver el
esquema unifilar. Los equipos permanecen al alternar la red aérea/subterránea.
`app.world.solarSystems`, `app.solarSystems` y
`app.setContainerSolarVisible(boolean)` exponen la incorporación.
`?noSolar` permite revisar una referencia sin equipos solares.

Se conservan las asignaciones: P775 → T13, fases AB; P776 → T13, fases BC.
Sus laterales privados de aproximadamente 78,81 m y 34,13 m se preparan una vez,
permanecen dentro de cada parcela y evitan huellas y escalones. Conectan el
servicio reservado al medidor/tablero propio; la generación conecta aguas abajo
del medidor. No se unen las fases de las dos viviendas. Los cables privados sólo
se dibujan en “Mostrar recorridos enterrados”, con la alternativa subterránea
activa y visible. La capa técnica es simbólica sobre el suelo: no indica una
profundidad aprobada. No se modifica el activo de la red ni los planos previos.

Se comprueban los valores STC frente a las fichas guardadas: Vmp 41,4 V en
16–60 V; Voc 49,6 V menor de 65 V; Imp 14,99 A menor de 16 A; Isc 15,91 A menor de
25 A, por entrada. Voc estimado a −40°C: 57,3376 V. Esta comprobación no reemplaza
la revisión de extremos de irradiancia/temperatura, corrientes de diseño,
compatibilidad de conectores y aceptación regional del modelo. Los equipos se
representan para 208 V/60 Hz; 208/120 V sigue siendo una hipótesis del estudio.
La aceptación por Afinia, conductores, aumento de tensión, coordinación de
protecciones, resistividad/puesta a tierra y permiso de exportación permanecen
pendientes. Certificados extranjeros no se presentan como aprobación colombiana.

Fuentes: fichas oficiales Trina (2024) y catálogo Hoymiles NA (2025), archivados
con SHA-256 en `extras/rocha/solar-references`; portal RETIE vigente y CREG 174 de
2021 con sus modificaciones, incluida CREG 101-99 de 2026. El activo,
`solar-bill-of-materials.csv`, `solar-single-line-775.svg` / `776.svg` y
`solar-connection-addendum.json` documentan fuentes, ratings y reservas.
No es una instalación aprobada ni documentación liberada para construcción.

Geometría normal: 3.456 triángulos y tres grupos opacos por vivienda. La capa
opcional añade como máximo un grupo por vivienda; se conserva el límite total
menor de 4.000 triángulos. No se añaden texturas GPU, luces, pasadas, cristal
transparente solar ni bucles de animación. Se reutilizan acabados y sombras
estáticas del pueblo. Evidencia y mediciones: `results/rocha-container-solar`.

## Artistic exterior measurements — revision 2

Both container homes now use `rocha-container-measurements-2`: dimension lines sit eight CSS pixels outside projected structural edges. Cream paper tabs use the bundled Caveat font, navy lettering, direction icons and restrained ochre, seafoam and coral accents. Deterministic pencil strokes, corner highlights and plot tags are cached SVG elements; there are no added scene meshes, GPU textures, lights, render passes or animation loops.

Use **Maps → Viviendas contenedor → Mostrar medidas**. The existing 35–45 m range, 0.2 s fades, corner deadband, photo mode and interior/inspection hiding remain. Tabs reserve their complete paper/shadow footprint and are suppressed when they cannot fit clear of controls, other labels or the building silhouette. Height remains the estimated maximum structural module height (2.80 m), excluding foundations and solar equipment.

Revision-2 browser screenshots, raw performance samples, motion evidence, preserved-content hashes and validation are saved separately in `results/rocha-container-measurements-v2`. Previous reports remain intact.

Revision-2 delivery validation: 20 focused tests, 379 launcher tests, 10 optimization tests and game-logic checks passed. The final browser run covered 48 graphics/water/electrical combinations and the original island. Overlay update means were 0.128 and 0.263 ms in the final AC-powered trials, with 0.240 ms during camera movement. Scene draw counts matched; off/on GPU image differences remained within repeated-baseline variability. Whole-frame timings varied, and the JavaScript timer excludes browser SVG compositing; no displayed-FPS claim is made. The report, CSV, raw samples and actual screenshot motion capture are in `results/rocha-container-measurements-v2`.
