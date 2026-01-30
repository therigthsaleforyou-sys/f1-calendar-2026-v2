/* =========================
   CALENDÁRIO F1 2026
========================= */

const calendar2026 = [
  {
    id: "australia",
    name: "Grande Prémio da Austrália",
    page: "race-australia.html",
    image: "assets/races/australia.jpg",
    raceDate: "2026-03-08T04:00:00Z",
    sessions: {
      fp1: "2026-03-06T02:30:00",
      fp2: "2026-03-06T06:00:00",
      fp3: "2026-03-07T02:30:00",
      qualifying: "2026-03-07T06:00:00",
      race: "2026-03-08T04:00:00"
    }
  },
  {
    id: "bahrain",
    name: "Grande Prémio do Bahrein",
    page: "race-bahrain.html",
    image: "assets/races/bahrain.jpg",
    raceDate: "2026-03-15T15:00:00Z",
    sessions: {
      fp1: "2026-03-13T12:30:00",
      fp2: "2026-03-13T16:00:00",
      fp3: "2026-03-14T13:00:00",
      qualifying: "2026-03-14T16:00:00",
      race: "2026-03-15T15:00:00"
    }
  },
  {
    id: "china",
    name: "Grande Prémio da China",
    page: "race-china.html",
    image: "assets/races/china.jpg",
    raceDate: "2026-03-22T07:00:00Z",
    sessions: {
      fp1: "2026-03-20T03:30:00",
      fp2: "2026-03-20T07:00:00",
      fp3: "2026-03-21T03:30:00",
      qualifying: "2026-03-21T07:00:00",
      race: "2026-03-22T07:00:00"
    }
  }
];

/* =========================
   PRÓXIMA CORRIDA (AUTO)
========================= */

const now = new Date();

const nextRace = calendar2026.find(race => {
  return new Date(race.raceDate) > now;
});

// fallback de segurança
const nextRaceDate = nextRace
  ? nextRace.raceDate
  : calendar2026[0].raceDate;
