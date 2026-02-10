// js/resultados.js
// Página de Resultados – versão inicial com hero + cards de corridas

document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const raceResultsContainer = document.getElementById("race-results");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();

  // Determinar última corrida terminada
  let lastFinishedRace = calendar2026[0];
  for (let race of calendar2026) {
    if (new Date(race.sessions.race) <= now) lastFinishedRace = race;
  }

  // Hero = última corrida terminada
  heroImage.src = lastFinishedRace.heroImage || lastFinishedRace.cardImage;
  heroTitle.textContent = lastFinishedRace.name;

  // Função para criar card de resultados
  function createRaceCard(race) {
    const raceDate = new Date(race.sessions.race);
    const isPast = raceDate <= now;

    const card = document.createElement("div");
    card.className = "race-card";

    // Conteúdo do card
    let innerHTML = `<img class="race-image" src="${race.cardImage}" alt="${race.name}">
                     <div class="race-header">
                       <h3>${race.name}</h3>
                     </div>
                     <div class="race-details hidden">`;

    if (isPast) {
      // Corrida terminada → resultados simulados (Austrália inicialmente)
      if (race.id === "australia") {
        innerHTML += `
          <p><strong>Meteorologia:</strong> Ensolarado, 25°C</p>
          <p><strong>Pole Position:</strong> Max Verstappen (Red Bull)</p>
          <p><strong>Resultados Corrida:</strong></p>
          <ol>
            <li>Max Verstappen (Red Bull)</li>
            <li>Lewis Hamilton (Mercedes)</li>
            <li>Charles Leclerc (Ferrari)</li>
            <li>Sergio Pérez (Red Bull)</li>
            <li>Carlos Sainz (Ferrari)</li>
            <li>Lando Norris (McLaren)</li>
            <li>George Russell (Mercedes)</li>
            <li>Fernando Alonso (Aston Martin)</li>
            <li>Esteban Ocon (Alpine)</li>
            <li>Pierre Gasly (Alpine)</li>
          </ol>
          <p><strong>Melhor Volta:</strong> Max Verstappen – 1:19.452</p>
        `;
      } else {
        innerHTML += `<p>Resultados ainda não inseridos</p>`;
      }
    } else {
      // Corrida futura → mensagem
      innerHTML += `<p>🏁 Aguardar a realização da corrida</p>`;
    }

    innerHTML += `</div>`;
    card.innerHTML = innerHTML;

    raceResultsContainer.appendChild(card);

    // Dropdown suave ao clicar na imagem
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    if (img && details) {
      if (details.classList.contains("hidden")) details.style.maxHeight = "0";
      img.style.cursor = "pointer";

      img.addEventListener("click", () => {
        const open = !details.classList.contains("hidden");
        if (open) {
          details.style.maxHeight = "0";
          setTimeout(() => details.classList.add("hidden"), 300);
        } else {
          details.classList.remove("hidden");
          details.style.maxHeight = details.scrollHeight + "px";
        }
      });
    }
  }

  // Criar todos os cards
  calendar2026.forEach(createRaceCard);

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
