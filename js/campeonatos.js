// js/campeonatos.js
document.addEventListener("DOMContentLoaded", () => {
  // ✅ Estrutura mínima: apenas Austrália
  const finishedRaces = calendar2026.filter(
    r => r.results2026?.race?.length
  );

  // Pilotos
  const drivers = {};
  finishedRaces.forEach(race => {
    race.results2026.race.forEach(r => {
      if (!drivers[r.driver]) {
        drivers[r.driver] = { name: r.driver, points: 0, team: r.team };
      }
      drivers[r.driver].points += r.points;
    });
  });

  const standingsDrivers = Object.values(drivers).sort((a, b) => b.points - a.points);

  // Construtores
  const constructors = {};
  finishedRaces.forEach(race => {
    race.results2026.race.forEach(r => {
      if (!constructors[r.team]) constructors[r.team] = { name: r.team, points: 0 };
      constructors[r.team].points += r.points;
    });
  });

  const standingsConstructors = Object.values(constructors).sort((a, b) => b.points - a.points);

  // Guardar posições anteriores para animação
  const prevDrivers = JSON.parse(localStorage.getItem("prevDrivers") || "[]");
  const prevConstructors = JSON.parse(localStorage.getItem("prevConstructors") || "[]");

  // Contêiner da página
  const main = document.querySelector("main");
  main.innerHTML = "";

  // Função para criar tabela estilo card
  function createTableCard(title, standings, type = "drivers") {
    const card = document.createElement("div");
    card.className = "race-card"; // Reaproveitando estilos dos cards
    card.style.marginBottom = "16px";

    const header = document.createElement("h3");
    header.textContent = title;
    header.style.textAlign = "center";
    header.style.marginBottom = "10px";
    card.appendChild(header);

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    standings.forEach((d, i) => {
      const row = document.createElement("tr");
      row.style.borderTop = "1px solid #fff";

      // Colunas
      const tdPos = document.createElement("td");
      tdPos.textContent = i + 1;
      tdPos.style.padding = "6px";
      tdPos.style.fontWeight = "700";

      const tdName = document.createElement("td");
      tdName.textContent = d.name;
      tdName.style.padding = "6px";

      const tdPoints = document.createElement("td");
      tdPoints.textContent = finishedRaces.length ? d.points : "—";
      tdPoints.style.padding = "6px";
      tdPoints.style.textAlign = "right";

      row.appendChild(tdPos);
      row.appendChild(tdName);
      row.appendChild(tdPoints);

      // Animação de subida/descida
      const prev = type === "drivers" ? prevDrivers : prevConstructors;
      if (prev[i]?.name !== d.name) {
        row.classList.add("changed");
      }

      table.appendChild(row);
    });

    card.appendChild(table);
    main.appendChild(card);
  }

  // Criar cartões
  createTableCard("Campeonato de Pilotos 2026", standingsDrivers, "drivers");
  createTableCard("Campeonato de Construtores 2026", standingsConstructors, "constructors");

  // Salvar posições para próxima vez
  localStorage.setItem("prevDrivers", JSON.stringify(standingsDrivers));
  localStorage.setItem("prevConstructors", JSON.stringify(standingsConstructors));
});
