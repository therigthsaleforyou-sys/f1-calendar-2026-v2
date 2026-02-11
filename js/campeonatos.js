// ================= Dados canónicos =================
const teamsData = [
  { name: "McLaren", drivers: ["Lando Norris", "Oscar Piastri"] },
  { name: "Mercedes", drivers: ["George Russell", "Kimi Antonelli"] },
  { name: "Red Bull Racing", drivers: ["Max Verstappen", "Isack Hadjar"] },
  { name: "Ferrari", drivers: ["Charles Leclerc", "Lewis Hamilton"] },
  { name: "Aston Martin", drivers: ["Fernando Alonso", "Lance Stroll"] },
  { name: "Williams", drivers: ["Alexander Albon", "Carlos Sainz Jr."] },
  { name: "Audi F1 Team", drivers: ["Nico Hülkenberg", "Gabriel Bortoleto"] },
  { name: "Alpine", drivers: ["Pierre Gasly", "Franco Colapinto"] },
  { name: "Haas", drivers: ["Esteban Ocon", "Oliver Bearman"] },
  { name: "Racing Bulls", drivers: ["Liam Lawson", "Arvid Lindblad"] },
  { name: "Cadillac F1 Team", drivers: ["Sergio Pérez", "Valtteri Bottas"] }
];

// ================= Pilotos =================
const driversTbody = document.querySelector("#drivers-champ tbody");

teamsData.forEach(team => {
  team.drivers.forEach(driver => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>0</td><td>${driver}</td><td>0</td>`;
    driversTbody.appendChild(tr);
  });
});

// Ordem alfabética
Array.from(driversTbody.children)
  .sort((a, b) => a.cells[1].textContent.localeCompare(b.cells[1].textContent))
  .forEach(tr => driversTbody.appendChild(tr));

// ================= Construtores =================
const constructorsTbody = document.querySelector("#constructors-champ tbody");

teamsData.forEach(team => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>0</td><td>${team.name}</td><td>0</td>`;
  constructorsTbody.appendChild(tr);
});

// ================= Função Dropbox =================
function applyDropbox(cardId) {
  const card = document.getElementById(cardId);
  const img = card.querySelector(".dropbox-toggle");
  const rows = Array.from(card.querySelectorAll("tbody tr"));

  let expanded = false;

  function updateRows() {
    rows.forEach((row, index) => {
      row.style.display = expanded || index < 5 ? "" : "none";
    });
  }

  updateRows(); // estado inicial

  img.addEventListener("click", () => {
    expanded = !expanded;
    updateRows();
  });
}

// ================= Aplicar =================
applyDropbox("drivers-champ");
applyDropbox("constructors-champ");
