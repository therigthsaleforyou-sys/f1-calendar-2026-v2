document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não encontrado");
    return;
  }

  const now = new Date();
  const nextRace =
    calendar2026.find(r => new Date(r.sessions.race) > now) ||
    calendar2026[0];

  renderHero(nextRace);
  renderCards(calendar2026);
  initBackToTop();
  markActiveHeader();
});

/* ================= HERO ================= */
function renderHero(race) {
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");
  const heroImage = document.getElementById("hero-image");

  if (!heroTitle || !heroCountdown || !heroImage) return;

  heroTitle.textContent = race.name;
  heroImage.src = race.image; // 🔹 corrige caminho das imagens
  heroImage.alt = race.name;

  startCountdown(race.sessions.race, heroCountdown);
}

/* ================= COUNTDOWN ================= */
function startCountdown(dateISO, el) {
  if (!dateISO || !el) { el.textContent = "—"; return; }
  function update() {
    const diff = new Date(dateISO).getTime() - Date.now();
    if (diff <= 0) { el.textContent = "Hoje"; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }
  update();
  setInterval(update, 1000);
}

/* ================= CARDS ================= */
function renderCards(calendar) {
  const container = document.getElementById("race-cards");
  if (!container) return;

  container.innerHTML = "";
  const storedFavs = JSON.parse(localStorage.getItem("favs") || "[]");

  calendar.forEach(race => {
    const card = document.createElement("article");
    card.className = "race-card";

    const isFav = storedFavs.includes(race.id);
    if(isFav) card.classList.add("fav");

    card.innerHTML = `
      <div class="race-header">
        <h3 class="race-title">${race.name}</h3>
        <button class="fav-btn" title="Favorito">🏁</button>
      </div>
      <button class="details-toggle">Ver detalhes</button>
      <div class="race-details hidden">
        <strong>Sessões</strong><br>
        Practice 1: ${fmt(race.sessions.practice1)}<br>
        Practice 2: ${fmt(race.sessions.practice2)}<br>
        Practice 3: ${fmt(race.sessions.practice3)}<br>
        Qualifying: ${fmt(race.sessions.qualifying)}<br>
        Sprint: ${fmt(race.sessions.sprint)}<br>
        Race: ${fmt(race.sessions.race)}<br><br>
        <strong>Resultados 2025</strong><br>
        Pole: ${race.results2025?.pole || "—"}<br>
        Fastest Lap: ${race.results2025?.fastestLap || "—"}<br>
        Podium: ${race.results2025?.podium || "—"}<br>
        Weather: ${race.results2025?.weather || "—"}<br>
        Race Time: ${race.results2025?.raceTime || "—"}
      </div>
    `;

    /* ===== DROPDOWN ===== */
    const toggleBtn = card.querySelector(".details-toggle");
    const details = card.querySelector(".race-details");
    toggleBtn.onclick = () => {
      details.classList.toggle("hidden");
      toggleBtn.textContent = details.classList.contains("hidden")
        ? "Ver detalhes"
        : "Fechar";
    };

    /* ===== FAVORITO ===== */
    const favBtn = card.querySelector(".fav-btn");
    favBtn.style.color = isFav ? "#ffd700" : "";
    favBtn.onclick = () => {
      let favs = JSON.parse(localStorage.getItem("favs") || "[]");
      if(favs.includes(race.id)) {
        favs = favs.filter(id => id !== race.id);
        card.classList.remove("fav");
        favBtn.style.color = "";
      } else {
        favs.push(race.id);
        card.classList.add("fav");
        favBtn.style.color = "#ffd700";
      }
      localStorage.setItem("favs", JSON.stringify(favs));
    };

    container.appendChild(card);
  });
}

/* ================= HELPERS ================= */
function fmt(dateISO) {
  if (!dateISO) return "—";
  const d = new Date(dateISO);
  return d.toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/* ================= BACK TO TOP ================= */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  btn.onclick = () => window.scrollTo({top:0,behavior:"smooth"});
}

/* ================= BOTÃO ATIVO NO HEADER ================= */
function markActiveHeader() {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(a => {
    if(path.includes(a.getAttribute('href'))) a.classList.add('active');
    else a.classList.remove('active');
  });
}
