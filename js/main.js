document.addEventListener("DOMContentLoaded", () => {

  /* DROPDOWNS GERAIS */
  document.querySelectorAll(".toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      target.style.display = target.style.display === "block" ? "none" : "block";
    });
  });

  /* CALENDÁRIO */
  const racesDiv = document.getElementById("races");

  races.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";

    card.innerHTML = `
      <div class="race-header">${race.name} · ${race.location}</div>
      <div class="race-body">
        <img src="${race.image}" alt="${race.name}">
        <p><strong>Corrida:</strong> ${race.sessions.race}</p>
      </div>
    `;

    card.querySelector(".race-header").onclick = () => {
      const body = card.querySelector(".race-body");
      body.style.display = body.style.display === "block" ? "none" : "block";
    };

    racesDiv.appendChild(card);
  });

  /* TABELA PILOTOS */
  const driversTable = document.getElementById("driversTable");
  driversTable.innerHTML = `
    <table>
      <tr><th>Piloto</th><th>Equipa</th><th>Pontos</th></tr>
      ${drivers.map(d => `<tr><td>${d.name}</td><td>${d.team}</td><td>${d.points}</td></tr>`).join("")}
    </table>
  `;

  /* TABELA CONSTRUTORES */
  const teamsTable = document.getElementById("teamsTable");
  teamsTable.innerHTML = `
    <table>
      <tr><th>Equipa</th><th>Pontos</th></tr>
      ${teams.map(t => `<tr><td>${t.name}</td><td>${t.points}</td></tr>`).join("")}
    </table>
  `;

  /* COUNTDOWN */
  const countdown = document.getElementById("countdown");
  const nextRace = new Date(races[0].datetime);

  function updateCountdown() {
    const now = new Date();
    const diff = nextRace - now;

    if (diff <= 0) {
      countdown.textContent = "🏁 Em curso";
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);

    countdown.textContent = `${d}d ${h}h ${m}m`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
});
