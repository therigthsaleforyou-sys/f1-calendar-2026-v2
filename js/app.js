document.addEventListener("DOMContentLoaded", () => {

  if (typeof races === "undefined") return;

  const now = new Date();

  // ==========================
  // DETETAR PÁGINA DE CORRIDA
  // ==========================
  const racePage = document.querySelector("[data-race-id]");
  let currentRace = null;

  if (racePage) {
    const raceId = racePage.dataset.raceId;
    currentRace = races.find(r => r.id === raceId);
  }

  // ==========================
  // COUNTDOWN (HOME OU RACE)
  // ==========================
  const countdownEl =
    document.getElementById("countdown") ||
    document.getElementById("race-countdown");

  const raceToCount = currentRace
    ? { ...currentRace, date: new Date(currentRace.raceDate) }
    : races.map(r => ({ ...r, date: new Date(r.raceDate) }))
        .find(r => r.date > now);

  if (countdownEl && raceToCount) {
    setInterval(() => {
      const diff = raceToCount.date - new Date();

      if (diff <= 0) return;

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
  }

  // ==========================
  // LINK HOME → CORRIDA
  // ==========================
  const raceLink = document.getElementById("race-link");
  if (raceLink && raceToCount) {
    raceLink.href = raceToCount.page;
  }

  // ==========================
  // FILTROS (HOME)
  // ==========================
  const monthFilter = document.getElementById("filter-month");
  const countryFilter = document.getElementById("filter-country");
  const raceList = document.getElementById("race-list");

  function renderRaces(list) {
    if (!raceList) return;
    raceList.innerHTML = "";
    list.forEach(race => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${race.page}">${race.name}</a>`;
      raceList.appendChild(li);
    });
  }

  if (raceList) {
    renderRaces(races);

    function applyFilters() {
      let filtered = races;

      if (monthFilter.value !== "all") {
        filtered = filtered.filter(r => r.month === monthFilter.value);
      }

      if (countryFilter.value !== "all") {
        filtered = filtered.filter(r => r.country === countryFilter.value);
      }

      renderRaces(filtered);
    }

    monthFilter.addEventListener("change", applyFilters);
    countryFilter.addEventListener("change", applyFilters);
  }

});
