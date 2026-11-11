# Chat de Luz de Mar

La página publicada se mantiene en `site/tidewater-rocha/play.html` de este repositorio. GitHub Pages publica la carpeta `site/` mediante `.github/workflows/pages.yml`. El repositorio independiente `ageofresearch/tidewater-rocha` no es la fuente de esta publicación.

El módulo público `site/tidewater-rocha/luz-de-mar-chat/bootstrap.js` monta una ventana de consulta para `world=rocha` y excluye benchmarks. Los paquetes del renderizador no cambian. Al abrir el chat se limpian y suspenden las entradas del recorrido; al cerrarlo se restaura su estado anterior.

La consulta local utiliza la documentación pública del modelo y reglas generales del PMS. No contiene conversaciones privadas, expedientes operativos, claves ni telemetría. Las dimensiones representadas y los estados ilustrativos del modelo no se presentan como medidas o inspecciones del barco real.

## Pruebas

```sh
node --test tests/yacht-chat-context.test.mjs tests/yacht-chat-gemini.test.mjs tests/yacht-chat-ui.test.mjs tests/yacht-chat-server.test.mjs
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

## Adaptador opcional y contexto del operador

Como alternativa a la clave Gemini, se puede usar `POST /api/yacht-chat` del adaptador: `OPENAI_API_KEY`, `OPENAI_MODEL` y el contenido autorizado para la audiencia en `YACHT_CONTEXT_TEXT` se configuran solo en el entorno del servidor. Una clave Gemini configurada en la interfaz tiene prioridad sobre este endpoint. Nunca se incluyen claves ni un historial privado en los archivos públicos.

El endpoint puede indicarse en una metaetiqueta `yacht-chat-endpoint` o mediante `data-endpoint` en el script `data-yacht-chat`. GitHub Pages es estático y no ejecuta este servidor. Una instalación remota requiere su propio alojamiento, orígenes permitidos y autenticación apropiada a los datos que se vayan a consultar. El adaptador se inicia en loopback para las pruebas y no constituye un servicio privado de producción.
