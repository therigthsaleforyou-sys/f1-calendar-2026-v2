/* =========================
   DADOS BASE – GP AUSTRÁLIA
   ========================= */

const raceData = {
  name: "Grande Prémio da Austrália",
  slug: "australia",
  circuit: "Albert Park",
  image: "assets/australia.jpg",

  sessions: [
    {
      name: "FP1",
      date: "2026-03-06T02:30:00Z"
    },
    {
      name: "FP2",
      date: "2026-03-06T06:00:00Z"
    },
    {
      name: "FP3",
      date: "2026-03-07T02:30:00Z"
    },
    {
      name: "Qualificação",
      date: "2026-03-07T06:00:00Z"
    },
    {
      name: "Corrida",
      date: "2026-03-08T05:00:00Z"
    }
  ]
};

/* =========================
   UTILITÁRIOS
   ========================= */

function getNextSession() {
  const now = new Date();

  return raceData.sessions.find(
    session => new Date(session.date) > now
  );
}

function formatCountdown(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function startCountdown(elementId, targetDate) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function update() {
    const now = new Date();
    const diff = new Date(targetDate) - now;

    if (diff <= 0) {
      el.textContent = "Sessão em curso";
      return;
    }

    el.textContent = formatCountdown(diff);
  }

  update();
  setInterval(update, 1000);
}

/* =========================
   INIT POR PÁGINA
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.getAttribute("data-page");
  const nextSession = getNextSession();

  if (!nextSession) return;

  /* HOME */
  if (page === "home") {
    const nameEl = document.getElementById("home-session-name");
    const countdownEl = document.getElementById("home-countdown");

    if (nameEl) nameEl.textContent = nextSession.name;
    if (countdownEl) startCountdown("home-countdown", nextSession.date);
  }

  /* RACE */
  if (page === "race") {
    const titleEl = document.getElementById("race-title");
    const sessionNameEl = document.getElementById("next-session-name");

    if (titleEl) titleEl.textContent = raceData.name;
    if (sessionNameEl) sessionNameEl.textContent = nextSession.name;

    startCountdown("race-countdown", nextSession.date);
    startCountdown("next-session-countdown", nextSession.date);
  }
});
