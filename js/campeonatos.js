// ===== Dados dos Pilotos e Construtores =====
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

// ===== POPULAR TABELAS =====
function populateChampionships() {
  const tbodyDrivers = document.querySelector("#drivers-champ tbody");
  const tbodyConstructors = document.querySelector("#constructors-champ tbody");

  // pilotos
  let pos = 1;
  teamsData.forEach(team => {
    team.drivers.forEach(driver => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${pos}</td><td>${driver}</td><td>—</td>`;
      tbodyDrivers.appendChild(tr);
      pos++;
    });
  });

  // construtores
  let cPos = 1;
  teamsData.forEach(team => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${cPos}</td><td>${team.name}</td><td>—</td>`;
    tbodyConstructors.appendChild(tr);
    cPos++;
  });

  // esconder após 5 linhas (Dropbox)
  [tbodyDrivers, tbodyConstructors].forEach(tbody => {
    Array.from(tbody.querySelectorAll("tr"))
      .forEach((tr, idx) => {
        if(idx >= 5) tr.classList.add("hidden");
      });
  });
}

// ===== DROPBOX =====
function setupDropbox() {
  const cards = document.querySelectorAll(".race-card");

  cards.forEach(card => {
    const toggle = card.querySelector(".dropbox-toggle");
    const rows = card.querySelectorAll("tbody tr");

    toggle.addEventListener("click", () => {
      const isOpen = toggle.dataset.open === "true";
      toggle.src = `../assets/heroes/${isOpen ? 'tabela2.jpg' : 'tabela1.jpg'}`;
      toggle.dataset.open = (!isOpen).toString();

      rows.forEach((tr, idx) => {
        if(idx >= 5) {
          tr.classList.toggle("hidden");
        }
      });
    });
  });
}

// ===== EXECUTAR =====
populateChampionships();
setupDropbox();
