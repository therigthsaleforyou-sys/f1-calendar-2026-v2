// js/corridas.js

document.addEventListener("DOMContentLoaded", () => {

  if (!window.calendar2026 || !Array.isArray(calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const grid = document.getElementById("corridas-grid");

  calendar2026.forEach(race => {

    const card = document.createElement("div");
    card.className = "race-card";

    card.innerHTML = `
      <img src="../${race.cardImage}" alt="${race.name}">
      <h2>${race.name}</h2>
    `;

    card.addEventListener("click", () => {
      window.location.href = `${race.id}.html`;
    });

    grid.appendChild(card);
  });

});
