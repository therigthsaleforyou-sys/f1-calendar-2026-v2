// main.js
// F1 Calendar 2026 - funcionalidade completa com hero seguro

// --- Encontrar a próxima corrida ---
function getNextRace() {
  const now = new Date();
  return calendar2026.find(race => new Date(race.date) > now);
}

// --- Gerar fichas das corridas ---
function generateRaceCards() {
  const container = document.querySelector('main.container');
  if (!container) return;

  container.innerHTML = ''; // Limpa antes de criar

  calendar2026.forEach(race => {
    const card = document.createElement('section');
    card.classList.add('race-card');
    card.setAttribute('data-slug', race.slug);

    // Imagem clicável (toggle dropdown)
    const img = document.createElement('img');
    img.src = race.image;
    img.alt = race.name;
    img.style.cursor = 'pointer';
    card.appendChild(img);

    // Título da corrida clicável
    const h2 = document.createElement('h2');
    const a = document.createElement('a');
    a.href = `#${race.slug}`;
    a.textContent = race.name;
    h2.appendChild(a);
    card.appendChild(h2);

    // Dropdown será criado dinamicamente ao clicar
    img.addEventListener('click', () => toggleDropdown(card, race));
    a.addEventListener('click', (e) => { e.preventDefault(); toggleDropdown(card, race); });

    // Marca favorito
    const favBtn = document.createElement('button');
    favBtn.textContent = '★';
    favBtn.classList.add('fav-btn');
    if (localStorage.getItem(`fav-${race.slug}`)) {
      favBtn.classList.add('fav-selected');
    }
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(favBtn, race.slug);
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

    // Resultados 2025 se existirem
    if (race.results2025) {
      html += `<h4>Resultados 2025</h4><ul>`;
      for (const [key, val] of Object.entries(race.results2025)) {
        html += `<li>${key}: ${val}</li>`;
      }
      html += `</ul>`;
    }

    html += `</ul>`;
    dropdown.innerHTML = html;
    card.appendChild(dropdown);
  }

  // Toggle visibilidade
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// --- Hero ---
function updateHero() {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const nextRace = getNextRace();
  if (!nextRace) return;

  // Forçar imagem correta do hero
  hero.querySelector('img').src = 'assets/heroes/home-hero.jpg';
  hero.querySelector('img').alt = nextRace.name;

  const a = heroContent.querySelector('h1 a');
  a.textContent = `Grande Prémio da ${nextRace.name}`;
  a.href = `#${nextRace.slug}`;
  a.style.cursor = 'pointer';
  a.addEventListener('click', (e) => { 
    e.preventDefault(); 
    document.querySelector(`[data-slug="${nextRace.slug}"]`).scrollIntoView({behavior:'smooth'}); 
  });

  startCountdown(nextRace.date);
}

// --- Countdown ---
function startCountdown(raceDateStr) {
  const countdownEl = document.getElementById('countdown');
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

// --- Favoritos ---
function toggleFavorite(btn, slug) {
  btn.classList.toggle('fav-selected');
  if (btn.classList.contains('fav-selected')) {
    localStorage.setItem(`fav-${slug}`, 'true');
  } else {
    localStorage.removeItem(`fav-${slug}`);
  }
}

// --- Back to Top ---
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

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
