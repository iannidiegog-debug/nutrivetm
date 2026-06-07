import { appConfig } from "./config.js";

const today = new Date("2026-06-05T12:00:00-03:00");
const STORAGE_KEY = "nutrivetm-data-v1";

const store = {
  isAuthenticated: false,
  activeRole: "vet",
  activeView: "home",
  selectedPetId: "mora",
  activeCalendarDate: "2026-06-06",
  patientMode: "detail",
  patientDetailOpen: false,
  followupMode: "view",
  planMode: "view",
  editingPlanId: "",
  editingStageId: "",
  navigationHistory: [],
  tutors: [
    {
      id: "tutor-agustin",
      firstName: "Agustin",
      lastName: "Perez",
      dni: "Pendiente",
      email: "Pendiente",
      phone: "Pendiente",
      address: "Pendiente",
      createdAt: "2026-06-05",
    },
    {
      id: "tutor-marina",
      firstName: "Marina",
      lastName: "Vidal",
      dni: "Pendiente",
      email: "Pendiente",
      phone: "Pendiente",
      address: "Pendiente",
      createdAt: "2026-06-05",
    },
    {
      id: "tutor-rocio",
      firstName: "Rocio",
      lastName: "Navas",
      dni: "Pendiente",
      email: "Pendiente",
      phone: "Pendiente",
      address: "Pendiente",
      createdAt: "2026-06-05",
    },
  ],
  nutritionPlans: [],
  nutritionPlanStages: [],
  ingredientLibrary: [],
  adviceLibrary: [],
  supplementLibrary: [],
  cookingLibrary: [],
  tutorMessageLibrary: [],
  followups: [],
  alerts: [],
  clinicalHistory: [],
  consultations: [],
  faqs: [
    {
      id: "faq-1",
      category: "Primera consulta",
      question: "Que estudios tengo que cargar antes del turno?",
      answer:
        "Para la primera consulta necesitamos analisis de sangre reciente, peso actual, fotos de frente y perfil, detalle de alimentacion actual y medicacion si hubiera.",
      visible: true,
    },
    {
      id: "faq-2",
      category: "BARF",
      question: "Como se hace la transicion a alimentacion natural?",
      answer:
        "La transicion se indica de forma gradual segun edad, antecedentes, tolerancia digestiva y resultados de estudios. No se recomienda improvisarla sin seguimiento.",
      visible: true,
    },
    {
      id: "faq-3",
      category: "Seguimiento",
      question: "Cada cuanto se ajusta el plan?",
      answer:
        "Los planes se proyectan a dos meses y se revisan cada 15 a 20 dias con peso, fotos y evolucion digestiva.",
      visible: true,
    },
  ],
  urgentRequests: [
    {
      id: "urg-1",
      petId: "tango",
      tutor: "Rocio Navas",
      reason: "Vomitos y rechazo de comida desde anoche",
      status: "Nueva",
      createdAt: "Hoy 10:42",
      severity: "Alta",
    },
  ],
  appointments: [
    {
      id: "apt-1",
      date: "2026-06-06",
      time: "09:00",
      kind: "Primera consulta",
      petId: "mora",
      status: "Confirmado",
    },
    {
      id: "apt-2",
      date: "2026-06-06",
      time: "11:00",
      kind: "Control nutricional",
      petId: "luna",
      status: "Pendiente",
    },
    {
      id: "apt-3",
      date: "2026-06-07",
      time: "17:00",
      kind: "Revision",
      petId: "tango",
      status: "Confirmado",
    },
  ],
  pets: [
    {
      id: "mora",
      name: "Mora",
      species: "Perra",
      breed: "Border Collie",
      age: "5 anos",
      weight: 18.4,
      targetWeight: 17.8,
      bodyScore: "5/9",
      tutorId: "tutor-agustin",
      tutor: "Agustin Perez",
      phone: "Pendiente",
      email: "Pendiente",
      status: "Plan activo",
      allergies: "Pollo",
      medication: "Sin medicacion",
      notes:
        "Buena respuesta digestiva. Mantener control de peso y revisar tolerancia a higado en etapa 2.",
      documents: ["Hemograma completo.pdf", "Perfil hepatico.pdf", "Fotos frente y perfil.zip"],
      reminders: [
        "Subir peso nuevo el 14/06",
        "Enviar fotos de evolucion el 20/06",
        "Control de analisis a los 60 dias",
      ],
      weights: [19.2, 18.9, 18.7, 18.4],
      plan: [
        {
          stage: "Dias 1-15",
          meals: "2 comidas diarias",
          detail:
            "Transicion suave con proteina magra, verduras cocidas y suplemento digestivo indicado.",
        },
        {
          stage: "Dias 16-35",
          meals: "2 comidas diarias",
          detail:
            "Incorporar organos en baja proporcion y ajustar gramos segun energia y materia fecal.",
        },
        {
          stage: "Dias 36-60",
          meals: "2 comidas diarias",
          detail:
            "Consolidar formula BARF personalizada y definir mantenimiento posterior.",
        },
      ],
    },
    {
      id: "luna",
      name: "Luna",
      species: "Gata",
      breed: "Comun europea",
      age: "8 anos",
      weight: 4.8,
      targetWeight: 4.5,
      bodyScore: "6/9",
      tutorId: "tutor-marina",
      tutor: "Marina Vidal",
      phone: "Pendiente",
      email: "Pendiente",
      status: "Pendiente estudios",
      allergies: "No informadas",
      medication: "Renal support",
      notes: "Esperando laboratorio. Priorizar hidratacion y revisar fosforo.",
      documents: ["Fotos actuales.zip"],
      reminders: ["Cargar analisis de sangre", "Confirmar medicacion vigente"],
      weights: [5.1, 5.0, 4.9, 4.8],
      plan: [],
    },
    {
      id: "tango",
      name: "Tango",
      species: "Perro",
      breed: "Mestizo",
      age: "2 anos",
      weight: 23.1,
      targetWeight: 22.5,
      bodyScore: "5/9",
      tutorId: "tutor-rocio",
      tutor: "Rocio Navas",
      phone: "Pendiente",
      email: "Pendiente",
      status: "Urgencia en revision",
      allergies: "No informadas",
      medication: "No informado",
      notes: "Solicitud urgente abierta. Revisar vomitos antes de indicar dieta.",
      documents: ["Video sintomas.mov", "Foto alimento actual.jpg"],
      reminders: ["Responder solicitud de urgencia"],
      weights: [23.0, 23.2, 23.1, 23.1],
      plan: [],
    },
  ],
  foods: [
    {
      name: "Carne vacuna magra",
      group: "Proteina",
      use: "Base proteica para perros adultos con buena tolerancia.",
      cautions: "Controlar grasa visible y origen sanitario.",
    },
    {
      name: "Higado",
      group: "Organos",
      use: "Fuente concentrada de micronutrientes en pequenas proporciones.",
      cautions: "No exceder dosis indicada por la veterinaria.",
    },
    {
      name: "Zapallo cocido",
      group: "Fibra",
      use: "Apoyo digestivo y saciedad en transiciones.",
      cautions: "Ajustar si hay heces blandas.",
    },
    {
      name: "Aceite de pescado",
      group: "Suplemento",
      use: "Aporte de omega 3 segun peso y objetivo clinico.",
      cautions: "Revisar conservacion y contraindicaciones.",
    },
  ],
};

const views = [
  { id: "dashboard", label: "Panel", icon: "grid" },
  { id: "calendar", label: "Agenda", icon: "calendar" },
  { id: "patients", label: "Pacientes", icon: "paw" },
  { id: "plans", label: "Planes", icon: "bowl" },
  { id: "library", label: "Biblioteca", icon: "book" },
  { id: "faq", label: "FAQ", icon: "help" },
  { id: "settings", label: "Configuracion", icon: "settings" },
];

const appointmentSlots = buildAppointmentSlots(9, 19, 2);

const planAdviceTemplates = [
  "Incorporar de a un ingrediente a la vez, en pequenas proporciones.",
  "Ofrecer cada ingrediente por al menos 3 dias para evaluar tolerancia.",
  "Observar materia fecal, vomitos, apetito y conducta.",
  "Ofrecer la racion tibia a natural, ni fria ni caliente.",
  "Usar balanza y verificar que pese correctamente.",
  "Preparar viandas para freezer y descongelar en heladera.",
  "Agregar suplementos antes de ofrecer, cuando corresponda.",
];

const ingredientTemplates = [
  { name: "Cerdo", category: "Carnes", unit: "gramos", cooking: "Plancha u horno" },
  { name: "Solomillo", category: "Carnes", unit: "gramos", cooking: "Plancha u horno" },
  { name: "Carre", category: "Carnes", unit: "gramos", cooking: "Plancha u horno" },
  { name: "Bondiola", category: "Carnes", unit: "gramos", cooking: "Plancha u horno" },
  { name: "Chuleta", category: "Carnes", unit: "gramos", cooking: "Plancha u horno" },
  { name: "Costillita", category: "Carnes", unit: "gramos", cooking: "Plancha u horno" },
  { name: "Corazon de cerdo", category: "Otras carnes / visceras", unit: "gramos", cooking: "Bien cocido" },
  { name: "Zanahoria", category: "Verduras", unit: "gramos", cooking: "Vapor o hervida" },
  { name: "Calabaza", category: "Verduras", unit: "gramos", cooking: "Vapor o hervida" },
  { name: "Batata", category: "Verduras", unit: "gramos", cooking: "Vapor o hervida" },
  { name: "Manzana roja", category: "Frutas", unit: "gramos", cooking: "Cruda o cocida segun tolerancia" },
  { name: "Manzana verde", category: "Frutas", unit: "gramos", cooking: "Cruda o cocida segun tolerancia" },
  { name: "Aceite de coco", category: "Grasas", unit: "cucharadita", cooking: "Crudo" },
  { name: "Aceite de oliva extra virgen", category: "Grasas", unit: "cucharadita", cooking: "Crudo" },
  { name: "Sopa moro", category: "Otros", unit: "gramos", cooking: "Preparacion indicada" },
  { name: "Gastrointestinal / balanceado gastrointestinal", category: "Otros", unit: "gramos", cooking: "Listo para servir" },
  { name: "Ricota", category: "Lacteos / fermentados", unit: "gramos", cooking: "Sin coccion" },
  { name: "Huevo", category: "Otros", unit: "unidad", cooking: "Duro, poche o semi cocido" },
  { name: "Yogurt natural", category: "Lacteos / fermentados", unit: "cucharada", cooking: "Sin coccion" },
];

const cookingTemplates = [
  "Carnes a la plancha o al horno, no mas de 15 minutos.",
  "Sellar vuelta y vuelta.",
  "Verduras al vapor o hervidas.",
  "Las grasas siempre van crudas.",
  "Descongelar siempre en heladera.",
  "Agregar suplementos antes de ofrecer.",
];

const supplementTemplates = [
  { name: "Omega 3", indication: "Pinchar capsula y colocar el contenido en la comida. Guardar en heladera al abrigo de la luz." },
  { name: "Huevo", indication: "Duro, poche o semi cocido." },
  { name: "Yogurt natural", indication: "Puede aportar probioticos y mejorar salud intestinal." },
  { name: "Calcio", indication: "Indicar dosis diaria segun criterio profesional." },
  { name: "Glutamina", indication: "Indicar dosis diaria segun criterio profesional." },
  { name: "Aceite de oliva/coco", indication: "Usar crudo y alternar segun tolerancia." },
];

const tutorMessageTemplates = [
  "Tal como hablamos en la consulta, empezamos con una transicion progresiva para evaluar tolerancia digestiva.",
  "En lo posible, enviar fotos y peso en 2 semanas para revisar evolucion.",
  "Comentar como hace la materia fecal, si presenta vomitos, apetito bajo o rechazo de alimento.",
  "Si presenta diarrea o intolerancia, pausar el ultimo ingrediente incorporado y escribir para revisar indicaciones.",
  "Nos volvemos a ver en el proximo control para ajustar cantidades y avanzar de etapa.",
];

const tutorViews = [
  { id: "tutor-home", label: "Inicio", icon: "home" },
  { id: "tutor-docs", label: "Documentacion", icon: "upload" },
  { id: "tutor-calendar", label: "Turnos", icon: "calendar" },
  { id: "tutor-pet", label: "Mi mascota", icon: "paw" },
  { id: "tutor-plan", label: "Plan", icon: "bowl" },
  { id: "tutor-faq", label: "FAQ", icon: "help" },
  { id: "tutor-urgent", label: "Urgencia", icon: "bell" },
];

const icons = {
  bell:
    '<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
  book:
    '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/></svg>',
  bowl:
    '<svg viewBox="0 0 24 24"><path d="M4 11h16a8 8 0 0 1-16 0z"/><path d="M8 21h8"/><path d="M12 4v4"/><path d="M8 6h8"/></svg>',
  calendar:
    '<svg viewBox="0 0 24 24"><path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/></svg>',
  check:
    '<svg viewBox="0 0 24 24"><path d="m20 6-11 11-5-5"/></svg>',
  arrow:
    '<svg viewBox="0 0 24 24"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  file:
    '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>',
  grid:
    '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>',
  help:
    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.6 1-1.6 1.3-2.3 2-.4.4-.6.8-.6 1.5"/><path d="M12 17h.01"/></svg>',
  home:
    '<svg viewBox="0 0 24 24"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
  mail:
    '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  paw:
    '<svg viewBox="0 0 24 24"><circle cx="6" cy="10" r="2"/><circle cx="18" cy="10" r="2"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="6" r="2"/><path d="M7.5 17.5c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4c0 1.5-1.2 2.5-2.7 2.5h-3.6c-1.5 0-2.7-1-2.7-2.5z"/></svg>',
  settings:
    '<svg viewBox="0 0 24 24"><path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2a2 2 0 1 1-4 0V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H2.8a2 2 0 1 1 0-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V2.8a2 2 0 1 1 4 0V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2a2 2 0 1 1 0 4H21a1.7 1.7 0 0 0-1.6 1z"/></svg>',
  upload:
    '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/></svg>',
  weight:
    '<svg viewBox="0 0 24 24"><path d="M6.5 8.5 4 21h16L17.5 8.5z"/><path d="M8.5 8.5a3.5 3.5 0 0 1 7 0"/><path d="M12 13v4"/></svg>',
};

function render() {
  const app = document.querySelector("#app");
  if (!store.isAuthenticated) {
    app.innerHTML = renderLogin();
    bindEvents();
    return;
  }
  const home = renderAccountHome();
  if (store.activeView === "home") {
    app.innerHTML = home;
    bindEvents();
    return;
  }
  app.innerHTML = `
    <main class="flow-shell ${store.activeRole === "tutor" ? "tutor-mode" : ""}">
      <div class="flow-backdrop" aria-hidden="true">${home}</div>
      <section class="flow-sheet">
        ${renderFlowHeader()}
        <div class="flow-content">
          ${store.activeRole === "vet" ? renderVetView() : renderTutorView()}
        </div>
      </section>
    </main>
  `;
  bindEvents();
}

function renderLogin() {
  return `
    <main class="login-shell">
      <section class="login-visual">
        <img src="nutrivetm-hero.png" alt="Consultorio veterinario moderno con perro y gato" />
        <div class="login-copy">
          <span class="brand-mark">NM</span>
          <span class="eyebrow">${appConfig.appName}</span>
          <h1>Acceso al seguimiento nutricional veterinario.</h1>
          <p>Esta pantalla queda lista para conectar despues con Supabase Auth: email, usuario, contrasena y permisos por rol.</p>
        </div>
      </section>
      <section class="login-panel">
        <div>
          <span class="eyebrow">Ingresar</span>
          <h2>Acceso</h2>
        </div>
        <form class="login-form" data-login-form>
          <label>
            Perfil
            <span class="select-wrap">
              <select name="role" data-login-role-select>
                <option value="vet" ${store.activeRole === "vet" ? "selected" : ""}>Veterinaria</option>
                <option value="tutor" ${store.activeRole === "tutor" ? "selected" : ""}>Tutor</option>
              </select>
            </span>
          </label>
          <label>
            Usuario
            <input name="username" autocomplete="username" placeholder="usuario.demo" />
          </label>
          <label>
            Contrasena
            <input name="password" type="password" autocomplete="current-password" placeholder="Demo sin validar" />
          </label>
          <button class="primary-button submit" type="submit">
            <span class="icon">${icons.check}</span>
            Entrar como ${store.activeRole === "vet" ? "Veterinaria" : "Tutor"}
          </button>
        </form>
      </section>
    </main>
  `;
}

function renderAccountHome() {
  const list = getHomeModules();
  const isVet = store.activeRole === "vet";
  const selected = getPet(store.selectedPetId);
  return `
    <main class="home-shell ${store.activeRole === "tutor" ? "tutor-mode" : ""}">
      <section class="profile-top">
        <button class="brand compact-brand" data-view="home">
          <span class="brand-mark">NM</span>
          <span>
            <strong>${appConfig.appName}</strong>
            <small>${isVet ? "Perfil veterinaria" : "Perfil tutor"}</small>
          </span>
        </button>
        <div class="profile-summary">
          <span class="eyebrow">${isVet ? "Consultorio nutricional veterinario" : "Seguimiento del paciente"}</span>
          <h1>${isVet ? "Hola, Veterinaria" : "Hola, Tutor"}</h1>
          <p>${isVet ? "Elegir un modulo para gestionar agenda, pacientes, planes y consultas." : "Elegir un modulo para ver turnos, ficha, plan y consultas."}</p>
        </div>
        <div class="account-actions">
          ${
            isVet
              ? `<label class="active-patient-control home-patient-control">
                  <span>Paciente activo</span>
                  ${renderPatientSelect("home-patient", selected.id)}
                </label>`
              : ""
          }
          <button class="ghost-button" data-view="settings">
            <span class="icon">${icons.settings}</span>
            Configuracion
          </button>
          <button class="soft-button" data-logout>Cerrar sesion</button>
        </div>
      </section>
      <section class="module-grid" aria-label="Modulos principales">
        ${list.map(renderModuleCard).join("")}
      </section>
    </main>
  `;
}

