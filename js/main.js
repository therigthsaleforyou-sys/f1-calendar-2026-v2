// js/main.js
// Calendário Oficial F1 2026
// Versão v2 FINAL – 24 corridas
// Cards de corridas + botão "Ver Detalhes" para cada corrida
// Horários aproximados (UTC)

document.addEventListener("DOMContentLoaded", () => {
  const raceCards = document.getElementById("race-cards");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");
  const backToTop = document.getElementById("back-to-top");

  // Função para atualizar hero com a próxima corrida
  function updateHero() {
    const now = new Date();
    const nextRace = calendar2026.find(r => new Date(r.sessions.race) > now) || calendar2026[0];
    heroImage.src = nextRace.heroImage;
    heroTitle.textContent = nextRace.name;

    function updateCountdown() {
      const raceTime = new Date(nextRace.sessions.race);
      const diff = raceTime - new Date();
      if (diff <= 0) {
        heroCountdown.textContent = "A corrida começou!";
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      heroCountdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  updateHero();

  // Gerar cards de corrida dinamicamente
  calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";
    card.innerHTML = `
      <img src="${race.cardImage}" alt="${race.name}">
      <h3>${race.name}</h3>
      <p><strong>Próxima Sessão:</strong> ${new Date(race.sessions.race).toLocaleString()}</p>
      <a href="${race.id}.html" class="race-btn">Ver Detalhes</a>
    `;
    raceCards.appendChild(card);
  });

  // Back to top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
