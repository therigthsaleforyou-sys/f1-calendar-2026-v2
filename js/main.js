document.addEventListener("DOMContentLoaded", () => {
  markActiveMenu();
  setupBackToTop();

  // Espera ativa até calendar2026 estar disponível
  const waitForCalendar = setInterval(() => {
    if (window.calendar2026 && Array.isArray(calendar2026) && calendar2026.length > 0) {
      clearInterval(waitForCalendar);
      renderHomepage();
    }
  }, 100);
});

/* MENU ATIVO */
function markActiveMenu() {
  document.querySelectorAll("nav a").forEach(link => {
    if (location.pathname.endsWith(link.getAttribute("href"))) {
      link.classList.add("active");
    }
  });
}

/* HOMEPAGE */
function renderHomepage() {
  renderHero();
  renderRaceCards();
}

/* HERO + COUNTDOWN */
function renderHero() {
  const heroTitle = document.getElementById("hero-title");
  const heroImage = document.getElementById("hero-image");
  const heroCountdown = document.getElementById("hero-countdown");

  if (!heroTitle || !heroImage || !heroCountdown) return;

  const nextRace = calendar2026[0];
  if (!nextRace) return;

  heroTitle.textContent = nextRace.name;
  heroImage.src = nextRace.image;
  heroImage.alt = nextRace.name;

  startCountdown(nextRace.sessions.race, heroCountdown);
}

/* COUNTDOWN (CORRIGIDO E ESTÁVEL) */
function startCountdown(dateStr, el) {
  if (!dateStr || !el) {
    el.textContent = "Horário indisponível";
    return;
  }

  const target = new Date(dateStr);

  function update() {
    const now = new Date();
    const diff = target - now;

    if (diff > 0) {
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      el.textContent = `🏁 ${d}d ${h}h ${m}m ${s}s 🏁`;
    } else {
      el.textContent = "🏁 A CORRIDA COMEÇOU 🏁";
    }
  }

  update();
  setInterval(update, 1000);
}

/* FICHAS DAS CORRIDAS */
function renderRaceCards() {
  const container = document.getElementById("race-cards");
  if (!container) return;

  container.innerHTML = "";

  calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";

    card.innerHTML = `
      <img src="${race.image}" alt="${race.name}">
      <div class="race-header">
        <h3>${race.name}</h3>
        <button class="fav-btn">🏁</button>
      </div>
      <button class="details-toggle">Ver detalhes</button>
      <div class="race-details hidden">
        <div>FP1: ${race.sessions.fp1}</div>
        <div>FP2: ${race.sessions.fp2}</div>
        <div>FP3: ${race.sessions.fp3}</div>
        <div>Qualifying: ${race.sessions.qualifying}</div>
        <div>Race: ${race.sessions.race}</div>
      </div>
    `;

    // FAVORITO
    const favBtn = card.querySelector(".fav-btn");
    favBtn.addEventListener("click", () => {
      favBtn.classList.toggle("active");
      card.classList.toggle("favorite");
    });

    // VER DETALHES
    const toggle = card.querySelector(".details-toggle");
    const details = card.querySelector(".race-details");
    toggle.addEventListener("click", () => {
      details.classList.toggle("hidden");
    });

    container.appendChild(card);
  });
}

/* BOTÃO VOLTAR AO TOPO */
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
