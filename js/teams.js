// data/teams.js
const teams2026 = [
  {
    name: "Red Bull Racing",
    logo: "assets/teams/redbull.png",
    drivers: ["Max Verstappen", "Sergio Pérez"]
  },
  {
    name: "Mercedes",
    logo: "assets/teams/mercedes.png",
    drivers: ["Lewis Hamilton", "George Russell"]
  },
  {
    name: "Ferrari",
    logo: "assets/teams/ferrari.png",
    drivers: ["Charles Leclerc", "Carlos Sainz"]
  },
  {
    name: "McLaren",
    logo: "assets/teams/mclaren.png",
    drivers: ["Lando Norris", "Oscar Piastri"]
  },
  {
    name: "Alpine",
    logo: "assets/teams/alpine.png",
    drivers: ["Esteban Ocon", "Pierre Gasly"]
  },
  {
    name: "Aston Martin",
    logo: "assets/teams/astonmartin.png",
    drivers: ["Fernando Alonso", "Lance Stroll"]
  },
  {
    name: "AlphaTauri",
    logo: "assets/teams/alphatauri.png",
    drivers: ["Yuki Tsunoda", "Daniel Ricciardo"]
  },
  {
    name: "Alfa Romeo",
    logo: "assets/teams/alfaromeo.png",
    drivers: ["Valtteri Bottas", "Zhou Guanyu"]
  },
  {
    name: "Haas",
    logo: "assets/teams/haas.png",
    drivers: ["Kevin Magnussen", "Nico Hülkenberg"]
  },
  {
    name: "Williams",
    logo: "assets/teams/williams.png",
    drivers: ["Logan Sargeant", "Alexander Albon"]
  },
  {
    name: "Mercedes Junior/Reserve",
    logo: "assets/teams/reserve.png",
    drivers: ["Piloto reserva"]
  }
];

// Renderizar fichas
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("race-cards");
  if (!container) return;

  container.innerHTML = "";

  teams2026.forEach(team => {
    const card = document.createElement("article");
    card.className = "team-card";

    card.innerHTML = `
      <img src="${team.logo}" alt="${team.name}">
      <div class="team-name">${team.name}</div>
      <div class="team-drivers">${team.drivers.join(" / ")}</div>
    `;

    container.appendChild(card);
  });
});
