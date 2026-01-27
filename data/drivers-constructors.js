const teams2026 = [
  {
    name: "Red Bull Racing",
    logo: "assets/teams/redbull.png",
    drivers: ["Max Verstappen", "Sergio Pérez"]
  },
  {
    name: "Ferrari",
    logo: "assets/teams/ferrari.png",
    drivers: ["Charles Leclerc", "Lewis Hamilton"]
  },
  {
    name: "Mercedes",
    logo: "assets/teams/mercedes.png",
    drivers: ["George Russell", "Andrea Kimi Antonelli"]
  },
  {
    name: "McLaren",
    logo: "assets/teams/mclaren.png",
    drivers: ["Lando Norris", "Oscar Piastri"]
  },
  {
    name: "Aston Martin",
    logo: "assets/teams/astonmartin.png",
    drivers: ["Fernando Alonso", "Lance Stroll"]
  },
  {
    name: "Alpine",
    logo: "assets/teams/alpine.png",
    drivers: ["Pierre Gasly", "Esteban Ocon"]
  },
  {
    name: "Williams",
    logo: "assets/teams/williams.png",
    drivers: ["Alex Albon", "Logan Sargeant"]
  },
  {
    name: "RB",
    logo: "assets/teams/rb.png",
    drivers: ["Yuki Tsunoda", "Daniel Ricciardo"]
  },
  {
    name: "Sauber",
    logo: "assets/teams/sauber.png",
    drivers: ["Valtteri Bottas", "Zhou Guanyu"]
  },
  {
    name: "Haas",
    logo: "assets/teams/haas.png",
    drivers: ["Kevin Magnussen", "Nico Hülkenberg"]
  }
];

const drivers2026 = teams2026.flatMap(team =>
  team.drivers.map(driver => ({
    name: driver,
    team: team.name,
    points: 0
  }))
);
