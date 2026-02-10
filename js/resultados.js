const cardsContainer = document.getElementById("cards-container");
const heroImg = document.getElementById("hero-img");
const heroTitle = document.getElementById("hero-title");
const heroCountdown = document.getElementById("hero-countdown");
const backToTop = document.getElementById("back-to-top");

// -----------------------------
// FUNÇÕES AUXILIARES
// -----------------------------
function pad(n) { return n.toString().padStart(2,'0'); }
function getTimeDiff(target) {
  const diff = new Date(target) - new Date();
  if (diff <= 0) return null;
  const h = Math.floor(diff / 1000 / 3600);
  const m = Math.floor((diff / 1000 % 3600) / 60);
  const s = Math.floor((diff / 1000) % 60);
  return { h, m, s };
}

// -----------------------------
// HERO
// -----------------------------
function getNextRace() {
  const now = new Date();
  const pastAustralia = new Date(window.calendar2026[0].sessions.race) <= now;
  if (!pastAustralia) return window.calendar2026[0];

  let closest = null;
  window.calendar2026.forEach(race => {
    const diff = new Date(race.sessions.race) - now;
    if (diff >= 0 && (!closest || diff < closest.diff)) {
      closest = { race, diff };
    }
  });
  return closest?.race || window.calendar2026[window.calendar2026.length - 1];
}

function updateHero(race) {
  heroImg.src = race.heroImage;
  heroTitle.textContent = race.name;
  heroImg.onclick = () => {
    const card = document.getElementById(race.id);
    if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
  };
}

// -----------------------------
// CARDS
// -----------------------------
function renderCards() {
  cardsContainer.innerHTML = "";
  window.calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.className = "card";
    card.id = race.id;

    card.innerHTML = `
      <img src="${race.cardImage}" alt="${race.name}">
      <h2>${race.name}</h2>
      <div class="countdown"></div>
      <div class="waiting">Aguardar a realização da corrida</div>
      <div class="dropbox">Dropbox</div>
      <button class="favorito">🏁</button>
    `;

    const countdownEl = card.querySelector(".countdown");
    const waitingEl = card.querySelector(".waiting");
    const dropboxEl = card.querySelector(".dropbox");
    const favBtn = card.querySelector(".favorito");

    favBtn.onclick = () => card.classList.toggle("favorito");

    cardsContainer.appendChild(card);
  });
}

// -----------------------------
// UPDATE DINÂMICO
// -----------------------------
function updateCountdowns() {
  const now = new Date();
  let activeRace = null;

  window.calendar2026.forEach(race => {
    const card = document.getElementById(race.id);
    const countdownEl = card.querySelector(".countdown");
    const waitingEl = card.querySelector(".waiting");
    const dropboxEl = card.querySelector(".dropbox");

    const diffObj = getTimeDiff(race.sessions.race);

    if (!diffObj) {
      // Corrida ativa
      card.classList.add("active");
      countdownEl.textContent = "Corrida ativa!";
      waitingEl.style.display = "none";
      dropboxEl.style.display = "block";
      activeRace = race; // Para hero
    } else {
      // Countdown normal
      card.classList.remove("active");
      waitingEl.style.display = "block";
      dropboxEl.style.display = "none";
      countdownEl.textContent = `${pad(diffObj.h)}:${pad(diffObj.m)}:${pad(diffObj.s)}`;
    }
  });

  // Atualizar hero com corrida ativa ou próxima
  const heroRace = activeRace || getNextRace();
  updateHero(heroRace);

  // Hero countdown
  const heroDiff = getTimeDiff(heroRace.sessions.race);
  if (!heroDiff) {
    heroCountdown.textContent = "Corrida ativa!";
  } else {
    heroCountdown.textContent = `${pad(heroDiff.h)}:${pad(heroDiff.m)}:${pad(heroDiff.s)}`;
  }
}

// -----------------------------
// BOTÃO VOLTAR AO TOPO
// -----------------------------
backToTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// -----------------------------
// INIT
// -----------------------------
renderCards();
updateCountdowns();
setInterval(updateCountdowns, 1000); // Atualização sincronizada
