document.addEventListener("DOMContentLoaded", () => {
  markActiveMenu();
  renderHomepage();
  setupBackToTop();
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

/* HERO + COUNTDOWN */
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

function startCountdown(dateStr, el) {
  if (!dateStr) {
    el.textContent = "Horário indisponível";
    return;
  }

  function parseDate(str) {
    const [day, mon, time] = str.split(" ");
    const [h, m] = time.split(":");
    const months = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    return new Date(2026, months[mon], day, h, m);
  }

  const target = parseDate(dateStr);

  function update() {
    const diff = target - new Date();
    if (diff <= 0) {
      el.textContent = "🏁 A CORRIDA COMEÇOU 🏁";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    el.textContent = `🏁 ${d}d ${h}h ${m}m ${s}s 🏁`;
  }

  update();
  setInterval(update, 1000);
}

/* RACE CARDS */
function renderRaceCards() {
  const container = document.getElementById("race-cards");
  container.innerHTML = "";

  calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";
    card.dataset.id = race.id;

    card.innerHTML = `
      <img src="${race.image}" alt="${race.name}">
      <div class="race-header">
        <h3>${race.name}</h3>
        <button class="fav-btn">🏁</button>
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

    const favBtn = card.querySelector(".fav-btn");
    favBtn.addEventListener("click", () => {
      favBtn.classList.toggle("active");
      card.classList.toggle("favorite");
    });

    const toggle = card.querySelector(".details-toggle");
    const details = card.querySelector(".race-details");
    toggle.addEventListener("click", () => {
      details.classList.toggle("hidden");
    });

    container.appendChild(card);
  });
}

function fmt(v) {
  return v || "—";
}

/* BACK TO TOP */
function setupBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 300);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
