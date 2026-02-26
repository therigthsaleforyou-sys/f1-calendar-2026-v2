// js/pistas.js
document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  // Identificador desta corrida
  const raceId = "australia";

  // Buscar dados da corrida pelo ID
  const race = calendar2026.find(r => r.id === raceId);
  if (!race) {
    console.error("Corrida não encontrada no calendar2026:", raceId);
    return;
  }

  // ================= HERO + COUNTDOWN =================
  const heroCountdown = document.getElementById("hero-countdown");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");

  heroImage.src = race.heroImage || race.cardImage;
  heroTitle.textContent = race.name;

  function startCountdown(dateISO) {
    function update() {
      const now = new Date();
      const target = new Date(dateISO);
      const diff = target - now;

      if (diff <= 0) {
        heroCountdown.textContent = "🏁 Corrida terminada — ver resultados";
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

  startCountdown(race.sessions.race);

  // ================= FAVORITOS =================
  const favBtn = document.querySelector(".fav-btn");
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (favorites.includes(raceId)) favBtn.classList.add("active");

  favBtn.addEventListener("click", () => {
    if (favorites.includes(raceId)) {
      favorites.splice(favorites.indexOf(raceId), 1);
      favBtn.classList.remove("active");
    } else {
      favorites.push(raceId);
      favBtn.classList.add("active");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });

  // ================= BACK TO TOP =================
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
