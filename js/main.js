document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     DROPDOWNS EXISTENTES
     =============================== */
  document.querySelectorAll(".race-header").forEach(header => {
    header.addEventListener("click", () => {
      const body = header.nextElementSibling;
      if (!body) return;
      body.style.display = body.style.display === "block" ? "none" : "block";
    });
  });

  /* ===============================
     RESULTADOS 2025
     =============================== */

  if (typeof results2025 === "undefined") return;

  Object.keys(results2025).forEach(raceId => {
    const data = results2025[raceId];

    // Cada ficha de corrida deve ter data-race="australia", etc
    const raceCard = document.querySelector(`[data-race="${raceId}"]`);
    if (!raceCard) return;

    let html = `
      <div class="race-2025">
        <h4>Resultados 2025</h4>
        <p><strong>Meteorologia:</strong> ${data.weather}</p>
        <p><strong>Pole Position:</strong> ${data.pole.driver} (${data.pole.time})</p>
        <p><strong>Volta mais rápida:</strong> ${data.fastestLap.driver} (${data.fastestLap.time})</p>

        <div class="podium">
          <strong>Pódio:</strong>
          <ol>
            ${data.podium.map(p =>
              `<li>${p.driver} <span>(${p.team})</span></li>`
            ).join("")}
          </ol>
        </div>
      </div>
    `;

    const body = raceCard.querySelector(".race-body");
    if (body) {
      body.insertAdjacentHTML("beforeend", html);
    }
  });

});
