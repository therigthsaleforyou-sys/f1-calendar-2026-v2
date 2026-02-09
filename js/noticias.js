// js/noticias.js
document.addEventListener("DOMContentLoaded", () => {

  const raceCards = document.getElementById("race-cards");
  const backToTop = document.getElementById("back-to-top");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");

  const now = new Date();

  // =========================
  // CARD NOVIDADES
  // =========================
  const novidadesCard = document.createElement("div");
  novidadesCard.className = "race-card";

  novidadesCard.innerHTML = `
    <img class="race-image" src="assets/news/novidades.jpg" alt="Novidades F1">
    <div class="race-header">
      <h3>Novidades F1 2026</h3>
    </div>
    <div class="race-details hidden">
      <p>Fique por dentro das últimas notícias e vídeos da temporada 2026 da F1!</p>
      <div class="video-wrapper hidden">
        <iframe 
          data-src="https://www.dailymotion.com/embed/video/7N8e8hA-rmY"
          width="100%" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>
        </iframe>
      </div>
    </div>
  `;
  raceCards.appendChild(novidadesCard);

  // =========================
  // CARDS DAS CORRIDAS
  // =========================
  calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";
    card.dataset.id = race.id;

    let videoHTML = "";
    if(race.id === "australia") {
      videoHTML = `
        <div class="video-wrapper hidden">
          <iframe 
            data-src="https://www.dailymotion.com/embed/video/x9gc1rq"
            width="100%" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>
          </iframe>
        </div>
      `;
    }

    card.innerHTML = `
      <img class="race-image" src="${race.cardImage}" alt="${race.name}">
      <div class="race-header">
        <h3>${race.name}</h3>
        <button class="fav-btn" data-id="${race.id}">🏁</button>
      </div>
      <div class="race-details hidden">
        <p><strong>FP1:</strong> ${race.sessions.fp1}</p>
        <p><strong>FP2:</strong> ${race.sessions.fp2}</p>
        <p><strong>FP3:</strong> ${race.sessions.fp3}</p>
        <p><strong>Qualificação:</strong> ${race.sessions.qualifying}</p>
        <p><strong>Corrida:</strong> ${race.sessions.race}</p>

        ${videoHTML}

        <div class="race-link-wrapper">
          <a class="race-link-btn" href="race/${race.id}.html">
            Conheça o GP F1 da ${race.name.replace("Grande Prémio da ", "")}
          </a>
        </div>
      </div>
    `;

    raceCards.appendChild(card);
  });

  // =========================
  // ABRIR / FECHAR CARDS + VIDEO
  // =========================
  raceCards.querySelectorAll(".race-card").forEach(card => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    const videoWrapper = card.querySelector(".video-wrapper");
    const iframe = card.querySelector("iframe");

    img.addEventListener("click", () => {
      const open = !details.classList.contains("hidden");

      if(open){
        // fechar card e parar vídeo
        if(iframe) iframe.src = "";
        details.style.maxHeight = "0";
        setTimeout(() => {
          details.classList.add("hidden");
          if(videoWrapper) videoWrapper.classList.add("hidden");
        }, 400);
      } else {
        // abrir card e carregar vídeo
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
        if(videoWrapper){
          videoWrapper.classList.remove("hidden");
          if(iframe && iframe.dataset.src) iframe.src = iframe.dataset.src;
        }
      }
    });
  });

  // =========================
  // HERO – Corrida ativa
  // =========================
  const upcomingRace = calendar2026.find(r => new Date(r.sessions.race) > now) || calendar2026[0];
  if(upcomingRace){
    heroImage.src = upcomingRace.heroImage || upcomingRace.cardImage;
    heroTitle.textContent = upcomingRace.name;
  }

  // =========================
  // FAVORITOS
  // =========================
  raceCards.addEventListener("click", e => {
    if(e.target.classList.contains("fav-btn")){
      const id = e.target.dataset.id;
      const card = e.target.closest(".race-card");
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

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
  // BACK TO TOP
  // =========================
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top:0, behavior:"smooth" });
  });

});
