import { appConfig } from "./config.js";

const KEY = "nutrim-vet-v31";
const EMPTY_DB = { patients: [], plans: [], dietPlans: [], stages: [], docs: [], alerts: [], foods: [], supplements: [], tutorReports: [], history: [], reminders: [] };
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
  db = { ...EMPTY_DB, ...JSON.parse(storage?.getItem(KEY) || storage?.getItem("nutrim-vet-v30") || storage?.getItem("nutrim-vet-v29") || storage?.getItem("nutrim-vet-v28") || storage?.getItem("nutrim-vet-v27") || storage?.getItem("nutrim-vet-v26") || storage?.getItem("nutrim-vet-v25") || storage?.getItem("nutrim-vet-v24") || storage?.getItem("nutrim-vet-v23") || storage?.getItem("nutrim-vet-v22") || storage?.getItem("nutrim-vet-v21") || "{}") };
} catch {
  db = { ...EMPTY_DB };
}
const testPatientIds = new Set((db.patients || []).filter((p) => ["mora", "luna", "tango", "prueba"].includes((p.name || "").toLowerCase()) || (p.tutor || "").toLowerCase() === "tutor prueba").map((p) => p.id));
db.patients = Array.isArray(db.patients) ? db.patients.filter((p) => !testPatientIds.has(p.id)) : [];
db.plans = Array.isArray(db.plans) ? db.plans : [];
db.dietPlans = Array.isArray(db.dietPlans) ? db.dietPlans : [];
db.stages = Array.isArray(db.stages) ? db.stages : [];
db.docs = Array.isArray(db.docs) ? db.docs : [];
db.alerts = Array.isArray(db.alerts) ? db.alerts : [];
db.tutorReports = Array.isArray(db.tutorReports) ? db.tutorReports : [];
db.history = Array.isArray(db.history) ? db.history : [];
db.reminders = Array.isArray(db.reminders) ? db.reminders : [];
db.plans = db.plans.filter((p) => !testPatientIds.has(p.patientId));
db.dietPlans = db.dietPlans.filter((p) => !testPatientIds.has(p.patientId));
db.stages = db.stages.filter((s) => !testPatientIds.has(s.patientId));
db.tutorReports = db.tutorReports.filter((r) => !testPatientIds.has(r.patientId));
db.history = db.history.filter((h) => !testPatientIds.has(h.patientId));
db.reminders = db.reminders.filter((r) => !testPatientIds.has(r.patientId));
db.alerts = db.alerts.filter((a) => !testPatientIds.has(a.patientId));
const foodGroups = [
  ["Alimentos comerciales tradicionales", ["Alimento balanceado adultos", "Alimento balanceado cachorros", "Alimento balanceado diabetes", "Alimento balanceado geriátricos", "Alimento balanceado para obesidad", "Alimento balanceado seco", "Alimento balanceado urinario"]],
  ["Proteínas animales", ["Atún al natural", "Bola de lomo", "Carne vacuna magra", "Cerdo magro", "Clara de huevo", "Huevo entero", "Lenguado", "Lomo", "Merluza", "Muslo de pollo", "Nalga", "Pavo", "Pechuga de pollo", "Pescado blanco", "Pollo", "Roast beef magro", "Salmón", "Sardina", "Trucha"]],
  ["Proteínas BARF", ["Alas de pollo", "Carcasa de pollo", "Carne vacuna cruda", "Cerdo apto para BARF", "Corazón bovino", "Corazón de pollo", "Cordero crudo", "Costillas carnosas", "Huesos carnosos de pollo", "Mollejas", "Mondongo verde", "Pavo crudo", "Pescado crudo", "Pollo crudo", "Tráquea bovina"]],
  ["Vísceras", ["Bazo", "Corazón", "Hígado de pollo", "Hígado vacuno", "Páncreas", "Pulmón", "Riñón", "Sesos"]],
  ["Vegetales", ["Acelga", "Apio", "Arvejas", "Batata", "Boniato", "Brócoli", "Calabaza", "Chauchas", "Coliflor", "Espinaca", "Lechuga", "Pepino", "Remolacha", "Repollo", "Rúcula", "Zanahoria", "Zapallito", "Zapallo", "Zucchini"]],
  ["Frutas", ["Arándanos", "Banana", "Coco", "Durazno", "Frutilla", "Kiwi", "Mango", "Manzana", "Melón", "Mora", "Papaya", "Pera", "Sandía"]],
  ["Carbohidratos", ["Arroz blanco", "Arroz integral", "Avena", "Batata", "Cebada", "Fideos", "Mijo", "Papa", "Polenta", "Quinoa", "Yuca"]],
  ["Grasas saludables", ["Aceite de coco", "Aceite de krill", "Aceite de oliva", "Aceite de pescado", "Aceite de salmón", "Aceite de sardina", "Grasa vacuna", "Manteca clarificada (ghee)"]],
  ["Lácteos", ["Kéfir", "Queso cottage", "Ricota magra", "Yogur griego", "Yogur natural"]],
  ["Superalimentos", ["Alga kelp", "Alga spirulina", "Arándanos deshidratados", "Coco rallado", "Hemp (cáñamo)", "Semillas de chía", "Semillas de lino"]]
];
const supplementGroups = [
  ["Suplementos nutricionales", ["Aceite de pescado", "Aceite de salmón", "Calcio", "Calcio de cáscara de huevo", "Carbonato de calcio", "Citrato de calcio", "Cobre", "Fósforo", "Hierro", "Magnesio", "Manganeso", "Omega 3 EPA/DHA", "Omega 6", "Omega 9", "Selenio", "Yodo", "Zinc"]],
  ["Aminoácidos y recuperación", ["Arginina", "BCAA", "Carnitina", "Colágeno hidrolizado", "Glutamina", "Lisina", "Metionina", "Taurina"]],
  ["Salud articular", ["Ácido hialurónico", "Colágeno tipo II", "Condroitina", "Glucosamina", "Mejillón de labios verdes", "MSM"]],
  ["Probióticos y digestivos", ["Enterococcus faecium", "Enzimas digestivas", "Fibra soluble", "Inulina", "Prebióticos", "Probióticos", "Psyllium", "Saccharomyces boulardii"]],
  ["Vitaminas", ["Ácido fólico", "Complejo B", "Multivitamínico", "Vitamina A", "Vitamina B12", "Vitamina C", "Vitamina D", "Vitamina E", "Vitamina K"]],
  ["Soporte inmunológico", ["Astrágalo", "Beta glucanos", "Calostro bovino", "Equinácea", "Hongos medicinales"]],
  ["Suplementos naturales funcionales", ["Aloe vera", "Clorela", "Cúrcuma", "Espirulina", "Harina de coco", "Jengibre", "Levadura de cerveza", "Polen de abeja", "Propóleo"]]
];
const defaultFoods = foodGroups.flatMap(([, items]) => items);
const defaultSupplements = supplementGroups.flatMap(([, items]) => items);
db.foods = unique([...defaultFoods, ...(db.foods || [])]);
db.supplements = unique([...defaultSupplements, ...(db.supplements || [])]);
const today = new Date();
const state = { auth: false, role: "vet", view: "home", patientId: db.patients[0]?.id || "", sheet: "", editingStageId: "", activeReportId: "", calendarYear: today.getFullYear(), calendarMonth: today.getMonth(), calendarDay: today.toISOString().slice(0, 10) };
const types = ["Dieta de transicion", "Dieta natural", "Dieta mixta", "BARF", "Cocida", "Mantenimiento", "Descenso de peso", "Aumento de peso", "Plan gastrointestinal", "Plan renal", "Plan hepatico", "Plan dermatologico", "Otro"];
const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
const shortDays = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
const units = ["gramos", "cucharada", "cucharadita", "capsula", "fraccion de capsula", "pizca", "unidad", "gotas", "ml", "otro"];
const itemTypes = { food: "Alimento", supplement: "Suplemento", superfood: "Superalimento" };
const defaultAdvice = [
  "Incorporar un ingrediente a la vez.",
  "Probar cada ingrediente al menos 3 dias.",
  "Observar tolerancia gastrointestinal.",
  "Ofrecer la racion natural o tibia, no fria ni caliente.",
  "Usar balanza.",
  "Preparar viandas para freezer.",
  "Descongelar en heladera."
];
syncDietPlans();

function save() { storage?.setItem(KEY, JSON.stringify(db)); }
function $(q) { return document.querySelector(q); }
function patient() { if (!db.patients.length) return null; if (!state.patientId) state.patientId = db.patients[0].id; return db.patients.find((p) => p.id === state.patientId) || db.patients[0]; }
function plan() { return db.dietPlans.find((p) => p.patientId === state.patientId) || null; }
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
  const vet = [["dashboard", "Panel"], ["patients", "Pacientes"], ["plans", "Planes"], ["calendar", "Turnos"], ["alerts", "Alertas"], ["reminders", "Recordatorios"]];
  const tutor = [["tutor-docs", "Documentacion"], ["tutor-pet", "Mi mascota"], ["tutor-report", "Seguimiento diario"], ["tutor-calendar", "Turnos"], ["tutor-urgent", "Urgencia"], ["tutor-reminders", "Recordatorios"], ["tutor-plan", "Plan completo"]];
  return `<main class="home-shell ${state.role === "tutor" ? "tutor-mode" : ""}"><section class="profile-top"><button class="brand compact-brand"><span class="brand-mark">NM</span><span><strong>${appConfig.appName}</strong><small>${state.role === "vet" ? "Perfil veterinaria" : "Perfil tutor"}</small></span></button><div class="profile-summary"><span class="eyebrow">${state.role === "vet" ? "Gestion nutricional veterinaria" : "Portal del tutor"}</span><h1>${state.role === "vet" ? "Panel profesional" : "Inicio"}</h1><p>${state.role === "vet" ? "Sin pacientes ni planes de ejemplo. Todo se crea desde datos cargados." : "Carga documentacion para habilitar el turno comun."}</p></div><div class="account-actions">${state.role === "vet" && patient() ? selectPatient() : ""}<button class="soft-button" data-logout>Cerrar sesion</button></div></section><section class="module-grid">${(state.role === "vet" ? vet : tutor).map(([v, t]) => card(v, t)).join("")}</section></main>`;
}

function shell() {
  return `<main class="flow-shell"><div class="flow-backdrop" aria-hidden="true">${home()}</div><section class="flow-sheet"><header class="flow-header"><button class="ghost-button" data-home>Volver</button><div><span class="eyebrow">${appConfig.appName}</span><h1>${title()}</h1></div><div class="flow-actions">${state.role === "vet" && patient() ? selectPatient() : ""}<button class="soft-button" data-logout>Cerrar sesion</button></div></header><div class="flow-content">${view()}</div></section></main>`;
}

function view() {
  if (state.role === "tutor") return tutorView();
  if (state.view === "patients") return patients();
  if (state.view === "plans") return plans();
  if (state.view === "alerts") return alertsView();
  if (state.view === "reminders") return remindersView();
  if (state.view === "calendar") return calendarView();
  return `<div class="dashboard-grid"><section class="hero-panel dashboard-hero"><img src="assets/nutrivetm-hero.png" alt="" /><div class="hero-copy"><span class="eyebrow">${appConfig.appName}</span><h2>Nutricion veterinaria, agenda y seguimiento en un solo panel.</h2><p>Gestiona pacientes, planes alimentarios, turnos y alertas clinicas desde una plataforma simple y profesional.</p></div></section><section class="metrics">${metric("Pacientes en seguimiento", db.patients.length, "patients")}${metric("Turnos proximos", 0, "calendar")}${metric("Alertas clinicas", db.alerts.filter((a) => a.status !== "resuelta").length, "alerts", "danger")}${metric("Planes publicados", db.dietPlans.filter((p) => p.status === "published" || p.status === "activo").length, "plans")}</section></div>`;
}

function patients() {
  const p = patient();
  if (state.sheet === "newPatient") return patientForm();
  if (!p) return noPatient("Todavia no hay pacientes cargados.");
  const active = activePlan(p.id), stage = active ? activeStage(active) : null;
  return `<div class="patient-layout patient-select-layout"><section class="panel patient-picker-panel"><div class="section-heading"><div><span class="eyebrow">Legajo</span><h2>Seleccionar paciente</h2></div></div>${selectPatient()}<button class="primary-button" data-new-patient>+ Nuevo paciente</button><button class="ghost-button danger-text" data-delete-patient>Eliminar paciente</button><p class="muted">El selector muestra solo pacientes cargados.</p></section><section class="panel patient-detail"><div class="patient-header"><span class="avatar large">${p.name[0]}</span><div><span class="badge">${p.status || "Pendiente plan"}</span><h2>${p.name}</h2><p>${p.species} · ${p.breed || "Sin raza"}</p></div></div><div class="detail-grid">${detail("Tutor", p.tutor)}${detail("Peso actual", p.weight ? `${p.weight} kg` : "")}${detail("Peso objetivo", p.targetWeight ? `${p.targetWeight} kg` : "")}${detail("Plan activo", active?.title)}${detail("Etapa actual", stage?.name)}${detail("Alergias", p.allergies)}${detail("Medicacion", p.medication)}</div><div class="access-control-card"><div><span class="eyebrow">Vista del tutor</span><h3>${p.tutorAccess ? "Acceso habilitado" : "Acceso pendiente"}</h3></div><button class="primary-button" data-access>${p.tutorAccess ? "Deshabilitar" : "Habilitar acceso tutor"}</button></div>${historySummary(p.id)}</section>${state.sheet === "history" ? historySheet(p) : ""}</div>`;
}

