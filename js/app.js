document.addEventListener("DOMContentLoaded", () => {

  const raceDate = new Date("2026-03-08T05:00:00");

  function startCountdown(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    function update() {
      const now = new Date();
      const diff = raceDate - now;

      if (diff <= 0) {
        el.textContent = "Já começou";
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const m = Math.floor(diff / (1000 * 60)) % 60;
      const s = Math.floor(diff / 1000) % 60;

      el.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }

    update();
    setInterval(update, 1000);
  }

  startCountdown("home-countdown");
  startCountdown("race-countdown");
  startCountdown("next-session-countdown");

});
