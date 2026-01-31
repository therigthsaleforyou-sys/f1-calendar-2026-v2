// main.js
// F1 Calendar 2026 — versão estável FINAL

// ---------- GERAR CORRIDAS ----------
function generateRaceCards() {
  const container = document.querySelector('main.container');
  if (!container) return;

  container.innerHTML = '';

  calendar2026.forEach(race => {
    const card = document.createElement('section');
    card.className = 'race-card';
    card.dataset.slug = race.slug;

    card.innerHTML = `
      <img src="${race.image}" alt="${race.name}">
      <h2><a href="#${race.slug}">${race.name}</a></h2>
      <button class="fav-btn" data-slug="${race.slug}">★</button>
    `;

    container.appendChild(card);
  });
}

// ---------- PRÓXIMA CORRIDA ----------
function getNextRace() {
  const now = new Date();
  return calendar2026.find(race => new Date(race.date) > now);
}

// ---------- HERO ----------
function updateHero() {
  const hero = document.querySelector('.hero');
  const heroImg = hero?.querySelector('img');
  const heroLink = hero?.querySelector('.hero-content h1 a');

  if (!hero || !heroImg || !heroLink) return;

  const nextRace = getNextRace();
  if (!nextRace) return;

  heroImg.src = nextRace.image;
  heroImg.alt = nextRace.name;

  heroLink.textContent = `Grande Prémio da ${nextRace.name}`;
  heroLink.href = `#${nextRace.slug}`;

  startCountdown(nextRace.date);
}

// ---------- COUNTDOWN ----------
function startCountdown(raceDateStr) {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  const raceDate = new Date(raceDateStr);

  function update() {
    const now = new Date();
    const diff = raceDate - now;

    if (diff <= 0) {
      countdownEl.textContent = 'Race Week!';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;

    countdownEl.textContent = `${d}d ${h}h ${m}m`;
  }

  update();
  setInterval(update, 60000);
}

// ---------- DROPDOWN ----------
function setupRaceDropdowns() {
  document.querySelectorAll('.race-card').forEach(card => {
    card.addEventListener('click', () => {
      const slug = card.dataset.slug;
      const race = calendar2026.find(r => r.slug === slug);
      if (!race) return;

      let dropdown = card.querySelector('.race-dropdown');

      if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'race-dropdown';

        let html = `<h3>Sessões 2026</h3><ul>`;

        for (const [session, dateStr] of Object.entries(race.sessions)) {
          const d = new Date(dateStr);
          html += `<li>${session}: ${d.toLocaleString('pt-PT')}</li>`;
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
    });
  });
}

// ---------- FAVORITOS ----------
function setupFavorites() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    const slug = btn.dataset.slug;

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
  });
}
 
// ---------- BACK TO TOP ----------
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  generateRaceCards();
  updateHero();
  setupRaceDropdowns();
  setupFavorites();
  setupBackToTop();
});
