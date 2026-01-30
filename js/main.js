document.addEventListener("DOMContentLoaded", () => {

  /* -------- BOTÃO VOLTAR AO TOPO -------- */
  document.getElementById("backToTop").onclick = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  /* -------- COUNTDOWN -------- */
  const countdownEl = document.getElementById("countdown");
  const now = new Date();

  let nextRace = calendar2026.find(r =>
    new Date(r.sessions.Race) > now
  );

  function updateCountdown() {
    if (!nextRace) {
      countdownEl.textContent = "Temporada concluída";
      return;
    }
    const diff = new Date(nextRace.sessions.Race) - new Date();
    if (diff <= 0) {
      countdownEl.textContent = "🏁 Corrida em andamento!";
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    countdownEl.textContent = `${d}d ${h}h ${m}m`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);

  /* -------- RENDER CORRIDAS -------- */
  const racesContainer = document.getElementById("races");
  racesContainer.innerHTML = "";

  calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";
    card.setAttribute("data-race", race.id);

    card.innerHTML = `
      <h3 class="race-header">${race.name} (${race.circuit})</h3>
      <img src="${race.image}" class="race-img" alt="${race.name}">
      <div class="race-body">
        <p><strong>FP1:</strong> ${race.sessions.FP1 || "—"}</p>
        <p><strong>FP2:</strong> ${race.sessions.FP2 || "—"}</p>
        <p><strong>FP3:</strong> ${race.sessions.FP3 || "—"}</p>
        <p><strong>Qualificação:</strong> ${race.sessions.Qualifying || "—"}</p>
        <p><strong>Corrida:</strong> ${race.sessions.Race}</p>
      </div>
    `;

    racesContainer.appendChild(card);
  });

  /* -------- DROPDOWN FUNCIONAL -------- */
  document.querySelectorAll(".race-header, .race-img").forEach(el => {
    el.onclick = () => {
      const body = el.parentElement.querySelector(".race-body");
      body.style.display = body.style.display === "block" ? "none" : "block";
    };
  });

  /* -------- TABELAS EXISTENTES -------- */
  if (typeof renderDrivers === "function") renderDrivers();
  if (typeof renderTeams === "function") renderTeams();

});
