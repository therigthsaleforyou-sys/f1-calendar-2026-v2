document.addEventListener("DOMContentLoaded", () => {

  const now = new Date();
  const hero = document.getElementById("hero");
  const heroImage = document.getElementById("hero-image");
  const cards = document.querySelectorAll(".race-card");
  const seasonNewsBox = document.querySelector("#season-news .race-details");

  /* =========================
     CONTEÚDO NOVIDADES 2026
  ========================= */
  const seasonNews = [
    {
      title: "🔧 Regulamentos Técnicos",
      text: "Os carros de 2026 serão mais leves, com menos downforce e foco em eficiência aerodinâmica."
    },
    {
      title: "⚡ Unidades de Potência",
      text: "A componente elétrica passa a ter maior peso, com combustíveis 100% sustentáveis."
    },
    {
      title: "👥 Pilotos e Equipas",
      text: "Novos talentos entram na grelha e algumas equipas iniciam ciclos totalmente novos."
    },
    {
      title: "📈 Evolução da Temporada",
      text: "Este painel será atualizado conforme as corridas forem sendo concluídas."
    }
  ];

  seasonNewsBox.innerHTML = seasonNews.map(item => `
    <p><strong>${item.title}</strong><br>${item.text}</p>
  `).join("");

  /* =========================
     HERO DINÂMICO (NOTÍCIAS)
  ========================= */
  let activeCard = cards[1]; // Austrália por defeito

  cards.forEach(card => {
    const raceDate = card.dataset.race;
    if (!raceDate) return;

    if (new Date(raceDate + "T00:00:00") <= now) {
      activeCard = card;
    }
  });

  heroImage.src = activeCard.dataset.hero;
  hero.style.cursor = "pointer";
  hero.onclick = () => {
    activeCard.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* =========================
     DROPDOWN COM ANIMAÇÃO
  ========================= */
  document.querySelectorAll(".race-card").forEach(card => {
    const trigger = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");

    details.style.maxHeight = "0px";

    trigger.addEventListener("click", () => {
      const isOpen = !details.classList.contains("hidden");

      document.querySelectorAll(".race-details").forEach(d => {
        d.classList.add("hidden");
        d.style.maxHeight = "0px";
      });

      if (!isOpen) {
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
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
