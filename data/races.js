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
    },
    results2026: {
      FP1: [
        { pos: 1, driver: "Verstappen", time: "1:18.201" },
        { pos: 2, driver: "Leclerc", time: "1:18.355" }
      ],
      FP2: [
        { pos: 1, driver: "Norris", time: "1:17.998" },
        { pos: 2, driver: "Hamilton", time: "1:18.112" }
      ],
      FP3: [
        { pos: 1, driver: "Leclerc", time: "1:17.901" },
        { pos: 2, driver: "Piastri", time: "1:18.004" }
      ],
      Quali: [
        { pos: 1, driver: "Verstappen", time: "1:15.732" },
        { pos: 2, driver: "Norris", time: "1:15.811" }
      ],
      Corrida: [
        { pos: 1, driver: "Verstappen", time: "1:31:12.456" },
        { pos: 2, driver: "Norris", time: "+3.221s" },
        { pos: 3, driver: "Sainz", time: "+7.845s" }
      ]
    },
    drivers: [
      { name: "Max Verstappen", team: "Red Bull" },
      { name: "Charles Leclerc", team: "Ferrari" },
      { name: "Lando Norris", team: "McLaren" },
      { name: "Carlos Sainz", team: "Ferrari" },
      { name: "Lewis Hamilton", team: "Mercedes" },
      { name: "Oscar Piastri", team: "McLaren" }
    ],
    constructors: [
      { name: "Red Bull", points: 45 },
      { name: "Ferrari", points: 38 },
      { name: "McLaren", points: 30 },
      { name: "Mercedes", points: 25 }
    ]
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
    },
    results2026: {
      FP1: [
        { pos: 1, driver: "Norris", time: "1:34.221" },
        { pos: 2, driver: "Piastri", time: "1:34.355" }
      ],
      FP2: [
        { pos: 1, driver: "Hamilton", time: "1:33.998" },
        { pos: 2, driver: "Russell", time: "1:34.112" }
      ],
      FP3: [
        { pos: 1, driver: "Verstappen", time: "1:33.901" },
        { pos: 2, driver: "Leclerc", time: "1:34.004" }
      ],
      Quali: [
        { pos: 1, driver: "Alonso", time: "1:32.401" },
        { pos: 2, driver: "Norris", time: "1:32.512" }
      ],
      Corrida: [
        { pos: 1, driver: "Norris", time: "1:37:48.103" },
        { pos: 2, driver: "Piastri", time: "+4.112s" },
        { pos: 3, driver: "Hamilton", time: "+8.334s" }
      ]
    },
    drivers: [
      { name: "Lando Norris", team: "McLaren" },
      { name: "Oscar Piastri", team: "McLaren" },
      { name: "Lewis Hamilton", team: "Mercedes" },
      { name: "Max Verstappen", team: "Red Bull" },
      { name: "Charles Leclerc", team: "Ferrari" },
      { name: "Fernando Alonso", team: "Alpine" }
    ],
    constructors: [
      { name: "McLaren", points: 35 },
      { name: "Mercedes", points: 28 },
      { name: "Red Bull", points: 40 },
      { name: "Ferrari", points: 32 },
      { name: "Alpine", points: 20 }
    ]
  }
];
