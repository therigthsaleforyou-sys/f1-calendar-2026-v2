/* =========================
   DADOS 2026
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
   FUNÇÕES
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
      el.textContent = "Sessão em andamento ou concluída";
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
    const now = new Date();
    const raceDate = new Date(race.sessions.race);
    const nextSession = getNextSession(race);

    document.getElementById("race-title").textContent = race.name;

    raceContent.innerHTML = `
      <img src="${race.image}" style="width:100%;border-radius:12px">

      <section id="print-area">
        <h2>${race.name}</h2>

        <h3>Próxima Sessão</h3>
        <p><strong>${nextSession.name}</strong></p>
        <div id="race-countdown" class="countdown"></div>

        <h3>Ficha Técnica</h3>
        <ul>
          <li>Extensão: ${race.track.length}</li>
          <li>Voltas: ${race.track.laps}</li>
          <li>Distância: ${race.track.raceDistance}</li>
          <li>Curvas: ${race.track.corners}</li>
          <li>Zonas DRS: ${race.track.drsZones}</li>
        </ul>
      </section>

      <div style="margin-top:20px">
        ${
          now > raceDate
            ? `<button onclick="window.print()">🖨️ Imprimir dados da corrida</button>`
            : `<p><em>Impressão disponível assim que possível</em></p>`
        }
      </div>
    `;

    startCountdown(
      document.getElementById("race-countdown"),
      nextSession.date
    );
  }
}
