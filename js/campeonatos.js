// ================= DADOS CANÓNICOS =================
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

// ================= PILOTOS =================
const driversTbody = document.querySelector("#drivers-champ tbody");

let driverList = [];
teamsData.forEach(team => {
  team.drivers.forEach(driver => driverList.push(driver));
});

driverList.sort((a, b) => a.localeCompare(b));

driverList.forEach((driver, index) => {
  const tr = document.createElement("tr");
  if (index >= 5) tr.classList.add("hidden");
  tr.innerHTML = `<td>${index + 1}</td><td>${driver}</td><td>0</td>`;
  driversTbody.appendChild(tr);
});

// ================= CONSTRUTORES =================
const constructorsTbody = document.querySelector("#constructors-champ tbody");

teamsData.forEach((team, index) => {
  const tr = document.createElement("tr");
  if (index >= 5) tr.classList.add("hidden");
  tr.innerHTML = `<td>${index + 1}</td><td>${team.name}</td><td>0</td>`;
  constructorsTbody.appendChild(tr);
});

// ================= DROPBOX =================
document.querySelectorAll(".dropbox-toggle").forEach(img => {
  img.addEventListener("click", () => {
    const tbody = img.parentElement.querySelector("tbody");
    tbody.querySelectorAll("tr").forEach((tr, index) => {
      if (index >= 5) tr.classList.toggle("hidden");
    });
  });
});

// ===== BOTÃO VOLTAR AO TOPO =====
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if(window.scrollY > 100) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
