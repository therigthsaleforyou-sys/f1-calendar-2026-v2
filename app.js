// versão 1.4.0
/* =========================
   DADOS BASE
========================= */

const races2026 = [
  {
    slug: "australia",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    image: "assets/australia.jpg",
    sessions: {
      fp1: "2026-03-06T02:00:00Z",
      qualy: "2026-03-07T06:00:00Z",
      race: "2026-03-08T05:00:00Z"
    },
    technical: {
      length: "5.278 km",
      laps: 58,
      distance: "306.124 km",
      corners: 14,
      drs: 4
    },
    data2025: {
      winner: "Carlos Sainz",
      fastestLap: "Charles Leclerc",
      pole: "Max Verstappen"
    },
    data2026: null
  }
];

/* =========================
   UTILITÁRIOS
========================= */

function formatCountdown(targetDate) {
  const now = new Date();
  const diff = new Date(targetDate) - now;

  if (diff <= 0) return "Sessão em curso";

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  return `${d}d ${h}h ${m}m ${s}s`;
}

function getNextSession(race) {
  const now = new Date();
  return Object.entries(race.sessions)
    .map(([name, date]) => ({ name, date: new Date(date) }))
    .find(s => s.date > now);
}

/* =========================
   IMPRESSÃO
========================= */

function printRace(race) {
  const choice = confirm(
    "OK → Imprimir Ficha Técnica + Dados 2025\nCancelar → Imprimir Ficha Técnica + Dados 2026 (se disponíveis)"
  );

  const data = choice ? race.data2025 : race.data2026;

  let extraInfo = "<p><em>Dados ainda não disponíveis.</em></p>";

  if (data) {
    extraInfo = `
      <ul>
        <li><strong>Vencedor:</strong> ${data.winner}</li>
        <li><strong>Pole:</strong> ${data.pole}</li>
        <li><strong>Volta mais rápida:</strong> ${data.fastestLap}</li>
      </ul>
    `;
  }

  document.body.innerHTML = `
    <div id="print-area">
      <h1>${race.name}</h1>
      <h2>Ficha Técnica</h2>
      <ul>
        <li>Extensão: ${race.technical.length}</li>
        <li>Voltas: ${race.technical.laps}</li>
        <li>Distância: ${race.technical.distance}</li>
        <li>Curvas: ${race.technical.corners}</li>
        <li>Zonas DRS: ${race.technical.drs}</li>
      </ul>

      <h2>${choice ? "Dados 2025" : "Dados 2026"}</h2>
      ${extraInfo}
    </div>
  `;

  window.print();
  location.reload();
}

/* =========================
   PÁGINA CORRIDA
========================= */

const params = new URLSearchParams(window.location.search);
const raceSlug = params.get("race");

if (raceSlug) {
  const race = races2026.find(r => r.slug === raceSlug);

  if (race) {
    const next = getNextSession(race);

    document.body.innerHTML = `
      <header>
        <button onclick="history.back()">⬅ Voltar</button>
        <h1>${race.name}</h1>
      </header>

      <main>
        <img src="${race.image}" alt="${race.circuit}">
        
        <div class="card">
          <h3>Próxima Sessão</h3>
          <p>${next.name.toUpperCase()}</p>
          <div class="countdown" id="countdown"></div>
        </div>

        <div class="card">
          <h3>Ficha Técnica</h3>
          <ul>
            <li>Extensão: ${race.technical.length}</li>
            <li>Voltas: ${race.technical.laps}</li>
            <li>Distância: ${race.technical.distance}</li>
            <li>Curvas: ${race.technical.corners}</li>
            <li>Zonas DRS: ${race.technical.drs}</li>
          </ul>
        </div>

        <button onclick='printRace(${JSON.stringify(race)})'>🖨️ Imprimir</button>
      </main>

      <footer>
        F1 2026 – Projeto independente
      </footer>
    `;

    setInterval(() => {
      document.getElementById("countdown").textContent =
        formatCountdown(next.date);
    }, 1000);
  }
}