function patientForm() {
  return `<form class="panel wide patient-form premium-patient-form" data-patient-form><div class="patient-form-hero"><button class="ghost-button back-button" type="button" data-cancel>Volver</button><div><span class="eyebrow">Alta de paciente</span><h2>Nuevo paciente veterinario</h2><p>Creá un legajo claro para cualquier especie y vinculalo con su tutor.</p></div><div class="hero-mini-card"><span>Estado</span><strong>Nuevo legajo</strong></div></div><div class="form-grid premium-form-grid"><section class="form-section premium-section"><div class="section-kicker"><span>01</span><div><h3>Paciente</h3><p>Datos clínicos y nutricionales principales.</p></div></div><label>Nombre<input name="name" required placeholder="Nombre del paciente" /></label><label>Especie<input name="species" required placeholder="Canino, felino, ave, reptil, equino..." /></label><label>Raza o tipo<input name="breed" placeholder="Raza, tipo o variedad" /></label><div class="mini-grid"><label>Edad<input name="age" placeholder="Ej: 4 años" /></label><label>Sexo<select name="sex"><option value="">Seleccionar</option><option>Macho</option><option>Hembra</option><option>No aplica</option></select></label></div><label>Estado reproductivo<select name="neuteredStatus"><option value="">Seleccionar</option><option>Castrado</option><option>No castrado</option><option>No aplica</option></select></label><div class="mini-grid"><label>Peso actual<input name="weight" type="number" step="0.1" placeholder="kg" /></label><label>Condición corporal<input name="bodyCondition" placeholder="Escala o descripción" /></label></div><label>Alimentación actual<textarea name="currentFood" rows="3" placeholder="Tipo de alimentación, marca, frecuencia o rutina actual"></textarea></label><label>Observaciones clínicas visibles<textarea name="visibleClinicalNotes" rows="3" placeholder="Información que puede ver el tutor"></textarea></label><label>Observaciones internas<textarea name="internalClinicalNotes" rows="3" placeholder="Notas privadas para la veterinaria"></textarea></label></section><section class="form-section premium-section tutor-section"><div class="section-kicker"><span>02</span><div><h3>Tutor</h3><p>Datos para vincular el acceso del dueño o responsable.</p></div></div><label>Nombre y apellido<input name="tutor" required placeholder="Nombre del tutor" /></label><label>DNI<input name="dni" placeholder="Opcional si se usa email" /></label><label>Email<input name="email" type="email" placeholder="correo@ejemplo.com" /></label><label class="premium-switch"><input name="tutorAccess" type="checkbox" /><span class="switch-track"><span></span></span><strong>Habilitar acceso del tutor</strong><small>Podrá ver el plan cuando esté publicado.</small></label></section></div><div class="form-actions premium-action-bar"><button class="ghost-button" type="button" data-cancel>Cancelar</button><button class="primary-button">Guardar paciente</button></div></form>`;
}

function plans() {
  const p = patient();
  if (!p) return noPatient("Primero carga un paciente. El plan siempre se crea sobre el paciente seleccionado.");
  const pl = plan();
  return `<div class="plan-workbench"><section class="panel wide plan-console ${state.sheet ? "sheet-dimmed" : ""}"><div class="section-heading"><div><span class="eyebrow">Plan alimentario</span><h2>${p.name}</h2></div><div class="section-actions">${selectPatient()}<button class="primary-button" data-plan-new>+ Nuevo plan</button></div></div>${pl ? planMenu(pl) : `<div class="empty-state"><h3>Sin plan cargado para ${p.name}</h3><p>No se carga informacion de ejemplo. El plan se arma desde cero para este paciente.</p><button class="primary-button" data-plan-new>Crear plan</button></div>`}</section>${state.sheet && state.sheet !== "newPatient" ? sheet(pl) : ""}</div>`;
}

function planMenu(pl) {
  const selectedItems = pl.selectedItems || [];
  const currentStage = activeStage(pl);
  const planReminders = db.reminders.filter((r) => r.patientId === pl.patientId && (r.nutritionPlanId === pl.id || r.sourceId === pl.id));
  const pendingReminders = planReminders.filter((r) => r.status === "pendiente").length;
  const reminderStatus = pendingReminders ? `${pendingReminders} pendiente(s)` : planReminders.length ? `${planReminders.length} cargado(s)` : "";
  const items = [
    ["patientProfile", "Resumen / ficha", patientProfileStatus()],
    ["general", "Plan actual", pl.objective],
    ["advice", "Consejos generales", (pl.generalAdvice || []).filter((a) => a.enabled).length ? `${(pl.generalAdvice || []).filter((a) => a.enabled).length} activo(s)` : ""],
    ["selectedItems", "Alimentos y base seleccionada", selectedItems.length ? `${selectedItems.length} item(s)` : ""],
    ["dailyRation", "Racion diaria", pl.dailyRation?.totalQuantity ? `${pl.dailyRation.totalQuantity} ${pl.dailyRation.totalUnit || ""}` : ""],
    ["transition", "Transicion", (pl.transitionSteps || []).length ? `${pl.transitionSteps.length} paso(s)` : ""],
    ["supplementation", "Suplementacion", (pl.supplementSchedules || []).length ? `${pl.supplementSchedules.length} suplemento(s)` : ""],
    ["weeklyExamples", "Semanas / raciones", (pl.weeklyExamples || []).length ? `${pl.weeklyExamples.length} semana(s)` : ""],
    ["tutorTracking", "Seguimiento del tutor", db.tutorReports.filter((r) => r.patientId === pl.patientId).length ? `${db.tutorReports.filter((r) => r.patientId === pl.patientId).length} reporte(s)` : ""],
    ["exportHub", "PDF / exportacion", pl.published ? "Publicado" : "Borrador"],
    ["internalNotes", "Notas internas", pl.internalNotes],
    ["reminderForm", "Recordatorios", reminderStatus]
  ];
  return `<div class="plan-console-header diet-plan-header"><div><span class="badge">${esc(pl.status || "draft")}</span><h3>${esc(pl.title)}</h3><p>${esc(pl.typeOther || pl.type || "Tipo pendiente")} · ${esc(pl.duration || "Duracion pendiente")}</p>${currentStage ? `<small>Etapa actual: ${esc(currentStage.name)}</small>` : ""}</div><div class="plan-header-actions"><button class="primary-button compact" data-section="exportHub">PDF / exportacion</button><button class="ghost-button compact" data-publish-plan>Publicar</button><button class="ghost-button compact danger-text" data-delete-plan>Eliminar plan</button></div></div><div class="plan-section-menu diet-plan-modules">${items.map(([k, t, v]) => `<button class="plan-section-button" data-section="${k}"><span><strong>${t}</strong><small>${v || "Pendiente"}</small></span><em class="${v ? "ready" : ""}">${v ? "Cargado" : "Pendiente"}</em></button>`).join("")}</div>`;
}

function sheet(pl) {
  const name = { newPlan: "Crear plan", patientProfile: "Ficha del paciente", general: "Plan actual", advice: "Consejos generales", selectedItems: "Alimentos seleccionados", dailyRation: "Racion diaria", transition: "Transicion", supplementation: "Suplementacion", weeklyExamples: "Semanas / raciones", tutorTracking: "Seguimiento del tutor", exportHub: "PDF / exportacion", internalNotes: "Notas internas", stages: "Etapas", newStage: "Nueva etapa", editStage: "Editar etapa", ingredients: "Biblioteca alimentos", supplements: "Biblioteca suplementos", reminderForm: "Crear recordatorio", reminderList: "Recordatorios del plan", message: "Mensaje tutor", preview: "Vista previa tutor" }[state.sheet];
  return `<div class="ios-sheet-backdrop" data-close><section class="ios-sheet"><div class="sheet-grabber"></div><header class="sheet-header"><div><span class="eyebrow">${patient().name}</span><h2>${name}</h2></div><button class="ghost-button compact" data-close>Cerrar</button></header><div class="sheet-scroll">${state.sheet === "newPlan" ? newPlanForm() : sectionForm(pl)}</div></section></div>`;
}

function newPlanForm() {
  return `<form class="sheet-form" data-save-plan><div class="fixed-patient-box"><span>Paciente seleccionado</span><strong>${patient().name}</strong><small>${patient().species || "Especie pendiente"} · ${patient().tutor}</small></div><label>Nombre del plan<input name="title" required /></label><label>Tipo de plan<select name="type" data-other-toggle="typeOther"><option value="">Seleccionar</option>${types.map((x) => `<option>${x}</option>`).join("")}</select></label><label class="is-hidden" data-other-field="typeOther">Tipo personalizado<input name="typeOther" /></label><label>Objetivo del plan<textarea name="objective" rows="3"></textarea></label><div class="mini-grid"><label>Fecha de inicio<input name="startDate" type="date" /></label><label>Duracion estimada<input name="duration" /></label></div><label>Estado<select name="status"><option value="draft">Borrador</option><option value="published">Publicado</option><option value="archived">Archivado</option></select></label><label>Proximo control<input name="nextControl" type="date" /></label><label>Observaciones generales<textarea name="generalNotes" rows="4"></textarea></label><div class="form-actions"><button class="primary-button">Crear plan estructurado</button></div></form>`;
}

function sectionForm(pl) {
  if (state.sheet === "patientProfile") return patientProfileForm();
  if (state.sheet === "advice") return adviceForm(pl);
  if (state.sheet === "selectedItems") return selectedItemsForm(pl);
  if (state.sheet === "dailyRation") return dailyRationForm(pl);
  if (state.sheet === "transition") return transitionForm(pl);
  if (state.sheet === "supplementation") return supplementationForm(pl);
  if (state.sheet === "weeklyExamples") return weeklyExamplesForm(pl);
  if (state.sheet === "tutorTracking") return tutorTrackingPanel(pl);
  if (state.sheet === "exportHub") return exportHub(pl);
  if (state.sheet === "internalNotes") return `<form class="sheet-form" data-save-section><label>Notas internas de la veterinaria<textarea name="internalNotes" rows="12">${esc(pl.internalNotes || "")}</textarea></label><p class="muted">Estas notas no se muestran al tutor.</p><div class="form-actions"><button class="primary-button">Guardar notas internas</button></div></form>`;
  if (state.sheet === "stages") return `<div class="sheet-list"><button class="primary-button" data-new-stage>Agregar etapa</button>${stages().map((s) => `<article class="sheet-list-item"><span><strong>${s.name}</strong><small>${s.dayFrom || "sin fecha"} a ${s.dayTo || "sin fecha"} · ${stageMealSummary(s) || "sin comidas"} · ${s.status || "pendiente"}</small></span><span class="inline-actions"><button class="ghost-button compact" data-stage-active="${s.id}">Activar</button><button class="ghost-button compact" data-edit-stage="${s.id}">Editar</button><button class="ghost-button compact" data-delete-stage="${s.id}">Eliminar</button></span></article>`).join("") || "<p class='muted'>Todavia no hay etapas cargadas.</p>"}</div>`;
  if (state.sheet === "newStage") return stageForm();
  if (state.sheet === "editStage") return stageForm(db.stages.find((s) => s.id === state.editingStageId));
  if (state.sheet === "reminderForm") return reminderForm(pl);
  if (state.sheet === "reminderList") return reminderList(pl);
  if (state.sheet === "preview") return planPreview(pl);
  const html = {
    general: `<label>Nombre<input name="title" value="${esc(pl.title)}" required /></label><label>Tipo de plan<select name="type" data-other-toggle="typeOther"><option value="">Seleccionar</option>${types.map((x) => `<option ${pl.type === x ? "selected" : ""}>${x}</option>`).join("")}</select></label><label class="${pl.type === "Otro" ? "" : "is-hidden"}" data-other-field="typeOther">Tipo personalizado<input name="typeOther" value="${esc(pl.typeOther)}" /></label><label>Objetivo<textarea name="objective" rows="4">${esc(pl.objective)}</textarea></label><div class="mini-grid"><label>Fecha de inicio<input name="startDate" type="date" value="${esc(pl.startDate)}" /></label><label>Duracion estimada<input name="duration" value="${esc(pl.duration)}" /></label></div><label>Estado<select name="status">${[["draft", "Borrador"], ["published", "Publicado"], ["archived", "Archivado"], ["activo", "Activo anterior"], ["borrador", "Borrador anterior"]].map(([value, label]) => `<option value="${value}" ${pl.status === value ? "selected" : ""}>${label}</option>`).join("")}</select></label><label>Proximo control<input name="nextControl" type="date" value="${esc(pl.nextControl)}" /></label><label>Observaciones generales<textarea name="generalNotes" rows="4">${esc(pl.generalNotes || "")}</textarea></label>`,
    ingredients: `${libraryManager("foods", "Biblioteca de alimentos", db.foods, "Nuevo alimento")}`,
    supplements: `${libraryManager("supplements", "Biblioteca de suplementos", db.supplements, "Nuevo suplemento")}`,
    message: `<label>Mensaje visible para el tutor<textarea name="message" rows="10">${esc(pl.message)}</textarea></label>`,
  }[state.sheet];
  return `<form class="sheet-form" data-save-section>${html}<div class="form-actions"><button class="primary-button">Guardar</button></div></form>`;
}

