/* =========================
   CORRIDAS 2026
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
    }
  }
];

/* =========================
   EQUIPAS 2026
========================= */

const teams2026 = [
  {
    name: "Red Bull Racing",
    logo: "assets/redbull.png",
    drivers: ["Max Verstappen", "Sergio Pérez"]
  },
  {
    name: "Ferrari",
    logo: "assets/ferrari.png",
    drivers: ["Charles Leclerc", "Carlos Sainz"]
  },
  {
    name: "Mercedes",
    logo: "assets/mercedes.png",
    drivers: ["George Russell", "Lewis Hamilton"]
  }
];

/* =========================
   FUNÇÕES GERAIS
========================= */

function getNextSession(race) {
  const now = new Date();
  return Object.entries(race.sessions)
    .map(([name, date]) => ({ name, date: new Date(date) }))
    .filter(s => s.date > now)
    .sort((a, b) => a.date - b.date)[0];
}

function startCountdown(el, targetDate) {
  function update() {
    const diff = targetDate - new Date();
    if (diff <= 0) {
      el.textContent = "Sessão em andamento";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
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
      <h2>${race.name}</h2>
      <p><strong>${nextSession.name}</strong></p>
      <div id="home-countdown" class="countdown"></div>
      <br>
      <a href="race.html?race=${race.slug}">Ver detalhes</a>
      <br><br>
      <a href="teams.html">Ver Equipas</a>
    </div>
  `;

  startCountdown(
    document.getElementById("home-countdown"),
    nextSession.date
  );
}

/* =========================
   PÁGINA CORRIDA
========================= */

const raceContent = document.getElementById("race-content");

if (raceContent) {
  const params = new URLSearchParams(window.location.search);
  const raceSlug = params.get("race");

  const race = races2026.find(r => r.slug === raceSlug);

  if (!race) {
    raceContent.textContent = "Corrida não encontrada.";
  } else {
    const nextSession = getNextSession(race);

    document.getElementById("race-title").textContent = race.name;

    raceContent.innerHTML = `
      <img src="${race.image}" style="width:100%;border-radius:12px">

      <h2>Próxima Sessão</h2>
      <p><strong>${nextSession.name}</strong></p>
      <div id="race-countdown" class="countdown"></div>

      <h2>Ficha Técnica</h2>
      <ul>
        <li><strong>Extensão:</strong> ${race.track.length}</li>
        <li><strong>Voltas:</strong> ${race.track.laps}</li>
        <li><strong>Distância:</strong> ${race.track.raceDistance}</li>
        <li><strong>Curvas:</strong> ${race.track.corners}</li>
        <li><strong>Zonas DRS:</strong> ${race.track.drsZones}</li>
      </ul>
    `;

    startCountdown(
      document.getElementById("race-countdown"),
      nextSession.date
    );
  }
}

/* =========================
   PÁGINA EQUIPAS
========================= */

const teamsEl = document.getElementById("teams-content");

if (teamsEl) {
  teamsEl.innerHTML = "";

  teams2026.forEach(team => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${team.logo}" alt="${team.name}" style="max-width:120px">
      <h2>${team.name}</h2>
      <ul>
        ${team.drivers.map(d => `<li>${d}</li>`).join("")}
      </ul>
    `;

    teamsEl.appendChild(card);
  });
}
