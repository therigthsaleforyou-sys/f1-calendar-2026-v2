// =================== CONFIGURAÇÃO ===================
const teamsData = [
  { name: "McLaren", logo: "assets/teams/mclaren.png", drivers: ["Lando Norris", "Oscar Piastri"] },
  { name: "Mercedes", logo: "assets/teams/mercedes.png", drivers: ["George Russell", "Kimi Antonelli"] },
  { name: "Red Bull Racing", logo: "assets/teams/redbull.png", drivers: ["Max Verstappen", "Isack Hadjar"] },
  { name: "Ferrari", logo: "assets/teams/ferrari.png", drivers: ["Charles Leclerc", "Lewis Hamilton"] },
  { name: "Aston Martin", logo: "assets/teams/astonmartin.png", drivers: ["Fernando Alonso", "Lance Stroll"] },
  { name: "Williams", logo: "assets/teams/williams.png", drivers: ["Alexander Albon", "Carlos Sainz Jr."] },
  { name: "Audi F1 Team", logo: "assets/teams/audi.png", drivers: ["Nico Hülkenberg", "Gabriel Bortoleto"] },
  { name: "Alpine", logo: "assets/teams/alpine.png", drivers: ["Pierre Gasly", "Franco Colapinto"] },
  { name: "Haas", logo: "assets/teams/haas.png", drivers: ["Esteban Ocon", "Oliver Bearman"] },
  { name: "Racing Bulls", logo: "assets/teams/racing-bulls.png", drivers: ["Liam Lawson", "Arvid Lindblad"] },
  { name: "Cadillac F1 Team", logo: "assets/teams/cadillac.png", drivers: ["Sergio Pérez", "Valtteri Bottas"] }
];

// =================== CARDS ===================
function createChampCard(title, isDrivers = true) {
  const card = document.createElement("div");
  card.className = "race-card";

  // Imagem clicável para abrir/fechar dropdown
  const img = document.createElement("img");
  img.src = isDrivers ? "assets/heroes/tabela1.jpg" : "assets/heroes/tabela2.jpg";
  img.className = "dropdown-toggle";
  img.style.width = "100%";
  img.style.cursor = "pointer";

  // Título
  const h3 = document.createElement("h3");
  h3.textContent = title;

  // Tabela
  const table = document.createElement("table");
  table.className = "champ-table";
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  if (isDrivers) {
    thead.innerHTML = "<tr><th>Pos</th><th>Piloto</th><th>Pontos</th></tr>";
  } else {
    thead.innerHTML = "<tr><th>Pos</th><th>Equipa</th><th>Pontos</th></tr>";
  }

  table.appendChild(thead);
  table.appendChild(tbody);

  // Adicionar tudo ao card
  card.appendChild(img);
  card.appendChild(h3);
  card.appendChild(table);

  // Inicialmente mostrar os 5 primeiros, restante escondido
  tbody.querySelectorAll = function() { return []; }; // segurança para iterar
  tbody.style.display = "none";

  // Toggle dropdown
  img.addEventListener("click", () => {
    if (tbody.style.display === "none") {
      tbody.style.display = "table-row-group";
      img.src = isDrivers ? "assets/heroes/tabela2.jpg" : "assets/heroes/tabela1.jpg";
    } else {
      tbody.style.display = "none";
      img.src = isDrivers ? "assets/heroes/tabela1.jpg" : "assets/heroes/tabela2.jpg";
    }
  });

  return { card, tbody };
}

// =================== PILOTOS ===================
const mainSection = document.getElementById("championships");
const driversCard = createChampCard("Campeonato de Pilotos – 2026", true);
mainSection.appendChild(driversCard.card);

// Preencher tabela com todos os pilotos, pontos 0
const allDrivers = [];
teamsData.forEach(team => {
  team.drivers.forEach(driver => {
    allDrivers.push({ name: driver, points: 0 });
  });
});

// Ordenar por pontos decrescente (todos 0 inicialmente)
allDrivers.sort((a,b) => b.points - a.points);

// Inserir na tabela
allDrivers.forEach((d, i) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${i+1}</td><td>${d.name}</td><td>${d.points}</td>`;
  driversCard.tbody.appendChild(tr);
});

// =================== CONSTRUTORES ===================
const constructorsCard = createChampCard("Campeonato de Construtores – 2026", false);
mainSection.appendChild(constructorsCard.card);

// Preencher tabela com todas as equipas, pontos 0
const allConstructors = teamsData.map(team => ({ name: team.name, points: 0 }));
allConstructors.sort((a,b) => b.points - a.points);

// Inserir na tabela
allConstructors.forEach((c, i) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${i+1}</td><td>${c.name}</td><td>${c.points}</td>`;
  constructorsCard.tbody.appendChild(tr);
});
