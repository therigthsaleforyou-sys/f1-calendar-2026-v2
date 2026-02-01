// js/main.js
// Estado canónico — mobile-first
// NÃO mexe em calendar2026.js

document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não encontrado");
    return;
  }

  const now = new Date();

  const nextRace =
    window.calendar2026.find(r => new Date(r.sessions.race) > now) ||
    window.calendar2026[0];

  renderHero(nextRace);
  renderCards(window.calendar2026);
  initBackToTop();
});

/* ================= HERO ================= */

function renderHero(race) {
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");
  const heroImage = document.getElementById("hero-image");

  if (!heroTitle || !heroCountdown || !heroImage) return;

  // 🔒 título simples (sem concatenação)
  heroTitle.textContent = race.name;

  // 🔒 imagem fixa do hero (NÃO a da corrida)
  heroImage.src = "assets/heroes/home-hero.jpg";
  heroImage.alt = "Calendário Fórmula 1 2026";

  startCountdown(race.sessions.race, heroCountdown);
}

/* ================= COUNTDOWN ================= */

function startCountdown(dateISO, el) {
  if (!dateISO || !el) {
    el.textContent = "—";
    return;
  }

  function update() {
    const now = Date.now();
    const target = new Date(dateISO).getTime();
    const diff = target - now;

    if (diff <= 0) {
      el.textContent = "Hoje";
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);

    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }

  update();
  setInterval(update, 1000);
}

/* ================= CARDS ================= */

function renderCards(calendar) {
  const container = document.getElementById("race-cards");
  if (!container) return;

  container.innerHTML = "";

  calendar.forEach(race => {
    const card = document.createElement("article");
    card.className = "race-card";

    card.innerHTML = `
      <img src="${race.image}" alt="${race.name}">
      <h3 class="race-title">${race.name}</h3>
    `;

    container.appendChild(card);
  });
}

/* ================= BACK TO TOP ================= */

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  btn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
