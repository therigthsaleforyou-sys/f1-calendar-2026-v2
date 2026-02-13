// js/teams.js

document.addEventListener("DOMContentLoaded", () => {

const teamsData = [
  {
    name: "McLaren",
    image: "assets/teams/mclaren.png",
    drivers: ["Lando Norris", "Oscar Piastri"]
  },
  {
    name: "Ferrari",
    image: "assets/teams/ferrari.png",
    drivers: ["Charles Leclerc", "Lewis Hamilton"]
  },
  {
    name: "Red Bull Racing",
    image: "assets/teams/redbull.png",
    drivers: ["Max Verstappen", "Isack Hadjar"]
  },
  {
    name: "Mercedes",
    image: "assets/teams/mercedes.png",
    drivers: ["George Russell", "Kimi Antonelli"]
  },
  {
    name: "Aston Martin",
    image: "assets/teams/astonmartin.png",
    drivers: ["Fernando Alonso", "Lance Stroll"]
  },
  {
    name: "Williams",
    image: "assets/teams/williams.png",
    drivers: ["Alexander Albon", "Carlos Sainz Jr."]
  },
  {
    name: "Alpine",
    image: "assets/teams/alpine.png",
    drivers: ["Pierre Gasly", "Franco Colapinto"]
  },
  {
    name: "Haas",
    image: "assets/teams/haas.png",
    drivers: ["Esteban Ocon", "Oliver Bearman"]
  },
  {
    name: "Racing Bulls",
    image: "assets/teams/racing-bulls.png",
    drivers: ["Liam Lawson", "Arvid Lindblad"]
  },
  {
    name: "Audi F1 Team",
    image: "assets/teams/audi.png",
    drivers: ["Nico Hülkenberg", "Gabriel Bortoleto"]
  },
  {
    name: "Cadillac F1 Team",
    image: "assets/teams/cadillac.png",
    drivers: ["Sergio Pérez", "Valtteri Bottas"]
  }
];

  const container = document.getElementById("teams-container");
  const backToTop = document.getElementById("back-to-top");

  teamsData.forEach(team => {
    const card = document.createElement("div");
    card.className = "team-card";

    card.innerHTML = `
      <img src="${team.image}" alt="${team.name}">
      <h3>${team.name}</h3>
      <p>${team.drivers.join(" & ")}</p>
    `;

    container.appendChild(card);
  });

  /* BACK TO TOP */
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

});
