// main.js
// Funcionalidades do F1 Calendar 2026

// --- Encontrar a próxima corrida ---
function getNextRace() {
  const now = new Date();
  return calendar2026.find(race => new Date(race.date) > now);
}

// --- Atualizar Hero ---
function updateHero() {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const nextRace = getNextRace();

  if (!nextRace) return;

  // Atualizar imagem
  hero.querySelector('img').src = nextRace.image;
  hero.querySelector('img').alt = nextRace.name;

  // Atualizar título clicável
  heroContent.querySelector('h1 a').textContent = `Grande Prémio da ${nextRace.name}`;
  heroContent.querySelector('h1 a').href = `#${nextRace.slug}`; // ancora na homepage

  // Atualizar countdown
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

    countdownEl.textContent = `${d}d ${h}h ${m}m`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
}

// --- Dropdown Corridas ---
function setupDropdowns() {
  document.querySelectorAll('.race-card').forEach(card => {
    card.addEventListener('click', () => {
      const raceSlug = card.querySelector('h2 a').getAttribute('href').replace('#', '');
      const race = calendar2026.find(r => r.slug === raceSlug);
      if (!race) return;

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

        dropdown.innerHTML = html;
        card.appendChild(dropdown);
      }

      // Toggle visibilidade
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
  });
}

// --- Botão Voltar ao Topo ---
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
  updateHero();
  setupDropdowns();
  setupBackToTop();
});
