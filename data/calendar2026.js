// data/calendar2026.js
// F1 Calendar 2026 — versão final com resultados 2025 incluídos

const calendar2026 = [
  {
    name: "Austrália",
    slug: "australia",
    date: "2026-03-08T04:00:00Z",
    image: "assets/races/australia.jpg",
    sessions: {
      "FP1": "2026-03-06T01:30:00Z",
      "FP2": "2026-03-06T05:00:00Z",
      "FP3": "2026-03-07T01:30:00Z",
      "Qualifying": "2026-03-07T05:00:00Z",
      "Race": "2026-03-08T04:00:00Z"
    },
    results2025: {
      "Pole": "Max Verstappen",
      "Volta Mais Rápida": "Lewis Hamilton",
      "Pódio": "Max Verstappen / Lewis Hamilton / Charles Leclerc",
      "Meteorologia": "Ensolarado, 28°C"
    }
  },
  {
    name: "China",
    slug: "china",
    date: "2026-03-15T07:00:00Z",
    image: "assets/races/china.jpg",
    sessions: {
      "FP1": "2026-03-13T03:30:00Z",
      "Sprint Qualifying": "2026-03-13T07:30:00Z",
      "Sprint Race": "2026-03-14T03:00:00Z",
      "Qualifying": "2026-03-14T07:00:00Z",
      "Race": "2026-03-15T07:00:00Z"
    },
    results2025: {
      "Pole": "Charles Leclerc",
      "Volta Mais Rápida": "Carlos Sainz",
      "Pódio": "Charles Leclerc / Max Verstappen / Sergio Pérez",
      "Meteorologia": "Nublado, 24°C"
    }
  },
  {
    name: "Japão",
    slug: "japan",
    date: "2026-03-29T06:00:00Z",
    image: "assets/races/japan.jpg",
    sessions: {
      "FP1": "2026-03-27T02:30:00Z",
      "FP2": "2026-03-27T06:00:00Z",
      "FP3": "2026-03-28T02:30:00Z",
      "Qualifying": "2026-03-28T06:00:00Z",
      "Race": "2026-03-29T06:00:00Z"
    },
    results2025: {
      "Pole": "Sergio Pérez",
      "Volta Mais Rápida": "Charles Leclerc",
      "Pódio": "Sergio Pérez / Max Verstappen / Lewis Hamilton",
      "Meteorologia": "Chuva leve, 21°C"
    }
  },
  {
    name: "Bahrein",
    slug: "bahrain",
    date: "2026-04-12T16:00:00Z",
    image: "assets/races/bahrain.jpg",
    sessions: {
      "FP1": "2026-04-10T12:30:00Z",
      "FP2": "2026-04-10T16:00:00Z",
      "FP3": "2026-04-11T13:30:00Z",
      "Qualifying": "2026-04-11T17:00:00Z",
      "Race": "2026-04-12T16:00:00Z"
    },
    results2025: {
      "Pole": "Lewis Hamilton",
      "Volta Mais Rápida": "George Russell",
      "Pódio": "Lewis Hamilton / George Russell / Max Verstappen",
      "Meteorologia": "Ensolarado, 32°C"
    }
  }
];

// Export se for usado com módulos (opcional)
if (typeof module !== 'undefined') {
  module.exports = calendar2026;
}
