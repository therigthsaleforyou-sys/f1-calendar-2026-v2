// js/main.js

function getNextRace() {
  const now = new Date();

  // tenta próxima corrida no futuro
  let next = calendar2026.find(r => {
    return r.date && !isNaN(new Date(r.date)) && new Date(r.date) > now;
  });

  // fallback absoluto: primeira corrida
  if (!next) next = calendar2026[0];

  return next;
}

function generateRaceCards() {
  const container = document.querySelector('main.container');
  if (!container) return;

  container.innerHTML = '';

  calendar2026.forEach(race => {
    const card = document.createElement('section');
    card.className = 'race-card';
    card.dataset.slug = race.slug;

    const img = document.createElement('img');
    img.src = race.image;
    img.alt = race.name;

    const h2 = document.createElement('h2');
    const a = document.createElement('a');
    a.textContent = race.name;
    a.href = '#';
    h2.appendChild(a);

    img.onclick = () => toggleDropdown(card, race);
    a.onclick = e => {
      e.preventDefault();
      toggleDropdown(card, race);
    };

    const fav = document.createElement('button');
    fav.className = 'fav-btn';
    fav.textContent = '🏁';
    fav.onclick = e => {
      e.stopPropagation();
      card.classList.toggle('fav-selected');
    };

    card.append(img, h2, fav);
    container.appendChild(card);
  });
}

function toggleDropdown(card, race) {
  let d = card.querySelector('.race-dropdown');
  if (d) {
    d.remove();
    return;
  }

  d = document.createElement('div');
  d.className = 'race-dropdown';

  let html = `<h3>Sessões 2026</h3><ul>`;
  Object.entries(race.sessions || {}).forEach(([k, v]) => {
    html += `<li>${k}: ${v}</li>`;
  });
  html += `</ul>`;

  if (race.results2025) {
    html += `<h3>Resultados 2025</h3><ul>`;
    Object.entries(race.results2025).forEach(([k, v]) => {
      html += `<li>${k}: ${v}</li>`;
    });
    html += `</ul>`;
  }

  d.innerHTML = html;
  card.appendChild(d);
}

function updateHero() {
  const race = getNextRace();
  if (!race) return;

  const hero = document.querySelector('.hero');
  hero.querySelector('img').src = 'assets/heroes/home-hero.jpg';

  const title = hero.querySelector('h1');
  title.textContent = `Grande Prémio da ${race.name}`;

  startCountdown(race.date);
}

function startCountdown(dateStr) {
  const el = document.getElementById('countdown');
  const target = new Date(dateStr);

  if (isNaN(target)) {
    el.textContent = '—';
    return;
  }

  setInterval(() => {
    const diff = target - new Date();
    if (diff <= 0) {
      el.textContent = 'Race Week!';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;

    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  generateRaceCards();
  updateHero();
});
