// js/main.js
// Homepage – versão estável com hero dinâmico e imagens corretas

document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");
  const raceCards = document.getElementById("race-cards");
  const backToTop = document.getElementById("back-to-top");

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  /* =========================
     HERO – próxima corrida
  ========================= */

  function getNextRace() {
    const now = new Date();
    return calendar2026.find(r => new Date(r.sessions.race) > now);
  }

  function startCountdown(dateISO) {
    function update() {
      const now = new Date();
      const target = new Date(dateISO);
      const diff = target - now;

      if (diff <= 0) {
        heroCountdown.textContent = "🏁 Corrida terminada — ver resultados";
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      heroCountdown.textContent = `🏁 ${d}d ${h}h ${m}m ${s}s 🏁`;
    }

    update();
    setInterval(update, 1000);
  }

  const nextRace = getNextRace();

  if (nextRace) {
    // 👉 lógica FINAL e simples
    heroImage.src = nextRace.heroImage
      ? nextRace.heroImage
      : nextRace.cardImage;

    heroTitle.textContent = nextRace.name;
    startCountdown(nextRace.sessions.race);
  }

  /* =========================
     FICHAS DAS CORRIDAS
  ========================= */

  raceCards.innerHTML = "";

  calendar2026.forEach(race => {
    const isFavorite = favorites.includes(race.id);

    const card = document.createElement("div");
    card.className = "race-card";
    if (isFavorite) card.classList.add("favorite");

    card.innerHTML = `
      <img src="${race.cardImage}" alt="${race.name}">
      <div class="race-header">
        <h3>${race.name}</h3>
        <button class="fav-btn ${isFavorite ? "active" : ""}" data-id="${race.id}">🏁</button>
      </div>
      <button class="details-toggle">Ver detalhes</button>
      <div class="race-details hidden">
        <p><strong>FP1:</strong> ${race.sessions.fp1}</p>
        <p><strong>FP2:</strong> ${race.sessions.fp2}</p>
        <p><strong>FP3:</strong> ${race.sessions.fp3}</p>
        <p><strong>Qualificação:</strong> ${race.sessions.qualifying}</p>
        <p><strong>Corrida:</strong> ${race.sessions.race}</p>
      </div>
    `;

    raceCards.appendChild(card);
  });

  /* =========================
     FAVORITOS
  ========================= */

  raceCards.addEventListener("click", e => {
    if (e.target.classList.contains("fav-btn")) {
      const id = e.target.dataset.id;
      const card = e.target.closest(".race-card");

      if (favorites.includes(id)) {
        favorites.splice(favorites.indexOf(id), 1);
        e.target.classList.remove("active");
        card.classList.remove("favorite");
      } else {
        favorites.push(id);
        e.target.classList.add("active");
        card.classList.add("favorite");
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  });

  /* =========================
     VER DETALHES (dropdown)
  ========================= */

  raceCards.addEventListener("click", e => {
    if (e.target.classList.contains("details-toggle")) {
      const details = e.target.nextElementSibling;
      details.classList.toggle("hidden");
    }
  });

  /* =========================
     BACK TO TOP
  ========================= */

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
