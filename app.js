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
const races2026 = [
  {
    slug: "australia",
    name: "Grande Prémio da Austrália",
    circuit: "Albert Park",
    date: "2026-03-08T05:00:00Z"
  },
  {
    slug: "bahrain",
    name: "Grande Prémio do Bahrain",
    circuit: "Sakhir",
    date: "2026-03-15T15:00:00Z"
  }
];

const listContainer = document.createElement("section");
listContainer.innerHTML = "<h2>Calendário 2026</h2>";

races2026.forEach(race => {
  const link = document.createElement("a");
  link.href = `race.html?race=${race.slug}`;
  link.innerHTML = `
    <div style="padding:10px; border-bottom:1px solid #ddd">
      <strong>${race.name}</strong><br/>
      ${race.circuit}
    </div>
  `;
  link.style.textDecoration = "none";
  link.style.color = "inherit";

  listContainer.appendChild(link);
  document.body.appendChild(listContainer);
});


