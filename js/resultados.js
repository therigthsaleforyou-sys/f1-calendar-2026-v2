const container = document.getElementById("race-results");
const heroImg = document.getElementById("hero-image");
const heroTitle = document.getElementById("hero-title");

const now = () => new Date().getTime();

function getActiveRace() {
  return [...calendar2026]
    .sort((a,b) => new Date(a.sessions.race) - new Date(b.sessions.race))
    .find(r => new Date(r.sessions.race).getTime() <= now());
}

function formatCountdown(target) {
  const diff = new Date(target).getTime() - now();
  if (diff <= 0) return "Corrida iniciada";

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);

  return `${d}d ${h}h ${m}m`;
}

function isFavorite(id) {
  return JSON.parse(localStorage.getItem("favResults") || "[]").includes(id);
}

function toggleFavorite(id, btn) {
  let favs = JSON.parse(localStorage.getItem("favResults") || "[]");
  favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
  localStorage.setItem("favResults", JSON.stringify(favs));
  btn.classList.toggle("active", favs.includes(id));
}

function render() {
  const activeRace = getActiveRace();

  if (activeRace) {
    heroImg.src = "../" + activeRace.heroImage;
    heroTitle.textContent = activeRace.name;
    heroImg.onclick = () =>
      window.location.href = `${activeRace.id}.html`;
  }

  calendar2026.forEach(race => {
    if (document.getElementById(race.id)) return;

    const card = document.createElement("div");
    card.className = "race-card";
    card.id = race.id;

    const active = activeRace && race.id === activeRace.id;

    card.innerHTML = `
      <img src="../${race.cardImage}" alt="${race.name}">
      <div class="race-header">
        <h3>${race.name}</h3>
        <button class="fav-btn ${isFavorite(race.id) ? "active" : ""}">🏁</button>
      </div>

      <div class="result-countdown" data-id="${race.id}"></div>

      <div class="race-details ${active ? "" : "hidden"}">
        <p><strong>Meteorologia:</strong> —</p>
        <p><strong>Pole Position:</strong> —</p>
        <p><strong>Top 10:</strong> —</p>
        <p><strong>Melhor Volta:</strong> —</p>
      </div>

      ${active ? "" : `<p class="waiting">Aguardar a realização da corrida</p>`}
    `;

    card.querySelector(".fav-btn")
      .addEventListener("click", e => toggleFavorite(race.id, e.target));

    container.appendChild(card);
  });
}

function updateCountdowns() {
  document.querySelectorAll(".result-countdown").forEach(el => {
    const race = calendar2026.find(r => r.id === el.dataset.id);
    el.textContent = formatCountdown(race.sessions.race);
  });
}

render();
updateCountdowns();
setInterval(updateCountdowns, 60000);
