// js/corridas.js
document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const raceCards = document.getElementById("race-cards");
  const backToTop = document.getElementById("back-to-top");

  raceCards.innerHTML = "";

  calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";

    card.innerHTML = `
      <img class="race-image" src="${race.cardImage}" alt="${race.name}">
      <h2 class="race-title">${race.name}</h2>
    `;

    // Clique na imagem ou título abre a página da corrida
    card.querySelector(".race-image").addEventListener("click", () => {
      window.location.href = `race/${race.id}.html`;
    });
    card.querySelector(".race-title").addEventListener("click", () => {
      window.location.href = `race/${race.id}.html`;
    });

    raceCards.appendChild(card);
  });

  // Back to top
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
