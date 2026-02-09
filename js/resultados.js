// js/resultados.js
// Página Resultados – JS comportamental (seguro, isolado)

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".race-card");
  const backToTop = document.getElementById("back-to-top");

  /* =========================
     ABRIR / FECHAR RESULTADOS
  ========================= */

  cards.forEach(card => {
    const img = card.querySelector("img");
    const header = card.querySelector(".race-header");
    const details = card.querySelector(".race-details");

    // estado inicial: fechado
    details.classList.add("hidden");

    const toggle = () => {
      details.classList.toggle("hidden");
    };

    img.addEventListener("click", toggle);
    header.addEventListener("click", toggle);
  });

  /* =========================
     FAVORITOS (reuse)
  ========================= */

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  cards.forEach(card => {
    const btn = card.querySelector(".fav-btn");
    const id = btn.dataset.id;

    if (favorites.includes(id)) {
      card.classList.add("favorite");
      btn.classList.add("active");
    }

    btn.addEventListener("click", e => {
      e.stopPropagation();

      if (favorites.includes(id)) {
        favorites.splice(favorites.indexOf(id), 1);
        card.classList.remove("favorite");
        btn.classList.remove("active");
      } else {
        favorites.push(id);
        card.classList.add("favorite");
        btn.classList.add("active");
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  });

  /* =========================
     BACK TO TOP
  ========================= */

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
