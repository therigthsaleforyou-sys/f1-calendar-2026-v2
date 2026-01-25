const races = [
  {
    id: "australia",
    name: "Grande Prémio da Austrália",
    country: "Austrália",
    circuit: "Melbourne",
    image: "assets/races/australia.jpg",
    sessions: {
      FP1: "2026-03-05T01:30:00Z",
      FP2: "2026-03-05T05:00:00Z",
      FP3: "2026-03-06T02:00:00Z",
      Quali: "2026-03-06T05:00:00Z",
      Corrida: "2026-03-07T04:00:00Z"
    },
    history2025: {
      weather: "Céu limpo, 26°C",
      pole: { driver: "Max Verstappen", time: "1:15.732" },
      fastestLap: { driver: "Charles Leclerc", time: "1:19.813" },
      raceTime: "1:31:12.456",
      podium: ["Max Verstappen", "Lando Norris", "Carlos Sainz"]
    }
  },
  {
    id: "china",
    name: "Grande Prémio da China",
    country: "China",
    circuit: "Shanghai",
    image: "assets/races/china.jpg",
    sessions: {
      FP1: "2026-03-12T04:00:00Z",
      FP2: "2026-03-12T08:00:00Z",
      FP3: "2026-03-13T05:00:00Z",
      Quali: "2026-03-13T08:00:00Z",
      Corrida: "2026-03-14T07:00:00Z"
    },
    history2025: {
      weather: "Nublado, 22°C",
      pole: { driver: "Fernando Alonso", time: "1:32.401" },
      fastestLap: { driver: "Oscar Piastri", time: "1:36.912" },
      raceTime: "1:37:48.103",
      podium: ["Lando Norris", "Oscar Piastri", "Lewis Hamilton"]
    }
  },
  {
    id: "japan",
    name: "Grande Prémio do Japão",
    country: "Japão",
    circuit: "Suzuka",
    image: "assets/races/japan.jpg",
    sessions: {
      FP1: "2026-03-26T01:00:00Z",
      FP2: "2026-03-26T04:30:00Z",
      FP3: "2026-03-27T02:00:00Z",
      Quali: "2026-03-27T05:00:00Z",
      Corrida: "2026-03-28T04:00:00Z"
    },
    history2025: {
      weather: "Chuva fraca, 19°C",
      pole: { driver: "George Russell", time: "1:28.112" },
      fastestLap: { driver: "Max Verstappen", time: "1:32.004" },
      raceTime: "1:45:21.876",
      podium: ["Max Verstappen", "George Russell", "Sergio Pérez"]
    }
  },
  {
    id: "bahrain",
    name: "Grande Prémio do Bahrain",
    country: "Bahrain",
    circuit: "Sakhir",
    image: "assets/races/bahrain.jpg",
    sessions: {
      FP1: "2026-04-09T12:00:00Z",
      FP2: "2026-04-09T16:00:00Z",
      FP3: "2026-04-10T13:00:00Z",
      Quali: "2026-04-10T16:00:00Z",
      Corrida: "2026-04-11T15:00:00Z"
    },
    history2025: {
      weather: "Noite limpa, 24°C",
      pole: { driver: "Charles Leclerc", time: "1:29.998" },
      fastestLap: { driver: "Carlos Sainz", time: "1:34.221" },
      raceTime: "1:33:09.554",
      podium: ["Charles Leclerc", "Carlos Sainz", "Lando Norris"]
    }
  }
];
