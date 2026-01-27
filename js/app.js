document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     DADOS DAS CORRIDAS
  ========================= */
  const races = [
    {
      id: "australia",
      name: "Grande Prémio da Austrália",
      date: "2026-03-08T05:00:00Z",
      link: "race-australia.html"
    },
    {
      id: "china",
      name: "Grande Prémio da China",
      date: "2026-03-15T07:00:00Z",
      link: "race-china.html"
    }
  ];

  races.sort((a, b) => new Date(a.date) - new Date(b.date));

  /* =========================
     PRÓXIMA CORRIDA
  ========================= */
  const now = new Date();
  const nextRace = races.find(r => new Date(r.date) > now);

  if (nextRace) {
    document.getElementById("next-race-name").textContent = nextRace.name;
    document.getElementById("next-race-link").href = nextRace.link;
    startCountdown("main-countdown", nextRace.date);
  }

  /* =========================
     LISTA DE CORRIDAS
  ========================= */
  const raceList = document.getElementById("race-list");
  if (raceList) {
    raceList.innerHTML = "";
    races.forEach(race => {
      const div = document.createElement("div");
      div.className = "race-card";
      div.dataset.race = race.id;
      div.innerHTML = `<a href="${race.link}">${race.name}</a>`;
      raceList.appendChild(div);
    });
  }

  /* =========================
     FILTROS HOME
  ========================= */
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      document.querySelectorAll(".race-card").forEach(card => {
        card.style.display =
          filter === "all" || card.dataset.race === filter
            ? "block"
            : "none";
      });
    });
  });

  /* =========================
     COUNTDOWN INTERNO CORRIDA
  ========================= */
  const racePage = document.querySelector("html[data-race-id]");
  if (racePage) {
    const raceId = racePage.dataset.raceId;
    const race = races.find(r => r.id === raceId);
    if (race) startCountdown("internal-countdown", race.date);
  }

  /* =========================
     BOTÃO VOLTAR AO TOPO
  ========================= */
  const btn = document.getElementById("scrollTopBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

});

/* =========================
   FUNÇÃO COUNTDOWN
========================= */
function startCountdown(elementId, date) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function update() {
    const now = new Date();
    const diff = new Date(date) - now;

    if (diff <= 0) {
      el.textContent = "A decorrer";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }

  update();
  setInterval(update, 1000);
}
