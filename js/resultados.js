// Garantir que o DOM está pronto
document.addEventListener("DOMContentLoaded", () => {
  const raceResults = document.getElementById("race-results");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");

  // Função para formatar tempo
  function formatCountdown(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600*24));
    const hours = Math.floor((totalSeconds % (3600*24))/3600);
    const minutes = Math.floor((totalSeconds % 3600)/60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // Criar cards
  calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.classList.add("race-card");

    card.innerHTML = `
      <div class="race-header">
        <h3>${race.name}</h3>
      </div>
      <img src="../${race.cardImage}" alt="${race.name}">
      <div class="countdown" id="countdown-${race.id}"></div>
    `;

    raceResults.appendChild(card);
  });

  // Atualizar countdowns
  function updateCountdowns() {
    const now = new Date().getTime();

    let activeRace = calendar2026[0];

    calendar2026.forEach(race => {
      const raceTime = new Date(race.sessions.race).getTime();
      const countdownEl = document.getElementById(`countdown-${race.id}`);
      const diff = raceTime - now;

      if(diff > 0) {
        countdownEl.textContent = `Corrida em: ${formatCountdown(diff)}`;
      } else {
        countdownEl.textContent = "Corrida terminada";
      }

      // Encontrar a corrida mais próxima ainda não corrida
      if(diff > 0 && raceTime < new Date(activeRace.sessions.race).getTime()) {
        activeRace = race;
      }
    });

    // Atualizar hero
    heroImage.src = `../${activeRace.heroImage}`;
    heroTitle.textContent = activeRace.name;
    const heroDiff = new Date(activeRace.sessions.race).getTime() - now;
    heroCountdown.textContent = heroDiff > 0 ? `Corrida em: ${formatCountdown(heroDiff)}` : "Corrida terminada";
  }

  updateCountdowns();
  setInterval(updateCountdowns, 1000);

  // Back to top
  const backBtn = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if(window.scrollY > 300) backBtn.classList.add("show");
    else backBtn.classList.remove("show");
  });
  backBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
});
