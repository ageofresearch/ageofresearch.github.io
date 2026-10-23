# Motor izquierdo: corrección del encaje con la VR

Esta candidata corrige una deficiencia de la primera reconstrucción: se usó una cuadrícula como referencia visual, pero muchas piezas se colocaron por estimación sin medir sus contornos proyectados. El encaje de los controles y el encaje de las siluetas se comprueban ahora por separado.

La candidata se activa con `?room=machinery&engine=left-vr-grid-r12`. El acceso habitual conserva el exterior R11. Esta entrega aún requiere ajustar las formas de carcasas y accesorios, las juntas, los pliegues finos, los rótulos y los reflejos antes de promover el exterior nuevo a la vista habitual. En WebGL persisten marcas oscuras en algunas tapas nominales que requieren revisión específica. La carcasa longitudinal próxima conserva una forma simplificada; el encaje del escape y de la funda no demuestra que esa carcasa ya reproduzca la VR.

## Qué gobierna la geometría

Las seis caras originales de la [VR](https://vrcloud.com/?pv=1667308298) tienen 2048² píxeles y corresponden a una sola posición física. Se usa una cámara estimada fija en coordenadas fuente `(9.15, 0, 3.18)`. Las ocho orientaciones y sus campos de visión están registrados en `public/assets/mechanics/left-vr-r01/evidence.json`; no se ajusta una cámara distinta por encuadre.

`tools/verify-left-grid.py` mide 24 puntos reconocibles sobre las piezas reales de Blender. Los extremos se obtienen de las secciones de los tubos; los centros, de los aros y cilindros. Se descartó como control el centro inferido de la unión de la funda, porque no constituye una referencia visible inequívoca. Los controles son datos de ajuste, no una validación independiente de la instalación real.

`tools/left-engine-grid-controls.json` conserva las correspondencias entre los contornos del primer modelo y los bordes trazados en la fotografía. Una deformación suave modifica los rayos proyectados del escape y de la funda. Conserva la profundidad de cada vértice, que sigue siendo inferida. Las costuras, bandas y cierres reciben el mismo ajuste que sus superficies. Se comprueba el jacobiano de la transformación en cada vértice deformado para rechazar inversiones y colapsos.

`tools/left-silhouette.py` vuelve a renderizar las superficies como máscaras desde la cámara del cubo original. `tools/compare-left-grid.py` mide su distancia a los contornos anotados y a otros 32 puntos de borde que no intervienen en el ajuste. Las cifras completas se entregan en el informe de validación; las anotaciones manuales tienen precisión limitada y no son mediciones del barco.

Las piezas cerradas de autoría se comprueban además como sólidos orientados hacia fuera antes de hornear. La primera salida WebGL mostró que la previsualización de doble cara había ocultado normales invertidas en varias piezas. La validación exige ahora bordes manifold y volumen firmado positivo; también se verifica la orientación después de la deformación por cuadrícula.

Las tapas y culatas reutilizadas también se validan por sus normales de sombreado. Se reconstruyen a partir de las caras, con aristas de 38°, porque varias normales exportadas cruzaban el plano tangente y generaban manchas negras en el atlas. Esta corrección afecta únicamente al derivado izquierdo; no modifica los archivos R03.

Las piezas reutilizadas se reconectan por vértices coincidentes antes de desplegar UV. El primer atlas conservaba triángulos desconectados y aproximadamente un 0,59 % de triángulos UV colapsados; se exige menos del 0,01 % tras la reparación. La malla de admisión usa un paso visual estimado de 5,6 mm para conservar su lectura en los acercamientos; no se presenta como una medición del componente real.

## Cambios observables

- La carcasa escalonada próxima se traza desde los vértices visibles del cubo L; incluye tapas, bosses, tornillos y líneas locales separados. Su profundidad transversal sigue inferida.
- La carcasa interior deja de tapar la admisión; el aro, la malla y el receptor blanco conservan superficies independientes.
- Los dos manguitos azules se disponen a distinta profundidad transversal y no en una fila longitudinal.
- Los laterales de la barandilla y los marcos extremos tienen alturas distintas, siguiendo sus proyecciones.
- Se corrigen el barrido del escape, el volumen de la funda y la posición del extintor y sus manetas.
- Las cintas de cierre son superficies planas apoyadas en la funda; las costuras siguen su geometría.

El conjunto conserva objetos editables, identificadores y referencias en Blender. `component-inventory.json` registra la ubicación, material y evidencia de cada objeto; distingue contornos observados, geometría nominal compatible y detalles inferidos, sin afirmar que cada tornillo fuera legible en la panorámica. El acoplamiento digital permanece en `(9.72, 1.20, 1.94)`. La reconstrucción exterior no identifica por sí misma el modelo exacto del motor fotografiado ni certifica sus dimensiones ocultas.

Se conserva el conjunto nominal compatible de cárter, faldón, brida del cárter y apoyos, además de la campana y brida del volante. Las bancadas inferidas enlazan los pies, en Z≈1.484 m, con el fondo del foso digital, en Z≈1.290 m. Los pies de la barandilla terminan en el suelo de recorrido, Z=1.580 m. Una comprobación de cápsula próxima al conjunto revisó 673 celdas ya transitables con radio de 14 cm y no encontró conflictos; no se amplió el espacio de caminata.

## Exportación y comportamiento

El cuarto R11 se separa por identidad de sus triángulos. Sus posiciones, normales, dos juegos de UV, colores, materiales y texturas se conservan. La separación y el reordenamiento producen pequeñas diferencias de rasterizado en 304 píxeles de borde de una captura de 540.000 píxeles (0,056 %). Una prueba de control con el GLB original y el código nuevo reproduce R11 píxel por píxel. No se afirma identidad de píxeles para el GLB separado. El conjunto izquierdo anterior permanece como respaldo durante la carga. La variante se sustituye cuando geometría, atlas, reflejos y máscara receptora están preparados; un fallo mantiene la representación anterior y ofrece reintento.

Las comparativas usan la transformación Khronos PBR Neutral de Three.js (`NeutralToneMapping`), salida sRGB y exposición fija 0,05. `neutral_png` en `tools/bake-left-engine.py` aplica la misma curva a los EXR lineales de Cycles para sus previsualizaciones; no se compara una imagen AgX con otra curva del navegador.

El atlas EXR de 2048² contiene iluminación difusa directa e indirecta sin albedo. Los materiales de la variante excluyen la contribución difusa directa y ambiental equivalente del visor para no sumarla dos veces. Dos reflejos HDR locales aportan la respuesta especular. Una máscara de atenuación sobre receptores existentes se activa únicamente con el exterior instalado; los registros ocultos no reciben fragmentos ni dejan una sombra dibujada aparte.

Los materiales del contexto cambian sus reflejos especulares junto con la representación izquierda y recuperan los originales al abrir su corte nominal. Las fuentes HDR nuevas se filtran a la resolución CubeUV existente antes de la convolución, evitando mezclar tamaños de muestreo incompatibles. Los colores de los PNG se tratan como sRGB; el aislamiento negro mantiene aproximadamente un 3 % de reflectancia lineal, en lugar del negro casi nulo de la primera prueba.

El corte izquierdo muestra expresamente la mecánica nominal R03. Al cerrarlo vuelve el exterior VR. La geometría derecha y los archivos de inspección MTU/filtros permanecen intactos. El detalle exterior se solicita al acercarse, con histéresis para evitar oscilaciones de nivel. Las cargas obsoletas se cancelan y se liberan sus recursos.

## Fuentes y límites

Las fotografías VR se conservan como referencia privada y no se publican como texturas. Los mapas de pintura, metal, goma, aislamiento y malla son procedurales de autoría independiente. La geometría nominal compatible procede del ZIP R03 facilitado por el usuario, conservando sus hashes y procedencia. Las dependencias siguen siendo Three.js 0.180.0, meshoptimizer y sus licencias existentes.

Las pruebas con Chromium/SwiftShader comprueban corrección y estiman recursos; no acreditan 60 fps en un ordenador ni 30 fps en un móvil con GPU física. La coincidencia de contornos desde la única panorámica tampoco demuestra profundidad o exactitud naval adicionales.

## Abrir la escena de autoría

El ZIP de GitHub Releases incluye `left-engine-master.blend`, con imágenes empaquetadas. La colección `EDITABLE | VR left installed` contiene las piezas individuales; para editarlas, mostrar esa colección y ocultar `LVR installed | detail` y su derivado de recorrido. La colección de render contiene las mallas evaluadas y sus UV de iluminación. La escena conserva el cuarto como contexto.

Los scripts documentan la derivación dentro del repositorio; para reconstruirla desde cero también requieren las fuentes R11 y R03 acreditadas. No se incluyen otra vez esos paquetes originales ni las fotografías privadas de la VR. La escena empaquetada permite editar el conjunto sin descargar las fotografías.
