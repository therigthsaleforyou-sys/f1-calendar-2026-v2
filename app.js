// ===============================
// DADOS BASE 2026
// ===============================
const races2026 = [
  {
    slug: "australia",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    imageHero: "assets/australia.jpg",
    imageMap: "assets/australia-map.png",
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
// FUNÇÕES
// ===============================
function formatDate(date) {
  return new Date(date).toLocaleString("pt-PT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function countdown(target) {
  const diff = target - new Date();
  if (diff <= 0) return "A decorrer";

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);

  return `${d}d ${h}h ${m}m ${s}s`;
}

function nextSessionFromRace(race) {
  const now = new Date();
  return Object.entries(race.sessions)
    .map(([type, date]) => ({ type, date: new Date(date) }))
    .filter(s => s.date > now)
    .sort((a, b) => a.date - b.date)[0];
}

function nextGlobalSession() {
  let next = null;
  races2026.forEach(race => {
    const s = nextSessionFromRace(race);
    if (s && (!next || s.date < next.date)) {
      next = { ...s, race };
    }
  });
  return next;
}

// ===============================
// HOME PAGE
// ===============================
const nextRaceEl = document.getElementById("next-race");
const appEl = document.getElementById("app");

function updateHome() {
  const next = nextGlobalSession();
  if (!next || !nextRaceEl) return;

  nextRaceEl.innerHTML = `
    <strong>${next.type.toUpperCase()}</strong><br>
    ${next.race.name}<br>
    <small>${countdown(next.date)}</small>
  `;
}

updateHome();
setInterval(updateHome, 1000);

// Lista de corridas
if (appEl) {
  const list = document.createElement("section");
  list.innerHTML = "<h2>Calendário 2026</h2>";

  races2026.forEach(r => {
    list.innerHTML += `
      <div>
        <h3><a href="race.html?race=${r.slug}">${r.name}</a></h3>
        <p>${r.circuit}</p>
      </div>
    `;
  });

  appEl.appendChild(list);
}

// ===============================
// PÁGINA DA CORRIDA
// ===============================
const params = new URLSearchParams(window.location.search);
const slug = params.get("race");

if (slug) {
  const race = races2026.find(r => r.slug === slug);
  const title = document.getElementById("race-title");
  const content = document.getElementById("race-content");

  if (race && title && content) {
    title.textContent = race.name;

    content.innerHTML = `
      <img src="${race.imageHero}?v=${race.slug}" style="width:100%;margin-bottom:20px">

      <h3>Próxima Sessão</h3>
      <p id="race-countdown"></p>

      <h3>Ficha Técnica</h3>
      <ul>
        <li>Extensão: ${race.track.length}</li>
        <li>Voltas: ${race.track.laps}</li>
        <li>Distância: ${race.track.raceDistance}</li>
        <li>Curvas: ${race.track.corners}</li>
        <li>Zonas DRS: ${race.track.drsZones}</li>
      </ul>

      <h3>Mapa da Pista</h3>
      <img src="${race.imageMap}?v=${race.slug}" style="width:100%;max-width:500px">
    `;

    function updateRace() {
      const next = nextSessionFromRace(race);
      document.getElementById("race-countdown").textContent =
        next ? countdown(next.date) : "Fim de semana concluído";
    }

    updateRace();
    setInterval(updateRace, 1000);
  }
}
