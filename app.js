// ===============================
// DADOS DA ÉPOCA 2026
// ===============================
const races2026 = [
  {
    slug: "australia",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    date: "2026-03-08T05:00:00",
    image: "assets/australia.jpg",
    sessions: {
      fp1: "2026-03-06T01:30:00",
      fp2: "2026-03-06T05:00:00",
      fp3: "2026-03-07T01:30:00",
      qualifying: "2026-03-07T05:00:00",
      race: "2026-03-08T05:00:00"
    }
  },
  {
    slug: "bahrain",
    name: "Grande Prémio do Bahrain",
    circuit: "Sakhir",
    date: "2026-03-15T15:00:00",
    image: "assets/bahrain.jpg",
    sessions: {
      fp1: "2026-03-13T12:30:00",
      fp2: "2026-03-13T16:00:00",
      fp3: "2026-03-14T13:00:00",
      qualifying: "2026-03-14T16:00:00",
      race: "2026-03-15T15:00:00"
    }
  }
];

// ===============================
// FUNÇÕES AUXILIARES
// ===============================
function formatDate(dateString) {
  return new Date(dateString).toLocaleString("pt-PT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getCountdown(targetDate) {
  const diff = new Date(targetDate) - new Date();
  if (diff <= 0) return "A decorrer ou terminado";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return `${days}d ${hours}h ${minutes}m`;
}

// ===============================
// PRÓXIMA SESSÃO GLOBAL
// ===============================
function getNextSession() {
  const now = new Date();
  let nextSession = null;

  races2026.forEach(race => {
    Object.entries(race.sessions).forEach(([type, date]) => {
      const sessionDate = new Date(date);
      if (sessionDate > now) {
        if (!nextSession || sessionDate < new Date(nextSession.date)) {
          nextSession = {
            race: race.name,
            session: type.toUpperCase(),
            date
          };
        }
      }
    });
  });

  return nextSession;
}

// ===============================
// HOME PAGE
// ===============================
const nextRaceEl = document.getElementById("next-race");
const appEl = document.getElementById("app");

if (nextRaceEl) {
  const next = getNextSession();

  if (next) {
    nextRaceEl.innerHTML = `
      <strong>${next.session}</strong><br>
      ${next.race}<br>
      <small>Começa em: ${getCountdown(next.date)}</small>
    `;
  } else {
    nextRaceEl.textContent = "Época concluída";
  }
}

// ===============================
// LISTA DE CORRIDAS
// ===============================
if (appEl) {
  const listSection = document.createElement("section");
  listSection.innerHTML = "<h2>Calendário 2026</h2>";

  races2026.forEach(race => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>
        <a href="race.html?race=${race.slug}">
          ${race.name}
        </a>
      </h3>
      <p>${race.circuit} — ${formatDate(race.date)}</p>
    `;
    listSection.appendChild(div);
  });

  appEl.appendChild(listSection);
}

// ===============================
// PÁGINA DA CORRIDA
// ===============================
const params = new URLSearchParams(window.location.search);
const raceSlug = params.get("race");

if (raceSlug) {
  const race = races2026.find(r => r.slug === raceSlug);

  const titleEl = document.getElementById("race-title");
  const contentEl = document.getElementById("race-content");

  if (race && titleEl && contentEl) {
    titleEl.textContent = race.name;

    contentEl.innerHTML = `
      <img src="${race.image}" alt="${race.circuit}" style="width:100%;max-width:700px;margin:20px 0;">
      <p><strong>Circuit:</strong> ${race.circuit}</p>
      <p><strong>Data:</strong> ${formatDate(race.date)}</p>

      <h3>Próxima Sessão</h3>
      <p>${getCountdown(race.sessions.race)}</p>

      <h3>Sessões</h3>
      <ul>
        <li>FP1: ${formatDate(race.sessions.fp1)}</li>
        <li>FP2: ${formatDate(race.sessions.fp2)}</li>
        <li>FP3: ${formatDate(race.sessions.fp3)}</li>
        <li>Qualificação: ${formatDate(race.sessions.qualifying)}</li>
        <li>Corrida: ${formatDate(race.sessions.race)}</li>
      </ul>
    `;
  }
}
