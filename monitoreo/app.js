/* ============================================================
   Puntos de muestreo - Riachuelo
   App offline-first: IndexedDB local + sync con Supabase
   ============================================================ */

const TRACK = [[-27.522381,-58.647612],[-27.522228,-58.647543],[-27.521919,-58.647339],[-27.52174,-58.647206],[-27.521433,-58.64706],[-27.521326,-58.646942],[-27.521308,-58.646799],[-27.521388,-58.646609],[-27.521407,-58.646449],[-27.52141,-58.645787],[-27.521473,-58.645395],[-27.521626,-58.644975],[-27.521647,-58.644702],[-27.521333,-58.644142],[-27.521166,-58.644034],[-27.520924,-58.644212],[-27.520401,-58.644364],[-27.520392,-58.644817],[-27.520438,-58.645045],[-27.520442,-58.645632],[-27.520378,-58.645976],[-27.520126,-58.646525],[-27.519829,-58.646847],[-27.519214,-58.647462],[-27.518843,-58.647639],[-27.518606,-58.64758],[-27.518185,-58.647065],[-27.51788,-58.646921],[-27.517452,-58.646552],[-27.517644,-58.646087],[-27.51771,-58.645538],[-27.517821,-58.645158],[-27.518267,-58.644765],[-27.518498,-58.644377],[-27.518254,-58.643565],[-27.518144,-58.642971],[-27.517903,-58.642376],[-27.517677,-58.64203],[-27.51724,-58.641571],[-27.516922,-58.641271],[-27.516706,-58.641225],[-27.516507,-58.641535],[-27.516413,-58.641836],[-27.516193,-58.641956],[-27.515898,-58.641821],[-27.515664,-58.641448],[-27.515465,-58.641297],[-27.515177,-58.641177],[-27.51463,-58.640583],[-27.514317,-58.640414],[-27.513826,-58.640105],[-27.51359,-58.639828],[-27.513319,-58.639348],[-27.513382,-58.638947],[-27.513639,-58.638718],[-27.514087,-58.638848],[-27.51444,-58.639091],[-27.514647,-58.639586],[-27.514786,-58.639827],[-27.515197,-58.640066],[-27.515462,-58.640087],[-27.515617,-58.639883],[-27.515819,-58.639273],[-27.516132,-58.6388],[-27.516448,-58.638193],[-27.516515,-58.637842],[-27.516256,-58.637449],[-27.515939,-58.637461],[-27.515688,-58.637607],[-27.515231,-58.637543],[-27.514962,-58.637348],[-27.514951,-58.637014],[-27.515012,-58.636485],[-27.514838,-58.636002],[-27.514601,-58.635865],[-27.514336,-58.635893],[-27.51419,-58.63613],[-27.514116,-58.636357],[-27.5141,-58.636592],[-27.514,-58.636947],[-27.513929,-58.637179],[-27.513653,-58.637349],[-27.513348,-58.637258],[-27.513326,-58.636938],[-27.513426,-58.636564],[-27.513358,-58.636252],[-27.512998,-58.636009],[-27.512619,-58.635782],[-27.512099,-58.63536],[-27.511961,-58.63508],[-27.511752,-58.634339],[-27.51191,-58.633762],[-27.512091,-58.632886],[-27.512294,-58.631835],[-27.512728,-58.630868],[-27.512933,-58.629907],[-27.512616,-58.629614],[-27.512611,-58.629613],[-27.512311,-58.629771],[-27.512284,-58.630022],[-27.512167,-58.630328],[-27.511977,-58.630705],[-27.51168,-58.630954],[-27.511172,-58.6311],[-27.510654,-58.630686],[-27.510109,-58.629847],[-27.510081,-58.629314],[-27.5104,-58.628815],[-27.510758,-58.628501],[-27.511254,-58.62824],[-27.511634,-58.628206],[-27.512063,-58.628202],[-27.512306,-58.628129],[-27.512452,-58.628048],[-27.512902,-58.627367],[-27.513227,-58.626646],[-27.513199,-58.62633],[-27.513218,-58.625928],[-27.5132,-58.62571],[-27.513065,-58.625007],[-27.513084,-58.624801],[-27.513418,-58.624039],[-27.513791,-58.623512],[-27.514056,-58.623188],[-27.514301,-58.622812],[-27.514184,-58.622372],[-27.513889,-58.622132],[-27.513577,-58.622039],[-27.512763,-58.621895],[-27.512463,-58.622022],[-27.512387,-58.622306],[-27.512401,-58.622566],[-27.512418,-58.6231],[-27.512427,-58.623466],[-27.51231,-58.623787],[-27.511979,-58.623939],[-27.511455,-58.623423],[-27.510953,-58.623318],[-27.51053,-58.623297],[-27.510241,-58.622866],[-27.510241,-58.622112],[-27.510397,-58.621675],[-27.510621,-58.621643],[-27.510866,-58.621978],[-27.511282,-58.622031],[-27.511283,-58.622041],[-27.511613,-58.621948],[-27.511841,-58.621812],[-27.512129,-58.621189],[-27.512331,-58.620765],[-27.5125,-58.620138],[-27.512576,-58.619783],[-27.512383,-58.618782],[-27.512157,-58.61825],[-27.511713,-58.618125],[-27.511529,-58.618314],[-27.511298,-58.618359],[-27.511004,-58.618277],[-27.510531,-58.618044],[-27.510285,-58.617557],[-27.510238,-58.617082],[-27.510072,-58.616564],[-27.509768,-58.615832],[-27.509609,-58.61513],[-27.510103,-58.614863],[-27.510443,-58.614768],[-27.510703,-58.614484],[-27.510829,-58.614158],[-27.510828,-58.614149],[-27.51082,-58.613818],[-27.510558,-58.613618],[-27.509881,-58.613422],[-27.50937,-58.613147],[-27.509136,-58.612775],[-27.509072,-58.61241],[-27.509197,-58.611977],[-27.509405,-58.611671],[-27.509611,-58.611527],[-27.509786,-58.611498],[-27.510311,-58.611247],[-27.510869,-58.611264],[-27.511261,-58.611298],[-27.51173,-58.61122],[-27.511848,-58.610948],[-27.512394,-58.610843],[-27.512986,-58.610924],[-27.513284,-58.610931],[-27.51347,-58.610845],[-27.513526,-58.610751],[-27.513712,-58.6109],[-27.513804,-58.611148],[-27.513885,-58.611465],[-27.513805,-58.611754],[-27.513657,-58.612007],[-27.513537,-58.612182],[-27.513609,-58.612533],[-27.513761,-58.612691],[-27.514034,-58.612753],[-27.51428,-58.612593],[-27.514447,-58.612156],[-27.514406,-58.6118],[-27.514551,-58.61142],[-27.514661,-58.610753],[-27.514608,-58.610324],[-27.514225,-58.609743],[-27.513961,-58.609546],[-27.513972,-58.609274],[-27.514159,-58.609075],[-27.514544,-58.608345],[-27.514795,-58.607836],[-27.515302,-58.607625],[-27.515746,-58.607344],[-27.515786,-58.606448],[-27.515756,-58.606015],[-27.515859,-58.60429],[-27.516789,-58.604063],[-27.51744,-58.604482],[-27.518424,-58.604553],[-27.518859,-58.603588],[-27.519354,-58.60333],[-27.520047,-58.603461],[-27.520104,-58.6025],[-27.519772,-58.602554],[-27.519765,-58.602555],[-27.519193,-58.602776],[-27.519157,-58.602797],[-27.518831,-58.602937],[-27.518784,-58.602926],[-27.518761,-58.602913],[-27.518714,-58.602902],[-27.517846,-58.602924],[-27.517423,-58.602566],[-27.517438,-58.601652],[-27.517834,-58.601102],[-27.518196,-58.600954],[-27.518154,-58.600335],[-27.518153,-58.600327],[-27.517558,-58.598827],[-27.517221,-58.597327],[-27.516168,-58.596587],[-27.515481,-58.59554],[-27.514606,-58.595504],[-27.513675,-58.594792],[-27.514209,-58.594477],[-27.515456,-58.594653],[-27.515455,-58.594634],[-27.515704,-58.594134],[-27.516713,-58.59419],[-27.517852,-58.594243],[-27.5183,-58.594072],[-27.518525,-58.593616],[-27.518109,-58.593156],[-27.517509,-58.593165],[-27.517341,-58.59273],[-27.517556,-58.592028],[-27.518502,-58.591596],[-27.518918,-58.590222],[-27.518533,-58.590043],[-27.518667,-58.58964],[-27.518869,-58.589333],[-27.518766,-58.588967],[-27.5183,-58.588606],[-27.518172,-58.588957],[-27.517855,-58.588985],[-27.517917,-58.588523],[-27.517828,-58.588144],[-27.51722,-58.588125],[-27.516852,-58.587951],[-27.51578,-58.587169],[-27.51476,-58.586461],[-27.513799,-58.586161],[-27.513321,-58.585433],[-27.513336,-58.584784],[-27.514047,-58.584283],[-27.514565,-58.584121],[-27.515398,-58.584436],[-27.515937,-58.584421],[-27.51625,-58.583793],[-27.516623,-58.582863],[-27.517007,-58.582521],[-27.516352,-58.581377],[-27.515583,-58.581506],[-27.514753,-58.581609],[-27.514021,-58.581592],[-27.513748,-58.582256],[-27.513645,-58.582841],[-27.512941,-58.583509],[-27.512227,-58.583356],[-27.512366,-58.582818],[-27.513093,-58.582004],[-27.513144,-58.581134],[-27.512692,-58.580779],[-27.511901,-58.580489],[-27.511565,-58.579611],[-27.511734,-58.578348],[-27.510985,-58.578415],[-27.510955,-58.578415],[-27.510157,-58.57835],[-27.510146,-58.57835],[-27.509858,-58.577758],[-27.509854,-58.577698],[-27.51088,-58.57666],[-27.510936,-58.575378],[-27.511584,-58.575208],[-27.512401,-58.574759],[-27.512399,-58.574724],[-27.51277,-58.574087],[-27.513524,-58.573947],[-27.514025,-58.573258],[-27.514063,-58.572305],[-27.513722,-58.571931],[-27.51317,-58.572106],[-27.513044,-58.572728],[-27.512564,-58.573065],[-27.512313,-58.572582],[-27.512294,-58.572566],[-27.512303,-58.571822],[-27.512354,-58.570958],[-27.512555,-58.570372],[-27.512564,-58.570028],[-27.511908,-58.570104],[-27.511344,-58.570408],[-27.511315,-58.570411],[-27.510692,-58.570185],[-27.509994,-58.569291],[-27.509322,-58.5685],[-27.509189,-58.567302],[-27.508434,-58.566729],[-27.507993,-58.567199],[-27.50804,-58.568324],[-27.507727,-58.568819],[-27.507718,-58.56882],[-27.507042,-58.568755],[-27.506411,-58.568086],[-27.505853,-58.567858],[-27.505007,-58.568304],[-27.504017,-58.568519],[-27.50313,-58.567369],[-27.503412,-58.56595],[-27.50341,-58.565912],[-27.503576,-58.564765],[-27.502572,-58.563754],[-27.501826,-58.564709],[-27.501795,-58.564715],[-27.50071,-58.564565],[-27.499995,-58.563625],[-27.499965,-58.563601],[-27.499106,-58.561582],[-27.500104,-58.559945],[-27.500076,-58.559929],[-27.499919,-58.558777],[-27.50056,-58.558045],[-27.499782,-58.556922],[-27.498801,-58.555831],[-27.498505,-58.554678]];
const MID_IDX = 220;
const SUB1 = TRACK.slice(0, MID_IDX + 1);
const SUB2 = TRACK.slice(MID_IDX);

