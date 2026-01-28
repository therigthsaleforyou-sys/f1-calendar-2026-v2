/* =============================
   FUNÇÃO FUSO LISBOA
============================= */
function formatarLisboa(dataUTC) {
  return new Date(dataUTC).toLocaleString("pt-PT", {
    timeZone: "Europe/Lisbon",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/* =============================
   CALENDÁRIO OFICIAL 2026 (UTC)
============================= */
const corridas = [
  {
    gp: "GP da Austrália",
    pais: "Austrália",
    dataUTC: "2026-03-08T03:00:00Z" // 14:00 local / 04:00 Lisboa
  },
  {
    gp: "GP da China",
    pais: "China",
    dataUTC: "2026-03-15T07:00:00Z" // ~07:00 Lisboa
  },
  {
    gp: "GP do Japão",
    pais: "Japão",
    dataUTC: "2026-03-29T06:00:00Z"
  }
];

/* =============================
   TABELA CALENDÁRIO
============================= */
const tbody = document.getElementById("tabela-calendario");

corridas.forEach(c => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${c.gp}</td>
    <td>${c.pais}</td>
    <td>${new Date(c.dataUTC).toLocaleDateString("pt-PT")}</td>
    <td>${formatarLisboa(c.dataUTC)}</td>
  `;

  tbody.appendChild(tr);
});

/* =============================
   PRÓXIMA CORRIDA + COUNTDOWN
============================= */
function iniciarProxima() {
  const agora = new Date();
  let proxima = corridas.find(c => new Date(c.dataUTC) > agora);

  if (!proxima) proxima = corridas[0];

  document.getElementById("nome-corrida").textContent = proxima.gp;
  document.getElementById("local-corrida").textContent =
    "Hora da corrida em Lisboa: " + formatarLisboa(proxima.dataUTC);

  function atualizar() {
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

  atualizar();
  setInterval(atualizar, 1000);
}

iniciarProxima();
