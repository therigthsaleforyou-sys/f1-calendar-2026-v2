document.addEventListener("DOMContentLoaded", () => {

  /* SCROLL TO TOP */
  const btn = document.getElementById("scrollTopBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* RACES DATA (TEMP) */
  const races = [
    {
      id: "australia",
      name: "Grande Prémio da Austrália",
      country: "Austrália",
      month: "Março",
      fp1: "2026-03-06T04:00:00",
      link: "race-australia.html"
    },
    {
      id: "china",
      name: "Grande Prémio da China",
      country: "China",
      month: "Março",
      fp1: "2026-03-13T04:00:00",
      link: "race-china.html"
    }
  ];

  /* HOME */
  const raceList = document.getElementById("race-list");
  const countdown = document.getElementById("countdown");
  const raceLink = document.getElementById("race-link");
  const nextRaceTitle = document.getElementById("next-race-name");

  if (raceList) {
    renderRaces(races);
  }

  function renderRaces(list) {
    raceList.innerHTML = "";
    list.forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${r.link}">${r.name}</a>`;
      raceList.appendChild(li);
    });
  }

  /* FILTERS */
  const monthFilter = document.getElementById("filter-month");
  const countryFilter = document.getElementById("filter-country");

  if (monthFilter && countryFilter) {
    function applyFilters() {
      const m = monthFilter.value;
      const c = countryFilter.value;

      const filtered = races.filter(r =>
        (m === "all" || r.month === m) &&
        (c === "all" || r.country === c)
      );
      renderRaces(filtered);
    }

    monthFilter.addEventListener("change", applyFilters);
    countryFilter.addEventListener("change", applyFilters);
  }

  /* NEXT RACE */
  if (countdown && raceLink) {
    const next = races[1]; // China
    raceLink.href = next.link;
    if (nextRaceTitle) nextRaceTitle.textContent = next.name;

    setInterval(() => {
      const diff = new Date(next.fp1) - new Date();
      if (diff <= 0) {
        countdown.textContent = "Já começou";
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff / 3600000) % 24;
      const m = Math.floor(diff / 60000) % 60;
      const s = Math.floor(diff / 1000) % 60;
      countdown.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
  }

  /* INTERNAL COUNTDOWN */
  const internal = document.getElementById("internal-countdown");
  const raceId = document.documentElement.dataset.raceId;
  if (internal && raceId) {
    const race = races.find(r => r.id === raceId);
    if (race) {
      setInterval(() => {
        const diff = new Date(race.fp1) - new Date();
        if (diff <= 0) {
          internal.textContent = "Já começou";
          return;
        }
        const d = Math.floor(diff / 86400000);
        const h = Math.floor(diff / 3600000) % 24;
        const m = Math.floor(diff / 60000) % 60;
        const s = Math.floor(diff / 1000) % 60;
        internal.textContent = `${d}d ${h}h ${m}m ${s}s`;
      }, 1000);
    }
  }

});
