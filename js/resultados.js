// resultados.js
const raceResultsContainer = document.getElementById("race-results");

// Função para formatar tempo restante
function getCountdown(raceDate) {
    const now = new Date();
    const race = new Date(raceDate);
    const diff = race - now;

    if (diff <= 0) return "Corrida já aconteceu";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Função para criar cards
function createRaceCard(race) {
    const card = document.createElement("div");
    card.className = "race-card";

    // Imagem e título
    const header = document.createElement("div");
    header.className = "race-header";
    header.innerHTML = `<h3>${race.name}</h3>
                        <button class="fav-btn">★</button>`;
    card.appendChild(header);

    const img = document.createElement("img");
    img.src = `../${race.cardImage}`;
    img.alt = race.name;
    card.appendChild(img);

    // Countdown
    const countdownEl = document.createElement("div");
    countdownEl.className = "countdown";
    countdownEl.textContent = getCountdown(race.sessions.race);
    card.appendChild(countdownEl);

    // Atualizar countdown a cada segundo
    setInterval(() => {
        countdownEl.textContent = getCountdown(race.sessions.race);
    }, 1000);

    // Ficha de corrida expansível
    const details = document.createElement("div");
    details.className = "race-details hidden";
    details.innerHTML = `
        <p>FP1: ${new Date(race.sessions.fp1).toLocaleString()}</p>
        <p>FP2: ${new Date(race.sessions.fp2).toLocaleString()}</p>
        <p>FP3: ${new Date(race.sessions.fp3).toLocaleString()}</p>
        <p>Qualifying: ${new Date(race.sessions.qualifying).toLocaleString()}</p>
        <p>Race: ${new Date(race.sessions.race).toLocaleString()}</p>
    `;
    card.appendChild(details);

    // Toggle detalhes
    header.addEventListener("click", () => {
        details.classList.toggle("hidden");
    });

    return card;
}

// Renderizar todos os races
calendar2026.forEach(race => {
    const card = createRaceCard(race);
    raceResultsContainer.appendChild(card);
});
