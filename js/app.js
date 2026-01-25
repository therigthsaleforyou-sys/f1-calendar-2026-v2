document.addEventListener("DOMContentLoaded", () => {
  if (typeof races === "undefined") return;

  initHome();
  initInternalRaceCountdown();
  initSessions();
  initHistory2025();
  initResults2026();
  initDrivers();
  initConstructors();
});

const LOCALE = "pt-PT";
const TIMEZONE = "Europe/Lisbon";

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

  const upcoming = races
    .map(r => ({ ...r, fp1: new Date(r.sessions.FP1) }))
    .filter(r => r.fp1 > new Date())
    .sort((a, b) => a.fp1 - b.fp1);

  if (!upcoming.length) return;

  const race = upcoming[0];
  link.href = `race-${race.id}.html`;
  setInterval(() => updateCountdown(el, race.fp1), 1000);
}

/* RACE PAGE */
function initInternalRaceCountdown() {
  const el = document.getElementById("internal-countdown");
  const id = document.documentElement.dataset.raceId;
  if (!el || !id) return;

  const race = races.find(r => r.id === id);
  setInterval(() => updateCountdown(el, new Date(race.sessions.FP1)), 1000);
}

function initSessions() {
  const c = document.getElementById("sessions-2026");
  const id = document.documentElement.dataset.raceId;
  if (!c || !id) return;

  const r = races.find(r => r.id === id);
  let html = "<ul>";
  for (const s in r.sessions) {
    const d = new Date(r.sessions[s]);
    html += `<li>${s}: ${d.toLocaleString(LOCALE, { timeZone: TIMEZONE })}</li>`;
  }
  html += "</ul>";
  c.innerHTML = html;
}

function initHistory2025() {
  const c = document.getElementById("history-2025");
  const id = document.documentElement.dataset.raceId;
  if (!c || !id) return;

  const h = races.find(r => r.id === id).history2025;
  c.innerHTML = `
    <ul>
      <li>Meteorologia: ${h.weather}</li>
      <li>Pole: ${h.pole.driver} (${h.pole.time})</li>
      <li>Volta rápida: ${h.fastestLap.driver} (${h.fastestLap.time})</li>
      <li>Tempo total: ${h.raceTime}</li>
      <li>Pódio: ${h.podium.join(" / ")}</li>
    </ul>
  `;
}

function initResults2026() {
  const c = document.getElementById("results-2026");
  const id = document.documentElement.dataset.raceId;
  if (!c || !id) return;

  const results = races.find(r => r.id === id).results2026;
  let html = "";

  for (const session in results) {
    html += `<h4>${session}</h4><ol>`;
    results[session].forEach(r => {
      html += `<li>${r.driver} — ${r.time}</li>`;
    });
    html += "</ol>";
  }

  c.innerHTML = html;
}

function initDrivers() {
  const c = document.getElementById("drivers-table");
  const id = document.documentElement.dataset.raceId;
  if (!c || !id) return;

  const r = races.find(r => r.id === id);
  let html = `<table>
                <thead><tr><th>Piloto</th><th>Equipa</th></tr></thead><tbody>`;
  r.drivers.forEach(d => {
    html += `<tr><td>${d.name}</td><td>${d.team}</td></tr>`;
  });
  html += "</tbody></table>";
  c.innerHTML = html;
}

function initConstructors() {
  const c = document.getElementById("constructors-table");
  const id = document.documentElement.dataset.raceId;
  if (!c || !id) return;

  const r = races.find(r => r.id === id);
  let html = `<table>
                <thead><tr><th>Equipa</th><th>Pontos</th></tr></thead><tbody>`;
  r.constructors.forEach(d => {
    html += `<tr><td>${d.name}</td><td>${d.points}</td></tr>`;
  });
  html += "</tbody></table>";
  c.innerHTML = html;
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
