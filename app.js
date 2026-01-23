/*********************************
 * F1 2026 — APP.JS GLOBAL
 * Seguro para TODAS as páginas
 *********************************/

/* ==============================
   UTILITÁRIOS
================================ */
function formatCountdown(ms) {
  if (ms <= 0) return "Em andamento";

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

/* ==============================
   DADOS — AUSTRÁLIA (EXEMPLO)
================================ */
const raceData = {
  name: "Grande Prémio da Austrália",
  nextSession: {
    name: "FP1",
    date: "2026-03-06T02:30:00+00:00"
  },
  sessions: [
    { name: "FP1", date: "2026-03-06T02:30:00+00:00", label: "sexta-feira, 06/03, 02:30" },
    { name: "FP2", date: "2026-03-06T06:00:00+00:00", label: "sexta-feira, 06/03, 06:00" },
    { name: "FP3", date: "2026-03-07T02:30:00+00:00", label: "sábado, 07/03, 02:30" },
    { name: "Qualificação", date: "2026-03-07T06:00:00+00:00", label: "sábado, 07/03, 06:00" },
    { name: "Corrida", date: "2026-03-08T05:00:00+00:00", label: "domingo, 08/03, 05:00" }
  ]
};

/* ==============================
   COUNTDOWN HOME
================================ */
(function homeCountdown() {
  const countdownEl = document.getElementById("home-countdown");
  const sessionNameEl = document.getElementById("home-session-name");

  if (!countdownEl || !sessionNameEl) return;

  sessionNameEl.innerText = raceData.nextSession.name;
  const target = new Date(raceData.nextSession.date).getTime();

  function update() {
    const now = Date.now();
    countdownEl.innerText = formatCountdown(target - now);
  }

  update();
  setInterval(update, 1000);
})();

/* ==============================
   COUNTDOWN PÁGINA CORRIDA
================================ */
(function raceCountdown() {
  const mainCountdown = document.getElementById("race-countdown");
  const nextSessionName = document.getElementById("next-session-name");
  const nextSessionCountdown = document.getElementById("next-session-countdown");

  if (!mainCountdown || !nextSessionName || !nextSessionCountdown) return;

  nextSessionName.innerText = raceData.nextSession.name;
  const target = new Date(raceData.nextSession.date).getTime();

  function update() {
    const now = Date.now();
    const diff = target - now;
    const formatted = formatCountdown(diff);

    mainCountdown.innerText = formatted;
    nextSessionCountdown.innerText = formatted;
  }

  update();
  setInterval(update, 1000);
})();

/* ==============================
   PROGRAMA DO EVENTO
================================ */
(function renderSchedule() {
  const container = document.getElementById("event-schedule");
  if (!container) return;

  container.innerHTML = "";

  raceData.sessions.forEach(s => {
    const p = document.createElement("p");
    p.innerText = `${s.name} — ${s.label}`;
    container.appendChild(p);
  });
})();

/* ==============================
   BOTÃO IMPRIMIR (SÓ CORRIDA)
================================ */
(function printButton() {
  const container = document.getElementById("print-container");
  if (!container) return;

  const btn = document.createElement("button");
  btn.className = "btn";
  btn.innerText = "🖨️ Imprimir";
  btn.onclick = () => window.print();

  container.appendChild(btn);
})();

/* ==============================
   BOTÃO VOLTAR AO TOPO
================================ */
(function backToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
})();
