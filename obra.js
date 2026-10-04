/* ============================================================
   Módulo de obra: ubicación por progresiva, recomendaciones por
   sector, registros de obra (avance, árboles, hallazgos, medidas),
   alertas y resumen quincenal.
   Usa las variables globales de app.js: sb, map, currentUser,
   currentProfile, idbAll, idbPut, uuid, escapeHtml.
   ============================================================ */

let registrosObra = [];
let ubicacion = null; // { lat, lng, prog, dist, precision, manual }
let gpsWatchId = null;
let obraLayer = null;
let posMarker = null;

const ROL = () => (currentProfile && currentProfile.rol) || "equipo";
const puede = {
  verMapaEdicion: () => ROL() === "equipo",
  cargarObra: () => ["equipo", "obra"].includes(ROL()),
  cargarHallazgo: () => true,
  verAlertas: () => ["equipo", "icaa"].includes(ROL()),
  verResumen: () => ["equipo", "icaa", "obra"].includes(ROL()),
};

// ============================================================
// Geometría: proyección sobre el eje de obra
// ============================================================
const RT = 6371000;
const LAT0 = (-27.51 * Math.PI) / 180;
function toXY(lat, lng) {
  return [((lng * Math.PI) / 180) * RT * Math.cos(LAT0), ((lat * Math.PI) / 180) * RT];
}
const EJE_XY = window.EJE.map((p) => toXY(p[0], p[1]));

function proyectar(lat, lng) {
  const P = toXY(lat, lng);
  let best = { dist: Infinity, prog: null };
  for (let i = 1; i < EJE_XY.length; i++) {
    const A = EJE_XY[i - 1], B = EJE_XY[i];
    const dx = B[0] - A[0], dy = B[1] - A[1];
    const L2 = dx * dx + dy * dy;
    let t = L2 ? ((P[0] - A[0]) * dx + (P[1] - A[1]) * dy) / L2 : 0;
    t = Math.max(0, Math.min(1, t));
    const d = Math.hypot(A[0] + t * dx - P[0], A[1] + t * dy - P[1]);
    if (d < best.dist) {
      best = { dist: d, prog: window.EJE[i - 1][2] + t * (window.EJE[i][2] - window.EJE[i - 1][2]) };
    }
  }
  return best;
}

function puntoEnProg(prog) {
  const E = window.EJE;
  for (let i = 1; i < E.length; i++) {
    if (prog <= E[i][2]) {
      const t = (prog - E[i - 1][2]) / (E[i][2] - E[i - 1][2] || 1);
      return [E[i - 1][0] + t * (E[i][0] - E[i - 1][0]), E[i - 1][1] + t * (E[i][1] - E[i - 1][1])];
    }
  }
  return [E[E.length - 1][0], E[E.length - 1][1]];
}

const sectorDe = (prog) => window.SECTORES.find((s) => prog >= s.desde && prog <= s.hasta) || null;
const meandroDe = (prog) => window.MEANDROS.find((m) => prog >= m.desde - 0.1 && prog <= m.hasta + 0.1) || null;
const fmtProg = (p) => (p == null || isNaN(p) ? "—" : Number(p).toFixed(3).replace(".", ","));
const hoy = () => new Date().toISOString().slice(0, 10);

// ============================================================
// GPS
// ============================================================
function iniciarGPS() {
  if (!("geolocation" in navigator)) {
    document.getElementById("gps-estado").textContent = "Este dispositivo no tiene GPS disponible.";
    return;
  }
  if (gpsWatchId != null) navigator.geolocation.clearWatch(gpsWatchId);
  gpsWatchId = navigator.geolocation.watchPosition(
    (pos) => {
      if (ubicacion && ubicacion.manual) return;
      const { latitude: lat, longitude: lng, accuracy } = pos.coords;
      const pr = proyectar(lat, lng);
      ubicacion = { lat, lng, prog: pr.prog, dist: pr.dist, precision: accuracy, manual: false };
      renderSector();
      moverMarcadorPosicion();
    },
    (err) => {
      document.getElementById("gps-estado").textContent =
        "No se pudo obtener la ubicación (" + err.message + "). Podés elegir la progresiva a mano.";
    },
    { enableHighAccuracy: true, maximumAge: 15000, timeout: 30000 }
  );
}

function usarProgManual(prog) {
  const [lat, lng] = puntoEnProg(prog);
  ubicacion = { lat, lng, prog, dist: 0, precision: null, manual: true };
  renderSector();
  moverMarcadorPosicion();
}

