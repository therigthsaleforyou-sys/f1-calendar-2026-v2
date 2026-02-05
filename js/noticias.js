// js/noticias.js – versão atualizada com IDs consistentes e botão para notícias
document.addEventListener("DOMContentLoaded", () => {
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const raceCards = document.getElementById("race-cards");
  const backToTop = document.getElementById("back-to-top");

  const calendar2026 = [
    {id:"australia", name:"FORMULA 1 QATAR AIRWAYS AUSTRALIAN GRAND PRIX 2026", date:"2026-03-06", heroImage:"assets/races/australia.jpg"},
    {id:"china", name:"FORMULA 1 HEINEKEN CHINESE GRAND PRIX 2026", date:"2026-03-13", heroImage:"assets/races/china.jpg"},
    {id:"japan", name:"FORMULA 1 ARAMCO JAPANESE GRAND PRIX 2026", date:"2026-03-27", heroImage:"assets/races/japan.jpg"},
    {id:"bahrain", name:"FORMULA 1 GULF AIR BAHRAIN GRAND PRIX 2026", date:"2026-04-10", heroImage:"assets/races/bahrain.jpg"},
    {id:"saudiarabia", name:"FORMULA 1 STC SAUDI ARABIAN GRAND PRIX 2026", date:"2026-04-17", heroImage:"assets/races/saudi.jpg"},
    {id:"miami", name:"FORMULA 1 CRYPTO.COM MIAMI GRAND PRIX 2026", date:"2026-05-01", heroImage:"assets/races/miami.jpg"},
    {id:"canada", name:"FORMULA 1 LENOVO GRAND PRIX DU CANADA 2026", date:"2026-05-22", heroImage:"assets/races/canada.jpg"},
    {id:"monaco", name:"FORMULA 1 LOUIS VUITTON GRAND PRIX DE MONACO 2026", date:"2026-06-05", heroImage:"assets/races/monaco.jpg"},
    {id:"barcelona", name:"FORMULA 1 MSC CRUISES GRAN PREMIO DE BARCELONA-CATALUNYA 2026", date:"2026-06-12", heroImage:"assets/races/spain.jpg"},
    {id:"austria", name:"FORMULA 1 LENOVO AUSTRIAN GRAND PRIX 2026", date:"2026-06-26", heroImage:"assets/races/austria.jpg"},
    {id:"britain", name:"FORMULA 1 PIRELLI BRITISH GRAND PRIX 2026", date:"2026-07-03", heroImage:"assets/races/britain.jpg"},
    {id:"belgium", name:"FORMULA 1 BELGIAN GRAND PRIX 2026", date:"2026-07-17", heroImage:"assets/races/belgium.jpg"},
    {id:"hungary", name:"FORMULA 1 AWS HUNGARIAN GRAND PRIX 2026", date:"2026-07-24", heroImage:"assets/races/hungary.jpg"},
    {id:"netherlands", name:"FORMULA 1 HEINEKEN DUTCH GRAND PRIX 2026", date:"2026-08-21", heroImage:"assets/races/netherlands.jpg"},
    {id:"italy", name:"FORMULA 1 PIRELLI GRAN PREMIO D’ITALIA 2026", date:"2026-09-04", heroImage:"assets/races/italy.jpg"},
    {id:"spain", name:"FORMULA 1 TAG HEUER GRAN PREMIO DE ESPAÑA 2026", date:"2026-09-11", heroImage:"assets/races/madrid.jpg"},
    {id:"azerbaijan", name:"FORMULA 1 QATAR AIRWAYS AZERBAIJAN GRAND PRIX 2026", date:"2026-09-24", heroImage:"assets/races/azerbaijan.jpg"},
    {id:"singapore", name:"FORMULA 1 SINGAPORE AIRLINES SINGAPORE GRAND PRIX 2026", date:"2026-10-09", heroImage:"assets/races/singapore.jpg"},
    {id:"usa", name:"FORMULA 1 MSC CRUISES UNITED STATES GRAND PRIX 2026", date:"2026-10-23", heroImage:"assets/races/usa.jpg"},
    {id:"mexico", name:"FORMULA 1 GRAN PREMIO DE LA CIUDAD DE MÉXICO 2026", date:"2026-10-30", heroImage:"assets/races/mexico.jpg"},
    {id:"brazil", name:"FORMULA 1 MSC CRUISES GRANDE PRÊMIO DE SÃO PAULO 2026", date:"2026-11-06", heroImage:"assets/races/brazil.jpg"},
    {id:"lasvegas", name:"FORMULA 1 HEINEKEN LAS VEGAS GRAND PRIX 2026", date:"2026-11-19", heroImage:"assets/races/lasvegas.jpg"},
    {id:"qatar", name:"FORMULA 1 QATAR AIRWAYS QATAR GRAND PRIX 2026", date:"2026-11-27", heroImage:"assets/races/qatar.jpg"},
    {id:"abudhabi", name:"FORMULA 1 ETIHAD AIRWAYS ABU DHABI GRAND PRIX 2026", date:"2026-12-04", heroImage:"assets/races/abudhabi.jpg"}
  ];

  // =======================
  // Atualiza Hero Dinâmico
  // =======================
  function updateHero() {
    const now = new Date();
    const currentRace = calendar2026.find(r => new Date(r.date) >= now) || calendar2026[0];

    heroImage.src = currentRace.heroImage;
    heroTitle.textContent = `Corrida em andamento: ${currentRace.name}`;
    heroImage.parentElement.href = `#${currentRace.id}`;
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
        <img class="race-image" src="${race.heroImage}" alt="${race.name}">
        <div class="race-header">
          <h3>${race.name}</h3>
        </div>
        <div class="race-details hidden">
          <p>${status}</p>
          <div class="race-footer">
            <a href="index.html" class="race-link-btn">Calendário</a>
            <a href="f1noticias.html#${race.id}" class="race-link-btn">Notícias</a>
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
  updateHero();
  generateCards();
  setInterval(updateHero, 60000); // atualiza hero a cada minuto

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
