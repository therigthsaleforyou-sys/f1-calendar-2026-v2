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
     LISTA DE CORRIDAS
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
});