function moverMarcadorPosicion() {
  if (!map || !ubicacion) return;
  if (!posMarker) {
    posMarker = L.circleMarker([ubicacion.lat, ubicacion.lng], {
      radius: 9, color: "#fff", weight: 3, fillColor: "#1E6FD9", fillOpacity: 1,
    }).addTo(map).bindTooltip("Tu ubicación");
  } else {
    posMarker.setLatLng([ubicacion.lat, ubicacion.lng]);
  }
}

// ============================================================
// Panel de sector y recomendaciones
// ============================================================
function lista(items) {
  return "<ul>" + items.map((t) => "<li>" + escapeHtml(t) + "</li>").join("") + "</ul>";
}

function renderSector() {
  const box = document.getElementById("sector-box");
  const estado = document.getElementById("gps-estado");
  if (!ubicacion) {
    box.innerHTML = '<div class="empty">Esperando ubicación… Si estás fuera del tramo, elegí una progresiva abajo.</div>';
    return;
  }
  const lejos = ubicacion.dist > 500;
  estado.textContent =
    (ubicacion.manual ? "Ubicación elegida a mano" : "GPS ±" + Math.round(ubicacion.precision || 0) + " m") +
    " · a " + Math.round(ubicacion.dist) + " m del eje";

  const s = sectorDe(ubicacion.prog);
  const m = meandroDe(ubicacion.prog);
  const repro = window.esEpocaReproductiva(new Date());
  const pr = s ? s.prioridad : "Sin datos";
  let html = "";

  if (lejos) {
    html += '<div class="aviso aviso-gris">Estás a más de 500 m del eje de obra. La progresiva es la más cercana al punto donde estás.</div>';
  }
  html +=
    '<div class="sector-head" style="border-left-color:' + window.PRIORIDAD_COLOR[pr] + '">' +
    '<div class="sector-prog">Prog. ' + fmtProg(ubicacion.prog) + "</div>" +
    "<div class=\"sector-name\">" + (s ? "Sector " + s.id + " – " + escapeHtml(s.nombre) : "Tramo sin muestreo") + "</div>" +
    '<span class="prio" style="background:' + window.PRIORIDAD_COLOR[pr] + '">Prioridad ' + pr.toLowerCase() + "</span>" +
    "</div>";

  if (repro) {
    html += '<div class="aviso aviso-rojo"><b>Época reproductiva (septiembre–febrero).</b> Revisar nidos y crías antes de avanzar. Nido activo: no intervenir a menos de 30 m (50 m si es de rapaz o garza).</div>';
  }
  if (s) html += '<p class="valores">' + escapeHtml(s.valores) + "</p>";
  if (m) html += '<div class="aviso aviso-ambar"><b>Meandro ' + m.id + "</b> (Prog. " + fmtProg(m.desde) + "–" + fmtProg(m.hasta) + "): " + escapeHtml(m.rec) + "</div>";

  if (s) {
    html += '<h5 class="rec-evitar">Evitar</h5>' + lista(s.evitar);
    html += '<h5 class="rec-min">Minimizar</h5>' + lista(s.minimizar);
  } else {
    html += '<p class="valores">Este tramo no tuvo muestreo: aplican las recomendaciones generales. Registrar cualquier hallazgo.</p>';
  }
  html +=
    "<details" + (s ? "" : " open") + "><summary>Recomendaciones para todo el tramo</summary>" +
    '<h5 class="rec-evitar">Evitar</h5>' + lista(window.REC_GENERALES.evitar) +
    '<h5 class="rec-min">Minimizar</h5>' + lista(window.REC_GENERALES.minimizar) +
    '<h5 class="rec-evitar">Prohibido en la obra</h5>' + lista(window.REC_GENERALES.prohibido) +
    "</details>";

  box.innerHTML = html;
}

// ============================================================
// Datos: carga y sincronización de registros de obra
// ============================================================
async function cargarRegistrosObra() {
  const local = await idbAll("registros_obra");
  if (navigator.onLine) {
    try {
      const { data, error } = await sb.from("registros_obra").select("*").order("fecha", { ascending: false });
      if (error) throw error;
      const ids = new Set(data.map((r) => r.id));
      for (const r of data) await idbPut("registros_obra", r);
      registrosObra = data.concat(local.filter((r) => r._pending && !ids.has(r.id)));
      return;
    } catch (e) { /* sigue con lo local */ }
  }
  registrosObra = local;
}

async function subirFotoObra(rec) {
  if (!rec._foto_pending_dataurl) return rec;
  const blob = await (await fetch(rec._foto_pending_dataurl)).blob();
  const ext = (blob.type.split("/")[1] || "jpg").split("+")[0];
  const path = "obra/" + rec.id + "." + ext;
  const { error } = await sb.storage.from("fotos-puntos").upload(path, blob, { upsert: true });
  if (error) throw error;
  rec.foto_url = sb.storage.from("fotos-puntos").getPublicUrl(path).data.publicUrl;
  delete rec._foto_pending_dataurl;
  return rec;
}