function patientProfileForm() {
  const p = patient();
  const measurementsText = (p.measurements || []).map((m) => [m.label, m.value, m.unit, m.date].filter(Boolean).join(" | ")).join("\n");
  const photos = (p.photos || []).map((name) => `<span class="library-chip">${esc(name)}</span>`).join("") || "<p class='muted'>Sin fotos cargadas.</p>";
  return `<form class="sheet-form" data-save-section><div class="form-grid single-column"><section class="form-section"><h3>Ficha del paciente</h3><label>Nombre del paciente<input name="name" value="${esc(p.name)}" required /></label><label>Especie<input name="species" value="${esc(p.species)}" required placeholder="Ej: canino, felino, ave, reptil, equino..." /></label><label>Raza o tipo<input name="breed" value="${esc(p.breed || "")}" /></label><div class="mini-grid"><label>Edad<input name="age" value="${esc(p.age || "")}" /></label><label>Sexo<select name="sex"><option value="">Seleccionar</option>${["Macho", "Hembra", "No aplica"].map((x) => `<option ${p.sex === x ? "selected" : ""}>${x}</option>`).join("")}</select></label></div><label>Estado reproductivo<select name="neuteredStatus">${["", "Castrado", "No castrado", "No aplica"].map((x) => `<option value="${x}" ${p.neuteredStatus === x ? "selected" : ""}>${x || "Seleccionar"}</option>`).join("")}</select></label><div class="mini-grid"><label>Peso actual<input name="weight" value="${esc(p.weight || "")}" /></label><label>Condicion corporal<input name="bodyCondition" value="${esc(p.bodyCondition || "")}" /></label></div><label>Alimentacion actual<textarea name="currentFood" rows="3">${esc(p.currentFood || "")}</textarea></label></section><section class="form-section"><h3>Medidas y fotos</h3><label>Medidas configurables<textarea name="measurements" rows="5" placeholder="Torax | 42 | cm | 2026-06-15&#10;Cintura | 36 | cm">${esc(measurementsText)}</textarea></label><label>Fotos del paciente<input name="photos" type="file" multiple accept="image/*,.pdf,.doc,.docx" /></label><div class="library-chip-list">${photos}</div></section><section class="form-section"><h3>Observaciones</h3><label>Observaciones clinicas visibles<textarea name="visibleClinicalNotes" rows="4">${esc(p.visibleClinicalNotes || p.allergies || "")}</textarea></label><label>Observaciones internas<textarea name="internalClinicalNotes" rows="4">${esc(p.internalClinicalNotes || p.medication || "")}</textarea></label></section></div><div class="form-actions"><button class="primary-button">Guardar ficha</button></div></form>`;
}

function adviceForm(pl) {
  const advice = planAdvice(pl);
  return `<form class="sheet-form" data-save-section><p class="muted">Activa, edita o desactiva los consejos que van a ver el tutor y el PDF.</p>${advice.map((item, index) => `<fieldset class="inline-editor"><label class="check-line"><input name="adviceEnabled:${item.id}" type="checkbox" ${item.enabled ? "checked" : ""} /> Mostrar consejo ${index + 1}</label><textarea name="adviceText:${item.id}" rows="3">${esc(item.text)}</textarea></fieldset>`).join("")}<label>Agregar consejo nuevo<textarea name="newAdvice" rows="3"></textarea></label><div class="form-actions"><button class="primary-button">Guardar consejos</button></div></form>`;
}

function selectedItemsForm(pl) {
  const items = pl.selectedItems || [];
  return `<div class="module-editor"><form class="sheet-form app-form-card" data-save-section><h3>Agregar alimento, suplemento o superalimento</h3><label>Seleccionar desde biblioteca<select name="itemRef">${planItemOptions()}</select></label><div class="mini-grid"><label>Cantidad manual<input name="quantity" /></label><label>Unidad<select name="unit" data-other-toggle="selectedItemUnit">${units.map((u) => `<option>${u}</option>`).join("")}</select></label></div><label class="is-hidden" data-other-field="selectedItemUnit">Unidad personalizada<input name="customUnit" /></label><label>Frecuencia<input name="frequency" placeholder="Ej: diario, 3 veces por semana, alternar..." /></label><label>Forma de preparacion / coccion<textarea name="preparationNotes" rows="3"></textarea></label><label>Uso<select name="itemStatus"><option>Obligatorio</option><option>Opcional</option><option>Reemplazable</option></select></label><label>Nota visible para tutor<textarea name="tutorNotes" rows="3"></textarea></label><label>Nota interna<textarea name="internalNotes" rows="3"></textarea></label><label>Orden de aparicion<input name="sortOrder" type="number" /></label><div class="form-actions"><button class="primary-button">Agregar al plan</button></div></form><section class="sheet-list module-list">${items.length ? items.slice().sort(sortByOrder).map((item) => selectedItemRow(item)).join("") : empty("Todavia no hay alimentos ni suplementos seleccionados.", "Agrega items desde la biblioteca para este plan.")}</section></div>`;
}

function dailyRationForm(pl) {
  const ration = pl.dailyRation || {};
  const meals = ration.meals?.length ? ration.meals : [{ mealName: "Mañana" }, { mealName: "Tarde/noche" }];
  return `<form class="sheet-form" data-save-section><div class="mini-grid"><label>Racion diaria total<input name="dailyTotalQuantity" value="${esc(ration.totalQuantity || "")}" /></label><label>Unidad<select name="dailyTotalUnit">${units.map((u) => `<option ${ration.totalUnit === u ? "selected" : ""}>${u}</option>`).join("")}</select></label></div><label>Cantidad de comidas por dia<input name="mealsPerDay" value="${esc(ration.mealsPerDay || "")}" /></label><section class="ration-meal-grid">${[0, 1, 2, 3].map((i) => dailyMealFields(meals[i] || {}, i)).join("")}</section><label>Aclaraciones<textarea name="dailyRationNotes" rows="4">${esc(ration.notes || "")}</textarea></label><div class="form-actions"><button class="primary-button">Guardar racion diaria</button></div></form>`;
}

function dailyMealFields(meal, index) {
  return `<fieldset class="inline-editor"><legend>Comida ${index + 1}</legend><label>Nombre<input name="dailyMealName:${index}" value="${esc(meal.mealName || "")}" placeholder="Mañana, tarde/noche, snack..." /></label><div class="mini-grid"><label>Cantidad<input name="dailyMealQuantity:${index}" value="${esc(meal.totalQuantity || "")}" /></label><label>Unidad<select name="dailyMealUnit:${index}">${units.map((u) => `<option ${meal.unit === u ? "selected" : ""}>${u}</option>`).join("")}</select></label></div><label>Distribucion / composicion<textarea name="dailyMealNotes:${index}" rows="3">${esc(meal.notes || "")}</textarea></label></fieldset>`;
}

function transitionForm(pl) {
  const steps = pl.transitionSteps || [];
  return `<div class="module-editor"><form class="sheet-form app-form-card" data-save-section><h3>Agregar paso de transicion</h3><label>Columna / rango<input name="transitionLabel" placeholder="Dia 1-2, Dia 3-4, Semana 1..." /></label><div class="mini-grid"><label>Dia desde<input name="startDay" type="number" min="1" /></label><label>Dia hasta<input name="endDay" type="number" min="1" /></label></div><label>Mañana<textarea name="transitionMorning" rows="3" placeholder="Alimentos, suplementos, cantidades y notas."></textarea></label><label>Tarde/noche<textarea name="transitionEvening" rows="3"></textarea></label><label>Snack / otra comida<textarea name="transitionSnack" rows="3"></textarea></label><label>Notas del paso<textarea name="transitionNotes" rows="3"></textarea></label><div class="form-actions"><button class="primary-button">Agregar paso</button></div></form><section class="sheet-list module-list">${steps.length ? steps.slice().sort(sortByOrder).map((step) => `<article class="sheet-list-item"><span><strong>${esc(step.label)}</strong><small>Dia ${esc(step.startDay || "")} a ${esc(step.endDay || "")}</small><p>${esc([step.meals?.morning, step.meals?.evening, step.meals?.snack].filter(Boolean).join(" / "))}</p></span><button class="ghost-button compact danger-text" data-delete-transition="${step.id}">Eliminar</button></article>`).join("") : empty("Todavia no hay transicion cargada.", "Crea columnas por dia o rango de dias.")}</section></div>`;
}

function supplementationForm(pl) {
  const list = pl.supplementSchedules || [];
  return `<div class="module-editor"><form class="sheet-form app-form-card" data-save-section><h3>Agregar suplemento / superalimento</h3><label>Seleccionar<select name="supplementRef">${supplementPlanOptions()}</select></label><div class="mini-grid"><label>Dosis<input name="doseQuantity" /></label><label>Unidad<select name="doseUnit">${units.map((u) => `<option>${u}</option>`).join("")}</select></label></div><label>Frecuencia<input name="frequencyText" placeholder="Ej: diario, dia por medio, 3 veces por semana..." /></label><label>Momento del dia<select name="timeOfDay"><option>Indistinto</option><option>Mañana</option><option>Tarde</option><option>Noche</option></select></label><fieldset class="day-picker"><legend>Dias de la semana</legend>${days.map((day, i) => `<label><input type="checkbox" name="supplementDays" value="${day}" /> ${shortDays[i]}</label>`).join("")}</fieldset><label>Indicaciones para tutor<textarea name="tutorNotes" rows="3"></textarea></label><label>Observaciones internas<textarea name="internalNotes" rows="3"></textarea></label><div class="form-actions"><button class="primary-button">Agregar suplemento</button></div></form><section>${list.length ? supplementMatrix(list) : empty("Sin suplementacion cargada.", "Agrega suplementos con dosis manual y dias de la semana.")}</section></div>`;
}

function weeklyExamplesForm(pl) {
  const weeks = pl.weeklyExamples || [];
  return `<div class="module-editor"><form class="sheet-form app-form-card" data-save-section><h3>Agregar semana / ejemplo de racion</h3><div class="mini-grid"><label>Semana numero<input name="weekNumber" type="number" min="1" /></label><label>Titulo<input name="weekTitle" placeholder="Semana 1, Etapa digestiva..." /></label></div><label>Objetivo o aclaracion<textarea name="weekObjective" rows="3"></textarea></label><label>Comidas del dia<textarea name="weekMeals" rows="5" placeholder="Mañana: ...&#10;Tarde/noche: ..."></textarea></label><label>Suplementos asociados<textarea name="weekSupplements" rows="3"></textarea></label><label>Observaciones<textarea name="weekNotes" rows="3"></textarea></label><div class="form-actions"><button class="primary-button">Agregar semana</button></div></form><section class="sheet-list module-list">${weeks.length ? weeks.slice().sort((a, b) => Number(a.weekNumber || 0) - Number(b.weekNumber || 0)).map((w) => `<article class="sheet-list-item"><span><strong>${esc(w.title || `Semana ${w.weekNumber || ""}`)}</strong><small>${esc(w.objective || "")}</small><p>${esc(w.mealsText || "")}</p></span><button class="ghost-button compact danger-text" data-delete-week="${w.id}">Eliminar</button></article>`).join("") : empty("Todavia no hay semanas cargadas.", "Crea semanas manuales para reutilizar en tutor y PDF.")}</section></div>`;
}

function tutorTrackingPanel(pl) {
  const reports = db.tutorReports.filter((r) => r.patientId === pl.patientId);
  return `<section class="sheet-list">${reports.length ? reports.map((r) => `<article class="sheet-list-item"><span><strong>${formatDate(r.date)}</strong><small>${esc(r.ate)} · ${esc(r.stool)} · ${esc(r.energy)}</small><p>${esc(r.observations || "")}</p></span></article>`).join("") : empty("Todavia no hay reportes del tutor.", "Cuando el tutor cargue seguimiento, aparecera aca.")}</section>`;
}

function exportHub(pl) {
  return `<div class="preview-panel"><div class="fixed-patient-box"><span>Estado del plan</span><strong>${esc(pl.title)}</strong><small>${esc(pl.status || "draft")} · ${pl.published ? "Publicado al tutor" : "No publicado"}</small></div><div class="preview-actions"><button class="primary-button" data-publish-plan>Publicar plan al tutor</button><button class="ghost-button" data-export-pdf>Exportar PDF</button><button class="ghost-button" data-export-excel>Exportar Excel</button></div><p class="muted">La exportacion toma los mismos datos estructurados del plan. La vista tutor y el PDF completo se terminan en la segunda etapa.</p></div>`;
}

