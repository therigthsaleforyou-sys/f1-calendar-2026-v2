// js/noticias.js
document.addEventListener("DOMContentLoaded", () => {
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");
  const raceCards = Array.from(document.querySelectorAll(".race-card"));
  const backToTop = document.getElementById("back-to-top");

  /* =========================
     HERO – Corridas e Contador
  ========================= */
  const races = window.calendar2026 || [];

  // Primeira corrida fixa para o hero
  heroImage.src = "assets/heroes/australia_v2.jpg";
  heroTitle.textContent = "Grande Prémio da Austrália";

  function getActiveRace() {
    const now = new Date();
    return races.find(r => new Date(r.sessions.race) > now) || races[races.length - 1];
  }

  function startHeroCountdown(race) {
    heroCountdown.style.display = "block";
    function updateCountdown() {
      const now = new Date();
      const target = new Date(race.sessions.race);
      const diff = target - now;

      if (diff <= 0) {
        // Quando o countdown termina, muda hero para a corrida ativa
        heroImage.src = race.heroImage || race.cardImage;
        heroTitle.textContent = race.name;
        heroCountdown.style.display = "none";
        clearInterval(interval);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        heroCountdown.textContent = `🏁 ${d}d ${h}h ${m}m ${s}s 🏁`;
      }
    }
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
  }

  const activeRace = getActiveRace();
  if (activeRace) startHeroCountdown(activeRace);

  // Hero clicável leva ao card da corrida ativa
  heroImage.style.cursor = "pointer";
  heroImage.addEventListener("click", () => {
    const card = raceCards.find(c => c.dataset.id === activeRace?.id);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
      const details = card.querySelector(".race-details");
      if (details) {
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
    }
  });

  /* =========================
     CARDS – Abrir/Fechar Suave
  ========================= */
  raceCards.forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    if (!img || !details) return;

    details.classList.add("hidden");
    details.style.maxHeight = "0";
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      const isOpen = !details.classList.contains("hidden");

      if (isOpen) {
        details.style.maxHeight = details.scrollHeight + "px"; // garante transição
        requestAnimationFrame(() => {
          details.style.maxHeight = "0";
        });
        setTimeout(() => details.classList.add("hidden"), 400);
      } else {
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
    });
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
