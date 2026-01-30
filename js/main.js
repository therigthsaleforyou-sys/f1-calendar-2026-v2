const calendarEl = document.getElementById("calendar");

/* HERO + COUNTDOWN */
const nextRace = calendar2026[0];
document.getElementById("heroRaceName").innerText = nextRace.name;

function updateCountdown() {
  const now = new Date();
  const raceDate = new Date(nextRace.raceDateISO);
  const diff = raceDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerText = "Race Week!";
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;

  document.getElementById("countdown").innerText =
    `${d}d ${h}h ${m}m`;
}

updateCountdown();
setInterval(updateCountdown, 60000);

/* RACES */
calendar2026.forEach(race => {
  const res = results2025[race.id];

  const card = document.createElement("div");
  card.className = "race-card";

  card.innerHTML = `
    <div class="race-header">${race.name}</div>
    <img class="race-img" src="${race.image}">
    <div class="race-body">
      <h4>Sessões 2026</h4>
      ${Object.entries(race.sessions).map(
        ([k,v]) => `<div>${k}: ${v}</div>`
      ).join("")}

      <h4>Resultados 2025</h4>
      <div>Pole: ${res.pole} (${res.poleTime})</div>
      <div>Volta rápida: ${res.fastestLap} (${res.fastestLapTime})</div>
      <div>Pódio: ${res.podium}</div>
      <div>Meteo: ${res.meteo}</div>
    </div>
  `;

  const img = card.querySelector(".race-img");
  const body = card.querySelector(".race-body");
  img.onclick = () => {
    body.style.display = body.style.display === "block" ? "none" : "block";
  };

  calendarEl.appendChild(card);
});

/* BACK TO TOP */
document.getElementById("backToTop").onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
