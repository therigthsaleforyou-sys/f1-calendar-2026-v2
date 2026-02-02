// Dados base – estrutura estável para homepage
// Horários mantidos como strings (sem conversões)

const calendar2026 = [
  {
    id: "australia",
    name: "Grande Prémio da Austrália",
    image: "assets/races/australia.jpg",
    sessions: {
      fp1: "06 Mar 01:30",
      fp2: "06 Mar 05:00",
      fp3: "07 Mar 01:30",
      qualifying: "07 Mar 05:00",
      race: "08 Mar 04:00"
    }
  },
  {
    id: "china",
    name: "Grande Prémio da China",
    image: "assets/races/china.jpg",
    sessions: {
      fp1: "13 Mar 04:30",
      fp2: "13 Mar 08:00",
      fp3: "14 Mar 04:30",
      qualifying: "14 Mar 08:00",
      race: "15 Mar 07:00"
    }
  },
  {
    id: "japan",
    name: "Grande Prémio do Japão",
    image: "assets/races/japan.jpg",
    sessions: {
      fp1: "27 Mar 03:30",
      fp2: "27 Mar 07:00",
      fp3: "28 Mar 03:30",
      qualifying: "28 Mar 07:00",
      race: "29 Mar 06:00"
    }
  }
];

window.calendar2026 = calendar2026;
