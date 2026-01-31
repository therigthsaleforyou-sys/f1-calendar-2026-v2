// data/calendar2026.js
// F1 Calendar 2026 - versão final com resultados de 2025 integrados
// Mantido compatível com o Estado Canónico

const calendar2026 = [
  {
    slug: "australia",
    name: "Austrália",
    country: "Austrália",
    image: "assets/races/australia.jpg",
    date: "2026-03-08T04:00:00Z",
    sessions: {
      "Practice 1": "2026-03-06T01:30:00Z",
      "Practice 2": "2026-03-06T05:00:00Z",
      "Practice 3": "2026-03-07T01:30:00Z",
      "Qualifying": "2026-03-07T05:00:00Z",
      "Race": "2026-03-08T04:00:00Z"
    },
    results2025: {
      "Pole": "Lando Norris",
      "Fastest Lap": "Lando Norris — 1:22.167",
      "Pódio": "Lando Norris / Max Verstappen / George Russell",
      "Weather": "Ensolarado, pista seca",
      "Race Time": "1:42:06.304"
    }
  },
  {
    slug: "china",
    name: "China",
    country: "China",
    image: "assets/races/china.jpg",
    date: "2026-03-15T07:00:00Z",
    sessions: {
      "Practice 1": "2026-03-13T03:30:00Z",
      "Sprint Qualifying": "2026-03-13T07:30:00Z",
      "Sprint Race": "2026-03-14T03:00:00Z",
      "Qualifying": "2026-03-14T07:00:00Z",
      "Race": "2026-03-15T07:00:00Z"
    },
    results2025: {
      "Pole": "Oscar Piastri",
      "Sprint Pole": "Lewis Hamilton",
      "Sprint Winner": "Lewis Hamilton",
      "Fastest Lap": "Lando Norris — 1:35.454",
      "Pódio": "Oscar Piastri / Lando Norris / George Russell",
      "Weather": "Céu limpo, pista seca",
      "Race Time": "—"
    }
  },
  {
    slug: "japan",
    name: "Japão",
    country: "Japão",
    image: "assets/races/japan.jpg",
    date: "2026-03-29T06:00:00Z",
    sessions: {
      "Practice 1": "2026-03-27T02:30:00Z",
      "Practice 2": "2026-03-27T06:00:00Z",
      "Practice 3": "2026-03-28T02:30:00Z",
      "Qualifying": "2026-03-28T06:00:00Z",
      "Race": "2026-03-29T06:00:00Z"
    },
    results2025: {
      "Pole": "Max Verstappen",
      "Fastest Lap": "Kimi Antonelli — 1:30.965",
      "Pódio": "Max Verstappen / Lando Norris / Oscar Piastri",
      "Weather": "Parcialmente nublado, pista seca",
      "Race Time": "—"
    }
  },
  {
    slug: "bahrain",
    name: "Bahrein",
    country: "Bahrein",
    image: "assets/races/bahrain.jpg",
    date: "2026-04-12T16:00:00Z",
    sessions: {
      "Practice 1": "2026-04-10T12:30:00Z",
      "Practice 2": "2026-04-10T16:00:00Z",
      "Practice 3": "2026-04-11T13:30:00Z",
      "Qualifying": "2026-04-11T17:00:00Z",
      "Race": "2026-04-12T16:00:00Z"
    },
    results2025: {
      "Pole": "Oscar Piastri",
      "Fastest Lap": "Oscar Piastri — 1:35.140",
      "Pódio": "Oscar Piastri / George Russell / Lando Norris",
      "Weather": "Noite limpa, pista seca",
      "Race Time": "—"
    }
  }
];

// Exportar para uso em main.js
export default calendar2026;
