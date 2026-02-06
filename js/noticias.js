// js/noticias.js
document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".race-card");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();

  let lastCompletedRace = null;

  /* =========================
     DEFINIR HERO CORRETO
     Hero = última corrida cujo Countdown terminou
  ========================= */
  cards.forEach(card => {
    const raceId = card.dataset.id;
    const raceData = window.calendar2026.find(r => r.id === raceId);
    if (!raceData) return;

    const raceEnd = new Date(raceData.sessions.race);

    // Se o Countdown da corrida já passou, marca como última corrida concluída
    if (now >= raceEnd) {
      lastCompletedRace = { card, raceData };
    }
  });

  // Se nenhuma corrida terminou ainda, hero = primeira corrida (Austrália)
  if (!lastCompletedRace) {
    const firstRace = window.calendar2026[0];
    heroImage.src = firstRace.heroImage;
    heroTitle.textContent = firstRace.name + " 2026";
    lastCompletedRace = { card: cards[0], raceData: firstRace };
  } else {
    // Hero = última corrida concluída
    heroImage.src = lastCompletedRace.raceData.heroImage;
    heroTitle.textContent = lastCompletedRace.raceData.name + " 2026";
  }

  /* =========================
     CARDS INTERATIVOS (DROPBOX)
  ========================= */
  cards.forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");

    if (img && details) {
      img.addEventListener("click", () => {
        details.classList.toggle("hidden");
      });
    }
  });

  /* =========================
     HERO CLICÁVEL
     Leva ao card da última corrida concluída
  ========================= */
  heroImage.style.cursor = "pointer";
  heroImage.addEventListener("click", () => {
    if (lastCompletedRace && lastCompletedRace.card) {
      lastCompletedRace.card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
  heroTitle.style.cursor = "pointer";
  heroTitle.addEventListener("click", () => {
    if (lastCompletedRace && lastCompletedRace.card) {
      lastCompletedRace.card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  /* =========================
     BACK TO TOP
  ========================= */
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
