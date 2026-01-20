 // ==============================
// DADOS DAS CORRIDAS – F1 2026
// ==============================

const races2026 = [
  {
    slug: "australia",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    date: "2026-03-08T05:00:00",
    image: "assets/australia.jpg"
  },
  {
    slug: "bahrain",
    name: "Grande Prémio do Bahrain",
    circuit: "Sakhir",
    date: "2026-03-15T15:00:00",
    image: "assets/bahrain.jpg"
  }
];

// ==============================
// FUNÇÕES AUXILIARES
// ==============================

function formatDate(dateString) {
  return new Date(dateString).toLocaleString("pt-PT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function startCountdown(targetDate, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function update() {
    const now = new Date().getTime();
    const distance = new Date(targetDate).getTime() - now;

    if (distance <= 0) {
      el.textContent = "A decorrer ou já terminou";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    el.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update();
  setInterval(update, 1000);
}

// ==============================
// HOME PAGE
// ==============================

const nextRaceEl = document.getElementById("next-race");
const appEl = document.getElementById("app");

if (nextRaceEl && appEl) {
  const nextRace = races2026[0];

  nextRaceEl.innerHTML = `
    <strong>${nextRace.name}</strong><br>
    Circuit: ${nextRace.circuit}<br><br>
    <span id="home-countdown"></span>
  `;

  startCountdown(nextRace.date, "home-countdown");

  const listSection = document.createElement("section");
  listSection.innerHTML = "<h2>Calendário 2026</h2>";

  races2026.forEach(race => {
    const item = document.createElement("p");
    item.innerHTML = `
      <a href="race.html?race=${race.slug}">
        <strong>${race.name}</strong>
      </a><br>
      ${race.circuit} — ${formatDate(race.date)}
    `;
    listSection.appendChild(item);
  });

  appEl.appendChild(listSection);
}

// ==============================
// RACE PAGE
// ==============================

const params = new URLSearchParams(window.location.search);
const raceSlug = params.get("race");

if (raceSlug) {
  const race = races2026.find(r => r.slug === raceSlug);

  const titleEl = document.getElementById("race-title");
  const contentEl = document.getElementById("race-content");

  if (race && titleEl && contentEl) {
    titleEl.textContent = race.name;

    contentEl.innerHTML = `
      <img src="${race.image}" style="width:100%;max-width:800px;margin:20px 0;border-radius:10px;" alt="${race.circuit}">

      <p><strong>Circuit:</strong> ${race.circuit}</p>
      <p><strong>Data:</strong> ${formatDate(race.date)}</p>

      <h2>Contagem regressiva</h2>
      <p id="race-countdown"></p>

      <p style="margin-top:30px;">
        Mais detalhes da corrida serão adicionados aqui.
      </p>
    `;

    startCountdown(race.date, "race-countdown");
  }
}
