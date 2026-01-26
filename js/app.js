document.addEventListener("DOMContentLoaded", () => {
  if (typeof races === "undefined") return;

  initChampionship();

  if (document.querySelector(".home")) {
    renderCalendar();
    renderNextRace();
  }

  if (document.querySelector(".race-page")) {
    initRacePage();
  }
});

/* =========================
   CAMPEONATO PERSISTENTE
========================= */
function initChampionship() {
  if (!localStorage.getItem("f1Results")) {
    const stored = {};
    races.forEach(race => {
      stored[race.id] = race.results;
    });
    localStorage.setItem("f1Results", JSON.stringify(stored));
  }
}

/* =========================
   HOME
========================= */
function renderCalendar() {
  const list = document.getElementById("race-list");
  if (!list) return;

  list.innerHTML = "";
  races.forEach(race => {
    list.innerHTML += `
      <li>
        <strong>${race.name}</strong> – ${race.country}<br>
        <a class="btn" href="${race.page}">Ver detalhes</a>
      </li>
    `;
  });
}

function renderNextRace() {
  const now = new Date();
  const upcoming = races
    .map(r => ({ ...r, date: new Date(r.fp1) }))
    .filter(r => r.date > now)
    .sort((a, b) => a.date - b.date)[0];

  if (!upcoming) return;

  document.getElementById("race-link").href = upcoming.page;
  startCountdown(upcoming.date, "countdown");
}

/* =========================
   COUNTDOWN
========================= */
function startCountdown(targetDate, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function update() {
    const diff = targetDate - new Date();
    if (diff <= 0) {
      el.textContent = "Sessão iniciada";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;
    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }

  update();
  setInterval(update, 1000);
}

/* =========================
   PÁGINA DE CORRIDA
========================= */
function initRacePage() {
  const raceId = document.documentElement.dataset.raceId;
  const race = races.find(r => r.id === raceId);
  if (!race) return;

  startCountdown(new Date(race.fp1), "internal-countdown");

  const resultsBox = document.getElementById("results-2026");
  if (resultsBox) {
    const stored = JSON.parse(localStorage.getItem("f1Results"));
    const results = stored[raceId];

    let html = "<ol>";
    results.forEach(driver => html += `<li>${driver}</li>`);
    html += "</ol>";
    resultsBox.innerHTML = html;
  }
}
