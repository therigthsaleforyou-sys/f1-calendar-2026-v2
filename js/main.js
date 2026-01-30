/* =========================
   HERO + COUNTDOWN
========================= */

document.addEventListener("DOMContentLoaded", () => {

  // DATA DA PRÓXIMA CORRIDA (vem do calendar2026.js)
  const raceDate = new Date(nextRaceDate);

  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;

  function updateCountdown() {
    const now = new Date();
    const diff = raceDate - now;

    if (diff <= 0) {
      countdownEl.textContent = "Race Week!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

});
