/* =========================
   DADOS DAS CORRIDAS 2026
========================= */

const races2026 = [
  {
    slug: "australia",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    date: "2026-03-08T05:00:00Z",
    image: "assets/australia.jpg",

    track: {
      length: "5.278 km",
      laps: 58,
      corners: 14,
      drs: 4,
      distance: "306.124 km"
    }
  },
  {
    slug: "bahrain",
    name: "Grande Prémio do Bahrain",
    circuit: "Sakhir",
    date: "2026-03-15T15:00:00Z",
    image: "assets/bahrain.jpg",

    track: {
      length: "5.412 km",
      laps: 57,
      corners: 15,
      drs: 3,
      distance: "308.238 km"
    }
  }
];

/* =========================
   FUNÇÕES AUXILIARES
========================= */

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

function countdown(targetDate) {
  const now = new Date();
  const diff = new Date(targetDate) - now;

  if (diff <= 0) return "Já começou";

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  return `${d}d ${h}h ${m}m ${s}s`;
}

/* =========================
   HOME PAGE
========================= */

const nextRaceEl = document.getElementById("next-race");
const appEl = document.getElementById("app");

if (nextRaceEl && appEl) {
  const nextRace = races2026[0];

  nextRaceEl.innerHTML = `
    <strong>${nextRace.name}</strong><br>
    Circuit: ${nextRace.circuit}<br><br>
    ${formatDate(nextRace.date)}<br><br>
    ⏱️ ${countdown(nextRace.date)}
  `;

  let html = `<h2>Calendário 2026</h2><ul>`;

  races2026.forEach(race => {
    html += `
      <li>
        <a href="race.html?race=${race.slug}">
          <strong>${race.name}</strong><br>
          ${race.circuit} — ${formatDate(race.date)}
        </a>
      </li>
    `;
  });

  html += "</ul>";
  appEl.innerHTML += html;
}

/* =========================
   PÁGINA DA CORRIDA
========================= */

const params = new URLSearchParams(window.location.search);
const raceSlug = params.get("race");

if (raceSlug) {
  const race = races2026.find(r => r.slug === raceSlug);
  const titleEl = document.getElementById("race-title");
  const contentEl = document.getElementById("race-content");

  if (race && titleEl && contentEl) {
    titleEl.textContent = race.name;

    contentEl.innerHTML = `
      <img src="${race.image}" style="width:100%;max-width:900px;border-radius:12px;margin-bottom:20px">

      <h2>${race.circuit}</h2>
      <p><strong>Data:</strong> ${formatDate(race.date)}</p>
      <p><strong>Início em:</strong> ${countdown(race.date)}</p>

      <h3>Ficha Técnica</h3>
      <ul>
        <li><strong>Comprimento:</strong> ${race.track.length}</li>
        <li><strong>Voltas:</strong> ${race.track.laps}</li>
        <li><strong>Curvas:</strong> ${race.track.corners}</li>
        <li><strong>Zonas DRS:</strong> ${race.track.drs}</li>
        <li><strong>Distância total:</strong> ${race.track.distance}</li>
      </ul>
    `;
  }
}
