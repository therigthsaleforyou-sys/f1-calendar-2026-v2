// js/verificador-noticias.js
// Verificação de integridade da página f1noticias.html

document.addEventListener("DOMContentLoaded", () => {
  console.group("🧪 Verificação Notícias F1 2026");

  const cards = document.querySelectorAll(".race-card");
  const ids = new Set();

  console.log(`🔢 Total de cards encontrados: ${cards.length}`);

  if (cards.length !== 24) {
    console.error("❌ ERRO: O número de cards não é 24");
  } else {
    console.log("✅ Número correto de cards (24)");
  }

  cards.forEach((card, index) => {
    const id = card.id;
    const img = card.querySelector("img");
    const date = card.dataset.end;

    console.group(`🏁 Card ${index + 1}`);

    // ID
    if (!id) {
      console.error("❌ Card sem ID");
    } else if (ids.has(id)) {
      console.error(`❌ ID duplicado: ${id}`);
    } else {
      ids.add(id);
      console.log(`✅ ID: ${id}`);
    }

    // Imagem
    if (!img || !img.src) {
      console.error("❌ Imagem em falta");
    } else {
      fetch(img.src)
        .then(r => {
          if (!r.ok) {
            console.error(`❌ Imagem não encontrada: ${img.src}`);
          } else {
            console.log(`✅ Imagem OK`);
          }
        })
        .catch(() => {
          console.error(`❌ Erro ao verificar imagem`);
        });
    }

    // Data
    if (!date || isNaN(new Date(date))) {
      console.error(`❌ Data inválida ou ausente: ${date}`);
    } else {
      console.log(`📅 Data: ${date}`);
    }

    console.groupEnd();
  });

  console.groupEnd();
});