function getHomeModules() {
  if (store.activeRole === "tutor") {
    return tutorViews.filter((item) => item.id !== "tutor-home");
  }
  return [
    { id: "dashboard", label: "Panel", icon: "grid" },
    { id: "calendar", label: "Agenda", icon: "calendar" },
    { id: "patients", label: "Pacientes", icon: "paw" },
    { id: "plans", label: "Planes", icon: "bowl" },
    { id: "library", label: "Biblioteca", icon: "book" },
    { id: "faq", label: "Preguntas frecuentes", icon: "help" },
  ];
}

function renderModuleCard(item) {
  const locked = store.activeRole === "tutor" && isTutorModuleLocked(item.id);
  return `
    <button class="module-card ${locked ? "locked" : ""}" data-view="${item.id}" ${locked ? "disabled aria-disabled=\"true\"" : ""}>
      <span class="icon">${icons[item.icon]}</span>
      <span>
        <strong>${item.label}</strong>
        <small>${getModuleStatusText(item.id)}</small>
      </span>
    </button>
  `;
}

function renderFlowHeader() {
  const selected = getPet(store.selectedPetId);
  return `
    <header class="flow-header">
      <button class="ghost-button" data-back-home>
        <span class="icon">${icons.arrow}</span>
        Volver
      </button>
      <div>
        <span class="eyebrow">${store.activeView === "settings" ? "Configuracion" : appConfig.appName}</span>
        <h1>${getTitle()}</h1>
      </div>
      <div class="flow-actions">
        ${
          store.activeRole === "vet"
            ? `<label class="active-patient-control">
                <span>Paciente activo</span>
                ${renderPatientSelect("active-patient", selected.id)}
              </label>`
            : ""
        }
        <button class="soft-button" data-logout>Cerrar sesion</button>
      </div>
    </header>
  `;
}

function renderPatientSelect(name, value = store.selectedPetId) {
  return `
    <span class="select-wrap compact-select">
      <select name="${name}" data-active-patient>
        ${store.pets
          .map((pet) => `<option value="${pet.id}" ${pet.id === value ? "selected" : ""}>${pet.name} · ${pet.tutor}</option>`)
          .join("")}
      </select>
    </span>
  `;
}

function renderDateSelect(days, value, name) {
  return `
    <span class="select-wrap compact-select">
      <select name="${name}" data-agenda-date>
        ${days
          .map((day) => {
            const date = toDateInput(day);
            return `<option value="${date}" ${date === value ? "selected" : ""}>${day.toLocaleDateString("es-AR", {
              weekday: "long",
              day: "2-digit",
              month: "2-digit",
            })}</option>`;
          })
          .join("")}
      </select>
    </span>
  `;
}

function renderSidebar() {
  const list = store.activeRole === "vet" ? views : tutorViews;
  return `
    <aside class="sidebar">
      <button class="brand" data-view="${store.activeRole === "vet" ? "dashboard" : "tutor-home"}">
        <span class="brand-mark">NM</span>
        <span>
          <strong>${appConfig.appName}</strong>
          <small>${appConfig.clinicName} Vet</small>
        </span>
      </button>
      <nav class="nav">
        ${list
          .map(
            (item) => `
              <button class="nav-item ${store.activeView === item.id ? "active" : ""}" data-view="${item.id}" title="${item.label}">
                <span class="icon">${icons[item.icon]}</span>
                <span>${item.label}</span>
              </button>
            `
          )
          .join("")}
      </nav>
      <div class="role-card">
        <button class="ghost-button compact logout-button" data-view="settings">Configuracion</button>
        <button class="soft-button compact logout-button" data-logout>Cerrar sesion</button>
      </div>
    </aside>
  `;
}

function renderTopbar() {
  const pendingDocs = store.pets.filter((pet) => pet.status.includes("Pendiente")).length;
  const homeView = getHomeView();
  const canGoBack = store.activeView !== homeView || (store.activeView === "patients" && store.patientDetailOpen);
  return `
    <header class="topbar">
      ${
        canGoBack
          ? `<button class="ghost-button mobile-back" data-back-home><span class="icon">${icons.arrow}</span>Volver</button>`
          : ""
      }
      <div>
        <span class="eyebrow">Consultorio nutricional veterinario</span>
        <h1>${getTitle()}</h1>
      </div>
      <div class="top-actions">
        <button class="ghost-button" data-view="${store.activeRole === "vet" ? "calendar" : "tutor-calendar"}">
          <span class="icon">${icons.calendar}</span>
          ${store.activeRole === "vet" ? "Agenda" : "Elegir turno"}
        </button>
        <button class="alert-button" data-view="${store.activeRole === "vet" ? "dashboard" : "tutor-home"}">
          <span class="icon">${icons.bell}</span>
          ${getActiveAlerts().length} alerta
        </button>
        <span class="status-pill">${pendingDocs} pendiente</span>
      </div>
    </header>
  `;
}

function getHomeView(role = store.activeRole) {
  return "home";
}

function getTitle() {
  const titles = {
    dashboard: "Panel",
    calendar: "Agenda interna",
    patients: "Pacientes",
    plans: "Planes alimentarios",
    followup: "Seguimiento",
    alerts: "Alertas clinicas",
    library: "Biblioteca BARF",
    faq: "Preguntas frecuentes",
    settings: "Configuracion",
    "tutor-home": "Inicio",
    "tutor-docs": "Documentacion preconsulta",
    "tutor-calendar": "Elegir turno",
    "tutor-pet": "Ficha de Mora",
    "tutor-plan": "Plan de Mora",
    "tutor-faq": "Preguntas frecuentes",
    "tutor-urgent": "Solicitud de urgencia",
  };
  return titles[store.activeView] || appConfig.appName;
}

function renderVetView() {
  const sections = {
    dashboard: renderDashboard,
    calendar: renderCalendar,
    patients: renderPatients,
    plans: renderPlans,
    followup: renderFollowUp,
    alerts: renderAlerts,
    library: renderLibrary,
    faq: renderFaq,
    settings: renderSettings,
  };
  return (sections[store.activeView] || renderDashboard)();
}

function renderTutorView() {
  const sections = {
    "tutor-home": renderTutorHome,
    "tutor-docs": renderTutorDocuments,
    "tutor-calendar": renderTutorCalendar,
    "tutor-pet": renderTutorPet,
    "tutor-plan": renderTutorPlan,
    "tutor-faq": () => renderFaq({ tutor: true }),
    "tutor-urgent": renderTutorUrgent,
  };
  return (sections[store.activeView] || renderTutorHome)();
}

function renderDashboard() {
  const activePlans = store.nutritionPlans.filter((plan) => plan.status === "activo").length;
  const activeAlerts = getActiveAlerts().length;
  return `
    <div class="dashboard-grid">
      ${renderDashboardTabs()}
      <section class="hero-panel dashboard-hero">
        <img src="nutrivetm-hero.png" alt="Consultorio veterinario moderno con perro y gato" />
        <div class="hero-copy">
          <span class="eyebrow">${appConfig.appName}</span>
          <h2>Nutricion veterinaria, agenda y seguimiento en un solo panel.</h2>
          <p>Gestiona pacientes, planes alimentarios, turnos y alertas clinicas desde una plataforma simple y profesional.</p>
        </div>
      </section>
      <section class="metrics">
        ${metric("Pacientes en seguimiento", store.pets.length, "paw", "", "patients")}
        ${metric("Turnos proximos", store.appointments.length, "calendar", "", "calendar")}
        ${metric("Alertas clinicas", activeAlerts, "bell", "danger", "alerts")}
        ${metric("Planes activos", activePlans, "bowl", "", "plans")}
      </section>
      ${renderMobileEntryGrid(views.filter((item) => item.id !== "dashboard"))}
      <section class="panel clinical-alert-panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Alertas clinicas</span>
            <h2>Atencion prioritaria</h2>
          </div>
          <button class="soft-button" data-view="alerts">Ver alertas</button>
        </div>
        <div class="stack">${getActiveAlerts().slice(0, 3).map(renderAlertCard).join("") || renderEmptyState("Sin alertas activas", "No hay signos clinicos pendientes para revisar.")}</div>
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Hoy y manana</span>
            <h2>Proximos turnos</h2>
          </div>
          <button class="soft-button" data-view="patients">Pacientes</button>
        </div>
        <div class="stack">${store.appointments.map(renderAppointment).join("")}</div>
      </section>
    </div>
  `;
}

function renderDashboardTabs() {
  const items = [
    { label: "Pacientes", view: "patients", icon: "paw" },
    { label: "Plan nutricional", view: "plans", icon: "bowl" },
    { label: "Turnos", view: "calendar", icon: "calendar" },
    { label: "Seguimiento", view: "followup", icon: "weight" },
    { label: "Alertas", view: "alerts", icon: "bell" },
    { label: "Configuracion", view: "settings", icon: "settings" },
  ];
  return `
    <nav class="dashboard-tabs" aria-label="Modulos del panel">
      ${items
        .map(
          (item) => `
            <button class="${item.view === "dashboard" ? "active" : ""}" data-view="${item.view}">
              <span class="icon">${icons[item.icon]}</span>
              <span>${item.label}</span>
            </button>
          `
        )
        .join("")}
    </nav>
  `;
}

function renderDashboardPatientCard(pet) {
  const nextAppointment = getNextAppointmentForPet(pet.id);
  return `
    <article class="dashboard-patient-card">
      <div class="patient-card-main">
        <span class="avatar large">${pet.name.slice(0, 1)}</span>
        <div>
          <span class="badge ${pet.status.includes("Urgencia") ? "danger" : ""}">${pet.status}</span>
          <h3>${pet.name}</h3>
          <p>${pet.species} · ${pet.breed} · ${pet.age}</p>
        </div>
      </div>
      <div class="clinical-facts">
        ${detail("Tutor", pet.tutor)}
        ${detail("Especie", pet.species)}
        ${detail("Raza", pet.breed)}
        ${detail("Edad", pet.age)}
        ${detail("Peso actual", `${pet.weight} kg`)}
        ${detail("Peso objetivo", `${pet.targetWeight} kg`)}
        ${detail("Estado del plan", pet.status)}
        ${detail("Ultimo control", getLastControlLabel(pet))}
        ${detail("Proximo turno", nextAppointment ? `${formatDate(nextAppointment.date)} · ${nextAppointment.time}` : "Sin turno asignado")}
      </div>
    </article>
  `;
}

function renderPatientPreview(pet) {
  return `
    <article class="patient-preview">
      <span class="avatar large">${pet.name.slice(0, 1)}</span>
      <div>
        <span class="badge ${pet.status.includes("Urgencia") ? "danger" : ""}">${pet.status}</span>
        <h3>${pet.name} · ${pet.species}</h3>
        <p>${pet.breed} · ${pet.age} · ${pet.tutor}</p>
      </div>
      <button class="soft-button" data-view="plans">Ver plan</button>
    </article>
  `;
}

function metric(label, value, icon, tone = "", view = "") {
  return `
    <button class="metric ${tone} metric-link" ${view ? `data-view="${view}"` : ""}>
      <span class="icon">${icons[icon]}</span>
      <strong>${value}</strong>
      <span>${label}</span>
    </button>
  `;
}

function renderUrgency(item) {
  const pet = getPet(item.petId);
  return `
    <article class="alert-card">
      <div>
        <span class="badge danger">${item.severity}</span>
        <h3>${pet.name} · ${item.tutor}</h3>
        <p>${item.reason}</p>
      </div>
      <div class="card-actions">
        <small>${item.createdAt}</small>
        <button class="primary-button compact" data-approve-urgent="${item.id}">Habilitar turno</button>
      </div>
    </article>
  `;
}

function renderAlertCard(alert) {
  const pet = getPet(alert.patientId || alert.petId);
  const severity = alert.severity || alert.gravedad || "Media";
  const status = alert.status || alert.estado || "Activa";
  const description = alert.description || alert.descripcion || alert.reason || "Revisar evolucion clinica.";
  const createdAt = alert.createdAt || alert.fecha || "Hoy";
  return `
    <article class="alert-card">
      <div>
        <span class="badge danger">${severity}</span>
        <h3>${pet.name} · ${alert.type || alert.tipo || "Alerta clinica"}</h3>
        <p>${description}</p>
        <small>${alert.sourceType ? `Origen: ${getSourceLabel(alert.sourceType)}` : status}</small>
      </div>
      <div class="card-actions">
        <small>${formatDateLabel(createdAt)}</small>
        <button class="soft-button compact" data-view="patients" data-pet="${pet.id}">Ver paciente</button>
        ${status.toLowerCase() === "activa" ? `<button class="primary-button compact" data-resolve-alert="${alert.id}">Marcar revisada</button>` : ""}
      </div>
    </article>
  `;
}

function renderEmptyState(title, text) {
  return `<div class="empty-state"><h3>${title}</h3><p>${text}</p></div>`;
}

function renderAppointment(item) {
  const pet = getPet(item.petId);
  const date = formatDate(item.date);
  return `
    <article class="appointment">
      <span class="time">${item.time}</span>
      <div>
        <h3>${pet.name}</h3>
        <p>${item.kind} · ${date}</p>
      </div>
      <span class="badge">${item.status}</span>
    </article>
  `;
}

function renderPatientRow(pet) {
  return `
    <button class="patient-row" data-pet="${pet.id}" data-view="patients" data-open-patient>
      <span class="avatar">${pet.name.slice(0, 1)}</span>
      <span>
        <strong>${pet.name}</strong>
        <small>${pet.species} · ${pet.breed} · ${pet.tutor}</small>
      </span>
      <span class="weight">${pet.weight} kg</span>
      <span class="badge ${pet.status.includes("Urgencia") ? "danger" : ""}">${pet.status}</span>
    </button>
  `;
}

function renderCalendar() {
  const weekDays = getWeekDays(today);
  const selectedDate = getValidCalendarDate(weekDays);
  const selectedDay = weekDays.find((day) => toDateInput(day) === selectedDate) || weekDays[0];
  const selectedAppointments = store.appointments.filter((item) => item.date === selectedDate);
  return `
    <div class="content-grid agenda-compact">
      <section class="panel wide">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Agenda interna</span>
            <h2>Disponibilidad y turnos</h2>
          </div>
          <button class="primary-button" data-add-appointment>Nuevo turno</button>
        </div>
        <div class="agenda-picker">
          <label class="agenda-select">
            Dia
            ${renderDateSelect(weekDays, selectedDate, "agenda-date")}
          </label>
          <article class="agenda-day-card">
            <span class="eyebrow">${selectedDay.toLocaleDateString("es-AR", { weekday: "long" })}</span>
            <h3>${selectedDay.toLocaleDateString("es-AR", { day: "2-digit", month: "long" })}</h3>
            <p>${selectedAppointments.length} turnos cargados · bloques cada 2 horas</p>
          </article>
        </div>
        <div class="slot-list">
          ${appointmentSlots
            .map((slot) => {
              const apt = getAppointmentAt(selectedDate, slot);
              return `
                <button class="slot-row ${apt ? "busy" : "available"}" data-slot="${selectedDate}|${slot}">
                  <span class="time">${slot}</span>
                  <span>
                    <strong>${apt ? `${getPet(apt.petId).name} · ${apt.kind}` : "Libre"}</strong>
                    <small>${apt ? apt.status : "Disponible para consulta comun"}</small>
                  </span>
                  <span class="badge ${apt ? "" : "soft"}">${apt ? "Ocupado" : "Disponible"}</span>
                </button>
              `;
            })
            .join("")}
        </div>
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Regla MVP</span>
            <h2>Urgencias</h2>
          </div>
        </div>
        <p class="muted">El tutor no reserva automaticamente una urgencia. La app crea alerta, la veterinaria evalua y habilita un turno o responde con indicaciones.</p>
        <div class="stack">${store.urgentRequests.map(renderUrgency).join("")}</div>
      </section>
    </div>
  `;
}

function renderTutorCalendar() {
  if (!hasTutorPreVisitDocs()) {
    return renderTutorLockedScreen({
      eyebrow: "Documentacion pendiente",
      title: "Carga los archivos antes de solicitar un turno comun",
      text: "Para la primera consulta, la veterinaria necesita revisar estudios, fotos o documentacion previa. Las urgencias siguen disponibles.",
      primaryView: "tutor-docs",
      primaryLabel: "Cargar documentacion",
    });
  }
  const weekDays = getWeekDays(today);
  const availableDays = getAvailableDays(weekDays);
  const selectedDate = getValidCalendarDate(availableDays.length ? availableDays : weekDays);
  const availableSlots = getAvailableSlots(selectedDate);
  return `
    <div class="content-grid agenda-compact">
      <section class="panel wide">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Agenda de la veterinaria</span>
            <h2>Turnos disponibles</h2>
          </div>
          <span class="badge">Consulta comun</span>
        </div>
        <p class="muted">Elegi un horario libre para solicitar turno. La veterinaria lo vera como pendiente y podra confirmarlo desde su agenda.</p>
        <div class="agenda-picker">
          <label class="agenda-select">
            Dia disponible
            ${renderDateSelect(availableDays.length ? availableDays : weekDays, selectedDate, "agenda-date")}
          </label>
          <label class="agenda-select">
            Horario disponible
            <span class="select-wrap compact-select">
              <select data-tutor-slot-date="${selectedDate}">
                ${availableSlots.length
                  ? availableSlots.map((slot) => `<option value="${slot}">${slot}</option>`).join("")
                  : `<option value="">Sin horarios disponibles</option>`}
              </select>
            </span>
          </label>
        </div>
        ${
          availableSlots.length
            ? `<div class="slot-actions">
                ${availableSlots
                  .map(
                    (slot) => `
                      <button class="slot-chip" data-book-slot="${selectedDate}|${slot}">
                        <span>${slot}</span>
                        <small>Solicitar</small>
                      </button>
                    `
                  )
                  .join("")}
              </div>`
            : `<div class="empty-state"><h3>Sin horarios libres</h3><p>Elegir otro dia o solicitar una urgencia.</p></div>`
        }
      </section>
    </div>
  `;
}

