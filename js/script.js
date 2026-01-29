// VOLTAR AO TOPO
document.getElementById("btn-topo").onclick = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

// COUNTDOWN – Austrália
const raceDate = new Date("2026-03-08T04:00:00");
setInterval(() => {
  const diff = raceDate - new Date();
  if (diff <= 0) return;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  document.getElementById("countdown").textContent = `${d}d ${h}h ${m}m`;
}, 1000);

// CORRIDAS
const corridas = [
  {
    gp: "Grande Prémio da Austrália",
    imagem: "assets/races/australia.jpg",
    sessoes: {
      FP1: "Sexta 02:30",
      FP2: "Sexta 06:00",
      Qualificação: "Sábado 06:00",
      Corrida: "Domingo 04:00"
    },
    historico2025: {
      meteo: "Sol, 24°C",
      pole: "Max Verstappen – 1:18.123",
      volta: "Lewis Hamilton – 1:19.456",
      podio: "1º Verstappen | 2º Leclerc | 3º Norris"
    }
  }
];

const container = document.getElementById("corridas");

corridas.forEach(c => {
  const div = document.createElement("div");
  div.className = "corrida";
  div.innerHTML = `
    <h3>${c.gp}</h3>
    <a href="${c.imagem}" target="_blank">
      <img src="${c.imagem}" alt="${c.gp}">
    </a>
    <div class="detalhes">
      <strong>Sessões:</strong><br>
      ${Object.entries(c.sessoes).map(s => `${s[0]}: ${s[1]}`).join("<br>")}
      <br><br>
      <strong>Histórico 2025:</strong><br>
      Meteorologia: ${c.historico2025.meteo}<br>
      Pole: ${c.historico2025.pole}<br>
      Volta rápida: ${c.historico2025.volta}<br>
      Pódio: ${c.historico2025.podio}
    </div>
  `;

  div.querySelector("h3").onclick = () => {
    const d = div.querySelector(".detalhes");
    d.style.display = d.style.display === "block" ? "none" : "block";
  };

  container.appendChild(div);
});

// PILOTOS
const pilotos = [
  ["Max Verstappen","Red Bull Racing"],
  ["Isack Hadjar","Red Bull Racing"],
  ["Lewis Hamilton","Ferrari"],
  ["Charles Leclerc","Ferrari"],
  ["Lando Norris","McLaren"],
  ["Oscar Piastri","McLaren"],
  ["George Russell","Mercedes"],
  ["Kimi Antonelli","Mercedes"],
  ["Fernando Alonso","Aston Martin"],
  ["Lance Stroll","Aston Martin"],
  ["Carlos Sainz","Williams"],
  ["Alexander Albon","Williams"],
  ["Pierre Gasly","Alpine"],
  ["Franco Colapinto","Alpine"],
  ["Esteban Ocon","Haas"],
  ["Oliver Bearman","Haas"],
  ["Nico Hulkenberg","Audi"],
  ["Gabriel Bortoleto","Audi"],
  ["Sergio Perez","Cadillac"],
  ["Valtteri Bottas","Cadillac"],
  ["Liam Lawson","Racing Bulls"],
  ["Arvid Lindblad","Racing Bulls"]
];

// tabelas com card
const tabelaPilotos = document.getElementById("tabela-pilotos");
tabelaPilotos.parentElement.classList.add("table-card");

pilotos.forEach(p => {
  tabelaPilotos.innerHTML += `<tr><td>${p[0]}</td><td>${p[1]}</td><td>0</td></tr>`;
});

const construtores = [...new Set(pilotos.map(p => p[1]))];
const tabelaConstrutores = document.getElementById("tabela-construtores");
tabelaConstrutores.parentElement.classList.add("table-card");

construtores.forEach(e => {
  tabelaConstrutores.innerHTML += `<tr><td>${e}</td><td>0</td></tr>`;
});
