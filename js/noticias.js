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
     HERO – IMAGEM E TÍTULO
  ========================= */
  if (activeCard && heroImage) {
    const heroImg = activeCard.dataset.hero;
    if (heroImg) heroImage.src = heroImg;
  }

  if (heroTitle && activeCard) {
    const raceDate = activeCard.dataset.race;
    const raceEnd = new Date(raceDate + "T23:59:59");
    const fullTitle = activeCard.dataset.title;

    if (now < raceEnd) {
      heroTitle.textContent = fullTitle;
    } else {
      heroTitle.textContent = `Acompanhe o pós ${fullTitle}`;
    }
  }

  /* =========================
     HERO CLICÁVEL
  ========================= */
  if (hero && activeCard) {
    hero.style.cursor = "pointer";
    hero.addEventListener("click", () => {
      activeCard.scrollIntoView({ behavior: "smooth", block: "start" });
      const details = activeCard.querySelector(".race-details");
      if(details) {
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
    });
  }

  /* =========================
     DROPBOX DOS CARDS (TRANSIÇÃO SUAVE)
  ========================= */
  cards.forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");

    if (!img || !details) return;

    details.classList.add("hidden"); // fechado ao carregar
    details.style.maxHeight = "0";
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      const isOpen = !details.classList.contains("hidden");

      if (isOpen) {
        // FECHAR
        details.style.maxHeight = details.scrollHeight + "px"; // garante altura atual
        details.offsetHeight; // força reflow para a transição
        details.style.maxHeight = "0";

        details.addEventListener('transitionend', function handler() {
          details.classList.add("hidden");
          details.removeEventListener('transitionend', handler);
        });

      } else {
        // ABRIR
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
    });
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
