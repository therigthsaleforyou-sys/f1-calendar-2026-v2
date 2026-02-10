const cardsContainer = document.getElementById('cards-container');
const heroImg = document.getElementById('hero-img');
const heroTitle = document.getElementById('hero-title');

// Função para determinar corrida ativa
function getActiveRace() {
  const now = new Date();
  return window.calendar2026.find(race => new Date(race.sessions.race) > now);
}

// Atualiza hero
function updateHero() {
  const active = getActiveRace();
  if (active) {
    heroImg.src = `../assets/heroes/${active.id}.jpg`;
    heroTitle.textContent = active.name;
    heroImg.onclick = () => window.location.href = `${active.id}.html`;
  }
}

// Cria cards
function createCards() {
  cardsContainer.innerHTML = '';
  const now = new Date();
  window.calendar2026.forEach(race => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = `../assets/races/${race.id}.jpg`;
    card.appendChild(img);

    const title = document.createElement('h3');
    title.textContent = race.name;
    card.appendChild(title);

    const countdown = document.createElement('div');
    countdown.className = 'countdown';
    card.appendChild(countdown);

    const status = document.createElement('div');
    status.className = 'status';
    card.appendChild(status);

    // Botão favorito
    const fav = document.createElement('div');
    fav.className = 'favorite';
    fav.textContent = '🏁';
    fav.style.position = 'absolute';
    fav.style.top = '10px';
    fav.style.right = '10px';
    card.appendChild(fav);

    cardsContainer.appendChild(card);

    // Countdown
    function updateCountdown() {
      const raceTime = new Date(race.sessions.race);
      const diff = raceTime - new Date();
      if (diff <= 0) {
        countdown.style.display = 'none';
        status.textContent = 'Corrida ativa! Mostrando dados...';
        clearInterval(interval);
      } else {
        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor((diff / (1000*60*60)) % 24);
        const m = Math.floor((diff / (1000*60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        countdown.textContent = `${d}d ${h}h ${m}m ${s}s`;
        status.textContent = 'Aguardar a realização da corrida';
      }
    }
    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
  });
}

updateHero();
createCards();

// Botão voltar ao topo
const backBtn = document.getElementById('back-to-top');
backBtn.onclick = () => window.scrollTo({top:0, behavior:'smooth'});

// Botão campeonatos
document.getElementById('campeonatos').onclick = () => {
  window.location.href = 'campeonatos.html';
};
