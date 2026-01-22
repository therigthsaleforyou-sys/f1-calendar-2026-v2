/* ===============================
   DADOS BASE 2026
================================ */

const races2026 = [
  {
    slug: "australia",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    sessions: [
      { name: "FP1", date: "2026-03-06T02:00:00Z" },
      { name: "FP2", date: "2026-03-06T06:00:00Z" },
      { name: "FP3", date: "2026-03-07T02:00:00Z" },
      { name: "Qualificação", date: "2026-03-07T06:00:00Z" },
      { name: "Corrida", date: "2026-03-08T05:00:00Z" }
    ],
    technical: {
      length: "5.278 km",
      laps: 58,
      distance: "306.124 km",
      corners: 14,
      drs: 4
    },
    image: "assets/australia.jpg"
  }
];

/* ===============================
   FUNÇÕES UTILITÁRIAS
================================ */

function formatCountdown(targetDate) {
  const now = new Date();
  const diff = new Date(targetDate) - now;

  if (diff <= 0) return "Em curso";

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  return `${d}d ${h}h ${m}m ${s}s`;
}

function getNextSession() {
  const now = new Date();

  for (const race of races2026) {
    for (const session of race.sessions) {
      const date = new Date(session.date);
      if (date > now) {
        return {
          race: race.name,
          session: session.name,
          countdown: formatCountdown(date),
          slug: race.slug
        };
      }
    }
  }
  return null;
}

/* ===============================
   NAVEGAÇÃO
================================ */

function renderMenu() {
  return `
    <nav style="
      background:#000;
      padding:10px;
      display:flex;
      gap:10px;
      justify-content:center;
      border-bottom:2px solid #e10600;
    ">
      <a href="index.html"><button>🏠 Home</button></a>
      <a href="teams.html"><button>👥 Equipas</button></a>
      <button disabled>🏆 Pilotos</button>
      <button disabled>🏎️ Construtores</button>
    </nav>
  `;
}

function goToRace(slug) {
  window.location.href = `race.html?race=${slug}`;
}

/* ===============================
   HOME PAGE
================================ */

function renderHome() {
  const nextSession = getNextSession();

  if (!nextSession) {
    document.getElementById("app").innerHTML = "Sem dados disponíveis";
    return;
  }

  document.getElementById("app").innerHTML = `
    <header>
      <h1>F1 2026</h1>
      <p>Calendário Oficial</p>
    </header>

    ${renderMenu()}

    <section style="padding:20px">
      <div class="card">
        <h2>Próxima Corrida</h2>
        <h3>${nextSession.race}</h3>
        <p><strong>${nextSession.session}</strong></p>
        <div class="countdown">${nextSession.countdown}</div>
        <button onclick="goToRace('${nextSession.slug}')">Ver detalhes</button>
      </div>
    </section>

    <footer>F1 2026 – Projeto independente</footer>
  `;
}

/* ===============================
   RACE PAGE
================================ */

function renderRacePage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("race");

  const race = races2026.find(r => r.slug === slug);

  if (!race) {
    document.getElementById("app").innerHTML = "Corrida não encontrada";
    return;
  }

  const nextSession = race.sessions.find(
    s => new Date(s.date) > new Date()
  );

  document.getElementById("app").innerHTML = `
    <a href="index.html">⬅ Voltar</a>

    <h1>${race.name}</h1>

    <h2>Próxima Sessão</h2>
    <p>${nextSession.name}</p>
    <p>${formatCountdown(nextSession.date)}</p>

    <h2>Ficha Técnica</h2>
    <ul>
      <li>Extensão: ${race.technical.length}</li>
      <li>Voltas: ${race.technical.laps}</li>
      <li>Distância: ${race.technical.distance}</li>
      <li>Curvas: ${race.technical.corners}</li>
      <li>Zonas DRS: ${race.technical.drs}</li>
    </ul>

    <footer>F1 2026 – Projeto independente</footer>
  `;
}

/* ===============================
   ENTRY POINT
================================ */

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "race") {
    renderRacePage();
  } else {
    renderHome();
  }
});
