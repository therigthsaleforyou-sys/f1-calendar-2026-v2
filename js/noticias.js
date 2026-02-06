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
     HERO – TÍTULO DINÂMICO
     ========================= */
  if (heroTitle && activeCard) {
    const raceDate = activeCard.dataset.race;
    const raceEnd = raceDate ? new Date(raceDate + "T23:59:59") : null;

    const titleBase = activeCard.dataset.title
      ? activeCard.dataset.title
          .replace("Grande Prémio da ", "")
          .replace("Grande Prémio do ", "")
          .replace("Grande Prémio de ", "")
      : "corrida"; // fallback caso title esteja vazio

    if (raceEnd && now < raceEnd) {
      heroTitle.textContent = `Grande Prémio da ${titleBase}`;
    } else if (raceEnd) {
      heroTitle.textContent = `Acompanhe o pós Grande Prémio da ${titleBase}`;
    } else {
      heroTitle.textContent = `Próxima corrida`; // fallback se data não existir
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
      details.classList.add("hidden"); // começa fechada
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