function renderPatients() {
  const selected = getPet(store.selectedPetId);
  if (store.patientMode === "new") {
    return renderNewPatientForm();
  }
  return `
    <div class="patient-layout patient-select-layout">
      <section class="panel patient-picker-panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Legajo</span>
            <h2>Seleccionar paciente</h2>
          </div>
        </div>
        ${renderPatientSelect("patients-patient", selected.id)}
        <div class="patient-picker-actions">
          <button class="primary-button" data-patient-mode="new">+ Nuevo paciente</button>
          <p class="muted">El desplegable permite cambiar de legajo sin duplicar el listado en pantalla.</p>
        </div>
      </section>
      <section class="panel patient-detail">
        <div class="patient-header">
          <span class="avatar large">${selected.name.slice(0, 1)}</span>
          <div>
            <span class="badge">${selected.status}</span>
            <h2>${selected.name}</h2>
            <p>${selected.species} · ${selected.breed} · ${selected.age}</p>
          </div>
        </div>
        <div class="detail-grid">
          ${detail("Tutor", selected.tutor)}
          ${detail("Peso actual", `${selected.weight} kg`)}
          ${detail("Objetivo", `${selected.targetWeight} kg`)}
          ${detail("Condicion corporal", selected.bodyScore)}
          ${detail("Alergias", selected.allergies)}
          ${detail("Medicacion", selected.medication)}
        </div>
        <div class="access-control-card">
          <div>
            <span class="eyebrow">Vista del tutor</span>
            <h3>${selected.tutorPortalEnabled ? "Acceso habilitado" : "Acceso pendiente"}</h3>
            <p>${selected.tutorPortalEnabled ? "El tutor puede ver ficha, plan e indicaciones publicadas." : "Hasta habilitarlo, el tutor solo puede cargar documentacion, pedir urgencia, ver FAQ y solicitar turno comun si ya cargo archivos."}</p>
          </div>
          <button class="${selected.tutorPortalEnabled ? "ghost-button" : "primary-button"}" data-toggle-tutor-access="${selected.id}">
            ${selected.tutorPortalEnabled ? "Deshabilitar acceso" : "Habilitar acceso tutor"}
          </button>
        </div>
        <div class="tabs">
          <article>
            <h3>Documentacion</h3>
            ${selected.documents.map((doc) => `<p class="file-line"><span class="icon">${icons.file}</span>${doc}</p>`).join("")}
            ${(selected.preVisitDocuments || []).map((doc) => `<p class="file-line"><span class="icon">${icons.upload}</span>${doc.name}</p>`).join("")}
          </article>
          <article>
            <h3>Recordatorios</h3>
            ${selected.reminders.map((item) => `<p class="file-line"><span class="icon">${icons.bell}</span>${item}</p>`).join("")}
          </article>
          <article>
            <h3>Nota interna</h3>
            <p>${selected.notes}</p>
          </article>
        </div>
        ${renderClinicalHistory(selected.id)}
        ${renderWeightChart(selected)}
      </section>
    </div>
  `;
}

function renderNewPatientForm() {
  return `
    <form class="panel wide patient-form" data-new-patient-form>
      <div class="section-heading">
        <div>
          <span class="eyebrow">Alta de paciente</span>
          <h2>Nuevo paciente veterinario</h2>
        </div>
        <button class="ghost-button" type="button" data-patient-mode="detail">
          <span class="icon">${icons.arrow}</span>
          Volver
        </button>
      </div>
      <div class="form-grid">
        <section class="form-section">
          <h3>Datos del paciente/animal</h3>
          <label>Nombre del animal<input name="petName" required /></label>
          <label>Especie
            <select name="species" required>
              <option value="">Seleccionar</option>
              <option>Perro</option>
              <option>Gato</option>
              <option>Otro</option>
            </select>
          </label>
          <label>Raza<input name="breed" /></label>
          <label>Sexo<input name="sex" placeholder="Macho / Hembra" /></label>
          <label>Edad<input name="age" placeholder="Ej. 4 anos" /></label>
          <label>Fecha de nacimiento aproximada<input name="birthDate" type="date" /></label>
          <label>Peso actual<input name="weight" type="number" step="0.1" required /></label>
          <label>Peso objetivo<input name="targetWeight" type="number" step="0.1" /></label>
          <label>Condicion corporal<input name="bodyScore" placeholder="Ej. 5/9" /></label>
          <label>Estado reproductivo<input name="reproductiveStatus" placeholder="Entero / Castrado" /></label>
          <label>Nivel de actividad<input name="activityLevel" /></label>
          <label>Patologias conocidas<textarea name="pathologies" rows="3"></textarea></label>
          <label>Alergias o intolerancias<textarea name="allergies" rows="3"></textarea></label>
          <label>Medicacion actual<textarea name="medication" rows="3"></textarea></label>
          <label>Observaciones generales<textarea name="notes" rows="3"></textarea></label>
        </section>
        <section class="form-section">
          <h3>Datos nutricionales</h3>
          <label>Tipo de alimentacion actual<input name="currentFoodType" /></label>
          <label>Marca o alimento actual<input name="currentFoodBrand" /></label>
          <label>Cantidad diaria aproximada<input name="dailyAmount" /></label>
          <label>Frecuencia de comidas<input name="mealFrequency" /></label>
          <label>Premios/snacks<textarea name="snacks" rows="3"></textarea></label>
          <label>Alimentos prohibidos o restringidos<textarea name="restrictedFoods" rows="3"></textarea></label>
          <label>Objetivo nutricional
            <select name="nutritionGoal">
              <option>Mantenimiento</option>
              <option>Descenso de peso</option>
              <option>Aumento de peso</option>
              <option>Patologia</option>
              <option>Digestivo</option>
              <option>Renal</option>
              <option>Hepatico</option>
              <option>Dermatologico</option>
              <option>Otro</option>
            </select>
          </label>
          <label>Observaciones nutricionales<textarea name="nutritionNotes" rows="4"></textarea></label>
        </section>
        <section class="form-section">
          <h3>Datos del tutor/dueño</h3>
          <label>Nombre del tutor<input name="tutorFirstName" required /></label>
          <label>Apellido del tutor<input name="tutorLastName" required /></label>
          <label>DNI del tutor<input name="tutorDni" /></label>
          <label>Email<input name="tutorEmail" type="email" /></label>
          <label>Telefono<input name="tutorPhone" /></label>
          <label>Direccion<input name="tutorAddress" /></label>
          <label>Relacion con el animal<input name="relationship" placeholder="Tutor principal" /></label>
          <label>Observaciones del tutor<textarea name="tutorNotes" rows="3"></textarea></label>
        </section>
        <section class="form-section access-section">
          <h3>Acceso del tutor</h3>
          <label class="toggle-line">
            <input name="enableTutorAccess" type="checkbox" checked />
            <span>Habilitar acceso del tutor a la app</span>
          </label>
          <label>Metodo de acceso
            <select name="accessMethod">
              <option value="dni">DNI</option>
              <option value="email">Email</option>
            </select>
          </label>
          <label>Estado del acceso
            <select name="accessStatus">
              <option value="pendiente">Pendiente</option>
              <option value="activo">Activo</option>
              <option value="deshabilitado">Deshabilitado</option>
            </select>
          </label>
          <button class="soft-button" type="button" data-generate-access>Generar acceso</button>
        </section>
      </div>
      <div class="form-actions">
        <button class="ghost-button" type="button" data-patient-mode="detail">Cancelar</button>
        <button class="primary-button" type="submit">Guardar paciente</button>
      </div>
    </form>
  `;
}

function detail(label, value) {
  return `<div class="detail"><span>${label}</span><strong>${value}</strong></div>`;
}

function renderWeightChart(pet) {
  const max = Math.max(...pet.weights);
  const min = Math.min(...pet.weights);
  return `
    <article class="chart-card">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Evolucion</span>
          <h3>Peso y progreso</h3>
        </div>
        <span class="badge">Objetivo ${pet.targetWeight} kg</span>
      </div>
      <div class="chart">
        ${pet.weights
          .map((weight, index) => {
            const height = max === min ? 55 : 35 + ((weight - min) / (max - min)) * 45;
            return `
              <div class="bar-wrap">
                <span>${weight}</span>
                <div class="bar" style="height:${height}%"></div>
                <small>C${index + 1}</small>
              </div>
            `;
          })
          .join("")}
      </div>
    </article>
  `;
}

function renderClinicalHistory(patientId) {
  const events = store.clinicalHistory
    .filter((item) => item.patientId === patientId)
    .slice(0, 6);
  return `
    <article class="chart-card clinical-history-card">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Historia clinica</span>
          <h3>Linea de tiempo</h3>
        </div>
      </div>
      <div class="history-list">
        ${
          events.length
            ? events
                .map(
                  (event) => `
                    <article class="history-item">
                      <div>
                        <span class="badge">${getSourceLabel(event.sourceType)}</span>
                        <h3>${event.title}</h3>
                        <p>${event.description}</p>
                      </div>
                      <small>${formatDateLabel(event.date)}</small>
                    </article>
                  `
                )
                .join("")
            : renderEmptyState("Sin eventos", "Los controles, cambios de plan, alertas y turnos quedaran registrados aca.")
        }
      </div>
    </article>
  `;
}

function renderPlanSectionPreview(plan) {
  return `
    <div class="plan-section-preview">
      ${plan.advice?.length ? previewBlock("Consejos", plan.advice.slice(0, 3).join(" · ")) : ""}
      ${plan.ingredients?.length ? previewBlock("Ingredientes", plan.ingredients.slice(0, 6).map((item) => item.name).join(", ")) : ""}
      ${plan.dailyRation?.total || plan.dailyRation?.details ? previewBlock("Racion diaria", `${plan.dailyRation?.total || "Total a definir"} · ${plan.dailyRation?.details || ""}`) : ""}
      ${plan.supplements?.length ? previewBlock("Suplementacion", plan.supplements.map((item) => item.name).join(", ")) : ""}
      ${plan.tutorMessage ? previewBlock("Mensaje tutor", plan.tutorMessage.slice(0, 180)) : ""}
    </div>
  `;
}

function previewBlock(title, text) {
  return `
    <article class="preview-block">
      <span class="eyebrow">${title}</span>
      <p>${text}</p>
    </article>
  `;
}

function renderPlans() {
  const selected = getPet(store.selectedPetId);
  if (store.planMode === "new") {
    return renderNewPlanForm(selected);
  }
  if (store.planMode === "stage") {
    return renderPlanStageForm(selected);
  }
  const activePlan = getActivePlan(selected.id);
  const stages = activePlan ? getPlanStages(activePlan.id) : [];
  return `
    <div class="content-grid plan-workspace">
      <section class="panel wide">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Plan alimentario</span>
            <h2>${selected.name}</h2>
          </div>
          <div class="section-actions">
            ${renderPatientSelect("plans-patient", selected.id)}
            <button class="primary-button" data-plan-mode="new">+ Nuevo plan</button>
          </div>
        </div>
        <div class="clinical-facts plan-facts">
          ${detail("Tutor", selected.tutor)}
          ${detail("Peso actual", `${selected.weight} kg`)}
          ${detail("Peso objetivo", `${selected.targetWeight} kg`)}
          ${detail("Objetivo", selected.nutrition?.goal || activePlan?.objective || "Pendiente")}
          ${detail("Plan activo", activePlan?.title || "Sin plan activo")}
          ${detail("Estado", activePlan?.status || "borrador")}
        </div>
        ${
          activePlan
            ? `
              <article class="plan-summary-card">
                <div>
                  <span class="badge">${activePlan.status}</span>
                  <h3>${activePlan.title}</h3>
                  <p>${activePlan.objective || "Objetivo pendiente"} · ${activePlan.planType || "Tipo pendiente"} · ${activePlan.estimatedDuration || "Duracion a definir"}</p>
                  <p>${activePlan.observations || activePlan.indications || "Sin observaciones cargadas."}</p>
                  ${activePlan.lastRecommendation ? `<p><strong>Ultima recomendacion:</strong> ${activePlan.lastRecommendation}</p>` : ""}
                </div>
                <div class="stage-actions">
                  <button class="soft-button compact" data-edit-plan="${activePlan.id}">Editar plan</button>
                  <button class="soft-button compact" data-plan-mode="stage">Agregar etapa</button>
                  <button class="primary-button compact" data-export-plan="${activePlan.id}">Exportar PDF</button>
                </div>
              </article>
              ${renderPlanSectionPreview(activePlan)}
              <div class="stage-grid">
                ${
                  stages.length
                    ? stages.map(renderPlanStageCard).join("")
                    : renderEmptyState("Sin etapas cargadas", "Agregar una etapa para indicar comidas, gramos, restricciones y criterios de avance.")
                }
              </div>
            `
            : renderEmptyState("Plan pendiente", "Crear un plan para que las etapas, controles y alertas queden vinculados a este paciente.")
        }
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Vista tutor</span>
            <h2>Indicaciones visibles</h2>
          </div>
        </div>
        ${renderTutorPlanPreview(selected, activePlan, stages)}
      </section>
    </div>
  `;
}

function renderNewPlanForm(selected) {
  const editingPlan = store.editingPlanId ? store.nutritionPlans.find((plan) => plan.id === store.editingPlanId) : null;
  const adviceOptions = store.adviceLibrary.length ? store.adviceLibrary.map((item) => item.text) : planAdviceTemplates;
  const ingredientOptions = store.ingredientLibrary.length ? store.ingredientLibrary : ingredientTemplates;
  const supplementOptions = store.supplementLibrary.length ? store.supplementLibrary : supplementTemplates;
  const cookingOptions = store.cookingLibrary.length ? store.cookingLibrary.map((item) => item.text) : cookingTemplates;
  const messageOptions = store.tutorMessageLibrary.length ? store.tutorMessageLibrary.map((item) => item.text) : tutorMessageTemplates;
  const selectedAdvice = editingPlan?.advice?.length ? editingPlan.advice : adviceOptions;
  const selectedIngredients = editingPlan?.ingredients?.length ? editingPlan.ingredients : ingredientOptions.slice(0, 10);
  const selectedSupplements = editingPlan?.supplements?.length ? editingPlan.supplements : supplementOptions.slice(0, 4);
  const cookingNotes = editingPlan?.cookingNotes?.length ? editingPlan.cookingNotes.join("\n") : cookingOptions.join("\n");
  const tutorMessage = editingPlan?.tutorMessage || messageOptions.join("\n");
  return `
    <form class="panel wide patient-form" data-new-plan-form>
      <div class="section-heading">
        <div>
          <span class="eyebrow">${editingPlan ? "Editar plan" : "Nuevo plan"}</span>
          <h2>${selected.name}</h2>
        </div>
        <button class="ghost-button" type="button" data-plan-mode="view">
          <span class="icon">${icons.arrow}</span>
          Volver
        </button>
      </div>
      <div class="form-grid">
        <section class="form-section">
          <h3>Datos del plan</h3>
          <label>Nombre del plan<input name="planTitle" required value="${editingPlan?.title || ""}" placeholder="Ej. Transicion a natural de Thanos" /></label>
          <label>Tipo de plan
            <select name="planType">
              ${["Transicion a natural", "Dieta mixta", "BARF", "Cocida", "Mantenimiento", "Descenso de peso", "Aumento de peso", "Digestiva", "Renal", "Hepatica", "Dermatologica", "Otro"]
                .map((type) => `<option ${editingPlan?.planType === type ? "selected" : ""}>${type}</option>`)
                .join("")}
            </select>
          </label>
          <label>Fecha de inicio<input name="startDate" type="date" value="${editingPlan?.startDate || toDateInput(today)}" /></label>
          <label>Duracion estimada<input name="duration" value="${editingPlan?.estimatedDuration || ""}" placeholder="Ej. 7 semanas / 60 dias" /></label>
          <label>Objetivo del plan<textarea name="objective" rows="3">${editingPlan?.objective || selected.nutrition?.goal || ""}</textarea></label>
          <label>Estado del plan
            <select name="status">
              ${["borrador", "activo", "finalizado", "suspendido"]
                .map((status) => `<option value="${status}" ${editingPlan?.status === status ? "selected" : ""}>${capitalize(status)}</option>`)
                .join("")}
            </select>
          </label>
          <label>Proximo control sugerido<input name="nextControlDate" type="date" value="${editingPlan?.nextControlDate || ""}" /></label>
        </section>
        <section class="form-section">
          <h3>Datos del paciente en el plan</h3>
          <label>Nombre<input name="patientName" value="${editingPlan?.patientSnapshot?.name || selected.name}" /></label>
          <label>Especie<input name="patientSpecies" value="${editingPlan?.patientSnapshot?.species || selected.species}" /></label>
          <label>Sexo<input name="patientSex" value="${editingPlan?.patientSnapshot?.sex || selected.sex || ""}" /></label>
          <label>Raza<input name="patientBreed" value="${editingPlan?.patientSnapshot?.breed || selected.breed}" /></label>
          <label>Edad<input name="patientAge" value="${editingPlan?.patientSnapshot?.age || selected.age}" /></label>
          <label>Peso vivo / actual<input name="patientWeight" value="${editingPlan?.patientSnapshot?.weight || selected.weight}" /></label>
          <label>Condicion corporal<input name="patientBodyScore" value="${editingPlan?.patientSnapshot?.bodyScore || selected.bodyScore}" /></label>
          <label>Enfermedades previas<textarea name="patientDiseases" rows="3">${editingPlan?.patientSnapshot?.diseases || selected.pathologies || ""}</textarea></label>
          <label>Antecedentes digestivos o clinicos<textarea name="patientHistory" rows="3">${editingPlan?.patientSnapshot?.history || selected.notes || ""}</textarea></label>
          <label>Medidas corporales<textarea name="patientMeasures" rows="3" placeholder="Torax: ...&#10;Abdomen: ...&#10;Cuello: ...">${editingPlan?.patientSnapshot?.measures || ""}</textarea></label>
        </section>
        <section class="form-section">
          <h3>Consejos antes de comenzar</h3>
          <div class="preset-list">
            ${adviceOptions
              .map((tip) => `<label class="toggle-line"><input type="checkbox" name="advicePreset" value="${tip}" ${selectedAdvice.includes(tip) ? "checked" : ""} /><span>${tip}</span></label>`)
              .join("")}
          </div>
          <label>Consejos editables<textarea name="adviceText" rows="8">${selectedAdvice.join("\n")}</textarea></label>
        </section>
        <section class="form-section">
          <h3>Ingredientes permitidos</h3>
          <div class="ingredient-preset-grid">
            ${ingredientOptions
              .map((ingredient) => `<label class="toggle-line"><input type="checkbox" name="ingredientPreset" value="${ingredient.name}" ${selectedIngredients.some((item) => item.name === ingredient.name) ? "checked" : ""} /><span>${ingredient.name} · ${ingredient.category}</span></label>`)
              .join("")}
          </div>
          <label>Ingredientes editables<textarea name="ingredientsText" rows="8">${serializeIngredients(selectedIngredients)}</textarea></label>
          <label><input name="saveIngredientTemplate" type="checkbox" /> Guardar ingredientes nuevos como reutilizables</label>
        </section>
        <section class="form-section">
          <h3>Coccion e indicaciones de preparacion</h3>
          <label>Indicaciones<textarea name="cookingNotes" rows="8">${cookingNotes}</textarea></label>
        </section>
        <section class="form-section">
          <h3>Racion diaria</h3>
          <label>Total diario<input name="dailyTotal" value="${editingPlan?.dailyRation?.total || ""}" placeholder="Ej. 200 gr/dia" /></label>
          <label>Distribucion por alimento<textarea name="dailyRationText" rows="7" placeholder="120 gr carnes&#10;70 gr verduras&#10;10 gr huevo o ricota, alternar">${editingPlan?.dailyRation?.details || ""}</textarea></label>
        </section>
        <section class="form-section">
          <h3>Suplementacion</h3>
          <div class="preset-list">
            ${supplementOptions
              .map((supplement) => `<label class="toggle-line"><input type="checkbox" name="supplementPreset" value="${supplement.name}" ${selectedSupplements.some((item) => item.name === supplement.name) ? "checked" : ""} /><span>${supplement.name}</span></label>`)
              .join("")}
          </div>
          <label>Suplementos editables<textarea name="supplementsText" rows="8">${serializeSupplements(selectedSupplements)}</textarea></label>
        </section>
        <section class="form-section wide-form-section">
          <h3>Esquema semanal de suplementacion</h3>
          ${renderSupplementScheduleEditor(selectedSupplements, editingPlan?.supplementSchedule || {})}
        </section>
        <section class="form-section wide-form-section">
          <h3>Mensaje final para el tutor</h3>
          <label>Plantilla editable<textarea name="tutorMessage" rows="8">${tutorMessage}</textarea></label>
          <label class="toggle-line">
            <input name="createAppointment" type="checkbox" />
            <span>Sugerir turno de control al guardar</span>
          </label>
          <label>Observaciones internas<textarea name="observations" rows="4">${editingPlan?.observations || ""}</textarea></label>
        </section>
      </div>
      <div class="form-actions">
        <button class="ghost-button" type="button" data-plan-mode="view">Cancelar</button>
        <button class="primary-button" type="submit">${editingPlan ? "Guardar cambios" : "Guardar plan"}</button>
      </div>
    </form>
  `;
}

