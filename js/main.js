// js/main.js

// --- Próxima corrida ---
function getNextRace() {
  const now = new Date();
  return calendar2026.find(race => new Date(race.date) > now);
}

// --- Gerar fichas das corridas ---
function generateRaceCards() {
  const container = document.querySelector('main.container');
  if (!container) return;
  container.innerHTML = '';

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

    // Título
    const h2 = document.createElement('h2');
    const a = document.createElement('a');
    a.href = `#${race.slug}`;
    a.textContent = race.name;
    h2.appendChild(a);
    card.appendChild(h2);

    // Botão favoritos 🔖
    const favBtn = document.createElement('button');
    favBtn.classList.add('fav-btn');
    favBtn.innerHTML = '🔖';
    favBtn.style.cursor = 'pointer';
    favBtn.style.fontSize = '1.5rem';
    if (localStorage.getItem(`fav-${race.slug}`)) {
      favBtn.classList.add('fav-selected');
    }
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(favBtn, race.slug);
    });
    card.appendChild(favBtn);

    // Eventos clique para dropdown
    img.addEventListener('click', () => toggleDropdown(card, race));
    a.addEventListener('click', (e) => { e.preventDefault(); toggleDropdown(card, race); });

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

    // Resultados 2025
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

// --- Hero ---
function updateHero() {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const nextRace = getNextRace();
  if (!nextRace) return;

  hero.querySelector('img').src = 'assets/heroes/home-hero.jpg';
  hero.querySelector('img').alt = nextRace.name;

  const a = heroContent.querySelector('h1 a');
  a.textContent = `Grande Prémio da ${nextRace.name}`;
  a.href = `#${nextRace.slug}`;
  a.style.cursor = 'pointer';
  a.style.color = 'white';
  a.style.textShadow = '2px 2px 4px black';
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
    countdownEl.style.color = 'red';
    countdownEl.style.textShadow = '2px 2px 4px black';
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// --- Favoritos ---
function toggleFavorite(btn, slug) {
  btn.classList.toggle('fav-selected');
  if (btn.classList.contains('fav-selected')) {
    btn.style.border = '2px solid yellow';
    localStorage.setItem(`fav-${slug}`, 'true');
  } else {
    btn.style.border = '';
    localStorage.removeItem(`fav-${slug}`);
  }
}

// --- Back to Top ---
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.textContent = "↑ Voltar ao Topo";
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
