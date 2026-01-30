document.addEventListener("DOMContentLoaded", () => {

  /* DROPDOWNS */
  document.querySelectorAll(".toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.target)
        .classList.toggle("hidden");
    });
  });

  /* RACES */
  const racesDiv = document.getElementById("races");
  races.forEach(race => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${race.name}</strong> – ${race.location}`;
    racesDiv.appendChild(div);
  });

  /* DRIVERS TABLE */
  const driversTable = document.getElementById("driversTable");
  driversTable.innerHTML = `
    <table>
      <tr><th>Piloto</th><th>Equipa</th><th>Pontos</th></tr>
      ${drivers.map(d =>
        `<tr><td>${d.name}</td><td>${d.team}</td><td>${d.points}</td></tr>`
      ).join("")}
    </table>
  `;

  /* TEAMS TABLE */
  const teamsTable = document.getElementById("teamsTable");
  teamsTable.innerHTML = `
    <table>
      <tr><th>Equipa</th><th>Pontos</th></tr>
      ${teams.map(t =>
        `<tr><td>${t.name}</td><td>${t.points}</td></tr>`
      ).join("")}
    </table>
  `;

  /* COUNTDOWN */
  const countdown = document.getElementById("countdown");
  const nextRace = races[0];

  function updateCountdown() {
    const now = new Date();
    const raceDate = new Date(nextRace.date);
    const diff = raceDate - now;

    if (diff <= 0) {
      countdown.textContent = "🏁 Corrida em andamento!";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);

    countdown.textContent = `${d}d ${h}h ${m}m`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
});
