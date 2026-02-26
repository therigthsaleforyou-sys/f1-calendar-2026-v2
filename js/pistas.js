// js/pistas.js
// Controlo exclusivo das páginas individuais das corridas (ex.: australia.html)

document.addEventListener("DOMContentLoaded", () => {
  const heroCountdown = document.getElementById("hero-countdown");
  const backToTop = document.getElementById("back-to-top");
  const favBtn = document.querySelector(".fav-btn");

  // ======== DADOS DA CORRIDA (Austrália 2026) ========
  const raceId = "australia";
  const raceDateISO = "2026-03-08T05:00:00Z"; // data/hora oficial da corrida

  // ======== COUNTDOWN ========
  function startCountdown() {
    function update() {
      const now = new Date();
      const target = new Date(raceDateISO);
      const diff = target - now;

      if (diff <= 0) {
        heroCountdown.textContent = "🏁 Corrida terminada – ver resultados";
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      heroCountdown.textContent = `🏁 ${d}d ${h}h ${m}m ${s}s 🏁`;
    }

    update();
    setInterval(update, 1000);
  }

  startCountdown();

  // ======== FAVORITOS ========
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (favorites.includes(raceId)) favBtn.classList.add("active");

  favBtn.addEventListener("click", () => {
    if (favorites.includes(raceId)) {
      favorites = favorites.filter(id => id !== raceId);
      favBtn.classList.remove("active");
    } else {
      favorites.push(raceId);
      favBtn.classList.add("active");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });

  // ======== BOTÃO VOLTAR AO TOPO ========
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
