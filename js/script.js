const raceDate = new Date("2026-03-08T04:00:00");

const countdownEl = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date();
  const diff = raceDate - now;

  if (diff <= 0) {
    countdownEl.textContent = "🏁 Corrida em andamento!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  countdownEl.textContent =
    `${days}d ${hours}h ${minutes}m`;
}

updateCountdown();
setInterval(updateCountdown, 60000);
