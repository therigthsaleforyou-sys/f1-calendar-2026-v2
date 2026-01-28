// ===============================
// F1 CALENDAR 2026 — APP CORE
// ===============================

// Função para formatar horário local de acordo com Lisboa
function formatLocalTime(iso) {
  const date = new Date(iso);
  return date.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Lisbon"
  });
}

// ===============================
// COUNTDOWN (FP1 ou sessão escolhida)
// ===============================
function startCountdown(targetISO, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function update() {
    const now = new Date().getTime();
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
  return RACES_2026.find(r => new Date(r.fp1) > now) || RACES_2026[0];
}

function showNextRace() {
  const race = getNextRace();
  const elName = document.getElementById("nextRaceName");
  const elCountdown = document.getElementById("nextRaceCountdown");
  const elLink = document.getElementById("nextRaceLink");

  if (elName) elName.textContent = race.name;
  if (elCountdown) startCountdown(race.fp1, "nextRaceCountdown");
  if (elLink) elLink.href = `race-${race.id}.html`;
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
// VOLTAR AO TOPO
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("backToTop");
  if (btn) {
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Mostrar próxima corrida na homepage
  showNextRace();

  // Preencher horários das sessões e resultados
  if (typeof populateSessions === "function") populateSessions();
  if (typeof populateResults === "function") populateResults();
});
