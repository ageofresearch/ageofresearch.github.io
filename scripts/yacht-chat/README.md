# Chat de Luz de Mar

La página publicada se mantiene en `site/tidewater-rocha/play.html` de este repositorio. GitHub Pages publica la carpeta `site/` mediante `.github/workflows/pages.yml`. El repositorio independiente `ageofresearch/tidewater-rocha` no es la fuente de esta publicación.

El módulo público `site/tidewater-rocha/luz-de-mar-chat/bootstrap.js` monta una ventana de consulta para `world=rocha` y excluye benchmarks. Los paquetes del renderizador no cambian. Al abrir el chat se limpian y suspenden las entradas del recorrido; al cerrarlo se restaura su estado anterior.

La consulta local utiliza la documentación pública del modelo y reglas generales del PMS. No contiene conversaciones privadas, expedientes operativos, claves ni telemetría. Las dimensiones representadas y los estados ilustrativos del modelo no se presentan como medidas o inspecciones del barco real.

## Pruebas

```sh
node --test tests/yacht-chat-context.test.mjs tests/yacht-chat-server.test.mjs
```

## Vista local

```sh
node scripts/yacht-chat/server.mjs
```

Abre `http://127.0.0.1:5199/preview?world=rocha`. La vista usa los recursos publicados para conservar la escena y monta los módulos del chat de este checkout.

## IA y contexto del operador

Sin servidor configurado, el widget muestra **Orientación local** y responde dentro de su contexto limitado. Para conectar un modelo se usa `POST /api/yacht-chat` del adaptador: `OPENAI_API_KEY`, `OPENAI_MODEL` y el contenido autorizado para la audiencia en `YACHT_CONTEXT_TEXT` se configuran solo en el entorno del servidor. Nunca se incluyen claves ni un historial privado en los archivos públicos.

El endpoint puede indicarse en una metaetiqueta `yacht-chat-endpoint` o mediante `data-endpoint` en el script `data-yacht-chat`. GitHub Pages es estático y no ejecuta este servidor. Una instalación remota requiere su propio alojamiento, orígenes permitidos y autenticación apropiada a los datos que se vayan a consultar. El adaptador se inicia en loopback para las pruebas y no constituye un servicio privado de producción.
