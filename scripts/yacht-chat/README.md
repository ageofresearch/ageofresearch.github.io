# Chat de Luz de Mar

La página publicada se mantiene en `site/tidewater-rocha/play.html` de este repositorio. GitHub Pages publica la carpeta `site/` mediante `.github/workflows/pages.yml`. El repositorio independiente `ageofresearch/tidewater-rocha` no es la fuente de esta publicación.

El módulo público `site/tidewater-rocha/luz-de-mar-chat/bootstrap.js` monta una ventana de consulta para `world=rocha` y excluye benchmarks. Los paquetes del renderizador no cambian. Con el chat abierto, WASD mueve al usuario por el yate. Al enfocar un campo del chat, el teclado queda disponible para escribir. Enviar la pregunta o pulsar la escena permite volver a caminar.

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

Abre el chat, pega tu clave en el área **Clave API de Gemini** y pulsa **Usar Gemini**. Las preguntas siguientes consultan exclusivamente `gemini-4-hydrogen` mediante la API Interactions. Configurar la clave no hace una consulta de pago ni comprueba todavía sus permisos: el estado se actualiza al recibir la primera respuesta completa.

La clave se mantiene en una variable de la pestaña. El área se vacía al configurarla; no se guarda en almacenamiento, historial, URL, HTML ni registros del servidor. Recargar o abandonar la página elimina la clave. Para usar otra clave, recarga la página e introdúcela de nuevo. Limpiar la conversación conserva la conexión para iniciar otro hilo.

Las solicitudes van directamente del navegador a `https://generativelanguage.googleapis.com/v1beta/interactions?alt=sse`, con la clave en `x-goog-api-key`. Google recibe la pregunta, hasta ocho mensajes anteriores de texto y el contexto público del yate en cada petición. `store: false` desactiva el almacenamiento de objetos de interacción y no se encadenan identificadores remotos; el uso de datos por Google sigue sus términos del servicio. No pasan por un servidor de este proyecto. Los errores de permisos, cuota o disponibilidad se muestran sin sustituir el modelo ni repetir consultas automáticamente. Sin clave sigue disponible la orientación local.

La respuesta aparece conforme llega. `interaction.created` permite mostrar que Google aceptó la consulta antes del texto; solo se muestran deltas de pasos `model_output`, y se exige `interaction.completed` con estado `completed` para guardar una respuesta. Pensamientos, firmas, herramientas y eventos futuros no se muestran como respuestas. El plazo máximo de consulta es de dos minutos y a los quince segundos sin texto se indica si se sigue esperando a Google o si ya aceptó la consulta. **Cancelar consulta** aborta la solicitud. Abandonar la página también la aborta. Ante un error, resultado incompleto o cancelación se retira el borrador. Los errores distinguen falta de respuesta de Google, interrupción de una respuesta ya iniciada y un plazo agotado por el servidor (HTTP 504).

Esta ruta sustituye la generación anterior después de observar un tiempo de espera sin cabeceras mientras las consultas públicas y de metadatos sí respondían. Es una alternativa de transporte documentada por Google, no una confirmación de la causa remota del tiempo de espera. Referencias: https://ai.google.dev/gemini-api/docs/migrate-to-interactions y https://ai.google.dev/gemini-api/docs/streaming.

Si la clave tiene una restricción de sitio web, debe permitir `https://ageofresearch.github.io/*`. La política `strict-origin` envía a Google solo el origen HTTPS, sin ruta ni parámetros; las restricciones limitadas a una ruta concreta no son compatibles con este flujo.

Las pruebas usan respuestas simuladas y claves ficticias; no verifican permisos de una clave real, facturación ni generación real de Gemini. La suite de interfaz usa un DOM simulado y no sustituye una revisión visual en navegador.

## Diagnóstico de errores

El diagnóstico permanece oculto en la interfaz. Para consultar el informe en la consola de la pestaña, usa `window.__luzDeMarDiagnostics.report()`.

Se conservan en memoria los últimos ocho intentos o fallos: versión del código, etapa, tiempos, HTTP, formato de respuesta, contadores de bytes y eventos, motivo de terminación, código de Google y razones reconocidas de permisos o cuota. Los errores JSON se leen con un máximo de 16 KiB y 1,5 segundos, sin demorar indefinidamente el error HTTP. Los campos `providerStatus` y `providerReason` provienen de códigos estructurados de Google; `providerHint` y `requestField` son clasificaciones orientativas de su texto. No se conservan mensajes originales, preguntas, respuestas, claves, cabeceras completas, identificadores de proyecto ni URL con parámetros. Las excepciones solo aportan tipo y posiciones dentro de los módulos del chat.

Los puntos de captura cubren validación, preparación, espera de cabeceras, cuerpo de error HTTP, lectura del flujo, JSON, visualización parcial, contexto y actualización del chat, portapapeles, importaciones y recursos. Los observadores globales registran errores y promesas rechazadas que pertenecen al chat, y bloqueos CSP del chat o de Google. Si falla la carga, la vista alternativa permite cerrar el aviso. Los errores se registran conservando su etapa original; no se convierten en respuestas exitosas.

Un `fetch` rechazado sin HTTP no permite identificar por sí solo DNS, TLS, CORS, una extensión o un bloqueo de red. El informe conserva esa limitación en vez de atribuirle una causa sin evidencia.

### Comprobación rápida de conexión

