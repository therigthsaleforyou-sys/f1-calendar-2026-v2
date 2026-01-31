// main.js
// F1 Calendar 2026 — funcionalidade completa, hero + countdown + fichas + favoritos

function getNextRace() {
  const now = new Date();
  return calendar2026.find(race => new Date(race.date) > now);
}

function generateRaceCards() {
  const container = document.querySelector('main.container');
  if (!container || typeof calendar2026 === 'undefined') return;

  container.innerHTML = '';

  calendar2026.forEach(race => {
    const card = document.createElement('section');
    card.classList.add('race-card');
    card.setAttribute('data-slug', race.slug);

    // Imagem clicável
    const img = document.createElement('img');
    img.src = race.image;
    img.alt = race.name;
    img.style.cursor = 'pointer';
    card.appendChild(img);

    // Título clicável
    const h2 = document.createElement('h2');
    const a = document.createElement('a');
    a.href = `#${race.slug}`;
    a.textContent = race.name;
    h2.appendChild(a);
    card.appendChild(h2);

    // Favorito
    const favBtn = document.createElement('button');
    favBtn.textContent = '★';
    favBtn.classList.add('fav-btn');
    if (localStorage.getItem(`fav-${race.slug}`)) favBtn.classList.add('fav-selected');
    favBtn.addEventListener('click', e => {
      e.stopPropagation();
      favBtn.classList.toggle('fav-selected');
      if (favBtn.classList.contains('fav-selected')) localStorage.setItem(`fav-${race.slug}`, 'true');
      else localStorage.removeItem(`fav-${race.slug}`);
    });
    card.appendChild(favBtn);

    // Toggle dropdown
    function toggleDropdown() {
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
        if (race.results2025) {
          html += `<h4>Resultados 2025</h4><ul>`;
          for (const [key, val] of Object.entries(race.results2025)) html += `<li>${key}: ${val}</li>`;
          html += `</ul>`;
        }
        html += `</ul>`;
        dropdown.innerHTML = html;
        card.appendChild(dropdown);
      }
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }

    img.addEventListener('click', toggleDropdown);
    a.addEventListener('click', e => { e.preventDefault(); toggleDropdown(); });

    container.appendChild(card);
  });
}

function updateHero() {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  if (!hero || !heroContent) return;

  const nextRace = getNextRace();
  if (!nextRace) return;

  hero.querySelector('img').src = nextRace.image;
  hero.querySelector('img').alt = nextRace.name;

  const a = heroContent.querySelector('h1 a');
  a.textContent = `Grande Prémio da ${nextRace.name}`;
  a.href = `#${nextRace.slug}`;
  a.style.cursor = 'pointer';
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(`[data-slug="${nextRace.slug}"]`).scrollIntoView({behavior:'smooth'});
  });

  startCountdown(nextRace.date);
}

function startCountdown(raceDateStr) {
  const countdownEl = document.getElementById('countdown');
  const raceDate = new Date(raceDateStr);
  if (!countdownEl) return;

  function updateCountdown() {
    const now = new Date();
    const diff = raceDate - now;
    if (diff <= 0) { countdownEl.textContent = "Race Week!"; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    countdownEl.textContent = `${d}d ${h}h ${m}m`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
}

function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof calendar2026 === 'undefined') console.error('calendar2026.js não carregou');
  else {
    generateRaceCards();
    updateHero();
    setupBackToTop();
  }
});
