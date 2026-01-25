document.addEventListener("DOMContentLoaded", () => {
  if (typeof races === "undefined") return;

  initNextRaceCountdown();
  initInternalRaceCountdown();
});

/* =========================
   Countdown da PRÓXIMA corrida (FP1)
========================= */
function initNextRaceCountdown() {
  const countdownEl = document.getElementById("countdown");
  const raceLink = document.getElementById("race-link");
  if (!countdownEl) return;

  const now = new Date();

  const upcoming = races
    .filter(r => new Date(r.sessions.FP1) > now)
    .sort((a, b) => new Date(a.sessions.FP1) - new Date(b.sessions.FP1));

  if (upcoming.length === 0) {
    countdownEl.textContent = "Temporada terminada";
    return;
  }

  const nextRace = upcoming[0];

  if (raceLink) {
    raceLink.href = `race-${nextRace.id}.html`;
  }

  updateCountdown(countdownEl, new Date(nextRace.sessions.FP1));
  setInterval(() => {
    updateCountdown(countdownEl, new Date(nextRace.sessions.FP1));
  }, 1000);
}

/* =========================
   Countdown INTERNO da corrida (FP1)
========================= */
function initInternalRaceCountdown() {
  const internalEl = document.getElementById("internal-countdown");
  const raceId = document.documentElement.dataset.raceId;

  if (!internalEl || !raceId) return;

  const race = races.find(r => r.id === raceId);
  if (!race) return;

  const fp1Date = new Date(race.sessions.FP1);

  updateCountdown(internalEl, fp1Date);
  setInterval(() => {
    updateCountdown(internalEl, fp1Date);
  }, 1000);
}

/* =========================
   Função base de countdown
========================= */
function updateCountdown(element, targetDate) {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    element.textContent = "Sessão iniciada ou terminada";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

/* =========================
   Imprimir página
========================= */
function printPage() {
  window.print();
}
