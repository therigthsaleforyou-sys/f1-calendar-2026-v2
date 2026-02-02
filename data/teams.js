// data/teams.js
// Fonte: Fórmula 1 (estrutura base)

const teams2026 = [
  {
    id: "redbull",
    name: "Red Bull Racing",
    logo: "assets/teams/redbull.png",
    drivers: ["Max Verstappen", "Sergio Pérez"]
  },
  {
    id: "ferrari",
    name: "Scuderia Ferrari",
    logo: "assets/teams/ferrari.png",
    drivers: ["Charles Leclerc", "Carlos Sainz"]
  },
  {
    id: "mercedes",
    name: "Mercedes-AMG Petronas",
    logo: "assets/teams/mercedes.png",
    drivers: ["George Russell", "Lewis Hamilton"]
  },
  {
    id: "mclaren",
    name: "McLaren",
    logo: "assets/teams/mclaren.png",
    drivers: ["Lando Norris", "Oscar Piastri"]
  },
  {
    id: "astonmartin",
    name: "Aston Martin",
    logo: "assets/teams/astonmartin.png",
    drivers: ["Fernando Alonso", "Lance Stroll"]
  }
];

// tornar global
window.teams2026 = teams2026;
