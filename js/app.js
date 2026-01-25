document.addEventListener("DOMContentLoaded", () => {
  if (typeof races === "undefined") return;

  initCountdown();
  initInternalCountdown();
  initFilters();
  initScrollTopButton();
});

function initCountdown() {
  const countdownEl = document.getElementById("countdown");
  const raceLink = document.getElementById("race-link");
  if (!countdownEl) return;

  const now = new Date();
  const upcoming = races.filter(r => new Date(r.date) > now);
  const nextRace = upcoming.length ? upcoming[0] : races[races.length - 1];

  countdownEl.dataset.raceId = nextRace.id;

  if (raceLink) {
    raceLink.href = `race-${nextRace.id}.html`;
    raceLink.textContent = `Ver página da corrida →`;
  }

  updateCountdown(countdownEl, new Date(nextRace.date));
  setInterval(() => updateCountdown(countdownEl, new Date(nextRace.date)), 1000);
}

function initInternalCountdown() {
  const internalCountdown = document.getElementById("internal-countdown");
  const raceId = document.body.dataset.raceId;
  if (!internalCountdown || !raceId) return;

  const race = races.find(r => r.id === raceId);
  if (!race) return;

  updateCountdown(internalCountdown, new Date(race.date));
  setInterval(() => updateCountdown(internalCountdown, new Date(race.date)), 1000);
}

function updateCountdown(element, raceDate) {
  const now = new Date();
  const diff = raceDate - now;

  if (diff <= 0) {
    element.textContent = "Corrida em andamento ou terminada";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

/* =========================
   FILTROS
========================= */
function initFilters() {
  const monthFilter = document.getElementById("filter-month");
  const countryFilter = document.getElementById("filter-country");
  const raceList = document.getElementById("race-list");

  if (!raceList) return;

  renderRaces(races, raceList);

  if (monthFilter) monthFilter.addEventListener("change", () => applyFilters(raceList, monthFilter, countryFilter));
  if (countryFilter) countryFilter.addEventListener("change", () => applyFilters(raceList, monthFilter, countryFilter));
}

function applyFilters(container, monthSelect, countrySelect) {
  let filtered = [...races];

  if (monthSelect && monthSelect.value !== "all") {
    filtered = filtered.filter(r => {
      const raceMonth = new Date(r.date).toLocaleString("pt-PT", { month: "long" });
      return raceMonth === monthSelect.value;
    });
  }

  if (countrySelect && countrySelect.value !== "all") {
    filtered = filtered.filter(r => r.country === countrySelect.value);
  }

  renderRaces(filtered, container);
}

function renderRaces(list, container) {
  container.innerHTML = "";

  list.forEach(race => {
    const li = document.createElement("li");
    li.className = "race-card";
    li.innerHTML = `
      <img src="${race.image}" alt="${race.name}" class="race-img">
      <div class="race-info">
        <h3>${race.name}</h3>
        <p>${race.circuit} — ${race.country}</p>
        <p>${new Date(race.date).toLocaleString("pt-PT", { dateStyle: "medium", timeStyle: "short" })}</p>
        <a href="race-${race.id}.html" class="btn">Ver detalhes →</a>
      </div>
    `;
    container.appendChild(li);
  });
}

/* =========================
   SCROLL TOP
========================= */
function initScrollTopButton() {
  const btn = document.createElement("button");
  btn.textContent = "↑ Topo";
  btn.className = "scroll-top";
  btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  document.body.appendChild(btn);
}
