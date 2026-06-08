import { appConfig } from "./config.js";

const KEY = "nutrim-vet-v25";
const EMPTY_DB = { patients: [], plans: [], stages: [], docs: [], alerts: [], foods: [], supplements: [] };
const storage = (() => {
  try {
    if (!window.localStorage) return null;
    const probe = "__nutrim_vet_storage_probe__";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return null;
  }
})();
["nutrivetm-data-v1", "nutrim-vet-data-v2", "nutrim-vet-v16", "nutrim-vet-v17", "nutrim-vet-v18", "nutrim-vet-v19", "nutrim-vet-v20"].forEach((key) => storage?.removeItem(key));
let db = { ...EMPTY_DB };
try {
  db = { ...EMPTY_DB, ...JSON.parse(storage?.getItem(KEY) || storage?.getItem("nutrim-vet-v24") || storage?.getItem("nutrim-vet-v23") || storage?.getItem("nutrim-vet-v22") || storage?.getItem("nutrim-vet-v21") || "{}") };
} catch {
  db = { ...EMPTY_DB };
}
const testPatientIds = new Set((db.patients || []).filter((p) => ["mora", "luna", "tango", "prueba"].includes((p.name || "").toLowerCase()) || (p.tutor || "").toLowerCase() === "tutor prueba").map((p) => p.id));
db.patients = Array.isArray(db.patients) ? db.patients.filter((p) => !testPatientIds.has(p.id)) : [];
db.plans = Array.isArray(db.plans) ? db.plans : [];
db.stages = Array.isArray(db.stages) ? db.stages : [];
db.docs = Array.isArray(db.docs) ? db.docs : [];
db.alerts = Array.isArray(db.alerts) ? db.alerts : [];
db.plans = db.plans.filter((p) => !testPatientIds.has(p.patientId));
db.stages = db.stages.filter((s) => !testPatientIds.has(s.patientId));
db.foods = [...new Set([...(db.foods || []).filter((food) => (food || "").toLowerCase() !== "uvas"), ...["Cerdo", "Solomillo", "Carre", "Bondiola", "Zanahoria", "Calabaza", "Batata", "Manzana", "Aceite de oliva", "Sopa moro", "Gastrointestinal", "Ricota", "Huevo", "Yogurt natural"]])];
db.supplements = [...new Set([...(db.supplements || []), ...["Omega 3", "Calcio", "Glutamina", "Huevo", "Yogurt natural"]])];
const today = new Date();
const state = { auth: false, role: "vet", view: "home", patientId: db.patients[0]?.id || "", sheet: "", editingStageId: "", calendarYear: today.getFullYear(), calendarMonth: today.getMonth(), calendarDay: today.toISOString().slice(0, 10) };
const types = ["Transicion a natural", "Dieta mixta", "BARF", "Cocida", "Mantenimiento", "Descenso de peso", "Aumento de peso", "Digestiva", "Renal", "Hepatica", "Dermatologica", "Otro"];
const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

function save() { storage?.setItem(KEY, JSON.stringify(db)); }
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
  return `<main class="login-shell"><section class="login-visual"><img src="assets/nutrivetm-hero.png" alt="" /><div class="login-copy"><span class="brand-mark">NM</span><span class="eyebrow">${appConfig.appName}</span><h1>Acceso al seguimiento nutricional veterinario.</h1><p>Ingreso preparado para conectar con autenticacion real.</p></div></section><section class="login-panel"><span class="eyebrow">Ingresar</span><h2>Acceso</h2><form class="login-form" data-login><label>Perfil<span class="select-wrap"><select name="role"><option value="vet">Veterinaria</option><option value="tutor">Tutor</option></select></span></label><label>Usuario<input /></label><label>Contrasena<input type="password" /></label><button class="primary-button submit">Entrar</button></form></section></main>`;
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
  if (state.view === "calendar") return calendarView();
  return `<div class="dashboard-grid"><section class="hero-panel dashboard-hero"><img src="assets/nutrivetm-hero.png" alt="" /><div class="hero-copy"><span class="eyebrow">${appConfig.appName}</span><h2>Nutricion veterinaria, agenda y seguimiento en un solo panel.</h2><p>Gestiona pacientes, planes alimentarios, turnos y alertas clinicas desde una plataforma simple y profesional.</p></div></section><section class="metrics">${metric("Pacientes en seguimiento", db.patients.length, "patients")}${metric("Turnos proximos", 0, "calendar")}${metric("Alertas clinicas", db.alerts.length, "alerts", "danger")}${metric("Planes activos", db.plans.filter((p) => p.status === "activo").length, "plans")}</section></div>`;
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
  const stageIngredients = [...new Set(stages().flatMap((s) => s.ingredients || []))];
  const stageSupplements = [...new Set(stages().flatMap((s) => s.supplements || []))];
  const items = [["general", "Datos generales", pl.objective], ["stages", "Etapas", stages().length ? `${stages().length} etapa(s)` : ""], ["ingredients", "Biblioteca alimentos", stageIngredients.join(", ")], ["supplements", "Biblioteca suplementos", stageSupplements.join(", ")], ["message", "Mensaje tutor", pl.message]];
  return `<div class="plan-console-header"><div><span class="badge">${pl.status}</span><h3>${pl.title}</h3><p>${pl.type || "Tipo pendiente"} · ${pl.duration || "Duracion pendiente"}</p></div><button class="primary-button compact" data-export-pdf>Exportar PDF</button></div><div class="plan-section-menu">${items.map(([k, t, v]) => `<button class="plan-section-button" data-section="${k}"><span><strong>${t}</strong><small>${v || "Pendiente"}</small></span><em class="${v ? "ready" : ""}">${v ? "Cargado" : "Pendiente"}</em></button>`).join("")}</div>`;
}

