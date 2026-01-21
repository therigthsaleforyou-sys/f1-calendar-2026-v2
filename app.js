// ===============================
// DADOS F1 2026
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
// FUNÇÕES GERAIS
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

function getNextSessionFromRace(race) {
  const now = new Date();

  return Object.entries(race.sessions)
    .map(([type, date]) => ({ type, date: new Date(date) }))
    .filter(s => s.date > now)
    .sort((a, b) => a.date - b.date)[0];
}

function getNextGlobalSession() {
  let next = null;

  races2026.forEach(race => {
    const session = getNextSessionFromRace(race);
    if (!session) return;

    if (!next || session.date < next.date) {
      next = { ...session, race };
    }
  });

  return next;
}

function countdown(targetDate) {
  const diff = targetDate - new Date();
  if (diff <= 0) return "A decorrer";

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);

  return `${d}d ${h}h ${m}m`;
}

// ===============================
// HOME PAGE
// ===============================
const nextRaceEl = document.getElementById("next-race");

function updateHomeCountdown() {
  const next = getNextGlobalSession();
  if (!next || !nextRaceEl) return;

  nextRaceEl.innerHTML = `
    <strong>${next.type.toUpperCase()}</strong><br>
    ${next.race.name}<br>
    <small>${countdown(next.date)}</small>
  `;
}

updateHomeCountdown();
setInterval(updateHomeCountdown, 60000);

// ===============================
// LISTA DE CORRIDAS
// ===============================
const appEl = document.getElementById("app");

if (appEl) {
  const section = document.createElement("section");
  section.innerHTML = "<h2>Calendário 2026</h2>";

  races2026.forEach(race => {
    section.innerHTML += `
      <div>
        <h3><a href="race.html?race=${race.slug}">${race.name}</a></h3>
        <p>${race.circuit}</p>
      </div>
    `;
  });

  appEl.appendChild(section);
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

  if (race && content && title) {
    title.textContent = race.name;

    const nextSession = getNextSessionFromRace(race);

    function updateRaceCountdown() {
      document.getElementById("race-countdown").textContent =
        nextSession ? countdown(nextSession.date) : "Fim de semana concluído";
    }

    content.innerHTML = `
      <img src="${race.imageHero}" style="width:100%;margin-bottom:20px">

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

      <img src="${race.imageMap}" style="width:100%;max-width:500px;margin-top:20px">
    `;

    updateRaceCountdown();
    setInterval(updateRaceCountdown, 60000);
  }
}
