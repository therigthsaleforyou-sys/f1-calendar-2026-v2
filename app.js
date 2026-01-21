/* ==============================
   F1 2026 – App Base
   ============================== */

/* ---------- DADOS ---------- */

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
      podium: [
        "1.º Max Verstappen",
        "2.º Lando Norris",
        "3.º Charles Leclerc"
      ],
      fastestLap: "1:19.813",
      raceTime: "1h 31m 12s",
      highlights:
        "Corrida marcada por Safety Car e estratégia agressiva nas boxes."
    }
  }
];

/* ---------- UTILITÁRIOS ---------- */

function formatDate(dateString) {
  return new Date(dateString).toLocaleString("pt-PT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getNextSession(race) {
  const now = new Date();
  const sessions = Object.entries(race.sessions)
    .map(([name, time]) => ({
      name: name.toUpperCase(),
      time: new Date(time)
    }))
    .filter(s => s.time > now)
    .sort((a, b) => a.time - b.time);

  return sessions[0] || null;
}

function countdown(targetDate) {
  const diff = targetDate - new Date();
  if (diff <= 0) return "Em andamento";

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  return `${d}d ${h}h ${m}m ${s}s`;
}

/* ---------- HOME ---------- */

const app = document.getElementById("app");

if (app) {
  const nextRace = races2026[0];
  const nextSession = getNextSession(nextRace);

  app.innerHTML = `
    <section>
      <h2>Próxima Corrida</h2>
      <p>
        <strong>${nextRace.name}</strong><br>
        ${nextSession ? `
          ${nextSession.name}<br>
          <span id="countdown">${countdown(nextSession.time)}</span>
        ` : "Sessões terminadas"}
      </p>
    </section>

    <section>
      <h2>Calendário 2026</h2>
      ${races2026.map(race => `
        <div style="
          background:#111;
          padding:16px;
          border-radius:10px;
          margin-bottom:15px;
          border-left:4px solid #e10600">
          
          <strong>${race.name}</strong><br>
          <small>${race.circuit} — ${formatDate(race.date)}</small><br><br>

          <a href="race.html?race=${race.slug}">
            <button>Ver detalhes</button>
          </a>
        </div>
      `).join("")}
    </section>
  `;

  if (nextSession) {
    setInterval(() => {
      const el = document.getElementById("countdown");
      if (el) el.textContent = countdown(nextSession.time);
    }, 1000);
  }
}

/* ---------- PÁGINA DA CORRIDA ---------- */

const params = new URLSearchParams(window.location.search);
const raceSlug = params.get("race");

if (raceSlug) {
  const race = races2026.find(r => r.slug === raceSlug);
  const titleEl = document.getElementById("race-title");
  const contentEl = document.getElementById("race-content");

  if (race && titleEl && contentEl) {
    const nextSession = getNextSession(race);

    titleEl.textContent = race.name;

    contentEl.innerHTML = `
      <img src="${race.image}" style="width:100%;border-radius:12px;margin-bottom:20px">

      <section>
        <h2>Próxima Sessão</h2>
        ${nextSession ? `
          <strong>${nextSession.name}</strong><br>
          <span id="race-countdown">${countdown(nextSession.time)}</span>
        ` : "Sessões terminadas"}
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
          <li><strong>Meteorologia:</strong> ${race.stats2025.weather}</li>
          <li><strong>Pole:</strong> ${race.stats2025.poleTime}</li>
          <li><strong>Melhor volta:</strong> ${race.stats2025.fastestLap}</li>
          <li><strong>Tempo da corrida:</strong> ${race.stats2025.raceTime}</li>
        </ul>

        <p><strong>Pódio:</strong></p>
        <ol>
          ${race.stats2025.podium.map(p => `<li>${p}</li>`).join("")}
        </ol>

        <p><strong>Destaques:</strong> ${race.stats2025.highlights}</p>
      </section>

      <section>
        <h2>Impressão</h2>
        <p><em>Disponível assim que possível</em></p>
      </section>
    `;

    if (nextSession) {
      setInterval(() => {
        const el = document.getElementById("race-countdown");
        if (el) el.textContent = countdown(nextSession.time);
      }, 1000);
    }
  }
}