function stageForm(stage = null) {
  const s = stage || {};
  return `<form class="sheet-form" data-save-stage>${s.id ? `<input type="hidden" name="stageId" value="${s.id}" />` : ""}<label>Nombre de etapa<input name="name" value="${esc(s.name)}" required /></label><div class="mini-grid"><label>Fecha desde<input name="dayFrom" type="date" value="${esc(s.dayFrom)}" /></label><label>Fecha hasta<input name="dayTo" type="date" value="${esc(s.dayTo)}" /></label></div><label>Objetivo<textarea name="objective" rows="3">${esc(s.objective)}</textarea></label><label>Comidas por dia<input name="mealsPerDay" value="${esc(s.mealsPerDay)}" /></label>${mealEditor("morning", "Mañana", s)}${mealEditor("afternoon", "Tarde", s)}${mealEditor("night", "Noche", s)}<label>Indicaciones<textarea name="instructions" rows="4">${esc(s.instructions)}</textarea></label><label>Estado de la etapa<select name="status">${["pendiente", "activa", "completada", "suspendida"].map((x) => `<option ${s.status === x ? "selected" : ""}>${x}</option>`).join("")}</select></label>${multiSelect("forbidden", [...db.foods, "Otro"], s.forbidden || [], "Alimentos prohibidos", "forbiddenOther")}<label class="is-hidden" data-other-field="forbiddenOther">Otro alimento prohibido<input name="forbiddenOther" /></label>${stageSupplementSchedule(s)}<label>Observaciones para el tutor<textarea name="tutorNotes" rows="3">${esc(s.tutorNotes)}</textarea></label><label>Preparacion / observaciones de cocina<textarea name="prep" rows="3">${esc(s.prep)}</textarea></label><label>Proximo control<input name="nextControl" type="date" value="${esc(s.nextControl)}" /></label><div class="form-actions"><button class="primary-button">Guardar etapa</button></div></form>`;
}

function tutorView() {
  if (state.view === "tutor-docs") return `<div class="content-grid"><section class="panel wide document-upload-panel"><div class="section-heading"><div><span class="eyebrow">Paso previo al turno</span><h2>Documentacion para primera consulta</h2></div></div><form class="upload-dropzone" data-docs><h3>Subir archivos</h3><input name="files" type="file" multiple required /><button class="primary-button">Guardar documentacion</button></form></section><section class="panel">${db.docs.map((d) => `<p class="file-line">${d.name}</p>`).join("") || empty("Sin documentacion", "Carga al menos un archivo.")}</section></div>`;
  if (state.view === "tutor-urgent") return `<section class="panel wide urgent-form-panel"><form class="urgent-form" data-urgent><label>Motivo<textarea name="reason" rows="5" required></textarea></label><label>Nivel<select name="severity"><option>Alta</option><option>Media</option><option>Baja</option></select></label><button class="primary-button">Enviar alerta</button></form></section>`;
  if (state.view === "tutor-calendar") return db.docs.length ? panel("Turnos", empty("Turno comun habilitado", "La solicitud se conecta con la agenda interna.")) : locked();
  if (state.view === "tutor-report") return tutorPatient() ? tutorReportView() : locked();
  if (state.view === "tutor-reminders") return tutorPatient() ? tutorRemindersView() : locked();
  if (state.view === "tutor-pet") return tutorPatient() ? tutorHomeView() : locked();
  if (state.view === "tutor-plan") return tutorPatient() ? tutorFullPlanView() : locked();
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
  $("[data-save-reminder]")?.addEventListener("submit", saveReminder);
  $("[data-tutor-report]")?.addEventListener("submit", saveTutorReport);
  document.querySelectorAll("[data-delete-stage]").forEach((b) => b.addEventListener("click", () => { db.stages = db.stages.filter((s) => s.id !== b.dataset.deleteStage); save(); render(); }));
  document.querySelectorAll("[data-stage-active]").forEach((b) => b.addEventListener("click", () => setManualActiveStage(b.dataset.stageActive)));
  document.querySelectorAll("[data-history-open]").forEach((b) => b.addEventListener("click", () => { state.sheet = "history"; render(); }));
  document.querySelectorAll("[data-report-detail]").forEach((b) => b.addEventListener("click", () => { state.activeReportId = b.dataset.reportDetail; state.sheet = "reportDetail"; render(); }));
  document.querySelectorAll("[data-reminder-list]").forEach((b) => b.addEventListener("click", () => { state.sheet = "reminderList"; render(); }));
  $("[data-delete-patient]")?.addEventListener("click", deletePatient);
  $("[data-delete-plan]")?.addEventListener("click", deletePlan);
  $("[data-publish-plan]")?.addEventListener("click", publishPlan);
  document.querySelectorAll("[data-export-excel]").forEach((b) => b.addEventListener("click", exportPlanExcel));
  document.querySelectorAll("[data-alert-status]").forEach((b) => b.addEventListener("click", () => updateAlertStatus(b.dataset.alertStatus, b.dataset.status)));
  document.querySelectorAll("[data-reminder-status]").forEach((b) => b.addEventListener("click", () => updateReminderStatus(b.dataset.reminderStatus, b.dataset.status)));
  document.querySelectorAll("[data-reminder-send]").forEach((b) => b.addEventListener("click", () => sendReminder(b.dataset.reminderSend)));
  document.querySelectorAll("[data-reminder-delete]").forEach((b) => b.addEventListener("click", () => deleteReminder(b.dataset.reminderDelete)));
  document.querySelectorAll("[data-delete-plan-item]").forEach((b) => b.addEventListener("click", () => deletePlanNestedItem("selectedItems", b.dataset.deletePlanItem)));
  document.querySelectorAll("[data-delete-transition]").forEach((b) => b.addEventListener("click", () => deletePlanNestedItem("transitionSteps", b.dataset.deleteTransition)));
  document.querySelectorAll("[data-delete-supplement-schedule]").forEach((b) => b.addEventListener("click", () => deletePlanNestedItem("supplementSchedules", b.dataset.deleteSupplementSchedule)));
  document.querySelectorAll("[data-delete-week]").forEach((b) => b.addEventListener("click", () => deletePlanNestedItem("weeklyExamples", b.dataset.deleteWeek)));
  document.querySelectorAll("[data-delete-library]").forEach((b) => b.addEventListener("click", () => deleteLibraryItem(b.dataset.deleteLibrary, b.dataset.value)));
  document.querySelectorAll("[data-export-pdf]").forEach((b) => b.addEventListener("click", exportPlanPdf));
  $("[data-access]")?.addEventListener("click", () => { patient().tutorAccess = !patient().tutorAccess; save(); render(); });
  $("[data-docs]")?.addEventListener("submit", saveDocs);
  $("[data-urgent]")?.addEventListener("submit", saveUrgent);
  document.querySelectorAll("[data-other-toggle]").forEach((select) => {
    const update = () => {
      const field = document.querySelector(`[data-other-field="${select.dataset.otherToggle}"]`);
      field?.classList.toggle("is-hidden", !Array.from(select.selectedOptions || []).some((option) => option.value === "Otro" || option.value.toLowerCase() === "otro" || option.value.startsWith("Otro ")));
    };
    select.addEventListener("change", update);
    update();
  });
  document.querySelectorAll("[data-meal-select]").forEach((select) => {
    const update = () => {
      const values = Array.from(select.selectedOptions || []).map((option) => option.value);
      document.querySelector(`[data-other-field="${select.dataset.mealSelect}Food"]`)?.classList.toggle("is-hidden", !values.includes("other-food"));
      document.querySelector(`[data-other-field="${select.dataset.mealSelect}Supplement"]`)?.classList.toggle("is-hidden", !values.includes("other-supplement"));
      updateStageScheduleDom();
    };
    select.addEventListener("change", update);
    update();
  });
  document.querySelectorAll('[data-other-field$="Supplement"] input').forEach((input) => input.addEventListener("input", updateStageScheduleDom));
}

function savePatient(e) { e.preventDefault(); const d = new FormData(e.currentTarget); if (!text(d, "name") || !text(d, "species") || !text(d, "tutor") || (!text(d, "dni") && !text(d, "email"))) return alert("Completa paciente, especie, tutor y DNI o email."); const p = { id: id(), tutorId: text(d, "dni") || text(d, "email"), name: text(d, "name"), species: text(d, "species"), breed: text(d, "breed"), age: text(d, "age"), sex: text(d, "sex"), neuteredStatus: text(d, "neuteredStatus"), weight: text(d, "weight"), targetWeight: text(d, "targetWeight"), bodyCondition: text(d, "bodyCondition"), currentFood: text(d, "currentFood"), visibleClinicalNotes: text(d, "visibleClinicalNotes"), internalClinicalNotes: text(d, "internalClinicalNotes"), allergies: text(d, "visibleClinicalNotes"), medication: text(d, "internalClinicalNotes"), tutor: text(d, "tutor"), dni: text(d, "dni"), email: text(d, "email"), tutorAccess: d.get("tutorAccess") === "on", status: "Pendiente plan", measurements: [], photos: [], createdAt: nowIso(), updatedAt: nowIso() }; db.patients.unshift(p); state.patientId = p.id; state.sheet = ""; addHistory(p.id, "patient", p.id, "Paciente creado", `Se creo el legajo de ${p.name}.`, "profesional", false); save(); render(); }
function savePlan(e) { e.preventDefault(); const d = new FormData(e.currentTarget); const type = text(d, "type"); const item = ensureDietPlanShape({ id: id(), model: "diet_plan", patientId: patient().id, tutorId: patient().tutorId, title: text(d, "title"), type, typeOther: type === "Otro" ? text(d, "typeOther") : "", objective: text(d, "objective"), startDate: text(d, "startDate"), duration: text(d, "duration"), status: text(d, "status") || "draft", nextControl: text(d, "nextControl"), generalNotes: text(d, "generalNotes"), createdAt: nowIso(), updatedAt: nowIso(), published: text(d, "status") === "published" }); db.dietPlans.unshift(item); db.plans = db.dietPlans; addHistory(patient().id, "diet_plan", item.id, "Plan alimentario creado", item.title, "profesional", false); if (item.nextControl) createReminder(patient().id, "control", "Proximo control nutricional", item.objective || item.title, item.nextControl, true, "plan", item.id); state.sheet = ""; save(); render(); }
function saveSection(e) {
  e.preventDefault();
  const d = new FormData(e.currentTarget), p = plan();
  if (!p && state.sheet !== "patientProfile") return;
  if (state.sheet === "patientProfile") savePatientProfileSection(d);
  if (state.sheet === "general") { const type = text(d, "type"); Object.assign(p, { title: text(d, "title"), type, typeOther: type === "Otro" ? text(d, "typeOther") : "", objective: text(d, "objective"), startDate: text(d, "startDate"), duration: text(d, "duration"), status: text(d, "status"), nextControl: text(d, "nextControl"), generalNotes: text(d, "generalNotes"), updatedAt: nowIso() }); addHistory(p.patientId, "diet_plan", p.id, "Plan alimentario modificado", p.title, "profesional", false); if (p.nextControl) createReminder(p.patientId, "control", "Proximo control nutricional", p.objective || p.title, p.nextControl, true, "plan", p.id); }
  if (state.sheet === "advice") saveAdviceSection(d, p);
  if (state.sheet === "selectedItems") saveSelectedItemSection(d, p);
  if (state.sheet === "dailyRation") saveDailyRationSection(d, p);
  if (state.sheet === "transition") saveTransitionSection(d, p);
  if (state.sheet === "supplementation") saveSupplementationSection(d, p);
  if (state.sheet === "weeklyExamples") saveWeeklyExampleSection(d, p);
  if (state.sheet === "internalNotes") { p.internalNotes = text(d, "internalNotes"); p.updatedAt = nowIso(); addHistory(p.patientId, "diet_plan", p.id, "Notas internas actualizadas", p.title, "profesional", false); }
  if (state.sheet === "ingredients") { const next = text(d, "newLibraryItem"); if (next) db.foods = unique([...db.foods, next]); }
  if (state.sheet === "prep") { const s = db.stages.find((item) => item.id === text(d, "stageId")); if (s) s.prep = text(d, "prep"); }
  if (state.sheet === "supplements") { const next = text(d, "newLibraryItem"); p.supplements = optionList(d, "add", "items", "supplementOther"); if (d.get("saveReusable") === "on" || next) db.supplements = unique([...db.supplements, ...p.supplements, next]); p.supplementSchedule = scheduleFromForm(d, p.supplements); }
  if (state.sheet === "message") { p.message = text(d, "message"); addHistory(p.patientId, "nutrition_plan", p.id, "Mensaje al tutor actualizado", "Se actualizo el mensaje visible del plan.", "profesional", true); }
  state.sheet = "";
  save();
  render();
}

function savePatientProfileSection(d) {
  const p = patient();
  if (!p) return;
  Object.assign(p, {
    name: text(d, "name"),
    species: text(d, "species"),
    breed: text(d, "breed"),
    age: text(d, "age"),
    sex: text(d, "sex"),
    neuteredStatus: text(d, "neuteredStatus"),
    weight: text(d, "weight"),
    bodyCondition: text(d, "bodyCondition"),
    currentFood: text(d, "currentFood"),
    visibleClinicalNotes: text(d, "visibleClinicalNotes"),
    internalClinicalNotes: text(d, "internalClinicalNotes"),
    measurements: parseLines(text(d, "measurements")).map((line) => {
      const [label, value, unit, date] = line.split("|").map((part) => part.trim());
      return { id: id(), label, value, unit, date };
    }).filter((m) => m.label),
    photos: unique([...(p.photos || []), ...Array.from(document.querySelector('input[name="photos"]')?.files || []).map((f) => f.name)]),
    updatedAt: nowIso()
  });
  addHistory(p.id, "patient", p.id, "Ficha del paciente actualizada", p.name, "profesional", false);
}

function saveAdviceSection(d, pl) {
  const existing = planAdvice(pl).map((item) => ({ id: item.id, text: text(d, `adviceText:${item.id}`) || item.text, enabled: d.get(`adviceEnabled:${item.id}`) === "on" })).filter((item) => item.text);
  const next = text(d, "newAdvice");
  pl.generalAdvice = next ? [...existing, { id: id(), text: next, enabled: true }] : existing;
  pl.updatedAt = nowIso();
  addHistory(pl.patientId, "diet_plan", pl.id, "Consejos generales actualizados", pl.title, "profesional", true);
}

