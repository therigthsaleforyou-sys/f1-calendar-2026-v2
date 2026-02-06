// ===============================
// F1 Notícias 2026 - noticias.js
// ===============================

// Simulação da corrida ativa
// (mais tarde pode vir de races.js ou API)
const corridaAtiva = {
  nome: "Grande Prémio da Austrália",
  imagem: "assets/heroes/australia_v2.jpg",
  link: "https://www.youtube.com/results?search_query=f1+australia+2026"
};

// Referências SEGURAS (não recriam DOM)
const heroLink = document.getElementById("hero");
const heroImage = document.getElementById("hero-image");
const heroTitle = document.getElementById("hero-title");

// Segurança extra
if (heroLink && heroImage && heroTitle) {
  heroImage.src = corridaAtiva.imagem;
  heroImage.alt = corridaAtiva.nome;
  heroTitle.textContent = `Corrida ativa: ${corridaAtiva.nome}`;
  heroLink.href = corridaAtiva.link;
}

// ===============================
// Cards de notícias (placeholder)
// ===============================
const raceCardsContainer = document.getElementById("race-cards");

if (raceCardsContainer) {
  // Limpa apenas os cards (seguro)
  raceCardsContainer.innerHTML = "";

  const card = document.createElement("div");
  card.className = "race-card";

  card.innerHTML = `
    <img src="assets/heroes/australia_v2.jpg" alt="Austrália">
    <h3>Highlights – GP da Austrália</h3>
    <a href="https://www.youtube.com/results?search_query=f1+australia+2026" target="_blank">
      Ver vídeos
    </a>
  `;

  raceCardsContainer.appendChild(card);
}

// ===============================
// Back to Top
// ===============================
const backToTop = document.getElementById("back-to-top");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
