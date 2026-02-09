// js/main.js
// Homepage – versão estável com hero dinâmico + fichas clicáveis
document.addEventListener("DOMContentLoaded", () => {
  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const heroCountdown = document.getElementById("hero-countdown");
  const raceCards = document.getElementById("race-cards");
  const backToTop = document.getElementById("back-to-top");

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  /* =========================
     HERO – primeira corrida fixa Austrália
  ========================= */
  const now = new Date();
  let nextRace = calendar2026.find(r => new Date(r.sessions.race) > now);

  // Hero inicial Austrália
  const firstRace = calendar2026.find(r => r.id === "australia");
  if(firstRace){
    heroImage.src = firstRace.heroImage || firstRace.cardImage;
    heroTitle.textContent = firstRace.name;
  }

  function startCountdown(dateISO) {
    function update() {
      const now = new Date();
      const target = new Date(dateISO);
      const diff = target - now;

      if (diff <= 0) {
        heroCountdown.textContent = "🏁 Corrida terminada — ver resultados";

        // Mudar hero para o card da corrida ativa
        if(nextRace){
          heroImage.src = nextRace.heroImage || nextRace.cardImage;
          heroTitle.textContent = nextRace.name;
        }
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      heroCountdown.textContent = `🏁 ${d}d ${h}h ${m}m ${s}s 🏁`;
    }

    update();
    setInterval(update, 1000);
  }

  if(nextRace){
    startCountdown(nextRace.sessions.race);
  }

  /* =========================
     FICHAS DAS CORRIDAS
  ========================= */
  raceCards.innerHTML = "";

  calendar2026.forEach(race => {
    const isFavorite = favorites.includes(race.id);

    const card = document.createElement("div");
    card.className = "race-card";
    card.dataset.id = race.id;
    if (isFavorite) card.classList.add("favorite");

    card.innerHTML = `
      <img class="race-image" src="${race.cardImage}" alt="${race.name}">
      <div class="race-header">
        <h3>${race.name}</h3>
        <button class="fav-btn ${isFavorite ? "active" : ""}" data-id="${race.id}">🏁</button>
      </div>
      <div class="race-details hidden">
        <p><strong>FP1:</strong> ${race.sessions.fp1}</p>
        <p><strong>FP2:</strong> ${race.sessions.fp2}</p>
        <p><strong>FP3:</strong> ${race.sessions.fp3}</p>
        <p><strong>Qualificação:</strong> ${race.sessions.qualifying}</p>
        <p><strong>Corrida:</strong> ${race.sessions.race}</p>
        <div class="race-link-wrapper">
          <a class="race-link-btn" href="race/${race.id}.html">
            Conheça o GP F1 da ${race.name.replace("Grande Prémio da ", "")}
          </a>
        </div>
      </div>
    `;

    raceCards.appendChild(card);

    // 📸 Cards – abrir/fechar suave
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");
    if(details.classList.contains("hidden")) details.style.maxHeight = "0";

    img.addEventListener("click", () => {
      const isOpen = !details.classList.contains("hidden");
      if(isOpen){
        details.style.maxHeight = "0";
        setTimeout(() => details.classList.add("hidden"), 300);
      } else {
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
    });
  });

  /* =========================
     FAVORITOS
  ========================= */
  raceCards.addEventListener("click", e => {
    if (e.target.classList.contains("fav-btn")) {
      const id = e.target.dataset.id;
      const card = e.target.closest(".race-card");

      if (favorites.includes(id)) {
        favorites.splice(favorites.indexOf(id), 1);
        e.target.classList.remove("active");
        card.classList.remove("favorite");
      } else {
        favorites.push(id);
        e.target.classList.add("active");
        card.classList.add("favorite");
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  });

  /* =========================
     HERO CLICK – vai para corrida ativa
  ========================= */
  heroImage.addEventListener("click", () => {
    if(!nextRace) return;
    const card = document.querySelector(`.race-card[data-id="${nextRace.id}"]`);
    if(card){
      card.scrollIntoView({behavior: "smooth", block: "start"});
      const details = card.querySelector(".race-details");
      if(details){
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
    }
  });

  /* =========================
     BACK TO TOP
  ========================= */
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
