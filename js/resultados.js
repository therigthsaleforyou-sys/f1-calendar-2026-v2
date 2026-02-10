const container = document.getElementById("cards-container");
const heroImg = document.getElementById("hero-img");
const heroTitle = document.getElementById("hero-title");
let activeRace = null;

// Função de tempo atual
const now = () => new Date().getTime();

// Formata countdown
function formatCountdown(target) {
  const diff = new Date(target).getTime() - now();
  if (diff <= 0) return "Corrida iniciada";

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  return `${d}d ${h}h ${m}m ${s}s`;
}

// Cria card HTML
function createCard(race) {
  const card = document.createElement("div");
  card.className = "card";
  card.id = race.id;

  card.innerHTML = `
    <div class="favorites" data-id="${race.id}">🏁</div>
    <img src="${race.cardImage}" alt="${race.name}">
    <h3>${race.name}</h3>
    <div class="countdown" id="cd-${race.id}">A calcular...</div>
    <div class="status" id="status-${race.id}">Aguardar a realização da corrida</div>
    <div class="dropbox" id="drop-${race.id}">Dropbox da corrida</div>
  `;

  container.appendChild(card);
}

// Inicializa cards
calendar2026.forEach(createCard);

// Atualiza countdowns
function updateCountdowns() {
  let closestRace = null;
  let minDiff = Infinity;

  calendar2026.forEach(race => {
    const cdElem = document.getElementById(`cd-${race.id}`);
    const statusElem = document.getElementById(`status-${race.id}`);
    const dropElem = document.getElementById(`drop-${race.id}`);

    const raceTime = new Date(race.sessions.race).getTime();
    const diff = raceTime - now();

    cdElem.textContent = formatCountdown(race.sessions.race);

    if (diff <= 0) {
      statusElem.textContent = "Corrida ativa";
      dropElem.style.display = "block";
    } else {
      statusElem.textContent = "Aguardar a realização da corrida";
      dropElem.style.display = "none";
    }

    if (diff > 0 && diff < minDiff) {
      minDiff = diff;
      closestRace = race;
    }
  });

  // Hero
  if (closestRace) {
    activeRace = closestRace;
    heroImg.src = closestRace.heroImage;
    heroTitle.textContent = closestRace.name;
  } else {
    activeRace = calendar2026[0];
    heroImg.src = calendar2026[0].heroImage;
    heroTitle.textContent = calendar2026[0].name;
  }
}

// Inicial update
updateCountdowns();
setInterval(updateCountdowns, 1000);

// Hero scroll clicável
heroImg.onclick = () => {
  const card = document.getElementById(activeRace.id);
  if (card) {
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Botão voltar ao topo
const backBtn = document.getElementById("back-to-top");
backBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// Campeonatos (exemplo, ajustar href real)
const campBtn = document.getElementById("campeonatos");
campBtn.onclick = () => window.location.href = "campeonatos.html";

// Favoritos toggle
document.querySelectorAll(".favorites").forEach(el => {
  el.onclick = () => {
    if (el.textContent === "🏁") el.textContent = "⭐";
    else el.textContent = "🏁";
  };
});
