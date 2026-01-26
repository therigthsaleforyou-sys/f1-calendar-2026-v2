document.addEventListener("DOMContentLoaded", () => {
  initHome();
  initRacePage();
  initTeamsPage();
  initPilotsPage();
  initConstructorsPage();
});

const TZ = "Europe/Lisbon";

/* HOME */
function initHome() {
  const list = document.getElementById("race-list");
  if (!list) return;

  list.innerHTML = "";
  races.forEach(r => {
    list.innerHTML += `
      <li>
        <strong>${r.name}</strong><br>
        <a class="btn" href="race-${r.id}.html">Ver corrida</a>
      </li>
    `;
  });

  nextRaceCountdown();
}

function nextRaceCountdown() {
  const el = document.getElementById("countdown");
  const link = document.getElementById("race-link");
  if (!el) return;

  const next = races
    .map(r => ({ ...r, fp1: new Date(r.sessions.FP1) }))
    .filter(r => r.fp1 > new Date())
    .sort((a, b) => a.fp1 - b.fp1)[0];

  if (!next) return;

  link.href = `race-${next.id}.html`;
  setInterval(() => updateCountdown(el, next.fp1), 1000);
}

/* RACE PAGE */
function initRacePage() {
  const id = document.documentElement.dataset.raceId;
  if (!id) return;

  const race = races.find(r => r.id === id);

  renderSessions(race);
  renderHistory(race);
  startInternalCountdown(race.sessions.FP1);
}

function renderSessions(race) {
  const el = document.getElementById("sessions-2026");
  if (!el) return;

  let html = "<ul>";
  for (const s in race.sessions) {
    const d = new Date(race.sessions[s]);
    html += `<li>${s}: ${d.toLocaleString("pt-PT", { timeZone: TZ })}</li>`;
  }
  html += "</ul>";
  el.innerHTML = html;
}

function renderHistory(race) {
  const el = document.getElementById("history-2025");
  if (!el) return;

  const h = race.history2025;
  el.innerHTML = `
    <ul>
      <li>Meteorologia: ${h.weather}</li>
      <li>Pole: ${h.pole}</li>
      <li>Volta rápida: ${h.fastestLap}</li>
      <li>Tempo total: ${h.raceTime}</li>
      <li>Pódio: ${h.podium.join(" / ")}</li>
    </ul>
  `;
}

function startInternalCountdown(dateStr) {
  const el = document.getElementById("internal-countdown");
  if (!el) return;

  const target = new Date(dateStr);
  setInterval(() => updateCountdown(el, target), 1000);
}

/* TEAMS */
function initTeamsPage() {
  const el = document.getElementById("teams-list");
  if (!el) return;

  teamsData.forEach(t => {
    el.innerHTML += `
      <h3>${t.name}</h3>
      <ul>${t.drivers.map(d => `<li>${d}</li>`).join("")}</ul>
    `;
  });
}

/* PILOTS */
function initPilotsPage() {
  const el = document.getElementById("pilots-table");
  if (!el) return;

  let pilots = [];
  teamsData.forEach(t => {
    t.drivers.forEach(d => pilots.push({ driver: d, team: t.name }));
  });

  let html = "<table><tr><th>Piloto</th><th>Equipa</th></tr>";
  pilots.forEach(p => {
    html += `<tr><td>${p.driver}</td><td>${p.team}</td></tr>`;
  });
  html += "</table>";
  el.innerHTML = html;
}

/* CONSTRUCTORS */
function initConstructorsPage() {
  const el = document.getElementById("constructors-table");
  if (!el) return;

  let html = "<table><tr><th>Equipa</th><th>Pontos</th></tr>";
  teamsData.forEach(t => {
    html += `<tr><td>${t.name}</td><td>${t.points}</td></tr>`;
  });
  html += "</table>";
  el.innerHTML = html;
}

/* UTIL */
function updateCountdown(el, target) {
  const diff = target - new Date();
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

function printPage() {
  window.print();
}
