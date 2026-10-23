# Cuarto de máquinas importado del original · r11

La séptima zona del recorrido es `?room=machinery`. El selector y el plano de
cubiertas abren el cuarto `LD_R02` en su posición debajo del salón. Su recorrido
interior utiliza las máscaras de colisión del modelo original, incluidas las
variantes de puerta abierta/cerrada. No se inventa una conexión entre los
pasillos exteriores y las escaleras de servicio que aún no están en este piloto.

La captura evaluada contiene 79.664 triángulos del cuarto y 1.043 registros de
piezas/materiales. Incluye la aproximación a la puerta de servicio en X=5,70 m.
Los motores y los filtros se importan como activos separados, compartidos entre
babor y estribor. Cada exterior MTU tiene 382.211 triángulos y cada filtro 9.506.
Todos los archivos mecánicos, incluidas las muestras de animación y deformación,
coinciden byte a byte con sus archivos publicados en el yate original.

No se deforma el motor para ajustarlo a una caja. Se mantienen las traslaciones
originales, los ejes, el acoplamiento y las bancadas. La pasarela queda en Z=1,58
y los pies del motor en torno a Z=1,484, dentro del foso. Las cotas siguen siendo
las de una reconstrucción digital, con las incertidumbres del original.

Se conservan cuadros, desalinizadora, climatización, generadores, válvulas,
manifolds, escapes aislados, pasarelas, barandillas, registro, luces y rótulos.
`public/assets/machinery/reference-components.json` registra sus identidades y
límites. Los colores de vértice se exportan expresamente: la inferencia automática
de Blender omitía el color en algunas redes de material. El color se conserva con
la precisión de 16 bits de esa exportación; la compresión de geometría conserva
posiciones, normales y ambas UV sin cuantización adicional.

El cuarto emplea luz neutra fija. Dos atlas HDR EXR de 2048² contienen solamente
transporte difuso indirecto. Siete tiras de luz de área y dos haces amplios de
trabajo aportan iluminación directa y sombras locales reutilizadas. Puerta,
registro, motores y filtros quedan excluidos como oclusores de esos atlas.
Los materiales tienen UV físicas independientes, mapas KTX2 y geometría meshopt.

Las tablas globales LTC de las luces de área se inicializan una sola vez; se
comparten al volver a cargar el cuarto para evitar acumular texturas.

Tres sondas HDR locales aportan reflejos. Son capturas estáticas del exterior
cerrado: durante la inspección, la geometría y las sombras siguen el movimiento,
pero los reflejos conservan esa aproximación. La calibración luminosa es artística,
no una medición de lux a bordo. El sol y el agua exterior quedan ocultos dentro
del cuarto, situado parcialmente por debajo del datum de agua de la escena.

`K` abre la inspección. Se conserva selección babor/estribor, corte, reproducción,
pausa, reinicio y recorrido manual del ciclo de ocho segundos/720°. La GPU aplica
transformaciones y deformación de resortes desde una textura de 5 × 254 texeles
RGBA32F; el CPU actualiza matrices por canal, sin recorrer los vértices de la malla.
El material de profundidad utiliza la misma deformación para las sombras.

Los filtros conservan registro, extracción, inserción, recorrido manual y estados
limpio/sucio. Abrir el registro bloquea el paso y se rechaza si la persona está
encima. La puerta se acciona con `E` dentro del alcance original. El reinicio
restaura las poses; salir del cuarto o esconder la pestaña pausa la reproducción
y cancela solicitudes de inspección pendientes. Los interiores se descargan al
pedirlos y se liberan al expulsar el cuarto de la caché de dos zonas.

El archivo Blender incluye las piezas editables en `EDITABLE | machinery`, las
mallas agrupadas para renderizado y los exteriores nativos compartidos. La
colección editable está oculta para evitar duplicar superficies durante un render;
para editar piezas, mostrarla y ocultar los grupos `LD_R02 | …`. El paquete también
incluye las muestras originales de los mecanismos usados por el visor.

Herramientas de esta revisión:

1. `node tools/export-yacht.mjs /workspace/tidewater-rocha work/machinery-r11/snapshot machinery`
2. `blender --background --python-exit-code 1 --python tools/build-machinery.py`
3. `blender --background work/machinery-r11/machinery-master.blend --python-exit-code 1 --python tools/bake-machinery.py`
4. `node tools/prepare-machinery.mjs` y `node tools/audit-yacht-structure.mjs`
5. `npm test`, `node test/mtu-gpu.cjs` y `node test/machinery-browser.cjs`

La prueba WebGL2 de realimentación compara la GLSL usada por el visor con los
datos originales. Las capturas originales se obtienen en su página pública con
las mismas cámaras; se detiene únicamente su bucle en memoria para fotografiarla.
No se modifican sus archivos. Las pruebas gráficas usan SwiftShader y no prueban
60/30 fps en una GPU real. La mecánica sigue siendo nominal, sin confirmar los
internos reales ni asignar números de serie a cada lado.

## Contraste con Engine Room de la visita VR

Se siguió la ruta indicada: icono del barco, LOWER y cuarto punto negro desde
la derecha. La escena seleccionada es `scene_engine_room`. Se revisaron las seis
caras de 2048² y 24 capturas útiles: doce horizontales, cuatro de techo, cuatro
de suelo y cuatro detalles. Cuatro acercamientos diagonales dieron gris y se
excluyeron; las caras originales cubren toda la esfera visible.

`public/review/machinery-vr-evidence.json` registra 32 observaciones y sus cámaras,
marcas legibles, hashes y correspondencias con piezas del original. Las fotos y
el inventario ilustrado permanecen en `work/reference/machinery/`, fuera de Pages
y de los archivos de autoría publicados.

El contraste detectó un fallo del importador: el patrón 35 del piso no se
interpretaba como chapa antideslizante. Se corrigieron su material y UV físicas,
además del brillo del techo. Un paquete independiente incorpora cuatro segmentos
LED transversales y una rejilla ocre sobre el suelo seguro existente. Su posición
está ajustada al modelo y sigue siendo estimada. Los siete emisores rectangulares
y dos haces de trabajo comparten la misma configuración en Blender y en WebGL;
la luz indirecta y las sondas se hornean de nuevo tras estos ajustes.

Persisten diferencias: el frente del cuadro SHORE POWER SYSTEM, la columna de
seccionadores de batería, las alarmas del techo y algunos accesorios/carenados
de motor requieren reconstrucción específica. Los originales se conservan en
su ubicación digital; no se presentan como una reproducción exacta de la VR.
La visita no descubre el cesto ni la carcasa abierta del filtro, por lo que no
confirma sus coordenadas o fabricante. Tampoco confirma los modelos de los
generadores ni la identidad del casco como Luz de Mar.
