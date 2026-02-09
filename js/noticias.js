document.addEventListener("DOMContentLoaded", () => {

  const raceCards = document.querySelector("#race-cards");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const backToTop = document.getElementById("back-to-top");

  // ADICIONA OS CARDS DO CALENDAR2026
  if (window.calendar2026) {
    calendar2026.forEach(race => {
      const card = document.createElement("div");
      card.className = "race-card";
      card.dataset.id = race.id;
      card.dataset.title = race.name;
      card.dataset.hero = race.heroImage;
      card.dataset.race = race.sessions.race;

      card.innerHTML = `
        <img class="race-image" src="${race.cardImage}" alt="${race.name}">
        <div class="race-header">
          <h3>${race.name}</h3>
        </div>
        <div class="race-details hidden">
          <p><strong>FP1:</strong> ${race.sessions.fp1}</p>
          <p><strong>FP2:</strong> ${race.sessions.fp2}</p>
          <p><strong>FP3:</strong> ${race.sessions.fp3}</p>
          <p><strong>Qualificação:</strong> ${race.sessions.qualifying}</p>
          <p><strong>Corrida:</strong> ${race.sessions.race}</p>
        </div>
      `;

      raceCards.appendChild(card);
    });
  }

  const cards = Array.from(document.querySelectorAll(".race-card"));

  // DROPDOWN DAS FICHAS
  cards.forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    if (!img || !details) return;

    img.style.cursor = "pointer";
    if(details.classList.contains("hidden")) details.style.maxHeight = "0";

    img.addEventListener("click", () => {
      const open = !details.classList.contains("hidden");
      if(open){
        details.style.maxHeight = "0";
        setTimeout(()=>details.classList.add("hidden"),400);
      } else {
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
    });
  });

  // HERO AUTOMÁTICO
  let activeRace = cards[0];
  const now = new Date();

  cards.forEach(card => {
    const raceDate = new Date(card.dataset.race);
    if(now >= raceDate) activeRace = card;
  });

  heroImage.src = activeRace.dataset.hero;
  heroTitle.textContent = activeRace.dataset.title;

  // HERO CLICK
  heroImage.addEventListener("click", () => {
    const details = activeRace.querySelector(".race-details");
    activeRace.scrollIntoView({behavior:"smooth", block:"start"});
    if(details){
      details.classList.remove("hidden");
      details.style.maxHeight = details.scrollHeight + "px";
    }
  });

  // BACK TO TOP
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top:0, behavior:"smooth" });
  });

});
