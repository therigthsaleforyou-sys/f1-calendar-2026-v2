document.addEventListener("DOMContentLoaded", () => {
  if (typeof races === "undefined") return;

  if (document.querySelector(".home")) {
    initHome();
  }

  if (document.querySelector(".race-page")) {
    initRacePage();
  }
});

/* =========================
   HOME
========================= */
function initHome() {
  renderCalendar();
  renderNextRace();
}

function renderCalendar() {
  const list = document.getElementById("race-list");
  if (!list) return;

  list.innerHTML = "";

  races.forEach(race => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${race.name}</strong> – ${race.country}<br>
      <a class="btn" href="${race.page}">Ver detalhes</a>
    `;
    list.appendChild(li);
  });
}

function renderNextRace() {
  const now = new Date();

  const upcoming = races
    .map(r => ({ ...r, date: new Date(r.fp1) }))
    .filter(r => r.date > now)
    .sort((a, b) => a.date - b.date)[0];

  if (!upcoming) return;

  const raceLink = document.getElementById("race-link");
  if (raceLink) raceLink.href = upcoming.page;

  startCountdown(upcoming.date, "countdown");
}

/* =========================
   COUNTDOWN GENÉRICO
========================= */
function startCountdown(targetDate, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function update() {
    const now = new Date();
    const diff = targetDate - now;

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
   PÁGINAS DE CORRIDA
========================= */
function initRacePage() {
  const raceId = document.documentElement.getAttribute("data-race-id");
  const race = races.find(r => r.id === raceId);
  if (!race) return;

  startCountdown(new Date(race.fp1), "internal-countdown");
}
