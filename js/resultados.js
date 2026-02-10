// resultados.js
// Certifica-te que calendar2026.js já foi carregado antes

const container = document.getElementById('race-results');

if (!container) {
  console.error('Container #race-results não encontrado!');
}

// Função para criar o countdown
function createCountdown(raceDate) {
  const countdownEl = document.createElement('div');
  countdownEl.className = 'countdown';

  function updateCountdown() {
    const now = new Date();
    const diff = new Date(raceDate) - now;

    if (diff <= 0) {
      countdownEl.textContent = '🚩 Corrida ativa ou concluída';
      clearInterval(interval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `🏁 Em: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);

  return countdownEl;
}

// Criar todos os cards
calendar2026.forEach(race => {
  const card = document.createElement('div');
  card.className = 'race-card';

  // Imagem da corrida
  const img = document.createElement('img');
  img.src = `../${race.cardImage}`;
  img.alt = race.name;
  card.appendChild(img);

  // Cabeçalho da corrida
  const header = document.createElement('div');
  header.className = 'race-header';

  const title = document.createElement('h3');
  title.textContent = race.name;
  header.appendChild(title);

  // Botão favorito (pode ativar/desativar)
  const favBtn = document.createElement('button');
  favBtn.className = 'fav-btn';
  favBtn.innerHTML = '★';
  favBtn.addEventListener('click', () => {
    favBtn.classList.toggle('active');
    card.classList.toggle('favorite');
  });
  header.appendChild(favBtn);

  card.appendChild(header);

  // Countdown até a corrida
  const countdown = createCountdown(race.sessions.race);
  card.appendChild(countdown);

  // Dropbox detalhes (sessões)
  const details = document.createElement('div');
  details.className = 'race-details hidden';

  const sessions = race.sessions;
  details.innerHTML = `
    <strong>FP1:</strong> ${new Date(sessions.fp1).toLocaleString()}<br>
    <strong>FP2:</strong> ${new Date(sessions.fp2).toLocaleString()}<br>
    <strong>FP3:</strong> ${new Date(sessions.fp3).toLocaleString()}<br>
    <strong>Qualifying:</strong> ${new Date(sessions.qualifying).toLocaleString()}<br>
    <strong>Corrida:</strong> ${new Date(sessions.race).toLocaleString()}
  `;
  card.appendChild(details);

  // Toggle do dropbox ao clicar na imagem ou título
  img.addEventListener('click', () => {
    details.classList.toggle('hidden');
    if (!details.classList.contains('hidden')) {
      details.style.maxHeight = details.scrollHeight + 'px';
    } else {
      details.style.maxHeight = '0';
    }
  });

  container.appendChild(card);
});
