function getNextRace() {
  const now = new Date();
  return races.find(r => new Date(r.raceDate) > now);
}

function startCountdown(elementId, date) {
  const el = document.getElementById(elementId);
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

document.addEventListener("DOMContentLoaded", () => {
  if (!window.races || races.length === 0) return;

  const nextRace = getNextRace();
  if (!nextRace) return;

  startCountdown("home-countdown", nextRace.raceDate);
  startCountdown("race-countdown", nextRace.raceDate);

  const monthSelect = document.getElementById("filter-month");
  const countrySelect = document.getElementById("filter-country");
  const list = document.getElementById("race-list");

  if (!list) return;

  function renderRaces() {
    const month = monthSelect.value;
    const country = countrySelect.value;

    list.innerHTML = "";

    races
      .filter(r => month === "all" || r.month === month)
      .filter(r => country === "all" || r.country === country)
      .forEach(r => {
        list.innerHTML += `
          <div class="race-card">
            <img src="${r.image}">
            <div>
              <h4>${r.name}</h4>
              <p>${r.country} — ${r.month}</p>
              <a href="${r.page}" class="hero-btn">Ver corrida</a>
            </div>
          </div>
        `;
      });
  }

  monthSelect.addEventListener("change", renderRaces);
  countrySelect.addEventListener("change", renderRaces);

  renderRaces();
});
