// Preview de todas as fichas de corridas e equipas
// Mobile-first, rápido para ver se tudo carrega

document.addEventListener("DOMContentLoaded", () => {
  const previewContainer = document.createElement("div");
  previewContainer.style.maxWidth = "420px";
  previewContainer.style.margin = "20px auto";
  previewContainer.style.padding = "10px";
  previewContainer.style.background = "#111";
  previewContainer.style.color = "#fff";
  previewContainer.style.fontFamily = "system-ui, sans-serif";

  document.body.prepend(previewContainer);

  // ===== Fichas das Corridas =====
  if (window.calendar2026 && Array.isArray(window.calendar2026)) {
    const h1 = document.createElement("h2");
    h1.textContent = "Preview Corridas 2026";
    h1.style.textAlign = "center";
    previewContainer.appendChild(h1);

    window.calendar2026.forEach(race => {
      const card = document.createElement("div");
      card.style.border = "2px solid red";
      card.style.borderRadius = "10px";
      card.style.marginBottom = "12px";
      card.style.padding = "8px";
      card.style.textAlign = "center";

      card.innerHTML = `
        <img src="${race.image}" alt="${race.name}" style="width:100%; border-radius:10px;"/>
        <strong>${race.name}</strong>
        <div>Piloto Pole 2025: ${race.results2025?.pole || "—"}</div>
      `;

      previewContainer.appendChild(card);
    });
  }

  // ===== Fichas das Equipas =====
  if (window.teams2026 && Array.isArray(window.teams2026)) {
    const h2 = document.createElement("h2");
    h2.textContent = "Preview Equipas 2026";
    h2.style.textAlign = "center";
    h2.style.marginTop = "20px";
    previewContainer.appendChild(h2);

    window.teams2026.forEach(team => {
      const card = document.createElement("div");
      card.style.border = "2px solid yellow";
      card.style.borderRadius = "10px";
      card.style.marginBottom = "12px";
      card.style.padding = "8px";
      card.style.textAlign = "center";

      card.innerHTML = `
        <img src="${team.logo}" alt="${team.name}" style="width:120px; margin-bottom:10px;"/>
        <strong>${team.name}</strong>
        <div>${team.drivers.join(" / ")}</div>
      `;

      previewContainer.appendChild(card);
    });
  }
});
