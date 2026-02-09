// js/noticias.js
document.addEventListener("DOMContentLoaded", () => {

  const raceCardsContainer = document.getElementById("race-cards");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();

  // =========================
  // CARD NOVIDADES (já está no HTML, mas adiciona mais se necessário)
  // =========================
  const novidadesCard = raceCardsContainer.querySelector(".race-card");

  // =========================
  // CARDS DAS CORRIDAS AUTOMÁTICOS
  // =========================
  if (window.calendar2026 && Array.isArray(calendar2026)) {
    calendar2026.forEach(race => {

      const card = document.createElement("div");
      card.className = "race-card";
      card.dataset.id = race.id;
      card.dataset.title = race.name;
      card.dataset.race = race.sessions.race;
      card.dataset.hero = race.heroImage || race.cardImage;

      card.innerHTML = `
        <img class="race-image" src="${race.cardImage}" alt="${race.name}">
        <div class="race-header">
          <h3>${race.name}</h3>
        </div>
        <div class="race-details hidden">
          <p><strong>FP1:</strong> ${race.sessions.fp1}</p>
          <p><strong>FP2:</strong> ${race.sessions.fp2}</p>
          <p><strong>FP3:</strong> ${race.sessions.fp3}</p>
          <p><strong>Qualificação:</strong> ${race.sessions.qualifying}</p>
          <p><strong>Corrida:</strong> ${race.sessions.race}</p>
          <div class="race-link-wrapper">
            <a class="race-link-btn" href="race/${race.id}.html">
              Conheça o GP F1 da ${race.name.replace("Grande Prémio da ", "")}
            </a>
          </div>
        </div>
      `;

      raceCardsContainer.appendChild(card);
    });
  }

  // =========================
  // ABRIR/FECHAR CARDS SUAVE
  // =========================
  raceCardsContainer.querySelectorAll(".race-card").forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    if (!img || !details) return;

    details.style.overflow = "hidden";
    details.style.transition = "max-height 0.4s ease";

    if (details.classList.contains("hidden")) {
      details.style.maxHeight = "0";
    } else {
      details.style.maxHeight = details.scrollHeight + "px";
    }

    img.addEventListener("click", () => {
      const isOpen = !details.classList.contains("hidden");

      if (isOpen) {
        details.style.maxHeight = "0";
        setTimeout(() => details.classList.add("hidden"), 400);
      } else {
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
    });
  });

  // =========================
  // HERO – clicar vai para o card ativo
  // =========================
  const firstRace = calendar2026 && calendar2026.length ? calendar2026[0] : null;
  heroImage.src = firstRace ? "assets/heroes/australia_v2.jpg" : "";

  heroImage.addEventListener("click", () => {
    // Encontrar a corrida ativa (última cujo fim não passou)
    let activeRaceCard = novidadesCard;
    if (calendar2026 && calendar2026.length) {
      const now = new Date();
      for (let i = 0; i < calendar2026.length; i++) {
        const raceEnd = new Date(calendar2026[i].sessions.race + "T23:59:59");
        if (now <= raceEnd) {
          const card = raceCardsContainer.querySelector(`.race-card[data-id="${calendar2026[i].id}"]`);
          if (card) activeRaceCard = card;
          break;
        }
      }
    }

    activeRaceCard.scrollIntoView({ behavior: "smooth", block: "start" });

    const details = activeRaceCard.querySelector(".race-details");
    if (details && details.classList.contains("hidden")) {
      details.classList.remove("hidden");
      details.style.maxHeight = details.scrollHeight + "px";
    }
  });

  // =========================
  // BACK TO TOP
  // =========================
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

});
