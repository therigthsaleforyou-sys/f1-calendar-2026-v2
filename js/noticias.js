document.addEventListener("DOMContentLoaded", () => {
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const raceCards = document.getElementById("race-cards");
  const backToTop = document.getElementById("back-to-top");

  const calendar2026 = [
    {id:"australia", name:"Grande Prémio da Austrália", date:"2026-03-22", heroImage:"assets/races/australia_v2.jpg"},
    {id:"bahrain", name:"Grande Prémio do Bahrain", date:"2026-03-29", heroImage:"assets/races/bahrain.jpg"},
    {id:"china", name:"Grande Prémio da China", date:"2026-04-05", heroImage:"assets/races/china.jpg"},
    {id:"spain", name:"Grande Prémio da Espanha", date:"2026-05-03", heroImage:"assets/races/spain.jpg"},
    {id:"monaco", name:"Grande Prémio de Mónaco", date:"2026-05-31", heroImage:"assets/races/monaco.jpg"},
    {id:"canada", name:"Grande Prémio do Canadá", date:"2026-06-07", heroImage:"assets/races/canada.jpg"},
    {id:"austria", name:"Grande Prémio da Áustria", date:"2026-06-21", heroImage:"assets/races/austria.jpg"},
    {id:"britain", name:"Grande Prémio da Grã-Bretanha", date:"2026-07-12", heroImage:"assets/races/britain.jpg"},
    {id:"hungary", name:"Grande Prémio da Hungria", date:"2026-07-26", heroImage:"assets/races/hungary.jpg"},
    {id:"belgium", name:"Grande Prémio da Bélgica", date:"2026-08-30", heroImage:"assets/races/belgium.jpg"},
    {id:"netherlands", name:"Grande Prémio dos Países Baixos", date:"2026-09-06", heroImage:"assets/races/netherlands.jpg"},
    {id:"italy", name:"Grande Prémio da Itália", date:"2026-09-13", heroImage:"assets/races/italy.jpg"},
    {id:"singapore", name:"Grande Prémio de Singapura", date:"2026-09-27", heroImage:"assets/races/singapore.jpg"},
    {id:"japan", name:"Grande Prémio do Japão", date:"2026-10-04", heroImage:"assets/races/japan.jpg"},
    {id:"usa", name:"Grande Prémio dos EUA", date:"2026-10-18", heroImage:"assets/races/usa.jpg"},
    {id:"mexico", name:"Grande Prémio do México", date:"2026-10-25", heroImage:"assets/races/mexico.jpg"},
    {id:"brazil", name:"Grande Prémio do Brasil", date:"2026-11-01", heroImage:"assets/races/brazil.jpg"},
    {id:"uae", name:"Grande Prémio de Abu Dhabi", date:"2026-11-29", heroImage:"assets/races/uae.jpg"}
  ];

  function getLastCompletedRace() {
    const now = new Date();
    let lastRace = null;
    for (const race of calendar2026) {
      if (new Date(race.date) <= now) lastRace = race;
      else break;
    }
    return lastRace;
  }

  function getNextRace() {
    const now = new Date();
    return calendar2026.find(r => new Date(r.date) > now) || calendar2026[0];
  }

  // Hero automático
  const lastRace = getLastCompletedRace();
  const nextRace = getNextRace();

  if (lastRace) {
    heroImage.src = lastRace.heroImage;
    heroTitle.textContent = `Última corrida concluída: ${lastRace.name}`;
    heroImage.parentElement.href = `#${lastRace.id}`;
  } else {
    heroImage.src = "assets/heroes/australia_v2.jpg";
    heroTitle.textContent = `Próxima corrida: ${nextRace.name}`;
    heroImage.parentElement.href = `#${nextRace.id}`;
  }

  // Gerar os cards das notícias
  raceCards.innerHTML = "";
  calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";
    card.id = race.id;

    const now = new Date();
    const raceDate = new Date(race.date);
    const status = raceDate <= now
      ? `Corrida concluída`
      : `Corrida ainda não se realizou, verificar data na Homepage`;

    card.innerHTML = `
      <img class="race-image" src="${race.heroImage}" alt="${race.name}">
      <div class="race-header">
        <h3>${race.name}</h3>
      </div>
      <div class="race-details">
        <p>${status}</p>
        <div class="race-footer">
          <a href="index.html" class="btn-header">Voltar à Homepage</a>
        </div>
      </div>
    `;

    raceCards.appendChild(card);
  });

  // Back to top
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top:0, behavior:"smooth" });
  });
});
