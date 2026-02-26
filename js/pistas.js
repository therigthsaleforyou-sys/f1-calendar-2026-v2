// js/pistas.js
// Versão final – Hero, Card da corrida, Favoritos e Back to Top
document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");
  const raceCardsWrapper = document.getElementById("race-cards");
  const backToTop = document.getElementById("back-to-top");

  // Identificar corrida atual pela pasta/filename
  const raceId = window.location.pathname.split("/").pop().replace(".html","");

  const race = calendar2026.find(r => r.id === raceId);
  if (!race) {
    console.error("Corrida não encontrada no calendar2026:", raceId);
    return;
  }

  /* =========================
     HERO
  ========================= */
  heroImage.src = race.raceImage || race.heroImage || race.cardImage;
  heroTitle.textContent = race.name;

  function startCountdown(dateISO, element) {
    function update() {
      const now = new Date();
      const target = new Date(dateISO);
      const diff = target - now;

      if (diff <= 0) {
        element.textContent = "🏁 Corrida terminada — ver resultados";
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      element.textContent = `🏁 ${d}d ${h}h ${m}m ${s}s 🏁`;
    }

    update();
    setInterval(update, 1000);
  }

  startCountdown(race.sessions.race, heroCountdown);

  /* =========================
     CARD DA CORRIDA
  ========================= */
  raceCardsWrapper.innerHTML = "";

  const card = document.createElement("div");
  card.className = "race-card";

  // Imagem do diagrama
  const img = document.createElement("img");
  img.src = race.diagram || race.diagram2d || "";
  img.alt = `Diagrama da pista – ${race.name}`;
  card.appendChild(img);

  // Header com título e favorito
  const header = document.createElement("div");
  header.className = "race-header";

  const title = document.createElement("h3");
  title.textContent = `${race.name} – 2026`;
  header.appendChild(title);

  const favBtn = document.createElement("button");
  favBtn.className = "fav-btn";
  favBtn.dataset.id = race.id;
  favBtn.textContent = "🏁";
  header.appendChild(favBtn);

  card.appendChild(header);

  // Detalhes da corrida
  const details = document.createElement("div");
  details.className = "race-details";

  details.innerHTML = `
    <h4>Resultados 2025</h4>
    <p><strong>Pole:</strong> ${race.results2025.pole}</p>
    <p><strong>Pódio:</strong> ${race.results2025.podium}</p>
    <p><strong>Volta mais rápida:</strong> ${race.results2025.fastestLap}</p>
    <p><strong>Meteorologia:</strong> ${race.results2025.weather}</p>
  `;

  card.appendChild(details);

  // Botão Ver Resultados
  const resultsBtn = document.createElement("a");
  resultsBtn.href = `resultados.html#${race.id}`;
  resultsBtn.className = "back-calendar-btn";
  resultsBtn.textContent = "🏁 Ver Resultados";
  card.appendChild(resultsBtn);

  raceCardsWrapper.appendChild(card);

  // Favoritos
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (favorites.includes(race.id)) favBtn.classList.add("active");

  favBtn.addEventListener("click", () => {
    if (favorites.includes(race.id)) {
      favorites.splice(favorites.indexOf(race.id), 1);
      favBtn.classList.remove("active");
    } else {
      favorites.push(race.id);
      favBtn.classList.add("active");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });

  // Drop-down dos detalhes
  img.addEventListener("click", () => {
    const open = !details.classList.contains("hidden");
    if (open) {
      details.style.maxHeight = "0";
      setTimeout(() => details.classList.add("hidden"), 300);
    } else {
      details.classList.remove("hidden");
      details.style.maxHeight = details.scrollHeight + "px";
    }
  });

  // Hero clicável → scroll até card
  heroImage.addEventListener("click", () => {
    card.scrollIntoView({ behavior: "smooth", block: "start" });
    details.classList.remove("hidden");
    details.style.maxHeight = details.scrollHeight + "px";
  });

  // BACK TO TOP
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
