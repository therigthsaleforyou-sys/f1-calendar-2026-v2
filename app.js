// ==============================
// COUNTDOWN SIMPLES (HOME)
// ==============================

function startCountdown(targetDate, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      el.innerText = "Sessão em curso";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);

    el.innerText = `${d}d ${h}h ${m}m`;
  }

  update();
  setInterval(update, 60000);
}

// ==============================
// INIT POR PÁGINA
// ==============================

document.addEventListener("DOMContentLoaded", () => {

  // HOME
  if (document.getElementById("countdown")) {
    const australiaFP1 = new Date("2026-03-06T01:30:00Z").getTime();
    startCountdown(australiaFP1, "countdown");
  }

});
