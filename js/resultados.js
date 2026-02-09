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

  // HERO da corrida ativa (Austrália neste caso)
  const activeRace = calendar2026.find(r => r.id === "australia");
  heroImage.src = activeRace.heroImage || "../assets/races/australia.jpg";
  heroTitle.textContent = `Resultados: ${activeRace.name}`;

  // FUNÇÃO PARA CRIAR CARD
  function createRaceCard(race) {
    const card = document.createElement("div");
    card.className = "race-card";
    card.dataset.id = race.id;

    if (favorites.includes(race.id)) card.classList.add("favorite");

    card.innerHTML = `
      <img class="race-image" src="../assets/diagramas/australia2d.jpg" alt="Diagrama da pista – ${race.name}">
      <div class="race-header">
        <h3>${race.name} – 2026</h3>
        <button class="fav-btn" data-id="${race.id}">🏁</button>
      </div>
      <div class="race-details hidden">
        <h4>Resultados 2026</h4>
        ${race.results2026.race.map(r => `
          <p><strong>${r.position}º</strong> ${r.driver} – ${r.team} – ${r.points} pts</p>
        `).join("")}
      </div>
    `;

    // Abrir detalhes ao clicar na imagem
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    img.addEventListener("click", () => {
      if (details.classList.contains("hidden")) {
        details.classList.remove("hidden");
      } else {
        details.classList.add("hidden");
      }
    });

    return card;
  }

  // Gerar card da Austrália
  raceResults.innerHTML = "";
  raceResults.appendChild(createRaceCard(activeRace));

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
