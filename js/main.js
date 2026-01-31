/* =========================
   UTILIDADES
========================= */
function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/* =========================
   HERO + COUNTDOWN
========================= */
const heroTitleEl = document.getElementById("heroTitle").querySelector("a");
const countdownEl = document.getElementById("countdown");

// determinar próxima corrida
const now = new Date();
const nextRace = calendar2026.find(r => new Date(r.date) > now) || calendar2026[0];

// configurar hero
heroTitleEl.textContent = nextRace.name;
heroTitleEl.href = `#${nextRace.id}`;

function updateCountdown() {
  const diff = new Date(nextRace.date) - new Date();
  if (diff <= 0) {
    countdownEl.textContent = "Race Week!";
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const m = Math.floor(diff / (1000 * 60)) % 60;
  const s = Math.floor(diff / 1000) % 60;
  countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* =========================
   RENDERIZAÇÃO DAS CORRIDAS
========================= */
const container = document.getElementById("racesContainer");

calendar2026.forEach(race => {
  const card = document.createElement("section");
  card.className = "race-card";
  card.id = race.id;

  card.innerHTML = `
    <img src="${race.image}" alt="${race.name}">
    <h2>${race.name}</h2>

    <div class="race-details">
      <h3>Sessões 2026</h3>
      <ul>
        <li>FP1: ${formatDateTime(race.sessions.fp1)}</li>
        <li>FP2: ${formatDateTime(race.sessions.fp2)}</li>
        <li>FP3: ${formatDateTime(race.sessions.fp3)}</li>
        <li>Qualificação: ${formatDateTime(race.sessions.qualifying)}</li>
        <li>Corrida: ${formatDateTime(race.sessions.race)}</li>
      </ul>

      <h3>Resultados 2025</h3>
      <ul>
        <li><strong>Pole:</strong> ${race.results2025.pole} (${race.results2025.poleTime})</li>
        <li><strong>Melhor volta:</strong> ${race.results2025.fastestLap} (${race.results2025.fastestLapTime})</li>
        <li><strong>Pódio:</strong> ${race.results2025.podium.join(", ")}</li>
        <li><strong>Meteorologia:</strong> ${race.results2025.meteo}</li>
      </ul>
    </div>

    <button class="favorite-btn">⭐</button>
  `;

  /* DROPDOWN FUNCIONAL */
  const img = card.querySelector("img");
  const details = card.querySelector(".race-details");

  img.onclick = () => {
    details.style.display = details.style.display === "block" ? "none" : "block";
  };

  /* FAVORITOS (persistência existente) */
  const favBtn = card.querySelector(".favorite-btn");
  favBtn.onclick = () => {
    card.classList.toggle("favorite");
    const favs = JSON.parse(localStorage.getItem("favoriteRaces")) || [];
    if (card.classList.contains("favorite")) {
      favs.push(race.id);
    } else {
      const idx = favs.indexOf(race.id);
      if (idx > -1) favs.splice(idx, 1);
    }
    localStorage.setItem("favoriteRaces", JSON.stringify(favs));
  };
 
  container.appendChild(card);
});

/* =========================
   BACK TO TOP
========================= */
document.getElementById("backToTop").onclick = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });
