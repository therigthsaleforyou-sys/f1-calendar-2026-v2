document.addEventListener("DOMContentLoaded", () => {

  const cardsContainer = document.getElementById("race-cards");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const hero = document.getElementById("hero");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();
  let lastFinishedRace = calendar2026[0]; // Austrália por default

  // =========================
  // Gerar Cards dinamicamente
  // =========================
  calendar2026.forEach(race => {

    const raceDate = new Date(race.sessions.race);
    if (raceDate <= now) lastFinishedRace = race; // última corrida concluída

    const card = document.createElement("div");
    card.classList.add("race-card");
    card.dataset.id = race.id;
    card.dataset.image = race.heroImage;
    card.dataset.race = race.sessions.race;

    card.innerHTML = `
      <img class="race-image" src="${race.cardImage}" alt="${race.name}">
      <div class="race-header">
        <h3>${race.name}</h3>
      </div>
      <div class="race-details hidden">
        <p>Data: ${raceDate.toLocaleDateString("pt-PT", { day:"2-digit", month:"short", year:"numeric" })}</p>
        <div class="race-link-wrapper">
          <a class="race-link-btn" href="index.html">Calendário</a>
        </div>
      </div>
    `;

    // Toggle detalhes
    card.querySelector(".race-image").addEventListener("click", () => {
      card.querySelector(".race-details").classList.toggle("hidden");
    });

    cardsContainer.appendChild(card);
  });

  // =========================
  // Hero dinâmico
  // =========================
  heroImage.src = lastFinishedRace.heroImage;
  heroTitle.textContent = lastFinishedRace.name;

  hero.style.cursor = "pointer";
  hero.addEventListener("click", () => {
    const activeCard = document.querySelector(`.race-card[data-id="${lastFinishedRace.id}"]`);
    if (activeCard) activeCard.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // =========================
  // Countdown invisível (para lógica interna)
  // =========================
  // Usado apenas para determinar lastFinishedRace, já calculado acima
  // Pode ser expandido futuramente para mostrar tempos se necessário

  // =========================
  // Back to Top
  // =========================
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
