
// js/noticias.js
document.addEventListener("DOMContentLoaded", () => {

  const hero = document.getElementById("hero");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const backToTop = document.getElementById("back-to-top");
  const cards = document.querySelectorAll(".race-card");

  const now = new Date();
  let activeRaceIndex = 0; // default Austrália

  /* =========================
     NOTÍCIAS E VÍDEOS
  ========================= */
  const raceNews = [
    {
      id: "australia",
      news: [
        "Primeira corrida do ano emocionante, com várias ultrapassagens.",
        "Hamilton lidera o campeonato após vitória em Melbourne."
      ],
      video: "https://www.youtube.com/embed/VIDEO_ID_AUS" // substituir VIDEO_ID_AUS
    },
    {
      id: "china",
      news: [
        "Grande corrida em Xangai, com chuva e estratégia crucial.",
        "Red Bull vence com Verstappen em destaque."
      ],
      video: "https://www.youtube.com/embed/VIDEO_ID_CHN" // substituir VIDEO_ID_CHN
    }
  ];

  /* =========================
     PREPARAR CARDS
  ========================= */
  cards.forEach((card, index) => {
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");

    // Clicar na imagem do card para mostrar/esconder detalhes
    if (img && details) {
      img.addEventListener("click", () => {
        details.classList.toggle("hidden");
      });
    }

    // Preencher notícias e vídeo
    const newsData = raceNews.find(r => r.id === card.dataset.id);
    if (newsData && details) {
      const newsContainer = document.createElement("div");
      newsContainer.classList.add("race-news");

      newsData.news.forEach(item => {
        const p = document.createElement("p");
        p.textContent = item;
        newsContainer.appendChild(p);
      });

      // Adicionar vídeo
      if (newsData.video) {
        const iframe = document.createElement("iframe");
        iframe.src = newsData.video;
        iframe.width = "100%";
        iframe.height = "200";
        iframe.frameBorder = "0";
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        newsContainer.appendChild(iframe);
      }

      details.appendChild(newsContainer);
    }

    // Determinar corrida ativa com base na data da corrida
    const raceDateStr = card.dataset.race;
    if (raceDateStr) {
      const raceDate = new Date(raceDateStr + "T00:00:00Z");
      if (raceDate <= now) {
        activeRaceIndex = index;
      }
    }
  });

  /* =========================
     HERO DINÂMICO
  ========================= */
  const activeCard = cards[activeRaceIndex];
  if (activeCard) {
    const heroImg = activeCard.dataset.hero;
    const heroTitleText = activeCard.dataset.title;

    if (heroImg) heroImage.src = heroImg;
    if (heroTitleText) heroTitle.textContent = heroTitleText;

    hero.style.cursor = "pointer";
    hero.addEventListener("click", () => {
      activeCard.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* =========================
     BACK TO TOP
  ========================= */
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
