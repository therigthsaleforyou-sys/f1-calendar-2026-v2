document.addEventListener("DOMContentLoaded", () => {
  if (typeof races === "undefined") return;

  initHome();
  initInternalRaceCountdown();
  initSessionsTable();
});

/* =========================
   HOME
========================= */
function initHome() {
  renderRaceList();
  initNextRaceCountdown();
}

function renderRaceList() {
  const list = document.getElementById("race-list");
  if (!list) return;

  list.innerHTML = "";

  races.forEach(race => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${race.name}</strong><br>
      ${race.country} — ${race.circuit}<br>
      <a class="btn" href="race-${race.id}.html">Ver detalhes →</a>
    `;
    list.appendChild(li);
  });
}

function initNextRaceCountdown() {
  const el = document.getElementById("countdown");
  const link = document.getElementById("race-link");
  if (!el) return;

  const now = new Date();

  const upcoming = races
    .filter(r => new Date(r.sessions.FP1) > now)
    .sort((a, b) => new Date(a.sessions.FP1) - new Date(b.sessions.FP1));

  if (upcoming.length === 0) {
    el.textContent = "Temporada terminada";
    return;
  }

  const nextRace = upcoming[0];

  if (link) link.href = `race-${nextRace.id}.html`;

  updateCountdown(el, new Date(nextRace.sessions.FP1));
  setInterval(() => {
    updateCountdown(el, new Date(nextRace.sessions.FP1));
  }, 1000);
}

/* =========================
   COUNTDOWN INTERNO
========================= */
function initInternalRaceCountdown() {
  const el = document.getElementById("internal-countdown");
  const raceId = document.documentElement.dataset.raceId;
  if (!el || !raceId) return;

  const race = races.find(r => r.id === raceId);
  if (!race) return;

  const fp1 = new Date(race.sessions.FP1);

  updateCountdown(el, fp1);
  setInterval(() => {
    updateCountdown(el, fp1);
  }, 1000);
}

/* =========================
   SESSÕES AUTOMÁTICAS
========================= */
function initSessionsTable() {
  const container = document.getElementById("sessions-2026");
  const raceId = document.documentElement.dataset.raceId;
  if (!container || !raceId) return;

  const race = races.find(r => r.id === raceId);
  if (!race) return;

  let html = "<ul>";

  for (const session in race.sessions) {
    const date = new Date(race.sessions[session]);
    html += `<li>${session}: ${date.toLocaleString("pt-PT")}</li>`;
  }

  html += "</ul>";
  container.innerHTML = html;
}

/* =========================
   UTIL
========================= */
function updateCountdown(el, target) {
  const diff = target - new Date();
  if (diff <= 0) {
    el.textContent = "Sessão iniciada ou terminada";
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  el.textContent = `${d}d ${h}h ${m}m ${s}s`;
}

function printPage() {
  window.print();
}
