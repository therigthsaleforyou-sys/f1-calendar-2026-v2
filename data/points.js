// ===============================
// F1 CALENDAR 2026 — POINTS SYSTEM
// ===============================

// Pontos F1 padrão para corrida
const POINTS_SYSTEM = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

// Atribui pontos a pilotos e construtores
function assignPoints(raceId, raceResults) {
  if (!raceId || !raceResults || !Array.isArray(raceResults)) return;

  // Atualiza pilotos
  const pilots = JSON.parse(localStorage.getItem("pilots_points")) || [];
  raceResults.forEach((pilotName, index) => {
    const points = POINTS_SYSTEM[index] || 0;
    const pilot = pilots.find(p => p.name === pilotName);
    if (pilot) pilot.points += points;
  });
  localStorage.setItem("pilots_points", JSON.stringify(pilots));

  // Atualiza construtores
  const constructors = JSON.parse(localStorage.getItem("constructors_points")) || [];
  raceResults.forEach((pilotName, index) => {
    const points = POINTS_SYSTEM[index] || 0;
    // Obtém o construtor do piloto
    const driver = DRIVERS_CONSTRUCTORS_2026.find(d => d.name === pilotName);
    if (driver) {
      const constructor = constructors.find(c => c.name === driver.constructor);
      if (constructor) constructor.points += points;
    }
  });
  localStorage.setItem("constructors_points", JSON.stringify(constructors));
}

// Reseta pontos de pilotos e construtores (opcional)
function resetPoints() {
  const pilots = DRIVERS_CONSTRUCTORS_2026.map(driver => ({
    name: driver.name,
    constructor: driver.constructor,
    number: driver.number,
    points: 0
  }));
  localStorage.setItem("pilots_points", JSON.stringify(pilots));

  const constructors = TEAMS_2026.map(team => ({
    name: team.name,
    points: 0
  }));
  localStorage.setItem("constructors_points", JSON.stringify(constructors));
}

// Inicializa pontos (usar ao carregar a página)
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("pilots_points") || !localStorage.getItem("constructors_points")) {
    resetPoints();
  }
});
