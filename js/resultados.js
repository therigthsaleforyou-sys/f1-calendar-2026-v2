document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const raceResults = document.getElementById("race-results");
  const backToTop = document.getElementById("back-to-top");
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  // Corrida ativa
  function getActiveRace() {
    const now = new Date();
    const nextRace = calendar2026.find(r => new Date(r.sessions.race) > now);
    return nextRace || calendar2026[0];
  }
  const activeRace = getActiveRace();
  heroImage.src = activeRace.heroImage || activeRace.cardImage;
  heroTitle.textContent = `Resultados: ${activeRace.name}`;

  // Função para criar card
  function createRaceCard(race) {
    const card = document.createElement("div");
    card.className = "race-card";
    card.dataset.id = race.id;

    const isFav = favorites.includes(race.id);
    if (isFav) card.classList.add("favorite");

    card.innerHTML = `
      <img class="race-image" src="${race.cardImage}" alt="${race.name}">
      <div class="race-header">
        <h3>${race.name}</h3>
        <button class="fav-btn ${isFav ? "active" : ""}" data-id="${race.id}">🏁</button>
      </div>
      <div class="race-details hidden">
        <h4>Resultados 2026</h4>
        <p><strong>Pole:</strong> ${race.results2026?.pole || "–"}</p>
        <p><strong>Pódio:</strong> ${race.results2026?.podium || "–"}</p>
        <p><strong>Volta mais rápida:</strong> ${race.results2026?.fastestLap || "–"}</p>
        <p><strong>Meteorologia:</strong> ${race.results2026?.weather || "–"}</p>
      </div>
    `;

    // Abrir detalhes ao clicar na imagem
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");

    img.addEventListener("click", () => {
      if (details.classList.contains("hidden")) {
        details.classList.remove("hidden");
        details.style.opacity = 0;
        setTimeout(() => details.style.opacity = 1, 10);
      } else {
        details.style.opacity = 0;
        setTimeout(() => details.classList.add("hidden"), 200);
      }
    });

    return card;
  }

  // Gerar cards
  raceResults.innerHTML = "";
  calendar2026.forEach(race => {
    const card = createRaceCard(race);
    raceResults.appendChild(card);
  });

  // Favoritos
  raceResults.addEventListener("click", e => {
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

  // Back to top
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
