/* ==============================
   F1 2026 – App Base
   ============================== */

const races2026 = [
  {
    name: "Grande Prémio da Austrália",
    slug: "australia",
    circuit: "Albert Park",
    date: "2026-03-08T05:00:00Z",
    image: "assets/australia.jpg",
    track: {
      length: "5.278 km",
      laps: 58,
      raceDistance: "306.124 km",
      corners: 14,
      drsZones: 4
    },
    sessions: {
      fp1: "2026-03-06T02:30:00Z",
      fp2: "2026-03-06T06:00:00Z",
      fp3: "2026-03-07T03:30:00Z",
      quali: "2026-03-07T07:00:00Z",
      race: "2026-03-08T05:00:00Z"
    },
    stats2025: {
      weather: "Sol e 24°C",
      poleTime: "1:15.915",
      podium: ["Max Verstappen", "Lando Norris", "Charles Leclerc"],
      fastestLap: "1:19.813",
      raceTime: "1h 31m 12s",
      highlights:
        "Corrida marcada por Safety Car e estratégia agressiva nas boxes."
    }
  }
];

/* ---------- UTILITÁRIOS ---------- */

function getNextSession(race) {
  const now = new Date();
  return Object.entries(race.sessions)
    .map(([n, t]) => ({ name: n.toUpperCase(), time: new Date(t) }))
    .filter(s => s.time > now)
    .sort((a, b) => a.time - b.time)[0] || null;
}

function countdown(targetDate) {
  const diff = targetDate - new Date();
  if (diff <= 0) return "Em andamento";
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
}

/* ---------- MENU GLOBAL ---------- */

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
      <button disabled>👥 Equipas</button>
      <button disabled>🏆 Pilotos</button>
      <button disabled>🏎️ Construtores</button>
    </nav>
  `;
}

/* ---------- HOME ---------- */

const app = document.getElementById("app");

if (app) {
  const race = races2026[0];
  const next = getNextSession(race);

  app.innerHTML = `
    ${renderMenu()}

    <section>
      <h2>Próxima Corrida</h2>

      <p><strong>${race.name}</strong></p>

      ${next ? `
        <p><strong>${next.name}</strong></p>
        <p><span id="cd">${countdown(next.time)}</span></p>
      ` : `<p>Sessões terminadas</p>`}
    </section>

    <section>
      <h2>Calendário 2026</h2>

      ${races2026.map(r => `
        <div style="
          background:#111;
          padding:15px;
          border-radius:10px;
          margin-bottom:15px;
          border-left:4px solid #e10600">
          
          <strong>${r.name}</strong><br>
          <small>${r.circuit}</small><br><br>

          <a href="race.html?race=${r.slug}">
            <button>Ver detalhes</button>
          </a>
        </div>
      `).join("")}
    </section>
  `;

  if (next) {
    setInterval(() => {
      const el = document.getElementById("cd");
      if (el) el.textContent = countdown(next.time);
    }, 1000);
  }
}

/* ---------- PÁGINA DA CORRIDA ---------- */

const params = new URLSearchParams(location.search);
const slug = params.get("race");

if (slug) {
  const race = races2026.find(r => r.slug === slug);
  const title = document.getElementById("race-title");
  const content = document.getElementById("race-content");

  if (race && title && content) {
    const next = getNextSession(race);

    title.textContent = race.name;

    content.innerHTML = `
      ${renderMenu()}

      <img src="${race.image}" style="width:100%;border-radius:12px;margin-bottom:20px">

      <section>
        <h2>Próxima Sessão</h2>
        ${next ? `
          <p><strong>${next.name}</strong></p>
          <p><span id="rcd">${countdown(next.time)}</span></p>
        ` : `<p>Sessões terminadas</p>`}
      </section>

      <section>
        <h2>Ficha Técnica</h2>
        <ul>
          <li>Extensão: ${race.track.length}</li>
          <li>Voltas: ${race.track.laps}</li>
          <li>Distância: ${race.track.raceDistance}</li>
          <li>Curvas: ${race.track.corners}</li>
          <li>Zonas DRS: ${race.track.drsZones}</li>
        </ul>
      </section>

      <section>
        <h2>Dados da Corrida 2025</h2>
        <ul>
          <li>Meteorologia: ${race.stats2025.weather}</li>
          <li>Pole: ${race.stats2025.poleTime}</li>
          <li>Melhor volta: ${race.stats2025.fastestLap}</li>
          <li>Tempo da corrida: ${race.stats2025.raceTime}</li>
        </ul>

        <p><strong>Pódio 2025:</strong></p>
        <ol>
          ${race.stats2025.podium.map(p => `<li>${p}</li>`).join("")}
        </ol>

        <p>${race.stats2025.highlights}</p>
      </section>

      <section>
        <h2>Impressão</h2>
        <button onclick="window.print()">🖨️ Imprimir ficha + dados 2025</button>
        <p><em>Dados 2026 disponíveis após a corrida</em></p>
      </section>
    `;

    if (next) {
      setInterval(() => {
        const el = document.getElementById("rcd");
        if (el) el.textContent = countdown(next.time);
      }, 1000);
    }
  }
}
