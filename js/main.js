// CORRIDAS
const racesContainer = document.getElementById("races-container");

races.forEach(race => {
  const card = document.createElement("div");
  card.className = "race-card";

  card.innerHTML = `
    <div class="race-header">${race.name}</div>
    <div class="race-image">
      <img src="${race.image}" alt="${race.name}">
    </div>
    <div class="race-details">
      <p><strong>Sessões:</strong></p>
      <p>FP1: ${race.sessions.fp1}</p>
      <p>FP2: ${race.sessions.fp2}</p>
      <p>Qualificação: ${race.sessions.quali}</p>
      <p>Corrida: ${race.sessions.race}</p>
      <hr>
      <p><strong>Histórico 2025:</strong></p>
      <p>Meteorologia: ${race.history2025.weather}</p>
      <p>Pole: ${race.history2025.pole}</p>
      <p>Melhor volta: ${race.history2025.fastestLap}</p>
      <p>Pódio: ${race.history2025.podium.join(", ")}</p>
    </div>
  `;

  card.querySelector(".race-header").onclick = () => {
    card.classList.toggle("open");
  };

  card.querySelector("img").onclick = () => {
    card.classList.toggle("open");
  };

  racesContainer.appendChild(card);
});

// PILOTOS
const driversTable = document.getElementById("drivers-table");
driversTable.innerHTML = `
<table>
<tr><th>Piloto</th><th>Equipa</th><th>Pontos</th></tr>
${drivers.map(d => `<tr><td>${d.name}</td><td>${d.team}</td><td>${d.points}</td></tr>`).join("")}
</table>
`;

// CONSTRUTORES
const constructorsTable = document.getElementById("constructors-table");
constructorsTable.innerHTML = `
<table>
<tr><th>Equipa</th><th>Pontos</th></tr>
${teams.map(t => `<tr><td>${t.name}</td><td>${t.points}</td></tr>`).join("")}
</table>
`;
