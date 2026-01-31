// data/calendar2026.js
// F1 Calendar 2026 com resultados de 2025 integrados
// Compatível com main.js e Estado Canónico

const calendar2026 = [
  {
    id: "australia",
    country: "Austrália",
    name: "Grande Prémio da Austrália",
    slug: "australia",
    image: "assets/races/australia.jpg",
    sessions: {
      practice1: "2026-03-07T01:00:00Z",
      practice2: "2026-03-07T05:00:00Z",
      practice3: "2026-03-08T03:00:00Z",
      qualifying: "2026-03-08T06:00:00Z",
      sprint: "2026-03-09T03:00:00Z",
      race: "2026-03-09T05:00:00Z"
    },
    results2025: {
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
    slug: "china",
    image: "assets/races/china.jpg",
    sessions: {
      practice1: "2026-04-11T03:00:00Z",
      practice2: "2026-04-11T07:00:00Z",
      practice3: "2026-04-12T03:00:00Z",
      qualifying: "2026-04-12T06:00:00Z",
      sprint: "2026-04-13T03:00:00Z",
      race: "2026-04-13T05:00:00Z"
    },
    results2025: {
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
    slug: "japan",
    image: "assets/races/japan.jpg",
    sessions: {
      practice1: "2026-09-27T02:00:00Z",
      practice2: "2026-09-27T06:00:00Z",
      practice3: "2026-09-28T02:00:00Z",
      qualifying: "2026-09-28T05:00:00Z",
      sprint: "2026-09-29T02:00:00Z",
      race: "2026-09-29T04:00:00Z"
    },
    results2025: {
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
    slug: "bahrain",
    image: "assets/races/bahrain.jpg",
    sessions: {
      practice1: "2026-03-21T11:00:00Z",
      practice2: "2026-03-21T15:00:00Z",
      practice3: "2026-03-22T13:00:00Z",
      qualifying: "2026-03-22T16:00:00Z",
      sprint: "2026-03-23T13:00:00Z",
      race: "2026-03-23T15:00:00Z"
    },
    results2025: {
      pole: "Oscar Piastri",
      fastestLap: "Oscar Piastri — 1:35.140",
      podium: "Oscar Piastri / George Russell / Lando Norris",
      weather: "Noite limpa, pista seca",
      raceTime: "—"
    }
  }
];

// Exportar para main.js
export default calendar2026;