function renderPlanStageForm(selected) {
  const plan = getActivePlan(selected.id);
  const editingStage = store.editingStageId ? store.nutritionPlanStages.find((stage) => stage.id === store.editingStageId) : null;
  if (!plan) {
    return renderNewPlanForm(selected);
  }
  return `
    <form class="panel wide patient-form" data-stage-form>
      <div class="section-heading">
        <div>
          <span class="eyebrow">${editingStage ? "Editar etapa" : "Nueva etapa"}</span>
          <h2>${plan.title}</h2>
        </div>
        <button class="ghost-button" type="button" data-plan-mode="view">
          <span class="icon">${icons.arrow}</span>
          Volver
        </button>
      </div>
      <div class="form-grid">
        <section class="form-section">
          <h3>Etapa</h3>
          <label>Nombre de la etapa<input name="stageName" required value="${editingStage?.name || ""}" placeholder="Ej. Dias 1-15" /></label>
          <label>Tipo de duracion
            <select name="durationType">
              ${["por dias", "por semana", "por fechas", "personalizado"]
                .map((type) => `<option ${editingStage?.durationType === type ? "selected" : ""}>${type}</option>`)
                .join("")}
            </select>
          </label>
          <label>Dia desde<input name="dayFrom" type="number" min="1" value="${editingStage?.dayFrom || 1}" /></label>
          <label>Dia hasta<input name="dayTo" type="number" min="1" value="${editingStage?.dayTo || 15}" /></label>
          <label>Fecha desde<input name="dateFrom" type="date" value="${editingStage?.dateFrom || ""}" /></label>
          <label>Fecha hasta<input name="dateTo" type="date" value="${editingStage?.dateTo || ""}" /></label>
          <label>Objetivo de la etapa<textarea name="stageObjective" rows="3">${editingStage?.objective || ""}</textarea></label>
          <label>Cantidad de comidas diarias<input name="mealCount" value="${editingStage?.mealCount || "2"}" /></label>
          <label>Estado
            <select name="stageStatus">
              ${["pendiente", "activa", "completada", "suspendida"]
                .map((status) => `<option value="${status}" ${editingStage?.status === status ? "selected" : ""}>${capitalize(status)}</option>`)
                .join("")}
            </select>
          </label>
        </section>
        <section class="form-section">
          <h3>Comidas e indicaciones</h3>
          <label>Mañana / comida 1<textarea name="mealMorning" rows="3" placeholder="Ej. 75 gr gastrointestinal">${editingStage?.meals?.morning || ""}</textarea></label>
          <label>Tarde / comida 2<textarea name="mealAfternoon" rows="3" placeholder="Ej. 25 gr cerdo + 40 gr sopa moro">${editingStage?.meals?.afternoon || ""}</textarea></label>
          <label>Noche / comida 3<textarea name="mealNight" rows="3" placeholder="Opcional">${editingStage?.meals?.night || ""}</textarea></label>
          <label>Otras comidas o indicaciones<textarea name="mealDetails" rows="5" placeholder="Comida 4, suplementos asociados, observaciones">${editingStage?.mealDetailsText || ""}</textarea></label>
          <label>Suplementos<textarea name="supplements" rows="3">${editingStage?.supplements || ""}</textarea></label>
          <label>Premios permitidos<textarea name="allowedTreats" rows="3">${editingStage?.allowedTreats || ""}</textarea></label>
          <label>Alimentos prohibidos<textarea name="forbiddenFoods" rows="3">${editingStage?.forbiddenFoods || ""}</textarea></label>
          <label>Observaciones para el tutor<textarea name="tutorNotes" rows="4">${editingStage?.tutorNotes || ""}</textarea></label>
        </section>
        <section class="form-section">
          <h3>Control y alarmas</h3>
          <label>Criterio para pasar de etapa<textarea name="transitionCriteria" rows="4">${editingStage?.transitionCriteria || ""}</textarea></label>
          <label>Proximo control<input name="nextControlDate" type="date" value="${editingStage?.nextControlDate || ""}" /></label>
          <div class="checkbox-grid">
            ${["Vomitos", "Diarrea", "Rechazo de alimento", "Perdida rapida de peso", "Decaimiento"]
              .map((sign) => `<label class="toggle-line"><input type="checkbox" name="alarmSigns" value="${sign}" ${(editingStage?.alarmSigns || []).includes(sign) ? "checked" : ""} /><span>${sign}</span></label>`)
              .join("")}
          </div>
        </section>
      </div>
      <div class="form-actions">
        <button class="ghost-button" type="button" data-plan-mode="view">Cancelar</button>
        <button class="primary-button" type="submit">${editingStage ? "Guardar cambios" : "Guardar etapa"}</button>
      </div>
    </form>
  `;
}

function renderPlanStageCard(stage) {
  return `
    <article class="stage-card">
      <div class="stage-card-top">
        <div>
          <span class="badge">${stage.status}</span>
          <h3>${stage.name}</h3>
          <p>Dias ${stage.dayFrom || "-"} a ${stage.dayTo || "-"}</p>
        </div>
        <span class="meal-count-pill">${formatMealFrequency(stage.mealCount)}</span>
      </div>
      <p><strong>Objetivo:</strong> ${stage.objective || "Pendiente"}</p>
      <p><strong>Mañana:</strong> ${stage.meals?.morning || "Sin carga"}</p>
      <p><strong>Tarde:</strong> ${stage.meals?.afternoon || "Sin carga"}</p>
      ${stage.meals?.night ? `<p><strong>Noche:</strong> ${stage.meals.night}</p>` : ""}
      <p><strong>Otras indicaciones:</strong> ${stage.mealDetailsText || "Completar detalle por comida."}</p>
      <p><strong>Evitar:</strong> ${stage.forbiddenFoods || "Sin restricciones cargadas."}</p>
      <p><strong>Alarmas:</strong> ${(stage.alarmSigns || []).join(", ") || "Sin alarmas cargadas."}</p>
      <div class="stage-actions">
        <button class="soft-button compact" data-stage-action="edit" data-stage-id="${stage.id}">Editar</button>
        <button class="soft-button compact" data-stage-action="duplicate" data-stage-id="${stage.id}">Duplicar</button>
        <button class="soft-button compact" data-stage-action="active" data-stage-id="${stage.id}">Activa</button>
        <button class="soft-button compact" data-stage-action="completed" data-stage-id="${stage.id}">Completada</button>
        <button class="ghost-button compact" data-stage-action="delete" data-stage-id="${stage.id}">Eliminar</button>
      </div>
    </article>
  `;
}

function renderTutorPlanPreview(selected, plan, stages) {
  const activeStage = stages.find((stage) => stage.status === "activa") || stages[0];
  if (!plan || !activeStage) {
    return `<p class="muted">Cuando exista un plan activo, el tutor vera aca una version simple: que darle, cuanto, cuando, que evitar y senales de alarma.</p>`;
  }
  return `
    <div class="tutor-plan-preview">
      <span class="badge">${selected.name}</span>
      <h3>${plan.title}</h3>
      <p><strong>Objetivo:</strong> ${plan.objective || "Pendiente"}</p>
      <p><strong>Racion diaria:</strong> ${plan.dailyRation?.total || "A definir"} · ${plan.dailyRation?.details || ""}</p>
      <p><strong>Etapa activa:</strong> ${activeStage.name}</p>
      <p><strong>Mañana:</strong> ${activeStage.meals?.morning || "Segun indicacion"}</p>
      <p><strong>Tarde:</strong> ${activeStage.meals?.afternoon || "Segun indicacion"}</p>
      ${activeStage.meals?.night ? `<p><strong>Noche:</strong> ${activeStage.meals.night}</p>` : ""}
      <p><strong>Que evitar:</strong> ${activeStage.forbiddenFoods || "Sin restricciones cargadas."}</p>
      <p><strong>Indicaciones:</strong> ${activeStage.tutorNotes || "Seguir indicaciones profesionales."}</p>
      <p><strong>Senales de alarma:</strong> ${(activeStage.alarmSigns || []).join(", ") || "Consultar ante vomitos, diarrea o rechazo de alimento."}</p>
      <p><strong>Proximo control:</strong> ${activeStage.nextControlDate ? formatDateLabel(activeStage.nextControlDate) : "A definir"}</p>
      ${plan.tutorMessage ? `<p><strong>Mensaje final:</strong> ${plan.tutorMessage}</p>` : ""}
    </div>
  `;
}

function renderFollowUp() {
  const selected = getPet(store.selectedPetId);
  if (store.followupMode === "new") {
    return renderNewFollowupForm(selected);
  }
  const followups = getPatientFollowups(selected.id);
  const last = followups[0];
  const previous = followups[1];
  const variation = last && previous ? Number(last.weight - previous.weight).toFixed(1) : "0.0";
  const nextControl = getNextControl(selected.id);
  const patientAlerts = getPatientAlerts(selected.id).filter((alert) => (alert.status || alert.estado || "activa").toLowerCase() === "activa");
  return `
    <div class="content-grid followup-workspace">
      <section class="panel wide">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Seguimiento</span>
            <h2>${selected.name}</h2>
          </div>
          <div class="section-actions">
            ${renderPatientSelect("followup-patient", selected.id)}
            <button class="primary-button" data-followup-mode="new">+ Nuevo control</button>
          </div>
        </div>
        <div class="clinical-facts">
          ${detail("Peso actual", `${selected.weight} kg`)}
          ${detail("Peso objetivo", `${selected.targetWeight} kg`)}
          ${detail("Variacion", `${variation} kg`)}
          ${detail("Ultimo control", last ? formatDateLabel(last.date) : "Pendiente")}
          ${detail("Proximo control", nextControl ? formatDateLabel(nextControl.date) : "Sin turno")}
          ${detail("Estado general", last?.generalStatus || "En progreso")}
        </div>
        ${renderWeightChart(selected)}
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Ultimo control</span>
            <h2>${last ? formatDateLabel(last.date) : "Pendiente"}</h2>
          </div>
        </div>
        ${
          last
            ? `<div class="followup-card">
                <p><strong>Peso:</strong> ${last.weight} kg · <strong>Condicion:</strong> ${last.bodyScore || "Pendiente"}</p>
                <p><strong>Adherencia:</strong> ${last.adherence?.planCompliance || "Pendiente"}</p>
                <p><strong>Accion:</strong> ${last.professional?.nextAction || "Sin accion cargada"}</p>
                <p>${last.professional?.clinicalNotes || "Sin observaciones clinicas."}</p>
              </div>`
            : `<p class="muted">Todavia no hay controles cargados para este paciente.</p>`
        }
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Alertas activas</span>
            <h2>${patientAlerts.length}</h2>
          </div>
        </div>
        <div class="stack">${patientAlerts.map(renderAlertCard).join("") || renderEmptyState("Sin alertas", "No hay alertas clinicas activas para este paciente.")}</div>
      </section>
      <section class="panel wide">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Historial de controles</span>
            <h2>Evolucion</h2>
          </div>
        </div>
        <div class="history-list">
          ${
            followups.length
              ? followups.map(renderFollowupHistoryItem).join("")
              : renderEmptyState("Sin historial", "Cargar el primer control para empezar a medir evolucion.")
          }
        </div>
      </section>
    </div>
  `;
}

function renderNewFollowupForm(selected) {
  return `
    <form class="panel wide patient-form" data-new-followup-form>
      <div class="section-heading">
        <div>
          <span class="eyebrow">Nuevo control</span>
          <h2>${selected.name}</h2>
        </div>
        <button class="ghost-button" type="button" data-followup-mode="view">
          <span class="icon">${icons.arrow}</span>
          Volver
        </button>
      </div>
      <div class="form-grid">
        <section class="form-section">
          <h3>Datos del control</h3>
          <label>Fecha del control<input name="date" type="date" value="${toDateInput(today)}" required /></label>
          <label>Peso actual<input name="weight" type="number" step="0.1" value="${selected.weight}" required /></label>
          <label>Condicion corporal, escala 1 a 9<input name="bodyScore" type="number" min="1" max="9" value="${parseInt(selected.bodyScore, 10) || ""}" /></label>
          <label>Perimetro o medida corporal<input name="measure" placeholder="Opcional" /></label>
          <label>Estado general
            <select name="generalStatus">
              <option>En progreso</option>
              <option>Estable</option>
              <option>Requiere ajuste</option>
              <option>Alerta</option>
            </select>
          </label>
          <label>Proximo control<input name="nextControlDate" type="date" /></label>
        </section>
        <section class="form-section">
          <h3>Signos y evolucion</h3>
          ${renderSelectField("apetite", "Apetito", ["Bajo", "Normal", "Alto"])}
          ${renderSelectField("water", "Consumo de agua", ["Bajo", "Normal", "Alto"])}
          ${renderSelectField("stool", "Materia fecal", ["Normal", "Blanda", "Diarrea", "Constipacion"])}
          ${renderSelectField("vomiting", "Vomitos", ["No", "Si"])}
          ${renderSelectField("activity", "Actividad", ["Baja", "Normal", "Alta"])}
          ${renderSelectField("energy", "Energia general", ["Baja", "Normal", "Alta"])}
          <label>Cambios observados por el tutor<textarea name="tutorChanges" rows="4"></textarea></label>
        </section>
        <section class="form-section">
          <h3>Adherencia al plan</h3>
          ${renderSelectField("planCompliance", "Cumplimiento del plan", ["Bueno", "Parcial", "Malo"])}
          ${renderSelectField("mealsRespected", "Comidas respetadas", ["Si", "No", "Parcial"])}
          <label>Snacks o extras fuera del plan<textarea name="extraSnacks" rows="3"></textarea></label>
          <label>Dificultades reportadas<textarea name="difficulties" rows="4"></textarea></label>
        </section>
        <section class="form-section">
          <h3>Evaluacion profesional</h3>
          <label>Observaciones clinicas<textarea name="clinicalNotes" rows="4"></textarea></label>
          <label>Ajuste recomendado<textarea name="recommendedAdjustment" rows="3"></textarea></label>
          ${renderSelectField("nextAction", "Proxima accion", ["Mantener plan", "Ajustar gramos", "Cambiar alimento", "Pasar a nueva etapa", "Solicitar estudios", "Agendar nuevo control", "Derivar"])}
          <div class="checkbox-grid">
            ${["Perdida rapida de peso", "Aumento de peso", "Diarrea persistente", "Vomitos", "Rechazo de alimento", "Baja adherencia", "Requiere consulta"]
              .map((alert) => `<label class="toggle-line"><input type="checkbox" name="alerts" value="${alert}" /><span>${alert}</span></label>`)
              .join("")}
          </div>
        </section>
      </div>
      <div class="form-actions">
        <button class="ghost-button" type="button" data-followup-mode="view">Cancelar</button>
        <button class="primary-button" type="submit">Guardar control</button>
      </div>
    </form>
  `;
}

function renderFollowupHistoryItem(item) {
  return `
    <article class="history-item">
      <div>
        <span class="badge">${item.generalStatus || "En progreso"}</span>
        <h3>${formatDateLabel(item.date)} · ${item.weight} kg</h3>
        <p>${item.professional?.clinicalNotes || "Sin observaciones clinicas."}</p>
      </div>
      <span class="time">${item.bodyScore || "-"}/9</span>
    </article>
  `;
}

