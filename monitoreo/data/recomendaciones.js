/* ============================================================
   Sectores, recomendaciones y lista de verificación diaria
   Fuente: Informe Final Línea de Base (secciones 10.4, 11 y 13; Anexo 6)
   Para editar: cambiar textos acá y volver a publicar.
   ============================================================ */

window.PRIORIDAD_COLOR = { Alta: "#A32D2D", Media: "#C99A3E", Baja: "#2E7D4F", "Sin datos": "#7A7A7A" };

window.SECTORES = [
  {
    id: "A", nombre: "Paso Martínez", desde: 28.2, hasta: 29.6, prioridad: "Media",
    valores: "Aguilucho pescador (Busarellus); avistaje de lobito de río; albardón (U1) y pajonales; parches de bosque en Categoría I del OTBN (Prog. 29).",
    evitar: [
      "No intervenir márgenes con madrigueras o letrinas de lobito de río.",
      "No remover árboles con DAP ≥ 30 cm del albardón.",
    ],
    minimizar: [
      "Reducir la franja de operación en el parche de bosque OTBN (Prog. 29).",
      "Obrador y depósitos solo en pastizal modificado, fuera de los bajos.",
    ],
  },
  {
    id: "B", nombre: "Silva-López Romero", desde: 32.5, hasta: 33.7, prioridad: "Alta",
    valores: "Sector de mayor valor del tramo: bosques de barranca con ubajay, marmelero y lapacho rosado (U4–U5); madrigueras de lobito de río y mono carayá (Monumentos Naturales).",
    evitar: [
      "Dragado mínimo y franja de operación reducida.",
      "No intervenir a menos de 100 m de una madriguera activa de lobito.",
      "No talar ni podar árboles con mono carayá presente.",
      "Rodear todos los árboles con DAP ≥ 30 cm.",
    ],
    minimizar: [
      "Usar claros y caminos existentes.",
      "Evaluar no iniciar tareas en las primeras horas de la mañana (pico de actividad de fauna).",
    ],
  },
  {
    id: "C", nombre: "Los Molinos de Santa Lucía", desde: 34.1, hasta: 36.2, prioridad: "Alta",
    valores: "Máxima riqueza de aves del tramo (71 spp.), aves acuáticas, tropa de mono carayá; bosque en Categoría I del OTBN dentro de la franja (Prog. 35–36).",
    evitar: [
      "Dragado mínimo y franja reducida en el bosque OTBN Cat. I (Prog. 35–36): requiere el tratamiento de la Ley 26.331.",
      "No talar ni podar árboles con mono carayá presente.",
    ],
    minimizar: [
      "Relevamiento de nidos de aves acuáticas antes del avance.",
      "Usar claros y caminos existentes.",
    ],
  },
  {
    id: "D", nombre: "Bosque del punto medio", desde: 38.1, hasta: 39.1, prioridad: "Alta",
    valores: "Bosques mejor desarrollados del tramo: inundable (U7) y mesófilo de barranca (U8); tropa de mono carayá (8 ind.) y madriguera de lobito (S10); especies forestales exclusivas.",
    evitar: [
      "Dragado mínimo y franja reducida; rodear todos los árboles con DAP ≥ 30 cm.",
      "No intervenir a menos de 100 m de la madriguera de lobito hasta confirmar que fue abandonada.",
      "No talar ni podar árboles con mono carayá presente.",
    ],
    minimizar: [
      "Si ICAA decide acortar el meandro M5: solo corta asistida con brazo activo (sin rellenos ni depósitos).",
      "Evaluar no iniciar tareas en las primeras horas de la mañana.",
    ],
  },
  {
    id: "E", nombre: "Flia. Gómez-Romero", desde: 39.6, hasta: 40.5, prioridad: "Alta",
    valores: "46 spp. de aves; Tringa solitaria; nidos activos; galería y sabana.",
    evitar: [
      "Relevamiento de nidos activos antes de intervenir (zona de exclusión de 30 m por nido).",
      "Dragado mínimo y franja reducida.",
    ],
    minimizar: [
      "No ingresar con perros; controlar perros de la zona.",
      "Usar claros y caminos existentes.",
    ],
  },
  {
    id: "F", nombre: "Caá Cupé", desde: 40.5, hasta: 41.9, prioridad: "Alta",
    valores: "44 spp. de aves; segundo registro de Tringa solitaria; reproducción de chinchero (Lepidocolaptes); galería y matorral.",
    evitar: [
      "Relevamiento de nidos activos antes de intervenir.",
      "Dragado mínimo y franja reducida.",
    ],
    minimizar: [
      "Mantener los parches de monte que conectan la galería con el campo.",
    ],
  },
  {
    id: "G", nombre: "Afueras de la ciudad", desde: 46.0, hasta: 46.3, prioridad: "Baja",
    valores: "Pastizal modificado y relictos; erosión de margen (Prog. 46,1).",
    evitar: [
      "No ampliar la erosión de la margen en la Prog. 46,1.",
    ],
    minimizar: [
      "Revegetar la margen erosionada con especies nativas al terminar.",
      "Prevención de incendios (presencia de fuego y ganado).",
    ],
  },
  {
    id: "H", nombre: "Rotonda – Campo Molina", desde: 47.8, hasta: 48.2, prioridad: "Media",
    valores: "Relicto joven de bosque ribereño (U15) y pajonal; tuyuyú coral y bandurria (Mesembrinibis, Theristicus).",
    evitar: [
      "No remover el relicto ribereño U15 (prioridad de restauración pasiva).",
    ],
    minimizar: [
      "Excluir ganado del relicto al terminar la intervención.",
    ],
  },
  {
    id: "I", nombre: "Camping Las Palmeras", desde: 49.5, hasta: 50.25, prioridad: "Media",
    valores: "Pato real; mayor tasa de encuentro de mamíferos; bosque inundable (U17). Aguas arriba del camping: área control (no se interviene).",
    evitar: [
      "No ingresar con maquinaria aguas arriba del camping (área control del monitoreo).",
    ],
    minimizar: [
      "Retirar residuos sólidos de la costa.",
    ],
  },
];

