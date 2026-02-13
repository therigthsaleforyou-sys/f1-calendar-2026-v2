// js/corridas.js
document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const raceCards = document.getElementById("race-cards");

  raceCards.innerHTML = "";

  calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";

    card.innerHTML = `
      <a href="${race.id}.html">
        <img src="../${race.cardImage}" alt="${race.name}">
        <h3>${race.name}</h3>
      </a>
    `;

    raceCards.appendChild(card);
  });
});
