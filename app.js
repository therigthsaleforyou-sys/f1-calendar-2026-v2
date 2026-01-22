// ==============================
// DADOS BASE (REFERÊNCIA ATUAL)
// ==============================

const constructors = [
  "Red Bull Racing",
  "Ferrari",
  "Mercedes",
  "McLaren",
  "Aston Martin",
  "Alpine",
  "Williams",
  "RB (Visa Cash App)",
  "Kick Sauber",
  "Haas"
];

// ==============================
// MENU GLOBAL (USADO EM TODAS)
// ==============================

function renderMenu() {
  return `
    <nav class="menu">
      <button onclick="goHome()">🏠 Home</button>
      <button onclick="goTeams()">👥 Equipas</button>
      <button onclick="goDrivers()">🏆 Pilotos</button>
      <button onclick="goConstructors()">🏎️ Construtores</button>
    </nav>
  `;
}

// ==============================
// HOME
// ==============================

function renderHome() {
  document.getElementById("app").innerHTML = `
    ${renderMenu()}

    <section class="card">
      <h2>Próxima Corrida</h2>
      <p>Grande Prémio da Austrália</p>
      <p><strong>FP1</strong></p>
      <div class="countdown">42d 12h 18m</div>
      <button class="btn" onclick="goRace()">Ver detalhes</button>
    </section>

    <footer>F1 2026 – Projeto independente</footer>
  `;
}

// ==============================
// CORRIDA
// ==============================

function renderRace() {
  document.getElementById("app").innerHTML = `
    ${renderMenu()}

    <section class="card">
      <h2>Grande Prémio da Austrália</h2>
      <p>Dados da corrida (exemplo)</p>
    </section>

    <footer>F1 2026 – Projeto independente</footer>
  `;
}

// ==============================
// EQUIPAS
// ==============================

function renderTeams() {
  document.getElementById("app").innerHTML = `
    ${renderMenu()}

    <section class="card">
      <h2>Equipas</h2>
      <p>Página de equipas</p>
    </section>

    <footer>F1 2026 – Projeto independente</footer>
  `;
}

// ==============================
// PILOTOS
// ==============================

function renderDrivers() {
  document.getElementById("app").innerHTML = `
    ${renderMenu()}

    <section class="card">
      <h2>Pilotos</h2>
      <p>Página de pilotos</p>
    </section>

    <footer>F1 2026 – Projeto independente</footer>
  `;
}

// ==============================
// CONSTRUTORES (✅ PONTO 3)
// ==============================

function renderConstructors() {
  document.getElementById("app").innerHTML = `
    ${renderMenu()}

    <section class="card">
      <h2>Construtores</h2>
      <ul class="list">
        ${constructors.map(c => `<li>${c}</li>`).join("")}
      </ul>
    </section>

    <footer>F1 2026 – Projeto independente</footer>
  `;
}

// ==============================
// NAVEGAÇÃO GLOBAL
// ==============================

function goHome() {
  renderHome();
}

function goRace() {
  renderRace();
}

function goTeams() {
  renderTeams();
}

function goDrivers() {
  renderDrivers();
}

function goConstructors() {
  renderConstructors();
}

// ==============================
// INIT
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  renderHome();
});