function sheet(pl) {
  const name = { newPlan: "Crear plan", general: "Datos generales", stages: "Etapas", newStage: "Nueva etapa", editStage: "Editar etapa", ingredients: "Biblioteca alimentos", supplements: "Biblioteca suplementos", message: "Mensaje tutor" }[state.sheet];
  return `<div class="ios-sheet-backdrop" data-close><section class="ios-sheet"><div class="sheet-grabber"></div><header class="sheet-header"><div><span class="eyebrow">${patient().name}</span><h2>${name}</h2></div><button class="ghost-button compact" data-close>Cerrar</button></header><div class="sheet-scroll">${state.sheet === "newPlan" ? newPlanForm() : sectionForm(pl)}</div></section></div>`;
}

function newPlanForm() {
  return `<form class="sheet-form" data-save-plan><div class="fixed-patient-box"><span>Paciente seleccionado</span><strong>${patient().name}</strong><small>${patient().species} · ${patient().tutor}</small></div><label>Nombre del plan<input name="title" required /></label><label>Tipo<select name="type" data-other-toggle="typeOther"><option value="">Seleccionar</option>${types.map((x) => `<option>${x}</option>`).join("")}</select></label><label class="is-hidden" data-other-field="typeOther">Tipo personalizado<input name="typeOther" /></label><label>Objetivo<textarea name="objective" rows="3"></textarea></label><label>Fecha de inicio<input name="startDate" type="date" /></label><label>Duracion estimada<input name="duration" /></label><label>Estado<select name="status"><option>borrador</option><option>activo</option></select></label><label>Proximo control<input name="nextControl" type="date" /></label><div class="form-actions"><button class="primary-button">Crear plan</button></div></form>`;
}

function sectionForm(pl) {
  if (state.sheet === "stages") return `<div class="sheet-list"><button class="primary-button" data-new-stage>Agregar etapa</button>${stages().map((s) => `<article class="sheet-list-item"><span><strong>${s.name}</strong><small>${s.dayFrom || "sin fecha"} a ${s.dayTo || "sin fecha"} · ${stageMealSummary(s) || "sin comidas"} · ${s.status || "pendiente"}</small></span><span class="inline-actions"><button class="ghost-button compact" data-edit-stage="${s.id}">Editar</button><button class="ghost-button compact" data-delete-stage="${s.id}">Eliminar</button></span></article>`).join("") || "<p class='muted'>Todavia no hay etapas cargadas.</p>"}</div>`;
  if (state.sheet === "newStage") return stageForm();
  if (state.sheet === "editStage") return stageForm(db.stages.find((s) => s.id === state.editingStageId));
  const html = {
    general: `<label>Nombre<input name="title" value="${esc(pl.title)}" required /></label><label>Tipo<select name="type" data-other-toggle="typeOther"><option value="">Seleccionar</option>${types.map((x) => `<option ${pl.type === x ? "selected" : ""}>${x}</option>`).join("")}</select></label><label class="${pl.type === "Otro" ? "" : "is-hidden"}" data-other-field="typeOther">Tipo personalizado<input name="typeOther" value="${esc(pl.typeOther)}" /></label><label>Objetivo<textarea name="objective" rows="4">${esc(pl.objective)}</textarea></label><label>Fecha de inicio<input name="startDate" type="date" value="${esc(pl.startDate)}" /></label><label>Duracion estimada<input name="duration" value="${esc(pl.duration)}" /></label><label>Estado<select name="status">${["borrador", "activo", "finalizado", "suspendido"].map((x) => `<option ${pl.status === x ? "selected" : ""}>${x}</option>`).join("")}</select></label><label>Proximo control<input name="nextControl" type="date" value="${esc(pl.nextControl)}" /></label>`,
    ingredients: `${libraryManager("foods", "Biblioteca de alimentos", db.foods, "Nuevo alimento")}`,
    supplements: `${libraryManager("supplements", "Biblioteca de suplementos", db.supplements, "Nuevo suplemento")}`,
    message: `<label>Mensaje visible para el tutor<textarea name="message" rows="10">${esc(pl.message)}</textarea></label>`,
  }[state.sheet];
  return `<form class="sheet-form" data-save-section>${html}<div class="form-actions"><button class="primary-button">Guardar</button></div></form>`;
}

