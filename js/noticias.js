<script>
document.addEventListener("DOMContentLoaded", () => {
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const raceCards = document.getElementById("race-cards");

  // Calendar 2026 (simplificado exemplo)
  const calendar2026 = [
    {id:"australia", name:"Grande Prémio da Austrália", date:"2026-03-22", heroImage:"assets/races/australia_v2.jpg"},
    {id:"bahrain", name:"Grande Prémio do Bahrain", date:"2026-03-29", heroImage:"assets/races/bahrain.jpg"},
    {id:"china", name:"Grande Prémio da China", date:"2026-04-05", heroImage:"assets/races/china.jpg"},
    // ... adicionar restantes corridas ...
  ];

  function getLastCompletedRace() {
    const now = new Date();
    let lastRace = null;
    for (const race of calendar2026) {
      const raceDate = new Date(race.date);
      if (raceDate <= now) lastRace = race;
      else break;
    }
    return lastRace;
  }

  function getNextRace() {
    const now = new Date();
    return calendar2026.find(r => new Date(r.date) > now) || calendar2026[0];
  }

  // Determinar qual hero mostrar
  const lastRace = getLastCompletedRace();
  const nextRace = getNextRace();

  if (lastRace) {
    // Hero mostra última corrida concluída
    heroImage.src = lastRace.heroImage;
    heroTitle.textContent = `Última corrida concluída: ${lastRace.name}`;
    heroImage.parentElement.href = `#${lastRace.id}`; // Clica e vai para o card
  } else {
    // Nenhuma corrida concluída ainda → hero inicial
    heroImage.src = "assets/heroes/australia_v2.jpg";
    heroTitle.textContent = `Próxima corrida: ${nextRace.name}`;
    heroImage.parentElement.href = `#${nextRace.id}`;
  }
});
</script>
