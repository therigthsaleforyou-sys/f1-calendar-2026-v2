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

document.addEventListener("DOMContentLoaded", () => {
  if (!window.races) return;

  const nextRace = races[0];

  startCountdown("home-countdown", nextRace.raceDate);
  startCountdown("race-countdown", nextRace.raceDate);

  const monthSelect = document.getElementById("filter-month");
  const countrySelect = document.getElementById("filter-country");
  const list = document.getElementById("race-list");

  if (!list) return;

  function render() {
    const m = monthSelect.value;
    const c = countrySelect.value;

    list.innerHTML = "";

    races
      .filter(r => (m === "all" || r.month === m))
      .filter(r => (c === "all" || r.country === c))
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

  monthSelect?.addEventListener("change", render);
  countrySelect?.addEventListener("change", render);
  render();
});
