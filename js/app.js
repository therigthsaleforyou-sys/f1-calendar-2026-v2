function startCountdown(elementId, targetDate) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function update() {
    const now = new Date();
    const diff = new Date(targetDate) - now;

    if (diff <= 0) {
      el.textContent = "Já começou!";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }

  update();
  setInterval(update, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof races === "undefined") return;

  const nextRace = races[0];

  // HOME
  startCountdown("home-countdown", nextRace.raceDate);

  // RACE PAGE
  startCountdown("race-countdown", nextRace.raceDate);
});
