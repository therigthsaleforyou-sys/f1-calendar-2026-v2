/* =====================================================
   F1 CALENDAR 2026 — DADOS OFICIAIS DE EQUIPAS E PILOTOS
   Fonte base: formula1.com (lista oficial de pilotos)
   Estrutura pensada para:
   - teams.html
   - pilots.html
   - constructors.html
   - resultados 2026
   - localStorage (persistência)
===================================================== */

const F1_TEAMS_2026 = [
  {
    id: "redbull",
    name: "Red Bull Racing",
    logo: "assets/teams/redbull.png",
    drivers: [
      { id: "verstappen", name: "Max Verstappen", number: 1 },
      { id: "hadjar", name: "Isack Hadjar", number: 6 }
    ]
  },
  {
    id: "ferrari",
    name: "Ferrari",
    logo: "assets/teams/ferrari.png",
    drivers: [
      { id: "leclerc", name: "Charles Leclerc", number: 16 },
      { id: "hamilton", name: "Lewis Hamilton", number: 44 }
    ]
  },
  {
    id: "mclaren",
    name: "McLaren",
    logo: "assets/teams/mclaren.png",
    drivers: [
      { id: "norris", name: "Lando Norris", number: 4 },
      { id: "piastri", name: "Oscar Piastri", number: 81 }
    ]
  },
  {
    id: "mercedes",
    name: "Mercedes",
    logo: "assets/teams/mercedes.png",
    drivers: [
      { id: "russell", name: "George Russell", number: 63 },
      { id: "antonelli", name: "Kimi Antonelli", number: 12 }
    ]
  },
  {
    id: "racingbulls",
    name: "Racing Bulls",
    logo: "assets/teams/racingbulls.png",
    drivers: [
      { id: "lawson", name: "Liam Lawson", number: 30 },
      { id: "lindblad", name: "Arvid Lindblad", number: 36 }
    ]
  },
  {
    id: "astonmartin",
    name: "Aston Martin",
    logo: "assets/teams/astonmartin.png",
    drivers: [
      { id: "alonso", name: "Fernando Alonso", number: 14 },
      { id: "stroll", name: "Lance Stroll", number: 18 }
    ]
  },
  {
    id: "audi",
    name: "Audi",
    logo: "assets/teams/audi.png",
    drivers: [
      { id: "hulkenberg", name: "Nico Hülkenberg", number: 27 },
      { id: "bortoleto", name: "Gabriel Bortoleto", number: 5 }
    ]
  },
  {
    id: "cadillac",
    name: "Cadillac",
    logo: "assets/teams/cadillac.png",
    drivers: [
      { id: "bottas", name: "Valtteri Bottas", number: 77 },
      { id: "perez", name: "Sergio Pérez", number: 11 }
    ]
  },
  {
    id: "williams",
    name: "Williams",
    logo: "assets/teams/williams.png",
    drivers: [
      { id: "sainz", name: "Carlos Sainz", number: 55 },
      { id: "albon", name: "Alexander Albon", number: 23 }
    ]
  },
  {
    id: "haas",
    name: "Haas",
    logo: "assets/teams/haas.png",
    drivers: [
      { id: "ocon", name: "Esteban Ocon", number: 31 },
      { id: "bearman", name: "Oliver Bearman", number: 38 }
    ]
  },
  {
    id: "alpine",
    name: "Alpine",
    logo: "assets/teams/alpine.png",
    drivers: [
      { id: "gasly", name: "Pierre Gasly", number: 10 },
      { id: "colapinto", name: "Franco Colapinto", number: 43 }
    ]
  }
];

/* =====================================================
   EXPORT GLOBAL
===================================================== */
window.F1_TEAMS_2026 = F1_TEAMS_2026;