const TIPO_LABEL = { ave: "Ave", camara: "Cámara trampa", acceso: "Fácil acceso", interes: "Punto de interés", cobertura: "Cobertura vegetal" };
const TIPO_COLOR = { ave: "#2F6FA3", camara: "#6B4FA0", acceso: "#2E7D4F", interes: "#C99A3E" };

// ---------- Supabase client ----------
const sb = window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);

// ---------- IndexedDB ----------
const DB_NAME = "riachuelo_db";
const DB_VERSION = 2;
let dbPromise = null;

function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("puntos")) db.createObjectStore("puntos", { keyPath: "id" });
      if (!db.objectStoreNames.contains("categorias")) db.createObjectStore("categorias", { keyPath: "id" });
      if (!db.objectStoreNames.contains("registros_obra")) db.createObjectStore("registros_obra", { keyPath: "id" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

async function idbAll(store) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}
async function idbPut(store, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).put(value);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
async function idbDelete(store, id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ---------- State ----------
let currentUser = null;
let currentProfile = null;
let categorias = [];
let puntos = [];
let map, markersLayer, satLayer, streetLayer;
let pendingLatLng = null;
let pendingMarker = null;
let activeFilter = "todos";
let onlyHallazgos = false;

function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return "id-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
}

// ============================================================
// AUTH
// ============================================================
const authScreen = document.getElementById("auth-screen");
const appScreen = document.getElementById("app-screen");
const authError = document.getElementById("auth-error");
let authMode = "login";

document.getElementById("auth-toggle-btn").onclick = () => {
  authMode = authMode === "login" ? "signup" : "login";
  document.getElementById("auth-title").textContent = authMode === "login" ? "Ingresar" : "Crear cuenta";
  document.getElementById("nombre-field").style.display = authMode === "signup" ? "block" : "none";
  document.getElementById("auth-submit").textContent = authMode === "login" ? "Ingresar" : "Crear cuenta";
  document.getElementById("auth-toggle-btn").textContent = authMode === "login" ? "Crear cuenta nueva" : "Ya tengo cuenta";
  authError.style.display = "none";
};

document.getElementById("auth-form").onsubmit = async (e) => {
  e.preventDefault();
  authError.style.display = "none";
  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value;
  const nombre = document.getElementById("auth-nombre").value.trim();
  try {
    if (authMode === "login") {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } else {
      const { error } = await sb.auth.signUp({ email, password, options: { data: { nombre: nombre || email.split("@")[0] } } });
      if (error) throw error;
    }
    await afterLogin();
  } catch (err) {
    authError.textContent = err.message || "No se pudo completar la operación.";
    authError.style.display = "block";
  }
};

document.getElementById("logout-btn").onclick = async () => {
  await sb.auth.signOut();
  location.reload();
};

async function afterLogin() {
  // getSession funciona sin señal (usa la sesión guardada en el dispositivo)
  const { data } = await sb.auth.getSession();
  currentUser = data.session && data.session.user;
  if (!currentUser) return;
  try {
    const { data: profile } = await sb.from("profiles").select("*").eq("id", currentUser.id).single();
    currentProfile = profile;
    // se guarda en el dispositivo para poder usarlo sin señal
    if (profile) localStorage.setItem("riachuelo_perfil", JSON.stringify(profile));
  } catch (e) { /* sin conexión */ }
  if (!currentProfile) {
    try {
      const guardado = JSON.parse(localStorage.getItem("riachuelo_perfil"));
      if (guardado && guardado.id === currentUser.id) currentProfile = guardado;
    } catch (e) {}
  }
  if (!currentProfile) currentProfile = { nombre: currentUser.email.split("@")[0] };
  // antes de correr la migración v2 no existe la columna rol: se trata como equipo
  if (!currentProfile.rol) currentProfile.rol = "equipo";
  document.getElementById("user-name").textContent = (currentProfile && currentProfile.nombre) || currentUser.email;
  authScreen.style.display = "none";
  appScreen.style.display = "block";
  await initApp();
}

// ============================================================
// SYNC: categorias
// ============================================================
async function loadCategorias() {
  if (navigator.onLine) {
    try {
      const { data, error } = await sb.from("cobertura_categorias").select("*").order("nombre");
      if (error) throw error;
      categorias = data;
      for (const c of categorias) await idbPut("categorias", c);
      return categorias;
    } catch (e) {
      categorias = await idbAll("categorias");
      return categorias;
    }
  }
  categorias = await idbAll("categorias");
  return categorias;
}

async function crearCategoria(nombre, color) {
  if (!navigator.onLine) {
    alert("Necesitás conexión para crear una categoría nueva. Podés elegir una existente mientras tanto.");
    return null;
  }
  const { data, error } = await sb.from("cobertura_categorias").insert({ nombre, color, created_by: currentUser.id }).select().single();
  if (error) {
    alert("No se pudo crear la categoría: " + error.message);
    return null;
  }
  categorias.push(data);
  await idbPut("categorias", data);
  return data;
}

// ============================================================
// SYNC: puntos
// ============================================================
async function loadPuntos() {
  const local = await idbAll("puntos");
  if (navigator.onLine) {
    try {
      const { data, error } = await sb.from("puntos").select("*");
      if (error) throw error;
      const pendingLocal = local.filter((p) => p._pending);
      const remoteIds = new Set(data.map((p) => p.id));
      for (const p of data) await idbPut("puntos", p);
      // conservar los que están pendientes de subir (todavía no existen en remoto)
      const merged = data.concat(pendingLocal.filter((p) => !remoteIds.has(p.id)));
      puntos = merged;
      updateSyncPill();
      return puntos;
    } catch (e) {
      puntos = local;
      return puntos;
    }
  }
  puntos = local;
  return puntos;
}

async function guardarPuntoRemoto(record) {
  const payload = { ...record };
  delete payload._pending;
  delete payload._foto_pending_dataurl;
  const { error } = await sb.from("puntos").upsert(payload);
  if (error) throw error;
}

async function subirFotoPendiente(record) {
  if (!record._foto_pending_dataurl) return record;
  const res = await fetch(record._foto_pending_dataurl);
  const blob = await res.blob();
  const ext = (blob.type.split("/")[1] || "jpg").split("+")[0];
  const path = record.id + "." + ext;
  const { error } = await sb.storage.from("fotos-puntos").upload(path, blob, { upsert: true });
  if (error) throw error;
  const { data } = sb.storage.from("fotos-puntos").getPublicUrl(path);
  record.foto_url = data.publicUrl;
  delete record._foto_pending_dataurl;
  return record;
}

async function guardarPunto(record) {
  record._pending = true;
  await idbPut("puntos", record);
  puntos = puntos.filter((p) => p.id !== record.id).concat(record);
  updateSyncPill();
  if (navigator.onLine) {
    try {
      const withFoto = await subirFotoPendiente(record);
      await guardarPuntoRemoto(withFoto);
      withFoto._pending = false;
      await idbPut("puntos", withFoto);
      puntos = puntos.filter((p) => p.id !== record.id).concat(withFoto);
    } catch (e) {
      // se queda pendiente, se reintenta luego
    }
  }
  updateSyncPill();
  return record;
}

async function eliminarPunto(id) {
  puntos = puntos.filter((p) => p.id !== id);
  await idbDelete("puntos", id);
  if (navigator.onLine) {
    try {
      await sb.from("puntos").delete().eq("id", id);
    } catch (e) {
      // si falla, ya se borró localmente; no se reintenta el borrado remoto en esta version simple
    }
  }
}

async function syncPending() {
  if (!navigator.onLine) return;
  const local = await idbAll("puntos");
  const pending = local.filter((p) => p._pending);
  for (const record of pending) {
    try {
      const withFoto = await subirFotoPendiente(record);
      await guardarPuntoRemoto(withFoto);
      withFoto._pending = false;
      await idbPut("puntos", withFoto);
    } catch (e) {
      // sigue pendiente
    }
  }
  await loadPuntos();
  renderAll();
}

function updateSyncPill() {
  const pendingCount = puntos.filter((p) => p._pending).length;
  const pill = document.getElementById("pending-pill");
  if (pendingCount > 0) {
    pill.style.display = "inline-block";
    pill.textContent = pendingCount + " sin sincronizar";
  } else {
    pill.style.display = "none";
  }
}

function updateOnlinePill() {
  const pill = document.getElementById("online-pill");
  if (navigator.onLine) {
    pill.className = "pill online";
    pill.textContent = "En línea";
  } else {
    pill.className = "pill offline";
    pill.textContent = "Sin conexión";
  }
}

window.addEventListener("online", () => { updateOnlinePill(); syncPending(); });
window.addEventListener("offline", updateOnlinePill);
setInterval(() => { if (navigator.onLine) syncPending(); }, 30000);

// ============================================================
// MAP
// ============================================================
function initMap() {
  map = L.map("map").setView([-27.512, -58.6], 13);

  satLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { attribution: "Esri", maxZoom: 18 }).addTo(map);
  streetLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "OpenStreetMap", maxZoom: 19, subdomains: ["a"] });

  document.getElementById("basemap-sat").onclick = () => {
    map.removeLayer(streetLayer); satLayer.addTo(map);
    document.getElementById("basemap-sat").classList.add("active");
    document.getElementById("basemap-street").classList.remove("active");
  };
  document.getElementById("basemap-street").onclick = () => {
    map.removeLayer(satLayer); streetLayer.addTo(map);
    document.getElementById("basemap-street").classList.add("active");
    document.getElementById("basemap-sat").classList.remove("active");
  };

  // Eje de obra Etapa IV (KMZ de ICAA), dividido en el punto medio (Prog. 38,70)
  const EJE_LL = window.EJE.map((p) => [p[0], p[1]]);
  const iMid = window.EJE.findIndex((p) => p[2] >= 38.7);
  L.polyline(EJE_LL.slice(0, iMid + 1), { color: "#1F3B2C", weight: 4, interactive: false }).addTo(map);
  L.polyline(EJE_LL.slice(iMid), { color: "#C99A3E", weight: 4, interactive: false }).addTo(map);

  function refMarker(latlng, label) {
    L.circleMarker(latlng, { radius: 7, color: "#fff", weight: 2, fillColor: "#8C2F2F", fillOpacity: 1, interactive: false }).addTo(map).bindTooltip(label);
  }
  const enProg = (v) => { const p = window.EJE.find((q) => q[2] >= v) || window.EJE[window.EJE.length - 1]; return [p[0], p[1]]; };
  refMarker(enProg(27.15), "Prog. 27,150 (inicio del tramo)");
  refMarker(enProg(38.7), "Prog. 38,70 – División Sub-tramo 1 / 2");
  refMarker(enProg(47.047), "Prog. 47,047 – Cruce RP 5");
  refMarker(enProg(50.25), "Prog. 50,250 – Camping Las Palmeras");

  markersLayer = L.layerGroup().addTo(map);

  map.on("click", (e) => {
    if (currentProfile && currentProfile.rol !== "equipo") return; // solo el equipo carga puntos de muestreo
    pendingLatLng = e.latlng;
    if (pendingMarker) map.removeLayer(pendingMarker);
    pendingMarker = L.circleMarker(e.latlng, { radius: 8, color: "#333", weight: 2, fillColor: "#fff", fillOpacity: 0.9, dashArray: "3,3" }).addTo(map);
    document.getElementById("form-card").style.display = "block";
    document.getElementById("form-coords").textContent = e.latlng.lat.toFixed(5) + ", " + e.latlng.lng.toFixed(5);
    document.getElementById("form-card").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

function colorFor(p) {
  if (p.tipo === "cobertura") {
    const cat = categorias.find((c) => c.id === p.cobertura_categoria_id);
    return cat ? cat.color : "#7A7A7A";
  }
  return TIPO_COLOR[p.tipo] || "#666";
}
function labelFor(p) {
  if (p.tipo === "cobertura") {
    const cat = categorias.find((c) => c.id === p.cobertura_categoria_id);
    return "Cobertura: " + (cat ? cat.nombre : "sin categoría");
  }
  return TIPO_LABEL[p.tipo] || p.tipo;
}

function popupHtml(p) {
  let html = "<b>" + labelFor(p) + "</b>" + (p.hallazgo ? ' <span class="badge-find">Hallazgo</span>' : "");
  html += "<br>" + (p.autor_nombre || "") + (p.fecha ? " · " + p.fecha : "");
  if (p.nota) html += "<br>" + escapeHtml(p.nota);
  if (p.tabla_datos && p.tabla_datos.length) {
    html += '<table class="mini-table">' + p.tabla_datos.map((r) => "<tr><td>" + escapeHtml(r.campo || "") + "</td><td>" + escapeHtml(r.valor || "") + "</td></tr>").join("") + "</table>";
  }
  const foto = p.foto_url || p._foto_pending_dataurl;
  if (foto) html += '<img class="point-photo" src="' + foto + '" />';
  return html;
}

function escapeHtml(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

function filteredPoints() {
  return puntos.filter((p) => {
    if (onlyHallazgos && !p.hallazgo) return false;
    if (activeFilter !== "todos" && p.tipo !== activeFilter) return false;
    return true;
  });
}

function renderMarkers() {
  markersLayer.clearLayers();
  filteredPoints().forEach((p) => {
    const m = L.circleMarker([p.lat, p.lng], {
      radius: p.hallazgo ? 9 : 7,
      color: p.hallazgo ? "#C99A3E" : "#fff",
      weight: p.hallazgo ? 3 : 1.5,
      fillColor: colorFor(p),
      fillOpacity: 0.95,
    });
    m.bindPopup(popupHtml(p));
    m.addTo(markersLayer);
  });
}

function renderList() {
  const list = document.getElementById("point-list");
  const items = filteredPoints().slice().sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));
  document.getElementById("point-count").textContent = items.length;
  if (!items.length) {
    list.innerHTML = '<div class="empty">No hay puntos con este filtro.</div>';
    return;
  }
  list.innerHTML = "";
  items.forEach((p) => {
    const row = document.createElement("div");
    row.className = "point-row";
    row.innerHTML =
      '<div class="point-top"><span class="point-tag" style="color:' + colorFor(p) + '">' + labelFor(p) + "</span>" +
      (p.hallazgo ? '<span class="badge-find">Hallazgo</span>' : "") + (p._pending ? '<span class="badge-find" style="background:#FBEAEA;color:#A32D2D;">sin sync</span>' : "") + "</div>" +
      '<div class="point-meta">' + (p.autor_nombre || "") + (p.fecha ? " · " + p.fecha : "") + "</div>" +
      (p.nota ? '<div class="point-note">' + escapeHtml(p.nota) + "</div>" : "") +
      '<div class="point-actions"><button class="link-btn" data-go="' + p.lat + "," + p.lng + '">Ir al punto</button>' +
      (currentProfile && currentProfile.rol === "equipo" ? '<button class="link-btn" data-del="' + p.id + '">Eliminar</button>' : "") + "</div>";
    list.appendChild(row);
  });
  list.querySelectorAll("[data-go]").forEach((btn) => {
    btn.onclick = () => {
      const [lat, lng] = btn.getAttribute("data-go").split(",").map(Number);
      map.setView([lat, lng], 16);
    };
  });
  list.querySelectorAll("[data-del]").forEach((btn) => {
    btn.onclick = async () => { await eliminarPunto(btn.getAttribute("data-del")); renderAll(); };
  });
}

function renderAll() { renderMarkers(); renderList(); updateSyncPill(); }

// ============================================================
// FORM
// ============================================================
function renderCategoriaOptions() {
  const sel = document.getElementById("f-cobertura");
  sel.innerHTML = categorias.map((c) => '<option value="' + c.id + '">' + escapeHtml(c.nombre) + "</option>").join("") + '<option value="__new__">+ Agregar categoría nueva...</option>';
}

document.getElementById("f-tipo").onchange = (e) => {
  document.getElementById("cobertura-wrap").style.display = e.target.value === "cobertura" ? "block" : "none";
};
document.getElementById("f-cobertura").onchange = (e) => {
  document.getElementById("newcat-wrap").style.display = e.target.value === "__new__" ? "flex" : "none";
};
document.getElementById("newcat-add-btn").onclick = async () => {
  const nombre = document.getElementById("newcat-nombre").value.trim();
  const color = document.getElementById("newcat-color").value;
  if (!nombre) return;
  const cat = await crearCategoria(nombre, color);
  if (cat) {
    renderCategoriaOptions();
    document.getElementById("f-cobertura").value = cat.id;
    document.getElementById("newcat-wrap").style.display = "none";
    document.getElementById("newcat-nombre").value = "";
  }
};

function addTableRow(campo, valor) {
  const wrap = document.getElementById("table-rows");
  const row = document.createElement("div");
  row.className = "table-editor-row";
  row.innerHTML = '<input type="text" placeholder="Campo (ej: especie)" class="te-campo" value="' + escapeHtml(campo || "") + '"><input type="text" placeholder="Valor" class="te-valor" value="' + escapeHtml(valor || "") + '"><button type="button" class="btn small danger te-remove">Quitar</button>';
  row.querySelector(".te-remove").onclick = () => row.remove();
  wrap.appendChild(row);
}
document.getElementById("table-add-row").onclick = () => addTableRow("", "");

document.getElementById("f-foto").onchange = (e) => {
  const file = e.target.files[0];
  const preview = document.getElementById("photo-preview");
  if (!file) { preview.style.display = "none"; return; }
  const reader = new FileReader();
  reader.onload = () => { preview.src = reader.result; preview.style.display = "block"; };
  reader.readAsDataURL(file);
};

document.getElementById("point-form").onsubmit = async (e) => {
  e.preventDefault();
  if (!pendingLatLng) return;
  const tipo = document.getElementById("f-tipo").value;
  const fecha = document.getElementById("f-fecha").value;
  if (!fecha) { alert("La fecha es obligatoria."); return; }
  let cobertura_categoria_id = null;
  if (tipo === "cobertura") {
    cobertura_categoria_id = document.getElementById("f-cobertura").value;
    if (!cobertura_categoria_id || cobertura_categoria_id === "__new__") { alert("Elegí o creá una categoría de cobertura."); return; }
  }
  const nota = document.getElementById("f-nota").value.trim();
  const hallazgo = document.getElementById("f-hallazgo").checked;
  const tabla_datos = Array.from(document.querySelectorAll(".table-editor-row")).map((row) => ({
    campo: row.querySelector(".te-campo").value.trim(),
    valor: row.querySelector(".te-valor").value.trim(),
  })).filter((r) => r.campo || r.valor);

  const record = {
    id: uuid(), tipo, cobertura_categoria_id, lat: pendingLatLng.lat, lng: pendingLatLng.lng,
    fecha, autor_id: currentUser.id, autor_nombre: (currentProfile && currentProfile.nombre) || currentUser.email,
    nota, hallazgo, tabla_datos, foto_url: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  };

  const fotoInput = document.getElementById("f-foto");
  if (fotoInput.files[0]) {
    record._foto_pending_dataurl = await new Promise((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.readAsDataURL(fotoInput.files[0]);
    });
  }

  await guardarPunto(record);
  renderAll();

  if (pendingMarker) { map.removeLayer(pendingMarker); pendingMarker = null; }
  pendingLatLng = null;
  document.getElementById("point-form").reset();
  document.getElementById("table-rows").innerHTML = "";
  document.getElementById("photo-preview").style.display = "none";
  document.getElementById("cobertura-wrap").style.display = "none";
  document.getElementById("form-card").style.display = "none";
  document.getElementById("f-fecha").value = new Date().toISOString().slice(0, 10);
};

document.getElementById("cancel-form").onclick = () => {
  if (pendingMarker) { map.removeLayer(pendingMarker); pendingMarker = null; }
  pendingLatLng = null;
  document.getElementById("form-card").style.display = "none";
};

// ---------- Filters ----------
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.onclick = () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.getAttribute("data-filter");
    renderAll();
  };
});
document.getElementById("filter-hallazgos").onclick = (e) => {
  onlyHallazgos = !onlyHallazgos;
  e.target.classList.toggle("active", onlyHallazgos);
  renderAll();
};