async function subirRegistro(rec) {
  const conFoto = await subirFotoObra(rec);
  const payload = { ...conFoto };
  delete payload._pending;
  delete payload._foto_pending_dataurl;
  const { error } = await sb.from("registros_obra").upsert(payload);
  if (error) throw error;
  conFoto._pending = false;
  await idbPut("registros_obra", conFoto);
  return conFoto;
}

async function guardarRegistro(rec) {
  rec._pending = true;
  await idbPut("registros_obra", rec);
  registrosObra = registrosObra.filter((r) => r.id !== rec.id).concat(rec);
  if (navigator.onLine) {
    try {
      const subido = await subirRegistro(rec);
      registrosObra = registrosObra.filter((r) => r.id !== rec.id).concat(subido);
    } catch (e) { /* queda pendiente */ }
  }
  actualizarPendientesObra();
  renderMisRegistros();
  renderCapaObra();
}

async function sincronizarObra() {
  if (!navigator.onLine) return;
  const pend = (await idbAll("registros_obra")).filter((r) => r._pending);
  for (const r of pend) {
    try { await subirRegistro(r); } catch (e) { /* reintenta luego */ }
  }
  await cargarRegistrosObra();
  actualizarPendientesObra();
  renderMisRegistros();
  renderAlertas();
  renderCapaObra();
}

function actualizarPendientesObra() {
  const n = registrosObra.filter((r) => r._pending).length;
  const pill = document.getElementById("obra-pending-pill");
  pill.style.display = n ? "inline-block" : "none";
  pill.textContent = n + " registro(s) de obra sin sincronizar";
}

window.addEventListener("online", sincronizarObra);
setInterval(() => { if (navigator.onLine) sincronizarObra(); }, 45000);

// ============================================================
// Formularios (modal)
// ============================================================
function abrirModal(titulo, cuerpoHtml, onGuardar) {
  const modal = document.getElementById("modal");
  document.getElementById("modal-title").textContent = titulo;
  const ubic = ubicacion
    ? "Prog. " + fmtProg(ubicacion.prog) + (sectorDe(ubicacion.prog) ? " · Sector " + sectorDe(ubicacion.prog).id : "") +
      (ubicacion.manual ? " (elegida a mano)" : "")
    : "Sin ubicación: el registro se guarda sin coordenada.";
  document.getElementById("modal-body").innerHTML =
    '<div class="modal-ubic">' + ubic + "</div>" +
    '<form class="form" id="modal-form">' +
    '<label>Fecha *</label><input type="date" id="m-fecha" required value="' + hoy() + '">' +
    cuerpoHtml +
    '<label>Foto</label><input type="file" id="m-foto" accept="image/*" capture="environment">' +
    '<label>Observaciones</label><textarea id="m-nota"></textarea>' +
    '<button type="submit" class="save-btn">Guardar</button>' +
    '<button type="button" class="btn" id="m-cancel" style="width:100%;margin-top:6px;">Cancelar</button>' +
    "</form>";
  modal.style.display = "flex";
  document.getElementById("m-cancel").onclick = cerrarModal;
  document.getElementById("modal-form").onsubmit = async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector(".save-btn");
    btn.disabled = true;
    try {
      const extra = onGuardar();
      if (extra === false) { btn.disabled = false; return; }
      const fotoFile = document.getElementById("m-foto").files[0];
      if (extra.fotoObligatoria && !fotoFile) {
        alert("La foto es obligatoria para este registro.");
        btn.disabled = false;
        return;
      }
      const s = ubicacion ? sectorDe(ubicacion.prog) : null;
      const rec = {
        id: uuid(), tipo: extra.tipo, fecha: document.getElementById("m-fecha").value,
        autor_id: currentUser.id, autor_nombre: (currentProfile && currentProfile.nombre) || currentUser.email,
        lat: ubicacion ? ubicacion.lat : null, lng: ubicacion ? ubicacion.lng : null,
        progresiva: extra.progresiva != null ? extra.progresiva : ubicacion ? +ubicacion.prog.toFixed(3) : null,
        sector: s ? s.id : null, datos: extra.datos, nota: document.getElementById("m-nota").value.trim() || null,
        foto_url: null, critico: !!extra.critico, atendida: false,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      };
      if (fotoFile) {
        rec._foto_pending_dataurl = await new Promise((res) => {
          const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(fotoFile);
        });
      }
      await guardarRegistro(rec);
      cerrarModal();
      if (rec.critico) mostrarAvisoCritico(rec);
      else toast("Registro guardado" + (rec._pending ? " (se sincroniza al recuperar señal)" : ""));
    } catch (err) {
      alert("No se pudo guardar: " + (err.message || err));
      btn.disabled = false;
    }
  };
}
function cerrarModal() { document.getElementById("modal").style.display = "none"; }

