/* =========================
   DADOS DO EVENTO – 2026
   ========================= */

const raceData = {
  name: "Grande Prémio da Austrália",
  slug: "australia",
  circuit: "Albert Park",
  image: "assets/australia.jpg",

  sessions: [
    { name: "FP1", date: "2026-03-06T02:30:00Z" },
    { name: "FP2", date: "2026-03-06T06:00:00Z" },
    { name: "FP3", date: "2026-03-07T02:30:00Z" },
    { name: "Qualificação", date: "2026-03-07T06:00:00Z" },
    { name: "Corrida", date: "2026-03-08T05:00:00Z" }
  ]
};

/* =========================
   UTILITÁRIOS
   ========================= */

function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString("pt-PT", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatCountdown(ms) {
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${d}d ${h}h ${m}m ${sec}s`;
}

function getNextSession() {
  const now = new Date();
  return raceData.sessions.find(s => new Date(s.date) > now);
}

function startCountdown(id, target) {
  const el = document.getElementById(id);
  if (!el) return;

  function tick() {
    const diff = new Date(target) - new Date();
    el.textContent = diff <= 0 ? "Sessão em curso" : formatCountdown(diff);
  }

  tick();
  setInterval(tick, 1000);
}

/* =========================
   INIT
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  const next = getNextSession();

  if (!next) return;

  /* HOME */
  if (page === "home") {
    document.getElementById("home-session-name").textContent = next.name;
    startCountdown("home-countdown", next.date);
  }

  /* RACE */
  if (page === "race") {
    document.getElementById("race-title").textContent = raceData.name;
    startCountdown("race-countdown", next.date);

    document.getElementById("next-session-name").textContent = next.name;
    startCountdown("next-session-countdown", next.date);

    const list = document.getElementById("session-list");
    list.innerHTML = raceData.sessions.map(s => `
      <div class="session-row">
        <strong>${s.name}</strong>
        <span>${formatDateTime(s.date)}</span>
      </div>
    `).join("");
  }
});
