document.addEventListener("DOMContentLoaded", () => {

  /* ================= CARD NOVO / CORRIDAS ================= */
  const raceCardsContainer = document.getElementById("race-cards");
  const allRaces = window.calendar2026 || [];
  
  // Adiciona os cards das corridas
  allRaces.forEach(race => {
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

    raceCardsContainer.appendChild(card);
  });

  /* ================= DROPDOWNS ================= */
  document.querySelectorAll(".race-card").forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    if (!img || !details) return;

    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      const isOpen = !details.classList.contains("hidden");
      if(isOpen){
        details.style.maxHeight = "0";
        setTimeout(() => details.classList.add("hidden"), 300);
      } else {
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
    });

    if(details.classList.contains("hidden")) details.style.maxHeight = "0";
  });

  /* ================= HERO AUTOMÁTICO ================= */
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const heroRaces = [
    ...document.querySelectorAll(".race-card")
  ];

  const now = new Date();
  let activeRace = heroRaces[0];

  heroRaces.forEach(r => {
    const raceDate = r.dataset.race ? new Date(r.dataset.race) : null;
    if(raceDate && now >= raceDate) activeRace = r;
  });

  heroImage.src = activeRace.dataset.hero;
  heroTitle.textContent = activeRace.dataset.title;

  /* ================= HERO CLICK ================= */
  heroImage.addEventListener("click", () => {
    const card = document.querySelector(`.race-card[data-id="${activeRace.dataset.id}"]`);
    if(card){
      card.scrollIntoView({behavior:"smooth", block:"start"});
      const details = card.querySelector(".race-details");
      if(details){
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
    }
  });

  /* ================= BACK TO TOP ================= */
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top:0, behavior:"smooth" });
  });

});
