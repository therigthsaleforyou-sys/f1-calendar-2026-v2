// ================= DADOS DE TESTE COMPLETOS =================
const calendar2026 = [
  {
    id: "australia",
    results2026: {
      race: [
        { driver: "Max Verstappen", team: "Red Bull Racing", points: 25 },
        { driver: "Lando Norris", team: "McLaren", points: 18 },
        { driver: "Charles Leclerc", team: "Ferrari", points: 15 },
        { driver: "Oscar Piastri", team: "McLaren", points: 12 },
        { driver: "Lewis Hamilton", team: "Ferrari", points: 10 },
        { driver: "Fernando Alonso", team: "Aston Martin", points: 8 },
        { driver: "George Russell", team: "Mercedes", points: 6 },
        { driver: "Carlos Sainz Jr.", team: "Williams", points: 4 },
        { driver: "Sergio Pérez", team: "Cadillac F1 Team", points: 2 },
        { driver: "Alexander Albon", team: "Williams", points: 1 },
        { driver: "Pierre Gasly", team: "Alpine", points: 0 },
        { driver: "Esteban Ocon", team: "Haas", points: 0 },
        { driver: "Lance Stroll", team: "Aston Martin", points: 0 },
        { driver: "Valtteri Bottas", team: "Cadillac F1 Team", points: 0 },
        { driver: "Nico Hülkenberg", team: "Audi F1 Team", points: 0 },
        { driver: "Gabriel Bortoleto", team: "Audi F1 Team", points: 0 },
        { driver: "Oliver Bearman", team: "Haas", points: 0 },
        { driver: "Franco Colapinto", team: "Alpine", points: 0 },
        { driver: "Liam Lawson", team: "Racing Bulls", points: 0 },
        { driver: "Arvid Lindblad", team: "Racing Bulls", points: 0 },
        { driver: "Kimi Antonelli", team: "Mercedes", points: 0 },
        { driver: "Isack Hadjar", team: "Red Bull Racing", points: 0 }
      ]
    }
  }
];

// ================= PILOTOS =================
const drivers = {};
calendar2026.forEach(race => {
  race.results2026.race.forEach(r => {
    if (!drivers[r.driver]) {
      drivers[r.driver] = { name: r.driver, points: 0 };
    }
    drivers[r.driver].points += r.points;
  });
});

const driverStandings = Object.values(drivers)
  .sort((a, b) => b.points - a.points);

const tbodyDrivers = document.querySelector("#drivers-champ tbody");
driverStandings.forEach((d, i) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${i + 1}</td>
    <td>${d.name}</td>
    <td>${d.points}</td>
  `;
  tbodyDrivers.appendChild(tr);
});

// ================= CONSTRUTORES =================
const constructors = {};
calendar2026.forEach(race => {
  race.results2026.race.forEach(r => {
    if (!constructors[r.team]) {
      constructors[r.team] = { name: r.team, points: 0 };
    }
    constructors[r.team].points += r.points;
  });
});

const constructorStandings = Object.values(constructors)
  .sort((a, b) => b.points - a.points);

const tbodyConstructors = document.querySelector("#constructors-champ tbody");
constructorStandings.forEach((c, i) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${i + 1}</td>
    <td>${c.name}</td>
    <td>${c.points}</td>
  `;
  tbodyConstructors.appendChild(tr);
});

// ================= DROPBOX =================
document.querySelectorAll(".championship-card").forEach(card => {
  card.classList.add("closed");

  const img = card.querySelector(".table-toggle");
  img.addEventListener("click", () => {
    card.classList.toggle("open");
    card.classList.toggle("closed");
  });
});