function saveSelectedItemSection(d, pl) {
  const ref = text(d, "itemRef");
  if (!ref) return;
  const item = itemFromRef(ref);
  if (!item.name) return;
  const unit = text(d, "unit") === "otro" ? text(d, "customUnit") : text(d, "unit");
  pl.selectedItems = [...(pl.selectedItems || []), { id: id(), itemType: item.type, itemName: item.name, category: item.category, quantity: text(d, "quantity"), unit, frequency: text(d, "frequency"), preparationNotes: text(d, "preparationNotes"), tutorNotes: text(d, "tutorNotes"), internalNotes: text(d, "internalNotes"), status: text(d, "itemStatus"), sortOrder: Number(text(d, "sortOrder") || (pl.selectedItems || []).length + 1), createdAt: nowIso() }];
  pl.updatedAt = nowIso();
  addHistory(pl.patientId, "diet_plan_item", pl.id, "Item agregado al plan", item.name, "profesional", true);
}

function saveDailyRationSection(d, pl) {
  const meals = [0, 1, 2, 3].map((index) => ({ id: id(), mealName: text(d, `dailyMealName:${index}`), totalQuantity: text(d, `dailyMealQuantity:${index}`), unit: text(d, `dailyMealUnit:${index}`), notes: text(d, `dailyMealNotes:${index}`), sortOrder: index + 1 })).filter((meal) => meal.mealName || meal.totalQuantity || meal.notes);
  pl.dailyRation = { totalQuantity: text(d, "dailyTotalQuantity"), totalUnit: text(d, "dailyTotalUnit"), mealsPerDay: text(d, "mealsPerDay"), notes: text(d, "dailyRationNotes"), meals };
  pl.updatedAt = nowIso();
  addHistory(pl.patientId, "daily_ration", pl.id, "Racion diaria actualizada", `${pl.dailyRation.totalQuantity || ""} ${pl.dailyRation.totalUnit || ""}`.trim(), "profesional", true);
}

function saveTransitionSection(d, pl) {
  if (!text(d, "transitionLabel") && !text(d, "transitionMorning") && !text(d, "transitionEvening") && !text(d, "transitionSnack")) return;
  pl.transitionSteps = [...(pl.transitionSteps || []), { id: id(), label: text(d, "transitionLabel") || `Paso ${(pl.transitionSteps || []).length + 1}`, startDay: text(d, "startDay"), endDay: text(d, "endDay"), sortOrder: (pl.transitionSteps || []).length + 1, meals: { morning: text(d, "transitionMorning"), evening: text(d, "transitionEvening"), snack: text(d, "transitionSnack") }, notes: text(d, "transitionNotes"), createdAt: nowIso() }];
  pl.updatedAt = nowIso();
  addHistory(pl.patientId, "transition_step", pl.id, "Paso de transicion agregado", pl.transitionSteps.at(-1).label, "profesional", true);
}

function saveSupplementationSection(d, pl) {
  const ref = text(d, "supplementRef");
  if (!ref) return;
  const item = itemFromRef(ref);
  if (!item.name) return;
  pl.supplementSchedules = [...(pl.supplementSchedules || []), { id: id(), itemType: item.type, supplementName: item.name, category: item.category, doseQuantity: text(d, "doseQuantity"), doseUnit: text(d, "doseUnit"), frequencyText: text(d, "frequencyText"), days: d.getAll("supplementDays"), timeOfDay: text(d, "timeOfDay"), tutorNotes: text(d, "tutorNotes"), internalNotes: text(d, "internalNotes"), createdAt: nowIso() }];
  pl.updatedAt = nowIso();
  addHistory(pl.patientId, "supplement_schedule", pl.id, "Suplementacion actualizada", item.name, "profesional", true);
}

function saveWeeklyExampleSection(d, pl) {
  if (!text(d, "weekTitle") && !text(d, "weekMeals")) return;
  pl.weeklyExamples = [...(pl.weeklyExamples || []), { id: id(), weekNumber: text(d, "weekNumber") || String((pl.weeklyExamples || []).length + 1), title: text(d, "weekTitle"), objective: text(d, "weekObjective"), mealsText: text(d, "weekMeals"), supplementsText: text(d, "weekSupplements"), notes: text(d, "weekNotes"), sortOrder: (pl.weeklyExamples || []).length + 1, createdAt: nowIso() }];
  pl.updatedAt = nowIso();
  addHistory(pl.patientId, "weekly_ration", pl.id, "Semana agregada al plan", text(d, "weekTitle") || `Semana ${text(d, "weekNumber")}`, "profesional", true);
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
  addHistory(patient().id, "nutrition_plan_stage", item.id, stageId ? "Etapa modificada" : "Etapa creada", item.name, "profesional", false);
  if (item.status === "activa") addHistory(patient().id, "nutrition_plan_stage", item.id, "Etapa activada", item.name, "profesional", true);
  if (item.nextControl) createReminder(patient().id, "control", "Control de etapa", item.name, item.nextControl, true, "plan", plan().id);
  state.editingStageId = "";
  state.sheet = "stages";
  save();
  render();
}
function saveDocs(e) { e.preventDefault(); db.docs.push(...Array.from(e.currentTarget.files.files || []).map((f) => ({ id: id(), name: f.name, createdAt: nowIso() }))); save(); state.view = "tutor-calendar"; render(); }
function saveUrgent(e) { e.preventDefault(); const d = new FormData(e.currentTarget); const p = tutorPatient(); const alertItem = createAlert(p?.id || "", p?.tutorId || "", "manual", "", "Urgencia", text(d, "severity").toLowerCase(), text(d, "reason")); if (p) addHistory(p.id, "alert", alertItem.id, "Alerta de urgencia enviada", alertItem.description, "tutor", false); save(); alert("La alerta fue enviada."); render(); }
function saveReminder(e) {
  e.preventDefault();
  const d = new FormData(e.currentTarget);
  const item = createReminder(patient().id, text(d, "type"), text(d, "title"), text(d, "description"), text(d, "date"), d.get("visible") === "on", "manual", plan()?.id);
  if (item) addHistory(patient().id, "reminder", item.id, "Recordatorio creado", item.title, "profesional", item.visibleForTutor);
  state.sheet = "reminderList";
  save();
  render();
}
function saveTutorReport(e) {
  e.preventDefault();
  const d = new FormData(e.currentTarget), p = tutorPatient();
  if (!p) return;
  const item = { id: id(), patientId: p.id, tutorId: p.tutorId, date: text(d, "date") || todayIso(), ate: text(d, "ate"), ration: text(d, "ration"), rejected: text(d, "rejected"), vomit: text(d, "vomit"), diarrhea: text(d, "diarrhea"), stool: text(d, "stool"), energy: text(d, "energy"), observations: text(d, "observations"), photos: Array.from(e.currentTarget.querySelector('input[name="photos"]')?.files || []).map((f) => f.name), createdAt: nowIso() };
  db.tutorReports.unshift(item);
  addHistory(p.id, "tutor_report", item.id, "Reporte diario cargado", `Reporte del ${formatDate(item.date)}.`, "tutor", true);
  tutorReportAlerts(item, p).forEach((alertItem) => addHistory(p.id, "alert", alertItem.id, "Alerta generada", alertItem.description, "sistema", false));
  save();
  state.view = "tutor-pet";
  render();
}

function deletePatient() {
  const p = patient();
  if (!p || !confirm(`Eliminar a ${p.name} y toda su informacion vinculada?`)) return;
  const patientIds = new Set([p.id]);
  const planIds = new Set(db.dietPlans.filter((pl) => patientIds.has(pl.patientId)).map((pl) => pl.id));
  db.patients = db.patients.filter((item) => !patientIds.has(item.id));
  db.dietPlans = db.dietPlans.filter((item) => !patientIds.has(item.patientId));
  db.plans = db.dietPlans;
  db.stages = db.stages.filter((item) => !patientIds.has(item.patientId) && !planIds.has(item.planId));
  db.alerts = db.alerts.filter((item) => !patientIds.has(item.patientId));
  db.tutorReports = db.tutorReports.filter((item) => !patientIds.has(item.patientId));
  db.history = db.history.filter((item) => !patientIds.has(item.patientId));
  db.reminders = db.reminders.filter((item) => !patientIds.has(item.patientId));
  state.patientId = db.patients[0]?.id || "";
  state.sheet = "";
  save();
  render();
}
function deletePlan() {
  const pl = plan();
  if (!pl || !confirm(`Eliminar el plan "${pl.title}"?`)) return;
  db.dietPlans = db.dietPlans.filter((item) => item.id !== pl.id);
  db.plans = db.dietPlans;
  db.stages = db.stages.filter((item) => item.planId !== pl.id);
  db.reminders = db.reminders.filter((item) => item.nutritionPlanId !== pl.id);
  addHistory(pl.patientId, "nutrition_plan", pl.id, "Plan alimentario eliminado", pl.title, "profesional", false);
  state.sheet = "";
  save();
  render();
}
function publishPlan() {
  const pl = plan(), p = patient();
  if (!pl || !p) return;
  pl.published = true;
  pl.status = "published";
  pl.publishedAt = nowIso();
  p.tutorAccess = true;
  addHistory(p.id, "diet_plan", pl.id, "Plan alimentario publicado al tutor", pl.title, "profesional", true);
  save();
  alert("Plan publicado para el tutor.");
  render();
}
function setManualActiveStage(stageId) {
  const s = db.stages.find((item) => item.id === stageId);
  if (!s) return;
  db.stages = db.stages.map((item) => item.planId === s.planId ? { ...item, status: item.id === stageId ? "activa" : item.status === "activa" ? "pendiente" : item.status } : item);
  addHistory(s.patientId, "nutrition_plan_stage", s.id, "Etapa activada manualmente", s.name, "profesional", true);
  save();
  render();
}
function updateAlertStatus(alertId, status) {
  const a = db.alerts.find((item) => item.id === alertId);
  if (!a) return;
  a.status = status;
  if (status === "resuelta") addHistory(a.patientId, "alert", a.id, "Alerta resuelta", a.description, "profesional", false);
  save();
  render();
}
function updateReminderStatus(reminderId, status) {
  const r = db.reminders.find((item) => item.id === reminderId);
  if (!r) return;
  r.status = status;
  addHistory(r.patientId, "reminder", r.id, `Recordatorio ${status}`, r.title, "profesional", r.visibleForTutor);
  save();
  render();
}
function sendReminder(reminderId) {
  const r = db.reminders.find((item) => item.id === reminderId);
  if (!r) return;
  r.visibleForTutor = true;
  addHistory(r.patientId, "reminder", r.id, "Recordatorio enviado al tutor", r.title, "profesional", true);
  save();
  render();
}
function deleteReminder(reminderId) {
  const r = db.reminders.find((item) => item.id === reminderId);
  if (!r || !confirm(`Eliminar el recordatorio "${r.title}"?`)) return;
  db.reminders = db.reminders.filter((item) => item.id !== reminderId);
  addHistory(r.patientId, "reminder", r.id, "Recordatorio eliminado", r.title, "profesional", false);
  save();
  render();
}
function deletePlanNestedItem(collection, itemId) {
  const pl = plan();
  if (!pl || !itemId) return;
  pl[collection] = (pl[collection] || []).filter((item) => item.id !== itemId);
  pl.updatedAt = nowIso();
  addHistory(pl.patientId, "diet_plan", pl.id, "Dato eliminado del plan", collection, "profesional", false);
  save();
  render();
}

