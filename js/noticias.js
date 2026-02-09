document.addEventListener("DOMContentLoaded", () => {

  const raceCardsContainer = document.getElementById("race-cards");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();
  let activeRaceCard = null;

  // GERAR CARDS DAS CORRIDAS
  calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";
    card.dataset.id = race.id;
    card.dataset.hero = race.heroImage;
    card.dataset.title = race.name;
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
        <div class="race-link-wrapper">
          <a class="race-link-btn" href="race/${race.id}.html">
            Conheça o GP F1 da ${race.name.replace("Grande Prémio da ", "")}
          </a>
        </div>
      </div>
    `;
    raceCardsContainer.appendChild(card);

    // DETECTAR CORRIDA ATIVA
    const raceEnd = new Date(race.sessions.race + "T23:59:59");
    if (!activeRaceCard || (raceEnd >= now && new Date(race.sessions.race) <= now)) {
      activeRaceCard = card;
    }

    // DROPDOWN SUAVE
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
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

  // HERO DINÂMICO
  if(activeRaceCard){
    heroImage.src = "assets/heroes/australia_v2.jpg"; // imagem fixa da primeira corrida
    heroTitle.textContent = activeRaceCard.dataset.title;

    // Click no hero scroll para corrida ativa
    heroImage.addEventListener("click", () => {
      activeRaceCard.scrollIntoView({ behavior: "smooth", block: "start" });
      const details = activeRaceCard.querySelector(".race-details");
      if(details){
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
    });

    // COUNTDOWN HERÓI -> quando chegar a 0, trocar hero para a corrida ativa
    const raceDate = new Date(activeRaceCard.dataset.race);
    const countdownEl = document.createElement("div");
    countdownEl.className = "countdown";
    heroTitle.parentNode.insertBefore(countdownEl, heroTitle.nextSibling);

    function updateCountdown(){
      const diff = raceDate - new Date();
      if(diff <= 0){
        heroImage.src = activeRaceCard.dataset.hero;
        countdownEl.textContent = "🏁 Corrida ativa!";
      } else {
        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor((diff/(1000*60*60)) %24);
        const m = Math.floor((diff/(1000*60)) %60);
        const s = Math.floor((diff/1000) %60);
        countdownEl.textContent = `🏁 ${d}d ${h}h ${m}m ${s}s 🏁`;
      }
    }
    updateCountdown();
    setInterval(updateCountdown,1000);
  }

  // BACK TO TOP
  if(backToTop){
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top:0, behavior:"smooth" });
    });
  }

});