function formAvance() {
  const p = ubicacion ? ubicacion.prog.toFixed(3) : "";
  const checks = window.CHECKLIST_DIARIA.map((c) =>
    '<div class="checkbox-row"><input type="checkbox" class="m-check" data-id="' + c.id + '" id="ck-' + c.id + '"><label for="ck-' + c.id + '" style="margin:0;">' + escapeHtml(c.texto) + "</label></div>"
  ).join("");
  abrirModal(
    "Parte diario de avance",
    '<div class="row2"><div><label>Progresiva inicio (km) *</label><input type="text" inputmode="decimal" id="m-pi" value="' + p + '"></div>' +
    '<div><label>Progresiva fin (km) *</label><input type="text" inputmode="decimal" id="m-pf" value="' + p + '"></div></div>' +
    '<label>Margen intervenida</label><select id="m-margen"><option>Ambas</option><option>Izquierda</option><option>Derecha</option></select>' +
    '<label>Lista de verificación del día</label>' + checks,
    () => {
      const pi = parseFloat(document.getElementById("m-pi").value.replace(",", "."));
      const pf = parseFloat(document.getElementById("m-pf").value.replace(",", "."));
      if (isNaN(pi) || isNaN(pf)) { alert("Completá las progresivas de inicio y fin."); return false; }
      const checklist = {};
      document.querySelectorAll(".m-check").forEach((c) => (checklist[c.dataset.id] = c.checked));
      return {
        tipo: "avance", progresiva: Math.max(pi, pf),
        datos: { prog_inicio: Math.min(pi, pf), prog_fin: Math.max(pi, pf), margen: document.getElementById("m-margen").value, checklist },
      };
    }
  );
}

function formArbol() {
  abrirModal(
    "Árbol removido",
    '<label>Especie *</label><input type="text" id="m-especie" placeholder="Ej.: timbó colorado" list="lista-especies">' +
    '<datalist id="lista-especies"><option>Timbó colorado</option><option>Timbó blanco</option><option>Ubajay</option><option>Marmelero</option><option>Laurel</option><option>Lapacho rosado</option><option>Tatané</option><option>Sauce criollo</option><option>Ceibo</option><option>Curupí</option><option>No identificada</option></datalist>' +
    '<label>DAP (cm) *</label><input type="text" inputmode="decimal" id="m-dap">' +
    '<label>Motivo</label><select id="m-motivo"><option>No se pudo rodear</option><option>Dentro del cauce</option><option>Caído / muerto</option><option>Otro</option></select>',
    () => {
      const especie = document.getElementById("m-especie").value.trim();
      const dap = parseFloat(document.getElementById("m-dap").value.replace(",", "."));
      if (!especie || isNaN(dap)) { alert("Completá especie y DAP."); return false; }
      if (dap >= 30 && !confirm("El árbol tiene DAP ≥ 30 cm: la recomendación es rodearlo. ¿Confirmás que fue removido?")) return false;
      return { tipo: "arbol", fotoObligatoria: true, datos: { especie, dap_cm: dap, motivo: document.getElementById("m-motivo").value } };
    }
  );
}

function formHallazgo() {
  const opts = window.HALLAZGO_TIPOS.map((t) => '<option value="' + t.id + '">' + escapeHtml(t.texto) + (t.critico ? " ⚠" : "") + "</option>").join("");
  abrirModal(
    "Hallazgo de fauna",
    '<label>Tipo de hallazgo *</label><select id="m-subtipo">' + opts + "</select>" +
    '<label>Especie (si se conoce)</label><input type="text" id="m-especie">' +
    '<label>Acción tomada</label><select id="m-accion"><option>Se detuvo la maquinaria</option><option>Se marcó zona de exclusión</option><option>Ahuyentamiento pasivo</option><option>Rescate y liberación</option><option>Se dio aviso, sin acción aún</option><option>Ninguna</option></select>' +
    '<div class="aviso aviso-gris" style="margin-top:8px;">⚠ = hallazgo crítico: se avisa de inmediato al equipo y a ICAA. Primates enfermos o muertos: NO tocarlos.</div>',
    () => {
      const sub = document.getElementById("m-subtipo").value;
      const t = window.HALLAZGO_TIPOS.find((x) => x.id === sub);
      return {
        tipo: "hallazgo", critico: t.critico,
        datos: { subtipo: sub, subtipo_texto: t.texto, especie: document.getElementById("m-especie").value.trim(), accion: document.getElementById("m-accion").value },
      };
    }
  );
}

