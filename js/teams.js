// js/teams.js

document.addEventListener("DOMContentLoaded", () => {

  if (!window.teamsData) {
    console.error("teamsData não carregado");
    return;
  }

  const container = document.getElementById("teams-cards");

  teamsData.forEach(team => {
    const card = document.createElement("div");
    card.className = "team-card";

    // Conteúdo do card
    card.innerHTML = `
      <img src="${team.logo}" alt="${team.name}">
      <h3>${team.name}</h3>
      <p><strong>Pilotos:</strong></p>
      ${team.drivers.map(d => `<p>${d}</p>`).join("")}
    `;

    container.appendChild(card);
  });

  // Back to top
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

});
