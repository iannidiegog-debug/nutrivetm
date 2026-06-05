import { appConfig } from "./config.js";

const today = new Date("2026-06-05T12:00:00-03:00");

const store = {
  activeRole: "vet",
  activeView: "dashboard",
  selectedPetId: "mora",
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
      time: "09:30",
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
      time: "16:30",
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
  { id: "settings", label: "Integraciones", icon: "settings" },
];

const tutorViews = [
  { id: "tutor-home", label: "Inicio", icon: "home" },
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
  app.innerHTML = `
    <main class="shell ${store.activeRole === "tutor" ? "tutor-mode" : ""}">
      ${renderSidebar()}
      <section class="workspace">
        ${renderTopbar()}
        ${store.activeRole === "vet" ? renderVetView() : renderTutorView()}
      </section>
    </main>
  `;
  bindEvents();
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
        <span class="eyebrow">Vista demo</span>
        <div class="segmented">
          <button class="${store.activeRole === "vet" ? "selected" : ""}" data-role="vet">Veterinaria</button>
          <button class="${store.activeRole === "tutor" ? "selected" : ""}" data-role="tutor">Tutor</button>
        </div>
      </div>
    </aside>
  `;
}

function renderTopbar() {
  const pendingDocs = store.pets.filter((pet) => pet.status.includes("Pendiente")).length;
  return `
    <header class="topbar">
      <div>
        <span class="eyebrow">Consultorio nutricional veterinario</span>
        <h1>${getTitle()}</h1>
      </div>
      <div class="top-actions">
        <button class="ghost-button" data-view="${store.activeRole === "vet" ? "calendar" : "tutor-urgent"}">
          <span class="icon">${icons.calendar}</span>
          ${store.activeRole === "vet" ? "Agenda" : "Solicitar urgencia"}
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

function getTitle() {
  const titles = {
    dashboard: "Panel de Melanie",
    calendar: "Agenda interna",
    patients: "Pacientes",
    plans: "Planes alimentarios",
    library: "Biblioteca BARF",
    faq: "Preguntas frecuentes",
    settings: "Integraciones",
    "tutor-home": "Hola, Agustin",
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
    "tutor-pet": renderTutorPet,
    "tutor-plan": renderTutorPlan,
    "tutor-faq": () => renderFaq({ tutor: true }),
    "tutor-urgent": renderTutorUrgent,
  };
  return (sections[store.activeView] || renderTutorHome)();
}

function renderDashboard() {
  return `
    <div class="dashboard-grid">
      <section class="hero-panel">
        <img src="nutrivetm-hero.png" alt="Consultorio veterinario moderno con perro y gato" />
        <div class="hero-copy">
          <span class="eyebrow">${appConfig.appName}</span>
          <h2>Nutricion veterinaria con legajo, agenda y seguimiento en un solo lugar.</h2>
          <p>Preparada para Supabase, notificaciones push, email y futura sincronizacion con Google Calendar.</p>
        </div>
      </section>
      <section class="metrics">
        ${metric("Pacientes activos", store.pets.length, "paw")}
        ${metric("Turnos proximos", store.appointments.length, "calendar")}
        ${metric("Urgencias", store.urgentRequests.length, "bell", "danger")}
        ${metric("FAQ visibles", store.faqs.filter((faq) => faq.visible).length, "help")}
      </section>
      <section class="panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Atencion prioritaria</span>
            <h2>Solicitudes de urgencia</h2>
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
            <h2>Pacientes para revisar</h2>
          </div>
          <button class="primary-button" data-view="plans">Armar plan</button>
        </div>
        <div class="patient-row-list">${store.pets.map(renderPatientRow).join("")}</div>
      </section>
    </div>
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
    <button class="patient-row" data-pet="${pet.id}" data-view="patients">
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
  const slots = ["09:00", "09:30", "10:00", "10:30", "11:00", "15:30", "16:00", "16:30", "17:00"];
  return `
    <div class="content-grid">
      <section class="panel wide">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Agenda interna</span>
            <h2>Disponibilidad y turnos</h2>
          </div>
          <button class="primary-button" data-add-appointment>Nuevo turno</button>
        </div>
        <div class="calendar-board">
          ${[0, 1, 2, 3, 4]
            .map((offset) => {
              const day = addDays(today, offset);
              return `
                <article class="day-column">
                  <h3>${day.toLocaleDateString("es-AR", { weekday: "short", day: "2-digit", month: "2-digit" })}</h3>
                  ${slots
                    .map((slot) => {
                      const apt = store.appointments.find(
                        (item) => item.date === toDateInput(day) && item.time === slot
                      );
                      return `
                        <button class="slot ${apt ? "busy" : ""}" data-slot="${toDateInput(day)}|${slot}">
                          <span>${slot}</span>
                          <small>${apt ? `${getPet(apt.petId).name} · ${apt.kind}` : "Libre"}</small>
                        </button>
                      `;
                    })
                    .join("")}
                </article>
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
        <p class="muted">El tutor no reserva automaticamente una urgencia. La app crea alerta, Melanie evalua y habilita un turno o responde con indicaciones.</p>
        <div class="stack">${store.urgentRequests.map(renderUrgency).join("")}</div>
      </section>
    </div>
  `;
}

function renderPatients() {
  const selected = getPet(store.selectedPetId);
  return `
    <div class="patient-layout">
      <section class="panel patient-list">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Legajos</span>
            <h2>Pacientes</h2>
          </div>
        </div>
        ${store.pets.map(renderPatientRow).join("")}
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
          <button class="primary-button" data-add-stage>Agregar etapa</button>
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
            <span class="eyebrow">${options.tutor ? "Centro de ayuda" : "Editable por Melanie"}</span>
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
          <h2>Integraciones</h2>
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
          <p>Subi peso, fotos y consultas desde aca para que Melanie pueda ajustar el plan.</p>
        </div>
      </section>
      <section class="metrics">
        ${metric("Peso actual", `${pet.weight} kg`, "weight")}
        ${metric("Recordatorios", pet.reminders.length, "bell")}
        ${metric("Documentos", pet.documents.length, "file")}
        ${metric("Etapas", pet.plan.length, "bowl")}
      </section>
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
          <p>Melanie puede actualizar las indicaciones despues de cada control nutricional.</p>
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
      <p class="muted">Esto no confirma un turno automatico. Melanie recibe una alerta, revisa el caso y habilita un espacio urgente o responde con indicaciones.</p>
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

function toDateInput(date) {
  return date.toISOString().slice(0, 10);
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.pet) {
        store.selectedPetId = button.dataset.pet;
      }
      store.activeView = button.dataset.view;
      render();
    });
  });

  document.querySelectorAll("[data-role]").forEach((button) => {
    button.addEventListener("click", () => {
      store.activeRole = button.dataset.role;
      store.activeView = store.activeRole === "vet" ? "dashboard" : "tutor-home";
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
        use: "Uso pendiente de completar por Melanie.",
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
        time: "18:30",
        kind: "Urgencia habilitada",
        petId: request.petId,
        status: "A confirmar por tutor",
      });
      alert("Se habilito un turno urgente y quedo listo para notificar al tutor.");
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
      alert("La alerta fue enviada a Melanie.");
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