function formMedida() {
  abrirModal(
    "Medida aplicada",
    '<label>Medida *</label><select id="m-medida"><option>Árbol rodeado (no removido)</option><option>Franja de operación reducida</option><option>Zona de exclusión señalizada</option><option>Trabajo postergado por nido o madriguera</option><option>Material depositado en sitio habilitado</option><option>Margen revegetada</option><option>Otra</option></select>' +
    '<label>Cantidad (opcional)</label><input type="text" inputmode="decimal" id="m-cant" placeholder="Ej.: 3 árboles, 150 m">',
    () => ({ tipo: "medida", datos: { medida: document.getElementById("m-medida").value, cantidad: document.getElementById("m-cant").value.trim() } })
  );
}

// ============================================================
// Alertas
// ============================================================
function textoAlerta(r) {
  return "ALERTA Riachuelo: " + ((r.datos && r.datos.subtipo_texto) || "hallazgo crítico") +
    (r.datos && r.datos.especie ? " (" + r.datos.especie + ")" : "") +
    " – Prog. " + fmtProg(r.progresiva) + (r.sector ? ", sector " + r.sector : "") +
    " – " + r.fecha + " – " + r.autor_nombre +
    (r.lat ? " – https://maps.google.com/?q=" + r.lat.toFixed(5) + "," + r.lng.toFixed(5) : "");
}

function mostrarAvisoCritico(r) {
  const enviada = !r._pending;
  document.getElementById("modal-title").textContent = "Hallazgo crítico registrado";
  document.getElementById("modal-body").innerHTML =
    '<div class="aviso aviso-rojo">' +
    (enviada ? "La alerta ya llegó al equipo y a ICAA." : "Sin señal: la alerta se envía sola al recuperar conexión.") +
    "</div><p style=\"font-size:13px\">Suspendé la intervención en ese punto y seguí el protocolo de ahuyentamiento y rescate.</p>" +
    '<a class="save-btn" style="display:block;text-align:center;text-decoration:none;" target="_blank" href="https://wa.me/?text=' +
    encodeURIComponent(textoAlerta(r)) + '">Avisar también por WhatsApp</a>' +
    '<button class="btn" style="width:100%;margin-top:6px;" onclick="cerrarModal()">Cerrar</button>';
  document.getElementById("modal").style.display = "flex";
}

function renderAlertas() {
  const pend = registrosObra.filter((r) => r.critico && !r.atendida);
  const badge = document.getElementById("alertas-badge");
  badge.textContent = pend.length;
  badge.style.display = pend.length ? "inline-block" : "none";
  const box = document.getElementById("alertas-list");
  if (!box) return;
  const todas = registrosObra.filter((r) => r.critico).sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
  if (!todas.length) { box.innerHTML = '<div class="empty">Sin alertas.</div>'; return; }
  box.innerHTML = todas.map((r) =>
    '<div class="point-row alerta-row' + (r.atendida ? " atendida" : "") + '">' +
    '<div class="point-top"><span class="point-tag" style="color:#A32D2D">' + escapeHtml((r.datos && r.datos.subtipo_texto) || "Hallazgo crítico") + "</span>" +
    (r.atendida ? '<span class="badge-find">Atendida</span>' : '<span class="badge-find" style="background:#FBEAEA;color:#A32D2D;">Pendiente</span>') + "</div>" +
    '<div class="point-meta">Prog. ' + fmtProg(r.progresiva) + (r.sector ? " · Sector " + r.sector : "") + " · " + r.fecha + " · " + escapeHtml(r.autor_nombre) + "</div>" +
    (r.datos && r.datos.especie ? '<div class="point-note">Especie: ' + escapeHtml(r.datos.especie) + "</div>" : "") +
    (r.datos && r.datos.accion ? '<div class="point-note">Acción: ' + escapeHtml(r.datos.accion) + "</div>" : "") +
    (r.nota ? '<div class="point-note">' + escapeHtml(r.nota) + "</div>" : "") +
    (r.foto_url ? '<img class="point-photo" src="' + r.foto_url + '">' : "") +
    (r.atendida ? '<div class="point-meta">Atendida por ' + escapeHtml(r.atendida_por || "") + "</div>"
      : '<div class="point-actions"><button class="link-btn" data-atender="' + r.id + '">Marcar como atendida</button>' +
        (r.lat ? '<button class="link-btn" data-ver="' + r.lat + "," + r.lng + '">Ver en el mapa</button>' : "") + "</div>") +
    "</div>"
  ).join("");
  box.querySelectorAll("[data-atender]").forEach((b) => (b.onclick = () => marcarAtendida(b.dataset.atender)));
  box.querySelectorAll("[data-ver]").forEach((b) => (b.onclick = () => {
    mostrarTab("mapa");
    const [la, ln] = b.dataset.ver.split(",").map(Number);
    setTimeout(() => { map.invalidateSize(); map.setView([la, ln], 17); }, 100);
  }));
}

