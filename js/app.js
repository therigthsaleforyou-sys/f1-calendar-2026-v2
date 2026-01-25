document.addEventListener("DOMContentLoaded", () => {
  if (typeof races === "undefined") return;

  initHome();
  initInternalRaceCountdown();
  initSessions();
  initHistory2025();
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
        ${r.country} — ${r.circuit}<br>
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

  if (!upcoming.length) {
    el.textContent = "Temporada terminada";
    return;
  }

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
  const container = document.getElementById("sessions-2026");
  const id = document.documentElement.dataset.raceId;
  if (!container || !id) return;

  const race = races.find(r => r.id === id);
  let html = "<ul>";

  for (const s in race.sessions) {
    const d = new Date(race.sessions[s]);
    html += `<li>${s}: ${d.toLocaleString(LOCALE, { timeZone: TIMEZONE })}</li>`;
  }

  html += "</ul>";
  container.innerHTML = html;
}

function initHistory2025() {
  const container = document.getElementById("history-2025");
  const id = document.documentElement.dataset.raceId;
  if (!container || !id) return;

  const h = races.find(r => r.id === id).history2025;

  container.innerHTML = `
    <ul>
      <li><strong>Meteorologia:</strong> ${h.weather}</li>
      <li><strong>Pole Position:</strong> ${h.pole.driver} (${h.pole.time})</li>
      <li><strong>Volta Mais Rápida:</strong> ${h.fastestLap.driver} (${h.fastestLap.time})</li>
      <li><strong>Tempo Total da Corrida:</strong> ${h.raceTime}</li>
      <li><strong>Pódio:</strong> 🥇 ${h.podium[0]} | 🥈 ${h.podium[1]} | 🥉 ${h.podium[2]}</li>
    </ul>
  `;
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
