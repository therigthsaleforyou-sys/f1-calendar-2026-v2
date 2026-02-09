// js/campeonatos.js
document.addEventListener("DOMContentLoaded", () => {
  // Back-to-top
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Preencher Campeonato de Pilotos
  if (window.calendar2026 && Array.isArray(window.calendar2026)) {
    const pilotosTable = document.getElementById("pilotos-table").querySelector("tbody");
    pilotosTable.innerHTML = ""; // limpar

    // Criar array de pilotos com pontos
    const pilotos = [];
    window.calendar2026.forEach(race => {
      if (race.results2026?.podium) {
        race.results2026.podium.forEach((piloto, i) => {
          // Atribuir pontos simples: 1º=25, 2º=18, 3º=15 (exemplo)
          const pts = i === 0 ? 25 : i === 1 ? 18 : i === 2 ? 15 : 0;
          const entry = pilotos.find(p => p.name === piloto.name);
          if (entry) entry.points += pts;
          else pilotos.push({ name: piloto.name, team: piloto.team, points: pts });
        });
      }
    });

    // Ordenar desc
    pilotos.sort((a,b) => b.points - a.points);

    pilotos.forEach((p, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${idx+1}</td><td>${p.name}</td><td>${p.team}</td><td>${p.points}</td>`;
      pilotosTable.appendChild(tr);
    });
  }

  // Preencher Campeonato de Construtores
  const construtoresTable = document.getElementById("construtores-table").querySelector("tbody");
  const construtores = [];

  if (window.calendar2026 && Array.isArray(window.calendar2026)) {
    window.calendar2026.forEach(race => {
      if (race.results2026?.podium) {
        race.results2026.podium.forEach((piloto, i) => {
          const pts = i === 0 ? 25 : i === 1 ? 18 : i === 2 ? 15 : 0;
          const entry = construtores.find(c => c.team === piloto.team);
          if (entry) entry.points += pts;
          else construtores.push({ team: piloto.team, points: pts });
        });
      }
    });

    // Ordenar desc
    construtores.sort((a,b) => b.points - a.points);

    construtores.forEach((c, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${idx+1}</td><td>${c.team}</td><td>${c.points}</td>`;
      construtoresTable.appendChild(tr);
    });
  }
});