async function marcarAtendida(id) {
  if (!navigator.onLine) { alert("Necesitás conexión para marcar la alerta."); return; }
  const quien = (currentProfile && currentProfile.nombre) || currentUser.email;
  const { error } = await sb.from("registros_obra")
    .update({ atendida: true, atendida_por: quien, atendida_at: new Date().toISOString() }).eq("id", id);
  if (error) { alert("No se pudo actualizar: " + error.message); return; }
  await cargarRegistrosObra();
  renderAlertas();
}

function suscribirAlertas() {
  if (!puede.verAlertas()) return;
  sb.channel("alertas-obra")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "registros_obra" }, async (payload) => {
      const r = payload.new;
      if (!registrosObra.find((x) => x.id === r.id)) registrosObra.push(r);
      renderAlertas();
      renderMisRegistros();
      renderCapaObra();
      if (r.critico && r.autor_id !== currentUser.id) {
        toast("⚠ " + textoAlerta(r), true);
        if ("Notification" in window && Notification.permission === "granted") {
          try { new Notification("Alerta Riachuelo", { body: textoAlerta(r) }); } catch (e) {}
        }
      }
    })
    .subscribe();
}

// ============================================================
// Lista de registros y capa en el mapa
// ============================================================
const TIPO_OBRA = { avance: "Avance", arbol: "Árbol removido", hallazgo: "Hallazgo", medida: "Medida aplicada" };
const COLOR_OBRA = { avance: "#1E6FD9", arbol: "#8C5A2B", hallazgo: "#C99A3E", medida: "#2E7D4F" };

function resumenRegistro(r) {
  const d = r.datos || {};
  if (r.tipo === "avance") return "Prog. " + fmtProg(d.prog_inicio) + " → " + fmtProg(d.prog_fin) + " · margen " + (d.margen || "").toLowerCase();
  if (r.tipo === "arbol") return (d.especie || "") + " · DAP " + d.dap_cm + " cm";
  if (r.tipo === "hallazgo") return (d.subtipo_texto || "") + (d.especie ? " · " + d.especie : "");
  if (r.tipo === "medida") return (d.medida || "") + (d.cantidad ? " · " + d.cantidad : "");
  return "";
}

function renderMisRegistros() {
  const box = document.getElementById("obra-registros");
  if (!box) return;
  const items = registrosObra.slice().sort((a, b) => (b.created_at || "").localeCompare(a.created_at || "")).slice(0, 15);
  if (!items.length) { box.innerHTML = '<div class="empty">Todavía no hay registros de obra.</div>'; return; }
  box.innerHTML = items.map((r) =>
    '<div class="point-row"><div class="point-top"><span class="point-tag" style="color:' + COLOR_OBRA[r.tipo] + '">' + TIPO_OBRA[r.tipo] + "</span>" +
    (r.critico ? '<span class="badge-find" style="background:#FBEAEA;color:#A32D2D;">crítico</span>' : "") +
    (r._pending ? '<span class="badge-find" style="background:#FBEAEA;color:#A32D2D;">sin sync</span>' : "") + "</div>" +
    '<div class="point-meta">' + r.fecha + " · " + escapeHtml(r.autor_nombre || "") + (r.sector ? " · Sector " + r.sector : "") + "</div>" +
    '<div class="point-note">' + escapeHtml(resumenRegistro(r)) + "</div></div>"
  ).join("");
}

function renderCapaObra() {
  if (!map) return;
  if (!obraLayer) obraLayer = L.layerGroup().addTo(map);
  obraLayer.clearLayers();
  registrosObra.forEach((r) => {
    if (r.tipo === "avance" && r.datos && r.datos.prog_inicio != null) {
      const pts = window.EJE.filter((p) => p[2] >= r.datos.prog_inicio && p[2] <= r.datos.prog_fin).map((p) => [p[0], p[1]]);
      const linea = [puntoEnProg(r.datos.prog_inicio)].concat(pts, [puntoEnProg(r.datos.prog_fin)]);
      L.polyline(linea, { color: "#1E6FD9", weight: 9, opacity: 0.45 }).bindPopup("Avance " + r.fecha + "<br>" + resumenRegistro(r)).addTo(obraLayer);
      return;
    }
    if (r.lat == null) return;
    L.circleMarker([r.lat, r.lng], {
      radius: r.critico ? 9 : 6, color: r.critico ? "#A32D2D" : "#fff", weight: r.critico ? 3 : 1.5,
      fillColor: COLOR_OBRA[r.tipo], fillOpacity: 0.95,
    }).bindPopup("<b>" + TIPO_OBRA[r.tipo] + "</b><br>" + r.fecha + " · " + escapeHtml(r.autor_nombre || "") + "<br>" +
      escapeHtml(resumenRegistro(r)) + (r.foto_url ? '<img class="point-photo" src="' + r.foto_url + '">' : "")).addTo(obraLayer);
  });
}

