document.addEventListener("DOMContentLoaded", () => {

  /* -------- VOLTAR TOPO -------- */
  document.getElementById("backToTop").onclick = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  /* -------- PRÓXIMA CORRIDA E HERO -------- */
  const now = new Date();
  let nextRace = calendar2026.find(r => new Date(r.sessions.Race) > now);
  if (!nextRace) nextRace = calendar2026[0];

  const heroImg = document.getElementById("hero-img");
  heroImg.src = nextRace.image;

  const nextRaceName = document.getElementById("next-race-name");
  nextRaceName.textContent = nextRace.name;
  document.getElementById("next-race-link").href = "#" + nextRace.id;
  nextRaceName.onclick = () => {
    document.querySelector(`[data-race="${nextRace.id}"]`).scrollIntoView({behavior:"smooth"});
  }

  /* -------- COUNTDOWN FUNCIONAL -------- */
  const countdownEl = document.getElementById("countdown");
  function updateCountdown() {
    const now = new Date();
    const raceDate = new Date(nextRace.sessions.Race);
    const diff = raceDate - now;
    if (diff <= 0) {
      countdownEl.textContent = "🏁 Corrida em andamento!";
      return;
    }
    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff / (1000*60*60)) % 24);
    const m = Math.floor((diff / (1000*60)) % 60);
    countdownEl.textContent = `${d}d ${h}h ${m}m`;
  }
  updateCountdown();
  setInterval(updateCountdown, 60000);

  /* -------- RENDER FICHAS DAS CORRIDAS -------- */
  const racesContainer = document.getElementById("races");
  racesContainer.innerHTML = "";
  calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";
    card.setAttribute("data-race", race.id);

    // Dados 2025
    const result = results2025[race.id] || {};

    function formatDateTime(dtStr) {
      if (!dtStr) return "—";
      const dt = new Date(dtStr);
      const day = String(dt.getDate()).padStart(2,'0');
      const month = String(dt.getMonth()+1).padStart(2,'0');
      const year = dt.getFullYear();
      const hours = String(dt.getHours()).padStart(2,'0');
      const mins = String(dt.getMinutes()).padStart(2,'0');
      return `${day}/${month}/${year} ${hours}:${mins}`;
    }

    card.innerHTML = `
      <h3>${race.name} (${race.circuit})</h3>
      <img src="${race.image}" class="race-img" alt="${race.name}">
      <div class="race-body">
        <h4>Sessões 2026</h4>
        <p><strong>FP1:</strong> ${formatDateTime(race.sessions.FP1)}</p>
        <p><strong>FP2:</strong> ${formatDateTime(race.sessions.FP2)}</p>
        <p><strong>FP3:</strong> ${formatDateTime(race.sessions.FP3)}</p>
        <p><strong>Qualificação:</strong> ${formatDateTime(race.sessions.Qualifying)}</p>
        ${race.sessions.Sprint ? `<p><strong>Sprint:</strong> ${formatDateTime(race.sessions.Sprint)}</p>` : ""}
        <p><strong>Corrida:</strong> ${formatDateTime(race.sessions.Race)}</p>

        <h4>Histórico 2025</h4>
        <p><strong>Pole:</strong> ${result.pole || "—"} (${result.poleTime || "—"})</p>
        <p><strong>Melhor volta:</strong> ${result.fastestLap || "—"} (${result.fastestLapTime || "—"})</p>
        <p><strong>Pódio:</strong> ${result.podium || "—"}</p>
        <p><strong>Meteo:</strong> ${result.meteo || "—"}</p>
      </div>
    `;
    racesContainer.appendChild(card);
  });

  /* -------- DROPDOWN FUNCIONAL -------- */
  document.querySelectorAll(".race-card h3, .race-card img").forEach(el => {
    el.onclick = () => {
      const body = el.parentElement.querySelector(".race-body");
      body.style.display = body.style.display === "block" ? "none" : "block";
    };
  });

});

/* -------- SCROLL PARA SECÇÃO -------- */
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({behavior:"smooth"});
}
