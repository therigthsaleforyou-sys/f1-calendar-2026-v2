const races = [
  {
    name: "Grande Prémio da Austrália",
    date: "2026-03-08T05:00:00",
    location: "Melbourne",
    image: "assets/australia.jpg",
    link: "race.html"
  },
  {
    name: "Grande Prémio do Bahrein",
    date: "2026-03-22T16:00:00",
    location: "Sakhir",
    image: "assets/bahrain.jpg",
    link: "#"
  },
  {
    name: "Grande Prémio da Arábia Saudita",
    date: "2026-03-29T18:00:00",
    location: "Jeddah",
    image: "assets/saudiarabia.jpg",
    link: "#"
  }
];

const grid = document.getElementById("racesGrid");
const now = new Date();

// ordenar por data
races.sort((a, b) => new Date(a.date) - new Date(b.date));

// descobrir próxima corrida
let nextRaceIndex = races.findIndex(race => new Date(race.date) > now);

if (nextRaceIndex === -1) nextRaceIndex = 0;

// mover próxima corrida para o topo
const nextRace = races.splice(nextRaceIndex, 1)[0];
races.unshift(nextRace);

// render
races.forEach((race, index) => {
  const isNext = index === 0;

  const card = document.createElement("a");
  card.href = race.link;
  card.className = `race-card ${isNext ? "next-race" : ""}`;

  card.innerHTML = `
    <div class="race-card-bg" style="background-image:url('${race.image}')"></div>
    <div class="race-card-overlay">
      ${isNext ? `<span class="next-badge">PRÓXIMA</span>` : ""}
      <h2>${race.name}</h2>
      <p>${race.location}</p>
      <span>${new Date(race.date).toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "long"
      })}</span>
    </div>
  `;

  grid.appendChild(card);
});