function stageForm(stage = null) {
  const s = stage || {};
  return `<form class="sheet-form" data-save-stage>${s.id ? `<input type="hidden" name="stageId" value="${s.id}" />` : ""}<label>Nombre de etapa<input name="name" value="${esc(s.name)}" required /></label><div class="mini-grid"><label>Fecha desde<input name="dayFrom" type="date" value="${esc(s.dayFrom)}" /></label><label>Fecha hasta<input name="dayTo" type="date" value="${esc(s.dayTo)}" /></label></div><label>Objetivo<textarea name="objective" rows="3">${esc(s.objective)}</textarea></label><label>Comidas por dia<input name="mealsPerDay" value="${esc(s.mealsPerDay)}" /></label>${mealEditor("morning", "Mañana", s)}${mealEditor("afternoon", "Tarde", s)}${mealEditor("night", "Noche", s)}<label>Indicaciones<textarea name="instructions" rows="4">${esc(s.instructions)}</textarea></label><label>Estado de la etapa<select name="status">${["pendiente", "activa", "completada", "suspendida"].map((x) => `<option ${s.status === x ? "selected" : ""}>${x}</option>`).join("")}</select></label>${multiSelect("forbidden", [...db.foods, "Otro"], s.forbidden || [], "Alimentos prohibidos", "forbiddenOther")}<label class="is-hidden" data-other-field="forbiddenOther">Otro alimento prohibido<input name="forbiddenOther" /></label>${stageSupplementSchedule(s)}<label>Observaciones para el tutor<textarea name="tutorNotes" rows="3">${esc(s.tutorNotes)}</textarea></label><label>Preparacion / observaciones de cocina<textarea name="prep" rows="3">${esc(s.prep)}</textarea></label><label>Proximo control<input name="nextControl" type="date" value="${esc(s.nextControl)}" /></label><div class="form-actions"><button class="primary-button">Guardar etapa</button></div></form>`;
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
  $("[data-prep-stage]")?.addEventListener("change", (e) => { state.stagePrepId = e.currentTarget.value; render(); });
  $("[data-new-patient]")?.addEventListener("click", () => { state.sheet = "newPatient"; render(); });
  document.querySelectorAll("[data-cancel]").forEach((b) => b.addEventListener("click", () => { state.sheet = ""; render(); }));
  $("[data-patient-form]")?.addEventListener("submit", savePatient);
  $("[data-plan-new]")?.addEventListener("click", () => { state.sheet = "newPlan"; render(); });
  document.querySelectorAll("[data-section]").forEach((b) => b.addEventListener("click", () => { state.sheet = b.dataset.section; render(); }));
  $("[data-new-stage]")?.addEventListener("click", () => { state.sheet = "newStage"; render(); });
  document.querySelectorAll("[data-edit-stage]").forEach((b) => b.addEventListener("click", () => { state.editingStageId = b.dataset.editStage; state.sheet = "editStage"; render(); }));
  document.querySelectorAll("[data-calendar-month]").forEach((b) => b.addEventListener("click", () => { state.calendarMonth += Number(b.dataset.calendarMonth); if (state.calendarMonth < 0) { state.calendarMonth = 11; state.calendarYear -= 1; } if (state.calendarMonth > 11) { state.calendarMonth = 0; state.calendarYear += 1; } render(); }));
  document.querySelectorAll("[data-calendar-day]").forEach((b) => b.addEventListener("click", () => { state.calendarDay = b.dataset.calendarDay; render(); }));
  $("[data-calendar-year]")?.addEventListener("change", (e) => { state.calendarYear = Number(e.currentTarget.value); render(); });
  $("[data-calendar-month-select]")?.addEventListener("change", (e) => { state.calendarMonth = Number(e.currentTarget.value); render(); });
  document.querySelectorAll("[data-close]").forEach((x) => x.addEventListener("click", (e) => { if (e.target === x || x.matches("button")) { state.sheet = ""; render(); } }));
  $("[data-save-plan]")?.addEventListener("submit", savePlan);
  $("[data-save-section]")?.addEventListener("submit", saveSection);
  $("[data-save-stage]")?.addEventListener("submit", saveStage);
  document.querySelectorAll("[data-delete-stage]").forEach((b) => b.addEventListener("click", () => { db.stages = db.stages.filter((s) => s.id !== b.dataset.deleteStage); save(); render(); }));
  document.querySelectorAll("[data-delete-library]").forEach((b) => b.addEventListener("click", () => deleteLibraryItem(b.dataset.deleteLibrary, b.dataset.value)));
  $("[data-export-pdf]")?.addEventListener("click", exportPlanPdf);
  $("[data-access]")?.addEventListener("click", () => { patient().tutorAccess = !patient().tutorAccess; save(); render(); });
  $("[data-docs]")?.addEventListener("submit", saveDocs);
  $("[data-urgent]")?.addEventListener("submit", saveUrgent);
  document.querySelectorAll("[data-other-toggle]").forEach((select) => {
    const update = () => {
      const field = document.querySelector(`[data-other-field="${select.dataset.otherToggle}"]`);
      field?.classList.toggle("is-hidden", !Array.from(select.selectedOptions || []).some((option) => option.value === "Otro" || option.value.startsWith("Otro ")));
    };
    select.addEventListener("change", update);
    update();
  });
  document.querySelectorAll("[data-meal-select]").forEach((select) => {
    const update = () => {
      const values = Array.from(select.selectedOptions || []).map((option) => option.value);
      document.querySelector(`[data-other-field="${select.dataset.mealSelect}Food"]`)?.classList.toggle("is-hidden", !values.includes("other-food"));
      document.querySelector(`[data-other-field="${select.dataset.mealSelect}Supplement"]`)?.classList.toggle("is-hidden", !values.includes("other-supplement"));
    };
    select.addEventListener("change", update);
    update();
  });
}

