# Selección de equipos R01

La selección modifica únicamente la salida de color del fragmento visible, mezclando #32E65A al 35 % después de la transformación de salida. No cambia opacidad, luz, reflejos ni geometría. El selector es un identificador lógico estable; cada equipo conserva su identidad en sus representaciones.

Los GLB, binarios nominales, texturas, UV y bakes publicados se conservan byte por byte. Los nuevos archivos `*.ids.bin` contienen gzip de intervalos de triángulos, ligados al SHA-256 del GLB original y al hash de cada mapa. Al cargar se añade solamente el atributo GPU `aEquipmentId`. No se divide en cientos de llamadas de dibujo ni se vuelve a hornear iluminación.

La autoría editable original permite recuperar pertenencia mediante coordenadas de vértice exactas y conectividad dentro de una misma superficie. Los niveles de recorrido se vuelven a derivar en memoria con la misma simplificación y el identificador propagado; se vinculan por las UV originales a los triángulos ya publicados. El cuadro eléctrico y el foso conservan su cuantización reproducible. No se usa vecino más cercano, una caja envolvente ni un material para asignar pertenencia. Cualquier referencia ambigua queda en cero.

Los IDs heredados de cargadores se expanden desde la secuencia explícita de construcción de LuzDeMarMachinery.js y LuzDeMarMachineryDetail.js; sus soportes compartidos no se incluyen. Los módulos ASEA siguen siendo nombres de la representación, no una certificación funcional. Las conducciones y algunos herrajes sin propietario inequívoco figuran en pendientes.

El clic utiliza una pasada GPU de un píxel. Objetos opacos con identidad cero escriben profundidad y bloquean lo situado detrás. El recorrido ordinario solo añade un atributo y la condición de tinte al material existente. Las pasadas de máscara completas son herramientas de validación, no trabajo por cuadro.

## Reproducción

1. Ejecutar `python tools/selection-catalog.py` (conservar el registro de valores del catálogo existente).
2. Con Blender 4.3.2, ejecutar `tools/selection-authoring.py -- port`, `starboard`, `bulkhead`, `electrical` y `well`. Los originales se abren solo para lectura; no se guardan de nuevo. Los maestros eléctrico y del foso proceden de los Releases públicos de pedestal R01 y foso R01.
3. Ejecutar `node tools/prepare-selection.mjs`, después `npm test` y `npm run build`.
4. Servir el directorio de compilación con un servidor estático y ejecutar `test/selection-browser.cjs`, `test/selection-masks.cjs` y `test/selection-lifecycle.cjs` con su URL.

`validation.json` registra pertenencia y enlaces a los activos intactos. No presupone que todos los equipos de respaldo sean visibles al mismo tiempo. Los componentes pendientes no se aprueban por estar presentes en un inventario.

La puerta R02 es una pieza independiente con ID editable `EVR/white service access appearance`; su etiqueta exportada `appearanceDoor` conserva esa pertenencia al mover el pivote. Se comprueban también los módulos ASEA en la representación anterior, porque la reconstrucción eléctrica sustituye esa zona.

Las vistas adicionales se ejecutan con `SELECTION_EXTRA_VIEWS=1` y las anteriores con `SELECTION_LEGACY_VIEWS=1`, usando directorios `masks-extra` y `masks-legacy`. `tools/finalize-selection.mjs` exige una máscara comprobada para cada objeto registrado. Publicar primero sin `--promote`, comprobar el despliegue y después ejecutar con `--promote`; el catálogo activa entonces la selección sin exigir el parámetro de candidata.

El margen de Pages se mide sobre todo `site`, incluida la galería Renderpeople publicada independientemente. Esa galería redujo la reserva histórica de 32 MiB antes de este cambio. El informe registra el tamaño real, sin modificar esa galería ni retirar activos del yate para aparentar el margen anterior.