function renderAlerts() {
  const selected = getPet(store.selectedPetId);
  const alerts = getPatientAlerts(selected.id);
  return `
    <section class="panel wide clinical-alert-panel">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Alertas clinicas</span>
          <h2>${selected.name}</h2>
        </div>
        <div class="section-actions">
          ${renderPatientSelect("alerts-patient", selected.id)}
          <button class="soft-button" data-view="calendar">Ver agenda</button>
        </div>
      </div>
      <div class="stack">${alerts.map(renderAlertCard).join("") || renderEmptyState("Sin alertas", "Este paciente no tiene alertas clinicas activas o pendientes.")}</div>
    </section>
  `;
}

function renderLibrary() {
  return `
    <section class="panel wide">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Base editable</span>
          <h2>Biblioteca de alimentos y recetas</h2>
        </div>
        <button class="primary-button" data-add-food>Nuevo alimento</button>
      </div>
      <div class="food-grid">
        ${store.foods
          .map(
            (food) => `
              <article class="food-card">
                <span class="badge">${food.group}</span>
                <h3>${food.name}</h3>
                <p>${food.use}</p>
                <small>${food.cautions}</small>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderFaq(options = {}) {
  const visibleFaqs = options.tutor ? store.faqs.filter((faq) => faq.visible) : store.faqs;
  return `
    <div class="content-grid">
      <section class="panel wide">
        <div class="section-heading">
          <div>
            <span class="eyebrow">${options.tutor ? "Centro de ayuda" : "Editable por veterinaria"}</span>
            <h2>Preguntas frecuentes</h2>
          </div>
          ${options.tutor ? "" : `<button class="primary-button" data-add-faq>Nueva pregunta</button>`}
        </div>
        <div class="faq-list">
          ${visibleFaqs
            .map(
              (faq) => `
                <article class="faq-item">
                  <span class="badge">${faq.category}</span>
                  <h3>${faq.question}</h3>
                  <p>${faq.answer}</p>
                  ${
                    options.tutor
                      ? ""
                      : `<button class="soft-button compact" data-toggle-faq="${faq.id}">${faq.visible ? "Ocultar" : "Mostrar"}</button>`
                  }
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderSettings() {
  return `
    <section class="panel wide">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Gratis y preparado</span>
          <h2>Servicios e integraciones</h2>
        </div>
      </div>
      <div class="integration-grid">
        ${integration("Supabase", "Login, base de datos, archivos, realtime y recordatorios programados.", appConfig.supabase.url ? `Configurado: ${appConfig.supabase.projectId}` : "Necesita URL del proyecto y publishable key.")}
        ${integration("Firebase", "Notificaciones push para urgencias y recordatorios.", appConfig.firebase.projectId ? `Configurado: ${appConfig.firebase.projectId}` : "Necesita config web y VAPID key.")}
        ${integration("Email", "Confirmacion de email, recuperacion y recordatorios.", "Brevo descartado. Recomiendo Resend gratis como reemplazo.")}
        ${integration("Vercel", "Publicacion gratis conectada a GitHub.", "Necesita repo y variables de entorno.")}
        ${integration("Google Calendar", "Sincronizacion futura de agenda.", "Queda desacoplado: la agenda interna ya funciona.")}
        ${integration("WhatsApp", "Botones y mensajes preparados.", "API oficial queda para una etapa posterior.")}
      </div>
    </section>
  `;
}

function integration(name, body, need) {
  return `
    <article class="integration">
      <span class="badge">${name}</span>
      <h3>${body}</h3>
      <p>${need}</p>
    </article>
  `;
}

function renderTutorHome() {
  const pet = getPet("mora");
  const activePlan = getActivePlan(pet.id);
  const stages = activePlan ? getPlanStages(activePlan.id) : [];
  const docsLoaded = hasTutorPreVisitDocs();
  const portalEnabled = hasTutorPortalAccess();
  return `
    <div class="dashboard-grid">
      <section class="hero-panel tutor-hero">
        <img src="nutrivetm-hero.png" alt="Consultorio veterinario moderno con perro y gato" />
        <div class="hero-copy">
          <span class="eyebrow">Primera consulta</span>
          <h2>Carga la documentacion para solicitar un turno.</h2>
          <p>El turno comun se habilita cuando ya estan cargados estudios, fotos o archivos solicitados por la veterinaria.</p>
        </div>
      </section>
      <section class="metrics">
        ${metric("Documentacion", docsLoaded ? "Lista" : "Pendiente", "file", docsLoaded ? "" : "danger", "tutor-docs")}
        ${metric("Turno comun", docsLoaded ? "Habilitado" : "Bloqueado", "calendar", docsLoaded ? "" : "danger", docsLoaded ? "tutor-calendar" : "tutor-docs")}
        ${metric("Urgencia", "Disponible", "bell", "", "tutor-urgent")}
        ${metric("Acceso postconsulta", portalEnabled ? "Activo" : "Pendiente", "paw", portalEnabled ? "" : "danger", portalEnabled ? "tutor-pet" : "")}
      </section>
      ${renderMobileEntryGrid(tutorViews.filter((item) => item.id !== "tutor-home"))}
      <section class="panel document-gate-card">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Paso obligatorio</span>
            <h2>Documentacion para primera consulta</h2>
          </div>
          <button class="primary-button" data-view="tutor-docs">${docsLoaded ? "Ver archivos" : "Cargar archivos"}</button>
        </div>
        <p class="muted">Antes de pedir un turno comun, carga analisis de sangre, fotos actuales y cualquier documento que la veterinaria haya solicitado. Las urgencias quedan disponibles aunque falte documentacion.</p>
        ${renderTutorDocumentList()}
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Acceso posterior</span>
            <h2>Mi mascota y plan</h2>
          </div>
        </div>
        <p class="muted">${portalEnabled ? "La veterinaria ya habilito la ficha, el plan y el seguimiento del paciente." : "Estas secciones se habilitan despues del turno, cuando la veterinaria cargue el legajo y active el acceso del tutor."}</p>
        <div class="locked-actions">
          <button class="soft-button" data-view="tutor-urgent">Solicitar urgencia</button>
          <button class="soft-button" data-view="tutor-faq">Preguntas frecuentes</button>
        </div>
      </section>
    </div>
  `;
}

function renderMobileEntryGrid(list) {
  return `
    <section class="mobile-entry-grid">
      ${list
        .map(
          (item) => {
            const locked = store.activeRole === "tutor" && isTutorModuleLocked(item.id);
            return `
            <button class="mobile-entry ${locked ? "locked" : ""}" data-view="${item.id}" ${locked ? "disabled aria-disabled=\"true\"" : ""}>
              <span class="icon">${icons[item.icon]}</span>
              <span>
                <strong>${item.label}</strong>
                <small>${getModuleStatusText(item.id)}</small>
              </span>
            </button>
          `;
          }
        )
        .join("")}
    </section>
  `;
}

function renderTutorDocuments() {
  const docsLoaded = hasTutorPreVisitDocs();
  return `
    <div class="content-grid">
      <section class="panel wide document-upload-panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Paso previo al turno</span>
            <h2>Documentacion para primera consulta</h2>
          </div>
          <span class="badge ${docsLoaded ? "" : "danger"}">${docsLoaded ? "Documentacion cargada" : "Pendiente"}</span>
        </div>
        <p class="muted">Carga analisis de sangre, fotos actuales y cualquier archivo indicado por la veterinaria. Se aceptan PDF, Word e imagenes.</p>
        <form class="upload-dropzone" data-doc-upload-form>
          <span class="icon">${icons.upload}</span>
          <div>
            <h3>Subir archivos</h3>
            <p>PDF, DOC, DOCX, JPG, PNG, WEBP o HEIC. Podes seleccionar varios archivos a la vez.</p>
          </div>
          <input name="documents" type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.heic,image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required />
          <button class="primary-button" type="submit">Guardar documentacion</button>
        </form>
        <div class="document-checklist">
          <article>${icons.check}<span>Analisis de sangre reciente</span></article>
          <article>${icons.check}<span>Fotos de frente, perfil y cuerpo completo</span></article>
          <article>${icons.check}<span>Peso actual y alimentacion que recibe hoy</span></article>
        </div>
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Archivos cargados</span>
            <h2>${getTutorPreVisitDocs().length}</h2>
          </div>
        </div>
        ${renderTutorDocumentList()}
        <div class="locked-actions">
          <button class="primary-button" data-view="${docsLoaded ? "tutor-calendar" : "tutor-docs"}" ${docsLoaded ? "" : "disabled"}>Solicitar turno comun</button>
          <button class="soft-button" data-view="tutor-urgent">Solicitar urgencia</button>
        </div>
      </section>
    </div>
  `;
}

function getMobileEntryText(id) {
  const copy = {
    dashboard: "Resumen de actividad.",
    calendar: "Disponibilidad y urgencias.",
    patients: "Legajos y evolucion.",
    plans: "Etapas del plan alimentario.",
    library: "Alimentos y recetas.",
    faq: "Preguntas frecuentes.",
    settings: "Servicios conectados.",
    "tutor-calendar": "Elegir un horario disponible.",
    "tutor-pet": "Ficha y documentos de Mora.",
    "tutor-plan": "Plan nutricional activo.",
    "tutor-faq": "Respuestas rapidas.",
    "tutor-urgent": "Enviar alerta a la veterinaria.",
  };
  return copy[id] || "Abrir seccion.";
}

function getModuleStatusText(id) {
  if (store.activeRole !== "tutor") {
    return getMobileEntryText(id);
  }
  if (id === "tutor-docs") {
    return hasTutorPreVisitDocs() ? "Archivos cargados." : "Primer paso obligatorio.";
  }
  if (id === "tutor-calendar") {
    return hasTutorPreVisitDocs() ? "Elegir un horario disponible." : "Se habilita al cargar documentacion.";
  }
  if (id === "tutor-pet" || id === "tutor-plan") {
    return hasTutorPortalAccess() ? getMobileEntryText(id) : "Se habilita despues del turno.";
  }
  return getMobileEntryText(id);
}

function renderTutorPet() {
  const pet = getPet("mora");
  if (!hasTutorPortalAccess()) {
    return renderTutorLockedScreen({
      eyebrow: "Acceso pendiente",
      title: "La ficha se habilita despues del turno",
      text: "Cuando la veterinaria cargue el legajo y active el acceso, vas a poder ver datos de tu mascota, seguimiento e indicaciones.",
      primaryView: "tutor-docs",
      primaryLabel: "Ver documentacion",
    });
  }
  return `
    <section class="panel wide patient-detail">
      <div class="patient-header">
        <span class="avatar large">${pet.name.slice(0, 1)}</span>
        <div>
          <span class="badge">${pet.status}</span>
          <h2>${pet.name}</h2>
          <p>${pet.species} · ${pet.breed} · ${pet.age}</p>
        </div>
      </div>
      <div class="detail-grid">
        ${detail("Tutor", pet.tutor)}
        ${detail("Peso actual", `${pet.weight} kg`)}
        ${detail("Objetivo", `${pet.targetWeight} kg`)}
        ${detail("Condicion corporal", pet.bodyScore)}
        ${detail("Alergias", pet.allergies)}
        ${detail("Medicacion", pet.medication)}
      </div>
      <div class="tabs">
        <article>
          <h3>Documentacion cargada</h3>
          ${pet.documents.map((doc) => `<p class="file-line"><span class="icon">${icons.file}</span>${doc}</p>`).join("")}
        </article>
        <article>
          <h3>Recordatorios</h3>
          ${pet.reminders.map((item) => `<p class="file-line"><span class="icon">${icons.bell}</span>${item}</p>`).join("")}
        </article>
        <article>
          <h3>Indicaciones</h3>
          <p>La veterinaria puede actualizar las indicaciones despues de cada control nutricional.</p>
        </article>
      </div>
      ${renderWeightChart(pet)}
    </section>
  `;
}

function renderTutorPlan() {
  const pet = getPet("mora");
  if (!hasTutorPortalAccess()) {
    return renderTutorLockedScreen({
      eyebrow: "Acceso pendiente",
      title: "El plan se habilita despues de la consulta",
      text: "La veterinaria publicara el plan alimentario cuando ya tenga los estudios, la consulta y el legajo cargados.",
      primaryView: hasTutorPreVisitDocs() ? "tutor-calendar" : "tutor-docs",
      primaryLabel: hasTutorPreVisitDocs() ? "Solicitar turno" : "Cargar documentacion",
    });
  }
  const activePlan = getActivePlan(pet.id);
  const stages = activePlan ? getPlanStages(activePlan.id) : [];
  return `
    <section class="panel wide">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Plan alimentario</span>
          <h2>${pet.name}</h2>
        </div>
        <span class="badge">Lectura tutor</span>
      </div>
      <div class="stage-grid tutor-stage-grid">
        ${activePlan ? `
          <article class="stage-card tutor-plan-intro">
            <span class="badge">${activePlan.status}</span>
            <h3>${activePlan.title}</h3>
            <p><strong>Objetivo:</strong> ${activePlan.objective || "Pendiente"}</p>
            <p><strong>Racion diaria:</strong> ${activePlan.dailyRation?.total || "A definir"} ${activePlan.dailyRation?.details ? `· ${activePlan.dailyRation.details}` : ""}</p>
            <p><strong>Consejos:</strong> ${(activePlan.advice || []).slice(0, 4).join(" · ")}</p>
            <p><strong>Suplementos:</strong> ${(activePlan.supplements || []).map((item) => item.name).join(", ") || "A definir"}</p>
            ${activePlan.tutorMessage ? `<p><strong>Mensaje final:</strong> ${activePlan.tutorMessage}</p>` : ""}
            <button class="primary-button compact" data-export-plan="${activePlan.id}">Descargar PDF</button>
          </article>
        ` : ""}
        ${
          stages.length
            ? stages.map((stage) => `
                <article class="stage-card">
                  <span class="badge">${stage.status}</span>
                  <h3>${stage.name}</h3>
                  <p><strong>Mañana:</strong> ${stage.meals?.morning || "Segun indicacion"}</p>
                  <p><strong>Tarde:</strong> ${stage.meals?.afternoon || "Segun indicacion"}</p>
                  ${stage.meals?.night ? `<p><strong>Noche:</strong> ${stage.meals.night}</p>` : ""}
                  <p><strong>Otras indicaciones:</strong> ${stage.mealDetailsText || "Indicacion pendiente."}</p>
                  <p><strong>Cuando:</strong> ${formatMealFrequency(stage.mealCount)}.</p>
                  <p><strong>Que evitar:</strong> ${stage.forbiddenFoods || "Sin restricciones cargadas."}</p>
                  <p><strong>Importante:</strong> ${stage.tutorNotes || "Seguir el plan indicado por la veterinaria."}</p>
                  <p><strong>Senales de alarma:</strong> ${(stage.alarmSigns || []).join(", ") || "Consultar si aparecen vomitos, diarrea o rechazo de alimento."}</p>
                  <p><strong>Proximo control:</strong> ${stage.nextControlDate ? formatDateLabel(stage.nextControlDate) : "A definir"}</p>
                </article>
              `).join("")
            : renderEmptyState("Plan pendiente", "La veterinaria todavia no publico un plan alimentario para este paciente.")
        }
      </div>
    </section>
  `;
}

function renderTutorLockedScreen({ eyebrow, title, text, primaryView, primaryLabel }) {
  return `
    <section class="panel wide locked-panel">
      <div class="section-heading">
        <div>
          <span class="eyebrow">${eyebrow}</span>
          <h2>${title}</h2>
        </div>
        <span class="badge danger">No habilitado</span>
      </div>
      <p class="muted">${text}</p>
      <div class="locked-actions">
        <button class="primary-button" data-view="${primaryView}">${primaryLabel}</button>
        <button class="soft-button" data-view="tutor-urgent">Solicitar urgencia</button>
        <button class="ghost-button" data-view="tutor-faq">Preguntas frecuentes</button>
      </div>
    </section>
  `;
}

function renderTutorUrgent() {
  return `
    <section class="panel wide urgent-form-panel">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Solicitud prioritaria</span>
          <h2>Urgencia</h2>
        </div>
      </div>
      <p class="muted">Esto no confirma un turno automatico. La veterinaria recibe una alerta, revisa el caso y habilita un espacio urgente o responde con indicaciones.</p>
      <form class="urgent-form" data-urgent-form>
        <label>
          Mascota
          <select name="petId">
            <option value="mora">Mora</option>
          </select>
        </label>
        <label>
          Motivo
          <textarea name="reason" rows="5" placeholder="Contanos sintomas, desde cuando ocurre y si comio o tomo agua."></textarea>
        </label>
        <label>
          Nivel percibido
          <select name="severity">
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>
        </label>
        <button class="alert-button submit" type="submit">
          <span class="icon">${icons.bell}</span>
          Enviar alerta
        </button>
      </form>
    </section>
  `;
}

function getPet(id) {
  return store.pets.find((pet) => pet.id === id) || store.pets[0];
}

function getTutorPet() {
  return getPet("mora");
}

function getTutorPreVisitDocs() {
  const pet = getTutorPet();
  return Array.isArray(pet.preVisitDocuments) ? pet.preVisitDocuments : [];
}

function hasTutorPreVisitDocs() {
  return getTutorPreVisitDocs().length > 0;
}

function hasTutorPortalAccess() {
  return Boolean(getTutorPet().tutorPortalEnabled);
}

function isTutorModuleLocked(id) {
  if (id === "tutor-calendar") {
    return !hasTutorPreVisitDocs();
  }
  if (id === "tutor-pet" || id === "tutor-plan") {
    return !hasTutorPortalAccess();
  }
  return false;
}

function renderTutorDocumentList() {
  const docs = getTutorPreVisitDocs();
  if (!docs.length) {
    return renderEmptyState("Sin documentacion cargada", "Carga al menos un archivo para habilitar la solicitud de turno comun.");
  }
  return `
    <div class="document-list">
      ${docs
        .map(
          (doc) => `
            <article class="file-line uploaded-file">
              <span class="icon">${icons.file}</span>
              <span>
                <strong>${doc.name}</strong>
                <small>${doc.type || "Archivo"} · ${formatFileSize(doc.size)} · ${formatDateLabel(doc.uploadedAt)}</small>
              </span>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function formatFileSize(size) {
  const bytes = Number(size) || 0;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatMealFrequency(value) {
  const count = value?.toString().trim() || "2";
  const numeric = Number(count);
  if (Number.isFinite(numeric)) {
    return `${numeric} comida${numeric === 1 ? "" : "s"}/dia`;
  }
  return count;
}

function splitLines(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function serializeIngredients(items = []) {
  return items
    .map((item) => `${item.name} | ${item.category || "Otros"} | ${item.amount || ""} | ${item.unit || "gramos"} | ${item.frequency || ""} | ${item.cooking || ""} | ${item.observations || ""} | ${item.visible === false ? "interno" : "tutor"}`)
    .join("\n");
}

function parseIngredients(text, selectedNames = []) {
  const source = store.ingredientLibrary.length ? store.ingredientLibrary : ingredientTemplates;
  const selected = source.filter((item) => selectedNames.includes(item.name));
  const fromText = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, category, amount, unit, frequency, cooking, observations, visibility] = line.split("|").map((part) => part?.trim() || "");
      return {
        id: crypto.randomUUID(),
        name,
        category: category || "Otros",
        amount,
        unit: unit || "gramos",
        frequency,
        cooking,
        observations,
        visible: visibility !== "interno",
      };
    });
  const merged = [...selected.map((item) => ({ id: crypto.randomUUID(), ...item, amount: "", frequency: "", observations: "", visible: true })), ...fromText];
  return dedupeByName(merged);
}

function serializeSupplements(items = []) {
  return items
    .map((item) => `${item.name} | ${item.brand || ""} | ${item.dose || ""} | ${item.unit || ""} | ${item.frequency || ""} | ${item.administration || item.indication || ""} | ${item.storage || ""} | ${item.observations || ""} | ${item.visible === false ? "interno" : "tutor"}`)
    .join("\n");
}

function parseSupplements(text, selectedNames = []) {
  const source = store.supplementLibrary.length ? store.supplementLibrary : supplementTemplates;
  const selected = source.filter((item) => selectedNames.includes(item.name));
  const fromText = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, brand, dose, unit, frequency, administration, storage, observations, visibility] = line.split("|").map((part) => part?.trim() || "");
      return {
        id: crypto.randomUUID(),
        name,
        brand,
        dose,
        unit,
        frequency,
        administration,
        storage,
        observations,
        visible: visibility !== "interno",
      };
    });
  const merged = [...selected.map((item) => ({ id: crypto.randomUUID(), ...item, administration: item.indication, visible: true })), ...fromText];
  return dedupeByName(merged);
}