function dibujarSectoresEnMapa() {
  window.SECTORES.forEach((s) => {
    const pts = window.EJE.filter((p) => p[2] >= s.desde && p[2] <= s.hasta).map((p) => [p[0], p[1]]);
    if (pts.length < 2) return;
    L.polyline(pts, { color: window.PRIORIDAD_COLOR[s.prioridad], weight: 12, opacity: 0.35 })
      .bindTooltip("Sector " + s.id + " – " + s.nombre + " (prioridad " + s.prioridad.toLowerCase() + ")")
      .addTo(map);
  });
}

// ============================================================
// Resumen del período (borrador del informe quincenal)
// ============================================================
function renderResumen() {
  const box = document.getElementById("resumen-box");
  const d1 = document.getElementById("res-desde").value;
  const d2 = document.getElementById("res-hasta").value;
  const rs = registrosObra.filter((r) => r.fecha >= d1 && r.fecha <= d2);
  const av = rs.filter((r) => r.tipo === "avance");
  const ar = rs.filter((r) => r.tipo === "arbol");
  const ha = rs.filter((r) => r.tipo === "hallazgo");
  const me = rs.filter((r) => r.tipo === "medida");

  let progMin = null, progMax = null;
  av.forEach((r) => {
    const a = r.datos.prog_inicio, b = r.datos.prog_fin;
    progMin = progMin == null ? a : Math.min(progMin, a);
    progMax = progMax == null ? b : Math.max(progMax, b);
  });
  const sectoresTocados = window.SECTORES.filter((s) => av.some((r) => r.datos.prog_inicio <= s.hasta && r.datos.prog_fin >= s.desde));

  let checksOk = 0, checksTot = 0;
  av.forEach((r) => Object.values(r.datos.checklist || {}).forEach((v) => { checksTot++; if (v) checksOk++; }));

  const porEspecie = {};
  ar.forEach((r) => { const e = r.datos.especie || "Sin dato"; porEspecie[e] = (porEspecie[e] || 0) + 1; });
  const grandes = ar.filter((r) => r.datos.dap_cm >= 30).length;
  const porMedida = {};
  me.forEach((r) => { const m = r.datos.medida; porMedida[m] = (porMedida[m] || 0) + 1; });

  const fila = (k, v) => "<tr><td>" + k + "</td><td><b>" + v + "</b></td></tr>";
  box.innerHTML =
    '<table class="res-table">' +
    fila("Partes diarios cargados", av.length) +
    fila("Tramo intervenido", progMin == null ? "—" : "Prog. " + fmtProg(progMin) + " a " + fmtProg(progMax) + " (" + (progMax - progMin).toFixed(2).replace(".", ",") + " km)") +
    fila("Sectores de la línea de base alcanzados", sectoresTocados.length ? sectoresTocados.map((s) => s.id + " (" + s.prioridad.toLowerCase() + ")").join(", ") : "Ninguno") +
    fila("Cumplimiento de la lista diaria", checksTot ? Math.round((100 * checksOk) / checksTot) + " %" : "—") +
    fila("Árboles removidos", ar.length + (grandes ? " (" + grandes + " con DAP ≥ 30 cm)" : "")) +
    fila("Hallazgos de fauna", ha.length + " (" + ha.filter((r) => r.critico).length + " críticos)") +
    fila("Medidas aplicadas", me.length) +
    "</table>" +
    (ar.length ? "<h5>Árboles removidos por especie</h5>" + lista(Object.entries(porEspecie).map(([k, v]) => k + ": " + v)) : "") +
    (me.length ? "<h5>Medidas aplicadas</h5>" + lista(Object.entries(porMedida).map(([k, v]) => k + ": " + v)) : "") +
    (ha.length ? "<h5>Hallazgos</h5>" + lista(ha.map((r) => r.fecha + " · Prog. " + fmtProg(r.progresiva) + " · " + resumenRegistro(r) + (r.critico ? (r.atendida ? " (atendida)" : " (PENDIENTE)") : ""))) : "");
}

