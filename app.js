import { appConfig } from "./config.js";

const KEY = "nutrim-vet-v16";
["nutrivetm-data-v1", "nutrim-vet-data-v2"].forEach((key) => localStorage.removeItem(key));
const db = JSON.parse(localStorage.getItem(KEY) || '{"patients":[],"plans":[],"docs":[],"alerts":[]}');
db.patients = db.patients.filter((p) => !["mora", "luna", "tango"].includes((p.name || "").toLowerCase()));
const state = { auth: false, role: "vet", view: "home", patientId: db.patients[0]?.id || "", sheet: "" };
const types = ["Transicion a natural", "Dieta mixta", "BARF", "Cocida", "Mantenimiento", "Descenso de peso", "Aumento de peso", "Digestiva", "Renal", "Hepatica", "Dermatologica", "Otro"];
const foods = ["Cerdo", "Solomillo", "Carre", "Bondiola", "Zanahoria", "Calabaza", "Batata", "Manzana", "Aceite de oliva", "Sopa moro", "Gastrointestinal", "Ricota", "Huevo", "Yogurt natural"];

function save() { localStorage.setItem(KEY, JSON.stringify(db)); }
function $(q) { return document.querySelector(q); }
function patient() { if (!db.patients.length) return null; if (!state.patientId) state.patientId = db.patients[0].id; return db.patients.find((p) => p.id === state.patientId) || db.patients[0]; }
function plan() { return db.plans.find((p) => p.patientId === state.patientId) || null; }
function esc(x = "") { return String(x).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"); }
function id() { return crypto.randomUUID(); }

function render() {
  $("#app").innerHTML = !state.auth ? login() : state.view === "home" ? home() : shell();
  bind();
}

function login() {
  return `<main class="login-shell"><section class="login-visual"><img src="assets/nutrivetm-hero.png" alt="Consultorio veterinario" /><div class="login-copy"><span class="brand-mark">NM</span><span class="eyebrow">${appConfig.appName}</span><h1>Acceso al seguimiento nutricional veterinario.</h1><p>Ingreso preparado para conectar con autenticacion real.</p></div></section><section class="login-panel"><span class="eyebrow">Ingresar</span><h2>Acceso</h2><form class="login-form" data-login><label>Perfil<span class="select-wrap"><select name="role"><option value="vet">Veterinaria</option><option value="tutor">Tutor</option></select></span></label><label>Usuario<input /></label><label>Contrasena<input type="password" /></label><button class="primary-button submit">Entrar</button></form></section></main>`;
}

function home() {
  const vet = [["dashboard", "Panel"], ["patients", "Pacientes"], ["plans", "Planes"], ["calendar", "Turnos"], ["alerts", "Alertas"]];
  const tutor = [["tutor-docs", "Documentacion"], ["tutor-calendar", "Turnos"], ["tutor-urgent", "Urgencia"], ["tutor-pet", "Mi mascota"], ["tutor-plan", "Plan"]];
  return `<main class="home-shell ${state.role === "tutor" ? "tutor-mode" : ""}"><section class="profile-top"><button class="brand compact-brand"><span class="brand-mark">NM</span><span><strong>${appConfig.appName}</strong><small>${state.role === "vet" ? "Perfil veterinaria" : "Perfil tutor"}</small></span></button><div class="profile-summary"><span class="eyebrow">${state.role === "vet" ? "Gestion nutricional veterinaria" : "Portal del tutor"}</span><h1>${state.role === "vet" ? "Panel profesional" : "Inicio"}</h1><p>${state.role === "vet" ? "Sin pacientes ni planes de ejemplo. Todo se crea desde datos cargados." : "Carga documentacion para habilitar el turno comun."}</p></div><div class="account-actions">${state.role === "vet" && patient() ? selectPatient() : ""}<button class="soft-button" data-logout>Cerrar sesion</button></div></section><section class="module-grid">${(state.role === "vet" ? vet : tutor).map(([v, t]) => card(v, t)).join("")}</section></main>`;
}

function shell() {
  return `<main class="flow-shell"><div class="flow-backdrop" aria-hidden="true">${home()}</div><section class="flow-sheet"><header class="flow-header"><button class="ghost-button" data-home>Volver</button><div><span class="eyebrow">${appConfig.appName}</span><h1>${title()}</h1></div><div class="flow-actions">${state.role === "vet" && patient() ? selectPatient() : ""}<button class="soft-button" data-logout>Cerrar sesion</button></div></header><div class="flow-content">${view()}</div></section></main>`;
}

function view() {
  if (state.role === "tutor") return tutorView();
  if (state.view === "patients") return patients();
  if (state.view === "plans") return plans();
  if (state.view === "alerts") return panel("Alertas clinicas", db.alerts.length ? db.alerts.map((a) => `<article class="alert-card"><span class="badge danger">${a.severity}</span><h3>${a.title}</h3><p>${a.text}</p></article>`).join("") : empty("Sin alertas", "Las alertas apareceran aca."));
  if (state.view === "calendar") return panel("Turnos", empty("Agenda limpia", "Los turnos reales apareceran aca."));
  return `<div class="dashboard-grid"><section class="hero-panel dashboard-hero"><img src="assets/nutrivetm-hero.png" alt="Perro y gato" /><div class="hero-copy"><span class="eyebrow">${appConfig.appName}</span><h2>Nutricion veterinaria, agenda y seguimiento en un solo panel.</h2><p>Gestiona pacientes, planes alimentarios, turnos y alertas clinicas desde una plataforma simple y profesional.</p></div></section><section class="metrics">${metric("Pacientes en seguimiento", db.patients.length, "patients")}${metric("Turnos proximos", 0, "calendar")}${metric("Alertas clinicas", db.alerts.length, "alerts", "danger")}${metric("Planes activos", db.plans.filter((p) => p.status === "activo").length, "plans")}</section></div>`;
}

function patients() {
  const p = patient();
  if (state.sheet === "newPatient") return patientForm();
  if (!p) return noPatient("Todavia no hay pacientes cargados.");
  return `<div class="patient-layout patient-select-layout"><section class="panel patient-picker-panel"><div class="section-heading"><div><span class="eyebrow">Legajo</span><h2>Seleccionar paciente</h2></div></div>${selectPatient()}<button class="primary-button" data-new-patient>+ Nuevo paciente</button><p class="muted">El selector muestra solo pacientes cargados.</p></section><section class="panel patient-detail"><div class="patient-header"><span class="avatar large">${p.name[0]}</span><div><span class="badge">${p.status || "Pendiente plan"}</span><h2>${p.name}</h2><p>${p.species} · ${p.breed || "Sin raza"}</p></div></div><div class="detail-grid">${detail("Tutor", p.tutor)}${detail("Peso actual", p.weight ? `${p.weight} kg` : "")}${detail("Peso objetivo", p.targetWeight ? `${p.targetWeight} kg` : "")}${detail("Alergias", p.allergies)}${detail("Medicacion", p.medication)}</div><div class="access-control-card"><div><span class="eyebrow">Vista del tutor</span><h3>${p.tutorAccess ? "Acceso habilitado" : "Acceso pendiente"}</h3></div><button class="primary-button" data-access>${p.tutorAccess ? "Deshabilitar" : "Habilitar acceso tutor"}</button></div></section></div>`;
}

function patientForm() {
  return `<form class="panel wide patient-form" data-patient-form><div class="section-heading"><div><span class="eyebrow">Alta de paciente</span><h2>Nuevo paciente veterinario</h2></div><button class="ghost-button" type="button" data-cancel>Volver</button></div><div class="form-grid"><section class="form-section"><h3>Paciente</h3><label>Nombre<input name="name" required /></label><label>Especie<select name="species" required><option value="">Seleccionar</option><option>Perro</option><option>Gato</option><option>Otro</option></select></label><label>Raza<input name="breed" /></label><label>Peso actual<input name="weight" type="number" step="0.1" /></label><label>Peso objetivo<input name="targetWeight" type="number" step="0.1" /></label><label>Alergias<textarea name="allergies" rows="3"></textarea></label><label>Medicacion<textarea name="medication" rows="3"></textarea></label></section><section class="form-section"><h3>Tutor</h3><label>Nombre y apellido<input name="tutor" required /></label><label>DNI<input name="dni" /></label><label>Email<input name="email" type="email" /></label><label><input name="tutorAccess" type="checkbox" /> Habilitar acceso del tutor</label></section></div><div class="form-actions"><button class="ghost-button" type="button" data-cancel>Cancelar</button><button class="primary-button">Guardar paciente</button></div></form>`;
}

function plans() {
  const p = patient();
  if (!p) return noPatient("Primero carga un paciente. El plan siempre se crea sobre el paciente seleccionado.");
  const pl = plan();
  return `<div class="plan-workbench"><section class="panel wide plan-console ${state.sheet ? "sheet-dimmed" : ""}"><div class="section-heading"><div><span class="eyebrow">Plan alimentario</span><h2>${p.name}</h2></div><div class="section-actions">${selectPatient()}<button class="primary-button" data-plan-new>+ Nuevo plan</button></div></div>${pl ? planMenu(pl) : `<div class="empty-state"><h3>Sin plan cargado para ${p.name}</h3><p>No se carga informacion de ejemplo. El plan se arma desde cero para este paciente.</p><button class="primary-button" data-plan-new>Crear plan</button></div>`}</section>${state.sheet && state.sheet !== "newPatient" ? sheet(pl) : ""}</div>`;
}

function planMenu(pl) {
  const items = [["general", "Datos generales", pl.objective], ["ration", "Racion diaria", pl.ration], ["ingredients", "Ingredientes", (pl.ingredients || []).join(", ")], ["prep", "Preparacion", pl.prep], ["message", "Mensaje tutor", pl.message]];
  return `<div class="plan-console-header"><div><span class="badge">${pl.status}</span><h3>${pl.title}</h3><p>${pl.type || "Tipo pendiente"} · ${pl.duration || "Duracion pendiente"}</p></div></div><div class="plan-section-menu">${items.map(([k, t, v]) => `<button class="plan-section-button" data-section="${k}"><span><strong>${t}</strong><small>${v || "Pendiente"}</small></span><em class="${v ? "ready" : ""}">${v ? "Cargado" : "Pendiente"}</em></button>`).join("")}</div>`;
}

function sheet(pl) {
  const name = { newPlan: "Crear plan", general: "Datos generales", ration: "Racion diaria", ingredients: "Ingredientes", prep: "Preparacion", message: "Mensaje tutor" }[state.sheet];
  return `<div class="ios-sheet-backdrop" data-close><section class="ios-sheet"><div class="sheet-grabber"></div><header class="sheet-header"><div><span class="eyebrow">${patient().name}</span><h2>${name}</h2></div><button class="ghost-button compact" data-close>Cerrar</button></header><div class="sheet-scroll">${state.sheet === "newPlan" ? newPlanForm() : sectionForm(pl)}</div></section></div>`;
}

function newPlanForm() {
  return `<form class="sheet-form" data-save-plan><div class="fixed-patient-box"><span>Paciente seleccionado</span><strong>${patient().name}</strong><small>${patient().species} · ${patient().tutor}</small></div><label>Nombre del plan<input name="title" required /></label><label>Tipo<select name="type"><option value="">Seleccionar</option>${types.map((x) => `<option>${x}</option>`).join("")}</select></label><label>Objetivo<textarea name="objective" rows="3"></textarea></label><label>Duracion estimada<input name="duration" /></label><label>Estado<select name="status"><option>borrador</option><option>activo</option></select></label><div class="form-actions"><button class="primary-button">Crear plan</button></div></form>`;
}

function sectionForm(pl) {
  const html = {
    general: `<label>Nombre<input name="title" value="${esc(pl.title)}" required /></label><label>Tipo<select name="type"><option value="">Seleccionar</option>${types.map((x) => `<option ${pl.type === x ? "selected" : ""}>${x}</option>`).join("")}</select></label><label>Objetivo<textarea name="objective" rows="4">${esc(pl.objective)}</textarea></label><label>Duracion<input name="duration" value="${esc(pl.duration)}" /></label><label>Estado<select name="status">${["borrador", "activo", "finalizado", "suspendido"].map((x) => `<option ${pl.status === x ? "selected" : ""}>${x}</option>`).join("")}</select></label>`,
    ration: `<label>Racion diaria<textarea name="ration" rows="8">${esc(pl.ration)}</textarea></label>`,
    ingredients: `<label>Agregar desde biblioteca<select name="add"><option value="">Seleccionar ingrediente</option>${foods.map((x) => `<option>${x}</option>`).join("")}</select></label><label>Ingredientes cargados<textarea name="items" rows="8">${esc((pl.ingredients || []).join("\n"))}</textarea></label>`,
    prep: `<label>Preparacion<textarea name="prep" rows="10">${esc(pl.prep)}</textarea></label>`,
    message: `<label>Mensaje visible para el tutor<textarea name="message" rows="10">${esc(pl.message)}</textarea></label>`,
  }[state.sheet];
  return `<form class="sheet-form" data-save-section>${html}<div class="form-actions"><button class="primary-button">Guardar</button></div></form>`;
}

function tutorView() {
  if (state.view === "tutor-docs") return `<div class="content-grid"><section class="panel wide document-upload-panel"><div class="section-heading"><div><span class="eyebrow">Paso previo al turno</span><h2>Documentacion para primera consulta</h2></div></div><form class="upload-dropzone" data-docs><h3>Subir archivos</h3><input name="files" type="file" multiple required /><button class="primary-button">Guardar documentacion</button></form></section><section class="panel">${db.docs.map((d) => `<p class="file-line">${d.name}</p>`).join("") || empty("Sin documentacion", "Carga al menos un archivo.")}</section></div>`;
  if (state.view === "tutor-urgent") return `<section class="panel wide urgent-form-panel"><form class="urgent-form" data-urgent><label>Motivo<textarea name="reason" rows="5" required></textarea></label><label>Nivel<select name="severity"><option>Alta</option><option>Media</option><option>Baja</option></select></label><button class="primary-button">Enviar alerta</button></form></section>`;
  if (state.view === "tutor-calendar") return db.docs.length ? panel("Turnos", empty("Turno comun habilitado", "La solicitud se conecta con la agenda interna.")) : locked();
  if (state.view === "tutor-pet" || state.view === "tutor-plan") return tutorPatient() ? panel("Acceso tutor", empty("Acceso habilitado", "La informacion publicada por la veterinaria aparecera aca.")) : locked();
  return panel("FAQ", empty("Sin preguntas cargadas", "Las preguntas frecuentes apareceran aca."));
}

function bind() {
  $("[data-login]")?.addEventListener("submit", (e) => { e.preventDefault(); state.role = new FormData(e.currentTarget).get("role"); state.auth = true; render(); });
  document.querySelectorAll("[data-view]").forEach((b) => b.addEventListener("click", () => { state.view = b.dataset.view; state.sheet = ""; render(); }));
  $("[data-home]")?.addEventListener("click", () => { state.view = "home"; state.sheet = ""; render(); });
  document.querySelectorAll("[data-logout]").forEach((b) => b.addEventListener("click", () => { state.auth = false; state.view = "home"; render(); }));
  document.querySelectorAll("[data-active-patient]").forEach((s) => s.addEventListener("change", () => { state.patientId = s.value; state.sheet = ""; save(); render(); }));
  $("[data-new-patient]")?.addEventListener("click", () => { state.sheet = "newPatient"; render(); });
  document.querySelectorAll("[data-cancel]").forEach((b) => b.addEventListener("click", () => { state.sheet = ""; render(); }));
  $("[data-patient-form]")?.addEventListener("submit", savePatient);
  $("[data-plan-new]")?.addEventListener("click", () => { state.sheet = "newPlan"; render(); });
  document.querySelectorAll("[data-section]").forEach((b) => b.addEventListener("click", () => { state.sheet = b.dataset.section; render(); }));
  document.querySelectorAll("[data-close]").forEach((x) => x.addEventListener("click", (e) => { if (e.target === x || x.matches("button")) { state.sheet = ""; render(); } }));
  $("[data-save-plan]")?.addEventListener("submit", savePlan);
  $("[data-save-section]")?.addEventListener("submit", saveSection);
  $("[data-access]")?.addEventListener("click", () => { patient().tutorAccess = !patient().tutorAccess; save(); render(); });
  $("[data-docs]")?.addEventListener("submit", saveDocs);
  $("[data-urgent]")?.addEventListener("submit", saveUrgent);
}

function savePatient(e) { e.preventDefault(); const d = new FormData(e.currentTarget); if (!text(d, "name") || !text(d, "species") || !text(d, "tutor") || (!text(d, "dni") && !text(d, "email"))) return alert("Completa animal, especie, tutor y DNI o email."); const p = { id: id(), name: text(d, "name"), species: text(d, "species"), breed: text(d, "breed"), weight: text(d, "weight"), targetWeight: text(d, "targetWeight"), allergies: text(d, "allergies"), medication: text(d, "medication"), tutor: text(d, "tutor"), dni: text(d, "dni"), email: text(d, "email"), tutorAccess: d.get("tutorAccess") === "on", status: "Pendiente plan" }; db.patients.unshift(p); state.patientId = p.id; state.sheet = ""; save(); render(); }
function savePlan(e) { e.preventDefault(); const d = new FormData(e.currentTarget); db.plans.unshift({ id: id(), patientId: patient().id, title: text(d, "title"), type: text(d, "type"), objective: text(d, "objective"), duration: text(d, "duration"), status: text(d, "status"), ingredients: [] }); state.sheet = ""; save(); render(); }
function saveSection(e) { e.preventDefault(); const d = new FormData(e.currentTarget), p = plan(); if (state.sheet === "general") Object.assign(p, { title: text(d, "title"), type: text(d, "type"), objective: text(d, "objective"), duration: text(d, "duration"), status: text(d, "status") }); if (state.sheet === "ration") p.ration = text(d, "ration"); if (state.sheet === "ingredients") p.ingredients = [...new Set([text(d, "add"), ...text(d, "items").split("\n").map((x) => x.trim())].filter(Boolean))]; if (state.sheet === "prep") p.prep = text(d, "prep"); if (state.sheet === "message") p.message = text(d, "message"); state.sheet = ""; save(); render(); }
function saveDocs(e) { e.preventDefault(); db.docs.push(...Array.from(e.currentTarget.files.files || []).map((f) => ({ name: f.name }))); save(); state.view = "tutor-calendar"; render(); }
function saveUrgent(e) { e.preventDefault(); const d = new FormData(e.currentTarget); db.alerts.unshift({ title: "Urgencia", severity: text(d, "severity"), text: text(d, "reason") }); save(); alert("La alerta fue enviada."); render(); }

function selectPatient() { return `<label class="active-patient-control"><span>Paciente activo</span><span class="select-wrap compact-select"><select data-active-patient>${db.patients.map((p) => `<option value="${p.id}" ${p.id === state.patientId ? "selected" : ""}>${p.name} · ${p.tutor}</option>`).join("")}</select></span></label>`; }
function tutorPatient() { return db.patients.find((p) => p.tutorAccess); }
function title() { return ({ dashboard: "Panel", patients: "Pacientes", plans: "Planes alimentarios", calendar: "Turnos", alerts: "Alertas", "tutor-docs": "Documentacion", "tutor-calendar": "Turnos", "tutor-urgent": "Urgencia", "tutor-pet": "Mi mascota", "tutor-plan": "Plan" }[state.view] || appConfig.appName); }
function card(v, t) { return `<button class="module-card" data-view="${v}"><span><strong>${t}</strong><small>Abrir</small></span></button>`; }
function metric(t, v, go, tone = "") { return `<button class="metric metric-link ${tone}" data-view="${go}"><strong>${v}</strong><span>${t}</span></button>`; }
function noPatient(t) { return `<section class="panel wide empty-module-panel"><div class="section-heading"><div><span class="eyebrow">Pacientes</span><h2>Sin pacientes cargados</h2></div><button class="primary-button" data-new-patient>Crear paciente</button></div><p class="muted">${t}</p></section>`; }
function panel(h, body) { return `<section class="panel wide"><div class="section-heading"><div><span class="eyebrow">${appConfig.appName}</span><h2>${h}</h2></div></div>${body}</section>`; }
function locked() { return panel("No habilitado", empty("Acceso pendiente", "Primero debe completarse la documentacion o habilitarse desde el perfil veterinario.")); }
function detail(k, v) { return `<div class="detail"><span>${k}</span><strong>${v || "Pendiente"}</strong></div>`; }
function empty(h, p) { return `<div class="empty-state"><h3>${h}</h3><p>${p}</p></div>`; }
function text(d, k) { return d.get(k)?.toString().trim() || ""; }
function id() { return crypto.randomUUID(); }

if ("serviceWorker" in navigator) navigator.serviceWorker.getRegistrations?.().then((r) => r.forEach((x) => x.unregister()));
if ("caches" in window) caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
save();
render();
