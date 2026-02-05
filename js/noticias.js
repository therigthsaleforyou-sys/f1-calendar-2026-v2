// js/noticias.js – Hero dinâmico com imagem inicial fixa e cards consistentes
document.addEventListener("DOMContentLoaded", () => {
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const raceCards = document.getElementById("race-cards");
  const backToTop = document.getElementById("back-to-top");

  // =======================
  // Calendário 2026 – IDs e imagens consistentes
  // =======================
  const calendar2026 = [
    {id:"australia", name:"Grande Prémio da Austrália", date:"2026-03-06", heroImage:"assets/races/australia_v2.jpg", cardImage:"assets/races/australia.jpg"},
    {id:"china", name:"Grande Prémio da China", date:"2026-03-13", heroImage:"assets/races/china.jpg", cardImage:"assets/races/china.jpg"},
    {id:"japan", name:"Grande Prémio do Japão", date:"2026-03-27", heroImage:"assets/races/japan.jpg", cardImage:"assets/races/japan.jpg"},
    {id:"bahrain", name:"Grande Prémio do Bahrain", date:"2026-04-10", heroImage:"assets/races/bahrain.jpg", cardImage:"assets/races/bahrain.jpg"},
    {id:"saudiarabia", name:"Grande Prémio da Arábia Saudita", date:"2026-04-17", heroImage:"assets/races/saudi_arabia.jpg", cardImage:"assets/races/saudi_arabia.jpg"},
    {id:"miami", name:"Grande Prémio de Miami", date:"2026-05-01", heroImage:"assets/races/miami.jpg", cardImage:"assets/races/miami.jpg"},
    {id:"canada", name:"Grande Prémio do Canadá", date:"2026-05-22", heroImage:"assets/races/canada.jpg", cardImage:"assets/races/canada.jpg"},
    {id:"monaco", name:"Grande Prémio de Mónaco", date:"2026-06-05", heroImage:"assets/races/monaco.jpg", cardImage:"assets/races/monaco.jpg"},
    {id:"barcelona", name:"Grande Prémio de Barcelona-Catalunya", date:"2026-06-12", heroImage:"assets/races/spain.jpg", cardImage:"assets/races/spain.jpg"},
    {id:"austria", name:"Grande Prémio da Áustria", date:"2026-06-26", heroImage:"assets/races/austria.jpg", cardImage:"assets/races/austria.jpg"},
    {id:"britain", name:"Grande Prémio da Grã-Bretanha", date:"2026-07-03", heroImage:"assets/races/britain.jpg", cardImage:"assets/races/britain.jpg"},
    {id:"belgium", name:"Grande Prémio da Bélgica", date:"2026-07-17", heroImage:"assets/races/belgium.jpg", cardImage:"assets/races/belgium.jpg"},
    {id:"hungary", name:"Grande Prémio da Hungria", date:"2026-07-24", heroImage:"assets/races/hungary.jpg", cardImage:"assets/races/hungary.jpg"},
    {id:"netherlands", name:"Grande Prémio dos Países Baixos", date:"2026-08-21", heroImage:"assets/races/netherlands.jpg", cardImage:"assets/races/netherlands.jpg"},
    {id:"italy", name:"Grande Prémio da Itália", date:"2026-09-04", heroImage:"assets/races/italy.jpg", cardImage:"assets/races/italy.jpg"},
    {id:"spain", name:"Grande Prémio de Madrid", date:"2026-09-11", heroImage:"assets/races/madrid.jpg", cardImage:"assets/races/madrid.jpg"},
    {id:"azerbaijan", name:"Grande Prémio do Azerbaijão", date:"2026-09-24", heroImage:"assets/races/azerbaijan.jpg", cardImage:"assets/races/azerbaijan.jpg"},
    {id:"singapore", name:"Grande Prémio de Singapura", date:"2026-10-09", heroImage:"assets/races/singapore.jpg", cardImage:"assets/races/singapore.jpg"},
    {id:"usa", name:"Grande Prémio dos EUA", date:"2026-10-23", heroImage:"assets/races/usa.jpg", cardImage:"assets/races/usa.jpg"},
    {id:"mexico", name:"Grande Prémio do México", date:"2026-10-30", heroImage:"assets/races/mexico.jpg", cardImage:"assets/races/mexico.jpg"},
    {id:"brazil", name:"Grande Prémio do Brasil", date:"2026-11-06", heroImage:"assets/races/brazil.jpg", cardImage:"assets/races/brazil.jpg"},
    {id:"lasvegas", name:"Grande Prémio de Las Vegas", date:"2026-11-19", heroImage:"assets/races/lasvegas.jpg", cardImage:"assets/races/lasvegas.jpg"},
    {id:"qatar", name:"Grande Prémio do Qatar", date:"2026-11-27", heroImage:"assets/races/qatar.jpg", cardImage:"assets/races/qatar.jpg"},
    {id:"abudhabi", name:"Grande Prémio de Abu Dhabi", date:"2026-12-04", heroImage:"assets/races/abudhabi.jpg", cardImage:"assets/races/abudhabi.jpg"}
  ];

  // =======================
  // Atualiza Hero Dinâmico com imagem inicial fixa
  // =======================
  function updateHero() {
    const now = new Date();

    // Início da temporada: hero é australia_v2.jpg até começar a China
    let heroRace = calendar2026[0]; // default Austrália
    for (let i = 0; i < calendar2026.length; i++) {
      const raceStart = new Date(calendar2026[i].date + "T00:00:00");
      if (raceStart <= now) {
        heroRace = calendar2026[i];
      } else {
        break;
      }
    }


  // Hero começa com australia_v2.jpg até passar para a China
if (heroRace.id === "australia") {
  heroImage.src = "assets/heroes/australia_v2.jpg"; // caminho correto
} else {
  heroImage.src = heroRace.heroImage;
}

    heroTitle.textContent = `Corrida ativa: ${heroRace.name}`;
    heroImage.parentElement.href = `#${heroRace.id}`;

    // Hero clicável → scroll para a card correspondente
    heroImage.onclick = () => {
      const card = document.getElementById(heroRace.id);
      if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
    };
  }

  // =======================
  // Gera Cards
  // =======================
  function generateCards() {
    const now = new Date();
    raceCards.innerHTML = "";

    calendar2026.forEach(race => {
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
        <img class="race-image" src="${race.cardImage}" alt="${race.name}">
        <div class="race-header">
          <h3>${race.name}</h3>
        </div>
        <div class="race-details hidden">
          <p>${status}</p>
          <div class="race-footer">
            <a href="index.html" class="race-link-btn">Calendário</a>
          </div>
        </div>
      `;
      raceCards.appendChild(card);

      // 📸 Dropbox
      const img = card.querySelector(".race-image");
      const details = card.querySelector(".race-details");
      img.addEventListener("click", () => {
        details.classList.toggle("hidden");
      });
    });
  }

  // =======================
  // Inicialização
  // =======================
  generateCards();
  updateHero();
  setInterval(updateHero, 60000); // Atualiza hero a cada minuto

  // =======================
  // Back to Top
  // =======================
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top:0, behavior:"smooth" });
  });
});
