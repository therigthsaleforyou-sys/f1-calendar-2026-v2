/*************************
 * PRÓXIMA CORRIDA
 *************************/

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

if (nextRaceEl) {
  nextRaceEl.innerHTML = `
    <h3>${nextRace.name}</h3>
    <p><strong>Circuit:</strong> ${nextRace.circuit}</p>
    <p><strong>Data:</strong> ${formatDate(nextRace.date)}</p>
  `;
}

/*************************
 * CALENDÁRIO 2026
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

const calendarSection = document.createElement("section");
calendarSection.innerHTML = "<h2>Calendário 2026</h2>";

races2026.forEach(race => {
  const link = document.createElement("a");
  link.href = `race.html?race=${race.slug}`;
  link.style.textDecoration = "none";
  link.style.color = "inherit";

  link.innerHTML = `
    <div style="padding:12px; border-bottom:1px solid #ccc">
      <strong>${race.name}</strong><br/>
      <small>${race.circuit} — ${formatDate(race.date)}</small>
    </div>
  `;

  calendarSection.appendChild(link);
});

document.body.appendChild(calendarSection);

/*************************
 * PÁGINA race.html
 *************************/

const params = new URLSearchParams(window.location.search);
const raceSlug = params.get("race");

if (raceSlug) {
  const race = races2026.find(r => r.slug === raceSlug);

  const raceTitle = document.getElementById("race-title");
  const raceContent = document.getElementById("race-content");

  if (race && raceContent && raceTitle) {
    raceTitle.textContent = race.name;

    raceContent.innerHTML = `
      <p><strong>Circuit:</strong> ${race.circuit}</p>
      <p><strong>Data:</strong> ${formatDate(race.date)}</p>

      <p style="margin-top:20px;">
        🔧 Mais dados da corrida serão adicionados aqui.
      </p>
    `;
  }
} 
