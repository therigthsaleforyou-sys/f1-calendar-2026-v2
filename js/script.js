/* =============================
   FORMATAÇÃO PARA LISBOA (PT)
============================= */
function horaLisboa(dataUTC) {
  return new Date(dataUTC).toLocaleString("pt-PT", {
    timeZone: "Europe/Lisbon",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/* =============================
   CALENDÁRIO F1 2026 (UTC BASE)
============================= */
const corridas = [
  {
    gp: "GP da Austrália",
    pais: "Austrália",
    // FORÇADO para mostrar 04:00 em Lisboa
    dataUTC: "2026-03-08T04:00:00Z"
  },
  {
    gp: "GP da China",
    pais: "China",
    dataUTC: "2026-03-15T07:00:00Z"
  },
  {
    gp: "GP do Japão",
    pais: "Japão",
    dataUTC: "2026-03-29T06:00:00Z"
  }
];

/* =============================
   PREENCHER TABELA
============================= */
const tbody = document.getElementById("tabela-calendario");
tbody.innerHTML = "";

corridas.forEach(c => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${c.gp}</td>
    <td>${c.pais}</td>
    <td>${new Date(c.dataUTC).toLocaleDateString("pt-PT")}</td>
    <td>${horaLisboa(c.dataUTC)}</td>
  `;
  tbody.appendChild(tr);
});

/* =============================
   PRÓXIMA CORRIDA + COUNTDOWN
============================= */
function iniciarProximaCorrida() {
  const agora = new Date();
  let proxima = corridas.find(c => new Date(c.dataUTC) > agora);
  if (!proxima) proxima = corridas[0];

  document.getElementById("nome-corrida").textContent = proxima.gp;
  document.getElementById("local-corrida").textContent =
    "Hora da corrida em Lisboa: " + horaLisboa(proxima.dataUTC);

  function atualizarCountdown() {
    const diff = new Date(proxima.dataUTC) - new Date();

    if (diff <= 0) {
      document.getElementById("countdown").textContent = "CORRIDA A DECORRER";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById("countdown").textContent =
      `${d}d ${h}h ${m}m ${s}s`;
  }

  atualizarCountdown();
  setInterval(atualizarCountdown, 1000);
}

iniciarProximaCorrida();
