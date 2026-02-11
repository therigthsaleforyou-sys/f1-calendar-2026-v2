Pilotos e Construtores (ordem canónica)
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
tr.innerHTML = <td>0</td><td>${driver}</td><td>0</td>;
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
tr.innerHTML = <td>0</td><td>${team.name}</td><td>0</td>;
tbodyConstructors.appendChild(tr);
});

// Ordenar construtores por ordem canónica
Array.from(tbodyConstructors.children)
.sort((a,b) => teamsData.findIndex(t => t.name === a.cells[1].textContent)
- teamsData.findIndex(t => t.name === b.cells[1].textContent))
.forEach(tr => tbodyConstructors.appendChild(tr));

// ================= Dropbox toggle =================
document.querySelectorAll(".dropbox-toggle").forEach(img => {
img.addEventListener("click", () => {
const tbody = img.nextElementSibling.nextElementSibling; // table tbody
if(tbody.style.display === "none") {
tbody.style.display = "table-row-group";
img.src = "../assets/heroes/tabela2.jpg";
} else {
tbody.style.display = "none";
img.src = "../assets/heroes/tabela1.jpg";
}
});

// Inicia fechado
const tbody = img.nextElementSibling.nextElementSibling;
tbody.style.display = "none";
});
