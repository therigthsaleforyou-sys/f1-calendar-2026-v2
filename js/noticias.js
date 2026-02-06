// ===============================
// CONFIG
// ===============================

// imagem default do hero enquanto só a Austrália terminou
const DEFAULT_HERO_IMAGE = "assets/heroes/australia_v2.jpg";

// container
const cardsContainer = document.getElementById("race-cards");
const heroLink = document.getElementById("hero");
const heroImage = document.getElementById("hero-image");
const heroTitle = document.getElementById("hero-title");

// ===============================
// DADOS DAS CORRIDAS
// (ordem do calendário)
// ===============================
const races = [
  {
    id: "australia",
    name: "Grande Prémio da Austrália",
    cardImage: "assets/races/australia.jpg"
  },
  {
    id: "china",
    name: "Grande Prémio da China",
    cardImage: "assets/races/china.jpg"
  },
  {
    id: "japan",
    name: "Grande Prémio do Japão",
    cardImage: "assets/races/japan.jpg"
  },
  {
    id: "bahrain",
    name: "Grande Prémio do Bahrain",
    cardImage: "assets/races/bahrain.jpg"
  }
];

// ===============================
// LOGICA DA CORRIDA ATIVA
// ===============================

// regra: o hero é SEMPRE a última corrida terminada
// por agora só a Austrália terminou
const activeRace = races[0];

// ===============================
// HERO
// ===============================

heroImage.src = DEFAULT_HERO_IMAGE;
heroTitle.textContent = `Corrida ativa: ${activeRace.name}`;
heroLink.href = `#race-${activeRace.id}`;

// ===============================
// CARDS
// ===============================

cardsContainer.innerHTML = "";

races.forEach(race => {
  const card = document.createElement("article");
  card.className = "race-card";
  card.id = `race-${race.id}`;

  card.innerHTML = `
    <img src="${race.cardImage}" alt="${race.name}">
    <h3>${race.name}</h3>
    <a href="#" class="calendar-btn">Calendário</a>
  `;

  cardsContainer.appendChild(card);
});
