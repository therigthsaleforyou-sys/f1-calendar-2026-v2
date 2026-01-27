document.addEventListener("DOMContentLoaded", () => {
  renderHomepage();
  renderRacePage();
  renderTeams();
  renderPilots();
  renderConstructors();
});

/* ======================
   UTIL
====================== */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ======================
   COUNTDOWN (HORA LOCAL FIXA)
====================== */
function startCountdownLocal(dateString, elementId = "countdown") {
  const el = document.getElementById(elementId);
  if (!el) return;

  // dateString no formato: "2026-03-06 04:30"
  const parts = dateString.split(/[- :]/);
  const target = new Date(
    Number(parts[0]),        // ano
    Number(parts[1]) - 1,    // mês (0-based)
    Number(parts[2]),        // dia
    Number(parts[3]),        // hora
    Number(parts[4]),        // minuto
    0
  );

  setInterval(() => {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      el.textContent = "Sessão iniciada";
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;

    el.textContent = `${d}d ${h}h ${m}m`;
  }, 1000);
}

/* ======================
   HOMEPAGE
====================== */
function renderHomepage() {
  const list = document.getElementById("race-list");
  if (!list) return;

  list.innerHTML = "";

  races2026.forEach(race => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="race-${race.id}.html">${race.name}</a>`;
    list.appendChild(li);
  });

  const nextRace = races2026[0];

  const nameEl = document.getElementById("next-race-name");
  const linkEl = document.getElementById("next-race-link");
  const heroEl = document.getElementById("next-race-hero");

  if (nameEl) nameEl.textContent = nextRace.name;
  if (linkEl) linkEl.href = `race-${nextRace.id}.html`;
  if (heroEl) heroEl.src = nextRace.hero;

  // FP1 em hora LOCAL (Portugal)
  startCountdownLocal(nextRace.fp1Local);
}

/* ======================
   RACE PAGE
====================== */
function renderRacePage() {
  const raceId = document.documentElement.dataset.raceId;
  if (!raceId) return;

  const race = races2026.find(r => r.id === raceId);
  if (!race) return;

  const sessionsEl = document.getElementById("sessions-2026");
  const historyEl = document.getElementById("history-2025");
  const resultsEl = document.getElementById("results-2026");

  if (sessionsEl) {
    sessionsEl.innerHTML = race.sessions
      .map(s => `<p>${s}</p>`)
      .join("");
  }

  if (historyEl) {
    historyEl.innerHTML = `
      <p>Meteorologia: ${race.history2025.weather}</p>
      <p>Pole: ${race.history2025.pole.driver} (${race.history2025.pole.time})</p>
      <p>Melhor volta: ${race.history2025.fastestLap.driver} (${race.history2025.fastestLap.time})</p>
      <p>Tempo total: ${race.history2025.raceTime}</p>
      <p>Pódio: ${race.history2025.podium.join(" / ")}</p>
    `;
  }

  loadResults2026(raceId, resultsEl);

  // Countdown FP1 (hora local)
  startCountdownLocal(race.fp1Local);
}

/* ======================
   RESULTADOS 2026 (localStorage)
====================== */
function loadResults2026(raceId, container) {
  if (!container) return;

  const key = `results_${raceId}`;
  let results = JSON.parse(localStorage.getItem(key));

  if (!results) {
    results = [
      { pos: 1, driver: "Max Verstappen" },
      { pos: 2, driver: "Sergio Pérez" },
      { pos: 3, driver: "Charles Leclerc" }
    ];
    localStorage.setItem(key, JSON.stringify(results));
  }

  container.innerHTML = results
    .map(r => `<p>${r.pos}º – ${r.driver}</p>`)
    .join("");
}

/* ======================
   TEAMS / PILOTS / CONSTRUCTORS
====================== */
function renderTeams() {
  const el = document.getElementById("teams-list");
  if (!el || typeof teams2026 === "undefined") return;

  el.innerHTML = "";

  teams2026.forEach(team => {
    const div = document.createElement("div");
    div.className = "team-card";
    div.innerHTML = `
      <img src="${team.logo}" alt="${team.name}">
      <h3>${team.name}</h3>
      <p>${team.drivers.join(" / ")}</p>
    `;
    el.appendChild(div);
  });
}

function renderPilots() {
  const el = document.getElementById("pilots-table");
  if (!el || typeof drivers2026 === "undefined") return;

  el.innerHTML = drivers2026
    .map(d => `<p>${d.name} — ${d.team} (0 pts)</p>`)
    .join("");
}

function renderConstructors() {
  const el = document.getElementById("constructors-table");
  if (!el || typeof teams2026 === "undefined") return;

  el.innerHTML = teams2026
    .map(t => `<p>${t.name} — 0 pts</p>`)
    .join("");
}
