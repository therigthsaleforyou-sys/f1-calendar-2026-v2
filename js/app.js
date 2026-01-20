const nextRaceEl = document.getElementById("next-race");

const nextRace = {
  name: "Grande Prémio da Austrália",
  circuit: "Albert Park",
  date: "2026-03-08T05:00:00Z"
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("pt-PT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  });
}

nextRaceEl.innerHTML = `
  <h3>${nextRace.name}</h3>
  <p><strong>Circuit:</strong> ${nextRace.circuit}</p>
  <p><strong>Data:</strong> ${formatDate(nextRace.date)}</p>
`;
