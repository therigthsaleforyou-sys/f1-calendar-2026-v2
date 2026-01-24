const teams = [
  {
    name: "Red Bull Racing",
    country: "Áustria",
    engine: "Honda RBPT",
    drivers: ["Max Verstappen", "Sergio Pérez"]
  },
  {
    name: "Mercedes-AMG",
    country: "Alemanha",
    engine: "Mercedes",
    drivers: ["Lewis Hamilton", "George Russell"]
  },
  {
    name: "Ferrari",
    country: "Itália",
    engine: "Ferrari",
    drivers: ["Charles Leclerc", "Carlos Sainz"]
  },
  {
    name: "McLaren",
    country: "Reino Unido",
    engine: "Mercedes",
    drivers: ["Lando Norris", "Oscar Piastri"]
  },
  {
    name: "Aston Martin",
    country: "Reino Unido",
    engine: "Mercedes",
    drivers: ["Fernando Alonso", "Lance Stroll"]
  },
  {
    name: "Alpine",
    country: "França",
    engine: "Renault",
    drivers: ["Esteban Ocon", "Pierre Gasly"]
  },
  {
    name: "Williams",
    country: "Reino Unido",
    engine: "Mercedes",
    drivers: ["Alexander Albon", "Logan Sargeant"]
  },
  {
    name: "RB (Visa Cash App)",
    country: "Itália",
    engine: "Honda RBPT",
    drivers: ["Yuki Tsunoda", "Daniel Ricciardo"]
  },
  {
    name: "Kick Sauber",
    country: "Suíça",
    engine: "Ferrari",
    drivers: ["Valtteri Bottas", "Zhou Guanyu"]
  },
  {
    name: "Haas",
    country: "Estados Unidos",
    engine: "Ferrari",
    drivers: ["Kevin Magnussen", "Nico Hülkenberg"]
  }
];

const container = document.getElementById("teams");

container.innerHTML = teams.map(team => `
  <div style="
    background:#111;
    border-left:5px solid #e10600;
    padding:15px;
    border-radius:10px;
    margin-bottom:15px
  ">
    <h2>${team.name}</h2>
    <p><strong>País:</strong> ${team.country}</p>
    <p><strong>Motor:</strong> ${team.engine}</p>
    <p><strong>Pilotos:</strong></p>
    <ul>
      ${team.drivers.map(d => `<li>${d}</li>`).join("")}
    </ul>
  </div>
`).join("");
