document.addEventListener("DOMContentLoaded", () => {
  const races = window.RACES || [];
  const pageRaceId = document.documentElement.dataset.raceId;
  const hideResults = document.documentElement.dataset.hideResults === "true";

  /* =========================
     COUNTDOWN (FP1)
  ========================== */
  function startCountdown(dateStr, elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    function update() {
      const now = new Date();
      const target = new Date(dateStr);
      const diff = target - now;

      if (diff <= 0) {
        el.textContent = "Sessão iniciada";
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      el.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }

    update();
    setInterval(update, 1000);
  }

  /* =========================
     HOME – PRÓXIMA CORRIDA
  ========================== */
  if (!pageRaceId && document.getElementById("countdown")) {
    const now = new Date();

    const upcoming = races
      .map(r => ({
        ...r,
        fp1Date: new Date(r.sessions.fp1)
      }))
      .filter(r => r.fp1Date > now)
      .sort((a, b) => a.fp1Date - b.fp1Date)[0];

    if (upcoming) {
      startCountdown(upcoming.sessions.fp1, "countdown");

      const link = document.getElementById("race-link");
      if (link) link.href = upcoming.page;
    }
  }

  /* =========================
     PÁGINA DE CORRIDA
  ========================== */
  if (pageRaceId) {
    const race = races.find(r => r.id === pageRaceId);
    if (!race) return;

    // Countdown FP1
    startCountdown(race.sessions.fp1, "internal-countdown");

    // Sessões
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

    // 🚫 BLOQUEIO TOTAL DE RESULTADOS NAS CORRIDAS
    if (hideResults) return;
  }
});

/* =========================
   RESET CAMPEONATO
========================= */
function resetChampionship() {
  if (!confirm("Tens a certeza que queres resetar o campeonato 2026?")) return;

  localStorage.removeItem("results2026");
  localStorage.removeItem("pilotPoints");
  localStorage.removeItem("constructorPoints");

  alert("Campeonato 2026 reiniciado.");
  location.reload();
}
