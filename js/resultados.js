const heroImg = document.getElementById("hero-image");
const heroTitle = document.getElementById("hero-title");
const container = document.getElementById("race-results");

// ===============================
// UTIL
// ===============================
function timeRemaining(dateUTC) {
  return new Date(dateUTC).getTime() - Date.now();
}

function formatCountdown(ms) {
  if (ms <= 0) return "CORRIDA ATIVA";
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${d}d ${h}h ${m}m ${sec}s`;
}

// ===============================
// CORRIDA ATIVA (REGRA OFICIAL)
// ===============================
function getActiveRace() {
  const sorted = [...calendar2026].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return sorted.find(r => timeRemaining(r.date) <= 0) || sorted[0];
}

// ===============================
// HERO
// ===============================
function renderHero(activeRace) {
  heroImg.src = activeRace.image;
  heroTitle.textContent = activeRace.name;
  heroImg.onclick = () => window.location.href = activeRace.page;
}

// ===============================
// CARDS
// ===============================
function renderCards(activeRace) {
  container.innerHTML = "";

  calendar2026.forEach(race => {
    const remaining = timeRemaining(race.date);
    const isActive = race === activeRace;

    const card = document.createElement("div");
    card.className = "race-card";

    card.innerHTML = `
      <img src="${race.image}">
      <div class="race-header">
        <h3>${race.name}</h3>
        <button class="fav-btn">⭐</button>
      </div>

      <div class="result-countdown">
        ${formatCountdown(remaining)}
      </div>

      <p class="awaiting ${isActive ? "hidden" : ""}">
        Aguardar a realização da corrida
      </p>

      <div class="result-details ${isActive ? "active" : ""}">
        <p><strong>Meteorologia:</strong> —</p>
        <p><strong>Pole position:</strong> —</p>
        <p><strong>Top 10:</strong> —</p>
        <p><strong>Melhor volta:</strong> —</p>
      </div>
    `;

    if (isActive) {
      card.querySelector(".race-header").onclick = () => {
        card.querySelector(".result-details").classList.toggle("active");
      };
    }

    container.appendChild(card);
  });
}

// ===============================
// LOOP
// ===============================
function update() {
  const activeRace = getActiveRace();
  renderHero(activeRace);
  renderCards(activeRace);
}

update();
setInterval(update, 1000);
