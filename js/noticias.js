document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".race-card");
  const hero = document.getElementById("hero");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();
  let activeCard = cards[0]; // padrão Austrália

  /* =========================
     DROPDOWN CARD
  ========================= */
  cards.forEach(card => {
    const details = card.querySelector(".race-details");
    card.addEventListener("click", () => {
      details.classList.toggle("hidden");
    });
  });

  /* =========================
     HERO DINÂMICO COM BASE NO RACE DATE
     Countdown invisível
  ========================= */
  function updateActiveCard() {
    const now = new Date();
    let lastFinished = cards[0];

    cards.forEach(card => {
      const startStr = card.dataset.start;
      if (!startStr) return;

      const raceDate = new Date(startStr + "T00:00:00");
      if (now >= raceDate) {
        lastFinished = card;
      }
    });

    activeCard = lastFinished;

    // Atualiza hero
    const imgSrc = activeCard.dataset.image;
    const title = activeCard.querySelector(".race-header h3").innerText;

    heroImage.src = imgSrc;
    heroTitle.textContent = title;
  }

  updateActiveCard();

  /* =========================
     HERO CLICÁVEL PARA SCROLL
  ========================= */
  hero.style.cursor = "pointer";
  hero.addEventListener("click", () => {
    activeCard.scrollIntoView({ behavior: "smooth", block: "start" });
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
     ATUALIZAÇÃO AUTOMÁTICA A CADA MINUTO
  ========================= */
  setInterval(updateActiveCard, 60000);

});
