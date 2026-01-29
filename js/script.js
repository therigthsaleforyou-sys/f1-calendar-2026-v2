/* CONTADOR */
const inicio = new Date("2026-03-08T04:00:00Z");
setInterval(() => {
  const agora = new Date();
  const diff = inicio - agora;
  if (diff <= 0) return;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  document.getElementById("contador").textContent = `${d}d ${h}h ${m}m`;
}, 60000);

/* CORRIDAS */
const corridas = [
  {
    nome: "Grande Prémio da Austrália",
    imagem: "assets/races/australia.jpg",
    sessoes: [
      "FP1: Sexta 02:30",
      "FP2: Sexta 06:00",
      "Qualificação: Sábado 06:00",
      "Corrida: Domingo 04:00"
    ],
    historico: {
      meteo: "Sol, 24°C",
      pole: "Max Verstappen – 1:18.123",
      volta: "Lewis Hamilton – 1:19.456",
      podio: "1º Verstappen | 2º Leclerc | 3º Norris"
    }
  }
];

const lista = document.getElementById("lista-corridas");

corridas.forEach(c => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h3>${c.nome}</h3>
    <img src="${c.imagem}">
    <div class="detalhes">
      <strong>Sessões:</strong><br>
      ${c.sessoes.join("<br>")}
      <br><br>
      <strong>Histórico 2025:</strong><br>
      Meteorologia: ${c.historico.meteo}<br>
      Pole: ${c.historico.pole}<br>
      Volta rápida: ${c.historico.volta}<br>
      Pódio: ${c.historico.podio}
    </div>
  `;

  const toggle = () => {
    const d = div.querySelector(".detalhes");
    d.style.display = d.style.display === "block" ? "none" : "block";
  };

  div.querySelector("h3").onclick = toggle;
  div.querySelector("img").onclick = toggle;

  lista.appendChild(div);
});

/* PILOTOS */
const pilotos = [
  ["Max Verstappen","Red Bull Racing"],
  ["Lewis Hamilton","Ferrari"]
];

const tp = document.getElementById("tabela-pilotos");
pilotos.forEach(p => {
  tp.innerHTML += `<tr><td>${p[0]}</td><td>${p[1]}</td><td>0</td></tr>`;
});

/* CONSTRUTORES */
const construtores = [
  "Red Bull Racing","Ferrari","McLaren","Mercedes"
];

const tc = document.getElementById("tabela-construtores");
construtores.forEach(c => {
  tc.innerHTML += `<tr><td>${c}</td><td>0</td></tr>`;
});

/* BOTÃO TOPO */
document.getElementById("topo").onclick = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });
