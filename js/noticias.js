document.addEventListener("DOMContentLoaded", () => {

  const raceCardsContainer = document.getElementById("race-cards");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();
  let activeRace = calendar2026[0]; // default Austrália

  // Cria os cards dinamicamente
  calendar2026.forEach(race => {

    // Card principal
    const card = document.createElement("div");
    card.classList.add("race-card");
    card.dataset.id = race.id;

    // Imagem
    const img = document.createElement("img");
    img.classList.add("race-image");
    img.src = race.cardImage;
    img.alt = race.name;
    card.appendChild(img);

    // Header
    const header = document.createElement("div");
    header.classList.add("race-header");
    header.innerHTML = `<h3>${race.name}</h3>`;
    card.appendChild(header);

    // Detalhes dropbox
    const details = document.createElement("div");
    details.classList.add("race-details", "hidden");
    details.innerHTML = `
      <p>Data da corrida: ${race.sessions.race.slice(0,10)}</p>
      <p>Notícias da corrida:</p>
      <ul class="race-news"></ul>
    `;
    card.appendChild(details);

    // Adiciona notícias (só para as 2-3 primeiras corridas de teste)
    if (race.id === "australia") {
      race.news = [
        { title: "Vitória de Verstappen em Melbourne", link: "#" },
        { title: "Ferrari surpreende no treino", link: "#" }
      ];
    } else if (race.id === "china") {
      race.news = [
        { title: "Primeiros pontos de Leclerc", link: "#" },
        { title: "Mercedes luta com pneus", link: "#" }
      ];
    } else if (race.id === "japan") {
      race.news = [
        { title: "GP do Japão: treino livre emocionante", link: "#" }
      ];
    }

    // Renderiza notícias
    if (race.news) {
      const ul = details.querySelector(".race-news");
      race.news.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.link;
        a.textContent = item.title;
        li.appendChild(a);
        ul.appendChild(li);
      });
    }

    // Adiciona vídeo de teste (somente para as mesmas corridas)
    if (race.id === "australia") {
      const videoDiv = document.createElement("div");
      videoDiv.classList.add("race-video");
      videoDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/VIDEO_ID1" title="YouTube video" frameborder="0" allowfullscreen></iframe>`;
      details.appendChild(videoDiv);
    } else if (race.id === "china") {
      const videoDiv = document.createElement("div");
      videoDiv.classList.add("race-video");
      videoDiv.innerHTML = `<iframe src="https://www.youtube.com/embed/VIDEO_ID2" title="YouTube video" frameborder="0" allowfullscreen></iframe>`;
      details.appendChild(videoDiv);
    }

    // DropBox toggle
    img.addEventListener("click", () => {
      details.classList.toggle("hidden");
    });

    raceCardsContainer.appendChild(card);

    // Define a corrida ativa baseada no race.end (aqui simplificado: usa race)
    const raceEnd = new Date(race.sessions.race);
    if (raceEnd <= now) activeRace = race;
  });

  // Atualiza hero
  heroImage.src = activeRace.heroImage;
  heroTitle.textContent = activeRace.name;

  heroImage.style.cursor = "pointer";
  heroTitle.style.cursor = "pointer";
  heroImage.addEventListener("click", () => {
    const card = document.querySelector(`.race-card[data-id="${activeRace.id}"]`);
    if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  heroTitle.addEventListener("click", () => {
    const card = document.querySelector(`.race-card[data-id="${activeRace.id}"]`);
    if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Back to top
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

});
