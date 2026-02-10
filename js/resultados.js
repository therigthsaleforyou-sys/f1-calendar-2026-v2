// js/resultados.js
// Página Resultados – F1 2026

document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const raceResults = document.getElementById("race-results");
  const backToTop = document.getElementById("back-to-top");

  /* =========================
     HERO – corrida ativa ou última terminada
  ========================= */

  const now = new Date();
  let lastFinished = calendar2026[0];

  for (let race of calendar2026) {
    if (new Date(race.sessions.race) <= now) lastFinished = race;
    else break;
  }

  heroImage.src = lastFinished.heroImage || lastFinished.cardImage;
  heroTitle.textContent = lastFinished.name;

  /* =========================
     CARDS DE RESULTADOS
  ========================= */

  raceResults.innerHTML = "";

  calendar2026.forEach(race => {
    const raceDate = new Date(race.sessions.race);
    const isPast = raceDate <= now;

    let cardContent = "";

    if (isPast) {
      // ================= RESULTADOS FICTÍCIOS PARA TESTE =================
      // Apenas Austrália inicialmente
      let results = {};
      if (race.id === "australia") {
        results = {
          weather: "Ensolarado",
          pole: "Max Verstappen",
          top10: [
            "Max Verstappen", "Lewis Hamilton", "Charles Leclerc", "Sergio Perez",
            "George Russell", "Carlos Sainz", "Lando Norris", "Fernando Alonso",
            "Esteban Ocon", "Pierre Gasly"
          ],
          fastestLap: "Lewis Hamilton"
        };
      }

      cardContent = `
        <p><strong>Meteorização:</strong> ${results.weather || "-"}</p>
        <p><strong>Pole Position:</strong> ${results.pole || "-"}</p>
        <ol>
          ${results.top10 ? results.top10.map(name => `<li>${name}</li>`).join("") : ""}
        </ol>
        <p><strong>Melhor volta:</strong> ${results.fastestLap || "-"}</p>
      `;
    } else {
      cardContent = `<p style="font-weight:bold;color:#ff0000;">Aguardar a realização da corrida</p>`;
    }

    const card = document.createElement("div");
    card.className = "race-card";
    card.innerHTML = `
      <img class="race-image" src="${race.cardImage}" alt="${race.name}">
      <div class="race-header">
        <h3>${race.name}</h3>
      </div>
      <div class="race-details">
        ${cardContent}
      </div>
    `;

    raceResults.appendChild(card);

    // Drop-down suave ao clicar na imagem
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    if (img && details) {
      if (!isPast) details.style.maxHeight = "none"; // sempre aberto para futuras
      else details.style.maxHeight = "0";

      img.style.cursor = "pointer";

      img.addEventListener("click", () => {
        const open = details.style.maxHeight !== "0" && details.style.maxHeight !== "";
        if (open) {
          details.style.maxHeight = "0";
          setTimeout(() => details.classList.add("hidden"), 300);
        } else {
          details.classList.remove("hidden");
          details.style.maxHeight = details.scrollHeight + "px";
        }
      });
    }
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
