document.addEventListener("DOMContentLoaded", () => {
  if (typeof races === "undefined") return;

  // Home
  if (document.querySelector(".home")) {
    renderCalendar();
    renderNextRace();
  }

  // Páginas de corrida
  const racePage = document.querySelector(".race-page");
  if (racePage) {
    const raceId = document.documentElement.getAttribute("data-race-id");
    const raceData = races.find(r => r.id === raceId);
    if (raceData) {
      startInternalCountdown(raceData.fp1);
      renderSessions(raceData);
    }
  }
});

/* ===========================
   COUNTDOWN HOME
=========================== */
function renderNextRace() {
  const now = new Date();

  const upcoming = races
    .map(r => ({ ...r, date: new Date(r.fp1) }))
    .filter(r => r.date > now)
    .sort((a, b) => a.date - b.date)[0];

  if (!upcoming) return;

  const raceLink = document.getElementById("race-link");
  if (raceLink) raceLink.href = upcoming.page;

  startCountdown(upcoming.date);
}

function startCountdown(targetDate) {
  const el = document.getElementById("countdown");
  if (!el) return;

  function update() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      el.textContent = "Sessão iniciada";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    el.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update();
  setInterval(update, 1000);
}

/* ===========================
   COUNTDOWN INTERNO (FP1) NAS CORRIDAS
=========================== */
function startInternalCountdown(fp1Date) {
  const el = document.getElementById("internal-countdown");
  if (!el) return;

  const targetDate = new Date(fp1Date);

  function update() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      el.textContent = "Sessão FP1 iniciada";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    el.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update();
  setInterval(update, 1000);
}

/* ===========================
   SESSÕES NAS CORRIDAS
=========================== */
function renderSessions(raceData) {
  const el = document.getElementById("sessions-2026");
  if (!el) return;

  let html = "";
  for (const [session, datetime] of Object.entries(raceData)) {
    if (["id","name","country","page","raceResult"].includes(session)) continue;
    const date = new Date(datetime);
    html += `<p>${session}: ${date.toLocaleString("pt-PT", {dateStyle:"short", timeStyle:"short"})}</p>`;
  }
  el.innerHTML = html || "Sem sessões disponíveis";
}

/* ===========================
   Função imprimir
=========================== */
function printPage() {
  window.print();
}
