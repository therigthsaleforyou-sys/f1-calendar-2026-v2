// js/main.js
// Mobile-first, hero e countdown blindados

document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não encontrado");
    return;
  }

  const now = new Date();

  // Próxima corrida = primeira corrida com race no futuro
  const nextRace = calendar2026.find(race => new Date(race.sessions.race) > now) || calendar2026[0];

  renderHero(nextRace);
  renderCards(calendar2026);
  initBackToTop();
});

/* ================= HERO ================= */
function renderHero(race) {
  const heroTitle = document.querySelector("#hero-title");
  const heroCountdown = document.querySelector("#hero-countdown");
  const heroImage = document.querySelector("#hero-image");

  if (!heroTitle || !heroCountdown || !heroImage) return;

  heroTitle.textContent = race.name; // 🔴 texto único, sem duplicação
  heroImage.src = race.image;
  heroImage.alt = race.name;

  startCountdown(race.sessions.race, heroCountdown);
}

/* ================= COUNTDOWN ================= */
function startCountdown(dateISO, element) {
  if (!dateISO || !element) {
    element.textContent = "—";
    return;
  }

  function update() {
    const now = new Date().getTime();
    const target = new Date(dateISO).getTime();
    const diff = target - now;

    if (diff <= 0) {
      element.textContent = "Hoje";
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

/* ================= CARDS ================= */
function renderCards(calendar) {
  const container = document.querySelector("#race-cards");
  if (!container) return;

  container.innerHTML = "";

  calendar.forEach(race => {
    const card = document.createElement("article");
    card.className = "race-card";

    card.innerHTML = `
      <img src="${race.image}" alt="${race.name}">
      <h3 class="race-title">${race.name}</h3>
      <p>Pole: ${race.results2025?.pole || "—"}</p>
      <p>Fastest Lap: ${race.results2025?.fastestLap || "—"}</p>
      <p>Podium: ${race.results2025?.podium || "—"}</p>
      <p>Weather: ${race.results2025?.weather || "—"}</p>
      <p>Race Time: ${race.results2025?.raceTime || "—"}</p>
      <button class="favorite-btn">⭐ Favorito</button>
    `;

    container.appendChild(card);
  });

  // Adicionar rebordo vermelho nos favoritos
  container.querySelectorAll(".race-card").forEach(card => {
    const btn = card.querySelector(".favorite-btn");
    btn.addEventListener("click", () => {
      card.classList.toggle("favorite-active");
    });
  });
}

/* ================= BACK TO TOP ================= */
function initBackToTop() {
  const btn = document.querySelector("#back-to-top");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
