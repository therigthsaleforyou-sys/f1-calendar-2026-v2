document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     DADOS INICIAIS (ZERO)
  ========================== */

  const drivers = [
    "Verstappen","Hamilton","Leclerc","Norris","Piastri","Russell",
    "Sainz","Alonso","Perez","Stroll","Ocon","Gasly",
    "Albon","Sargeant","Tsunoda","Ricciardo",
    "Bottas","Zhou","Magnussen","Hulkenberg",
    "Bearman","Antonelli"
  ];

  const constructors = [
    "Red Bull","Mercedes","Ferrari","McLaren","Aston Martin",
    "Alpine","Williams","RB","Kick Sauber",
    "Haas","Andretti"
  ];

  /* =========================
     POPULAR TABELAS
  ========================== */

  function fillTable(containerId, data, label) {
    const tbody = document.querySelector(`#${containerId} tbody`);
    tbody.innerHTML = "";

    data.forEach((name, index) => {
      const tr = document.createElement("tr");
      if (index >= 5) tr.classList.add("hidden");

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${name}</td>
        <td>0</td>
      `;

      tbody.appendChild(tr);
    });
  }

  fillTable("drivers-champ", drivers);
  fillTable("constructors-champ", constructors);

  /* =========================
     DROPBOX (CLIQUE NA IMAGEM)
  ========================== */

  document.querySelectorAll(".dropbox-toggle").forEach(img => {
    img.addEventListener("click", () => {
      const card = img.closest(".race-card");
      card.querySelectorAll("tbody tr").forEach((row, i) => {
        if (i >= 5) row.classList.toggle("hidden");
      });
    });
  });

  /* =========================
     BOTÃO VOLTAR AO TOPO
  ========================== */

  const btn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

});
