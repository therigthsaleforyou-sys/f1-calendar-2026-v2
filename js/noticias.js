// js/noticias.js
// Página Notícias – Hero dinâmico + Dropbox + Back to Top

document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".race-card");
  const hero = document.getElementById("hero");
  const heroImage = document.getElementById("hero-image");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();
  let activeCard = cards[0]; // default: Austrália

  /* =========================
     DROPBOX DOS CARDS
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
       LÓGICA DE DATAS DO HERO
    ========================= */

    const endDateStr = card.dataset.end;
    if (!endDateStr) return;

    const raceEnd = new Date(endDateStr + "T23:59:59");

    if (raceEnd <= now) {
      activeCard = card;
    }
  });

  /* =========================
     HERO DINÂMICO
  ========================= */

  if (activeCard) {
    const heroImg = activeCard.dataset.image;

    if (heroImg) {
      heroImage.src = heroImg;
    }

    hero.style.cursor = "pointer";

    hero.addEventListener("click", () => {
      activeCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
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