window.MEANDROS = [
  { id: "M1", desde: 27.5, hasta: 27.7, rec: "Solo con estudio; beneficio bajo." },
  { id: "M2", desde: 31.0, hasta: 31.5, rec: "No recomendado sin estudio (meandro largo)." },
  { id: "M3", desde: 32.9, hasta: 33.2, rec: "Corta asistida, condicionada a estudio hidráulico." },
  { id: "M4", desde: 34.6, hasta: 35.4, rec: "No recomendado sin estudio." },
  { id: "M5", desde: 38.6, hasta: 39.0, rec: "Prioritario: corta asistida con brazo activo." },
  { id: "M6", desde: 40.2, hasta: 40.6, rec: "Corta asistida, condicionada a estudio hidráulico." },
  { id: "M7", desde: 43.9, hasta: 44.4, rec: "No recomendado sin estudio." },
];

// Recomendaciones que valen en todo el tramo (incluidos los tramos sin muestreo)
window.REC_GENERALES = {
  evitar: [
    "No remover árboles con DAP ≥ 30 cm (timbó, ubajay, marmelero, laurel, lapacho, tatané): rodearlos.",
    "No intervenir márgenes con madrigueras o letrinas de lobito de río (exclusión 100 m).",
    "No talar árboles con mono carayá presente.",
    "No dragar los pozos profundos: son refugio de peces y lobito.",
  ],
  minimizar: [
    "Accesos, obradores y depósitos solo en pastizal modificado; nunca en bosque, pajonal, bañado ni meandro.",
    "No formar bordos continuos con el material dragado; dejar aberturas.",
    "No ingresar maquinaria con restos vegetales o suelo de otros sitios.",
    "Prevención de incendios en toda la obra.",
  ],
  prohibido: [
    "Cazar, pescar o capturar fauna.",
    "Ingresar con perros.",
    "Alimentar animales o dejar residuos de comida.",
    "Talar árboles marcados.",
  ],
};

// Época reproductiva de aves: septiembre (8) a febrero (1), meses 0-indexados
window.esEpocaReproductiva = function (fecha) {
  const m = (fecha || new Date()).getMonth();
  return m >= 8 || m <= 1;
};

// Lista de verificación diaria (Anexo 6, punto 2 y 3)
window.CHECKLIST_DIARIA = [
  { id: "recorrido", texto: "Recorrí el sector a intervenir 15–30 min antes de empezar" },
  { id: "nidos", texto: "Revisé nidos, madrigueras y monos en los 200 m siguientes al frente" },
  { id: "arboles", texto: "Los árboles marcados (DAP ≥ 30 cm) siguen en pie y se rodearon" },
  { id: "ahuyentamiento", texto: "Hice ahuyentamiento pasivo (encender y avanzar despacio)" },
  { id: "sentido", texto: "Avancé desde lo más alterado hacia el monte, sin encerrar fauna contra el agua" },
  { id: "deposito", texto: "El material dragado fue a un sitio habilitado (pastizal, sin bordo continuo)" },
  { id: "perros", texto: "No hubo perros, caza ni residuos de comida en la obra" },
];

// Tipos de hallazgo. critico = genera alerta inmediata
window.HALLAZGO_TIPOS = [
  { id: "nido", texto: "Nido activo", critico: true },
  { id: "madriguera", texto: "Madriguera o letrina de lobito", critico: true },
  { id: "caraya", texto: "Mono carayá en el frente", critico: true },
  { id: "fauna_herida", texto: "Fauna herida o muerta", critico: true },
  { id: "primate_muerto", texto: "Primate enfermo o muerto (NO tocar)", critico: true },
  { id: "rescate", texto: "Rescate / liberación de fauna", critico: false },
  { id: "ahuyentamiento", texto: "Ahuyentamiento realizado", critico: false },
  { id: "mortandad_peces", texto: "Mortandad de peces", critico: true },
  { id: "otro", texto: "Otro", critico: false },
];
