// data/results2025.js
// Resultados oficiais de 2025 para os 4 GPs já existentes
// Mantido compatível com o Estado Canónico

const results2025 = [
  {
    id: "australia",
    country: "Austrália",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    image: "assets/races/australia.jpg",

    results: {
      pole: "Lando Norris",
      fastestLap: "Lando Norris — 1:22.167",
      podium: "Lando Norris / Max Verstappen / George Russell",
      weather: "Ensolarado, pista seca",
      raceTime: "1:42:06.304"
    }
  },
  {
    id: "china",
    country: "China",
    name: "Grande Prémio da China",
    circuit: "Shanghai International Circuit",
    image: "assets/races/china.jpg",

    results: {
      pole: "Oscar Piastri",
      sprintPole: "Lewis Hamilton",
      sprintWinner: "Lewis Hamilton",
      fastestLap: "Lando Norris — 1:35.454",
      podium: "Oscar Piastri / Lando Norris / George Russell",
      weather: "Céu limpo, pista seca",
      raceTime: "—"
    }
  },
  {
    id: "japan",
    country: "Japão",
    name: "Grande Prémio do Japão",
    circuit: "Suzuka",
    image: "assets/races/japan.jpg",

    results: {
      pole: "Max Verstappen",
      fastestLap: "Kimi Antonelli — 1:30.965",
      podium: "Max Verstappen / Lando Norris / Oscar Piastri",
      weather: "Parcialmente nublado, pista seca",
      raceTime: "—"
    }
  },
  {
    id: "bahrain",
    country: "Bahrein",
    name: "Grande Prémio do Bahrein",
    circuit: "Sakhir",
    image: "assets/races/bahrain.jpg",

    results: {
      pole: "Oscar Piastri",
      fastestLap: "Oscar Piastri — 1:35.140",
      podium: "Oscar Piastri / George Russell / Lando Norris",
      weather: "Noite limpa, pista seca",
      raceTime: "—"
    }
  }
];

// Exportar para uso em main.js ou calendar2026.js
export default results2025;
