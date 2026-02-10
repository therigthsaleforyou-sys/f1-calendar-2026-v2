const container = document.getElementById("race-results");
const heroImg = document.getElementById("hero-image");
const heroTitle = document.getElementById("hero-title");
const backToTop = document.getElementById("back-to-top");

const now = () => new Date().getTime();

// -------- HERO DINÂMICO --------
function getActiveRace() {
  // Retorna a primeira corrida que ainda não começou
  return calendar2026
    .sort((a, b) => new Date(a.sessions.race) - new Date(b.sessions.race))
    .find(r => new Date(r.sessions.race).getTime() > now()) || calendar2026[calendar2026.length-1];
}

function updateHero() {
  const activeRace = getActiveRace();

  heroImg.src = "../" + activeRace.heroImage;
  heroTitle.textContent = activeRace.name;

  heroImg.onclick = () => {
    const card = document.getElementById(activeRace.id);
    if(card){
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
}

// -------- COUNTDOWN --------
function formatCountdown(target) {
  const diff = new Date(target).getTime() - now();
  if (diff <= 0) return "Corrida iniciada";

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  return `${d}d ${h}h ${m}m ${s}s`;
}

// -------- FAVORITOS --------
function isFavorite(id) {
  return JSON.parse(localStorage.getItem("favResults") || "[]").includes(id);
}

function toggleFavorite(id, btn) {
  let favs = JSON.parse(localStorage.getItem("favResults") || "[]");
  const card = document.getElementById(id);

  if(favs.includes(id)){
    favs = favs.filter(f => f !== id);
    card.classList.remove("favorite");
  } else {
    favs.push(id);
    card.classList.add("favorite");
  }

  localStorage.setItem("favResults", JSON.stringify(favs));
  btn.classList.toggle("active", favs.includes(id));
}

// -------- RENDER CARDS --------
function render() {
  const activeRace = getActiveRace();

  calendar2026.forEach(race => {
    if (document.getElementById(race.id)) return;

    const card = document.createElement("div");
    card.className = "race-card";
    card.id = race.id;

    if(isFavorite(race.id)){
      card.classList.add("favorite");
    }

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

  updateHero();
}

// -------- UPDATE COUNTDOWNS --------
function updateCountdowns() {
  document.querySelectorAll(".result-countdown").forEach(el => {
    const race = calendar2026.find(r => r.id === el.dataset.id);
    el.textContent = formatCountdown(race.sessions.race);
  });

  updateHero();
}

// -------- BOTÃO VOLTAR AO TOPO --------
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 300);
});

backToTop.onclick = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

// -------- INICIALIZAÇÃO --------
render();
updateCountdowns();
setInterval(updateCountdowns, 1000); // atualiza cada segundo para countdowns precisos
