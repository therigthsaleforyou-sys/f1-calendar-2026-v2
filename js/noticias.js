// js/noticias.js
document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".race-card"));
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const backToTop = document.getElementById("back-to-top");
  const heroCountdown = document.getElementById("hero-countdown");

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
    const heroImg = activeCard.dataset.hero || heroImage.src;
    heroImage.src = heroImg;
  }

  /* =========================
     HERO – TÍTULO
  ========================= */
  if (heroTitle && activeCard) {
    const fullTitle = activeCard.dataset.title || activeCard.querySelector(".race-header h3").textContent;
    heroTitle.textContent = fullTitle;
  }

  /* =========================
     HERO CLICÁVEL
  ========================= */
  if (activeCard && heroImage) {
    heroImage.style.cursor = "pointer";
    heroImage.addEventListener("click", () => {
      activeCard.scrollIntoView({ behavior: "smooth", block: "start" });
      const details = activeCard.querySelector(".race-details");
      if (details) {
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
    });
  }

  /* =========================
     DROPBOX DOS CARDS (efeito suave)
  ========================= */
  cards.forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    if (!img || !details) return;

    if (details.classList.contains("hidden")) details.style.maxHeight = "0";
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      const isOpen = !details.classList.contains("hidden");

      if (isOpen) {
        // fechar com animação
        details.style.maxHeight = details.scrollHeight + "px"; // garante altura inicial
        setTimeout(() => {
          details.style.transition = "max-height 0.4s ease";
          details.style.maxHeight = "0";
        }, 10);
        setTimeout(() => {
          details.classList.add("hidden");
          details.style.transition = "";
        }, 410);
      } else {
        details.classList.remove("hidden");
        details.style.transition = "max-height 0.4s ease";
        details.style.maxHeight = details.scrollHeight + "px";
        setTimeout(() => {
          details.style.transition = "";
        }, 410);
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
