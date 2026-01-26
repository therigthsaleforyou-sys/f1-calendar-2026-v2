document.addEventListener("DOMContentLoaded", () => {
  if (typeof races === "undefined") return;

  renderCalendar();
  renderNextRace();
});

/* ===========================
   CALENDÁRIO DE CORRIDAS
=========================== */
function renderCalendar() {
  const list = document.getElementById("race-list");
  if (!list) return;

  list.innerHTML = "";

  races.forEach(race => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${race.name}</strong> – ${race.country}
      <br>
      <a class="btn" href="${race.page}">Ver detalhes</a>
    `;
    list.appendChild(li);
  });
}

/* ===========================
   PRÓXIMA CORRIDA + COUNTDOWN
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

/* ===========================
   COUNTDOWN
=========================== */
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

    el.textContent =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update();
  setInterval(update, 1000);
}
