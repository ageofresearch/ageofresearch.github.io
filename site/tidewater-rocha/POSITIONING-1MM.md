# Posicionamiento 1 mm

En ambos mundos: **Maps → Posicionamiento 1 mm → Abrir vista de precisión**. La escena se pausa. Se edita una referencia y la cámara de inspección; las construcciones, el terreno y los documentos permanecen de sólo lectura.

El origen de posicionamiento es **(0, 0, 0) sobre el terreno en X=0, Z=0**. La altura se calcula una sola vez al solicitar el sistema: en Rocha se usa el TIN original, sin excavaciones estimadas; en Tidewater se usa su terreno existente. Y es una referencia fija, no la altura sobre el suelo bajo cada objeto. Rocha conserva la cota original sin redondear (aproximadamente 30,291352 m en el centro). El mundo y su conversión de levantamiento no se desplazan.

Introduzca X/Y/Z en metros y pulse **Aplicar** para ajustar a 0,001 m. Los desplazamientos relativos se introducen en milímetros enteros. Flechas: X/Z; RePág/AvPág: Y. Deshacer y rehacer afectan exclusivamente al ancla de esta vista. **Copiar XYZ** exporta un registro JSON con mundo, origen y procedencia.

**Usar punto exacto** alinea con una referencia existente sin redondearla. **Punto bajo la mira**, o un clic en el terreno, usa los triángulos originales de Rocha o la consulta existente del terreno de Tidewater. Un desplazamiento entero desde un punto original conserva su fracción submilimétrica. El ancla se recuerda durante la sesión, separadamente por su identidad de mundo y origen.

Arrastre derecho para orbitar, rueda para acercar, **Enfocar referencia** para centrarla. Las líneas del mundo cambian de separación para ser legibles; la separación visible se indica expresamente. **Detalle 1 × 1 × 1 mm** muestra una ampliación diagramática de celdas de un milímetro, con escala indicada. No representa millones de cubos renderizados ni una nueva precisión del levantamiento. Rocha conserva este/oeste en X, norte en −Z, elevación en Y y la conversión original a coordenadas de levantamiento; sus datums siguen sin confirmar.

**Esc** vuelve a la cámara y los controles guardados. Una inspección de transformador termina su retorno antes de abrir esta vista. La lluvia precalculada, puertas y relojes se conservan durante la pausa. Un cambio de tamaño mantiene la nueva relación de aspecto al volver. Se restablecen los historiales temporales en los límites de la transición.

## Recursos y API

La interfaz se importa al abrirla. No hay controlador de posicionamiento, proyecciones, mallas, texturas, luces, pasadas ni bucle de animación de posicionamiento durante el juego. Sólo se añade el botón y texto estático del panel Maps. La cuadrícula SVG y sus escuchadores se eliminan al cerrar. Queda un registro numérico pequeño del ancla y el módulo JavaScript en la caché del navegador.

La cámara pausada solicita los pases existentes únicamente al cambiar su pose o el tamaño del lienzo. El asentamiento temporal está limitado a 8–64 cuadros, sin avanzar la simulación ni cambiar la calidad. Editar el ancla o desplegar el detalle SVG no dibuja otro cuadro del juego. El máximo total del grid es 256 segmentos y 24 etiquetas. Las medidas artísticas de los contenedores se conservan.

```js
await app.openPositioningMode();
app.positioningModeActive;                  // boolean
app.snapPositionToMillimetres([x, y, z]);   // nuevo array en metros del marco elegido
app.positioningCoordinateFrame;             // origen interno y unidades, calculados bajo demanda
app.worldToPositioning([x, y, z]);           // coordenadas internas → marco centrado en el suelo
app.positioningToWorld([x, y, z]);           // marco centrado en el suelo → coordenadas internas
app.closePositioningMode();
app.closePositioningMode({resume: false});  // al destruir una partida
```

La utilidad pura está en `src/core/Positioning.js`, exportada también mediante la API del App. Las nuevas referencias ajustadas almacenan enteros en milímetros. Las coordenadas importadas no se modifican. La API admite arrays, arrays tipados y vectores XYZ. La versión `tidewater-positioning-2` incluye `coordinateFrame` en los registros copiados, además del origen de levantamiento original. Referencias de sesión v1 conservan su posición física al convertirse sin redondeo. El panel muestra por separado la Y relativa y la cota original de Rocha.

## Verificación y límites

Resultados, muestras, capturas y respaldo: `results/positioning-grid` y `.positioning-grid-backup`. Se probaron coordenadas negativas, extremos del mapa, conversión, alineación exacta, undo/redo, proyección con profundidad invertida, recorte, cancelación, restauración y eliminación. Las funciones habituales de actualización del juego y de AppUI permanecen idénticas. Los activos topográficos, redes, vegetación y medidas existentes conservan sus hashes.

La comprobación interactiva en Codex cubrió ambos mundos, seis niveles de calidad, agua, alternativas eléctricas, modo topográfico y retorno desde el transformador. La prueba nativa del motor WebGPU de Node está bloqueada porque su biblioteca instalada requiere una versión de Metal de macOS más reciente; las pruebas lógicas del juego sí pasaron.

**Aceptación de rendimiento pendiente.** Se guardó un primer par de partidas nuevas con GPU/CPU, 120 cuadros de calentamiento, 300 medidos y cadencia independiente de diez segundos a 1920 × 1080, escala 1 y Full. Se interrumpió la serie de cinco pares cuando el espacio libre cayó a unos 438 MB. No alcanza para excluir una regresión repetible ni establecer FPS mostrados. El informe distingue el build medido del ajuste posterior que conserva la reproducción de lluvia; ese ajuste afecta sólo a la vista pausada.

El harness de revisión libera las interfaces, reloj, sonido y dispositivos de las partidas temporales. Su servidor auxiliar es local y se detiene al entregar; 5195 queda disponible. Para repetir mediciones, cerrar otras partidas y asegurar suficiente memoria/espacio libre. No se rebajan efectos para compensar diferencias.
