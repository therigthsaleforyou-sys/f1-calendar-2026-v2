// js/teams.js
// Render simples de equipas F1 2026
// Mobile-first | sem dependências

document.addEventListener("DOMContentLoaded", () => {
  renderTeams();
  initBackToTop();
});

function renderTeams() {
  const container = document.getElementById("teams-cards");
  if (!container) return;

  const teams = [
    {
      name: "Red Bull Racing",
      drivers: "Max Verstappen / Sergio Pérez",
      logo: "assets/teams/redbull.png"
    },
    {
      name: "Ferrari",
      drivers: "Charles Leclerc / Lewis Hamilton",
      logo: "assets/teams/ferrari.png"
    },
    {
      name: "Mercedes",
      drivers: "George Russell / Kimi Antonelli",
      logo: "assets/teams/mercedes.png"
    },
    {
      name: "McLaren",
      drivers: "Lando Norris / Oscar Piastri",
      logo: "assets/teams/mclaren.png"
    },
    {
      name: "Aston Martin",
      drivers: "Fernando Alonso / Lance Stroll",
      logo: "assets/teams/astonmartin.png"
    },
    {
      name: "Alpine",
      drivers: "Pierre Gasly / Esteban Ocon",
      logo: "assets/teams/alpine.png"
    },
    {
      name: "Williams",
      drivers: "Alex Albon / Logan Sargeant",
      logo: "assets/teams/williams.png"
    },
    {
      name: "RB",
      drivers: "Yuki Tsunoda / Daniel Ricciardo",
      logo: "assets/teams/rb.png"
    },
    {
      name: "Sauber",
      drivers: "Valtteri Bottas / Zhou Guanyu",
      logo: "assets/teams/sauber.png"
    },
    {
      name: "Haas",
      drivers: "Kevin Magnussen / Nico Hülkenberg",
      logo: "assets/teams/haas.png"
    },
    {
      name: "Andretti Cadillac",
      drivers: "TBA / TBA",
      logo: "assets/teams/andretti.png"
    }
  ];

  teams.forEach(team => {
    const card = document.createElement("article");
    card.className = "team-card";

    card.innerHTML = `
      <img src="${team.logo}" alt="${team.name}">
      <h3>${team.name}</h3>
      <p>${team.drivers}</p>
    `;

    container.appendChild(card);
  });
}

/* ================= BACK TO TOP ================= */

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  btn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
