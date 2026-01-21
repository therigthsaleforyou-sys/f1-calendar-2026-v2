/************************************************
 * F1 2026 – app.js (versão estável de recuperação)
 * Esta versão NÃO pode ficar presa em "A carregar"
 ************************************************/

console.log("✅ app.js carregado");

// ---------- DADOS BASE ----------
const races2026 = [
  {
    slug: "australia",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    date: "2026-03-08T05:00:00Z",
    sessions: [
      { name: "FP1", date: "2026-03-06T01:30:00Z" },
      { name: "FP2", date: "2026-03-06T05:00:00Z" },
      { name: "FP3", date: "2026-03-07T01:30:00Z" },
      { name: "Qualificação", date: "2026-03-07T05:00:00Z" },
      { name: "Corrida", date: "2026-03-08T05:00:00Z" }
    ],
    technical: {
      length: "5.278 km",
      laps: 58,
      distance: "306.124 km",
      corners: 14,
      drs: 4
    }
  }
];

// ---------- FUNÇÕES UTILITÁRIAS ----------
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString("pt-PT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getNextSession(race) {
  const now = new Date();
  return race.sessions.find(s => new Date(s.date) > now);
}

function countdown(targetDate) {
  const diff = new Date(targetDate) - new Date();
  if (diff <= 0) return "A decorrer ou terminado";

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  return `${d}d ${h}h ${m}m ${s}s`;
}

// ---------- HOME PAGE ----------
const nextRaceEl = document.getElementById("next-race");

if (nextRaceEl) {
  const race = races2026[0];
  const nextSession = getNextSession(race);

  if (nextSession) {
    nextRaceEl.innerHTML = `
      <strong>${race.name}</strong><br>
      ${nextSession.name}<br>
      <span id="countdown">${countdown(nextSession.date)}</span>
    `;

    setInterval(() => {
      const cd = document.getElementById("countdown");
      if (cd) cd.textContent = countdown(nextSession.date);
    }, 1000);
  } else {
    nextRaceEl.textContent = "Temporada concluída";
  }
}

// ---------- PÁGINA DA CORRIDA ----------
const params = new URLSearchParams(window.location.search);
const raceSlug = params.get("race");

const titleEl = document.getElementById("race-title");
const contentEl = document.getElementById("race-content");

if (raceSlug && titleEl && contentEl) {
  const race = races2026.find(r => r.slug === raceSlug);

  if (!race) {
    contentEl.textContent = "Corrida não encontrada";
  } else {
    const nextSession = getNextSession(race);

    titleEl.textContent = race.name;

    contentEl.innerHTML = `
      <h3>Próxima Sessão</h3>
      <p>
        <strong>${nextSession ? nextSession.name : "—"}</strong><br>
        <span id="race-countdown">
          ${nextSession ? countdown(nextSession.date) : "—"}
        </span>
      </p>

      <h3>Ficha Técnica</h3>
      <ul>
        <li>Extensão: ${race.technical.length}</li>
        <li>Voltas: ${race.technical.laps}</li>
        <li>Distância: ${race.technical.distance}</li>
        <li>Curvas: ${race.technical.corners}</li>
        <li>Zonas DRS: ${race.technical.drs}</li>
      </ul>

      <p><em>Impressão disponível assim que possível</em></p>
    `;

    if (nextSession) {
      setInterval(() => {
        const el = document.getElementById("race-countdown");
        if (el) el.textContent = countdown(nextSession.date);
      }, 1000);
    }
  }
}
