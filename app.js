import { appConfig } from "./config.js";

const today = new Date("2026-06-05T12:00:00-03:00");

const store = {
  isAuthenticated: false,
  activeRole: "vet",
  activeView: "home",
  selectedPetId: "mora",
  activeCalendarDate: "2026-06-06",
  patientDetailOpen: false,
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

const tutorViews = [
  { id: "tutor-home", label: "Inicio", icon: "home" },
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
  return `
    <button class="module-card" data-view="${item.id}">
      <span class="icon">${icons[item.icon]}</span>
      <span>
        <strong>${item.label}</strong>
        <small>${getMobileEntryText(item.id)}</small>
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
          ${store.urgentRequests.length} alerta
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
    library: "Biblioteca BARF",
    faq: "Preguntas frecuentes",
    settings: "Configuracion",
    "tutor-home": "Inicio",
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
    library: renderLibrary,
    faq: renderFaq,
    settings: renderSettings,
  };
  return (sections[store.activeView] || renderDashboard)();
}

function renderTutorView() {
  const sections = {
    "tutor-home": renderTutorHome,
    "tutor-calendar": renderTutorCalendar,
    "tutor-pet": renderTutorPet,
    "tutor-plan": renderTutorPlan,
    "tutor-faq": () => renderFaq({ tutor: true }),
    "tutor-urgent": renderTutorUrgent,
  };
  return (sections[store.activeView] || renderTutorHome)();
}

function renderDashboard() {
  const selected = getPet(store.selectedPetId);
  const activePlans = store.pets.filter((pet) => pet.plan.length > 0).length;
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
        ${metric("Pacientes en seguimiento", store.pets.length, "paw")}
        ${metric("Turnos proximos", store.appointments.length, "calendar")}
        ${metric("Alertas clinicas", store.urgentRequests.length, "bell", "danger")}
        ${metric("Planes activos", activePlans, "bowl")}
      </section>
      <section class="panel wide active-patient-panel clinical-file-panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Paciente activo</span>
            <h2>Ficha clinica de trabajo</h2>
          </div>
          <button class="soft-button" data-view="patients">Abrir legajo</button>
        </div>
        ${renderDashboardPatientCard(selected)}
      </section>
      ${renderMobileEntryGrid(views.filter((item) => item.id !== "dashboard"))}
      <section class="panel clinical-alert-panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Alertas clinicas</span>
            <h2>Atencion prioritaria</h2>
          </div>
          <button class="soft-button" data-view="calendar">Ver agenda</button>
        </div>
        <div class="stack">${store.urgentRequests.map(renderUrgency).join("")}</div>
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
      <section class="panel wide">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Seguimiento</span>
            <h2>Legajo seleccionado</h2>
          </div>
          <button class="primary-button" data-view="patients">Abrir legajo</button>
        </div>
        ${renderPatientPreview(selected)}
      </section>
    </div>
  `;
}

function renderDashboardTabs() {
  const items = [
    { label: "Pacientes", view: "patients", icon: "paw" },
    { label: "Plan nutricional", view: "plans", icon: "bowl" },
    { label: "Turnos", view: "calendar", icon: "calendar" },
    { label: "Seguimiento", view: "patients", icon: "weight" },
    { label: "Alertas", view: "dashboard", icon: "bell" },
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

function metric(label, value, icon, tone = "") {
  return `
    <article class="metric ${tone}">
      <span class="icon">${icons[icon]}</span>
      <strong>${value}</strong>
      <span>${label}</span>
    </article>
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
  return `
    <div class="patient-layout patient-select-layout">
      <section class="panel patient-picker-panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Legajos</span>
            <h2>Seleccionar paciente</h2>
          </div>
        </div>
        ${renderPatientSelect("patients-patient", selected.id)}
        <div class="patient-picker-summary">
          ${store.pets
            .map(
              (pet) => `
                <button class="mini-patient ${pet.id === selected.id ? "active" : ""}" data-pet="${pet.id}" data-view="patients">
                  <span class="avatar">${pet.name.slice(0, 1)}</span>
                  <span>
                    <strong>${pet.name}</strong>
                    <small>${pet.status}</small>
                  </span>
                </button>
              `
            )
            .join("")}
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
        <div class="tabs">
          <article>
            <h3>Documentacion</h3>
            ${selected.documents.map((doc) => `<p class="file-line"><span class="icon">${icons.file}</span>${doc}</p>`).join("")}
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
        ${renderWeightChart(selected)}
      </section>
    </div>
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

function renderPlans() {
  const selected = getPet(store.selectedPetId);
  return `
    <div class="content-grid">
      <section class="panel wide">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Plan a dos meses</span>
            <h2>${selected.name}</h2>
          </div>
          <div class="section-actions">
            ${renderPatientSelect("plans-patient", selected.id)}
            <button class="primary-button" data-add-stage>Agregar etapa</button>
          </div>
        </div>
        <div class="timeline">
          ${
            selected.plan.length
              ? selected.plan
                  .map(
                    (stage, index) => `
                      <article class="timeline-item">
                        <span>${index + 1}</span>
                        <div>
                          <h3>${stage.stage}</h3>
                          <p><strong>${stage.meals}</strong></p>
                          <p>${stage.detail}</p>
                        </div>
                      </article>
                    `
                  )
                  .join("")
              : `<div class="empty-state"><h3>Plan pendiente</h3><p>Cargar estudios y definir estrategia nutricional antes de activar el plan.</p></div>`
          }
        </div>
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Ayuda rapida</span>
            <h2>Plantillas</h2>
          </div>
        </div>
        <button class="template">Pedido de analisis inicial</button>
        <button class="template">Transicion alimentaria</button>
        <button class="template">Control cada 15 dias</button>
        <button class="template">Conservacion de alimentos</button>
      </section>
    </div>
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
  return `
    <div class="dashboard-grid">
      <section class="hero-panel tutor-hero">
        <img src="nutrivetm-hero.png" alt="Consultorio veterinario moderno con perro y gato" />
        <div class="hero-copy">
          <span class="eyebrow">Plan activo</span>
          <h2>${pet.name} tiene su seguimiento nutricional al dia.</h2>
          <p>Subi peso, fotos y consultas desde aca para que la veterinaria pueda ajustar el plan.</p>
        </div>
      </section>
      <section class="metrics">
        ${metric("Peso actual", `${pet.weight} kg`, "weight")}
        ${metric("Recordatorios", pet.reminders.length, "bell")}
        ${metric("Documentos", pet.documents.length, "file")}
        ${metric("Etapas", pet.plan.length, "bowl")}
      </section>
      ${renderMobileEntryGrid(tutorViews.filter((item) => item.id !== "tutor-home"))}
      <section class="panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Proximo paso</span>
            <h2>Documentacion</h2>
          </div>
          <button class="primary-button" data-upload-demo>Subir archivo</button>
        </div>
        <p class="muted">Cargar fotos actuales, estudios y peso nuevo ayuda a mantener el plan ajustado.</p>
        ${pet.documents.map((doc) => `<p class="file-line"><span class="icon">${icons.file}</span>${doc}</p>`).join("")}
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Recordatorios</span>
            <h2>Seguimiento</h2>
          </div>
        </div>
        ${pet.reminders.map((item) => `<p class="file-line"><span class="icon">${icons.bell}</span>${item}</p>`).join("")}
      </section>
    </div>
  `;
}

function renderMobileEntryGrid(list) {
  return `
    <section class="mobile-entry-grid">
      ${list
        .map(
          (item) => `
            <button class="mobile-entry" data-view="${item.id}">
              <span class="icon">${icons[item.icon]}</span>
              <span>
                <strong>${item.label}</strong>
                <small>${getMobileEntryText(item.id)}</small>
              </span>
            </button>
          `
        )
        .join("")}
    </section>
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

function renderTutorPet() {
  const pet = getPet("mora");
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
  return `
    <section class="panel wide">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Plan a dos meses</span>
          <h2>${pet.name}</h2>
        </div>
        <span class="badge">Lectura tutor</span>
      </div>
      <div class="timeline">
        ${pet.plan
          .map(
            (stage, index) => `
              <article class="timeline-item">
                <span>${index + 1}</span>
                <div>
                  <h3>${stage.stage}</h3>
                  <p><strong>${stage.meals}</strong></p>
                  <p>${stage.detail}</p>
                </div>
              </article>
            `
          )
          .join("")}
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
      store.patientDetailOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      store.isAuthenticated = false;
      store.activeView = getHomeView();
      store.patientDetailOpen = false;
      render();
    });
  });

  document.querySelectorAll("[data-back-home]").forEach((button) => {
    button.addEventListener("click", () => {
      store.activeView = getHomeView();
      store.patientDetailOpen = false;
      render();
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
      if (button.dataset.pet) {
        store.selectedPetId = button.dataset.pet;
        store.patientDetailOpen = true;
      }
      store.activeView = button.dataset.view;
      if (store.activeView !== "patients") {
        store.patientDetailOpen = false;
      } else if (!button.dataset.pet) {
        store.patientDetailOpen = false;
      }
      render();
    });
  });

  document.querySelectorAll("[data-role]").forEach((button) => {
    button.addEventListener("click", () => {
      store.activeRole = button.dataset.role;
      store.activeView = getHomeView();
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
      render();
    });
  });

  document.querySelectorAll("[data-approve-urgent]").forEach((button) => {
    button.addEventListener("click", () => {
      const request = store.urgentRequests.find((item) => item.id === button.dataset.approveUrgent);
      if (!request) return;
      request.status = "Turno habilitado";
      store.appointments.unshift({
        id: crypto.randomUUID(),
        date: "2026-06-05",
        time: "19:00",
        kind: "Urgencia habilitada",
        petId: request.petId,
        status: "A confirmar por tutor",
      });
      alert("Se habilito un turno urgente y quedo listo para notificar al tutor.");
      render();
    });
  });

  document.querySelectorAll("[data-book-slot]").forEach((button) => {
    button.addEventListener("click", () => {
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
        status: "Pendiente",
      });
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

render();
