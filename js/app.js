document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("races-container");
  if (!container || typeof races === "undefined") return;

  races.forEach(race => {
    const card = document.createElement("a");
    card.href = `race.html?slug=${race.slug}`;
    card.className = "race-card";

    card.innerHTML = `
      <div class="race-card-bg" style="background-image:url('${race.hero}')"></div>
      <div class="race-card-overlay">
        <h2>${race.name}</h2>
        <p>${race.country}</p>
        <span>Ver corrida →</span>
      </div>
    `;

    container.appendChild(card);
  });
});