function syncDietPlans() {
  const source = [...(db.dietPlans || []), ...(db.plans || [])];
  const seen = new Set();
  db.dietPlans = source.filter((pl) => {
    if (!pl?.id || seen.has(pl.id)) return false;
    seen.add(pl.id);
    return true;
  }).map(ensureDietPlanShape);
  db.plans = db.dietPlans;
}
function ensureDietPlanShape(pl = {}) {
  const selectedItems = Array.isArray(pl.selectedItems) ? pl.selectedItems : [
    ...(pl.ingredients || []).map((name, index) => ({ id: id(), itemType: "food", itemName: name, category: itemCategory("food", name), sortOrder: index + 1 })),
    ...(pl.supplements || []).map((name, index) => ({ id: id(), itemType: "supplement", itemName: name, category: itemCategory("supplement", name), sortOrder: index + 1 }))
  ];
  return {
    ...pl,
    model: "diet_plan",
    status: pl.status || "draft",
    selectedItems,
    generalAdvice: Array.isArray(pl.generalAdvice) ? pl.generalAdvice : defaultAdvice.map((textValue) => ({ id: id(), text: textValue, enabled: false })),
    dailyRation: pl.dailyRation || { totalQuantity: "", totalUnit: "gramos", mealsPerDay: "", meals: [], notes: "" },
    transitionSteps: Array.isArray(pl.transitionSteps) ? pl.transitionSteps : [],
    supplementSchedules: Array.isArray(pl.supplementSchedules) ? pl.supplementSchedules : [],
    weeklyExamples: Array.isArray(pl.weeklyExamples) ? pl.weeklyExamples : [],
    internalNotes: pl.internalNotes || "",
    generalNotes: pl.generalNotes || "",
    updatedAt: pl.updatedAt || nowIso()
  };
}
function planAdvice(pl) {
  if (!pl.generalAdvice?.length) pl.generalAdvice = defaultAdvice.map((textValue) => ({ id: id(), text: textValue, enabled: false }));
  return pl.generalAdvice;
}
function patientProfileStatus() {
  const p = patient();
  if (!p) return "";
  return [p.species, p.weight ? `${p.weight} kg` : "", p.bodyCondition ? `CC ${p.bodyCondition}` : ""].filter(Boolean).join(" · ");
}
function sortByOrder(a, b) { return Number(a.sortOrder || 999) - Number(b.sortOrder || 999) || String(a.itemName || a.label || "").localeCompare(String(b.itemName || b.label || ""), "es"); }
function parseLines(value) { return String(value || "").split(/\n+/).map((line) => line.trim()).filter(Boolean); }
function itemCategory(type, name) {
  const groups = type === "supplement" ? supplementGroups : foodGroups;
  return groups.find(([, items]) => items.includes(name))?.[0] || (type === "superfood" ? "Superalimentos" : "Agregados");
}
function itemFromRef(ref) {
  const [type, name] = String(ref || "").split("|");
  return { type, name, category: itemCategory(type, name) };
}
function planItemOptions() {
  return `<option value="">Seleccionar</option>${foodGroups.map(([label, items]) => `<optgroup label="${esc(label)}">${items.filter((item) => db.foods.includes(item)).map((item) => {
    const type = label === "Superalimentos" ? "superfood" : "food";
    return `<option value="${type}|${esc(item)}">${esc(item)}</option>`;
  }).join("")}</optgroup>`).join("")}${customFoodOptions()}${supplementPlanOptions(false)}`;
}
function customFoodOptions() {
  const known = new Set(foodGroups.flatMap(([, items]) => items));
  const custom = db.foods.filter((item) => !known.has(item)).sort((a, b) => a.localeCompare(b, "es"));
  return custom.length ? `<optgroup label="Alimentos agregados">${custom.map((item) => `<option value="food|${esc(item)}">${esc(item)}</option>`).join("")}</optgroup>` : "";
}
function supplementPlanOptions(includeBlank = true) {
  const known = new Set(supplementGroups.flatMap(([, items]) => items));
  const grouped = supplementGroups.map(([label, items]) => `<optgroup label="${esc(label)}">${items.filter((item) => db.supplements.includes(item)).map((item) => `<option value="supplement|${esc(item)}">${esc(item)}</option>`).join("")}</optgroup>`).join("");
  const custom = db.supplements.filter((item) => !known.has(item)).sort((a, b) => a.localeCompare(b, "es"));
  return `${includeBlank ? `<option value="">Seleccionar</option>` : ""}${grouped}${custom.length ? `<optgroup label="Suplementos agregados">${custom.map((item) => `<option value="supplement|${esc(item)}">${esc(item)}</option>`).join("")}</optgroup>` : ""}`;
}
function selectedItemRow(item) {
  const title = `${item.itemName || ""}${item.quantity ? ` · ${item.quantity} ${item.unit || ""}` : ""}`;
  return `<article class="sheet-list-item"><span><strong>${esc(title)}</strong><small>${esc(itemTypes[item.itemType] || item.itemType)} · ${esc(item.category || "")} · ${esc(item.frequency || "Frecuencia pendiente")}</small>${item.preparationNotes ? `<p>${esc(item.preparationNotes)}</p>` : ""}${item.tutorNotes ? `<em class="sent">Visible tutor: ${esc(item.tutorNotes)}</em>` : ""}</span><button class="ghost-button compact danger-text" data-delete-plan-item="${item.id}">Eliminar</button></article>`;
}
function supplementMatrix(list) {
  return `<div class="weekly-table supplement-weekly"><div class="weekly-row weekly-head"><strong>Suplemento</strong>${shortDays.map((day) => `<strong>${day}</strong>`).join("")}<strong></strong></div>${list.map((item) => `<div class="weekly-row"><span><strong>${esc(item.supplementName)}</strong><small>${esc([item.doseQuantity, item.doseUnit, item.frequencyText, item.timeOfDay].filter(Boolean).join(" · "))}</small></span>${days.map((day) => `<span class="day-check readonly">${(item.days || []).includes(day) ? "✓" : ""}</span>`).join("")}<button class="ghost-button compact danger-text" data-delete-supplement-schedule="${item.id}">Eliminar</button></div>`).join("")}</div>`;
}
function selectPatient() { return `<label class="active-patient-control"><span>Paciente activo</span><span class="select-wrap compact-select"><select data-active-patient>${db.patients.map((p) => `<option value="${p.id}" ${p.id === state.patientId ? "selected" : ""}>${p.name} · ${p.tutor}</option>`).join("")}</select></span></label>`; }
function tutorPatient() { return db.patients.find((p) => p.tutorAccess); }
function title() { return ({ dashboard: "Panel", patients: "Pacientes", plans: "Planes alimentarios", calendar: "Turnos", alerts: "Alertas", reminders: "Recordatorios", "tutor-docs": "Documentacion", "tutor-calendar": "Turnos", "tutor-urgent": "Urgencia", "tutor-pet": "Mi mascota", "tutor-report": "Seguimiento diario", "tutor-reminders": "Recordatorios", "tutor-plan": "Plan completo" }[state.view] || appConfig.appName); }
function card(v, t) { return `<button class="module-card" data-view="${v}"><span><strong>${t}</strong><small>Abrir</small></span></button>`; }
function metric(t, v, go, tone = "") { return `<button class="metric metric-link ${tone}" data-view="${go}"><strong>${v}</strong><span>${t}</span></button>`; }
function noPatient(t) { return `<section class="panel wide empty-module-panel"><div class="section-heading"><div><span class="eyebrow">Pacientes</span><h2>Sin pacientes cargados</h2></div><button class="primary-button" data-new-patient>Crear paciente</button></div><p class="muted">${t}</p></section>`; }
function panel(h, body) { return `<section class="panel wide"><div class="section-heading"><div><span class="eyebrow">${appConfig.appName}</span><h2>${h}</h2></div></div>${body}</section>`; }
function activePlan(patientId = state.patientId) { return db.dietPlans.find((p) => p.patientId === patientId && (p.status === "published" || p.status === "activo" || p.published)) || db.dietPlans.find((p) => p.patientId === patientId && p.status !== "archived") || null; }
function publishedPlan(patientId = state.patientId) { return db.dietPlans.find((p) => p.patientId === patientId && (p.status === "published" || p.status === "activo" || p.published)) || null; }
function planStages(pl) { return db.stages.filter((s) => s.planId === pl?.id).sort((a, b) => String(a.dayFrom || "").localeCompare(String(b.dayFrom || ""))); }
function activeStage(pl) {
  const list = planStages(pl);
  const manual = list.find((s) => s.status === "activa");
  if (manual) return manual;
  const todayTime = new Date(`${todayIso()}T12:00:00`).getTime();
  return list.find((s) => s.dayFrom && s.dayTo && new Date(`${s.dayFrom}T12:00:00`).getTime() <= todayTime && new Date(`${s.dayTo}T12:00:00`).getTime() >= todayTime) || list[0] || null;
}
function addHistory(patientId, sourceType, sourceId, titleText, description, origin = "sistema", visibleForTutor = false) {
  if (!patientId) return null;
  const item = { id: id(), patientId, sourceType, sourceId, title: titleText, description, date: nowIso(), origin, visibleForTutor };
  db.history.unshift(item);
  return item;
}
function createAlert(patientId, tutorId, sourceType, sourceId, type, severity, description) {
  const item = { id: id(), patientId, tutorId, sourceType, sourceId, type, title: type, severity: severity || "media", status: "activa", createdAt: nowIso(), description, text: description, internalNotes: "" };
  db.alerts.unshift(item);
  return item;
}
function createReminder(patientId, type, titleText, description, date, visibleForTutor = false, origin = "manual", sourceId = "") {
  if (!patientId || !date) return null;
  const exists = db.reminders.some((r) => r.patientId === patientId && r.title === titleText && r.scheduledDate === date && r.sourceId === sourceId);
  if (exists) return null;
  const p = db.patients.find((item) => item.id === patientId);
  const item = { id: id(), patientId, tutorId: p?.tutorId || "", nutritionPlanId: plan()?.id || "", type, title: titleText, description, scheduledDate: date, status: "pendiente", visibleForTutor, origin, sourceId, createdAt: nowIso() };
  db.reminders.unshift(item);
  return item;
}
function tutorReportAlerts(report, p) {
  const alerts = [];
  if (report.vomit === "Si") alerts.push(createAlert(p.id, p.tutorId, "tutor_report", report.id, "Vomitos reportados", "alta", "El tutor reporto vomitos."));
  if (report.diarrhea === "Si" || report.stool === "Diarrea" || report.stool === "Con sangre") alerts.push(createAlert(p.id, p.tutorId, "tutor_report", report.id, "Alteracion digestiva", report.stool === "Con sangre" ? "alta" : "media", `Materia fecal: ${report.stool}.`));
  if (report.rejected === "Si" || report.ate === "No") alerts.push(createAlert(p.id, p.tutorId, "tutor_report", report.id, "Rechazo de alimento", "media", "El tutor reporto rechazo o falta de ingesta."));
  if (report.energy === "Decaido") alerts.push(createAlert(p.id, p.tutorId, "tutor_report", report.id, "Decaimiento", "media", "El tutor reporto decaimiento."));
  return alerts.filter(Boolean);
}
function historySummary(patientId) {
  const items = db.history.filter((h) => h.patientId === patientId);
  const last = items[0];
  return `<section class="history-block compact-history"><div><span class="eyebrow">Historia nutricional</span><h3>${items.length ? `${items.length} evento(s) registrado(s)` : "Sin eventos reales"}</h3>${last ? `<p>Ultimo: ${esc(last.title)} · ${formatDateTime(last.date)}</p>` : `<p>Los eventos apareceran cuando se carguen datos reales.</p>`}</div><button class="ghost-button" data-history-open>Ver linea de tiempo</button></section>`;
}
function historySheet(p) {
  const items = db.history.filter((h) => h.patientId === p.id);
  return `<div class="ios-sheet-backdrop" data-close><section class="ios-sheet history-sheet"><div class="sheet-grabber"></div><header class="sheet-header"><div><span class="eyebrow">${esc(p.name)}</span><h2>Historia nutricional</h2></div><button class="ghost-button compact" data-close>Cerrar</button></header><div class="sheet-scroll">${items.length ? `<div class="timeline">${items.map((h) => `<article><span>${formatDateTime(h.date)}</span><strong>${esc(h.title)}</strong><p>${esc(h.description || "")}</p><small>${esc(h.origin || "sistema")}</small></article>`).join("")}</div>` : empty("Este paciente todavia no tiene historia nutricional.", "Los eventos apareceran cuando se carguen datos reales.")}</div></section></div>`;
}
function calendarView() {
  const monthName = new Date(state.calendarYear, state.calendarMonth, 1).toLocaleDateString("es-AR", { month: "long", year: "numeric" });
  const years = Array.from({ length: 7 }, (_, i) => today.getFullYear() - 1 + i);
  const months = Array.from({ length: 12 }, (_, i) => new Date(2026, i, 1).toLocaleDateString("es-AR", { month: "long" }));
  return `<section class="panel wide calendar-module"><div class="section-heading"><div><span class="eyebrow">Agenda anual</span><h2>Turnos</h2></div><div class="calendar-controls"><button class="ghost-button compact" data-calendar-month="-1">Anterior</button><button class="ghost-button compact" data-calendar-month="1">Siguiente</button></div></div><div class="calendar-picker-row"><label>Mes<select data-calendar-month-select>${months.map((m, i) => `<option value="${i}" ${i === state.calendarMonth ? "selected" : ""}>${m}</option>`).join("")}</select></label><label>Año<select data-calendar-year>${years.map((year) => `<option ${year === state.calendarYear ? "selected" : ""}>${year}</option>`).join("")}</select></label></div><div class="calendar-shell"><div class="mini-calendar"><div class="calendar-title">${monthName}</div><div class="calendar-weekdays">${["L", "M", "M", "J", "V", "S", "D"].map((d) => `<span>${d}</span>`).join("")}</div><div class="calendar-days">${calendarDays().map((day) => day ? `<button class="${day.iso === state.calendarDay ? "selected" : ""}" data-calendar-day="${day.iso}"><strong>${day.label}</strong><small>${day.hasAppointments ? "Turno" : "Libre"}</small></button>` : `<span></span>`).join("")}</div></div><aside class="day-agenda"><span class="eyebrow">Dia seleccionado</span><h3>${formatDate(state.calendarDay)}</h3><div class="slot-list">${availableSlots().map((slot) => `<button class="slot-button"><span>${slot}</span><small>Disponible</small></button>`).join("")}</div></aside></div></section>`;
}
function alertsView() {
  const alerts = db.alerts.filter((a) => !state.patientId || a.patientId === state.patientId || state.view === "alerts");
  return panel("Alertas clinicas", alerts.length ? `<div class="alert-list">${alerts.map((a) => {
    const p = db.patients.find((item) => item.id === a.patientId);
    return `<article class="alert-card"><div><span class="badge danger">${esc(a.severity || "media")}</span><h3>${esc(a.title || a.type)}</h3><p>${esc(a.description || a.text || "")}</p><small>${p ? `Paciente: ${esc(p.name)}` : "Sin paciente vinculado"} · ${formatDateTime(a.createdAt)}</small></div><div class="inline-actions"><button class="ghost-button compact" data-alert-status="${a.id}" data-status="revisada">Revisada</button><button class="primary-button compact" data-alert-status="${a.id}" data-status="resuelta">Resuelta</button></div></article>`;
  }).join("")}</div>` : empty("Todavia no hay alertas activas.", "Las alertas apareceran cuando surjan desde reportes o cargas reales."));
}
function remindersView() {
  const items = db.reminders.filter((r) => !state.patientId || r.patientId === state.patientId);
  return panel("Recordatorios", items.length ? `<div class="sheet-list">${items.map((r) => {
    const p = db.patients.find((item) => item.id === r.patientId);
    return `<article class="sheet-list-item"><span><strong>${esc(r.title)}</strong><small>${p ? `${esc(p.name)} · ` : ""}${formatDate(r.scheduledDate)} · ${esc(r.status)}</small>${r.description ? `<p>${esc(r.description)}</p>` : ""}</span><span class="inline-actions"><button class="ghost-button compact" data-reminder-status="${r.id}" data-status="cumplido">Cumplido</button><button class="ghost-button compact" data-reminder-status="${r.id}" data-status="cancelado">Cancelar</button></span></article>`;
  }).join("")}</div>` : empty("No hay recordatorios programados.", "Los recordatorios apareceran cuando se creen desde planes, etapas o carga manual."));
}
function tutorHomeView() {
  const p = tutorPatient(), pl = publishedPlan(p.id), stage = activeStage(pl);
  if (!pl) return panel("Mi mascota", empty("Este paciente no tiene un plan activo.", "La veterinaria va a habilitar el plan cuando este listo."));
  return panel("Mi mascota", `<div class="tutor-plan-card"><div><span class="eyebrow">${esc(p.name)}</span><h2>Hoy corresponde: ${stage ? esc(stage.name) : "Sin etapa activa"}</h2><p>${esc(pl.objective || "Indicaciones pendientes de completar.")}</p></div>${stage ? tutorStage(stage) : empty("Sin etapa cargada", "El plan todavia no tiene comidas configuradas.")}<div class="tutor-actions"><button class="primary-button" data-view="tutor-report">Reportar evolucion</button><button class="ghost-button" data-view="tutor-docs">Subir foto</button><button class="ghost-button" data-view="tutor-plan">Ver plan completo</button></div>${nextTutorReminder(p.id)}</div>`);
}
function tutorReportView() {
  const p = tutorPatient();
  const reports = db.tutorReports.filter((r) => r.patientId === p.id);
  return `<div class="content-grid"><section class="panel wide"><div class="section-heading"><div><span class="eyebrow">${esc(p.name)}</span><h2>Reporte del dia</h2></div></div><form class="sheet-form app-form-card" data-tutor-report><label>Fecha del reporte<input name="date" type="date" value="${todayIso()}" /></label><div class="mini-grid">${selectField("ate", "Comio bien?", ["Si", "No", "Parcial"])}${selectField("ration", "Termino la racion indicada?", ["Si", "No", "Parcial"])}${selectField("rejected", "Rechazo el alimento?", ["No", "Si"])}${selectField("vomit", "Tuvo vomitos?", ["No", "Si"])}${selectField("diarrhea", "Tuvo diarrea?", ["No", "Si"])}${selectField("stool", "Materia fecal", ["Normal", "Blanda", "Diarrea", "Constipacion", "Con sangre", "No observada"])}${selectField("energy", "Estado general", ["Normal", "Activo", "Decaido"])}</div><label>Observaciones del tutor<textarea name="observations" rows="4"></textarea></label><label>Fotos del seguimiento<input name="photos" type="file" multiple accept="image/*,.pdf,.doc,.docx" /></label><div class="form-actions"><button class="ghost-button" type="button" data-home>Cancelar</button><button class="primary-button">Guardar reporte</button></div></form></section><section class="panel"><span class="eyebrow">Reportes anteriores</span>${reports.length ? reports.map((r) => `<button class="mini-record report-record" data-report-detail="${r.id}"><strong>${formatDate(r.date)}</strong><p>${esc(r.ate)} · ${esc(r.stool)} · ${esc(r.energy)}</p><small>Ver detalle</small></button>`).join("") : empty("Todavia no hay reportes del tutor.", "Cuando guardes un reporte aparecera aca.")}</section></div>${state.sheet === "reportDetail" ? reportDetailSheet(p) : ""}`;
}
function reportDetailSheet(p) {
  const report = db.tutorReports.find((r) => r.id === state.activeReportId && r.patientId === p.id);
  if (!report) return "";
  const photos = report.photos?.length ? report.photos.map((name) => `<span class="library-chip">${esc(name)}</span>`).join("") : "<p class='muted'>Sin fotos adjuntas.</p>";
  return `<div class="ios-sheet-backdrop" data-close><section class="ios-sheet report-sheet"><div class="sheet-grabber"></div><header class="sheet-header"><div><span class="eyebrow">${esc(p.name)}</span><h2>Reporte del ${formatDate(report.date)}</h2></div><button class="ghost-button compact" data-close>Cerrar</button></header><div class="sheet-scroll"><div class="detail-grid">${detail("Comio bien", report.ate)}${detail("Racion", report.ration)}${detail("Rechazo alimento", report.rejected)}${detail("Vomitos", report.vomit)}${detail("Diarrea", report.diarrhea)}${detail("Materia fecal", report.stool)}${detail("Estado general", report.energy)}</div><section class="report-notes"><h3>Observaciones</h3><p>${esc(report.observations || "Sin observaciones.")}</p></section><section class="report-notes"><h3>Archivos</h3><div class="library-chip-list">${photos}</div></section></div></section></div>`;
}
function tutorRemindersView() {
  const p = tutorPatient();
  const items = db.reminders.filter((r) => r.patientId === p.id && r.visibleForTutor && r.status === "pendiente");
  return panel("Recordatorios", items.length ? `<div class="sheet-list">${items.map((r) => `<article class="sheet-list-item"><span><strong>${esc(r.title)}</strong><small>${formatDate(r.scheduledDate)}</small>${r.description ? `<p>${esc(r.description)}</p>` : ""}</span></article>`).join("")}</div>` : empty("No hay recordatorios visibles.", "Las indicaciones apareceran cuando la veterinaria las publique."));
}
function tutorFullPlanView() {
  const p = tutorPatient(), pl = publishedPlan(p.id);
  if (!pl) return panel("Plan completo", empty("Este paciente no tiene un plan activo.", "La veterinaria va a publicarlo cuando este listo."));
  const list = planStages(pl);
  return panel("Plan completo", `<div class="tutor-plan-card"><h2>${esc(pl.title)}</h2><p>${esc(pl.message || pl.objective || "")}</p>${list.length ? list.map((s) => `<article class="stage-readonly"><span class="badge">${s.status || "pendiente"}</span><h3>${esc(s.name)}</h3>${tutorStage(s)}</article>`).join("") : empty("Sin etapas cargadas", "Todavia no hay etapas publicadas.")}</div>`);
}
function tutorStage(stage) {
  return `<div class="meal-cards">${["morning", "afternoon", "night"].map((key) => mealTutorCard(key, stage.meals?.[key] || { notes: stage[key] || "" })).join("")}</div>${stage.instructions ? `<p><strong>Indicaciones:</strong> ${esc(stage.instructions)}</p>` : ""}${stage.tutorNotes ? `<p><strong>Observar:</strong> ${esc(stage.tutorNotes)}</p>` : ""}`;
}
function mealTutorCard(key, meal) {
  const titleMap = { morning: "Manana", afternoon: "Tarde", night: "Noche" };
  if (meal.noIndicated) return `<article><strong>${titleMap[key]}</strong><p>No se indica.</p></article>`;
  const items = [...(meal.foods || []), ...(meal.supplements || [])];
  return `<article><strong>${titleMap[key]}</strong><p>${items.length ? esc(items.join(", ")) : "Sin comida indicada."}</p>${meal.notes ? `<small>${esc(meal.notes)}</small>` : ""}</article>`;
}
function nextTutorReminder(patientId) {
  const item = db.reminders.filter((r) => r.patientId === patientId && r.visibleForTutor && r.status === "pendiente").sort((a, b) => String(a.scheduledDate).localeCompare(String(b.scheduledDate)))[0];
  return item ? `<div class="next-reminder"><span class="eyebrow">Proximo recordatorio</span><strong>${esc(item.title)}</strong><small>${formatDate(item.scheduledDate)}</small></div>` : "";
}
function reminderForm(pl) {
  const list = db.reminders.filter((r) => r.patientId === patient().id && (r.nutritionPlanId === pl?.id || r.sourceId === pl?.id));
  return `<div class="reminder-workspace"><form class="sheet-form app-form-card" data-save-reminder><label>Titulo<input name="title" required /></label><label>Tipo<select name="type"><option>Enviar fotos</option><option>Control de peso</option><option>Revisar tolerancia digestiva</option><option>Ajustar gramos</option><option>Proximo turno nutricional</option><option>Otro</option></select></label><label>Fecha programada<input name="date" type="date" required /></label><label>Descripcion<textarea name="description" rows="4"></textarea></label><label class="check-line"><input name="visible" type="checkbox" /> Enviar al tutor al guardar</label><div class="form-actions"><button class="primary-button">Guardar recordatorio</button></div></form><button class="reminder-list-entry" data-reminder-list><span><strong>Recordatorios del plan</strong><small>${list.length ? `${list.length} cargado(s)` : "Todavia no hay recordatorios"}</small></span><em>Gestionar</em></button></div>`;
}
function reminderList(pl) {
  const list = db.reminders.filter((r) => r.patientId === patient().id && (r.nutritionPlanId === pl?.id || r.sourceId === pl?.id));
  if (!list.length) return `<div class="reminder-workspace">${empty("Todavia no hay recordatorios reales para este plan.", "Crea un recordatorio para que aparezca aca.")}<button class="primary-button" data-section="reminderForm">Crear recordatorio</button></div>`;
  return `<div class="sheet-list reminder-list"><button class="primary-button" data-section="reminderForm">+ Nuevo recordatorio</button>${list.map((r) => `<article class="sheet-list-item reminder-row"><span><strong>${esc(r.title)}</strong><small>${formatDate(r.scheduledDate)} · ${esc(r.status)}</small>${r.description ? `<p>${esc(r.description)}</p>` : ""}<em class="${r.visibleForTutor ? "sent" : "pending"}">${r.visibleForTutor ? "Enviado al tutor" : "Pendiente de enviar"}</em></span><span class="inline-actions">${r.visibleForTutor ? "" : `<button class="ghost-button compact" data-reminder-send="${r.id}">Enviar</button>`}<button class="ghost-button compact" data-reminder-status="${r.id}" data-status="cumplido">Cumplido</button><button class="ghost-button compact" data-reminder-status="${r.id}" data-status="cancelado">Cancelar</button><button class="ghost-button compact danger-text" data-reminder-delete="${r.id}">Eliminar</button></span></article>`).join("")}</div>`;
}
function planPreview(pl) {
  const p = patient(), stage = activeStage(pl);
  return `<div class="preview-panel"><div class="fixed-patient-box"><span>Asi lo vera el tutor</span><strong>${esc(p.name)}</strong><small>${esc(pl.title)} · ${stage ? esc(stage.name) : "Sin etapa activa"}</small></div>${stage ? tutorStage(stage) : empty("Sin etapa activa", "Crea una etapa para previsualizar el contenido.")}<div class="sheet-list">${db.reminders.filter((r) => r.patientId === p.id && r.visibleForTutor).map((r) => `<article class="sheet-list-item"><span><strong>${esc(r.title)}</strong><small>${formatDate(r.scheduledDate)}</small></span></article>`).join("") || "<p class='muted'>No hay recordatorios visibles para tutor.</p>"}</div><div class="form-actions"><button class="ghost-button" data-section="stages">Editar plan</button><button class="primary-button" data-publish-plan>Publicar al tutor</button><button class="ghost-button" data-export-pdf>Exportar PDF</button><button class="ghost-button" data-export-excel>Exportar Excel</button></div></div>`;
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
  return `<option value="none" ${selected.includes("none") ? "selected" : ""}>No se indica</option>${groupedMealOptions("food", foodGroups, db.foods, selected)}${groupedMealOptions("supplement", supplementGroups, db.supplements, selected)}<option value="other-food" ${selected.includes("other-food") ? "selected" : ""}>Otro alimento</option><option value="other-supplement" ${selected.includes("other-supplement") ? "selected" : ""}>Otro suplemento</option>`;
}
function groupedMealOptions(prefix, groups, library, selected = []) {
  const known = new Set(groups.flatMap(([, items]) => items));
  const grouped = groups.map(([label, items]) => `<optgroup label="${esc(label)}">${items.filter((item) => library.includes(item)).map((x) => `<option value="${prefix}:${esc(x)}" ${selected.includes(`${prefix}:${x}`) ? "selected" : ""}>${esc(x)}</option>`).join("")}</optgroup>`).join("");
  const custom = library.filter((item) => !known.has(item)).sort((a, b) => a.localeCompare(b, "es"));
  return grouped + (custom.length ? `<optgroup label="${prefix === "food" ? "Alimentos agregados" : "Suplementos agregados"}">${custom.map((x) => `<option value="${prefix}:${esc(x)}" ${selected.includes(`${prefix}:${x}`) ? "selected" : ""}>${esc(x)}</option>`).join("")}</optgroup>` : "");
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
  const supplements = selectedStageSupplements(stage);
  return `<div data-stage-schedule>${stageScheduleTable(supplements, stage.supplementSchedule || {})}</div>`;
}
function selectedStageSupplements(stage) {
  return unique(Object.values(stage.meals || {}).flatMap((meal) => meal.supplements || []));
}
function updateStageScheduleDom() {
  const target = document.querySelector("[data-stage-schedule]");
  if (!target) return;
  const current = {};
  target.querySelectorAll('input[name^="stageSchedule:"]:checked').forEach((input) => {
    const name = input.name.replace("stageSchedule:", "");
    current[name] = [...(current[name] || []), input.value];
  });
  const supplements = unique([
    ...Array.from(document.querySelectorAll("[data-meal-select]")).flatMap((select) => Array.from(select.selectedOptions || []).map((option) => option.value).filter((value) => value.startsWith("supplement:")).map((value) => value.replace("supplement:", ""))),
    ...Array.from(document.querySelectorAll('[data-other-field$="Supplement"] input')).map((input) => input.value),
  ]);
  target.innerHTML = stageScheduleTable(supplements, current);
}
function stageScheduleTable(supplements, schedule = {}) {
  if (!supplements.length) return `<p class="muted">Cuando selecciones suplementos en mañana, tarde o noche, aca aparece la grilla semanal.</p>`;
  return `<div class="weekly-table supplement-weekly"><div class="weekly-row weekly-head"><strong>Suplemento</strong>${days.map((d) => `<strong>${d.slice(0, 3)}</strong>`).join("")}</div>${supplements.map((s) => `<div class="weekly-row"><span>${esc(s)}</span>${days.map((day) => `<label class="day-check"><input type="checkbox" name="stageSchedule:${esc(s)}" value="${day}" ${(schedule?.[s] || []).includes(day) ? "checked" : ""} /><span>${day.slice(0, 1)}</span></label>`).join("")}</div>`).join("")}</div>`;
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
function todayIso() { return new Date().toISOString().slice(0, 10); }
function nowIso() { return new Date().toISOString(); }
function formatDate(iso) {
  if (!iso) return "Selecciona un dia";
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
function formatDateTime(iso) {
  if (!iso) return "Sin fecha";
  return new Date(iso).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });
}
function selectField(name, label, options) {
  return `<label>${label}<select name="${name}">${options.map((option) => `<option>${option}</option>`).join("")}</select></label>`;
}
function exportPlanPdf() {
  const p = patient(), pl = plan();
  if (!p || !pl) return alert("Primero carga un paciente y un plan.");
  addHistory(p.id, "pdf_export", pl.id, "Plan exportado a PDF", pl.title, "profesional", false);
  save();
  const win = window.open("", "_blank");
  if (!win) return alert("El navegador bloqueo la ventana de exportacion. Habilita ventanas emergentes para descargar el PDF.");
  win.document.write(planPdfHtml(p, pl, stages()));
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 350);
}
function exportPlanExcel() {
  const p = patient(), pl = plan();
  if (!p || !pl) return alert("Primero carga un paciente y un plan.");
  const rows = [["Paciente", p.name], ["Tutor", p.tutor], ["Plan", pl.title], ["Objetivo", pl.objective || ""], [], ["Etapa", "Desde", "Hasta", "Manana", "Tarde", "Noche", "Estado"], ...stages().map((s) => [s.name, s.dayFrom || "", s.dayTo || "", mealText(s.meals?.morning || {}), mealText(s.meals?.afternoon || {}), mealText(s.meals?.night || {}), s.status || ""])];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = `${(p.name || "paciente").replaceAll(" ", "-")}-plan.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
  addHistory(p.id, "excel_export", pl.id, "Plan exportado a Excel", pl.title, "profesional", false);
  save();
}
function planPdfHtml(p, pl, stageList) {
  const date = new Date().toLocaleDateString("es-AR");
  return `<!doctype html><html lang="es"><head><meta charset="utf-8" /><title>${esc(pl.title || "Plan alimentario")} - ${esc(p.name)}</title><style>${pdfCss()}</style></head><body><footer class="pdf-footer">Generado por NutriM-Vet</footer><main class="pdf-page"><section class="pdf-cover"><div class="cover-media"><img src="assets/nutrivetm-hero.png" alt="" /></div><div class="cover-content"><div class="pdf-brand"><span class="brand-mark">NM</span><strong>NutriM-Vet</strong></div><span class="pdf-kicker">${esc(pl.title || "Plan nutricional")}</span><h1>Plan Alimentario Veterinario</h1><div class="cover-meta"><p><span>Paciente</span><strong>${esc(p.name || "Pendiente")}</strong></p><p><span>Tutor</span><strong>${esc(p.tutor || "Pendiente")}</strong></p><p><span>Fecha</span><strong>${date}</strong></p></div></div></section><section class="pdf-section patient-summary"><div class="section-title"><span>Resumen clinico nutricional</span><h2>Datos del paciente</h2></div><div class="pdf-grid">${pdfInfoCard("Paciente", p.name)}${pdfInfoCard("Tutor", p.tutor)}${pdfInfoCard("Especie", p.species)}${pdfInfoCard("Raza", p.breed || "Pendiente")}${pdfInfoCard("Peso actual", p.weight ? `${p.weight} kg` : "Pendiente")}${pdfInfoCard("Peso objetivo", p.targetWeight ? `${p.targetWeight} kg` : "Pendiente")}${pdfInfoCard("Tipo de dieta", pl.typeOther || pl.type || "Pendiente")}${pdfInfoCard("Objetivo", pl.objective || "Pendiente")}${pdfInfoCard("Estado", pl.status || "Pendiente")}</div></section><section class="pdf-section"><div class="section-title"><span>Plan semanal</span><h2>Etapas e indicaciones</h2></div>${stageList.length ? stageList.map(stagePdf).join("") : `<div class="empty-pdf">Sin etapas cargadas.</div>`}</section><section class="pdf-section tutor-message"><div class="section-title"><span>Cierre</span><h2>Mensaje para el tutor</h2></div><p>${esc(pl.message || "Sin mensaje final cargado.")}</p></section></main><script>window.addEventListener("afterprint", () => window.close());</script></body></html>`;
}
function pdfInfoCard(label, value) {
  return `<article><span>${esc(label)}</span><strong>${esc(value || "Pendiente")}</strong></article>`;
}
function stagePdf(stage) {
  return `<article class="pdf-stage"><header class="stage-header"><div><span class="pdf-kicker">${esc(stage.dayFrom || "Sin fecha")} a ${esc(stage.dayTo || "Sin fecha")}</span><h3>${esc(stage.name || "Etapa sin nombre")}</h3></div><strong>${esc(stage.status || "pendiente")}</strong></header>${stage.objective ? `<p class="stage-objective">${esc(stage.objective)}</p>` : ""}<div class="meal-pdf-grid">${["morning", "afternoon", "night"].map((key) => mealPdf(key, stage.meals?.[key] || { notes: stage[key] || "" })).join("")}</div>${stage.instructions ? pdfTextBlock("Indicaciones", stage.instructions) : ""}${stage.prep ? pdfTextBlock("Preparacion", stage.prep) : ""}${stage.tutorNotes ? pdfTextBlock("Observaciones para el tutor", stage.tutorNotes) : ""}${(stage.forbidden || []).length ? pdfTextBlock("Alimentos prohibidos", stage.forbidden.join(", ")) : ""}${stageSchedulePdf(stage)}</article>`;
}
function pdfTextBlock(title, textValue) {
  return `<section class="pdf-note"><h4>${esc(title)}</h4><p>${esc(textValue)}</p></section>`;
}
function mealPdf(key, meal) {
  const title = { morning: "Mañana", afternoon: "Tarde", night: "Noche" }[key];
  if (meal.noIndicated) return `<article><span>${title}</span><p>No se indica.</p></article>`;
  const items = [...(meal.foods || []), ...(meal.supplements || [])];
  return `<article><span>${title}</span>${items.length ? `<p>${esc(items.join(", "))}</p>` : `<p>Sin alimentos indicados.</p>`}${meal.notes ? `<small>${esc(meal.notes)}</small>` : ""}</article>`;
}
function stageSchedulePdf(stage) {
  const supplements = selectedStageSupplements(stage);
  if (!supplements.length) return "";
  const labels = ["Lun", "Mar", "Mi&eacute;", "Jue", "Vie", "S&aacute;b", "Dom"];
  return `<section class="pdf-schedule"><h4>Suplementacion semanal</h4><table><thead><tr><th>Suplemento</th>${labels.map((label) => `<th>${label}</th>`).join("")}</tr></thead><tbody>${supplements.map((s) => `<tr><td>${esc(s)}</td>${days.map((day) => `<td>${(stage.supplementSchedule?.[s] || []).includes(day) ? `<span class="check">&#10003;</span>` : ""}</td>`).join("")}</tr>`).join("")}</tbody></table></section>`;
}
function pdfCss() {
  return `@page{size:A4;margin:14mm;@bottom-center{content:"Generado por NutriM-Vet · Pagina " counter(page);color:#6b756e;font-size:10px}}*{box-sizing:border-box}body{margin:0;background:#eef3ed;color:#21372f;font-family:Manrope,Inter,Arial,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}.pdf-page{max-width:920px;margin:0 auto;padding:28px}.pdf-footer{position:fixed;right:18px;bottom:10px;color:#6b756e;font-size:10px}.brand-mark{display:inline-grid;place-items:center;width:46px;height:46px;border-radius:12px;background:#2f5e52;color:#fff;font-weight:900}.pdf-brand{display:flex;align-items:center;gap:12px;color:#fff;font-size:20px}.pdf-cover{position:relative;display:grid;min-height:920px;overflow:hidden;border-radius:22px;background:#1f3f38;box-shadow:0 22px 70px rgba(25,54,47,.22);break-after:page}.cover-media{position:absolute;inset:0}.cover-media img{width:100%;height:100%;object-fit:cover;opacity:.64}.cover-media:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(28,58,50,.92),rgba(28,58,50,.46) 58%,rgba(255,255,255,.1))}.cover-content{position:relative;z-index:1;align-self:end;display:grid;gap:22px;max-width:640px;padding:54px;color:#fff}.pdf-kicker{display:block;color:#dcebe3;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.cover-content h1{margin:0;font-size:52px;line-height:1.02}.cover-meta{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.cover-meta p,.pdf-grid article,.meal-pdf-grid article,.pdf-note,.pdf-schedule{padding:14px;border:1px solid rgba(223,231,220,.86);border-radius:14px;background:rgba(255,255,255,.94);box-shadow:0 10px 28px rgba(31,63,56,.08)}.cover-meta span,.pdf-grid span,.meal-pdf-grid span{display:block;color:#66736a;font-size:10px;font-weight:900;text-transform:uppercase}.cover-meta strong{display:block;margin-top:4px;color:#20372f}.pdf-section{margin:18px 0;padding:22px;border:1px solid #dfe7dc;border-radius:18px;background:#fff;box-shadow:0 16px 40px rgba(31,63,56,.08);break-inside:avoid}.section-title{margin-bottom:16px}.section-title span{color:#2f5e52;font-size:12px;font-weight:900;text-transform:uppercase}.section-title h2{margin:4px 0 0;color:#20372f;font-size:25px}.pdf-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.pdf-grid strong{display:block;margin-top:5px;color:#20372f}.pdf-stage{display:grid;gap:14px;margin:14px 0;padding:18px;border-radius:18px;background:#f8faf6;border:1px solid #dfe7dc;break-inside:avoid}.stage-header{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.stage-header h3{margin:3px 0 0;font-size:22px;color:#2f5e52}.stage-header strong{padding:6px 10px;border-radius:999px;background:#ddefe5;color:#2f5e52;font-size:11px;text-transform:uppercase}.stage-objective{margin:0;color:#56635b}.meal-pdf-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.meal-pdf-grid p{margin:6px 0;color:#223830}.meal-pdf-grid small{color:#66736a}.pdf-note{background:#fff}.pdf-note h4,.pdf-schedule h4{margin:0 0 7px;color:#2f5e52;font-size:14px}.pdf-note p,.tutor-message p{margin:0;color:#3d4b43;line-height:1.55}.pdf-schedule{background:#fff;break-inside:avoid}table{width:100%;border-collapse:separate;border-spacing:0;overflow:hidden;border-radius:12px;border:1px solid #dfe7dc}th,td{padding:9px;border-bottom:1px solid #dfe7dc;text-align:center}th{background:#2f5e52;color:#fff;font-size:11px}td:first-child,th:first-child{text-align:left}tr:last-child td{border-bottom:0}.check{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#ddefe5;color:#2f5e52;font-weight:900}.empty-pdf{padding:18px;border-radius:14px;background:#f8faf6;color:#66736a}@media print{body{background:#fff}.pdf-page{padding:0}.pdf-cover{min-height:260mm;border-radius:0;box-shadow:none}.pdf-section{box-shadow:none}.pdf-footer{display:none}}`;
}

if ("serviceWorker" in navigator) navigator.serviceWorker.getRegistrations?.().then((r) => r.forEach((x) => x.unregister()));
if ("caches" in window) caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
save();
render();
