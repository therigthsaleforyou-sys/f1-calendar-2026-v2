// js/noticias.js
document.addEventListener("DOMContentLoaded", () => {

  const raceCardsContainer = document.getElementById("race-cards");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  // =========================
  // GERAR CARDS DAS CORRIDAS
  // =========================

  raceCardsContainer.innerHTML = "";

  // Primeiro card: Novidades
  const novidadesCard = document.createElement("div");
  novidadesCard.className = "race-card";

  novidadesCard.innerHTML = `
    <img class="race-image" src="assets/news/novidades.jpg" alt="Novidades F1">
    <div class="race-header">
      <h3>Novidades F1 2026</h3>
    </div>
    <div class="race-details hidden">
      <p>Fique por dentro das últimas notícias e vídeos da temporada 2026 da F1!</p>
      <div class="video-wrapper">
        <iframe data-src="https://www.youtube.com/embed/SEU_VIDEO_AQUI" 
                width="100%" height="315" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
        </iframe>
      </div>
    </div>
  `;
  raceCardsContainer.appendChild(novidadesCard);

  // Outros cards a partir do calendar2026
  if (window.calendar2026 && Array.isArray(calendar2026)) {
    calendar2026.forEach(race => {
      const isFavorite = favorites.includes(race.id);

      const card = document.createElement("div");
      card.className = "race-card";
      if(isFavorite) card.classList.add("favorite");
      card.dataset.id = race.id;

      card.innerHTML = `
        <img class="race-image" src="${race.cardImage}" alt="${race.name}">
        <div class="race-header">
          <h3>${race.name}</h3>
          <button class="fav-btn ${isFavorite ? "active" : ""}" data-id="${race.id}">🏁</button>
        </div>
        <div class="race-details hidden">
          <p><strong>FP1:</strong> ${race.sessions.fp1}</p>
          <p><strong>FP2:</strong> ${race.sessions.fp2}</p>
          <p><strong>FP3:</strong> ${race.sessions.fp3}</p>
          <p><strong>Qualificação:</strong> ${race.sessions.qualifying}</p>
          <p><strong>Corrida:</strong> ${race.sessions.race}</p>
          <div class="video-wrapper">
            <iframe data-src="https://www.youtube.com/embed/SEU_VIDEO_AQUI" 
                    width="100%" height="315" 
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
          </div>
          <div class="race-link-wrapper">
            <a class="race-link-btn" href="race/${race.id}.html">
              Conheça o GP F1 da ${race.name.replace("Grande Prémio da ", "")}
            </a>
          </div>
        </div>
      `;
      raceCardsContainer.appendChild(card);
    });
  }

  // =========================
  // ABRIR / FECHAR CARDS + VIDEOS
  // =========================
  const allCards = Array.from(document.querySelectorAll(".race-card"));

  allCards.forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    const iframe = details ? details.querySelector("iframe") : null;

    if(img && details){
      details.classList.add("hidden");
      details.style.maxHeight = "0";
      img.style.cursor = "pointer";

      img.addEventListener("click", () => {
        const isOpen = !details.classList.contains("hidden");

        if(isOpen){
          details.style.maxHeight = "0";
          setTimeout(() => {
            details.classList.add("hidden");
            if(iframe) iframe.src = ""; // pausa o vídeo
          }, 400);
        } else {
          details.classList.remove("hidden");
          details.style.maxHeight = details.scrollHeight + "px";
          if(iframe) iframe.src = iframe.dataset.src; // começa o vídeo
        }
      });
    }
  });

  // =========================
  // FAVORITOS
  // =========================
  raceCardsContainer.addEventListener("click", e => {
    if(e.target.classList.contains("fav-btn")){
      const id = e.target.dataset.id;
      const card = e.target.closest(".race-card");

      if(favorites.includes(id)){
        favorites.splice(favorites.indexOf(id),1);
        e.target.classList.remove("active");
        card.classList.remove("favorite");
      } else {
        favorites.push(id);
        e.target.classList.add("active");
        card.classList.add("favorite");
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  });

  // =========================
  // HERO FIXO + COUNTDOWN INVISÍVEL
  // =========================
  heroImage.src = "assets/heroes/australia_v2.jpg"; // primeira corrida sempre Austrália
  heroTitle.textContent = "Grande Prémio da Austrália";
  heroCountdown.style.display = "none";

  // =========================
  // BACK TO TOP
  // =========================
  if(backToTop){
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({top:0, behavior:"smooth"});
    });
  }

});
