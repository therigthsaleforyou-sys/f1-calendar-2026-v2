/* COUNTDOWN */
const raceDate = new Date("2026-03-08T04:00:00Z");
const countdownEl = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date();
  const diff = raceDate - now;

  if (diff <= 0) {
    countdownEl.textContent = "Race Week!";
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;

  countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* RACES */
const container = document.getElementById("racesContainer");

calendar2026.forEach(race => {
  const card = document.createElement("section");
  card.className = "race-card";
  card.id = race.id;

  card.innerHTML = `
    <img src="${race.image}" alt="${race.name}">
    <h2>${race.name}</h2>
    <div class="race-details">
      <p><strong>Data:</strong> ${new Date(race.date).toLocaleString("pt-PT")}</p>
      <p>Resultados 2025 (em breve)</p>
    </div>
    <button class="favorite-btn">⭐</button>
  `;
  
  card.querySelector("img").onclick = () => {
    card.classList.toggle("open");
  };

  container.appendChild(card);
});

/* BACK TO TOP */
document.getElementById("backToTop").onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
