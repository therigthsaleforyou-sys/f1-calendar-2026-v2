document.addEventListener("DOMContentLoaded", () => {
  if (!window.RACES || !Array.isArray(window.RACES)) return;

  const races = window.RACES;
  const now = new Date();

  /* =========================
     FUNÇÃO COUNTDOWN
  ========================== */
  function startCountdown(targetDate, element) {
    function update() {
      const diff = targetDate - new Date();

      if (diff <= 0) {
        element.textContent = "Sessão iniciada";
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      element.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }

    update();
    setInterval(update, 1000);
  }

  /* =========================
     RESULTADOS 2026
  ========================== */
  function loadResults(raceId) {
    const allResults = JSON.parse(localStorage.getItem("results2026") || "{}");
    return allResults[raceId] || [];
  }

  function saveResults(raceId, results) {
    const allResults = JSON.parse(localStorage.getItem("results2026") || "{}");
    allResults[raceId] = results;
    localStorage.setItem("results2026", JSON.stringify(allResults));
  }

  function displayResults(raceId, container) {
    const results = loadResults(raceId);
    if (!results.length) {
      container.innerHTML = "<p>Ainda não existem resultados.</p>";
      return;
    }

    const list = document.createElement("ol");
    results.forEach(driver => {
      const li = document.createElement("li");
      li.textContent = driver;
      list.appendChild(li);
    });
    container.innerHTML = "";
    container.appendChild(list);
  }

  /* =========================
     CLASSIFICAÇÃO PILOTOS/CONSTRUTORES
  ========================== */
  const POINTS = [25,18,15,12,10,8,6,4,2,1];

  function updateChampionship() {
    const results = JSON.parse(localStorage.getItem("results2026") || "{}");
    const pilotPoints = JSON.parse(localStorage.getItem("pilotPoints") || "{}");
    const constructorPoints = JSON.parse(localStorage.getItem("constructorPoints") || "{}");

    for (const raceId in results) {
      results[raceId].forEach((pilot, idx) => {
        const pts = POINTS[idx] || 0;

        // Atualizar piloto
        pilotPoints[pilot] = (pilotPoints[pilot] || 0) + pts;

        // Atualizar construtor
        const team = window.TEAMS.find(t => t.drivers.includes(pilot))?.name;
        if (team) {
          constructorPoints[team] = (constructorPoints[team] || 0) + pts;
        }
      });
    }

    localStorage.setItem("pilotPoints", JSON.stringify(pilotPoints));
    localStorage.setItem("constructorPoints", JSON.stringify(constructorPoints));
  }

  /* =========================
     TABELA PILOTOS
  ========================== */
  function displayPilotTable() {
    const tableEl = document.getElementById("pilots-table");
    if (!tableEl) return;

    const pilotPoints = JSON.parse(localStorage.getItem("pilotPoints") || "{}");
    const entries = Object.entries(pilotPoints)
      .sort((a,b) => b[1] - a[1]);

    if (!entries.length) {
      tableEl.innerHTML = "<p>A calcular…</p>";
      return;
    }

    let html = '<table><thead><tr><th>Piloto</th><th>Pontos</th></tr></thead><tbody>';
    entries.forEach(([pilot, pts]) => {
      html += `<tr><td>${pilot}</td><td>${pts}</td></tr>`;
    });
    html += "</tbody></table>";
    tableEl.innerHTML = html;
  }

  /* =========================
     TABELA CONSTRUTORES
  ========================== */
  function displayConstructorTable() {
    const tableEl = document.getElementById("constructors-table");
    if (!tableEl) return;

    const constructorPoints = JSON.parse(localStorage.getItem("constructorPoints") || "{}");
    const entries = Object.entries(constructorPoints)
      .sort((a,b) => b[1] - a[1]);

    if (!entries.length) {
      tableEl.innerHTML = "<p>A calcular…</p>";
      return;
    }

    let html = '<table><thead><tr><th>Construtor</th><th>Pontos</th></tr></thead><tbody>';
    entries.forEach(([team, pts]) => {
      html += `<tr><td>${team}</td><td>${pts}</td></tr>`;
    });
    html += "</tbody></table>";
    tableEl.innerHTML = html;
  }

  /* =========================
     HOME – PRÓXIMA CORRIDA
  ========================== */
  const countdownEl = document.getElementById("countdown");
  const raceLinkEl = document.getElementById("race-link");

  if (countdownEl && raceLinkEl) {
    const upcoming = races
      .map(r => ({ ...r, fp1Date: new Date(r.sessions.fp1) }))
      .filter(r => r.fp1Date > now)
      .sort((a, b) => a.fp1Date - b.fp1Date)[0];

    if (upcoming) {
      startCountdown(upcoming.fp1Date, countdownEl);
      raceLinkEl.href = upcoming.page;
    } else {
      countdownEl.textContent = "Época terminada";
    }
  }

  /* =========================
     LISTA DE CORRIDAS (HOME)
  ========================== */
  const listEl = document.getElementById("race-list");
  if (listEl) {
    listEl.innerHTML = "";

    races.forEach(race => {
      const li = document.createElement("li");
      const date = new Date(race.sessions.race);

      li.innerHTML = `
        <strong>${race.name}</strong> – 
        ${date.toLocaleDateString()} 
        <a href="${race.page}">Ver</a>
      `;

      listEl.appendChild(li);
    });
  }

  /* =========================
     PÁGINA DE CORRIDA
  ========================== */
  const raceId = document.documentElement.dataset.raceId;
  if (raceId) {
    const race = races.find(r => r.id === raceId);
    if (!race) return;

    // Countdown FP1
    const internalCountdown = document.getElementById("internal-countdown");
    if (internalCountdown) {
      startCountdown(new Date(race.sessions.fp1), internalCountdown);
    }

    // Sessões 2026
    const sessionsDiv = document.getElementById("sessions-2026");
    if (sessionsDiv) {
      sessionsDiv.innerHTML = `
        <ul>
          <li>FP1: ${new Date(race.sessions.fp1).toLocaleString()}</li>
          <li>FP2: ${new Date(race.sessions.fp2).toLocaleString()}</li>
          <li>FP3: ${new Date(race.sessions.fp3).toLocaleString()}</li>
          <li>Qualificação: ${new Date(race.sessions.qualifying).toLocaleString()}</li>
          <li>Corrida: ${new Date(race.sessions.race).toLocaleString()}</li>
        </ul>
      `;
    }

    // Resultados 2026
    const resultsDiv = document.getElementById("results-2026");
    if (resultsDiv) {
      displayResults(raceId, resultsDiv);
    }
  }

  /* =========================
     TABELAS AUTOMÁTICAS
  ========================== */
  updateChampionship();
  displayPilotTable();
  displayConstructorTable();
});

/* =========================
   RESET CAMPEONATO (COM PASSWORD)
========================= */
function resetChampionship() {
  const code = prompt("Introduz o código de 4 dígitos para resetar o campeonato:");

  if (code !== "2026") {
    alert("Código incorreto. Operação cancelada.");
    return;
  }

  localStorage.removeItem("results2026");
  localStorage.removeItem("pilotPoints");
  localStorage.removeItem("constructorPoints");

  alert("Campeonato 2026 foi reiniciado com sucesso.");
  location.reload();
}
