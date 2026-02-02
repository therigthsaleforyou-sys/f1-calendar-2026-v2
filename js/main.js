const heroImage = document.getElementById("hero-image");
const heroTitle = document.getElementById("hero-title");
const heroCountdown = document.getElementById("hero-countdown");
const raceCards = document.getElementById("race-cards");
const backToTopBtn = document.getElementById("back-to-top");

// HERO = próxima corrida
const nextRace = calendar2026[0];

heroImage.src = nextRace.image;
heroTitle.textContent = nextRace.name;

// Countdown
const raceDate = new Date("2026-03-08T04:00:00"); // Austrália – conforme site oficial

function updateCountdown() {
  const now = new Date();
  const diff = raceDate - now;

  if (diff <= 0) {
    heroCountdown.textContent = "🏁 A CORRIDA COMEÇOU 🏁";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  heroCountdown.textContent =
    `🏁 ${days}d ${hours}h ${minutes}m ${seconds}s 🏁`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Corridas
calendar2026.forEach(race => {
  const card = document.createElement("div");
  card.className = "race-card";
  card.dataset.id = race.id;

  card.innerHTML = `
    <img src="${race.image}" alt="${race.name}">
    <h3>${race.name}</h3>
    <button class="fav-btn">🏁</button>
    <button class="details-btn">Ver detalhes</button>
  `;

  raceCards.appendChild(card);
});

// Favoritos
document.addEventListener("click", e => {
  if (e.target.classList.contains("fav-btn")) {
    const card = e.target.closest(".race-card");
    card.classList.toggle("favorite");
  }
});

// Back to top
window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
