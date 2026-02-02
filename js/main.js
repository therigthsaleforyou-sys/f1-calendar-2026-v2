document.addEventListener("DOMContentLoaded", () => {
  markActiveMenu();
  renderHomepage();
});

function markActiveMenu() {
  document.querySelectorAll("nav a").forEach(link => {
    if (location.pathname.includes(link.getAttribute("href"))) {
      link.classList.add("active");
    }
  });
}

function renderHomepage() {
  if (!window.calendar2026) return;

  renderHero();
  renderRaceCards();
}

function renderHero() {
  const heroTitle = document.getElementById("hero-title");
  const heroImage = document.getElementById("hero-image");
  const heroCountdown = document.getElementById("hero-countdown");

  const nextRace = calendar2026[0];
  if (!nextRace) return;

  heroTitle.textContent = nextRace.name;
  heroImage.src = nextRace.image;
  heroImage.alt = nextRace.name;

  startCountdown(nextRace.sessions.race, heroCountdown);
}

function startCountdown(dateISO, el) {
  if (!dateISO) {
    el.textContent = "Horário indisponível";
    return;
  }

  function update() {
    const diff = new Date(dateISO) - Date.now();
    if (diff <= 0) {
      el.textContent = "Hoje";
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

function renderRaceCards() {
  const container = document.getElementById("race-cards");
  if (!container) return;

  container.innerHTML = "";

  calendar2026.forEach(race => {
    const card = document.createElement("article");
    card.className = "race-card";

    card.innerHTML = `
      <div class="race-header">
        <h3>${race.name}</h3>
        <button class="fav-btn">★</button>
      </div>

      <button class="details-toggle">Ver detalhes</button>

      <div class="race-details hidden">
        <div>FP1: ${fmt(race.sessions.fp1)}</div>
        <div>FP2: ${fmt(race.sessions.fp2)}</div>
        <div>FP3: ${fmt(race.sessions.fp3)}</div>
        <div>Qualifying: ${fmt(race.sessions.qualifying)}</div>
        <div>Race: ${fmt(race.sessions.race)}</div>
      </div>
    `;

    const toggle = card.querySelector(".details-toggle");
    const details = card.querySelector(".race-details");

    toggle.addEventListener("click", () => {
      details.classList.toggle("hidden");
    });

    const favBtn = card.querySelector(".fav-btn");
    favBtn.addEventListener("click", () => {
      favBtn.classList.toggle("active");
    });

    container.appendChild(card);
  });
}

function fmt(value) {
  if (!value) return "—";
  return value;
}
