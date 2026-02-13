document.addEventListener("DOMContentLoaded", () => {

  // ================= TEAMS CARDS =================
  const teamsCards = document.getElementById("teams-cards");

  const teamsData = [
    { name: "McLaren", image: "assets/teams/mclaren.png", drivers: ["Lando Norris", "Oscar Piastri"] },
    { name: "Mercedes", image: "assets/teams/mercedes.png", drivers: ["George Russell", "Kimi Antonelli"] },
    { name: "Red Bull Racing", image: "assets/teams/redbull.png", drivers: ["Max Verstappen", "Isack Hadjar"] },
    { name: "Ferrari", image: "assets/teams/ferrari.png", drivers: ["Charles Leclerc", "Lewis Hamilton"] },
    { name: "Aston Martin", image: "assets/teams/astonmartin.png", drivers: ["Fernando Alonso", "Lance Stroll"] },
    { name: "Williams", image: "assets/teams/williams.png", drivers: ["Alexander Albon", "Carlos Sainz Jr."] },
    { name: "Audi F1 Team", image: "assets/teams/audi.png", drivers: ["Nico Hülkenberg", "Gabriel Bortoleto"] },
    { name: "Alpine", image: "assets/teams/alpine.png", drivers: ["Pierre Gasly", "Franco Colapinto"] },
    { name: "Haas", image: "assets/teams/haas.png", drivers: ["Esteban Ocon", "Oliver Bearman"] },
    { name: "Racing Bulls", image: "assets/teams/racing-bulls.png", drivers: ["Liam Lawson", "Arvid Lindblad"] },
    { name: "Cadillac F1 Team", image: "assets/teams/cadillac.png", drivers: ["Sergio Pérez", "Valtteri Bottas"] }
  ];

  teamsData.forEach(team => {
    const card = document.createElement("div");
    card.className = "team-card";
    card.innerHTML = `
      <img src="${team.image}" alt="${team.name}">
      <h3>${team.name}</h3>
      <p><strong>Pilotos:</strong></p>
      ${team.drivers.map(d => `<p>${d}</p>`).join("")}
    `;
    teamsCards.appendChild(card);
  });

  // ================= BACK TO TOP =================
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ================= DROPDOWN CORRIDAS =================
  const btnCorridas = document.getElementById("btn-corridas");
  const corridasList = document.getElementById("corridas-list");

  // Preencher dropdown com ordem do calendar2026
  if (!window.calendar2026) {
    console.error("calendar2026 não carregado");
    return;
  }

  corridasList.innerHTML = "";
  window.calendar2026.forEach(race => {
    const a = document.createElement("a");
    a.href = `race/${race.id}.html`;
    a.textContent = race.name;
    corridasList.appendChild(a);
  });

  // Toggle dropdown
  btnCorridas.addEventListener("click", (e) => {
    e.stopPropagation();
    btnCorridas.parentElement.classList.toggle("show");
  });

  // Fechar dropdown ao clicar fora
  document.addEventListener("click", () => {
    btnCorridas.parentElement.classList.remove("show");
  });

});
