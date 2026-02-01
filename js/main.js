// --- Hero & Próxima corrida ---
function getNextRace() {
  const now = new Date();
  return calendar2026.find(race => new Date(race.sessions.race) > now) || calendar2026[0];
}

// --- Gerar fichas ---
function generateRaceCards() {
  const container = document.querySelector('main.container');
  if (!container) return;
  container.innerHTML = '';

  calendar2026.forEach(race => {
    const card = document.createElement('section');
    card.classList.add('race-card');
    card.dataset.slug = race.slug;

    const img = document.createElement('img');
    img.src = race.image;
    img.alt = race.name;
    img.style.cursor = 'pointer';
    card.appendChild(img);

    const h2 = document.createElement('h2');
    const a = document.createElement('a');
    a.textContent = race.name;
    h2.appendChild(a);
    card.appendChild(h2);

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
      if (favBtn.classList.contains('fav-selected')) {
        localStorage.setItem(`fav-${race.slug}`, 'true');
      } else {
        localStorage.removeItem(`fav-${race.slug}`);
      }
    });
    card.appendChild(favBtn);

    const dropdown = document.createElement('div');
    dropdown.classList.add('race-dropdown');

    let html = `<h3>Sessões 2026</h3><ul>`;
    for (const [session, dateStr] of Object.entries(race.sessions)) {
      const d = new Date(dateStr);
      const day = String(d.getUTCDate()).padStart(2, '0');
      const month = String(d.getUTCMonth() + 1).padStart(2, '0');
      const hours = String(d.getUTCHours()).padStart(2, '0');
      const minutes = String(d.getUTCMinutes()).padStart(2, '0');
      html += `<li>${session}: ${day}/${month}/${d.getUTCFullYear()} ${hours}:${minutes}</li>`;
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

    img.addEventListener('click', () => {
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    h2.addEventListener('click', () => {
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    container.appendChild(card);
  });
}

// --- Hero ---
function updateHero() {
  const heroTitle = document.getElementById('nextRaceTitle');
  const nextRace = getNextRace();
  heroTitle.textContent = `Grande Prémio da ${nextRace.name}`;
  startCountdown(nextRace.sessions.race);
}

// --- Countdown ---
function startCountdown(dateStr) {
  const countdownEl = document.getElementById('countdown');
  const raceDate = new Date(dateStr);

  function update() {
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

  update();
  setInterval(update, 1000);
}

// --- Voltar ao topo ---
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
  generateRaceCards();
  updateHero();
  setupBackToTop();
});
