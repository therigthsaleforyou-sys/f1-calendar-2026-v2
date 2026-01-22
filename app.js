// ==============================
// DADOS BASE
// ==============================

const races2026 = [
  {
    slug: "australia",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    date: "2026-03-08T05:00:00Z",
    sessions: [
      { name: "FP1", date: "2026-03-06T01:30:00Z" },
      { name: "FP2", date: "2026-03-06T05:00:00Z" },
      { name: "FP3", date: "2026-03-07T01:30:00Z" },
      { name: "Qualificação", date: "2026-03-07T05:00:00Z" },
      { name: "Corrida", date: "2026-03-08T05:00:00Z" }
    ],
    technical: {
      length: "5.278 km",
      laps: 58,
      distance: "306.124 km",
      corners: 14,
      drs: 4
    },
    race2025: {
      weather: "Sol e 24°C",
      pole: "1:15.915",
      fastestLap: "1:19.813",
      raceTime: "1h 31m 12s",
      podium: ["Max Verstappen", "Lando Norris", "Charles Leclerc"],
      notes: "Corrida marcada por Safety Car e estratégia agressiva nas boxes."
    }
  }
];

// ==============================
// FUNÇÕES UTILITÁRIAS
// ==============================

function formatCountdown(targetDate) {
  const diff = new Date(targetDate) - new Date();
  if (diff <= 0) return "Em curso ou terminado";

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  return `${d}d ${h}h ${m}m ${s}s`;
}

function getNextSession(race) {
  const now = new Date();
  return race.sessions.find(s => new Date(s.date) > now);
}

// ==============================
// HOME
// ==============================

function renderHome() {
  const race = races2026[0];
  const nextSession = getNextSession(race);

  document.getElementById("app").innerHTML = `
    <section class="card">
      <h2>Próxima Corrida</h2>
      <h3>${race.name}</h3>

      ${nextSession ? `
        <p><strong>${nextSession.name}</strong></p>
        <div class="countdown">
          ${formatCountdown(nextSession.date)}
        </div>
      ` : "<p>Fim de semana concluído</p>"}

      <button class="btn" onclick="goToRace('${race.slug}')">
        Ver detalhes
      </button>
    </section>
  `;
}

// ==============================
// PÁGINA DA CORRIDA
// ==============================

function renderRace(slug) {
  const race = races2026.find(r => r.slug === slug);
  if (!race) return;

  const nextSession = getNextSession(race);

  document.getElementById("app").innerHTML = `
    <section class="card">
      <h2>${race.name}</h2>

      <h3>Próxima Sessão</h3>
      ${nextSession ? `
        <p><strong>${nextSession.name}</strong></p>
        <div class="countdown">
          ${formatCountdown(nextSession.date)}
        </div>
      ` : "<p>Evento concluído</p>"}

      <h3>Ficha Técnica</h3>
      <ul>
        <li>Extensão: ${race.technical.length}</li>
        <li>Voltas: ${race.technical.laps}</li>
        <li>Distância: ${race.technical.distance}</li>
        <li>Curvas: ${race.technical.corners}</li>
        <li>Zonas DRS: ${race.technical.drs}</li>
      </ul>

      <h3>Dados da Corrida 2025</h3>
      <p>Meteorologia: ${race.race2025.weather}</p>
      <p>Pole: ${race.race2025.pole}</p>
      <p>Melhor volta: ${race.race2025.fastestLap}</p>
      <p>Tempo da corrida: ${race.race2025.raceTime}</p>

      <strong>Pódio 2025:</strong>
      <ol>
        ${race.race2025.podium.map(p => `<li>${p}</li>`).join("")}
      </ol>

      <p>${race.race2025.notes}</p>

      <button class="btn" onclick="window.print()">
        🖨️ Imprimir ficha + dados 2025
      </button>
    </section>
  `;
}

// ==============================
// NAVEGAÇÃO
// ==============================

function goToRace(slug) {
  window.location.href = `race.html?race=${slug}`;
}

// ==============================
// INIT
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const raceSlug = params.get("race");

  if (raceSlug) {
    renderRace(raceSlug);
  } else {
    renderHome();
  }
});
