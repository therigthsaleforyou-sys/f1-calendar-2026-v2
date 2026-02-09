// js/campeonatos.js
document.addEventListener("DOMContentLoaded", () => {

  const tabelaPilotos = document.getElementById("tabela-pilotos").querySelector("tbody");
  const tabelaConstrutores = document.getElementById("tabela-construtores").querySelector("tbody");
  const backToTop = document.getElementById("back-to-top");

  // Exemplo de dados iniciais (substituir por dados reais do calendário)
  const pilotos = [
    { name: "Piloto 1", pontos: 50 },
    { name: "Piloto 2", pontos: 45 },
    { name: "Piloto 3", pontos: 40 },
  ];

  const construtores = [
    { name: "Equipe A", pontos: 95 },
    { name: "Equipe B", pontos: 85 },
    { name: "Equipe C", pontos: 70 },
  ];

  // Preencher tabela de pilotos
  pilotos.forEach((p, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${i+1}</td><td>${p.name}</td><td>${p.pontos}</td>`;
    tabelaPilotos.appendChild(row);
  });

  // Preencher tabela de construtores
  construtores.forEach((c, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${i+1}</td><td>${c.name}</td><td>${c.pontos}</td>`;
    tabelaConstrutores.appendChild(row);
  });

  // BACK TO TOP
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

}); 
