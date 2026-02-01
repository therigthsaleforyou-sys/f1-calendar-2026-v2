// js/main.js
// F1 Calendar 2026 — mobile-first, hero blindado

document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não encontrado");
    return;
  }

  const now = new Date();
  const nextRace = calendar2026.find(race => new Date(race.sessions.race) > now) || calendar2026[0];

  renderHero(nextRace);
  generateRaceCards();
  setupBackToTop();
});

/* ================= HERO ================= */

function renderHero(race) {
  const heroTitle = document.querySelector("#hero-title");
  const heroCountdown = document.querySelector("#hero-countdown");
  const heroImage = document.querySelector("#hero-image");

  if (!heroTitle || !heroCountdown || !heroImage) return;

  heroTitle.textContent = race.name;
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

/* ================= FICHAS DE CORRIDA ================= */

function generateRaceCards() {
  const container = document.querySelector("#race-cards");
  if (!container) return;

  container.innerHTML = "";

  calendar2026.forEach(race => {
    const card = document.createElement("article");
    card.classList.add("race-card");

    // Imagem + título clicáveis
    const img = document.createElement("img");
    img.src = race.image;
    img.alt = race.name;
    img.style.cursor = "pointer";
    img.addEventListener("click", () => toggleDropdown(card, race));

    const h3 = document.createElement("h3");
    h3.textContent = race.name;
    h3.classList.add("race-title");
    h3.style.cursor = "pointer";
    h3.addEventListener("click", () => toggleDropdown(card, race));

    // Botão favorito
    const favBtn = document.createElement("button");
    favBtn.classList.add("fav-btn");
    favBtn.innerHTML = "🏁";
    if (localStorage.getItem(`fav-${race.slug}`)) {
      favBtn.classList.add("fav-selected");
    }
    favBtn.addEventListener("click", e => {
      e.stopPropagation();
      toggleFavorite(favBtn, race.slug);
    });

    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(favBtn);
    container.appendChild(card);
  });
}

function toggleDropdown(card, race) {
  let dropdown = card.querySelector(".race-dropdown");
  if (!dropdown) {
    dropdown = document.createElement("div");
    dropdown.classList.add("race-dropdown");

    let html = `<h4>Sessões 2026</h4><ul>`;
    for (const [session, dateStr] of Object.entries(race.sessions)) {
      const date = new Date(dateStr);
      const day = String(date.getUTCDate()).padStart(2, "0");
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      html += `<li>${session}: ${day}/${month}/${date.getUTCFullYear()} ${hours}:${minutes}</li>`;
    }
    html += `</ul>`;

    if (race.results2025 && Object.keys(race.results2025).length) {
      html += `<h4>Resultados 2025</h4><ul>`;
      for (const [key, val] of Object.entries(race.results2025)) {
        html += `<li>${key}: ${val}</li>`;
      }
      html += `</ul>`;
    }

    dropdown.innerHTML = html;
    card.appendChild(dropdown);
  }

  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

/* ================= FAVORITOS ================= */

function toggleFavorite(btn, slug) {
  btn.classList.toggle("fav-selected");
  if (btn.classList.contains("fav-selected")) {
    localStorage.setItem(`fav-${slug}`, "true");
  } else {
    localStorage.removeItem(`fav-${slug}`);
  }
}

/* ================= BOTÃO VOLTAR AO TOPO ================= */

function setupBackToTop() {
  const btn = document.querySelector("#back-to-top");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
