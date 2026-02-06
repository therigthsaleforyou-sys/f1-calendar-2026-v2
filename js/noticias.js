document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".race-card:not(.novidades-card)");
  const hero = document.getElementById("hero");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();
  let activeCard = null;

  /* =========================
     DROPBOX (CARDS)
  ========================= */
  document.querySelectorAll(".race-card").forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");

    if (img && details) {
      img.addEventListener("click", () => {
        details.classList.toggle("hidden");
      });
    }
  });

  /* =========================
     CORRIDA ATIVA (NOTÍCIAS)
     regra:
     - Austrália mantém-se até China terminar
     - muda apenas quando o countdown da PRÓXIMA chegar a zero
  ========================= */
  cards.forEach(card => {
    const raceDate = card.dataset.race;
    if (!raceDate) return;

    const raceEnd = new Date(raceDate + "T23:59:59");

    if (raceEnd <= now) {
      activeCard = card;
    }
  });

  if (!activeCard) {
    activeCard = cards[0]; // fallback seguro
  }

  /* =========================
     HERO DINÂMICO + CLICÁVEL
  ========================= */
  if (activeCard) {
    heroImage.src = activeCard.dataset.hero;
    heroTitle.textContent = activeCard.dataset.title;
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
