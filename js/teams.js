// js/teams.js
// Renderização das equipas — mobile-first
// Atualizado para nome + pilotos centrados abaixo do logo

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
      <div class="team-info">
        <h3 class="race-title">${team.name}</h3>
        <div class="drivers">
          <strong>Pilotos</strong>
          ${team.drivers.join("<br>")}
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

/* ================= BACK TO TOP ================= */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  btn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
