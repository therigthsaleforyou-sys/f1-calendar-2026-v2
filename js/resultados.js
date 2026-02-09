// js/resultados.js
// Página Resultados – versão mínima, estável e segura

document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const raceCards = document.getElementById("race-cards");
  const backToTop = document.getElementById("back-to-top");

  if (!raceCards) {
    console.error("Elemento #race-cards não encontrado");
    return;
  }

  raceCards.innerHTML = "";

  const now = new Date();

  calendar2026.forEach(race => {
    const raceDate = new Date(race.sessions.race);
    const isFinished = raceDate < now;

    const card = document.createElement("div");
    card.className = "race-card";

    card.innerHTML = `
      <img class="race-image" src="${race.cardImage}" alt="${race.name}">

      <div class="race-header">
        <h3>${race.name}</h3>
      </div>

      <div class="race-details hidden">
        <p><strong>Data da corrida:</strong> ${raceDate.toLocaleString("pt-PT")}</p>
        <p>
          <strong>Estado:</strong>
          ${isFinished ? "🏁 Resultado disponível" : "⏳ Ainda não disputada"}
        </p>

        ${
          isFinished
            ? `<p>Resultados detalhados serão adicionados em breve.</p>`
            : `<p>Volte após a corrida para ver os resultados.</p>`
        }
      </div>
    `;

    raceCards.appendChild(card);

    // Abrir / fechar detalhes ao clicar na imagem
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");

    img.addEventListener("click", () => {
      details.classList.toggle("hidden");
    });
  });

  /* =========================
     BACK TO TOP
  ========================= */

  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
