// =================== DADOS ===================
const teamsList = [
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

// =================== FUNÇÃO CRIAR TABELA ===================
function createTable(containerId, isDrivers) {
  const container = document.getElementById(containerId);
  
  // Imagem Dropbox
  const toggleImg = document.createElement("img");
  toggleImg.className = "card-toggle";
  toggleImg.src = isDrivers ? "assets/heroes/tabela1.jpg" : "assets/heroes/tabela2.jpg";
  container.insertBefore(toggleImg, container.firstChild);

  const tbody = container.querySelector("tbody");

  if (isDrivers) {
    teamsList.forEach(team => {
      team.drivers.forEach(driver => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>0</td>
          <td>${driver}</td>
          <td>0</td>
        `;
        tbody.appendChild(tr);
      });
    });
  } else {
    teamsList.forEach(team => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>0</td>
        <td>${team.name}</td>
        <td>0</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Ordena automaticamente por nome (alfabética)
  Array.from(tbody.rows)
    .sort((a,b) => a.cells[1].textContent.localeCompare(b.cells[1].textContent))
    .forEach(tr => tbody.appendChild(tr));

  // Esconder linhas após a 5ª
  Array.from(tbody.rows).forEach((row, i) => {
    if (i >= 5) row.classList.add("hidden-rows");
  });

  // Toggle Dropbox
  toggleImg.addEventListener("click", () => {
    Array.from(tbody.rows).forEach((row, i) => {
      if (i >= 5) row.classList.toggle("hidden-rows");
    });
    toggleImg.src = toggleImg.src.includes("tabela1.jpg") ? 
      "assets/heroes/tabela1.jpg".replace("tabela1.jpg","tabela1.jpg") :
      "assets/heroes/tabela2.jpg".replace("tabela2.jpg","tabela2.jpg");
  });
}

// =================== EXECUÇÃO ===================
createTable("drivers-champ", true);
createTable("constructors-champ", false);
