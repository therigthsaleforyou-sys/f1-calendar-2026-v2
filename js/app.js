// ===============================
// F1 CALENDAR 2026 — APP CORE
// ===============================

// ===============================
// TIMEZONE (Portugal)
// ===============================

function formatLocalTime(iso) {
  const date = new Date(iso);
  return date.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Lisbon"
  });
}

// ===============================
// COUNTDOWN (para a CORRIDA)
// ===============================

function startCountdown(targetISO, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function update() {
    const now = Date.now();
    const target = new Date(targetISO).getTime();
    const diff = target - now;

    if (diff <= 0) {
      el.textContent = "Evento em curso";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);

    el.textContent = `${d}d ${h}h ${m}m`;
  }

  update();
  setInterval(update, 60000);
}

// ===============================
// PRÓXIMA CORRIDA
// ===============================

function getNextRace() {
  const now = new Date();
  return RACES_2026.find(r => new Date(r.sessions.race) > now);
}

// ===============================
// RESULTADOS 2026 (localStorage)
// ===============================

function getRaceResults(raceId) {
  return JSON.parse(localStorage.getItem(`results_${raceId}`)) || [];
}

function saveRaceResults(raceId, results) {
  localStorage.setItem(`results_${raceId}`, JSON.stringify(results));
}

// ===============================
// LOAD RACE PAGE
// ===============================

function loadRacePage(raceId) {
  const race = RACES_2026.find(r => r.id === raceId);
  if (!race) return;

  startCountdown(race.sessions.race, "countdown");

  const sessionsEl = document.getElementById("sessions");
  if (!sessionsEl) return;

  sessionsEl.innerHTML = "";

  if (race.sprint) {
    sessionsEl.innerHTML += `<p>FP1 — ${formatLocalTime(race.sessions.fp1)}</p>`;
    sessionsEl.innerHTML += `<p>Qualificação Sprint — ${formatLocalTime(race.sessions.sprintQuali)}</p>`;
    sessionsEl.innerHTML += `<p>Corrida Sprint — ${formatLocalTime(race.sessions.sprint)}</p>`;
  } else {
    sessionsEl.innerHTML += `<p>FP1 — ${formatLocalTime(race.sessions.fp1)}</p>`;
    sessionsEl.innerHTML += `<p>FP2 — ${formatLocalTime(race.sessions.fp2)}</p>`;
    sessionsEl.innerHTML += `<p>FP3 — ${formatLocalTime(race.sessions.fp3)}</p>`;
  }

  sessionsEl.innerHTML += `<p>Qualificação — ${formatLocalTime(race.sessions.quali)}</p>`;
  sessionsEl.innerHTML += `<p>Corrida — ${formatLocalTime(race.sessions.race)}</p>`;
}

// ===============================
// VOLTAR AO TOPO
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("backToTop");
  if (btn) {
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
