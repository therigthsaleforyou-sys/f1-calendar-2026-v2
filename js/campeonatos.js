// ================= DADOS MÍNIMOS =================
const calendar2026 = [
  {
    id: "australia",
    results2026: {
      race: [
        { driver: "Max Verstappen", team: "Red Bull", points: 25 },
        { driver: "Lando Norris", team: "McLaren", points: 18 },
        { driver: "Charles Leclerc", team: "Ferrari", points: 15 }
      ]
    }
  }
];

// ================= PILOTOS =================
const drivers = {};
calendar2026.forEach(race => {
  race.results2026?.race?.forEach(r => {
    if (!drivers[r.driver]) drivers[r.driver] = { name: r.driver, points: 0 };
    drivers[r.driver].points += r.points;
  });
});

const driverStandings = Object.values(drivers).sort((a, b) => b.points - a.points);
const tbodyDrivers = document.querySelector("#drivers-champ tbody");

driverStandings.forEach((d, i) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${i + 1}</td><td>${d.name}</td><td>${d.points}</td>`;
  tbodyDrivers.appendChild(tr);
});

// ================= CONSTRUTORES =================
const constructors = {};
calendar2026.forEach(race => {
  race.results2026?.race?.forEach(r => {
    if (!constructors[r.team]) constructors[r.team] = { name: r.team, points: 0 };
    constructors[r.team].points += r.points;
  });
});

const constructorStandings = Object.values(constructors).sort((a, b) => b.points - a.points);
const tbodyConstructors = document.querySelector("#constructors-champ tbody");

constructorStandings.forEach((c, i) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${i + 1}</td><td>${c.name}</td><td>${c.points}</td>`;
  tbodyConstructors.appendChild(tr);
});

// ================= DROPBOX =================
document.querySelectorAll(".race-card").forEach(card => {
  const table = card.querySelector("table");
  table.classList.add("dropbox");

  card.addEventListener("click", () => {
    card.classList.toggle("open");
  });
});
