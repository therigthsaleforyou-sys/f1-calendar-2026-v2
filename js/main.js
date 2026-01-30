const STORAGE_KEY = "f1_2026_state";

function loadState() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    favorites: [],
    disputed: []
  };
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* HERO + COUNTDOWN */
const heroTitle = document.getElementById("heroTitle");
const countdownEl = document.getElementById("countdown");
const heroImage = document.getElementById("heroImage");

const nextRace = calendar2026.find(r => new Date(r.date) > new Date()) || calendar2026[0];

heroTitle.textContent = nextRace.name;
heroImage.src = nextRace.image;

// Countdown atualizado a cada segundo
function updateCountdown() {
  const diff = new Date(nextRace.date) - new Date();
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
const state = loadState();

calendar2026.forEach(race => {
  const card = document.createElement("section");
  card.className = "race-card";

  const raceDate = new Date(race.date);
  if (raceDate < new Date() && !state.disputed.includes(race.id)) {
    state.disputed.push(race.id);
    saveState(state);
  }

  if (state.disputed.includes(race.id)) card.classList.add("disputed");
  if (state.favorites.includes(race.id)) card.classList.add("favorite");

  card.innerHTML = `
    <img src="${race.image}" alt="${race.name}">
    <h2>${race.name}</h2>
    <button class="favorite-btn">⭐</button>
  `;

  // Favoritos
  card.querySelector(".favorite-btn").onclick = () => {
    if (state.favorites.includes(race.id)) {
      state.favorites = state.favorites.filter(id => id !== race.id);
      card.classList.remove("favorite");
    } else {
      state.favorites.push(race.id);
      card.classList.add("favorite");
    }
    saveState(state);
  };

  // Clicar na imagem abre dropdown simples (exemplo)
  card.querySelector("img").onclick = () => {
    alert(`Informações da corrida: ${race.name}\nData: ${new Date(race.date).toLocaleString()}`);
  };
  
  container.appendChild(card);
});

/* BACK TO TOP */
document.getElementById("backToTop").onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
