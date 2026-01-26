document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     DADOS BASE
  ========================== */
  const races = window.RACES || [];
  const teams = window.TEAMS || [];
  const pilots = window.PILOTS || [];
  const constructors = window.CONSTRUCTORS || [];

  /* =========================
     COUNTDOWN
  ========================== */
  function startCountdown(targetDate, element) {
    function update() {
      const diff = targetDate - new Date();
      if (diff <= 0) {
        element.textContent = "Sessão iniciada";
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      element.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }
    update();
    setInterval(update, 1000);
  }

  /* =========================
     HOME
  ========================== */
  const countdownEl = document.getElementById("countdown");
  const raceLink = document.getElementById("race-link");
  const raceList = document.getElementById("race-list");

  if (countdownEl && raceLink && races.length) {
    const upcoming = races
      .map(r => ({ ...r, fp1: new Date(r.sessions.fp1) }))
      .filter(r => r.fp1 > new Date())
      .sort((a, b) => a.fp1 - b.fp1)[0];

    if (upcoming) {
      startCountdown(upcoming.fp1, countdownEl);
      raceLink.href = upcoming.page;
    } else {
      countdownEl.textContent = "Época terminada";
    }
  }

  if (raceList && races.length) {
    raceList.innerHTML = "";
    races.forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${r.name}</strong> – <a href="${r.page}">Ver</a>`;
      raceList.appendChild(li);
    });
  }

  /* =========================
     PÁGINA DE CORRIDA
  ========================== */
  const raceId = document.documentElement.dataset.raceId;
  if (raceId) {
    const race = races.find(r => r.id === raceId);
    if (race) {
      const cd = document.getElementById("internal-countdown");
      if (cd) startCountdown(new Date(race.sessions.fp1), cd);

      const sessions = document.getElementById("sessions-2026");
      if (sessions) {
        sessions.innerHTML = `
          <ul>
            <li>FP1: ${new Date(race.sessions.fp1).toLocaleString()}</li>
            <li>FP2: ${new Date(race.sessions.fp2).toLocaleString()}</li>
            <li>FP3: ${new Date(race.sessions.fp3).toLocaleString()}</li>
            <li>Qualificação: ${new Date(race.sessions.qualifying).toLocaleString()}</li>
            <li>Corrida: ${new Date(race.sessions.race).toLocaleString()}</li>
          </ul>`;
      }

      const history = document.getElementById("history-2025");
      if (history && race.history2025) {
        history.innerHTML = `
          <ul>
            <li>Meteorologia: ${race.history2025.weather}</li>
            <li>Pole: ${race.history2025.pole}</li>
            <li>Volta mais rápida: ${race.history2025.fastestLap}</li>
            <li>Tempo total: ${race.history2025.totalTime}</li>
            <li>Pódio: ${race.history2025.podium.join(", ")}</li>
          </ul>`;
      }

      const results = document.getElementById("results-2026");
      if (results) {
        const all = JSON.parse(localStorage.getItem("results2026") || "{}");
        const raceResults = all[raceId] || [];
        results.innerHTML = raceResults.length
          ? `<ol>${raceResults.map(p => `<li>${p}</li>`).join("")}</ol>`
          : "<p>Ainda sem resultados.</p>";
      }
    }
  }

  /* =========================
     EQUIPAS
  ========================== */
  const teamsDiv = document.getElementById("teams-list");
  if (teamsDiv && teams.length) {
    teamsDiv.innerHTML = "";
    teams.forEach(t => {
      const div = document.createElement("div");
      div.innerHTML = `<h3>${t.name}</h3><ul>${t.drivers.map(d => `<li>${d}</li>`).join("")}</ul>`;
      teamsDiv.appendChild(div);
    });
  }

  /* =========================
     TABELA PILOTOS
  ========================== */
  const pilotsTable = document.getElementById("pilots-table");
  if (pilotsTable) {
    const points = JSON.parse(localStorage.getItem("pilotPoints") || "{}");
    pilotsTable.innerHTML = Object.keys(points).length
      ? `<table><tr><th>Piloto</th><th>Pontos</th></tr>${
          Object.entries(points)
            .sort((a,b)=>b[1]-a[1])
            .map(p=>`<tr><td>${p[0]}</td><td>${p[1]}</td></tr>`).join("")
        }</table>`
      : "<p>Ainda sem pontos.</p>";
  }

  /* =========================
     TABELA CONSTRUTORES
  ========================== */
  const constructorsTable = document.getElementById("constructors-table");
  if (constructorsTable) {
    const points = JSON.parse(localStorage.getItem("constructorPoints") || "{}");
    constructorsTable.innerHTML = Object.keys(points).length
      ? `<table><tr><th>Construtor</th><th>Pontos</th></tr>${
          Object.entries(points)
            .sort((a,b)=>b[1]-a[1])
            .map(p=>`<tr><td>${p[0]}</td><td>${p[1]}</td></tr>`).join("")
        }</table>`
      : "<p>Ainda sem pontos.</p>";
  }
});
