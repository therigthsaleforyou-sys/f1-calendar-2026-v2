// --- Encontrar a próxima corrida ---
function getNextRace() {
  const now = new Date();
  return calendar2026.find(race => new Date(race.sessions.race) > now) || calendar2026[0];
}

// --- Atualizar Hero ---
function updateHero() {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const nextRace = getNextRace();
  if (!heroContent || !nextRace) return;

  hero.querySelector('img').src = nextRace.image;
  hero.querySelector('img').alt = nextRace.name;

  const h1a = heroContent.querySelector('h1 a');
  h1a.textContent = `Grande Prémio da ${nextRace.name}`;
  h1a.href = `#${nextRace.slug}`;
  h1a.style.cursor = 'pointer';
  h1a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(`[data-slug="${nextRace.slug}"]`)?.scrollIntoView({ behavior: 'smooth' });
  });

  startCountdown(nextRace.sessions.race);
}

// --- Countdown ---
function startCountdown(raceDateStr) {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;
  const raceDate = new Date(raceDateStr);

  function update() {
    const now = new Date();
    let diff = raceDate - now;

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

  update();
  setInterval(update, 1000);
}

// --- Gerar fichas ---
function generateRaceCards() {
  const container = document.querySelector('main.container');
  if (!container) return;
  container.innerHTML = '';

  calendar2026.forEach(race => {
    const card = document.createElement('section');
    card.classList.add('race-card');
    card.setAttribute('data-slug', race.slug);

    const img = document.createElement('img');
    img.src = race.image;
    img.alt = race.name;
    img.style.cursor = 'pointer';
    card.appendChild(img);

    const h2 = document.createElement('h2');
    const a = document.createElement('a');
    a.href = `#${race.slug}`;
    a.textContent = race.name;
    h2.appendChild(a);
    card.appendChild(h2);

    img.addEventListener('click', () => toggleDropdown(card, race));
    a.addEventListener('click', e => { e.preventDefault(); toggleDropdown(card, race); });

    const favBtn = document.createElement('button');
    favBtn.classList.add('fav-btn');
    favBtn.innerHTML = '🏁';
    if (localStorage.getItem(`fav-${race.slug}`)) {
      favBtn.classList.add('fav-selected');
      card.classList.add('fav-active');
    }
    favBtn.addEventListener('click', e => {
      e.stopPropagation();
      favBtn.classList.toggle('fav-selected');
      card.classList.toggle('fav-active');
      if (favBtn.classList.contains('fav-selected')) localStorage.setItem(`fav-${race.slug}`, 'true');
      else localStorage.removeItem(`fav-${race.slug}`);
    });
    card.appendChild(favBtn);

    container.appendChild(card);
  });
}

// --- Toggle dropdown ---
function toggleDropdown(card, race) {
  let dropdown = card.querySelector('.race-dropdown');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.classList.add('race-dropdown');

    let html = `<h3>Sessões 2026</h3><ul>`;
    for (const [session, dateStr] of Object.entries(race.sessions)) {
      const date = new Date(dateStr);
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      html += `<li>${session}: ${day}/${month}/${date.getUTCFullYear()} ${hours}:${minutes}</li>`;
    }
    html += `</ul>`;

    if (race.results2025) {
      html += `<h3>Resultados 2025</h3><ul>`;
      for (const [key, val] of Object.entries(race.results2025)) {
        html += `<li>${key}: ${val}</li>`;
      }
      html += `</ul>`;
    }

    dropdown.innerHTML = html;
    card.appendChild(dropdown);
  }

  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// --- Back to top ---
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
  generateRaceCards();
  updateHero();
  setupBackToTop();
});
