# Reconciliación con el yate original

La revisión r10 lee `model.json` y `model.bin` de los archivos publicados del
yate original y comprueba sus SHA-256 contra el inventario de 629 archivos.
También se descargaron y contrastaron ambos recursos públicos. No se utiliza
como autoridad una copia de autoría con cambios pendientes.

`public/assets/yacht-structure.json` conserva las 31 huellas de habitaciones,
las cuatro cotas de cubierta, los equipos esquemáticos y las relaciones con las
seis zonas caminables. La maquinaria está bajo el salón; el puente está a popa
del lounge de proa. Las huellas son límites aproximados, no polígonos exactos
de tabiques ni cotas del barco real. Los usos inferidos siguen siendo inferidos.

El nuevo botón «Plano del yate» muestra las cubiertas y la posición actual.
Las zonas verdes abren el recorrido independiente; los otros enlaces abren
su habitación en la página original. El beach club exterior se distingue del
garaje. El plano pausa la caminata y funciona con teclado y entrada táctil.

En Blender se reconstruye solamente el contexto: se conservan las secciones
del casco original y se recortan contra la cara inferior de las nuevas
cubiertas. Las caras recortadas retienen su orientación y las normales
interpoladas del original. Recalcularlas como caras desconectadas producía
caras invertidas y huecos visibles. Una banda inferida une el casco con la proa
reconstruida; el área de maniobra, que tiene una superficie sin espesor, recibe
un encuentro a su cota superior para evitar una ranura de ocho centímetros.

No se reexportan las seis habitaciones ni sus UV, atlas o sondas. La envolvente
se ilumina con el ambiente del contexto y el sol existente. Su contribución
indirecta no se ha recalculado en los reflejos horneados de las habitaciones.

Se conservan dos diferencias documentadas con la geometría esquemática del
original: plataforma de baño en Z=2,12 frente a 2,84 y maniobra de proa en Z=5,10
frente a la losa superior plana en Z=6. La VR respalda las configuraciones, pero
no determina esos desniveles exactos. La escalera superior visible en popa sigue
cerrada al recorrido; la posición del desembarco y el techo del salón necesitan
reconciliarse antes de abrir una cubierta superior caminable.

Para reproducir esta revisión dentro de la aplicación:

1. `node tools/audit-yacht-structure.mjs`
2. `blender --background work/exteriors-final.blend --python-exit-code 1 --python tools/close-foredeck-structure.py`
3. `PROXY_SOURCE_DIR=work/structure-r10 node tools/light-proxies.mjs context`
4. `npm test` y `npm run build`
5. `node test/structure-browser.cjs`
6. `python3 tools/package-structure.py`

El archivo nuevo de Blender se entrega en Releases. Las descargas r9 y los
629 archivos originales permanecen intactos. No se redistribuyen fotos de la VR.
