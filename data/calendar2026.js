// data/calendar2026.js
// Calendário F1 2026 + Resultados oficiais de 2025
// Compatível com main.js e Estado Canónico

const calendar2026 = [
  {
    id: "australia",
    name: "Austrália",
    slug: "australia",
    image: "assets/races/australia.jpg",
    sessions: {
      "Practice 1": "2026-03-06T01:30:00Z",
      "Practice 2": "2026-03-06T05:00:00Z",
      "Practice 3": "2026-03-07T01:30:00Z",
      "Qualifying": "2026-03-07T05:00:00Z",
      "Race": "2026-03-08T04:00:00Z"
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
    name: "China",
    slug: "china",
    image: "assets/races/china.jpg",
    sessions: {
      "Practice 1": "2026-03-13T03:30:00Z",
      "Sprint Qualifying": "2026-03-13T07:30:00Z",
      "Sprint Race": "2026-03-14T03:00:00Z",
      "Qualifying": "2026-03-14T07:00:00Z",
      "Race": "2026-03-15T07:00:00Z"
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
    name: "Japão",
    slug: "japan",
    image: "assets/races/japan.jpg",
    sessions: {
      "Practice 1": "2026-03-27T02:30:00Z",
      "Practice 2": "2026-03-27T06:00:00Z",
      "Practice 3": "2026-03-28T02:30:00Z",
      "Qualifying": "2026-03-28T06:00:00Z",
      "Race": "2026-03-29T06:00:00Z"
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
    name: "Bahrein",
    slug: "bahrain",
    image: "assets/races/bahrain.jpg",
    sessions: {
      "Practice 1": "2026-04-10T12:30:00Z",
      "Practice 2": "2026-04-10T16:00:00Z",
      "Practice 3": "2026-04-11T13:30:00Z",
      "Qualifying": "2026-04-11T17:00:00Z",
      "Race": "2026-04-12T16:00:00Z"
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

// Exportar para uso em main.js
export default calendar2026;
