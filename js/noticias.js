// js/noticias.js
document.addEventListener("DOMContentLoaded", () => {

  const cards = Array.from(document.querySelectorAll(".race-card"));
  const hero = document.getElementById("hero");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const backToTop = document.getElementById("back-to-top");

  /* =========================
     FUNÇÃO PARA ATUALIZAR HERO
     ========================= */
  function updateHero() {
    const now = new Date();
    let activeCard = cards[0];

    // Encontrar a corrida mais recente ou próxima
    for (let card of cards) {
      const raceDate = card.dataset.race;
      if (!raceDate) continue;
      const raceEnd = new Date(raceDate + "T23:59:59");
      if (raceEnd <= now) {
        activeCard = card;
      } else {
        break; // a primeira corrida futura
      }
    }

    // Atualizar imagem
    if (activeCard && heroImage) {
      const heroImg = activeCard.dataset.hero;
      if (heroImg) heroImage.src = heroImg;
    }

    // Atualizar título
    if (heroTitle && activeCard) {
      const raceDate = activeCard.dataset.race;
      const raceEnd = raceDate ? new Date(raceDate + "T23:59:59") : null;

      const titleBase = activeCard.dataset.title
        ? activeCard.dataset.title
            .replace("Grande Prémio da ", "")
            .replace("Grande Prémio do ", "")
            .replace("Grande Prémio de ", "")
        : "corrida";

      if (raceEnd && now < raceEnd) {
        heroTitle.textContent = `Grande Prémio da ${titleBase}`;
      } else if (raceEnd) {
        heroTitle.textContent = `Acompanhe o pós Grande Prémio da ${titleBase}`;
      } else {
        heroTitle.textContent = `Próxima corrida`;
      }
    }

    return activeCard;
  }

  /* =========================
     HERO CLICÁVEL
     ========================= */
  function makeHeroClickable(activeCard) {
    if (hero && activeCard) {
      hero.style.cursor = "pointer";
      hero.onclick = () => {
        activeCard.scrollIntoView({ behavior: "smooth", block: "start" });
      };
    }
  }

  /* =========================
     DROPBOX DOS CARDS
     ========================= */
  cards.forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");

    if (img && details) {
      details.classList.add("hidden");
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

  /* =========================
     ATUALIZA HERO A CADA SEGUNDO
     ========================= */
  function refreshHero() {
    const activeCard = updateHero();
    makeHeroClickable(activeCard);
  }

  refreshHero(); // atualização inicial
  setInterval(refreshHero, 1000); // atualizar a cada segundo
});
