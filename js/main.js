// js/main.js
// F1 Calendar 2026 - versão final mobile-only compatível com calendar2026.js

// --- Encontrar a próxima corrida ---
function getNextRace() {
  const now = new Date();
  return window.calendar2026.find(race => new Date(race.sessions.race) > now) || window.calendar2026[0];
}

// --- Gerar fichas das corridas ---
function generateRaceCards() {
  const container = document.querySelector('main.container');
  if (!container) return;

  container.innerHTML = ''; // Limpa antes de criar

  window.calendar2026.forEach(race => {
    const card = document.createElement('section');
    card.classList.add('race-card');
    card.setAttribute('data-slug', race.slug);

    // Imagem da corrida
    const img = document.createElement('img');
    img.src = race.image;
    img.alt = race.name;
    img.style.cursor = 'pointer';
    card.appendChild(img);

    // Título da corrida
    const h2 = document.createElement('h2');
    h2.textContent = race.name;
    h2.style.color = '#fff';
    h2.style.textShadow = '1px 1px 2px #000';
    card.appendChild(h2);

    // Botão favorito
    const favBtn = document.createElement('button');
    favBtn.classList.add('fav-btn');
    favBtn.innerHTML = '🏁'; // bandeirada por defeito
    favBtn.style.position = 'absolute';
    favBtn.style.bottom = '5px';
    favBtn.style.right = '5px';
    if (localStorage.getItem(`fav-${race.slug}`)) {
      favBtn.classList.add('fav-selected');
      card.style.border = '3px solid yellow';
    }
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(favBtn, race.slug, card);
    });
    card.appendChild(favBtn);

    // Dropdown de dados
    const dropdown = document.createElement('div');
    dropdown.classList.add('race-dropdown');
    dropdown.style.display = 'none';
    dropdown.style.marginTop = '10px';
    dropdown.style.padding = '5px';

    // Sessões 2026
    let html = '<h3>Sessões 2026</h3><ul>';
    for (const [session, dateStr] of Object.entries(race.sessions)) {
      const date = new Date(dateStr);
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      html += `<li>${session}: ${day}/${month}/${date.getUTCFullYear()} ${hours}:${minutes}</li>`;
    }
    html += '</ul>';

    // Resultados 2025
    if (race.results2025 && Object.keys(race.results2025).length > 0) {
      html += '<h3>Resultados 2025</h3><ul>';
      for (const [key, val] of Object.entries(race.results2025)) {
        html += `<li>${key}: ${val}</li>`;
      }
      html += '</ul>';
    }

    dropdown.innerHTML = html;
    card.appendChild(dropdown);

    // Toggle dropdown ao clicar na imagem ou título
    img.addEventListener('click', () => {
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    h2.addEventListener('click', () => {
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Rebordo vermelho por defeito
    card.style.border = '2px solid transparent';
    card.style.boxShadow = '1px 1px 5px #000';
    card.style.position = 'relative';

    container.appendChild(card);
  });
}

// --- Favoritos ---
function toggleFavorite(btn, slug, card) {
  btn.classList.toggle('fav-selected');
  if (btn.classList.contains('fav-selected')) {
    localStorage.setItem(`fav-${slug}`, 'true');
    card.style.border = '3px solid yellow';
  } else {
    localStorage.removeItem(`fav-${slug}`);
    card.style.border = '2px solid transparent';
  }
}

// --- Hero ---
function updateHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const heroContent = hero.querySelector('.hero-content');
  const nextRace = getNextRace();

  // Imagem hero
  const img = hero.querySelector('img');
  if (img) {
    img.src = 'assets/heroes/home-hero.jpg';
    img.alt = nextRace.name;
  }

  // Título hero
  const h1 = heroContent.querySelector('h1');
  h1.innerHTML = `Grande Prémio da ${nextRace.name}`;
  h1.style.color = '#fff';
  h1.style.textShadow = '2px 2px 4px #000';

  startCountdown(nextRace.sessions.race);
}

// --- Countdown ---
function startCountdown(raceDateStr) {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  const raceDate = new Date(raceDateStr);

  function updateCountdown() {
    const now = new Date();
    const diff = raceDate - now;

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

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// --- Botão voltar ao topo ---
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  btn.style.position = 'fixed';
  btn.style.bottom = '10px';
  btn.style.right = '10px';
  btn.style.padding = '8px 12px';
  btn.style.zIndex = '1000';
  btn.style.background = '#222';
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.borderRadius = '5px';
  btn.style.cursor = 'pointer';

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
  generateRaceCards();
  updateHero();
  setupBackToTop();
});