document.getElementById("refresh-btn").onclick = async () => {
  await loadCategorias();
  renderCategoriaOptions();
  await loadPuntos();
  renderAll();
  document.getElementById("map-status").textContent = "Actualizado " + new Date().toLocaleTimeString();
};

// ============================================================
// Offline tile pre-download
// ============================================================
function lon2tile(lon, z) { return Math.floor(((lon + 180) / 360) * Math.pow(2, z)); }
function lat2tile(lat, z) {
  return Math.floor(((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * Math.pow(2, z));
}

document.getElementById("download-tiles-btn").onclick = async () => {
  if (!navigator.onLine) { alert("Necesitás conexión para descargar el mapa offline."); return; }
  const lats = TRACK.map((p) => p[0]).concat(window.EJE.map((p) => p[0]));
  const lngs = TRACK.map((p) => p[1]).concat(window.EJE.map((p) => p[1]));
  const pad = 0.03;
  const bbox = { minLat: Math.min(...lats) - pad, maxLat: Math.max(...lats) + pad, minLng: Math.min(...lngs) - pad, maxLng: Math.max(...lngs) + pad };
  const zooms = [12, 13, 14];
  const urls = [];
  zooms.forEach((z) => {
    const x1 = lon2tile(bbox.minLng, z), x2 = lon2tile(bbox.maxLng, z);
    const y1 = lat2tile(bbox.maxLat, z), y2 = lat2tile(bbox.minLat, z);
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        urls.push("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/" + z + "/" + y + "/" + x);
        urls.push("https://a.tile.openstreetmap.org/" + z + "/" + x + "/" + y + ".png");
      }
    }
  });
  document.getElementById("download-status").textContent = "Descargando " + urls.length + " baldosas...";
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: "PRECACHE_TILES", urls });
  }
  setTimeout(() => { document.getElementById("download-status").textContent = "Listo. El mapa de la zona ya quedó disponible sin conexión."; }, 4000);
};

// ============================================================
// INIT
// ============================================================
async function initApp() {
  updateOnlinePill();
  document.getElementById("f-fecha").value = new Date().toISOString().slice(0, 10);
  initMap();
  await loadCategorias();
  renderCategoriaOptions();
  await loadPuntos();
  renderAll();
  syncPending();
  await initObra();
}

(async function boot() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
  const { data } = await sb.auth.getSession();
  if (data.session) {
    await afterLogin();
  } else {
    authScreen.style.display = "flex";
  }
})();
