document.addEventListener("DOMContentLoaded", () => {
  // Dados simulados (podes substituir pelos reais do calendar2026)
  const pilotos = [
    { pos: 1, name: "Max Verstappen", team: "Red Bull", points: 45 },
    { pos: 2, name: "Lewis Hamilton", team: "Mercedes", points: 38 },
    { pos: 3, name: "Charles Leclerc", team: "Ferrari", points: 33 },
    { pos: 4, name: "Sergio Pérez", team: "Red Bull", points: 28 },
    { pos: 5, name: "George Russell", team: "Mercedes", points: 24 }
  ];

  const construtores = [
    { pos: 1, team: "Red Bull", points: 73 },
    { pos: 2, team: "Mercedes", points: 62 },
    { pos: 3, team: "Ferrari", points: 50 },
    { pos: 4, team: "McLaren", points: 22 },
    { pos: 5, team: "Alpine", points: 18 }
  ];

  const pilotosBody = document.getElementById("pilotos-body");
  const construtoresBody = document.getElementById("construtores-body");

  pilotos.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${p.pos}</td><td>${p.name}</td><td>${p.team}</td><td>${p.points}</td>`;
    pilotosBody.appendChild(row);
  });

  construtores.forEach(c => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${c.pos}</td><td>${c.team}</td><td>${c.points}</td>`;
    construtoresBody.appendChild(row);
  });

  // Back-to-top
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
