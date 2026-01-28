// ===============================
// F1 CALENDAR 2026 — PILOTS TABLE
// ===============================

// Obtém os resultados dos pilotos do localStorage ou cria vazio
function getPilotsPoints() {
  return JSON.parse(localStorage.getItem("pilots_points")) || DRIVERS_CONSTRUCTORS_2026.map(driver => ({
    name: driver.name,
    constructor: driver.constructor,
    number: driver.number,
    points: 0
  }));
}

// Salva os pontos dos pilotos no localStorage
function savePilotsPoints(pilots) {
  localStorage.setItem("pilots_points", JSON.stringify(pilots));
}

// Renderiza a tabela de pilotos
function renderPilotsTable(elementId) {
  const container = document.getElementById(elementId);
  if (!container) return;

  const pilots = getPilotsPoints();
  // Ordena por pontos descendente
  pilots.sort((a, b) => b.points - a.points);

  let html = `
    <table class="pilots-table">
      <thead>
        <tr>
          <th>Posição</th>
          <th>Piloto</th>
          <th>Equipa</th>
          <th>Nº</th>
          <th>Pontos</th>
        </tr>
      </thead>
      <tbody>
  `;

  pilots.forEach((pilot, index) => {
    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${pilot.name}</td>
        <td>${pilot.constructor}</td>
        <td>${pilot.number}</td>
        <td>${pilot.points}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  container.innerHTML = html;
}

// Atualiza os pontos de um piloto específico
function updatePilotPoints(pilotName, points) {
  const pilots = getPilotsPoints();
  const pilot = pilots.find(p => p.name === pilotName);
  if (pilot) {
    pilot.points = points;
    savePilotsPoints(pilots);
  }
}
