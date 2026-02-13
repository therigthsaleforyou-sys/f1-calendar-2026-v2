// js/teams.js

document.addEventListener("DOMContentLoaded", () => {

  const btnCorridas = document.getElementById("btn-corridas");
  const corridasList = document.getElementById("corridas-list");

  if (!window.calendar2026) {
    console.error("calendar2026 não carregado");
    return;
  }

  // Preencher dropdown com as corridas na ordem do calendário
  calendar2026.forEach(race => {
    const a = document.createElement("a");
    a.href = `race/${race.id}.html`;
    a.textContent = race.name;
    corridasList.appendChild(a);
  });

  // Toggle dropdown
  btnCorridas.addEventListener("click", (e) => {
    e.stopPropagation();
    btnCorridas.parentElement.classList.toggle("show");
  });

  // Fechar dropdown ao clicar fora
  document.addEventListener("click", () => {
    btnCorridas.parentElement.classList.remove("show");
  });

  // Glow discreto ao clicar no botão
  btnCorridas.addEventListener("mousedown", () => {
    btnCorridas.classList.add("active");
  });
  btnCorridas.addEventListener("mouseup", () => {
    btnCorridas.classList.remove("active");
  });

});
