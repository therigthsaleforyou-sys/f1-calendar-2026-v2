// js/resultados.js
// Página Resultados – cards iguais à index, com lógica própria

document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const container = document.getElementById("race-results");
  const heroTitle = document.getElementById("hero-title");
  const heroImage = document.getElementById("hero-image");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();

  function getActiveRace() {
    for (let race of calendar2026) {
      if (new Date(race.sessions.race) > now) return race;
    }
    return calendar2026[calendar2026.length - 1];
  }

  const activeRace = getActiveRace();
  heroTitle.textContent = activeRace.name;
  heroImage.src = "../" + activeRace.cardImage;

  container.innerHTML = "";

  calendar2026.forEach(race => {
    const raceDate = new Date(race.sessions.race);
    const finished = raceDate < now;

    const card = document.createElement("div");
    card.className = "race-card";

    card.innerHTML = `
      <img src="../${race.cardImage}" alt="${race.name}">
      <div class="race-header">
        <h3>${race.name}</h3>
      </div>

      <div class="race-details">
        ${
          finished
            ? `
              <p><strong>Meteorologia:</strong> —</p>
              <p><strong>Pole Position:</strong> —</p>
              <p><strong>Resultados:</strong></p>
              <ol>
                <li>—</li><li>—</li><li>—</li><li>—</li><li>—</li>
                <li>—</li><li>—</li><li>—</li><li>—</li><li>—</li>
              </ol>
              <p><strong>Melhor volta:</strong> —</p>
            `
            : `<p style="opacity:.7">⏳ Aguardar a realização da corrida</p>`
        }
      </div>
    `;

    container.appendChild(card);
  });

  /* BACK TO TOP */
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