function savePatient(e) { e.preventDefault(); const d = new FormData(e.currentTarget); if (!text(d, "name") || !text(d, "species") || !text(d, "tutor") || (!text(d, "dni") && !text(d, "email"))) return alert("Completa animal, especie, tutor y DNI o email."); const p = { id: id(), name: text(d, "name"), species: text(d, "species"), breed: text(d, "breed"), weight: text(d, "weight"), targetWeight: text(d, "targetWeight"), allergies: text(d, "allergies"), medication: text(d, "medication"), tutor: text(d, "tutor"), dni: text(d, "dni"), email: text(d, "email"), tutorAccess: d.get("tutorAccess") === "on", status: "Pendiente plan" }; db.patients.unshift(p); state.patientId = p.id; state.sheet = ""; save(); render(); }
function savePlan(e) { e.preventDefault(); const d = new FormData(e.currentTarget); const type = text(d, "type"); db.plans.unshift({ id: id(), patientId: patient().id, title: text(d, "title"), type, typeOther: type === "Otro" ? text(d, "typeOther") : "", objective: text(d, "objective"), startDate: text(d, "startDate"), duration: text(d, "duration"), status: text(d, "status"), nextControl: text(d, "nextControl"), ingredients: [], supplements: [], supplementSchedule: {} }); state.sheet = ""; save(); render(); }
function saveSection(e) {
  e.preventDefault();
  const d = new FormData(e.currentTarget), p = plan();
  if (state.sheet === "general") { const type = text(d, "type"); Object.assign(p, { title: text(d, "title"), type, typeOther: type === "Otro" ? text(d, "typeOther") : "", objective: text(d, "objective"), startDate: text(d, "startDate"), duration: text(d, "duration"), status: text(d, "status"), nextControl: text(d, "nextControl") }); }
  if (state.sheet === "ingredients") { const next = text(d, "newLibraryItem"); if (next) db.foods = unique([...db.foods, next]); }
  if (state.sheet === "prep") { const s = db.stages.find((item) => item.id === text(d, "stageId")); if (s) s.prep = text(d, "prep"); }
  if (state.sheet === "supplements") { const next = text(d, "newLibraryItem"); p.supplements = optionList(d, "add", "items", "supplementOther"); if (d.get("saveReusable") === "on" || next) db.supplements = unique([...db.supplements, ...p.supplements, next]); p.supplementSchedule = scheduleFromForm(d, p.supplements); }
  if (state.sheet === "message") p.message = text(d, "message");
  state.sheet = "";
  save();
  render();
}
function saveStage(e) {
  e.preventDefault();
  const d = new FormData(e.currentTarget);
  const meals = {
    morning: mealFromForm(d, "morning"),
    afternoon: mealFromForm(d, "afternoon"),
    night: mealFromForm(d, "night"),
  };
  const ingredients = unique(Object.values(meals).flatMap((meal) => meal.foods));
  const supplements = unique([...Object.values(meals).flatMap((meal) => meal.supplements), ...scheduledKeys(d, "stageSchedule")]);
  const forbidden = optionList(d, "forbidden", "", "forbiddenOther");
  db.foods = unique([...db.foods, ...ingredients, ...forbidden]);
  db.supplements = unique([...db.supplements, ...supplements]);
  const stageId = text(d, "stageId");
  const item = { id: stageId || id(), planId: plan().id, patientId: patient().id, name: text(d, "name"), dayFrom: text(d, "dayFrom"), dayTo: text(d, "dayTo"), objective: text(d, "objective"), ingredients, supplements, meals, mealsPerDay: text(d, "mealsPerDay"), morning: mealText(meals.morning), afternoon: mealText(meals.afternoon), night: mealText(meals.night), instructions: text(d, "instructions"), status: text(d, "status"), forbidden, supplementSchedule: scheduleFromForm(d, supplements, "stageSchedule"), tutorNotes: text(d, "tutorNotes"), prep: text(d, "prep"), nextControl: text(d, "nextControl") };
  db.stages = stageId ? db.stages.map((stage) => stage.id === stageId ? item : stage) : [...db.stages, item];
  state.editingStageId = "";
  state.sheet = "stages";
  save();
  render();
}
function saveDocs(e) { e.preventDefault(); db.docs.push(...Array.from(e.currentTarget.files.files || []).map((f) => ({ name: f.name }))); save(); state.view = "tutor-calendar"; render(); }
function saveUrgent(e) { e.preventDefault(); const d = new FormData(e.currentTarget); db.alerts.unshift({ title: "Urgencia", severity: text(d, "severity"), text: text(d, "reason") }); save(); alert("La alerta fue enviada."); render(); }

