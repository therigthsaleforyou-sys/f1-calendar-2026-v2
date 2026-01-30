document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------
     Botão Voltar ao Topo
     -------------------------- */
  const backBtn = document.getElementById("backToTop");
  backBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* --------------------------
     Render Pilotos
     -------------------------- */
  const driversTable = document.getElementById("driversTable");
  if (driversTable) {
    driversTable.innerHTML = `
      <table>
        <tr><th>Piloto</th><th>Equipa</th><th>Pontos</th></tr>
        ${drivers.map(d => `
          <tr>
            <td>${d.name}</td>
            <td>${d.team}</td>
            <td>${d.points}</td>
          </tr>
        `).join("")}
      </table>
    `;
  }

  /* --------------------------
     Render Construtores
     -------------------------- */
  const teamsTable = document.getElementById("teamsTable");
  if (teamsTable) {
    teamsTable.innerHTML = `
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
  }

  /* --------------------------
     Render Fichas Corridas
     -------------------------- */
  const racesContainer = document.getElementById("races");
  if (!racesContainer) return;

  Object.keys(results2025).forEach(raceId => {
    const data2025 = results2025[raceId];
    const data2026Race = results2026[raceId] || {};

    const card = document.createElement("div");
    card.className = "race-card";
    card.setAttribute("data-race", raceId);

    card.innerHTML = `
      <h3 class="race-header">${raceId.toUpperCase()}</h3>
      <img src="assets/races/${raceId}.jpg" alt="${raceId}" class="race-img">
      <div class="race-body">
        <p><strong>Meteorologia 2025:</strong> ${data2025.weather}</p>
        <p><strong>Pole Position:</strong> ${data2025.pole.driver} (${data2025.pole.time})</p>
        <p><strong>Volta mais rápida:</strong> ${data2025.fastestLap.driver} (${data2025.fastestLap.time})</p>
        <p><strong>Pódio:</strong> ${data2025.podium.map(p => `${p.position}º ${p.driver} (${p.team})`).join(", ")}</p>
      </div>
    `;

    racesContainer.appendChild(card);
  });

  /* --------------------------
     Dropdowns das fichas
     -------------------------- */
  document.querySelectorAll(".race-header").forEach(header => {
    header.addEventListener("click", () => {
      const body = header.nextElementSibling;
      body.style.display = body.style.display === "block" ? "none" : "block";
    });
  });

  /* --------------------------
     Countdown Próxima Corrida
     -------------------------- */
  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    const nextRaceDate = new Date(); // substituir com a data real
    const updateCountdown = () => {
      const now = new Date();
      const diff = nextRaceDate - now;
      if (diff <= 0) {
        countdownEl.textContent = "Corrida em andamento!";
        return;
      }
      const h = Math.floor(diff / 1000 / 3600);
      const m = Math.floor((diff / 1000 % 3600) / 60);
      const s = Math.floor(diff / 1000 % 60);
      countdownEl.textContent = `${h}h ${m}m ${s}s`;
    };
    setInterval(updateCountdown, 1000);
    updateCountdown();
  }

});
