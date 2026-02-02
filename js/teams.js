// js/teams.js
// Renderização das equipas — mobile-first

document.addEventListener("DOMContentLoaded", () => {
  if (!window.teams2026) return;

  renderTeams(window.teams2026);
  initBackToTop();
});

function renderTeams(teams) {
  const container = document.getElementById("race-cards");
  if (!container) return;

  container.innerHTML = "";

  teams.forEach(team => {
    const card = document.createElement("article");
    card.className = "race-card";

    card.innerHTML = `
      <img src="${team.logo}" alt="${team.name}">
      <h3 class="race-title">${team.name}</h3>
      <div style="padding:8px; font-size:0.9rem;">
        <strong>Pilotos</strong><br>
        ${team.drivers.join("<br>")}
      </div>
    `;

    container.appendChild(card);
  });
}

/* BACK TO TOP */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  btn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
