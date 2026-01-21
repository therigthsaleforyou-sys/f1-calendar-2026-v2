/* =========================
   DADOS DAS CORRIDAS 2026
========================= */

const races2026 = [
  {
    slug: "australia",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    date: "2026-03-08T05:00:00",
    image: "assets/australia.jpg",
    sessions: {
      fp1: "2026-03-06T01:30:00",
      fp2: "2026-03-06T05:00:00",
      fp3: "2026-03-07T01:30:00",
      qualifying: "2026-03-07T05:00:00",
      race: "2026-03-08T05:00:00"
    },
    track: {
      length: "5.278 km",
      laps: 58,
      raceDistance: "306.124 km",
      corners: 14,
      drsZones: 4
    },
    stats2025: {
      weather: "Ensolarado, 22°C",
      poleTime: "1:15.915",
      podium: [
        "1º Max Verstappen",
        "2º Charles Leclerc",
        "3º Lando Norris"
      ],
      fastestLap: "1:19.813",
      raceTime: "1h 24m 05s",
      summary:
        "Corrida marcada por estratégia agressiva e safety car tardio. Verstappen controlou desde a pole."
    }
  }
];

/* =========================
   FUNÇÕES
========================= */

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
  return Object.entries(race.sessions)
    .map(([name, date]) => ({ name, date: new Date(date) }))
    .filter(s => s.date > now)
    .sort((a, b) => a.date - b.date)[0];
}

function startCountdown(element, targetDate) {
  function update() {
    const diff = targetDate - new Date();
    if (diff <= 0) {
      element.textContent = "Sessão em andamento";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    element.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }
  update();
  setInterval(update, 1000);
}

/* =========================
   HOME
========================= */

const nextRaceEl = document.getElementById("next-race");

if (nextRaceEl) {
  const race = races2026[0];
  const nextSession = getNextSession(race);

  nextRaceEl.innerHTML = `
    <div class="card">
      <div class="card-title">${race.name}</div>
      <div class="next-session">${nextSession.name.toUpperCase()}</div>
      <div id="home-countdown" class="countdown"></div>
    </div>
  `;

  startCountdown(
    document.getElementById("home-countdown"),
    nextSession.date
  );
}

/* =========================
   RACE PAGE
========================= */

const params = new URLSearchParams(window.location.search);
const raceSlug = params.get("race");

if (raceSlug) {
  const race = races2026.find(r => r.slug === raceSlug);
  const titleEl = document.getElementById("race-title");
  const contentEl = document.getElementById("race-content");

  if (race && titleEl && contentEl) {
    const nextSession = getNextSession(race);
    const s = race.stats2025;

    titleEl.textContent = race.name;

    contentEl.innerHTML = `
      <img src="${race.image}" alt="${race.circuit}">

      <div class="card">
        <h2>Próxima Sessão</h2>
        <p><strong>${nextSession.name}</strong></p>
        <div id="race-countdown" class="countdown"></div>
      </div>

      <div class="card">
        <h2>Ficha Técnica</h2>
        <ul>
          <li>Extensão: ${race.track.length}</li>
          <li>Voltas: ${race.track.laps}</li>
          <li>Distância: ${race.track.raceDistance}</li>
          <li>Curvas: ${race.track.corners}</li>
          <li>Zonas DRS: ${race.track.drsZones}</li>
        </ul>
      </div>

      <div class="card">
        <h2>Dados da Corrida 2025</h2>
        <p><strong>Meteorologia:</strong> ${s.weather}</p>
        <p><strong>Pole:</strong> ${s.poleTime}</p>
        <p><strong>Melhor volta:</strong> ${s.fastestLap}</p>
        <p><strong>Tempo de corrida:</strong> ${s.raceTime}</p>
        <p><strong>Pódio:</strong></p>
        <ul>${s.podium.map(p => `<li>${p}</li>`).join("")}</ul>
        <p><strong>Resumo:</strong> ${s.summary}</p>
      </div>
    `;

    startCountdown(
      document.getElementById("race-countdown"),
      nextSession.date
    );
  }
}
