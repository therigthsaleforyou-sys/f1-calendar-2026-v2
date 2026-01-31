// js/main.js
// F1 Calendar 2026 — MOBILE FIRST, HERO ESTÁVEL

function getNextRace() {
  if (!window.calendar2026 || calendar2026.length === 0) return null;
  const now = new Date();
  return calendar2026.find(r => new Date(r.date) > now) || calendar2026[0];
}

// --- GERAR FICHAS ---
function generateRaceCards() {
  const container = document.querySelector('main.container');
  if (!container || !window.calendar2026) return;

  container.innerHTML = '';

  calendar2026.forEach(race => {
    const card = document.createElement('section');
    card.className = 'race-card';
    card.dataset.slug = race.slug;

    const img = document.createElement('img');
    img.src = race.image;
    img.alt = race.name;
    card.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = race.name;
    card.appendChild(h2);

    const favBtn = document.createElement('button');
    favBtn.className = 'fav-btn';
    favBtn.textContent = '🏁';

    if (localStorage.getItem(`fav-${race.slug}`)) {
      card.classList.add('fav-active');
    }

    favBtn.onclick = (e) => {
      e.stopPropagation();
      card.classList.toggle('fav-active');
      if (card.classList.contains('fav-active')) {
        localStorage.setItem(`fav-${race.slug}`, '1');
      } else {
        localStorage.removeItem(`fav-${race.slug}`);
      }
    };

    card.appendChild(favBtn);
    container.appendChild(card);
  });
}

// --- HERO MOBILE ---
function updateHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const title = hero.querySelector('.hero-title');
  const countdown = hero.querySelector('#countdown');
  const img = hero.querySelector('img');

  const nextRace = getNextRace();

  img.src = 'assets/heroes/home-hero.jpg';

  if (!nextRace) {
    title.textContent = 'Calendário Fórmula 1 2026';
    countdown.textContent = '—';
    return;
  }

  title.textContent = nextRace.name;
  startCountdown(nextRace.date, countdown);
}

// --- COUNTDOWN (NUNCA FALHA) ---
function startCountdown(dateStr, el) {
  if (!dateStr || !el) return;

  const raceDate = new Date(dateStr);

  function tick() {
    const now = new Date();
    const diff = raceDate - now;

    if (diff <= 0) {
      el.textContent = 'Race Week!';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;

    el.textContent = `${d}d ${h}h ${m}m`;
  }

  tick();
  setInterval(tick, 60000);
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  generateRaceCards();
  updateHero();
});
