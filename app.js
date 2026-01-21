/*************************
 * DADOS DAS CORRIDAS
 *************************/
const races2026 = [
  {
    slug: "australia",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    image: "assets/australia.jpg",
    trackMap: "assets/australia-2d.jpg",
    sessions: {
      fp1: "2026-03-06T02:30:00Z",
      fp2: "2026-03-06T06:00:00Z",
      fp3: "2026-03-07T02:30:00Z",
      quali: "2026-03-07T06:00:00Z",
      race: "2026-03-08T05:00:00Z"
    },
    track: {
      length: "5.278 km",
      laps: 58,
      distance: "306.124 km",
      corners: 14,
      drs: 4
    }
  }
];

/*************************
 * FUNÇÕES BASE
 *************************/
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("pt-PT", {
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

  const sessions = [
    { name: "FP1", date: new Date(race.sessions.fp1) },
    { name: "FP2", date: new Date(race.sessions.fp2) },
    { name: "FP3", date: new Date(race.sessions.fp3) },
    { name: "Qualifying", date: new Date(race.sessions.quali) },
    { name: "Race", date: new Date(race.sessions.race) }
  ];

  return sessions.find(s => s.date > now);
}

function startCountdown(element, targetDate, label) {
  function update() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      element.innerHTML = `<strong>${label}</strong><br>Sessão em curso`;
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    element.innerHTML = `
      <strong>${label}</strong>
      <div class="countdown">${d}d ${h}h ${m}m ${s}s</div>
    `;
  }

  update();
  setInterval(update, 1000);
}

/*************************
 * HOME PAGE
 *************************/
const nextRaceEl = document.getElementById("next-race");
const calendarListEl = document.getElementById("calendar-list");

if (nextRaceEl) {
  const race = races2026[0];
  const nextSession = getNextSession(race);

  if (nextSession) {
    nextRaceEl.innerHTML = `
      <div class="card-title">${race.name}</div>
      <div class="next-session">${nextSession.name}</div>
    `;

    startCountdown(nextRaceEl, nextSession.date, nextSession.name);
  }
}

if (calendarListEl) {
  races2026.forEach(race => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <a href="race.html?race=${race.slug}">
        <div class="card-title">${race.name}</div>
        <div class="next-session">${race.circuit}</div>
        <div>${formatDate(race.sessions.race)}</div>
      </a>
    `;

    calendarListEl.appendChild(div);
  });
}

/*************************
 * RACE PAGE
 *************************/
const params = new URLSearchParams(window.location.search);
const raceSlug = params.get("race");

if (raceSlug) {
  const race = races2026.find(r => r.slug === raceSlug);

  const content = document.getElementById("race-content");
  const title = document.getElementById("race-title");

  if (race && content && title) {
    title.textContent = race.name;

    const nextSession = getNextSession(race);

    content.innerHTML = `
      <h2>Próxima Sessão</h2>
      <div id="race-countdown"></div>

      <h2>Ficha Técnica</h2>
      <ul>
        <li>Extensão: ${race.track.length}</li>
        <li>Voltas: ${race.track.laps}</li>
        <li>Distância: ${race.track.distance}</li>
        <li>Curvas: ${race.track.corners}</li>
        <li>Zonas DRS: ${race.track.drs}</li>
      </ul>
    `;

    if (nextSession) {
      const cd = document.getElementById("race-countdown");
      startCountdown(cd, nextSession.date, nextSession.name);
    }
  }
}
