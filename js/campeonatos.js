document.addEventListener("DOMContentLoaded", () => {

  if (!window.championships2026) {
    console.error("championships2026 não carregado");
    return;
  }

  const driversTable = document.getElementById("drivers-table");
  const constructorsTable = document.getElementById("constructors-table");

  // ===== Pilotos =====
  window.championships2026.drivers.forEach(driver => {
    const card = document.createElement("div");
    card.className = "champ-card";
    card.innerHTML = `
      <strong>${driver.position}. ${driver.name}</strong>
      <div>Equipe: ${driver.team}</div>
      <div>Pontos: ${driver.points}</div>
    `;
    driversTable.appendChild(card);
  });

  // ===== Construtores =====
  window.championships2026.constructors.forEach(team => {
    const card = document.createElement("div");
    card.className = "champ-card";
    card.innerHTML = `
      <strong>${team.position}. ${team.name}</strong>
      <div>Pontos: ${team.points}</div>
    `;
    constructorsTable.appendChild(card);
  });

  // ===== Back to Top =====
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

});