La comprobación interna de conexión realiza dos GET independientes de hasta diez segundos: consulta el documento público de descubrimiento de Google sin autenticación y consulta los datos de `gemini-4-hydrogen` con la clave en su encabezado. No envía preguntas ni inicia una generación; tampoco modifica el historial. Se puede cancelar y se ejecuta solo al pulsar el botón. Las lecturas omiten la caché y los metadatos se limitan a 16 KiB.

Los registros `connectivity_public` y `connectivity_model` permiten separar la respuesta pública de la consulta autenticada. Una respuesta correcta del modelo confirma que se pudo consultar su información; la disponibilidad, cuota y permisos de generación se comprueban al hacer una pregunta. Si ambas pruebas responden y una generación sigue sin cabeceras, la investigación debe centrarse en la ruta de generación. Si no hay HTTP en las pruebas, hace falta comparar el acceso desde otro navegador o red; no demuestra que la clave sea inválida. El informe identifica el método y tipo de cada solicitud sin guardar URLs ni credenciales.

### Flujo abierto sin respuesta y prueba mínima

Los comentarios SSE se ignoran como contenido de respuesta y se cuentan por separado de las líneas `data` y `event`, líneas vacías y líneas desconocidas. `pendingBufferChars` informa del tamaño de líneas o datos pendientes de delimitador, sin guardar sus valores; `dataChars` cuenta los caracteres de los campos de datos. Si vence el plazo y solo hubo comentarios, `gemini_keepalive_timeout` indica un flujo HTTP abierto sin eventos de generación. Recibir comentarios no equivale a aceptación y no reinicia el plazo absoluto. Referencia de formato: https://html.spec.whatwg.org/multipage/server-sent-events.html#authoring-notes.

La prueba breve del panel interno inicia una sola generación explícita con la misma clave, modelo, API, nivel bajo de pensamiento y límite de salida. Envía únicamente «Responde únicamente OK.», sin instrucciones del yate ni historial; usa `store: false` y un plazo máximo de treinta segundos. Puede consumir tokens de la API y la interfaz lo indica antes de pulsar el botón. La prueba no se ejecuta al configurar la clave ni al consultar metadatos; tampoco añade su pregunta o respuesta a la conversación. Su informe usa `provider: generation_probe` y `requestKind: generation_probe`.

Esta prueba acota si puede completarse una generación mínima en ese momento; no prueba por sí sola que el contexto anterior fuera la causa, porque el estado del servicio puede cambiar entre peticiones. Si también recibe solo comentarios sin eventos, hace falta comparar una petición equivalente desde otro cliente o consultar el estado del proyecto y del servicio con Google. Los comentarios y HTTP 200 por sí solos no identifican un fallo de facturación, cuota o capacidad.

### Errores HTTP con cuerpo SSE

Una respuesta HTTP de error puede llevar `Content-Type: text/event-stream`. El lector de errores admite JSON y SSE, extrae el primer objeto `error` completo sin esperar a que se cierre el flujo y conserva el estado HTTP si el cuerpo está vacío, mal formado, incompleto o no contiene errores. La lectura está limitada a 16 KiB y 1,5 segundos y puede cancelarse. `errorFormat` distingue `json`, `sse` y `unsupported`; `errorBody` indica si se pudo interpretar el error o por qué no. Los códigos, motivos e indicios permitidos se obtienen del objeto de error; su texto, campos SSE y credenciales no se guardan ni se muestran.

Un HTTP 503 indica indisponibilidad en esa petición; por sí solo no identifica la causa, no valida la clave y no demuestra una caída general. Esta corrección recupera el detalle cuando Google lo facilita y no ejecuta reintentos automáticos ni cambia de modelo. Referencia de errores y eventos SSE: https://aistudio.google.com/docs/api-errors.

## Adaptador opcional y contexto del operador

Como alternativa a la clave Gemini, se puede usar `POST /api/yacht-chat` del adaptador: `OPENAI_API_KEY`, `OPENAI_MODEL` y el contenido autorizado para la audiencia en `YACHT_CONTEXT_TEXT` se configuran solo en el entorno del servidor. Una clave Gemini configurada en la interfaz tiene prioridad sobre este endpoint. Nunca se incluyen claves ni un historial privado en los archivos públicos.

El endpoint puede indicarse en una metaetiqueta `yacht-chat-endpoint` o mediante `data-endpoint` en el script `data-yacht-chat`. GitHub Pages es estático y no ejecuta este servidor. Una instalación remota requiere su propio alojamiento, orígenes permitidos y autenticación apropiada a los datos que se vayan a consultar. El adaptador se inicia en loopback para las pruebas y no constituye un servicio privado de producción.

## Vistas de equipos

El catálogo en `equipment.js` enlaza cada ID de `rocha/luz-de-mar/model.json` con su nombre, el ID de la sala y un punto de observación transitable en coordenadas longitudinal/transversal del yate. El objetivo se calcula a partir del centro de la caja de la pieza y la transformación del yate. La primera vista corresponde a `LD_MAC_001`, el motor de babor, en `LD_R02`.

Para añadir una pieza, comprueba su ID y su sala en el modelo, escoge un punto de observación transitable con visibilidad hacia la pieza y añade una entrada al catálogo. Verifica el recorrido desde la pasarela y desde la misma sala. Gemini recibe el catálogo y devuelve una respuesta y un ID validado o `none` en la misma generación. El movimiento empieza después de que el chat muestra la respuesta completada. Los informes ambiguos requieren aclaración. La cámara no crea registros de mantenimiento.

La cámara recorre los pasillos y escaleras del controlador de paseo desde su posición actual. El trayecto de vuelta recorre el mismo camino en sentido inverso. Cuando dos zonas carecen de una conexión transitable, el chat conserva la vista de origen.
