document.addEventListener("DOMContentLoaded", () => {
  const raceCardsContainer = document.getElementById("race-cards");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();

  // =========================
  // Card de novidades
  // =========================
  const novidadesCard = raceCardsContainer.querySelector(".race-card");

  if(novidadesCard){
    const details = novidadesCard.querySelector(".race-details");

    const videoWrapper = document.createElement("div");
    videoWrapper.className = "race-video-wrapper";

    const video = document.createElement("video");
    video.setAttribute("controls", "");
    video.setAttribute("width", "100%");
    video.setAttribute("poster", "assets/news/novidades.jpg");

    const source = document.createElement("source");
    source.setAttribute("src", "assets/news/novidade1.mp4");
    source.setAttribute("type", "video/mp4");

    video.appendChild(source);
    videoWrapper.appendChild(video);

    // Insere o vídeo acima do botão/link (se existir)
    const linkWrapper = details.querySelector(".race-link-wrapper");
    if(linkWrapper){
      details.insertBefore(videoWrapper, linkWrapper);
    } else {
      details.appendChild(videoWrapper);
    }

    // Inicialmente fechado
    details.classList.add("hidden");
    details.style.maxHeight = "0";

    const img = novidadesCard.querySelector(".race-image");
    if(img){
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        const open = !details.classList.contains("hidden");
        if(open){
          details.style.maxHeight = "0";
          setTimeout(()=>details.classList.add("hidden"), 400);
        } else {
          details.classList.remove("hidden");
          details.style.maxHeight = details.scrollHeight + "px";
        }
      });
    }
  }

  // =========================
  // Cards das corridas do calendário
  // =========================
  calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";

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

    // Vídeo (se definido no objeto race)
    if(race.video){
      const details = card.querySelector(".race-details");
      const videoWrapper = document.createElement("div");
      videoWrapper.className = "race-video-wrapper";

      const video = document.createElement("video");
      video.setAttribute("controls", "");
      video.setAttribute("width", "100%");
      video.setAttribute("poster", race.cardImage);

      const source = document.createElement("source");
      source.setAttribute("src", race.video);
      source.setAttribute("type", "video/mp4");

      video.appendChild(source);
      videoWrapper.appendChild(video);

      const linkWrapper = details.querySelector(".race-link-wrapper");
      if(linkWrapper){
        details.insertBefore(videoWrapper, linkWrapper);
      } else {
        details.appendChild(videoWrapper);
      }
    }

    raceCardsContainer.appendChild(card);

    // Abrir/fechar suavemente
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    if(img && details){
      img.style.cursor = "pointer";
      details.classList.add("hidden");
      details.style.maxHeight = "0";

      img.addEventListener("click", () => {
        const open = !details.classList.contains("hidden");
        if(open){
          details.style.maxHeight = "0";
          setTimeout(()=>details.classList.add("hidden"), 400);
        } else {
          details.classList.remove("hidden");
          details.style.maxHeight = details.scrollHeight + "px";
        }
      });
    }
  });

  // =========================
  // HERO – primeira corrida sempre Austrália
  // =========================
  heroImage.src = "assets/heroes/australia_v2.jpg";
  heroTitle.textContent = "Grande Prémio da Austrália";
  heroCountdown.style.display = "none"; // invisível

  // =========================
  // HERO clicável – rola para o card ativo (primeira corrida Austrália)
  // =========================
  heroImage.addEventListener("click", () => {
    const activeCard = raceCardsContainer.querySelector(`.race-card img[alt="Grande Prémio da Austrália"]`)?.closest(".race-card");
    if(activeCard){
      activeCard.scrollIntoView({behavior:"smooth", block:"start"});
      const details = activeCard.querySelector(".race-details");
      if(details){
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
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
