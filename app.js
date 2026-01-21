// ===============================
// DADOS F1 2026
// ===============================
const races2026 = [
  {
    slug: "australia",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    imageHero: "assets/australia.jpg",
    imageMap: "",
    track: {
      length: "5.278 km",
      laps: 58,
      raceDistance: "306.124 km",
      corners: 14,
      drsZones: 4
    },
    sessions: {
      fp1: "2026-03-06T01:30:00",
      fp2: "2026-03-06T05:00:00",
      fp3: "2026-03-07T01:30:00",
      qualifying: "2026-03-07T05:00:00",
      race: "2026-03-08T05:00:00"
    }
  },
  {
    slug: "bahrain",
    name: "Grande Prémio do Bahrain",
    circuit: "Sakhir",
    imageHero: "assets/bahrain.jpg",
    imageMap: "assets/bahrain-map.png",
    track: {
      length: "5.412 km",
      laps: 57,
      raceDistance: "308.238 km",
      corners: 15,
      drsZones: 3
    },
    sessions: {
      fp1: "2026-03-13T12:30:00",
      fp2: "2026-03-13T16:00:00",
      fp3: "2026-03-14T13:00:00",
      qualifying: "2026-03-14T16:00:00",
      race: "2026-03-15T15:00:00"
    }
  }
];

// ===============================
// FUNÇÕES AUXILIARES
// ===============================
function countdown(targetDate) {
  const diff = targetDate - new Date();
  if (diff <= 0) return "A decorrer";

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);

  return `${d}d ${h}h ${m}m ${s}s`;
}

function getNextSession(race) {
  const now = new Date();
  return Object.entries(race.sessions)
    .map(([type, date]) => ({ type, date: new Date(date) }))
    .filter(s => s.date > now)
    .sort((a, b) => a.date - b.date)[0];
}

// ===============================
// HOME PAGE
// ===============================
const nextRaceEl = document.getElementById("next-race");

function updateHome() {
  let next = null;

  races2026.forEach(race => {
    const session = getNextSession(race);
    if (session && (!next || session.date < next.session.date)) {
      next = { race, session };
    }
  });

  if (nextRaceEl && next) {
    nextRaceEl.innerHTML = `
      <strong>Próxima Sessão</strong><br>
      ${next.race.name}<br>
      ${next.session.type.toUpperCase()}<br>
      <small>${countdown(next.session.date)}</small>
    `;
  }
}

updateHome();
setInterval(updateHome, 1000);

// ===============================
// PÁGINA DA CORRIDA
// ===============================
const params = new URLSearchParams(window.location.search);
const slug = params.get("race");

if (slug) {
  const race = races2026.find(r => r.slug === slug);
  const titleEl = document.getElementById("race-title");
  const contentEl = document.getElementById("race-content");

  if (race && titleEl && contentEl) {
    const nextSession = getNextSession(race);

    titleEl.textContent = race.name;

    contentEl.innerHTML = `
      <img src="${race.imageHero}" alt="${race.name}" class="race-hero">

      <h2>Próxima Sessão</h2>
      <p>${nextSession.type.toUpperCase()} – ${countdown(nextSession.date)}</p>

      <h2>Ficha Técnica</h2>
      <ul>
        <li>Extensão: ${race.track.length}</li>
        <li>Voltas: ${race.track.laps}</li>
        <li>Distância: ${race.track.raceDistance}</li>
        <li>Curvas: ${race.track.corners}</li>
        <li>Zonas DRS: ${race.track.drsZones}</li>
      </ul>

      ${race.imageMap ? `
        <h2>Mapa da Pista</h2>
        <img src="${race.imageMap}" alt="Mapa da pista">
      ` : ""}
    `;

    setInterval(() => {
      const p = contentEl.querySelector("p");
      if (p) {
        p.innerHTML = `${nextSession.type.toUpperCase()} – ${countdown(nextSession.date)}`;
      }
    }, 1000);
  }
}
