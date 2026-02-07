// js/noticias.js
document.addEventListener("DOMContentLoaded", () => {

  const cards = Array.from(document.querySelectorAll(".race-card"));
  const hero = document.getElementById("hero");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();

  let activeCard = cards[0];
  let activeIndex = 0;

  /* =========================
     DETETAR CORRIDA ATIVA
     ========================= */
  cards.forEach((card, index) => {
    const raceDate = card.dataset.race;
    if (!raceDate) return;

    const raceEnd = new Date(raceDate + "T23:59:59");

    // A corrida ativa é a última cujo final ainda não passou
    if (raceEnd <= now) {
      activeCard = card;
      activeIndex = index;
    }
  });

  /* =========================
     HERO – IMAGEM
     ========================= */
  if (activeCard && heroImage) {
    const heroImg = activeCard.dataset.hero;
    if (heroImg) heroImage.src = heroImg;
  }

  /* =========================
     HERO – TÍTULO
     ========================= */
  if (heroTitle && activeCard) {
    const raceDate = activeCard.dataset.race;
    const raceEnd = new Date(raceDate + "T23:59:59");

    const fullTitle = activeCard.dataset.title; // Título completo

    if (now < raceEnd) {
      // Corrida ainda não começou / em contagem regressiva
      heroTitle.textContent = fullTitle;
    } else {
      // Corrida terminou
      heroTitle.textContent = `Acompanhe o pós ${fullTitle}`;
    }
  }

  /* =========================
     HERO CLICÁVEL
     ========================= */
  if (hero && activeCard) {
    hero.style.cursor = "pointer";
    hero.addEventListener("click", () => {
      activeCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

  /* =========================
     DROPBOX DOS CARDS
     ========================= */
  cards.forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");

    if (img && details) {
      details.classList.add("hidden"); // fechado ao carregar
      img.style.cursor = "pointer";

      img.addEventListener("click", () => {
        details.classList.toggle("hidden");
      });
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
