// js/noticias.js – Hero clicável + cards dinâmicos
document.addEventListener("DOMContentLoaded", () => {
  const heroContainer = document.getElementById("hero");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const raceCards = document.getElementById("race-cards");
  const backToTop = document.getElementById("back-to-top");

  const calendar2026 = [
    {id:"australia", name:"Grande Prémio da Austrália", date:"2026-03-06", heroImage:"assets/races/australia.jpg"},
    {id:"china", name:"Grande Prémio da China", date:"2026-03-13", heroImage:"assets/races/china.jpg"},
    {id:"japan", name:"Grande Prémio do Japão", date:"2026-03-27", heroImage:"assets/races/japan.jpg"},
    {id:"bahrain", name:"Grande Prémio do Bahrain", date:"2026-04-10", heroImage:"assets/races/bahrain.jpg"},
    {id:"saudiarabia", name:"Grande Prémio da Arábia Saudita", date:"2026-04-17", heroImage:"assets/races/saudi_arabia.jpg"},
    {id:"miami", name:"Grande Prémio de Miami", date:"2026-05-01", heroImage:"assets/races/miami.jpg"},
    {id:"canada", name:"Grande Prémio do Canadá", date:"2026-05-22", heroImage:"assets/races/canada.jpg"},
    {id:"monaco", name:"Grande Prémio de Mónaco", date:"2026-06-05", heroImage:"assets/races/monaco.jpg"},
    {id:"barcelona", name:"Grande Prémio de Barcelona", date:"2026-06-12", heroImage:"assets/races/spain.jpg"},
    {id:"austria", name:"Grande Prémio da Áustria", date:"2026-06-26", heroImage:"assets/races/austria.jpg"},
    {id:"britain", name:"Grande Prémio da Grã-Bretanha", date:"2026-07-03", heroImage:"assets/races/britain.jpg"},
    {id:"belgium", name:"Grande Prémio da Bélgica", date:"2026-07-17", heroImage:"assets/races/belgium.jpg"},
    {id:"hungary", name:"Grande Prémio da Hungria", date:"2026-07-24", heroImage:"assets/races/hungary.jpg"},
    {id:"netherlands", name:"Grande Prémio dos Países Baixos", date:"2026-08-21", heroImage:"assets/races/netherlands.jpg"},
    {id:"italy", name:"Grande Prémio de Itália", date:"2026-09-04", heroImage:"assets/races/italy.jpg"},
    {id:"spain", name:"Grande Prémio de Madrid", date:"2026-09-11", heroImage:"assets/races/madrid.jpg"},
    {id:"azerbaijan", name:"Grande Prémio do Azerbaijão", date:"2026-09-24", heroImage:"assets/races/azerbaijan.jpg"},
    {id:"singapore", name:"Grande Prémio de Singapura", date:"2026-10-09", heroImage:"assets/races/singapore.jpg"},
    {id:"usa", name:"Grande Prémio dos EUA", date:"2026-10-23", heroImage:"assets/races/usa.jpg"},
    {id:"mexico", name:"Grande Prémio do México", date:"2026-10-30", heroImage:"assets/races/mexico.jpg"},
    {id:"brazil", name:"Grande Prémio do Brasil", date:"2026-11-06", heroImage:"assets/races/brazil.jpg"},
    {id:"lasvegas", name:"Grande Prémio de Las Vegas", date:"2026-11-19", heroImage:"assets/races/lasvegas.jpg"},
    {id:"qatar", name:"Grande Prémio do Qatar", date:"2026-11-27", heroImage:"assets/races/qatar.jpg"},
    {id:"abudhabi", name:"Grande Prémio de Abu Dhabi", date:"2026-12-04", heroImage:"assets/races/abudhabi.jpg"}
  ];

  // =======================
  // Atualiza Hero Dinâmico
  // =======================
  function updateHero() {
    const now = new Date();
    let activeRace = calendar2026[0]; // default Austrália

    for (let i = 0; i < calendar2026.length; i++) {
      const raceDate = new Date(calendar2026[i].date);
      if (now >= raceDate) {
        activeRace = calendar2026[i];
      } else {
        break;
      }
    }

    // Hero imagem
    heroImage.src = activeRace.id === "australia" ? "assets/heroes/australia_v2.jpg" : activeRace.heroImage;
    heroTitle.textContent = `Corrida ativa: ${activeRace.name}`;

    // Hero clicável para o card da corrida ativa
    heroContainer.onclick = () => {
      const card = document.getElementById(activeRace.id);
      if (card) card.scrollIntoView({behavior:"smooth", block:"start"});
    };
  }

  // =======================
  // Gera Cards
  // =======================
  function generateCards() {
    raceCards.innerHTML = "";

    calendar2026.forEach(race => {
      const now = new Date();
      const raceDate = new Date(race.date);
      const status = raceDate <= now
        ? "Corrida concluída"
        : "Corrida ainda não se realizou, verificar data no Calendário";

      const card = document.createElement("div");
      card.className = "race-card";
      card.id = race.id;
      card.dataset.image = race.heroImage;
      card.dataset.end = race.date;

      card.innerHTML = `
        <img class="race-image" src="${race.heroImage}" alt="${race.name}">
        <div class="race-header">
          <h3>${race.name}</h3>
        </div>
        <div class="race-details hidden">
          <p>${status}</p>
          <div class="race-footer">
            <a href="index.html" class="race-link-btn" style="display:block; margin:0 auto;">Calendário</a>
          </div>
        </div>
      `;
      raceCards.appendChild(card);

      // 📸 Dropbox
      const img = card.querySelector(".race-image");
      const details = card.querySelector(".race-details");
      img.addEventListener("click", () => details.classList.toggle("hidden"));
    });
  }

  // =======================
  // Inicialização
  // =======================
  updateHero();
  generateCards();
  setInterval(updateHero, 1000); // Hero atualizado a cada segundo

  // =======================
  // Back to Top
  // =======================
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top:0, behavior:"smooth" });
  });
});
