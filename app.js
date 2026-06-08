import { appConfig } from "./config.js";

const KEY = "nutrim-vet-v18";
const EMPTY_DB = { patients: [], plans: [], stages: [], docs: [], alerts: [], foods: [], supplements: [] };
["nutrivetm-data-v1", "nutrim-vet-data-v2", "nutrim-vet-v16", "nutrim-vet-v17"].forEach((key) => localStorage.removeItem(key));
let db = { ...EMPTY_DB };
try {
  db = { ...EMPTY_DB, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
} catch {
  db = { ...EMPTY_DB };
}
db.patients = Array.isArray(db.patients) ? db.patients.filter((p) => !["mora", "luna", "tango"].includes((p.name || "").toLowerCase())) : [];
db.plans = Array.isArray(db.plans) ? db.plans : [];
db.stages = Array.isArray(db.stages) ? db.stages : [];
db.docs = Array.isArray(db.docs) ? db.docs : [];
db.alerts = Array.isArray(db.alerts) ? db.alerts : [];
db.foods = [...new Set([...(db.foods || []), ...["Cerdo", "Solomillo", "Carre", "Bondiola", "Zanahoria", "Calabaza", "Batata", "Manzana", "Aceite de oliva", "Sopa moro", "Gastrointestinal", "Ricota", "Huevo", "Yogurt natural"]])];
db.supplements = [...new Set([...(db.supplements || []), ...["Omega 3", "Calcio", "Glutamina", "Huevo", "Yogurt natural"]])];
const state = { auth: false, role: "vet", view: "home", patientId: db.patients[0]?.id || "", sheet: "" };
const types = ["Transicion a natural", "Dieta mixta", "BARF", "Cocida", "Mantenimiento", "Descenso de peso", "Aumento de peso", "Digestiva", "Renal", "Hepatica", "Dermatologica", "Otro"];

function save() { localStorage.setItem(KEY, JSON.stringify(db)); }
function $(q) { return document.querySelector(q); }
function patient() { if (!db.patients.length) return null; if (!state.patientId) state.patientId = db.patients[0].id; return db.patients.find((p) => p.id === state.patientId) || db.patients[0]; }
function plan() { return db.plans.find((p) => p.patientId === state.patientId) || null; }
function stages() { return db.stages.filter((s) => s.planId === plan()?.id); }
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
  const items = [["general", "Datos generales", pl.objective], ["stages", "Etapas", stages().length ? `${stages().length} etapa(s)` : ""], ["ingredients", "Ingredientes", (pl.ingredients || []).join(", ")], ["prep", "Preparacion", pl.prep], ["supplements", "Suplementos", (pl.supplements || []).join(", ")], ["message", "Mensaje tutor", pl.message]];
  return `<div class="plan-console-header"><div><span class="badge">${pl.status}</span><h3>${pl.title}</h3><p>${pl.type || "Tipo pendiente"} · ${pl.duration || "Duracion pendiente"}</p></div></div><div class="plan-section-menu">${items.map(([k, t, v]) => `<button class="plan-section-button" data-section="${k}"><span><strong>${t}</strong><small>${v || "Pendiente"}</small></span><em class="${v ? "ready" : ""}">${v ? "Cargado" : "Pendiente"}</em></button>`).join("")}</div>`;
}

function sheet(pl) {
  const name = { newPlan: "Crear plan", general: "Datos generales", stages: "Etapas", newStage: "Nueva etapa", ingredients: "Ingredientes", prep: "Preparacion", supplements: "Suplementos", message: "Mensaje tutor" }[state.sheet];
  return `<div class="ios-sheet-backdrop" data-close><section class="ios-sheet"><div class="sheet-grabber"></div><header class="sheet-header"><div><span class="eyebrow">${patient().name}</span><h2>${name}</h2></div><button class="ghost-button compact" data-close>Cerrar</button></header><div class="sheet-scroll">${state.sheet === "newPlan" ? newPlanForm() : sectionForm(pl)}</div></section></div>`;
}

function newPlanForm() {
  return `<form class="sheet-form" data-save-plan><div class="fixed-patient-box"><span>Paciente seleccionado</span><strong>${patient().name}</strong><small>${patient().species} · ${patient().tutor}</small></div><label>Nombre del plan<input name="title" required /></label><label>Tipo<select name="type" data-other-toggle="typeOther"><option value="">Seleccionar</option>${types.map((x) => `<option>${x}</option>`).join("")}</select></label><label class="is-hidden" data-other-field="typeOther">Tipo personalizado<input name="typeOther" /></label><label>Objetivo<textarea name="objective" rows="3"></textarea></label><label>Fecha de inicio<input name="startDate" type="date" /></label><label>Duracion estimada<input name="duration" /></label><label>Estado<select name="status"><option>borrador</option><option>activo</option></select></label><label>Proximo control<input name="nextControl" type="date" /></label><div class="form-actions"><button class="primary-button">Crear plan</button></div></form>`;
}

