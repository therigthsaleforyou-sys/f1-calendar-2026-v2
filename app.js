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
  ],

  race2025: {
    weather: "Sol, 24°C",
    pole: "1:15.915",
    fastestLap: "1:19.813",
    raceTime: "1h 31m 12s",
    podium: [
      "Max Verstappen",
      "Lando Norris",
      "Charles Leclerc"
    ],
    highlights: "Corrida marcada por Safety Car e estratégia agressiva nas boxes."
  }
};

/* =========================
   UTILITÁRIOS
   ========================= */

function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString("pt-PT", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
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

    // Programa do evento
    document.getElementById("session-list").innerHTML =
      raceData.sessions.map(s => `
        <div class="session-row">
          <strong>${s.name}</strong>
          <span>${formatDateTime(s.date)}</span>
        </div>
      `).join("");

    // Dados 2025
    const d = raceData.race2025;
    document.getElementById("data-2025").innerHTML = `
      <div><strong>Meteorologia:</strong> ${d.weather}</div>
      <div><strong>Pole:</strong> ${d.pole}</div>
      <div><strong>Melhor volta:</strong> ${d.fastestLap}</div>
      <div><strong>Tempo da corrida:</strong> ${d.raceTime}</div>

      <h3>Pódio 2025</h3>
      <div>1.º ${d.podium[0]}</div>
      <div>2.º ${d.podium[1]}</div>
      <div>3.º ${d.podium[2]}</div>

      <p>${d.highlights}</p>
    `;
  }
});
