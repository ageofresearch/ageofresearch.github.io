// Public scene documentation and user-reported observations for this project.
export const PROJECT_SOURCE = Object.freeze({ title: 'Documentación pública de Luz de Mar', url: 'https://ageofresearch.github.io/tidewater-rocha/publication.json' });
export const projectSource = PROJECT_SOURCE;
export const sources = Object.freeze([PROJECT_SOURCE]);

const portEngineReport = 'Se han reportado daños en el motor de babor de Luz de Mar. Queda por determinar qué pieza interna está dañada. La causa, la gravedad y el estado de la reparación también se desconocen.';

export const contextFacts = Object.freeze([
  {
    id: 'yacht',
    title: 'El yate y el alcance del asistente',
    keywords: ['que sabemos del yate', 'que yate', 'modelo', 'azimut', 'metri', 'luz de mar', 'quien eres', 'que puedes', 'contexto', 'identidad'],
    answer: 'El yate se llama Luz de Mar y es un Azimut 36 Metri. Estás en su recorrido digital en Rocha. La publicación arranca con el yate y la pasarela; el mapa completo se carga al pedirlo. La barra de ubicación y el menú Explorar permiten recorrer sus zonas, también con la tecla N.\n\nLa documentación pública del modelo indica aproximadamente 35,23 m de eslora, 7,47 m de manga y 2,01 m de calado como referencias de su representación. Sus dimensiones y posiciones ajustadas a imágenes no son un levantamiento del barco real.\n\nPuedo consultar esta documentación y orientar sobre mantenimiento, compras y preparación de viajes. No tengo el PMS operativo, las placas verificadas, sensores ni meteorología actual; la apariencia de la escena no demuestra el estado técnico del yate.',
  },
  {
    id: 'port-engine',
    title: 'Daños reportados en el motor de babor',
    keywords: ['motor de babor', 'motor babor', 'babor', 'daño', 'daños', 'averías'],
    answer: portEngineReport,
    sources: [{ title: 'Reporte de daños aportado al contexto de Luz de Mar' }],
  },
  {
    id: 'sea-strainers',
    title: 'Filtros de agua de mar del modelo',
    keywords: ['filtros de mar', 'filtros de agua de mar', 'filtro de agua', 'colador', 'coladores', 'cesto', 'cestos', 'foso', 'filtros'],
    answer: 'La documentación publicada sitúa dos carcasas con cestos perforados extraíbles en el foso central, entre los motores. En el modelo se pueden inspeccionar desde el cuarto de máquinas: pulsa K, elige Filtros de mar y abre el registro digital del piso.\n\nLas vistas limpia y sucia son representaciones ilustrativas. No indican el estado actual del equipo real. El fabricante y modelo exactos no están identificados; las medidas son estimaciones y no se ha acreditado que el par sea un sistema dúplex para limpiar durante la marcha.\n\nLa limpieza, sustitución de juntas y vuelta al servicio reales deben seguir el manual del conjunto identificado y la revisión técnica correspondiente. No recomiendo un intervalo específico ni instrucciones de maniobra basándome únicamente en esta reconstrucción.',
    sources: [{ title: 'Filtros de mar: ubicación, fuentes y límites', url: 'https://ageofresearch.github.io/tidewater-rocha/rocha/luz-de-mar/sea-strainers/' }],
  },
  {
    id: 'pms',
    title: 'Mantenimiento planificado',
    keywords: ['pms', 'mantenimiento', 'tareas', 'activos', 'inventario', 'componentes', 'ordenes', 'hojas', 'historial', 'vencidas', 'vencimiento', 'pendientes', 'proximas'],
    answer: 'PMS significa Planned Maintenance System: sistema de mantenimiento planificado. Relaciona cada trabajo con un activo, el requisito que lo justifica, el vencimiento, el responsable, los materiales y la evidencia de aceptación.\n\nPara conocer las tareas vencidas o próximas hacen falta el plan aplicable, las últimas ejecuciones verificadas, los contadores y una fecha de evaluación. No tengo esos registros actuales conectados. Un dato vacío no demuestra que una tarea esté hecha y una lectura antigua no acredita el estado de hoy.\n\nEl calendario debe respetar los requisitos aplicables al equipo y distinguir fecha, horas, ciclos, eventos y condición. Los límites de mantenimiento no se inventan para completar un formulario.',
  },
  {
    id: 'departure',
    title: 'Preparación de una salida',
    keywords: ['salir', 'salida', 'navegar', 'listo', 'preparado', 'apto', 'martes', 'impedimentos', 'bloqueo', 'bloquea', 'autorizar', 'autorizacion', 'capitan', 'dueno', 'propietario'],
    answer: portEngineReport + '\n\nNo dispongo del estado técnico ni de las comprobaciones actuales para confirmar una salida: información insuficiente. Una solicitud de viaje debe convertirse en un plan evaluado, no en una autorización automática.\n\nLa revisión debe considerar ruta, salida y regreso, personas, disponibilidad técnica, combustible y agua con las reservas definidas, mantenimiento durante el viaje, documentación y condiciones de cada tramo. Un requisito esencial sin cumplir no queda compensado por tener muchos otros controles completos.\n\nEste chat puede ayudar a identificar preguntas y pendientes. No autoriza la navegación ni sustituye la decisión operacional del capitán. Si cambian el plan o las condiciones, deben revisarse las comprobaciones afectadas.',
  },
  {
    id: 'battery',
    title: 'Baterías y fallos de arranque',
    keywords: ['bateria', 'baterias', 'arranque', 'banco de baterias', 'cargador'],
    answer: 'Un fallo de arranque no identifica por sí solo una batería defectuosa. Deben revisarse el banco, la carga, las conexiones y el circuito mediante el procedimiento apropiado.\n\nAntes de proponer una sustitución hay que validar la especificación del equipo y comprobar compatibilidad, capacidad, dimensiones, terminales, régimen de carga y existencias utilizables. No conozco la referencia instalada en el yate y no recomiendo una batería concreta con este contexto.\n\nLa secuencia útil es diagnóstico → solución y especificación validadas → disponibilidad → autorización de compra, si hace falta → recepción e instalación → prueba posterior y aceptación. Comprar, recibir o instalar la pieza no cierra por sí solo la avería. Si la solución es una reparación, también requiere comprobación.',
  },
  {
    id: 'purchases',
    title: 'Compras, repuestos y cierre técnico',
    keywords: ['comprar', 'compra', 'compre', 'pieza', 'repuesto', 'stock', 'almacen', 'recibida', 'recibido', 'instalada', 'instalado', 'instale', 'factura', 'pago', 'cerrar', 'cerrada', 'cerrado', 'averia', 'reparacion', 'garantia', 'compatibilidad'],
    answer: 'La compra debe responder a una necesidad comprobada y una especificación aceptada. Primero se revisa si hay una pieza compatible, aceptada técnicamente y disponible para el trabajo. Material en tránsito, reservado, en cuarentena o pendiente de aceptación no cuenta automáticamente como utilizable a bordo.\n\nRecepción física, aceptación técnica, instalación, prueba y cierre son estados distintos. Una factura pagada, una entrega o la desaparición de una alarma no prueban que la función se haya recuperado. Para cerrar hace falta evidencia de la intervención y una prueba válida posterior con la aceptación correspondiente.\n\nPedido, recepción, factura y pago son estados vinculados de una operación: no deben sumarse como gastos independientes. Tampoco se cuenta dos veces una pieza al comprarla y consumirla.',
  },
  {
    id: 'savings',
    title: 'Ahorro y costes',
    keywords: ['ahorrar', 'ahorro', 'ahorros', 'dinero', 'coste', 'costo', 'cuesta', 'presupuesto', 'varada', 'precio', 'gastos', 'economico', 'barato'],
    answer: 'El ahorro debe compararse para el mismo alcance, calidad y condiciones. Conviene revisar duplicados, garantías, alternativas técnicamente equivalentes, agrupación de visitas, transportes urgentes y material que pueda caducar.\n\nNo tengo facturas, presupuestos ni una comparación económica actual del yate. Por tanto no puedo atribuirle una cifra de ahorro. Una oportunidad estimada no es un beneficio ya conseguido; un resultado negativo también debe permanecer visible.\n\nAhorro neto = coste de una alternativa comparable − coste real del mismo alcance − coste adicional de aplicar el cambio, siempre sin contar dos veces un importe. Cancelar un viaje o aplazar un pago no demuestra ahorro de mantenimiento. Una oferta más barata solo es comparable si entrega un resultado técnicamente equivalente.',
  },
  {
    id: 'route',
    title: 'Ruta, meteorología y cambios',
    keywords: ['ruta', 'itinerario', 'horario', 'meteorologia', 'meteorologico', 'clima', 'tiempo hace', 'viento', 'oleaje', 'marea', 'pronostico', 'emergencia', 'cambiar hora', 'cambio de hora'],
    answer: 'No tengo pronósticos, avisos ni posición reales actualizados. El tiempo representado por la escena 3D no es evidencia meteorológica para navegar.\n\nEl plan debe evaluar condiciones por tramo y hora prevista de paso, junto con estado técnico, velocidad, tripulación, autonomía y alternativas. Cambiar la ruta, las personas o la hora exige revisar las evidencias afectadas; un pronóstico nuevo también puede invalidar la evaluación anterior. No se inventan límites de viento u oleaje a partir de la apariencia del yate.\n\nUna emergencia requiere su procedimiento específico, la situación del barco y las instrucciones aplicables de las autoridades. No se aplica una regla universal de «regresar siempre» o «sacar el barco».',
  },
  {
    id: 'integration',
    title: 'Integración de los sistemas',
    keywords: ['integrar', 'integramos', 'integracion', 'sistemas', 'sensores', 'tiempo real', 'telemetria', 'conectar', 'conexion', 'internet', 'offline', 'sin conexion', 'datos', 'senal', 'alarma', 'automatizar'],
    answer: 'Una integración útil relaciona los datos con una decisión concreta: mantenimiento, atención de fallos, disponibilidad técnica o preparación del viaje. Primero deben comprobarse las interfaces soportadas, permisos, calidad y frecuencia de actualización.\n\nCada dato debe identificar activo, fuente, valor, unidad, hora de medida y recepción, vigencia y responsable. Un dato ausente no es cero; uno antiguo no mantiene un indicador verde. Dos pantallas del mismo sensor no son verificaciones independientes.\n\nLos controles y alarmas originales del barco deben conservar su independencia. La información local disponible puede seguir sirviendo cuando se pierde Internet, con las fuentes remotas marcadas como antiguas. Enviar órdenes a motores, bombas o gobierno requiere una evaluación específica. Este chat no está conectado a sensores y no acciona equipos.',
  },
  {
    id: 'quality',
    title: 'Gestión de calidad y auditoría',
    keywords: ['iso', '9001', 'certificacion', 'certificado', 'auditoria', 'auditor', 'calidad', 'no conformidad', 'reventa', 'vender', 'valor del yate'],
    answer: 'La gestión de calidad necesita responsabilidades claras, procedimientos adecuados y evidencias que permitan seguir una decisión hasta su resultado. Un índice de documentos no equivale por sí solo a evidencias completas.\n\nNo debe darse por cerrada una no conformidad solo por añadir una fecha: hacen falta evidencia y, cuando corresponda, comprobación de eficacia. El alcance de cualquier certificado debe verificarse con su titular y emisor.\n\nEste contexto local no confirma la edición vigente de una norma, las obligaciones del yate, una certificación real ni una prima de reventa. La conveniencia económica de una auditoría o certificación requiere resultados y costes verificables.',
  },
  {
    id: 'defects',
    title: 'Defectos y prioridades',
    keywords: ['defecto', 'defectos', 'audio', 'audiovisual', 'teca', 'cosmetico', 'confort', 'critico', 'criticidad', 'prioridad', 'urgente'],
    answer: portEngineReport + '\n\nLa prioridad combina la importancia de la función, las consecuencias del fallo y la urgencia de la intervención. Una inspección rutinaria, una avería esencial activa y un defecto cosmético requieren tratamientos diferentes.\n\nUna limitación de confort no se clasifica automáticamente como impedimento de navegación; hay que comprobar sus consecuencias para el plan concreto. Una reserva disponible tampoco borra el defecto del equipo afectado.\n\nCada aviso debe explicar qué ocurre, por qué importa, quién debe revisarlo y qué evidencia permitiría cerrarlo.',
  },
]);

export const contextText = [
  'CONTEXTO PÚBLICO DEL MODELO LUZ DE MAR. No incluye expediente privado ni datos reales de operación del yate.',
  'No hay sensores, meteorología ni comprobaciones actuales conectados. Distinguir orientación, supuestos y hechos verificados. El chat no autoriza salidas, compras ni actuaciones sobre equipos. Cuando falte información específica, reconocerlo y pedir su fuente y fecha.',
  ...contextFacts.map(fact => fact.title + '\n' + fact.answer),
].join('\n\n');

