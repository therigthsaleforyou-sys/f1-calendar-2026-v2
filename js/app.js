/* UTIL */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* DADOS DAS CORRIDAS */
const races = [
  {
    id: "australia",
    name: "Grande Prémio da Austrália",
    hero: "assets/races/australia.jpg",
    fp1: "2026-03-06T04:00:00+11:00",
    sessions: [
      "FP1 – Sexta-feira 04:00",
      "FP2 – Sexta-feira 08:00",
      "FP3 – Sábado 04:00",
      "Qualificação – Sábado 08:00",
      "Corrida – Domingo 04:00"
    ],
    history2025: {
      meteo: "Sol",
      pole: "Max Verstappen (1:15.321)",
      lap: "Charles Leclerc (1:18.443)",
      total: "1h24m12s",
      podium: "Verstappen / Norris / Leclerc"
    },
    results2026: ["Max Verstappen", "Sergio Pérez", "Charles Leclerc"]
  },
  {
    id: "china",
    name: "Grande Prémio da China",
    hero: "assets/races/china.jpg",
    fp1: "2026-03-13T04:00:00+08:00",
    sessions: [
      "FP1 – Sexta-feira 04:00",
      "FP2 – Sexta-feira 08:00",
      "FP3 – Sábado 04:00",
      "Qualificação – Sábado 08:00",
      "Corrida – Domingo 08:00"
    ],
    history2025: {
      meteo: "Nublado",
      pole: "Lewis Hamilton (1:31.876)",
      lap: "Lando Norris (1:34.112)",
      total: "1h36m08s",
      podium: "Hamilton / Verstappen / Norris"
    },
    results2026: ["Lando Norris", "Max Verstappen", "George Russell"]
  }
];

/* COUNTDOWN */
function startCountdown(dateISO, el) {
  function update() {
    const diff = new Date(dateISO) - new Date();
    if (diff <= 0) {
      el.textContent = "A decorrer";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    el.textContent = `${d}d ${h}h ${m}m`;
  }
  update();
  setInterval(update, 60000);
}

/* DETEÇÃO DE PÁGINA */
document.addEventListener("DOMContentLoaded", () => {
  const raceId = document.documentElement.dataset.raceId;
  const countdownEl = document.getElementById("countdown");

  /* PÁGINAS DE CORRIDA */
  if (raceId) {
    const race = races.find(r => r.id === raceId);

    if (countdownEl) startCountdown(race.fp1, countdownEl);

    document.getElementById("sessions-2026").innerHTML =
      "<ul class='list'>" + race.sessions.map(s => `<li>${s}</li>`).join("") + "</ul>";

    document.getElementById("history-2025").innerHTML = `
      <ul class="list">
        <li>Meteorologia: ${race.history2025.meteo}</li>
        <li>Pole: ${race.history2025.pole}</li>
        <li>Melhor volta: ${race.history2025.lap}</li>
        <li>Tempo total: ${race.history2025.total}</li>
        <li>Pódio: ${race.history2025.podium}</li>
      </ul>
    `;

    const stored = JSON.parse(localStorage.getItem("results-" + raceId)) || race.results2026;
    document.getElementById("results-2026").innerHTML =
      "<ol>" + stored.map(r => `<li>${r}</li>`).join("") + "</ol>";
  }

  /* HOMEPAGE */
  if (document.getElementById("next-race-name")) {
    const next = races[0];
    document.getElementById("next-race-name").textContent = next.name;
    document.getElementById("next-race-link").href = `race-${next.id}.html`;
    if (countdownEl) startCountdown(next.fp1, countdownEl);

    const cal = document.getElementById("calendar-races");
    if (cal) {
      cal.innerHTML = races
        .map(r => `<p><a href="race-${r.id}.html">${r.name}</a></p>`)
        .join("");
    }
  }
});