function sectionForm(pl) {
  if (state.sheet === "stages") return `<div class="sheet-list"><button class="primary-button" data-new-stage>Agregar etapa</button>${stages().map((s) => `<article class="sheet-list-item"><span><strong>${s.name}</strong><small>Dias ${s.dayFrom || "-"} a ${s.dayTo || "-"} · ${s.status || "pendiente"}</small></span></article>`).join("") || "<p class='muted'>Todavia no hay etapas cargadas.</p>"}</div>`;
  if (state.sheet === "newStage") return stageForm();
  const html = {
    general: `<label>Nombre<input name="title" value="${esc(pl.title)}" required /></label><label>Tipo<select name="type" data-other-toggle="typeOther"><option value="">Seleccionar</option>${types.map((x) => `<option ${pl.type === x ? "selected" : ""}>${x}</option>`).join("")}</select></label><label class="${pl.type === "Otro" ? "" : "is-hidden"}" data-other-field="typeOther">Tipo personalizado<input name="typeOther" value="${esc(pl.typeOther)}" /></label><label>Objetivo<textarea name="objective" rows="4">${esc(pl.objective)}</textarea></label><label>Fecha de inicio<input name="startDate" type="date" value="${esc(pl.startDate)}" /></label><label>Duracion estimada<input name="duration" value="${esc(pl.duration)}" /></label><label>Estado<select name="status">${["borrador", "activo", "finalizado", "suspendido"].map((x) => `<option ${pl.status === x ? "selected" : ""}>${x}</option>`).join("")}</select></label><label>Proximo control<input name="nextControl" type="date" value="${esc(pl.nextControl)}" /></label>`,
    ingredients: `${multiSelect("add", [...db.foods, "Otro"], pl.ingredients || [], "Ingredientes disponibles", "foodOther")}<label class="is-hidden" data-other-field="foodOther">Otro ingrediente<input name="foodOther" /></label><label>Ingredientes cargados<textarea name="items" rows="6">${esc((pl.ingredients || []).join("\n"))}</textarea></label><label class="toggle-line compact-toggle"><input name="saveReusable" type="checkbox" checked /> Guardar nuevos como reutilizables</label>`,
    prep: `<label>Preparacion<textarea name="prep" rows="10">${esc(pl.prep)}</textarea></label>`,
    supplements: `${multiSelect("add", [...db.supplements, "Otro"], pl.supplements || [], "Suplementos disponibles", "supplementOther")}<label class="is-hidden" data-other-field="supplementOther">Otro suplemento<input name="supplementOther" /></label><label>Suplementos cargados<textarea name="items" rows="6">${esc((pl.supplements || []).join("\n"))}</textarea></label><label class="toggle-line compact-toggle"><input name="saveReusable" type="checkbox" checked /> Guardar nuevos como reutilizables</label>`,
    message: `<label>Mensaje visible para el tutor<textarea name="message" rows="10">${esc(pl.message)}</textarea></label>`,
  }[state.sheet];
  return `<form class="sheet-form" data-save-section>${html}<div class="form-actions"><button class="primary-button">Guardar</button></div></form>`;
}

function stageForm() {
  return `<form class="sheet-form" data-save-stage><label>Nombre de etapa<input name="name" required /></label><div class="mini-grid"><label>Dia desde<input name="dayFrom" type="number" /></label><label>Dia hasta<input name="dayTo" type="number" /></label></div><label>Objetivo<textarea name="objective" rows="3"></textarea></label><label>Comidas por dia<input name="mealsPerDay" /></label><label>Mañana<textarea name="morning" rows="3"></textarea></label><label>Tarde<textarea name="afternoon" rows="3"></textarea></label><label>Noche<textarea name="night" rows="3"></textarea></label><label>Indicaciones<textarea name="instructions" rows="4"></textarea></label><label>Estado de la etapa<select name="status"><option>pendiente</option><option>activa</option><option>completada</option><option>suspendida</option></select></label>${multiSelect("forbidden", db.foods, [], "Alimentos prohibidos")}<label>Observaciones para el tutor<textarea name="tutorNotes" rows="3"></textarea></label><label>Proximo control<input name="nextControl" type="date" /></label><div class="form-actions"><button class="primary-button">Guardar etapa</button></div></form>`;
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
  $("[data-new-stage]")?.addEventListener("click", () => { state.sheet = "newStage"; render(); });
  document.querySelectorAll("[data-close]").forEach((x) => x.addEventListener("click", (e) => { if (e.target === x || x.matches("button")) { state.sheet = ""; render(); } }));
  $("[data-save-plan]")?.addEventListener("submit", savePlan);
  $("[data-save-section]")?.addEventListener("submit", saveSection);
  $("[data-save-stage]")?.addEventListener("submit", saveStage);
  $("[data-access]")?.addEventListener("click", () => { patient().tutorAccess = !patient().tutorAccess; save(); render(); });
  $("[data-docs]")?.addEventListener("submit", saveDocs);
  $("[data-urgent]")?.addEventListener("submit", saveUrgent);
  document.querySelectorAll("[data-other-toggle]").forEach((select) => {
    const update = () => {
      const field = document.querySelector(`[data-other-field="${select.dataset.otherToggle}"]`);
      field?.classList.toggle("is-hidden", select.value !== "Otro" && !Array.from(select.selectedOptions || []).some((option) => option.value === "Otro"));
    };
    select.addEventListener("change", update);
    update();
  });
}

