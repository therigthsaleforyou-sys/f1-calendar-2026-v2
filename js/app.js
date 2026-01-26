document.addEventListener("DOMContentLoaded", () => {
  calculateStandings();
  renderPilotsTable();
  renderConstructorsTable();
});

/* CALCULAR PONTOS */
function calculateStandings() {
  window.pilotPoints = {};
  teamsData.forEach(t => t.points = 0);

  races.forEach(race => {
    race.raceResult.forEach((driver, index) => {
      if (index < pointsSystem.length) {
        const pts = pointsSystem[index];
        pilotPoints[driver] = (pilotPoints[driver] || 0) + pts;

        const team = teamsData.find(t => t.drivers.includes(driver));
        if (team) team.points += pts;
      }
    });
  });
}

/* PILOTOS */
function renderPilotsTable() {
  const el = document.getElementById("pilots-table");
  if (!el) return;

  const sorted = Object.entries(pilotPoints)
    .sort((a, b) => b[1] - a[1]);

  let html = "<table><tr><th>Pos</th><th>Piloto</th><th>Pontos</th></tr>";
  sorted.forEach((p, i) => {
    html += `<tr><td>${i + 1}</td><td>${p[0]}</td><td>${p[1]}</td></tr>`;
  });
  html += "</table>";

  el.innerHTML = html;
}

/* CONSTRUTORES */
function renderConstructorsTable() {
  const el = document.getElementById("constructors-table");
  if (!el) return;

  const sorted = [...teamsData].sort((a, b) => b.points - a.points);

  let html = "<table><tr><th>Pos</th><th>Equipa</th><th>Pontos</th></tr>";
  sorted.forEach((t, i) => {
    html += `<tr><td>${i + 1}</td><td>${t.name}</td><td>${t.points}</td></tr>`;
  });
  html += "</table>";

  el.innerHTML = html;
}
