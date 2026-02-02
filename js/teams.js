// js/teams.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("teams-cards");
  if (!container || !window.teams2026) return;

  container.innerHTML = "";
  teams2026.forEach(team => {
    const card = document.createElement("article");
    card.className = "team-card";

    card.innerHTML = `
      <img src="${team.logo}" alt="${team.name}">
      <h3 class="team-title">${team.name}</h3>
      <div class="team-drivers">${team.drivers.join(" / ")}</div>
    `;

    container.appendChild(card);
  });
});
