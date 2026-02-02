// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(calendar2026)) return;

  renderHero();
  renderCards();
  initBackToTop();
  markActiveHeader();
});

function renderHero() {
  const now = new Date();
  const next = calendar2026.find(r => new Date(r.sessions.race) > now) || calendar2026[0];
  document.getElementById("hero-title").textContent = next.name;
  const heroImage = document.getElementById("hero-image");
  heroImage.src = next.image;
  heroImage.alt = next.name;
  startCountdown(next.sessions.race, document.getElementById("hero-countdown"));
}

function startCountdown(dateISO, el) {
  if (!dateISO) return;
  function update() {
    const diff = new Date(dateISO) - Date.now();
    if (diff <= 0) return void (el.textContent = "Hoje");
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }
  update();
  setInterval(update, 1000);
}

function renderCards() {
  const container = document.getElementById("race-cards");
  if (!container) return;
  container.innerHTML = "";
  const stored = JSON.parse(localStorage.getItem("favs") || "[]");

  calendar2026.forEach(r => {
    const card = document.createElement("article");
    card.className = "race-card";

    const fav = stored.includes(r.id);

    card.innerHTML = `
      <div class="race-header">
        <h3 class="race-title">${r.name}</h3>
        <button class="fav-btn" title="Favorito">🏁</button>
      </div>
      <button class="details-toggle">Ver detalhes</button>
      <div class="race-details hidden"></div>
    `;

    const details = card.querySelector(".race-details");
    details.innerHTML = `
      <strong>Sessões</strong><br>
      Practice 1: ${fmt(r.sessions.practice1)}<br>
      Practice 2: ${fmt(r.sessions.practice2)}<br>
      Practice 3: ${fmt(r.sessions.practice3)}<br>
      Qualifying: ${fmt(r.sessions.qualifying)}<br>
      Sprint: ${fmt(r.sessions.sprint)}<br>
      Race: ${fmt(r.sessions.race)}<br>
    `;

    card.querySelector(".details-toggle").onclick = () => {
      details.classList.toggle("hidden");
    };

    const favBtn = card.querySelector(".fav-btn");
    favBtn.style.color = fav ? "#ffd700" : "";
    favBtn.onclick = () => toggleFav(r.id, card, favBtn);

    container.appendChild(card);
  });
}

function toggleFav(id, card, btn) {
  let favs = JSON.parse(localStorage.getItem("favs") || "[]");
  if (favs.includes(id)) favs = favs.filter(x => x !== id);
  else favs.push(id);
  localStorage.setItem("favs", JSON.stringify(favs));
  btn.style.color = favs.includes(id) ? "#ffd700" : "";
  card.classList.toggle("fav");
}

function fmt(dateISO) {
  if (!dateISO) return "—";
  return new Date(dateISO).toLocaleString("pt-PT", {
    day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit"
  });
}

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  btn.onclick = () => window.scrollTo({top:0, behavior:"smooth"});
}

function markActiveHeader() {
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle("active", location.pathname.includes(a.getAttribute("href")));
  });
}
