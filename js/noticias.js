// js/noticias.js
document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".race-card");
  const hero = document.getElementById("hero");
  const heroImage = document.getElementById("hero-image");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();
  let activeCard = cards[0]; // default Austrália

  /* =========================
     DROPBOX
  ========================= */
  cards.forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");

    if (img && details) {
      img.addEventListener("click", () => {
        details.classList.toggle("hidden");
      });
    }

    /* =========================
       HERO → DATA DE INÍCIO
    ========================= */
    const startDateStr = card.dataset.start;
    if (!startDateStr) return;

    const raceStart = new Date(startDateStr + "T00:00:00");

    if (raceStart <= now) {
      activeCard = card;
    }
  });

  /* =========================
     HERO DINÂMICO
  ========================= */
  if (activeCard) {
    const heroImg = activeCard.dataset.image;

    if (heroImg) heroImage.src = heroImg;

    hero.style.cursor = "pointer";
    hero.addEventListener("click", () => {
      activeCard.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

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
