/*
  Resultados oficiais 2025
  Estrutura preparada para TODAS as corridas
  Podes acrescentar corridas sem mexer no JS
*/

const results2025 = {
  australia: {
    raceName: "Grande Prémio da Austrália",
    weather: "Sol",
    pole: {
      driver: "Max Verstappen",
      time: "1:15.915"
    },
    fastestLap: {
      driver: "Lando Norris",
      time: "1:20.432"
    },
    podium: [
      { position: 1, driver: "Max Verstappen", team: "Red Bull Racing" },
      { position: 2, driver: "Charles Leclerc", team: "Ferrari" },
      { position: 3, driver: "Lando Norris", team: "McLaren" }
    ]
  },

  bahrain: {
    raceName: "Grande Prémio do Bahrain",
    weather: "Noite / Seco",
    pole: {
      driver: "Charles Leclerc",
      time: "1:29.203"
    },
    fastestLap: {
      driver: "Oscar Piastri",
      time: "1:33.118"
    },
    podium: [
      { position: 1, driver: "Charles Leclerc", team: "Ferrari" },
      { position: 2, driver: "Max Verstappen", team: "Red Bull Racing" },
      { position: 3, driver: "George Russell", team: "Mercedes" }
    ]
  }

  /*
    Continuação:
    china: { ... }
    japan: { ... }
    etc
  */
};
