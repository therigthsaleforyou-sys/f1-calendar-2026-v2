// COUNTDOWN
const raceDate = new Date("2026-03-08T04:00:00");
const countdown = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date();
  const diff = raceDate - now;

  if (diff <= 0) {
    countdown.textContent = "🏁 Corrida em andamento";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);

  countdown.textContent = `${d}d ${h}h ${m}m`;
}

updateCountdown();
setInterval(updateCountdown, 60000);

// BOTÃO VOLTAR AO TOPO
document.getElementById("btn-topo").onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
