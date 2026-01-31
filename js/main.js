// main.js — F1 Calendar 2026 (STABLE FIX)

// ---------- PRÓXIMA CORRIDA ----------
function getNextRace() {
  const now = new Date();
  return calendar2026.find(race => new Date(race.date) > now);
}

// ---------- HERO ----------
function updateHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const img = hero.querySelector('img');
  const link = hero.querySelector('.hero-content h1 a');

  const nextRace = getNextRace();
  if (!nextRace) return;

  img.src = nextRace.image;
  img.alt = nextRace.name;

  link.textContent = `Grande Prémio da ${nextRace.name}`;
  link.href = `#${nextRace.slug}`;

  startCountdown(nextRace.date);
}

// ---------- COUNTDOWN ----------
function startCountdown(dateStr) {
  const el = document.getElementById('countdown');
  if (!el) return;

  const raceDate = new Date(dateStr);

  function tick() {
    const diff = raceDate - new Date();

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

// ---------- GERAR CORRIDAS ----------
function generateRaceCards() {
  const container = document.getElementById('races');
  if (!container) return;

  container.innerHTML = '';

  calendar2026.forEach(race => {
    const card = document.createElement('section');
    card.className = 'race-card';
    card.dataset.slug = race.slug;

    card.innerHTML = `
      <img src="${race.image}" alt="${race.name}">
      <h2><a href="#${race.slug}">${race.name}</a></h2>
      <button class="fav-btn">★</button>
    `;

    container.appendChild(card);

    card.addEventListener('click', () => toggleDropdown(card, race));
    setupFavorite(card, race.slug);
  });
}

// ---------- DROPDOWN ----------
function toggleDropdown(card, race) {
  let dropdown = card.querySelector('.race-dropdown');

  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.className = 'race-dropdown';

    let html = `<h3>Sessões 2026</h3><ul>`;

    for (const [name, date] of Object.entries(race.sessions)) {
      html += `<li>${name}: ${new Date(date).toLocaleString('pt-PT')}</li>`;
    }

    html += `</ul>`;

    if (race.results2025) {
      html += `<h4>Resultados 2025</h4><ul>`;
      for (const [k, v] of Object.entries(race.results2025)) {
        html += `<li>${k}: ${v}</li>`;
      }
      html += `</ul>`;
    }

    dropdown.innerHTML = html;
    card.appendChild(dropdown);
  }

  dropdown.style.display =
    dropdown.style.display === 'block' ? 'none' : 'block';
}

// ---------- FAVORITOS ----------
function setupFavorite(card, slug) {
  const btn = card.querySelector('.fav-btn');

  if (localStorage.getItem(`fav-${slug}`)) {
    btn.classList.add('fav-selected');
  }

  btn.addEventListener('click', e => {
    e.stopPropagation();
    btn.classList.toggle('fav-selected');

    if (btn.classList.contains('fav-selected')) {
      localStorage.setItem(`fav-${slug}`, '1');
    } else {
      localStorage.removeItem(`fav-${slug}`);
    }
  });
}

// ---------- BACK TO TOP ----------
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  btn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  updateHero();
  generateRaceCards();
  setupBackToTop();
});
