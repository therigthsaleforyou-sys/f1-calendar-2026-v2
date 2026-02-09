// js/noticias.js – Versão completa GP’s 2026 + Novidades
document.addEventListener("DOMContentLoaded", () => {
  const raceCardsContainer = document.getElementById("race-cards");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");
  const backToTop = document.getElementById("back-to-top");

  /* =========================
     Array de GP’s + Novidades
  ========================= */
  const races = [
    {
      id: "novidades",
      title: "Novidades F1 2026",
      image: "assets/news/novidades.jpg",
      details: "Fique por dentro das últimas notícias e vídeos da temporada 2026 da F1!",
      video: "https://www.dailymotion.com/embed/video/x9ykhj0"
    },
    {
      id: "australia",
      title: "Grande Prémio da Austrália",
      image: "assets/heroes/australia_v2.jpg",
      details: "Highlights da corrida da Austrália 2025.",
      video: "https://geo.dailymotion.com/player.html?video=x9gc1rq"
    },
    {
      id: "china",
      title: "Grande Prémio da China",
      image: "assets/heroes/china_v2.jpg",
      details: "Detalhes do GP da China 2026.",
      video: "" // Placeholder, nenhum vídeo disponível
    },
    {
      id: "bahrein",
      title: "Grande Prémio do Bahrein",
      image: "assets/heroes/bahrein_v2.jpg",
      details: "Detalhes do GP do Bahrein 2026.",
      video: ""
    },
    {
      id: "japao",
      title: "Grande Prémio do Japão",
      image: "assets/heroes/japao_v2.jpg",
      details: "Detalhes do GP do Japão 2026.",
      video: ""
    },
    {
      id: "spanha",
      title: "Grande Prémio da Espanha",
      image: "assets/heroes/spanha_v2.jpg",
      details: "Detalhes do GP da Espanha 2026.",
      video: ""
    },
    {
      id: "monaco",
      title: "Grande Prémio de Mónaco",
      image: "assets/heroes/monaco_v2.jpg",
      details: "Detalhes do GP de Mónaco 2026.",
      video: ""
    },
    {
      id: "azerbaijao",
      title: "Grande Prémio do Azerbaijão",
      image: "assets/heroes/azerbaijao_v2.jpg",
      details: "Detalhes do GP do Azerbaijão 2026.",
      video: ""
    },
    {
      id: "canada",
      title: "Grande Prémio do Canadá",
      image: "assets/heroes/canada_v2.jpg",
      details: "Detalhes do GP do Canadá 2026.",
      video: ""
    },
    {
      id: "franca",
      title: "Grande Prémio da França",
      image: "assets/heroes/franca_v2.jpg",
      details: "Detalhes do GP da França 2026.",
      video: ""
    },
    {
      id: "austria",
      title: "Grande Prémio da Áustria",
      image: "assets/heroes/austria_v2.jpg",
      details: "Detalhes do GP da Áustria 2026.",
      video: ""
    },
    {
      id: "inglaterra",
      title: "Grande Prémio da Inglaterra",
      image: "assets/heroes/inglaterra_v2.jpg",
      details: "Detalhes do GP da Inglaterra 2026.",
      video: ""
    },
    {
      id: "hungria",
      title: "Grande Prémio da Hungria",
      image: "assets/heroes/hungria_v2.jpg",
      details: "Detalhes do GP da Hungria 2026.",
      video: ""
    },
    {
      id: "belgica",
      title: "Grande Prémio da Bélgica",
      image: "assets/heroes/belgica_v2.jpg",
      details: "Detalhes do GP da Bélgica 2026.",
      video: ""
    },
    {
      id: "holanda",
      title: "Grande Prémio da Holanda",
      image: "assets/heroes/holanda_v2.jpg",
      details: "Detalhes do GP da Holanda 2026.",
      video: ""
    },
    {
      id: "italia",
      title: "Grande Prémio da Itália",
      image: "assets/heroes/italia_v2.jpg",
      details: "Detalhes do GP da Itália 2026.",
      video: ""
    },
    {
      id: "singapura",
      title: "Grande Prémio de Singapura",
      image: "assets/heroes/singapura_v2.jpg",
      details: "Detalhes do GP de Singapura 2026.",
      video: ""
    },
    {
      id: "qatar",
      title: "Grande Prémio do Qatar",
      image: "assets/heroes/qatar_v2.jpg",
      details: "Detalhes do GP do Qatar 2026.",
      video: ""
    },
    {
      id: "estadosunidos",
      title: "Grande Prémio dos EUA",
      image: "assets/heroes/estadosunidos_v2.jpg",
      details: "Detalhes do GP dos EUA 2026.",
      video: ""
    },
    {
      id: "mexico",
      title: "Grande Prémio do México",
      image: "assets/heroes/mexico_v2.jpg",
      details: "Detalhes do GP do México 2026.",
      video: ""
    },
    {
      id: "brasil",
      title: "Grande Prémio do Brasil",
      image: "assets/heroes/brasil_v2.jpg",
      details: "Detalhes do GP do Brasil 2026.",
      video: ""
    },
    {
      id: "arabiasaudita",
      title: "Grande Prémio da Arábia Saudita",
      image: "assets/heroes/arabiasaudita_v2.jpg",
      details: "Detalhes do GP da Arábia Saudita 2026.",
      video: ""
    },
    {
      id: "abuja",
      title: "Grande Prémio de Abu Dhabi",
      image: "assets/heroes/abuja_v2.jpg",
      details: "Detalhes do GP de Abu Dhabi 2026.",
      video: ""
    }
  ];

  /* =========================
     HERO – Austrália fixo
  ========================= */
  heroImage.src = "assets/heroes/australia_v2.jpg";
  heroTitle.textContent = "Grande Prémio da Austrália";

  /* =========================
     Gerar todos os cards
  ========================= */
  races.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";
    card.dataset.id = race.id;

    card.innerHTML = `
      <img class="race-image" src="${race.image}" alt="${race.title}">
      <div class="race-header">
        <h3>${race.title}</h3>
      </div>
      <div class="race-details hidden">
        <p>${race.details}</p>
        ${race.video ? `<div class="video-wrapper"></div>` : ""}
      </div>
    `;

    raceCardsContainer.appendChild(card);

    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    const videoWrapper = card.querySelector(".video-wrapper");

    // Inicializa altura para animação suave
    if (details.classList.contains("hidden")) details.style.maxHeight = "0";

    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      const isOpen = !details.classList.contains("hidden");

      if (isOpen) {
        // Fechar com animação
        details.style.maxHeight = "0";
        setTimeout(() => {
          details.classList.add("hidden");
          if (videoWrapper) videoWrapper.innerHTML = "";
        }, 400);
      } else {
        // Abrir com animação
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";

        if (videoWrapper && race.video) {
          videoWrapper.innerHTML = `<iframe src="${race.video}" frameborder="0" allowfullscreen style="width:100%;height:300px;border-radius:14px;"></iframe>`;
        }
      }
    });
  });

  /* =========================
     BACK TO TOP
  ========================= */
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
