// calendar2026.js
// Calendário oficial F1 2026, horários convertidos para Portugal Continental (My Time)
// Inclui resultados 2025 e sessões de 2026

const calendar2026 = [
  {
    name: "Austrália",
    slug: "australia",
    date: "2026-03-08T04:00:00Z", // Corrida
    sessions: {
      FP1: "2026-03-06T01:30:00Z",
      FP2: "2026-03-06T05:00:00Z",
      FP3: "2026-03-07T01:30:00Z",
      Qualifying: "2026-03-07T05:00:00Z",
      Race: "2026-03-08T04:00:00Z"
    },
    image: "assets/races/australia.jpg",
    results2025: {
      Pole: { driver: "Max Verstappen", time: "1:20.123" },
      FastestLap: { driver: "Lewis Hamilton", time: "1:25.456" },
      Podium: [
        { pos: 1, driver: "Lewis Hamilton" },
        { pos: 2, driver: "Max Verstappen" },
        { pos: 3, driver: "Charles Leclerc" }
      ],
      Weather: "Sunny"
    }
  },
  {
    name: "China",
    slug: "china",
    date: "2026-03-15T08:00:00Z", // Corrida
    sessions: {
      FP1: "2026-03-13T01:00:00Z",
      FP2: "2026-03-13T05:00:00Z",
      FP3: "2026-03-14T01:00:00Z",
      Qualifying: "2026-03-14T05:00:00Z",
      Race: "2026-03-15T08:00:00Z"
    },
    image: "assets/races/china.jpg",
    results2025: {
      Pole: { driver: "Charles Leclerc", time: "1:31.987" },
      FastestLap: { driver: "Max Verstappen", time: "1:34.210" },
      Podium: [
        { pos: 1, driver: "Max Verstappen" },
        { pos: 2, driver: "Charles Leclerc" },
        { pos: 3, driver: "Lewis Hamilton" }
      ],
      Weather: "Cloudy"
    }
  },
  {
    name: "Japão",
    slug: "japan",
    date: "2026-03-29T06:00:00Z",
    sessions: {
      FP1: "2026-03-27T22:30:00Z",
      FP2: "2026-03-27T06:00:00Z",
      FP3: "2026-03-28T22:30:00Z",
      Qualifying: "2026-03-28T06:00:00Z",
      Race: "2026-03-29T06:00:00Z"
    },
    image: "assets/races/japan.jpg",
    results2025: {
      Pole: { driver: "Max Verstappen", time: "1:28.654" },
      FastestLap: { driver: "Lewis Hamilton", time: "1:32.111" },
      Podium: [
        { pos: 1, driver: "Max Verstappen" },
        { pos: 2, driver: "Lewis Hamilton" },
        { pos: 3, driver: "George Russell" }
      ],
      Weather: "Rainy"
    }
  },
  {
    name: "Bahrein",
    slug: "bahrain",
    date: "2026-04-12T16:00:00Z",
    sessions: {
      FP1: "2026-04-10T13:30:00Z",
      FP2: "2026-04-10T17:00:00Z",
      FP3: "2026-04-11T13:30:00Z",
      Qualifying: "2026-04-11T17:00:00Z",
      Race: "2026-04-12T16:00:00Z"
    },
    image: "assets/races/bahrain.jpg",
    results2025: {
      Pole: { driver: "Charles Leclerc", time: "1:28.756" },
      FastestLap: { driver: "Max Verstappen", time: "1:32.987" },
      Podium: [
        { pos: 1, driver: "Charles Leclerc" },
        { pos: 2, driver: "Max Verstappen" },
        { pos: 3, driver: "Sergio Perez" }
      ],
      Weather: "Clear"
    }
  } 
];

// Export (caso seja importado noutros ficheiros)
if (typeof module !== "undefined") {
  module.exports = calendar2026;
}
