// js/noticias.js
document.addEventListener("DOMContentLoaded", () => {

  if (!window.calendar2026 || !Array.isArray(window.calendar2026)) {
    console.error("calendar2026 não carregado");
    return;
  }

  const raceCardsContainer = document.getElementById("race-cards");
  const heroImage = document.getElementById("hero-image");
  const heroTitle = document.getElementById("hero-title");
  const backToTop = document.getElementById("back-to-top");

  const now = new Date();

  // ================= HERO – próxima corrida =================
  let nextRace = calendar2026.find(r => new Date(r.sessions.race) > now) || calendar2026[0];

  heroImage.src = nextRace.heroImage;
  heroTitle.textContent = nextRace.name;

  // Hero clicável: scroll para o card
  heroImage.addEventListener("click", () => {
    const card = document.querySelector(`.race-card[data-id="${nextRace.id}"]`);
    if(card){
      card.scrollIntoView({ behavior: "smooth", block: "start" });
      const details = card.querySelector(".race-details");
      if(details){
        details.classList.remove("hidden");
        details.style.maxHeight = details.scrollHeight + "px";
      }
    }
  });

  // ================= CARDS DAS CORRIDAS =================
  raceCardsContainer.innerHTML = "";

  calendar2026.forEach(race => {
    const card = document.createElement("div");
    card.className = "race-card";
    card.dataset.id = race.id;

    card.innerHTML = `
      <img class="race-image" src="${race.cardImage}" alt="${race.name}">
      <div class="race-header">
        <h3>${race.name}</h3>
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

    raceCardsContainer.appendChild(card);

    // Dropdown click
    const img = card.querySelector(".race-image");
    const details = card.querySelector(".race-details");

    if(img && details){
      img.style.cursor = "pointer";
      details.style.maxHeight = "0";

      img.addEventListener("click", () => {
        const open = !details.classList.contains("hidden");
        if(open){
          details.style.maxHeight = "0";
          setTimeout(()=>details.classList.add("hidden"), 400);
        } else {
          details.classList.remove("hidden");
          details.style.maxHeight = details.scrollHeight + "px";
        }
      });
    }
  });

  // ================= BACK TO TOP =================
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top:0, behavior:"smooth" });
  });

});
