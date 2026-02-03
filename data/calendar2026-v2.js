// data/calendar2026-v2.js
// Calendário Oficial F1 2026 – versão mínima para testes
// Estrutura compatível com js/main.js

window.calendar2026 = [
  {
    id: "australia",
    name: "Grande Prémio da Austrália",
    heroImage: "assets/races/australia_v2.jpg", // hero dinâmico
    cardImage: "assets/races/australia.jpg",     // ficha da corrida
    sessions: {
      fp1: "2026-03-06 01:30",
      fp2: "2026-03-06 05:00",
      fp3: "2026-03-07 01:30",
      qualifying: "2026-03-07 05:00",
      race: "2026-03-08 05:00"
    }
  },
  {
    id: "china",
    name: "Grande Prémio da China",
    heroImage: "assets/races/china.jpg",  // para hero, só depois da Austrália
    cardImage: "assets/races/china.jpg",
    sessions: {
      fp1: "2026-03-13 04:30",
      fp2: "2026-03-13 08:00",
      fp3: "2026-03-14 04:30",
      qualifying: "2026-03-14 08:00",
      race: "2026-03-15 07:00"
    }
  },
  {
    id: "japan",
    name: "Grande Prémio do Japão",
    heroImage: "assets/races/japan.jpg",
    cardImage: "assets/races/japan.jpg",
    sessions: {
      fp1: "2026-03-27 03:30",
      fp2: "2026-03-27 07:00",
      fp3: "2026-03-28 03:30",
      qualifying: "2026-03-28 07:00",
      race: "2026-03-29 06:00"
    }
  }
  // 👉 as restantes 21 corridas entram aqui depois, mantendo o mesmo formato
];
