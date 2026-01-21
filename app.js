/***********************
 * DADOS BASE – 2026
 ***********************/
const races2026 = [
  {
    slug: "australia",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    date: "2026-03-08T05:00:00Z",
    image: "assets/australia.jpg",
    trackMap: "assets/australia-2d.png",
    track: {
      length: "5.278 km",
      laps: 58,
      raceDistance: "306.124 km",
      corners: 14,
      drsZones: 4
    },
    sessions: {
      fp1: "2026-03-06T01:30:00Z",
      fp2: "2026-03-06T05:00:00Z",
      fp3: "2026-03-07T01:30:00Z",
      quali: "2026-03-07T05:00:00Z",
      race: "2026-03-08T05:00:00Z"
    }
  }
];

/***********************
 * FUNÇÕES AUXILIARES
 ***********************/
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
  const entries = Object.entries(race.sessions)
    .map(([key, value]) => ({ name: key.toUpperCase(), date: new Date(value) }))
    .filter(s => s.date > now)
    .sort((a, b) => a.date - b.date);

  return entries[0] || null;
}

function startCountdown(targetDate, element) {
  function update() {
    const diff = targetDate - new Date();
    if (diff <= 0) {
      element.textContent = "Sessão em curso ou terminada";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    element.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }

  update();
  setInterval(update, 1000);
}

/***********************
 * HOME PAGE
 ***********************/
const nextRaceEl = document.getElementById("next-race");

if (nextRaceEl) {
  const race = races2026[0];
  const nextSession = getNextSession(race);

  if (nextSession) {
    nextRaceEl.innerHTML = `
      <strong>${race.name}</strong><br>
      ${nextSession.name}<br>
      <span id="home-countdown"></span>
    `;
    startCountdown(nextSession.date, document.getElementById("home-countdown"));
  }
}

/***********************
 * PÁGINA DA CORRIDA
 ***********************/
const params = new URLSearchParams(window.location.search);
const raceSlug = params.get("race");

if (raceSlug) {
  const race = races2026.find(r => r.slug === raceSlug);
  const titleEl = document.getElementById("race-title");
  const contentEl = document.getElementById("race-content");

  if (race && titleEl && contentEl) {
    titleEl.textContent = race.name;

    const nextSession = getNextSession(race);

    contentEl.innerHTML = `
      <img src="${race.image}" style="width:100%;max-height:300px;object-fit:cover">

      <h2>Próxima Sessão</h2>
      <p>${nextSession ? nextSession.name : "Todas concluídas"}</p>
      <p id="race-countdown"></p>

      <h2>Ficha Técnica</h2>
      <ul>
        <li>Extensão: ${race.track.length}</li>
        <li>Voltas: ${race.track.laps}</li>
        <li>Distância: ${race.track.raceDistance}</li>
        <li>Curvas: ${race.track.corners}</li>
        <li>Zonas DRS: ${race.track.drsZones}</li>
      </ul>

      <h2>Mapa da Pista</h2>
      <img src="${race.trackMap}" style="width:100%;max-width:400px">
    `;

    if (nextSession) {
      startCountdown(
        nextSession.date,
        document.getElementById("race-countdown")
      );
    }
  }
}
