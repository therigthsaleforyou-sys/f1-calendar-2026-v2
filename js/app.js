document.addEventListener("DOMContentLoaded", () => {
  renderTeams();
  renderPilots();
  renderConstructors();
  renderRacePage();
  renderHomepage();
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------------- RACE PAGE ---------------- */
function renderRacePage() {
  const raceId = document.documentElement.dataset.raceId;
  if (!raceId) return;

  const race = races2026.find(r => r.id === raceId);
  if (!race) return;

  document.querySelector("#sessions-2026").innerHTML =
    race.sessions.map(s => `<p>${s}</p>`).join("");

  document.querySelector("#history-2025").innerHTML = `
    <p>Meteorologia: ${race.history2025.weather}</p>
    <p>Pole: ${race.history2025.pole}</p>
    <p>Melhor volta: ${race.history2025.fastestLap}</p>
    <p>Tempo total: ${race.history2025.raceTime}</p>
    <p>Pódio: ${race.history2025.podium.join(" / ")}</p>
  `;

  loadResults2026(raceId);
  startCountdown(race.fp1);
}

function loadResults2026(raceId) {
  const key = `results_${raceId}`;
  let results = JSON.parse(localStorage.getItem(key));

  if (!results) {
    results = drivers2026.slice(0, 3).map((d, i) => ({
      position: i + 1,
      driver: d.name
    }));
    localStorage.setItem(key, JSON.stringify(results));
  }

  document.querySelector("#results-2026").innerHTML =
    results.map(r => `<p>${r.position}º – ${r.driver}</p>`).join("");
}

/* ---------------- COUNTDOWN ---------------- */
function startCountdown(dateString) {
  const el = document.querySelector("#countdown");
  const target = new Date(dateString).getTime();

  setInterval(() => {
    const now = Date.now();
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

/* ---------------- HOMEPAGE ---------------- */
function renderHomepage() {
  const list = document.querySelector("#race-list");
  if (!list) return;

  races2026.forEach(r => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="race-${r.id}.html">${r.name}</a>`;
    list.appendChild(li);
  });

  const nextRace = races2026[0];
  document.querySelector("#next-race-name").textContent = nextRace.name;
  document.querySelector("#next-race-link").href = `race-${nextRace.id}.html`;
  document.querySelector("#next-race-hero").src = nextRace.hero;

  startCountdown(nextRace.fp1);
}

/* ---------------- TEAMS ---------------- */
function renderTeams() {
  const container = document.querySelector("#teams-list");
  if (!container) return;

  teams2026.forEach(team => {
    const div = document.createElement("div");
    div.className = "team-card";
    div.innerHTML = `
      <img src="${team.logo}" alt="${team.name}">
      <h3>${team.name}</h3>
      <p>${team.drivers.join(" / ")}</p>
    `;
    container.appendChild(div);
  });
}

/* ---------------- PILOTS ---------------- */
function renderPilots() {
  const el = document.querySelector("#pilots-table");
  if (!el) return;

  el.innerHTML = drivers2026
    .map(d => `<p>${d.name} — ${d.team}</p>`)
    .join("");
}

/* ---------------- CONSTRUCTORS ---------------- */
function renderConstructors() {
  const el = document.querySelector("#constructors-table");
  if (!el) return;

  el.innerHTML = teams2026
    .map(t => `<p>${t.name}</p>`)
    .join("");
}
