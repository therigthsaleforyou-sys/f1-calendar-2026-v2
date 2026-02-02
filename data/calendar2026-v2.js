// Dados base – estrutura estável para homepage
// Datas em formato ISO para funcionamento correto do countdown

const calendar2026 = [
  {
    id: "australia",
    name: "Grande Prémio da Austrália",
    image: "assets/races/australia.jpg",
    sessions: {
      fp1: "2026-03-06T01:30:00Z",
      fp2: "2026-03-06T05:00:00Z",
      fp3: "2026-03-07T01:30:00Z",
      qualifying: "2026-03-07T05:00:00Z",
      race: "2026-03-08T04:00:00Z"
    }
  },
  {
    id: "china",
    name: "Grande Prémio da China",
    image: "assets/races/china.jpg",
    sessions: {
      fp1: "2026-03-13T04:30:00Z",
      fp2: "2026-03-13T08:00:00Z",
      fp3: "2026-03-14T04:30:00Z",
      qualifying: "2026-03-14T08:00:00Z",
      race: "2026-03-15T07:00:00Z"
    }
  },
  {
    id: "japan",
    name: "Grande Prémio do Japão",
    image: "assets/races/japan.jpg",
    sessions: {
      fp1: "2026-03-27T03:30:00Z",
      fp2: "2026-03-27T07:00:00Z",
      fp3: "2026-03-28T03:30:00Z",
      qualifying: "2026-03-28T07:00:00Z",
      race: "2026-03-29T06:00:00Z"
    }
  }
];

window.calendar2026 = calendar2026;