function exportarCSV() {
  const d1 = document.getElementById("res-desde").value;
  const d2 = document.getElementById("res-hasta").value;
  const rs = registrosObra.filter((r) => r.fecha >= d1 && r.fecha <= d2).sort((a, b) => a.fecha.localeCompare(b.fecha));
  const cols = ["fecha", "tipo", "progresiva", "sector", "lat", "lng", "detalle", "critico", "atendida", "autor", "nota", "foto_url"];
  const esc = (v) => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
  const filas = rs.map((r) => [r.fecha, TIPO_OBRA[r.tipo], r.progresiva, r.sector, r.lat, r.lng, resumenRegistro(r),
    r.critico ? "sí" : "no", r.atendida ? "sí" : "no", r.autor_nombre, r.nota, r.foto_url].map(esc).join(","));
  const csv = "\ufeff" + cols.join(",") + "\n" + filas.join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  a.download = "registros_obra_" + d1 + "_a_" + d2 + ".csv";
  a.click();
}

// ============================================================
// UI general: pestañas, toast, permisos
// ============================================================
function mostrarTab(id) {
  document.querySelectorAll(".tab-panel").forEach((p) => (p.style.display = p.id === "tab-" + id ? "block" : "none"));
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === id));
  if (id === "mapa" && map) setTimeout(() => map.invalidateSize(), 50);
  if (id === "resumen") renderResumen();
  if (id === "alertas") renderAlertas();
}

function toast(msg, urgente) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = "toast" + (urgente ? " urgente" : "");
  t.style.display = "block";
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (t.style.display = "none"), urgente ? 12000 : 3500);
}

function aplicarPermisos() {
  const rol = ROL();
  document.getElementById("rol-pill").textContent =
    { equipo: "Equipo línea de base", obra: "Equipo de obra", icaa: "ICAA", propietario: "Propietario" }[rol] || rol;
  document.querySelector('[data-tab="alertas"]').style.display = puede.verAlertas() ? "" : "none";
  document.querySelector('[data-tab="resumen"]').style.display = puede.verResumen() ? "" : "none";
  ["btn-avance", "btn-arbol", "btn-medida"].forEach((id) => (document.getElementById(id).style.display = puede.cargarObra() ? "" : "none"));
  document.getElementById("mapa-solo-lectura").style.display = puede.verMapaEdicion() ? "none" : "block";
  if (puede.verAlertas() && "Notification" in window && Notification.permission === "default") {
    document.getElementById("btn-notif").style.display = "inline-block";
  }
}

async function initObra() {
  document.querySelectorAll(".tab-btn").forEach((b) => (b.onclick = () => mostrarTab(b.dataset.tab)));
  document.getElementById("btn-avance").onclick = formAvance;
  document.getElementById("btn-arbol").onclick = formArbol;
  document.getElementById("btn-hallazgo").onclick = formHallazgo;
  document.getElementById("btn-medida").onclick = formMedida;
  document.getElementById("btn-gps").onclick = () => { if (ubicacion) ubicacion.manual = false; iniciarGPS(); };
  document.getElementById("btn-notif").onclick = async () => {
    await Notification.requestPermission();
    document.getElementById("btn-notif").style.display = "none";
  };

  const selProg = document.getElementById("sel-prog");
  selProg.innerHTML = '<option value="">Elegir sector o progresiva…</option>' +
    window.SECTORES.map((s) => '<option value="' + ((s.desde + s.hasta) / 2).toFixed(2) + '">Sector ' + s.id + " – " + escapeHtml(s.nombre) + "</option>").join("");
  selProg.onchange = () => { if (selProg.value) usarProgManual(parseFloat(selProg.value)); };
  document.getElementById("btn-prog-manual").onclick = () => {
    const v = parseFloat(document.getElementById("inp-prog").value.replace(",", "."));
    const E = window.EJE;
    if (isNaN(v) || v < E[0][2] || v > E[E.length - 1][2]) {
      alert("Ingresá una progresiva entre " + fmtProg(E[0][2]) + " y " + fmtProg(E[E.length - 1][2]) + ".");
      return;
    }
    usarProgManual(v);
  };

  const d = new Date();
  document.getElementById("res-hasta").value = hoy();
  d.setDate(d.getDate() - 14);
  document.getElementById("res-desde").value = d.toISOString().slice(0, 10);
  document.getElementById("res-desde").onchange = renderResumen;
  document.getElementById("res-hasta").onchange = renderResumen;
  document.getElementById("btn-csv").onclick = exportarCSV;

  if (window.EJE_PROVISORIO) document.getElementById("eje-provisorio").style.display = "block";

  aplicarPermisos();
  dibujarSectoresEnMapa();
  renderSector();
  iniciarGPS();
  await cargarRegistrosObra();
  actualizarPendientesObra();
  renderMisRegistros();
  renderAlertas();
  renderCapaObra();
  suscribirAlertas();
  sincronizarObra();
  mostrarTab("obra");
}
