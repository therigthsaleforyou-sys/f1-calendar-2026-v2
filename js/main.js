/* =========================
   COUNTDOWN
========================= */
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


/* =========================
   FAVORITOS (localStorage)
========================= */
const FAVORITES_KEY = "favoriteRaces";

function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function saveFavorites(favs) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}


/* =========================
   RACES + DROPDOWN
========================= */
const container = document.getElementById("racesContainer");
const favorites = getFavorites();

calendar2026.forEach(race => {
  const card = document.createElement("section");
  card.className = "race-card";
  card.id = race.id;

  // aplicar favorito se existir em localStorage
  if (favorites.includes(race.id)) {
    card.classList.add("favorite");
  }

  card.innerHTML = `
    <img src="${race.image}" alt="${race.name}">
    <h2>${race.name}</h2>

    <div class="race-details">
      <p><strong>Data:</strong> ${new Date(race.date).toLocaleString("pt-PT")}</p>
      <p><strong>Resultados 2025:</strong> em breve</p>
    </div>

    <button class="favorite-btn">⭐</button>
  `;

  /* DROPDOWN */
  card.querySelector("img").onclick = () => {
    card.classList.toggle("open");
  };

  /* FAVORITO */
  const favBtn = card.querySelector(".favorite-btn");
  favBtn.onclick = () => {
    let favs = getFavorites();

    if (card.classList.contains("favorite")) {
      card.classList.remove("favorite");
      favs = favs.filter(id => id !== race.id);
    } else {
      card.classList.add("favorite");
      favs.push(race.id);
    }

    saveFavorites(favs);
  };
 
  container.appendChild(card);
});


/* =========================
   BACK TO TOP
========================= */
document.getElementById("backToTop").onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
