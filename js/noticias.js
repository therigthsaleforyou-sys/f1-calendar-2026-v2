document.addEventListener("DOMContentLoaded", () => {

  const now = new Date();
  const heroImage = document.getElementById("hero-image");
  const cards = document.querySelectorAll(".race-card");
  const seasonNews = document.querySelector("#season-news .race-details");

  /* =========================
     CONTEÚDO DINÂMICO F1 2026
  ========================= */
  const seasonContent = [
    {
      title: "🔧 Novos Regulamentos Técnicos",
      text: "A temporada 2026 introduz carros mais leves, menor downforce e maior dependência da eficiência elétrica."
    },
    {
      title: "⚡ Unidades de Potência",
      text: "Motores com maior componente elétrica, combustíveis 100% sustentáveis e remoção do MGU-H."
    },
    {
      title: "👥 Novos Pilotos e Alinhamentos",
      text: "A grelha de 2026 apresenta novos talentos vindos da F2 e grandes mudanças em equipas de topo."
    },
    {
      title: "🏁 Evolução do Mundial",
      text: "À medida que as corridas se realizam, este painel será atualizado com tendências e destaques."
    }
  ];

  seasonNews.innerHTML = seasonContent.map(item => `
    <p><strong>${item.title}</strong><br>${item.text}</p>
  `).join("");

  /* =========================
     HERO DINÂMICO
  ========================= */
  let activeCard = cards[1]; // Austrália por defeito

  cards.forEach(card => {
    const raceDate = card.dataset.race;
    if (!raceDate) return;

    if (new Date(raceDate + "T00:00:00") <= now) {
      activeCard = card;
    }
  });

  if (activeCard) {
    heroImage.src = activeCard.dataset.hero;
    document.getElementById("hero").onclick = () => {
      activeCard.scrollIntoView({ behavior: "smooth", block: "start" });
    };
  }

  /* =========================
     DROPDOWN + ANIMAÇÃO
  ========================= */
  document.querySelectorAll(".race-image, .race-header").forEach(el => {
    el.addEventListener("click", () => {
      const details = el.closest(".race-card").querySelector(".race-details");
      details.classList.toggle("hidden");
      details.style.maxHeight = details.classList.contains("hidden")
        ? "0px"
        : details.scrollHeight + "px";
    });
  });

  /* =========================
     BACK TO TOP
  ========================= */
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });
  backToTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

});
