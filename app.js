document.addEventListener("DOMContentLoaded", () => {

  const races = [
    {
      name: "Grande Prémio da Austrália",
      date: "2026-03-08T05:00:00"
    },
    {
      name: "Grande Prémio do Bahrein",
      date: "2026-03-22T16:00:00"
    },
    {
      name: "Grande Prémio da Arábia Saudita",
      date: "2026-03-29T18:00:00"
    }
  ];

  const now = new Date();

  // ordenar corridas
  races.sort((a, b) => new Date(a.date) - new Date(b.date));

  // encontrar próxima corrida
  const nextRace = races.find(race => new Date(race.date) > now);

  const raceTitleEl = document.getElementById("next-race-name");
  const countdownEl = document.getElementById("home-countdown");

  if (!nextRace || !raceTitleEl || !countdownEl) {
    console.error("Erro: elementos ou corrida não encontrados");
    return;
  }

  raceTitleEl.textContent = nextRace.name;

  function updateCountdown() {
    const now = new Date().getTime();
    const raceTime = new Date(nextRace.date).getTime();
    const diff = raceTime - now;

    if (diff <= 0) {
      countdownEl.textContent = "A decorrer ou concluída";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