function dedupeByName(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.name?.toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function renderSupplementScheduleEditor(supplements, schedule) {
  const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  const list = supplements.length ? supplements : supplementTemplates;
  return `
    <div class="weekly-table">
      <div class="weekly-row weekly-head">
        <span>Suplemento</span>
        ${days.map((day) => `<span>${day.slice(0, 3)}</span>`).join("")}
      </div>
      ${list
        .map((supplement) => {
          const activeDays = schedule[supplement.name] || [];
          return `
            <div class="weekly-row">
              <strong>${supplement.name}</strong>
              ${days
                .map((day) => `<label><input type="checkbox" name="schedule_${supplement.name}" value="${day}" ${activeDays.includes(day) ? "checked" : ""} /></label>`)
                .join("")}
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function getSupplementSchedule(data, supplements) {
  const schedule = {};
  supplements.forEach((supplement) => {
    schedule[supplement.name] = data.getAll(`schedule_${supplement.name}`).map((day) => day.toString());
  });
  return schedule;
}

function buildAppointmentSlots(startHour, endHour, intervalHours = 2) {
  const slots = [];
  for (let hour = startHour; hour <= endHour; hour += intervalHours) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
  }
  return slots;
}

function getAppointmentAt(date, slot) {
  return store.appointments.find((item) => item.date === date && item.time === slot);
}

function getNextAppointmentForPet(petId) {
  return store.appointments
    .filter((item) => item.petId === petId)
    .slice()
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))[0];
}

function getLastControlLabel(pet) {
  const lastWeight = pet.weights[pet.weights.length - 1];
  return lastWeight ? `Control ${pet.weights.length} · ${lastWeight} kg` : "Pendiente";
}

function getActivePlan(patientId) {
  return (
    store.nutritionPlans.find((plan) => plan.patientId === patientId && plan.status === "activo") ||
    store.nutritionPlans.find((plan) => plan.patientId === patientId)
  );
}

function getPlanStages(planId) {
  return store.nutritionPlanStages
    .filter((stage) => stage.planId === planId)
    .sort((a, b) => Number(a.dayFrom || 0) - Number(b.dayFrom || 0));
}

function getPatientFollowups(patientId) {
  return store.followups
    .filter((item) => item.patientId === patientId)
    .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
}

function getPatientAlerts(patientId) {
  return store.alerts
    .filter((item) => item.patientId === patientId)
    .sort((a, b) => new Date(b.createdAt || b.fecha) - new Date(a.createdAt || a.fecha));
}

function getActiveAlerts() {
  return store.alerts.filter((item) => (item.status || item.estado || "activa").toLowerCase() === "activa");
}

function getPatientAppointments(patientId) {
  return store.appointments
    .filter((item) => item.petId === patientId || item.patientId === patientId)
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
}

function getNextControl(patientId) {
  return getPatientAppointments(patientId).find((item) => item.status !== "Realizado" && item.status !== "Cancelado");
}

function addClinicalHistory(patientId, sourceType, sourceId, title, description, date = toDateInput(today)) {
  store.clinicalHistory.unshift({
    id: crypto.randomUUID(),
    patientId,
    sourceType,
    sourceId,
    title,
    description,
    date,
    createdAt: new Date().toISOString(),
  });
}

function createClinicalAlert({ patientId, sourceType, sourceId, type, severity = "Media", description }) {
  const alert = {
    id: crypto.randomUUID(),
    patientId,
    sourceType,
    sourceId,
    type,
    severity,
    status: "activa",
    description,
    createdAt: new Date().toISOString(),
  };
  store.alerts.unshift(alert);
  return alert;
}

function createSuggestedAppointment(patientId, date, kind = "Control nutricional") {
  if (!date) return null;
  const pet = getPet(patientId);
  const appointment = {
    id: crypto.randomUUID(),
    patientId,
    petId: patientId,
    tutorId: pet.tutorId,
    date,
    time: getAvailableSlots(date)[0] || "09:00",
    kind,
    status: "Sugerido",
    createdAt: new Date().toISOString(),
  };
  store.appointments.unshift(appointment);
  return appointment;
}

function updatePatientWeight(patientId, weight, bodyScore) {
  const pet = getPet(patientId);
  if (!Number.isFinite(weight)) return;
  pet.weight = weight;
  pet.bodyScore = bodyScore ? `${bodyScore}/9` : pet.bodyScore;
  pet.weights = Array.isArray(pet.weights) ? pet.weights : [];
  if (pet.weights[pet.weights.length - 1] !== weight) {
    pet.weights.push(weight);
  }
}

function renderSelectField(name, label, options) {
  return `
    <label>${label}
      <select name="${name}">
        ${options.map((option) => `<option>${option}</option>`).join("")}
      </select>
    </label>
  `;
}

function capitalize(value) {
  const text = value?.toString() || "";
  return text ? text.slice(0, 1).toUpperCase() + text.slice(1) : "";
}

function formatDateLabel(value) {
  if (!value) return "Pendiente";
  if (value.includes("Hoy") || value.includes("Ahora")) return value;
  if (!/^\d{4}-\d{2}-\d{2}/.test(value)) return value;
  return formatDate(value.slice(0, 10));
}

function getSourceLabel(value) {
  const labels = {
    seguimiento: "Seguimiento",
    plan_alimentario: "Plan alimentario",
    turno: "Turno",
    urgencia: "Urgencia",
    carga_manual: "Carga manual",
  };
  return labels[value] || value;
}

function getAvailableSlots(date) {
  return appointmentSlots.filter((slot) => !getAppointmentAt(date, slot));
}

function getAvailableDays(days) {
  return days.filter((day) => getAvailableSlots(toDateInput(day)).length > 0);
}

function getValidCalendarDate(days) {
  const dates = days.map((day) => toDateInput(day));
  if (dates.includes(store.activeCalendarDate)) {
    return store.activeCalendarDate;
  }
  return dates[0] || toDateInput(today);
}

function formatDate(date) {
  return new Date(`${date}T12:00:00-03:00`).toLocaleDateString("es-AR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function getWeekDays(date) {
  const start = new Date(date);
  const day = start.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diffToMonday);
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}

function toDateInput(date) {
  return date.toISOString().slice(0, 10);
}

function getNavigationSnapshot() {
  return {
    activeView: store.activeView,
    selectedPetId: store.selectedPetId,
    patientMode: store.patientMode,
    patientDetailOpen: store.patientDetailOpen,
    followupMode: store.followupMode,
    planMode: store.planMode,
    editingPlanId: store.editingPlanId,
    editingStageId: store.editingStageId,
    activeCalendarDate: store.activeCalendarDate,
  };
}

function restoreNavigationSnapshot(snapshot) {
  store.activeView = snapshot.activeView;
  store.selectedPetId = snapshot.selectedPetId || store.selectedPetId;
  store.patientMode = snapshot.patientMode || "detail";
  store.patientDetailOpen = Boolean(snapshot.patientDetailOpen);
  store.followupMode = snapshot.followupMode || "view";
  store.planMode = snapshot.planMode || "view";
  store.editingPlanId = snapshot.editingPlanId || "";
  store.editingStageId = snapshot.editingStageId || "";
  store.activeCalendarDate = snapshot.activeCalendarDate || store.activeCalendarDate;
}

function navigateTo(view, options = {}) {
  const nextSnapshot = {
    ...getNavigationSnapshot(),
    activeView: view,
    patientMode: options.patientMode || (view === "patients" ? "detail" : store.patientMode),
    followupMode: options.followupMode || (view === "followup" ? "view" : store.followupMode),
    planMode: options.planMode || (view === "plans" ? "view" : store.planMode),
    editingPlanId: options.editingPlanId || "",
    editingStageId: options.editingStageId || "",
    patientDetailOpen: Boolean(options.patientDetailOpen),
  };
  if (options.selectedPetId) {
    nextSnapshot.selectedPetId = options.selectedPetId;
  }
  const current = JSON.stringify(getNavigationSnapshot());
  const next = JSON.stringify(nextSnapshot);
  if (current !== next) {
    store.navigationHistory.push(getNavigationSnapshot());
  }
  restoreNavigationSnapshot(nextSnapshot);
  render();
}

function goBack() {
  const previous = store.navigationHistory.pop();
  if (previous) {
    restoreNavigationSnapshot(previous);
  } else if (store.activeView === "dashboard") {
    store.activeView = "home";
  } else {
    store.activeView = "dashboard";
  }
  render();
}

