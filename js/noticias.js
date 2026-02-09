// js/noticias.js
document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".race-card");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const backToTop = document.getElementById("back-to-top");

  /* =========================
     HERO — REGRA DO COUNTDOWN
     ========================= */

  // Hero começa SEMPRE na Austrália
  heroImage.src = "assets/heroes/australia_v2.jpg";
  heroTitle.textContent = "Grande Prémio da Austrália";

  const races = Array.from(cards).map(card => ({
    card,
    date: new Date(card.dataset.race + "T00:00:00"),
    hero: card.dataset.hero,
    title: card.dataset.title
  }));

  function updateHeroByCountdown() {
    const now = new Date();

    for (let i = 0; i < races.length; i++) {
      if (now >= races[i].date) {
        heroImage.src = races[i].hero;
        heroTitle.textContent = races[i].title;
      }
    }
  }

  updateHeroByCountdown();
  setInterval(updateHeroByCountdown, 1000);

  /* =========================
     DROPBOX DOS CARDS (FIX FINAL)
     ========================= */

  cards.forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");

    if (!img || !details) return;

    details.style.maxHeight = "0";
    details.style.overflow = "hidden";
    details.style.transition = "max-height 0.4s ease";

    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      const isOpen = details.style.maxHeight !== "0px";

      if (isOpen) {
        details.style.maxHeight = "0";
      } else {
        details.style.maxHeight = details.scrollHeight + "px";
      }
    });
  });

  /* =========================
     HERO CLICK → SCROLL
     ========================= */

  heroImage.addEventListener("click", () => {
    const firstOpenCard = document.querySelector(".race-card");
    if (firstOpenCard) {
      firstOpenCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  /* =========================
     BACK TO TOP
     ========================= */

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

});
