document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     UTILITÁRIOS
  ========================= */
  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  /* =========================
     PRÓXIMA CORRIDA
  ========================= */
  const now = new Date();
  const nextRace = calendar2026.find(r => new Date(r.raceDate) > now) || calendar2026[0];

  /* HERO */
  const heroTitle = document.querySelector(".hero-content h1 a");
  const heroImg = document.querySelector(".hero img");
  const countdownEl = document.getElementById("countdown");

  heroTitle.textContent = nextRace.name;
  heroTitle.href = nextRace.page;
  heroImg.src = nextRace.image;

  /* COUNTDOWN */
  function updateCountdown() {
    const diff = new Date(nextRace.raceDate) - new Date();

    if (diff <= 0) {
      countdownEl.textContent = "Race Week!";
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;

    countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* =========================
     FICHAS DE CORRIDA
  ========================= */
  const container = document.querySelector(".container");
  container.innerHTML = "";

  calendar2026.forEach(race => {
    const card = document.createElement("section");
    card.className = "race-card";

    card.innerHTML = `
      <img src="${race.image}" alt="${race.name}" data-toggle="${race.id}">
      <h2>${race.name}</h2>

      <div class="race-details" id="${race.id}">
        <h3>Sessões 2026</h3>
        <ul>
          <li>FP1: ${formatDate(race.sessions.fp1)}</li>
          <li>FP2: ${formatDate(race.sessions.fp2)}</li>
          <li>FP3: ${formatDate(race.sessions.fp3)}</li>
          <li>Qualificação: ${formatDate(race.sessions.qualifying)}</li>
          <li>Corrida: ${formatDate(race.sessions.race)}</li>
        </ul>

        <h3>Resultados 2025</h3>
        <ul>
          <li>Pole: ${race.results2025.pole}</li>
          <li>Volta mais rápida: ${race.results2025.fastestLap}</li>
          <li>Pódio: ${race.results2025.podium.join(", ")}</li>
          <li>Meteorologia: ${race.results2025.weather}</li>
        </ul>
      </div>
    `;

    container.appendChild(card);
  });

  /* DROPDOWN */
  document.querySelectorAll("[data-toggle]").forEach(el => {
    el.addEventListener("click", () => {
      const target = document.getElementById(el.dataset.toggle);
      target.style.display = target.style.display === "block" ? "none" : "block";
    });
  });

  /* BACK TO TOP */
  const backToTop = document.getElementById("backToTop");
  backToTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
});
