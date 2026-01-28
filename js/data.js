// ===============================
// F1 CALENDAR 2026 — DATA OFICIAL
// Fonte: formula1.com
// ===============================

// ===============================
// EQUIPAS & PILOTOS 2026
// ===============================

const TEAMS_2026 = [
  {
    id: "redbull",
    name: "Red Bull Racing",
    logo: "assets/teams/redbull.png",
    drivers: [
      { name: "Max Verstappen", number: 1 },
      { name: "Isack Hadjar", number: 6 }
    ]
  },
  {
    id: "ferrari",
    name: "Ferrari",
    logo: "assets/teams/ferrari.png",
    drivers: [
      { name: "Charles Leclerc", number: 16 },
      { name: "Lewis Hamilton", number: 44 }
    ]
  },
  {
    id: "mclaren",
    name: "McLaren",
    logo: "assets/teams/mclaren.png",
    drivers: [
      { name: "Lando Norris", number: 4 },
      { name: "Oscar Piastri", number: 81 }
    ]
  },
  {
    id: "mercedes",
    name: "Mercedes",
    logo: "assets/teams/mercedes.png",
    drivers: [
      { name: "George Russell", number: 63 },
      { name: "Kimi Antonelli", number: 12 }
    ]
  },
  {
    id: "astonmartin",
    name: "Aston Martin",
    logo: "assets/teams/astonmartin.png",
    drivers: [
      { name: "Fernando Alonso", number: 14 },
      { name: "Lance Stroll", number: 18 }
    ]
  },
  {
    id: "alpine",
    name: "Alpine",
    logo: "assets/teams/alpine.png",
    drivers: [
      { name: "Pierre Gasly", number: 10 },
      { name: "Franco Colapinto", number: 43 }
    ]
  },
  {
    id: "haas",
    name: "Haas",
    logo: "assets/teams/haas.png",
    drivers: [
      { name: "Esteban Ocon", number: 31 },
      { name: "Oliver Bearman", number: 87 }
    ]
  },
  {
    id: "williams",
    name: "Williams",
    logo: "assets/teams/williams.png",
    drivers: [
      { name: "Alexander Albon", number: 23 },
      { name: "Carlos Sainz", number: 55 }
    ]
  },
  {
    id: "audi",
    name: "Audi",
    logo: "assets/teams/audi.png",
    drivers: [
      { name: "Nico Hülkenberg", number: 27 },
      { name: "Gabriel Bortoleto", number: 5 }
    ]
  },
  {
    id: "cadillac",
    name: "Cadillac",
    logo: "assets/teams/cadillac.png",
    drivers: [
      { name: "Valtteri Bottas", number: 77 },
      { name: "Sergio Pérez", number: 11 }
    ]
  },
  {
    id: "racingbulls",
    name: "Racing Bulls",
    logo: "assets/teams/racingbulls.png",
    drivers: [
      { name: "Liam Lawson", number: 30 },
      { name: "Arvid Lindblad", number: 40 }
    ]
  }
];

// ===============================
// CALENDÁRIO 2026 (início)
// ===============================

const RACES_2026 = [
  {
    id: "australia",
    name: "Grande Prémio da Austrália",
    country: "Austrália",
    sprint: false,
    sessions: {
      fp1: "2026-03-06T01:30:00Z",
      fp2: "2026-03-06T05:00:00Z",
      fp3: "2026-03-07T01:30:00Z",
      quali: "2026-03-07T05:00:00Z",
      race: "2026-03-08T03:00:00Z"
    }
  },
  {
    id: "china",
    name: "Grande Prémio da China",
    country: "China",
    sprint: true,
    sessions: {
      fp1: "2026-03-13T03:30:00Z",
      sprintQuali: "2026-03-13T07:30:00Z",
      sprint: "2026-03-14T03:00:00Z",
      quali: "2026-03-14T07:00:00Z",
      race: "2026-03-15T07:00:00Z"
    }
  }
];
