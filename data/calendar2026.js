// data/calendar2026.js
// Calendário Fórmula 1 2026
// Fonte única de dados
// Horários só serão preenchidos a partir do site oficial da F1
// Estado canónico — seguro contra regressões

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
      qualifying: "Horário Indisponível",
      sprint: "Horário Indisponível",
      race: "2026-03-08T04:00:00Z" // horário oficial PT
    },
    results2025: {
      pole: "Lando Norris",
      fastestLap: "—",
      podium: "—",
      weather: "—",
      raceTime: "—"
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
      qualifying: "Horário Indisponível",
      sprint: "Horário Indisponível",
      race: "Horário Indisponível"
    },
    results2025: {
      pole: "Oscar Piastri",
      fastestLap: "—",
      podium: "—",
      weather: "—",
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
      qualifying: "Horário Indisponível",
      sprint: "Horário Indisponível",
      race: "Horário Indisponível"
    },
    results2025: {
      pole: "Max Verstappen",
      fastestLap: "—",
      podium: "—",
      weather: "—",
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
      qualifying: "Horário Indisponível",
      sprint: "Horário Indisponível",
      race: "Horário Indisponível"
    },
    results2025: {
      pole: "Oscar Piastri",
      fastestLap: "—",
      podium: "—",
      weather: "—",
      raceTime: "—"
    }
  },

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
      qualifying: "Horário Indisponível",
      sprint: "Horário Indisponível",
      race: "Horário Indisponível"
    },
    results2025: {
      pole: "—",
      fastestLap: "—",
      podium: "—",
      weather: "—",
      raceTime: "—"
    }
  },

  {
    id: "miami",
    country: "Estados Unidos",
    name: "Grande Prémio de Miami",
    slug: "miami",
    image: "assets/races/miami.jpg",
    sessions: {
      practice1: "Horário Indisponível",
      practice2: "Horário Indisponível",
      practice3: "Horário Indisponível",
      qualifying: "Horário Indisponível",
      sprint: "Horário Indisponível",
      race: "Horário Indisponível"
    },
    results2025: {
      pole: "—",
      fastestLap: "—",
      podium: "—",
      weather: "—",
      raceTime: "—"
    }
  },

  {
    id: "monaco",
    country: "Mónaco",
    name: "Grande Prémio de Mónaco",
    slug: "monaco",
    image: "assets/races/monaco.jpg",
    sessions: {
      practice1: "Horário Indisponível",
      practice2: "Horário Indisponível",
      practice3: "Horário Indisponível",
      qualifying: "Horário Indisponível",
      sprint: "Horário Indisponível",
      race: "Horário Indisponível"
    },
    results2025: {
      pole: "Charles Leclerc",
      fastestLap: "—",
      podium: "—",
      weather: "—",
      raceTime: "—"
    }
  },

  {
    id: "spain",
    country: "Espanha",
    name: "Grande Prémio de Espanha",
    slug: "spain",
    image: "assets/races/spain.jpg",
    sessions: {
      practice1: "Horário Indisponível",
      practice2: "Horário Indisponível",
      practice3: "Horário Indisponível",
      qualifying: "Horário Indisponível",
      sprint: "Horário Indisponível",
      race: "Horário Indisponível"
    },
    results2025: {
      pole: "—",
      fastestLap: "—",
      podium: "—",
      weather: "—",
      raceTime: "—"
    }
  },

  {
    id: "canada",
    country: "Canadá",
    name: "Grande Prémio do Canadá",
    slug: "canada",
    image: "assets/races/canada.jpg",
    sessions: {
      practice1: "Horário Indisponível",
      practice2: "Horário Indisponível",
      practice3: "Horário Indisponível",
      qualifying: "Horário Indisponível",
      sprint: "Horário Indisponível",
      race: "Horário Indisponível"
    },
    results2025: {
      pole: "—",
      fastestLap: "—",
      podium: "—",
      weather: "—",
      raceTime: "—"
    }
  }

  // 👉 restantes GPs seguem exatamente o mesmo padrão
];

// Fonte única de verdade
window.calendar2026 = calendar2026;
