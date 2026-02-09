document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const pilotsTable = document.getElementById("pilots-standings");
  const constructorsTable = document.getElementById("constructors-standings");

  // ===== Campeonato de Pilotos =====
  const pilotPoints = {};
  calendar2026.forEach(race => {
    const podium = race.results2026?.podium || [];
    podium.forEach((driver, index) => {
      if (!pilotPoints[driver]) pilotPoints[driver] = { points:0, team: race.results2026?.teams?.[driver] || "—" };
      const points = [25,18,15][index] || 0;
      pilotPoints[driver].points += points;
    });
  });

  const sortedPilots = Object.entries(pilotPoints).sort((a,b) => b[1].points - a[1].points);

  sortedPilots.forEach(([driver, data], i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${i+1}</td><td>${driver}</td><td>${data.team}</td><td>${data.points}</td>`;
    pilotsTable.appendChild(tr);
  });

  // ===== Campeonato de Construtores =====
  const constructorPoints = {};
  calendar2026.forEach(race => {
    const podium = race.results2026?.podium || [];
    podium.forEach((driver, index) => {
      const team = race.results2026?.teams?.[driver];
      if (!team) return;
      if (!constructorPoints[team]) constructorPoints[team] = 0;
      const points = [25,18,15][index] || 0;
      constructorPoints[team] += points;
    });
  });

  const sortedConstructors = Object.entries(constructorPoints).sort((a,b) => b[1]-a[1]);

  sortedConstructors.forEach(([team, points], i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${i+1}</td><td>${team}</td><td>${points}</td>`;
    constructorsTable.appendChild(tr);
  });

  // ===== Back to Top =====
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top:0, behavior:"smooth" });
  });
});