function savePersistentData() {
  const data = {
    tutors: store.tutors,
    pets: store.pets,
    nutritionPlans: store.nutritionPlans,
    nutritionPlanStages: store.nutritionPlanStages,
    ingredientLibrary: store.ingredientLibrary,
    adviceLibrary: store.adviceLibrary,
    supplementLibrary: store.supplementLibrary,
    cookingLibrary: store.cookingLibrary,
    tutorMessageLibrary: store.tutorMessageLibrary,
    followups: store.followups,
    alerts: store.alerts,
    clinicalHistory: store.clinicalHistory,
    consultations: store.consultations,
    appointments: store.appointments,
    urgentRequests: store.urgentRequests,
    foods: store.foods,
    faqs: store.faqs,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadPersistentData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    [
      "tutors",
      "pets",
      "nutritionPlans",
      "nutritionPlanStages",
      "ingredientLibrary",
      "adviceLibrary",
      "supplementLibrary",
      "cookingLibrary",
      "tutorMessageLibrary",
      "followups",
      "alerts",
      "clinicalHistory",
      "consultations",
      "appointments",
      "urgentRequests",
      "foods",
      "faqs",
    ].forEach((key) => {
      if (Array.isArray(data[key])) {
        store[key] = data[key];
      }
    });
    if (!store.pets.some((pet) => pet.id === store.selectedPetId)) {
      store.selectedPetId = store.pets[0]?.id || "";
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function initializeRelationalData() {
  store.ingredientLibrary = store.ingredientLibrary.length ? store.ingredientLibrary : ingredientTemplates.map((item) => ({ id: crypto.randomUUID(), ...item }));
  store.adviceLibrary = store.adviceLibrary.length ? store.adviceLibrary : planAdviceTemplates.map((text) => ({ id: crypto.randomUUID(), text }));
  store.supplementLibrary = store.supplementLibrary.length ? store.supplementLibrary : supplementTemplates.map((item) => ({ id: crypto.randomUUID(), ...item }));
  store.cookingLibrary = store.cookingLibrary.length ? store.cookingLibrary : cookingTemplates.map((text) => ({ id: crypto.randomUUID(), text }));
  store.tutorMessageLibrary = store.tutorMessageLibrary.length ? store.tutorMessageLibrary : tutorMessageTemplates.map((text) => ({ id: crypto.randomUUID(), text }));
  store.pets.forEach((pet) => {
    pet.preVisitDocuments = Array.isArray(pet.preVisitDocuments) ? pet.preVisitDocuments : [];
    pet.tutorPortalEnabled = Boolean(pet.tutorPortalEnabled);
    if (!store.nutritionPlans.some((plan) => plan.patientId === pet.id)) {
      const planId = crypto.randomUUID();
      store.nutritionPlans.unshift({
        id: planId,
        patientId: pet.id,
        title: pet.plan?.length ? `Plan nutricional de ${pet.name}` : "Plan nutricional pendiente",
        objective: pet.nutrition?.goal || (pet.plan?.length ? "Transicion alimentaria" : "Definir objetivo"),
        startDate: toDateInput(today),
        estimatedDuration: "60 dias",
        status: pet.plan?.length ? "activo" : "borrador",
        observations: pet.notes || "",
        tutorVisible: true,
        createdAt: new Date().toISOString(),
      });
      (pet.plan || []).forEach((stage, index) => {
        store.nutritionPlanStages.push({
          id: crypto.randomUUID(),
          planId,
          patientId: pet.id,
          name: stage.stage || `Etapa ${index + 1}`,
          dayFrom: index * 15 + 1,
          dayTo: index === 0 ? 15 : index === 1 ? 35 : 60,
          objective: stage.detail || "",
          mealCount: stage.meals?.match(/\d+/)?.[0] || "2",
          mealDetailsText: stage.detail || "",
          supplements: "",
          allowedTreats: "",
          forbiddenFoods: pet.nutrition?.restrictedFoods || "",
          tutorNotes: stage.detail || "",
          transitionCriteria: "Revisar tolerancia digestiva, peso y adherencia antes de avanzar.",
          alarmSigns: ["Vomitos", "Diarrea", "Rechazo de alimento"],
          nextControlDate: "",
          status: index === 0 ? "activa" : "pendiente",
          createdAt: new Date().toISOString(),
        });
      });
    }
    store.nutritionPlanStages
      .filter((stage) => stage.patientId === pet.id)
      .forEach((stage) => {
        stage.durationType = stage.durationType || "por dias";
        stage.meals = stage.meals || {
          morning: "",
          afternoon: stage.mealDetailsText || "",
          night: "",
        };
      });
    store.nutritionPlans
      .filter((plan) => plan.patientId === pet.id)
      .forEach((plan) => {
        plan.tutorId = plan.tutorId || pet.tutorId;
        plan.planType = plan.planType || (plan.objective?.includes("Transicion") ? "Transicion a natural" : "Cocida");
        plan.patientSnapshot = plan.patientSnapshot || {
          name: pet.name,
          species: pet.species,
          sex: pet.sex || "",
          breed: pet.breed,
          age: pet.age,
          weight: pet.weight,
          bodyScore: pet.bodyScore,
          diseases: pet.pathologies || "",
          history: pet.notes || "",
          measures: "",
        };
        plan.advice = Array.isArray(plan.advice) && plan.advice.length ? plan.advice : planAdviceTemplates.slice();
        plan.ingredients = Array.isArray(plan.ingredients) && plan.ingredients.length ? plan.ingredients : ingredientTemplates.slice(0, pet.id === "mora" ? 10 : 6).map((item) => ({ id: crypto.randomUUID(), ...item, amount: "", frequency: "", observations: "", visible: true }));
        plan.cookingNotes = Array.isArray(plan.cookingNotes) && plan.cookingNotes.length ? plan.cookingNotes : cookingTemplates.slice();
        plan.dailyRation = plan.dailyRation || { total: pet.nutrition?.dailyAmount || "A definir", details: "" };
        plan.supplements = Array.isArray(plan.supplements) && plan.supplements.length ? plan.supplements : supplementTemplates.slice(0, 3).map((item) => ({ id: crypto.randomUUID(), ...item, administration: item.indication, visible: true }));
        plan.supplementSchedule = plan.supplementSchedule || {};
        plan.tutorMessage = plan.tutorMessage || tutorMessageTemplates.join("\n");
        plan.pdfExports = Array.isArray(plan.pdfExports) ? plan.pdfExports : [];
      });
    if (!store.followups.some((item) => item.patientId === pet.id) && Array.isArray(pet.weights) && pet.weights.length) {
      const lastWeight = pet.weights[pet.weights.length - 1];
      store.followups.unshift({
        id: crypto.randomUUID(),
        patientId: pet.id,
        date: toDateInput(today),
        weight: lastWeight,
        bodyScore: parseInt(pet.bodyScore, 10) || "",
        measure: "",
        generalStatus: pet.status?.includes("Urgencia") ? "Alerta" : "En progreso",
        signs: {},
        adherence: { planCompliance: "Pendiente" },
        professional: { nextAction: "Mantener plan", clinicalNotes: pet.notes || "" },
        alerts: [],
        createdAt: new Date().toISOString(),
      });
    }
  });

  store.urgentRequests.forEach((request) => {
    const alreadyMigrated = store.alerts.some((alert) => alert.sourceId === request.id);
    if (alreadyMigrated) return;
    store.alerts.unshift({
      id: crypto.randomUUID(),
      patientId: request.petId,
      sourceType: "urgencia",
      sourceId: request.id,
      type: "Solicitud de urgencia",
      severity: request.severity || "Media",
      status: request.status === "Resuelta" ? "revisada" : "activa",
      description: request.reason,
      createdAt: new Date().toISOString(),
    });
  });
}

function getRequiredText(data, key) {
  return data.get(key)?.toString().trim() || "";
}

function createNewPatient(form) {
  const data = new FormData(form);
  const petName = getRequiredText(data, "petName");
  const species = getRequiredText(data, "species");
  const tutorFirstName = getRequiredText(data, "tutorFirstName");
  const tutorLastName = getRequiredText(data, "tutorLastName");
  const tutorDni = getRequiredText(data, "tutorDni");
  const tutorEmail = getRequiredText(data, "tutorEmail");
  const weight = Number(getRequiredText(data, "weight"));

  if (!petName || !species || !tutorFirstName || !tutorLastName || (!tutorDni && !tutorEmail)) {
    alert("Completá nombre del animal, especie, tutor y DNI o email del tutor.");
    return;
  }

  const duplicate = store.pets.some((pet) => {
    const samePet = pet.name.toLowerCase() === petName.toLowerCase();
    const tutor = store.tutors.find((item) => item.id === pet.tutorId);
    const sameTutor = tutor && ((tutorDni && tutor.dni === tutorDni) || (tutorEmail && tutor.email === tutorEmail));
    return samePet && sameTutor;
  });
  if (duplicate) {
    alert("Ya existe un paciente con ese nombre vinculado a ese tutor.");
    return;
  }

  let tutor = store.tutors.find((item) => (tutorDni && item.dni === tutorDni) || (tutorEmail && item.email === tutorEmail));
  if (!tutor) {
    tutor = {
      id: crypto.randomUUID(),
      firstName: tutorFirstName,
      lastName: tutorLastName,
      dni: tutorDni || "Pendiente",
      email: tutorEmail || "Pendiente",
      phone: getRequiredText(data, "tutorPhone") || "Pendiente",
      address: getRequiredText(data, "tutorAddress") || "Pendiente",
      relationship: getRequiredText(data, "relationship") || "Tutor principal",
      notes: getRequiredText(data, "tutorNotes"),
      access: {
        enabled: data.get("enableTutorAccess") === "on",
        method: getRequiredText(data, "accessMethod") || "dni",
        status: getRequiredText(data, "accessStatus") || "pendiente",
      },
      createdAt: new Date().toISOString(),
    };
    store.tutors.push(tutor);
  } else {
    tutor.access = {
      enabled: data.get("enableTutorAccess") === "on",
      method: getRequiredText(data, "accessMethod") || tutor.access?.method || "dni",
      status: getRequiredText(data, "accessStatus") || tutor.access?.status || "pendiente",
    };
  }

  const pet = {
    id: crypto.randomUUID(),
    tutorId: tutor.id,
    name: petName,
    species,
    breed: getRequiredText(data, "breed") || "Sin especificar",
    sex: getRequiredText(data, "sex"),
    age: getRequiredText(data, "age") || "Pendiente",
    birthDate: getRequiredText(data, "birthDate"),
    weight: Number.isFinite(weight) ? weight : 0,
    targetWeight: Number(getRequiredText(data, "targetWeight")) || (Number.isFinite(weight) ? weight : 0),
    bodyScore: getRequiredText(data, "bodyScore") || "Pendiente",
    reproductiveStatus: getRequiredText(data, "reproductiveStatus"),
    activityLevel: getRequiredText(data, "activityLevel"),
    pathologies: getRequiredText(data, "pathologies"),
    allergies: getRequiredText(data, "allergies") || "No informadas",
    medication: getRequiredText(data, "medication") || "No informada",
    notes: getRequiredText(data, "notes") || "Sin observaciones generales.",
    tutor: `${tutor.firstName} ${tutor.lastName}`.trim(),
    phone: tutor.phone,
    email: tutor.email,
    status: "Pendiente plan",
    preVisitDocuments: [],
    tutorPortalEnabled: false,
    documents: [],
    reminders: ["Completar estudios iniciales", "Definir plan nutricional"],
    weights: Number.isFinite(weight) ? [weight] : [],
    nutrition: {
      currentFoodType: getRequiredText(data, "currentFoodType"),
      currentFoodBrand: getRequiredText(data, "currentFoodBrand"),
      dailyAmount: getRequiredText(data, "dailyAmount"),
      mealFrequency: getRequiredText(data, "mealFrequency"),
      snacks: getRequiredText(data, "snacks"),
      restrictedFoods: getRequiredText(data, "restrictedFoods"),
      goal: getRequiredText(data, "nutritionGoal"),
      notes: getRequiredText(data, "nutritionNotes"),
    },
    plan: [],
    createdAt: new Date().toISOString(),
  };

  store.pets.unshift(pet);
  store.nutritionPlans.unshift({
    id: crypto.randomUUID(),
    patientId: pet.id,
    title: "Plan nutricional pendiente",
    objective: pet.nutrition.goal || "Definir objetivo",
    breakfast: "",
    lunch: "",
    snack: "",
    dinner: "",
    indications: "Completar luego de revisar estudios y primera consulta.",
    status: "borrador",
    createdAt: new Date().toISOString(),
  });
  const consultation = {
    id: crypto.randomUUID(),
    patientId: pet.id,
    date: toDateInput(today),
    reason: "Alta inicial",
    diagnosis: "",
    indications: "Pendiente evaluacion profesional.",
    observations: pet.notes,
    createdAt: new Date().toISOString(),
  };
  store.consultations.unshift(consultation);
  addClinicalHistory(pet.id, "paciente", pet.id, "Alta de paciente", `Paciente vinculado a ${pet.tutor}.`, toDateInput(today));
  addClinicalHistory(pet.id, "consulta", consultation.id, "Consulta inicial pendiente", consultation.indications, consultation.date);

  store.selectedPetId = pet.id;
  store.patientMode = "detail";
  savePersistentData();
  alert("Paciente guardado y vinculado al tutor.");
  render();
}

function createFollowup(form) {
  const data = new FormData(form);
  const patientId = store.selectedPetId;
  const weight = Number(getRequiredText(data, "weight"));
  const bodyScore = getRequiredText(data, "bodyScore");
  const date = getRequiredText(data, "date") || toDateInput(today);
  if (!Number.isFinite(weight)) {
    alert("Completá el peso actual del control.");
    return;
  }
  const selectedAlerts = data.getAll("alerts").map((item) => item.toString());
  const signs = {
    apetite: getRequiredText(data, "apetite"),
    water: getRequiredText(data, "water"),
    stool: getRequiredText(data, "stool"),
    vomiting: getRequiredText(data, "vomiting"),
    activity: getRequiredText(data, "activity"),
    energy: getRequiredText(data, "energy"),
    tutorChanges: getRequiredText(data, "tutorChanges"),
  };
  const followup = {
    id: crypto.randomUUID(),
    patientId,
    date,
    weight,
    bodyScore,
    measure: getRequiredText(data, "measure"),
    generalStatus: getRequiredText(data, "generalStatus"),
    signs,
    adherence: {
      planCompliance: getRequiredText(data, "planCompliance"),
      mealsRespected: getRequiredText(data, "mealsRespected"),
      extraSnacks: getRequiredText(data, "extraSnacks"),
      difficulties: getRequiredText(data, "difficulties"),
    },
    professional: {
      clinicalNotes: getRequiredText(data, "clinicalNotes"),
      recommendedAdjustment: getRequiredText(data, "recommendedAdjustment"),
      nextAction: getRequiredText(data, "nextAction"),
    },
    alerts: selectedAlerts,
    nextControlDate: getRequiredText(data, "nextControlDate"),
    createdAt: new Date().toISOString(),
  };
  store.followups.unshift(followup);
  updatePatientWeight(patientId, weight, bodyScore);

  const automaticAlerts = [];
  if (signs.stool === "Diarrea") automaticAlerts.push("Diarrea persistente");
  if (signs.vomiting === "Si") automaticAlerts.push("Vomitos");
  if (followup.adherence.planCompliance === "Malo") automaticAlerts.push("Baja adherencia");
  [...new Set([...selectedAlerts, ...automaticAlerts])].forEach((type) => {
    createClinicalAlert({
      patientId,
      sourceType: "seguimiento",
      sourceId: followup.id,
      type,
      severity: ["Vomitos", "Diarrea persistente", "Perdida rapida de peso", "Requiere consulta"].includes(type) ? "Alta" : "Media",
      description: `Alerta generada desde control de seguimiento del ${formatDateLabel(date)}.`,
    });
  });

  const plan = getActivePlan(patientId);
  if (plan && followup.professional.nextAction) {
    plan.lastRecommendation = followup.professional.nextAction;
    plan.lastRecommendationSourceId = followup.id;
  }
  if (followup.nextControlDate) {
    createSuggestedAppointment(patientId, followup.nextControlDate, "Control nutricional");
  }
  addClinicalHistory(
    patientId,
    "seguimiento",
    followup.id,
    "Control de seguimiento",
    `${weight} kg · ${followup.generalStatus}. ${followup.professional.nextAction || ""}`,
    date
  );
  store.followupMode = "view";
  savePersistentData();
  alert("Control guardado y vinculado al paciente.");
  render();
}

function createPlan(form) {
  const data = new FormData(form);
  const patientId = store.selectedPetId;
  const title = getRequiredText(data, "planTitle");
  if (!title) {
    alert("Completá el nombre del plan.");
    return;
  }
  store.nutritionPlans
    .filter((plan) => plan.patientId === patientId)
    .forEach((plan) => {
      if (getRequiredText(data, "status") === "activo") plan.status = "borrador";
    });
  const ingredients = parseIngredients(getRequiredText(data, "ingredientsText"), data.getAll("ingredientPreset").map((item) => item.toString()));
  const supplements = parseSupplements(getRequiredText(data, "supplementsText"), data.getAll("supplementPreset").map((item) => item.toString()));
  const planData = {
    patientId,
    tutorId: getPet(patientId).tutorId,
    title,
    planType: getRequiredText(data, "planType"),
    startDate: getRequiredText(data, "startDate") || toDateInput(today),
    estimatedDuration: getRequiredText(data, "duration") || "60 dias",
    objective: getRequiredText(data, "objective"),
    status: getRequiredText(data, "status") || "borrador",
    observations: getRequiredText(data, "observations"),
    nextControlDate: getRequiredText(data, "nextControlDate"),
    patientSnapshot: {
      name: getRequiredText(data, "patientName"),
      species: getRequiredText(data, "patientSpecies"),
      sex: getRequiredText(data, "patientSex"),
      breed: getRequiredText(data, "patientBreed"),
      age: getRequiredText(data, "patientAge"),
      weight: getRequiredText(data, "patientWeight"),
      bodyScore: getRequiredText(data, "patientBodyScore"),
      diseases: getRequiredText(data, "patientDiseases"),
      history: getRequiredText(data, "patientHistory"),
      measures: getRequiredText(data, "patientMeasures"),
    },
    advice: splitLines(getRequiredText(data, "adviceText")),
    ingredients,
    cookingNotes: splitLines(getRequiredText(data, "cookingNotes")),
    dailyRation: {
      total: getRequiredText(data, "dailyTotal"),
      details: getRequiredText(data, "dailyRationText"),
    },
    supplements,
    supplementSchedule: getSupplementSchedule(data, supplements),
    tutorMessage: getRequiredText(data, "tutorMessage"),
    tutorVisible: true,
  };
  let plan = store.editingPlanId ? store.nutritionPlans.find((item) => item.id === store.editingPlanId) : null;
  if (plan) {
    Object.assign(plan, planData, { updatedAt: new Date().toISOString() });
  } else {
    plan = {
      id: crypto.randomUUID(),
      ...planData,
      pdfExports: [],
      createdAt: new Date().toISOString(),
    };
    store.nutritionPlans.unshift(plan);
  }
  const pet = getPet(patientId);
  pet.status = plan.status === "activo" ? "Plan activo" : "Plan en borrador";
  const nextControlDate = plan.nextControlDate;
  if (data.get("createAppointment") === "on" && nextControlDate) {
    createSuggestedAppointment(patientId, nextControlDate, "Control de plan alimentario");
  }
  if (data.get("saveIngredientTemplate") === "on") {
    saveReusablePlanOptions(plan);
  }
  if (plan.tutorMessage?.toLowerCase().includes("foto")) {
    pet.reminders = Array.isArray(pet.reminders) ? pet.reminders : [];
    pet.reminders.unshift("Enviar fotos de evolucion segun mensaje del plan.");
  }
  addClinicalHistory(patientId, "plan_alimentario", plan.id, store.editingPlanId ? "Plan alimentario editado" : "Nuevo plan alimentario", `${title} · ${plan.objective}`, plan.startDate);
  store.planMode = "view";
  store.editingPlanId = "";
  savePersistentData();
  alert("Plan guardado y vinculado al paciente.");
  render();
}

function savePlanStage(form) {
  const data = new FormData(form);
  const patientId = store.selectedPetId;
  const plan = getActivePlan(patientId);
  if (!plan) return;
  const stageData = {
    planId: plan.id,
    patientId,
    name: getRequiredText(data, "stageName"),
    durationType: getRequiredText(data, "durationType"),
    dayFrom: Number(getRequiredText(data, "dayFrom")) || 1,
    dayTo: Number(getRequiredText(data, "dayTo")) || 15,
    dateFrom: getRequiredText(data, "dateFrom"),
    dateTo: getRequiredText(data, "dateTo"),
    objective: getRequiredText(data, "stageObjective"),
    mealCount: getRequiredText(data, "mealCount"),
    meals: {
      morning: getRequiredText(data, "mealMorning"),
      afternoon: getRequiredText(data, "mealAfternoon"),
      night: getRequiredText(data, "mealNight"),
    },
    mealDetailsText: getRequiredText(data, "mealDetails"),
    supplements: getRequiredText(data, "supplements"),
    allowedTreats: getRequiredText(data, "allowedTreats"),
    forbiddenFoods: getRequiredText(data, "forbiddenFoods"),
    tutorNotes: getRequiredText(data, "tutorNotes"),
    transitionCriteria: getRequiredText(data, "transitionCriteria"),
    alarmSigns: data.getAll("alarmSigns").map((item) => item.toString()),
    nextControlDate: getRequiredText(data, "nextControlDate"),
    status: getRequiredText(data, "stageStatus") || "pendiente",
  };
  if (!stageData.name) {
    alert("Completá el nombre de la etapa.");
    return;
  }
  if (stageData.status === "activa") {
    store.nutritionPlanStages
      .filter((stage) => stage.planId === plan.id)
      .forEach((stage) => {
        stage.status = "pendiente";
      });
  }
  let stage = store.nutritionPlanStages.find((item) => item.id === store.editingStageId);
  if (stage) {
    Object.assign(stage, stageData, { updatedAt: new Date().toISOString() });
  } else {
    stage = {
      id: crypto.randomUUID(),
      ...stageData,
      createdAt: new Date().toISOString(),
    };
    store.nutritionPlanStages.push(stage);
  }
  if (stage.alarmSigns.length) {
    createClinicalAlert({
      patientId,
      sourceType: "plan_alimentario",
      sourceId: stage.id,
      type: "Senales de alarma en plan",
      severity: "Media",
      description: `Etapa ${stage.name}: ${stage.alarmSigns.join(", ")}.`,
    });
  }
  if (stage.nextControlDate) {
    createSuggestedAppointment(patientId, stage.nextControlDate, "Control al finalizar etapa");
  }
  if (stage.status === "activa") {
    plan.activeStageId = stage.id;
    plan.lastRecommendation = `Etapa activa: ${stage.name}`;
  }
  addClinicalHistory(patientId, "plan_alimentario", stage.id, stageData.status === "activa" ? "Etapa activa" : "Etapa de plan actualizada", stage.name, toDateInput(today));
  store.planMode = "view";
  store.editingStageId = "";
  savePersistentData();
  alert("Etapa guardada.");
  render();
}

function saveReusablePlanOptions(plan) {
  plan.ingredients.forEach((ingredient) => {
    if (!store.ingredientLibrary.some((item) => item.name?.toLowerCase() === ingredient.name?.toLowerCase())) {
      store.ingredientLibrary.push({ id: crypto.randomUUID(), ...ingredient });
    }
  });
  plan.advice.forEach((text) => {
    if (!store.adviceLibrary.some((item) => item.text?.toLowerCase() === text.toLowerCase())) {
      store.adviceLibrary.push({ id: crypto.randomUUID(), text });
    }
  });
  plan.supplements.forEach((supplement) => {
    if (!store.supplementLibrary.some((item) => item.name?.toLowerCase() === supplement.name?.toLowerCase())) {
      store.supplementLibrary.push({ id: crypto.randomUUID(), ...supplement });
    }
  });
  plan.cookingNotes.forEach((text) => {
    if (!store.cookingLibrary.some((item) => item.text?.toLowerCase() === text.toLowerCase())) {
      store.cookingLibrary.push({ id: crypto.randomUUID(), text });
    }
  });
  if (plan.tutorMessage && !store.tutorMessageLibrary.some((item) => item.text?.toLowerCase() === plan.tutorMessage.toLowerCase())) {
    store.tutorMessageLibrary.push({ id: crypto.randomUUID(), text: plan.tutorMessage });
  }
}

function handleStageAction(action, stageId) {
  const stage = store.nutritionPlanStages.find((item) => item.id === stageId);
  if (!stage) return;
  if (action === "edit") {
    navigateTo("plans", { planMode: "stage", editingStageId: stage.id });
    return;
  }
  if (action === "delete") {
    if (!confirm("Eliminar esta etapa del plan?")) return;
    store.nutritionPlanStages = store.nutritionPlanStages.filter((item) => item.id !== stage.id);
  }
  if (action === "duplicate") {
    store.nutritionPlanStages.push({
      ...stage,
      id: crypto.randomUUID(),
      name: `${stage.name} copia`,
      status: "pendiente",
      createdAt: new Date().toISOString(),
    });
  }
  if (action === "active") {
    store.nutritionPlanStages
      .filter((item) => item.planId === stage.planId)
      .forEach((item) => {
        item.status = item.id === stage.id ? "activa" : "pendiente";
      });
  }
  if (action === "completed") {
    stage.status = "completada";
  }
  addClinicalHistory(stage.patientId, "plan_alimentario", stage.id, "Etapa de plan actualizada", `${stage.name} · ${action}`, toDateInput(today));
  savePersistentData();
  render();
}

function exportPlanPdf(planId) {
  const plan = store.nutritionPlans.find((item) => item.id === planId);
  if (!plan) return;
  const pet = getPet(plan.patientId);
  const tutor = store.tutors.find((item) => item.id === pet.tutorId);
  const stages = getPlanStages(plan.id);
  plan.pdfExports = Array.isArray(plan.pdfExports) ? plan.pdfExports : [];
  plan.pdfExports.unshift({ id: crypto.randomUUID(), exportedAt: new Date().toISOString() });
  savePersistentData();
  const html = buildPlanPdfHtml(plan, pet, tutor, stages);
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("El navegador bloqueo la ventana de exportacion. Habilita ventanas emergentes para descargar el PDF.");
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 400);
}

function buildPlanPdfHtml(plan, pet, tutor, stages) {
  const activeStage = stages.find((stage) => stage.status === "activa") || stages[0];
  return `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>${appConfig.appName} · ${plan.title}</title>
        <style>
          body { margin: 0; padding: 32px; font-family: Inter, Arial, sans-serif; color: #21342b; background: #fff; }
          .pdf-shell { max-width: 980px; margin: 0 auto; }
          .pdf-header { display: flex; justify-content: space-between; gap: 20px; border-bottom: 4px solid #8e6bb8; padding-bottom: 18px; margin-bottom: 24px; }
          .brand { color: #6f4ca0; font-size: 28px; font-weight: 900; }
          h1 { margin: 10px 0 0; font-size: 24px; }
          h2 { margin: 0 0 10px; color: #4f8f6b; font-size: 18px; }
          h3 { margin: 14px 0 8px; font-size: 15px; }
          p, li { line-height: 1.5; font-size: 13px; }
          .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
          .card { border: 1px solid #dce7df; border-radius: 10px; padding: 14px; margin-bottom: 14px; background: #fbfdf9; break-inside: avoid; }
          .tag { display: inline-block; padding: 4px 8px; border-radius: 999px; background: #eee7f6; color: #6f4ca0; font-size: 11px; font-weight: 800; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { border: 1px solid #dce7df; padding: 7px; text-align: left; vertical-align: top; }
          th { background: #f3edf8; color: #6f4ca0; }
          @media print { body { padding: 20px; } .card { break-inside: avoid; } }
        </style>
      </head>
      <body>
        <main class="pdf-shell">
          <header class="pdf-header">
            <div>
              <div class="brand">${appConfig.appName}</div>
              <h1>${plan.title}</h1>
              <p>${plan.planType || "Plan alimentario"} · ${formatDateLabel(plan.startDate)} · ${plan.estimatedDuration || "Duracion a definir"}</p>
            </div>
            <div>
              <span class="tag">${plan.status}</span>
              <p>Fecha de emision: ${new Date().toLocaleDateString("es-AR")}</p>
              <p>Profesional: ${appConfig.clinicName} Vet</p>
            </div>
          </header>
          <section class="grid">
            <article class="card">
              <h2>Paciente</h2>
              <p><strong>${pet.name}</strong> · ${pet.species} · ${pet.breed}</p>
              <p>Edad: ${pet.age} · Peso: ${pet.weight} kg · Condicion: ${pet.bodyScore}</p>
              <p>${plan.patientSnapshot?.history || pet.notes || ""}</p>
            </article>
            <article class="card">
              <h2>Tutor</h2>
              <p>${pet.tutor}</p>
              <p>${tutor?.email || pet.email || ""} · ${tutor?.phone || pet.phone || ""}</p>
              <p><strong>Objetivo:</strong> ${plan.objective || "Pendiente"}</p>
            </article>
          </section>
          ${pdfListSection("Consejos antes de comenzar", plan.advice)}
          ${pdfTableSection("Ingredientes permitidos", ["Ingrediente", "Categoria", "Cantidad", "Unidad", "Frecuencia", "Coccion"], (plan.ingredients || []).filter((item) => item.visible !== false).map((item) => [item.name, item.category, item.amount, item.unit, item.frequency, item.cooking]))}
          ${pdfListSection("Coccion y preparacion", plan.cookingNotes)}
          <article class="card"><h2>Racion diaria</h2><p><strong>${plan.dailyRation?.total || "A definir"}</strong></p><p>${(plan.dailyRation?.details || "").replaceAll("\n", "<br>")}</p></article>
          ${pdfTableSection("Etapas del plan", ["Etapa", "Duracion", "Mañana", "Tarde", "Noche", "Indicaciones"], stages.map((stage) => [stage.name, stage.durationType || `Dias ${stage.dayFrom}-${stage.dayTo}`, stage.meals?.morning || "", stage.meals?.afternoon || "", stage.meals?.night || "", stage.mealDetailsText || ""]))}
          ${pdfTableSection("Suplementacion", ["Suplemento", "Dosis", "Frecuencia", "Administracion", "Conservacion"], (plan.supplements || []).filter((item) => item.visible !== false).map((item) => [item.name, `${item.dose || ""} ${item.unit || ""}`, item.frequency || "", item.administration || item.indication || "", item.storage || ""]))}
          ${pdfScheduleSection(plan)}
          <article class="card"><h2>Mensaje final para el tutor</h2><p>${(plan.tutorMessage || "").replaceAll("\n", "<br>")}</p></article>
          ${activeStage ? `<article class="card"><h2>Etapa activa</h2><p>${activeStage.name} · ${activeStage.tutorNotes || activeStage.objective || ""}</p></article>` : ""}
        </main>
      </body>
    </html>
  `;
}

function pdfListSection(title, items = []) {
  if (!items.length) return "";
  return `<article class="card"><h2>${title}</h2><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`;
}

function pdfTableSection(title, headers, rows = []) {
  if (!rows.length) return "";
  return `
    <article class="card">
      <h2>${title}</h2>
      <table>
        <thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell || ""}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </article>
  `;
}

function pdfScheduleSection(plan) {
  const schedule = plan.supplementSchedule || {};
  const supplements = Object.keys(schedule).filter((name) => schedule[name]?.length);
  if (!supplements.length) return "";
  const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  return pdfTableSection("Esquema semanal de suplementacion", ["Suplemento", ...days], supplements.map((name) => [name, ...days.map((day) => schedule[name].includes(day) ? "Si" : "")]));
}

function saveTutorDocuments(form) {
  const input = form.querySelector('input[type="file"]');
  const files = Array.from(input?.files || []);
  if (!files.length) {
    alert("Selecciona al menos un archivo.");
    return;
  }
  const pet = getTutorPet();
  pet.preVisitDocuments = Array.isArray(pet.preVisitDocuments) ? pet.preVisitDocuments : [];
  const newDocs = files.map((file) => ({
    id: crypto.randomUUID(),
    name: file.name,
    type: file.type || file.name.split(".").pop()?.toUpperCase() || "Archivo",
    size: file.size,
    uploadedAt: new Date().toISOString(),
    status: "Cargado",
  }));
  pet.preVisitDocuments.push(...newDocs);
  pet.documents = Array.isArray(pet.documents) ? pet.documents : [];
  newDocs.forEach((doc) => {
    if (!pet.documents.includes(doc.name)) {
      pet.documents.push(doc.name);
    }
  });
  addClinicalHistory(
    pet.id,
    "documentacion",
    newDocs[0].id,
    "Documentacion preconsulta cargada",
    `${newDocs.length} archivo(s): ${newDocs.map((doc) => doc.name).join(", ")}`,
    toDateInput(today)
  );
  savePersistentData();
  alert("Documentacion guardada. Ya podes solicitar un turno comun.");
  navigateTo("tutor-calendar");
}

function getTutorLockMessage(id) {
  if (id === "tutor-calendar") {
    return "Primero carga la documentacion para habilitar turnos comunes. Las urgencias siguen disponibles.";
  }
  if (id === "tutor-pet" || id === "tutor-plan") {
    return "Esta seccion se habilita despues del turno, cuando la veterinaria active el acceso del tutor.";
  }
  return "Seccion no habilitada.";
}

function bindEvents() {
  document.querySelectorAll("[data-agenda-date]").forEach((select) => {
    select.addEventListener("change", () => {
      store.activeCalendarDate = select.value;
      render();
    });
  });

  document.querySelectorAll("[data-active-patient]").forEach((select) => {
    select.addEventListener("change", () => {
      store.selectedPetId = select.value;
      if (store.activeView === "patients") {
        store.patientDetailOpen = true;
      }
      store.followupMode = "view";
      store.planMode = "view";
      store.editingStageId = "";
      render();
    });
  });

  document.querySelectorAll("[data-login-role-select]").forEach((select) => {
    select.addEventListener("change", () => {
      store.activeRole = select.value;
      render();
    });
  });

  document.querySelectorAll("[data-login-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const role = new FormData(form).get("role");
      store.activeRole = role || store.activeRole;
      store.isAuthenticated = true;
      store.activeView = getHomeView();
      store.navigationHistory = [];
      store.patientMode = "detail";
      store.patientDetailOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      store.isAuthenticated = false;
      store.activeView = getHomeView();
      store.navigationHistory = [];
      store.patientMode = "detail";
      store.patientDetailOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-back-home]").forEach((button) => {
    button.addEventListener("click", () => {
      goBack();
    });
  });

  document.querySelectorAll("[data-patient-back]").forEach((button) => {
    button.addEventListener("click", () => {
      store.patientDetailOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      if (store.activeRole === "tutor" && isTutorModuleLocked(button.dataset.view)) {
        alert(getTutorLockMessage(button.dataset.view));
        return;
      }
      navigateTo(button.dataset.view, {
        selectedPetId: button.dataset.pet,
        patientMode: button.dataset.patientMode || "detail",
        patientDetailOpen: Boolean(button.dataset.pet),
      });
    });
  });

  document.querySelectorAll("[data-patient-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.patientMode;
      if (mode === "new") {
        navigateTo("patients", { patientMode: "new" });
      } else {
        goBack();
      }
    });
  });

  document.querySelectorAll("[data-role]").forEach((button) => {
    button.addEventListener("click", () => {
      store.activeRole = button.dataset.role;
      store.activeView = getHomeView();
      store.navigationHistory = [];
      store.patientDetailOpen = false;
      store.patientDetailOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-pet]").forEach((button) => {
    button.addEventListener("click", () => {
      store.selectedPetId = button.dataset.pet;
    });
  });

  document.querySelectorAll("[data-toggle-faq]").forEach((button) => {
    button.addEventListener("click", () => {
      const faq = store.faqs.find((item) => item.id === button.dataset.toggleFaq);
      faq.visible = !faq.visible;
      render();
    });
  });

  document.querySelectorAll("[data-new-patient-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      createNewPatient(form);
    });
  });

  document.querySelectorAll("[data-doc-upload-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      saveTutorDocuments(form);
    });
  });

  document.querySelectorAll("[data-toggle-tutor-access]").forEach((button) => {
    button.addEventListener("click", () => {
      const pet = getPet(button.dataset.toggleTutorAccess);
      pet.tutorPortalEnabled = !pet.tutorPortalEnabled;
      addClinicalHistory(
        pet.id,
        "vista_tutor",
        pet.id,
        pet.tutorPortalEnabled ? "Acceso del tutor habilitado" : "Acceso del tutor deshabilitado",
        pet.tutorPortalEnabled ? "El tutor puede ver ficha, plan e indicaciones." : "El tutor vuelve a tener acceso limitado.",
        toDateInput(today)
      );
      savePersistentData();
      render();
    });
  });

  document.querySelectorAll("[data-generate-access]").forEach((button) => {
    button.addEventListener("click", () => {
      alert("Acceso preparado. Cuando se conecte Supabase, esto enviara la invitacion al tutor.");
    });
  });

  document.querySelectorAll("[data-followup-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.followupMode;
      if (mode === "new") {
        navigateTo("followup", { followupMode: "new" });
      } else {
        goBack();
      }
    });
  });

  document.querySelectorAll("[data-new-followup-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      createFollowup(form);
    });
  });

  document.querySelectorAll("[data-plan-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.planMode;
      if (mode === "new" || mode === "stage") {
        navigateTo("plans", { planMode: mode, editingStageId: "" });
      } else {
        goBack();
      }
    });
  });

  document.querySelectorAll("[data-edit-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      navigateTo("plans", { planMode: "new", editingPlanId: button.dataset.editPlan });
    });
  });

  document.querySelectorAll("[data-export-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      exportPlanPdf(button.dataset.exportPlan);
    });
  });

  document.querySelectorAll("[data-new-plan-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      createPlan(form);
    });
  });

  document.querySelectorAll("[data-stage-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      savePlanStage(form);
    });
  });

  document.querySelectorAll("[data-stage-action]").forEach((button) => {
    button.addEventListener("click", () => {
      handleStageAction(button.dataset.stageAction, button.dataset.stageId);
    });
  });

  document.querySelectorAll("[data-resolve-alert]").forEach((button) => {
    button.addEventListener("click", () => {
      const alertItem = store.alerts.find((item) => item.id === button.dataset.resolveAlert);
      if (!alertItem) return;
      alertItem.status = "revisada";
      addClinicalHistory(alertItem.patientId, "alerta", alertItem.id, "Alerta revisada", alertItem.type || "Alerta clinica", toDateInput(today));
      savePersistentData();
      render();
    });
  });

  document.querySelectorAll("[data-add-faq]").forEach((button) => {
    button.addEventListener("click", () => {
      const question = prompt("Nueva pregunta frecuente");
      if (!question) return;
      const answer = prompt("Respuesta visible para tutores") || "Respuesta pendiente de completar.";
      store.faqs.unshift({
        id: crypto.randomUUID(),
        category: "General",
        question,
        answer,
        visible: true,
      });
      savePersistentData();
      render();
    });
  });

  document.querySelectorAll("[data-add-food]").forEach((button) => {
    button.addEventListener("click", () => {
      const name = prompt("Nombre del alimento o receta");
      if (!name) return;
      store.foods.unshift({
        name,
        group: "Personalizado",
        use: "Uso pendiente de completar por la veterinaria.",
        cautions: "Revisar indicaciones segun paciente.",
      });
      savePersistentData();
      render();
    });
  });

  document.querySelectorAll("[data-add-stage]").forEach((button) => {
    button.addEventListener("click", () => {
      const pet = getPet(store.selectedPetId);
      pet.plan.push({
        stage: `Nueva etapa ${pet.plan.length + 1}`,
        meals: "Definir frecuencia",
        detail: "Completar gramos, ingredientes, suplementos y observaciones.",
      });
      savePersistentData();
      render();
    });
  });

  document.querySelectorAll("[data-approve-urgent]").forEach((button) => {
    button.addEventListener("click", () => {
      const request = store.urgentRequests.find((item) => item.id === button.dataset.approveUrgent);
      if (!request) return;
      request.status = "Turno habilitado";
      const linkedAlert = store.alerts.find((item) => item.sourceId === request.id);
      if (linkedAlert) linkedAlert.status = "revisada";
      store.appointments.unshift({
        id: crypto.randomUUID(),
        date: "2026-06-05",
        time: "19:00",
        kind: "Urgencia habilitada",
        petId: request.petId,
        patientId: request.petId,
        tutorId: getPet(request.petId).tutorId,
        status: "A confirmar por tutor",
      });
      savePersistentData();
      alert("Se habilito un turno urgente y quedo listo para notificar al tutor.");
      render();
    });
  });

  document.querySelectorAll("[data-book-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      if (store.activeRole === "tutor" && !hasTutorPreVisitDocs()) {
        alert("Primero carga la documentacion para habilitar turnos comunes. Las urgencias siguen disponibles.");
        navigateTo("tutor-docs");
        return;
      }
      const [date, time] = button.dataset.bookSlot.split("|");
      const slotTaken = store.appointments.some((item) => item.date === date && item.time === time);
      if (slotTaken) {
        alert("Ese horario ya no esta disponible.");
        render();
        return;
      }
      store.appointments.unshift({
        id: crypto.randomUUID(),
        date,
        time,
        kind: "Consulta solicitada",
        petId: "mora",
        patientId: "mora",
        tutorId: getPet("mora").tutorId,
        status: "Pendiente",
      });
      savePersistentData();
      alert("Solicitud enviada a la veterinaria. El turno queda pendiente de confirmacion.");
      render();
    });
  });

  document.querySelectorAll("[data-upload-demo]").forEach((button) => {
    button.addEventListener("click", () => {
      alert("En produccion esto abrira Supabase Storage para cargar fotos, PDF y estudios.");
    });
  });

  document.querySelectorAll("[data-urgent-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const reason = data.get("reason")?.toString().trim();
      if (!reason) {
        alert("Contanos el motivo para enviar la alerta.");
        return;
      }
      store.urgentRequests.unshift({
        id: crypto.randomUUID(),
        petId: data.get("petId"),
        tutor: "Agustin Perez",
        reason,
        status: "Nueva",
        createdAt: "Ahora",
        severity: data.get("severity"),
      });
      const request = store.urgentRequests[0];
      createClinicalAlert({
        patientId: request.petId,
        sourceType: "urgencia",
        sourceId: request.id,
        type: "Solicitud de urgencia",
        severity: request.severity,
        description: reason,
      });
      savePersistentData();
      alert("La alerta fue enviada a la veterinaria.");
      store.activeRole = "vet";
      store.activeView = "dashboard";
      render();
    });
  });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

loadPersistentData();
initializeRelationalData();
savePersistentData();
render();
