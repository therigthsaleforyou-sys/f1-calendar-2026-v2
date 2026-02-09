// js/noticias.js
document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const raceCards = document.getElementById("race-cards");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");

  // URLs dos vídeos (Dailymotion embed)
  const videos = {
    novidades: "https://www.dailymotion.com/embed/video/x9ykhj0",
    australia: "https://www.dailymotion.com/embed/video/x9gc1rq",
    placeholder: "https://www.dailymotion.com/embed/video/x1e9phv" // vídeo genérico F1
  };

  // Cards: primeiro Novidades, depois GP's
  const cardsData = [
    {
      id: "novidades",
      name: "Novidades F1 2026",
      img: "assets/news/novidades.jpg",
      details: "Fique por dentro das últimas notícias e vídeos da temporada 2026 da F1!",
      video: videos.novidades
    },
    ...calendar2026.map(race => ({
      id: race.id,
      name: race.name,
      img: race.cardImage,
      details: `FP1: ${race.sessions.fp1}\nFP2: ${race.sessions.fp2}\nFP3: ${race.sessions.fp3}\nQualificação: ${race.sessions.qualifying}\nCorrida: ${race.sessions.race}`,
      video: race.id === "australia" ? videos.australia : videos.placeholder
    }))
  ];

  // Gerar cards dinamicamente
  cardsData.forEach(cardData => {
    const card = document.createElement("div");
    card.className = "race-card";

    card.innerHTML = `
      <img class="race-image" src="${cardData.img}" alt="${cardData.name}">
      <div class="race-header">
        <h3>${cardData.name}</h3>
      </div>
      <div class="race-details hidden">
        <p>${cardData.details.replace(/\n/g, "<br>")}</p>
        <div class="video-wrapper">
          <iframe data-src="${cardData.video}" frameborder="0" allowfullscreen style="width:100%; height:200px;"></iframe>
        </div>
      </div>
    `;

    raceCards.appendChild(card);

    // Abrir/Fechar card com efeito suave e iniciar/parar vídeo
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    const iframe = details.querySelector("iframe");

    img.addEventListener("click", () => {
      const open = !details.classList.contains("hidden");
      if (open) {
        // fechar card
        details.style.maxHeight = details.scrollHeight + "px"; 
        setTimeout(() => details.style.maxHeight = "0", 10);
        setTimeout(() => details.classList.add("hidden"), 400);
        iframe.src = ""; // parar vídeo
      } else {
        // abrir card
        details.classList.remove("hidden");
        details.style.maxHeight = "0";
        setTimeout(() => details.style.maxHeight = details.scrollHeight + "px", 10);
        iframe.src = iframe.dataset.src; // carregar vídeo
      }
    });
  });

  // Hero fixo Austrália até countdown
  heroImage.src = "assets/heroes/australia_v2.jpg";
  heroTitle.textContent = "Grande Prémio da Austrália";
});
