// Pilotos e Construtores (ordem canónica)
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
const tbodyDrivers = document.querySelector("#drivers-champ tbody");

teamsData.forEach(team => {
  team.drivers.forEach(driver => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>0</td><td>${driver}</td><td>0</td>`;
    tbodyDrivers.appendChild(tr);
  });
});

// Ordenar pilotos alfabeticamente (opcional)
Array.from(tbodyDrivers.children)
  .sort((a,b) => a.cells[1].textContent.localeCompare(b.cells[1].textContent))
  .forEach(tr => tbodyDrivers.appendChild(tr));

// ================= Construtores =================
const tbodyConstructors = document.querySelector("#constructors-champ tbody");

teamsData.forEach(team => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>0</td><td>${team.name}</td><td>0</td>`;
  tbodyConstructors.appendChild(tr);
});

// Ordenar construtores por ordem canónica
Array.from(tbodyConstructors.children)
  .sort((a,b) => teamsData.findIndex(t => t.name === a.cells[1].textContent)
              - teamsData.findIndex(t => t.name === b.cells[1].textContent))
  .forEach(tr => tbodyConstructors.appendChild(tr));

// ================= Dropbox toggle =================
document.querySelectorAll(".dropbox-toggle").forEach(img => {
  const tbody = img.nextElementSibling.nextElementSibling; // table tbody
  const rows = Array.from(tbody.children);

  // Inicialmente: mostrar apenas os primeiros 5
  rows.forEach((tr, index) => {
    tr.style.display = index < 5 ? "table-row" : "none";
  });

  img.addEventListener("click", () => {
    const isHidden = rows[5].style.display === "none";
    rows.forEach((tr, index) => {
      if(index >= 5) tr.style.display = isHidden ? "table-row" : "none";
    });
    // Alterna imagem
    img.src = isHidden ? "../assets/heroes/tabela2.jpg" : "../assets/heroes/tabela1.jpg";
  });
});

// ================= Botão Voltar ao Topo =================
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
