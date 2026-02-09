// js/noticias.js
document.addEventListener("DOMContentLoaded", () => {

  const cardsContainer = document.getElementById("race-cards");
  const cards = Array.from(document.querySelectorAll(".race-card"));
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();
  let activeCard = cards[0]; // Novidades
  let activeIndex = 0;

  // =========================
  // DETETAR CORRIDA ATIVA
  // =========================
  cards.forEach((card, index) => {
    const raceDate = card.dataset.race;
    if (!raceDate) return;

    const raceEnd = new Date(raceDate + "T23:59:59");

    if (raceEnd >= now) {
      activeCard = card;
      activeIndex = index;
    }
  });

  // =========================
  // ADICIONAR VIDEOS
  // =========================
  // Card Novidades
  const novidadesCard = cardsContainer.querySelector(".race-card:first-child");
  if(novidadesCard){
    const iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.height = "315";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.dataset.src = "https://www.youtube.com/embed/7N8e8hA-rmY";
    novidadesCard.querySelector(".race-details").prepend(iframe);
  }

  // Outros cards (do calendar2026)
  if(window.calendar2026 && Array.isArray(window.calendar2026)){
    calendar2026.forEach(race => {
      const card = document.createElement("div");
      card.className = "race-card";
      card.dataset.id = race.id;
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

      // Adicionar vídeo só para Austrália
      if(race.id === "australia"){
        const iframe = document.createElement("iframe");
        iframe.width = "100%";
        iframe.height = "315";
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.dataset.src = "https://www.youtube.com/embed/md9-jG4RzXs";
        card.querySelector(".race-details").prepend(iframe);
      }

      cardsContainer.appendChild(card);
      cards.push(card);
    });
  }

  // =========================
  // HERO
  // =========================
  if(activeCard && heroImage && heroTitle){
    heroImage.src = activeCard.dataset.hero || "assets/heroes/australia_v2.jpg";
    heroTitle.textContent = activeCard.dataset.title || activeCard.querySelector("h3").textContent;
  }

  // =========================
  // CARDS – DROPBOX
  // =========================
  cards.forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    const iframe = details.querySelector("iframe");

    if(!img || !details) return;

    details.classList.add("hidden");
    details.style.maxHeight = "0";
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      const isOpen = !details.classList.contains("hidden");

      if(isOpen){
        // Fechar com animação suave
        details.style.maxHeight = "0";
        setTimeout(()=>{
          details.classList.add("hidden");
          // Pausar vídeo
          if(iframe) iframe.src = iframe.dataset.src;
        },400);
      } else {
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
        // Ativar autoplay do vídeo
        if(iframe) iframe.src = iframe.dataset.src + "?autoplay=1";
      }
    });
  });

  // =========================
  // BACK TO TOP
  // =========================
  if(backToTop){
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top:0, behavior:"smooth" });
    });
  }

});
