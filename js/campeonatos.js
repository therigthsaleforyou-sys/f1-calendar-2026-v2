// ================= DADOS DAS EQUIPAS =================
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

// ================= DADOS DE RESULTADOS =================
// Apenas Austrália como exemplo
const calendar2026 = [
  {
    id: "australia",
    name: "Grande Prémio da Austrália",
    results2026: {
      race: [
        { driver: "Max Verstappen", team: "Red Bull Racing", position: 1, points: 25 },
        { driver: "Lando Norris", team: "McLaren", position: 2, points: 18 },
        { driver: "Charles Leclerc", team: "Ferrari", position: 3, points: 15 },
        { driver: "George Russell", team: "Mercedes", position: 4, points: 12 },
        { driver: "Lewis Hamilton", team: "Ferrari", position: 5, points: 10 },
        { driver: "Fernando Alonso", team: "Aston Martin", position: 6, points: 8 }
      ]
    }
  }
];

// ================= PILOTOS =================
const finishedRaces = calendar2026.filter(r => r.results2026?.race?.length);

const drivers = {};
finishedRaces.forEach(race => {
  race.results2026.race.forEach(r => {
    if (!drivers[r.driver]) {
      drivers[r.driver] = { name: r.driver, points: 0 };
    }
    drivers[r.driver].points += r.points;
  });
});

const driverStandings = Object.values(drivers).sort((a,b) => b.points - a.points);

const tbodyDrivers = document.querySelector("#drivers-champ tbody");
driverStandings.forEach((d, i) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${i+1}</td><td>${d.name}</td><td>${finishedRaces.length ? d.points : "—"}</td>`;
  tbodyDrivers.appendChild(tr);
});

// ================= CONSTRUTORES =================
const constructors = {};
finishedRaces.forEach(race => {
  race.results2026.race.forEach(r => {
    if (!constructors[r.team]) constructors[r.team] = { name: r.team, points: 0 };
    constructors[r.team].points += r.points;
  });
});

const constructorStandings = Object.values(constructors).sort((a,b) => b.points - a.points);

const tbodyConstructors = document.querySelector("#constructors-champ tbody");
constructorStandings.forEach((c, i) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${i+1}</td><td>${c.name}</td><td>${finishedRaces.length ? c.points : "—"}</td>`;
  tbodyConstructors.appendChild(tr);
});
