document.addEventListener("DOMContentLoaded", () => {

  if (!window.teamsData || !Array.isArray(window.teamsData)) {
    console.error("teamsData não carregado");
    return;
  }

  const container = document.getElementById("teams-container");

  teamsData.forEach(team => {
    const card = document.createElement("div");
    card.className = "race-card"; // mantém a mesma classe que os outros cards

    card.innerHTML = `
      <img src="${team.image}" alt="${team.name}">
      <h3>${team.name}</h3>
      <p>${team.drivers.join(" & ")}</p>
    `;

    container.appendChild(card);
  });

  /* =========================
     BACK TO TOP
  ========================= */
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
