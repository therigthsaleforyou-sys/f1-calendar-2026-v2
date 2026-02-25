document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(calendar2026)) return;

  const hero = document.getElementById("hero");
  const heroImg = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.querySelector(".countdown");
  const cardsWrapper = document.getElementById("race-cards");

  const now = new Date();

  // --- PRÓXIMA CORRIDA ---
  const upcomingRaces = calendar2026
    .map(r => ({ ...r, dateObj: new Date(r.date) }))
    .filter(r => r.dateObj > now)
    .sort((a, b) => a.dateObj - b.dateObj);

  if (!upcomingRaces.length) return;

  const nextRace = upcomingRaces[0];

  // --- HERO ---
  heroImg.src = nextRace.hero || "assets/heroes/australia_v2.jpg";
  heroTitle.textContent = nextRace.name;

  hero.onclick = () => {
    const card = document.getElementById(`race-${nextRace.round}`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("open");
    }
  };

  // --- COUNTDOWN FUNÇÃO ---
  function startCountdown(targetDate, element) {
    function update() {
      const diff = targetDate - new Date();

      if (diff <= 0) {
        element.textContent = "🏁 AGORA 🏁";
        return;
      }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);

      element.textContent = `🏁 ${d}d ${h}h ${m}m ${s}s 🏁`;
    }

    update();
    setInterval(update, 1000);
  }

  startCountdown(new Date(nextRace.date), heroCountdown);

  // --- CARDS ---
  cardsWrapper.innerHTML = "";

  calendar2026.forEach(race => {
    const dateObj = new Date(race.date);

    const card = document.createElement("div");
    card.className = "race-card";
    card.id = `race-${race.round}`;

    card.innerHTML = `
      <div class="race-header">
        <img src="${race.image}" alt="${race.name}">
        <h3>${race.name}</h3>
        <div class="card-countdown"></div>
      </div>
      <div class="race-details">
        <p><strong>Data:</strong> ${dateObj.toLocaleDateString("pt-PT")}</p>
        <p><strong>Local:</strong> ${race.location}</p>
      </div>
    `;

    const countdownEl = card.querySelector(".card-countdown");

    if (dateObj > now) {
      startCountdown(dateObj, countdownEl);
    } else {
      countdownEl.textContent = "🏁 TERMINADA 🏁";
    }

    card.querySelector(".race-header").onclick = () => {
      card.classList.toggle("open");
    };

    cardsWrapper.appendChild(card);
  });
});
