// DADOS BASE (exemplo inicial)
const races = [
  {
    name: "Australian Grand Prix",
    date: "2026-03-08T06:00:00Z",
    location: "Melbourne"
  },
  {
    name: "Bahrain Grand Prix",
    date: "2026-03-15T15:00:00Z",
    location: "Sakhir"
  }
];

// MOSTRAR LISTA
const racesContainer = document.getElementById("races");

races.forEach(race => {
  const div = document.createElement("div");
  div.className = "race";
  div.innerHTML = `
    <h3>${race.name}</h3>
    <p>${race.location}</p>
    <p>${new Date(race.date).toLocaleString("pt-PT")}</p>
  `;
  racesContainer.appendChild(div);
});

// COUNTDOWN
const nextRaceDate = new Date(races[0].date).getTime();
const timer = document.getElementById("timer");

setInterval(() => {
  const now = new Date().getTime();
  const diff = nextRaceDate - now;

  if (diff <= 0) {
    timer.innerText = "Fim de semana de corrida!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  timer.innerText = `${days}d ${hours}h ${minutes}m`;
}, 1000);
