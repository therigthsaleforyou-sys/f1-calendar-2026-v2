// js/calendar2026-v2.js
// Homepage – Cards do calendário + botão Notícias

document.addEventListener("DOMContentLoaded", () => {
  const raceCards = document.getElementById("race-cards");

  const calendar2026 = [
    { id:"australia", name:"Grande Prémio da Austrália", date:"06 - 08 Mar", image:"assets/races/australia.jpg" },
    { id:"china", name:"Grande Prémio da China", date:"13 - 15 Mar", image:"assets/races/china.jpg" },
    { id:"japan", name:"Grande Prémio do Japão", date:"27 - 29 Mar", image:"assets/races/japan.jpg" },
    { id:"bahrain", name:"Grande Prémio do Bahrain", date:"10 - 12 Apr", image:"assets/races/bahrain.jpg" },
    { id:"saudiarabia", name:"Grande Prémio da Arábia Saudita", date:"17 - 19 Apr", image:"assets/races/saudi_arabia.jpg" },
    { id:"miami", name:"Grande Prémio de Miami", date:"01 - 03 May", image:"assets/races/miami.jpg" },
    { id:"canada", name:"Grande Prémio do Canadá", date:"22 - 24 May", image:"assets/races/canada.jpg" },
    { id:"monaco", name:"Grande Prémio do Mónaco", date:"05 - 07 Jun", image:"assets/races/monaco.jpg" },
    { id:"barcelona", name:"Grande Prémio de Barcelona-Catalunha", date:"12 - 14 Jun", image:"assets/races/spain.jpg" },
    { id:"austria", name:"Grande Prémio da Áustria", date:"26 - 28 Jun", image:"assets/races/austria.jpg" },
    { id:"britain", name:"Grande Prémio da Grã-Bretanha", date:"03 - 05 Jul", image:"assets/races/britain.jpg" },
    { id:"belgium", name:"Grande Prémio da Bélgica", date:"17 - 19 Jul", image:"assets/races/belgium.jpg" },
    { id:"hungary", name:"Grande Prémio da Hungria", date:"24 - 26 Jul", image:"assets/races/hungary.jpg" },
    { id:"netherlands", name:"Grande Prémio dos Países Baixos", date:"21 - 23 Aug", image:"assets/races/netherlands.jpg" },
    { id:"italy", name:"Grande Prémio de Itália", date:"04 - 06 Sep", image:"assets/races/italy.jpg" },
    { id:"spain", name:"Grande Prémio de Madrid", date:"11 - 13 Sep", image:"assets/races/madrid.jpg" },
    { id:"azerbaijan", name:"Grande Prémio do Azerbaijão", date:"24 - 26 Sep", image:"assets/races/azerbaijan.jpg" },
    { id:"singapore", name:"Grande Prémio de Singapura", date:"09 - 11 Oct", image:"assets/races/singapore.jpg" },
    { id:"usa", name:"Grande Prémio dos Estados Unidos", date:"23 - 25 Oct", image:"assets/races/usa.jpg" },
    { id:"mexico", name:"Grande Prémio do México", date:"30 Oct - 01 Nov", image:"assets/races/mexico.jpg" },
    { id:"brazil", name:"Grande Prémio de São Paulo", date:"06 - 08 Nov", image:"assets/races/brazil.jpg" },
    { id:"lasvegas", name:"Grande Prémio de Las Vegas", date:"19 - 21 Nov", image:"assets/races/lasvegas.jpg" },
    { id:"qatar", name:"Grande Prémio do Qatar", date:"27 - 29 Nov", image:"assets/races/qatar.jpg" },
    { id:"abudhabi", name:"Grande Prémio de Abu Dhabi", date:"04 - 06 Dec", image:"assets/races/abudhabi.jpg" }
  ];

  raceCards.innerHTML = "";

  calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";
    card.id = race.id;

    card.innerHTML = `
      <img src="${race.image}" alt="${race.name}">
      <h3>${race.name}</h3>
      <p>${race.date}</p>

      <div class="race-card-buttons">
        <a href="f1noticias.html#${race.id}" class="btn-news">
          Notícias
        </a>
      </div>
    `;

    raceCards.appendChild(card);
  });
});
