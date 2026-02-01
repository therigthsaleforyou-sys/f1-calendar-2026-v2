// js/main.js
// Estado canónico — funcional
// NÃO altera layout, NÃO altera hero, NÃO altera CSS

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

  heroTitle.textContent = race.name;
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
    const diff = new Date(dateISO).getTime() - Date.now();

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

/* ================= CARDS (COMPLETO) ================= */

function renderCards(calendar) {
  const container = document.getElementById("race-cards");
  if (!container) return;

  container.innerHTML = "";

  calendar.forEach(race => {
    const card = document.createElement("article");
    card.className = "race-card";

    card.innerHTML = `
      <div class="race-click">
        <img src="${race.image}" alt="${race.name}">
        <h3 class="race-title">${race.name}</h3>
      </div>

      <button class="fav-btn" data-id="${race.id}">★</button>

      <div class="race-details hidden">
        <strong>Sessões</strong><br>
        Practice 1: ${format(race.sessions.practice1)}<br>
        Practice 2: ${format(race.sessions.practice2)}<br>
        Practice 3: ${format(race.sessions.practice3)}<br>
        Qualifying: ${format(race.sessions.qualifying)}<br>
        Sprint: ${format(race.sessions.sprint)}<br>
        Race: ${format(race.sessions.race)}<br><br>

        <strong>Resultados 2025</strong><br>
        Pole: ${race.results2025?.pole || "—"}<br>
        Fastest Lap: ${race.results2025?.fastestLap || "—"}<br>
        Podium: ${race.results2025?.podium || "—"}<br>
      </div>
    `;

    // Clique na imagem / título
    card.querySelector(".race-click").onclick = () => {
      card.querySelector(".race-details").classList.toggle("hidden");
    };

    // Favoritos
    const favBtn = card.querySelector(".fav-btn");
    const favs = JSON.parse(localStorage.getItem("favs") || "[]");

    if (favs.includes(race.id)) {
      card.classList.add("fav");
    }

    favBtn.onclick = () => {
      let favs = JSON.parse(localStorage.getItem("favs") || "[]");

      if (favs.includes(race.id)) {
        favs = favs.filter(id => id !== race.id);
        card.classList.remove("fav");
      } else {
        favs.push(race.id);
        card.classList.add("fav");
      }

      localStorage.setItem("favs", JSON.stringify(favs));
    };

    container.appendChild(card);
  });
}

/* ================= HELPERS ================= */

function format(dateISO) {
  if (!dateISO) return "—";
  const d = new Date(dateISO);
  return d.toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
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
