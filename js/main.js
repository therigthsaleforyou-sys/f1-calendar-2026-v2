// UTIL
function getTeamName(teamId) {
  const team = teams.find(t => t.id === teamId);
  return team ? team.name : teamId;
}

/* PILOTOS */
function renderDrivers() {
  if (!document.getElementById("driversTable")) return;

  const table = `
    <table>
      <tr><th>Piloto</th><th>Equipa</th><th>Pontos</th></tr>
      ${drivers.map(d => `
        <tr>
          <td>${d.name}</td>
          <td>${getTeamName(d.team)}</td>
          <td>${d.points}</td>
        </tr>
      `).join("")}
    </table>
  `;

  document.getElementById("driversTable").innerHTML = table;
}

/* CONSTRUTORES */
function renderTeams() {
  if (!document.getElementById("teamsTable")) return;

  const table = `
    <table>
      <tr><th>Construtor</th><th>Pontos</th></tr>
      ${teams.map(t => `
        <tr>
          <td>${t.name}</td>
          <td>${t.points}</td>
        </tr>
      `).join("")}
    </table>
  `;

  document.getElementById("teamsTable").innerHTML = table;
}

document.addEventListener("DOMContentLoaded", () => {
  renderDrivers();
  renderTeams();
});
