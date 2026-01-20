/*************************
 * ELEMENTOS BASE
 *************************/
const nextRaceEl = document.getElementById("next-race");
const calendarEl = document.getElementById("calendar");

/*************************
 * DADOS
 *************************/
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

/*************************
 * FUNÇÕES
 *************************/
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("pt-PT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/*************************
 * PRÓXIMA CORRIDA
 *************************/
const nextRace = races2026[0];

nextRaceEl.innerHTML = `
  <h3>${nextRace.name}</h3>
  <p><strong>Circuit:</strong> ${nextRace.circuit}</p>
  <p><strong>Data:</strong> ${formatDate(nextRace.date)}</p>
`;

/*************************
 * CALENDÁRIO 2026
 *************************/
calendarEl.innerHTML = "<h2>Calendário 2026</h2>";

races2026.forEach(race => {
  const link = document.createElement("a");
  link.href = `race.html?race=${race.slug}`;
  link.style.display = "block";
  link.style.padding = "10px";
  link.style.borderBottom = "1px solid #ccc";
  link.style.textDecoration = "none";
  link.style.color = "inherit";

  link.innerHTML = `
    <strong>${race.name}</strong><br/>
    <small>${race.circuit} — ${formatDate(race.date)}</small>
  `;

  calendarEl.appendChild(link);
});
