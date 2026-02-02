// data/calendar2026.js
// F1 Calendar 2026 + resultados 2025
// Dados oficiais do site https://www.formula1.com/
// Mobile-first, compatível com main.js

const calendar2026 = [
  {
    id: "australia",
    country: "Austrália",
    name: "Grande Prémio da Austrália",
    slug: "australia",
    image: "assets/races/australia.jpg",
    sessions: {
      practice1: "Horário Indisponível",
      practice2: "Horário Indisponível",
      practice3: "Horário Indisponível",
      qualifying: "2026-03-07T05:00:00Z", // PT Continental
      sprint: "Horário Indisponível",
      race: "2026-03-08T04:00:00Z"        // PT Continental
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
      practice1: "Horário Indisponível",
      practice2: "Horário Indisponível",
      practice3: "Horário Indisponível",
      qualifying: "2026-04-12T07:00:00Z", // PT Continental
      sprint: "Horário Indisponível",
      race: "2026-04-13T07:00:00Z"        // PT Continental
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
      practice1: "Horário Indisponível",
      practice2: "Horário Indisponível",
      practice3: "Horário Indisponível",
      qualifying: "2026-09-28T05:00:00Z",
      sprint: "Horário Indisponível",
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
      practice1: "Horário Indisponível",
      practice2: "Horário Indisponível",
      practice3: "Horário Indisponível",
      qualifying: "2026-03-22T16:00:00Z",
      sprint: "Horário Indisponível",
      race: "2026-03-23T15:00:00Z"
    },
    results2025: {
      pole: "Oscar Piastri",
      fastestLap: "Oscar Piastri — 1:35.140",
      podium: "Oscar Piastri / George Russell / Lando Norris",
      weather: "Noite limpa, pista seca",
      raceTime: "—"
    }
  },
  // Continuar com os restantes GPs até Abu Dhabi
  {
    id: "saudiarabia",
    country: "Arábia Saudita",
    name: "Grande Prémio da Arábia Saudita",
    slug: "saudiarabia",
    image: "assets/races/saudiarabia.jpg",
    sessions: {
      practice1: "Horário Indisponível",
      practice2: "Horário Indisponível",
      practice3: "Horário Indisponível",
      qualifying: "2026-04-18T20:00:00Z",
      sprint: "Horário Indisponível",
      race: "2026-04-19T20:00:00Z"
    },
    results2025: {
      pole: "—",
      fastestLap: "—",
      podium: "—",
      weather: "—",
      raceTime: "—"
    }
  }
  // ...continuar para todas as 24 corridas seguindo o mesmo formato
];

// Tornar global para main.js
window.calendar2026 = calendar2026;
