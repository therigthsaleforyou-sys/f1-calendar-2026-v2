function revealOnScroll() {
  document.querySelectorAll("li").forEach(li => {
    const rect = li.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      li.classList.add("visible");
    }
  });
}

function getNextRace() {
  const now = new Date();
  return races.find(r => new Date(r.date) > now);
}

function startCountdown(targetDate, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function update() {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) {
      el.textContent = "Já começou";
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;

    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }

  update();
  setInterval(update, 1000);
}

document.addEventListener("DOMContentLoaded", () => {

  const next = getNextRace();
  if (next) {
    document.getElementById("next-race-name")?.textContent = next.name;
    startCountdown(next.date, "countdown");
  }

  const list = document.getElementById("race-list");
  if (list) {
    function render(month = "", country = "") {
      list.innerHTML = "";
      races
        .filter(r =>
          (!month || r.month === month) &&
          (!country || r.country === country)
        )
        .forEach(r => {
          const li = document.createElement("li");
          li.innerHTML = `<a href="race-${r.id}.html">${r.name}</a>`;
          list.appendChild(li);
        });

      revealOnScroll();
    }

    render();

    document.getElementById("filter-month")?.addEventListener("change", e =>
      render(e.target.value, document.getElementById("filter-country").value)
    );

    document.getElementById("filter-country")?.addEventListener("change", e =>
      render(document.getElementById("filter-month").value, e.target.value)
    );

    window.addEventListener("scroll", revealOnScroll);
  }
});
