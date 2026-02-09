document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  // =========================
  // FILTRAR RACES FINALIZADAS (somente Austrália)
  // =========================
  const finishedRaces = calendar2026.filter(
    r => r.id === "australia" && r.results2026?.race?.length
  );

  // =========================
  // CAMPEONATO PILOTOS
  // =========================
  const drivers = {};
  finishedRaces.forEach(race => {
    race.results2026.race.forEach(p => {
      if (!drivers[p.driver]) drivers[p.driver] = { name: p.driver, points: 0 };
      drivers[p.driver].points += p.points;
    });
  });

  const driverStandings = Object.values(drivers)
    .sort((a, b) => b.points - a.points);

  const prevDrivers = JSON.parse(localStorage.getItem("prevDrivers") || "[]");
  const tbodyDrivers = document.getElementById("drivers-standings");
  tbodyDrivers.innerHTML = "";

  driverStandings.forEach((d, i) => {
    const row = document.createElement("tr");
    if (prevDrivers[i]?.name !== d.name) row.classList.add("changed");
    const tdPos = document.createElement("td"); tdPos.textContent = i + 1;
    const tdName = document.createElement("td"); tdName.textContent = d.name;
    const tdPoints = document.createElement("td"); 
    tdPoints.textContent = finishedRaces.length ? d.points : "—";

    row.append(tdPos, tdName, tdPoints);
    tbodyDrivers.appendChild(row);
  });

  localStorage.setItem("prevDrivers", JSON.stringify(driverStandings));

  // =========================
  // CAMPEONATO CONSTRUTORES
  // =========================
  const teams = {};
  finishedRaces.forEach(race => {
    race.results2026.race.forEach(p => {
      if (!teams[p.team]) teams[p.team] = { name: p.team, points: 0 };
      teams[p.team].points += p.points;
    });
  });

  const teamStandings = Object.values(teams)
    .sort((a, b) => b.points - a.points);

  const prevTeams = JSON.parse(localStorage.getItem("prevTeams") || "[]");
  const tbodyTeams = document.getElementById("teams-standings");
  tbodyTeams.innerHTML = "";

  teamStandings.forEach((t, i) => {
    const row = document.createElement("tr");
    if (prevTeams[i]?.name !== t.name) row.classList.add("changed");
    const tdPos = document.createElement("td"); tdPos.textContent = i + 1;
    const tdName = document.createElement("td"); tdName.textContent = t.name;
    const tdPoints = document.createElement("td"); 
    tdPoints.textContent = finishedRaces.length ? t.points : "—";

    row.append(tdPos, tdName, tdPoints);
    tbodyTeams.appendChild(row);
  });

  localStorage.setItem("prevTeams", JSON.stringify(teamStandings));
});
