// js/teams.js
// Equipas e pilotos oficiais da temporada 2026 de Fórmula 1

document.addEventListener("DOMContentLoaded", () => {
  const teamsCards = document.getElementById("teams-cards");

  // Lista oficial de equipas e pilotos para 2026
  const teams = [
    {
      id: "mclaren",
      name: "McLaren",
      logo: "assets/teams/mclaren.png",
      drivers: ["Lando Norris", "Oscar Piastri"]
    },
    {
      id: "mercedes",
      name: "Mercedes",
      logo: "assets/teams/mercedes.png",
      drivers: ["George Russell", "Kimi Antonelli"]
    },
    {
      id: "redbull",
      name: "Red Bull Racing",
      logo: "assets/teams/redbull.png",
      drivers: ["Max Verstappen", "Isack Hadjar"]
    },
    {
      id: "ferrari",
      name: "Scuderia Ferrari",
      logo: "assets/teams/ferrari.png",
      drivers: ["Charles Leclerc", "Lewis Hamilton"]
    },
    {
      id: "astonmartin",
      name: "Aston Martin Aramco Honda",
      logo: "assets/teams/astonmartin.png",
      drivers: ["Fernando Alonso", "Lance Stroll"]
    },
    {
      id: "williams",
      name: "Williams",
      logo: "assets/teams/williams.png",
      drivers: ["Alexander Albon", "Carlos Sainz Jr."]
    },
    {
      id: "audi",
      name: "Audi Revolut F1 Team",
      logo: "assets/teams/audi.png",
      drivers: ["Nico Hülkenberg", "Gabriel Bortoleto"]
    },
    {
      id: "alpine",
      name: "Alpine F1 Team",
      logo: "assets/teams/alpine.png",
      drivers: ["Pierre Gasly", "Franco Colapinto"]
    },
    {
      id: "haas",
      name: "TGR Haas F1 Team",
      logo: "assets/teams/haas.png",
      drivers: ["Esteban Ocon", "Oliver Bearman"]
    },
    {
      id: "racing-bulls",
      name: "Racing Bulls",
      logo: "assets/teams/racing-bulls.png",
      drivers: ["Liam Lawson", "Arvid Lindblad"]
    },
    {
      id: "cadillac",
      name: "Cadillac Formula 1 Team",
      logo: "assets/teams/cadillac.png",
      drivers: ["Sergio Pérez", "Valtteri Bottas"]
    }
  ];

  // Gerar cards dinamicamente
  teams.forEach(team => {
    const card = document.createElement("div");
    card.className = "team-card";
    card.innerHTML = `
      <img src="${team.logo}" alt="${team.name}">
      <h3>${team.name}</h3>
      <p><strong>Pilotos:</strong></p>
      ${team.drivers.map(driver => `<p>${driver}</p>`).join("")}
    `;
    teamsCards.appendChild(card);
  });

  // Back to top button
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
