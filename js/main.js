document.addEventListener("DOMContentLoaded", () => {

  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");
  const raceCards = document.getElementById("race-cards");

  /* =========================
     PARSER DATA PT
  ========================= */
  function parsePTDate(str) {
    // "DD/MM/YYYY HH:MM"
    if (!str) return NaN;

    const [date, time] = str.split(" ");
    const [d, m, y] = date.split("/").map(Number);
    const [h, min] = time.split(":").map(Number);

    return new Date(y, m - 1, d, h, min).getTime();
  }

  /* =========================
     COUNTDOWN
  ========================= */
  function formatCountdown(target) {
    const now = Date.now();
    const diff = target - now;

    if (isNaN(diff)) return "...";
    if (diff <= 0) return "RACE DAY";

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    return `${d}d ${h}h ${m}m ${s}s`;
  }

  /* =========================
     PRÓXIMA CORRIDA
  ========================= */
  const now = Date.now();

  const nextRace = calendar2026.find(race => {
    const t = parsePTDate(race.sessions.race);
    return t > now;
  });

  if (nextRace) {
    heroTitle.textContent = nextRace.name;
    heroCountdown.style.display = "block";
  }

  /* =========================
     CARDS
  ========================= */
  raceCards.innerHTML = "";

  calendar2026.forEach(race => {
    const raceTime = parsePTDate(race.sessions.race);

    const card = document.createElement("div");
    card.className = "race-card";

    card.innerHTML = `
      <div class="race-header">
        <h3>${race.name}</h3>
      </div>
      <div class="countdown race-countdown" data-time="${raceTime}">
        ...
      </div>
    `;

    raceCards.appendChild(card);
  });

  /* =========================
     LOOP GLOBAL
  ========================= */
  setInterval(() => {

    if (nextRace) {
      heroCountdown.textContent = formatCountdown(
        parsePTDate(nextRace.sessions.race)
      );
    }

    document.querySelectorAll(".race-countdown").forEach(el => {
      const t = Number(el.dataset.time);
      el.textContent = formatCountdown(t);
    });

  }, 1000);

});
