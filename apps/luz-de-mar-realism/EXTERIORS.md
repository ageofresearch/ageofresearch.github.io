# Recorrido exterior — reconstrucción de referencia

La visita [Azimut Grande 36M de VRCLOUD](https://vrcloud.com/?pv=1667308298)
guía la distribución, los muebles y los acabados. Se revisaron los diez panoramas
de popa, ambos costados, proa y beach club: sus 60 caras fotográficas cubren la
vuelta completa, suelo y cielo/techo. Algunas capturas diagonales del navegador
contenían triángulos grises de renderizado; se descartaron y se contrastaron con
las caras originales. Las fotografías permanecen privadas y no se distribuyen.

El inventario `public/assets/exterior-inventory.json` relaciona observaciones,
panoramas y componentes editables. Las dimensiones y las coordenadas exteriores
son estimaciones dentro de la transformación heredada del yate. La visita no
acredita medidas ni confirma que este barco sea Luz de Mar. El entorno costero,
la luz solar, los dorsos ocultos y los materiales concretos son interpretaciones.

El salón conserva sus muebles. Sus tres hojas correderas están apiladas a babor
en una posición fija abierta. La iluminación ambiente y los reflejos se vuelven
a calcular con el entorno exterior construido. Los antiguos pasillos de relleno
se sustituyen por zonas separadas, sin duplicar las superficies de cubierta.

Las superficies navegables y los obstáculos proceden de los mismos parámetros
que la geometría. El cuerpo tiene radio físico de 14 cm. Las escaleras muestran
peldaños y emplean una pendiente continua para la altura de cámara. El costado
de estribor enlaza con proa; el pasillo de babor termina ante su mamparo visible.
La plataforma de baño y el agua del jacuzzi permanecen fijas. Los muebles,
cristales, jacuzzi, barandillas y los bordes del barco bloquean el recorrido.

Solo dos zonas completas pueden estar residentes. El resto mantiene proxies
simplificados. Se precarga la conexión próxima; una descarga fallida no elimina
la zona actual y ofrece reintento. Las selecciones obsoletas se cancelan y sus
resultados tardíos se liberan. Las texturas KTX2 compartidas se identifican por
contenido comprimido y configuración, y se liberan al terminar la última cesión.

Cada exterior tiene un atlas ambiente HDR EXR de 2048² y una sonda especular local;
el salón conserva dos atlases y tres sondas. UV0 contiene materiales a escala y
UV1 irradiancia. Cycles calcula solo transporte ambiente; el sol se dibuja con
una sombra reutilizada. Los mapas de material usan KTX2 y la geometría meshopt.
Se conserva la precisión half-float de los EXR para evitar los artefactos de
compresión observados en bordes de atlas durante el estudio anterior.

El dibujo responde a cambios de entrada, carga y animación de cámara. Durante
movimiento se limita inicialmente a 1,5 millones de píxeles y recupera la
resolución de reposo tras unos 150 ms, con DPR máximo de 2. El agua exterior es
estática. Las pestañas ocultas no mantienen el bucle de renderizado.

## Autoría reproducible

1. `python3 tools/exterior-textures.py`
2. `blender --background --python-exit-code 1 --python tools/build-exteriors.py`
3. `blender --background work/exteriors-ready.blend --python-exit-code 1 --python tools/refine-bow.py`
4. `blender --background work/exteriors-bow-v2.blend --python-exit-code 1 --python tools/finalize-exterior-geometry.py`
5. Corregir los pivotes de tumbonas con `tools/fix-recliner-pivots.py`, y las normales de paneles abiertos con `tools/fix-open-surface-normals.py`; reconstruir las mallas evaluadas con `tools/finalize-exterior-geometry.py` antes de hornear.
6. `blender --background work/exteriors-final.blend --python-exit-code 1 --python tools/bake-exteriors.py`
7. `node tools/prepare-exteriors.mjs`
8. `python3 tools/exterior-evidence.py`
9. `npm test` y las comprobaciones de navegador en `test/exteriors-browser.cjs`.

Las escenas editables y los bakes originales se distribuyen en GitHub Releases.
Las descargas anteriores del salón siguen disponibles en su ruta original.
El código, las texturas propias y los activos optimizados permanecen separados
de la página original. La publicación verifica los 629 hashes de esa página.

La meta de 60 fps de escritorio/30 fps móvil exige medir hardware real. Las
mediciones de SwiftShader son comprobaciones de corrección y estabilidad; no
demuestran esa meta ni equivalencia fotográfica con la visita.

Las versiones ligeras reciben irradiancia por vértice derivada de los mismos atlas HDR, junto con las sombras solares reutilizadas. Así se conserva el color interior al mirar por los cristales sin cargar atlas de zonas no residentes. La exposición de cámara se calibra por zona y cambia suavemente al cruzar una conexión; las luces permanecen fijas. `ASSET_REVISION` versiona las peticiones de geometría y luz para evitar mezclar UV antiguas con atlas nuevos en caché.

El agua cercana usa normales estáticas y sombras del yate. A distancia se mezcla con el panorama costero para evitar una línea de corte visible. Las versiones ligeras conservan una media de irradiancia del interior de las caras grandes; usar únicamente las esquinas oscuras de un atlas daba falsos techos negros.

Para regenerar las versiones ligeras después de preparar las mallas y hornear: `node tools/light-proxies.mjs`. Ejecutar `node tools/refresh-exterior-manifest.mjs` con `PUBLICATION_STAGE=1` o `2` para vincular los bakes terminados antes de publicar. Las 629 comprobaciones del original incluyen 628 recursos servidos y el marcador `.nojekyll`, verificado en el commit del despliegue porque GitHub Pages no lo expone por HTTP.
