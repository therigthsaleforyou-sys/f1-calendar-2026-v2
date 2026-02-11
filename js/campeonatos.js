// ========================== campeonatos.js ==========================

// Pilotos e Construtores conforme definição obrigatória
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

// ========================== Helper Functions ==========================
function createCard(title) {
  const card = document.createElement("div");
  card.className = "race-card";
  card.style.border = "2px solid #ff0000";
  card.style.boxShadow = "0 0 8px #000";
  card.style.marginBottom = "16px";
  card.style.borderRadius = "12px";
  card.style.padding = "12px";
  card.style.cursor = "pointer";

  const h3 = document.createElement("h3");
  h3.textContent = title;
  card.appendChild(h3);

  const dropbox = document.createElement("div");
  dropbox.className = "dropbox";
  dropbox.style.maxHeight = "none"; // abrimos toda a dropbox
  dropbox.style.overflow = "hidden";
  dropbox.style.transition = "max-height 0.4s ease";

  card.appendChild(dropbox);

  // Toggle DropBox clicando no card
  card.addEventListener("click", () => {
    if (dropbox.style.maxHeight && dropbox.style.maxHeight !== "0px") {
      dropbox.style.maxHeight = "0px";
    } else {
      dropbox.style.maxHeight = dropbox.scrollHeight + "px";
    }
  });

  return { card, dropbox };
}

// ========================== Render Pilotos ==========================
const driversCard = createCard("Campeonato de Pilotos – 2026");
document.querySelector("#championships").appendChild(driversCard.card);

teamsData.forEach(team => {
  team.drivers.forEach(driver => {
    const driverDiv = document.createElement("div");
    driverDiv.style.padding = "4px 0";
    driverDiv.textContent = driver;
    driversCard.dropbox.appendChild(driverDiv);
  });
});

// ========================== Render Construtores ==========================
const constructorsCard = createCard("Campeonato de Construtores – 2026");
document.querySelector("#championships").appendChild(constructorsCard.card);

teamsData.forEach(team => {
  const constructorDiv = document.createElement("div");
  constructorDiv.style.display = "flex";
  constructorDiv.style.alignItems = "center";
  constructorDiv.style.padding = "4px 0";

  const logo = document.createElement("img");
  logo.src = team.logo;
  logo.alt = team.name;
  logo.style.width = "40px";
  logo.style.height = "auto";
  logo.style.marginRight = "8px";

  const name = document.createElement("span");
  name.textContent = team.name;

  constructorDiv.appendChild(logo);
  constructorDiv.appendChild(name);
  constructorsCard.dropbox.appendChild(constructorDiv);
});

// ========================== CSS Suave ==========================
const style = document.createElement("style");
style.textContent = `
  .race-card:hover {
    box-shadow: 0 0 12px #000;
  }
  .dropbox > div:nth-child(n+6) {
    display: none; /* apenas top 5 visível por default */
  }
`;
document.head.appendChild(style);
