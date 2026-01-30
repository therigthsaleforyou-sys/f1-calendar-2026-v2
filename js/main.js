/* COUNTDOWN */
const countdownEl = document.getElementById("countdown");

function updateCountdown() {
  const raceDate = new Date(nextRaceDate);
  const now = new Date();
  const diff = raceDate - now;

  if (diff <= 0) {
    countdownEl.textContent = "Race Week!";
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;

  countdownEl.textContent = `${d}d ${h}h ${m}m`;
}

updateCountdown();
setInterval(updateCountdown, 60000);

/* BACK TO TOP */
document.getElementById("backToTop").onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