function selectPatient() { return `<label class="active-patient-control"><span>Paciente activo</span><span class="select-wrap compact-select"><select data-active-patient>${db.patients.map((p) => `<option value="${p.id}" ${p.id === state.patientId ? "selected" : ""}>${p.name} · ${p.tutor}</option>`).join("")}</select></span></label>`; }
function tutorPatient() { return db.patients.find((p) => p.tutorAccess); }
function title() { return ({ dashboard: "Panel", patients: "Pacientes", plans: "Planes alimentarios", calendar: "Turnos", alerts: "Alertas", "tutor-docs": "Documentacion", "tutor-calendar": "Turnos", "tutor-urgent": "Urgencia", "tutor-pet": "Mi mascota", "tutor-plan": "Plan" }[state.view] || appConfig.appName); }
function card(v, t) { return `<button class="module-card" data-view="${v}"><span><strong>${t}</strong><small>Abrir</small></span></button>`; }
function metric(t, v, go, tone = "") { return `<button class="metric metric-link ${tone}" data-view="${go}"><strong>${v}</strong><span>${t}</span></button>`; }
function noPatient(t) { return `<section class="panel wide empty-module-panel"><div class="section-heading"><div><span class="eyebrow">Pacientes</span><h2>Sin pacientes cargados</h2></div><button class="primary-button" data-new-patient>Crear paciente</button></div><p class="muted">${t}</p></section>`; }
function panel(h, body) { return `<section class="panel wide"><div class="section-heading"><div><span class="eyebrow">${appConfig.appName}</span><h2>${h}</h2></div></div>${body}</section>`; }
function calendarView() {
  const monthName = new Date(state.calendarYear, state.calendarMonth, 1).toLocaleDateString("es-AR", { month: "long", year: "numeric" });
  const years = Array.from({ length: 7 }, (_, i) => today.getFullYear() - 1 + i);
  const months = Array.from({ length: 12 }, (_, i) => new Date(2026, i, 1).toLocaleDateString("es-AR", { month: "long" }));
  return `<section class="panel wide calendar-module"><div class="section-heading"><div><span class="eyebrow">Agenda anual</span><h2>Turnos</h2></div><div class="calendar-controls"><button class="ghost-button compact" data-calendar-month="-1">Anterior</button><button class="ghost-button compact" data-calendar-month="1">Siguiente</button></div></div><div class="calendar-picker-row"><label>Mes<select data-calendar-month-select>${months.map((m, i) => `<option value="${i}" ${i === state.calendarMonth ? "selected" : ""}>${m}</option>`).join("")}</select></label><label>Año<select data-calendar-year>${years.map((year) => `<option ${year === state.calendarYear ? "selected" : ""}>${year}</option>`).join("")}</select></label></div><div class="calendar-shell"><div class="mini-calendar"><div class="calendar-title">${monthName}</div><div class="calendar-weekdays">${["L", "M", "M", "J", "V", "S", "D"].map((d) => `<span>${d}</span>`).join("")}</div><div class="calendar-days">${calendarDays().map((day) => day ? `<button class="${day.iso === state.calendarDay ? "selected" : ""}" data-calendar-day="${day.iso}"><strong>${day.label}</strong><small>${day.hasAppointments ? "Turno" : "Libre"}</small></button>` : `<span></span>`).join("")}</div></div><aside class="day-agenda"><span class="eyebrow">Dia seleccionado</span><h3>${formatDate(state.calendarDay)}</h3><div class="slot-list">${availableSlots().map((slot) => `<button class="slot-button"><span>${slot}</span><small>Disponible</small></button>`).join("")}</div></aside></div></section>`;
}
function locked() { return panel("No habilitado", empty("Acceso pendiente", "Primero debe completarse la documentacion o habilitarse desde el perfil veterinario.")); }
function detail(k, v) { return `<div class="detail"><span>${k}</span><strong>${v || "Pendiente"}</strong></div>`; }
function empty(h, p) { return `<div class="empty-state"><h3>${h}</h3><p>${p}</p></div>`; }
function text(d, k) { return d.get(k)?.toString().trim() || ""; }
function optionList(d, selectKey, textKey, otherKey) { return [...new Set([...d.getAll(selectKey).filter((x) => x && x !== "Otro"), text(d, otherKey), ...text(d, textKey).split("\n").map((x) => x.trim())].filter(Boolean))]; }
function multiSelect(name, options, selected = [], label = "Seleccionar", otherField = "") { return `<label>${label}<select name="${name}" multiple size="7" ${otherField ? `data-other-toggle="${otherField}"` : ""}>${options.map((x) => `<option value="${x}" ${selected.includes(x) ? "selected" : ""}>${x}</option>`).join("")}</select><small class="field-hint">Podes seleccionar varios manteniendo Cmd/Ctrl o tocando opciones en mobile.</small></label>`; }
function unique(items) { return [...new Set(items.map((x) => String(x || "").trim()).filter(Boolean))]; }
function prepForm() {
  const list = stages();
  if (!list.length) return `<div class="sheet-list">${empty("Sin etapas", "Primero agrega una etapa para poder cargar su preparacion.")}</div>`;
  const selected = list.find((s) => s.id === state.stagePrepId) || list[0];
  return `<form class="sheet-form" data-save-section><label>Etapa<select name="stageId" data-prep-stage>${list.map((s) => `<option value="${s.id}" ${s.id === selected.id ? "selected" : ""}>${s.name}</option>`).join("")}</select></label><label>Preparacion de esta etapa<textarea name="prep" rows="10">${esc(selected.prep || "")}</textarea></label><div class="form-actions"><button class="primary-button">Guardar preparacion</button></div></form>`;
}
function weeklySchedule(pl) {
  const supplements = pl.supplements || [];
  if (!supplements.length) return `<p class="muted">Guarda suplementos para activar la grilla semanal.</p>`;
  return `<div class="weekly-table supplement-weekly"><div class="weekly-row weekly-head"><strong>Suplemento</strong>${days.map((d) => `<strong>${d.slice(0, 3)}</strong>`).join("")}</div>${supplements.map((s) => `<div class="weekly-row"><span>${esc(s)}</span>${days.map((day) => `<label class="day-check"><input type="checkbox" name="schedule:${esc(s)}" value="${day}" ${(pl.supplementSchedule?.[s] || []).includes(day) ? "checked" : ""} /><span>${day.slice(0, 1)}</span></label>`).join("")}</div>`).join("")}</div>`;
}
function scheduleFromForm(d, supplements, prefix = "schedule") {
  return supplements.reduce((acc, s) => ({ ...acc, [s]: d.getAll(`${prefix}:${s}`) }), {});
}
function libraryManager(kind, title, items, placeholder) {
  return `<div class="library-manager"><div><span class="eyebrow">${title}</span><p class="muted">Esta lista se usa en etapas, ingredientes y alimentos prohibidos.</p></div><label>${placeholder}<input name="newLibraryItem" /></label><div class="library-chip-list">${items.map((item) => `<span class="library-chip">${esc(item)}<button type="button" data-delete-library="${kind}" data-value="${esc(item)}">Eliminar</button></span>`).join("") || "<p class='muted'>Sin opciones cargadas.</p>"}</div></div>`;
}
function deleteLibraryItem(kind, value) {
  if (kind === "foods") {
    db.foods = db.foods.filter((x) => x !== value);
    db.stages = db.stages.map((s) => ({ ...s, ingredients: (s.ingredients || []).filter((x) => x !== value), forbidden: (s.forbidden || []).filter((x) => x !== value) }));
  }
  if (kind === "supplements") {
    db.supplements = db.supplements.filter((x) => x !== value);
    db.stages = db.stages.map((s) => {
      const schedule = { ...(s.supplementSchedule || {}) };
      delete schedule[value];
      return { ...s, supplements: (s.supplements || []).filter((x) => x !== value), supplementSchedule: schedule };
    });
    db.plans = db.plans.map((p) => {
      const schedule = { ...(p.supplementSchedule || {}) };
      delete schedule[value];
      return { ...p, supplements: (p.supplements || []).filter((x) => x !== value), supplementSchedule: schedule };
    });
  }
  save();
  render();
}
function mealOptions(selected = []) {
  return `<option value="none" ${selected.includes("none") ? "selected" : ""}>No se indica</option><optgroup label="Alimentos">${db.foods.map((x) => `<option value="food:${esc(x)}" ${selected.includes(`food:${x}`) ? "selected" : ""}>${esc(x)}</option>`).join("")}</optgroup><optgroup label="Suplementos">${db.supplements.map((x) => `<option value="supplement:${esc(x)}" ${selected.includes(`supplement:${x}`) ? "selected" : ""}>${esc(x)}</option>`).join("")}</optgroup><option value="other-food" ${selected.includes("other-food") ? "selected" : ""}>Otro alimento</option><option value="other-supplement" ${selected.includes("other-supplement") ? "selected" : ""}>Otro suplemento</option>`;
}
function mealEditor(key, label, stage = {}) {
  const meal = mealFor(stage, key);
  return `<fieldset class="meal-editor"><legend>${label}</legend><select name="${key}Items" multiple size="7" data-meal-select="${key}">${mealOptions(meal.selected)}</select><small class="field-hint">Selecciona alimentos, suplementos o "No se indica".</small><label class="${meal.showOtherFood ? "" : "is-hidden"}" data-other-field="${key}Food">Otro alimento<input name="${key}OtherFood" value="${esc(meal.otherFood)}" /></label><label class="${meal.showOtherSupplement ? "" : "is-hidden"}" data-other-field="${key}Supplement">Otro suplemento<input name="${key}OtherSupplement" value="${esc(meal.otherSupplement)}" /></label><label>Detalle / cantidad<textarea name="${key}Notes" rows="3">${esc(meal.notes)}</textarea></label></fieldset>`;
}
function mealFor(stage, key) {
  const meal = stage.meals?.[key] || {};
  const legacy = stage[key] && !stage.meals ? stage[key] : "";
  const selected = [...(meal.noIndicated ? ["none"] : []), ...(meal.foods || []).map((x) => `food:${x}`), ...(meal.supplements || []).map((x) => `supplement:${x}`)];
  return { selected, notes: meal.notes || legacy || "", otherFood: "", otherSupplement: "", showOtherFood: false, showOtherSupplement: false };
}
function mealFromForm(d, key) {
  const values = d.getAll(`${key}Items`);
  const otherFood = text(d, `${key}OtherFood`);
  const otherSupplement = text(d, `${key}OtherSupplement`);
  return {
    noIndicated: values.includes("none"),
    foods: unique([...values.filter((x) => x.startsWith("food:")).map((x) => x.replace("food:", "")), otherFood]),
    supplements: unique([...values.filter((x) => x.startsWith("supplement:")).map((x) => x.replace("supplement:", "")), otherSupplement]),
    notes: text(d, `${key}Notes`),
  };
}
function mealText(meal) {
  if (meal.noIndicated) return "No se indica";
  return [...meal.foods, ...meal.supplements, meal.notes].filter(Boolean).join(" · ");
}
function stageMealSummary(stage) {
  return ["morning", "afternoon", "night"].map((key) => mealText(stage.meals?.[key] || { foods: [], supplements: [], notes: stage[key] || "" })).filter(Boolean).join(" / ");
}
function stageSupplementSchedule(stage) {
  const supplements = unique([...(stage.supplements || []), ...Object.values(stage.meals || {}).flatMap((meal) => meal.supplements || []), ...db.supplements]);
  if (!supplements.length) return `<p class="muted">Cuando selecciones suplementos en las comidas, aca aparece la grilla semanal.</p>`;
  return `<div class="weekly-table supplement-weekly"><div class="weekly-row weekly-head"><strong>Suplemento</strong>${days.map((d) => `<strong>${d.slice(0, 3)}</strong>`).join("")}</div>${supplements.map((s) => `<div class="weekly-row"><span>${esc(s)}</span>${days.map((day) => `<label class="day-check"><input type="checkbox" name="stageSchedule:${esc(s)}" value="${day}" ${(stage.supplementSchedule?.[s] || []).includes(day) ? "checked" : ""} /><span>${day.slice(0, 1)}</span></label>`).join("")}</div>`).join("")}</div>`;
}
function scheduledKeys(d, prefix) {
  return [...new Set([...d.keys()].filter((key) => key.startsWith(`${prefix}:`)).map((key) => key.slice(prefix.length + 1)))];
}
function calendarDays() {
  const first = new Date(state.calendarYear, state.calendarMonth, 1);
  const last = new Date(state.calendarYear, state.calendarMonth + 1, 0);
  const leading = (first.getDay() + 6) % 7;
  const daysList = Array.from({ length: leading }, () => null);
  for (let day = 1; day <= last.getDate(); day++) {
    const iso = new Date(state.calendarYear, state.calendarMonth, day).toISOString().slice(0, 10);
    daysList.push({ label: day, iso, hasAppointments: false });
  }
  return daysList;
}
function availableSlots() { return ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"]; }
function formatDate(iso) {
  if (!iso) return "Selecciona un dia";
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
function exportPlanPdf() {
  const p = patient(), pl = plan();
  if (!p || !pl) return alert("Primero carga un paciente y un plan.");
  const win = window.open("", "_blank");
  if (!win) return alert("El navegador bloqueo la ventana de exportacion. Habilita ventanas emergentes para descargar el PDF.");
  win.document.write(planPdfHtml(p, pl, stages()));
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 350);
}
function planPdfHtml(p, pl, stageList) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8" /><title>${esc(pl.title || "Plan alimentario")} - ${esc(p.name)}</title><style>${pdfCss()}</style></head><body><main class="pdf-page"><header class="pdf-header"><div><span class="brand-mark">NM</span><strong>NutriM-Vet</strong><p>Plan alimentario veterinario</p></div><span>${new Date().toLocaleDateString("es-AR")}</span></header><section class="pdf-hero"><h1>${esc(pl.title || "Plan alimentario")}</h1><p>${esc(pl.objective || "Objetivo pendiente")}</p></section><section class="pdf-grid"><article><span>Paciente</span><strong>${esc(p.name)}</strong></article><article><span>Tutor</span><strong>${esc(p.tutor)}</strong></article><article><span>Especie</span><strong>${esc(p.species)}</strong></article><article><span>Raza</span><strong>${esc(p.breed || "Pendiente")}</strong></article><article><span>Peso actual</span><strong>${esc(p.weight || "Pendiente")}</strong></article><article><span>Peso objetivo</span><strong>${esc(p.targetWeight || "Pendiente")}</strong></article><article><span>Tipo</span><strong>${esc(pl.typeOther || pl.type || "Pendiente")}</strong></article><article><span>Estado</span><strong>${esc(pl.status || "Pendiente")}</strong></article></section>${stageList.length ? stageList.map(stagePdf).join("") : `<section class="pdf-section"><h2>Etapas</h2><p>Sin etapas cargadas.</p></section>`}<section class="pdf-section"><h2>Mensaje para el tutor</h2><p>${esc(pl.message || "Sin mensaje final cargado.")}</p></section></main><script>window.addEventListener("afterprint", () => window.close());</script></body></html>`;
}
function stagePdf(stage) {
  return `<section class="pdf-section"><h2>${esc(stage.name || "Etapa sin nombre")}</h2><p class="muted">${esc(stage.dayFrom || "Sin fecha")} a ${esc(stage.dayTo || "Sin fecha")} · ${esc(stage.status || "pendiente")}</p>${stage.objective ? `<p>${esc(stage.objective)}</p>` : ""}<div class="meal-pdf-grid">${["morning", "afternoon", "night"].map((key) => mealPdf(key, stage.meals?.[key] || { notes: stage[key] || "" })).join("")}</div>${(stage.forbidden || []).length ? `<h3>Alimentos prohibidos</h3><p>${esc(stage.forbidden.join(", "))}</p>` : ""}${stage.instructions ? `<h3>Indicaciones</h3><p>${esc(stage.instructions)}</p>` : ""}${stage.prep ? `<h3>Preparacion</h3><p>${esc(stage.prep)}</p>` : ""}${stage.tutorNotes ? `<h3>Observaciones para el tutor</h3><p>${esc(stage.tutorNotes)}</p>` : ""}${stageSchedulePdf(stage)}</section>`;
}
function mealPdf(key, meal) {
  const title = { morning: "Mañana", afternoon: "Tarde", night: "Noche" }[key];
  if (meal.noIndicated) return `<article><h3>${title}</h3><p>No se indica.</p></article>`;
  const items = [...(meal.foods || []), ...(meal.supplements || [])];
  return `<article><h3>${title}</h3>${items.length ? `<p>${esc(items.join(", "))}</p>` : `<p>Sin alimentos indicados.</p>`}${meal.notes ? `<small>${esc(meal.notes)}</small>` : ""}</article>`;
}
function stageSchedulePdf(stage) {
  const supplements = unique([...(stage.supplements || []), ...Object.values(stage.meals || {}).flatMap((meal) => meal.supplements || [])]);
  if (!supplements.length) return "";
  return `<h3>Suplementacion semanal</h3><table><thead><tr><th>Suplemento</th>${days.map((day) => `<th>${day.slice(0, 3)}</th>`).join("")}</tr></thead><tbody>${supplements.map((s) => `<tr><td>${esc(s)}</td>${days.map((day) => `<td>${(stage.supplementSchedule?.[s] || []).includes(day) ? "Si" : ""}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}
function pdfCss() {
  return `body{margin:0;background:#f7f8f5;color:#1f2933;font-family:Manrope,Inter,Arial,sans-serif}.pdf-page{max-width:860px;margin:0 auto;padding:34px}.pdf-header{display:flex;justify-content:space-between;gap:20px;align-items:center;margin-bottom:24px}.brand-mark{display:inline-grid;place-items:center;width:42px;height:42px;margin-right:10px;border-radius:10px;background:#4f8f6b;color:#fff;font-weight:900}.pdf-header strong{font-size:20px}.pdf-header p,.muted,span,small{color:#66736a}.pdf-hero{padding:22px;border-radius:12px;background:linear-gradient(135deg,#ddefe5,#fff);border:1px solid #dfe7dc;margin-bottom:18px}.pdf-hero h1{margin:0 0 8px;font-size:30px}.pdf-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px}.pdf-grid article,.meal-pdf-grid article{padding:12px;border:1px solid #dfe7dc;border-radius:10px;background:#fff}.pdf-grid span{display:block;font-size:11px;font-weight:800;text-transform:uppercase}.pdf-section{padding:18px;border:1px solid #dfe7dc;border-radius:12px;background:#fff;margin:14px 0;break-inside:avoid}.pdf-section h2{margin:0 0 8px;color:#32694c}.pdf-section h3{margin:14px 0 6px;font-size:14px}.meal-pdf-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}table{width:100%;border-collapse:collapse;margin-top:8px}th,td{border:1px solid #dfe7dc;padding:8px;text-align:center}th{background:#f4eef9;color:#7652a7}@media print{body{background:#fff}.pdf-page{padding:0}.pdf-section,.pdf-hero,.pdf-grid article,.meal-pdf-grid article{box-shadow:none}}`;
}

if ("serviceWorker" in navigator) navigator.serviceWorker.getRegistrations?.().then((r) => r.forEach((x) => x.unregister()));
if ("caches" in window) caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
save();
render();