function savePatient(e) { e.preventDefault(); const d = new FormData(e.currentTarget); if (!text(d, "name") || !text(d, "species") || !text(d, "tutor") || (!text(d, "dni") && !text(d, "email"))) return alert("Completa animal, especie, tutor y DNI o email."); const p = { id: id(), name: text(d, "name"), species: text(d, "species"), breed: text(d, "breed"), weight: text(d, "weight"), targetWeight: text(d, "targetWeight"), allergies: text(d, "allergies"), medication: text(d, "medication"), tutor: text(d, "tutor"), dni: text(d, "dni"), email: text(d, "email"), tutorAccess: d.get("tutorAccess") === "on", status: "Pendiente plan" }; db.patients.unshift(p); state.patientId = p.id; state.sheet = ""; save(); render(); }
function savePlan(e) { e.preventDefault(); const d = new FormData(e.currentTarget); const type = text(d, "type"); db.plans.unshift({ id: id(), patientId: patient().id, title: text(d, "title"), type, typeOther: type === "Otro" ? text(d, "typeOther") : "", objective: text(d, "objective"), startDate: text(d, "startDate"), duration: text(d, "duration"), status: text(d, "status"), nextControl: text(d, "nextControl"), ingredients: [], supplements: [] }); state.sheet = ""; save(); render(); }
function saveSection(e) { e.preventDefault(); const d = new FormData(e.currentTarget), p = plan(); if (state.sheet === "general") { const type = text(d, "type"); Object.assign(p, { title: text(d, "title"), type, typeOther: type === "Otro" ? text(d, "typeOther") : "", objective: text(d, "objective"), startDate: text(d, "startDate"), duration: text(d, "duration"), status: text(d, "status"), nextControl: text(d, "nextControl") }); } if (state.sheet === "ingredients") { p.ingredients = optionList(d, "add", "items", "foodOther"); if (d.get("saveReusable") === "on") db.foods = [...new Set([...db.foods, ...p.ingredients])]; } if (state.sheet === "prep") p.prep = text(d, "prep"); if (state.sheet === "supplements") { p.supplements = optionList(d, "add", "items", "supplementOther"); if (d.get("saveReusable") === "on") db.supplements = [...new Set([...db.supplements, ...p.supplements])]; } if (state.sheet === "message") p.message = text(d, "message"); state.sheet = ""; save(); render(); }
function saveStage(e) { e.preventDefault(); const d = new FormData(e.currentTarget); const item = { id: id(), planId: plan().id, patientId: patient().id, name: text(d, "name"), dayFrom: text(d, "dayFrom"), dayTo: text(d, "dayTo"), objective: text(d, "objective"), mealsPerDay: text(d, "mealsPerDay"), morning: text(d, "morning"), afternoon: text(d, "afternoon"), night: text(d, "night"), instructions: text(d, "instructions"), status: text(d, "status"), forbidden: d.getAll("forbidden"), tutorNotes: text(d, "tutorNotes"), nextControl: text(d, "nextControl") }; db.stages.push(item); state.sheet = "stages"; save(); render(); }
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
function optionList(d, selectKey, textKey, otherKey) { return [...new Set([...d.getAll(selectKey).filter((x) => x && x !== "Otro"), text(d, otherKey), ...text(d, textKey).split("\n").map((x) => x.trim())].filter(Boolean))]; }
function multiSelect(name, options, selected = [], label = "Seleccionar", otherField = "") { return `<label>${label}<select name="${name}" multiple size="7" ${otherField ? `data-other-toggle="${otherField}"` : ""}>${options.map((x) => `<option value="${x}" ${selected.includes(x) ? "selected" : ""}>${x}</option>`).join("")}</select><small class="field-hint">Podes seleccionar varios manteniendo Cmd/Ctrl o tocando opciones en mobile.</small></label>`; }
function id() { return crypto.randomUUID(); }

if ("serviceWorker" in navigator) navigator.serviceWorker.getRegistrations?.().then((r) => r.forEach((x) => x.unregister()));
if ("caches" in window) caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
save();
render();
