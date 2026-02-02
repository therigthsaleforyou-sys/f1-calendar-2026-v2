// js/teams.js
// Renderização das 11 equipas oficiais F1 2026
// Mobile-first, textos centralizados com container .team-info

document.addEventListener("DOMContentLoaded", () => {
  if (!window.teams2026 || !Array.isArray(window.teams2026)) {
    console.error("teams2026 não encontrado");
    return;
  }

  const container = document.getElementById("race-cards");
  if (!container) return;

  container.innerHTML = "";

  window.teams2026.forEach(team => {
    const card = document.createElement("article");
    card.className = "race-card";

    card.innerHTML = `
      <img src="${team.logo}" alt="${team.name}">
      <div class="team-info">
        <h3 class="race-title">${team.name}</h3>
        <div class="drivers">
          <strong>Pilotos</strong><br>
          ${team.drivers.join("<br>")}
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Back to top
  const btn = document.getElementById("back-to-top");
  if (btn) {
    btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
