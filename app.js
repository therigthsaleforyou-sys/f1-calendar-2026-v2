/* ===========================
   F1 2026 — app.js COMPLETO
   =========================== */

const app = document.getElementById("app");

/* ===========================
   DADOS BASE
   =========================== */

const races = [
  {
    id: "australia",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    sessions: [
      { name: "FP1", date: "2026-03-06T02:30:00Z" },
      { name: "FP2", date: "2026-03-06T06:00:00Z" },
      { name: "FP3", date: "2026-03-07T02:30:00Z" },
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
    data2025: {
      weather: "Sol e 24°C",
      pole: "1:15.915",
      bestLap: "1:19.813",
      raceTime: "1h 31m 12s",
      podium: ["Max Verstappen", "Lando Norris", "Charles Leclerc"],
      highlights: "Corrida marcada por Safety Car e estratégia agressiva nas boxes."
    }
  }
];

/* ===========================
   UTILITÁRIOS
   =========================== */

function getNextSession(race) {
  const now = new Date();
  return race.sessions.find(s => new Date(s.date) > now);
}

function formatCountdown(date) {
  const diff = new Date(date) - new Date();
  if (diff <= 0) return "Sessão em curso";

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  return `${d}d ${h}h ${m}m ${s}s`;
}

/* ===========================
   MENU
   =========================== */

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

/* ===========================
   HOME
   =========================== */

function renderHome() {
  const race = races[0];
  const next = getNextSession(race);

  app.innerHTML = `
    ${renderMenu()}

    <h1>F1 2026</h1>
    <p>Calendário Oficial</p>

    <section class="card">
      <h2>Próxima Corrida</h2>
      <strong>${race.name}</strong>
      <p>${next ? next.name : "Concluída"}</p>
      <p id="countdown">${next ? formatCountdown(next.date) : "-"}</p>
      <button onclick="renderRace('${race.id}')">Ver detalhes</button>
    </section>

    <footer>F1 2026 – Projeto independente</footer>
  `;

  if (next) {
    setInterval(() => {
      const el = document.getElementById("countdown");
      if (el) el.textContent = formatCountdown(next.date);
    }, 1000);
  }
}

/* ===========================
   PÁGINA DA CORRIDA
   =========================== */

function renderRace(id) {
  const race = races.find(r => r.id === id);
  const next = getNextSession(race);

  app.innerHTML = `
    ${renderMenu()}

    <button onclick="renderHome()">⬅ Voltar</button>

    <h2>${race.name}</h2>

    <section class="card">
      <h3>Próxima Sessão</h3>
      <strong>${next ? next.name : "Concluída"}</strong>
      <p id="raceCountdown">${next ? formatCountdown(next.date) : "-"}</p>
    </section>

    <section class="card">
      <h3>Ficha Técnica</h3>
      <ul>
        <li>Extensão: ${race.technical.length}</li>
        <li>Voltas: ${race.technical.laps}</li>
        <li>Distância: ${race.technical.distance}</li>
        <li>Curvas: ${race.technical.corners}</li>
        <li>Zonas DRS: ${race.technical.drs}</li>
      </ul>
    </section>

    <section class="card">
      <h3>Dados da Corrida 2025</h3>
      <p>Meteorologia: ${race.data2025.weather}</p>
      <p>Pole: ${race.data2025.pole}</p>
      <p>Melhor volta: ${race.data2025.bestLap}</p>
      <p>Tempo da corrida: ${race.data2025.raceTime}</p>

      <strong>Pódio 2025:</strong>
      <ol>
        ${race.data2025.podium.map(p => `<li>${p}</li>`).join("")}
      </ol>

      <p>${race.data2025.highlights}</p>
    </section>

    <section class="card">
      <button onclick="window.print()">🖨️ Imprimir ficha + dados 2025</button>
      <button disabled>🖨️ Dados 2026 (disponível assim que possível)</button>
    </section>

    <footer>F1 2026 – Projeto independente</footer>
  `;

  if (next) {
    setInterval(() => {
      const el = document.getElementById("raceCountdown");
      if (el) el.textContent = formatCountdown(next.date);
    }, 1000);
  }
}

/* ===========================
   ARRANQUE
   =========================== */

renderHome();
