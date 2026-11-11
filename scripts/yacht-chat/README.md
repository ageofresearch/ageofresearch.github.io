# Chat de Luz de Mar

La página publicada se mantiene en `site/tidewater-rocha/play.html` de este repositorio. GitHub Pages publica la carpeta `site/` mediante `.github/workflows/pages.yml`. El repositorio independiente `ageofresearch/tidewater-rocha` no es la fuente de esta publicación.

El módulo público `site/tidewater-rocha/luz-de-mar-chat/bootstrap.js` monta una ventana de consulta para `world=rocha` y excluye benchmarks. Los paquetes del renderizador no cambian. Al abrir el chat se limpian y suspenden las entradas del recorrido; al cerrarlo se restaura su estado anterior.

La consulta local utiliza la documentación pública del modelo y reglas generales del PMS. No contiene conversaciones privadas, expedientes operativos, claves ni telemetría. Las dimensiones representadas y los estados ilustrativos del modelo no se presentan como medidas o inspecciones del barco real.

## Pruebas

```sh
node --test tests/yacht-chat-context.test.mjs tests/yacht-chat-gemini.test.mjs tests/yacht-chat-diagnostics.test.mjs tests/yacht-chat-ui.test.mjs tests/yacht-chat-server.test.mjs
```

## Vista local

```sh
node scripts/yacht-chat/server.mjs
```

Abre `http://127.0.0.1:5199/preview?world=rocha`. La vista usa los recursos publicados para conservar la escena y monta los módulos del chat de este checkout.

## Gemini con la clave del visitante

Abre el chat, pega tu clave en el área **Clave API de Gemini** y pulsa **Usar Gemini**. Las preguntas siguientes consultan exclusivamente `gemini-3.8-flash` mediante `streamGenerateContent`. Configurar la clave no hace una consulta de pago ni comprueba todavía sus permisos: el estado se actualiza al recibir la primera respuesta completa.

La clave se mantiene en una variable de la pestaña. El área se vacía al configurarla; no se guarda en almacenamiento, historial, URL, HTML ni registros del servidor. **Cambiar clave** permite sustituirla y **Desconectar Gemini** la elimina. Recargar o abandonar la página también la elimina. Limpiar la conversación conserva la conexión para iniciar otro hilo.

Las solicitudes van directamente del navegador a `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:streamGenerateContent?alt=sse`, con la clave en `x-goog-api-key`. Google recibe la pregunta, hasta ocho mensajes anteriores y el contexto público del yate. No pasan por un servidor de este proyecto. Los errores de permisos, cuota o disponibilidad se muestran sin sustituir el modelo ni repetir consultas automáticamente. Sin clave sigue disponible la orientación local.

La respuesta aparece conforme llega. El plazo máximo de consulta es de dos minutos, y a los quince segundos sin texto se indica que se está esperando a Google. **Cancelar consulta** aborta la solicitud. Abandonar la página también la aborta. Los fragmentos solo se incorporan al historial cuando Google confirma una respuesta completa; ante un error o cancelación se retira el borrador. Los errores distinguen falta de respuesta de Google, interrupción de una respuesta ya iniciada y un plazo agotado por el servidor (HTTP 504).

Si la clave tiene una restricción de sitio web, debe permitir `https://ageofresearch.github.io/*`. La política `strict-origin` envía a Google solo el origen HTTPS, sin ruta ni parámetros; las restricciones limitadas a una ruta concreta no son compatibles con este flujo.

Las pruebas usan respuestas simuladas y claves ficticias; no verifican permisos de una clave real, facturación ni generación real de Gemini. La suite de interfaz usa un DOM simulado y no sustituye una revisión visual en navegador.

## Diagnóstico de errores

Abre **Diagnóstico del chat** o **Ver diagnóstico** debajo de un error, y pulsa **Copiar diagnóstico**. El informe también se puede copiar mientras una consulta está pendiente. Si el navegador bloquea el portapapeles, queda disponible un campo de solo lectura para seleccionarlo y copiarlo manualmente. **Actualizar informe** muestra el estado actual. No se envía a ningún servicio de registro; es necesario compartirlo para que otra persona lo examine. También está disponible en consola con `window.__luzDeMarDiagnostics.report()`.

Se conservan en memoria los últimos ocho intentos o fallos: versión del código, etapa, tiempos, HTTP, formato de respuesta, contadores de bytes y eventos, motivo de terminación, código de Google y razones reconocidas de permisos o cuota. Los errores JSON se leen con un máximo de 16 KiB y 1,5 segundos, sin demorar indefinidamente el error HTTP. Los campos `providerStatus` y `providerReason` provienen de códigos estructurados de Google; `providerHint` y `requestField` son clasificaciones orientativas de su texto. No se conservan mensajes originales, preguntas, respuestas, claves, cabeceras completas, identificadores de proyecto ni URL con parámetros. Las excepciones solo aportan tipo y posiciones dentro de los módulos del chat.

Los puntos de captura cubren validación, preparación, espera de cabeceras, cuerpo de error HTTP, lectura del flujo, JSON, visualización parcial, contexto y actualización del chat, portapapeles, importaciones y recursos. Los observadores globales registran errores y promesas rechazadas que pertenecen al chat, y bloqueos CSP del chat o de Google. La carga fallida dispone de una vista alternativa para copiar el informe. Los errores se registran conservando su etapa original; no se convierten en respuestas exitosas.

Un `fetch` rechazado sin HTTP no permite identificar por sí solo DNS, TLS, CORS, una extensión o un bloqueo de red. El informe conserva esa limitación en vez de atribuirle una causa sin evidencia.

## Adaptador opcional y contexto del operador

Como alternativa a la clave Gemini, se puede usar `POST /api/yacht-chat` del adaptador: `OPENAI_API_KEY`, `OPENAI_MODEL` y el contenido autorizado para la audiencia en `YACHT_CONTEXT_TEXT` se configuran solo en el entorno del servidor. Una clave Gemini configurada en la interfaz tiene prioridad sobre este endpoint. Nunca se incluyen claves ni un historial privado en los archivos públicos.

El endpoint puede indicarse en una metaetiqueta `yacht-chat-endpoint` o mediante `data-endpoint` en el script `data-yacht-chat`. GitHub Pages es estático y no ejecuta este servidor. Una instalación remota requiere su propio alojamiento, orígenes permitidos y autenticación apropiada a los datos que se vayan a consultar. El adaptador se inicia en loopback para las pruebas y no constituye un servicio privado de producción.
