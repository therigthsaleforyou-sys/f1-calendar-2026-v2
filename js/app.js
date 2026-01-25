document.addEventListener("DOMContentLoaded", () => {
  if (!window.races || races.length === 0) {
    console.error("Races não carregadas");
    return;
  }

  const now = new Date();
  const nextRace = races.find(r => new Date(r.raceDate) > now);
  if (!nextRace) return;

  function startCountdown(id, date) {
    const el = document.getElementById(id);
    if (!el) return;

    function update() {
      const diff = new Date(date) - new Date();
      if (diff <= 0) {
        el.textContent = "Já começou!";
        return;
      }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);

      el.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }

    update();
    setInterval(update, 1000);
  }

  startCountdown("home-countdown", nextRace.raceDate);
  startCountdown("race-countdown", nextRace.raceDate);

  const list = document.getElementById("race-list");
  const monthFilter = document.getElementById("filter-month");
  const countryFilter = document.getElementById("filter-country");

  if (!list || !monthFilter || !countryFilter) return;

  function render() {
    list.innerHTML = "";

    races
      .filter(r => monthFilter.value === "all" || r.month === monthFilter.value)
      .filter(r => countryFilter.value === "all" || r.country === countryFilter.value)
      .forEach(r => {
        list.innerHTML += `
          <div class="race-card">
            <img src="${r.image}">
            <h3>${r.name}</h3>
            <p>${r.country} — ${r.month}</p>
            <a href="${r.page}" class="btn">Ver corrida</a>
          </div>
        `;
      });
  }

  monthFilter.addEventListener("change", render);
  countryFilter.addEventListener("change", render);

  render();
});
