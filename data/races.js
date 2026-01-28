// ===============================
// F1 CALENDAR 2026 — RACES DATA
// Fonte: formula1.com
// ===============================

const RACES_2026 = [
  {
    id: "australia",
    name: "Grande Prémio da Austrália",
    country: "Austrália",
    sessions: [
      { type: "FP1", datetime: "2026-03-06T04:00:00Z" },
      { type: "FP2", datetime: "2026-03-06T07:30:00Z" },
      { type: "FP3", datetime: "2026-03-07T04:00:00Z" },
      { type: "Qualifying", datetime: "2026-03-07T07:30:00Z" },
      { type: "Race", datetime: "2026-03-08T04:00:00Z" }
    ]
  },
  {
    id: "china",
    name: "Grande Prémio da China",
    country: "China",
    sessions: [
      { type: "FP1", datetime: "2026-03-13T07:30:00Z" },
      { type: "Sprint Qualifying", datetime: "2026-03-13T11:00:00Z" },
      { type: "Sprint", datetime: "2026-03-14T08:30:00Z" },
      { type: "Qualifying", datetime: "2026-03-14T12:00:00Z" },
      { type: "Race", datetime: "2026-03-15T08:00:00Z" }
    ]
  }
];

// ===============================
// UTILITÁRIOS DE SESSÕES
// ===============================

// Formata hora local (Portugal) para exibição
function formatSessionTime(iso) {
  const date = new Date(iso);
  return date.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Lisbon"
  });
}

// Retorna a próxima corrida com base no FP1
function getNextRace() {
  const now = new Date();
  return RACES_2026.find(r => new Date(r.sessions[0].datetime) > now);
}

// Retorna a sessão por tipo
function getSession(raceId, type) {
  const race = RACES_2026.find(r => r.id === raceId);
  if (!race) return null;
  return race.sessions.find(s => s.type === type) || null;
}

// Gera HTML das sessões para cada corrida
function generateSessionsHTML(raceId) {
  const race = RACES_2026.find(r => r.id === raceId);
  if (!race) return "<p>A calcular…</p>";

  return race.sessions.map(s => {
    const time = formatSessionTime(s.datetime);
    return `<p>${s.type} – ${time}</p>`;
  }).join("");
}
