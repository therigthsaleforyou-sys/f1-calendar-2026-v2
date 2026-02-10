document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");
  const raceResults = document.getElementById("race-results");
  const backToTop = document.getElementById("back-to-top");

  /* =========================
     HERO – corrida ativa (Austrália no início)
  ========================= */
  let activeRace = calendar2026[0];

  function getActiveRace() {
    const now = new Date();
    for (let race of calendar2026) {
      if (new Date(race.sessions.race) > now) return race;
    }
    return calendar2026[calendar2026.length - 1];
  }

  function startCountdown(race) {
    function update() {
      const now = new Date();
      const target = new Date(race.sessions.race);
      const diff = target - now;

      if (diff <= 0) {
        heroCountdown.textContent = "🏁 Corrida terminada — ver resultados";
        activeRace = getActiveRace();
        heroImage.src = activeRace.heroImage || activeRace.cardImage;
        heroTitle.textContent = activeRace.name;
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      heroCountdown.textContent = `🏁 ${d}d ${h}h ${m}m ${s}s 🏁`;
    }

    update();
    setInterval(update, 1000);
  }

  heroImage.src = activeRace.heroImage || activeRace.cardImage;
  heroTitle.textContent = activeRace.name;
  startCountdown(activeRace);

  /* =========================
     CARDS DOS RESULTADOS
  ========================= */
  raceResults.innerHTML = "";

  calendar2026.forEach(race => {
    const raceDate = new Date(race.sessions.race);
    const now = new Date();

    const card = document.createElement("div");
    card.className = "race-card";

    if (now < raceDate) {
      // Corrida ainda não aconteceu
      card.innerHTML = `
        <img class="race-image" src="${race.cardImage}" alt="${race.name}">
        <div class="race-header">
          <h3>${race.name}</h3>
        </div>
        <div class="race-details">
          <p>Aguardar a realização da corrida</p>
        </div>
      `;
    } else {
      // Corrida concluída – mostrar resultados (Austrália apenas por enquanto)
      if (race.id !== "australia_v2") return; // só Austrália inicialmente

      const results = race.results || {}; // assumindo estrutura {pole, top10, fastestLap, weather}

      const top10 = results.top10 || [];
      let top10HTML = "";
      top10.forEach((driver, idx) => {
        top10HTML += `<p>${idx+1}. ${driver}</p>`;
      });

      card.innerHTML = `
        <img class="race-image" src="${race.cardImage}" alt="${race.name}">
        <div class="race-header">
          <h3>${race.name}</h3>
        </div>
        <div class="race-details">
          <p><strong>Meteorologia:</strong> ${results.weather || "—"}</p>
          <p><strong>Pole Position:</strong> ${results.pole || "—"}</p>
          <p><strong>Resultados P1-P10:</strong></p>
          ${top10HTML || "<p>—</p>"}
          <p><strong>Melhor Volta:</strong> ${results.fastestLap || "—"}</p>
        </div>
      `;
    }

    raceResults.appendChild(card);

    // Drop-down suave
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
