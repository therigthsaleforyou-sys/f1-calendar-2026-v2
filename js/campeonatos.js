// ================= Dados Pilotos e Construtores =================
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

// ================= Função para popular tabelas =================
function populateTables() {
  const tbodyDrivers = document.querySelector("#drivers-champ tbody");
  const tbodyConstructors = document.querySelector("#constructors-champ tbody");

  // Pilotos
  let driversList = [];
  teamsData.forEach(team => {
    team.drivers.forEach(driver => {
      driversList.push({ name: driver, points: 0, team: team.name });
    });
  });

  // Ordena automaticamente por pontos (0 neste momento)
  driversList.sort((a,b) => b.points - a.points);

  driversList.forEach((d,i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${i+1}</td><td>${d.name}</td><td>${d.points}</td>`;
    tbodyDrivers.appendChild(tr);
  });

  // Construtores
  let constructorsList = teamsData.map(team => ({ name: team.name, points: 0 }));
  constructorsList.sort((a,b) => b.points - a.points);

  constructorsList.forEach((c,i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${i+1}</td><td>${c.name}</td><td>${c.points}</td>`;
    tbodyConstructors.appendChild(tr);
  });
}

// ================= Dropdown toggles =================
document.querySelectorAll(".dropdown-toggle").forEach(img => {
  img.addEventListener("click", () => {
    const table = img.nextElementSibling.nextElementSibling; // Pega na tabela
    table.style.display = table.style.display === "table" ? "none" : "table";
  });
});

// ================= Inicialização =================
populateTables();
